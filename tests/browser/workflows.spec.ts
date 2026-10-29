import { capture } from './capture';
import { test, expect, Page } from '@playwright/test';
// Avoid this host's unstable Metal screenshot compositor; map coverage uses its own renderer.
test.use({ launchOptions: { args: ['--disable-gpu'] } });

const password = 'qa-only-876543';
// Non-map workflows must not compete with software WebGL or depend on tile-network latency.
// The dedicated map.spec.ts uses the real provider and renderer.
test.beforeEach(async ({ page }, info) => {
  if (!info.title.startsWith('China basemap')) {
    await page.route('https://tiles.openfreemap.org/**', route => route.fulfill({ status: 503, body: 'Map intentionally unavailable in non-map workflow tests' }));
  }
});

async function signIn(page: Page, role = 'admin') {
  const response = await page.request.post('/api/login', { data: { idOrEmail: `qa-${role}`, pin: password } });
  expect(response.ok()).toBeTruthy();
  const { token } = await response.json();
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
}
async function navigateTab(page: Page, name: string) {
  const topNav = page.getByRole('navigation').getByRole('button', { name: new RegExp(name) });
  if (await topNav.isVisible().catch(() => false)) {
    await topNav.click();
    return;
  }
  await page.getByRole('button', { name: /แพลตฟอร์ม/ }).click();
  const drawer = page.locator('.fixed.inset-0');
  await drawer.getByRole('button', { name: new RegExp(name) }).first().click();
}
async function openSupplierForm(page: Page) {
  await navigateTab(page, 'ซัพพลายเออร์');
  // Header add control opens the two record choices.
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
}

test('login is verified by the server; desktop navigation fits', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator('input[autocomplete="username"]').fill('qa-admin');
  await page.locator('input[autocomplete="current-password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await expect(page.getByRole('banner')).toBeVisible();
  await navigateTab(page, 'ซัพพลายเออร์');
  await expect(page.locator('input[placeholder*="ค้นหาชื่อซัพพลายเออร์"]')).toBeVisible();
  await capture(page, { path: 'test-results/desktop-suppliers.png', fullPage: false });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test('mobile viewer can read comments but cannot compose or change handoff', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await signIn(page, 'viewer');
  await navigateTab(page, 'ซัพพลายเออร์');
  await expect(page.locator('input[placeholder="เขียนความคิดเห็นในโพสต์นี้..."]')).toHaveCount(0);
  await navigateTab(page, 'ส่งต่องาน');
  await expect(page.locator('select').filter({ has: page.locator('option[value="awaiting"]') }).first()).toBeDisabled();
  await capture(page, { path: 'test-results/mobile-handoff.png', fullPage: false });
});

test('mobile admin form and image inputs can be reached', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await signIn(page);
  await navigateTab(page, 'ซัพพลายเออร์');
  // Use the header's plus action (accessible title is asserted from actual markup).
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: 'เพิ่มซัพพลายเออร์ โรงงาน · อุปกรณ์ · วัตถุดิบชา & บรรจุภัณฑ์' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await capture(page, { path: 'test-results/mobile-new-supplier.png', fullPage: false });
});

const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Zl1kAAAAASUVORK5CYII=', 'base64');
async function newSupplier(page: Page) {
  await navigateTab(page, 'ซัพพลายเออร์');
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: 'เพิ่มซัพพลายเออร์ โรงงาน · อุปกรณ์ · วัตถุดิบชา & บรรจุภัณฑ์' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('input[placeholder*="FEST"]').fill('ซัพพลายเออร์ทดสอบ');
  await dialog.locator('select').first().selectOption({ index: 1 });
  return dialog;
}

test('overlapping photo batches keep save disabled until every image is ready', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await signIn(page);
  const dialog = await newSupplier(page);
  // Delay native image decoding, without modifying application code.
  await page.evaluate(() => {
    const NativeImage = window.Image;
    const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')!;
    let count = 0;
    window.Image = function () {
      const image = new NativeImage();
      Object.defineProperty(image, 'src', { get() { return descriptor.get!.call(image); }, set(value) { const delay = ++count === 1 ? 700 : 2600; setTimeout(() => descriptor.set!.call(image, value), delay); } });
      return image;
    } as typeof Image;
  });
  const inputs = dialog.locator('input[type="file"][accept="image/*"]');
  await inputs.nth(0).setInputFiles({ name: 'first.png', mimeType: 'image/png', buffer: pixel });
  await inputs.nth(1).setInputFiles({ name: 'second.png', mimeType: 'image/png', buffer: pixel });
  const save = dialog.locator('button').last();
  await expect(save).toBeDisabled();
  await expect(dialog.getByRole('status')).toContainText('1 ชุด');
  await expect(save).toBeDisabled();
  await expect(save).toBeEnabled({ timeout: 10000 });
  const responsePromise = page.waitForResponse(r => r.url().endsWith('/api/suppliers') && r.request().method() === 'POST');
  await save.click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
  const saved = (await response.json()).item;
  expect(JSON.stringify(saved).match(/\/uploads\//g)?.length).toBe(2);
  for (const url of Object.values(saved.photos).flat() as string[]) expect((await page.request.get(url)).ok()).toBeTruthy();
  await expect(dialog).not.toBeVisible();
});

test('failed save keeps the form and user input available', async ({ page }) => {
  await signIn(page);
  const dialog = await newSupplier(page);
  const name = dialog.locator('input[placeholder*="FEST"]');
  await name.fill('Keep this draft');
  await page.route('**/api/suppliers', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'QA server unavailable' }) }));
  await dialog.getByRole('button', { name: 'บันทึกเข้าระบบ', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('QA server unavailable');
  await expect(dialog).toBeVisible();
  await expect(name).toHaveValue('Keep this draft');
});

test('mobile header, navigation and form footer fit 320–768px widths', async ({ page }) => {
  await signIn(page);
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const button of await page.locator('header button:visible').all()) {
      const box = await button.boundingBox(); expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
  }
  await page.setViewportSize({ width: 320, height: 720 });
  const dialog = await newSupplier(page);
  const save = dialog.getByRole('button', { name: 'บันทึกเข้าระบบ', exact: true });
  const box = await save.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(320); expect(box!.y + box!.height).toBeLessThanOrEqual(720);
  await capture(page, { path: 'test-results/mobile-form-320.png' });
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
});

test('store bulk photos are included and inline replacement preserves a concurrent name edit', async ({ page }) => {
  await signIn(page, 'reviewer');
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: /^เพิ่มร้านน้ำ & เรฟ/ }).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('input[type="file"][accept="image/*"]').nth(3).setInputFiles([
    { name: 'drink1.png', mimeType: 'image/png', buffer: pixel },
    { name: 'drink2.png', mimeType: 'image/png', buffer: pixel },
  ]);
  await expect(dialog.getByPlaceholder('ชื่อเมนูเครื่องดื่ม (เว้นว่างได้)')).toHaveCount(2);
  await page.evaluate(() => {
    const NativeImage = window.Image;
    const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')!;
    window.Image = function () { const img = new NativeImage(); Object.defineProperty(img, 'src', { set(v) { setTimeout(() => descriptor.set!.call(img, v), 1000); } }); return img; } as typeof Image;
  });
  await dialog.locator('input[type="file"][accept="image/*"]').nth(4).setInputFiles({ name: 'replacement.png', mimeType: 'image/png', buffer: pixel });
  await dialog.locator('input[placeholder*="CHAGEE"]').fill('ร้านน้ำทดสอบ');
  await dialog.locator('button:has-text("ชาผลไม้")').first().click();
  await dialog.getByPlaceholder('ชื่อเมนูเครื่องดื่ม (เว้นว่างได้)').first().fill('Name typed during image processing');
  const save = dialog.getByRole('button', { name: 'บันทึกร้านน้ำ', exact: true });
  await expect(save).toBeDisabled(); await expect(save).toBeEnabled();
  const responsePromise = page.waitForResponse(r => r.url().endsWith('/api/drink-stores') && r.request().method() === 'POST');
  await save.click();
  const response = await responsePromise; expect(response.ok()).toBeTruthy();
  const saved = (await response.json()).item;
  expect(saved.drinkItems).toHaveLength(2);
  expect(saved.drinkItems[0].name).toBe('Name typed during image processing');
  await expect(dialog).not.toBeVisible();
});

test('invalid invite cannot show a verified ticket or submit registration', async ({ page }) => {
  await page.goto('/?invite=NONEXISTENT&role=admin');
  await expect(page.getByText('คำเชิญไม่ถูกต้องหรือถูกใช้แล้ว')).toBeVisible();
  await expect(page.getByText('ตรวจสอบคำเชิญแล้ว', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'ยืนยันการสมัคร & เข้าสู่ระบบทันที' })).toBeDisabled();
});

test('collection filters reset country and search, with usable empty state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await signIn(page, 'viewer');
  for (const [tab, search] of [['ซัพพลายเออร์', 'ค้นหาซัพพลายเออร์'], ['ร้านน้ำ', 'ค้นหาร้านน้ำ']]) {
    await navigateTab(page, tab);
    await page.locator('.collection-filters').getByRole('button', { name: 'ไทย', exact: true }).click();
    await page.getByRole('searchbox', { name: search }).fill('no-matching-record-qa');
    await expect(page.getByRole('heading', { name: 'ยังไม่พบรายการที่ตรงกัน' })).toBeVisible();
    await page.getByRole('button', { name: 'แสดงรายการทั้งหมด', exact: true }).click();
    await expect(page.getByRole('searchbox', { name: search })).toHaveValue('');
    await expect(page.locator('.collection-filters').getByRole('button', { name: 'ทั้งหมด', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('heading', { name: 'ยังไม่พบรายการที่ตรงกัน' })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
  await page.locator('.collection-filters').getByRole('button', { name: 'ไทย', exact: true }).click();
  await capture(page, { path: 'test-results/mobile-stores.png' });
});

test('login accepts an actual invitation code instead of a demo code', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'กรอกรหัสคำเชิญ (Invite Code)' }).click();
  await page.getByLabel('รหัสคำเชิญจากผู้ดูแลทีม').fill('QA-INVITE');
  await page.getByRole('button', { name: 'ตรวจสอบรหัสคำเชิญ', exact: true }).click();
  await expect(page.getByText('ตรวจสอบคำเชิญแล้ว', { exact: true })).toBeVisible();
  await expect(page.getByText('QA-INVITE', { exact: true })).toBeVisible();
  await page.getByPlaceholder('เช่น ช่างบีม (วิศวกร) หรือ คุณแอน (จัดซื้อ)').fill('QA New member');
  await page.getByPlaceholder('เช่น beam_engineer หรือ user@vitcha.com').fill('qa-new-member');
  await page.locator('input[autocomplete="new-password"]').fill('qa-new-only-987654');
  await page.locator('input[type="file"]').setInputFiles({ name: 'avatar.png', mimeType: 'image/png', buffer: pixel });
  const submit = page.getByRole('button', { name: 'ยืนยันการสมัคร & เข้าสู่ระบบทันที' });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(submit).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(submit).toHaveCount(0);
});
