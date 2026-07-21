"use client";

import Link from "next/link";

type Material = {
  id: string;
  judul: string;
  deskripsi: string | null;
  file_path: string;
  urutan: number;
};

type MaterialListClientProps = {
  subjectId: string;
  filter: string;
  materials: Material[];
  progressMap: Record<string, string>;
};

export function MaterialListClient({ subjectId, filter, materials, progressMap }: MaterialListClientProps) {
  const filteredMaterials = materials.filter((m) => {
    const status = progressMap[m.id];
    if (filter === "belum") {
      return status !== "completed";
    }
    if (filter === "selesai") {
      return status === "completed";
    }
    return true;
  });

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 gap-1 mb-5">
        {[
          { key: "semua", label: "Semua" },
          { key: "belum", label: "Belum Dibaca" },
          { key: "selesai", label: "Selesai" },
        ].map((tab) => {
          const isActive = filter === tab.key;
          return (
            <Link
              key={tab.key}
              href={`/dashboard/siswa/materi/${subjectId}?filter=${tab.key}`}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-colors ${
                isActive ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Materials List */}
      {filteredMaterials.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center text-slate-400 border border-slate-100 shadow-sm">
          Tidak ada materi yang cocok dengan filter.
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredMaterials.map((m) => {
            const status = progressMap[m.id];
            const isCompleted = status === "completed";
            const isInProgress = status === "in_progress";

            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => window.open(m.file_path, "_blank")}
                  className="flex w-full items-start justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-sm border border-slate-100 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex gap-3">
                    <span className="text-2xl mt-0.5" aria-hidden>
                      {isCompleted ? "✅" : "📖"}
                    </span>
                    <div>
                      <span className="block font-bold text-slate-800 text-sm sm:text-base leading-tight">
                        {m.urutan}. {m.judul}
                      </span>
                      {m.deskripsi && (
                        <span className="mt-1 block text-xs text-slate-500 leading-normal">
                          {m.deskripsi}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isCompleted && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Selesai
                      </span>
                    )}
                    {isInProgress && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                        Sedang dibaca
                      </span>
                    )}
                    {!status && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Baru
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
