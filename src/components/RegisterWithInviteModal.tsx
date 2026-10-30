import { AvatarImage } from './AvatarImage';
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { compressImageFile } from '../utils/imageCompressor';
import { requestJson } from '../services/api';
import { UserRole } from '../types';
import {
  ShieldCheck,
  Ticket,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface RegisterWithInviteModalProps {
  isOpen: boolean;
  inviteCode: string;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterWithInviteModal: React.FC<RegisterWithInviteModalProps> = ({
  isOpen,
  inviteCode,
  onClose,
  onSwitchToLogin,
}) => {
  const { invites, registerUserWithInvite } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [verifiedInvite, setVerifiedInvite] = useState<{ role: UserRole; prefilledAlias?: string } | null>(null);
  const initialRole = verifiedInvite?.role || 'editor';
  const [name, setName] = useState('');
  const [usernameOrId, setUsernameOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    setVerifiedInvite(null); setError(null);
    requestJson(`/api/invite/${encodeURIComponent(inviteCode)}`, { signal: controller.signal })
      .then(data => { if (!controller.signal.aborted) { setVerifiedInvite(data); setName(data.prefilledAlias || ""); } })
      .catch(error => { if (!controller.signal.aborted) setError(error.message); });
    return () => controller.abort();
  }, [isOpen, inviteCode]);

  if (!isOpen) return null;

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setError(null);
      const compressed = await compressImageFile(file, 400, 0.82);
      if (compressed) {
        setAvatar(compressed);
      } else {
        setError('ไม่สามารถประมวลผลรูปภาพได้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch {
      setError('เกิดข้อผิดพลาดในการโหลดรูปภาพ');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (isSubmitting || isCompressing || !verifiedInvite) return;

    // Strict validation: บังคับทุกฟิลด์ตามคำสั่ง
    if (!name.trim()) {
      setError('กรุณาระบุชื่อ-นามสกุล หรือฉายาที่ต้องการแสดงในระบบ (จำเป็น)');
      return;
    }

    if (!usernameOrId.trim()) {
      setError('กรุณาระบุไอดี Username หรือ Email สำหรับใช้ล็อกอินครั้งถัดไป (จำเป็น)');
      return;
    }

    if (!password.length) {
      setError('กรุณากำหนดรหัสผ่าน');
      return;
    }

    if (!avatar) {
      setError('กรุณาอัปโหลดรูปภาพโปรไฟล์ของคุณ (ระบบบังคับทุกฟิลด์)');
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUserWithInvite(
        inviteCode,
        name.trim(),
        name.trim(),
        usernameOrId.trim(),
        password,
        avatar,
        initialRole
      );

      // Clean the URL query params so reloading stays logged in
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      setIsSuccess(true);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'สมัครไม่สำเร็จ');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 bg-white border border-slate-200/90 w-full max-w-md rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] p-6 sm:p-8 space-y-5 animate-in zoom-in-95 text-slate-900 my-auto">
        {/* Brand & Verification Badge */}
        <div className="text-center space-y-2">
          <div className="relative inline-block mx-auto">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-14 h-14 rounded-2xl mx-auto shadow-md object-cover border-2 border-emerald-500/20"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-sm ring-2 ring-white">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              ลงทะเบียนผ่านบัตรเทียบเชิญ
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ระบบฐานข้อมูลซัพพลายเออร์ & สเปกเครื่องดื่ม "ฉันจะเป็นหัวแถว"
            </p>
          </div>

          {/* Verified Invite Ticket Card */}
          <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-3 flex items-center justify-between text-left mt-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Ticket className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <span>{verifiedInvite ? 'ตรวจสอบคำเชิญแล้ว' : error ? 'ไม่สามารถใช้คำเชิญนี้' : 'กำลังตรวจสอบคำเชิญ'}</span>
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="text-sm font-mono font-black text-slate-900 tracking-wide truncate">
                  {inviteCode}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload (MANDATORY) */}
          <div className="flex flex-col items-center justify-center pt-1">
            <label className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
              <span>ภาพประจำตัวโปรไฟล์</span>
              <span className="text-red-500 font-extrabold">* (บังคับอัปโหลด)</span>
            </label>

            <div className="relative group">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-24 h-24 rounded-full overflow-hidden border-2 transition-all flex items-center justify-center ${
                  avatar
                    ? 'border-emerald-500 ring-4 ring-emerald-500/15 shadow-md'
                    : 'border-dashed border-red-400 bg-red-50/50 hover:bg-red-50'
                }`}
              >
                {avatar ? (
                  <AvatarImage
                    src={avatar}
                    alt="รูปโปรไฟล์"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2 text-slate-400 flex flex-col items-center gap-1">
                    <Camera className="w-6 h-6 text-red-400" />
                    <span className="text-[10px] font-bold text-red-600 leading-tight">
                      แตะเพื่อเลือกภาพ
                    </span>
                  </div>
                )}

                {isCompressing && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                    ประมวลผล...
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md ring-2 ring-white transition-transform active:scale-95"
                title="เลือกรูปภาพจากเครื่องหรือถ่ายใหม่"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{avatar ? 'เปลี่ยนรูปโปรไฟล์' : 'เลือกรูปภาพจากมือถือ / ถ่ายภาพ'}</span>
              </button>
            </div>

            {/* Hidden Input for Mobile Gallery & Camera */}
            <input
              ref={fileInputRef}
              type="file" disabled={isCompressing || isSubmitting}
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFile}
            />
          </div>

          {/* 1. Name / Alias (Pre-filled but editable) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>ชื่อ-นามสกุล หรือ ฉายาในระบบ <span className="text-red-500">*</span></span>
              <span className="text-[10px] text-emerald-600 font-semibold">(แก้ไขได้)</span>
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น ช่างบีม (วิศวกร) หรือ คุณแอน (จัดซื้อ)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                required
              />
            </div>
            <p className="text-[10px] text-slate-400 pl-1">
              ใช้ชื่อที่ทีมรู้จัก เพื่อระบุผู้บันทึกและผู้รับผิดชอบงานได้ง่าย
            </p>
          </div>

          {/* 2. Username / Email ID (Required) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>ไอดีผู้ใช้งาน (Username หรือ Email)</span>
              <span className="text-red-500">* (บังคับ)</span>
            </label>
            <div className="relative">
              <span className="text-slate-400 font-mono font-bold text-xs absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                @
              </span>
              <input
                type="text"
                value={usernameOrId}
                onChange={(e) => setUsernameOrId(e.target.value)}
                placeholder="เช่น beam_engineer หรือ user@vitcha.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
                required
              />
            </div>
            <p className="text-[10px] text-slate-400 pl-1">
              จดจำไอดีนี้ไว้สำหรับกรอกเข้าสู่ระบบครั้งถัดไป
            </p>
          </div>

          {/* 3. Password / PIN (Required, min 4 chars) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>รหัสผ่าน หรือ PIN</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="กำหนดรหัสผ่านสำหรับบัญชีของคุณ"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
                required

              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                title={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCompressing || isSuccess || isSubmitting || !verifiedInvite}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm mt-3"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                <span>สมัครสำเร็จ กำลังเข้าสู่ระบบ...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>ยืนยันการสมัคร & เข้าสู่ระบบทันที</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch to regular login if user already has credentials */}
        {onSwitchToLogin && (
          <div className="pt-2 text-center border-t border-slate-100">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-xs text-slate-500 hover:text-emerald-700 font-semibold transition-colors"
            >
              มีบัญชีในระบบอยู่แล้ว? <span className="text-emerald-600 underline">เข้าสู่ระบบแทน</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
