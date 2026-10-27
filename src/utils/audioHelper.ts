// Utility to generate a valid playable PCM WAV Data URI in-browser
// Ensures seeded mockup voice notes and fallback voice recordings play real audible sound on all iOS/Android/Desktop devices.

let cachedDemoWavUri: string | null = null;

export function getDemoVoiceWavDataUri(durationSec = 4): string {
  if (cachedDemoWavUri) return cachedDemoWavUri;

  const sampleRate = 8000;
  const numSamples = sampleRate * durationSec;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); // 16-bit
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Generate a pleasant vocal-cadence melody / chime sequence so the user clearly hears playback working
  const notes = [440, 523.25, 659.25, 587.33, 493.88, 523.25, 440, 392];
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const step = Math.floor(t * 2) % notes.length;
    const freq = notes[step];
    const localT = (t * 2) % 1;
    const envelope = Math.exp(-localT * 3.5) * 0.35;
    const wave =
      Math.sin(2 * Math.PI * freq * t) * 0.7 +
      Math.sin(2 * Math.PI * (freq * 1.5) * t) * 0.2 +
      Math.sin(2 * Math.PI * (freq * 0.5) * t) * 0.1;
    const sample = Math.max(-1, Math.min(1, wave * envelope));
    view.setInt16(44 + i * 2, sample * 32767, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunkSize))
    );
  }

  cachedDemoWavUri = `data:audio/wav;base64,${btoa(binary)}`;
  return cachedDemoWavUri;
}

export function playAlertChime(): void {
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const freqs = [587.33, 880, 1174.66];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.11);
      gain.gain.setValueAtTime(0.18, now + idx * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.11);
      osc.stop(now + idx * 0.11 + 0.36);
    });
  } catch {
    // Ignore audio context restriction errors
  }
}
