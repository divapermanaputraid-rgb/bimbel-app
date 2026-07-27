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
      }`}
    >
      <div className="mb-1 flex w-full items-center justify-between text-[10px] font-bold text-slate-500">
        <span>#{number}</span>
        <span>{style.badge}</span>
      </div>
      <div className="mb-1 text-3xl leading-none">{status === "locked" ? "🔒" : emoji}</div>
      <p className="line-clamp-2 min-h-[2.5rem] text-[11px] font-bold leading-tight text-slate-800">
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
