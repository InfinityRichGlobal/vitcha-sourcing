import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Keep the handover's pre-commit/pre-push live backup requirement automatic.
// Existing custom hooks are never replaced.
const hooks = execFileSync('git', ['rev-parse', '--git-path', 'hooks'], { encoding: 'utf8' }).trim();
fs.mkdirSync(hooks, { recursive: true });
for (const name of ['pre-commit', 'pre-push']) {
  const file = path.join(hooks, name);
  const marker = '# VITCHA live backup guard';
  if (fs.existsSync(file) && !fs.readFileSync(file, 'utf8').includes(marker)) {
    throw new Error(`Existing ${name} hook must be preserved; integrate the backup command there.`);
  }
  fs.writeFileSync(file, `#!/bin/sh\n${marker}\nset -eu\ncd "$(git rev-parse --show-toplevel)"\nnpm run backup:live\n`, { mode: 0o755 });
}
console.log('Installed live-backup guards for commits and pushes. A failed backup blocks publication.');
