import { activityStages as stages, activityStageName as stageName, activityFieldLabels as labels, getActivityEntries } from '../utils/activityHistory';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ActivityEntry, HandoffStage, SupplierRecord, StoreInspoRecord, LocationRecord, User } from '../types';
import { AvatarImage } from './AvatarImage';

const date = (value: string) => Number.isNaN(Date.parse(value)) ? value : new Date(value).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' });
const mediaFields = /photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/;
const safeUrl = (value: string) => /^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(value);
type Media = { url: string; kind: 'image' | 'audio' | 'video' };

function MediaPreview({ media, close }: { media: Media; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { dialog.current?.showModal(); }, []);
  return createPortal(<dialog ref={dialog} onCancel={close} onClose={close} onClick={e => { if (e.target === e.currentTarget) close(); }} className="fixed inset-0 m-auto max-w-[94vw] w-[900px] max-h-[90dvh] rounded-2xl p-4 backdrop:bg-black/70" aria-label="สื่อจากประวัติ">
    <div className="flex justify-end mb-3"><button type="button" autoFocus onClick={close} className="rounded-lg px-4 py-2 bg-slate-100 font-bold">ปิดสื่อ</button></div>
    {media.kind === 'image' ? <img src={media.url} alt="ภาพจากประวัติ" className="max-h-[72dvh] max-w-full mx-auto object-contain" /> : media.kind === 'audio' ? <audio controls src={media.url} className="w-full" /> : <video controls src={media.url} className="max-h-[72dvh] w-full" />}
  </dialog>, document.body);
}

function Value({ value, field, users, preview }: { value: unknown; field: string; users: User[]; preview: (m: Media) => void }): React.ReactNode {
  if (value === null || value === undefined || value === '' || Array.isArray(value) && !value.length) return <span className="text-slate-400">ยังไม่ระบุ / ไม่มีข้อมูล</span>;
  if (Array.isArray(value)) return <div className="space-y-2">{value.map((v, i) => <div key={i}><Value value={v} field={field} users={users} preview={preview} /></div>)}</div>;
  if (typeof value === 'object') return <dl className="space-y-1">{Object.entries(value).filter(([key]) => !['id', 'driveFileId'].includes(key)).map(([key, v]) => <div key={key}><dt className="text-slate-500 text-[11px]">{labels[key] || key}</dt><dd><Value value={v} field={`${field}.${key}`} users={users} preview={preview} /></dd></div>)}</dl>;
  if (typeof value === 'boolean') return value ? 'ใช่' : 'ไม่ใช่';
  const text = String(value);
  if (field === 'handoffStage') return stageName(text);
  if (field === 'assignedTo') return users.find(u => u.id === text || u.alias === text || u.name === text)?.alias || text;
  if (field === 'status') return ({ scouted: 'สำรวจแล้ว', reviewing: 'เทียบสเปก', rfq_sent: 'ส่ง RFQ', shortlisted: 'ตัวเต็ง', ordered: 'สั่งซื้อแล้ว' } as Record<string,string>)[text] || text;
  if (safeUrl(text) && (/url$/i.test(field) || mediaFields.test(field) || /videos|voice|audio/i.test(field))) {
    const kind = /voice|audio/i.test(field) ? 'audio' : /video/i.test(field) ? 'video' : mediaFields.test(field) || /\.(png|jpe?g|webp|gif)(\?|$)/i.test(text) ? 'image' : null;
    if (kind) return <button type="button" onClick={() => preview({ url: text, kind })} className="text-emerald-700 underline text-left">{kind === 'image' ? <img loading="lazy" src={text} alt="เปิดภาพจากประวัติ" className="max-w-full w-32 max-h-28 rounded-lg object-cover" /> : kind === 'audio' ? 'เปิดฟังเสียง' : 'เปิดดูวิดีโอ'}</button>;
    return <a href={text} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">เปิดไฟล์แนบ</a>;
  }
  return <span className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{text}</span>;
}

export function ActivityTimeline({ item, users }: { item: SupplierRecord | StoreInspoRecord | LocationRecord; users: User[] }) {
  const [selected, setSelected] = useState<HandoffStage | 'all'>('all');
  const [filter, setFilter] = useState('all');
  const [oldest, setOldest] = useState(false);
  const [limit, setLimit] = useState(20);
  const [media, setMedia] = useState<Media | null>(null);
  useEffect(() => { setSelected('all'); setFilter('all'); setLimit(20); setMedia(null); }, [item.id]);
  useEffect(() => { setLimit(20); }, [selected, filter, oldest]);
  const events = getActivityEntries(item);
  const current = item.handoffStage || 'awaiting';
  const visited = (stage: HandoffStage) => events.filter(e => e.version === 2 && (e.stageAfter === stage || e.stageBefore === stage));
  const isFiles = (e: ActivityEntry) => !!(e.content?.photoUrl || e.content?.voiceUrl || e.content?.audioUrl || e.changes?.some(c => /photos|videos|voice|attachedFiles|catalogItems|drinkItems/.test(c.field)));
  const shown = events.filter(e => (selected === 'all' || e.version === 2 && (e.stageAfter === selected || e.stageBefore === selected)) && (filter === 'all' || filter === 'files' && isFiles(e) || filter === 'comments' && ['comment','reply'].includes(e.kind || '') || filter === 'data' && ['create','update','delete','restore'].includes(e.kind || '') || filter === 'handoff' && e.kind === 'handoff')).map((e, index) => ({ e, index })).sort((a,b) => (oldest ? 1 : -1) * ((Date.parse(a.e.timestamp) - Date.parse(b.e.timestamp) || a.index - b.index)));
  return <section data-testid="activity-timeline" className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs min-w-0">
    <h3 className="font-bold text-sm text-slate-900">ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)</h3>
    <p className="text-slate-600">ประวัติทั้งหมดของรายการนี้ รวมทุกพาร์ทที่เคยบันทึก · กดพาร์ทเพื่อกรองดูเฉพาะส่วนได้</p>
    <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
      <p className="font-bold text-emerald-800">ปัจจุบัน: {stageName(current)}</p>
      <p>ผู้รับช่วงต่อ: <Value field="assignedTo" value={item.assignedTo} users={users} preview={setMedia} /></p>
      <p>กำหนดติดตาม: {item.targetFollowUpDate || 'ยังไม่ระบุ'}</p>
      <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">หมายเหตุล่าสุด: {item.handoffNotes || 'ยังไม่ระบุ'}</p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" aria-label="เส้นทางทั้ง 6 พาร์ท">{stages.map(([stage, title], index) => {
      const history = visited(stage);
      const transitions = history.filter(e => e.stageAfter === stage && e.stageBefore !== stage);
      return <button type="button" key={stage} aria-pressed={selected === stage} onClick={() => { setSelected(selected === stage ? 'all' : stage); setFilter('all'); }} className={`text-left p-3 rounded-xl border space-y-1 ${selected === stage ? 'ring-2 ring-emerald-600' : ''} ${current === stage ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-slate-200'}`}>
        <span className="block font-bold">พาร์ท {index + 1}: {title}</span>
        <span className="block text-[11px] text-slate-600">{current === stage ? 'อยู่ขั้นตอนนี้' : history.length ? 'เคยอยู่ขั้นตอนนี้' : 'ยังไม่มีบันทึก'}</span>
        {!!transitions.length && <span className="block text-[10px] text-slate-500">บันทึกเข้า {transitions.length} ครั้ง · {date(transitions[transitions.length-1].timestamp)}</span>}
      </button>;
    })}</div>
    {events.some(e => e.version !== 2) && <p className="text-amber-800 bg-amber-50 p-2 rounded-lg">ประวัติเก่าอาจเป็นข้อความย่อ ไม่มีค่าเดิมหรือพาร์ทก่อนหน้า ระบบแสดงเท่าที่เคยบันทึก ไม่เติมขั้นตอนย้อนหลัง</p>}
    <div className="flex flex-wrap gap-2 items-center">
      <button type="button" onClick={() => { setSelected('all'); setFilter('all'); }} className="text-emerald-700 underline">ดูทุกพาร์ท</button>
      <select aria-label="ประเภทประวัติ" value={filter} onChange={e => setFilter(e.target.value)} className="max-w-full rounded-lg border p-2 bg-white"><option value="all">ทั้งหมด</option><option value="handoff">ส่งต่องาน</option><option value="data">ข้อมูล</option><option value="comments">ความคิดเห็น</option><option value="files">ไฟล์และสื่อ</option></select>
      <button type="button" onClick={() => setOldest(!oldest)} className="border rounded-lg p-2 bg-white">{oldest ? 'เรียงเก่าก่อน' : 'เรียงใหม่ก่อน'}</button>
    </div>
    <p className="font-bold">{selected === 'all' ? 'ประวัติทุกพาร์ท' : stageName(selected)} · {shown.length} เหตุการณ์</p>
    <div className="space-y-3">{shown.slice(0,limit).map(({ e, index }) => {
      const user = users.find(u => u.id === e.userId || u.alias === e.user || u.name === e.user);
      const moved = e.version === 2 && e.stageBefore && e.stageBefore !== e.stageAfter;
      return <article key={e.id || `${e.timestamp}-${index}`} className="bg-white rounded-xl border p-3 min-w-0 space-y-2" data-testid="activity-event">
        <div className="flex gap-2 items-start"><AvatarImage src={e.userAvatar || user?.avatar || './logo.jpg'} alt="" className="w-7 h-7 shrink-0 rounded-full" /><div className="min-w-0"><strong className="break-words">{user?.alias || e.user}</strong><time className="block text-[10px] text-slate-500">{date(e.timestamp)}</time></div></div>
        <p className="font-semibold whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{e.kind === 'comment' ? 'แสดงความคิดเห็น' : e.kind === 'reply' ? 'ตอบกลับความคิดเห็น' : e.kind === 'handoff' ? 'อัปเดตการส่งต่องาน' : e.action}</p>
        {moved && <p className="text-emerald-800 font-bold">{stageName(e.stageBefore)} → {stageName(e.stageAfter)}</p>}
        {e.version === 2 && !moved && <p className="text-[10px] text-slate-500">ณ {stageName(e.stageAfter)}</p>}
        {e.content && e.version !== 2 && <p className="text-[10px] text-amber-800">ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น</p>}
        {e.content && <div className="space-y-2">{e.content.replyToAuthor && <p>ตอบกลับ {e.content.replyToAuthor}</p>}<p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{e.content.text}</p>{e.content.photoUrl && <Value value={e.content.photoUrl} field="photo" users={users} preview={setMedia} />}{(e.content.voiceUrl || e.content.audioUrl) && <Value value={e.content.voiceUrl || e.content.audioUrl} field="voice" users={users} preview={setMedia} />}</div>}
        {!!e.changes?.length && <details open={e.kind !== 'create'}><summary className="cursor-pointer text-emerald-700 font-bold py-1">รายละเอียดที่บันทึก ({e.changes.length})</summary><div className="space-y-3 mt-2">{e.changes.map(c => <div key={c.field} className="border-t pt-2"><h4 className="font-bold mb-2">{labels[c.field] || c.field}</h4><div className="grid sm:grid-cols-2 gap-2"><div className="min-w-0 rounded-lg bg-slate-50 p-2"><p className="text-[10px] text-slate-500 mb-1">ก่อนเปลี่ยน</p><Value value={c.before} field={c.field} users={users} preview={setMedia} /></div><div className="min-w-0 rounded-lg bg-emerald-50 p-2"><p className="text-[10px] text-emerald-700 mb-1">หลังเปลี่ยน</p><Value value={c.after} field={c.field} users={users} preview={setMedia} /></div></div></div>)}</div></details>}
      </article>;
    })}</div>
    {!shown.length && <p className="text-slate-500">ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้</p>}
    {shown.length > limit && <button type="button" className="w-full border rounded-lg p-3 text-emerald-700" onClick={() => setLimit(limit+20)}>แสดงประวัติเพิ่ม ({shown.length-limit} เหตุการณ์)</button>}
    {media && <MediaPreview media={media} close={() => setMedia(null)} />}
  </section>;
}
