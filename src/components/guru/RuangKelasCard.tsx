'use client';

import { useState, useEffect } from 'react';

interface SiswaAbsensi {
  siswa_id: string;
  nama: string;
  hadir: boolean;
  catatan_guru: string | null;
}

interface RuangKelasCardProps {
  templateId: string;
  pertemuanKe: number;
}

export default function RuangKelasCard({ templateId, pertemuanKe }: RuangKelasCardProps) {
  const [siswaList, setSiswaList] = useState<SiswaAbsensi[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pertemuanScheduleId, setPertemuanScheduleId] = useState<string | null>(null);

  useEffect(() => {
    if (templateId && pertemuanKe) {
      loadAbsensi();
    }
  }, [templateId, pertemuanKe]);

  const loadAbsensi = async () => {
    setLoading(true);
    try {
      // 1. Get pertemuan_schedule_id based on templateId and pertemuanKe
      // We'll add a quick endpoint check or use Supabase directly here since it's a client component,
      // but standard approach is an API call. For now we will fetch from API route.
      const schedRes = await fetch(`/api/guru/roadmap/${templateId}/meeting/schedule?ke=${pertemuanKe}`);
      let scheduleId = null;
      if (schedRes.ok) {
         const schedJson = await schedRes.json();
         scheduleId = schedJson.id;
         setPertemuanScheduleId(scheduleId);
      }

      if (scheduleId) {
        // 2. Load attendance for this schedule
        const res = await fetch(`/api/guru/roadmap/${templateId}/meeting/attendance?pertemuan_schedule_id=${scheduleId}`);
        if (res.ok) {
          const json = await res.json();
          setSiswaList(json.data || []);
        }
      }
    } catch (err) {
      console.error('Failed to load attendance', err);
    }
    setLoading(false);
  };

  const handleToggleHadir = (siswaId: string) => {
    setSiswaList(prev =>
      prev.map(s => s.siswa_id === siswaId ? { ...s, hadir: !s.hadir } : s)
    );
  };

  const handleCatatanChange = (siswaId: string, catatan: string) => {
    setSiswaList(prev =>
      prev.map(s => s.siswa_id === siswaId ? { ...s, catatan_guru: catatan } : s)
    );
  };

  const handleSimpan = async () => {
    if (!pertemuanScheduleId) {
      alert('Pertemuan Schedule ID tidak ditemukan!');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/guru/roadmap/${templateId}/meeting/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pertemuan_schedule_id: pertemuanScheduleId,
          attendance: siswaList
        })
      });

      if (res.ok) {
        alert('✅ Absensi dan catatan berhasil disimpan!');
      } else {
        const err = await res.json();
        alert(`❌ Gagal menyimpan: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Terjadi kesalahan jaringan.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow animate-pulse">
        <div className="h-6 bg-gray-200 w-1/3 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!pertemuanScheduleId) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow">
        <p className="text-amber-800 font-medium">⚠️ Data jadwal pertemuan belum dibuat.</p>
        <p className="text-sm text-amber-600">Pastikan Anda sudah menetapkan jadwal untuk pertemuan ini di roadmap.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🏫 Ruang Kelas (Absensi & Catatan)</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          {siswaList.filter(s => s.hadir).length} / {siswaList.length} Hadir
        </span>
      </div>

      {siswaList.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada siswa yang terdaftar di kelas ini.</p>
      ) : (
        <div className="space-y-4">
          {siswaList.map(siswa => (
            <div
              key={siswa.siswa_id}
              className={`p-4 border rounded-lg transition-colors ${siswa.hadir ? 'border-gray-200 bg-gray-50' : 'border-red-200 bg-red-50'}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

                {/* Nama & Toggle */}
                <div className="flex-1 flex items-center justify-between w-full">
                  <p className={`font-semibold ${!siswa.hadir && 'text-red-700'}`}>{siswa.nama}</p>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={siswa.hadir}
                        onChange={() => handleToggleHadir(siswa.siswa_id)}
                      />
                      <div className={`block w-10 h-6 rounded-full ${siswa.hadir ? 'bg-green-500' : 'bg-red-400'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${siswa.hadir ? 'translate-x-4' : ''}`}></div>
                    </div>
                    <span className={`ml-3 text-sm font-medium ${siswa.hadir ? 'text-green-700' : 'text-red-600'}`}>
                      {siswa.hadir ? 'Hadir' : 'Absen'}
                    </span>
                  </label>
                </div>

                {/* Textarea Catatan */}
                <div className="w-full sm:w-1/2">
                  <input
                    type="text"
                    value={siswa.catatan_guru || ''}
                    onChange={(e) => handleCatatanChange(siswa.siswa_id, e.target.value)}
                    placeholder="Catatan singkat (misal: perlu remedial pecahan)"
                    className="w-full text-sm p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <button
          onClick={handleSimpan}
          disabled={saving || siswaList.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium w-full sm:w-auto"
        >
          {saving ? '⏳ Menyimpan...' : '💾 Simpan Absensi & Catatan'}
        </button>
      </div>
    </div>
  );
}
