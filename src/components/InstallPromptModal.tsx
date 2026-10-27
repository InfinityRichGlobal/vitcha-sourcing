import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Bell, Check, Smartphone } from 'lucide-react';

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({ isOpen, onClose }) => {
  const [notificationPermission, setNotificationPermission] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [isPrompted, setIsPrompted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [isOpen]);

  const handleRequestNotification = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
        if (perm === 'granted') {
          new Notification('ฉันจะเป็นหัวแถว', {
            body: 'เปิดรับการแจ้งเตือนแบบเรียลไทม์สำเร็จ! ข้อมูลใหม่จากทีมจะเด้งแจ้งเตือนทันที',
            icon: '/favicon.ico',
          });
        }
      } catch (err) {
        console.error('Notification permission error', err);
      }
    }
  };

  const handleInstallClick = () => {
    // Check for deferred prompt on Android/Chrome
    const deferredPrompt = (window as unknown as { deferredPrompt?: { prompt: () => void } }).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setIsPrompted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white border border-slate-200/90 w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-900 animate-in slide-in-from-bottom-6 sm:zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
            />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                ติดตั้งแอพ "ฉันจะเป็นหัวแถว"
              </h3>
              <p className="text-xs text-slate-400">
                สำหรับใช้งานบน iPhone, iPad และ Android แบบไม่ต้องโหลดผ่าน Store
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

        {/* Steps Guide */}
        <div className="py-4 space-y-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2.5 text-xs text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>📱 วิธีติดตั้งบน iPhone (Safari):</span>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold font-mono">
                1
              </div>
              <div>
                แตะปุ่ม <span className="font-bold text-blue-600 inline-flex items-center gap-1"><Share className="w-3.5 h-3.5" /> แชร์ (Share)</span> ที่แถบเมนูด้านล่างของ Safari
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold font-mono">
                2
              </div>
              <div>
                เลื่อนลงมาแล้วแตะ <span className="font-bold text-slate-900 inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5" /> "เพิ่มไปยังหน้าจอโฮม (Add to Home Screen)"</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold font-mono">
                3
              </div>
              <div>
                แตะปุ่ม <span className="font-bold text-slate-900">"เพิ่ม (Add)"</span> ที่มุมขวาบน — แอพจะปรากฏบนหน้าจอโฮม ใช้งานเต็มจอเร็วทันที
              </div>
            </div>
          </div>

          {/* Android Direct Install Trigger */}
          <div className="flex items-center justify-between p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs">
            <div>
              <div className="font-bold text-emerald-900">ผู้ใช้ Android / Chrome:</div>
              <div className="text-emerald-700 text-[11px]">สามารถกดปุ่มเพื่อเริ่มติดตั้งได้โดยตรง</div>
            </div>
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isPrompted ? 'กำลังติดตั้ง...' : 'ติดตั้งทันที'}</span>
            </button>
          </div>

          {/* Push Notification Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <div>
                <div className="font-bold text-slate-800">แจ้งเตือนข้อมูลใหม่เด้งเข้ามือถือ</div>
                <div className="text-slate-400 text-[11px]">รับทราบทันทีเมื่อมีคนส่งข้อมูลหรือตอบกลับ</div>
              </div>
            </div>

            {notificationPermission === 'granted' ? (
              <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Check className="w-3 h-3" /> เปิดแล้ว
              </span>
            ) : (
              <button
                onClick={handleRequestNotification}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs active:scale-95 transition-all"
              >
                เปิดแจ้งเตือน
              </button>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            เข้าใจแล้ว / ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
