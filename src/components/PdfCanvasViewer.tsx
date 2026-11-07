import { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy, type RenderTask } from 'pdfjs-dist/legacy/build/pdf.mjs';
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfCanvasViewer({ url }: { url: string }) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(320);
  const [zoom, setZoom] = useState(1);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const resize = () => setWidth(Math.max(180, element.clientWidth - 24));
    resize(); const observer = new ResizeObserver(resize); observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let disposed = false;
    setDocument(null); setPage(1); setBusy(true); setError('');
    const assets = new URL(`${import.meta.env.BASE_URL}pdfjs/`, window.location.href).href;
    const task = getDocument({ url, cMapUrl: assets + 'cmaps/', cMapPacked: true, standardFontDataUrl: assets + 'standard_fonts/', wasmUrl: assets + 'wasm/' });
    task.promise.then(pdf => { if (!disposed) setDocument(pdf); }).catch(() => {
      if (!disposed) { setError('เปิดตัวอย่าง PDF ไม่สำเร็จ กรุณากดดาวน์โหลดเพื่ออ่านไฟล์ต้นฉบับ'); setBusy(false); }
    });
    return () => { disposed = true; void task.destroy(); };
  }, [url]);
  useEffect(() => {
    if (!document || !canvas.current) return;
    let disposed = false; let task: RenderTask | undefined;
    const element = canvas.current;
    setBusy(true); setError('');
    document.getPage(page).then(async pdfPage => {
      if (disposed) return;
      const base = pdfPage.getViewport({ scale: 1 });
      const viewport = pdfPage.getViewport({ scale: Math.min(width, 1100) / base.width * zoom });
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.ceil(viewport.width * ratio); element.height = Math.ceil(viewport.height * ratio);
      element.style.width = `${viewport.width}px`; element.style.height = `${viewport.height}px`;
      task = pdfPage.render({ canvas: element, viewport, transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0] });
      await task.promise;
      if (!disposed) setBusy(false);
    }).catch(e => {
      if (!disposed && e?.name !== 'RenderingCancelledException') { setError('แสดงหน้านี้ไม่สำเร็จ กรุณากดดาวน์โหลดเพื่ออ่านไฟล์ต้นฉบับ'); setBusy(false); }
    });
    return () => { disposed = true; task?.cancel(); };
  }, [document, page, width, zoom]);
  return <div className="flex h-full min-h-0 flex-col">
    <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 border-b border-slate-200 bg-white px-2 py-2 text-xs">
      <button type="button" disabled={!document || page <= 1} onClick={() => setPage(p => p - 1)} className="min-h-10 rounded-lg border px-3 disabled:opacity-40">หน้าก่อน</button>
      <span aria-live="polite">หน้า {page} / {document?.numPages ?? '…'}</span>
      <button type="button" disabled={!document || page >= document.numPages} onClick={() => setPage(p => p + 1)} className="min-h-10 rounded-lg border px-3 disabled:opacity-40">หน้าถัดไป</button>
      <button type="button" aria-label="ย่อ PDF" disabled={zoom <= 0.75} onClick={() => setZoom(z => Math.max(0.75, z - 0.25))} className="min-h-10 min-w-10 rounded-lg border disabled:opacity-40">−</button>
      <button type="button" aria-label="ขยาย PDF" disabled={zoom >= 2.5} onClick={() => setZoom(z => Math.min(2.5, z + 0.25))} className="min-h-10 min-w-10 rounded-lg border disabled:opacity-40">+</button>
    </div>
    <div ref={host} className="min-h-0 flex-1 overflow-auto bg-slate-200 p-3" aria-busy={busy}>
      {busy && <p role="status" className="py-2 text-center text-sm text-slate-600">กำลังแสดง PDF…</p>}
      {error && <p role="alert" className="rounded-xl bg-white p-4 text-sm text-rose-700">{error}</p>}
      <canvas key={`${page}-${width}-${zoom}`} ref={canvas} role="img" aria-label={`PDF หน้า ${page}`} data-rendered={!busy && !error && !!document} className="mx-auto block bg-white shadow-sm" style={{ visibility: document && !error ? 'visible' : 'hidden' }} />
    </div>
  </div>;
}
