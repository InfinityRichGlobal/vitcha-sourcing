import { LayoutDashboard, Factory, Coffee, Layers, Users, Settings, Package, UserCog } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppViewTab } from '../types';

export const NavigationTabs = () => {
  const { activeTab, setActiveTab, currentUser, suppliers, drinkStores } = useApp();

  // ไม่แสดงแถบด้านล่าง และซ่อนแถบนี้บนหน้าแรก (Dashboard) ตามแบบฉบับเว็บเดิม
  if (activeTab === 'dashboard') {
    return null;
  }

  const items = [
    { key: 'dashboard', label: 'ภาพรวม', icon: LayoutDashboard },
    { key: 'suppliers', label: 'ซัพพลายเออร์', icon: Factory, badge: suppliers.length },
    { key: 'drink_stores', label: 'ร้านน้ำ', icon: Coffee, badge: drinkStores.length },
    { key: 'products', label: 'รายการสินค้า', icon: Package },
    { key: 'handoff', label: 'ส่งต่องาน', icon: Users },
    { key: 'categories', label: 'หมวดหมู่', icon: Layers },
    ...(currentUser.role === 'admin' ? [{ key: 'members', label: 'สมาชิก', icon: UserCog }, { key: 'settings', label: 'ตั้งค่าเนื้อหา', icon: Settings }] : []),
  ];

  return (
    <nav aria-label="เมนูหลัก" className="app-navigation bg-white/95 border-b border-slate-200/80 sticky top-[57px] z-30 px-3 py-1.5 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {items.map(({ key, label, icon: Icon, badge }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                setActiveTab(key as AppViewTab);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/60'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{label}</span>
              {typeof badge === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
