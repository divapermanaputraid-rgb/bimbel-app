import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MaterialListClient } from "./material-list-client";

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

  const progressRecord: Record<string, string> = {};
  (progress ?? []).forEach((p) => {
    progressRecord[p.material_id] = p.status;
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

      <MaterialListClient
        subjectId={subjectId}
        filter={filter}
        materials={materials ?? []}
        progressMap={progressRecord}
      />
    </main>
  );
}
