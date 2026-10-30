import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

const dbPath = path.join(ROOT, 'server/data/database.json');
let existingDb = { users: [] };
if (fs.existsSync(dbPath)) {
  existingDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const existingUserMap = new Map((existingDb.users || []).map(u => [u.id, u]));

const getAvatar = (id, fallback) => {
  const existing = existingUserMap.get(id);
  if (existing?.avatar) return existing.avatar;
  return fallback;
};

export const USER_ICE = {
  id: 'user-ice',
  name: 'SuperiCez (คุณไอซ์ - ผู้บริหาร & หัวหน้างาน)',
  alias: 'SuperiCez',
  role: 'admin',
  avatar: getAvatar('user-ice', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'supericez',
  createdAt: '2026-10-26T10:00:00Z',
  statusNote: 'ออนไลน์อยู่ขณะนี้ · ผู้ก่อตั้ง VITCHA (สำรวจจีน)',
};

export const USER_SOMO = {
  id: 'user-1793177529069',
  name: 'MommySomO (คุณส้ม - ผู้บริหาร & หัวหน้างาน)',
  alias: 'MommySomO',
  role: 'admin',
  avatar: getAvatar('user-1793177529069', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'somo@vitcha.com',
  createdAt: '2026-10-28T09:00:00Z',
  statusNote: 'ออนไลน์อยู่ขณะนี้ · ผู้ร่วมก่อตั้ง VITCHA (สำรวจจีน)',
};

export const USER_OHM = {
  id: 'user-88fda129-f88e-4bab-b300-2d6c7d4a45f7',
  name: 'P.Ohm (พี่โอม - ผู้บริหาร & หัวหน้างาน)',
  alias: 'P.Ohm',
  role: 'admin',
  avatar: getAvatar('user-88fda129-f88e-4bab-b300-2d6c7d4a45f7', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'ohm@vitcha.com',
  createdAt: '2026-10-26T10:30:00Z',
  statusNote: 'ออนไลน์อยู่ขณะนี้ · ผู้บริหาร VITCHA (สำรวจจีน)',
};

export const USER_TUI = {
  id: 'user-05523ee4-203c-4ecb-8a79-abc02a2c533e',
  name: 'P.ตุ้ย (พี่ตุ้ย - บิ๊กผู้บริหาร & หัวหน้างาน)',
  alias: 'P.ตุ้ย',
  role: 'admin',
  avatar: getAvatar('user-05523ee4-203c-4ecb-8a79-abc02a2c533e', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'tui@vitcha.com',
  createdAt: '2026-10-28T10:00:00Z',
  statusNote: 'ออนไลน์อยู่ขณะนี้ · ผู้บริหาร VITCHA (สำรวจจีน)',
};

export const USER_MAY = {
  id: 'user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8',
  name: 'May (R&D สูตรเครื่องดื่ม & ชิมชา)',
  alias: 'May (R&D)',
  role: 'admin',
  avatar: getAvatar('user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'may@vitcha.com',
  createdAt: '2026-10-28T11:00:00Z',
  statusNote: 'ออนไลน์อยู่แล็บ · R&D สูตรเครื่องดื่ม, ชิมชา, วิตามินบาร์ & สาขาแฟรนไชส์',
};

export const USER_ZEEN = {
  id: 'user-6ed8144d-a03f-438a-b78e-f4df23a6cadd',
  name: 'Zeen (สำรวจทำเลในไทย)',
  alias: 'Zeen',
  role: 'admin',
  avatar: getAvatar('user-6ed8144d-a03f-438a-b78e-f4df23a6cadd', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'zeen@vitcha.com',
  createdAt: '2026-10-28T11:30:00Z',
  statusNote: 'สำรวจหน้างานในไทย · โลเคชั่น & ทำเลเปิดร้าน',
};

export const USER_MILD = {
  id: 'user-80e9b44f-085e-4b9b-a341-9d07dab08b5c',
  name: 'Mild (สำรวจทำเลในไทย)',
  alias: 'Mild',
  role: 'admin',
  avatar: getAvatar('user-80e9b44f-085e-4b9b-a341-9d07dab08b5c', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'mild@vitcha.com',
  createdAt: '2026-10-28T11:45:00Z',
  statusNote: 'สำรวจหน้างานในไทย · โลเคชั่น & ทำเลเปิดร้าน',
};

export const USER_NAME_PKG = {
  id: 'user-90467473-6ca6-446d-90f5-cb0fbd44049e',
  name: 'อยากกินของอร่อยทุกวัน (แพ็กเกจจิ้ง & ร่วมดูแลอุปกรณ์)',
  alias: 'อยากกินของอร่อยทุกวัน',
  role: 'admin',
  avatar: getAvatar('user-90467473-6ca6-446d-90f5-cb0fbd44049e', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'pkg@vitcha.com',
  createdAt: '2026-10-28T12:00:00Z',
  statusNote: 'ออนไลน์ · แก้ว หลอด ฝา ซีล ถุงหิ้ว ฉลาก & ร่วมดูแลอุปกรณ์',
};

export const USER_AYAI = {
  id: 'user-182f08eb-c9a2-447a-b283-053fb05df1e2',
  name: 'ayai (บูธ คีออส & ร่วมดูแลอุปกรณ์)',
  alias: 'ayai',
  role: 'admin',
  avatar: getAvatar('user-182f08eb-c9a2-447a-b283-053fb05df1e2', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'ayai@vitcha.com',
  createdAt: '2026-10-28T12:15:00Z',
  statusNote: 'ออนไลน์ · บูธ คีออส ตกแต่ง งานป้าย งานระบบ & ร่วมดูแลอุปกรณ์',
};

export const USER_LEK = {
  id: 'user-d514853d-e30c-4ff2-b5a0-c4949d96588c',
  name: 'Lek (ผู้จัดการอุปกรณ์เครื่องจักรในร้านทั้งหมด)',
  alias: 'Lek',
  role: 'admin',
  avatar: getAvatar('user-d514853d-e30c-4ff2-b5a0-c4949d96588c', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'lek@vitcha.com',
  createdAt: '2026-10-28T12:30:00Z',
  statusNote: 'ออนไลน์ · ดูแลเครื่องจักรหลัก เครื่องสกัดชา หม้อต้ม เครื่องซีล ตู้ทำน้ำแข็ง ไซรัป สมูทตี้',
};

export const USER_BEAM = {
  id: 'user-beam',
  name: 'ช่างบีม (วิศวกรระบบและไฟ)',
  alias: 'ช่างบีม (วิศวกร)',
  role: 'reviewer',
  avatar: getAvatar('user-beam', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'beam@vitcha.com',
  createdAt: '2026-10-26T11:00:00Z',
};

export const USER_ANN = {
  id: 'user-ann',
  name: 'คุณแอน (จัดซื้อและนำเข้า)',
  alias: 'แอน (จัดซื้อ)',
  role: 'viewer',
  avatar: getAvatar('user-ann', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'ann@vitcha.com',
  createdAt: '2026-10-26T11:30:00Z',
};

export const USER_MOOK = {
  id: 'user-mook',
  name: 'น้องมุก (ทีมสำรวจหน้างาน)',
  alias: 'มุก (Field Scout)',
  role: 'admin',
  avatar: getAvatar('user-mook', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'),
  emailOrId: 'mook@vitcha.com',
  createdAt: '2026-10-26T12:00:00Z',
};

export const ALL_USERS = [
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
  USER_BEAM,
  USER_ANN,
  USER_MOOK,
];
