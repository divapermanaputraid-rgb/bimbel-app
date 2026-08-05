import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { materialId: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const materialId = params.materialId;

  const { data: material, error: matErr } = await supabase
    .from("materials")
    .select("id, judul, deskripsi, kelas, subject_id, file_path, is_active")
    .eq("id", materialId)
    .maybeSingle();

  if (matErr) return NextResponse.json({ error: matErr.message }, { status: 500 });
  if (!material || material.is_active === false) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  const { data: questions, error: qErr } = await supabase
    .from("questions")
    .select("id, soal, tipe, pilihan, jawaban_benar")
    .eq("material_id", materialId)
    .order("id", { ascending: true })
    .limit(20);

  if (qErr) return NextResponse.json({ error: qErr.message }, { status: 500 });

  // total count (bisa >20); untuk flag lengkap
  const { count } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("material_id", materialId);

  const soal_count = count ?? (questions?.length ?? 0);

  const soal = (questions ?? []).map((q) => ({
    id: q.id,
    pertanyaan: q.soal ?? "",
    tipe: q.tipe,
    pilihan: q.pilihan,
    jawaban_benar: q.jawaban_benar,
  }));

  return NextResponse.json({
    material: {
      id: material.id,
      judul: material.judul,
      deskripsi: material.deskripsi,
      kelas: material.kelas,
      subject_id: material.subject_id,
      file_path: material.file_path,
    },
    soal,
    soal_count,
    soal_lengkap: soal_count >= 20,
  });
}
