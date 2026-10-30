import{c as S}from"./index-DVpMCPOc.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B={name:"droplet",size:24,node:[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",key:"c7niix"}]]};B.node;const M=S(B);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P={name:"heart",size:24,node:[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]]};P.node;const C=S(P);function e(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function N(t){const o=window.open("","_blank");if(!o){window.print();return}const i=t.suggestedPriceThb>0?((t.suggestedPriceThb-t.costTotalThb)/t.suggestedPriceThb*100).toFixed(1):"0.0",r={approved:"✅ ผ่านเกณฑ์อนุมัติ (Approved)",testing:"⏳ กำลังทดลอง & วิจัย (Testing)",shelved:"📦 พักสูตร (Shelved)"}[t.status]||t.status,d=(t.revisionCycles||[]).flatMap(n=>(n.comments||[]).map(s=>({...s,cycleTitle:n.title}))),p=`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>LEAD LAB R&D Spec - ${e(t.code)} ${e(t.name)}</title>
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
      <span class="meta-badge">${e(t.code)}</span>
      <div style="font-size: 11px; color: #64748b; margin-top: 4px;">วันที่ออกเอกสาร: ${new Date().toLocaleDateString("th-TH")}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="photo-box">
      <img src="${e(t.photoUrl)}" alt="${e(t.name)}" />
    </div>
    <div class="info-card">
      <div style="font-size: 18px; font-weight: 900; color: #0f172a;">${e(t.name)}</div>
      <div style="font-size: 13px; font-family: monospace; color: #475569; margin-bottom: 8px;">${e(t.nameEn)} · ${e(t.category)}</div>
      <div style="font-size: 12px; font-weight: bold; margin-bottom: 8px;">สถานะ: <span style="color: #4f46e5;">${e(r)}</span></div>
      <div style="font-size: 12px; color: #334155; line-height: 1.6;">${e(t.description)}</div>
    </div>
  </div>

  <!-- Financial KPI Bar -->
  <div class="kpi-row">
    <div class="kpi">
      <div class="lbl">ต้นทุนวัตถุดิบ</div>
      <div class="num">฿${t.costIngredientThb.toFixed(2)}</div>
    </div>
    <div class="kpi">
      <div class="lbl">ต้นทุนบรรจุภัณฑ์</div>
      <div class="num">฿${t.costPackagingThb.toFixed(2)}</div>
    </div>
    <div class="kpi">
      <div class="lbl">รวมต้นทุน/แก้ว</div>
      <div class="num">฿${t.costTotalThb.toFixed(2)}</div>
    </div>
    <div class="kpi highlight">
      <div class="lbl">ราคาขายแนะนำ (GP %)</div>
      <div class="num">฿${t.suggestedPriceThb.toFixed(2)} (${i}%)</div>
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
        <td>${e(t.sweetnessLevels.zero.sweetenerType)} (${t.sweetnessLevels.zero.syrupMl} ml)</td>
        <td>${t.sweetnessLevels.zero.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold;">${t.sweetnessLevels.zero.brix} °Bx</td>
        <td style="text-align: center;">${t.sweetnessLevels.zero.caloriesKcal} kcal</td>
        <td><em>"${e(t.sweetnessLevels.zero.tasteNotes)}"</em></td>
      </tr>
      <tr style="background: #fdf2f8;">
        <td><strong>หวาน 50% (หวานน้อยละมุน) ⭐</strong></td>
        <td>${e(t.sweetnessLevels.half.sweetenerType)} (${t.sweetnessLevels.half.syrupMl} ml)</td>
        <td>${t.sweetnessLevels.half.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold; color: #db2777;">${t.sweetnessLevels.half.brix} °Bx</td>
        <td style="text-align: center;">${t.sweetnessLevels.half.caloriesKcal} kcal</td>
        <td><em>"${e(t.sweetnessLevels.half.tasteNotes)}"</em></td>
      </tr>
      <tr>
        <td><strong>หวาน 100% (หวานปกติ)</strong></td>
        <td>${e(t.sweetnessLevels.full.sweetenerType)} (${t.sweetnessLevels.full.syrupMl} ml)</td>
        <td>${t.sweetnessLevels.full.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold;">${t.sweetnessLevels.full.brix} °Bx</td>
        <td style="text-align: center;">${t.sweetnessLevels.full.caloriesKcal} kcal</td>
        <td><em>"${e(t.sweetnessLevels.full.tasteNotes)}"</em></td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Specs -->
  ${t.technicalSpecs?`
  <div class="sec-title">⚙️ พารามิเตอร์การสกัดมาตรฐาน (Extraction Parameters)</div>
  <table>
    <tr>
      <th>อุณหภูมิน้ำสกัด</th>
      <td><strong>${t.technicalSpecs.brewingTempC||"-"} °C</strong></td>
      <th>เวลาสกัด (Extraction Time)</th>
      <td><strong>${t.technicalSpecs.extractionTimeSec||"-"} วินาที</strong></td>
    </tr>
    <tr>
      <th>ปริมาณใบชา/ผง</th>
      <td><strong>${t.technicalSpecs.teaLeavesG||"-"} g</strong></td>
      <th>อายุการจัดเก็บน้ำชาพร้อมใช้</th>
      <td><strong>${t.technicalSpecs.shelfLifeHours||"-"} ชั่วโมง</strong></td>
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
      ${(t.ingredients||[]).map(n=>`
      <tr>
        <td>${e(n.name)}</td>
        <td>${n.quantity} ${e(n.unit)}</td>
        <td>฿${n.costThb.toFixed(2)}</td>
      </tr>`).join("")}
    </tbody>
  </table>

  <!-- Social & Feedback Section -->
  <div class="sec-title">💬 บันทึกการโต้ตอบ & ข้อเสนอแนะจากทีมงาน (Team Collaboration)</div>
  <div style="font-size: 11px; color: #475569; margin-bottom: 8px;">
    ❤️ ยอดไลก์สูตร: <strong>${(t.likedBy||[]).length} ไลก์</strong> | ประวัติรอบการพัฒนา: <strong>${(t.revisionCycles||[]).length} รอบ</strong>
  </div>
  ${d.slice(0,4).map(n=>`
  <div class="comment-item">
    <div class="comment-meta">
      <span>👤 ${e(n.authorName)} [เจาะจง: หวาน ${e(n.sweetnessTarget||"ภาพรวม")}%]</span>
      <span>👍 ${(n.likes||[]).length} ไลก์</span>
    </div>
    <div style="font-size: 12px; color: #1e1b4b;">"${e(n.content)}"</div>
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
</html>`;o.document.write(p),o.document.close()}function R(t,o){const i=window.open("","_blank");if(!i){window.print();return}const r=o.filter(s=>{var a;return((a=s.labItem)==null?void 0:a.type)==="drink"}),d=o.filter(s=>{var a;return((a=s.labItem)==null?void 0:a.type)==="topping"}),p=(t.revisionCycles||[]).flatMap(s=>(s.comments||[]).map(a=>a)),n=`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>คู่มือเมนูหน้าร้าน & SOP - ${e(t.name)}</title>
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
      <h1>🏪 ${e(t.name)} · ${e(t.branch)}</h1>
      <div class="sub">"${e(t.brandTagline)}" | เวลาทำการ: ${e(t.openingHours||"10:00 - 21:30 น.")} | โทร: ${e(t.contactNumber||"-")}</div>
    </div>
    <div style="text-align: right; font-size: 11px;">
      <span style="background: #ecfdf5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #a7f3d0;">
        กระดานเมนู & คู่มือ SOP บาริสต้าฉบับหน้าร้าน
      </span>
      <div style="color: #64748b; margin-top: 3px;">อัปเดตล่าสุด: ${new Date().toLocaleDateString("th-TH")}</div>
    </div>
  </div>

  <!-- Drinks Table -->
  <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 6px;">🥤 หมวดหมู่เครื่องดื่ม (Handcrafted Beverages) - ${r.length} รายการ</div>
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
      ${r.map((s,a)=>{var b,f,h,x,v,m,u,y,w,$,k,T,L,z;const l=s.labItem,c=s.menuItem;return`
        <tr>
          <td style="text-align: center; font-weight: bold;">${a+1}</td>
          <td>
            <strong>${e(c.customName||l.name)}</strong>
            <div style="font-size: 10px; color: #64748b;">${e(l.nameEn)} (${e(l.code)})</div>
            ${c.badge&&c.badge!=="None"?`<span class="badge ${c.badge==="Best Seller"?"badge-seller":c.badge==="Must Try"?"badge-must":""}">${e(c.badge)}</span>`:""}
          </td>
          <td style="text-align: right;" class="price">฿${c.retailPriceThb}</td>
          <td>
            ไซรัป: <strong>${((f=(b=l.sweetnessLevels)==null?void 0:b.half)==null?void 0:f.syrupMl)||15} ml</strong> (Brix: ${((x=(h=l.sweetnessLevels)==null?void 0:h.half)==null?void 0:x.brix)||8.5}°Bx)
            <div style="font-size: 10px; color: #475569;">${e(((m=(v=l.sweetnessLevels)==null?void 0:v.half)==null?void 0:m.tasteNotes)||"")}</div>
          </td>
          <td>
            0%: ไซรัป ${((y=(u=l.sweetnessLevels)==null?void 0:u.zero)==null?void 0:y.syrupMl)||0}ml (${(($=(w=l.sweetnessLevels)==null?void 0:w.zero)==null?void 0:$.brix)||3}°Bx)<br/>
            100%: ไซรัป ${((T=(k=l.sweetnessLevels)==null?void 0:k.full)==null?void 0:T.syrupMl)||30}ml (${((z=(L=l.sweetnessLevels)==null?void 0:L.full)==null?void 0:z.brix)||13.5}°Bx)
          </td>
          <td>
            ${(c.recommendedToppingIds||[]).map(I=>{const g=o.find(F=>F.menuItem.labItemId===I);return g?`<span class="badge" style="margin-right: 3px;">+ ${e(g.menuItem.customName||g.labItem.name)}</span>`:""}).join("")||"-"}
          </td>
        </tr>`}).join("")}
    </tbody>
  </table>

  <!-- Toppings Table -->
  ${d.length>0?`
  <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 6px;">🍮 หมวดหมู่ท็อปปิ้ง (Specialty Toppings) - ${d.length} รายการ</div>
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
      ${d.map((s,a)=>`
      <tr>
        <td style="text-align: center; font-weight: bold;">${a+1}</td>
        <td>
          <strong>${e(s.menuItem.customName||s.labItem.name)}</strong>
          <span class="badge badge-seller" style="margin-left: 6px;">${e(s.menuItem.badge||"Topping")}</span>
        </td>
        <td style="text-align: right;" class="price">+฿${s.menuItem.retailPriceThb}</td>
        <td>${e(s.labItem.description||"-")}</td>
      </tr>`).join("")}
    </tbody>
  </table>`:""}

  <!-- Social feedback note -->
  <div style="margin-top: 10px; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between;">
    <span>❤️ ได้รับความนิยมจากทีมงาน: <strong>${(t.likedBy||[]).length} ไลก์</strong></span>
    <span>💬 คอมเมนต์ปรับปรุงหน้าร้าน: <strong>${p.length} ข้อความ</strong></span>
    <span>📋 รหัสสาขา: <strong>${e(t.id)}</strong></span>
  </div>
</body>
</html>`;i.document.write(n),i.document.close()}async function A(t){const o=t.suggestedPriceThb>0?((t.suggestedPriceThb-t.costTotalThb)/t.suggestedPriceThb*100).toFixed(1):"0.0",i=`🧪 [LEAD LAB R&D] สรุปสูตรเครื่องดื่มมาตรฐาน
━━━━━━━━━━━━━━━━━━━━
📌 รหัสสูตร: ${t.code}
🥤 ชื่อสูตร: ${t.name} (${t.nameEn})
🏷️ หมวดหมู่: ${t.category}
💰 ต้นทุนรวม: ฿${t.costTotalThb.toFixed(2)} | ราคาขายแนะนำ: ฿${t.suggestedPriceThb.toFixed(2)} (GP ${o}%)
━━━━━━━━━━━━━━━━━━━━
🍬 เมทริกซ์ความหวาน & Brix:
• หวาน 0%: ไซรัป ${t.sweetnessLevels.zero.syrupMl}ml (Brix ${t.sweetnessLevels.zero.brix}°Bx)
• หวาน 50%: ไซรัป ${t.sweetnessLevels.half.syrupMl}ml (Brix ${t.sweetnessLevels.half.brix}°Bx) ⭐ แนะนำ
• หวาน 100%: ไซรัป ${t.sweetnessLevels.full.syrupMl}ml (Brix ${t.sweetnessLevels.full.brix}°Bx)
━━━━━━━━━━━━━━━━━━━━
❤️ ไลก์: ${(t.likedBy||[]).length} คน | 💬 รอบพัฒนา: ${(t.revisionCycles||[]).length} รอบ
🔒 ดูสูตรและขั้นตอนการชงฉบับเต็มได้ที่ระบบ VITCHA SOURCING`;try{navigator.clipboard&&await navigator.clipboard.writeText(i)}catch(d){console.warn("Failed to copy text",d)}const r=`https://line.me/R/msg/text/?${encodeURIComponent(i)}`;return window.open(r,"_blank"),!0}async function j(t,o){const i=`🏪 [FRANCHISE STORE] ข้อมูลสาขาและเมนูบอร์ด
━━━━━━━━━━━━━━━━━━━━
📌 แบรนด์: ${t.name}
📍 สาขา: ${t.branch}
💬 สโลแกน: "${t.brandTagline}"
⏰ เวลาทำการ: ${t.openingHours||"10:00 - 21:30 น."}
📞 โทร: ${t.contactNumber||"-"}
━━━━━━━━━━━━━━━━━━━━
🥤 จำนวนเมนูพร้อมจำหน่าย: ${o} รายการ
❤️ ทีมงานไลก์: ${(t.likedBy||[]).length} คน
🔒 ดูป้ายเมนูดิจิทัลและ Quick SOP บาริสต้าได้ที่ระบบ VITCHA SOURCING`;try{navigator.clipboard&&await navigator.clipboard.writeText(i)}catch(d){console.warn("Failed to copy text",d)}const r=`https://line.me/R/msg/text/?${encodeURIComponent(i)}`;return window.open(r,"_blank"),!0}export{M as D,C as H,j as a,R as b,N as p,A as s};
