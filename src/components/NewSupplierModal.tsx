import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CatalogItem } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { 
  X, 
  Camera, 
  Plus, 
  Trash2, 
  MapPin, 
  Star, 
  Sparkles,
  Upload,
  Check,
  Mic,
  Tag,
  Factory
} from 'lucide-react';

interface NewSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewSupplierModal: React.FC<NewSupplierModalProps> = ({ isOpen, onClose }) => {
  const { 
    addSupplier, 
    convertCnyToThb, 
    currentUser, 
    suppliers, 
    categories, 
    quickTagsList,
    addQuickTag,
    setActiveTab,
  } = useApp();

  const [country, setCountry] = useState<'CN' | 'TH'>('CN');
  const [name, setName] = useState('');
  const [chineseName, setChineseName] = useState('');
  const [marketOrCity, setMarketOrCity] = useState('กวางโจว (Guangzhou)');
  const [category, setCategory] = useState(categories[0] || 'เคาน์เตอร์ & สเตนเลส');
  const [rating, setRating] = useState(5);
  
  const [selectedTags, setSelectedTags] = useState<string[]>([
    quickTagsList[0] || 'โรงงานผลิตเอง (Manufacturer)',
  ]);
  const [inlineNewTag, setInlineNewTag] = useState('');
  const [showInlineAddTag, setShowInlineAddTag] = useState(false);

  const [phone, setPhone] = useState('');
  const [wechatId, setWechatId] = useState('');
  const [lineId, setLineId] = useState('');
  const [memo, setMemo] = useState('');
  const [mainVoiceUrl, setMainVoiceUrl] = useState<string | undefined>();
  const [mainVoiceSec, setMainVoiceSec] = useState<number>(0);

  // Photos
  const [storefrontAndAtmosphere, setStorefrontAndAtmosphere] = useState<string[]>([]);
  const [contactCards, setContactCards] = useState<string[]>([]);

  // Batch Catalog Items (รองรับภาพล้วนๆ แยกการ์ดอัตโนมัติ)
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);

  // GPS Location
  const [lat, setLat] = useState<number>(23.0965);
  const [lng, setLng] = useState<number>(113.3644);
  const [addressText, setAddressText] = useState('กวางโจว (Guangzhou)');
  const [isLocating, setIsLocating] = useState(false);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Toggle quick tags
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Mass batch photo upload for catalog: Upload multiple photos -> automatically creates individual items!
  const handleMassCatalogUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: CatalogItem = {
          id: `item-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 5)}`,
          photo: reader.result as string,
          name: '',
          dimensions: '',
          weightKg: '',
          priceRmb: undefined,
          memo: '',
        };
        setCatalogItems((prev) => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Generic photo array upload
  const handleMultiPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addManualCatalogItem = () => {
    setCatalogItems([
      ...catalogItems,
      {
        id: `item-${Date.now()}`,
        photo: '',
        name: '',
        dimensions: '',
        weightKg: '',
        priceRmb: undefined,
        memo: '',
      },
    ]);
  };

  const removeCatalogItem = (index: number) => {
    setCatalogItems(catalogItems.filter((_, i) => i !== index));
  };

  // Get current GPS + Reverse Geocode via OpenStreetMap Nominatim
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatusMsg('เบราว์เซอร์ไม่รองรับ GPS');
      return;
    }
    setIsLocating(true);
    setGpsStatusMsg('กำลังค้นหาสัญญาณดาวเทียม GPS...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setLat(latitude);
        setLng(longitude);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=th,en`
          );
          const data = await res.json();
          const addr = data?.address || {};
          const placeParts = [
            addr.road || addr.suburb || addr.neighbourhood,
            addr.city_district || addr.district || addr.county,
            addr.city || addr.state || addr.province,
          ].filter(Boolean);
          const resolvedName =
            placeParts.length > 0
              ? `${placeParts.join(', ')} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
              : `พิกัด GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setMarketOrCity(resolvedName);
          setAddressText(resolvedName);
          setGpsStatusMsg(`✓ ดึงพิกัดจริงสำเร็จ (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        } catch {
          const fallbackCoord = `พิกัด GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setMarketOrCity(fallbackCoord);
          setAddressText(fallbackCoord);
          setGpsStatusMsg(`✓ บันทึกพิกัดจริง (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setGpsStatusMsg('⚠️ กรุณากดอนุญาตสิทธิ์ Location บนเบราว์เซอร์ หรือพิมพ์ชื่อเมืองด้านบน');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Zero forced typing: default to fallback name if user didn't type anything!
    const finalName = name.trim() || `ซัพพลายเออร์ #${suppliers.length + 1} (${category})`;

    addSupplier({
      name: finalName,
      chineseName: chineseName.trim() || undefined,
      marketOrCity: marketOrCity.trim() || addressText,
      category,
      country,
      rating,
      quickTags: selectedTags,
      isFactory: selectedTags.includes('โรงงานผลิตเอง (Manufacturer)'),
      phone: phone.trim() || undefined,
      wechatId: wechatId.trim() || undefined,
      lineId: lineId.trim() || undefined,
      photos: {
        storefrontAndAtmosphere: storefrontAndAtmosphere.length > 0
          ? storefrontAndAtmosphere
          : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'],
        contactCards,
      },
      catalogItems,
      memo: memo.trim() || undefined,
      voiceNoteUrl: mainVoiceUrl,
      voiceDurationSec: mainVoiceSec,
      location: {
        lat,
        lng,
        addressText: marketOrCity.trim() || addressText,
      },
      status: 'scouted',
      handoffStage: 'awaiting',
      assignedTo: country === 'TH' ? 'ช่างบีม (วิศวกร)' : 'ไอซ์ (Scout Head)',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[92vh] flex flex-col text-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              <Factory className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">บันทึกซัพพลายเออร์</h2>
              <p className="text-[11px] text-slate-500">เน้นถ่ายภาพรัวๆ ข้อมูลพิมพ์ทีหลังได้ หรือบันทึกเฉพาะภาพล้วน</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Dual-Country Switcher (จีน / ไทย) */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80">
            <button
              type="button"
              onClick={() => {
                setCountry('CN');
                if (marketOrCity === 'กรุงเทพฯ (Bangkok)' || marketOrCity === 'กรุงเทพฯ') {
                  setMarketOrCity('กวางโจว (Guangzhou)');
                }
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                country === 'CN'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-sm">🇨🇳</span>
              <span>ค้นคว้าในจีน (China)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCountry('TH');
                if (marketOrCity === 'กวางโจว (Guangzhou)' || !marketOrCity) {
                  setMarketOrCity('กรุงเทพฯ (Bangkok)');
                }
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                country === 'TH'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-sm">🇹🇭</span>
              <span>ค้นคว้าในไทย (Thailand)</span>
            </button>
          </div>

          {/* Section 1: Storefront & Atmosphere Photos + Main Info (รวมกันตามสั่ง) */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">1. รูปป้ายหน้าร้าน & บรรยากาศ ({storefrontAndAtmosphere.length})</span>
              {/* Star Rating */}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-0.5 text-base"
                  >
                    <span className={star <= rating ? 'text-amber-400' : 'text-slate-200'}>★</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo preview strip */}
            {storefrontAndAtmosphere.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {storefrontAndAtmosphere.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0"
                  />
                ))}
              </div>
            )}

            {/* Quick Upload Button */}
            <label className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm active:scale-[0.99] transition-all">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>+ เลือกรูปจากอัลบั้มในเครื่อง / ถ่ายภาพป้ายหน้าร้าน (เลือกได้หลายรูป)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMultiPhotoUpload(e, setStorefrontAndAtmosphere)}
                className="hidden"
              />
            </label>

            {/* Basic Info (NO REQUIRED FIELDS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">
                  ชื่อร้าน / ซัพพลายเออร์ (ไม่บังคับพิมพ์)
                </label>
                <input
                  type="text"
                  placeholder="เช่น FEST / Rongchuan (เว้นว่างได้)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">
                  ชื่อภาษาจีน (ถ้ามี)
                </label>
                <input
                  type="text"
                  placeholder="เช่น 广州荣创 (เว้นว่างได้)"
                  value={chineseName}
                  onChange={(e) => setChineseName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Location with Real GPS + Reverse Geocoding */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-slate-500">
                    📍 ทำเล / ตลาด / เมือง
                  </label>
                  <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-emerald-700 hover:underline"
                  >
                    ดูพิกัดบน Maps ↗
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="เช่น ตลาดเครื่องครัวผานหยู, สยามสแควร์..."
                    value={marketOrCity}
                    onChange={(e) => setMarketOrCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-20 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="absolute right-1.5 top-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold hover:bg-emerald-600 transition-colors"
                  >
                    {isLocating ? 'กำลังดึง...' : '📍 ดึง GPS จริง'}
                  </button>
                </div>
                {gpsStatusMsg && (
                  <p className="text-[10px] text-emerald-700 font-medium mt-1">
                    {gpsStatusMsg}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-slate-500">หมวดหมู่อุปกรณ์/สินค้า</label>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setActiveTab('settings');
                    }}
                    className="text-[10px] font-bold text-emerald-700 hover:underline"
                  >
                    ⚙️ เพิ่ม/แก้ไขหมวดหมู่
                  </button>
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick-tap checklist tags (ทางลัดการติ๊กหน้างาน — ซิงก์กับหน้าตั้งค่า) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-600" />
                  <span>แตะเลือกจุดเด่นทางลัด:</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowInlineAddTag(!showInlineAddTag)}
                    className="text-[10px] font-bold text-slate-700 hover:text-emerald-700"
                  >
                    + เพิ่มปุ่มด่วน
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setActiveTab('settings');
                    }}
                    className="text-[10px] font-bold text-emerald-700 hover:underline"
                  >
                    ⚙️ ตั้งค่าจุดเด่นทางลัด
                  </button>
                </div>
              </div>

              {showInlineAddTag && (
                <div className="flex gap-1.5 mb-2">
                  <input
                    type="text"
                    placeholder="พิมพ์จุดเด่นทางลัดใหม่..."
                    value={inlineNewTag}
                    onChange={(e) => setInlineNewTag(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (inlineNewTag.trim()) {
                        addQuickTag(inlineNewTag.trim());
                        setSelectedTags((prev) => [...prev, inlineNewTag.trim()]);
                        setInlineNewTag('');
                        setShowInlineAddTag(false);
                      }
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                  >
                    บันทึก
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {quickTagsList.map((tag) => {
                  const isChecked = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                        isChecked
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: Contact Photos & Info (อัปโหลดรูปนามบัตร/WeChat ไม่จำกัด) */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              2. ช่องทางการติดต่อ & นามบัตร/WeChat ({contactCards.length})
            </span>

            {contactCards.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {contactCards.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0"
                  />
                ))}
              </div>
            )}

            <label className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm active:scale-[0.99] transition-all">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>+ เลือกรูปจากอัลบั้ม / ถ่ายรูปนามบัตร / QR WeChat (ไม่อั้น)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMultiPhotoUpload(e, setContactCards)}
                className="hidden"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">
                  {country === 'TH' ? 'LINE ID (หลักในไทย)' : 'LINE ID'}
                </label>
                <input
                  type="text"
                  placeholder="@vitcha.th"
                  value={lineId}
                  onChange={(e) => setLineId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">
                  {country === 'CN' ? 'WeChat ID (หลักในจีน)' : 'WeChat ID'}
                </label>
                <input
                  type="text"
                  placeholder="wxid_xxxx"
                  value={wechatId}
                  onChange={(e) => setWechatId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">
                  {country === 'TH' ? 'เบอร์โทรไทย' : 'เบอร์โทรจีน'}
                </label>
                <input
                  type="text"
                  placeholder={country === 'TH' ? '08x-xxx-xxxx' : '+86 138-xxxx-xxxx'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Mass Batch Catalog Upload (อัปโหลดรูปทีเดียวพร้อมแบ่งรายการอัตโนมัติ + วอยซ์เฉพาะชิ้น) */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  3. รายการสินค้า / วัตถุดิบ / อุปกรณ์ที่สนใจ ({catalogItems.length})
                </span>
                <p className="text-[11px] text-slate-500">
                  อัปโหลดรูปหลายรูปพร้อมกัน ระบบจะสร้างเป็นการ์ดแยกให้ทันที (ภาพล้วนก็ได้)
                </p>
              </div>

              <button
                type="button"
                onClick={addManualCatalogItem}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 shadow-sm"
              >
                + เพิ่มว่าง
              </button>
            </div>

            {/* Big Mass Photo Upload Trigger Button */}
            <label className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer transition-colors shadow-sm">
              <Upload className="w-6 h-6 text-emerald-600 mb-1" />
              <span className="text-xs font-bold text-slate-800">
                แตะเพื่อเลือกรูปจากอัลบั้มในเครื่อง / ถ่ายรูปหลายรูปพร้อมกัน (Batch Upload)
              </span>
              <span className="text-[10px] text-slate-400">
                เลือกทีเดียว 5-10 รูป ระบบจะสร้างรายการให้ทันทีโดยไม่ต้องพิมพ์
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMassCatalogUpload}
                className="hidden"
              />
            </label>

            {/* List of Catalog Items */}
            {catalogItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">รายการ #{idx + 1}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCatalogItem(idx)}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="ลบรายการนี้"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex gap-3">
                  {/* Item Photo thumbnail */}
                  <div className="shrink-0">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                        ไม่มีรูป
                      </div>
                    )}
                  </div>

                  {/* Flexible fields */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <input
                      type="text"
                      placeholder="ชื่อสินค้า/อุปกรณ์/ชา (ไม่พิมพ์ก็ได้)"
                      value={item.name || ''}
                      onChange={(e) => {
                        const updated = [...catalogItems];
                        updated[idx].name = e.target.value;
                        setCatalogItems(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                    />

                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="ราคา ¥"
                          value={item.priceRmb || ''}
                          onChange={(e) => {
                            const updated = [...catalogItems];
                            const val = parseFloat(e.target.value);
                            updated[idx].priceRmb = isNaN(val) ? undefined : val;
                            setCatalogItems(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 font-mono"
                        />
                        {item.priceRmb && (
                          <span className="text-[9px] text-amber-600 font-mono block">
                            ≈฿{convertCnyToThb(item.priceRmb).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Weight instead of wattage as requested */}
                      <input
                        type="text"
                        placeholder="น้ำหนัก (kg) / ขนาด"
                        value={item.weightKg || ''}
                        onChange={(e) => {
                          const updated = [...catalogItems];
                          updated[idx].weightKg = e.target.value;
                          setCatalogItems(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 font-mono"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="เมมโมข้อความเฉพาะชิ้นนี้..."
                      value={item.memo || ''}
                      onChange={(e) => {
                        const updated = [...catalogItems];
                        updated[idx].memo = e.target.value;
                        setCatalogItems(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900"
                    />
                  </div>
                </div>

                {/* Voice memo specific to this item! */}
                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">วอยซ์เสียงเฉพาะรายการนี้:</span>
                  <div className="flex-1 max-w-[240px]">
                    <AudioRecorder
                      initialAudioUrl={item.voiceNoteUrl}
                      onAudioSaved={(base64, duration) => {
                        const updated = [...catalogItems];
                        updated[idx].voiceNoteUrl = base64;
                        updated[idx].voiceDurationSec = duration;
                        setCatalogItems(updated);
                      }}
                      onAudioDeleted={() => {
                        const updated = [...catalogItems];
                        updated[idx].voiceNoteUrl = undefined;
                        updated[idx].voiceDurationSec = 0;
                        setCatalogItems(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Main Voice Memo & General Notes */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">4. วอยซ์เสียงภาพรวม & โน้ตกันลืม</span>
            <AudioRecorder
              initialAudioUrl={mainVoiceUrl}
              onAudioSaved={(base64, duration) => {
                setMainVoiceUrl(base64);
                setMainVoiceSec(duration);
              }}
              onAudioDeleted={() => {
                setMainVoiceUrl(undefined);
                setMainVoiceSec(0);
              }}
            />

            <textarea
              rows={2}
              placeholder="จดบันทึกภาพรวมความรู้สึก หรือสั่งงานทีมไทย (ไม่พิมพ์ก็ได้)..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-2">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <img src={currentUser.avatar} className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200" />
            <span>โดย: <strong className="text-slate-800">{currentUser.alias}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
            >
              บันทึกเข้าระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
