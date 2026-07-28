import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QuizClient } from "./quiz-client";

type PageProps = {
  params: { assignmentId: string };
};

type QuestionRow = {
  id: string | number;
  soal: string | null;
  pilihan: unknown;
  jawaban_benar?: unknown;
  tipe?: string | null;
  data?: unknown;
  audio_text?: string | null;
  kalimat?: string | null;
  kata?: unknown;
  soal_id?: string | null;
  penjelasan_id?: string | null;
  xp?: number | null;
  level?: number | null;
};

function normalizePilihan(raw: unknown): Record<string, string> | string[] | null {
  if (!raw) return null;
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "object") return raw as Record<string, string>;
  if (typeof raw === "string") {
    try {
      return normalizePilihan(JSON.parse(raw));
    } catch {
      return null;
    }
  }
  return null;
}

export default async function LatihanPage({ params }: PageProps) {
  const unitOrAssignmentId = params.assignmentId;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Mode unit (Duolingo): id = material_id e.g. k3-bing-01
  const { data: material } = await supabase
    .from("materials")
    .select("id, judul, subject_id, kelas, file_path")
    .eq("id", unitOrAssignmentId)
    .maybeSingle();

  if (material) {
    const { data: rawQuestions } = await supabase
      .from("questions")
      .select("id, soal, pilihan, jawaban_benar, tipe, data, audio_text, kalimat, kata, soal_id, penjelasan_id, xp, level")
      .eq("material_id", material.id)
      .order("id", { ascending: true });

    const questions = ((rawQuestions ?? []) as QuestionRow[]).map((q) => ({
      id: String(q.id),
      soal: q.soal ?? q.soal_id ?? "Soal",
      pilihan: normalizePilihan(q.pilihan),
      tipe: q.tipe ?? "pilihan_ganda",
      data: q.data ?? null,
      audio_text: q.audio_text ?? null,
      kalimat: q.kalimat ?? null,
      kata: Array.isArray(q.kata) ? q.kata.map(String) : null,
      xp: q.xp ?? 10,
      level: q.level ?? 1,
    }));

    if (questions.length === 0) {
      return (
        <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center p-4 text-center">
          <h1 className="mb-2 text-xl font-bold text-slate-800">Belum ada soal</h1>
          <p className="mb-6 text-slate-500">
            Unit <span className="font-semibold">{material.judul}</span> belum punya bank soal.
          </p>
          <Link
            href="/dashboard/siswa/practice"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white"
          >
            Kembali ke Latihan
          </Link>
        </main>
      );
    }

    return (
      <main className="mx-auto min-h-screen max-w-lg bg-slate-50 p-4 pb-12">
        <QuizClient
          mode="unit"
          unitId={material.id}
          subjectId={material.subject_id}
          materialTitle={material.judul}
          bookPath={material.file_path}
          questions={questions}
        />
      </main>
    );
  }

  // Legacy assignment mode (jika masih ada data lama)
  const { data: assignment } = await supabase
    .from("assignments")
    .select("student_id, question_ids, status, materials(judul)")
    .eq("id", unitOrAssignmentId)
    .maybeSingle();

  if (!assignment || assignment.student_id !== user.id) {
    redirect("/dashboard/siswa/practice");
  }

  if (assignment.status === "completed") {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center p-4 text-center">
        <h1 className="mb-2 text-2xl font-bold text-slate-800">Tugas Selesai</h1>
        <p className="mb-6 text-slate-500">Kamu sudah mengerjakan latihan ini.</p>
        <Link href="/dashboard/siswa/practice" className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white">
          Kembali
        </Link>
      </main>
    );
  }

  const { data: questions } = await supabase
    .from("questions")
    .select("id, soal, pilihan")
    .in("id", assignment.question_ids);

  type AssignmentData = {
    student_id: string;
    question_ids: Array<string | number>;
    status: string;
    materials: { judul: string } | { judul: string }[] | null;
  };

  const typedAssignment = assignment as unknown as AssignmentData;
  const materialTitle = Array.isArray(typedAssignment.materials)
    ? typedAssignment.materials[0]?.judul
    : typedAssignment.materials?.judul || "Latihan";

  const legacyQuestions = (questions || []).map((q) => ({
    id: String(q.id),
    soal: q.soal,
    pilihan: normalizePilihan(q.pilihan),
    tipe: "pilihan_ganda",
    data: null,
    audio_text: null,
    kalimat: null,
    kata: null,
    xp: 10,
    level: 1,
  }));

  return (
    <main className="mx-auto min-h-screen max-w-lg bg-slate-50 p-4 pb-12">
      <QuizClient
        mode="assignment"
        assignmentId={unitOrAssignmentId}
        materialTitle={materialTitle}
        questions={legacyQuestions}
      />
    </main>
  );
}
