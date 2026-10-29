import React, { useState, useMemo } from 'react';
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
  BadgeAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FranchiseStore, StoreMenuItem, LabItem } from '../types';

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
  } = useApp();

  const [activeStoreId, setActiveStoreId] = useState<string>(
    franchiseStores[0]?.id || 'store-vitcha'
  );
  const [selectedQuickSopItem, setSelectedQuickSopItem] = useState<{
    menuItem: StoreMenuItem;
    labItem: LabItem;
  } | null>(null);
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);

  const activeStore = useMemo(() => {
    return (
      franchiseStores.find((s) => s.id === activeStoreId) || franchiseStores[0]
    );
  }, [franchiseStores, activeStoreId]);

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

  const drinksList = enrichedMenuItems.filter((x) => x.labItem.type === 'drink');
  const toppingsList = enrichedMenuItems.filter((x) => x.labItem.type === 'topping');

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  if (!activeStore) {
    return (
      <div className="p-12 text-center text-slate-500">
        ยังไม่มีร้านแฟรนไชส์ในระบบ
      </div>
    );
  }

  const isEmerald = activeStore.themeColor === 'emerald';
  const themeBg = isEmerald
    ? 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-800/40'
    : 'from-cyan-950 via-slate-900 to-blue-950 border-cyan-800/40';
  const themeAccent = isEmerald ? 'text-emerald-400' : 'text-cyan-400';
  const themePill = isEmerald ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
  const themeBtn = isEmerald ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-cyan-600 hover:bg-cyan-500';

  return (
    <div className="space-y-6 pb-24 animate-fade-in print:p-0 print:space-y-4">
      {/* 🏪 STORE SWITCHER & HERO BANNER (Hidden during print) */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${themeBg} text-white p-6 sm:p-8 shadow-xl border print:hidden`}>
        {/* Top Store Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            {franchiseStores.map((store) => {
              const active = store.id === activeStore.id;
              return (
                <button
                  key={store.id}
                  type="button"
                  onClick={() => setActiveStoreId(store.id)}
                  className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
                    active
                      ? 'bg-white text-slate-900 shadow-md scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>{store.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAddMenuModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>แอดเมนูเข้าร้าน</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-lg transition-all ${themeBtn}`}
            >
              <Printer className="w-4 h-4" />
              <span>ปริ้นท์ป้ายเมนู & SOP ร้านนี้</span>
            </button>
          </div>
        </div>

        {/* Store Profile Info */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${themePill}`}>
              <Store className="w-3.5 h-3.5" />
              <span>สาขาแฟรนไชส์จำลอง · เมนูบอร์ดพร้อมจำหน่าย</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{activeStore.name}</span>
              <span className={`text-base font-normal ${themeAccent}`}>({activeStore.branch})</span>
            </h1>
            <p className="text-slate-300 text-sm italic">
              "{activeStore.brandTagline}"
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeStore.openingHours}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeStore.contactNumber}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                🥤 ทั้งหมด <strong>{enrichedMenuItems.length}</strong> เมนูบนป้าย
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 📋 MENU BOARD SIMULATOR (Screen & Print) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-6 sm:p-8 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Menu Board Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              DIGITAL MENU BOARD SIMULATOR
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
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

        {/* 🥤 SECTION 1: DRINKS CATEGORY */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
            <Coffee className="w-4 h-4 text-indigo-600" />
            <span>รายการเครื่องดื่ม (Handcrafted Beverages)</span>
            <span className="text-xs text-slate-400 font-normal">({drinksList.length} รายการ)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
                  className="group relative rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-3.5 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 print:border-slate-300 print:bg-white"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 mb-3">
                    <img
                      src={labItem.photoUrl}
                      alt={menuItem.customName || labItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {menuItem.badge && menuItem.badge !== 'None' && (
                      <span className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-md ${badgeStyle}`}>
                        {menuItem.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white font-mono text-[10px]">
                      {labItem.code}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 transition-colors">
                        {menuItem.customName || labItem.name}
                      </h4>
                      <div className="text-right">
                        <span className="font-mono font-black text-base text-indigo-600 dark:text-indigo-400">
                          ฿{menuItem.retailPriceThb}
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      {labItem.nameEn}
                    </div>

                    {/* Sweetness Quick Chips */}
                    <div className="flex items-center gap-1 pt-1.5 text-[10px] text-slate-500">
                      <span className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 font-mono font-semibold">
                        0% ({labItem.sweetnessLevels.zero.brix}°Bx)
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono font-semibold">
                        50% ({labItem.sweetnessLevels.half.brix}°Bx)
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 font-mono font-semibold">
                        100% ({labItem.sweetnessLevels.full.brix}°Bx)
                      </span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-indigo-600 transition-colors print:hidden">
                    <span>ดูสูตรชง SOP</span>
                    <span className="font-bold">➔</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🍮 SECTION 2: TOPPINGS CATEGORY */}
        {toppingsList.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>ท็อปปิ้งพรีเมียม (Add-on Toppings)</span>
              <span className="text-xs text-slate-400 font-normal">({toppingsList.length} รายการ)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {toppingsList.map(({ menuItem, labItem }) => (
                <div
                  key={menuItem.id}
                  onClick={() => setSelectedQuickSopItem({ menuItem, labItem })}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700 p-2.5 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-all"
                >
                  <img
                    src={labItem.photoUrl}
                    alt={menuItem.customName || labItem.name}
                    className="w-16 h-16 rounded-lg object-cover mb-2"
                  />
                  <div className="font-bold text-xs text-slate-800 dark:text-white line-clamp-1">
                    {menuItem.customName || labItem.name}
                  </div>
                  <div className="font-mono font-extrabold text-sm text-purple-600 dark:text-purple-400 mt-1">
                    +฿{menuItem.retailPriceThb}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🖨️ SECTION 3: MASTER SOP SUMMARY SHEET (Visible on Print) */}
        <div className="hidden print:block pt-8 border-t-2 border-slate-900 space-y-4 page-break-before">
          <div className="text-center pb-4 border-b border-slate-300">
            <h2 className="text-xl font-black text-slate-900 uppercase">
              คู่มือสูตรชงมาตรฐานประจำสาขา (STORE MASTER SOP SHEET)
            </h2>
            <div className="text-xs text-slate-600">
              ร้าน {activeStore.name} · {activeStore.branch} · แพลตฟอร์ม R&D ฉันจะเป็นหัวแถว
            </div>
          </div>

          <table className="w-full text-xs text-left border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-2 border border-slate-300">รหัส RD</th>
                <th className="p-2 border border-slate-300">ชื่อเมนู</th>
                <th className="p-2 border border-slate-300">หวาน 0%</th>
                <th className="p-2 border border-slate-300">หวาน 50% (แนะนำ)</th>
                <th className="p-2 border border-slate-300">หวาน 100%</th>
                <th className="p-2 border border-slate-300 text-right">ราคาขาย</th>
              </tr>
            </thead>
            <tbody>
              {enrichedMenuItems.map(({ menuItem, labItem }) => (
                <tr key={menuItem.id} className="border-b border-slate-200">
                  <td className="p-2 font-mono font-bold border border-slate-300">{labItem.code}</td>
                  <td className="p-2 border border-slate-300 font-bold">{menuItem.customName || labItem.name}</td>
                  <td className="p-2 border border-slate-300">
                    ไซรัป {labItem.sweetnessLevels.zero.syrupMl}ml · {labItem.sweetnessLevels.zero.brix}°Bx
                  </td>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold">
                    ไซรัป {labItem.sweetnessLevels.half.syrupMl}ml · {labItem.sweetnessLevels.half.brix}°Bx
                  </td>
                  <td className="p-2 border border-slate-300">
                    ไซรัป {labItem.sweetnessLevels.full.syrupMl}ml · {labItem.sweetnessLevels.full.brix}°Bx
                  </td>
                  <td className="p-2 border border-slate-300 text-right font-mono font-bold">฿{menuItem.retailPriceThb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🥤 BARISTA QUICK SOP POPUP MODAL */}
      {selectedQuickSopItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedQuickSopItem.labItem.photoUrl}
                  alt={selectedQuickSopItem.menuItem.customName || selectedQuickSopItem.labItem.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {selectedQuickSopItem.labItem.code}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                    {selectedQuickSopItem.menuItem.customName || selectedQuickSopItem.labItem.name}
                  </h3>
                  <div className="text-xs font-mono text-emerald-600 font-bold">
                    ราคาจำหน่าย ฿{selectedQuickSopItem.menuItem.retailPriceThb}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuickSopItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SOP Sweetness Quick Guide */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-indigo-500" />
                <span>สูตรชงตามระดับความหวาน (Barista Quick SOP)</span>
              </div>

              <div className="space-y-2 text-xs">
                {/* 50% (Recommended) */}
                <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                  <div className="flex items-center justify-between font-bold text-indigo-900 dark:text-indigo-200">
                    <span>🌟 หวาน 50% (หวานน้อยมาตรฐาน แนะนำอันดับ 1)</span>
                    <span className="font-mono text-amber-600">{selectedQuickSopItem.labItem.sweetnessLevels.half.brix} °Bx</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    น้ำเชื่อม: <strong>{selectedQuickSopItem.labItem.sweetnessLevels.half.syrupMl} ml</strong> ({selectedQuickSopItem.labItem.sweetnessLevels.half.sweetenerType})
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] italic">
                    "{selectedQuickSopItem.labItem.sweetnessLevels.half.tasteNotes}"
                  </div>
                </div>

                {/* 0% */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-white">
                    <span>หวาน 0% (ไม่หวาน / คีโต)</span>
                    <span className="font-mono text-amber-600">{selectedQuickSopItem.labItem.sweetnessLevels.zero.brix} °Bx</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    น้ำเชื่อม: <strong>0 ml</strong> · ของเหลวหลัก {selectedQuickSopItem.labItem.sweetnessLevels.zero.baseLiquidMl} ml
                  </div>
                </div>

                {/* 100% */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-white">
                    <span>หวาน 100% (หวานปกติ)</span>
                    <span className="font-mono text-amber-600">{selectedQuickSopItem.labItem.sweetnessLevels.full.brix} °Bx</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    น้ำเชื่อม: <strong>{selectedQuickSopItem.labItem.sweetnessLevels.full.syrupMl} ml</strong> · แคลอรี {selectedQuickSopItem.labItem.sweetnessLevels.full.caloriesKcal} kcal
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedQuickSopItem(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              เข้าใจแล้ว ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
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
    </div>
  );
}

// ==========================================
// ADD MENU ITEM MODAL
// ==========================================
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

  const selectedLabItem = useMemo(() => {
    return leadLabItems.find((x) => x.id === selectedLabItemId);
  }, [leadLabItems, selectedLabItemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLabItemId) return;
    await onSave({
      id: `menu-${Date.now()}`,
      labItemId: selectedLabItemId,
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
