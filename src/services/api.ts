import { SupplierRecord, StoreInspoRecord, User, InviteLink, AppNotification } from '../types';

const RENDER_CONFIG_KEY = 'vitcha_render_server_url';
// The migrated service uses durable Supabase storage. Retire saved settings
// pointing at the old file-backed endpoint so devices share one database.
export const DEFAULT_RENDER_URL = 'https://vitcha-sourcing-fxjw.onrender.com';
const LEGACY_RENDER_URL = 'https://vitcha-sourcing.onrender.com';

export function getRenderServerUrl(): string {
  // If hosted directly on Render or same domain
  if (typeof window !== 'undefined') {
    if (window.location.origin === LEGACY_RENDER_URL) return DEFAULT_RENDER_URL;
    if (window.location.hostname.endsWith('onrender.com') || ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      return window.location.origin;
    }
    const saved = localStorage.getItem(RENDER_CONFIG_KEY);
    if (saved) {
      const normalized = saved.trim().replace(/\/+$/, '');
      return normalized === LEGACY_RENDER_URL ? DEFAULT_RENDER_URL : normalized;
    }
  }
  return DEFAULT_RENDER_URL;
}

export function saveRenderServerUrl(url: string): void {
  setSessionToken(null);
  if (typeof window !== 'undefined') {
    localStorage.setItem(RENDER_CONFIG_KEY, url.trim().replace(/\/+$/, ''));
  }
}

const SESSION_KEY = 'vitcha_session_token';
let centralSnapshot: { key: string; data: any } | null = null;
export function getSessionToken(): string | null {
  try { return sessionStorage.getItem(SESSION_KEY); } catch { return null; }
}
export function setSessionToken(token: string | null) {
  centralSnapshot = null;
  if (token) sessionStorage.setItem(SESSION_KEY, token);
  else sessionStorage.removeItem(SESSION_KEY);
}
export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function requestJson(path: string, init: RequestInit = {}, timeoutMs = 30000, baseUrl = getRenderServerUrl()): Promise<any> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  init.signal?.addEventListener('abort', onAbort, { once: true });
  if (init.signal?.aborted) controller.abort();
  const timeout = setTimeout(onAbort, timeoutMs);
  const headers = new Headers(init.headers);
  const token = getSessionToken();
  // Never send a session to a custom health-check server.
  if (token && baseUrl === getRenderServerUrl()) headers.set('Authorization', `Bearer ${token}`);
  try {
    const response = await fetch(`${baseUrl}${path}`, { ...init, headers, cache: 'no-store', signal: controller.signal });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401 && !['/api/login', '/api/register'].includes(path)) {
        setSessionToken(null);
        window.dispatchEvent(new Event('vitcha:session-expired'));
      }
      throw new ApiError(response.status, data.error || `HTTP ${response.status}`);
    }
    return data;
  } finally {
    clearTimeout(timeout);
    init.signal?.removeEventListener('abort', onAbort);
  }
}
export const sendJson = (path: string, body: unknown, method = 'POST') => requestJson(path, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
export async function checkServerHealth(customUrl?: string): Promise<{ ok: boolean; message: string; count?: any }> {
  try {
    const data = await requestJson('/api/health', {}, 10000, customUrl?.trim().replace(/\/+$/, '') || getRenderServerUrl());
    return { ok: true, message: 'เชื่อมต่อเซิร์ฟเวอร์สำเร็จ', count: data };
  } catch { return { ok: false, message: 'เซิร์ฟเวอร์อาจกำลังเริ่มทำงาน กรุณารอสักครู่แล้วลองอีกครั้ง' }; }
}
export async function fetchCentralData(signal?: AbortSignal) {
  const key = `${getRenderServerUrl()}|${getSessionToken()}`;
  const cached = centralSnapshot?.key === key ? centralSnapshot.data : null;
  const query = cached?.version ? `?since=${encodeURIComponent(cached.version)}` : '';
  const data = await requestJson(`/api/data${query}`, { signal });
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  if (data.unchanged && cached) return cached;
  centralSnapshot = { key, data };
  return data;
}
export const postSupplierToCentral = (value: SupplierRecord) => sendJson('/api/suppliers', value);
export const postStoreToCentral = (value: StoreInspoRecord) => sendJson('/api/drink-stores', value);
export const postUserToCentral = (value: Partial<User>) => sendJson('/api/users', value);
export const postInviteToCentral = (value: Partial<InviteLink>) => sendJson('/api/invites', value);
export const postNotificationToCentral = (value: AppNotification) => sendJson('/api/notifications', value);
export const deleteSupplierFromCentral = (id: string, revision: number) => sendJson(`/api/suppliers/${encodeURIComponent(id)}`, { revision }, 'DELETE');
export const deleteStoreFromCentral = (id: string, revision: number) => sendJson(`/api/drink-stores/${encodeURIComponent(id)}`, { revision }, 'DELETE');
export const deleteUserFromCentral = (id: string, revision: number) => sendJson(`/api/users/${encodeURIComponent(id)}`, { revision }, 'DELETE');
export const deleteInviteFromCentral = (id: string) => sendJson(`/api/invites/${encodeURIComponent(id)}`, {}, 'DELETE');
export const markNotificationsReadApi = (params: { id?: string; all?: boolean }) => sendJson('/api/notifications/read', params);
export const clearNotificationsApi = (params: { id?: string; all?: boolean }) => sendJson('/api/notifications/clear', params);
export const getDriveStatusApi = () => requestJson('/api/drive/status');
export const saveDriveConfigApi = (config: { clientId: string; clientSecret: string; refreshToken: string; folderId?: string }) =>
  sendJson('/api/drive/config', config);

export async function uploadMediaToServer(
  file: File,
  options?: { recordId?: string; recordType?: string; recordTitle?: string }
): Promise<string> {
  const mimeType = file.type.split(';')[0].toLowerCase();

  // Try direct resumable upload to Google Drive first if session is available
  try {
    const sessionRes = await sendJson('/api/drive/session', {
      filename: file.name || `file-${Date.now()}`,
      mimeType,
      fileSize: file.size,
      recordType: options?.recordType || 'misc',
      recordId: options?.recordId || 'general',
      recordTitle: options?.recordTitle || '',
    });

    if (sessionRes?.directAvailable && sessionRes?.sessionUrl) {
      const uploadRes = await fetch(sessionRes.sessionUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': mimeType,
          'Content-Length': String(file.size),
        },
        body: file,
      });

      if (uploadRes.ok) {
        const driveData = await uploadRes.json();
        if (driveData?.id) {
          const completeRes = await sendJson('/api/drive/complete', {
            fileId: driveData.id,
            folderId: sessionRes.folderId,
            recordId: options?.recordId || 'general',
            filename: file.name,
            mimeType,
            fileSize: file.size,
            md5Checksum: driveData.md5Checksum,
          });
          if (completeRes?.url) {
            return new URL(completeRes.url, getRenderServerUrl()).href;
          }
        }
      }
    }
  } catch (driveErr) {
    // Non-blocking fallback to server storage
    console.warn('Direct Drive upload skipped or unavailable, using server upload:', driveErr);
  }

  // Fallback to server media storage
  if (file.size > 50 * 1024 * 1024) throw new Error('ไฟล์ต้องไม่เกิน 50 MB');
  const normalized = new Blob([file], { type: mimeType });
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('อ่านไฟล์ไม่สำเร็จ'));
    reader.readAsDataURL(normalized);
  });
  const result = await requestJson('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mimeType, base64 }) }, 120000);
  return new URL(result.url, getRenderServerUrl()).href;
}
export async function loginUserApi(idOrEmail: string, pin: string) {
  const result = await sendJson('/api/login', { idOrEmail, pin });
  setSessionToken(result.token);
  return result;
}
