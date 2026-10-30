import { ActivityTimeline } from './ActivityTimeline';
import { AvatarImage } from './AvatarImage';
import React, { useState, useEffect } from 'react';
import { SupplierRecord, StoreInspoRecord, LocationRecord, PipelineStatus, AttachedFile } from '../types';
import { useApp } from '../context/AppContext';
import { SeenByBadge } from './SeenByBadge';
import { openExecutiveReport } from '../utils/exportReport';
import { getItemVoiceNotes } from '../utils/audioHelper';
import { VideoPlayer } from './VideoPlayer';
import { getFileCategoryInfo, formatBytes, openFileSafely } from './AttachedFilesSection';
import {
  X,
  MapPin,
  Share2,
  MessageSquare,
  Zap,
  Factory,
  Coffee,
  Play,
  Pause,
  Printer,
  FileDown,
  Tag,
  CornerDownRight,
  Send,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Pencil,
  Image as ImageIcon,
  Mic,
  Paperclip,
  Package,
  Loader2,
  PlayCircle,
  Music,
  Building2,
  Maximize2,
  Ruler,
  Droplets,
  RotateCcw,
  Sparkles,
  Bike,
  DollarSign,
  Phone,
  User,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { uploadMediaToServer } from '../services/api';

interface DetailModalProps {
  item: SupplierRecord | StoreInspoRecord | LocationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onShareToLine: (item: any) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onShareToLine,
}) => {
  const {
    currentUser,
    convertCnyToThb,
    addReviewerNote,
    addReviewReply,
    updatePipelineStatus,
    toggleLikeItem,
    suppliers,
    drinkStores,
    locations,
    users,
    quickMessages,
    recordItemView,
    canEditItems,
    canDeleteItems,
    deleteSupplier,
    deleteStoreInspo,
    deleteLocation,
    canComment,
    openEditItem,
  } = useApp();

  // Always use LIVE record from Context so comments, likes, and replies update in real-time
  const liveSupplier =
    item && item.type === 'supplier' ? suppliers.find((s) => s.id === item.id) : null;
  const liveStore =
    item && item.type === 'drink_store' ? drinkStores.find((d) => d.id === item.id) : null;
  const liveLocation =
    item && item.type === 'location' ? locations.find((l) => l.id === item.id) : null;
  const currentItem = liveSupplier || liveStore || liveLocation || item;

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [newReviewText, setNewReviewText] = useState('');

  // Threaded reply states (supports continuous replies to any reply + collapsible threads)
  const [replyTarget, setReplyTarget] = useState<{ noteId: string; author: string } | null>(null);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({});

  // Rich comment & reply attachments (Photos & Live Voice notes to Google Drive CENTER)
  const [commentPhotoUrl, setCommentPhotoUrl] = useState<string | null>(null);
  const [commentVoiceUrl, setCommentVoiceUrl] = useState<string | null>(null);
  const [isUploadingCommentAttachment, setIsUploadingCommentAttachment] = useState(false);
  const [replyAttachments, setReplyAttachments] = useState<Record<string, { photoUrl?: string; voiceUrl?: string }>>({});
  const commentPhotoInputRef = React.useRef<HTMLInputElement | null>(null);
  const [recordingCommentTarget, setRecordingCommentTarget] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const commentRecorderRef = React.useRef<MediaRecorder | null>(null);
  const commentStreamRef = React.useRef<MediaStream | null>(null);
  const commentTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingStartedAtRef = React.useRef<number>(0);

  const stopLiveVoiceRecording = React.useCallback(() => {
    if (commentTimerRef.current) {
      clearInterval(commentTimerRef.current);
      commentTimerRef.current = null;
    }
    if (commentRecorderRef.current && commentRecorderRef.current.state === 'recording') {
      commentRecorderRef.current.stop();
      return;
    }
    commentStreamRef.current?.getTracks().forEach((t) => t.stop());
    commentStreamRef.current = null;
    setRecordingCommentTarget(null);
  }, []);

  // Automatically log "Read / Seen By" when modal opens
  useEffect(() => {
    if (isOpen && item?.id) {
      recordItemView(item.id, item.type);
    }
    setActiveImageIndex(null);
    return () => {
      if (commentTimerRef.current) clearInterval(commentTimerRef.current);
      if (commentRecorderRef.current?.state === 'recording') commentRecorderRef.current.stop();
      commentStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [isOpen, item?.id]);

  // Collect all photos of this item for gallery & left/right carousel
  const allPhotos: { url: string; label: string }[] = [];
  if (currentItem) {
    if (currentItem.type === 'supplier') {
      const sup = currentItem as SupplierRecord;
      sup.photos.storefrontAndAtmosphere?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `ป้ายหน้าร้าน/บรรยากาศ #${idx + 1}` })
      );
      sup.photos.contactCards?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `นามบัตร/WeChat #${idx + 1}` })
      );
      sup.catalogItems?.forEach((c, idx) => {
        if (c.photo) {
          allPhotos.push({
            url: c.photo,
            label: c.name ? `สินค้า: ${c.name}` : `รายการสินค้า #${idx + 1}`,
          });
        }
      });
    } else if (currentItem.type === 'drink_store') {
      const st = currentItem as StoreInspoRecord;
      st.photos.storefrontAndAtmosphere?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `หน้าร้าน/บรรยากาศ #${idx + 1}` })
      );
      st.photos.menuBoard?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `เมนูบอร์ด #${idx + 1}` })
      );
      st.photos.drinkCups?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `แก้วเครื่องดื่ม #${idx + 1}` })
      );
      st.drinkItems?.forEach((d, idx) => {
        if (d.photo) {
          allPhotos.push({
            url: d.photo,
            label: d.name ? `เมนู: ${d.name}` : `เมนูชิม #${idx + 1}`,
          });
        }
      });
    } else if (currentItem.type === 'location') {
      const loc = currentItem as LocationRecord;
      loc.photos.storefrontAndAtmosphere?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `หน้าร้าน/ทางเดิน #${idx + 1}` })
      );
      loc.photos.floorPlanAndSpecs?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `ผังห้อง/งานระบบ #${idx + 1}` })
      );
      loc.photos.surroundingNeighbors?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `ร้านข้างเคียง #${idx + 1}` })
      );
      loc.photos.contactCards?.forEach((p, idx) =>
        allPhotos.push({ url: p, label: `นามบัตร/เอกสาร #${idx + 1}` })
      );
    }
  }

  // Keyboard navigation for Left/Right Image Carousel
  useEffect(() => {
    if (activeImageIndex === null || allPhotos.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev + 1) % allPhotos.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev - 1 + allPhotos.length) % allPhotos.length : null
        );
      } else if (e.key === 'Escape') {
        setActiveImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, allPhotos.length]);

  if (!isOpen || !currentItem) return null;

  const isSupplier = currentItem.type === 'supplier';
  const isDrinkStore = currentItem.type === 'drink_store';
  const isLocation = currentItem.type === 'location';
  const supplier = isSupplier ? (currentItem as SupplierRecord) : null;
  const store = isDrinkStore ? (currentItem as StoreInspoRecord) : null;
  const location = isLocation ? (currentItem as LocationRecord) : null;

  const likes = Array.isArray(currentItem.likes) ? currentItem.likes : [];
  const isLikedByMe = likes.some((l) => l.userId === currentUser.id);

  const attachedFilesList: AttachedFile[] = (currentItem as any).attachedFiles || [];
  const itemVideosList: string[] = currentItem.videos || [];
  const itemVoiceNotesList = getItemVoiceNotes(currentItem);
  const catalogItemsList = isSupplier ? (supplier?.catalogItems || []) : [];
  const drinkItemsList = isDrinkStore ? (store?.drinkItems || []) : [];

  const openPhotoByUrl = (url: string) => {
    const idx = allPhotos.findIndex((p) => p.url === url);
    setActiveImageIndex(idx >= 0 ? idx : 0);
  };

  const handleDeleteItem = async () => {
    if (!currentItem) return;
    const name = isSupplier ? supplier?.name : isLocation ? location?.name : store?.storeName;
    const ok = window.confirm(`ยืนยันการลบรายการ "${name || 'รายการนี้'}" หรือไม่?`);
    if (!ok) return;
    try {
      if (currentItem.type === 'supplier') {
        await deleteSupplier(currentItem.id);
      } else if (currentItem.type === 'drink_store') {
        await deleteStoreInspo(currentItem.id);
      } else if (currentItem.type === 'location') {
        await deleteLocation(currentItem.id);
      }
      onClose();
    } catch {
      alert('เกิดข้อผิดพลาดในการลบรายการ');
    }
  };

  const handleUploadAttachment = async (file: File, type: 'photo' | 'audio', noteId?: string) => {
    try {
      setIsUploadingCommentAttachment(true);
      const url = await uploadMediaToServer(file, {
        recordId: currentItem.id,
        recordType: currentItem.type,
        recordTitle: isSupplier ? supplier?.name : isLocation ? location?.name : store?.storeName,
      });
      if (noteId) {
        setReplyAttachments((prev) => ({
          ...prev,
          [noteId]: {
            ...prev[noteId],
            ...(type === 'photo' ? { photoUrl: url } : { voiceUrl: url }),
          },
        }));
      } else {
        if (type === 'photo') setCommentPhotoUrl(url);
        else setCommentVoiceUrl(url);
      }
    } catch (err: any) {
      alert(err.message || 'อัปโหลดไฟล์แนบไม่สำเร็จ');
    } finally {
      setIsUploadingCommentAttachment(false);
    }
  };

  const toggleLiveVoiceRecording = async (targetKey: 'main' | string) => {
    if (recordingCommentTarget === targetKey) {
      stopLiveVoiceRecording();
      return;
    }
    if (recordingCommentTarget) {
      stopLiveVoiceRecording();
    }
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        alert('เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      commentStreamRef.current = stream;
      const mime = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'].find((t) =>
        MediaRecorder.isTypeSupported(t)
      );
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      commentRecorderRef.current = recorder;
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        if (commentTimerRef.current) {
          clearInterval(commentTimerRef.current);
          commentTimerRef.current = null;
        }
        stream.getTracks().forEach((t) => t.stop());
        commentStreamRef.current = null;
        setRecordingCommentTarget(null);
        const type = recorder.mimeType?.split(';')[0] || 'audio/webm';
        const blob = new Blob(chunks, { type });
        if (!blob.size) return;
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        const file = new File([blob], `เสียงคอมเมนต์-${Date.now()}.${ext}`, { type });
        void handleUploadAttachment(file, 'audio', targetKey === 'main' ? undefined : targetKey);
      };
      recorder.onerror = () => {
        if (commentTimerRef.current) clearInterval(commentTimerRef.current);
        stream.getTracks().forEach((t) => t.stop());
        setRecordingCommentTarget(null);
        alert('อัดเสียงไม่สำเร็จ กรุณาลองใหม่');
      };
      recordingStartedAtRef.current = Date.now();
      setRecordingSeconds(0);
      setRecordingCommentTarget(targetKey);
      recorder.start(250);
      commentTimerRef.current = setInterval(() => {
        setRecordingSeconds(Math.round((Date.now() - recordingStartedAtRef.current) / 1000));
      }, 1000);
    } catch {
      commentStreamRef.current?.getTracks().forEach((t) => t.stop());
      setRecordingCommentTarget(null);
      alert('ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด');
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = newReviewText.trim();
    if (!text && !commentPhotoUrl && !commentVoiceUrl) return;
    const ok = await addReviewerNote(currentItem.id, currentItem.type, text, {
      photoUrl: commentPhotoUrl || undefined,
      voiceUrl: commentVoiceUrl || undefined,
    });
    if (!ok) return;
    setNewReviewText('');
    setCommentPhotoUrl(null);
    setCommentVoiceUrl(null);
  };

  const handleSendReply = async (noteId: string, replyToAuthor?: string, replyToId?: string) => {
    const text = (replyInputs[noteId] || '').trim();
    const att = replyAttachments[noteId];
    if (!text && !att?.photoUrl && !att?.voiceUrl) return;
    const ok = await addReviewReply(currentItem.id, currentItem.type, noteId, text, replyToAuthor, {
      photoUrl: att?.photoUrl,
      voiceUrl: att?.voiceUrl,
      replyToId,
    });
    if (!ok) return;
    setReplyInputs({ ...replyInputs, [noteId]: '' });
    setReplyAttachments((prev) => ({ ...prev, [noteId]: {} }));
    setReplyTarget(null);
  };

  const handleStatusChange = (status: PipelineStatus) => {
    if (supplier) {
      updatePipelineStatus(supplier.id, status);
    }
  };

  const mainVoiceClips = getItemVoiceNotes(currentItem);
  const mainAudioSrc =
    mainVoiceClips[0]?.url ||
    (isSupplier ? supplier?.voiceNoteUrl : store?.voiceNoteUrl);

  return (
    <div className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900">
        {/* Header Bar — แยกชื่อรายการและปุ่มเครื่องมือคนละบรรทัด ไม่ให้บดบังชื่อรายการ */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10">
          {/* Row 1: Item Title + Close Button */}
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <span
                className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  isSupplier
                    ? 'bg-emerald-50 text-emerald-700'
                    : isLocation
                    ? 'bg-sky-50 text-sky-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {isSupplier ? (
                  <Factory className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                ) : isLocation ? (
                  <i aria-hidden="true" className="fa-solid fa-map-location-dot text-base text-sky-600" />
                ) : (
                  <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words">
                  {isSupplier ? supplier?.name : isLocation ? location?.name : store?.storeName}
                </h2>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {isSupplier
                    ? supplier?.chineseName || supplier?.marketOrCity
                    : isLocation
                    ? location?.zoneOrFloor || location?.foreignName
                    : store?.chineseName || store?.storeCategory || store?.brandConcept}
                </p>
              </div>
            </div>

            {/* Close Modal Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0"
              title="ปิดหน้าต่าง"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Row 2: Separate Action Toolbar Row (แก้ไข · ถูกใจ · แชร์ LINE · PDF · พิมพ์) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 select-none">
            {/* Edit Item Button (เฉพาะ 2 สิทธิ์ระดับบน Admin & Editor) */}
            {canEditItems && (
              <button
                type="button"
                onClick={() => openEditItem(currentItem)}
                className="h-7 sm:h-8 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                title="แก้ไขข้อมูลรายการนี้ (Admin / Editor)"
              >
                <Pencil className="w-3 h-3 text-amber-600 shrink-0" />
                <span>แก้ไข</span>
              </button>
            )}

            {/* Delete Button (Owner / Admin) */}
            {canDeleteItems && (
              <button
                type="button"
                onClick={handleDeleteItem}
                className="h-7 sm:h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                title="ลบรายการ"
              >
                <Trash2 className="w-3 h-3 text-rose-600 shrink-0" />
                <span>ลบรายการ</span>
              </button>
            )}

            {/* Like Button */}
            <button
              type="button"
              onClick={() => toggleLikeItem(currentItem.id, currentItem.type)}
              className={`h-7 sm:h-8 px-2.5 rounded-xl border transition-all active:scale-95 inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${
                isLikedByMe
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title={`ถูกใจ (${likes.length})`}
            >
              <ThumbsUp
                className={`w-3 h-3 shrink-0 ${isLikedByMe ? 'fill-blue-600 text-blue-600' : ''}`}
              />
              <span>ถูกใจ{likes.length > 0 ? ` (${likes.length})` : ''}</span>
            </button>

            {/* Share to Line */}
            <button
              type="button"
              onClick={() => onShareToLine(currentItem)}
              className="h-7 sm:h-8 px-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs"
              title="แชร์ลิงก์เข้า LINE"
            >
              <Share2 className="w-3 h-3 shrink-0" />
              <span>แชร์ LINE</span>
            </button>

            {/* Download PDF File Button */}
            <button
              type="button"
              onClick={() => openExecutiveReport(currentItem, convertCnyToThb, 'pdf', users)}
              className="h-7 sm:h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0"
              title="ดาวน์โหลดรายงานเป็นไฟล์ PDF"
            >
              <FileDown className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>ดาวน์โหลด PDF</span>
            </button>

            {/* Executive Print Button */}
            <button
              type="button"
              onClick={() => openExecutiveReport(currentItem, convertCnyToThb, 'print', users)}
              className="h-7 sm:h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1 whitespace-nowrap shrink-0"
              title="พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)"
            >
              <Printer className="w-3 h-3 text-slate-600 shrink-0" />
              <span>พิมพ์</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Creator Attribution Stamp + Seen By Log */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div className="flex items-center gap-2.5">
              <AvatarImage
                src={currentItem.creator.avatar}
                alt={currentItem.creator.alias}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"
              />
              <div>
                <div className="text-slate-800 font-bold flex items-center gap-1.5">
                  <span>
                    ผู้ลงพื้นที่สำรวจ: {currentItem.creator.alias}
                    {currentItem.creator.name &&
                    currentItem.creator.name !== currentItem.creator.alias
                      ? ` (${currentItem.creator.name})`
                      : ''}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  บันทึกเมื่อ: {new Date(currentItem.creator.timestamp).toLocaleString('th-TH')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Seen By ("อ่านแล้ว") Avatar Stack + Admin Timestamp Inspector */}
              <SeenByBadge viewedBy={currentItem.viewedBy} size="md" />

              {isSupplier && supplier && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500">สถานะ:</span>
                  <select
                    value={supplier.status}
                    onChange={(e) => handleStatusChange(e.target.value as PipelineStatus)}
                    className="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="scouted">1. สำรวจแล้ว</option>
                    <option value="reviewing">2. เทียบสเปก</option>
                    <option value="rfq_sent">3. ส่ง RFQ</option>
                    <option value="shortlisted">4. ตัวเต็ง (Shortlist)</option>
                    <option value="ordered">5. สั่งซื้อแล้ว (Ordered)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Voice Memo Player (รองรับหลายคลิปเสียงไม่จำกัด) */}
          {/* Main Voice Note Clips (Direct Native Audio Player) */}
          {mainVoiceClips.length > 0 && (
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>วอยซ์เสียงบันทึกหน้างานจริง ({mainVoiceClips.length} คลิป)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700">
                  แตะ ▶ เพื่อฟังเสียงบันทึก
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mainVoiceClips.map((clip, cIdx) => (
                  <div
                    key={clip.id || cIdx}
                    className="p-2.5 bg-white border border-emerald-200 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{clip.label || `คลิปเสียง #${cIdx + 1}`}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-mono shrink-0">
                        {clip.durationSec ? `${clip.durationSec} วินาที` : 'เสียงบันทึก'}
                      </span>
                    </div>
                    {clip.url && (
                      <audio
                        controls
                        preload="metadata"
                        playsInline
                        src={clip.url}
                        className="h-8 w-full rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compact Category, Rating, Location & Contact Pills */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {isSupplier && supplier ? (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1">
                    <i className="fa-solid fa-industry text-[10px]" />
                    <span>{supplier.category}</span>
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                    {supplier.isFactory ? 'โรงงานผลิต' : 'หน้าร้าน / โชว์รูม'}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1">
                    <i className="fa-solid fa-star text-[10px] text-amber-500" />
                    <span>{supplier.rating || 5}/5</span>
                  </span>
                  {(supplier.quickTags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </>
              ) : store ? (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1">
                    <i className="fa-solid fa-mug-hot text-[10px]" />
                    <span>{store.storeCategory || 'เรฟร้านน้ำ'}</span>
                  </span>
                  {store.ratings && (
                    <span className="px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1">
                      <i className="fa-solid fa-star text-[10px] text-amber-500" />
                      <span>
                        {(
                          (store.ratings.taste +
                            store.ratings.aesthetics +
                            store.ratings.value +
                            store.ratings.speed) /
                          4
                        ).toFixed(1)}
                      </span>
                    </span>
                  )}
                </>
              ) : isLocation && location ? (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-bold inline-flex items-center gap-1">
                    <i className="fa-solid fa-map-location-dot text-[10px]" />
                    <span>{location.locationType === 'mall' ? 'ห้างสรรพสินค้า' : location.locationType}</span>
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                    ผัง {location.spaceSpecs?.layoutFormat || 'Inline'}
                  </span>
                  {location.ratings && (
                    <span className="px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1">
                      <i className="fa-solid fa-star text-[10px] text-amber-500" />
                      <span>
                        {(
                          (location.ratings.footTraffic +
                            location.ratings.visibility +
                            location.ratings.accessibility +
                            location.ratings.valueRoi) /
                          4
                        ).toFixed(1)}
                      </span>
                    </span>
                  )}
                  {(location.quickTags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </>
              ) : null}

              {/* Extra Detail Badges (จำนวนสินค้า / เมนู, คลิป, คลิปเสียง, ไฟล์แนบ) */}
              {catalogItemsList.length > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs">
                  <Package className="w-3 h-3 text-amber-600" />
                  <span>{catalogItemsList.length} สินค้า</span>
                </span>
              )}
              {drinkItemsList.length > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs">
                  <Coffee className="w-3 h-3 text-amber-600" />
                  <span>{drinkItemsList.length} เมนู</span>
                </span>
              )}
              {itemVideosList.length > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs">
                  <i className="fa-solid fa-video text-[9px] text-purple-600" />
                  <span>{itemVideosList.length} คลิป</span>
                </span>
              )}
              {itemVoiceNotesList.length > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs">
                  <Mic className="w-3 h-3 text-rose-600" />
                  <span>{itemVoiceNotesList.length} คลิปเสียง</span>
                </span>
              )}
              {attachedFilesList.length > 0 && (
                <a
                  href="#detail-attached-files-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('detail-attached-files-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs"
                  title="คลิกเพื่อเลื่อนดูไฟล์แนบ"
                >
                  <Paperclip className="w-3 h-3 text-sky-600" />
                  <span>{attachedFilesList.length} ไฟล์แนบ</span>
                </a>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>
                    {isSupplier
                      ? supplier?.marketOrCity || supplier?.address || supplier?.location?.addressText
                      : isLocation
                      ? location?.location?.addressText || location?.zoneOrFloor
                      : store?.location?.addressText || store?.city}
                  </span>
                </span>
                {(isSupplier ? supplier?.wechatId : isLocation ? location?.leaseTerms?.contactLineWechat : store?.wechatId) && (
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono">
                    LINE/WeChat: {isSupplier ? supplier?.wechatId : isLocation ? location?.leaseTerms?.contactLineWechat : store?.wechatId}
                  </span>
                )}
                {(isSupplier ? supplier?.phone : isLocation ? location?.leaseTerms?.contactPhone : store?.phone) && (
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono">
                    โทร: {isSupplier ? supplier?.phone : isLocation ? location?.leaseTerms?.contactPhone : store?.phone}
                  </span>
                )}
                {isLocation && location?.leaseTerms?.contactPerson && (
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                    ผู้ติดต่อ: {location.leaseTerms.contactPerson}
                  </span>
                )}
              </div>
              {Boolean(currentItem.location?.lat && currentItem.location?.lng && (currentItem.location.lat !== 0 || currentItem.location.lng !== 0)) ? (
                <a
                  href={`https://www.google.com/maps?q=${currentItem.location.lat},${currentItem.location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-sky-700 hover:underline shrink-0"
                >
                  เปิด Google Maps ↗
                </a>
              ) : (
                <span className="text-[10px] text-slate-400 font-medium shrink-0">
                  📍 ยังไม่ได้ระบุพิกัด GPS
                </span>
              )}
            </div>
          </div>

          {/* Full Field Memo / Tasting Notes / Location Specs */}
          {isLocation && location && (
            <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3">
              <div className="text-[11px] font-bold text-sky-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>สเปกพื้นที่ & เงื่อนไขสัญญาเช่า (Location Scouting Specs)</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-mono font-bold border border-sky-200">
                  {location.zoneOrFloor} {location.unitNumber ? `(${location.unitNumber})` : ''}
                </span>
              </div>

              {/* Grid 4 Columns for Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">ขนาดพื้นที่</div>
                  <div className="font-extrabold text-sm text-slate-900 font-mono mt-0.5">
                    {location.spaceSpecs?.usableAreaSqm || '-'} <span className="text-[10px] font-normal text-slate-500">ตร.ม.</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">หน้ากว้าง / เพดาน</div>
                  <div className="font-extrabold text-sm text-slate-900 font-mono mt-0.5">
                    {location.spaceSpecs?.frontageWidthM || '-'}ม. / {location.spaceSpecs?.ceilingHeightM || '-'}ม.
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">ค่าเช่ารายเดือน</div>
                  <div className="font-extrabold text-sm text-amber-950 font-mono mt-0.5 truncate">
                    {location.leaseTerms?.monthlyRentThb ? (
                      <>฿{location.leaseTerms.monthlyRentThb.toLocaleString()}</>
                    ) : location.leaseTerms?.monthlyRentRmb ? (
                      <>¥{location.leaseTerms.monthlyRentRmb.toLocaleString()}</>
                    ) : (
                      <span className="text-slate-400">สอบถาม</span>
                    )}
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">เงื่อนไขสัญญา</div>
                  <div className="font-extrabold text-xs text-slate-900 font-mono mt-0.5 truncate">
                    สัญญา {location.leaseTerms?.leasePeriodYears || 3} ปี · ประกัน {location.leaseTerms?.depositMonths || 3} ด.
                  </div>
                </div>
              </div>

              {/* M&E Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>สเปกไฟ: {location.spaceSpecs?.electricalPower || '3 เฟส 45 kVA'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span>ท่อน้ำดี: {location.spaceSpecs?.hasWaterInflow ? '✓ มีในห้อง' : '✗ ไม่มี'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                  <RotateCcw className="w-3 h-3 text-teal-500" />
                  <span>ท่อน้ำทิ้ง: {location.spaceSpecs?.hasDrainage ? '✓ มีในห้อง' : '✗ ไม่มี'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span>ดักไขมัน: {location.spaceSpecs?.hasGreaseTrap ? '✓ มีรองรับ' : '✗ ต้องติดตั้งเอง'}</span>
                </span>
                {location.spaceSpecs?.riderAccessNotes && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                    <Bike className="w-3 h-3 text-emerald-600" />
                    <span>ไรเดอร์: {location.spaceSpecs.riderAccessNotes}</span>
                  </span>
                )}
              </div>

              {location.handoffNotes && (
                <div className="pt-2 border-t border-sky-200/80 text-xs">
                  <span className="font-bold text-sky-900 block mb-0.5">ประเด็นเจรจา / ส่งมอบงาน:</span>
                  <p className="text-slate-800 whitespace-pre-wrap">{location.handoffNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Full Field Memo / Tasting Notes (แสดงข้อความบันทึกหลักครบเต็มรูป ไม่ตัดคำ) */}
          {((isSupplier && supplier?.memo) || (!isSupplier && store?.tastingNotes)) && (
            <div
              className={`p-3.5 rounded-xl border space-y-1 ${
                isSupplier
                  ? 'bg-emerald-50/50 border-emerald-200/80'
                  : 'bg-amber-50/50 border-amber-200/80'
              }`}
            >
              <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                <i
                  className={`fa-solid ${
                    isSupplier ? 'fa-clipboard-check text-emerald-600' : 'fa-quote-left text-amber-600'
                  } text-[10px]`}
                />
                <span>{isSupplier ? 'บันทึกหน้างาน / รายละเอียดหลัก:' : 'บันทึกรีวิวรสชาติ & ไอเดียเรฟ:'}</span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium">
                {isSupplier ? supplier?.memo : store?.tastingNotes}
              </p>
            </div>
          )}

          {/* Supplier Catalog Items */}
          {isSupplier && supplier && (supplier.catalogItems || []).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  รายการอุปกรณ์ & สินค้า ({(supplier.catalogItems || []).length} รายการ):
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(supplier.catalogItems || []).map((catItem, idx) => (
                  <div
                    key={catItem.id || idx}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs"
                  >
                    {catItem.photo ? (
                      <img
                        src={catItem.photo}
                        alt=""
                        onClick={() => openPhotoByUrl(catItem.photo)}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
                        ไม่มีรูป
                      </div>
                    )}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {catItem.name || `รายการที่ ${idx + 1}`}
                      </div>
                      {catItem.priceRmb && (
                        <div className="text-xs font-mono font-bold text-emerald-700">
                          ¥{catItem.priceRmb}{' '}
                          <span className="text-[11px] font-normal text-slate-500">
                            (≈{convertCnyToThb(catItem.priceRmb).toLocaleString()}฿)
                          </span>
                        </div>
                      )}
                      {catItem.priceThb && !catItem.priceRmb && (
                        <div className="text-xs font-mono font-bold text-emerald-700">
                          ฿{catItem.priceThb.toLocaleString()}
                        </div>
                      )}
                      {catItem.weightKg && (
                        <div className="text-[11px] text-slate-500">
                          น้ำหนัก: <span className="font-mono">{catItem.weightKg}</span>
                        </div>
                      )}
                      {catItem.memo && (
                        <p className="text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed">{catItem.memo}</p>
                      )}
                      {getItemVoiceNotes(catItem).length > 0 && (
                        <div className="space-y-1 pt-1">
                          {getItemVoiceNotes(catItem).map((vClip, vIdx) => (
                            <div key={vIdx} className="flex flex-col sm:flex-row sm:items-center gap-1 bg-emerald-50/90 p-1.5 rounded-lg border border-emerald-200/80">
                              <span className="text-[10px] font-bold text-emerald-900 truncate min-w-0 flex items-center gap-1">
                                <Volume2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span className="truncate">{vClip.label || `เสียง #${vIdx + 1}`}</span>
                                {vClip.durationSec ? `(${vClip.durationSec}s)` : ''}
                              </span>
                              {vClip.url && (
                                <audio controls preload="metadata" playsInline src={vClip.url} className="h-6 w-full sm:w-44 shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drink Store Tasted Menu Items */}
          {!isSupplier && store && (store.drinkItems || []).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  เมนูที่ชิม & ถอดรหัสสูตร ({(store.drinkItems || []).length} เมนู):
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(store.drinkItems || []).map((drink, idx) => (
                  <div
                    key={drink.id || idx}
                    className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs"
                  >
                    {drink.photo && (
                      <img
                        src={drink.photo}
                        alt=""
                        onClick={() => openPhotoByUrl(drink.photo)}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"
                      />
                    )}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {drink.name || `แก้วที่ #${idx + 1}`}
                      </div>
                      {drink.priceRmb && (
                        <div className="text-xs font-mono font-bold text-amber-700">
                          ¥{drink.priceRmb}{' '}
                          <span className="text-[11px] font-normal text-slate-500">
                            (≈{convertCnyToThb(drink.priceRmb)}฿)
                          </span>
                        </div>
                      )}
                      {drink.fitMenuTarget && (
                        <div className="text-[11px] font-semibold text-emerald-700">
                          ต่อยอด: {drink.fitMenuTarget}
                        </div>
                      )}
                      {drink.gimmickNotes && (
                        <p className="text-[11px] text-slate-600">{drink.gimmickNotes}</p>
                      )}
                      {getItemVoiceNotes(drink).length > 0 && (
                        <div className="space-y-1 pt-1">
                          {getItemVoiceNotes(drink).map((vClip, vIdx) => (
                            <div key={vIdx} className="flex flex-col sm:flex-row sm:items-center gap-1 bg-amber-50/90 p-1.5 rounded-lg border border-amber-200/80">
                              <span className="text-[10px] font-bold text-amber-900 truncate min-w-0 flex items-center gap-1">
                                <Volume2 className="w-3 h-3 text-amber-600 shrink-0" />
                                <span className="truncate">{vClip.label || `เสียง #${vIdx + 1}`}</span>
                                {vClip.durationSec ? `(${vClip.durationSec}s)` : ''}
                              </span>
                              {vClip.url && (
                                <audio controls preload="metadata" playsInline src={vClip.url} className="h-6 w-full sm:w-44 shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Gallery */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              แกลเลอรีรูปภาพทั้งหมด ({allPhotos.length} รูป{allPhotos.length > 0 ? ' — แตะเพื่อขยายและเลื่อนซ้าย-ขวา' : ''}):
            </span>
            {allPhotos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {allPhotos.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="group relative h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-900/5 shadow-xs flex items-center justify-center p-1"
                  >
                    <img
                      src={p.url}
                      alt={p.label || ''}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                      {idx + 1}/{allPhotos.length}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium">
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                ยังไม่มีรูปภาพที่แนบไว้ในรายการนี้
              </div>
            )}
          </div>

          {/* Video Gallery Section */}
          {currentItem.videos && currentItem.videos.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <i className="fa-solid fa-video text-purple-600" />
                <span>คลิปวิดีโอของรายการนี้ ({currentItem.videos.length} คลิป):</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentItem.videos.map((vid, idx) => (
                  <VideoPlayer
                    key={idx}
                    src={vid}
                    className="rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56"
                    videoClassName="object-contain"
                    badgeLabel={`คลิปที่ ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Attached Documents & Files Section */}
          {(currentItem as any).attachedFiles && (currentItem as any).attachedFiles.length > 0 && (
            <div id="detail-attached-files-section" className="space-y-2 pt-1 scroll-mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-sky-600" />
                  <span>เอกสารและไฟล์แนบ ({(currentItem as any).attachedFiles.length} รายการ):</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  แตะเพื่อเปิดดูบน Google Drive / เบราว์เซอร์
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {((currentItem as any).attachedFiles as AttachedFile[]).map((file) => {
                  const info = getFileCategoryInfo(file.name, file.mimeType);
                  const Icon = info.icon;
                  return (
                    <a
                      key={file.id}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (file.url.startsWith('data:')) {
                          e.preventDefault();
                          openFileSafely(file.url, file.name);
                        }
                      }}
                      className="bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xs p-3 flex items-center justify-between gap-3 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div
                          className={`w-9 h-9 rounded-xl border flex flex-col items-center justify-center shrink-0 shadow-2xs ${info.colorClasses}`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[8px] font-extrabold uppercase leading-none mt-0.5">
                            {info.label}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-xs text-slate-800 truncate group-hover:text-sky-700 transition-colors">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                            <span className="font-medium">{formatBytes(file.size)}</span>
                            {file.uploadedAt && (
                              <>
                                <span>•</span>
                                <span>{new Date(file.uploadedAt).toLocaleDateString('th-TH')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 shrink-0">
                        <span>เปิดไฟล์</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Threaded Reviewer Notes Section (รีพายต่อกันได้เรื่อยๆ และย่อ/ขยายได้) */}
          <div
            id="detail-comments-section"
            className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {currentItem.reviewerNotes.length} หัวข้อสนทนา
              </span>
            </div>

            <div className="space-y-2.5">
              {currentItem.reviewerNotes.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">
                  ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง
                </p>
              ) : (
                currentItem.reviewerNotes.map((note) => {
                  const replies = note.replies || [];
                  const isCollapsed = collapsedReplies[note.id];

                  return (
                    <div
                      key={note.id}
                      className="p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2"
                    >
                      {/* Main Comment */}
                      <div className="flex items-start gap-2.5">
                        <AvatarImage
                          src={note.authorAvatar}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-[11px] mb-0.5">
                            <span className="font-bold text-slate-900">{note.author}</span>
                            <span className="text-slate-400 font-mono text-[10px]">
                              {new Date(note.timestamp).toLocaleTimeString('th-TH', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">{note.text}</p>

                          {note.photoUrl && (
                            <div className="mt-1.5">
                              <img
                                src={note.photoUrl}
                                alt="ภาพแนบ"
                                className="max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs"
                                onClick={() => window.open(note.photoUrl, '_blank')}
                              />
                            </div>
                          )}

                          {(note.voiceUrl || note.audioUrl) && (
                            <div className="mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm">
                              <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <audio controls src={note.voiceUrl || note.audioUrl} className="h-7 w-full" />
                            </div>
                          )}

                          <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold">
                            {canComment && (
                            <button
                              type="button"
                              onClick={() =>
                                setReplyTarget(
                                  replyTarget?.noteId === note.id &&
                                    replyTarget.author === note.author
                                    ? null
                                    : { noteId: note.id, author: note.author }
                                )
                              }
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <CornerDownRight className="w-3 h-3" />
                              <span>ตอบกลับ</span>
                            </button>
                            )}

                            {replies.length > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setCollapsedReplies((prev) => ({
                                    ...prev,
                                    [note.id]: !prev[note.id],
                                  }))
                                }
                                className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
                              >
                                {isCollapsed ? (
                                  <>
                                    <ChevronDown className="w-3 h-3" />
                                    <span>ดูการตอบกลับ ({replies.length})</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronUp className="w-3 h-3" />
                                    <span>ย่อการตอบกลับ ({replies.length})</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Threaded Replies List (รีพายต่อกันได้เรื่อยๆ) */}
                      {replies.length > 0 && !isCollapsed && (
                        <div className="ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1">
                          {replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                  <AvatarImage
                                    src={reply.authorAvatar}
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                  <span>{reply.author}</span>
                                  {reply.replyToAuthor && (
                                    <span className="text-blue-600 font-normal">
                                      ▸ ตอบกลับ @{reply.replyToAuthor}
                                    </span>
                                  )}
                                </div>
                                <span className="text-slate-400 font-mono">
                                  {new Date(reply.timestamp).toLocaleTimeString('th-TH', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-slate-700 leading-snug">{reply.text}</p>
                              {reply.photoUrl && (
                                <div className="mt-1">
                                  <img
                                    src={reply.photoUrl}
                                    alt="ภาพแนบ"
                                    className="max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs"
                                    onClick={() => window.open(reply.photoUrl, '_blank')}
                                  />
                                </div>
                              )}
                              {(reply.voiceUrl || reply.audioUrl) && (
                                <div className="mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]">
                                  <Volume2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  <audio controls src={reply.voiceUrl || reply.audioUrl} className="h-6 w-full" />
                                </div>
                              )}
                              <div>
                                {canComment && (
                            <button
                                  type="button"
                                  onClick={() =>
                                    setReplyTarget({ noteId: note.id, author: reply.author })
                                  }
                                  className="text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5"
                                >
                                  <CornerDownRight className="w-2.5 h-2.5" />
                                  <span>ตอบกลับ @{reply.author} ต่อ</span>
                                </button>
                            )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Reply Form */}
                      {canComment && replyTarget?.noteId === note.id && (
                        <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in">
                          {(replyAttachments[note.id]?.photoUrl || replyAttachments[note.id]?.voiceUrl) && (
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                              {replyAttachments[note.id]?.photoUrl && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  <ImageIcon className="w-3 h-3" /> ภาพพร้อมแนบ
                                  <button type="button" onClick={() => setReplyAttachments(p => ({ ...p, [note.id]: { ...p[note.id], photoUrl: undefined } }))}><X className="w-2.5 h-2.5" /></button>
                                </span>
                              )}
                              {replyAttachments[note.id]?.voiceUrl && (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                                  <Mic className="w-3 h-3" /> เสียงอัดสดพร้อมส่ง
                                  <audio controls src={replyAttachments[note.id]?.voiceUrl} className="h-6 w-32" />
                                  <button type="button" onClick={() => setReplyAttachments(p => ({ ...p, [note.id]: { ...p[note.id], voiceUrl: undefined } }))}><X className="w-2.5 h-2.5" /></button>
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex gap-1.5 items-center flex-wrap sm:flex-nowrap">
                            <input
                              type="text"
                              placeholder={`ตอบกลับ @${replyTarget.author} ในฐานะ ${currentUser.alias}...`}
                              value={replyInputs[note.id] || ''}
                              onChange={(e) =>
                                setReplyInputs({ ...replyInputs, [note.id]: e.target.value })
                              }
                              className="flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSendReply(note.id, replyTarget.author);
                                }
                              }}
                            />
                            <button
                              type="button"
                              title="แนบรูปภาพในคำตอบกลับ"
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e: any) => {
                                  const f = e.target?.files?.[0];
                                  if (f) handleUploadAttachment(f, 'photo', note.id);
                                };
                                input.click();
                              }}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              title={
                                recordingCommentTarget === note.id
                                  ? 'กดเพื่อหยุดอัดเสียงสด'
                                  : 'กดเพื่ออัดเสียงสดในคำตอบกลับ'
                              }
                              disabled={isUploadingCommentAttachment}
                              onClick={() => void toggleLiveVoiceRecording(note.id)}
                              className={`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${
                                recordingCommentTarget === note.id
                                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                                  : 'bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700'
                              }`}
                            >
                              <Mic className="w-3.5 h-3.5" />
                              <span>
                                {recordingCommentTarget === note.id
                                  ? `หยุดอัด (${recordingSeconds}s)`
                                  : 'อัดเสียงสด'}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSendReply(note.id, replyTarget.author)}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                            >
                              ส่ง
                            </button>
                            {canComment && (
                              <button
                                type="button"
                                onClick={() => setReplyTarget(null)}
                                className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs"
                              >
                                ยกเลิก
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Message Templates Chips */}
            <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> ข้อความด่วน (แตะเพื่อพิมพ์ทันที):
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {quickMessages.map((qm) => (
                  <button
                    key={qm.id}
                    type="button"
                    onClick={() => setNewReviewText(qm.text)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs"
                    title={qm.text}
                  >
                    <i className="fa-solid fa-bolt text-amber-500 mr-1 text-[10px]" />
                    <span>{qm.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Post New Top-Level Comment */}
            {currentUser.role === 'viewer' ? null : (
              <form onSubmit={handleAddReview} className="space-y-2 pt-1">
                {/* Pending Attachment Previews */}
                {(commentPhotoUrl || commentVoiceUrl || isUploadingCommentAttachment) && (
                  <div className="flex flex-wrap items-center gap-2 px-1">
                    {commentPhotoUrl && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-[120px]">รูปภาพพร้อมแนบ</span>
                        <button
                          type="button"
                          onClick={() => setCommentPhotoUrl(null)}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {commentVoiceUrl && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                        <Mic className="w-3.5 h-3.5 text-blue-600" />
                        <span>เสียงอัดสด:</span>
                        <audio controls src={commentVoiceUrl} className="h-6 w-36" />
                        <button
                          type="button"
                          onClick={() => setCommentVoiceUrl(null)}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {isUploadingCommentAttachment && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>กำลังอัปโหลดไฟล์สื่อ...</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-1.5 items-center flex-wrap sm:flex-nowrap">
                  <input
                    ref={commentPhotoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUploadAttachment(f, 'photo');
                      e.target.value = '';
                    }}
                  />

                  <input
                    type="text"
                    placeholder={`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${currentUser.alias}...`}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"
                  />

                  <button
                    type="button"
                    title="แนบรูปภาพ"
                    disabled={isUploadingCommentAttachment}
                    onClick={() => commentPhotoInputRef.current?.click()}
                    className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">รูปภาพ</span>
                  </button>

                  <button
                    type="button"
                    title={
                      recordingCommentTarget === 'main'
                        ? 'กดเพื่อหยุดอัดเสียงสด'
                        : 'กดเพื่ออัดเสียงสดในคอมเมนต์'
                    }
                    disabled={isUploadingCommentAttachment}
                    onClick={() => void toggleLiveVoiceRecording('main')}
                    className={`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${
                      recordingCommentTarget === 'main'
                        ? 'bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs'
                        : 'bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>
                      {recordingCommentTarget === 'main'
                        ? `หยุดอัด (${recordingSeconds}s)`
                        : 'อัดเสียงสด'}
                    </span>
                  </button>

                  <button
                    type="submit"
                    disabled={isUploadingCommentAttachment || recordingCommentTarget === 'main'}
                    className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50"
                  >
                    <Send className="w-3 h-3" />
                    <span>โพสต์</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          <ActivityTimeline key={currentItem.id} item={currentItem} users={users} />
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-3.5 border-t border-slate-100 bg-white flex items-center justify-between gap-2 select-none">
          <div className="text-[11px] text-slate-400 font-mono truncate hidden sm:block">
            ID: {currentItem.id} · ปรับปรุง:{' '}
            {new Date(currentItem.updatedAt).toLocaleTimeString('th-TH')}
          </div>
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
            {canDeleteItems && (
              <button
                type="button"
                onClick={handleDeleteItem}
                className="px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0"
                title="ลบรายการ"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>ลบรายการ</span>
              </button>
            )}
            {canEditItems && (
              <button
                type="button"
                onClick={() => openEditItem(currentItem)}
                className="px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap active:scale-95 shrink-0"
              >
                <Pencil className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>แก้ไขข้อมูล</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap active:scale-95 shrink-0"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Carousel Image Lightbox (เลื่อนซ้าย-ขวาได้ตามรายการนั้นๆ) */}
      {activeImageIndex !== null && allPhotos[activeImageIndex] && (
        <div
          className="fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Bar: Counter + Label + Close */}
          <div
            className="w-full max-w-4xl flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold">
                รูปที่ {activeImageIndex + 1} / {allPhotos.length}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md">
                {allPhotos[activeImageIndex].label}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image + Left / Right Navigation Buttons */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {allPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActiveImageIndex(
                    (activeImageIndex - 1 + allPhotos.length) % allPhotos.length
                  )
                }
                className="absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
                title="รูปก่อนหน้า (◀)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={allPhotos[activeImageIndex].url}
              alt={allPhotos[activeImageIndex].label}
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
            />

            {allPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActiveImageIndex((activeImageIndex + 1) % allPhotos.length)
                }
                className="absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
                title="รูปถัดไป (▶)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {allPhotos.length > 1 && (
            <div
              className="w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {allPhotos.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImageIndex
                      ? 'border-emerald-400 scale-105 shadow-md'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
