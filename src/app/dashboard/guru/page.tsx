import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SummaryCards } from "./summary-cards";
import Link from "next/link";

export default async function GuruDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") redirect("/dashboard/siswa");

  const { count: studentCount } = await supabase.from("users").select("id", { count: "exact" }).eq("role", "siswa");
  const { count: activeTaskCount } = await supabase.from("assignments").select("id", { count: "exact" }).in("status", ["assigned", "in_progress"]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-slate-800">Ringkasan Hari Ini</h2>
      <SummaryCards totalSiswa={studentCount || 0} tugasAktif={activeTaskCount || 0} />
      
      {/* Quick Action */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 text-center max-w-2xl mx-auto mt-12">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Ingin memberi tugas baru?</h3>
        <p className="text-indigo-700 mb-6 text-sm">Pilih siswa, materi, dan sesuaikan tingkat kesulitan soal dengan mudah.</p>
        <Link href="/dashboard/guru/assign" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
          Mulai Assign Tugas
        </Link>
      </div>
    </div>
  );
}
