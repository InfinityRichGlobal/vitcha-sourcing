import { getRenderServerUrl } from '../services/api';

/** Stored media belongs to the API origin, even when the UI is hosted elsewhere. */
export function normalizeMediaUrl(url?: string): string {
  if (!url) return '';
  return /^\/?(?:media|uploads)\//.test(url)
    ? `${getRenderServerUrl().replace(/\/+$/, '')}/${url.replace(/^\//, '')}`
    : url;
}
