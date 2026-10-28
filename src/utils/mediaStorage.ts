/**
 * Media Storage Helper for Video & Multimedia uploads
 * Stores video files of ANY size natively in browser IndexedDB
 * so there are NO file size limits, and localStorage never exceeds quota.
 */

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
 * Save video file of ANY size directly into IndexedDB.
 * Returns an 'idb://<key>' URI that can be stored safely in records (only ~20 chars).
 * No file size limit!
 */
export async function saveVideoFile(file: File): Promise<string> {
  const key = `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    const idbUrl = `idb://${key}`;
    // Pre-cache object URL for instant zero-latency playback
    const objUrl = URL.createObjectURL(file);
    objectUrlCache.set(idbUrl, objUrl);
    return idbUrl;
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to Object URL:', err);
    // Fallback: create in-memory Object URL
    const objUrl = URL.createObjectURL(file);
    objectUrlCache.set(key, objUrl);
    return objUrl;
  }
}

/**
 * Backwards compatibility helper for existing callers.
 * Stores video with NO size limit and returns the URL.
 */
export async function readVideoFile(file: File): Promise<string> {
  return saveVideoFile(file);
}

/**
 * Resolves an 'idb://<key>' URL into a live browser Object URL.
 * If already a standard URL (http/https/data:), returns it directly.
 */
export async function resolveVideoSrc(url?: string): Promise<string> {
  if (!url) return '';
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
