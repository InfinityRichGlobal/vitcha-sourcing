import { test, expect } from '@playwright/test';
import { buildExecutiveReportHtml } from '../../src/utils/exportReport';
import fs from 'node:fs/promises';

test.use({ serviceWorkers: 'block', launchOptions: { args: ['--disable-gpu'] } });

test('item reports keep two large uncropped photos per row with complete readable specifications', async ({ page }) => {
  const image = `data:image/jpeg;base64,${(await fs.readFile('public/brand-mockups/yuzu-jelly.jpg')).toString('base64')}`;
  const gallery = await Promise.all(['konjac-pearls.jpg', 'shared-storefront.jpg'].map(async name => `data:image/jpeg;base64,${(await fs.readFile(`public/brand-mockups/${name}`)).toString('base64')}`));
  const common = { id: 'large-photo-report', country: 'TH', photos: { storefrontAndAtmosphere: [...gallery, image, gallery[0]], contactCards: [] }, location: { lat: 13, lng: 100 }, creator: { alias: 'QA', timestamp: '2026-11-20T00:00:00Z' }, history: [], reviewerNotes: [] };
  const records: any[] = [
    { ...common, type: 'supplier', name: 'ตัวอย่างรายงานสินค้า ภาพใหญ่', category: 'วัตถุดิบ', rating: 4, catalogItems: [
      { id: 'first', name: 'ยูซุเจลลี่สำหรับเครื่องดื่ม', photo: image, dimensions: 'บรรจุ 1 กิโลกรัม / ถุง ขนาด 20 x 30 เซนติเมตร', weightKg: '1 kg', priceThb: 165, memo: 'เนื้อเจลลี่นุ่ม กลิ่นส้มยูซุชัด เหมาะกับชาและโซดา\nเก็บในตู้เย็นหลังเปิดถุง และใช้ช้อนสะอาดทุกครั้ง' },
      { id: 'second', name: 'ตัวอย่างรายการที่มีชื่อยาวเพื่อทดสอบการตัดบรรทัดและรายละเอียดสเปกครบถ้วน', photo: image, dimensions: 'ขนาดบรรจุสำหรับร้านเครื่องดื่ม', weightKg: '2 kg', priceThb: 0, memo: 'ข้อความท้ายรายการสอง' },
      { id: 'third', name: 'รายการที่ยังไม่มีภาพ', photo: '', dimensions: '', memo: 'ข้อความท้ายรายการสาม' },
    ] },
    { ...common, type: 'drink_store', storeName: 'ตัวอย่างรายงานเมนู ภาพใหญ่', storeCategory: 'ชา', ratings: { taste: 4, aesthetics: 4, value: 4, speed: 4 }, photos: { ...common.photos, menuBoard: [], drinkCups: [] }, drinkItems: [
      { id: 'first', name: 'ชาส้มยูซุเจลลี่', photo: image, cupSize: '22 oz', fitMenuTarget: 'ต่อยอดเป็นชาใสผลไม้และโซดา', priceThb: 85, gimmickNotes: 'ใช้เจลลี่ส้มยูซุที่ก้นแก้ว ให้สัมผัสนุ่มและกลิ่นหอมสดชื่น\nข้อความท้ายเมนูหนึ่ง' },
      { id: 'second', name: 'เมนูทดลอง', photo: image, cupSize: '16 oz', fitMenuTarget: 'เมนูชิมตัวอย่าง', priceRmb: 0, gimmickNotes: 'ข้อความท้ายเมนูสอง' },
      { id: 'third', name: 'เมนูไม่มีรูป', photo: '', priceThb: 0 },
    ] },
  ];
  await page.route('**/logo.jpg', route => route.fulfill({ path: 'public/logo.jpg', contentType: 'image/jpeg' }));
  await page.route('**/html2pdf.bundle.min.js', route => route.fulfill({ body: '', contentType: 'application/javascript' }));
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));
  await page.addInitScript(() => { window.print = () => {}; });
  for (const record of records) {
    const html = buildExecutiveReportHtml(record, value => value * 5, 'print');
    await page.route('**/item-layout-report', route => route.fulfill({ body: html, contentType: 'text/html' }));
    await page.goto('/item-layout-report', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-report-ready', 'true', { timeout: 30000 });
    const rows = page.locator('.item-report-row');
    await expect(rows).toHaveCount(2);
    await expect(rows.first().locator('.item-report-card')).toHaveCount(2);
    await expect(rows.last().locator('.item-report-card')).toHaveCount(1);
    await expect(page.locator('.photo-grid .photo-card')).toHaveCount(2);
    await expect(page.locator('.summary-pill').first()).toContainText('รูปภาพ 3 รูป');
    await expect(page.locator('.photo-report-row').first().locator('.photo-card')).toHaveCount(2);
    const galleryBoxes = await page.locator('.photo-report-row').first().locator('.photo-card').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()));
    expect(galleryBoxes[0].y).toBe(galleryBoxes[1].y);
    expect(galleryBoxes[1].x).toBeGreaterThan(galleryBoxes[0].x + galleryBoxes[0].width);
    const cards = page.locator('.item-report-card');
    const boxes = await cards.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()));
    expect(boxes[0].width).toBeGreaterThan(300);
    expect(boxes[0].y).toBe(boxes[1].y);
    expect(boxes[1].x).toBeGreaterThan(boxes[0].x + boxes[0].width);
    expect(boxes[2].y).toBeGreaterThan(boxes[0].y + boxes[0].height);
    for (const img of await cards.locator('img').all()) {
      const dimensions = await img.evaluate((image: HTMLImageElement) => ({ width: image.naturalWidth, height: image.naturalHeight, rect: image.getBoundingClientRect().toJSON() }));
      expect(dimensions.rect.width).toBeGreaterThan(180);
      expect(dimensions.rect.height).toBeGreaterThan(180);
      expect(Math.abs(dimensions.rect.width / dimensions.rect.height - dimensions.width / dimensions.height)).toBeLessThan(0.01);
    }
    for (const field of await cards.locator('.item-report-title, dd, .item-report-notes').all()) {
      expect(await field.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
    }
    await expect(cards.last()).toContainText('ยังไม่มีภาพรายการนี้');
    await expect(cards.nth(1)).toContainText(record.type === 'supplier' ? '฿0' : '¥0');
    await expect(cards.first()).toContainText(record.type === 'supplier' ? 'ใช้ช้อนสะอาดทุกครั้ง' : 'ข้อความท้ายเมนูหนึ่ง');
    await page.emulateMedia({ media: 'print' });
    await fs.mkdir('output/pdf', { recursive: true });
    await page.pdf({ path: `output/pdf/list-items-${record.type}.pdf`, preferCSSPageSize: true, printBackground: true });
    await fs.mkdir('output/render-check', { recursive: true });
    await page.locator('#record-items').screenshot({ path: `output/render-check/list-items-${record.type}.png` });
    await page.unroute('**/item-layout-report');
    await page.emulateMedia({ media: 'screen' });
  }
});
