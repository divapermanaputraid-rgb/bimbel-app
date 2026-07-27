"use client";

type SubjectCardProps = {
  kode: string;
  nama: string;
  icon: string;
  kelasList: number[];
  progressPct: number;
  locked?: boolean;
  onOpen: () => void;
};

export function SubjectCard({
  nama,
  icon,
  kelasList,
  progressPct,
  locked = false,
  onOpen,
}: SubjectCardProps) {
  const kelasLabel =
    kelasList.length > 0
      ? `Kelas ${kelasList.sort((a, b) => a - b).join(", ")}`
      : "Belum ada kelas";

  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm transition duration-200 ${
        locked
          ? "border-slate-200 opacity-70"
          : "border-slate-100 hover:scale-[1.02] hover:border-indigo-200"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="text-3xl leading-none">{icon}</div>
          <h3 className="mt-2 text-base font-bold text-slate-800">{nama}</h3>
          <p className="text-xs font-medium text-slate-500">{kelasLabel}</p>
        </div>
        {locked && <span className="text-xl">🔒</span>}
      </div>

      {!locked && (
        <>
          <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mb-3 text-[11px] font-semibold text-slate-400">{progressPct}% progress</p>
          <button
            type="button"
            onClick={onOpen}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            📖 Buka
          </button>
        </>
      )}

      {locked && (
        <button
          type="button"
          disabled
          className="mt-2 w-full rounded-lg bg-slate-100 py-2.5 text-sm font-bold text-slate-400"
        >
          🔒 Terkunci — Coming Soon
        </button>
      )}
    </div>
  );
}
