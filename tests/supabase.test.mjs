import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { createApp } from '../server/app.js';
import { createSupabasePersistence } from '../server/supabase-persistence.js';

async function fixture(t) {
  const db = new PGlite();
  await db.exec('create role anon; create role authenticated; create role service_role bypassrls;');
  await db.exec(fs.readFileSync('deployment/supabase.sql', 'utf8'));
  const body = { users: [{ id: 'user-ice', emailOrId: 'ice', name: 'Test', alias: 'Test', pin: 'fixture-password', role: 'admin', avatar: '' }], invites: [], suppliers: [], drinkStores: [], notifications: [] };
  await db.query('insert into public.vitcha_state(id,body) values ($1,$2)', ['main', JSON.stringify(body)]);
  let failWrite = false, loseAcknowledgement = false, beforeCommit = null;
  const request = async (route, options = {}) => {
    if (route === '/rest/v1/rpc/vitcha_commit') {
      if (beforeCommit) await beforeCommit();
      if (failWrite) throw Object.assign(new Error('fixture unavailable'), { status: 503 });
      const v = JSON.parse(options.body);
      let result;
      try { result = (await db.query('select public.vitcha_commit($1,$2,$3) as version', [v.expected_version, JSON.stringify(v.next_body), v.commit_id])).rows[0].version; }
      catch (e) { throw Object.assign(new Error(e.message), { status: e.code === 'PT409' ? 409 : 503 }); }
      if (loseAcknowledgement) { loseAcknowledgement = false; throw Object.assign(new Error('fixture lost acknowledgement'), { status: 503 }); }
      return result;
    }
    if (route.startsWith('/rest/v1/vitcha_commits?')) return (await db.query('select version from public.vitcha_commits where id=$1', [route.match(/id=eq\.([^&]+)/)[1]])).rows;
    return (await db.query(route.endsWith('select=version') ? 'select version from public.vitcha_state' : 'select version, body from public.vitcha_state')).rows;
  };
  const servers = [], dirs = [];
  const start = async (extra = {}) => {
    const persistence = await createSupabasePersistence({ request });
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-postgres-')); dirs.push(dir);
    const app = createApp({ dataDir: dir, persistence, ...extra }); await persistence.flush();
    const server = app.listen(0, '127.0.0.1'); servers.push(server);
    await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const call = async (route, body, token) => {
      const r = await fetch(base + route, { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
      return { status: r.status, data: await r.json() };
    };
    const token = (await call('/api/login', { idOrEmail: 'ice', pin: 'fixture-password' })).data.token;
    return { call, token, dir };
  };
  t.after(async () => { for (const server of servers) await new Promise(resolve => server.close(resolve)); for (const dir of dirs) fs.rmSync(dir, { recursive: true, force: true }); await db.close(); });
  return { db, start, failWrites: v => { failWrite = v; }, loseAck: () => { loseAcknowledgement = true; }, gate: v => { beforeCommit = v; }, read: async () => (await db.query('select body from public.vitcha_state')).rows[0].body };
}

test('PostgreSQL commits concurrent invites and consumes each invitation once, surviving a fresh server', async t => {
  const f = await fixture(t); const a = await f.start();
  const results = await Promise.all(Array.from({ length: 40 }, (_, i) => a.call('/api/invites', { role: 'reviewer', prefilledAlias: `Member ${i}`, requestId: `invite-${i}` }, a.token)));
  assert.ok(results.every(r => r.status === 201)); assert.equal(new Set(results.map(r => r.data.invite.code)).size, 40);
  const code = results[0].data.invite.code;
  const registered = await Promise.all(['member-a','member-b'].map(emailOrId => a.call('/api/register', { code, name: emailOrId, emailOrId, pin: 'fixture-only' })));
  assert.deepEqual(registered.map(r => r.status).sort(), [201,400]);
  const before = await f.read(); assert.equal(before.users.length, 2); assert.ok(before.users.every(u => u.pinHash && !u.pin));
  const b = await f.start(); const after = await b.call('/api/data', undefined, b.token);
  assert.equal(after.data.users.length, 2); assert.equal(after.data.invites.length, 40); assert.equal(JSON.stringify(after.data).includes('pinHash'), false);
  assert.equal(fs.existsSync(path.join(b.dir, 'database.json')), false);
});

test('a database failure returns no success and keeps the existing password/session valid', async t => {
  const f = await fixture(t); const a = await f.start();
  f.failWrites(true);
  const r = await a.call('/api/users', { id: 'user-ice', revision: 0, pin: 'new-fixture-password' }, a.token);
  assert.equal(r.status, 503); assert.equal((await a.call('/api/data', undefined, a.token)).status, 200);
  f.failWrites(false);
  assert.equal((await a.call('/api/login', { idOrEmail: 'ice', pin: 'fixture-password' })).status, 200);
  assert.equal((await a.call('/api/login', { idOrEmail: 'ice', pin: 'new-fixture-password' })).status, 401);
});

test('HTTP success waits for durable commit and a lost acknowledgement uses its receipt', async t => {
  const f = await fixture(t); const a = await f.start();
  let reached, release; const entered = new Promise(r => { reached = r; }); const held = new Promise(r => { release = r; });
  f.gate(async () => { reached(); await held; });
  let responded = false;
  const pending = a.call('/api/invites', { role: 'reviewer', requestId: 'delayed' }, a.token).then(r => { responded = true; return r; });
  await entered; assert.equal(responded, false); assert.equal((await f.read()).invites.length, 0);
  release(); assert.equal((await pending).status, 201); f.gate(null);
  f.loseAck(); assert.equal((await a.call('/api/invites', { role: 'viewer', requestId: 'ack' }, a.token)).status, 201);
  assert.equal((await f.read()).invites.length, 2);
});

test('another writer wins atomically; stale requests cannot overwrite its update', async t => {
  const f = await fixture(t); const a = await f.start();
  let injected = false;
  f.gate(async () => {
    if (injected) return; injected = true;
    const row = (await f.db.query('select * from public.vitcha_state')).rows[0]; row.body.users[0].alias = 'External update';
    await f.db.query('select public.vitcha_commit($1,$2,$3)', [row.version, JSON.stringify(row.body), randomUUID()]);
  });
  assert.equal((await a.call('/api/users', { id: 'user-ice', revision: 0, alias: 'Stale update' }, a.token)).status, 409);
  assert.equal((await a.call('/api/data', undefined, a.token)).data.user.alias, 'External update');
});

test('SQL denies anonymous and regular authenticated access to private data and commit functions', async t => {
  const f = await fixture(t);
  for (const role of ['anon', 'authenticated']) {
    await f.db.exec(`set role ${role}`);
    for (const table of ['vitcha_state','vitcha_commits','vitcha_runtime','vitcha_media']) await assert.rejects(f.db.query(`select * from public.${table}`), e => e.code === '42501');
    await assert.rejects(f.db.query('select public.vitcha_commit(1,$1,$2)', ['{}', randomUUID()]), e => e.code === '42501');
    await f.db.exec('reset role');
  }
});
