import { useRef, useState } from 'react';

// Count overlapping batches; a completed image must not unlock a pending video.
export function usePendingMedia() {
  const count = useRef(0);
  const audio = useRef(false);
  const [pending, setPending] = useState(0);
  const [audioBusy, setAudioBusy] = useState(false);
  return {
    busy: pending > 0 || audioBusy,
    hasPending: () => count.current > 0 || audio.current,
    begin: () => { count.current += 1; setPending(count.current); },
    end: () => { count.current = Math.max(0, count.current - 1); setPending(count.current); },
    audioChanged: (value: boolean) => { audio.current = value; setAudioBusy(value); },
  };
}
