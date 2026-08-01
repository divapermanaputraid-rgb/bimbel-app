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
  const [soalIdx, setSoalIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [templateId]);

  useEffect(() => {
    setSoalIdx(0); // reset ke soal pertama saat ganti materi
  }, [activeIdx]);

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
  const currentSoal = active.soal[soalIdx] ?? null;

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
                onClick={() => { setActiveIdx(i); setSoalIdx(0); }}
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
            {active.soal.length === 0 ? (
              // Buku view — tidak ada soal
              <iframe
                src={active.buku_path}
                className="w-full h-full border-0"
              />
            ) : (
              // Soal view dengan paginasi 1 soal per slide
              <div className="flex-1 flex flex-col p-6 bg-gray-950 text-white">
                {/* Progress Bar Soal */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-blue-400">Latihan Bersama</h3>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                    Soal {soalIdx + 1} dari {active.soal.length}
                  </span>
                </div>

                {/* Card Soal Aktif */}
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex-1 flex flex-col justify-center">
                  {currentSoal && (
                    <>
                      <p className="text-2xl leading-relaxed font-medium mb-8 text-center">
                        {currentSoal.pertanyaan}
                      </p>

                      {/* Pilihan Ganda */}
                      {currentSoal.pilihan && typeof currentSoal.pilihan === 'object' && !Array.isArray(currentSoal.pilihan) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                          {Object.entries(currentSoal.pilihan).map(([key, val]) => (
                            <div key={key} className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4">
                              <span className="bg-gray-700 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold uppercase">{key}</span>
                              <span className="text-lg">{String(val)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Array pilihan (misal soal true/false atau multiple choice array) */}
                      {Array.isArray(currentSoal.pilihan) && (
                        <div className="space-y-3 max-w-2xl mx-auto w-full">
                          {currentSoal.pilihan.map((p: any, pi: number) => {
                            const letter = String.fromCharCode(97 + pi);
                            return (
                              <div key={pi} className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4">
                                <span className="bg-gray-700 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold uppercase">{letter}</span>
                                <span className="text-lg">{String(p)}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Jawaban Benar Toggle (Untuk Guru) */}
                      <div className="mt-12 text-center">
                        <details className="inline-block text-left">
                          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">Lihat Kunci Jawaban</summary>
                          <div className="mt-3 bg-green-900/30 border border-green-800 text-green-400 p-4 rounded-xl text-lg font-bold">
                            Kunci: {currentSoal ? String(currentSoal.jawaban_benar).toUpperCase() : '-'}
                          </div>
                        </details>
                      </div>
                    </>
                  }
                </div>

                {/* Navigasi Soal */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setSoalIdx(i => Math.max(0, i - 1))}
                    disabled={soalIdx === 0}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium disabled:opacity-30 hover:bg-gray-700"
                  >
                    ← Soal Sebelumnya
                  </button>
                  <button
                    onClick={() => setSoalIdx(i => Math.min(active.soal.length - 1, i + 1))}
                    disabled={soalIdx === active.soal.length - 1}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-30 hover:bg-blue-700"
                  >
                    Soal Selanjutnya →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}