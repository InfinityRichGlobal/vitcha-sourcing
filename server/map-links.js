const hosts = new Set(['maps.app.goo.gl', 'goo.gl', 'maps.google.com', 'www.google.com', 'google.com', 'www.google.co.th', 'google.co.th', 'maps.google.co.th']);

function mapUrl(value, base) {
  let url;
  try { url = new URL(value, base); } catch { throw Object.assign(new Error('ลิงก์แผนที่ไม่ถูกต้อง'), { status: 400 }); }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || !hosts.has(url.hostname) ||
      (url.hostname === 'goo.gl' && !url.pathname.startsWith('/maps')) ||
      (['google.com','www.google.com','google.co.th','www.google.co.th'].includes(url.hostname) && !url.pathname.startsWith('/maps'))) {
    throw Object.assign(new Error('รองรับลิงก์ HTTPS ของ Google Maps เท่านั้น กรุณาวางพิกัดหรือลิงก์จากปุ่มแชร์แผนที่'), { status: 400 });
  }
  return url;
}

export async function resolveMapLink(value, fetcher = fetch) {
  let current = mapUrl(value);
  const signal = AbortSignal.timeout(7000);
  for (let i = 0; i < 6; i++) {
    const response = await fetcher(current.href, { method: 'HEAD', redirect: 'manual', signal, headers: { 'User-Agent': 'VitchaSourcing/1.0' } });
    const location = response.headers.get('location');
    if (!location || response.status < 300 || response.status >= 400) break;
    // Check every hop before issuing a request, including relative redirects.
    current = mapUrl(location, current);
  }
  const decoded = decodeURIComponent(current.href);
  const pair = '(-?\\d+(?:\\.\\d+)?),\\s*(-?\\d+(?:\\.\\d+)?)';
  const match = decoded.match(new RegExp('[?&](?:q|query|ll)=' + pair)) || decoded.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/) || decoded.match(new RegExp('@' + pair));
  const lat = Number(match?.[1]), lng = Number(match?.[2]);
  if (match && Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { ok: true, lat, lng, resolvedUrl: current.href };
  return { ok: false, error: 'ไม่พบพิกัดในลิงก์ที่ระบุ', resolvedUrl: current.href };
}
