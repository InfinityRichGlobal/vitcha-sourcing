import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createApp } from './app.js';
import { DEFAULT_DATABASE } from './defaults.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DATA_DIR || path.join(root, 'data');
let defaults = DEFAULT_DATABASE;
if (!fs.existsSync(path.join(dataDir, 'database.json'))) {
  if (!process.env.BOOTSTRAP_PIN || process.env.BOOTSTRAP_PIN.length < 8) throw new Error('Database missing. Restore a backup or provide BOOTSTRAP_PIN (at least 8 characters).');
  defaults = structuredClone(DEFAULT_DATABASE);
  defaults.users = defaults.users.filter(u => ['user-ice', 'user-mook', 'user-beam', 'user-ann'].includes(u.id));
  for (const user of defaults.users) user.pin = user.id === 'user-ice' ? process.env.BOOTSTRAP_PIN : '';
  defaults.invites = [];
}
const recoveryFile = path.join(dataDir, 'recovery.json');
const recoveryPasswordHash = process.env.ACCOUNT_RECOVERY_PASSWORD_HASH || (fs.existsSync(recoveryFile) ? JSON.parse(fs.readFileSync(recoveryFile, 'utf8')).passwordHash : null);
const app = createApp({ dataDir, defaults, recoveryPasswordHash });
const dist = path.join(root, '../dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.use((req, res, next) => req.method === 'GET' && !req.path.startsWith('/api') ? res.sendFile(path.join(dist, 'index.html')) : next());
}
app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log('VITCHA server ready'));
