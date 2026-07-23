import { createClient } from "@/lib/supabase/server";

export default async function TugasListPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: assignments } = await supabase
    .from("assignments")
    .select(`
      id, 
      status, 
      due_date, 
      assigned_at,
      users!student_id(nama),
      materials(judul)
    `)
    .eq("guru_id", user?.id || "")
    .order("assigned_at", { ascending: false });

  // Safely cast relation types
  type AssignmentRow = {
    id: string;
    status: string;
    due_date: string | null;
    assigned_at: string;
    users: { nama: string } | { nama: string }[] | null;
    materials: { judul: string } | { judul: string }[] | null;
  };

  const tasks = (assignments as unknown as AssignmentRow[]) || [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-slate-800">Monitoring Tugas</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">Siswa</th>
              <th className="p-4 font-semibold">Materi</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Batas Waktu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map(a => {
              const userName = Array.isArray(a.users) ? a.users[0]?.nama : a.users?.nama;
              const materialTitle = Array.isArray(a.materials) ? a.materials[0]?.judul : a.materials?.judul;

              return (
                <tr key={a.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-slate-900">{userName || "-"}</td>
                  <td className="p-4 text-slate-700">{materialTitle || "-"}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      a.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      a.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {a.status === 'assigned' ? 'Baru' : a.status === 'in_progress' ? 'Dikerjakan' : 'Selesai'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 font-medium">{a.due_date ? new Date(a.due_date).toLocaleDateString("id-ID") : '-'}</td>
                </tr>
              );
            })}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  Belum ada tugas yang kamu berikan. <a href="/dashboard/guru/assign" className="text-indigo-600 hover:underline">Assign tugas baru</a>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
