import { AvatarImage } from './AvatarImage';
import React, { useState, useEffect, useRef } from 'react';
import { useDialog } from '../hooks/useDialog';
import { useApp } from '../context/AppContext';
import { CatalogItem, VoiceNoteEntry } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { getItemVoiceNotes } from '../utils/audioHelper';
import { uploadImageFile as compressImageFile } from '../utils/mediaStorage';
import { saveVideoFile, deleteVideoFile } from '../utils/mediaStorage';
import { VideoPlayer } from './VideoPlayer';
import {
  X,
  Camera,
  Trash2,
  Upload,
  Tag,
  Factory,
  Pencil,
  RefreshCw,
  MapPin,
  Map,
} from 'lucide-react';
import { LocationPickerModal } from './LocationPickerModal';

interface NewSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewSupplierModal: React.FC<NewSupplierModalProps> = ({ isOpen, onClose }) => {
  const {
    addSupplier,
    updateSupplier,
    deleteSupplier,
    editingSupplier,
    closeEditItem,
    convertCnyToThb,
    currentUser,
    suppliers,
    categories,
    quickTagsList,
    addQuickTag,
    setActiveTab,
  } = useApp();

  const isEditMode = !!editingSupplier;
  const modalOpen = isOpen || isEditMode;
  const dialogRef = useDialog(modalOpen);

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
  const [mainVoiceNotes, setMainVoiceNotes] = useState<VoiceNoteEntry[]>([]);

  // Photos & Videos
  const [storefrontAndAtmosphere, setStorefrontAndAtmosphere] = useState<string[]>([]);
  const [contactCards, setContactCards] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Batch Catalog Items
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);

  // GPS Location (ไม่ใส่ค่า Default เพื่อไม่ให้ปักหมุดมั่ว)
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');
  const [addressText, setAddressText] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isPickerMapOpen, setIsPickerMapOpen] = useState(false);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);
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

  // Populate form when editingSupplier changes or reset when opening fresh
  useEffect(() => {
    if (editingSupplier) {
      setCountry(editingSupplier.country || 'CN');
      setName(editingSupplier.name || '');
      setChineseName(editingSupplier.chineseName || '');
      setMarketOrCity(editingSupplier.marketOrCity || 'กวางโจว (Guangzhou)');
      setCategory(editingSupplier.category || categories[0] || 'เคาน์เตอร์ & สเตนเลส');
      setRating(editingSupplier.rating || 5);
      setSelectedTags(editingSupplier.quickTags || []);
      setPhone(editingSupplier.phone || '');
      setWechatId(editingSupplier.wechatId || '');
      setLineId(editingSupplier.lineId || '');
      setMemo(editingSupplier.memo || '');
      setMainVoiceUrl(editingSupplier.voiceNoteUrl);
      setMainVoiceSec(editingSupplier.voiceDurationSec || 0);
      setMainVoiceNotes(getItemVoiceNotes(editingSupplier));
      setStorefrontAndAtmosphere(editingSupplier.photos?.storefrontAndAtmosphere || []);
      setContactCards(editingSupplier.photos?.contactCards || []);
      setVideos(editingSupplier.videos || []);
      setCatalogItems(editingSupplier.catalogItems || []);
      setLat(editingSupplier.location?.lat && editingSupplier.location.lat !== 0 ? editingSupplier.location.lat : '');
      setLng(editingSupplier.location?.lng && editingSupplier.location.lng !== 0 ? editingSupplier.location.lng : '');
      setAddressText(editingSupplier.location?.addressText || editingSupplier.marketOrCity || '');
      setGpsStatusMsg(null);
    } else if (isOpen) {
      setCountry('CN');
      setName('');
      setChineseName('');
      setMarketOrCity('');
      setCategory(categories[0] || 'เคาน์เตอร์ & สเตนเลส');
      setRating(5);
      setSelectedTags([quickTagsList[0] || 'โรงงานผลิตเอง (Manufacturer)']);
      setPhone('');
      setWechatId('');
      setLineId('');
      setMemo('');
      setMainVoiceUrl(undefined);
      setMainVoiceSec(0);
      setMainVoiceNotes([]);
      setStorefrontAndAtmosphere([]);
      setContactCards([]);
      setVideos([]);
      setCatalogItems([]);
      setLat('');
      setLng('');
      setAddressText('');
      setGpsStatusMsg(null);
    }
  }, [editingSupplier, isOpen]);

  if (!modalOpen) return null;

  const handleCloseAll = () => {
    if (savingRef.current || photoTaskRef.current || audioJobs.current.size || isVideoLoading || isLocating) return;
    closeEditItem();
    onClose();
  };

  // Toggle quick tags
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Mass batch photo upload for catalog (with auto-compression)
  const handleMassCatalogUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    beginPhotos();
    try {
      const fileList = Array.from(files);
      const newItems: CatalogItem[] = [];
      for (let idx = 0; idx < fileList.length; idx++) {
        const file = fileList[idx];
        const compressed = await compressImageFile(file, 900, 0.72);
        if (compressed) {
          newItems.push({
            id: `item-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 5)}`,
            photo: compressed,
            name: '',
            dimensions: '',
            weightKg: '',
            priceRmb: undefined,
            memo: '',
            voiceNotes: [],
          });
        }
      }
      if (newItems.length > 0) {
        setCatalogItems((prev) => [...prev, ...newItems]);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ประมวลผลรูปไม่สำเร็จ');
    } finally {
      endPhotos();
      e.target.value = '';
    }
  };

  // Generic photo array upload (with auto-compression)
  const handleMultiPhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    beginPhotos();
    try {
      const fileList = Array.from(files);
      const compressedList: string[] = [];
      for (const file of fileList) {
        const compressed = await compressImageFile(file, 960, 0.72);
        if (compressed) {
          compressedList.push(compressed);
        }
      }
      if (compressedList.length > 0) {
        setter((prev) => [...prev, ...compressedList]);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ประมวลผลรูปไม่สำเร็จ');
    } finally {
      endPhotos();
      e.target.value = '';
    }
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
          clearTimeout(timeout);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (savingRef.current || photoTaskRef.current || audioJobs.current.size || isVideoLoading || isLocating) return;
    savingRef.current = true;
    setIsSaving(true);

    try {
      const finalName = name.trim() || `ซัพพลายเออร์ #${suppliers.length + 1} (${category})`;

      if (isEditMode && editingSupplier) {
        if (!await updateSupplier(editingSupplier.id, {
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
            storefrontAndAtmosphere:
              storefrontAndAtmosphere.length > 0
                ? storefrontAndAtmosphere
                : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'],
            contactCards,
          },
          videos,
          catalogItems,
          memo: memo.trim() || undefined,
          voiceNoteUrl: mainVoiceNotes[0]?.url || mainVoiceUrl,
          voiceDurationSec: mainVoiceNotes[0]?.durationSec || mainVoiceSec,
          voiceNotes: mainVoiceNotes,
          location: {
            lat: typeof lat === 'number' && lat !== 0 ? Number(lat) : 0,
            lng: typeof lng === 'number' && lng !== 0 ? Number(lng) : 0,
            addressText: marketOrCity.trim() || addressText,
          },
        })) return;
      } else {
        if (!await addSupplier({
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
            storefrontAndAtmosphere:
              storefrontAndAtmosphere.length > 0
                ? storefrontAndAtmosphere
                : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'],
            contactCards,
          },
          videos,
          catalogItems,
          memo: memo.trim() || undefined,
          voiceNoteUrl: mainVoiceNotes[0]?.url || mainVoiceUrl,
          voiceDurationSec: mainVoiceNotes[0]?.durationSec || mainVoiceSec,
          voiceNotes: mainVoiceNotes,
          location: {
            lat: typeof lat === 'number' && lat !== 0 ? Number(lat) : 0,
            lng: typeof lng === 'number' && lng !== 0 ? Number(lng) : 0,
            addressText: marketOrCity.trim() || addressText,
          },
          status: 'scouted',
          handoffStage: 'awaiting',
          assignedTo: country === 'TH' ? 'ช่างบีม (วิศวกร)' : 'SuperiCez',
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
    if (!editingSupplier) return;
    if (window.confirm(`ยืนยันการลบรายการ "${editingSupplier.name}" หรือไม่?`)) {
      setIsSaving(true);
      try {
        if (!await deleteSupplier(editingSupplier.id)) return;
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
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {isEditMode ? (
                <Pencil className="w-4 h-4 text-emerald-600" />
              ) : (
                <Factory className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                {isEditMode ? `แก้ไขข้อมูลซัพพลายเออร์: ${editingSupplier?.name}` : 'บันทึกซัพพลายเออร์'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {isEditMode
                  ? 'แก้ไขรูปภาพ รายการสินค้า สเปก ช่องทางติดต่อ หรือพิกัดได้ทุกจุด'
                  : 'เน้นถ่ายภาพรัวๆ ข้อมูลพิมพ์ทีหลังได้ หรือบันทึกเฉพาะภาพล้วน'}
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
              <i className="fa-solid fa-location-dot text-rose-500 text-xs" />
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
              <i className="fa-solid fa-location-dot text-sky-600 text-xs" />
              <span>ค้นคว้าในไทย (Thailand)</span>
            </button>
          </div>

          {/* Section 1: Storefront & Atmosphere Photos + Main Info */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                1. รูปป้ายหน้าร้าน & บรรยากาศ ({storefrontAndAtmosphere.length})
              </span>
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-0.5"
                  >
                    <i className={`fa-solid fa-star text-xs ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Photo preview strip with remove button */}
            {storefrontAndAtmosphere.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {storefrontAndAtmosphere.map((p, i) => (
                  <div key={i} className="relative shrink-0 group">
                    <img
                      src={p}
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setStorefrontAndAtmosphere((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow"
                      title="ลบรูปนี้"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Upload Button */}
            <label className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm active:scale-[0.99] transition-all">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>+ เลือกรูปจากอัลบั้มในเครื่อง / ถ่ายภาพป้ายหน้าร้าน (เลือกได้หลายรูป)</span>
              <input
                type="file" disabled={isSaving || isVideoLoading}
                accept="image/*"
                multiple
                onChange={(e) => handleMultiPhotoUpload(e, setStorefrontAndAtmosphere)}
                className="hidden"
              />
            </label>

            {/* Basic Info */}
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

              {/* Location with Real GPS */}
              <div>
                <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                  <label className="text-[11px] font-medium text-slate-500">
                    📍 ทำเล / ตลาด / เมือง
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold hover:bg-emerald-600 transition-colors inline-flex items-center gap-1"
                      title="ดึงพิกัด GPS จากตำแหน่งปัจจุบันของคุณ"
                    >
                      <RefreshCw className={`w-2.5 h-2.5 ${isLocating ? 'animate-spin' : ''}`} />
                      <span>{isLocating ? 'กำลังดึง...' : '📍 ดึง GPS จริง'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPickerMapOpen(true)}
                      className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1"
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
                    placeholder="เช่น ตลาดเครื่องครัวผานหยู, สยามสแควร์..."
                    value={marketOrCity}
                    onChange={(e) => setMarketOrCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                {Boolean(lat && lng) ? (
                  <div className="flex items-center justify-between text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60 mt-1">
                    <span className="font-mono font-bold">📍 ปักหมุด: {Number(lat).toFixed(4)}, {Number(lng).toFixed(4)}</span>
                    <a
                      href={`https://www.google.com/maps?q=${lat},${lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      ดูพิกัดบน Maps ↗
                    </a>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium mt-1">
                    ยังไม่ได้ระบุพิกัด GPS (สามารถแตะ <strong>เลือกบนแผนที่</strong> หรือข้ามได้)
                  </p>
                )}
                {gpsStatusMsg && (
                  <p className="text-[10px] text-emerald-700 font-medium mt-1">{gpsStatusMsg}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-slate-500">
                    หมวดหมู่อุปกรณ์/สินค้า
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      savingRef.current = false;
      handleCloseAll();
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

            {/* Quick-tap checklist tags */}
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
                      savingRef.current = false;
      handleCloseAll();
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

          {/* Section 2: Contact Photos & Info */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              2. ช่องทางการติดต่อ & นามบัตร/WeChat ({contactCards.length})
            </span>

            {contactCards.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {contactCards.map((p, i) => (
                  <div key={i} className="relative shrink-0">
                    <img
                      src={p}
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setContactCards((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow"
                      title="ลบรูปนี้"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-sm active:scale-[0.99] transition-all">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>+ เลือกรูปจากอัลบั้ม / ถ่ายรูปนามบัตร / QR WeChat (ไม่อั้น)</span>
              <input
                type="file" disabled={isSaving || isVideoLoading}
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

          {/* Section: Videos (คลิปวิดีโอหน้าร้าน & เครื่องจักร) */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <i className="fa-solid fa-video text-purple-600" />
                <span>คลิปวิดีโอหน้าร้าน & การทำงานเครื่องจักร ({videos.length})</span>
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

          {/* Section 3: Mass Batch Catalog Upload */}
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

            <label className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer transition-colors shadow-sm">
              <Upload className="w-6 h-6 text-emerald-600 mb-1" />
              <span className="text-xs font-bold text-slate-800">
                แตะเพื่อเลือกรูปจากอัลบั้มในเครื่อง / ถ่ายรูปหลายรูปพร้อมกัน (Batch Upload)
              </span>
              <span className="text-[10px] text-slate-400">
                เลือกทีเดียว 5-10 รูป ระบบจะสร้างรายการให้ทันทีโดยไม่ต้องพิมพ์
              </span>
              <input
                type="file" disabled={isSaving || isVideoLoading}
                accept="image/*"
                multiple
                onChange={handleMassCatalogUpload}
                className="hidden"
              />
            </label>

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
                  {/* Item Photo thumbnail (clickable to upload/replace photo) */}
                  <label className="shrink-0 cursor-pointer relative group">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm group-hover:opacity-80"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 text-center p-1">
                        + แตะใส่รูป
                      </div>
                    )}
                    <input
                      type="file" disabled={isSaving || isVideoLoading}
                      accept="image/*"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        beginPhotos();
                        const itemId = item.id;
                        try {
                          const compressed = await compressImageFile(f, 900, 0.72);
                          setCatalogItems(previous => previous.map(entry => entry.id === itemId ? { ...entry, photo: compressed } : entry));
                        } catch (error) { alert(error instanceof Error ? error.message : 'ประมวลผลรูปไม่สำเร็จ'); }
                        finally { endPhotos(); }
                      }}
                      className="hidden"
                    />
                  </label>

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

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
                  <span className="text-slate-600 font-bold block">
                    🎙️ วอยซ์เสียงเฉพาะรายการนี้ (อัดเพิ่มได้ไม่จำกัดจำนวนคลิป):
                  </span>
                  <AudioRecorder
                    onBusyChange={busy => audioBusy(item.id, busy)}
                    voiceNotes={getItemVoiceNotes(item)}
                    initialAudioUrl={item.voiceNoteUrl}
                    initialDurationSec={item.voiceDurationSec}
                    onVoiceNotesChange={(notes) => {
                      setCatalogItems(previous => previous.map(entry => entry.id === item.id ? { ...entry, voiceNotes: notes, voiceNoteUrl: notes[0]?.url, voiceDurationSec: notes[0]?.durationSec || 0 } : entry));
                    }}
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
                      updated[idx].voiceNotes = [];
                      setCatalogItems(updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Main Voice Memo & General Notes */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              4. วอยซ์เสียงภาพรวม & โน้ตกันลืม (อัดเสียงได้หลายรายการไม่จำกัด)
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
              placeholder="จดบันทึกภาพรวมความรู้สึก หรือสั่งงานทีมไทย (ไม่พิมพ์ก็ได้)..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>
          </fieldset>
        </form>

        {/* Footer Actions */}
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
              className="min-h-11 px-5 py-2.5 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white shadow-lg shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>กำลังส่งเข้าเซิร์ฟเวอร์ & รีเฟรช...</span>
                </>
              ) : isCompressingPhotos ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                  <span>กำลังบีบอัดรูปภาพ...</span>
                </>
              ) : (
                <span>{isEditMode ? '💾 บันทึกการแก้ไข' : 'บันทึกเข้าระบบ'}</span>
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
              setMarketOrCity(res.addressText);
              setAddressText(res.addressText);
            }
          }}
          initialLat={typeof lat === 'number' ? lat : undefined}
          initialLng={typeof lng === 'number' ? lng : undefined}
          initialAddress={marketOrCity || addressText}
          themeColor="emerald"
          title="ปักหมุดที่ตั้งซัพพลายเออร์"
        />
      )}
    </div>
  );
};
