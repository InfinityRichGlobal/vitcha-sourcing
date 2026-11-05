/** New media is uploaded directly to the central server.
 * IndexedDB is read only for compatibility with legacy local video links.
 */

import { uploadMediaToServer, getRenderServerUrl } from '../services/api';
import type { UploadOptions } from '../services/chunkUpload';

const DB_NAME = 'vitcha_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported'));
      return;
    }
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('Failed to open IndexedDB'));
  });
  return dbPromise;
}

// In-memory cache for Object URLs to ensure fast instantaneous playback
const objectUrlCache = new Map<string, string>();

/**
 * Save video file: Uploads to central server first so team can view it.
 * Upload failure is reported to the form; there is no local fallback.
 */
export async function saveVideoFile(
  file: File,
  options?: { recordId?: string; recordType?: string; recordTitle?: string }
): Promise<string> {
  // No local fallback: every new record must reference media shared with the team.
  return await uploadMediaToServer(file, options);
}

/**
 * Backwards compatibility helper for existing callers.
 * Returns the shared URL after the server confirms the chunked upload.
 */
export async function readVideoFile(
  file: File,
  options?: { recordId?: string; recordType?: string; recordTitle?: string }
): Promise<string> {
  return saveVideoFile(file, options);
}

export const FALLBACK_DEMO_VIDEO_URL =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

/**
 * Resolves an 'idb://<key>' URL or relative server URL into a playable URL.
 */
export async function resolveVideoSrc(url?: string): Promise<string> {
  if (!url) return '';
  if (url.includes('gtv-videos-bucket')) {
    return FALLBACK_DEMO_VIDEO_URL;
  }
  if (url.startsWith('/uploads/') || url.startsWith('/media/')) {
    return `${getRenderServerUrl()}${url}`;
  }
  if (!url.startsWith('idb://')) return url;

  if (objectUrlCache.has(url)) {
    return objectUrlCache.get(url)!;
  }

  const key = url.replace('idb://', '');
  try {
    const db = await getDB();
    const blob = await new Promise<Blob | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as Blob) || null);
      req.onerror = () => reject(req.error);
    });

    if (blob) {
      const objUrl = URL.createObjectURL(blob);
      objectUrlCache.set(url, objUrl);
      return objUrl;
    }
  } catch (err) {
    console.warn('Failed to load video from IndexedDB:', err);
  }
  return url;
}

/**
 * Delete a video from IndexedDB to reclaim disk space
 */
export async function deleteVideoFile(url: string): Promise<void> {
  if (!url || !url.startsWith('idb://')) return;
  const key = url.replace('idb://', '');
  if (objectUrlCache.has(url)) {
    URL.revokeObjectURL(objectUrlCache.get(url)!);
    objectUrlCache.delete(url);
  }
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch (err) {
    console.warn('Failed to delete video from IndexedDB:', err);
  }
}

export function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return (
    url.startsWith('idb://') ||
    url.startsWith('data:video/') ||
    url.startsWith('blob:') ||
    url.endsWith('.mp4') ||
    url.endsWith('.mov') ||
    url.endsWith('.webm') ||
    url.includes('gtv-videos-bucket')
  );
}

/** Keep original pixels, format and metadata: never resize/re-encode field photos.
 * Large originals use the existing resumable chunk transport automatically.
 */
export async function uploadImageFile(file: File, options?: UploadOptions): Promise<string> {
  options?.signal?.throwIfAborted();
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
    throw new Error('รองรับไฟล์ต้นฉบับ JPG, PNG, WebP และ GIF กรุณาเลือกไฟล์ชนิดที่รองรับ');
  }
  return uploadMediaToServer(file, options);
}

/** Original avatar bytes for invite/profile requests, without canvas conversion. */
export async function readOriginalImage(file: File): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) throw new Error('รองรับ JPG, PNG, WebP และ GIF');
  if (!file.size || file.size > 25 * 1024 * 1024) throw new Error('รูปโปรไฟล์ต้องมีขนาดไม่เกิน 25 MB');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('อ่านไฟล์ภาพไม่สำเร็จ'));
    reader.readAsDataURL(file);
  });
}
