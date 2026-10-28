import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'release');
fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(path.join(root, 'dist/index.html'))) throw new Error('Run npm run build first.');
const files = ['src', 'server', 'dist', 'public', 'scripts', 'tests', 'deployment', '.github', 'package.json', 'package-lock.json', 'index.html', 'vite.config.ts', 'playwright.config.ts', 'tsconfig.json', 'tsconfig.node.json', 'tailwind.config.js', 'postcss.config.js', 'render.yaml', 'vercel.json', 'SECURITY_AND_QA.md', '.gitignore'];
for (const [source, target] of [['desktop-suppliers.png', 'preview-desktop.png'], ['mobile-stores.png', 'preview-mobile.png'], ['english-china-map.png', 'preview-china-map.png'], ['products-desktop.png', 'preview-products.png'], ['products-mobile.png', 'preview-products-mobile.png'], ['members-desktop.png', 'preview-members.png'], ['invitation-desktop.png', 'preview-invitation.png'], ['feed-mobile.png', 'preview-feed-mobile.png']]) {
  const screenshot = path.join(root, 'test-results', source);
  if (fs.existsSync(screenshot)) fs.copyFileSync(screenshot, path.join(outputDir, target));
  if (fs.existsSync(path.join(outputDir, target))) files.push(`release/${target}`);
}
const target = path.join(outputDir, 'VITCHA-handoff.zip');
const temporary = path.join(outputDir, `.handoff-${randomUUID()}.zip`);
try {
  execFileSync('zip', ['-qr', temporary, ...files.filter(file => fs.existsSync(path.join(root, file))), '-x', 'server/data/*', '*/.DS_Store', '*.tsbuildinfo'], { cwd: root });
  const entries = execFileSync('unzip', ['-Z1', temporary], { encoding: 'utf8' }).trim().split('\n');
  if (entries.some(name => /(^|\/)(\.env[^/]*|node_modules|\.git)(\/|$)/.test(name) || name.startsWith('server/data/') || name.endsWith('database.json'))) throw new Error('Private runtime files found in archive; refusing delivery.');
  for (const required of ['dist/index.html', 'dist/404.html', 'dist/.nojekyll', 'server/app.js', 'package-lock.json']) if (!entries.includes(required)) throw new Error(`Missing release file: ${required}`);
  fs.renameSync(temporary, target);
  const checksum = createHash('sha256').update(fs.readFileSync(target)).digest('hex');
  fs.writeFileSync(`${target}.sha256`, `${checksum}  VITCHA-handoff.zip\n`);
  console.log(`Packaged ${entries.length} entries: ${target}`);
  console.log('Verified: no runtime database, uploads, environment files or node_modules.');
} finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
