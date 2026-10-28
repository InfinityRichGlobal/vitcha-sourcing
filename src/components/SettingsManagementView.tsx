import React, { useState } from 'react';
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
} from 'lucide-react';

export const SettingsManagementView: React.FC = () => {
  const {
    currentUser,
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
    invites,
    createInvite,
    loadFullMockupData,
    resetSystemData,
    suppliers,
    drinkStores,
  } = useApp();

  // Top 2 roles permission check: Admin & Editor
  const hasPermission = currentUser.role === 'admin' || currentUser.role === 'editor';

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

  if (!hasPermission) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="font-bold text-base text-slate-900">
          จำกัดสิทธิ์เฉพาะผู้ดูแลระบบ 2 ระดับบน (Admin & Editor)
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          คุณกำลังใช้งานในสิทธิ์ <span className="font-bold uppercase">{currentUser.role}</span>{' '}
          หากต้องการเพิ่ม/แก้ไขหมวดหมู่ จุดเด่นทางลัด หรือข้อความด่วน กรุณาติดต่อ Admin
        </p>
      </div>
    );
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    addCategory(newCategory.trim());
    setNewCategory('');
  };

  const handleSaveCategoryEdit = (oldCat: string) => {
    if (editCatValue.trim() && editCatValue.trim() !== oldCat) {
      editCategory(oldCat, editCatValue.trim());
    }
    setEditingCat(null);
  };

  const handleAddStoreCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreCategory.trim()) return;
    addStoreCategory(newStoreCategory.trim());
    setNewStoreCategory('');
  };

  const handleSaveStoreCategoryEdit = (oldCat: string) => {
    if (editStoreCatValue.trim() && editStoreCatValue.trim() !== oldCat) {
      editStoreCategory(oldCat, editStoreCatValue.trim());
    }
    setEditingStoreCat(null);
  };

  const handleAddQuickTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuickTag.trim()) return;
    addQuickTag(newQuickTag.trim());
    setNewQuickTag('');
  };

  const handleExportJson = () => {
    const backupData = {
      suppliers,
      drinkStores,
      categories,
      storeCategories,
      quickTagsList,
      quickMessages,
      users,
      invites,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vitcha_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.suppliers) localStorage.setItem('vitcha_suppliers_v5', JSON.stringify(data.suppliers));
        if (data.drinkStores) localStorage.setItem('vitcha_drink_stores_v5', JSON.stringify(data.drinkStores));
        if (data.users) localStorage.setItem('vitcha_users_v5', JSON.stringify(data.users));
        if (data.invites) localStorage.setItem('vitcha_invites_v5', JSON.stringify(data.invites));
        if (data.categories) localStorage.setItem('vitcha_categories_v5', JSON.stringify(data.categories));
        if (data.storeCategories) localStorage.setItem('vitcha_store_categories_v5', JSON.stringify(data.storeCategories));
        if (data.quickTagsList) localStorage.setItem('vitcha_quick_tags_v5', JSON.stringify(data.quickTagsList));
        if (data.quickMessages) localStorage.setItem('vitcha_quick_messages_v5', JSON.stringify(data.quickMessages));
        alert('นำเข้าข้อมูลสำเร็จ! ระบบจะรีเฟรชเพื่อโหลดข้อมูลใหม่');
        window.location.reload();
      } catch {
        alert('ไฟล์ข้อมูลไม่ถูกต้อง');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveTagEdit = (oldTag: string) => {
    if (editTagValue.trim() && editTagValue.trim() !== oldTag) {
      editQuickTag(oldTag, editTagValue.trim());
    }
    setEditingTag(null);
  };

  const handleAddQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qmTitle.trim() || !qmText.trim()) return;
    addQuickMessage(qmTitle.trim(), qmText.trim());
    setQmTitle('');
    setQmText('');
  };

  const handleSaveQmEdit = (id: string) => {
    if (editQmTitle.trim() && editQmText.trim()) {
      editQuickMessage(id, editQmTitle.trim(), editQmText.trim());
    }
    setEditingQmId(null);
  };

  const handleCreateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    createInvite(inviteRole, inviteAlias.trim() || undefined);
    setInviteAlias('');
  };

  const copyInviteLink = (code: string, id: string) => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const url = `${baseUrl}?invite=${code}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 space-y-5 animate-in fade-in">
      {/* Header Banner + Mockup / Reset System Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900">
                ตั้งค่าระบบ & จัดการตัวเลือก (System Setup)
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                สิทธิ์: {currentUser.role.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              จัดการหมวดหมู่ซัพพลายเออร์ หมวดหมู่ร้านน้ำเรฟ ปุ่มทางลัด ข้อความด่วน และระบบจำลองข้อมูล Mockup
            </p>
          </div>
        </div>

        {/* Mockup Load & Reset System Buttons ("จำลองข้อมูล mockup แบบเต็ม กับ ปุ่ม reset ข้อมูลทั้งระบบ") */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold active:scale-95 transition-all"
            title="ดาวน์โหลดไฟล์สำรองข้อมูลทั้งหมด เพื่อนำไปเปิดในเครื่องอื่น"
          >
            <i className="fa-solid fa-download text-xs text-purple-600" />
            <span>💾 สำรองข้อมูล (.json)</span>
          </button>

          <label
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold active:scale-95 transition-all cursor-pointer"
            title="นำเข้าไฟล์สำรองข้อมูลที่ดาวน์โหลดมาจากเครื่องอื่น"
          >
            <i className="fa-solid fa-upload text-xs text-blue-600" />
            <span>📥 นำเข้าข้อมูลสำรอง</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={loadFullMockupData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs active:scale-95 transition-all"
          >
            <Database className="w-3.5 h-3.5" />
            <span>✨ โหลดข้อมูล Mockup เต็มระบบ (12 รายการ)</span>
          </button>

          <button
            type="button"
            onClick={() => resetSystemData(false)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>🔄 รีเซ็ทกลับเป็น Mockup เริ่มต้น</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  'ยืนยันการล้างข้อมูลทั้งหมดให้เป็น 0 รายการ เพื่อเริ่มบันทึกหน้างานจริงใช่หรือไม่?'
                )
              ) {
                resetSystemData(true);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold active:scale-95 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>ล้างข้อมูลว่างเปล่า (เริ่มจริง)</span>
          </button>
        </div>
      </div>

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
              <span>เพิ่มหมวดซัพ</span>
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
              <span>เพิ่มหมวดร้านน้ำ</span>
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

      {/* 5. Team Roles & Invite Generator */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>5. จัดการสิทธิ์สมาชิกในทีม & ออกลิงก์เชิญ ({users.length} คน)</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              กำหนดระดับสิทธิ์ของสมาชิกแต่ละคน หรือสร้างลิงก์เชิญพร้อมกำหนดสิทธิ์ล่วงหน้า
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between gap-2.5"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={u.avatar}
                  alt={u.alias}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{u.alias}</div>
                  <div className="text-[10px] text-slate-400 truncate">{u.emailOrId}</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-500 font-medium">ระดับสิทธิ์:</span>
                <select
                  value={u.role}
                  onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-800 focus:outline-none focus:border-slate-900"
                >
                  <option value="admin">👑 Admin (สูงสุด)</option>
                  <option value="editor">✏️ Editor (แก้ไข/ตั้งค่า)</option>
                  <option value="reviewer">🔬 Reviewer (คอมเมนต์/สเปก)</option>
                  <option value="viewer">👁️ Viewer (ดู/เมมโม)</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {currentUser.role === 'admin' && (
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>สร้างลิงก์คำเชิญเข้าทีมด่วน (1-Click Invite Link)</span>
            </div>

            <form onSubmit={handleCreateInvite} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="ตั้งชื่อนามแฝงล่วงหน้า เช่น เฮียต้อม (หุ้นส่วน)..."
                value={inviteAlias}
                onChange={(e) => setInviteAlias(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as UserRole)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
              >
                <option value="editor">สิทธิ์: Editor (ระดับบน)</option>
                <option value="reviewer">สิทธิ์: Reviewer (ทีมสเปก/แล็บ)</option>
                <option value="viewer">สิทธิ์: Viewer (ผู้ร่วมชม/เมมโม)</option>
                <option value="admin">สิทธิ์: Admin</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0"
              >
                + ออกลิงก์เชิญ
              </button>
            </form>

            {invites.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {invites.slice(0, 4).map((inv) => (
                  <div
                    key={inv.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <span className="font-mono font-bold text-slate-700">{inv.code}</span>
                    <span className="text-[10px] text-slate-500">
                      ({inv.prefilledAlias || inv.role})
                    </span>
                    <button
                      type="button"
                      onClick={() => copyInviteLink(inv.code, inv.id)}
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                    >
                      {copiedId === inv.id ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedId === inv.id ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
