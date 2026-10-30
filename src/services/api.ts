import { unpackSnapshot } from './snapshotWire';
import { SupplierRecord, StoreInspoRecord, User, InviteLink, AppNotification, LabItem, LabFormulaStatus, FranchiseStore } from '../types';

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
  try {
    return sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}
export function setSessionToken(token: string | null) {
  centralSnapshot = null;
  try {
    if (token) {
      sessionStorage.setItem(SESSION_KEY, token);
      localStorage.setItem(SESSION_KEY, token);
    } else {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Ignore storage quota / private mode errors
  }
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
  const sessionRequest = Boolean(token && baseUrl === getRenderServerUrl());
  if (sessionRequest) headers.set('Authorization', `Bearer ${token}`);
  try {
    const response = await fetch(`${baseUrl}${path}`, { ...init, headers, cache: 'no-store', signal: controller.signal });
    let data: any;
    try {
      data = await response.json();
    } catch (e: any) {
      if (controller.signal.aborted || init.signal?.aborted) throw e;
      if (response.ok) throw new ApiError(502, 'เซิร์ฟเวอร์ตอบกลับไม่สมบูรณ์ ยังยืนยันการบันทึกไม่ได้ กรุณาลองใหม่');
      data = { error: `HTTP ${response.status}` };
    }
    if (!response.ok) {
      if (response.status === 401 && sessionRequest && token === getSessionToken() && baseUrl === getRenderServerUrl() && !['/api/login', '/api/register'].includes(path)) {
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
  const query = `?media=images-v1${cached?.version ? `&since=${encodeURIComponent(cached.version)}` : ''}`;
  const data = unpackSnapshot(await requestJson(`/api/data${query}`, { signal }));
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

export const postLeadLabItemApi = (value: Partial<LabItem>) => sendJson('/api/lead-lab/items', value);
export const deleteLeadLabItemApi = (id: string, expectedUpdatedAt?: string, operationId?: string) => sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}`, { expectedUpdatedAt, operationId }, 'DELETE');
export const likeLeadLabItemApi = (id: string, liked: boolean) => sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}/like`, { liked });
export const commentLeadLabItemApi = (id: string, payload: { content: string; sweetnessTarget?: string; photoUrl?: string; voiceUrl?: string; duration?: number }) => sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}/comments`, payload);
export const likeLeadLabCommentApi = (id: string, commentId: string, liked: boolean) => sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}/comments/${encodeURIComponent(commentId)}/like`, { liked });
export const cycleLeadLabItemApi = (id: string, payload: { action: 'close'; summary?: string; nextTitle?: string; expectedCycleNumber?: number; operationId: string }) => sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}/cycle`, payload);
export const updateLeadLabStatusApi = (id: string, status: LabFormulaStatus, expectedUpdatedAt?: string) => sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}/status`, { status, expectedUpdatedAt });
export const viewLeadLabItemApi = (id: string) => sendJson(`/api/lead-lab/items/${encodeURIComponent(id)}/view`, {});

export const postFranchiseStoreApi = (value: Partial<FranchiseStore>) => sendJson('/api/franchise-stores', value);
export const deleteFranchiseStoreApi = (id: string, expectedUpdatedAt?: string, operationId?: string) => sendJson(`/api/franchise-stores/${encodeURIComponent(id)}`, { expectedUpdatedAt, operationId }, 'DELETE');
export const viewFranchiseStoreApi = (id: string) => sendJson(`/api/franchise-stores/${encodeURIComponent(id)}/view`, {});

export async function uploadMediaToServer(
  file: File,
  options?: { recordId?: string; recordType?: string; recordTitle?: string }
): Promise<string> {
  let mimeType = file.type ? file.type.split(';')[0].toLowerCase() : '';

  // Fallback MIME detection from file extension if browser/OS reported empty or octet-stream
  if (!mimeType || mimeType === 'application/octet-stream') {
    const ext = (file.name || '').split('.').pop()?.toLowerCase();
    const extMap: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      txt: 'text/plain',
      csv: 'text/csv',
      zip: 'application/zip',
      rar: 'application/x-zip-compressed',
      '7z': 'application/x-zip-compressed',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      mp4: 'video/mp4',
      mov: 'video/quicktime',
      webm: 'video/webm',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      m4a: 'audio/mp4',
      aac: 'audio/aac',
      ogg: 'audio/ogg',
    };
    if (ext && extMap[ext]) {
      mimeType = extMap[ext];
    }
  }

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
      // A blocked Google connection must yield to the server relay, not hang forever.
      const uploadController = new AbortController();
      const uploadTimer = setTimeout(() => uploadController.abort(), 45000);
      let driveData: any;
      try {
        const uploadRes = await fetch(sessionRes.sessionUrl, {
          method: 'PUT', headers: { 'Content-Type': mimeType }, body: file,
          signal: uploadController.signal,
        });
        if (!uploadRes.ok) throw new Error(`Google Drive HTTP ${uploadRes.status}`);
        driveData = await uploadRes.json();
      } finally { clearTimeout(uploadTimer); }

      if (driveData) {
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
  const result = await requestJson(
    '/api/upload',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mimeType,
        base64,
        recordType: options?.recordType || 'misc',
        recordId: options?.recordId || '',
        recordTitle: options?.recordTitle || '',
      }),
    },
    120000
  );
  return new URL(result.url, getRenderServerUrl()).href;
}
export async function loginUserApi(idOrEmail: string, pin: string) {
  const result = await sendJson('/api/login', { idOrEmail, pin });
  setSessionToken(result.token);
  return result;
}

export interface GeocodePlaceItem {
  id: string;
  name: string;
  displayName: string;
  lat: number;
  lng: number;
  type?: string;
  country?: 'TH' | 'CN' | 'OTHER';
}

export async function searchPlacesApi(query: string, signal?: AbortSignal): Promise<GeocodePlaceItem[]> {
  const cleanQ = query.trim();
  if (!cleanQ) return [];

  try {
    const data = await requestJson(`/api/geocode/search?q=${encodeURIComponent(cleanQ)}`, { signal }, 7000);
    if (Array.isArray(data) && data.length > 0) {
      return data
        .map((item: any) => {
          const dName = item.display_name || '';
          const isTh = /thailand|ไทย/i.test(dName);
          const isCn = /china|จีน|guangdong|guangzhou/i.test(dName);
          return {
            id: String(item.place_id || Math.random()),
            name: item.name || dName.split(',')[0].trim(),
            displayName: dName,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            type: item.type || item.class || 'place',
            country: isTh ? 'TH' : isCn ? 'CN' : 'OTHER',
          } as GeocodePlaceItem;
        })
        .filter((item: GeocodePlaceItem) => !isNaN(item.lat) && !isNaN(item.lng));
    }
  } catch {
    // Try fallback
  }

  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQ)}&limit=10&accept-language=th,en`,
      { signal, headers: { Accept: 'application/json' } }
    );
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data)) {
        return data
          .map((item: any) => {
            const dName = item.display_name || '';
            const isTh = /thailand|ไทย/i.test(dName);
            const isCn = /china|จีน|guangdong|guangzhou/i.test(dName);
            return {
              id: String(item.place_id || Math.random()),
              name: item.name || dName.split(',')[0].trim(),
              displayName: dName,
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              type: item.type || item.class || 'place',
              country: isTh ? 'TH' : isCn ? 'CN' : 'OTHER',
            } as GeocodePlaceItem;
          })
          .filter((item: GeocodePlaceItem) => !isNaN(item.lat) && !isNaN(item.lng));
      }
    }
  } catch {
    // Ignore fetch error
  }

  return [];
}

export async function reverseGeocodeApi(lat: number, lng: number, signal?: AbortSignal): Promise<string> {
  if (isNaN(lat) || isNaN(lng)) return '';
  try {
    const data = await requestJson(`/api/geocode/reverse?lat=${lat}&lng=${lng}`, { signal }, 7000);
    if (data && (data.display_name || data.name)) {
      return data.display_name || data.name;
    }
  } catch {
    // Try fallback
  }

  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=th,en`,
      { signal, headers: { Accept: 'application/json' } }
    );
    if (resp.ok) {
      const data = await resp.json();
      return data.display_name || data.name || '';
    }
  } catch {
    // Ignore fallback error
  }

  return '';
}

export interface ParsedLocationInput {
  type: 'coords' | 'direct_url' | 'short_url';
  lat?: number;
  lng?: number;
  url?: string;
  raw?: string;
}

export function parseCoordinatesOrMapUrl(input: string): ParsedLocationInput | null {
  if (!input) return null;
  const str = input.trim();

  // Pattern 1: Raw coordinates with optional parentheses
  // e.g. "(13.9848152, 100.4729654)", "13.9848152, 100.4729654", "13.9848152 100.4729654"
  const coordRegex = /(?:\(|\b)([+-]?\d{1,2}\.\d+)[,\s]+([+-]?\d{1,3}\.\d+)(?:\)|\b)/;
  const coordMatch = str.match(coordRegex);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lng = parseFloat(coordMatch[2]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { type: 'coords', lat, lng, raw: `${lat.toFixed(7)}, ${lng.toFixed(7)}` };
    }
  }

  // Pattern 2: Google Maps direct link with coordinates in query or path
  const urlMatch = str.match(/https?:\/\/[^\s]+/i);
  if (urlMatch) {
    const url = urlMatch[0].replace(/[)>,;.]+$/, '');
    const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    const dMatch = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    const llMatch = url.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
    const match = qMatch || atMatch || dMatch || llMatch;
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { type: 'direct_url', lat, lng, url, raw: `${lat.toFixed(7)}, ${lng.toFixed(7)}` };
      }
    }
    // Pattern 3: Shortened Google Maps link
    if (/maps\.app\.goo\.gl|goo\.gl\/maps/i.test(url)) {
      return { type: 'short_url', url };
    }
  }
  return null;
}

export async function resolveMapUrlApi(url: string, signal?: AbortSignal): Promise<{ ok: boolean; lat?: number; lng?: number; resolvedUrl?: string; error?: string }> {
  try {
    const data = await requestJson(`/api/geocode/resolve-url?url=${encodeURIComponent(url)}`, { signal }, 8000);
    return data;
  } catch (err: any) {
    return { ok: false, error: err?.message || 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้' };
  }
}
