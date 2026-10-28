import { SupplierRecord, StoreInspoRecord, User, InviteLink, AppNotification } from '../types';

const RENDER_CONFIG_KEY = 'vitcha_render_server_url';
// Default Render service name convention
export const DEFAULT_RENDER_URL = 'https://vitcha-sourcing.onrender.com';

export function getRenderServerUrl(): string {
  // If hosted directly on Render or same domain
  if (typeof window !== 'undefined') {
    if (window.location.hostname.endsWith('onrender.com') || window.location.port === '3000') {
      return window.location.origin;
    }
    const saved = localStorage.getItem(RENDER_CONFIG_KEY);
    if (saved) return saved.trim().replace(/\/+$/, '');
  }
  return DEFAULT_RENDER_URL;
}

export function saveRenderServerUrl(url: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RENDER_CONFIG_KEY, url.trim().replace(/\/+$/, ''));
  }
}

export async function checkServerHealth(customUrl?: string): Promise<{ ok: boolean; message: string; count?: any }> {
  const baseUrl = customUrl ? customUrl.trim().replace(/\/+$/, '') : getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${baseUrl}/api/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { ok: true, message: 'เชื่อมต่อเซิร์ฟเวอร์ Render สำเร็จ!', count: data };
    }
    return { ok: false, message: `เซิร์ฟเวอร์ตอบกลับรหัส: ${res.status}` };
  } catch (err: any) {
    return { ok: false, message: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ (กำลังเริ่มทำงานหรือ URL ไม่ถูกต้อง)' };
  }
}

export async function fetchCentralData(): Promise<any | null> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/data`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Fetch central data warning (server waking up or offline):', err);
  }
  return null;
}

export async function postSupplierToCentral(supplier: SupplierRecord): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/suppliers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplier),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error posting supplier to central server:', err);
    return false;
  }
}

export async function deleteSupplierFromCentral(id: string): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/suppliers/${id}`, {
      method: 'DELETE',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error deleting supplier from central server:', err);
    return false;
  }
}

export async function postStoreToCentral(store: StoreInspoRecord): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/drink-stores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(store),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error posting drink store to central server:', err);
    return false;
  }
}

export async function deleteStoreFromCentral(id: string): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/drink-stores/${id}`, {
      method: 'DELETE',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error deleting drink store from central server:', err);
    return false;
  }
}

export async function postUserToCentral(user: User): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error posting user to central server:', err);
    return false;
  }
}

export async function deleteUserFromCentral(id: string): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
      method: 'DELETE',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error deleting user from central server:', err);
    return false;
  }
}

export async function postInviteToCentral(invite: InviteLink): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/invites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invite),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error posting invite to central server:', err);
    return false;
  }
}

export async function deleteInviteFromCentral(id: string): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/invites/${id}`, {
      method: 'DELETE',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error deleting invite from central server:', err);
    return false;
  }
}

export async function postNotificationToCentral(notif: AppNotification): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(`${baseUrl}/api/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notif),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error posting notification to central server:', err);
    return false;
  }
}

export async function syncAllToCentral(payload: {
  suppliers?: SupplierRecord[];
  drinkStores?: StoreInspoRecord[];
  users?: User[];
  invites?: InviteLink[];
  notifications?: AppNotification[];
}): Promise<boolean> {
  const baseUrl = getRenderServerUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const res = await fetch(`${baseUrl}/api/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error('Error syncing all to central server:', err);
    return false;
  }
}
