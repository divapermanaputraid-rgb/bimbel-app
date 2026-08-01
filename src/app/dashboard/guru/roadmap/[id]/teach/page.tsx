'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Materi {
  id: string;
  unit_id: string;
  unit_title: string;
  judul: string;
  deskripsi: string;
  tipe: 'baru' | 'review';
  review_from_pertemuan: number | null;
  catatan_guru: string | null;
  buku_path: string;
  soal: any[];
}

export default function GuruTeachPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [templateId]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/guru/roadmap/${templateId}/teach`);
    if (res.ok) {
      const json = await res.json();
      setData(json);
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <p className="text-white text-lg">Memuat sesi mengajar...</p>
    </div>
  );

  if (!data) return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <div className="text-center text-white space-y-3">
        <p className="text-4xl">⚠️</p>
        <p>Gagal memuat data roadmap.</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-white text-gray-900 rounded-lg">← Kembali</button>
      </div>
    </div>
  );

  // Materi belum diisi di roadmap ini
  if (!data.materi || data.materi.length === 0) return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <div className="text-center text-white space-y-4 max-w-md px-6">
        <p className="text-5xl">📭</p>
        <h2 className="text-xl font-bold">Belum ada materi untuk pertemuan ini</h2>
        <p className="text-gray-400 text-sm">
          Roadmap berhasil dibuat, tapi materi per pertemuan belum diisi.
          Isi dulu materi di halaman edit roadmap sebelum mulai mengajar.
        </p>
        <button onClick={() => router.back()} className="px-5 py-2 bg-white text-gray-900 rounded-lg font-semibold">← Kembali</button>
      </div>
    </div>
  );

  const active = data.materi[activeIdx] ?? data.materi[0];

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col">
      {/* Top Bar */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div>
          <p className="text-white text-sm">Pertemuan {data.pertemuanKe} — {data.roadmap.title}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded"
        >
          Selesai
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar Materi */}
        <div className="w-60 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
          <p className="text-xs text-gray-500 mb-3">Materi ({data.materi.length})</p>
          <div className="space-y-2">
            {data.materi.map((m: any, i: number) => (
              <button
                key={m.id}
                onClick={() => setActiveIdx(i)}
                className={`w-full text-left p-3 rounded text-sm ${i === activeIdx ? 'bg-blue-600' : 'bg-gray-800'}`}
              >
                {m.judul}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-900 p-4 flex items-center justify-between">
            <h2 className="text-white text-xl font-bold">{active.judul}</h2>
            <div className="text-sm text-gray-400">Materi {activeIdx + 1} / {data.materi.length}</div>
          </div>

          <div className="flex-1 overflow-hidden">
            {active.soal.length > 0 ? (
              // Soal view
              <div className="p-6">
                {active.soal.map((soal: any, si: number) => (
                  <div key={soal.id} className="bg-gray-900 p-4 rounded mb-4">
                    <p>{soal.pertanyaan}</p>
                    {soal.pilihan && Object.entries(soal.pilihan).map(([k, v]) => (
                      <div key={k} className="bg-gray-800 p-2 mt-2">
                        {k}. {v}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              // Buku view
              <iframe
                src={active.buku_path}
                className="w-full h-full border-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
