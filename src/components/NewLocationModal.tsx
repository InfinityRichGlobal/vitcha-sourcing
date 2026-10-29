import { AvatarImage } from './AvatarImage';
import React, { useState, useEffect, useRef } from 'react';
import { useDialog } from '../hooks/useDialog';
import { useApp } from '../context/AppContext';
import { LocationRecord, LocationType, LayoutFormat, RentModel, VoiceNoteEntry } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { uploadImageFile as compressImageFile } from '../utils/mediaStorage';
import { saveVideoFile, deleteVideoFile } from '../utils/mediaStorage';
import { VideoPlayer } from './VideoPlayer';
import { UploadablePhotoGrid } from './UploadablePhotoGrid';
import {
  X,
  Camera,
  Trash2,
  Building2,
  Upload,
  Pencil,
  RefreshCw,
  MapPin,
  Map,
  Maximize2,
  Ruler,
  Zap,
  Droplets,
  RotateCcw,
  Sparkles,
  Bike,
  DollarSign,
  Phone,
  User,
  Calendar,
  Layers,
  Plus,
  ChevronDown,
} from 'lucide-react';
import { LocationPickerModal } from './LocationPickerModal';

interface NewLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewLocationModal: React.FC<NewLocationModalProps> = ({ isOpen, onClose }) => {
  const {
    addLocation,
    updateLocation,
    deleteLocation,
    editingLocation,
    closeEditItem,
    convertCnyToThb,
    currentUser,
    users,
    quickTagsList,
    locationTypes,
    addLocationType,
    locations,
  } = useApp();

  const isEditMode = !!editingLocation;
  const modalOpen = isOpen || isEditMode;
  const dialogRef = useDialog(modalOpen);

  // Form State
  const [country, setCountry] = useState<'CN' | 'TH'>('TH');
  const [name, setName] = useState('');
  const [foreignName, setForeignName] = useState('');
  const [locationType, setLocationType] = useState<LocationType | ''>('');
  const [isAddingNewType, setIsAddingNewType] = useState(false);
  const [newTypeInput, setNewTypeInput] = useState('');
  const [zoneOrFloor, setZoneOrFloor] = useState('');
  const [unitNumber, setUnitNumber] = useState('');

  // Space Specs
  const [usableAreaSqm, setUsableAreaSqm] = useState<number | ''>('');
  const [frontageWidthM, setFrontageWidthM] = useState<number | ''>('');
  const [ceilingHeightM, setCeilingHeightM] = useState<number | ''>('');
  const [layoutFormat, setLayoutFormat] = useState<LayoutFormat | ''>('');
  const [electricalPower, setElectricalPower] = useState('');
  const [hasWaterInflow, setHasWaterInflow] = useState(false);
  const [hasDrainage, setHasDrainage] = useState(false);
  const [hasGreaseTrap, setHasGreaseTrap] = useState(false);
  const [riderAccessNotes, setRiderAccessNotes] = useState('');

  // Lease Terms
  const [rentModel, setRentModel] = useState<RentModel>('fixed');
  const [monthlyRentThb, setMonthlyRentThb] = useState<number | ''>('');
  const [monthlyRentRmb, setMonthlyRentRmb] = useState<number | ''>('');
  const [gpPercent, setGpPercent] = useState<number | ''>('');
  const [serviceFeePerSqm, setServiceFeePerSqm] = useState<number | ''>('');
  const [depositMonths, setDepositMonths] = useState<number | ''>('');
  const [leasePeriodYears, setLeasePeriodYears] = useState<number | ''>('');
  const [fitOutPeriodDays, setFitOutPeriodDays] = useState<number | ''>('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactLineWechat, setContactLineWechat] = useState('');

  // Ratings (เริ่มต้น 0 คือยังไม่ได้ให้คะแนน)
  const [footTraffic, setFootTraffic] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [accessibility, setAccessibility] = useState(0);
  const [valueRoi, setValueRoi] = useState(0);

  // GPS Coordinates & Address (ไม่ใส่ค่า Default เพื่อไม่ให้ปักหมุดมั่ว)
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');
  const [addressText, setAddressText] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isPickerMapOpen, setIsPickerMapOpen] = useState(false);

  // Photos & Media
  const [storefrontAndAtmosphere, setStorefrontAndAtmosphere] = useState<string[]>([]);
  const [floorPlanAndSpecs, setFloorPlanAndSpecs] = useState<string[]>([]);
  const [surroundingNeighbors, setSurroundingNeighbors] = useState<string[]>([]);
  const [contactCards, setContactCards] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [mainVoiceUrl, setMainVoiceUrl] = useState<string | undefined>();
  const [mainVoiceSec, setMainVoiceSec] = useState<number>(0);
  const [mainVoiceNotes, setMainVoiceNotes] = useState<VoiceNoteEntry[]>([]);

  // Quick Tags
  const [quickTags, setQuickTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');

  // Handoff
  const [assignedTo, setAssignedTo] = useState(currentUser?.alias || currentUser?.name || '');
  const [isAssigneeMenuOpen, setIsAssigneeMenuOpen] = useState(false);
  const [targetFollowUpDate, setTargetFollowUpDate] = useState('');
  const [handoffNotes, setHandoffNotes] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [photoTaskCount, setPhotoTaskCount] = useState(0);
  const photoTaskRef = useRef(0);
  const audioJobs = useRef(new Set<string>());
  const [audioPending, setAudioPending] = useState(0);

  const audioBusy = (id: string, value: boolean) => {
    if (value) audioJobs.current.add(id);
    else audioJobs.current.delete(id);
    setAudioPending(audioJobs.current.size);
  };

  const isCompressingPhotos = photoTaskCount > 0;
  const beginPhotos = () => {
    photoTaskRef.current++;
    setPhotoTaskCount(photoTaskRef.current);
  };
  const endPhotos = () => {
    photoTaskRef.current--;
    setPhotoTaskCount(photoTaskRef.current);
  };

  // Populate when editing or reset
  useEffect(() => {
    if (editingLocation) {
      setCountry(editingLocation.country || 'TH');
      setName(editingLocation.name || '');
      setForeignName(editingLocation.foreignName || '');
      setLocationType(editingLocation.locationType || '');
      setZoneOrFloor(editingLocation.zoneOrFloor || '');
      setUnitNumber(editingLocation.unitNumber || '');

      setUsableAreaSqm(editingLocation.spaceSpecs?.usableAreaSqm ?? '');
      setFrontageWidthM(editingLocation.spaceSpecs?.frontageWidthM ?? '');
      setCeilingHeightM(editingLocation.spaceSpecs?.ceilingHeightM ?? '');
      setLayoutFormat(editingLocation.spaceSpecs?.layoutFormat || '');
      setElectricalPower(editingLocation.spaceSpecs?.electricalPower || '');
      setHasWaterInflow(editingLocation.spaceSpecs?.hasWaterInflow ?? false);
      setHasDrainage(editingLocation.spaceSpecs?.hasDrainage ?? false);
      setHasGreaseTrap(editingLocation.spaceSpecs?.hasGreaseTrap ?? false);
      setRiderAccessNotes(editingLocation.spaceSpecs?.riderAccessNotes || '');

      setRentModel(editingLocation.leaseTerms?.rentModel || 'fixed');
      setMonthlyRentThb(editingLocation.leaseTerms?.monthlyRentThb ?? '');
      setMonthlyRentRmb(editingLocation.leaseTerms?.monthlyRentRmb ?? '');
      setGpPercent(editingLocation.leaseTerms?.gpPercent ?? '');
      setServiceFeePerSqm(editingLocation.leaseTerms?.serviceFeePerSqm ?? '');
      setDepositMonths(editingLocation.leaseTerms?.depositMonths ?? '');
      setLeasePeriodYears(editingLocation.leaseTerms?.leasePeriodYears ?? '');
      setFitOutPeriodDays(editingLocation.leaseTerms?.fitOutPeriodDays ?? '');
      setContactPerson(editingLocation.leaseTerms?.contactPerson || '');
      setContactPhone(editingLocation.leaseTerms?.contactPhone || '');
      setContactLineWechat(editingLocation.leaseTerms?.contactLineWechat || '');

      setFootTraffic(editingLocation.ratings?.footTraffic ?? 0);
      setVisibility(editingLocation.ratings?.visibility ?? 0);
      setAccessibility(editingLocation.ratings?.accessibility ?? 0);
      setValueRoi(editingLocation.ratings?.valueRoi ?? 0);

      setLat(editingLocation.location?.lat && editingLocation.location.lat !== 0 ? editingLocation.location.lat : '');
      setLng(editingLocation.location?.lng && editingLocation.location.lng !== 0 ? editingLocation.location.lng : '');
      setAddressText(editingLocation.location?.addressText || '');

      setStorefrontAndAtmosphere(editingLocation.photos?.storefrontAndAtmosphere || []);
      setFloorPlanAndSpecs(editingLocation.photos?.floorPlanAndSpecs || []);
      setSurroundingNeighbors(editingLocation.photos?.surroundingNeighbors || []);
      setContactCards(editingLocation.photos?.contactCards || []);
      setVideos(editingLocation.videos || []);
      setMainVoiceUrl(editingLocation.voiceNoteUrl);
      setMainVoiceSec(editingLocation.voiceDurationSec || 0);
      setMainVoiceNotes(editingLocation.voiceNotes || []);

      setQuickTags(editingLocation.quickTags || []);
      setAssignedTo(editingLocation.assignedTo || currentUser?.alias || currentUser?.name || '');
      setTargetFollowUpDate(editingLocation.targetFollowUpDate || '');
      setHandoffNotes(editingLocation.handoffNotes || '');
    } else {
      // Reset form to clean unrated empty state
      setCountry('TH');
      setName('');
      setForeignName('');
      setLocationType('');
      setZoneOrFloor('');
      setUnitNumber('');
      setUsableAreaSqm('');
      setFrontageWidthM('');
      setCeilingHeightM('');
      setLayoutFormat('');
      setElectricalPower('');
      setHasWaterInflow(false);
      setHasDrainage(false);
      setHasGreaseTrap(false);
      setRiderAccessNotes('');
      setRentModel('fixed');
      setMonthlyRentThb('');
      setMonthlyRentRmb('');
      setGpPercent('');
      setServiceFeePerSqm('');
      setDepositMonths('');
      setLeasePeriodYears('');
      setFitOutPeriodDays('');
      setContactPerson('');
      setContactPhone('');
      setContactLineWechat('');
      setFootTraffic(0);
      setVisibility(0);
      setAccessibility(0);
      setValueRoi(0);
      setLat('');
      setLng('');
      setAddressText('');
      setStorefrontAndAtmosphere([]);
      setFloorPlanAndSpecs([]);
      setSurroundingNeighbors([]);
      setContactCards([]);
      setVideos([]);
      setMainVoiceUrl(undefined);
      setMainVoiceSec(0);
      setMainVoiceNotes([]);
      setQuickTags([]);
      setAssignedTo(currentUser?.alias || currentUser?.name || '');
      setTargetFollowUpDate('');
      setHandoffNotes('');
    }
  }, [editingLocation, isOpen]);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('เบราว์เซอร์ไม่รองรับ Geolocation');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        alert('ไม่สามารถดึงพิกัดปัจจุบันได้ โปรดอนุญาตสิทธิ์เข้าถึงพิกัด');
      },
      { timeout: 10000 }
    );
  };


  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file.size > 200 * 1024 * 1024) {
      alert('ขนาดวิดีโอต้องไม่เกิน 200MB');
      return;
    }
    setIsVideoLoading(true);
    try {
      const url = await saveVideoFile(file);
      if (url) setVideos((prev) => [...prev, url]);
    } catch {
      alert('ไม่สามารถอัปโหลดวิดีโอได้');
    } finally {
      setIsVideoLoading(false);
      e.target.value = '';
    }
  };

  const handleAddCustomTag = () => {
    const trimmed = customTagInput.trim().replace(/^#/, '');
    if (!trimmed || quickTags.includes(trimmed)) return;
    setQuickTags([...quickTags, trimmed]);
    setCustomTagInput('');
  };

  const toggleTag = (tag: string) => {
    if (quickTags.includes(tag)) {
      setQuickTags(quickTags.filter((t) => t !== tag));
    } else {
      setQuickTags([...quickTags, tag]);
    }
  };

  const handleClose = () => {
    if (isEditMode) closeEditItem();
    else onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim();
    if (!finalName) {
      alert('กรุณากรอกชื่อห้าง / โครงการ / ตึก');
      return;
    }
    const finalLocationType = locationType.trim();
    if (!finalLocationType) {
      alert('กรุณาเลือกประเภทสถานที่');
      return;
    }
    setIsSaving(true);
    try {
      const locationPayload = {
        country,
        name: finalName,
        foreignName: foreignName.trim() || undefined,
        locationType: finalLocationType,
        zoneOrFloor: zoneOrFloor.trim() || 'ไม่ระบุ',
        unitNumber: unitNumber.trim() || undefined,
        location: {
          lat: typeof lat === 'number' && lat !== 0 ? Number(lat) : 0,
          lng: typeof lng === 'number' && lng !== 0 ? Number(lng) : 0,
          addressText: addressText.trim() || undefined,
        },
        spaceSpecs: {
          usableAreaSqm: Number(usableAreaSqm) || 0,
          frontageWidthM: Number(frontageWidthM) || 0,
          ceilingHeightM: Number(ceilingHeightM) || 0,
          layoutFormat: (layoutFormat || 'inline') as LayoutFormat,
          electricalPower: electricalPower.trim() || undefined,
          hasWaterInflow,
          hasDrainage,
          hasGreaseTrap,
          riderAccessNotes: riderAccessNotes.trim() || undefined,
        },
        leaseTerms: {
          rentModel,
          monthlyRentThb: monthlyRentThb !== '' ? Number(monthlyRentThb) : undefined,
          monthlyRentRmb: monthlyRentRmb !== '' ? Number(monthlyRentRmb) : undefined,
          gpPercent: gpPercent !== '' ? Number(gpPercent) : undefined,
          serviceFeePerSqm: serviceFeePerSqm !== '' ? Number(serviceFeePerSqm) : undefined,
          depositMonths: depositMonths !== '' ? Number(depositMonths) : undefined,
          leasePeriodYears: leasePeriodYears !== '' ? Number(leasePeriodYears) : undefined,
          fitOutPeriodDays: fitOutPeriodDays !== '' ? Number(fitOutPeriodDays) : undefined,
          contactPerson: contactPerson.trim() || undefined,
          contactPhone: contactPhone.trim() || undefined,
          contactLineWechat: contactLineWechat.trim() || undefined,
        },
        ratings: {
          footTraffic,
          visibility,
          accessibility,
          valueRoi,
        },
        photos: {
          storefrontAndAtmosphere,
          floorPlanAndSpecs,
          surroundingNeighbors,
          contactCards,
        },
        videos: videos.length > 0 ? videos : undefined,
        voiceNoteUrl: mainVoiceUrl,
        voiceDurationSec: mainVoiceSec,
        voiceNotes: mainVoiceNotes,
        quickTags,
        assignedTo: assignedTo || undefined,
        targetFollowUpDate: targetFollowUpDate || undefined,
        handoffNotes: handoffNotes.trim() || undefined,
        handoffStage: editingLocation?.handoffStage || 'awaiting',
      };

      if (isEditMode && editingLocation) {
        await updateLocation(editingLocation.id, locationPayload);
      } else {
        await addLocation(locationPayload);
      }

      handleClose();
    } catch {
      alert('บันทึกข้อมูลไม่สำเร็จ โปรดลองใหม่อีกครั้ง');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingLocation) return;
    if (!window.confirm(`ยืนยันการลบทำเล "${editingLocation.name}" หรือไม่?`)) return;
    setIsSaving(true);
    try {
      await deleteLocation(editingLocation.id);
      handleClose();
    } finally {
      setIsSaving(false);
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in overflow-y-auto">
      <div
        ref={dialogRef as React.RefObject<HTMLDivElement>}
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl max-h-[92vh] flex flex-col text-slate-900 my-auto animate-in zoom-in-95"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-sky-50/60 sticky top-0 z-20 backdrop-blur-md rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <i aria-hidden="true" className="fa-solid fa-map-location-dot text-base" />
            </div>
            <div>
              <h2 id="location-modal-title" className="font-extrabold text-base sm:text-lg text-slate-900">
                {isEditMode ? 'แก้ไขข้อมูลทำเล & พื้นที่สาขา' : 'บันทึกทำเล & พื้นที่สาขาใหม่'}
              </h2>
              <p className="text-[11px] text-sky-800 font-medium">
                {isEditMode ? 'ปรับปรุงสเปกพื้นที่ ค่าเช่า หรือรูปหน้างาน' : 'สำรวจสเปก M&E ผังห้อง ค่าเช่า และการเจรจา'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Section 1: ประเทศ & ชื่อโครงการ */}
          <div className="space-y-3 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                <span>ประเทศ & ชื่อสถานที่ / โครงการ *</span>
              </label>

              {/* Country Picker */}
              <div className="flex bg-white p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setCountry('TH')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                    country === 'TH' ? 'bg-sky-600 text-white shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  <span>🇹🇭 ไทย</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCountry('CN')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                    country === 'CN' ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  <span>🇨🇳 จีน</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                ชื่อห้าง / โครงการ / ตึก <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น CentralWorld, EmSphere, Siam Square One"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500 font-semibold"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-600">
                    ประเภทสถานที่ <span className="text-red-500 font-bold">*</span>
                  </label>
                  {!isAddingNewType && (
                    <button
                      type="button"
                      onClick={() => setIsAddingNewType(true)}
                      className="text-[10px] text-sky-600 hover:text-sky-700 font-bold flex items-center gap-0.5"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>เพิ่มประเภทสด</span>
                    </button>
                  )}
                </div>

                {isAddingNewType ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="เช่น สถานที่ราชการ, สวนสาธารณะ..."
                      value={newTypeInput}
                      onChange={(e) => setNewTypeInput(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newTypeInput.trim()) {
                            await addLocationType(newTypeInput.trim());
                            setLocationType(newTypeInput.trim());
                            setNewTypeInput('');
                            setIsAddingNewType(false);
                          }
                        }
                      }}
                      className="flex-1 px-2.5 py-1.5 rounded-xl border border-sky-300 text-xs bg-sky-50/50 focus:outline-sky-500 font-semibold"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (newTypeInput.trim()) {
                          await addLocationType(newTypeInput.trim());
                          setLocationType(newTypeInput.trim());
                          setNewTypeInput('');
                          setIsAddingNewType(false);
                        }
                      }}
                      className="px-2.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
                    >
                      บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNewType(false);
                        setNewTypeInput('');
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <select
                    value={locationType}
                    onChange={(e) => {
                      if (e.target.value === '__add_new__') {
                        setIsAddingNewType(true);
                      } else {
                        setLocationType(e.target.value as LocationType);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500 font-semibold"
                    required
                  >
                    <option value="">-- เลือกประเภทสถานที่ --</option>
                    {locationTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                    {locationType && !locationTypes.includes(locationType) && (
                      <option value={locationType}>{locationType}</option>
                    )}
                    <option value="__add_new__">+ เพิ่มประเภทสถานที่ใหม่...</option>
                  </select>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  บอกรายละเอียดเกี่ยวกับสถานที่ให้เข้าใจ <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ตัวอย่าง 1: ติดทางเข้าหลัก ฝั่งถนนคนเดิน / ตัวอย่าง 2: ชั้น 1 ข้างบันไดเลื่อน โซนศูนย์อาหาร"
                  value={zoneOrFloor}
                  onChange={(e) => setZoneOrFloor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  ชั้น / โซน / เลขที่ห้อง (ยูนิต)
                </label>
                <input
                  type="text"
                  placeholder="เช่น ชั้น G โซน Food Hall ห้อง A-102 (เว้นว่างได้)"
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: สเปกพื้นที่ & งานระบบ (Space Specs & M&E) */}
          <div className="space-y-3 p-3.5 bg-sky-50/40 rounded-2xl border border-sky-100">
            <label className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-sky-600" />
              <span>สเปกพื้นที่ & งานระบบ (Space & M&E Systems)</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ขนาดพื้นที่ (ตร.ม.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="เช่น 45"
                  value={usableAreaSqm}
                  onChange={(e) => setUsableAreaSqm(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  หน้ากว้าง (เมตร)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="เช่น 6"
                  value={frontageWidthM}
                  onChange={(e) => setFrontageWidthM(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ความสูงเพดาน (เมตร)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="เช่น 3.5"
                  value={ceilingHeightM}
                  onChange={(e) => setCeilingHeightM(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  รูปแบบผังห้อง
                </label>
                <select
                  value={layoutFormat}
                  onChange={(e) => setLayoutFormat(e.target.value as LayoutFormat)}
                  className="w-full px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                >
                  <option value="">-- ยังไม่ระบุรูปแบบผัง --</option>
                  <option value="inline">Inline (แนวต่อ)</option>
                  <option value="corner">Corner (หัวมุม 2 ด้าน)</option>
                  <option value="island">Island (เกาะกลาง)</option>
                  <option value="kiosk">Kiosk (คีออสก์/บูธ)</option>
                </select>
              </div>
            </div>

            {/* งานระบบ M&E */}
            <div className="pt-2 border-t border-sky-100/80 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">
                    สเปกไฟฟ้าที่รองรับ
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น 3 เฟส 45 kVA หรือ 1 เฟส 30/100A"
                    value={electricalPower}
                    onChange={(e) => setElectricalPower(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">
                    การเข้าถึงของไรเดอร์ & จุดจอด
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น จุดจอดไรเดอร์ติดประตูข้าง เดินรับของสะดวก"
                    value={riderAccessNotes}
                    onChange={(e) => setRiderAccessNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>

              {/* Water, Drainage, Grease Trap Checkboxes */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={hasWaterInflow}
                    onChange={(e) => setHasWaterInflow(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>มีท่อน้ำดีเข้าห้อง</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={hasDrainage}
                    onChange={(e) => setHasDrainage(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <RotateCcw className="w-3.5 h-3.5 text-teal-500" />
                  <span>มีท่อน้ำทิ้งในห้อง</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={hasGreaseTrap}
                    onChange={(e) => setHasGreaseTrap(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>มีถังดักไขมัน (Grease Trap)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: เงื่อนไขสัญญา & ค่าเช่า (Lease Terms & Commercials) */}
          <div className="space-y-3 p-3.5 bg-amber-50/40 rounded-2xl border border-amber-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                <span>เงื่อนไขสัญญา & ค่าเช่า (Lease Terms)</span>
              </label>

              {/* Rent Model Selector */}
              <div className="flex bg-white p-0.5 rounded-lg border border-amber-200 text-xs">
                <button
                  type="button"
                  onClick={() => setRentModel('fixed')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    rentModel === 'fixed' ? 'bg-amber-600 text-white' : 'text-slate-600'
                  }`}
                >
                  Fixed Rent
                </button>
                <button
                  type="button"
                  onClick={() => setRentModel('gp')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    rentModel === 'gp' ? 'bg-amber-600 text-white' : 'text-slate-600'
                  }`}
                >
                  GP Only
                </button>
                <button
                  type="button"
                  onClick={() => setRentModel('hybrid')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    rentModel === 'hybrid' ? 'bg-amber-600 text-white' : 'text-slate-600'
                  }`}
                >
                  Hybrid
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ค่าเช่าต่อเดือน (บาท ฿)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 120000"
                  value={monthlyRentThb}
                  onChange={(e) => setMonthlyRentThb(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ค่าเช่าต่อเดือน (หยวน ¥)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 25000"
                  value={monthlyRentRmb}
                  onChange={(e) => setMonthlyRentRmb(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ส่วนแบ่ง GP (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="เช่น 15"
                  value={gpPercent}
                  onChange={(e) => setGpPercent(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ระยะเวลาสัญญา (ปี)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 3"
                  value={leasePeriodYears}
                  onChange={(e) => setLeasePeriodYears(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  เงินมัดจำ (กี่เดือน)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 3"
                  value={depositMonths}
                  onChange={(e) => setDepositMonths(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ระยะปลอดค่าเช่าแต่ง (วัน)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 45"
                  value={fitOutPeriodDays}
                  onChange={(e) => setFitOutPeriodDays(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  ชื่อผู้ติดต่อฝ่ายเช่า
                </label>
                <input
                  type="text"
                  placeholder="เช่น คุณสมชาย ฝ่ายพื้นที่"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">
                  เบอร์โทร / LINE / WeChat
                </label>
                <input
                  type="text"
                  placeholder="081-xxx-xxxx / line_id"
                  value={contactPhone || contactLineWechat}
                  onChange={(e) => {
                    setContactPhone(e.target.value);
                    setContactLineWechat(e.target.value);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 4: การให้คะแนนศักยภาพ 4 มิติ (Ratings) */}
          <div className="space-y-3 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/70">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <i aria-hidden="true" className="fa-solid fa-star text-amber-500" />
              <span>ประเมินศักยภาพทำเล 4 มิติ (1-5 ดาว)</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-600">ปริมาณคนเดิน:</span>
                  <span className={footTraffic > 0 ? "text-amber-600 font-mono" : "text-slate-400 font-normal text-[10px]"}>
                    {footTraffic > 0 ? `${footTraffic} ดาว` : '(ยังไม่ได้ให้คะแนน)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={footTraffic}
                  onChange={(e) => setFootTraffic(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-600">ความสะดุดตา:</span>
                  <span className={visibility > 0 ? "text-amber-600 font-mono" : "text-slate-400 font-normal text-[10px]"}>
                    {visibility > 0 ? `${visibility} ดาว` : '(ยังไม่ได้ให้คะแนน)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={visibility}
                  onChange={(e) => setVisibility(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-600">การเข้าถึง:</span>
                  <span className={accessibility > 0 ? "text-amber-600 font-mono" : "text-slate-400 font-normal text-[10px]"}>
                    {accessibility > 0 ? `${accessibility} ดาว` : '(ยังไม่ได้ให้คะแนน)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={accessibility}
                  onChange={(e) => setAccessibility(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-600">ความคุ้มค่า ROI:</span>
                  <span className={valueRoi > 0 ? "text-amber-600 font-mono" : "text-slate-400 font-normal text-[10px]"}>
                    {valueRoi > 0 ? `${valueRoi} ดาว` : '(ยังไม่ได้ให้คะแนน)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={valueRoi}
                  onChange={(e) => setValueRoi(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 5: GPS & Location Picker */}
          <div className="space-y-2.5 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/70">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>ตำแหน่งพิกัดบนแผนที่</span>
              </label>

              <div className="flex items-center gap-1.5 flex-wrap">
                {/* ปุ่มของเดิม: ดึงพิกัด GPS หน้าง่าย สะดวก */}
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLocating}
                  className="px-2.5 py-1 rounded-lg bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                  title="ดึงพิกัด GPS จากตำแหน่งปัจจุบันของคุณ"
                >
                  <RefreshCw className={`w-3 h-3 ${isLocating ? 'animate-spin text-sky-600' : 'text-slate-500'}`} />
                  <span>{isLocating ? 'กำลังดึง...' : 'ดึงพิกัดปัจจุบัน (GPS)'}</span>
                </button>

                {/* ปุ่มใหม่: เปิดแผนที่เพื่อเลื่อนหา / จิ้มปักหมุดเอง (Option A) */}
                <button
                  type="button"
                  onClick={() => setIsPickerMapOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs active:scale-95"
                  title="เปิดแผนที่เพื่อเลื่อนหาพิกัดหรือจิ้มปักหมุด"
                >
                  <Map className="w-3 h-3" />
                  <span>เลือกบนแผนที่</span>
                </button>

                {/* ปุ่มล้างพิกัดถ้าไม่ต้องการระบุ */}
                {Boolean(lat || lng) && (
                  <button
                    type="button"
                    onClick={() => { setLat(''); setLng(''); }}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs transition-colors"
                    title="ล้างพิกัดออก (ไม่ระบุพิกัด)"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* แสดงสถานะการปักหมุด */}
            {!lat && !lng ? (
              <div className="p-2.5 rounded-xl bg-white border border-dashed border-slate-200 text-center">
                <p className="text-[11px] text-slate-500 font-medium">
                  📍 ยังไม่ได้ระบุพิกัด (แตะ <strong>"เลือกบนแผนที่"</strong> เพื่อจิ้มหมุด หรือแตะ <strong>"ดึงพิกัดปัจจุบัน"</strong> หรือข้ามไปก่อนได้)
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-sky-50 border border-sky-200/80 text-[11px] text-sky-900 font-bold">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <span>ปักหมุดแล้ว: {Number(lat).toFixed(5)}, {Number(lng).toFixed(5)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={lat}
                      onChange={(e) => setLat(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={lng}
                      onChange={(e) => setLng(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                ที่อยู่ / จุดสังเกตเพิ่มเติม
              </label>
              <input
                type="text"
                placeholder="เช่น ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กทม."
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>

          {/* Section 6: Photo Uploads (4 หมวดรูป) */}
          <div className="space-y-3 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/70">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-sky-600" />
              <span>ภาพถ่ายพื้นที่ & งานระบบ (Photos)</span>
              {isCompressingPhotos && (
                <span className="text-[10px] text-sky-700 animate-pulse font-bold">
                  (กำลังประมวลผลรูป...)
                </span>
              )}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <UploadablePhotoGrid
                label="1. หน้าร้าน & บรรยากาศคนเดิน"
                emptyText="ยังไม่มีรูปหน้าร้าน"
                urls={storefrontAndAtmosphere}
                onChange={setStorefrontAndAtmosphere}
                recordType="locations"
                recordTitle={name || 'ทำเลใหม่'}
                recordId={editingLocation?.id}
                onBeginUpload={beginPhotos}
                onEndUpload={endPhotos}
              />

              <UploadablePhotoGrid
                label="2. ผังห้อง / มิเตอร์ไฟ / ท่อน้ำ"
                emptyText="ยังไม่มีรูปผัง/งานระบบ"
                urls={floorPlanAndSpecs}
                onChange={setFloorPlanAndSpecs}
                recordType="locations"
                recordTitle={name || 'ทำเลใหม่'}
                recordId={editingLocation?.id}
                onBeginUpload={beginPhotos}
                onEndUpload={endPhotos}
              />

              <UploadablePhotoGrid
                label="3. ร้านข้างเคียง & แบรนด์เพื่อนบ้าน"
                emptyText="ยังไม่มีรูปร้านข้างเคียง"
                urls={surroundingNeighbors}
                onChange={setSurroundingNeighbors}
                recordType="locations"
                recordTitle={name || 'ทำเลใหม่'}
                recordId={editingLocation?.id}
                onBeginUpload={beginPhotos}
                onEndUpload={endPhotos}
              />

              <UploadablePhotoGrid
                label="4. นามบัตรฝ่ายเช่า / เอกสารสัญญา"
                emptyText="ยังไม่มีรูปนามบัตร/เอกสาร"
                urls={contactCards}
                onChange={setContactCards}
                recordType="locations"
                recordTitle={name || 'ทำเลใหม่'}
                recordId={editingLocation?.id}
                onBeginUpload={beginPhotos}
                onEndUpload={endPhotos}
              />
            </div>
          </div>

          {/* Section 7: Voice Notes & Video Clip */}
          <div className="space-y-3 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/70">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <i aria-hidden="true" className="fa-solid fa-microphone text-sky-600" />
              <span>บันทึกเสียงบรรยายหน้างาน & วิดีโอ</span>
            </label>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
              <AudioRecorder
                onBusyChange={(busy) => audioBusy('main-voice', busy)}
                voiceNotes={mainVoiceNotes}
                initialAudioUrl={mainVoiceUrl}
                initialDurationSec={mainVoiceSec}
                onVoiceNotesChange={(notes: VoiceNoteEntry[]) => {
                  setMainVoiceNotes(notes);
                  setMainVoiceUrl(notes[0]?.url);
                  setMainVoiceSec(notes[0]?.durationSec || 0);
                }}
                onAudioSaved={(url: string, durationSec: number) => {
                  setMainVoiceUrl(url);
                  setMainVoiceSec(durationSec);
                }}
                onAudioDeleted={() => {
                  setMainVoiceUrl(undefined);
                  setMainVoiceSec(0);
                  setMainVoiceNotes([]);
                }}
              />
            </div>

            {/* Video Upload */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>คลิปวิดีโอเดินสำรวจบรรยากาศ</span>
                <label className="cursor-pointer text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>+ อัปโหลดคลิป</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                    disabled={isVideoLoading}
                  />
                </label>
              </div>

              {isVideoLoading && (
                <div className="text-xs text-sky-600 animate-pulse font-bold">
                  กำลังอัปโหลดวิดีโอ...
                </div>
              )}

              {videos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {videos.map((vid, vIdx) => (
                    <div key={vIdx} className="relative rounded-xl overflow-hidden border">
                      <VideoPlayer src={vid} className="w-full h-36" />
                      <button
                        type="button"
                        onClick={() => {
                          deleteVideoFile(vid);
                          setVideos(videos.filter((_, i) => i !== vIdx));
                        }}
                        className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 8: Quick Tags (ปุ่มแท็กทางลัด) */}
          <div className="space-y-2 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/70">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <i aria-hidden="true" className="fa-solid fa-tags text-sky-600" />
              <span>แท็กจุดเด่นทำเล</span>
            </label>

            {/* Preset location tags */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'คนเดินแน่น',
                'หัวมุมเด่น',
                'ติดทางเชื่อมBTS',
                'ใกล้ลิฟต์แก้ว',
                'มีท่อดักไขมัน',
                'ไรเดอร์สะดวก',
                'เพดานสูง',
                'ค่าเช่าสมเหตุสมผล',
                'Trafficวันหยุดดี',
                'ออฟฟิศวันธรรมดาแน่น',
              ].map((tag) => {
                const isSelected = quickTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            {/* Custom Tag input */}
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                placeholder="เพิ่มแท็กเฉพาะ..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomTag();
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                เพิ่มแท็ก
              </button>
            </div>
          </div>

          {/* Section 9: ส่งต่องาน / ผู้รับผิดชอบ (Handoff) */}
          <div className="space-y-3 p-3.5 bg-blue-50/40 rounded-2xl border border-blue-200/70">
            <label className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>การส่งมอบงาน & ผู้รับผิดชอบเจรจาต่อ</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  มอบหมายผู้รับผิดชอบ
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsAssigneeMenuOpen((prev) => !prev)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-bold flex items-center justify-between gap-2 text-left hover:border-sky-400 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {users.find((u) => (u.alias || u.name) === assignedTo) ? (
                        (() => {
                          const u = users.find((usr) => (usr.alias || usr.name) === assignedTo)!;
                          return (
                            <>
                              <AvatarImage
                                src={u.avatar || './logo.jpg'}
                                alt={u.name}
                                className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-sky-300"
                              />
                              <span className="truncate text-slate-900">{u.alias || u.name}</span>
                              <span className="text-[10px] text-slate-400 font-normal shrink-0">({u.role})</span>
                            </>
                          );
                        })()
                      ) : (
                        <span className="text-slate-400">-- ยังไม่มอบหมาย --</span>
                      )}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>

                  {isAssigneeMenuOpen && (
                    <div className="absolute bottom-full mb-1 left-0 right-0 z-30 bg-white rounded-xl border border-slate-200 shadow-xl py-1 max-h-48 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setAssignedTo('');
                          setIsAssigneeMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 text-xs text-left text-slate-500 hover:bg-slate-50 flex items-center gap-2"
                      >
                        -- ยังไม่มอบหมาย --
                      </button>
                      {users.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setAssignedTo(u.alias || u.name);
                            setIsAssigneeMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between gap-2 hover:bg-sky-50 transition-colors ${
                            assignedTo === (u.alias || u.name) ? 'bg-sky-50 font-bold text-sky-900' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <AvatarImage
                              src={u.avatar || './logo.jpg'}
                              alt={u.name}
                              className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                            />
                            <span className="truncate">{u.alias || u.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">({u.role})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  กำหนดวันติดตามผล
                </label>
                <input
                  type="date"
                  value={targetFollowUpDate}
                  onChange={(e) => setTargetFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                บันทึกการส่งมอบ / ประเด็นต้องเจรจาต่อ
              </label>
              <textarea
                rows={2}
                placeholder="เช่น ขอให้ทีมไทยโทรต่อรองส่วนลดค่าเช่าจาก 120,000 เหลือ 100,000 หรือขอยืดระยะ Fit-out เป็น 60 วัน..."
                value={handoffNotes}
                onChange={(e) => setHandoffNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
            {isEditMode ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบทำเลนี้</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                disabled={isSaving || isCompressingPhotos || audioPending > 0}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <i aria-hidden="true" className="fa-solid fa-floppy-disk" />
                <span>{isSaving ? 'กำลังบันทึก...' : isEditMode ? 'บันทึกการแก้ไข' : 'บันทึกทำเล'}</span>
              </button>
            </div>
          </div>
        </form>
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
              setAddressText(res.addressText);
            }
          }}
          initialLat={typeof lat === 'number' ? lat : undefined}
          initialLng={typeof lng === 'number' ? lng : undefined}
          initialAddress={addressText}
          themeColor="sky"
          title="ปักหมุดทำเล & พื้นที่สาขา"
        />
      )}
    </div>
  );
};
