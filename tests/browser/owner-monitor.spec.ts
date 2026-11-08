import { test, expect, Page } from '@playwright/test';
import { capture } from './capture';
test.use({ launchOptions: { args: ['--disable-gpu'] } });
async function login(page: Page, id = 'supericez') {
  const response = await page.request.post('/api/login', { data: { idOrEmail: id, pin: 'qa-only-876543' } });
  expect(response.ok()).toBeTruthy(); const { token } = await response.json();
  await page.addInitScript(t => sessionStorage.setItem('vitcha_session_token', t), token);
  return token;
}
test.beforeEach(async ({ page }) => { await page.route('https://tiles.openfreemap.org/**', route => route.abort()); });

test('owner can open Monitor from menu; honest empty states and cached refresh', async ({ page }) => {
  await login(page); await page.goto('/?tab=owner_monitor');
  await expect(page.getByRole('heading', { name: 'Monitor', exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Render Monitor' })).toContainText('รอเชื่อมต่อ');
  await expect(page.getByRole('region', { name: 'Supabase Monitor' })).toContainText('ยังไม่มียอดที่ยืนยันได้');
  await page.getByRole('button', { name: 'ตรวจข้อมูลล่าสุด' }).click();
  await expect(page.getByTestId('owner-monitor')).toContainText('กำลังใช้ผลที่เก็บไว้');
  await page.getByRole('button', { name: 'กลับหน้าหลัก', exact: true }).click();
  await page.getByTitle('กดที่โลโก้เพื่อเปิดเมนูเข้าหน้าต่างๆ').click();
  await page.getByRole('button', { name: /Monitor · ค่าใช้จ่ายและโควต้า/ }).click();
  await expect(page.getByTestId('owner-monitor')).toBeVisible();
});

test('other admin cannot access Monitor through direct URL or menu and never fetches metrics', async ({ page }) => {
  await login(page, 'qa-admin'); let reads = 0;
  page.on('request', request => { if (request.url().includes('/api/owner/monitor')) reads++; });
  await page.goto('/?tab=owner_monitor');
  await expect(page.getByText('ไม่สามารถเปิดหน้านี้ได้', { exact: true })).toBeVisible();
  expect(reads).toBe(0);
  await page.getByTitle('กดที่โลโก้เพื่อเปิดเมนูเข้าหน้าต่างๆ').click();
  await expect(page.getByRole('button', { name: /Monitor · ค่าใช้จ่ายและโควต้า/ })).toHaveCount(0);
});

test('quota warnings, unknown billing, failure feedback and mobile layout stay readable', async ({ page }) => {
  await login(page); let fail = false;
  const now = new Date().toISOString();
  const m = (id: string, label: string, value: number | null, unit: string, extra = {}) => ({ id, label, value, unit, kind: 'measured', ...extra });
  await page.route('**/api/owner/monitor', route => fail ? route.fulfill({ status: 503, json: { error: 'Unavailable' } }) : route.fulfill({ json: {
    schemaVersion: 1, generatedAt: now, nextRefreshAt: new Date(Date.now() + 3600000).toISOString(), cached: false,
    providers: [
      { id: 'render', name: 'Render', state: 'ok', checkedAt: now, updatedAt: now, dashboardUrl: 'https://dashboard.render.com/billing', note: 'การรับส่งข้อมูลของเว็บหลัก · โควต้าแบ่งใช้ทั้ง Workspace', metrics: [m('bandwidth', 'Bandwidth เดือนนี้', 7.18 * 1024 ** 3, 'bytes', { limit: 5 * 1024 ** 3 }), m('estimate', 'ค่า Bandwidth โดยประมาณ', .45, 'usd', { kind: 'estimate', note: 'ไม่ใช่ยอดบิลหรือตัดบัตร' }), m('invoice', 'ยอดเรียกเก็บจริง', null, 'usd')] },
      { id: 'supabase', name: 'Supabase', state: 'ok', checkedAt: now, updatedAt: now, dashboardUrl: 'https://supabase.com/dashboard', note: 'ฐานข้อมูลและไฟล์เก่า', metrics: [m('database', 'พื้นที่ฐานข้อมูลรวม', 40 * 1024 ** 2, 'bytes', { limit: 500 * 1024 ** 2 }), m('egress', 'Egress รอบบิลนี้', null, 'bytes', { note: 'ตรวจในหน้า Usage ของ Supabase' })] },
      { id: 'drive', name: 'Google Drive', state: 'stale', checkedAt: now, updatedAt: now, dashboardUrl: 'https://drive.google.com/drive/quota', note: 'กำลังแสดงค่าล่าสุดที่อ่านได้', metrics: [m('storage', 'พื้นที่บัญชี Google ที่ใช้', 16 * 1024 ** 3, 'bytes', { limit: 100 * 1024 ** 3 })] },
    ],
  } }));
  await page.goto('/?tab=owner_monitor');
  await expect(page.getByText('143.6% · เกินโควต้าอ้างอิงแล้ว')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Render Monitor' })).toContainText('$0.45');
  await expect(page.getByRole('region', { name: 'Render Monitor' })).toContainText('—');
  await expect(page.getByRole('region', { name: 'Google Drive Monitor' })).toContainText('ข้อมูลเดิม');
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
    if (width !== 320) await capture(page, { path: `output/monitor/monitor-${width}.png`, fullPage: true });
  }
  fail = true; await page.getByRole('button', { name: 'ตรวจข้อมูลล่าสุด' }).click();
  await expect(page.getByRole('alert')).toContainText('อาจไม่ใช่ค่าปัจจุบัน');
  await expect(page.getByRole('region', { name: 'Render Monitor' })).toContainText('$0.45');
});
