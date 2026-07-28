"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";

type Props = {
  soal: any;
  onSubmit: (ans: string) => void;
};

export function ChooseCorrectSoal({ soal, onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const { speak } = useSpeech();

  const pilihan = Array.isArray(soal.pilihan) ? soal.pilihan : Object.values(soal.pilihan || {});

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg leading-[1.8] font-bold text-slate-800">{soal.soal_id || soal.soal}</h2>
      {soal.audio_text && (
        <button onClick={() => speak(soal.audio_text)} className="w-16 h-16 rounded-2xl bg-indigo-100 text-3xl border-2 border-indigo-200">🔊</button>
      )}
      <div className="flex flex-col gap-3">
        {pilihan.map((p: string, idx: number) => {
          const isSelected = selected === p;
          return (
            <button
              key={idx}
              onClick={() => setSelected(p)}
              className={`rounded-2xl border-2 p-4 text-left font-bold transition-all text-lg ${
                isSelected ? "border-indigo-500 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>
      <button
        disabled={!selected}
        onClick={() => selected && onSubmit(selected)}
        className="mt-4 w-full rounded-2xl bg-emerald-500 py-4 text-xl font-bold text-white shadow-[0_4px_0_#10b981] disabled:bg-slate-300 disabled:shadow-none"
      >
        CEK JAWABAN
      </button>
    </div>
  );
}
