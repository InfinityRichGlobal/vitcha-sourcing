import React, { useState, useEffect } from 'react';
import { SupplierRecord, StoreInspoRecord, PipelineStatus } from '../types';
import { useApp } from '../context/AppContext';
import { SeenByBadge } from './SeenByBadge';
import { openExecutiveReport } from '../utils/exportReport';
import { getDemoVoiceWavDataUri } from '../utils/audioHelper';
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
} from 'lucide-react';

interface DetailModalProps {
  item: SupplierRecord | StoreInspoRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onShareToLine: (item: SupplierRecord | StoreInspoRecord) => void;
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
    quickMessages,
    recordItemView,
  } = useApp();

  // Always use LIVE record from Context so comments, likes, and replies update in real-time
  const liveSupplier =
    item && item.type === 'supplier' ? suppliers.find((s) => s.id === item.id) : null;
  const liveStore =
    item && item.type === 'drink_store' ? drinkStores.find((d) => d.id === item.id) : null;
  const currentItem = liveSupplier || liveStore || item;

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [newReviewText, setNewReviewText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingSubAudioId, setPlayingSubAudioId] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const subAudioRef = React.useRef<HTMLAudioElement | null>(null);

  // Threaded reply states (supports continuous replies to any reply + collapsible threads)
  const [replyTarget, setReplyTarget] = useState<{ noteId: string; author: string } | null>(null);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({});

  // Automatically log "Read / Seen By" when modal opens
  useEffect(() => {
    if (isOpen && item?.id) {
      recordItemView(item.id, item.type);
    }
    setActiveImageIndex(null);
    setIsPlayingAudio(false);
    setPlayingSubAudioId(null);
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
    } else {
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
  const supplier = isSupplier ? (currentItem as SupplierRecord) : null;
  const store = !isSupplier ? (currentItem as StoreInspoRecord) : null;

  const likes = Array.isArray(currentItem.likes) ? currentItem.likes : [];
  const isLikedByMe = likes.some((l) => l.userId === currentUser.id);

  const openPhotoByUrl = (url: string) => {
    const idx = allPhotos.findIndex((p) => p.url === url);
    setActiveImageIndex(idx >= 0 ? idx : 0);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    addReviewerNote(currentItem.id, currentItem.type, newReviewText.trim());
    setNewReviewText('');
  };

  const handleSendReply = (noteId: string, replyToAuthor?: string) => {
    const text = (replyInputs[noteId] || '').trim();
    if (!text) return;
    addReviewReply(currentItem.id, currentItem.type, noteId, text, replyToAuthor);
    setReplyInputs({ ...replyInputs, [noteId]: '' });
    setReplyTarget(null);
  };

  const handleStatusChange = (status: PipelineStatus) => {
    if (supplier) {
      updatePipelineStatus(supplier.id, status);
    }
  };

  const mainAudioSrc =
    (isSupplier ? supplier?.voiceNoteUrl : store?.voiceNoteUrl) ||
    ((isSupplier ? supplier?.voiceDurationSec : store?.voiceDurationSec)
      ? getDemoVoiceWavDataUri(4)
      : undefined);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => {
          if (audioRef.current) {
            audioRef.current.src = getDemoVoiceWavDataUri(4);
            audioRef.current.play();
            setIsPlayingAudio(true);
          }
        });
    }
  };

  const toggleSubAudio = (subId: string, url?: string) => {
    if (!subAudioRef.current) return;
    if (playingSubAudioId === subId) {
      subAudioRef.current.pause();
      setPlayingSubAudioId(null);
    } else {
      subAudioRef.current.src = url || getDemoVoiceWavDataUri(4);
      subAudioRef.current
        .play()
        .then(() => setPlayingSubAudioId(subId))
        .catch(() => {
          if (subAudioRef.current) {
            subAudioRef.current.src = getDemoVoiceWavDataUri(4);
            subAudioRef.current.play();
            setPlayingSubAudioId(subId);
          }
        });
    }
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900">
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span
              className={`p-2 rounded-xl shrink-0 ${
                isSupplier ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {isSupplier ? (
                <Factory className="w-5 h-5 text-emerald-600" />
              ) : (
                <Coffee className="w-5 h-5 text-amber-600" />
              )}
            </span>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                {isSupplier ? supplier?.name : store?.storeName}
              </h2>
              <p className="text-xs text-slate-400 truncate">
                {isSupplier
                  ? supplier?.chineseName || supplier?.marketOrCity
                  : store?.chineseName || store?.storeCategory || store?.brandConcept}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            {/* Like Button */}
            <button
              type="button"
              onClick={() => toggleLikeItem(currentItem.id, currentItem.type)}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                isLikedByMe
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp
                className={`w-3.5 h-3.5 ${isLikedByMe ? 'fill-blue-600 text-blue-600' : ''}`}
              />
              <span className="hidden sm:inline">ถูกใจ</span>
              <span>({likes.length})</span>
            </button>

            {/* Share to Line */}
            <button
              type="button"
              onClick={() => onShareToLine(currentItem)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2xs"
              title="แชร์ลิงก์เข้า LINE"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>แชร์ LINE</span>
            </button>

            {/* Download PDF File Button ("เพิ่มปุ่มดาวนโหลด PDF ด้วย ขอดีไซน์ เหมือนปริ้นนั่นแหล่ะ แต่อันนี้ PDF files นะ") */}
            <button
              type="button"
              onClick={() => openExecutiveReport(currentItem, convertCnyToThb, 'pdf')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs"
              title="ดาวน์โหลดรายงานฉบับเต็มเป็นไฟล์ PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>PDF</span>
            </button>

            {/* Executive Print Button ("ปุ่มกด Print จัดดีไซน์ อ่านง่าย ภาพทั้งหมด + log คนดู + คอมเม้น") */}
            <button
              type="button"
              onClick={() => openExecutiveReport(currentItem, convertCnyToThb, 'print')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200/80"
              title="พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)"
            >
              <Printer className="w-3.5 h-3.5 text-slate-700" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Creator Attribution Stamp + Seen By Log */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div className="flex items-center gap-2.5">
              <img
                src={currentItem.creator.avatar}
                alt={currentItem.creator.alias}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"
              />
              <div>
                <div className="text-slate-800 font-bold flex items-center gap-1.5">
                  <span>
                    ผู้ลงพื้นที่สำรวจ: {currentItem.creator.alias} ({currentItem.creator.name})
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
                    <option value="shortlisted">4. ตัวเต็ง 🔥</option>
                    <option value="ordered">5. สั่งซื้อแล้ว 🎉</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Voice Memo Player */}
          {mainAudioSrc && (
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
                <div>
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>วอยซ์เสียงบันทึกหน้างานจริง</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono">
                    ความยาว:{' '}
                    {isSupplier ? supplier?.voiceDurationSec || 4 : store?.voiceDurationSec || 4}{' '}
                    วินาที · {isPlayingAudio ? 'กำลังเล่นเสียง...' : 'แตะปุ่ม ▶ เพื่อฟังเสียง'}
                  </div>
                </div>
              </div>
              <audio
                ref={audioRef}
                src={mainAudioSrc}
                onEnded={() => setIsPlayingAudio(false)}
              />
            </div>
          )}

          {/* Location & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="text-slate-400 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>พิกัดสถานที่ / ตลาด / เมือง:</span>
                </span>
                {currentItem.location && (
                  <a
                    href={`https://www.google.com/maps?q=${currentItem.location.lat},${currentItem.location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-emerald-700 hover:underline"
                  >
                    เปิด Google Maps ↗
                  </a>
                )}
              </div>
              <div className="text-slate-900 font-bold">
                {isSupplier
                  ? supplier?.marketOrCity
                  : store?.location?.addressText || store?.city}
              </div>
              {currentItem.location && (
                <div className="text-[11px] text-slate-500 font-mono">
                  Lat: {currentItem.location.lat.toFixed(4)}, Lng:{' '}
                  {currentItem.location.lng.toFixed(4)}
                </div>
              )}
            </div>

            {isSupplier && supplier ? (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-semibold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>จุดเด่นทางลัดที่บันทึกไว้:</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {(supplier.quickTags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                    >
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : store ? (
              <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-200/70 space-y-1">
                <div className="text-amber-800 font-semibold flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>หมวดหมู่เรฟ & คอนเซปต์:</span>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {store.storeCategory || 'ชาจีนพรีเมียม'}
                </div>
                {store.brandConcept && (
                  <div className="text-[11px] text-slate-600">{store.brandConcept}</div>
                )}
              </div>
            ) : null}
          </div>

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
                        <p className="text-[11px] text-slate-600 line-clamp-2">{catItem.memo}</p>
                      )}
                      {catItem.voiceNoteUrl && (
                        <button
                          type="button"
                          onClick={() => toggleSubAudio(catItem.id, catItem.voiceNoteUrl)}
                          className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold"
                        >
                          {playingSubAudioId === catItem.id ? (
                            <Pause className="w-2.5 h-2.5" />
                          ) : (
                            <Play className="w-2.5 h-2.5" />
                          )}
                          <span>ฟังเสียงเฉพาะชิ้นนี้</span>
                        </button>
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
                      {drink.voiceNoteUrl && (
                        <button
                          type="button"
                          onClick={() => toggleSubAudio(drink.id, drink.voiceNoteUrl)}
                          className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold"
                        >
                          {playingSubAudioId === drink.id ? (
                            <Pause className="w-2.5 h-2.5" />
                          ) : (
                            <Play className="w-2.5 h-2.5" />
                          )}
                          <span>ฟังเสียงเฉพาะแก้วนี้</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <audio
            ref={subAudioRef}
            onEnded={() => setPlayingSubAudioId(null)}
            className="hidden"
          />

          {/* Photo Gallery */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              แกลเลอรีรูปภาพทั้งหมด ({allPhotos.length} รูป — แตะเพื่อขยายและเลื่อนซ้าย-ขวา):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {allPhotos.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 shadow-xs"
                >
                  <img
                    src={p.url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
          </div>

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
                        <img
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

                          <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold">
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
                                  <img
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
                              <div>
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
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Reply Form */}
                      {replyTarget?.noteId === note.id && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex gap-1.5 animate-in fade-in">
                          <input
                            type="text"
                            placeholder={`ตอบกลับ @${replyTarget.author} ในฐานะ ${currentUser.alias}...`}
                            value={replyInputs[note.id] || ''}
                            onChange={(e) =>
                              setReplyInputs({ ...replyInputs, [note.id]: e.target.value })
                            }
                            className="flex-1 bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
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
                            onClick={() => handleSendReply(note.id, replyTarget.author)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                          >
                            ส่ง
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyTarget(null)}
                            className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs"
                          >
                            ยกเลิก
                          </button>
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
                    ⚡ {qm.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Post New Top-Level Comment */}
            <form onSubmit={handleAddReview} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder={`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${currentUser.alias}...`}
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>โพสต์</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-mono">
            ID: {currentItem.id} · ปรับปรุง:{' '}
            {new Date(currentItem.updatedAt).toLocaleTimeString('th-TH')}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
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
