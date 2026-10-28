// Explicit pre-commit backup. Never prints credentials or database contents.
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
const base = (process.env.VITCHA_SERVER_URL || 'https://vitcha-sourcing-fxjw.onrender.com').replace(/\/+$/, '');
let token = process.env.VITCHA_SESSION_TOKEN;
const privateAuth = await fs.readFile(new URL('../.private/backup-auth.json', import.meta.url), 'utf8').then(JSON.parse).catch(() => null);
const savedAuth = privateAuth?.base === base ? privateAuth : null;
const loginId = process.env.VITCHA_ID || savedAuth?.id;
const loginPin = process.env.VITCHA_PIN || savedAuth?.pin;
async function request(route, options = {}) {
  const response = await fetch(base + route, { ...options, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers }, signal: AbortSignal.timeout(90000) });
  if (!response.ok) throw new Error(`Backup request failed (${response.status}). Authenticate as the founder before retrying.`);
  return response.json();
}
if (!token && loginId && loginPin) {
  const auth = await request('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idOrEmail: loginId, pin: loginPin }) });
  token = auth.token;
}
let data = await request('/api/data');
// The secured /api/data deliberately omits credentials. Fetch the founder-only
// complete backup instead of writing a sanitized view over the database.
if (!data.users?.some(u => u.pinHash || u.pin)) data = await request('/api/backup');
if (!['users','invites','suppliers','drinkStores'].every(k => Array.isArray(data[k])) || !data.users.some(u => u.id === 'user-ice' && (u.pinHash || u.pin))) throw new Error('Incomplete backup; database was not changed.');
const contents = JSON.stringify(data, null, 2);
const digest = createHash('sha256').update(contents).digest('hex');
const backupDir = new URL('../.private/backups/automated/', import.meta.url);
await fs.mkdir(backupDir, { recursive: true, mode: 0o700 });
const snapshot = new URL(`${new Date().toISOString().replaceAll(':', '-')}-${digest.slice(0, 12)}.json`, backupDir);
await fs.writeFile(snapshot, contents, { mode: 0o600, flag: 'wx' });
await fs.writeFile(new URL(snapshot.href + '.sha256'), digest + '\n', { mode: 0o600, flag: 'wx' });
// Preserve the retired installation independently while it remains reachable.
// Its data can never overwrite the migrated cloud database or its local backup.
if (base === 'https://vitcha-sourcing-fxjw.onrender.com') {
  const legacyResponse = await fetch('https://vitcha-sourcing.onrender.com/api/data', { signal: AbortSignal.timeout(90000) });
  if (legacyResponse.ok) {
    const legacy = await legacyResponse.json();
    if (legacy.users?.some(u => u.id === 'user-ice' && (u.pin || u.pinHash))) {
      await fs.writeFile(new URL(snapshot.href + '.legacy.json'), JSON.stringify(legacy, null, 2), { mode: 0o600, flag: 'wx' });
    }
  }
}
const file = new URL('../server/data/database.json', import.meta.url);
const temp = new URL('../server/data/database.json.backup-tmp', import.meta.url);
await fs.writeFile(temp, contents, { mode: 0o600 });
await fs.rename(temp, file);
console.log('Live backup validated; retained a private versioned snapshot and refreshed server/data/database.json.');
