import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function SiswaListPage() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("users")
    .select("id, nama, kelas, level, xp_total")
    .eq("role", "siswa")
    .order("kelas")
    .order("nama");

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-slate-800">Daftar Siswa</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">Nama</th>
              <th className="p-4 font-semibold">Kelas</th>
              <th className="p-4 font-semibold">Level</th>
              <th className="p-4 font-semibold">XP</th>
              <th className="p-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(students || []).map(s => (
              <tr key={s.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-900">{s.nama}</td>
                <td className="p-4 text-slate-600">{s.kelas}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    s.level === 3 ? 'bg-purple-100 text-purple-700' :
                    s.level === 2 ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    Level {s.level}
                  </span>
                </td>
                <td className="p-4 text-slate-600 font-medium">{s.xp_total || 0}</td>
                <td className="p-4">
                  <Link href={`/dashboard/guru/siswa/${s.id}`} className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
            {(!students || students.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Belum ada data siswa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
