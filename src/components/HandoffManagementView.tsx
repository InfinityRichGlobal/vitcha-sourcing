import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord, StoreInspoRecord, LocationRecord, HandoffStage } from '../types';
import { SeenByBadge } from './SeenByBadge';
import {
  Users,
  Clock,
  ChevronRight,
  CheckCircle2,
  Send,
  FlaskConical,
  DollarSign,
  Sparkles,
  Factory,
  Coffee,
  Phone,
  MessageSquare,
  MapPin,
  Eye,
  LayoutGrid,
  ArrowRight,
  Pencil,
} from 'lucide-react';

interface HandoffManagementViewProps {
  onSelectItem: (item: SupplierRecord | StoreInspoRecord | LocationRecord) => void;
}

export const HandoffManagementView: React.FC<HandoffManagementViewProps> = ({ onSelectItem }) => {
  const {
    suppliers,
    drinkStores,
    locations,
    updateHandoff,
    users,
    convertCnyToThb,
    canEditItems,
    canComment,
    openEditItem,
  } = useApp();

  const realUsers = users.filter((u) => !['user-beam', 'user-ann', 'user-mook'].includes(u.id));

  // Dedicated Sub-Page Stage Selector (แยกหน้าย่อยแต่ละสเตจให้ชัดเจน + โหมดดูภาพรวม)
  const [activeStagePage, setActiveStagePage] = useState<HandoffStage | 'overview'>('awaiting');

  // Filter by Part: 'all' | 'suppliers' | 'drink_stores' | 'locations'
  const [partTab, setPartTab] = useState<'all' | 'suppliers' | 'drink_stores' | 'locations'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<'all' | 'CN' | 'TH'>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  // Combine suppliers, drink stores, and locations
  const allItems: Array<
    (SupplierRecord | StoreInspoRecord | LocationRecord) & {
      itemType: 'supplier' | 'drink_store' | 'location';
    }
  > = [
    ...suppliers.map((s) => ({ ...s, itemType: 'supplier' as const })),
    ...drinkStores.map((d) => ({ ...d, itemType: 'drink_store' as const })),
    ...locations.map((l) => ({ ...l, itemType: 'location' as const })),
  ];

  // Stage definitions (5+1 Operational Handoff Parts)
  const stages: Array<{
    key: HandoffStage;
    stepNum: number;
    title: string;
    shortTitle: string;
    color: string;
    activeTabClass: string;
    icon: React.ReactNode;
    desc: string;
  }> = [
    {
      key: 'awaiting',
      stepNum: 1,
      title: 'พาร์ท 1: รอรับช่วงต่อ (Awaiting Handover)',
      shortTitle: '1. รอรับช่วงต่อ',
      color: 'bg-slate-100 text-slate-800 border-slate-300',
      activeTabClass: 'bg-slate-900 text-white border-slate-900 shadow-sm',
      icon: <Clock className="w-4 h-4" />,
      desc: 'รายการที่สำรวจหน้างานแล้ว รอจ่ายงานให้ผู้รับผิดชอบทีมไทยรับช่วงต่อ',
    },
    {
      key: 'rfq_sent',
      stepNum: 2,
      title: 'พาร์ท 2: ขอสเปก / ส่งใบเสนอราคา (RFQ & Specs)',
      shortTitle: '2. ขอสเปก / ส่ง RFQ',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      activeTabClass: 'bg-blue-600 text-white border-blue-600 shadow-sm',
      icon: <Send className="w-4 h-4" />,
      desc: 'กำลังทัก WeChat / LINE ขอใบเสนอราคา FOB ค่าขนส่ง และตรวจเช็กสเปกไฟฟ้า/วัสดุ',
    },
    {
      key: 'sample_test',
      stepNum: 3,
      title: 'พาร์ท 3: สั่งตัวอย่างทดสอบ Lab / R&D',
      shortTitle: '3. ทดสอบตัวอย่าง Lab/R&D',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      activeTabClass: 'bg-purple-600 text-white border-purple-600 shadow-sm',
      icon: <FlaskConical className="w-4 h-4" />,
      desc: 'นำตัวอย่างใบชา วัตถุดิบ แก้ว หรือเครื่องจักรจริงมาทดสอบคุณภาพและถอดสูตรในห้องแล็บ',
    },
    {
      key: 'negotiate',
      stepNum: 4,
      title: 'พาร์ท 4: ต่อรองราคา & เงื่อนไข MOQ',
      shortTitle: '4. ต่อรองราคา & MOQ',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      activeTabClass: 'bg-amber-600 text-white border-amber-600 shadow-sm',
      icon: <DollarSign className="w-4 h-4" />,
      desc: 'เจรจาส่วนลดล็อตใหญ่ ขั้นต่ำการสั่งผลิต (MOQ) และการรับประกันอะไหล่',
    },
    {
      key: 'approved',
      stepNum: 5,
      title: 'พาร์ท 5: ตัวเต็งอนุมัติ (Approved Shortlist)',
      shortTitle: '5. ตัวเต็งอนุมัติ',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      activeTabClass: 'bg-emerald-600 text-white border-emerald-600 shadow-sm',
      icon: <CheckCircle2 className="w-4 h-4" />,
      desc: 'ผ่านการคัดเลือกและอนุมัติสเปกแล้ว พร้อมออกใบสั่งซื้อ (PO) หรือขึ้นเมนูขายจริง',
    },
    {
      key: 'ordered',
      stepNum: 6,
      title: 'พาร์ท 6: สั่งซื้อ / ดำเนินการสำเร็จ (Ordered)',
      shortTitle: '6. สั่งซื้อสำเร็จ',
      color: 'bg-teal-50 text-teal-800 border-teal-300',
      activeTabClass: 'bg-teal-700 text-white border-teal-700 shadow-sm',
      icon: <Sparkles className="w-4 h-4" />,
      desc: 'ออก PO ชำระมัดจำ หรือนำสูตร/อุปกรณ์เข้าใช้งานในสาขาเรียบร้อยแล้ว',
    },
  ];

  // Filter items by partTab, assignee, and country
  const filteredItems = allItems.filter((item) => {
    const matchesPart =
      partTab === 'all' ||
      (partTab === 'suppliers' && item.itemType === 'supplier') ||
      (partTab === 'drink_stores' && item.itemType === 'drink_store') ||
      (partTab === 'locations' && item.itemType === 'location');
    const matchesAssignee = assigneeFilter === 'all' || item.assignedTo === assigneeFilter;
    const matchesCountry = countryFilter === 'all' || item.country === countryFilter;
    return matchesPart && matchesAssignee && matchesCountry;
  });

  const getStageItems = (stageKey: HandoffStage) => {
    return filteredItems.filter((item) => (item.handoffStage || 'awaiting') === stageKey);
  };

  const handleSetStage = (
    item: SupplierRecord | StoreInspoRecord | LocationRecord,
    targetStage: HandoffStage,
    itemType: 'supplier' | 'drink_store' | 'location'
  ) => {
    updateHandoff(item.id, itemType, {
      handoffStage: targetStage,
      status:
        targetStage === 'approved'
          ? 'shortlisted'
          : targetStage === 'ordered'
          ? 'ordered'
          : targetStage === 'rfq_sent'
          ? 'rfq_sent'
          : undefined,
    });
  };

  const handleAdvanceStage = (
    item: SupplierRecord | StoreInspoRecord | LocationRecord,
    currentStage: HandoffStage,
    itemType: 'supplier' | 'drink_store' | 'location'
  ) => {
    const stageOrder: HandoffStage[] = [
      'awaiting',
      'rfq_sent',
      'sample_test',
      'negotiate',
      'approved',
      'ordered',
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    const nextStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 1)];
    handleSetStage(item, nextStage, itemType);
  };

  const handleSaveHandoffNote = async (
    item: SupplierRecord | StoreInspoRecord | LocationRecord,
    itemType: 'supplier' | 'drink_store' | 'location'
  ) => {
    if (!await updateHandoff(item.id, itemType, {
      handoffNotes: noteDraft.trim(),
    })) return;
    setEditingNoteId(null);
  };

  const currentStageObj = stages.find((s) => s.key === activeStagePage);

  // Render an individual Handoff Card with full clarity
  const renderHandoffCard = (
    item: (SupplierRecord | StoreInspoRecord | LocationRecord) & {
      itemType: 'supplier' | 'drink_store' | 'location';
    },
    stageKey: HandoffStage
  ) => {
    const isSupplier = item.itemType === 'supplier';
    const isLocation = item.itemType === 'location';
    const sup = isSupplier ? (item as SupplierRecord) : null;
    const st = item.itemType === 'drink_store' ? (item as StoreInspoRecord) : null;
    const loc = isLocation ? (item as LocationRecord) : null;

    const title = isSupplier ? sup!.name : isLocation ? loc!.name : st!.storeName;
    const subCategory = isSupplier ? sup!.category : isLocation ? (loc!.zoneOrFloor || 'ทำเลสาขา') : st!.storeCategory || 'เรฟร้านน้ำ';
    const city = isSupplier ? sup!.marketOrCity : isLocation ? (loc!.location.addressText || 'พิกัดที่ตั้ง') : st!.city;

    const thumb = isSupplier
      ? sup!.photos?.storefrontAndAtmosphere?.[0] || sup!.catalogItems?.[0]?.photo
      : isLocation
      ? loc!.photos?.storefrontAndAtmosphere?.[0] || loc!.photos?.floorPlanAndSpecs?.[0]
      : st!.photos?.drinkCups?.[0] || st!.photos?.storefrontAndAtmosphere?.[0];

    const notesCount = (item.reviewerNotes || []).reduce(
      (sum, n) => sum + 1 + (n.replies?.length || 0),
      0
    );

    return (
      <div
        key={item.id}
        className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs transition-all space-y-3"
      >
        {/* Top Row: Thumbnail + Title + Category + Country */}
        <div
          onClick={() => onSelectItem(item)}
          className="flex items-start gap-3 cursor-pointer group"
        >
          {thumb && (
            <img
              src={thumb}
              alt={title}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-103 transition-transform"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 inline-flex items-center gap-1">
                <i className={`fa-solid fa-location-dot text-[9px] ${item.country === 'TH' ? 'text-sky-600' : 'text-rose-500'}`} />
                <span>{item.country === 'TH' ? 'ไทย' : 'จีน'}</span>
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                  isSupplier
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/70'
                    : isLocation
                    ? 'bg-sky-50 text-sky-800 border border-sky-200/70'
                    : 'bg-amber-50 text-amber-800 border border-amber-200/70'
                }`}
              >
                {isSupplier ? (
                  <i className="fa-solid fa-industry text-[9px] text-emerald-600" />
                ) : isLocation ? (
                  <i className="fa-solid fa-map-location-dot text-[9px] text-sky-600" />
                ) : (
                  <i className="fa-solid fa-mug-hot text-[9px] text-amber-600" />
                )}
                <span>{subCategory}</span>
              </span>
            </div>

            <h4 className="font-extrabold text-sm text-slate-900 truncate group-hover:text-sky-700">
              {title}
            </h4>

            <div className="flex items-center gap-1 text-xs text-slate-500 truncate mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{city || 'กวางโจว'}</span>
            </div>
          </div>
        </div>

        {/* Specific Technical / R&D Details Box */}
        {isSupplier && sup ? (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1.5">
            {sup.catalogItems && sup.catalogItems.length > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-800 truncate flex items-center gap-1.5">
                  <i className="fa-solid fa-box-open text-[11px] text-slate-500" />
                  <span>{sup.catalogItems[0].name || 'สินค้าหลัก'}</span>
                </span>
                {sup.catalogItems[0].priceRmb ? (
                  <span className="font-mono font-extrabold text-emerald-700 shrink-0">
                    ¥{sup.catalogItems[0].priceRmb} (≈
                    {convertCnyToThb(sup.catalogItems[0].priceRmb).toLocaleString()}฿)
                  </span>
                ) : sup.catalogItems[0].priceThb ? (
                  <span className="font-mono font-extrabold text-emerald-700 shrink-0">
                    ฿{sup.catalogItems[0].priceThb.toLocaleString()}
                  </span>
                ) : null}
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] text-slate-600 flex-wrap">
              {sup.wechatId && (
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                  WeChat: {sup.wechatId}
                </span>
              )}
              {sup.lineId && (
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                  LINE: {sup.lineId}
                </span>
              )}
              {sup.phone && (
                <span className="inline-flex items-center gap-1 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  {sup.phone}
                </span>
              )}
            </div>
          </div>
        ) : st ? (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1.5">
            {st.drinkItems && st.drinkItems.length > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-800 truncate flex items-center gap-1.5">
                  <i className="fa-solid fa-mug-hot text-[11px] text-amber-600" />
                  <span>{st.drinkItems[0].name || 'เมนูชิม'}</span>
                </span>
                {st.drinkItems[0].fitMenuTarget && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 truncate max-w-[160px]">
                    {st.drinkItems[0].fitMenuTarget}
                  </span>
                )}
              </div>
            )}
            {st.tastingNotes && (
              <p className="text-[11px] text-slate-600 line-clamp-2">“{st.tastingNotes}”</p>
            )}
          </div>
        ) : null}

        {/* Stage Switcher + Assignee + Follow-Up Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-100 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">
              พาร์ท / สเตจปัจจุบัน:
            </span>
            <select
              disabled={!canComment}
              value={item.handoffStage || 'awaiting'}
              onChange={(e) =>
                handleSetStage(item, e.target.value as HandoffStage, item.itemType)
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              {stages.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.shortTitle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">
              ผู้รับผิดชอบ:
            </span>
            <select
              disabled={!canComment}
              value={item.assignedTo || ''}
              onChange={(e) =>
                updateHandoff(item.id, item.itemType, {
                  assignedTo: e.target.value,
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="">(ยังไม่ระบุ)</option>
              {realUsers.map((u) => (
                <option key={u.id} value={u.alias}>
                  {u.alias}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">
              กำหนดติดตาม:
            </span>
            <input
              type="date"
              disabled={!canComment}
              value={item.targetFollowUpDate || ''}
              onChange={(e) =>
                updateHandoff(item.id, item.itemType, {
                  targetFollowUpDate: e.target.value,
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono text-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Handover Notes */}
        <div className="text-xs">
          {canComment && editingNoteId === item.id ? (
            <div className="space-y-1.5">
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="บันทึกผลการเจรจา / ทดสอบแล็บ / เงื่อนไขที่ตกลง..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                rows={2}
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={() => handleSaveHandoffNote(item, item.itemType)}
                  className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  บันทึกโน้ต
                </button>
                <button
                  onClick={() => setEditingNoteId(null)}
                  className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                if (!canComment) return;
                setEditingNoteId(item.id);
                setNoteDraft(item.handoffNotes || '');
              }}
              className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors"
              title="แตะเพื่อแก้ไขโน้ตการส่งมอบงาน"
            >
              <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-clipboard-check text-emerald-600 text-[11px]" />
                  <span>บันทึกการรับช่วงต่อ / ผลเจรจา:</span>
                </span>
                {canComment && <span className="text-emerald-700">แก้ไข</span>}
              </div>
              <p className="text-xs text-slate-800 mt-0.5">
                {item.handoffNotes || '(แตะเพื่อพิมพ์บันทึกผลการเจรจาหรือสั่งงานต่อ)'}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Bar: Seen-By + Comments + Detail Button + Advance Stage */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectItem(item)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold"
            >
              <MessageSquare className="w-3 h-3 text-blue-600" />
              <span>{notesCount}</span>
            </button>
            <SeenByBadge viewedBy={item.viewedBy} size="sm" />
          </div>

          <div className="flex items-center gap-1.5">
            {canEditItems && (
              <button
                type="button"
                onClick={() => openEditItem(item)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors"
                title="แก้ไขข้อมูลรายการนี้"
              >
                <Pencil className="w-3.5 h-3.5 text-amber-600" />
                <span>แก้ไข</span>
              </button>
            )}

            <button
              onClick={() => onSelectItem(item)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>เปิดดีเทลเต็ม</span>
            </button>

            {canComment && stageKey !== 'ordered' && (
              <button
                onClick={() => handleAdvanceStage(item, stageKey, item.itemType)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold active:scale-95 transition-all shadow-2xs"
              >
                <span>ส่งต่อพาร์ทถัดไป</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 space-y-4 animate-in fade-in">
      {/* Top Header & Sub-Page Stage Selector */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 shrink-0">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-sm">
              <Users className="w-4 h-4" />
            </span>
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900 whitespace-nowrap">
              ส่งต่องาน (Handoff)
            </h2>
          </div>

          {/* Filters: Part Type, Country & Assignee */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setPartTab('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  partTab === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                รวม ({suppliers.length + drinkStores.length + locations.length})
              </button>
              <button
                type="button"
                onClick={() => setPartTab('suppliers')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  partTab === 'suppliers' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-industry text-[10px]" />
                <span>ซัพ ({suppliers.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setPartTab('drink_stores')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  partTab === 'drink_stores' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-mug-hot text-[10px]" />
                <span>ร้านน้ำ ({drinkStores.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setPartTab('locations')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  partTab === 'locations' ? 'bg-sky-600 text-white shadow-2xs' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-map-location-dot text-[10px]" />
                <span>สถานที่ ({locations.length})</span>
              </button>
            </div>

            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setCountryFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  countryFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                ทุกประเทศ
              </button>
              <button
                type="button"
                onClick={() => setCountryFilter('CN')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                  countryFilter === 'CN' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-location-dot text-[10px] text-rose-500" />
                <span>จีน</span>
              </button>
              <button
                type="button"
                onClick={() => setCountryFilter('TH')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                  countryFilter === 'TH' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-location-dot text-[10px] text-sky-600" />
                <span>ไทย</span>
              </button>
            </div>

            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="all">ผู้รับผิดชอบทั้งหมด</option>
              {realUsers.map((u) => (
                <option key={u.id} value={u.alias}>
                  {u.alias}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dedicated Sub-Page Navigation Bar (แยกหน้าย่อยของแต่ละพาร์ทให้ชัดเจน) */}
        <div className="pt-3 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 mb-2">
            เลือกเปิดหน้าย่อยแต่ละพาร์ทการรับช่วงต่อ:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {stages.map((st) => {
              const count = getStageItems(st.key).length;
              const isActive = activeStagePage === st.key;
              return (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setActiveStagePage(st.key)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                    isActive
                      ? st.activeTabClass
                      : 'bg-slate-50/80 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="opacity-90">{st.icon}</span>
                    <span
                      className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-800 border border-slate-200'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold leading-tight">{st.shortTitle}</div>
                </button>
              );
            })}

            {/* Overview All Columns Tab */}
            <button
              type="button"
              onClick={() => setActiveStagePage('overview')}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                activeStagePage === 'overview'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <LayoutGrid className="w-4 h-4" />
                <span
                  className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-full ${
                    activeStagePage === 'overview'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {filteredItems.length}
                </span>
              </div>
              <div className="text-xs font-extrabold leading-tight">ดูรวมทุกพาร์ท</div>
            </button>
          </div>
        </div>
      </div>

      {/* Dedicated Single-Stage Sub-Page View */}
      {activeStagePage !== 'overview' && currentStageObj ? (
        <div className="space-y-4">
          {/* Sub-Page Header Banner */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl border ${currentStageObj.color}`}>
                {currentStageObj.icon}
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {currentStageObj.title}
                </h3>
                <p className="text-xs text-slate-500">{currentStageObj.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800">
                ทั้งหมดในหน้านี้: <strong>{getStageItems(currentStageObj.key).length}</strong> รายการ
              </span>

              {currentStageObj.stepNum < 6 && (
                <button
                  type="button"
                  onClick={() => setActiveStagePage(stages[currentStageObj.stepNum].key)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1"
                >
                  <span>ไปพาร์ท {currentStageObj.stepNum + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid for This Dedicated Stage Sub-Page */}
          {getStageItems(currentStageObj.key).length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
              <div className="text-sm font-bold text-slate-700">
                ยังไม่มีรายการใน "{currentStageObj.shortTitle}"
              </div>
              <p className="text-xs text-slate-400">
                สามารถกดเลือกดูพาร์ทอื่นๆ ด้านบน หรือส่งต่อรายการจากพาร์ทก่อนหน้ามาที่หน้านี้ได้
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getStageItems(currentStageObj.key).map((item) =>
                renderHandoffCard(item, currentStageObj.key)
              )}
            </div>
          )}
        </div>
      ) : (
        /* Overview All Stages Mode */
        <div className="space-y-6">
          {stages.map((stage) => {
            const itemsInStage = getStageItems(stage.key);
            return (
              <div
                key={stage.key}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-2 rounded-xl border ${stage.color}`}>{stage.icon}</span>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{stage.title}</h3>
                      <p className="text-xs text-slate-500">{stage.desc}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStagePage(stage.key)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1"
                  >
                    <span>เปิดหน้าย่อยพาร์ทนี้ ({itemsInStage.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {itemsInStage.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    ไม่มีรายการในพาร์ทนี้
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {itemsInStage.map((item) => renderHandoffCard(item, stage.key))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
