-- Migration 031: Seed subject, materials, and questions for K4 IPAS
-- 1 subject (ipas, kelas 4) + 8 materials × 4 questions = 32 questions

-- Subject IPAS Kelas 4
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k4-ipas', 'ipas', 'IPAS', '🌿', 4, 3)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (8 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k4-ipas-01', 4, 'k4-ipas', 'Tumbuhan Sumber Kehidupan di Bumi', 'Bab 1 — Fotosintesis, Bagian Tumbuhan, Peran Tumbuhan, Penyerbukan', '/buku/kelas4/ipas/k4-ipas-01.html', 1),
  ('k4-ipas-02', 4, 'k4-ipas', 'Wujud Zat dan Perubahannya', 'Bab 2 — Padat, Cair, Gas, Perubahan Wujud: Mencair, Membeku, Menguap', '/buku/kelas4/ipas/k4-ipas-02.html', 2),
  ('k4-ipas-03', 4, 'k4-ipas', 'Gaya di Sekitar Kita', 'Bab 3 — Gravitasi, Gesek, Magnet, Otot', '/buku/kelas4/ipas/k4-ipas-03.html', 3),
  ('k4-ipas-04', 4, 'k4-ipas', 'Mengubah Bentuk Energi', 'Bab 4 — Energi Kinetik/Potensial, Perubahan Energi Listrik→Cahaya, Kimia→Panas', '/buku/kelas4/ipas/k4-ipas-04.html', 4),
  ('k4-ipas-05', 4, 'k4-ipas', 'Ini Khas Daerahku!', 'Bab 5 — Peta Provinsi, Khas Daerah: Makanan, Pakaian, Rumah, Tari', '/buku/kelas4/ipas/k4-ipas-05.html', 5),
  ('k4-ipas-06', 4, 'k4-ipas', 'Indonesiaku Kaya Budaya', 'Bab 6 — Keberagaman Suku, Agama, Bahasa, Bhinneka Tunggal Ika', '/buku/kelas4/ipas/k4-ipas-06.html', 6),
  ('k4-ipas-07', 4, 'k4-ipas', 'Bagaimana Mendapatkan Semua Keperluan Kita', 'Bab 7 — Produksi, Distribusi, Konsumsi, Perdagangan', '/buku/kelas4/ipas/k4-ipas-07.html', 7),
  ('k4-ipas-08', 4, 'k4-ipas', 'Membangun Masyarakat yang Beradab', 'Bab 8 — Norma, Hukum, Partisipasi Warga, Demokrasi Sederhana', '/buku/kelas4/ipas/k4-ipas-08.html', 8)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (4 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k4-ipas-01: Tumbuhan Sumber Kehidupan di Bumi
('k4-ipas-01', 'Tumbuhan membuat makanan sendiri lewat proses...', '["Fotosintesis", "Respirasi", "Penyerbukan"]', 'Fotosintesis', 1, 'Tumbuhan fotosintesis: sinar matahari + air + CO₂ → makanan + oksigen. ✅'),
('k4-ipas-01', 'Bagian tumbuhan yang menyerap air dari tanah adalah...', '["Daun", "Akar", "Bunga"]', 'Akar', 1, 'Akar menyerap air & nutrisi dari tanah. ✅'),
('k4-ipas-01', 'Daun tumbuhan berfungsi sebagai...', '["Tempat menyerap air", "Tempat fotosintesis", "Tempat reproduksi"]', 'Tempat fotosintesis', 1, 'Daun = pabrik makanan (fotosintesis). ✅'),
('k4-ipas-01', 'Penyerbukan dibantu oleh...', '["Angin & serangga", "Air hujan", "Tanah"]', 'Angin & serangga', 1, 'Lebah, kupu-kupu, angin bawa serbuk sari. ✅'),

-- k4-ipas-02: Wujud Zat dan Perubahannya
('k4-ipas-02', 'Zat yang punya volume & bentuk tetap adalah...', '["Cair", "Padat", "Gas"]', 'Padat', 1, 'Padat: volume & bentuk tetap (batu, kayu, besi). ✅'),
('k4-ipas-02', 'Perubahan cair menjadi gas disebut...', '["Membeku", "Menguap", "Mencair"]', 'Menguap', 1, 'Cair → gas = menguap. ✅'),
('k4-ipas-02', 'Es batu mencair karena...', '["Suhu ruangan lebih dingin", "Suhu ruangan lebih panas", "Es batu mau jalan"]', 'Suhu ruangan lebih panas', 1, 'Panas memecah ikatan molekul es → jadi air. ✅'),
('k4-ipas-02', 'Uap air menempel di tutup panci lalu jadi tetesan air. Ini namanya...', '["Menguap", "Mengembun", "Membeku"]', 'Mengembun', 1, 'Gas → cair = mengembun. ✅'),

-- k4-ipas-03: Gaya di Sekitar Kita
('k4-ipas-03', 'Gaya yang membuat bola dilempar ke atas lalu jatuh ke bawah adalah...', '["Gaya magnet", "Gaya gravitasi", "Gaya gesek"]', 'Gaya gravitasi', 1, 'Gravitasi tarik bumi ke semua benda. ✅'),
('k4-ipas-03', 'Contoh manfaat gaya gesek:...', '["Sepatu cepat aus", "Mesin panas", "Bisa berjalan & berhenti"]', 'Bisa berjalan & berhenti', 1, 'Tanpa gesek: tidak bisa jalan, rem sepeda tdk kerja. ✅'),
('k4-ipas-03', 'Benda yang TIDAK ditarik magnet:...', '["Paperclip", "Paku", "Kertas"]', 'Kertas', 1, 'Magnet hanya tarik besi/nikel/kobalt. ✅'),
('k4-ipas-03', 'Gaya yang keluar dari tubuh kita (otot) adalah...', '["Gaya gravitasi", "Gaya gesek", "Gaya otot"]', 'Gaya otot', 1, 'Mendorong meja, angkat buku, tendang bola = gaya otot. ✅'),

-- k4-ipas-04: Mengubah Bentuk Energi
('k4-ipas-04', 'Bola di atas tangga punya energi...', '["Kinetik", "Potensial", "Listrik"]', 'Potensial', 1, 'Posisi tinggi = energi potensial tersimpan. ✅'),
('k4-ipas-04', 'Senter menyala: baterai (kimia) → listrik → ...', '["Cahaya", "Panas", "Bunyi"]', 'Cahaya', 1, 'Senter: kimia → listrik → cahaya. ✅'),
('k4-ipas-04', 'Kompor gas: energi kimia (gas) berubah jadi...', '["Panas", "Cahaya", "Gerak"]', 'Panas', 1, 'Gas bakar → panas masak. ✅'),
('k4-ipas-04', 'Air di bendungan punya energi...', '["Kinetik", "Potensial", "Kimia"]', 'Potensial', 1, 'Air tinggi = potensial → turun jadi kinetik. ✅'),

-- k4-ipas-05: Ini Khas Daerahku!
('k4-ipas-05', 'Rumah adat Jawa Barat bernama...', '["Rumah Gadang", "Joglo Panggung", "Honai"]', 'Joglo Panggung', 1, 'Joglo panggung = rumah adat Jabar. ✅'),
('k4-ipas-05', 'Tarian khas Bali adalah...', '["Jaipong", "Legong", "Sajojo"]', 'Legong', 1, 'Legong = tari Bali. Jaipong = Jabar. Sajojo = Papua. ✅'),
('k4-ipas-05', 'Makanan khas Yogyakarta/Jawa Tengah adalah...', '["Karedok", "Gudeg", "Rendang"]', 'Gudeg', 1, 'Gudeg = nangka muda + santan, khas Jogja/Jateng. ✅'),
('k4-ipas-05', 'Provinsi Indonesia saat ini berjumlah...', '["34", "38", "42"]', '38', 1, 'Indonesia 38 provinsi (sejak 2022: 3 provinsi baru Papua). ✅'),

-- k4-ipas-06: Indonesiaku Kaya Budaya
('k4-ipas-06', 'Motto negara Indonesia adalah...', '["Bhinneka Tunggal Ika", "Unity in Diversity", "Satu Nusa Satu Bangsa"]', 'Bhinneka Tunggal Ika', 1, 'Bhinneka Tunggal Ika = Berbeda tapi tetap satu. ✅'),
('k4-ipas-06', 'Agama yang BUKAN agama resmi di Indonesia:...', '["Islam", "Kristen", "Sikh"]', 'Sikh', 1, '6 agama resmi: Islam, Kristen, Katolik, Hindu, Buddha, Konghucu. ✅'),
('k4-ipas-06', 'Contoh menghormati teman yang puasa:...', '["Makan di depannya", "Tidak makan di depannya", "Ngejek puasanya"]', 'Tidak makan di depannya', 1, 'Hormat teman puasa = jangan makan di depan. ✅'),
('k4-ipas-06', 'Bahasa daerah Sunda untuk "Selamat pagi" adalah...', '["Sugeng enjang", "Wilujeng enjing", "Tabik"]', 'Wilujeng enjing', 1, 'Sunda: Wilujeng enjing. Jawa: Sugeng enjang. Minang: Tabik. ✅'),

-- k4-ipas-07: Bagaimana Mendapatkan Semua Keperluan Kita
('k4-ipas-07', 'Petani menanam padi termasuk kegiatan...', '["Produksi", "Distribusi", "Konsumsi"]', 'Produksi', 1, 'Produksi = membuat barang/jasa (tanam, tangkap ikan, bikin sepatu). ✅'),
('k4-ipas-07', 'Rantai yang benar:...', '["Konsumsi → Produksi → Distribusi", "Produksi → Distribusi → Konsumsi", "Distribusi → Konsumsi → Produksi"]', 'Produksi → Distribusi → Konsumsi', 1, 'Petani → truk/pasar → kita beli & makan. ✅'),
('k4-ipas-07', 'Toko online (Tokopedia, Shopee) berperan di tahap...', '["Produksi", "Distribusi", "Konsumsi"]', 'Distribusi', 1, 'E-commerce = distribusi modern. ✅'),
('k4-ipas-07', 'Alat tukar yang dipakai sekarang adalah...', '["Barang (barter)", "Uang", "Emas"]', 'Uang', 1, 'Uang = alat tukar resmi. Dulu barter. ✅'),

-- k4-ipas-08: Membangun Masyarakat yang Beradab
('k4-ipas-08', 'Aturan tidak tertulis dari kebiasaan disebut...', '["Hukum", "Norma", "Peraturan"]', 'Norma', 1, 'Norma = sopan santun, antre, salam, tdk berisik malam. ✅'),
('k4-ipas-08', 'Musyawarah untuk mufakat adalah contoh...', '["Demokrasi sederhana", "Diktatur", "Anarki"]', 'Demokrasi sederhana', 1, 'Musyawarah = demokrasi di tingkat kecil. ✅'),
('k4-ipas-08', 'Contoh hukum (aturan tertulis):...', '["Antre di kasir", "UU Lalu Lintas", "Salam saat bertemu"]', 'UU Lalu Lintas', 1, 'UU = hukum. Antre & salam = norma. ✅'),
('k4-ipas-08', 'Ikut kerja bakti membersihkan lingkungan = bentuk...', '["Partisipasi warga", "Pelanggaran hukum", "Kewajiban sekolah"]', 'Partisipasi warga', 1, 'Warga aktif = gotong royong, bayar iuran, musyawarah, pilkada. ✅');