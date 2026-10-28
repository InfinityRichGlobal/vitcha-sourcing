import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Camera, ShieldCheck, KeyRound, Check, LogOut } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUserProfile, logout } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [alias, setAlias] = useState(currentUser.alias);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [pin, setPin] = useState(currentUser.pin);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim()) {
      alert('กรุณากรอกชื่อนามแฝง');
      return;
    }
    if (pin.length !== 4 || isNaN(Number(pin))) {
      alert('รหัส PIN ต้องเป็นตัวเลข 4 หลักเท่านั้น');
      return;
    }

    updateCurrentUserProfile(name.trim(), alias.trim(), avatar, pin);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/90 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 text-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 text-sm">แก้ไขข้อมูลโปรไฟล์ & PIN</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative group">
              <img
                src={avatar}
                alt={alias}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md"
              />
              <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity">
                <Camera className="w-6 h-6" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <label className="text-xs text-emerald-700 font-semibold cursor-pointer hover:underline">
              แตะเพื่อเลือกรูปโปรไฟล์จากอัลบั้มในเครื่อง หรือถ่ายรูปใหม่
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              ชื่อนามแฝง (Alias) ที่จะโชว์บนทุกโน้ต *
            </label>
            <input
              type="text"
              required
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">ชื่อ-นามสกุลจริง</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                <span>รหัสผ่าน PIN 4 หลักสำหรับล็อกอิน</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">4 DIGITS</span>
            </div>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-xl font-mono font-extrabold tracking-widest text-emerald-700 focus:outline-none focus:border-emerald-500 shadow-inner"
            />
          </div>

          <div className="text-[11px] text-slate-400 text-center">
            ระดับสิทธิ์ปัจจุบัน: <strong className="text-slate-800 uppercase font-mono">{currentUser.role}</strong>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('คุณต้องการออกจากระบบหรือไม่?')) {
                  logout();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ออกจากระบบ</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 transition-all"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>บันทึกแล้ว!</span>
                  </>
                ) : (
                  <span>บันทึกข้อมูล</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
