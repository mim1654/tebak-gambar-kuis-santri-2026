let ctx: AudioContext | null = null;
let musicTimer: number | null = null;
let musicGain: GainNode | null = null;

const getCtx = () => {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch { return null; }
};

const tone = (freq: number, start: number, dur: number, vol: number, type: OscillatorType = 'sine', dest?: AudioNode) => {
  const c = getCtx(); if (!c) return;
  const o = c.createOscillator(); const g = c.createGain();
  o.type = type; o.frequency.value = freq;
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0002), t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(dest ?? c.destination);
  o.start(t); o.stop(t + dur + 0.05);
};

export type Sfx = 'tap' | 'correct' | 'wrong' | 'win';

export const playSfx = (kind: Sfx, volume: number) => {
  const v = Math.min(1, Math.max(0, volume / 100)) * 0.35;
  if (v <= 0) return;
  if (kind === 'tap') tone(660, 0, 0.08, v * 0.6, 'triangle');
  if (kind === 'correct') { tone(523, 0, 0.18, v); tone(659, 0.12, 0.18, v); tone(784, 0.24, 0.35, v); }
  if (kind === 'wrong') { tone(330, 0, 0.18, v * 0.8, 'triangle'); tone(262, 0.16, 0.3, v * 0.8, 'triangle'); }
  if (kind === 'win') [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * 0.14, 0.3, v));
};

const MELODY = [523, 587, 659, 784, 659, 587, 523, 392, 440, 523, 587, 523, 440, 392, 330, 392];

export const startMusic = (volume: number) => {
  stopMusic();
  const c = getCtx(); if (!c) return;
  musicGain = c.createGain();
  musicGain.gain.value = Math.min(1, volume / 100) * 0.12;
  musicGain.connect(c.destination);
  let i = 0;
  const step = () => { if (musicGain) tone(MELODY[i % MELODY.length], 0, 0.4, 0.5, 'sine', musicGain); i++; };
  step();
  musicTimer = window.setInterval(step, 480);
};

export const stopMusic = () => {
  if (musicTimer !== null) { clearInterval(musicTimer); musicTimer = null; }
  if (musicGain) { try { musicGain.disconnect(); } catch { /* ignore */ } musicGain = null; }
};

export const unlockAudio = () => { getCtx(); };
