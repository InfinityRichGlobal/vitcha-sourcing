import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { compressImageFile } from '../utils/imageCompressor';
import { X, Camera, ShieldCheck, KeyRound, Check, LogOut, User } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUserProfile, logout } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [alias, setAlias] = useState(currentUser.alias || '');
  const [emailOrId, setEmailOrId] = useState(currentUser.emailOrId || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [pin, setPin] = useState(currentUser.pin || '');
  const [isSaved, setIsSaved] = useState(false);

  // Sync form state whenever currentUser changes or modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || '');
      setAlias(currentUser.alias || '');
      setEmailOrId(currentUser.emailOrId || '');
      setAvatar(currentUser.avatar || '');
      setPin(currentUser.pin || '');
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImageFile(file, 320, 0.82);
    if (compressed) {
      setAvatar(compressed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim()) {
      alert('กรุณากรอกชื่อนามแฝงที่จะแสดงบนระบบ');
      return;
    }
    if (!pin.trim() || pin.trim().length < 4) {
      alert('รหัสผ่าน / PIN ต้องมีอย่างน้อย 4 ตัวอักษรหรือตัวเลข');
      return;
    }

    updateCurrentUserProfile(
      name.trim() || alias.trim(),
      alias.trim(),
      avatar,
      pin.trim(),
      emailOrId.trim() || currentUser.emailOrId
    );
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/45 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 text-slate-900 my-auto">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 text-sm">แก้ไขโปรไฟล์ ชื่อ & รหัสผ่าน</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center gap-2">
            <label className="relative group cursor-pointer">
              <img
                src={avatar}
                alt={alias}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md"
              />
              <span className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                <Camera className="w-6 h-6" />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
            <label className="text-xs text-emerald-700 font-bold cursor-pointer hover:underline flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              <span>แตะเพื่อเปลี่ยนรูปโปรไฟล์ (อัปเดตทันทีทุกจุด)</span>
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
              ชื่อที่แสดงบน Header & ทุกโพสต์ (Display Name / Alias) *
            </label>
            <input
              type="text"
              required
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="เช่น คุณไอซ์ (Admin)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Username หรือ Email สำหรับล็อกอิน
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
                placeholder="เช่น ice@vitcha.com หรือ ice"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 font-mono"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              ชื่อ-นามสกุล / ตำแหน่งเต็ม
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                <span>รหัสผ่าน / PIN สำหรับล็อกอิน</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">PASSWORD / PIN</span>
            </div>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-lg font-mono font-extrabold tracking-widest text-emerald-700 focus:outline-none focus:border-emerald-500 shadow-inner"
            />
          </div>

          <div className="text-[11px] text-slate-400 text-center">
            ระดับสิทธิ์ปัจจุบัน:{' '}
            <strong className="text-slate-800 uppercase font-mono">{currentUser.role}</strong>
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
