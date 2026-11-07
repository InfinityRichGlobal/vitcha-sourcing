import { test, expect } from '@playwright/test';
import { buildExecutiveReportHtml } from '../../src/utils/exportReport';

test.use({ serviceWorkers: 'block', launchOptions: { args: ['--disable-gpu'] } });
test('PDF keeps portrait and landscape proportions, captures each clip, and includes complete comments', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const fixtures = await page.evaluate(async () => {
    async function media(width: number, height: number, color: string) {
      const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d')!; ctx.fillStyle = color; ctx.fillRect(0, 0, width, height);
      const image = canvas.toDataURL('image/png').split(',')[1];
      const stream = canvas.captureStream(10); const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
      recorder.ondataavailable = event => chunks.push(event.data);
      const stopped = new Promise<void>(resolve => { recorder.onstop = () => resolve(); });
      recorder.start();
      const timer = setInterval(() => ctx.fillRect(0, 0, width, height), 50);
      await new Promise(resolve => setTimeout(resolve, 400)); recorder.stop(); await stopped;
      clearInterval(timer); stream.getTracks().forEach(track => track.stop());
      const bytes = new Uint8Array(await new Blob(chunks).arrayBuffer());
      return { image, video: btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join('')) };
    }
    return { portrait: await media(120, 200, '#ee2222'), landscape: await media(320, 180, '#2222ee') };
  });
  await page.route('https://report-media.test/**', route => {
    const [name, ext] = new URL(route.request().url()).pathname.slice(1).split('.');
    const fixture = fixtures[name as 'portrait' | 'landscape'];
    if (!fixture) return route.fulfill({ status: 404 });
    return route.fulfill({ headers: { 'Access-Control-Allow-Origin': '*' }, contentType: ext === 'png' ? 'image/png' : 'video/webm', body: Buffer.from(ext === 'png' ? fixture.image : fixture.video, 'base64') });
  });
  await page.route('**/html2pdf.bundle.min.js', route => route.fulfill({ body: '', contentType: 'application/javascript' }));
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));
  await page.addInitScript(() => { window.print = () => {}; });
  const url = (name: string, ext: string) => `https://report-media.test/${name}.${ext}`;
  const item: any = { id: 'report-ratios', type: 'supplier', name: 'รายงานสัดส่วนจริง', category: 'ชา', rating: 4, photos: { storefrontAndAtmosphere: [url('portrait', 'png'), url('landscape', 'png')], contactCards: [] }, catalogItems: [], location: { lat: 13, lng: 100 }, creator: { alias: 'นายเอ', timestamp: '2026-11-08T00:00:00Z' }, videos: [url('portrait', 'webm'), url('landscape', 'webm'), url('missing', 'webm')], history: [], reviewerNotes: [{ id: 'note', author: 'นายบี', timestamp: '2026-11-08T01:00:00Z', text: 'ความคิดเห็นครบทุกบรรทัด\nบรรทัดท้าย', media: [{ id: 'p', type: 'image', url: url('portrait', 'png'), name: 'หน้าร้านแนวตั้ง.png' }, { id: 'v', type: 'video', url: url('landscape', 'webm'), name: 'บรรยากาศแนวนอน.webm' }], voiceUrl: 'https://report-media.test/voice.wav', duration: 8, replies: [{ id: 'reply', author: 'นายซี', timestamp: '2026-11-08T02:00:00Z', text: 'ตอบกลับครบถ้วน' }] }] };
  const html = buildExecutiveReportHtml(item, value => value, 'print');
  await page.route('**/report-preview', route => route.fulfill({ body: html, contentType: 'text/html' }));
  await page.goto('/report-preview', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-report-ready', 'true', { timeout: 15000 });
  await expect(page.locator('img[data-thumbnail-status=ready]')).toHaveCount(3);
  await expect(page.locator('img[data-thumbnail-status=unavailable]')).toHaveCount(1);
  await expect(page.locator('img[data-thumbnail-status=unavailable]')).toBeHidden();
  await expect(page.getByText('ไม่สามารถสร้างภาพจากคลิปนี้ได้ · เปิดคลิปจากลิงก์ด้านล่าง')).toBeVisible();
  for (const img of await page.locator('.photo-card > img, .video-thumb-img:not([hidden])').all()) {
    const dimensions = await img.evaluate((image: HTMLImageElement) => ({ width: image.naturalWidth, height: image.naturalHeight, rect: image.getBoundingClientRect().toJSON() }));
    expect(dimensions.width).toBeGreaterThan(0);
    expect(Math.abs(dimensions.rect.width / dimensions.rect.height - dimensions.width / dimensions.height)).toBeLessThan(0.01);
  }
  const frames = await page.locator('.video-thumb-img:not([hidden])').evaluateAll(images => images.map(image => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d')!; ctx.drawImage(image as HTMLImageElement, 0, 0, 1, 1);
    return Array.from(ctx.getImageData(0, 0, 1, 1).data);
  }));
  expect(frames[0][0]).toBeGreaterThan(200); expect(frames[0][2]).toBeLessThan(70);
  expect(frames[1][2]).toBeGreaterThan(200); expect(frames[1][0]).toBeLessThan(70);
  expect(frames[2]).toEqual(frames[1]);
  const comments = page.locator('#record-comments');
  for (const label of ['บรรทัดท้าย', 'ตอบกลับครบถ้วน', 'นายบี', 'นายซี', 'หน้าร้านแนวตั้ง.png', 'บรรยากาศแนวนอน.webm', 'เสียงแนบ', '8 วินาที']) await expect(comments).toContainText(label);
  await expect(comments.locator('.comment-audio a')).toHaveAttribute('href', 'https://report-media.test/voice.wav');
  await expect(page.locator('#activity-history')).not.toContainText('บรรทัดท้าย');
  await expect(page.locator('#activity-history img')).toHaveCount(0);
  await page.emulateMedia({ media: 'print' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
});
