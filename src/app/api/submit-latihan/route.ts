import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { assignmentId, answers } = await req.json();

    // 1. Fetch assignment & verify ownership
    const { data: assignment } = await supabase
      .from("assignments")
      .select("student_id, question_ids, material_id")
      .eq("id", assignmentId)
      .single();

    if (!assignment || assignment.student_id !== user.id) {
      return NextResponse.json({ error: "Assignment not found or forbidden" }, { status: 403 });
    }

    // 2. Fetch full questions
    const { data: questions } = await supabase
      .from("questions")
      .select("id, jawaban_benar")
      .in("id", assignment.question_ids);

    if (!questions) {
      return NextResponse.json({ error: "Questions not found" }, { status: 404 });
    }

    // 3. Score calculation
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.jawaban_benar) {
        correctCount++;
      }
    });

    const total = assignment.question_ids.length;
    const skor = total > 0 ? Math.round((correctCount / total) * 100) : 100;
    const xpEarned = 50 + Math.floor(skor * 0.5); // Bonus 50 for assignments

    // 4. Update Assignment status
    await supabase.from("assignments").update({ status: "completed" }).eq("id", assignmentId);

    // 5. Upsert Progress
    const { data: existingProgress } = await supabase
      .from("student_progress")
      .select("id")
      .eq("student_id", user.id)
      .eq("material_id", assignment.material_id)
      .single();

    if (existingProgress) {
      await supabase.from("student_progress")
        .update({ status: "completed", skor, completed_at: new Date().toISOString() })
        .eq("id", existingProgress.id);
    } else {
      await supabase.from("student_progress").insert({
        student_id: user.id,
        material_id: assignment.material_id,
        status: "completed",
        skor,
        completed_at: new Date().toISOString(),
        assignment_id: assignmentId
      });
    }

    // 6. Give XP
    await supabase.from("xp_logs").insert({
      student_id: user.id,
      amount: xpEarned,
      reason: "Menyelesaikan Tugas Guru",
      material_id: assignment.material_id
    });

    const { data: profile } = await supabase.from("users").select("xp_total").eq("id", user.id).single();
    if (profile) {
      await supabase.from("users").update({ xp_total: (profile.xp_total || 0) + xpEarned }).eq("id", user.id);
    }

    // (Streak & Achievement checks omitted for brevity in this slice. We use /api/progress logic ideally)

    return NextResponse.json({ success: true, skor, xpEarned });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
