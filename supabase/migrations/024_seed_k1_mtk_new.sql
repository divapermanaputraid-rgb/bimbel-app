-- Migration 024: Seed subject, materials, and questions for K1 MTK + B.Indo + B.Inggris
-- 26 materials × 3 questions = 78 questions total

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

-- Subject B.Indonesia
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k1-bind', 'bind', 'Bahasa Indonesia', '📖', 1, 2)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k1-bind-01', 1, 'k1-bind', 'Bunyi Apa?', 'Bab 1 — Suara & Huruf B', '/buku/kelas1/bahasa-indonesia/k1-bind-01.html', 1),
  ('k1-bind-02', 1, 'k1-bind', 'Ayo Bermain!', 'Bab 2 — Permainan & Huruf H/C', '/buku/kelas1/bahasa-indonesia/k1-bind-02.html', 2),
  ('k1-bind-03', 1, 'k1-bind', 'Awas Kuman!', 'Bab 3 — Kebersihan & Huruf K', '/buku/kelas1/bahasa-indonesia/k1-bind-03.html', 3),
  ('k1-bind-04', 1, 'k1-bind', 'Aku Bisa!', 'Bab 4 — Gerak Tubuh & Huruf L', '/buku/kelas1/bahasa-indonesia/k1-bind-04.html', 4),
  ('k1-bind-05', 1, 'k1-bind', 'Teman Baru', 'Bab 5 — Perkenalan & Berteman', '/buku/kelas1/bahasa-indonesia/k1-bind-05.html', 5),
  ('k1-bind-06', 1, 'k1-bind', 'Temanku Berbeda', 'Bab 6 — Perbedaan & Toleransi', '/buku/kelas1/bahasa-indonesia/k1-bind-06.html', 6),
  ('k1-bind-07', 1, 'k1-bind', 'Aku Ingin', 'Bab 7 — Kebutuhan & Keinginan', '/buku/kelas1/bahasa-indonesia/k1-bind-07.html', 7),
  ('k1-bind-08', 1, 'k1-bind', 'Di Sekitar Rumah', 'Bab 8 — Lingkungan & Arah', '/buku/kelas1/bahasa-indonesia/k1-bind-08.html', 8)
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
('k1-mtk-18', 'Kalau 🐟🐟🐟🐟 berarti ada... ikan', '["3 ikan", "4 ikan", "5 ikan"]', '4 ikan', 1, 'Hitung: 1, 2, 3, 4. Empat ikan! ✅'),

-- k1-bind-01: Bunyi Apa?
('k1-bind-01', '"Meong meong" adalah suara hewan...', '["🐱 Kucing", "🐦 Burung", "🐶 Anjing"]', '🐱 Kucing', 1, 'Kucing bersuara meong meong! ✅'),
('k1-bind-01', 'Huruf awal kata "🍌" pisang adalah...', '["B", "P", "M"]', 'P', 1, 'Pisang huruf awalnya P. ✅'),
('k1-bind-01', 'Benda yang huruf awalnya B adalah...', '["🍎 Apel", "⚽ Bola", "🐱 Kucing"]', '⚽ Bola', 1, 'Bola huruf awalnya B! ✅'),

-- k1-bind-02: Ayo Bermain!
('k1-bind-02', 'Permainan yang pakai tali dan dilompati disebut...', '["Petak umpet", "Lompat tali", "Layang-layang"]', 'Lompat tali', 1, 'Lompat tali pakai tali dan dilompati! ✅'),
('k1-bind-02', 'Huruf awal kata "Catur" ♟️ adalah...', '["C", "H", "K"]', 'C', 1, 'Catur huruf awalnya C. ✅'),
('k1-bind-02', '"Ayo bermain!" Kata bermain artinya...', '["Bekerja", "Belajar", "Melakukan permainan"]', 'Melakukan permainan', 1, 'Bermain = melakukan permainan! ✅'),

-- k1-bind-03: Awas Kuman!
('k1-bind-03', 'Kita harus cuci tangan sebelum...', '["Tidur", "Makan 🍚", "Menulis ✏️"]', 'Makan 🍚', 1, 'Cuci tangan sebelum makan! ✅'),
('k1-bind-03', 'Huruf awal kata "🦠" (Kuman) adalah...', '["B", "K", "M"]', 'K', 1, 'Kuman huruf awalnya K. ✅'),
('k1-bind-03', 'Mandi dilakukan sehari...', '["1 kali", "2 kali", "3 kali"]', '2 kali', 1, 'Mandi 2 kali sehari, pagi dan sore. ✅'),

-- k1-bind-04: Aku Bisa!
('k1-bind-04', 'Melompat artinya...', '["Diam saja", "Angkat kaki dan loncat 🙆", "Duduk 🪑"]', 'Angkat kaki dan loncat 🙆', 1, 'Melompat = angkat kaki dan loncat! ✅'),
('k1-bind-04', 'Huruf awal "🕯️" (Lilin) adalah...', '["L", "I", "N"]', 'L', 1, 'Lilin huruf awalnya L. ✅'),
('k1-bind-04', 'Kegiatan yang bisa dilakukan setelah mandi adalah...', '["Main kotor-kotoran", "Pakai baju bersih 👕", "Langsung tidur"]', 'Pakai baju bersih 👕', 1, 'Setelah mandi pakai baju bersih! ✅'),

-- k1-bind-05: Teman Baru
('k1-bind-05', '"Halo, namaku Upe." Itu adalah contoh...', '["Perkenalan 🙋", "Makan siang", "Belajar"]', 'Perkenalan 🙋', 1, 'Itu adalah perkenalan! ✅'),
('k1-bind-05', 'Berteman itu membuat kita...', '["Sedih", "Senang 😊", "Marah"]', 'Senang 😊', 1, 'Berteman membuat kita senang! ✅'),
('k1-bind-05', 'Huruf awal kata "🤝" (Teman) adalah...', '["B", "T", "S"]', 'T', 1, 'Teman huruf awalnya T. ✅'),

-- k1-bind-06: Temanku Berbeda
('k1-bind-06', 'Perbedaan membuat dunia seperti...', '["Hitam putih", "Pelangi 🌈", "Air"]', 'Pelangi 🌈', 1, 'Perbedaan indah seperti pelangi! ✅'),
('k1-bind-06', 'Teman yang pakai jilbab harus kita...', '["Ejek", "Hormati 🤝", "Tertawakan"]', 'Hormati 🤝', 1, 'Semua teman harus dihormati! ✅'),
('k1-bind-06', '"Toleransi" artinya...', '["Bertengkar", "Menghargai perbedaan 🌈", "Pergi"]', 'Menghargai perbedaan 🌈', 1, 'Toleransi = menghargai perbedaan! ✅'),

-- k1-bind-07: Aku Ingin
('k1-bind-07', 'Mana yang termasuk KEINGINAN?', '["🍚 Nasi", "👕 Baju", "🧸 Mainan baru"]', '🧸 Mainan baru', 1, 'Mainan adalah keinginan, bukan kebutuhan. ✅'),
('k1-bind-07', 'Kita harus... atas apa yang sudah kita punya', '["Bersyukur 🙏", "Mengeluh", "Membuang"]', 'Bersyukur 🙏', 1, 'Kita harus bersyukur! ✅'),
('k1-bind-07', 'Yang harus DIDAHULUKAN adalah...', '["Keinginan", "Kebutuhan 🍚", "Mainan"]', 'Kebutuhan 🍚', 1, 'Kebutuhan didahulukan! ✅'),

-- k1-bind-08: Di Sekitar Rumah
('k1-bind-08', 'Bagian rumah untuk masuk dan keluar adalah...', '["🚪 Pintu", "🪟 Jendela", "🏠 Atap"]', '🚪 Pintu', 1, 'Pintu tempat masuk dan keluar. ✅'),
('k1-bind-08', 'Arah lawan dari DEPAN adalah...', '["Kanan", "Belakang ⬇️", "Kiri"]', 'Belakang ⬇️', 1, 'Lawan depan adalah belakang! ✅'),
('k1-bind-08', 'Peta digunakan untuk...', '["Menulis", "Menunjukkan letak 🗺️", "Mewarnai"]', 'Menunjukkan letak 🗺️', 1, 'Peta menunjukkan letak suatu tempat. ✅');

-- Subject B.Inggris
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k1-bing', 'bing', 'Bahasa Inggris', '🇬🇧', 1, 3)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k1-bing-01', 1, 'k1-bing', 'How Are You?', 'Unit 1 — Greetings', '/buku/kelas1/bahasa-inggris/k1-bing-01.html', 1),
  ('k1-bing-02', 1, 'k1-bing', 'I am Kimi', 'Unit 2 — Self Introduction', '/buku/kelas1/bahasa-inggris/k1-bing-02.html', 2),
  ('k1-bing-03', 1, 'k1-bing', 'My Name is Joshua', 'Unit 3 — Asking Names', '/buku/kelas1/bahasa-inggris/k1-bing-03.html', 3),
  ('k1-bing-04', 1, 'k1-bing', 'My Number Is Ten', 'Unit 4 — Numbers 1-10', '/buku/kelas1/bahasa-inggris/k1-bing-04.html', 4),
  ('k1-bing-05', 1, 'k1-bing', 'I Have Four Books', 'Unit 5 — Classroom Objects', '/buku/kelas1/bahasa-inggris/k1-bing-05.html', 5),
  ('k1-bing-06', 1, 'k1-bing', 'My Garden Is Colorful', 'Unit 6 — Colors', '/buku/kelas1/bahasa-inggris/k1-bing-06.html', 6),
  ('k1-bing-07', 1, 'k1-bing', 'It Is a Big Circle', 'Unit 7 — Shapes & Sizes', '/buku/kelas1/bahasa-inggris/k1-bing-07.html', 7)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k1-bing-01: How Are You?
('k1-bing-01', '"Hello" artinya...', '["Halo", "Selamat pagi", "Selamat malam"]', 'Halo', 1, 'Hello = Halo. ✅'),
('k1-bing-01', '"Good morning" artinya...', '["Selamat siang", "Selamat pagi", "Selamat malam"]', 'Selamat pagi', 1, 'Good morning = Selamat pagi. ✅'),
('k1-bing-01', '"How are you?" Jawabannya...', '["I am fine", "My name is", "Goodbye"]', 'I am fine', 1, '"How are you?" dijawab "I am fine". ✅'),
('k1-bing-01', 'Cara mengatakan selamat malam dalam Inggris...', '["Good night", "Good morning", "Good afternoon"]', 'Good night', 1, 'Good night = selamat malam. ✅'),
('k1-bing-01', '"Thank you" artinya...', '["Sama-sama", "Terima kasih", "Selamat tinggal"]', 'Terima kasih', 1, 'Thank you = terima kasih. ✅'),
('k1-bing-01', '"Goodbye" artinya...', '["Halo", "Selamat tinggal", "Terima kasih"]', 'Selamat tinggal', 1, 'Goodbye = selamat tinggal. ✅'),
('k1-bing-01', 'Goodbye = selamat tinggal. (TRUE/FALSE)', '["TRUE", "FALSE"]', 'TRUE', 1, 'Betul! Goodbye = selamat tinggal. ✅'),
('k1-bing-01', 'Susun: you - are - How?', '["How are you?", "You are how?", "Are you how?"]', 'How are you?', 1, 'How are you? ✅'),

-- k1-bing-02: I am Kimi
('k1-bing-02', '"I am Kimi" artinya...', '["Kamu adalah Kimi", "Saya adalah Kimi", "Kimi adalah saya"]', 'Saya adalah Kimi', 1, 'I am Kimi = Saya adalah Kimi. ✅'),
('k1-bing-02', '"My name is Made." Kata "My" artinya...', '["Kamu", "Milikku", "Milikmu"]', 'Milikku', 1, 'My = milikku. ✅'),
('k1-bing-02', '"Nice to meet you" artinya...', '["Senang bertemu kamu", "Selamat tinggal", "Terima kasih"]', 'Senang bertemu kamu', 1, 'Nice to meet you = senang bertemu. ✅'),
('k1-bing-02', 'Cara memperkenalkan diri dalam Inggris adalah...', '["I am fine", "I am Made", "Good morning"]', 'I am Made', 1, '"I am Made" = perkenalan diri. ✅'),
('k1-bing-02', '"I am" artinya "kamu adalah". (TRUE/FALSE)', '["TRUE", "FALSE"]', 'FALSE', 1, 'I am = saya adalah, bukan kamu. ✅'),
('k1-bing-02', '"Student" artinya...', '["Guru", "Murid", "Teman"]', 'Murid', 1, 'Student = murid. ✅'),
('k1-bing-02', '"Teacher" artinya...', '["Teman", "Guru", "Murid"]', 'Guru', 1, 'Teacher = guru. ✅'),
('k1-bing-02', 'Susun: am - I - Made', '["I am Made", "Am I Made", "Made I am"]', 'I am Made', 1, 'I am Made. ✅'),

-- k1-bing-03: My Name is Joshua
('k1-bing-03', '"What is your name?" artinya...', '["Siapa namamu?", "Apa kabar?", "Selamat pagi"]', 'Siapa namamu?', 1, 'What is your name? = siapa namamu. ✅'),
('k1-bing-03', 'Jawab: "What is your name?" → "___"', '["I am fine", "My name is Joshua", "I am five"]', 'My name is Joshua', 1, 'Jawab dengan "My name is...". ✅'),
('k1-bing-03', '"Your" artinya...', '["Milikku", "Milikmu", "Nama"]', 'Milikmu', 1, 'Your = milikmu. ✅'),
('k1-bing-03', '"My name is Cici" artinya "Namaku Cici". (TRUE/FALSE)', '["TRUE", "FALSE"]', 'TRUE', 1, 'Betul! My name is Cici = Namaku Cici. ✅'),
('k1-bing-03', '"Your book" artinya...', '["Bukuku", "Bukumu", "Buku"]', 'Bukumu', 1, 'Your book = bukumu. ✅'),
('k1-bing-03', '"What" artinya...', '["Apa", "Siapa", "Dimana"]', 'Apa', 1, 'What = apa. ✅'),
('k1-bing-03', '"My" digunakan untuk milik...', '["Saya", "Kamu", "Dia"]', 'Saya', 1, 'My = milik saya. ✅'),
('k1-bing-03', 'Susun: your - What - name - is?', '["What is your name?", "What your name is?", "Your name is what?"]', 'What is your name?', 1, 'What is your name? ✅'),

-- k1-bing-04: My Number is Ten
('k1-bing-04', '🍎🍎🍎 = Three. 🍎🍎🍎🍎🍎 = ___', '["Four", "Five", "Six"]', 'Five', 1, '5 = five. ✅'),
('k1-bing-04', '"Ten" in Indonesian is...', '["Enam", "Delapan", "Sepuluh"]', 'Sepuluh', 1, 'Ten = sepuluh. ✅'),
('k1-bing-04', 'After 7 comes... (setelah 7)...', '["Six", "Eight", "Nine"]', 'Eight', 1, 'After 7 is 8 (eight). ✅'),
('k1-bing-04', '"My number is ten" artinya...', '["Nomorku sepuluh", "Nomormu sepuluh", "Aku nomor sepuluh"]', 'Nomorku sepuluh', 1, 'My number is ten = nomorku sepuluh. ✅'),
('k1-bing-04', '"One" artinya dua. (TRUE/FALSE)', '["TRUE", "FALSE"]', 'FALSE', 1, 'One = satu, bukan dua. ✅'),
('k1-bing-04', '🍬🍬🍬🍬🍬🍬🍬 = Seven candies. Seven artinya...', '["Enam", "Tujuh", "Delapan"]', 'Tujuh', 1, 'Seven = tujuh. ✅'),
('k1-bing-04', 'Number before 10 is... (angka sebelum 10)', '["Eight", "Nine", "Eleven"]', 'Nine', 1, 'Before 10 is 9 (nine). ✅'),
('k1-bing-04', 'Susun: four - I - books - have', '["I have four books", "Four books I have", "Have I four books"]', 'I have four books', 1, 'I have four books. ✅'),

-- k1-bing-05: I Have Four Books
('k1-bing-05', '"Book" in Indonesian is...', '["Pensil", "Buku", "Tas"]', 'Buku', 1, 'Book = buku. ✅'),
('k1-bing-05', '"Pencil" artinya...', '["Pulpen", "Pensil", "Penggaris"]', 'Pensil', 1, 'Pencil = pensil. ✅'),
('k1-bing-05', '"Ruler" artinya...', '["Pulpen", "Penggaris", "Krayon"]', 'Penggaris', 1, 'Ruler = penggaris. ✅'),
('k1-bing-05', '"Bag" artinya...', '["Buku", "Tas", "Kursi"]', 'Tas', 1, 'Bag = tas. ✅'),
('k1-bing-05', '"Chair" artinya buku. (TRUE/FALSE)', '["TRUE", "FALSE"]', 'FALSE', 1, 'Chair = kursi, bukan buku. ✅'),
('k1-bing-05', '"I have ___ books" untuk 3 buku...', '["one", "three", "five"]', 'three', 1, '3 = three. ✅'),
('k1-bing-05', '"Pen" artinya...', '["Pensil", "Pulpen", "Buku"]', 'Pulpen', 1, 'Pen = pulpen. ✅'),
('k1-bing-05', 'I have a ___. Untuk benda di kelas untuk duduk...', '["book", "pencil", "chair"]', 'chair', 1, 'Chair = kursi untuk duduk. ✅'),

-- k1-bing-06: My Garden is Colorful
('k1-bing-06', '"Red" in Indonesian is...', '["Biru", "Merah", "Hijau"]', 'Merah', 1, 'Red = merah. ✅'),
('k1-bing-06', '"Blue" artinya...', '["Biru", "Merah", "Kuning"]', 'Biru', 1, 'Blue = biru. ✅'),
('k1-bing-06', '"Green" = hijau. (TRUE/FALSE)', '["TRUE", "FALSE"]', 'TRUE', 1, 'Green = hijau. ✅'),
('k1-bing-06', '🌿 Grass is ___ in color.', '["Green", "Blue", "Red"]', 'Green', 1, 'Grass is green. ✅'),
('k1-bing-06', '"Purple" artinya...', '["Oranye", "Ungu", "Coklat"]', 'Ungu', 1, 'Purple = ungu. ✅'),
('k1-bing-06', '🍋 Lemon is ___ in color.', '["Red", "Yellow", "Blue"]', 'Yellow', 1, 'Lemon is yellow. ✅'),
('k1-bing-06', '"Yellow" artinya...', '["Hijau", "Kuning", "Biru"]', 'Kuning', 1, 'Yellow = kuning. ✅'),
('k1-bing-06', 'Susun: is - My - colorful - garden', '["My garden is colorful", "Garden my is colorful", "Colorful is my garden"]', 'My garden is colorful', 1, 'My garden is colorful. ✅'),

-- k1-bing-07: It is a Big Circle
('k1-bing-07', '⚽ A ball is a ___ shape.', '["Square", "Circle", "Triangle"]', 'Circle', 1, 'Ball is a circle. ✅'),
('k1-bing-07', '⬛ A square has ___ sides.', '["3", "4", "5"]', '4', 1, 'Square has 4 sides. ✅'),
('k1-bing-07', '🔺 A triangle has ___ sides.', '["2", "3", "4"]', '3', 1, 'Triangle has 3 sides. ✅'),
('k1-bing-07', '"Big" in Indonesian is...', '["Kecil", "Besar", "Tinggi"]', 'Besar', 1, 'Big = besar. ✅'),
('k1-bing-07', '"Small square" artinya...', '["Lingkaran besar", "Persegi kecil", "Segitiga kecil"]', 'Persegi kecil', 1, 'Small square = persegi kecil. ✅'),
('k1-bing-07', '🐘 Elephant is big. (TRUE/FALSE)', '["TRUE", "FALSE"]', 'TRUE', 1, 'Gajah besar. ✅'),
('k1-bing-07', '🧀 A slice of cheese can be a ___ shape.', '["Circle", "Square", "Triangle"]', 'Triangle', 1, 'Keju sering bentuk segitiga. ✅'),
('k1-bing-07', 'Susun: a - It - circle - is - big', '["It is a big circle", "A big circle it is", "It a big is circle"]', 'It is a big circle', 1, 'It is a big circle. ✅');

