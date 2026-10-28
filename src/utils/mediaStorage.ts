/** New media is uploaded directly to the central server.
 * IndexedDB is read only for compatibility with legacy local video links.
 */

import { compressImageFile } from './imageCompressor';
import { uploadMediaToServer, getRenderServerUrl } from '../services/api';

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
 * Returns the shared URL after upload (Google Drive direct / 100 MB max).
 */
export async function readVideoFile(
  file: File,
  options?: { recordId?: string; recordType?: string; recordTitle?: string }
): Promise<string> {
  return saveVideoFile(file, options);
}

/**
 * Resolves an 'idb://<key>' URL or relative server URL into a playable URL.
 */
export async function resolveVideoSrc(url?: string): Promise<string> {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
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

/** Upload every processed image before the record can be saved. */
export async function uploadImageFile(file: File, maxDimension = 1600, quality = 0.82): Promise<string> {
  const compressed = await compressImageFile(file, maxDimension, quality);
  const blob = await (await fetch(compressed)).blob();
  return uploadMediaToServer(new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.jpg`, { type: 'image/jpeg' }));
}
