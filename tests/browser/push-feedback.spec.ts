import { test, expect, Page } from '@playwright/test';
test.use({ viewport: { width: 390, height: 844 }, launchOptions: { args: ['--disable-gpu'] } });

async function openPush(page: Page, hang = false) {
  await page.route('https://tiles.openfreemap.org/**', r => r.fulfill({ status: 503, body: '' }));
  await page.route('**/api/push/config', r => r.fulfill({ json: { publicKey: 'BAECAw' } }));
  await page.route('**/api/push/subscribe', r => r.fulfill({ json: { success: true } }));
  await page.addInitScript(hang => {
    const subscription = { endpoint: 'https://web.push.apple.com/qa-only', options: {}, toJSON() { return { endpoint: this.endpoint }; } };
    const registration = { pushManager: { getSubscription: () => hang ? new Promise(() => {}) : Promise.resolve(subscription) } };
    Object.defineProperty(window, 'Notification', { value: { permission: 'granted', requestPermission() { throw new Error('Already granted devices must not request permission again'); } } });
    Object.defineProperty(window, 'PushManager', { value: function () {} });
    Object.defineProperty(navigator, 'serviceWorker', { value: { register: async () => registration, ready: Promise.resolve(registration) } });
  }, hang);
  const response = await page.request.post('/api/login', { data: { idOrEmail: 'qa-admin', pin: 'qa-only-876543' } });
  const { token } = await response.json();
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  await page.goto('/');
  await page.locator('header').getByRole('button', { name: /กดเพื่อติดตั้งและเปิดแจ้งเตือน/ }).click();
  return page.getByRole('dialog', { name: 'ติดตั้งแอพ' });
}

test('push test shows progress beside its button and confirms only after server acceptance', async ({ page }) => {
  let finish!: () => void;
  const gate = new Promise<void>(resolve => { finish = resolve; });
  await page.route('**/api/push/test', async r => { await gate; await r.fulfill({ json: { accepted: 1, failed: 0 } }); });
  const dialog = await openPush(page);
  await dialog.getByRole('button', { name: /ทดสอบแจ้งเตือนจากเซิร์ฟเวอร์/ }).click();
  await expect(dialog.getByRole('button', { name: 'กำลังทดสอบแจ้งเตือน…' })).toBeDisabled();
  await expect(dialog.getByRole('status')).toHaveText('กำลังส่งข้อความจากเซิร์ฟเวอร์เข้ามือถือ…');
  await expect(dialog.getByRole('status')).toBeInViewport();
  finish();
  await expect(dialog.getByRole('status')).toContainText('บริการ Push รับข้อความทดสอบแล้ว');
  await expect(dialog.getByRole('button', { name: /ทดสอบแจ้งเตือนจากเซิร์ฟเวอร์/ })).toBeEnabled();
});

test('a stalled device push service times out visibly and allows retry', async ({ page }) => {
  const dialog = await openPush(page, true);
  await page.clock.install();
  await dialog.getByRole('button', { name: /ทดสอบแจ้งเตือนจากเซิร์ฟเวอร์/ }).click();
  await expect(dialog.getByRole('status')).toHaveText('กำลังเชื่อมต่อบริการแจ้งเตือนของเครื่อง…');
  await page.clock.fastForward(21000);
  await expect(dialog.getByRole('alert')).toContainText('บริการแจ้งเตือนของเครื่องยังไม่ตอบกลับ');
  await expect(dialog.getByRole('alert')).toBeInViewport();
  await expect(dialog.getByRole('button', { name: /ทดสอบแจ้งเตือนจากเซิร์ฟเวอร์/ })).toBeEnabled();
});
