-- Migration 024: Seed subject, materials, and questions for K1 MTK (new curriculum)
-- 9 materials × 3 questions = 27 questions total

-- Subject
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k1-mtk', 'mtk', 'Matematika', '🔢', 1, 1)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k1-mtk-01', 1, 'k1-mtk', 'Mengenal Bilangan 1–5', 'Bab 1 — Bilangan 1–5', '/buku/kelas1/matematika/k1-mtk-01.html', 1),
  ('k1-mtk-02', 1, 'k1-mtk', 'Mengenal Bilangan 6–10', 'Bab 1 — Bilangan 6–10', '/buku/kelas1/matematika/k1-mtk-02.html', 2),
  ('k1-mtk-03', 1, 'k1-mtk', 'Pasangan Bilangan', 'Bab 1 — Pasangan Bilangan', '/buku/kelas1/matematika/k1-mtk-03.html', 3),
  ('k1-mtk-04', 1, 'k1-mtk', 'Membandingkan Bilangan', 'Bab 1 — Membandingkan Bilangan', '/buku/kelas1/matematika/k1-mtk-04.html', 4),
  ('k1-mtk-05', 1, 'k1-mtk', 'Cerita Penjumlahan', 'Bab 2 — Penjumlahan', '/buku/kelas1/matematika/k1-mtk-05.html', 5),
  ('k1-mtk-06', 1, 'k1-mtk', 'Cara Menjumlahkan', 'Bab 2 — Penjumlahan', '/buku/kelas1/matematika/k1-mtk-06.html', 6),
  ('k1-mtk-07', 1, 'k1-mtk', 'Cerita Pengurangan', 'Bab 3 — Pengurangan', '/buku/kelas1/matematika/k1-mtk-07.html', 7),
  ('k1-mtk-08', 1, 'k1-mtk', 'Cara Mengurangi', 'Bab 3 — Pengurangan', '/buku/kelas1/matematika/k1-mtk-08.html', 8),
  ('k1-mtk-09', 1, 'k1-mtk', 'Bangun Datar di Sekitar Kita', 'Bab 4 — Bangun Datar', '/buku/kelas1/matematika/k1-mtk-09.html', 9)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (3 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k1-mtk-01: Mengenal Bilangan 1–5
('k1-mtk-01', 'Berapakah jumlah apel ini? 🍎🍎🍎🍎', '["3 apel", "4 apel", "5 apel"]', '4 apel', 1, 'Hitung satu per satu: 1, 2, 3, 4. Ada 4 apel! ✅'),
('k1-mtk-01', 'Lambang bilangan dari "tiga" adalah...', '["1", "2", "3"]', '3', 1, 'Angka 3 dibaca "tiga". ✅'),
('k1-mtk-01', 'Urutan yang benar dari yang terkecil adalah...', '["3, 2, 1", "1, 2, 3", "2, 1, 3"]', '1, 2, 3', 1, 'Urutan naik dimulai dari angka paling kecil. ✅'),

-- k1-mtk-02: Mengenal Bilangan 6–10
('k1-mtk-02', 'Berapakah jumlah bintang ini? ⭐⭐⭐⭐⭐⭐⭐⭐', '["7 bintang", "8 bintang", "9 bintang"]', '8 bintang', 1, 'Hitung: 1 sampai 8. Ada 8 bintang! ✅'),
('k1-mtk-02', 'Lambang bilangan "sembilan" adalah...', '["6", "8", "9"]', '9', 1, 'Angka 9 dibaca "sembilan". ✅'),
('k1-mtk-02', 'Sepuluh jari tangan berjumlah...', '["5 jari", "10 jari", "15 jari"]', '10 jari', 1, 'Dua tangan, masing-masing 5 jari, total 10! ✅'),

-- k1-mtk-03: Pasangan Bilangan
('k1-mtk-03', '5 = 1 + ...', '["3", "4", "5"]', '4', 1, '1 + 4 = 5. Pasangan 1 adalah 4! ✅'),
('k1-mtk-03', 'Mana pasangan yang benar untuk 7?', '["2 + 4 = 7", "3 + 4 = 7", "5 + 3 = 7"]', '3 + 4 = 7', 1, '3 + 4 = 7. ✅'),
('k1-mtk-03', 'Upe punya 4 apel 🍎🍎🍎🍎, Kira punya 1 apel 🍎. Jumlah semuanya...', '["4 apel", "5 apel", "6 apel"]', '5 apel', 1, '4 + 1 = 5. ✅'),

-- k1-mtk-04: Membandingkan Bilangan
('k1-mtk-04', 'Mana yang LEBIH BANYAK? 🐱🐱🐱🐱 atau 🐶🐶🐶', '["🐱🐱🐱🐱", "🐶🐶🐶", "Sama banyak"]', '🐱🐱🐱🐱', 1, '4 kucing lebih banyak dari 3 anjing! ✅'),
('k1-mtk-04', 'Kelas A punya 8 siswa. Kelas B punya 8 siswa. Berarti...', '["Kelas A lebih banyak", "Kelas B lebih banyak", "Sama banyak"]', 'Sama banyak', 1, '8 sama dengan 8. ✅'),
('k1-mtk-04', 'Bilangan yang LEBIH KECIL dari 7 adalah...', '["4", "8", "9"]', '4', 1, '4 lebih kecil dari 7. 8 dan 9 lebih besar. ✅'),

-- k1-mtk-05: Cerita Penjumlahan
('k1-mtk-05', 'Tika punya 2 bunga 🌸🌸. Upe kasih 2 bunga lagi 🌸🌸. Berapa bunga Tika sekarang?', '["2 bunga", "3 bunga", "4 bunga"]', '4 bunga', 1, '2 + 2 = 4. ✅'),
('k1-mtk-05', '3 + 2 = ...', '["4", "5", "6"]', '5', 1, '3 + 2 = 5. ✅'),
('k1-mtk-05', 'Ada 5 bebek 🐤🐤🐤🐤🐤 di kolam. Datang 3 bebek lagi 🐤🐤🐤. Berapa bebek sekarang?', '["7 bebek", "8 bebek", "9 bebek"]', '8 bebek', 1, '5 + 3 = 8. ✅'),

-- k1-mtk-06: Cara Menjumlahkan
('k1-mtk-06', 'Berapakah 3 + 4 jika dihitung pakai jari?', '["6", "7", "8"]', '7', 1, '3 jari + 4 jari = 7 jari. ✅'),
('k1-mtk-06', 'Mulai dari 4, lompat maju 3 langkah di garis bilangan. Sampai angka berapa?', '["6", "7", "8"]', '7', 1, '4 → 5 → 6 → 7. Sampai di 7! ✅'),
('k1-mtk-06', '4 + 1 sama dengan...', '["1 + 4", "4 - 1", "5 - 4"]', '1 + 4', 1, 'Sifat komutatif: 4+1 = 1+4 = 5. ✅'),

-- k1-mtk-07: Cerita Pengurangan
('k1-mtk-07', 'Malosi punya 8 kue 🧁🧁🧁🧁🧁🧁🧁🧁. Dimakan 3 kue. Sisa berapa?', '["4 kue", "5 kue", "6 kue"]', '5 kue', 1, '8 - 3 = 5. ✅'),
('k1-mtk-07', '10 − 4 = ...', '["5", "6", "7"]', '6', 1, '10 - 4 = 6. ✅'),
('k1-mtk-07', 'Ada 7 burung 🐦🐦🐦🐦🐦🐦🐦 di pohon. Terbang 2 burung. Sisa berapa?', '["4 burung", "5 burung", "6 burung"]', '5 burung', 1, '7 - 2 = 5. ✅'),

-- k1-mtk-08: Cara Mengurangi
('k1-mtk-08', '8 − 3 = ...', '["4", "5", "6"]', '5', 1, 'Buka 8 jari, tutup 3, sisa 5! ✅'),
('k1-mtk-08', 'Mulai dari 7, mundur 2 langkah di garis bilangan. Sampai angka?', '["4", "5", "6"]', '5', 1, '7 → 6 → 5. Sampai di 5! ✅'),
('k1-mtk-08', 'Kalau 4 + 3 = 7, maka 7 − 4 = ...', '["2", "3", "4"]', '3', 1, 'Pasangan 4 adalah 3. 7 - 4 = 3! ✅'),

-- k1-mtk-09: Bangun Datar di Sekitar Kita
('k1-mtk-09', 'Bentuk yang memiliki 4 sisi sama panjang adalah...', '["Persegi ⬛", "Persegi panjang ▬", "Segitiga 🔺"]', 'Persegi ⬛', 1, 'Persegi punya 4 sisi sama panjang! ✅'),
('k1-mtk-09', 'Bola sepak memiliki bentuk dasar... ⚽', '["Persegi", "Segitiga", "Lingkaran"]', 'Lingkaran', 1, 'Bola berbentuk lingkaran/bola. ✅'),
('k1-mtk-09', 'Berapa jumlah sisi segitiga? 🔺', '["2 sisi", "3 sisi", "4 sisi"]', '3 sisi', 1, 'Segitiga punya 3 sisi! ✅'),

-- k1-mtk-10: Mengelompokkan Benda
('k1-mtk-10', '🍎🍎🍎 (apel) dan 🍌🍌 (pisang). Kelompok apel ada...', '["2 apel", "3 apel", "5 apel"]', '3 apel', 1, 'Apel ada 3, pisang ada 2. ✅'),
('k1-mtk-10', 'Mana yang TIDAK termasuk kelompok warna merah? 🔴', '["🍎 apel merah", "🌻 bunga matahari", "🛑 rambu berhenti"]', '🌻 bunga matahari', 1, 'Bunga matahari kuning, bukan merah! ✅'),
('k1-mtk-10', 'Kelompok BESAR dan KECIL. 🐘 gajah masuk ke kelompok...', '["Kelompok besar", "Kelompok kecil", "Dua-duanya"]', 'Kelompok besar', 1, 'Gajah binatang besar! ✅'),

-- k1-mtk-11: Bilangan 11–15
('k1-mtk-11', 'Berapakah 10 + 3?', '["12", "13", "14"]', '13', 1, '10 + 3 = 13. ✅'),
('k1-mtk-11', 'Angka sebelum 14 adalah...', '["12", "13", "15"]', '13', 1, 'Sebelum 14 adalah 13. ✅'),
('k1-mtk-11', 'Urutan yang benar dari yang terkecil: 14, 11, 13', '["11, 13, 14", "14, 13, 11", "13, 11, 14"]', '11, 13, 14', 1, '11 paling kecil, lalu 13, lalu 14. ✅'),

-- k1-mtk-12: Bilangan 16–20
('k1-mtk-12', '10 jari tangan + 8 jari kaki (dibayangkan) = ... jari', '["16", "18", "20"]', '18', 1, '10 + 8 = 18. ✅'),
('k1-mtk-12', 'Angka 19 dibaca...', '["Sembilan belas", "Satu sembilan", "Dua puluh"]', 'Sembilan belas', 1, '19 = sembilan belas. ✅'),
('k1-mtk-12', '15 = 10 + ...', '["4", "5", "6"]', '5', 1, '10 + 5 = 15. ✅'),

-- k1-mtk-13: Penjumlahan sampai 20
('k1-mtk-13', 'Berapakah 12 + 5?', '["15", "16", "17"]', '17', 1, '12 + 5 = 17. ✅'),
('k1-mtk-13', 'Kira punya 15 🍬. Upe kasih 3 🍬. Berapa sekarang?', '["17 🍬", "18 🍬", "19 🍬"]', '18 🍬', 1, '15 + 3 = 18. ✅'),
('k1-mtk-13', 'Mana yang hasilnya PALING BESAR?', '["8 + 5", "9 + 4", "7 + 7"]', '7 + 7', 1, '7+7=14, yang lain 13. 14 paling besar! ✅'),

-- k1-mtk-14: Pengurangan sampai 20
('k1-mtk-14', '18 − 7 = ...', '["9", "10", "11"]', '11', 1, '18 - 7 = 11. ✅'),
('k1-mtk-14', 'Upe punya 16 🍭, dikasih ke Tika 4 🍭. Sisa Upe...', '["10 🍭", "11 🍭", "12 🍭"]', '12 🍭', 1, '16 - 4 = 12. ✅'),
('k1-mtk-14', 'Kalau 9 + 6 = 15, maka 15 − 9 = ...', '["5", "6", "7"]', '6', 1, 'Pasangan 9 adalah 6. 15 - 9 = 6! ✅'),

-- k1-mtk-15: Lebih, Kurang, dan Selisih
('k1-mtk-15', 'Mana yang LEBIH BESAR: 18 atau 14?', '["18", "14", "Sama besar"]', '18', 1, '18 lebih besar dari 14. ✅'),
('k1-mtk-15', 'Selisih antara 20 dan 15 adalah...', '["3", "4", "5"]', '5', 1, '20 - 15 = 5. ✅'),
('k1-mtk-15', 'Upe punya 19 🍭, Kira punya 11 🍭. Selisihnya...', '["6 🍭", "7 🍭", "8 🍭"]', '8 🍭', 1, '19 - 11 = 8. ✅'),

-- k1-mtk-16: Membandingkan Panjang Benda
('k1-mtk-16', 'Mana yang LEBIH PANJANG? 🐍 ular atau 🐛 ulat?', '["🐍 ular", "🐛 ulat", "Sama panjang"]', '🐍 ular', 1, 'Ular lebih panjang dari ulat! ✅'),
('k1-mtk-16', 'Paling PANJANG di antara: pensil, meja, penghapus', '["Pensil ✏️", "Meja 📐", "Penghapus ●"]', 'Meja 📐', 1, 'Meja adalah yang paling panjang! ✅'),
('k1-mtk-16', 'Dua spidol baru biasanya...', '["Sama panjang", "Berbeda panjang", "Pendek semua"]', 'Sama panjang', 1, 'Spidol baru dari kotak biasanya sama panjang. ✅'),

-- k1-mtk-17: Mengukur dengan Benda Tidak Baku
('k1-mtk-17', 'Alat ukur TIDAK BAKU adalah...', '["Penggaris 📏", "Jengkal tangan 🖐️", "Meteran 📐"]', 'Jengkal tangan 🖐️', 1, 'Jengkal pakai tangan, bukan alat baku. ✅'),
('k1-mtk-17', 'Untuk mengukur panjang kelas, paling cocok pakai...', '["Jengkal", "Langkah kaki", "Pensil"]', 'Langkah kaki', 1, 'Langkah kaki paling cocok untuk jarak jauh. ✅'),
('k1-mtk-17', 'Mengapa hasil jengkal Upe dan Ayah berbeda?', '["Mejanya beda", "Ukuran tangan beda", "Salah hitung"]', 'Ukuran tangan beda', 1, 'Tangan Upe kecil, tangan Ayah besar. ✅'),

-- k1-mtk-18: Mengelompokkan Data dan Diagram Gambar
('k1-mtk-18', 'Tabel: 🚗=4, 🚲=2, ✈️=3. Kendaraan paling banyak adalah...', '["🚗 Mobil", "🚲 Sepeda", "✈️ Pesawat"]', '🚗 Mobil', 1, 'Mobil ada 4, paling banyak! ✅'),
('k1-mtk-18', 'Diagram: 🐱🐱🐱🐱🐱 (5), 🐶🐶🐶 (3). Selisih kucing dan anjing...', '["1", "2", "3"]', '2', 1, '5 - 3 = 2. ✅'),
('k1-mtk-18', 'Kalau 🐟🐟🐟🐟 berarti ada... ikan', '["3 ikan", "4 ikan", "5 ikan"]', '4 ikan', 1, 'Hitung: 1, 2, 3, 4. Empat ikan! ✅');
