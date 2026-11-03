import { test, expect, Page } from '@playwright/test';
import fs from 'node:fs';
test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block', trace: 'off', launchOptions: { args: ['--disable-gpu'] } });
async function signIn(page: Page) {
  await page.route('https://tiles.openfreemap.org/**', route => route.fulfill({ status: 503, body: '' }));
  const response = await page.request.post('/api/login', { data: { idOrEmail: 'qa-admin', pin: 'qa-only-876543' } });
  const { token } = await response.json();
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  await page.goto('/?tab=suppliers');
  await expect(page.locator('header')).toBeVisible();
  return token;
}
async function newSupplier(page: Page) {
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: /^เพิ่มซัพพลายเออร์ โรงงาน/ }).click();
  return page.getByRole('dialog');
}

test('save waits for acknowledgement but closes with success even when team refresh fails', async ({ page }) => {
  await signIn(page);
  const dialog = await newSupplier(page);
  await dialog.locator('input[placeholder*="FEST"]').fill('Confirmed mobile save');
  await dialog.locator('select').first().selectOption({ index: 1 });
  let release!: () => void; const gate = new Promise<void>(resolve => { release = resolve; });
  let writing = false, writes = 0;
  await page.route('**/api/data?*', route => writing ? route.fulfill({ status: 503, json: { error: 'Team refresh unavailable' } }) : route.continue());
  await page.route('**/api/suppliers', async route => {
    writing = true; writes++;
    const response = await route.fetch(); await gate; await route.fulfill({ response });
  });
  await dialog.getByRole('button', { name: 'บันทึกเข้าระบบ', exact: true }).click();
  await expect(dialog.getByRole('button', { name: /รอเซิร์ฟเวอร์ยืนยัน/ })).toBeDisabled();
  await expect(page.getByTestId('success-feedback')).toHaveCount(0);
  await expect(page.getByText('เซิร์ฟเวอร์อาจกำลังเริ่มทำงาน', { exact: false })).toHaveCount(0);
  release();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('success-feedback')).toContainText('บันทึกซัพพลายเออร์เรียบร้อยแล้ว');
  await expect(page.getByTestId('success-feedback')).toBeInViewport();
  await expect(page.getByText('Confirmed mobile save', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('alert')).toHaveCount(0);
  expect(writes).toBe(1);
  await page.screenshot({ path: 'test-results/save-confirmed-mobile.png', animations: 'disabled' });
});

test('editing sends editable fields without history and keeps the draft on rejected save', async ({ page }) => {
  const token = await signIn(page); const id = `feedback-${Date.now()}`;
  const record = { id, name: 'Feedback edit fixture', category: 'เครื่องชงชา/กาแฟ', rating: 4, quickTags: [], photos: { storefrontAndAtmosphere: [], contactCards: [] }, catalogItems: [], location: { lat: 13, lng: 100 }, status: 'scouted' };
  expect((await page.request.post('/api/suppliers', { headers: { Authorization: `Bearer ${token}` }, data: record })).ok()).toBeTruthy();
  await page.goto(`/?view=${id}&type=supplier`);
  await page.getByTitle('แก้ไขข้อมูลรายการนี้ (Admin / Editor)').click();
  const dialog = page.getByRole('dialog').last();
  await dialog.locator('input[placeholder*="FEST"]').fill('Keep unsaved edit');
  let body: any;
  await page.route('**/api/suppliers', route => { body = route.request().postDataJSON(); return route.fulfill({ status: 503, json: { error: 'QA save unavailable' } }); });
  await dialog.getByRole('button', { name: /บันทึกการแก้ไข/ }).click();
  await expect(page.getByRole('alert')).toContainText('QA save unavailable');
  await expect(dialog.locator('input[placeholder*="FEST"]')).toHaveValue('Keep unsaved edit');
  await expect(page.getByTestId('success-feedback')).toHaveCount(0);
  expect(body.id).toBe(id); expect(body.revision).toBe(1);
  expect(body.history).toBeUndefined(); expect(body.creator).toBeUndefined(); expect(body.reviewerNotes).toBeUndefined();
});

test('photo upload confirms the completed batch and still asks the user to save the record', async ({ page }) => {
  await signIn(page); const dialog = await newSupplier(page);
  let release!: () => void; const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/upload', async route => { await gate; await route.continue(); });
  const input = dialog.locator('input[type=file][accept="image/*"]').first();
  const bytes = fs.readFileSync('tests/fixtures/photo.png');
  await input.setInputFiles([{ name: 'one.png', mimeType: 'image/png', buffer: bytes }, { name: 'two.png', mimeType: 'image/png', buffer: bytes }]);
  await expect(dialog.getByRole('button', { name: 'กำลังบีบอัดรูปภาพ...' })).toBeDisabled();
  await expect(page.getByTestId('success-feedback')).toHaveCount(0);
  release();
  await expect(page.getByTestId('success-feedback')).toContainText('อัปโหลดรูปเรียบร้อยแล้ว 2 รูป');
  await expect(page.getByTestId('success-feedback')).toContainText('กดบันทึก');
  await expect(dialog.getByText('อัปโหลดรูปแล้ว 2 รูป · กดบันทึกเพื่อเก็บกับรายการ')).toBeVisible();
  await expect(dialog).toBeVisible();
  await page.screenshot({ path: 'test-results/upload-confirmed-mobile.png', animations: 'disabled' });
});

test('a rejected location save preserves the open form and its draft', async ({ page }) => {
  await signIn(page);
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: /เพิ่มสถานที่ \/ ทำเล/ }).click();
  const dialog = page.getByRole('dialog');
  const name = dialog.locator('input[placeholder*="CentralWorld"]');
  await name.fill('Keep location draft');
  await dialog.locator('input[placeholder*="ตัวอย่าง 1:"]').fill('Ground floor');
  await dialog.locator('select').first().selectOption({ index: 1 });
  await page.route('**/api/locations', route => route.fulfill({ status: 503, json: { error: 'QA location save unavailable' } }));
  await dialog.getByRole('button', { name: 'บันทึกทำเล', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('QA location save unavailable');
  await expect(name).toHaveValue('Keep location draft');
  await expect(dialog.getByRole('button', { name: 'บันทึกทำเล', exact: true })).toBeEnabled();
  await expect(page.getByTestId('success-feedback')).toHaveCount(0);
});

test('temporary team refresh failure preserves the form and shows only a compact reconnect status', async ({ page }) => {
  await signIn(page); const dialog = await newSupplier(page);
  await dialog.locator('input[placeholder*="FEST"]').fill('Draft stays here');
  await page.clock.install();
  await page.route('**/api/data?*', route => route.fulfill({ status: 503, json: { error: 'Transient offline' } }));
  for (let i = 0; i < 2; i++) {
    const failed = page.waitForResponse(r => r.url().includes('/api/data?') && r.status() === 503);
    await page.clock.runFor(3600); await failed;
  }
  const status = page.getByRole('status', { name: 'สถานะการเชื่อมต่อ' });
  await expect(status).toBeVisible();
  expect((await status.boundingBox())!.height).toBeLessThan(75);
  await expect(dialog.locator('input[placeholder*="FEST"]')).toHaveValue('Draft stays here');
  await expect(page.getByText(/เซิร์ฟเวอร์อาจกำลังเริ่มทำงาน/)).toHaveCount(0);
});

test('read notifications do not revert during slow sync or reload and can retry after an error', async ({ page }) => {
  await signIn(page);
  await page.getByTitle('การแจ้งเตือนความเคลื่อนไหว').click();
  const sheet = page.getByRole('dialog', { name: 'การแจ้งเตือน' });
  let release!: () => void; const gate = new Promise<void>(resolve => { release = resolve; });
  let fail = true;
  await page.route('**/api/notifications/read', async route => {
    await gate;
    if (fail) await route.fulfill({ status: 503, json: { error: 'Delayed read sync' } });
    else await route.continue();
  });
  await sheet.getByRole('button', { name: 'อ่านแล้ว', exact: true }).first().click();
  const unreadAfterClick = await sheet.getByRole('button', { name: 'อ่านแล้ว', exact: true }).count();
  await expect(sheet.getByRole('status')).toContainText('กำลังยืนยันกับเซิร์ฟเวอร์');
  // A normal polling response still says unread until the held POST commits.
  const poll = page.waitForResponse(r => r.url().includes('/api/data?'));
  await page.evaluate(() => window.dispatchEvent(new Event('focus'))); await poll;
  await expect(sheet.getByRole('button', { name: 'อ่านแล้ว', exact: true })).toHaveCount(unreadAfterClick);
  release();
  await expect(sheet.getByRole('button', { name: 'ลองส่งสถานะอีกครั้ง' })).toBeVisible();
  await page.reload();
  await page.getByTitle('การแจ้งเตือนความเคลื่อนไหว').click();
  await expect(sheet.getByRole('button', { name: 'อ่านแล้ว', exact: true })).toHaveCount(unreadAfterClick);
  await expect(sheet.getByRole('button', { name: 'ลองส่งสถานะอีกครั้ง' })).toBeVisible();
  fail = false;
  const confirmed = page.waitForResponse(r => r.url().endsWith('/api/notifications/read') && r.ok());
  await sheet.getByRole('button', { name: 'ลองส่งสถานะอีกครั้ง' }).click(); await confirmed;
  await page.reload(); await page.getByTitle('การแจ้งเตือนความเคลื่อนไหว').click();
  await expect(sheet.getByRole('button', { name: 'อ่านแล้ว', exact: true })).toHaveCount(unreadAfterClick);
});

test('retrying an edit after the server reply is lost confirms the same save without duplicate history', async ({ page }) => {
  const token = await signIn(page); const id = `lost-save-${Date.now()}`;
  const record = { id, name: 'Lost response fixture', category: 'เครื่องชงชา/กาแฟ', rating: 0, quickTags: [], photos: { storefrontAndAtmosphere: [], contactCards: [] }, catalogItems: [], location: { lat: 23, lng: 113 } };
  expect((await page.request.post('/api/suppliers', { headers: { Authorization: `Bearer ${token}` }, data: record })).ok()).toBeTruthy();
  await page.goto(`/?view=${id}&type=supplier`);
  await page.getByTitle('แก้ไขข้อมูลรายการนี้ (Admin / Editor)').click();
  const dialog = page.getByRole('dialog').last();
  await dialog.locator('input[placeholder*="FEST"]').fill('Confirmed after retry');
  let saved: any; let writes = 0;
  let replyLost!: () => void; const firstCommitted = new Promise<void>(resolve => { replyLost = resolve; });
  await page.route('**/api/suppliers', async route => {
    writes++;
    const response = await route.fetch();
    expect(response.ok()).toBeTruthy();
    const item = (await response.json()).item;
    if (writes === 1) { saved = item; await route.abort('failed'); replyLost(); }
    else { expect(item).toEqual(saved); await route.fulfill({ response }); }
  });
  await dialog.getByRole('button', { name: /บันทึกการแก้ไข/ }).click();
  await firstCommitted;
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(dialog.locator('input[placeholder*="FEST"]')).toHaveValue('Confirmed after retry');
  await expect(page.getByTestId('success-feedback')).toHaveCount(0);
  await dialog.getByRole('button', { name: /บันทึกการแก้ไข/ }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('success-feedback')).toContainText('บันทึกการแก้ไขเรียบร้อยแล้ว');
  expect(writes).toBe(2);
});
