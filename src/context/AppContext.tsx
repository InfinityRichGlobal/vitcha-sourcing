import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeSetLocalStorage } from '../utils/imageCompressor';
import {
  User,
  SupplierRecord,
  StoreInspoRecord,
  ExchangeRateConfig,
  InviteLink,
  PipelineStatus,
  UserRole,
  AppNotification,
  ReviewReply,
  HandoffStage,
  AppViewTab,
  QuickMessageTemplate,
  ViewLogEntry,
  LikeEntry,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_SUPPLIERS,
  INITIAL_DRINK_STORES,
  INITIAL_INVITES,
  INITIAL_CATEGORIES,
  INITIAL_STORE_CATEGORIES,
  INITIAL_QUICK_TAGS,
  INITIAL_QUICK_MESSAGES,
} from '../utils/seedData';
import {
  isFirebaseConfigured,
  subscribeCloudSuppliers,
  subscribeCloudDrinkStores,
  subscribeCloudUsers,
  subscribeCloudInvites,
  saveSupplierToCloud,
  deleteSupplierFromCloud,
  saveStoreToCloud,
  deleteStoreFromCloud,
  saveUserToCloud,
  saveInviteToCloud,
} from '../services/firebase';
import {
  getRenderServerUrl,
  saveRenderServerUrl,
  checkServerHealth,
  fetchCentralData,
  postSupplierToCentral,
  deleteSupplierFromCentral,
  postStoreToCentral,
  deleteStoreFromCentral,
  postUserToCentral,
  deleteUserFromCentral,
  postInviteToCentral,
  deleteInviteFromCentral,
  postNotificationToCentral,
  syncAllToCentral,
} from '../services/api';

interface AppContextType {
  currentUser: User;
  users: User[];
  suppliers: SupplierRecord[];
  drinkStores: StoreInspoRecord[];
  invites: InviteLink[];
  categories: string[];
  storeCategories: string[];
  quickTagsList: string[];
  quickMessages: QuickMessageTemplate[];
  exchangeRate: ExchangeRateConfig;
  syncStatus: 'online' | 'offline';
  pendingSyncCount: number;
  activeTab: AppViewTab;
  countryFilter: 'all' | 'CN' | 'TH';
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedTag: string;
  selectedRating: number | null;
  notifications: AppNotification[];
  activeToast: AppNotification | null;

  setActiveTab: (tab: AppViewTab) => void;
  setCountryFilter: (c: 'all' | 'CN' | 'TH') => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedStatus: (status: string) => void;
  setSelectedTag: (tag: string) => void;
  setSelectedRating: (rating: number | null) => void;
  dismissToast: () => void;
  markAllNotificationsRead: () => void;
  broadcastNotification: (
    title: string,
    message: string,
    type: AppNotification['type'],
    targetId?: string,
    avatar?: string,
    suppressToast?: boolean,
    options?: {
      actorId?: string;
      actorAlias?: string;
      isCategory5?: boolean;
    }
  ) => void;

  // Settings & Management (สำหรับ 2 สิทธิ์ระดับบน Admin & Editor)
  addCategory: (cat: string) => void;
  editCategory: (oldCat: string, newCat: string) => void;
  deleteCategory: (cat: string) => void;
  addStoreCategory: (cat: string) => void;
  editStoreCategory: (oldCat: string, newCat: string) => void;
  deleteStoreCategory: (cat: string) => void;
  addQuickTag: (tag: string) => void;
  editQuickTag: (oldTag: string, newTag: string) => void;
  deleteQuickTag: (tag: string) => void;
  addQuickMessage: (title: string, text: string) => void;
  editQuickMessage: (id: string, title: string, text: string) => void;
  deleteQuickMessage: (id: string) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  recordItemView: (targetId: string, type: 'supplier' | 'drink_store') => void;
  toggleLikeItem: (targetId: string, type: 'supplier' | 'drink_store') => void;
  loadFullMockupData: () => void;
  resetSystemData: (clearEmpty?: boolean) => void;

  // Handoff & Operations (บริหารจัดการรับช่วงต่อ)
  updateHandoff: (
    id: string,
    type: 'supplier' | 'drink_store',
    data: {
      assignedTo?: string;
      targetFollowUpDate?: string;
      handoffNotes?: string;
      handoffStage?: HandoffStage;
      status?: PipelineStatus;
    }
  ) => void;

  // Actions
  addSupplier: (supplier: Omit<SupplierRecord, 'id' | 'type' | 'creator' | 'reviewerNotes' | 'history' | 'updatedAt'>) => SupplierRecord;
  updateSupplier: (id: string, updates: Partial<SupplierRecord>) => void;
  deleteSupplier: (id: string) => void;

  addStoreInspo: (store: Omit<StoreInspoRecord, 'id' | 'type' | 'creator' | 'reviewerNotes' | 'history' | 'updatedAt'>) => StoreInspoRecord;
  updateStoreInspo: (id: string, updates: Partial<StoreInspoRecord>) => void;
  deleteStoreInspo: (id: string) => void;

  // Edit Item Modal State (สำหรับ 2 สิทธิ์ระดับบน Admin & Editor)
  canEditItems: boolean;
  editingSupplier: SupplierRecord | null;
  editingStore: StoreInspoRecord | null;
  openEditItem: (item: SupplierRecord | StoreInspoRecord) => void;
  closeEditItem: () => void;

  addReviewerNote: (targetId: string, type: 'supplier' | 'drink_store', noteText: string) => void;
  addReviewReply: (targetId: string, type: 'supplier' | 'drink_store', noteId: string, replyText: string, replyToAuthor?: string) => void;
  updatePipelineStatus: (supplierId: string, status: PipelineStatus) => void;

  updateExchangeRate: (rate: number, isAuto?: boolean) => void;
  toggleCurrencyMode: () => void;
  convertCnyToThb: (cny: number) => number;
  convertThbToCny: (thb: number) => number;

  updateCurrentUserProfile: (
    name: string,
    alias: string,
    avatar: string,
    pin?: string,
    emailOrId?: string
  ) => void;
  switchUser: (userId: string) => void;
  simulatedFromAdmin: boolean;
  restoreAdminUser: () => void;
  deleteUser: (userId: string) => Promise<boolean>;
  deleteInvite: (inviteId: string) => Promise<boolean>;
  refreshCentralData: () => Promise<void>;
  isAuthenticated: boolean;
  logout: () => void;
  loginWithCredentials: (usernameOrEmail: string, passOrPin: string) => boolean;
  loginWithPin: (idOrEmail: string, pin: string) => boolean;
  createInvite: (role: UserRole, prefilledAlias?: string) => InviteLink;
  redeemInvite: (code: string, name: string, alias: string, avatar: string, pin: string) => User | null;
  registerUserWithInvite: (
    code: string,
    name: string,
    alias: string,
    emailOrId: string,
    pin: string,
    avatar: string,
    fallbackRole?: UserRole
  ) => User;

  // Render Central Server
  renderStatus: 'connected' | 'connecting' | 'disconnected';
  renderServerUrl: string;
  setRenderServerUrl: (url: string) => void;
  testRenderConnection: (url?: string) => Promise<{ ok: boolean; message: string; count?: any }>;
  syncAllDataToRender: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_VIEWED_BY: ViewLogEntry[] = [
  {
    userId: 'user-ice',
    name: 'Ice (SuperiCez - ผู้ก่อตั้ง)',
    alias: 'SuperiCez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    lastViewedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    viewCount: 3,
  },
  {
    userId: 'user-beam',
    name: 'ช่างบีม (วิศวกรระบบและไฟ)',
    alias: 'ช่างบีม (วิศวกร)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'reviewer',
    lastViewedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    viewCount: 2,
  },
  {
    userId: 'user-ann',
    name: 'คุณแอน (จัดซื้อและนำเข้า)',
    alias: 'แอน (จัดซื้อ)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'reviewer',
    lastViewedAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    viewCount: 1,
  },
];

const DEFAULT_LIKES: LikeEntry[] = [
  {
    userId: 'user-ice',
    alias: 'SuperiCez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    userId: 'user-beam',
    alias: 'ช่างบีม (วิศวกร)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

function normalizeSuppliers(list: SupplierRecord[]): SupplierRecord[] {
  return (list || []).map((s, idx) => ({
    ...s,
    type: 'supplier',
    country: s.country || 'CN',
    quickTags: Array.isArray(s.quickTags) ? s.quickTags : [],
    catalogItems: Array.isArray(s.catalogItems) ? s.catalogItems : [],
    reviewerNotes: Array.isArray(s.reviewerNotes)
      ? s.reviewerNotes.map((n) => ({ ...n, replies: Array.isArray(n.replies) ? n.replies : [] }))
      : [],
    photos: {
      storefrontAndAtmosphere: Array.isArray(s.photos?.storefrontAndAtmosphere)
        ? s.photos.storefrontAndAtmosphere
        : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'],
      contactCards: Array.isArray(s.photos?.contactCards) ? s.photos.contactCards : [],
    },
    location: s.location || { lat: 23.0965, lng: 113.3644, addressText: s.marketOrCity || 'กวางโจว' },
    likes: Array.isArray(s.likes) ? s.likes : DEFAULT_LIKES.slice(0, (idx % 2) + 1),
    viewedBy: Array.isArray(s.viewedBy) && s.viewedBy.length > 0
      ? s.viewedBy
      : DEFAULT_VIEWED_BY.slice(0, (idx % 3) + 1),
    history: Array.isArray(s.history) ? s.history : [],
  }));
}

function normalizeStores(list: StoreInspoRecord[]): StoreInspoRecord[] {
  return (list || []).map((d, idx) => ({
    ...d,
    type: 'drink_store',
    country: d.country || 'CN',
    storeCategory: d.storeCategory || INITIAL_STORE_CATEGORIES[idx % INITIAL_STORE_CATEGORIES.length],
    drinkItems: Array.isArray(d.drinkItems) ? d.drinkItems : [],
    reviewerNotes: Array.isArray(d.reviewerNotes)
      ? d.reviewerNotes.map((n) => ({ ...n, replies: Array.isArray(n.replies) ? n.replies : [] }))
      : [],
    photos: {
      storefrontAndAtmosphere: Array.isArray(d.photos?.storefrontAndAtmosphere)
        ? d.photos.storefrontAndAtmosphere
        : ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'],
      menuBoard: Array.isArray(d.photos?.menuBoard) ? d.photos.menuBoard : [],
      drinkCups: Array.isArray(d.photos?.drinkCups) ? d.photos.drinkCups : [],
    },
    ratings: d.ratings || { taste: 5, aesthetics: 5, value: 4, speed: 5 },
    location: d.location || { lat: 23.1322, lng: 113.3274, addressText: d.city || 'กวางโจว' },
    likes: Array.isArray(d.likes) ? d.likes : DEFAULT_LIKES.slice(0, ((idx + 1) % 2) + 1),
    viewedBy: Array.isArray(d.viewedBy) && d.viewedBy.length > 0
      ? d.viewedBy
      : DEFAULT_VIEWED_BY.slice(0, ((idx + 1) % 3) + 1),
    history: Array.isArray(d.history) ? d.history : [],
  }));
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('vitcha_users_v5');
      let parsedUsers: User[] = saved ? JSON.parse(saved) : INITIAL_USERS;
      // Ensure user-ice has the modern SuperiCez alias and email
      parsedUsers = parsedUsers.map((u) => {
        if (u.id === 'user-ice') {
          return {
            ...u,
            alias: 'SuperiCez',
            emailOrId: 'supericez',
          };
        }
        return u;
      });

      // Ensure initial users like Mommy SomO and SuperiCez are always included
      INITIAL_USERS.forEach((initU) => {
        if (!parsedUsers.some((u) => u.id === initU.id || (initU.emailOrId && u.emailOrId === initU.emailOrId))) {
          parsedUsers.push(initU);
        }
      });

      const savedCurrent = localStorage.getItem('vitcha_current_user_v5');
      if (savedCurrent) {
        const parsedCurrent: User = JSON.parse(savedCurrent);
        const exists = parsedUsers.some((u) => u.id === parsedCurrent.id);
        if (exists) {
          return parsedUsers.map((u) =>
            u.id === parsedCurrent.id ? { ...u, ...parsedCurrent } : u
          );
        }
        return [parsedCurrent, ...parsedUsers];
      }
      return parsedUsers;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const savedUser = localStorage.getItem('vitcha_current_user_v5');
      if (savedUser) {
        const parsed: User = JSON.parse(savedUser);
        if (parsed.id === 'user-ice') {
          return { ...parsed, alias: 'SuperiCez', emailOrId: 'supericez' };
        }
        return parsed;
      }
      const savedUsers = localStorage.getItem('vitcha_users_v5');
      if (savedUsers) {
        const parsed: User[] = JSON.parse(savedUsers);
        if (parsed.length > 0) return parsed[0];
      }
      return INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('vitcha_authenticated_session') === 'true';
  });

  const [simulatedFromAdmin, setSimulatedFromAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('vitcha_simulated_admin') === 'true';
  });

  const [suppliers, setSuppliers] = useState<SupplierRecord[]>(() => {
    const saved = localStorage.getItem('vitcha_suppliers_v5');
    if (saved) {
      try {
        return normalizeSuppliers(JSON.parse(saved));
      } catch {
        return normalizeSuppliers(INITIAL_SUPPLIERS);
      }
    }
    return normalizeSuppliers(INITIAL_SUPPLIERS);
  });

  const [drinkStores, setDrinkStores] = useState<StoreInspoRecord[]>(() => {
    const saved = localStorage.getItem('vitcha_drink_stores_v5');
    if (saved) {
      try {
        return normalizeStores(JSON.parse(saved));
      } catch {
        return normalizeStores(INITIAL_DRINK_STORES);
      }
    }
    return normalizeStores(INITIAL_DRINK_STORES);
  });

  const [invites, setInvites] = useState<InviteLink[]>(() => {
    const saved = localStorage.getItem('vitcha_invites_v5');
    if (!saved) return INITIAL_INVITES;
    try {
      const parsed: InviteLink[] = JSON.parse(saved);
      const missing = INITIAL_INVITES.filter((init) => !parsed.some((p) => p.code === init.code));
      return [...missing, ...parsed];
    } catch {
      return INITIAL_INVITES;
    }
  });

  const [exchangeRate, setExchangeRate] = useState<ExchangeRateConfig>(() => {
    const saved = localStorage.getItem('vitcha_exchange_rate_v5');
    return saved
      ? JSON.parse(saved)
      : {
          rate: 5.08,
          isAuto: true,
          lastUpdated: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
          currencyMode: 'CNY_TO_THB',
        };
  });

  const [syncStatus, setSyncStatus] = useState<'online' | 'offline'>(() =>
    navigator.onLine ? 'online' : 'offline'
  );
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<AppViewTab>('dashboard');
  const [countryFilter, setCountryFilter] = useState<'all' | 'CN' | 'TH'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Dynamic Supplier Categories
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('vitcha_categories_v5');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Dynamic Drink Store Categories (แยกหมวดหมู่เฉพาะ ร้านน้ำ & เรฟ)
  const [storeCategories, setStoreCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('vitcha_store_categories_v5');
    return saved ? JSON.parse(saved) : INITIAL_STORE_CATEGORIES;
  });

  // Dynamic Quick-Tap Tags
  const [quickTagsList, setQuickTagsList] = useState<string[]>(() => {
    const saved = localStorage.getItem('vitcha_quick_tags_v5');
    return saved ? JSON.parse(saved) : INITIAL_QUICK_TAGS;
  });

  // Dynamic Quick Messages / Preset Notes
  const [quickMessages, setQuickMessages] = useState<QuickMessageTemplate[]>(() => {
    const saved = localStorage.getItem('vitcha_quick_messages_v5');
    return saved ? JSON.parse(saved) : INITIAL_QUICK_MESSAGES;
  });

  useEffect(() => {
    safeSetLocalStorage('vitcha_categories_v5', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_store_categories_v5', JSON.stringify(storeCategories));
  }, [storeCategories]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_quick_tags_v5', JSON.stringify(quickTagsList));
  }, [quickTagsList]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_quick_messages_v5', JSON.stringify(quickMessages));
  }, [quickMessages]);

  // Real-time Cloud Synchronization with Firebase Firestore
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const unsubSuppliers = subscribeCloudSuppliers((cloudSuppliers) => {
      setSuppliers(normalizeSuppliers(cloudSuppliers));
      safeSetLocalStorage('vitcha_suppliers_v5', JSON.stringify(cloudSuppliers));
    });

    const unsubStores = subscribeCloudDrinkStores((cloudStores) => {
      setDrinkStores(normalizeStores(cloudStores));
      safeSetLocalStorage('vitcha_drink_stores_v5', JSON.stringify(cloudStores));
    });

    const unsubUsers = subscribeCloudUsers((cloudUsers) => {
      setUsers(cloudUsers);
      safeSetLocalStorage('vitcha_users_v5', JSON.stringify(cloudUsers));
    });

    const unsubInvites = subscribeCloudInvites((cloudInvites) => {
      setInvites(cloudInvites);
      safeSetLocalStorage('vitcha_invites_v5', JSON.stringify(cloudInvites));
    });

    return () => {
      unsubSuppliers?.();
      unsubStores?.();
      unsubUsers?.();
      unsubInvites?.();
    };
  }, []);

  // Render Central Server State & Synchronization
  const [renderServerUrl, setRenderServerUrlState] = useState<string>(() => getRenderServerUrl());
  const [renderStatus, setRenderStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');

  const setRenderServerUrl = (url: string) => {
    saveRenderServerUrl(url);
    setRenderServerUrlState(url);
  };

  const testRenderConnection = async (url?: string) => {
    setRenderStatus('connecting');
    const result = await checkServerHealth(url || renderServerUrl);
    setRenderStatus(result.ok ? 'connected' : 'disconnected');
    return result;
  };

  const syncAllDataToRender = async () => {
    return await syncAllToCentral({
      suppliers,
      drinkStores,
      users,
      invites,
    });
  };

  // Push / Real-time In-App Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('vitcha_notifications_v5');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'notif-1',
        title: 'คุณไอซ์ บันทึกซัพพลายเออร์ใหม่',
        message: 'Foshan Sanjiu Tea Tech (เคาน์เตอร์ & สเตนเลส บูธ 9.2A-18)',
        timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        type: 'supplier',
        targetId: 'sup-1',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        read: false,
      },
      {
        id: 'notif-2',
        title: 'ช่างบีม ตอบกลับความคิดเห็น',
        message: 'ตัวเครื่องสกัดชาแรงดันสูงตัวนี้ ถ้าได้ใบชาชงสดสูตร Zaar จะกลิ่นหอมทะลักมาก',
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        type: 'reply',
        targetId: 'sup-1',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        read: false,
      },
      {
        id: 'notif-3',
        title: 'แอน (จัดซื้อ) คอมเม้นท์เรฟร้านน้ำ',
        message: 'CHAGEE (ป้าหวังฉาจี) ถ้วยกระดาษฟอยล์เก็บความเย็น สั่งโรงงานกวางโจวทำได้ค่ะ',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        type: 'comment',
        targetId: 'store-1',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        read: false,
      },
    ];
  });

  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  useEffect(() => {
    safeSetLocalStorage('vitcha_notifications_v5', JSON.stringify(notifications));
  }, [notifications]);

  const dismissToast = () => {
    setActiveToast(null);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const broadcastNotification = (
    title: string,
    message: string,
    type: AppNotification['type'],
    targetId?: string,
    avatar?: string,
    suppressToast = false,
    options?: {
      actorId?: string;
      actorAlias?: string;
      isCategory5?: boolean;
    }
  ) => {
    const actorId = options?.actorId ?? currentUser.id;
    const actorAlias = options?.actorAlias ?? currentUser.alias;
    const isCategory5 = options?.isCategory5 || false;

    // 1. หมวดที่ 5: ระบบ & ข้อมูลทดสอบ (System Operations)
    // "ไม่ต้องแจ้งครับ หรือแจ้งให้เฉพาะ ผมคนเดียว ผู้ทำระบบ"
    if (isCategory5) {
      if (currentUser.id === 'user-ice') {
        const notif: AppNotification = {
          id: `sys-${Date.now()}`,
          title,
          message,
          timestamp: new Date().toISOString(),
          type: 'system',
          avatar: avatar || currentUser.avatar,
          actorId,
          actorAlias,
          forAdminOnly: true,
          read: true,
        };
        if (!suppressToast) {
          setActiveToast(notif);
          setTimeout(() => {
            setActiveToast((current) => (current?.id === notif.id ? null : current));
          }, 3500);
        }
      }
      return; // ไม่ส่งขึ้นเซิร์ฟเวอร์ และไม่ส่งแจ้งเตือนให้สมาชิกคนอื่น
    }

    // 2. หมวดอื่นๆ (หมวด 1, 2, 3, 4):
    // "แจ้งทุกคนสำหรับหมวดนี้ รายชื่อหมวดดังนี้ แต่ไม่แจ้งตนเองเมื่อเป็นผู้กระทำนั้นๆ"
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      type,
      targetId,
      avatar: avatar || currentUser.avatar,
      actorId,
      actorAlias,
      forAdminOnly: false,
      read: false,
    };

    // ส่งเข้า Central Server เพื่อกระจายให้สมาชิกคนอื่นในทีมทุกคน
    postNotificationToCentral(newNotif);

    // *ตามคำสั่ง*: ตนเองเป็นผู้กระทำ จะไม่เด้งแจ้งเตือนตนเอง ("แต่ไม่แจ้งตนเองเมื่อเป็นผู้กระทำนั้นๆ")
  };

  // Refresh & Synchronize Central Server Data (ดึงข้อมูลล่าสุดจาก Render + แจ้งเตือนเมื่อมีสมาชิกใหม่)
  const refreshCentralData = async () => {
    try {
      const data = await fetchCentralData();
      if (!data) {
        setRenderStatus('disconnected');
        return;
      }
      setRenderStatus('connected');

      if (Array.isArray(data.users) && data.users.length > 0) {
        setUsers((prevUsers) => {
          const prevIds = new Set(prevUsers.map((u) => u.id));
          const newUsersFound = data.users.filter((u: User) => !prevIds.has(u.id));
          if (newUsersFound.length > 0) {
            newUsersFound.forEach((nu: User) => {
              if (!['user-ice', 'user-beam', 'user-ann', 'user-mook', 'user-somo'].includes(nu.id)) {
                broadcastNotification(
                  '🔔 สมาชิกใหม่เข้าร่วมทีม',
                  `คุณ ${nu.alias || nu.name} สมัครเข้าใช้งานในสิทธิ์ [${nu.role}]`,
                  'system',
                  undefined,
                  nu.avatar,
                  false,
                  { actorId: nu.id, actorAlias: nu.alias || nu.name }
                );
              }
            });
          }
          const userMap = new Map<string, User>();
          prevUsers.forEach((u) => userMap.set(u.id, u));
          data.users.forEach((u: User) => userMap.set(u.id, { ...userMap.get(u.id), ...u }));

          // 2-Way Sync: If local has users not on server, push them to server immediately
          const serverUserIds = new Set(data.users.map((u: User) => u.id));
          prevUsers.forEach((pu) => {
            if (!serverUserIds.has(pu.id)) {
              postUserToCentral(pu);
            }
          });

          const merged = Array.from(userMap.values());
          safeSetLocalStorage('vitcha_users_v5', JSON.stringify(merged));
          return merged;
        });
      }

      if (Array.isArray(data.invites) && data.invites.length > 0) {
        setInvites((prevInvites) => {
          const invMap = new Map<string, InviteLink>();
          prevInvites.forEach((i) => invMap.set(i.id || i.code, i));
          data.invites.forEach((i: InviteLink) => {
            const key = i.id || i.code;
            invMap.set(key, { ...invMap.get(key), ...i });
          });
          const merged = Array.from(invMap.values());
          safeSetLocalStorage('vitcha_invites_v5', JSON.stringify(merged));
          return merged;
        });
      }

      if (Array.isArray(data.suppliers) && data.suppliers.length > 0) {
        setSuppliers((prev) => {
          const supMap = new Map<string, SupplierRecord>();
          prev.forEach((s) => supMap.set(s.id, s));
          data.suppliers.forEach((s: SupplierRecord) => {
            supMap.set(s.id, { ...supMap.get(s.id), ...s });
          });
          const merged = normalizeSuppliers(Array.from(supMap.values()));
          safeSetLocalStorage('vitcha_suppliers_v5', JSON.stringify(merged));
          return merged;
        });
      }

      if (Array.isArray(data.drinkStores) && data.drinkStores.length > 0) {
        setDrinkStores((prev) => {
          const storeMap = new Map<string, StoreInspoRecord>();
          prev.forEach((s) => storeMap.set(s.id, s));
          data.drinkStores.forEach((s: StoreInspoRecord) => {
            storeMap.set(s.id, { ...storeMap.get(s.id), ...s });
          });
          const merged = normalizeStores(Array.from(storeMap.values()));
          safeSetLocalStorage('vitcha_drink_stores_v5', JSON.stringify(merged));
          return merged;
        });
      }

      // Synchronize Central Notifications from teammates
      if (Array.isArray(data.notifications) && data.notifications.length > 0) {
        setNotifications((prevNotifs) => {
          const prevIds = new Set(prevNotifs.map((n) => n.id));
          const incoming = data.notifications as AppNotification[];

          // 1. "ไม่แจ้งตนเองเมื่อเป็นผู้กระทำนั้นๆ": กรอง actorId === currentUser.id ออก
          // 2. "หมวดที่ 5: ไม่ต้องแจ้ง หรือแจ้งเฉพาะ user-ice": กรอง forAdminOnly ออก ถ้าไม่ใช่ user-ice
          const validForMe = incoming.filter((n) => {
            if (n.actorId && n.actorId === currentUser.id) return false;
            if (n.forAdminOnly && currentUser.id !== 'user-ice') return false;
            return true;
          });

          // ตรวจหารายการใหม่จากเพื่อนร่วมทีมที่เครื่องนี้ยังไม่เคยเห็น
          const newFromTeammates = validForMe.filter((n) => !prevIds.has(n.id));
          if (newFromTeammates.length > 0) {
            const newest = newFromTeammates[0];
            setActiveToast(newest);
            setTimeout(() => {
              setActiveToast((current) => (current?.id === newest.id ? null : current));
            }, 4500);

            if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
              try {
                new Notification(newest.title, {
                  body: newest.message,
                  icon: newest.avatar || './logo.jpg',
                });
              } catch {
                // ignore
              }
            }
          }

          const notifMap = new Map<string, AppNotification>();
          prevNotifs.forEach((n) => notifMap.set(n.id, n));
          validForMe.forEach((n) => {
            if (!notifMap.has(n.id)) {
              notifMap.set(n.id, n);
            }
          });
          const merged = Array.from(notifMap.values()).slice(0, 80);
          safeSetLocalStorage('vitcha_notifications_v5', JSON.stringify(merged));
          return merged;
        });
      }
    } catch {
      // offline fallback
    }
  };

  // Background Auto-Sync every 20s & on Tab/Window Focus
  useEffect(() => {
    refreshCentralData();
    const interval = setInterval(() => {
      refreshCentralData();
    }, 20000);

    const onFocus = () => {
      refreshCentralData();
    };
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const deleteUser = async (userId: string): Promise<boolean> => {
    if (userId === 'user-ice') {
      alert('ไม่สามารถลบผู้ก่อตั้งระบบ (SuperiCez) ได้');
      return false;
    }
    const target = users.find((u) => u.id === userId);
    const targetName = target ? target.alias : userId;
    const nextUsers = users.filter((u) => u.id !== userId);
    setUsers(nextUsers);
    safeSetLocalStorage('vitcha_users_v5', JSON.stringify(nextUsers));
    await deleteUserFromCentral(userId);
    broadcastNotification(
      '🗑️ ลบสมาชิกสำเร็จ',
      `นำคุณ ${targetName} ออกจากระบบเรียบร้อยแล้ว`,
      'system'
    );
    return true;
  };

  const deleteInvite = async (inviteId: string): Promise<boolean> => {
    const target = invites.find((i) => i.id === inviteId || i.code === inviteId);
    const nextInvites = invites.filter((inv) => inv.id !== inviteId && inv.code !== inviteId);
    setInvites(nextInvites);
    safeSetLocalStorage('vitcha_invites_v5', JSON.stringify(nextInvites));
    await deleteInviteFromCentral(inviteId);
    broadcastNotification(
      '🗑️ ลบคำเชิญสำเร็จ',
      `ลบรหัสคำเชิญ ${target?.code || inviteId} เรียบร้อยแล้ว`,
      'system'
    );
    return true;
  };

  const restoreAdminUser = () => {
    const admin = users.find((u) => u.id === 'user-ice') || INITIAL_USERS[0];
    setCurrentUser(admin);
    setSimulatedFromAdmin(false);
    sessionStorage.removeItem('vitcha_simulated_admin');
    safeSetLocalStorage('vitcha_current_user_v5', JSON.stringify(admin));
  };

  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus('online');
      setPendingSyncCount(0);
    };
    const handleOffline = () => {
      setSyncStatus('offline');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [editingSupplier, setEditingSupplier] = useState<SupplierRecord | null>(null);
  const [editingStore, setEditingStore] = useState<StoreInspoRecord | null>(null);

  // สองสิทธิ์ระดับบน (Admin & Editor) สามารถแก้ไขรายการได้
  const canEditItems = currentUser.role === 'admin' || currentUser.role === 'editor';

  const openEditItem = (item: SupplierRecord | StoreInspoRecord) => {
    if (!canEditItems) return;
    if (item.type === 'supplier') {
      setEditingSupplier(item as SupplierRecord);
      setEditingStore(null);
    } else {
      setEditingStore(item as StoreInspoRecord);
      setEditingSupplier(null);
    }
  };

  const closeEditItem = () => {
    setEditingSupplier(null);
    setEditingStore(null);
  };

  useEffect(() => {
    safeSetLocalStorage('vitcha_users_v5', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_current_user_v5', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_suppliers_v5', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_drink_stores_v5', JSON.stringify(drinkStores));
  }, [drinkStores]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_invites_v5', JSON.stringify(invites));
  }, [invites]);

  useEffect(() => {
    safeSetLocalStorage('vitcha_exchange_rate_v5', JSON.stringify(exchangeRate));
  }, [exchangeRate]);

  // Currency helpers
  const convertCnyToThb = (cny: number) => {
    return Math.round(cny * exchangeRate.rate * 100) / 100;
  };

  const convertThbToCny = (thb: number) => {
    return Math.round((thb / exchangeRate.rate) * 100) / 100;
  };

  const updateExchangeRate = (rate: number, isAuto = false) => {
    setExchangeRate({
      ...exchangeRate,
      rate,
      isAuto,
      lastUpdated: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const toggleCurrencyMode = () => {
    setExchangeRate({
      ...exchangeRate,
      currencyMode: exchangeRate.currencyMode === 'CNY_TO_THB' ? 'THB_TO_CNY' : 'CNY_TO_THB',
    });
  };

  // Supplier Categories
  const addCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories([...categories, trimmed]);
  };

  const editCategory = (oldCat: string, newCat: string) => {
    const trimmed = newCat.trim();
    if (!trimmed || trimmed === oldCat) return;
    setCategories((prev) => prev.map((c) => (c === oldCat ? trimmed : c)));
    setSuppliers((prev) =>
      prev.map((s) => (s.category === oldCat ? { ...s, category: trimmed } : s))
    );
    if (selectedCategory === oldCat) {
      setSelectedCategory(trimmed);
    }
  };

  const deleteCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  // Drink Store Categories
  const addStoreCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed || storeCategories.includes(trimmed)) return;
    setStoreCategories([...storeCategories, trimmed]);
  };

  const editStoreCategory = (oldCat: string, newCat: string) => {
    const trimmed = newCat.trim();
    if (!trimmed || trimmed === oldCat) return;
    setStoreCategories((prev) => prev.map((c) => (c === oldCat ? trimmed : c)));
    setDrinkStores((prev) =>
      prev.map((d) => (d.storeCategory === oldCat ? { ...d, storeCategory: trimmed } : d))
    );
    if (selectedCategory === oldCat) {
      setSelectedCategory(trimmed);
    }
  };

  const deleteStoreCategory = (cat: string) => {
    setStoreCategories(storeCategories.filter((c) => c !== cat));
  };

  // Quick Tags
  const addQuickTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || quickTagsList.includes(trimmed)) return;
    setQuickTagsList([...quickTagsList, trimmed]);
  };

  const editQuickTag = (oldTag: string, newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || trimmed === oldTag) return;
    setQuickTagsList((prev) => prev.map((t) => (t === oldTag ? trimmed : t)));
    setSuppliers((prev) =>
      prev.map((s) => ({
        ...s,
        quickTags: (s.quickTags || []).map((t) => (t === oldTag ? trimmed : t)),
      }))
    );
  };

  const deleteQuickTag = (tag: string) => {
    setQuickTagsList(quickTagsList.filter((t) => t !== tag));
  };

  // Quick Messages
  const addQuickMessage = (title: string, text: string) => {
    const newMsg: QuickMessageTemplate = {
      id: `qm-${Date.now()}`,
      title: title.trim(),
      text: text.trim(),
    };
    setQuickMessages([...quickMessages, newMsg]);
  };

  const editQuickMessage = (id: string, title: string, text: string) => {
    setQuickMessages((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title: title.trim(), text: text.trim() } : q))
    );
  };

  const deleteQuickMessage = (id: string) => {
    setQuickMessages(quickMessages.filter((q) => q.id !== id));
  };

  // Record View Log ("อ่านแล้ว" + Profile Avatar + Timestamp for Admin)
  const recordItemView = (targetId: string, type: 'supplier' | 'drink_store') => {
    const nowIso = new Date().toISOString();
    const updateViewedList = (existing?: ViewLogEntry[]): ViewLogEntry[] => {
      const list = Array.isArray(existing) ? [...existing] : [];
      const idx = list.findIndex((v) => v.userId === currentUser.id);
      if (idx >= 0) {
        const updated: ViewLogEntry = {
          ...list[idx],
          name: currentUser.name,
          alias: currentUser.alias,
          avatar: currentUser.avatar,
          role: currentUser.role,
          lastViewedAt: nowIso,
          viewCount: (list[idx].viewCount || 1) + 1,
        };
        list.splice(idx, 1);
        return [updated, ...list];
      }
      return [
        {
          userId: currentUser.id,
          name: currentUser.name,
          alias: currentUser.alias,
          avatar: currentUser.avatar,
          role: currentUser.role,
          lastViewedAt: nowIso,
          viewCount: 1,
        },
        ...list,
      ];
    };

    if (type === 'supplier') {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === targetId ? { ...s, viewedBy: updateViewedList(s.viewedBy) } : s))
      );
    } else {
      setDrinkStores((prev) =>
        prev.map((d) => (d.id === targetId ? { ...d, viewedBy: updateViewedList(d.viewedBy) } : d))
      );
    }
  };

  // Toggle Like ("ถูกใจ" แบบ Facebook Feed)
  const toggleLikeItem = (targetId: string, type: 'supplier' | 'drink_store') => {
    const nowIso = new Date().toISOString();
    const updateLikes = (existing?: LikeEntry[]): LikeEntry[] => {
      const list = Array.isArray(existing) ? [...existing] : [];
      const idx = list.findIndex((l) => l.userId === currentUser.id);
      if (idx >= 0) {
        list.splice(idx, 1);
        return list;
      }
      return [
        {
          userId: currentUser.id,
          alias: currentUser.alias,
          avatar: currentUser.avatar,
          timestamp: nowIso,
        },
        ...list,
      ];
    };

    if (type === 'supplier') {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === targetId ? { ...s, likes: updateLikes(s.likes) } : s))
      );
    } else {
      setDrinkStores((prev) =>
        prev.map((d) => (d.id === targetId ? { ...d, likes: updateLikes(d.likes) } : d))
      );
    }
  };

  // Load Full Mockup Data & Reset System Data
  const loadFullMockupData = () => {
    const initialSup = normalizeSuppliers(INITIAL_SUPPLIERS);
    const initialStores = normalizeStores(INITIAL_DRINK_STORES);
    setSuppliers(initialSup);
    setDrinkStores(initialStores);
    setCategories(INITIAL_CATEGORIES);
    setStoreCategories(INITIAL_STORE_CATEGORIES);
    setQuickTagsList(INITIAL_QUICK_TAGS);
    setQuickMessages(INITIAL_QUICK_MESSAGES);
    setCountryFilter('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedTag('all');
    setSelectedRating(null);
    setSearchQuery('');
    syncAllToCentral({ suppliers: initialSup, drinkStores: initialStores, users, invites });
    broadcastNotification(
      '✨ โหลดข้อมูล Mockup เต็มระบบสำเร็จ',
      `ซัพพลายเออร์ ${INITIAL_SUPPLIERS.length} รายการ และ ร้านน้ำเรฟ ${INITIAL_DRINK_STORES.length} รายการ พร้อมทดสอบแล้ว`,
      'system',
      undefined,
      currentUser.avatar,
      false,
      { isCategory5: true }
    );
  };

  const resetSystemData = (clearEmpty = false) => {
    if (clearEmpty) {
      setSuppliers([]);
      setDrinkStores([]);
      setNotifications([]);
      syncAllToCentral({ suppliers: [], drinkStores: [], notifications: [] });
      broadcastNotification(
        '🗑️ ล้างข้อมูลเป็นระบบว่างเปล่าสำเร็จ',
        'พร้อมเริ่มบันทึกข้อมูลหน้างานจริงตั้งแต่ศูนย์',
        'system',
        undefined,
        currentUser.avatar,
        false,
        { isCategory5: true }
      );
    } else {
      const initialSup = normalizeSuppliers(INITIAL_SUPPLIERS);
      const initialStores = normalizeStores(INITIAL_DRINK_STORES);
      setSuppliers(initialSup);
      setDrinkStores(initialStores);
      setCategories(INITIAL_CATEGORIES);
      setStoreCategories(INITIAL_STORE_CATEGORIES);
      setQuickTagsList(INITIAL_QUICK_TAGS);
      setQuickMessages(INITIAL_QUICK_MESSAGES);
      setCountryFilter('all');
      setSelectedCategory('all');
      setSelectedStatus('all');
      setSelectedTag('all');
      setSelectedRating(null);
      setSearchQuery('');
      syncAllToCentral({ suppliers: initialSup, drinkStores: initialStores, users, invites });
      broadcastNotification(
        '🔄 รีเซ็ทข้อมูลกลับสู่ค่าเริ่มต้น (Mockup) สำเร็จ',
        'รีเซ็ทข้อมูลซัพพลายเออร์ ร้านน้ำเรฟ และหมวดหมู่ทั้งหมดเรียบร้อยแล้ว',
        'system',
        undefined,
        currentUser.avatar,
        false,
        { isCategory5: true }
      );
    }
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
  };

  // Handoff & Operations
  const updateHandoff = (
    id: string,
    type: 'supplier' | 'drink_store',
    data: {
      assignedTo?: string;
      targetFollowUpDate?: string;
      handoffNotes?: string;
      handoffStage?: HandoffStage;
      status?: PipelineStatus;
    }
  ) => {
    if (type === 'supplier') {
      setSuppliers((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s;
          return {
            ...s,
            ...data,
            status: data.status || s.status,
            history: [
              ...s.history,
              {
                action: `อัปเดตงานรับช่วงต่อ: สเตจ [${data.handoffStage || s.handoffStage || 'ดำเนินงาน'}] ผู้รับผิดชอบ: ${data.assignedTo || s.assignedTo || 'ยังไม่ระบุ'}`,
                user: currentUser.alias,
                timestamp: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    } else {
      setDrinkStores((prev) =>
        prev.map((d) => {
          if (d.id !== id) return d;
          return {
            ...d,
            ...data,
            history: [
              ...d.history,
              {
                action: `อัปเดตงานรับช่วงต่อ: สเตจ [${data.handoffStage || d.handoffStage || 'ดำเนินงาน'}] ผู้รับผิดชอบ: ${data.assignedTo || d.assignedTo || 'ยังไม่ระบุ'}`,
                user: currentUser.alias,
                timestamp: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    }

    broadcastNotification(
      `${currentUser.alias} อัปเดตงานรับช่วงต่อ`,
      `มอบหมาย: ${data.assignedTo || 'ปรับปรุงข้อมูล'} | สเตจ: ${data.handoffStage || 'กำลังดำเนินการ'}`,
      'status',
      id,
      currentUser.avatar,
      true
    );
  };

  // Supplier CRUD
  const addSupplier = (supplierData: Omit<SupplierRecord, 'id' | 'type' | 'creator' | 'reviewerNotes' | 'history' | 'updatedAt'>) => {
    const newRecord: SupplierRecord = {
      ...supplierData,
      id: `sup-${Date.now()}`,
      type: 'supplier',
      country: supplierData.country || 'CN',
      handoffStage: supplierData.handoffStage || 'awaiting',
      creator: {
        id: currentUser.id,
        name: currentUser.name,
        alias: currentUser.alias,
        avatar: currentUser.avatar,
        timestamp: new Date().toISOString(),
      },
      likes: [],
      viewedBy: [
        {
          userId: currentUser.id,
          name: currentUser.name,
          alias: currentUser.alias,
          avatar: currentUser.avatar,
          role: currentUser.role,
          lastViewedAt: new Date().toISOString(),
          viewCount: 1,
        },
      ],
      reviewerNotes: [],
      history: [
        {
          action: `สร้างบันทึกซัพพลายเออร์ (${supplierData.country === 'TH' ? 'ไทย 🇹🇭' : 'จีน 🇨🇳'})`,
          user: currentUser.alias,
          timestamp: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    setSuppliers([newRecord, ...suppliers]);
    saveSupplierToCloud(newRecord);
    postSupplierToCentral(newRecord);
    if (syncStatus === 'offline') {
      setPendingSyncCount((prev) => prev + 1);
    }
    broadcastNotification(
      `${currentUser.alias} บันทึกซัพพลายเออร์ใหม่`,
      `${newRecord.name} (${newRecord.category})`,
      'supplier',
      newRecord.id,
      currentUser.avatar,
      true
    );
    return newRecord;
  };

  const updateSupplier = (id: string, updates: Partial<SupplierRecord>) => {
    const nextSuppliers = suppliers.map((s) => {
      if (s.id !== id) return s;
      return {
        ...s,
        ...updates,
        history: [
          ...s.history,
          {
            action: `อัปเดตข้อมูล`,
            user: currentUser.alias,
            timestamp: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      };
    });
    setSuppliers(nextSuppliers);
    const target = nextSuppliers.find((s) => s.id === id);
    if (target) {
      saveSupplierToCloud(target);
      postSupplierToCentral(target);
    }
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
    deleteSupplierFromCloud(id);
    deleteSupplierFromCentral(id);
  };

  // Store Inspo CRUD
  const addStoreInspo = (storeData: Omit<StoreInspoRecord, 'id' | 'type' | 'creator' | 'reviewerNotes' | 'history' | 'updatedAt'>) => {
    const newRecord: StoreInspoRecord = {
      ...storeData,
      id: `store-${Date.now()}`,
      type: 'drink_store',
      country: storeData.country || 'CN',
      storeCategory: storeData.storeCategory || storeCategories[0] || 'ชาจีนพรีเมียม & ชาชีส',
      handoffStage: storeData.handoffStage || 'awaiting',
      creator: {
        id: currentUser.id,
        name: currentUser.name,
        alias: currentUser.alias,
        avatar: currentUser.avatar,
        timestamp: new Date().toISOString(),
      },
      likes: [],
      viewedBy: [
        {
          userId: currentUser.id,
          name: currentUser.name,
          alias: currentUser.alias,
          avatar: currentUser.avatar,
          role: currentUser.role,
          lastViewedAt: new Date().toISOString(),
          viewCount: 1,
        },
      ],
      reviewerNotes: [],
      history: [
        {
          action: `สร้างบันทึกร้านน้ำเรฟ (${storeData.country === 'TH' ? 'ไทย 🇹🇭' : 'จีน 🇨🇳'})`,
          user: currentUser.alias,
          timestamp: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    setDrinkStores([newRecord, ...drinkStores]);
    saveStoreToCloud(newRecord);
    postStoreToCentral(newRecord);
    if (syncStatus === 'offline') {
      setPendingSyncCount((prev) => prev + 1);
    }
    broadcastNotification(
      `${currentUser.alias} บันทึกเรฟร้านน้ำใหม่`,
      `${newRecord.storeName} (${newRecord.city || 'กวางโจว'})`,
      'drink_store',
      newRecord.id,
      currentUser.avatar,
      true
    );
    return newRecord;
  };

  const updateStoreInspo = (id: string, updates: Partial<StoreInspoRecord>) => {
    const nextStores = drinkStores.map((s) => {
      if (s.id !== id) return s;
      return {
        ...s,
        ...updates,
        history: [
          ...s.history,
          {
            action: `อัปเดตข้อมูล`,
            user: currentUser.alias,
            timestamp: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      };
    });
    setDrinkStores(nextStores);
    const target = nextStores.find((s) => s.id === id);
    if (target) {
      saveStoreToCloud(target);
      postStoreToCentral(target);
    }
  };

  const deleteStoreInspo = (id: string) => {
    setDrinkStores(drinkStores.filter((s) => s.id !== id));
    deleteStoreFromCloud(id);
    deleteStoreFromCentral(id);
  };

  // Reviewer Note (หากเราพิมคอมเม้นเอง ไม่ต้องเด้งแจ้งเตือนเรา - suppressToast = true)
  const addReviewerNote = (targetId: string, type: 'supplier' | 'drink_store', noteText: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      author: currentUser.alias,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      text: noteText,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (type === 'supplier') {
      setSuppliers((prev) =>
        prev.map((s) => {
          if (s.id !== targetId) return s;
          return {
            ...s,
            reviewerNotes: [...s.reviewerNotes, newNote],
            history: [
              ...s.history,
              {
                action: `เพิ่มข้อคิดเห็น: "${noteText.slice(0, 30)}..."`,
                user: currentUser.alias,
                timestamp: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    } else {
      setDrinkStores((prev) =>
        prev.map((s) => {
          if (s.id !== targetId) return s;
          return {
            ...s,
            reviewerNotes: [...s.reviewerNotes, newNote],
            history: [
              ...s.history,
              {
                action: `เพิ่มข้อคิดเห็น: "${noteText.slice(0, 30)}..."`,
                user: currentUser.alias,
                timestamp: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    }

    // Do NOT pop up toast for our own comment ("หากเราพิมคอมเม้นเองไม่ต้อง เด้งแจ้งเตือนเรานะ")
    broadcastNotification(
      `${currentUser.alias} เพิ่มความเห็นใหม่`,
      `"${noteText.slice(0, 45)}"`,
      'comment',
      targetId,
      currentUser.avatar,
      true
    );
  };

  // Threaded Review Reply (ตอบกลับต่อกันได้เรื่อยๆ + ไม่เด้งแจ้งเตือนตัวเอง)
  const addReviewReply = (
    targetId: string,
    type: 'supplier' | 'drink_store',
    noteId: string,
    replyText: string,
    replyToAuthor?: string
  ) => {
    const newReply: ReviewReply = {
      id: `reply-${Date.now()}`,
      author: currentUser.alias,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      text: replyText,
      timestamp: new Date().toISOString(),
      replyToAuthor,
    };

    if (type === 'supplier') {
      setSuppliers((prev) =>
        prev.map((s) => {
          if (s.id !== targetId) return s;
          return {
            ...s,
            reviewerNotes: s.reviewerNotes.map((n) => {
              if (n.id !== noteId) return n;
              return {
                ...n,
                replies: [...(n.replies || []), newReply],
              };
            }),
            updatedAt: new Date().toISOString(),
          };
        })
      );
    } else {
      setDrinkStores((prev) =>
        prev.map((d) => {
          if (d.id !== targetId) return d;
          return {
            ...d,
            reviewerNotes: d.reviewerNotes.map((n) => {
              if (n.id !== noteId) return n;
              return {
                ...n,
                replies: [...(n.replies || []), newReply],
              };
            }),
            updatedAt: new Date().toISOString(),
          };
        })
      );
    }

    broadcastNotification(
      `${currentUser.alias} ตอบกลับ${replyToAuthor ? ` @${replyToAuthor}` : 'ความคิดเห็น'}`,
      `"${replyText.slice(0, 45)}"`,
      'reply',
      targetId,
      currentUser.avatar,
      true
    );
  };

  // Pipeline Status Update
  const updatePipelineStatus = (supplierId: string, status: PipelineStatus) => {
    setSuppliers(
      suppliers.map((s) => {
        if (s.id !== supplierId) return s;
        return {
          ...s,
          status,
          history: [
            ...s.history,
            {
              action: `ปรับสถานะเป็น "${status}"`,
              user: currentUser.alias,
              timestamp: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      })
    );
    broadcastNotification(
      `${currentUser.alias} ปรับสถานะไปป์ไลน์`,
      `เปลี่ยนเป็น: ${status}`,
      'status',
      supplierId,
      currentUser.avatar,
      true
    );
  };

  // User & Invite
  const updateCurrentUserProfile = (
    name: string,
    alias: string,
    avatar: string,
    pin?: string,
    emailOrId?: string
  ) => {
    const oldAlias = currentUser.alias;
    const updated: User = {
      ...currentUser,
      name: name || currentUser.name,
      alias: alias || currentUser.alias,
      avatar: avatar || currentUser.avatar,
      pin: pin ? pin : currentUser.pin,
      emailOrId: emailOrId ? emailOrId : currentUser.emailOrId,
    };

    setCurrentUser(updated);
    const nextUsers = users.some((u) => u.id === currentUser.id)
      ? users.map((u) => (u.id === currentUser.id ? updated : u))
      : [updated, ...users];
    setUsers(nextUsers);

    safeSetLocalStorage('vitcha_current_user_v5', JSON.stringify(updated));
    safeSetLocalStorage('vitcha_users_v5', JSON.stringify(nextUsers));
    saveUserToCloud(updated);
    postUserToCentral(updated);

    // Propagate updated profile picture and alias across existing posts, viewedBy logs, and comments
    setSuppliers((prev) =>
      prev.map((s) => ({
        ...s,
        creator:
          s.creator.id === currentUser.id || s.creator.alias === oldAlias
            ? { ...s.creator, name: updated.name, alias: updated.alias, avatar: updated.avatar }
            : s.creator,
        viewedBy: (s.viewedBy || []).map((v) =>
          v.userId === currentUser.id || v.alias === oldAlias
            ? { ...v, name: updated.name, alias: updated.alias, avatar: updated.avatar }
            : v
        ),
        likes: (s.likes || []).map((l) =>
          l.userId === currentUser.id || l.alias === oldAlias
            ? { ...l, alias: updated.alias, avatar: updated.avatar }
            : l
        ),
        reviewerNotes: (s.reviewerNotes || []).map((n) => ({
          ...n,
          author: n.author === oldAlias ? updated.alias : n.author,
          authorAvatar: n.author === oldAlias ? updated.avatar : n.authorAvatar,
          replies: (n.replies || []).map((r) => ({
            ...r,
            author: r.author === oldAlias ? updated.alias : r.author,
            authorAvatar: r.author === oldAlias ? updated.avatar : r.authorAvatar,
          })),
        })),
      }))
    );

    setDrinkStores((prev) =>
      prev.map((d) => ({
        ...d,
        creator:
          d.creator.id === currentUser.id || d.creator.alias === oldAlias
            ? { ...d.creator, name: updated.name, alias: updated.alias, avatar: updated.avatar }
            : d.creator,
        viewedBy: (d.viewedBy || []).map((v) =>
          v.userId === currentUser.id || v.alias === oldAlias
            ? { ...v, name: updated.name, alias: updated.alias, avatar: updated.avatar }
            : v
        ),
        likes: (d.likes || []).map((l) =>
          l.userId === currentUser.id || l.alias === oldAlias
            ? { ...l, alias: updated.alias, avatar: updated.avatar }
            : l
        ),
        reviewerNotes: (d.reviewerNotes || []).map((n) => ({
          ...n,
          author: n.author === oldAlias ? updated.alias : n.author,
          authorAvatar: n.author === oldAlias ? updated.avatar : n.authorAvatar,
          replies: (n.replies || []).map((r) => ({
            ...r,
            author: r.author === oldAlias ? updated.alias : r.author,
            authorAvatar: r.author === oldAlias ? updated.avatar : r.authorAvatar,
          })),
        })),
      }))
    );
  };

  const switchUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      if (currentUser.id === 'user-ice' || currentUser.role === 'admin' || simulatedFromAdmin) {
        setSimulatedFromAdmin(true);
        sessionStorage.setItem('vitcha_simulated_admin', 'true');
      }
      setCurrentUser(found);
      safeSetLocalStorage('vitcha_current_user_v5', JSON.stringify(found));
    }
  };

  const logout = () => {
    broadcastNotification(
      '⚪ ออกจากระบบ',
      `คุณ ${currentUser.alias} ออกจากระบบเรียบร้อยแล้ว`,
      'system'
    );
    setIsAuthenticated(false);
    setSimulatedFromAdmin(false);
    sessionStorage.removeItem('vitcha_simulated_admin');
    localStorage.removeItem('vitcha_authenticated_session');
  };

  const loginWithCredentials = (usernameOrEmail: string, passOrPin: string) => {
    const rawId = (usernameOrEmail || '').trim().toLowerCase();
    const rawPass = (passOrPin || '').trim();

    if (!rawId || !rawPass) return false;

    const candidateList = [
      currentUser,
      ...users.filter((u) => u.id !== currentUser.id),
    ];

    const user = candidateList.find((u) => {
      const email = (u.emailOrId || '').toLowerCase();
      const id = (u.id || '').toLowerCase();
      const alias = (u.alias || '').toLowerCase();
      const name = (u.name || '').toLowerCase();

      // Flexible matching for username or email
      const matchesUser =
        email === rawId ||
        email.split('@')[0] === rawId ||
        id === rawId ||
        id === `user-${rawId}` ||
        alias.toLowerCase().includes(rawId) ||
        name.toLowerCase().includes(rawId) ||
        (rawId === 'admin' && u.role === 'admin') ||
        (rawId === 'supericez' && u.id === 'user-ice') ||
        (rawId === 'superice' && u.id === 'user-ice') ||
        (rawId === 'ice' && u.id === 'user-ice');

      const matchesPass =
        u.pin === rawPass ||
        (u.id === 'user-ice' && (rawPass === '1234' || rawPass === u.pin));
      return matchesUser && matchesPass;
    });

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setSimulatedFromAdmin(false);
      sessionStorage.removeItem('vitcha_simulated_admin');
      safeSetLocalStorage('vitcha_authenticated_session', 'true');
      safeSetLocalStorage('vitcha_current_user_v5', JSON.stringify(user));
      broadcastNotification(
        '🟢 มีการเข้าสู่ระบบ',
        `คุณ ${user.alias} เข้าใช้งานระบบในสิทธิ์ [${user.role}]`,
        'system',
        undefined,
        user.avatar
      );
      return true;
    }
    return false;
  };

  const loginWithPin = (idOrEmail: string, pin: string) => {
    return loginWithCredentials(idOrEmail, pin);
  };

  const createInvite = (role: UserRole, prefilledAlias?: string) => {
    const newInvite: InviteLink = {
      id: `inv-${Date.now()}`,
      code: `VITCHA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      role,
      prefilledAlias,
      isUsed: false,
      createdAt: new Date().toISOString(),
      createdBy: currentUser.alias,
    };
    const nextInvites = [newInvite, ...invites];
    setInvites(nextInvites);
    safeSetLocalStorage('vitcha_invites_v5', JSON.stringify(nextInvites));
    saveInviteToCloud(newInvite);
    postInviteToCentral(newInvite);
    return newInvite;
  };

  const registerUserWithInvite = (
    code: string,
    name: string,
    alias: string,
    emailOrId: string,
    pin: string,
    avatar: string,
    fallbackRole: UserRole = 'reviewer'
  ) => {
    const cleanCode = code.trim().toUpperCase();
    const existingInvite = invites.find((inv) => inv.code.toUpperCase() === cleanCode);
    const role: UserRole = existingInvite ? existingInvite.role : fallbackRole;

    const cleanEmailOrId = emailOrId.trim();
    const cleanName = name.trim();
    const cleanAlias = alias.trim() || cleanName;
    const cleanPin = pin.trim();

    const existingUserIndex = users.findIndex(
      (u) =>
        u.emailOrId.toLowerCase() === cleanEmailOrId.toLowerCase() ||
        (cleanEmailOrId && u.id.toLowerCase() === `user-${cleanEmailOrId.toLowerCase()}`)
    );

    let finalUser: User;
    let nextUsers: User[];

    if (existingUserIndex >= 0) {
      finalUser = {
        ...users[existingUserIndex],
        name: cleanName,
        alias: cleanAlias,
        avatar: avatar || users[existingUserIndex].avatar,
        pin: cleanPin,
        emailOrId: cleanEmailOrId,
        role: role || users[existingUserIndex].role,
      };
      nextUsers = users.map((u, i) => (i === existingUserIndex ? finalUser : u));
    } else {
      finalUser = {
        id: `user-${Date.now()}`,
        name: cleanName,
        alias: cleanAlias,
        role,
        avatar:
          avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        pin: cleanPin,
        emailOrId: cleanEmailOrId,
        createdAt: new Date().toISOString(),
      };
      nextUsers = [...users, finalUser];
    }

    setUsers(nextUsers);
    if (existingInvite) {
      const updatedInvite = { ...existingInvite, isUsed: true };
      const nextInvites = invites.map((inv) =>
        inv.id === existingInvite.id ? updatedInvite : inv
      );
      setInvites(nextInvites);
      safeSetLocalStorage('vitcha_invites_v5', JSON.stringify(nextInvites));
      postInviteToCentral(updatedInvite);
    }
    setCurrentUser(finalUser);
    setIsAuthenticated(true);
    safeSetLocalStorage('vitcha_authenticated_session', 'true');
    safeSetLocalStorage('vitcha_current_user_v5', JSON.stringify(finalUser));
    safeSetLocalStorage('vitcha_users_v5', JSON.stringify(nextUsers));
    saveUserToCloud(finalUser);
    postUserToCentral(finalUser);
    broadcastNotification(
      '🎉 สมาชิกใหม่ลงทะเบียนสำเร็จ',
      `ยินดีต้อนรับคุณ ${finalUser.alias} เข้าร่วมทีมในสิทธิ์ [${finalUser.role}]`,
      'system',
      undefined,
      finalUser.avatar
    );
    return finalUser;
  };

  const redeemInvite = (code: string, name: string, alias: string, avatar: string, pin: string) => {
    return registerUserWithInvite(
      code,
      name,
      alias,
      `${name.toLowerCase().replace(/\s+/g, '')}@vitcha.internal`,
      pin,
      avatar
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        suppliers,
        drinkStores,
        invites,
        categories,
        storeCategories,
        quickTagsList,
        quickMessages,
        exchangeRate,
        syncStatus,
        pendingSyncCount,
        activeTab,
        countryFilter,
        searchQuery,
        selectedCategory,
        selectedStatus,
        selectedTag,
        selectedRating,
        notifications,
        activeToast,
        setActiveTab,
        setCountryFilter,
        setSearchQuery,
        setSelectedCategory,
        setSelectedStatus,
        setSelectedTag,
        setSelectedRating,
        dismissToast,
        markAllNotificationsRead,
        broadcastNotification,
        addCategory,
        editCategory,
        deleteCategory,
        addStoreCategory,
        editStoreCategory,
        deleteStoreCategory,
        addQuickTag,
        editQuickTag,
        deleteQuickTag,
        addQuickMessage,
        editQuickMessage,
        deleteQuickMessage,
        updateUserRole,
        recordItemView,
        toggleLikeItem,
        loadFullMockupData,
        resetSystemData,
        updateHandoff,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        addStoreInspo,
        updateStoreInspo,
        deleteStoreInspo,
        canEditItems,
        editingSupplier,
        editingStore,
        openEditItem,
        closeEditItem,
        addReviewerNote,
        addReviewReply,
        updatePipelineStatus,
        updateExchangeRate,
        toggleCurrencyMode,
        convertCnyToThb,
        convertThbToCny,
        updateCurrentUserProfile,
        switchUser,
        simulatedFromAdmin,
        restoreAdminUser,
        deleteUser,
        deleteInvite,
        refreshCentralData,
        isAuthenticated,
        logout,
        loginWithCredentials,
        loginWithPin,
        createInvite,
        redeemInvite,
        registerUserWithInvite,
        renderStatus,
        renderServerUrl,
        setRenderServerUrl,
        testRenderConnection,
        syncAllDataToRender,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
