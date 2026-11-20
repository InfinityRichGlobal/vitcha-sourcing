// Admit requests before their body parser runs. Waiting requests keep their body
// in the socket rather than allocating several original files/base64 strings at
// once. Release on errors and disconnects as well as successful responses.
export function createUploadLimiter({ concurrency = 1, maxWaiting = 32 } = {}) {
  let active = 0;
  const waiting = [];
  const drain = () => {
    while (active < concurrency && waiting.length) waiting.shift().start();
  };
  return (req, res, next) => {
    if (active >= concurrency && waiting.length >= maxWaiting) {
      res.set('Retry-After', '2');
      return res.status(503).json({ error: 'มีไฟล์กำลังอัปโหลดหลายรายการ กรุณารอสักครู่แล้วลองอีกครั้ง' });
    }
    let started = false, released = false, holding = false, ended = false;
    const entry = { start() {
      if (released) return;
      if (res.destroyed) { release(); return; }
      started = true; active++; next();
    } };
    const release = () => {
      if (released) return;
      released = true;
      res.off('finish', end); res.off('close', end);
      if (started) active--;
      else {
        const index = waiting.indexOf(entry);
        if (index !== -1) waiting.splice(index, 1);
      }
      drain();
    };
    const end = () => { ended = true; if (!holding) release(); };
    // A disconnected client can leave an upstream transfer running. Keep its
    // memory accounted for until that work settles before admitting a retry.
    res.locals.holdUploadSlot = () => {
      holding = true;
      return () => { holding = false; if (ended) release(); };
    };
    res.once('finish', end); res.once('close', end);
    if (active < concurrency) entry.start();
    else waiting.push(entry);
  };
}
