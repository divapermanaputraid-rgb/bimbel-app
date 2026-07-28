"use client";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="flex w-full items-center gap-3">
      <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-bold text-slate-500">{current}/{total}</span>
    </div>
  );
}
