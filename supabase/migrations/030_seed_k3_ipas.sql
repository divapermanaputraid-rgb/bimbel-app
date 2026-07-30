-- Migration 030: Seed subject, materials, and questions for K3 IPAS
-- 1 subject (ipas, kelas 3) + 8 materials × 4 questions = 32 questions

-- Subject IPAS Kelas 3
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k3-ipas', 'ipas', 'IPAS', '🌿', 3, 3)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (8 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k3-ipas-01', 3, 'k3-ipas', 'Mari Kenali Hewan di Sekitar Kita', 'Bab 1 — Hewan Peliharaan & Liar, Ciri, Makanan, Habitat', '/buku/kelas3/ipas/k3-ipas-01.html', 1),
  ('k3-ipas-02', 3, 'k3-ipas', 'Ayo, Mengenal Siklus pada Makhluk Hidup', 'Bab 2 — Metamorfosis, Daur Hidup Tumbuhan', '/buku/kelas3/ipas/k3-ipas-02.html', 2),
  ('k3-ipas-03', 3, 'k3-ipas', 'Hidup Bersama Alam', 'Bab 3 — Rantai Makanan, Ekosistem', '/buku/kelas3/ipas/k3-ipas-03.html', 3),
  ('k3-ipas-04', 3, 'k3-ipas', 'Berkenalan dengan Energi', 'Bab 4 — Sumber Energi, Perubahan Energi', '/buku/kelas3/ipas/k3-ipas-04.html', 4),
  ('k3-ipas-05', 3, 'k3-ipas', 'Aku dan Lingkungan Sekitarku', 'Bab 5 — Lingkungan, Cuaca, Musim', '/buku/kelas3/ipas/k3-ipas-05.html', 5),
  ('k3-ipas-06', 3, 'k3-ipas', 'Aku Bagian dari Masyarakat', 'Bab 6 — Peran, Gotong Royong, Norma', '/buku/kelas3/ipas/k3-ipas-06.html', 6),
  ('k3-ipas-07', 3, 'k3-ipas', 'Cerita dari Kampung Halaman', 'Bab 7 — Kearifan Lokal, Tradisi, Arah Mata Angin', '/buku/kelas3/ipas/k3-ipas-07.html', 7),
  ('k3-ipas-08', 3, 'k3-ipas', 'Bentang Alam Indonesia', 'Bab 8 — Pegunungan, Dataran, Laut, Peta', '/buku/kelas3/ipas/k3-ipas-08.html', 8)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (4 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k3-ipas-01: Hewan
('k3-ipas-01', 'Kucing termasuk hewan...', '["Karnivora", "Herbivora", "Omnivora"]', 'Karnivora', 1, 'Kucing makan daging = karnivora. ✅'),
('k3-ipas-01', 'Hewan yang bertelur adalah...', '["Kucing", "Ayam", "Sapi"]', 'Ayam', 1, 'Ayam bertelur, kucing dan sapi melahirkan. ✅'),
('k3-ipas-01', 'Sapi termasuk hewan...', '["Herbivora", "Karnivora", "Omnivora"]', 'Herbivora', 1, 'Sapi makan rumput = herbivora. ✅'),
('k3-ipas-01', 'Habitat = tempat...', '["Makan", "Tinggal alami", "Tidur"]', 'Tinggal alami', 1, 'Habitat = tempat tinggal alami. ✅'),

-- k3-ipas-02: Siklus Makhluk Hidup
('k3-ipas-02', 'Tahap metamorfosis kupu-kupu setelah telur adalah...', '["Kepompong", "Ulat", "Kupu-kupu"]', 'Ulat', 1, 'Telur → ulat → kepompong → kupu-kupu. ✅'),
('k3-ipas-02', 'Metamorfosis katak dimulai dari...', '["Telur", "Berudu", "Katak kecil"]', 'Telur', 1, 'Katak mulai dari telur. ✅'),
('k3-ipas-02', 'Hewan yang metamorfosis sempurna:...', '["Ayam", "Kupu-kupu", "Kucing"]', 'Kupu-kupu', 1, 'Kupu-kupu metamorfosis sempurna (bentuk berubah total). ✅'),
('k3-ipas-02', 'Tumbuhan tumbuh dari...', '["Batu", "Biji", "Pasir"]', 'Biji', 1, 'Tumbuhan tumbuh dari biji. ✅'),

-- k3-ipas-03: Rantai Makanan
('k3-ipas-03', 'Produsen dalam rantai makanan adalah...', '["Rumput", "Belalang", "Burung"]', 'Rumput', 1, 'Rumput produsen karena membuat makanan sendiri. ✅'),
('k3-ipas-03', 'Jika rumput habis maka...', '["Belalang kenyang", "Semua ikut kelaparan", "Burung senang"]', 'Semua ikut kelaparan', 1, 'Keseimbangan rantai makanan terganggu. ✅'),
('k3-ipas-03', 'Contoh ekosistem alami adalah...', '["Kotak pensil", "Sawah", "Sepeda"]', 'Sawah', 1, 'Sawah adalah ekosistem buatan manusia. ✅'),
('k3-ipas-03', 'Tumbuhan mendapat energi dari...', '["Makan serangga", "Sinar matahari", "Minum air"]', 'Sinar matahari', 1, 'Fotosintesis pakai sinar matahari. ✅'),

-- k3-ipas-04: Energi
('k3-ipas-04', 'Sumber energi terbesar di Bumi adalah...', '["Matahari", "Baterai", "Api"]', 'Matahari', 1, 'Matahari sumber energi utama Bumi. ✅'),
('k3-ipas-04', 'Baterai mengubah energi kimia menjadi energi...', '["Panas", "Listrik", "Bunyi"]', 'Listrik', 1, 'Baterai: kimia → listrik. ✅'),
('k3-ipas-04', 'Energi yang dihasilkan alat musik adalah...', '["Listrik", "Bunyi", "Panas"]', 'Bunyi', 1, 'Alat musik menghasilkan energi bunyi. ✅'),
('k3-ipas-04', 'Cara menghemat energi adalah...', '["Nyalakan TV terus", "Matikan lampu siang hari", "Hidupkan AC sepanjang hari"]', 'Matikan lampu siang hari', 1, 'Hemat energi = matikan yang tidak dipakai. ✅'),

-- k3-ipas-05: Lingkungan
('k3-ipas-05', 'Lingkungan bersih membuat kita...', '["Sehat", "Sakit", "Mengantuk"]', 'Sehat', 1, 'Lingkungan bersih = sehat. ✅'),
('k3-ipas-05', 'Musim di Indonesia ada...', '["4 musim", "2 musim", "3 musim"]', '2 musim', 1, 'Indonesia 2 musim: kemarau dan hujan. ✅'),
('k3-ipas-05', 'Tempat sampah digunakan untuk...', '["Duduk", "Membuang sampah", "Menyimpan mainan"]', 'Membuang sampah', 1, 'Tempat sampah = buang sampah. ✅'),
('k3-ipas-05', 'Saat musim hujan sebaiknya bawa...', '["Topi", "Payung", "Kipas"]', 'Payung', 1, 'Hujan bawa payung. ✅'),

-- k3-ipas-06: Masyarakat
('k3-ipas-06', 'Membantu ibu memasak adalah peran di...', '["Sekolah", "Rumah", "Masyarakat"]', 'Rumah', 1, 'Membantu di rumah = peran keluarga. ✅'),
('k3-ipas-06', 'Gotong royong artinya...', '["Bekerja sendiri", "Bekerja bersama-sama", "Bermalas-malasan"]', 'Bekerja bersama-sama', 1, 'Gotong royong = kerja bersama. ✅'),
('k3-ipas-06', 'Ronda malam adalah contoh...', '["Peran di sekolah", "Gotong royong", "Aturan tertulis"]', 'Gotong royong', 1, 'Ronda malam gotong royong warga. ✅'),
('k3-ipas-06', 'Jika semua menjalankan peran, masyarakat jadi...', '["Kacau", "Harmonis", "Ramai"]', 'Harmonis', 1, 'Semua jalankan peran = harmonis. ✅'),

-- k3-ipas-07: Tradisi & Arah
('k3-ipas-07', 'Congklak adalah...', '["Alat tulis", "Permainan tradisional", "Makanan"]', 'Permainan tradisional', 1, 'Congklak permainan tradisional. ✅'),
('k3-ipas-07', 'Matahari terbit di sebelah...', '["Barat", "Timur", "Utara"]', 'Timur', 1, 'Matahari terbit di timur. ✅'),
('k3-ipas-07', 'Peta sederhana harus punya petunjuk...', '["Warna", "Arah mata angin", "Harga"]', 'Arah mata angin', 1, 'Peta butuh petunjuk arah. ✅'),
('k3-ipas-07', 'Egrang dimainkan dengan...', '["Bola", "Bambu panjang", "Biji-bijian"]', 'Bambu panjang', 1, 'Egrang pakai bambu panjang. ✅'),

-- k3-ipas-08: Bentang Alam
('k3-ipas-08', 'Gunung Merapi terletak di...', '["Papua", "Yogyakarta", "Sulawesi"]', 'Yogyakarta', 1, 'Gunung Merapi di Yogyakarta. ✅'),
('k3-ipas-08', 'Luas laut Indonesia sekitar...', '["Setengah wilayah", "3/4 wilayah", "Semua wilayah"]', '3/4 wilayah', 1, 'Laut Indonesia 3/4 luas NKRI. ✅'),
('k3-ipas-08', 'Warna hijau di peta menunjukkan...', '["Laut", "Dataran rendah", "Gunung"]', 'Dataran rendah', 1, 'Hijau = dataran rendah di peta. ✅'),
('k3-ipas-08', 'Indonesia berada di antara dua benua:...', '["Asia-Eropa", "Asia-Australia", "Afrika-Amerika"]', 'Asia-Australia', 1, 'Indonesia antara Asia dan Australia. ✅');