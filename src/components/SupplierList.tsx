import React from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord } from '../types';
import { SupplierCard } from './SupplierCard';
import { Search, Plus, Factory, X, Tag, Star } from 'lucide-react';

interface SupplierListProps {
  onSelectSupplier: (supplier: SupplierRecord) => void;
  onOpenNewSupplier: () => void;
  onShareToLine: (supplier: SupplierRecord) => void;
}

export const SupplierList: React.FC<SupplierListProps> = ({
  onSelectSupplier,
  onOpenNewSupplier,
  onShareToLine,
}) => {
  const {
    suppliers,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedTag,
    setSelectedTag,
    selectedRating,
    setSelectedRating,
    countryFilter,
    setCountryFilter,
    categories,
    currentUser,
  } = useApp();

  const allCategories = ['all', ...categories];

  const statuses = [
    { key: 'all', label: 'ทุกสถานะ' },
    { key: 'scouted', label: '1. สำรวจแล้ว' },
    { key: 'reviewing', label: '2. เทียบสเปก' },
    { key: 'rfq_sent', label: '3. ส่ง RFQ' },
    { key: 'shortlisted', label: '4. ตัวเต็ง (Shortlist)' },
    { key: 'ordered', label: '5. สั่งซื้อแล้ว (Ordered)' },
  ];

  const ratingOptions: Array<{ value: number | null; label: string }> = [
    { value: null, label: 'ทุกระดับดาว' },
    { value: 5, label: '5 ดาวเต็ม' },
    { value: 4, label: '4+ ดาวขึ้นไป' },
    { value: 3, label: '3+ ดาวขึ้นไป' },
  ];

  const filtered = suppliers.filter((s) => {
    const matchesCountry = countryFilter === 'all' || s.country === countryFilter;

    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.chineseName && s.chineseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.marketOrCity && s.marketOrCity.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.memo && s.memo.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
    const matchesRating = selectedRating === null || (s.rating || 5) >= selectedRating;

    const matchesTag =
      selectedTag === 'all' ||
      s.category.includes(selectedTag) ||
      (s.quickTags && s.quickTags.some((t) => t.includes(selectedTag))) ||
      (s.catalogItems &&
        s.catalogItems.some(
          (c) => (c.name && c.name.includes(selectedTag)) || (c.memo && c.memo.includes(selectedTag))
        )) ||
      s.name.includes(selectedTag);

    return matchesCountry && matchesSearch && matchesCategory && matchesStatus && matchesRating && matchesTag;
  });

  return (
    <div className="space-y-3.5 max-w-6xl mx-auto px-3 sm:px-4 py-3 animate-in fade-in">
      {/* Search and Filters Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ค้นหาชื่อซัพพลายเออร์, ตลาด, เมือง, สินค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Country Toggle & Status Filter */}
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setCountryFilter('all')}
                className={`px-2 py-1 rounded-md font-bold transition-all ${
                  countryFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                type="button"
                onClick={() => setCountryFilter('CN')}
                className={`px-2 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                  countryFilter === 'CN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-location-dot text-[10px] text-rose-500" />
                <span>จีน</span>
              </button>
              <button
                type="button"
                onClick={() => setCountryFilter('TH')}
                className={`px-2 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                  countryFilter === 'TH' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-location-dot text-[10px] text-sky-600" />
                <span>ไทย</span>
              </button>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              {statuses.map((st) => (
                <option key={st.key} value={st.key}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Star Rating Filter Row ("ปุ่มดาวๆต่างๆ รองรับการฟิลเตอร์") */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
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
                onClick={() => setSelectedRating(opt.value)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border inline-flex items-center gap-1 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-2xs'
                    : 'bg-amber-50/50 text-amber-900 border-amber-200/70 hover:bg-amber-100/70'
                }`}
              >
                {opt.value !== null && <i className="fa-solid fa-star text-[9px] text-amber-600" />}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Tag Clear Pill */}
        {selectedTag !== 'all' && (
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[11px] text-slate-500">กรองด้วยจุดเด่น:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Tag className="w-3 h-3 text-emerald-600" />
              <span>{selectedTag}</span>
              <button
                onClick={() => setSelectedTag('all')}
                className="hover:text-emerald-950 p-0.5"
                title="ล้างตัวกรอง"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        {/* Supplier Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pt-0.5">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold text-[11px] border inline-flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200/70 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? (
                <>
                  <i className="fa-solid fa-industry text-[10px]" />
                  <span>ทุกหมวดซัพพลายเออร์</span>
                </>
              ) : (
                cat
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Suppliers (Facebook-Style Feed Cards) */}
      {filtered.length === 0 ? (
        <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-slate-200 space-y-2.5">
          <Factory className="w-9 h-9 text-slate-300 mx-auto" />
          <div className="text-sm font-bold text-slate-800">ไม่พบซัพพลายเออร์ที่ตรงกับตัวกรอง</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            ลองปรับเปลี่ยนหมวดหมู่ ระดับดาว หรือกดปุ่มบันทึกซัพพลายเออร์ใหม่ด้านล่าง
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSelectedRating(null);
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              ล้างตัวกรองทั้งหมด
            </button>
            {currentUser.role !== 'viewer' && (
              <button
                onClick={onOpenNewSupplier}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ บันทึกซัพพลายเออร์ใหม่</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <SupplierCard
              key={s.id}
              supplier={s}
              onSelect={onSelectSupplier}
              onShareToLine={onShareToLine}
            />
          ))}
        </div>
      )}
    </div>
  );
};
