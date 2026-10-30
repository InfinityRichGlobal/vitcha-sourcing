import fs from 'node:fs';
const catalog = JSON.parse(fs.readFileSync(new URL('./mockup-catalog.json', import.meta.url), 'utf8'));
export const SAMPLE_PACK_ID = catalog.id;
export const SAMPLE_COLLECTIONS = ['suppliers', 'drinkStores', 'locations', 'leadLabItems', 'franchiseStores'];
export const sampleCatalog = () => structuredClone(catalog.collections);
export const sampleCounts = db => Object.fromEntries(SAMPLE_COLLECTIONS.map(key => [key, (db[key] || []).length]));

// Prepare a complete candidate snapshot before saving. Stable source IDs make
// repeat clicks safe even when the client lost an earlier acknowledgement.
export function mergeSamples(db, snapshot, { validateRecord, actor, packId = null }) {
  const added = {}, skipped = {}, recordIds = {};
  const seenCollections = SAMPLE_COLLECTIONS.filter(key => snapshot[key] !== undefined);
  if (!Array.isArray(snapshot.suppliers) || !Array.isArray(snapshot.drinkStores) ||
      seenCollections.some(key => !Array.isArray(snapshot[key])) ||
      seenCollections.reduce((sum, key) => sum + snapshot[key].length, 0) > 1000) {
    throw Object.assign(new Error('ข้อมูลตัวอย่างไม่ถูกต้องหรือมีจำนวนมากเกินไป'), { status: 400 });
  }
  for (const key of SAMPLE_COLLECTIONS) {
    added[key] = 0; skipped[key] = 0; recordIds[key] = [];
    const existing = new Set((db[key] || []).map(item => item.id));
    const sourceIds = new Set();
    const additions = [];
    for (const source of snapshot[key] || []) {
      if (!source || typeof source !== 'object' || typeof source.id !== 'string' || !source.id.trim() || sourceIds.has(source.id)) {
        throw Object.assign(new Error('รหัสรายการตัวอย่างไม่ถูกต้องหรือซ้ำกัน'), { status: 400 });
      }
      sourceIds.add(source.id);
      const record = {
        ...structuredClone(source), isMockup: true, samplePackId: packId,
        revision: 1, updatedAt: new Date().toISOString(),
      };
      if (['suppliers', 'drinkStores', 'locations'].includes(key)) {
        record.type = key === 'suppliers' ? 'supplier' : key === 'drinkStores' ? 'drink_store' : 'location';
        record.creator ||= { id: actor.id, name: actor.name, alias: actor.alias, avatar: actor.avatar, timestamp: record.updatedAt };
        for (const field of ['reviewerNotes', 'likes', 'viewedBy', 'history']) record[field] = Array.isArray(record[field]) ? record[field] : [];
        validateRecord(record, key);
      } else if (typeof record.name !== 'string' || !record.name.trim()) {
        throw Object.assign(new Error('ชื่อรายการตัวอย่างไม่ถูกต้อง'), { status: 400 });
      }
      recordIds[key].push(record.id);
      // Preserve both real records and edited samples; never replace a collection.
      if (existing.has(record.id)) { skipped[key]++; continue; }
      additions.push(record); existing.add(record.id); added[key]++;
    }
    db[key] = [...additions, ...(db[key] || [])];
  }
  return { success: true, packId, added, skipped, totals: sampleCounts(db), recordIds };
}
