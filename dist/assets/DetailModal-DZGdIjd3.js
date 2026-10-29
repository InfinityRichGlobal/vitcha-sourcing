import{c as Y,u as rt,r as j,H as D,z as Z,I as Ne,j as e,F as it,n as dt,X as V,P as Qe,J as ct,K as xt,w as ce,f as pt,V as $e,M as mt,e as ht,N as Ke,O as bt,Q as ft,W as xe,S as ut,Y as gt,C as vt,G as wt}from"./index-BPrlF5sS.js";import{V as jt}from"./VideoPlayer-CP--n27M.js";import{M as pe}from"./mic-BLkB8cxk.js";import{Z as yt}from"./zap-2A7012yp.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Ze.node;const Nt=Y(Ze);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};Ye.node;const $t=Y(Ye);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Xe.node;const ke=Y(Xe);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};et.node;const Ce=Y(et);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};tt.node;const kt=Y(tt);function p(d){return d==null?"":String(d).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ct(d,A,L){var y,q,P,ue,W,E,z,se;const g=d.type==="supplier",x=g?d:null,c=g?null:d,S=g?x.name:c.storeName,R=g?x.chineseName:c.chineseName,X=g?x.category:c.storeCategory||"เรฟร้านน้ำ",me=g?x.marketOrCity:c.city,he=d.country==="TH"?"🇹🇭 ประเทศไทย (Thailand)":"🇨🇳 ประเทศจีน (China)",$=[];x?((y=x.photos.storefrontAndAtmosphere)==null||y.forEach((i,r)=>$.push({url:i,label:`ป้ายหน้าร้าน / บรรยากาศ #${r+1}`})),(q=x.photos.contactCards)==null||q.forEach((i,r)=>$.push({url:i,label:`นามบัตร / WeChat #${r+1}`})),(P=x.catalogItems)==null||P.forEach((i,r)=>{i.photo&&$.push({url:i.photo,label:i.name?`สินค้า: ${i.name}`:`รายการสินค้า #${r+1}`})})):c&&((ue=c.photos.storefrontAndAtmosphere)==null||ue.forEach((i,r)=>$.push({url:i,label:`หน้าร้าน / บรรยากาศ #${r+1}`})),(W=c.photos.menuBoard)==null||W.forEach((i,r)=>$.push({url:i,label:`ป้ายเมนู / ราคา #${r+1}`})),(E=c.photos.drinkCups)==null||E.forEach((i,r)=>$.push({url:i,label:`แก้วเครื่องดื่ม #${r+1}`})),(z=c.drinkItems)==null||z.forEach((i,r)=>{i.photo&&$.push({url:i.photo,label:i.name?`เมนูชิม: ${i.name}`:`แก้วชิม #${r+1}`})}));const I=Array.isArray(d.viewedBy)?d.viewedBy:[],be=Array.isArray(d.likes)?d.likes:[],B=Array.isArray(d.reviewerNotes)?d.reviewerNotes:[],ee=`ฉันจะเป็นหัวแถว-${S.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,te={awaiting:"1. รอรับช่วงต่อ",rfq_sent:"2. ขอสเปก / ส่ง RFQ",sample_test:"3. ทดสอบตัวอย่าง Lab / R&D",negotiate:"4. ต่อรองราคา & MOQ",approved:"5. ตัวเต็งอนุมัติ",ordered:"6. สั่งซื้อสำเร็จ"}[d.handoffStage||"awaiting"]||"1. รอรับช่วงต่อ";let G="";if(g&&x){const i=(x.catalogItems||[]).map((r,w)=>`
        <tr>
          <td style="text-align:center;font-weight:700;">${w+1}</td>
          <td style="width:76px;">
            ${r.photo?`<img src="${p(r.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`:'<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>'}
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${p(r.name||`รายการที่ #${w+1}`)}</div>
            ${r.memo?`<div style="font-size:11px;color:#475569;margin-top:3px;">${p(r.memo)}</div>`:""}
          </td>
          <td>${p(r.dimensions||"-")} / ${p(r.weightKg||"-")}</td>
          <td style="font-weight:700;color:#047857;">
            ${r.priceRmb?`¥${r.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${A(r.priceRmb).toLocaleString()})</div>`:r.priceThb?`฿${r.priceThb.toLocaleString()}`:"-"}
          </td>
        </tr>`).join("");G=`
      <div class="section-box">
        <div class="section-title">📦 กลุ่มที่ 2: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(x.catalogItems||[]).length} รายการ)</div>
        ${i?`<table class="data-table">
                <thead>
                  <tr>
                    <th style="width:40px;">#</th>
                    <th style="width:80px;">รูปภาพ</th>
                    <th>ชื่อรายการ & รายละเอียดสเปก</th>
                    <th style="width:140px;">ขนาด / น้ำหนัก</th>
                    <th style="width:130px;">ราคาประเมิน</th>
                  </tr>
                </thead>
                <tbody>${i}</tbody>
              </table>`:'<div class="empty-note">ไม่มีรายการย่อย</div>'}
      </div>
    `}else if(c){const i=(c.drinkItems||[]).map((r,w)=>`
        <tr>
          <td style="text-align:center;font-weight:700;">${w+1}</td>
          <td style="width:76px;">
            ${r.photo?`<img src="${p(r.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`:'<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>'}
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${p(r.name||`แก้วที่ #${w+1}`)}</div>
            ${r.gimmickNotes?`<div style="font-size:11px;color:#475569;margin-top:3px;">กิมมิก: ${p(r.gimmickNotes)}</div>`:""}
          </td>
          <td>${p(r.cupSize||"-")}</td>
          <td>${p(r.fitMenuTarget||"-")}</td>
          <td style="font-weight:700;color:#b45309;">
            ${r.priceRmb?`¥${r.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${A(r.priceRmb).toLocaleString()})</div>`:r.priceThb?`฿${r.priceThb.toLocaleString()}`:"-"}
          </td>
        </tr>`).join("");G=`
      <div class="section-box">
        <div class="section-title">🧋 กลุ่มที่ 2: เมนูที่ชิม & การถอดรหัสสูตร (${(c.drinkItems||[]).length} เมนู)</div>
        ${i?`<table class="data-table">
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
                <tbody>${i}</tbody>
              </table>`:'<div class="empty-note">ไม่มีเมนูย่อย</div>'}
      </div>
    `}const fe=$.length>0?`<div class="photo-grid">
          ${$.map((i,r)=>`
              <div class="photo-card">
                <img src="${p(i.url)}" crossorigin="anonymous" />
                <div class="photo-caption">รูปที่ ${r+1}: ${p(i.label)}</div>
              </div>`).join("")}
        </div>`:'<div class="empty-note">ไม่มีรูปภาพในรายการนี้</div>',a=I.length>0?`<table class="data-table">
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
            ${I.map((i,r)=>`
              <tr>
                <td style="text-align:center;">${r+1}</td>
                <td><strong>${p(i.alias)}</strong> (${p(i.name)})</td>
                <td>${p(i.role.toUpperCase())}</td>
                <td>${new Date(i.lastViewedAt).toLocaleString("th-TH")}</td>
                <td style="text-align:center;font-weight:700;">${i.viewCount||1} ครั้ง</td>
              </tr>`).join("")}
          </tbody>
        </table>`:'<div class="empty-note">ยังไม่มีประวัติการเปิดอ่าน</div>',N=B.length>0?B.map((i,r)=>`
          <div class="comment-box">
            <div class="comment-header">
              <strong>ความคิดเห็นที่ #${r+1} โดย: ${p(i.author)}</strong>
              <span>${new Date(i.timestamp).toLocaleString("th-TH")}</span>
            </div>
            <div class="comment-body">${p(i.text)}</div>
            ${i.replies&&i.replies.length>0?`<div class="reply-list">
                    ${i.replies.map(w=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <strong>↳ ตอบกลับโดย: ${p(w.author)} ${w.replyToAuthor?`(ถึง @${p(w.replyToAuthor)})`:""}</strong>
                            <span>${new Date(w.timestamp).toLocaleString("th-TH")}</span>
                          </div>
                          <div>${p(w.text)}</div>
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):'<div class="empty-note">ยังไม่มีความคิดเห็นในรายการนี้</div>';return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>ฉันจะเป็นหัวแถว - ${p(S)}</title>
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
      <strong style="font-size:14px;">📄 รายงานสรุป: ${p(S)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${L==="pdf"?"กำลังสร้างไฟล์ PDF ดาวน์โหลดอัตโนมัติ...":"พร้อมพิมพ์รายงาน"}
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
          <span class="badge">${g?"🏭 รายงานซัพพลายเออร์ & โรงงาน":"🧋 รายงานเรฟร้านน้ำ & R&D"} · ${he}</span>
          <h1 class="brand-title">${p(S)}</h1>
          <p class="brand-sub">${p(R||"")} · หมวดหมู่: ${p(X)}</p>
        </div>
      </div>
      <div class="meta-box">
        <div style="font-weight:800;color:#0f172a;font-size:13px;">แพลตฟอร์ม: ฉันจะเป็นหัวแถว</div>
        <div>รหัสอ้างอิง: ${p(d.id)}</div>
        <div>สถานะรับช่วงต่อ: <strong>${p(te)}</strong></div>
        <div>วันที่ออกรายงาน: ${new Date().toLocaleString("th-TH")}</div>
      </div>
    </div>

    <!-- Group 1: Overview, Contacts, Location & Handoff -->
    <div class="section-box">
      <div class="section-title">📌 กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">ชื่อรายการ / ร้านค้า:</span>
          <span class="info-value">${p(S)} ${R?`(${p(R)})`:""}</span>
        </div>
        <div class="info-item">
          <span class="info-label">หมวดหมู่ & คะแนนประเมิน:</span>
          <span class="info-value">${p(X)} · ${g?`${"★".repeat((x==null?void 0:x.rating)||5)} (${(x==null?void 0:x.rating)||5}/5)`:`รสชาติ ${c==null?void 0:c.ratings.taste}/5 · ดีไซน์ ${c==null?void 0:c.ratings.aesthetics}/5 · คุ้มค่า ${c==null?void 0:c.ratings.value}/5`}</span>
        </div>
        <div class="info-item">
          <span class="info-label">สถานที่ / ตลาด / เมือง:</span>
          <span class="info-value">${p(me||((se=d.location)==null?void 0:se.addressText)||"-")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">พิกัด GPS (Lat, Lng):</span>
          <span class="info-value">${d.location?`${d.location.lat.toFixed(5)}, ${d.location.lng.toFixed(5)}`:"-"}</span>
        </div>
        <div class="info-item">
          <span class="info-label">ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์):</span>
          <span class="info-value">
            WeChat: ${p((g?x==null?void 0:x.wechatId:c==null?void 0:c.wechatId)||"-")} |
            LINE: ${p((g?x==null?void 0:x.lineId:c==null?void 0:c.lineId)||"-")} |
            โทร: ${p((g?x==null?void 0:x.phone:c==null?void 0:c.phone)||"-")}
          </span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก:</span>
          <span class="info-value">${p(d.creator.alias)}${d.creator.name&&d.creator.name!==d.creator.alias?` (${p(d.creator.name)})`:""} · ${new Date(d.creator.timestamp).toLocaleString("th-TH")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม:</span>
          <span class="info-value">${p(d.assignedTo||"ยังไม่ระบุ")} · กำหนดติดตาม: ${p(d.targetFollowUpDate||"-")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">จำนวนผู้กดถูกใจ (Likes) & เปิดอ่าน:</span>
          <span class="info-value">ถูกใจ ${be.length} คน · เปิดอ่านแล้ว ${I.length} คน</span>
        </div>
      </div>

      ${(g?x!=null&&x.memo:c!=null&&c.tastingNotes)?`<div style="margin-top:12px;padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:12px;">
              <strong>📝 บันทึกภาพรวมหน้างาน:</strong> ${p(g?x==null?void 0:x.memo:c==null?void 0:c.tastingNotes)}
            </div>`:""}

      ${d.handoffNotes?`<div style="margin-top:8px;padding:10px;background:#ecfdf5;border-radius:8px;border:1px solid #a7f3d0;font-size:12px;color:#065f46;">
              <strong>🤝 โน้ตการส่งมอบงาน / ผลเจรจา:</strong> ${p(d.handoffNotes)}
            </div>`:""}
    </div>

    <!-- Group 2: Catalog / Drink Items -->
    ${G}

    <!-- Group 3: All Photos of This Item -->
    <div class="section-box">
      <div class="section-title">🖼️ กลุ่มที่ 3: ภาพถ่ายทั้งหมดของรายการนี้ (${$.length} รูป)</div>
      ${fe}
    </div>

    <!-- Group 4: Viewer Log (รายการ Log คนดู) -->
    <div class="section-box">
      <div class="section-title">👁️ กลุ่มที่ 4: รายการ Log ผู้เปิดอ่านข้อมูล (Viewer Log - ${I.length} คน)</div>
      ${a}
    </div>

    <!-- Group 5: All Threaded Comments & Replies -->
    <div class="section-box">
      <div class="section-title">💬 กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${B.length} หัวข้อสนทนา)</div>
      ${N}
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
          filename: ${JSON.stringify(ee)},
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
      var mode = ${JSON.stringify(L)};
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
</html>`}function Je(d,A,L){const g=Ct(d,A,L),x=window.open("","_blank");if(x)x.document.open(),x.document.write(g),x.document.close();else{const c=new Blob([g],{type:"text/html;charset=utf-8"}),S=URL.createObjectURL(c),R=document.createElement("a");R.href=S,R.target="_blank",R.click()}}const At=({item:d,isOpen:A,onClose:L,onShareToLine:g})=>{var Me,Fe,He,_e,Ve,Be,Oe,Ge,qe,We;const{currentUser:x,convertCnyToThb:c,addReviewerNote:S,addReviewReply:R,updatePipelineStatus:X,toggleLikeItem:me,suppliers:he,drinkStores:$,users:I,quickMessages:be,recordItemView:B,canEditItems:ee,canComment:O,openEditItem:te}=rt(),G=d&&d.type==="supplier"?he.find(t=>t.id===d.id):null,fe=d&&d.type==="drink_store"?$.find(t=>t.id===d.id):null,a=G||fe||d,[N,y]=j.useState(null),[q,P]=j.useState(""),[ue,W]=j.useState(!1),[E,z]=j.useState(null),se=D.useRef(null),i=D.useRef(null),[r,w]=j.useState(null),[ae,Se]=j.useState({}),[st,at]=j.useState({}),[le,ge]=j.useState(null),[Q,ve]=j.useState(null),[M,Re]=j.useState(!1),[F,ne]=j.useState({}),Te=D.useRef(null),[T,K]=j.useState(null),[Ue,Ae]=j.useState(0),H=D.useRef(null),_=D.useRef(null),C=D.useRef(null),ze=D.useRef(0),De=D.useCallback(()=>{var t;if(C.current&&(clearInterval(C.current),C.current=null),H.current&&H.current.state==="recording"){H.current.stop();return}(t=_.current)==null||t.getTracks().forEach(s=>s.stop()),_.current=null,K(null)},[]);j.useEffect(()=>(A&&(d!=null&&d.id)&&B(d.id,d.type),y(null),W(!1),z(null),()=>{var t,s;C.current&&clearInterval(C.current),((t=H.current)==null?void 0:t.state)==="recording"&&H.current.stop(),(s=_.current)==null||s.getTracks().forEach(l=>l.stop())}),[A,d==null?void 0:d.id]);const b=[];if(a)if(a.type==="supplier"){const t=a;(Me=t.photos.storefrontAndAtmosphere)==null||Me.forEach((s,l)=>b.push({url:s,label:`ป้ายหน้าร้าน/บรรยากาศ #${l+1}`})),(Fe=t.photos.contactCards)==null||Fe.forEach((s,l)=>b.push({url:s,label:`นามบัตร/WeChat #${l+1}`})),(He=t.catalogItems)==null||He.forEach((s,l)=>{s.photo&&b.push({url:s.photo,label:s.name?`สินค้า: ${s.name}`:`รายการสินค้า #${l+1}`})})}else{const t=a;(_e=t.photos.storefrontAndAtmosphere)==null||_e.forEach((s,l)=>b.push({url:s,label:`หน้าร้าน/บรรยากาศ #${l+1}`})),(Ve=t.photos.menuBoard)==null||Ve.forEach((s,l)=>b.push({url:s,label:`เมนูบอร์ด #${l+1}`})),(Be=t.photos.drinkCups)==null||Be.forEach((s,l)=>b.push({url:s,label:`แก้วเครื่องดื่ม #${l+1}`})),(Oe=t.drinkItems)==null||Oe.forEach((s,l)=>{s.photo&&b.push({url:s.photo,label:s.name?`เมนู: ${s.name}`:`เมนูชิม #${l+1}`})})}if(j.useEffect(()=>{if(N===null||b.length===0)return;const t=s=>{s.key==="ArrowRight"?y(l=>l!==null?(l+1)%b.length:null):s.key==="ArrowLeft"?y(l=>l!==null?(l-1+b.length)%b.length:null):s.key==="Escape"&&y(null)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[N,b.length]),!A||!a)return null;const u=a.type==="supplier",n=u?a:null,o=u?null:a,oe=Array.isArray(a.likes)?a.likes:[],Le=oe.some(t=>t.userId===x.id),Ee=t=>{const s=b.findIndex(l=>l.url===t);y(s>=0?s:0)},we=async(t,s,l)=>{try{Re(!0);const f=await wt(t,{recordId:a.id,recordType:a.type,recordTitle:u?n==null?void 0:n.name:o==null?void 0:o.storeName});l?ne(h=>({...h,[l]:{...h[l],...s==="photo"?{photoUrl:f}:{voiceUrl:f}}})):s==="photo"?ge(f):ve(f)}catch(f){alert(f.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{Re(!1)}},Ie=async t=>{var s,l;if(T===t){De();return}T&&De();try{if(!((s=navigator.mediaDevices)!=null&&s.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const f=await navigator.mediaDevices.getUserMedia({audio:!0});_.current=f;const h=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(v=>MediaRecorder.isTypeSupported(v)),k=new MediaRecorder(f,h?{mimeType:h}:void 0);H.current=k;const U=[];k.ondataavailable=v=>{v.data.size>0&&U.push(v.data)},k.onstop=()=>{var J;C.current&&(clearInterval(C.current),C.current=null),f.getTracks().forEach(de=>de.stop()),_.current=null,K(null);const v=((J=k.mimeType)==null?void 0:J.split(";")[0])||"audio/webm",m=new Blob(U,{type:v});if(!m.size)return;const ye=v.includes("mp4")?"m4a":v.includes("ogg")?"ogg":"webm",ie=new File([m],`เสียงคอมเมนต์-${Date.now()}.${ye}`,{type:v});we(ie,"audio",t==="main"?void 0:t)},k.onerror=()=>{C.current&&clearInterval(C.current),f.getTracks().forEach(v=>v.stop()),K(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},ze.current=Date.now(),Ae(0),K(t),k.start(250),C.current=setInterval(()=>{Ae(Math.round((Date.now()-ze.current)/1e3))},1e3)}catch{(l=_.current)==null||l.getTracks().forEach(f=>f.stop()),K(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},lt=async t=>{t.preventDefault();const s=q.trim();!s&&!le&&!Q||!await S(a.id,a.type,s,{photoUrl:le||void 0,voiceUrl:Q||void 0})||(P(""),ge(null),ve(null))},Pe=async(t,s,l)=>{const f=(ae[t]||"").trim(),h=F[t];!f&&!(h!=null&&h.photoUrl)&&!(h!=null&&h.voiceUrl)||!await R(a.id,a.type,t,f,s,{photoUrl:h==null?void 0:h.photoUrl,voiceUrl:h==null?void 0:h.voiceUrl,replyToId:l})||(Se({...ae,[t]:""}),ne(U=>({...U,[t]:{}})),w(null))},nt=t=>{n&&X(n.id,t)},re=Z(a),ot=((Ge=re[0])==null?void 0:Ge.url)||(u?n==null?void 0:n.voiceNoteUrl:o==null?void 0:o.voiceNoteUrl)||((u?n!=null&&n.voiceDurationSec:o!=null&&o.voiceDurationSec)?Ne(4):void 0),je=(t,s)=>{i.current&&(E===t?(i.current.pause(),z(null)):(i.current.src=s||Ne(4),i.current.play().then(()=>z(t)).catch(()=>{i.current&&(i.current.src=Ne(4),i.current.play(),z(t))})))};return e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${u?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`,children:u?e.jsx(it,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):e.jsx(dt,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:u?n==null?void 0:n.name:o==null?void 0:o.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:u?(n==null?void 0:n.chineseName)||(n==null?void 0:n.marketOrCity):(o==null?void 0:o.chineseName)||(o==null?void 0:o.storeCategory)||(o==null?void 0:o.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:L,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(V,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100",children:[ee&&e.jsxs("button",{type:"button",onClick:()=>te(a),className:"px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-[11px] font-bold active:scale-95 transition-all inline-flex items-center gap-1",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(Qe,{className:"w-3 h-3 text-amber-600"}),e.jsx("span",{children:"แก้ไข"})]}),e.jsxs("button",{type:"button",onClick:()=>me(a.id,a.type),className:`px-2.5 py-1 rounded-lg border transition-all active:scale-95 inline-flex items-center gap-1 text-[11px] font-bold ${Le?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${oe.length})`,children:[e.jsx(ct,{className:`w-3 h-3 ${Le?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",oe.length>0?` (${oe.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>g(a),className:"px-2.5 py-1 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(xt,{className:"w-3 h-3"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Je(a,c,"pdf"),className:"px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(Nt,{className:"w-3 h-3 text-emerald-400"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Je(a,c,"print"),className:"px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx(kt,{className:"w-3 h-3 text-slate-600"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(ce,{src:a.creator.avatar,alt:a.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",a.creator.alias,a.creator.name&&a.creator.name!==a.creator.alias?` (${a.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(a.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(pt,{viewedBy:a.viewedBy,size:"md"}),u&&n&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:n.status,onChange:t=>nt(t.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),re.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",re.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังแต่ละคลิป"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:re.map((t,s)=>{const l=E===`main-${t.id||s}`;return e.jsx("div",{className:"p-2 bg-white border border-emerald-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs",children:e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[e.jsx("button",{type:"button",onClick:()=>je(`main-${t.id||s}`,t.url),className:"w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0",children:l?e.jsx(ke,{className:"w-3.5 h-3.5"}):e.jsx(Ce,{className:"w-3.5 h-3.5 ml-0.5"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"text-xs font-bold text-slate-900 truncate",children:t.label||`คลิปเสียง #${s+1}`}),e.jsxs("div",{className:"text-[10px] text-emerald-700 font-mono",children:[t.durationSec||4," วินาที ·"," ",l?"กำลังเล่น...":"แตะเพื่อฟัง"]})]})]})},t.id||s)})}),e.jsx("audio",{ref:se,src:ot,onEnded:()=>W(!1),className:"hidden"})]}),e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-1.5",children:u&&n?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-industry text-[10px]"}),e.jsx("span",{children:n.category})]}),e.jsx("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold",children:n.isFactory?"โรงงานผลิต":"หน้าร้าน / โชว์รูม"}),e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsxs("span",{children:[n.rating||5,"/5"]})]}),(n.quickTags||[]).map((t,s)=>e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold",children:["#",t]},s))]}):o?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-mug-hot text-[10px]"}),e.jsx("span",{children:o.storeCategory||"เรฟร้านน้ำ"})]}),o.ratings&&e.jsxs("span",{className:"px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-star text-[10px] text-amber-500"}),e.jsx("span",{children:((o.ratings.taste+o.ratings.aesthetics+o.ratings.value+o.ratings.speed)/4).toFixed(1)})]})]}):null}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-1 font-semibold text-slate-800",children:[e.jsx(mt,{className:"w-3.5 h-3.5 text-emerald-600 shrink-0"}),e.jsx("span",{children:u?(n==null?void 0:n.marketOrCity)||(n==null?void 0:n.address)||((qe=n==null?void 0:n.location)==null?void 0:qe.addressText):((We=o==null?void 0:o.location)==null?void 0:We.addressText)||(o==null?void 0:o.city)})]}),(u?n==null?void 0:n.wechatId:o==null?void 0:o.wechatId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["WeChat: ",u?n==null?void 0:n.wechatId:o==null?void 0:o.wechatId]}),(u?n==null?void 0:n.lineId:o==null?void 0:o.lineId)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["LINE: ",u?n==null?void 0:n.lineId:o==null?void 0:o.lineId]}),(u?n==null?void 0:n.phone:o==null?void 0:o.phone)&&e.jsxs("span",{className:"px-2 py-0.5 rounded bg-white border border-slate-200 font-mono",children:["โทร: ",u?n==null?void 0:n.phone:o==null?void 0:o.phone]})]}),a.location&&e.jsx("a",{href:`https://www.google.com/maps?q=${a.location.lat},${a.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[11px] font-bold text-emerald-700 hover:underline shrink-0",children:"เปิด Google Maps ↗"})]})]}),(u&&(n==null?void 0:n.memo)||!u&&(o==null?void 0:o.tastingNotes))&&e.jsxs("div",{className:`p-3.5 rounded-xl border space-y-1 ${u?"bg-emerald-50/50 border-emerald-200/80":"bg-amber-50/50 border-amber-200/80"}`,children:[e.jsxs("div",{className:"text-[11px] font-bold text-slate-600 flex items-center gap-1.5",children:[e.jsx("i",{className:`fa-solid ${u?"fa-clipboard-check text-emerald-600":"fa-quote-left text-amber-600"} text-[10px]`}),e.jsx("span",{children:u?"บันทึกหน้างาน / รายละเอียดหลัก:":"บันทึกรีวิวรสชาติ & ไอเดียเรฟ:"})]}),e.jsx("p",{className:"text-xs sm:text-[13px] text-slate-900 leading-relaxed whitespace-pre-wrap font-medium",children:u?n==null?void 0:n.memo:o==null?void 0:o.tastingNotes})]}),u&&n&&(n.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(n.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(n.catalogItems||[]).map((t,s)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[t.photo?e.jsx("img",{src:t.photo,alt:"",onClick:()=>Ee(t.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:t.name||`รายการที่ ${s+1}`}),t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",t.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",c(t.priceRmb).toLocaleString(),"฿)"]})]}),t.priceThb&&!t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",t.priceThb.toLocaleString()]}),t.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:t.weightKg})]}),t.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed",children:t.memo}),Z(t).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:Z(t).map((l,f)=>{const h=`${t.id}-v-${l.id||f}`;return e.jsxs("button",{type:"button",onClick:()=>je(h,l.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold",children:[E===h?e.jsx(ke,{className:"w-2.5 h-2.5"}):e.jsx(Ce,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[l.label||`ฟังเสียง #${f+1}`," (",l.durationSec||4,"s)"]})]},h)})})]})]},t.id||s))})]}),!u&&o&&(o.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(o.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(o.drinkItems||[]).map((t,s)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[t.photo&&e.jsx("img",{src:t.photo,alt:"",onClick:()=>Ee(t.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:t.name||`แก้วที่ #${s+1}`}),t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",t.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",c(t.priceRmb),"฿)"]})]}),t.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",t.fitMenuTarget]}),t.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:t.gimmickNotes}),Z(t).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:Z(t).map((l,f)=>{const h=`${t.id}-v-${l.id||f}`;return e.jsxs("button",{type:"button",onClick:()=>je(h,l.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold",children:[E===h?e.jsx(ke,{className:"w-2.5 h-2.5"}):e.jsx(Ce,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[l.label||`ฟังเสียง #${f+1}`," (",l.durationSec||4,"s)"]})]},h)})})]})]},t.id||s))})]}),e.jsx("audio",{ref:i,onEnded:()=>z(null),className:"hidden"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",b.length," รูป — แตะเพื่อขยายและเลื่อนซ้าย-ขวา):"]}),e.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 gap-2",children:b.map((t,s)=>e.jsxs("div",{onClick:()=>y(s),className:"group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 shadow-xs",children:[e.jsx("img",{src:t.url,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[s+1,"/",b.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:t.label})]},s))})]}),a.videos&&a.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",a.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:a.videos.map((t,s)=>e.jsx(jt,{src:t,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${s+1}`},s))})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(ht,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[a.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:a.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):a.reviewerNotes.map(t=>{var f,h,k,U,v;const s=t.replies||[],l=st[t.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(ce,{src:t.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:t.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(t.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:t.text}),t.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:t.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(t.photoUrl,"_blank")})}),(t.voiceUrl||t.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx($e,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:t.voiceUrl||t.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[O&&e.jsxs("button",{type:"button",onClick:()=>w((r==null?void 0:r.noteId)===t.id&&r.author===t.author?null:{noteId:t.id,author:t.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(Ke,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),s.length>0&&e.jsx("button",{type:"button",onClick:()=>at(m=>({...m,[t.id]:!m[t.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:l?e.jsxs(e.Fragment,{children:[e.jsx(bt,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",s.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(ft,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",s.length,")"]})]})})]})]})]}),s.length>0&&!l&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:s.map(m=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(ce,{src:m.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:m.author}),m.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",m.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(m.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:m.text}),m.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:m.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(m.photoUrl,"_blank")})}),(m.voiceUrl||m.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx($e,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:m.voiceUrl||m.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:O&&e.jsxs("button",{type:"button",onClick:()=>w({noteId:t.id,author:m.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(Ke,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",m.author," ต่อ"]})]})})]},m.id))}),O&&(r==null?void 0:r.noteId)===t.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((f=F[t.id])==null?void 0:f.photoUrl)||((h=F[t.id])==null?void 0:h.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((k=F[t.id])==null?void 0:k.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(xe,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>ne(m=>({...m,[t.id]:{...m[t.id],photoUrl:void 0}})),children:e.jsx(V,{className:"w-2.5 h-2.5"})})]}),((U=F[t.id])==null?void 0:U.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(pe,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(v=F[t.id])==null?void 0:v.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>ne(m=>({...m,[t.id]:{...m[t.id],voiceUrl:void 0}})),children:e.jsx(V,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${r.author} ในฐานะ ${x.alias}...`,value:ae[t.id]||"",onChange:m=>Se({...ae,[t.id]:m.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:m=>{m.key==="Enter"&&(m.preventDefault(),Pe(t.id,r.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const m=document.createElement("input");m.type="file",m.accept="image/*",m.onchange=ye=>{var J,de;const ie=(de=(J=ye.target)==null?void 0:J.files)==null?void 0:de[0];ie&&we(ie,"photo",t.id)},m.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(xe,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:T===t.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:M,onClick:()=>void Ie(t.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${T===t.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(pe,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:T===t.id?`หยุดอัด (${Ue}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>Pe(t.id,r.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),O&&e.jsx("button",{type:"button",onClick:()=>w(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},t.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(yt,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:be.map(t=>e.jsxs("button",{type:"button",onClick:()=>P(t.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:t.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:t.title})]},t.id))})]}),x.role==="viewer"?null:e.jsxs("form",{onSubmit:lt,className:"space-y-2 pt-1",children:[(le||Q||M)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[le&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(xe,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>ge(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(V,{className:"w-3 h-3"})})]}),Q&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(pe,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:Q,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>ve(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(V,{className:"w-3 h-3"})})]}),M&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx($t,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:Te,type:"file",accept:"image/*",className:"hidden",onChange:t=>{var l;const s=(l=t.target.files)==null?void 0:l[0];s&&we(s,"photo"),t.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${x.alias}...`,value:q,onChange:t=>P(t.target.value),className:"flex-1 min-w-[140px] h-8 bg-white border border-slate-200 rounded-lg px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsxs("button",{type:"button",title:"แนบรูปภาพ",disabled:M,onClick:()=>{var t;return(t=Te.current)==null?void 0:t.click()},className:"h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-colors shrink-0",children:[e.jsx(xe,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline",children:"รูปภาพ"})]}),e.jsxs("button",{type:"button",title:T==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:M,onClick:()=>void Ie("main"),className:`h-8 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center justify-center gap-1 transition-all shrink-0 ${T==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(pe,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:T==="main"?`หยุดอัด (${Ue}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:M||T==="main",className:"h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all inline-flex items-center justify-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(ut,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]}),e.jsxs("div",{className:"p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2.5",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-clock-rotate-left text-emerald-600 text-xs"}),e.jsx("span",{children:"ประวัติการดำเนินงาน & ส่งต่องาน (Activity Log)"})]}),a.handoffStage&&e.jsxs("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200",children:["สถานะส่งต่อ:"," ",{awaiting:"พาร์ท 1: รอรับช่วงต่อ",rfq_sent:"พาร์ท 2: ขอสเปก / ส่ง RFQ",sample_test:"พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D",negotiate:"พาร์ท 4: ต่อรองราคา & MOQ",approved:"พาร์ท 5: ตัวเต็งอนุมัติ",ordered:"พาร์ท 6: สั่งซื้อสำเร็จ"}[a.handoffStage]||a.handoffStage]})]}),(a.assignedTo||a.targetFollowUpDate||a.handoffNotes)&&e.jsxs("div",{className:"p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] space-y-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-slate-700",children:[a.assignedTo&&e.jsxs("span",{className:"font-bold inline-flex items-center gap-1",children:[e.jsx("i",{className:"fa-solid fa-user-check text-emerald-600 text-[10px]"}),e.jsxs("span",{children:["ผู้รับช่วงต่อ: ",a.assignedTo]})]}),a.targetFollowUpDate&&e.jsxs("span",{className:"font-mono text-slate-500",children:["กำหนดติดตาม: ",a.targetFollowUpDate]})]}),a.handoffNotes&&e.jsxs("p",{className:"text-slate-600 whitespace-pre-wrap leading-relaxed",children:["หมายเหตุส่งต่อ: ",a.handoffNotes]})]}),e.jsx("div",{className:"space-y-1.5 max-h-48 overflow-y-auto pr-1",children:(()=>{const t=Array.isArray(a.history)?a.history:[];return(t.length>0?t:[{action:"สร้างบันทึกรายการสำรวจ",user:a.creator.alias,userAvatar:a.creator.avatar,timestamp:a.creator.timestamp}]).map((l,f)=>{const h=I.find(v=>v.alias===l.user||v.name===l.user),k=l.userAvatar||(h==null?void 0:h.avatar)||(l.user===a.creator.alias?a.creator.avatar:"./logo.jpg"),U=l.action==="handoff"?"อัปเดตสถานะการส่งต่องาน (Handoff)":l.action==="comment"?"เพิ่มความคิดเห็นในรายการ":l.action==="reply"?"ตอบกลับความคิดเห็น":l.action;return e.jsxs("div",{className:"flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-slate-200/70 text-[11px]",children:[e.jsxs("div",{className:"flex items-center gap-2 min-w-0",children:[e.jsx(ce,{src:k,alt:l.user,className:"w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"}),e.jsx("span",{className:"font-bold text-slate-900 shrink-0",children:l.user}),e.jsx("span",{className:"text-slate-600 truncate",children:U})]}),e.jsx("span",{className:"text-[10px] font-mono text-slate-400 shrink-0",children:new Date(l.timestamp).toLocaleString("th-TH",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})})]},`${l.timestamp}-${f}`)})})()})]})]}),e.jsxs("div",{className:"p-3.5 border-t border-slate-100 bg-white flex items-center justify-between",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["ID: ",a.id," · ปรับปรุง:"," ",new Date(a.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center gap-2",children:[ee&&e.jsxs("button",{type:"button",onClick:()=>te(a),className:"px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 transition-colors",children:[e.jsx(Qe,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"แก้ไขข้อมูลรายการนี้"})]}),e.jsx("button",{onClick:L,className:"px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors",children:"ปิดหน้าต่าง"})]})]})]}),N!==null&&b[N]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>y(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",N+1," / ",b.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:b[N].label})]}),e.jsx("button",{type:"button",onClick:()=>y(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(V,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:t=>t.stopPropagation(),children:[b.length>1&&e.jsx("button",{type:"button",onClick:()=>y((N-1+b.length)%b.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(gt,{className:"w-6 h-6"})}),e.jsx("img",{src:b[N].url,alt:b[N].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),b.length>1&&e.jsx("button",{type:"button",onClick:()=>y((N+1)%b.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(vt,{className:"w-6 h-6"})})]}),b.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:t=>t.stopPropagation(),children:b.map((t,s)=>e.jsx("button",{type:"button",onClick:()=>y(s),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${s===N?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:t.url,className:"w-full h-full object-cover"})},s))})]})]})};export{At as DetailModal};
