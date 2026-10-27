import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord, StoreInspoRecord, HandoffStage } from '../types';
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
} from 'lucide-react';

interface HandoffManagementViewProps {
  onSelectItem: (item: SupplierRecord | StoreInspoRecord) => void;
}

export const HandoffManagementView: React.FC<HandoffManagementViewProps> = ({ onSelectItem }) => {
  const { suppliers, drinkStores, updateHandoff, users, convertCnyToThb } = useApp();

  // Separate Part Switcher: 'all' | 'suppliers' | 'drink_stores' ("ควรแยกมีดีเทล แต่ละพารทต่างหากด้วย")
  const [partTab, setPartTab] = useState<'all' | 'suppliers' | 'drink_stores'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<'all' | 'CN' | 'TH'>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  // Combine suppliers and drink stores
  const allItems: Array<
    (SupplierRecord | StoreInspoRecord) & { itemType: 'supplier' | 'drink_store' }
  > = [
    ...suppliers.map((s) => ({ ...s, itemType: 'supplier' as const })),
    ...drinkStores.map((d) => ({ ...d, itemType: 'drink_store' as const })),
  ];

  // Stage definitions
  const stages: Array<{
    key: HandoffStage;
    title: string;
    color: string;
    icon: React.ReactNode;
    desc: string;
  }> = [
    {
      key: 'awaiting',
      title: '1. รอรับช่วงต่อ',
      color: 'bg-slate-100 text-slate-800 border-slate-300',
      icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
      desc: 'สำรวจแล้ว รอจ่ายงานให้ทีมไทย',
    },
    {
      key: 'rfq_sent',
      title: '2. ขอสเปก / ส่ง RFQ',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: <Send className="w-3.5 h-3.5 text-blue-600" />,
      desc: 'ส่งสเปก ขอราคา FOB/ส่งไทย',
    },
    {
      key: 'sample_test',
      title: '3. สั่งตัวอย่างทดสอบ Lab / R&D',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: <FlaskConical className="w-3.5 h-3.5 text-purple-600" />,
      desc: 'เทสรสชาติ/สารสกัด/เครื่องจริง',
    },
    {
      key: 'negotiate',
      title: '4. ต่อรองราคา & MOQ',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: <DollarSign className="w-3.5 h-3.5 text-amber-600" />,
      desc: 'เจรจาขั้นต่ำ เงื่อนไขรับประกัน',
    },
    {
      key: 'approved',
      title: '5. ตัวเต็งอนุมัติ',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
      desc: 'ผ่านเกณฑ์ รอออก PO / ขึ้นเมนูจริง',
    },
    {
      key: 'ordered',
      title: '6. สั่งซื้อ / ดำเนินการแล้ว',
      color: 'bg-teal-50 text-teal-800 border-teal-300',
      icon: <Sparkles className="w-3.5 h-3.5 text-teal-600" />,
      desc: 'สั่งซื้อสำเร็จ พร้อมนำเข้าใช้งาน',
    },
  ];

  // Filter items by partTab, assignee, and country
  const filteredItems = allItems.filter((item) => {
    const matchesPart =
      partTab === 'all' ||
      (partTab === 'suppliers' && item.itemType === 'supplier') ||
      (partTab === 'drink_stores' && item.itemType === 'drink_store');
    const matchesAssignee = assigneeFilter === 'all' || item.assignedTo === assigneeFilter;
    const matchesCountry = countryFilter === 'all' || item.country === countryFilter;
    return matchesPart && matchesAssignee && matchesCountry;
  });

  const getStageItems = (stageKey: HandoffStage) => {
    return filteredItems.filter((item) => (item.handoffStage || 'awaiting') === stageKey);
  };

  const handleAdvanceStage = (
    item: SupplierRecord | StoreInspoRecord,
    currentStage: HandoffStage,
    itemType: 'supplier' | 'drink_store'
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

    updateHandoff(item.id, itemType, {
      handoffStage: nextStage,
      status:
        nextStage === 'approved'
          ? 'shortlisted'
          : nextStage === 'ordered'
          ? 'ordered'
          : undefined,
    });
  };

  const handleSaveHandoffNote = (
    item: SupplierRecord | StoreInspoRecord,
    itemType: 'supplier' | 'drink_store'
  ) => {
    updateHandoff(item.id, itemType, {
      handoffNotes: noteDraft.trim(),
    });
    setEditingNoteId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 space-y-4 animate-in fade-in">
      {/* Top Banner + Separate Part Tabs */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-sm">
                <Users className="w-4 h-4" />
              </span>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900">
                บริหารจัดการรับช่วงต่อ (Handoff & Operations)
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              แยกพาร์ทการส่งต่องานชัดเจนระหว่าง 🏭 ซัพพลายเออร์ และ 🧋 ร้านน้ำ & เรฟ พร้อมแสดงดีเทลสเปก รูปภาพ และช่องทางติดต่อครบในแต่ละการ์ด
            </p>
          </div>

          {/* Filters: Country & Assignee */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setCountryFilter('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  countryFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setCountryFilter('CN')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  countryFilter === 'CN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                🇨🇳 จีน
              </button>
              <button
                onClick={() => setCountryFilter('TH')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  countryFilter === 'TH' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                🇹🇭 ไทย
              </button>
            </div>

            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="all">ผู้รับผิดชอบทั้งหมด</option>
              {users.map((u) => (
                <option key={u.id} value={u.alias}>
                  {u.alias}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dedicated Part Switcher ("แยกมีดีเทล แต่ละพารทต่างหาก") */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPartTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              partTab === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            ดูรวมทั้ง 2 พาร์ท ({suppliers.length + drinkStores.length})
          </button>

          <button
            type="button"
            onClick={() => setPartTab('suppliers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all border ${
              partTab === 'suppliers'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                : 'bg-emerald-50/50 text-emerald-900 border-emerald-200 hover:bg-emerald-100/60'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>พาร์ท 1: รับช่วงต่อซัพพลายเออร์ & โรงงาน ({suppliers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setPartTab('drink_stores')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all border ${
              partTab === 'drink_stores'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-amber-50/50 text-amber-900 border-amber-200 hover:bg-amber-100/60'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>พาร์ท 2: รับช่วงต่อ R&D ร้านน้ำ & เรฟเมนู ({drinkStores.length})</span>
          </button>
        </div>
      </div>

      {/* Stage Flow Columns / Board with Full Part Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((stage) => {
          const itemsInStage = getStageItems(stage.key);

          return (
            <div
              key={stage.key}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex flex-col shadow-xs"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-lg border ${stage.color}`}>{stage.icon}</span>
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      {stage.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">{stage.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {itemsInStage.length}
                </span>
              </div>

              {/* Items List with Detailed Breakdown */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-0.5">
                {itemsInStage.length === 0 ? (
                  <div className="py-10 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    ไม่มีรายการในสเตจนี้
                  </div>
                ) : (
                  itemsInStage.map((item) => {
                    const isSupplier = item.itemType === 'supplier';
                    const sup = isSupplier ? (item as SupplierRecord) : null;
                    const st = !isSupplier ? (item as StoreInspoRecord) : null;

                    const title = isSupplier ? sup!.name : st!.storeName;
                    const subCategory = isSupplier
                      ? sup!.category
                      : st!.storeCategory || 'เรฟร้านน้ำ';
                    const city = isSupplier ? sup!.marketOrCity : st!.city;

                    const thumb = isSupplier
                      ? sup!.photos?.storefrontAndAtmosphere?.[0] ||
                        sup!.catalogItems?.[0]?.photo
                      : st!.photos?.drinkCups?.[0] ||
                        st!.photos?.storefrontAndAtmosphere?.[0];

                    const notesCount = (item.reviewerNotes || []).reduce(
                      (sum, n) => sum + 1 + (n.replies?.length || 0),
                      0
                    );

                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-400 shadow-2xs transition-all space-y-2.5"
                      >
                        {/* Top Part Header: Thumbnail + Title + Category + Country */}
                        <div
                          onClick={() => onSelectItem(item)}
                          className="flex items-start gap-2.5 cursor-pointer group"
                        >
                          {thumb && (
                            <img
                              src={thumb}
                              alt={title}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-103 transition-transform"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 flex-wrap mb-0.5">
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                  item.country === 'TH'
                                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}
                              >
                                {item.country === 'TH' ? '🇹🇭 ไทย' : '🇨🇳 จีน'}
                              </span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                  isSupplier
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}
                              >
                                {subCategory}
                              </span>
                            </div>

                            <h4 className="font-extrabold text-xs sm:text-[13px] text-slate-900 truncate group-hover:text-emerald-700">
                              {title}
                            </h4>

                            <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate mt-0.5">
                              <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              <span className="truncate">{city || 'กวางโจว'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Part-Specific Technical / R&D Details Box ("แยกมีดีเทล แต่ละพารท") */}
                        {isSupplier && sup ? (
                          <div className="p-2 rounded-lg bg-emerald-50/40 border border-emerald-200/60 text-[11px] space-y-1">
                            {sup.catalogItems && sup.catalogItems.length > 0 && (
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-slate-800 truncate">
                                  📦 {sup.catalogItems[0].name || 'สินค้าหลัก'}
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
                            <div className="flex items-center gap-2 text-[10px] text-slate-600 flex-wrap">
                              {sup.wechatId && (
                                <span className="font-mono bg-white px-1.5 py-0.2 rounded border border-slate-200">
                                  WeChat: {sup.wechatId}
                                </span>
                              )}
                              {sup.lineId && (
                                <span className="font-mono bg-white px-1.5 py-0.2 rounded border border-slate-200">
                                  LINE: {sup.lineId}
                                </span>
                              )}
                              {sup.phone && (
                                <span className="inline-flex items-center gap-0.5 font-mono">
                                  <Phone className="w-2.5 h-2.5" />
                                  {sup.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : st ? (
                          <div className="p-2 rounded-lg bg-amber-50/40 border border-amber-200/60 text-[11px] space-y-1">
                            {st.drinkItems && st.drinkItems.length > 0 && (
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-slate-800 truncate">
                                  🧋 {st.drinkItems[0].name || 'เมนูชิม'}
                                </span>
                                {st.drinkItems[0].fitMenuTarget && (
                                  <span className="text-[10px] font-bold text-amber-800 bg-white px-1.5 py-0.2 rounded border border-amber-200 truncate max-w-[120px]">
                                    {st.drinkItems[0].fitMenuTarget}
                                  </span>
                                )}
                              </div>
                            )}
                            {st.tastingNotes && (
                              <p className="text-[10px] text-slate-600 line-clamp-1">
                                “{st.tastingNotes}”
                              </p>
                            )}
                          </div>
                        ) : null}

                        {/* Assignee & Follow-Up Date */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-100 text-[11px]">
                          <div>
                            <span className="text-[10px] text-slate-400 block">ผู้รับผิดชอบ:</span>
                            <select
                              value={item.assignedTo || ''}
                              onChange={(e) =>
                                updateHandoff(item.id, item.itemType, {
                                  assignedTo: e.target.value,
                                })
                              }
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-1.5 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
                            >
                              <option value="">(ยังไม่ระบุ)</option>
                              {users.map((u) => (
                                <option key={u.id} value={u.alias}>
                                  {u.alias}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">กำหนดติดตาม:</span>
                            <input
                              type="date"
                              value={item.targetFollowUpDate || ''}
                              onChange={(e) =>
                                updateHandoff(item.id, item.itemType, {
                                  targetFollowUpDate: e.target.value,
                                })
                              }
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-1.5 py-1 text-[10px] font-mono text-slate-700 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        {/* Handover Notes */}
                        <div className="text-[11px]">
                          {editingNoteId === item.id ? (
                            <div className="space-y-1">
                              <textarea
                                value={noteDraft}
                                onChange={(e) => setNoteDraft(e.target.value)}
                                placeholder="บันทึกผลการเจรจา / ทดสอบ / สเปก..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                                rows={2}
                              />
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => handleSaveHandoffNote(item, item.itemType)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold"
                                >
                                  บันทึก
                                </button>
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px]"
                                >
                                  ยกเลิก
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingNoteId(item.id);
                                setNoteDraft(item.handoffNotes || '');
                              }}
                              className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors"
                              title="แตะเพื่อแก้ไขโน้ตการส่งมอบงาน"
                            >
                              <div className="text-[10px] font-bold text-slate-500 flex items-center justify-between">
                                <span>📝 โน้ตเจรจา/ส่งมอบงาน:</span>
                                <span className="text-blue-600">แก้ไข</span>
                              </div>
                              <p className="text-[11px] text-slate-800 line-clamp-2 mt-0.5">
                                {item.handoffNotes || '(แตะเพื่อพิมพ์บันทึกการส่งมอบงาน)'}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Bottom Bar: Seen-By + Comments + Detail Button + Advance Stage */}
                        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1.5 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onSelectItem(item)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold"
                            >
                              <MessageSquare className="w-2.5 h-2.5" />
                              <span>{notesCount}</span>
                            </button>
                            <SeenByBadge viewedBy={item.viewedBy} size="sm" />
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onSelectItem(item)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold"
                            >
                              <Eye className="w-3 h-3" />
                              <span>ดีเทลเต็ม</span>
                            </button>

                            {stage.key !== 'ordered' && (
                              <button
                                onClick={() => handleAdvanceStage(item, stage.key, item.itemType)}
                                className="flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-700 text-white text-[10px] font-bold active:scale-95 transition-all shadow-xs"
                              >
                                <span>สเตจถัดไป</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
