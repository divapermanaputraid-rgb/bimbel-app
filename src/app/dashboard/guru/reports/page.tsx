import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface SiswaItem {
  id: string;
  nama: string;
  kelas: number;
}

interface UnitProgressItem {
  user_id: string;
  unit_id: string;
  stars: number;
}

export default async function GuruReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ kelas?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") redirect("/dashboard/siswa");

  const { kelas } = await searchParams;
  const filterKelas = kelas ? Number(kelas) : null;

  let query = supabase.from("users").select("id, nama, kelas").eq("role", "siswa");
  if (filterKelas) query = query.eq("kelas", filterKelas);
  const { data: siswaList } = await query.order("kelas");

  const { data: progress } = await supabase
    .from("unit_progress")
    .select("user_id, unit_id, stars");

  const listSiswa = (siswaList || []) as unknown as SiswaItem[];
  const progressList = (progress || []) as unknown as UnitProgressItem[];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📊 Laporan Detail</h2>
          <p className="mt-1 text-sm text-slate-500">Pantau progress unit mandiri siswa.</p>
        </div>
        <form method="GET" className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Filter:</label>
          <select
            name="kelas"
            onChange={(e) => e.target.form?.submit()}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm"
            defaultValue={filterKelas?.toString() ?? ""}
          >
            <option value="">Semua Kelas</option>
            <option value="1">Kelas 1</option>
            <option value="2">Kelas 2</option>
            <option value="3">Kelas 3</option>
            <option value="6">Kelas 6</option>
          </select>
          <noscript>
            <button type="submit" className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white">Filter</button>
          </noscript>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-800 border-b border-slate-200 uppercase text-xs">
            <tr>
              <th className="p-4 font-bold">Nama Siswa</th>
              <th className="p-4 font-bold text-center">Kelas</th>
              <th className="p-4 font-bold text-center">Unit Terselesaikan (≥1 ⭐)</th>
              <th className="p-4 font-bold text-center">Total Bintang</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listSiswa.map((siswa) => {
              const myProg = progressList.filter(p => p.user_id === siswa.id);
              const completed = myProg.filter(p => p.stars >= 1).length;
              const stars = myProg.reduce((sum, p) => sum + (p.stars || 0), 0);
              return (
                <tr key={siswa.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-800">{siswa.nama}</td>
                  <td className="p-4 text-center font-medium">{siswa.kelas}</td>
                  <td className="p-4 text-center font-bold text-emerald-600">{completed} unit</td>
                  <td className="p-4 text-center font-bold text-amber-500">{stars} ⭐</td>
                </tr>
              );
            })}
            {listSiswa.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-slate-400">Belum ada data siswa.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
