import { getRenderServerUrl } from '../services/api';

/** Stored media belongs to the API origin, even when the UI is hosted elsewhere. */
export function normalizeMediaUrl(url?: string): string {
  if (!url) return '';
  return /^\/?(?:media|uploads)\//.test(url)
    ? `${getRenderServerUrl().replace(/\/+$/, '')}/${url.replace(/^\//, '')}`
    : url;
}

export type ImageSize = 0 | 96 | 600 | 2000;

/** Recognize only Google's public Drive file routes, never arbitrary hosts. */
export function driveImageId(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    if (url.hostname === 'lh3.googleusercontent.com') return url.pathname.match(/^\/d\/([\w-]+)(?:=[^/]*)?$/)?.[1] || null;
    if (url.hostname === 'drive.google.com') return url.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/)?.[1]
      || (['/uc', '/open', '/thumbnail'].includes(url.pathname) && /^[\w-]+$/.test(url.searchParams.get('id') || '') ? url.searchParams.get('id') : null);
  } catch { /* Local previews, bundled assets and historical embedded images. */ }
  return null;
}

export function imageDisplayUrl(value?: string, size: ImageSize = 600): string {
  const id = driveImageId(value);
  if (id) return `https://lh3.googleusercontent.com/d/${id}=s${size}`;
  const normalized = normalizeMediaUrl(value);
  try {
    const url = new URL(normalized);
    if (url.origin === new URL(getRenderServerUrl()).origin && /^\/media\/[a-f0-9]{48}$/.test(url.pathname)) {
      url.searchParams.set('size', String(size)); return url.href;
    }
  } catch { /* Preserve non-HTTP and relative image sources. */ }
  return normalized;
}

/** Open Google's original file, rather than claiming s0 is byte-identical. */
export function originalImageUrl(value?: string): string {
  const id = driveImageId(value);
  if (id) return `https://drive.google.com/file/d/${id}/view`;
  const normalized = normalizeMediaUrl(value);
  try {
    const url = new URL(normalized);
    if (url.origin === new URL(getRenderServerUrl()).origin && /^\/media\/[a-f0-9]{48}$/.test(url.pathname)) {
      url.searchParams.delete('size'); url.searchParams.set('original', '1'); return url.href;
    }
  } catch { /* Keep existing historical URLs usable. */ }
  return normalized;
}
