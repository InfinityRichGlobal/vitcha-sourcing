import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCheck, Factory, Coffee, MessageSquare, Flame } from 'lucide-react';

interface NotificationSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (targetId: string, type: string) => void;
}

export const NotificationSheetModal: React.FC<NotificationSheetModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const { notifications, markAllNotificationsRead } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'supplier':
        return <Factory className="w-3.5 h-3.5 text-emerald-600" />;
      case 'drink_store':
        return <Coffee className="w-3.5 h-3.5 text-amber-600" />;
      case 'reply':
      case 'comment':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
      case 'status':
        return <Flame className="w-3.5 h-3.5 text-orange-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white border border-slate-200/90 w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-slate-900 animate-in slide-in-from-bottom-6 sm:zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
              <Bell className="w-4 h-4 text-slate-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                การแจ้งเตือนในระบบ ({notifications.length})
              </h3>
              <p className="text-[11px] text-slate-400">
                อัปเดตแบบเรียลไทม์จากสมาชิกในทีมทุกคน
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-1"
              title="อ่านทั้งหมด"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>อ่านหมดแล้ว</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              ยังไม่มีการแจ้งเตือนใหม่ในระบบ
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  if (notif.targetId) {
                    onSelectItem(notif.targetId, notif.type);
                    onClose();
                  }
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                  notif.read
                    ? 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                    : 'bg-emerald-50/40 border-emerald-100/80 text-slate-900 hover:bg-emerald-50/70 shadow-sm'
                }`}
              >
                <div className="relative shrink-0 mt-0.5">
                  {notif.avatar ? (
                    <img
                      src={notif.avatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                      {getIcon(notif.type)}
                    </div>
                  )}
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shadow-xs">
                    {getIcon(notif.type)}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-bold text-slate-900 truncate">
                      {notif.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">
                      {new Date(notif.timestamp).toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
