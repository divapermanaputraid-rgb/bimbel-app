"use client";

import Link from "next/link";

export type PracticeUnitStatus = "locked" | "available" | "in_progress" | "completed";

export type PracticeUnit = {
  id: string;
  judul: string;
  urutan: number;
  file_path: string;
  status: PracticeUnitStatus;
  stars: number;
  best_score: number;
  attempts: number;
  badge?: string;
};

type UnitCardProps = {
  unit: PracticeUnit;
};

function starsDisplay(stars: number) {
  const n = Math.min(3, Math.max(0, stars));
  return "⭐".repeat(n) + "☆".repeat(3 - n);
}

function tip(stars: number, status: PracticeUnitStatus): string | null {
  if (status === "locked") return null;
  if (stars >= 3) return "Sempurna! Pertahankan 3 bintang ✨";
  if (stars === 2) return "Ulangi untuk 3 bintang!";
  if (stars === 1) return "Selesaikan untuk 2 bintang!";
  if (status === "available" || status === "in_progress") return "Mulai latihan untuk raih bintang!";
  return null;
}

export function PracticeUnitCard({ unit }: UnitCardProps) {
  const locked = unit.status === "locked";
  const tipText = tip(unit.stars, unit.status);

  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm transition duration-200 ${
        locked ? "border-slate-200 opacity-50" : "border-slate-100"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Unit {unit.urutan}
          </p>
          <h3 className="text-sm font-bold leading-snug text-slate-800">{unit.judul}</h3>
        </div>
        <div className="shrink-0 text-lg leading-none" aria-label={`${unit.stars} bintang`}>
          {locked ? "🔒" : starsDisplay(unit.stars)}
        </div>
      </div>

      {!locked && (
        <p className="mb-3 text-xs text-slate-500">
          Skor terbaik: <span className="font-bold text-slate-700">{unit.best_score}%</span>
          {" · "}
          {unit.attempts}x dikerjakan
        </p>
      )}

      {locked && (
        <p className="mb-3 text-xs font-medium text-slate-500">
          Terkunci — selesaikan Unit {Math.max(1, unit.urutan - 1)} dulu
        </p>
      )}

      {unit.badge && !locked && unit.stars >= 1 && (
        <p className="mb-3 text-xs font-semibold text-amber-600">Badge: {unit.badge}</p>
      )}

      {tipText && !locked && (
        <p className="mb-3 text-xs font-medium text-indigo-600">{tipText}</p>
      )}

      <div className="flex gap-2">
        {locked ? (
          <button
            type="button"
            disabled
            className="flex-1 rounded-lg bg-slate-100 py-2.5 text-sm font-bold text-slate-400"
          >
            Baca Unit {Math.max(1, unit.urutan - 1)} dulu!
          </button>
        ) : (
          <>
            <Link
              href={`/dashboard/siswa/latihan/${unit.id}`}
              className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              🎮 Latihan
            </Link>
            <a
              href={unit.file_path}
              className="flex-1 rounded-lg border border-indigo-200 bg-white py-2.5 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              📖 Buku
            </a>
          </>
        )}
      </div>
    </div>
  );
}
