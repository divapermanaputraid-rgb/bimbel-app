import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { studentIds, materialId, includeChallenge, dueDate, notes } = await req.json();

  if (!studentIds || !studentIds.length || !materialId) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  // Get all questions for this material
  const { data: questions } = await supabase
    .from("questions")
    .select("id, level")
    .eq("material_id", materialId);
    
  if (!questions || questions.length === 0) {
    return NextResponse.json({ error: "Bank soal kosong untuk materi ini. Harap tambahkan soal terlebih dahulu." }, { status: 400 });
  }

  // Get students level
  const { data: students } = await supabase
    .from("users")
    .select("id, level")
    .in("id", studentIds);

  for (const st of (students || [])) {
    // Basic auto-pick logic based on level
    const l1 = questions.filter(q => q.level === 1).map(q => q.id).sort(() => Math.random() - 0.5);
    const l2 = questions.filter(q => q.level === 2).map(q => q.id).sort(() => Math.random() - 0.5);
    const l3 = questions.filter(q => q.level === 3).map(q => q.id).sort(() => Math.random() - 0.5);

    let picked: number[] = [];
    if (st.level === 1) {
      picked = [...l1].slice(0, 5);
    } else if (st.level === 2) {
      picked = [...l2.slice(0, 3), ...l1.slice(0, 2)];
    } else {
      picked = [...l3.slice(0, 2), ...l2.slice(0, 2), ...l1.slice(0, 1)];
    }

    if (includeChallenge && l3.length > 0) {
      // Pastikan ada soal level 3, kalau belum ada kita selipkan di posisi terakhir
      const hasL3 = picked.some(id => l3.includes(id));
      if (!hasL3) {
        picked.pop(); // buang 1 soal
        picked.push(l3[0]); // tambahkan 1 soal l3
      }
    }
    
    // Fallback if not enough questions
    if (picked.length === 0) picked = questions.slice(0, 5).map(q => q.id);

    // Remove undefined/null just in case
    picked = picked.filter(Boolean);

    // Insert Assignment
    const { data: asgn, error: asgnErr } = await supabase.from("assignments").insert({
      guru_id: user.id,
      student_id: st.id,
      material_id: materialId,
      question_ids: picked,
      due_date: dueDate || null,
      status: 'assigned'
    }).select("id").single();

    if (asgnErr) {
      console.error("Assign error for student", st.id, asgnErr);
      continue;
    }

    // Insert Notification
    if (asgn) {
      await supabase.from("notifications").insert({
        student_id: st.id,
        title: "📝 Tugas Baru!",
        message: `Guru telah mengirim tugas baru. ${notes ? 'Catatan: ' + notes : 'Jangan lupa dikerjakan ya!'}`,
        type: "assignment"
      });
    }
  }

  return NextResponse.json({ success: true });
}
