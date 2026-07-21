import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { studentId, materialId, dueDate } = await req.json();

    // 1. Get student level
    const { data: student } = await supabase.from("users").select("level").eq("id", studentId).single();
    const level = student?.level || 1;

    // 2. Fetch questions for material + level
    const { data: questions } = await supabase
      .from("questions")
      .select("id")
      .eq("material_id", materialId)
      .eq("level", level);

    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "Tidak ada soal untuk level siswa di materi ini." }, { status: 400 });
    }

    // Shuffle and pick up to 5
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selectedIds = shuffled.slice(0, 5).map(q => q.id);

    // 3. Insert assignment
    const { data: assignment, error: insertError } = await supabase
      .from("assignments")
      .insert({
        guru_id: user.id,
        student_id: studentId,
        material_id: materialId,
        question_ids: selectedIds,
        due_date: dueDate || null,
        status: 'assigned'
      })
      .select("id")
      .single();

    if (insertError) throw insertError;

    // 4. Create notification for student
    await supabase.from("notifications").insert({
      student_id: studentId,
      title: "Tugas Baru! 📝",
      message: "Guru telah memberikan tugas baru. Yuk kerjakan!",
      type: "assignment"
    });

    return NextResponse.json({ success: true, assignmentId: assignment.id });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Server Error" }, { status: 500 });
  }
}
