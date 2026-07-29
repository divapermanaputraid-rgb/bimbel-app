-- Migration 028: Seed subject, materials, and questions for K6 B.Indonesia
-- 1 subject (bind, kelas 6) + 6 materials × 5 questions = 30 questions

-- Subject B.Indonesia Kelas 6
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k6-bind', 'bind', 'Bahasa Indonesia', '📖', 6, 1)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (6 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k6-bind-01', 6, 'k6-bind', 'Bangga Menjadi Anak Indonesia', 'Bab 1 — Kebhinekaan, Pancasila, Cinta Tanah Air', '/buku/kelas6/bahasa-indonesia/k6-bind-01.html', 1),
  ('k6-bind-02', 6, 'k6-bind', 'Musisi Indonesia di Pentas Dunia', 'Bab 2 — Biografi Musisi, Tekun & Kreatif', '/buku/kelas6/bahasa-indonesia/k6-bind-02.html', 2),
  ('k6-bind-03', 6, 'k6-bind', 'Taman Nasional dan Situs Warisan Dunia', 'Bab 3 — Kekayaan Alam & Budaya, Melestarikan', '/buku/kelas6/bahasa-indonesia/k6-bind-03.html', 3),
  ('k6-bind-04', 6, 'k6-bind', 'Legenda: Putri Komodo', 'Bab 4 — Teks Legenda, Majas Personifikasi & Hiperbola', '/buku/kelas6/bahasa-indonesia/k6-bind-04.html', 4),
  ('k6-bind-05', 6, 'k6-bind', 'Anak-Anak yang Mengubah Dunia', 'Bab 5 — Tokoh Muda Inspiratif, Berani Bermimpi', '/buku/kelas6/bahasa-indonesia/k6-bind-05.html', 5),
  ('k6-bind-06', 6, 'k6-bind', 'Liburan Perpisahan Kelas', 'Bab 6 — Kenangan Sekolah, Surat Perpisahan, Harapan', '/buku/kelas6/bahasa-indonesia/k6-bind-06.html', 6)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (5 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k6-bind-01: Bangga Menjadi Anak Indonesia
('k6-bind-01', '''Kebhinekaan'' paling tepat artinya...', '["Persatuan dalam perbedaan", "Semua orang harus sama", "Saling bertengkar antar suku", "Hidup sendirian tanpa komunitas"]', 'Persatuan dalam perbedaan', 1, 'Kebhinekaan = persatuan dalam perbedaan. Bhinneka Tunggal Ika! ✅'),
('k6-bind-01', 'Semboyan "Bhinneka Tunggal Ika" berarti...', '["Berbeda-beda tetapi tetap satu", "Hanya satu suku yang diutamakan", "Tidak boleh berbeda pendapat", "Indonesia hanya punya satu bahasa daerah"]', 'Berbeda-beda tetapi tetap satu', 1, 'Bhinneka Tunggal Ika = berbeda-beda tetapi tetap satu! ✅'),
('k6-bind-01', 'Pancasila adalah dasar negara yang harus kita _____.', '["lupakan", "junjung", "hina", "abaikan"]', 'junjung', 1, 'Pancasila dijunjung tinggi sebagai dasar negara! ✅'),
('k6-bind-01', 'Jumlah pulau Indonesia diperkirakan lebih dari...', '["1.000", "5.000", "17.000", "100"]', '17.000', 1, 'Indonesia kepulauan > 17.000 pulau! 🇮🇩✅'),
('k6-bind-01', 'Sikap yang mencerminkan Bhinneka Tunggal Ika adalah...', '["Menghormati perbedaan suku dan agama", "Memaksa semua orang berbudaya sama", "Menolak teman dari daerah lain", "Hanya berteman dengan satu kelompok"]', 'Menghormati perbedaan suku dan agama', 1, 'Menghargai perbedaan = semangat Bhinneka Tunggal Ika! ✅'),

-- k6-bind-02: Musisi Indonesia di Pentas Dunia
('k6-bind-02', 'Siapa musisi Indonesia yang dikenal go internasional (contoh di materi)?', '["Anggun C. Sasmi", "Andi", "Budi", "Rina"]', 'Anggun C. Sasmi', 1, 'Anggun C. Sasmi = musisi Indonesia go internasional! 🎤✅'),
('k6-bind-02', 'Dalam biografi musisi, "tekun" paling dekat artinya...', '["Rajin berlatih dan tidak mudah menyerah", "Cukup berbakat tanpa latihan", "Hanya mengandalkan keberuntungan", "Meniru tanpa memahami karya"]', 'Rajin berlatih dan tidak mudah menyerah', 1, 'Tekun = rajin latihan + tidak menyerah! 💪✅'),
('k6-bind-02', 'Sikap yang mendukung menggapai mimpi di bidang musik adalah...', '["Latihan teratur dan berani mencoba", "Menunggu bakat datang sendiri", "Menyerah setelah satu kali gagal", "Menyalin karya orang tanpa izin"]', 'Latihan teratur dan berani mencoba', 1, 'Latihan rutin + keberanian = kunci mimpi! 🎵✅'),
('k6-bind-02', 'Pesan utama dari kisah musisi yang sukses biasanya...', '["Usaha konsisten mengalahkan hambatan", "Sukses tanpa kerja keras", "Tidak perlu belajar dari kritik", "Hanya orang kota yang boleh bermimpi"]', 'Usaha konsisten mengalahkan hambatan', 1, 'Konsisten usaha = bisa atasi hambatan! ✅'),
('k6-bind-02', 'Langkah realistis memulai mimpi musik di sekolah adalah...', '["Ikut paduan suara atau band sekolah", "Langsung tur dunia tanpa latihan", "Menghindari semua pertunjukan", "Menyerah sebelum mencoba"]', 'Ikut paduan suara atau band sekolah', 1, 'Paduan suara/band sekolah = langkah awal bagus! 🎵✅'),

-- k6-bind-03: Taman Nasional dan Situs Warisan Dunia
('k6-bind-03', 'Hewan komodo secara alami hanya ditemukan di...', '["Indonesia", "Brasil", "Kanada", "Mesir"]', 'Indonesia', 1, 'Komodo endemik Indonesia! 🦎🇮🇩✅'),
('k6-bind-03', 'Taman Nasional Komodo terkenal sebagai...', '["Situs Warisan Dunia UNESCO", "Pusat industri baja", "Bandara internasional terbesar", "Ibukota provinsi baru"]', 'Situs Warisan Dunia UNESCO', 1, 'TN Komodo = UNESCO World Heritage Site! 🏆✅'),
('k6-bind-03', 'Sikap tepat saat berkunjung ke taman nasional adalah...', '["Mengikuti aturan dan tidak mengganggu satwa", "Membuang sampah di jalur pendakian", "Membawa pulang tumbuhan dilindungi", "Berteriak keras di habitat hewan"]', 'Mengikuti aturan dan tidak mengganggu satwa', 1, 'Hormati aturan & jaga satwa! 🌿✅'),
('k6-bind-03', 'Melestarikan warisan alam dan budaya penting karena...', '["Menjaga identitas dan keberlanjutan generasi", "Tidak ada manfaatnya sama sekali", "Hanya untuk turis asing", "Menghambat ilmu pengetahuan"]', 'Menjaga identitas dan keberlanjutan generasi', 1, 'Pelestarian = identitas & keberlanjutan! 🌍✅'),
('k6-bind-03', 'Wisata bertanggung jawab berarti...', '["Menghormati aturan kawasan dan lingkungan setempat", "Mengambil suvenir dari satwa liar", "Merusak terumbu karang untuk foto", "Membuang sampah di jalur wisata"]', 'Menghormati aturan kawasan dan lingkungan setempat', 1, 'Wisata bijak = hormat aturan & lingkungan! ✅'),

-- k6-bind-04: Legenda: Putri Komodo
('k6-bind-04', '''Pulau Komodo berdiri gagah'' adalah majas...', '["Personifikasi", "Hiperbola", "Metafora", "Simile"]', 'Personifikasi', 1, 'Pulau seolah punya sikap manusia = personifikasi! ✨✅'),
('k6-bind-04', 'Dari legenda Putri Komodo, kita belajar...', '["Menghargai alam", "Mencuri", "Berbohong", "Malas"]', 'Menghargai alam', 1, 'Legenda ajar: jaga alam & pulau! 🌿✅'),
('k6-bind-04', 'Ciri teks legenda yang tepat adalah...', '["Latar masa lampau dan pesan bagi masyarakat", "Laporan percobaan laboratorium", "Daftar harga pasar modern", "Instruksi perakitan mesin"]', 'Latar masa lampau dan pesan bagi masyarakat', 1, 'Legenda = masa lampau + pesan moral! 📖✅'),
('k6-bind-04', 'Kalimat "Dia menunggu seribu tahun" paling dekat dengan majas...', '["Hiperbola", "Personifikasi", "Simile", "Ironi semata"]', 'Hiperbola', 1, 'Melebih-lebihkan waktu = hiperbola! 📈✅'),
('k6-bind-04', 'Nilai moral legenda sebaiknya...', '["Diterapkan dalam sikap nyata", "Diabaikan setelah ujian", "Hanya untuk tokoh fiksi", "Digunakan untuk menipu"]', 'Diterapkan dalam sikap nyata', 1, 'Moral = jadi tindakan nyata! 💚✅'),

-- k6-bind-05: Anak-Anak yang Mengubah Dunia
('k6-bind-05', 'Greta Thunberg dikenal sebagai aktivis di bidang...', '["Lingkungan", "Olahraga balap", "Kuliner cepat saji", "Desain mode saja"]', 'Lingkungan', 1, 'Greta = aktivis iklim muda! 🌍✅'),
('k6-bind-05', '''Berani bermimpi, berani beraksi'' menekankan...', '["Mimpi dilengkapi tindakan nyata", "Cukup bermimpi tanpa usaha", "Aksi tanpa tujuan", "Menunggu orang lain bertindak saja"]', 'Mimpi dilengkapi tindakan nyata', 1, 'Mimpi + aksi = perubahan! 💪✅'),
('k6-bind-05', 'Contoh aksi positif di sekolah adalah...', '["Bank sampah atau kampanye hemat energi", "Mengejek teman yang berbeda", "Merusak fasilitas umum", "Menyebarkan hoaks"]', 'Bank sampah atau kampanye hemat energi', 1, 'Aksi kecil sekolah = dampak nyata! 🌱✅'),
('k6-bind-05', 'Anak muda dapat berkontribusi dengan...', '["Aksi lokal yang konsisten dan bermanfaat", "Diam total tanpa peduli", "Merusak lingkungan", "Menyebarkan berita bohong"]', 'Aksi lokal yang konsisten dan bermanfaat', 1, 'Aksi lokal konsisten = kontribusi nyata! ✅'),
('k6-bind-05', 'Inspirasi dari tokoh dunia sebaiknya...', '["Disesuaikan menjadi aksi positif di lingkungan sendiri", "Dihafal tanpa diamalkan", "Digunakan untuk merendahkan teman", "Diabaikan karena ''masih kecil''"]', 'Disesuaikan menjadi aksi positif di lingkungan sendiri', 1, 'Inspirasi global → aksi lokal! 🌍✅'),

-- k6-bind-06: Liburan Perpisahan Kelas
('k6-bind-06', 'Andi menulis surat perpisahan untuk...', '["Guru dan teman-teman", "Orang yang tidak dikenal di internet saja", "Hewan peliharaan tetangga", "Mesin fotokopi sekolah"]', 'Guru dan teman-teman', 1, 'Surat perpisahan untuk guru & teman! ✉️✅'),
('k6-bind-06', 'Kalimat penutup surat yang sopan contohnya...', '["Terima kasih atas 6 tahun yang indah. Sampai jumpa!", "Aku tidak mau kenal lagi.", "Kalian semua salah.", "Tidak usah balas surat ini."]', 'Terima kasih atas 6 tahun yang indah. Sampai jumpa!', 1, 'Terima kasih + harapan bertemu = sopan! 🎓✅'),
('k6-bind-06', 'Kenangan sekolah sebaiknya ditulis...', '["Dengan bahasa runtut dan sudut yang jelas", "Acak tanpa ide pokok", "Hanya dengan singkatan sulit dibaca", "Untuk menjatuhkan nama orang"]', 'Dengan bahasa runtut dan sudut yang jelas', 1, 'Bahasa runtut + sudut jelas = kenangan bermakna! ✍️✅'),
('k6-bind-06', 'Harapan setelah lulus SD yang realistis contohnya...', '["Tetap rajin belajar di jenjang berikutnya", "Tidak pernah belajar lagi", "Menjadi astronot besok pagi tanpa sekolah", "Menghindari semua teman lama dengan marah"]', 'Tetap rajin belajar di jenjang berikutnya', 1, 'Harapan realistis = rajin belajar lanjut! 🌟✅'),
('k6-bind-06', 'Sikap saat perpisahan yang tepat adalah...', '["Bersyukur, sopan, dan menjaga silaturahmi", "Merusak fasilitas sekolah", "Menghina guru", "Membuang kenang-kenangan teman"]', 'Bersyukur, sopan, dan menjaga silaturahmi', 1, 'Perpisahan = syukur + silaturahmi! 🤝✅');