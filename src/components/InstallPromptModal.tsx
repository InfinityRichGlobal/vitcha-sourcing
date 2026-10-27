import React, { useState, useEffect } from 'react';
import {
  Download,
  X,
  Share,
  PlusSquare,
  Bell,
  Check,
  Radio,
  Volume2,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playAlertChime } from '../utils/audioHelper';

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, broadcastNotification } = useApp();

  const [notificationPermission, setNotificationPermission] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [isPrompted, setIsPrompted] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [testStatusMsg, setTestStatusMsg] = useState<string | null>(null);
  const [adminBroadcastText, setAdminBroadcastText] = useState(
    'แจ้งทีมสำรวจและ R&D: มีอัปเดตข้อมูลซัพและเรฟร้านน้ำใหม่ รบกวนเข้าตรวจสเปกด่วนครับ!'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('Notification' in window) {
        setNotificationPermission(Notification.permission);
      }
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      const isMarked = localStorage.getItem('vitcha_pwa_installed') === 'true';
      setIsInstalled(isStandalone || isMarked);
    }
    setTestStatusMsg(null);
  }, [isOpen]);

  const toggleInstalledStatus = (installed: boolean) => {
    if (installed) {
      localStorage.setItem('vitcha_pwa_installed', 'true');
    } else {
      localStorage.removeItem('vitcha_pwa_installed');
    }
    setIsInstalled(installed);
    window.dispatchEvent(new Event('vitcha-pwa-status-changed'));
  };

  const handleRequestNotification = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
        if (perm === 'granted') {
          playAlertChime();
          new Notification('ฉันจะเป็นหัวแถว', {
            body: 'เปิดรับการแจ้งเตือนแบบเรียลไทม์สำเร็จ! ข้อมูลใหม่จากทีมจะเด้งแจ้งเตือนทันที',
            icon: './logo.jpg',
          });
          setTestStatusMsg('✅ เปิดสิทธิ์การแจ้งเตือนบนอุปกรณ์นี้เรียบร้อยแล้ว!');
        }
      } catch (err) {
        console.error('Notification permission error', err);
      }
    }
  };

  const handleTestLocalNotification = async () => {
    playAlertChime();

    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission !== 'granted') {
        try {
          const perm = await Notification.requestPermission();
          setNotificationPermission(perm);
        } catch {
          // ignore
        }
      }
      if (Notification.permission === 'granted') {
        try {
          new Notification('🔔 ทดสอบแจ้งเตือน — ฉันจะเป็นหัวแถว', {
            body: `สวัสดี ${currentUser.alias}! ระบบแจ้งเตือนและเสียงเตือนบนเครื่องของคุณทำงานปกติ 100%`,
            icon: './logo.jpg',
          });
        } catch {
          // fallback handled by in-app toast below
        }
      }
    }

    broadcastNotification(
      `🔔 ทดสอบแจ้งเตือนสำเร็จ (${currentUser.alias})`,
      'ระบบเด้งแจ้งเตือนพร้อมเสียงเตือนเข้าเครื่องของคุณเรียบร้อยแล้ว!',
      'status',
      undefined,
      currentUser.avatar,
      false
    );

    setTestStatusMsg('✅ ยิงแจ้งเตือนทดสอบ + เสียงเตือนเข้าเครื่องนี้สำเร็จแล้ว! (สังเกตแถบเด้งด้านบน)');
  };

  const handleAdminBroadcastToAll = () => {
    playAlertChime();

    const msg =
      adminBroadcastText.trim() ||
      'ประกาศด่วนจากคุณไอซ์: รบกวนทีมตรวจเช็กข้อมูลซัพพลายเออร์และเรฟร้านน้ำล่าสุด';

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('📢 ประกาศด่วนจาก Ice (Admin) · ฉันจะเป็นหัวแถว', {
          body: msg,
          icon: './logo.jpg',
        });
      } catch {
        // ignore
      }
    }

    broadcastNotification(
      `📢 ประกาศด่วนจาก ${currentUser.alias} ถึงทุกคนในระบบ`,
      msg,
      'reply',
      undefined,
      currentUser.avatar,
      false
    );

    setTestStatusMsg('📢 ส่งแจ้งเตือนประกาศด่วนถึงทุกคนในระบบเรียบร้อยแล้ว!');
  };

  const handleInstallClick = () => {
    const deferredPrompt = (window as unknown as { deferredPrompt?: { prompt: () => void } }).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setIsPrompted(true);
    }
    toggleInstalledStatus(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white border border-slate-200/90 w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 text-slate-900 animate-in slide-in-from-bottom-6 sm:zoom-in-95 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
            />
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                ติดตั้งแอพ "ฉันจะเป็นหัวแถว" & ทดสอบแจ้งเตือน
              </h3>
              <p className="text-xs text-slate-500">
                เมื่อเซฟลงหน้าจอโฮม แอพจะใช้ชื่อ <strong className="text-slate-900">ฉันจะเป็นหัวแถว</strong> เท่านั้น
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3.5">
          {/* Current Install Status Banner (✓ or ✗) */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
              isInstalled
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
                  isInstalled ? 'bg-emerald-600' : 'bg-rose-500'
                }`}
              >
                {isInstalled ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-4 h-4 stroke-[3]" />}
              </div>
              <div>
                <div className="text-xs font-extrabold">
                  {isInstalled
                    ? 'สถานะ: ติดตั้งแอพลงเครื่องแล้ว (เครื่องหมาย ✓ สีเขียว)'
                    : 'สถานะ: ยังไม่ได้ติดตั้งลงหน้าจอโฮม (เครื่องหมาย ✗ สีแดง)'}
                </div>
                <div className="text-[11px] opacity-80">
                  {isInstalled
                    ? 'ไอคอนมุมขวาบนแสดงเครื่องหมายถูก ✓ เรียบร้อย'
                    : 'เมื่อเพิ่มไปยังหน้าจอโฮมแล้ว กดปุ่มยืนยันด้านขวาได้เลย'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleInstalledStatus(!isInstalled)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all ${
                isInstalled
                  ? 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
              }`}
            >
              {isInstalled ? 'สลับเป็นยังไม่ติดตั้ง' : '✓ ยืนยันว่าติดตั้งแล้ว'}
            </button>
          </div>

          {/* iOS Guide */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2 text-xs text-slate-700">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>📱 วิธีติดตั้งบน iPhone / iPad (Safari):</span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-emerald-700 font-bold">
                ชื่อแอพ: ฉันจะเป็นหัวแถว
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold font-mono text-[11px]">
                1
              </div>
              <div>
                แตะปุ่ม{' '}
                <span className="font-bold text-blue-600 inline-flex items-center gap-1">
                  <Share className="w-3.5 h-3.5" /> แชร์ (Share)
                </span>{' '}
                ด้านล่างของ Safari
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold font-mono text-[11px]">
                2
              </div>
              <div>
                เลื่อนแตะ{' '}
                <span className="font-bold text-slate-900 inline-flex items-center gap-1">
                  <PlusSquare className="w-3.5 h-3.5" /> "เพิ่มไปยังหน้าจอโฮม (Add to Home Screen)"
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold font-mono text-[11px]">
                3
              </div>
              <div>
                แตะ <span className="font-bold text-slate-900">"เพิ่ม (Add)"</span> — จะได้ไอคอนแอพชื่อ{' '}
                <strong className="text-emerald-700">"ฉันจะเป็นหัวแถว"</strong> บนจอมือถือทันที
              </div>
            </div>
          </div>

          {/* Android Direct Install Trigger */}
          <div className="flex items-center justify-between p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs">
            <div>
              <div className="font-bold text-emerald-950">ผู้ใช้ Android / Chrome:</div>
              <div className="text-emerald-700 text-[11px]">กดติดตั้งแอพลงหน้าจอหลักได้โดยตรง</div>
            </div>
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isPrompted || isInstalled ? 'ติดตั้งแล้ว ✓' : 'ติดตั้งทันที'}</span>
            </button>
          </div>

          {/* Section: Notification Permission + Local Test Button */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <div>
                  <div className="font-bold text-slate-900">ระบบแจ้งเตือนเด้งเข้ามือถือ & เสียงเตือน</div>
                  <div className="text-slate-500 text-[11px]">
                    ทดสอบว่าเครื่องของคุณรับแจ้งเตือนและเสียงเตือนได้ปกติ
                  </div>
                </div>
              </div>

              {notificationPermission === 'granted' ? (
                <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3" /> เปิดสิทธิ์แล้ว
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestNotification}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px]"
                >
                  ขอสิทธิ์แจ้งเตือน
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleTestLocalNotification}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔔 กดทดสอบแจ้งเตือน + เสียงเตือนเข้ามือถือเครื่องนี้</span>
            </button>
          </div>

          {/* Admin-Only Special Broadcast Button ("ปุ่มพิเศษสำหรับผมเทสแจ้งเตือนทุกคน") */}
          {currentUser.role === 'admin' && (
            <div className="p-3.5 bg-amber-50/70 rounded-xl border-2 border-amber-300/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>ปุ่มพิเศษเฉพาะคุณไอซ์ (Admin): ยิงแจ้งเตือนทดสอบถึงทุกคน</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                  ADMIN ONLY
                </span>
              </div>

              <input
                type="text"
                value={adminBroadcastText}
                onChange={(e) => setAdminBroadcastText(e.target.value)}
                placeholder="พิมพ์ข้อความประกาศทดสอบถึงทีมงานทุกคน..."
                className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600"
              />

              <button
                type="button"
                onClick={handleAdminBroadcastToAll}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all"
              >
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>📢 ยิงแจ้งเตือนด่วนถึงทุกคนในระบบเดี๋ยวนี้</span>
              </button>
            </div>
          )}

          {testStatusMsg && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center animate-in fade-in">
              {testStatusMsg}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
