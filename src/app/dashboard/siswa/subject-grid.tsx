"use client";

import { useRouter } from "next/navigation";

type Subject = {
  id: string;
  nama: string;
  icon: string | null;
  urutan: number;
};

type SubjectGridProps = {
  subjects: Subject[];
  subjectCounts: Record<string, { total: number; completed: number }>;
};

export function SubjectGrid({ subjects, subjectCounts }: SubjectGridProps) {
  const router = useRouter();

  if (subjects.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm border border-slate-100">
        Belum ada pelajaran terdaftar untuk kelasmu.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-base font-bold text-slate-800 flex items-center gap-2">
        <span>📚</span> Buku Pelajaran
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {subjects.map((sub) => {
          const stats = subjectCounts[sub.id] || { total: 0, completed: 0 };
          const progressPct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => router.push(`/dashboard/siswa/materi/${sub.id}`)}
              className="flex flex-col items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:border-indigo-300 transition-colors text-center"
            >
              <div className="text-3xl mb-1">{sub.icon ?? "📖"}</div>
              <div className="font-bold text-slate-800 text-sm mb-1 leading-tight">{sub.nama}</div>
              <div className="text-xs text-slate-500 mb-3">{stats.total} materi</div>

              {/* Mini progress bar */}
              <div className="w-full">
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-1">
                  {stats.completed}/{stats.total} Selesai
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
