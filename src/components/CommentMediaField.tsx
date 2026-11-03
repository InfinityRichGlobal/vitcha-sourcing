import { useEffect, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { CommentMedia } from '../types';
import { UploadOptions, UploadProgress } from '../services/chunkUpload';
import { uploadMediaToServer } from '../services/api';
import { uploadImageFile } from '../utils/mediaStorage';
import { MediaImage } from './MediaImage';
import { normalizeMediaUrl } from '../utils/mediaUrl';

type Job = { id: string; file: File; preview: string; controller: AbortController; progress: UploadProgress; error?: string };
type Props = { value: CommentMedia[]; onChange: (value: CommentMedia[]) => void; onBusyChange: (busy: boolean) => void; disabled?: boolean } & Pick<UploadOptions, 'recordId' | 'recordType' | 'recordTitle'>;
export function CommentMediaField({ value, onChange, onBusyChange, disabled, ...metadata }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState('');
  const jobsRef = useRef<Job[]>([]);
  const running = useRef(new Set<string>());
  const latest = useRef({ value, onChange, onBusyChange }); latest.current = { value, onChange, onBusyChange };
  const change = (next: CommentMedia[]) => { latest.current.value = next; latest.current.onChange(next); };
  // Failed attachments also block posting, so a partial batch is never silently sent.
  const publish = (next: Job[]) => { jobsRef.current = next; setJobs(next); latest.current.onBusyChange(next.length > 0); };
  useEffect(() => () => {
    const pending = new Set(jobsRef.current.map(j => j.id));
    for (const job of jobsRef.current) { job.controller.abort(); URL.revokeObjectURL(job.preview); }
    jobsRef.current = [];
    if (pending.size) { latest.current.onChange(latest.current.value.filter(m => !pending.has(m.id))); latest.current.onBusyChange(false); }
  }, []);
  const remove = (id: string) => {
    const job = jobsRef.current.find(j => j.id === id); job?.controller.abort();
    if (job) URL.revokeObjectURL(job.preview);
    change(latest.current.value.filter(m => m.id !== id)); publish(jobsRef.current.filter(j => j.id !== id));
  };
  const start = async (job: Job) => {
    try {
      const options = { ...metadata, signal: job.controller.signal, onProgress: (progress: UploadProgress) => {
        if (jobsRef.current.some(j => j.id === job.id)) publish(jobsRef.current.map(j => j.id === job.id ? { ...j, progress } : j));
      } };
      const url = job.file.type.startsWith('image/') ? await uploadImageFile(job.file, 1600, 0.82, options) : await uploadMediaToServer(job.file, options);
      if (job.controller.signal.aborted || !jobsRef.current.some(j => j.id === job.id)) return;
      change(latest.current.value.map(m => m.id === job.id ? { ...m, url } : m));
      URL.revokeObjectURL(job.preview); publish(jobsRef.current.filter(j => j.id !== job.id));
    } catch (e) {
      if (!job.controller.signal.aborted) publish(jobsRef.current.map(j => j.id === job.id ? { ...j, error: e instanceof Error ? e.message : 'อัปโหลดไม่สำเร็จ' } : j));
    }
  };
  const runQueue = () => {
    while (running.current.size < 2) {
      const job = jobsRef.current.find(j => !j.error && !running.current.has(j.id)); if (!job) break;
      running.current.add(job.id); void start(job).finally(() => { running.current.delete(job.id); runQueue(); });
    }
  };
  return <section aria-label="แนบรูปและวิดีโอในความคิดเห็น" className="space-y-2">
    <label className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 cursor-pointer"><ImagePlus size={18} /> เพิ่มรูป / วิดีโอหลายไฟล์
      <input aria-label="เลือกรูปและวิดีโอแนบความคิดเห็น" type="file" accept="image/*,video/*" multiple disabled={disabled} className="sr-only" onChange={e => {
        const files = Array.from(e.target.files || []); e.target.value = ''; setError('');
        if (files.some(f => !/^(image|video)\//.test(f.type))) { setError('เลือกได้เฉพาะรูปภาพและวิดีโอ'); return; }
        if (latest.current.value.length + files.length > 20) { setError('แนบได้สูงสุด 20 ไฟล์ต่อความคิดเห็น'); return; }
        const next = files.map(file => ({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file), controller: new AbortController(), progress: { percent: 0, phase: 'uploading' as const } }));
        change([...latest.current.value, ...next.map(j => ({ id: j.id, type: j.file.type.startsWith('image/') ? 'image' as const : 'video' as const, url: j.preview, name: j.file.name }))]);
        publish([...jobsRef.current, ...next]); runQueue();
      }} />
    </label>
    <p className="text-[10px] text-slate-500">สูงสุด 20 ไฟล์ต่อความคิดเห็น · วิดีโอไม่เกิน 2 GB ต่อไฟล์</p>
    {error && <p role="alert" className="text-xs text-rose-700">{error}</p>}
    <div className="flex flex-wrap gap-2">{value.map((m, i) => {
      const job = jobs.find(j => j.id === m.id);
      return <div key={m.id} className="relative w-28 rounded-xl border bg-white p-1" data-testid="comment-media-draft">
        {m.type === 'image' ? <MediaImage src={m.url} alt={`รูปพร้อมแนบ ${i + 1}`} className="h-24 w-full rounded-lg object-cover" /> : <video src={`${normalizeMediaUrl(m.url)}#t=0.001`} muted playsInline controls preload="metadata" className="h-24 w-full rounded-lg bg-black object-contain" />}
        <button type="button" disabled={disabled} aria-label={`ลบไฟล์แนบ ${i + 1}`} onClick={() => remove(m.id)} className="absolute right-0 top-0 rounded-full bg-slate-900 p-2 text-white disabled:opacity-40"><X size={14} /></button>
        {job ? <div className="p-1 text-[10px]">{job.error ? <><p role="alert" className="text-rose-700 break-words">{job.error}</p><button type="button" disabled={disabled} onClick={() => { publish(jobsRef.current.map(j => j.id === job.id ? { ...j, error: undefined, controller: new AbortController() } : j)); runQueue(); }} className="py-2 text-emerald-700 font-bold">ลองอัปโหลดใหม่</button></> : <><progress aria-label={`อัปโหลด ${m.name}`} value={job.progress.percent} max={100} className="w-full" /><p>{job.progress.phase === 'saving' ? 'กำลังตรวจสอบไฟล์…' : `อัปโหลด ${job.progress.percent}%`}</p></>}</div> : <p className="p-1 text-[10px] text-emerald-700">พร้อมส่ง</p>}
      </div>;
    })}</div>
    {!!value.length && <p role="status" className="text-xs text-slate-500">{jobs.length ? 'รออัปโหลดครบ หรือเอาไฟล์ที่ไม่สำเร็จออกก่อนส่ง' : `อัปโหลดครบ ${value.length} ไฟล์แล้ว · กดโพสต์เพื่อส่งให้ทีม`}</p>}
  </section>;
}
