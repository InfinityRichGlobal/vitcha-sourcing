import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  FlaskConical,
  Edit2,
  Plus,
  Search,
  Heart,
  MessageSquare,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Archive,
  ArrowRight,
  Send,
  Lock,
  ThumbsUp,
  X,
  Droplet,
  Coffee,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  FileSpreadsheet,
  Printer,
  Share2,
  Camera,
  Upload,
  Image as ImageIcon,
  Mic,
  Video,
  Trash2,
  Eye,
  Copy,
  Paperclip,
  Loader2,
  Play,
  Pause,
  Volume2,
  Square
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LabItem, LabFormulaStatus, LabItemType, SweetnessDetail, VoiceNoteEntry } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { printLeadLabSpecReport, shareLeadLabItem } from '../utils/labAndStoreExport';
import { uploadMediaToServer } from '../services/api';
import { saveVideoFile } from '../utils/mediaStorage';
import { AudioRecorder } from './AudioRecorder';
import { VideoPlayer } from './VideoPlayer';

export function LeadLabView({
  initialItemId,
  onOpenStoreSimulator,
}: {
  initialItemId?: string | null;
  onOpenStoreSimulator?: (storeId?: string) => void;
}) {
  const {
    leadLabItems,
    currentUser,
    users,
    saveLeadLabItem,
    deleteLeadLabItem,
    toggleLikeLeadLabItem,
    addLeadLabComment,
    toggleLikeLeadLabComment,
    cycleLeadLabRevision,
    setLeadLabStatus,
    recordLeadLabItemView,
    isMutating,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'drink' | 'topping'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | LabFormulaStatus>('all');
  const [selectedItem, setSelectedItem] = useState<LabItem | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<LabItem | null>(null);
  const canEditLab = ['admin', 'editor', 'reviewer'].includes(currentUser.role);

  // Synchronize deep-linked initialItemId
  useEffect(() => {
    if (initialItemId && leadLabItems.length > 0) {
      const found = leadLabItems.find((x) => x.id === initialItemId);
      if (found) setSelectedItem(found);
    }
  }, [initialItemId, leadLabItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return leadLabItems.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchIng = (item.ingredients || []).some((ing) => ing.name.toLowerCase().includes(q));
        if (!matchName && !matchCode && !matchCat && !matchIng) return false;
      }
      return true;
    });
  }, [leadLabItems, typeFilter, statusFilter, searchQuery]);

  // Keep selectedItem synchronized with state updates
  const activeDetailItem = useMemo(() => {
    if (!selectedItem) return null;
    return leadLabItems.find((x) => x.id === selectedItem.id) || null;
  }, [leadLabItems, selectedItem]);

  // Stats count with drinks and toppings breakdown
  const stats = useMemo(() => {
    const total = leadLabItems.length;
    const drinks = leadLabItems.filter((x) => x.type === 'drink').length;
    const toppings = leadLabItems.filter((x) => x.type === 'topping').length;
    const approved = leadLabItems.filter((x) => x.status === 'approved').length;
    const testing = leadLabItems.filter((x) => x.status === 'testing').length;
    const shelved = leadLabItems.filter((x) => x.status === 'shelved').length;
    return { total, drinks, toppings, approved, testing, shelved };
  }, [leadLabItems]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-5 py-3.5 space-y-4 sm:space-y-5 pb-24 animate-in fade-in">
      {/* 🧪 HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-4 sm:p-6 md:p-8 shadow-xl border border-indigo-800/40">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <FlaskConical className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>LEAD LAB · นวัตกรรมเครื่องดื่ม & ท็อปปิ้ง</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>LEAD LAB 🧪</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 whitespace-nowrap">
                "แล๊ปของคนหัวแถว"
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              พื้นที่คิดค้นและพัฒนานวัตกรรมสูตรเครื่องดื่ม & ท็อปปิ้ง R&D Sensory Test, ควบคุมค่า Brix, คำนวณต้นทุนต่อแก้ว (Cost/Cup) และระบบสรุปปิดประเด็นปรับปรุงสูตร
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsNewModalOpen(true)} disabled={!canEditLab}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>คิดค้นสูตรใหม่</span>
            </button>
            {onOpenStoreSimulator && (
              <button
                type="button"
                onClick={() => onOpenStoreSimulator()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-sm transition-all duration-200"
              >
                <Coffee className="w-4 h-4 text-emerald-400" />
                <span>เปิดร้านแฟรนไชส์จำลอง ➔</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stat Chips (6 Chips Responsive Grid: 12 สูตร + เครื่องดื่ม + ท็อปปิ้ง + ผ่าน + ทดลอง + พัก) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold shrink-0">
              {stats.total}
            </div>
            <div className="min-w-0">
              <div className="text-slate-400 font-medium truncate">สูตรทั้งหมด</div>
              <div className="text-white font-bold truncate">ในระบบ R&D</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold shrink-0">
              {stats.drinks}
            </div>
            <div className="min-w-0">
              <div className="text-slate-400 font-medium truncate">กรอบเครื่องดื่ม</div>
              <div className="text-sky-300 font-bold truncate">แก้วหลักพร้อมเสิร์ฟ</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold shrink-0">
              {stats.toppings}
            </div>
            <div className="min-w-0">
              <div className="text-slate-400 font-medium truncate">จำนวนท๊อปปิ้ง</div>
              <div className="text-purple-300 font-bold truncate">ท็อปปิ้งทั้งหมด</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold shrink-0">
              {stats.approved}
            </div>
            <div className="min-w-0">
              <div className="text-slate-400 font-medium truncate">ผ่านเกณฑ์อนุมัติ</div>
              <div className="text-emerald-400 font-bold truncate">พร้อมขายหน้าร้าน</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold shrink-0">
              {stats.testing}
            </div>
            <div className="min-w-0">
              <div className="text-slate-400 font-medium truncate">กำลังปรับสูตร</div>
              <div className="text-amber-400 font-bold truncate">เทสต์ & พัฒนา</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0">
              {stats.shelved}
            </div>
            <div className="min-w-0">
              <div className="text-slate-400 font-medium truncate">พักสูตร / ชะลอไว้</div>
              <div className="text-rose-400 font-bold truncate">คลังบทเรียน</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อสูตร, รหัส RD (เช่น RD-TEA-01), วัตถุดิบ..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Type & Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({stats.total})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('drink')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'drink'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              🥤 เครื่องดื่ม ({stats.drinks})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('topping')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'topping'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              🍮 ท็อปปิ้ง ({stats.toppings})
            </button>
          </div>

          {/* Status Dropdown / Pills */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ทุกสถานะ ({stats.total})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('approved')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                statusFilter === 'approved'
                  ? 'bg-emerald-500 text-white shadow-sm font-bold'
                  : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
              }`}
            >
              ผ่านอนุมัติ ({stats.approved})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('testing')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                statusFilter === 'testing'
                  ? 'bg-amber-500 text-white shadow-sm font-bold'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
              }`}
            >
              กำลังทดลอง ({stats.testing})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('shelved')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                statusFilter === 'shelved'
                  ? 'bg-rose-500 text-white shadow-sm font-bold'
                  : 'text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              พักสูตร ({stats.shelved})
            </button>
          </div>
        </div>
      </div>

      {/* 📋 RECIPES & TOPPINGS GRID */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
          <FlaskConical className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">ไม่พบสูตรที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหา หรือกดสร้างสูตรใหม่เข้าระบบ R&D</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
          {filteredItems.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-3 sm:mb-4">
              <LabItemCard
                item={item}
                currentUserId={currentUser.id}
                users={users}
                onSelect={() => setSelectedItem(item)}
                onToggleLike={() => toggleLikeLeadLabItem(item.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* 🔍 DETAILED MODAL */}
      {activeDetailItem && !editingLab && (
        <LabDetailModal
          item={activeDetailItem}
          currentUser={currentUser}
          users={users}
          onClose={() => setSelectedItem(null)}
          onToggleLike={() => toggleLikeLeadLabItem(activeDetailItem.id)}
          onAddComment={(content, target, extra) => addLeadLabComment(activeDetailItem.id, content, target, extra)}
          onToggleCommentLike={(commentId) => toggleLikeLeadLabComment(activeDetailItem.id, commentId)}
          onCycleRevision={(summary, nextTitle) => cycleLeadLabRevision(activeDetailItem.id, summary, nextTitle)}
          onSetStatus={(status) => setLeadLabStatus(activeDetailItem.id, status)}
          onRecordView={() => recordLeadLabItemView(activeDetailItem.id)}
          onEdit={canEditLab ? () => setEditingLab(structuredClone(activeDetailItem)) : undefined}
          onDelete={async () => {
            if (window.confirm(`ยืนยันการลบสูตร "${activeDetailItem.name}" หรือไม่?`)) {
              if (!await deleteLeadLabItem(activeDetailItem.id)) return;
              setSelectedItem(null);
            }
          }}
        />
      )}

      {/* ➕ CREATE NEW RECIPE MODAL */}
      {(isNewModalOpen || editingLab) && canEditLab && (
        <LabItemFormModal
          key={editingLab?.id || 'new-lab'}
          item={editingLab || undefined}
          currentUser={currentUser}
          onClose={() => { setIsNewModalOpen(false); setEditingLab(null); }}
          onSave={async (itemData) => {
            if (!await saveLeadLabItem(itemData)) return;
            setIsNewModalOpen(false);
            setEditingLab(null);
          }}
        />
      )}
    </div>
  );
}

// ==========================================
// CARD COMPONENT
// ==========================================
function LabItemCard({
  item,
  currentUserId,
  users = [],
  onSelect,
  onToggleLike,
}: {
  item: LabItem;
  currentUserId: string;
  users?: any[];
  onSelect: () => void;
  onToggleLike: () => void;
}) {
  const isLiked = (item.likedBy || []).includes(currentUserId);
  const totalComments = (item.revisionCycles || []).reduce(
    (acc, cycle) => acc + (cycle.comments ? cycle.comments.length : 0),
    0
  );

  const statusBadge = {
    approved: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      label: 'ผ่านอนุมัติ · พร้อมบรรจุร้าน',
      shortLabel: 'ผ่านอนุมัติ',
      icon: CheckCircle2,
    },
    testing: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      label: 'กำลังทดลอง & ปรับสูตร',
      shortLabel: 'กำลังทดลอง',
      icon: Clock,
    },
    shelved: {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      label: 'พักสูตร / ชะลอไว้',
      shortLabel: 'พักสูตร',
      icon: Archive,
    },
  }[item.status];

  const StatusIcon = statusBadge.icon;

  return (
    <div className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden break-inside-avoid">
      {/* Top Media Banner: Fit image with natural aspect ratio (varying height for landscape/portrait) */}
      <div
        className="relative w-full bg-slate-100 dark:bg-slate-800/70 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={onSelect}
      >
        <img
          src={item.photoUrl}
          alt={item.name}
          className="w-full h-auto object-contain block group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Code & Type Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 max-w-[80%] flex-wrap">
          <span className="px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white font-mono text-[9px] font-bold border border-white/20">
            {item.code}
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-indigo-600/85 backdrop-blur-md text-white text-[9px] font-bold">
            {item.type === 'drink' ? 'เครื่องดื่ม' : 'ท็อปปิ้ง'}
          </span>
        </div>

        {/* Like Button on Image */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
            isLiked
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-black/45 text-white/95 hover:bg-black/65'
          }`}
          title="กดถูกใจสูตรนี้"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content Below Image */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        {/* Category & Title */}
        <div className="cursor-pointer" onClick={onSelect}>
          <div className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 truncate">
            {item.category}
          </div>
          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2 mt-0.5">
            {item.name}
          </h3>
          <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
            {item.nameEn}
          </div>
        </div>

        {/* Status Badge */}
        <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-bold text-[10px] ${statusBadge.bg}`}>
            <StatusIcon className="w-3 h-3" />
            <span>{statusBadge.shortLabel}</span>
          </span>
        </div>

        {/* Footer Actions & Comments Count */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px]">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-flex items-center gap-1" title="ยอดถูกใจ">
              <Heart className={`w-3 h-3 ${isLiked ? 'text-rose-500 fill-current' : ''}`} />
              <span className="font-mono text-[10px] font-bold">{(item.likedBy || []).length}</span>
              {item.likedBy && item.likedBy.length > 0 && (
                <span className="flex -space-x-1 overflow-hidden ml-0.5">
                  {item.likedBy.slice(0, 3).map((uid, idx) => {
                    const u = users.find((x) => x.id === uid);
                    return (
                      <img
                        key={idx}
                        src={u?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80'}
                        alt={u?.name || uid}
                        className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-900 object-cover"
                      />
                    );
                  })}
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-0.5" title="ความคิดเห็นและรอบทดลอง">
              <MessageSquare className="w-3 h-3" />
              <span className="font-mono text-[10px] font-bold">{totalComments}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onSelect}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold transition-colors"
          >
            <span>ดูสูตร</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DETAILED MODAL WITH REVISION LOOP & MATRIX
// ==========================================
function LabDetailModal({
  item,
  currentUser,
  users = [],
  onClose,
  onToggleLike,
  onAddComment,
  onToggleCommentLike,
  onCycleRevision,
  onSetStatus,
  onRecordView,
  onDelete,
  onEdit,
}: {
  item: LabItem;
  currentUser: any;
  users?: any[];
  onClose: () => void;
  onToggleLike: () => void;
  onAddComment: (
    content: string,
    target?: 'all' | '0' | '50' | '100',
    extra?: { photoUrl?: string; voiceUrl?: string; duration?: number }
  ) => Promise<boolean>;
  onToggleCommentLike: (commentId: string) => void;
  onCycleRevision: (summary: string, nextTitle?: string) => Promise<boolean>;
  onSetStatus: (status: LabFormulaStatus) => void;
  onRecordView?: () => void;
  onDelete: () => void;
  onEdit?: () => void;
}) {
  const [commentText, setCommentText] = useState('');
  const [sweetnessTarget, setSweetnessTarget] = useState<'all' | '0' | '50' | '100'>('all');
  const [isClosingCycle, setIsClosingCycle] = useState(false);
  const [cycleSummary, setCycleSummary] = useState('');
  const [nextCycleTitle, setNextCycleTitle] = useState('');

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
    onRecordView?.();
  }, []);

  // 3. Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isLiked = (item.likedBy || []).includes(currentUser.id);
  const activeCycle = (item.revisionCycles || []).find((c) => c.status === 'active');
  const closedCycles = (item.revisionCycles || []).filter((c) => c.status === 'closed');

  const gpPercent = item.suggestedPriceThb > 0
    ? (((item.suggestedPriceThb - item.costTotalThb) / item.suggestedPriceThb) * 100).toFixed(1)
    : '0.0';

  // Attachment upload handler
  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingAttachment(true);
      const url = await uploadMediaToServer(file, {
        recordId: item.id,
        recordType: 'lead_lab',
        recordTitle: item.name,
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
        const file = new File([blob], `เสียงคอมเมนต์-RD-${Date.now()}.${ext}`, { type });

        try {
          setIsUploadingAttachment(true);
          const url = await uploadMediaToServer(file, {
            recordId: item.id,
            recordType: 'lead_lab',
            recordTitle: item.name,
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

    if (!await onAddComment(text, sweetnessTarget, {
      photoUrl: commentPhotoUrl || undefined,
      voiceUrl: commentVoiceUrl || undefined,
      duration: commentVoiceDuration,
    })) return;

    setCommentText('');
    setCommentPhotoUrl(null);
    setCommentVoiceUrl(null);
    setCommentVoiceDuration(undefined);
  };

  const handleConfirmCloseCycle = async () => {
    if (!cycleSummary.trim()) {
      alert('กรุณากรอกข้อสรุปการอ่านคอมเมนต์รอบนี้');
      return;
    }
    if (!await onCycleRevision(cycleSummary.trim(), nextCycleTitle.trim() || undefined)) return;
    setIsClosingCycle(false);
    setCycleSummary('');
    setNextCycleTitle('');
  };

  return createPortal(
    <div data-no-pull-refresh className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 overflow-hidden">
      <div className="bg-white dark:bg-slate-900 rounded-none sm:rounded-3xl max-w-4xl w-full h-full sm:h-[92vh] sm:max-h-[92vh] flex flex-col shadow-2xl border-0 sm:border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Sticky Header — 2 Rows (Row 1: Title + Close; Row 2: Action Toolbar) */}
        <div className="pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-3 px-3.5 sm:px-4 sm:pt-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20 space-y-2.5 shrink-0 shadow-xs">
          {/* Row 1: Item Title + Close Button */}
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold shrink-0 mt-0.5">
                {item.code}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-snug break-words">
                  {item.name}
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono break-words leading-tight">
                  <span>{item.nameEn}</span>
                  <span className="mx-1 text-slate-300 dark:text-slate-600">·</span>
                  <span className="font-sans font-bold text-indigo-600 dark:text-indigo-400">{item.category}</span>
                </div>
                {/* Creator Attribution Stamp */}
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                  <img
                    src={item.createdByAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80'}
                    alt={item.createdByName || 'ผู้สร้างสูตร'}
                    className="w-4 h-4 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
                  />
                  <span>สร้างโดย: <strong className="text-slate-700 dark:text-slate-200 font-bold">{item.createdByName || 'R&D Team'}</strong></span>
                  <span>·</span>
                  <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'ไม่ระบุวันเวลา'}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all active:scale-95 flex items-center justify-center shrink-0"
              title="ปิดหน้าต่าง"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {onEdit && <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-2">
            <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs font-bold text-amber-800"><Edit2 className="w-4 h-4" />แก้ไขสูตร</button>
            <button type="button" onClick={onDelete} className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600"><Trash2 className="w-4 h-4" />ลบสูตร</button>
          </div>}

          {/* Row 2: Action Toolbar Row (Like · แชร์ LINE · PDF · ลบ) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1.5 border-t border-slate-100 dark:border-slate-800 select-none">
            {/* Like Button with avatars preview */}
            <button
              type="button"
              onClick={onToggleLike}
              className={`h-7 sm:h-8 px-2.5 rounded-xl border text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1.5 shrink-0 shadow-xs ${
                isLiked
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
              title="ถูกใจสูตรนี้"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>{(item.likedBy || []).length} ไลก์</span>
            </button>

            {/* Share to LINE with clickable deep link */}
            <button
              type="button"
              onClick={() => shareLeadLabItem(item)}
              className="h-7 sm:h-8 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1.5 shrink-0 shadow-xs"
              title="แชร์สูตรไปยัง LINE พร้อมลิงก์กดเปิดทันที"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>แชร์ LINE</span>
            </button>

            {/* Print / PDF Spec Sheet */}
            <button
              type="button"
              onClick={() => printLeadLabSpecReport(item, users)}
              className="h-7 sm:h-8 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1.5 shrink-0 shadow-xs"
              title="พิมพ์เอกสารสเปกสูตร R&D หรือบันทึก PDF"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>สเปก R&D (PDF)</span>
            </button>


          </div>
        </div>

        {/* Modal Scrollable Body — overscroll-contain prevents background bleed */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-6">
          {/* Top Section: Photo + Overview + Status Manager */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-3">
              <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative shadow-sm">
                <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Viewers Log */}
              {item.viewLogs && item.viewLogs.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-800/40 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>เข้าดู {item.viewLogs.length} คน:</span>
                  <div className="flex -space-x-1.5 overflow-hidden ml-auto">
                    {item.viewLogs.slice(0, 5).map((v, vIdx) => (
                      <img
                        key={vIdx}
                        src={v.avatar}
                        alt={v.alias}
                        title={`${v.alias} (${v.viewCount || 1} ครั้ง)`}
                        className="w-4 h-4 rounded-full border border-white dark:border-slate-800 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Likers List with Avatars */}
              {item.likedBy && item.likedBy.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-rose-50/60 dark:bg-rose-950/20 px-2.5 py-1.5 rounded-xl border border-rose-100 dark:border-rose-900/30">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                  <span>ถูกใจโดย {item.likedBy.length} คน:</span>
                  <div className="flex -space-x-1.5 overflow-hidden ml-auto">
                    {item.likedBy.slice(0, 5).map((uid, uIdx) => {
                      const u = users.find((x) => x.id === uid);
                      return (
                        <img
                          key={uIdx}
                          src={u?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                          alt={u?.name || uid}
                          title={u?.name || uid}
                          className="w-4 h-4 rounded-full border border-white dark:border-slate-800 object-cover"
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status Switcher */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  ปรับสถานะการพัฒนาสูตร:
                </label>
                <select
                  value={item.status}
                  onChange={(e) => onSetStatus(e.target.value as LabFormulaStatus)}
                  className="w-full text-xs font-bold p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="approved">✅ ผ่านเกณฑ์อนุมัติ (พร้อมบรรจุร้าน)</option>
                  <option value="testing">⏳ กำลังทดลอง & ปรับสูตร (R&D)</option>
                  <option value="shelved">📦 พักสูตร / ชะลอไว้ (คลังบทเรียน)</option>
                </select>
              </div>
            </div>

            {/* Description & Financial Overview */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">คำอธิบายแนวคิดสูตร</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {item.description}
                </p>
              </div>

              {/* Additional Gallery Photos if any */}
              {item.galleryPhotos && item.galleryPhotos.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>แกลเลอรีรูปภาพเพิ่มเติม ({item.galleryPhotos.length} รูป)</span>
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {item.galleryPhotos.map((photo, pIdx) => (
                      <a
                        key={pIdx}
                        href={photo}
                        target="_blank"
                        rel="noreferrer"
                        className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity"
                      >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio Notes */}
              {(item.audioNotes && item.audioNotes.length > 0) && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-indigo-600" />
                    <span>ไฟล์เสียงบรรยายเทคนิคชง R&D</span>
                  </h4>
                  <div className="space-y-2">
                    {item.audioNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-3"
                      >
                        <Volume2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200 truncate">
                            {note.title || 'เสียงบรรยายเทคนิคชง'}
                          </div>
                          {note.url && <audio controls src={note.url} className="w-full h-8 mt-1" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video clips */}
              {(item.videos && item.videos.length > 0) && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-indigo-600" />
                    <span>คลิปวิดีโอสาธิตการชง R&D ({item.videos.length} คลิป)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.videos.map((vid, vIdx) => (
                      <VideoPlayer
                        key={vIdx}
                        src={vid}
                        className="rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs h-40"
                        badgeLabel={`คลิปสาธิต #${vIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Brewing Specs */}
              {item.technicalSpecs && (
                <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                  <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>พารามิเตอร์การสกัดมาตรฐาน (Extraction Parameters)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">อุณหภูมิน้ำร้อน</span>
                      <strong className="text-slate-800 dark:text-white font-mono">{item.technicalSpecs.brewingTempC || '-'} °C</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">เวลาสกัด</span>
                      <strong className="text-slate-800 dark:text-white font-mono">{item.technicalSpecs.extractionTimeSec || '-'} วินาที</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">ปริมาณใบชา/ผง</span>
                      <strong className="text-slate-800 dark:text-white font-mono">{item.technicalSpecs.teaLeavesG || '-'} g</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">อายุจัดเก็บน้ำชา</span>
                      <strong className="text-slate-800 dark:text-white font-mono">{item.technicalSpecs.shelfLifeHours || '-'} ชั่วโมง</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
                  <div className="text-[10px] text-slate-400 font-medium">ต้นทุนวัตถุดิบ</div>
                  <div className="font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-white">฿{item.costIngredientThb.toFixed(2)}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
                  <div className="text-[10px] text-slate-400 font-medium">ต้นทุนแก้ว/ฝา</div>
                  <div className="font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-white">฿{item.costPackagingThb.toFixed(2)}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
                  <div className="text-[10px] text-slate-400 font-medium">รวมต้นทุน/แก้ว</div>
                  <div className="font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-white">฿{item.costTotalThb.toFixed(2)}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">ราคาขาย (GP %)</div>
                  <div className="font-mono font-extrabold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                    ฿{item.suggestedPriceThb.toFixed(2)} <span className="text-[10px] font-bold">({gpPercent}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 📊 SWEETNESS MATRIX TABLE (0% / 50% / 100%) */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Droplet className="w-4 h-4 text-indigo-500" />
              <span>ตารางจำแนกสูตรตามระดับความหวาน (Sweetness & Brix Matrix)</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="p-3">ระดับความหวาน</th>
                    <th className="p-3">ชนิด & ปริมาณสารให้ความหวาน</th>
                    <th className="p-3">ของเหลวหลัก / นม</th>
                    <th className="p-3 text-center">ค่า Brix (°Bx)</th>
                    <th className="p-3 text-center">พลังงาน (kcal)</th>
                    <th className="p-3">คาแรกเตอร์รสสัมผัส (Sensory Profile)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { key: 'zero', data: item.sweetnessLevels.zero, badge: '0% (ไม่หวาน/คีโต)' },
                    { key: 'half', data: item.sweetnessLevels.half, badge: '50% (หวานน้อยแนะนำ)' },
                    { key: 'full', data: item.sweetnessLevels.full, badge: '100% (หวานปกติ)' },
                  ].map(({ key, data, badge }) => (
                    <tr key={key} className={key === 'half' ? 'bg-indigo-50/30 dark:bg-indigo-950/20 font-medium' : ''}>
                      <td className="p-3 whitespace-nowrap">
                        <span className="font-bold text-slate-800 dark:text-white">{badge}</span>
                      </td>
                      <td className="p-3">
                        <div>{data.sweetenerType}</div>
                        <span className="font-mono text-indigo-600 font-bold">{data.syrupMl} ml</span>
                      </td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-300">
                        {data.baseLiquidMl} ml {data.milkOrMixerMl ? `+ ${data.milkOrMixerMl} ml` : ''}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                        {data.brix} °Bx
                      </td>
                      <td className="p-3 text-center font-mono text-slate-500">
                        {data.caloriesKcal} kcal
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300 italic">
                        "{data.tasteNotes}"
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 💬 THREADED REVISION CYCLES & TEAM DISCUSSION */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-500" />
                  <span>สมุดบันทึก R&D โต้ตอบปรับปรุงสูตร (Revision History & Team Feedback)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  ทีมงานทุกคนคอมเมนต์ได้ พร้อมแนบรูปถ่าย อัดเสียงสด และเจาะจงระดับความหวาน 0/50/100
                </p>
              </div>

              {activeCycle && (
                <button
                  type="button"
                  onClick={() => setIsClosingCycle(true)}
                  className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>สรุป & ปิดประเด็นรอบนี้</span>
                </button>
              )}
            </div>

            {/* Modal for closing active cycle */}
            {isClosingCycle && (
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                    ประกาศผลการอ่านคอมเมนต์รอบนี้ และเปิดรอบพัฒนาใหม่
                  </span>
                  <button type="button" onClick={() => setIsClosingCycle(false)} className="text-xs text-slate-400 hover:text-slate-600">
                    ยกเลิก
                  </button>
                </div>
                <textarea
                  value={cycleSummary}
                  onChange={(e) => setCycleSummary(e.target.value)}
                  placeholder="เขียนข้อสรุปผลการเทสต์ (เช่น: เคาะเปลี่ยนจากน้ำตาลทรายเป็นน้ำเชื่อมดอกมะพร้าว GI ต่ำ และลดความฝาดลง 15%)..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={nextCycleTitle}
                  onChange={(e) => setNextCycleTitle(e.target.value)}
                  placeholder="หัวข้อรอบพัฒนาถัดไป (เช่น: รอบที่ 2: ปรับความเย็นแก้ว 22oz หรือเว้นว่างหากจบสมบูรณ์)"
                  className="w-full text-xs p-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleConfirmCloseCycle}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  ยืนยันปิดประเด็นรอบนี้
                </button>
              </div>
            )}

            {/* Closed Cycles (Historical Accordion) */}
            {closedCycles.map((cycle) => (
              <div key={cycle.cycleNumber} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 p-3.5 space-y-2 opacity-90">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-[10px]">
                      ปิดประเด็นแล้ว
                    </span>
                    <strong className="text-slate-700 dark:text-slate-300">{cycle.title}</strong>
                  </div>
                  <span className="text-[10px] text-slate-400">ปิดโดย {cycle.closedBy}</span>
                </div>

                {cycle.summary && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    📌 <strong>ข้อสรุปของรอบนี้:</strong> {cycle.summary}
                  </div>
                )}

                {/* Closed Cycle Comments */}
                <div className="pl-4 space-y-2 border-l-2 border-slate-200 dark:border-slate-700">
                  {cycle.comments.map((comm) => (
                    <div key={comm.id} className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{comm.authorName}:</span>
                        <span>{comm.content}</span>
                        {comm.sweetnessTarget && comm.sweetnessTarget !== 'all' && (
                          <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-600 text-[10px] font-mono">
                            หวาน {comm.sweetnessTarget}%
                          </span>
                        )}
                      </div>
                      {comm.photoUrl && (
                        <a href={comm.photoUrl} target="_blank" rel="noreferrer" className="inline-block mt-1">
                          <img src={comm.photoUrl} alt="รูปแนบ" className="w-20 h-20 rounded-lg object-cover border border-slate-200" />
                        </a>
                      )}
                      {comm.voiceUrl && (
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 max-w-sm mt-1">
                          <audio controls src={comm.voiceUrl} className="w-full h-7" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Active Cycle (Current Discussions) */}
            {activeCycle && (
              <div className="rounded-2xl border-2 border-indigo-500/30 bg-white dark:bg-slate-900 p-4 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <strong className="text-xs sm:text-sm text-slate-900 dark:text-white">
                      {activeCycle.title}
                    </strong>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    เปิดรอบโดย {activeCycle.createdBy}
                  </span>
                </div>

                {/* Comments List with Rich Media */}
                <div className="space-y-3">
                  {activeCycle.comments.length === 0 ? (
                    <div className="text-xs text-slate-400 text-center py-4 italic">
                      ยังไม่มีความคิดเห็นในรอบนี้ ร่วมชิมแล้วพิมพ์คอมเมนต์ เสนอแนะ หรืออัดเสียงได้เลยครับ
                    </div>
                  ) : (
                    activeCycle.comments.map((comm) => {
                      const commentLiked = (comm.likes || []).includes(currentUser.id);
                      return (
                        <div key={comm.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          {comm.authorAvatar ? (
                            <img src={comm.authorAvatar} alt={comm.authorName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {comm.authorName.charAt(0)}
                            </div>
                          )}

                          <div className="flex-1 space-y-1.5 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-800 dark:text-white">
                                  {comm.authorName}
                                </span>
                                {comm.sweetnessTarget && comm.sweetnessTarget !== 'all' ? (
                                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                                    หวาน {comm.sweetnessTarget}%
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 text-[10px]">
                                    ภาพรวมทั้งแก้ว
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {new Date(comm.createdAt).toLocaleDateString('th-TH')}
                              </span>
                            </div>

                            {comm.content && (
                              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                                {comm.content}
                              </p>
                            )}

                            {/* Attached Photo */}
                            {comm.photoUrl && (
                              <div className="pt-1">
                                <a
                                  href={comm.photoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs max-w-[200px] hover:opacity-90 transition-opacity"
                                >
                                  <img src={comm.photoUrl} alt="รูปแนบคอมเมนต์" className="w-full h-auto max-h-36 object-cover" />
                                </a>
                              </div>
                            )}

                            {/* Attached Voice Note Audio Player */}
                            {comm.voiceUrl && (
                              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1 max-w-sm">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                                  <Mic className="w-3 h-3 text-indigo-600 animate-pulse" />
                                  <span>เสียงบันทึกข้อคิดเห็น R&D {comm.duration ? `(${comm.duration} วินาที)` : ''}</span>
                                </div>
                                <audio controls src={comm.voiceUrl} className="w-full h-7" />
                              </div>
                            )}

                            <div className="flex items-center gap-3 pt-1">
                              <button
                                type="button"
                                onClick={() => onToggleCommentLike(comm.id)}
                                className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                                  commentLiked ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                                }`}
                              >
                                <ThumbsUp className={`w-3 h-3 ${commentLiked ? 'fill-current' : ''}`} />
                                <span>{(comm.likes || []).length > 0 ? (comm.likes || []).length : 'ถูกใจ'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Add Comment Input Form with Photo & Live Voice Recording */}
                <form onSubmit={handlePostComment} className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-medium">ระดับความหวาน:</span>
                      <select
                        value={sweetnessTarget}
                        onChange={(e) => setSweetnessTarget(e.target.value as any)}
                        className="text-xs p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
                      >
                        <option value="all">ภาพรวมทั้งสูตร</option>
                        <option value="0">เฉพาะ หวาน 0% (ไม่หวาน)</option>
                        <option value="50">เฉพาะ หวาน 50% (หวานน้อย)</option>
                        <option value="100">เฉพาะ หวาน 100% (หวานปกติ)</option>
                      </select>
                    </div>

                    {/* Media Actions: Photo & Live Mic */}
                    <div className="flex items-center gap-2">
                      {/* Photo Attachment Input */}
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
                        className="h-7 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors inline-flex items-center gap-1"
                        title="แนบรูปถ่ายประกอบคอมเมนต์"
                      >
                        <Camera className="w-3.5 h-3.5 text-indigo-600" />
                        <span>แนบรูป</span>
                      </button>

                      {/* Live Voice Recording Button */}
                      <button
                        type="button"
                        onClick={toggleLiveVoiceRecording}
                        className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                          isRecording
                            ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-500/30'
                            : 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                        }`}
                        title={isRecording ? 'กดเพื่อหยุดอัดและแนบเสียง' : 'กดเพื่อเริ่มอัดเสียงสด'}
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-3 h-3 fill-white" />
                            <span>หยุดอัด ({recordingSeconds}s)</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-3.5 h-3.5 text-indigo-600" />
                            <span>อัดเสียงสด</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Attachment Preview Chips */}
                  {(commentPhotoUrl || commentVoiceUrl || isUploadingAttachment) && (
                    <div className="flex items-center gap-2 flex-wrap p-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                      {isUploadingAttachment && (
                        <div className="flex items-center gap-1.5 text-indigo-600 font-bold">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>กำลังอัปโหลดไฟล์แนบ...</span>
                        </div>
                      )}

                      {commentPhotoUrl && (
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600">
                          <img src={commentPhotoUrl} alt="" className="w-5 h-5 rounded object-cover" />
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-[11px]">รูปถ่ายพร้อมแนบ</span>
                          <button
                            type="button"
                            onClick={() => setCommentPhotoUrl(null)}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {commentVoiceUrl && (
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600">
                          <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-[11px]">
                            เสียงที่อัด ({commentVoiceDuration || 0}s)
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setCommentVoiceUrl(null);
                              setCommentVoiceDuration(undefined);
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
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={`พิมพ์ความคิดเห็นสำหรับสูตรนี้ (${currentUser.name || currentUser.alias})...`}
                      className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      type="submit"
                      disabled={!commentText.trim() && !commentPhotoUrl && !commentVoiceUrl}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ส่งคอมเมนต์</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] px-3.5 sm:px-4 sm:pb-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between sticky bottom-0 z-10 shrink-0 text-xs">
          <div className="text-slate-500 flex items-center gap-2">
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{item.code}</span>
            <span>·</span>
            <span>สถานะ: <strong className="text-slate-800 dark:text-white">{item.status}</strong></span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ==========================================
// NEW LAB ITEM MODAL
// ==========================================
export function LabItemFormModal({
  item,
  currentUser,
  onClose,
  onSave,
}: {
  item?: LabItem;
  currentUser: any;
  onClose: () => void;
  onSave: (item: Partial<LabItem>) => Promise<void>;
}) {
  const recordId = useRef(item?.id || `lab-${crypto.randomUUID()}`);
  const [type, setType] = useState<LabItemType>(item?.type || 'drink');
  const [code, setCode] = useState(item?.code || `RD-${Math.floor(100 + Math.random() * 900)}`);
  const [name, setName] = useState(item?.name || '');
  const [nameEn, setNameEn] = useState(item?.nameEn || '');

  // Category with on-the-fly add mode
  const [category, setCategory] = useState(item?.category || 'ชานมพรีเมียม & ชาสด');
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');
  const [categoryList, setCategoryList] = useState<string[]>([
    ...(item?.category ? [item.category] : []),
    'ชานมพรีเมียม & ชาสด',
    'วิตามิน & คราฟต์โซดา',
    'ชาผลไม้ & ชีสโฟม',
    'มัทฉะ & สเปเชียลตี้',
    'ท็อปปิ้ง & เจลลี่',
  ]);

  // Primary 1-image picker (Upload vs URL)
  const [photoMode, setPhotoMode] = useState<'upload' | 'url'>('upload');
  const [photoUrl, setPhotoUrl] = useState(item?.photoUrl || '');
  const [isCompressingPrimary, setIsCompressingPrimary] = useState(false);

  // Multimedia Gallery
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>(item?.galleryPhotos || []);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNoteEntry[]>((item?.audioNotes || []).map(a => ({ id: a.id, url: a.url, durationSec: a.duration || 0 })));
  const [videos, setVideos] = useState<string[]>(item?.videos || []);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Inputs: start strictly empty per user requirement
  const [description, setDescription] = useState(String(item?.description ?? ''));
  const [costIngredient, setCostIngredient] = useState(String(item?.costIngredientThb ?? ''));
  const [costPackaging, setCostPackaging] = useState(String(item?.costPackagingThb ?? ''));
  const [suggestedPrice, setSuggestedPrice] = useState(String(item?.suggestedPriceThb ?? ''));

  // Sweetness matrix inputs (empty strings)
  const [syrup0, setSyrup0] = useState(String(item?.sweetnessLevels?.zero?.syrupMl ?? ''));
  const [brix0, setBrix0] = useState(String(item?.sweetnessLevels?.zero?.brix ?? ''));
  const [notes0, setNotes0] = useState(String(item?.sweetnessLevels?.zero?.tasteNotes ?? ''));

  const [syrup50, setSyrup50] = useState(String(item?.sweetnessLevels?.half?.syrupMl ?? ''));
  const [brix50, setBrix50] = useState(String(item?.sweetnessLevels?.half?.brix ?? ''));
  const [notes50, setNotes50] = useState(String(item?.sweetnessLevels?.half?.tasteNotes ?? ''));

  const [syrup100, setSyrup100] = useState(String(item?.sweetnessLevels?.full?.syrupMl ?? ''));
  const [brix100, setBrix100] = useState(String(item?.sweetnessLevels?.full?.brix ?? ''));
  const [notes100, setNotes100] = useState(String(item?.sweetnessLevels?.full?.tasteNotes ?? ''));

  const [technicalSpecs, setTechnicalSpecs] = useState<NonNullable<LabItem['technicalSpecs']>>(item?.technicalSpecs || {});
  const [ingredients, setIngredients] = useState<LabItem['ingredients']>(item?.ingredients || []);
  const [sweetnessExtra, setSweetnessExtra] = useState(item?.sweetnessLevels);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrimaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressingPrimary(true);
      const compressed = await compressImageFile(file, 960, 0.75);
      setPhotoUrl(compressed);
    } catch (err: any) {
      alert(err.message || 'ไม่สามารถประมวลผลรูปภาพได้');
    } finally {
      setIsCompressingPrimary(false);
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
          recordType: 'lead_lab_video',
          recordTitle: name || 'R&D Video',
        });
        if (videoData) {
          setVideos((prev) => [...prev, videoData]);
        }
      }
    } catch (err: any) {
      alert(err.message || 'ไม่สามารถอัปโหลดวิดีโอได้');
    } finally {
      setIsVideoLoading(false);
    }
  };

  const handleAddNewCategory = () => {
    const trimmed = newCatInput.trim();
    if (!trimmed) return;
    if (!categoryList.includes(trimmed)) {
      setCategoryList((prev) => [...prev, trimmed]);
    }
    setCategory(trimmed);
    setNewCatInput('');
    setIsAddingNewCat(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    // Strict validation
    if (!type) {
      alert('กรุณาเลือกประเภทสูตร *');
      return;
    }
    if (!name.trim()) {
      alert('กรุณากรอกชื่อสูตร (ไทย) *');
      return;
    }
    if (!code.trim()) {
      alert('กรุณากรอกรหัสสูตร R&D *');
      return;
    }
    if (!category.trim()) {
      alert('กรุณาระบุหรือเลือกหมวดหมู่ *');
      return;
    }
    if (!photoUrl.trim()) {
      alert('กรุณาอัปโหลดหรือระบุภาพถ่ายแก้วจริง / ภาพปกหลัก *');
      return;
    }

    setIsSubmitting(true);
    const costIng = parseFloat(costIngredient) || 0;
    const costPkg = parseFloat(costPackaging) || 0;
    const price = parseFloat(suggestedPrice) || 0;

    const audioNotesFormatted = voiceNotes.map((vn, idx) => item?.audioNotes?.find(a => a.id === vn.id) || ({
      id: vn.id || `audio-${idx}-${crypto.randomUUID()}`,
      url: vn.url,
      duration: vn.durationSec,
      title: `เสียงบรรยายรสสัมผัส & เทคนิคชง R&D #${idx + 1}`,
      authorName: currentUser.alias || currentUser.name,
      createdAt: new Date().toISOString(),
    }));

    const nowIso = new Date().toISOString();

    try { await onSave({
      ...item,
      expectedUpdatedAt: item?.updatedAt,
      id: recordId.current,
      type,
      code: code.trim(),
      name: name.trim(),
      nameEn: nameEn.trim() || name.trim(),
      category: category.trim(),
      photoUrl: photoUrl.trim(),
      galleryPhotos,
      audioNotes: audioNotesFormatted,
      videos,
      description: description.trim(),
      status: item?.status || 'testing',
      costIngredientThb: costIng,
      costPackagingThb: costPkg,
      costTotalThb: costIng + costPkg,
      suggestedPriceThb: price,
      sweetnessLevels: {
        zero: {
          ...(sweetnessExtra?.zero || { sweetenerType: '', baseLiquidMl: 0, caloriesKcal: 0, brix: 0, tasteNotes: '', syrupMl: 0 }),
          level: '0',
          label: item?.sweetnessLevels?.zero?.label || 'หวาน 0% (ไม่หวาน)',
          syrupMl: parseFloat(syrup0) || 0,
          brix: parseFloat(brix0) || 0,
          tasteNotes: notes0.trim(),
        },
        half: {
          ...(sweetnessExtra?.half || { sweetenerType: '', baseLiquidMl: 0, caloriesKcal: 0, brix: 0, tasteNotes: '', syrupMl: 0 }),
          level: '50',
          label: item?.sweetnessLevels?.half?.label || 'หวาน 50% (หวานน้อย)',
          syrupMl: parseFloat(syrup50) || 0,
          brix: parseFloat(brix50) || 0,
          tasteNotes: notes50.trim(),
        },
        full: {
          ...(sweetnessExtra?.full || { sweetenerType: '', baseLiquidMl: 0, caloriesKcal: 0, brix: 0, tasteNotes: '', syrupMl: 0 }),
          level: '100',
          label: item?.sweetnessLevels?.full?.label || 'หวาน 100% (หวานปกติ)',
          syrupMl: parseFloat(syrup100) || 0,
          brix: parseFloat(brix100) || 0,
          tasteNotes: notes100.trim(),
        },
      },
      technicalSpecs,
      ingredients,
      likedBy: item?.likedBy || [currentUser.id],
      createdById: item?.createdById || currentUser.id,
      createdByName: item?.createdByName || currentUser.alias || currentUser.name,
      createdByAvatar: item?.createdByAvatar || currentUser.avatar,
      createdAt: item?.createdAt || nowIso,
      updatedAt: nowIso,
      revisionCycles: item?.revisionCycles || [
        {
          cycleNumber: 1,
          title: 'รอบที่ 1: ตั้งสูตรทดลองเริ่มต้นและเทสต์ระดับความหวาน 0/50/100',
          status: 'active',
          createdAt: nowIso,
          createdBy: currentUser.alias || currentUser.name,
          comments: [],
        },
      ],
    }); } finally { setIsSubmitting(false); }
  };

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="แบบฟอร์มสูตร" data-no-pull-refresh className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-white">
              {item ? 'แก้ไขสูตร R&D' : 'สร้างสูตรใหม่ใน LEAD LAB 🧪'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ประเภท <span className="text-rose-500 font-black">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              >
                <option value="drink">🥤 เครื่องดื่ม (Drink)</option>
                <option value="topping">🍮 ท็อปปิ้ง (Topping)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                รหัสสูตร R&D <span className="text-rose-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="เช่น RD-101"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ชื่อสูตร (ไทย) <span className="text-rose-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                aria-label="ชื่อสูตรภาษาไทย" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น ชาไทยคั่วโบราณซิกเนเจอร์"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ชื่อภาษาอังกฤษ
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="เช่น Signature Thai Roasted Tea"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
          </div>

          {/* Category with On-The-Fly Addition */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                หมวดหมู่ <span className="text-rose-500 font-black">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsAddingNewCat(!isAddingNewCat)}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>{isAddingNewCat ? 'เลือกจากรายการ' : '+ เพิ่มหมวดหมู่ใหม่'}</span>
              </button>
            </div>

            {isAddingNewCat ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  placeholder="พิมพ์ชื่อหมวดหมู่ใหม่..."
                  className="flex-1 p-2 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  ใช้หมวดนี้
                </button>
              </div>
            ) : (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
              >
                {categoryList.map((cat, cIdx) => (
                  <option key={cIdx} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>

          {/* 🖼️ PRIMARY COVER PHOTO (Clean Label without parenthetical text) */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  ภาพถ่ายแก้วจริง / ภาพปกหลัก <span className="text-rose-500 font-black">*</span>
                </span>
              </label>
              <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setPhotoMode('upload')}
                  className={`px-2.5 py-1 transition-colors ${
                    photoMode === 'upload' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  📷 อัปโหลดรูป
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoMode('url')}
                  className={`px-2.5 py-1 transition-colors ${
                    photoMode === 'url' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  🌐 ลิงก์ URL
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 border border-slate-300 dark:border-slate-600 shadow-xs relative">
                {photoUrl ? (
                  <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Camera className="w-5 h-5" />
                  </div>
                )}
                {isCompressingPrimary && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[9px] text-white font-bold">
                    ประมวลผล...
                  </div>
                )}
              </div>

              <div className="flex-1">
                {photoMode === 'upload' ? (
                  <div>
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 cursor-pointer font-bold text-slate-700 dark:text-slate-200 shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-indigo-600" />
                      <span>เลือกรูปจากเครื่อง / ถ่ายภาพ</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePrimaryUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 mt-1">รองรับ JPG, PNG, WebP บีบอัดอัตโนมัติ</p>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">วาง URL รูปภาพที่เปิดสาธารณะ</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 📸 MULTIMEDIA (Clean Label, AudioRecorder & VideoPlayer like Supplier Modal) */}
          <div className="p-3.5 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-xs">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>พาร์ทมัลติมีเดียเพิ่มเติม</span>
              </label>
              <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] cursor-pointer shadow-xs">
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
                <span className="text-[10px] font-bold text-slate-400">รูปภาพเพิ่มเติม ({galleryPhotos.length} รูป)</span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryPhotos.map((photo, pIdx) => (
                    <div key={pIdx} className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs group">
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setGalleryPhotos(p => p.filter((_, i) => i !== pIdx))}
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
            <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/50 space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block flex items-center gap-1.5 text-[11px]">
                <Mic className="w-3.5 h-3.5 text-indigo-600" />
                <span>วอยซ์เสียงบรรยายสูตร R&D (อัดเสียงสด / บันทึกได้หลายคลิป)</span>
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
            <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-[11px]">
                  <Video className="w-3.5 h-3.5 text-indigo-600" />
                  <span>คลิปวิดีโอสาธิตการชง ({videos.length})</span>
                </span>
                <label className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 cursor-pointer">
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
                        badgeLabel={`คลิป #${vIdx + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => setVideos(prev => prev.filter((_, i) => i !== vIdx))}
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

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">คำอธิบายและแนวคิด</label>
            <textarea
              aria-label="คำอธิบายสูตร" value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="จุดเด่น รสสัมผัส แหล่งที่มาของใบชาและวัตถุดิบ..."
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          {/* Sweetness Matrix Input Box (Empty defaults) */}
          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 space-y-2">
            <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-xs">
              กำหนดค่าความหวาน & Brix เริ่มต้น (0% / 50% / 100%)
            </span>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              {/* 0% */}
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">หวาน 0%</span>
                <input
                  type="number"
                  value={syrup0}
                  onChange={(e) => setSyrup0(e.target.value)}
                  placeholder="ไซรัป ml"
                  className="w-full p-1 border rounded text-[11px] bg-slate-50 dark:bg-slate-900"
                />
                <input
                  type="number"
                  step="0.1"
                  value={brix0}
                  onChange={(e) => setBrix0(e.target.value)}
                  placeholder="Brix °Bx"
                  className="w-full p-1 border rounded text-[11px] bg-slate-50 dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={notes0}
                  onChange={(e) => setNotes0(e.target.value)}
                  placeholder="โน้ตรสสัมผัส"
                  className="w-full p-1 border rounded text-[10px] bg-slate-50 dark:bg-slate-900"
                />
              </div>

              {/* 50% */}
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-indigo-300 dark:border-indigo-700 space-y-1">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">หวาน 50%</span>
                <input
                  type="number"
                  value={syrup50}
                  onChange={(e) => setSyrup50(e.target.value)}
                  placeholder="ไซรัป ml"
                  className="w-full p-1 border rounded text-[11px] bg-slate-50 dark:bg-slate-900"
                />
                <input
                  type="number"
                  step="0.1"
                  value={brix50}
                  onChange={(e) => setBrix50(e.target.value)}
                  placeholder="Brix °Bx"
                  className="w-full p-1 border rounded text-[11px] bg-slate-50 dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={notes50}
                  onChange={(e) => setNotes50(e.target.value)}
                  placeholder="โน้ตรสสัมผัส"
                  className="w-full p-1 border rounded text-[10px] bg-slate-50 dark:bg-slate-900"
                />
              </div>

              {/* 100% */}
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">หวาน 100%</span>
                <input
                  type="number"
                  value={syrup100}
                  onChange={(e) => setSyrup100(e.target.value)}
                  placeholder="ไซรัป ml"
                  className="w-full p-1 border rounded text-[11px] bg-slate-50 dark:bg-slate-900"
                />
                <input
                  type="number"
                  step="0.1"
                  value={brix100}
                  onChange={(e) => setBrix100(e.target.value)}
                  placeholder="Brix °Bx"
                  className="w-full p-1 border rounded text-[11px] bg-slate-50 dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={notes100}
                  onChange={(e) => setNotes100(e.target.value)}
                  placeholder="โน้ตรสสัมผัส"
                  className="w-full p-1 border rounded text-[10px] bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Financials (Empty defaults) */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ต้นทุนวัตถุดิบ (฿)</label>
              <input
                type="number"
                step="0.5"
                value={costIngredient}
                onChange={(e) => setCostIngredient(e.target.value)}
                placeholder="0.00"
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ต้นทุนแก้ว/ฝา (฿)</label>
              <input
                type="number"
                step="0.5"
                value={costPackaging}
                onChange={(e) => setCostPackaging(e.target.value)}
                placeholder="0.00"
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">ราคาขายแนะนำ (฿)</label>
              <input
                type="number"
                step="1"
                value={suggestedPrice}
                onChange={(e) => setSuggestedPrice(e.target.value)}
                placeholder="0.00"
                className="w-full p-2 rounded-xl border border-emerald-300 dark:border-emerald-700 font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <fieldset className="rounded-xl border p-3 space-y-3"><legend className="font-bold px-1">ข้อมูลสูตรเพิ่มเติม</legend>
            <div className="grid grid-cols-2 gap-3">{([['brewingTempC','อุณหภูมิสกัด (°C)'],['extractionTimeSec','เวลาสกัด (วินาที)'],['teaLeavesG','ใบชา / ผง (g)'],['waterMl','น้ำสกัด (ml)'],['shelfLifeHours','อายุจัดเก็บ (ชั่วโมง)']] as const).map(([key,label]) => <label key={key}>{label}<input aria-label={label} type="number" min="0" step="any" value={technicalSpecs[key] ?? ''} onChange={e => setTechnicalSpecs(p => ({...p,[key]: e.target.value === '' ? undefined : Number(e.target.value)}))} className="mt-1 w-full border rounded-lg p-2" /></label>)}</div>
            {item && (['zero','half','full'] as const).map((key, index) => <div key={key} className="border-t pt-3 grid grid-cols-2 gap-2"><b className="col-span-2">รายละเอียดหวาน {[0,50,100][index]}%</b><label>สารให้ความหวาน<input aria-label={`สารให้ความหวาน ${key}`} value={sweetnessExtra?.[key].sweetenerType || ''} onChange={e => setSweetnessExtra(p => p ? ({...p,[key]:{...p[key],sweetenerType:e.target.value}}) : p)} className="w-full border rounded-lg p-2" /></label>{([['baseLiquidMl','ของเหลวหลัก (ml)'],['milkOrMixerMl','นม / มิกเซอร์ (ml)'],['caloriesKcal','พลังงาน (kcal)']] as const).map(([field,label]) => <label key={field}>{label}<input aria-label={`${label} ${key}`} type="number" min="0" step="any" value={sweetnessExtra?.[key][field] ?? ''} onChange={e => setSweetnessExtra(p => p ? ({...p,[key]:{...p[key],[field]:Number(e.target.value)}}) : p)} className="w-full border rounded-lg p-2" /></label>)}</div>)}
            <div className="flex justify-between items-center"><b>วัตถุดิบและสัดส่วน</b><button type="button" onClick={() => setIngredients(p => [...p,{name:'',quantity:0,unit:'g',costThb:0}])} className="text-indigo-700 font-bold">+ เพิ่มวัตถุดิบ</button></div>
            {ingredients.map((ing,index) => <div key={index} className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t pt-2"><label>วัตถุดิบ<input aria-label={`วัตถุดิบ ${index+1}`} required value={ing.name} onChange={e => setIngredients(p => p.map((v,i) => i === index ? {...v,name:e.target.value} : v))} className="w-full border p-2 rounded-lg" /></label><label>ปริมาณ<input type="number" min="0" step="any" value={ing.quantity} onChange={e => setIngredients(p => p.map((v,i) => i === index ? {...v,quantity:Number(e.target.value)} : v))} className="w-full border p-2 rounded-lg" /></label><label>หน่วย<input value={ing.unit} onChange={e => setIngredients(p => p.map((v,i) => i === index ? {...v,unit:e.target.value} : v))} className="w-full border p-2 rounded-lg" /></label><label>ต้นทุน (฿)<input type="number" min="0" step="any" value={ing.costThb} onChange={e => setIngredients(p => p.map((v,i) => i === index ? {...v,costThb:Number(e.target.value)} : v))} className="w-full border p-2 rounded-lg" /></label><button type="button" onClick={() => setIngredients(p => p.filter((_,i) => i !== index))} className="text-rose-600 text-left">นำวัตถุดิบออก</button></div>)}
          </fieldset>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
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
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20"
            >
              {isSubmitting ? 'กำลังบันทึก...' : item ? 'บันทึกการแก้ไขสูตร' : 'บันทึกสูตรเข้า R&D'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
