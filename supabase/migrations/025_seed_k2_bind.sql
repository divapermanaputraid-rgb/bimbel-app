-- Migration 025: Seed subject, materials, and questions for K2 B.Indonesia
-- 1 subject (bind, kelas 2) + 8 materials × 3 questions = 24 questions

-- Subject B.Indonesia Kelas 2
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k2-bind', 'bind', 'Bahasa Indonesia', '📖', 2, 1)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (8 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k2-bind-01', 2, 'k2-bind', 'Mengenal Perasaan', 'Bab 1 — Perasaan', '/buku/kelas2/bahasa-indonesia/k2-bind-01.html', 1),
  ('k2-bind-02', 2, 'k2-bind', 'Menjaga Kesehatan', 'Bab 2 — Kesehatan', '/buku/kelas2/bahasa-indonesia/k2-bind-02.html', 2),
  ('k2-bind-03', 2, 'k2-bind', 'Berhati-hati di Mana Saja', 'Bab 3 — Keselamatan', '/buku/kelas2/bahasa-indonesia/k2-bind-03.html', 3),
  ('k2-bind-04', 2, 'k2-bind', 'Keluargaku Unik', 'Bab 4 — Keluarga', '/buku/kelas2/bahasa-indonesia/k2-bind-04.html', 4),
  ('k2-bind-05', 2, 'k2-bind', 'Berteman dalam Keragaman', 'Bab 5 — Keragaman', '/buku/kelas2/bahasa-indonesia/k2-bind-05.html', 5),
  ('k2-bind-06', 2, 'k2-bind', 'Bijak Memakai Uang', 'Bab 6 — Literasi Keuangan', '/buku/kelas2/bahasa-indonesia/k2-bind-06.html', 6),
  ('k2-bind-07', 2, 'k2-bind', 'Sayang Lingkungan', 'Bab 7 — Lingkungan', '/buku/kelas2/bahasa-indonesia/k2-bind-07.html', 7),
  ('k2-bind-08', 2, 'k2-bind', 'Hobi yang Jadi Prestasi', 'Bab 8 — Hobi', '/buku/kelas2/bahasa-indonesia/k2-bind-08.html', 8)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (3 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k2-bind-01: Mengenal Perasaan
('k2-bind-01', 'Budi jatuh dari sepeda. Budi merasa...', '["SENANG 🥳", "SEDIH 😢", "MARAH 😤"]', 'SEDIH 😢', 1, 'Budi sedih karena jatuh. ✅'),
('k2-bind-01', 'Tika melihat ular besar. Tika merasa...', '["SENANG", "TAKUT", "MARAH"]', 'TAKUT', 1, 'Melihat ular membuat takut! ✅'),
('k2-bind-01', '"Aku berhasil!" Itu perasaan...', '["MALU", "BANGGA", "TAKUT"]', 'BANGGA', 1, 'Bangga karena berhasil! ✅'),

-- k2-bind-02: Menjaga Kesehatan
('k2-bind-02', 'Tidur yang cukup untuk anak-anak adalah... jam', '["5 jam", "8 jam", "10 jam"]', '10 jam', 1, 'Anak-anak butuh 10 jam tidur. ✅'),
('k2-bind-02', 'Olahraga membuat tubuh kita...', '["Lemah", "Kuat dan gembira 💪😊", "Ngantuk"]', 'Kuat dan gembira 💪😊', 1, 'Olahraga bikin kuat! ✅'),
('k2-bind-02', 'Yang BUKAN makanan bergizi adalah...', '["🍎 Apel", "🥦 Brokoli", "🍟 Kentang goreng terus"]', '🍟 Kentang goreng terus', 1, 'Kentang goreng terlalu banyak minyak tidak sehat. ✅'),

-- k2-bind-03: Berhati-hati di Mana Saja
('k2-bind-03', 'Lampu lalu lintas warna MERAH artinya...', '["Jalan terus 🚶", "Berhenti ✋", "Lari cepat 🏃"]', 'Berhenti ✋', 1, 'Merah artinya berhenti! ✅'),
('k2-bind-03', 'Main colokan listrik itu...', '["Aman saja", "Bahaya ⚡❌", "Seru banget"]', 'Bahaya ⚡❌', 1, 'Colokan listrik sangat berbahaya! ✅'),
('k2-bind-03', 'Orang asing memberi permen. Sebaiknya kita...', '["Terima dengan senang", "Tolak dan pergi 🚶", "Makan sekarang"]', 'Tolak dan pergi 🚶', 1, 'Tolak pemberian orang asing! ✅'),

-- k2-bind-04: Keluargaku Unik
('k2-bind-04', 'Kepala keluarga yang mencari nafkah adalah...', '["Ibu 👩", "Ayah 👨", "Anak 🧑"]', 'Ayah 👨', 1, 'Ayah adalah kepala keluarga. ✅'),
('k2-bind-04', 'Kita harus... pekerjaan orang tua', '["Mengejek", "Menghargai 👍", "Mengabaikan"]', 'Menghargai 👍', 1, 'Hargai pekerjaan orang tua! ✅'),
('k2-bind-04', 'Dengan saling membantu, keluarga jadi...', '["Bertengkar", "Semakin sayang 🤗", "Jauh"]', 'Semakin sayang 🤗', 1, 'Saling membantu bikin keluarga makin sayang! ✅'),

-- k2-bind-05: Berteman dalam Keragaman
('k2-bind-05', '"Bhinneka Tunggal Ika" artinya...', '["Satu untuk semua", "Berbeda-beda tapi tetap satu 🇮🇩", "Indonesia jaya"]', 'Berbeda-beda tapi tetap satu 🇮🇩', 1, 'Bhinneka Tunggal Ika = berbeda tapi tetap satu! ✅'),
('k2-bind-05', 'Teman yang sedang beribadah harus kita...', '["Ganggu", "Hormati 🙏", "Tertawakan"]', 'Hormati 🙏', 1, 'Hormati teman yang beribadah! ✅'),
('k2-bind-05', 'Perbedaan budaya membuat kita...', '["Bertengkar", "Belajar banyak hal baru 📚", "Pisah"]', 'Belajar banyak hal baru 📚', 1, 'Perbedaan bikin kita belajar! ✅'),

-- k2-bind-06: Bijak Memakai Uang
('k2-bind-06', 'Menabung artinya...', '["Menghabiskan uang", "Menyisihkan uang untuk masa depan 🐷", "Meminjam uang"]', 'Menyisihkan uang untuk masa depan 🐷', 1, 'Menabung = menyisihkan uang! ✅'),
('k2-bind-06', 'Yang DIDAHULUKAN adalah...', '["Keinginan 🧸", "Kebutuhan 🍚", "Mainan"]', 'Kebutuhan 🍚', 1, 'Kebutuhan didahulukan daripada keinginan! ✅'),
('k2-bind-06', 'Uang 5.000 adalah uang...', '["Logam", "Kertas 💵", "Receh"]', 'Kertas 💵', 1, 'Uang 5.000 adalah uang kertas. ✅'),

-- k2-bind-07: Sayang Lingkungan
('k2-bind-07', 'Sampah organik adalah sampah yang...', '["Dari plastik", "Mudah membusuk (sisa makanan) 🍌", "Berbahaya"]', 'Mudah membusuk (sisa makanan) 🍌', 1, 'Sampah organik mudah membusuk! ✅'),
('k2-bind-07', 'Pohon membuat udara menjadi...', '["Panas", "Segar dan sejuk 🌿", "Berbau"]', 'Segar dan sejuk 🌿', 1, 'Pohon membuat udara segar! ✅'),
('k2-bind-07', 'Yang BUKAN cara menghemat air adalah...', '["Mandi 10 menit 🚿", "Mandi 1 jam 🚿❌", "Matikan keran saat gosok gigi"]', 'Mandi 1 jam 🚿❌', 1, 'Mandi 1 jam boros air! ✅'),

-- k2-bind-08: Hobi yang Jadi Prestasi
('k2-bind-08', 'Saat gagal, yang benar adalah...', '["Menangis terus", "Mencoba lagi 💪", "Berhenti"]', 'Mencoba lagi 💪', 1, 'Jangan menyerah, coba lagi! ✅'),
('k2-bind-08', 'Hobi yang POSITIF adalah...', '["Membaca buku 📚", "Tidur terus", "Main game seharian"]', 'Membaca buku 📚', 1, 'Membaca adalah hobi positif! ✅'),
('k2-bind-08', 'Dengan latihan rutin, kemampuan kita akan...', '["Berkurang", "Meningkat 📈", "Hilang"]', 'Meningkat 📈', 1, 'Latihan rutin meningkatkan kemampuan! ✅');
