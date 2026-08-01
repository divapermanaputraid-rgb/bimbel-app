'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BuatRoadmapPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    kelas: 1,
    subject_id: 'mtk',
    semester: 'ganjil',
    title: '',
  });

  const handleSimpan = async () => {
    setLoading(true);
    const response = await fetch('/api/guru/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Roadmap berhasil dibuat dengan materi otomatis!');
      router.push('/dashboard/guru');
    } else {
      alert('Gagal membuat roadmap.');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🗺️ Buat Roadmap Pengajaran Baru</h1>

      <div className="space-y-4 bg-white p-6 rounded-xl shadow">
        <p className="text-gray-600 mb-4 text-sm">
          Sistem akan otomatis mengambil semua materi dari database untuk kelas dan mapel yang dipilih, lalu mengalokasikannya menjadi 1 materi per pertemuan.
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">Kelas</label>
          <select
            className="w-full border rounded-lg p-2"
            value={formData.kelas}
            onChange={(e) => setFormData({...formData, kelas: Number(e.target.value)})}
          >
            {[1,2,3,4,5,6].map(k => <option key={k} value={k}>Kelas {k}</option>)}
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
          onClick={handleSimpan}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mt-6 font-bold disabled:opacity-50"
        >
          {loading ? 'Membuat Roadmap...' : '💾 Buat Roadmap & Auto-Assign Materi'}
        </button>
      </div>
    </div>
  );
}