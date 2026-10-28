import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapView } from './MapView';
import { SeenByBadge } from './SeenByBadge';
import { SupplierCard } from './SupplierCard';
import { StoreInspoCard } from './StoreInspoCard';
import { SupplierRecord, StoreInspoRecord } from '../types';
import {
  Factory,
  Coffee,
  Flame,
  MessageSquare,
  ArrowUpRight,
  Layers,
  Users,
  Settings,
  Zap,
  MapPin,
  CornerDownRight,
} from 'lucide-react';

interface DashboardOverviewProps {
  onSelectSupplier: (s: SupplierRecord) => void;
  onSelectStore: (st: StoreInspoRecord) => void;
  onOpenNewSupplier: () => void;
  onOpenNewStoreInspo: () => void;
  onShareToLine?: (item: SupplierRecord | StoreInspoRecord) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onSelectSupplier,
  onSelectStore,
  onShareToLine,
}) => {
  const {
    suppliers,
    drinkStores,
    categories,
    storeCategories,
    quickTagsList,
    setActiveTab,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    setSelectedStatus,
    countryFilter,
    setCountryFilter,
    currentUser,
  } = useApp();

  const [feedFilter, setFeedFilter] = useState<'all' | 'suppliers' | 'drink_stores'>('all');

  // Filter based on country if selected
  const activeSuppliers = suppliers.filter(
    (s) => countryFilter === 'all' || s.country === countryFilter
  );
  const activeStores = drinkStores.filter(
    (d) => countryFilter === 'all' || d.country === countryFilter
  );

  // Metrics
  const totalSuppliers = activeSuppliers.length;
  const totalStores = activeStores.length;
  const totalShortlisted = activeSuppliers.filter((s) => s.status === 'shortlisted').length;
  const totalHandoffActive =
    activeSuppliers.filter((s) => s.handoffStage && s.handoffStage !== 'ordered').length +
    activeStores.filter((d) => d.handoffStage && d.handoffStage !== 'ordered').length;

  // Combined Social Feed sorted by updatedAt descending
  const combinedFeed: Array<SupplierRecord | StoreInspoRecord> = [
    ...(feedFilter === 'all' || feedFilter === 'suppliers' ? activeSuppliers : []),
    ...(feedFilter === 'all' || feedFilter === 'drink_stores' ? activeStores : []),
  ].sort(
    (a, b) =>
      new Date(b.updatedAt || b.creator.timestamp).getTime() -
      new Date(a.updatedAt || a.creator.timestamp).getTime()
  );

  // Live Chat / Discussion Feed across all items
  interface ChatFeedEntry {
    id: string;
    author: string;
    authorAvatar: string;
    text: string;
    timestamp: string;
    isReply?: boolean;
    replyToAuthor?: string;
    targetItem: SupplierRecord | StoreInspoRecord;
    targetName: string;
    targetType: 'supplier' | 'drink_store';
  }

  const chatFeed: ChatFeedEntry[] = [];

  activeSuppliers.forEach((sup) => {
    (sup.reviewerNotes || []).forEach((note) => {
      chatFeed.push({
        id: note.id,
        author: note.author,
        authorAvatar: note.authorAvatar,
        text: note.text,
        timestamp: note.timestamp,
        isReply: false,
        targetItem: sup,
        targetName: sup.name,
        targetType: 'supplier',
      });
      (note.replies || []).forEach((rep) => {
        chatFeed.push({
          id: rep.id,
          author: rep.author,
          authorAvatar: rep.authorAvatar,
          text: rep.text,
          timestamp: rep.timestamp,
          isReply: true,
          replyToAuthor: rep.replyToAuthor,
          targetItem: sup,
          targetName: sup.name,
          targetType: 'supplier',
        });
      });
    });
  });

  activeStores.forEach((st) => {
    (st.reviewerNotes || []).forEach((note) => {
      chatFeed.push({
        id: note.id,
        author: note.author,
        authorAvatar: note.authorAvatar,
        text: note.text,
        timestamp: note.timestamp,
        isReply: false,
        targetItem: st,
        targetName: st.storeName,
        targetType: 'drink_store',
      });
      (note.replies || []).forEach((rep) => {
        chatFeed.push({
          id: rep.id,
          author: rep.author,
          authorAvatar: rep.authorAvatar,
          text: rep.text,
          timestamp: rep.timestamp,
          isReply: true,
          replyToAuthor: rep.replyToAuthor,
          targetItem: st,
          targetName: st.storeName,
          targetType: 'drink_store',
        });
      });
    });
  });

  chatFeed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleOpenChatTarget = (entry: ChatFeedEntry) => {
    if (entry.targetType === 'supplier') {
      onSelectSupplier(entry.targetItem as SupplierRecord);
    } else {
      onSelectStore(entry.targetItem as StoreInspoRecord);
    }
  };

  return (
    <div id="dashboard-section" className="max-w-6xl mx-auto px-3 sm:px-5 py-3.5 space-y-4 animate-in fade-in">
      {/* 1. Minimal Compact Hero Bar: Title Left + Compact Country Switcher Right (ไม่มีปุ่ม + ซ้ำซ้อน) */}
      <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE</span>
          </span>
          <h1 className="font-extrabold text-sm sm:text-base text-slate-950 tracking-tight truncate">
            ศูนย์ปฏิบัติการสำรวจซัพพลายเออร์ & เรฟร้านน้ำ
          </h1>
        </div>

        {/* Compact Country Filter Pill on Right */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 text-[11px] shrink-0">
          <button
            type="button"
            onClick={() => setCountryFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              countryFilter === 'all'
                ? 'bg-white text-slate-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            ทั้งหมด ({suppliers.length + drinkStores.length})
          </button>
          <button
            type="button"
            onClick={() => setCountryFilter('CN')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              countryFilter === 'CN'
                ? 'bg-white text-slate-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            🇨🇳 จีน ({suppliers.filter((s) => s.country !== 'TH').length + drinkStores.filter((d) => d.country !== 'TH').length})
          </button>
          <button
            type="button"
            onClick={() => setCountryFilter('TH')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              countryFilter === 'TH'
                ? 'bg-white text-slate-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            🇹🇭 ไทย ({suppliers.filter((s) => s.country === 'TH').length + drinkStores.filter((d) => d.country === 'TH').length})
          </button>
        </div>
      </div>

      {/* 2. Bento KPI Grid (4 Minimalist Clickable Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('all');
            setSelectedStatus('all');
            setActiveTab('suppliers');
          }}
          className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-950/40 text-left transition-all shadow-2xs hover:shadow-sm active:scale-[0.99]"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <Factory className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-900 flex items-center gap-0.5 transition-colors">
              <span>เปิดดู</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight">
            {totalSuppliers}
          </div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">🏭 ซัพพลายเออร์</div>
          <div className="text-[11px] text-slate-400 truncate">โรงงาน อุปกรณ์ & วัตถุดิบ</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('drink_stores')}
          className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-950/40 text-left transition-all shadow-2xs hover:shadow-sm active:scale-[0.99]"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60">
              <Coffee className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-900 flex items-center gap-0.5 transition-colors">
              <span>เปิดดู</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight">
            {totalStores}
          </div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">🧋 ร้านน้ำ & เรฟเมนู</div>
          <div className="text-[11px] text-slate-400 truncate">รีวิวรสชาติ แก้ว & กิมมิก</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedStatus('shortlisted');
            setActiveTab('suppliers');
          }}
          className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-orange-400 text-left transition-all shadow-2xs hover:shadow-sm active:scale-[0.99]"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-200/60">
              <Flame className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200/60">
              ตัวเต็งพร้อมดีล
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight">
            {totalShortlisted}
          </div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">คัดเข้ารอบ (Shortlisted)</div>
          <div className="text-[11px] text-slate-400 truncate">แตะเพื่อดูรายการตัวเต็ง</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('handoff')}
          className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 text-left transition-all shadow-2xs hover:shadow-sm active:scale-[0.99]"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600 flex items-center gap-0.5 transition-colors">
              <span>ไปหน้าส่งต่อ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight">
            {totalHandoffActive}
          </div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">งานรับช่วงต่อทีมไทย</div>
          <div className="text-[11px] text-slate-400 truncate">แยกพาร์ท ซัพ & ร้านน้ำเรฟ</div>
        </button>
      </div>

      {/* 3. แผนที่มอนิเตอร์พิกัดสำรวจจริง (Live Map Monitor — แสดงก่อนหน้าโซเชียลฟีด) */}
      <div id="map-section" className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                🗺️ แผนที่มอนิเตอร์พิกัดจริง (Live Map Monitor)
              </h3>
              <p className="text-[11px] text-slate-500">
                รวมพิกัดทุกซัพพลายเออร์ (ขอบเขียว 🏭) และทุกร้านน้ำเรฟ (ขอบส้ม 🧋) — แตะที่หมุดรูปภาพเพื่อเปิดดูดีเทลทันที
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            พิกัดทั้งหมด {suppliers.length + drinkStores.length} จุด
          </span>
        </div>

        <MapView
          onSelectSupplier={onSelectSupplier}
          onSelectStoreInspo={onSelectStore}
        />
      </div>

      {/* 4. รายการสำรวจล่าสุด (วางไว้ใต้แผนที่ รูปแบบ Facebook Feed) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h2 className="font-extrabold text-sm sm:text-base text-slate-950 flex items-center gap-2">
              <span>📰 ฟีดรายการสำรวจล่าสุด (Social Feed)</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {combinedFeed.length} โพสต์
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              กดถูกใจ คอมเมนต์โต้ตอบแบบต่อเนื่อง ดูภาพอัลบั้มทั้งหมด และเช็กสถานะ "อ่านแล้ว" ได้ทันที
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFeedFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                feedFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              ทั้งหมด ({activeSuppliers.length + activeStores.length})
            </button>
            <button
              type="button"
              onClick={() => setFeedFilter('suppliers')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                feedFilter === 'suppliers' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              🏭 ซัพ ({activeSuppliers.length})
            </button>
            <button
              type="button"
              onClick={() => setFeedFilter('drink_stores')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                feedFilter === 'drink_stores' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              🧋 ร้านน้ำ ({activeStores.length})
            </button>
          </div>
        </div>

        {/* Facebook-Style Feed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {combinedFeed.slice(0, 6).map((item) =>
            item.type === 'supplier' ? (
              <SupplierCard
                key={item.id}
                supplier={item as SupplierRecord}
                onSelect={onSelectSupplier}
                onShareToLine={(s) => onShareToLine && onShareToLine(s)}
              />
            ) : (
              <StoreInspoCard
                key={item.id}
                store={item as StoreInspoRecord}
                onSelect={onSelectStore}
                onShareToLine={(st) => onShareToLine && onShareToLine(st)}
              />
            )
          )}
        </div>

        {combinedFeed.length > 6 && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('suppliers')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
            >
              ดูซัพพลายเออร์ทั้งหมด ({activeSuppliers.length}) →
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('drink_stores')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-all"
            >
              ดูร้านน้ำ & เรฟทั้งหมด ({activeStores.length}) →
            </button>
          </div>
        )}
      </div>

      {/* 5. Two-Column Interactive Hub: Live Chat Destination Feed + Separate Category Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 7 Cols: Live Discussions & Comments */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
                <MessageSquare className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  แชทและความเห็นทีมงานล่าสุด ({chatFeed.length})
                </h3>
                <p className="text-[11px] text-slate-500">
                  คุยกันอยู่รายการไหน แตะที่ข้อความเพื่อเปิดดูดีเทลและตอบกลับได้ทันที
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {chatFeed.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                ยังไม่มีข้อความสนทนา แตะที่รายการเพื่อเริ่มคอมเมนต์ได้เลย
              </div>
            ) : (
              chatFeed.slice(0, 8).map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleOpenChatTarget(chat)}
                  className="group p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/70 hover:border-slate-300 transition-all cursor-pointer flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <img
                      src={chat.authorAvatar}
                      alt={chat.author}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-2xs shrink-0 mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-extrabold text-slate-900">{chat.author}</span>
                        {chat.isReply && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-blue-600">
                            <CornerDownRight className="w-2.5 h-2.5" />
                            <span>
                              ตอบกลับ {chat.replyToAuthor ? `@${chat.replyToAuthor}` : ''} ใน
                            </span>
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                            chat.targetType === 'supplier'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200/70'
                              : 'bg-amber-50 text-amber-800 border-amber-200/70'
                          }`}
                        >
                          {chat.targetName}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 line-clamp-2 mt-1 leading-relaxed">
                        “{chat.text}”
                      </p>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(chat.timestamp).toLocaleTimeString('th-TH', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          น.
                        </span>
                        <SeenByBadge viewedBy={chat.targetItem.viewedBy} size="sm" />
                      </div>
                    </div>
                  </div>

                  <span className="shrink-0 p-1.5 rounded-lg bg-white border border-slate-200/80 text-slate-400 group-hover:text-slate-950 group-hover:border-slate-300 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 5 Cols: Separate Category Explorer (ซัพ vs ร้านน้ำ) + Quick-Tap Tags */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    แยกหมวดหมู่ชัดเจน (ซัพ vs ร้านน้ำ)
                  </h3>
                  <p className="text-[11px] text-slate-500">แตะเพื่อกรองดูแต่ละประเภททันที</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('categories')}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5"
              >
                <span>ดูทุกหมวด</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Supplier Categories */}
            <div>
              <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
                🏭 หมวดซัพพลายเออร์ ({categories.length})
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.slice(0, 4).map((cat) => {
                  const count = activeSuppliers.filter((s) => s.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActiveTab('suppliers');
                      }}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200/70 text-left transition-all flex items-center justify-between group"
                    >
                      <span className="text-[11px] font-bold truncate pr-1">{cat}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-white text-slate-700 group-hover:bg-white/20 group-hover:text-white shrink-0">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drink Store Categories */}
            <div>
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                🧋 หมวดร้านน้ำ & เรฟ ({storeCategories.length})
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {storeCategories.slice(0, 4).map((cat) => {
                  const count = activeStores.filter((d) => d.storeCategory === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActiveTab('drink_stores');
                      }}
                      className="p-2 rounded-xl bg-amber-50/50 hover:bg-amber-600 hover:text-white border border-amber-200/70 text-left transition-all flex items-center justify-between group"
                    >
                      <span className="text-[11px] font-bold truncate pr-1">{cat}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-white text-amber-800 group-hover:bg-white/20 group-hover:text-white shrink-0">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom: Dynamic Quick-Tap Tags */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>แตะเลือกจุดเด่นทางลัด:</span>
              </span>
              {(currentUser.role === 'admin' || currentUser.role === 'editor') && (
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>ตั้งค่าปุ่มทางลัด</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {quickTagsList.slice(0, 8).map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(isSelected ? 'all' : tag);
                      setActiveTab('suppliers');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                      isSelected
                        ? 'bg-slate-950 text-white border-slate-950'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                    }`}
                  >
                    ✓ {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
