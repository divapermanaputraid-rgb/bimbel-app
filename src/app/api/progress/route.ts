import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Abaikan skor dari client. Route ini hanya untuk "Selesai Membaca Buku".
    // XP flat 20, dicek agar tidak bisa di-farm berulang.
    const { materialId, status } = await req.json();

    if (!materialId || status !== "completed") {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    // Sudah pernah selesai? Jangan kasih XP lagi.
    const { data: existingProgress } = await supabase
      .from("student_progress")
      .select("id")
      .eq("student_id", user.id)
      .eq("material_id", materialId)
      .maybeSingle();

    if (existingProgress) {
      return NextResponse.json({ success: true, message: "Already completed, no new XP", xpEarned: 0 });
    }

    const xpEarned = 20;

    // XP log
    await supabase.from("xp_logs").insert({
      student_id: user.id,
      amount: xpEarned,
      reason: `Selesai membaca: ${materialId}`,
      material_id: materialId,
    });

    // Update total XP
    const { data: profile } = await supabase
      .from("users")
      .select("xp_total, kelas")
      .eq("id", user.id)
      .single();

    if (profile) {
      await supabase
        .from("users")
        .update({ xp_total: (profile.xp_total || 0) + xpEarned })
        .eq("id", user.id);
    }

    // Insert progress (baru pertama kali)
    await supabase.from("student_progress").insert({
      student_id: user.id,
      material_id: materialId,
      status: "completed",
      skor: 100,
      completed_at: new Date().toISOString(),
    });

    // Streak
    const today = new Date().toISOString().split("T")[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split("T")[0];

    const { data: streakRecord } = await supabase
      .from("daily_streaks")
      .select("id, streak_count, last_study_date, longest_streak")
      .eq("student_id", user.id)
      .maybeSingle();

    let newStreak = 1;

    if (!streakRecord) {
      await supabase.from("daily_streaks").insert({
        student_id: user.id,
        streak_count: 1,
        longest_streak: 1,
        last_study_date: today,
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
            last_study_date: today,
          })
          .eq("id", streakRecord.id);
      } else if (lastStudy !== today) {
        await supabase
          .from("daily_streaks")
          .update({
            streak_count: 1,
            last_study_date: today,
          })
          .eq("id", streakRecord.id);
      } else {
        newStreak = streakRecord.streak_count || 1;
      }
    }

    // Badge check (tanpa perfect_score dari skor client)
    try {
      const { count: materialsCompleted } = await supabase
        .from("student_progress")
        .select("id", { count: "exact", head: true })
        .eq("student_id", user.id)
        .eq("status", "completed");

      const userClass = profile?.kelas || 2;

      const { data: allBadges } = await supabase
        .from("achievements")
        .select("*")
        .eq("kelas", userClass);

      const { data: earnedBadges } = await supabase
        .from("student_achievements")
        .select("achievement_id")
        .eq("student_id", user.id);

      const earnedIds = new Set((earnedBadges || []).map((b) => b.achievement_id));
      const availableBadges = (allBadges || []).filter((b) => !earnedIds.has(b.id));

      for (const badge of availableBadges) {
        let earned = false;
        if (badge.condition_type === "complete_materials") {
          earned = (materialsCompleted || 0) >= (badge.condition_value || 1);
        } else if (badge.condition_type === "streak") {
          earned = newStreak >= (badge.condition_value || 1);
        }
        // perfect_score diabaikan di route baca-buku (tidak ada skor kuis)

        if (earned) {
          await supabase.from("student_achievements").insert({
            student_id: user.id,
            achievement_id: badge.id,
          });
          await supabase.from("notifications").insert({
            student_id: user.id,
            title: "Selamat! Badge Baru 🏆",
            message: `Kamu mendapatkan badge: ${badge.name}!`,
            type: "achievement",
          });
        }
      }
    } catch (achErr) {
      console.error("Achievement Error:", achErr);
    }

    return NextResponse.json({ success: true, xpEarned });
  } catch (err: unknown) {
    console.error("API Progress Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
