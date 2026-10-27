import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, ChevronRight } from 'lucide-react';

interface NotificationToastProps {
  onSelectItem?: (targetId: string, type: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ onSelectItem }) => {
  const { activeToast, dismissToast } = useApp();

  if (!activeToast) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-3 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-3 shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex items-start gap-3 text-slate-900 cursor-pointer">
        {/* Avatar or Icon */}
        <div className="relative shrink-0 mt-0.5">
          {activeToast.avatar ? (
            <img
              src={activeToast.avatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[7px] text-white">
            •
          </span>
        </div>

        {/* Content */}
        <div
          className="min-w-0 flex-1"
          onClick={() => {
            if (activeToast.targetId && onSelectItem) {
              onSelectItem(activeToast.targetId, activeToast.type);
            }
            dismissToast();
          }}
        >
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h4 className="font-bold text-xs text-slate-900 truncate">
              {activeToast.title}
            </h4>
            <span className="text-[10px] text-slate-400 font-mono shrink-0">
              เมื่อสักครู่
            </span>
          </div>
          <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
            {activeToast.message}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissToast();
          }}
          className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
