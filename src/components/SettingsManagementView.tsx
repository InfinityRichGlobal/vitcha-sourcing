import { AvatarImage } from './AvatarImage';
import React, { useState, useEffect } from 'react';
import { requestJson, sendJson, getDriveStatusApi, saveDriveConfigApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

import {
  Settings,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Tag,
  Zap,
  ShieldCheck,
  Copy,
  Users,
  Lock,
  Layers,
  Coffee,
  Database,
  RotateCcw,
  Cloud,
  Server,
  Flame,
  Globe,
  RefreshCw,
  Loader2,
} from 'lucide-react';

export const SettingsManagementView: React.FC = () => {
  const {
    currentUser,
    simulatedFromAdmin,
    categories,
    addCategory,
    editCategory,
    deleteCategory,
    storeCategories,
    addStoreCategory,
    editStoreCategory,
    deleteStoreCategory,
    quickTagsList,
    addQuickTag,
    editQuickTag,
    deleteQuickTag,
    quickMessages,
    addQuickMessage,
    editQuickMessage,
    deleteQuickMessage,
    users,
    updateUserRole,
    deleteUser,
    invites,
    createInvite,
    deleteInvite,
    refreshCentralData,
    isMockLoading,
    isClearing,
    loadFullMockupData,
    resetSystemData,
    clearMockupOnly,
    suppliers,
    drinkStores,
    renderStatus,
    renderServerUrl,
    setRenderServerUrl,
    testRenderConnection,
    syncAllDataToRender,
  } = useApp();

  const [isRefreshingUsers, setIsRefreshingUsers] = useState(false);

  // Content settings are managed by admins.
  const hasPermission = currentUser.role === 'admin';

  // Supplier Category states
  const [newCategory, setNewCategory] = useState('');
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editCatValue, setEditCatValue] = useState('');

  // Drink Store Category states
  const [newStoreCategory, setNewStoreCategory] = useState('');
  const [editingStoreCat, setEditingStoreCat] = useState<string | null>(null);
  const [editStoreCatValue, setEditStoreCatValue] = useState('');

  // Quick-Tap Tag states ("แตะเลือกจุดเด่นทางลัด")
  const [newQuickTag, setNewQuickTag] = useState('');
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editTagValue, setEditTagValue] = useState('');

  // Quick Message states
  const [qmTitle, setQmTitle] = useState('');
  const [qmText, setQmText] = useState('');
  const [editingQmId, setEditingQmId] = useState<string | null>(null);
  const [editQmTitle, setEditQmTitle] = useState('');
  const [editQmText, setEditQmText] = useState('');

  // Invite states
  const [inviteRole, setInviteRole] = useState<UserRole>('reviewer');
  const [inviteAlias, setInviteAlias] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Render Central Server states
  const [editingRenderUrl, setEditingRenderUrl] = useState(renderServerUrl);
  const [renderTestResult, setRenderTestResult] = useState<{ ok: boolean; message: string; count?: any } | null>(null);
  const [isTestingRender, setIsTestingRender] = useState(false);
  const [isSyncingRender, setIsSyncingRender] = useState(false);
  const [renderSyncMsg, setRenderSyncMsg] = useState<string | null>(null);

  // Google Drive CENTER states (exclusive to primary account)
  const [driveStatus, setDriveStatus] = useState<{
    configured?: boolean;
    connected?: boolean;
    folderId?: string;
    user?: { emailAddress?: string; displayName?: string };
    storageQuota?: { usage?: string; limit?: string };
    error?: string;
    message?: string;
  } | null>(null);
  const [driveClientId, setDriveClientId] = useState('');
  const [driveClientSecret, setDriveClientSecret] = useState('');
  const [driveRefreshToken, setDriveRefreshToken] = useState('');
  const [driveFolderId, setDriveFolderId] = useState('1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1');
  const [isSavingDrive, setIsSavingDrive] = useState(false);
  const [driveMsg, setDriveMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [showDriveForm, setShowDriveForm] = useState(false);
  const [showOwnerTools, setShowOwnerTools] = useState(true);

  useEffect(() => {
    if (currentUser.id === 'user-ice' && !simulatedFromAdmin) {
      getDriveStatusApi()
        .then((res) => {
          setDriveStatus(res);
          if (res?.folderId) setDriveFolderId(res.folderId);
        })
        .catch(() => {});
    }
  }, [currentUser.id, simulatedFromAdmin]);

  const handleSaveDriveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingDrive(true);
    setDriveMsg(null);
    try {
      const res = await saveDriveConfigApi({
        clientId: driveClientId,
        clientSecret: driveClientSecret,
        refreshToken: driveRefreshToken,
        folderId: driveFolderId || '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1',
      });
      setDriveStatus(res);
      setDriveMsg({ ok: true, text: '✅ บันทึกและเชื่อมต่อ Google Drive CENTER สำเร็จแล้ว!' });
      setShowDriveForm(false);
    } catch (err) {
      setDriveMsg({
        ok: false,
        text: err instanceof Error ? err.message : 'เชื่อมต่อ Google Drive ไม่สำเร็จ',
      });
    } finally {
      setIsSavingDrive(false);
    }
  };

  const handleTestRender = async () => {
    setIsTestingRender(true);
    setRenderTestResult(null);
    try {
      const res = await testRenderConnection(editingRenderUrl);
      setRenderTestResult(res);
    } finally {
      setIsTestingRender(false);
    }
  };

  const handleSaveRenderUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setRenderServerUrl(editingRenderUrl);
    handleTestRender();
  };

  const handleForceSyncRender = async () => {
    setIsSyncingRender(true);
    setRenderSyncMsg(null);
    try {
      const ok = await syncAllDataToRender();
      if (ok) {
        setRenderSyncMsg('✅ ดึงข้อมูลล่าสุดจากเซิร์ฟเวอร์ Render เรียบร้อยแล้ว!');
      } else {
        setRenderSyncMsg('❌ ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setIsSyncingRender(false);
    }
  };

  if (!hasPermission) return null;

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    if (!await addCategory(newCategory.trim())) return;
    setNewCategory('');
  };

  const handleSaveCategoryEdit = async (oldCat: string) => {
    if (editCatValue.trim() && editCatValue.trim() !== oldCat) {
      if (!await editCategory(oldCat, editCatValue.trim())) return;
    }
    setEditingCat(null);
  };

  const handleAddStoreCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreCategory.trim()) return;
    if (!await addStoreCategory(newStoreCategory.trim())) return;
    setNewStoreCategory('');
  };

  const handleSaveStoreCategoryEdit = async (oldCat: string) => {
    if (editStoreCatValue.trim() && editStoreCatValue.trim() !== oldCat) {
      if (!await editStoreCategory(oldCat, editStoreCatValue.trim())) return;
    }
    setEditingStoreCat(null);
  };

  const handleAddQuickTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuickTag.trim()) return;
    if (!await addQuickTag(newQuickTag.trim())) return;
    setNewQuickTag('');
  };

  const handleExportJson = async () => {
    try {
      const data = await requestJson('/api/backup');
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a'); link.href = url; link.download = `vitcha-backup-${new Date().toISOString().slice(0, 10)}.json`; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) { alert(error instanceof Error ? error.message : 'สำรองข้อมูลไม่สำเร็จ'); }
  };
  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      const snapshot = JSON.parse(await file.text());
      if (!window.confirm('นำเข้ารายการจากไฟล์นี้แทนรายการปัจจุบันหรือไม่? บัญชีสมาชิกและคำเชิญจะคงเดิม')) return;
      const current = await requestJson('/api/data');
      await sendJson('/api/system/import', { snapshot, revision: current.revision || 0 });
      await refreshCentralData();
    } catch (error) { alert(error instanceof Error ? error.message : 'นำเข้าข้อมูลไม่สำเร็จ'); }
    finally { e.target.value = ''; }
  };

  const handleSaveTagEdit = async (oldTag: string) => {
    if (editTagValue.trim() && editTagValue.trim() !== oldTag) {
      if (!await editQuickTag(oldTag, editTagValue.trim())) return;
    }
    setEditingTag(null);
  };

  const handleAddQuickMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qmTitle.trim() || !qmText.trim()) return;
    if (!await addQuickMessage(qmTitle.trim(), qmText.trim())) return;
    setQmTitle('');
    setQmText('');
  };

  const handleSaveQmEdit = async (id: string) => {
    if (editQmTitle.trim() && editQmText.trim()) {
      if (!await editQuickMessage(id, editQmTitle.trim(), editQmText.trim())) return;
    }
    setEditingQmId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 space-y-4 animate-in fade-in">
      {/* Header Banner + Owner-only Toggle */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4" />
          </div>
          <h2 className="font-extrabold text-sm sm:text-base text-slate-900 truncate whitespace-nowrap">
            ตั้งค่าเนื้อหา
          </h2>
        </div>

        {/* Founder-only backup and record maintenance (เห็นเฉพาะเจ้าของเว็บ user-ice คนเดียว) */}
        {currentUser.id === 'user-ice' && !simulatedFromAdmin && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cloud Sync & Drive CENTER</span>
            </span>
            <button
              type="button"
              onClick={() => setShowOwnerTools((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{showOwnerTools ? 'ซ่อนแผงผู้ดูแลระบบหลัก' : 'แผงผู้ดูแลระบบหลัก (Owner Only)'}</span>
            </button>
          </div>
        )}
      </div>

      {currentUser.id === 'user-ice' && !simulatedFromAdmin && showOwnerTools && <>
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleExportJson}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold active:scale-95 transition-all"
        >
          <i className="fa-solid fa-download text-xs text-purple-600" />
          <span>สำรองข้อมูล (.json)</span>
        </button>

        <label
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-upload text-xs text-blue-600" />
          <span>นำเข้าไฟล์สำรอง</span>
          <input
            type="file"
            accept=".json"
            onChange={handleImportJson}
            className="hidden"
          />
        </label>

        <button
          type="button"
          disabled={isMockLoading || isClearing}
          onClick={() => { void loadFullMockupData(); }}
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-xs transition-all ${
            isMockLoading
              ? 'bg-emerald-700 text-white cursor-wait opacity-85'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
          }`}
        >
          {isMockLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Database className="w-3.5 h-3.5" />
          )}
          <span>{isMockLoading ? 'กำลังโหลดข้อมูลจำลอง...' : 'โหลด Mockup เต็มระบบ'}</span>
        </button>

        <button
          type="button"
          disabled={isMockLoading || isClearing}
          onClick={async () => {
            const pwd = window.prompt('กรุณากรอกรหัสผ่านเพื่อล้างเฉพาะข้อมูล Mockup ออกจากระบบ:');
            if (!pwd) return;
            const ok = await clearMockupOnly(pwd.trim());
            if (ok) {
              window.alert('🧹 ล้างข้อมูลจำลอง Mockup เรียบร้อยแล้ว!\n(ข้อมูลจริงและสมาชิกยังคงอยู่ครบถ้วน)');
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold active:scale-95 transition-all disabled:opacity-50"
        >
          {isClearing ? (
            <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5 text-amber-600" />
          )}
          <span>{isClearing ? 'กำลังล้าง...' : 'ล้างเฉพาะ Mockup'}</span>
        </button>

        <button
          type="button"
          disabled={isMockLoading || isClearing}
          onClick={async () => {
            const pwd = window.prompt('กรุณากรอกรหัสผ่านเพื่อยืนยันการล้างข้อมูลทั้งหมดเป็น 0 (สมาชิกคงเดิม):');
            if (!pwd) return;
            const ok = await resetSystemData(pwd.trim());
            if (ok) {
              window.alert('🗑️ ล้างข้อมูลระบบเป็น 0 เรียบร้อยแล้ว!\n(สมาชิกและสิทธิ์ในระบบยังคงอยู่ครบถ้วน)');
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all disabled:opacity-50"
        >
          {isClearing ? (
            <Loader2 className="w-3.5 h-3.5 text-rose-600 animate-spin" />
          ) : (
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
          )}
          <span>{isClearing ? 'กำลังล้าง...' : 'ล้างข้อมูลเป็น 0'}</span>
        </button>
      </div>
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  เซิร์ฟเวอร์กลางหลัก VITCHA (Render · onrender.com)
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Node.js + REST API
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                ฐานข้อมูลกลางคลาวด์ บันทึกข้อมูลขึ้นระบบจริงทันที ใช้ข้อมูลชุดเดียวกันบนมือถือและคอมพิวเตอร์
              </p>
            </div>
          </div>

          <div>
            {renderStatus === 'connected' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>🟢 เชื่อมต่อเซิร์ฟเวอร์ Render สำเร็จ</span>
              </span>
            ) : renderStatus === 'connecting' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                <span>🟡 กำลังเชื่อมต่อ Render...</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>🔴 ออฟไลน์ (Render กำลัง Wake-up หรือ URL ไม่ตรง)</span>
              </span>
            )}
          </div>
        </div>

        {/* Server URL Input & Actions */}
        <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 space-y-3">
          <form onSubmit={handleSaveRenderUrl} className="space-y-2.5">
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus-within:border-slate-900 transition-colors">
              <span className="text-slate-400 font-mono select-none mr-1.5">URL:</span>
              <input
                type="text"
                placeholder="https://vitcha-sourcing.onrender.com"
                value={editingRenderUrl}
                onChange={(e) => setEditingRenderUrl(e.target.value)}
                className="w-full bg-transparent font-mono text-xs text-slate-900 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs active:scale-95 transition-all shadow-2xs text-center"
              >
                บันทึก URL
              </button>
              <button
                type="button"
                onClick={handleTestRender}
                disabled={isTestingRender}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs active:scale-95 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingRender ? 'animate-spin' : ''}`} />
                <span>{isTestingRender ? 'กำลังทดสอบ...' : 'ทดสอบเชื่อมต่อ (Ping)'}</span>
              </button>
              <button
                type="button"
                onClick={handleForceSyncRender}
                disabled={isSyncingRender}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs active:scale-95 transition-all shadow-xs"
              >
                <Cloud className={`w-3.5 h-3.5 ${isSyncingRender ? 'animate-pulse' : ''}`} />
                <span>{isSyncingRender ? 'กำลังซิงค์...' : 'ดึงข้อมูลล่าสุดจาก Render'}</span>
              </button>
            </div>
          </form>

          {renderTestResult && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-2 border ${
                renderTestResult.ok
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{renderTestResult.ok ? '✅' : '⚠️'}</span>
                <span>{renderTestResult.message}</span>
              </div>
              {renderTestResult.count?.suppliersCount !== undefined && (
                <div className="text-[11px] font-mono text-emerald-700 flex gap-2">
                  <span>ซัพพลายเออร์: {renderTestResult.count.suppliersCount ?? 0}</span>
                  <span>· ร้านน้ำ: {renderTestResult.count.drinkStoresCount ?? 0}</span>
                  <span>· ผู้ใช้: {renderTestResult.count.usersCount ?? 0}</span>
                </div>
              )}
            </div>
          )}

          {renderSyncMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
              {renderSyncMsg}
            </div>
          )}

          <div className="text-[11px] text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>
              <strong>ข้อมูลจากเซิร์ฟเวอร์กลาง:</strong> ทุกการบันทึกข้อมูลหน้างาน ซัพพลายเออร์ ร้านน้ำเรฟ รูปภาพ และวิดีโอ จะถูกส่งขึ้นเซิร์ฟเวอร์ Render กลางทันที ระบบจะดึงข้อมูลล่าสุดเป็นระยะเมื่อเชื่อมต่อได้
            </span>
          </div>
        </div>
      </div>

      {/* Google Drive CENTER Storage Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0">
              <i aria-hidden="true" className="fa-brands fa-google-drive text-sm" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                  พื้นที่จัดเก็บไฟล์ Google Drive CENTER
                </h3>
                <a
                  href={`https://drive.google.com/drive/u/0/folders/${driveFolderId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>เปิดโฟลเดอร์ CENTER ({driveFolderId.slice(0, 10)}…)</span>
                  <i aria-hidden="true" className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                </a>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                เชื่อมต่อโฟลเดอร์ CENTER เรียบร้อยแล้ว รองรับการอัปโหลดรูปภาพ เสียงอัดสด และวิดีโอ (สูงสุด 100 MB/ไฟล์) พร้อม Cloud Media สำรองอัตโนมัติ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>🟢 เชื่อมต่อ Google Drive CENTER สำเร็จ</span>
            </span>
            <a
              href={`https://drive.google.com/drive/u/0/folders/${driveFolderId}`}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all"
            >
              เปิด Drive
            </a>
            <button
              type="button"
              onClick={() => setShowDriveForm((v) => !v)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all"
            >
              {showDriveForm ? 'ซ่อนตั้งค่า' : 'ตั้งค่าขั้นสูง'}
            </button>
          </div>
        </div>

        {driveMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-bold border ${
              driveMsg.ok
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {driveMsg.text}
          </div>
        )}

        {showDriveForm && (
          <form onSubmit={handleSaveDriveConfig} className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Google OAuth Client ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="xxxx.apps.googleusercontent.com"
                  value={driveClientId}
                  onChange={(e) => setDriveClientId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Google OAuth Client Secret
                </label>
                <input
                  type="password"
                  required
                  placeholder="GOCSPX-..."
                  value={driveClientSecret}
                  onChange={(e) => setDriveClientSecret(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Google OAuth Refresh Token
                </label>
                <input
                  type="password"
                  required
                  placeholder="1//04..."
                  value={driveRefreshToken}
                  onChange={(e) => setDriveRefreshToken(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Google Drive CENTER Folder ID
                </label>
                <input
                  type="text"
                  required
                  value={driveFolderId}
                  onChange={(e) => setDriveFolderId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="submit"
                disabled={isSavingDrive}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                {isSavingDrive ? 'กำลังตรวจสอบและบันทึก...' : 'บันทึก & เชื่อมต่อ Google Drive ทันที'}
              </button>
            </div>
          </form>
        )}
      </div>

      </>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. Supplier Category Management */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>1. หมวดหมู่ซัพพลายเออร์ ({categories.length})</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              หมวดหมู่อุปกรณ์ เครื่องจักร วัตถุดิบ และบรรจุภัณฑ์สำหรับหน้าซัพพลายเออร์
            </p>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              placeholder="พิมพ์ชื่อหมวดหมู่ซัพพลายเออร์ใหม่..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่ม</span>
            </button>
          </form>

          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-all text-xs"
              >
                {editingCat === cat ? (
                  <div className="flex items-center gap-1.5 flex-1">
                    <input
                      type="text"
                      value={editCatValue}
                      onChange={(e) => setEditCatValue(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-900 focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveCategoryEdit(cat)}
                      className="p-1.5 rounded-lg bg-emerald-600 text-white"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCat(null)}
                      className="p-1.5 rounded-lg bg-slate-200 text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-slate-800">{cat}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCat(cat);
                          setEditCatValue(cat);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategory(cat)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Drink Store Category Management (แยกหมวดหมู่เฉพาะ ร้านน้ำ & เรฟ) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-amber-600" />
              <span>2. หมวดหมู่ร้านน้ำ & เรฟ ({storeCategories.length})</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              แยกหมวดหมู่สำหรับหน้า "ร้านน้ำ & เรฟ" โดยเฉพาะ (ไม่ปนกับซัพพลายเออร์)
            </p>
          </div>

          <form onSubmit={handleAddStoreCategory} className="flex gap-2">
            <input
              type="text"
              placeholder="พิมพ์ชื่อหมวดหมู่ร้านน้ำเรฟใหม่..."
              value={newStoreCategory}
              onChange={(e) => setNewStoreCategory(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่ม</span>
            </button>
          </form>

          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {storeCategories.map((cat) => (
              <div
                key={cat}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-50/40 border border-amber-200/70 hover:border-amber-300 transition-all text-xs"
              >
                {editingStoreCat === cat ? (
                  <div className="flex items-center gap-1.5 flex-1">
                    <input
                      type="text"
                      value={editStoreCatValue}
                      onChange={(e) => setEditStoreCatValue(e.target.value)}
                      className="flex-1 bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-900 focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveStoreCategoryEdit(cat)}
                      className="p-1.5 rounded-lg bg-amber-600 text-white"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingStoreCat(null)}
                      className="p-1.5 rounded-lg bg-slate-200 text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-slate-800">🧋 {cat}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingStoreCat(cat);
                          setEditStoreCatValue(cat);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteStoreCategory(cat)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Quick-Tap Tags Setup ("แตะเลือกจุดเด่นทางลัด") */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>3. ตั้งค่าปุ่ม “แตะเลือกจุดเด่นทางลัด” ({quickTagsList.length})</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              ปรับแต่งตัวเลือกปุ่มติ๊กทางลัดในฟอร์มบันทึกซัพพลายเออร์ และปุ่มกรองด่วนหน้าแดชบอร์ด
            </p>
          </div>
        </div>

        <form onSubmit={handleAddQuickTag} className="flex gap-2">
          <input
            type="text"
            placeholder="พิมพ์จุดเด่นทางลัดใหม่ เช่น รับผลิต OEM แบรนด์เรา..."
            value={newQuickTag}
            onChange={(e) => setNewQuickTag(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มปุ่มทางลัด</span>
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
          {quickTagsList.map((tag) => (
            <div
              key={tag}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-all text-xs"
            >
              {editingTag === tag ? (
                <div className="flex items-center gap-1.5 flex-1">
                  <input
                    type="text"
                    value={editTagValue}
                    onChange={(e) => setEditTagValue(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold text-slate-900"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveTagEdit(tag)}
                    className="p-1 rounded-lg bg-emerald-600 text-white"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTag(null)}
                    className="p-1 rounded-lg bg-slate-200 text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-semibold text-slate-800 truncate flex items-center gap-1">
                    <span className="text-emerald-600">✓</span>
                    <span className="truncate">{tag}</span>
                  </span>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTag(tag);
                        setEditTagValue(tag);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteQuickTag(tag)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quick Message Templates */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div>
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>4. ข้อความด่วนสำหรับคอมเมนต์ & สั่งงาน ({quickMessages.length})</span>
          </h3>
          <p className="text-[11px] text-slate-500">
            ข้อความสำเร็จรูปที่จะแสดงในหน้าต่างดีเทล ให้แตะเลือกส่งคอมเมนต์ได้ในคลิกเดียว
          </p>
        </div>

        <form onSubmit={handleAddQuickMessage} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="ชื่อปุ่มสั้นๆ (เช่น ขอสเปกไฟ)"
            value={qmTitle}
            onChange={(e) => setQmTitle(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
          />
          <input
            type="text"
            placeholder="ข้อความเต็มที่จะโพสต์..."
            value={qmText}
            onChange={(e) => setQmText(e.target.value)}
            className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
          />
          <button
            type="submit"
            className="sm:col-span-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มข้อความด่วน</span>
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickMessages.map((qm) => (
            <div
              key={qm.id}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-start justify-between gap-2"
            >
              {editingQmId === qm.id ? (
                <div className="space-y-2 flex-1">
                  <input
                    type="text"
                    value={editQmTitle}
                    onChange={(e) => setEditQmTitle(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900"
                  />
                  <textarea
                    rows={2}
                    value={editQmText}
                    onChange={(e) => setEditQmText(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-700"
                  />
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSaveQmEdit(qm.id)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                    >
                      บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingQmId(null)}
                      className="px-3 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span className="text-amber-500">⚡</span>
                      <span>{qm.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{qm.text}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingQmId(qm.id);
                        setEditQmTitle(qm.title);
                        setEditQmText(qm.text);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteQuickMessage(qm.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
