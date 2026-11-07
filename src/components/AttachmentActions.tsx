import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Download, FileText, Loader2 } from 'lucide-react';
import { AttachedFile } from '../types';
import { driveImageId, normalizeMediaUrl, originalImageUrl } from '../utils/mediaUrl';
import { getRenderServerUrl } from '../services/api';
const PdfCanvasViewer = lazy(() => import('./PdfCanvasViewer'));

function embeddedBlob(url: string): string {
  const [header, content] = url.split(',');
  const mime = header.match(/^data:([^;]+);base64$/)?.[1];
  if (!mime || !content) throw new Error('อ่านไฟล์ที่แนบไว้ไม่ได้');
  const binary = atob(content);
  return URL.createObjectURL(new Blob([Uint8Array.from(binary, c => c.charCodeAt(0))], { type: mime }));
}

function fileUrl(file: AttachedFile): string {
  const value = normalizeMediaUrl(file.url);
  if (value.startsWith('data:')) return value;
  const url = new URL(value, window.location.href);
  if (!['http:', 'https:', 'blob:'].includes(url.protocol)) throw new Error('ลิงก์ไฟล์ไม่ถูกต้อง');
  return url.href;
}

async function downloadFile(file: AttachedFile) {
  let url = fileUrl(file);
  let revoke = false;
  if (url.startsWith('data:')) { url = embeddedBlob(url); revoke = true; }
  else {
    const parsed = new URL(url);
    if (parsed.origin === new URL(getRenderServerUrl(), window.location.href).origin && /^\/(media|uploads)\//.test(parsed.pathname)) {
      parsed.searchParams.set('download', '1'); parsed.searchParams.set('filename', file.name); url = parsed.href;
    } else {
      const driveId = driveImageId(url);
      if (driveId) url = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(driveId)}`;
      else if (parsed.protocol !== 'blob:') {
        const response = await fetch(url, { signal: AbortSignal.timeout(120000) });
        if (!response.ok) throw new Error('ดาวน์โหลดไม่สำเร็จ กรุณาลองอีกครั้ง');
        url = URL.createObjectURL(await response.blob()); revoke = true;
      }
    }
  }
  const link = document.createElement('a');
  link.href = url; link.download = file.name; link.target = '_blank'; link.rel = 'noopener noreferrer';
  document.body.append(link); link.click(); link.remove();
  if (revoke) window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function PdfPreview({ file, onClose, onDownload, downloading, error }: { file: AttachedFile; onClose: () => void; onDownload: () => void; downloading: boolean; error: string | null }) {
  const backRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<() => void>(onClose);
  const source = useMemo(() => {
    try {
      const url = fileUrl(file);
      if (url.startsWith('data:')) {
        if (!/^data:application\/pdf;base64,/i.test(url)) return { url: '', blob: false };
        return { url: embeddedBlob(url), blob: true };
      }
      const id = driveImageId(url);
      return { url: id ? `https://drive.google.com/file/d/${id}/preview` : url, blob: false };
    } catch { return { url: '', blob: false }; }
  }, [file.url]);
  useEffect(() => () => { if (source.blob) URL.revokeObjectURL(source.url); }, [source]);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousState = window.history.state;
    const marker = `attachment-${Date.now()}-${Math.random()}`;
    window.history.pushState({ ...previousState, attachmentPreview: marker }, '');
    let closing = false;
    closeRef.current = () => {
      if (closing) return;
      closing = true;
      if (window.history.state?.attachmentPreview === marker) window.history.back();
      else onClose();
    };
    const back = () => { if (window.history.state?.attachmentPreview !== marker) onClose(); };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeRef.current(); }
    };
    window.addEventListener('popstate', back);
    window.addEventListener('keydown', key, true);
    backRef.current?.focus();
    return () => {
      window.removeEventListener('popstate', back); window.removeEventListener('keydown', key, true);
      if (window.history.state?.attachmentPreview === marker) window.history.replaceState(previousState, '');
      previousFocus?.focus();
    };
  }, [onClose]);
  return createPortal(<div role="dialog" aria-modal="true" aria-label={`ดูเอกสาร ${file.name}`} className="fixed inset-0 z-[500] flex h-[100dvh] flex-col bg-slate-100">
    <header className="shrink-0 border-b border-slate-200 bg-white px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <button ref={backRef} type="button" onClick={() => closeRef.current()} className="inline-flex min-h-11 items-center gap-1 rounded-xl bg-slate-900 px-3 text-sm font-bold text-white"><ArrowLeft className="h-4 w-4" />กลับหน้ารายละเอียด</button>
        <button type="button" onClick={onDownload} disabled={downloading} className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-sm font-bold text-emerald-800">{downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}ดาวน์โหลด</button>
      </div>
      <p className="mt-2 truncate text-xs font-semibold text-slate-600" title={file.name}>{file.name}</p>
      <p className="mt-1 text-[11px] text-slate-500">อ่านเอกสารในหน้านี้ หรือดาวน์โหลดไฟล์ต้นฉบับเก็บไว้ได้</p>
      {error && <p role="alert" className="mt-2 text-xs text-rose-700">{error}</p>}
    </header>
    <div className="relative min-h-0 flex-1 overflow-auto pb-[env(safe-area-inset-bottom)]">
      {source.url ? source.url.startsWith('https://drive.google.com/file/') ? <iframe src={source.url} title={`PDF — ${file.name}`} className="h-full min-h-[300px] w-full border-0 bg-white" referrerPolicy="no-referrer" /> : <Suspense fallback={<p role="status" className="p-6 text-center">กำลังเปิด PDF…</p>}><PdfCanvasViewer url={source.url} /></Suspense> : <p role="alert" className="p-6">อ่านลิงก์ PDF ไม่ได้ กรุณาตรวจสอบไฟล์แนบ</p>}
    </div>
  </div>, document.body);
}

export function AttachmentActions({ file }: { file: AttachedFile }) {
  const [preview, setPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const close = useCallback(() => setPreview(false), []);
  const download = async () => {
    if (downloading) return;
    setDownloading(true); setError(null);
    try { await downloadFile(file); } catch (e) { setError(e instanceof Error ? e.message : 'ดาวน์โหลดไม่สำเร็จ'); }
    finally { setDownloading(false); }
  };
  const open = () => {
    setError(null);
    if (file.mimeType === 'application/pdf' || /\.pdf$/i.test(file.name)) { setPreview(true); return; }
    try {
      const value = fileUrl(file);
      const url = value.startsWith('data:') ? embeddedBlob(value) : file.mimeType?.startsWith('image/') ? originalImageUrl(value) : value;
      window.open(url, '_blank', 'noopener,noreferrer');
      if (value.startsWith('data:')) window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch { setError('เปิดไฟล์ไม่สำเร็จ กรุณาตรวจสอบลิงก์'); }
  };
  return <div className="shrink-0">
    <div className="flex items-center gap-1">
      <button type="button" onClick={open} aria-label={`เปิดดู ${file.name}`} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-sky-200 bg-sky-50 px-2 text-[11px] font-bold text-sky-800"><FileText className="h-3.5 w-3.5" />เปิดดู</button>
      <button type="button" onClick={download} disabled={downloading} aria-label={`ดาวน์โหลด ${file.name}`} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-bold text-slate-700">{downloading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}ดาวน์โหลด</button>
    </div>
    {error && !preview && <p role="alert" className="mt-1 max-w-48 text-[10px] text-rose-700">{error}</p>}
    {preview && <PdfPreview file={file} onClose={close} onDownload={download} downloading={downloading} error={error} />}
  </div>;
}
