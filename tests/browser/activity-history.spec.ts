import { test, expect } from '@playwright/test';
import { capture } from './capture';
test.use({ viewport: { width: 390, height: 844 }, launchOptions: { args: ['--disable-gpu'] } });

test.beforeEach(async ({ page }) => { await page.route('https://tiles.openfreemap.org/**', r => r.fulfill({ status: 503, body: 'Non-map test' })); });

test('mobile detail shows the complete journey, full notes, filters and dismissible media after reload', async ({ page }) => {
  const login = await page.request.post('/api/login', { data: { idOrEmail:'qa-admin', pin:'qa-only-876543' } });
  const {token} = await login.json();const headers={Authorization:`Bearer ${token}`};
  const id='qa-activity-'+Date.now();
  const create=await page.request.post('/api/suppliers',{headers,data:{id,name:'ร้านประวัติครบ',category:'ชา',rating:4,quickTags:[],photos:{storefrontAndAtmosphere:[],contactCards:[]},catalogItems:[],location:{lat:13.7,lng:100.5},status:'scouted'}});
  expect(create.ok()).toBeTruthy();let revision=1;
  const text='รายละเอียดการทดสอบที่ต้องอ่านครบ\n'.repeat(12)+'ข้อความท้ายครบถ้วน';
  for(const stage of ['sample_test','rfq_sent','sample_test']) {
    const response=await page.request.post(`/api/suppliers/${id}/actions`,{headers,data:{action:'handoff',operationId:`stage-${stage}-${revision}`,revision,data:{handoffStage:stage,handoffNotes:text,assignedTo:'qa-reviewer',targetFollowUpDate:'2026-11-05'}}});
    expect(response.ok()).toBeTruthy();revision++;
  }
  const c=await page.request.post(`/api/suppliers/${id}/actions`,{headers,data:{action:'comment',operationId:'full-comment-'+id,data:{text,photoUrl:'/logo.jpg',voiceUrl:'/audio/sample-feedback-1.m4a'}}});expect(c.ok()).toBeTruthy();
  await page.addInitScript(t=>sessionStorage.setItem('vitcha_session_token',t),token);
  await page.goto(`/?view=${id}&type=supplier`);
  const timeline=page.getByTestId('activity-timeline');await expect(timeline).toBeVisible();await timeline.scrollIntoViewIfNeeded();
  await expect(timeline).toContainText('ผู้รับช่วงต่อ: QA reviewer');
  const third=timeline.getByRole('button',{name:/พาร์ท 3: ทดสอบตัวอย่าง/});await expect(third).toContainText('บันทึกเข้า 2 ครั้ง');
  await expect(timeline.getByRole('button',{name:/พาร์ท 4: ต่อรอง/})).toContainText('ยังไม่มีบันทึก');
  await expect(timeline).toContainText('พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D → พาร์ท 2: ขอสเปก / ส่ง RFQ');
  await timeline.getByLabel('ประเภทประวัติ').selectOption('comments');
  await expect(timeline.getByTestId('activity-event')).toHaveCount(1);
  await expect(timeline.getByTestId('activity-event')).toContainText(text);
  await timeline.getByRole('button',{name:'เปิดภาพจากประวัติ'}).click();
  const dialog=page.getByRole('dialog',{name:'สื่อจากประวัติ'});await expect(dialog).toBeVisible();
  await dialog.getByRole('button',{name:'ปิดสื่อ'}).click();await expect(dialog).toHaveCount(0);await expect(timeline).toBeVisible();
  await timeline.getByRole('button',{name:'เปิดฟังเสียง'}).click();await expect(dialog.locator('audio')).toHaveAttribute('controls','');await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
  expect(await timeline.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBeTruthy();
  await timeline.getByRole('button',{name:'ดูทุกพาร์ท'}).click();await third.click();
  await expect(timeline.getByTestId('activity-event')).toHaveCount(4); // three moves plus a comment at part 3
  await page.reload();await expect(timeline).toBeVisible();await expect(timeline).toContainText('ข้อความท้ายครบถ้วน');
  await timeline.getByLabel('ประเภทประวัติ').selectOption('handoff');await timeline.getByTestId('activity-event').first().scrollIntoViewIfNeeded();
  await capture(page,{path:'test-results/activity-history-mobile.png',fullPage:false});
  const paragraphs=timeline.getByTestId('activity-event').first().locator('p');
  expect(await paragraphs.evaluateAll(els=>els.every(el=>getComputedStyle(el).textOverflow!=='ellipsis'))).toBeTruthy();
});

test('legacy history is clearly marked and does not invent visited stages', async ({page})=>{
  const login=await page.request.post('/api/login',{data:{idOrEmail:'qa-viewer',pin:'qa-only-876543'}});const {token}=await login.json();
  const response=await page.request.get('/api/data',{headers:{Authorization:`Bearer ${token}`}});const snapshot=await response.json();
  const record=snapshot.suppliers.find((s:any)=>!s.history?.some((e:any)=>e.version===2));expect(record).toBeTruthy();
  await page.addInitScript(t=>sessionStorage.setItem('vitcha_session_token',t),token);await page.goto(`/?view=${record.id}&type=supplier`);
  const timeline=page.getByTestId('activity-timeline');await expect(timeline).toBeVisible();
  await expect(timeline).toContainText('ประวัติเก่าอาจเป็นข้อความย่อ');await expect(timeline).not.toContainText('เคยอยู่ขั้นตอนนี้');
  await timeline.getByRole('button',{name:/พาร์ท 6: สั่งซื้อสำเร็จ/}).click();await expect(timeline).toContainText('ยังไม่มีประวัติที่บันทึกสำหรับตัวกรองนี้');
});
