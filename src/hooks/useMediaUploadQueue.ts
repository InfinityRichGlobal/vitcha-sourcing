import { useEffect, useRef, useState } from 'react';
import { uploadMediaToServer } from '../services/api';
import { uploadImageFile } from '../utils/mediaStorage';
import type { UploadOptions } from '../services/chunkUpload';

type Job = { id: string; file: File; preview: string; status: 'queued' | 'uploading' | 'error'; error?: string };
type Options = Pick<UploadOptions, 'recordId' | 'recordType' | 'recordTitle'> & {
  enabled?: boolean;
  onComplete: (id: string, url: string, file: File) => void;
  onBusyChange: (busy: boolean) => void;
};

/** Retain the selected original until acknowledged or explicitly removed. */
export function useMediaUploadQueue(options: Options) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const current = useRef<Job[]>([]);
  const latest = useRef(options); latest.current = options;
  const active = useRef(new Map<string, AbortController>());
  const previews = useRef(new Set<string>());
  const mounted = useRef(true);
  const busy = useRef(false);
  const publish = (next: Job[]) => {
    current.current = next;
    if (mounted.current) setJobs(next);
    if (!!next.length !== busy.current) {
      busy.current = !!next.length;
      latest.current.onBusyChange(busy.current);
    }
  };
  const pump = () => {
    if (!mounted.current || latest.current.enabled === false || !navigator.onLine) return;
    while (active.current.size < 6) {
      const job = current.current.find(j => j.status === 'queued' && !active.current.has(j.id));
      if (!job) break;
      const controller = new AbortController(); active.current.set(job.id, controller);
      publish(current.current.map(j => j === job ? { ...j, status: 'uploading' } : j));
      const { recordType, recordTitle, recordId } = latest.current;
      const upload = job.file.type.startsWith('image/') ? uploadImageFile : uploadMediaToServer;
      void upload(job.file, { recordType, recordTitle, recordId, signal: controller.signal }).then(url => {
        if (!mounted.current || controller.signal.aborted || !current.current.some(j => j.id === job.id)) return;
        latest.current.onComplete(job.id, url, job.file);
        publish(current.current.filter(j => j.id !== job.id));
      }).catch(error => {
        if (!mounted.current || controller.signal.aborted) return;
        publish(current.current.map(j => j.id === job.id ? { ...j, status: 'error', error: error instanceof Error ? error.message : 'อัปโหลดไม่สำเร็จ' } : j));
      }).finally(() => {
        if (active.current.get(job.id) === controller) active.current.delete(job.id);
        pumpRef.current();
      });
    }
  };
  const pumpRef = useRef(pump); pumpRef.current = pump;
  const remove = (id: string) => {
    active.current.get(id)?.abort(); active.current.delete(id);
    const job = current.current.find(j => j.id === id);
    if (job) { URL.revokeObjectURL(job.preview); previews.current.delete(job.preview); }
    publish(current.current.filter(j => j.id !== id));
    pumpRef.current();
  };
  const clear = () => {
    for (const controller of active.current.values()) controller.abort();
    active.current.clear();
    for (const preview of previews.current) URL.revokeObjectURL(preview);
    previews.current.clear(); publish([]);
  };
  useEffect(() => {
    mounted.current = true;
    const online = () => pumpRef.current();
    window.addEventListener('online', online);
    return () => { mounted.current = false; window.removeEventListener('online', online); clear(); };
  }, []);
  useEffect(() => { if (options.enabled === false) clear(); }, [options.enabled]);
  return {
    jobs,
    enqueue: (id: string, file: File) => {
      // Supersede a selected file without allowing its late response to win.
      active.current.get(id)?.abort(); active.current.delete(id);
      const preview = URL.createObjectURL(file); previews.current.add(preview);
      publish([...current.current.filter(j => j.id !== id), { id, file, preview, status: 'queued' }]);
      pumpRef.current(); return preview;
    },
    remove,
    retry: (id?: string) => {
      publish(current.current.map(j => j.status === 'error' && (!id || j.id === id) ? { ...j, status: 'queued', error: undefined } : j));
      pumpRef.current();
    },
  };
}
