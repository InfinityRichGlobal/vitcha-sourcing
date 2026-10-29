import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord, StoreInspoRecord } from '../types';
import { SupplierCard } from './SupplierCard';
import { StoreInspoCard } from './StoreInspoCard';
import {
  Layers,
  Coffee,
  Factory,
  Plus,
  Settings,
  Star,
} from 'lucide-react';

interface CategoryExplorerViewProps {
  onSelectSupplier: (s: SupplierRecord) => void;
  onSelectStore: (st: StoreInspoRecord) => void;
  onShareToLine: (item: SupplierRecord | StoreInspoRecord) => void;
  onOpenNewSupplier: () => void;
  onOpenNewStoreInspo: () => void;
}

export const CategoryExplorerView: React.FC<CategoryExplorerViewProps> = ({
  onSelectSupplier,
  onSelectStore,
  onShareToLine,
  onOpenNewSupplier,
  onOpenNewStoreInspo,
}) => {
  const {
    categories,
    storeCategories,
    suppliers,
    drinkStores,
    countryFilter,
    setCountryFilter,
    selectedRating,
    setSelectedRating,
    setActiveTab,
    currentUser,
  } = useApp();

  // Separate top-level mode: 'suppliers' vs 'drink_stores' ("แยกหมวดหมู่การดู ไม่จัดรวมในหน้าซับ เพราะปลายทางคนละเรื่องกัน")
  const [groupMode, setGroupMode] = useState<'suppliers' | 'drink_stores'>('suppliers');
  const [activeSupplierCat, setActiveSupplierCat] = useState<string>('ALL');
  const [activeStoreCat, setActiveStoreCat] = useState<string>('ALL');

  const filteredSuppliers = suppliers.filter((s) => {
    const matchCountry = countryFilter === 'all' || s.country === countryFilter;
    const matchRating = selectedRating === null || (s.rating || 5) >= selectedRating;
    return matchCountry && matchRating;
  });

  const filteredStores = drinkStores.filter((d) => {
    const matchCountry = countryFilter === 'all' || d.country === countryFilter;
    const r = d.ratings || { taste: 5, aesthetics: 5, value: 4, speed: 5 };
    const avg = (r.taste + r.aesthetics + r.value + r.speed) / 4;
    const matchRating = selectedRating === null || avg >= selectedRating;
    return matchCountry && matchRating;
  });

  const supplierCatStats = categories.map((cat) => {
    const matching = filteredSuppliers.filter((s) => s.category === cat);
    const thumbs = matching
      .map((m) => m.photos?.storefrontAndAtmosphere?.[0] || m.catalogItems?.[0]?.photo)
      .filter(Boolean) as string[];
    return {
      name: cat,
      count: matching.length,
      thumbs,
      items: matching,
    };
  });

  const storeCatStats = storeCategories.map((cat) => {
    const matching = filteredStores.filter((d) => d.storeCategory === cat);
    const thumbs = matching
      .map((d) => d.photos?.drinkCups?.[0] || d.photos?.storefrontAndAtmosphere?.[0])
      .filter(Boolean) as string[];
    return {
      name: cat,
      count: matching.length,
      thumbs,
      items: matching,
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 space-y-4 animate-in fade-in">
      {/* Header Bar with Separate Mode Switcher: ซัพพลายเออร์ vs ร้านน้ำ & เรฟ */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900 whitespace-nowrap">
              หมวดหมู่
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Country Toggle */}
            <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 text-[11px]">
              <button
                type="button"
                onClick={() => setCountryFilter('all')}
                className={`px-2 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                  countryFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                type="button"
                onClick={() => setCountryFilter('CN')}
                className={`px-2 py-1 rounded-lg font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  countryFilter === 'CN' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <span>🇨🇳 จีน</span>
              </button>
              <button
                type="button"
                onClick={() => setCountryFilter('TH')}
                className={`px-2 py-1 rounded-lg font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  countryFilter === 'TH' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <span>🇹🇭 ไทย</span>
              </button>
            </div>

            {(currentUser.role === 'admin' || currentUser.role === 'editor') && (
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-colors whitespace-nowrap"
              >
                <Settings className="w-3 h-3" />
                <span>ตั้งค่า</span>
              </button>
            )}
          </div>
        </div>

        {/* Dedicated Group Switcher + Star Rating Filter */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setGroupMode('suppliers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
                groupMode === 'suppliers'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <i className="fa-solid fa-industry text-emerald-400" />
              <span>ซัพพลายเออร์ ({categories.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setGroupMode('drink_stores')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
                groupMode === 'drink_stores'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-amber-50/50 text-amber-900 border-amber-200 hover:bg-amber-100/60'
              }`}
            >
              <i className="fa-solid fa-mug-hot" />
              <span>ร้านน้ำ & เรฟ ({storeCategories.length})</span>
            </button>
          </div>

          {/* Star Filter */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            </span>
            {[
              { val: null, label: 'ทั้งหมด' },
              { val: 5, label: '5★' },
              { val: 4.5, label: '4.5★' },
              { val: 4, label: '4★' },
            ].map((st) => (
              <button
                key={String(st.val)}
                type="button"
                onClick={() => setSelectedRating(st.val)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all inline-flex items-center gap-1 whitespace-nowrap ${
                  selectedRating === st.val
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{st.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODE 1: SUPPLIER CATEGORIES */}
      {groupMode === 'suppliers' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveSupplierCat('ALL')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeSupplierCat === 'ALL'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white hover:border-slate-300 border-slate-200/90 text-slate-900 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Factory className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/15">
                  {filteredSuppliers.length} รายการ
                </span>
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm truncate flex items-center gap-1.5">
                  <i className="fa-solid fa-industry text-xs text-emerald-400" />
                  <span>ทุกหมวดซัพพลายเออร์</span>
                </div>
                <div className="text-[10px] opacity-75 mt-0.5">แสดงแยกตามประเภทซัพพลายเออร์</div>
              </div>
            </button>

            {supplierCatStats.map((cat) => {
              const isSelected = activeSupplierCat === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveSupplierCat(cat.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                      : 'bg-white hover:border-emerald-300 border-slate-200/90 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center -space-x-1.5">
                      {cat.thumbs.length > 0 ? (
                        cat.thumbs.slice(0, 3).map((t, i) => (
                          <img
                            key={i}
                            src={t}
                            alt=""
                            className="w-7 h-7 rounded-lg object-cover ring-2 ring-white"
                          />
                        ))
                      ) : (
                        <span className="p-2 rounded-xl bg-slate-100 text-slate-600">
                          <Factory className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : cat.count > 0
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {cat.count} รายการ
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm truncate">{cat.name}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">
                      {cat.count > 0 ? 'แตะเพื่อดูหมวดนี้' : 'ยังไม่มีรายการ'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {activeSupplierCat === 'ALL' ? (
            <div className="space-y-6">
              {supplierCatStats
                .filter((c) => c.count > 0)
                .map((c) => (
                  <div key={c.name} className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <h3 className="font-extrabold text-sm text-slate-900">{c.name}</h3>
                        <span className="text-xs font-mono text-slate-500">({c.count})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveSupplierCat(c.name)}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        ดูเฉพาะหมวดนี้ →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {c.items.map((sup) => (
                        <SupplierCard
                          key={sup.id}
                          supplier={sup}
                          onSelect={onSelectSupplier}
                          onShareToLine={onShareToLine}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(() => {
                const selectedCatObj = supplierCatStats.find((c) => c.name === activeSupplierCat);
                const catItems = selectedCatObj ? selectedCatObj.items : [];
                return (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 min-w-0">
                        <i className="fa-solid fa-industry text-xs text-emerald-600 shrink-0" />
                        <span className="truncate">{activeSupplierCat}</span>
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 whitespace-nowrap">
                          {catItems.length} รายการ
                        </span>
                      </h3>
                      <button
                        type="button"
                        onClick={onOpenNewSupplier}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 shrink-0 whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>เพิ่มซัพ</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {catItems.map((sup) => (
                        <SupplierCard
                          key={sup.id}
                          supplier={sup}
                          onSelect={onSelectSupplier}
                          onShareToLine={onShareToLine}
                        />
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      ) : (
        /* MODE 2: DRINK STORE CATEGORIES (แยกออกจากหน้าซับโดยสิ้นเชิง) */
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveStoreCat('ALL')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeStoreCat === 'ALL'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                  : 'bg-white hover:border-amber-300 border-slate-200/90 text-slate-900 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-white/20 text-white">
                  <Coffee className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/20">
                  {filteredStores.length} ร้าน
                </span>
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm truncate flex items-center gap-1.5">
                  <i className="fa-solid fa-mug-hot text-xs text-amber-500" />
                  <span>ทุกหมวดร้านน้ำ & เรฟ</span>
                </div>
                <div className="text-[10px] opacity-85 mt-0.5">แยกตามคอนเซปต์และสไตล์ร้านน้ำ</div>
              </div>
            </button>

            {storeCatStats.map((cat) => {
              const isSelected = activeStoreCat === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveStoreCat(cat.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white hover:border-amber-400 border-slate-200/90 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center -space-x-1.5">
                      {cat.thumbs.length > 0 ? (
                        cat.thumbs.slice(0, 3).map((t, i) => (
                          <img
                            key={i}
                            src={t}
                            alt=""
                            className="w-7 h-7 rounded-lg object-cover ring-2 ring-white"
                          />
                        ))
                      ) : (
                        <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                          <Coffee className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : cat.count > 0
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {cat.count} ร้าน
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm truncate">{cat.name}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">
                      {cat.count > 0 ? 'แตะเพื่อดูเรฟหมวดนี้' : 'ยังไม่มีร้านในหมวดนี้'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {activeStoreCat === 'ALL' ? (
            <div className="space-y-6">
              {storeCatStats
                .filter((c) => c.count > 0)
                .map((c) => (
                  <div key={c.name} className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <h3 className="font-extrabold text-sm text-slate-900">{c.name}</h3>
                        <span className="text-xs font-mono text-slate-500">({c.count} ร้าน)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveStoreCat(c.name)}
                        className="text-xs font-bold text-amber-700 hover:underline"
                      >
                        ดูเฉพาะหมวดนี้ →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {c.items.map((st) => (
                        <StoreInspoCard
                          key={st.id}
                          store={st}
                          onSelect={onSelectStore}
                          onShareToLine={onShareToLine}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(() => {
                const selectedCatObj = storeCatStats.find((c) => c.name === activeStoreCat);
                const catItems = selectedCatObj ? selectedCatObj.items : [];
                return (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 min-w-0">
                        <i className="fa-solid fa-mug-hot text-xs text-amber-600 shrink-0" />
                        <span className="truncate">{activeStoreCat}</span>
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shrink-0 whitespace-nowrap">
                          {catItems.length} ร้าน
                        </span>
                      </h3>
                      <button
                        type="button"
                        onClick={onOpenNewStoreInspo}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1 shrink-0 whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>เพิ่มเรฟ</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {catItems.map((st) => (
                        <StoreInspoCard
                          key={st.id}
                          store={st}
                          onSelect={onSelectStore}
                          onShareToLine={onShareToLine}
                        />
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
