import { MediaImage } from './MediaImage';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Camera, X, Loader2, AlertCircle, Plus, CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { uploadImageFile } from '../utils/mediaStorage';

export interface PhotoItem {
  id: string;
  previewUrl: string;
  uploadedUrl?: string;
  status: 'queued' | 'uploading' | 'done' | 'error';
  file?: File;
  fileName?: string;
  isNew?: boolean;
  errorMessage?: string;
}

interface UploadablePhotoGridProps {
  label: string;
  emptyText?: string;
  urls: string[];
  onChange: (urls: string[]) => void;
  recordType: 'locations' | 'suppliers' | 'drink_stores' | 'lead_lab' | 'franchise_stores' | 'misc';
  recordTitle: string;
  recordId?: string;
  onUploadingChange?: (uploading: boolean) => void;
  onBeginUpload?: () => void;
  onEndUpload?: () => void;
  disabled?: boolean;
  single?: boolean;
}

export const UploadablePhotoGrid: React.FC<UploadablePhotoGridProps> = ({
  label,
  emptyText = 'ยังไม่มีรูปภาพ',
  urls,
  onChange,
  recordType,
  recordTitle,
  recordId,
  onUploadingChange,
  onBeginUpload,
  onEndUpload,
  disabled = false,
  single = false,
}) => {
  const { notifySuccess } = useApp();
  const [items, setItems] = useState<PhotoItem[]>(() =>
    urls.map(url => ({ id: url, previewUrl: url, uploadedUrl: url, status: 'done' }))
  );
  const itemsRef = useRef(items);
  const callbacks = useRef({ onChange, onBeginUpload, onEndUpload, onUploadingChange, notifySuccess });
  callbacks.current = { onChange, onBeginUpload, onEndUpload, onUploadingChange, notifySuccess };
  const mounted = useRef(true);
  const unresolved = useRef(false);
  const active = useRef(new Map<string, AbortController>());
  const localUrls = useRef(new Set<string>());
  const prevUrlsRef = useRef(urls);
  const succeeded = useRef(0);
  const [online, setOnline] = useState(navigator.onLine);
  const [failedPreviews, setFailedPreviews] = useState<Record<string, boolean>>({});
  const [previewAttempts, setPreviewAttempts] = useState<Record<string, number>>({});

  // Update refs synchronously: completion, deletion and rapid retry clicks must
  // always see the same queue, without side effects in React state updaters.
  const updateItems = (next: PhotoItem[], publish = false) => {
    itemsRef.current = next;
    setItems(next);
    const pending = next.some(item => item.status !== 'done');
    if (pending !== unresolved.current) {
      unresolved.current = pending;
      if (pending) callbacks.current.onBeginUpload?.();
      else callbacks.current.onEndUpload?.();
    }
    callbacks.current.onUploadingChange?.(pending);
    if (publish) {
      const completed = next.flatMap(item => item.status === 'done' && item.uploadedUrl ? [item.uploadedUrl] : []);
      prevUrlsRef.current = completed;
      callbacks.current.onChange(completed);
    }
  };

  useEffect(() => {
    mounted.current = true;
    const connected = () => setOnline(navigator.onLine);
    window.addEventListener('online', connected);
    window.addEventListener('offline', connected);
    return () => {
      mounted.current = false;
      window.removeEventListener('online', connected);
      window.removeEventListener('offline', connected);
      for (const controller of active.current.values()) controller.abort();
      active.current.clear();
      for (const url of localUrls.current) URL.revokeObjectURL(url);
      localUrls.current.clear();
      if (unresolved.current) {
        unresolved.current = false;
        callbacks.current.onEndUpload?.();
      }
      callbacks.current.onUploadingChange?.(false);
    };
  }, []);

  useEffect(() => {
    const visible = new Set(items.map(item => item.previewUrl));
    for (const url of localUrls.current) if (!visible.has(url)) {
      URL.revokeObjectURL(url); localUrls.current.delete(url);
    }
  }, [items]);

  useLayoutEffect(() => {
    if (JSON.stringify(prevUrlsRef.current) === JSON.stringify(urls)) return;
    prevUrlsRef.current = urls;
    // A parent refresh must retain failed files as well as queued/active ones.
    const current = itemsRef.current.filter(item => item.status !== 'done' || urls.includes(item.uploadedUrl!));
    const known = new Set(current.map(item => item.uploadedUrl));
    updateItems([...current, ...urls.filter(url => !known.has(url)).map(url => ({
      id: url, previewUrl: url, uploadedUrl: url, status: 'done' as const,
    }))]);
  }, [urls]);

  const pump = () => {
    if (!mounted.current) return;
    // Keep six transfers moving continuously without launching an entire
    // album at once. Originals are never resized or re-encoded.
    while (navigator.onLine && !disabled && active.current.size < 6) {
      const item = itemsRef.current.find(photo => photo.status === 'queued');
      if (!item?.file) break;
      const controller = new AbortController();
      active.current.set(item.id, controller);
      updateItems(itemsRef.current.map(photo => photo.id === item.id ? { ...photo, status: 'uploading' } : photo));
      void uploadImageFile(item.file, {
        recordType, recordTitle: recordTitle || 'รายการใหม่', recordId, signal: controller.signal,
      }).then(uploadedUrl => {
        if (!mounted.current || controller.signal.aborted || !itemsRef.current.some(photo => photo.id === item.id)) return;
        succeeded.current++;
        updateItems(itemsRef.current.map(photo => photo.id === item.id
          ? { ...photo, status: 'done', uploadedUrl, file: undefined, errorMessage: undefined }
          : photo), true);
      }).catch(error => {
        if (!mounted.current || controller.signal.aborted) return;
        updateItems(itemsRef.current.map(photo => photo.id === item.id ? {
          ...photo, status: 'error', errorMessage: error?.message || 'อัปโหลดไม่สำเร็จ',
        } : photo));
      }).finally(() => {
        active.current.delete(item.id);
        if (mounted.current) pumpRef.current();
      });
    }
    if (!active.current.size && !itemsRef.current.some(photo => photo.status === 'queued') && succeeded.current) {
      const count = succeeded.current; succeeded.current = 0;
      callbacks.current.notifySuccess(`อัปโหลดรูปเรียบร้อยแล้ว ${count} รูป`,
        itemsRef.current.some(photo => photo.status === 'error')
          ? 'ยังมีรูปไม่สำเร็จ กดลองใหม่ที่รูปหรือทั้งชุดได้'
          : 'กดบันทึกเพื่อเก็บรูปกับรายการนี้');
    }
  };
  const pumpRef = useRef(pump); pumpRef.current = pump;
  useEffect(() => { pumpRef.current(); }, [online, disabled]);

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    const files = single ? selected.slice(0, 1) : selected;
    event.target.value = '';
    if (!files.length || disabled) return;
    const photos: PhotoItem[] = files.map(file => {
      const previewUrl = URL.createObjectURL(file); localUrls.current.add(previewUrl);
      return { id: crypto.randomUUID(), file, fileName: file.name, isNew: true, previewUrl, status: 'queued' };
    });
    if (single) for (const controller of active.current.values()) controller.abort();
    updateItems(single ? photos : [...itemsRef.current, ...photos], single);
    pumpRef.current();
  };

  const retry = (id?: string) => {
    if (disabled) return;
    updateItems(itemsRef.current.map(item => item.status === 'error' && item.file && (!id || item.id === id)
      ? { ...item, status: 'queued', errorMessage: undefined } : item));
    pumpRef.current();
  };

  const handleDelete = (id: string) => {
    if (disabled) return;
    active.current.get(id)?.abort();
    updateItems(itemsRef.current.filter(item => item.id !== id), true);
    pumpRef.current();
  };
  const failedCount = items.filter(item => item.status === 'error').length;
  const waitingCount = items.filter(item => item.status === 'queued' || item.status === 'uploading').length;
  const uploadedCount = items.filter(item => item.isNew && item.status === 'done').length;

  return (
    <div role="group" aria-label={label} data-testid="photo-upload-grid" className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-slate-500" />
          <span>{label}</span>
          {items.length > 0 && (
            <span className="text-[10px] font-normal text-slate-400">
              ({items.length} รูป)
            </span>
          )}
        </span>
        <label
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer ${
            disabled ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{single && items.length ? 'เปลี่ยนรูป' : 'เพิ่มรูป'}</span>
          <input
            type="file"
            accept="image/*"
            multiple={!single}
            disabled={disabled}
            className="hidden"
            onChange={handleFiles}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[56px] items-center">
        {items.map((item) => (
          <div
            key={item.id}
            data-testid="photo-upload-item"
            data-status={item.status}
            title={item.fileName}
            className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-sm flex-shrink-0"
          >
            <MediaImage
              key={`${item.previewUrl}-${previewAttempts[item.id] || 0}`}
              src={item.previewUrl}
              loading="lazy"
              decoding="async"
              onError={() => setFailedPreviews(previous => ({ ...previous, [item.id]: true }))}
              onLoad={() => setFailedPreviews(previous => ({ ...previous, [item.id]: false }))}
              alt={item.fileName || "preview"}
              className="w-full h-full object-cover"
            />

            {failedPreviews[item.id] && item.status === 'done' && <button type="button"
              className="absolute inset-x-0 bottom-0 bg-white/95 text-[9px] text-rose-700 p-1"
              onClick={() => { setFailedPreviews(previous => ({ ...previous, [item.id]: false })); setPreviewAttempts(previous => ({ ...previous, [item.id]: (previous[item.id] || 0) + 1 })); }}>
              โหลดรูปอีกครั้ง
            </button>}
            {/* Status Overlay */}
            {(item.status === 'uploading' || item.status === 'queued') && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-1 z-10">
                <Loader2 className="w-4 h-4 animate-spin text-white mb-0.5" />
                <span className="text-[8px] font-medium leading-tight">{item.status === 'queued' ? (online ? 'รอคิว' : 'รอเน็ต') : 'กำลังอัป...'}</span>
              </div>
            )}

            {item.status === 'error' && (
              <button type="button" disabled={disabled} aria-label={`ลองอัปโหลดใหม่ ${item.fileName || "รูปภาพ"}`} onClick={() => retry(item.id)}
                className="absolute inset-0 bg-rose-900/80 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-1 text-center z-10"
                title={item.errorMessage}
              >
                <RotateCcw className="w-4 h-4 text-rose-300 mb-0.5" />
                <span className="text-[10px] font-medium leading-tight">ลองใหม่</span>
              </button>
            )}

            {/* Delete button (Always available even while uploading) */}
            <button
              type="button"
              disabled={disabled}
              aria-label={`ลบรูป ${item.fileName || "นี้"}`}
              onClick={() => handleDelete(item.id)}
              className="absolute top-1 right-1 w-5 h-5 bg-black/75 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors z-20"
              title="ลบรูปนี้"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-[11px] text-slate-400 py-2 italic flex items-center gap-1.5">
            <span>{emptyText}</span>
          </div>
        )}
      </div>
      {waitingCount > 0 && <p role="status" className="text-xs text-slate-600">{online ? 'กำลังทยอยอัปโหลด' : 'รออินเทอร์เน็ตกลับมา'} · เหลือ {waitingCount} รูป</p>}
      {failedCount > 0 && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-2 space-y-2">
        <p className="flex items-center gap-1 text-xs text-rose-800"><AlertCircle size={14} />อัปโหลดไม่สำเร็จ {failedCount} รูป · รูปยังอยู่ กดลองใหม่ได้</p>
        <button type="button" disabled={disabled} onClick={() => retry()} className="inline-flex items-center gap-1 rounded-lg bg-white border border-rose-300 px-3 py-2 text-xs font-bold text-rose-800">
          <RotateCcw size={14} />ลองใหม่ทั้งหมด ({failedCount} รูป)
        </button>
        <p className="text-[11px] text-rose-700">ลองใหม่หรือลบรูปที่ไม่ต้องการก่อนบันทึก · อย่าเพิ่งปิดหน้านี้</p>
      </div>}
      {uploadedCount > 0 && <p role="status" className="flex items-center gap-1.5 text-xs text-emerald-700"><CheckCircle2 size={14} />อัปโหลดรูปแล้ว {uploadedCount} รูป · กดบันทึกเพื่อเก็บกับรายการ</p>}
    </div>
  );
};
