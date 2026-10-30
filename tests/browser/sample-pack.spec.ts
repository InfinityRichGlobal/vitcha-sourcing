import { test, expect, Page } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp } from '../../server/app.js';

test.use({ viewport: { width: 390, height: 844 }, launchOptions: { args: ['--disable-gpu'] } });
let server: any, dir: string, base: string, token: string;
test.beforeEach(async ({ page }) => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-pack-browser-'));
  const defaults = { users: [{ id: 'user-ice', emailOrId: 'ice', name: 'QA owner', alias: 'QA', role: 'admin', pin: 'qa-only-876543' }], suppliers: [], drinkStores: [], locations: [], leadLabItems: [], franchiseStores: [], invites: [], notifications: [] };
  server = createApp({ dataDir: dir, defaults }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  const login = await page.request.post(base + '/api/login', { data: { idOrEmail: 'ice', pin: 'qa-only-876543' } });
  token = (await login.json()).token;
  await page.route('**/api/**', async route => {
    const url = new URL(route.request().url());
    await route.fulfill({ response: await route.fetch({ url: base + url.pathname + url.search }) });
  });
  await page.route('https://tiles.openfreemap.org/**', r => r.abort());
  await page.addInitScript(t => sessionStorage.setItem('vitcha_session_token', t), token);
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
});
test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'wait' });
  await page.close();
  await new Promise<void>(resolve => server.close(resolve));
  fs.rmSync(dir, { recursive: true, force: true });
});
async function load(page: Page) {
  await page.getByRole('button', { name: /แพลตฟอร์ม/ }).click();
  await page.getByRole('button', { name: /โหลดข้อมูล Mockup เต็มระบบ/ }).click();
}
test('empty dashboard shows zero; loading reads back 42 records and repeat click adds none', async ({ page }) => {
  await expect(page.getByRole('button').filter({ hasText: 'LEAD LAB' }).first()).toContainText('0');
  let bytes = 0;
  await page.route('**/api/system/sample-pack', async route => {
    bytes = route.request().postData()!.length;
    const response = await route.fetch({ url: base + '/api/system/sample-pack' });
    await new Promise(resolve => setTimeout(resolve, 700));
    await route.fulfill({ response });
  });
  await load(page);
  await expect(page.getByTestId('mockup-result')).toContainText('กำลัง');
  await expect(page.getByTestId('mockup-result')).toContainText('เพิ่ม 42 รายการ');
  expect(bytes).toBeLessThan(500);
  await expect(page.getByTestId('mockup-result')).toContainText('สูตร R&D 8');
  await page.reload();
  await load(page);
  await expect(page.getByTestId('mockup-result')).toContainText('เพิ่ม 0 รายการ');
  await expect(page.getByTestId('mockup-result')).toContainText('ข้ามรายการเดิม 42');
  await page.screenshot({ path: 'test-results/sample-pack-mobile.png' });
});
test('lost acknowledgement is recovered from server receipt', async ({ page }) => {
  await page.route('**/api/system/sample-pack', async route => {
    await route.fetch({ url: base + '/api/system/sample-pack' });
    await route.abort('failed');
  });
  await load(page);
  await expect(page.getByTestId('mockup-result')).toContainText('เพิ่ม 42 รายการ');
});
test('refresh reports failure and recovers; same-frame touch gesture refreshes data', async ({ page }) => {
  const failing = (route: any) => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"offline"}' });
  await page.route('**/api/data**', failing);
  await page.getByRole('button', { name: 'รีเฟรชข้อมูล', exact: true }).click();
  await expect(page.getByTestId('refresh-controls')).toContainText('รีเฟรชไม่สำเร็จ');
  await page.unroute('**/api/data**', failing);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    const target = document.querySelector('main')!;
    const touch = (y: number) => new Touch({ identifier: 1, target, clientX: 100, clientY: y });
    target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [touch(100)] }));
    target.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, cancelable: true, touches: [touch(240)] }));
    target.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [] }));
  });
  await expect(page.getByTestId('refresh-controls')).toContainText('อัปเดตข้อมูลสำเร็จ');
});
