import React, { createContext, useContext, useState, useEffect } from 'react';
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
    suppressToast?: boolean
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

  updateCurrentUserProfile: (name: string, alias: string, avatar: string, pin?: string) => void;
  switchUser: (userId: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
  loginWithPin: (idOrEmail: string, pin: string) => boolean;
  createInvite: (role: UserRole, prefilledAlias?: string) => InviteLink;
  redeemInvite: (code: string, name: string, alias: string, avatar: string, pin: string) => User | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_VIEWED_BY: ViewLogEntry[] = [
  {
    userId: 'user-ice',
    name: 'Ice (ผู้ก่อตั้ง)',
    alias: 'Ice (Admin)',
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
    alias: 'Ice (Admin)',
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
    const saved = localStorage.getItem('vitcha_users_v5');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('vitcha_current_user_v5');
    return savedUser ? JSON.parse(savedUser) : INITIAL_USERS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('vitcha_authenticated_session') === 'true';
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
    return saved ? JSON.parse(saved) : INITIAL_INVITES;
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
    localStorage.setItem('vitcha_categories_v5', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('vitcha_store_categories_v5', JSON.stringify(storeCategories));
  }, [storeCategories]);

  useEffect(() => {
    localStorage.setItem('vitcha_quick_tags_v5', JSON.stringify(quickTagsList));
  }, [quickTagsList]);

  useEffect(() => {
    localStorage.setItem('vitcha_quick_messages_v5', JSON.stringify(quickMessages));
  }, [quickMessages]);

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
    localStorage.setItem('vitcha_notifications_v5', JSON.stringify(notifications));
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
    suppressToast = false
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      type,
      targetId,
      avatar: avatar || currentUser.avatar,
      read: suppressToast,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    if (!suppressToast) {
      setActiveToast(newNotif);
      setTimeout(() => {
        setActiveToast((current) => (current?.id === newNotif.id ? null : current));
      }, 4500);

      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body: message,
            icon: avatar || currentUser.avatar,
          });
        } catch {
          // ignore
        }
      }
    }
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
    localStorage.setItem('vitcha_users_v5', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('vitcha_current_user_v5', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vitcha_suppliers_v5', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('vitcha_drink_stores_v5', JSON.stringify(drinkStores));
  }, [drinkStores]);

  useEffect(() => {
    localStorage.setItem('vitcha_invites_v5', JSON.stringify(invites));
  }, [invites]);

  useEffect(() => {
    localStorage.setItem('vitcha_exchange_rate_v5', JSON.stringify(exchangeRate));
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
    setSuppliers(normalizeSuppliers(INITIAL_SUPPLIERS));
    setDrinkStores(normalizeStores(INITIAL_DRINK_STORES));
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
    broadcastNotification(
      '✨ โหลดข้อมูล Mockup เต็มระบบสำเร็จ',
      `ซัพพลายเออร์ ${INITIAL_SUPPLIERS.length} รายการ และ ร้านน้ำเรฟ ${INITIAL_DRINK_STORES.length} รายการ พร้อมทดสอบแล้ว`,
      'system',
      undefined,
      currentUser.avatar,
      false
    );
  };

  const resetSystemData = (clearEmpty = false) => {
    if (clearEmpty) {
      setSuppliers([]);
      setDrinkStores([]);
      setNotifications([]);
      broadcastNotification(
        '🗑️ ล้างข้อมูลเป็นระบบว่างเปล่าสำเร็จ',
        'พร้อมเริ่มบันทึกข้อมูลหน้างานจริงตั้งแต่ศูนย์',
        'system',
        undefined,
        currentUser.avatar,
        false
      );
    } else {
      setSuppliers(normalizeSuppliers(INITIAL_SUPPLIERS));
      setDrinkStores(normalizeStores(INITIAL_DRINK_STORES));
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
      broadcastNotification(
        '🔄 รีเซ็ทข้อมูลกลับสู่ค่าเริ่มต้น (Mockup) สำเร็จ',
        'รีเซ็ทข้อมูลซัพพลายเออร์ ร้านน้ำเรฟ และหมวดหมู่ทั้งหมดเรียบร้อยแล้ว',
        'system',
        undefined,
        currentUser.avatar,
        false
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
    setSuppliers(
      suppliers.map((s) => {
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
      })
    );
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
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
    setDrinkStores(
      drinkStores.map((s) => {
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
      })
    );
  };

  const deleteStoreInspo = (id: string) => {
    setDrinkStores(drinkStores.filter((s) => s.id !== id));
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
  const updateCurrentUserProfile = (name: string, alias: string, avatar: string, pin?: string) => {
    const updated = {
      ...currentUser,
      name,
      alias,
      avatar,
      pin: pin ? pin : currentUser.pin,
    };
    setCurrentUser(updated);
    setUsers(users.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  const switchUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('vitcha_current_user_v5', JSON.stringify(found));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vitcha_authenticated_session');
  };

  const loginWithPin = (idOrEmail: string, pin: string) => {
    const user = users.find((u) => (u.emailOrId === idOrEmail || u.name === idOrEmail || u.id === idOrEmail) && u.pin === pin);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('vitcha_authenticated_session', 'true');
      localStorage.setItem('vitcha_current_user_v5', JSON.stringify(user));
      return true;
    }
    return false;
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
    setInvites([newInvite, ...invites]);
    return newInvite;
  };

  const redeemInvite = (code: string, name: string, alias: string, avatar: string, pin: string) => {
    const invite = invites.find((inv) => inv.code === code && !inv.isUsed);
    if (!invite) return null;

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      alias: alias || invite.prefilledAlias || name,
      role: invite.role,
      avatar:
        avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      pin,
      emailOrId: `${name.toLowerCase().replace(/\s+/g, '')}@vitcha.internal`,
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    setInvites(invites.map((inv) => (inv.id === invite.id ? { ...inv, isUsed: true } : inv)));
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('vitcha_authenticated_session', 'true');
    localStorage.setItem('vitcha_current_user_v5', JSON.stringify(newUser));
    return newUser;
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
        isAuthenticated,
        logout,
        loginWithPin,
        createInvite,
        redeemInvite,
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
