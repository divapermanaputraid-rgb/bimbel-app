"use client";

import { UnitCard, type UnitStatus } from "./UnitCard";

export type UnitItem = {
  id: string;
  judul: string;
  emoji: string;
  urutan: number;
  file_path: string;
  status: UnitStatus;
  stars: number;
  best_score: number;
  kelas?: number;
};

type UnitGridProps = {
  units: UnitItem[];
};

export function UnitGrid({ units }: UnitGridProps) {
  if (units.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400">
        Belum ada unit untuk kelas ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {units.map((u) => (
        <UnitCard
          key={u.id}
          number={u.urutan}
          title={u.judul}
          emoji={u.emoji}
          status={u.status}
          stars={u.stars}
          bestScore={u.best_score}
          filePath={u.file_path}
          kelas={u.kelas}
        />
      ))}
    </div>
  );
}
