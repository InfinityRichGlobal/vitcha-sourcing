import { useEffect, useRef } from 'react';
import { Loader2, X } from 'lucide-react';
export function MockupResultDialog({ status, message }: { status: 'idle' | 'loading' | 'success' | 'error'; message: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (status === 'idle') dialog.current?.close();
    else if (!dialog.current?.open) dialog.current?.showModal();
  }, [status]);
  return <dialog ref={dialog} aria-labelledby="mockup-result-title" className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border-0 bg-white p-6 shadow-xl backdrop:bg-slate-950/40">
    <div className="flex items-center justify-between gap-3">
      <h2 id="mockup-result-title" className="text-lg font-bold">{status === 'loading' ? 'กำลังโหลดข้อมูลตัวอย่าง' : status === 'error' ? 'ยังยืนยันผลไม่สำเร็จ' : 'โหลดข้อมูลตัวอย่างเรียบร้อย'}</h2>
      <button aria-label="ปิดผลโหลดข้อมูล" onClick={() => dialog.current?.close()} className="p-2"><X className="h-5 w-5" /></button>
    </div>
    <div data-testid="mockup-result" role="status" className="my-4 flex gap-2 text-sm leading-relaxed text-slate-700">
      {status === 'loading' && <Loader2 className="h-5 w-5 shrink-0 animate-spin" />}{message}
    </div>
    <button onClick={() => dialog.current?.close()} className="w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white">ปิด</button>
  </dialog>;
}
