import { useEffect, useRef, useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { uploadMediaToServer } from '../services/api';
import { UploadOptions, UploadProgress } from '../services/chunkUpload';
import { VideoPlayer } from './VideoPlayer';
import { useApp } from '../context/AppContext';

type Job = { id: string; file: File; preview: string; controller: AbortController; progress: UploadProgress; error?: string };
type Props = { urls: string[]; onChange: (urls: string[]) => void; onBusyChange: (busy: boolean) => void; disabled?: boolean; label: string } & Pick<UploadOptions, 'recordId' | 'recordType' | 'recordTitle'>;
export function VideoUploadField({ urls, onChange, onBusyChange, disabled, label, ...metadata }: Props) {
  const { notifySuccess } = useApp();
  const [uploadedCount, setUploadedCount] = useState(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const jobsRef = useRef<Job[]>([]);
  const running = useRef(new Set<string>());
  const latest = useRef({ urls, onChange, onBusyChange });
  latest.current = { urls, onChange, onBusyChange };
  const publish = (next: Job[]) => { jobsRef.current = next; setJobs(next); latest.current.onBusyChange(next.some(j => !j.error)); };
  useEffect(() => () => { jobsRef.current.forEach(job => { job.controller.abort(); URL.revokeObjectURL(job.preview); }); jobsRef.current = []; }, []);
  const remove = (id: string) => {
    const job = jobsRef.current.find(j => j.id === id);
    if (!job) return;
    job.controller.abort(); URL.revokeObjectURL(job.preview);
    publish(jobsRef.current.filter(j => j.id !== id));
  };
  const start = async (job: Job) => {
    try {
      const url = await uploadMediaToServer(job.file, { ...metadata, signal: job.controller.signal, onProgress: progress => {
        if (jobsRef.current.some(j => j.id === job.id)) publish(jobsRef.current.map(j => j.id === job.id ? { ...j, progress } : j));
      } });
      if (job.controller.signal.aborted || !jobsRef.current.some(j => j.id === job.id)) return;
      // Update the ref before React renders, so simultaneous completions cannot lose a file.
      const next = [...latest.current.urls, url]; latest.current.urls = next; latest.current.onChange(next);
      remove(job.id);
      setUploadedCount(count => count + 1);
      notifySuccess('อัปโหลดวิดีโอเรียบร้อยแล้ว', 'กดบันทึกเพื่อเก็บวิดีโอกับรายการนี้');
    } catch (error) {
      if (!job.controller.signal.aborted) publish(jobsRef.current.map(j => j.id === job.id ? { ...j, error: error instanceof Error ? error.message : 'อัปโหลดไม่สำเร็จ' } : j));
    }
  };
  const runQueue = () => {
    while (running.current.size < 2) {
      const job = jobsRef.current.find(j => !j.error && !running.current.has(j.id));
      if (!job) break;
      running.current.add(job.id);
      void start(job).finally(() => { running.current.delete(job.id); runQueue(); });
    }
  };
  return <section aria-label={label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
    <h3 className="text-xs font-bold">{label} ({urls.length + jobs.length})</h3>
    <p className="text-xs text-slate-500">สูงสุด 2 GB ต่อไฟล์ · เปิดหน้านี้ไว้ระหว่างอัปโหลด</p>
    {uploadedCount > 0 && <p role="status" className="text-xs text-emerald-700">อัปโหลดวิดีโอแล้ว {uploadedCount} คลิป · กดบันทึกเพื่อเก็บกับรายการ</p>}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {urls.map((url, i) => <VideoPlayer key={`${url}-${i}`} src={url} className="rounded-xl h-40" badgeLabel={`คลิป #${i + 1}`} onRemove={disabled ? undefined : () => onChange(urls.filter((_, index) => i !== index))} />)}
      {jobs.map(job => <div key={job.id} className="relative rounded-xl border bg-white overflow-hidden" data-testid="video-upload-job">
        <video src={`${job.preview}#t=0.001`} muted playsInline controls preload="auto" className="w-full h-40 bg-black object-contain" />
        <button type="button" aria-label={`ยกเลิกอัปโหลด ${job.file.name}`} onClick={() => remove(job.id)} className="absolute top-2 right-2 rounded-full bg-rose-600 text-white p-2"><X size={18} /></button>
        <div className="p-3 space-y-2 text-xs">
          <p className="truncate">{job.file.name}</p>
          {job.error ? <><p role="alert" className="text-rose-700">{job.error}</p><button type="button" disabled={disabled} onClick={() => { const next = { ...job, error: undefined, controller: new AbortController(), progress: { percent: 0, phase: 'uploading' as const } }; publish(jobsRef.current.map(j => j.id === job.id ? next : j)); runQueue(); }} className="flex gap-1 text-emerald-700"><RefreshCw size={14} />ลองอีกครั้ง</button></> : <>
            <progress aria-label={`ความคืบหน้า ${job.file.name}`} value={job.progress.percent} max={100} className="w-full accent-emerald-600" />
            <p role="status">{job.progress.phase === 'saving' ? 'ส่งไฟล์ครบ 100% · กำลังบันทึกและตรวจสอบไฟล์' : `กำลังอัปโหลด ${job.progress.percent}%`}</p>
          </>}
        </div>
      </div>)}
    </div>
    <label className="block p-3 rounded-xl border bg-white text-xs font-semibold cursor-pointer">+ เลือกวิดีโอ / ถ่ายคลิปใหม่
      <input type="file" accept="video/*" multiple disabled={disabled || jobs.some(j => !j.error)} className="hidden" onChange={event => {
        const selected = Array.from(event.target.files || []).map(file => ({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file), controller: new AbortController(), progress: { percent: 0, phase: 'uploading' as const } }));
        publish([...jobsRef.current, ...selected]); runQueue(); event.target.value = '';
      }} />
    </label>
  </section>;
}
