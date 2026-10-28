import{c as Y,u as nt,r as v,G as E,y as X,H as je,j as e,F as rt,m as We,X as G,P as qe,I as it,J as dt,v as ye,f as ct,V as Ne,M as xt,n as pt,e as mt,K as Ke,N as ht,O as bt,Q as ie,S as ut,W as ft,C as gt,B as vt}from"./index-DoHeCNeG.js";import{V as wt}from"./VideoPlayer-DgPVq7zJ.js";import{M as de}from"./mic-DKoN3wl1.js";import{Z as jt}from"./zap-BVzsww_B.js";/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je={name:"file-down",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]};Je.node;const yt=Y(Je);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};Ze.node;const Nt=Y(Ze);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Xe.node;const $e=Y(Xe);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Ye.node;const ke=Y(Ye);/**
 * @license lucide-react v1.62.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};et.node;const $t=Y(et);function c(r){return r==null?"":String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function kt(r,z,L){var q,H,be,K,D,A,te,k;const f=r.type==="supplier",d=f?r:null,i=f?null:r,R=f?d.name:i.storeName,T=f?d.chineseName:i.chineseName,ee=f?d.category:i.storeCategory||"เรฟร้านน้ำ",ce=f?d.marketOrCity:i.city,xe=r.country==="TH"?"🇹🇭 ประเทศไทย (Thailand)":"🇨🇳 ประเทศจีน (China)",$=[];d?((q=d.photos.storefrontAndAtmosphere)==null||q.forEach((a,n)=>$.push({url:a,label:`ป้ายหน้าร้าน / บรรยากาศ #${n+1}`})),(H=d.photos.contactCards)==null||H.forEach((a,n)=>$.push({url:a,label:`นามบัตร / WeChat #${n+1}`})),(be=d.catalogItems)==null||be.forEach((a,n)=>{a.photo&&$.push({url:a.photo,label:a.name?`สินค้า: ${a.name}`:`รายการสินค้า #${n+1}`})})):i&&((K=i.photos.storefrontAndAtmosphere)==null||K.forEach((a,n)=>$.push({url:a,label:`หน้าร้าน / บรรยากาศ #${n+1}`})),(D=i.photos.menuBoard)==null||D.forEach((a,n)=>$.push({url:a,label:`ป้ายเมนู / ราคา #${n+1}`})),(A=i.photos.drinkCups)==null||A.forEach((a,n)=>$.push({url:a,label:`แก้วเครื่องดื่ม #${n+1}`})),(te=i.drinkItems)==null||te.forEach((a,n)=>{a.photo&&$.push({url:a.photo,label:a.name?`เมนูชิม: ${a.name}`:`แก้วชิม #${n+1}`})}));const I=Array.isArray(r.viewedBy)?r.viewedBy:[],pe=Array.isArray(r.likes)?r.likes:[],M=Array.isArray(r.reviewerNotes)?r.reviewerNotes:[],F=`ฉันจะเป็นหัวแถว-${R.replace(/[^a-zA-Z0-9ก-๙_-]/g,"_")}.pdf`,he={awaiting:"1. รอรับช่วงต่อ",rfq_sent:"2. ขอสเปก / ส่ง RFQ",sample_test:"3. ทดสอบตัวอย่าง Lab / R&D",negotiate:"4. ต่อรองราคา & MOQ",approved:"5. ตัวเต็งอนุมัติ",ordered:"6. สั่งซื้อสำเร็จ"}[r.handoffStage||"awaiting"]||"1. รอรับช่วงต่อ";let W="";if(f&&d){const a=(d.catalogItems||[]).map((n,g)=>`
        <tr>
          <td style="text-align:center;font-weight:700;">${g+1}</td>
          <td style="width:76px;">
            ${n.photo?`<img src="${c(n.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`:'<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>'}
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${c(n.name||`รายการที่ #${g+1}`)}</div>
            ${n.memo?`<div style="font-size:11px;color:#475569;margin-top:3px;">${c(n.memo)}</div>`:""}
          </td>
          <td>${c(n.dimensions||"-")} / ${c(n.weightKg||"-")}</td>
          <td style="font-weight:700;color:#047857;">
            ${n.priceRmb?`¥${n.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${z(n.priceRmb).toLocaleString()})</div>`:n.priceThb?`฿${n.priceThb.toLocaleString()}`:"-"}
          </td>
        </tr>`).join("");W=`
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
    `}else if(i){const a=(i.drinkItems||[]).map((n,g)=>`
        <tr>
          <td style="text-align:center;font-weight:700;">${g+1}</td>
          <td style="width:76px;">
            ${n.photo?`<img src="${c(n.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`:'<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>'}
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${c(n.name||`แก้วที่ #${g+1}`)}</div>
            ${n.gimmickNotes?`<div style="font-size:11px;color:#475569;margin-top:3px;">กิมมิก: ${c(n.gimmickNotes)}</div>`:""}
          </td>
          <td>${c(n.cupSize||"-")}</td>
          <td>${c(n.fitMenuTarget||"-")}</td>
          <td style="font-weight:700;color:#b45309;">
            ${n.priceRmb?`¥${n.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${z(n.priceRmb).toLocaleString()})</div>`:n.priceThb?`฿${n.priceThb.toLocaleString()}`:"-"}
          </td>
        </tr>`).join("");W=`
      <div class="section-box">
        <div class="section-title">🧋 กลุ่มที่ 2: เมนูที่ชิม & การถอดรหัสสูตร (${(i.drinkItems||[]).length} เมนู)</div>
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
    `}const o=$.length>0?`<div class="photo-grid">
          ${$.map((a,n)=>`
              <div class="photo-card">
                <img src="${c(a.url)}" crossorigin="anonymous" />
                <div class="photo-caption">รูปที่ ${n+1}: ${c(a.label)}</div>
              </div>`).join("")}
        </div>`:'<div class="empty-note">ไม่มีรูปภาพในรายการนี้</div>',y=I.length>0?`<table class="data-table">
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
            ${I.map((a,n)=>`
              <tr>
                <td style="text-align:center;">${n+1}</td>
                <td><strong>${c(a.alias)}</strong> (${c(a.name)})</td>
                <td>${c(a.role.toUpperCase())}</td>
                <td>${new Date(a.lastViewedAt).toLocaleString("th-TH")}</td>
                <td style="text-align:center;font-weight:700;">${a.viewCount||1} ครั้ง</td>
              </tr>`).join("")}
          </tbody>
        </table>`:'<div class="empty-note">ยังไม่มีประวัติการเปิดอ่าน</div>',N=M.length>0?M.map((a,n)=>`
          <div class="comment-box">
            <div class="comment-header">
              <strong>ความคิดเห็นที่ #${n+1} โดย: ${c(a.author)}</strong>
              <span>${new Date(a.timestamp).toLocaleString("th-TH")}</span>
            </div>
            <div class="comment-body">${c(a.text)}</div>
            ${a.replies&&a.replies.length>0?`<div class="reply-list">
                    ${a.replies.map(g=>`
                        <div class="reply-item">
                          <div class="comment-header">
                            <strong>↳ ตอบกลับโดย: ${c(g.author)} ${g.replyToAuthor?`(ถึง @${c(g.replyToAuthor)})`:""}</strong>
                            <span>${new Date(g.timestamp).toLocaleString("th-TH")}</span>
                          </div>
                          <div>${c(g.text)}</div>
                        </div>`).join("")}
                  </div>`:""}
          </div>`).join(""):'<div class="empty-note">ยังไม่มีความคิดเห็นในรายการนี้</div>';return`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>ฉันจะเป็นหัวแถว - ${c(R)}</title>
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
      <strong style="font-size:14px;">📄 รายงานสรุป: ${c(R)}</strong>
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
          <span class="badge">${f?"🏭 รายงานซัพพลายเออร์ & โรงงาน":"🧋 รายงานเรฟร้านน้ำ & R&D"} · ${xe}</span>
          <h1 class="brand-title">${c(R)}</h1>
          <p class="brand-sub">${c(T||"")} · หมวดหมู่: ${c(ee)}</p>
        </div>
      </div>
      <div class="meta-box">
        <div style="font-weight:800;color:#0f172a;font-size:13px;">แพลตฟอร์ม: ฉันจะเป็นหัวแถว</div>
        <div>รหัสอ้างอิง: ${c(r.id)}</div>
        <div>สถานะรับช่วงต่อ: <strong>${c(he)}</strong></div>
        <div>วันที่ออกรายงาน: ${new Date().toLocaleString("th-TH")}</div>
      </div>
    </div>

    <!-- Group 1: Overview, Contacts, Location & Handoff -->
    <div class="section-box">
      <div class="section-title">📌 กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">ชื่อรายการ / ร้านค้า:</span>
          <span class="info-value">${c(R)} ${T?`(${c(T)})`:""}</span>
        </div>
        <div class="info-item">
          <span class="info-label">หมวดหมู่ & คะแนนประเมิน:</span>
          <span class="info-value">${c(ee)} · ${f?`${"★".repeat((d==null?void 0:d.rating)||5)} (${(d==null?void 0:d.rating)||5}/5)`:`รสชาติ ${i==null?void 0:i.ratings.taste}/5 · ดีไซน์ ${i==null?void 0:i.ratings.aesthetics}/5 · คุ้มค่า ${i==null?void 0:i.ratings.value}/5`}</span>
        </div>
        <div class="info-item">
          <span class="info-label">สถานที่ / ตลาด / เมือง:</span>
          <span class="info-value">${c(ce||((k=r.location)==null?void 0:k.addressText)||"-")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">พิกัด GPS (Lat, Lng):</span>
          <span class="info-value">${r.location?`${r.location.lat.toFixed(5)}, ${r.location.lng.toFixed(5)}`:"-"}</span>
        </div>
        <div class="info-item">
          <span class="info-label">ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์):</span>
          <span class="info-value">
            WeChat: ${c((f?d==null?void 0:d.wechatId:i==null?void 0:i.wechatId)||"-")} |
            LINE: ${c((f?d==null?void 0:d.lineId:i==null?void 0:i.lineId)||"-")} |
            โทร: ${c((f?d==null?void 0:d.phone:i==null?void 0:i.phone)||"-")}
          </span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก:</span>
          <span class="info-value">${c(r.creator.alias)}${r.creator.name&&r.creator.name!==r.creator.alias?` (${c(r.creator.name)})`:""} · ${new Date(r.creator.timestamp).toLocaleString("th-TH")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม:</span>
          <span class="info-value">${c(r.assignedTo||"ยังไม่ระบุ")} · กำหนดติดตาม: ${c(r.targetFollowUpDate||"-")}</span>
        </div>
        <div class="info-item">
          <span class="info-label">จำนวนผู้กดถูกใจ (Likes) & เปิดอ่าน:</span>
          <span class="info-value">ถูกใจ ${pe.length} คน · เปิดอ่านแล้ว ${I.length} คน</span>
        </div>
      </div>

      ${(f?d!=null&&d.memo:i!=null&&i.tastingNotes)?`<div style="margin-top:12px;padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:12px;">
              <strong>📝 บันทึกภาพรวมหน้างาน:</strong> ${c(f?d==null?void 0:d.memo:i==null?void 0:i.tastingNotes)}
            </div>`:""}

      ${r.handoffNotes?`<div style="margin-top:8px;padding:10px;background:#ecfdf5;border-radius:8px;border:1px solid #a7f3d0;font-size:12px;color:#065f46;">
              <strong>🤝 โน้ตการส่งมอบงาน / ผลเจรจา:</strong> ${c(r.handoffNotes)}
            </div>`:""}
    </div>

    <!-- Group 2: Catalog / Drink Items -->
    ${W}

    <!-- Group 3: All Photos of This Item -->
    <div class="section-box">
      <div class="section-title">🖼️ กลุ่มที่ 3: ภาพถ่ายทั้งหมดของรายการนี้ (${$.length} รูป)</div>
      ${o}
    </div>

    <!-- Group 4: Viewer Log (รายการ Log คนดู) -->
    <div class="section-box">
      <div class="section-title">👁️ กลุ่มที่ 4: รายการ Log ผู้เปิดอ่านข้อมูล (Viewer Log - ${I.length} คน)</div>
      ${y}
    </div>

    <!-- Group 5: All Threaded Comments & Replies -->
    <div class="section-box">
      <div class="section-title">💬 กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${M.length} หัวข้อสนทนา)</div>
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
          filename: ${JSON.stringify(F)},
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
</html>`}function Qe(r,z,L){const f=kt(r,z,L),d=window.open("","_blank");if(d)d.document.open(),d.document.write(f),d.document.close();else{const i=new Blob([f],{type:"text/html;charset=utf-8"}),R=URL.createObjectURL(i),T=document.createElement("a");T.href=R,T.target="_blank",T.click()}}const Ut=({item:r,isOpen:z,onClose:L,onShareToLine:f})=>{var Ie,Me,Fe,He,_e,Be,Ve,Oe,Ge;const{currentUser:d,convertCnyToThb:i,addReviewerNote:R,addReviewReply:T,updatePipelineStatus:ee,toggleLikeItem:ce,suppliers:xe,drinkStores:$,quickMessages:I,recordItemView:pe,canEditItems:M,canComment:F,openEditItem:me}=nt(),he=r&&r.type==="supplier"?xe.find(t=>t.id===r.id):null,W=r&&r.type==="drink_store"?$.find(t=>t.id===r.id):null,o=he||W||r,[y,N]=v.useState(null),[q,H]=v.useState(""),[be,K]=v.useState(!1),[D,A]=v.useState(null),te=E.useRef(null),k=E.useRef(null),[a,n]=v.useState(null),[g,Ce]=v.useState({}),[tt,st]=v.useState({}),[se,ue]=v.useState(null),[Q,fe]=v.useState(null),[_,Se]=v.useState(!1),[B,ae]=v.useState({}),Re=E.useRef(null),[U,J]=v.useState(null),[Te,Ue]=v.useState(0),V=E.useRef(null),O=E.useRef(null),C=E.useRef(null),ze=E.useRef(0),Ae=E.useCallback(()=>{var t;if(C.current&&(clearInterval(C.current),C.current=null),V.current&&V.current.state==="recording"){V.current.stop();return}(t=O.current)==null||t.getTracks().forEach(s=>s.stop()),O.current=null,J(null)},[]);v.useEffect(()=>(z&&(r!=null&&r.id)&&pe(r.id,r.type),N(null),K(!1),A(null),()=>{var t,s;C.current&&clearInterval(C.current),((t=V.current)==null?void 0:t.state)==="recording"&&V.current.stop(),(s=O.current)==null||s.getTracks().forEach(l=>l.stop())}),[z,r==null?void 0:r.id]);const b=[];if(o)if(o.type==="supplier"){const t=o;(Ie=t.photos.storefrontAndAtmosphere)==null||Ie.forEach((s,l)=>b.push({url:s,label:`ป้ายหน้าร้าน/บรรยากาศ #${l+1}`})),(Me=t.photos.contactCards)==null||Me.forEach((s,l)=>b.push({url:s,label:`นามบัตร/WeChat #${l+1}`})),(Fe=t.catalogItems)==null||Fe.forEach((s,l)=>{s.photo&&b.push({url:s.photo,label:s.name?`สินค้า: ${s.name}`:`รายการสินค้า #${l+1}`})})}else{const t=o;(He=t.photos.storefrontAndAtmosphere)==null||He.forEach((s,l)=>b.push({url:s,label:`หน้าร้าน/บรรยากาศ #${l+1}`})),(_e=t.photos.menuBoard)==null||_e.forEach((s,l)=>b.push({url:s,label:`เมนูบอร์ด #${l+1}`})),(Be=t.photos.drinkCups)==null||Be.forEach((s,l)=>b.push({url:s,label:`แก้วเครื่องดื่ม #${l+1}`})),(Ve=t.drinkItems)==null||Ve.forEach((s,l)=>{s.photo&&b.push({url:s.photo,label:s.name?`เมนู: ${s.name}`:`เมนูชิม #${l+1}`})})}if(v.useEffect(()=>{if(y===null||b.length===0)return;const t=s=>{s.key==="ArrowRight"?N(l=>l!==null?(l+1)%b.length:null):s.key==="ArrowLeft"?N(l=>l!==null?(l-1+b.length)%b.length:null):s.key==="Escape"&&N(null)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[y,b.length]),!z||!o)return null;const w=o.type==="supplier",m=w?o:null,p=w?null:o,le=Array.isArray(o.likes)?o.likes:[],Ee=le.some(t=>t.userId===d.id),Le=t=>{const s=b.findIndex(l=>l.url===t);N(s>=0?s:0)},ge=async(t,s,l)=>{try{Se(!0);const u=await vt(t,{recordId:o.id,recordType:o.type,recordTitle:w?m==null?void 0:m.name:p==null?void 0:p.storeName});l?ae(h=>({...h,[l]:{...h[l],...s==="photo"?{photoUrl:u}:{voiceUrl:u}}})):s==="photo"?ue(u):fe(u)}catch(u){alert(u.message||"อัปโหลดไฟล์แนบไม่สำเร็จ")}finally{Se(!1)}},De=async t=>{var s,l;if(U===t){Ae();return}U&&Ae();try{if(!((s=navigator.mediaDevices)!=null&&s.getUserMedia)||typeof MediaRecorder>"u"){alert("เบราว์เซอร์นี้ไม่รองรับการอัดเสียงสด กรุณาเปิดผ่าน HTTPS หรืออนุญาตไมโครโฟน");return}const u=await navigator.mediaDevices.getUserMedia({audio:!0});O.current=u;const h=["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"].find(j=>MediaRecorder.isTypeSupported(j)),S=new MediaRecorder(u,h?{mimeType:h}:void 0);V.current=S;const P=[];S.ondataavailable=j=>{j.data.size>0&&P.push(j.data)},S.onstop=()=>{var Z;C.current&&(clearInterval(C.current),C.current=null),u.getTracks().forEach(re=>re.stop()),O.current=null,J(null);const j=((Z=S.mimeType)==null?void 0:Z.split(";")[0])||"audio/webm",x=new Blob(P,{type:j});if(!x.size)return;const we=j.includes("mp4")?"m4a":j.includes("ogg")?"ogg":"webm",ne=new File([x],`เสียงคอมเมนต์-${Date.now()}.${we}`,{type:j});ge(ne,"audio",t==="main"?void 0:t)},S.onerror=()=>{C.current&&clearInterval(C.current),u.getTracks().forEach(j=>j.stop()),J(null),alert("อัดเสียงไม่สำเร็จ กรุณาลองใหม่")},ze.current=Date.now(),Ue(0),J(t),S.start(250),C.current=setInterval(()=>{Ue(Math.round((Date.now()-ze.current)/1e3))},1e3)}catch{(l=O.current)==null||l.getTracks().forEach(u=>u.stop()),J(null),alert("ไม่ได้รับสิทธิ์ใช้ไมโครโฟน กรุณากดอนุญาตไมโครโฟนเพื่ออัดเสียงสด")}},at=async t=>{t.preventDefault();const s=q.trim();!s&&!se&&!Q||!await R(o.id,o.type,s,{photoUrl:se||void 0,voiceUrl:Q||void 0})||(H(""),ue(null),fe(null))},Pe=async(t,s,l)=>{const u=(g[t]||"").trim(),h=B[t];!u&&!(h!=null&&h.photoUrl)&&!(h!=null&&h.voiceUrl)||!await T(o.id,o.type,t,u,s,{photoUrl:h==null?void 0:h.photoUrl,voiceUrl:h==null?void 0:h.voiceUrl,replyToId:l})||(Ce({...g,[t]:""}),ae(P=>({...P,[t]:{}})),n(null))},lt=t=>{m&&ee(m.id,t)},oe=X(o),ot=((Oe=oe[0])==null?void 0:Oe.url)||(w?m==null?void 0:m.voiceNoteUrl:p==null?void 0:p.voiceNoteUrl)||((w?m!=null&&m.voiceDurationSec:p!=null&&p.voiceDurationSec)?je(4):void 0),ve=(t,s)=>{k.current&&(D===t?(k.current.pause(),A(null)):(k.current.src=s||je(4),k.current.play().then(()=>A(t)).catch(()=>{k.current&&(k.current.src=je(4),k.current.play(),A(t))})))};return e.jsxs("div",{className:"fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto",children:[e.jsxs("div",{className:"bg-white border border-slate-200/90 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 max-h-[94vh] flex flex-col text-slate-900",children:[e.jsxs("div",{className:"p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white sticky top-0 z-10",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2.5",children:[e.jsxs("div",{className:"flex items-start gap-2.5 min-w-0 flex-1",children:[e.jsx("span",{className:`p-2 rounded-xl shrink-0 mt-0.5 ${w?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`,children:w?e.jsx(rt,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"}):e.jsx(We,{className:"w-4 h-4 sm:w-5 sm:h-5 text-amber-600"})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h2",{className:"font-extrabold text-slate-900 text-sm sm:text-base leading-snug break-words",children:w?m==null?void 0:m.name:p==null?void 0:p.storeName}),e.jsx("p",{className:"text-xs text-slate-400 truncate mt-0.5",children:w?(m==null?void 0:m.chineseName)||(m==null?void 0:m.marketOrCity):(p==null?void 0:p.chineseName)||(p==null?void 0:p.storeCategory)||(p==null?void 0:p.brandConcept)})]})]}),e.jsx("button",{type:"button",onClick:L,className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95 flex items-center justify-center shrink-0",title:"ปิดหน้าต่าง",children:e.jsx(G,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100",children:[M&&e.jsxs("button",{type:"button",onClick:()=>me(o),className:"px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/90 text-[11px] font-bold active:scale-95 transition-all inline-flex items-center gap-1",title:"แก้ไขข้อมูลรายการนี้ (Admin / Editor)",children:[e.jsx(qe,{className:"w-3 h-3 text-amber-600"}),e.jsx("span",{children:"แก้ไข"})]}),e.jsxs("button",{type:"button",onClick:()=>ce(o.id,o.type),className:`px-2.5 py-1 rounded-lg border transition-all active:scale-95 inline-flex items-center gap-1 text-[11px] font-bold ${Ee?"bg-blue-50 text-blue-700 border-blue-200":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,title:`ถูกใจ (${le.length})`,children:[e.jsx(it,{className:`w-3 h-3 ${Ee?"fill-blue-600 text-blue-600":""}`}),e.jsxs("span",{children:["ถูกใจ",le.length>0?` (${le.length})`:""]})]}),e.jsxs("button",{type:"button",onClick:()=>f(o),className:"px-2.5 py-1 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"แชร์ลิงก์เข้า LINE",children:[e.jsx(dt,{className:"w-3 h-3"}),e.jsx("span",{children:"แชร์ LINE"})]}),e.jsxs("button",{type:"button",onClick:()=>Qe(o,i,"pdf"),className:"px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all active:scale-95 inline-flex items-center gap-1",title:"ดาวน์โหลดรายงานเป็นไฟล์ PDF",children:[e.jsx(yt,{className:"w-3 h-3 text-emerald-400"}),e.jsx("span",{children:"ดาวน์โหลด PDF"})]}),e.jsxs("button",{type:"button",onClick:()=>Qe(o,i,"print"),className:"px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all border border-slate-200/80 active:scale-95 inline-flex items-center gap-1",title:"พิมพ์รายงานฉบับจัดหน้าสวยงาม (Print)",children:[e.jsx($t,{className:"w-3 h-3 text-slate-600"}),e.jsx("span",{children:"พิมพ์"})]})]})]}),e.jsxs("div",{className:"p-4 sm:p-6 space-y-4 overflow-y-auto flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(ye,{src:o.creator.avatar,alt:o.creator.alias,className:"w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-slate-800 font-bold flex items-center gap-1.5",children:e.jsxs("span",{children:["ผู้ลงพื้นที่สำรวจ: ",o.creator.alias,o.creator.name&&o.creator.name!==o.creator.alias?` (${o.creator.name})`:""]})}),e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["บันทึกเมื่อ: ",new Date(o.creator.timestamp).toLocaleString("th-TH")]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(ct,{viewedBy:o.viewedBy,size:"md"}),w&&m&&e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[11px] text-slate-500",children:"สถานะ:"}),e.jsxs("select",{value:m.status,onChange:t=>lt(t.target.value),className:"bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500",children:[e.jsx("option",{value:"scouted",children:"1. สำรวจแล้ว"}),e.jsx("option",{value:"reviewing",children:"2. เทียบสเปก"}),e.jsx("option",{value:"rfq_sent",children:"3. ส่ง RFQ"}),e.jsx("option",{value:"shortlisted",children:"4. ตัวเต็ง (Shortlist)"}),e.jsx("option",{value:"ordered",children:"5. สั่งซื้อแล้ว (Ordered)"})]})]})]})]}),oe.length>0&&e.jsxs("div",{className:"p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2",children:[e.jsxs("div",{className:"text-xs font-bold text-emerald-950 flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Ne,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsxs("span",{children:["วอยซ์เสียงบันทึกหน้างานจริง (",oe.length," คลิป)"]})]}),e.jsx("span",{className:"text-[10px] font-mono text-emerald-700",children:"แตะ ▶ เพื่อฟังแต่ละคลิป"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:oe.map((t,s)=>{const l=D===`main-${t.id||s}`;return e.jsx("div",{className:"p-2 bg-white border border-emerald-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs",children:e.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[e.jsx("button",{type:"button",onClick:()=>ve(`main-${t.id||s}`,t.url),className:"w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0",children:l?e.jsx($e,{className:"w-3.5 h-3.5"}):e.jsx(ke,{className:"w-3.5 h-3.5 ml-0.5"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"text-xs font-bold text-slate-900 truncate",children:t.label||`คลิปเสียง #${s+1}`}),e.jsxs("div",{className:"text-[10px] text-emerald-700 font-mono",children:[t.durationSec||4," วินาที ·"," ",l?"กำลังเล่น...":"แตะเพื่อฟัง"]})]})]})},t.id||s)})}),e.jsx("audio",{ref:te,src:ot,onEnded:()=>K(!1),className:"hidden"})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",children:[e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1",children:[e.jsxs("div",{className:"text-slate-400 font-semibold flex items-center justify-between",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(xt,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{children:"พิกัดสถานที่ / ตลาด / เมือง:"})]}),o.location&&e.jsx("a",{href:`https://www.google.com/maps?q=${o.location.lat},${o.location.lng}`,target:"_blank",rel:"noreferrer",className:"text-[10px] font-bold text-emerald-700 hover:underline",children:"เปิด Google Maps ↗"})]}),e.jsx("div",{className:"text-slate-900 font-bold",children:w?m==null?void 0:m.marketOrCity:((Ge=p==null?void 0:p.location)==null?void 0:Ge.addressText)||(p==null?void 0:p.city)}),o.location&&e.jsxs("div",{className:"text-[11px] text-slate-500 font-mono",children:["Lat: ",o.location.lat.toFixed(4),", Lng:"," ",o.location.lng.toFixed(4)]})]}),w&&m?e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1",children:[e.jsxs("div",{className:"text-slate-400 font-semibold flex items-center gap-1",children:[e.jsx(pt,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{children:"จุดเด่นทางลัดที่บันทึกไว้:"})]}),e.jsx("div",{className:"flex flex-wrap gap-1 pt-0.5",children:(m.quickTags||[]).map((t,s)=>e.jsxs("span",{className:"text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700",children:["✓ ",t]},s))})]}):p?e.jsxs("div",{className:"p-3 bg-amber-50/40 rounded-xl border border-amber-200/70 space-y-1",children:[e.jsxs("div",{className:"text-amber-800 font-semibold flex items-center gap-1",children:[e.jsx(We,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"หมวดหมู่เรฟ & คอนเซปต์:"})]}),e.jsx("div",{className:"text-xs font-bold text-slate-900",children:p.storeCategory||"ชาจีนพรีเมียม"}),p.brandConcept&&e.jsx("div",{className:"text-[11px] text-slate-600",children:p.brandConcept})]}):null]}),w&&m&&(m.catalogItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["รายการอุปกรณ์ & สินค้า (",(m.catalogItems||[]).length," รายการ):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(m.catalogItems||[]).map((t,s)=>e.jsxs("div",{className:"p-3 rounded-xl border border-slate-200 bg-white flex gap-3 shadow-xs",children:[t.photo?e.jsx("img",{src:t.photo,alt:"",onClick:()=>Le(t.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-slate-100 hover:opacity-90"}):e.jsx("div",{className:"w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs",children:"ไม่มีรูป"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:t.name||`รายการที่ ${s+1}`}),t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["¥",t.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",i(t.priceRmb).toLocaleString(),"฿)"]})]}),t.priceThb&&!t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-emerald-700",children:["฿",t.priceThb.toLocaleString()]}),t.weightKg&&e.jsxs("div",{className:"text-[11px] text-slate-500",children:["น้ำหนัก: ",e.jsx("span",{className:"font-mono",children:t.weightKg})]}),t.memo&&e.jsx("p",{className:"text-[11px] text-slate-600 line-clamp-2",children:t.memo}),X(t).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:X(t).map((l,u)=>{const h=`${t.id}-v-${l.id||u}`;return e.jsxs("button",{type:"button",onClick:()=>ve(h,l.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold",children:[D===h?e.jsx($e,{className:"w-2.5 h-2.5"}):e.jsx(ke,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[l.label||`ฟังเสียง #${u+1}`," (",l.durationSec||4,"s)"]})]},h)})})]})]},t.id||s))})]}),!w&&p&&(p.drinkItems||[]).length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("span",{className:"text-xs font-bold text-slate-800",children:["เมนูที่ชิม & ถอดรหัสสูตร (",(p.drinkItems||[]).length," เมนู):"]})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:(p.drinkItems||[]).map((t,s)=>e.jsxs("div",{className:"p-3 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 shadow-xs",children:[t.photo&&e.jsx("img",{src:t.photo,alt:"",onClick:()=>Le(t.photo),className:"w-16 h-16 rounded-lg object-cover cursor-pointer border border-amber-200"}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-1",children:[e.jsx("div",{className:"font-bold text-xs text-slate-900 truncate",children:t.name||`แก้วที่ #${s+1}`}),t.priceRmb&&e.jsxs("div",{className:"text-xs font-mono font-bold text-amber-700",children:["¥",t.priceRmb," ",e.jsxs("span",{className:"text-[11px] font-normal text-slate-500",children:["(≈",i(t.priceRmb),"฿)"]})]}),t.fitMenuTarget&&e.jsxs("div",{className:"text-[11px] font-semibold text-emerald-700",children:["ต่อยอด: ",t.fitMenuTarget]}),t.gimmickNotes&&e.jsx("p",{className:"text-[11px] text-slate-600",children:t.gimmickNotes}),X(t).length>0&&e.jsx("div",{className:"flex flex-wrap gap-1 pt-1",children:X(t).map((l,u)=>{const h=`${t.id}-v-${l.id||u}`;return e.jsxs("button",{type:"button",onClick:()=>ve(h,l.url),className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold",children:[D===h?e.jsx($e,{className:"w-2.5 h-2.5"}):e.jsx(ke,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:[l.label||`ฟังเสียง #${u+1}`," (",l.durationSec||4,"s)"]})]},h)})})]})]},t.id||s))})]}),e.jsx("audio",{ref:k,onEnded:()=>A(null),className:"hidden"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 block",children:["แกลเลอรีรูปภาพทั้งหมด (",b.length," รูป — แตะเพื่อขยายและเลื่อนซ้าย-ขวา):"]}),e.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 gap-2",children:b.map((t,s)=>e.jsxs("div",{onClick:()=>N(s),className:"group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100 shadow-xs",children:[e.jsx("img",{src:t.url,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"}),e.jsxs("div",{className:"absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded",children:[s+1,"/",b.length]}),e.jsx("div",{className:"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white p-1 text-center font-medium",children:t.label})]},s))})]}),o.videos&&o.videos.length>0&&e.jsxs("div",{className:"space-y-2 pt-1",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx("i",{className:"fa-solid fa-video text-purple-600"}),e.jsxs("span",{children:["คลิปวิดีโอของรายการนี้ (",o.videos.length," คลิป):"]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:o.videos.map((t,s)=>e.jsx(wt,{src:t,className:"rounded-2xl border border-slate-200 shadow-sm h-48 sm:h-56",videoClassName:"object-contain",badgeLabel:`คลิปที่ ${s+1}`},s))})]}),e.jsxs("div",{id:"detail-comments-section",className:"p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-slate-800 flex items-center gap-1.5",children:[e.jsx(mt,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"ช่องความเห็นทีมงาน & ตอบกลับต่อเนื่อง (Threaded Comments)"})]}),e.jsxs("span",{className:"text-[11px] text-slate-400 font-mono",children:[o.reviewerNotes.length," หัวข้อสนทนา"]})]}),e.jsx("div",{className:"space-y-2.5",children:o.reviewerNotes.length===0?e.jsx("p",{className:"text-xs text-slate-400 py-3 text-center",children:"ยังไม่มีความเห็น สามารถพิมพ์บันทึกหรือตรวจสอบสเปกได้ด้านล่าง"}):o.reviewerNotes.map(t=>{var u,h,S,P,j;const s=t.replies||[],l=tt[t.id];return e.jsxs("div",{className:"p-3 bg-white rounded-xl border border-slate-200/70 shadow-xs space-y-2",children:[e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(ye,{src:t.authorAvatar,className:"w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-slate-200"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-0.5",children:[e.jsx("span",{className:"font-bold text-slate-900",children:t.author}),e.jsx("span",{className:"text-slate-400 font-mono text-[10px]",children:new Date(t.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-xs text-slate-700 leading-relaxed",children:t.text}),t.photoUrl&&e.jsx("div",{className:"mt-1.5",children:e.jsx("img",{src:t.photoUrl,alt:"ภาพแนบ",className:"max-h-48 max-w-xs rounded-xl border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(t.photoUrl,"_blank")})}),(t.voiceUrl||t.audioUrl)&&e.jsxs("div",{className:"mt-1.5 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-w-sm",children:[e.jsx(Ne,{className:"w-4 h-4 text-emerald-600 shrink-0"}),e.jsx("audio",{controls:!0,src:t.voiceUrl||t.audioUrl,className:"h-7 w-full"})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-1.5 text-[11px] font-bold",children:[F&&e.jsxs("button",{type:"button",onClick:()=>n((a==null?void 0:a.noteId)===t.id&&a.author===t.author?null:{noteId:t.id,author:t.author}),className:"text-blue-600 hover:text-blue-800 flex items-center gap-1",children:[e.jsx(Ke,{className:"w-3 h-3"}),e.jsx("span",{children:"ตอบกลับ"})]}),s.length>0&&e.jsx("button",{type:"button",onClick:()=>st(x=>({...x,[t.id]:!x[t.id]})),className:"text-slate-500 hover:text-slate-800 flex items-center gap-1",children:l?e.jsxs(e.Fragment,{children:[e.jsx(ht,{className:"w-3 h-3"}),e.jsxs("span",{children:["ดูการตอบกลับ (",s.length,")"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(bt,{className:"w-3 h-3"}),e.jsxs("span",{children:["ย่อการตอบกลับ (",s.length,")"]})]})})]})]})]}),s.length>0&&!l&&e.jsx("div",{className:"ml-6 pl-3 border-l-2 border-blue-200 space-y-2 pt-1",children:s.map(x=>e.jsxs("div",{className:"p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-[10px]",children:[e.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-slate-800",children:[e.jsx(ye,{src:x.authorAvatar,className:"w-4 h-4 rounded-full object-cover"}),e.jsx("span",{children:x.author}),x.replyToAuthor&&e.jsxs("span",{className:"text-blue-600 font-normal",children:["▸ ตอบกลับ @",x.replyToAuthor]})]}),e.jsx("span",{className:"text-slate-400 font-mono",children:new Date(x.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})})]}),e.jsx("p",{className:"text-slate-700 leading-snug",children:x.text}),x.photoUrl&&e.jsx("div",{className:"mt-1",children:e.jsx("img",{src:x.photoUrl,alt:"ภาพแนบ",className:"max-h-36 max-w-[200px] rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-95 shadow-2xs",onClick:()=>window.open(x.photoUrl,"_blank")})}),(x.voiceUrl||x.audioUrl)&&e.jsxs("div",{className:"mt-1 flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 max-w-[240px]",children:[e.jsx(Ne,{className:"w-3.5 h-3.5 text-blue-600 shrink-0"}),e.jsx("audio",{controls:!0,src:x.voiceUrl||x.audioUrl,className:"h-6 w-full"})]}),e.jsx("div",{children:F&&e.jsxs("button",{type:"button",onClick:()=>n({noteId:t.id,author:x.author}),className:"text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5",children:[e.jsx(Ke,{className:"w-2.5 h-2.5"}),e.jsxs("span",{children:["ตอบกลับ @",x.author," ต่อ"]})]})})]},x.id))}),F&&(a==null?void 0:a.noteId)===t.id&&e.jsxs("div",{className:"mt-2 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in",children:[(((u=B[t.id])==null?void 0:u.photoUrl)||((h=B[t.id])==null?void 0:h.voiceUrl))&&e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-[10px]",children:[((S=B[t.id])==null?void 0:S.photoUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200",children:[e.jsx(ie,{className:"w-3 h-3"})," ภาพพร้อมแนบ",e.jsx("button",{type:"button",onClick:()=>ae(x=>({...x,[t.id]:{...x[t.id],photoUrl:void 0}})),children:e.jsx(G,{className:"w-2.5 h-2.5"})})]}),((P=B[t.id])==null?void 0:P.voiceUrl)&&e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200",children:[e.jsx(de,{className:"w-3 h-3"})," เสียงอัดสดพร้อมส่ง",e.jsx("audio",{controls:!0,src:(j=B[t.id])==null?void 0:j.voiceUrl,className:"h-6 w-32"}),e.jsx("button",{type:"button",onClick:()=>ae(x=>({...x,[t.id]:{...x[t.id],voiceUrl:void 0}})),children:e.jsx(G,{className:"w-2.5 h-2.5"})})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{type:"text",placeholder:`ตอบกลับ @${a.author} ในฐานะ ${d.alias}...`,value:g[t.id]||"",onChange:x=>Ce({...g,[t.id]:x.target.value}),className:"flex-1 min-w-[140px] bg-slate-50 border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500",autoFocus:!0,onKeyDown:x=>{x.key==="Enter"&&(x.preventDefault(),Pe(t.id,a.author))}}),e.jsx("button",{type:"button",title:"แนบรูปภาพในคำตอบกลับ",onClick:()=>{const x=document.createElement("input");x.type="file",x.accept="image/*",x.onchange=we=>{var Z,re;const ne=(re=(Z=we.target)==null?void 0:Z.files)==null?void 0:re[0];ne&&ge(ne,"photo",t.id)},x.click()},className:"p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500",children:e.jsx(ie,{className:"w-3.5 h-3.5"})}),e.jsxs("button",{type:"button",title:U===t.id?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคำตอบกลับ",disabled:_,onClick:()=>void De(t.id),className:`px-2 py-1.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition-all ${U===t.id?"bg-rose-600 text-white border-rose-600 animate-pulse":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700"}`,children:[e.jsx(de,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:U===t.id?`หยุดอัด (${Te}s)`:"อัดเสียงสด"})]}),e.jsx("button",{type:"button",onClick:()=>Pe(t.id,a.author),className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold",children:"ส่ง"}),F&&e.jsx("button",{type:"button",onClick:()=>n(null),className:"px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs",children:"ยกเลิก"})]})]})]},t.id)})}),e.jsxs("div",{className:"pt-2 border-t border-slate-200/60 space-y-1.5",children:[e.jsx("div",{className:"flex items-center justify-between text-[11px] text-slate-500",children:e.jsxs("span",{className:"font-semibold flex items-center gap-1",children:[e.jsx(jt,{className:"w-3 h-3 text-amber-500"})," ข้อความด่วน (แตะเพื่อพิมพ์ทันที):"]})}),e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5",children:I.map(t=>e.jsxs("button",{type:"button",onClick:()=>H(t.text),className:"px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 whitespace-nowrap active:scale-95 transition-all shadow-xs",title:t.text,children:[e.jsx("i",{className:"fa-solid fa-bolt text-amber-500 mr-1 text-[10px]"}),e.jsx("span",{children:t.title})]},t.id))})]}),d.role==="viewer"?null:e.jsxs("form",{onSubmit:at,className:"space-y-2 pt-1",children:[(se||Q||_)&&e.jsxs("div",{className:"flex flex-wrap items-center gap-2 px-1",children:[se&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800",children:[e.jsx(ie,{className:"w-3.5 h-3.5 text-emerald-600"}),e.jsx("span",{className:"truncate max-w-[120px]",children:"รูปภาพพร้อมแนบ"}),e.jsx("button",{type:"button",onClick:()=>ue(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(G,{className:"w-3 h-3"})})]}),Q&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800",children:[e.jsx(de,{className:"w-3.5 h-3.5 text-blue-600"}),e.jsx("span",{children:"เสียงอัดสด:"}),e.jsx("audio",{controls:!0,src:Q,className:"h-6 w-36"}),e.jsx("button",{type:"button",onClick:()=>fe(null),className:"text-slate-400 hover:text-rose-600",children:e.jsx(G,{className:"w-3 h-3"})})]}),_&&e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-blue-600 font-medium",children:[e.jsx(Nt,{className:"w-3.5 h-3.5 animate-spin"}),e.jsx("span",{children:"กำลังอัปโหลดไฟล์สื่อ..."})]})]}),e.jsxs("div",{className:"flex gap-1.5 items-center flex-wrap sm:flex-nowrap",children:[e.jsx("input",{ref:Re,type:"file",accept:"image/*",className:"hidden",onChange:t=>{var l;const s=(l=t.target.files)==null?void 0:l[0];s&&ge(s,"photo"),t.target.value=""}}),e.jsx("input",{type:"text",placeholder:`พิมพ์ข้อคิดเห็นใหม่ในฐานะ ${d.alias}...`,value:q,onChange:t=>H(t.target.value),className:"flex-1 min-w-[150px] bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"}),e.jsx("button",{type:"button",title:"แนบรูปภาพ",disabled:_,onClick:()=>{var t;return(t=Re.current)==null?void 0:t.click()},className:"p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-colors shrink-0",children:e.jsx(ie,{className:"w-4 h-4"})}),e.jsxs("button",{type:"button",title:U==="main"?"กดเพื่อหยุดอัดเสียงสด":"กดเพื่ออัดเสียงสดในคอมเมนต์",disabled:_,onClick:()=>void De("main"),className:`px-2.5 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 transition-all shrink-0 ${U==="main"?"bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs":"bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700"}`,children:[e.jsx(de,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:U==="main"?`หยุดอัด (${Te}s)`:"อัดเสียงสด"})]}),e.jsxs("button",{type:"submit",disabled:_||U==="main",className:"px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 shrink-0 disabled:opacity-50",children:[e.jsx(ut,{className:"w-3 h-3"}),e.jsx("span",{children:"โพสต์"})]})]})]})]})]}),e.jsxs("div",{className:"p-3.5 border-t border-slate-100 bg-white flex items-center justify-between",children:[e.jsxs("div",{className:"text-[11px] text-slate-400 font-mono",children:["ID: ",o.id," · ปรับปรุง:"," ",new Date(o.updatedAt).toLocaleTimeString("th-TH")]}),e.jsxs("div",{className:"flex items-center gap-2",children:[M&&e.jsxs("button",{type:"button",onClick:()=>me(o),className:"px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 transition-colors",children:[e.jsx(qe,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{children:"แก้ไขข้อมูลรายการนี้"})]}),e.jsx("button",{onClick:L,className:"px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors",children:"ปิดหน้าต่าง"})]})]})]}),y!==null&&b[y]&&e.jsxs("div",{className:"fixed inset-0 z-[140] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none",onClick:()=>N(null),children:[e.jsxs("div",{className:"w-full max-w-4xl flex items-center justify-between text-white z-10",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"px-2.5 py-1 rounded-full bg-white/15 font-mono text-xs font-bold",children:["รูปที่ ",y+1," / ",b.length]}),e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[240px] sm:max-w-md",children:b[y].label})]}),e.jsx("button",{type:"button",onClick:()=>N(null),className:"w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors",children:e.jsx(G,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"relative flex-1 w-full max-w-5xl flex items-center justify-center my-2",onClick:t=>t.stopPropagation(),children:[b.length>1&&e.jsx("button",{type:"button",onClick:()=>N((y-1+b.length)%b.length),className:"absolute left-1 sm:left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปก่อนหน้า (◀)",children:e.jsx(ft,{className:"w-6 h-6"})}),e.jsx("img",{src:b[y].url,alt:b[y].label,className:"max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"}),b.length>1&&e.jsx("button",{type:"button",onClick:()=>N((y+1)%b.length),className:"absolute right-1 sm:right-3 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all",title:"รูปถัดไป (▶)",children:e.jsx(gt,{className:"w-6 h-6"})})]}),b.length>1&&e.jsx("div",{className:"w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10",onClick:t=>t.stopPropagation(),children:b.map((t,s)=>e.jsx("button",{type:"button",onClick:()=>N(s),className:`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${s===y?"border-emerald-400 scale-105 shadow-md":"border-white/20 opacity-60 hover:opacity-100"}`,children:e.jsx("img",{src:t.url,className:"w-full h-full object-cover"})},s))})]})]})};export{Ut as DetailModal};
