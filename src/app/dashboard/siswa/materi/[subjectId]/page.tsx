import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: {
    subjectId: string;
  };
  searchParams: {
    filter?: string;
  };
};

export default async function SubjectMaterialsPage({ params, searchParams }: PageProps) {
  const { subjectId } = params;
  const filter = searchParams.filter ?? "semua";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get student profile
  const { data: profile } = await supabase
    .from("users")
    .select("kelas")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  const kelas = profile.kelas;

  // Get subject info
  const { data: subject } = await supabase
    .from("subjects")
    .select("nama, icon")
    .eq("id", subjectId)
    .single();

  if (!subject) {
    redirect("/dashboard/siswa");
  }

  // Get materials for subject
  const { data: materials } = await supabase
    .from("materials")
    .select("id, judul, deskripsi, file_path, urutan")
    .eq("subject_id", subjectId)
    .eq("kelas", kelas ?? 0)
    .order("urutan", { ascending: true });

  // Get student progress
  const { data: progress } = await supabase
    .from("student_progress")
    .select("material_id, status")
    .eq("student_id", user.id);

  const progressMap = new Map((progress ?? []).map((p) => [p.material_id, p.status]));

  const filteredMaterials = (materials ?? []).filter((m) => {
    const status = progressMap.get(m.id);
    if (filter === "belum") {
      return status !== "completed";
    }
    if (filter === "selesai") {
      return status === "completed";
    }
    return true;
  });

  return (
    <main className="mx-auto min-h-screen max-w-lg bg-slate-50 p-4 pb-12">
      <header className="mb-6">
        <Link
          href="/dashboard/siswa"
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <span>⬅️</span> Kembali ke Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="text-4xl">{subject.icon ?? "📖"}</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{subject.nama}</h1>
            <p className="text-xs text-slate-500 font-medium">Daftar buku materi yang bisa kamu baca</p>
          </div>
        </div>
      </header>

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
            const status = progressMap.get(m.id);
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
    </main>
  );
}
