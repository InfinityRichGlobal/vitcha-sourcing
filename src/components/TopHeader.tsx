import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  Plus,
  Download,
  Bell,
  Factory,
  Coffee,
  Menu,
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-2.5 sm:px-5 py-2 transition-all">
        <div className="flex items-center justify-between gap-2 max-w-6xl mx-auto">
          {/* Left: Official Logo "ฉันจะเป็นหัวแถว" & Drawer Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 py-0.5 pr-2 rounded-xl hover:bg-slate-100/80 transition-all group text-left min-w-0"
            title="กดที่โลโก้เพื่อเปิดเมนูเข้าหน้าต่างๆ"
          >
            <div className="relative shrink-0">
              <img
                src="./logo.jpg"
                alt="ฉันจะเป็นหัวแถว"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  syncStatus === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-[15px] tracking-tight text-slate-950 truncate">
                  ฉันจะเป็นหัวแถว
                </span>
                <span className="hidden lg:inline-flex items-center text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80">
                  CN · TH
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Menu className="w-2.5 h-2.5 text-slate-500" />
                <span className="truncate">
                  {syncStatus === 'online'
                    ? 'เมนูหลัก · ออนไลน์'
                    : `ออฟไลน์ (${pendingSyncCount})`}
                </span>
              </div>
            </div>
          </button>

          {/* Right: Minimal Capture Buttons (+ ซัพ / + ร้านน้ำ) + Utility Pills */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {currentUser.role !== 'viewer' && (
              <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 sm:p-1 rounded-xl border border-slate-200/70">
                <button
                  type="button"
                  onClick={onOpenNewSupplier}
                  className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-extrabold rounded-lg bg-slate-950 hover:bg-emerald-700 text-white shadow-2xs active:scale-95 transition-all"
                  title="บันทึกซัพพลายเออร์ใหม่ (จีน/ไทย)"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                  <Factory className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span>ซัพ</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenNewStoreInspo}
                  className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-extrabold rounded-lg bg-white hover:bg-amber-50 text-slate-900 border border-slate-200/90 shadow-2xs active:scale-95 transition-all"
                  title="บันทึกร้านน้ำ & เรฟใหม่"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-amber-600" />
                  <Coffee className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
                  <span>ร้านน้ำ</span>
                </button>
              </div>
            )}

            {/* Currency Pill */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-mono font-bold text-slate-700 transition-all active:scale-95"
              title="เครื่องคิดเลขแปลงค่าเงิน หยวน-บาท"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>1¥={exchangeRate.rate.toFixed(2)}฿</span>
            </button>

            {/* Install App Icon Button */}
            <button
              type="button"
              onClick={onOpenInstall}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 transition-all active:scale-95"
              title="ติดตั้งแอพลงหน้าจอโฮม"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 transition-colors"
              title="การแจ้งเตือนความเคลื่อนไหว"
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold font-mono px-1 flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile Chip */}
            <button
              type="button"
              onClick={onOpenProfile}
              title="แก้ไขโปรไฟล์ / สลับบัญชีผู้ใช้"
              className="flex items-center gap-1.5 pl-1 pr-1.5 sm:pr-2 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.alias}
                className="w-6 h-6 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <span className="text-xs font-bold text-slate-800 max-w-[68px] truncate hidden sm:inline">
                {currentUser.alias}
              </span>
            </button>
          </div>
        </div>
      </header>

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
