import { Coffee, Factory, MapPin, Plus, RotateCcw } from 'lucide-react';

type Props = {
  kind: 'supplier' | 'store' | 'location';
  count: number;
  total: number;
  filtered: boolean;
  onReset: () => void;
  onCreate?: () => void;
};

export function CollectionHeading({ kind, count, total, filtered, onReset, onCreate }: Props) {
  const isSupplier = kind === 'supplier';
  const isLocation = kind === 'location';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 px-3 sm:px-3.5 py-2.5 shadow-2xs flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <div
          className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
            isSupplier
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
              : isLocation
              ? 'bg-sky-50 text-sky-700 border-sky-200/60'
              : 'bg-amber-50 text-amber-700 border-amber-200/60'
          }`}
        >
          <i
            aria-hidden="true"
            className={`fa-solid ${
              isSupplier ? 'fa-industry' : isLocation ? 'fa-map-location-dot' : 'fa-mug-hot'
            } text-xs`}
          />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
          <h1 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight truncate">
            {isSupplier
              ? 'ซัพพลายเออร์ (Suppliers)'
              : isLocation
              ? 'ทำเล & พื้นที่สาขา (Location Scouting)'
              : 'ร้านน้ำ & เรฟเมนู (Store Inspo)'}
          </h1>
          <span
            aria-live="polite"
            className={`text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-md border shrink-0 ${
              isSupplier
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : isLocation
                ? 'bg-sky-50 text-sky-800 border-sky-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {count} / {total} รายการ{filtered ? ' · กรองอยู่' : ''}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {filtered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            <span className="hidden sm:inline">ล้างตัวกรอง</span>
          </button>
        )}
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all whitespace-nowrap ${
              isSupplier
                ? 'bg-slate-900 hover:bg-slate-800'
                : isLocation
                ? 'bg-sky-600 hover:bg-sky-700'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isSupplier ? 'เพิ่มซัพฯ' : isLocation ? 'เพิ่มสถานที่' : 'เพิ่มร้านน้ำ'}</span>
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
  const isLocation = kind === 'location';
  const Icon = isSupplier ? Factory : isLocation ? MapPin : Coffee;

  return (
    <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-slate-200 space-y-2.5 px-4">
      <Icon className="w-9 h-9 text-slate-300 mx-auto" aria-hidden="true" />
      <h2 className="text-sm font-bold text-slate-800">
        {filtered
          ? 'ยังไม่พบรายการที่ตรงกัน'
          : isSupplier
          ? 'เริ่มเก็บซัพพลายเออร์ของทีม'
          : isLocation
          ? 'เริ่มสำรวจทำเล & พื้นที่สาขาของทีม'
          : 'เริ่มเก็บไอเดียร้านน้ำของทีม'}
      </h2>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">
        {filtered
          ? 'ลองปรับเปลี่ยนประเภททำเล ระดับดาว หรือกดปุ่มแสดงรายการทั้งหมดด้านล่าง'
          : 'เพิ่มรูปทำเล สเปกพื้นที่ งานระบบ และค่าเช่า เพื่อให้ทีมเข้ามาประเมินร่วมกัน'}
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
              isSupplier
                ? 'bg-slate-900 hover:bg-slate-800'
                : isLocation
                ? 'bg-sky-600 hover:bg-sky-700'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {isSupplier
                ? '+ บันทึกซัพพลายเออร์ใหม่'
                : isLocation
                ? '+ บันทึกทำเลสาขาใหม่'
                : '+ บันทึกเรฟร้านน้ำใหม่'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
