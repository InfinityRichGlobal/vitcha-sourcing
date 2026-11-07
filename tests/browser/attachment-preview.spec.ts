import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
test.use({viewport:{width:390,height:844},launchOptions:{args:['--disable-gpu']}});

function twoPagePdf() {
  const red='1 0 0 rg 0 0 200 200 re f',blue='0 0 1 rg 0 0 200 200 re f';
  const objects=['<</Type/Catalog/Pages 2 0 R>>','<</Type/Pages/Kids[3 0 R 4 0 R]/Count 2>>','<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]/Resources<<>>/Contents 5 0 R>>','<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]/Resources<<>>/Contents 6 0 R>>',`<</Length ${red.length}>>\nstream\n${red}\nendstream`,`<</Length ${blue.length}>>\nstream\n${blue}\nendstream`];
  let body='%PDF-1.4\n';const offsets=[0];objects.forEach((o,i)=>{offsets.push(Buffer.byteLength(body));body+=`${i+1} 0 obj\n${o}\nendobj\n`;});
  const xref=Buffer.byteLength(body);body+=`xref\n0 7\n0000000000 65535 f \n${offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n ').join('\n')}\ntrailer\n<</Size 7/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(body);
}

test('PDF keeps details open, supports the Back button and browser Back, and downloads the original Thai filename',async({page,context})=>{
  await page.route('https://tiles.openfreemap.org/**',r=>r.fulfill({status:503,body:''}));
  const login=await page.request.post('/api/login',{data:{idOrEmail:'qa-admin',pin:'qa-only-876543'}});
  const {token}=await login.json();const headers={Authorization:`Bearer ${token}`};
  await page.addInitScript(t=>sessionStorage.setItem('vitcha_session_token',t),token);
  const pdf=twoPagePdf();
  const uploaded=await page.request.post('/api/upload',{headers,data:{mimeType:'application/pdf',base64:'data:application/pdf;base64,'+pdf.toString('base64')}});
  expect(uploaded.ok()).toBeTruthy();const {url}=await uploaded.json();
  const id=`pdf-${Date.now()}`,name='ใบเสนอราคา ทดสอบ.pdf';
  const saved=await page.request.post('/api/suppliers',{headers,data:{id,name:'ทดสอบอ่านเอกสาร',category:'เครื่องชงชา/กาแฟ',rating:4,quickTags:[],photos:{storefrontAndAtmosphere:[],contactCards:[]},catalogItems:[],location:{lat:13,lng:100},status:'scouted',attachedFiles:[{id:'pdf',name,url,mimeType:'application/pdf',size:pdf.length}]}});
  expect(saved.ok(),await saved.text()).toBeTruthy();await page.goto(`/?view=${id}&type=supplier`);
  const open=page.getByRole('button',{name:`เปิดดู ${name}`,exact:true});
  await open.click();const preview=page.getByRole('dialog',{name:`ดูเอกสาร ${name}`,exact:true});
  await expect(preview).toBeVisible();await expect(preview.locator('canvas')).toHaveAttribute('data-rendered','true',{timeout:20000});
  expect(await preview.locator('canvas').evaluate((c:HTMLCanvasElement)=>Array.from(c.getContext('2d')!.getImageData(20,20,1,1).data))).toEqual([255,0,0,255]);
  await preview.getByRole('button',{name:'หน้าถัดไป',exact:true}).click();
  await expect(preview.getByRole('img',{name:'PDF หน้า 2',exact:true})).toHaveAttribute('data-rendered','true');
  expect(await preview.locator('canvas').evaluate((c:HTMLCanvasElement)=>Array.from(c.getContext('2d')!.getImageData(20,20,1,1).data))).toEqual([0,0,255,255]);
  expect(context.pages()).toHaveLength(1);
  const downloadPromise=page.waitForEvent('download');await preview.getByRole('button',{name:'ดาวน์โหลด',exact:true}).click();
  const download=await downloadPromise;expect(download.suggestedFilename()).toBe(name);
  expect(await fs.readFile((await download.path())!)).toEqual(pdf);
  await preview.getByRole('button',{name:'กลับหน้ารายละเอียด',exact:true}).click();await expect(preview).toHaveCount(0);await expect(open).toBeVisible();
  await open.click();await expect(preview).toBeVisible();await page.goBack();await expect(preview).toHaveCount(0);await expect(open).toBeVisible();
  await open.click();await expect(preview).toBeVisible();await page.keyboard.press('Escape');await expect(preview).toHaveCount(0);await expect(open).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
