import { SupplierRecord, StoreInspoRecord } from '../types';

function escapeHtml(str?: string | number | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildExecutiveReportHtml(
  item: SupplierRecord | StoreInspoRecord,
  convertCnyToThb: (cny: number) => number,
  mode: 'print' | 'pdf'
): string {
  const isSupplier = item.type === 'supplier';
  const sup = isSupplier ? (item as SupplierRecord) : null;
  const st = !isSupplier ? (item as StoreInspoRecord) : null;

  const title = isSupplier ? sup!.name : st!.storeName;
  const chineseName = isSupplier ? sup!.chineseName : st!.chineseName;
  const category = isSupplier ? sup!.category : st!.storeCategory || 'เรฟร้านน้ำ';
  const city = isSupplier ? sup!.marketOrCity : st!.city;
  const countryLabel = item.country === 'TH' ? '🇹🇭 ประเทศไทย (Thailand)' : '🇨🇳 ประเทศจีน (China)';

  // Collect all photos with clear labels
  const allPhotos: { url: string; label: string }[] = [];
  if (sup) {
    sup.photos.storefrontAndAtmosphere?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `ป้ายหน้าร้าน / บรรยากาศ #${idx + 1}` })
    );
    sup.photos.contactCards?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `นามบัตร / WeChat #${idx + 1}` })
    );
    sup.catalogItems?.forEach((c, idx) => {
      if (c.photo) {
        allPhotos.push({
          url: c.photo,
          label: c.name ? `สินค้า: ${c.name}` : `รายการสินค้า #${idx + 1}`,
        });
      }
    });
  } else if (st) {
    st.photos.storefrontAndAtmosphere?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `หน้าร้าน / บรรยากาศ #${idx + 1}` })
    );
    st.photos.menuBoard?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `ป้ายเมนู / ราคา #${idx + 1}` })
    );
    st.photos.drinkCups?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `แก้วเครื่องดื่ม #${idx + 1}` })
    );
    st.drinkItems?.forEach((d, idx) => {
      if (d.photo) {
        allPhotos.push({
          url: d.photo,
          label: d.name ? `เมนูชิม: ${d.name}` : `แก้วชิม #${idx + 1}`,
        });
      }
    });
  }

  const viewedBy = Array.isArray(item.viewedBy) ? item.viewedBy : [];
  const likes = Array.isArray(item.likes) ? item.likes : [];
  const notes = Array.isArray(item.reviewerNotes) ? item.reviewerNotes : [];

  const safeFilename = `ฉันจะเป็นหัวแถว-${title.replace(/[^a-zA-Z0-9ก-๙_-]/g, '_')}.pdf`;

  const stageMap: Record<string, string> = {
    awaiting: '1. รอรับช่วงต่อ',
    rfq_sent: '2. ขอสเปก / ส่ง RFQ',
    sample_test: '3. ทดสอบตัวอย่าง Lab / R&D',
    negotiate: '4. ต่อรองราคา & MOQ',
    approved: '5. ตัวเต็งอนุมัติ',
    ordered: '6. สั่งซื้อสำเร็จ',
  };

  const handoffStageLabel = stageMap[item.handoffStage || 'awaiting'] || '1. รอรับช่วงต่อ';

  // Build Catalog or Drink Items Table HTML
  let itemsSectionHtml = '';
  if (isSupplier && sup) {
    const rows = (sup.catalogItems || [])
      .map(
        (c, i) => `
        <tr>
          <td style="text-align:center;font-weight:700;">${i + 1}</td>
          <td style="width:76px;">
            ${
              c.photo
                ? `<img src="${escapeHtml(c.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`
                : `<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>`
            }
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${escapeHtml(c.name || `รายการที่ #${i + 1}`)}</div>
            ${c.memo ? `<div style="font-size:11px;color:#475569;margin-top:3px;">${escapeHtml(c.memo)}</div>` : ''}
          </td>
          <td>${escapeHtml(c.dimensions || '-')} / ${escapeHtml(c.weightKg || '-')}</td>
          <td style="font-weight:700;color:#047857;">
            ${
              c.priceRmb
                ? `¥${c.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${convertCnyToThb(c.priceRmb).toLocaleString()})</div>`
                : c.priceThb
                ? `฿${c.priceThb.toLocaleString()}`
                : '-'
            }
          </td>
        </tr>`
      )
      .join('');

    itemsSectionHtml = `
      <div class="section-box">
        <div class="section-title">📦 กลุ่มที่ 2: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(sup.catalogItems || []).length} รายการ)</div>
        ${
          rows
            ? `<table class="data-table">
                <thead>
                  <tr>
                    <th style="width:40px;">#</th>
                    <th style="width:80px;">รูปภาพ</th>
                    <th>ชื่อรายการ & รายละเอียดสเปก</th>
                    <th style="width:140px;">ขนาด / น้ำหนัก</th>
                    <th style="width:130px;">ราคาประเมิน</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>`
            : `<div class="empty-note">ไม่มีรายการย่อย</div>`
        }
      </div>
    `;
  } else if (st) {
    const rows = (st.drinkItems || [])
      .map(
        (d, i) => `
        <tr>
          <td style="text-align:center;font-weight:700;">${i + 1}</td>
          <td style="width:76px;">
            ${
              d.photo
                ? `<img src="${escapeHtml(d.photo)}" crossorigin="anonymous" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;" />`
                : `<div style="width:64px;height:64px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94a3b8;">ไม่มีรูป</div>`
            }
          </td>
          <td>
            <div style="font-weight:700;color:#0f172a;">${escapeHtml(d.name || `แก้วที่ #${i + 1}`)}</div>
            ${d.gimmickNotes ? `<div style="font-size:11px;color:#475569;margin-top:3px;">กิมมิก: ${escapeHtml(d.gimmickNotes)}</div>` : ''}
          </td>
          <td>${escapeHtml(d.cupSize || '-')}</td>
          <td>${escapeHtml(d.fitMenuTarget || '-')}</td>
          <td style="font-weight:700;color:#b45309;">
            ${
              d.priceRmb
                ? `¥${d.priceRmb.toLocaleString()} <div style="font-size:11px;color:#64748b;">(≈ ฿${convertCnyToThb(d.priceRmb).toLocaleString()})</div>`
                : d.priceThb
                ? `฿${d.priceThb.toLocaleString()}`
                : '-'
            }
          </td>
        </tr>`
      )
      .join('');

    itemsSectionHtml = `
      <div class="section-box">
        <div class="section-title">🧋 กลุ่มที่ 2: เมนูที่ชิม & การถอดรหัสสูตร (${(st.drinkItems || []).length} เมนู)</div>
        ${
          rows
            ? `<table class="data-table">
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
                <tbody>${rows}</tbody>
              </table>`
            : `<div class="empty-note">ไม่มีเมนูย่อย</div>`
        }
      </div>
    `;
  }

  // Build All Photos Grid
  const photosGridHtml =
    allPhotos.length > 0
      ? `<div class="photo-grid">
          ${allPhotos
            .map(
              (p, i) => `
              <div class="photo-card">
                <img src="${escapeHtml(p.url)}" crossorigin="anonymous" />
                <div class="photo-caption">รูปที่ ${i + 1}: ${escapeHtml(p.label)}</div>
              </div>`
            )
            .join('')}
        </div>`
      : `<div class="empty-note">ไม่มีรูปภาพในรายการนี้</div>`;

  // Build Viewer Read Log Table
  const viewerRowsHtml =
    viewedBy.length > 0
      ? `<table class="data-table">
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
            ${viewedBy
              .map(
                (v, idx) => `
              <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td><strong>${escapeHtml(v.alias)}</strong> (${escapeHtml(v.name)})</td>
                <td>${escapeHtml(v.role.toUpperCase())}</td>
                <td>${new Date(v.lastViewedAt).toLocaleString('th-TH')}</td>
                <td style="text-align:center;font-weight:700;">${v.viewCount || 1} ครั้ง</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>`
      : `<div class="empty-note">ยังไม่มีประวัติการเปิดอ่าน</div>`;

  // Build Comments & Replies Section
  const commentsHtml =
    notes.length > 0
      ? notes
          .map(
            (n, idx) => `
          <div class="comment-box">
            <div class="comment-header">
              <strong>ความคิดเห็นที่ #${idx + 1} โดย: ${escapeHtml(n.author)}</strong>
              <span>${new Date(n.timestamp).toLocaleString('th-TH')}</span>
            </div>
            <div class="comment-body">${escapeHtml(n.text)}</div>
            ${
              n.replies && n.replies.length > 0
                ? `<div class="reply-list">
                    ${n.replies
                      .map(
                        (r) => `
                        <div class="reply-item">
                          <div class="comment-header">
                            <strong>↳ ตอบกลับโดย: ${escapeHtml(r.author)} ${
                              r.replyToAuthor ? `(ถึง @${escapeHtml(r.replyToAuthor)})` : ''
                            }</strong>
                            <span>${new Date(r.timestamp).toLocaleString('th-TH')}</span>
                          </div>
                          <div>${escapeHtml(r.text)}</div>
                        </div>`
                      )
                      .join('')}
                  </div>`
                : ''
            }
          </div>`
          )
          .join('')
      : `<div class="empty-note">ยังไม่มีความคิดเห็นในรายการนี้</div>`;

  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>ฉันจะเป็นหัวแถว - ${escapeHtml(title)}</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
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
      <strong style="font-size:14px;">📄 รายงานสรุป: ${escapeHtml(title)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${mode === 'pdf' ? 'กำลังสร้างไฟล์ PDF ดาวน์โหลดอัตโนมัติ...' : 'พร้อมพิมพ์รายงาน'}
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
          <span class="badge">${isSupplier ? '🏭 รายงานซัพพลายเออร์ & โรงงาน' : '🧋 รายงานเรฟร้านน้ำ & R&D'} · ${countryLabel}</span>
          <h1 class="brand-title">${escapeHtml(title)}</h1>
          <p class="brand-sub">${escapeHtml(chineseName || '')} · หมวดหมู่: ${escapeHtml(category)}</p>
        </div>
      </div>
      <div class="meta-box">
        <div style="font-weight:800;color:#0f172a;font-size:13px;">แพลตฟอร์ม: ฉันจะเป็นหัวแถว</div>
        <div>รหัสอ้างอิง: ${escapeHtml(item.id)}</div>
        <div>สถานะรับช่วงต่อ: <strong>${escapeHtml(handoffStageLabel)}</strong></div>
        <div>วันที่ออกรายงาน: ${new Date().toLocaleString('th-TH')}</div>
      </div>
    </div>

    <!-- Group 1: Overview, Contacts, Location & Handoff -->
    <div class="section-box">
      <div class="section-title">📌 กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">ชื่อรายการ / ร้านค้า:</span>
          <span class="info-value">${escapeHtml(title)} ${chineseName ? `(${escapeHtml(chineseName)})` : ''}</span>
        </div>
        <div class="info-item">
          <span class="info-label">หมวดหมู่ & คะแนนประเมิน:</span>
          <span class="info-value">${escapeHtml(category)} · ${
            isSupplier
              ? `${'★'.repeat(sup?.rating || 5)} (${sup?.rating || 5}/5)`
              : `รสชาติ ${st?.ratings.taste}/5 · ดีไซน์ ${st?.ratings.aesthetics}/5 · คุ้มค่า ${st?.ratings.value}/5`
          }</span>
        </div>
        <div class="info-item">
          <span class="info-label">สถานที่ / ตลาด / เมือง:</span>
          <span class="info-value">${escapeHtml(city || item.location?.addressText || '-')}</span>
        </div>
        <div class="info-item">
          <span class="info-label">พิกัด GPS (Lat, Lng):</span>
          <span class="info-value">${
            item.location ? `${item.location.lat.toFixed(5)}, ${item.location.lng.toFixed(5)}` : '-'
          }</span>
        </div>
        <div class="info-item">
          <span class="info-label">ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์):</span>
          <span class="info-value">
            WeChat: ${escapeHtml((isSupplier ? sup?.wechatId : st?.wechatId) || '-')} |
            LINE: ${escapeHtml((isSupplier ? sup?.lineId : st?.lineId) || '-')} |
            โทร: ${escapeHtml((isSupplier ? sup?.phone : st?.phone) || '-')}
          </span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก:</span>
          <span class="info-value">${escapeHtml(item.creator.alias)} (${escapeHtml(item.creator.name)}) · ${new Date(item.creator.timestamp).toLocaleString('th-TH')}</span>
        </div>
        <div class="info-item">
          <span class="info-label">ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม:</span>
          <span class="info-value">${escapeHtml(item.assignedTo || 'ยังไม่ระบุ')} · กำหนดติดตาม: ${escapeHtml(item.targetFollowUpDate || '-')}</span>
        </div>
        <div class="info-item">
          <span class="info-label">จำนวนผู้กดถูกใจ (Likes) & เปิดอ่าน:</span>
          <span class="info-value">ถูกใจ ${likes.length} คน · เปิดอ่านแล้ว ${viewedBy.length} คน</span>
        </div>
      </div>

      ${
        (isSupplier ? sup?.memo : st?.tastingNotes)
          ? `<div style="margin-top:12px;padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:12px;">
              <strong>📝 บันทึกภาพรวมหน้างาน:</strong> ${escapeHtml(isSupplier ? sup?.memo : st?.tastingNotes)}
            </div>`
          : ''
      }

      ${
        item.handoffNotes
          ? `<div style="margin-top:8px;padding:10px;background:#ecfdf5;border-radius:8px;border:1px solid #a7f3d0;font-size:12px;color:#065f46;">
              <strong>🤝 โน้ตการส่งมอบงาน / ผลเจรจา:</strong> ${escapeHtml(item.handoffNotes)}
            </div>`
          : ''
      }
    </div>

    <!-- Group 2: Catalog / Drink Items -->
    ${itemsSectionHtml}

    <!-- Group 3: All Photos of This Item -->
    <div class="section-box">
      <div class="section-title">🖼️ กลุ่มที่ 3: ภาพถ่ายทั้งหมดของรายการนี้ (${allPhotos.length} รูป)</div>
      ${photosGridHtml}
    </div>

    <!-- Group 4: Viewer Log (รายการ Log คนดู) -->
    <div class="section-box">
      <div class="section-title">👁️ กลุ่มที่ 4: รายการ Log ผู้เปิดอ่านข้อมูล (Viewer Log - ${viewedBy.length} คน)</div>
      ${viewerRowsHtml}
    </div>

    <!-- Group 5: All Threaded Comments & Replies -->
    <div class="section-box">
      <div class="section-title">💬 กลุ่มที่ 5: บันทึกความคิดเห็นและการตอบกลับทั้งหมด (${notes.length} หัวข้อสนทนา)</div>
      ${commentsHtml}
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
          filename: ${JSON.stringify(safeFilename)},
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
      var mode = ${JSON.stringify(mode)};
      setTimeout(function() {
        if (mode === 'pdf') {
          triggerDownloadPdf();
        } else {
          window.print();
        }
      }, 600);
    });
  </script>
</body>
</html>`;
}

export function openExecutiveReport(
  item: SupplierRecord | StoreInspoRecord,
  convertCnyToThb: (cny: number) => number,
  mode: 'print' | 'pdf'
): void {
  const html = buildExecutiveReportHtml(item, convertCnyToThb, mode);
  const reportWindow = window.open('', '_blank');
  if (reportWindow) {
    reportWindow.document.open();
    reportWindow.document.write(html);
    reportWindow.document.close();
  } else {
    // Fallback if popup blocker prevents new tab: download HTML/Print directly
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
  }
}
