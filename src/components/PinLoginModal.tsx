import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, AlertCircle } from 'lucide-react';

interface PinLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PinLoginModal: React.FC<PinLoginModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, switchUser } = useApp();
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
      setError(null);
      setPinInput('');
      onClose();
    } else {
      setError('รหัส PIN 4 หลักไม่ถูกต้อง');
      setPinInput('');
    }
  };

  const activeTargetUser = users.find((u) => u.id === selectedUserId) || users[0];

  return (
    <div className="fixed inset-0 z-70 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/90 w-full max-w-sm rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 space-y-4 animate-in zoom-in-95 text-slate-900">
        <div className="text-center space-y-1">
          <img
            src="./logo.jpg"
            alt="ฉันจะเป็นหัวแถว"
            className="w-14 h-14 rounded-2xl object-cover mx-auto mb-2 border border-slate-200 shadow-xs"
          />
          <h3 className="font-bold text-base text-slate-900">ยืนยันตัวตนเข้าระบบ (PIN)</h3>
          <p className="text-xs text-slate-500">เลือกโปรไฟล์และใส่รหัส PIN 4 หลักเพื่อเข้าสู่ระบบ</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">เลือกผู้ใช้งาน:</label>
            <div className="grid grid-cols-2 gap-2">
              {users.map((u) => (
                <button
                  type="button"
                  key={u.id}
                  onClick={() => {
                    setSelectedUserId(u.id);
                    setError(null);
                  }}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                    selectedUserId === u.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <img src={u.avatar} className="w-6 h-6 rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1 truncate">
                    <div className="text-xs font-bold truncate text-slate-800">{u.alias}</div>
                    <div className="text-[9px] uppercase font-mono text-slate-400">{u.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <label className="text-xs text-slate-700 font-bold flex items-center justify-between">
              <span>ใส่รหัส PIN 4 หลัก:</span>
              <span className="text-[10px] text-slate-400 font-mono">DEFAULT: {activeTargetUser.pin}</span>
            </label>
            <input
              type="password"
              maxLength={4}
              required
              autoFocus
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-2xl font-mono font-extrabold tracking-widest text-emerald-700 shadow-inner focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-95 transition-all"
          >
            ปลดล็อกเข้าระบบ
          </button>
        </form>
      </div>
    </div>
  );
};
