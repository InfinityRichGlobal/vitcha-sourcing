import React, { useState, useMemo, useEffect } from 'react';
import {
  Store,
  Plus,
  Printer,
  Sparkles,
  Flame,
  CheckCircle2,
  Coffee,
  X,
  Droplet,
  ExternalLink,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  Phone,
  Bookmark,
  FileText,
  BadgeAlert,
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare,
  Eye,
  Camera,
  Upload,
  Layers,
  ChevronRight,
  Send,
  ThumbsUp,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FranchiseStore, StoreMenuItem, LabItem } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { printFranchiseStoreReport, shareFranchiseStore } from '../utils/labAndStoreExport';

export function FranchiseStoreView({
  onNavigateToLab,
}: {
  onNavigateToLab?: () => void;
}) {
  const {
    franchiseStores,
    leadLabItems,
    currentUser,
    saveFranchiseStore,
    deleteFranchiseStore,
    toggleLikeFranchiseStore,
    addFranchiseStoreComment,
    toggleLikeFranchiseStoreComment,
    recordFranchiseStoreView,
  } = useApp();

  // Navigation mode: null = Franchise Hub (Directory), string = Specific Store Detail
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // Store Management Modals
  const [isStoreFormOpen, setIsStoreFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<FranchiseStore | null>(null);

  // Menu item modals inside store
  const [selectedQuickSopItem, setSelectedQuickSopItem] = useState<{
    menuItem: StoreMenuItem;
    labItem: LabItem;
  } | null>(null);
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [storeCategoryFilter, setStoreCategoryFilter] = useState<string>('all');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Comment input state for store discussion
  const [storeCommentText, setStoreCommentText] = useState('');
  const [storeSweetnessTarget, setStoreSweetnessTarget] = useState<'all' | '0' | '50' | '100'>('all');

  const activeStore = useMemo(() => {
    if (!selectedStoreId) return null;
    return franchiseStores.find((s) => s.id === selectedStoreId) || null;
  }, [franchiseStores, selectedStoreId]);

  // Record view on opening store
  useEffect(() => {
    if (activeStore) {
      recordFranchiseStoreView(activeStore.id);
    }
  }, [activeStore?.id]);

  // Map menu items to full LabItem details
  const enrichedMenuItems = useMemo(() => {
    if (!activeStore) return [];
    return (activeStore.menuItems || [])
      .map((menuItem) => {
        const labItem = leadLabItems.find((x) => x.id === menuItem.labItemId);
        return {
          menuItem,
          labItem,
        };
      })
      .filter((x): x is { menuItem: StoreMenuItem; labItem: LabItem } => Boolean(x.labItem));
  }, [activeStore, leadLabItems]);

  const filteredMenuItems = useMemo(() => {
    if (storeCategoryFilter === 'all') return enrichedMenuItems;
    return enrichedMenuItems.filter(
      (item) => (item.menuItem.category || item.labItem.category) === storeCategoryFilter
    );
  }, [enrichedMenuItems, storeCategoryFilter]);

  const drinksList = filteredMenuItems.filter((x) => x.labItem.type === 'drink');
  const toppingsList = filteredMenuItems.filter((x) => x.labItem.type === 'topping');

  // Total statistics across all franchise stores
  const totalStores = franchiseStores.length;
  const totalActiveMenus = franchiseStores.reduce((acc, s) => acc + (s.menuItems?.length || 0), 0);

  // Helper for store colors
  const getThemeClasses = (color?: string) => {
    switch (color) {
      case 'cyan':
        return {
          bg: 'from-cyan-950 via-slate-900 to-blue-950 border-cyan-800/40',
          accent: 'text-cyan-400',
          pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
          btn: 'bg-cyan-600 hover:bg-cyan-500 text-white',
          border: 'border-cyan-500/30',
          badge: 'bg-cyan-100 text-cyan-800 border-cyan-300'
        };
      case 'amber':
        return {
          bg: 'from-amber-950 via-slate-900 to-orange-950 border-amber-800/40',
          accent: 'text-amber-400',
          pill: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
          btn: 'bg-amber-600 hover:bg-amber-500 text-white',
          border: 'border-amber-500/30',
          badge: 'bg-amber-100 text-amber-800 border-amber-300'
        };
      case 'purple':
        return {
          bg: 'from-purple-950 via-slate-900 to-indigo-950 border-purple-800/40',
          accent: 'text-purple-400',
          pill: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
          btn: 'bg-purple-600 hover:bg-purple-500 text-white',
          border: 'border-purple-500/30',
          badge: 'bg-purple-100 text-purple-800 border-purple-300'
        };
      case 'emerald':
      default:
        return {
          bg: 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-800/40',
          accent: 'text-emerald-400',
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
          btn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
          border: 'border-emerald-500/30',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
        };
    }
  };

  const handlePostStoreComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStore || !storeCommentText.trim()) return;
    void addFranchiseStoreComment(activeStore.id, storeCommentText.trim(), storeSweetnessTarget);
    setStoreCommentText('');
  };

  const handleAddCategoryToStore = async () => {
    if (!activeStore || !newCategoryName.trim()) return;
    const existing = activeStore.menuCategories || [];
    if (existing.includes(newCategoryName.trim())) return;
    const nextCats = [...existing, newCategoryName.trim()];
    await saveFranchiseStore({
      ...activeStore,
      menuCategories: nextCats,
    });
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  const handleDeleteStore = async (store: FranchiseStore) => {
    if (window.confirm(`ยืนยันการลบร้าน "${store.name}" ออกจากระบบหรือไม่?`)) {
      await deleteFranchiseStore(store.id);
      if (selectedStoreId === store.id) {
        setSelectedStoreId(null);
      }
    }
  };

  // =========================================================================
  // VIEW 1: 🏪 FRANCHISE HUB / DIRECTORY (หน้ารวมสาขาและการ์ดร้านค้าทั้งหมด)
  // =========================================================================
  if (!selectedStoreId || !activeStore) {
    return (
      <div className="max-w-6xl mx-auto px-3 sm:px-5 py-3.5 space-y-4 sm:space-y-6 pb-24 animate-in fade-in">
        {/* Top Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-5 sm:p-7 md:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Store className="w-3.5 h-3.5" />
                <span>FRANCHISE DIRECTORY & MANAGEMENT HUB</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <span>เครือข่ายร้านแฟรนไชส์</span>
                <span className="text-emerald-400 font-bold text-base sm:text-lg">"แล๊ปของคนหัวแถว"</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                ศูนย์กลางบริหารจัดการสาขา ตรวจสอบป้ายเมนูดิจิทัล (Digital Menu Board) 
                และควบคุมมาตรฐานสูตรชงด่วน Quick SOP สำหรับบาริสต้าหน้าร้าน
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 font-bold text-slate-200">
                  <Store className="w-4 h-4 text-emerald-400" />
                  <span>{totalStores} สาขาในเครือ</span>
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-200">
                  <Coffee className="w-4 h-4 text-indigo-400" />
                  <span>{totalActiveMenus} เมนูพร้อมจำหน่ายรวม</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
              <button
                type="button"
                onClick={() => {
                  setEditingStore(null);
                  setIsStoreFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 transition-all scale-100 hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มร้านแฟรนไชส์ใหม่</span>
              </button>
            </div>
          </div>
        </div>

        {/* 🗂️ STORE CARDS GRID (สไตล์การ์ดหน้าเมนู: 2 คอลัมน์บนมือถือ / Grid บนจอใหญ่) */}
        <div>
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>รายชื่อร้านค้าและสาขาทั้งหมด ({franchiseStores.length} ร้าน)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {franchiseStores.map((store) => {
              const theme = getThemeClasses(store.themeColor);
              const isLiked = (store.likedBy || []).includes(currentUser.id);
              const storeDrinks = (store.menuItems || []).filter((m) => {
                const lab = leadLabItems.find((l) => l.id === m.labItemId);
                return lab?.type === 'drink';
              }).length;
              const storeToppings = (store.menuItems || []).filter((m) => {
                const lab = leadLabItems.find((l) => l.id === m.labItemId);
                return lab?.type === 'topping';
              }).length;
              const storeCommentsCount = (store.revisionCycles || []).reduce(
                (acc, c) => acc + (c.comments?.length || 0),
                0
              );

              return (
                <div
                  key={store.id}
                  className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Brand Cover Photo (Aspect Ratio Fit) */}
                    <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-slate-950 overflow-hidden">
                      <img
                        src={store.logoUrl || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'}
                        alt={store.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white shadow-xs backdrop-blur-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>เปิดบริการปกติ</span>
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm shadow-xs ${theme.badge}`}>
                          {store.branch.includes('Flagship') ? '⭐ Flagship Store' : '📍 ' + store.branch.split('(')[0].trim()}
                        </span>
                      </div>

                      {/* Like button on cover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          void toggleLikeFranchiseStore(store.id);
                        }}
                        className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md backdrop-blur-sm flex items-center gap-1.5 transition-transform active:scale-90 ${
                          isLiked
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/90 text-slate-800 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{(store.likedBy || []).length}</span>
                      </button>

                      {/* Brand Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight flex items-center gap-2">
                          <span>{store.name}</span>
                        </h3>
                        <p className="text-xs text-slate-300 truncate mt-0.5 italic">
                          "{store.brandTagline}"
                        </p>
                      </div>
                    </div>

                    {/* Card Body Info */}
                    <div className="p-4 sm:p-5 space-y-3 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{store.branch}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{store.openingHours || '10:00 - 21:30 น.'}</span>
                        </span>
                      </div>

                      {/* Menu statistics & categories preview */}
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                            เมนูบนป้ายจำหน่าย
                          </span>
                          <span className="text-sm font-extrabold text-slate-800 dark:text-white">
                            {store.menuItems?.length || 0} รายการ
                          </span>
                        </div>
                        <div className="text-right text-[11px] text-slate-500 font-medium">
                          <span>🥤 {storeDrinks} เครื่องดื่ม</span>
                          <span className="mx-1.5">·</span>
                          <span>🍮 {storeToppings} ท็อปปิ้ง</span>
                        </div>
                      </div>

                      {/* Categories pills */}
                      {store.menuCategories && store.menuCategories.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {store.menuCategories.slice(0, 3).map((cat, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium"
                            >
                              {cat}
                            </span>
                          ))}
                          {store.menuCategories.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px]">
                              +{store.menuCategories.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Social & Collaboration footer on card */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{storeCommentsCount} ความเห็น</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>{(store.viewLogs || []).length} เข้าดู</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => void shareFranchiseStore(store, store.menuItems?.length || 0)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 transition-colors"
                            title="แชร์ร้านนี้"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStore(store);
                              setIsStoreFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors"
                            title="แก้ไขข้อมูลร้าน"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDeleteStore(store)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 transition-colors"
                            title="ลบร้านนี้"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Enter Store Action Button */}
                  <div className="p-4 sm:p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedStoreId(store.id)}
                      className="w-full py-2.5 sm:py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all group-hover:shadow-md"
                    >
                      <Store className="w-4 h-4 text-emerald-400" />
                      <span>เข้าร้าน (เปิดป้ายเมนู & SOP)</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ➕ MODAL: ADD / EDIT FRANCHISE STORE */}
        {isStoreFormOpen && (
          <StoreFormModal
            store={editingStore}
            currentUser={currentUser}
            onClose={() => {
              setIsStoreFormOpen(false);
              setEditingStore(null);
            }}
            onSave={async (storeData) => {
              await saveFranchiseStore(storeData);
              setIsStoreFormOpen(false);
              setEditingStore(null);
            }}
          />
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ☕ SPECIFIC STORE DETAIL & DIGITAL MENU BOARD SIMULATOR
  // =========================================================================
  const theme = getThemeClasses(activeStore.themeColor);
  const isEmerald = activeStore.themeColor === 'emerald';
  const isLikedStore = (activeStore.likedBy || []).includes(currentUser.id);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-5 py-3.5 space-y-4 sm:space-y-6 pb-24 animate-in fade-in print:p-0 print:space-y-4">
      {/* 🔙 TOP NAVIGATION BAR: Back to Hub + Store Switcher + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
        <button
          type="button"
          onClick={() => setSelectedStoreId(null)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-extrabold text-xs transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>หน้ารวมร้านแฟรนไชส์</span>
        </button>

        {/* Store Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {franchiseStores.map((store) => {
            const active = store.id === activeStore.id;
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setSelectedStoreId(store.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shrink-0 flex items-center gap-1.5 ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Store className="w-3 h-3 text-emerald-500" />
                <span>{store.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void shareFranchiseStore(activeStore, enrichedMenuItems.length)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs transition-all"
            title="แชร์ร้านนี้ไปยัง LINE"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">แชร์ LINE</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddMenuModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>แอดเมนูเข้าร้าน</span>
          </button>
          <button
            type="button"
            onClick={() => printFranchiseStoreReport(activeStore, enrichedMenuItems)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs transition-all ${theme.btn}`}
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">ปริ้นท์ป้ายเมนู & SOP</span>
            <span className="sm:hidden">ปริ้นท์</span>
          </button>
        </div>
      </div>

      {/* 🏪 STORE HERO BANNER (Print friendly) */}
      <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${theme.bg} text-white p-4 sm:p-6 md:p-8 shadow-xl border print:hidden`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${theme.pill}`}>
              <Store className="w-3.5 h-3.5" />
              <span>สาขาแฟรนไชส์จำลอง · เมนูบอร์ดพร้อมจำหน่าย</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{activeStore.name}</span>
              <span className={`text-base font-normal ${theme.accent}`}>({activeStore.branch})</span>
            </h1>
            <p className="text-slate-300 text-sm italic">
              "{activeStore.brandTagline}"
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeStore.openingHours || '10:00 - 21:30 น.'}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeStore.contactNumber || '-'}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                🥤 ทั้งหมด <strong>{enrichedMenuItems.length}</strong> เมนูบนป้าย
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {/* Like button */}
            <button
              type="button"
              onClick={() => void toggleLikeFranchiseStore(activeStore.id)}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-md transition-all ${
                isLikedStore
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLikedStore ? 'fill-current' : ''}`} />
              <span>{(activeStore.likedBy || []).length} ไลก์</span>
            </button>

            {/* Edit button */}
            <button
              type="button"
              onClick={() => {
                setEditingStore(activeStore);
                setIsStoreFormOpen(true);
              }}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-sm transition-all flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>แก้ไขร้าน</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🏷️ STORE MENU CATEGORIES MANAGER (เพิ่ม / กรองหมวดหมู่เมนูของร้าน) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-xs space-y-3 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600" />
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white">
              หมวดหมู่เมนูของร้านนี้ (Store Menu Categories)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsAddingCategory(!isAddingCategory)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAddingCategory ? 'ปิด' : 'เพิ่มหมวดหมู่ใหม่'}</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setStoreCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
              storeCategoryFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ทั้งหมด ({enrichedMenuItems.length})
          </button>
          {(activeStore.menuCategories || []).map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStoreCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                storeCategoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add Category Form Box */}
        {isAddingCategory && (
          <div className="pt-2 flex items-center gap-2 animate-in fade-in">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="ระบุชื่อหมวดหมู่ใหม่ เช่น ชาผลไม้ชีสโฟม, ซิกเนเจอร์..."
              className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex-1"
            />
            <button
              type="button"
              onClick={handleAddCategoryToStore}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
            >
              บันทึกหมวดหมู่
            </button>
          </div>
        )}
      </div>

      {/* 📋 DIGITAL MENU BOARD SIMULATOR (แสดงผลแถวละ 2 รายการบนมือถือ สัดส่วน Fit คงที่) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-4 sm:p-6 md:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              DIGITAL MENU BOARD SIMULATOR
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 mt-0.5">
              <span>กระดานป้ายเมนูหน้าร้าน: {activeStore.name}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              แตะที่แก้วเครื่องดื่มเพื่อดู <strong>คู่มือสูตรชงด่วนหน้าร้าน (Quick SOP)</strong> สำหรับบาริสต้า
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Droplet className="w-3.5 h-3.5 text-indigo-500" /> หวาน 0% / 50% / 100%
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> ผ่านการเคาะสูตร R&D
            </span>
          </div>
        </div>

        {/* 🥤 DRINKS SECTION */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
            <Coffee className="w-4 h-4 text-indigo-600" />
            <span>รายการเครื่องดื่ม (Handcrafted Beverages)</span>
            <span className="text-xs text-slate-400 font-normal">({drinksList.length} รายการ)</span>
          </div>

          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
            {drinksList.map(({ menuItem, labItem }) => {
              const badgeStyle = {
                'Best Seller': 'bg-amber-500 text-white',
                'Signature': 'bg-purple-600 text-white',
                'Must Try': 'bg-pink-600 text-white',
                'New': 'bg-emerald-500 text-white',
                'Seasonal': 'bg-sky-500 text-white',
                'None': 'hidden',
              }[menuItem.badge || 'None'];

              return (
                <div key={menuItem.id} className="break-inside-avoid mb-3 sm:mb-4">
                  <div
                    onClick={() => setSelectedQuickSopItem({ menuItem, labItem })}
                    className="group relative rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-2.5 sm:p-3 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 print:border-slate-300 print:bg-white"
                  >
                    <div>
                      {/* Product Image (Fit container) */}
                      <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center">
                        <img
                          src={labItem.photoUrl}
                          alt={menuItem.customName || labItem.name}
                          className="w-full h-auto max-h-56 object-contain group-hover:scale-102 transition-transform duration-200"
                        />
                        {menuItem.badge && menuItem.badge !== 'None' && (
                          <div
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md font-extrabold text-[10px] shadow-sm uppercase tracking-wider ${badgeStyle}`}
                          >
                            {menuItem.badge}
                          </div>
                        )}
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px] font-bold backdrop-blur-xs">
                          {labItem.code}
                        </span>
                      </div>

                      {/* Item Details */}
                      <div className="pt-2.5 pb-1 space-y-1">
                        <div className="flex items-start justify-between gap-1.5">
                          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">
                            {menuItem.customName || labItem.name}
                          </h3>
                          <div className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400 shrink-0">
                            ฿{menuItem.retailPriceThb}
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                          {labItem.nameEn}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Droplet className="w-3 h-3 text-indigo-500" /> หวาน 0/50/100
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline">
                        สูตรชง SOP →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🍮 TOPPINGS SECTION */}
        {toppingsList.length > 0 && (
          <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>ท็อปปิ้ง & มิกซ์อิน (Specialty Toppings)</span>
              <span className="text-xs text-slate-400 font-normal">({toppingsList.length} รายการ)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {toppingsList.map(({ menuItem, labItem }) => (
                <div
                  key={menuItem.id}
                  onClick={() => setSelectedQuickSopItem({ menuItem, labItem })}
                  className="rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 p-2.5 sm:p-3 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={labItem.photoUrl}
                      alt={menuItem.customName || labItem.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-amber-300 dark:border-amber-700"
                    />
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {menuItem.customName || labItem.name}
                      </h4>
                      <div className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">
                        +฿{menuItem.retailPriceThb}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 💬 STORE SOCIAL & COLLABORATION (การมีส่วนร่วม & คอมเมนต์ติชมร้านค้า) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-4 sm:p-6 space-y-4 print:hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>สมุดโต้ตอบ & ข้อเสนอแนะประจำสาขา {activeStore.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              แลกเปลี่ยนความคิดเห็นเรื่องยอดขายหน้าร้าน ผลตอบรับจากลูกค้า และความเห็นเรื่องรสชาติ
            </p>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-2.5">
          {((activeStore.revisionCycles?.[0]?.comments) || []).map((comm) => {
            const hasLikedComm = (comm.likes || []).includes(currentUser.id);
            return (
              <div
                key={comm.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={comm.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={comm.authorName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <strong className="text-slate-800 dark:text-white">{comm.authorName}</strong>
                    {comm.sweetnessTarget && comm.sweetnessTarget !== 'all' && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                        เน้นหวาน {comm.sweetnessTarget}%
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => void toggleLikeFranchiseStoreComment(activeStore.id, comm.id)}
                    className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg transition-colors ${
                      hasLikedComm ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{(comm.likes || []).length}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
                  "{comm.content}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Comment Input Form */}
        <form onSubmit={handlePostStoreComment} className="pt-2 flex flex-col sm:flex-row gap-2">
          <select
            value={storeSweetnessTarget}
            onChange={(e) => setStoreSweetnessTarget(e.target.value as any)}
            className="text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
          >
            <option value="all">ความเห็นภาพรวมร้าน</option>
            <option value="0">เจาะจง: หวาน 0%</option>
            <option value="50">เจาะจง: หวาน 50%</option>
            <option value="100">เจาะจง: หวาน 100%</option>
          </select>
          <input
            type="text"
            value={storeCommentText}
            onChange={(e) => setStoreCommentText(e.target.value)}
            placeholder={`เขียนความคิดเห็น หรือฟีดแบ็กสำหรับร้าน ${activeStore.name}...`}
            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ส่งความเห็น</span>
          </button>
        </form>
      </div>

      {/* 🍵 QUICK SOP MODAL FOR BARISTAS */}
      {selectedQuickSopItem && (
        <QuickSopModal
          item={selectedQuickSopItem}
          onClose={() => setSelectedQuickSopItem(null)}
        />
      )}

      {/* ➕ ADD MENU ITEM MODAL */}
      {isAddMenuModalOpen && (
        <AddMenuItemModal
          store={activeStore}
          leadLabItems={leadLabItems}
          onClose={() => setIsAddMenuModalOpen(false)}
          onSave={async (newMenuItem) => {
            const nextMenuItems = [...activeStore.menuItems, newMenuItem];
            await saveFranchiseStore({
              ...activeStore,
              menuItems: nextMenuItems,
            });
            setIsAddMenuModalOpen(false);
          }}
        />
      )}

      {/* ➕ EDIT STORE MODAL */}
      {isStoreFormOpen && (
        <StoreFormModal
          store={editingStore}
          currentUser={currentUser}
          onClose={() => {
            setIsStoreFormOpen(false);
            setEditingStore(null);
          }}
          onSave={async (storeData) => {
            await saveFranchiseStore(storeData);
            setIsStoreFormOpen(false);
            setEditingStore(null);
          }}
        />
      )}
    </div>
  );
}

// =========================================================================
// 🏪 STORE FORM MODAL (เพิ่ม / แก้ไขร้านแฟรนไชส์ พร้อมรูปโลโก้ 1 รูปหลัก)
// =========================================================================
function StoreFormModal({
  store,
  currentUser,
  onClose,
  onSave,
}: {
  store: FranchiseStore | null;
  currentUser: any;
  onClose: () => void;
  onSave: (storeData: Partial<FranchiseStore>) => Promise<void>;
}) {
  const [name, setName] = useState(store?.name || '');
  const [branch, setBranch] = useState(store?.branch || '');
  const [brandTagline, setBrandTagline] = useState(store?.brandTagline || '');
  const [openingHours, setOpeningHours] = useState(store?.openingHours || '10:00 - 21:30 น. (เปิดทุกวัน)');
  const [contactNumber, setContactNumber] = useState(store?.contactNumber || '02-123-4567');
  const [themeColor, setThemeColor] = useState(store?.themeColor || 'emerald');

  // Primary 1-image picker (Upload vs URL)
  const [photoMode, setPhotoMode] = useState<'upload' | 'url'>('upload');
  const [logoUrl, setLogoUrl] = useState(
    store?.logoUrl ||
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'
  );
  const [isCompressing, setIsCompressing] = useState(false);
  const [categoriesInput, setCategoriesInput] = useState(
    (store?.menuCategories || ['ชานมพรีเมียม & ชาสด', 'ชาผลไม้ & ชีสโฟม', 'ท็อปปิ้งซิกเนเจอร์']).join(', ')
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressing(true);
      const compressed = await compressImageFile(file, 960, 0.75);
      setLogoUrl(compressed);
    } catch (err: any) {
      alert(err.message || 'ไม่สามารถอัปโหลดรูปภาพได้');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('กรุณาระบุชื่อร้านแฟรนไชส์');
      return;
    }
    setIsSubmitting(true);
    const parsedCats = categoriesInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    await onSave({
      id: store?.id || `store-${crypto.randomUUID()}`,
      name: name.trim(),
      branch: branch.trim() || 'สาขาหลัก',
      brandTagline: brandTagline.trim(),
      logoUrl: logoUrl.trim(),
      contactNumber: contactNumber.trim(),
      openingHours: openingHours.trim(),
      themeColor,
      menuCategories: parsedCats,
      menuItems: store?.menuItems || [],
      revisionCycles: store?.revisionCycles || [
        {
          cycleNumber: 1,
          title: `รอบเปิดตัวร้าน ${name.trim()} และบอร์ดเมนู`,
          status: 'active',
          createdAt: new Date().toISOString(),
          createdBy: currentUser.alias || currentUser.name,
          comments: [],
        },
      ],
      likedBy: store?.likedBy || [currentUser.id],
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-white">
              {store ? `แก้ไขข้อมูลร้าน ${store.name}` : 'เพิ่มร้านแฟรนไชส์ใหม่ 🏪'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ชื่อแบรนด์ร้านค้า *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น VITCHA, VITCHAMINZAAR..."
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">สาขา</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="เช่น สาขา Siam Square One (Flagship)"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">สโลแกนประจำแบรนด์ (Tagline)</label>
            <input
              type="text"
              value={brandTagline}
              onChange={(e) => setBrandTagline(e.target.value)}
              placeholder="เช่น ชานมสดและชาพรีเมียมของคนที่จะเป็นหัวแถว"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 italic"
            />
          </div>

          {/* 🖼️ STORE COVER / LOGO PHOTO (1 PHOTO WITH URL VS UPLOAD) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                <span>ภาพโลโก้ / ปกร้านค้าหลัก (1 ภาพ มีผลต่อการแสดงผลหน้าร้าน)</span>
              </label>
              <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setPhotoMode('upload')}
                  className={`px-2.5 py-1 transition-colors ${
                    photoMode === 'upload' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  📷 อัปโหลดรูป
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoMode('url')}
                  className={`px-2.5 py-1 transition-colors ${
                    photoMode === 'url' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  🌐 ลิงก์ URL
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 border border-slate-300 dark:border-slate-600 relative">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Store className="w-5 h-5" />
                  </div>
                )}
                {isCompressing && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[9px] text-white font-bold">
                    ประมวลผล...
                  </div>
                )}
              </div>

              <div className="flex-1">
                {photoMode === 'upload' ? (
                  <div>
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 cursor-pointer font-bold text-slate-700 dark:text-slate-200 shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-emerald-600" />
                      <span>เลือกภาพโลโก้จากเครื่อง / กล้อง</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 mt-1">บีบอัดภาพอัตโนมัติ รวดเร็ว</p>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">เวลาทำการ</label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="10:00 - 21:30 น. (เปิดทุกวัน)"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">เบอร์ติดต่อสาขา</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="02-123-4567"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">โทนสีแบรนด์ประจำร้าน</label>
              <select
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              >
                <option value="emerald">🟢 เขียวมรกต (Emerald Green - สไตล์ชาสด VITCHA)</option>
                <option value="cyan">🔵 ฟ้าสดใส (Cyan Blue - สไตล์คราฟต์โซดา ZAAR)</option>
                <option value="amber">🟠 ส้มชาไทย (Amber Orange)</option>
                <option value="purple">🟣 ม่วงสเปเชียลตี้ (Royal Purple)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">หมวดหมู่เมนู (คั่นด้วยจุลภาค)</label>
              <input
                type="text"
                value={categoriesInput}
                onChange={(e) => setCategoriesInput(e.target.value)}
                placeholder="ชานมพรีเมียม, คราฟต์โซดา, ท็อปปิ้ง"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20"
            >
              {isSubmitting ? 'กำลังบันทึก...' : store ? 'บันทึกการแก้ไข' : 'สร้างร้านแฟรนไชส์'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =========================================================================
// ➕ ADD MENU ITEM MODAL (แอดเมนูจาก LEAD LAB เข้าร้าน พร้อมหมวดหมู่)
// =========================================================================
function AddMenuItemModal({
  store,
  leadLabItems,
  onClose,
  onSave,
}: {
  store: FranchiseStore;
  leadLabItems: LabItem[];
  onClose: () => void;
  onSave: (item: StoreMenuItem) => Promise<void>;
}) {
  const [selectedLabItemId, setSelectedLabItemId] = useState(
    leadLabItems.filter((x) => x.status === 'approved')[0]?.id || leadLabItems[0]?.id || ''
  );
  const [customName, setCustomName] = useState('');
  const [retailPrice, setRetailPrice] = useState('55');
  const [badge, setBadge] = useState<any>('None');
  const [category, setCategory] = useState(store.menuCategories?.[0] || 'ชานมพรีเมียม & ชาสด');

  const selectedLabItem = useMemo(() => {
    return leadLabItems.find((x) => x.id === selectedLabItemId);
  }, [leadLabItems, selectedLabItemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLabItemId) return;
    await onSave({
      id: `menu-${Date.now()}`,
      labItemId: selectedLabItemId,
      category,
      customName: customName.trim() || undefined,
      retailPriceThb: parseFloat(retailPrice) || 55,
      badge: badge === 'None' ? undefined : badge,
      displayOrder: store.menuItems.length + 1,
      isAvailable: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up text-xs">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">
            แอดเมนูจาก LEAD LAB เข้าร้าน {store.name}
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              เลือกสูตรที่พัฒนาแล้วใน LEAD LAB:
            </label>
            <select
              value={selectedLabItemId}
              onChange={(e) => {
                setSelectedLabItemId(e.target.value);
                const found = leadLabItems.find((x) => x.id === e.target.value);
                if (found) {
                  setRetailPrice(String(found.suggestedPriceThb));
                }
              }}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
            >
              {leadLabItems.map((item) => (
                <option key={item.id} value={item.id}>
                  [{item.code}] {item.name} ({item.status === 'approved' ? 'อนุมัติแล้ว' : item.status})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              จัดเข้าหมวดหมู่เมนูของร้าน:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
            >
              {(store.menuCategories || ['ชานมพรีเมียม & ชาสด', 'ชาผลไม้ & ชีสโฟม', 'ท็อปปิ้งซิกเนเจอร์']).map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ชื่อแสดงบนป้ายเมนู (เว้นว่างเพื่อใช้ชื่อเดิม):
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={selectedLabItem?.name || ''}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ราคาขายหน้าร้าน (฿):
              </label>
              <input
                type="number"
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-indigo-600 text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ป้ายแท็กติดแก้ว:
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                <option value="None">ไม่มีแท็ก</option>
                <option value="Best Seller">Best Seller (ขายดีอันดับ 1)</option>
                <option value="Signature">Signature (เอกลักษณ์)</option>
                <option value="Must Try">Must Try (ต้องลอง)</option>
                <option value="New">New (เมนูใหม่)</option>
                <option value="Seasonal">Seasonal (ตามฤดูกาล)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
            >
              แอดเมนูเข้าร้าน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =========================================================================
// 🍵 QUICK SOP MODAL FOR BARISTAS
// =========================================================================
function QuickSopModal({
  item,
  onClose,
}: {
  item: { menuItem: StoreMenuItem; labItem: LabItem };
  onClose: () => void;
}) {
  const { labItem, menuItem } = item;
  const [activeLevel, setActiveLevel] = useState<'zero' | 'half' | 'full'>('half');

  const currentLevelData = labItem.sweetnessLevels[activeLevel];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={labItem.photoUrl}
              alt={labItem.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono text-[10px] font-bold">
                  {labItem.code}
                </span>
                <span className="text-[11px] font-bold text-slate-400">BARISTA QUICK SOP</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                {menuItem.customName || labItem.name}
              </h3>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sweetness Selector Tabs */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            เลือกระดับความหวานของออเดอร์:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'zero', label: 'หวาน 0%', sub: 'ไม่หวาน' },
              { key: 'half', label: 'หวาน 50% ⭐', sub: 'หวานน้อยแนะนำ' },
              { key: 'full', label: 'หวาน 100%', sub: 'หวานปกติ' },
            ].map((lvl) => (
              <button
                key={lvl.key}
                type="button"
                onClick={() => setActiveLevel(lvl.key as any)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  activeLevel === lvl.key
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-102'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="font-extrabold text-xs">{lvl.label}</div>
                <div className="text-[9px] opacity-80">{lvl.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active SOP Details */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              <span className="text-slate-400 text-[10px] block font-medium">ปริมาณไซรัป/น้ำเชื่อม</span>
              <strong className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {currentLevelData.syrupMl} ml
              </strong>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">{currentLevelData.sweetenerType}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              <span className="text-slate-400 text-[10px] block font-medium">ค่า Brix มาตรฐาน</span>
              <strong className="text-base font-black text-amber-600 dark:text-amber-400 font-mono">
                {currentLevelData.brix} °Bx
              </strong>
              <div className="text-[10px] text-slate-500 mt-0.5">พลังงาน: {currentLevelData.caloriesKcal} kcal</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">
              สัดส่วนของเหลวหลักหน้าบาร์:
            </span>
            <div className="font-mono text-slate-700 dark:text-slate-200">
              น้ำชาสกัด: <strong>{currentLevelData.baseLiquidMl} ml</strong>
              {currentLevelData.milkOrMixerMl ? ` + นมสด/มิกเซอร์: ${currentLevelData.milkOrMixerMl} ml` : ''}
            </div>
            <div className="text-[11px] text-slate-500 italic pt-1">
              "{currentLevelData.tasteNotes}"
            </div>
          </div>
        </div>

        {/* Technical tips */}
        {labItem.technicalSpecs && (
          <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
            <span>🌡️ อุณหภูมิสกัด: {labItem.technicalSpecs.brewingTempC || 90}°C</span>
            <span>⏱️ เวลาสกัด: {labItem.technicalSpecs.extractionTimeSec || 180}s</span>
            <span>🧊 อายุชา: {labItem.technicalSpecs.shelfLifeHours || 6} ชม.</span>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          เข้าใจสูตรแล้ว (ปิดหน้าต่าง)
        </button>
      </div>
    </div>
  );
}
