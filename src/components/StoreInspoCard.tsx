import { AvatarImage } from './AvatarImage';
import React, { useState } from 'react';
import { StoreInspoRecord } from '../types';
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
  Camera,
  Paperclip,
  Coffee,
  Mic,
} from 'lucide-react';

interface StoreInspoCardProps {
  store: StoreInspoRecord;
  onSelect: (store: StoreInspoRecord) => void;
  onShareToLine: (store: StoreInspoRecord) => void;
}

export const StoreInspoCard: React.FC<StoreInspoCardProps> = ({
  store,
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

  const ratings = store.ratings || { taste: 5, aesthetics: 5, value: 4, speed: 5 };
  const avgRating = (
    (ratings.taste + ratings.aesthetics + ratings.value + ratings.speed) / 4
  ).toFixed(1);

  // Collect ALL uploaded photos of this drink store
  const allPhotos: string[] = Array.from(
    new Set([
      ...(store.photos?.drinkCups || []),
      ...(store.photos?.storefrontAndAtmosphere || []),
      ...(store.photos?.menuBoard || []),
      ...(store.drinkItems || []).map((d) => d.photo).filter(Boolean),
    ])
  );

  const displayPhotos = allPhotos;

  const notes = Array.isArray(store.reviewerNotes) ? store.reviewerNotes : [];
  const totalCommentsCount = notes.reduce(
    (sum, n) => sum + 1 + (Array.isArray(n.replies) ? n.replies.length : 0),
    0
  );

  const likes = Array.isArray(store.likes) ? store.likes : [];
  const isLikedByMe = likes.some((l) => l.userId === currentUser.id);
  const drinkItems = Array.isArray(store.drinkItems) ? store.drinkItems : [];
  const voiceNotesCount = (store.voiceNotes && store.voiceNotes.length > 0)
    ? store.voiceNotes.length
    : (store.voiceNoteUrl ? 1 : 0);
  const drinkCount = drinkItems.length;
  const attachedFilesCount = store.attachedFiles?.length || 0;
  const videosCount = store.videos?.length || 0;

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentInput.trim()) return;
    if (!await addReviewerNote(store.id, 'drink_store', commentInput.trim())) return;
    setCommentInput('');
  };

  const handlePostReply = async (e: React.FormEvent, noteId: string, replyToAuthor?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!replyInput.trim()) return;
    if (!await addReviewReply(store.id, 'drink_store', noteId, replyInput.trim(), replyToAuthor)) return;
    setReplyInput('');
    setReplyingTo(null);
  };

  return (
    <>
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
        {/* 1. Clean Minimal Header */}
        <div
          onClick={() => onSelect(store)}
          className="p-4 pb-2.5 flex items-start justify-between gap-2 cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <AvatarImage loading="lazy" decoding="async"
              src={store.creator.avatar}
              alt={store.creator.alias}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-[13px] text-slate-900 truncate">
                  {store.creator.alias}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 inline-flex items-center gap-1">
                  <i className={`fa-solid fa-location-dot text-[9px] ${store.country === 'TH' ? 'text-sky-600' : 'text-rose-500'}`} />
                  <span>{store.country === 'TH' ? 'ไทย' : 'จีน'}</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 truncate">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">
                  {store.location?.addressText || store.city || 'ไม่ระบุสถานที่'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50/70 px-2 py-0.5 rounded-md border border-amber-200/60 inline-flex items-center gap-1">
              <i className="fa-solid fa-star text-[10px] text-amber-500" />
              <span>{avgRating}</span>
            </span>
          </div>
        </div>

        {/* 2. Calm Title, Category & Key Drink */}
        <div
          onClick={() => onSelect(store)}
          className="px-4 pb-3 cursor-pointer space-y-2"
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 flex-wrap mb-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50/80 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                  <i className="fa-solid fa-mug-hot text-[10px] text-amber-600" />
                  <span>{store.storeCategory || 'เรฟร้านน้ำ'}</span>
                </span>
                {drinkCount > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold inline-flex items-center gap-1 shadow-2xs">
                    <Coffee className="w-2.5 h-2.5 text-amber-600" />
                    <span>{drinkCount} เมนู</span>
                  </span>
                )}
                {videosCount > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold inline-flex items-center gap-1 shadow-2xs">
                    <i className="fa-solid fa-video text-[9px]" />
                    <span>{videosCount} คลิป</span>
                  </span>
                )}
                {voiceNotesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold inline-flex items-center gap-1 shadow-2xs">
                    <Mic className="w-2.5 h-2.5 text-rose-600" />
                    <span>{voiceNotesCount} เสียง</span>
                  </span>
                )}
                {attachedFilesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold inline-flex items-center gap-1 shadow-2xs">
                    <Paperclip className="w-2.5 h-2.5 text-sky-600" />
                    <span>{attachedFilesCount} ไฟล์แนบ</span>
                  </span>
                )}
              </div>
              {canEditItems && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditItem(store);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 text-[11px] font-bold transition-colors"
                  title="แก้ไขข้อมูลร้านน้ำนี้"
                >
                  <Pencil className="w-3 h-3" />
                  <span>แก้ไข</span>
                </button>
              )}
            </div>

            <h3 className="font-extrabold text-sm text-slate-900 hover:text-amber-700 transition-colors leading-snug">
              {store.storeName}{' '}
              {store.chineseName && (
                <span className="text-xs font-normal text-slate-400">({store.chineseName})</span>
              )}
            </h3>
          </div>

          {store.tastingNotes && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              “{store.tastingNotes}”
            </p>
          )}

          {drinkItems.length > 0 && (
            <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-100 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-800 truncate">
                  {drinkItems[0].name || 'เมนูชิม #1'}
                  {drinkItems.length > 1 && (
                    <span className="text-[11px] font-normal text-slate-400 ml-1">
                      (+{drinkItems.length - 1})
                    </span>
                  )}
                </div>
                {drinkItems[0].fitMenuTarget && (
                  <div className="text-[11px] text-amber-700 truncate">
                    ต่อยอด: {drinkItems[0].fitMenuTarget}
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                {drinkItems[0].priceRmb ? (
                  <span className="text-xs font-mono font-bold text-amber-700">
                    ¥{drinkItems[0].priceRmb}{' '}
                    <span className="text-[11px] font-normal text-slate-400">
                      (≈{convertCnyToThb(drinkItems[0].priceRmb)}฿)
                    </span>
                  </span>
                ) : drinkItems[0].priceThb ? (
                  <span className="text-xs font-mono font-bold text-amber-700">
                    ฿{drinkItems[0].priceThb}
                  </span>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {/* 3. Compact 1:1 Thumbnail Strip in a Single Row (แตะดูรูปขยายและเลื่อนซ้าย-ขวาได้) */}
        <div className="px-4 pb-3">
          {displayPhotos.length > 0 ? (
            <div className="grid grid-cols-4 gap-1.5">
              {displayPhotos.slice(0, 4).map((photoUrl, idx) => {
                const extraCount = displayPhotos.length - 4;
                const isLastWithMore = idx === 3 && extraCount > 0;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIdx(idx);
                    }}
                    className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 group cursor-pointer focus:outline-none"
                    title={`ดูรูปที่ ${idx + 1} / ${displayPhotos.length}`}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={photoUrl}
                      alt={`${store.storeName} ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {isLastWithMore ? (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-mono text-xs font-extrabold">
                        +{extraCount}
                      </div>
                    ) : (
                      <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/55 text-white text-[9px] font-mono">
                        {idx + 1}/{displayPhotos.length}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div
              onClick={() => onSelect(store)}
              className="p-3 rounded-xl bg-slate-50/90 border border-dashed border-slate-200/90 hover:bg-slate-100/80 transition-colors cursor-pointer space-y-2 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
                <Camera className="w-3.5 h-3.5 text-slate-300" />
                <span>ยังไม่มีรูปภาพหน้าร้าน (แตะเพื่อดูรายละเอียด)</span>
              </div>
              {(drinkCount > 0 || videosCount > 0 || voiceNotesCount > 0 || attachedFilesCount > 0) && (
                <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
                  {drinkCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold inline-flex items-center gap-1">
                      <Coffee className="w-2.5 h-2.5 text-amber-600" />
                      <span>{drinkCount} เมนู</span>
                    </span>
                  )}
                  {videosCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold inline-flex items-center gap-1">
                      <i className="fa-solid fa-video text-[9px]" />
                      <span>{videosCount} คลิป</span>
                    </span>
                  )}
                  {voiceNotesCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold inline-flex items-center gap-1">
                      <Mic className="w-2.5 h-2.5 text-rose-600" />
                      <span>{voiceNotesCount} คลิปเสียง</span>
                    </span>
                  )}
                  {attachedFilesCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold inline-flex items-center gap-1">
                      <Paperclip className="w-2.5 h-2.5 text-sky-600" />
                      <span>{attachedFilesCount} ไฟล์แนบ</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. Social Summary Row */}
        <div className="px-4 py-2 flex items-center justify-between gap-2 text-[11px] text-slate-500 border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            {likes.length > 0 && (
              <span className="text-slate-700 font-medium inline-flex items-center gap-1">
                <i className="fa-solid fa-thumbs-up text-blue-600 text-[10px]" />
                <span>{likes.length}</span>
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(!showComments);
              }}
              className="hover:underline text-slate-600"
            >
              ความคิดเห็น {totalCommentsCount} รายการ
            </button>
          </div>

          <SeenByBadge viewedBy={store.viewedBy} size="sm" />
        </div>

        {/* 5. Action Buttons Bar */}
        <div className="px-2 py-1.5 grid grid-cols-4 gap-1 bg-white">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeItem(store.id, 'drink_store');
            }}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isLikedByMe
                ? 'text-blue-600 bg-blue-50/70 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isLikedByMe ? 'fill-blue-600 text-blue-600' : ''}`} />
            <span>ถูกใจ</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(!showComments);
            }}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              showComments
                ? 'text-amber-700 bg-amber-50/70 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>เม้นต์ ({totalCommentsCount})</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShareToLine(store);
            }}
            className="py-1.5 px-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>แชร์</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(store);
            }}
            className="py-1.5 px-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ดีเทล</span>
          </button>
        </div>

        {/* 6. Inline Expandable Comments */}
        {showComments && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-3.5 bg-slate-50/80 border-t border-slate-100 space-y-2.5 animate-in fade-in"
          >
            {notes.length === 0 ? (
              <div className="text-center py-2 text-[11px] text-slate-400">
                ยังไม่มีความคิดเห็น — พิมพ์เปิดประเด็นคนแรกได้เลย
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {notes.map((note) => {
                  const replies = Array.isArray(note.replies) ? note.replies : [];
                  const isCollapsed = collapsedReplies[note.id];

                  return (
                    <div key={note.id} className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <AvatarImage loading="lazy" decoding="async"
                          src={note.authorAvatar}
                          alt={note.author}
                          className="w-6 h-6 rounded-full object-cover mt-0.5 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-[11px] text-slate-900">
                                {note.author}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                {new Date(note.timestamp).toLocaleTimeString('th-TH', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed">{note.text}</p>
                          </div>

                          <div className="flex items-center gap-3 px-2 mt-0.5 text-[10px] font-bold text-slate-500">
                            {canComment && (
<button
                              type="button"
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo?.noteId === note.id &&
                                    replyingTo.author === note.author
                                    ? null
                                    : { noteId: note.id, author: note.author }
                                )
                              }
                              className="hover:text-amber-700 flex items-center gap-0.5"
                            >
                              <CornerDownRight className="w-2.5 h-2.5" />
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
                                className="text-blue-600 hover:underline flex items-center gap-0.5"
                              >
                                {isCollapsed ? (
                                  <>
                                    <ChevronDown className="w-2.5 h-2.5" />
                                    <span>ดูการตอบกลับ ({replies.length})</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronUp className="w-2.5 h-2.5" />
                                    <span>ย่อการตอบกลับ ({replies.length})</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {replies.length > 0 && !isCollapsed && (
                        <div className="ml-7 pl-2.5 border-l-2 border-slate-200 space-y-1.5">
                          {replies.map((rep) => (
                            <div key={rep.id} className="flex items-start gap-1.5">
                              <AvatarImage loading="lazy" decoding="async"
                                src={rep.authorAvatar}
                                alt={rep.author}
                                className="w-5 h-5 rounded-full object-cover mt-0.5 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="bg-white border border-slate-200/70 rounded-xl px-2.5 py-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-bold text-[10px] text-slate-900">
                                      {rep.author}
                                      {rep.replyToAuthor && (
                                        <span className="text-amber-700 font-normal ml-1">
                                          ▸ @{rep.replyToAuthor}
                                        </span>
                                      )}
                                    </span>
                                    <span className="text-[9px] text-slate-400 font-mono">
                                      {new Date(rep.timestamp).toLocaleTimeString('th-TH', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-700">{rep.text}</p>
                                </div>
                                {canComment && (
<button
                                  type="button"
                                  onClick={() =>
                                    setReplyingTo({ noteId: note.id, author: rep.author })
                                  }
                                  className="text-[9px] font-bold text-slate-500 hover:text-amber-700 px-2 mt-0.5 inline-flex items-center gap-0.5"
                                >
                                  <CornerDownRight className="w-2 h-2" />
                                  <span>ตอบกลับ @{rep.author}</span>
                                </button>
)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {canComment && replyingTo?.noteId === note.id && (
                        <form
                          onSubmit={(e) => handlePostReply(e, note.id, replyingTo.author)}
                          className="ml-7 flex items-center gap-1.5 pt-1"
                        >
                          <input
                            type="text"
                            autoFocus
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            placeholder={`ตอบกลับ @${replyingTo.author}...`}
                            className="flex-1 bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="px-2.5 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
                          >
                            ส่ง
                          </button>
                        </form>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {canComment && (
<form onSubmit={handlePostComment} className="flex items-center gap-1.5 pt-1">
              <AvatarImage loading="lazy" decoding="async"
                src={currentUser.avatar}
                alt=""
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="เขียนความคิดเห็นในโพสต์เรฟนี้..."
                className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-900"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-1.5 rounded-full bg-slate-900 hover:bg-amber-600 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
)}
          </div>
        )}
      </div>

      {/* Full-Screen Left/Right Photo Lightbox from Card */}
      {lightboxIdx !== null && displayPhotos[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="w-full max-w-4xl flex items-center justify-between text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="px-3 py-1 rounded-full bg-white/15 font-mono text-xs font-bold">
              {store.storeName} — รูปที่ {lightboxIdx + 1} / {displayPhotos.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {displayPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIdx((lightboxIdx - 1 + displayPhotos.length) % displayPhotos.length)
                }
                className="absolute left-2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img loading="lazy" decoding="async"
              src={displayPhotos[lightboxIdx]}
              alt=""
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />

            {displayPhotos.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIdx((lightboxIdx + 1) % displayPhotos.length)}
                className="absolute right-2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {displayPhotos.length > 1 && (
            <div
              className="flex items-center gap-2 overflow-x-auto py-1"
              onClick={(e) => e.stopPropagation()}
            >
              {displayPhotos.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 ${
                    idx === lightboxIdx ? 'border-amber-400 scale-105' : 'border-white/20 opacity-60'
                  }`}
                >
                  <img src={url} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
