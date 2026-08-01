'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RuangKelasCard from '@/components/guru/RuangKelasCard';

export default function GuruMeetingPage() {
  const params = useParams();
  const templateId = params.id as string;
  const [materi, setMateri] = useState({ baru: [], review: [], pertemuanKe: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeeting();
  }, [templateId]);

  const loadMeeting = async () => {
    setLoading(true);
    const res = await fetch(`/api/guru/roadmap/${templateId}/meeting`);
    if (res.ok) {
      const json = await res.json();
      setMateri(json.data);
    }
    setLoading(false);
  };

  const handleSelesai = async () => {
    if (!confirm(`Tandai pertemuan ke-${materi.pertemuanKe} ini selesai?`)) return;

    const res = await fetch(`/api/guru/roadmap/${templateId}/meeting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pertemuan_ke: materi.pertemuanKe })
    });

    if (res.ok) {
      alert('Pertemuan ditandai selesai!');
      loadMeeting();
    } else {
      alert('Gagal menandai selesai');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🗺️ Meeting Hari Ini (Pertemuan {materi.pertemuanKe})</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-8">
          {/* Review Otomatis (Make It Stick) */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-700">Review Otomatis (Make It Stick)</h3>
            {materi.review.length === 0 ? (
              <p className="text-gray-500 italic">Tidak ada review untuk pertemuan ini.</p>
            ) : (
              <div className="space-y-4">
                {materi.review.map((item: any) => (
                  <div key={item.id} className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <p className="font-medium text-amber-800">{item.unit_title}</p>
                    <p className="text-sm text-amber-700 mt-1">Review dari pertemuan sebelumnya</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Materi Baru */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Materi Baru</h3>
            {materi.baru.length === 0 ? (
              <p className="text-gray-500 italic">Tidak ada materi baru di pertemuan ini.</p>
            ) : (
              <div className="space-y-4">
                {materi.baru.map((item: any) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border">
                    <p className="font-medium">{item.unit_title}</p>
                    {item.catatan_guru && <p className="text-sm text-gray-600 mt-2">Catatan: {item.catatan_guru}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ruang Kelas (Absensi & Catatan) */}
          <RuangKelasCard templateId={templateId} pertemuanKe={materi.pertemuanKe} />

          <button
            onClick={handleSelesai}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full md:w-auto"
          >
            Tandai Pertemuan {materi.pertemuanKe} Selesai
          </button>
        </div>
      )}
    </div>
  );
}
