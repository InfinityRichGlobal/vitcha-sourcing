import { AvatarImage } from './AvatarImage';
import React, { useState, useEffect, useRef } from 'react';
import { useDialog } from '../hooks/useDialog';
import { useApp } from '../context/AppContext';
import { DrinkDetailItem, VoiceNoteEntry } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { getItemVoiceNotes } from '../utils/audioHelper';
import { uploadImageFile as compressImageFile } from '../utils/mediaStorage';
import { saveVideoFile, deleteVideoFile } from '../utils/mediaStorage';
import { VideoPlayer } from './VideoPlayer';
import { UploadablePhotoGrid } from './UploadablePhotoGrid';
import {
  X,
  Camera,
  Trash2,
  Coffee,
  Upload,
  Pencil,
  RefreshCw,
  MapPin,
  Map,
  Loader2,
} from 'lucide-react';
import { LocationPickerModal } from './LocationPickerModal';

interface NewStoreInspoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewStoreInspoModal: React.FC<NewStoreInspoModalProps> = ({ isOpen, onClose }) => {
  const {
    addStoreInspo,
    updateStoreInspo,
    deleteStoreInspo,
    editingStore,
    closeEditItem,
    convertCnyToThb,
    currentUser,
    drinkStores,
    storeCategories,
  } = useApp();

  const isEditMode = !!editingStore;
  const modalOpen = isOpen || isEditMode;
  const dialogRef = useDialog(modalOpen);

  const [country, setCountry] = useState<'CN' | 'TH'>('CN');
  const [storeCategory, setStoreCategory] = useState<string>('');
  const [storeName, setStoreName] = useState('');
  const [chineseName, setChineseName] = useState('');
  const [brandConcept, setBrandConcept] = useState('');
  const [city, setCity] = useState('');
  const [lineId, setLineId] = useState('');
  const [wechatId, setWechatId] = useState('');
  const [phone, setPhone] = useState('');

  // 4-Dimension Ratings (เริ่มต้น 0 คือยังไม่ได้ให้คะแนน)
  const [tasteRating, setTasteRating] = useState(0);
  const [aestheticsRating, setAestheticsRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [speedRating, setSpeedRating] = useState(0);

  const [tastingNotes, setTastingNotes] = useState('');
  const [mainVoiceUrl, setMainVoiceUrl] = useState<string | undefined>();
  const [mainVoiceSec, setMainVoiceSec] = useState<number>(0);
  const [mainVoiceNotes, setMainVoiceNotes] = useState<VoiceNoteEntry[]>([]);

  // Photos & Videos
  const [storefrontAndAtmosphere, setStorefrontAndAtmosphere] = useState<string[]>([]);
  const [menuBoardPhotos, setMenuBoardPhotos] = useState<string[]>([]);
  const [drinkCupPhotos, setDrinkCupPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Drink Items
  const [drinkItems, setDrinkItems] = useState<DrinkDetailItem[]>([]);

  // GPS Location (ไม่ใส่ค่า Default เพื่อไม่ให้ปักหมุดมั่ว)
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');
  const [addressText, setAddressText] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isPickerMapOpen, setIsPickerMapOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [photoTaskCount, setPhotoTaskCount] = useState(0);
  const photoTaskRef = useRef(0);
  const savingRef = useRef(false);
  const audioJobs = useRef(new Set<string>());
  const [audioPending, setAudioPending] = useState(0);
  const audioBusy = (id: string, value: boolean) => { if (value) audioJobs.current.add(id); else audioJobs.current.delete(id); setAudioPending(audioJobs.current.size); };
  const isCompressingPhotos = photoTaskCount > 0;
  const beginPhotos = () => { photoTaskRef.current++; setPhotoTaskCount(photoTaskRef.current); };
  const endPhotos = () => { photoTaskRef.current--; setPhotoTaskCount(photoTaskRef.current); };

  // Populate form when editingStore changes or reset when opening fresh
  useEffect(() => {
    if (editingStore) {
      setCountry(editingStore.country || 'CN');
      setStoreCategory(editingStore.storeCategory || '');
      setStoreName(editingStore.storeName || '');
      setChineseName(editingStore.chineseName || '');
      setBrandConcept(editingStore.brandConcept || '');
      setCity(editingStore.city || '');
      setLineId(editingStore.lineId || '');
      setWechatId(editingStore.wechatId || '');
      setPhone(editingStore.phone || '');
      setTasteRating(editingStore.ratings?.taste ?? 0);
      setAestheticsRating(editingStore.ratings?.aesthetics ?? 0);
      setValueRating(editingStore.ratings?.value ?? 0);
      setSpeedRating(editingStore.ratings?.speed ?? 0);
      setTastingNotes(editingStore.tastingNotes || '');
      setMainVoiceUrl(editingStore.voiceNoteUrl);
      setMainVoiceSec(editingStore.voiceDurationSec || 0);
      setMainVoiceNotes(getItemVoiceNotes(editingStore));
      setStorefrontAndAtmosphere(editingStore.photos?.storefrontAndAtmosphere || []);
      setMenuBoardPhotos(editingStore.photos?.menuBoard || []);
      setDrinkCupPhotos(editingStore.photos?.drinkCups || []);
      setVideos(editingStore.videos || []);
      setDrinkItems(editingStore.drinkItems || []);
      setLat(editingStore.location?.lat && editingStore.location.lat !== 0 ? editingStore.location.lat : '');
      setLng(editingStore.location?.lng && editingStore.location.lng !== 0 ? editingStore.location.lng : '');
      setAddressText(editingStore.location?.addressText || editingStore.city || '');
    } else if (isOpen) {
      setCountry('CN');
      setStoreCategory('');
      setStoreName('');
      setChineseName('');
      setBrandConcept('');
      setCity('');
      setLineId('');
      setWechatId('');
      setPhone('');
      setTasteRating(0);
      setAestheticsRating(0);
      setValueRating(0);
      setSpeedRating(0);
      setTastingNotes('');
      setMainVoiceUrl(undefined);
      setMainVoiceSec(0);
      setMainVoiceNotes([]);
      setStorefrontAndAtmosphere([]);
      setMenuBoardPhotos([]);
      setDrinkCupPhotos([]);
      setVideos([]);
      setDrinkItems([]);
      setLat('');
      setLng('');
      setAddressText('');
    }
  }, [editingStore, isOpen]);

  if (!modalOpen) return null;

  const handleCloseAll = () => {
    if (savingRef.current || photoTaskRef.current || audioJobs.current.size || isVideoLoading || isLocating) return;
    closeEditItem();
    onClose();
  };


  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsVideoLoading(true);
    try {
      for (const file of Array.from(files)) {
        const videoData = await saveVideoFile(file);
        if (videoData) {
          setVideos((prev) => [...prev, videoData]);
        }
      }
    } catch (err: any) {
      alert(err.message || 'ไม่สามารถอัปโหลดวิดีโอได้');
    } finally {
      setIsVideoLoading(false);
      e.target.value = '';
    }
  };

  const handleRemoveVideo = (index: number) => {
    setVideos(previous => previous.filter((_, i) => i !== index));
  };

  const handleMassDrinkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems: DrinkDetailItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      photo: URL.createObjectURL(file),
      name: '',
      cupSize: '500ml',
      fitMenuTarget: '',
      gimmickNotes: '',
      voiceNotes: [],
    }));

    // Instantly display items on screen
    setDrinkItems((previous) => [...previous, ...newItems]);

    // Upload in parallel
    files.forEach((file, idx) => {
      const targetId = newItems[idx].id;
      beginPhotos();
      compressImageFile(file, 900, 0.72, {
        recordType: 'drink_stores',
        recordTitle: storeName || 'ร้านน้ำเรฟ',
        recordId: editingStore?.id,
      })
        .then((uploadedUrl) => {
          setDrinkItems((prev) =>
            prev.map((it) => (it.id === targetId ? { ...it, photo: uploadedUrl } : it))
          );
        })
        .catch((err) => {
          console.error('Failed to upload drink photo:', err);
        })
        .finally(() => {
          endPhotos();
        });
    });

    e.target.value = '';
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
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=th,en`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error('Address lookup failed');
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
          clearTimeout(timeout);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (savingRef.current || audioJobs.current.size || isVideoLoading || isLocating) return;
    const finalCategory = storeCategory.trim() || (isEditMode && editingStore ? editingStore.storeCategory : '') || (storeCategories[0] || 'ชาผลไม้ & ชีสที');
    if (photoTaskRef.current > 0 || drinkItems.some((it) => it.photo?.startsWith('blob:'))) {
      alert('กำลังอัปโหลดรูปภาพ กรุณารอสักครู่');
      return;
    }
    savingRef.current = true;
    setIsSaving(true);

    try {
      const finalName = storeName.trim() || (isEditMode && editingStore ? editingStore.storeName : `ร้านน้ำ #${drinkStores.length + 1} (${city || 'ทั่วไป'})`);

      if (isEditMode && editingStore) {
        if (!await updateStoreInspo(editingStore.id, {
          storeName: finalName,
          chineseName: chineseName.trim() || undefined,
          storeCategory: finalCategory,
          brandConcept: brandConcept.trim() || undefined,
          city: city.trim(),
          country,
          lineId: lineId.trim() || undefined,
          wechatId: wechatId.trim() || undefined,
          phone: phone.trim() || undefined,
          photos: {
            storefrontAndAtmosphere,
            menuBoard: menuBoardPhotos,
            drinkCups: drinkCupPhotos,
          },
          videos,
          ratings: {
            taste: tasteRating,
            aesthetics: aestheticsRating,
            value: valueRating,
            speed: speedRating,
          },
          drinkItems,
          tastingNotes: tastingNotes.trim() || undefined,
          voiceNoteUrl: mainVoiceNotes[0]?.url || mainVoiceUrl,
          voiceDurationSec: mainVoiceNotes[0]?.durationSec || mainVoiceSec,
          voiceNotes: mainVoiceNotes,
          location: {
            lat: typeof lat === 'number' && lat !== 0 ? Number(lat) : 0,
            lng: typeof lng === 'number' && lng !== 0 ? Number(lng) : 0,
            addressText: city.trim() || addressText,
          },
        })) return;
      } else {
        if (!await addStoreInspo({
          storeName: finalName,
          chineseName: chineseName.trim() || undefined,
          storeCategory: finalCategory,
          brandConcept: brandConcept.trim() || undefined,
          city: city.trim(),
          country,
          lineId: lineId.trim() || undefined,
          wechatId: wechatId.trim() || undefined,
          phone: phone.trim() || undefined,
          photos: {
            storefrontAndAtmosphere,
            menuBoard: menuBoardPhotos,
            drinkCups: drinkCupPhotos,
          },
          videos,
          ratings: {
            taste: tasteRating,
            aesthetics: aestheticsRating,
            value: valueRating,
            speed: speedRating,
          },
          drinkItems,
          tastingNotes: tastingNotes.trim() || undefined,
          voiceNoteUrl: mainVoiceNotes[0]?.url || mainVoiceUrl,
          voiceDurationSec: mainVoiceNotes[0]?.durationSec || mainVoiceSec,
          voiceNotes: mainVoiceNotes,
          location: {
            lat: typeof lat === 'number' && lat !== 0 ? Number(lat) : 0,
            lng: typeof lng === 'number' && lng !== 0 ? Number(lng) : 0,
            addressText: city.trim() || addressText,
          },
          handoffStage: 'awaiting',
          assignedTo: country === 'TH' ? 'แอน (จัดซื้อ)' : 'SuperiCez',
        })) return;
      }

      savingRef.current = false;
      handleCloseAll();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูลขึ้นเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง');
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingStore) return;
    if (window.confirm(`ยืนยันการลบรายการ "${editingStore.storeName}" หรือไม่?`)) {
      setIsSaving(true);
      try {
        if (!await deleteStoreInspo(editingStore.id)) return;
        savingRef.current = false;
      handleCloseAll();
      } catch {
        alert('เซิร์ฟเวอร์ยังไม่ยืนยันการลบ กรุณารีเฟรชเพื่อตรวจสอบรายการ');
      } finally {
        savingRef.current = false;
      setIsSaving(false);
      }
    }
  };

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="บันทึกรายการ" className="fixed inset-0 z-[110] bg-black/45 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[92vh] supports-[height:100dvh]:max-h-[92dvh] flex flex-col text-slate-900">
        {audioPending > 0 && <div role="status" className="border-b border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">กำลังอัดหรือส่งเสียงขึ้นเซิร์ฟเวอร์ กรุณารอให้ครบก่อนบันทึก</div>}
        {(isCompressingPhotos || isVideoLoading) && <div role="status" className="border-b border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{isVideoLoading ? 'กำลังอัปโหลดวิดีโอ กรุณารอให้ครบก่อนบันทึก' : `กำลังประมวลผลรูปภาพ ${photoTaskCount} ชุด กรุณารอสักครู่`}</div>}
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              {isEditMode ? (
                <Pencil className="w-4 h-4 text-amber-600" />
              ) : (
                <Coffee className="w-4 h-4 text-amber-600" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                {isEditMode ? `แก้ไขเรฟร้านน้ำ: ${editingStore?.storeName}` : 'บันทึกเรฟร้านน้ำ'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {isEditMode
                  ? 'แก้ไขรูปภาพ เมนูที่ชิม คะแนนประเมิน หรือพิกัดได้ทุกจุด'
                  : 'เน้นเก็บรูปแก้ว รสชาติ และไอเดียกิมมิกต่อยอด'}
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseAll}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 min-h-0">
          <fieldset disabled={isSaving} className="contents">
          {/* Dual-Country Switcher (จีน / ไทย) */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setCountry('CN')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                country === 'CN'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <i className="fa-solid fa-location-dot text-rose-500 text-xs" />
              <span>ค้นคว้าในจีน (China)</span>
            </button>
            <button
              type="button"
              onClick={() => setCountry('TH')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                country === 'TH'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <i className="fa-solid fa-location-dot text-sky-600 text-xs" />
              <span>ค้นคว้าในไทย (Thailand)</span>
            </button>
          </div>

          {/* Section 1: Photos of Storefront & Atmosphere */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <UploadablePhotoGrid
              label="1. รูปหน้าร้าน & บรรยากาศคนเดิน"
              emptyText="ยังไม่มีรูปหน้าร้าน"
              urls={storefrontAndAtmosphere}
              onChange={setStorefrontAndAtmosphere}
              recordType="drink_stores"
              recordTitle={storeName || 'ร้านน้ำเรฟ'}
              recordId={editingStore?.id}
              onBeginUpload={beginPhotos}
              onEndUpload={endPhotos}
            />

            {/* หมวดหมู่เฉพาะร้านน้ำ & เรฟ */}
            <div className="pt-1">
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <i className="fa-solid fa-mug-hot text-amber-600 text-[10px]" />
                <span>หมวดหมู่ร้านน้ำ & เรฟ (จำเป็นต้องเลือก) *</span>
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
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  ชื่อร้านค้า / แบรนด์ <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น CHAGEE, HEYTEA"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                  required
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
                <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                  <label className="text-[11px] font-medium text-slate-500">📍 เมือง / สาขา / ที่ตั้ง</label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold hover:bg-amber-600 transition-colors inline-flex items-center gap-1"
                      title="ดึงพิกัด GPS จากตำแหน่งปัจจุบันของคุณ"
                    >
                      <RefreshCw className={`w-2.5 h-2.5 ${isLocating ? 'animate-spin' : ''}`} />
                      <span>{isLocating ? 'กำลังดึง...' : '📍 ดึง GPS จริง'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPickerMapOpen(true)}
                      className="px-2 py-0.5 rounded-lg bg-amber-600 text-white text-[10px] font-bold hover:bg-amber-700 transition-colors inline-flex items-center gap-1"
                      title="เปิดแผนที่เพื่อเลื่อนหาพิกัดหรือจิ้มปักหมุด"
                    >
                      <Map className="w-2.5 h-2.5" />
                      <span>🗺️ เลือกบนแผนที่</span>
                    </button>
                    {Boolean(lat || lng) && (
                      <button
                        type="button"
                        onClick={() => { setLat(''); setLng(''); }}
                        className="text-[10px] text-slate-400 hover:text-rose-600 underline font-medium ml-1"
                      >
                        ล้างพิกัด
                      </button>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="เช่น กวางโจว (Grandview Mall), สยามสแควร์วัน"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                {Boolean(lat && lng) ? (
                  <div className="flex items-center justify-between text-[10px] text-amber-800 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60 mt-1">
                    <span className="font-mono font-bold">📍 ปักหมุด: {Number(lat).toFixed(4)}, {Number(lng).toFixed(4)}</span>
                    <a
                      href={`https://www.google.com/maps?q=${lat},${lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-700 font-bold hover:underline"
                    >
                      ดูพิกัดบน Maps ↗
                    </a>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium mt-1">
                    ยังไม่ได้ระบุพิกัด GPS (สามารถแตะ <strong>เลือกบนแผนที่</strong> หรือข้ามได้)
                  </p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">
                  คอนเซปต์ / สไตล์เด่น
                </label>
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
            <span className="text-xs font-bold text-slate-800 block">
              2. ให้คะแนนประเมิน 4 มิติ
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">👅 รสชาติ</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setTasteRating(tasteRating === s ? 0 : s)}
                      className={`text-sm ${s <= tasteRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="text-[10px] block text-slate-400 font-mono">
                  {tasteRating > 0 ? `${tasteRating}/5` : '(ยังไม่ได้ให้คะแนน)'}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">✨ ดีไซน์แก้ว</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setAestheticsRating(aestheticsRating === s ? 0 : s)}
                      className={`text-sm ${
                        s <= aestheticsRating ? 'text-amber-400' : 'text-slate-200'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="text-[10px] block text-slate-400 font-mono">
                  {aestheticsRating > 0 ? `${aestheticsRating}/5` : '(ยังไม่ได้ให้คะแนน)'}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">💰 คุ้มค่า</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setValueRating(valueRating === s ? 0 : s)}
                      className={`text-sm ${s <= valueRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="text-[10px] block text-slate-400 font-mono">
                  {valueRating > 0 ? `${valueRating}/5` : '(ยังไม่ได้ให้คะแนน)'}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-slate-600 font-medium text-[11px] block">⚡ บริการเร็ว</span>
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSpeedRating(speedRating === s ? 0 : s)}
                      className={`text-sm ${s <= speedRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="text-[10px] block text-slate-400 font-mono">
                  {speedRating > 0 ? `${speedRating}/5` : '(ยังไม่ได้ให้คะแนน)'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Menu Board & Cup Photos */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              3. รูปป้ายเมนู & แก้วเครื่องดื่ม
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <UploadablePhotoGrid
                label="ป้ายเมนู / บอร์ดราคา"
                emptyText="ยังไม่มีรูปป้ายเมนู"
                urls={menuBoardPhotos}
                onChange={setMenuBoardPhotos}
                recordType="drink_stores"
                recordTitle={storeName || 'ร้านน้ำเรฟ'}
                recordId={editingStore?.id}
                onBeginUpload={beginPhotos}
                onEndUpload={endPhotos}
              />
              <UploadablePhotoGrid
                label="แก้ว / บรรจุภัณฑ์ / ดีเทล"
                emptyText="ยังไม่มีรูปแก้วเครื่องดื่ม"
                urls={drinkCupPhotos}
                onChange={setDrinkCupPhotos}
                recordType="drink_stores"
                recordTitle={storeName || 'ร้านน้ำเรฟ'}
                recordId={editingStore?.id}
                onBeginUpload={beginPhotos}
                onEndUpload={endPhotos}
              />
            </div>
          </div>

          {/* Section: Videos (คลิปวิดีโอบรรยากาศร้าน & การชงเครื่องดื่ม) */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <i className="fa-solid fa-video text-purple-600" />
                <span>คลิปวิดีโอบรรยากาศร้าน & การชงเครื่องดื่ม ({videos.length})</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ✓ ไม่จำกัดขนาดไฟล์
              </span>
            </div>

            {/* Video preview cards */}
            {videos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                {videos.map((v, i) => (
                  <VideoPlayer
                    key={i}
                    src={v}
                    className="rounded-xl border border-slate-200 shadow-xs h-36"
                    badgeLabel={`คลิป #${i + 1}`}
                    onRemove={() => handleRemoveVideo(i)}
                  />
                ))}
              </div>
            )}

            {/* Video Upload Button */}
            <label className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 hover:border-purple-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm active:scale-[0.99] transition-all">
              <i className="fa-solid fa-video text-purple-600" />
              <span>
                {isVideoLoading
                  ? 'กำลังประมวลผลคลิปวิดีโอ...'
                  : '+ เลือกคลิปวิดีโอจากอัลบั้ม / ถ่ายคลิปวิดีโอใหม่ (ไม่จำกัดขนาดไฟล์)'}
              </span>
              <input
                type="file" disabled={isSaving || isVideoLoading}
                accept="video/*"
                multiple

                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Section 4: Mass Drink Upload */}
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
                type="file" disabled={isSaving || isVideoLoading}
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
                  <label className="shrink-0 cursor-pointer relative group">
                    {item.photo ? (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        <img
                          src={item.photo}
                          alt="drink"
                          className="w-full h-full object-cover group-hover:opacity-80"
                        />
                        {item.photo.startsWith('blob:') && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-1">
                            <Loader2 className="w-4 h-4 animate-spin text-white mb-0.5" />
                            <span className="text-[8px] font-medium leading-none">กำลังอัป...</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 text-center p-1">
                        + แตะใส่รูป
                      </div>
                    )}
                    <input
                      type="file" disabled={isSaving || isVideoLoading}
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const itemId = item.id;
                        const localBlob = URL.createObjectURL(f);
                        setDrinkItems((previous) =>
                          previous.map((entry) => (entry.id === itemId ? { ...entry, photo: localBlob } : entry))
                        );
                        beginPhotos();
                        compressImageFile(f, 900, 0.72, {
                          recordType: 'drink_stores',
                          recordTitle: storeName || 'ร้านน้ำเรฟ',
                          recordId: editingStore?.id,
                        })
                          .then((compressed) => {
                            setDrinkItems((previous) =>
                              previous.map((entry) => (entry.id === itemId ? { ...entry, photo: compressed } : entry))
                            );
                          })
                          .catch((error) => {
                            alert(error instanceof Error ? error.message : 'ประมวลผลรูปไม่สำเร็จ');
                          })
                          .finally(() => {
                            endPhotos();
                          });
                        e.target.value = '';
                      }}
                      className="hidden"
                    />
                  </label>

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

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
                  <span className="text-slate-600 font-bold block">
                    🎙️ วอยซ์เสียงเฉพาะแก้วนี้ (อัดเพิ่มได้ไม่จำกัดจำนวนคลิป):
                  </span>
                  <AudioRecorder
                    onBusyChange={busy => audioBusy(item.id, busy)}
                    voiceNotes={getItemVoiceNotes(item)}
                    initialAudioUrl={item.voiceNoteUrl}
                    initialDurationSec={item.voiceDurationSec}
                    onVoiceNotesChange={(notes) => {
                      setDrinkItems(previous => previous.map(entry => entry.id === item.id ? { ...entry, voiceNotes: notes, voiceNoteUrl: notes[0]?.url, voiceDurationSec: notes[0]?.durationSec || 0 } : entry));
                    }}
                    onAudioSaved={(base64, duration) => {
                      const updated = [...drinkItems];
                      updated[idx].voiceNoteUrl = base64;
                      updated[idx].voiceDurationSec = duration;
                      setDrinkItems(updated);
                    }}
                    onAudioDeleted={() => {
                      const updated = [...drinkItems];
                      updated[idx].voiceNoteUrl = undefined;
                      updated[idx].voiceDurationSec = 0;
                      updated[idx].voiceNotes = [];
                      setDrinkItems(updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Section 5: Main Voice & Tasting Notes */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              5. วอยซ์เสียงภาพรวม & โน้ตชิม (อัดเสียงได้หลายรายการไม่จำกัด)
            </span>
            <AudioRecorder
              onBusyChange={busy => audioBusy('main', busy)}
              voiceNotes={mainVoiceNotes}
              initialAudioUrl={mainVoiceUrl}
              initialDurationSec={mainVoiceSec}
              onVoiceNotesChange={(notes) => {
                setMainVoiceNotes(notes);
                setMainVoiceUrl(notes[0]?.url);
                setMainVoiceSec(notes[0]?.durationSec || 0);
              }}
              onAudioSaved={(base64, duration) => {
                setMainVoiceUrl(base64);
                setMainVoiceSec(duration);
              }}
              onAudioDeleted={() => {
                setMainVoiceUrl(undefined);
                setMainVoiceSec(0);
                setMainVoiceNotes([]);
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
          </fieldset>
        </form>

        {/* Footer */}
        <div className="shrink-0 p-3 sm:p-4 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบรายการ</span>
              </button>
            ) : (
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <AvatarImage
                  src={currentUser.avatar || './logo.jpg'}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span>
                  โดย: <strong className="text-slate-800">{currentUser.alias}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCloseAll}
              className="min-h-11 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving || isVideoLoading || isLocating || isCompressingPhotos || audioPending > 0}
              className="min-h-11 px-5 py-2.5 text-sm font-bold rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white shadow-lg shadow-amber-600/20 active:scale-95 transition-all flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>กำลังส่งเข้าเซิร์ฟเวอร์ & รีเฟรช...</span>
                </>
              ) : (
                <span>{isEditMode ? '💾 บันทึกการแก้ไข' : 'บันทึกร้านน้ำ'}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isPickerMapOpen && (
        <LocationPickerModal
          isOpen={isPickerMapOpen}
          onClose={() => setIsPickerMapOpen(false)}
          onConfirm={(res) => {
            if (res.lat && res.lng) {
              setLat(res.lat);
              setLng(res.lng);
            } else {
              setLat('');
              setLng('');
            }
            if (res.addressText) {
              setCity(res.addressText);
              setAddressText(res.addressText);
            }
          }}
          initialLat={typeof lat === 'number' ? lat : undefined}
          initialLng={typeof lng === 'number' ? lng : undefined}
          initialAddress={city || addressText}
          themeColor="amber"
          title="ปักหมุดที่ตั้งร้านน้ำ & เรฟ"
        />
      )}
    </div>
  );
};
