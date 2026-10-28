import { Coffee, Factory, Plus, RotateCcw, SearchX } from 'lucide-react';

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
  const Icon = isSupplier ? Factory : Coffee;
  return <>
    <div className="flex flex-wrap items-center justify-between gap-4 pb-1">
      <div className="flex items-center gap-3">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border ${isSupplier ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}><Icon size={23} aria-hidden="true" /></div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{isSupplier ? 'ซัพพลายเออร์' : 'ร้านน้ำ & เรฟ'}</h1>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{isSupplier ? 'โรงงาน อุปกรณ์ และวัตถุดิบที่ทีมคัดสรร' : 'บันทึกรสชาติ เก็บไอเดีย พัฒนาเมนูใหม่'}</p>
        </div>
      </div>
      {onCreate && <button onClick={onCreate} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-sm transition-colors ${isSupplier ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-amber-700 hover:bg-amber-800'}`}><Plus size={18} aria-hidden="true" />{isSupplier ? 'เพิ่มซัพพลายเออร์' : 'เพิ่มร้านน้ำ'}</button>}
    </div>
    <div className="flex min-h-10 flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
      <p aria-live="polite">แสดง <strong className="font-semibold text-slate-900">{count}</strong> จาก {total} รายการ{filtered ? ' · กำลังใช้ตัวกรอง' : ''}</p>
      {filtered && <button onClick={onReset} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 font-semibold text-slate-600 hover:bg-white hover:text-slate-950"><RotateCcw size={14} aria-hidden="true" />ล้างตัวกรองทั้งหมด</button>}
    </div>
  </>;
}

export function CollectionEmpty({ kind, filtered, onReset, onCreate }: Pick<Props, 'kind' | 'filtered' | 'onReset' | 'onCreate'>) {
  return <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
    <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 text-slate-400"><SearchX size={28} aria-hidden="true" /></div>
    <h2 className="text-base font-semibold text-slate-900">{filtered ? 'ยังไม่พบรายการที่ตรงกัน' : kind === 'supplier' ? 'เริ่มเก็บซัพพลายเออร์ของทีม' : 'เริ่มเก็บไอเดียร้านน้ำของทีม'}</h2>
    <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">{filtered ? 'ลองใช้คำค้นสั้นลง หรือรีเซ็ตตัวกรองเพื่อดูรายการทั้งหมด' : onCreate ? 'เพิ่มรูป รายละเอียด และพิกัด เพื่อให้ทีมเข้ามาดูและทำงานต่อได้' : 'เมื่อทีมเพิ่มข้อมูลแล้ว รายการจะแสดงที่นี่'}</p>
    <div className="mt-5 flex flex-wrap justify-center gap-2">
      {filtered && <button onClick={onReset} className="min-h-11 rounded-xl bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200">แสดงรายการทั้งหมด</button>}
      {onCreate && <button onClick={onCreate} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"><Plus size={16} />เพิ่มรายการใหม่</button>}
    </div>
  </div>;
}
