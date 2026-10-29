import { AvatarImage } from './AvatarImage';
import React, { useState } from 'react';
import { LocationRecord } from '../types';
import { useApp } from '../context/AppContext';
import { SeenByBadge } from './SeenByBadge';
import {
  MapPin,
  Share2,
  MessageSquare,
  ThumbsUp,
  Send,
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Pencil,
  Zap,
  Droplets,
  RotateCcw,
  Sparkles,
  Bike,
  Building2,
  Maximize2,
  Ruler,
  Camera,
} from 'lucide-react';

interface LocationCardProps {
  location: LocationRecord;
  onSelect: (location: LocationRecord) => void;
  onShareToLine: (location: LocationRecord) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onSelect,
  onShareToLine,
}) => {
  const {
    currentUser,
    convertCnyToThb,
    toggleLikeItem,
    addReviewerNote,
    addReviewReply,
    canEditItems,
    canComment,
    openEditItem,
  } = useApp();

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ noteId: string; author: string } | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({});

  const ratings = location.ratings || { footTraffic: 5, visibility: 5, accessibility: 5, valueRoi: 4 };
  const avgRating = (
    (ratings.footTraffic + ratings.visibility + ratings.accessibility + ratings.valueRoi) / 4
  ).toFixed(1);

  // Collect ALL uploaded photos of this location
  const allPhotos: string[] = Array.from(
    new Set([
      ...(location.photos?.storefrontAndAtmosphere || []),
      ...(location.photos?.floorPlanAndSpecs || []),
      ...(location.photos?.surroundingNeighbors || []),
      ...(location.photos?.contactCards || []),
    ])
  );

  const displayPhotos = allPhotos;

  const notes = Array.isArray(location.reviewerNotes) ? location.reviewerNotes : [];
  const totalCommentsCount = notes.reduce(
    (sum, n) => sum + 1 + (Array.isArray(n.replies) ? n.replies.length : 0),
    0
  );

  const likes = Array.isArray(location.likes) ? location.likes : [];
  const isLikedByMe = likes.some((l) => l.userId === currentUser.id);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentInput.trim()) return;
    if (!await addReviewerNote(location.id, 'location', commentInput.trim())) return;
    setCommentInput('');
  };

  const handlePostReply = async (e: React.FormEvent, noteId: string, replyToAuthor?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!replyInput.trim()) return;
    if (!await addReviewReply(location.id, 'location', noteId, replyInput.trim(), replyToAuthor)) return;
    setReplyInput('');
    setReplyingTo(null);
  };

  const locationTypeLabel: Record<string, string> = {
    mall: 'ห้างสรรพสินค้า (Shopping Mall)',
    community: 'คอมมูนิตี้มอลล์ (Community Mall)',
    office: 'อาคารสำนักงาน (Office Building)',
    street: 'สตรีท / อาคารพาณิชย์ (Street Front)',
    transit: 'สถานีรถไฟฟ้า / คมนาคม (Transit Hub)',
  };

  const layoutFormatLabel: Record<string, string> = {
    inline: 'ห้องแบบแนวต่อ (Inline Shop)',
    corner: 'ห้องหัวมุม 2 ด้าน (Corner)',
    island: 'พื้นที่เกาะกลาง (Island)',
    kiosk: 'คีออสก์ / บูธ (Kiosk)',
  };

  const rentModelLabel: Record<string, string> = {
    fixed: 'ค่าเช่าคงที่ (Fixed Rent)',
    gp: 'ส่วนแบ่งยอดขาย (GP Only)',
    hybrid: 'ไฮบริด (Fixed + GP)',
  };

  return (
    <>
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
        {/* Card Header: Creator & Post Metadata */}
        <div>
          <div className="p-3 sm:p-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <AvatarImage
                src={location.creator?.avatar || './logo.jpg'}
                alt={location.creator?.name || 'ทีมงานสำรวจ'}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                    {location.creator?.alias || location.creator?.name || 'ทีมสำรวจ'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-sky-100 text-sky-800 border border-sky-200 shrink-0">
                    {location.country === 'CN' ? '🇨🇳 จีน' : '🇹🇭 ไทย'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-200 shrink-0">
                    <i aria-hidden="true" className="fa-solid fa-map-location-dot mr-1 text-[9px]" />
                    สถานที่ & ทำเล
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {new Date(location.updatedAt || location.creator?.timestamp || Date.now()).toLocaleString('th-TH', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {canEditItems && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditItem(location);
                  }}
                  className="w-7 h-7 rounded-lg bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600 border border-slate-200 flex items-center justify-center transition-colors"
                  title="แก้ไขข้อมูลทำเลนี้"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Location Title & Subtitle */}
          <div className="p-3.5 sm:p-4 space-y-2 cursor-pointer" onClick={() => onSelect(location)}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight group-hover:text-sky-600 transition-colors">
                  {location.name}
                </h3>
                {location.foreignName && (
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {location.foreignName}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-sky-800 font-semibold mt-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span className="truncate">{location.zoneOrFloor || 'ไม่ระบุชั้น/โซน'}</span>
                  {location.unitNumber && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-mono font-bold">
                      {location.unitNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Overall Rating Badge */}
              <div className="flex flex-col items-end shrink-0">
                <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs">
                  <i aria-hidden="true" className="fa-solid fa-star text-amber-500 text-[11px]" />
                  <span>{avgRating}</span>
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 font-medium">คะแนนศักยภาพ</span>
              </div>
            </div>

            {/* Badges: Location Type & Format */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-sky-600" />
                <span>{locationTypeLabel[location.locationType] || location.locationType}</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                {layoutFormatLabel[location.spaceSpecs?.layoutFormat] || location.spaceSpecs?.layoutFormat || 'Inline'}
              </span>
            </div>

            {/* Key Specs Pill Bar (พื้นที่, หน้ากว้าง, เพดาน, ค่าเช่า) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-2 text-center">
                <div className="text-[10px] text-sky-700 font-bold flex items-center justify-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>ขนาดพื้นที่</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 font-mono mt-0.5">
                  {location.spaceSpecs?.usableAreaSqm || '-'} <span className="text-[10px] font-normal text-slate-500">ตร.ม.</span>
                </div>
              </div>

              <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-2 text-center">
                <div className="text-[10px] text-sky-700 font-bold flex items-center justify-center gap-1">
                  <Ruler className="w-3 h-3" />
                  <span>หน้ากว้าง</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 font-mono mt-0.5">
                  {location.spaceSpecs?.frontageWidthM || '-'} <span className="text-[10px] font-normal text-slate-500">ม.</span>
                </div>
              </div>

              <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-2 text-center">
                <div className="text-[10px] text-sky-700 font-bold flex items-center justify-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span>ความสูงเพดาน</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 font-mono mt-0.5">
                  {location.spaceSpecs?.ceilingHeightM || '-'} <span className="text-[10px] font-normal text-slate-500">ม.</span>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2 text-center">
                <div className="text-[10px] text-amber-800 font-bold flex items-center justify-center gap-1">
                  <span>ค่าเช่ารายเดือน</span>
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-amber-950 font-mono mt-0.5 truncate">
                  {location.leaseTerms?.monthlyRentThb ? (
                    <>฿{location.leaseTerms.monthlyRentThb.toLocaleString()}</>
                  ) : location.leaseTerms?.monthlyRentRmb ? (
                    <>¥{location.leaseTerms.monthlyRentRmb.toLocaleString()}</>
                  ) : (
                    <span className="text-slate-400">สอบถาม</span>
                  )}
                  {location.leaseTerms?.gpPercent ? ` + GP ${location.leaseTerms.gpPercent}%` : ''}
                </div>
              </div>
            </div>

            {/* M&E Systems Quick Badges */}
            <div className="flex flex-wrap items-center gap-1 pt-1">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                  location.spaceSpecs?.electricalPower
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-slate-50 text-slate-400 border border-slate-200'
                }`}
              >
                <Zap className="w-2.5 h-2.5 text-amber-500" />
                <span>{location.spaceSpecs?.electricalPower || 'ไฟทั่วไป'}</span>
              </span>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                  location.spaceSpecs?.hasWaterInflow
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-slate-50 text-slate-400 border border-slate-200'
                }`}
              >
                <Droplets className="w-2.5 h-2.5 text-blue-500" />
                <span>น้ำดี {location.spaceSpecs?.hasWaterInflow ? '✓' : '✗'}</span>
              </span>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                  location.spaceSpecs?.hasDrainage
                    ? 'bg-teal-50 text-teal-800 border border-teal-200'
                    : 'bg-slate-50 text-slate-400 border border-slate-200'
                }`}
              >
                <RotateCcw className="w-2.5 h-2.5 text-teal-500" />
                <span>น้ำทิ้ง {location.spaceSpecs?.hasDrainage ? '✓' : '✗'}</span>
              </span>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                  location.spaceSpecs?.hasGreaseTrap
                    ? 'bg-purple-50 text-purple-800 border border-purple-200'
                    : 'bg-slate-50 text-slate-400 border border-slate-200'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5 text-purple-500" />
                <span>ดักไขมัน {location.spaceSpecs?.hasGreaseTrap ? '✓' : '✗'}</span>
              </span>

              {location.spaceSpecs?.riderAccessNotes && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Bike className="w-2.5 h-2.5 text-emerald-600" />
                  <span className="truncate max-w-[120px]">{location.spaceSpecs.riderAccessNotes}</span>
                </span>
              )}
            </div>

            {/* Handoff Stage & Assignee */}
            {location.assignedTo && (
              <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-slate-600">
                <span className="text-slate-400">ผู้รับผิดชอบ:</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-bold">
                  {location.assignedTo}
                </span>
                {location.handoffStage && (
                  <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[10px]">
                    Stage: {location.handoffStage}
                  </span>
                )}
              </div>
            )}

            {/* Quick Tags */}
            {Array.isArray(location.quickTags) && location.quickTags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {location.quickTags.slice(0, 5).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo Gallery: Full FIT containment with locked height (2-3 images per row) */}
          <div className="px-3.5 sm:px-4 pb-2">
            {displayPhotos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {displayPhotos.slice(0, 3).map((photo, pIdx) => {
                  const extraCount = displayPhotos.length - 3;
                  const isLastWithMore = pIdx === 2 && extraCount > 0;
                  return (
                    <div
                      key={pIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIdx(pIdx);
                      }}
                      className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-900/5 border border-slate-200/80 h-44 sm:h-48 flex items-center justify-center p-1"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={photo}
                        alt={`${location.name} รูปที่ ${pIdx + 1}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                      {isLastWithMore ? (
                        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center text-white font-extrabold text-xs sm:text-sm">
                          +{extraCount} รูป
                        </div>
                      ) : (
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white font-mono text-[9px] font-bold">
                          {pIdx + 1}/{displayPhotos.length}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                onClick={() => onSelect(location)}
                className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center flex items-center justify-center gap-1.5 text-slate-400 text-xs cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-slate-300" />
                <span>ยังไม่มีรูปภาพพื้นที่ (แตะเพื่อดูรายละเอียด)</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer: Telemetry, Social Actions, Comments */}
        <div className="border-t border-slate-100 bg-white">
          <div className="p-3 sm:p-4 flex items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <SeenByBadge viewedBy={location.viewedBy || []} />
            </div>

            <div className="flex items-center gap-2">
              {/* Like Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeItem(location.id, 'location');
                }}
                disabled={!canComment}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  isLikedByMe
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isLikedByMe ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likes.length}</span>
              </button>

              {/* Comments Toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  showComments ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{totalCommentsCount}</span>
              </button>

              {/* Share to LINE */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onShareToLine(location);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                title="แชร์สรุปทำเลไปยัง LINE"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">แชร์</span>
              </button>

              {/* View Details */}
              <button
                type="button"
                onClick={() => onSelect(location)}
                className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                เปิดดู
              </button>
            </div>
          </div>

          {/* Collapsible Comments Section */}
          {showComments && (
            <div className="px-3 sm:px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/60 space-y-3">
              {notes.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-2">
                  ยังไม่มีข้อความความเห็น ร่วมประเมินทำเลนี้เป็นคนแรก
                </p>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notes.map((note) => (
                    <div key={note.id} className="space-y-1.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 font-bold text-slate-900">
                            <AvatarImage
                              src={note.authorAvatar || './logo.jpg'}
                              alt={note.author}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span>{note.author}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(note.timestamp).toLocaleTimeString('th-TH', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-slate-700 whitespace-pre-wrap">{note.text}</p>

                        {/* Reply trigger */}
                        {canComment && (
                          <div className="pt-1 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => setReplyingTo({ noteId: note.id, author: note.author })}
                              className="text-[10px] font-bold text-sky-700 hover:underline flex items-center gap-1"
                            >
                              <CornerDownRight className="w-2.5 h-2.5" />
                              <span>ตอบกลับ</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Replies List */}
                      {Array.isArray(note.replies) && note.replies.length > 0 && (
                        <div className="pl-6 space-y-1">
                          {note.replies.map((rep) => (
                            <div
                              key={rep.id}
                              className="p-2 rounded-xl bg-sky-50/60 border border-sky-100 text-[11px] space-y-0.5"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <div className="flex items-center gap-1 font-bold text-slate-900">
                                  <AvatarImage
                                    src={rep.authorAvatar || './logo.jpg'}
                                    alt={rep.author}
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                  <span>{rep.author}</span>
                                </div>
                                <span className="text-[9px] text-slate-400 font-mono">
                                  {new Date(rep.timestamp).toLocaleTimeString('th-TH', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-slate-700 whitespace-pre-wrap">{rep.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input Box */}
                      {replyingTo?.noteId === note.id && (
                        <form
                          onSubmit={(e) => handlePostReply(e, note.id, replyingTo.author)}
                          className="pl-6 flex items-center gap-1.5"
                        >
                          <input
                            type="text"
                            placeholder={`ตอบกลับ ${replyingTo.author}...`}
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            className="flex-1 px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-white focus:outline-sky-500"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-bold text-xs"
                          >
                            ส่ง
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="p-1 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Main Comment Input */}
              {canComment && (
                <form onSubmit={handlePostComment} className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="พิมพ์ความเห็นประเมินทำเล..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-sky-500"
                  />
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 shrink-0"
                  >
                    <Send className="w-3 h-3" />
                    <span>ส่ง</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={displayPhotos[lightboxIdx]}
            alt={location.name}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {displayPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((prev) => ((prev || 0) > 0 ? (prev || 0) - 1 : displayPhotos.length - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((prev) => ((prev || 0) < displayPhotos.length - 1 ? (prev || 0) + 1 : 0));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
