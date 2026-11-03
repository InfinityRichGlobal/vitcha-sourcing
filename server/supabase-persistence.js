import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

const unavailable = () => Object.assign(new Error('ฐานข้อมูลยังไม่ตอบรับ กรุณาลองอีกครั้ง'), { status: 503 });

export function supabaseRequest({ url, key, fetchImpl = fetch }) {
  if (!/^https:\/\/[^/]+\.supabase\.co$/.test(url || '') || !key) throw new Error('Supabase server configuration missing or invalid');
  return async (route, options = {}) => {
    const headers = { apikey: key, ...(key.startsWith('sb_secret_') ? {} : { Authorization: `Bearer ${key}` }), ...options.headers };
    let response;
    try { response = await fetchImpl(url + route, { ...options, headers, signal: AbortSignal.timeout(20000) }); }
    catch { throw unavailable(); }
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (response.status === 409 || error.code === 'PT409') throw Object.assign(new Error('ข้อมูลเปลี่ยนแล้ว กรุณาโหลดข้อมูลล่าสุดแล้วลองอีกครั้ง'), { status: 409 });
      throw unavailable();
    }
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
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
  async function commit(body, expected, id = randomUUID()) {
    let version;
    try {
      version = await request('/rest/v1/rpc/vitcha_commit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ expected_version: expected, next_body: body, commit_id: id }) });
    } catch (error) {
      if (error.status === 409) throw error;
      // A lost HTTP acknowledgement must not cause us to apply the write twice.
      const receipt = await request(`/rest/v1/vitcha_commits?id=eq.${id}&select=version`).catch(() => []);
      if (!receipt.length) throw error;
      version = receipt[0].version;
    }
    if (Number(version) >= Number(cached.version)) cached = { version, body: structuredClone(body) };
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
      if (initialWrite) { await commit(initialWrite, cached.version); initialWrite = undefined; }
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
          const state = { body: cached.body, version: cached.version, readOnly, dirty: false, callbacks: [], aborted: false, responding: false };
          const json = res.json.bind(res);
          res.once('close', () => { state.aborted = true; if (!state.responding) release(); });
          res.json = body => {
            if (state.responding || state.aborted) return res;
            state.responding = true;
            void (async () => {
              try {
                if (res.statusCode < 400) {
                  if (state.dirty) await commit(state.body, state.version);
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
