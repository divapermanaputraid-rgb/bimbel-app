'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BuatRoadmapPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    kelas: 1,
    subject_id: 'mtk',
    semester: 'ganjil',
    title: '',
    items: [{ pertemuan_ke: 1, materi: [] }],
  });

  const handleSimpan = async () => {
    const response = await fetch('/api/guru/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Roadmap berhasil dibuat!');
      router.push('/dashboard/guru');
    } else {
      alert('Gagal membuat roadmap.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🗺️ Buat Roadmap Pengajaran Baru</h1>

      {/* Step 1: Info Dasar */}
      {step === 1 && (
        <div className="space-y-4 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Langkah 1: Info Dasar</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Kelas</label>
            <select
              className="w-full border rounded-lg p-2"
              value={formData.kelas}
              onChange={(e) => setFormData({...formData, kelas: Number(e.target.value)})}
            >
              <option value={1}>Kelas 1</option>
              <option value={2}>Kelas 2</option>
              <option value={3}>Kelas 3</option>
              <option value={4}>Kelas 4</option>
              <option value={5}>Kelas 5</option>
              <option value={6}>Kelas 6</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mata Pelajaran</label>
            <select
              className="w-full border rounded-lg p-2"
              value={formData.subject_id}
              onChange={(e) => setFormData({...formData, subject_id: e.target.value})}
            >
              <option value="mtk">Matematika</option>
              <option value="bind">Bahasa Indonesia</option>
              <option value="bing">Bahasa Inggris</option>
              <option value="ipas">IPAS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select
              className="w-full border rounded-lg p-2"
              value={formData.semester}
              onChange={(e) => setFormData({...formData, semester: e.target.value})}
            >
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
          <button
            onClick={() => setStep(2)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Lanjut ke Langkah 2 ➡️
          </button>
        </div>
      )}

      {/* Step 2: Atur Pertemuan (Placeholder untuk Drag & Drop nanti) */}
      {step === 2 && (
        <div className="space-y-4 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Langkah 2: Atur Pertemuan</h2>
          <p className="text-gray-600 mb-4">
            (Fitur Drag & Drop materi ke Pertemuan 1, 2, 3 akan diaktifkan setelah struktur dasar ini berhasil disimpan).
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              ⬅️ Kembali
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Lanjut ke Langkah 3 ➡️
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Simpan */}
      {step === 3 && (
        <div className="space-y-4 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Langkah 3: Simpan Roadmap</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p><strong>Kelas:</strong> {formData.kelas}</p>
            <p><strong>Mapel:</strong> {formData.subject_id}</p>
            <p><strong>Semester:</strong> {formData.semester}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              ⬅️ Kembali
            </button>
            <button
              onClick={handleSimpan}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              💾 Simpan Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}