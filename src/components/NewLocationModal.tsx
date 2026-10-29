import { AvatarImage } from './AvatarImage';
import React, { useState, useEffect, useRef } from 'react';
import { useDialog } from '../hooks/useDialog';
import { useApp } from '../context/AppContext';
import { LocationRecord, LocationType, LayoutFormat, RentModel, VoiceNoteEntry } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { uploadImageFile as compressImageFile } from '../utils/mediaStorage';
import { saveVideoFile, deleteVideoFile } from '../utils/mediaStorage';
import { VideoPlayer } from './VideoPlayer';
import {
  X,
  Camera,
  Trash2,
  Building2,
  Upload,
  Pencil,
  RefreshCw,
  MapPin,
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
} from 'lucide-react';

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
  } = useApp();

  const isEditMode = !!editingLocation;
  const modalOpen = isOpen || isEditMode;
  const dialogRef = useDialog(modalOpen);

  // Form State
  const [country, setCountry] = useState<'CN' | 'TH'>('TH');
  const [name, setName] = useState('');
  const [foreignName, setForeignName] = useState('');
  const [locationType, setLocationType] = useState<LocationType>('mall');
  const [zoneOrFloor, setZoneOrFloor] = useState('');
  const [unitNumber, setUnitNumber] = useState('');

  // Space Specs
  const [usableAreaSqm, setUsableAreaSqm] = useState<number | ''>(45);
  const [frontageWidthM, setFrontageWidthM] = useState<number | ''>(6);
  const [ceilingHeightM, setCeilingHeightM] = useState<number | ''>(3.5);
  const [layoutFormat, setLayoutFormat] = useState<LayoutFormat>('inline');
  const [electricalPower, setElectricalPower] = useState('3 เฟส 45 kVA');
  const [hasWaterInflow, setHasWaterInflow] = useState(true);
  const [hasDrainage, setHasDrainage] = useState(true);
  const [hasGreaseTrap, setHasGreaseTrap] = useState(true);
  const [riderAccessNotes, setRiderAccessNotes] = useState('มีจุดจอดมอเตอร์ไซค์ไรเดอร์ด้านข้าง');

  // Lease Terms
  const [rentModel, setRentModel] = useState<RentModel>('fixed');
  const [monthlyRentThb, setMonthlyRentThb] = useState<number | ''>('');
  const [monthlyRentRmb, setMonthlyRentRmb] = useState<number | ''>('');
  const [gpPercent, setGpPercent] = useState<number | ''>('');
  const [serviceFeePerSqm, setServiceFeePerSqm] = useState<number | ''>('');
  const [depositMonths, setDepositMonths] = useState<number | ''>(3);
  const [leasePeriodYears, setLeasePeriodYears] = useState<number | ''>(3);
  const [fitOutPeriodDays, setFitOutPeriodDays] = useState<number | ''>(45);
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactLineWechat, setContactLineWechat] = useState('');

  // Ratings
  const [footTraffic, setFootTraffic] = useState(5);
  const [visibility, setVisibility] = useState(5);
  const [accessibility, setAccessibility] = useState(5);
  const [valueRoi, setValueRoi] = useState(4);

  // GPS Coordinates & Address
  const [lat, setLat] = useState<number>(13.7466);
  const [lng, setLng] = useState<number>(100.5393);
  const [addressText, setAddressText] = useState('CentralWorld, Pathum Wan, Bangkok');
  const [isLocating, setIsLocating] = useState(false);

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
  const [assignedTo, setAssignedTo] = useState('');
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
      setLocationType(editingLocation.locationType || 'mall');
      setZoneOrFloor(editingLocation.zoneOrFloor || '');
      setUnitNumber(editingLocation.unitNumber || '');

      setUsableAreaSqm(editingLocation.spaceSpecs?.usableAreaSqm || '');
      setFrontageWidthM(editingLocation.spaceSpecs?.frontageWidthM || '');
      setCeilingHeightM(editingLocation.spaceSpecs?.ceilingHeightM || '');
      setLayoutFormat(editingLocation.spaceSpecs?.layoutFormat || 'inline');
      setElectricalPower(editingLocation.spaceSpecs?.electricalPower || '3 เฟส 45 kVA');
      setHasWaterInflow(editingLocation.spaceSpecs?.hasWaterInflow ?? true);
      setHasDrainage(editingLocation.spaceSpecs?.hasDrainage ?? true);
      setHasGreaseTrap(editingLocation.spaceSpecs?.hasGreaseTrap ?? true);
      setRiderAccessNotes(editingLocation.spaceSpecs?.riderAccessNotes || '');

      setRentModel(editingLocation.leaseTerms?.rentModel || 'fixed');
      setMonthlyRentThb(editingLocation.leaseTerms?.monthlyRentThb || '');
      setMonthlyRentRmb(editingLocation.leaseTerms?.monthlyRentRmb || '');
      setGpPercent(editingLocation.leaseTerms?.gpPercent || '');
      setServiceFeePerSqm(editingLocation.leaseTerms?.serviceFeePerSqm || '');
      setDepositMonths(editingLocation.leaseTerms?.depositMonths || 3);
      setLeasePeriodYears(editingLocation.leaseTerms?.leasePeriodYears || 3);
      setFitOutPeriodDays(editingLocation.leaseTerms?.fitOutPeriodDays || 45);
      setContactPerson(editingLocation.leaseTerms?.contactPerson || '');
      setContactPhone(editingLocation.leaseTerms?.contactPhone || '');
      setContactLineWechat(editingLocation.leaseTerms?.contactLineWechat || '');

      setFootTraffic(editingLocation.ratings?.footTraffic || 5);
      setVisibility(editingLocation.ratings?.visibility || 5);
      setAccessibility(editingLocation.ratings?.accessibility || 5);
      setValueRoi(editingLocation.ratings?.valueRoi || 4);

      setLat(editingLocation.location?.lat || 13.7466);
      setLng(editingLocation.location?.lng || 100.5393);
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
      setAssignedTo(editingLocation.assignedTo || '');
      setTargetFollowUpDate(editingLocation.targetFollowUpDate || '');
      setHandoffNotes(editingLocation.handoffNotes || '');
    } else {
      // Reset form
      setCountry('TH');
      setName('');
      setForeignName('');
      setLocationType('mall');
      setZoneOrFloor('');
      setUnitNumber('');
      setUsableAreaSqm(45);
      setFrontageWidthM(6);
      setCeilingHeightM(3.5);
      setLayoutFormat('inline');
      setElectricalPower('3 เฟส 45 kVA');
      setHasWaterInflow(true);
      setHasDrainage(true);
      setHasGreaseTrap(true);
      setRiderAccessNotes('มีจุดจอดมอเตอร์ไซค์ไรเดอร์ด้านข้าง');
      setRentModel('fixed');
      setMonthlyRentThb('');
      setMonthlyRentRmb('');
      setGpPercent('');
      setServiceFeePerSqm('');
      setDepositMonths(3);
      setLeasePeriodYears(3);
      setFitOutPeriodDays(45);
      setContactPerson('');
      setContactPhone('');
      setContactLineWechat('');
      setFootTraffic(5);
      setVisibility(5);
      setAccessibility(5);
      setValueRoi(4);
      setLat(13.7466);
      setLng(100.5393);
      setAddressText('CentralWorld, Pathum Wan, Bangkok');
      setStorefrontAndAtmosphere([]);
      setFloorPlanAndSpecs([]);
      setSurroundingNeighbors([]);
      setContactCards([]);
      setVideos([]);
      setMainVoiceUrl(undefined);
      setMainVoiceSec(0);
      setMainVoiceNotes([]);
      setQuickTags([]);
      setAssignedTo('');
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

  const handlePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    beginPhotos();
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await compressImageFile(file);
        if (url) urls.push(url);
      }
      setter((prev) => [...prev, ...urls]);
    } catch {
      alert('เกิดข้อผิดพลาดในการประมวลผลรูป');
    } finally {
      endPhotos();
      e.target.value = '';
    }
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
    if (!name.trim()) {
      alert('กรุณากรอกชื่อทำเล / โครงการ');
      return;
    }

    setIsSaving(true);
    try {
      const locationPayload = {
        country,
        name: name.trim(),
        foreignName: foreignName.trim() || undefined,
        locationType,
        zoneOrFloor: zoneOrFloor.trim() || 'ไม่ระบุ',
        unitNumber: unitNumber.trim() || undefined,
        location: {
          lat: Number(lat) || 13.7466,
          lng: Number(lng) || 100.5393,
          addressText: addressText.trim() || undefined,
        },
        spaceSpecs: {
          usableAreaSqm: Number(usableAreaSqm) || 0,
          frontageWidthM: Number(frontageWidthM) || 0,
          ceilingHeightM: Number(ceilingHeightM) || 0,
          layoutFormat,
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  ชื่อห้าง / โครงการ / ตึก *
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

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  ชื่อภาษาอังกฤษ หรือ ภาษาจีน
                </label>
                <input
                  type="text"
                  placeholder="เช่น Central World Ratchaprasong / 正佳广场"
                  value={foreignName}
                  onChange={(e) => setForeignName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  ประเภทสถานที่
                </label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value as LocationType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500 font-semibold"
                >
                  <option value="mall">ห้างสรรพสินค้า (Shopping Mall)</option>
                  <option value="community">คอมมูนิตี้มอลล์ (Community Mall)</option>
                  <option value="office">อาคารสำนักงาน (Office Building)</option>
                  <option value="street">สตรีท / อาคารพาณิชย์ (Street Front)</option>
                  <option value="transit">สถานี BTS / จุดคมนาคม (Transit Hub)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  ชั้น & โซน *
                </label>
                <input
                  type="text"
                  placeholder="เช่น ชั้น 1 โซน Beacon / หน้าลิฟต์แก้ว"
                  value={zoneOrFloor}
                  onChange={(e) => setZoneOrFloor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  เลขที่ห้อง / ยูนิต (Unit No.)
                </label>
                <input
                  type="text"
                  placeholder="เช่น B102, K04"
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
                  placeholder="45"
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
                  placeholder="6.0"
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
                  placeholder="3.5"
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
                  placeholder="3"
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
                  placeholder="3"
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
                  placeholder="45"
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
                  placeholder="คุณสมชาย / Leasing Team"
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
                  <span className="text-amber-600 font-mono">{footTraffic} ดาว</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={footTraffic}
                  onChange={(e) => setFootTraffic(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-600">ความสะดุดตา:</span>
                  <span className="text-amber-600 font-mono">{visibility} ดาว</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={visibility}
                  onChange={(e) => setVisibility(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-600">การเข้าถึง:</span>
                  <span className="text-amber-600 font-mono">{accessibility} ดาว</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={accessibility}
                  onChange={(e) => setAccessibility(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-600">ความคุ้มค่า ROI:</span>
                  <span className="text-amber-600 font-mono">{valueRoi} ดาว</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={valueRoi}
                  onChange={(e) => setValueRoi(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 5: GPS Location */}
          <div className="space-y-2 p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>พิกัด GPS แผนที่ (Latitude / Longitude)</span>
              </label>

              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'กำลังดึงพิกัด...' : 'ดึงพิกัดปัจจุบัน'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                />
              </div>
            </div>

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
              {/* Category A: หน้าร้าน & บรรยากาศทางเดิน */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>1. หน้าร้าน & บรรยากาศคนเดิน</span>
                  <label className="cursor-pointer text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>+ เพิ่มรูป</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, setStorefrontAndAtmosphere)}
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {storefrontAndAtmosphere.map((url, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border">
                      <img src={url} alt="storefront" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setStorefrontAndAtmosphere(storefrontAndAtmosphere.filter((_, i) => i !== idx))
                        }
                        className="absolute top-0 right-0 bg-black/60 text-white p-0.5 rounded-bl"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {storefrontAndAtmosphere.length === 0 && (
                    <div className="text-[10px] text-slate-400 py-2">ยังไม่มีรูปหน้าร้าน</div>
                  )}
                </div>
              </div>

              {/* Category B: ผังห้อง & จุดงานระบบ (Floor Plan & M&E) */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>2. ผังห้อง / มิเตอร์ไฟ / ท่อน้ำ</span>
                  <label className="cursor-pointer text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>+ เพิ่มรูป</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, setFloorPlanAndSpecs)}
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {floorPlanAndSpecs.map((url, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border">
                      <img src={url} alt="floorplan" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setFloorPlanAndSpecs(floorPlanAndSpecs.filter((_, i) => i !== idx))
                        }
                        className="absolute top-0 right-0 bg-black/60 text-white p-0.5 rounded-bl"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {floorPlanAndSpecs.length === 0 && (
                    <div className="text-[10px] text-slate-400 py-2">ยังไม่มีรูปผัง/งานระบบ</div>
                  )}
                </div>
              </div>

              {/* Category C: ร้านข้างเคียง / เพื่อนบ้าน */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>3. ร้านข้างเคียง & แบรนด์เพื่อนบ้าน</span>
                  <label className="cursor-pointer text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>+ เพิ่มรูป</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, setSurroundingNeighbors)}
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {surroundingNeighbors.map((url, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border">
                      <img src={url} alt="neighbor" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setSurroundingNeighbors(surroundingNeighbors.filter((_, i) => i !== idx))
                        }
                        className="absolute top-0 right-0 bg-black/60 text-white p-0.5 rounded-bl"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {surroundingNeighbors.length === 0 && (
                    <div className="text-[10px] text-slate-400 py-2">ยังไม่มีรูปร้านข้างเคียง</div>
                  )}
                </div>
              </div>

              {/* Category D: นามบัตรฝ่ายเช่า / เอกสารเงื่อนไข */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>4. นามบัตรฝ่ายเช่า / เอกสาร</span>
                  <label className="cursor-pointer text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>+ เพิ่มรูป</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, setContactCards)}
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {contactCards.map((url, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border">
                      <img src={url} alt="card" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setContactCards(contactCards.filter((_, i) => i !== idx))
                        }
                        className="absolute top-0 right-0 bg-black/60 text-white p-0.5 rounded-bl"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {contactCards.length === 0 && (
                    <div className="text-[10px] text-slate-400 py-2">ยังไม่มีรูปนามบัตร/เอกสาร</div>
                  )}
                </div>
              </div>
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
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                >
                  <option value="">-- ยังไม่มอบหมาย --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.alias || u.name}>
                      {u.alias || u.name} ({u.role})
                    </option>
                  ))}
                </select>
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
    </div>
  );
};
