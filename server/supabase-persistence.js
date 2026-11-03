import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { stateDelta } from './state-delta.js';

const unavailable = () => Object.assign(new Error('ฐานข้อมูลยังไม่ตอบรับ กรุณาลองอีกครั้ง'), { status: 503 });

export function supabaseRequest({ url, key, fetchImpl = fetch }) {
  if (!/^https:\/\/[^/]+\.supabase\.co$/.test(url || '') || !key) throw new Error('Supabase server configuration missing or invalid');
  return async (route, options = {}) => {
    const { timeoutMs = 20000, ...fetchOptions } = options;
    const headers = { apikey: key, ...(key.startsWith('sb_secret_') ? {} : { Authorization: `Bearer ${key}` }), ...options.headers };
    const started = Date.now();
    const failure = (code, status, retryable) => {
      // Never log credentials, query parameters, user content or raw DB errors.
      console.warn('[database-request]', JSON.stringify({ route: route.split('?')[0], code, status, elapsedMs: Date.now() - started, bytes: Buffer.byteLength(options.body || '') }));
      return Object.assign(unavailable(), { retryable });
    };
    let response, data;
    try {
      response = await fetchImpl(url + route, { ...fetchOptions, headers, signal: AbortSignal.timeout(timeoutMs) });
      const text = await response.text();
      data = text ? JSON.parse(text) : null;
    } catch { throw failure('transport', response?.status, true); }
    if (!response.ok) {
      if (response.status === 409 || data?.code === 'PT409') throw Object.assign(new Error('ข้อมูลเปลี่ยนแล้ว กรุณาโหลดข้อมูลล่าสุดแล้วลองอีกครั้ง'), { status: 409 });
      throw failure(/^[A-Z0-9]{3,12}$/.test(data?.code || '') ? data.code : 'http', response.status, response.status === 429 || response.status >= 500);
    }
    return data;
  };
}

// The database performs compare-and-swap atomically. Request-local snapshots keep
// existing synchronous domain validation together, but success is sent only after
// PostgreSQL acknowledges the commit. The local queue reduces avoidable conflicts;
// the database revision also protects overlapping deployments/other writers.
export async function createSupabasePersistence(options) {
  const request = options.request || supabaseRequest(options);
  const context = new AsyncLocalStorage();
  let cached, initialWrite, tail = Promise.resolve(), waiting = 0;
  async function reload() {
    const rows = await request('/rest/v1/vitcha_state?id=eq.main&select=version,body');
    if (rows.length !== 1 || !Array.isArray(rows[0].body?.users) || !rows[0].body.users.some(u => u.id === 'user-ice' && (u.pinHash || u.pin))) throw new Error('Complete VITCHA database must be imported before startup');
    // A slow read must never replace a newer commit with its older snapshot.
    if (!cached || Number(rows[0].version) >= Number(cached.version)) cached = rows[0];
  }
  await reload();
  async function refresh() {
    const rows = await request('/rest/v1/vitcha_state?id=eq.main&select=version');
    if (rows.length !== 1) throw unavailable();
    if (Number(rows[0].version) > Number(cached.version)) await reload();
  }
  async function commit(body, expected, previous, id = randomUUID()) {
    // Match JSON's persisted semantics (e.g. omit undefined optional fields).
    body = JSON.parse(JSON.stringify(body));
    const payload = JSON.stringify({ expected_version: expected, delta: stateDelta(previous, body), commit_id: id });
    let version;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        version = await request('/rest/v1/rpc/vitcha_commit_delta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, timeoutMs: 12000 });
        break;
      } catch (error) {
        if (error.status === 409) throw error;
        // Reuse the exact ID and expected snapshot. A late first attempt and its
        // retry share the SQL lock/receipt, so only one can apply the change.
        const receipt = await request(`/rest/v1/vitcha_commits?id=eq.${id}&select=version`, { timeoutMs: 5000 }).catch(() => []);
        if (receipt.length) { version = receipt[0].version; break; }
        if (attempt || error.retryable === false) throw error;
        await delay(250);
      }
    }
    if (Number(version) >= Number(cached.version)) cached = { version, body };
  }
  const store = {
    read() { return structuredClone(context.getStore()?.body || initialWrite || cached.body); },
    save(body) {
      const current = context.getStore();
      if (current) { if (current.aborted || current.readOnly) throw unavailable(); current.body = structuredClone(body); current.dirty = true; }
      else initialWrite = structuredClone(body);
    },
    afterCommit(callback) {
      const current = context.getStore();
      if (current) current.callbacks.push(callback);
      else callback();
    },
    async flush() {
      if (initialWrite) { await commit(initialWrite, cached.version, cached.body); initialWrite = undefined; }
    },
    middleware() {
      return async (req, res, next) => {
        const readOnly = ['GET', 'HEAD'].includes(req.method) || req.path === '/upload' || req.path === '/uploads' || req.path.startsWith('/uploads/') || req.path.startsWith('/drive/') || req.path === '/push/test';
        let unlock = () => {};
        if (!readOnly) {
          if (waiting >= 100) return res.status(503).json({ error: 'ระบบกำลังรับหลายรายการ กรุณาลองอีกครั้ง' });
          waiting++;
          const previous = tail;
          tail = new Promise(resolve => { unlock = resolve; });
          await previous;
        }
        let released = false;
        const release = () => { if (!released) { released = true; if (!readOnly) waiting--; unlock(); } };
        if (res.destroyed) { release(); return; }
        try {
          await refresh();
          // read() makes isolated copies; retaining this immutable committed body
          // avoids an extra full-database clone for every poll and upload chunk.
          const state = { body: cached.body, original: cached.body, version: cached.version, readOnly, dirty: false, callbacks: [], aborted: false, responding: false };
          const json = res.json.bind(res);
          res.once('close', () => { state.aborted = true; if (!state.responding) release(); });
          res.json = body => {
            if (state.responding || state.aborted) return res;
            state.responding = true;
            void (async () => {
              try {
                if (res.statusCode < 400) {
                  if (state.dirty) await commit(state.body, state.version, state.original);
                  for (const callback of state.callbacks) callback();
                }
                if (!res.destroyed) json(body);
              } catch (error) {
                if (!res.destroyed) { res.statusCode = error.status || 503; json({ error: error.message || 'บันทึกไม่สำเร็จ กรุณาลองอีกครั้ง' }); }
              } finally { release(); }
            })();
            return res;
          };
          context.run(state, next);
        } catch (error) { release(); next(error); }
      };
    },
  };
  return store;
}
