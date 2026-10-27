import React, { useState } from 'react';
import { SupplierRecord, StoreInspoRecord } from '../types';
import { useApp } from '../context/AppContext';
import { X, Share2, Copy, Check, Lock, ExternalLink } from 'lucide-react';

interface ShareLineModalProps {
  item: SupplierRecord | StoreInspoRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareLineModal: React.FC<ShareLineModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { convertCnyToThb } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const isSupplier = item.type === 'supplier';
  const supplier = isSupplier ? (item as SupplierRecord) : null;
  const store = !isSupplier ? (item as StoreInspoRecord) : null;

  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const directLink = `${baseUrl}?view=${item.id}&type=${item.type}`;

  let shareText = '';
  if (supplier) {
    shareText = `🏭 [CHINA SOURCING 2026] สรุปข้อมูลซัพพลายเออร์
━━━━━━━━━━━━━━━━━━━━
📌 ชื่อ: ${supplier.name} ${supplier.chineseName ? `(${supplier.chineseName})` : ''}
📍 ทำเล: ${supplier.marketOrCity || supplier.location.addressText || 'กวางโจว'}
🏷️ หมวดหมู่: ${supplier.category}
⭐ ระดับความน่าสนใจ: ${'★'.repeat(supplier.rating)}
👤 ผู้สำรวจบันทึก: ${supplier.creator.alias}
━━━━━━━━━━━━━━━━━━━━
🛠️ รายการสินค้า/อุปกรณ์เด่น:
${supplier.catalogItems.map((c) => `• ${c.name || 'สินค้า'} ${c.priceRmb ? `[¥${c.priceRmb} ≈ ฿${convertCnyToThb(c.priceRmb).toLocaleString()}]` : ''}`).join('\n')}
${supplier.memo ? `\n📝 โน้ตหน้างาน: "${supplier.memo}"` : ''}
━━━━━━━━━━━━━━━━━━━━
🔒 ดูข้อมูลสเปก รูปภาพ และไฟล์เสียงฉบับเต็มได้ที่ลิงก์นี้:
${directLink}
(ต้องระบุรหัส PIN 4 หลักเพื่อเข้าสู่ระบบ)`;
  } else if (store) {
    shareText = `🧋 [BEVERAGE INSPO] สรุปเรฟร้านน้ำและไอเดียต่อยอด
━━━━━━━━━━━━━━━━━━━━
📌 ร้าน: ${store.storeName} ${store.chineseName ? `(${store.chineseName})` : ''}
🏙️ เมือง/สาขา: ${store.city || 'กวางโจว'}
⭐ คะแนนเฉลี่ย: ${((store.ratings.taste + store.ratings.aesthetics + store.ratings.value + store.ratings.speed) / 4).toFixed(1)} / 5
(รสชาติ: ${store.ratings.taste}★ | ดีไซน์: ${store.ratings.aesthetics}★)
👤 ผู้สำรวจบันทึก: ${store.creator.alias}
━━━━━━━━━━━━━━━━━━━━
💡 เมนูเด่นที่ชิม:
${store.drinkItems.map((d) => `• ${d.name || 'เมนูชิม'} ${d.priceRmb ? `[¥${d.priceRmb} ≈ ฿${convertCnyToThb(d.priceRmb).toLocaleString()}]` : ''} ${d.fitMenuTarget ? `(ต่อยอด: ${d.fitMenuTarget})` : ''}`).join('\n')}
${store.tastingNotes ? `\n👅 บันทึกรสชาติ: "${store.tastingNotes}"` : ''}
━━━━━━━━━━━━━━━━━━━━
🔒 ดูรูปภาพแก้ว แพ็กเกจ และไฟล์เสียงฉบับเต็มได้ที่ลิงก์นี้:
${directLink}
(ต้องระบุรหัส PIN 4 หลักเพื่อเข้าสู่ระบบ)`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLine = () => {
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
    window.open(lineUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-slate-200/90 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 text-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="./logo.jpg"
              alt="ฉันจะเป็นหัวแถว"
              className="w-9 h-9 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>1-Click Share เข้า LINE</span>
              </h3>
              <p className="text-[11px] text-slate-500">แชร์การ์ดสรุปส่งตรงถึงทีมไทยและกลุ่มไลน์</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5">
          <div className="p-3 bg-emerald-50/80 border border-emerald-200/60 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-900">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>ระบบความปลอดภัย (Security Check):</strong> เมื่อปลายทางคลิกเปิดลิงก์ ระบบจะให้ระบุรหัส PIN 4 หลักตามสิทธิ์เพื่อความปลอดภัยของข้อมูล
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              ข้อความตัวอย่างที่จะส่งเข้า LINE:
            </label>
            <textarea
              readOnly
              rows={8}
              value={shareText}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-700 font-mono focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกข้อความแล้ว!' : 'คัดลอกข้อความ + ลิงก์'}</span>
            </button>

            <button
              onClick={handleOpenLine}
              className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>เปิดส่งใน LINE ทันที</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
