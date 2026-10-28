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
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
      {/* Ambient Radial Glow Effect for Luxury Visual Feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 bg-white border border-slate-200/90 w-full max-w-[390px] sm:max-w-md rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-8 space-y-5 animate-in zoom-in-95 text-slate-900 my-auto">
        {/* Platform Branding */}
        <div className="text-center space-y-2.5">
          <div className="relative inline-block mx-auto">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover mx-auto border border-slate-200 shadow-md ring-4 ring-emerald-50"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center shadow-xs">
              <Lock className="w-3 h-3 stroke-[2.5]" />
            </span>
          </div>

          <div>
            <h2 className="font-black text-xl sm:text-2xl text-slate-950 tracking-tight">
              ฉันจะเป็นหัวแถว
            </h2>
            <p className="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-wider mt-0.5">
              VIT CHA & VITAMINZAAR · SOURCING PLATFORM
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200/70">
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
            <div className="relative flex items-center">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-slate-400">
                <User className="w-4 h-4" />
              </div>
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
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              รหัสผ่าน หรือ PIN (Password / PIN)
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
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
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 flex items-center justify-center transition-colors"
                title={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 text-sm font-extrabold rounded-xl bg-slate-950 hover:bg-slate-800 text-white shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>เข้าสู่ระบบ (Sign In)</span>
          </button>
        </form>

        {/* Invite Code Option */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-1">
          <span>ยังไม่มีบัญชีในระบบ?</span>
          <button
            type="button"
            onClick={() => {
              if (onOpenInvite) onOpenInvite();
            }}
            className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold transition-colors"
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
