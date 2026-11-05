// Read-only recovery path for the backup guard when the web host is suspended.
// The connection must be the existing production server's private configuration.
export function validateCompleteBackup(data) {
  if (!['users', 'invites', 'suppliers', 'drinkStores'].every(key => Array.isArray(data?.[key]))
    || !data.users.some(user => user.id === 'user-ice' && (user.pinHash || user.pin))) {
    throw new Error('Incomplete backup; database was not changed.');
  }
  return data;
}

export async function readCloudBackup({ url, key, fetchImpl = fetch }) {
  if (!/^https:\/\/[^/]+\.supabase\.co$/.test(url || '') || !key) throw new Error('Private cloud backup configuration missing or invalid.');
  const get = async (route, extraHeaders = {}) => {
    const response = await fetchImpl(url + route, {
      method: 'GET',
      headers: { apikey: key, ...(key.startsWith('sb_secret_') ? {} : { Authorization: `Bearer ${key}` }), ...extraHeaders },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`Read-only cloud backup failed (${response.status}).`);
    return response.json();
  };
  const state = await get('/rest/v1/vitcha_state?id=eq.main&select=version,body');
  if (!Array.isArray(state) || state.length !== 1 || !Number.isSafeInteger(state[0].version)) throw new Error('Invalid current cloud state.');
  const data = validateCompleteBackup(state[0].body);
  const runtime = await get('/rest/v1/vitcha_runtime?select=key,value&order=key.asc');
  if (!Array.isArray(runtime)) throw new Error('Incomplete cloud runtime backup.');
  const media = [];
  for (let start = 0; ; start += 500) {
    const batch = await get('/rest/v1/vitcha_media?select=*&order=id.asc', { Range: `${start}-${start + 499}`, 'Range-Unit': 'items' });
    if (!Array.isArray(batch)) throw new Error('Incomplete cloud media backup.');
    media.push(...batch);
    if (batch.length < 500) break;
  }
  return { data, version: state[0].version, runtime, media };
}
