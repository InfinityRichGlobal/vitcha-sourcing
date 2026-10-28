import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (allows GitHub Pages to query this Render server)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// High limit for large photo / video uploads (up to 100MB)
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Database Directory & File
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Database Template
const DEFAULT_DATABASE = {
  users: [
    {
      id: 'user-ice',
      name: 'Ice (SuperiCez - ผู้ก่อตั้ง)',
      alias: 'SuperiCez',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      pin: '1234',
      emailOrId: 'supericez',
      createdAt: '2026-10-26T10:00:00Z',
    },
    {
      id: 'user-beam',
      name: 'ช่างบีม (วิศวกรระบบและไฟ)',
      alias: 'ช่างบีม (วิศวกร)',
      role: 'reviewer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      pin: '2222',
      emailOrId: 'beam@vitcha.com',
      createdAt: '2026-10-26T11:00:00Z',
    },
    {
      id: 'user-ann',
      name: 'คุณแอน (จัดซื้อและนำเข้า)',
      alias: 'แอน (จัดซื้อ)',
      role: 'reviewer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      pin: '3333',
      emailOrId: 'ann@vitcha.com',
      createdAt: '2026-10-26T11:30:00Z',
    },
    {
      id: 'user-mook',
      name: 'น้องมุก (ทีมสำรวจหน้างาน)',
      alias: 'มุก (Field Scout)',
      role: 'editor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      pin: '4444',
      emailOrId: 'mook@vitcha.com',
      createdAt: '2026-10-26T12:00:00Z',
    },
  ],
  invites: [
    {
      id: 'inv-rkbqs',
      code: 'VITCHA-RKBQS',
      role: 'reviewer',
      prefilledAlias: 'ทีมงานปฏิบัติการ VITCHA',
      isUsed: false,
      createdAt: '2026-10-28T00:00:00Z',
      createdBy: 'SuperiCez (ผู้ก่อตั้ง)',
    },
    {
      id: 'inv-1',
      code: 'VITCHA-TH-REV',
      role: 'reviewer',
      prefilledAlias: 'ทีมวิศวกรไทย',
      isUsed: false,
      createdAt: '2026-10-26T14:00:00Z',
      createdBy: 'SuperiCez',
    },
  ],
  suppliers: [],
  drinkStores: [],
  categories: [
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
  ],
  storeCategories: [
    'ชานมพรีเมียม & ชาสด',
    'ชาผลไม้สด & คราฟต์โซดา',
    'วิตามินบาร์ & สุขภาพ',
    'มัทฉะ & สเปเชียลตี้',
    'แฟรนไชส์สตรีทดริงก์',
    'คาเฟ่ดีไซน์ & แพ็กเกจจิ้ง',
  ],
  quickTagsList: [
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
  ],
  quickMessages: [
    {
      id: 'qm-1',
      title: 'ขอสเปกไฟ 220V 50Hz',
      text: 'ช่างบีมช่วยตรวจสอบสเปกมอเตอร์และระบบไฟฟ้า 220V 50Hz ของรุ่นนี้ด้วยครับ ว่าต่อเข้าปลั๊กไฟสาขาในไทยได้เลยไหม',
    },
    {
      id: 'qm-2',
      title: 'ส่ง RFQ เช็กราคาส่งไทย',
      text: 'คุณแอนจัดซื้อ ขอใบเสนอราคา FOB กวางโจว และเทียบค่าชิปปิ้งนำเข้าไทยล็อต 5 เครื่องให้ด้วยครับ',
    },
  ],
  updatedAt: new Date().toISOString(),
};

// Load or initialize database
function getDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }
  // Initialize default file
  fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATABASE, null, 2), 'utf-8');
  return DEFAULT_DATABASE;
}

function saveDatabase(data) {
  try {
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database file:', err);
  }
}

// ----------------- API Endpoints -----------------

// Health check
app.get('/api/health', (req, res) => {
  const db = getDatabase();
  res.json({
    status: 'ok',
    server: 'onrender',
    timestamp: new Date().toISOString(),
    suppliersCount: db.suppliers?.length || 0,
    drinkStoresCount: db.drinkStores?.length || 0,
    usersCount: db.users?.length || 0,
    invitesCount: db.invites?.length || 0,
  });
});

// Fetch full central database
app.get('/api/data', (req, res) => {
  const db = getDatabase();
  res.json(db);
});

// Save or Update Supplier
app.post('/api/suppliers', (req, res) => {
  const supplier = req.body;
  if (!supplier || !supplier.id) {
    return res.status(400).json({ error: 'Missing supplier data or id' });
  }

  const db = getDatabase();
  const index = (db.suppliers || []).findIndex((s) => s.id === supplier.id);
  if (index >= 0) {
    db.suppliers[index] = { ...db.suppliers[index], ...supplier };
  } else {
    db.suppliers = [supplier, ...(db.suppliers || [])];
  }

  saveDatabase(db);
  res.json({ success: true, supplier });
});

// Delete Supplier
app.delete('/api/suppliers/:id', (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  db.suppliers = (db.suppliers || []).filter((s) => s.id !== id);
  saveDatabase(db);
  res.json({ success: true, id });
});

// Save or Update Drink Store
app.post('/api/drink-stores', (req, res) => {
  const store = req.body;
  if (!store || !store.id) {
    return res.status(400).json({ error: 'Missing store data or id' });
  }

  const db = getDatabase();
  const index = (db.drinkStores || []).findIndex((s) => s.id === store.id);
  if (index >= 0) {
    db.drinkStores[index] = { ...db.drinkStores[index], ...store };
  } else {
    db.drinkStores = [store, ...(db.drinkStores || [])];
  }

  saveDatabase(db);
  res.json({ success: true, store });
});

// Delete Drink Store
app.delete('/api/drink-stores/:id', (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  db.drinkStores = (db.drinkStores || []).filter((s) => s.id !== id);
  saveDatabase(db);
  res.json({ success: true, id });
});

// Save User (Registration or Profile Update)
app.post('/api/users', (req, res) => {
  const user = req.body;
  if (!user || !user.id) {
    return res.status(400).json({ error: 'Missing user data or id' });
  }

  const db = getDatabase();
  const index = (db.users || []).findIndex(
    (u) =>
      u.id === user.id ||
      (user.emailOrId && u.emailOrId?.toLowerCase() === user.emailOrId.toLowerCase())
  );

  if (index >= 0) {
    db.users[index] = { ...db.users[index], ...user };
  } else {
    db.users = [...(db.users || []), user];
  }

  saveDatabase(db);
  res.json({ success: true, user });
});

// Delete User
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  if (id === 'user-ice') {
    return res.status(400).json({ error: 'Cannot delete super admin user' });
  }
  db.users = (db.users || []).filter((u) => u.id !== id);
  saveDatabase(db);
  res.json({ success: true, id });
});

// Save Invite
app.post('/api/invites', (req, res) => {
  const invite = req.body;
  if (!invite || !invite.code) {
    return res.status(400).json({ error: 'Missing invite code' });
  }

  const db = getDatabase();
  const index = (db.invites || []).findIndex((inv) => inv.code === invite.code);
  if (index >= 0) {
    db.invites[index] = { ...db.invites[index], ...invite };
  } else {
    db.invites = [invite, ...(db.invites || [])];
  }

  saveDatabase(db);
  res.json({ success: true, invite });
});

// Delete Invite
app.delete('/api/invites/:id', (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  db.invites = (db.invites || []).filter((inv) => inv.id !== id && inv.code !== id);
  saveDatabase(db);
  res.json({ success: true, id });
});

// Batch Sync
app.post('/api/sync', (req, res) => {
  const incoming = req.body;
  const db = getDatabase();

  if (Array.isArray(incoming.suppliers) && incoming.suppliers.length > 0) {
    db.suppliers = incoming.suppliers;
  }
  if (Array.isArray(incoming.drinkStores) && incoming.drinkStores.length > 0) {
    db.drinkStores = incoming.drinkStores;
  }
  if (Array.isArray(incoming.users) && incoming.users.length > 0) {
    db.users = incoming.users;
  }
  if (Array.isArray(incoming.invites) && incoming.invites.length > 0) {
    db.invites = incoming.invites;
  }

  saveDatabase(db);
  res.json({ success: true, db });
});

// ----------------- Static Frontend Hosting -----------------
// When deployed on Render, serve the built React app from /dist
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Fallback for SPA routing in Express 5
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 VITCHA Central Server running on http://0.0.0.0:${PORT}`);
});
