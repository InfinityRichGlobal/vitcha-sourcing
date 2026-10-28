import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  ShieldCheck, 
  UserPlus, 
  Copy, 
  Check, 
  KeyRound, 
  Users,
  X,
  Crown,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface InviteManagerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const InviteManagerModal: React.FC<InviteManagerModalProps> = ({
  isOpen = true,
  onClose,
}) => {
  const { 
    currentUser, 
    users, 
    deleteUser,
    invites, 
    createInvite, 
    deleteInvite,
    refreshCentralData,
    redeemInvite 
  } = useApp();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState<'generate' | 'redeem' | 'users'>('generate');

  const [selectedRole, setSelectedRole] = useState<UserRole>('reviewer');
  const [prefilledAlias, setPrefilledAlias] = useState('');
  const [generatedInvite, setGeneratedInvite] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [redeemName, setRedeemName] = useState('');
  const [redeemAlias, setRedeemAlias] = useState('');
  const [redeemPin, setRedeemPin] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const realUsers = users.filter((u) => !['user-beam', 'user-ann', 'user-mook'].includes(u.id));

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const inv = await createInvite(selectedRole, prefilledAlias.trim() || undefined);
    setGeneratedInvite(inv.code);
    setPrefilledAlias('');
  };

  const handleCopy = (code: string) => {
    const inv = invites.find((i) => i.code === code);
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    let fullLink = `${baseUrl}?invite=${code}`;
    if (inv) {
      fullLink += `&role=${inv.role}`;
      if (inv.prefilledAlias) {
        fullLink += `&alias=${encodeURIComponent(inv.prefilledAlias)}`;
      }
    }
    navigator.clipboard.writeText(fullLink);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (redeemPin.length !== 4 || isNaN(Number(redeemPin))) {
      alert('PIN ต้องเป็นตัวเลข 4 หลัก');
      return;
    }

    const user = redeemInvite(
      inviteCodeInput.trim().toUpperCase(),
      redeemName.trim(),
      redeemAlias.trim(),
      '',
      redeemPin
    );

    if (user) {
      setRedeemSuccess(true);
      setTimeout(() => setRedeemSuccess(false), 3000);
      setInviteCodeInput('');
      setRedeemName('');
      setRedeemAlias('');
      setRedeemPin('');
    } else {
      alert('รหัสคำเชิญไม่ถูกต้อง หรือถูกใช้งานไปแล้ว');
    }
  };

  const content = (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="font-bold text-base sm:text-lg text-slate-900 truncate">
              จัดการสิทธิ์ & ลิงก์คำเชิญ (Invite System)
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            เฉพาะเจ้าของระบบ: สร้างลิงก์เชิญ กำหนดสิทธิ์ 4 ระดับ และล็อกอินด้วยรหัส PIN 4 หลัก
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'generate'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            สร้างลิงก์เชิญ
          </button>
          <button
            onClick={() => setActiveTab('redeem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'redeem'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เปิดใช้คำเชิญ
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            สมาชิก ({realUsers.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Generate Invite */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">สร้างลิงก์เชิญใหม่</h3>
            </div>

            <form onSubmit={handleGenerate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  เลือกระดับสิทธิ์สำหรับผู้รับลิงก์ *
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { role: 'reviewer', title: 'Reviewer', desc: 'ทีมไทย: เมมโม+ปรับสถานะ' },
                    { role: 'editor', title: 'Editor', desc: 'ทีมสำรวจ: บันทึก+ถ่ายภาพ' },
                    { role: 'viewer', title: 'Viewer', desc: 'ดูและดาวน์โหลดเท่านั้น' },
                    { role: 'admin', title: 'Admin', desc: 'สิทธิ์สูงสุดคุมระบบ' },
                  ].map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedRole(r.role as UserRole)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedRole === r.role
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-xs">{r.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  กำหนดชื่อนามแฝงล่วงหน้า (ถ้าต้องการ):
                </label>
                <input
                  type="text"
                  placeholder="เช่น บีม R&D, แอน จัดซื้อ, นุ่น QC..."
                  value={prefilledAlias}
                  onChange={(e) => setPrefilledAlias(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
              >
                + สร้างลิงก์เชิญ 1-Click
              </button>
            </form>

            {generatedInvite && (
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 animate-in zoom-in-95">
                <div className="text-xs font-bold text-emerald-900 flex items-center justify-between">
                  <span>สร้างคำเชิญสำเร็จ!</span>
                  <span className="font-mono text-emerald-700 font-bold">{generatedInvite}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(generatedInvite)}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  {copiedCode === generatedInvite ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>คัดลอกลิงก์สำเร็จ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกลิงก์ส่งเข้า LINE</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* List of Invites */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">ประวัติลิงก์คำเชิญ ({invites.length})</h3>
              <button
                type="button"
                disabled={isRefreshing}
                onClick={async () => {
                  setIsRefreshing(true);
                  try {
                    await refreshCentralData();
                  } finally {
                    setTimeout(() => setIsRefreshing(false), 500);
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-all"
                title="รีเฟรชตรวจสอบสถานะล่าสุดจากเซิร์ฟเวอร์"
              >
                <RefreshCw className={`w-3 h-3 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>รีเฟรช</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto">
              {invites.map((inv) => (
                <div
                  key={inv.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {inv.code}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.2 rounded-full bg-slate-200 text-slate-700">
                        {inv.role}
                      </span>
                      {inv.isUsed ? (
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          🟢 สมัครแล้ว
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          🟡 ยังไม่ได้สมัคร
                        </span>
                      )}
                    </div>
                    {inv.prefilledAlias && (
                      <div className="text-[11px] text-slate-500 mt-1">
                        สำหรับ: {inv.prefilledAlias}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {!inv.isUsed && (
                      <button
                        onClick={() => handleCopy(inv.code)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors font-semibold text-[11px] flex items-center gap-1"
                      >
                        {copiedCode === inv.code ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode === inv.code ? 'คัดลอกแล้ว' : 'แชร์'}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`ต้องการลบรหัสคำเชิญ "${inv.code}" หรือไม่?`)) {
                          deleteInvite(inv.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="ลบคำเชิญนี้"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Redeem Invite */}
      {activeTab === 'redeem' && (
        <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">เปิดใช้งานคำเชิญ & ตั้ง PIN 4 หลัก</h3>
          </div>

          <form onSubmit={handleRedeem} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-600 block mb-1">รหัสคำเชิญ (Invite Code) *</label>
              <input
                type="text"
                placeholder="เช่น VITCHA-AB12C"
                value={inviteCodeInput}
                onChange={(e) => setInviteCodeInput(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono uppercase font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">ชื่อ-นามสกุลจริง *</label>
              <input
                type="text"
                placeholder="เช่น สมชาย ใจดี"
                value={redeemName}
                onChange={(e) => setRedeemName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">ชื่อนามแฝง (ที่แสดงในระบบ) *</label>
              <input
                type="text"
                placeholder="เช่น บีม R&D"
                value={redeemAlias}
                onChange={(e) => setRedeemAlias(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">ตั้งรหัสผ่าน PIN 4 หลัก *</label>
              <input
                type="password"
                maxLength={4}
                placeholder="•••• (ตัวเลข 4 หลัก)"
                value={redeemPin}
                onChange={(e) => setRedeemPin(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-center tracking-widest text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
            >
              ยืนยันการเข้าร่วมระบบ
            </button>
          </form>

          {redeemSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-center font-bold text-xs">
              🎉 ลงทะเบียนสำเร็จ! เข้าสู่ระบบในฐานะสมาชิกใหม่เรียบร้อยแล้ว
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Users List (ซ่อน Account จำลอง ช่างบีม/แอน/มุก ไว้ใช้เฉพาะปุ่มจำลอง) */}
      {activeTab === 'users' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">สมาชิกจริงในทีม ({realUsers.length} คน)</h3>
                <span className="text-xs text-slate-400">ควบคุมด้วยสิทธิ์ RBAC</span>
              </div>
              <button
                type="button"
                disabled={isRefreshing}
                onClick={async () => {
                  setIsRefreshing(true);
                  try {
                    await refreshCentralData();
                  } finally {
                    setTimeout(() => setIsRefreshing(false), 500);
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-all"
                title="ดึงสมาชิกล่าสุดจากเซิร์ฟเวอร์ Render"
              >
                <RefreshCw className={`w-3 h-3 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>ดึงสมาชิกล่าสุด</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {realUsers.map((u) => {
              const isSuperAdmin = u.id === 'user-ice';
              return (
                <div
                  key={u.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img src={u.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 truncate">{u.alias}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold">
                          {u.role}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 truncate">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">{u.emailOrId || 'PIN: ••••'}</div>
                    </div>
                  </div>

                  {!isSuperAdmin && currentUser.role === 'admin' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`ยืนยันการลบสมาชิก "${u.alias}" ออกจากระบบหรือไม่?`)) {
                          deleteUser(u.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                      title="ลบสมาชิกนี้ออกจากระบบ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {isSuperAdmin && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded shrink-0">
                      ผู้ก่อตั้ง
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // If used as modal
  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
        <div className="bg-white border border-slate-200/90 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto p-4 sm:p-6 text-slate-900 max-h-[92vh] overflow-y-auto">
          <div className="flex justify-end pb-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 space-y-4 animate-in fade-in">
      {content}
    </div>
  );
};
