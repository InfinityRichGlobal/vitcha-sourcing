import { test, expect, Page } from '@playwright/test';
import fs from 'node:fs';
test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block', trace: 'off', launchOptions: { args: ['--disable-gpu'] } });
const bytes = fs.readFileSync('tests/fixtures/photo.png');
const files = (count: number) => Array.from({ length: count }, (_, i) => ({ name: `photo-${i + 1}.png`, mimeType: 'image/png', buffer: bytes }));
async function openForm(page: Page, kind = 'supplier') {
  await page.route('https://tiles.openfreemap.org/**', route => route.fulfill({ status: 503, body: '' }));
  await page.route('**/uploads/retry-test-*', route => route.fulfill({ contentType: 'image/png', body: bytes }));
  const auth = await page.request.post('/api/login', { data: { idOrEmail: 'qa-admin', pin: 'qa-only-876543' } });
  const { token } = await auth.json();
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  await page.goto('/?tab=suppliers');
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: kind === 'supplier' ? /^เพิ่มซัพพลายเออร์ โรงงาน/ : kind === 'store' ? /เพิ่มร้านน้ำ/ : /เพิ่มสถานที่ \/ ทำเล/ }).click();
  return page.getByRole('dialog');
}
test('90 photos retain 15 failures, retry one or all repeatedly, and save all 90 exactly once', async ({ page }) => {
  test.setTimeout(120000);
  const dialog = await openForm(page);
  await dialog.locator('input[placeholder*="FEST"]').fill('Retry ninety photos');
  await dialog.locator('select').first().selectOption({ index: 1 });
  let requests = 0, active = 0, maximum = 0;
  await page.route('**/api/upload', async route => {
    expect(route.request().postDataJSON().mimeType).toBe('image/png');
    expect(route.request().postDataJSON().base64).toBe(`data:image/png;base64,${bytes.toString('base64')}`);
    const number = ++requests; active++; maximum = Math.max(maximum, active);
    // Keep requests overlapping so a fan-out bug is observable.
    await new Promise(resolve => setTimeout(resolve, 50));
    active--;
    if ((number <= 90 && number % 6 === 0) || number === 92) {
      await route.fulfill({ status: 503, json: { error: 'Temporary network failure' } });
    } else await route.fulfill({ json: { url: `/uploads/retry-test-${number}.jpg` } });
  });
  const grid = dialog.getByTestId('photo-upload-grid').first();
  await grid.locator('input[type=file]').setInputFiles(files(90));
  await expect(grid.getByTestId('photo-upload-item')).toHaveCount(90);
  await expect(grid.locator('[data-status=error]')).toHaveCount(15, { timeout: 60000 });
  await expect(grid.locator('[data-status=done]')).toHaveCount(75);
  expect(requests).toBe(90); expect(maximum).toBeLessThanOrEqual(6); expect(maximum).toBeGreaterThan(1);
  await expect(dialog.getByRole('button', { name: 'ยังมีรูปอัปโหลดไม่ครบ' })).toBeDisabled();
  await grid.getByRole('button', { name: /^ลองอัปโหลดใหม่ / }).first().click();
  await expect(grid.locator('[data-status=done]')).toHaveCount(76);
  await expect(grid.locator('[data-status=error]')).toHaveCount(14);
  // An ordinary parent form update must not clear previous failures.
  await dialog.locator('input[placeholder*="FEST"]').fill('Retry ninety photos ready');
  await grid.getByRole('button', { name: 'ลองใหม่ทั้งหมด (14 รูป)' }).click();
  await expect(grid.locator('[data-status=done]')).toHaveCount(89);
  await expect(grid.locator('[data-status=error]')).toHaveCount(1);
  await grid.getByRole('button', { name: 'ลองใหม่ทั้งหมด (1 รูป)' }).click();
  await expect(grid.locator('[data-status=done]')).toHaveCount(90);
  await expect(grid.locator('[data-status=error]')).toHaveCount(0);
  expect(requests).toBe(106);
  let saved: any;
  await page.route('**/api/suppliers', async route => { saved = route.request().postDataJSON(); await route.continue(); });
  await dialog.getByRole('button', { name: 'บันทึกเข้าระบบ', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const urls = saved.photos.storefrontAndAtmosphere;
  expect(urls).toHaveLength(90); expect(new Set(urls).size).toBe(90);
  expect(urls.every((url: string) => url.includes('/uploads/retry-test-'))).toBeTruthy();
});

test('failed originals survive another selection; deleting them explicitly unblocks save', async ({ page }) => {
  const dialog = await openForm(page);
  let fail = true, requests = 0;
  await page.route('**/api/upload', route => {
    requests++;
    return fail ? route.abort('connectionreset') : route.fulfill({ json: { url: '/uploads/retry-test-good.jpg' } });
  });
  const grid = dialog.getByTestId('photo-upload-grid').first();
  await grid.locator('input[type=file]').setInputFiles(files(2));
  await expect(grid.locator('[data-status=error]')).toHaveCount(2);
  const originals = await grid.locator('[data-status=error] img').evaluateAll(images => images.map(image => (image as HTMLImageElement).src));
  fail = false;
  await grid.locator('input[type=file]').setInputFiles({ name: 'later.png', mimeType: 'image/png', buffer: bytes });
  await expect(grid.locator('[data-status=done]')).toHaveCount(1);
  await expect(grid.locator('[data-status=error]')).toHaveCount(2);
  expect(await grid.locator('[data-status=error] img').evaluateAll(images => images.map(image => (image as HTMLImageElement).src))).toEqual(originals);
  await grid.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'test-results/photo-retry-mobile.png' });
  await grid.getByRole('button', { name: 'ลบรูป photo-1.png', exact: true }).click();
  await grid.getByRole('button', { name: 'ลบรูป photo-2.png', exact: true }).click();
  await expect(grid.getByTestId('photo-upload-item')).toHaveCount(1);
  await expect(dialog.getByRole('button', { name: 'บันทึกเข้าระบบ', exact: true })).toBeEnabled();
  expect(requests).toBe(3);
});

test('offline selections wait, canceled uploads never reappear, and independent photo groups block saving', async ({ page }) => {
  const dialog = await openForm(page, 'location');
  const grids = dialog.getByTestId('photo-upload-grid');
  let requests = 0;
  let release!: () => void; const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/upload', async route => {
    const number = ++requests;
    if (number === 1) { await gate; await route.fulfill({ json: { url: '/uploads/retry-test-canceled.jpg' } }).catch(() => {}); }
    else await route.fulfill({ status: 503, json: { error: 'Still unavailable' } });
  });
  await expect(grids.nth(0)).toBeVisible();
  await page.context().setOffline(true);
  await grids.nth(0).locator('input[type=file]').setInputFiles(files(4));
  await expect(grids.nth(0).getByText('รออินเทอร์เน็ตกลับมา · เหลือ 4 รูป')).toBeVisible();
  expect(requests).toBe(0);
  await grids.nth(0).getByRole('button', { name: 'ลบรูป photo-4.png', exact: true }).click();
  await page.context().setOffline(false);
  await expect(grids.nth(0).locator('[data-status=error]')).toHaveCount(2);
  await grids.nth(0).locator('[data-status=uploading]').getByRole('button', { name: /^ลบรูป / }).click();
  release();
  await grids.nth(1).locator('input[type=file]').setInputFiles({ name: 'other.png', mimeType: 'image/png', buffer: bytes });
  await expect(grids.nth(1).locator('[data-status=error]')).toHaveCount(1);
  const removeButtons = grids.nth(0).getByRole('button', { name: /^ลบรูป / });
  while (await removeButtons.count()) await removeButtons.first().click();
  await expect(dialog.getByRole('button', { name: 'บันทึกทำเล', exact: true })).toBeDisabled();
  await grids.nth(1).getByRole('button', { name: 'ลบรูป other.png', exact: true }).click();
  await expect(dialog.getByRole('button', { name: 'บันทึกทำเล', exact: true })).toBeEnabled();
  await expect(grids.nth(0).getByTestId('photo-upload-item')).toHaveCount(0);
  expect(requests).toBe(4);
});

test('large original image uses chunks and downloads with every original byte intact', async ({ page }) => {
  const dialog = await openForm(page);
  // A valid PNG with trailing application data also detects accidental re-encoding:
  // decoding and re-saving the bitmap would discard those original bytes.
  const original = Buffer.concat([bytes, Buffer.alloc(9 * 1024 * 1024, 71)]);
  const completed = page.waitForResponse(r => /\/api\/uploads\/[^/]+\/complete$/.test(r.url()));
  const grid = dialog.getByTestId('photo-upload-grid').first();
  await grid.locator('input[type=file]').setInputFiles({ name: 'original-with-data.png', mimeType: 'image/png', buffer: original });
  const response = await completed; expect(response.ok()).toBeTruthy();
  const { url } = await response.json();
  await expect(grid.locator('[data-status=done]')).toHaveCount(1);
  const download = await page.request.get(url);
  expect(download.ok()).toBeTruthy(); expect(download.headers()['content-type']).toContain('image/png');
  expect((await download.body()).equals(original)).toBeTruthy();
});

for (const kind of ['supplier', 'store']) test(`${kind} item photos keep failed originals, retry a batch and save acknowledged URLs`, async ({ page }) => {
  const dialog = await openForm(page, kind);
  await dialog.locator(kind === 'supplier' ? 'input[placeholder*="FEST"]' : 'input[placeholder*="CHAGEE"]').fill('Original item photos');
  if (kind === 'supplier') await dialog.locator('select').first().selectOption({ index: 1 });
  else await dialog.getByRole('button', { name: /ชาผลไม้/ }).first().click();
  let fail = true, requests = 0, active = 0, maximum = 0;
  await page.route('**/api/upload', async route => {
    expect(route.request().postDataJSON().base64).toBe(`data:image/png;base64,${bytes.toString('base64')}`);
    const n = ++requests; active++; maximum = Math.max(maximum, active);
    await new Promise(resolve => setTimeout(resolve, 60)); active--;
    await route.fulfill(fail && n % 3 === 0 ? { status: 503, json: { error: 'QA interrupted original' } } : { json: { url: `/uploads/retry-test-item-${n}.png` } });
  });
  const batch = dialog.locator('input[type=file][multiple][accept="image/*"]').last();
  await batch.setInputFiles(files(12));
  await expect(dialog.getByRole('button', { name: 'ลองอัปโหลดใหม่', exact: true })).toHaveCount(4);
  const submit = dialog.getByRole('button', { name: kind === 'supplier' ? /^(ยังมีรูปอัปโหลดไม่ครบ|บันทึกเข้าระบบ)$/ : 'บันทึกร้านน้ำ', exact: true }); await expect(submit).toBeDisabled();
  expect(maximum).toBeGreaterThan(1); expect(maximum).toBeLessThanOrEqual(6);
  await dialog.getByRole('button', { name: 'ลองอัปโหลดใหม่', exact: true }).first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: `test-results/${kind}-original-retry-mobile.png` });
  fail = false; await dialog.getByRole('button', { name: 'ลองใหม่ทั้งหมด (4 รูป)' }).click();
  await expect(submit).toBeEnabled();
  let saved: any;
  await page.route(kind === 'supplier' ? '**/api/suppliers' : '**/api/drink-stores', async route => { saved = route.request().postDataJSON(); await route.continue(); });
  await submit.click(); await expect(dialog).toHaveCount(0);
  const items = kind === 'supplier' ? saved.catalogItems : saved.drinkItems;
  expect(items).toHaveLength(12); expect(new Set(items.map((item: any) => item.photo)).size).toBe(12);
  expect(items.every((item: any) => item.photo.includes('/uploads/retry-test-item-'))).toBeTruthy();
});
