import fs from 'node:fs';
import path from 'node:path';

// Synchronous transactions are serialized by this single Node process. A temporary
// file and rename keep a failed write from truncating the last good database.
export function createPersistence(file, defaults) {
  function save(data) {
    const next = { ...data, updatedAt: new Date().toISOString() };
    const temp = `${file}.tmp`;
    try {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(temp, JSON.stringify(next, null, 2), { encoding: 'utf8', flag: 'w' });
      fs.renameSync(temp, file);
    } finally {
      if (fs.existsSync(temp)) fs.unlinkSync(temp);
    }
  }

  function read() {
    if (!fs.existsSync(file)) save(defaults);
    // Parse/read errors must propagate. Never replace a damaged database with seeds.
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }

  return { read, save };
}
