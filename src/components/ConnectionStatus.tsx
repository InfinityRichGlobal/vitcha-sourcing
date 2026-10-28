import { useState } from 'react';
import { X, RefreshCw, WifiOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ConnectionStatus() {
  const { renderStatus, refreshCentralData, actionError, clearActionError } = useApp();
  const [retrying, setRetrying] = useState(false);
  if (renderStatus === 'connected' && !actionError) return null;
  return (
    <div className="fixed inset-x-3 top-3 z-[250] mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950 shadow-lg sm:top-4" role={actionError ? 'alert' : 'status'} aria-live="polite">
      <div className="flex items-start gap-3">
        <WifiOff className="mt-1 h-5 w-5 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{actionError ? 'ตรวจสอบการบันทึก' : 'กำลังเชื่อมต่อข้อมูลทีม'}</p>
          <p className="mt-1 leading-relaxed">{actionError || (renderStatus === 'connecting' || retrying ? 'เซิร์ฟเวอร์อาจกำลังเริ่มทำงาน กรุณารอสักครู่' : 'ยังเชื่อมต่อไม่ได้ ระบบจะลองใหม่อัตโนมัติ ข้อมูลที่เห็นอาจยังไม่ล่าสุด')}</p>
          {!actionError && <button type="button" disabled={retrying} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 font-semibold disabled:opacity-50" onClick={async () => { setRetrying(true); try { await refreshCentralData(); } finally { setRetrying(false); } }}><RefreshCw size={16} />ลองเชื่อมต่อใหม่</button>}
        </div>
        {actionError && <button aria-label="ปิดข้อความแจ้งเตือน" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl hover:bg-amber-100" onClick={clearActionError}><X size={18} /></button>}
      </div>
    </div>
  );
}
