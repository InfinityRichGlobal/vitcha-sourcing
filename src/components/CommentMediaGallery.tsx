import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { CommentMedia } from '../types';
import { MediaImage } from './MediaImage';
import { normalizeMediaUrl } from '../utils/mediaUrl';

export function CommentMediaGallery({ media }: { media: CommentMedia[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null && media.length > 0;
  const current = Math.min(index ?? 0, media.length - 1);
  const move = (step: number) => setIndex(previous => previous === null ? null : (previous + step + media.length) % media.length);
  useEffect(() => {
    const element = dialog.current;
    if (!open) { element?.close(); return; }
    element?.showModal();
    return () => element?.close();
  }, [open]);
  if (!media.length) return null;
  return <div className="mt-2 space-y-1" data-testid="comment-media-gallery">
    <div className="flex flex-wrap gap-2">
      {media.map((item, position) => <button key={item.id} type="button" aria-label={`เปิด${item.type === 'video' ? 'วิดีโอ' : 'รูปภาพ'}แนบ ${position + 1}`} onClick={e => { e.stopPropagation(); setIndex(position); }} className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
        {item.type === 'image' ? <MediaImage loading="lazy" src={item.url} alt="" className="w-full h-full object-cover" /> : <><video src={`${normalizeMediaUrl(item.url)}#t=0.001`} muted playsInline preload="metadata" className="w-full h-full object-cover pointer-events-none" /><span className="absolute inset-0 grid place-items-center bg-black/20 text-white"><Play size={24} fill="currentColor" /></span></>}
      </button>)}
    </div>
    <p className="text-[10px] text-slate-500">{media.length} ไฟล์ · แตะดูและปัดซ้าย–ขวา</p>
    <dialog ref={dialog} aria-label="รูปและวิดีโอในความคิดเห็น" onClose={() => setIndex(null)} onCancel={() => setIndex(null)} onClick={e => { e.stopPropagation(); if (e.target === e.currentTarget) setIndex(null); }} onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); move(e.key === 'ArrowLeft' ? -1 : 1); } }} className="m-auto w-[calc(100%-1rem)] max-w-5xl max-h-[95dvh] rounded-2xl border-0 bg-slate-950 p-3 text-white shadow-2xl backdrop:bg-black/80">
      {open && <>
        <div className="flex items-center justify-between gap-2 pb-3"><h2 className="font-bold text-sm">รูปและวิดีโอในความคิดเห็น</h2><button type="button" autoFocus aria-label="ปิดสื่อความคิดเห็น" onClick={() => setIndex(null)} className="p-3 rounded-xl bg-white/15"><X size={20} /></button></div>
        <div data-testid="comment-media-swipe" className="touch-pan-y" onTouchStart={e => { touch.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null; }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={e => {
          const start = touch.current; touch.current = null;
          if (!start || e.touches.length || !e.changedTouches.length) return;
          const dx = e.changedTouches[0].clientX - start.x, dy = e.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
        }}>
          {media[current].type === 'video' ? <video key={media[current].url} src={normalizeMediaUrl(media[current].url)} controls playsInline preload="metadata" className="h-[60dvh] w-full object-contain" /> : <MediaImage src={media[current].url} alt={`รูปแนบ ${current + 1}`} draggable={false} className="h-[60dvh] w-full object-contain" />}
        </div>
        <div className="flex items-center justify-between pt-3"><button type="button" aria-label="สื่อก่อนหน้า" disabled={media.length < 2} onClick={() => move(-1)} className="p-3 rounded-xl bg-white/15 disabled:opacity-30"><ChevronLeft /></button><span role="status">{current + 1} / {media.length}</span><button type="button" aria-label="สื่อถัดไป" disabled={media.length < 2} onClick={() => move(1)} className="p-3 rounded-xl bg-white/15 disabled:opacity-30"><ChevronRight /></button></div>
      </>}
    </dialog>
  </div>;
}
