-- Insert data materials untuk k2-mtk-01 sampai k2-mtk-10
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan) VALUES
('k2-mtk-01', 2, 'k2-mtk', 'Bermain dengan Bilangan 1–50', 'Yuk, kita berhitung bersama Anton! 🎈', '/buku/kelas2/matematika/k2-mtk-01.html', 5, 1),
('k2-mtk-02', 2, 'k2-mtk', 'Rumah Angka: Puluhan dan Satuan', 'Mengenal tempat puluhan dan satuan yuk! 🧱', '/buku/kelas2/matematika/k2-mtk-02.html', 5, 2),
('k2-mtk-03', 2, 'k2-mtk', 'Siapa yang Lebih Besar?', 'Mari bandingkan angka-angka! 🐘 vs 🐭', '/buku/kelas2/matematika/k2-mtk-03.html', 5, 3),
('k2-mtk-04', 2, 'k2-mtk', 'Menambah dengan Senang Hati', 'Budi punya permen, lalu dikasih Anton. Berapa totalnya? 🍬', '/buku/kelas2/matematika/k2-mtk-04.html', 5, 4),
('k2-mtk-05', 2, 'k2-mtk', 'Mengurangi dengan Mudah', 'Kalau permennya dimakan, sisanya berapa ya? 😋', '/buku/kelas2/matematika/k2-mtk-05.html', 5, 5),
('k2-mtk-06', 2, 'k2-mtk', 'Petualangan Anton dan Kelereng', 'Membaca cerita dan berhitung! 🕵️‍♂️', '/buku/kelas2/matematika/k2-mtk-06.html', 5, 6),
('k2-mtk-07', 2, 'k2-mtk', 'Petualangan di Dunia Bentuk', 'Mengenal bentuk di sekitarmu! 🖼️', '/buku/kelas2/matematika/k2-mtk-07.html', 5, 7),
('k2-mtk-08', 2, 'k2-mtk', 'Merakit Bentuk', 'Menyusun bentuk-bentuk kecil jadi bentuk besar! 🛠️', '/buku/kelas2/matematika/k2-mtk-08.html', 5, 8),
('k2-mtk-09', 2, 'k2-mtk', 'Bentuk yang Berisi', 'Bangun yang ada isinya! 📦', '/buku/kelas2/matematika/k2-mtk-09.html', 5, 9),
('k2-mtk-10', 2, 'k2-mtk', 'Di Mana Letaknya?', 'Atas, bawah, kanan, kiri! 🗺️', '/buku/kelas2/matematika/k2-mtk-10.html', 5, 10)
ON CONFLICT (id) DO UPDATE SET 
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  file_path = EXCLUDED.file_path;
