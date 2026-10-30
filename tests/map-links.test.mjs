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

test('pasted map URLs keep the actual destination, encoded coordinates and negative signs', async () => {
  const {build}=await import('esbuild');const {createRequire}=await import('node:module');const fs=await import('node:fs/promises');const os=await import('node:os');const path=await import('node:path');
  const dir=await fs.mkdtemp(path.join(os.tmpdir(),'map-input-'));const file=path.join(dir,'api.cjs');
  try {
    await build({entryPoints:['src/services/api.ts'],outfile:file,bundle:true,platform:'node',format:'cjs',logLevel:'silent'});
    const {parseCoordinatesOrMapUrl:parse}=createRequire(import.meta.url)(file);
    assert.deepEqual(parse('https://www.google.com/maps/place/Tea/@13.75,100.49,12z/data=!3d13.751!4d100.492'),{type:'direct_url',lat:13.751,lng:100.492,url:'https://www.google.com/maps/place/Tea/@13.75,100.49,12z/data=!3d13.751!4d100.492',raw:'13.7510000, 100.4920000'});
    assert.equal(parse('https://www.google.com/maps?q=-33%2C151').lat,-33);
    assert.equal(parse('(-33.8, 151.2)').lat,-33.8);
    assert.equal(parse('0, 100').lat,0);
    for(const value of ['95,200','https://maps.app.goo.gl.evil.example/x','https://www.google.com/maps?q=%ZZ'])assert.equal(parse(value),null);
  } finally {await fs.rm(dir,{recursive:true,force:true});}
});
