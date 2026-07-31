-- Migration 033: Seed subject, materials, and questions for K6 IPAS
-- 1 subject (ipas, kelas 6) + 8 materials × 5 questions = 40 questions

-- Subject IPAS Kelas 6
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k6-ipas', 'ipas', 'IPAS', '🌿', 6, 3)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (8 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k6-ipas-01', 6, 'k6-ipas', 'Bagaimana Tubuh Kita Bergerak?', 'Bab 1 — Sistem rangka, otot, persendian, tulang, cara menjaga kesehatan tulang & otot', '/buku/kelas6/ipas/k6-ipas-01.html', 1),
  ('k6-ipas-02', 6, 'k6-ipas', 'Cerita tentang Indonesia Kita', 'Bab 2 — Sejarah kemerdekaan, tokoh nasional, perjuangan, identitas bangsa', '/buku/kelas6/ipas/k6-ipas-02.html', 2),
  ('k6-ipas-03', 6, 'k6-ipas', 'Pelesir Keliling Dunia', 'Bab 3 — Benua, negara, ibu kota, bendera, kebudayaan dunia', '/buku/kelas6/ipas/k6-ipas-03.html', 3),
  ('k6-ipas-04', 6, 'k6-ipas', 'Indonesia dan Masyarakat Dunia', 'Bab 4 — Kerja sama internasional, ASEAN, PBB, perdagangan global', '/buku/kelas6/ipas/k6-ipas-04.html', 4),
  ('k6-ipas-05', 6, 'k6-ipas', 'Menjelajahi Bumi dan Antariksa', 'Bab 5 — Tata surya, planet, bumi & bulan, eksplorasi antariksa', '/buku/kelas6/ipas/k6-ipas-05.html', 5),
  ('k6-ipas-06', 6, 'k6-ipas', 'Gawat! Benarkah Energi di Bumi akan Habis?', 'Bab 6 — Sumber energi tak terbarukan vs terbarukan, hemat energi, energi alternatif', '/buku/kelas6/ipas/k6-ipas-06.html', 6),
  ('k6-ipas-07', 6, 'k6-ipas', 'Bumi Kita Terancam Bahaya', 'Bab 7 — Pemanasan global, polusi, deforestasi, upaya pelestarian', '/buku/kelas6/ipas/k6-ipas-07.html', 7),
  ('k6-ipas-08', 6, 'k6-ipas', 'Proyek Akhir IPAS', 'Bab 8 — Merancang proyek sederhana, presentasi hasil, refleksi pembelajaran', '/buku/kelas6/ipas/k6-ipas-08.html', 8)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  file_path = EXCLUDED.file_path,
  urutan = EXCLUDED.urutan;

-- Questions (5 per material = 40 total, level 1) — 4 pilihan
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k6-ipas-01
('k6-ipas-01', 'Jumlah tulang orang dewasa sekitar...', '["106", "206 🦴", "306", "406"]', '206 🦴', 1, 'Orang dewasa punya sekitar 206 tulang yang membentuk sistem rangka.'),
('k6-ipas-01', 'Yang menarik tulang agar bergerak adalah...', '["Saraf", "Darah", "Otot 💪", "Kulit"]', 'Otot 💪', 1, 'Otot berkontraksi dan menarik tulang lewat tendon agar tubuh bergerak.'),
('k6-ipas-01', 'Persendian berfungsi untuk...', '["Menghubungkan tulang 🤝", "Memompa darah", "Mencerna makanan", "Menyaring udara"]', 'Menghubungkan tulang 🤝', 1, 'Sendi menghubungkan tulang dan memungkinkan gerakan.'),
('k6-ipas-01', 'Tengkorak melindungi...', '["Jantung", "Paru-paru", "Otak 🧠", "Lambung"]', 'Otak 🧠', 1, 'Tengkorak = pelindung keras untuk otak.'),
('k6-ipas-01', 'Makanan kaya kalsium untuk tulang contohnya...', '["Permen", "Susu & ikan 🥛🐟", "Keripik", "Soda"]', 'Susu & ikan 🥛🐟', 1, 'Kalsium dari susu, ikan, sayuran hijau memperkuat tulang.'),

-- k6-ipas-02
('k6-ipas-02', 'Proklamasi kemerdekaan dibacakan pada...', '["1 Juni 1945", "17 Agustus 1945 🇮🇩", "28 Oktober 1928", "10 November 1945"]', '17 Agustus 1945 🇮🇩', 1, 'Soekarno-Hatta memproklamasikan kemerdekaan 17 Agustus 1945.'),
('k6-ipas-02', 'Yang membacakan teks proklamasi adalah...', '["Hatta", "Soekarno 📢", "Sjahrir", "Kartini"]', 'Soekarno 📢', 1, 'Soekarno membacakan, Soekarno & Hatta menandatangani.'),
('k6-ipas-02', 'RA Kartini dikenal karena perjuangan di bidang...', '["Perang bersenjata", "Emansipasi perempuan & pendidikan ✊", "Perdagangan", "Olahraga"]', 'Emansipasi perempuan & pendidikan ✊', 1, 'Kartini pejuang emansipasi dan pendidikan perempuan.'),
('k6-ipas-02', 'Dasar negara Indonesia adalah...', '["Kapitalisme", "Pancasila ⭐", "Komunisme", "Monarki"]', 'Pancasila ⭐', 1, 'Pancasila = dasar negara RI.'),
('k6-ipas-02', 'Lagu kebangsaan Indonesia adalah...', '["Garuda Pancasila", "Indonesia Raya 🎵", "Halo-Halo Bandung", "Maju Tak Gentar"]', 'Indonesia Raya 🎵', 1, 'Indonesia Raya = lagu kebangsaan.'),

-- k6-ipas-03
('k6-ipas-03', 'Jumlah benua di dunia adalah...', '["5", "6", "7 🌍", "8"]', '7 🌍', 1, 'Tujuh benua: Asia, Afrika, Eropa, Australia, Amerika Utara, Amerika Selatan, Antartika.'),
('k6-ipas-03', 'Indonesia terletak di benua...', '["Afrika", "Eropa", "Asia 🌏", "Australia"]', 'Asia 🌏', 1, 'Indonesia di Asia Tenggara.'),
('k6-ipas-03', 'Ibu kota Jepang adalah...', '["Beijing", "Seoul", "Tokyo 🗾", "Bangkok"]', 'Tokyo 🗾', 1, 'Ibu kota Jepang = Tokyo.'),
('k6-ipas-03', 'Ibu kota Prancis adalah...', '["London", "Berlin", "Paris 🗼", "Roma"]', 'Paris 🗼', 1, 'Ibu kota Prancis = Paris.'),
('k6-ipas-03', 'Budaya khas Indonesia yang terkenal dunia adalah...', '["Kimono", "Batik 🧵", "Tartan", "Sombrero"]', 'Batik 🧵', 1, 'Batik diakui UNESCO sebagai warisan budaya Indonesia.'),

-- k6-ipas-04
('k6-ipas-04', 'ASEAN adalah organisasi negara-negara di...', '["Eropa", "Asia Tenggara 🌏", "Afrika", "Amerika"]', 'Asia Tenggara 🌏', 1, 'ASEAN = Association of Southeast Asian Nations.'),
('k6-ipas-04', 'Jumlah anggota ASEAN saat ini adalah...', '["5", "8", "10 🔟", "15"]', '10 🔟', 1, 'ASEAN punya 10 negara anggota.'),
('k6-ipas-04', 'PBB berperan utama untuk...', '["Hanya olahraga", "Perdamaian & kerja sama dunia 🌐", "Menjual barang", "Membuat film"]', 'Perdamaian & kerja sama dunia 🌐', 1, 'PBB menjaga perdamaian dan kerja sama internasional.'),
('k6-ipas-04', 'Negara ASEAN yang BUKAN anggota adalah...', '["Thailand", "Vietnam", "Jepang 🇯🇵", "Malaysia"]', 'Jepang 🇯🇵', 1, 'Jepang di Asia Timur, bukan anggota ASEAN.'),
('k6-ipas-04', 'Contoh barang ekspor unggulan Indonesia...', '["Salju", "Kopi & CPO ☕", "Berlian Antartika", "Es kutub"]', 'Kopi & CPO ☕', 1, 'Indonesia ekspor CPO, kopi, batu bara, tekstil, dll.'),

-- k6-ipas-05
('k6-ipas-05', 'Jumlah planet di tata surya adalah...', '["7", "8 🌌", "9", "10"]', '8 🌌', 1, 'Delapan planet: Merkurius sampai Neptunus (Pluto = planet kerdil).'),
('k6-ipas-05', 'Planet terdekat dengan matahari adalah...', '["Venus", "Bumi", "Merkurius 🔥", "Mars"]', 'Merkurius 🔥', 1, 'Merkurius = planet terdalam/terdekat matahari.'),
('k6-ipas-05', 'Planet terbesar di tata surya adalah...', '["Bumi", "Saturnus", "Jupiter 🪐", "Neptunus"]', 'Jupiter 🪐', 1, 'Jupiter = raksasa gas terbesar.'),
('k6-ipas-05', 'Mars tampak kemerahan karena...', '["Api di permukaan", "Besi oksida 🔴", "Darah", "Cat merah"]', 'Besi oksida 🔴', 1, 'Permukaan Mars kaya besi oksida (karat).'),
('k6-ipas-05', 'Pusat tata surya adalah...', '["Bumi", "Bulan", "Matahari ☀️", "Jupiter"]', 'Matahari ☀️', 1, 'Matahari di pusat; planet mengorbit karena gravitasi.'),

-- k6-ipas-06
('k6-ipas-06', 'Contoh energi TAK TERBARUKAN adalah...', '["Angin", "Matahari", "Minyak bumi ⛽", "Air sungai"]', 'Minyak bumi ⛽', 1, 'Minyak bumi, batu bara, gas alam = fosil, habis.'),
('k6-ipas-06', 'Panel surya mengubah energi...', '["Angin → listrik", "Sinar matahari → listrik ☀️⚡", "Air → listrik", "Batu bara → listrik"]', 'Sinar matahari → listrik ☀️⚡', 1, 'Sel surya mengubah foton jadi listrik.'),
('k6-ipas-06', 'Contoh energi terbarukan adalah...', '["Batu bara", "Minyak bumi", "Angin 💨", "Gas alam"]', 'Angin 💨', 1, 'Angin, matahari, air, panas bumi = terbarukan.'),
('k6-ipas-06', 'PLTA memanfaatkan energi...', '["Batu bara", "Angin", "Air 💧", "Minyak"]', 'Air 💧', 1, 'PLTA = Pembangkit Listrik Tenaga Air.'),
('k6-ipas-06', 'Lampu LED lebih hemat karena...', '["Lebih redup selalu", "Konsumsi listrik lebih rendah 💡", "Tidak bisa mati", "Warna hanya putih"]', 'Konsumsi listrik lebih rendah 💡', 1, 'LED efisien: cahaya lebih banyak per watt.'),

-- k6-ipas-07
('k6-ipas-07', 'Gas utama penyebab pemanasan global adalah...', '["Oksigen", "Nitrogen", "Karbon dioksida (CO₂) 🌡️", "Helium"]', 'Karbon dioksida (CO₂) 🌡️', 1, 'CO₂ menahan panas di atmosfer (efek rumah kaca).'),
('k6-ipas-07', 'Deforestasi berarti...', '["Menanam hutan", "Penebangan hutan berlebih 🪓", "Membersihkan sungai", "Mendaur ulang"]', 'Penebangan hutan berlebih 🪓', 1, 'Deforestasi = hilangnya hutan secara besar-besaran.'),
('k6-ipas-07', '3R dalam pengelolaan sampah adalah...', '["Run, Rest, Race", "Reduce, Reuse, Recycle ♻️", "Read, Write, Count", "Red, Green, Blue"]', 'Reduce, Reuse, Recycle ♻️', 1, 'Kurangi, pakai ulang, daur ulang.'),
('k6-ipas-07', 'Transportasi ramah lingkungan contohnya...', '["Mobil sendirian tiap hari", "Sepeda & transportasi umum 🚲", "Motor balap", "Pesawat tiap jam"]', 'Sepeda & transportasi umum 🚲', 1, 'Sepeda dan transportasi umum kurangi emisi.'),
('k6-ipas-07', 'Manfaat menanam pohon...', '["Menambah CO₂", "Serap CO₂, hasilkan O₂, cegah erosi 🌳", "Hanya hiasan", "Menambah polusi"]', 'Serap CO₂, hasilkan O₂, cegah erosi 🌳', 1, 'Pohon fotosintesis serap CO₂, lepas O₂, akar cegah erosi.'),

-- k6-ipas-08
('k6-ipas-08', 'Langkah PERTAMA merancang proyek adalah...', '["Langsung presentasi", "Pilih topik & rumuskan pertanyaan 📋", "Beli alat mahal", "Salin punya orang"]', 'Pilih topik & rumuskan pertanyaan 📋', 1, 'Proyek dimulai dari topik dan pertanyaan penelitian.'),
('k6-ipas-08', 'Contoh proyek IPAS yang COCOK untuk kelas 6...', '["Bangun jembatan beton nyata", "Kompos / poster hemat energi / model tata surya 🍂", "Operasi bedah", "Peluncuran roket NASA"]', 'Kompos / poster hemat energi / model tata surya 🍂', 1, 'Proyek sederhana, aman, bisa dikerjakan di rumah/sekolah.'),
('k6-ipas-08', 'Kompos dari daun kering menghasilkan...', '["Plastik", "Pupuk organik 🌱", "Minyak bumi", "Besi"]', 'Pupuk organik 🌱', 1, 'Kompos = pupuk alami dari bahan organik terurai.'),
('k6-ipas-08', 'Presentasi yang baik mencakup...', '["Hanya baca slide cepat", "Latar, cara, hasil, pesan + suara jelas 🎤", "Diam saja", "Cerita di luar topik terus"]', 'Latar, cara, hasil, pesan + suara jelas 🎤', 1, 'Struktur jelas + komunikasi baik = presentasi efektif.'),
('k6-ipas-08', 'Setelah 8 bab IPAS, sikap terbaik adalah...', '["Lupa & acuh pada bumi", "Terus peduli sains, sejarah, & lingkungan 🌍", "Hanya main game", "Tolak semua sains"]', 'Terus peduli sains, sejarah, & lingkungan 🌍', 1, 'Ilmu IPAS untuk diterapkan sepanjang hidup.');
