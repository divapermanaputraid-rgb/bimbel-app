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
  // Progress unit (model Duolingo) — ganti hitungan tugas assign
  const { count: completedUnits } = await supabase
    .from("unit_progress")
    .select("id", { count: "exact" })
    .eq("status", "completed");

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-slate-800">Ringkasan Hari Ini</h2>
      <SummaryCards totalSiswa={studentCount || 0} tugasAktif={completedUnits || 0} />

      <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-indigo-100 bg-indigo-50 p-8 text-center">
        <div className="mb-4 text-4xl">📊</div>
        <h3 className="mb-2 text-xl font-bold text-indigo-900">Pantau progress siswa</h3>
        <p className="mb-6 text-sm text-indigo-700">
          Siswa belajar mandiri. Lihat laporan unit, bintang, dan streak di menu Laporan.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard/guru/students"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            👥 Daftar Siswa
          </Link>
          <Link
            href="/dashboard/guru/reports"
            className="inline-block rounded-lg border border-indigo-200 bg-white px-6 py-3 font-medium text-indigo-700 transition hover:bg-indigo-50"
          >
            📊 Laporan
          </Link>
        </div>
      </div>
    </div>
  );
}
