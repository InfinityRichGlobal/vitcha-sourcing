import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  Tag,
  Volume2,
  Mic,
  Square,
  Loader2,
  Paperclip,
  Image as ImageIcon,
  Video,
  Check,
  Edit3,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FranchiseStore, StoreMenuItem, LabItem, VoiceNoteEntry } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { printFranchiseStoreReport, shareFranchiseStore, printLeadLabSpecReport, shareLeadLabItem } from '../utils/labAndStoreExport';
import { uploadMediaToServer } from '../services/api';
import { saveVideoFile } from '../utils/mediaStorage';
import { AudioRecorder } from './AudioRecorder';
import { VideoPlayer } from './VideoPlayer';
import { StorePhotoGallery } from './StorePhotoGallery';

export function FranchiseStoreView({
  initialStoreId,
  onNavigateToLab,
}: {
  initialStoreId?: string | null;
  onNavigateToLab?: () => void;
}) {
  const {
    franchiseStores,
    leadLabItems,
    currentUser,
    users,
    saveFranchiseStore,
    deleteFranchiseStore,
    toggleLikeFranchiseStore,
    addFranchiseStoreComment,
    toggleLikeFranchiseStoreComment,
    recordFranchiseStoreView,
    recordLeadLabItemView,
    toggleLikeLeadLabItem,
    addLeadLabComment,
    toggleLikeLeadLabComment,
  } = useApp();

  // Navigation mode: null = Franchise Hub (Directory), string = Specific Store Detail
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // Synchronize deep-linked initialStoreId
  useEffect(() => {
    if (initialStoreId) {
      setSelectedStoreId(initialStoreId);
    }
  }, [initialStoreId]);

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
  const [storeCommentPhotoUrl, setStoreCommentPhotoUrl] = useState<string | null>(null);
  const [storeCommentVoiceUrl, setStoreCommentVoiceUrl] = useState<string | null>(null);
  const [storeCommentVoiceDuration, setStoreCommentVoiceDuration] = useState<number | undefined>(undefined);
  const [isUploadingStoreAttachment, setIsUploadingStoreAttachment] = useState(false);
  const storePhotoInputRef = useRef<HTMLInputElement | null>(null);

  // Live voice recording for store discussion
  const [isRecordingStore, setIsRecordingStore] = useState(false);
  const [recordingStoreSeconds, setRecordingStoreSeconds] = useState(0);
  const storeMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const storeStreamRef = useRef<MediaStream | null>(null);
  const storeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const storeRecordingStartRef = useRef<number>(0);

  const activeStore = useMemo(() => {
    if (!selectedStoreId) return null;
    return franchiseStores.find((s) => s.id === selectedStoreId) || null;
  }, [franchiseStores, selectedStoreId]);

  // Synchronize selected Quick SOP item with latest leadLabItems
  const synchronizedQuickSopItem = useMemo(() => {
    if (!selectedQuickSopItem) return null;
    const latestLabItem = leadLabItems.find((x) => x.id === selectedQuickSopItem.labItem.id);
    return {
      menuItem: selectedQuickSopItem.menuItem,
      labItem: latestLabItem || selectedQuickSopItem.labItem,
    };
  }, [leadLabItems, selectedQuickSopItem]);

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
    if (/^#[0-9a-f]{6}$/i.test(color || '')) return {
      bg: 'from-[var(--brand-color)] to-slate-950 border-white/20',
      accent: 'text-white', pill: 'bg-black/30 text-white border-white/30',
      btn: 'bg-[var(--brand-color)] text-white', border: 'border-white/30', badge: 'bg-slate-100 text-slate-800'
    };

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
      case 'rose':
        return {
          bg: 'from-rose-950 via-slate-900 to-pink-950 border-rose-800/40',
          accent: 'text-rose-400',
          pill: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
          btn: 'bg-rose-600 hover:bg-rose-500 text-white',
          border: 'border-rose-500/30',
          badge: 'bg-rose-100 text-rose-800 border-rose-300'
        };
      case 'indigo':
        return {
          bg: 'from-indigo-950 via-slate-900 to-blue-950 border-indigo-800/40',
          accent: 'text-indigo-400',
          pill: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
          btn: 'bg-indigo-600 hover:bg-indigo-500 text-white',
          border: 'border-indigo-500/30',
          badge: 'bg-indigo-100 text-indigo-800 border-indigo-300'
        };
      case 'slate':
        return {
          bg: 'from-slate-950 via-zinc-900 to-neutral-950 border-slate-700/40',
          accent: 'text-slate-300',
          pill: 'bg-slate-700/40 text-slate-200 border-slate-600/40',
          btn: 'bg-slate-800 hover:bg-slate-700 text-white',
          border: 'border-slate-600/40',
          badge: 'bg-slate-200 text-slate-800 border-slate-400'
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

  const handleUploadStorePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeStore) return;
    try {
      setIsUploadingStoreAttachment(true);
      const url = await uploadMediaToServer(file, {
        recordId: activeStore.id,
        recordType: 'franchise_store',
        recordTitle: activeStore.name,
      });
      setStoreCommentPhotoUrl(url);
    } catch (err: any) {
      alert(err.message || 'อัปโหลดรูปภาพไม่สำเร็จ');
    } finally {
      setIsUploadingStoreAttachment(false);
    }
  };

  const toggleLiveVoiceRecordingStore = async () => {
    if (isRecordingStore) {
      if (storeTimerRef.current) {
        clearInterval(storeTimerRef.current);
        storeTimerRef.current = null;
      }
      if (storeMediaRecorderRef.current && storeMediaRecorderRef.current.state === 'recording') {
        storeMediaRecorderRef.current.stop();
      }
      return;
    }

    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        alert('เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด หรือไม่ได้เปิดผ่าน HTTPS');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      storeStreamRef.current = stream;
      const mime = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'].find((t) =>
        MediaRecorder.isTypeSupported(t)
      );
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      storeMediaRecorderRef.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        if (storeTimerRef.current) {
          clearInterval(storeTimerRef.current);
          storeTimerRef.current = null;
        }
        stream.getTracks().forEach((t) => t.stop());
        storeStreamRef.current = null;
        setIsRecordingStore(false);

        const duration = Math.round((Date.now() - storeRecordingStartRef.current) / 1000);
        setStoreCommentVoiceDuration(duration);

        const type = recorder.mimeType?.split(';')[0] || 'audio/webm';
        const blob = new Blob(chunks, { type });
        if (!blob.size) return;
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        const file = new File([blob], `เสียงหน้าร้าน-${Date.now()}.${ext}`, { type });

        try {
          setIsUploadingStoreAttachment(true);
          const url = await uploadMediaToServer(file, {
            recordId: activeStore?.id || 'store',
            recordType: 'franchise_store',
            recordTitle: activeStore?.name || 'Store Comment',
          });
          setStoreCommentVoiceUrl(url);
        } catch (err: any) {
          alert(err.message || 'อัปโหลดเสียงไม่สำเร็จ');
        } finally {
          setIsUploadingStoreAttachment(false);
        }
      };

      recorder.onerror = () => {
        if (storeTimerRef.current) clearInterval(storeTimerRef.current);
        stream.getTracks().forEach((t) => t.stop());
        setIsRecordingStore(false);
        alert('การอัดเสียงขัดข้อง กรุณาลองใหม่');
      };

      storeRecordingStartRef.current = Date.now();
      setRecordingStoreSeconds(0);
      setIsRecordingStore(true);
      recorder.start(250);
      storeTimerRef.current = setInterval(() => {
        setRecordingStoreSeconds(Math.round((Date.now() - storeRecordingStartRef.current) / 1000));
      }, 1000);
    } catch {
      storeStreamRef.current?.getTracks().forEach((t) => t.stop());
      setIsRecordingStore(false);
      alert('ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนในเบราว์เซอร์');
    }
  };

  const handlePostStoreComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStore) return;
    const text = storeCommentText.trim();
    if (!text && !storeCommentPhotoUrl && !storeCommentVoiceUrl) return;

    if (!await addFranchiseStoreComment(activeStore.id, text, storeSweetnessTarget, {
      photoUrl: storeCommentPhotoUrl || undefined,
      voiceUrl: storeCommentVoiceUrl || undefined,
      duration: storeCommentVoiceDuration,
    })) return;

    setStoreCommentText('');
    setStoreCommentPhotoUrl(null);
    setStoreCommentVoiceUrl(null);
    setStoreCommentVoiceDuration(undefined);
  };

  const handleAddCategoryToStore = async () => {
    if (!activeStore || !newCategoryName.trim()) return;
    const existing = activeStore.menuCategories || [];
    if (existing.includes(newCategoryName.trim())) return;
    const nextCats = [...existing, newCategoryName.trim()];
    if (!await saveFranchiseStore({
      ...activeStore,
      menuCategories: nextCats,
    })) return;
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  const handleDeleteStore = async (store: FranchiseStore) => {
    if (window.confirm(`ยืนยันการลบร้าน "${store.name}" ออกจากระบบหรือไม่?`)) {
      if (!await deleteFranchiseStore(store.id)) return;
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
        <div data-testid="brand-directory-intro" className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-5 sm:p-7 md:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Store className="w-3.5 h-3.5" />
                <span>ข้อมูลแบรนด์และหน้าร้าน</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span>แบรนด์และหน้าร้าน</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                เลือกดูข้อมูลแบรนด์ หน้าร้าน เมนู และสื่อประกอบ หรือเพิ่มข้อมูลเพื่อจัดการร่วมกันในทีม
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 font-bold text-slate-200">
                  <Store className="w-4 h-4 text-emerald-400" />
                  <span>{totalStores} แบรนด์</span>
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-200">
                  <Coffee className="w-4 h-4 text-indigo-400" />
                  <span>{totalActiveMenus} เมนูบนบอร์ด</span>
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
                <span>เพิ่มแบรนด์ / หน้าร้าน</span>
              </button>
            </div>
          </div>
        </div>

        {/* 🗂️ STORE CARDS MASONRY (แสดงผลรูปโลโก้ fit ตามขนาดจริง: Masonry Layout) */}
        <div>
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>แบรนด์ทั้งหมด ({franchiseStores.length} แบรนด์)</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-start">
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
                  className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden group flex flex-col"
                >
                  <div>
                    {/* Brand Cover Photo (Natural Size Fit - full proportion like R&D Lead Lab) */}
                    <div
                      className="relative w-full bg-slate-100 dark:bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center min-h-[110px]"
                      onClick={() => setSelectedStoreId(store.id)}
                    >
                      <img
                        src={store.logoUrl || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'}
                        alt={store.name}
                        className="w-full h-auto object-contain block group-hover:scale-102 transition-transform duration-300"
                        loading="lazy"
                      />
                      {store.isMock && <span className="absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold bg-white text-slate-700">Mockup</span>}

                      {/* Like button on cover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          void toggleLikeFranchiseStore(store.id);
                        }}
                        className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md backdrop-blur-sm flex items-center gap-1 transition-transform active:scale-90 z-10 ${
                          isLiked
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/90 text-slate-800 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{(store.likedBy || []).length}</span>
                      </button>

                    </div>
                    <div className="px-3 pt-3 text-slate-900 dark:text-white">
                      <h3 className="text-sm sm:text-base font-black break-words">{store.name}</h3>
                      {store.brandTagline && <p className="text-xs text-slate-500 mt-1">{store.brandTagline}</p>}
                    </div>

                    {/* Card Body Info */}
                    <div className="p-2.5 sm:p-3.5 space-y-2 text-xs">
                      {/* Branch & Hours */}
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-[11px] sm:text-xs truncate">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          <span className="truncate">{store.recordKind === 'brand' ? store.sharedConcept : store.branch}</span>
                        </div>
                        {store.openingHours && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 truncate">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{store.openingHours}</span>
                          </div>
                        )}
                      </div>

                      {/* Menu statistics & categories preview */}
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] sm:text-[11px]">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                            ป้ายเมนู
                          </span>
                          <span className="font-extrabold text-slate-800 dark:text-white">
                            {store.menuItems?.length || 0} รายการ
                          </span>
                        </div>
                        <div className="text-right text-slate-500 font-medium">
                          <div>🥤 {storeDrinks} น้ำ</div>
                          <div>🍮 {storeToppings} ท็อปปิ้ง</div>
                        </div>
                      </div>

                      {/* Categories pills */}
                      {store.menuCategories && store.menuCategories.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {store.menuCategories.slice(0, 2).map((cat, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] font-medium truncate max-w-[90px]"
                            >
                              {cat}
                            </span>
                          ))}
                          {store.menuCategories.length > 2 && (
                            <span className="px-1 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 text-[9px]">
                              +{store.menuCategories.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Social & Collaboration footer on card */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5">
                            <MessageSquare className="w-3 h-3 text-indigo-500" />
                            <span>{storeCommentsCount}</span>
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Eye className="w-3 h-3 text-slate-400" />
                            <span>{(store.viewLogs || []).length}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => void shareFranchiseStore(store, store.menuItems?.length || 0)}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 transition-colors"
                            title="แชร์ร้านนี้"
                          >
                            <Share2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStore(store);
                              setIsStoreFormOpen(true);
                            }}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors"
                            title="แก้ไขข้อมูลร้าน"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDeleteStore(store)}
                            className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 transition-colors"
                            title="ลบร้านนี้"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Enter Store Action Button */}
                  <div className="p-2.5 sm:p-3 pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedStoreId(store.id)}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all group-hover:shadow-xs"
                    >
                      <Store className="w-3.5 h-3.5 text-emerald-400" />
                      <span>เข้าร้าน (ป้ายเมนู & SOP)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
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
              if (!await saveFranchiseStore(storeData)) return;
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
          <span>หน้ารวมแบรนด์</span>
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
            style={/^#[0-9a-f]{6}$/i.test(activeStore.themeColor || '') ? {backgroundColor: activeStore.themeColor, color: '#fff'} : undefined} className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs transition-all ${theme.btn}`}
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">ปริ้นท์ป้ายเมนู & SOP</span>
            <span className="sm:hidden">ปริ้นท์</span>
          </button>
        </div>
      </div>

      {/* 🏪 STORE HERO BANNER (Print friendly) */}
      <div style={/^#[0-9a-f]{6}$/i.test(activeStore.themeColor || '') ? {'--brand-color': activeStore.themeColor} as React.CSSProperties : undefined} className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${theme.bg} text-white p-4 sm:p-6 md:p-8 shadow-xl border print:hidden`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            {activeStore.logoUrl && <img src={activeStore.logoUrl} alt={activeStore.name} className="h-24 w-24 rounded-2xl bg-white object-contain" />}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${theme.pill}`}>
              <Store className="w-3.5 h-3.5" />
              <span>ข้อมูลแบรนด์ · เมนูและสูตร</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{activeStore.name}</span>
              {activeStore.branch && <span className={`text-base font-normal ${theme.accent}`}>({activeStore.branch})</span>}
            </h1>
            <p className="text-slate-300 text-sm italic">
              {activeStore.brandTagline}
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
            {/* Like button with avatars */}
            <div className="flex items-center gap-1.5">
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
              {activeStore.likedBy && activeStore.likedBy.length > 0 && (
                <div className="flex -space-x-1.5 overflow-hidden">
                  {activeStore.likedBy.slice(0, 4).map((uid, uIdx) => {
                    const u = users.find((x) => x.id === uid);
                    return (
                      <img
                        key={uIdx}
                        src={u?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt={u?.name || uid}
                        title={u?.name || uid}
                        className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover"
                      />
                    );
                  })}
                </div>
              )}
            </div>

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

      {activeStore.conceptDescription && <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
        <h2 className="mb-2 font-bold text-slate-950">{activeStore.sharedConcept} · หนึ่งคอนเซ็ปต์ สองแบรนด์</h2>
        <p>{activeStore.conceptDescription}</p>
      </section>}
      {!!activeStore.conceptMenu?.length && <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
        <h2 className="font-bold text-emerald-950">เมนูโซดาคอนเซ็ปต์ · รอทดลองสูตร</h2>
        <p className="mt-1 text-xs text-emerald-800">ราคาและรายละเอียดเป็น Mockup ยังไม่มีสูตรอนุมัติหรือ SOP</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">{activeStore.conceptMenu.map(menu => <article key={menu.name} className="rounded-xl border border-emerald-100 bg-white p-3"><h3 className="font-bold">{menu.name}</h3><p className="my-2 text-xs text-slate-600">{menu.description}</p><span className="font-bold text-emerald-700">฿{menu.priceThb} · ราคาจำลอง</span></article>)}</div>
      </section>}
      {/* 📸 STORE MULTIMEDIA (แกลเลอรีภาพสาขา · เสียงบรรยาย · วิดีโอ) */}
      {((activeStore.galleryPhotos && activeStore.galleryPhotos.length > 0) ||
        (activeStore.audioNotes && activeStore.audioNotes.length > 0) ||
        (activeStore.videos && activeStore.videos.length > 0)) && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3.5 print:hidden">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white">
              มัลติมีเดียและบรรยากาศหน้าร้าน (Store Atmosphere & Media)
            </span>
          </div>

          {activeStore.galleryPhotos && activeStore.galleryPhotos.length > 0 && (
            <StorePhotoGallery key={activeStore.id} photos={activeStore.galleryPhotos} />
          )}

          {activeStore.audioNotes && activeStore.audioNotes.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400">เสียงบรรยายหน้าร้าน ({activeStore.audioNotes.length})</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeStore.audioNotes.map((note) => (
                  <div key={note.id} className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-center gap-2.5">
                    <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 truncate">{note.title || 'เสียงบรรยายหน้าร้าน'}</div>
                      {note.url && <audio controls src={note.url} className="w-full h-7 mt-1" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStore.videos && activeStore.videos.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400">คลิปวิดีโอหน้าร้าน ({activeStore.videos.length})</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeStore.videos.map((vid, vIdx) => (
                  <VideoPlayer
                    key={vIdx}
                    src={vid}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs h-40"
                    badgeLabel={`คลิปหน้าร้าน #${vIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
              <CheckCircle2 className="w-3.5 h-3.5" /> {enrichedMenuItems.length > 0 && enrichedMenuItems.every(({ labItem }) => labItem.status === 'approved') ? 'สูตรที่อนุมัติแล้ว' : 'มีสูตรกำลังทดลอง · Mockup'}
            </span>
          </div>
        </div>

        {/* 🥤 DRINKS SECTION */}
        {drinksList.length > 0 && <div className="space-y-3.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
            <Coffee className="w-4 h-4 text-indigo-600" />
            <span>รายการเครื่องดื่ม (Handcrafted Beverages)</span>
            <span className="text-xs text-slate-400 font-normal">({drinksList.length} รายการ)</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                <div
                  key={menuItem.id}
                  onClick={() => setSelectedQuickSopItem({ menuItem, labItem })}
                  className="group relative rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-2.5 sm:p-3 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 print:border-slate-300 print:bg-white"
                >
                  <div>
                    {/* Product Image (Square Fit container, no awkward black background) */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                      <img
                        src={labItem.photoUrl}
                        alt={menuItem.customName || labItem.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
              );
            })}
          </div>
        </div>}

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
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2">
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
              <span>สมุดโต้ตอบ & ข้อเสนอแนะของแบรนด์ {activeStore.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              แลกเปลี่ยนความคิดเห็นเรื่องยอดขายหน้าร้าน ผลตอบรับจากลูกค้า และความเห็นเรื่องรสชาติ
            </p>
          </div>
        </div>

        {/* Comments List with Rich Media */}
        <div className="space-y-2.5">
          {((activeStore.revisionCycles || []).slice().reverse().flatMap(c => c.comments || [])).map((comm) => {
            const hasLikedComm = (comm.likes || []).includes(currentUser.id);
            return (
              <div
                key={comm.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2"
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

                {/* Attached Photo */}
                {comm.photoUrl && (
                  <div className="pl-7">
                    <a
                      href={comm.photoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs max-w-[200px] hover:opacity-90"
                    >
                      <img src={comm.photoUrl} alt="รูปแนบคอมเมนต์" className="w-full h-auto max-h-36 object-cover" />
                    </a>
                  </div>
                )}

                {/* Attached Voice Note Audio */}
                {comm.voiceUrl && (
                  <div className="pl-7 max-w-sm">
                    <div className="p-2 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <audio controls src={comm.voiceUrl} className="w-full h-7" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comment Input Form with Photo & Live Voice Recording */}
        <form onSubmit={handlePostStoreComment} className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <select
              value={storeSweetnessTarget}
              onChange={(e) => setStoreSweetnessTarget(e.target.value as any)}
              className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
            >
              <option value="all">ความเห็นภาพรวมร้าน</option>
              <option value="0">เจาะจง: หวาน 0%</option>
              <option value="50">เจาะจง: หวาน 50%</option>
              <option value="100">เจาะจง: หวาน 100%</option>
            </select>

            <div className="flex items-center gap-2">
              <input
                ref={storePhotoInputRef}
                type="file"
                accept="image/*"
                onChange={handleUploadStorePhoto}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => storePhotoInputRef.current?.click()}
                disabled={isUploadingStoreAttachment}
                className="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors inline-flex items-center gap-1"
                title="แนบรูปถ่ายประกอบความเห็นหน้าร้าน"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                <span>แนบรูป</span>
              </button>

              <button
                type="button"
                onClick={toggleLiveVoiceRecordingStore}
                className={`h-8 px-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                  isRecordingStore
                    ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-500/30'
                    : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}
                title={isRecordingStore ? 'กดเพื่อหยุดอัดและแนบเสียง' : 'กดเพื่อเริ่มอัดเสียงสด'}
              >
                {isRecordingStore ? (
                  <>
                    <Square className="w-3 h-3 fill-white" />
                    <span>หยุดอัด ({recordingStoreSeconds}s)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-emerald-600" />
                    <span>อัดเสียงสด</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Attachment Preview Chips */}
          {(storeCommentPhotoUrl || storeCommentVoiceUrl || isUploadingStoreAttachment) && (
            <div className="flex items-center gap-2 flex-wrap p-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              {isUploadingStoreAttachment && (
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>กำลังอัปโหลดไฟล์แนบ...</span>
                </div>
              )}

              {storeCommentPhotoUrl && (
                <div className="flex items-center gap-2 bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600">
                  <img src={storeCommentPhotoUrl} alt="" className="w-5 h-5 rounded object-cover" />
                  <span className="font-medium text-slate-700 dark:text-slate-200 text-[11px]">รูปถ่ายพร้อมแนบ</span>
                  <button
                    type="button"
                    onClick={() => setStoreCommentPhotoUrl(null)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {storeCommentVoiceUrl && (
                <div className="flex items-center gap-2 bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium text-slate-700 dark:text-slate-200 text-[11px]">
                    เสียงที่อัด ({storeCommentVoiceDuration || 0}s)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setStoreCommentVoiceUrl(null);
                      setStoreCommentVoiceDuration(undefined);
                    }}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={storeCommentText}
              onChange={(e) => setStoreCommentText(e.target.value)}
              placeholder={`เขียนความคิดเห็น หรือฟีดแบ็กสำหรับร้าน ${activeStore.name}...`}
              className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none"
            />
            <button
              type="submit"
              disabled={!storeCommentText.trim() && !storeCommentPhotoUrl && !storeCommentVoiceUrl}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ส่งความเห็น</span>
            </button>
          </div>
        </form>
      </div>

      {/* 🍵 QUICK SOP MODAL FOR BARISTAS */}
      {synchronizedQuickSopItem && (
        <QuickSopModal
          item={synchronizedQuickSopItem}
          currentUser={currentUser}
          users={users}
          onClose={() => setSelectedQuickSopItem(null)}
          onNavigateToLab={onNavigateToLab}
          onToggleLikeLabItem={toggleLikeLeadLabItem}
          onAddLabComment={addLeadLabComment}
          onToggleLabCommentLike={toggleLikeLeadLabComment}
          onRecordView={recordLeadLabItemView}
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
            if (!await saveFranchiseStore({
              ...activeStore,
              menuItems: nextMenuItems,
            })) return;
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
            if (!await saveFranchiseStore(storeData)) return;
            setIsStoreFormOpen(false);
            setEditingStore(null);
          }}
        />
      )}
    </div>
  );
}

// =========================================================================
// 🏪 STORE FORM MODAL (เพิ่ม / แก้ไขร้านแฟรนไชส์ พร้อมรูปโลโก้ 1 รูปหลัก + มัลติมีเดีย)
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
  const recordId = useRef(store?.id || `store-${crypto.randomUUID()}`);
  const [name, setName] = useState(store?.name || '');
  const [themeColor, setThemeColor] = useState(store?.themeColor || 'emerald');
  const [categoriesInput, setCategoriesInput] = useState(
    store?.menuCategories ? store.menuCategories.join(', ') : ''
  );

  // Primary 1-image picker (Upload vs URL) - Strictly empty by default for new stores
  const [photoMode, setPhotoMode] = useState<'upload' | 'url'>('upload');
  const [logoUrl, setLogoUrl] = useState(store?.logoUrl || '');
  const [isCompressing, setIsCompressing] = useState(false);

  // Optional store details - strictly empty by default
  const [branch, setBranch] = useState(store?.branch || '');
  const [brandTagline, setBrandTagline] = useState(store?.brandTagline || '');
  const [openingHours, setOpeningHours] = useState(store?.openingHours || '');
  const [contactNumber, setContactNumber] = useState(store?.contactNumber || '');

  const SUGGESTED_STORE_CATEGORIES = [
    'ชานมพรีเมียม & ชาสด',
    'วิตามินคราฟต์โซดา',
    'ชาสกัดเย็น 0-Cal',
    'สเปเชียลดริ้งก์',
    'ชาผลไม้ & ชีสโฟม',
    'ท็อปปิ้งซิกเนเจอร์',
    'กาแฟสด & โกโก้',
    'เบเกอรี่ & ของทานเล่น',
  ];

  const handleToggleCategoryChip = (catName: string) => {
    const currentList = categoriesInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    if (currentList.includes(catName)) {
      setCategoriesInput(currentList.filter((c) => c !== catName).join(', '));
    } else {
      setCategoriesInput([...currentList, catName].join(', '));
    }
  };

  // Unlimited Gallery & Audio/Video
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>(store?.galleryPhotos || []);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNoteEntry[]>(
    (store?.audioNotes || []).map((an) => ({
      id: an.id,
      url: an.url,
      durationSec: an.duration || 0,
    }))
  );
  const [videos, setVideos] = useState<string[]>(store?.videos || []);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const COLOR_PALETTES = [
    { id: 'emerald', label: 'เขียวมรกต', dot: 'bg-emerald-500', ring: 'ring-emerald-500' },
    { id: 'cyan', label: 'ฟ้าคราฟต์', dot: 'bg-cyan-500', ring: 'ring-cyan-500' },
    { id: 'amber', label: 'ส้มชาไทย', dot: 'bg-amber-500', ring: 'ring-amber-500' },
    { id: 'purple', label: 'ม่วงพรีเมียม', dot: 'bg-purple-500', ring: 'ring-purple-500' },
    { id: 'rose', label: 'ชมพูกุหลาบ', dot: 'bg-rose-500', ring: 'ring-rose-500' },
    { id: 'indigo', label: 'อินดิโก้', dot: 'bg-indigo-600', ring: 'ring-indigo-600' },
    { id: 'slate', label: 'ดำมินิมอล', dot: 'bg-slate-800', ring: 'ring-slate-800' },
  ];

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

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImageFile(files[i], 960, 0.75);
        setGalleryPhotos((prev) => [...prev, compressed]);
      } catch (err) {
        console.warn('Gallery compress fail:', err);
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsVideoLoading(true);
      for (const file of Array.from(files)) {
        const videoData = await saveVideoFile(file, {
          recordType: 'franchise_store_video',
          recordTitle: name || 'Store Video',
        });
        if (videoData) {
          setVideos((prev) => [...prev, videoData]);
        }
      }
    } catch (err: any) {
      alert(err.message || 'อัปโหลดคลิปไม่สำเร็จ');
    } finally {
      setIsVideoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strict validation
    if (!name.trim()) {
      alert('กรุณาระบุชื่อแบรนด์ร้านค้า *');
      return;
    }
    if (!themeColor.trim()) {
      alert('กรุณาเลือกโทนสีแบรนด์ประจำร้าน *');
      return;
    }
    if (!categoriesInput.trim()) {
      alert('กรุณาระบุหมวดหมู่เมนูของร้านนี้ *');
      return;
    }
    if (!logoUrl.trim()) {
      alert('กรุณาอัปโหลดหรือระบุภาพโลโก้ / ปกร้านค้าหลัก *');
      return;
    }

    setIsSubmitting(true);
    const parsedCats = categoriesInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const audioNotesFormatted = voiceNotes.map((vn, idx) => ({
      id: vn.id || `audio-${idx}-${crypto.randomUUID()}`,
      url: vn.url,
      duration: vn.durationSec,
      title: `เสียงบรรยายหน้าร้าน ${name.trim()} #${idx + 1}`,
      authorName: currentUser.alias || currentUser.name,
      createdAt: new Date().toISOString(),
    }));

    const nowIso = new Date().toISOString();

    await onSave({
      id: recordId.current,
      expectedUpdatedAt: store?.updatedAt,
      name: name.trim(),
      branch: store?.recordKind === 'brand' ? '' : branch.trim(),
      recordKind: store?.recordKind, sharedConcept: store?.sharedConcept,
      conceptDescription: store?.conceptDescription, conceptMenu: store?.conceptMenu,
      brandTagline: brandTagline.trim(),
      logoUrl: logoUrl.trim(),
      galleryPhotos,
      audioNotes: audioNotesFormatted,
      videos,
      contactNumber: contactNumber.trim(),
      openingHours: openingHours.trim(),
      themeColor,
      menuCategories: parsedCats,
      menuItems: store?.menuItems || [],
      createdById: store?.createdById || currentUser.id,
      createdByName: store?.createdByName || currentUser.alias || currentUser.name,
      createdByAvatar: store?.createdByAvatar || currentUser.avatar,
      createdAt: store?.createdAt || nowIso,
      updatedAt: nowIso,
      revisionCycles: store?.revisionCycles || [
        {
          cycleNumber: 1,
          title: `รอบเปิดตัวร้าน ${name.trim()} และบอร์ดเมนู`,
          status: 'active',
          createdAt: nowIso,
          createdBy: currentUser.alias || currentUser.name,
          comments: [],
        },
      ],
      likedBy: store?.likedBy || [currentUser.id],
    });
    setIsSubmitting(false);
  };

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="แบบฟอร์มข้อมูลแบรนด์" data-no-pull-refresh className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-white">
              {store ? `แก้ไขข้อมูลร้าน ${store.name}` : 'เพิ่มแบรนด์ / หน้าร้าน 🏪'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* 1. Brand Name */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ชื่อแบรนด์ร้านค้า <span className="text-rose-500 font-black">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ระบุชื่อแบรนด์"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
            />
          </div>

          {/* 2. Color Palette Selector (Moved right after Brand Name, Palette Buttons) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">
              โทนสีแบรนด์ประจำร้าน <span className="text-rose-500 font-black">*</span>
            </label>
            <div className="flex items-center gap-2.5 flex-wrap">
              {COLOR_PALETTES.map((pal) => {
                const isSelected = themeColor === pal.id;
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setThemeColor(pal.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 shadow-md ring-2 ' + pal.ring + ' border-transparent'
                        : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${pal.dot} shrink-0`} />
                    <span>{pal.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-3">
            <label className="flex items-center gap-2 font-bold">เลือกสีเอง
              <input aria-label="เลือกสีแบรนด์เอง" type="color" value={/^#[0-9a-f]{6}$/i.test(themeColor) ? themeColor : '#10b981'} onChange={e => setThemeColor(e.target.value)} className="h-10 w-14 cursor-pointer" />
            </label>
            <label className="flex items-center gap-2">HEX
              <input aria-label="รหัสสีแบรนด์ HEX" value={themeColor.startsWith('#') ? themeColor : ''} placeholder="#10b981" pattern="#[0-9a-fA-F]{6}" maxLength={7} onChange={e => setThemeColor(e.target.value)} className="w-28 rounded-lg border border-slate-300 p-2 font-mono" />
            </label>
            <span className="rounded-xl px-4 py-2 border border-slate-200" style={{backgroundColor: /^#[0-9a-f]{6}$/i.test(themeColor) ? themeColor : '#10b981', color:'#fff', textShadow:'0 1px 3px #000'}}>ตัวอย่างสี</span>
          </div>

          {/* 3. หมวดหมู่เมนูของร้านนี้ (Store Menu Categories) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                หมวดหมู่เมนูของร้านนี้ (Store Menu Categories) <span className="text-rose-500 font-black">*</span>
              </label>
              <span className="text-[10px] text-slate-400">คั่นด้วยจุลภาค (,)</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              หมวดหมู่นี้จะผูกพันกับหน้าร้านโดยอัตโนมัติ ใช้เป็นปุ่มตัวกรองจัดกลุ่มเมนูบนป้ายดิจิทัลหน้าร้าน และเป็นตัวเลือกหมวดหมู่ตอนเพิ่มเมนูเครื่องดื่ม
            </p>
            <input
              type="text"
              required
              value={categoriesInput}
              onChange={(e) => setCategoriesInput(e.target.value)}
              placeholder="เช่น ชานมพรีเมียม & ชาสด, วิตามินคราฟต์โซดา, ท็อปปิ้งซิกเนเจอร์..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-xs text-slate-900 dark:text-white"
            />

            {/* Quick Suggestion Chips to Tap & Add/Remove */}
            <div className="pt-1">
              <span className="text-[10px] text-slate-400 font-bold block mb-1.5">
                แตะเพื่อเพิ่ม/ลบหมวดหมู่ของร้าน:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_STORE_CATEGORIES.map((cat) => {
                  const currentList = categoriesInput
                    .split(',')
                    .map((c) => c.trim())
                    .filter(Boolean);
                  const isSelected = currentList.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => handleToggleCategoryChip(cat)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 active:scale-95 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. Logo / Cover Photo (Clean Label without parenthetical text) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  ภาพโลโก้ / ปกร้านค้าหลัก <span className="text-rose-500 font-black">*</span>
                </span>
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

          {/* 5. Additional Optional Fields (Branch, Tagline, Hours, Phone) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ชื่อพื้นที่ (เว้นว่างเมื่อไม่มีสาขา)</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="ไม่ระบุ หากเป็นแบรนด์ที่ไม่มีสาขา"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">สโลแกนประจำแบรนด์ (Tagline)</label>
              <input
                type="text"
                value={brandTagline}
                onChange={(e) => setBrandTagline(e.target.value)}
                placeholder="เช่น ชานมสดของคนที่จะเป็นหัวแถว"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">เวลาทำการ</label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="เช่น 10:00 - 21:30 น. (เปิดทุกวัน)"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">เบอร์ติดต่อ</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="เช่น 02-123-4567"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* 6. MULTIMEDIA (Clean Label, AudioRecorder & VideoPlayer like Supplier Modal) */}
          <div className="p-3.5 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>พาร์ทมัลติมีเดียเพิ่มเติม</span>
              </label>
              <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer shadow-xs">
                <Plus className="w-3 h-3" />
                <span>เพิ่มรูปแกลเลอรี</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Gallery Thumbnails */}
            {galleryPhotos.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400">ภาพประกอบแบรนด์ ({galleryPhotos.length} รูป)</span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryPhotos.map((photo, pIdx) => (
                    <div key={pIdx} className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs group">
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setGalleryPhotos((p) => p.filter((_, i) => i !== pIdx))}
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-80 hover:opacity-100"
                        title="ลบรูปนี้"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Audio Recorder Component */}
            <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/50 space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block flex items-center gap-1.5 text-[11px]">
                <Mic className="w-3.5 h-3.5 text-emerald-600" />
                <span>วอยซ์เสียงบรรยายหน้าร้าน (อัดเสียงสด / บันทึกได้หลายคลิป)</span>
              </span>
              <AudioRecorder
                voiceNotes={voiceNotes}
                onVoiceNotesChange={(notes) => setVoiceNotes(notes)}
                onAudioSaved={(url, dur) => {
                  setVoiceNotes((prev) => [
                    ...prev,
                    { id: `voice-${Date.now()}`, url, durationSec: dur }
                  ]);
                }}
                onAudioDeleted={() => {
                  setVoiceNotes([]);
                }}
              />
            </div>

            {/* Video Upload & Preview Component */}
            <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-[11px]">
                  <Video className="w-3.5 h-3.5 text-emerald-600" />
                  <span>คลิปวิดีโอบรรยากาศหน้าร้าน ({videos.length})</span>
                </span>
                <label className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3 h-3" />
                  <span>{isVideoLoading ? 'กำลังอัปโหลด...' : '+ เลือกคลิปวิดีโอ'}</span>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    disabled={isVideoLoading}
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {videos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {videos.map((vid, vIdx) => (
                    <div key={vIdx} className="relative group">
                      <VideoPlayer
                        src={vid}
                        className="rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs h-36"
                        badgeLabel={`คลิปหน้าร้าน #${vIdx + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => setVideos((prev) => prev.filter((_, i) => i !== vIdx))}
                        className="absolute top-2 right-2 p-1 rounded-lg bg-rose-600 text-white shadow-md hover:bg-rose-700 text-xs"
                        title="ลบคลิปวิดีโอนี้"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              {isSubmitting ? 'กำลังบันทึก...' : store ? 'บันทึกการแก้ไข' : 'สร้างแบรนด์ / หน้าร้าน'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
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
// 🍵 QUICK SOP MODAL FOR BARISTAS & COLLABORATION
// =========================================================================
function QuickSopModal({
  item,
  currentUser,
  users = [],
  onClose,
  onNavigateToLab,
  onToggleLikeLabItem,
  onAddLabComment,
  onToggleLabCommentLike,
  onRecordView,
}: {
  item: { menuItem: StoreMenuItem; labItem: LabItem };
  currentUser: any;
  users?: any[];
  onClose: () => void;
  onNavigateToLab?: () => void;
  onToggleLikeLabItem: (labItemId: string) => Promise<any>;
  onAddLabComment: (
    labItemId: string,
    content: string,
    target?: 'all' | '0' | '50' | '100',
    extra?: { photoUrl?: string; voiceUrl?: string; duration?: number }
  ) => Promise<any>;
  onToggleLabCommentLike: (labItemId: string, commentId: string) => Promise<any>;
  onRecordView?: (id: string) => void;
}) {
  const { labItem, menuItem } = item;
  const [activeLevel, setActiveLevel] = useState<'zero' | 'half' | 'full'>('half');
  const [commentText, setCommentText] = useState('');
  const [sweetnessTarget, setSweetnessTarget] = useState<'all' | '0' | '50' | '100'>('all');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Rich attachments for comment
  const [commentPhotoUrl, setCommentPhotoUrl] = useState<string | null>(null);
  const [commentVoiceUrl, setCommentVoiceUrl] = useState<string | null>(null);
  const [commentVoiceDuration, setCommentVoiceDuration] = useState<number | undefined>(undefined);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // Live voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingStartRef = useRef<number>(0);

  // 1. Audio and media cleanup when modal unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // 2. Track view log
  useEffect(() => {
    onRecordView?.(labItem.id);
  }, [labItem.id, onRecordView]);

  // 3. Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentLevelData = labItem.sweetnessLevels[activeLevel];
  const isLikedRecipe = (labItem.likedBy || []).includes(currentUser.id);
  const commentsList = (labItem.revisionCycles || []).slice().reverse().flatMap(c => c.comments || []);

  // Attachment upload handler
  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingAttachment(true);
      const url = await uploadMediaToServer(file, {
        recordId: labItem.id,
        recordType: 'lead_lab',
        recordTitle: labItem.name,
      });
      setCommentPhotoUrl(url);
    } catch (err: any) {
      alert(err.message || 'อัปโหลดรูปภาพไม่สำเร็จ');
    } finally {
      setIsUploadingAttachment(false);
    }
  };

  // Live voice recording toggle
  const toggleLiveVoiceRecording = async () => {
    if (isRecording) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      return;
    }

    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        alert('เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด หรือไม่ได้เปิดผ่าน HTTPS');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'].find((t) =>
        MediaRecorder.isTypeSupported(t)
      );
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      mediaRecorderRef.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setIsRecording(false);

        const duration = Math.round((Date.now() - recordingStartRef.current) / 1000);
        setCommentVoiceDuration(duration);

        const type = recorder.mimeType?.split(';')[0] || 'audio/webm';
        const blob = new Blob(chunks, { type });
        if (!blob.size) return;
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        const file = new File([blob], `เสียงคอมเมนต์-บาร์-${Date.now()}.${ext}`, { type });

        try {
          setIsUploadingAttachment(true);
          const url = await uploadMediaToServer(file, {
            recordId: labItem.id,
            recordType: 'lead_lab',
            recordTitle: labItem.name,
          });
          setCommentVoiceUrl(url);
        } catch (err: any) {
          alert(err.message || 'อัปโหลดเสียงไม่สำเร็จ');
        } finally {
          setIsUploadingAttachment(false);
        }
      };

      recorder.onerror = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
        alert('การอัดเสียงขัดข้อง กรุณาลองใหม่');
      };

      recordingStartRef.current = Date.now();
      setRecordingSeconds(0);
      setIsRecording(true);
      recorder.start(250);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(Math.round((Date.now() - recordingStartRef.current) / 1000));
      }, 1000);
    } catch {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
      alert('ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนในเบราว์เซอร์');
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text && !commentPhotoUrl && !commentVoiceUrl) return;

    setIsSubmittingComment(true);
    const ok = await onAddLabComment(labItem.id, text, sweetnessTarget, {
      photoUrl: commentPhotoUrl || undefined,
      voiceUrl: commentVoiceUrl || undefined,
      duration: commentVoiceDuration,
    });
    setIsSubmittingComment(false);
    if (!ok) return;
    setCommentText('');
    setCommentPhotoUrl(null);
    setCommentVoiceUrl(null);
    setCommentVoiceDuration(undefined);
    setIsSubmittingComment(false);
  };

  return createPortal(
    <div data-no-pull-refresh className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 overflow-hidden">
      <div className="bg-white dark:bg-slate-900 rounded-none sm:rounded-3xl max-w-xl w-full h-full sm:h-[92vh] sm:max-h-[92vh] flex flex-col shadow-2xl border-0 sm:border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Sticky 2-Row Header */}
        <div className="shrink-0 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-3 px-3 sm:px-4 sm:pt-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          {/* Row 1: Code + Title + Close */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={labItem.photoUrl}
                alt={labItem.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold">
                    {labItem.code}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BARISTA QUICK SOP</span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight truncate mt-0.5">
                  {menuItem.customName || labItem.name}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
              title="ปิดหน้าต่าง (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Row 2: Action Toolbar (Like, LINE Share, PDF Spec, Open in Lab) */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100 dark:border-slate-800/80">
            {/* Like recipe button */}
            <button
              type="button"
              onClick={() => void onToggleLikeLabItem(labItem.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs ${
                isLikedRecipe
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 hover:bg-rose-100'
              }`}
              title="ถูกใจสูตรนี้"
            >
              <Heart className={`w-3.5 h-3.5 ${isLikedRecipe ? 'fill-current' : ''}`} />
              <span>{(labItem.likedBy || []).length} ถูกใจ</span>
            </button>

            {/* LINE Share with Deep Link */}
            <button
              type="button"
              onClick={() => shareLeadLabItem(labItem)}
              className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs"
              title="แชร์สูตรลง LINE พร้อมลิงก์กดเปิดทันที"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>แชร์ LINE</span>
            </button>

            {/* PDF Spec Export */}
            <button
              type="button"
              onClick={() => printLeadLabSpecReport(labItem)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs"
              title="พิมพ์เอกสารสเปกสูตรฉบับเต็ม"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>พิมพ์ PDF</span>
            </button>

            {/* Open in LEAD LAB */}
            {onNavigateToLab && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToLab();
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs ml-auto"
                title="เปิดสูตรใน LEAD LAB เพื่อปรับแต่ง R&D"
              >
                <Coffee className="w-3.5 h-3.5 text-indigo-600" />
                <span>เปิดใน R&D 🧪</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4">
          {/* Likers & Viewers Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-[11px] text-slate-500 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
              <span>{(labItem.likedBy || []).length} คนถูกใจสูตร:</span>
              {labItem.likedBy && labItem.likedBy.length > 0 && (
                <div className="flex -space-x-1.5 overflow-hidden ml-1">
                  {labItem.likedBy.slice(0, 5).map((uid, uIdx) => {
                    const u = users.find((x) => x.id === uid);
                    return (
                      <img
                        key={uIdx}
                        src={u?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80'}
                        alt={u?.name || uid}
                        title={u?.name || uid}
                        className="w-4 h-4 rounded-full border border-white dark:border-slate-800 object-cover"
                      />
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span>รอบพัฒนา #{labItem.revisionCycles?.length || 1}</span>
              <span>·</span>
              <span>เข้าดู {(labItem.viewLogs || []).length} ครั้ง</span>
            </div>
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
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    activeLevel === lvl.key
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-102 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
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

          {/* 💬 RECIPE COLLABORATION & SOP COMMENTS */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                <span>ฟีดแบ็ก & ประเด็นรสชาติหน้าร้าน ({commentsList.length} ข้อความ)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">แชร์ข้อคิดเห็นระหว่างบาริสต้า & R&D</span>
            </div>

            {/* Comments list */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {commentsList.length === 0 ? (
                <div className="text-[11px] text-slate-400 italic p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center">
                  ยังไม่มีข้อคิดเห็นสำหรับสูตรนี้ สามารถพิมพ์ฟีดแบ็กหรืออัดเสียงจากหน้าร้านด้านล่างได้เลย
                </div>
              ) : (
                commentsList.map((comm) => {
                  const hasLikedComm = (comm.likes || []).includes(currentUser.id);
                  return (
                    <div
                      key={comm.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={comm.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                            alt={comm.authorName}
                            className="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <strong className="text-[11px] text-slate-800 dark:text-white">{comm.authorName}</strong>
                          {comm.sweetnessTarget && comm.sweetnessTarget !== 'all' && (
                            <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[9px] font-bold">
                              หวาน {comm.sweetnessTarget}%
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => void onToggleLabCommentLike(labItem.id, comm.id)}
                          className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-lg transition-colors ${
                            hasLikedComm ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{(comm.likes || []).length}</span>
                        </button>
                      </div>

                      {comm.content && (
                        <p className="text-[11px] text-slate-700 dark:text-slate-300 pl-7 leading-relaxed">
                          "{comm.content}"
                        </p>
                      )}

                      {/* Attached Photo */}
                      {comm.photoUrl && (
                        <div className="pl-7 pt-1">
                          <a
                            href={comm.photoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs max-w-[180px] hover:opacity-90 transition-opacity"
                          >
                            <img src={comm.photoUrl} alt="รูปแนบคอมเมนต์" className="w-full h-auto max-h-32 object-cover" />
                          </a>
                        </div>
                      )}

                      {/* Attached Voice Note Audio Player */}
                      {comm.voiceUrl && (
                        <div className="ml-7 p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1 max-w-sm">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                            <Mic className="w-3 h-3 text-indigo-600 animate-pulse" />
                            <span>เสียงบันทึกข้อคิดเห็น {comm.duration ? `(${comm.duration} วินาที)` : ''}</span>
                          </div>
                          <audio controls src={comm.voiceUrl} className="w-full h-7" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Attached Photo Staging Preview */}
            {commentPhotoUrl && (
              <div className="flex items-center gap-2 p-2 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs">
                <img src={commentPhotoUrl} alt="แนบรูป" className="w-10 h-10 rounded-lg object-cover border" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-indigo-900 dark:text-indigo-200 truncate text-[11px]">แนบรูปถ่ายเรียบร้อย</div>
                  <div className="text-[10px] text-indigo-500">จะถูกส่งพร้อมคอมเมนต์</div>
                </div>
                <button
                  type="button"
                  onClick={() => setCommentPhotoUrl(null)}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Attached Voice Staging Preview */}
            {commentVoiceUrl && (
              <div className="flex items-center gap-2 p-2 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
                <Volume2 className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-amber-900 dark:text-amber-200 truncate text-[11px]">
                    เสียงบันทึก {commentVoiceDuration ? `(${commentVoiceDuration} วิ)` : ''}
                  </div>
                  <audio controls src={commentVoiceUrl} className="w-full h-6 mt-1" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCommentVoiceUrl(null);
                    setCommentVoiceDuration(undefined);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Live voice recording in progress banner */}
            {isRecording && (
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                  <span>กำลังอัดเสียงฟีดแบ็ก... {recordingSeconds}s</span>
                </div>
                <button
                  type="button"
                  onClick={toggleLiveVoiceRecording}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs inline-flex items-center gap-1"
                >
                  <Square className="w-3 h-3 fill-white" />
                  <span>หยุดและบันทึก</span>
                </button>
              </div>
            )}

            {/* Add comment form with Photo upload & Live voice record */}
            <form onSubmit={handlePostComment} className="space-y-2 pt-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">ระดับความหวาน:</span>
                  <select
                    value={sweetnessTarget}
                    onChange={(e) => setSweetnessTarget(e.target.value as any)}
                    className="text-[11px] p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none"
                  >
                    <option value="all">ความเห็นทั่วไป</option>
                    <option value="0">หวาน 0% (ไม่หวาน)</option>
                    <option value="50">หวาน 50% (หวานน้อย)</option>
                    <option value="100">หวาน 100% (หวานปกติ)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {/* Photo attachment input */}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadPhoto}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={isUploadingAttachment}
                    className="h-7 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors inline-flex items-center gap-1"
                    title="แนบรูปถ่ายประกอบคอมเมนต์"
                  >
                    <Camera className="w-3.5 h-3.5 text-indigo-600" />
                    <span>แนบรูป</span>
                  </button>

                  {/* Live Voice Recording Button */}
                  <button
                    type="button"
                    onClick={toggleLiveVoiceRecording}
                    disabled={isUploadingAttachment}
                    className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    }`}
                    title={isRecording ? 'หยุดอัดเสียง' : 'อัดเสียงพูดคอมเมนต์'}
                  >
                    {isRecording ? <Square className="w-3 h-3 fill-white" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isRecording ? `หยุด (${recordingSeconds}s)` : 'อัดเสียง'}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="คอมเมนต์รสชาติ หรือโน้ตสูตรชงหน้าบาร์..."
                  className="flex-1 text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmittingComment || isUploadingAttachment || (!commentText.trim() && !commentPhotoUrl && !commentVoiceUrl)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1 shrink-0 transition-colors"
                >
                  {isSubmittingComment || isUploadingAttachment ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  <span>ส่ง</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="shrink-0 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] px-3.5 sm:px-4 sm:pb-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
            🥤 หมวดเมนู: <span className="font-bold text-slate-700 dark:text-slate-200">{menuItem.category}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shrink-0"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
