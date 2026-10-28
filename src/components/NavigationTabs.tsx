import { LayoutDashboard, Factory, Coffee, Layers, Users, Settings, Package, UserCog } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppViewTab } from '../types';

export const NavigationTabs = () => {
  const { activeTab, setActiveTab, currentUser } = useApp();
  const items = [
    { key: 'dashboard', label: 'ภาพรวม', icon: LayoutDashboard },
    { key: 'suppliers', label: 'ซัพพลายเออร์', icon: Factory },
    { key: 'drink_stores', label: 'ร้านน้ำ', icon: Coffee },
    { key: 'products', label: 'รายการสินค้า', icon: Package },
    { key: 'handoff', label: 'ส่งต่องาน', icon: Users },
    { key: 'categories', label: 'หมวดหมู่', icon: Layers },
    ...(currentUser.role === 'admin' ? [{ key: 'members', label: 'สมาชิก', icon: UserCog }, { key: 'settings', label: 'ตั้งค่าเนื้อหา', icon: Settings }] : []),
  ];
  return <nav aria-label="เมนูหลัก" className="app-navigation fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-1 pt-1 backdrop-blur-xl md:sticky md:top-[60px] md:border-b md:border-t-0 md:px-4 md:py-2">
    <div className="mx-auto flex max-w-6xl items-center justify-around gap-0.5 md:justify-start md:gap-2">
      {items.map(({ key, label, icon: Icon }) => <button key={key} aria-current={activeTab === key ? 'page' : undefined} onClick={() => { setActiveTab(key as AppViewTab); window.scrollTo({ top: 0, behavior: 'instant' }); }} className={`${['categories', 'settings'].includes(key) ? 'hidden lg:flex' : 'flex'} min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold transition-colors md:min-h-11 md:flex-none md:flex-row md:gap-2 md:px-2.5 md:text-xs lg:text-sm ${activeTab === key ? 'bg-emerald-50 text-emerald-800 md:bg-emerald-700 md:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}><Icon className="h-5 w-5 shrink-0" /><span>{label}</span></button>)}
    </div>
  </nav>;
};
