import fs from 'node:fs';
import path from 'node:path';
import {
  users,
  categories,
  storeCategories,
  quickTagsList,
  quickMessages,
  suppliers,
  drinkStores,
  locations,
  productWorkspace,
  notifications,
  invites,
} from './generate-mockup-data.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

// 1. Generate src/utils/seedData.ts
const seedTsContent = `import { User, SupplierRecord, StoreInspoRecord, LocationRecord, InviteLink, QuickMessageTemplate } from '../types';
import { getDemoVoiceWavDataUri } from './audioHelper';

export const INITIAL_CATEGORIES: string[] = ${JSON.stringify(categories, null, 2)};

export const INITIAL_STORE_CATEGORIES: string[] = ${JSON.stringify(storeCategories, null, 2)};

export const INITIAL_QUICK_TAGS: string[] = ${JSON.stringify(quickTagsList, null, 2)};

export const INITIAL_QUICK_MESSAGES: QuickMessageTemplate[] = ${JSON.stringify(quickMessages, null, 2)};

export const INITIAL_USERS: User[] = ${JSON.stringify(users, null, 2)};

export const INITIAL_SUPPLIERS: SupplierRecord[] = ${JSON.stringify(suppliers, null, 2)};

export const INITIAL_DRINK_STORES: StoreInspoRecord[] = ${JSON.stringify(drinkStores, null, 2)};

export const INITIAL_LOCATIONS: LocationRecord[] = ${JSON.stringify(locations, null, 2)};

export const INITIAL_INVITES: InviteLink[] = ${JSON.stringify(invites, null, 2)};
`;

fs.writeFileSync(path.join(ROOT, 'src/utils/seedData.ts'), seedTsContent, 'utf8');
console.log('✅ Generated src/utils/seedData.ts');

// 2. Update server/data/database.json preserving password hashes & base64 photos
const dbPath = path.join(ROOT, 'server/data/database.json');
let existingDb = { users: [] };
if (fs.existsSync(dbPath)) {
  existingDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const existingUserMap = new Map((existingDb.users || []).map(u => [u.id, u]));

const mergedUsers = users.map(u => {
  const existing = existingUserMap.get(u.id);
  if (existing) {
    return {
      ...u,
      pinHash: existing.pinHash || u.pinHash,
      pin: existing.pin,
      avatar: existing.avatar || u.avatar,
      revision: existing.revision || 1,
    };
  }
  return u;
});

// Also keep any other real users that might exist
for (const u of existingDb.users || []) {
  if (!mergedUsers.some(m => m.id === u.id)) {
    mergedUsers.push(u);
  }
}

const newDb = {
  ...existingDb,
  users: mergedUsers,
  invites,
  categories,
  storeCategories,
  quickTagsList,
  quickMessages,
  suppliers,
  drinkStores,
  locations,
  productWorkspace,
  notifications,
  sampleOperations: [],
  revision: (existingDb.revision || 0) + 1,
  updatedAt: new Date().toISOString(),
};

fs.writeFileSync(dbPath, JSON.stringify(newDb, null, 2), 'utf8');
console.log('✅ Updated server/data/database.json');

// 3. Sync to live server if backup-auth is available
async function syncToLive() {
  const base = (process.env.VITCHA_SERVER_URL || 'https://vitcha-sourcing-fxjw.onrender.com').replace(/\/+$/, '');
  const authPath = path.join(ROOT, '.private/backup-auth.json');
  if (!fs.existsSync(authPath)) {
    console.log('ℹ️ No .private/backup-auth.json found, skipping direct live push.');
    return;
  }
  const authInfo = JSON.parse(fs.readFileSync(authPath, 'utf8'));
  console.log(`📡 Connecting to live server ${base}...`);

  try {
    const loginRes = await fetch(`${base}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idOrEmail: authInfo.id, pin: authInfo.pin }),
    });
    if (!loginRes.ok) {
      console.warn(`⚠️ Login failed (${loginRes.status}), will sync on next deployment.`);
      return;
    }
    const { token } = await loginRes.json();
    console.log('🔑 Authenticated with live server.');

    // Fetch current revision
    const dataRes = await fetch(`${base}/api/data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const currentData = await dataRes.json();

    // Import rich suppliers, drinkStores, and locations
    console.log('📦 Importing suppliers, drink stores, and locations to live server...');
    const importRes = await fetch(`${base}/api/system/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        revision: currentData.revision,
        snapshot: {
          suppliers,
          drinkStores,
          locations,
        },
      }),
    });
    if (!importRes.ok) {
      console.warn(`⚠️ Import returned ${importRes.status}: ${await importRes.text()}`);
    } else {
      console.log('✅ Suppliers, Drink Stores & Locations imported successfully to live server!');
    }

    // Update settings (categories, quick messages, etc.)
    const settingsRes = await fetch(`${base}/api/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        previous: {
          categories: currentData.categories,
          storeCategories: currentData.storeCategories,
          quickTagsList: currentData.quickTagsList,
          quickMessages: currentData.quickMessages,
        },
        values: {
          categories,
          storeCategories,
          quickTagsList,
          quickMessages,
        },
      }),
    });
    if (settingsRes.ok) {
      console.log('✅ Settings synced to live server!');
    }

    // Set taxonomy & curate products
    for (const cat of productWorkspace.categories) {
      await fetch(`${base}/api/product-taxonomy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind: 'categories', action: 'add', name: cat.name }),
      }).catch(() => {});
    }
    for (const tag of productWorkspace.tags) {
      await fetch(`${base}/api/product-taxonomy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind: 'tags', action: 'add', name: tag.name }),
      }).catch(() => {});
    }

    // Update product sets
    for (const pSet of productWorkspace.sets) {
      await fetch(`${base}/api/product-sets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(pSet),
      }).catch(() => {});
    }

    console.log('🎉 Live server sync completed.');
  } catch (err) {
    console.warn('⚠️ Error during live sync:', err.message);
  }
}

await syncToLive();
