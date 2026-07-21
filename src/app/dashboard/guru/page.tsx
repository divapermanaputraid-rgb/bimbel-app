import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AssignForm } from "./assign-form";
import { LogoutButton } from "../siswa/logout-button";

export default async function GuruDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("users").select("nama, role").eq("id", user.id).single();
  if (profile?.role !== "guru") redirect("/dashboard/siswa");

  const { data: students } = await supabase.from("users").select("id, nama, kelas, level, xp_total").eq("role", "siswa").order("nama");
  const { data: materials } = await supabase.from("materials").select("id, judul, kelas").order("urutan");

  const { data: recentAssignments } = await supabase
    .from("assignments")
    .select("id, status, due_date, users!student_id(nama), materials(judul)")
    .order("assigned_at", { ascending: false })
    .limit(10);

  // Safely typing the relation results
  type AssignmentResult = {
    id: string;
    status: string;
    due_date: string | null;
    users: { nama: string } | { nama: string }[] | null;
    materials: { judul: string } | { judul: string }[] | null;
  };

  const typedRecentAssignments = (recentAssignments as unknown as AssignmentResult[]) ?? [];

  return (
    <main className="mx-auto min-h-screen max-w-4xl p-6 bg-slate-50">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">👨‍🏫 Dashboard Guru</h1>
          <p className="text-slate-500">Selamat datang, {profile.nama}</p>
        </div>
        <LogoutButton />
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <AssignForm students={students || []} materials={materials || []} />
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span>📊</span> Riwayat Penugasan</h2>
          {typedRecentAssignments.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada tugas yang diberikan.</p>
          ) : (
            <ul className="space-y-3">
              {typedRecentAssignments.map((a) => {
                const userName = Array.isArray(a.users) ? a.users[0]?.nama : a.users?.nama;
                const materialTitle = Array.isArray(a.materials) ? a.materials[0]?.judul : a.materials?.judul;

                return (
                  <li key={a.id} className="text-sm border-b pb-2">
                    <div className="font-semibold text-slate-800">{userName} <span className="text-slate-500 font-normal">→ {materialTitle}</span></div>
                    <div className={`text-xs mt-1 font-bold ${a.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      Status: {a.status}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
