"use client";

type ClassTabsProps = {
  kelasList: number[];
  activeKelas: number | null;
  onSelect: (kelas: number) => void;
};

export function ClassTabs({ kelasList, activeKelas, onSelect }: ClassTabsProps) {
  const sorted = [...kelasList].sort((a, b) => a - b);

  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
      {sorted.map((k) => {
        const active = activeKelas === k;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onSelect(k)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition duration-200 ${
              active
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Kelas {k}
          </button>
        );
      })}
    </div>
  );
}
