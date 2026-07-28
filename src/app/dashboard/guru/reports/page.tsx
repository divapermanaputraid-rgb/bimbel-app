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

export default async function GuruReportsPage() {
  const supabase = await createClient();

  const { data: siswaList } = await supabase
    .from("users")
    .select("id, nama, kelas")
    .eq("role", "siswa")
    .order("kelas");

  const { data: progress } = await supabase
    .from("unit_progress")
    .select("user_id, unit_id, stars");

  const listSiswa = (siswaList || []) as unknown as SiswaItem[];
  const progressList = (progress || []) as unknown as UnitProgressItem[];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-slate-800">📊 Laporan Detail</h2>
      <p className="text-sm text-slate-500 mb-8">Pantau progress unit mandiri siswa.</p>

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
