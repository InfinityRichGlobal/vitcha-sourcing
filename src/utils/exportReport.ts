import { imageDisplayUrl, normalizeMediaUrl, originalImageUrl } from './mediaUrl';
import { commentMedia } from './commentMedia';
import QRCode from 'qrcode';
import { SupplierRecord, StoreInspoRecord, LocationRecord, AttachedFile, User, ReviewerNote, ReviewReply } from '../types';
import { getActivityActor, getActivityEntries } from './activityHistory';
import { resolveActorProfile } from './actorProfile';
import { reportFooterCss, reportFooterLabel, reportPdfFooterScript } from './reportFooter';
import { getItemVoiceNotes } from './audioHelper';
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
  const footerLabel = reportFooterLabel(isSupplier ? 'ซัพพลายเออร์' : isLocation ? 'ทำเล' : 'ร้านน้ำ', title);
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
  const allVoiceClips: { label: string; durationSec: number; source: string; url: string }[] = [];
  mainVoiceClips.forEach((vc, idx) => {
    allVoiceClips.push({
      label: vc.label || `คลิปเสียงหน้างาน #${idx + 1}`,
      durationSec: vc.durationSec || 0,
      url: vc.url,
      source: 'บันทึกเสียงหลักหน้างานจริง',
    });
  });
  if (sup) {
    (sup.catalogItems || []).forEach((c, cIdx) => {
      getItemVoiceNotes(c).forEach((vc, vIdx) => {
        allVoiceClips.push({
          label: vc.label || `คลิปเสียงสินค้า #${vIdx + 1}`,
          durationSec: vc.durationSec || 0,
      url: vc.url,
          source: `สินค้า: ${c.name || `รายการที่ #${cIdx + 1}`}`,
        });
      });
    });
  } else if (st) {
    (st.drinkItems || []).forEach((d, dIdx) => {
      getItemVoiceNotes(d).forEach((vc, vIdx) => {
        allVoiceClips.push({
          label: vc.label || `คลิปเสียงเมนู #${vIdx + 1}`,
          durationSec: vc.durationSec || 0,
      url: vc.url,
          source: `เมนู: ${d.name || `แก้วที่ #${dIdx + 1}`}`,
        });
      });
    });
  }

  // Collect all videos
  const rawVideos = Array.isArray(item.videos) ? item.videos.filter(Boolean) : [];

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

  const mediaLink = (url: string) => {
    const normalized = normalizeMediaUrl(url);
    try {
      const resolved = new URL(normalized, normalizedBase);
      return ['http:', 'https:'].includes(resolved.protocol) ? resolved.href : '';
    } catch { return ''; }
  };
  const mediaAccess = (url: string, label: string) => {
    const href = mediaLink(url);
    return href ? `<div class="media-access"><a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${segmentThaiHtml(label)}</a><img class="media-qr" width="56" height="56" src="${generateQrSvgDataUri(href)}" alt="QR เปิดไฟล์" /></div>` : '';
  };

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
                  <div class="voice-sub">${segmentThaiHtml(`${vc.source} · ${vc.durationSec ? `ความยาว ${vc.durationSec} วินาที` : 'ไม่ระบุความยาวเสียง'}`)}</div>
                  ${mediaAccess(vc.url, 'เปิดฟังเสียงบันทึก')}
                </div>
              </div>`
            )
            .join('')}
        </div>`
      : `<div class="empty-note">${segmentThaiHtml('ไม่มีไฟล์เสียงบันทึกในรายการนี้')}</div>`;

  const videoCard = (url: string, title: string) => `<figure class="video-card">
    <div class="video-thumb-wrap"><img class="video-thumb-img" alt="${escapeHtml(title)}" crossorigin="anonymous" data-video-src="${escapeHtml(mediaLink(url))}" hidden /><p class="video-thumb-status">กำลังเตรียมภาพจากคลิปนี้…</p></div>
    <figcaption class="video-caption"><div class="video-caption-title">${segmentThaiHtml(title)}</div>${mediaAccess(url, 'เปิดคลิปพร้อมเสียง')}</figcaption>
  </figure>`;
  const videoCardsHtml = rawVideos.length
    ? `<div class="video-grid media-masonry">${rawVideos.map((url, i) => videoCard(url, `คลิปวิดีโอหน้างาน #${i + 1}`)).join('')}</div>`
    : `<div class="empty-note">${segmentThaiHtml('ไม่มีคลิปวิดีโอในรายการนี้')}</div>`;

  const reportDate = (value?: string) => value && !Number.isNaN(Date.parse(value)) ? new Date(value).toLocaleString('th-TH') : value || 'ไม่ระบุเวลา';
  const profileHtml = (person: { name: string; avatar: string }) => {
    const fallback = new URL('logo.jpg', normalizedBase).href;
    let src = fallback;
    try { src = new URL(imageDisplayUrl(person.avatar || fallback, 96), normalizedBase).href; } catch { /* Keep the default avatar. */ }
    return `<img class="person-avatar" width="27" height="27" src="${escapeHtml(src)}" crossorigin="anonymous" alt="${escapeHtml(`โปรไฟล์ ${person.name}`)}" onerror="${escapeHtml(`this.onerror=null;this.src=${JSON.stringify(fallback)}`)}" />`;
  };
  const commentHtml = (note: ReviewerNote | ReviewReply, number: string, reply = false) => {
    const author = resolveActorProfile(users, note.authorId, note.author, note.authorAvatar);
    const context = `${reply ? 'ตอบกลับ' : 'ความคิดเห็น'} #${number}`;
    const media = commentMedia(note);
    const voice = note.voiceUrl || note.audioUrl;
    return `<article class="comment-box${reply ? ' reply-item' : ''}" data-comment-id="${escapeHtml(note.id)}">
      <div class="comment-header">${profileHtml(author)}<strong class="comment-author">${segmentThaiHtml(`${context} · ${author.name}`)}</strong><time class="comment-time">${segmentThaiHtml(reportDate(note.timestamp))}</time></div>
      ${'replyToAuthor' in note && note.replyToAuthor ? `<p class="comment-target">${segmentThaiHtml(`ตอบกลับ ${note.replyToAuthor}`)}</p>` : ''}
      ${note.text ? `<div class="comment-body">${segmentThaiHtml(note.text)}</div>` : ''}
      ${media.length ? `<div class="comment-media media-masonry">${media.map((m, i) => {
        const label = `${m.type === 'video' ? 'วิดีโอ' : 'ภาพ'}แนบ ${i + 1} · ${context}${m.name ? ` · ${m.name}` : ''}`;
        return m.type === 'video' ? videoCard(m.url, label) : `<figure class="photo-card"><img src="${escapeHtml(imageDisplayUrl(m.url, 2000))}" crossorigin="anonymous" alt="${escapeHtml(label)}" /><figcaption class="photo-caption">${segmentThaiHtml(label)}${mediaAccess(originalImageUrl(m.url), 'เปิดภาพต้นฉบับ')}</figcaption></figure>`;
      }).join('')}</div>` : ''}
      ${voice ? `<div class="comment-audio"><strong>${segmentThaiHtml(`เสียงแนบ · ${context}${note.duration ? ` · ${note.duration} วินาที` : ''}`)}</strong>${mediaAccess(voice, 'เปิดฟังเสียง')}</div>` : ''}
    </article>`;
  };
  const commentsHtml = notes.map((note, index) => `<section class="comment-thread">${commentHtml(note, String(index + 1))}${(note.replies || []).map((reply, i) => commentHtml(reply, `${index + 1}.${i + 1}`, true)).join('')}</section>`).join('');

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
                ? `<img src="${escapeHtml(imageDisplayUrl(c.photo, 2000))}" crossorigin="anonymous" class="table-thumb" />`
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
                ? `<img src="${escapeHtml(imageDisplayUrl(d.photo, 2000))}" crossorigin="anonymous" class="table-thumb" />`
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

  if (loc) {
    const labels: Record<string, string> = { usableAreaSqm: 'พื้นที่ใช้สอย (ตร.ม.)', frontageWidthM: 'หน้ากว้าง (เมตร)', ceilingHeightM: 'เพดานสูง (เมตร)', layoutFormat: 'รูปแบบพื้นที่', electricalPower: 'ระบบไฟฟ้า', hasWaterInflow: 'ท่อน้ำดี', hasDrainage: 'ท่อน้ำทิ้ง', hasGreaseTrap: 'ถังดักไขมัน', riderAccessNotes: 'การเข้าถึงของไรเดอร์', rentModel: 'รูปแบบค่าเช่า', monthlyRentThb: 'ค่าเช่า (บาท/เดือน)', monthlyRentRmb: 'ค่าเช่า (หยวน/เดือน)', gpPercent: 'ส่วนแบ่ง GP (%)', serviceFeePerSqm: 'ค่าส่วนกลาง/ตร.ม.', depositMonths: 'เงินประกัน (เดือน)', leasePeriodYears: 'ระยะสัญญา (ปี)', fitOutPeriodDays: 'ระยะตกแต่งปลอดค่าเช่า (วัน)', contactPerson: 'ผู้ติดต่อ', contactPhone: 'โทรศัพท์', contactLineWechat: 'LINE / WeChat' };
    const choices: Record<string, string> = { inline: 'ห้องแถว', corner: 'ห้องมุม', island: 'พื้นที่เกาะกลาง', kiosk: 'คีออสก์', fixed: 'ค่าเช่าคงที่', gp: 'ส่วนแบ่งยอดขาย', hybrid: 'ค่าเช่าคงที่และส่วนแบ่ง' };
    const fields = { ...loc.spaceSpecs, ...loc.leaseTerms, ...(loc.unitNumber ? { unitNumber: loc.unitNumber } : {}) };
    itemsSectionHtml = `<div class="section-box location-details"><div class="section-title">กลุ่มที่ 3: ข้อมูลพื้นที่และเงื่อนไขเช่า</div><div class="info-grid">${Object.entries(fields).filter(([, value]) => value !== undefined && value !== null && value !== '').map(([key, value]) => `<div class="info-item"><span class="info-label">${segmentThaiHtml(key === 'unitNumber' ? 'เลขที่ห้อง' : labels[key] || key)}</span><span class="info-value">${segmentThaiHtml(typeof value === 'boolean' ? value ? 'มี' : 'ไม่มี' : choices[String(value)] || String(value))}</span></div>`).join('')}</div></div>`;
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
      ? `<div class="photo-grid media-masonry">
          ${allPhotos
            .map(
              (p, i) => `
              <div class="photo-card">
                <img src="${escapeHtml(imageDisplayUrl(p.url, 2000))}" crossorigin="anonymous" alt="${escapeHtml(p.label)}" />
                <div class="photo-caption">${segmentThaiHtml(`รูปที่ ${i + 1}: ${p.label}`)}</div>
              </div>`
            )
            .join('')}
        </div>`
      : `<div class="empty-note">${segmentThaiHtml('ไม่มีรูปภาพในรายการนี้')}</div>`;

  // Export every concise event, independent of the timeline's filter/page limit.
  const activityRowsHtml = historyEntries.map((h, idx) => {
    const person = getActivityActor(item, users, h);
    return `<article class="audit-event" data-activity-id="${escapeHtml(h.id || idx)}">${profileHtml(person)}<div class="audit-event-content"><div class="audit-event-heading"><strong>${segmentThaiHtml(person.name)}</strong><span>${segmentThaiHtml(Number.isNaN(Date.parse(h.timestamp)) ? h.timestamp : new Date(h.timestamp).toLocaleString('th-TH'))}</span></div><div class="audit-action">${segmentThaiHtml(h.action)}</div></div></article>`;
  }).join('');

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
    ? `คะแนนประเมิน ${sup?.rating ?? '-'}/5 ดาว (${sup?.isFactory ? 'โรงงานผลิต' : 'หน้าร้าน/โชว์รูม'})`
    : isLocation ? `คนสัญจร ${loc?.ratings.footTraffic ?? '-'}/5 · การมองเห็น ${loc?.ratings.visibility ?? '-'}/5 · การเข้าถึง ${loc?.ratings.accessibility ?? '-'}/5 · ความคุ้มค่า ${loc?.ratings.valueRoi ?? '-'}/5`
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
      line-height: 1.35;
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
      min-width: 0;
      width: 100vw;
      box-sizing: border-box;
      left: 0;
      flex-wrap: wrap;
    }
    .toolbar-btn:disabled { opacity: 0.5; cursor: wait; }
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
      text-decoration: none;
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
      line-height: 1.35;
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
      break-after: avoid;
      page-break-after: avoid;
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
      line-height: 1.35;
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
      line-height: 1.35;
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

    .media-masonry { column-count: 2; column-gap: 12px; }
    .video-card, .photo-card { display: inline-block; vertical-align: top; width: 100%; margin: 0 0 12px; break-inside: avoid; page-break-inside: avoid; }
    .video-card { border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; background: #fff; }
    .video-thumb-wrap { position: relative; width: 100%; }
    .video-thumb-img { display: block; width: 100%; height: auto; }
    .video-thumb-img[hidden] { display: none; }
    .video-thumb-status { padding: 14px; color: #64748b; font-size: 11px; }
    .video-caption { padding: 8px 10px; border-top: 1px solid #cbd5e1; }
    .video-caption-title { font-size: 11.5px; font-weight: 800; color: #0f172a; }
    .media-access { position: relative; min-height: 56px; padding-right: 64px; margin-top: 6px; font-size: 10px; }
    .media-access a { color: #047857; text-decoration: underline; overflow-wrap: anywhere; }
    .media-access img.media-qr { position: absolute; display: block; right: 0; top: 0; width: 56px; height: 56px; }
    .pdf-media-grid { column-count: auto; display: block; }
    .pdf-media-row { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; break-inside: avoid; page-break-inside: avoid; }
    .pdf-media-row > figure, .pdf-media-row > .photo-card { margin: 0; min-width: 0; }
    .comment-media { margin-top: 10px; }
    .comment-audio { border-top: 1px solid #cbd5e1; padding-top: 8px; break-inside: avoid; }
    .comment-target { color: #64748b; font-size: 10px; }

    /* Complete activity history: normal document flow, with no fixed-height cells. */
    .activity-report { overflow: visible; }
    .activity-report .w-seg { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
    .audit-intro { margin: 3px 0; break-after: avoid; page-break-after: avoid; }
    .audit-intro, .audit-legacy { font-size: 11px; line-height: 1.35; }
    .audit-legacy { color: #92400e; background: #fffbeb; padding: 8px; }
    .audit-current-summary { border-left: 3px solid #059669; padding: 8px 12px; font-size: 11.5px; margin-bottom: 12px; }
    .audit-stages { margin-bottom: 12px; }
    .audit-stage { border-bottom: 1px solid #cbd5e1; padding: 6px 0; font-size: 10px; break-inside: avoid; break-after: avoid; }
    .audit-stage strong { display: block; font-size: 11px; }
    .audit-stage-missing { grid-column: 1 / -1; border: 0; padding: 2px 0; color: #64748b; }
    .audit-current { background: #ecfdf5; border-color: #10b981; }
    .audit-event { display: flex; align-items: flex-start; gap: 7px; border-bottom: 1px solid #e2e8f0; padding: 4px 0; margin: 0; font-size: 11.5px; overflow-wrap: anywhere; break-inside: avoid; }
    .audit-event-content { flex: 1; min-width: 0; }
    .audit-event-heading { display: flex; align-items: center; gap: 7px; font-size: 11px; break-after: avoid; }
    .audit-event-heading > span:last-child { color: #64748b; margin-left: auto; font-size: 10px; }
    img.person-avatar { display: block; width: 27px; height: 27px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .audit-avatar-fallback { background: #e2e8f0; color: #475569; text-align: center; line-height: 27px; }
    .audit-action { font-weight: 700; margin-top: 2px; }
    .audit-transition { color: #047857; font-weight: 700; margin: 6px 0; }
    .audit-change { margin: 6px 0; break-inside: avoid; }
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
      height: auto;
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
      line-height: 1.35;
      margin-bottom: 2px;
    }
    .cell-text {
      color: #1e293b;
      font-size: 11.5px;
      line-height: 1.35;
    }
    .cell-sub {
      font-size: 10.5px;
      color: #475569;
      line-height: 1.35;
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
    .photo-grid { column-count: 3; }
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
      height: auto;
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
      padding: 6px 8px;
      margin-bottom: 6px;
      background: #f8fafc;
      font-size: 11.5px;
      page-break-inside: auto;
      break-inside: auto;
    }
    .comment-header {
      break-after: avoid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .comment-author {
      flex: 1;
      min-width: 0;
      font-weight: 800;
      font-size: 11px;
      color: #0f172a;
    }
    .comment-time {
      font-size: 10px;
      color: #64748b;
    }
    .comment-body {
      overflow-wrap: anywhere;
      orphans: 3; widows: 3;
      color: #1e293b;
      font-weight: 500;
      line-height: 1.35;
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

    @page { size: A4; margin: 8mm; }
    ${reportFooterCss(footerLabel)}
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
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <a class="toolbar-btn btn-close" href="${escapeHtml(directLink)}">กลับหน้ารายละเอียด</a>
      <button class="toolbar-btn btn-pdf" data-report-export disabled onclick="triggerDownloadPdf()">ดาวน์โหลด PDF</button>
      <button class="toolbar-btn btn-print" data-report-export disabled onclick="window.print()">สั่งพิมพ์ (Print)</button>
      <button class="toolbar-btn btn-close" onclick="window.close()">ปิดหน้านี้</button>
    </div>
  </div>

  <div class="sheet-outer">
    <div id="report-content" class="page-sheet">
      <!-- Report Header with QR Code -->
      <div class="report-header">
        <div class="header-left">
          <div class="badge">${segmentThaiHtml(`${isSupplier ? 'รายงานซัพพลายเออร์ & โรงงาน' : isLocation ? 'รายงานสำรวจทำเล' : 'รายงานเรฟร้านน้ำ & R&D'} · ${countryLabel}`)}</div>
          <h1 class="brand-title">${segmentThaiHtml(title)}</h1>
          <div class="brand-sub">${segmentThaiHtml(`${chineseName ? `${chineseName} · ` : ''}หมวดหมู่: ${category}`)}</div>

          <!-- At-a-glance Multimedia & Detail Counter Pills -->
          <div class="summary-pills">
            <span class="summary-pill">${segmentThaiHtml(`รูปภาพ ${allPhotos.length} รูป`)}</span>
            <span class="summary-pill">${segmentThaiHtml(`วอยซ์เสียง ${allVoiceClips.length} คลิป`)}</span>
            <span class="summary-pill">${segmentThaiHtml(`วิดีโอ ${rawVideos.length} คลิป`)}</span>
            <span class="summary-pill">${segmentThaiHtml(isSupplier ? `สินค้า ${(sup?.catalogItems || []).length} รายการ` : isLocation ? `พื้นที่ ${loc?.spaceSpecs?.usableAreaSqm ?? '-'} ตร.ม.` : `เมนูชิม ${(st?.drinkItems || []).length} เมนู`)}</span>
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
              isLocation ? `ผู้ติดต่อ: ${loc?.leaseTerms?.contactPerson || '-'} · โทร: ${loc?.leaseTerms?.contactPhone || '-'} · LINE / WeChat: ${loc?.leaseTerms?.contactLineWechat || '-'}` : `WeChat: ${(isSupplier ? sup?.wechatId : st?.wechatId) || '-'} | LINE: ${(isSupplier ? sup?.lineId : st?.lineId) || '-'} | โทร: ${(isSupplier ? sup?.phone : st?.phone) || '-'}`
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

      <div class="section-box comments-report" id="record-comments">
        <div class="section-title">${segmentThaiHtml(`กลุ่มที่ 5: ความคิดเห็นและการตอบกลับ (${notes.length} ความคิดเห็น)`)}</div>
        ${commentsHtml || `<div class="empty-note">ยังไม่มีความคิดเห็น</div>`}
      </div>

      <!-- Group 6: Activity & Handoff Log + Viewer Log -->
      <div class="section-box activity-report" id="activity-history">
        <div class="section-title">${segmentThaiHtml(`กลุ่มที่ 6: ประวัติการดำเนินงาน (${historyEntries.length} เหตุการณ์)`)}</div>
        <p class="audit-intro">${segmentThaiHtml('วันเวลา · ผู้ดำเนินการ · กิจกรรม เรียงจากเก่าไปใหม่')}</p>
        ${activityRowsHtml}
        ${viewedBy.length ? `<h3 class="audit-viewers">${segmentThaiHtml('ผู้เปิดอ่านรายการ')}</h3>${viewerRowsHtml}` : ''}
      </div>
    </div>
  </div>

  <script>
    ${reportPdfFooterScript(footerLabel)}
    // Never substitute another photo for a clip. Decode the actual file, preserving
    // its dimensions; at most two transfers run together and repeated URLs share a frame.
    function prepareVideoThumbnails() {
      var imgs = Array.from(document.querySelectorAll('img[data-video-src]'));
      var completed = 0;
      var groups = new Map();
      imgs.forEach(function(img) {
        var src = img.getAttribute('data-video-src');
        if (!groups.has(src)) groups.set(src, []);
        groups.get(src).push(img);
      });
      var queue = Array.from(groups.entries());
      function frame(src, targets) {
        return new Promise(function(resolve) {
          var video = document.createElement('video');
          var done = false;
          var finish = function(data) {
            if (done) return;
            done = true; clearTimeout(timer);
            completed += targets.length;
            var progress = document.getElementById('status-indicator');
            if (progress) progress.textContent = 'เตรียมภาพจากคลิป ' + completed + ' / ' + imgs.length;
            targets.forEach(function(img) {
              var status = img.parentElement.querySelector('.video-thumb-status');
              if (data) { img.src = data; img.hidden = false; img.dataset.thumbnailStatus = 'ready'; status.hidden = true; }
              else { img.dataset.thumbnailStatus = 'unavailable'; status.textContent = 'ไม่สามารถสร้างภาพจากคลิปนี้ได้ · เปิดคลิปจากลิงก์ด้านล่าง'; }
            });
            video.pause(); video.removeAttribute('src'); video.load();
            Promise.all(targets.map(function(img) { return data ? img.decode().catch(function(){}) : Promise.resolve(); })).then(resolve);
          };
          var timer = setTimeout(function() { finish(); }, 30000);
          var capture = function() {
            if (done || !video.videoWidth || !video.videoHeight) return;
            try {
              var scale = Math.min(1, 1200 / Math.max(video.videoWidth, video.videoHeight));
              var canvas = document.createElement('canvas');
              canvas.width = Math.round(video.videoWidth * scale); canvas.height = Math.round(video.videoHeight * scale);
              canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
              finish(canvas.toDataURL('image/jpeg', 0.9));
            } catch(e) { finish(); }
          };
          video.crossOrigin = 'anonymous'; video.muted = true; video.playsInline = true; video.preload = 'auto';
          video.addEventListener('loadeddata', function() {
            var time = Number.isFinite(video.duration) ? Math.min(0.5, video.duration / 4) : 0;
            if (time > 0) { try { video.currentTime = time; } catch(e) { capture(); } }
            else capture();
          }, {once: true});
          video.addEventListener('seeked', capture, {once: true});
          video.addEventListener('error', function() { finish(); }, {once: true});
          if (src) video.src = src; else finish();
        });
      }
      async function worker() { while (queue.length) { var entry = queue.shift(); await frame(entry[0], entry[1]); } }
      return Promise.all([worker(), worker()]);
    }

    // Rasterize all SVG QR images onto PNG Data URLs so html2canvas renders them crisply on all browsers
    function rasterizeQrImage() {
      var qrImgs = Array.prototype.slice.call(document.querySelectorAll('#report-qr-img, .file-attachment-qr img, .media-qr'));
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

    function pdfLayout(element) {
      var clone = element.cloneNode(true);
      // html2pdf cannot paginate CSS columns reliably. Keep natural image heights
      // in complete rows for the downloadable PDF; the preview stays masonry.
      clone.querySelectorAll('.media-masonry').forEach(function(grid) {
        var cards = Array.from(grid.children);
        var portraitClips = grid.classList.contains('video-grid') && cards.every(function(card) {
          var image = card.querySelector('.video-thumb-img');
          return image && !image.hidden && image.naturalHeight > image.naturalWidth;
        });
        var columns = grid.classList.contains('photo-grid') || portraitClips ? 3 : 2;
        grid.replaceChildren(); grid.classList.remove('media-masonry'); grid.classList.add('pdf-media-grid');
        grid.style.columnCount = 'auto';
        for (var i = 0; i < cards.length; i += columns) {
          var row = document.createElement('div'); row.className = 'pdf-media-row';
          cards.slice(i, i + columns).forEach(function(card) {
            var width = 'calc((100% - ' + ((columns - 1) * 12) + 'px) / ' + columns + ')';
            card.style.width = width; card.style.flex = '0 0 ' + width; row.appendChild(card);
          });
          grid.appendChild(row);
        }
      });
      return clone;
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
          margin: [8, 8, 16, 8],
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
            avoid: ['.location-details', '.pdf-media-row', 'tr', '.info-item', '.voice-card', '.video-card', '.photo-card', '.comment-header', '.comment-audio', '.note-banner', '.handoff-banner', '.report-header', '.file-attachment-card', '.audit-stage', '.audit-event', '.audit-change', '.audit-event-heading', '.audit-media']
          }
        };
        var worker = window.html2pdf().set(opt).from(pdfLayout(element));
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
        }).toCanvas().toPdf().get('pdf').then(function(pdf) {
          addReportFooters(pdf);
        }).save().then(function() {
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
      window.reportReady = Promise.all([fontsReady, rasterizeQrImage(), prepareVideoThumbnails()]);
      window.reportReady.then(function() {
        document.documentElement.dataset.reportReady = 'true';
        document.querySelectorAll('[data-report-export]').forEach(function(button) { button.disabled = false; });
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
