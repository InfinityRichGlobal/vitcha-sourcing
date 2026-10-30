import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { User, SupplierRecord, StoreInspoRecord, LocationRecord, ExchangeRateConfig, InviteLink, PipelineStatus, UserRole, AppNotification, HandoffStage, AppViewTab, QuickMessageTemplate, CuratedProduct, ProductTaxon, ProductSet, ProductChanges, TrashedItem, LabItem, LabFormulaStatus, FranchiseStore, ViewLogEntry } from '../types';
import { INITIAL_CATEGORIES, INITIAL_STORE_CATEGORIES, INITIAL_LOCATION_TYPES, INITIAL_QUICK_TAGS, INITIAL_QUICK_MESSAGES } from '../utils/defaultSettings';
import { getRenderServerUrl, saveRenderServerUrl, checkServerHealth, fetchCentralData, sendJson, requestJson, getSessionToken, setSessionToken, loginUserApi, ApiError, markNotificationsReadApi, clearNotificationsApi, postLeadLabItemApi, deleteLeadLabItemApi, likeLeadLabItemApi, commentLeadLabItemApi, likeLeadLabCommentApi, cycleLeadLabItemApi, updateLeadLabStatusApi, postFranchiseStoreApi, deleteFranchiseStoreApi } from '../services/api';

interface AppContextType {
  products: CuratedProduct[];
  productCategories: ProductTaxon[];
  productTags: ProductTaxon[];
  productSets: ProductSet[];
  saveProduct: (product: CuratedProduct, changes: ProductChanges) => Promise<boolean>;
  updateProducts: (ids: string[], changes: ProductChanges, addTagIds?: string[]) => Promise<boolean>;
  manageProductTaxonomy: (kind: 'categories' | 'tags', action: 'add' | 'rename' | 'delete', id: string, name?: string) => Promise<boolean>;
  saveProductSet: (set: ProductSet) => Promise<boolean>;
  deleteProductSet: (set: ProductSet) => Promise<boolean>;
  leadLabItems: LabItem[];
  franchiseStores: FranchiseStore[];
  saveLeadLabItem: (item: Partial<LabItem>) => Promise<boolean>;
  deleteLeadLabItem: (id: string) => Promise<boolean>;
  toggleLikeLeadLabItem: (id: string) => Promise<boolean>;
  addLeadLabComment: (
    id: string,
    content: string,
    sweetnessTarget?: 'all' | '0' | '50' | '100',
    extra?: { photoUrl?: string; voiceUrl?: string; duration?: number }
  ) => Promise<boolean>;
  toggleLikeLeadLabComment: (id: string, commentId: string) => Promise<boolean>;
  cycleLeadLabRevision: (id: string, summary: string, nextTitle?: string) => Promise<boolean>;
  setLeadLabStatus: (id: string, status: LabFormulaStatus) => Promise<boolean>;
  saveFranchiseStore: (store: Partial<FranchiseStore>) => Promise<boolean>;
  deleteFranchiseStore: (id: string) => Promise<boolean>;
  toggleLikeFranchiseStore: (id: string) => Promise<boolean>;
  addFranchiseStoreComment: (
    id: string,
    content: string,
    sweetnessTarget?: 'all' | '0' | '50' | '100',
    extra?: { photoUrl?: string; voiceUrl?: string; duration?: number }
  ) => Promise<boolean>;
  toggleLikeFranchiseStoreComment: (id: string, commentId: string) => Promise<boolean>;
  recordFranchiseStoreView: (id: string) => void;
  recordLeadLabItemView: (id: string) => void;
  currentUser: User;
  actionError: string | null;
  clearActionError: () => void;
  isMutating: boolean;
  users: User[];
  suppliers: SupplierRecord[];
  drinkStores: StoreInspoRecord[];
  invites: InviteLink[];
  categories: string[];
  storeCategories: string[];
  locationTypes: string[];
  quickTagsList: string[];
  quickMessages: QuickMessageTemplate[];
  exchangeRate: ExchangeRateConfig;
  syncStatus: 'online' | 'offline';
  pendingSyncCount: number;
  activeTab: AppViewTab;
  filterResetVersion: number;
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
  markAllNotificationsRead: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  clearNotification: (id: string) => Promise<void>;
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
      localOnly?: boolean;
    }
  ) => Promise<boolean>;

  trashItems: TrashedItem[];
  batchTrash: (action: 'restore' | 'delete', items: TrashedItem[]) => Promise<boolean>;
  fetchTrash: () => Promise<void>;
  restoreTrashItem: (id: string) => Promise<boolean>;
  permanentDeleteTrashItem: (id: string) => Promise<boolean>;

  // Settings & Management (สำหรับ 2 สิทธิ์ระดับบน Admin & Editor)
  addCategory: (cat: string) => Promise<boolean>;
  editCategory: (oldCat: string, newCat: string) => Promise<boolean>;
  deleteCategory: (cat: string) => Promise<boolean>;
  addStoreCategory: (cat: string) => Promise<boolean>;
  editStoreCategory: (oldCat: string, newCat: string) => Promise<boolean>;
  deleteStoreCategory: (cat: string) => Promise<boolean>;
  addLocationType: (type: string) => Promise<boolean>;
  editLocationType: (oldType: string, newType: string) => Promise<boolean>;
  deleteLocationType: (type: string) => Promise<boolean>;
  addQuickTag: (tag: string) => Promise<boolean>;
  editQuickTag: (oldTag: string, newTag: string) => Promise<boolean>;
  deleteQuickTag: (tag: string) => Promise<boolean>;
  addQuickMessage: (title: string, text: string) => Promise<boolean>;
  editQuickMessage: (id: string, title: string, text: string) => Promise<boolean>;
  deleteQuickMessage: (id: string) => Promise<boolean>;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<boolean>;
  recordItemView: (targetId: string, type: 'supplier' | 'drink_store' | 'location') => void;
  toggleLikeItem: (targetId: string, type: 'supplier' | 'drink_store' | 'location') => void;
  isMockLoading: boolean;
  isClearing: boolean;
  loadFullMockupData: () => Promise<boolean>;
  mockLoadMessage: string;
  mockLoadStatus: 'idle' | 'loading' | 'success' | 'error';
  lastRefreshedAt: string | null;
  resetSystemData: (password: string) => Promise<boolean>;
  clearMockupOnly: (password: string) => Promise<boolean>;

  // Handoff & Operations (บริหารจัดการรับช่วงต่อ)
  updateHandoff: (
    id: string,
    type: 'supplier' | 'drink_store' | 'location',
    data: {
      assignedTo?: string;
      targetFollowUpDate?: string;
      handoffNotes?: string;
      handoffStage?: HandoffStage;
      status?: PipelineStatus;
    }
  ) => Promise<boolean>;

  // Actions (Direct to Central Server & Real-time Refresh)
  addSupplier: (supplier: Omit<SupplierRecord, 'id' | 'type' | 'creator' | 'reviewerNotes' | 'history' | 'updatedAt'>) => Promise<SupplierRecord | null>;
  updateSupplier: (id: string, updates: Partial<SupplierRecord>) => Promise<boolean>;
  deleteSupplier: (id: string) => Promise<boolean>;

  addStoreInspo: (store: Omit<StoreInspoRecord, 'id' | 'type' | 'creator' | 'reviewerNotes' | 'history' | 'updatedAt'>) => Promise<StoreInspoRecord | null>;
  updateStoreInspo: (id: string, updates: Partial<StoreInspoRecord>) => Promise<boolean>;
  deleteStoreInspo: (id: string) => Promise<boolean>;

  locations: LocationRecord[];
  addLocation: (location: Omit<LocationRecord, 'id' | 'type' | 'creator' | 'reviewerNotes' | 'history' | 'updatedAt'>) => Promise<LocationRecord | null>;
  updateLocation: (id: string, updates: Partial<LocationRecord>) => Promise<boolean>;
  deleteLocation: (id: string) => Promise<boolean>;
  editingLocation: LocationRecord | null;
  canEditItems: boolean;
  canDeleteItems: boolean;
  canComment: boolean;
  canAddItems: boolean;

  editingSupplier: SupplierRecord | null;
  editingStore: StoreInspoRecord | null;
  openEditItem: (item: SupplierRecord | StoreInspoRecord | LocationRecord) => void;
  closeEditItem: () => void;

  addReviewerNote: (targetId: string, type: 'supplier' | 'drink_store' | 'location', noteText: string, extra?: { voiceUrl?: string; photoUrl?: string; duration?: number }) => Promise<boolean>;
  addReviewReply: (targetId: string, type: 'supplier' | 'drink_store' | 'location', noteId: string, replyText: string, replyToAuthor?: string, extra?: { voiceUrl?: string; photoUrl?: string; duration?: number; replyToId?: string }) => Promise<boolean>;
  updatePipelineStatus: (supplierId: string, status: PipelineStatus) => Promise<boolean>;

  updateExchangeRate: (rate: number, isAuto?: boolean) => void;
  toggleCurrencyMode: () => void;
  convertCnyToThb: (cny: number) => number;
  convertThbToCny: (thb: number) => number;

  updateCurrentUserAvatar: (avatar: string, revision: number) => Promise<User | null>;
  updateCurrentUserProfile: (
    name: string,
    alias: string,
    avatar: string,
    pin?: string,
    emailOrId?: string,
    expectedRevision?: number
  ) => Promise<boolean>;
  switchUser: (userId: string) => Promise<boolean>;
  simulatedFromAdmin: boolean;
  restoreAdminUser: () => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  deleteInvite: (inviteId: string) => Promise<boolean>;
  refreshCentralData: () => Promise<boolean>;
  isAuthenticated: boolean;
  isRestoringSession: boolean;
  logout: () => void;
  loginWithCredentials: (usernameOrEmail: string, passOrPin: string) => Promise<boolean>;
  loginWithPin: (idOrEmail: string, pin: string) => Promise<boolean>;
  createInvite: (role: UserRole, prefilledAlias?: string) => Promise<InviteLink>;
  redeemInvite: (code: string, name: string, alias: string, avatar: string, pin: string) => Promise<User | null>;
  registerUserWithInvite: (
    code: string,
    name: string,
    alias: string,
    emailOrId: string,
    pin: string,
    avatar: string,
    fallbackRole?: UserRole
  ) => Promise<User>;

  // Render Central Server
  renderStatus: 'connected' | 'connecting' | 'disconnected';
  renderServerUrl: string;
  setRenderServerUrl: (url: string) => void;
  testRenderConnection: (url?: string) => Promise<{ ok: boolean; message: string; count?: any }>;
  syncAllDataToRender: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const GUEST: User = { id: '', name: '', alias: '', role: 'viewer', avatar: '', emailOrId: '', createdAt: '' };
type Item = SupplierRecord | StoreInspoRecord | LocationRecord;
const routeFor = (type: 'supplier' | 'drink_store' | 'location') => type === 'supplier' ? 'suppliers' : type === 'drink_store' ? 'drink-stores' : 'locations';
const settingsKeys = ['categories', 'storeCategories', 'locationTypes', 'quickTagsList', 'quickMessages'] as const;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<CuratedProduct[]>([]);
  const [productCategories, setProductCategories] = useState<ProductTaxon[]>([]);
  const [productTags, setProductTags] = useState<ProductTaxon[]>([]);
  const [productSets, setProductSets] = useState<ProductSet[]>([]);
  const productTaxonomyRevision = useRef(0);
  const [currentUser, setCurrentUser] = useState<User>(GUEST);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(() => Boolean(getSessionToken()));
  const [simulatedFromAdmin, setSimulatedFromAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>([]);
  const [drinkStores, setDrinkStores] = useState<StoreInspoRecord[]>([]);
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [leadLabItems, setLeadLabItems] = useState<LabItem[]>([]);
  const [franchiseStores, setFranchiseStores] = useState<FranchiseStore[]>([]);
  const [isMockLoading, setIsMockLoading] = useState(false);
  const [mockLoadMessage, setMockLoadMessage] = useState('');
  const [mockLoadStatus, setMockLoadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);
  const latestSnapshot = useRef<any>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [invites, setInvites] = useState<InviteLink[]>([]);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [storeCategories, setStoreCategories] = useState(INITIAL_STORE_CATEGORIES);
  const [locationTypes, setLocationTypes] = useState(INITIAL_LOCATION_TYPES);
  const [quickTagsList, setQuickTagsList] = useState(INITIAL_QUICK_TAGS);
  const [quickMessages, setQuickMessages] = useState<QuickMessageTemplate[]>(INITIAL_QUICK_MESSAGES);
  const settingsRef = useRef<Record<string, any>>({});
  const databaseRevision = useRef(0);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateConfig>({ rate: 5.08, isAuto: true, lastUpdated: '', currencyMode: 'CNY_TO_THB' });
  const [syncStatus, setSyncStatus] = useState<'online' | 'offline'>(navigator.onLine ? 'online' : 'offline');
  const pendingSyncCount = 0;
  const [activeTab, setActiveTabState] = useState<AppViewTab>('dashboard');
  const [countryFilter, setCountryFilter] = useState<'all' | 'CN' | 'TH'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [filterResetVersion, setFilterResetVersion] = useState(0);
  const setActiveTab = (tab: AppViewTab) => { setActiveTabState(tab); setSelectedCategory('all'); setSelectedStatus('all'); setSelectedTag('all'); setSelectedRating(null); };
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [mutationCount, setMutationCount] = useState(0);
  const [editingSupplier, setEditingSupplier] = useState<SupplierRecord | null>(null);
  const [editingStore, setEditingStore] = useState<StoreInspoRecord | null>(null);
  const [editingLocation, setEditingLocation] = useState<LocationRecord | null>(null);
  const [trashItems, setTrashItems] = useState<TrashedItem[]>([]);
  const [renderServerUrl, setRenderServerUrlState] = useState(getRenderServerUrl);
  const [renderStatus, setRenderStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  const refreshController = useRef<AbortController | null>(null);
  const commandIds = useRef(new Map<string, string>());
  const pendingActions = useRef(new Set<string>());
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const notificationsInitialized = useRef(false);
  const seenNotifications = useRef(new Set<string>());
  const mounted = useRef(true);
  const canEditItems = isAuthenticated && ['admin', 'editor', 'reviewer'].includes(currentUser.role);
  const canDeleteItems = canEditItems;
  const canComment = isAuthenticated && ['admin', 'editor', 'reviewer'].includes(currentUser.role);
  const canAddItems = canComment;

  const clearSession = () => {
    refreshController.current?.abort(); refreshController.current = null;
    setLastRefreshedAt(null); latestSnapshot.current = null; setMockLoadMessage(''); setMockLoadStatus('idle');
    setSessionToken(null); setIsAuthenticated(false); setIsRestoringSession(false); setCurrentUser(GUEST); setSimulatedFromAdmin(false);
    setProducts([]); setProductCategories([]); setProductTags([]); setProductSets([]);
    setUsers([]); setSuppliers([]); setDrinkStores([]); setLocations([]); setInvites([]); setNotifications([]); setActiveToast(null); setTrashItems([]);
    setEditingSupplier(null); setEditingStore(null); setEditingLocation(null); seenNotifications.current.clear(); notificationsInitialized.current = false;
  };
  function showToast(n: AppNotification) {
    clearTimeout(toastTimer.current); setActiveToast(n);
    toastTimer.current = setTimeout(() => setActiveToast(null), 4500);
  }
  const refreshCentralData = async (background = false): Promise<boolean> => {
    if (background && refreshController.current) return false;
    refreshController.current?.abort();
    const controller = new AbortController(); refreshController.current = controller;
    try {
      if (!getSessionToken()) {
        if (mounted.current) setIsRestoringSession(false);
        const health = await checkServerHealth();
        if (!controller.signal.aborted && mounted.current) setRenderStatus(health.ok ? 'connected' : 'disconnected');
        return health.ok;
      }
      const data = await fetchCentralData(controller.signal);
      if (!mounted.current || controller.signal.aborted || refreshController.current !== controller) return false;
      if (!data.user || !Array.isArray(data.suppliers) || !Array.isArray(data.drinkStores)) throw new Error('ข้อมูลเซิร์ฟเวอร์ไม่สมบูรณ์');
      latestSnapshot.current = data; setLastRefreshedAt(new Date().toISOString());
      setRenderStatus('connected'); setCurrentUser(data.user); setSimulatedFromAdmin(data.simulated); setIsAuthenticated(true); setIsRestoringSession(false);
      setProducts(data.products || []); setProductCategories(data.productCategories || []); setProductTags(data.productTags || []); setProductSets(data.productSets || []); productTaxonomyRevision.current = data.productTaxonomyRevision || 0;
      setUsers(data.users); setInvites(data.invites);
      setSuppliers(data.suppliers); setDrinkStores(data.drinkStores); setLocations(data.locations || []);
      setLeadLabItems(Array.isArray(data.leadLabItems) ? data.leadLabItems : []);
      setFranchiseStores(Array.isArray(data.franchiseStores) ? data.franchiseStores : []);
      databaseRevision.current = data.revision || 0;
      settingsRef.current = Object.fromEntries(settingsKeys.map(k => [k, data[k] || []]));
      setCategories(data.categories || []); setStoreCategories(data.storeCategories || []);
      setLocationTypes(data.locationTypes && data.locationTypes.length ? data.locationTypes : INITIAL_LOCATION_TYPES);
      setQuickTagsList(data.quickTagsList || []); setQuickMessages(data.quickMessages || []);
      const incoming = (data.notifications || []).filter((n: AppNotification) => n.actorId !== data.user.id);
      const fresh = incoming.find((n: AppNotification) => !seenNotifications.current.has(n.id));
      if (notificationsInitialized.current && fresh) showToast(fresh);
      notificationsInitialized.current = true;
      incoming.forEach((n: AppNotification) => seenNotifications.current.add(n.id));
      setNotifications(incoming);
      if (data.user?.id === 'user-ice') void fetchTrash();
      return true;
    } catch (error) {
      if (!controller.signal.aborted && mounted.current) {
        if (error instanceof ApiError && error.status === 401) clearSession();
        else { setRenderStatus('disconnected'); setIsRestoringSession(false); }
      }
      return false;
    } finally { if (refreshController.current === controller) refreshController.current = null; }
  };
  const latestRefresh = useRef(refreshCentralData); latestRefresh.current = refreshCentralData;
  useEffect(() => {
    mounted.current = true;
    // Retire the former client-side credential and record caches. Never merge them.
    for (const key of ['vitcha_current_user_v5', 'vitcha_users_v5', 'vitcha_authenticated_session', 'vitcha_suppliers_v5', 'vitcha_drink_stores_v5', 'vitcha_invites_v5', 'vitcha_notifications_v5']) localStorage.removeItem(key);
    sessionStorage.removeItem('vitcha_simulated_admin');
    const refresh = () => { if (!document.hidden) void latestRefresh.current(true); };
    const online = () => { setSyncStatus('online'); refresh(); };
    const offline = () => setSyncStatus('offline');
    const expired = () => { clearSession(); setActionError('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่'); };
    refresh(); const interval = setInterval(refresh, 3500);
    window.addEventListener('focus', refresh); document.addEventListener('visibilitychange', refresh);
    window.addEventListener('online', online); window.addEventListener('offline', offline); window.addEventListener('vitcha:session-expired', expired);
    return () => {
      mounted.current = false; clearInterval(interval); clearTimeout(toastTimer.current);
      refreshController.current?.abort(); refreshController.current = null;
      window.removeEventListener('focus', refresh); document.removeEventListener('visibilitychange', refresh);
      window.removeEventListener('online', online); window.removeEventListener('offline', offline); window.removeEventListener('vitcha:session-expired', expired);
    };
  }, [renderServerUrl]);

  const perform = async (key: string, work: () => Promise<unknown>): Promise<boolean> => {
    if (pendingActions.current.has(key)) return false;
    pendingActions.current.add(key); setMutationCount(n => n + 1); setActionError(null);
    try {
      await work();
      // A successful mutation must not be resubmitted when only the follow-up GET fails.
      if (!await latestRefresh.current()) setActionError('บันทึกสำเร็จแล้ว แต่ยังโหลดข้อมูลล่าสุดไม่ได้ ระบบจะลองใหม่อัตโนมัติ');
      return true;
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : 'ยังไม่ได้รับการยืนยันจากเซิร์ฟเวอร์ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่');
      if (error instanceof ApiError && error.status === 409) await latestRefresh.current();
      return false;
    } finally { pendingActions.current.delete(key); if (mounted.current) setMutationCount(n => n - 1); }
  };
  const saveProduct = (product: CuratedProduct, changes: ProductChanges) => perform(`product:${product.id}`, () => sendJson(`/api/products/${encodeURIComponent(product.id)}`, { revision: product.revision, changes }, 'PATCH'));
  const updateProducts = (ids: string[], changes: ProductChanges, addTagIds: string[] = []) => perform('product-batch', () => sendJson('/api/products/batch', { items: ids.map(id => ({ id, revision: products.find(item => item.id === id)?.revision })), changes, addTagIds }));
  const manageProductTaxonomy: AppContextType['manageProductTaxonomy'] = (kind, action, id, name) => perform('product-taxonomy', () => sendJson('/api/product-taxonomy', { kind, action, id, name, revision: productTaxonomyRevision.current }));
  const saveProductSet = (set: ProductSet) => perform(`product-set:${set.id}`, () => sendJson('/api/product-sets', set));
  const deleteProductSet = (set: ProductSet) => perform(`product-set:${set.id}`, () => sendJson(`/api/product-sets/${encodeURIComponent(set.id)}`, { revision: set.revision }, 'DELETE'));
  const itemById = (id: string, type: 'supplier' | 'drink_store' | 'location') => (type === 'supplier' ? suppliers : type === 'drink_store' ? drinkStores : locations).find(x => x.id === id);
  const commandId = (key: string) => { if (!commandIds.current.has(key)) commandIds.current.set(key, crypto.randomUUID()); return commandIds.current.get(key)!; };
  const itemAction = (id: string, type: 'supplier' | 'drink_store' | 'location', action: string, data: unknown) => {
    const key = `${id}:${action}:${JSON.stringify(data)}`;
    return perform(`${id}:${action}`, async () => {
      await sendJson(`/api/${routeFor(type)}/${encodeURIComponent(id)}/actions`, { action, data, operationId: commandId(key), revision: itemById(id, type)?.revision || 0 });
      commandIds.current.delete(key);
    });
  };
  const resetFilters = (tab?: AppViewTab) => {
    setFilterResetVersion(v => v + 1);
    if (tab) setActiveTab(tab); setCountryFilter('all'); setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); setSelectedTag('all'); setSelectedRating(null);
  };
  const addSupplier: AppContextType['addSupplier'] = async input => {
    let item: SupplierRecord | null = null;
    const ok = await perform('create-supplier', async () => { const result = await sendJson('/api/suppliers', { ...input, id: `sup-${commandId('create-supplier:' + JSON.stringify(input))}` }); item = result.item; });
    if (ok) { commandIds.current.delete('create-supplier:' + JSON.stringify(input)); resetFilters('suppliers'); } return ok ? item : null;
  };
  const addStoreInspo: AppContextType['addStoreInspo'] = async input => {
    let item: StoreInspoRecord | null = null;
    const ok = await perform('create-store', async () => { const result = await sendJson('/api/drink-stores', { ...input, id: `store-${commandId('create-store:' + JSON.stringify(input))}` }); item = result.item; });
    if (ok) { commandIds.current.delete('create-store:' + JSON.stringify(input)); resetFilters('drink_stores'); } return ok ? item : null;
  };
  const addLocation: AppContextType['addLocation'] = async input => {
    let item: LocationRecord | null = null;
    const ok = await perform('create-location', async () => { const result = await sendJson('/api/locations', { ...input, id: `loc-${commandId('create-location:' + JSON.stringify(input))}` }); item = result.item; });
    if (ok) { commandIds.current.delete('create-location:' + JSON.stringify(input)); resetFilters('locations'); } return ok ? item : null;
  };
  const updateSupplier = (id: string, updates: Partial<SupplierRecord>) => perform(`${id}:edit`, async () => {
    const target = editingSupplier?.id === id ? editingSupplier : suppliers.find(s => s.id === id);
    if (!target) throw new Error('ไม่พบรายการ');
    await sendJson('/api/suppliers', { ...target, ...updates, id, revision: target.revision || 0 });
    resetFilters('suppliers');
  });
  const updateStoreInspo = (id: string, updates: Partial<StoreInspoRecord>) => perform(`${id}:edit`, async () => {
    const target = editingStore?.id === id ? editingStore : drinkStores.find(s => s.id === id);
    if (!target) throw new Error('ไม่พบรายการ');
    await sendJson('/api/drink-stores', { ...target, ...updates, id, revision: target.revision || 0 });
    resetFilters('drink_stores');
  });
  const updateLocation = (id: string, updates: Partial<LocationRecord>) => perform(`${id}:edit`, async () => {
    const target = editingLocation?.id === id ? editingLocation : locations.find(l => l.id === id);
    if (!target) throw new Error('ไม่พบรายการ');
    await sendJson('/api/locations', { ...target, ...updates, id, revision: target.revision || 0 });
    resetFilters('locations');
  });
  const deleteItem = (id: string, type: 'supplier' | 'drink_store' | 'location') => perform(`${id}:delete`, async () => {
    await sendJson(`/api/${routeFor(type)}/${encodeURIComponent(id)}`, { revision: itemById(id, type)?.revision || 0 }, 'DELETE');
    if (currentUser.role === 'admin') void fetchTrash();
  });
  const deleteSupplier = (id: string) => deleteItem(id, 'supplier');
  const deleteStoreInspo = (id: string) => deleteItem(id, 'drink_store');
  const deleteLocation = (id: string) => deleteItem(id, 'location');
  const fetchTrash = async () => {
    if (!getSessionToken() || currentUser.id !== 'user-ice') return;
    try {
      const res = await requestJson('/api/trash');
      if (res && Array.isArray(res.items)) {
        setTrashItems(res.items);
      }
    } catch (e) {
      console.warn('Failed to fetch trash:', e);
    }
  };
  const restoreTrashItem = (id: string) => perform(`trash:restore:${id}`, async () => {
    await sendJson(`/api/trash/${encodeURIComponent(id)}/restore`, {});
    await fetchTrash();
  });
  const permanentDeleteTrashItem = (id: string) => perform(`trash:delete:${id}`, async () => {
    await sendJson(`/api/trash/${encodeURIComponent(id)}`, {}, 'DELETE');
    setTrashItems(prev => prev.filter(x => x.id !== id));
  });
  const batchTrash = (action: 'restore' | 'delete', items: TrashedItem[]) => perform('trash:batch', async () => {
    await sendJson('/api/trash/batch', { action, items: items.map(({id, trashedAt}) => ({id, trashedAt})) });
    await fetchTrash();
  });
  const addReviewerNote = (id: string, type: 'supplier' | 'drink_store' | 'location', text: string, extra?: { voiceUrl?: string; photoUrl?: string; duration?: number }) => itemAction(id, type, 'comment', { text, ...extra });
  const addReviewReply = (id: string, type: 'supplier' | 'drink_store' | 'location', noteId: string, text: string, replyToAuthor?: string, extra?: { voiceUrl?: string; photoUrl?: string; duration?: number; replyToId?: string }) => itemAction(id, type, 'reply', { noteId, text, replyToAuthor, ...extra });
  const updateHandoff: AppContextType['updateHandoff'] = (id, type, data) => itemAction(id, type, 'handoff', data);
  const updatePipelineStatus = (id: string, status: PipelineStatus) => itemAction(id, 'supplier', 'handoff', { status });
  // View logging is telemetry; failure must not prevent opening a record.
  const recordItemView = (id: string, type: 'supplier' | 'drink_store' | 'location') => {
    if (!getSessionToken()) return;
    void sendJson(`/api/${routeFor(type)}/${encodeURIComponent(id)}/actions`, { action: 'view', operationId: crypto.randomUUID() }).catch(() => {});
  };
  const toggleLikeItem = (id: string, type: 'supplier' | 'drink_store' | 'location') => {
    if (!canComment) return;
    void itemAction(id, type, 'like', { liked: !(itemById(id, type)?.likes || []).some(l => l.userId === currentUser.id) });
  };
  const openEditItem = (item: Item) => {
    if (!canEditItems) return;
    if (item.type === 'supplier') setEditingSupplier(item as SupplierRecord);
    else if (item.type === 'drink_store') setEditingStore(item as StoreInspoRecord);
    else if (item.type === 'location') setEditingLocation(item as LocationRecord);
  };
  const closeEditItem = () => { setEditingSupplier(null); setEditingStore(null); setEditingLocation(null); };
  const updateUserRole = (id: string, role: UserRole) => perform(`${id}:role`, () => sendJson('/api/users', { id, role, revision: users.find(u => u.id === id)?.revision || 0 }));
  const deleteUser = (id: string) => perform(`${id}:delete-user`, () => sendJson(`/api/users/${encodeURIComponent(id)}`, { revision: users.find(u => u.id === id)?.revision || 0 }, 'DELETE'));
  const deleteInvite = (id: string) => perform(`${id}:delete-invite`, () => sendJson(`/api/invites/${encodeURIComponent(id)}`, {}, 'DELETE'));
  const createInvite = async (role: UserRole, prefilledAlias?: string): Promise<InviteLink> => {
    const result = await sendJson('/api/invites', { role, prefilledAlias, requestId: crypto.randomUUID() }); await refreshCentralData(); return result.invite;
  };
  const updateCurrentUserAvatar = async (avatar: string, revision: number): Promise<User | null> => {
    let user: User | null = null;
    const ok = await perform('profile-avatar', async () => { user = (await sendJson('/api/profile/avatar', { avatar, revision })).user; });
    return ok ? user : null;
  };
  const updateCurrentUserProfile: AppContextType['updateCurrentUserProfile'] = (name, alias, avatar, pin, emailOrId, expectedRevision) => perform('profile', () => sendJson('/api/users', { id: currentUser.id, name, alias, avatar, pin: pin || undefined, emailOrId, revision: expectedRevision ?? currentUser.revision ?? 0 }));
  const loginWithCredentials = async (id: string, pin: string) => {
    try {
      await loginUserApi(id, pin); setActionError(null);
      const ok = await refreshCentralData();
      if (!ok) setActionError('ตรวจสอบบัญชีแล้ว แต่ยังโหลดข้อมูลไม่ได้ กรุณารอการเชื่อมต่อหรือลองใหม่');
      return ok;
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : 'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ กรุณาลองใหม่ ไม่ได้หมายความว่ารหัสผ่านผิด');
      return false;
    }
  };
  const loginWithPin = loginWithCredentials;
  const logout = async () => {
    if (pendingActions.current.has('logout')) return;
    const token = getSessionToken();
    pendingActions.current.add('logout'); setActionError(null);
    try {
      await sendJson('/api/logout', {});
      if (token === getSessionToken()) clearSession();
    } catch {
      if (token === getSessionToken()) setActionError('ออกจากระบบไม่สำเร็จ เซิร์ฟเวอร์ยังไม่ยืนยัน กรุณาลองอีกครั้ง');
    } finally { pendingActions.current.delete('logout'); }
  };
  const switchUser = (userId: string) => perform('simulate', () => sendJson('/api/simulate', { userId }));
  const restoreAdminUser = () => switchUser('user-ice');
  const registerUserWithInvite: AppContextType['registerUserWithInvite'] = async (code, name, alias, emailOrId, pin, avatar) => {
    const result = await sendJson('/api/register', { code, name, alias, emailOrId, pin, avatar });
    setSessionToken(result.token); await refreshCentralData(); return result.user;
  };
  const redeemInvite: AppContextType['redeemInvite'] = async (code, name, alias, avatar, pin) => {
    try { return await registerUserWithInvite(code, name, alias, name.toLowerCase().replace(/\s+/g, ''), pin, avatar); }
    catch (e) { setActionError(e instanceof Error ? e.message : 'สมัครไม่สำเร็จ'); return null; }
  };
  const changeSettings = (key: string, transform: (previous: any[]) => any[]) => {
    return perform('settings', () => sendJson('/api/settings', { previous: settingsRef.current, values: { [key]: transform(settingsRef.current[key] || []) } }));
  };
  const addCategory = (x: string) => changeSettings('categories', p => [...new Set([...p, x.trim()])].filter(Boolean));
  const editCategory = (a: string, b: string) => changeSettings('categories', p => p.map(x => x === a ? b.trim() : x));
  const deleteCategory = (x: string) => changeSettings('categories', p => p.filter(v => v !== x));
  const addStoreCategory = (x: string) => changeSettings('storeCategories', p => [...new Set([...p, x.trim()])].filter(Boolean));
  const editStoreCategory = (a: string, b: string) => changeSettings('storeCategories', p => p.map(x => x === a ? b.trim() : x));
  const deleteStoreCategory = (x: string) => changeSettings('storeCategories', p => p.filter(v => v !== x));
  const addLocationType = (x: string) => changeSettings('locationTypes', p => [...new Set([...(p || []), x.trim()])].filter(Boolean));
  const editLocationType = (a: string, b: string) => changeSettings('locationTypes', p => (p || []).map(x => x === a ? b.trim() : x));
  const deleteLocationType = (x: string) => changeSettings('locationTypes', p => (p || []).filter(v => v !== x));
  const addQuickTag = (x: string) => changeSettings('quickTagsList', p => [...new Set([...p, x.trim()])].filter(Boolean));
  const editQuickTag = (a: string, b: string) => changeSettings('quickTagsList', p => p.map(x => x === a ? b.trim() : x));
  const deleteQuickTag = (x: string) => changeSettings('quickTagsList', p => p.filter(v => v !== x));
  const addQuickMessage = (title: string, text: string) => changeSettings('quickMessages', p => [...p, { id: crypto.randomUUID(), title, text }]);
  const editQuickMessage = (id: string, title: string, text: string) => changeSettings('quickMessages', p => p.map(q => q.id === id ? { ...q, title, text } : q));
  const deleteQuickMessage = (id: string) => changeSettings('quickMessages', p => p.filter(q => q.id !== id));
  const loadFullMockupData = async (): Promise<boolean> => {
    if (currentUser.id !== 'user-ice' || simulatedFromAdmin) {
      setActionError('ไม่สามารถดำเนินการนี้ได้ (เฉพาะเจ้าของระบบ)'); return false;
    }
    if (pendingActions.current.has('sample-pack')) return false;
    pendingActions.current.add('sample-pack');
    const sessionToken = getSessionToken();
    const operationId = commandId('sample-pack');
    setIsMockLoading(true); setMockLoadStatus('loading'); setActionError(null);
    setMockLoadMessage('กำลังให้เซิร์ฟเวอร์เพิ่มชุดตัวอย่างและบันทึกข้อมูล…');
    try {
      let result;
      try {
        result = await requestJson('/api/system/sample-pack', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packId: 'vitcha-demo-v2', operationId }),
        }, 60000);
      } catch (error) {
        if (error instanceof ApiError && error.status < 500) throw error;
        setMockLoadMessage('ยังไม่ได้รับคำตอบ กำลังตรวจสอบว่าเซิร์ฟเวอร์บันทึกสำเร็จหรือยัง…');
        try { result = await requestJson(`/api/system/sample-operations/${encodeURIComponent(operationId)}`, {}, 15000); }
        catch { throw new Error('ยังยืนยันผลการโหลดไม่ได้ กรุณาตรวจการเชื่อมต่อแล้วกดโหลดอีกครั้ง ระบบจะไม่เพิ่มรายการซ้ำ'); }
      }
      if (sessionToken !== getSessionToken()) return false;
      if (!result?.success || !result.recordIds || !result.added || !result.skipped) throw new Error('ผลการโหลดจากเซิร์ฟเวอร์ไม่สมบูรณ์');
      setMockLoadMessage('บันทึกแล้ว กำลังอ่านข้อมูลกลับเพื่อตรวจจำนวนรายการ…');
      if (!await latestRefresh.current()) throw new Error('เซิร์ฟเวอร์บันทึกแล้ว แต่ยังอ่านข้อมูลกลับไม่ได้ กดรีเฟรชหรือโหลดอีกครั้งเพื่อตรวจผล');
      const labels: Record<string, string> = { suppliers: 'ซัพพลายเออร์', drinkStores: 'ร้านน้ำ', locations: 'ทำเล', leadLabItems: 'สูตร R&D', franchiseStores: 'แบรนด์' };
      for (const key of Object.keys(labels)) {
        const expected = result.recordIds[key];
        const ids = new Set((latestSnapshot.current?.[key] || []).map((item: any) => item.id));
        if (!Array.isArray(expected) || expected.some((id: string) => !ids.has(id))) {
          commandIds.current.delete('sample-pack');
          throw new Error('ข้อมูลที่อ่านกลับยังไม่ครบชุด กรุณากดโหลดอีกครั้งเพื่อตรวจและเติมเฉพาะรายการที่ขาด');
        }
      }
      commandIds.current.delete('sample-pack');
      const added = Object.values(result.added).reduce<number>((sum, n) => sum + Number(n), 0);
      const skipped = Object.values(result.skipped).reduce<number>((sum, n) => sum + Number(n), 0);
      const counts = Object.entries(labels).map(([key, label]) => `${label} ${latestSnapshot.current[key]?.length || 0}`).join(' · ');
      const message = `ตรวจสอบข้อมูลสำเร็จ: เพิ่ม ${added} รายการ · ข้ามรายการเดิม ${skipped} รายการ — ข้อมูลปัจจุบัน: ${counts}`;
      setMockLoadMessage(message); setMockLoadStatus('success');

      return true;
    } catch (error) {
      if (sessionToken === getSessionToken()) {
        const message = error instanceof Error ? error.message : 'โหลดข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง';
        setActionError(message); setMockLoadMessage(message); setMockLoadStatus('error');
      }
      return false;
    } finally { pendingActions.current.delete('sample-pack'); setIsMockLoading(false); }
  };
  const resetSystemData = async (password: string): Promise<boolean> => {
    if (currentUser.id !== 'user-ice' || simulatedFromAdmin) {
      setActionError('ไม่สามารถดำเนินการนี้ได้ (เฉพาะผู้ก่อตั้ง)');
      return false;
    }
    setIsClearing(true);
    setActionError(null);
    try {
      const freshData = await fetchCentralData();
      const currentRev = freshData?.revision ?? databaseRevision.current;
      const ok = await perform('reset', () => sendJson('/api/system/clear', { revision: currentRev, confirm: 'CLEAR_RECORDS', password }));
      if (ok) {
        setMockLoadStatus('idle'); setMockLoadMessage('');
        await latestRefresh.current();
        showToast({
          id: crypto.randomUUID(),
          title: '🗑️ ล้างข้อมูลระบบเป็น 0 เรียบร้อย',
          message: 'ล้างข้อมูลรายการทั้งหมดแล้ว สมาชิกและสิทธิ์ในระบบยังคงอยู่ครบ',
          timestamp: new Date().toISOString(),
          type: 'system',
          actorId: 'system',
          actorAlias: 'ระบบ VITCHA',
          read: false,
        });
      }
      return ok;
    } catch (err: any) {
      setActionError(err instanceof Error ? err.message : 'ล้างข้อมูลไม่สำเร็จ');
      return false;
    } finally {
      setIsClearing(false);
    }
  };
  const clearMockupOnly = async (password: string): Promise<boolean> => {
    if (currentUser.id !== 'user-ice' || simulatedFromAdmin) {
      setActionError('ไม่สามารถดำเนินการนี้ได้ (เฉพาะผู้ก่อตั้ง)');
      return false;
    }
    setIsClearing(true);
    setActionError(null);
    try {
      const freshData = await fetchCentralData();
      const currentRev = freshData?.revision ?? databaseRevision.current;
      const ok = await perform('reset-mockup', () => sendJson('/api/system/clear', { revision: currentRev, confirm: 'CLEAR_MOCKUP', password }));
      if (ok) {
        setMockLoadStatus('idle'); setMockLoadMessage('');
        await latestRefresh.current();
        showToast({
          id: crypto.randomUUID(),
          title: '🧹 ล้างเฉพาะข้อมูล Mockup เรียบร้อย',
          message: 'ลบรายการจำลองออกทั้งหมดแล้ว ข้อมูลจริงและสมาชิกยังคงอยู่ครบ',
          timestamp: new Date().toISOString(),
          type: 'system',
          actorId: 'system',
          actorAlias: 'ระบบ VITCHA',
          read: false,
        });
      }
      return ok;
    } catch (err: any) {
      setActionError(err instanceof Error ? err.message : 'ล้างข้อมูล Mockup ไม่สำเร็จ');
      return false;
    } finally {
      setIsClearing(false);
    }
  };
  const broadcastNotification: AppContextType['broadcastNotification'] = async (title, message, type, targetId, avatar, suppressToast, options) => {
    const n: AppNotification = { id: crypto.randomUUID(), title, message, type, targetId, avatar, timestamp: new Date().toISOString(), read: false };
    if (options?.localOnly) { if (!suppressToast) showToast(n); return true; }
    if (options?.isCategory5) { if (currentUser.id === 'user-ice' && !suppressToast) showToast(n); return true; }
    if (currentUser.id === 'user-ice' && !simulatedFromAdmin) return perform('broadcast', () => sendJson('/api/notifications', n));
    return false;
  };
  const dismissToast = () => setActiveToast(null);
  const markAllNotificationsRead = async () => {
    setNotifications(p => p.map(n => ({ ...n, read: true })));
    try { await markNotificationsReadApi({ all: true }); } catch (e) { console.warn('Failed to sync notification read:', e); }
  };
  const markNotificationRead = async (id: string) => {
    setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n));
    try { await markNotificationsReadApi({ id }); } catch (e) { console.warn('Failed to sync notification read:', e); }
  };
  const clearAllNotifications = async () => {
    setNotifications([]);
    try { await clearNotificationsApi({ all: true }); } catch (e) { console.warn('Failed to sync notification clear:', e); }
  };
  const clearNotification = async (id: string) => {
    setNotifications(p => p.filter(n => n.id !== id));
    try { await clearNotificationsApi({ id }); } catch (e) { console.warn('Failed to sync notification clear:', e); }
  };
  const saveLeadLabItem = async (item: Partial<LabItem>) => {
    return perform('save-lead-lab', async () => {
      const res = await postLeadLabItemApi(item);
      if (res?.item) {
        setLeadLabItems(p => {
          const idx = p.findIndex(x => x.id === res.item.id);
          if (idx >= 0) { const next = [...p]; next[idx] = res.item; return next; }
          return [res.item, ...p];
        });
      }
    });
  };

  const deleteLeadLabItem = async (id: string) => {
    return perform('delete-lead-lab', async () => {
      await deleteLeadLabItemApi(id);
      setLeadLabItems(p => p.filter(x => x.id !== id));
    });
  };

  const toggleLikeLeadLabItem = async (id: string) => {
    const userId = currentUser.id;
    setLeadLabItems(p => p.map(item => {
      if (item.id !== id) return item;
      const liked = item.likedBy?.includes(userId);
      const nextLiked = liked ? item.likedBy.filter(x => x !== userId) : [...(item.likedBy || []), userId];
      return { ...item, likedBy: nextLiked };
    }));
    try {
      const res = await likeLeadLabItemApi(id);
      if (res?.likedBy) {
        setLeadLabItems(p => p.map(x => x.id === id ? { ...x, likedBy: res.likedBy } : x));
      }
      return true;
    } catch {
      return false;
    }
  };

  const addLeadLabComment = async (
    id: string,
    content: string,
    sweetnessTarget?: 'all' | '0' | '50' | '100',
    extra?: { photoUrl?: string; voiceUrl?: string; duration?: number }
  ) => {
    let text = content ? String(content).trim() : '';
    if (!text && (extra?.photoUrl || extra?.voiceUrl)) {
      text = extra?.photoUrl && extra?.voiceUrl ? '📷 แนบรูปภาพและเสียง' : extra?.photoUrl ? '📷 แนบรูปภาพ' : '🎙️ ข้อความเสียง';
    }
    const optimisticComment: any = {
      id: `comm-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.alias || currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      content: text,
      sweetnessTarget: sweetnessTarget || 'all',
      photoUrl: extra?.photoUrl,
      voiceUrl: extra?.voiceUrl,
      duration: extra?.duration,
      likes: [],
    };
    setLeadLabItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const cycles = [...(item.revisionCycles || [])];
      let active = cycles.find(c => c.status === 'active');
      if (!active) {
        active = {
          cycleNumber: cycles.length + 1,
          title: `รอบที่ ${cycles.length + 1}: เปิดรอบพัฒนาต่อ`,
          status: 'active',
          createdAt: new Date().toISOString(),
          createdBy: currentUser.alias || currentUser.name,
          comments: []
        };
        cycles.push(active);
      }
      active.comments = [...(active.comments || []), optimisticComment];
      return { ...item, revisionCycles: cycles };
    }));

    return perform('comment-lead-lab', async () => {
      const res = await commentLeadLabItemApi(id, { content: text, sweetnessTarget, ...extra });
      if (res?.item) {
        setLeadLabItems(p => p.map(x => x.id === id ? res.item : x));
      }
    });
  };

  const toggleLikeLeadLabComment = async (id: string, commentId: string) => {
    try {
      const res = await likeLeadLabCommentApi(id, commentId);
      if (res?.likes) {
        setLeadLabItems(p => p.map(item => {
          if (item.id !== id) return item;
          const nextCycles = (item.revisionCycles || []).map(cycle => ({
            ...cycle,
            comments: (cycle.comments || []).map(comm => comm.id === commentId ? { ...comm, likes: res.likes } : comm)
          }));
          return { ...item, revisionCycles: nextCycles };
        }));
      }
      return true;
    } catch {
      return false;
    }
  };

  const cycleLeadLabRevision = async (id: string, summary: string, nextTitle?: string) => {
    return perform('cycle-lead-lab', async () => {
      const res = await cycleLeadLabItemApi(id, { action: 'close', summary, nextTitle });
      if (res?.item) {
        setLeadLabItems(p => p.map(x => x.id === id ? res.item : x));
      }
    });
  };

  const setLeadLabStatus = async (id: string, status: LabFormulaStatus) => {
    return perform('status-lead-lab', async () => {
      const res = await updateLeadLabStatusApi(id, status);
      if (res?.item) {
        setLeadLabItems(p => p.map(x => x.id === id ? res.item : x));
      }
    });
  };

  const saveFranchiseStore = async (store: Partial<FranchiseStore>) => {
    return perform('save-franchise-store', async () => {
      const res = await postFranchiseStoreApi(store);
      if (res?.store) {
        setFranchiseStores(p => {
          const idx = p.findIndex(x => x.id === res.store.id);
          if (idx >= 0) { const next = [...p]; next[idx] = res.store; return next; }
          return [...p, res.store];
        });
      }
    });
  };

  const deleteFranchiseStore = async (id: string) => {
    return perform('delete-franchise-store', async () => {
      await deleteFranchiseStoreApi(id);
      setFranchiseStores(p => p.filter(x => x.id !== id));
    });
  };

  const toggleLikeFranchiseStore = async (id: string) => {
    const userId = currentUser.id;
    const store = franchiseStores.find(x => x.id === id);
    if (!store) return false;
    const liked = (store.likedBy || []).includes(userId);
    const nextLiked = liked ? store.likedBy!.filter(x => x !== userId) : [...(store.likedBy || []), userId];
    const updated = { ...store, likedBy: nextLiked };
    setFranchiseStores(p => p.map(s => s.id === id ? updated : s));
    return saveFranchiseStore({ id, likedBy: nextLiked });
  };

  const addFranchiseStoreComment = async (
    id: string,
    content: string,
    sweetnessTarget?: 'all' | '0' | '50' | '100',
    extra?: { photoUrl?: string; voiceUrl?: string; duration?: number }
  ) => {
    const store = franchiseStores.find(x => x.id === id);
    if (!store) return false;
    const cycles = store.revisionCycles || [
      { cycleNumber: 1, title: 'รอบเปิดตัวสาขา & เมนูบอร์ด', status: 'active', createdAt: new Date().toISOString(), createdBy: currentUser.alias, comments: [] }
    ];
    let text = content ? String(content).trim() : '';
    if (!text && (extra?.photoUrl || extra?.voiceUrl)) {
      text = extra?.photoUrl && extra?.voiceUrl ? '📷 แนบรูปภาพและเสียง' : extra?.photoUrl ? '📷 แนบรูปภาพ' : '🎙️ ข้อความเสียง';
    }
    const newComment = {
      id: `comm-${crypto.randomUUID()}`,
      authorId: currentUser.id,
      authorName: currentUser.alias || currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      content: text,
      sweetnessTarget: sweetnessTarget || 'all',
      photoUrl: extra?.photoUrl,
      voiceUrl: extra?.voiceUrl,
      duration: extra?.duration,
      likes: []
    };
    const activeCycleIndex = cycles.findIndex(c => c.status === 'active');
    const targetIdx = activeCycleIndex >= 0 ? activeCycleIndex : 0;
    const nextCycles = cycles.map((c, idx) => {
      if (idx !== targetIdx) return c;
      return { ...c, comments: [newComment, ...(c.comments || [])] };
    });
    setFranchiseStores(p => p.map(s => s.id === id ? { ...s, revisionCycles: nextCycles } : s));
    return saveFranchiseStore({ id, revisionCycles: nextCycles });
  };

  const toggleLikeFranchiseStoreComment = async (id: string, commentId: string) => {
    const store = franchiseStores.find(x => x.id === id);
    if (!store) return false;
    const userId = currentUser.id;
    const nextCycles = (store.revisionCycles || []).map(cycle => ({
      ...cycle,
      comments: (cycle.comments || []).map(comm => {
        if (comm.id !== commentId) return comm;
        const liked = (comm.likes || []).includes(userId);
        const nextLikes = liked ? comm.likes.filter(x => x !== userId) : [...(comm.likes || []), userId];
        return { ...comm, likes: nextLikes };
      })
    }));
    setFranchiseStores(p => p.map(s => s.id === id ? { ...s, revisionCycles: nextCycles } : s));
    return saveFranchiseStore({ id, revisionCycles: nextCycles });
  };

  const recordFranchiseStoreView = (id: string) => {
    const store = franchiseStores.find(x => x.id === id);
    if (!store) return;
    const existing = store.viewLogs || [];
    const idx = existing.findIndex(v => v.userId === currentUser.id);
    const nowIso = new Date().toISOString();
    let nextLogs: ViewLogEntry[];
    if (idx >= 0) {
      nextLogs = [...existing];
      nextLogs[idx] = { ...nextLogs[idx], lastViewedAt: nowIso, viewCount: (nextLogs[idx].viewCount || 1) + 1 };
    } else {
      nextLogs = [
        {
          userId: currentUser.id,
          name: currentUser.name,
          alias: currentUser.alias,
          avatar: currentUser.avatar,
          role: currentUser.role,
          lastViewedAt: nowIso,
          viewCount: 1
        },
        ...existing
      ];
    }
    setFranchiseStores(p => p.map(s => s.id === id ? { ...s, viewLogs: nextLogs } : s));
    void sendJson(`/api/franchise-stores/${encodeURIComponent(id)}/view`, {}).catch(() => {});
  };

  const recordLeadLabItemView = (id: string) => {
    const item = leadLabItems.find(x => x.id === id);
    if (!item) return;
    const existing = item.viewLogs || [];
    const idx = existing.findIndex(v => v.userId === currentUser.id);
    const nowIso = new Date().toISOString();
    let nextLogs: ViewLogEntry[];
    if (idx >= 0) {
      nextLogs = [...existing];
      nextLogs[idx] = { ...nextLogs[idx], lastViewedAt: nowIso, viewCount: (nextLogs[idx].viewCount || 1) + 1 };
    } else {
      nextLogs = [
        {
          userId: currentUser.id,
          name: currentUser.name,
          alias: currentUser.alias,
          avatar: currentUser.avatar,
          role: currentUser.role,
          lastViewedAt: nowIso,
          viewCount: 1
        },
        ...existing
      ];
    }
    setLeadLabItems(p => p.map(x => x.id === id ? { ...x, viewLogs: nextLogs } : x));
    void sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}/view`, {}).catch(() => {});
  };

  const updateExchangeRate = (rate: number, isAuto = false) => { if (rate > 0 && Number.isFinite(rate)) setExchangeRate(p => ({ ...p, rate, isAuto, lastUpdated: new Date().toLocaleTimeString('th-TH') })); };
  const toggleCurrencyMode = () => setExchangeRate(p => ({ ...p, currencyMode: p.currencyMode === 'CNY_TO_THB' ? 'THB_TO_CNY' : 'CNY_TO_THB' }));
  const convertCnyToThb = (n: number) => Math.round(n * exchangeRate.rate * 100) / 100;
  const convertThbToCny = (n: number) => Math.round(n / exchangeRate.rate * 100) / 100;
  const setRenderServerUrl = (url: string) => { clearSession(); saveRenderServerUrl(url); setRenderServerUrlState(url); };
  const testRenderConnection = async (url?: string) => { const result = await checkServerHealth(url); setRenderStatus(result.ok ? 'connected' : 'disconnected'); return result; };
  const syncAllDataToRender = () => refreshCentralData();
  return <AppContext.Provider value={{
    products, productCategories, productTags, productSets, saveProduct, updateProducts, manageProductTaxonomy, saveProductSet, deleteProductSet,
    currentUser, users, suppliers, drinkStores, locations, invites, categories, storeCategories, locationTypes, quickTagsList, quickMessages, exchangeRate, syncStatus, pendingSyncCount,
    leadLabItems, franchiseStores, saveLeadLabItem, deleteLeadLabItem, toggleLikeLeadLabItem, addLeadLabComment, toggleLikeLeadLabComment, cycleLeadLabRevision, setLeadLabStatus, saveFranchiseStore, deleteFranchiseStore,
    toggleLikeFranchiseStore, addFranchiseStoreComment, toggleLikeFranchiseStoreComment, recordFranchiseStoreView, recordLeadLabItemView,
    activeTab, filterResetVersion, countryFilter, searchQuery, selectedCategory, selectedStatus, selectedTag, selectedRating, notifications, activeToast,
    actionError, clearActionError: () => setActionError(null), isMutating: mutationCount > 0,
    setActiveTab, setCountryFilter, setSearchQuery, setSelectedCategory, setSelectedStatus, setSelectedTag, setSelectedRating,
    dismissToast, markAllNotificationsRead, markNotificationRead, clearAllNotifications, clearNotification, broadcastNotification, addCategory, editCategory, deleteCategory, addStoreCategory, editStoreCategory, deleteStoreCategory,
    addLocationType, editLocationType, deleteLocationType,
    addQuickTag, editQuickTag, deleteQuickTag, addQuickMessage, editQuickMessage, deleteQuickMessage, updateUserRole, recordItemView, toggleLikeItem,
    mockLoadMessage, mockLoadStatus, lastRefreshedAt, isMockLoading, isClearing, loadFullMockupData, resetSystemData, clearMockupOnly,
    updateHandoff, addSupplier, updateSupplier, deleteSupplier, addStoreInspo, updateStoreInspo, deleteStoreInspo, addLocation, updateLocation, deleteLocation, canEditItems, canDeleteItems, canComment, canAddItems,
    trashItems, batchTrash, fetchTrash, restoreTrashItem, permanentDeleteTrashItem,
    editingSupplier, editingStore, editingLocation, openEditItem, closeEditItem, addReviewerNote, addReviewReply, updatePipelineStatus, updateExchangeRate, toggleCurrencyMode, convertCnyToThb, convertThbToCny,
    updateCurrentUserProfile, updateCurrentUserAvatar, switchUser, simulatedFromAdmin, restoreAdminUser, deleteUser, deleteInvite, refreshCentralData, isAuthenticated, isRestoringSession, logout, loginWithCredentials, loginWithPin,
    createInvite, redeemInvite, registerUserWithInvite, renderStatus, renderServerUrl, setRenderServerUrl, testRenderConnection, syncAllDataToRender,
  }}>{children}</AppContext.Provider>;
};
export const useApp = () => { const context = useContext(AppContext); if (!context) throw new Error('AppProvider missing'); return context; };
