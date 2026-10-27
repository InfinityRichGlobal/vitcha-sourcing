import React, { useState } from 'react';
import { StoreInspoRecord } from '../types';
import { useApp } from '../context/AppContext';
import { SeenByBadge } from './SeenByBadge';
import {
  MapPin,
  Share2,
  Coffee,
  MessageSquare,
  ThumbsUp,
  UserCheck,
  Send,
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  Eye,
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
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ noteId: string; author: string } | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({});

  const ratings = store.ratings || { taste: 5, aesthetics: 5, value: 4, speed: 5 };
  const avgRating = (
    (ratings.taste + ratings.aesthetics + ratings.value + ratings.speed) / 4
  ).toFixed(1);

  // Collect ALL uploaded photos for Facebook-style collage & thumbnail strip
  const allPhotos: string[] = Array.from(
    new Set([
      ...(store.photos?.drinkCups || []),
      ...(store.photos?.storefrontAndAtmosphere || []),
      ...(store.photos?.menuBoard || []),
      ...(store.drinkItems || []).map((d) => d.photo).filter(Boolean),
    ])
  );

  const displayPhotos =
    allPhotos.length > 0
      ? allPhotos
      : ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'];

  const notes = Array.isArray(store.reviewerNotes) ? store.reviewerNotes : [];
  const totalCommentsCount = notes.reduce(
    (sum, n) => sum + 1 + (Array.isArray(n.replies) ? n.replies.length : 0),
    0
  );

  const likes = Array.isArray(store.likes) ? store.likes : [];
  const isLikedByMe = likes.some((l) => l.userId === currentUser.id);
  const drinkItems = Array.isArray(store.drinkItems) ? store.drinkItems : [];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentInput.trim()) return;
    addReviewerNote(store.id, 'drink_store', commentInput.trim());
    setCommentInput('');
  };

  const handlePostReply = (e: React.FormEvent, noteId: string, replyToAuthor?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!replyInput.trim()) return;
    addReviewReply(store.id, 'drink_store', noteId, replyInput.trim(), replyToAuthor);
    setReplyInput('');
    setReplyingTo(null);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* 1. Facebook-Style Post Header */}
      <div
        onClick={() => onSelect(store)}
        className="p-3.5 pb-2.5 flex items-start justify-between gap-2 cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={store.creator.avatar}
            alt={store.creator.alias}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500/20 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-xs sm:text-[13px] text-slate-900 truncate">
                {store.creator.alias}
              </span>
              <span className="text-[10px] text-slate-400">เช็กอินเรฟร้านน้ำ</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                  store.country === 'TH'
                    ? 'bg-sky-50 text-sky-800 border-sky-200/80'
                    : 'bg-rose-50 text-rose-800 border-rose-200/80'
                }`}
              >
                {store.country === 'TH' ? '🇹🇭 ไทย' : '🇨🇳 จีน'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 text-amber-700 font-medium">
                <MapPin className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate max-w-[160px]">
                  {store.location?.addressText || store.city || 'กวางโจว'}
                </span>
              </span>
              <span>·</span>
              <span className="font-mono">
                {new Date(store.updatedAt || store.creator.timestamp).toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Right Badges: Category & Score */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 flex items-center gap-1">
            <Coffee className="w-2.5 h-2.5 text-amber-600" />
            <span className="max-w-[95px] truncate">{store.storeCategory || 'เรฟร้านน้ำ'}</span>
          </span>
          <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/70 text-xs font-mono font-bold text-amber-800">
            <span className="text-amber-500">★</span>
            <span>{avgRating}</span>
          </div>
        </div>
      </div>

      {/* 2. Post Body: Store Title, Tasting Notes, 4-D Score & Signature Drink */}
      <div
        onClick={() => onSelect(store)}
        className="px-3.5 pb-2.5 cursor-pointer space-y-2"
      >
        <div>
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            {store.city && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                📍 {store.city}
              </span>
            )}
            {store.assignedTo && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                <UserCheck className="w-2.5 h-2.5" />
                <span>R&D: {store.assignedTo}</span>
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-sm sm:text-base text-slate-950 hover:text-amber-700 transition-colors leading-snug">
            {store.storeName}{' '}
            {store.chineseName && (
              <span className="text-xs font-normal text-slate-500">({store.chineseName})</span>
            )}
          </h3>
        </div>

        {store.tastingNotes && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            “{store.tastingNotes}”
          </p>
        )}

        {/* Compact 4-Dimension Rating Pills */}
        <div className="grid grid-cols-4 gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60 text-[10px] text-center">
          <div>
            <div className="text-slate-400">รสชาติ</div>
            <div className="font-bold text-amber-600">★ {ratings.taste}</div>
          </div>
          <div>
            <div className="text-slate-400">ดีไซน์แก้ว</div>
            <div className="font-bold text-amber-600">★ {ratings.aesthetics}</div>
          </div>
          <div>
            <div className="text-slate-400">คุ้มราคา</div>
            <div className="font-bold text-amber-600">★ {ratings.value}</div>
          </div>
          <div>
            <div className="text-slate-400">ความไว</div>
            <div className="font-bold text-amber-600">★ {ratings.speed}</div>
          </div>
        </div>

        {/* First Tasted Drink Preview */}
        {drinkItems.length > 0 && (
          <div className="p-2 rounded-xl bg-amber-50/50 border border-amber-200/60 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-800 truncate">
                🧋 {drinkItems[0].name || 'เมนูชิม #1'}
                {drinkItems.length > 1 && (
                  <span className="text-[10px] font-normal text-slate-500 ml-1">
                    (+อีก {drinkItems.length - 1} เมนู)
                  </span>
                )}
              </div>
              {drinkItems[0].fitMenuTarget && (
                <div className="text-[10px] text-amber-800 font-semibold truncate">
                  ต่อยอดแบรนด์: {drinkItems[0].fitMenuTarget}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              {drinkItems[0].priceRmb ? (
                <div className="text-xs font-mono font-extrabold text-amber-700">
                  ¥{drinkItems[0].priceRmb}{' '}
                  <span className="text-[10px] font-normal text-slate-500">
                    (≈{convertCnyToThb(drinkItems[0].priceRmb)}฿)
                  </span>
                </div>
              ) : drinkItems[0].priceThb ? (
                <div className="text-xs font-mono font-extrabold text-amber-700">
                  ฿{drinkItems[0].priceThb}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* 3. Facebook-Style Photo Collage + All Uploaded Photos Thumbnail Strip */}
      <div onClick={() => onSelect(store)} className="cursor-pointer">
        {displayPhotos.length === 1 ? (
          <div className="relative h-48 sm:h-52 w-full bg-slate-100 border-y border-slate-100 overflow-hidden">
            <img
              src={displayPhotos[0]}
              alt={store.storeName}
              className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
            />
          </div>
        ) : displayPhotos.length === 2 ? (
          <div className="grid grid-cols-2 gap-0.5 h-48 sm:h-52 bg-slate-100 border-y border-slate-100 overflow-hidden">
            {displayPhotos.slice(0, 2).map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt=""
                className="w-full h-full object-cover hover:opacity-95 transition-opacity"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5 h-48 sm:h-52 bg-slate-100 border-y border-slate-100 overflow-hidden">
            <div className="col-span-2 h-full overflow-hidden">
              <img
                src={displayPhotos[0]}
                alt=""
                className="w-full h-full object-cover hover:opacity-95 transition-opacity"
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-0.5 h-full overflow-hidden">
              <img
                src={displayPhotos[1]}
                alt=""
                className="w-full h-full object-cover hover:opacity-95 transition-opacity"
              />
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={displayPhotos[2]}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {displayPhotos.length > 3 && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white font-mono font-extrabold text-sm">
                    +{displayPhotos.length - 3} รูป
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mini Thumbnail Strip of ALL Uploaded Images */}
        {displayPhotos.length > 1 && (
          <div className="px-3.5 py-2 bg-slate-50/70 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 shrink-0">
              อัลบั้ม ({displayPhotos.length}):
            </span>
            {displayPhotos.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt=""
                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0 hover:ring-2 hover:ring-amber-500 transition-all"
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. Social Stats Row: Likes Count + Comments Count + Seen-By ("อ่านแล้ว") */}
      <div className="px-3.5 py-2 flex items-center justify-between gap-2 text-[11px] text-slate-500 border-b border-slate-100">
        <div className="flex items-center gap-2 min-w-0">
          {likes.length > 0 && (
            <div className="inline-flex items-center gap-1 text-slate-700 font-semibold">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                👍
              </span>
              <span>{likes.length} ถูกใจ</span>
            </div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(!showComments);
            }}
            className="hover:underline font-semibold text-slate-600"
          >
            ความคิดเห็น {totalCommentsCount} รายการ
          </button>
        </div>

        <SeenByBadge viewedBy={store.viewedBy} size="sm" />
      </div>

      {/* 5. Facebook-Style Action Buttons Bar */}
      <div className="px-2 py-1 grid grid-cols-4 gap-1 bg-white">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeItem(store.id, 'drink_store');
          }}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            isLikedByMe
              ? 'text-blue-600 bg-blue-50/80'
              : 'text-slate-600 hover:bg-slate-100'
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
          className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            showComments
              ? 'text-amber-700 bg-amber-50/80'
              : 'text-slate-600 hover:bg-slate-100'
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
          className="py-1.5 px-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 flex items-center justify-center gap-1.5 transition-all active:scale-95"
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
          className="py-1.5 px-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1 transition-all active:scale-95"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>ดีเทล</span>
        </button>
      </div>

      {/* 6. Inline Expandable Facebook-Style Comments & Continuous Replies */}
      {showComments && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-3 bg-slate-50/90 border-t border-slate-200/80 space-y-2.5 animate-in fade-in"
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
                      <img
                        src={note.authorAvatar}
                        alt={note.author}
                        className="w-6 h-6 rounded-full object-cover mt-0.5 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="bg-white border border-slate-200/80 rounded-2xl px-3 py-1.5 shadow-2xs">
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
                          <button
                            type="button"
                            onClick={() =>
                              setReplyingTo(
                                replyingTo?.noteId === note.id && replyingTo.author === note.author
                                  ? null
                                  : { noteId: note.id, author: note.author }
                              )
                            }
                            className="hover:text-amber-700 flex items-center gap-0.5"
                          >
                            <CornerDownRight className="w-2.5 h-2.5" />
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

                    {/* Nested Replies */}
                    {replies.length > 0 && !isCollapsed && (
                      <div className="ml-7 pl-2.5 border-l-2 border-amber-200 space-y-1.5">
                        {replies.map((rep) => (
                          <div key={rep.id} className="flex items-start gap-1.5">
                            <img
                              src={rep.authorAvatar}
                              alt={rep.author}
                              className="w-5 h-5 rounded-full object-cover mt-0.5 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl px-2.5 py-1">
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
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input Box */}
                    {replyingTo?.noteId === note.id && (
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
                          className="flex-1 bg-white border border-amber-300 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none"
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

          {/* New Comment Input */}
          <form onSubmit={handlePostComment} className="flex items-center gap-1.5 pt-1">
            <img
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
        </div>
      )}
    </div>
  );
};
