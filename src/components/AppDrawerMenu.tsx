import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
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
  LogOut,
  Trash2,
  Loader2,
} from 'lucide-react';

interface AppDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile?: () => void;
  onOpenCalculator: () => void;
  onOpenInstall: () => void;
  onOpenInvites?: () => void;
  onScrollToMap: () => void;
}

export const AppDrawerMenu: React.FC<AppDrawerMenuProps> = ({
  isOpen,
  onClose,
  onOpenCalculator,
  onOpenInstall,
  onScrollToMap,
}) => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    suppliers,
    drinkStores,
    locations,
    leadLabItems,
    franchiseStores,
    trashItems,
    exchangeRate,
    switchUser,
    simulatedFromAdmin,
    restoreAdminUser,
    logout,
    isMockLoading,
    isClearing,
    loadFullMockupData,
    resetSystemData,
    clearMockupOnly,
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

        {/* Main Navigation Links (เรียงลำดับตามความสำคัญ ไม่มีกรอบโปรไฟล์ซ้ำกับ Header) */}
        <div className="p-3.5 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-1.5">
            เมนูหลัก (Navigation)
          </div>

          {/* 1. หน้าหลักแดชบอร์ด */}
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
              <span>หน้าหลักแดชบอร์ด</span>
            </div>
            <span className="text-[10px] text-slate-400">Home</span>
          </button>

          {/* 2. ซัพพลายเออร์ */}
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
              <i
                className={`fa-solid fa-industry text-xs ${
                  activeTab === 'suppliers' ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              />
              <span>ซัพพลายเออร์</span>
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

          {/* 3. ร้านน้ำ & เรฟ */}
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
              <i
                className={`fa-solid fa-mug-hot text-xs ${
                  activeTab === 'drink_stores' ? 'text-amber-400' : 'text-amber-600'
                }`}
              />
              <span>ร้านน้ำ & เรฟ</span>
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

          {/* 3.1. LEAD LAB 🧪 */}
          <button
            onClick={() => {
              setActiveTab('lead_lab');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'lead_lab'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <i
                className={`fa-solid fa-flask-vial text-xs ${
                  activeTab === 'lead_lab' ? 'text-violet-400' : 'text-violet-600'
                }`}
              />
              <span>LEAD LAB 🧪 (แล๊ปของคนหัวแถว)</span>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'lead_lab'
                  ? 'bg-slate-800 text-violet-300'
                  : 'bg-violet-50 text-violet-700 font-bold'
              }`}
            >
              {leadLabItems.length}
            </span>
          </button>

          {/* 3.2. ร้านแฟรนไชส์จำลอง & เมนูบอร์ด */}
          <button
            onClick={() => {
              setActiveTab('franchise_stores');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'franchise_stores'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <i
                className={`fa-solid fa-store text-xs ${
                  activeTab === 'franchise_stores' ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              />
              <span>ร้านแฟรนไชส์จำลอง (Simulator)</span>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'franchise_stores'
                  ? 'bg-slate-800 text-emerald-300'
                  : 'bg-emerald-50 text-emerald-700 font-bold'
              }`}
            >
              {franchiseStores.length}
            </span>
          </button>

          {/* 3.5. สถานที่ & ทำเล (สีฟ้า) */}
          <button
            onClick={() => {
              setActiveTab('locations');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'locations'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <i
                className={`fa-solid fa-map-location-dot text-xs ${
                  activeTab === 'locations' ? 'text-sky-400' : 'text-sky-600'
                }`}
              />
              <span>สถานที่ & ทำเล</span>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'locations'
                  ? 'bg-slate-800 text-sky-300'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {locations.length}
            </span>
          </button>

          {/* 4. รายการสินค้า */}
          <button
            onClick={() => {
              setActiveTab('products');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'products'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <i
                className={`fa-solid fa-boxes-stacked text-xs ${
                  activeTab === 'products' ? 'text-teal-400' : 'text-teal-600'
                }`}
              />
              <span>รายการสินค้า</span>
            </div>
            <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded">
              แคตตาล็อก
            </span>
          </button>

          {/* 5. หมวดหมู่ */}
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
              <span>หมวดหมู่</span>
            </div>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
              แยกประเภท
            </span>
          </button>

          {/* 6. ส่งต่องาน (Handoff) */}
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
              <span>ส่งต่องาน (Handoff)</span>
            </div>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
              ไปป์ไลน์
            </span>
          </button>

          {/* 7. สมาชิกและคำเชิญ (Admin only) */}
          {currentUser.role === 'admin' && (
            <button
              onClick={() => {
                setActiveTab('members');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'members'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-purple-600" />
                <span>สมาชิกและคำเชิญ</span>
              </div>
              <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </button>
          )}

          {/* 8. ตั้งค่าเนื้อหา (Admin only) */}
          {currentUser.role === 'admin' && (
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
                <span>ตั้งค่าเนื้อหา</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </button>
          )}

          {/* 8.5. ถังขยะและประวัติที่ลบ (Owner only) */}
          {currentUser.id === 'user-ice' && (
            <button
              onClick={() => {
                setActiveTab('trash');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'trash'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>ถังขยะ & รายการที่ลบ</span>
              </div>
              <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                {trashItems?.length || 0}
              </span>
            </button>
          )}

          {/* 9. แผนที่พิกัดสำรวจ */}
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

        {currentUser.id === 'user-ice' && (<>
        {/* Mockup Data Simulation & Reset Buttons */}
        <div className="p-4 pt-2 border-t border-slate-100 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2">
            จำลองข้อมูล Mockup & รีเซ็ทระบบ
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              disabled={isMockLoading || isClearing}
              onClick={async () => {
                const ok = await loadFullMockupData();
                if (ok) {
                  window.alert('✅ โหลดชุดข้อมูลจำลองเต็มระบบเสร็จสมบูรณ์เรียบร้อยแล้ว!\n\nประกอบด้วย:\n- โรงงาน & ซัพพลายเออร์ 97 รายการ\n- ร้านเครื่องดื่มตัวอย่าง 74 รายการ\n- ทำเลศักยภาพ 71 รายการ\n- สูตรและแล็บ R&D 19 รายการ\n- สาขาแฟรนไชส์ 25 รายการ\n\nข้อมูลครบถ้วนทุกมิติ พร้อมให้ทีมงานทดสอบ นำเสนอ และใช้งานได้ทันทีครับ');
                  onClose();
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                isMockLoading
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300 cursor-wait'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200 active:scale-98'
              }`}
            >
              <div className="flex items-center gap-2">
                {isMockLoading ? (
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                ) : (
                  <Database className="w-4 h-4 text-emerald-600" />
                )}
                <span>{isMockLoading ? 'กำลังโหลดข้อมูลจำลอง...' : 'โหลดข้อมูล Mockup เต็มระบบ'}</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-200/70 text-emerald-900 px-1.5 py-0.5 rounded">
                {isMockLoading ? 'กำลังประมวลผล' : 'จัดเต็มทุกฟังก์ชัน'}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                disabled={isMockLoading || isClearing}
                onClick={async () => {
                  const pwd = window.prompt('กรุณากรอกรหัสผ่านเพื่อล้างเฉพาะข้อมูล Mockup ออกจากระบบ:');
                  if (!pwd) return;
                  const ok = await clearMockupOnly(pwd.trim());
                  if (ok) {
                    window.alert('🧹 ล้างข้อมูลจำลอง Mockup เรียบร้อยแล้ว!\n(ข้อมูลจริงและสมาชิกยังคงอยู่ครบถ้วน)');
                    onClose();
                  }
                }}
                className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all text-center disabled:opacity-50"
              >
                {isClearing ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                )}
                <span>{isClearing ? 'กำลังล้าง...' : 'ล้างเฉพาะ Mockup'}</span>
              </button>

              <button
                type="button"
                disabled={isMockLoading || isClearing}
                onClick={async () => {
                  const pwd = window.prompt('กรุณากรอกรหัสผ่านเพื่อยืนยันการล้างข้อมูลทั้งหมดเป็น 0 (สมาชิกคงเดิม):');
                  if (!pwd) return;
                  const ok = await resetSystemData(pwd.trim());
                  if (ok) {
                    window.alert('🗑️ ล้างข้อมูลระบบเป็น 0 เรียบร้อยแล้ว!\n(สมาชิกและสิทธิ์ในระบบยังคงอยู่ครบถ้วน)');
                    onClose();
                  }
                }}
                className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-[11px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all text-center disabled:opacity-50"
              >
                {isClearing ? (
                  <Loader2 className="w-3.5 h-3.5 text-rose-600 animate-spin" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                )}
                <span>{isClearing ? 'กำลังล้าง...' : 'ล้างข้อมูลเป็น 0'}</span>
              </button>
            </div>
          </div>
        </div>

        </>)}

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

          {/* Persona Switcher: EXCLUSIVE FOR DEVELOPER / SITE OWNER (SuperiCez) ONLY */}
          {(currentUser.id === 'user-ice' || simulatedFromAdmin) && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {/* Return to SuperiCez Button if currently simulating another account */}
              {currentUser.id !== 'user-ice' && (
                <button
                  type="button"
                  onClick={() => restoreAdminUser()}
                  className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 text-white shadow-xs active:scale-[0.98] transition-all flex items-center justify-between font-bold text-xs"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span className="truncate">กลับสู่บัญชีหลัก ↩</span>
                  </div>
                  <span className="text-[10px] bg-white text-emerald-900 font-extrabold px-2 py-0.5 rounded shrink-0">
                    คืนสิทธิ์
                  </span>
                </button>
              )}

              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ทดสอบมุมมอง</span>
                </div>
                <span className="font-mono text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Dev Mode
                </span>
              </div>

              {/* Minimalist Persona Switch Grid (ครบ 4 ลำดับสิทธิ์ตามสายงาน: บนสุด -> แอดมิน -> ทีมรีวิว -> คนดู) */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => restoreAdminUser()}
                  className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                    currentUser.id === 'user-ice'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                  title="ระดับผู้ดูแลระบบหลัก"
                >
                  <span className="truncate">SuperiCez</span>
                  <span className="text-[9px] uppercase font-mono px-1 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                    Admin
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => switchUser('user-mook')}
                  className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                    currentUser.id === 'user-mook'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                  title="ระดับแอดมิน: ดูแลระบบ ออกลิงก์ ลบ/แก้ได้"
                >
                  <span className="truncate">🛡️ น้องมุก</span>
                  <span className="text-[9px] uppercase font-mono px-1 py-0.5 rounded bg-purple-100 text-purple-800 shrink-0">
                    Admin
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => switchUser('user-beam')}
                  className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                    currentUser.id === 'user-beam'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                  title="ทีมรีวิว: ดูและคอมเมนต์ได้ ห้ามแก้ข้อมูลร้าน/ซัพพลายเออร์ ห้ามลบ"
                >
                  <span className="truncate">🔬 ช่างบีม</span>
                  <span className="text-[9px] uppercase font-mono px-1 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">
                    Reviewer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => switchUser('user-ann')}
                  className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                    currentUser.id === 'user-ann'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                  title="คนดูเท่านั้น: ดูอย่างเดียว ห้ามแก้ ห้ามลบ ห้ามคอมเมนต์"
                >
                  <span className="truncate">👁️ คุณแอน</span>
                  <span className="text-[9px] uppercase font-mono px-1 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                    Viewer
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Logout Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                logout();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ออกจากระบบ (Lock PIN)</span>
            </button>
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
