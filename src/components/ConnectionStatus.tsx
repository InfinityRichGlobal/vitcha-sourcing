import { useEffect, useState } from 'react';
import { X, RefreshCw, WifiOff, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ConnectionStatus() {
  const { renderStatus, syncStatus, refreshCentralData, actionError, clearActionError, successFeedback, clearSuccessFeedback, isMutating } = useApp();
  const [retrying, setRetrying] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  useEffect(() => {
    setShowInitial(false);
    if (renderStatus !== 'connecting') return;
    const timer = setTimeout(() => setShowInitial(true), 1800);
    return () => clearTimeout(timer);
  }, [renderStatus]);
  const placement = 'fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] z-[250] mx-auto max-w-xl';
  if (actionError) return (
    <div className={`${placement} rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-950 shadow-lg`} role="alert">
      <div className="flex items-start gap-3">
        <WifiOff className="mt-1 h-5 w-5 shrink-0" />
        <div className="min-w-0 flex-1"><p className="font-semibold">ตรวจสอบการบันทึก</p><p className="mt-1 leading-relaxed">{actionError}</p></div>
        <button aria-label="ปิดข้อความแจ้งเตือน" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl hover:bg-rose-100" onClick={clearActionError}><X size={18} /></button>
      </div>
    </div>
  );
  if (successFeedback) return (
    <div className={`${placement} pointer-events-none`}>
      <div role="status" aria-live="polite" data-testid="success-feedback" className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-950 shadow-lg">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
        <div className="min-w-0 flex-1"><p className="text-sm font-bold">{successFeedback.message}</p>{successFeedback.detail && <p className="mt-0.5 text-xs leading-relaxed">{successFeedback.detail}</p>}</div>
        <button type="button" aria-label="ปิดข้อความสำเร็จ" onClick={clearSuccessFeedback} className="pointer-events-auto grid h-10 w-10 shrink-0 place-items-center rounded-xl hover:bg-emerald-100"><X size={16} /></button>
      </div>
    </div>
  );
  // Saving has its own progress in the form. Team refresh is a small status,
  // never a modal or a claim that the server is starting/restarting.
  if (isMutating || renderStatus === 'connected' || (renderStatus === 'connecting' && !showInitial)) return null;
  return (
    <div className={`${placement} pointer-events-none flex justify-center`}>
      <div role="status" aria-live="polite" aria-label="สถานะการเชื่อมต่อ" className="pointer-events-auto flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-950 shadow-sm">
        <WifiOff size={16} className="shrink-0" />
        <span>{syncStatus === 'offline' ? 'ออฟไลน์ · รออินเทอร์เน็ตเพื่อบันทึก' : retrying || renderStatus === 'connecting' ? 'กำลังโหลดข้อมูลทีม…' : 'ข้อมูลทีมอัปเดตช้า · จะลองใหม่อัตโนมัติ'}</span>
        <button type="button" aria-label="ลองเชื่อมต่อใหม่" disabled={retrying} className="grid min-h-10 min-w-10 shrink-0 place-items-center rounded-full disabled:opacity-50" onClick={async () => { setRetrying(true); try { await refreshCentralData(); } finally { setRetrying(false); } }}><RefreshCw size={16} className={retrying ? 'animate-spin' : ''} /></button>
      </div>
    </div>
  );
}
