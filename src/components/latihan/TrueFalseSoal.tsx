"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

export function TrueFalseSoal({ soal, onSubmit }: { soal: any, onSubmit: (ans: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-slate-800">{soal.soal_id || soal.soal}</h2>
      <div className="flex gap-4">
        {["True", "False"].map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`flex-1 rounded-2xl border-2 py-6 text-center text-xl font-bold transition-all ${
              selected === opt ? "border-indigo-500 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {opt === "True" ? "Benar ✅" : "Salah ❌"}
          </button>
        ))}
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
