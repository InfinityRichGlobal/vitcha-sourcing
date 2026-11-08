import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createOwnerMonitor, estimateBandwidthCost, parseRenderBandwidth, parseSupabaseMetrics } from '../server/owner-monitor.js';
import { createApp } from '../server/app.js';

const GiB = 1024 ** 3;
const sample = '# HELP pg_database_size_mb Total database size\npg_database_size_mb{server="localhost"} 40\npg_database_size_bytes{datname="postgres",service_type="postgresql"} 2.7e7\npg_database_size_bytes{datname="template0"} 7e6\n';
const config = { token: 'secret-render-value', serviceId: 'srv-test123', workspaceId: 'tea-test123', includedBandwidthBytes: 5 * GiB, pricePerGb: .15 };
const time = Date.parse('2026-11-08T10:00:00Z');
const series = [{ labels: [{ field: 'service', value: 'srv-test123' }], unit: 'GB', values: [{ timestamp: '2026-11-07T10:00:00Z', value: 7.18 }] }];

test('monitor denies all non-owners and simulated founder before querying providers', async t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-monitor-'));
  let reads = 0;
  const users = [['ice', 'admin'], ['other', 'admin'], ['editor', 'editor'], ['view', 'viewer'], ['ann', 'viewer']].map(([id, role]) => ({ id: `user-${id}`, emailOrId: id, name: id, alias: id, role, pin: 'monitor-qa-only' }));
  const app = createApp({ dataDir: dir, defaults: { users, invites: [], suppliers: [], drinkStores: [], notifications: [] }, ownerMonitor: { async getSnapshot() { reads++; return { providers: [] }; } } });
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); fs.rmSync(dir, { recursive: true, force: true }); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const login = async id => (await (await fetch(`${base}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idOrEmail: id, pin: 'monitor-qa-only' }) })).json()).token;
  const get = token => fetch(`${base}/api/owner/monitor?refresh=1`, { headers: { Authorization: `Bearer ${token}` } });
  assert.equal((await get('forged')).status, 401);
  for (const id of ['other', 'editor', 'view']) assert.equal((await get(await login(id))).status, 403);
  assert.equal(reads, 0);
  const token = await login('ice'); const response = await get(token);
  assert.equal(response.status, 200); assert.match(response.headers.get('cache-control'), /no-store/); assert.equal(reads, 1);
  await fetch(`${base}/api/simulate`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ userId: 'user-ann' }) });
  assert.equal((await get(token)).status, 403); assert.equal(reads, 1);
});

test('parsers preserve real zero, reject missing units and exclude non-postgres databases', () => {
  assert.deepEqual(parseSupabaseMetrics(sample), { postgresBytes: 27000000, totalBytes: 40 * 1024 ** 2 });
  assert.deepEqual(parseSupabaseMetrics('other_metric 0'), { postgresBytes: null, totalBytes: null });
  const result = parseRenderBandwidth(series, Date.parse('2026-11-01'), time);
  assert.equal(result.bytes, 7.18 * GiB); assert.equal(result.daily.length, 1);
  const liveUnits = parseRenderBandwidth([{ ...series[0], unit: 'mb', values: [{ timestamp: '2026-11-07T10:00:00Z', value: 7356.191447359169 }] }], Date.parse('2026-11-01'), time);
  assert.equal((liveUnits.bytes / GiB).toFixed(2), '7.18');
  assert.equal(estimateBandwidthCost(result.bytes, 5 * GiB, .15), .45);
  assert.equal(estimateBandwidthCost(0, 5 * GiB, .15), 0);
  assert.equal(estimateBandwidthCost(100, null, .15), null);
  assert.throws(() => parseRenderBandwidth([{ values: [] }], 0, time));
  assert.throws(() => parseRenderBandwidth([], 0, time));
});

test('hourly cache coalesces simultaneous requests, persists safely, and survives process recreation', async () => {
  let requests = 0, stored, at = time;
  const options = {
    render: config, now: () => at,
    fetchImpl: async url => { requests++; return Response.json(url.includes('/metrics/') ? series : { suspended: 'not_suspended', serviceDetails: { plan: 'free' } }); },
    cacheStore: { load: async () => stored, save: async value => { stored = structuredClone(value); } },
  };
  const monitor = createOwnerMonitor(options);
  const all = await Promise.all(Array.from({ length: 10 }, () => monitor.getSnapshot()));
  assert.equal(requests, 2); assert.equal(all[0].providers[0].metrics[1].value, .45);
  assert.equal((await monitor.getSnapshot()).cached, true); assert.equal(requests, 2);
  assert.equal((await createOwnerMonitor(options).getSnapshot()).cached, true); assert.equal(requests, 2);
  assert.ok(!JSON.stringify(stored).includes('secret-render-value'));
  at += 3600001; await monitor.getSnapshot(); assert.equal(requests, 4);
});

test('upstream failures retain last good measurements with original timestamp and hide raw errors', async () => {
  let at = time, fail = false;
  const monitor = createOwnerMonitor({ render: config, now: () => at, fetchImpl: async url => {
    if (fail) throw new Error('secret-render-value in raw provider error');
    return Response.json(url.includes('/metrics/') ? series : { suspended: 'not_suspended' });
  } });
  const first = await monitor.getSnapshot(); at += 3600001; fail = true;
  const second = await monitor.getSnapshot();
  assert.equal(second.providers[0].state, 'stale');
  assert.equal(second.providers[0].updatedAt, first.providers[0].updatedAt);
  assert.equal(second.providers[0].metrics[0].value, first.providers[0].metrics[0].value);
  assert.ok(!JSON.stringify(second).includes('secret-render-value'));
  const third = await monitor.getSnapshot(); assert.equal(third.cached, true);
  at = Date.parse('2026-12-01T01:00:00Z');
  const nextMonth = await monitor.getSnapshot(); assert.equal(nextMonth.providers[0].state, 'error'); assert.equal(nextMonth.providers[0].metrics.length, 0);
});

test('Supabase reads only metrics and paginated metadata; missing bill and egress stay unknown', async () => {
  const calls = [];
  const monitor = createOwnerMonitor({ now: () => time,
    supabase: { url: 'https://project.supabase.co', key: 'secret-supabase-value' },
    fetchImpl: async (url, options) => { assert.match(url, /\/customer\/v1\/privileged\/metrics$/); assert.match(options.headers.Authorization, /^Basic /); return new Response(sample); },
    request: async route => { calls.push(route); return route.includes('offset=0&') ? Array.from({ length: 500 }, () => ({ bytes: 2 })) : [{ bytes: 10 }]; },
    getDriveStatus: async () => ({ connected: true, storageQuota: { usage: '0', limit: '1000', usageInDrive: '0' } }),
  });
  const result = await monitor.getSnapshot(); const sb = result.providers.find(p => p.id === 'supabase');
  assert.equal(calls.length, 2); assert.ok(calls.every(route => route.startsWith('/rest/v1/vitcha_media?provider=eq.supabase&select=bytes')));
  assert.equal(sb.metrics.find(m => m.id === 'storage').value, 1010);
  assert.equal(sb.metrics.find(m => m.id === 'egress').value, null);
  assert.equal(sb.metrics.find(m => m.id === 'invoice').value, null);
  assert.equal(result.providers.find(p => p.id === 'drive').metrics[0].value, 0);
  assert.ok(!JSON.stringify(result).includes('secret-supabase-value'));
});

test('unconfigured services perform no network reads; failed cache storage does not lose results', async () => {
  const monitor = createOwnerMonitor({ now: () => time, fetchImpl: () => { throw new Error('unexpected request'); }, cacheStore: { load: async () => { throw new Error('offline'); }, save: async () => { throw new Error('offline'); } } });
  const result = await monitor.getSnapshot(); assert.ok(result.providers.every(p => p.state === 'unconfigured'));
  assert.ok(result.providers.every(p => p.metrics.length === 0));
});
