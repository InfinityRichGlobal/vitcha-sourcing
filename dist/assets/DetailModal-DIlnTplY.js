import{c as K,u as Je,r as y,B as T,x as O,G as be,j as e,F as Ze,l as Pe,P as Ie,H as Xe,I as Ye,X as P,q as fe,f as et,V as ue,M as tt,m as st,e as at,J as Me,K as lt,N as ot,O as se,S as nt,Q as it,C as rt,z as dt}from"./index-Di5jgKhA.js";import{V as ct}from"./VideoPlayer-BQYyVUKc.js";import{M as ae}from"./mic-u2McyKjm.js";import{Z as xt}from"./zap-CVxNq-fW.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};_e.node;const pt=K(_e);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};He.node;const mt=K(He);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Be.node;const ge=K(Be);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Ve.node;const ve=K(Ve);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};Ge.node;const ht=K(Ge);function x(i){return i==null?"":String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function bt(i,S,z){var M,E,de,F,U,R,W,$;const f=i.type==="supplier",d=f?i:null,r=f?null:i,k=f?d.name:r.storeName,C=f?d.chineseName:r.chineseName,q=f?d.category:r.storeCategory||"เรฟร้านน้ำ",le=f?d.marketOrCity:r.city,oe=i.country==="TH"?"🇹🇭 ประเทศไทย (Thailand)":"🇨🇳 ประเทศจีน (China)",N=[];d?((M=d.photos.storefrontAndAtmosphere)==null||M.forEach((a,l)=>N.push({url:a,label:`ป้ายหน้าร้าน / บรรยากาศ #${l+1}`})),(E=d.photos.contactCards)==null||E.forEach((a,l)=>N.push({url:a,label:`นามบัตร / WeChat #${l+1}`})),(de=d.catalogItems)==null||de.forEach((a,l)=>{a.photo&&N.push({url:a.photo,label:a.name?`สินค้า: ${a.name}`:`รายการสินค้า #${l+1}`})})):r&&((F=r.photos.storefrontAndAtmosphere)==null||F.forEach((a,l)=>N.push({url:a,label:`หน้าร้าน / บรรยากาศ #${l+1}`})),(U=r.photos.menuBoard)==null||U.forEach((a,l)=>N.push({url:a,label:`ป้ายเมนู / ราคา #${l+1}`})),(R=r.photos.drinkCups)==null||R.forEach((a,l)=>N.push({url:a,label:`แก้วเครื่องดื่ม #${l+1}`})),(W=r.drinkItems)==null||W.forEach((a,l)=>{a.photo&&N.push({url:a.photo,label:a.name?`เมนูชิม: ${a.name}`:`แก้วชิม #${l+1}`})}));const A=Array.isArray(i.viewedBy)?i.viewedBy:[],ne=Array.isArray(i.likes)?i.likes:[],L=Array.isArray(i.reviewerNotes)?i.reviewerNotes:[],D=`ฉันจะเป็นหัวแถว-${k.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,re={awaiting:"1. รอรับช่วงต่อ",rfq_sent:"2. ขอสเปก / ส่ง RFQ",sample_test:"3. ทดสอบตัวอย่าง Lab / R&D",negotiate:"4. ต่อรองราคา & MOQ",approved:"5. ตัวเต็งอนุมัติ",ordered:"6. สั่งซื้อสำเร็จ"}[i.handoffStage||"awaiting"]||"1. รอรับช่วงต่อ";let I="";if(f&&d){const a=(d.catalogItems||[]).map((l,g)=>`
        <tr>
          <td style="text-align:center;font-weight:700;">${g+1}</td>
          <td style="width:76px;">
            ${l.photo?`<img src="${x(l.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`:'<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>'}
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${x(l.name||`รายการที่ #${g+1}`)}</div>
            ${l.memo?`<div style="font-size:11px;color:#475569;margin-top:3px;">${x(l.memo)}</div>`:""}
          </td>
          <td>${x(l.dimensions||"-")} / ${x(l.weightKg||"-")}</td>
          <td style="font-weight:700;color:#047857;">
            ${l.priceRmb?`¥${l.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${S(l.priceRmb).toLocaleString()})</div>`:l.priceThb?`฿${l.priceThb.toLocaleString()}`:"-"}
          </td>
        </tr>`).join("");I=`
      <div class="section-box">
        <div class="section-title">📦 กลุ่มที่ 2: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(d.catalogItems||[]).length} รายการ)</div>
        ${a?`<table class="data-table">
                <thead>
                  <tr>
                    <th style="width:40px;">#</th>
                    <th style="width:80px;">รูปภาพ</th>
                    <th>ชื่อรายการ & รายละเอียดสเปก</th>
                    <th style="width:140px;">ขนาด / น้ำหนัก</th>
                    <th style="width:130px;">ราคาประเมิน</th>
                  </tr>
                </thead>
                <tbody>${a}</tbody>
              </table>`:'<div class="empty-note">ไม่มีรายการย่อย</div>'}
      </div>
    `}else if(r){const a=(r.drinkItems||[]).map((l,g)=>`
        <tr>
          <td style="text-align:center;font-weight:700;">${g+1}</td>
          <td style="width:76px;">
            ${l.photo?`<img src="${x(l.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`:'<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>'}
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${x(l.name||`แก้วที่ #${g+1}`)}</div>
            ${l.gimmickNotes?`<div style="font-size:11px;color:#475569;margin-top:3px;">กิมมิก: ${x(l.gimmickNotes)}</div>`:""}
          </td>
          <td>${x(l.cupSize||"-")}</td>
          <td>${x(l.fitMenuTarget||"-")}</td>
          <td style="font-weight:700;color:#b45309;">
            ${l.priceRmb?`¥${l.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${S(l.priceRmb).toLocaleString()})</div>`:l.priceThb?`฿${l.priceThb.toLocaleString()}`:"-"}
          </td>
        </tr>`).join("");I=`
      <div class="section-box">
        <div class="section-title">🧋 กลุ่มที่ 2: เมนูที่ชิม & การถอดรหัสสูตร (${(r.drinkItems||[]).length} เมนู)</div>
        ${a?`<table class="data-table">
                <thead>
                  <tr>
                    <th style="width:40px;">#</th>
                    <th style="width:80px;">รูปแก้ว</th>
                    <th>ชื่อเมนู & กิมมิก</th>
                    <th style="width:90px;">ขนาดแก้ว</th>
                    <th style="width:160px;">ต่อยอดเมนูของเรา</th>
                    <th style="width:110px;">ราคาขาย</th>
                  </tr>
                </thead>
                <tbody>${a}</tbody>
              </table>`:'<div class="empty-note">ไม่มีเมนูย่อย</div>'}
      </div>
    `}const n=N.length>0?`<div class="photo-grid">
          ${N.map((a,l)=>`
              <div class="photo-card">
                <img src="${x(a.url)}" crossorigin="anonymous" />
                <div class="photo-caption">รูปที่ ${l+1}: ${x(a.label)}</div>
              </div>`).join("")}
        </div>`:'<div class="empty-note">ไม่มีรูปภาพในรายการนี้</div>',j=A.length>0?`<table class="data-table">
          <thead>
            <tr>
              <th style="width:45px;">#</th>
              <th>ชื่อผู้ใช้ (นามแฝง)</th>
              <th>ระดับสิทธิ์</th>
              <th>เปิดอ่านล่าสุดเมื่อ</th>
              <th style="width:100px;text-align:center;">จำนวนครั้งที่ดู</th>
            </tr>
          </thead>
          <tbody>
            ${A.map((a,l)=>`
              <tr>
                <td style="text-align:center;">${l+1}</td>
                <td><strong>${x(a.alias)}</strong> (${x(a.name)})</td>
                <td>${x(a.role.toUpperCase())}</td>
                <td>${new Date(a.lastViewedAt).toLocaleString("th-TH")}</td>
                <td style="text-align:center;font-weight:700;">${a.viewCount||1} ครั้ง</td>
              </tr>`).join("")}
          </tbody>
        </table>`:'<div class="empty-note">ยังไม่มีประวัติการเปิดอ่าน</div>',w=L.length>0?L.map((a,l)=>`
          <div class="comment-box">
            <div class="comment-header">
              <strong>ความคิดเห็นที่ #${l+1} โดย: ${x(a.author)}</strong>
              <span>${new Date(a.timestamp).toLocaleString("th-TH")}</span>
            </div>
            <div class="comment-body">${x(a.text)}</div>
            ${a.replies&&a.replies.length>0?`<div class="reply-list">
                    ${a.replies.map(g=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <strong>↳ ตอบกลับโดย: ${x(g.author)} ${g.replyToAuthor?`(ถึง @${x(g.replyToAuthor)})`:""}</strong>
                            <span>${new Date(g.timestamp).toLocaleString("th-TH")}</span>
                          </div>
                          <div>${x(g.text)}</div>
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):'<div class="empty-note">ยังไม่มีความคิดเห็นในรายการนี้</div>';return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>ฉันจะเป็นหัวแถว - ${x(k)}</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"><\/script>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Sarabun", "Segoe UI", Roboto, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      margin: 0;
      padding: 0;
      line-height: 1.45;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .toolbar-btn {
      padding: 8px 16px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-pdf { background: #059669; color: #ffffff; }
    .btn-print { background: #2563eb; color: #ffffff; }
    .btn-close { background: #334155; color: #ffffff; }
    .page-sheet {
      max-width: 210mm;
      margin: 20px auto;
      background: #ffffff;
      padding: 16mm 14mm;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
    }
    .report-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 14px;
      margin-bottom: 16px;
      gap: 16px;
    }
    .brand-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .brand-sub {
      font-size: 12px;
      color: #475569;
      margin: 2px 0 0 0;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #475569;
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      margin-bottom: 4px;
    }
    .section-box {
      margin-bottom: 18px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px;
      background: #ffffff;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 18px;
      font-size: 12px;
    }
    .info-item {
      display: flex;
      flex-direction: column;
    }
    .info-label {
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
    }
    .info-value {
      font-size: 13px;
      color: #0f172a;
      font-weight: 700;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .data-table th, .data-table td {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      text-align: left;
      vertical-align: top;
    }
    .data-table th {
      background: #f8fafc;
      font-weight: 700;
      color: #334155;
      font-size: 11px;
    }
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .photo-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      background: #f8fafc;
      page-break-inside: avoid;
    }
    .photo-card img {
      width: 100%;
      height: 155px;
      object-fit: cover;
      display: block;
    }
    .photo-caption {
      padding: 6px 8px;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
    }
    .comment-box {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
      background: #f8fafc;
      font-size: 12px;
      page-break-inside: avoid;
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #475569;
      margin-bottom: 4px;
    }
    .comment-body {
      color: #0f172a;
      font-weight: 500;
    }
    .reply-list {
      margin-top: 8px;
      padding-left: 14px;
      border-left: 3px solid #3b82f6;
    }
    .reply-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 10px;
      margin-top: 6px;
      font-size: 11px;
    }
    .empty-note {
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
      padding: 12px;
    }
    @media print {
      body { background: #ffffff; }
      .toolbar { display: none !important; }
      .page-sheet {
        max-width: 100%;
        margin: 0;
        padding: 0;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div>
      <strong style="font-size:14px;">📄 รายงานสรุป: ${x(k)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${z==="pdf"?"กำลังสร้างไฟล์ PDF ดาวน์โหลดอัตโนมัติ...":"พร้อมพิมพ์รายงาน"}
      </span>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="toolbar-btn btn-pdf" onclick="triggerDownloadPdf()">⬇ ดาวน์โหลดไฟล์ PDF</button>
      <button class="toolbar-btn btn-print" onclick="window.print()">🖨️ สั่งปริ้น (Print)</button>
      <button class="toolbar-btn btn-close" onclick="window.close()">✕ ปิดหน้านี้</button>
    </div>
  </div>

  <div id="report-content" class="page-sheet">
    <!-- Report Header -->
    <div class="report-header">
      <div class="brand-row">
        <div>
          <span class="badge">${f?"🏭 รายงานซัพพลายเออร์ & โรงงาน":"🧋 รายงานเรฟร้านน้ำ & R&D"} · ${oe}</span>
          <h1 class="brand-title">${x(k)}</h1>
          <p class="brand-sub">${x(C||"")} · หมวดหมู่: ${x(q)}</p>
        </div>
      </div>
      <div class="meta-box">
        <div style="font-weight:800;color:#0f172a;font-size:13px;">แพลตฟอร์ม: ฉันจะเป็นหัวแถว</div>
        <div>รหัสอ้างอิง: ${x(i.id)}</div>
        <div>สถานะรับช่วงต่อ: <strong>${x(re)}</strong></div>
        <div>วันที่ออกรายงาน: ${new Date().toLocaleString("th-TH")}</div>
      </div>
    </div>

    <!-- Group 1: Overview, Contacts, Location & Handoff -->
    <div class="section-box">
      <div class="section-title">📌 กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">ชื่อรายการ / ร้านค้า:</span>
          <span class="info-value">${x(k)} ${C?`(${x(C)})`:""}</span>
        </div>
        <div class="info-item">
          <span class="info-label">หมวดหมู่ & คะแนนประเมิน:</span>
          <span class="info-value">${x(q)} · ${f?`${"★".repeat((d==null?void 0:d.rating)||5)} (${(d==null?void 0:d.rating)||5}/5)`:`รสชาติ ${r==null?void 0:r.ratings.taste}/5 · ดีไซน์ ${r==null?void 0:r.ratings.aesthetics}/5 · คุ้มค่า ${r==null?void 0:r.ratings.value}/5`}</span>
        </div>
        <div class="info-item">
          <span class="info-label">สถานที่ / ตลาด / เมือง:</span>
          <span class="info-value">${x(le||(($=i.location)==null?void 0:$.addressText)||"-")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">พิกัด GPS (Lat, Lng):</span>
          <span class="info-value">${i.location?`${i.location.lat.toFixed(5)}, ${i.location.lng.toFixed(5)}`:"-"}</span>
        </div>
        <div class="info-item">
          <span class="info-label">ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์):</span>
          <span class="info-value">
            WeChat: ${x((f?d==null?void 0:d.wechatId:r==null?void 0:r.wechatId)||"-")} |
            LINE: ${x((f?d==null?void 0:d.lineId:r==null?void 0:r.lineId)||"-")} |
            โทร: ${x((f?d==null?void 0:d.phone:r==null?void 0:r.phone)||"-")}
          </span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก:</span>
          <span class="info-value">${x(i.creator.alias)} (${x(i.creator.name)}) · ${new Date(i.creator.timestamp).toLocaleString("th-TH")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม:</span>
          <span class="info-value">${x(i.assignedTo||"ยังไม่ระบุ")} · กำหนดติดตาม: ${x(i.targetFollowUpDate||"-")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">จำนวนผู้กดถูกใจ (Likes) & เปิดอ่าน:</span>
          <span class="info-value">ถูกใจ ${ne.length} คน · เปิดอ่านแล้ว ${A.length} คน</span>
        </div>
      </div>

      ${(f?d!=null&&d.memo:r!=null&&r.tastingNotes)?`<div style="margin-top:12px;padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:12px;">
              <strong>📝 บันทึกภาพรวมหน้างาน:</strong> ${x(f?d==null?void 0:d.memo:r==null?void 0:r.tastingNotes)}
            </div>`:""}

      ${i.handoffNotes?`<div style="margin-top:8px;padding:10px;background:#ecfdf5;border-radius:8px;border:1px solid #a7f3d0;font-size:12px;color:#065f46;">
              <strong>🤝 โน้ตการส่งมอบงาน / ผลเจรจา:</strong> ${x(i.handoffNotes)}
            </div>`:""}
    </div>

    <!-- Group 2: Catalog / Drink Items -->
    ${I}

    <!-- Group 3: All Photos of This Item -->
    <div class="section-box">
      <div class="section-title">🖼️ กลุ่มที่ 3: ภาพถ่ายทั้งหมดของรายการนี้ (${N.length} รูป)</div>
      ${n}
    </div>

    <!-- Group 4: Viewer Log (รายการ Log คนดู) -->
    <div class="section-box">
      <div class="section-title">👁️ กลุ่มที่ 4: รายการ Log ผู้เปิดอ่านข้อมูล (Viewer Log - ${A.length} คน)</div>
      ${j}
    </div>

    <!-- Group 5: All Threaded Comments & Replies -->
    <div class="section-box">
      <div class="section-title">💬 กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${L.length} หัวข้อสนทนา)</div>
      ${w}
    </div>
  </div>

  <script>
    function triggerDownloadPdf() {
      var statusEl = document.getElementById('status-indicator');
      if (statusEl) statusEl.textContent = 'กำลังสร้างไฟล์ PDF...';
      var element = document.getElementById('report-content');
      if (window.html2pdf) {
        var opt = {
          margin: [8, 8, 8, 8],
          filename: ${JSON.stringify(D)},
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true, allowTaint: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        window.html2pdf().set(opt).from(element).save().then(function() {
          if (statusEl) statusEl.textContent = '✅ ดาวน์โหลดไฟล์ PDF สำเร็จแล้ว!';
        }).catch(function() {
          window.print();
        });
      } else {
        window.print();
      }
    }

    window.addEventListener('load', function() {
      var mode = ${JSON.stringify(z)};
      setTimeout(function() {
        if (mode === 'pdf') {
          triggerDownloadPdf();
        } else {
          window.print();
        }
      }, 600);
    });
  <\/script>
</body>
</html>`}function Fe(i,S,z){const f=bt(i,S,z),d=window.open("","_blank");if(d)d.document.open(),d.document.write(f),d.document.close();else{const r=new Blob([f],{type:"text/html;charset=utf-8"}),k=URL.createObjectURL(r),C=document.createElement("a");C.href=k,C.target="_blank",C.click()}}const jt=({item:i,isOpen:S,onClose:z,onShareToLine:f})=>{var Se,Re,ze,Ue,Ae,Le,De,Ee,Te;const{currentUser:d,convertCnyToThb:r,addReviewerNote:k,addReviewReply:C,updatePipelineStatus:q,toggleLikeItem:le,suppliers:oe,drinkStores:N,quickMessages:A,recordItemView:ne,canEditItems:L,canComment:D,openEditItem:ie}=Je(),re=i&&i.type==="supplier"?oe.find(t=>t.id===i.id):null,I=i&&i.type==="drink_store"?N.find(t=>t.id===i.id):null,n=re||I||i,[j,w]=y.useState(null),[M,E]=y.useState(""),[de,F]=y.useState(!1),[U,R]=y.useState(null),W=T.useRef(null),$=T.useRef(null),[a,l]=y.useState(null),[g,je]=y.useState({}),[Oe,Ke]=y.useState({}),[Q,ce]=y.useState(null),[J,xe]=y.useState(null),[_,we]=y.useState(!1),[H,Z]=y.useState({}),ye=T.useRef(null),Ne=T.useRef(null);T.useRef(null),T.useRef(null),y.useEffect(()=>{S&&(i!=null&&i.id)&&ne(i.id,i.type),w(null),F(!1),R(null)},[S,i==null?void 0:i.id]);const h=[];if(n)if(n.type==="supplier"){const t=n;(Se=t.photos.storefrontAndAtmosphere)==null||Se.forEach((s,o)=>h.push({url:s,label:`ป้ายหน้าร้าน/บรรยากาศ #${o+1}`})),(Re=t.photos.contactCards)==null||Re.forEach((s,o)=>h.push({url:s,label:`นามบัตร/WeChat #${o+1}`})),(ze=t.catalogItems)==null||ze.forEach((s,o)=>{s.photo&&h.push({url:s.photo,label:s.name?`สินค้า: ${s.name}`:`รายการสินค้า #${o+1}`})})}else{const t=n;(Ue=t.photos.storefrontAndAtmosphere)==null||Ue.forEach((s,o)=>h.push({url:s,label:`หน้าร้าน/บรรยากาศ #${o+1}`})),(Ae=t.photos.menuBoard)==null||Ae.forEach((s,o)=>h.push({url:s,label:`เมนูบอร์ด #${o+1}`})),(Le=t.photos.drinkCups)==null||Le.forEach((s,o)=>h.push({url:s,label:`แก้วเครื่องดื่ม #${o+1}`})),(De=t.drinkItems)==null||De.forEach((s,o)=>{s.photo&&h.push({url:s.photo,label:s.name?`เมนู: ${s.name}`:`เมนูชิม #${o+1}`})})}if(y.useEffect(()=>{if(j===null||h.length===0)return;const t=s=>{s.key==="ArrowRight"?w(o=>o!==null?(o+1)%h.length:null):s.key==="ArrowLeft"?w(o=>o!==null?(o-1+h.length)%h.length:null):s.key==="Escape"&&w(null)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[j,h.length]),!S||!n)return null;const v=n.type==="supplier",m=v?n:null,p=v?null:n,X=Array.isArray(n.likes)?n.likes:[],$e=X.some(t=>t.userId===d.id),ke=t=>{const s=h.findIndex(o=>o.url===t);w(s>=0?s:0)},Y=async(t,s,o)=>{try{we(!0);const u=await dt(t,{recordId:n.id,recordType:n.type,recordTitle:v?m==null?void 0:m.name:p==null?void 0:p.storeName});o?Z(b=>({...b,[o]:{...b[o],...s==="photo"?{photoUrl:u}:{voiceUrl:u}}})):s==="photo"?ce(u):xe(u)}catch(u){alert(u.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{we(!1)}},qe=async t=>{t.preventDefault();const s=M.trim();!s&&!Q&&!J||!await k(n.id,n.type,s,{photoUrl:Q||void 0,voiceUrl:J||void 0})||(E(""),ce(null),xe(null))},Ce=async(t,s,o)=>{const u=(g[t]||"").trim(),b=H[t];!u&&!(b!=null&&b.photoUrl)&&!(b!=null&&b.voiceUrl)||!await C(n.id,n.type,t,u,s,{photoUrl:b==null?void 0:b.photoUrl,voiceUrl:b==null?void 0:b.voiceUrl,replyToId:o})||(je({...g,[t]:""}),Z(te=>({...te,[t]:{}})),l(null))},We=t=>{m&&q(m.id,t)},ee=O(n),Qe=((Ee=ee[0])==null?void 0:Ee.url)||(v?m==null?void 0:m.voiceNoteUrl:p==null?void 0:p.voiceNoteUrl)||((v?m!=null&&m.voiceDurationSec:p!=null&&p.voiceDurationSec)?be(4):void 0),pe=(t,s)=>{$.current&&(U===t?($.current.pause(),R(null)):($.current.src=s||be(4),$.current.play().then(()=>R(t)).catch(()=>{$.current&&($.current.src=be(4),$.current.play(),R(t))})))};return e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 ${v?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`,children:v?e.jsx(Ze,{className:"w-5 h-5 text-emerald-600"}):e.jsx(Pe,{className:"w-5 h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("h2",{className:"font-bold text-slate-900 text-sm sm:text-base truncate",children:v?m==null?void 0:m.name:p==null?void 0:p.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate",children:v?(m==null?void 0:m.chineseName)||(m==null?void 0:m.marketOrCity):(p==null?void 0:p.chineseName)||(p==null?void 0:p.storeCategory)||(p==null?void 0:p.brandConcept)})]})]}),e.jsxs("div",{className:"flex items-center gap-1 sm:gap-1.5 shrink-0",children:[L&&e.jsx("button",{type:"button",onClick:()=>ie(n),className:"p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 shadow-2xs active:scale-95 transition-all flex items-center justify-center",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:e.jsx(Ie,{className:"w-4 h-4 text-amber-600"})}),e.jsxs("button",{type:"button",onClick:()=>le(n.id,n.type),className:`p-2 rounded-xl border transition-all active:scale-95 flex items-center gap-1 text-xs font-bold ${$e?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${X.length})`,children:[e.jsx(Xe,{className:`w-4 h-4 ${$e?"fill-blue-600 text-blue-600":""}`}),X.length>0&&e.jsx("span",{className:"text-[11px] font-mono font-bold leading-none",children:X.length})]}),e.jsx("button",{type:"button",onClick:()=>f(n),className:"p-2 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white transition-all shadow-2xs active:scale-95 flex items-center justify-center",title:"แชร์ลิงก์เข้า LINE",children:e.jsx(Ye,{className:"w-4 h-4"})}),e.jsx("button",{type:"button",onClick:()=>Fe(n,r,"pdf"),className:"p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-2xs active:scale-95 flex items-center justify-center",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:e.jsx(pt,{className:"w-4 h-4 text-emerald-400"})}),e.jsx("button",{type:"button",onClick:()=>Fe(n,r,"print"),className:"p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200/80 active:scale-95 flex items-center justify-center",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:e.jsx(ht,{className:"w-4 h-4 text-slate-700"})}),e.jsx("button",{type:"button",onClick:z,className:"p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center ml-0.5",title:"ปิดหน้าต่าง",children:e.jsx(P,{className:"w-4 h-4"})})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(fe,{src:n.creator.avatar,alt:n.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",n.creator.alias," (",n.creator.name,")"]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(n.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(et,{viewedBy:n.viewedBy,size:"md"}),v&&m&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:m.status,onChange:t=>We(t.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),ee.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(ue,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",ee.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังแต่ละคลิป"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:ee.map((t,s)=>{const o=U===`main-${t.id||s}`;return e.jsx("div",{className:"p-2 bg-white border border-emerald-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs",children:e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[e.jsx("button",{type:"button",onClick:()=>pe(`main-${t.id||s}`,t.url),className:"w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0",children:o?e.jsx(ge,{className:"w-3.5 h-3.5"}):e.jsx(ve,{className:"w-3.5 h-3.5 ml-0.5"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"text-xs font-bold text-slate-900 truncate",children:t.label||`คลิปเสียง #${s+1}`}),e.jsxs("div",{className:"text-[10px] text-emerald-700 font-mono",children:[t.durationSec||4," วินาที ·"," ",o?"กำลังเล่น...":"แตะเพื่อฟัง"]})]})]})},t.id||s)})}),e.jsx("audio",{ref:W,src:Qe,onEnded:()=>F(!1),className:"hidden"})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",children:[e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1",children:[e.jsxs("div",{className:"text-slate-400 font-semibold flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(tt,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{children:"พิกัดสถานที่ / ตลาด / เมือง:"})]}),n.location&&e.jsx("a",{href:`https://www.google.com/maps?q=${n.location.lat},${n.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[10px] font-bold text-emerald-700 hover:underline",children:"เปิด Google Maps ↗"})]}),e.jsx("div",{className:"text-slate-900 font-bold",children:v?m==null?void 0:m.marketOrCity:((Te=p==null?void 0:p.location)==null?void 0:Te.addressText)||(p==null?void 0:p.city)}),n.location&&e.jsxs("div",{className:"text-[11px] text-slate-500 font-mono",children:["Lat: ",n.location.lat.toFixed(4),", Lng:"," ",n.location.lng.toFixed(4)]})]}),v&&m?e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1",children:[e.jsxs("div",{className:"text-slate-400 font-semibold flex items-center gap-1",children:[e.jsx(st,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{children:"จุดเด่นทางลัดที่บันทึกไว้:"})]}),e.jsx("div",{className:"flex flex-wrap gap-1 pt-0.5",children:(m.quickTags||[]).map((t,s)=>e.jsxs("span",{className:"text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700",children:["✓ ",t]},s))})]}):p?e.jsxs("div",{className:"p-3 bg-amber-50/40 rounded-xl border border-amber-200/70 space-y-1",children:[e.jsxs("div",{className:"text-amber-800 font-semibold flex items-center gap-1",children:[e.jsx(Pe,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"หมวดหมู่เรฟ & คอนเซปต์:"})]}),e.jsx("div",{className:"text-xs font-bold text-slate-900",children:p.storeCategory||"ชาจีนพรีเมียม"}),p.brandConcept&&e.jsx("div",{className:"text-[11px] text-slate-600",children:p.brandConcept})]}):null]}),v&&m&&(m.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(m.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(m.catalogItems||[]).map((t,s)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[t.photo?e.jsx("img",{src:t.photo,alt:"",onClick:()=>ke(t.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:t.name||`รายการที่ ${s+1}`}),t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",t.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",r(t.priceRmb).toLocaleString(),"฿)"]})]}),t.priceThb&&!t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",t.priceThb.toLocaleString()]}),t.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:t.weightKg})]}),t.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 line-clamp-2",children:t.memo}),O(t).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:O(t).map((o,u)=>{const b=`${t.id}-v-${o.id||u}`;return e.jsxs("button",{type:"button",onClick:()=>pe(b,o.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold",children:[U===b?e.jsx(ge,{className:"w-2.5 h-2.5"}):e.jsx(ve,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[o.label||`ฟังเสียง #${u+1}`," (",o.durationSec||4,"s)"]})]},b)})})]})]},t.id||s))})]}),!v&&p&&(p.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(p.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(p.drinkItems||[]).map((t,s)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[t.photo&&e.jsx("img",{src:t.photo,alt:"",onClick:()=>ke(t.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:t.name||`แก้วที่ #${s+1}`}),t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",t.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",r(t.priceRmb),"฿)"]})]}),t.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",t.fitMenuTarget]}),t.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:t.gimmickNotes}),O(t).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:O(t).map((o,u)=>{const b=`${t.id}-v-${o.id||u}`;return e.jsxs("button",{type:"button",onClick:()=>pe(b,o.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold",children:[U===b?e.jsx(ge,{className:"w-2.5 h-2.5"}):e.jsx(ve,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[o.label||`ฟังเสียง #${u+1}`," (",o.durationSec||4,"s)"]})]},b)})})]})]},t.id||s))})]}),e.jsx("audio",{ref:$,onEnded:()=>R(null),className:"hidden"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",h.length," รูป — แตะเพื่อขยายและเลื่อนซ้าย-ขวา):"]}),e.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 gap-2",children:h.map((t,s)=>e.jsxs("div",{onClick:()=>w(s),className:"group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 shadow-xs",children:[e.jsx("img",{src:t.url,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[s+1,"/",h.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:t.label})]},s))})]}),n.videos&&n.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",n.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:n.videos.map((t,s)=>e.jsx(ct,{src:t,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${s+1}`},s))})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(at,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[n.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:n.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):n.reviewerNotes.map(t=>{var u,b,me,te;const s=t.replies||[],o=Oe[t.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(fe,{src:t.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:t.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(t.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:t.text}),t.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:t.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(t.photoUrl,"_blank")})}),(t.voiceUrl||t.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(ue,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:t.voiceUrl||t.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[D&&e.jsxs("button",{type:"button",onClick:()=>l((a==null?void 0:a.noteId)===t.id&&a.author===t.author?null:{noteId:t.id,author:t.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(Me,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),s.length>0&&e.jsx("button",{type:"button",onClick:()=>Ke(c=>({...c,[t.id]:!c[t.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:o?e.jsxs(e.Fragment,{children:[e.jsx(lt,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",s.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(ot,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",s.length,")"]})]})})]})]})]}),s.length>0&&!o&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:s.map(c=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(fe,{src:c.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:c.author}),c.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",c.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(c.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:c.text}),c.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:c.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(c.photoUrl,"_blank")})}),(c.voiceUrl||c.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(ue,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:c.voiceUrl||c.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:D&&e.jsxs("button",{type:"button",onClick:()=>l({noteId:t.id,author:c.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(Me,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",c.author," ต่อ"]})]})})]},c.id))}),D&&(a==null?void 0:a.noteId)===t.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((u=H[t.id])==null?void 0:u.photoUrl)||((b=H[t.id])==null?void 0:b.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((me=H[t.id])==null?void 0:me.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(se,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>Z(c=>({...c,[t.id]:{...c[t.id],photoUrl:void 0}})),children:e.jsx(P,{className:"w-2.5 h-2.5"})})]}),((te=H[t.id])==null?void 0:te.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(ae,{className:"w-3 h-3"})," เสียงพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>Z(c=>({...c,[t.id]:{...c[t.id],voiceUrl:void 0}})),children:e.jsx(P,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${a.author} ในฐานะ ${d.alias}...`,value:g[t.id]||"",onChange:c=>je({...g,[t.id]:c.target.value}),className:"flex-1 bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:c=>{c.key==="Enter"&&(c.preventDefault(),Ce(t.id,a.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const c=document.createElement("input");c.type="file",c.accept="image/*",c.onchange=he=>{var V,G;const B=(G=(V=he.target)==null?void 0:V.files)==null?void 0:G[0];B&&Y(B,"photo",t.id)},c.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(se,{className:"w-3.5 h-3.5"})}),e.jsx("button",{type:"button",title:"แนบเสียงในคำตอบกลับ",onClick:()=>{const c=document.createElement("input");c.type="file",c.accept="audio/*",c.onchange=he=>{var V,G;const B=(G=(V=he.target)==null?void 0:V.files)==null?void 0:G[0];B&&Y(B,"audio",t.id)},c.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(ae,{className:"w-3.5 h-3.5"})}),e.jsx("button",{type:"button",onClick:()=>Ce(t.id,a.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),D&&e.jsx("button",{type:"button",onClick:()=>l(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},t.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(xt,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:A.map(t=>e.jsxs("button",{type:"button",onClick:()=>E(t.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:t.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:t.title})]},t.id))})]}),d.role==="viewer"?null:e.jsxs("form",{onSubmit:qe,className:"space-y-2 pt-1",children:[(Q||J||_)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[Q&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(se,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>ce(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(P,{className:"w-3 h-3"})})]}),J&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(ae,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"เสียงพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>xe(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(P,{className:"w-3 h-3"})})]}),_&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(mt,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อเข้า Google Drive..."})]})]}),e.jsxs("div",{className:"flex gap-1.5",children:[e.jsx("input",{ref:ye,type:"file",accept:"image/*",className:"hidden",onChange:t=>{var o;const s=(o=t.target.files)==null?void 0:o[0];s&&Y(s,"photo"),t.target.value=""}}),e.jsx("input",{ref:Ne,type:"file",accept:"audio/*",className:"hidden",onChange:t=>{var o;const s=(o=t.target.files)==null?void 0:o[0];s&&Y(s,"audio"),t.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${d.alias}...`,value:M,onChange:t=>E(t.target.value),className:"flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsx("button",{type:"button",title:"แนบรูปภาพเข้า Google Drive",disabled:_,onClick:()=>{var t;return(t=ye.current)==null?void 0:t.click()},className:"p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-colors",children:e.jsx(se,{className:"w-4 h-4"})}),e.jsx("button",{type:"button",title:"แนบเสียง/บันทึกเสียงเข้า Google Drive",disabled:_,onClick:()=>{var t;return(t=Ne.current)==null?void 0:t.click()},className:"p-2 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-500 hover:text-blue-700 transition-colors",children:e.jsx(ae,{className:"w-4 h-4"})}),e.jsxs("button",{type:"submit",disabled:_,className:"px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(nt,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]})]}),e.jsxs("div",{className:"p-3.5 border-t border-slate-100 bg-white flex items-center justify-between",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["ID: ",n.id," · ปรับปรุง:"," ",new Date(n.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center gap-2",children:[L&&e.jsxs("button",{type:"button",onClick:()=>ie(n),className:"px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 transition-colors",children:[e.jsx(Ie,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"แก้ไขข้อมูลรายการนี้"})]}),e.jsx("button",{onClick:z,className:"px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors",children:"ปิดหน้าต่าง"})]})]})]}),j!==null&&h[j]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>w(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",j+1," / ",h.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:h[j].label})]}),e.jsx("button",{type:"button",onClick:()=>w(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(P,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:t=>t.stopPropagation(),children:[h.length>1&&e.jsx("button",{type:"button",onClick:()=>w((j-1+h.length)%h.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(it,{className:"w-6 h-6"})}),e.jsx("img",{src:h[j].url,alt:h[j].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),h.length>1&&e.jsx("button",{type:"button",onClick:()=>w((j+1)%h.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(rt,{className:"w-6 h-6"})})]}),h.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:t=>t.stopPropagation(),children:h.map((t,s)=>e.jsx("button",{type:"button",onClick:()=>w(s),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${s===j?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:t.url,className:"w-full h-full object-cover"})},s))})]})]})};export{jt as DetailModal};
