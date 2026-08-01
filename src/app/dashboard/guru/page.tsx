import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface StuckProgressItem {
  user_id: string;
  unit_id: string;
  attempts: number;
  users: { nama: string } | null;
}

const SUBJECT_LABEL: Record<string, string> = {
  mtk: 'Matematika', bind: 'Bahasa Indonesia', bing: 'Bahasa Inggris', ipas: 'IPAS'
};

export default async function GuruDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") redirect("/dashboard/siswa");

  const { count: studentCount } = await supabase.from("users").select("id", { count: "exact" }).eq("role", "siswa");

  const { data: kelasCounts } = await supabase
    .from("users")
    .select("kelas")
    .eq("role", "siswa")
    .not("kelas", "is", null);

  const byKelas: Record<number, number> = {};
  (kelasCounts || []).forEach((r: { kelas: number }) => {
    byKelas[r.kelas] = (byKelas[r.kelas] || 0) + 1;
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const { count: latihanCount } = await supabase
    .from("latihan_results")
    .select("id", { count: "exact" })
    .gte("created_at", oneWeekAgo.toISOString());

  const { data: stuckProgress } = await supabase
    .from("unit_progress")
    .select("user_id, unit_id, attempts, users!inner(nama)")
    .gte("attempts", 3)
    .eq("stars", 0);

  const stuckStudents = (stuckProgress || []) as unknown as StuckProgressItem[];

  // Roadmap milik guru ini
  const { data: roadmaps } = await supabase
    .from("roadmap_templates")
    .select("id, kelas, subject_id, semester, title, total_pertemuan, status")
    .eq("guru_id", user.id)
    .eq("status", "active")
    .order("kelas", { ascending: true });

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-800">👨‍🏫 Dashboard Guru</h2>

      {/* Stats */}
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

      {/* ===== ROADMAP SAYA — SECTION UTAMA ===== */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">🗺️ Roadmap Saya</h3>
          <Link
            href="/dashboard/guru/roadmap/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700"
          >
            + Buat Roadmap
          </Link>
        </div>

        {!roadmaps || roadmaps.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-10 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-slate-600 font-medium">Belum ada roadmap.</p>
            <p className="text-slate-400 text-sm mt-1">Buat roadmap dulu untuk mulai mengajar.</p>
            <Link
              href="/dashboard/guru/roadmap/create"
              className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700"
            >
              + Buat Roadmap Pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmaps.map((rm) => (
              <div key={rm.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-800 text-base">
                      {rm.title || `${SUBJECT_LABEL[rm.subject_id] || rm.subject_id} Kelas ${rm.kelas}`}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                        Kelas {rm.kelas}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {SUBJECT_LABEL[rm.subject_id] || rm.subject_id}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                        {rm.semester}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">{rm.total_pertemuan} pertemuan</span>
                </div>

                {/* Aksi */}
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/dashboard/guru/roadmap/${rm.id}/teach`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-bold hover:bg-blue-700"
                  >
                    🎓 Mulai Mengajar
                  </Link>
                  <Link
                    href={`/dashboard/guru/roadmap/${rm.id}`}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Aksi Cepat */}
      <div className="mb-8 rounded-xl border border-indigo-100 bg-indigo-50 p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-indigo-900">⚡ Aksi Cepat</h3>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Link href="/dashboard/guru/reports" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700">📊 Laporan</Link>
          <Link href="/dashboard/guru/absensi" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700">📋 Absensi</Link>
          <Link href="/dashboard/guru/audit" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-700">🤖 AI Audit</Link>
          <Link href="/dashboard/guru/students" className="bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50">👥 Siswa</Link>
        </div>
      </div>

      {/* Siswa Stuck */}
      {stuckStudents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-700 mb-4">🚨 Siswa Perlu Perhatian</h3>
          <div className="space-y-3">
            {stuckStudents.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{s.users?.nama || "Siswa"}</p>
                  <p className="text-sm text-slate-500">Stuck di unit <span className="font-bold text-slate-700">{s.unit_id}</span> ({s.attempts}x coba)</p>
                </div>
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
                  <button type="submit" className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-amber-200">
                    💬 Semangat
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
