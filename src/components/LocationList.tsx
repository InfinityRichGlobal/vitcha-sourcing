import React, { useState, useEffect } from 'react';
import { CollectionHeading, CollectionEmpty } from './CollectionHeading';
import { useApp } from '../context/AppContext';
import { LocationRecord, LocationType, LayoutFormat } from '../types';
import { LocationCard } from './LocationCard';
import { Search, Star, Building2, MapPin, Maximize2 } from 'lucide-react';

interface LocationListProps {
  onSelectLocation: (location: LocationRecord) => void;
  onOpenNewLocation: () => void;
  onShareToLine: (location: LocationRecord) => void;
}

export const LocationList: React.FC<LocationListProps> = ({
  onSelectLocation,
  onOpenNewLocation,
  onShareToLine,
}) => {
  const {
    locations,
    locationTypes: customLocationTypes,
    filterResetVersion,
    searchQuery,
    setSearchQuery,
    countryFilter,
    setCountryFilter,
    selectedRating,
    setSelectedRating,
    currentUser,
  } = useApp();

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  useEffect(() => {
    setSelectedType('all');
    setSelectedFormat('all');
  }, [filterResetVersion]);

  const baseIcons: Record<string, string> = {
    mall: 'fa-building',
    community: 'fa-tree-city',
    office: 'fa-briefcase',
    street: 'fa-road',
    transit: 'fa-train-subway',
    'ห้างสรรพสินค้า / ศูนย์การค้า': 'fa-building',
    'คอมมูนิตี้มอลล์': 'fa-tree-city',
    'อาคารสำนักงาน': 'fa-briefcase',
    'สแตนด์อโลน / ริมถนน / อาคารพาณิชย์': 'fa-road',
    'สถานีขนส่ง / รถไฟฟ้า': 'fa-train-subway',
    'สถานที่ราชการ': 'fa-landmark',
    'สถานที่การศึกษา': 'fa-graduation-cap',
    'ตลาด / ถนนคนเดิน': 'fa-store',
    'ปั๊มน้ำมัน / จุดชาร์จ EV': 'fa-gas-pump',
    'สถานบันเทิง': 'fa-martini-glass-citrus',
    'สวนสาธารณะ': 'fa-tree',
  };

  const locationTypes: Array<{ key: string; label: string; icon: string }> = [
    { key: 'all', label: 'ทุกประเภททำเล', icon: 'fa-globe' },
    ...customLocationTypes.map((t) => ({
      key: t,
      label: t,
      icon: baseIcons[t] || 'fa-map-pin',
    })),
  ];

  const layoutFormats: Array<{ key: string; label: string }> = [
    { key: 'all', label: 'ทุกรูปแบบผัง' },
    { key: 'inline', label: 'แนวต่อ (Inline)' },
    { key: 'corner', label: 'หัวมุม (Corner)' },
    { key: 'island', label: 'เกาะกลาง (Island)' },
    { key: 'kiosk', label: 'คีออสก์ (Kiosk)' },
  ];

  const ratingOptions: Array<{ value: number | null; label: string }> = [
    { value: null, label: 'ทุกระดับดาว' },
    { value: 4.8, label: '4.8+ เกรด A+' },
    { value: 4.5, label: '4.5+ ศักยภาพสูง' },
    { value: 4.0, label: '4.0+ ดาวขึ้นไป' },
  ];

  const filtered = locations.filter((loc) => {
    const matchesCountry = countryFilter === 'all' || loc.country === countryFilter;

    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loc.foreignName && loc.foreignName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loc.zoneOrFloor && loc.zoneOrFloor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loc.unitNumber && loc.unitNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loc.location?.addressText && loc.location.addressText.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loc.quickTags && loc.quickTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesType =
      selectedType === 'all' ||
      loc.locationType === selectedType ||
      (selectedType === 'ห้างสรรพสินค้า / ศูนย์การค้า' && loc.locationType === 'mall') ||
      (selectedType === 'คอมมูนิตี้มอลล์' && loc.locationType === 'community') ||
      (selectedType === 'อาคารสำนักงาน' && loc.locationType === 'office') ||
      (selectedType === 'สแตนด์อโลน / ริมถนน / อาคารพาณิชย์' && loc.locationType === 'street') ||
      (selectedType === 'สถานีขนส่ง / รถไฟฟ้า' && loc.locationType === 'transit') ||
      (selectedType === 'mall' && loc.locationType === 'ห้างสรรพสินค้า / ศูนย์การค้า');
    const matchesFormat = selectedFormat === 'all' || loc.spaceSpecs?.layoutFormat === selectedFormat;

    const r = loc.ratings || { footTraffic: 5, visibility: 5, accessibility: 5, valueRoi: 4 };
    const avgScore = (r.footTraffic + r.visibility + r.accessibility + r.valueRoi) / 4;
    const matchesRating = selectedRating === null || avgScore >= selectedRating;

    return matchesCountry && matchesSearch && matchesType && matchesFormat && matchesRating;
  });

  const hasFilters =
    !!searchQuery ||
    countryFilter !== 'all' ||
    selectedType !== 'all' ||
    selectedFormat !== 'all' ||
    selectedRating !== null;

  const resetFilters = () => {
    setSearchQuery('');
    setCountryFilter('all');
    setSelectedType('all');
    setSelectedFormat('all');
    setSelectedRating(null);
  };

  return (
    <div className="space-y-3 max-w-6xl mx-auto px-3 sm:px-4 py-3 animate-in fade-in">
      {/* Page Heading Bar */}
      <CollectionHeading
        kind="location"
        count={filtered.length}
        total={locations.length}
        filtered={hasFilters}
        onReset={resetFilters}
        onCreate={currentUser.role !== 'viewer' ? onOpenNewLocation : undefined}
      />

      {/* Search and Filters Bar */}
      <div className="collection-filters bg-white p-3.5 rounded-2xl border border-slate-200/90 space-y-2.5 shadow-2xs">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              aria-label="ค้นหาทำเล & พื้นที่สาขา"
              type="search"
              placeholder="ค้นหาชื่อห้าง/ตึก, ชั้น, โซน, เลขที่ห้อง, ถนน, จุดเด่น หรือแท็ก..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          {/* Country Toggle Buttons */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs shrink-0 self-start sm:self-auto">
            <button
              type="button"
              aria-pressed={countryFilter === 'all'}
              onClick={() => setCountryFilter('all')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                countryFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              type="button"
              aria-pressed={countryFilter === 'TH'}
              onClick={() => setCountryFilter('TH')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                countryFilter === 'TH' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              <i aria-hidden="true" className="fa-solid fa-location-dot text-[10px] text-sky-600" />
              <span>ไทย (TH)</span>
            </button>
            <button
              type="button"
              aria-pressed={countryFilter === 'CN'}
              onClick={() => setCountryFilter('CN')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                countryFilter === 'CN' ? 'bg-white text-rose-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              <i aria-hidden="true" className="fa-solid fa-location-dot text-[10px] text-rose-500" />
              <span>จีน (CN)</span>
            </button>
          </div>
        </div>

        {/* Location Type Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pt-0.5">
          {locationTypes.map((t) => {
            const isActive = selectedType === t.key;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedType(t.key)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-bold text-[11px] border inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-sky-50/50 text-sky-900 border-sky-200/70 hover:bg-sky-100/60'
                }`}
              >
                <i aria-hidden="true" className={`fa-solid ${t.icon} text-[10px]`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Layout Format & Rating Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 border-t border-slate-100">
          {/* Layout Formats */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Maximize2 className="w-3 h-3 text-sky-600" />
              <span>ผังห้อง:</span>
            </span>
            {layoutFormats.map((fmt) => {
              const isActive = selectedFormat === fmt.key;
              return (
                <button
                  key={fmt.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedFormat(fmt.key)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>

          {/* Rating Filters */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>ศักยภาพ:</span>
            </span>
            {ratingOptions.map((opt) => {
              const isActive = selectedRating === opt.value;
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedRating(opt.value)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap transition-all border inline-flex items-center gap-1 ${
                    isActive
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Locations Card Grid */}
      {filtered.length === 0 ? (
        <CollectionEmpty
          kind="location"
          filtered={hasFilters}
          onReset={resetFilters}
          onCreate={currentUser.role !== 'viewer' ? onOpenNewLocation : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={onSelectLocation}
              onShareToLine={onShareToLine}
            />
          ))}
        </div>
      )}
    </div>
  );
};
