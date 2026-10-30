import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ALL_USERS,
  USER_ICE,
  USER_SOMO,
  USER_OHM,
  USER_TUI,
  USER_MAY,
  USER_ZEEN,
  USER_MILD,
  USER_NAME_PKG,
  USER_AYAI,
  USER_LEK,
} from './mock-data/users.mjs';

import { suppliers } from './mock-data/suppliers.mjs';
import { drinkStores } from './mock-data/drinkStores.mjs';
import { locations } from './mock-data/locations.mjs';
import { leadLabItems } from './mock-data/leadLab.mjs';
import { franchiseStores } from './mock-data/franchiseStores.mjs';
import { notifications } from './mock-data/notifications.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const categories = [
  'เคาน์เตอร์ & สเตนเลส',
  'เครื่องซีลแก้ว',
  'เครื่องจ่ายไซรัป',
  'ตู้ทำน้ำแข็ง',
  'เครื่องสกัดชา',
  'เครื่องปั่นสมูทตี้',
  'บรรจุภัณฑ์ & แก้ว',
  'ใบชา & วัตถุดิบ',
  'วิตามิน & ผงพรีมิกซ์',
  'อื่นๆ',
];

const storeCategories = [
  'ชานมพรีเมียม & ชาสด',
  'ชาผลไม้สด & คราฟต์โซดา',
  'วิตามินบาร์ & สุขภาพ',
  'มัทฉะ & สเปเชียลตี้',
  'แฟรนไชส์สตรีทดริงก์',
  'คาเฟ่ดีไซน์ & แพ็กเกจจิ้ง',
];

const locationTypes = [
  'ห้างสรรพสินค้า / ศูนย์การค้า',
  'คอมมูนิตี้มอลล์',
  'อาคารสำนักงาน',
  'สแตนด์อโลน / ริมถนน / อาคารพาณิชย์',
  'สถานีขนส่ง / รถไฟฟ้า',
  'สถานที่ราชการ',
  'สถานที่การศึกษา',
  'ตลาด / ถนนคนเดิน',
  'ปั๊มน้ำมัน / จุดชาร์จ EV',
  'สถานบันเทิง',
  'สวนสาธารณะ',
];

const quickTagsList = [
  'โรงงานผลิตเอง (Manufacturer)',
  'มีโชว์รูมให้ดูของจริง',
  'คุยภาษาอังกฤษได้',
  'รองรับส่งออก (Export Ready)',
  'สั่งขั้นต่ำน้อย (Low MOQ)',
  'มีสต็อกพร้อมส่งทันที',
  'มีตัวอย่างให้ทดลอง (Samples)',
  'เจ้าของคุยง่าย น่าร่วมงาน',
  'มีบริการจัดส่งในไทย',
  'มี มอก./อย./COA รับรอง',
];

const quickMessages = [
  {
    id: 'qm-1',
    title: 'ขอสเปกไฟ 220V 50Hz',
    text: 'ช่วยตรวจสอบสเปกมอเตอร์และระบบไฟฟ้า 220V 50Hz ของรุ่นนี้ด้วยครับ ว่าต่อเข้าปลั๊กไฟสาขาในไทยได้เลยไหม',
  },
  {
    id: 'qm-2',
    title: 'ส่ง RFQ เช็กราคาส่งไทย',
    text: 'ขอใบเสนอราคา FOB กวางโจว และเทียบค่าชิปปิ้งนำเข้าไทยล็อต 5-10 เครื่องให้ด้วยครับ',
  },
  {
    id: 'qm-3',
    title: 'ขอตัวอย่างมาเทสแล็บ',
    text: 'ขอตัวอย่างเพื่อนำมาทดสอบค่าสารสกัดวิตามิน รสสัมผัส และกลิ่นที่ห้องแล็บด่วนครับ',
  },
  {
    id: 'qm-4',
    title: 'ต่อรองขั้นต่ำ MOQ',
    text: 'ลองเจรจาขอเริ่มผลิตขั้นต่ำ (Low MOQ) สำหรับสาขาแรกก่อน ถ้าผลตอบรับดีจะสั่งล็อตใหญ่ 20 สาขา',
  },
  {
    id: 'qm-5',
    title: 'อนุมัติผ่าน สั่งซื้อได้',
    text: 'รายการนี้ผ่านเกณฑ์คุณภาพ สเปก และราคา ออกใบสั่งซื้อ (PO) และประสานงานส่งมอบงานได้เลย',
  },
];

const invites = [
  {
    id: 'inv-rkbqs',
    code: 'VITCHA-RKBQS',
    role: 'reviewer',
    prefilledAlias: 'ช่างบีม (วิศวกร)',
    isUsed: true,
    createdAt: '2026-10-26T10:00:00Z',
    createdBy: 'user-ice',
  },
];

// 1. Write src/utils/seedData.ts
console.log('📝 Generating src/utils/seedData.ts ...');
const seedTsContent = `import { User, SupplierRecord, StoreInspoRecord, LocationRecord, InviteLink, QuickMessageTemplate, LabItem, FranchiseStore } from '../types';

export const INITIAL_CATEGORIES: string[] = ${JSON.stringify(categories, null, 2)};

export const INITIAL_STORE_CATEGORIES: string[] = ${JSON.stringify(storeCategories, null, 2)};

export const INITIAL_LOCATION_TYPES: string[] = ${JSON.stringify(locationTypes, null, 2)};

export const INITIAL_QUICK_TAGS: string[] = ${JSON.stringify(quickTagsList, null, 2)};

export const INITIAL_QUICK_MESSAGES: QuickMessageTemplate[] = ${JSON.stringify(quickMessages, null, 2)};

export const INITIAL_USERS: User[] = ${JSON.stringify(ALL_USERS, null, 2)};

export const INITIAL_SUPPLIERS: SupplierRecord[] = ${JSON.stringify(suppliers, null, 2)};

export const INITIAL_DRINK_STORES: StoreInspoRecord[] = ${JSON.stringify(drinkStores, null, 2)};

export const INITIAL_LOCATIONS: LocationRecord[] = ${JSON.stringify(locations, null, 2)};

export const INITIAL_LEAD_LAB_ITEMS: LabItem[] = ${JSON.stringify(leadLabItems, null, 2)};

export const INITIAL_FRANCHISE_STORES: FranchiseStore[] = ${JSON.stringify(franchiseStores, null, 2)};

export const INITIAL_INVITES: InviteLink[] = ${JSON.stringify(invites, null, 2)};
`;

fs.writeFileSync(path.join(ROOT, 'src/utils/seedData.ts'), seedTsContent, 'utf8');
console.log('✅ Generated src/utils/seedData.ts successfully');

// 2. Write server/seeds.js
console.log('📝 Generating server/seeds.js ...');
const seedsJsContent = `export const DEFAULT_LEAD_LAB_ITEMS = ${JSON.stringify(leadLabItems, null, 2)};

export const DEFAULT_FRANCHISE_STORES = ${JSON.stringify(franchiseStores, null, 2)};
`;
fs.writeFileSync(path.join(ROOT, 'server/seeds.js'), seedsJsContent, 'utf8');
console.log('✅ Generated server/seeds.js successfully');

// 3. Write server/defaults.js
console.log('📝 Generating server/defaults.js ...');
const defaultsJsContent = `import { DEFAULT_LEAD_LAB_ITEMS, DEFAULT_FRANCHISE_STORES } from './seeds.js';

export const DEFAULT_DATABASE = {
  users: ${JSON.stringify(ALL_USERS, null, 2)},
  invites: ${JSON.stringify(invites, null, 2)},
  suppliers: ${JSON.stringify(suppliers, null, 2)},
  drinkStores: ${JSON.stringify(drinkStores, null, 2)},
  locations: ${JSON.stringify(locations, null, 2)},
  leadLabItems: DEFAULT_LEAD_LAB_ITEMS,
  franchiseStores: DEFAULT_FRANCHISE_STORES,
  notifications: ${JSON.stringify(notifications, null, 2)},
  categories: ${JSON.stringify(categories, null, 2)},
  storeCategories: ${JSON.stringify(storeCategories, null, 2)},
  locationTypes: ${JSON.stringify(locationTypes, null, 2)},
  quickTagsList: ${JSON.stringify(quickTagsList, null, 2)},
  quickMessages: ${JSON.stringify(quickMessages, null, 2)},
  updatedAt: new Date().toISOString(),
};
`;
fs.writeFileSync(path.join(ROOT, 'server/defaults.js'), defaultsJsContent, 'utf8');
console.log('✅ Generated server/defaults.js successfully');

// 4. Update server/data/database.json
// PRESERVE ALL MEMBERS! CLEAR OPERATIONAL ITEMS TO 0!
console.log('🧹 Updating server/data/database.json (clearing active records to 0 while preserving members)...');
const dbPath = path.join(ROOT, 'server/data/database.json');
let existingDb = { users: [] };
if (fs.existsSync(dbPath)) {
  existingDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const existingUserMap = new Map((existingDb.users || []).map(u => [u.id, u]));

// Merge users ensuring pinHash, pin, and base64 avatars are preserved
const mergedUsers = ALL_USERS.map(u => {
  const existing = existingUserMap.get(u.id);
  if (existing) {
    return {
      ...u,
      pinHash: existing.pinHash || u.pinHash,
      pin: existing.pin || u.pin,
      avatar: existing.avatar || u.avatar,
      revision: existing.revision || 1,
    };
  }
  return u;
});

// Also keep any other existing members
for (const u of existingDb.users || []) {
  if (!mergedUsers.some(m => m.id === u.id)) {
    mergedUsers.push(u);
  }
}

const clearedDb = {
  ...existingDb,
  users: mergedUsers,
  invites,
  categories,
  storeCategories,
  locationTypes,
  quickTagsList,
  quickMessages,
  suppliers: [],       // Start at 0 items as requested
  drinkStores: [],     // Start at 0 items as requested
  locations: [],       // Start at 0 items as requested
  leadLabItems: [],    // Start at 0 items as requested
  franchiseStores: [], // Start at 0 items as requested
  productWorkspace: {},
  notifications: [],
  sampleOperations: [],
  trash: [],
  revision: (existingDb.revision || 0) + 1,
  updatedAt: new Date().toISOString(),
};

fs.writeFileSync(dbPath, JSON.stringify(clearedDb, null, 2), 'utf8');
console.log(`✅ server/data/database.json updated: ${mergedUsers.length} users preserved, active items set to 0.`);

// 5. Sync to live Render server: clear active records to 0 via /api/system/clear
async function syncToLiveServer() {
  const base = (process.env.VITCHA_SERVER_URL || 'https://vitcha-sourcing-fxjw.onrender.com').replace(/\/+$/, '');
  const authPath = path.join(ROOT, '.private/backup-auth.json');
  if (!fs.existsSync(authPath)) {
    console.log('ℹ️ No .private/backup-auth.json found, skipping live server reset.');
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
      console.warn(`⚠️ Login to live server failed (${loginRes.status}).`);
      return;
    }
    const { token } = await loginRes.json();
    console.log('🔑 Authenticated with live server.');

    // Fetch current revision
    const dataRes = await fetch(`${base}/api/data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const currentData = await dataRes.json();

    // Call /api/system/clear with password 5888
    console.log('🧹 Resetting live server active records to 0 (preserving members)...');
    const clearRes = await fetch(`${base}/api/system/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        revision: currentData.revision,
        confirm: 'CLEAR_RECORDS',
        password: '5888',
      }),
    });

    if (clearRes.ok) {
      console.log('🎉 Live server operational records successfully cleared to 0 (members preserved)!');
    } else {
      console.warn(`⚠️ Clear returned ${clearRes.status}: ${await clearRes.text()}`);
    }
  } catch (err) {
    console.warn('⚠️ Error during live sync:', err.message);
  }
}

await syncToLiveServer();
console.log('✨ Rich mockup template built and active database initialized to 0 successfully.');
