import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export function StorePhotoGallery({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null && photos.length > 0;
  const current = Math.min(index ?? 0, photos.length - 1);
  const move = (step: number) => setIndex(previous => previous === null ? null : (previous + step + photos.length) % photos.length);

  useEffect(() => {
    const element = dialog.current;
    if (!open) { element?.close(); return; }
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; element?.close(); };
  }, [open]);

  return <div className="space-y-1.5">
    <span className="text-[11px] font-bold text-slate-400">ภาพหน้าร้าน ({photos.length})</span>
    <div className="flex gap-2.5 overflow-x-auto pb-1">
      {photos.map((photo, position) => <button key={position} type="button" aria-label={`เปิดภาพหน้าร้าน ${position + 1}`} onClick={() => setIndex(position)} className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs hover:opacity-80">
        <img src={photo} alt="" className="w-full h-full object-cover" />
      </button>)}
    </div>
    <dialog ref={dialog} aria-label="รูปภาพหน้าร้าน" onClose={() => setIndex(null)} onCancel={() => setIndex(null)}
      onClick={event => { if (event.target === event.currentTarget) setIndex(null); }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
      className="m-auto w-[calc(100%-1rem)] max-w-5xl max-h-[95dvh] rounded-2xl border-0 bg-slate-950 p-3 text-white shadow-2xl backdrop:bg-black/80">
      {open && <>
        <div className="flex items-center justify-between gap-3 pb-3">
          <h2 className="font-bold">รูปภาพหน้าร้าน</h2>
          <button type="button" autoFocus aria-label="ปิดภาพ" onClick={() => setIndex(null)} className="flex items-center gap-1 rounded-xl bg-white/15 px-3 py-3"><X className="h-5 w-5" />ปิด</button>
        </div>
        <div data-testid="store-photo-swipe" className="touch-pan-y" onTouchStart={event => {
          touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
        }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => {
          const start = touch.current; touch.current = null;
          if (!start || event.touches.length || !event.changedTouches.length) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
        }}>
          <img src={photos[current]} alt={`ภาพหน้าร้าน ${current + 1}`} className="h-[60dvh] w-full object-contain" draggable={false} />
        </div>
        <div className="flex items-center justify-between gap-3 pt-3">
          <button type="button" aria-label="ภาพก่อนหน้า" disabled={photos.length < 2} onClick={() => move(-1)} className="rounded-xl bg-white/15 p-3 disabled:opacity-30"><ChevronLeft /></button>
          <span role="status">{current + 1} / {photos.length}</span>
          <button type="button" aria-label="ภาพถัดไป" disabled={photos.length < 2} onClick={() => move(1)} className="rounded-xl bg-white/15 p-3 disabled:opacity-30"><ChevronRight /></button>
        </div>
      </>}
    </dialog>
  </div>;
}
