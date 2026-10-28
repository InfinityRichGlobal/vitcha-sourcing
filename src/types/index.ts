export type UserRole = 'admin' | 'editor' | 'reviewer' | 'viewer';

export type CountryOrigin = 'CN' | 'TH';

export type HandoffStage = 
  | 'awaiting'       // 1. รอรับช่วงต่อ
  | 'rfq_sent'       // 2. ขอสเปก / ส่ง RFQ
  | 'sample_test'    // 3. สั่งตัวอย่างทดสอบ (Lab)
  | 'negotiate'      // 4. ต่อรองราคา & MOQ
  | 'approved'       // 5. ตัวเต็งอนุมัติ
  | 'ordered';       // 6. ออก PO / สั่งซื้อแล้ว

export type AppViewTab = 'dashboard' | 'suppliers' | 'drink_stores' | 'categories' | 'handoff' | 'settings' | 'members' | 'products';

export interface ViewLogEntry {
  userId: string;
  name: string;
  alias: string;
  avatar: string;
  role: UserRole;
  lastViewedAt: string; // ISO string
  viewCount: number;
}

export interface LikeEntry {
  userId: string;
  alias: string;
  avatar: string;
  timestamp: string;
}

export interface QuickMessageTemplate {
  id: string;
  title: string;
  text: string;
}

export interface User {
  id: string;
  name: string;
  alias: string;
  role: UserRole;
  avatar: string;
  pin?: string; // Only submitted when changing credentials; never returned by API
  revision?: number;
  emailOrId: string;
  createdAt: string;
  lastActiveAt?: string;
  statusNote?: string;
}

export type PipelineStatus = 'scouted' | 'reviewing' | 'rfq_sent' | 'shortlisted' | 'ordered';

export interface VoiceNoteEntry {
  id: string;
  url: string;
  durationSec: number;
  label?: string;
  createdAt?: string;
}

export interface CatalogItem {
  id: string;
  photo: string;
  name?: string;
  dimensions?: string; // e.g. 800 x 700 x 850 mm
  weightKg?: string;   // e.g. 45 kg
  priceRmb?: number;
  priceThb?: number;
  memo?: string;
  voiceNoteUrl?: string; // วอยซ์เฉพาะชิ้น (legacy / primary)
  voiceDurationSec?: number;
  voiceNotes?: VoiceNoteEntry[]; // รองรับบันทึกเสียงหลายรายการไม่จำกัด
}

export interface ReviewReply {
  authorId?: string;
  id: string;
  author: string;
  authorAvatar: string;
  authorRole: UserRole;
  text: string;
  timestamp: string;
  replyToAuthor?: string;
  replyToId?: string;
  voiceUrl?: string;
  audioUrl?: string;
  photoUrl?: string;
  duration?: number;
}

export interface ReviewerNote {
  authorId?: string;
  id: string;
  author: string;
  authorAvatar: string;
  authorRole: UserRole;
  text: string;
  timestamp: string;
  voiceUrl?: string;
  audioUrl?: string;
  photoUrl?: string;
  duration?: number;
  replies?: ReviewReply[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'supplier' | 'drink_store' | 'comment' | 'reply' | 'status' | 'system';
  targetId?: string;
  avatar?: string;
  actorId?: string;
  actorAlias?: string;
  forAdminOnly?: boolean;
  read: boolean;
  readBy?: string[];
  clearedBy?: string[];
}

export interface SupplierRecord {
  revision?: number;
  id: string;
  type: 'supplier';
  country?: CountryOrigin; // 'CN' | 'TH'
  name: string;
  chineseName?: string;
  marketOrCity?: string; // e.g. 'ตลาดเครื่องครัวผานหยู กวางโจว', 'ตลาดชาฟางชุน', 'กทม.'
  category: string;
  rating: number; // 1-5 stars
  quickTags: string[];
  isFactory?: boolean;
  phone?: string;
  wechatId?: string;
  lineId?: string;
  address?: string;
  photos: {
    storefrontAndAtmosphere: string[];
    contactCards: string[];
  };
  videos?: string[]; // รองรับการอัปโหลดและเปิดดูคลิปวิดีโอ
  catalogItems: CatalogItem[];
  memo?: string;
  voiceNoteUrl?: string;
  voiceDurationSec?: number;
  voiceNotes?: VoiceNoteEntry[]; // รองรับบันทึกเสียงหลายรายการไม่จำกัด
  location: {
    lat: number;
    lng: number;
    addressText?: string;
  };
  status: PipelineStatus;
  
  // Handoff & Operations fields (บริหารจัดการรับช่วงต่อ)
  assignedTo?: string;           // ผู้รับผิดชอบรับช่วงต่อ เช่น 'บีม R&D', 'แอน จัดซื้อ'
  targetFollowUpDate?: string;   // กำหนดวันติดตามผล
  handoffNotes?: string;         // บันทึกการเจรจา / ผลเทสต์
  handoffStage?: HandoffStage;   // สเตจการส่งมอบงาน

  creator: {
    id: string;
    name: string;
    alias: string;
    avatar: string;
    timestamp: string;
  };
  reviewerNotes: ReviewerNote[];
  viewedBy?: ViewLogEntry[];
  likes?: LikeEntry[];
  history: Array<{ action: string; user: string; timestamp: string }>;
  updatedAt: string;
}

export interface DrinkDetailItem {
  id: string;
  photo: string;
  name?: string;
  priceRmb?: number;
  priceThb?: number;
  cupSize?: string;
  fitMenuTarget?: string;
  gimmickNotes?: string;
  voiceNoteUrl?: string;
  voiceDurationSec?: number;
  voiceNotes?: VoiceNoteEntry[]; // รองรับบันทึกเสียงหลายรายการไม่จำกัด
}

export interface StoreInspoRecord {
  revision?: number;
  id: string;
  type: 'drink_store';
  country?: CountryOrigin; // 'CN' | 'TH'
  storeCategory?: string; // หมวดหมู่เฉพาะของร้านน้ำ แยกจากซัพพลายเออร์
  storeName: string;
  chineseName?: string;
  brandConcept?: string;
  city?: string;
  phone?: string;
  lineId?: string;
  wechatId?: string;
  photos: {
    storefrontAndAtmosphere: string[];
    menuBoard: string[];
    drinkCups: string[];
  };
  videos?: string[]; // รองรับการอัปโหลดและเปิดดูคลิปวิดีโอร้านน้ำ
  ratings: {
    taste: number;        // 1-5 stars รสชาติ
    aesthetics: number;   // 1-5 stars ความสวยงาม & แพ็กเกจจิ้ง
    value: number;        // 1-5 stars ความคุ้มค่า / ราคา
    speed: number;        // 1-5 stars ความเร็ว / บริการ
  };
  drinkItems: DrinkDetailItem[];
  tastingNotes?: string;
  voiceNoteUrl?: string;
  voiceDurationSec?: number;
  voiceNotes?: VoiceNoteEntry[]; // รองรับบันทึกเสียงหลายรายการไม่จำกัด
  location: {
    lat: number;
    lng: number;
    addressText?: string;
  };

  // Handoff & Operations fields
  assignedTo?: string;           // ผู้รับผิดชอบรับช่วงต่อ
  targetFollowUpDate?: string;   // กำหนดวันติดตามผล
  handoffNotes?: string;         // บันทึกการส่งมอบงาน / R&D ต่อ
  handoffStage?: HandoffStage;

  creator: {
    id: string;
    name: string;
    alias: string;
    avatar: string;
    timestamp: string;
  };
  reviewerNotes: ReviewerNote[];
  viewedBy?: ViewLogEntry[];
  likes?: LikeEntry[];
  history: Array<{ action: string; user: string; timestamp: string }>;
  updatedAt: string;
}

export interface ExchangeRateConfig {
  rate: number;
  isAuto: boolean;
  lastUpdated: string;
  currencyMode: 'CNY_TO_THB' | 'THB_TO_CNY';
}

export interface InviteLink {
  id: string;
  code: string;
  role: UserRole;
  prefilledAlias?: string;
  isUsed: boolean;
  createdAt: string;
  createdBy: string;
}

export interface ProductTaxon { id: string; name: string; }
export interface ProductSet { id: string; name: string; memo: string; productIds: string[]; revision?: number; updatedAt?: string; }
export interface CuratedProduct {
  id: string; supplierId: string; supplierName: string; sourceItemId: string; country: CountryOrigin;
  sourceName: string; sourceMemo: string; title: string; photo: string; dimensions: string; weightKg: string;
  priceRmb?: number; priceThb?: number; voiceNotes: VoiceNoteEntry[]; supplierVideos: string[];
  memo: string; categoryId: string; tagIds: string[]; decision: 'pending' | 'keep' | 'hold' | 'reject'; revision: number; updatedAt: string;
}
export type ProductChanges = Partial<Pick<CuratedProduct, 'title' | 'memo' | 'categoryId' | 'tagIds' | 'decision'>>;
