import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import {createCloudMedia} from '../server/cloud-media.js';

for (const provider of ['drive','supabase']) test(`${provider} downloads stream original bytes and preserve Thai filenames safely`, async t => {
  const bytes=Buffer.from('%PDF-1.4\noriginal document bytes');
  const media=createCloudMedia({url:'https://fixture.supabase.co',key:'fixture',drive:{clientId:'client',refreshToken:'refresh'},publicDriveImages:true,
    request:async route=>route.startsWith('/rest/')?[{provider,file_id:'original',mime_type:'application/pdf'}]:{signedURL:'/object/sign/vitcha-media/original?token=fixture'},
    fetchImpl:async url=>url.includes('oauth2')?Response.json({access_token:'fixture',expires_in:3600}):new Response(bytes,{headers:{'content-type':'application/pdf','content-length':String(bytes.length)}}),
  });
  const app=express();app.get('/media/:id',(req,res,next)=>media.serve(req,res).catch(next));
  const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));t.after(()=>new Promise(resolve=>server.close(resolve)));
  const filename='ใบเสนอราคา.pdf';
  const response=await fetch(`http://127.0.0.1:${server.address().port}/media/${'a'.repeat(48)}?download=1&filename=${encodeURIComponent(filename)}`);
  assert.equal(response.status,200);assert.equal(response.redirected,false);
  assert.equal(response.headers.get('content-type'),'application/pdf');
  assert.ok(response.headers.get('content-disposition').includes("filename*=UTF-8''"+encodeURIComponent(filename)));
  assert.deepEqual(Buffer.from(await response.arrayBuffer()),bytes);
  const injected=await fetch(`http://127.0.0.1:${server.address().port}/media/${'a'.repeat(48)}?download=1&filename=${encodeURIComponent('../evil\r\nX-Injected: yes.pdf')}`);
  assert.equal(injected.headers.get('x-injected'),null);assert.match(injected.headers.get('content-disposition'),/^attachment;/);await injected.arrayBuffer();
});
