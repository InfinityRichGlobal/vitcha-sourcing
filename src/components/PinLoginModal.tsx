import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, AlertCircle, ShieldCheck, Ticket } from 'lucide-react';

interface PinLoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  isGate?: boolean;
  onOpenInvite?: () => void;
}

export const PinLoginModal: React.FC<PinLoginModalProps> = ({
  isOpen,
  onClose,
  isGate = false,
  onOpenInvite,
}) => {
  const { users, currentUser, switchUser, loginWithPin } = useApp();
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser.id);
  const [pinInput, setPinInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUser = users.find((u) => u.id === selectedUserId);
    if (!targetUser) return;

    if (targetUser.pin === pinInput) {
      switchUser(targetUser.id);
      loginWithPin(targetUser.id, pinInput);
      setError(null);
      setPinInput('');
      if (onClose) onClose();
    } else {
      setError('รหัส PIN 4 หลักไม่ถูกต้อง (ดูรหัสเริ่มต้นที่ระบุใต้ชื่อได้ครับ)');
      setPinInput('');
    }
  };

  const activeTargetUser = users.find((u) => u.id === selectedUserId) || users[0];

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in`}
    >
      <div className="bg-white border border-slate-200/90 w-full max-w-sm sm:max-w-md rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] p-5 sm:p-7 space-y-4 animate-in zoom-in-95 text-slate-900 my-auto">
        <div className="text-center space-y-2">
          <div className="relative inline-block mx-auto">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-emerald-500/20 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 rounded-full text-white shadow-xs">
              <Lock className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight">
              ฉันจะเป็นหัวแถว
            </h2>
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              VIT CHA & VITAMINZAAR · SOURCING PLATFORM
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>เข้าสู่ระบบก่อนเข้าถึงข้อมูล (PIN Verification)</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              เลือกผู้ใช้งานประจำทีม:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {users.map((u) => {
                const isSelected = selectedUserId === u.id;
                return (
                  <button
                    type="button"
                    key={u.id}
                    onClick={() => {
                      setSelectedUserId(u.id);
                      setError(null);
                    }}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30 shadow-xs'
                        : 'bg-slate-50 border-slate-200/90 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={u.avatar}
                      alt={u.alias}
                      className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-300"
                    />
                    <div className="min-w-0 flex-1 truncate">
                      <div className="text-xs font-bold truncate text-slate-900">{u.alias}</div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span className="uppercase">{u.role}</span>
                        <span className="text-emerald-700 font-bold">PIN:{u.pin}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-800 font-bold">
                ใส่รหัส PIN 4 หลักของ {activeTargetUser.alias}:
              </label>
              <span className="text-[10px] text-slate-500 font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                รหัส: {activeTargetUser.pin}
              </span>
            </div>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              required
              autoFocus
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-center text-2xl font-mono font-extrabold tracking-widest text-emerald-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold rounded-xl bg-slate-950 hover:bg-slate-800 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>ปลดล็อกเข้าสู่ระบบ</span>
          </button>
        </form>

        {/* Invite Code Option */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>ยังไม่มีชื่อในรายชื่อ?</span>
          <button
            type="button"
            onClick={() => {
              if (onOpenInvite) onOpenInvite();
            }}
            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>กรอกรหัสคำเชิญ (Invite)</span>
          </button>
        </div>

        {!isGate && onClose && (
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
