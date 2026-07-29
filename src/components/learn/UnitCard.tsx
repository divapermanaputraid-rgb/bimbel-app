"use client";

export type UnitStatus = "locked" | "available" | "in_progress" | "completed";

type UnitCardProps = {
  number: number;
  title: string;
  emoji: string;
  status: UnitStatus;
  stars?: number;
  bestScore?: number;
  filePath: string | null;
  kelas?: number;
};

const STATUS_STYLE: Record<
  UnitStatus,
  { bg: string; border: string; badge: string; label: string }
> = {
  completed: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "✓✓",
    label: "Selesai",
  },
  in_progress: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "▓▓",
    label: "Progres",
  },
  available: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    badge: "○",
    label: "Siap",
  },
  locked: {
    bg: "bg-slate-100",
    border: "border-slate-200",
    badge: "🔒",
    label: "Terkunci",
  },
};

export function UnitCard({
  number,
  title,
  emoji,
  status,
  stars = 0,
  bestScore = 0,
  filePath,
  kelas,
}: UnitCardProps) {
  const style = STATUS_STYLE[status];
  const canOpen = status !== "locked" && !!filePath;

  function openBook() {
    if (!canOpen || !filePath) return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
    window.location.href = filePath;
  }

  return (
    <button
      type="button"
      disabled={!canOpen}
      onClick={openBook}
      className={`flex flex-col items-center rounded-xl border p-3 text-center shadow-sm transition duration-200 ${style.bg} ${style.border} ${
        canOpen ? "hover:scale-105 active:scale-95" : "cursor-not-allowed opacity-80"
      } ${kelas === 1 ? "border-2 border-amber-300 ring-1 ring-amber-100" : ""}`}
    >
      <div className="mb-1 flex w-full items-center justify-between text-[10px] font-bold text-slate-500">
        <span>#{number}</span>
        <div className="flex items-center gap-1">
          {kelas === 1 && status !== "locked" && <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold text-amber-700">K1</span>}
          <span>{style.badge}</span>
        </div>
      </div>
      <div className={`mb-1 leading-none ${kelas === 1 ? "text-4xl" : "text-3xl"}`}>{status === "locked" ? "🔒" : emoji}</div>
      <p className={`line-clamp-2 min-h-[2.5rem] font-bold leading-tight text-slate-800 ${kelas === 1 ? "text-xs" : "text-[11px]"}`}>
        {title}
      </p>
      <p className="mt-1 text-[10px] font-semibold text-slate-500">{style.label}</p>

      {status === "completed" && (
        <p className="mt-1 text-[10px] text-amber-500">
          {"★".repeat(Math.min(3, Math.max(0, stars)))}
          {"☆".repeat(Math.max(0, 3 - stars))}
        </p>
      )}

      {status === "in_progress" && (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-orange-100">
          <div
            className="h-full rounded-full bg-orange-400"
            style={{ width: `${Math.min(100, Math.max(8, bestScore))}%` }}
          />
        </div>
      )}
    </button>
  );
}
