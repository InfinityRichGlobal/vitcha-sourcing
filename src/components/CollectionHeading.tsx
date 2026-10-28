import { Coffee, Factory, Plus, RotateCcw } from 'lucide-react';

type Props = {
  kind: 'supplier' | 'store';
  count: number;
  total: number;
  filtered: boolean;
  onReset: () => void;
  onCreate?: () => void;
};

export function CollectionHeading({ kind, count, total, filtered, onReset, onCreate }: Props) {
  const isSupplier = kind === 'supplier';
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
            isSupplier
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
              : 'bg-amber-50 text-amber-700 border-amber-200/60'
          }`}
        >
          <i
            aria-hidden="true"
            className={`fa-solid ${isSupplier ? 'fa-industry' : 'fa-mug-hot'} text-sm`}
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-extrabold text-sm sm:text-base text-slate-950 tracking-tight">
              {isSupplier ? 'ซัพพลายเออร์ (Suppliers)' : 'ร้านน้ำ & เรฟเมนู (Store Inspo)'}
            </h1>
            <span
              aria-live="polite"
              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                isSupplier
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              แสดง {count} / {total} รายการ{filtered ? ' · กรองอยู่' : ''}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 truncate">
            {isSupplier
              ? 'ฐานข้อมูลโรงงาน อุปกรณ์ วัตถุดิบชา และบรรจุภัณฑ์ที่ทีมสำรวจ'
              : 'คลังเรฟเมนูเครื่องดื่ม รสชาติ แพ็กเกจจิ้ง และกิมมิกหน้าร้าน'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {filtered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ล้างตัวกรองทั้งหมด</span>
          </button>
        )}
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-xs active:scale-95 transition-all ${
              isSupplier ? 'bg-slate-900 hover:bg-slate-800' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isSupplier ? '+ บันทึกซัพพลายเออร์ใหม่' : '+ บันทึกเรฟร้านน้ำใหม่'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function CollectionEmpty({
  kind,
  filtered,
  onReset,
  onCreate,
}: Pick<Props, 'kind' | 'filtered' | 'onReset' | 'onCreate'>) {
  const isSupplier = kind === 'supplier';
  const Icon = isSupplier ? Factory : Coffee;
  return (
    <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-slate-200 space-y-2.5 px-4">
      <Icon className="w-9 h-9 text-slate-300 mx-auto" aria-hidden="true" />
      <h2 className="text-sm font-bold text-slate-800">
        {filtered
          ? 'ยังไม่พบรายการที่ตรงกัน'
          : isSupplier
            ? 'เริ่มเก็บซัพพลายเออร์ของทีม'
            : 'เริ่มเก็บไอเดียร้านน้ำของทีม'}
      </h2>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">
        {filtered
          ? 'ลองปรับเปลี่ยนหมวดหมู่ ระดับดาว หรือกดปุ่มแสดงรายการทั้งหมดด้านล่าง'
          : 'เพิ่มรูป รายละเอียด และพิกัด เพื่อให้ทีมเข้ามาดูและทำงานต่อได้'}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        {filtered && (
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
          >
            แสดงรายการทั้งหมด
          </button>
        )}
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white shadow-xs active:scale-95 transition-all ${
              isSupplier ? 'bg-slate-900 hover:bg-slate-800' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isSupplier ? '+ บันทึกซัพพลายเออร์ใหม่' : '+ บันทึกเรฟร้านน้ำใหม่'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
