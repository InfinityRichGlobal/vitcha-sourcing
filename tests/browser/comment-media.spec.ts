import { test, expect, Page } from '@playwright/test';
import fs from 'node:fs';
test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block', trace: 'off', launchOptions: { args: ['--disable-gpu'] } });
async function setup(page: Page) {
  await page.route('https://tiles.openfreemap.org/**', route => route.fulfill({ status: 503, body: '' }));
  const login = await page.request.post('/api/login', { data: { idOrEmail: 'qa-reviewer', pin: 'qa-only-876543' } });
  const { token } = await login.json(), id = `comment-media-${Date.now()}`;
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  const headers = { Authorization: `Bearer ${token}` };
  const name = `ทีมสำรวจหลายคน ${id}`;
  expect((await page.request.post('/api/suppliers', { headers, data: { id, name, category: 'เครื่องชงชา/กาแฟ', rating: 4, quickTags: [], photos: { storefrontAndAtmosphere: [], contactCards: [] }, catalogItems: [], location: { lat: 13, lng: 100 }, status: 'scouted' } })).ok()).toBeTruthy();
  await page.goto(`/?view=${id}&type=supplier`);
  return { id, name, headers, form: page.getByRole('form', { name: 'เขียนความคิดเห็น' }) };
}
const photo = (name: string) => ({ name, mimeType: 'image/png', buffer: fs.readFileSync('tests/fixtures/photo.png') });

test('a reviewer posts photos and video in one comment, swipes its gallery and replies without editing the supplier', async ({ page }) => {
  const { id, headers, form } = await setup(page);
  let release!: () => void; const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/uploads/*/chunk?*', async route => { await gate; await route.continue(); });
  await form.getByLabel('เลือกรูปและวิดีโอแนบความคิดเห็น').setInputFiles([photo('one.png'), photo('two.png'), { name: 'visit.webm', mimeType: 'video/webm', buffer: fs.readFileSync('tests/fixtures/clip.webm') }]);
  await expect(form.getByTestId('comment-media-draft')).toHaveCount(3);
  await expect(form.locator('video')).toHaveAttribute('src', /^blob:/);
  await expect(form.getByRole('button', { name: 'โพสต์', exact: true })).toBeDisabled();
  release();
  await expect(form.getByRole('status')).toContainText('อัปโหลดครบ 3 ไฟล์แล้ว', { timeout: 20000 });
  await form.locator('input[type=text]').fill('ชุดภาพและคลิปจากอีกคน');
  await form.getByRole('button', { name: 'โพสต์', exact: true }).click();
  await expect(page.getByTestId('success-feedback')).toContainText('ส่งความคิดเห็นเรียบร้อยแล้ว');
  await expect(form.getByTestId('comment-media-draft')).toHaveCount(0);
  const read = async () => (await page.request.get('/api/data', { headers })).json();
  const stored = (await read()).suppliers.find((s: any) => s.id === id);
  expect(stored.photos).toEqual({ storefrontAndAtmosphere: [], contactCards: [] });
  expect(stored.reviewerNotes).toHaveLength(1);
  expect(stored.reviewerNotes[0].media.map((m: any) => m.type)).toEqual(['image', 'image', 'video']);
  expect(stored.reviewerNotes[0].media.every((m: any) => !m.url.startsWith('blob:'))).toBeTruthy();
  const gallery = page.getByTestId('comment-media-gallery').filter({ has: page.getByRole('button', { name: 'เปิดวิดีโอแนบ 3' }) }).first();
  await gallery.getByRole('button', { name: 'เปิดรูปภาพแนบ 1' }).click();
  const viewer = page.getByRole('dialog', { name: 'รูปและวิดีโอในความคิดเห็น' });
  await expect(viewer.getByRole('status')).toHaveText('1 / 3');
  await viewer.getByRole('button', { name: 'สื่อถัดไป' }).click();
  await viewer.getByTestId('comment-media-swipe').evaluate(element => {
    const start = new Touch({ identifier: 1, target: element, clientX: 300, clientY: 200 });
    const end = new Touch({ identifier: 1, target: element, clientX: 50, clientY: 205 });
    element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [], changedTouches: [end] }));
  });
  await expect(viewer.getByRole('status')).toHaveText('3 / 3');
  await expect(viewer.locator('video')).toHaveAttribute('controls', '');
  await expect.poll(() => viewer.locator('video').evaluate((v: HTMLVideoElement) => v.readyState)).toBeGreaterThan(0);
  await viewer.getByRole('button', { name: 'สื่อก่อนหน้า' }).click();
  await expect(viewer.locator('video')).toHaveCount(0);
  await viewer.getByRole('button', { name: 'ปิดสื่อความคิดเห็น' }).click();
  await page.getByRole('button', { name: 'ตอบกลับ', exact: true }).last().click();
  const reply = page.getByRole('region', { name: 'แนบรูปและวิดีโอในความคิดเห็น' }).filter({ visible: true }).first();
  await reply.getByLabel('เลือกรูปและวิดีโอแนบความคิดเห็น').setInputFiles([photo('reply1.png'), photo('reply2.png')]);
  await expect(reply.getByRole('status')).toContainText('อัปโหลดครบ 2 ไฟล์แล้ว', { timeout: 20000 });
  await page.getByRole('button', { name: 'ส่ง', exact: true }).last().click();
  await expect.poll(async () => (await read()).suppliers.find((s: any) => s.id === id).reviewerNotes[0].replies.length).toBe(1);
  await page.reload();
  await expect(page.getByTestId('comment-media-gallery').first().getByRole('button')).toHaveCount(3);
});

test('failed comment media can be removed or retried and a rejected post retains all ready files', async ({ page }) => {
  const { id, form } = await setup(page);
  let failUpload = true, failPost = true;
  await page.route('**/api/uploads', route => failUpload ? route.fulfill({ status: 503, json: { error: 'QA upload failure' } }) : route.continue());
  await form.getByLabel('เลือกรูปและวิดีโอแนบความคิดเห็น').setInputFiles([photo('retry.png'), photo('remove.png')]);
  await expect(form.getByRole('button', { name: 'ลองอัปโหลดใหม่' })).toHaveCount(2);
  await expect(form.getByRole('button', { name: 'โพสต์', exact: true })).toBeDisabled();
  await form.getByRole('button', { name: 'ลบไฟล์แนบ 2' }).click();
  failUpload = false;
  await form.getByRole('button', { name: 'ลองอัปโหลดใหม่' }).click();
  await expect(form.getByRole('status')).toContainText('อัปโหลดครบ 1 ไฟล์แล้ว');
  await page.route(`**/api/suppliers/${id}/comments`, route => {
    if (route.request().postDataJSON()?.action === 'comment' && failPost) return route.fulfill({ status: 503, json: { error: 'QA comment save failure' } });
    return route.continue();
  });
  await form.getByRole('button', { name: 'โพสต์', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('QA comment save failure');
  await expect(form.getByTestId('comment-media-draft')).toHaveCount(1);
  await expect(page.getByTestId('success-feedback')).toHaveCount(0);
  failPost = false;
  await form.getByRole('button', { name: 'โพสต์', exact: true }).click();
  await expect(page.getByTestId('success-feedback')).toContainText('ส่งความคิดเห็นเรียบร้อยแล้ว');
  await expect(form.getByTestId('comment-media-draft')).toHaveCount(0);
});

test('feed comments accept a photo batch and cancel unfinished files when the composer is closed', async ({ page }) => {
  const { name } = await setup(page); await page.goto('/?tab=suppliers');
  const card = page.getByRole('article', { name, exact: true });
  await card.getByRole('button', { name: 'เม้นต์ (0)', exact: true }).click();
  let release!: () => void; const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/uploads', async route => { await gate; await route.abort().catch(() => {}); });
  await card.getByLabel('เลือกรูปและวิดีโอแนบความคิดเห็น').setInputFiles(photo('cancel.png'));
  await expect(card.getByRole('button', { name: 'ส่งความคิดเห็น' })).toBeDisabled();
  await card.getByRole('button', { name: 'เม้นต์ (0)', exact: true }).click(); release();
  await page.unroute('**/api/uploads');
  await card.getByRole('button', { name: 'เม้นต์ (0)', exact: true }).click();
  await expect(card.getByTestId('comment-media-draft')).toHaveCount(0);
  await card.getByLabel('เลือกรูปและวิดีโอแนบความคิดเห็น').setInputFiles([photo('feed1.png'), photo('feed2.png')]);
  await expect(card.getByRole('status')).toContainText('อัปโหลดครบ 2 ไฟล์แล้ว', { timeout: 20000 });
  await card.getByRole('button', { name: 'ส่งความคิดเห็น' }).click();
  await expect(card.getByTestId('comment-media-gallery').getByRole('button')).toHaveCount(2);
  await expect(card.getByTestId('comment-media-draft')).toHaveCount(0);
});
