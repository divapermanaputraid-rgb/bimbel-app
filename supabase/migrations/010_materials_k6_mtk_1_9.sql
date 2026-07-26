INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES
  ('k6-mtk', 'mtk', 'Matematika', '🔢', 6, 1)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan) VALUES
('k6-mtk-01', 6, 'k6-mtk', 'Perkalian Bilangan Asli × Pecahan', 'Mengalikan bilangan bulat dengan pecahan. Mari kita pelajari konsep dasarnya! 💡', '/buku/kelas6/matematika/k6-mtk-01.html', 5, 1),
('k6-mtk-02', 6, 'k6-mtk', 'Perkalian Pecahan × Bilangan Asli', 'Sifat komutatif pada perkalian pecahan! Mari kita perhatikan contoh berikut. 📦', '/buku/kelas6/matematika/k6-mtk-02.html', 5, 2),
('k6-mtk-03', 6, 'k6-mtk', 'Pembagian Pecahan ÷ Bilangan Asli', 'Membagi pecahan jadi bagian yang lebih kecil lagi! 🔪', '/buku/kelas6/matematika/k6-mtk-03.html', 5, 3),
('k6-mtk-04', 6, 'k6-mtk', 'Pembagian Bilangan Asli ÷ Pecahan', 'Berapa banyak bagian kecil di dalam sebuah benda utuh? 📏', '/buku/kelas6/matematika/k6-mtk-04.html', 5, 4),
('k6-mtk-05', 6, 'k6-mtk', 'Mengubah Pecahan ke Desimal', 'Mari belajar mengubah pecahan ke bilangan berkoma! 🧮', '/buku/kelas6/matematika/k6-mtk-05.html', 5, 5),
('k6-mtk-06', 6, 'k6-mtk', 'Membandingkan & Mengurutkan Desimal', 'Menentukan mana nilai desimal yang lebih berat, tinggi, atau berharga. 💸', '/buku/kelas6/matematika/k6-mtk-06.html', 5, 6),
('k6-mtk-07', 6, 'k6-mtk', 'Membandingkan Benda (Konsep Rasio)', 'Berapa banyak banding berapa banyak? Itulah rasio! 🏀⚽', '/buku/kelas6/matematika/k6-mtk-07.html', 5, 7),
('k6-mtk-08', 6, 'k6-mtk', 'Pengertian Rasio', 'Belajar menuliskan notasi perbandingan secara matematis. 📏', '/buku/kelas6/matematika/k6-mtk-08.html', 5, 8),
('k6-mtk-09', 6, 'k6-mtk', 'Kesamaan Rasio (Rasio Senilai)', 'Kalau skalanya dibesarkan, apakah rasionya tetap sama? 🗺️', '/buku/kelas6/matematika/k6-mtk-09.html', 5, 9)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  file_path = EXCLUDED.file_path;
