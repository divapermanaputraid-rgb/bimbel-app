'use client';

import { useState, useEffect } from 'react';

type ViewMode = 'bulanan' | 'pertemuan' | 'trend';

export default function RekapAbsensiPage() {
  const [kelas, setKelas] = useState(2);
  const [bulan, setBulan] = useState(new Date().toISOString().slice(0, 7));
  const [view, setView] = useState<ViewMode>('bulanan');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [kelas, bulan, view]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/guru/absensi/rekap?kelas=${kelas}&bulan=${bulan}&view=${view}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setData(null);
      }
    } catch (err) {
      console.error(err);
      setData(null);
    }
    setLoading(false);
  };

  const getPercentageColor = (p: number) => {
    if (p < 70) return 'text-red-600 font-bold';
    if (p <= 85) return 'text-amber-600 font-bold';
    return 'text-green-600 font-bold';
  };

  const getTrendColor = (p: number | null) => {
    if (p === null) return 'bg-gray-100';
    if (p < 50) return 'bg-red-200';
    if (p < 100) return 'bg-amber-200';
    return 'bg-green-200';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📊 Rekap Absensi</h1>

      {/* Filter & Tabs */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center mb-6">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
              <select
                className="border rounded-lg p-2 min-w-[120px]"
                value={kelas}
                onChange={(e) => setKelas(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map(k => <option key={k} value={k}>Kelas {k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bulan</label>
              <input
                type="month"
                className="border rounded-lg p-2"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
              />
            </div>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-lg">
            {(['bulanan', 'pertemuan', 'trend'] as ViewMode[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${view === v ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500 animate-pulse">
          Memuat data rekap...
        </div>
      )}

      {/* View: Bulanan */}
      {!loading && view === 'bulanan' && data && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-semibold text-lg">Persentase Kehadiran</h2>
            <span className="text-sm text-gray-500">Total Pertemuan: {data.totalPertemuan}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-medium">Nama Siswa</th>
                  <th className="p-4 font-medium text-center">Hadir</th>
                  <th className="p-4 font-medium text-center">Tidak Hadir</th>
                  <th className="p-4 font-medium text-center">% Kehadiran</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.data?.length === 0 && (
                  <tr><td colSpan={4} className="p-4 text-center text-gray-500">Belum ada data absensi</td></tr>
                )}
                {data.data?.map((siswa: any) => (
                  <tr key={siswa.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{siswa.nama}</td>
                    <td className="p-4 text-center">{siswa.hadir}</td>
                    <td className="p-4 text-center">{siswa.tidakHadir}</td>
                    <td className={`p-4 text-center ${getPercentageColor(siswa.persentase)}`}>
                      {siswa.persentase}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View: Pertemuan */}
      {!loading && view === 'pertemuan' && data && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-lg">Detail Per Pertemuan</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-medium border-r sticky left-0 bg-gray-50">Nama Siswa</th>
                  {data.pertemuan?.map((p: any) => (
                    <th key={p.id} className="p-4 font-medium text-center min-w-[80px]">
                      P{p.pertemuan_ke}
                      <div className="text-xs text-gray-400 font-normal mt-1">
                        {p.tanggal_aktual ? new Date(p.tanggal_aktual).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '-'}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.siswa?.length === 0 && (
                  <tr><td colSpan={100} className="p-4 text-center text-gray-500">Belum ada data</td></tr>
                )}
                {data.siswa?.map((siswa: any) => {
                  let totalHadirRow = 0;
                  return (
                    <tr key={siswa.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900 border-r sticky left-0 bg-white">
                        {siswa.nama}
                      </td>
                      {data.pertemuan?.map((p: any) => {
                        const hadir = siswa.kehadiran[p.id];
                        if (hadir) totalHadirRow++;
                        return (
                          <td key={p.id} className="p-4 text-center text-lg">
                            {hadir ? '✅' : '❌'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {data.pertemuan?.length > 0 && (
                <tfoot className="bg-gray-50 border-t">
                  <tr>
                    <td className="p-4 font-semibold text-right border-r sticky left-0 bg-gray-50">Total Hadir</td>
                    {data.pertemuan.map((p: any) => {
                      const totalHadir = data.siswa?.filter((s:any) => s.kehadiran[p.id]).length || 0;
                      return (
                        <td key={p.id} className="p-4 text-center font-bold text-gray-700">
                          {totalHadir}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}

      {/* View: Trend */}
      {!loading && view === 'trend' && data && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-lg">Pola Trend (4 Minggu)</h2>
          </div>
          <div className="p-5">
            {data.data?.length === 0 ? (
              <p className="text-center text-gray-500">Belum ada data untuk dilihat trend-nya.</p>
            ) : (
              <div className="space-y-4">
                <div className="flex text-xs font-medium text-gray-500 mb-2">
                  <div className="w-1/3">Siswa</div>
                  <div className="w-1/2 flex justify-between px-2">
                    <span>Minggu 1</span>
                    <span>Minggu 2</span>
                    <span>Minggu 3</span>
                    <span>Minggu 4</span>
                  </div>
                  <div className="w-1/6 text-right">Status</div>
                </div>

                {data.data?.map((siswa: any) => (
                  <div key={siswa.id} className="flex items-center text-sm">
                    <div className="w-1/3 font-medium text-gray-900 truncate pr-4">{siswa.nama}</div>
                    <div className="w-1/2 flex gap-1 h-8">
                      {siswa.minggu.map((p: number | null, i: number) => (
                        <div
                          key={i}
                          className={`flex-1 rounded ${getTrendColor(p)} flex items-center justify-center text-xs font-medium text-gray-700`}
                          title={p !== null ? `${p}%` : 'Kosong'}
                        >
                          {p !== null ? `${p}%` : '-'}
                        </div>
                      ))}
                    </div>
                    <div className="w-1/6 text-right font-medium pl-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        siswa.status.includes('Rajin') ? 'bg-green-100 text-green-800' :
                        siswa.status.includes('Turun') ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {siswa.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
