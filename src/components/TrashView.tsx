import React, { useState, useEffect } from 'react';
import {
  Trash2,
  RotateCcw,
  Search,
  RefreshCw,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Coffee,
  Calendar,
  User,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrashedItem } from '../types';

export const TrashView: React.FC = () => {
  const {
    currentUser,
    trashItems,
    fetchTrash,
    restoreTrashItem,
    permanentDeleteTrashItem,
    isMutating,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'supplier' | 'drink_store' | 'location'>('all');
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser.role === 'admin') {
      void fetchTrash();
    }
  }, [currentUser.role]);

  if (currentUser.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4 border border-rose-100">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">ไม่มีสิทธิ์เข้าถึงหน้านี้</h2>
        <p className="text-sm text-slate-500 mt-1">
          หน้านี้สงวนสิทธิ์เฉพาะผู้ดูแลระบบและเจ้าของระบบ (Owner / Admin) เท่านั้น
        </p>
      </div>
    );
  }

  const handleRestore = async (item: TrashedItem) => {
    setRestoringId(item.id);
    setSuccessMessage(null);
    try {
      const ok = await restoreTrashItem(item.id);
      if (ok) {
        setSuccessMessage(`กู้คืน "${item.name}" กลับสู่ระบบเรียบร้อยแล้ว`);
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } finally {
      setRestoringId(null);
    }
  };

  const handlePermanentDelete = async (item: TrashedItem) => {
    const confirmed = window.confirm(
      `คำเตือน: คุณต้องการลบ "${item.name}" ถาวรใช่หรือไม่?\n\nการกระทำนี้ไม่สามารถย้อนกลับได้ ข้อมูลและรูปภาพจะถูกลบออกจากฐานข้อมูลอย่างสมบูรณ์`
    );
    if (!confirmed) return;

    setDeletingId(item.id);
    setSuccessMessage(null);
    try {
      const ok = await permanentDeleteTrashItem(item.id);
      if (ok) {
        setSuccessMessage(`ลบ "${item.name}" ถาวรเรียบร้อยแล้ว`);
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } finally {
      setDeletingId(null);
    }
  };

  const filteredItems = trashItems.filter((item) => {
    const matchesQuery =
      !searchQuery.trim() ||
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.storeCategory || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.locationType || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.trashedBy || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesQuery && matchesType;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'supplier':
        return { label: 'ซัพพลายเออร์', icon: <Building2 className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'drink_store':
        return { label: 'ร้านน้ำ & เรฟ', icon: <Coffee className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'location':
        return { label: 'สถานที่ & ทำเล', icon: <i className="fa-solid fa-map-location-dot text-xs" />, color: 'bg-sky-50 text-sky-700 border-sky-200' };
      default:
        return { label: 'รายการทั่วไป', icon: <Trash2 className="w-3.5 h-3.5" />, color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                ถังขยะและประวัติรายการที่ลบ (Recycle Bin)
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-100 text-rose-700">
                {trashItems.length} รายการ
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              พื้นที่เฉพาะ Owner / Admin — รายการที่ถูกลบจะถูกตัดขาดจากฟีด แผนที่ และหมวดหมู่อย่างสิ้นเชิง
              สามารถตรวจสอบ กู้คืนกลับสู่ระบบ หรือลบถาวรได้
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            type="button"
            onClick={() => void fetchTrash()}
            disabled={isMutating}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isMutating ? 'animate-spin' : ''}`} />
            <span>รีเฟรช</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาตามชื่อรายการ, หมวดหมู่, หรือผู้ลบ..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium text-slate-900 focus:bg-white focus:border-slate-400 outline-none transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'supplier', label: 'ซัพพลายเออร์' },
              { id: 'drink_store', label: 'ร้านน้ำ' },
              { id: 'location', label: 'สถานที่ & ทำเล' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  filterType === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Item List / Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 mx-auto flex items-center justify-center border border-slate-100">
            <Trash2 className="w-6 h-6" />
          </div>
          <div className="font-bold text-slate-800 text-sm">
            {trashItems.length === 0 ? 'ถังขยะว่างเปล่า ไม่มีรายการที่ถูกลบ' : 'ไม่พบรายการที่ตรงกับคำค้นหา'}
          </div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {trashItems.length === 0
              ? 'เมื่อมีการลบซัพพลายเออร์ ร้านน้ำ หรือทำเล รายการจะถูกย้ายมาเก็บไว้ที่นี่เพื่อความปลอดภัย'
              : 'ลองปรับเปลี่ยนคำค้นหาหรือเปลี่ยนตัวกรองประเภท'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const typeInfo = getTypeLabel(item.type);
            const firstPhoto = item.photos && item.photos.length > 0 ? item.photos[0] : null;
            const isRestoring = restoringId === item.id;
            const isDeleting = deletingId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
              >
                <div className="p-4 space-y-3">
                  {/* Photo & Basic Info */}
                  <div className="flex items-start gap-3">
                    {firstPhoto ? (
                      <img
                        src={firstPhoto}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-contain bg-slate-50 border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                        {typeInfo.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-md border text-[10px] font-bold inline-flex items-center gap-1 ${typeInfo.color}`}
                        >
                          {typeInfo.icon}
                          <span>{typeInfo.label}</span>
                        </span>
                        {(item.category || item.storeCategory || item.locationType) && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                            {item.category || item.storeCategory || item.locationType}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm mt-1.5 line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                        ID: {item.id}
                      </div>
                    </div>
                  </div>

                  {/* Notes / Reason Preview */}
                  {item.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-2.5 line-clamp-2 border border-slate-100">
                      {item.notes}
                    </p>
                  )}

                  {/* Deletion Metadata */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>ลบโดย: {item.trashedBy || 'ผู้ดูแลระบบ'}</span>
                    </span>
                    <span className="flex items-center gap-1 shrink-0 font-mono">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>
                        {item.trashedAt
                          ? new Date(item.trashedAt).toLocaleDateString('th-TH', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRestore(item)}
                    disabled={isRestoring || isDeleting || isMutating}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95 disabled:opacity-50"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isRestoring ? 'animate-spin' : ''}`} />
                    <span>{isRestoring ? 'กำลังกู้คืน...' : 'กู้คืนสู่ระบบ'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePermanentDelete(item)}
                    disabled={isRestoring || isDeleting || isMutating}
                    className="py-2 px-3 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
                    title="ลบข้อมูลรายการนี้อย่างถาวร"
                  >
                    <AlertTriangle className={`w-3.5 h-3.5 text-rose-500 ${isDeleting ? 'animate-spin' : ''}`} />
                    <span>{isDeleting ? 'กำลังลบ...' : 'ลบถาวร'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
