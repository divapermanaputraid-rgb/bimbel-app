-- Migration 032: Seed subject, materials, and questions for K5 IPAS
-- 1 subject (ipas, kelas 5) + 5 materials × 5 questions = 25 questions

-- Subject IPAS Kelas 5
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k5-ipas', 'ipas', 'IPAS', '🌿', 5, 3)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (5 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k5-ipas-01', 5, 'k5-ipas', 'Melihat karena Cahaya, Mendengar karena Bunyi', 'Bab 1 — Sifat Cahaya: Merambat Lurus, Pantulan, Pembiasan. Sifat Bunyi: Merambat, Pantulan (Gaung). Cara Kerja Mata & Telinga', '/buku/kelas5/ipas/k5-ipas-01.html', 1),
  ('k5-ipas-02', 5, 'k5-ipas', 'Harmoni dalam Ekosistem', 'Bab 2 — Rantai Makanan Kompleks, Piramida Makanan, Simbiosis (Mutualisme, Komensalisme, Parasitisme), Keseimbangan Alam', '/buku/kelas5/ipas/k5-ipas-02.html', 2),
  ('k5-ipas-03', 5, 'k5-ipas', 'Magnet, Listrik, dan Teknologi untuk Kehidupan', 'Bab 3 — Sifat Magnet (Kutub, Tarik-Tolak), Arus Listrik & Rangkaian Sederhana, Teknologi Sehari-hari Berbasis Magnet/Listrik', '/buku/kelas5/ipas/k5-ipas-03.html', 3),
  ('k5-ipas-04', 5, 'k5-ipas', 'Ayo Berkenalan dengan Bumi Kita', 'Bab 4 — Lapisan Bumi (Kerak, Mantel, Inti), Lempeng Tektonik, Gunung Berapi, Gempa Bumi, Ring of Fire Indonesia', '/buku/kelas5/ipas/k5-ipas-04.html', 4),
  ('k5-ipas-05', 5, 'k5-ipas', 'Bagaimana Kita Hidup dan Bertumbuh', 'Bab 5 — Sistem Organ Tubuh (Pencernaan, Pernapasan, Peredaran Darah, Saraf), Pertumbuhan Manusia, Gizi Seimbang, Kesehatan Reproduksi Sederhana', '/buku/kelas5/ipas/k5-ipas-05.html', 5)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (5 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k5-ipas-01: Melihat karena Cahaya, Mendengar karena Bunyi
('k5-ipas-01', 'Cahaya merambat...', '["Lurus 🔦", "Melengkung", "Zig-zag"]', 'Lurus 🔦', 1, 'Cahaya merambat lurus. Bisa pantul & bias.'),
('k5-ipas-01', 'Bunyi TIDAK bisa merambat di...', '["Udara", "Air", "Ruang hampa 🚫"]', 'Ruang hampa 🚫', 1, 'Bunyi butuh medium (udara, air, padat). Ruang hampa tidak ada medium.'),
('k5-ipas-01', 'Pantulan bunyi disebut...', '["Gaung 🗣️", "Bias", "Redaman"]', 'Gaung 🗣️', 1, 'Bunyi pantul = gaung. Contoh di gua/gedung besar.'),
('k5-ipas-01', 'Pensil di gelas air terlihat patah karena...', '["Cahaya pantul", "Cahaya bias 🥛", "Cahaya henti"]', 'Cahaya bias 🥛', 1, 'Cahaya belok lewat air = pembiasan.'),
('k5-ipas-01', 'Mata menangkap cahaya lalu kirim ke...', '["Jantung", "Otak 🧠", "Perut"]', 'Otak 🧠', 1, 'Cahaya → mata → saraf optik → otak = kita lihat.'),

-- k5-ipas-02: Harmoni dalam Ekosistem
('k5-ipas-02', 'Produsen di rantai makanan adalah...', '["Kupu-kupu", "Daun/Tumbuhan 🌿", "Burung"]', 'Daun/Tumbuhan 🌿', 1, 'Produsen = tumbuhan, membuat makanan sendiri (fotosintesis).'),
('k5-ipas-02', 'Lebah & bunga saling menguntungkan. Simbiosis ini...', '["Mutualisme 🤝", "Komensalisme", "Parasitisme"]', 'Mutualisme 🤝', 1, 'Mutualisme = untung-untungan. Lebah dapat madu, bunga diserbuk.'),
('k5-ipas-02', 'Kutu di rambut termasuk simbiosis...', '["Mutualisme", "Komensalisme", "Parasitisme 😈"]', 'Parasitisme 😈', 1, 'Parasitisme = satu untung (kutu), satu rugi (manusia).'),
('k5-ipas-02', 'Piramida makanan: lapisan paling banyak adalah...', '["Konsumen puncak", "Produsen 🌿", "Konsumen 2"]', 'Produsen 🌿', 1, 'Produsen jumlahnya paling banyak (dasar piramida).'),
('k5-ipas-02', 'Jika belalang (konsumen 1) punah, maka...', '["Konsumen 2 & 3 kelaparan ⚖️", "Produsen habis", "Tidak ada pengaruh"]', 'Konsumen 2 & 3 kelaparan ⚖️', 1, 'Rantai makanan terputus → konsumen tingkat atas kekurangan makanan.'),

-- k5-ipas-03: Magnet, Listrik, dan Teknologi untuk Kehidupan
('k5-ipas-03', 'Dua kutub magnet utara (U-U) akan...', '["Tarik", "Tolak 🧲", "Diam"]', 'Tolak 🧲', 1, 'Kutub sejenis tolak, berlawanan tarik.'),
('k5-ipas-03', 'Lampu menyala butuh rangkaian...', '["Terbuka", "Tertutup 🔋", "Acak"]', 'Tertutup 🔋', 1, 'Arus listrik butuh rangkaian tertutup (loop lengkap).'),
('k5-ipas-03', 'Benda yang TIDAK ditarik magnet:...', '["Paku 🔩", "Koin 🪙", "Kertas 📄"]', 'Kertas 📄', 1, 'Magnet hanya tarik besi, nikel, kobalt. Kertas bukan logam feromagnetik.'),
('k5-ipas-03', 'Saklar OFF = rangkaian...', '["Terbuka 🔌", "Tertutup", "Pendek"]', 'Terbuka 🔌', 1, 'OFF memutus rangkaian = terbuka. Arus tidak mengalir.'),
('k5-ipas-03', 'Generator mengubah energi...', '["Gerak → Listrik ⚡", "Kimia → Listrik", "Panas → Listrik"]', 'Gerak → Listrik ⚡', 1, 'Generator: energi gerak (turbin) → listrik. Baterai: kimia → listrik.'),

-- k5-ipas-04: Ayo Berkenalan dengan Bumi Kita
('k5-ipas-04', 'Lapisan bumi tempat kita tinggal adalah...', '["Mantel", "Kerak 🌍", "Inti"]', 'Kerak 🌍', 1, 'Kerak = lapisan terluar, tipis, tempat kita hidup.'),
('k5-ipas-04', 'Gunung berapi terbentuk karena lempeng tektonik...', '["Bertabrakan 🌋", "Berjauhan", "Diam"]', 'Bertabrakan 🌋', 1, 'Tabrakan lempeng → tekanan → magma dorong ke atas = gunung berapi.'),
('k5-ipas-04', 'Indonesia banyak gunung berapi karena berada di...', '["Ring of Fire 🔥", "Kutub Utara", "Khatulistiwa"]', 'Ring of Fire 🔥', 1, 'Indonesia di Cincin Api Pasifik = pertemuan 3 lempeng besar.'),
('k5-ipas-04', 'Gempa bumi di laut bisa menyebabkan...', '["Banjir", "Tsunami 🌊", "Hujan"]', 'Tsunami 🌊', 1, 'Gempa dasar laut → air terdorong → gelombang raksasa = tsunami.'),
('k5-ipas-04', 'Jumlah gunung berapi AKTIF di Indonesia sekitar...', '["50", "127 🌋", "200"]', '127 🌋', 1, 'Indonesia punya ~127 gunung berapi aktif (terbanyak dunia).'),

-- k5-ipas-05: Bagaimana Kita Hidup dan Bertumbuh
('k5-ipas-05', 'Usus halus fungsinya...', '["Menghancurkan makanan", "Menyimpan feses", "MENYERAP nutrisi 🍽️"]', 'MENYERAP nutrisi 🍽️', 1, 'Usus halus = penyerapan nutrisi ke darah. Lambung = hancurkan. Usus besar = simpan feses.'),
('k5-ipas-05', 'Jantung memompa...', '["Udara", "Darah ❤️", "Makanan"]', 'Darah ❤️', 1, 'Jantung = pompa darah mengantarkan O₂ & nutrisi ke seluruh tubuh.'),
('k5-ipas-05', '4 sehat 5 sempurna: Karbo, Protein, Sayur, Buah + ...', '["Susu 🥛", "Gula", "Garam"]', 'Susu 🥛', 1, '5 sempurna = susu (kalsium untuk tulang).'),
('k5-ipas-05', 'Refleks (tarik tangan dari panas) diatur oleh...', '["Otak 🧠", "Jantung", "Lambung"]', 'Otak 🧠', 1, 'Refleks = respon cepat via saraf & otak (tidak perlu "pikir" lama).'),
('k5-ipas-05', 'Olahraga rutin membuat...', '["Jantung & otot KUAT 💪", "Cepat capek", "Tidak perlu tidur"]', 'Jantung & otot KUAT 💪', 1, 'Olahraga melatih jantung & otot, memperkuat sistem kardiovaskular.'),
('k5-ipas-05', 'Sistem yang mengontrol gerak & pikiran adalah...', '["Pencernaan", "Saraf 🧠", "Pernapasan"]', 'Saraf 🧠', 1, 'Sistem saraf = otak + saraf = pusat kendali gerak, pikir, perasaan.'),
('k5-ipas-05', 'Cuci tangan pakai sabun butuh...', '["5 detik", "20 detik 🚿", "1 menit"]', '20 detik 🚿', 1, 'WHO rekomendasikan 20 detik cuci tangan sabun agar kuman mati.'),
('k5-ipas-05', 'Paru-paru berfungsi...', '["Mencerna makanan", "Bertukar gas O₂ & CO₂ 🫁", "Memompa darah"]', 'Bertukar gas O₂ & CO₂ 🫁', 1, 'Paru-paru = pertukaran gas. O₂ masuk darah, CO₂ keluar.'),
('k5-ipas-05', 'Cara menjaga kesehatan reproduksi sederhana:...', '["Cuci tangan saja", "Cuci area intim & pakai celana dalam bersih 🚿", "Makan banyak"]', 'Cuci area intim & pakai celana dalam bersih 🚿', 1, 'Kebersihan area intim + celana dalam bersih = cegah infeksi.'),
('k5-ipas-05', 'Pertumbuhan tiap orang BERBEDA karena...', '["Genetik, nutrisi, olahraga 💪", "Hanya genetik", "Hanya makanan"]', 'Genetik, nutrisi, olahraga 💪', 1, 'Tinggi/berat badan dipengaruhi genetik (keturunan), nutrisi (makanan), olahraga.'),
('k5-ipas-05', 'Makanan "BERWARNA" di piring berarti...', '["Hanya warna-warni", "Nutrisi LENGKAP 🌈", "Mahal"]', 'Nutrisi LENGKAP 🌈', 1, 'Sayur/buah warna-warni = vitamin/mineral beragam = nutrisi lengkap.');