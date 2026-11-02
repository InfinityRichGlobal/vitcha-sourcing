import { SupplierRecord, StoreInspoRecord, LocationRecord } from '../types';
import { normalizeMediaUrl } from './mediaUrl';
export type PhotoGroup = { id: string; label: string; photos: { url: string; label: string }[] };
export function getPhotoGroups(item: SupplierRecord | StoreInspoRecord | LocationRecord | null | undefined): PhotoGroup[] {
  if (!item) return [];
  const groups: PhotoGroup[] = [];
  const add = (id: string, label: string, urls: string[] = []) => groups.push({ id, label, photos: urls.filter(Boolean).map((url, i) => ({ url: normalizeMediaUrl(url), label: `${label} #${i + 1}` })) });
  add('storefront', 'หน้าร้าน / บรรยากาศ', item.photos?.storefrontAndAtmosphere);
  if (item.type === 'supplier') {
    add('contacts', 'นามบัตร / WeChat QR', item.photos?.contactCards);
    groups.push({ id: 'catalog', label: 'รายการสินค้า', photos: (item.catalogItems || []).filter(c => c.photo).map((c, i) => ({ url: normalizeMediaUrl(c.photo), label: c.name || `สินค้า #${i + 1}` })) });
  } else if (item.type === 'drink_store') {
    add('menu', 'ป้ายเมนู', item.photos?.menuBoard);
    add('cups', 'แก้วเครื่องดื่ม', item.photos?.drinkCups);
    groups.push({ id: 'drinks', label: 'เมนูชิม', photos: (item.drinkItems || []).filter(c => c.photo).map((c, i) => ({ url: normalizeMediaUrl(c.photo), label: c.name || `เมนู #${i + 1}` })) });
  } else {
    add('plans', 'ผังห้อง / งานระบบ', item.photos?.floorPlanAndSpecs);
    add('neighbors', 'ร้านข้างเคียง', item.photos?.surroundingNeighbors);
    add('contacts', 'นามบัตร / เอกสาร', item.photos?.contactCards);
  }
  return groups;
}
