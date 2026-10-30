import { test, expect, Page } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp } from '../../server/app.js';

test.use({ viewport: { width: 390, height: 844 }, launchOptions: { args: ['--disable-gpu'] } });
let server: any, dir: string, base: string, token: string;
test.beforeEach(async ({ page }) => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-pack-browser-'));
  const defaults = { users: [{id:'user-editor',emailOrId:'editor',name:'QA Editor',alias:'QA Editor',role:'reviewer',pin:'qa-only-876543'}, { id: 'user-ice', emailOrId: 'ice', name: 'QA owner', alias: 'QA', role: 'admin', pin: 'qa-only-876543' }], suppliers: [], drinkStores: [], locations: [], leadLabItems: [], franchiseStores: [], invites: [], notifications: [] };
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
  await expect(page.getByTestId('mockup-result')).toContainText('สูตร R&D 10');
  await page.reload();
  await load(page);
  await expect(page.getByTestId('mockup-result')).toContainText('เพิ่ม 0 รายการ');
  await expect(page.getByTestId('mockup-result')).toContainText('ข้ามรายการเดิม 42');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.screenshot({ path: 'test-results/sample-pack-mobile.png' });
  await page.getByRole('button', { name: 'ปิดผลโหลดข้อมูล', exact: true }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('lost acknowledgement is recovered from server receipt', async ({ page }) => {
  await page.route('**/api/system/sample-pack', async route => {
    await route.fetch({ url: base + '/api/system/sample-pack' });
    await route.abort('failed');
  });
  await load(page);
  await expect(page.getByTestId('mockup-result')).toContainText('เพิ่ม 42 รายการ');
});
async function pull(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    const target = document.querySelector('main')!;
    const touch = (y: number) => new Touch({ identifier: 1, target, clientX: 100, clientY: y });
    target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [touch(100)] }));
    target.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, cancelable: true, touches: [touch(240)] }));
    target.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [] }));
  });
}
test('pull refresh has no permanent button, reports failure and recovers', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'รีเฟรชข้อมูล', exact: true })).toHaveCount(0);
  const failing = (route: any) => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"offline"}' });
  await page.route('**/api/data**', failing);
  await pull(page);
  await expect(page.getByTestId('refresh-feedback')).toContainText('รีเฟรชไม่สำเร็จ');
  await page.getByRole('button', { name: 'ปิดผลรีเฟรช' }).click();
  await expect(page.getByTestId('refresh-feedback')).toHaveCount(0);
  await page.unroute('**/api/data**', failing);
  await pull(page);
  await expect(page.getByTestId('refresh-feedback')).toContainText('อัปเดตข้อมูลสำเร็จ');
});

test('another client write appears through polling without reload or signing out', async ({ page }) => {
  const response = await page.request.post(base + '/api/suppliers', { headers: { Authorization: `Bearer ${token}` }, data: { id: 'realtime-fixture', name: 'Live supplier', category: 'Machine', rating: 4, quickTags: [], photos: { storefrontAndAtmosphere: [], contactCards: [] }, catalogItems: [], location: { lat: 13.7, lng: 100.5 }, status: 'scouted' } });
  expect(response.ok()).toBeTruthy();
  await expect(page.getByRole('button').filter({ hasText: 'ซัพพลายเออร์' }).first()).toContainText('1', { timeout: 10000 });
  await expect(page.getByRole('banner')).toBeVisible();
});

test('two brands share one concept, preserve supplied logos, and both show the two toppings', async ({page}) => {
  const seeded=await page.request.post(base+'/api/system/sample-pack',{headers:{Authorization:`Bearer ${token}`},data:{packId:'vitcha-demo-v2',operationId:'brand-ui'}});expect(seeded.ok()).toBeTruthy();
  await page.reload();
  await page.getByRole('button',{name:/แพลตฟอร์ม/}).click();
  await page.locator('[data-no-pull-refresh]').getByRole('button',{name:/แบรนด์และหน้าร้าน/}).click();
  await expect(page.getByRole('heading',{name:/แบรนด์และหน้าร้าน/})).toBeVisible();
  await expect(page.locator('main')).toContainText('2 แบรนด์');
  await expect(page.getByTestId('brand-directory-intro')).not.toContainText(/VITCHA|VITZA|TWO BRANDS|Mockup|ไม่มีสาขา/);
  await expect(page.locator('img[src="./brand-mockups/shared-storefront.jpg"]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/CentralWorld|Siam Square|Silom|One Bangkok/);
  await expect(page.locator('img[src="./brand-mockups/vitcha-logo.png"]')).toBeVisible();
  await expect(page.locator('img[src="./brand-mockups/vitza-logo.png"]')).toBeVisible();
  await page.screenshot({path:'test-results/brand-directory-mobile.png',fullPage:true});
  await page.getByRole('button',{name:/เข้าร้าน/}).first().click();
  await expect(page.getByRole('heading',{name:'VITCHA',exact:true})).toBeVisible();
  await expect(page.locator('main')).toContainText('วุ้นยูซุใส');
  await expect(page.locator('main')).toContainText('บุกไข่มุกน้ำตาลทรายแดง');
  await page.getByRole('button',{name:/หน้ารวมแบรนด์/}).click();
  await page.getByRole('button',{name:/เข้าร้าน/}).nth(1).click();
  await expect(page.getByRole('heading',{name:'VITZA',exact:true})).toBeVisible();
  await expect(page.locator('main')).toContainText('เมนูโซดาคอนเซ็ปต์ · รอทดลองสูตร');
  await expect(page.locator('main')).toContainText('วุ้นยูซุใส');
  await expect(page.locator('main')).toContainText('บุกไข่มุกน้ำตาลทรายแดง');
  await page.evaluate(() => window.scrollTo(0,0));
  await page.screenshot({path:'test-results/vitza-storefront-mobile.png',fullPage:true});
});


test('store photos open in a closable gallery with buttons, keyboard and swipe', async ({page}) => {
  await page.request.post(base+'/api/system/sample-pack',{headers:{Authorization:`Bearer ${token}`},data:{packId:'vitcha-demo-v2',operationId:'gallery-ui'}});
  const updated = await page.request.post(base+'/api/franchise-stores',{headers:{Authorization:`Bearer ${token}`},data:{id:'brand-vitcha',galleryPhotos:['./brand-mockups/shared-storefront.jpg','./brand-mockups/vitcha-logo.png','./brand-mockups/vitza-logo.png']}});
  expect(updated.ok()).toBeTruthy();
  await page.reload();
  await page.getByRole('button',{name:/แพลตฟอร์ม/}).click();
  await page.locator('[data-no-pull-refresh]').getByRole('button',{name:/แบรนด์และหน้าร้าน/}).click();
  await page.getByRole('button',{name:/เข้าร้าน/}).first().click();
  const url = page.url();
  const thumbnail = page.getByRole('button',{name:'เปิดภาพหน้าร้าน 1',exact:true});
  await thumbnail.click();
  const gallery = page.getByRole('dialog',{name:'รูปภาพหน้าร้าน'});
  await expect(gallery).toBeVisible();
  await expect(gallery.getByRole('status')).toHaveText('1 / 3');
  await gallery.getByRole('button',{name:'ภาพถัดไป'}).click();
  await expect(gallery.getByRole('img')).toHaveAttribute('src','./brand-mockups/vitcha-logo.png');
  await page.keyboard.press('ArrowRight');
  await expect(gallery.getByRole('status')).toHaveText('3 / 3');
  await gallery.getByRole('button',{name:'ภาพก่อนหน้า'}).click();
  await page.keyboard.press('ArrowLeft');
  await expect(gallery.getByRole('status')).toHaveText('1 / 3');
  const swipe = page.getByTestId('store-photo-swipe');
  await swipe.evaluate(element => {
    const start = new Touch({identifier:1,target:element,clientX:300,clientY:200});
    const end = new Touch({identifier:1,target:element,clientX:100,clientY:205});
    element.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[start]}));
    element.dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[],changedTouches:[end]}));
  });
  await expect(gallery.getByRole('status')).toHaveText('2 / 3');
  await page.screenshot({path:'test-results/store-gallery-mobile.png'});
  await gallery.getByRole('button',{name:'ปิดภาพ',exact:true}).click();
  await expect(gallery).not.toBeVisible();
  await expect(thumbnail).toBeFocused();
  expect(page.url()).toBe(url);
  await thumbnail.click();
  await page.keyboard.press('Escape');
  await expect(gallery).not.toBeVisible();
  expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
  expect(page.context().pages()).toHaveLength(1);
  await page.getByRole('button',{name:/หน้ารวมแบรนด์/}).click();
  await page.getByRole('button',{name:/เข้าร้าน/}).nth(1).click();
  await page.getByRole('button',{name:'เปิดภาพหน้าร้าน 1',exact:true}).click();
  await expect(gallery.getByRole('status')).toHaveText('1 / 1');
  await expect(gallery.getByRole('button',{name:'ภาพถัดไป'})).toBeDisabled();
  await gallery.getByRole('button',{name:'ปิดภาพ',exact:true}).click();
});


test('real brand photo has no dark overlay or mock labels and custom color persists', async ({page}) => {
 const headers={Authorization:`Bearer ${token}`};
 expect((await page.request.post(base+'/api/franchise-stores',{headers,data:{id:'real-brand',name:'Real Brand',logoUrl:'./brand-mockups/vitcha-logo.png',menuCategories:['Tea'],themeColor:'emerald',branch:'',menuItems:[]}})).ok()).toBeTruthy();
 await page.reload();
 await page.getByRole('button',{name:/แพลตฟอร์ม/}).click();
 await page.locator('[data-no-pull-refresh]').getByRole('button',{name:/แบรนด์และหน้าร้าน/}).click();
 await expect(page.locator('main')).not.toContainText(/หน้าร้านจำลอง|แบรนด์จำลอง|Mockup/);
 const cover=page.getByRole('img',{name:'Real Brand',exact:true}).locator('..');
 await expect(cover.locator('[class*="from-black"]')).toHaveCount(0);
 await expect(cover.getByRole('heading')).toHaveCount(0);
 await page.screenshot({path:'test-results/real-brand-card.png',fullPage:true});
 await page.getByRole('button',{name:/เข้าร้าน/}).click();
 await expect(page.locator('main')).toContainText('ข้อมูลแบรนด์ · เมนูและสูตร');
 await page.getByRole('button',{name:/แก้ไขร้าน/}).click();
 await page.getByLabel('เลือกสีแบรนด์เอง').fill('#2468ac');
 await expect(page.getByLabel('รหัสสีแบรนด์ HEX')).toHaveValue('#2468ac');
 await page.getByLabel('รหัสสีแบรนด์ HEX').fill('#903c75');
 await expect(page.getByLabel('เลือกสีแบรนด์เอง')).toHaveValue('#903c75');
 await page.screenshot({path:'test-results/custom-brand-color.png'});
 await page.getByRole('button',{name:'บันทึกการแก้ไข',exact:true}).click();
 await expect(page.getByLabel('รหัสสีแบรนด์ HEX')).toHaveCount(0);
 await page.reload();
 const saved=(await (await page.request.get(base+'/api/franchise-stores',{headers})).json()).stores.find((x:any)=>x.id==='real-brand');
 expect(saved.themeColor).toBe('#903c75'); expect(saved.name).toBe('Real Brand'); expect(saved.isMock).not.toBe(true);
});

test('owner selects filtered trash in bulk, cancels permanent deletion, restores and deletes selected only', async ({page}) => {
 const headers={Authorization:`Bearer ${token}`};
 for(const name of ['Batch A','Batch B','Keep C']) {
   const id=name.replaceAll(' ','-');
   expect((await page.request.post(base+'/api/franchise-stores',{headers,data:{id,name}})).ok()).toBeTruthy();
   expect((await page.request.delete(base+'/api/franchise-stores/'+id,{headers})).ok()).toBeTruthy();
 }
 await page.reload();
 await page.getByRole('button',{name:/แพลตฟอร์ม/}).click();
 await page.locator('[data-no-pull-refresh]').getByRole('button',{name:/ถังขยะ/}).click();
 const search=page.getByPlaceholder('ค้นหาตามชื่อรายการ, หมวดหมู่, หรือผู้ลบ...');
 await search.fill('Batch');
 await page.getByLabel('เลือกทั้งหมดที่แสดง').check();
 await expect(page.getByText('เลือก 2 รายการ',{exact:true})).toBeVisible();
 page.once('dialog',d=>d.dismiss());
 await page.getByRole('button',{name:'ลบรายการที่เลือกถาวร'}).click();
 await expect(page.getByText('เลือก 2 รายการ',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'กู้คืนรายการที่เลือก'}).click();
 await expect(page.getByText('กู้คืน 2 รายการเรียบร้อยแล้ว',{exact:true})).toBeVisible();
 await search.fill('');
 await expect(page.getByRole('heading',{name:'Keep C',exact:true})).toBeVisible();
 await page.getByLabel('เลือก Keep C',{exact:true}).check();
 page.once('dialog',d=>d.accept());
 await page.getByRole('button',{name:'ลบรายการที่เลือกถาวร'}).click();
 await expect(page.getByText('ถังขยะว่างเปล่า ไม่มีรายการที่ถูกลบ',{exact:true})).toBeVisible();
 const stores=(await (await page.request.get(base+'/api/franchise-stores',{headers})).json()).stores;
 expect(stores.map((x:any)=>x.name).sort()).toEqual(['Batch A','Batch B']);
});

test('legacy reviewer becomes Editor with edit controls but no trash, member or system menu', async ({page}) => {
 const login=await page.request.post(base+'/api/login',{data:{idOrEmail:'editor',pin:'qa-only-876543'}});
 const session=await login.json(); expect(session.user.role).toBe('editor');
 await page.addInitScript(t=>sessionStorage.setItem('vitcha_session_token',t),session.token);
 await page.reload();
 await page.getByRole('button',{name:/แพลตฟอร์ม/}).click();
 const drawer=page.locator('[data-no-pull-refresh]');
 for(const name of [/ถังขยะ/,/สมาชิก/,/ตั้งค่าเนื้อหา/,/โหลดข้อมูล Mockup/]) await expect(drawer.getByRole('button',{name})).toHaveCount(0);
 await page.goto('/?tab=trash');
 await expect(page.getByRole('heading',{name:/ถังขยะและประวัติ/})).toHaveCount(0);
 expect((await page.request.get(base+'/api/trash',{headers:{Authorization:`Bearer ${session.token}`}})).status()).toBe(403);
});
