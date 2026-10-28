import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { createPersistence } from '../server/persistence.js';

const source = fs.readFileSync(new URL('../src/services/api.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const api = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-qa-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const file = path.join(dir, 'database.json');
  return { file, store: createPersistence(file, { users: [], suppliers: [] }) };
}

test('missing database initializes and successful writes survive reopening', t => {
  const { file, store } = fixture(t);
  assert.deepEqual(store.read().users, []);
  store.save({ users: [{ id: 'real-member' }], suppliers: [] });
  assert.equal(createPersistence(file, {}).read().users[0].id, 'real-member');
  assert.equal(fs.existsSync(`${file}.tmp`), false);
});

test('corrupt database is preserved and read fails instead of seeding over it', t => {
  const { file, store } = fixture(t);
  fs.writeFileSync(file, '{broken');
  assert.throws(() => store.read(), SyntaxError);
  assert.equal(fs.readFileSync(file, 'utf8'), '{broken');
});

test('failed serialization preserves last good database and propagates failure', t => {
  const { file, store } = fixture(t);
  store.read();
  const before = fs.readFileSync(file, 'utf8');
  const cyclic = {}; cyclic.self = cyclic;
  assert.throws(() => store.save(cyclic));
  assert.equal(fs.readFileSync(file, 'utf8'), before);
});

test('failed write does not return success or damage the existing database', t => {
  const { file, store } = fixture(t);
  store.read();
  const before = fs.readFileSync(file, 'utf8');
  t.mock.method(fs, 'writeFileSync', () => { throw new Error('disk full'); });
  assert.throws(() => store.save({ users: [] }), /disk full/);
  assert.equal(fs.readFileSync(file, 'utf8'), before);
});

test('API clears timer after network rejection and does not retry writes', async t => {
  let cleared = 0, calls = 0;
  t.mock.method(globalThis, 'setTimeout', () => 42);
  t.mock.method(globalThis, 'clearTimeout', id => { assert.equal(id, 42); cleared++; });
  t.mock.method(globalThis, 'fetch', async () => { calls++; throw new Error('offline'); });
  await assert.rejects(api.postSupplierToCentral({ id: 'test' }), /offline/);
  assert.equal(cleared, 1);
  assert.equal(calls, 1);
});

test('deadline covers response body parsing, not only headers', async t => {
  let abort;
  t.mock.method(globalThis, 'setTimeout', fn => { abort = fn; return 1; });
  t.mock.method(globalThis, 'clearTimeout', () => {});
  t.mock.method(globalThis, 'fetch', async (_url, init) => ({
    ok: true,
    json: () => new Promise((_resolve, reject) => {
      init.signal.addEventListener('abort', () => reject(new Error('body timeout')));
      abort();
    }),
  }));
  await assert.rejects(api.fetchCentralData(), /body timeout/);
});

test('caller abort cancels a pending GET and cache is bypassed', async t => {
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async (_url, init) => {
    assert.equal(init.cache, 'no-store');
    return new Promise((_resolve, reject) => {
      init.signal.addEventListener('abort', () => reject(new Error('cancelled')));
      controller.abort();
    });
  });
  await assert.rejects(api.fetchCentralData(controller.signal), /cancelled/);
});

test('HTTP failure cannot report a successful mutation and IDs are encoded', async t => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    assert.ok(url.endsWith('/api/suppliers/a%2Fb'));
    return { ok: false, status: 503, json: async () => ({ error: 'Unavailable' }) };
  });
  await assert.rejects(api.deleteSupplierFromCentral('a/b', 1), /Unavailable/);
});

test('saved legacy endpoints converge on the migrated service without changing unrelated servers', t => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const previousStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  t.after(() => {
    for (const [key, descriptor] of [['window', previousWindow], ['localStorage', previousStorage]]) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key];
    }
  });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { hostname: 'infinityrichglobal.github.io', origin: 'https://infinityrichglobal.github.io' } } });
  let saved = 'https://vitcha-sourcing.onrender.com/';
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => saved } });
  assert.equal(api.getRenderServerUrl(), 'https://vitcha-sourcing-fxjw.onrender.com');
  saved = 'https://custom.example'; assert.equal(api.getRenderServerUrl(), saved);
});
