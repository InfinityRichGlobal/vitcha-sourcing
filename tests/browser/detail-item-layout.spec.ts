import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { capture } from './capture';

test.use({ serviceWorkers: 'block', trace: 'off', launchOptions: { args: ['--disable-gpu'] } });

for (const kind of ['supplier', 'store'] as const) {
  test(`${kind} item photos stay large with readable text and working zoom across mobile and desktop`, async ({ page }) => {
    test.setTimeout(90000);
    await page.route('https://tiles.openfreemap.org/**', route => route.abort());
    await page.route('**/uploads/detail-layout-photo.png', route => route.fulfill({ contentType: 'image/png', body: fs.readFileSync('tests/fixtures/photo.png') }));
    await page.route('**/uploads/detail-layout-tone.wav', route => route.fulfill({ contentType: 'audio/wav', body: fs.readFileSync('tests/fixtures/tone.wav') }));
    const auth = await page.request.post('/api/login', { data: { idOrEmail: 'qa-admin', pin: 'qa-only-876543' } });
    expect(auth.ok()).toBeTruthy();
    const { token } = await auth.json();
    await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
    const id = `detail-layout-${kind}-${Date.now()}`;
    const longName = 'รายการตัวอย่างชื่อยาวที่ต้องอ่านครบทุกคำโดยไม่ตัดข้อความ';
    const memo = 'รายละเอียดของรายการต้องแสดงครบถ้วน\nบรรทัดสุดท้ายที่ยังต้องอ่านได้';
    const common = { id, country: 'CN', location: { lat: 13, lng: 100 }, quickTags: [] };
    const entries = Array.from({ length: 3 }, (_, index) => ({
      id: `item-${index}`, photo: index === 2 ? '' : '/uploads/detail-layout-photo.png',
      name: `${longName} ${index + 1}`, ...(kind === 'store' && index === 1 ? { priceThb: 85 } : { priceRmb: index === 0 ? 0 : 100 + index }),
      weightKg: '12 kg', dimensions: '80 × 70 × 85 cm', memo,
      cupSize: '700 ml', fitMenuTarget: 'ชาไทย', gimmickNotes: memo,
      voiceNotes: [{ id: `voice-${index}`, url: '/uploads/detail-layout-tone.wav', durationSec: 1, label: 'เสียงบันทึกรายละเอียดเพิ่มเติม' }],
    }));
    const record = kind === 'supplier'
      ? { ...common, name: 'Large supplier catalog', category: 'เครื่องชงชา/กาแฟ', rating: 4, photos: { storefrontAndAtmosphere: [], contactCards: [] }, catalogItems: entries }
      : { ...common, storeName: 'Large store menu', storeCategory: 'ชาผลไม้', photos: { storefrontAndAtmosphere: [], menuBoard: [], drinkCups: [] }, ratings: { taste: 4, aesthetics: 4, value: 4, speed: 4 }, drinkItems: entries };
    const saved = await page.request.post(kind === 'supplier' ? '/api/suppliers' : '/api/drink-stores', { headers: { Authorization: `Bearer ${token}` }, data: record });
    expect(saved.ok()).toBeTruthy();
    await page.goto(`/?view=${id}&type=${kind === 'supplier' ? 'supplier' : 'drink_store'}`);
    const grid = page.getByTestId(kind === 'supplier' ? 'supplier-catalog-grid' : 'store-menu-grid');
    const cards = grid.getByTestId('detail-item-card');
    await expect(cards).toHaveCount(3, { timeout: 30000 });
    await expect(cards.first()).toContainText(memo);
    await expect(cards.first()).toContainText(kind === 'supplier' ? '80 × 70 × 85 cm' : '700 ml');
    await expect(cards.nth(2)).toContainText('ไม่มีรูป');
    await expect(cards.first()).toContainText('¥0');
    if (kind === 'store') {
      await expect(cards.nth(1)).toContainText('฿85');
      await expect(cards.nth(1)).not.toContainText(/¥|≈/);
    }

    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 1000 });
      await cards.first().scrollIntoViewIfNeeded();
      const geometry = await cards.evaluateAll(elements => elements.slice(0, 2).map(element => {
        const photo = element.querySelector('button')!;
        const image = photo.querySelector('img')!;
        const name = photo.nextElementSibling!.firstElementChild!;
        const audio = element.querySelector('audio')!;
        const bounds = element.getBoundingClientRect();
        return {
          card: bounds.toJSON(), photo: photo.getBoundingClientRect().toJSON(),
          image: image ? { fit: getComputedStyle(image).objectFit, width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height } : null,
          name: { overflow: getComputedStyle(name).textOverflow, bottom: name.getBoundingClientRect().bottom },
          audio: audio.getBoundingClientRect().toJSON(), scrollWidth: element.scrollWidth,
        };
      }));
      expect(geometry[0].photo.height).toBeGreaterThanOrEqual(176);
      expect(geometry[0].image?.fit).toBe('contain');
      expect(geometry[0].image!.width).toBeGreaterThan(130);
      expect(geometry[0].name.overflow).not.toBe('ellipsis');
      expect(geometry[0].name.bottom).toBeGreaterThan(geometry[0].photo.bottom);
      expect(geometry[0].audio.width).toBeLessThan(geometry[0].card.width);
      expect(geometry[0].scrollWidth).toBeLessThanOrEqual(Math.ceil(geometry[0].card.width));
      if (width === 320) expect(geometry[1].card.top).toBeGreaterThan(geometry[0].card.top);
      else {
        expect(Math.abs(geometry[1].card.top - geometry[0].card.top)).toBeLessThan(1);
        expect(geometry[1].card.left).toBeGreaterThan(geometry[0].card.left);
      }
      await capture(page, { path: `test-results/${kind}-large-items-${width}.png` });
    }

    await page.setViewportSize({ width: 390, height: 844 });
    const zoom = cards.first().getByRole('button', { name: `ขยายรูป ${longName} 1`, exact: true });
    await zoom.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText('รูปที่ 1 / 2', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'เปิดไฟล์ต้นฉบับ' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByText('รูปที่ 1 / 2', { exact: true })).toHaveCount(0);
  });
}
