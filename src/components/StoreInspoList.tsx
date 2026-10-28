import React, { useState, useEffect } from 'react';
import { CollectionHeading, CollectionEmpty } from './CollectionHeading';
import { useApp } from '../context/AppContext';
import { StoreInspoRecord } from '../types';
import { StoreInspoCard } from './StoreInspoCard';
import { Search, Coffee, Plus, Star } from 'lucide-react';

interface StoreInspoListProps {
  onSelectStore: (store: StoreInspoRecord) => void;
  onOpenNewStoreInspo: () => void;
  onShareToLine: (store: StoreInspoRecord) => void;
}

export const StoreInspoList: React.FC<StoreInspoListProps> = ({
  onSelectStore,
  onOpenNewStoreInspo,
  onShareToLine,
}) => {
  const {
    drinkStores,
    filterResetVersion,
    storeCategories,
    selectedCategory,
    setSelectedCategory,
    selectedRating,
    setSelectedRating,
    searchQuery,
    setSearchQuery,
    countryFilter,
    setCountryFilter,
    currentUser,
  } = useApp();

  const [selectedCity, setSelectedCity] = useState('all');
  useEffect(() => setSelectedCity('all'), [filterResetVersion]);

  const cities = [
    'all',
    'กวางโจว (Guangzhou)',
    'เซินเจิ้น (Shenzhen)',
    'ฝอซาน (Foshan)',
    'กรุงเทพฯ (Bangkok)',
  ];

  const ratingOptions: Array<{ value: number | null; label: string }> = [
    { value: null, label: 'ทุกระดับดาว' },
    { value: 4.8, label: '4.8+ ท็อปเรฟ' },
    { value: 4.5, label: '4.5+ ดาวขึ้นไป' },
    { value: 4.0, label: '4.0+ ดาวขึ้นไป' },
  ];

  const allStoreCategories = ['all', ...storeCategories];

  const filtered = drinkStores.filter((d) => {
    const matchesCountry = countryFilter === 'all' || d.country === countryFilter;

    const matchesSearch =
      d.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.chineseName && d.chineseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d.brandConcept && d.brandConcept.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d.storeCategory && d.storeCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d.tastingNotes && d.tastingNotes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCity =
      selectedCity === 'all' || (d.city && d.city.includes(selectedCity.split(' ')[0]));

    const matchesStoreCat =
      selectedCategory === 'all' ||
      !storeCategories.includes(selectedCategory) ||
      d.storeCategory === selectedCategory;

    const r = d.ratings || { taste: 5, aesthetics: 5, value: 4, speed: 5 };
    const avgScore = (r.taste + r.aesthetics + r.value + r.speed) / 4;
    const matchesRating = selectedRating === null || avgScore >= selectedRating;

    return matchesCountry && matchesSearch && matchesCity && matchesStoreCat && matchesRating;
  });

  const hasFilters = !!searchQuery || countryFilter !== 'all' || selectedCategory !== 'all' || selectedCity !== 'all' || selectedRating !== null;
  const resetFilters = () => { setSearchQuery(''); setCountryFilter('all'); setSelectedCategory('all'); setSelectedRating(null); setSelectedCity('all'); };

  return (
    <div className="space-y-3 max-w-6xl mx-auto px-3 sm:px-4 py-3 animate-in fade-in">
      <CollectionHeading kind="store" count={filtered.length} total={drinkStores.length} filtered={hasFilters} onReset={resetFilters} onCreate={currentUser.role !== 'viewer' ? onOpenNewStoreInspo : undefined} />
      {/* Search and Filters Bar */}
      <div className="collection-filters bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5 shadow-2xs">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              aria-label="ค้นหาร้านน้ำ"
              type="search"
              placeholder="ค้นหาชื่อร้านน้ำ, หมวดหมู่เรฟ, เมนูที่ชิม, รสชาติ, กิมมิก..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Country Toggle Buttons */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs shrink-0 self-start sm:self-auto">
            <button
              type="button"
              aria-pressed={countryFilter === 'all'} onClick={() => setCountryFilter('all')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                countryFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              type="button"
              aria-pressed={countryFilter === 'CN'} onClick={() => setCountryFilter('CN')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                countryFilter === 'CN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <i aria-hidden="true" className="fa-solid fa-location-dot text-[10px] text-rose-500" />
              <span>จีน</span>
            </button>
            <button
              type="button"
              aria-pressed={countryFilter === 'TH'} onClick={() => setCountryFilter('TH')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                countryFilter === 'TH' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <i aria-hidden="true" className="fa-solid fa-location-dot text-[10px] text-sky-600" />
              <span>ไทย</span>
            </button>
          </div>
        </div>

        {/* Dedicated Drink Store Categories ("แยกหมวดหมู่เฉพาะ ร้านน้ำ & เรฟ ไม่ปนกับหน้าซับ") */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pt-0.5">
          {allStoreCategories.map((cat) => {
            const isActive =
              cat === 'all'
                ? selectedCategory === 'all' || !storeCategories.includes(selectedCategory)
                : selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat} onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-bold text-[11px] border inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-amber-50/40 text-amber-900 border-amber-200/70 hover:bg-amber-100/60'
                }`}
              >
                {cat === 'all' ? (
                  <>
                    <i aria-hidden="true" className="fa-solid fa-mug-hot text-[10px]" />
                    <span>ทุกหมวดร้านน้ำ & เรฟ</span>
                  </>
                ) : (
                  cat
                )}
              </button>
            );
          })}
        </div>

        {/* Star Rating & City Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>กรองตามดาว:</span>
            </span>
            {ratingOptions.map((opt) => {
              const isActive = selectedRating === opt.value;
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  aria-pressed={isActive} onClick={() => setSelectedRating(opt.value)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border inline-flex items-center gap-1 ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  {opt.value !== null && <i aria-hidden="true" className="fa-solid fa-star text-[9px] text-amber-500" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all font-semibold text-[11px] border ${
                  selectedCity === city
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-slate-50 text-slate-600 border-slate-200/70 hover:bg-slate-100'
                }`}
              >
                {city === 'all' ? 'ทุกเมือง' : city.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Stores (Facebook-Style Feed Cards) */}
      {filtered.length === 0 ? (
        <CollectionEmpty kind="store" filtered={hasFilters} onReset={resetFilters} onCreate={currentUser.role !== 'viewer' ? onOpenNewStoreInspo : undefined} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <StoreInspoCard
              key={d.id}
              store={d}
              onSelect={onSelectStore}
              onShareToLine={onShareToLine}
            />
          ))}
        </div>
      )}
    </div>
  );
};
