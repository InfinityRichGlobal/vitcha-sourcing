import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  Download,
  Bell,
  Check,
  X,
  ChevronRight,
} from 'lucide-react';
import { AppDrawerMenu } from './AppDrawerMenu';

interface TopHeaderProps {
  onOpenProfile: () => void;
  onOpenNewSupplier: () => void;
  onOpenNewStoreInspo: () => void;
  onOpenCalculator: () => void;
  onOpenInstall: () => void;
  onOpenNotifications: () => void;
  onOpenInvites: () => void;
  onScrollToMap: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenProfile,
  onOpenNewSupplier,
  onOpenNewStoreInspo,
  onOpenCalculator,
  onOpenInstall,
  onOpenNotifications,
  onOpenInvites,
  onScrollToMap,
}) => {
  const {
    currentUser,
    syncStatus,
    pendingSyncCount,
    exchangeRate,
    notifications,
    activeTab,
    setActiveTab,
  } = useApp();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddPickerOpen, setIsAddPickerOpen] = useState(false);
  const [isPwaInstalled, setIsPwaInstalled] = useState<boolean>(false);

  const checkInstallStatus = () => {
    if (typeof window === 'undefined') return false;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    const isMarked = localStorage.getItem('vitcha_pwa_installed') === 'true';
    return isStandalone || isMarked;
  };

  useEffect(() => {
    setIsPwaInstalled(checkInstallStatus());
    const handleStatusChange = () => setIsPwaInstalled(checkInstallStatus());
    window.addEventListener('vitcha-pwa-status-changed', handleStatusChange);
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('vitcha_pwa_installed', 'true');
      setIsPwaInstalled(true);
    });
    return () => {
      window.removeEventListener('vitcha-pwa-status-changed', handleStatusChange);
    };
  }, []);

  // คำนวณ Unread Badge: ไม่นับรายการที่ตนเองเป็นผู้กระทำ และไม่นับหมวด 5 (เว้นแต่เป็น user-ice)
  const unreadCount = notifications.filter(
    (n) => !n.read && n.actorId !== currentUser.id && (!n.forAdminOnly || currentUser.id === 'user-ice')
  ).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-2.5 sm:px-5 py-2 transition-all">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 max-w-6xl mx-auto">
          {/* Left: Official Logo "ฉันจะเป็นหัวแถว" & Full Subtitle (แสดงเต็มไม่ถูกตัดคำ) */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 py-0.5 pr-1 rounded-xl hover:bg-slate-100/70 transition-all group text-left shrink-0"
            title="กดที่โลโก้เพื่อเปิดเมนูเข้าหน้าต่างๆ"
          >
            <div className="relative shrink-0">
              <img
                src="./logo.jpg"
                alt="ฉันจะเป็นหัวแถว"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-transform"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  syncStatus === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[13px] sm:text-base tracking-tight text-slate-950 whitespace-nowrap leading-tight">
                  ฉันจะเป็นหัวแถว
                </span>
                <span className="hidden lg:inline-flex items-center text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  CN · TH
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9.5px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap leading-tight">
                <i className="fa-solid fa-bars text-[9px] text-slate-400 shrink-0" />
                <span>
                  {syncStatus === 'online'
                    ? 'เมนูหลัก · ออนไลน์'
                    : `ออฟไลน์ (${pendingSyncCount})`}
                </span>
              </div>
            </div>
          </button>

          {/* Right: Minimalist Actions (Home + Soft '+' + Borderless Download, Bell, Full Profile Name) */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 min-w-0">
            {/* Home Button (ปุ่มโฮม ไร้กรอบ ปรับให้กลมกลืนกับเฮดเดอร์) */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all active:scale-95 shrink-0 ${
                activeTab === 'dashboard'
                  ? 'text-emerald-600'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
              title="กลับหน้าหลัก (Home)"
            >
              <i className="fa-solid fa-house text-sm sm:text-base" />
            </button>

            {/* '+' Button (ปุ่มบวกทรงกลมกะทัดรัด ไม่ใหญ่เกินไป) */}
            {currentUser.role !== 'viewer' && (
              <button
                type="button"
                onClick={() => setIsAddPickerOpen(true)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs transition-all active:scale-95 shrink-0"
                title="เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)"
              >
                <i className="fa-solid fa-plus text-xs" />
              </button>
            )}

            {/* Currency Pill (Desktop only, minimal borderless) */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-mono font-bold text-slate-600 transition-all active:scale-95 shrink-0"
              title="เครื่องคิดเลขแปลงค่าเงิน หยวน-บาท"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>1¥={exchangeRate.rate.toFixed(2)}฿</span>
            </button>

            {/* Install App Icon Button (ไร้กรอบ มินิมอล) */}
            <button
              type="button"
              onClick={onOpenInstall}
              className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all active:scale-95 shrink-0"
              title={
                isPwaInstalled
                  ? 'ติดตั้งแอพลงหน้าจอโฮมแล้ว (✓) · กดเพื่อดู/ทดสอบแจ้งเตือน'
                  : 'ยังไม่ได้ติดตั้งแอพลงหน้าจอโฮม (✗) · กดเพื่อติดตั้งและเปิดแจ้งเตือน'
              }
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              {isPwaInstalled ? (
                <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-600 text-white flex items-center justify-center border border-white">
                  <Check className="w-2 h-2 stroke-[3]" />
                </span>
              ) : (
                <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-rose-500 text-white flex items-center justify-center border border-white">
                  <X className="w-2 h-2 stroke-[3]" />
                </span>
              )}
            </button>

            {/* Notification Bell (ไร้กรอบ มินิมอล) */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all active:scale-95 shrink-0"
              title="การแจ้งเตือนความเคลื่อนไหว"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-white text-[8px] font-bold font-mono px-0.5 flex items-center justify-center border border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile (ไร้กรอบ มินิมอล แสดงรูป + ชื่อโปรไฟล์เต็มไม่บีบตัดคำ) */}
            <button
              type="button"
              onClick={onOpenProfile}
              title="กดเพื่อแก้ไขรูปโปรไฟล์ ชื่อ และรหัสผ่าน"
              className="flex items-center gap-1.5 py-1 pl-1 pr-1 rounded-lg hover:bg-slate-100/80 transition-all active:scale-95 shrink-0"
            >
              <img
                key={currentUser.avatar}
                src={currentUser.avatar}
                alt={currentUser.alias}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
              />
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 whitespace-nowrap">
                {currentUser.alias}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Minimal Quick-Add Selector Modal (กดปุ่ม + แล้วเลือกเพิ่มซัพพลายเออร์ หรือ เพิ่มร้านน้ำ) */}
      {isAddPickerOpen && (
        <div
          onClick={() => setIsAddPickerOpen(false)}
          className="fixed inset-0 z-[105] bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200/90 w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-3.5 animate-in zoom-in-95 text-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-plus text-emerald-600" />
                  <span>เลือกประเภทข้อมูลที่ต้องการบันทึก</span>
                </h3>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <i className="fa-solid fa-earth-asia text-slate-400" />
                  <span>รองรับการสำรวจทั้งใน จีน (CN) และ ไทย (TH)</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPickerOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Option 1: เพิ่มซัพพลายเออร์ */}
              <button
                type="button"
                onClick={() => {
                  setIsAddPickerOpen(false);
                  onOpenNewSupplier();
                }}
                className="w-full p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between gap-3 shadow-sm active:scale-[0.99] transition-all text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-industry text-base text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <span>เพิ่มซัพพลายเออร์</span>
                    </div>
                    <div className="text-[11px] text-emerald-100 truncate">
                      โรงงาน · อุปกรณ์ · วัตถุดิบชา & บรรจุภัณฑ์
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Option 2: เพิ่มร้านน้ำ & เรฟ */}
              <button
                type="button"
                onClick={() => {
                  setIsAddPickerOpen(false);
                  onOpenNewStoreInspo();
                }}
                className="w-full p-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-between gap-3 shadow-sm active:scale-[0.99] transition-all text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-mug-hot text-base text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <span>เพิ่มร้านน้ำ & เรฟ</span>
                    </div>
                    <div className="text-[11px] text-orange-100 truncate">
                      เรฟเมนูเครื่องดื่ม · แพ็กเกจจิ้ง · คอนเซปต์ร้าน
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}

      <AppDrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenProfile={onOpenProfile}
        onOpenCalculator={onOpenCalculator}
        onOpenInstall={onOpenInstall}
        onOpenInvites={onOpenInvites}
        onScrollToMap={onScrollToMap}
      />
    </>
  );
};
