export function SummaryCards({ totalSiswa, tugasAktif }: { totalSiswa: number, tugasAktif: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-indigo-500">
        <p className="text-slate-500 text-sm font-medium">Total Siswa</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{totalSiswa}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
        <p className="text-slate-500 text-sm font-medium">Tugas Aktif</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{tugasAktif}</p>
      </div>
    </div>
  );
}
