import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveMapLink } from '../server/map-links.js';

test('map resolver rejects untrusted destinations before any network request',async()=>{
  for(const url of ['http://127.0.0.1/','https://169.254.169.254/','https://maps.app.goo.gl.evil.example/a','https://user:pass@maps.google.com/','https://www.google.com:444/maps','file:///etc/passwd','https://www.google.com/url?q=https://example.com']) {
    let calls=0;await assert.rejects(resolveMapLink(url,async()=>{calls++;return new Response()}),e=>e.status===400);assert.equal(calls,0);
  }
});
test('map resolver validates redirects, accepts relative map links and encoded coordinates',async()=>{
  const requested=[];const fetcher=async url=>{requested.push(url);return requested.length===1?new Response(null,{status:302,headers:{location:'/maps?q=13%2C100'}}):new Response(null,{status:200});};
  assert.deepEqual(await resolveMapLink('https://www.google.com/maps/start',fetcher),{ok:true,lat:13,lng:100,resolvedUrl:'https://www.google.com/maps?q=13%2C100'});
  let calls=0;await assert.rejects(resolveMapLink('https://maps.app.goo.gl/example',async()=>{calls++;return new Response(null,{status:302,headers:{location:'http://127.0.0.1/private'}})}),e=>e.status===400);assert.equal(calls,1);
  assert.equal((await resolveMapLink('https://www.google.com/maps?q=95,200',async()=>new Response())).ok,false);
});

test('Google Maps place pin takes precedence over the viewport center', async () => {
  const result=await resolveMapLink('https://www.google.com/maps/place/Tea/@13,100,12z/data=!3d13.751!4d100.492',async()=>({status:200,headers:new Headers()}));
  assert.equal(result.lat,13.751);assert.equal(result.lng,100.492);
});
