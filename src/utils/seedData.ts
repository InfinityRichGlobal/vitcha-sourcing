import { User, SupplierRecord, StoreInspoRecord, LocationRecord, QuickMessageTemplate, LabItem, FranchiseStore } from '../types';

export const INITIAL_CATEGORIES: string[] = [
  "เคาน์เตอร์ & สเตนเลส",
  "เครื่องซีลแก้ว",
  "เครื่องจ่ายไซรัป",
  "ตู้ทำน้ำแข็ง",
  "เครื่องสกัดชา",
  "เครื่องปั่นสมูทตี้",
  "บรรจุภัณฑ์ & แก้ว",
  "ใบชา & วัตถุดิบ",
  "วิตามิน & ผงพรีมิกซ์",
  "อื่นๆ"
];

export const INITIAL_STORE_CATEGORIES: string[] = [
  "ชานมพรีเมียม & ชาสด",
  "ชาผลไม้สด & คราฟต์โซดา",
  "วิตามินบาร์ & สุขภาพ",
  "มัทฉะ & สเปเชียลตี้",
  "แฟรนไชส์สตรีทดริงก์",
  "คาเฟ่ดีไซน์ & แพ็กเกจจิ้ง"
];

export const INITIAL_LOCATION_TYPES: string[] = [
  "ห้างสรรพสินค้า / ศูนย์การค้า",
  "คอมมูนิตี้มอลล์",
  "อาคารสำนักงาน",
  "สแตนด์อโลน / ริมถนน / อาคารพาณิชย์",
  "สถานีขนส่ง / รถไฟฟ้า",
  "สถานที่ราชการ",
  "สถานที่การศึกษา",
  "ตลาด / ถนนคนเดิน",
  "ปั๊มน้ำมัน / จุดชาร์จ EV",
  "สถานบันเทิง",
  "สวนสาธารณะ"
];

export const INITIAL_QUICK_TAGS: string[] = [
  "โรงงานผลิตเอง (Manufacturer)",
  "มีโชว์รูมให้ดูของจริง",
  "คุยภาษาอังกฤษได้",
  "รองรับส่งออก (Export Ready)",
  "สั่งขั้นต่ำน้อย (Low MOQ)",
  "มีสต็อกพร้อมส่งทันที",
  "มีตัวอย่างให้ทดลอง (Samples)",
  "เจ้าของคุยง่าย น่าร่วมงาน",
  "มีบริการจัดส่งในไทย",
  "มี มอก./อย./COA รับรอง"
];

export const INITIAL_QUICK_MESSAGES: QuickMessageTemplate[] = [
  {
    "id": "qm-1",
    "title": "ขอสเปกไฟ 220V 50Hz",
    "text": "ช่วยตรวจสอบสเปกมอเตอร์และระบบไฟฟ้า 220V 50Hz ของรุ่นนี้ด้วยครับ ว่าต่อเข้าปลั๊กไฟสาขาในไทยได้เลยไหม"
  },
  {
    "id": "qm-2",
    "title": "ส่ง RFQ เช็กราคาส่งไทย",
    "text": "ขอใบเสนอราคา FOB กวางโจว และเทียบค่าชิปปิ้งนำเข้าไทยล็อต 5-10 เครื่องให้ด้วยครับ"
  },
  {
    "id": "qm-3",
    "title": "ขอตัวอย่างมาเทสแล็บ",
    "text": "ขอตัวอย่างเพื่อนำมาทดสอบค่าสารสกัดวิตามิน รสสัมผัส และกลิ่นที่ห้องแล็บด่วนครับ"
  },
  {
    "id": "qm-4",
    "title": "ต่อรองขั้นต่ำ MOQ",
    "text": "ลองเจรจาขอเริ่มผลิตขั้นต่ำ (Low MOQ) สำหรับสาขาแรกก่อน ถ้าผลตอบรับดีจะสั่งล็อตใหญ่ 20 สาขา"
  },
  {
    "id": "qm-5",
    "title": "อนุมัติผ่าน สั่งซื้อได้",
    "text": "รายการนี้ผ่านเกณฑ์คุณภาพ สเปก และราคา ออกใบสั่งซื้อ (PO) และประสานงานส่งมอบงานได้เลย"
  }
];

export const INITIAL_USERS: User[] = [
  {
    "id": "user-ice",
    "name": "SuperiCez",
    "alias": "SuperiCez",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "supericez",
    "createdAt": "2026-10-26T10:00:00Z",
    "lastActiveAt": "2026-10-29T12:45:00Z",
    "statusNote": "ออนไลน์อยู่ขณะนี้ · ผู้ก่อตั้ง VITCHA (สำรวจจีน)"
  },
  {
    "id": "user-1793177529069",
    "name": "MommySomO",
    "alias": "MommySomO",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "somo@vitcha.com",
    "createdAt": "2026-10-28T09:00:00Z",
    "lastActiveAt": "2026-10-29T12:50:00Z",
    "statusNote": "ออนไลน์อยู่ขณะนี้ · ผู้ร่วมก่อตั้ง VITCHA (สำรวจจีน)"
  },
  {
    "id": "user-p-ohm",
    "name": "P.ohm (ผู้บริหาร & หัวหน้างาน)",
    "alias": "P.ohm",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "ohm@vitcha.com",
    "createdAt": "2026-10-26T10:30:00Z",
    "lastActiveAt": "2026-10-29T12:30:00Z",
    "statusNote": "ออนไลน์อยู่ขณะนี้ · ผู้บริหาร VITCHA (สำรวจจีน)"
  },
  {
    "id": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
    "name": "P.ตุ้ย (ผู้บริหาร & หัวหน้างาน)",
    "alias": "P.ตุ้ย",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "tui@vitcha.com",
    "createdAt": "2026-10-28T10:00:00Z",
    "lastActiveAt": "2026-10-29T12:40:00Z",
    "statusNote": "ออนไลน์อยู่ขณะนี้ · ผู้บริหาร VITCHA (สำรวจจีน)"
  },
  {
    "id": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
    "name": "น้องเมย์ (R&D สูตรเครื่องดื่ม & ชิมชา)",
    "alias": "น้องเมย์",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "may@vitcha.com",
    "createdAt": "2026-10-28T11:00:00Z",
    "lastActiveAt": "2026-10-29T12:55:00Z",
    "statusNote": "ออนไลน์อยู่แล็บ · R&D สูตรเครื่องดื่ม & ชิมชา"
  },
  {
    "id": "user-6ed8144d-a03f-438a-b78e-f4df23a6cadd",
    "name": "Zeen (สำรวจทำเลในไทย)",
    "alias": "Zeen",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "zeen@vitcha.com",
    "createdAt": "2026-10-28T11:30:00Z",
    "lastActiveAt": "2026-10-29T12:20:00Z",
    "statusNote": "สำรวจหน้างานในไทย · โลเคชั่น & ทำเลเปิดร้าน"
  },
  {
    "id": "user-80e9b44f-085e-4b9b-a341-9d07dab08b5c",
    "name": "Mild (สำรวจทำเลในไทย)",
    "alias": "Mild",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "mild@vitcha.com",
    "createdAt": "2026-10-28T11:45:00Z",
    "lastActiveAt": "2026-10-29T12:25:00Z",
    "statusNote": "สำรวจหน้างานในไทย · โลเคชั่น & ทำเลเปิดร้าน"
  },
  {
    "id": "user-name-pkg",
    "name": "เนม (แพ็กเกจจิ้ง & อุปกรณ์ร้าน)",
    "alias": "เนม",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "name@vitcha.com",
    "createdAt": "2026-10-28T12:00:00Z",
    "lastActiveAt": "2026-10-29T12:15:00Z",
    "statusNote": "ออนไลน์ · แพ็กเกจจิ้ง & อุปกรณ์ร้าน"
  },
  {
    "id": "user-ayai-booth",
    "name": "ayai (บูธ คีออส & โครงสร้างร้าน)",
    "alias": "ayai",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "ayai@vitcha.com",
    "createdAt": "2026-10-28T12:15:00Z",
    "lastActiveAt": "2026-10-29T12:35:00Z",
    "statusNote": "ออนไลน์ · บูธ คีออส โครงสร้างร้าน & อุปกรณ์"
  },
  {
    "id": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
    "name": "Lek (ผู้จัดการอุปกรณ์เครื่องจักรในร้าน)",
    "alias": "Lek",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "lek@vitcha.com",
    "createdAt": "2026-10-28T12:30:00Z",
    "lastActiveAt": "2026-10-29T12:50:00Z",
    "statusNote": "ออนไลน์ · ดูแลอุปกรณ์เครื่องจักรในร้านทั้งหมด"
  },
  {
    "id": "user-beam",
    "name": "ช่างบีม (วิศวกรระบบและไฟ)",
    "alias": "ช่างบีม (วิศวกร)",
    "role": "reviewer",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "beam@vitcha.com",
    "createdAt": "2026-10-26T11:00:00Z"
  },
  {
    "id": "user-ann",
    "name": "คุณแอน (จัดซื้อและนำเข้า)",
    "alias": "แอน (จัดซื้อ)",
    "role": "viewer",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "ann@vitcha.com",
    "createdAt": "2026-10-26T11:30:00Z"
  },
  {
    "id": "user-mook",
    "name": "น้องมุก (ทีมสำรวจหน้างาน)",
    "alias": "มุก (Field Scout)",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    "emailOrId": "mook@vitcha.com",
    "createdAt": "2026-10-26T12:00:00Z"
  }
];

export const INITIAL_SUPPLIERS: SupplierRecord[] = [
  {
    "id": "sup-1",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "FEST (Guangzhou Rongchuan Electrical) เครื่องซีล & จ่ายไซรัป",
    "chineseName": "广州荣创电器设备有限公司 (FEST)",
    "marketOrCity": "ตลาดเครื่องครัวผานหยู (Panyu Guangzhou)",
    "category": "เครื่องซีลแก้ว",
    "rating": 5,
    "quickTags": [
      "โรงงานผลิตเอง (Manufacturer)",
      "มีโชว์รูมให้ดูของจริง",
      "คุยภาษาอังกฤษได้",
      "รองรับส่งออก (Export Ready)",
      "มีสต็อกพร้อมส่งทันที"
    ],
    "phone": "+86 18925080756",
    "wechatId": "rongchuan_fest_sales",
    "address": "Panyu District, Guangzhou, Guangdong",
    "assignedTo": "Lek",
    "targetFollowUpDate": "2026-11-05",
    "handoffStage": "ordered",
    "handoffNotes": "ออกใบสั่งซื้อ (PO) เครื่องซีลแก้ว RC-95 จำนวน 5 เครื่อง และเครื่องจ่ายไซรัป 16 ช่อง 5 เครื่องแล้ว นัดส่งมอบขึ้นตู้ชิปปิ้งกวางโจว",
    "status": "ordered",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "videos": [
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    ],
    "catalogItems": [
      {
        "id": "cat-1-1",
        "name": "FEST RC-95 Intelligent Cup Sealer (เครื่องซีลแก้วอัตโนมัติ)",
        "photo": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "dimensions": "360 x 360 x 580 mm",
        "weightKg": "28 kg",
        "priceRmb": 2800,
        "priceThb": 14224,
        "memo": "รองรับปากแก้ว 90 และ 95mm เซนเซอร์คู่ ซีลได้เร็ว 400 แก้ว/ชม. สเปกไฟตรงกับไทย 220V 50Hz มอเตอร์ทองแดงแท้ เปิดต่อเนื่อง 12 ชม."
      },
      {
        "id": "cat-1-2",
        "name": "FEST Syrup Dosing Machine (เครื่องจ่ายไซรัป 16 ช่อง)",
        "photo": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
        "dimensions": "260 x 365 x 410 mm",
        "weightKg": "9 kg",
        "priceRmb": 1650,
        "priceThb": 8382,
        "memo": "กดจ่ายของเหลวความหนืดสูงได้ดี จ่ายซ้ำแม่นยำ +/- 1g ล้างทำความสะอาดง่ายด้วยระบบ Flush อัตโนมัติ"
      }
    ],
    "memo": "โรงงานใหญ่ระดับท็อปของกวางโจว เซลส์คุยอังกฤษคล่อง อะไหล่สวิตช์และซีลยางมีสต็อกพร้อมส่ง FOB กวางโจวได้ทันที",
    "voiceNoteUrl": "",
    "voiceDurationSec": 38,
    "voiceNotes": [
      {
        "id": "vn-sup1-1",
        "url": "",
        "durationSec": 38,
        "label": "บันทึกเสียงเทสต์เสียงมอเตอร์เครื่องซีลหน้างานจริง",
        "createdAt": "2026-10-26T14:40:00Z"
      }
    ],
    "location": {
      "lat": 23.0965,
      "lng": 113.3644,
      "addressText": "Panyu District, Guangzhou, Guangdong, China"
    },
    "creator": {
      "id": "user-ice",
      "name": "SuperiCez",
      "alias": "SuperiCez",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-26T14:35:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup1-1",
        "authorId": "user-ice",
        "author": "SuperiCez",
        "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "พี่มาดูโชว์รูม FEST ที่ผานหยู เครื่องซีล RC-95 ตัวจริงแน่นมาก มอเตอร์ทองแดงแท้ ซีลได้ 400 แก้ว/ชม. สเปกไฟ 220V 50Hz ใช้กับไฟสาขาในไทยได้เลย สั่งคู่เครื่องจ่ายไซรัป 16 ช่อง ได้ราคาส่งพิเศษ @Lek ดูสเปกมอเตอร์กับรอบการซีลหน่อย @เนม เช็กขนาดปากแก้ว 95mm",
        "timestamp": "2026-10-26T15:10:00Z",
        "replies": [
          {
            "id": "rep-sup1-1-1",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "รับเรื่องครับพี่ไอซ์ สเปกมอเตอร์ 350W ตัวนี้ทนทานมากครับ ในไทยใช้ไฟบ้านปกติได้เลย เดี๋ยวผมเทียบกับไดอะแกรมบาร์เครื่องดื่มให้ครับ",
            "timestamp": "2026-10-26T15:25:00Z"
          },
          {
            "id": "rep-sup1-1-2",
            "authorId": "user-name-pkg",
            "author": "เนม",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เช็กแล้วค่ะพี่ไอซ์ ม้วนฟิล์มและแก้ว PP 95mm ของเราใช้กับบล็อกจับ RC-95 ได้พอดีเป๊ะค่ะ ซีลสนิทไม่รั่วซึมแน่นอนค่ะ",
            "timestamp": "2026-10-26T15:35:00Z"
          },
          {
            "id": "rep-sup1-1-3",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ถ้าลงเคาน์เตอร์บาร์ สั่งตัดช่องหลุม Drop-in 40x40cm สวยเนียนกับท็อปสเตนเลสเลยครับพี่ไอซ์",
            "timestamp": "2026-10-26T15:45:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สร้างรายการซัพพลายเออร์",
        "user": "SuperiCez",
        "userAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-26T14:35:00Z"
      },
      {
        "action": "ส่งต่องานให้ Lek (อุปกรณ์เครื่องจักร)",
        "user": "SuperiCez",
        "userAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-26T15:10:00Z"
      }
    ],
    "updatedAt": "2026-10-26T15:45:00Z"
  },
  {
    "id": "sup-2",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "Foshan Shunde Chuangyu บาร์สเตนเลส 304 สั่งทำพิเศษ",
    "chineseName": "佛山市顺德区创誉不锈钢商用吧台设备",
    "marketOrCity": "ซุ่นเต๋อ ฝอซาน (Shunde Foshan)",
    "category": "เคาน์เตอร์ & สเตนเลส",
    "rating": 5,
    "quickTags": [
      "โรงงานผลิตเอง (Manufacturer)",
      "รองรับส่งออก (Export Ready)",
      "มีโชว์รูมให้ดูของจริง",
      "มีบริการจัดส่งในไทย"
    ],
    "phone": "+86 13825567890",
    "wechatId": "chuangyu_bar_custom",
    "address": "Ronggui, Shunde District, Foshan, Guangdong",
    "assignedTo": "ayai",
    "targetFollowUpDate": "2026-11-08",
    "handoffStage": "negotiate",
    "handoffNotes": "ส่งแบบแปลน Drawing บาร์น้ำ 2.4 เมตร สเตนเลส 304 หนา 1.2 มม. ให้โรงงานขึ้นม็อคอัพ 3D ถังน้ำแข็งฝังบาร์และซิงค์หลุมลึก",
    "status": "shortlisted",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1590725140246-20acdb816e88?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "catalogItems": [
      {
        "id": "cat-2-1",
        "name": "Custom Modular Bar Station 304 (เคาน์เตอร์บาร์น้ำโมดูลาร์ 2.4m)",
        "photo": "https://images.unsplash.com/photo-1590725140246-20acdb816e88?w=600&auto=format&fit=crop&q=80",
        "dimensions": "2400 x 750 x 850 mm",
        "weightKg": "125 kg",
        "priceRmb": 4800,
        "priceThb": 24384,
        "memo": "ท็อปสเตนเลสเกรด 304 หนา 1.2 มม. ฉนวนโฟม PU ถังน้ำแข็งเก็บความเย็นได้ 18 ชม. ซิงค์ล้างแก้ว Pitcher Rinser ในตัว"
      }
    ],
    "location": {
      "lat": 22.7564,
      "lng": 113.2451,
      "addressText": "Shunde District, Foshan, Guangdong, China"
    },
    "creator": {
      "id": "user-p-ohm",
      "name": "P.ohm (ผู้บริหาร & หัวหน้างาน)",
      "alias": "P.ohm",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T10:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup2-1",
        "authorId": "user-p-ohm",
        "author": "P.ohm",
        "authorAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "โรงงานสเตนเลสซุ่นเต๋องานพับขอบเนียนมาก สเตนเลส 304 แท้ หนา 1.2 มม. มีซิงค์หลุมลึก ถังน้ำแข็งฝังบาร์พร้อมโฟมฉนวนหนา 5 ซม. เก็บน้ำแข็งได้ 18 ชม. @ayai ลองดูแบบ Drawing นะว่าขนาดบาร์ 2.4 เมตร ลงกับสเปกคีออสเราได้ไหม @Lek ดูตำแหน่งร้อยท่อไฟเข้าเครื่องซีลด้วย",
        "timestamp": "2026-10-27T10:45:00Z",
        "replies": [
          {
            "id": "rep-sup2-1-1",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "แบบนี้ดีมากเลยครับพี่โอม ซ่อนงานระบบท่อน้ำดีและน้ำทิ้งเรียบร้อย ผมจะนำระยะไปชนกับแบบ Kiosk 3x2 เมตร ที่เราจะลงเซ็นทรัลครับ",
            "timestamp": "2026-10-27T11:10:00Z"
          },
          {
            "id": "rep-sup2-1-2",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ฝากสั่งโรงงานเจาะรูกลม 60mm สำหรับร้อยสายไฟเครื่องจ่ายไซรัปและเครื่องปั่นสมูทตี้เพิ่มตรงมุมขวา 2 รูด้วยครับ จะได้ไม่ต้องมากรีดเองในไทย",
            "timestamp": "2026-10-27T11:20:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจโรงงานสเตนเลสฝอซาน",
        "user": "P.ohm",
        "userAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T10:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T11:20:00Z"
  },
  {
    "id": "sup-3",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "Guangzhou Bio-Eco Packaging แก้ว Slim Cup & หลอดไบโอ",
    "chineseName": "广州绿源环保包装实业有限公司",
    "marketOrCity": "เขตไป๋หยุน กวางโจว (Baiyun Guangzhou)",
    "category": "บรรจุภัณฑ์ & แก้ว",
    "rating": 5,
    "quickTags": [
      "โรงงานผลิตเอง (Manufacturer)",
      "สั่งขั้นต่ำน้อย (Low MOQ)",
      "รองรับส่งออก (Export Ready)",
      "มีตัวอย่างให้ทดลอง (Samples)"
    ],
    "phone": "+86 13928812345",
    "wechatId": "bio_cup_gz",
    "address": "Baiyun District, Guangzhou, Guangdong",
    "assignedTo": "เนม",
    "targetFollowUpDate": "2026-11-06",
    "handoffStage": "sample_test",
    "handoffNotes": "ขอตัวอย่างแก้ว Slim Cup 16oz/22oz เนื้อด้าน (Matte) พิมพ์ลาย 4 สี พร้อมหลอดไบโอ PLA 12mm สำหรับดูดไข่มุก",
    "status": "reviewing",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "catalogItems": [
      {
        "id": "cat-3-1",
        "name": "VITCHA Custom 90mm Slim Cup 22oz (แก้วสลิมคัพเนื้อด้าน)",
        "photo": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
        "dimensions": "ปาก 90mm สูง 178mm ก้น 56mm",
        "weightKg": "18 g/ใบ",
        "priceRmb": 0.29,
        "priceThb": 1.47,
        "memo": "พลาสติก PP Food Grade เกรดส่งออก จับกระชับมือ ทรงเพรียวสลิมแบบ CHAGEE พิมพ์ลาย 4 สีระบบ UV"
      }
    ],
    "location": {
      "lat": 23.1611,
      "lng": 113.2755,
      "addressText": "Baiyun District, Guangzhou, Guangdong, China"
    },
    "creator": {
      "id": "user-1793177529069",
      "name": "MommySomO",
      "alias": "MommySomO",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T13:30:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup3-1",
        "authorId": "user-1793177529069",
        "author": "MommySomO",
        "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "เดินโซนแพ็กเกจจิ้ง เจอแก้วทรง Slim Cup 22oz พิมพ์ลาย VITCHA สวยพรีเมียมมาก สัมผัสด้าน (Matte) ไม่ลื่นมือ พร้อมหลอดไบโอ PLA เจาะซีลง่าย ไม่ยุบตัว @เนม ดูสเปกความหนากับขั้นต่ำ MOQ 10,000 ใบให้ทีจ้า",
        "timestamp": "2026-10-27T14:00:00Z",
        "replies": [
          {
            "id": "rep-sup3-1-1",
            "authorId": "user-name-pkg",
            "author": "เนม",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ดูตัวอย่างแล้วสวยเก๋มากค่ะพี่ส้มโอ ความหนา 18 กรัมกำลังแข็งแรงเวลาจับไม่ยวบ MOQ 10,000 ใบต่อลาย ต้นทุนตกแก้วละประมาณ 1.45 บาท ถือว่าดีมากค่ะ เดี๋ยวเนมคอนเฟิร์มปรู๊ฟสีกับเซลส์ทาง WeChat ให้เลยค่ะ",
            "timestamp": "2026-10-27T14:20:00Z"
          },
          {
            "id": "rep-sup3-1-2",
            "authorId": "user-ice",
            "author": "SuperiCez",
            "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ผ่านเลยครับ สีแบรนด์ VITCHA ขอโทนเขียวมัทฉะตัดทองตาม CI นะครับ",
            "timestamp": "2026-10-27T14:30:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจโรงงานแก้วไป๋หยุน",
        "user": "MommySomO",
        "userAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T13:30:00Z"
      }
    ],
    "updatedAt": "2026-10-27T14:30:00Z"
  },
  {
    "id": "sup-4",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "Yunnan Ancient Mountain Tea Co. ชาดำยูนนาน & ชาอู่หลงพีช",
    "chineseName": "云南古道茶业有限公司 (芳村分部)",
    "marketOrCity": "ตลาดชาฟางชุน กวางโจว (Fangcun Tea Market)",
    "category": "ใบชา & วัตถุดิบ",
    "rating": 5,
    "quickTags": [
      "โรงงานผลิตเอง (Manufacturer)",
      "มีตัวอย่างให้ทดลอง (Samples)",
      "มี มอก./อย./COA รับรอง",
      "มีสต็อกพร้อมส่งทันที"
    ],
    "phone": "+86 13711223344",
    "wechatId": "yunnan_fangcun_tea",
    "address": "Fangcun, Liwan District, Guangzhou, Guangdong",
    "assignedTo": "น้องเมย์",
    "targetFollowUpDate": "2026-11-04",
    "handoffStage": "sample_test",
    "handoffNotes": "ส่งใบชาอู่หลงพีชขาว และชาเขียวมะลิระแนงสด แซมเปิลอย่างละ 500g ให้แล็บ R&D กทม. ทดลองสกัด",
    "status": "reviewing",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "catalogItems": [
      {
        "id": "cat-4-1",
        "name": "White Peach Oolong (ชาอู่หลงกลิ่นพีชขาวเกรดส่งออก)",
        "photo": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
        "dimensions": "ถุงฟอยล์สูญญากาศ 500g",
        "weightKg": "0.5 kg",
        "priceRmb": 65,
        "priceThb": 330,
        "memo": "อบกลิ่นพีชธรรมชาติ ไม่ฉุนเคมี สกัดน้ำชาร้อน 90°C ให้กลิ่นหอมฟุ้งติดทนนาน ชงได้ทั้งชานมและชาใส"
      }
    ],
    "location": {
      "lat": 23.0944,
      "lng": 113.2272,
      "addressText": "Fangcun, Liwan District, Guangzhou, Guangdong, China"
    },
    "creator": {
      "id": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
      "name": "P.ตุ้ย (ผู้บริหาร & หัวหน้างาน)",
      "alias": "P.ตุ้ย",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T15:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup4-1",
        "authorId": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
        "author": "P.ตุ้ย",
        "authorAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "มาตลาดชาฟางชุน ชิมใบชาอู่หลงพีชขาวตัวนี้แล้วว้าวมาก กลิ่นดอกไม้หอมละมุน บอดี้แน่น ไม่ฝาดลิ้นเลย และมีชาเขียวมะลิระแนงสดอีกตัว @น้องเมย์ พี่ขอแซมเปิลอย่างละ 500 กรัม ส่งด่วนไปให้ที่แล็บ กทม. ลองสกัดเทสสูตรชานมและชาผลไม้ดูนะ",
        "timestamp": "2026-10-27T15:30:00Z",
        "replies": [
          {
            "id": "rep-sup4-1-1",
            "authorId": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
            "author": "น้องเมย์",
            "authorAvatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ได้รับ Tracking แล้วค่ะพี่ตุ้ย เดี๋ยวถึงแล็บเมย์จะเทสอุณหภูมิน้ำ 85°C กับ 90°C วัดค่า Brix และทำ sensory test เทียบกับนมสดและชีสโฟมทันทีค่ะ",
            "timestamp": "2026-10-27T16:00:00Z"
          },
          {
            "id": "rep-sup4-1-2",
            "authorId": "user-1793177529069",
            "author": "MommySomO",
            "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เน้นกลิ่นหอมฟุ้งตอนยกดื่มนะจ๊ะน้องเมย์ ลูกค้าผู้หญิงชอบแนวนี้มาก",
            "timestamp": "2026-10-27T16:15:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจตลาดชาฟางชุน กวางโจว",
        "user": "P.ตุ้ย",
        "userAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T15:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T16:15:00Z"
  },
  {
    "id": "sup-5",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "Jiangmen Cooltech Ice เครื่องทำน้ำแข็งเกล็ดหิมะ & ตู้แช่เย็น",
    "chineseName": "江门酷泰克制冷设备制造有限公司",
    "marketOrCity": "เจียงเหมิน กวางตุ้ง (Jiangmen Guangdong)",
    "category": "ตู้ทำน้ำแข็ง",
    "rating": 5,
    "quickTags": [
      "โรงงานผลิตเอง (Manufacturer)",
      "มี มอก./อย./COA รับรอง",
      "รองรับส่งออก (Export Ready)",
      "มีสต็อกพร้อมส่งทันที"
    ],
    "phone": "+86 13631899988",
    "wechatId": "cooltech_ice_sales",
    "address": "Jianghai District, Jiangmen, Guangdong",
    "assignedTo": "Lek",
    "targetFollowUpDate": "2026-11-10",
    "handoffStage": "rfq_sent",
    "handoffNotes": "ขอใบเสนอราคาเครื่องทำน้ำแข็งเกล็ดหิมะ 150kg/วัน คอมเพรสเซอร์ Embraco ยุโรป สเปกไฟไทย 220V 50Hz",
    "status": "rfq_sent",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "catalogItems": [
      {
        "id": "cat-5-1",
        "name": "Cooltech 150kg/day Snow Flake Ice Maker (เครื่องทำน้ำแข็งเกล็ดหิมะ)",
        "photo": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
        "dimensions": "600 x 650 x 850 mm",
        "weightKg": "65 kg",
        "priceRmb": 4200,
        "priceThb": 21336,
        "memo": "น้ำแข็งเกล็ดเคี้ยวเพลิน ละลายช้า คอมเพรสเซอร์ Embraco ระบายความร้อนดีเยี่ยม สอดใต้เคาน์เตอร์บาร์ได้"
      }
    ],
    "location": {
      "lat": 22.5786,
      "lng": 113.0816,
      "addressText": "Jianghai District, Jiangmen, Guangdong, China"
    },
    "creator": {
      "id": "user-ice",
      "name": "SuperiCez",
      "alias": "SuperiCez",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T17:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup5-1",
        "authorId": "user-ice",
        "author": "SuperiCez",
        "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "เครื่องทำน้ำแข็งเกล็ดหิมะไฮสปีด ผลิตน้ำแข็งได้ 150 กิโลกรัมต่อวัน เม็ดน้ำแข็งแบบเคี้ยวเพลินละลายช้า คอมเพรสเซอร์ Embraco ยุโรป ทนความร้อนสูง @Lek เช็กเรื่องระบบกรองน้ำ RO และขนาดทางน้ำเข้า 4 หุนให้หน่อย",
        "timestamp": "2026-10-27T17:30:00Z",
        "replies": [
          {
            "id": "rep-sup5-1-1",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เช็กสเปกคอมเพรสเซอร์เรียบร้อยครับ ตัวนี้ใช้น้ำยา R290 ประหยัดไฟและเป็นมิตรต่อสิ่งแวดล้อม เดี๋ยวผมสั่งเตรียมชุดกรองตะกอน + กรองคลอรีน 3 ขั้นตอนรอไว้ที่สาขาไทยครับ",
            "timestamp": "2026-10-27T18:00:00Z"
          },
          {
            "id": "rep-sup5-1-2",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ขนาดตู้กว้าง 60 ลึก 65 สูง 85 ซม. สอดใต้เคาน์เตอร์บาร์น้ำของโรงงานซุ่นเต๋อได้เป๊ะเลยครับ",
            "timestamp": "2026-10-27T18:15:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจโรงงานเครื่องทำน้ำแข็งเจียงเหมิน",
        "user": "SuperiCez",
        "userAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T17:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T18:15:00Z"
  },
  {
    "id": "sup-6",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "Guangzhou Vitality Bio-Ingredients วิตามินซี & ชีสโฟมฮอกไกโด",
    "chineseName": "广州维他力生物配料科技有限公司",
    "marketOrCity": "หวงผู่ กวางโจว (Huangpu Guangzhou)",
    "category": "วิตามิน & ผงพรีมิกซ์",
    "rating": 5,
    "quickTags": [
      "มี มอก./อย./COA รับรอง",
      "มีตัวอย่างให้ทดลอง (Samples)",
      "โรงงานผลิตเอง (Manufacturer)",
      "สั่งขั้นต่ำน้อย (Low MOQ)"
    ],
    "phone": "+86 13580011223",
    "wechatId": "vitality_premix_gz",
    "address": "Huangpu District, Guangzhou, Guangdong",
    "assignedTo": "น้องเมย์",
    "targetFollowUpDate": "2026-11-07",
    "handoffStage": "sample_test",
    "handoffNotes": "ทดสอบการละลายและความคงตัวของวิตามินซีคอมเพล็กซ์ในชาผลไม้เย็น และวัดระยะเวลาการคงตัวของชั้นชีสโฟม",
    "status": "reviewing",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "catalogItems": [
      {
        "id": "cat-6-1",
        "name": "Vitamin C Bio-Complex Powder (วิตามินซีคอมเพล็กซ์ชงดื่ม)",
        "photo": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        "dimensions": "กระปุก 1 kg",
        "weightKg": "1.0 kg",
        "priceRmb": 88,
        "priceThb": 447,
        "memo": "ละลายน้ำเย็นได้ใน 5 วินาที ไม่เปลี่ยนสีน้ำชา รสชาติเปรี้ยวนุ่ม ไม่ทิ้งกลิ่นยา ปริมาณ 1,000mg ต่อช้อนเสิร์ฟ"
      }
    ],
    "location": {
      "lat": 23.1075,
      "lng": 113.4567,
      "addressText": "Huangpu District, Guangzhou, Guangdong, China"
    },
    "creator": {
      "id": "user-1793177529069",
      "name": "MommySomO",
      "alias": "MommySomO",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T19:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup6-1",
        "authorId": "user-1793177529069",
        "author": "MommySomO",
        "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "โรงงานวัตถุดิบสุขภาพ มีวิตามินซีคอมเพล็กซ์แบบละลายน้ำเร็วไม่ทิ้งกลิ่นยา และผงชีสโฟมฮอกไกโดตีขึ้นฟูเนียนนุ่ม มีเอกสาร COA และใบรับรองฮาลาล/ISO ครบ @น้องเมย์ ดูส่วนผสมว่าทนความร้อนและความเปรี้ยวของชาผลไม้ได้กี่ชั่วโมงนะ",
        "timestamp": "2026-10-27T19:30:00Z",
        "replies": [
          {
            "id": "rep-sup6-1-1",
            "authorId": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
            "author": "น้องเมย์",
            "authorAvatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ผงชีสโฟมตัวนี้ตีขึ้นรูปเร็วมากค่ะพี่ส้มโอ โฟมคงตัวเกิน 45 นาทีไม่ยุบตัว และวิตามินซีละลายในชาผลไม้เย็นแล้วรสชาติกลมกล่อม ไม่เปรี้ยวแหลมจนเสียรสชาค่ะ",
            "timestamp": "2026-10-27T20:00:00Z"
          },
          {
            "id": "rep-sup6-1-2",
            "authorId": "user-p-ohm",
            "author": "P.ohm",
            "authorAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ขอเอกสาร COA ล็อตผลิตส่งให้พี่ด้วยนะ จะได้ให้ฝ่ายทะเบียนยื่นตรวจสอบมาตรฐาน อย. นำเข้า",
            "timestamp": "2026-10-27T20:15:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจโรงงานวัตถุดิบหวงผู่",
        "user": "MommySomO",
        "userAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T19:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T20:15:00Z"
  },
  {
    "id": "sup-7",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "Zhongshan BlendMax Machinery เครื่องปั่นสมูทตี้ซับเสียง 2200W",
    "chineseName": "中山市博兰麦斯商用电器制造有限公司",
    "marketOrCity": "จงซาน กวางตุ้ง (Zhongshan Guangdong)",
    "category": "เครื่องปั่นสมูทตี้",
    "rating": 5,
    "quickTags": [
      "โรงงานผลิตเอง (Manufacturer)",
      "มี มอก./อย./COA รับรอง",
      "รองรับส่งออก (Export Ready)",
      "มีสต็อกพร้อมส่งทันที"
    ],
    "phone": "+86 13411228899",
    "wechatId": "blendmax_commercial",
    "address": "Xiaolan Town, Zhongshan, Guangdong",
    "assignedTo": "Lek",
    "targetFollowUpDate": "2026-11-09",
    "handoffStage": "approved",
    "handoffNotes": "อนุมัติสั่งซื้อเครื่องปั่นสมูทตี้ 2200W พร้อมกล่องซับเสียง 4 เครื่อง มอเตอร์รอบจัด 38,000 RPM ปั่นเนียน 15 วินาที",
    "status": "shortlisted",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "catalogItems": [
      {
        "id": "cat-7-1",
        "name": "BlendMax Ultra-Quiet Commercial Blender (เครื่องปั่นซับเสียง 2200W)",
        "photo": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80",
        "dimensions": "230 x 270 x 480 mm",
        "weightKg": "8.5 kg",
        "priceRmb": 1350,
        "priceThb": 6858,
        "memo": "มอเตอร์ทองแดง 2200W ใบมีดไททาเนียม 6 แฉก โถปั่น Tritan BPA-Free 1.8 ลิตร ซับเสียงดังไม่เกิน 68 dB"
      }
    ],
    "location": {
      "lat": 22.6811,
      "lng": 113.2422,
      "addressText": "Xiaolan Town, Zhongshan, Guangdong, China"
    },
    "creator": {
      "id": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
      "name": "P.ตุ้ย (ผู้บริหาร & หัวหน้างาน)",
      "alias": "P.ตุ้ย",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T21:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup7-1",
        "authorId": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
        "author": "P.ตุ้ย",
        "authorAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "เครื่องปั่นสมูทตี้ 2200W มอเตอร์ญี่ปุ่น รอบจัด 38,000 RPM ปั่นน้ำแข็งละเอียดเป็นเนื้อไอศกรีมใน 15 วินาที พร้อมกล่องอะคริลิกซับเสียง หน้าร้านไม่หนวกหูแน่นอน @Lek ลองดูใบมีดสเตนเลสไททาเนียม 6 แฉกนะ",
        "timestamp": "2026-10-27T21:30:00Z",
        "replies": [
          {
            "id": "rep-sup7-1-1",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "มอเตอร์ 2200W กำลังขับสูงสะใจมากครับพี่ตุ้ย ใบมีดไททาเนียมทนทานไม่สึกหรอง่าย ตัวนี้ผมให้ผ่านเลยครับ สั่งเป็นเครื่องหลัก 2 เครื่องต่อสาขาได้เลย",
            "timestamp": "2026-10-27T21:50:00Z"
          },
          {
            "id": "rep-sup7-1-2",
            "authorId": "user-name-pkg",
            "author": "เนม",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "โถปั่นวัสดุ Tritan ปลอดสาร BPA น้ำหนักเบา บาริสต้าเทมือเดียวคล่องตัวแน่นอนค่ะ",
            "timestamp": "2026-10-27T22:00:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจโรงงานเครื่องปั่นจงซาน",
        "user": "P.ตุ้ย",
        "userAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T21:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T22:00:00Z"
  },
  {
    "id": "sup-8",
    "type": "supplier",
    "country": "CN",
    "isMockup": true,
    "name": "Guangzhou Golden Leaf เครื่องสกัดชาแรงดันสูง Teaspresso (9 บาร์)",
    "chineseName": "广州金叶茶萃设备研发制造中心",
    "marketOrCity": "เทียนเหอ กวางโจว (Tianhe Guangzhou)",
    "category": "เครื่องสกัดชา",
    "rating": 5,
    "quickTags": [
      "โรงงานผลิตเอง (Manufacturer)",
      "มี มอก./อย./COA รับรอง",
      "รองรับส่งออก (Export Ready)",
      "มีตัวอย่างให้ทดลอง (Samples)"
    ],
    "phone": "+86 18819922888",
    "wechatId": "teaspresso_gz",
    "address": "Tianhe District, Guangzhou, Guangdong",
    "assignedTo": "Lek",
    "targetFollowUpDate": "2026-11-12",
    "handoffStage": "approved",
    "handoffNotes": "เครื่องสกัดชาเอสเปรสโซ Teaspresso 9 บาร์ สกัดชาร้อนสดแก้วต่อแก้วใน 45 วินาที สั่งจองเครื่องเดโม 2 เครื่องสำหรับสาขาแรก",
    "status": "ordered",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
      ],
      "contactCards": [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "catalogItems": [
      {
        "id": "cat-8-1",
        "name": "Teaspresso 9-Bar Extraction System (เครื่องสกัดชาแรงดันสูง)",
        "photo": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
        "dimensions": "420 x 480 x 520 mm",
        "weightKg": "32 kg",
        "priceRmb": 6800,
        "priceThb": 34544,
        "memo": "แรงดันคงที่ 9 บาร์ ควบคุมอุณหภูมิน้ำ +/- 0.5°C หน้าจอสัมผัสโปรแกรมสกัดชา 8 สูตร ดึงรสชาติชาสดสดใหม่แก้วต่อแก้ว"
      }
    ],
    "location": {
      "lat": 23.1345,
      "lng": 113.3312,
      "addressText": "Tianhe District, Guangzhou, Guangdong, China"
    },
    "creator": {
      "id": "user-ice",
      "name": "SuperiCez",
      "alias": "SuperiCez",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-28T09:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-sup8-1",
        "authorId": "user-ice",
        "author": "SuperiCez",
        "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "เครื่องสกัดชาเอสเปรสโซ Teaspresso 9 บาร์ ใช้เวลาสกัดแค่ 45 วินาที ได้น้ำชาสดเข้มข้น ดึงกลิ่นเทอร์พีนของใบชาออกมาได้สูงสุด แทนการต้มชาทิ้งไว้ทั้งวัน ชนะคู่แข่งขาดลอย @Lek @น้องเมย์ ดูกระบวนการนี้นะ",
        "timestamp": "2026-10-28T09:30:00Z",
        "replies": [
          {
            "id": "rep-sup8-1-1",
            "authorId": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
            "author": "น้องเมย์",
            "authorAvatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ว้าวมากค่ะพี่ไอซ์ ถ้าน้ำชาร้อนสกัดสดแก้วต่อแก้ว ชาผลไม้และชานมของ VITCHA จะสดชื่นมาก ไม่มีกลิ่นชาค้างคืนแน่นอนค่ะ!",
            "timestamp": "2026-10-28T09:50:00Z"
          },
          {
            "id": "rep-sup8-1-2",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ระบบแรงดัน 9 บาร์ ตัวนี้มีเกจวัดแม่นยำ ล้างตะแกรง Portafilter ง่าย เดี๋ยวผมเตรียมสเปกปั๊มน้ำแรงดันคงที่ 2 บาร์เข้าเครื่องไว้ให้ครับ",
            "timestamp": "2026-10-28T10:10:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจเครื่องสกัดชาเทียนเหอ",
        "user": "SuperiCez",
        "userAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-28T09:00:00Z"
      }
    ],
    "updatedAt": "2026-10-28T10:10:00Z"
  }
];

export const INITIAL_DRINK_STORES: StoreInspoRecord[] = [
  {
    "id": "store-1",
    "type": "drink_store",
    "country": "CN",
    "isMockup": true,
    "storeCategory": "ชานมพรีเมียม & ชาสด",
    "storeName": "CHAGEE 霸王茶姬 (Guangzhou Flagship)",
    "chineseName": "霸王茶姬 (广州天河城旗舰店)",
    "brandConcept": "Modern Oriental Tea Bar · ชานมมะลิใบชาสดพรีเมียม",
    "city": "กวางโจว (Guangzhou)",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80"
      ],
      "menuBoard": [
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
      ],
      "drinkCups": [
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "ratings": {
      "taste": 5,
      "aesthetics": 5,
      "value": 4,
      "speed": 5
    },
    "drinkItems": [
      {
        "id": "drink-1-1",
        "name": "Bo Ya Jue Xian (ชานมมะลิสลิมคัพพรีเมียม)",
        "photo": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
        "priceRmb": 20,
        "priceThb": 102,
        "cupSize": "Slim Cup 22oz",
        "fitMenuTarget": "Signature Menu VITCHA",
        "gimmickNotes": "กลิ่นหอมฟุ้งมะลิระแนง ผสมนมสด 0% Trans Fat หวานกำลังดี ปลอกแก้วเชือกถักถือเดินสะดวก"
      }
    ],
    "tastingNotes": "กลิ่นหอมดอกไม้ยาวนาน บอดี้ชานมเนียนละมุน ไม่เลี่ยน ดื่มง่ายมาก เป็นเรฟสำคัญสำหรับ Signature ชานม VITCHA",
    "location": {
      "lat": 23.1311,
      "lng": 113.3245,
      "addressText": "Teemall, Tianhe District, Guangzhou, China"
    },
    "assignedTo": "น้องเมย์",
    "targetFollowUpDate": "2026-11-04",
    "handoffStage": "sample_test",
    "handoffNotes": "แกะสูตรชานมมะลิ 'Bo Ya Jue Xian' คุมต้นทุนต่อแก้วไม่เกิน 18.50 บาท",
    "creator": {
      "id": "user-ice",
      "name": "SuperiCez",
      "alias": "SuperiCez",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-26T16:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-store1-1",
        "authorId": "user-ice",
        "author": "SuperiCez",
        "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "คิวแน่นตลอดทั้งวัน ชานมมะลิ 'Bo Ya Jue Xian' กลิ่นหอมฟุ้ง แก้วทรง Slim Cup สวยหรูหรา ถือเดินในห้างแล้วคนมองตามตลอด น้องเมย์แกะสูตรสัดส่วนชาต่อนมสดพรีเมียมให้ที",
        "timestamp": "2026-10-26T16:20:00Z",
        "replies": [
          {
            "id": "rep-store1-1-1",
            "authorId": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
            "author": "น้องเมย์",
            "authorAvatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เมย์ลองแกะสัดส่วนแล้วค่ะ ใช้ใบชามะลิพิเศษผสมนมสด 0% Trans Fat ความหวาน 50% กำลังดีงาม ได้กลิ่นหอมติดปลายลิ้นยาวนาน ต้นทุนวัตถุดิบต่อแก้วคุมได้ไม่เกิน 18.50 บาทค่ะ",
            "timestamp": "2026-10-26T16:45:00Z"
          },
          {
            "id": "rep-store1-1-2",
            "authorId": "user-1793177529069",
            "author": "MommySomO",
            "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "แพ็กเกจจิ้งแก้วยาวมีปลอกหิ้วเชือกถักเก๋มาก @เนม ออกแบบกระเป๋าหิ้วสไตล์นี้ให้แบรนด์ VITCHA ด้วยนะจ๊ะ",
            "timestamp": "2026-10-26T17:00:00Z"
          },
          {
            "id": "rep-store1-1-3",
            "authorId": "user-name-pkg",
            "author": "เนม",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "จัดให้ค่ะพี่ส้มโอ ตอนนี้ดราฟต์แบบกระเป๋าฟอยล์เก็บความเย็นลาย VITCHA Monogram ไว้เรียบร้อยแล้วค่ะ",
            "timestamp": "2026-10-26T17:15:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจร้าน CHAGEE กวางโจว",
        "user": "SuperiCez",
        "userAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-26T16:00:00Z"
      }
    ],
    "updatedAt": "2026-10-26T17:15:00Z"
  },
  {
    "id": "store-2",
    "type": "drink_store",
    "country": "CN",
    "isMockup": true,
    "storeCategory": "ชาผลไม้สด & คราฟต์โซดา",
    "storeName": "HEYTEA 喜茶 (Grandview Mall)",
    "chineseName": "喜茶 (广州正佳广场店)",
    "brandConcept": "Inspiring Tea Creations · ชาผลไม้ชิ้นสด & ครีมชีสนิวซีแลนด์",
    "city": "กวางโจว (Guangzhou)",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop&q=80"
      ],
      "menuBoard": [
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
      ],
      "drinkCups": [
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "ratings": {
      "taste": 5,
      "aesthetics": 5,
      "value": 4,
      "speed": 5
    },
    "drinkItems": [
      {
        "id": "drink-2-1",
        "name": "Succulent Grapes Cheese Tea (ชาเขียวองุ่นสดชีสโฟม)",
        "photo": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
        "priceRmb": 28,
        "priceThb": 142,
        "cupSize": "U Cup 650ml",
        "fitMenuTarget": "Fruit & Cheese Bar",
        "gimmickNotes": "องุ่นสดปอกมือเนื้อเด้ง ชีสโฟมนิวซีแลนด์รสเค็มนัวตัดเปรี้ยวสดชื่น"
      }
    ],
    "tastingNotes": "รสสัมผัสหลายเลเยอร์ มีทั้งน้ำชาผลไม้ เกล็ดหิมะปั่น และชีสโฟมหนานุ่ม",
    "location": {
      "lat": 23.1325,
      "lng": 113.3278,
      "addressText": "Grandview Mall, Tianhe District, Guangzhou, China"
    },
    "assignedTo": "น้องเมย์",
    "targetFollowUpDate": "2026-11-06",
    "handoffStage": "sample_test",
    "handoffNotes": "ทดลองสูตรชีสโฟมผสมเกลือชมพูหิมาลายันคู่กับชาองุ่นสด",
    "creator": {
      "id": "user-1793177529069",
      "name": "MommySomO",
      "alias": "MommySomO",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T11:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-store2-1",
        "authorId": "user-1793177529069",
        "author": "MommySomO",
        "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "เมนูชีสทีองุ่นสดและชาส้มโอผสมวิตามินซีปั่น รสชาติเปรี้ยวหวานสดชื่นสุดๆ ชั้นชีสด้านบนหนาแน่น รสเค็มนัวเข้ากับชาเขียวมะลิมาก @น้องเมย์ ลองแกะสูตรนี้นะ",
        "timestamp": "2026-10-27T11:30:00Z",
        "replies": [
          {
            "id": "rep-store2-1-1",
            "authorId": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
            "author": "น้องเมย์",
            "authorAvatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "สูตรชีสโฟมตัวนี้เมย์ทดลองใช้ครีมชีสผสมนมสดและเกลือชมพูหิมาลายัน ได้รสนัวแบบเดียวกันเลยค่ะ และองุ่นปอกเปลือกสดทำเป็นท็อปปิ้งเคี้ยวเพลินมาก",
            "timestamp": "2026-10-27T11:50:00Z"
          },
          {
            "id": "rep-store2-1-2",
            "authorId": "user-p-ohm",
            "author": "P.ohm",
            "authorAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "จุดขายเรื่องผลไม้สดปอกมือแบบนี้ ลูกค้าคนไทยชอบมาก วางระบบบาร์ให้ทำงานเร็วไม่เกิน 90 วินาทีต่อแก้วนะ",
            "timestamp": "2026-10-27T12:00:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจร้าน HEYTEA กวางโจว",
        "user": "MommySomO",
        "userAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T11:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T12:00:00Z"
  },
  {
    "id": "store-3",
    "type": "drink_store",
    "country": "CN",
    "isMockup": true,
    "storeCategory": "วิตามินบาร์ & สุขภาพ",
    "storeName": "Blueglass Yogurt & Vitamin Bar (Taikoo Hui)",
    "chineseName": "Blueglass 酸奶 (广州太古汇店)",
    "brandConcept": "Superfood · Active Lifestyle · วิตามินซี & โพรไบโอติกส์",
    "city": "กวางโจว (Guangzhou)",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80"
      ],
      "menuBoard": [
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
      ],
      "drinkCups": [
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "ratings": {
      "taste": 5,
      "aesthetics": 5,
      "value": 4,
      "speed": 5
    },
    "drinkItems": [
      {
        "id": "drink-3-1",
        "name": "VITCHA Glow Collagen Berry Booster",
        "photo": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
        "priceRmb": 42,
        "priceThb": 213,
        "cupSize": "Crystal Cup 500ml",
        "fitMenuTarget": "Healthy Booster",
        "gimmickNotes": "เบอร์รี่รวมสกัดสด ผสมคอลลาเจนไดเปปไทด์และวิตามินซีคอมเพล็กซ์ สีชมพูธรรมชาติ"
      }
    ],
    "tastingNotes": "หวานอมเปรี้ยว สดชื่นกระปรี้กระเปร่า ดื่มแล้วรู้สึกสุขภาพดี ภาพลักษณ์ลักชูรี",
    "location": {
      "lat": 23.1341,
      "lng": 113.3325,
      "addressText": "Taikoo Hui, Tianhe District, Guangzhou, China"
    },
    "assignedTo": "น้องเมย์",
    "targetFollowUpDate": "2026-11-08",
    "handoffStage": "sample_test",
    "handoffNotes": "พัฒนาเมนู Healthy Booster สำหรับกลุ่มลูกค้าสายฟิตเนสและรักสุขภาพ",
    "creator": {
      "id": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
      "name": "P.ตุ้ย (ผู้บริหาร & หัวหน้างาน)",
      "alias": "P.ตุ้ย",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T14:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-store3-1",
        "authorId": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
        "author": "P.ตุ้ย",
        "authorAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "ร้านนี้วาง Position เป็น Luxury Healthy Drink ชูเรื่องคอลลาเจน วิตามินซี และอะโวคาโดปั่น ราคาแก้วละ 40-45 หยวน แต่คนต่อคิวแน่นมาก ภาพลักษณ์พรีเมียมสุขภาพตรงกับคอนเซปต์ VITCHA",
        "timestamp": "2026-10-27T14:30:00Z",
        "replies": [
          {
            "id": "rep-store3-1-1",
            "authorId": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
            "author": "น้องเมย์",
            "authorAvatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เมย์ทำสูตร 'VITCHA Glow Vitamin Booster' สกัดเบอร์รี่รวม + คอลลาเจนเปปไทด์ + ชาขาว สีชมพูธรรมชาติสวยมาก ไม่ต้องใส่สีสังเคราะห์เลยค่ะ",
            "timestamp": "2026-10-27T15:00:00Z"
          },
          {
            "id": "rep-store3-1-2",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ดีไซน์หน้าร้านเค้าใช้กระจกลอนใสกับไฟ Warm White มินิมอลสะดุดตามาก ผมจะนำมู้ดแอนด์โทนนี้ไปใส่ในแบบ 3D หน้าร้านเราครับ",
            "timestamp": "2026-10-27T15:15:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจร้าน Blueglass ไท่กู่ฮุ่ย",
        "user": "P.ตุ้ย",
        "userAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T14:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T15:15:00Z"
  },
  {
    "id": "store-4",
    "type": "drink_store",
    "country": "CN",
    "isMockup": true,
    "storeCategory": "คาเฟ่ดีไซน์ & แพ็กเกจจิ้ง",
    "storeName": "Naixue 奈雪的茶 (Kiosk Express Model)",
    "chineseName": "奈雪的茶 (快饮柜台店)",
    "brandConcept": "Smart Express Tea Kiosk · คืนทุนไว ใช้พื้นที่กะทัดรัด",
    "city": "กวางโจว (Guangzhou)",
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80"
      ],
      "menuBoard": [
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
      ],
      "drinkCups": [
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "ratings": {
      "taste": 4,
      "aesthetics": 5,
      "value": 5,
      "speed": 5
    },
    "drinkItems": [
      {
        "id": "drink-4-1",
        "name": "Express Jasmine Cheese Green (ชามะลิเอ็กซ์เพรสชีส)",
        "photo": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
        "priceRmb": 18,
        "priceThb": 91,
        "cupSize": "Standard 500ml",
        "fitMenuTarget": "Express Kiosk",
        "gimmickNotes": "สกัดชาสดเร็ว จ่ายไซรัปอัตโนมัติ เสิร์ฟได้ใน 60 วินาที"
      }
    ],
    "location": {
      "lat": 23.1255,
      "lng": 113.3155,
      "addressText": "Tianhe District, Guangzhou, China"
    },
    "assignedTo": "ayai",
    "targetFollowUpDate": "2026-11-09",
    "handoffStage": "negotiate",
    "handoffNotes": "นำโมเดล Kiosk 15 ตร.ม. ไปปรับใช้กับการขยายสาขาในห้างและคอมมูนิตี้มอลล์ในไทย",
    "creator": {
      "id": "user-p-ohm",
      "name": "P.ohm (ผู้บริหาร & หัวหน้างาน)",
      "alias": "P.ohm",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-27T16:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-store4-1",
        "authorId": "user-p-ohm",
        "author": "P.ohm",
        "authorAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "โมเดล Kiosk ไซส์ 12-15 ตร.ม. ใช้พนักงานแค่ 2 คน เครื่องสกัดชาอัตโนมัติช่วยให้งานไวมาก ลูกค้าสั่งผ่าน QR code ชำระเงินล่วงหน้า ทราฟฟิกไหลลื่น",
        "timestamp": "2026-10-27T16:30:00Z",
        "replies": [
          {
            "id": "rep-store4-1-1",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เลย์เอาต์นี้ประหยัดพื้นที่มากครับ เคาน์เตอร์ตัว L จัดโซนรับออเดอร์ โซนปรุง และโซนส่งมอบแก้วไม่ชนกัน บาริสต้าก้าวขาไม่เกิน 3 ก้าว",
            "timestamp": "2026-10-27T16:45:00Z"
          },
          {
            "id": "rep-store4-1-2",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เครื่องจักรชุดนี้รวมเครื่องซีล FEST + Teaspresso + เครื่องจ่ายไซรัป 16 ช่อง กินไฟรวมแค่ 3,800W เบรกเกอร์ 30A เอาอยู่สบายๆ ครับ",
            "timestamp": "2026-10-27T17:00:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจโมเดล Kiosk Naixue",
        "user": "P.ohm",
        "userAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-27T16:00:00Z"
      }
    ],
    "updatedAt": "2026-10-27T17:00:00Z"
  }
];

export const INITIAL_LOCATIONS: LocationRecord[] = [
  {
    "revision": 1,
    "id": "loc-ctw-beacon",
    "type": "location",
    "country": "TH",
    "isMockup": true,
    "name": "CentralWorld ชั้น 7 โซนหน้าโรงหนัง SF World Cinema",
    "foreignName": "CentralWorld 7th Fl. Beacon Zone",
    "locationType": "ห้างสรรพสินค้า / ศูนย์การค้า",
    "zoneOrFloor": "ชั้น 7 โซน Atrium หน้าโรงหนัง",
    "unitNumber": "7F-K05",
    "location": {
      "lat": 13.7465,
      "lng": 100.5393,
      "addressText": "999/9 Rama I Rd, Pathum Wan, Bangkok 10330"
    },
    "spaceSpecs": {
      "usableAreaSqm": 18,
      "frontageWidthM": 4,
      "ceilingHeightM": 3.5,
      "layoutFormat": "island",
      "electricalPower": "3 เฟส 45 kVA",
      "hasWaterInflow": true,
      "hasDrainage": true,
      "hasGreaseTrap": true,
      "riderAccessNotes": "จุดจอดรถจักรยานยนต์ไรเดอร์ฝั่ง Dazzle มีลิฟต์ขนส่งตรงถึงชั้น 7"
    },
    "leaseTerms": {
      "rentModel": "fixed",
      "monthlyRentThb": 180000,
      "depositMonths": 3,
      "leasePeriodYears": 3,
      "fitOutPeriodDays": 30,
      "contactPerson": "คุณกิตติศักดิ์ (ฝ่ายพัฒนาธุรกิจ CPN)",
      "contactPhone": "02-640-7000",
      "contactLineWechat": "cpn_retail_ctw"
    },
    "ratings": {
      "footTraffic": 5,
      "visibility": 5,
      "accessibility": 5,
      "valueRoi": 4
    },
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1567449303078-57ad995bd301?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "quickTags": [
      "คนเดินแน่น",
      "ทราฟฟิกวันหยุดสูง",
      "มีท่อน้ำทิ้งในตัว",
      "สัญญา 3 ปี",
      "เจรจาต่อรองได้"
    ],
    "assignedTo": "ayai",
    "targetFollowUpDate": "2026-11-15",
    "handoffNotes": "ทำเลเปิด Flagship สาขาแรก กลุ่มลูกค้าทั้งวัยรุ่น นักท่องเที่ยว และคนทำงาน ทราฟฟิกเฉลี่ย 3,500 คน/ชม.",
    "handoffStage": "approved",
    "creator": {
      "id": "user-6ed8144d-a03f-438a-b78e-f4df23a6cadd",
      "name": "Zeen (สำรวจทำเลในไทย)",
      "alias": "Zeen",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-28T09:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-loc1-1",
        "authorId": "user-6ed8144d-a03f-438a-b78e-f4df23a6cadd",
        "author": "Zeen",
        "authorAvatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "จีนไปสำรวจทำเล CentralWorld ชั้น 7 ฝั่งหน้าโรงหนังและศูนย์อาหารมาค่ะ ทราฟฟิกคนเดินเฉลี่ย 3,500 คน/ชั่วโมง ทั้งวัยรุ่น วัยทำงาน และนักท่องเที่ยวต่างชาติ พื้นที่ 18 ตร.ม. ท่อน้ำดีและน้ำทิ้งครบถ้วน @SuperiCez @MommySomO พิจารณาทำเลแรกสำหรับ Flagship ได้เลยค่ะ",
        "timestamp": "2026-10-28T09:20:00Z",
        "replies": [
          {
            "id": "rep-loc1-1-1",
            "authorId": "user-ice",
            "author": "SuperiCez",
            "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ทราฟฟิกดีมาก ทำเลนี้ตอบโจทย์ภาพลักษณ์แบรนด์ VITCHA แน่นอน ค่าเช่า Fixed 180k ถ้าขายได้วันละ 400 แก้ว คืนทุนใน 7 เดือน ผ่านครับ!",
            "timestamp": "2026-10-28T09:40:00Z"
          },
          {
            "id": "rep-loc1-1-2",
            "authorId": "user-1793177529069",
            "author": "MommySomO",
            "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ชอบมากจ้าคนเดินเยอะทั้งวัน @ayai ช่วยวางแบบ Kiosk สวยๆ ให้เข้ากับมุมนี้นะคะ",
            "timestamp": "2026-10-28T09:55:00Z"
          },
          {
            "id": "rep-loc1-1-3",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ผมวัดพื้นที่แล้วครับ หน้ากว้าง 4 เมตร ทำ Kiosk สเตนเลสทองแฮร์ไลน์ผสมระแนงไม้และป้ายไฟ VITCHA เรืองแสงรอบทิศ รับรองเด่นสะดุดตาสุดในชั้นนี้ครับ",
            "timestamp": "2026-10-28T10:15:00Z"
          },
          {
            "id": "rep-loc1-1-4",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "สเปกไฟ 3 เฟส 45kVA เหลือเฟือสำหรับเครื่องสกัดชาและตู้ทำน้ำแข็งครับ ท่อระบายน้ำทิ้งอยู่หลังเคาน์เตอร์พอดี",
            "timestamp": "2026-10-28T10:30:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจพื้นที่ CentralWorld ชั้น 7",
        "user": "Zeen",
        "userAvatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-28T09:00:00Z"
      }
    ],
    "updatedAt": "2026-10-28T10:30:00Z"
  },
  {
    "revision": 1,
    "id": "loc-emsphere-market",
    "type": "location",
    "country": "TH",
    "isMockup": true,
    "name": "The EmSphere ชั้น G โซน Emsphere Food & Lifestyle Market",
    "foreignName": "The EmSphere Sukhumvit G Fl. Market",
    "locationType": "ห้างสรรพสินค้า / ศูนย์การค้า",
    "zoneOrFloor": "ชั้น G โซน Market ใกล้ทางเชื่อม BTS",
    "unitNumber": "G-MK12",
    "location": {
      "lat": 13.7315,
      "lng": 100.5693,
      "addressText": "628 Sukhumvit Rd, Khlong Tan, Khlong Toei, Bangkok 10110"
    },
    "spaceSpecs": {
      "usableAreaSqm": 15,
      "frontageWidthM": 3.5,
      "ceilingHeightM": 3.2,
      "layoutFormat": "corner",
      "electricalPower": "3 เฟส 30 kVA",
      "hasWaterInflow": true,
      "hasDrainage": true,
      "hasGreaseTrap": true,
      "riderAccessNotes": "จุดจอดรถรับส่ง Delivery ด้านข้างห้าง ไรเดอร์เดินเข้าออกสะดวกมาก"
    },
    "leaseTerms": {
      "rentModel": "hybrid",
      "monthlyRentThb": 95000,
      "gpPercent": 15,
      "depositMonths": 3,
      "leasePeriodYears": 2,
      "fitOutPeriodDays": 20,
      "contactPerson": "คุณวราภรณ์ (EM District Leasing)",
      "contactPhone": "02-269-1000",
      "contactLineWechat": "em_leasing_market"
    },
    "ratings": {
      "footTraffic": 5,
      "visibility": 5,
      "accessibility": 5,
      "valueRoi": 5
    },
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "quickTags": [
      "คนเดินแน่น",
      "มีท่อน้ำดีน้ำทิ้ง",
      "ใกล้ทางเชื่อมBTS",
      "กำลังซื้อสูง"
    ],
    "assignedTo": "ayai",
    "targetFollowUpDate": "2026-11-12",
    "handoffNotes": "กลุ่มลูกค้ากำลังซื้อสูงมาก สัญญาแบบ Hybrid 95k + GP 15% รับความเสี่ยงร่วมกับห้าง",
    "handoffStage": "negotiate",
    "creator": {
      "id": "user-80e9b44f-085e-4b9b-a341-9d07dab08b5c",
      "name": "Mild (สำรวจทำเลในไทย)",
      "alias": "Mild",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-28T10:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-loc2-1",
        "authorId": "user-80e9b44f-085e-4b9b-a341-9d07dab08b5c",
        "author": "Mild",
        "authorAvatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "มายด์นำเสนอชั้น G ห้าง EmSphere ค่ะ กลุ่มลูกค้ากำลังซื้อสูงมาก ทั้งสายคาเฟ่ คนทำงานสุขุมวิท และชาวต่างชาติ จุดนี้อยู่ใกล้ทางเข้าและจุดรอไรเดอร์ ยอด Delivery น่าจะปังมากค่ะ @P.ohm @P.ตุ้ย ด่วนเลยค่ะห้องนี้คนแย่งเยอะมาก",
        "timestamp": "2026-10-28T10:20:00Z",
        "replies": [
          {
            "id": "rep-loc2-1-1",
            "authorId": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
            "author": "P.ตุ้ย",
            "authorAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "พิกัดสุขุมวิทตรงใจมาก ลูกค้ากลุ่มนี้ยินดีจ่ายแก้วละ 85-135 บาทสำหรับชาวิตามินเพื่อสุขภาพ พี่ว่าคุ้มค่าน่าเปิดมากครับ",
            "timestamp": "2026-10-28T10:40:00Z"
          },
          {
            "id": "rep-loc2-1-2",
            "authorId": "user-p-ohm",
            "author": "P.ohm",
            "authorAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "สัญญา Hybrid 95k + GP 15% ถือว่ารับความเสี่ยงร่วมกับห้างได้ดี @ayai ออกแบบบาร์แบบ Express ให้ไรเดอร์รับของได้ไวๆ ไม่ต้องเดินเบียดลูกค้าหน้าร้านนะ",
            "timestamp": "2026-10-28T11:00:00Z"
          },
          {
            "id": "rep-loc2-1-3",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "รับทราบครับพี่โอม จะทำช่อง Pick-up Station แยกด้านข้างสำหรับไรเดอร์โดยเฉพาะครับ",
            "timestamp": "2026-10-28T11:15:00Z"
          },
          {
            "id": "rep-loc2-1-4",
            "authorId": "user-name-pkg",
            "author": "เนม",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "แถวสุขุมวิทลูกค้าชอบถือแก้วถ่ายรูป เนมเตรียมแก้วลายลิมิเต็ดกับถุงหิ้วผ้าร่ม VITCHA รับรองไวรัลใน IG แน่นอนค่ะ",
            "timestamp": "2026-10-28T11:30:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจพื้นที่ EmSphere ชั้น G",
        "user": "Mild",
        "userAvatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-28T10:00:00Z"
      }
    ],
    "updatedAt": "2026-10-28T11:30:00Z"
  },
  {
    "revision": 1,
    "id": "loc-sq1-siam",
    "type": "location",
    "country": "TH",
    "isMockup": true,
    "name": "Siam Square One ชั้น 1 ทางเชื่อม BTS สยาม",
    "foreignName": "Siam Square One 1st Fl. BTS Skywalk",
    "locationType": "สแตนด์อโลน / ริมถนน / อาคารพาณิชย์",
    "zoneOrFloor": "ชั้น 1 ประตูทางออกเชื่อมสะพานลอย BTS สยาม",
    "unitNumber": "SQ1-102",
    "location": {
      "lat": 13.7454,
      "lng": 100.5342,
      "addressText": "388 Rama I Rd, Pathum Wan, Bangkok 10330"
    },
    "spaceSpecs": {
      "usableAreaSqm": 14,
      "frontageWidthM": 3.2,
      "ceilingHeightM": 3,
      "layoutFormat": "inline",
      "electricalPower": "1 เฟส 30(100) A",
      "hasWaterInflow": true,
      "hasDrainage": true,
      "hasGreaseTrap": true,
      "riderAccessNotes": "จุดรับสินค้าสยามสแควร์ซอย 7 มีที่จอดมอเตอร์ไซค์รับงาน"
    },
    "leaseTerms": {
      "rentModel": "fixed",
      "monthlyRentThb": 120000,
      "depositMonths": 3,
      "leasePeriodYears": 1,
      "fitOutPeriodDays": 14,
      "contactPerson": "สำนักงานจัดการทรัพย์สินจุฬาฯ (PMCU)",
      "contactPhone": "02-218-3590",
      "contactLineWechat": "pmcu_commercial"
    },
    "ratings": {
      "footTraffic": 5,
      "visibility": 5,
      "accessibility": 5,
      "valueRoi": 5
    },
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "quickTags": [
      "คนเดินแน่น",
      "วัยรุ่นนักศึกษา",
      "ติดสถานีรถไฟฟ้า",
      "Takeawayคล่องตัว"
    ],
    "assignedTo": "ayai",
    "targetFollowUpDate": "2026-11-18",
    "handoffNotes": "ทำเลคนรุ่นใหม่ ทราฟฟิกหลักหมื่นคนต่อวัน เหมาะมากกับเมนูชานมสดและชาผลไม้สกัดสด",
    "handoffStage": "negotiate",
    "creator": {
      "id": "user-6ed8144d-a03f-438a-b78e-f4df23a6cadd",
      "name": "Zeen (สำรวจทำเลในไทย)",
      "alias": "Zeen",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-28T12:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-loc3-1",
        "authorId": "user-6ed8144d-a03f-438a-b78e-f4df23a6cadd",
        "author": "Zeen",
        "authorAvatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "ทำเลทองสยามสแควร์วัน ชั้น 1 ติดทางเชื่อม BTS สยาม กลุ่มนักเรียน นักศึกษา วัยรุ่นเดินผ่านทั้งวันนับหมื่นคน เหมาะมากกับการเปิดตัวเมนูชานมสดและชาผลไม้ปั่นราคานักเรียน 55-75 บาทค่ะ",
        "timestamp": "2026-10-28T12:20:00Z",
        "replies": [
          {
            "id": "rep-loc3-1-1",
            "authorId": "user-ice",
            "author": "SuperiCez",
            "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ตรงนี้ทำเลปราบเซียน ทราฟฟิกมหาศาลมาก ต้องทำระบบสั่งซื้อและสแกนจ่ายหน้าจออัตโนมัติเพื่อระบายคิว @Lek @เนม เตรียมเครื่องซีล FEST ตัวไวสุด 400 แก้ว/ชม. ลงที่นี่เลย",
            "timestamp": "2026-10-28T12:40:00Z"
          },
          {
            "id": "rep-loc3-1-2",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "รับทราบครับพี่ไอซ์ เดี๋ยวผมเซ็ตอัปเครื่องซีล RC-95 พร้อมระบบสำรองมอเตอร์ไว้ให้ทันทีครับ",
            "timestamp": "2026-10-28T12:55:00Z"
          },
          {
            "id": "rep-loc3-1-3",
            "authorId": "user-074ec1a3-c143-48ef-bf22-0c6afc11d4f8",
            "author": "น้องเมย์",
            "authorAvatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "สยามชอบเมนูสดชื่นและมีมุกเผือก มุกโมจิหนึบๆ เมย์เตรียมสูตรชานมมุกโมจิสดรอไว้แล้วค่ะ วัยรุ่นกรี๊ดแน่นอน!",
            "timestamp": "2026-10-28T13:10:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจพื้นที่ Siam Square One",
        "user": "Zeen",
        "userAvatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-28T12:00:00Z"
      }
    ],
    "updatedAt": "2026-10-28T13:10:00Z"
  },
  {
    "revision": 1,
    "id": "loc-commons-thonglor",
    "type": "location",
    "country": "TH",
    "isMockup": true,
    "name": "The Commons Thonglor (ทองหล่อ 17 คอมมูนิตี้มอลล์)",
    "foreignName": "The Commons Thonglor Soi 17",
    "locationType": "คอมมูนิตี้มอลล์",
    "zoneOrFloor": "ชั้น 1 โซน Market ใกล้ทางขึ้นบันไดใหญ่",
    "unitNumber": "TC-M04",
    "location": {
      "lat": 13.7342,
      "lng": 100.5824,
      "addressText": "335 Akkhara Phat Alley, Khlong Tan Nuea, Watthana, Bangkok 10110"
    },
    "spaceSpecs": {
      "usableAreaSqm": 20,
      "frontageWidthM": 4.2,
      "ceilingHeightM": 3.8,
      "layoutFormat": "island",
      "electricalPower": "3 เฟส 30 kVA",
      "hasWaterInflow": true,
      "hasDrainage": true,
      "hasGreaseTrap": true,
      "riderAccessNotes": "มีจุดรับส่งสินค้าหน้าโครงการ บรรยากาศร่มรื่น นั่งดื่มชิลล์ได้"
    },
    "leaseTerms": {
      "rentModel": "fixed",
      "monthlyRentThb": 110000,
      "depositMonths": 3,
      "leasePeriodYears": 2,
      "fitOutPeriodDays": 25,
      "contactPerson": "The Commons Leasing Team",
      "contactPhone": "02-712-7800",
      "contactLineWechat": "commons_leasing"
    },
    "ratings": {
      "footTraffic": 4,
      "visibility": 5,
      "accessibility": 4,
      "valueRoi": 5
    },
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "quickTags": [
      "คอมมูนิตี้มอลล์",
      "สายสุขภาพเฮลท์ตี้",
      "PetFriendly",
      "กำลังซื้อสูง"
    ],
    "assignedTo": "ayai",
    "targetFollowUpDate": "2026-11-20",
    "handoffNotes": "ทำเลสายไลฟ์สไตล์สุขภาพ เหมาะสำหรับเมนูชากลุ่มวิตามินบาร์และซูเปอร์ฟู้ด",
    "handoffStage": "negotiate",
    "creator": {
      "id": "user-80e9b44f-085e-4b9b-a341-9d07dab08b5c",
      "name": "Mild (สำรวจทำเลในไทย)",
      "alias": "Mild",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-28T14:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-loc4-1",
        "authorId": "user-80e9b44f-085e-4b9b-a341-9d07dab08b5c",
        "author": "Mild",
        "authorAvatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "The Commons ทองหล่อ บรรยากาศชิลล์ คอมมูนิตี้มอลล์อันดับหนึ่งของสายเฮลท์ตี้และคนรักสัตว์ ลูกค้าพาสัตว์เลี้ยงมานั่งดื่มชาได้ มีที่นั่งส่วนกลางกว้างขวาง",
        "timestamp": "2026-10-28T14:20:00Z",
        "replies": [
          {
            "id": "rep-loc4-1-1",
            "authorId": "user-1793177529069",
            "author": "MommySomO",
            "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ที่นี่เหมาะกับเมนู 'วิตามินบาร์ & ซูเปอร์ฟู้ด' ของ VITCHA มากๆ ตกแต่งร้านโทนไม้ธรรมชาติผสมสเตนเลสคลีนๆ จะเข้ากับมอลล์สุดๆ",
            "timestamp": "2026-10-28T14:40:00Z"
          },
          {
            "id": "rep-loc4-1-2",
            "authorId": "user-ayai-booth",
            "author": "ayai",
            "authorAvatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ผมจะดีไซน์เป็น Open-bar 360 องศา ให้ลูกค้ามองเห็นการสกัดชาสดจากเครื่อง Teaspresso ถ่ายรูปสตอรี่สวยแน่นอนครับ",
            "timestamp": "2026-10-28T15:00:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจพื้นที่ The Commons ทองหล่อ",
        "user": "Mild",
        "userAvatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-28T14:00:00Z"
      }
    ],
    "updatedAt": "2026-10-28T15:00:00Z"
  },
  {
    "revision": 1,
    "id": "loc-ptt-rama9-ev",
    "type": "location",
    "country": "TH",
    "isMockup": true,
    "name": "PTT Station พระราม 9 (Flagship EV Hub)",
    "foreignName": "PTT Station Rama IX EV Hub",
    "locationType": "ปั๊มน้ำมัน / จุดชาร์จ EV",
    "zoneOrFloor": "อาคารคอมเมอร์เชียลติดจุดชาร์จ EV",
    "unitNumber": "EV-01",
    "location": {
      "lat": 13.7542,
      "lng": 100.5714,
      "addressText": "Rama IX Rd, Huai Khwang, Bangkok 10310"
    },
    "spaceSpecs": {
      "usableAreaSqm": 25,
      "frontageWidthM": 5,
      "ceilingHeightM": 3.2,
      "layoutFormat": "corner",
      "electricalPower": "3 เฟส 50 kVA",
      "hasWaterInflow": true,
      "hasDrainage": true,
      "hasGreaseTrap": true,
      "riderAccessNotes": "ที่จอดรถหน้าร้านกว้างขวาง คนขับรถ EV นั่งรอชาร์จ 30-45 นาที"
    },
    "leaseTerms": {
      "rentModel": "fixed",
      "monthlyRentThb": 65000,
      "depositMonths": 3,
      "leasePeriodYears": 3,
      "fitOutPeriodDays": 30,
      "contactPerson": "ฝ่ายพื้นที่พาณิชย์ OR (ปตท.)",
      "contactPhone": "1365",
      "contactLineWechat": "or_commercial_space"
    },
    "ratings": {
      "footTraffic": 4,
      "visibility": 5,
      "accessibility": 5,
      "valueRoi": 5
    },
    "photos": {
      "storefrontAndAtmosphere": [
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80"
      ]
    },
    "quickTags": [
      "ปั๊มน้ำมันจุดชาร์จEV",
      "ที่จอดรถสะดวก",
      "มีท่อน้ำดีน้ำทิ้ง",
      "ค่าเช่าสมเหตุสมผล"
    ],
    "assignedTo": "Lek",
    "targetFollowUpDate": "2026-11-25",
    "handoffNotes": "เปิดรับลูกค้ารถยนต์ไฟฟ้าที่แวะชาร์จไฟ ค่าเช่า 65,000 คืนทุนไวมาก",
    "handoffStage": "rfq_sent",
    "creator": {
      "id": "user-6ed8144d-a03f-438a-b78e-f4df23a6cadd",
      "name": "Zeen (สำรวจทำเลในไทย)",
      "alias": "Zeen",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      "role": "admin",
      "timestamp": "2026-10-28T16:00:00Z"
    },
    "reviewerNotes": [
      {
        "id": "note-loc5-1",
        "authorId": "user-6ed8144d-a03f-438a-b78e-f4df23a6cadd",
        "author": "Zeen",
        "authorAvatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "authorRole": "admin",
        "text": "ทำเลปั๊มน้ำมันและจุดชาร์จรถยนต์ไฟฟ้า EV Station คนต้องจอดชาร์จแบตเตอรี่อย่างน้อย 30-45 นาที ระหว่างรอก็เดินมาซื้อเครื่องดื่มและนั่งพักผ่อน ยอดจับจ่ายสม่ำเสมอตลอดวันค่ะ",
        "timestamp": "2026-10-28T16:20:00Z",
        "replies": [
          {
            "id": "rep-loc5-1-1",
            "authorId": "user-05523ee4-203c-4ecb-8a79-abc02a2c533e",
            "author": "P.ตุ้ย",
            "authorAvatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "ค่าเช่า 65k สำหรับ 25 ตร.ม. บนถนนพระราม 9 ถือว่าถูกมาก มีที่จอดรถหน้าร้านให้คนแวะซื้อ Take-away ได้สะดวกด้วย",
            "timestamp": "2026-10-28T16:40:00Z"
          },
          {
            "id": "rep-loc5-1-2",
            "authorId": "user-d514853d-e30c-4ff2-b5a0-c4949d96588c",
            "author": "Lek",
            "authorAvatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "พื้นที่ 25 ตร.ม. กว้างขวาง วางตู้ทำน้ำแข็ง 150 กก. และบาร์สเตนเลสตัวเต็มได้สบายมากครับ งานระบบไฟ 3 เฟสในปั๊มนิ่งและเสถียรมาก",
            "timestamp": "2026-10-28T17:00:00Z"
          },
          {
            "id": "rep-loc5-1-3",
            "authorId": "user-name-pkg",
            "author": "เนม",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "authorRole": "admin",
            "text": "เตรียมแก้ว Double-wall เก็บความเย็น สำหรับคนขับรถเดินทางไกล น้ำแข็งไม่ละลายภายใน 6 ชม. ค่ะ",
            "timestamp": "2026-10-28T17:15:00Z"
          }
        ]
      }
    ],
    "history": [
      {
        "action": "สำรวจพื้นที่ PTT Station พระราม 9",
        "user": "Zeen",
        "userAvatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "timestamp": "2026-10-28T16:00:00Z"
      }
    ],
    "updatedAt": "2026-10-28T17:15:00Z"
  }
];

export const INITIAL_LEAD_LAB_ITEMS: LabItem[] = [
  {
    "id": "lab-1",
    "type": "drink",
    "code": "RD-TEA-01",
    "name": "ชาไทยพรีเมียมการันตี",
    "nameEn": "Signature Thai Roasted Tea",
    "category": "ชานมพรีเมียม & ชาสด",
    "status": "approved",
    "photoUrl": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
    "description": "เบลนด์ใบชาอัสสัมและชาซีลอนคั่วพิเศษ สกัดด้วยอุณหภูมิ 92°C นมสดพาสเจอร์ไรส์ หอมละมุนไม่ฝาดคอ รสชาติอันดับหนึ่งของคนจะเป็นหัวแถว",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (ไม่หวาน)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาล/สารให้ความหวาน",
        "baseLiquidMl": 180,
        "milkOrMixerMl": 60,
        "brix": 3.2,
        "caloriesKcal": 95,
        "tasteNotes": "สัมผัสรสชาคั่วเข้มข้น หอมกลิ่นชาแท้ ไร้น้ำตาล คลีนคอ ดื่มง่าย"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานน้อยละมุน)",
        "syrupMl": 15,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าวออร์แกนิก GI ต่ำ",
        "baseLiquidMl": 170,
        "milkOrMixerMl": 60,
        "brix": 8.5,
        "caloriesKcal": 165,
        "tasteNotes": "หวานละมุน นุ่มนวล กลมกล่อม ไม่แสบคอ ชูความหอมชาคั่วได้ดีที่สุด แนะนำอันดับ 1"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานปกติเข้มข้น)",
        "syrupMl": 30,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าวออร์แกนิก",
        "baseLiquidMl": 160,
        "milkOrMixerMl": 60,
        "brix": 13.8,
        "caloriesKcal": 235,
        "tasteNotes": "หวานจัดจ้าน สดชื่น กลมกล่อมเต็มคำ เหมาะกับคนชอบรสหวานมันดั้งเดิม"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 92,
      "extractionTimeSec": 240,
      "teaLeavesG": 12,
      "waterMl": 180,
      "shelfLifeHours": 6
    },
    "ingredients": [
      {
        "name": "ใบชาเบลนด์พิเศษ VITCHA",
        "quantity": 12,
        "unit": "g",
        "costThb": 6.5
      },
      {
        "name": "นมสดพาสเจอร์ไรส์ 100%",
        "quantity": 60,
        "unit": "ml",
        "costThb": 3.8
      },
      {
        "name": "นมข้นจืดสูตรพิเศษ",
        "quantity": 20,
        "unit": "ml",
        "costThb": 2.2
      },
      {
        "name": "น้ำเชื่อมดอกมะพร้าว (ค่าเฉลี่ย)",
        "quantity": 15,
        "unit": "ml",
        "costThb": 2
      }
    ],
    "costIngredientThb": 14.5,
    "costPackagingThb": 3.5,
    "costTotalThb": 18,
    "suggestedPriceThb": 55,
    "likedBy": [
      "user-ice",
      "user-beam",
      "user-ann"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: เคาะชนิดสารให้ความหวาน และแก้รสฝาดท้าย",
        "status": "closed",
        "createdAt": "2026-10-25T10:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-27T16:00:00Z",
        "closedBy": "SuperiCez",
        "summary": "ผลการทดสอบเคาะเปลี่ยนจากน้ำตาลทรายขาวเป็นน้ำเชื่อมดอกมะพร้าว GI ต่ำ รสชาติกลมกล่อมขึ้นอย่างเห็นได้ชัด และลดความฝาดใบชาลง 15% พร้อมเปิดรอบไฟนอล",
        "comments": [
          {
            "id": "comm-1-1",
            "authorId": "user-ann",
            "authorName": "คุณแอน (จัดซื้อ)",
            "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-25T11:30:00Z",
            "content": "หวาน 50% รสชาดียอดเยี่ยมมากค่ะ แต่ต้นทุนน้ำเชื่อมดอกมะพร้าวล็อตนี้ขวดละ 120 บาท เช็กซัพพลายเออร์ล็อต 50 กก. ได้ราคาลดเหลือ 85 บาทค่ะ",
            "sweetnessTarget": "50",
            "photoUrl": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
            "voiceUrl": "https://actions.google.com/sounds/v1/water/pouring_water.ogg",
            "duration": 8,
            "likes": [
              "user-ice"
            ]
          },
          {
            "id": "comm-1-2",
            "authorId": "user-beam",
            "authorName": "ช่างบีม (เทคนิค)",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-26T09:15:00Z",
            "content": "การสกัดที่ 92°C 240 วินาที ผ่านเครื่องสกัดชาแรงดันไอน้ำที่เลือกจากโรงงานจีน ได้สีและกลิ่นสม่ำเสมอทุกแก้วครับ",
            "sweetnessTarget": "all",
            "voiceUrl": "https://actions.google.com/sounds/v1/household/coffee_grinder.ogg",
            "duration": 12,
            "likes": [
              "user-ice",
              "user-ann"
            ]
          }
        ]
      },
      {
        "cycleNumber": 2,
        "title": "รอบที่ 2: ปรับความเย็นและการจับคู่กับแก้ว 22oz",
        "status": "active",
        "createdAt": "2026-10-27T16:30:00Z",
        "createdBy": "SuperiCez",
        "comments": [
          {
            "id": "comm-1-3",
            "authorId": "user-ice",
            "authorName": "SuperiCez",
            "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-28T14:00:00Z",
            "content": "สูตรนี้ลงตัว 100% แล้ว อนุมัติบรรจุเป็น Signature Menu ประจำร้าน VITCHA Siam Square One ได้เลยครับ เทสต์กลิ่นหอมชาคั่วเตะจมูกชัดเจน",
            "sweetnessTarget": "50",
            "photoUrl": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80",
            "likes": [
              "user-beam",
              "user-ann"
            ]
          }
        ]
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdByAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "createdAt": "2026-10-25T09:00:00Z",
    "updatedAt": "2026-10-28T14:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-2",
    "type": "drink",
    "code": "RD-VIT-01",
    "name": "วิตามินซ่า สปาร์คลิ้ง ซิตรัสซี",
    "nameEn": "Vitaminzaar Citrus-C Boost",
    "category": "วิตามิน & คราฟต์โซดา",
    "status": "approved",
    "photoUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
    "description": "โซดาคราฟต์สดผสมวิตามินซีธรรมชาติ 200% RDI สกัดจากส้มยูซุและส้มแมนดาริน เปรี้ยวซ่า ดับกระหายล้นพลัง",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (เพียวซ่าคีโต)",
        "syrupMl": 0,
        "sweetenerType": "สารสกัดหญ้าหวานสตีเวีย 0 แคลอรี",
        "baseLiquidMl": 190,
        "milkOrMixerMl": 0,
        "brix": 2.8,
        "caloriesKcal": 18,
        "tasteNotes": "เปรี้ยวซ่า ซี๊ดซาดสดชื่น ไร้น้ำตาลแท้ คีโตดื่มได้ทันที"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานน้อยน้ำผึ้ง)",
        "syrupMl": 12,
        "sweetenerType": "น้ำผึ้งดอกไม้ป่าแท้เดือนห้า",
        "baseLiquidMl": 180,
        "milkOrMixerMl": 0,
        "brix": 7.5,
        "caloriesKcal": 75,
        "tasteNotes": "เปรี้ยวอมหวาน หอมกลิ่นน้ำผึ้งธรรมชาติ สดชื่นกำลังดี แนะนำอันดับ 1"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานสดชื่นเต็มพลัง)",
        "syrupMl": 25,
        "sweetenerType": "น้ำผึ้งแท้ผสมไซรัปผลไม้สด",
        "baseLiquidMl": 170,
        "milkOrMixerMl": 0,
        "brix": 12.2,
        "caloriesKcal": 130,
        "tasteNotes": "หวานฉ่ำซ่า สไตล์โซดานำเข้า คลายร้อนสุดพลัง"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 4,
      "extractionTimeSec": 60,
      "teaLeavesG": 0,
      "waterMl": 200,
      "shelfLifeHours": 24
    },
    "ingredients": [
      {
        "name": "วิตามินซีพรีมิกซ์ ซิตรัสบูสต์",
        "quantity": 5,
        "unit": "g",
        "costThb": 5.5
      },
      {
        "name": "น้ำส้มยูซุแท้เข้มข้น",
        "quantity": 30,
        "unit": "ml",
        "costThb": 6
      },
      {
        "name": "คราฟต์โซดาอัดก๊าซสด 3.8 บาร์",
        "quantity": 180,
        "unit": "ml",
        "costThb": 2.5
      },
      {
        "name": "น้ำผึ้งป่าเดือนห้า",
        "quantity": 12,
        "unit": "ml",
        "costThb": 2
      }
    ],
    "costIngredientThb": 16,
    "costPackagingThb": 3.5,
    "costTotalThb": 19.5,
    "suggestedPriceThb": 65,
    "likedBy": [
      "user-ice",
      "user-ploy",
      "user-name-pkg"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: ปรับระดับแรงดันโซดาและการละลายผงวิตามิน",
        "status": "closed",
        "createdAt": "2026-10-24T14:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-26T18:00:00Z",
        "closedBy": "SuperiCez",
        "summary": "แก้ไขให้ละลายผงวิตามินด้วยน้ำอุ่น 15ml ก่อนเทลงโซดาเย็นจัด เพื่อป้องกันฟองฟู่ล้นแก้ว",
        "comments": [
          {
            "id": "comm-2-1",
            "authorId": "user-name-pkg",
            "authorName": "เนม (แพ็กเกจ)",
            "authorAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-25T13:00:00Z",
            "content": "ใช้แก้ว PET ทรงผอม 20oz ฝาโดมใส มองเห็นสีส้มทองและฟองคาร์บอเนตขึ้นสวยมากค่ะ",
            "sweetnessTarget": "all",
            "likes": [
              "user-ice"
            ]
          }
        ]
      },
      {
        "cycleNumber": 2,
        "title": "รอบที่ 2: ปรับสมดุลกลิ่นเปลือกส้มยูซุ",
        "status": "active",
        "createdAt": "2026-10-27T09:00:00Z",
        "createdBy": "SuperiCez",
        "comments": [
          {
            "id": "comm-2-2",
            "authorId": "user-ploy",
            "authorName": "พลอย (QC)",
            "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-28T10:00:00Z",
            "content": "หวาน 50% ได้คะแนน sensory test สูงสุด 9.4/10 ลูกค้าเทสต์ชื่นชอบมากค่ะ",
            "sweetnessTarget": "50",
            "likes": [
              "user-ice",
              "user-name-pkg"
            ]
          }
        ]
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-24T14:00:00Z",
    "updatedAt": "2026-10-28T10:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-3",
    "type": "drink",
    "code": "RD-JAS-02",
    "name": "ชามะลิหอมหมื่นลี้ นมสดสลิม",
    "nameEn": "Jasmine Blossom Fresh Milk",
    "category": "ชานมพรีเมียม & ชาสด",
    "status": "approved",
    "photoUrl": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    "description": "ยอดใบชาเขียวอบดอกมะลิสดซ้อน 7 ชั้น ผสมนมโคแท้ 100% ไขมันต่ำ บอดี้บางเบา นุ่มนวล ดื่มได้ทั้งวัน",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (กลิ่นดอกไม้คลีน)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาล",
        "baseLiquidMl": 180,
        "milkOrMixerMl": 60,
        "brix": 3,
        "caloriesKcal": 80,
        "tasteNotes": "กลิ่นมะลิฟุ้งละมุน สดชื่นเหมือนนั่งในสวนดอกไม้ คลีน ดื่มสบาย"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานน้อยชูมะลิ)",
        "syrupMl": 10,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าวเบาบาง",
        "baseLiquidMl": 175,
        "milkOrMixerMl": 60,
        "brix": 7,
        "caloriesKcal": 135,
        "tasteNotes": "หวานบางเบา ชูความหอมของดอกมะลิโดดเด่น ดื่มลื่นคอ"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานหอมนุ่ม)",
        "syrupMl": 20,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าว",
        "baseLiquidMl": 170,
        "milkOrMixerMl": 60,
        "brix": 11.5,
        "caloriesKcal": 190,
        "tasteNotes": "หวานหอม นุ่มคอ สำหรับสายชานมหวานปกติ"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 85,
      "extractionTimeSec": 180,
      "teaLeavesG": 10,
      "waterMl": 180,
      "shelfLifeHours": 8
    },
    "ingredients": [
      {
        "name": "ใบชามะลิ 7 ชั้นนำเข้า",
        "quantity": 10,
        "unit": "g",
        "costThb": 7.2
      },
      {
        "name": "นมโคสดพาสเจอร์ไรส์ไขมันต่ำ",
        "quantity": 60,
        "unit": "ml",
        "costThb": 4
      },
      {
        "name": "น้ำเชื่อมดอกมะพร้าว",
        "quantity": 10,
        "unit": "ml",
        "costThb": 1.5
      },
      {
        "name": "น้ำแข็งกรองเกล็ดหิมะ",
        "quantity": 180,
        "unit": "g",
        "costThb": 1
      }
    ],
    "costIngredientThb": 15.2,
    "costPackagingThb": 3.5,
    "costTotalThb": 18.7,
    "suggestedPriceThb": 60,
    "likedBy": [
      "user-ice",
      "user-ann"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: ควบคุมอุณหภูมิน้ำสกัดเพื่อไม่ให้มะลิขม",
        "status": "closed",
        "createdAt": "2026-10-25T14:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-27T12:00:00Z",
        "closedBy": "SuperiCez",
        "summary": "สรุปให้ใช้อุณหภูมิ 85°C ไม่เกิน 180 วินาที ได้กลิ่นหอมดอกไม้ที่ดีที่สุดและรสไม่ฝาด",
        "comments": []
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-25T14:00:00Z",
    "updatedAt": "2026-10-27T12:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-4",
    "type": "drink",
    "code": "RD-CHEESE-01",
    "name": "ชาสตรอว์เบอร์รี คลาวด์ชีส",
    "nameEn": "Strawberry Velvet Cheese Foam",
    "category": "ชาผลไม้ & ชีสโฟม",
    "status": "approved",
    "photoUrl": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=80",
    "description": "ชาอู่หลงผลไม้สกัดสด ปั่นกับสตรอว์เบอร์รีสด ท็อปด้วยโฟมครีมชีสแท้นำเข้าจากนิวซีแลนด์ โรยเกลือชมพูหิมาลายัน",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (เปรี้ยวธรรมชาติชีสนัว)",
        "syrupMl": 0,
        "sweetenerType": "ความหวานจากสตรอว์เบอร์รีธรรมชาติ",
        "baseLiquidMl": 180,
        "milkOrMixerMl": 60,
        "brix": 5.2,
        "caloriesKcal": 185,
        "tasteNotes": "เปรี้ยวอมเค็มนัว ตัดความสดชื่นของเนื้อสตรอว์เบอร์รีแท้ ไร้สารให้ความหวานสังเคราะห์"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานอมเปรี้ยวชีสลงตัว)",
        "syrupMl": 15,
        "sweetenerType": "ไซรัปผลไม้สตรอว์เบอร์รีเคี่ยวสด",
        "baseLiquidMl": 170,
        "milkOrMixerMl": 60,
        "brix": 9.8,
        "caloriesKcal": 245,
        "tasteNotes": "ความหวานกำลังพอดี ผสานครีมชีสเค็มนุ่มละมุนลิ้นลงตัวที่สุด"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานฉ่ำฟีลของหวาน)",
        "syrupMl": 28,
        "sweetenerType": "ไซรัปสตรอว์เบอร์รีสูตรเข้มข้น",
        "baseLiquidMl": 160,
        "milkOrMixerMl": 60,
        "brix": 14.5,
        "caloriesKcal": 310,
        "tasteNotes": "หวานฉ่ำเต็มคำ ฟีลทานของหวานพรีเมียมในแก้วน้ำ"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 90,
      "extractionTimeSec": 200,
      "teaLeavesG": 12,
      "waterMl": 180,
      "shelfLifeHours": 6
    },
    "ingredients": [
      {
        "name": "สตรอว์เบอร์รีสดเกาหลีแช่แข็ง",
        "quantity": 60,
        "unit": "g",
        "costThb": 10.5
      },
      {
        "name": "ชาเขียวมะลิผลไม้สกัด",
        "quantity": 150,
        "unit": "ml",
        "costThb": 4.5
      },
      {
        "name": "ครีมชีสโฟมนิวซีแลนด์",
        "quantity": 50,
        "unit": "ml",
        "costThb": 5.5
      },
      {
        "name": "เกลือชมพูหิมาลายัน",
        "quantity": 0.5,
        "unit": "g",
        "costThb": 0.5
      }
    ],
    "costIngredientThb": 22.5,
    "costPackagingThb": 4,
    "costTotalThb": 26.5,
    "suggestedPriceThb": 85,
    "likedBy": [
      "user-ice",
      "user-beam",
      "user-ploy",
      "user-name-pkg"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: ตีครีมชีสให้คงตัวได้นานกว่า 45 นาที",
        "status": "closed",
        "createdAt": "2026-10-23T11:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-25T17:00:00Z",
        "closedBy": "SuperiCez",
        "summary": "ปรับอัตราส่วนครีมชีส 60% : วิปครีม 35% : นมสด 5% ให้เนื้อแน่นเนียน ไม่จมลงก้นแก้ว",
        "comments": []
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-23T11:00:00Z",
    "updatedAt": "2026-10-25T17:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-5",
    "type": "drink",
    "code": "RD-MATCHA-01",
    "name": "อูจิมัทฉะ ลาเต้ คลาวด์",
    "nameEn": "Ceremonial Uji Matcha Latte",
    "category": "มัทฉะ & สเปเชียลตี้",
    "status": "testing",
    "photoUrl": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
    "description": "มัทฉะเกรดพิธีการเมืองอูจิ เกียวโต ตีสดช็อตต่อช็อตด้วยฉะเซ็น ผสมนมสดข้าวโอ๊ตออร์แกนิก",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (อูมามิแท้ ไร้หวาน)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาล",
        "baseLiquidMl": 60,
        "milkOrMixerMl": 160,
        "brix": 2.5,
        "caloriesKcal": 110,
        "tasteNotes": "อูมามิเข้มข้น หอมสาหร่ายและถั่วคั่ว ชัดเจนสายมัทฉะแท้"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานนุ่มละมุน)",
        "syrupMl": 10,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าวใส",
        "baseLiquidMl": 60,
        "milkOrMixerMl": 150,
        "brix": 6.8,
        "caloriesKcal": 160,
        "tasteNotes": "หวานนุ่มช่วยดึงรสชาติชาเขียวให้ละมุน ดื่มง่ายขึ้นมาก"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานมันสไตล์คาเฟ่)",
        "syrupMl": 20,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าว",
        "baseLiquidMl": 60,
        "milkOrMixerMl": 140,
        "brix": 11,
        "caloriesKcal": 215,
        "tasteNotes": "หวานมันเข้มข้น สไตล์มัทฉะลาเต้คาเฟ่ญี่ปุ่นดั้งเดิม"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 80,
      "extractionTimeSec": 90,
      "teaLeavesG": 5,
      "waterMl": 60,
      "shelfLifeHours": 2
    },
    "ingredients": [
      {
        "name": "ผงอูจิมัทฉะ เกรดพิธีการ",
        "quantity": 5,
        "unit": "g",
        "costThb": 18
      },
      {
        "name": "นมข้าวโอ๊ตบาริสต้าเกรด",
        "quantity": 150,
        "unit": "ml",
        "costThb": 7
      },
      {
        "name": "น้ำเชื่อมดอกมะพร้าว",
        "quantity": 10,
        "unit": "ml",
        "costThb": 1.5
      }
    ],
    "costIngredientThb": 28,
    "costPackagingThb": 3.5,
    "costTotalThb": 31.5,
    "suggestedPriceThb": 95,
    "likedBy": [
      "user-ice",
      "user-ploy"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: เปรียบเทียบความนัวระหว่าง นมวัวพาสเจอร์ไรส์ vs นมโอ๊ต",
        "status": "active",
        "createdAt": "2026-10-26T14:00:00Z",
        "createdBy": "SuperiCez",
        "comments": [
          {
            "id": "comm-5-1",
            "authorId": "user-ploy",
            "authorName": "พลอย (QC)",
            "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-27T10:15:00Z",
            "content": "นมโอ๊ตบาริสต้าดึงกลิ่นถั่วของมัทฉะเกรดอูจิออกมาได้มิติรสสัมผัสที่ดีกว่านมวัวอย่างชัดเจนค่ะ แนะนำตัวนี้",
            "sweetnessTarget": "50",
            "likes": [
              "user-ice"
            ]
          }
        ]
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-26T14:00:00Z",
    "updatedAt": "2026-10-27T10:15:00Z",
    "isMock": true
  },
  {
    "id": "lab-6",
    "type": "drink",
    "code": "RD-YUZU-03",
    "name": "สปาร์คลิ้ง ยูซุ ไนโตรคราฟต์",
    "nameEn": "Sparkling Yuzu Nitro Fizz",
    "category": "วิตามิน & คราฟต์โซดา",
    "status": "testing",
    "photoUrl": "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&auto=format&fit=crop&q=80",
    "description": "น้ำส้มยูซุแท้เมืองโคจิ อัดฟองก๊าซไนโตรเจนละเอียด คลื่นฟองนุ่มละมุน ผสมวิตามิน B-Complex",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (เปรี้ยวคมซ่าละมุน)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาล",
        "baseLiquidMl": 200,
        "milkOrMixerMl": 0,
        "brix": 3.5,
        "caloriesKcal": 25,
        "tasteNotes": "เปรี้ยวคมชัดเจน ซ่าฟองละเอียดนุ่มลิ้นด้วยฟองไนโตร"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (เปรี้ยวหวานกลมกล่อม)",
        "syrupMl": 12,
        "sweetenerType": "น้ำผึ้งป่าแท้",
        "baseLiquidMl": 190,
        "milkOrMixerMl": 0,
        "brix": 8,
        "caloriesKcal": 85,
        "tasteNotes": "เปรี้ยวหวานสดชื่น มีกลิ่นเปลือกส้มยูซุชัดเจน สดชื่นกระปรี้กระเปร่า"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานฉ่ำซ่า)",
        "syrupMl": 22,
        "sweetenerType": "น้ำผึ้งและไซรัปยูซุ",
        "baseLiquidMl": 180,
        "milkOrMixerMl": 0,
        "brix": 12.8,
        "caloriesKcal": 145,
        "tasteNotes": "หวานอมเปรี้ยว ซ่าสะใจ คลายเหนื่อยล้าทันตา"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 3,
      "extractionTimeSec": 45,
      "teaLeavesG": 0,
      "waterMl": 200,
      "shelfLifeHours": 24
    },
    "ingredients": [
      {
        "name": "น้ำส้มยูซุแท้ 100% ญี่ปุ่น",
        "quantity": 35,
        "unit": "ml",
        "costThb": 12
      },
      {
        "name": "วิตามินบีรวมพรีมิกซ์",
        "quantity": 2,
        "unit": "g",
        "costThb": 4
      },
      {
        "name": "โซดาไนโตรเจนสด",
        "quantity": 180,
        "unit": "ml",
        "costThb": 3.5
      }
    ],
    "costIngredientThb": 21,
    "costPackagingThb": 4,
    "costTotalThb": 25,
    "suggestedPriceThb": 79,
    "likedBy": [
      "user-ice",
      "user-beam"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: ทดสอบความคงตัวของฟองไนโตรในแก้วกลับบ้าน",
        "status": "active",
        "createdAt": "2026-10-27T15:00:00Z",
        "createdBy": "SuperiCez",
        "comments": []
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-27T15:00:00Z",
    "updatedAt": "2026-10-27T15:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-7",
    "type": "drink",
    "code": "RD-OOLONG-04",
    "name": "ชาอู่หลงทิกวนอิม สกัดเย็น 0-Cal",
    "nameEn": "Tieguanyin Cold Brew Zero",
    "category": "ชานมพรีเมียม & ชาสด",
    "status": "testing",
    "photoUrl": "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&auto=format&fit=crop&q=80",
    "description": "ชาอู่หลงทิกวนอิมคั่วระดับกลาง แช่สกัดเย็น 16 ชั่วโมง กลิ่นดอกกล้วยไม้ป่า คลีน ดื่มดับกระหายไม่มีแคลอรี",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (เพียวชา 0 แคล)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาล 100%",
        "baseLiquidMl": 220,
        "milkOrMixerMl": 0,
        "brix": 1.2,
        "caloriesKcal": 0,
        "tasteNotes": "หอมกลิ่นดอกกล้วยไม้ป่า รสชาลึก ชุ่มคอยาวนาน ไร้น้ำตาล 100% ตัวจริงสายสุขภาพ"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานติดปลายลิ้น)",
        "syrupMl": 8,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าวใสบาง",
        "baseLiquidMl": 210,
        "milkOrMixerMl": 0,
        "brix": 5.5,
        "caloriesKcal": 40,
        "tasteNotes": "หวานติดปลายลิ้นนิดๆ ไม่กลบกลิ่นหอมของใบชาสกัดเย็น"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานชื่นใจ)",
        "syrupMl": 16,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าว",
        "baseLiquidMl": 200,
        "milkOrMixerMl": 0,
        "brix": 9.8,
        "caloriesKcal": 80,
        "tasteNotes": "หวานชุ่มคอสดชื่น"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 4,
      "extractionTimeSec": 57600,
      "teaLeavesG": 15,
      "waterMl": 250,
      "shelfLifeHours": 48
    },
    "ingredients": [
      {
        "name": "ใบชาอู่หลงทิกวนอิมคั่วกลาง",
        "quantity": 15,
        "unit": "g",
        "costThb": 8.5
      },
      {
        "name": "น้ำแร่บริสุทธิ์สกัดเย็น",
        "quantity": 250,
        "unit": "ml",
        "costThb": 2
      }
    ],
    "costIngredientThb": 11.5,
    "costPackagingThb": 3.5,
    "costTotalThb": 15,
    "suggestedPriceThb": 50,
    "likedBy": [
      "user-ice",
      "user-ann"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: กำหนดรอบเวลาสกัดเย็น 12 ชม. vs 16 ชม.",
        "status": "active",
        "createdAt": "2026-10-27T17:00:00Z",
        "createdBy": "SuperiCez",
        "comments": []
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-27T17:00:00Z",
    "updatedAt": "2026-10-27T17:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-8",
    "type": "drink",
    "code": "RD-COCOA-01",
    "name": "ดาร์กโกโก้ ดับเบิลช็อกโกแลต",
    "nameEn": "Midnight Dark Cocoa 72%",
    "category": "ชานมพรีเมียม & ชาสด",
    "status": "testing",
    "photoUrl": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80",
    "description": "ผงโกโก้พรีเมียมนำเข้าจากฝรั่งเศส ความเข้ม 72% ผสมนมสดพาสเจอร์ไรส์ ดาร์กสะใจ ไม่หวานเลี่ยน",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (ขมเข้มดาร์กแท้)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาล",
        "baseLiquidMl": 80,
        "milkOrMixerMl": 140,
        "brix": 4,
        "caloriesKcal": 140,
        "tasteNotes": "เข้มขมลึกถึงใจ สัมผัสโกโก้แท้ ไร้ความหวาน สายดาร์กต้องชอบ"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานพอดีตัดขม)",
        "syrupMl": 15,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าวเข้มข้น",
        "baseLiquidMl": 80,
        "milkOrMixerMl": 130,
        "brix": 8.5,
        "caloriesKcal": 210,
        "tasteNotes": "หวานพอดีตัดขมโกโก้ ได้ความละมุนช็อกโกแลตนมอย่างลงตัว แนะนำ"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานมันเข้มข้น)",
        "syrupMl": 30,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าว",
        "baseLiquidMl": 80,
        "milkOrMixerMl": 120,
        "brix": 13.5,
        "caloriesKcal": 285,
        "tasteNotes": "หวานมันเข้มข้น สไตล์โกโก้หน้าร้านคาเฟ่ยอดนิยม"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 90,
      "extractionTimeSec": 120,
      "teaLeavesG": 0,
      "waterMl": 60,
      "shelfLifeHours": 8
    },
    "ingredients": [
      {
        "name": "ผงดาร์กโกโก้ฝรั่งเศส 72%",
        "quantity": 25,
        "unit": "g",
        "costThb": 9.5
      },
      {
        "name": "นมสดพาสเจอร์ไรส์เต็มมันเนย",
        "quantity": 140,
        "unit": "ml",
        "costThb": 6
      },
      {
        "name": "น้ำเชื่อมดอกมะพร้าว",
        "quantity": 15,
        "unit": "ml",
        "costThb": 2
      }
    ],
    "costIngredientThb": 17.5,
    "costPackagingThb": 3.5,
    "costTotalThb": 21,
    "suggestedPriceThb": 65,
    "likedBy": [
      "user-ice",
      "user-name-pkg"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: เทสต์การละลายของผงโกโก้ไม่ให้เป็นก้อน",
        "status": "active",
        "createdAt": "2026-10-26T16:00:00Z",
        "createdBy": "SuperiCez",
        "comments": []
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-26T16:00:00Z",
    "updatedAt": "2026-10-26T16:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-9",
    "type": "topping",
    "code": "RD-TOP-BOBA01",
    "name": "ไข่มุกบราวน์ชูก้าร์เตาถ่าน",
    "nameEn": "Brown Sugar Lava Boba",
    "category": "ท็อปปิ้ง & เจลลี่",
    "status": "approved",
    "photoUrl": "https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&auto=format&fit=crop&q=80",
    "description": "ไข่มุกแป้งมันสำปะหลังธรรมชาติ เคี่ยวกับน้ำตาลทรายแดงโอกินาว่าด้วยเตาถ่าน 2 ชั่วโมง เหนียวหนึบ หอมกลิ่นไหม้อ่อนๆ",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (ล้างซอส)",
        "syrupMl": 0,
        "sweetenerType": "เนื้อไข่มุกเปล่า",
        "baseLiquidMl": 0,
        "milkOrMixerMl": 0,
        "brix": 15,
        "caloriesKcal": 85,
        "tasteNotes": "ความหวานจากเนื้อไข่มุกธรรมชาติ หนึบกำลังดี"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (คลุกซอสบาง)",
        "syrupMl": 5,
        "sweetenerType": "ซอสบราวน์ชูก้าร์เตาถ่าน",
        "baseLiquidMl": 0,
        "milkOrMixerMl": 0,
        "brix": 20,
        "caloriesKcal": 120,
        "tasteNotes": "เคลือบซอสบราวน์ชูก้าร์ฉ่ำ อุ่นละมุน กลิ่นไหม้หอมกรุ่น"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (ฉ่ำลายเสือลาวา)",
        "syrupMl": 12,
        "sweetenerType": "ซอสบราวน์ชูก้าร์เข้มข้นพิเศษ",
        "baseLiquidMl": 0,
        "milkOrMixerMl": 0,
        "brix": 26,
        "caloriesKcal": 165,
        "tasteNotes": "ฉ่ำซอสเยิ้มลายเสือ หวานหอมกลิ่นน้ำตาลไหม้เต็มเหนี่ยว"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 98,
      "extractionTimeSec": 1800,
      "teaLeavesG": 0,
      "waterMl": 1000,
      "shelfLifeHours": 4
    },
    "ingredients": [
      {
        "name": "เม็ดไข่มุกมันสำปะหลัง",
        "quantity": 50,
        "unit": "g",
        "costThb": 2.2
      },
      {
        "name": "น้ำตาลทรายแดงเคี่ยวเตาถ่าน",
        "quantity": 20,
        "unit": "g",
        "costThb": 2
      }
    ],
    "costIngredientThb": 4.2,
    "costPackagingThb": 0.5,
    "costTotalThb": 4.7,
    "suggestedPriceThb": 15,
    "likedBy": [
      "user-ice",
      "user-beam",
      "user-ann",
      "user-ploy"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: ควบคุมอายุความหนึบในหม้ออุ่นบราวน์ชูก้าร์",
        "status": "closed",
        "createdAt": "2026-10-24T10:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-26T14:00:00Z",
        "closedBy": "SuperiCez",
        "summary": "กำหนดอุณหภูมิหม้ออุ่นไฟฟ้าที่ 65°C ไข่มุกจะคงความหนึบได้ 4 ชม. ไม่เละหรือเป็นไต",
        "comments": []
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-24T10:00:00Z",
    "updatedAt": "2026-10-26T14:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-10",
    "type": "topping",
    "code": "RD-TOP-CRYSTAL",
    "name": "ไข่มุกบุกคริสตัลรสพีช",
    "nameEn": "Peach Crystal Konjac Boba",
    "category": "ท็อปปิ้ง & เจลลี่",
    "status": "approved",
    "photoUrl": "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&auto=format&fit=crop&q=80",
    "description": "เม็ดบุกใสจากพืช แคลอรีต่ำ เคี้ยวกรุบกรอบ หอมกลิ่นพีชขาว แช่ในน้ำแร่บริสุทธิ์ ไม่ใช้วัตถุกันเสีย",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (ล้างน้ำเชื่อมคลีน)",
        "syrupMl": 0,
        "sweetenerType": "บุกสดแช่น้ำแร่",
        "baseLiquidMl": 0,
        "milkOrMixerMl": 0,
        "brix": 4.5,
        "caloriesKcal": 25,
        "tasteNotes": "กรุบกรอบ เคี้ยวเพลิน ไร้น้ำตาลแฝง แคลอรีต่ำมาก ตัวเลือกเพื่อสุขภาพ"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (แช่น้ำผึ้งพีช)",
        "syrupMl": 3,
        "sweetenerType": "น้ำเชื่อมพีชขาวธรรมชาติ",
        "baseLiquidMl": 0,
        "milkOrMixerMl": 0,
        "brix": 8,
        "caloriesKcal": 45,
        "tasteNotes": "หวานหอมพีชอ่อนๆ เข้ากันได้ดีกับชาผลไม้และชาใส"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานฉ่ำพีช)",
        "syrupMl": 8,
        "sweetenerType": "น้ำเชื่อมพีชเข้มข้น",
        "baseLiquidMl": 0,
        "milkOrMixerMl": 0,
        "brix": 12,
        "caloriesKcal": 70,
        "tasteNotes": "หวานฉ่ำพีชสดชื่น เคี้ยวสนุก"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 4,
      "extractionTimeSec": 0,
      "teaLeavesG": 0,
      "waterMl": 0,
      "shelfLifeHours": 72
    },
    "ingredients": [
      {
        "name": "บุกคริสตัลพรีเมียมจากพืช",
        "quantity": 45,
        "unit": "g",
        "costThb": 3.8
      },
      {
        "name": "สารสกัดพีชขาวธรรมชาติ",
        "quantity": 5,
        "unit": "ml",
        "costThb": 1.7
      }
    ],
    "costIngredientThb": 5.5,
    "costPackagingThb": 0.5,
    "costTotalThb": 6,
    "suggestedPriceThb": 15,
    "likedBy": [
      "user-ice",
      "user-ann",
      "user-ploy"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: ทดสอบขนาดเม็ดบุกให้ดูดผ่านหลอด 12mm ได้ลื่น",
        "status": "closed",
        "createdAt": "2026-10-25T11:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-26T16:00:00Z",
        "closedBy": "SuperiCez",
        "summary": "ขนาดเม็ด 10mm ดูดผ่านหลอดไข่มุกมาตรฐานได้ราบรื่น ไม่มีติดขัด",
        "comments": []
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-25T11:00:00Z",
    "updatedAt": "2026-10-26T16:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-11",
    "type": "drink",
    "code": "RD-DURIAN-01",
    "name": "ทุเรียนภูเขาไฟ ลาวาคลาวด์",
    "nameEn": "Durian Volcano Lava Milk",
    "category": "ชานมพรีเมียม & ชาสด",
    "status": "shelved",
    "photoUrl": "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80",
    "description": "[พักสูตร] ชานมผสมเนื้อทุเรียนหมอนทองบดสด และโฟมวิปทุเรียนทอง รสชาติเข้มข้นแต่กลิ่นแรงกระทบร้าน",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (ทุเรียนเพียวเข้มข้น)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาลเพิ่ม",
        "baseLiquidMl": 100,
        "milkOrMixerMl": 100,
        "brix": 9,
        "caloriesKcal": 220,
        "tasteNotes": "กลิ่นทุเรียนเข้มข้นจัดจ้าน มันนัวตามธรรมชาติ"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานมันเข้มข้น)",
        "syrupMl": 15,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าว",
        "baseLiquidMl": 100,
        "milkOrMixerMl": 90,
        "brix": 14.5,
        "caloriesKcal": 310,
        "tasteNotes": "หวานมันเข้มข้น หอมทุเรียนตลบอบอวล"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานจัดหนักมาก)",
        "syrupMl": 30,
        "sweetenerType": "น้ำเชื่อมดอกมะพร้าว",
        "baseLiquidMl": 100,
        "milkOrMixerMl": 80,
        "brix": 19.5,
        "caloriesKcal": 420,
        "tasteNotes": "หวานจัดและหนักมาก เลี่ยนคอ ดื่มไม่หมดแก้ว"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 90,
      "extractionTimeSec": 180,
      "teaLeavesG": 10,
      "waterMl": 120,
      "shelfLifeHours": 2
    },
    "ingredients": [
      {
        "name": "เนื้อทุเรียนหมอนทองแท้",
        "quantity": 60,
        "unit": "g",
        "costThb": 28
      },
      {
        "name": "นมสดพาสเจอร์ไรส์",
        "quantity": 100,
        "unit": "ml",
        "costThb": 6
      },
      {
        "name": "ชาอัสสัมสกัดเข้มข้น",
        "quantity": 80,
        "unit": "ml",
        "costThb": 4
      }
    ],
    "costIngredientThb": 38,
    "costPackagingThb": 4,
    "costTotalThb": 42,
    "suggestedPriceThb": 120,
    "likedBy": [
      "user-ice"
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: วิเคราะห์ต้นทุนและกลิ่นตกค้างในร้าน",
        "status": "closed",
        "createdAt": "2026-10-22T10:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-24T18:00:00Z",
        "closedBy": "SuperiCez",
        "summary": "สั่งพักสูตรไว้ก่อน (Shelved): เนื่องจาก 1) กลิ่นทุเรียนติดเครื่องปั่นและเคาน์เตอร์กระทบกับเมนูชาอื่นๆ 2) ต้นทุนเนื้อทุเรียนแท้ผันผวนตามฤดูกาลสูงเกินไป ส่งผลให้ GP ต่ำกว่า 50% เก็บสูตรไว้เป็น R&D Archive",
        "comments": [
          {
            "id": "comm-11-1",
            "authorId": "user-ann",
            "authorName": "คุณแอน (จัดซื้อ)",
            "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-23T14:00:00Z",
            "content": "ต้นทุนเนื้อทุเรียนหมอนทองช่วงนอกฤดูพุ่งขึ้นถึง กก. ละ 550 บาท ทำให้ต้นทุนต่อแก้วแตะ 42 บาท ควบคุมกำไรยากมากค่ะ",
            "sweetnessTarget": "all",
            "likes": [
              "user-ice"
            ]
          }
        ]
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-22T10:00:00Z",
    "updatedAt": "2026-10-24T18:00:00Z",
    "isMock": true
  },
  {
    "id": "lab-12",
    "type": "drink",
    "code": "RD-CHILI-01",
    "name": "พริกเกลือ สปาร์คลิ้ง ช็อต",
    "nameEn": "Spicy Plum Chili Fizz",
    "category": "วิตามิน & คราฟต์โซดา",
    "status": "shelved",
    "photoUrl": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80",
    "description": "[พักสูตร] บ๊วยดองโซดาผสมสารสกัดพริกขี้หนูสวนและเกลือสมุทร ขอบแก้วโรยผงพริกเกลือ",
    "sweetnessLevels": {
      "zero": {
        "level": "0",
        "label": "หวาน 0% (เผ็ดเค็มแหลม)",
        "syrupMl": 0,
        "sweetenerType": "ไม่ใส่น้ำตาล",
        "baseLiquidMl": 200,
        "milkOrMixerMl": 0,
        "brix": 4,
        "caloriesKcal": 30,
        "tasteNotes": "เปรี้ยวเค็มเผ็ดแหลมแทงคอ ดื่มยากมาก"
      },
      "half": {
        "level": "50",
        "label": "หวาน 50% (หวานอมเปรี้ยวเค็ม)",
        "syrupMl": 15,
        "sweetenerType": "น้ำเชื่อมบ๊วยดอง",
        "baseLiquidMl": 190,
        "milkOrMixerMl": 0,
        "brix": 10.5,
        "caloriesKcal": 95,
        "tasteNotes": "หวานอมเปรี้ยวเค็ม แต่ความเผ็ดยังค้างที่ลำคอ แสบคอเล็กน้อย"
      },
      "full": {
        "level": "100",
        "label": "หวาน 100% (หวานปนเผ็ด)",
        "syrupMl": 25,
        "sweetenerType": "น้ำเชื่อมบ๊วย",
        "baseLiquidMl": 180,
        "milkOrMixerMl": 0,
        "brix": 15,
        "caloriesKcal": 150,
        "tasteNotes": "หวานปนเผ็ด ไม่กลมกลืน ดื่มไม่เข้ากัน"
      }
    },
    "technicalSpecs": {
      "brewingTempC": 4,
      "extractionTimeSec": 60,
      "teaLeavesG": 0,
      "waterMl": 200,
      "shelfLifeHours": 12
    },
    "ingredients": [
      {
        "name": "น้ำบ๊วยดองโบราณ",
        "quantity": 30,
        "unit": "ml",
        "costThb": 4.5
      },
      {
        "name": "สารสกัดพริกขี้หนูสวน",
        "quantity": 1,
        "unit": "ml",
        "costThb": 2.5
      },
      {
        "name": "โซดาคราฟต์สด",
        "quantity": 180,
        "unit": "ml",
        "costThb": 2.5
      },
      {
        "name": "ผงพริกเกลือขอบแก้ว",
        "quantity": 5,
        "unit": "g",
        "costThb": 1.5
      }
    ],
    "costIngredientThb": 11,
    "costPackagingThb": 3.5,
    "costTotalThb": 14.5,
    "suggestedPriceThb": 55,
    "likedBy": [],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบที่ 1: ทดสอบ Sensory Test ความชอบของกลุ่มลูกค้าทั่วไป",
        "status": "closed",
        "createdAt": "2026-10-21T13:00:00Z",
        "createdBy": "SuperiCez",
        "closedAt": "2026-10-23T17:00:00Z",
        "closedBy": "Ploy (QC)",
        "summary": "สั่งพักสูตร (Shelved): ผลเทสต์ 80% แจ้งว่ารสชาติแปลกเกินไป ความซ่าของโซดาขับให้ความเผ็ดของพริกแสบคอ ดื่มไม่หมดแก้ว ไม่เหมาะสำหรับบรรจุเป็นเมนูแฟรนไชส์หลัก ยุติการพัฒนา",
        "comments": [
          {
            "id": "comm-12-1",
            "authorId": "user-ploy",
            "authorName": "พลอย (QC)",
            "authorAvatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-22T15:30:00Z",
            "content": "ลูกค้ากลุ่มตัวอย่าง 16 จาก 20 ท่าน ดื่มได้เพียงครึ่งแก้วค่ะ เนื่องจากก๊าซคาร์บอนิกทำให้รู้สึกแสบระคายคอเกินไป",
            "sweetnessTarget": "all",
            "likes": [
              "user-ann"
            ]
          }
        ]
      }
    ],
    "createdById": "user-ice",
    "createdByName": "SuperiCez",
    "createdAt": "2026-10-21T13:00:00Z",
    "updatedAt": "2026-10-23T17:00:00Z",
    "isMock": true
  }
];

export const INITIAL_FRANCHISE_STORES: FranchiseStore[] = [
  {
    "id": "store-vitcha",
    "name": "VITCHA",
    "brandTagline": "ชานมสดและชาพรีเมียมของคนที่จะเป็นหัวแถว",
    "branch": "สาขา Siam Square One (Flagship ชั้น 1)",
    "themeColor": "emerald",
    "logoUrl": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80",
    "contactNumber": "02-123-4567",
    "openingHours": "10:00 - 21:30 น. (เปิดทุกวัน)",
    "menuCategories": [
      "ชานมพรีเมียม & ชาสด",
      "ชาผลไม้สด & คลาวด์ชีส",
      "มัทฉะ & สเปเชียลตี้",
      "ท็อปปิ้งซิกเนเจอร์"
    ],
    "likedBy": [
      "user-ice",
      "user-beam",
      "user-ann"
    ],
    "viewLogs": [
      {
        "userId": "user-ice",
        "name": "SuperiCez",
        "alias": "SuperiCez",
        "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        "role": "admin",
        "lastViewedAt": "2026-10-30T09:45:00Z",
        "viewCount": 28
      },
      {
        "userId": "user-beam",
        "name": "คุณบีม (QC)",
        "alias": "คุณบีม (QC)",
        "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
        "role": "editor",
        "lastViewedAt": "2026-10-30T08:12:00Z",
        "viewCount": 14
      }
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบเปิดตัว Flagship Siam Square One & บอร์ดเมนู Q4",
        "status": "active",
        "createdAt": "2026-10-27T10:00:00Z",
        "createdBy": "SuperiCez",
        "comments": [
          {
            "id": "comm-store-v-1",
            "authorId": "user-ice",
            "authorName": "SuperiCez (Owner)",
            "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-28T14:20:00Z",
            "content": "บอร์ดเมนูหน้าร้าน Siam Square One จัดวางสวยงามมากครับ ชาไทยพรีเมียมตัวชูโรงยอดขายทดสอบวันแรกสูงถึง 120 แก้ว",
            "sweetnessTarget": "50",
            "photoUrl": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
            "likes": [
              "user-beam",
              "user-ann"
            ]
          },
          {
            "id": "comm-store-v-2",
            "authorId": "user-beam",
            "authorName": "คุณบีม (QC)",
            "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-29T11:00:00Z",
            "content": "สูตรชงด่วน Quick SOP ที่หน้าบาร์ บาริสต้าหยิบดูง่ายและควบคุมค่า Brix หวาน 50% ได้นิ่งมากครับ",
            "sweetnessTarget": "all",
            "voiceUrl": "https://actions.google.com/sounds/v1/water/pouring_water.ogg",
            "duration": 7,
            "likes": [
              "user-ice"
            ]
          }
        ]
      }
    ],
    "menuItems": [
      {
        "id": "menu-v-1",
        "labItemId": "lab-1",
        "category": "ชานมพรีเมียม & ชาสด",
        "customName": "ชาไทยพรีเมียมการันตี VITCHA",
        "retailPriceThb": 55,
        "badge": "Best Seller",
        "displayOrder": 1,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-9",
          "lab-10"
        ]
      },
      {
        "id": "menu-v-2",
        "labItemId": "lab-3",
        "category": "ชานมพรีเมียม & ชาสด",
        "customName": "ชามะลิหอมหมื่นลี้ นมสดสลิม",
        "retailPriceThb": 60,
        "badge": "Signature",
        "displayOrder": 2,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-10"
        ]
      },
      {
        "id": "menu-v-3",
        "labItemId": "lab-4",
        "category": "ชาผลไม้สด & คลาวด์ชีส",
        "customName": "ชาสตรอว์เบอร์รี คลาวด์ชีส",
        "retailPriceThb": 85,
        "badge": "Must Try",
        "displayOrder": 3,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-10"
        ]
      },
      {
        "id": "menu-v-4",
        "labItemId": "lab-5",
        "category": "มัทฉะ & สเปเชียลตี้",
        "customName": "อูจิมัทฉะ ลาเต้ คลาวด์ (โอ๊ตมิลค์)",
        "retailPriceThb": 95,
        "badge": "New",
        "displayOrder": 4,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-9"
        ]
      },
      {
        "id": "menu-v-5",
        "labItemId": "lab-9",
        "category": "ท็อปปิ้งซิกเนเจอร์",
        "customName": "ท็อปปิ้ง: ไข่มุกบราวน์ชูก้าร์เตาถ่าน",
        "retailPriceThb": 15,
        "badge": "Best Seller",
        "displayOrder": 5,
        "isAvailable": true
      },
      {
        "id": "menu-v-6",
        "labItemId": "lab-10",
        "category": "ท็อปปิ้งซิกเนเจอร์",
        "customName": "ท็อปปิ้ง: ไข่มุกบุกคริสตัลรสพีช",
        "retailPriceThb": 15,
        "badge": "Must Try",
        "displayOrder": 6,
        "isAvailable": true
      }
    ],
    "createdAt": "2026-10-26T10:00:00Z",
    "updatedAt": "2026-10-28T15:00:00Z",
    "isMock": true
  },
  {
    "id": "store-vitaminzaar",
    "name": "VITCHAMINZAAR",
    "brandTagline": "นวัตกรรมเครื่องดื่มวิตามินซ่า Sparkling Boost ดับกระหายสดชื่น",
    "branch": "สาขา The EmSphere (G Floor - Trend Food Hall)",
    "themeColor": "cyan",
    "logoUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80",
    "contactNumber": "02-987-6543",
    "openingHours": "10:00 - 22:00 น. (เปิดทุกวัน)",
    "menuCategories": [
      "วิตามินคราฟต์โซดา ซ่าสดชื่น",
      "ชาสกัดเย็น 0-Cal",
      "สเปเชียลดริ้งก์",
      "ท็อปปิ้งเพื่อสุขภาพ"
    ],
    "likedBy": [
      "user-ice",
      "user-view"
    ],
    "viewLogs": [
      {
        "userId": "user-ice",
        "name": "SuperiCez",
        "alias": "SuperiCez",
        "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        "role": "admin",
        "lastViewedAt": "2026-10-30T09:30:00Z",
        "viewCount": 19
      }
    ],
    "revisionCycles": [
      {
        "cycleNumber": 1,
        "title": "รอบเปิดตัวแบรนด์ใหม่ VITCHAMINZAAR @ EmSphere",
        "status": "active",
        "createdAt": "2026-10-27T12:00:00Z",
        "createdBy": "SuperiCez",
        "comments": [
          {
            "id": "comm-store-vz-1",
            "authorId": "user-ice",
            "authorName": "SuperiCez (Owner)",
            "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
            "createdAt": "2026-10-28T16:00:00Z",
            "content": "วิตามินซ่าสปาร์คลิ้ง ซิตรัสซี 200% รสชาติเปรี้ยวซ่ากำลังดี กลุ่มลูกค้าออกกำลังกายและวัยรุ่นชอบมากครับ",
            "sweetnessTarget": "50",
            "likes": [
              "user-view"
            ]
          }
        ]
      }
    ],
    "menuItems": [
      {
        "id": "menu-vz-1",
        "labItemId": "lab-2",
        "category": "วิตามินคราฟต์โซดา ซ่าสดชื่น",
        "customName": "วิตามินซ่า สปาร์คลิ้ง ซิตรัสซี 200%",
        "retailPriceThb": 65,
        "badge": "Best Seller",
        "displayOrder": 1,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-10"
        ]
      },
      {
        "id": "menu-vz-2",
        "labItemId": "lab-6",
        "category": "วิตามินคราฟต์โซดา ซ่าสดชื่น",
        "customName": "สปาร์คลิ้ง ยูซุ ไนโตรคราฟต์ วิตบี",
        "retailPriceThb": 79,
        "badge": "Signature",
        "displayOrder": 2,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-10"
        ]
      },
      {
        "id": "menu-vz-3",
        "labItemId": "lab-7",
        "category": "ชาสกัดเย็น 0-Cal",
        "customName": "ชาอู่หลงทิกวนอิม สกัดเย็น 0-Cal",
        "retailPriceThb": 50,
        "badge": "Must Try",
        "displayOrder": 3,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-10"
        ]
      },
      {
        "id": "menu-vz-4",
        "labItemId": "lab-8",
        "category": "สเปเชียลดริ้งก์",
        "customName": "ดาร์กโกโก้ ดับเบิลช็อกโกแลต 72%",
        "retailPriceThb": 65,
        "badge": "New",
        "displayOrder": 4,
        "isAvailable": true,
        "recommendedToppingIds": [
          "lab-9"
        ]
      },
      {
        "id": "menu-vz-5",
        "labItemId": "lab-10",
        "category": "ท็อปปิ้งเพื่อสุขภาพ",
        "customName": "ท็อปปิ้ง: ไข่มุกบุกคริสตัลรสพีช 0-Cal",
        "retailPriceThb": 15,
        "badge": "Best Seller",
        "displayOrder": 5,
        "isAvailable": true
      }
    ],
    "createdAt": "2026-10-26T12:00:00Z",
    "updatedAt": "2026-10-28T16:00:00Z",
    "isMock": true
  }
];
