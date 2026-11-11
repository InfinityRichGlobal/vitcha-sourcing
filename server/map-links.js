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

function extractCoordinates(value) {
  const decoded = value.replace(/&amp;/g, '&').replace(/%([\da-f]{2})/gi, (_match, hex) => String.fromCharCode(parseInt(hex, 16)));
  const pair = '(-?\\d+(?:\\.\\d+)?),\\s*(-?\\d+(?:\\.\\d+)?)';
  const match = decoded.match(new RegExp('[?&](?:q|query|ll)=' + pair)) ||
    decoded.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/) ||
    decoded.match(new RegExp('@' + pair));
  let lat = Number(match?.[1]), lng = Number(match?.[2]);
  if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { lat, lng };
  return null;
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

  let coordinates = extractCoordinates(current.href);
  if (!coordinates) {
    const decoded = decodeURIComponent(current.href);
    const feature = decoded.match(/0x[0-9a-f]+:0x([0-9a-f]+)/i);
    const cid = feature ? BigInt('0x' + feature[1]).toString() : current.searchParams.get('cid');
    if (cid && /^\d+$/.test(cid)) {
      const embed = mapUrl('https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s' + cid);
      const response = await fetcher(embed.href, { method: 'GET', redirect: 'manual', signal });
      if (response.ok) {
        const html = await response.text();
        // Match the entity's CID and coordinate tuple, never the camera center.
        const pin = html.match(new RegExp('\\["0x[0-9a-f]+:0x[0-9a-f]+","(?:[^"\\\\]|\\\\.)*",\\[(-?[0-9.]+),(-?[0-9.]+)\\],"' + cid + '"\\]', 'i'));
        if (pin) {
          const lat = Number(pin[1]), lng = Number(pin[2]);
          if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) coordinates = { lat, lng };
        }
      }
    }
  }
  if (!coordinates) {
    const query = current.searchParams.get('q') || current.searchParams.get('query') || '';
    if (/^(?:[23456789CFGHJMPQRVWX]{2}){1,4}\+[23456789CFGHJMPQRVWX]{2,7}\s+\S/i.test(query)) {
      const embed = mapUrl('https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s' + encodeURIComponent(query));
      const response = await fetcher(embed.href, { method: 'GET', redirect: 'manual', signal });
      if (response.ok) {
        const html = await response.text();
        const pin = html.match(/\["0x[0-9a-f]+:0x[0-9a-f]+","((?:[^"\\]|\\.)*)",\[(-?[0-9.]+),(-?[0-9.]+)\]/i);
        if (pin && pin[1].toUpperCase().startsWith(query.split(/\s/)[0].toUpperCase())) {
          const lat = Number(pin[2]), lng = Number(pin[3]);
          if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) coordinates = { lat, lng };
        }
      }
    }
  }
  if (coordinates) return { ok: true, ...coordinates, resolvedUrl: current.href };
  return { ok: false, error: 'ไม่พบพิกัดในลิงก์ที่ระบุ', resolvedUrl: current.href };
}
