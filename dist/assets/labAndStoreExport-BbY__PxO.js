import{c as b,$ as N}from"./index-D3S90Iqx.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B={name:"droplet",size:24,node:[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",key:"c7niix"}]]};B.node;const R=b(B);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P={name:"heart",size:24,node:[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]]};P.node;const A=b(P);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D={name:"video",size:24,node:[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]};D.node;const C=b(D);var E=N();function t(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function j(e){const s=window.open("","_blank");if(!s){window.print();return}const l=e.suggestedPriceThb>0?((e.suggestedPriceThb-e.costTotalThb)/e.suggestedPriceThb*100).toFixed(1):"0.0",i={approved:"✅ ผ่านเกณฑ์อนุมัติ (Approved)",testing:"⏳ กำลังทดลอง & วิจัย (Testing)",shelved:"📦 พักสูตร (Shelved)"}[e.status]||e.status,r=(e.revisionCycles||[]).flatMap(o=>(o.comments||[]).map(n=>({...n,cycleTitle:o.title}))),p=`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>LEAD LAB R&D Spec - ${t(e.code)} ${t(e.name)}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Sarabun", "Prompt", sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      font-size: 13px;
      line-height: 1.5;
    }
    .header {
      border-bottom: 2px solid #4f46e5;
      padding-bottom: 12px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .title-block h1 { margin: 0; font-size: 22px; color: #1e1b4b; font-weight: 900; }
    .title-block .sub { font-size: 13px; color: #6366f1; font-weight: 700; margin-top: 3px; }
    .meta-badge { background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; font-family: monospace; }
    .grid-2 { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; margin-bottom: 16px; }
    .photo-box { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; max-height: 220px; }
    .photo-box img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
    .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
    .kpi { background: #f1f5f9; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center; }
    .kpi.highlight { background: #ecfdf5; border-color: #a7f3d0; color: #065f46; }
    .kpi .num { font-size: 16px; font-weight: 800; font-family: monospace; }
    .kpi .lbl { font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 12px; }
    th { background: #f1f5f9; padding: 8px 10px; text-align: left; font-weight: 700; border: 1px solid #cbd5e1; }
    td { padding: 7px 10px; border: 1px solid #e2e8f0; }
    .sweet-table th { background: #eef2ff; color: #312e81; }
    .sec-title { font-size: 14px; font-weight: 800; color: #1e293b; margin: 16px 0 8px 0; display: flex; align-items: center; gap: 6px; }
    .comment-item { background: #faf5ff; border: 1px solid #f3e8ff; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }
    .comment-meta { font-size: 11px; font-weight: 700; color: #6b21a8; display: flex; justify-content: space-between; margin-bottom: 4px; }
    .print-actions { margin-bottom: 20px; padding: 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; justify-content: flex-end; gap: 10px; }
    .btn { padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; }
    .btn-print { background: #4f46e5; color: #fff; }
    .btn-close { background: #e2e8f0; color: #334155; }
    @media print {
      .print-actions { display: none !important; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="print-actions">
    <button class="btn btn-close" onclick="window.close()">ปิดหน้าต่าง</button>
    <button class="btn btn-print" onclick="window.print()">🖨️ พิมพ์เอกสาร / บันทึกเป็น PDF</button>
  </div>

  <div class="header">
    <div class="title-block">
      <h1>LEAD LAB 🧪 "แล๊ปของคนหัวแถว"</h1>
      <div class="sub">เอกสารสเปกและสูตรวิจัยเครื่องดื่มมาตรฐาน (Standard Beverage R&D Spec Sheet)</div>
    </div>
    <div style="text-align: right;">
      <span class="meta-badge">${t(e.code)}</span>
      <div style="font-size: 11px; color: #64748b; margin-top: 4px;">วันที่ออกเอกสาร: ${new Date().toLocaleDateString("th-TH")}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="photo-box">
      <img src="${t(e.photoUrl)}" alt="${t(e.name)}" />
    </div>
    <div class="info-card">
      <div style="font-size: 18px; font-weight: 900; color: #0f172a;">${t(e.name)}</div>
      <div style="font-size: 13px; font-family: monospace; color: #475569; margin-bottom: 8px;">${t(e.nameEn)} · ${t(e.category)}</div>
      <div style="font-size: 12px; font-weight: bold; margin-bottom: 8px;">สถานะ: <span style="color: #4f46e5;">${t(i)}</span></div>
      <div style="font-size: 12px; color: #334155; line-height: 1.6;">${t(e.description)}</div>
      <div style="font-size: 11px; color: #64748b; margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1;">
        👤 ผู้สร้างสูตร: <strong>${t(e.createdByName||"R&D Team")}</strong> (${e.createdAt?new Date(e.createdAt).toLocaleDateString("th-TH"):"-"})
        ${e.galleryPhotos&&e.galleryPhotos.length>0?` · 📷 รูปแนบ: ${e.galleryPhotos.length} ภาพ`:""}
        ${e.audioNotes&&e.audioNotes.length>0?` · 🎙️ วอยซ์เสียง: ${e.audioNotes.length} คลิป`:""}
        ${e.videos&&e.videos.length>0?` · 🎬 คลิปวิดีโอ: ${e.videos.length} คลิป`:""}
      </div>
    </div>
  </div>

  <!-- Financial KPI Bar -->
  <div class="kpi-row">
    <div class="kpi">
      <div class="lbl">ต้นทุนวัตถุดิบ</div>
      <div class="num">฿${e.costIngredientThb.toFixed(2)}</div>
    </div>
    <div class="kpi">
      <div class="lbl">ต้นทุนบรรจุภัณฑ์</div>
      <div class="num">฿${e.costPackagingThb.toFixed(2)}</div>
    </div>
    <div class="kpi">
      <div class="lbl">รวมต้นทุน/แก้ว</div>
      <div class="num">฿${e.costTotalThb.toFixed(2)}</div>
    </div>
    <div class="kpi highlight">
      <div class="lbl">ราคาขายแนะนำ (GP %)</div>
      <div class="num">฿${e.suggestedPriceThb.toFixed(2)} (${l}%)</div>
    </div>
  </div>

  <!-- Sweetness Matrix Table -->
  <div class="sec-title">📊 ตารางค่าความหวานและ Brix (Sweetness & Brix Matrix)</div>
  <table class="sweet-table">
    <thead>
      <tr>
        <th style="width: 18%;">ระดับความหวาน</th>
        <th style="width: 25%;">สารให้ความหวาน (ปริมาณ)</th>
        <th style="width: 20%;">ของเหลวหลัก / นม</th>
        <th style="width: 12%; text-align: center;">ค่า Brix (°Bx)</th>
        <th style="width: 10%; text-align: center;">พลังงาน</th>
        <th>รสสัมผัส (Sensory Notes)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>หวาน 0% (ไม่หวาน)</strong></td>
        <td>${t(e.sweetnessLevels.zero.sweetenerType)} (${e.sweetnessLevels.zero.syrupMl} ml)</td>
        <td>${e.sweetnessLevels.zero.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold;">${e.sweetnessLevels.zero.brix} °Bx</td>
        <td style="text-align: center;">${e.sweetnessLevels.zero.caloriesKcal} kcal</td>
        <td><em>"${t(e.sweetnessLevels.zero.tasteNotes)}"</em></td>
      </tr>
      <tr style="background: #fdf2f8;">
        <td><strong>หวาน 50% (หวานน้อยละมุน) ⭐</strong></td>
        <td>${t(e.sweetnessLevels.half.sweetenerType)} (${e.sweetnessLevels.half.syrupMl} ml)</td>
        <td>${e.sweetnessLevels.half.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold; color: #db2777;">${e.sweetnessLevels.half.brix} °Bx</td>
        <td style="text-align: center;">${e.sweetnessLevels.half.caloriesKcal} kcal</td>
        <td><em>"${t(e.sweetnessLevels.half.tasteNotes)}"</em></td>
      </tr>
      <tr>
        <td><strong>หวาน 100% (หวานปกติ)</strong></td>
        <td>${t(e.sweetnessLevels.full.sweetenerType)} (${e.sweetnessLevels.full.syrupMl} ml)</td>
        <td>${e.sweetnessLevels.full.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold;">${e.sweetnessLevels.full.brix} °Bx</td>
        <td style="text-align: center;">${e.sweetnessLevels.full.caloriesKcal} kcal</td>
        <td><em>"${t(e.sweetnessLevels.full.tasteNotes)}"</em></td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Specs -->
  ${e.technicalSpecs?`
  <div class="sec-title">⚙️ พารามิเตอร์การสกัดมาตรฐาน (Extraction Parameters)</div>
  <table>
    <tr>
      <th>อุณหภูมิน้ำสกัด</th>
      <td><strong>${e.technicalSpecs.brewingTempC||"-"} °C</strong></td>
      <th>เวลาสกัด (Extraction Time)</th>
      <td><strong>${e.technicalSpecs.extractionTimeSec||"-"} วินาที</strong></td>
    </tr>
    <tr>
      <th>ปริมาณใบชา/ผง</th>
      <td><strong>${e.technicalSpecs.teaLeavesG||"-"} g</strong></td>
      <th>อายุการจัดเก็บน้ำชาพร้อมใช้</th>
      <td><strong>${e.technicalSpecs.shelfLifeHours||"-"} ชั่วโมง</strong></td>
    </tr>
  </table>`:""}

  <!-- Ingredients Table -->
  <div class="sec-title">🧪 รายการวัตถุดิบและสัดส่วน (Recipe Ingredients)</div>
  <table>
    <thead>
      <tr>
        <th style="width: 50%;">ชื่อวัตถุดิบ</th>
        <th style="width: 25%;">ปริมาณ/แก้ว</th>
        <th style="width: 25%;">ต้นทุน (฿)</th>
      </tr>
    </thead>
    <tbody>
      ${(e.ingredients||[]).map(o=>`
      <tr>
        <td>${t(o.name)}</td>
        <td>${o.quantity} ${t(o.unit)}</td>
        <td>฿${o.costThb.toFixed(2)}</td>
      </tr>`).join("")}
    </tbody>
  </table>

  <!-- Social & Feedback Section -->
  <div class="sec-title">💬 บันทึกการโต้ตอบ & ข้อเสนอแนะจากทีมงาน (Team Collaboration)</div>
  <div style="font-size: 11px; color: #475569; margin-bottom: 8px;">
    ❤️ ยอดไลก์สูตร: <strong>${(e.likedBy||[]).length} ไลก์</strong> | ประวัติรอบการพัฒนา: <strong>${(e.revisionCycles||[]).length} รอบ</strong>
  </div>
  ${r.slice(0,4).map(o=>`
  <div class="comment-item">
    <div class="comment-meta">
      <span>👤 ${t(o.authorName)} [เจาะจง: หวาน ${t(o.sweetnessTarget||"ภาพรวม")}%]</span>
      <span>👍 ${(o.likes||[]).length} ไลก์</span>
    </div>
    <div style="font-size: 12px; color: #1e1b4b;">"${t(o.content)}"</div>
  </div>`).join("")}

  <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; text-align: center; font-size: 12px;">
    <div style="border-top: 1px solid #94a3b8; padding-top: 8px;">
      ลงชื่อ R&D Specialist ผู้พัฒนาสูตร
    </div>
    <div style="border-top: 1px solid #94a3b8; padding-top: 8px;">
      ลงชื่อ ผู้มีอำนาจอนุมัติ (Owner / Management)
    </div>
  </div>
</body>
</html>`;s.document.write(p),s.document.close()}function H(e,s){const l=window.open("","_blank");if(!l){window.print();return}const i=s.filter(n=>{var a;return((a=n.labItem)==null?void 0:a.type)==="drink"}),r=s.filter(n=>{var a;return((a=n.labItem)==null?void 0:a.type)==="topping"}),p=(e.revisionCycles||[]).flatMap(n=>(n.comments||[]).map(a=>a)),o=`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>คู่มือเมนูหน้าร้าน & SOP - ${t(e.name)}</title>
  <style>
    @page { size: A4 landscape; margin: 12mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Sarabun", "Prompt", sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 15px;
      font-size: 12px;
      line-height: 1.4;
    }
    .header {
      border-bottom: 2px solid #059669;
      padding-bottom: 10px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .title-block h1 { margin: 0; font-size: 22px; color: #065f46; font-weight: 900; }
    .title-block .sub { font-size: 12px; color: #047857; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 11px; }
    th { background: #f0fdf4; color: #065f46; padding: 6px 8px; text-align: left; font-weight: 700; border: 1px solid #bbf7d0; }
    td { padding: 6px 8px; border: 1px solid #e2e8f0; vertical-align: top; }
    .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; background: #e0f2fe; color: #0369a1; }
    .badge-seller { background: #fef3c7; color: #b45309; }
    .badge-must { background: #fce7f3; color: #be185d; }
    .price { font-weight: 800; color: #059669; font-family: monospace; font-size: 13px; }
    .print-actions { margin-bottom: 15px; padding: 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; justify-content: flex-end; gap: 8px; }
    .btn { padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; border: none; }
    .btn-print { background: #059669; color: #fff; }
    .btn-close { background: #e2e8f0; color: #334155; }
    @media print {
      .print-actions { display: none !important; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="print-actions">
    <button class="btn btn-close" onclick="window.close()">ปิดหน้าต่าง</button>
    <button class="btn btn-print" onclick="window.print()">🖨️ พิมพ์ป้ายเมนู & SOP หน้าร้าน (PDF)</button>
  </div>

  <div class="header">
    <div class="title-block">
      <h1>🏪 ${t(e.name)} · ${t(e.branch)}</h1>
      <div class="sub">"${t(e.brandTagline)}" | เวลาทำการ: ${t(e.openingHours||"10:00 - 21:30 น.")} | โทร: ${t(e.contactNumber||"-")}</div>
      <div style="font-size: 11px; color: #047857; margin-top: 3px;">
        👤 ผู้สร้างร้าน: <strong>${t(e.createdByName||"Franchise Team")}</strong> (${e.createdAt?new Date(e.createdAt).toLocaleDateString("th-TH"):"-"})
        ${e.galleryPhotos&&e.galleryPhotos.length>0?` · 📷 รูปภาพสาขา: ${e.galleryPhotos.length} ภาพ`:""}
        ${e.audioNotes&&e.audioNotes.length>0?` · 🎙️ วอยซ์เสียง: ${e.audioNotes.length} คลิป`:""}
        ${e.videos&&e.videos.length>0?` · 🎬 คลิปวิดีโอ: ${e.videos.length} คลิป`:""}
      </div>
    </div>
    <div style="text-align: right; font-size: 11px;">
      <span style="background: #ecfdf5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #a7f3d0;">
        กระดานเมนู & คู่มือ SOP บาริสต้าฉบับหน้าร้าน
      </span>
      <div style="color: #64748b; margin-top: 3px;">อัปเดตล่าสุด: ${new Date().toLocaleDateString("th-TH")}</div>
    </div>
  </div>

  <!-- Drinks Table -->
  <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 6px;">🥤 หมวดหมู่เครื่องดื่ม (Handcrafted Beverages) - ${i.length} รายการ</div>
  <table>
    <thead>
      <tr>
        <th style="width: 5%;">ลำดับ</th>
        <th style="width: 25%;">ชื่อเมนูหน้าร้าน / รหัสสูตร</th>
        <th style="width: 10%; text-align: right;">ราคาขาย</th>
        <th style="width: 20%;">สูตรหวาน 50% (บาริสต้าแนะนำ)</th>
        <th style="width: 20%;">สูตรหวาน 0% / 100%</th>
        <th style="width: 20%;">ท็อปปิ้งที่แนะนำ</th>
      </tr>
    </thead>
    <tbody>
      ${i.map((n,a)=>{var h,f,x,v,y,u,m,w,$,k,L,T,z,S;const d=n.labItem,c=n.menuItem;return`
        <tr>
          <td style="text-align: center; font-weight: bold;">${a+1}</td>
          <td>
            <strong>${t(c.customName||d.name)}</strong>
            <div style="font-size: 10px; color: #64748b;">${t(d.nameEn)} (${t(d.code)})</div>
            ${c.badge&&c.badge!=="None"?`<span class="badge ${c.badge==="Best Seller"?"badge-seller":c.badge==="Must Try"?"badge-must":""}">${t(c.badge)}</span>`:""}
          </td>
          <td style="text-align: right;" class="price">฿${c.retailPriceThb}</td>
          <td>
            ไซรัป: <strong>${((f=(h=d.sweetnessLevels)==null?void 0:h.half)==null?void 0:f.syrupMl)||15} ml</strong> (Brix: ${((v=(x=d.sweetnessLevels)==null?void 0:x.half)==null?void 0:v.brix)||8.5}°Bx)
            <div style="font-size: 10px; color: #475569;">${t(((u=(y=d.sweetnessLevels)==null?void 0:y.half)==null?void 0:u.tasteNotes)||"")}</div>
          </td>
          <td>
            0%: ไซรัป ${((w=(m=d.sweetnessLevels)==null?void 0:m.zero)==null?void 0:w.syrupMl)||0}ml (${((k=($=d.sweetnessLevels)==null?void 0:$.zero)==null?void 0:k.brix)||3}°Bx)<br/>
            100%: ไซรัป ${((T=(L=d.sweetnessLevels)==null?void 0:L.full)==null?void 0:T.syrupMl)||30}ml (${((S=(z=d.sweetnessLevels)==null?void 0:z.full)==null?void 0:S.brix)||13.5}°Bx)
          </td>
          <td>
            ${(c.recommendedToppingIds||[]).map(I=>{const g=s.find(F=>F.menuItem.labItemId===I);return g?`<span class="badge" style="margin-right: 3px;">+ ${t(g.menuItem.customName||g.labItem.name)}</span>`:""}).join("")||"-"}
          </td>
        </tr>`}).join("")}
    </tbody>
  </table>

  <!-- Toppings Table -->
  ${r.length>0?`
  <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 6px;">🍮 หมวดหมู่ท็อปปิ้ง (Specialty Toppings) - ${r.length} รายการ</div>
  <table>
    <thead>
      <tr>
        <th style="width: 5%;">ลำดับ</th>
        <th style="width: 35%;">ชื่อท็อปปิ้ง</th>
        <th style="width: 15%; text-align: right;">ราคาเพิ่ม/แก้ว</th>
        <th style="width: 45%;">คำแนะนำและลักษณะสัมผัส</th>
      </tr>
    </thead>
    <tbody>
      ${r.map((n,a)=>`
      <tr>
        <td style="text-align: center; font-weight: bold;">${a+1}</td>
        <td>
          <strong>${t(n.menuItem.customName||n.labItem.name)}</strong>
          <span class="badge badge-seller" style="margin-left: 6px;">${t(n.menuItem.badge||"Topping")}</span>
        </td>
        <td style="text-align: right;" class="price">+฿${n.menuItem.retailPriceThb}</td>
        <td>${t(n.labItem.description||"-")}</td>
      </tr>`).join("")}
    </tbody>
  </table>`:""}

  <!-- Social feedback note -->
  <div style="margin-top: 10px; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between;">
    <span>❤️ ได้รับความนิยมจากทีมงาน: <strong>${(e.likedBy||[]).length} ไลก์</strong></span>
    <span>💬 คอมเมนต์ปรับปรุงหน้าร้าน: <strong>${p.length} ข้อความ</strong></span>
    <span>📋 รหัสสาขา: <strong>${t(e.id)}</strong></span>
  </div>
</body>
</html>`;l.document.write(o),l.document.close()}async function _(e){const s=e.suggestedPriceThb>0?((e.suggestedPriceThb-e.costTotalThb)/e.suggestedPriceThb*100).toFixed(1):"0.0",l=typeof window<"u"?`${window.location.origin}${window.location.pathname}?tab=lead_lab&view=${encodeURIComponent(e.id)}`:"",i=`🧪 [LEAD LAB R&D] สรุปสูตรเครื่องดื่มมาตรฐาน
━━━━━━━━━━━━━━━━━━━━
📌 รหัสสูตร: ${e.code}
🥤 ชื่อสูตร: ${e.name} (${e.nameEn})
🏷️ หมวดหมู่: ${e.category}
💰 ต้นทุนรวม: ฿${e.costTotalThb.toFixed(2)} | ราคาขายแนะนำ: ฿${e.suggestedPriceThb.toFixed(2)} (GP ${s}%)
━━━━━━━━━━━━━━━━━━━━
🍬 เมทริกซ์ความหวาน & Brix:
• หวาน 0%: ไซรัป ${e.sweetnessLevels.zero.syrupMl}ml (Brix ${e.sweetnessLevels.zero.brix}°Bx)
• หวาน 50%: ไซรัป ${e.sweetnessLevels.half.syrupMl}ml (Brix ${e.sweetnessLevels.half.brix}°Bx) ⭐ แนะนำ
• หวาน 100%: ไซรัป ${e.sweetnessLevels.full.syrupMl}ml (Brix ${e.sweetnessLevels.full.brix}°Bx)
━━━━━━━━━━━━━━━━━━━━
❤️ ไลก์: ${(e.likedBy||[]).length} คน | 💬 รอบพัฒนา: ${(e.revisionCycles||[]).length} รอบ
🔗 กดดูสูตรทันที: ${l}`;try{navigator.clipboard&&await navigator.clipboard.writeText(i)}catch(p){console.warn("Failed to copy text",p)}const r=`https://line.me/R/msg/text/?${encodeURIComponent(i)}`;return window.open(r,"_blank"),!0}async function U(e,s){const l=typeof window<"u"?`${window.location.origin}${window.location.pathname}?tab=franchise_stores&view=${encodeURIComponent(e.id)}`:"",i=`🏪 [FRANCHISE STORE] ข้อมูลสาขาและเมนูบอร์ด
━━━━━━━━━━━━━━━━━━━━
📌 แบรนด์: ${e.name}
📍 สาขา: ${e.branch}
💬 สโลแกน: "${e.brandTagline}"
⏰ เวลาทำการ: ${e.openingHours||"10:00 - 21:30 น."}
📞 โทร: ${e.contactNumber||"-"}
━━━━━━━━━━━━━━━━━━━━
🥤 จำนวนเมนูพร้อมจำหน่าย: ${s} รายการ
❤️ ทีมงานไลก์: ${(e.likedBy||[]).length} คน
🔗 กดดูข้อมูลสาขาทันที: ${l}`;try{navigator.clipboard&&await navigator.clipboard.writeText(i)}catch(p){console.warn("Failed to copy text",p)}const r=`https://line.me/R/msg/text/?${encodeURIComponent(i)}`;return window.open(r,"_blank"),!0}export{R as D,A as H,C as V,U as a,H as b,j as p,E as r,_ as s};
