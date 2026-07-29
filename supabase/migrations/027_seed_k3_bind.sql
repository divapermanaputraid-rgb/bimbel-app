-- Migration 027: Seed subject, materials, and questions for K3 B.Indonesia
-- 1 subject (bind, kelas 3) + 8 materials × 4 questions = 32 questions

-- Subject B.Indonesia Kelas 3
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k3-bind', 'bind', 'Bahasa Indonesia', '📖', 3, 1)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (8 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k3-bind-01', 3, 'k3-bind', 'Ayo, Main!', 'Bab 1 — Permainan & Kerja Sama', '/buku/kelas3/bahasa-indonesia/k3-bind-01.html', 1),
  ('k3-bind-02', 3, 'k3-bind', 'Kawan Seiring', 'Bab 2 — Persahabatan', '/buku/kelas3/bahasa-indonesia/k3-bind-02.html', 2),
  ('k3-bind-03', 3, 'k3-bind', 'Pengobar Semangat', 'Bab 3 — Tokoh Inspirasi', '/buku/kelas3/bahasa-indonesia/k3-bind-03.html', 3),
  ('k3-bind-04', 3, 'k3-bind', 'Senyum di Sekitarku', 'Bab 4 — Kebaikan & Peduli', '/buku/kelas3/bahasa-indonesia/k3-bind-04.html', 4),
  ('k3-bind-05', 3, 'k3-bind', 'Bola-Bola Cokelat', 'Bab 5 — Kerja Sama & Toleransi', '/buku/kelas3/bahasa-indonesia/k3-bind-05.html', 5),
  ('k3-bind-06', 3, 'k3-bind', 'Tersesat', 'Bab 6 — Keberanian', '/buku/kelas3/bahasa-indonesia/k3-bind-06.html', 6),
  ('k3-bind-07', 3, 'k3-bind', 'Aku dan Si Merah', 'Bab 7 — Cinta Alam', '/buku/kelas3/bahasa-indonesia/k3-bind-07.html', 7),
  ('k3-bind-08', 3, 'k3-bind', 'Sahabat dari Seberang', 'Bab 8 — Persahabatan Lintas Budaya', '/buku/kelas3/bahasa-indonesia/k3-bind-08.html', 8)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (4 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k3-bind-01: Ayo, Main!
('k3-bind-01', 'Permainan tradisional yang pakai tali disebut...', '["Gobak sodor", "Lompat tali", "Video game"]', 'Lompat tali', 1, 'Lompat tali pakai tali dan dilompati! ✅'),
('k3-bind-01', 'Aturan bermain penting supaya...', '["Main jadi adil", "Main jadi membosankan", "Main jadi kacau"]', 'Main jadi adil', 1, 'Aturan bikin main adil dan seru! ✅'),
('k3-bind-01', '🤝 artinya...', '["Berkelahi", "Tolong-menolong / kerja sama", "Sendirian"]', 'Tolong-menolong / kerja sama', 1, '🤝 = kerja sama! ✅'),
('k3-bind-01', 'Susun: s-e-m-a-n-g-a-t →', '["semnagat", "semangat", "smangat"]', 'semangat', 1, 's-e-m-a-n-g-a-t = semangat! ✅'),

-- k3-bind-02: Kawan Seiring
('k3-bind-02', 'Sahabat sejati adalah teman yang...', '["Hanya ada saat senang", "Ada saat senang dan sedih", "Suka mengejek"]', 'Ada saat senang dan sedih', 1, 'Sahabat sejati selalu ada! ✅'),
('k3-bind-02', 'Andi merusak pensil Meutia. Sikap Meutia yang benar...', '["Marah terus", "Memaafkan", "Membalas rusak barang Andi"]', 'Memaafkan', 1, 'Memaafkan = melepaskan marah! ✅'),
('k3-bind-02', '🤝 artinya...', '["Berkelahi", "Tolong-menolong", "Sendirian"]', 'Tolong-menolong', 1, '🤝 = tolong-menolong! ✅'),
('k3-bind-02', '''Saling membantu'' artinya...', '["Membantu satu sama lain", "Menunggu dibantu", "Menolak bantuan"]', 'Membantu satu sama lain', 1, 'Saling = satu sama lain! ✅'),

-- k3-bind-03: Pengobar Semangat
('k3-bind-03', 'Jenderal Sudirman berjuang meski...', '["Sehat", "Sakit", "Bosan"]', 'Sakit', 1, 'Dia sakit tapi tetap berjuang! ✅'),
('k3-bind-03', 'Siapa yang pantang menyerah?', '["Alfa yang latihan tiap hari", "Budi yang mudah menyerah", "Andi yang malas"]', 'Alfa yang latihan tiap hari', 1, 'Latihan tiap hari = pantang menyerah! ✅'),
('k3-bind-03', 'Susun: s-e-m-a-n-g-a-t →', '["smangat", "semangat", "semnagat"]', 'semangat', 1, 's-e-m-a-n-g-a-t = semangat! ✅'),
('k3-bind-03', '''Pengobar semangat'' artinya orang yang...', '["Membuat orang lain bersemangat", "Membuat orang sedih", "Diam saja"]', 'Membuat orang lain bersemangat', 1, 'Pengobar = yang membakar semangat! ✅'),

-- k3-bind-04: Senyum di Sekitarku
('k3-bind-04', 'Contoh kebaikan kecil adalah...', '["Mengejek teman", "Berbagi makanan", "Membuang sampah sembarangan"]', 'Berbagi makanan', 1, 'Berbagi = kebaikan kecil! ✅'),
('k3-bind-04', 'Saat melihat teman sedih, kita sebaiknya...', '["Menjauhi", "Bertanya dan membantu", "Tertawa"]', 'Bertanya dan membantu', 1, 'Peduli = tanya dan bantu! ✅'),
('k3-bind-04', '😊 artinya...', '["Marah", "Senyum / bahagia", "Sedih"]', 'Senyum / bahagia', 1, '😊 = senyum! ✅'),
('k3-bind-04', 'Senyum bisa...', '["Menular dan membuat orang lain bahagia", "Membuat orang marah", "Tidak berguna"]', 'Menular dan membuat orang lain bahagia', 1, 'Senyum menular! ✅'),

-- k3-bind-05: Bola-Bola Cokelat
('k3-bind-05', 'Kerja sama membuat pekerjaan menjadi...', '["Lebih sulit", "Lebih mudah dan cepat", "Lebih lama"]', 'Lebih mudah dan cepat', 1, 'Kerja sama = lebih cepat! ✅'),
('k3-bind-05', 'Sikap yang benar pada teman berbeda daerah...', '["Mengejek", "Menghargai dan berteman", "Menjauhi"]', 'Menghargai dan berteman', 1, 'Hargai perbedaan! ✅'),
('k3-bind-05', '🌈 artinya...', '["Kesamaan", "Keberagaman / perbedaan indah", "Pertengkaran"]', 'Keberagaman / perbedaan indah', 1, '🌈 = keberagaman indah! ✅'),
('k3-bind-05', 'Setiap orang dalam kelompok punya...', '["Tugas yang sama", "Tugas masing-masing", "Tidak ada tugas"]', 'Tugas masing-masing', 1, 'Tiap orang punya tugas! ✅'),

-- k3-bind-06: Tersesat
('k3-bind-06', 'Saat tersesat, kita harus minta tolong pada...', '["Orang dewasa yang dipercaya", "Siapa saja", "Tidak perlu minta tolong"]', 'Orang dewasa yang dipercaya', 1, 'Minta tolong ke orang dewasa terpercaya! ✅'),
('k3-bind-06', 'Andi tidak panik karena...', '["Dia lupa", "Dia ingat pesan Ibu", "Dia tidak peduli"]', 'Dia ingat pesan Ibu', 1, 'Ingat pesan Ibu: jangan panik! ✅'),
('k3-bind-06', '🧭 artinya...', '["Tersesat", "Petunjuk arah / penjelajah", "Panik"]', 'Petunjuk arah / penjelajah', 1, '🧭 = kompas / penjelajah! ✅'),
('k3-bind-06', 'Langkah ke-1 saat tersesat adalah...', '["Berlari", "Tenang dulu", "Berteriak"]', 'Tenang dulu', 1, 'Tenang dulu, jangan panik! ✅'),

-- k3-bind-07: Aku dan Si Merah
('k3-bind-07', 'Cara merawat hewan terluka adalah...', '["Meninggalkannya", "Memberi makan, air, dan obat", "Mengurung tanpa peduli"]', 'Memberi makan, air, dan obat', 1, 'Rawat dengan makan, air, obat! ✅'),
('k3-bind-07', 'Burung yang sudah sembuh sebaiknya...', '["Dikurung selamanya", "Dilepas ke alam bebas", "Dijual"]', 'Dilepas ke alam bebas', 1, 'Burung harus bebas di alam! ✅'),
('k3-bind-07', '🐦 artinya...', '["Ikan", "Burung", "Kucing"]', 'Burung', 1, '🐦 = burung! ✅'),
('k3-bind-07', 'Alfa menamai burung itu...', '["Si Biru", "Si Merah", "Si Hijau"]', 'Si Merah', 1, 'Namanya Si Merah! ✅'),

-- k3-bind-08: Sahabat dari Seberang
('k3-bind-08', 'Surat Meutia dikirim ke...', '["Teman sekelas", "Aisyah di Malaysia", "Bu Guru"]', 'Aisyah di Malaysia', 1, 'Teman pena dari Malaysia! ✅'),
('k3-bind-08', 'Persahabatan lintas budaya membuat kita...', '["Lebih sempit", "Lebih kaya wawasan", "Lebih sombong"]', 'Lebih kaya wawasan', 1, 'Lintas budaya = wawasan lebih luas! ✅'),
('k3-bind-08', '✉️ artinya...', '["Telepon", "Surat", "Buku"]', 'Surat', 1, '✉️ = surat! ✅'),
('k3-bind-08', '''Saling mengenal'' artinya...', '["Tidak peduli", "Belajar tentang satu sama lain", "Bertengkar"]', 'Belajar tentang satu sama lain', 1, 'Saling mengenal = belajar tentang satu sama lain! ✅');
