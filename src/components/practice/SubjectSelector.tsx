"use client";

type SubjectOption = {
  kode: string;
  nama: string;
  icon: string;
  kelasList: number[];
  completedUnits: number;
  totalUnits: number;
  locked?: boolean;
};

type SubjectSelectorProps = {
  subjects: SubjectOption[];
  onSelect: (kode: string) => void;
};

export function SubjectSelector({ subjects, onSelect }: SubjectSelectorProps) {
  return (
    <div className="space-y-3">
      {subjects.map((s) => {
        const pct =
          s.totalUnits > 0 ? Math.round((s.completedUnits / s.totalUnits) * 100) : 0;
        const kelasLabel =
          s.kelasList.length > 0
            ? `Kelas ${[...s.kelasList].sort((a, b) => a - b).join(", ")}`
            : "Coming soon";

        return (
          <div
            key={s.kode}
            className={`rounded-xl border bg-white p-4 shadow-sm transition duration-200 ${
              s.locked
                ? "border-slate-200 opacity-70"
                : "border-slate-100 hover:scale-[1.01] hover:border-indigo-200"
            }`}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <div className="text-3xl leading-none">{s.icon}</div>
                <h3 className="mt-2 text-base font-bold text-slate-800">{s.nama}</h3>
                <p className="text-xs font-medium text-slate-500">{kelasLabel}</p>
              </div>
              {s.locked && <span className="text-xl">🔒</span>}
            </div>

            {!s.locked && (
              <>
                <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mb-3 text-[11px] font-semibold text-slate-400">
                  {s.completedUnits}/{s.totalUnits} unit · {pct}%
                </p>
                <button
                  type="button"
                  onClick={() => onSelect(s.kode)}
                  className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  🎮 Latihan
                </button>
              </>
            )}

            {s.locked && (
              <button
                type="button"
                disabled
                className="mt-2 w-full rounded-lg bg-slate-100 py-2.5 text-sm font-bold text-slate-400"
              >
                🔒 Terkunci
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
