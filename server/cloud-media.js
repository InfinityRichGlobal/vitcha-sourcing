import { createHash, randomBytes } from 'node:crypto';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// Both providers use a stable application URL. Expiring signed URLs and OAuth
// access tokens are never written into product records or returned as credentials.
export function createCloudMedia({ request, url, key, drive = null, fetchImpl = fetch }) {
  let accessToken, tokenUntil = 0, tokenPromise;
  async function googleToken() {
    if (accessToken && tokenUntil > Date.now()) return accessToken;
    if (tokenPromise) return tokenPromise;
    tokenPromise = (async () => {
      const response = await fetchImpl('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: drive.clientId, client_secret: drive.clientSecret, refresh_token: drive.refreshToken, grant_type: 'refresh_token' }), signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error('กรุณาเชื่อม Google Drive ใหม่');
      const result = await response.json(); accessToken = result.access_token; tokenUntil = Date.now() + (result.expires_in - 120) * 1000; return accessToken;
    })();
    try { return await tokenPromise; } finally { tokenPromise = null; }
  }
  const headers = () => ({ apikey: key, ...(key.startsWith('sb_secret_') ? {} : { Authorization: `Bearer ${key}` }) });
  async function upload({ filename, bytes, mimeType }) {
    const id = randomBytes(24).toString('hex');
    let fileId, provider;
    if (drive?.folderId && drive?.refreshToken) {
      const token = await googleToken();
      const session = await fetchImpl('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,size,md5Checksum', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Upload-Content-Type': mimeType, 'X-Upload-Content-Length': String(bytes.length) }, body: JSON.stringify({ name: `${id}-${filename}`, parents: [drive.folderId] }), signal: AbortSignal.timeout(20000) });
      const location = session.headers.get('location');
      if (!session.ok || !location || new URL(location).origin !== 'https://www.googleapis.com') throw new Error('เริ่มอัปโหลดไป Google Drive ไม่สำเร็จ');
      const result = await fetchImpl(location, { method: 'PUT', headers: { 'Content-Type': mimeType, 'Content-Length': String(bytes.length) }, body: bytes, signal: AbortSignal.timeout(120000) });
      if (!result.ok) throw new Error('อัปโหลด Google Drive ไม่สำเร็จ กรุณาลองอีกครั้ง');
      const metadata = await result.json();
      if (!metadata.id || Number(metadata.size) !== bytes.length || metadata.md5Checksum !== createHash('md5').update(bytes).digest('hex')) throw new Error('ตรวจสอบไฟล์บน Google Drive ไม่ผ่าน');
      fileId = metadata.id; provider = 'drive';
    } else {
      fileId = `${id}/${filename}`; provider = 'supabase';
      const result = await fetchImpl(`${url}/storage/v1/object/vitcha-media/${fileId}`, { method: 'POST', headers: { ...headers(), 'Content-Type': mimeType, 'x-upsert': 'false' }, body: bytes, signal: AbortSignal.timeout(120000) });
      if (!result.ok) throw new Error('อัปโหลดไม่สำเร็จ กรุณาตรวจสอบพื้นที่เก็บไฟล์แล้วลองอีกครั้ง');
    }
    await request('/rest/v1/vitcha_media', { method: 'POST', headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ id, provider, file_id: fileId, mime_type: mimeType, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') }) });
    return `/media/${id}`;
  }
  async function serve(req, res) {
    const id = req.params.id;
    if (!/^[a-f0-9]{48}$/.test(id)) return res.sendStatus(404);
    const [file] = await request(`/rest/v1/vitcha_media?id=eq.${id}&select=provider,file_id,mime_type,bytes`);
    if (!file) return res.sendStatus(404);
    res.set('X-Content-Type-Options', 'nosniff'); res.set('Cache-Control', 'private, no-store');
    if (file.provider === 'supabase') {
      const result = await request(`/storage/v1/object/sign/vitcha-media/${file.file_id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ expiresIn: 120 }) });
      const signedPath = result.signedURL || result.signedUrl;
      if (typeof signedPath !== 'string' || !signedPath) throw new Error('Media link unavailable');
      const signed = new URL(signedPath, `${url}/storage/v1/`);
      if (signed.origin !== new URL(url).origin) throw new Error('Invalid media origin');
      // Storage returns /object/sign/... relative to its /storage/v1 API prefix.
      if (signed.pathname.startsWith('/object/')) signed.pathname = '/storage/v1' + signed.pathname;
      return res.redirect(307, signed.href);
    }
    if (!drive?.refreshToken) return res.status(503).send('Media storage is not connected');
    const response = await fetchImpl(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(file.file_id)}?alt=media`, { headers: { Authorization: `Bearer ${await googleToken()}`, ...(req.headers.range ? { Range: req.headers.range } : {}) }, signal: AbortSignal.timeout(120000) });
    if (![200,206,416].includes(response.status)) return res.status(502).send('Media unavailable');
    res.status(response.status);
    for (const name of ['content-type','content-length','content-range','accept-ranges']) if (response.headers.has(name)) res.set(name, response.headers.get(name));
    if (response.body) await pipeline(Readable.fromWeb(response.body), res); else res.end();
  }
  return { upload, serve };
}
