import { AvatarImage } from './AvatarImage';
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  X,
  CheckCheck,
  Check,
  Factory,
  Coffee,
  MapPin,
  MessageSquare,
  Flame,
  ShieldCheck,
  Trash2,
  Eye,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (targetId: string, type: string) => void;
}

function formatNotificationTime(isoString: string): { full: string; relative: string } {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return { full: '', relative: '' };

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  let relative = '';
  if (diffSec < 60) {
    relative = 'เมื่อสักครู่';
  } else if (diffMin < 60) {
    relative = `${diffMin} นาทีที่แล้ว`;
  } else if (diffHr < 24) {
    relative = `${diffHr} ชม. ที่แล้ว`;
  } else if (diffDays === 1) {
    relative = 'เมื่อวานนี้';
  } else {
    relative = `${diffDays} วันที่แล้ว`;
  }

  const timeStr = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
  const isToday = now.toDateString() === date.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  let full = '';
  if (isToday) {
    full = `วันนี้ · ${timeStr}`;
  } else if (isYesterday) {
    full = `เมื่อวานนี้ · ${timeStr}`;
  } else {
    full = date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }) + ` · ${timeStr}`;
  }

  return { full, relative };
}

export const NotificationSheetModal: React.FC<NotificationSheetModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const {
    currentUser,
    users,
    suppliers,
    drinkStores,
    locations,
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    clearAllNotifications,
    clearNotification,
  } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'unread'>('all');

  // ป้องกันปัญหามือถือเลื่อนหน้าจอแจ้งเตือนแล้วจอหลังเลื่อนตาม (Scroll Bleed / Rubber-banding)
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // กรองการแจ้งเตือนตามกฎ:
  // 1. "ไม่แจ้งตนเองเมื่อเป็นผู้กระทำนั้นๆ" (actorId !== currentUser.id)
  // 2. "หมวดที่ 5 (ระบบ & ข้อมูลทดสอบ) ไม่ต้องแจ้งคนอื่น หรือแจ้งเฉพาะผู้ทำระบบ (user-ice)"
  const visibleNotifications = notifications.filter(
    (n) => n.actorId !== currentUser.id && (!n.forAdminOnly || currentUser.id === 'user-ice')
  );

  const unreadCount = visibleNotifications.filter((n) => !n.read).length;

  const displayList = filterMode === 'unread'
    ? visibleNotifications.filter((n) => !n.read)
    : visibleNotifications;

  if (!isOpen) return null;

  // ค้นหารายละเอียดปลายทางจาก id (ชื่อ, สถานที่, หมวดหมู่, รูปภาพ)
  const getItemDetails = (notif: AppNotification) => {
    const targetItem =
      suppliers.find((s) => s.id === notif.targetId) ||
      drinkStores.find((d) => d.id === notif.targetId) ||
      locations.find((l) => l.id === notif.targetId);

    const actorUser = users.find((u) => u.id === notif.actorId || u.alias === notif.actorAlias);
    const actorName = actorUser?.name || notif.actorAlias || 'สมาชิกในทีม';

    let itemKind: 'supplier' | 'drink_store' | 'location' | 'system' = 'system';
    let targetTitle = '';
    let targetLocation = '';
    let targetCategory = '';
    let targetPhoto = '';

    if (targetItem) {
      if ('storeName' in targetItem) {
        itemKind = 'drink_store';
        targetTitle = targetItem.storeName + (targetItem.chineseName ? ` (${targetItem.chineseName})` : '');
        targetLocation = targetItem.city || targetItem.location?.addressText || '';
        targetCategory = targetItem.storeCategory || '';
        targetPhoto =
          targetItem.photos?.drinkCups?.[0] ||
          targetItem.photos?.storefrontAndAtmosphere?.[0] ||
          targetItem.drinkItems?.[0]?.photo ||
          '';
      } else if ('spaceSpecs' in targetItem) {
        itemKind = 'location';
        targetTitle = targetItem.name;
        targetLocation = targetItem.zoneOrFloor || targetItem.location?.addressText || '';
        targetCategory = targetItem.locationType || '';
        targetPhoto =
          targetItem.photos?.storefrontAndAtmosphere?.[0] ||
          targetItem.photos?.floorPlanAndSpecs?.[0] ||
          '';
      } else {
        itemKind = 'supplier';
        targetTitle = targetItem.name + (targetItem.chineseName ? ` (${targetItem.chineseName})` : '');
        targetLocation = targetItem.marketOrCity || targetItem.address || targetItem.location?.addressText || '';
        targetCategory = targetItem.category || '';
        targetPhoto =
          targetItem.photos?.storefrontAndAtmosphere?.[0] ||
          targetItem.catalogItems?.[0]?.photo ||
          '';
      }
    } else {
      // Fallback จาก notification message ถ้าไม่พบในรายการปัจจุบัน
      targetTitle = notif.targetName || notif.message || '';
      targetLocation = notif.targetLocation || '';
      if (notif.type === 'supplier') itemKind = 'supplier';
      else if (notif.type === 'drink_store') itemKind = 'drink_store';
      else if (notif.type === 'location') itemKind = 'location';
    }

    return {
      targetItem,
      actorName,
      actorAvatar: actorUser?.avatar || notif.avatar,
      itemKind,
      targetTitle,
      targetLocation,
      targetCategory,
      targetPhoto,
    };
  };

  const getBadgeMeta = (type: string, itemKind: string) => {
    if (type === 'supplier' || itemKind === 'supplier') {
      return {
        label: 'ซัพพลายเออร์',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: <Factory className="w-3 h-3 text-emerald-600" />,
      };
    }
    if (type === 'drink_store' || itemKind === 'drink_store') {
      return {
        label: 'ร้านน้ำเรฟ',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        icon: <Coffee className="w-3 h-3 text-amber-600" />,
      };
    }
    if (type === 'location' || itemKind === 'location') {
      return {
        label: 'ทำเล & พื้นที่',
        badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
        icon: <MapPin className="w-3 h-3 text-sky-600" />,
      };
    }
    if (type === 'reply' || type === 'comment') {
      return {
        label: type === 'reply' ? 'ตอบกลับ' : 'ความคิดเห็น',
        badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
        icon: <MessageSquare className="w-3 h-3 text-blue-600" />,
      };
    }
    if (type === 'status') {
      return {
        label: 'ส่งต่องาน',
        badgeClass: 'bg-orange-50 text-orange-800 border-orange-200',
        icon: <Flame className="w-3 h-3 text-orange-600" />,
      };
    }
    return {
      label: 'สมาชิกใหม่',
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: <ShieldCheck className="w-3 h-3 text-purple-600" />,
    };
  };

  return (
    <div
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain touch-none animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200/90 w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900 overscroll-contain animate-in slide-in-from-bottom-6 sm:zoom-in-95"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 touch-none">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Bell className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  การแจ้งเตือนในระบบ
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold font-mono shadow-xs animate-in zoom-in-75">
                    {unreadCount} ใหม่
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                กล่องข้อความส่วนตัว · ทั้งหมด {visibleNotifications.length} รายการ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllNotificationsRead()}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1.5 rounded-xl border border-emerald-200/80 transition-colors flex items-center gap-1 active:scale-95"
                title="ทำเครื่องหมายว่าอ่านทั้งหมด"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">อ่านหมด</span>
              </button>
            )}
            {visibleNotifications.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('ต้องการล้างการแจ้งเตือนทั้งหมดออกจากกล่องของคุณ?')) {
                    clearAllNotifications();
                  }
                }}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1.5 rounded-xl border border-rose-200/80 transition-colors flex items-center gap-1 active:scale-95"
                title="ล้างกล่องข้อความส่วนตัว"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ล้าง</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors active:scale-95 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills Tab (ทั้งหมด vs ยังไม่อ่าน) */}
        {visibleNotifications.length > 0 && (
          <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                ทั้งหมด ({visibleNotifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('unread')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  filterMode === 'unread'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                <span>ยังไม่อ่าน</span>
                {unreadCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    filterMode === 'unread' ? 'bg-white text-emerald-700 font-extrabold' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              แตะเพื่อดูรายละเอียดหรือทำเครื่องหมายอ่านแล้ว
            </span>
          </div>
        )}

        {/* Scrollable Notification List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 flex-1 overscroll-contain touch-pan-y no-scrollbar">
          {displayList.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-xs font-bold text-slate-700">
                {filterMode === 'unread' ? 'ไม่มีการแจ้งเตือนที่ยังไม่ได้อ่าน' : 'ยังไม่มีการแจ้งเตือนใหม่ในระบบ'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                เมื่อมีเพื่อนร่วมทีมอัปเดตงาน เพิ่มข้อมูล หรือคอมเมนต์ จะแจ้งเตือนที่นี่
              </p>
            </div>
          ) : (
            displayList.map((notif) => {
              const details = getItemDetails(notif);
              const time = formatNotificationTime(notif.timestamp);
              const badge = getBadgeMeta(notif.type, details.itemKind);

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationRead(notif.id);
                    if (notif.targetId) {
                      onSelectItem(notif.targetId, notif.type);
                      onClose();
                    }
                  }}
                  className={`group rounded-2xl border transition-all cursor-pointer p-3.5 relative overflow-hidden flex flex-col gap-2.5 ${
                    notif.read
                      ? 'bg-white border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
                      : 'bg-emerald-50/50 border-emerald-300/80 hover:bg-emerald-50/80 shadow-xs'
                  }`}
                >
                  {/* Status Indicator Bar on Left Edge */}
                  {!notif.read && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500 rounded-l-2xl" />
                  )}

                  {/* Top Row: ใคร (Actor) + อะไร (Action) + วันและเวลา */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Avatar ผู้กระทำ (ใคร) */}
                      <div className="relative shrink-0">
                        {details.actorAvatar ? (
                          <AvatarImage
                            src={details.actorAvatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                            {details.actorName?.slice(0, 1) || 'U'}
                          </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs border border-slate-100">
                          {badge.icon}
                        </span>
                      </div>

                      {/* ชื่อผู้กระทำ + ประเภทการกระทำ */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-xs text-slate-900 truncate">
                            {details.actorName}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full border ${badge.badgeClass}`}
                          >
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-slate-600">
                          {notif.title}
                        </p>
                      </div>
                    </div>

                    {/* วันและเวลา + ปุ่มลบเดี่ยว */}
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] font-mono font-bold text-slate-500">
                          {time.full}
                        </div>
                        {time.relative && (
                          <div className="text-[9px] text-slate-400">
                            {time.relative}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        title="ลบการแจ้งเตือนนี้"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearNotification(notif.id);
                        }}
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Middle Box: ปลายทางพูดถึงที่ไหน / ประเภทอะไร / ข้อความ */}
                  <div className="bg-white/80 rounded-xl p-2.5 border border-slate-200/60 flex items-center justify-between gap-2.5">
                    <div className="min-w-0 flex-1 space-y-1">
                      {/* ชื่อปลายทางที่พูดถึง */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-400">ปลายทาง:</span>
                        <span className="text-xs font-extrabold text-slate-900 truncate">
                          {details.targetTitle || notif.message}
                        </span>
                      </div>

                      {/* สถานที่ / พิกัด / เมือง / หมวดหมู่ */}
                      {(details.targetLocation || details.targetCategory) && (
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 flex-wrap">
                          {details.targetLocation && (
                            <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                              <MapPin className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                              <span className="truncate">{details.targetLocation}</span>
                            </span>
                          )}
                          {details.targetCategory && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {details.targetCategory}
                            </span>
                          )}
                        </div>
                      )}

                      {/* ข้อความเนื้อหา (ถ้าเป็นคอมเมนต์ หรือข้อความแจ้งเตือน) */}
                      {notif.type !== 'supplier' && notif.type !== 'drink_store' && notif.type !== 'location' && notif.message && (
                        <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2 italic leading-relaxed">
                          "{notif.message}"
                        </p>
                      )}
                    </div>

                    {/* Thumbnail ภาพตัวอย่างของรายการปลายทาง (ถ้ามี) */}
                    {details.targetPhoto && (
                      <img
                        loading="lazy"
                        src={details.targetPhoto}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 shadow-2xs"
                      />
                    )}
                  </div>

                  {/* Bottom Row: ปุ่มอ่าน และ ปุ่มเปิดดู สอดรับกันอย่างลงตัว */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    {/* สถานะการอ่าน */}
                    <div>
                      {!notif.read ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-800 bg-amber-100/80 border border-amber-200/80 px-2 py-0.5 rounded-full shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>ยังไม่อ่าน</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                          <CheckCheck className="w-3 h-3 text-slate-400" />
                          <span>อ่านแล้ว</span>
                        </span>
                      )}
                    </div>

                    {/* กลุ่มปุ่มกด: ทำเครื่องหมายอ่านแล้ว + เปิดดูรายการ */}
                    <div className="flex items-center gap-1.5">
                      {!notif.read && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            markNotificationRead(notif.id);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold active:scale-95 transition-all shadow-2xs"
                          title="ทำเครื่องหมายว่าอ่านแล้ว"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>อ่านแล้ว</span>
                        </button>
                      )}

                      {notif.targetId && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            markNotificationRead(notif.id);
                            onSelectItem(notif.targetId!, notif.type);
                            onClose();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs active:scale-95 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>เปิดดู ➔</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2 shrink-0 touch-none">
          <div className="text-[11px] text-slate-400">
            แตะที่รายการเพื่อดูข้อมูลหน้างานได้ทันที
          </div>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors active:scale-95 shadow-2xs"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
