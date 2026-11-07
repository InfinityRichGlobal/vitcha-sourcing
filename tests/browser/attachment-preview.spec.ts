import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
test.use({viewport:{width:390,height:844},launchOptions:{args:['--disable-gpu']}});

test('PDF keeps details open, supports the Back button and browser Back, and downloads the original Thai filename',async({page,context})=>{
  await page.route('https://tiles.openfreemap.org/**',r=>r.fulfill({status:503,body:''}));
  const login=await page.request.post('/api/login',{data:{idOrEmail:'qa-admin',pin:'qa-only-876543'}});
  const {token}=await login.json();const headers={Authorization:`Bearer ${token}`};
  await page.addInitScript(t=>sessionStorage.setItem('vitcha_session_token',t),token);
  const pdf=Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF');
  const uploaded=await page.request.post('/api/upload',{headers,data:{mimeType:'application/pdf',base64:'data:application/pdf;base64,'+pdf.toString('base64')}});
  expect(uploaded.ok()).toBeTruthy();const {url}=await uploaded.json();
  const id=`pdf-${Date.now()}`,name='ใบเสนอราคา ทดสอบ.pdf';
  const saved=await page.request.post('/api/suppliers',{headers,data:{id,name:'ทดสอบอ่านเอกสาร',category:'เครื่องชงชา/กาแฟ',rating:4,quickTags:[],photos:{storefrontAndAtmosphere:[],contactCards:[]},catalogItems:[],location:{lat:13,lng:100},status:'scouted',attachedFiles:[{id:'pdf',name,url,mimeType:'application/pdf',size:pdf.length}]}});
  expect(saved.ok(),await saved.text()).toBeTruthy();await page.goto(`/?view=${id}&type=supplier`);
  const open=page.getByRole('button',{name:`เปิดดู ${name}`,exact:true});
  await open.click();const preview=page.getByRole('dialog',{name:`ดูเอกสาร ${name}`,exact:true});
  await expect(preview).toBeVisible();await expect(preview.locator('iframe')).toHaveAttribute('src',/\/uploads\//);
  expect(context.pages()).toHaveLength(1);
  const downloadPromise=page.waitForEvent('download');await preview.getByRole('button',{name:'ดาวน์โหลด',exact:true}).click();
  const download=await downloadPromise;expect(download.suggestedFilename()).toBe(name);
  expect(await fs.readFile((await download.path())!)).toEqual(pdf);
  await preview.getByRole('button',{name:'กลับหน้ารายละเอียด',exact:true}).click();await expect(preview).toHaveCount(0);await expect(open).toBeVisible();
  await open.click();await expect(preview).toBeVisible();await page.goBack();await expect(preview).toHaveCount(0);await expect(open).toBeVisible();
  await open.click();await expect(preview).toBeVisible();await page.keyboard.press('Escape');await expect(preview).toHaveCount(0);await expect(open).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
