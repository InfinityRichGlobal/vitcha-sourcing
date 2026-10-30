import { ActivityEntry, SupplierRecord, StoreInspoRecord, LocationRecord } from '../types';
import type { HandoffStage } from '../types';

export const activityStages: Array<[HandoffStage, string]> = [
  ['awaiting', 'รอรับช่วงต่อ'], ['rfq_sent', 'ขอสเปก / ส่ง RFQ'],
  ['sample_test', 'ทดสอบตัวอย่าง Lab/R&D'], ['negotiate', 'ต่อรองราคา & MOQ'],
  ['approved', 'ตัวเต็งอนุมัติ'], ['ordered', 'สั่งซื้อสำเร็จ'],
];
export const activityStageName = (stage?: string | null) => {
  const index = activityStages.findIndex(([key]) => key === stage);
  return index < 0 ? 'ยังไม่ระบุ' : `พาร์ท ${index + 1}: ${activityStages[index][1]}`;
};
export const activityFieldLabels: Record<string, string> = {
  handoffStage: 'พาร์ท', status: 'สถานะรายการ', assignedTo: 'ผู้รับผิดชอบ', targetFollowUpDate: 'กำหนดติดตาม', handoffNotes: 'หมายเหตุส่งต่อ',
  name: 'ชื่อ', storeName: 'ชื่อร้าน', chineseName: 'ชื่อภาษาจีน', foreignName: 'ชื่อต่างประเทศ', marketOrCity: 'ตลาด / เมือง', city: 'เมือง',
  category: 'หมวดหมู่', storeCategory: 'หมวดร้าน', rating: 'คะแนน', ratings: 'คะแนนประเมิน', quickTags: 'ป้ายกำกับ', isFactory: 'โรงงาน',
  phone: 'โทรศัพท์', wechatId: 'WeChat', lineId: 'LINE', address: 'ที่อยู่', location: 'พิกัด', lat: 'ละติจูด', lng: 'ลองจิจูด', addressText: 'ที่อยู่',
  photos: 'รูปภาพ', storefrontAndAtmosphere: 'หน้าร้าน / บรรยากาศ', contactCards: 'นามบัตร', menuBoard: 'ป้ายเมนู', drinkCups: 'เครื่องดื่ม',
  floorPlanAndSpecs: 'ผังพื้นที่', surroundingNeighbors: 'บริเวณโดยรอบ', videos: 'วิดีโอ', attachedFiles: 'ไฟล์แนบ', voiceNotes: 'เสียงบันทึก',
  voiceNoteUrl: 'เสียงบันทึก', voiceDurationSec: 'ความยาวเสียง (วินาที)', durationSec: 'ความยาวเสียง (วินาที)', label: 'ชื่อบันทึก', url: 'ไฟล์',
  catalogItems: 'สินค้า', drinkItems: 'เมนูที่ทดลอง', photo: 'รูปภาพ', priceRmb: 'ราคา (หยวน)', priceThb: 'ราคา (บาท)', dimensions: 'ขนาด',
  weightKg: 'น้ำหนัก', memo: 'รายละเอียด', tastingNotes: 'บันทึกการชิม', brandConcept: 'แนวคิดแบรนด์', country: 'ประเทศ',
  locationType: 'ประเภททำเล', zoneOrFloor: 'โซน / ชั้น', unitNumber: 'เลขที่พื้นที่', spaceSpecs: 'ข้อมูลพื้นที่', leaseTerms: 'เงื่อนไขเช่า',
  size: 'ขนาดไฟล์ (ไบต์)', uploadedAt: 'วันที่แนบ', createdAt: 'วันที่บันทึก', mimeType: 'ประเภทไฟล์', isMockup: 'ข้อมูลตัวอย่าง',
  taste: 'รสชาติ', aesthetics: 'ความสวยงาม', value: 'ความคุ้มค่า', speed: 'ความเร็ว', footTraffic: 'คนสัญจร', visibility: 'การมองเห็น', accessibility: 'การเข้าถึง', valueRoi: 'ความคุ้มค่าการลงทุน',
};

export function getActivityEntries(item: SupplierRecord | StoreInspoRecord | LocationRecord): ActivityEntry[] {
  const events: ActivityEntry[] = item.history?.length ? [...item.history] : [{ action: 'ข้อมูลเริ่มต้นจากผู้บันทึกรายการ', user: item.creator.alias, userAvatar: item.creator.avatar, timestamp: item.creator.timestamp }];
  // Existing full comments remain useful even when their legacy log was shortened.
  // Do not guess which stage they belonged to, or manufacture a historical snapshot.
  for (const note of item.reviewerNotes || []) {
    for (const [kind, content] of [['comment', note], ...(note.replies || []).map(reply => ['reply', reply])] as const) {
      const saved = content as typeof note;
      if (!events.some(e => e.id === saved.id || e.content?.id === saved.id)) events.push({ id: `legacy-content-${saved.id}`, kind: kind as 'comment' | 'reply', action: 'ความคิดเห็นที่ยังเก็บในรายการ', user: saved.author, userId: saved.authorId, userAvatar: saved.authorAvatar, timestamp: saved.timestamp, content: saved });
    }
  }
  return events;
}
