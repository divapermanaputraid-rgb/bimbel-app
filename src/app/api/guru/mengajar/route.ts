import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function requireGuru() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) } as const;
  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) } as const;
  }
  return { supabase, user } as const;
}

export async function GET(request: NextRequest) {
  const auth = await requireGuru();
  if ("error" in auth) return auth.error;
  const { supabase } = auth;

  const { searchParams } = new URL(request.url);
  const kelasParam = searchParams.get("kelas");
  const subject = searchParams.get("subject");
  const kelas = kelasParam ? Number(kelasParam) : null;

  if (kelas !== null && (Number.isNaN(kelas) || kelas < 1 || kelas > 6)) {
    return NextResponse.json({ error: "kelas must be 1-6" }, { status: 400 });
  }

  // materials aktif
  let matQuery = supabase
    .from("materials")
    .select("id, kelas, subject_id, judul, deskripsi, urutan, file_path")
    .eq("is_active", true);

  if (kelas !== null) matQuery = matQuery.eq("kelas", kelas);
  if (subject) matQuery = matQuery.eq("subject_id", subject);

  const { data: materials, error: matErr } = await matQuery.order("urutan", { ascending: true });
  if (matErr) return NextResponse.json({ error: matErr.message }, { status: 500 });

  const mats = materials ?? [];
  const ids = mats.map((m) => m.id);

  // counts questions per material
  const countMap = new Map<string, number>();
  if (ids.length > 0) {
    const { data: qs, error: qErr } = await supabase
      .from("questions")
      .select("material_id")
      .in("material_id", ids);
    if (qErr) return NextResponse.json({ error: qErr.message }, { status: 500 });
    for (const q of qs ?? []) {
      countMap.set(q.material_id, (countMap.get(q.material_id) ?? 0) + 1);
    }
  }

  // ?kelas=&subject= → list materi
  if (kelas !== null && subject) {
    return NextResponse.json({
      materials: mats.map((m) => ({
        id: m.id,
        judul: m.judul,
        deskripsi: m.deskripsi,
        urutan: m.urutan,
        file_path: m.file_path,
        soal_count: countMap.get(m.id) ?? 0,
      })),
    });
  }

  // aggregate subjects for a kelas (or all)
  type SubjAgg = { subject_id: string; materi_count: number };
  const byKelas = new Map<number, Map<string, number>>();
  for (const m of mats) {
    if (!byKelas.has(m.kelas)) byKelas.set(m.kelas, new Map());
    const sm = byKelas.get(m.kelas)!;
    sm.set(m.subject_id, (sm.get(m.subject_id) ?? 0) + 1);
  }

  if (kelas !== null) {
    const sm = byKelas.get(kelas) ?? new Map();
    const subjects: SubjAgg[] = Array.from(sm.entries()).map(([subject_id, materi_count]) => ({
      subject_id,
      materi_count,
    }));
    return NextResponse.json({ subjects });
  }

  const kelasArr = [1, 2, 3, 4, 5, 6].map((k) => {
    const sm = byKelas.get(k) ?? new Map();
    return {
      kelas: k,
      subjects: Array.from(sm.entries()).map(([subject_id, materi_count]) => ({
        subject_id,
        materi_count,
      })),
    };
  });
  return NextResponse.json({ kelas: kelasArr });
}