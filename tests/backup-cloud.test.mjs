import test from 'node:test';
import assert from 'node:assert/strict';
import { readCloudBackup, validateCompleteBackup } from '../scripts/backup-cloud.mjs';
const data = { users:[{id:'user-ice',pinHash:'complete-credential-hash'}],invites:[],suppliers:[{id:'current-record'}],drinkStores:[],revision:999 };

test('outage backup reads current cloud state, runtime and every media page without any mutation', async () => {
  const ranges = [];
  const backup = await readCloudBackup({ url:'https://production.supabase.co',key:'sb_secret_test',fetchImpl:async (url, options) => {
    assert.equal(options.method,'GET'); assert.equal(options.body,undefined); assert.equal(options.headers.apikey,'sb_secret_test'); assert.equal(options.headers.Authorization,undefined);
    if(url.includes('/vitcha_state?')) return Response.json([{version:999,body:data}]);
    if(url.includes('/vitcha_runtime?')) return Response.json([{key:'google_drive',value:{folderId:'existing-folder'}}]);
    assert.ok(url.includes('/vitcha_media?select=*&order=id.asc')); ranges.push(options.headers.Range);
    const start=Number(options.headers.Range.split('-')[0]);return Response.json(Array.from({length:start===0?500:2},(_,i)=>({id:start+i,provider:'drive',file_id:`file-${start+i}`})));
  }});
  assert.deepEqual(backup.data,data);assert.equal(backup.version,999);assert.equal(backup.runtime[0].key,'google_drive');assert.equal(backup.media.length,502);assert.deepEqual(ranges,['0-499','500-999']);
});

test('backup rejects incomplete or sanitized data and does not mistake it for recovery', async () => {
  for(const invalid of [null,{}, {...data,users:[]}, {...data,users:[{id:'user-ice'}]}, {...data,invites:null}]) assert.throws(()=>validateCompleteBackup(invalid),/Incomplete backup/);
  for(const body of [[],[{version:999,body:{...data,users:[]}}]]) {
    await assert.rejects(readCloudBackup({url:'https://production.supabase.co',key:'test',fetchImpl:async()=>Response.json(body)}));
  }
});

test('backup rejects invalid configuration and upstream failure without leaking secrets', async () => {
  await assert.rejects(readCloudBackup({url:'https://other.example',key:'private'}),/configuration/);
  await assert.rejects(readCloudBackup({url:'https://production.supabase.co',key:'private',fetchImpl:async()=>new Response('private server details',{status:503})}),error=>error.message==='Read-only cloud backup failed (503).');
});
