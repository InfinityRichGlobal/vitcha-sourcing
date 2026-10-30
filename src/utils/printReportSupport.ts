import { FranchiseStore, LabItem, LabRevisionCycle, User } from '../types';
import { getRenderServerUrl } from '../services/api';

export const reportEscape = (value?: string | number | null) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
export function reportUrl(value?: string): string {
  if (!value) return '';
  if (/^data:image\/(png|jpe?g|webp|gif);base64,[a-z\d+/=\s]+$/i.test(value)) return value;
  try {
    const url = new URL(value, getRenderServerUrl() + '/');
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}
export function reportDate(value?: string): string {
  if (!value) return 'ไม่ระบุ';
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Bangkok' }) : 'ไม่ระบุ';
}
export function reportImage(url: string | undefined, alt: string, className = ''): string {
  const src = reportUrl(url);
  return src ? `<img class="${className}" src="${reportEscape(src)}" alt="${reportEscape(alt)}" loading="eager" />` : `<div class="image-missing ${className}">ยังไม่มีภาพ</div>`;
}
export const reportLink = (url: string | undefined, label: string) => {
  const safe = reportUrl(url);
  return safe ? `<a href="${reportEscape(safe)}" target="_blank" rel="noopener noreferrer">${reportEscape(label)}</a>` : `<span>${reportEscape(label)} · ไม่มีลิงก์ที่เปิดได้</span>`;
};
export function reportPerson(id: string | undefined, name: string | undefined, avatar: string | undefined, users: User[]) {
  const member = users.find(u => u.id === id);
  const label = member?.alias || member?.name || name || 'ไม่ระบุผู้บันทึก';
  const image = reportUrl(member?.avatar || avatar);
  return `${image ? `<img class="actor-avatar" src="${reportEscape(image)}" alt="" />` : ''}<strong>${reportEscape(label)}</strong>`;
}

export const historyPrintCss = `
  .report-history{font-size:12px;line-height:1.6;overflow-wrap:anywhere}
  .report-history h2,.report-history h3{break-after:avoid}.record-meta{color:#64748b;font-size:11px;margin:4px 0 14px}
  .history-cycle{border-top:1px solid #cbd5e1;padding-top:10px;margin-top:16px}.history-cycle h3{margin:0;color:#173f35;font-size:16px}
  .history-comment{padding:10px 0;border-bottom:1px solid #e2e8f0;break-inside:avoid}.history-comment.long-comment{break-inside:auto}
  .actor-line{display:flex;align-items:center;gap:8px;break-after:avoid}.actor-line time{margin-left:auto;color:#64748b;font-size:10px}
  .actor-avatar{width:27px;height:27px;object-fit:cover;border-radius:50%}.comment-content,.cycle-summary{white-space:pre-wrap;margin:5px 0}
  .history-reply{margin-left:24px;border-left:2px solid #cbd5e1;padding-left:12px}.comment-photo{max-width:210px;max-height:140px;object-fit:contain;display:block;margin:8px 0}
  .media-link{font-size:11px;margin:5px 0}.history-view-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.history-view{flex-wrap:wrap}.history-view time{width:100%;margin-left:35px}.history-view{padding:6px 0;border-bottom:1px solid #eee;break-inside:avoid}
  a{color:#047857;overflow-wrap:anywhere}.image-missing{display:flex;align-items:center;justify-content:center;background:#f5f7f7;color:#778781}
`;

export function buildRecordedHistory(record: FranchiseStore | LabItem, users: User[] = []): string {
  const person = (id?: string, name?: string, avatar?: string) => reportPerson(id, name, avatar, users);
  type Comment = LabRevisionCycle['comments'][number];
  const comment = (c: Comment | NonNullable<Comment['replies']>[number], reply = false): string => `<article class="history-comment ${reply ? 'history-reply' : ''} ${String(c.content || '').length > 850 ? 'long-comment' : ''}">
    <div class="actor-line">${person(c.authorId, c.authorName, c.authorAvatar)}<time>${reportEscape(reportDate(c.createdAt))}</time></div>
    ${'sweetnessTarget' in c && c.sweetnessTarget && c.sweetnessTarget !== 'all' ? `<div class="record-meta">ความหวาน ${reportEscape(c.sweetnessTarget)}%</div>` : ''}
    <p class="comment-content">${reportEscape(c.content)}</p>
    ${c.photoUrl ? reportImage(c.photoUrl, 'ภาพประกอบความคิดเห็น', 'comment-photo') : ''}
    ${c.voiceUrl ? `<div class="media-link">${reportLink(c.voiceUrl, 'เปิดฟังเสียงประกอบความคิดเห็น')}</div>` : ''}
    ${'replies' in c ? (c.replies || []).map(r => comment(r, true)).join('') : ''}</article>`;
  return `<section class="report-history" id="recorded-history"><h2>ความคิดเห็นและประวัติที่บันทึกไว้</h2>
    <div class="actor-line">${person(record.createdById, record.createdByName, record.createdByAvatar)}<span>สร้างรายการ</span><time>${reportEscape(reportDate(record.createdAt))}</time></div>
    <div class="record-meta">แก้ไขรายการล่าสุด ${reportEscape(reportDate(record.updatedAt))} · ถูกใจ ${(record.likedBy || []).length} คน</div>
    ${(record.revisionCycles || []).map(c => `<section class="history-cycle"><h3>รอบ ${reportEscape(c.cycleNumber)} · ${reportEscape(c.title)}</h3>
      <div class="record-meta">เริ่ม ${reportEscape(reportDate(c.createdAt))} · ${person(c.createdBy, c.createdBy, undefined)} · ${c.status === 'closed' ? 'ปิดรอบแล้ว' : 'กำลังดำเนินการ'}${c.closedAt ? `<br>ปิดรอบ ${reportEscape(reportDate(c.closedAt))}${c.closedBy ? ` · ${person(c.closedBy, c.closedBy, undefined)}` : ''}` : ''}</div>
      ${c.summary ? `<p class="cycle-summary"><b>สรุปรอบ: </b>${reportEscape(c.summary)}</p>` : ''}
      ${(c.comments || []).map(c => comment(c)).join('') || '<p class="record-meta">ไม่พบความคิดเห็นในรอบนี้</p>'}</section>`).join('') || '<p class="record-meta">ไม่พบประวัติรอบการพัฒนาหรือความคิดเห็น</p>'}
    ${(record.audioNotes || []).length || (record.videos || []).length ? `<h3>สื่อประกอบรายการ</h3>${(record.audioNotes || []).map((a, i) => `<p class="media-link">${reportLink(a.url, a.title || `เสียงบันทึก ${i + 1}`)}${a.authorName ? ` · ${reportEscape(a.authorName)}` : ''}${a.createdAt ? ` · ${reportEscape(reportDate(a.createdAt))}` : ''}</p>`).join('')}${(record.videos || []).map((v, i) => `<p class="media-link">${reportLink(v, `วิดีโอ ${i + 1}`)}</p>`).join('')}` : ''}
    ${(record.viewLogs || []).length ? `<h3>การเปิดดูรายการ</h3><p class="record-meta">แสดงจำนวนและเวลาที่เปิดดูล่าสุดตามที่ระบบบันทึก</p><div class="history-view-grid">${(record.viewLogs || []).map(v => `<div class="actor-line history-view">${person(v.userId, v.alias || v.name, v.avatar)}<span>${v.viewCount} ครั้ง</span><time>${reportEscape(reportDate(v.lastViewedAt))}</time></div>`).join('')}</div>` : ''}
  </section>`;
}

export const reportActions = `<div class="print-actions"><button onclick="window.close()">ปิดหน้าต่าง</button><button id="print-report">พิมพ์ / บันทึก PDF</button><span id="print-status" role="status"></span></div>`;
export const reportPrintScript = `<script>
  document.querySelectorAll('img').forEach(img => { img.addEventListener('error', () => { if(img.classList.contains('actor-avatar')) {img.style.display='none';return;} const label=document.createElement('div');label.className='image-missing '+img.className;label.textContent='โหลดภาพไม่สำเร็จ';img.replaceWith(label); }); });
  document.getElementById('print-report').addEventListener('click', async function() {
    const status=document.getElementById('print-status');this.disabled=true;status.textContent='กำลังเตรียมภาพและตัวอักษร…';
    await Promise.race([Promise.all([document.fonts.ready,...Array.from(document.images).map(i=>i.complete?Promise.resolve():new Promise(r=>{i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true});}))]),new Promise(r=>setTimeout(r,10000))]);
    this.disabled=false;status.textContent=Array.from(document.images).some(i=>!i.complete)?'ภาพบางส่วนยังโหลดไม่ครบ กรุณารอแล้วพิมพ์อีกครั้ง':'';window.print();
  });
</script>`;
export function openPrintReport(html: string): void {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
  const popup = window.open(url, '_blank');
  if (!popup) { const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.click(); }
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
