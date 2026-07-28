"use client";

import { PracticeUnitCard, type PracticeUnit } from "./UnitCard";

export type StarFilter = "all" | "3" | "2" | "1" | "locked";

type UnitListProps = {
  units: PracticeUnit[];
  filter: StarFilter;
  onFilterChange: (f: StarFilter) => void;
};

const FILTERS: { key: StarFilter; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "3", label: "⭐⭐⭐" },
  { key: "2", label: "⭐⭐" },
  { key: "1", label: "⭐" },
  { key: "locked", label: "🔒 Belum" },
];

function matchesFilter(u: PracticeUnit, filter: StarFilter): boolean {
  if (filter === "all") return true;
  if (filter === "locked") return u.status === "locked" || u.stars === 0;
  if (filter === "3") return u.stars === 3;
  if (filter === "2") return u.stars === 2;
  if (filter === "1") return u.stars === 1;
  return true;
}

export function UnitList({ units, filter, onFilterChange }: UnitListProps) {
  const filtered = units.filter((u) => matchesFilter(u, filter));

  return (
    <div>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onFilterChange(f.key)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400">
          Tidak ada unit untuk filter ini.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((u) => (
            <PracticeUnitCard key={u.id} unit={u} />
          ))}
        </div>
      )}
    </div>
  );
}
