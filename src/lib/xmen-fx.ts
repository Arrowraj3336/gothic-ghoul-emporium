/**
 * Tiny WebAudio + haptics helper for X-Men easter eggs.
 * Generates all tones on demand — no assets, no license issues.
 * Respects a global mute flag persisted in localStorage under `xmen-muted`.
 */

let ctx: AudioContext | null = null;
function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); }
    catch { return null; }
  }
  return ctx;
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("xmen-muted") === "1";
}
export function setMuted(m: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("xmen-muted", m ? "1" : "0");
  window.dispatchEvent(new CustomEvent("xmen-mute-change"));
}

type Tone = {
  freq: number;
  end?: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  slide?: "up" | "down";
};

function play(tones: Tone[]) {
  if (isMuted()) return;
  const a = ac();
  if (!a) return;
  if (a.state === "suspended") a.resume().catch(() => {});
  const master = a.createGain();
  master.gain.value = 0.22;
  master.connect(a.destination);
  let t = a.currentTime;
  for (const tone of tones) {
    const osc = a.createOscillator();
    const g = a.createGain();
    osc.type = tone.type ?? "sine";
    osc.frequency.setValueAtTime(tone.freq, t);
    if (tone.end !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(0.01, tone.end), t + tone.dur);
    }
    const peak = tone.gain ?? 0.6;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + tone.dur);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + tone.dur + 0.02);
    t += tone.dur;
  }
}

function noise(dur: number, gain = 0.3) {
  if (isMuted()) return;
  const a = ac();
  if (!a) return;
  const buf = a.createBuffer(1, Math.floor(a.sampleRate * dur), a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = a.createBufferSource();
  const g = a.createGain();
  g.gain.value = gain;
  const filt = a.createBiquadFilter();
  filt.type = "highpass";
  filt.frequency.value = 1200;
  src.buffer = buf;
  src.connect(filt).connect(g).connect(a.destination);
  src.start();
}

function haptic(pattern: number | number[]) {
  if (isMuted()) return;
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(pattern); } catch {}
  }
}

export const xfx = {
  loader() { play([{ freq: 220, end: 880, dur: 0.35, type: "sawtooth" }, { freq: 1200, end: 400, dur: 0.25, type: "sine" }]); haptic(30); },
  cerebro() { play([{ freq: 660, dur: 0.12, type: "sine" }, { freq: 990, dur: 0.12 }, { freq: 1320, dur: 0.2 }]); haptic(20); },
  x() { play([{ freq: 800, end: 400, dur: 0.15, type: "square" }]); haptic(15); },
  wolverine() { noise(0.18, 0.5); play([{ freq: 1800, end: 300, dur: 0.18, type: "sawtooth", gain: 0.3 }]); haptic([10, 30, 10]); },
  magneto() { play([{ freq: 60, end: 40, dur: 0.9, type: "sine", gain: 0.7 }]); haptic([40, 40, 40]); },
  storm() { noise(0.4, 0.6); haptic([20, 30, 60]); },
  phoenix() { play([{ freq: 300, end: 1600, dur: 0.5, type: "triangle", gain: 0.6 }]); haptic(50); },
  professor() { play([{ freq: 528, dur: 0.6, type: "sine", gain: 0.35 }]); haptic(15); },
  cyclops() { play([{ freq: 200, end: 1800, dur: 0.35, type: "sawtooth", gain: 0.5 }]); haptic(25); },
  bamf() { noise(0.15, 0.7); play([{ freq: 90, end: 400, dur: 0.2, type: "square", gain: 0.5 }]); haptic([15, 20, 15]); },
  success() { play([{ freq: 523, dur: 0.12 }, { freq: 659, dur: 0.12 }, { freq: 784, dur: 0.18 }, { freq: 1046, dur: 0.28 }]); haptic([30, 40, 60]); },
  ping() { play([{ freq: 1200, dur: 0.08 }]); },
};
