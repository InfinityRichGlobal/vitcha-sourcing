import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Loader2, AlertCircle, Plus } from 'lucide-react';
import { uploadImageFile as compressImageFile } from '../utils/mediaStorage';

export interface PhotoItem {
  id: string;
  previewUrl: string;
  uploadedUrl?: string;
  status: 'uploading' | 'done' | 'error';
  errorMessage?: string;
}

interface UploadablePhotoGridProps {
  label: string;
  emptyText?: string;
  urls: string[];
  onChange: (urls: string[]) => void;
  recordType: 'locations' | 'suppliers' | 'drink_stores' | 'misc';
  recordTitle: string;
  recordId?: string;
  maxDimension?: number;
  quality?: number;
  onUploadingChange?: (uploading: boolean) => void;
  onBeginUpload?: () => void;
  onEndUpload?: () => void;
  disabled?: boolean;
}

export const UploadablePhotoGrid: React.FC<UploadablePhotoGridProps> = ({
  label,
  emptyText = 'ยังไม่มีรูปภาพ',
  urls,
  onChange,
  recordType,
  recordTitle,
  recordId,
  maxDimension = 1600,
  quality = 0.82,
  onUploadingChange,
  onBeginUpload,
  onEndUpload,
  disabled = false,
}) => {
  const [items, setItems] = useState<PhotoItem[]>(() =>
    urls.map((u) => ({
      id: u,
      previewUrl: u,
      uploadedUrl: u,
      status: 'done',
    }))
  );

  // Keep items in sync if parent updates urls from an external reset/load
  const prevUrlsRef = useRef<string[]>(urls);
  useEffect(() => {
    if (JSON.stringify(prevUrlsRef.current) !== JSON.stringify(urls)) {
      prevUrlsRef.current = urls;
      setItems((current) => {
        // Keep in-flight uploads that haven't finished yet
        const inFlight = current.filter((i) => i.status === 'uploading');
        const urlItems: PhotoItem[] = urls.map((u) => {
          const existing = current.find((i) => i.uploadedUrl === u || i.previewUrl === u);
          return (
            existing || {
              id: u,
              previewUrl: u,
              uploadedUrl: u,
              status: 'done',
            }
          );
        });
        return [...urlItems, ...inFlight];
      });
    }
  }, [urls]);

  // Notify parent of upload state
  useEffect(() => {
    const isAnyUploading = items.some((i) => i.status === 'uploading');
    onUploadingChange?.(isAnyUploading);
  }, [items, onUploadingChange]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const fileList = Array.from(e.target.files);

    // Notify parent immediately and synchronously
    onBeginUpload?.();
    let remaining = fileList.length;
    const checkDone = () => {
      remaining--;
      if (remaining <= 0) {
        onEndUpload?.();
      }
    };

    const newPhotoItems: PhotoItem[] = fileList.map((file) => {
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const blobUrl = URL.createObjectURL(file);
      return {
        id: tempId,
        previewUrl: blobUrl,
        status: 'uploading' as const,
      };
    });

    // Instantly show local thumbnails on screen!
    setItems((prev) => [...prev, ...newPhotoItems]);

    // Upload in parallel
    fileList.forEach((file, idx) => {
      const targetItem = newPhotoItems[idx];
      compressImageFile(file, maxDimension, quality, {
        recordType,
        recordTitle: recordTitle || 'รายการใหม่',
        recordId,
      })
        .then((uploadedUrl) => {
          setItems((current) => {
            const found = current.find((i) => i.id === targetItem.id);
            if (!found) {
              // Was deleted by user while uploading
              return current;
            }
            const updated = current.map((i) =>
              i.id === targetItem.id
                ? { ...i, status: 'done' as const, uploadedUrl }
                : i
            );
            const completed = updated
              .filter((i) => i.status === 'done' && i.uploadedUrl)
              .map((i) => i.uploadedUrl!);
            prevUrlsRef.current = completed;
            onChange(completed);
            return updated;
          });
        })
        .catch((err) => {
          setItems((current) =>
            current.map((i) =>
              i.id === targetItem.id
                ? {
                    ...i,
                    status: 'error' as const,
                    errorMessage: err?.message || 'อัปโหลดไม่สำเร็จ',
                  }
                : i
            )
          );
        })
        .finally(() => {
          checkDone();
        });
    });

    e.target.value = '';
  };

  const handleDelete = (id: string) => {
    setItems((current) => {
      const target = current.find((i) => i.id === id);
      if (target?.previewUrl?.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(target.previewUrl);
        } catch {}
      }
      const remaining = current.filter((i) => i.id !== id);
      const completed = remaining
        .filter((i) => i.status === 'done' && i.uploadedUrl)
        .map((i) => i.uploadedUrl!);
      prevUrlsRef.current = completed;
      onChange(completed);
      return remaining;
    });
  };

  return (
    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
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
          <span>เพิ่มรูป</span>
          <input
            type="file"
            accept="image/*"
            multiple
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
            className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-sm flex-shrink-0"
          >
            <img
              src={item.previewUrl}
              alt="preview"
              className="w-full h-full object-cover"
            />

            {/* Status Overlay */}
            {item.status === 'uploading' && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-1 z-10">
                <Loader2 className="w-4 h-4 animate-spin text-white mb-0.5" />
                <span className="text-[8px] font-medium leading-tight">กำลังอัป...</span>
              </div>
            )}

            {item.status === 'error' && (
              <div
                className="absolute inset-0 bg-rose-900/80 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-1 text-center z-10"
                title={item.errorMessage}
              >
                <AlertCircle className="w-4 h-4 text-rose-300 mb-0.5" />
                <span className="text-[8px] font-medium leading-tight">ล้มเหลว</span>
              </div>
            )}

            {/* Delete button (Always available even while uploading) */}
            <button
              type="button"
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
    </div>
  );
};
