import React from 'react';
import { useApp } from '../context/AppContext';
import { AppViewTab } from '../types';
import {
  LayoutDashboard,
  Factory,
  Coffee,
  Layers,
  Users,
  Settings,
} from 'lucide-react';

export const NavigationTabs: React.FC = () => {
  const { activeTab, setActiveTab, suppliers, drinkStores, categories, storeCategories, currentUser } = useApp();

  // ซ่อนแถบนี้บนหน้าแรก (แดชบอร์ด) เพราะอยู่บน TAB เมนูโลโก้และกล่อง 4 กรอบหน้าแดชบอร์ดแล้ว
  if (activeTab === 'dashboard') {
    return null;
  }

  const isTopRole = currentUser.role === 'admin' || currentUser.role === 'editor';

  const navItems: Array<{ key: AppViewTab; label: string; icon: React.ReactNode; badge?: number }> = [
    {
      key: 'dashboard',
      label: 'หน้าหลักแดชบอร์ด',
      icon: <i className="fa-solid fa-house text-xs" />,
    },
    {
      key: 'suppliers',
      label: 'ซัพพลายเออร์',
      icon: <i className="fa-solid fa-industry text-xs text-emerald-600" />,
      badge: suppliers.length,
    },
    {
      key: 'drink_stores',
      label: 'ร้านน้ำ & เรฟ',
      icon: <i className="fa-solid fa-mug-hot text-xs text-amber-600" />,
      badge: drinkStores.length,
    },
    {
      key: 'categories',
      label: 'ส่องตามหมวดหมู่',
      icon: <i className="fa-solid fa-layer-group text-xs text-indigo-600" />,
      badge: categories.length + storeCategories.length,
    },
    {
      key: 'handoff',
      label: 'บริหารส่งต่อ',
      icon: <i className="fa-solid fa-people-arrows text-xs text-blue-600" />,
    },
    ...(isTopRole
      ? [
          {
            key: 'settings' as AppViewTab,
            label: 'ตั้งค่าระบบ',
            icon: <Settings className="w-3.5 h-3.5 text-slate-600" />,
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 py-2">
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 border border-slate-200/60'
                }`}
              >
                <span className={isActive ? 'text-white [&>svg]:text-white' : ''}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
