import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QuizClient } from "../[assignmentId]/quiz-client";

type PageProps = {
  searchParams: { kode?: string };
};

type QuestionRow = {
  id: string | number;
  soal: string | null;
  pilihan: unknown;
  tipe?: string | null;
  data?: unknown;
  audio_text?: string | null;
  kalimat?: string | null;
  kata?: unknown;
  soal_id?: string | null;
  xp?: number | null;
  level?: number | null;
  material_id: string;
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function LatihanCepatPage({ searchParams }: PageProps) {
  const kode = searchParams.kode ?? "";
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

  if (!profile || profile.role !== "siswa") redirect("/dashboard/guru");

  // Unit yang sudah punya bintang / completed
  const { data: progress } = await supabase
    .from("unit_progress")
    .select("unit_id, subject_id, stars, status")
    .eq("user_id", user.id);

  const completedUnitIds = (progress ?? [])
    .filter((p) => (p.stars ?? 0) >= 1 || p.status === "completed")
    .map((p) => p.unit_id);

  if (completedUnitIds.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center p-4 text-center">
        <h1 className="mb-2 text-xl font-bold text-slate-800">⚡ Latihan Cepat</h1>
        <p className="mb-6 text-slate-500">
          Selesaikan minimal 1 unit dulu agar bisa main mode ini.
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

  // Optional filter by subject kode
  let unitIds = completedUnitIds;
  if (kode) {
    const { data: subjects } = await supabase
      .from("subjects")
      .select("id")
      .eq("kode", kode);
    const subjectIds = (subjects ?? []).map((s) => s.id);
    if (subjectIds.length > 0) {
      const { data: mats } = await supabase
        .from("materials")
        .select("id")
        .in("subject_id", subjectIds)
        .in("id", completedUnitIds);
      const filtered = (mats ?? []).map((m) => m.id);
      if (filtered.length > 0) unitIds = filtered;
    }
  }

  const { data: rawQuestions } = await supabase
    .from("questions")
    .select("id, soal, pilihan, tipe, data, audio_text, kalimat, kata, soal_id, xp, level, material_id")
    .in("material_id", unitIds);

  const picked = shuffle((rawQuestions ?? []) as QuestionRow[]).slice(0, 5);

  if (picked.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center p-4 text-center">
        <h1 className="mb-2 text-xl font-bold text-slate-800">Belum ada soal</h1>
        <p className="mb-6 text-slate-500">Bank soal unit selesai masih kosong.</p>
        <Link
          href="/dashboard/siswa/practice"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white"
        >
          Kembali
        </Link>
      </main>
    );
  }

  const questions = picked.map((q) => ({
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

  // Gunakan unit pertama sebagai anchor submit (XP saja; progress per-unit tidak diubah di mode cepat)
  const anchorUnit = unitIds[0];

  return (
    <main className="mx-auto min-h-screen max-w-lg bg-slate-50 p-4 pb-12">
      <QuizClient
        mode="unit"
        unitId={anchorUnit}
        materialTitle={`⚡ Latihan Cepat${kode ? ` · ${kode}` : ""}`}
        questions={questions}
      />
    </main>
  );
}
