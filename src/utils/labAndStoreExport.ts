import { LabItem, FranchiseStore } from '../types';

function escapeHtml(str?: string | number | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Open a dedicated, pristine A4 printable document for a LEAD LAB formula
 */
export function printLeadLabSpecReport(item: LabItem) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const gpPercent = item.suggestedPriceThb > 0
    ? (((item.suggestedPriceThb - item.costTotalThb) / item.suggestedPriceThb) * 100).toFixed(1)
    : '0.0';

  const statusLabel = {
    approved: '✅ ผ่านเกณฑ์อนุมัติ (Approved)',
    testing: '⏳ กำลังทดลอง & วิจัย (Testing)',
    shelved: '📦 พักสูตร (Shelved)',
  }[item.status] || item.status;

  const commentsList = (item.revisionCycles || []).flatMap((c) =>
    (c.comments || []).map((comm) => ({
      ...comm,
      cycleTitle: c.title,
    }))
  );

  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>LEAD LAB R&D Spec - ${escapeHtml(item.code)} ${escapeHtml(item.name)}</title>
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
      <span class="meta-badge">${escapeHtml(item.code)}</span>
      <div style="font-size: 11px; color: #64748b; margin-top: 4px;">วันที่ออกเอกสาร: ${new Date().toLocaleDateString('th-TH')}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="photo-box">
      <img src="${escapeHtml(item.photoUrl)}" alt="${escapeHtml(item.name)}" />
    </div>
    <div class="info-card">
      <div style="font-size: 18px; font-weight: 900; color: #0f172a;">${escapeHtml(item.name)}</div>
      <div style="font-size: 13px; font-family: monospace; color: #475569; margin-bottom: 8px;">${escapeHtml(item.nameEn)} · ${escapeHtml(item.category)}</div>
      <div style="font-size: 12px; font-weight: bold; margin-bottom: 8px;">สถานะ: <span style="color: #4f46e5;">${escapeHtml(statusLabel)}</span></div>
      <div style="font-size: 12px; color: #334155; line-height: 1.6;">${escapeHtml(item.description)}</div>
      <div style="font-size: 11px; color: #64748b; margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1;">
        👤 ผู้สร้างสูตร: <strong>${escapeHtml(item.createdByName || 'R&D Team')}</strong> (${item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH') : '-'})
        ${item.galleryPhotos && item.galleryPhotos.length > 0 ? ` · 📷 รูปแนบ: ${item.galleryPhotos.length} ภาพ` : ''}
        ${item.audioNotes && item.audioNotes.length > 0 ? ` · 🎙️ วอยซ์เสียง: ${item.audioNotes.length} คลิป` : ''}
        ${item.videos && item.videos.length > 0 ? ` · 🎬 คลิปวิดีโอ: ${item.videos.length} คลิป` : ''}
      </div>
    </div>
  </div>

  <!-- Financial KPI Bar -->
  <div class="kpi-row">
    <div class="kpi">
      <div class="lbl">ต้นทุนวัตถุดิบ</div>
      <div class="num">฿${item.costIngredientThb.toFixed(2)}</div>
    </div>
    <div class="kpi">
      <div class="lbl">ต้นทุนบรรจุภัณฑ์</div>
      <div class="num">฿${item.costPackagingThb.toFixed(2)}</div>
    </div>
    <div class="kpi">
      <div class="lbl">รวมต้นทุน/แก้ว</div>
      <div class="num">฿${item.costTotalThb.toFixed(2)}</div>
    </div>
    <div class="kpi highlight">
      <div class="lbl">ราคาขายแนะนำ (GP %)</div>
      <div class="num">฿${item.suggestedPriceThb.toFixed(2)} (${gpPercent}%)</div>
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
        <td>${escapeHtml(item.sweetnessLevels.zero.sweetenerType)} (${item.sweetnessLevels.zero.syrupMl} ml)</td>
        <td>${item.sweetnessLevels.zero.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold;">${item.sweetnessLevels.zero.brix} °Bx</td>
        <td style="text-align: center;">${item.sweetnessLevels.zero.caloriesKcal} kcal</td>
        <td><em>"${escapeHtml(item.sweetnessLevels.zero.tasteNotes)}"</em></td>
      </tr>
      <tr style="background: #fdf2f8;">
        <td><strong>หวาน 50% (หวานน้อยละมุน) ⭐</strong></td>
        <td>${escapeHtml(item.sweetnessLevels.half.sweetenerType)} (${item.sweetnessLevels.half.syrupMl} ml)</td>
        <td>${item.sweetnessLevels.half.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold; color: #db2777;">${item.sweetnessLevels.half.brix} °Bx</td>
        <td style="text-align: center;">${item.sweetnessLevels.half.caloriesKcal} kcal</td>
        <td><em>"${escapeHtml(item.sweetnessLevels.half.tasteNotes)}"</em></td>
      </tr>
      <tr>
        <td><strong>หวาน 100% (หวานปกติ)</strong></td>
        <td>${escapeHtml(item.sweetnessLevels.full.sweetenerType)} (${item.sweetnessLevels.full.syrupMl} ml)</td>
        <td>${item.sweetnessLevels.full.baseLiquidMl} ml</td>
        <td style="text-align: center; font-weight: bold;">${item.sweetnessLevels.full.brix} °Bx</td>
        <td style="text-align: center;">${item.sweetnessLevels.full.caloriesKcal} kcal</td>
        <td><em>"${escapeHtml(item.sweetnessLevels.full.tasteNotes)}"</em></td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Specs -->
  ${item.technicalSpecs ? `
  <div class="sec-title">⚙️ พารามิเตอร์การสกัดมาตรฐาน (Extraction Parameters)</div>
  <table>
    <tr>
      <th>อุณหภูมิน้ำสกัด</th>
      <td><strong>${item.technicalSpecs.brewingTempC || '-'} °C</strong></td>
      <th>เวลาสกัด (Extraction Time)</th>
      <td><strong>${item.technicalSpecs.extractionTimeSec || '-'} วินาที</strong></td>
    </tr>
    <tr>
      <th>ปริมาณใบชา/ผง</th>
      <td><strong>${item.technicalSpecs.teaLeavesG || '-'} g</strong></td>
      <th>อายุการจัดเก็บน้ำชาพร้อมใช้</th>
      <td><strong>${item.technicalSpecs.shelfLifeHours || '-'} ชั่วโมง</strong></td>
    </tr>
  </table>` : ''}

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
      ${(item.ingredients || []).map(ing => `
      <tr>
        <td>${escapeHtml(ing.name)}</td>
        <td>${ing.quantity} ${escapeHtml(ing.unit)}</td>
        <td>฿${ing.costThb.toFixed(2)}</td>
      </tr>`).join('')}
    </tbody>
  </table>

  <!-- Social & Feedback Section -->
  <div class="sec-title">💬 บันทึกการโต้ตอบ & ข้อเสนอแนะจากทีมงาน (Team Collaboration)</div>
  <div style="font-size: 11px; color: #475569; margin-bottom: 8px;">
    ❤️ ยอดไลก์สูตร: <strong>${(item.likedBy || []).length} ไลก์</strong> | ประวัติรอบการพัฒนา: <strong>${(item.revisionCycles || []).length} รอบ</strong>
  </div>
  ${commentsList.slice(0, 4).map(comm => `
  <div class="comment-item">
    <div class="comment-meta">
      <span>👤 ${escapeHtml(comm.authorName)} [เจาะจง: หวาน ${escapeHtml(comm.sweetnessTarget || 'ภาพรวม')}%]</span>
      <span>👍 ${(comm.likes || []).length} ไลก์</span>
    </div>
    <div style="font-size: 12px; color: #1e1b4b;">"${escapeHtml(comm.content)}"</div>
  </div>`).join('')}

  <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; text-align: center; font-size: 12px;">
    <div style="border-top: 1px solid #94a3b8; padding-top: 8px;">
      ลงชื่อ R&D Specialist ผู้พัฒนาสูตร
    </div>
    <div style="border-top: 1px solid #94a3b8; padding-top: 8px;">
      ลงชื่อ ผู้มีอำนาจอนุมัติ (Owner / Management)
    </div>
  </div>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
}

/**
 * Open a dedicated, pristine A4 printable document for Franchise Store Menu & Barista SOP
 */
export function printFranchiseStoreReport(store: FranchiseStore, enrichedMenuItems: any[]) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const drinks = enrichedMenuItems.filter(x => x.labItem?.type === 'drink');
  const toppings = enrichedMenuItems.filter(x => x.labItem?.type === 'topping');

  const commentsList = (store.revisionCycles || []).flatMap((c) =>
    (c.comments || []).map((comm) => comm)
  );

  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>คู่มือเมนูหน้าร้าน & SOP - ${escapeHtml(store.name)}</title>
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
      <h1>🏪 ${escapeHtml(store.name)} · ${escapeHtml(store.branch)}</h1>
      <div class="sub">"${escapeHtml(store.brandTagline)}" | เวลาทำการ: ${escapeHtml(store.openingHours || '10:00 - 21:30 น.')} | โทร: ${escapeHtml(store.contactNumber || '-')}</div>
      <div style="font-size: 11px; color: #047857; margin-top: 3px;">
        👤 ผู้สร้างร้าน: <strong>${escapeHtml(store.createdByName || 'Franchise Team')}</strong> (${store.createdAt ? new Date(store.createdAt).toLocaleDateString('th-TH') : '-'})
        ${store.galleryPhotos && store.galleryPhotos.length > 0 ? ` · 📷 รูปภาพสาขา: ${store.galleryPhotos.length} ภาพ` : ''}
        ${store.audioNotes && store.audioNotes.length > 0 ? ` · 🎙️ วอยซ์เสียง: ${store.audioNotes.length} คลิป` : ''}
        ${store.videos && store.videos.length > 0 ? ` · 🎬 คลิปวิดีโอ: ${store.videos.length} คลิป` : ''}
      </div>
    </div>
    <div style="text-align: right; font-size: 11px;">
      <span style="background: #ecfdf5; color: #065f46; padding: 4px 8px; border-radius: 6px; font-weight: bold; border: 1px solid #a7f3d0;">
        กระดานเมนู & คู่มือ SOP บาริสต้าฉบับหน้าร้าน
      </span>
      <div style="color: #64748b; margin-top: 3px;">อัปเดตล่าสุด: ${new Date().toLocaleDateString('th-TH')}</div>
    </div>
  </div>

  <!-- Drinks Table -->
  <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 6px;">🥤 หมวดหมู่เครื่องดื่ม (Handcrafted Beverages) - ${drinks.length} รายการ</div>
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
      ${drinks.map((item: any, idx: number) => {
        const lab = item.labItem;
        const menu = item.menuItem;
        return `
        <tr>
          <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
          <td>
            <strong>${escapeHtml(menu.customName || lab.name)}</strong>
            <div style="font-size: 10px; color: #64748b;">${escapeHtml(lab.nameEn)} (${escapeHtml(lab.code)})</div>
            ${menu.badge && menu.badge !== 'None' ? `<span class="badge ${menu.badge === 'Best Seller' ? 'badge-seller' : menu.badge === 'Must Try' ? 'badge-must' : ''}">${escapeHtml(menu.badge)}</span>` : ''}
          </td>
          <td style="text-align: right;" class="price">฿${menu.retailPriceThb}</td>
          <td>
            ไซรัป: <strong>${lab.sweetnessLevels?.half?.syrupMl || 15} ml</strong> (Brix: ${lab.sweetnessLevels?.half?.brix || 8.5}°Bx)
            <div style="font-size: 10px; color: #475569;">${escapeHtml(lab.sweetnessLevels?.half?.tasteNotes || '')}</div>
          </td>
          <td>
            0%: ไซรัป ${lab.sweetnessLevels?.zero?.syrupMl || 0}ml (${lab.sweetnessLevels?.zero?.brix || 3}°Bx)<br/>
            100%: ไซรัป ${lab.sweetnessLevels?.full?.syrupMl || 30}ml (${lab.sweetnessLevels?.full?.brix || 13.5}°Bx)
          </td>
          <td>
            ${(menu.recommendedToppingIds || []).map((tId: string) => {
              const top = enrichedMenuItems.find(x => x.menuItem.labItemId === tId);
              return top ? `<span class="badge" style="margin-right: 3px;">+ ${escapeHtml(top.menuItem.customName || top.labItem.name)}</span>` : '';
            }).join('') || '-'}
          </td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>

  <!-- Toppings Table -->
  ${toppings.length > 0 ? `
  <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 6px;">🍮 หมวดหมู่ท็อปปิ้ง (Specialty Toppings) - ${toppings.length} รายการ</div>
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
      ${toppings.map((item: any, idx: number) => `
      <tr>
        <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
        <td>
          <strong>${escapeHtml(item.menuItem.customName || item.labItem.name)}</strong>
          <span class="badge badge-seller" style="margin-left: 6px;">${escapeHtml(item.menuItem.badge || 'Topping')}</span>
        </td>
        <td style="text-align: right;" class="price">+฿${item.menuItem.retailPriceThb}</td>
        <td>${escapeHtml(item.labItem.description || '-')}</td>
      </tr>`).join('')}
    </tbody>
  </table>` : ''}

  <!-- Social feedback note -->
  <div style="margin-top: 10px; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between;">
    <span>❤️ ได้รับความนิยมจากทีมงาน: <strong>${(store.likedBy || []).length} ไลก์</strong></span>
    <span>💬 คอมเมนต์ปรับปรุงหน้าร้าน: <strong>${commentsList.length} ข้อความ</strong></span>
    <span>📋 รหัสสาขา: <strong>${escapeHtml(store.id)}</strong></span>
  </div>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
}

/**
 * Format and trigger Share to LINE / copy text for LEAD LAB item
 */
export async function shareLeadLabItem(item: LabItem): Promise<boolean> {
  const gpPercent = item.suggestedPriceThb > 0
    ? (((item.suggestedPriceThb - item.costTotalThb) / item.suggestedPriceThb) * 100).toFixed(1)
    : '0.0';

  const deepLink = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?tab=lead_lab&view=${encodeURIComponent(item.id)}`
    : '';

  const text = `🧪 [LEAD LAB R&D] สรุปสูตรเครื่องดื่มมาตรฐาน
━━━━━━━━━━━━━━━━━━━━
📌 รหัสสูตร: ${item.code}
🥤 ชื่อสูตร: ${item.name} (${item.nameEn})
🏷️ หมวดหมู่: ${item.category}
💰 ต้นทุนรวม: ฿${item.costTotalThb.toFixed(2)} | ราคาขายแนะนำ: ฿${item.suggestedPriceThb.toFixed(2)} (GP ${gpPercent}%)
━━━━━━━━━━━━━━━━━━━━
🍬 เมทริกซ์ความหวาน & Brix:
• หวาน 0%: ไซรัป ${item.sweetnessLevels.zero.syrupMl}ml (Brix ${item.sweetnessLevels.zero.brix}°Bx)
• หวาน 50%: ไซรัป ${item.sweetnessLevels.half.syrupMl}ml (Brix ${item.sweetnessLevels.half.brix}°Bx) ⭐ แนะนำ
• หวาน 100%: ไซรัป ${item.sweetnessLevels.full.syrupMl}ml (Brix ${item.sweetnessLevels.full.brix}°Bx)
━━━━━━━━━━━━━━━━━━━━
❤️ ไลก์: ${(item.likedBy || []).length} คน | 💬 รอบพัฒนา: ${(item.revisionCycles || []).length} รอบ
🔗 กดดูสูตรทันที: ${deepLink}`;

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  } catch (e) {
    console.warn('Failed to copy text', e);
  }

  // Open LINE share
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
  window.open(lineUrl, '_blank');
  return true;
}

/**
 * Format and trigger Share to LINE / copy text for Franchise Store
 */
export async function shareFranchiseStore(store: FranchiseStore, menuCount: number): Promise<boolean> {
  const deepLink = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?tab=franchise_stores&view=${encodeURIComponent(store.id)}`
    : '';

  const text = `🏪 [BRAND STOREFRONT] ข้อมูลแบรนด์และเมนูบอร์ด
━━━━━━━━━━━━━━━━━━━━
📌 แบรนด์: ${store.name}
🏷️ รูปแบบ: ${store.recordKind === 'brand' ? 'หนึ่งคอนเซ็ปต์ สองแบรนด์ · ไม่มีสาขา' : store.branch}
💬 สโลแกน: "${store.brandTagline}"
⏰ เวลาทำการ: ${store.openingHours || '10:00 - 21:30 น.'}
📞 โทร: ${store.contactNumber || '-'}
━━━━━━━━━━━━━━━━━━━━
🥤 จำนวนเมนูบนบอร์ด: ${menuCount} รายการ
❤️ ทีมงานไลก์: ${(store.likedBy || []).length} คน
🔗 กดดูข้อมูลแบรนด์: ${deepLink}`;

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  } catch (e) {
    console.warn('Failed to copy text', e);
  }

  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
  window.open(lineUrl, '_blank');
  return true;
}
