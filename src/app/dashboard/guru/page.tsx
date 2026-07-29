import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface StuckProgressItem {
  user_id: string;
  unit_id: string;
  attempts: number;
  users: { nama: string } | null;
}

export default async function GuruDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") redirect("/dashboard/siswa");

  const { count: studentCount } = await supabase.from("users").select("id", { count: "exact" }).eq("role", "siswa");

  // Count per kelas
  const { data: kelasCounts } = await supabase
    .from("users")
    .select("kelas")
    .eq("role", "siswa")
    .not("kelas", "is", null);

  const byKelas: Record<number, number> = {};
  (kelasCounts || []).forEach((r: { kelas: number }) => {
    byKelas[r.kelas] = (byKelas[r.kelas] || 0) + 1;
  });

  // Query latihan minggu ini (last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const { count: latihanCount } = await supabase
    .from("latihan_results")
    .select("id", { count: "exact" })
    .gte("created_at", oneWeekAgo.toISOString());

  // Query siswa stuck
  const { data: stuckProgress } = await supabase
    .from("unit_progress")
    .select("user_id, unit_id, attempts, users!inner(nama)")
    .gte("attempts", 3)
    .eq("stars", 0);

  const stuckStudents = (stuckProgress || []) as unknown as StuckProgressItem[];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-800">👨‍🏫 Dashboard Guru</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-black text-indigo-600">{studentCount || 0}</div>
          <p className="text-xs text-slate-500 font-bold uppercase mt-1">Total Siswa</p>
          <div className="mt-1 flex flex-wrap justify-center gap-1 text-[10px] text-slate-400">
            {Object.entries(byKelas).sort(([a], [b]) => Number(a) - Number(b)).map(([k, c]) => (
              <span key={k} className="rounded-full bg-indigo-50 px-2 py-0.5 font-semibold">Kls {k}: {c}</span>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-black text-emerald-600">{latihanCount || 0}</div>
          <p className="text-xs text-slate-500 font-bold uppercase mt-1">Lat. Minggu Ini</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-black text-red-500">{stuckStudents.length}</div>
          <p className="text-xs text-slate-500 font-bold uppercase mt-1">Siswa Stuck</p>
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-indigo-100 bg-indigo-50 p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-indigo-900 mb-1">🚀 Aksi Cepat</h3>
          <p className="text-sm text-indigo-700">Akses laporan lengkap kelas.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/guru/reports" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-indigo-700">📊 Lihat Laporan</Link>
          <Link href="/dashboard/guru/students" className="bg-white border border-indigo-200 text-indigo-700 px-5 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-indigo-50">👥 Daftar Siswa</Link>
        </div>
      </div>

      {stuckStudents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2"><span>🚨</span> Siswa Perlu Perhatian</h3>
          <div className="space-y-3">
            {stuckStudents.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{s.users?.nama || "Siswa"}</p>
                  <p className="text-sm text-slate-500">Stuck di unit <span className="font-bold text-slate-700">{s.unit_id}</span> ({s.attempts}x coba)</p>
                </div>
                <div className="flex gap-2">
                  <form action={async () => {
                    "use server";
                    const supabaseClient = await createClient();
                    const { data: { user: actor } } = await supabaseClient.auth.getUser();
                    if (!actor) throw new Error("Unauthorized");

                    const { data: actorProfile } = await supabaseClient.from("users").select("role").eq("id", actor.id).single();
                    if (actorProfile?.role !== "guru") throw new Error("Forbidden");

                    await supabaseClient.from("notifications").insert({
                      student_id: s.user_id,
                      type: "semangat",
                      title: "💪 Semangat dari Kak Diva!",
                      message: "Kamu pasti bisa! Ayo coba lagi! 🌟",
                      is_read: false
                    });
                  }}>
                    <button type="submit" className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-amber-200 transition-colors">
                      💬 Semangat
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
