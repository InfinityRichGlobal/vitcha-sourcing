import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { sampleCatalog } from '../server/sample-pack.js';
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'store-report-'));const file=path.join(dir,'report.cjs');
await build({entryPoints:['src/utils/labAndStoreExport.ts'],outfile:file,bundle:true,platform:'node',format:'cjs',logLevel:'silent'});
const {buildFranchiseStoreReportHtml:report,buildLeadLabSpecReportHtml:labReport}=createRequire(import.meta.url)(file);await fs.rm(dir,{recursive:true,force:true});
const fixture=()=>{const d=sampleCatalog();const store=d.franchiseStores[0];return {store,labs:d.leadLabItems,enriched:store.menuItems.map(menuItem=>({menuItem,labItem:d.leadLabItems.find(l=>l.id===menuItem.labItemId)}))};};
test('store report starts with details, preserves SOP zero values, and boards only current available menu in category order',()=>{
 const {store,enriched}=fixture();store.menuItems[0].retailPriceThb=0;enriched[0].labItem.sweetnessLevels.half.syrupMl=0;enriched[0].labItem.sweetnessLevels.zero.brix=0;
 store.menuItems[1].isAvailable=false;store.menuItems[0].category='หมวดทดสอบ';store.menuCategories=['หมวดทดสอบ'];
 const html=report(store,enriched);assert.ok(html.indexOf('id="store-details"')<html.indexOf('id="store-sop"'));assert.ok(html.indexOf('id="store-sop"')<html.indexOf('data-menu-board'));assert.ok(html.indexOf('data-menu-board')<html.indexOf('id="recorded-history"'));
 assert.ok(html.includes('ไซรัป 0 ml'));assert.ok(html.includes('0%: 0 ml / 0 °Bx'));assert.ok(html.includes('฿0'));
 assert.ok(html.includes(`data-menu-id="${store.menuItems[0].id}"`));assert.ok(!html.includes(`data-menu-id="${store.menuItems[1].id}"`));assert.ok(html.includes('พักขาย'));
 assert.ok(html.indexOf(`data-menu-id="${store.menuItems[0].id}"`)<html.indexOf(`data-menu-id="${store.menuItems[2].id}"`));
 store.menuItems=store.menuItems.slice(2);assert.ok(!report(store,enriched).includes(`data-menu-id="${enriched[0].menuItem.id}"`));
});
test('missing links and images are explicit; text and URLs cannot inject report markup',()=>{
 const {store,enriched}=fixture();store.menuItems.push({id:'orphan',labItemId:'missing',customName:'สูตรไม่พบ',isAvailable:true,retailPriceThb:55,displayOrder:99});store.name='<script>bad()</script>';enriched[0].labItem.photoUrl='javascript:alert(1)';store.logoUrl='data:text/html,<script>bad()</script>';
 const html=report(store,enriched);assert.ok(html.includes('รายการไม่พบสูตรที่เชื่อมอยู่'));assert.ok(html.includes('สูตรไม่พบ'));assert.ok(html.includes('ยังไม่มีภาพ'));assert.ok(!html.includes('src="javascript:'));assert.ok(!html.includes('<script>bad()'));assert.ok(html.includes('&lt;script&gt;'));
});
test('both store and lab exports retain every recorded cycle, reply, author, voice and long comment',()=>{
 const {store,enriched}=fixture();const long='ข้อมูลครบถ้วน\n'.repeat(200)+'ท้ายข้อความ';store.revisionCycles=[{cycleNumber:1,title:'รอบแรก',status:'closed',createdAt:'2026-10-30',createdBy:'person',closedAt:'2026-10-31',closedBy:'person',summary:'สรุปการพัฒนา',comments:Array.from({length:7},(_,i)=>({id:'c'+i,authorId:'person',authorName:'Old name',createdAt:'2026-10-30',content:i===6?long:'ความคิดเห็น '+i,likes:[],replies:i===6?[{id:'reply',authorId:'person',content:'คำตอบครบ',voiceUrl:'/audio/sample-feedback-1.m4a',createdAt:'2026-10-31'}]:[]}))}];
 const lab={...enriched[0].labItem,revisionCycles:store.revisionCycles};const users=[{id:'person',alias:'P.Tui',avatar:'/logo.jpg'}];
 for(const html of [report(store,enriched,users),labReport(lab,users)]){assert.ok(html.includes('ท้ายข้อความ'));assert.equal((html.match(/ข้อมูลครบถ้วน/g)||[]).length,200);assert.ok(html.includes('คำตอบครบ'));assert.ok(html.includes('P.Tui'));assert.ok(!html.includes('Old name'));assert.ok(html.includes('สรุปการพัฒนา'));assert.ok(html.includes('https://vitcha-sourcing-fxjw.onrender.com/audio/sample-feedback-1.m4a'));assert.ok(html.includes('actor-avatar'));}
});
