export type UserRole = 'admin' | 'editor' | 'reviewer' | 'viewer';

export type CountryOrigin = 'CN' | 'TH';

export type HandoffStage = 
  | 'awaiting'       // 1. รอรับช่วงต่อ
  | 'rfq_sent'       // 2. ขอสเปก / ส่ง RFQ
  | 'sample_test'    // 3. สั่งตัวอย่างทดสอบ (Lab)
  | 'negotiate'      // 4. ต่อรองราคา & MOQ
  | 'approved'       // 5. ตัวเต็งอนุมัติ
  | 'ordered';       // 6. ออก PO / สั่งซื้อแล้ว

export type AppViewTab = 'dashboard' | 'suppliers' | 'drink_stores' | 'locations' | 'categories' | 'handoff' | 'settings' | 'members' | 'products' | 'lead_lab' | 'franchise_stores' | 'trash';

export interface TrashedItem {
  id: string;
  name?: string;
  storeName?: string;
  type: 'supplier' | 'drink_store' | 'location' | 'franchise_store' | 'lead_lab';
  _trashedFrom: 'suppliers' | 'drinkStores' | 'locations' | 'franchiseStores' | 'leadLabItems';
  trashedAt: string;
  trashedBy: string;
  category?: string;
  storeCategory?: string;
  locationType?: string;
  photos?: Record<string, string[]> | string[];
  notes?: string;
  rating?: number;
  [key: string]: any;
}

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
  type: 'supplier' | 'drink_store' | 'location' | 'comment' | 'reply' | 'status' | 'system';
  targetId?: string;
  targetName?: string;
  targetType?: string;
  targetLocation?: string;
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
  isMockup?: boolean;
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
    role?: UserRole;
  };
  reviewerNotes: ReviewerNote[];
  viewedBy?: ViewLogEntry[];
  likes?: LikeEntry[];
  history: Array<{ action: string; user: string; userAvatar?: string; timestamp: string }>;
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
  isMockup?: boolean;
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
    role?: UserRole;
  };
  reviewerNotes: ReviewerNote[];
  viewedBy?: ViewLogEntry[];
  likes?: LikeEntry[];
  history: Array<{ action: string; user: string; userAvatar?: string; timestamp: string }>;
  updatedAt: string;
}

export type LocationType = 'mall' | 'community' | 'office' | 'street' | 'transit' | string;
export type LayoutFormat = 'inline' | 'corner' | 'island' | 'kiosk';
export type RentModel = 'fixed' | 'gp' | 'hybrid';

export interface SpaceSpecs {
  usableAreaSqm: number;         // ขนาดพื้นที่ ตร.ม.
  frontageWidthM: number;        // หน้ากว้าง (เมตร)
  ceilingHeightM: number;        // ความสูงเพดาน (เมตร)
  layoutFormat: LayoutFormat;    // รูปแบบห้อง
  electricalPower?: string;      // สเปกไฟ เช่น ไฟ 3 เฟส 45 kVA
  hasWaterInflow?: boolean;      // มีท่อน้ำดี
  hasDrainage?: boolean;         // มีท่อน้ำทิ้ง
  hasGreaseTrap?: boolean;       // มีถังดักไขมัน
  riderAccessNotes?: string;     // จุดจอดไรเดอร์และการเข้าถึง
}

export interface LeaseTerms {
  rentModel: RentModel;          // รูปแบบค่าเช่า (Fixed / GP / Hybrid)
  monthlyRentThb?: number;       // ค่าเช่าบาท/เดือน
  monthlyRentRmb?: number;       // ค่าเช่าหยวน/เดือน
  gpPercent?: number;            // ส่วนแบ่ง GP %
  serviceFeePerSqm?: number;     // ค่าบริการส่วนกลาง/ตร.ม.
  depositMonths?: number;        // เงินประกันกี่เดือน
  leasePeriodYears?: number;     // ระยะเวลาสัญญากี่ปี
  fitOutPeriodDays?: number;     // ระยะปลอดค่าเช่าตกแต่ง (วัน)
  contactPerson?: string;        // ชื่อผู้ติดต่อฝ่ายเช่า
  contactPhone?: string;         // เบอร์โทร
  contactLineWechat?: string;    // LINE / WeChat
}

export interface LocationRatings {
  footTraffic: number;           // 1-5 ดาว คุณภาพคนเดิน
  visibility: number;            // 1-5 ดาว ความสะดุดตา/ไม่โดนบัง
  accessibility: number;         // 1-5 ดาว การเข้าถึงของลูกค้า/ไรเดอร์
  valueRoi: number;              // 1-5 ดาว ความคุ้มค่าค่าเช่า
}

export interface LocationRecord {
  revision?: number;
  id: string;
  type: 'location';
  country?: CountryOrigin;       // 'CN' | 'TH'
  isMockup?: boolean;
  name: string;                  // ชื่อทำเล / โครงการ
  foreignName?: string;          // ชื่ออังกฤษ / จีน
  locationType: LocationType;    // ประเภทห้าง / อาคาร
  zoneOrFloor: string;           // ชั้น และ โซน
  unitNumber?: string;           // เลขที่ห้อง
  location: {
    lat: number;
    lng: number;
    addressText?: string;
  };
  spaceSpecs: SpaceSpecs;
  leaseTerms: LeaseTerms;
  ratings: LocationRatings;
  photos: {
    storefrontAndAtmosphere: string[];
    floorPlanAndSpecs?: string[];
    surroundingNeighbors?: string[];
    contactCards?: string[];
  };
  videos?: string[];
  voiceNoteUrl?: string;
  voiceDurationSec?: number;
  voiceNotes?: VoiceNoteEntry[];
  quickTags: string[];

  // Handoff & Operations fields
  assignedTo?: string;           // ผู้รับผิดชอบรับช่วงต่อ
  targetFollowUpDate?: string;   // กำหนดวันติดตามผล
  handoffNotes?: string;         // บันทึกการส่งมอบงาน / เจรจา
  handoffStage?: HandoffStage;

  creator: {
    id: string;
    name: string;
    alias: string;
    avatar: string;
    timestamp: string;
    role?: UserRole;
  };
  reviewerNotes: ReviewerNote[];
  viewedBy?: ViewLogEntry[];
  likes?: LikeEntry[];
  history: Array<{ action: string; user: string; userAvatar?: string; timestamp: string }>;
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

// ==========================================
// LEAD LAB 🧪 & FRANCHISE STORES TYPES
// ==========================================

export type LabItemType = 'drink' | 'topping';
export type LabFormulaStatus = 'approved' | 'testing' | 'shelved';

export interface SweetnessDetail {
  level: '0' | '50' | '100';
  label: string;
  syrupMl: number;
  sweetenerType: string;
  baseLiquidMl: number;
  milkOrMixerMl?: number;
  brix: number;
  caloriesKcal: number;
  tasteNotes: string;
}

export interface LabComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  content: string;
  sweetnessTarget?: 'all' | '0' | '50' | '100';
  likes: string[];
}

export interface LabRevisionCycle {
  cycleNumber: number;
  title: string;
  status: 'active' | 'closed';
  createdAt: string;
  createdBy: string;
  closedAt?: string;
  closedBy?: string;
  summary?: string;
  comments: LabComment[];
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  costThb: number;
}

export interface LabItem {
  id: string;
  type: LabItemType;
  code: string;
  name: string;
  nameEn: string;
  category: string;
  status: LabFormulaStatus;
  photoUrl: string;
  description: string;
  sweetnessLevels: {
    zero: SweetnessDetail;
    half: SweetnessDetail;
    full: SweetnessDetail;
  };
  technicalSpecs?: {
    brewingTempC?: number;
    extractionTimeSec?: number;
    teaLeavesG?: number;
    waterMl?: number;
    shelfLifeHours?: number;
  };
  ingredients: RecipeIngredient[];
  costIngredientThb: number;
  costPackagingThb: number;
  costTotalThb: number;
  suggestedPriceThb: number;
  likedBy: string[];
  revisionCycles: LabRevisionCycle[];
  galleryPhotos?: string[];
  audioNotes?: Array<{
    id: string;
    url: string;
    duration?: number;
    title?: string;
    createdAt?: string;
    authorName?: string;
  }>;
  videos?: string[];
  viewLogs?: ViewLogEntry[];
  createdById: string;
  createdByName: string;
  createdByAvatar?: string;
  createdAt: string;
  updatedAt: string;
  isMock?: boolean;
}

export interface StoreMenuItem {
  id: string;
  labItemId: string;
  category?: string;
  customName?: string;
  retailPriceThb: number;
  badge?: 'Best Seller' | 'Must Try' | 'New' | 'Signature' | 'Seasonal' | 'None';
  displayOrder: number;
  isAvailable: boolean;
  recommendedToppingIds?: string[];
}

export interface FranchiseStore {
  id: string;
  name: string;
  brandTagline: string;
  branch: string;
  themeColor: string;
  logoUrl?: string;
  contactNumber?: string;
  openingHours?: string;
  menuCategories?: string[];
  likedBy?: string[];
  revisionCycles?: LabRevisionCycle[];
  viewLogs?: ViewLogEntry[];
  menuItems: StoreMenuItem[];
  createdAt: string;
  updatedAt: string;
  isMock?: boolean;
}

