import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  Download,
  Bell,
  Factory,
  Coffee,
  Menu,
  Check,
  X,
  Plus,
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-3 sm:px-5 py-2 transition-all">
        <div className="flex items-center justify-between gap-2 max-w-6xl mx-auto">
          {/* Left: Official Logo "ฉันจะเป็นหัวแถว" & Full Subtitle (แสดงเต็มไม่ถูกตัดคำ) */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2.5 py-0.5 pr-1 rounded-xl hover:bg-slate-100/70 transition-all group text-left shrink-0"
            title="กดที่โลโก้เพื่อเปิดเมนูเข้าหน้าต่างๆ"
          >
            <div className="relative shrink-0">
              <img
                src="./logo.jpg"
                alt="ฉันจะเป็นหัวแถว"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-transform"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  syncStatus === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-950 whitespace-nowrap">
                  ฉันจะเป็นหัวแถว
                </span>
                <span className="hidden lg:inline-flex items-center text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  CN · TH
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap">
                <Menu className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <span>
                  {syncStatus === 'online'
                    ? 'เมนูหลัก · ออนไลน์'
                    : `ออฟไลน์ (${pendingSyncCount})`}
                </span>
              </div>
            </div>
          </button>

          {/* Right: Minimalist Actions (Single '+' Button + Borderless Download, Bell, Profile) */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            {/* Single Minimalist '+' Button -> Opens Add Type Selector */}
            {currentUser.role !== 'viewer' && (
              <button
                type="button"
                onClick={() => setIsAddPickerOpen(true)}
                className="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-full sm:rounded-xl bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all shrink-0"
                title="เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline text-xs font-bold">เพิ่มข้อมูล</span>
              </button>
            )}

            {/* Currency Pill (Desktop only, minimal borderless) */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-mono font-bold text-slate-600 transition-all active:scale-95"
              title="เครื่องคิดเลขแปลงค่าเงิน หยวน-บาท"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>1¥={exchangeRate.rate.toFixed(2)}฿</span>
            </button>

            {/* Install App Icon Button (ไร้กรอบ มินิมอล) */}
            <button
              type="button"
              onClick={onOpenInstall}
              className="relative p-1.5 sm:p-2 rounded-lg hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 transition-all active:scale-95 shrink-0"
              title={
                isPwaInstalled
                  ? 'ติดตั้งแอพลงหน้าจอโฮมแล้ว (✓) · กดเพื่อดู/ทดสอบแจ้งเตือน'
                  : 'ยังไม่ได้ติดตั้งแอพลงหน้าจอโฮม (✗) · กดเพื่อติดตั้งและเปิดแจ้งเตือน'
              }
            >
              <Download className="w-4 h-4 text-emerald-600" />
              {isPwaInstalled ? (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center border border-white">
                  <Check className="w-2 h-2 stroke-[3]" />
                </span>
              ) : (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white flex items-center justify-center border border-white">
                  <X className="w-2 h-2 stroke-[3]" />
                </span>
              )}
            </button>

            {/* Notification Bell (ไร้กรอบ มินิมอล) */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-1.5 sm:p-2 rounded-lg hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 transition-all active:scale-95 shrink-0"
              title="การแจ้งเตือนความเคลื่อนไหว"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[15px] h-[15px] rounded-full bg-rose-500 text-white text-[9px] font-bold font-mono px-0.5 flex items-center justify-center border border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile (ไร้กรอบ มินิมอล แสดงรูป + ชื่อ) */}
            <button
              type="button"
              onClick={onOpenProfile}
              title="กดเพื่อแก้ไขรูปโปรไฟล์ ชื่อ และรหัสผ่าน"
              className="flex items-center gap-1.5 py-1 pl-1 pr-1.5 rounded-lg hover:bg-slate-100/80 transition-all active:scale-95 min-w-0"
            >
              <img
                key={currentUser.avatar}
                src={currentUser.avatar}
                alt={currentUser.alias}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
              />
              <span className="text-xs font-bold text-slate-800 max-w-[76px] sm:max-w-[120px] truncate">
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
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950">
                  เลือกประเภทข้อมูลที่ต้องการบันทึก
                </h3>
                <p className="text-[11px] text-slate-500">
                  รองรับการสำรวจทั้งใน 🇨🇳 จีน และ 🇹🇭 ไทย
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
                    <Factory className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm text-white">
                      🏭 เพิ่มซัพพลายเออร์
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
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-sm text-white">
                      🧋 เพิ่มร้านน้ำ & เรฟ
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
