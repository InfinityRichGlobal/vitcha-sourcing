import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp } from '../../server/app.js';

test.use({
  viewport: { width: 1440, height: 1000 },
  serviceWorkers: 'block',
  launchOptions: { args: ['--disable-gpu'] },
});

const password = 'qa-only-876543';
const supplier = (country: 'TH' | 'CN', name: string, catalogItems: any[]) => ({
  id: `currency-${country.toLowerCase()}`,
  type: 'supplier', country, name, category: 'Machine', rating: 4,
  quickTags: [], photos: { storefrontAndAtmosphere: [], contactCards: [] },
  catalogItems, location: { lat: 0, lng: 0 }, status: 'scouted', revision: 1,
  creator: { id: 'user-ice', name: 'QA', alias: 'QA', avatar: '', timestamp: '2026-11-16T00:00:00Z' },
  reviewerNotes: [], history: [], updatedAt: '2026-11-16T00:00:00Z',
});

let server: any;
let dir: string;

async function start(page: Page, suppliers: any[] = []) {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-currency-browser-'));
  const defaults = {
    users: [{ id: 'user-ice', emailOrId: 'ice', name: 'QA', alias: 'QA', role: 'admin', pin: password, avatar: '' }],
    suppliers, drinkStores: [], locations: [], leadLabItems: [], franchiseStores: [],
    invites: [], notifications: [], categories: ['Machine'],
  };
  server = createApp({ dataDir: dir, defaults }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const login = await page.request.post(`${base}/api/login`, { data: { idOrEmail: 'ice', pin: password } });
  expect(login.ok()).toBeTruthy();
  const { token } = await login.json();
  await page.route('**/api/**', async route => {
    const url = new URL(route.request().url());
    await route.fulfill({ response: await route.fetch({ url: base + url.pathname + url.search }) });
  });
  await page.route('https://tiles.openfreemap.org/**', route => route.abort());
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
}

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'wait' });
  await page.close();
  if (server) await new Promise<void>(resolve => server.close(resolve));
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
  server = undefined;
});

async function navigate(page: Page, name: string) {
  const tab = page.getByRole('navigation').getByRole('button', { name: new RegExp(name) });
  if (await tab.isVisible().catch(() => false)) {
    await tab.click();
    return;
  }
  await page.getByRole('button', { name: /แพลตฟอร์ม/ }).click();
  await page.locator('[data-no-pull-refresh]').getByRole('button', { name: new RegExp(name) }).first().click();
}

function saveResponse(page: Page) {
  return page.waitForResponse(response => new URL(response.url()).pathname === '/api/suppliers' && response.request().method() === 'POST');
}

test('Thai supplier form saves baht amounts, including zero, without yuan conversion', async ({ page }) => {
  await start(page);
  await navigate(page, 'ซัพพลายเออร์');
  await page.getByTitle('เพิ่มข้อมูลใหม่ (ซัพพลายเออร์ หรือ ร้านน้ำ & เรฟ)').click();
  await page.getByRole('button', { name: 'เพิ่มซัพพลายเออร์ โรงงาน · อุปกรณ์ · วัตถุดิบชา & บรรจุภัณฑ์' }).click();
  const form = page.getByRole('dialog', { name: 'บันทึกรายการ' });
  await form.getByRole('button', { name: 'ค้นคว้าในไทย (Thailand)' }).click();
  await form.locator('input[placeholder*="FEST"]').fill('Thai supplier baht');
  await form.locator('select').first().selectOption({ label: 'Machine' });
  await form.getByRole('button', { name: '+ เพิ่มว่าง', exact: true }).click();
  await form.getByPlaceholder('ชื่อสินค้า/อุปกรณ์/ชา (ไม่พิมพ์ก็ได้)').fill('Thai machine');
  await form.getByLabel('ราคา (บาท / THB)', { exact: true }).fill('1250.75');
  await form.getByRole('button', { name: '+ เพิ่มว่าง', exact: true }).click();
  await form.getByPlaceholder('ชื่อสินค้า/อุปกรณ์/ชา (ไม่พิมพ์ก็ได้)').nth(1).fill('Free sample');
  await form.getByLabel('ราคา (บาท / THB)', { exact: true }).nth(1).fill('0');
  await expect(form.getByPlaceholder('ราคา ¥')).toHaveCount(0);
  await expect(form).not.toContainText('≈฿');
  const savedResponse = saveResponse(page);
  await form.getByRole('button', { name: 'บันทึกเข้าระบบ', exact: true }).click();
  const response = await savedResponse;
  expect(response.ok()).toBeTruthy();
  const submitted = response.request().postDataJSON();
  const saved = (await response.json()).item;
  for (const record of [submitted, saved]) {
    expect(record.country).toBe('TH');
    expect(record.catalogItems.map((item: any) => item.priceThb)).toEqual([1250.75, 0]);
    expect(record.catalogItems.every((item: any) => item.priceRmb == null)).toBeTruthy();
  }
  await expect(form).not.toBeVisible();
  await page.reload();
  await navigate(page, 'ซัพพลายเออร์');
  const card = page.getByRole('article', { name: 'Thai supplier baht', exact: true });
  await expect(card).toContainText('฿1,250.75');
  await expect(card).not.toContainText(/¥|≈/);
  await card.getByRole('heading', { name: 'Thai supplier baht', exact: true }).click();
  const detail = page.locator('div.fixed.inset-0').filter({ has: page.getByRole('heading', { name: 'Thai supplier baht', exact: true }) });
  await expect(detail).toContainText('฿1,250.75');
  await expect(detail).toContainText('฿0');
  await expect(detail).not.toContainText(/¥|≈/);
});

test('legacy Thai yuan field is read and edited as the original baht amount across supplier and product views', async ({ page }) => {
  const legacy = supplier('TH', 'Legacy Thai supplier', [
    { id: 'legacy-machine', name: 'Legacy Thai machine', photo: '', priceRmb: 1234.5 },
    { id: 'dual-price', name: 'Thai local quote', photo: '', priceRmb: 250, priceThb: 2000 },
    { id: 'clear-price', name: 'Clear this Thai quote', photo: '', priceRmb: 70 },
  ]);
  await start(page, [legacy]);
  await navigate(page, 'ซัพพลายเออร์');
  const card = page.getByRole('article', { name: legacy.name, exact: true });
  await expect(card).toContainText('฿1,234.5');
  await expect(card).not.toContainText(/¥|≈/);
  await card.getByRole('heading', { name: legacy.name, exact: true }).click();
  const detail = page.locator('div.fixed.inset-0').filter({ has: page.getByRole('heading', { name: legacy.name, exact: true }) });
  await expect(detail).toContainText('฿1,234.5');
  await expect(detail).toContainText('฿2,000');
  await expect(detail).not.toContainText(/¥|≈/);
  await detail.getByTitle('แชร์ลิงก์เข้า LINE').click();
  const share = page.locator('div.fixed.inset-0').filter({ has: page.getByRole('heading', { name: '1-Click Share เข้า LINE', exact: true }) });
  const preview = share.locator('textarea[readonly]');
  await expect(preview).toHaveValue(/THAILAND/);
  await expect(preview).toHaveValue(/฿1,234\.5 บาท \(THB\)/);
  await expect(preview).toHaveValue(/฿2,000 บาท \(THB\)/);
  await expect(preview).not.toHaveValue(/¥|≈/);
  await share.getByRole('button').first().click();
  await detail.getByTitle('ปิดหน้าต่าง').click();

  await navigate(page, 'รายการสินค้า');
  const workspace = page.getByTestId('product-workspace');
  const product = workspace.getByRole('article').filter({ has: page.getByRole('button', { name: 'Legacy Thai machine', exact: true }) });
  await expect(product).toContainText('฿1,234.5');
  await expect(product).not.toContainText(/¥|≈/);
  const localQuote = workspace.getByRole('article').filter({ has: page.getByRole('button', { name: 'Thai local quote', exact: true }) });
  await expect(localQuote).toContainText('฿2,000');

  await navigate(page, 'ซัพพลายเออร์');
  await card.getByTitle('แก้ไขข้อมูลซัพพลายเออร์นี้').click();
  const form = page.getByRole('dialog', { name: 'บันทึกรายการ' });
  await expect(form.getByLabel('ราคา (บาท / THB)', { exact: true }).first()).toHaveValue('1234.5');
  await expect(form.getByLabel('ราคา (บาท / THB)', { exact: true }).nth(1)).toHaveValue('2000');
  await expect(form.getByLabel('ราคา (บาท / THB)', { exact: true }).nth(2)).toHaveValue('70');
  await form.getByLabel('ราคา (บาท / THB)', { exact: true }).nth(2).clear();
  const savedResponse = saveResponse(page);
  await form.getByRole('button', { name: /บันทึกการแก้ไข/ }).click();
  const response = await savedResponse;
  expect(response.ok()).toBeTruthy();
  const saved = (await response.json()).item;
  expect(saved.catalogItems.map((item: any) => item.priceThb)).toEqual([1234.5, 2000, undefined]);
  expect(saved.catalogItems.every((item: any) => item.priceRmb == null)).toBeTruthy();
  await expect(form).not.toBeVisible();
  await page.reload();
  await navigate(page, 'ซัพพลายเออร์');
  await expect(card).toContainText('฿1,234.5');
  await expect(card).not.toContainText(/¥|≈/);
});

test('Chinese suppliers retain yuan pricing and a separate approximate baht conversion', async ({ page }) => {
  const chinese = supplier('CN', 'Chinese supplier', [
    { id: 'cn-machine', name: 'Chinese machine', photo: '', priceRmb: 88, priceThb: 440 },
  ]);
  await start(page, [chinese]);
  await navigate(page, 'ซัพพลายเออร์');
  const card = page.getByRole('article', { name: chinese.name, exact: true });
  await expect(card).toContainText('¥88');
  await expect(card).toContainText('≈');
  await card.getByTitle('แก้ไขข้อมูลซัพพลายเออร์นี้').click();
  const form = page.getByRole('dialog', { name: 'บันทึกรายการ' });
  await expect(form.getByLabel('ราคา (หยวน / CNY)', { exact: true })).toHaveValue('88');
  await expect(form.getByPlaceholder('ราคา ¥')).toBeVisible();
  await expect(form).toContainText('≈฿');
  await form.getByRole('button', { name: 'ค้นคว้าในไทย (Thailand)' }).click();
  await expect(form.getByLabel('ราคา (บาท / THB)', { exact: true })).toHaveValue('440');
  await expect(form).not.toContainText('≈฿');
  await form.getByRole('button', { name: 'ค้นคว้าในจีน (China)' }).click();
  await expect(form.getByLabel('ราคา (หยวน / CNY)', { exact: true })).toHaveValue('88');
  const untouchedResponse = saveResponse(page);
  await form.getByRole('button', { name: /บันทึกการแก้ไข/ }).click();
  const untouched = await untouchedResponse;
  expect(untouched.ok()).toBeTruthy();
  const preserved = (await untouched.json()).item;
  expect(preserved.country).toBe('CN');
  expect(preserved.catalogItems[0].priceRmb).toBe(88);
  expect(preserved.catalogItems[0].priceThb).toBe(440);
  await expect(form).not.toBeVisible();
  await card.getByTitle('แก้ไขข้อมูลซัพพลายเออร์นี้').click();
  await form.getByLabel('ราคา (หยวน / CNY)', { exact: true }).fill('90');
  const savedResponse = saveResponse(page);
  await form.getByRole('button', { name: /บันทึกการแก้ไข/ }).click();
  const response = await savedResponse;
  expect(response.ok()).toBeTruthy();
  const saved = (await response.json()).item;
  expect(saved.country).toBe('CN');
  expect(saved.catalogItems[0].priceRmb).toBe(90);
  await expect(form).not.toBeVisible();
  await page.reload();
  await navigate(page, 'ซัพพลายเออร์');
  await expect(card).toContainText('¥90');
  await expect(card).toContainText('≈');
});
