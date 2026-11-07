export function downloadFilename(value) {
  return String(value || 'download').replace(/[\x00-\x1f\x7f/\\]/g, '_').slice(0, 240) || 'download';
}
