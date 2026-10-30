import React, { useRef, useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  File,
  Paperclip,
  Trash2,
  ExternalLink,
  UploadCloud,
  Loader2,
} from 'lucide-react';
import { AttachedFile } from '../types';
import { uploadMediaToServer } from '../services/api';

export interface AttachedFilesSectionProps {
  files?: AttachedFile[];
  onChange?: (files: AttachedFile[]) => void;
  onBusyChange?: (busy: boolean) => void;
  readOnly?: boolean;
  recordType?: 'suppliers' | 'drink_stores' | 'locations' | 'misc';
  recordTitle?: string;
  recordId?: string;
  title?: string;
  subtitle?: string;
  themeColor?: 'emerald' | 'amber' | 'sky' | 'indigo';
}

export function openFileSafely(url: string, name?: string) {
  if (url.startsWith('data:')) {
    try {
      const arr = url.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
      return;
    } catch {}
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function getFileCategoryInfo(name: string, mimeType?: string) {
  const ext = (name.split('.').pop() || '').toLowerCase();
  const mime = (mimeType || '').toLowerCase();

  if (ext === 'pdf' || mime.includes('pdf')) {
    return {
      type: 'pdf',
      label: 'PDF',
      colorClasses: 'bg-rose-50 border-rose-200 text-rose-600',
      badgeClass: 'bg-rose-600 text-white',
      icon: FileText,
    };
  }
  if (
    ['xls', 'xlsx', 'csv'].includes(ext) ||
    mime.includes('spreadsheet') ||
    mime.includes('excel') ||
    mime.includes('csv')
  ) {
    return {
      type: 'sheet',
      label: 'EXCEL',
      colorClasses: 'bg-emerald-50 border-emerald-200 text-emerald-600',
      badgeClass: 'bg-emerald-600 text-white',
      icon: FileSpreadsheet,
    };
  }
  if (['doc', 'docx'].includes(ext) || mime.includes('word') || mime.includes('officedocument')) {
    return {
      type: 'doc',
      label: 'WORD',
      colorClasses: 'bg-sky-50 border-sky-200 text-sky-600',
      badgeClass: 'bg-sky-600 text-white',
      icon: FileText,
    };
  }
  if (
    ['zip', 'rar', '7z', 'tar', 'gz'].includes(ext) ||
    mime.includes('zip') ||
    mime.includes('compressed')
  ) {
    return {
      type: 'archive',
      label: 'ZIP',
      colorClasses: 'bg-amber-50 border-amber-200 text-amber-600',
      badgeClass: 'bg-amber-600 text-white',
      icon: FileArchive,
    };
  }
  return {
    type: 'file',
    label: ext.toUpperCase() || 'FILE',
    colorClasses: 'bg-slate-50 border-slate-200 text-slate-600',
    badgeClass: 'bg-slate-700 text-white',
    icon: File,
  };
}

export function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return 'ไม่ระบุขนาด';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const AttachedFilesSection: React.FC<AttachedFilesSectionProps> = ({
  files = [],
  onChange,
  onBusyChange,
  readOnly = false,
  recordType = 'misc',
  recordTitle = '',
  recordId = '',
  title = 'เอกสารและไฟล์แนบเพิ่มเติม (PDF, ใบเสนอราคา, สัญญา, สเปก)',
  subtitle = 'อัปโหลดไฟล์เก็บเข้า Google Drive และสามารถกดเปิดดูหรือสแกนผ่าน QR Code ใน PDF ได้',
  themeColor = 'sky',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const themeRing =
    themeColor === 'emerald'
      ? 'border-emerald-500'
      : themeColor === 'amber'
      ? 'border-amber-500'
      : themeColor === 'indigo'
      ? 'border-indigo-500'
      : 'border-sky-500';

  const themeText =
    themeColor === 'emerald'
      ? 'text-emerald-700'
      : themeColor === 'amber'
      ? 'text-amber-700'
      : themeColor === 'indigo'
      ? 'text-indigo-700'
      : 'text-sky-700';

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    setIsUploading(true);
    onBusyChange?.(true);
    const updated = [...files];

    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      setUploadProgress(`กำลังอัปโหลด (${i + 1}/${selected.length}): ${file.name}`);
      try {
        const url = await uploadMediaToServer(file, {
          recordType,
          recordTitle,
          recordId,
        });

        updated.push({
          id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: file.name,
          size: file.size,
          mimeType: file.type || 'application/octet-stream',
          url,
          uploadedAt: new Date().toISOString(),
        });
      } catch (err: any) {
        alert(`อัปโหลดไฟล์ "${file.name}" ไม่สำเร็จ: ${err?.message || err}`);
      }
    }

    setIsUploading(false);
    onBusyChange?.(false);
    setUploadProgress(null);
    if (onChange) onChange(updated);
    e.target.value = '';
  };

  const handleRemove = (id: string) => {
    if (onChange) {
      onChange(files.filter((f) => f.id !== id));
    }
  };

  if (readOnly && files.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50/90 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Paperclip className={`w-3.5 h-3.5 ${themeText}`} />
            <span>
              {title} {files.length > 0 && `(${files.length})`}
            </span>
          </span>
          {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        {!readOnly && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-2xs hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              themeColor === 'emerald'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : themeColor === 'amber'
                ? 'bg-amber-600 hover:bg-amber-700'
                : themeColor === 'indigo'
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5" />
            )}
            <span>{isUploading ? 'กำลังอัปโหลด...' : '+ อัปโหลดไฟล์'}</span>
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      {!readOnly && (
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.zip,.rar,.7z,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/*"
          onChange={handleFilesSelected}
          className="hidden"
        />
      )}

      {/* Uploading progress indicator */}
      {isUploading && (
        <div className="p-3 bg-white rounded-xl border border-sky-200 flex items-center gap-2.5 text-xs text-sky-800 animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin text-sky-600 shrink-0" />
          <span className="font-semibold">{uploadProgress || 'กำลังอัปโหลดไฟล์ไปยังระบบ...'}</span>
        </div>
      )}

      {/* Files List / Grid */}
      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {files.map((file) => {
            const info = getFileCategoryInfo(file.name, file.mimeType);
            const Icon = info.icon;
            return (
              <div
                key={file.id}
                className="bg-white rounded-xl border border-slate-200/90 p-2.5 flex items-center justify-between gap-2.5 shadow-2xs hover:border-slate-300 transition-all group"
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
                    <p
                      className="font-bold text-xs text-slate-800 truncate"
                      title={file.name}
                    >
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

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (file.url.startsWith('data:')) {
                        e.preventDefault();
                        openFileSafely(file.url, file.name);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-700 border border-slate-200 hover:border-sky-200 transition-colors inline-flex items-center gap-1 text-[11px] font-bold"
                    title="เปิดไฟล์ดูบนเบราว์เซอร์ / Google Drive"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">เปิดดู</span>
                  </a>

                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => handleRemove(file.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="ลบไฟล์แนบนี้"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !readOnly && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-200 hover:${themeRing} rounded-2xl cursor-pointer transition-colors shadow-2xs group text-center`}
          >
            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-sky-600 mb-1 transition-colors" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">
              แตะเพื่ออัปโหลดไฟล์เอกสาร (PDF, ใบเสนอราคา, สเปก, สัญญา)
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              รองรับ PDF, Word, Excel, รูปภาพ, ไฟล์ Zip · ลิงก์ตรงเข้า Google Drive
            </span>
          </div>
        )
      )}
    </div>
  );
};
