import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash, createECDH } from 'node:crypto';
import { build } from 'esbuild';
import { createApp } from '../server/app.js';
import { createPushDelivery } from '../server/push.js';
import { createCloudMedia } from '../server/cloud-media.js';

async function setup(t, options = {}) {
 const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-field-'));
 const defaults = { users: ['ice','editor','viewer'].map(id => ({ id: `user-${id}`, emailOrId: id, name: id, alias: id, role: id === 'ice' ? 'admin' : id, pin: 'qa-password' })), suppliers: [], drinkStores: [], invites: [], notifications: [] };
 const server = createApp({dataDir:dir, defaults, ...options}).listen(0,'127.0.0.1'); await new Promise(r=>server.once('listening',r));
 const base = `http://127.0.0.1:${server.address().port}`;
 t.after(async()=>{await new Promise(r=>server.close(r));fs.rmSync(dir,{recursive:true,force:true});});
 const call = async(route, token, body, method='POST') => { const res=await fetch(base+route,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});return {status:res.status,data:await res.json()}; };
 const login=async id=>(await call('/api/login',null,{idOrEmail:id,pin:'qa-password'})).data.token;
 return {dir,base,call,login};
}
const record={id:'field-supplier',name:'Field supplier',category:'Machine',rating:4,quickTags:[],photos:{storefrontAndAtmosphere:[],contactCards:[]},catalogItems:[],location:{lat:13,lng:100},status:'scouted'};
const subscription = suffix => {const curve=createECDH('prime256v1');curve.generateKeys();return {endpoint:`https://web.push.apple.com/${suffix}`,keys:{p256dh:curve.getPublicKey().toString('base64url'),auth:Buffer.alloc(16,1).toString('base64url')}};};

test('60 MB binary upload survives retries, verifies bytes and returns an idempotent result',async t=>{
 const {dir,base,call,login}=await setup(t); const token=await login('editor');
 const size=60*1024*1024; const session=await call('/api/uploads',token,{filename:'field.mov',mimeType:'video/quicktime',fileSize:size});assert.equal(session.status,201);
 const {id,chunkSize}=session.data;const hash=createHash('sha256');
 for(let offset=0;offset<size;offset+=chunkSize){const bytes=Buffer.alloc(Math.min(chunkSize,size-offset),offset/chunkSize);hash.update(bytes);
  const send=()=>fetch(`${base}/api/uploads/${id}/chunk?offset=${offset}`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/octet-stream'},body:bytes});
  let response=await send();assert.equal(response.status,200);assert.equal((await response.json()).offset,offset+bytes.length);
  if(offset===0){response=await send();assert.equal((await response.json()).offset,bytes.length);}
 }
 const result=await call(`/api/uploads/${id}/complete`,token,{});assert.equal(result.status,200);
 assert.deepEqual((await call(`/api/uploads/${id}/complete`,token,{})).data,result.data);
 const saved=fs.readFileSync(path.join(dir,result.data.url));assert.equal(saved.length,size);assert.equal(createHash('sha256').update(saved).digest('hex'),hash.digest('hex'));
 assert.equal(fs.readdirSync(path.join(dir,'pending-uploads')).length,0);
});

test('upload sessions require writer ownership, reject gaps and clean cancellation',async t=>{
 const {dir,base,call,login}=await setup(t);const editor=await login('editor'),admin=await login('ice'),viewer=await login('viewer');
 const payload={filename:'clip.mp4',mimeType:'video/mp4',fileSize:10};
 assert.equal((await call('/api/uploads',null,payload)).status,401);assert.equal((await call('/api/uploads',viewer,payload)).status,403);
 assert.equal((await call('/api/uploads',editor,{...payload,fileSize:2*1024**3+1})).status,413);
 const {id}=(await call('/api/uploads',editor,payload)).data;
 assert.equal((await call(`/api/uploads/${id}/complete`,admin,{})).status,404);
 assert.equal((await call(`/api/uploads/${id}/complete`,editor,{})).status,409);
 const response=await fetch(`${base}/api/uploads/${id}/chunk?offset=5`,{method:'POST',headers:{Authorization:`Bearer ${editor}`,'Content-Type':'application/octet-stream'},body:Buffer.alloc(5)});assert.equal(response.status,409);
 assert.equal((await call(`/api/uploads/${id}`,editor,undefined,'DELETE')).status,200);assert.equal(fs.readdirSync(path.join(dir,'pending-uploads')).length,0);
 assert.equal((await call(`/api/uploads/${id}/complete`,editor,{})).status,404);
});

test('real create and edit events push to other subscribed users; test push uses same delivery and secrets stay private',async t=>{
 const sent=[];const delivery=createPushDelivery(async(sub,payload)=>{sent.push({endpoint:sub.endpoint,payload:JSON.parse(payload)});});
 const {call,login,dir}=await setup(t,{pushDelivery:delivery});const editor=await login('editor'),admin=await login('ice');
 const a=subscription('admin'),e=subscription('editor');
 assert.equal((await call('/api/push/subscribe',admin,{subscription:a})).status,200);assert.equal((await call('/api/push/subscribe',editor,{subscription:e})).status,200);
 assert.equal((await call('/api/push/subscribe',editor,{subscription:{...e,endpoint:'https://127.0.0.1/private'}})).status,400);
 assert.equal((await call('/api/suppliers',editor,record)).status,200);assert.equal(sent.length,1);assert.equal(sent[0].endpoint,a.endpoint);
 assert.equal((await call('/api/suppliers',editor,{...record,name:'Updated field',revision:1})).status,200);assert.equal(sent.length,2);assert.equal(sent[1].payload.targetId,record.id);
 const data=(await call('/api/data',admin,undefined,'GET')).data;
 const encoded=JSON.stringify(data);assert.ok(!encoded.includes('pushVapid'));assert.ok(!encoded.includes(a.endpoint));
 assert.equal((await call('/api/push/test',admin,{endpoint:a.endpoint})).status,200);assert.equal(sent.length,3);
 await call('/api/push/unsubscribe',admin,{endpoint:a.endpoint});await call('/api/suppliers',editor,{...record,name:'Again',revision:2});assert.equal(sent.length,3);
 const saved=JSON.parse(fs.readFileSync(path.join(dir,'database.json')));assert.ok(saved.pushVapid.privateKey);
});

test('expired push subscriptions and provider failures are reported without claiming delivery',async()=>{
 const delivery=createPushDelivery(async()=>{throw Object.assign(new Error('expired'),{statusCode:410});});const s=subscription('expired');
 const result=await delivery.deliver({pushVapid:{}},{title:'Test'},[s]);assert.deepEqual(result,{accepted:0,failed:1});assert.ok(delivery.expired.has(s.endpoint));
});

test('streamed cloud upload verifies bytes and commits media metadata after Google confirms',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'vitcha-cloud-stream-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const bytes=Buffer.alloc(1024*1024,42);const filePath=path.join(dir,'clip.mov');fs.writeFileSync(filePath,bytes);const md5=createHash('md5').update(bytes).digest('hex');let streamed=false,committed=false;
 const media=createCloudMedia({url:'https://fixture.supabase.co',key:'sb_secret_fixture',drive:{clientId:'test',refreshToken:'test',folderId:'root'},request:async(route,options)=>{assert.ok(streamed);assert.equal(JSON.parse(options.body).bytes,bytes.length);committed=true;},fetchImpl:async(target,options)=>{
  if(target.includes('oauth2'))return Response.json({access_token:'test',expires_in:3600});
  if(target.includes('files?q='))return Response.json({files:[{id:'folder'}]});
  if(target.includes('uploadType=resumable'))return new Response('',{headers:{location:'https://www.googleapis.com/upload/session'}});
  if(target.endsWith('/upload/session')){assert.equal(options.duplex,'half');const chunks=[];for await(const c of options.body)chunks.push(c);assert.deepEqual(Buffer.concat(chunks),bytes);streamed=true;return Response.json({id:'file'});}
  if(target.includes('/files/file?'))return Response.json({id:'file',size:bytes.length,mimeType:'video/quicktime',md5Checksum:md5,parents:['folder']});
  throw new Error(`unexpected ${target}`);
 }});
 const result=await media.uploadFromFile({filePath,filename:'clip.mov',mimeType:'video/quicktime',fileSize:bytes.length,signal:new AbortController().signal});assert.match(result,/^\/media\//);assert.ok(committed);
});

test('relative media resolves against Render and supplier galleries remain separate',async()=>{
 const bundle=await build({entryPoints:['src/utils/photoGroups.ts'],bundle:true,write:false,format:'esm',platform:'node'});
 const {getPhotoGroups}=await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
 const groups=getPhotoGroups({...record,type:'supplier',photos:{storefrontAndAtmosphere:['/media/shop'],contactCards:['/uploads/card']},catalogItems:[{photo:'blob:preview',name:'Machine'}]});
 assert.deepEqual(groups.map(g=>g.photos.length),[1,1,1]);assert.equal(groups[1].photos[0].url,'https://vitcha-sourcing-fxjw.onrender.com/uploads/card');assert.equal(groups[2].photos[0].url,'blob:preview');
});

test('service worker displays a system notification and opens its record within the app origin', async () => {
  const { runInNewContext } = await import('node:vm');
  const handlers = {}, shown = [], opened = [];
  const scope = 'https://ui.example/sourcing/';
  const self = { addEventListener: (name, callback) => { handlers[name] = callback; }, registration: { scope, showNotification: async (...args) => { shown.push(args); } }, clients: { matchAll: async () => [], openWindow: async url => opened.push(url) } };
  runInNewContext(fs.readFileSync('public/sw.js','utf8'), { self, URL });
  let pending;
  handlers.push({ data: { json: () => ({ id: 'notice-1', title: 'Updated', body: 'New card', targetId: 'supplier-1', type: 'supplier' }) }, waitUntil: promise => { pending = promise; } });
  await pending;
  assert.equal(shown[0][0], 'Updated'); assert.equal(shown[0][1].body, 'New card'); assert.equal(shown[0][1].tag, 'notice-1');
  handlers.notificationclick({ notification: { close() {}, data: shown[0][1].data }, waitUntil: promise => { pending = promise; } });
  await pending;
  const openedUrl = new URL(opened[0]); assert.equal(openedUrl.origin, 'https://ui.example'); assert.equal(openedUrl.pathname, '/sourcing/'); assert.equal(openedUrl.searchParams.get('notificationTarget'), 'supplier-1');
});

test('logout atomically detaches the push subscription for that session', async t => {
  const { call, login, dir } = await setup(t);
  const token = await login('editor');
  assert.equal((await call('/api/push/subscribe', token, { subscription: subscription('logout') })).status, 200);
  assert.equal((await call('/api/logout', token, {})).status, 200);
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'database.json'))).pushSubscriptions.length, 0);
  assert.equal((await call('/api/push/subscribe', token, { subscription: subscription('late') })).status, 401);
});

test('six original image uploads can hold chunk sessions together and release every slot', async t => {
 const {call,login}=await setup(t);const token=await login('editor');
 const results=await Promise.all(Array.from({length:6},(_,i)=>call('/api/uploads',token,{filename:`original-${i}.png`,mimeType:'image/png',fileSize:9*1024*1024})));
 assert.ok(results.every(r=>r.status===201));
 for(const result of results) assert.equal((await call(`/api/uploads/${result.data.id}`,token,undefined,'DELETE')).status,200);
});
