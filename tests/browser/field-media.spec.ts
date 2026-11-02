import { test, expect, Page } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
test.use({ trace: 'off', viewport: { width: 390, height: 844 }, launchOptions: { args: ['--disable-gpu'] } });
async function signIn(page: Page) {
  await page.route('https://tiles.openfreemap.org/**', route => route.fulfill({ status: 503, body: '' }));
  const response = await page.request.post('/api/login', { data: { idOrEmail: 'qa-admin', pin: 'qa-only-876543' } });
  const { token } = await response.json();
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  return token;
}
async function newSupplier(page: Page) {
  await signIn(page); await page.goto('/?tab=suppliers');
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: 'เพิ่มซัพพลายเออร์ โรงงาน · อุปกรณ์ · วัตถุดิบชา & บรรจุภัณฑ์' }).click();
  return page.getByRole('dialog');
}
test('video preview and progress appear immediately; cancellation aborts upload and never adds a saved video', async ({ page }) => {
  const dialog = await newSupplier(page);
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/uploads/*/chunk?*', async route => { await gate; await route.abort().catch(() => {}); });
  const chunkStarted = page.waitForRequest(r => r.url().includes('/chunk?'));
  const deleted = page.waitForRequest(r => /\/api\/uploads\//.test(r.url()) && r.method() === 'DELETE');
  await dialog.locator('input[accept="video/*"]').setInputFiles('tests/fixtures/clip.webm');
  const job = page.getByTestId('video-upload-job');
  await expect(job.locator('video')).toHaveAttribute('src', /^blob:/);
  await expect(job.getByRole('progressbar')).toBeVisible();
  await expect(dialog.getByRole('button', { name: /บันทึก/ }).last()).toBeDisabled();
  await chunkStarted;
  await job.getByRole('button', { name: 'ยกเลิกอัปโหลด clip.webm' }).click();
  await expect(job).toHaveCount(0); release(); await deleted;
  await expect(dialog.locator('video')).toHaveCount(0);
});
test('a 60 MB video reaches saved preview without calling Google from the phone', async ({ page }) => {
  test.setTimeout(90000);
  const dialog = await newSupplier(page);
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-large-browser-'));
  const file = path.join(temp, 'large.webm');
  fs.copyFileSync('tests/fixtures/clip.webm', file); fs.truncateSync(file, 60 * 1024 * 1024);
  const googleRequests: string[] = []; page.on('request', r => { if (r.url().includes('googleapis.com')) googleRequests.push(r.url()); });
  const completed = page.waitForResponse(r => /\/api\/uploads\/[^/]+\/complete$/.test(r.url()));
  try { await dialog.locator('input[accept="video/*"]').setInputFiles(file);
  expect((await completed).ok()).toBeTruthy(); } finally { fs.rmSync(temp, { recursive: true, force: true }); }
  await expect(page.getByTestId('video-upload-job')).toHaveCount(0);
  await expect(dialog.locator('video')).toHaveAttribute('src', /\/uploads\//);
  expect(googleRequests).toEqual([]);
});
test('saved relative photos load in edit and stay in separate detail galleries and carousels', async ({ page }) => {
  const token = await signIn(page);
  const uploaded = await page.request.post('/api/upload', { headers: { Authorization: `Bearer ${token}` }, data: { mimeType: 'image/png', base64: `data:image/png;base64,${fs.readFileSync('tests/fixtures/photo.png').toString('base64')}` } });
  const { url } = await uploaded.json();
  const id = `field-${Date.now()}`;
  const saved = await page.request.post('/api/suppliers', { headers: { Authorization: `Bearer ${token}` }, data: { id, name: 'ทดสอบหมวดรูป', category: 'เครื่องชงชา/กาแฟ', rating: 4, quickTags: [], photos: { storefrontAndAtmosphere: [url + '?shop'], contactCards: [url + '?card'] }, catalogItems: [{ id: 'product', name: 'สินค้าแยกหมวด', photo: url + '?product' }], location: { lat: 13, lng: 100 }, status: 'scouted' } });
  expect(saved.ok()).toBeTruthy();
  await page.goto(`/?view=${id}&type=supplier`);
  const contacts = page.getByRole('region', { name: 'นามบัตร / WeChat QR' });
  const storefront = page.getByRole('region', { name: 'หน้าร้าน / บรรยากาศ' });
  await expect(contacts.locator('img')).toHaveCount(1); await expect(storefront.locator('img')).toHaveCount(1);
  await expect(contacts.locator('img')).toHaveAttribute('src', /^http:\/\/127.0.0.1:4173\/uploads\//);
  await expect.poll(() => contacts.locator('img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await contacts.getByRole('button').click();
  await expect(page.getByText('รูปที่ 1 / 1', { exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /แก้ไขข้อมูล/ }).first().click();
  const dialog = page.getByRole('dialog').last();
  const card = dialog.locator('img');
  await expect.poll(async () => card.evaluateAll((images: HTMLImageElement[]) => images.filter(i => i.src.includes('?card') && i.naturalWidth > 0).length)).toBe(1);
});
