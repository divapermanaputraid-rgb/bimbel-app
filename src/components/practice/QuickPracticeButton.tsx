"use client";

import Link from "next/link";

type QuickPracticeButtonProps = {
  enabled: boolean;
  subjectKode: string;
  completedCount: number;
};

export function QuickPracticeButton({
  enabled,
  subjectKode,
  completedCount,
}: QuickPracticeButtonProps) {
  if (!enabled) {
    return (
      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 opacity-70">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚡</span>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-700">Latihan Cepat</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Selesaikan minimal 1 unit dulu untuk membuka mode ini.
            </p>
          </div>
          <button
            type="button"
            disabled
            className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold text-slate-400"
          >
            🔒
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚡</span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-800">Latihan Cepat</h3>
          <p className="mt-0.5 text-xs text-slate-600">
            5 soal random dari {completedCount} unit selesai · ⭐ +20 XP bonus
          </p>
        </div>
        <Link
          href={`/dashboard/siswa/latihan/cepat?kode=${encodeURIComponent(subjectKode)}`}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
        >
          🎮 MULAI
        </Link>
      </div>
    </div>
  );
}
