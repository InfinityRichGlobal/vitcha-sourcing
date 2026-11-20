// Share one limit across photo groups, item lists, comments and attachments.
// Per-component limits alone multiply when several groups upload together.
export const MAX_CONCURRENT_UPLOADS = 2;

type Waiter = {
  start: () => void;
};

let active = 0;
const waiting: Waiter[] = [];

function pump() {
  while (active < MAX_CONCURRENT_UPLOADS && waiting.length) {
    waiting.shift()!.start();
  }
}

function acquire(signal?: AbortSignal): Promise<() => void> {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted();
    const abort = () => {
      const index = waiting.indexOf(waiter);
      if (index >= 0) waiting.splice(index, 1);
      reject(signal?.reason ?? new DOMException('ยกเลิกการอัปโหลด', 'AbortError'));
    };
    const waiter: Waiter = {
      start: () => {
        signal?.removeEventListener('abort', abort);
        active++;
        resolve(() => { active--; pump(); });
      },
    };
    signal?.addEventListener('abort', abort, { once: true });
    waiting.push(waiter);
    pump();
  });
}

export async function withUploadSlot<T>(upload: () => Promise<T>, signal?: AbortSignal): Promise<T> {
  const release = await acquire(signal);
  try {
    signal?.throwIfAborted();
    return await upload();
  } finally {
    release();
  }
}
