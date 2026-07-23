INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan) VALUES
('k6-mtk-10', 6, 'k6-mtk', 'Rasio Satuan', 'Menyederhanakan perbandingan hingga paling kecil! 🏃‍♂️', '/buku/kelas6/matematika/k6-mtk-10.html', 5, 10),
('k6-mtk-11', 6, 'k6-mtk', 'Penerapan Rasio: Bagian vs Keseluruhan', 'Menghitung bagian dari total menggunakan rasio. ⚖️', '/buku/kelas6/matematika/k6-mtk-11.html', 5, 11),
('k6-mtk-12', 6, 'k6-mtk', 'Rasio pada Durasi Waktu', 'Menyamakan satuan waktu sebelum membandingkannya! 🕰️', '/buku/kelas6/matematika/k6-mtk-12.html', 5, 12),
('k6-mtk-13', 6, 'k6-mtk', 'Mengonstruksi & Mengurai Kubus/Balok', 'Mari membongkar dan memasang kotak kardus! 📐', '/buku/kelas6/matematika/k6-mtk-13.html', 5, 13),
('k6-mtk-14', 6, 'k6-mtk', 'Visualisasi Spasial', 'Melihat benda dari berbagai arah. 📸', '/buku/kelas6/matematika/k6-mtk-14.html', 5, 14),
('k6-mtk-15', 6, 'k6-mtk', 'Lokasi pada Sistem Berpetak', 'Belajar membaca koordinat di atas kertas berpetak. 📍', '/buku/kelas6/matematika/k6-mtk-15.html', 5, 15),
('k6-mtk-16', 6, 'k6-mtk', 'Skala Peluang (0 sampai 1)', 'Seberapa besar kemungkinan sesuatu terjadi? 🌧️', '/buku/kelas6/matematika/k6-mtk-16.html', 5, 16),
('k6-mtk-17', 6, 'k6-mtk', 'Membandingkan Peluang dalam Permainan', 'Dadu vs Koin: siapa yang lebih gampang ditebak? 🪙', '/buku/kelas6/matematika/k6-mtk-17.html', 5, 17),
('k6-mtk-18', 6, 'k6-mtk', 'Membandingkan Peluang dalam Kehidupan', 'Bawa payung atau tidak? Mari hitung risikonya! 🌂', '/buku/kelas6/matematika/k6-mtk-18.html', 5, 18)
ON CONFLICT (id) DO UPDATE SET 
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  file_path = EXCLUDED.file_path;
