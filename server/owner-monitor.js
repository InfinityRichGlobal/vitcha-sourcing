// Owner-only telemetry. No polling jobs, media downloads, or application writes.
// Provider credentials never enter the response or the persisted snapshot.
const HOUR = 60 * 60 * 1000;
const MiB = 1024 ** 2;
const GiB = 1024 ** 3;
const numeric = value => value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : null;
const metric = (id, label, value, unit, extra = {}) => ({ id, label, value: numeric(value), unit, kind: 'measured', ...extra });
const monthKey = ms => new Date(ms).toISOString().slice(0, 7);

export function parseSupabaseMetrics(text) {
  // Only export this allowlist; the scrape contains unrelated infrastructure details.
  const rows = String(text).split('\n').map(line => {
    const match = line.match(/^(pg_database_size_bytes|pg_database_size_mb)(?:\{([^}]*)\})?\s+([\d.eE+-]+)(?:\s|$)/);
    return match ? { name: match[1], labels: match[2] || '', value: numeric(match[3]) } : null;
  }).filter(Boolean);
  const postgres = rows.find(row => row.name === 'pg_database_size_bytes' && /(?:^|,)datname="postgres"(?:,|$)/.test(row.labels));
  const all = rows.find(row => row.name === 'pg_database_size_mb');
  return { postgresBytes: postgres?.value ?? null, totalBytes: all?.value == null ? null : all.value * MiB };
}

export function parseRenderBandwidth(series, start, end) {
  if (!Array.isArray(series) || !series.length) throw new Error('no-data');
  let total = 0, count = 0, latest = 0;
  const days = new Map();
  for (const row of series) {
    // Render's live API returns lowercase `mb` (binary MB), despite its GB example.
    const factor = { gb: GiB, gib: GiB, mb: MiB, mib: MiB, kb: 1024, kib: 1024, b: 1, bytes: 1 }[String(row.unit).toLowerCase()];
    if (!factor || !Array.isArray(row.values)) throw new Error('invalid-metrics');
    for (const point of row.values) {
      const time = typeof point.timestamp === 'number' ? point.timestamp * (point.timestamp < 1e12 ? 1000 : 1) : Date.parse(point.timestamp);
      const value = numeric(point.value);
      if (!Number.isFinite(time) || value === null) throw new Error('invalid-metrics');
      if (time < start || time > end) continue;
      const bytes = value * factor;
      total += bytes; count++; latest = Math.max(latest, time);
      const day = new Date(time).toISOString().slice(0, 10);
      days.set(day, (days.get(day) || 0) + bytes);
    }
  }
  if (!count) throw new Error('no-data');
  return { bytes: total, measuredThrough: new Date(latest).toISOString(), daily: [...days].sort().map(([date, bytes]) => ({ date, bytes })) };
}

export function estimateBandwidthCost(bytes, includedBytes, pricePerGb) {
  if ([bytes, includedBytes, pricePerGb].some(value => numeric(value) === null)) return null;
  // Render bills additional GB in whole increments. This is an estimate, not an invoice.
  return Math.round(Math.ceil(Math.max(0, bytes - includedBytes) / GiB) * pricePerGb * 100) / 100;
}

export function createOwnerMonitor({ render = {}, supabase = {}, getDriveStatus, request, fetchImpl = fetch, now = Date.now, cacheStore, ttlMs = HOUR } = {}) {
  let cached = null, loaded = false, pending = null;
  const fetchText = async (url, headers) => {
    const response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(15000), redirect: 'error' });
    if (!response.ok) throw new Error(`provider-${response.status}`);
    // Enforce a bound even if a provider omits Content-Length.
    const reader = response.body.getReader(); const chunks = []; let size = 0;
    try {
      while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 2 * 1024 * 1024) throw new Error('provider-too-large'); chunks.push(Buffer.from(value)); }
    } finally { await reader.cancel().catch(() => {}); }
    return Buffer.concat(chunks).toString('utf8');
  };
  const renderUrl = render.workspaceId ? `https://dashboard.render.com/w/${encodeURIComponent(render.workspaceId)}/billing` : 'https://dashboard.render.com/billing';
  const projectRef = /^https:\/\/([a-z0-9]+)\.supabase\.co$/.exec(supabase.url || '')?.[1];
  const supabaseUrl = projectRef ? `https://supabase.com/dashboard/project/${projectRef}` : 'https://supabase.com/dashboard';
  const reference = { kind: 'reference', note: 'เกณฑ์แผน Free สำหรับประเมิน · ตรวจแผนปัจจุบันใน Supabase' };

  async function renderMetrics(time) {
    const base = { id: 'render', name: 'Render', dashboardUrl: renderUrl, note: 'การรับส่งข้อมูลของเว็บหลัก · โควต้าแบ่งใช้ทั้ง Workspace · ข้อมูลต้นทางล่าช้าประมาณ 1–2 ชั่วโมง', metrics: [], period: monthKey(time) };
    if (!render.token || !/^srv-[a-z0-9]+$/.test(render.serviceId || '')) return { ...base, state: 'unconfigured', note: 'ยังไม่ได้เชื่อมสิทธิ์อ่าน Render Metrics · เปิด Billing เพื่อตรวจยอดจริงได้' };
    const start = Date.UTC(new Date(time).getUTCFullYear(), new Date(time).getUTCMonth(), 1);
    const query = new URLSearchParams({ resource: render.serviceId, startTime: new Date(start).toISOString(), endTime: new Date(time).toISOString() });
    const [raw, service] = await Promise.all([
      fetchText(`https://api.render.com/v1/metrics/bandwidth?${query}`, { Authorization: `Bearer ${render.token}` }).then(JSON.parse),
      fetchText(`https://api.render.com/v1/services/${render.serviceId}`, { Authorization: `Bearer ${render.token}` }).then(JSON.parse),
    ]);
    const bandwidth = parseRenderBandwidth(raw, start, time);
    const limit = numeric(render.includedBandwidthBytes);
    const price = numeric(render.pricePerGb);
    const elapsed = Math.max(1, (time - start) / 86400000);
    const days = new Date(Date.UTC(new Date(time).getUTCFullYear(), new Date(time).getUTCMonth() + 1, 0)).getUTCDate();
    return { ...base, state: 'ok', updatedAt: new Date(time).toISOString(), measuredThrough: bandwidth.measuredThrough,
      serviceState: service.suspended === 'suspended' ? 'ถูกระงับ' : service.suspended === 'not_suspended' ? 'ไม่ได้ถูกระงับ' : 'ยังยืนยันสถานะไม่ได้', instancePlan: service.serviceDetails?.plan || null,
      daily: bandwidth.daily, metrics: [
        metric('bandwidth', 'Bandwidth เดือนนี้', bandwidth.bytes, 'bytes', { limit, note: limit === null ? 'ยังไม่ได้กำหนดโควต้าอ้างอิง' : 'เทียบโควต้าอ้างอิง Hobby 5 GB ของ Workspace' }),
        metric('bandwidth-estimate', 'ค่า Bandwidth โดยประมาณ', estimateBandwidthCost(bandwidth.bytes, limit, price), 'usd', { kind: 'estimate', note: 'เฉพาะเว็บนี้ สมมติไม่มีบริการอื่นใช้โควต้าร่วม · ไม่ใช่ยอดบิลหรือตัดบัตร' }),
        metric('month-estimate', 'ประมาณการสิ้นเดือน', estimateBandwidthCost(bandwidth.bytes / elapsed * days, limit, price), 'usd', { kind: 'estimate', note: 'คำนวณตามอัตราใช้เฉลี่ยจนถึงวันนี้ · ไม่รวมภาษีและบริการอื่น' }),
        metric('invoice', 'ยอดเรียกเก็บจริง', null, 'usd', { note: 'ตรวจที่ Render Billing' }),
      ] };
  }

  async function supabaseMetrics(time) {
    const base = { id: 'supabase', name: 'Supabase', dashboardUrl: supabaseUrl, note: 'ฐานข้อมูลและไฟล์เก่าที่เก็บบน Supabase', metrics: [] };
    if (!projectRef || !supabase.key) return { ...base, state: 'unconfigured', note: 'เครื่องนี้ยังไม่ได้เชื่อม Supabase' };
    const results = await Promise.allSettled([
      fetchText(`${supabase.url}/customer/v1/privileged/metrics`, { Authorization: `Basic ${Buffer.from(`service_role:${supabase.key}`).toString('base64')}` }).then(parseSupabaseMetrics),
      (async () => {
        if (!request) throw new Error('not-configured');
        let bytes = 0, count = 0;
        // Metadata only. Never download images, videos, or the full application state.
        for (let offset = 0; offset < 10000; offset += 500) {
          const rows = await request(`/rest/v1/vitcha_media?provider=eq.supabase&select=bytes&order=id.asc&offset=${offset}&limit=500`, { timeoutMs: 10000 });
          if (!Array.isArray(rows) || rows.some(row => numeric(row.bytes) === null)) throw new Error('invalid-media');
          for (const row of rows) { bytes += Number(row.bytes); count++; }
          if (rows.length < 500) return { bytes, count };
        }
        throw new Error('too-many-media');
      })(),
    ]);
    const database = results[0].status === 'fulfilled' ? results[0].value : null;
    const media = results[1].status === 'fulfilled' ? results[1].value : null;
    if (!database && !media) throw new Error('provider-unavailable');
    return { ...base, state: database?.totalBytes != null && media ? 'ok' : 'partial', updatedAt: new Date(time).toISOString(), metrics: [
      metric('database', 'พื้นที่ฐานข้อมูลรวม', database?.totalBytes, 'bytes', { limit: 500 * MiB, note: 'ขนาดจริงจาก Metrics รวมฐานข้อมูลระบบ · เทียบเกณฑ์ Free 500 MiB' }),
      metric('postgres', 'ฐานข้อมูล postgres', database?.postgresBytes, 'bytes', { note: 'ฐานข้อมูลที่แอปใช้ รวมตาราง ดัชนี และข้อมูลระบบ' }),
      metric('storage', 'ไฟล์ Supabase ที่แอปลงทะเบียน', media?.bytes, 'bytes', { note: 'รวมขนาดไฟล์ตามทะเบียนแอป ไม่ใช่ยอด Storage ทั้งองค์กร และอาจรวมไฟล์ที่เลิกใช้อ้างอิงแล้ว' }),
      metric('storage-files', 'จำนวนไฟล์ในทะเบียน Supabase', media?.count, 'count'),
      metric('egress', 'Egress รอบบิลนี้', null, 'bytes', { note: 'Metrics ไม่ใช่ยอด Egress ที่ใช้คิดเงิน · ตรวจในหน้า Usage ของ Supabase' }),
      metric('egress-reference', 'โควต้า Egress อ้างอิง Free', 5 * GiB, 'bytes', reference),
      metric('invoice', 'ยอดเรียกเก็บจริง', null, 'usd', { note: 'ตรวจหน้า Billing ขององค์กรใน Supabase' }),
    ] };
  }

  async function driveMetrics(time) {
    const base = { id: 'drive', name: 'Google Drive', dashboardUrl: 'https://drive.google.com/drive/quota', metrics: [], note: 'พื้นที่รวมของบัญชี Google รวมบริการที่ใช้พื้นที่ร่วมกัน' };
    if (!getDriveStatus) return { ...base, state: 'unconfigured', note: 'เครื่องนี้ยังไม่ได้เชื่อม Google Drive' };
    const status = await getDriveStatus();
    if (!status.connected) throw new Error('drive-unavailable');
    return { ...base, state: 'ok', updatedAt: new Date(time).toISOString(), metrics: [
      metric('storage', 'พื้นที่บัญชี Google ที่ใช้', status.storageQuota?.usage, 'bytes', { limit: numeric(status.storageQuota?.limit), note: status.storageQuota?.limit ? 'พื้นที่รวมบัญชี ไม่ใช่เฉพาะไฟล์ของเว็บนี้' : 'Google ไม่ส่งเพดานพื้นที่ของบัญชีนี้กลับมา' }),
      metric('drive-files', 'พื้นที่ไฟล์ใน Drive', status.storageQuota?.usageInDrive, 'bytes'),
      metric('trash', 'พื้นที่ถังขยะ Drive', status.storageQuota?.usageInDriveTrash, 'bytes'),
    ] };
  }

  async function refresh() {
    const time = now(); const checkedAt = new Date(time).toISOString();
    const providers = await Promise.all([['render', renderMetrics, renderUrl], ['supabase', supabaseMetrics, supabaseUrl], ['drive', driveMetrics, 'https://drive.google.com/drive/quota']].map(async ([id, read, dashboardUrl]) => {
      try { return { ...await read(time), checkedAt }; }
      catch {
        const previous = cached?.providers?.find(p => p.id === id && p.updatedAt && (id !== 'render' || p.period === monthKey(time)));
        if (previous) return { ...previous, state: 'stale', checkedAt, note: 'อัปเดตจากผู้ให้บริการไม่สำเร็จ กำลังแสดงค่าล่าสุดที่อ่านได้ · ตรวจวันเวลาใต้ชื่อบริการ' };
        return { id, name: { render: 'Render', supabase: 'Supabase', drive: 'Google Drive' }[id], dashboardUrl, state: 'error', checkedAt, metrics: [], note: 'ยังอ่านข้อมูลไม่ได้ กรุณาตรวจการเชื่อมต่อหรือเปิดหน้าผู้ให้บริการ' };
      }
    }));
    cached = { schemaVersion: 1, generatedAt: checkedAt, nextRefreshAt: new Date(time + ttlMs).toISOString(), providers };
    // A failed cache write must not discard successfully measured metrics.
    try { await cacheStore?.save(cached); } catch { /* no raw provider errors or secrets */ }
    return cached;
  }
  return {
    async getSnapshot() {
      if (pending) return pending;
      pending = (async () => {
        if (!loaded) {
          try { const saved = await cacheStore?.load(); if (saved?.schemaVersion === 1 && Array.isArray(saved.providers)) cached = saved; } catch { /* retry measurements below */ }
          loaded = true;
        }
        const age = now() - Date.parse(cached?.generatedAt);
        if (cached && age >= 0 && age < ttlMs && monthKey(Date.parse(cached.generatedAt)) === monthKey(now())) return { ...cached, cached: true };
        return { ...await refresh(), cached: false };
      })();
      try { return await pending; } finally { pending = null; }
    },
  };
}
