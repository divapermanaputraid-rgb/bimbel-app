-- bimbel-app/supabase/migrations/008_materials_k2_mtk_11_20.sql
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan) VALUES
('k2-mtk-11', 2, 'k2-mtk', 'Pola Bilangan dan Bentuk', 'Belajar menebak apa yang akan muncul selanjutnya! 🚂', '/buku/kelas2/matematika/k2-mtk-11.html', 5, 11),
('k2-mtk-12', 2, 'k2-mtk', 'Setengah dari Benda Utuh (½)', 'Membagi benda secara adil sama rata! 🍕', '/buku/kelas2/matematika/k2-mtk-12.html', 5, 12),
('k2-mtk-13', 2, 'k2-mtk', 'Setengah dari Kumpulan Benda', 'Bagaimana kalau membagi kelereng? 🔴🔵', '/buku/kelas2/matematika/k2-mtk-13.html', 5, 13),
('k2-mtk-14', 2, 'k2-mtk', 'Seperempat dari Benda Utuh (¼)', 'Membagi kue jadi 4 potong! 🍰', '/buku/kelas2/matematika/k2-mtk-14.html', 5, 14),
('k2-mtk-15', 2, 'k2-mtk', 'Berat Benda', 'Mana yang lebih berat? Gajah atau Semut? 🐘🐭', '/buku/kelas2/matematika/k2-mtk-15.html', 5, 15),
('k2-mtk-16', 2, 'k2-mtk', 'Waktu', 'Belajar membaca jam dinding! ⏱️', '/buku/kelas2/matematika/k2-mtk-16.html', 5, 16),
('k2-mtk-17', 2, 'k2-mtk', 'Bilangan 51–100', 'Menghitung makin tinggi sampai seratus! 💯', '/buku/kelas2/matematika/k2-mtk-17.html', 5, 17),
('k2-mtk-18', 2, 'k2-mtk', 'Membandingkan Bilangan sampai 100', 'Sekarang angkanya besar! Siapa pemenangnya? 🥇', '/buku/kelas2/matematika/k2-mtk-18.html', 5, 18),
('k2-mtk-19', 2, 'k2-mtk', 'Diagram Turus (Batang)', 'Cara seru melihat data kotak-kotak! 📈', '/buku/kelas2/matematika/k2-mtk-19.html', 5, 19),
('k2-mtk-20', 2, 'k2-mtk', 'Diagram Gambar (Piktogram)', 'Data menggunakan gambar, bukan sekedar balok! 🖼️', '/buku/kelas2/matematika/k2-mtk-20.html', 5, 20)
ON CONFLICT (id) DO UPDATE SET 
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  file_path = EXCLUDED.file_path;
