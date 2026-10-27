import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Factory,
  Coffee,
  MapPin,
  ShieldCheck,
  Calculator,
  Download,
  ChevronRight,
  Sparkles,
  Layers,
  Users,
  RotateCcw,
  Database,
} from 'lucide-react';

interface AppDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile: () => void;
  onOpenCalculator: () => void;
  onOpenInstall: () => void;
  onOpenInvites: () => void;
  onScrollToMap: () => void;
}

export const AppDrawerMenu: React.FC<AppDrawerMenuProps> = ({
  isOpen,
  onClose,
  onOpenProfile,
  onOpenCalculator,
  onOpenInstall,
  onOpenInvites,
  onScrollToMap,
}) => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    suppliers,
    drinkStores,
    exchangeRate,
    users,
    switchUser,
    loadFullMockupData,
    resetSystemData,
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-xs flex justify-start animate-in fade-in">
      <div className="bg-white w-full max-w-xs sm:max-w-sm h-full shadow-2xl flex flex-col text-slate-900 border-r border-slate-200 animate-in slide-in-from-left duration-300 overflow-y-auto">
        {/* Header Branding with Official Logo */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
            />
            <div>
              <div className="font-extrabold text-sm tracking-tight text-slate-900">
                ฉันจะเป็นหัวแถว
              </div>
              <div className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                VIT CHA & VITAMINZAAR
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current User Card */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div
            onClick={() => {
              onOpenProfile();
              onClose();
            }}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.alias}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 truncate">
                  {currentUser.alias}
                </div>
                <div className="text-[10px] font-medium text-slate-500 uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>
                    {currentUser.role === 'admin'
                      ? 'เจ้าของระบบ (Admin)'
                      : currentUser.role}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="p-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-2">
            หน้าหลัก & ระบบงาน
          </div>

          {/* Tab 0: แดชบอร์ดภาพรวม */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>ภาพรวมแดชบอร์ด</span>
            </div>
            <span className="text-[10px] text-slate-400">หน้าหลัก</span>
          </button>

          {/* Tab 1: ซัพพลายเออร์ */}
          <button
            onClick={() => {
              setActiveTab('suppliers');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'suppliers'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Factory
                className={`w-4 h-4 ${
                  activeTab === 'suppliers' ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              />
              <span>🏭 ซัพพลายเออร์</span>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'suppliers'
                  ? 'bg-slate-800 text-emerald-300'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {suppliers.length}
            </span>
          </button>

          {/* Tab 2: ร้านน้ำ & เรฟ */}
          <button
            onClick={() => {
              setActiveTab('drink_stores');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'drink_stores'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Coffee
                className={`w-4 h-4 ${
                  activeTab === 'drink_stores' ? 'text-amber-400' : 'text-amber-600'
                }`}
              />
              <span>🧋 ร้านน้ำ & เรฟไอเดีย</span>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'drink_stores'
                  ? 'bg-slate-800 text-amber-300'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {drinkStores.length}
            </span>
          </button>

          {/* Tab 2.5: ส่องตามหมวดหมู่ */}
          <button
            onClick={() => {
              setActiveTab('categories');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'categories'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers
                className={`w-4 h-4 ${
                  activeTab === 'categories' ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              />
              <span>ส่องตามหมวดหมู่</span>
            </div>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
              แยกประเภท
            </span>
          </button>

          {/* Tab 3: ส่งต่อ & รับช่วง */}
          <button
            onClick={() => {
              setActiveTab('handoff');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'handoff'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>บริหารจัดการรับช่วงต่อ (Handoff)</span>
            </div>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
              ไปป์ไลน์
            </span>
          </button>

          {/* Tab 4: ตั้งค่า & สิทธิ์ (Top 2 roles) */}
          {(currentUser.role === 'admin' || currentUser.role === 'editor') && (
            <button
              onClick={() => {
                setActiveTab('settings');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>การตั้งค่าระบบ & สิทธิ์</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </button>
          )}

          {/* Interactive Map Shortcut */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setTimeout(() => onScrollToMap(), 120);
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>แผนที่พิกัดสำรวจ (Map Monitor)</span>
            </div>
            <span className="text-[10px] text-slate-400">พิกัดจริง</span>
          </button>
        </div>

        {/* Mockup Data Simulation & Reset Buttons */}
        <div className="p-4 pt-2 border-t border-slate-100 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2">
            จำลองข้อมูล Mockup & รีเซ็ทระบบ
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => {
                loadFullMockupData();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-all"
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>✨ โหลดข้อมูล Mockup เต็มระบบ</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-200/70 text-emerald-900 px-1.5 py-0.5 rounded">
                12 รายการ
              </span>
            </button>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  resetSystemData(false);
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                <span>รีเซ็ท Mockup</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('ต้องการล้างข้อมูลทั้งหมดเพื่อเริ่มบันทึกหน้างานจริงจาก 0 ใช่หรือไม่?')) {
                    resetSystemData(true);
                    onClose();
                  }
                }}
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                <span>ล้างข้อมูลเป็น 0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admin Only Section (จัดการสิทธิ์ & ลิงก์คำเชิญ) */}
        {currentUser.role === 'admin' && (
          <div className="p-4 pt-2 border-t border-slate-100 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-2">
              เฉพาะเจ้าของระบบ (Admin Only)
            </div>

            <button
              onClick={() => {
                onOpenInvites();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>จัดการสิทธิ์ & ลิงก์คำเชิญ (Invite)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

        {/* Tools & Utilities */}
        <div className="p-4 pt-2 border-t border-slate-100 space-y-1 flex-1">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-2">
            เครื่องมือช่วยงาน
          </div>

          <button
            onClick={() => {
              onOpenCalculator();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>เครื่องคิดเลขค่าเงิน (1¥ = {exchangeRate.rate}฿)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onOpenInstall();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-slate-700" />
              <span>ติดตั้งแอพบนมือถือ (PWA)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Quick User Switcher for Testing */}
          <div className="pt-2">
            <div className="text-[10px] font-bold text-slate-400 px-2 py-1">
              สลับผู้ใช้งานเพื่อทดสอบสิทธิ์ (Test Personas):
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className={`p-2 rounded-xl border text-left text-[11px] flex items-center gap-1.5 transition-colors ${
                    u.id === currentUser.id
                      ? 'bg-slate-900 text-white border-slate-900 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <img src={u.avatar} className="w-5 h-5 rounded-full object-cover shrink-0" />
                  <span className="truncate">{u.alias}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 font-mono text-center">
          ฉันจะเป็นหัวแถว v2.5 · VIT CHA & VITAMINZAAR
        </div>
      </div>
    </div>
  );
};
