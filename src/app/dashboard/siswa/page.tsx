import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ProfileCard } from "./profile-card";
import { SubjectGrid } from "./subject-grid";
import { AchievementGrid } from "./achievement-grid";
import { LearningHistory } from "./learning-history";

export default async function SiswaDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Load user profile
  const { data: profile } = await supabase
    .from("users")
    .select("nama, kelas, level, role, avatar, xp_total")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return (
      <main className="mx-auto max-w-lg p-6">
        <p className="text-red-600">
          Profil belum ada. Hubungi admin untuk setup akun.
        </p>
      </main>
    );
  }

  // Redirect if role is not student
  if (profile.role !== "siswa") {
    redirect("/dashboard/guru");
  }

  const kelas = profile.kelas;

  // Query subjects for user's class
  const { data: subjects } = kelas
    ? await supabase
        .from("subjects")
        .select("id, kode, nama, icon, urutan")
        .eq("kelas", kelas)
        .order("urutan", { ascending: true })
    : { data: [] };

  // Compute materials progress
  // Fetch total materials per subject for this class
  const { data: materialsCount } = kelas
    ? await supabase
        .from("materials")
        .select("subject_id, id")
        .eq("kelas", kelas)
    : { data: [] };

  // Fetch completed materials progress
  const { data: progressCount } = await supabase
    .from("student_progress")
    .select("material_id, status")
    .eq("student_id", user.id)
    .eq("status", "completed");

  const completedSet = new Set((progressCount ?? []).map((p) => p.material_id));

  // Build count map
  const subjectCounts: Record<string, { total: number; completed: number }> = {};
  (subjects ?? []).forEach((s) => {
    subjectCounts[s.id] = { total: 0, completed: 0 };
  });

  (materialsCount ?? []).forEach((m) => {
    if (subjectCounts[m.subject_id]) {
      subjectCounts[m.subject_id].total += 1;
      if (completedSet.has(m.id)) {
        subjectCounts[m.subject_id].completed += 1;
      }
    }
  });

  // Query Streaks (fallback ke user_streaks Duolingo jika ada)
  const { data: streakData } = await supabase
    .from("daily_streaks")
    .select("streak_count")
    .eq("student_id", user.id)
    .maybeSingle();
  let streakCount = streakData?.streak_count || 0;
  if (!streakCount) {
    const { data: us } = await supabase
      .from("user_streaks")
      .select("current_streak")
      .eq("user_id", user.id)
      .maybeSingle();
    streakCount = us?.current_streak || 0;
  }

  // Query Notifications
  const { data: notifications } = await supabase
    .from("notifications")
    .select("id, title, message, type, is_read")
    .eq("student_id", user.id)
    .eq("is_read", false)
    .order("created_at", { ascending: false });

  // Query All Achievements for the class
  const { data: allAchievements } = kelas
    ? await supabase
        .from("achievements")
        .select("id, name, description, icon")
        .eq("kelas", kelas)
        .order("id", { ascending: true })
    : { data: [] };

  // Query Earned Achievements
  const { data: earnedBadges } = await supabase
    .from("student_achievements")
    .select("achievement_id")
    .eq("student_id", user.id);

  const earnedIds = (earnedBadges ?? []).map(b => b.achievement_id);

  // Query XP Logs
  const { data: xpLogs } = await supabase
    .from("xp_logs")
    .select("id, amount, reason, created_at")
    .eq("student_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="mx-auto min-h-screen max-w-lg bg-slate-50 p-4 pb-12">
      {/* Profile header */}
      <ProfileCard
        nama={profile.nama}
        kelas={kelas}
        level={profile.level}
        avatar={profile.avatar ?? "🦁"}
        xp_total={profile.xp_total ?? 0}
        streakCount={streakCount}
        notifications={notifications ?? []}
      />

      {/* Sapaan Personal */}
      <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
        <h2 className="mb-1 text-base font-bold text-indigo-900">
          Halo {profile.nama}! 👋
        </h2>
        <p className="text-xs font-medium leading-normal text-indigo-700">
          Yuk lanjut belajar mandiri! Raih bintang di setiap unit ✨
        </p>
        <div className="mt-3 flex gap-2">
          <Link
            href="/dashboard/siswa/learn"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white"
          >
            📚 Belajar
          </Link>
          <Link
            href="/dashboard/siswa/practice"
            className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-xs font-bold text-indigo-700"
          >
            🎮 Latihan
          </Link>
        </div>
      </div>

      {/* Section: Buku Pelajaran */}
      <SubjectGrid subjects={subjects ?? []} subjectCounts={subjectCounts} />

      {/* Section: Achievement & Badge */}
      <AchievementGrid allAchievements={allAchievements ?? []} earnedIds={earnedIds} />

      {/* Section: Riwayat Belajar */}
      <LearningHistory logs={xpLogs ?? []} />
    </main>
  );
}
