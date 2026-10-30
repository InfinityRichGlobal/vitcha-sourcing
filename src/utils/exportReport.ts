import QRCode from 'qrcode';
import { SupplierRecord, StoreInspoRecord, LocationRecord, AttachedFile, User } from '../types';
import { activityStages, activityStageName, activityFieldLabels, getActivityEntries } from './activityHistory';
import { getItemVoiceNotes } from './audioHelper';
import { FALLBACK_DEMO_VIDEO_URL } from './mediaStorage';
import { getRenderServerUrl } from '../services/api';

function escapeHtml(str?: string | number | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Segments Thai/mixed text into word-level inline-block spans so html2canvas
 * never miscalculates multi-line Thai text runs or draws text across table borders.
 */
function segmentThaiHtml(str?: string | number | null): string {
  if (str === undefined || str === null || str === '') return '';
  const raw = String(str);
  const lines = raw.split(/\r?\n/);

  const segmentLine = (line: string): string => {
    if (!line) return '';
    try {
      const IntlWithSegmenter = Intl as unknown as {
        Segmenter?: new (
          locale: string,
          opts: { granularity: string }
        ) => { segment: (input: string) => Iterable<{ segment: string }> };
      };
      if (typeof Intl !== 'undefined' && IntlWithSegmenter.Segmenter) {
        const segmenter = new IntlWithSegmenter.Segmenter('th', { granularity: 'word' });
        const parts: string[] = [];
        for (const item of segmenter.segment(line)) {
          const seg = item.segment;
          if (/^\s+$/.test(seg)) {
            parts.push(' ');
          } else {
            parts.push(`<span class="w-seg">${escapeHtml(seg)}</span>`);
          }
        }
        return parts.join('');
      }
    } catch {
      // Fallback below if Segmenter is unavailable
    }
    return escapeHtml(line);
  };

  return lines.map(segmentLine).join('<br/>');
}

function generateQrSvgDataUri(text: string): string {
  try {
    const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
    const size = qr.modules.size;
    const margin = 2;
    const total = size + margin * 2;
    let paths = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (qr.modules.get(r, c)) {
          paths += `<rect x="${c + margin}" y="${r + margin}" width="1" height="1" fill="#0f172a"/>`;
        }
      }
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="200" height="200" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/>${paths}</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } catch {
    return '';
  }
}

export function buildExecutiveReportHtml(
  item: SupplierRecord | StoreInspoRecord | LocationRecord,
  convertCnyToThb: (cny: number) => number,
  mode: 'print' | 'pdf',
  users: User[] = []
): string {
  const isSupplier = item.type === 'supplier';
  const isLocation = item.type === 'location';
  const sup = isSupplier ? (item as SupplierRecord) : null;
  const loc = isLocation ? (item as LocationRecord) : null;
  const st = item.type === 'drink_store' ? (item as StoreInspoRecord) : null;

  const title = isSupplier ? sup!.name : isLocation ? loc!.name : st!.storeName;
  const chineseName = isSupplier ? sup!.chineseName : isLocation ? loc!.foreignName : st!.chineseName;
  const category = isSupplier ? sup!.category : isLocation ? (loc!.locationType === 'mall' ? 'ห้างสรรพสินค้า' : loc!.locationType) : st!.storeCategory || 'เรฟร้านน้ำ';
  const city = isSupplier ? sup!.marketOrCity : isLocation ? (loc!.location.addressText || loc!.zoneOrFloor) : st!.city;
  const countryLabel = item.country === 'TH' ? 'ประเทศไทย (TH)' : 'ประเทศจีน (CN)';

  // Build canonical direct link (same link format as ShareLineModal)
  const baseOrigin =
    typeof window !== 'undefined' &&
    window.location.origin &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1')
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://vitcha-sourcing-fxjw.onrender.com/';
  const normalizedBase = baseOrigin.endsWith('/') ? baseOrigin : `${baseOrigin}/`;
  const directLink = `${normalizedBase}?view=${encodeURIComponent(item.id)}&type=${encodeURIComponent(item.type)}`;
  const qrDataUri = generateQrSvgDataUri(directLink);

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
  } else if (loc) {
    loc.photos.storefrontAndAtmosphere?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `หน้าร้าน / ทางเดิน #${idx + 1}` })
    );
    loc.photos.floorPlanAndSpecs?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `ผังห้อง / งานระบบ #${idx + 1}` })
    );
    loc.photos.surroundingNeighbors?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `ร้านข้างเคียง #${idx + 1}` })
    );
    loc.photos.contactCards?.forEach((p, idx) =>
      allPhotos.push({ url: p, label: `นามบัตร / เอกสารสัญญา #${idx + 1}` })
    );
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

  // Collect all voice clips (main item + sub-items)
  const mainVoiceClips = getItemVoiceNotes(item);
  const allVoiceClips: { label: string; durationSec: number; source: string }[] = [];
  mainVoiceClips.forEach((vc, idx) => {
    allVoiceClips.push({
      label: vc.label || `คลิปเสียงหน้างาน #${idx + 1}`,
      durationSec: vc.durationSec || 4,
      source: 'บันทึกเสียงหลักหน้างานจริง',
    });
  });
  if (sup) {
    (sup.catalogItems || []).forEach((c, cIdx) => {
      getItemVoiceNotes(c).forEach((vc, vIdx) => {
        allVoiceClips.push({
          label: vc.label || `คลิปเสียงสินค้า #${vIdx + 1}`,
          durationSec: vc.durationSec || 4,
          source: `สินค้า: ${c.name || `รายการที่ #${cIdx + 1}`}`,
        });
      });
    });
  } else if (st) {
    (st.drinkItems || []).forEach((d, dIdx) => {
      getItemVoiceNotes(d).forEach((vc, vIdx) => {
        allVoiceClips.push({
          label: vc.label || `คลิปเสียงเมนู #${vIdx + 1}`,
          durationSec: vc.durationSec || 4,
          source: `เมนู: ${d.name || `แก้วที่ #${dIdx + 1}`}`,
        });
      });
    });
  }

  // Collect all videos
  const rawVideos = Array.isArray(item.videos) ? item.videos.filter(Boolean) : [];
  const fallbackThumbUrl = allPhotos[0]?.url || './logo.jpg';

  const viewedBy = Array.isArray(item.viewedBy) ? item.viewedBy : [];
  const likes = Array.isArray(item.likes) ? item.likes : [];
  const notes = Array.isArray(item.reviewerNotes) ? item.reviewerNotes : [];
  const historyEntries = getActivityEntries(item).sort((a, b) =>
    (Date.parse(a.timestamp) || 0) - (Date.parse(b.timestamp) || 0));
  const userName = (value: string) => users.find(u => u.id === value || u.alias === value || u.name === value)?.alias || value;

  const safeFilename = `ฉันจะเป็นหัวแถว-${title.replace(/[^a-zA-Z0-9ก-๙_-]/g, '_')}.pdf`;

  const stageMap: Record<string, string> = {
    awaiting: 'พาร์ท 1: รอรับช่วงต่อ',
    rfq_sent: 'พาร์ท 2: ขอสเปก / ส่ง RFQ',
    sample_test: 'พาร์ท 3: ทดสอบตัวอย่าง Lab / R&D',
    negotiate: 'พาร์ท 4: ต่อรองราคา & MOQ',
    approved: 'พาร์ท 5: ตัวเต็งอนุมัติ',
    ordered: 'พาร์ท 6: สั่งซื้อสำเร็จ',
  };

  const handoffStageLabel = stageMap[item.handoffStage || 'awaiting'] || 'พาร์ท 1: รอรับช่วงต่อ';

  // Build Multimedia Section (Voice Notes + Video Clips with Thumbnails)
  const voiceCardsHtml =
    allVoiceClips.length > 0
      ? `<div class="media-grid">
          ${allVoiceClips
            .map(
              (vc, idx) => `
              <div class="voice-card">
                <div class="voice-icon">▶</div>
                <div class="voice-meta">
                  <div class="voice-title">${segmentThaiHtml(`${idx + 1}. ${vc.label}`)}</div>
                  <div class="voice-sub">${segmentThaiHtml(`${vc.source} · ความยาว ${vc.durationSec} วินาที`)}</div>
                  <div class="voice-wave">${segmentThaiHtml('ılıll|ılıl||ılıll|ılı · สแกน QR เพื่อกดฟังเสียงจริง')}</div>
                </div>
              </div>`
            )
            .join('')}
        </div>`
      : `<div class="empty-note">${segmentThaiHtml('ไม่มีไฟล์เสียงบันทึกในรายการนี้')}</div>`;

  const videoCardsHtml =
    rawVideos.length > 0
      ? `<div class="video-grid">
          ${rawVideos
            .map((vidUrl, idx) => {
              const playableUrl = vidUrl.includes('gtv-videos-bucket')
                ? FALLBACK_DEMO_VIDEO_URL
                : vidUrl;
              return `
              <div class="video-card">
                <div class="video-thumb-wrap">
                  <img
                    id="video-thumb-img-${idx}"
                    class="video-thumb-img"
                    src="${escapeHtml(fallbackThumbUrl)}"
                    crossorigin="anonymous"
                    data-video-src="${escapeHtml(playableUrl)}"
                  />
                  <div class="video-overlay-top">
                    <span class="video-chip">VIDEO CLIP #${idx + 1}</span>
                    <span class="video-chip-right">HD PREVIEW</span>
                  </div>
                  <div class="video-play-circle">▶</div>
                  <div class="video-overlay-bottom">
                    <span>${segmentThaiHtml(`คลิปวิดีโอที่ ${idx + 1} · สแกน QR Code ด้านบนเพื่อเปิดเล่นวิดีโอ`)}</span>
                  </div>
                </div>
                <div class="video-caption">
                  <div class="video-caption-title">${segmentThaiHtml(`คลิปวิดีโอหน้างาน #${idx + 1} (จากทั้งหมด ${rawVideos.length} คลิป)`)}</div>
                  <div class="video-caption-sub">${segmentThaiHtml('เอกสารกระดาษแสดงภาพ Thumbnail ตัวอย่าง — สแกน QR Code เพื่อรับชมวิดีโอเคลื่อนไหวพร้อมเสียง')}</div>
                </div>
              </div>`;
            })
            .join('')}
        </div>`
      : `<div class="empty-note">${segmentThaiHtml('ไม่มีคลิปวิดีโอในรายการนี้')}</div>`;

  // Build Catalog or Drink Items Table HTML
  let itemsSectionHtml = '';
  if (isSupplier && sup) {
    const rows = (sup.catalogItems || [])
      .map((c, i) => {
        const subVoices = getItemVoiceNotes(c);
        return `
        <tr>
          <td style="text-align:center;font-weight:700;">${i + 1}</td>
          <td>
            ${
              c.photo
                ? `<img src="${escapeHtml(c.photo)}" crossorigin="anonymous" class="table-thumb" />`
                : `<div class="table-thumb-empty">ไม่มีรูป</div>`
            }
          </td>
          <td>
            <div class="cell-title">${segmentThaiHtml(c.name || `รายการที่ #${i + 1}`)}</div>
            ${c.memo ? `<div class="cell-sub">${segmentThaiHtml(c.memo)}</div>` : ''}
            ${
              subVoices.length > 0
                ? `<div class="cell-voice-badge">แนบเสียงบันทึก ${subVoices.length} คลิป</div>`
                : ''
            }
          </td>
          <td>
            <div class="cell-text">${segmentThaiHtml(c.dimensions || '-')}</div>
            <div class="cell-sub">${segmentThaiHtml(c.weightKg ? `น้ำหนัก: ${c.weightKg}` : '')}</div>
          </td>
          <td>
            <div class="cell-price-green">
              ${
                c.priceRmb
                  ? `¥${c.priceRmb.toLocaleString()}`
                  : c.priceThb
                  ? `฿${c.priceThb.toLocaleString()}`
                  : '-'
              }
            </div>
            ${
              c.priceRmb
                ? `<div class="cell-sub">(≈ ฿${convertCnyToThb(c.priceRmb).toLocaleString()})</div>`
                : ''
            }
          </td>
        </tr>`;
      })
      .join('');

    itemsSectionHtml = `
      <div class="section-box">
        <div class="section-title">${segmentThaiHtml(`กลุ่มที่ 3: รายการสินค้า / อุปกรณ์ / วัตถุดิบ (${(sup.catalogItems || []).length} รายการ)`)}</div>
        ${
          rows
            ? `<table class="data-table">
                <colgroup>
                  <col style="width:6%;" />
                  <col style="width:13%;" />
                  <col style="width:43%;" />
                  <col style="width:20%;" />
                  <col style="width:18%;" />
                </colgroup>
                <thead>
                  <tr>
                    <th style="text-align:center;">#</th>
                    <th>${segmentThaiHtml('รูปภาพ')}</th>
                    <th>${segmentThaiHtml('ชื่อรายการ & รายละเอียดสเปก')}</th>
                    <th>${segmentThaiHtml('ขนาด / น้ำหนัก')}</th>
                    <th>${segmentThaiHtml('ราคาประเมิน')}</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>`
            : `<div class="empty-note">${segmentThaiHtml('ไม่มีรายการย่อย')}</div>`
        }
      </div>
    `;
  } else if (st) {
    const rows = (st.drinkItems || [])
      .map((d, i) => {
        const subVoices = getItemVoiceNotes(d);
        return `
        <tr>
          <td style="text-align:center;font-weight:700;">${i + 1}</td>
          <td>
            ${
              d.photo
                ? `<img src="${escapeHtml(d.photo)}" crossorigin="anonymous" class="table-thumb" />`
                : `<div class="table-thumb-empty">ไม่มีรูป</div>`
            }
          </td>
          <td>
            <div class="cell-title">${segmentThaiHtml(d.name || `แก้วที่ #${i + 1}`)}</div>
            ${
              d.gimmickNotes
                ? `<div class="cell-sub">${segmentThaiHtml(`กิมมิก: ${d.gimmickNotes}`)}</div>`
                : ''
            }
            ${
              subVoices.length > 0
                ? `<div class="cell-voice-badge">แนบเสียงบันทึก ${subVoices.length} คลิป</div>`
                : ''
            }
          </td>
          <td>
            <div class="cell-text">${segmentThaiHtml(d.cupSize || '-')}</div>
          </td>
          <td>
            <div class="cell-text">${segmentThaiHtml(d.fitMenuTarget || '-')}</div>
          </td>
          <td>
            <div class="cell-price-amber">
              ${
                d.priceRmb
                  ? `¥${d.priceRmb.toLocaleString()}`
                  : d.priceThb
                  ? `฿${d.priceThb.toLocaleString()}`
                  : '-'
              }
            </div>
            ${
              d.priceRmb
                ? `<div class="cell-sub">(≈ ฿${convertCnyToThb(d.priceRmb).toLocaleString()})</div>`
                : ''
            }
          </td>
        </tr>`;
      })
      .join('');

    itemsSectionHtml = `
      <div class="section-box">
        <div class="section-title">${segmentThaiHtml(`กลุ่มที่ 3: เมนูที่ชิม & การถอดรหัสสูตร (${(st.drinkItems || []).length} เมนู)`)}</div>
        ${
          rows
            ? `<table class="data-table">
                <colgroup>
                  <col style="width:6%;" />
                  <col style="width:13%;" />
                  <col style="width:33%;" />
                  <col style="width:11%;" />
                  <col style="width:23%;" />
                  <col style="width:14%;" />
                </colgroup>
                <thead>
                  <tr>
                    <th style="text-align:center;">#</th>
                    <th>${segmentThaiHtml('รูปแก้ว')}</th>
                    <th>${segmentThaiHtml('ชื่อเมนู & กิมมิก')}</th>
                    <th>${segmentThaiHtml('ขนาดแก้ว')}</th>
                    <th>${segmentThaiHtml('ต่อยอดเมนูของเรา')}</th>
                    <th>${segmentThaiHtml('ราคาขาย')}</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>`
            : `<div class="empty-note">${segmentThaiHtml('ไม่มีเมนูย่อย')}</div>`
        }
      </div>
    `;
  }

  // Build Attached Files Section
  const rawAttachedFiles: AttachedFile[] = (item as any).attachedFiles || [];
  const attachedFilesHtml =
    rawAttachedFiles.length > 0
      ? `<div class="section-box">
          <div class="section-title">${segmentThaiHtml(`เอกสารและไฟล์แนบเพิ่มเติม (Attached Documents) — (${rawAttachedFiles.length} ไฟล์)`)}</div>
          <div class="media-subhead">${segmentThaiHtml('สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเปิดไฟล์บน Google Drive / เบราว์เซอร์:')}</div>
          ${rawAttachedFiles
            .map((f, idx) => {
              const fileQr = f.url ? generateQrSvgDataUri(f.url) : '';
              const ext = (f.name.split('.').pop() || 'FILE').toUpperCase();
              const sizeStr = f.size
                ? f.size < 1024 * 1024
                  ? `${(f.size / 1024).toFixed(1)} KB`
                  : `${(f.size / (1024 * 1024)).toFixed(1)} MB`
                : '';
              return `
              <div class="file-attachment-card">
                <div class="file-attachment-info">
                  <div class="file-attachment-name">#${idx + 1} [${escapeHtml(ext)}] ${escapeHtml(f.name)}</div>
                  <div class="file-attachment-meta">
                    ${sizeStr ? `ขนาด: ${sizeStr}` : ''}
                    ${f.uploadedAt ? ` · บันทึกเมื่อ: ${new Date(f.uploadedAt).toLocaleDateString('th-TH')}` : ''}
                  </div>
                  <div class="file-attachment-link">
                    <a href="${escapeHtml(f.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(f.url)}</a>
                  </div>
                </div>
                ${
                  fileQr
                    ? `<div class="file-attachment-qr">
                        <img src="${fileQr}" alt="QR" />
                        <div style="font-size:7px;text-align:center;color:#059669;font-weight:700;margin-top:2px;">Scan Open</div>
                      </div>`
                    : ''
                }
              </div>`;
            })
            .join('')}
        </div>`
      : '';

  // Build All Photos Grid
  const photosGridHtml =
    allPhotos.length > 0
      ? `<div class="photo-grid">
          ${allPhotos
            .map(
              (p, i) => `
              <div class="photo-card">
                <img src="${escapeHtml(p.url)}" crossorigin="anonymous" />
                <div class="photo-caption">${segmentThaiHtml(`รูปที่ ${i + 1}: ${p.label}`)}</div>
              </div>`
            )
            .join('')}
        </div>`
      : `<div class="empty-note">${segmentThaiHtml('ไม่มีรูปภาพในรายการนี้')}</div>`;

  // Build Comments & Replies Section
  // Render the same complete history as the detail page, independent of UI filters.
  // Blocks can flow across printed pages; a long event must never be clipped in a table row.
  const historyValueHtml = (value: unknown, field: string): string => {
    if (value == null || value === '' || Array.isArray(value) && !value.length) return '<span class="audit-empty">ยังไม่ระบุ / ไม่มีข้อมูล</span>';
    if (Array.isArray(value)) return value.map((v, i) => `<div class="audit-value-item"><b>${i + 1}.</b> ${historyValueHtml(v, field)}</div>`).join('');
    if (typeof value === 'object') return Object.entries(value).filter(([key]) => !['id', 'driveFileId'].includes(key)).map(([key, v]) => `<div class="audit-value-item"><strong>${segmentThaiHtml(activityFieldLabels[key] || key)}:</strong> ${historyValueHtml(v, `${field}.${key}`)}</div>`).join('');
    if (typeof value === 'boolean') return value ? 'ใช่' : 'ไม่ใช่';
    const text = String(value);
    if (field === 'handoffStage') return segmentThaiHtml(activityStageName(text));
    if (field === 'assignedTo') return segmentThaiHtml(userName(text));
    if (field === 'status') return segmentThaiHtml(({ scouted: 'สำรวจแล้ว', reviewing: 'เทียบสเปก', rfq_sent: 'ส่ง RFQ', shortlisted: 'ตัวเต็ง', ordered: 'สั่งซื้อแล้ว' } as Record<string, string>)[text] || text);
    const isMediaField = /url$|photos|photo|videos|voice|audio|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(field);
    if (isMediaField && /^(https?:\/\/|\.\/|\/(?!\/)|data:(image|audio|video)\/)/i.test(text)) {
      let url: string;
      try { url = new URL(text, /^\/(uploads|media)\//.test(text) ? getRenderServerUrl() : normalizedBase).href; } catch { return segmentThaiHtml(text); }
      const isAudio = /voice|audio/i.test(field);
      const isVideo = /video/i.test(field);
      const isImage = !isAudio && !isVideo && (/photos|photo|storefrontAndAtmosphere|contactCards|menuBoard|drinkCups|floorPlanAndSpecs|surroundingNeighbors/i.test(field) || /\.(png|jpe?g|webp|gif)(\?|$)/i.test(text));
      const link = text.startsWith('data:') ? directLink : url;
      return `<div class="audit-media">${isImage ? `<img src="${escapeHtml(url)}" crossorigin="anonymous" alt="ภาพที่บันทึกในประวัติ" />` : ''}<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${segmentThaiHtml(isAudio ? 'เปิดไฟล์เสียง' : isVideo ? 'เปิดวิดีโอ' : isImage ? 'เปิดภาพ' : 'เปิดไฟล์แนบ')}</a>${isAudio || isVideo ? `<span class="audit-empty"> · ${segmentThaiHtml('เปิดผ่านลิงก์หรือ QR ของรายการเพื่อฟังและดูต่อ')}</span>` : ''}</div>`;
    }
    return segmentThaiHtml(text);
  };

  const currentStage = item.handoffStage || 'awaiting';
  const recordedStages = historyEntries.filter(e => e.version === 2).flatMap(e => [e.stageBefore, e.stageAfter]);
  const lastRelevantStage = Math.max(0, ...[currentStage, ...recordedStages].map(stage => activityStages.findIndex(([key]) => key === stage)));
  const stageJourneyHtml = () => `<div class="audit-stages">${activityStages.slice(0, lastRelevantStage + 1).map(([stage], index) => {
    const visits = historyEntries.filter(e => e.version === 2 && (e.stageBefore === stage || e.stageAfter === stage));
    const entries = visits.filter(e => e.stageAfter === stage && e.stageBefore !== stage);
    const current = currentStage === stage;
    if (!visits.length) return `<div class="audit-stage audit-stage-missing">${segmentThaiHtml(`พาร์ท ${index + 1}: ไม่พบการบันทึกในพาร์ทนี้${current ? ' (สถานะปัจจุบัน)' : ''}`)}</div>`;
    const rows = historyEntries.map((e, i) => e.version === 2 && e.stageAfter === stage ? activityRowsHtml[i] : '').join('');
    return `<section class="audit-part"><div class="audit-stage ${current ? 'audit-current' : ''}"><strong>${segmentThaiHtml(activityStageName(stage))}${current ? ' · ปัจจุบัน' : ''}</strong>${entries.length > 1 ? `<span>${segmentThaiHtml(`บันทึกเข้า ${entries.length} ครั้ง`)}</span>` : ''}</div>${rows || `<p class="audit-empty">${segmentThaiHtml('พบพาร์ทนี้ในประวัติการส่งต่อไปขั้นตอนอื่น')}</p>`}</section>`;
  }).join('')}</div>`;

  const activityRowsHtml = historyEntries
    .map((h, idx) => {
      const actionLabel =
        h.kind === 'handoff' || h.action === 'handoff'
          ? 'ส่งต่องาน'
          : h.kind === 'comment' || h.action === 'comment'
          ? 'ความคิดเห็น'
          : h.kind === 'reply' || h.action === 'reply'
          ? 'ตอบกลับ'
          : h.action;
      const person = users.find(u => u.id === h.userId || u.alias === h.user || u.name === h.user);
      const avatar = h.userAvatar || person?.avatar;
      const safeAvatar = avatar && /^(https?:\/\/|\.\/|\/(?!\/)|data:image\/)/i.test(avatar) ? avatar : '';
      const moved = h.version === 2 && h.stageBefore && h.stageBefore !== h.stageAfter;
      return `<article class="audit-event" data-activity-id="${escapeHtml(h.id || idx)}">
        <div class="audit-event-heading">${safeAvatar ? `<img class="audit-avatar" src="${escapeHtml(safeAvatar)}" crossorigin="anonymous" alt="${escapeHtml(person?.alias || h.user)}" />` : `<span class="audit-avatar audit-avatar-fallback">${escapeHtml((person?.alias || h.user || '?').slice(0, 1))}</span>`}<strong>${segmentThaiHtml(person?.alias || h.user)}</strong><span>${segmentThaiHtml(Number.isNaN(Date.parse(h.timestamp)) ? h.timestamp : new Date(h.timestamp).toLocaleString('th-TH'))}</span></div>
        <div class="audit-action">${segmentThaiHtml(actionLabel)}</div>
        ${h.version === 2 ? `<div class="audit-transition">${segmentThaiHtml(moved ? `${activityStageName(h.stageBefore)} → ${activityStageName(h.stageAfter)}` : `ณ ${activityStageName(h.stageAfter)}`)}</div>` : ''}
        ${h.content ? `<div class="audit-content">${h.version !== 2 ? `<div class="audit-empty">${segmentThaiHtml('ข้อความที่ยังเก็บในรายการ · ไม่ทราบพาร์ท ณ เวลานั้น')}</div>` : ''}${h.content.replyToAuthor ? `<strong>${segmentThaiHtml(`ตอบกลับ ${h.content.replyToAuthor}`)}</strong>` : ''}<p>${segmentThaiHtml(h.content.text)}</p>${h.content.photoUrl ? historyValueHtml(h.content.photoUrl, 'photo') : ''}${h.content.voiceUrl || h.content.audioUrl ? historyValueHtml(h.content.voiceUrl || h.content.audioUrl, 'voice') : ''}</div>` : ''}
        ${(h.kind === 'create' ? [] : h.changes || []).filter(c => c.field !== 'handoffStage').map(c => `<div class="audit-change"><h4>${segmentThaiHtml(activityFieldLabels[c.field] || c.field)}</h4>${c.before != null && c.before !== '' && (!Array.isArray(c.before) || c.before.length) ? `<div class="audit-before"><b>ก่อนเปลี่ยน</b><div>${historyValueHtml(c.before, c.field)}</div></div>` : ''}<div class="audit-after">${c.before != null && c.before !== '' ? '<b>หลังเปลี่ยน</b>' : ''}<div>${historyValueHtml(c.after, c.field)}</div></div></div>`).join('')}
      </article>`;
    });
  const unassignedHistoryHtml = historyEntries.map((h, i) => h.version === 2 && activityStages.some(([stage]) => stage === h.stageAfter) ? '' : activityRowsHtml[i]).join('');

  const viewerRowsHtml =
    viewedBy.length > 0
      ? `<table class="data-table" style="margin-top:10px;">
          <colgroup>
            <col style="width:8%;" />
            <col style="width:36%;" />
            <col style="width:18%;" />
            <col style="width:24%;" />
            <col style="width:14%;" />
          </colgroup>
          <thead>
            <tr>
              <th style="text-align:center;">#</th>
              <th>${segmentThaiHtml('ผู้เปิดอ่าน (นามแฝง)')}</th>
              <th>${segmentThaiHtml('ระดับสิทธิ์')}</th>
              <th>${segmentThaiHtml('เปิดอ่านล่าสุดเมื่อ')}</th>
              <th style="text-align:center;">${segmentThaiHtml('จำนวนครั้ง')}</th>
            </tr>
          </thead>
          <tbody>
            ${viewedBy
              .map(
                (v, idx) => `
              <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td><div class="cell-title">${segmentThaiHtml(`${v.alias} (${v.name})`)}</div></td>
                <td><div class="cell-text">${escapeHtml(v.role.toUpperCase())}</div></td>
                <td><div class="cell-sub">${escapeHtml(new Date(v.lastViewedAt).toLocaleString('th-TH'))}</div></td>
                <td style="text-align:center;font-weight:700;">${segmentThaiHtml(`${v.viewCount || 1} ครั้ง`)}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>`
      : `<div class="empty-note" style="margin-top:8px;">${segmentThaiHtml('ยังไม่มีประวัติผู้เปิดอ่านเพิ่มเติม')}</div>`;

  const ratingSummaryText = isSupplier
    ? `คะแนนประเมิน ${sup?.rating || 5}/5 ดาว (${sup?.isFactory ? 'โรงงานผลิต' : 'หน้าร้าน/โชว์รูม'})`
    : `รสชาติ ${st?.ratings.taste}/5 · ดีไซน์ ${st?.ratings.aesthetics}/5 · คุ้มค่า ${st?.ratings.value}/5 · ความไว ${st?.ratings.speed}/5`;

  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <base href="${escapeHtml(normalizedBase)}" />
  <meta name="viewport" content="width=840, initial-scale=0.45, minimum-scale=0.3, maximum-scale=2.0, user-scalable=yes" />
  <title>ฉันจะเป็นหัวแถว - ${escapeHtml(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <style>
    html, body, * {
      box-sizing: border-box;
      letter-spacing: 0px !important;
      font-kerning: none !important;
      font-variant-ligatures: none !important;
      -webkit-text-size-adjust: 100% !important;
      -moz-text-size-adjust: 100% !important;
      text-size-adjust: 100% !important;
    }
    body {
      font-family: "Sarabun", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #e2e8f0;
      color: #0f172a;
      margin: 0;
      padding: 0;
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
    }
    .w-seg {
      display: inline-block;
      white-space: nowrap;
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
      box-shadow: 0 4px 12px rgba(0,0,0,0.18);
      min-width: 780px;
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
      font-family: inherit;
    }
    .btn-pdf { background: #059669; color: #ffffff; }
    .btn-print { background: #2563eb; color: #ffffff; }
    .btn-close { background: #334155; color: #ffffff; }

    /* Fixed A4 width sheet so mobile screens never crush table columns during html2canvas capture */
    .html2pdf__overlay {
      position: absolute !important;
      overflow: visible !important;
      left: 0 !important;
      top: 0 !important;
      right: auto !important;
      bottom: auto !important;
      width: 732px !important;
    }
    .html2pdf__container {
      position: relative !important;
      margin: 0 !important;
      left: 0 !important;
      right: auto !important;
      top: 0 !important;
      width: 732px !important;
    }
    .sheet-outer {
      width: 100%;
      overflow-x: auto;
      padding: 12px 0 32px 0;
    }
    .page-sheet {
      width: 732px;
      min-width: 732px;
      max-width: 732px;
      margin: 0;
      background: #ffffff;
      padding: 18px 26px;
      border-radius: 0;
    }

    /* Header with QR Code */
    .report-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 10px;
      gap: 14px;
    }
    .header-left {
      flex: 1;
      min-width: 0;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      margin-bottom: 6px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 4px 0;
      line-height: 1.35;
      word-break: break-word;
    }
    .brand-sub {
      font-size: 12px;
      color: #475569;
      margin: 0 0 8px 0;
    }
    .summary-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    .summary-pill {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      font-size: 10.5px;
      font-weight: 700;
      color: #1e293b;
    }
    .header-right {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      flex-shrink: 0;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #475569;
      line-height: 1.5;
      max-width: 210px;
    }
    .meta-platform {
      font-weight: 800;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 2px;
    }
    .qr-card {
      border: 1.5px solid #0f172a;
      border-radius: 10px;
      padding: 6px;
      background: #ffffff;
      text-align: center;
      width: 106px;
      flex-shrink: 0;
    }
    .qr-card img {
      width: 88px;
      height: 88px;
      display: block;
      margin: 0 auto 4px auto;
    }
    .qr-label {
      font-size: 9.5px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
    }
    .qr-sub {
      font-size: 8.5px;
      color: #059669;
      font-weight: 700;
      margin-top: 1px;
    }

    /* Attached Files in Report */
    .file-attachment-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 10px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #f8fafc;
      margin-bottom: 6px;
    }
    .file-attachment-info {
      flex: 1;
      min-width: 0;
    }
    .file-attachment-name {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
      word-break: break-all;
    }
    .file-attachment-meta {
      font-size: 10px;
      color: #64748b;
      margin-top: 2px;
    }
    .file-attachment-link {
      font-size: 9.5px;
      color: #0284c7;
      word-break: break-all;
      margin-top: 3px;
    }
    .file-attachment-link a {
      color: #0284c7;
      text-decoration: underline;
    }
    .file-attachment-qr {
      width: 70px;
      flex-shrink: 0;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 4px;
      text-align: center;
    }
    .file-attachment-qr img {
      width: 58px;
      height: 58px;
      display: block;
      margin: 0 auto;
    }

    /* Sections */
    .section-box {
      margin-bottom: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px 12px;
      background: #ffffff;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 10px;
    }
    .info-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 7px;
      padding: 5px 8px;
    }
    .info-label {
      display: block;
      font-size: 10.5px;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .info-value {
      display: block;
      font-size: 12px;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.45;
      word-break: break-word;
    }
    .note-banner {
      margin-top: 10px;
      padding: 10px 12px;
      background: #fffbeb;
      border-radius: 8px;
      border: 1px solid #fde68a;
    }
    .note-banner-title {
      font-size: 11px;
      font-weight: 800;
      color: #92400e;
      margin-bottom: 4px;
    }
    .note-banner-body {
      font-size: 12px;
      color: #0f172a;
      font-weight: 500;
      line-height: 1.6;
      word-break: break-word;
    }
    .handoff-banner {
      margin-top: 8px;
      padding: 10px 12px;
      background: #ecfdf5;
      border-radius: 8px;
      border: 1px solid #a7f3d0;
    }
    .handoff-banner-title {
      font-size: 11px;
      font-weight: 800;
      color: #065f46;
      margin-bottom: 4px;
    }

    /* Multimedia Cards (Voice + Video Thumbnails) */
    .media-subhead {
      font-size: 11.5px;
      font-weight: 800;
      color: #334155;
      margin: 6px 0 6px 0;
    }
    .media-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
    }
    .voice-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 8px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
    }
    .voice-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #059669;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .voice-meta {
      min-width: 0;
      flex: 1;
    }
    .voice-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #064e3b;
    }
    .voice-sub {
      font-size: 10.5px;
      color: #047857;
    }
    .voice-wave {
      font-size: 10px;
      font-family: monospace;
      color: #059669;
      font-weight: 700;
      margin-top: 2px;
    }

    .video-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .video-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      background: #0f172a;
      page-break-inside: avoid;
    }
    .video-thumb-wrap {
      position: relative;
      width: 100%;
      height: 124px;
      background: #0f172a;
      overflow: hidden;
    }
    .video-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 0.85;
    }
    .video-overlay-top {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .video-chip {
      background: #7c3aed;
      color: #ffffff;
      font-size: 9.5px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
    }
    .video-chip-right {
      background: rgba(15, 23, 42, 0.8);
      color: #e2e8f0;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .video-play-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.82);
      border: 2px solid #ffffff;
      color: #ffffff;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 3px;
    }
    .video-overlay-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.84);
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      padding: 4px 8px;
      text-align: center;
    }
    .video-caption {
      background: #ffffff;
      padding: 7px 10px;
      border-top: 1px solid #cbd5e1;
    }
    .video-caption-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
    }
    .video-caption-sub {
      font-size: 10px;
      color: #475569;
      margin-top: 2px;
    }

    /* Complete activity history: normal document flow, with no fixed-height cells. */
    .activity-report { overflow: visible; }
    .activity-report .w-seg { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
    .audit-intro, .audit-legacy { font-size: 11px; line-height: 1.6; }
    .audit-legacy { color: #92400e; background: #fffbeb; padding: 8px; }
    .audit-current-summary { border-left: 3px solid #059669; padding: 8px 12px; font-size: 11.5px; margin-bottom: 12px; }
    .audit-stages { margin-bottom: 12px; }
    .audit-stage { border-bottom: 1px solid #cbd5e1; padding: 6px 0; font-size: 10px; break-inside: avoid; break-after: avoid; }
    .audit-stage strong { display: block; font-size: 11px; }
    .audit-stage-missing { grid-column: 1 / -1; border: 0; padding: 2px 0; color: #64748b; }
    .audit-current { background: #ecfdf5; border-color: #10b981; }
    .audit-event { border-bottom: 1px solid #e2e8f0; padding: 8px 0; margin: 0; font-size: 11.5px; overflow-wrap: anywhere; break-inside: auto; }
    .audit-event-heading { display: flex; align-items: center; gap: 7px; font-size: 11px; break-after: avoid; }
    .audit-event-heading > span:last-child { color: #64748b; margin-left: auto; font-size: 10px; }
    .audit-avatar { width: 27px; height: 27px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .audit-avatar-fallback { background: #e2e8f0; color: #475569; text-align: center; line-height: 27px; }
    .audit-action { font-weight: 700; margin-top: 6px; }
    .audit-transition { color: #047857; font-weight: 700; margin: 6px 0; }
    .audit-change { margin: 6px 0; break-inside: auto; }
    .audit-change h4 { margin: 0 0 2px; color: #334155; font-size: 11px; break-after: avoid; }
    .audit-before, .audit-after { padding: 2px 8px; border-left: 2px solid #cbd5e1; }
    .audit-after { border-color: #10b981; }
    .audit-before > b, .audit-after > b { display: block; font-size: 10px; color: #64748b; break-after: avoid; }
    .audit-after > b { color: #047857; }
    .audit-empty { color: #64748b; font-size: 10px; }
    .audit-value-item { margin: 4px 0; }
    .audit-media { margin: 5px 0; break-inside: avoid; }
    .audit-media img { display: block; width: 160px; max-height: 160px; object-fit: contain; margin: 4px 0; }
    .audit-media a { color: #047857; text-decoration: underline; }
    .audit-content p { margin: 6px 0; orphans: 3; widows: 3; }
    .audit-viewers { font-size: 13px; margin: 16px 0 5px; break-after: avoid; }

    /* Tables */
    .data-table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      font-size: 11.5px;
    }
    .data-table th, .data-table td {
      border: 1px solid #cbd5e1;
      padding: 7px 8px;
      text-align: left;
      vertical-align: top;
      word-break: break-word;
      overflow-wrap: anywhere;
      overflow: hidden;
    }
    .data-table th {
      background: #f8fafc;
      font-weight: 800;
      color: #1e293b;
      font-size: 11px;
    }
    .table-thumb {
      width: 62px;
      height: 62px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      display: block;
    }
    .table-thumb-empty {
      width: 62px;
      height: 62px;
      border-radius: 6px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #94a3b8;
    }
    .cell-title {
      font-weight: 800;
      color: #0f172a;
      font-size: 12px;
      line-height: 1.4;
      margin-bottom: 2px;
    }
    .cell-text {
      color: #1e293b;
      font-size: 11.5px;
      line-height: 1.45;
    }
    .cell-sub {
      font-size: 10.5px;
      color: #475569;
      line-height: 1.4;
      margin-top: 2px;
    }
    .cell-price-green {
      font-weight: 800;
      color: #047857;
      font-size: 12.5px;
    }
    .cell-price-amber {
      font-weight: 800;
      color: #b45309;
      font-size: 12.5px;
    }
    .cell-voice-badge {
      display: inline-block;
      margin-top: 4px;
      padding: 2px 6px;
      border-radius: 4px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #047857;
      font-size: 9.5px;
      font-weight: 700;
    }

    /* Photos Grid */
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .photo-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      background: #f8fafc;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .photo-card img {
      width: 100%;
      height: 185px;
      object-fit: contain;
      background: #f8fafc;
      display: block;
    }
    .photo-caption {
      padding: 6px 8px;
      font-size: 10.5px;
      font-weight: 700;
      color: #334155;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      line-height: 1.35;
    }

    /* Comments */
    .comment-box {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 8px 10px;
      margin-bottom: 8px;
      background: #f8fafc;
      font-size: 11.5px;
      page-break-inside: avoid;
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .comment-author {
      font-weight: 800;
      font-size: 11px;
      color: #0f172a;
    }
    .comment-time {
      font-size: 10px;
      color: #64748b;
    }
    .comment-body {
      color: #1e293b;
      font-weight: 500;
      line-height: 1.5;
    }
    .reply-list {
      margin-top: 6px;
      padding-left: 12px;
      border-left: 3px solid #3b82f6;
    }
    .reply-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 8px;
      margin-top: 5px;
    }
    .empty-note {
      font-size: 11.5px;
      color: #64748b;
      text-align: center;
      padding: 10px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px dashed #cbd5e1;
    }
    .direct-link-bar {
      margin-top: 6px;
      padding: 6px 10px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 10px;
      color: #334155;
    }

    @media print {
      body { background: #ffffff; }
      .toolbar { display: none !important; }
      .sheet-outer { padding: 0; overflow: visible; }
      .page-sheet {
        width: 100%;
        min-width: 0;
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
      <strong style="font-size:14px;">รายงานสรุปฉบับสมบูรณ์: ${escapeHtml(title)}</strong>
      <span id="status-indicator" style="font-size:12px;color:#94a3b8;margin-left:10px;">
        ${mode === 'pdf' ? 'กำลังจัดหน้าและสร้างไฟล์ PDF...' : 'พร้อมพิมพ์รายงาน'}
      </span>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="toolbar-btn btn-pdf" onclick="triggerDownloadPdf()">ดาวน์โหลด PDF</button>
      <button class="toolbar-btn btn-print" onclick="window.print()">สั่งพิมพ์ (Print)</button>
      <button class="toolbar-btn btn-close" onclick="window.close()">ปิดหน้านี้</button>
    </div>
  </div>

  <div class="sheet-outer">
    <div id="report-content" class="page-sheet">
      <!-- Report Header with QR Code -->
      <div class="report-header">
        <div class="header-left">
          <div class="badge">${segmentThaiHtml(`${isSupplier ? 'รายงานซัพพลายเออร์ & โรงงาน' : 'รายงานเรฟร้านน้ำ & R&D'} · ${countryLabel}`)}</div>
          <h1 class="brand-title">${segmentThaiHtml(title)}</h1>
          <div class="brand-sub">${segmentThaiHtml(`${chineseName ? `${chineseName} · ` : ''}หมวดหมู่: ${category}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${segmentThaiHtml(`รูปภาพ ${allPhotos.length} รูป`)}</span>
            <span class="summary-pill">${segmentThaiHtml(`วอยซ์เสียง ${allVoiceClips.length} คลิป`)}</span>
            <span class="summary-pill">${segmentThaiHtml(`วิดีโอ ${rawVideos.length} คลิป`)}</span>
            <span class="summary-pill">${segmentThaiHtml(isSupplier ? `สินค้า ${(sup?.catalogItems || []).length} รายการ` : `เมนูชิม ${(st?.drinkItems || []).length} เมนู`)}</span>
            <span class="summary-pill">${segmentThaiHtml(`คอมเมนต์ ${notes.length} หัวข้อ`)}</span>
            <span class="summary-pill">${segmentThaiHtml(`ประวัติ Log ${historyEntries.length} รายการ`)}</span>
          </div>

          <div class="direct-link-bar">
            <div class="info-label" style="color:#0f172a;margin-bottom:2px;">Direct Link (Scan QR / LINE Share):</div>
            <div style="color:#059669;font-family:monospace;font-size:10px;word-break:break-all;">${escapeHtml(directLink)}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="meta-box">
            <div class="meta-platform">${segmentThaiHtml('ฉันจะเป็นหัวแถว')}</div>
            <div>LEAD THE FRONT · R&amp;D</div>
            <div style="margin-top:4px;">${segmentThaiHtml(`รหัส: ${item.id.slice(0, 18)}`)}</div>
            <div>${segmentThaiHtml(`สถานะ: ${handoffStageLabel}`)}</div>
            <div>${segmentThaiHtml(`ออกรายงาน: ${new Date().toLocaleString('th-TH')}`)}</div>
          </div>

          ${
            qrDataUri
              ? `<div class="qr-card">
                  <img id="report-qr-img" src="${qrDataUri}" alt="QR Code" />
                  <div class="qr-label">${segmentThaiHtml('สแกนเปิดในแอป')}</div>
                  <div class="qr-sub">${segmentThaiHtml('ฟังเสียง · ดูคลิปจริง')}</div>
                </div>`
              : ''
          }
        </div>
      </div>

      <!-- Group 1: Overview, Contacts, Location & Handoff -->
      <div class="section-box">
        <div class="section-title">${segmentThaiHtml('กลุ่มที่ 1: ข้อมูลหลัก พิกัดสถานที่ ช่องทางติดต่อ และการรับช่วงต่อ')}</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('ชื่อรายการ / ร้านค้า')}</span>
            <span class="info-value">${segmentThaiHtml(`${title}${chineseName ? ` (${chineseName})` : ''}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('หมวดหมู่ & คะแนนประเมิน')}</span>
            <span class="info-value">${segmentThaiHtml(`${category} · ${ratingSummaryText}`)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('สถานที่ / ตลาด / เมือง')}</span>
            <span class="info-value">${segmentThaiHtml(city || item.location?.addressText || '-')}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('พิกัด GPS & แผนที่')}</span>
            <span class="info-value">${
              item.location
                ? `${item.location.lat.toFixed(5)}, ${item.location.lng.toFixed(5)} (${escapeHtml(item.location.addressText || 'พิกัดหน้างาน')})`
                : '-'
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('ช่องทางติดต่อ (WeChat / LINE / โทรศัพท์)')}</span>
            <span class="info-value">${segmentThaiHtml(
              `WeChat: ${(isSupplier ? sup?.wechatId : st?.wechatId) || '-'} | LINE: ${(isSupplier ? sup?.lineId : st?.lineId) || '-'} | โทร: ${(isSupplier ? sup?.phone : st?.phone) || '-'}`
            )}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('ผู้ลงพื้นที่สำรวจ & เวลาที่บันทึก')}</span>
            <span class="info-value">${segmentThaiHtml(
              `${item.creator.alias}${item.creator.name && item.creator.name !== item.creator.alias ? ` (${item.creator.name})` : ''} · ${new Date(item.creator.timestamp).toLocaleString('th-TH')}`
            )}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('ผู้รับผิดชอบรับช่วงต่อ & กำหนดติดตาม')}</span>
            <span class="info-value">${segmentThaiHtml(
              `${item.assignedTo ? userName(item.assignedTo) : 'ยังไม่ระบุผู้รับผิดชอบ'} · กำหนดติดตาม: ${item.targetFollowUpDate || '-'}`
            )}</span>
          </div>
          <div class="info-item">
            <span class="info-label">${segmentThaiHtml('การมีส่วนร่วมของทีม (Likes & Views)')}</span>
            <span class="info-value">${segmentThaiHtml(`กดถูกใจ ${likes.length} คน · เปิดอ่านแล้ว ${viewedBy.length} คน`)}</span>
          </div>
        </div>

        ${
          (isSupplier ? sup?.memo : st?.tastingNotes)
            ? `<div class="note-banner">
                <div class="note-banner-title">${segmentThaiHtml(isSupplier ? 'บันทึกภาพรวมหน้างาน / รายละเอียดสเปกหลัก:' : 'บันทึกรีวิวรสชาติ & ไอเดียเรฟหน้างาน:')}</div>
                <div class="note-banner-body">${segmentThaiHtml(isSupplier ? sup?.memo : st?.tastingNotes)}</div>
              </div>`
            : ''
        }

        ${
          item.handoffNotes
            ? `<div class="handoff-banner">
                <div class="handoff-banner-title">${segmentThaiHtml('โน้ตการส่งมอบงาน / ผลเจรจาทีมไทย:')}</div>
                <div class="note-banner-body">${segmentThaiHtml(item.handoffNotes)}</div>
              </div>`
            : ''
        }
      </div>

      <!-- Group 2: Voice Recordings & Video Clips with Thumbnail Previews -->
      <div class="section-box">
        <div class="section-title">${segmentThaiHtml(`กลุ่มที่ 2: สื่อมัลติมีเดียหน้างาน — วอยซ์เสียงบันทึก (${allVoiceClips.length} คลิป) & วิดีโอ (${rawVideos.length} คลิป)`)}</div>
        <div class="media-subhead">${segmentThaiHtml(`ไฟล์เสียงบันทึกหน้างานจริง (${allVoiceClips.length} คลิป):`)}</div>
        ${voiceCardsHtml}
        <div class="media-subhead" style="margin-top:10px;">${segmentThaiHtml(`คลิปวิดีโอหน้างานพร้อมภาพ Thumbnail พรีวิว (${rawVideos.length} คลิป):`)}</div>
        ${videoCardsHtml}
      </div>

      <!-- Group 3: Catalog / Drink Items -->
      ${itemsSectionHtml}

      <!-- Attached Documents & Files -->
      ${attachedFilesHtml}

      <!-- Group 4: All Photos of This Item -->
      <div class="section-box">
        <div class="section-title">${segmentThaiHtml(`กลุ่มที่ 4: แกลเลอรีภาพถ่ายทั้งหมดของรายการนี้ (${allPhotos.length} รูป)`)}</div>
        ${photosGridHtml}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box activity-report" id="activity-history">
        <div class="section-title">${segmentThaiHtml(`กลุ่มที่ 5: ประวัติการดำเนินงานและความคิดเห็น (${historyEntries.length} เหตุการณ์)`)}</div>
        <p class="audit-intro">${segmentThaiHtml('จัดตามพาร์ทที่เกี่ยวข้อง แต่ละพาร์ทเรียงเหตุการณ์จากเก่าไปใหม่')}</p>
        <div class="audit-current-summary"><strong>${segmentThaiHtml(`ปัจจุบัน: ${handoffStageLabel}`)}</strong><div>${segmentThaiHtml(`ผู้รับช่วงต่อ: ${item.assignedTo ? userName(item.assignedTo) : 'ยังไม่ระบุ'} · กำหนดติดตาม: ${item.targetFollowUpDate || 'ยังไม่ระบุ'}`)}</div></div>
        ${stageJourneyHtml()}
        ${historyEntries.some(h => h.version !== 2) ? `<p class="audit-legacy">${segmentThaiHtml('ประวัติเก่าแสดงตามที่บันทึกไว้ ไม่เติมขั้นตอนย้อนหลัง')}</p>` : ''}
        ${unassignedHistoryHtml ? `<h3 class="audit-viewers">ประวัติที่ไม่ได้ระบุพาร์ท</h3>${unassignedHistoryHtml}` : ''}
        ${viewedBy.length ? `<h3 class="audit-viewers">${segmentThaiHtml('ผู้เปิดอ่านรายการ')}</h3>${viewerRowsHtml}` : ''}
      </div>
    </div>
  </div>

  <script>
    // Extract real video frame thumbnail into <img data-video-src> when possible
    function prepareVideoThumbnails() {
      var imgs = Array.prototype.slice.call(document.querySelectorAll('img[data-video-src]'));
      return Promise.all(imgs.map(function(img) {
        return new Promise(function(resolve) {
          var src = img.getAttribute('data-video-src');
          if (!src) return resolve();
          var done = false;
          var finish = function() {
            if (!done) {
              done = true;
              resolve();
            }
          };
          var timer = setTimeout(finish, 1800);
          try {
            var video = document.createElement('video');
            video.crossOrigin = 'anonymous';
            video.muted = true;
            video.playsInline = true;
            video.preload = 'auto';
            video.addEventListener('loadeddata', function() {
              try {
                video.currentTime = Math.min(0.5, (video.duration || 1) * 0.25);
              } catch (e) {
                clearTimeout(timer);
                finish();
              }
            });
            video.addEventListener('seeked', function() {
              try {
                var canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 480;
                canvas.height = video.videoHeight || 270;
                var ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  img.src = canvas.toDataURL('image/jpeg', 0.85);
                }
              } catch (e) {}
              clearTimeout(timer);
              finish();
            });
            video.addEventListener('error', function() {
              clearTimeout(timer);
              finish();
            });
            video.src = src;
          } catch (e) {
            clearTimeout(timer);
            finish();
          }
        });
      }));
    }

    // Rasterize all SVG QR images onto PNG Data URLs so html2canvas renders them crisply on all browsers
    function rasterizeQrImage() {
      var qrImgs = Array.prototype.slice.call(document.querySelectorAll('#report-qr-img, .file-attachment-qr img'));
      if (!qrImgs.length) return Promise.resolve();
      return Promise.all(qrImgs.map(function(img) {
        return new Promise(function(resolve) {
          if (!img || !img.src) return resolve();
          var finish = function() { resolve(); };
          var temp = new Image();
          temp.onload = function() {
            try {
              var canvas = document.createElement('canvas');
              canvas.width = 240;
              canvas.height = 240;
              var ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, 240, 240);
                ctx.drawImage(temp, 0, 0, 240, 240);
                img.src = canvas.toDataURL('image/png');
              }
            } catch (e) {}
            finish();
          };
          temp.onerror = finish;
          temp.src = img.src;
        });
      }));
    }

    function triggerDownloadPdf() {
      var statusEl = document.getElementById('status-indicator');
      if (statusEl) statusEl.textContent = 'กำลังสร้างไฟล์ PDF...';
      var element = document.getElementById('report-content');
      // Avoid blank/truncated canvas exports for very long histories. Native print
      // paginates the full document without imposing one enormous image canvas.
      if (element && element.scrollHeight > 14000) {
        if (statusEl) statusEl.textContent = 'รายงานมีหลายหน้า กรุณาเลือกบันทึกเป็น PDF ในหน้าพิมพ์เพื่อเก็บข้อมูลครบ';
        window.print();
        return;
      }
      if (window.html2pdf && element) {
        window.scrollTo(0, 0);
        var opt = {
          margin: [8, 8, 8, 8],
          filename: ${JSON.stringify(safeFilename)},
          image: { type: 'jpeg', quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 732,
            width: 732
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: {
            mode: ['css', 'legacy'],
            avoid: ['tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-box', '.note-banner', '.handoff-banner', '.report-header', '.file-attachment-card', '.audit-stage', '.audit-event-heading', '.audit-media']
          }
        };
        var worker = window.html2pdf().set(opt).from(element);
        worker.toContainer().then(function() {
          if (this.prop && this.prop.overlay) {
            this.prop.overlay.style.position = 'absolute';
            this.prop.overlay.style.overflow = 'visible';
            this.prop.overlay.style.left = '0px';
            this.prop.overlay.style.top = '0px';
            this.prop.overlay.style.right = 'auto';
            this.prop.overlay.style.bottom = 'auto';
            this.prop.overlay.style.width = '732px';
          }
          if (this.prop && this.prop.container) {
            this.prop.container.style.position = 'relative';
            this.prop.container.style.margin = '0px';
            this.prop.container.style.left = '0px';
            this.prop.container.style.right = 'auto';
            this.prop.container.style.top = '0px';
            this.prop.container.style.width = '732px';
          }
        }).toCanvas().toPdf().save().then(function() {
          if (statusEl) statusEl.textContent = 'ดาวน์โหลดไฟล์ PDF สำเร็จแล้ว';
        }).catch(function() {
          window.print();
        });
      } else {
        window.print();
      }
    }

    window.addEventListener('load', function() {
      var mode = ${JSON.stringify(mode)};
      var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      Promise.all([fontsReady, rasterizeQrImage(), prepareVideoThumbnails()]).then(function() {
        setTimeout(function() {
          if (mode === 'pdf') {
            triggerDownloadPdf();
          } else {
            window.print();
          }
        }, 350);
      });
    });
  </script>
</body>
</html>`;
}

export function openExecutiveReport(
  item: SupplierRecord | StoreInspoRecord | LocationRecord,
  convertCnyToThb: (cny: number) => number,
  mode: 'print' | 'pdf',
  users: User[] = []
): void {
  const html = buildExecutiveReportHtml(item, convertCnyToThb, mode, users);
  // Navigate to a complete document. document.write with a cross-site script can
  // leave a blank popup while the PDF library is blocked or slow to load.
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const reportWindow = window.open(url, '_blank');
  if (!reportWindow) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
