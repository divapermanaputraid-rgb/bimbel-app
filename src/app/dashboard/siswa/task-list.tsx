"use client";

import { useRouter } from "next/navigation";

type Assignment = {
  id: string;
  due_date: string | null;
  status: string | null;
  material: {
    id: string;
    judul: string;
    file_path: string;
  };
};

export function TaskList({ assignments }: { assignments: Assignment[] }) {
  const router = useRouter();

  if (assignments.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm border border-slate-100 mb-6">
        <span className="text-3xl block mb-2" aria-hidden>🎉</span>
        <p className="font-semibold text-slate-800 text-sm">Yeay! Kamu belum ada tugas.</p>
        <p className="text-xs text-slate-500 mt-1">Yuk, lanjut eksplor buku pelajaran!</p>
      </div>
    );
  }

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "assigned":
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">🟡 Baru</span>;
      case "in_progress":
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">🟠 Sedang Dikerjakan</span>;
      case "completed":
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 Selesai</span>;
      case "overdue":
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">🔴 Terlambat</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Kapan saja";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <div className="mb-6">
      <h2 className="mb-3 text-base font-bold text-slate-800 flex items-center gap-2">
        <span>📝</span> Tugas Saya ({assignments.length})
      </h2>
      <ul className="space-y-3">
        {assignments.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => router.push("/dashboard/siswa/latihan/" + task.id)}
              className="flex w-full items-start justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-sm border border-slate-100 hover:border-indigo-300 transition-colors"
            >
              <div className="flex gap-3">
                <span className="text-2xl mt-1" aria-hidden>🔢</span>
                <div>
                  <span className="block font-bold text-slate-800 text-sm sm:text-base leading-tight">
                    {task.material.judul}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Kumpul: {formatDate(task.due_date)}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {getStatusBadge(task.status)}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
