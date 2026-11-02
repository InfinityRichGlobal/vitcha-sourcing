import { ApiError, getRenderServerUrl, getSessionToken, requestJson } from './api';
export type UploadProgress = { percent: number; phase: 'uploading' | 'saving' };
export type UploadOptions = { recordId?: string; recordType?: string; recordTitle?: string; signal?: AbortSignal; onProgress?: (progress: UploadProgress) => void };

function sendChunk(path: string, blob: Blob, signal: AbortSignal | undefined, progress: (loaded: number) => void): Promise<{ offset: number }> {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted();
    const xhr = new XMLHttpRequest();
    const abort = () => xhr.abort();
    const clean = () => signal?.removeEventListener('abort', abort);
    xhr.open('POST', `${getRenderServerUrl()}${path}`);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    const token = getSessionToken();
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.timeout = 180000;
    xhr.upload.onprogress = e => progress(e.loaded);
    xhr.onload = () => {
      clean();
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status < 200 || xhr.status >= 300) reject(new ApiError(xhr.status, data.error || 'อัปโหลดไม่สำเร็จ'));
        else resolve(data);
      } catch { reject(new Error('เซิร์ฟเวอร์ตอบกลับไม่สมบูรณ์')); }
    };
    xhr.onerror = () => { clean(); reject(new Error('การเชื่อมต่อขัดข้อง กรุณาลองใหม่')); };
    xhr.ontimeout = () => { clean(); reject(new Error('การอัปโหลดใช้เวลานานเกินไป กรุณาลองใหม่')); };
    xhr.onabort = () => { clean(); reject(new DOMException('ยกเลิกการอัปโหลด', 'AbortError')); };
    signal?.addEventListener('abort', abort, { once: true });
    xhr.send(blob);
  });
}
export async function uploadInChunks(file: File, mimeType: string, options: UploadOptions = {}): Promise<string> {
  const { signal, onProgress, recordId, recordType, recordTitle } = options;
  if (!file.size || file.size > 2 * 1024 ** 3) throw new Error('ไฟล์ต้องมีขนาดมากกว่า 0 และไม่เกิน 2 GB');
  signal?.throwIfAborted();
  onProgress?.({ percent: 0, phase: 'uploading' });
  const session = await requestJson('/api/uploads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.name, mimeType, fileSize: file.size, recordId, recordType, recordTitle }), signal });
  try {
    if (!session.id || !Number.isInteger(session.chunkSize) || session.chunkSize <= 0) throw new Error('เซิร์ฟเวอร์ตอบกลับไม่สมบูรณ์');
    let offset = 0;
    while (offset < file.size) {
      const end = Math.min(file.size, offset + session.chunkSize);
      const chunk = file.slice(offset, end);
      let result;
      for (let attempt = 0; attempt < 3; attempt++) {
        signal?.throwIfAborted();
        try {
          result = await sendChunk(`/api/uploads/${session.id}/chunk?offset=${offset}`, chunk, signal, loaded => onProgress?.({ percent: Math.min(100, Math.floor((offset + loaded) / file.size * 100)), phase: 'uploading' }));
          break;
        } catch (error) {
          if (signal?.aborted || (error instanceof ApiError && error.status < 500) || attempt === 2) throw error;
        }
      }
      if (result?.offset !== end) throw new Error('เซิร์ฟเวอร์รับส่วนของไฟล์ไม่ครบ');
      offset = end;
      onProgress?.({ percent: Math.floor(offset / file.size * 100), phase: 'uploading' });
    }
    onProgress?.({ percent: 100, phase: 'saving' });
    const result = await requestJson(`/api/uploads/${session.id}/complete`, { method: 'POST', signal }, 30 * 60 * 1000);
    signal?.throwIfAborted();
    if (!result.url) throw new Error('เซิร์ฟเวอร์ยังไม่ยืนยันไฟล์');
    return new URL(result.url, getRenderServerUrl()).href;
  } catch (error) {
    // Use a separate signal so cancellation also removes the server's temporary file.
    void requestJson(`/api/uploads/${session.id}`, { method: 'DELETE' }).catch(() => {});
    throw error;
  }
}
