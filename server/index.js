import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createApp } from './app.js';
import { DEFAULT_DATABASE } from './defaults.js';
import { createSupabasePersistence, supabaseRequest } from './supabase-persistence.js';
import { createCloudMedia } from './cloud-media.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DATA_DIR || path.join(root, 'data');
let defaults = DEFAULT_DATABASE;
const cloud = !!process.env.SUPABASE_URL;
if (!cloud && !fs.existsSync(path.join(dataDir, 'database.json'))) {
  defaults = structuredClone(DEFAULT_DATABASE);
  if (process.env.BOOTSTRAP_PIN && process.env.BOOTSTRAP_PIN.length >= 8) {
    defaults.users = defaults.users.filter(u => ['user-ice', 'user-mook', 'user-beam', 'user-ann'].includes(u.id));
    for (const user of defaults.users) user.pin = user.id === 'user-ice' ? process.env.BOOTSTRAP_PIN : '';
    defaults.invites = [];
  }
}
const recoveryFile = path.join(dataDir, 'recovery.json');
let recoveryPasswordHash = process.env.ACCOUNT_RECOVERY_PASSWORD_HASH || (fs.existsSync(recoveryFile) ? JSON.parse(fs.readFileSync(recoveryFile, 'utf8')).passwordHash : null);
let persistence = null, mediaStorage = null;
if (cloud) {
  const config = { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY };
  const request = supabaseRequest(config);
  persistence = await createSupabasePersistence({ request });
  const runtime = await request('/rest/v1/vitcha_runtime?select=key,value');
  recoveryPasswordHash ||= runtime.find(row => row.key === 'account_recovery')?.value?.passwordHash;
  const envDrive = process.env.GOOGLE_DRIVE_CLIENT_ID && process.env.GOOGLE_DRIVE_REFRESH_TOKEN
    ? {
        clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET || '',
        refreshToken: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
        folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1',
      }
    : null;
  mediaStorage = createCloudMedia({ ...config, request, drive: runtime.find(row => row.key === 'google_drive')?.value || envDrive });
}
const app = createApp({ dataDir, defaults, recoveryPasswordHash, persistence, mediaStorage });
await persistence?.flush();

// If running on the legacy Render instance (vitcha-sourcing.onrender.com without SUPABASE_URL),
// decommission the old link by redirecting visitors to the canonical system (https://vitcha-sourcing-fxjw.onrender.com/)
// while keeping /api/health returning 200 OK so Render never sends failure emails.
const isLegacyRenderInstance = Boolean(process.env.RENDER && !cloud);
if (isLegacyRenderInstance) {
  app.use((req, res, next) => {
    if (req.path === '/api/health') return next();
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.redirect(302, 'https://vitcha-sourcing-fxjw.onrender.com/');
    }
    return next();
  });
}

const dist = path.join(root, '../dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.use((req, res, next) => req.method === 'GET' && !req.path.startsWith('/api') ? res.sendFile(path.join(dist, 'index.html')) : next());
}
app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log('VITCHA server ready'));
