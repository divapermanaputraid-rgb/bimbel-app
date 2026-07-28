"use client";

import { useCallback } from "react";

// Store globally to prevent AudioContext exhaustion
let globalAudioCtx: any = null;

export function useSound() {
  const playSound = useCallback((type: "correct" | "wrong" | "complete") => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      if (!globalAudioCtx) {
        globalAudioCtx = new AudioContextClass();
      }
      
      const audioCtx = globalAudioCtx;

      if (type === 'correct') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 880; // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'wrong') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 220; // A3
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else if (type === 'complete') {
        [261.63, 329.63, 392.00].forEach((freq, i) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.connect(g);
          g.connect(audioCtx.destination);
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.1 + 0.5);
          o.start(audioCtx.currentTime + i * 0.1);
          o.stop(audioCtx.currentTime + i * 0.1 + 0.5);
        });
        return;
      }
    } catch (e) {
      console.warn("Audio API failed", e);
    }
  }, []);

  return {
    playCorrect: () => playSound("correct"),
    playWrong: () => playSound("wrong"),
    playComplete: () => playSound("complete"),
  };
}
