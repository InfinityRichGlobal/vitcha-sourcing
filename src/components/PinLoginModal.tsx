import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, AlertCircle, ShieldCheck, Ticket, User, Eye, EyeOff } from 'lucide-react';

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
  const { loginWithCredentials } = useApp();
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('กรุณากรอก Username หรือ Email ของคุณ');
      return;
    }
    if (!password.trim()) {
      setError('กรุณากรอกรหัสผ่านหรือ PIN');
      return;
    }

    const success = loginWithCredentials(identifier.trim(), password.trim());
    if (success) {
      setError(null);
      setIdentifier('');
      setPassword('');
      if (onClose) onClose();
    } else {
      setError('Username / Email หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200/90 w-full max-w-sm sm:max-w-md rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] p-6 sm:p-8 space-y-5 animate-in zoom-in-95 text-slate-900 my-auto">
        {/* Platform Branding */}
        <div className="text-center space-y-2">
          <div className="relative inline-block mx-auto">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-16 h-16 rounded-2xl object-cover mx-auto border border-slate-200 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 rounded-full text-white shadow-xs">
              <Lock className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <h2 className="font-extrabold text-xl sm:text-2xl text-slate-950 tracking-tight">
              ฉันจะเป็นหัวแถว
            </h2>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              VIT CHA & VITAMINZAAR · SOURCING PLATFORM
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>เข้าสู่ระบบก่อนเข้าถึงข้อมูล</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 flex items-center gap-2 animate-in shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Secure Login Form (Username / Email + Password / PIN) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              ชื่อผู้ใช้ หรือ อีเมล (Username / Email)
            </label>
            <div className="relative">
              <input
                type="text"
                autoComplete="username"
                autoFocus
                required
                placeholder="เช่น ice@vitcha.com หรือ ice"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setError(null);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9.5 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              รหัสผ่าน หรือ PIN (Password / PIN)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="กรอกรหัสผ่าน หรือ PIN"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9.5 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                title={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs sm:text-sm font-bold rounded-xl bg-slate-950 hover:bg-slate-800 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>เข้าสู่ระบบ (Sign In)</span>
          </button>
        </form>

        {/* Invite Code Option */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>ยังไม่มีบัญชีในระบบ?</span>
          <button
            type="button"
            onClick={() => {
              if (onOpenInvite) onOpenInvite();
            }}
            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>กรอกรหัสคำเชิญ (Invite Code)</span>
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
