import { test, expect } from '@playwright/test';
import { sampleCatalog } from '../../server/sample-pack.js';

test.use({ viewport: { width: 390, height: 844 }, launchOptions: { args: ['--disable-gpu'] } });
async function setup(page: any, suffix: string) {
  const login = await page.request.post('/api/login', { data: { idOrEmail: 'qa-reviewer', pin: 'qa-only-876543' } });
  const { token } = await login.json(); const headers = { Authorization: `Bearer ${token}` };
  const data = sampleCatalog(); const lab = { ...data.leadLabItems[0], id: `qa-edit-lab-${suffix}`, name: `สูตรทดสอบ-${suffix}`, photoUrl:'/logo.jpg', audioNotes:[{id:'keep-audio',url:'/audio/sample-feedback-1.m4a',title:'บันทึกเดิม',authorName:'ผู้บันทึกเดิม',createdAt:'2026-10-29',duration:3}], galleryPhotos:['/logo.jpg'], videos:[], revisionCycles:[{cycleNumber:1,title:'ประวัติเดิม',status:'active',createdAt:'2026-10-30',createdBy:'qa-reviewer',comments:[{id:'keep-comment',authorId:'qa-reviewer',authorName:'QA reviewer',content:'เก็บประวัตินี้ไว้',createdAt:'2026-10-30',likes:[]}]}] };
  expect((await page.request.post('/api/lead-lab/items', { headers, data: lab })).ok()).toBeTruthy();
  const store = { ...data.franchiseStores[0], id: `qa-edit-store-${suffix}`, name: `ร้านทดสอบ-${suffix}`, logoUrl:'/logo.jpg', galleryPhotos:[], menuCategories:['เครื่องดื่ม','เมนูแนะนำ'], menuItems:[{id:'menu-one',labItemId:lab.id,retailPriceThb:60,displayOrder:1,isAvailable:true,category:'เครื่องดื่ม',recommendedToppingIds:['keep-reference']}],revisionCycles:lab.revisionCycles };
  expect((await page.request.post('/api/franchise-stores', { headers, data: store })).ok()).toBeTruthy();
  await page.addInitScript((t: string) => sessionStorage.setItem('vitcha_session_token', t), token);
  await page.route('https://tiles.openfreemap.org/**', (r: any) => r.fulfill({ status:503, body:'non-map test' }));
  const read = async () => (await page.request.get('/api/data', { headers })).json();
  return { headers, lab, store, read };
}

test('editor edits store menu, PDF reflects sale state, removal preserves recipe and other stores', async ({page}) => {
 const {store,lab,headers,read}=await setup(page,'menu-'+Date.now());
 const other={...store,id:store.id+'-other'};expect((await page.request.post('/api/franchise-stores',{headers,data:other})).ok()).toBeTruthy();
 await page.goto(`/?tab=franchise_stores&view=${store.id}`);
 await page.getByRole('button',{name:`แก้ไขเมนู ${lab.name}`,exact:true}).click();
 const form=page.getByRole('dialog',{name:'แบบฟอร์มเมนูในร้าน'});await expect(form).toBeVisible();
 await form.getByLabel('ชื่อเมนูในร้าน').fill('เมนูเปลี่ยนชื่อ');await form.getByLabel('ราคาขายหน้าร้าน').fill('0');await form.getByLabel('หมวดหมู่เมนู').selectOption('เมนูแนะนำ');await form.getByLabel('เปิดขายเมนูนี้').uncheck();
 await form.getByRole('button',{name:'บันทึกการแก้ไขเมนู',exact:true}).click();await expect(form).toHaveCount(0);await page.reload();
 await expect(page.getByRole('button',{name:'แก้ไขเมนู เมนูเปลี่ยนชื่อ',exact:true})).toBeVisible();
 let db=await read();let saved=db.franchiseStores.find((s:any)=>s.id===store.id);expect(saved.menuItems[0]).toMatchObject({id:'menu-one',retailPriceThb:0,isAvailable:false,category:'เมนูแนะนำ',recommendedToppingIds:['keep-reference']});expect(saved.revisionCycles[0].comments[0].content).toBe('เก็บประวัตินี้ไว้');
 const opened=page.waitForEvent('popup');await page.getByRole('button',{name:/ปริ้นท์/}).click();const report=await opened;await expect(report.locator('#store-details')).toContainText(store.name);await expect(report.locator('#store-sop')).toContainText('เมนูเปลี่ยนชื่อ');await expect(report.locator('#store-sop')).toContainText('พักขาย');await expect(report.locator('[data-menu-id]')).toHaveCount(0);await expect(report.locator('#recorded-history')).toContainText('เก็บประวัตินี้ไว้');await report.close();
 await page.getByRole('button',{name:'นำเมนู เมนูเปลี่ยนชื่อ ออกจากร้าน',exact:true}).click();const confirm=page.getByRole('dialog',{name:'ยืนยันนำเมนูออกจากร้าน'});await confirm.getByRole('button',{name:'ยืนยันนำออกจากร้าน',exact:true}).click();await expect(confirm).toHaveCount(0);await page.reload();
 db=await read();expect(db.franchiseStores.find((s:any)=>s.id===store.id).menuItems).toHaveLength(0);expect(db.franchiseStores.find((s:any)=>s.id===other.id).menuItems).toHaveLength(1);expect(db.leadLabItems.some((l:any)=>l.id===lab.id)).toBeTruthy();
});

test('R&D editing preserves specification, history and ID; deletion moves it to trash', async ({page}) => {
 const {lab,read}=await setup(page,'lab-'+Date.now());const before=(await read()).leadLabItems.find((l:any)=>l.id===lab.id);
 await page.goto(`/?tab=lead_lab&view=${lab.id}`);await page.getByRole('button',{name:'แก้ไขสูตร',exact:true}).click();
 const form=page.getByRole('dialog',{name:'แบบฟอร์มสูตร'});await expect(form).toBeVisible();await form.getByLabel('ชื่อสูตรภาษาไทย').fill('สูตรแก้ไขพร้อมใช้');await form.getByLabel('คำอธิบายสูตร').fill('ปรับคำอธิบายโดยไม่ล้างส่วนอื่น');await form.getByRole('button',{name:'บันทึกการแก้ไขสูตร',exact:true}).click();await expect(form).toHaveCount(0);
 await page.reload();await expect(page.getByRole('heading',{name:'สูตรแก้ไขพร้อมใช้',exact:true,level:2})).toBeVisible();const after=(await read()).leadLabItems.find((l:any)=>l.id===lab.id);
 for (const key of ['id','status','technicalSpecs','ingredients','sweetnessLevels','revisionCycles','likedBy','createdAt','createdById','audioNotes','videos','galleryPhotos']) expect(after[key],key).toEqual(before[key]);
 page.once('dialog', d=>d.accept());await page.getByRole('button',{name:'ลบสูตร',exact:true}).click();await expect(page.getByRole('button',{name:'แก้ไขสูตร',exact:true})).toHaveCount(0);
 const db=await read();expect(db.leadLabItems.some((l:any)=>l.id===lab.id)).toBeFalsy();const adminLogin=await page.request.post('/api/login',{data:{idOrEmail:'supericez',pin:'qa-only-876543'}});const adminToken=(await adminLogin.json()).token;const adminDb=await (await page.request.get('/api/trash',{headers:{Authorization:`Bearer ${adminToken}`}})).json();expect(adminDb.items.find((l:any)=>l.id===lab.id)).toMatchObject({_trashedFrom:'leadLabItems',name:'สูตรแก้ไขพร้อมใช้'});
});

test('stale menu edits cannot overwrite a newer save; viewer has no editing controls', async ({page,browser}) => {
 const {store,lab,headers,read}=await setup(page,'conflict-'+Date.now());
 await page.goto(`/?tab=franchise_stores&view=${store.id}`);await page.getByRole('button',{name:`แก้ไขเมนู ${lab.name}`,exact:true}).click();const form=page.getByRole('dialog',{name:'แบบฟอร์มเมนูในร้าน'});await form.getByLabel('ราคาขายหน้าร้าน').fill('10');
 const current=(await read()).franchiseStores.find((s:any)=>s.id===store.id);expect((await page.request.post('/api/franchise-stores',{headers,data:{id:store.id,expectedUpdatedAt:current.updatedAt,menuItems:current.menuItems.map((m:any)=>({...m,retailPriceThb:99}))}})).ok()).toBeTruthy();
 await form.getByRole('button',{name:'บันทึกการแก้ไขเมนู',exact:true}).click();await expect(page.getByText('ข้อมูลแบรนด์เปลี่ยนแล้ว', {exact:false})).toBeVisible();await expect(form).toBeVisible();expect((await read()).franchiseStores.find((s:any)=>s.id===store.id).menuItems[0].retailPriceThb).toBe(99);
 const ctx=await browser.newContext({baseURL:'http://127.0.0.1:4173'});const viewer=await ctx.newPage();const login=await viewer.request.post('/api/login',{data:{idOrEmail:'qa-viewer',pin:'qa-only-876543'}});const {token}=await login.json();await viewer.addInitScript(t=>sessionStorage.setItem('vitcha_session_token',t),token);await viewer.goto(`/?tab=franchise_stores&view=${store.id}`);await expect(viewer.getByRole('button',{name:'แอดเมนูเข้าร้าน',exact:true})).toBeDisabled();await expect(viewer.getByRole('button',{name:/^แก้ไขเมนู /})).toHaveCount(0);await expect(viewer.getByRole('button',{name:'ส่งความเห็น',exact:true})).toHaveCount(0);await viewer.goto(`/?tab=lead_lab&view=${lab.id}`);await expect(viewer.getByRole('heading',{name:lab.name,exact:true,level:2})).toBeVisible();await expect(viewer.getByRole('button',{name:'แก้ไขสูตร',exact:true})).toHaveCount(0);await expect(viewer.getByRole('button',{name:'ลบสูตร',exact:true})).toHaveCount(0);await expect(viewer.getByLabel('สถานะการพัฒนาสูตร')).toBeDisabled();await expect(viewer.getByRole('button',{name:'สรุป & ปิดประเด็นรอบนี้',exact:true})).toHaveCount(0);await expect(viewer.getByRole('button',{name:'ส่งคอมเมนต์',exact:true})).toHaveCount(0);await ctx.close();
});

for (const kind of ['lab','store'] as const) test(`${kind} form waits for overlapping media and preserves existing audio attribution`, async ({page})=>{
 const {lab,store,headers,read}=await setup(page,`media-${kind}-${Date.now()}`);
 if(kind==='store')expect((await page.request.post('/api/franchise-stores',{headers,data:{id:store.id,audioNotes:lab.audioNotes}})).ok()).toBeTruthy();
 await page.goto(`/?tab=${kind==='lab'?'lead_lab':'franchise_stores'}&view=${kind==='lab'?lab.id:store.id}`);
 await page.getByRole('button',{name:kind==='lab'?'แก้ไขสูตร':'แก้ไขร้าน',exact:true}).click();
 const form=page.getByRole('dialog',{name:kind==='lab'?'แบบฟอร์มสูตร':'แบบฟอร์มข้อมูลแบรนด์'});
 await page.evaluate(()=>{const NativeImage=window.Image;const descriptor=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src')!;let count=0;window.Image=function(){const img=new NativeImage();Object.defineProperty(img,'src',{get(){return descriptor.get!.call(img)},set(value){setTimeout(()=>descriptor.set!.call(img,value),++count===1?600:2400)}});return img} as typeof Image;});
 const pixel=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=','base64');
 const inputs=form.locator('input[type="file"][accept="image/*"]');
 await inputs.nth(0).setInputFiles({name:'primary.png',mimeType:'image/png',buffer:pixel});
 await inputs.nth(1).setInputFiles({name:'gallery.png',mimeType:'image/png',buffer:pixel});
 const save=form.getByRole('button',{name:kind==='lab'?'บันทึกการแก้ไขสูตร':'บันทึกการแก้ไข',exact:true});
 await expect(save).toBeDisabled(); await expect(form.getByRole('status')).toContainText('กำลังเตรียมไฟล์');
 await expect(save).toBeEnabled({timeout:10000});await save.click();await expect(form).toHaveCount(0);
 const db=await read();const record=(kind==='lab'?db.leadLabItems:db.franchiseStores).find((x:any)=>x.id===(kind==='lab'?lab.id:store.id));
 expect(record.galleryPhotos).toHaveLength(kind==='lab'?2:1);expect(record.audioNotes).toEqual(lab.audioNotes);
});

test('closing an R&D round survives a lost response without closing the next round', async ({page}) => {
 const {lab,read}=await setup(page,'cycle-retry-'+Date.now());
 await page.goto(`/?tab=lead_lab&view=${lab.id}`);
 await page.getByRole('button',{name:'สรุป & ปิดประเด็นรอบนี้',exact:true}).click();
 const summary=page.getByPlaceholder('เขียนข้อสรุปผลการเทสต์',{exact:false});await summary.fill('สรุปรอบแรกสำเร็จ');
 await page.getByPlaceholder('หัวข้อรอบพัฒนาถัดไป',{exact:false}).fill('ทดลองรอบที่สอง');
 let dropped=false;const commands:any[]=[];
 await page.route(`**/api/lead-lab/items/${lab.id}/cycle`,async route=>{commands.push(route.request().postDataJSON());if(!dropped){dropped=true;await route.fetch();await route.abort('failed');}else await route.continue();});
 const confirm=page.getByRole('button',{name:'ยืนยันปิดประเด็นรอบนี้',exact:true});await confirm.click();
 await expect(page.getByText('ยังไม่ได้รับการยืนยันจากเซิร์ฟเวอร์',{exact:false})).toBeVisible();await expect(summary).toHaveValue('สรุปรอบแรกสำเร็จ');
 await confirm.click();await expect(confirm).toHaveCount(0);
 expect(commands).toHaveLength(2);expect(commands[1]).toEqual(commands[0]);
 const cycles=(await read()).leadLabItems.find((x:any)=>x.id===lab.id).revisionCycles;expect(cycles).toHaveLength(2);expect(cycles[1].status).toBe('active');expect(cycles[0].summary).toBe('สรุปรอบแรกสำเร็จ');
});

test('an open R&D summary form cannot close a newer round after teammate sync', async ({page}) => {
 const {lab,headers,read}=await setup(page,'cycle-conflict-'+Date.now());
 await page.goto(`/?tab=lead_lab&view=${lab.id}`);await page.getByRole('button',{name:'สรุป & ปิดประเด็นรอบนี้',exact:true}).click();
 const summary=page.getByPlaceholder('เขียนข้อสรุปผลการเทสต์',{exact:false});await summary.fill('ข้อความที่ยังไม่ส่ง');
 expect((await page.request.post(`/api/lead-lab/items/${lab.id}/cycle`,{headers,data:{action:'close',summary:'เพื่อนปิดรอบไปก่อน',nextTitle:'รอบใหม่ของทีม',expectedCycleNumber:1,operationId:'teammate-close'}})).ok()).toBeTruthy();
 await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await expect(page.getByText('เพื่อนปิดรอบไปก่อน',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'ยืนยันปิดประเด็นรอบนี้',exact:true}).click();await expect(page.getByText('รอบพัฒนานี้ถูกปิดหรือเปลี่ยนแล้ว',{exact:false})).toBeVisible();await expect(summary).toHaveValue('ข้อความที่ยังไม่ส่ง');
 const cycles=(await read()).leadLabItems.find((x:any)=>x.id===lab.id).revisionCycles;expect(cycles).toHaveLength(2);expect(cycles[1].status).toBe('active');
});

for (const kind of ['lab','store'] as const) test(`${kind} comment waits for its attachment before posting`,async({page})=>{
 const {lab,store,read}=await setup(page,'comment-media-'+kind+'-'+Date.now());
 await page.goto(`/?tab=${kind==='lab'?'lead_lab':'franchise_stores'}&view=${kind==='lab'?lab.id:store.id}`);
 const input=page.getByPlaceholder(kind==='lab'?'พิมพ์ความคิดเห็นสำหรับสูตรนี้':'เขียนความคิดเห็น หรือฟีดแบ็กสำหรับร้าน',{exact:false});await input.fill('ภาพแนบต้องไปด้วยกัน');
 const form=input.locator('xpath=ancestor::form');
 await page.route('**/api/drive/session',r=>r.fulfill({json:{directAvailable:false}}));
 let release!:()=>void;const gate=new Promise<void>(resolve=>release=resolve);
 await page.route('**/api/upload',async r=>{await gate;await r.fulfill({json:{url:'/logo.jpg'}});});
 const uploading=page.waitForRequest('**/api/upload');
 await form.locator('input[type="file"]').setInputFiles({name:'comment.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=','base64')});await uploading;
 const send=form.getByRole('button',{name:kind==='lab'?'ส่งคอมเมนต์':'ส่งความเห็น',exact:true});await expect(send).toBeDisabled();
 release();await expect(send).toBeEnabled();await send.click();await expect(input).toHaveValue('');
 const db=await read();const record=(kind==='lab'?db.leadLabItems:db.franchiseStores).find((x:any)=>x.id===(kind==='lab'?lab.id:store.id));
 const matches=record.revisionCycles.flatMap((x:any)=>x.comments).filter((x:any)=>x.content==='ภาพแนบต้องไปด้วยกัน');expect(matches).toHaveLength(1);expect(matches[0].photoUrl).toContain('/logo.jpg');
});
