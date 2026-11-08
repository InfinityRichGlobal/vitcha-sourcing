import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Activity, ArrowLeft, ArrowUpRight, Clock3, Database, HardDrive, LockKeyhole, RefreshCw, Server, TriangleAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getOwnerMonitorApi } from '../services/api';

type Metric = { id: string; label: string; value: number | null; unit: 'bytes' | 'usd' | 'count'; kind: 'measured' | 'estimate' | 'reference'; limit?: number | null; note?: string };
type Provider = { id: string; name: string; state: 'ok' | 'partial' | 'stale' | 'error' | 'unconfigured'; dashboardUrl: string; updatedAt?: string; checkedAt: string; note: string; metrics: Metric[]; measuredThrough?: string; serviceState?: string; instancePlan?: string; period?: string; daily?: { date: string; bytes: number }[] };
type Snapshot = { schemaVersion: number; generatedAt: string; nextRefreshAt: string; cached: boolean; providers: Provider[] };
const time = (value?: string) => value ? new Date(value).toLocaleString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'ยังไม่มีข้อมูล';
const format = (value: number | null | undefined, unit: Metric['unit']) => {
  if (value == null || !Number.isFinite(value)) return '—';
  if (unit === 'usd') return `$${value.toFixed(2)}`;
  if (unit === 'count') return value.toLocaleString('th-TH');
  if (value === 0) return '0 B';
  const power = Math.min(4, Math.max(0, Math.floor(Math.log(value) / Math.log(1024))));
  return `${(value / 1024 ** power).toLocaleString('th-TH', { maximumFractionDigits: 2 })} ${['B', 'KiB', 'MiB', 'GiB', 'TiB'][power]}`;
};
const states = {
  ok: ['อ่านข้อมูลได้', 'bg-emerald-50 text-emerald-800'],
  partial: ['ข้อมูลบางส่วน', 'bg-amber-50 text-amber-900'],
  stale: ['ข้อมูลเดิม · อัปเดตไม่ได้', 'bg-amber-50 text-amber-900'],
  error: ['อ่านข้อมูลไม่ได้', 'bg-rose-50 text-rose-800'],
  unconfigured: ['รอเชื่อมต่อ', 'bg-slate-100 text-slate-600'],
} as const;

function MetricCard({ metric }: { metric: Metric }) {
  const ratio = metric.value != null && metric.limit != null && metric.limit > 0 ? metric.value / metric.limit : null;
  const warning = ratio != null && ratio >= 0.8;
  return <div className={`min-w-0 rounded-xl border p-3 ${warning ? 'border-amber-200 bg-amber-50/60' : 'border-slate-100 bg-slate-50/60'}`}>
    <div className="flex flex-wrap items-start justify-between gap-1.5">
      <p className="text-xs font-semibold text-slate-600">{metric.label}</p>
      {metric.kind !== 'measured' && <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">{metric.kind === 'estimate' ? 'ประมาณการ' : 'เกณฑ์อ้างอิง'}</span>}
    </div>
    <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
      <span className="text-xl font-extrabold tracking-tight text-slate-900 tabular-nums">{format(metric.value, metric.unit)}</span>
      {metric.limit != null && <span className="text-xs text-slate-500">/ {format(metric.limit, metric.unit)}</span>}
      {metric.unit === 'usd' && metric.value != null && <span className="text-xs text-slate-500">USD</span>}
    </div>
    {ratio != null && <>
      <div role="progressbar" aria-label={metric.label} aria-valuenow={Math.min(100, Math.round(ratio * 100))} aria-valuemin={0} aria-valuemax={100} aria-valuetext={`${(ratio * 100).toFixed(1)}% ของโควต้าอ้างอิง`} className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${ratio >= 1 ? 'bg-rose-500' : ratio >= .8 ? 'bg-amber-500' : 'bg-teal-500'}`} style={{ width: `${Math.min(100, ratio * 100)}%` }} />
      </div>
      <p className={`mt-1 text-[11px] ${warning ? 'font-semibold text-amber-900' : 'text-slate-500'}`}>{(ratio * 100).toFixed(1)}%{ratio >= 1 ? ' · เกินโควต้าอ้างอิงแล้ว' : ratio >= .8 ? ' · ใกล้เต็มโควต้าอ้างอิง' : ''}</p>
    </>}
    {metric.note && <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{metric.note}</p>}
  </div>;
}

function ProviderCard({ provider }: { provider: Provider }) {
  const Icon = provider.id === 'render' ? Server : provider.id === 'supabase' ? Database : HardDrive;
  const [label, style] = states[provider.state];
  const daily = provider.daily?.slice(-14) || [];
  const peak = Math.max(1, ...daily.map(point => point.bytes));
  return <section aria-label={`${provider.name} Monitor`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-100 p-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900"><Icon className="h-4 w-4 text-teal-700" />{provider.name}</h2>
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${style}`}>{label}</span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{provider.note}</p>
      <p className="mt-1.5 text-[11px] text-slate-400">ข้อมูลล่าสุด {time(provider.updatedAt)}</p>
      {provider.measuredThrough && <p className="mt-0.5 text-[11px] text-slate-400">รวมช่วงที่วัดถึง {time(provider.measuredThrough)} · รอบเดือน {provider.period} (UTC)</p>}
      {provider.serviceState && <p className="mt-2 text-xs font-semibold text-slate-600">{provider.serviceState}{provider.instancePlan ? ` · Instance ${provider.instancePlan}` : ''}</p>}
    </div>
    <div className="p-3 sm:p-4">
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5">
        {provider.metrics.map(metric => <MetricCard key={metric.id} metric={metric} />)}
      </div>
      {!provider.metrics.length && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">ยังไม่มียอดที่ยืนยันได้จากบริการนี้</p>}
      {daily.length > 0 && <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <p className="text-xs font-semibold text-slate-600">Bandwidth รายวัน · สูงสุด 14 วันที่มีข้อมูล</p>
        <div className="mt-3 flex h-16 items-end gap-1" role="img" aria-label={daily.map(p => `${p.date}: ${format(p.bytes, 'bytes')}`).join(', ')}>
          {daily.map(point => <div key={point.date} title={`${point.date}: ${format(point.bytes, 'bytes')}`} className="flex-1 rounded-t bg-teal-500/80" style={{ height: `${Math.max(2, point.bytes / peak * 100)}%` }} />)}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-slate-400"><span>{daily[0].date}</span><span>{daily[daily.length - 1].date}</span></div>
      </div>}
      <a href={provider.dashboardUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">เปิด {provider.name}{provider.id === 'render' ? ' Billing' : ''}<ArrowUpRight className="h-3.5 w-3.5" /></a>
    </div>
  </section>;
}

function MonitorContent() {
  const { setActiveTab } = useApp();
  const [data, setData] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const pending = useRef<AbortController | null>(null);
  const load = useCallback(async () => {
    if (pending.current) return;
    const controller = new AbortController(); pending.current = controller;
    setLoading(true); setError('');
    try { const snapshot = await getOwnerMonitorApi(controller.signal); if (!controller.signal.aborted) setData(snapshot); }
    catch { if (!controller.signal.aborted) setError('โหลดแผง Monitor ไม่สำเร็จ กรุณาลองอีกครั้ง ข้อมูลเดิมด้านล่างอาจไม่ใช่ค่าปัจจุบัน'); }
    finally { if (pending.current === controller) pending.current = null; if (!controller.signal.aborted) setLoading(false); }
  }, []);
  useEffect(() => { void load(); return () => { pending.current?.abort(); pending.current = null; }; }, [load]);
  const concerns = data?.providers.filter(provider => provider.state !== 'ok' || provider.metrics.some(metric => metric.limit && metric.value != null && metric.value >= metric.limit * .8)) || [];
  return <div className="mx-auto max-w-6xl space-y-4 px-3 py-4 sm:px-4" data-testid="owner-monitor">
    <header className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-800"><LockKeyhole className="h-3 w-3" />Owner เท่านั้น</div>
          <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900"><Activity className="h-5 w-5 text-teal-700" />Monitor</h1>
          <p className="mt-1 text-sm text-slate-500">ค่าใช้จ่าย โควต้า และพื้นที่ใช้งานของเว็บ</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('dashboard')} aria-label="กลับหน้าหลัก" className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"><ArrowLeft className="h-4 w-4" /></button>
          <button onClick={() => void load()} disabled={loading} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />{loading ? 'กำลังตรวจสอบ' : 'ตรวจข้อมูลล่าสุด'}</button>
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-500"><Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" /><div>ตรวจเมื่อเปิดหน้านี้ และเก็บผลไว้ใช้ซ้ำ 1 ชั่วโมง{data && <span className="block text-[11px] text-slate-400">ตรวจล่าสุด {time(data.generatedAt)} · ตรวจต้นทางได้อีกครั้ง {time(data.nextRefreshAt)}{data.cached ? ' · กำลังใช้ผลที่เก็บไว้' : ''}</span>}</div></div>
    </header>
    <p className="rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3 text-xs leading-relaxed text-sky-900">ตัวเลข “ประมาณการ” ใช้ช่วยวางแผน ค่าใช้จ่ายจริงและการตัดบัตรให้ตรวจในหน้าบิลของแต่ละบริการ ช่อง “—” หมายถึงยังไม่มีข้อมูล ไม่ใช่ไม่มีค่าใช้จ่าย</p>
    {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</div>}
    {concerns.length > 0 && <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900"><TriangleAlert className="h-4 w-4 shrink-0" /><span>ควรตรวจสอบ: {concerns.map(p => p.name).join(' · ')} — ใกล้โควต้าหรือข้อมูลยังไม่ครบ ดูรายละเอียดในการ์ดบริการ</span></div>}
    {loading && !data && <div role="status" className="rounded-2xl border border-slate-200 bg-white px-4 py-12 text-center text-sm text-slate-500">กำลังอ่านข้อมูลจากผู้ให้บริการ…</div>}
    {data && <div className="grid items-start gap-4 lg:grid-cols-2">{data.providers.map(provider => <ProviderCard key={provider.id} provider={provider} />)}</div>}
  </div>;
}

export function OwnerMonitorView() {
  const { currentUser, simulatedFromAdmin, setActiveTab } = useApp();
  // Unmount all readings immediately on logout, role switch, or simulation.
  if (currentUser.id !== 'user-ice' || simulatedFromAdmin) return <div className="mx-auto max-w-lg p-8 text-center"><p className="text-sm text-slate-500">ไม่สามารถเปิดหน้านี้ได้</p><button onClick={() => setActiveTab('dashboard')} className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">กลับหน้าหลัก</button></div>;
  return <MonitorContent />;
}
