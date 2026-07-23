import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { materialId, status, skor = 0 } = await req.json();

    if (!materialId || status !== "completed") {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    // [FIX 2: XP FARMING VULNERABILITY & FIX 4: .maybeSingle()]
    const { data: existingProgress } = await supabase
      .from("student_progress")
      .select("id, status")
      .eq("student_id", user.id)
      .eq("material_id", materialId)
      .maybeSingle();

    if (existingProgress?.status === "completed") {
      // Early exit if already completed, prevent XP farming
      return NextResponse.json({ success: true, xpEarned: 0 });
    }

    // 1. Calculate XP
    const xpEarned = 10 + Math.floor(skor * 0.5);

    // 2. Insert XP Log
    await supabase.from("xp_logs").insert({
      student_id: user.id,
      amount: xpEarned,
      reason: `Selesai: Materi ${materialId}`,
      material_id: materialId
    });

    // 3. Update User Total XP
    const { data: profile } = await supabase
      .from("users")
      .select("xp_total, kelas")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      await supabase
        .from("users")
        .update({ xp_total: (profile.xp_total || 0) + xpEarned })
        .eq("id", user.id);
    }

    // 4. Upsert Progress
    if (existingProgress) {
      await supabase
        .from("student_progress")
        .update({ status: "completed", skor, completed_at: new Date().toISOString() })
        .eq("id", existingProgress.id);
    } else {
      await supabase
        .from("student_progress")
        .insert({
          student_id: user.id,
          material_id: materialId,
          status: "completed",
          skor,
          completed_at: new Date().toISOString()
        });
    }

    // [FIX 3: TIMEZONE BUG BREAK DAILY STREAKS]
    const getLocalDate = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(d);
    const now = new Date();
    const today = getLocalDate(now);

    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getLocalDate(yesterdayDate);

    // [FIX 4: .maybeSingle()]
    const { data: streakRecord } = await supabase
      .from("daily_streaks")
      .select("id, streak_count, last_study_date, longest_streak")
      .eq("student_id", user.id)
      .maybeSingle();

    let newStreak = 1;

    if (!streakRecord) {
      // First time studying
      await supabase.from("daily_streaks").insert({
        student_id: user.id,
        streak_count: 1,
        longest_streak: 1,
        last_study_date: today
      });
    } else {
      const lastStudy = streakRecord.last_study_date;
      if (lastStudy === yesterday) {
        newStreak = (streakRecord.streak_count || 0) + 1;
        await supabase
          .from("daily_streaks")
          .update({
            streak_count: newStreak,
            longest_streak: Math.max(newStreak, streakRecord.longest_streak || 0),
            last_study_date: today
          })
          .eq("id", streakRecord.id);
      } else if (lastStudy !== today) {
        // Streak broken
        await supabase
          .from("daily_streaks")
          .update({
            streak_count: 1,
            last_study_date: today
          })
          .eq("id", streakRecord.id);
      } else {
        newStreak = streakRecord.streak_count || 1;
      }
    }

    return NextResponse.json({ success: true, xpEarned });
  } catch (err: unknown) {
    console.error("API Progress Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
