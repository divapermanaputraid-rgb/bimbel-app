"use client";

type XpLog = {
  id: string;
  amount: number;
  reason: string | null;
  created_at: string;
};

export function LearningHistory({ logs }: { logs: XpLog[] }) {
  if (logs.length === 0) {
    return null; // Don't show section if no history
  }

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-base font-bold text-slate-800 flex items-center gap-2">
        <span>📜</span> Riwayat Belajar
      </h2>
      <ul className="space-y-3">
        {logs.map((log) => (
          <li key={log.id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm border border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">{log.reason ?? "Aktivitas"}</div>
              <div className="text-[10px] text-slate-500">{formatDate(log.created_at)}</div>
            </div>
            <div className="font-bold text-emerald-600 text-sm">
              +{log.amount} XP
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
