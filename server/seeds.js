export const DEFAULT_LEAD_LAB_ITEMS = [
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
            "voiceUrl": "./audio/sample-feedback-1.m4a",
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
            "voiceUrl": "./audio/sample-feedback-2.m4a",
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

export const DEFAULT_FRANCHISE_STORES = [
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
            "voiceUrl": "./audio/sample-feedback-1.m4a",
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
