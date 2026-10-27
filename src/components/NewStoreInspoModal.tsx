import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DrinkDetailItem } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { 
  X, 
  Camera, 
  Plus, 
  Trash2, 
  MapPin, 
  Star, 
  Coffee, 
  Sparkles,
  Upload
} from 'lucide-react';

interface NewStoreInspoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewStoreInspoModal: React.FC<NewStoreInspoModalProps> = ({ isOpen, onClose }) => {
  const { addStoreInspo, convertCnyToThb, currentUser, drinkStores, storeCategories } = useApp();

  const [country, setCountry] = useState<'CN' | 'TH'>('CN');
  const [storeCategory, setStoreCategory] = useState<string>(
    storeCategories[0] || 'ชาจีนพรีเมียม & ชาชีส'
  );
  const [storeName, setStoreName] = useState('');
  const [chineseName, setChineseName] = useState('');
  const [brandConcept, setBrandConcept] = useState('');
  const [city, setCity] = useState('กวางโจว (Guangzhou)');
  const [lineId, setLineId] = useState('');
  const [wechatId, setWechatId] = useState('');
  const [phone, setPhone] = useState('');
  
  // 4-Dimension Ratings
  const [tasteRating, setTasteRating] = useState(5);
  const [aestheticsRating, setAestheticsRating] = useState(5);
  const [valueRating, setValueRating] = useState(4);
  const [speedRating, setSpeedRating] = useState(5);

  const [tastingNotes, setTastingNotes] = useState('');
  const [mainVoiceUrl, setMainVoiceUrl] = useState<string | undefined>();
  const [mainVoiceSec, setMainVoiceSec] = useState<number>(0);

  // Photos
  const [storefrontAndAtmosphere, setStorefrontAndAtmosphere] = useState<string[]>([]);
  const [menuBoardPhotos, setMenuBoardPhotos] = useState<string[]>([]);
  const [drinkCupPhotos, setDrinkCupPhotos] = useState<string[]>([]);

  // Drink Items (Batch support)
  const [drinkItems, setDrinkItems] = useState<DrinkDetailItem[]>([]);

  // GPS Location
  const [lat, setLat] = useState<number>(23.1322);
  const [lng, setLng] = useState<number>(113.3274);
  const [addressText, setAddressText] = useState('Tianhe District, Guangzhou');
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

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

  const handleMassDrinkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: DrinkDetailItem = {
          id: `drink-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 5)}`,
          photo: reader.result as string,
          name: '',
          priceRmb: undefined,
          cupSize: '500ml',
          fitMenuTarget: '',
          gimmickNotes: '',
        };
        setDrinkItems((prev) => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addManualDrinkItem = () => {
    setDrinkItems([
      ...drinkItems,
      {
        id: `drink-${Date.now()}`,
        photo: '',
        name: '',
        priceRmb: undefined,
        cupSize: '500ml',
        fitMenuTarget: '',
        gimmickNotes: '',
      },
    ]);
  };

  const removeDrinkItem = (index: number) => {
    setDrinkItems(drinkItems.filter((_, i) => i !== index));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('เบราว์เซอร์ไม่รองรับ GPS');
      return;
    }
    setIsLocating(true);
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
            addr.road || addr.suburb,
            addr.city_district || addr.district,
            addr.city || addr.state || addr.province,
          ].filter(Boolean);
          const resolved =
            placeParts.length > 0
              ? `${placeParts.join(', ')} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
              : `พิกัด GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setCity(resolved);
          setAddressText(resolved);
        } catch {
          const fallback = `พิกัด: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setCity(fallback);
          setAddressText(fallback);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        alert('กรุณาอนุญาตสิทธิ์ Location บนเบราว์เซอร์ หรือพิมพ์ชื่อสาขาด้านบน');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = storeName.trim() || `ร้านน้ำ #${drinkStores.length + 1} (${city})`;

    addStoreInspo({
      storeName: finalName,
      chineseName: chineseName.trim() || undefined,
      storeCategory,
      brandConcept: brandConcept.trim() || undefined,
      city: city.trim(),
      country,
      lineId: lineId.trim() || undefined,
      wechatId: wechatId.trim() || undefined,
      phone: phone.trim() || undefined,
      photos: {
        storefrontAndAtmosphere: storefrontAndAtmosphere.length > 0
          ? storefrontAndAtmosphere
          : ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'],
        menuBoard: menuBoardPhotos,
        drinkCups: drinkCupPhotos,
      },
      ratings: {
        taste: tasteRating,
        aesthetics: aestheticsRating,
        value: valueRating,
        speed: speedRating,
      },
      drinkItems,
      tastingNotes: tastingNotes.trim() || undefined,
      voiceNoteUrl: mainVoiceUrl,
      voiceDurationSec: mainVoiceSec,
      location: {
        lat,
        lng,
        addressText,
      },
      handoffStage: 'awaiting',
      assignedTo: country === 'TH' ? 'คุณแอน (จัดซื้อ/R&D)' : 'ไอซ์ (Scout Head)',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[92vh] flex flex-col text-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              <Coffee className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">บันทึกเรฟร้านน้ำ</h2>
              <p className="text-[11px] text-slate-500">เน้นเก็บรูปแก้ว รสชาติ และไอเดียกิมมิกต่อยอด</p>
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
                if (city === 'กรุงเทพฯ (Bangkok)' || city === 'กรุงเทพฯ' || city === 'สยามสแควร์ กรุงเทพฯ') {
                  setCity('กวางโจว (Guangzhou)');
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
                if (city === 'กวางโจว (Guangzhou)' || !city) {
                  setCity('กรุงเทพฯ (Bangkok)');
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

          {/* Section 1: Photos of Storefront & Atmosphere */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              1. รูปหน้าร้าน & บรรยากาศ ({storefrontAndAtmosphere.length})
            </span>

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

            <label className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 hover:border-amber-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm active:scale-[0.99] transition-all">
              <Camera className="w-4 h-4 text-amber-600" />
              <span>+ เลือกรูปจากอัลบั้ม / ถ่ายภาพหน้าร้าน (เลือกได้หลายรูปพร้อมกัน)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMultiPhotoUpload(e, setStorefrontAndAtmosphere)}
                className="hidden"
              />
            </label>

            {/* หมวดหมู่เฉพาะร้านน้ำ & เรฟ */}
            <div className="pt-1">
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                🧋 หมวดหมู่ร้านน้ำ & เรฟ (เลือกประเภท):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {storeCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setStoreCategory(cat)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                      storeCategory === cat
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">
                  ชื่อร้านน้ำ (ไม่บังคับพิมพ์)
                </label>
                <input
                  type="text"
                  placeholder="เช่น CHAGEE, HEYTEA (เว้นว่างได้)"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">
                  ชื่อภาษาจีน (ถ้ามี)
                </label>
                <input
                  type="text"
                  placeholder="เช่น 霸王茶姬"
                  value={chineseName}
                  onChange={(e) => setChineseName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-slate-500">📍 เมือง / สาขา</label>
                  <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-amber-700 hover:underline"
                  >
                    ดูพิกัดบน Maps ↗
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="เช่น กวางโจว (Grandview Mall)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-20 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="absolute right-1.5 top-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold hover:bg-amber-600 transition-colors"
                  >
                    {isLocating ? 'กำลังดึง...' : '📍 ดึง GPS จริง'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">คอนเซปต์ / สไตล์เด่น</label>
                <input
                  type="text"
                  placeholder="เช่น ชานมดอกไม้พรีเมียม / น้ำซ่าผลไม้"
                  value={brandConcept}
                  onChange={(e) => setBrandConcept(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Optional Contacts */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                ช่องทางติดต่อแฟรนไชส์ / เจ้าของร้าน (ถ้ามี):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder={country === 'TH' ? 'LINE ID (หลักในไทย)' : 'LINE ID'}
                  value={lineId}
                  onChange={(e) => setLineId(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                />
                <input
                  type="text"
                  placeholder={country === 'CN' ? 'WeChat ID (หลักในจีน)' : 'WeChat ID'}
                  value={wechatId}
                  onChange={(e) => setWechatId(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                />
                <input
                  type="text"
                  placeholder={country === 'TH' ? 'เบอร์โทรไทย' : 'เบอร์โทรจีน'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: 4-Dimension Rating Dolls */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-2.5">
            <span className="text-xs font-bold text-slate-800 block">2. ให้คะแนนประเมิน (Rating Dolls)</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">👅 รสชาติ</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setTasteRating(s)}
                      className={`text-sm ${s <= tasteRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">✨ ดีไซน์แก้ว</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setAestheticsRating(s)}
                      className={`text-sm ${s <= aestheticsRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">💰 คุ้มค่า</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setValueRating(s)}
                      className={`text-sm ${s <= valueRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">⚡ บริการเร็ว</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSpeedRating(s)}
                      className={`text-sm ${s <= speedRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Menu Board & Cup Photos */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">3. รูปป้ายเมนู & แก้วเครื่องดื่ม</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 hover:border-amber-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>+ เลือกรูป / ถ่ายป้ายเมนู ({menuBoardPhotos.length})</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleMultiPhotoUpload(e, setMenuBoardPhotos)}
                  className="hidden"
                />
              </label>

              <label className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 hover:border-amber-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>+ เลือกรูป / ถ่ายแก้วแพ็กเกจจิ้ง ({drinkCupPhotos.length})</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleMultiPhotoUpload(e, setDrinkCupPhotos)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Section 4: Mass Drink Upload with Voice Memo per Item */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  4. เมนูที่ชิม & ถอดรหัสสูตร ({drinkItems.length})
                </span>
                <p className="text-[11px] text-slate-500">
                  อัปโหลดรูปเครื่องดื่มพร้อมกันหลายรูปเพื่อสร้างรายการอัตโนมัติ
                </p>
              </div>

              <button
                type="button"
                onClick={addManualDrinkItem}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:border-amber-500 text-slate-700 shadow-sm"
              >
                + เพิ่มว่าง
              </button>
            </div>

            <label className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl cursor-pointer transition-colors shadow-sm">
              <Upload className="w-6 h-6 text-amber-600 mb-1" />
              <span className="text-xs font-bold text-slate-800">
                แตะเพื่อเลือกรูปจากอัลบั้มในเครื่อง หรือถ่ายภาพเครื่องดื่มหลายรูปพร้อมกัน
              </span>
              <span className="text-[10px] text-slate-400">
                เลือกทีเดียวหลายๆ รูป ระบบจะสร้างการ์ดเมนูแยกให้ทันที
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMassDrinkUpload}
                className="hidden"
              />
            </label>

            {drinkItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">แก้วที่ #{idx + 1}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeDrinkItem(idx)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex gap-3">
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

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <input
                      type="text"
                      placeholder="ชื่อเมนูเครื่องดื่ม (เว้นว่างได้)"
                      value={item.name || ''}
                      onChange={(e) => {
                        const updated = [...drinkItems];
                        updated[idx].name = e.target.value;
                        setDrinkItems(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-medium"
                    />

                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="ราคา ¥"
                          value={item.priceRmb || ''}
                          onChange={(e) => {
                            const updated = [...drinkItems];
                            const val = parseFloat(e.target.value);
                            updated[idx].priceRmb = isNaN(val) ? undefined : val;
                            setDrinkItems(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 font-mono"
                        />
                        {item.priceRmb && (
                          <span className="text-[9px] text-amber-600 font-mono block">
                            ≈฿{convertCnyToThb(item.priceRmb).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="ขนาดแก้ว เช่น 500ml"
                        value={item.cupSize || ''}
                        onChange={(e) => {
                          const updated = [...drinkItems];
                          updated[idx].cupSize = e.target.value;
                          setDrinkItems(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 font-mono"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="💡 ไอเดียเชื่อมโยงสูตรเรา เช่น ต่อยอด A1 เบอร์รีบลูม..."
                      value={item.fitMenuTarget || ''}
                      onChange={(e) => {
                        const updated = [...drinkItems];
                        updated[idx].fitMenuTarget = e.target.value;
                        setDrinkItems(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">วอยซ์เสียงเฉพาะแก้วนี้:</span>
                  <div className="flex-1 max-w-[240px]">
                    <AudioRecorder
                      initialAudioUrl={item.voiceNoteUrl}
                      onAudioSaved={(base64) => {
                        const updated = [...drinkItems];
                        updated[idx].voiceNoteUrl = base64;
                        setDrinkItems(updated);
                      }}
                      onAudioDeleted={() => {
                        const updated = [...drinkItems];
                        updated[idx].voiceNoteUrl = undefined;
                        setDrinkItems(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 5: Main Voice & Tasting Notes */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">5. วอยซ์เสียงภาพรวม & โน้ตชิม</span>
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
              placeholder="บันทึกความรู้สึก รสชาติ ความหอม หรือกิมมิกที่อยากนำมาใช้กับ VIT CHA..."
              value={tastingNotes}
              onChange={(e) => setTastingNotes(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>
        </form>

        {/* Footer */}
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
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 active:scale-95 transition-all"
            >
              บันทึกร้านน้ำ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
