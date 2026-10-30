import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
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
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LabItem, LabFormulaStatus, LabItemType, SweetnessDetail } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { printLeadLabSpecReport, shareLeadLabItem } from '../utils/labAndStoreExport';

export function LeadLabView({
  onOpenStoreSimulator,
}: {
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
    return leadLabItems.find((x) => x.id === selectedItem.id) || selectedItem;
  }, [leadLabItems, selectedItem]);

  // Stats count
  const stats = useMemo(() => {
    const total = leadLabItems.length;
    const approved = leadLabItems.filter((x) => x.status === 'approved').length;
    const testing = leadLabItems.filter((x) => x.status === 'testing').length;
    const shelved = leadLabItems.filter((x) => x.status === 'shelved').length;
    return { total, approved, testing, shelved };
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
              onClick={() => setIsNewModalOpen(true)}
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

        {/* Quick Stat Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">
              {stats.total}
            </div>
            <div>
              <div className="text-slate-400 font-medium">สูตรทั้งหมด</div>
              <div className="text-white font-bold">ในระบบ R&D</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              {stats.approved}
            </div>
            <div>
              <div className="text-slate-400 font-medium">ผ่านเกณฑ์อนุมัติ</div>
              <div className="text-emerald-400 font-bold">พร้อมขายหน้าร้าน</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              {stats.testing}
            </div>
            <div>
              <div className="text-slate-400 font-medium">กำลังปรับสูตร</div>
              <div className="text-amber-400 font-bold">เทสต์ & พัฒนา</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
              {stats.shelved}
            </div>
            <div>
              <div className="text-slate-400 font-medium">พักสูตร / ชะลอไว้</div>
              <div className="text-rose-400 font-bold">คลังบทเรียน</div>
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
              ทั้งหมด
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
              🥤 เครื่องดื่ม
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
              🍮 ท็อปปิ้ง
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
              ทุกสถานะ
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
              ผ่านอนุมัติ
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
              กำลังทดลอง
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
              พักสูตร
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
      {activeDetailItem && (
        <LabDetailModal
          item={activeDetailItem}
          currentUser={currentUser}
          users={users}
          onClose={() => setSelectedItem(null)}
          onToggleLike={() => toggleLikeLeadLabItem(activeDetailItem.id)}
          onAddComment={(content, target) => addLeadLabComment(activeDetailItem.id, content, target)}
          onToggleCommentLike={(commentId) => toggleLikeLeadLabComment(activeDetailItem.id, commentId)}
          onCycleRevision={(summary, nextTitle) => cycleLeadLabRevision(activeDetailItem.id, summary, nextTitle)}
          onSetStatus={(status) => setLeadLabStatus(activeDetailItem.id, status)}
          onRecordView={() => recordLeadLabItemView(activeDetailItem.id)}
          onDelete={() => {
            if (window.confirm(`ยืนยันการลบสูตร "${activeDetailItem.name}" หรือไม่?`)) {
              deleteLeadLabItem(activeDetailItem.id);
              setSelectedItem(null);
            }
          }}
        />
      )}

      {/* ➕ CREATE NEW RECIPE MODAL */}
      {isNewModalOpen && (
        <NewLabItemModal
          currentUser={currentUser}
          onClose={() => setIsNewModalOpen(false)}
          onSave={async (itemData) => {
            await saveLeadLabItem(itemData);
            setIsNewModalOpen(false);
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
  const [selectedSweetness, setSelectedSweetness] = useState<'0' | '50' | '100'>('50');

  const isLiked = (item.likedBy || []).includes(currentUserId);
  const activeSweetness =
    selectedSweetness === '0'
      ? item.sweetnessLevels.zero
      : selectedSweetness === '50'
      ? item.sweetnessLevels.half
      : item.sweetnessLevels.full;

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
  const grossProfitPercent =
    item.suggestedPriceThb > 0
      ? Math.round(((item.suggestedPriceThb - item.costTotalThb) / item.suggestedPriceThb) * 100)
      : 0;

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

        {/* Status Badge & GP */}
        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-bold text-[10px] ${statusBadge.bg}`}>
            <StatusIcon className="w-3 h-3" />
            <span>{statusBadge.shortLabel}</span>
          </span>
          <div className="text-right">
            <span className="text-[9px] text-slate-400">GP </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">{grossProfitPercent}%</span>
          </div>
        </div>

        {/* 🍬 Sweetness Matrix Quick Selector */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Droplet className="w-2.5 h-2.5 text-indigo-500" />
              <span>หวาน:</span>
            </span>
            <div className="flex gap-1">
              {(['0', '50', '100'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedSweetness(lvl)}
                  className={`px-1.5 py-0.5 rounded font-mono font-bold text-[9px] transition-colors ${
                    selectedSweetness === lvl
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lvl}%
                </button>
              ))}
            </div>
          </div>

          {/* Active sweetness summary */}
          <div className="text-[10px] font-mono flex items-center justify-between text-slate-600 dark:text-slate-300 pt-0.5">
            <span>{activeSweetness.syrupMl}ml</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{activeSweetness.brix}°Bx</span>
            <span>{activeSweetness.caloriesKcal}kcal</span>
          </div>
          <p className="text-[9px] text-slate-500 dark:text-slate-400 italic truncate">
            "{activeSweetness.tasteNotes}"
          </p>
        </div>

        {/* Cost & Price Row */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <div>
            <div className="text-[9px] text-slate-400 font-medium">ทุน/แก้ว</div>
            <div className="font-mono font-bold text-slate-700 dark:text-slate-300">
              ฿{item.costTotalThb.toFixed(0)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-slate-400 font-medium">ราคาขาย</div>
            <div className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400">
              ฿{item.suggestedPriceThb.toFixed(0)}
            </div>
          </div>
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
}: {
  item: LabItem;
  currentUser: any;
  users?: any[];
  onClose: () => void;
  onToggleLike: () => void;
  onAddComment: (content: string, target?: 'all' | '0' | '50' | '100') => void;
  onToggleCommentLike: (commentId: string) => void;
  onCycleRevision: (summary: string, nextTitle?: string) => void;
  onSetStatus: (status: LabFormulaStatus) => void;
  onRecordView?: () => void;
  onDelete: () => void;
}) {
  const [commentText, setCommentText] = useState('');
  const [sweetnessTarget, setSweetnessTarget] = useState<'all' | '0' | '50' | '100'>('all');
  const [isClosingCycle, setIsClosingCycle] = useState(false);
  const [cycleSummary, setCycleSummary] = useState('');
  const [nextCycleTitle, setNextCycleTitle] = useState('');

  React.useEffect(() => {
    onRecordView?.();
  }, []);

  React.useEffect(() => {
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

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText.trim(), sweetnessTarget);
    setCommentText('');
  };

  const handleConfirmCloseCycle = () => {
    if (!cycleSummary.trim()) {
      alert('กรุณากรอกข้อสรุปการอ่านคอมเมนต์รอบนี้');
      return;
    }
    onCycleRevision(cycleSummary.trim(), nextCycleTitle.trim() || undefined);
    setIsClosingCycle(false);
    setCycleSummary('');
    setNextCycleTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold">
              {item.code}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white leading-tight">
                {item.name}
              </h2>
              <div className="text-xs text-slate-500 font-mono">{item.nameEn} · {item.category}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shareLeadLabItem(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-xs"
              title="แชร์สูตรไปยัง LINE"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">แชร์ LINE</span>
            </button>
            <button
              type="button"
              onClick={() => printLeadLabSpecReport(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
              title="พิมพ์เอกสารสเปกสูตร R&D หรือบันทึก PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">สเปก R&D (PDF)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Top Section: Photo + Overview + Status Manager */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-3">
              <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative shadow-sm">
                <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={onToggleLike}
                  className={`absolute top-3 right-3 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-md transition-transform active:scale-90 ${
                    isLiked ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{(item.likedBy || []).length} ไลก์</span>
                </button>
              </div>

              {/* Viewers Log */}
              {item.viewLogs && item.viewLogs.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-800/40 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>เข้าดู {item.viewLogs.length} คน:</span>
                  <div className="flex -space-x-1.5 overflow-hidden ml-auto">
                    {item.viewLogs.slice(0, 5).map((v, vIdx) => (
                      <img key={vIdx} src={v.avatar} alt={v.alias} title={`${v.alias} (${v.viewCount || 1} ครั้ง)`} className="w-4 h-4 rounded-full border border-white dark:border-slate-800 object-cover" />
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

              {/* Delete button */}
              <button
                type="button"
                onClick={onDelete}
                className="w-full text-xs text-rose-600 hover:text-rose-700 py-1.5 font-semibold text-center hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบสูตรนี้ออกจากระบบ</span>
              </button>
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
                      <a key={pIdx} href={photo} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity">
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      </a>
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
                  ทุกไอดีสามารถคอมเมนต์ เจาะจงระดับความหวาน 0/50/100 และกดไลก์ได้
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
                    <div key={comm.id} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{comm.authorName}:</span>
                      <span>{comm.content}</span>
                      {comm.sweetnessTarget && comm.sweetnessTarget !== 'all' && (
                        <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-600 text-[10px] font-mono">
                          หวาน {comm.sweetnessTarget}%
                        </span>
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

                {/* Comments List */}
                <div className="space-y-3">
                  {activeCycle.comments.length === 0 ? (
                    <div className="text-xs text-slate-400 text-center py-4 italic">
                      ยังไม่มีความคิดเห็นในรอบนี้ ร่วมชิมแล้วพิมพ์คอมเมนต์เสนอแนะได้เลยครับ
                    </div>
                  ) : (
                    activeCycle.comments.map((comm) => {
                      const commentLiked = (comm.likes || []).includes(currentUser.id);
                      return (
                        <div key={comm.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          {comm.authorAvatar ? (
                            <img src={comm.authorAvatar} alt={comm.authorName} className="w-7 h-7 rounded-full object-cover" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                              {comm.authorName.charAt(0)}
                            </div>
                          )}

                          <div className="flex-1 space-y-1">
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

                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                              {comm.content}
                            </p>

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

                {/* Add Comment Input Form */}
                <form onSubmit={handlePostComment} className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">ระบุระดับความหวานที่คอมเมนต์:</span>
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
                      disabled={!commentText.trim()}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
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
      </div>
    </div>
  );
}

// ==========================================
// NEW LAB ITEM MODAL
// ==========================================
function NewLabItemModal({
  currentUser,
  onClose,
  onSave,
}: {
  currentUser: any;
  onClose: () => void;
  onSave: (item: Partial<LabItem>) => Promise<void>;
}) {
  const [type, setType] = useState<LabItemType>('drink');
  const [code, setCode] = useState(`RD-${Math.floor(100 + Math.random() * 900)}`);
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState('ชานมพรีเมียม & ชาสด');

  // Primary 1-image picker (URL vs Upload)
  const [photoMode, setPhotoMode] = useState<'upload' | 'url'>('upload');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80');
  const [isCompressingPrimary, setIsCompressingPrimary] = useState(false);

  // Unlimited Media Gallery
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [audioNoteUrl, setAudioNoteUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [description, setDescription] = useState('');
  const [costIngredient, setCostIngredient] = useState('15.00');
  const [costPackaging, setCostPackaging] = useState('3.50');
  const [suggestedPrice, setSuggestedPrice] = useState('55.00');

  // Sweetness matrix inputs
  const [syrup0, setSyrup0] = useState('0');
  const [brix0, setBrix0] = useState('3.0');
  const [notes0, setNotes0] = useState('สัมผัสชาแท้ คลีน สดชื่น ไร้น้ำตาล');

  const [syrup50, setSyrup50] = useState('15');
  const [brix50, setBrix50] = useState('8.5');
  const [notes50, setNotes50] = useState('หวานละมุน นุ่มนวล กลมกล่อม แนะนำอันดับ 1');

  const [syrup100, setSyrup100] = useState('30');
  const [brix100, setBrix100] = useState('13.5');
  const [notes100, setNotes100] = useState('หวานจัดจ้าน สดชื่น กลมกล่อมเต็มคำ');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('กรุณาระบุชื่อสูตร');
      return;
    }
    setIsSubmitting(true);
    const costIng = parseFloat(costIngredient) || 15;
    const costPkg = parseFloat(costPackaging) || 3.5;
    const price = parseFloat(suggestedPrice) || 55;

    await onSave({
      type,
      code: code.trim(),
      name: name.trim(),
      nameEn: nameEn.trim() || name.trim(),
      category,
      photoUrl: photoUrl.trim(),
      galleryPhotos,
      audioNotes: audioNoteUrl.trim()
        ? [
            {
              id: `audio-${crypto.randomUUID()}`,
              url: audioNoteUrl.trim(),
              title: 'เสียงบรรยายรสสัมผัส & เทคนิคชง R&D',
              authorName: currentUser.alias || currentUser.name,
              createdAt: new Date().toISOString(),
            },
          ]
        : [],
      videos: videoUrl.trim() ? [videoUrl.trim()] : [],
      description: description.trim(),
      status: 'testing',
      costIngredientThb: costIng,
      costPackagingThb: costPkg,
      costTotalThb: costIng + costPkg,
      suggestedPriceThb: price,
      sweetnessLevels: {
        zero: {
          level: '0',
          label: 'หวาน 0% (ไม่หวาน)',
          syrupMl: parseFloat(syrup0) || 0,
          sweetenerType: 'ไม่ใส่น้ำตาล',
          baseLiquidMl: 180,
          brix: parseFloat(brix0) || 3.0,
          caloriesKcal: 85,
          tasteNotes: notes0,
        },
        half: {
          level: '50',
          label: 'หวาน 50% (หวานน้อย)',
          syrupMl: parseFloat(syrup50) || 15,
          sweetenerType: 'น้ำเชื่อมดอกมะพร้าว GI ต่ำ',
          baseLiquidMl: 170,
          brix: parseFloat(brix50) || 8.5,
          caloriesKcal: 160,
          tasteNotes: notes50,
        },
        full: {
          level: '100',
          label: 'หวาน 100% (หวานปกติ)',
          syrupMl: parseFloat(syrup100) || 30,
          sweetenerType: 'น้ำเชื่อมดอกมะพร้าว',
          baseLiquidMl: 160,
          brix: parseFloat(brix100) || 13.5,
          caloriesKcal: 230,
          tasteNotes: notes100,
        },
      },
      technicalSpecs: {
        brewingTempC: 90,
        extractionTimeSec: 180,
        teaLeavesG: 12,
        waterMl: 180,
        shelfLifeHours: 6,
      },
      ingredients: [
        { name: 'วัตถุดิบหลัก R&D', quantity: 1, unit: 'ชุด', costThb: costIng },
      ],
      likedBy: [currentUser.id],
      revisionCycles: [
        {
          cycleNumber: 1,
          title: 'รอบที่ 1: ตั้งสูตรทดลองเริ่มต้นและเทสต์ระดับความหวาน 0/50/100',
          status: 'active',
          createdAt: new Date().toISOString(),
          createdBy: currentUser.alias || currentUser.name,
          comments: [],
        },
      ],
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-white">
              สร้างสูตรใหม่ใน LEAD LAB 🧪
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">ประเภท</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              >
                <option value="drink">🥤 เครื่องดื่ม (Drink)</option>
                <option value="topping">🍮 ท็อปปิ้ง (Topping)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">รหัสสูตร R&D</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">ชื่อสูตร (ไทย) *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น ชาไทยคั่วโบราณซิกเนเจอร์"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">ชื่อภาษาอังกฤษ</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="เช่น Signature Thai Roasted Tea"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">หมวดหมู่</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
            >
              <option value="ชานมพรีเมียม & ชาสด">ชานมพรีเมียม & ชาสด</option>
              <option value="วิตามิน & คราฟต์โซดา">วิตามิน & คราฟต์โซดา</option>
              <option value="ชาผลไม้ & ชีสโฟม">ชาผลไม้ & ชีสโฟม</option>
              <option value="มัทฉะ & สเปเชียลตี้">มัทฉะ & สเปเชียลตี้</option>
              <option value="ท็อปปิ้ง & เจลลี่">ท็อปปิ้ง & เจลลี่</option>
            </select>
          </div>

          {/* 🖼️ PRIMARY COVER PHOTO (1 PHOTO) WITH TOGGLE URL VS UPLOAD */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-indigo-600" />
                <span>ภาพถ่ายแก้วจริง / ภาพปกหลัก (1 ภาพ มีผลต่อการแสดงผลหน้าร้าน)</span>
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

          {/* 📸 UNLIMITED MEDIA GALLERY & VOICE / VIDEO */}
          <div className="p-3.5 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>พาร์ทมัลติมีเดียเพิ่มเติม (แกลเลอรีรูปภาพไม่จำกัด · บันทึกเสียง · คลิป)</span>
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
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryPhotos.map((photo, pIdx) => (
                  <div key={pIdx} className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs group">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGalleryPhotos(p => p.filter((_, i) => i !== pIdx))}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-80 hover:opacity-100"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Audio & Video inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1">
                  <Mic className="w-3 h-3 text-indigo-600" />
                  <span>ลิงก์ไฟล์เสียง / Voice Note R&D</span>
                </label>
                <input
                  type="url"
                  value={audioNoteUrl}
                  onChange={(e) => setAudioNoteUrl(e.target.value)}
                  placeholder="https://... หรือแนบลิงก์เสียง"
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                />
              </div>
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1">
                  <Video className="w-3 h-3 text-indigo-600" />
                  <span>ลิงก์คลิปวิดีโอสาธิตการชง</span>
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://... ลิงก์คลิปวิดีโอ"
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">คำอธิบายและแนวคิด</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="จุดเด่น รสสัมผัส แหล่งที่มาของใบชาและวัตถุดิบ..."
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          {/* Sweetness Matrix Input Box */}
          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 space-y-2">
            <span className="font-bold text-indigo-900 dark:text-indigo-300 block">
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
                  className="w-full p-1 border rounded text-[11px]"
                />
                <input
                  type="number"
                  step="0.1"
                  value={brix0}
                  onChange={(e) => setBrix0(e.target.value)}
                  placeholder="Brix °Bx"
                  className="w-full p-1 border rounded text-[11px]"
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
                  className="w-full p-1 border rounded text-[11px]"
                />
                <input
                  type="number"
                  step="0.1"
                  value={brix50}
                  onChange={(e) => setBrix50(e.target.value)}
                  placeholder="Brix °Bx"
                  className="w-full p-1 border rounded text-[11px]"
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
                  className="w-full p-1 border rounded text-[11px]"
                />
                <input
                  type="number"
                  step="0.1"
                  value={brix100}
                  onChange={(e) => setBrix100(e.target.value)}
                  placeholder="Brix °Bx"
                  className="w-full p-1 border rounded text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Financials */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">ต้นทุนวัตถุดิบ (฿)</label>
              <input
                type="number"
                step="0.5"
                value={costIngredient}
                onChange={(e) => setCostIngredient(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">ต้นทุนแก้ว/ฝา (฿)</label>
              <input
                type="number"
                step="0.5"
                value={costPackaging}
                onChange={(e) => setCostPackaging(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">ราคาขายแนะนำ (฿)</label>
              <input
                type="number"
                step="1"
                value={suggestedPrice}
                onChange={(e) => setSuggestedPrice(e.target.value)}
                className="w-full p-2 rounded-xl border border-emerald-300 dark:border-emerald-700 font-mono font-bold text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>

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
              {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกสูตรเข้า R&D'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
