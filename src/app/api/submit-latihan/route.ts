import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function normalizeAnswer(val: unknown): string {
  if (val == null) return "";
  if (typeof val === "string") {
    const t = val.trim();
    // JSON string like "\"fried chicken\"" or plain
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
      try {
        return String(JSON.parse(t)).trim().toLowerCase();
      } catch {
        return t.replace(/^["']|["']$/g, "").trim().toLowerCase();
      }
    }
    return t.toLowerCase();
  }
  if (typeof val === "number" || typeof val === "boolean") return String(val).toLowerCase();
  try {
    return JSON.stringify(val).toLowerCase();
  } catch {
    return String(val).toLowerCase();
  }
}

function isCorrect(userAns: unknown, correct: unknown, pilihan: unknown): boolean {
  const u = normalizeAnswer(userAns);
  if (!u) return false;

  // correct may be jsonb string/number/object
  if (correct != null && typeof correct !== "object") {
    const c = normalizeAnswer(correct);
    if (u === c) return true;
  } else if (typeof correct === "string") {
    const c = normalizeAnswer(correct);
    if (u === c) return true;
  } else if (correct && typeof correct === "object" && !Array.isArray(correct)) {
    // object answers (match) — skip detailed auto-grade for now unless user sent full json
    const c = normalizeAnswer(correct);
    if (u === c) return true;
  }

  // If user selected option key (a/b/c) and pilihan is map
  if (pilihan && typeof pilihan === "object" && !Array.isArray(pilihan)) {
    const map = pilihan as Record<string, unknown>;
    const correctKey = Object.keys(map).find((k) => normalizeAnswer(map[k]) === normalizeAnswer(correct));
    if (correctKey && u === correctKey.toLowerCase()) return true;
    if (correct != null && normalizeAnswer(map[String(userAns)]) === normalizeAnswer(correct)) return true;
  }

  // Array pilihan: user may send text; correct may be text or index letter
  if (Array.isArray(pilihan)) {
    if (typeof correct === "string" || typeof correct === "number") {
      const c = normalizeAnswer(correct);
      if (u === c) return true;
      // correct is letter a/b/c
      if (/^[a-d]$/i.test(String(correct))) {
        const idx = String(correct).toLowerCase().charCodeAt(0) - 97;
        if (idx >= 0 && idx < pilihan.length && normalizeAnswer(pilihan[idx]) === u) return true;
      }
    }
  }

  return false;
}

function starsFromScore(skor: number): number {
  if (skor >= 100) return 3;
  if (skor >= 75) return 2;
  if (skor >= 50) return 1;
  return 0;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const mode: string = body.mode || (body.unitId ? "unit" : "assignment");
    const answers: Record<string, string> = body.answers || {};

    // ========== UNIT MODE (Duolingo) ==========
    if (mode === "unit" && body.unitId) {
      const unitId = String(body.unitId);
      const subjectId = body.subjectId ? String(body.subjectId) : null;

      const { data: material } = await supabase
        .from("materials")
        .select("id, subject_id, kelas")
        .eq("id", unitId)
        .single();

      if (!material) {
        return NextResponse.json({ error: "Unit not found" }, { status: 404 });
      }

      const { data: questions } = await supabase
        .from("questions")
        .select("id, jawaban_benar, pilihan, xp")
        .eq("material_id", unitId);

      if (!questions || questions.length === 0) {
        return NextResponse.json({ error: "Questions not found" }, { status: 404 });
      }

      let correctCount = 0;
      let xpFromQuestions = 0;
      questions.forEach((q) => {
        const qid = String(q.id);
        const ok = isCorrect(answers[qid], q.jawaban_benar, q.pilihan);
        if (ok) {
          correctCount += 1;
          xpFromQuestions += q.xp || 10;
        }
      });

      const total = questions.length;
      const skor = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      const stars = starsFromScore(skor);
      const xpEarned = Math.max(xpFromQuestions, 20 + Math.floor(skor * 0.3));

      // unit_progress upsert
      const { data: existing } = await supabase
        .from("unit_progress")
        .select("id, best_score, stars, attempts")
        .eq("user_id", user.id)
        .eq("unit_id", unitId)
        .maybeSingle();

      const nextBest = Math.max(existing?.best_score ?? 0, skor);
      const nextStars = Math.max(existing?.stars ?? 0, stars);
      const nextAttempts = (existing?.attempts ?? 0) + 1;
      const status = nextStars >= 1 || skor >= 50 ? "completed" : "in_progress";

      const progressPayload = {
        user_id: user.id,
        unit_id: unitId,
        subject_id: subjectId || material.subject_id,
        kelas: material.kelas,
        status,
        stars: nextStars,
        best_score: nextBest,
        attempts: nextAttempts,
        last_attempted_at: new Date().toISOString(),
        completed_at: status === "completed" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      if (existing?.id) {
        await supabase.from("unit_progress").update(progressPayload).eq("id", existing.id);
      } else {
        await supabase.from("unit_progress").insert(progressPayload);
      }

      // Auto-unlock next unit jika mendapat bintang
      if (nextStars >= 1) {
        try {
          const match = unitId.match(/(.*)-(\d+)$/);
          if (match) {
            const prefix = match[1];
            const num = parseInt(match[2], 10);
            const nextNum = String(num + 1).padStart(2, '0');
            const nextUnitId = `${prefix}-${nextNum}`;

            // Cek apakah unit berikutnya valid di tabel materials
            const { data: nextMat } = await supabase
              .from("materials")
              .select("id")
              .eq("id", nextUnitId)
              .maybeSingle();

            if (nextMat) {
              const { data: exNext } = await supabase
                .from("unit_progress")
                .select("id, status")
                .eq("user_id", user.id)
                .eq("unit_id", nextUnitId)
                .maybeSingle();

              if (!exNext) {
                await supabase.from("unit_progress").insert({
                  user_id: user.id,
                  unit_id: nextUnitId,
                  subject_id: subjectId || material.subject_id,
                  kelas: material.kelas,
                  status: 'available'
                });
              } else if (exNext.status === 'locked') {
                await supabase.from("unit_progress").update({ status: 'available' }).eq("id", exNext.id);
              }
            }
          }
        } catch (e) {
          console.error("Auto-unlock error:", e);
        }
      }

      // latihan_results log
      await supabase.from("latihan_results").insert({
        student_id: user.id,
        material_id: unitId,
        skor,
        stars_earned: stars,
        subject_id: subjectId || material.subject_id,
      });

      // XP
      await supabase.from("xp_logs").insert({
        student_id: user.id,
        amount: xpEarned,
        reason: "Latihan unit mandiri",
        material_id: unitId,
      });

      const { data: profile } = await supabase
        .from("users")
        .select("xp_total")
        .eq("id", user.id)
        .single();
      if (profile) {
        await supabase
          .from("users")
          .update({ xp_total: (profile.xp_total || 0) + xpEarned })
          .eq("id", user.id);
      }

      // streak simple bump
      const today = new Date().toISOString().slice(0, 10);
      const { data: streak } = await supabase
        .from("user_streaks")
        .select("id, current_streak, longest_streak, last_activity_date")
        .eq("user_id", user.id)
        .maybeSingle();

      if (streak) {
        const last = streak.last_activity_date;
        let current = streak.current_streak || 0;
        if (last !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const y = yesterday.toISOString().slice(0, 10);
          current = last === y ? current + 1 : 1;
        }
        await supabase
          .from("user_streaks")
          .update({
            current_streak: current,
            longest_streak: Math.max(streak.longest_streak || 0, current),
            last_activity_date: today,
            updated_at: new Date().toISOString(),
          })
          .eq("id", streak.id);
      } else {
        await supabase.from("user_streaks").insert({
          user_id: user.id,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today,
        });
      }

      return NextResponse.json({ success: true, skor, xpEarned, stars: nextStars });
    }

    // ========== LEGACY ASSIGNMENT MODE ==========
    const assignmentId = body.assignmentId;
    if (!assignmentId) {
      return NextResponse.json({ error: "unitId or assignmentId required" }, { status: 400 });
    }

    const { data: assignment } = await supabase
      .from("assignments")
      .select("student_id, question_ids, material_id")
      .eq("id", assignmentId)
      .single();

    if (!assignment || assignment.student_id !== user.id) {
      return NextResponse.json({ error: "Assignment not found or forbidden" }, { status: 403 });
    }

    const { data: questions } = await supabase
      .from("questions")
      .select("id, jawaban_benar, pilihan")
      .in("id", assignment.question_ids);

    if (!questions) {
      return NextResponse.json({ error: "Questions not found" }, { status: 404 });
    }

    let correctCount = 0;
    questions.forEach((q) => {
      if (isCorrect(answers[String(q.id)], q.jawaban_benar, q.pilihan)) correctCount += 1;
    });

    const total = assignment.question_ids.length;
    const skor = total > 0 ? Math.round((correctCount / total) * 100) : 100;
    const xpEarned = 50 + Math.floor(skor * 0.5);

    await supabase.from("assignments").update({ status: "completed" }).eq("id", assignmentId);

    const { data: existingProgress } = await supabase
      .from("student_progress")
      .select("id")
      .eq("student_id", user.id)
      .eq("material_id", assignment.material_id)
      .maybeSingle();

    if (existingProgress) {
      await supabase
        .from("student_progress")
        .update({ status: "completed", skor, completed_at: new Date().toISOString() })
        .eq("id", existingProgress.id);
    } else {
      await supabase.from("student_progress").insert({
        student_id: user.id,
        material_id: assignment.material_id,
        status: "completed",
        skor,
        completed_at: new Date().toISOString(),
        assignment_id: assignmentId,
      });
    }

    await supabase.from("xp_logs").insert({
      student_id: user.id,
      amount: xpEarned,
      reason: "Menyelesaikan Tugas Guru",
      material_id: assignment.material_id,
    });

    const { data: profile } = await supabase
      .from("users")
      .select("xp_total")
      .eq("id", user.id)
      .single();
    if (profile) {
      await supabase
        .from("users")
        .update({ xp_total: (profile.xp_total || 0) + xpEarned })
        .eq("id", user.id);
    }

    return NextResponse.json({ success: true, skor, xpEarned, stars: starsFromScore(skor) });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
