import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  PracticeClient,
  type MaterialRow,
  type ProgressRow,
  type SubjectRow,
} from "@/components/practice/PracticeClient";

export default async function SiswaPracticePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("role, kelas")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");
  if (profile.role !== "siswa") redirect("/dashboard/guru");

  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, kode, nama, icon, kelas, urutan")
    .order("urutan", { ascending: true });

  const { data: materials } = await supabase
    .from("materials")
    .select("id, kelas, subject_id, judul, deskripsi, file_path, urutan")
    .order("urutan", { ascending: true });

  const { data: progress } = await supabase
    .from("unit_progress")
    .select("unit_id, subject_id, kelas, status, stars, best_score, attempts")
    .eq("user_id", user.id);

  return (
    <PracticeClient
      subjects={(subjects ?? []) as SubjectRow[]}
      materials={(materials ?? []) as MaterialRow[]}
      progress={(progress ?? []) as ProgressRow[]}
      studentKelas={profile.kelas ?? null}
    />
  );
}
