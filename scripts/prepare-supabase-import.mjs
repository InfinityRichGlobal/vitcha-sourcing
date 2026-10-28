import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createApp } from '../server/app.js';

const source = fs.readFileSync('server/data/database.json', 'utf8');
let value = JSON.parse(source);
if (!['users','invites','suppliers','drinkStores'].every(k => Array.isArray(value[k])) || !value.users.some(u => u.id === 'user-ice' && (u.pin || u.pinHash))) throw new Error('Complete backup required');
const before = structuredClone(value);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-import-'));
try {
  createApp({ dataDir: temporary, persistence: { read: () => structuredClone(value), save: next => { value = structuredClone(next); } } });
} finally { fs.rmSync(temporary, { recursive: true, force: true }); }
for (const collection of ['users','invites','suppliers','drinkStores']) {
  if (JSON.stringify(before[collection].map(x => x.id)) !== JSON.stringify(value[collection].map(x => x.id))) throw new Error('Import changed record identities');
}
for (const user of value.users) if ('pin' in user) throw new Error('Plaintext credential remains');
const directory = '.private/supabase-import';
fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
const csv = rows => rows.map(row => row.map(v => '"' + String(v).replaceAll('"', '""') + '"').join(',')).join('\r\n') + '\r\n';
const contents = JSON.stringify(value);
fs.writeFileSync(path.join(directory, 'state.csv'), csv([['id','version','body'], ['main',1,contents]]), { mode: 0o600 });
// Supabase's CSV UI chunks input before parsing; a single very long JSON field
// can produce an empty first batch. Import bounded ASCII chunks then assemble in SQL.
const encoded = Buffer.from(contents).toString('base64');
const chunks = [['part','content']];
for (let offset = 0; offset < encoded.length; offset += 32768) chunks.push([chunks.length - 1, encoded.slice(offset, offset + 32768)]);
fs.writeFileSync(path.join(directory, 'chunks.csv'), csv(chunks), { mode: 0o600 });
const manifest = { sourceSha256: createHash('sha256').update(source).digest('hex'), preparedSha256: createHash('sha256').update(contents).digest('hex'), createdAt: new Date().toISOString(), counts: Object.fromEntries(['users','invites','suppliers','drinkStores'].map(k => [k,value[k].length])) };
const runtime = [['key','value'], ['migration_manifest',JSON.stringify(manifest)]];
if (fs.existsSync('server/data/recovery.json')) runtime.push(['account_recovery', fs.readFileSync('server/data/recovery.json','utf8')]);
fs.writeFileSync(path.join(directory, 'runtime.csv'), csv(runtime), { mode: 0o600 });
fs.writeFileSync(path.join(directory, 'manifest.json'), JSON.stringify(manifest,null,2), { mode: 0o600 });
console.log(JSON.stringify({ directory, counts: manifest.counts, credentials: 'hashed', original: 'preserved' }));
