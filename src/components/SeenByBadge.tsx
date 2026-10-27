import React, { useState } from 'react';
import { ViewLogEntry } from '../types';
import { useApp } from '../context/AppContext';
import { Eye, Clock, ShieldCheck, X, CheckCircle2 } from 'lucide-react';

interface SeenByBadgeProps {
  viewedBy?: ViewLogEntry[];
  size?: 'sm' | 'md';
}

export const SeenByBadge: React.FC<SeenByBadgeProps> = ({ viewedBy = [], size = 'sm' }) => {
  const { currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = currentUser.role === 'admin';
  const viewers = Array.isArray(viewedBy) ? viewedBy : [];

  if (viewers.length === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium">
        <Eye className="w-3 h-3" />
        <span>ยังไม่มีคนเปิดดู</span>
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        title={
          isAdmin
            ? 'แตะเพื่อดูรายชื่อผู้ที่อ่านแล้ว และวันเวลาล่าสุด (สิทธิ์ Admin)'
            : 'แตะเพื่อดูรายชื่อผู้ที่อ่านรายการนี้แล้ว'
        }
        className={`inline-flex items-center gap-1.5 rounded-full transition-all active:scale-95 ${
          size === 'md'
            ? 'px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-xs'
            : 'px-2 py-0.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-[10px]'
        }`}
      >
        <div className="flex items-center -space-x-1.5">
          {viewers.slice(0, 4).map((v) => (
            <img
              key={v.userId}
              src={v.avatar}
              alt={v.alias}
              className={`${
                size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
              } rounded-full object-cover ring-1 ring-white shadow-2xs`}
            />
          ))}
        </div>
        <span className="font-semibold text-slate-600 flex items-center gap-0.5">
          <Eye className="w-2.5 h-2.5 text-emerald-600" />
          <span>อ่านแล้ว {viewers.length}</span>
        </span>
      </button>

      {/* Seen-By Log Inspector Modal */}
      {isOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="fixed inset-0 z-[70] bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 text-slate-900"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">
                    บันทึกการเปิดอ่าน (Read Receipts)
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {isAdmin
                      ? 'มุมมอง Admin: แสดงวันและเวลาล่าสุดที่แต่ละคนกดดู'
                      : `อ่านแล้วทั้งหมด ${viewers.length} คน`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-500 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Viewer List */}
            <div className="p-3.5 space-y-2 max-h-72 overflow-y-auto">
              {viewers.map((v) => {
                const formattedDate = new Date(v.lastViewedAt).toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: '2-digit',
                });
                const formattedTime = new Date(v.lastViewedAt).toLocaleTimeString('th-TH', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });

                return (
                  <div
                    key={v.userId}
                    className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={v.avatar}
                          alt={v.alias}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                          <CheckCircle2 className="w-2 h-2 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                          <span>{v.alias}</span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-600">
                            {v.role}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{v.name}</div>
                      </div>
                    </div>

                    {/* Admin-Only Detailed Timestamp & View Counter */}
                    {isAdmin ? (
                      <div className="text-right shrink-0 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
                        <div className="flex items-center justify-end gap-1 text-[10px] font-mono font-bold text-emerald-700">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{formattedTime} น.</span>
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">
                          {formattedDate} · ดู {v.viewCount || 1} ครั้ง
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                        อ่านแล้ว ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {isAdmin && (
              <div className="px-4 py-2 bg-slate-900 text-white text-[10px] flex items-center justify-between">
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>สิทธิ์ผู้บริหาร (Admin Audit Log)</span>
                </span>
                <span className="text-slate-400">บันทึกอัตโนมัติเมื่อเปิดดู</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
