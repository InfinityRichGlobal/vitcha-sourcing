import { useEffect, useState } from 'react';
import { getActivityEntries } from '../utils/activityHistory';
import { SupplierRecord, StoreInspoRecord, LocationRecord, User } from '../types';

const date = (value: string) => Number.isNaN(Date.parse(value)) ? value : new Date(value).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' });

export function ActivityTimeline({ item, users }: { item: SupplierRecord | StoreInspoRecord | LocationRecord; users: User[] }) {
  const [filter, setFilter] = useState('all');
  const [oldest, setOldest] = useState(false);
  const [limit, setLimit] = useState(20);
  useEffect(() => { setFilter('all'); setLimit(20); }, [item.id]);
  useEffect(() => { setLimit(20); }, [filter, oldest]);
  const events = getActivityEntries(item);
  const shown = events.filter(e => filter === 'all' || filter === 'files' && !!Object.keys(e.mediaCounts || {}).length || filter === 'comments' && ['comment', 'reply'].includes(e.kind || '') || filter === 'data' && ['create', 'update', 'delete', 'restore'].includes(e.kind || '') || filter === 'handoff' && e.kind === 'handoff')
    .map((e, index) => ({ e, index })).sort((a, b) => (oldest ? 1 : -1) * ((Date.parse(a.e.timestamp) || 0) - (Date.parse(b.e.timestamp) || 0) || a.index - b.index));
  return <section data-testid="activity-timeline" className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs leading-snug min-w-0">
    <h3 className="font-bold text-sm text-slate-900">ประวัติการดำเนินงาน</h3>
    <p className="text-slate-500">วันเวลา · ผู้ดำเนินการ · กิจกรรม</p>
    <div className="flex flex-wrap gap-2 items-center">
      <select aria-label="ประเภทประวัติ" value={filter} onChange={e => setFilter(e.target.value)} className="max-w-full rounded-lg border p-2 bg-white"><option value="all">ทั้งหมด</option><option value="handoff">ส่งต่องาน</option><option value="data">ข้อมูล</option><option value="comments">ความคิดเห็น</option><option value="files">ไฟล์และสื่อ</option></select>
      <button type="button" onClick={() => setOldest(!oldest)} className="border rounded-lg p-2 bg-white">{oldest ? 'เรียงเก่าก่อน' : 'เรียงใหม่ก่อน'}</button>
      <span className="text-slate-500">{shown.length} เหตุการณ์</span>
    </div>
    <div className="divide-y divide-slate-200">{shown.slice(0, limit).map(({ e, index }) => {
      const user = users.find(u => u.id === e.userId || u.alias === e.user || u.name === e.user);
      return <article key={e.id || `${e.timestamp}-${index}`} className="py-1.5 min-w-0" data-testid="activity-event">
        <time className="text-[11px] text-slate-500">{date(e.timestamp)}</time>
        <p className="break-words [overflow-wrap:anywhere]"><strong>{user?.alias || e.user}</strong> · {e.action}</p>
      </article>;
    })}</div>
    {!shown.length && <p className="text-slate-500">ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้</p>}
    {shown.length > limit && <button type="button" className="w-full border rounded-lg p-3 text-emerald-700" onClick={() => setLimit(limit + 20)}>แสดงประวัติเพิ่ม ({shown.length - limit} เหตุการณ์)</button>}
  </section>;
}
