import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { createHash, randomBytes, scryptSync } from 'node:crypto';
import { execFileSync, spawn } from 'node:child_process';
import { once } from 'node:events';

const root = process.cwd();
const archive = path.join(root, 'release/VITCHA-handoff.zip');
const expected = fs.readFileSync(`${archive}.sha256`, 'utf8').split(' ')[0];
assert.equal(createHash('sha256').update(fs.readFileSync(archive)).digest('hex'), expected);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-release-check-'));
const unpacked = path.join(temporary, 'app');
fs.mkdirSync(unpacked);
let child;
async function stop() {
  if (!child || child.exitCode !== null) return;
  const exited = once(child, 'exit'); child.kill('SIGTERM'); await exited;
}
try {
  execFileSync('unzip', ['-q', archive, '-d', unpacked]);
  assert.equal(fs.existsSync(path.join(unpacked, 'server/data/database.json')), false);
  assert.equal(fs.existsSync(path.join(unpacked, 'server/data/recovery.json')), false);
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(unpacked, 'node_modules'), 'dir');
  const dataDir = path.join(temporary, 'runtime'); fs.mkdirSync(dataDir);
  const secret = randomBytes(24).toString('hex');
  const recovery = randomBytes(24).toString('hex');
  const salt = randomBytes(16).toString('hex');
  fs.writeFileSync(path.join(dataDir, 'recovery.json'), JSON.stringify({passwordHash: `${salt}:${scryptSync(recovery, salt, 32).toString('hex')}`}), {mode: 0o600});
  const reservation = net.createServer().listen(0, '127.0.0.1'); await once(reservation, 'listening');
  const port = reservation.address().port; await new Promise(resolve => reservation.close(resolve));
  const base = `http://127.0.0.1:${port}`;
  async function start() {
    child = spawn(process.execPath, ['server/index.js'], {cwd: unpacked, env: {...process.env, PORT: String(port), DATA_DIR: dataDir, BOOTSTRAP_PIN: secret, ACCOUNT_RECOVERY_PASSWORD_HASH: ''}, stdio: ['ignore', 'pipe', 'pipe']});
    let ready = false;
    for (let i=0;i<80;i++) {
      if (child.exitCode !== null) throw new Error('Archive server exited before becoming ready');
      try { if ((await fetch(base+'/api/health')).ok) {ready=true;break;} } catch {}
      await new Promise(resolve=>setTimeout(resolve,100));
    }
    assert.ok(ready, 'Archive server starts');
  }
  const request = async (route, body, token) => {
    const response = await fetch(base+route, {method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
    return {status:response.status,data:await response.json()};
  };
  await start();
  assert.equal((await fetch(base)).status,200);
  assert.equal((await request('/api/data')).status,401);
  const login=await request('/api/login',{idOrEmail:'supericez',pin:secret});assert.equal(login.status,200);
  const token=login.data.token;
  const data=(await request('/api/data',undefined,token)).data;assert.equal(data.user.id,'user-ice');assert.ok(!JSON.stringify(data).includes('pinHash'));
  const avatar=`data:image/png;base64,${fs.readFileSync(path.join(unpacked,'tests/fixtures/photo.png')).toString('base64')}`;
  assert.equal((await request('/api/profile/avatar',{avatar,revision:data.user.revision||0},token)).status,200);
  await stop(); await start();
  const restored=await request('/api/login',{idOrEmail:'supericez',pin:recovery});assert.equal(restored.status,200);assert.equal(restored.data.user.avatar,avatar);
  const db=JSON.parse(fs.readFileSync(path.join(dataDir,'database.json'),'utf8'));assert.ok(db.users.find(u=>u.id==='user-ice').pinHash);assert.ok(!db.users.some(u=>u.pin));
  console.log('Release verified: checksum, exclusions, startup, static UI, authenticated API, private runtime configuration, avatar persistence and restart.');
} finally {
  await stop(); fs.rmSync(temporary,{recursive:true,force:true});
}
