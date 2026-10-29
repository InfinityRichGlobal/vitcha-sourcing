import { createHash, randomBytes } from 'node:crypto';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// Both providers use a stable application URL. Expiring signed URLs and OAuth
// access tokens are never written into product records or returned as credentials.
export function createCloudMedia({ request, url, key, drive = null, fetchImpl = fetch }) {
  let driveConfig = drive ? { ...drive } : null;
  let accessToken, tokenUntil = 0, tokenPromise;
  const getCenterFolderId = () => driveConfig?.folderId || process.env.GOOGLE_DRIVE_FOLDER_ID || '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1';

  async function googleToken() {
    if (!driveConfig?.clientId || !driveConfig?.refreshToken) return null;
    if (accessToken && tokenUntil > Date.now()) return accessToken;
    if (tokenPromise) return tokenPromise;
    tokenPromise = (async () => {
      const response = await fetchImpl('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: driveConfig.clientId, client_secret: driveConfig.clientSecret || '', refresh_token: driveConfig.refreshToken, grant_type: 'refresh_token' }), signal: AbortSignal.timeout(20000) });
      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        throw new Error(errJson?.error_description || errJson?.error || 'กรุณาเชื่อม Google Drive ใหม่');
      }
      const result = await response.json(); accessToken = result.access_token; tokenUntil = Date.now() + (result.expires_in - 120) * 1000; return accessToken;
    })();
    try { return await tokenPromise; } finally { tokenPromise = null; }
  }

  async function getOrCreateFolder(parentId, name) {
    const token = await googleToken();
    if (!token) throw new Error('Google Drive ไม่ได้เชื่อมต่อ');
    const safeName = name.replace(/'/g, "\\'");
    const query = `'${parentId}' in parents and name = '${safeName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    const searchRes = await fetchImpl(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&pageSize=1`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(20000),
    });
    if (searchRes.ok) {
      const data = await searchRes.json();
      if (data.files && data.files.length > 0) return data.files[0].id;
    }
    const createRes = await fetchImpl('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] }),
      signal: AbortSignal.timeout(20000),
    });
    if (!createRes.ok) throw new Error(`ไม่สามารถสร้างโฟลเดอร์ Google Drive (${name}) ได้`);
    const created = await createRes.json();
    return created.id;
  }

  async function resolveItemFolder({ recordType = 'misc', recordId = 'general', recordTitle = '' }) {
    const typeFolderId = await getOrCreateFolder(getCenterFolderId(), recordType);
    const shortTitle = recordTitle ? `-${recordTitle.slice(0, 30).replace(/[/\\?%*:|"<>]/g, '_')}` : '';
    const folderName = `${recordId}${shortTitle}`;
    return await getOrCreateFolder(typeFolderId, folderName);
  }

  async function createDirectUploadSession({ filename, mimeType, fileSize, recordType, recordId, recordTitle }) {
    const token = await googleToken();
    if (!token) return { directAvailable: false };
    const folderId = await resolveItemFolder({ recordType, recordId, recordTitle });
    const sessionRes = await fetchImpl('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,size,md5Checksum', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': mimeType,
        'X-Upload-Content-Length': String(fileSize),
      },
      body: JSON.stringify({ name: filename, parents: [folderId] }),
      signal: AbortSignal.timeout(20000),
    });
    const sessionUrl = sessionRes.headers.get('location');
    if (!sessionRes.ok || !sessionUrl || new URL(sessionUrl).origin !== 'https://www.googleapis.com') {
      throw new Error('ไม่สามารถเริ่มต้น Resumable Upload ไปยัง Google Drive ได้');
    }
    return { directAvailable: true, sessionUrl, folderId };
  }

  async function completeDirectUpload({ fileId, mimeType, fileSize, md5Checksum }) {
    const id = randomBytes(24).toString('hex');
    await request('/rest/v1/vitcha_media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({
        id,
        provider: 'drive',
        file_id: fileId,
        mime_type: mimeType || 'application/octet-stream',
        bytes: Math.max(1, Number(fileSize) || 1),
        sha256: md5Checksum || createHash('sha256').update(`${fileId}:${id}`).digest('hex'),
      }),
    });
    return { success: true, url: `/media/${id}`, mediaId: id };
  }

  function extractFolderId(raw) {
    const str = String(raw || '').trim();
    if (!str) return '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1';
    const match = str.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : str;
  }

  async function configureDrive({ clientId, clientSecret, refreshToken, folderId }) {
    const resolvedFolderId = extractFolderId(folderId || driveConfig?.folderId || '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1');
    const next = {
      clientId: String(clientId ?? driveConfig?.clientId ?? '').trim(),
      clientSecret: String(clientSecret ?? driveConfig?.clientSecret ?? '').trim(),
      refreshToken: String(refreshToken ?? driveConfig?.refreshToken ?? '').trim(),
      folderId: resolvedFolderId,
    };
    driveConfig = next;
    accessToken = null;
    tokenUntil = 0;
    const status = await getDriveStatus();
    if (next.clientId && next.refreshToken && status.oauthError) {
      throw new Error(status.oauthError || 'ไม่สามารถเชื่อมต่อ Google Drive OAuth ด้วยข้อมูลชุดนี้ได้');
    }
    await request('/rest/v1/vitcha_runtime', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ key: 'google_drive', value: next }),
    });
    return status;
  }

  async function getDriveStatus() {
    const folderId = getCenterFolderId();
    const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;
    if (!driveConfig?.clientId || !driveConfig?.refreshToken) {
      return {
        configured: true,
        connected: true,
        mode: 'cloud_center',
        folderId,
        folderUrl,
        user: { displayName: 'Google Drive CENTER + Cloud Media', emailAddress: `Folder ID: ${folderId}` },
      };
    }
    try {
      const token = await googleToken();
      if (!token) return { configured: true, connected: true, mode: 'cloud_center', folderId, folderUrl };
      const aboutRes = await fetchImpl('https://www.googleapis.com/drive/v3/about?fields=storageQuota,user', {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(20000),
      });
      if (!aboutRes.ok) {
        const errJson = await aboutRes.json().catch(() => null);
        const errMsg = errJson?.error?.message || `Google Drive API error (${aboutRes.status})`;
        return { configured: true, connected: false, folderId, folderUrl, oauthError: errMsg };
      }
      const about = await aboutRes.json();
      return {
        configured: true,
        connected: true,
        mode: 'oauth_direct',
        folderId,
        folderUrl,
        user: about.user,
        storageQuota: about.storageQuota,
      };
    } catch (e) {
      return { configured: true, connected: false, folderId, folderUrl, oauthError: e.message };
    }
  }
  const headers = () => ({ apikey: key, ...(key.startsWith('sb_secret_') ? {} : { Authorization: `Bearer ${key}` }) });
  async function upload({ filename, bytes, mimeType }) {
    const id = randomBytes(24).toString('hex');
    let fileId, provider;
    if (driveConfig?.folderId && driveConfig?.refreshToken) {
      const token = await googleToken();
      const session = await fetchImpl('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,size,md5Checksum', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Upload-Content-Type': mimeType, 'X-Upload-Content-Length': String(bytes.length) }, body: JSON.stringify({ name: `${id}-${filename}`, parents: [driveConfig.folderId] }), signal: AbortSignal.timeout(20000) });
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
    if (!driveConfig?.refreshToken) return res.status(503).send('Media storage is not connected');
    const response = await fetchImpl(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(file.file_id)}?alt=media`, { headers: { Authorization: `Bearer ${await googleToken()}`, ...(req.headers.range ? { Range: req.headers.range } : {}) }, signal: AbortSignal.timeout(120000) });
    if (![200,206,416].includes(response.status)) return res.status(502).send('Media unavailable');
    res.status(response.status);
    for (const name of ['content-type','content-length','content-range','accept-ranges']) if (response.headers.has(name)) res.set(name, response.headers.get(name));
    if (response.body) await pipeline(Readable.fromWeb(response.body), res); else res.end();
  }
  return { upload, serve, createDirectUploadSession, completeDirectUpload, configureDrive, getDriveStatus };
}
