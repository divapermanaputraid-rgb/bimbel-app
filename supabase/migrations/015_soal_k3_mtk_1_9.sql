-- Migration 015_soal_k3_mtk_1_9.sql
INSERT INTO public.questions (id, material_id, soal, pilihan, jawaban_benar, level, penjelasan, tipe)
VALUES
-- k3-mtk-01 (Membaca Bilangan)
('k3-mtk-01-q1', 'k3-mtk-01', 'Bagaimana cara membaca angka 456?', '["Empat lima enam", "Empat ratus lima puluh enam", "Empat ratus enam puluh lima"]', 'Empat ratus lima puluh enam', 1, '456 dibaca empat ratus lima puluh enam. ✅', 'pilihan_ganda'),
('k3-mtk-01-q2', 'k3-mtk-01', 'Lambang bilangan dari "Seratus lima" adalah...', '["150", "105", "1005"]', '105', 1, '105 = seratus lima. Angka nol di tengah tidak dibaca! ✅', 'pilihan_ganda'),
('k3-mtk-01-q3', 'k3-mtk-01', 'Angka ratusan pada bilangan 872 adalah...', '["8", "7", "2"]', '8', 2, 'Angka ratusan ada di paling depan, yaitu 8. ✅', 'pilihan_ganda'),
('k3-mtk-01-q4', 'k3-mtk-01', 'Bilangan 602 dibaca...', '["Enam nol dua", "Enam ratus dua", "Enam ratus dua puluh"]', 'Enam ratus dua', 2, 'Nol puluhan tidak dibaca, langsung "Enam ratus dua". ✅', 'pilihan_ganda'),

-- k3-mtk-02 (Nilai Tempat)
('k3-mtk-02-q1', 'k3-mtk-02', 'Bentuk urai dari 789 adalah...', '["700 + 80 + 9", "700 + 8 + 9", "7 + 8 + 9"]', '700 + 80 + 9', 1, '7 ratusan, 8 puluhan, 9 satuan. ✅', 'pilihan_ganda'),
('k3-mtk-02-q2', 'k3-mtk-02', 'Angka 5 pada bilangan 354 menempati nilai tempat...', '["Ratusan", "Puluhan", "Satuan"]', 'Puluhan', 1, 'Angka di tengah adalah puluhan (50). ✅', 'pilihan_ganda'),
('k3-mtk-02-q3', 'k3-mtk-02', '4 ratusan, 0 puluhan, 6 satuan menjadi bilangan...', '["46", "406", "460"]', '406', 2, 'Digabungkan menjadi 406. ✅', 'pilihan_ganda'),
('k3-mtk-02-q4', 'k3-mtk-02', 'Dari angka 1, 5, dan 9, bilangan terbesar yang dapat dibentuk adalah...', '["519", "915", "951"]', '951', 3, 'Taruh angka terbesar di posisi ratusan (9), lalu puluhan (5), lalu satuan (1). ✅', 'pilihan_ganda'),

-- k3-mtk-03 (Membandingkan)
('k3-mtk-03-q1', 'k3-mtk-03', 'Tanda yang tepat untuk 345 ... 354 adalah...', '["<", ">", "="]', '<', 1, '3 ratusan sama, tapi 4 puluhan lebih kecil dari 5 puluhan. ✅', 'pilihan_ganda'),
('k3-mtk-03-q2', 'k3-mtk-03', 'Urutkan dari yang terkecil: 215, 125, 251', '["125, 215, 251", "251, 215, 125", "125, 251, 215"]', '125, 215, 251', 1, 'Lihat ratusannya dulu, lalu urutkan! ✅', 'pilihan_ganda'),
('k3-mtk-03-q3', 'k3-mtk-03', 'Bilangan mana yang paling besar?', '["789", "801", "799"]', '801', 2, 'Ratusan 8 lebih besar dari ratusan 7. ✅', 'pilihan_ganda'),
('k3-mtk-03-q4', 'k3-mtk-03', 'Andi 135 cm, Meutia 128 cm. Siapa yang lebih tinggi?', '["Andi", "Meutia", "Sama tinggi"]', 'Andi', 2, '135 lebih besar dari 128. ✅', 'pilihan_ganda'),

-- k3-mtk-04 (Penjumlahan)
('k3-mtk-04-q1', 'k3-mtk-04', 'Berapa hasil dari 300 + 200?', '["400", "500", "600"]', '500', 1, '3 + 2 = 5 ratusan! ✅', 'pilihan_ganda'),
('k3-mtk-04-q2', 'k3-mtk-04', 'Hasil dari 452 + 134 adalah...', '["586", "596", "582"]', '586', 1, 'Satuan: 2+4=6, Puluhan: 5+3=8, Ratusan: 4+1=5. ✅', 'pilihan_ganda'),
('k3-mtk-04-q3', 'k3-mtk-04', 'Berapa hasil dari 385 + 246?', '["621", "631", "531"]', '631', 2, 'Dengan simpan puluhan dan ratusan. ✅', 'pilihan_ganda'),
('k3-mtk-04-q4', 'k3-mtk-04', 'Meutia beli 150 gram gula dan 350 gram tepung. Total belanjaan...', '["400 gram", "500 gram", "550 gram"]', '500 gram', 2, '150 + 350 = 500 gram. ✅', 'pilihan_ganda'),

-- k3-mtk-05 (Pengurangan)
('k3-mtk-05-q1', 'k3-mtk-05', 'Berapa hasil dari 800 - 300?', '["400", "500", "600"]', '500', 1, '8 - 3 = 5 ratusan! ✅', 'pilihan_ganda'),
('k3-mtk-05-q2', 'k3-mtk-05', 'Hasil dari 765 - 234 adalah...', '["531", "541", "431"]', '531', 1, 'Kurangi satu per satu: 5-4=1, 6-3=3, 7-2=5. ✅', 'pilihan_ganda'),
('k3-mtk-05-q3', 'k3-mtk-05', 'Hasil dari 405 - 128 adalah...', '["277", "287", "327"]', '277', 2, 'Pinjam dari ratusan ke puluhan, lalu ke satuan! ✅', 'pilihan_ganda'),
('k3-mtk-05-q4', 'k3-mtk-05', 'Andi punya uang Rp900, beli es es krim Rp450. Sisanya...', '["Rp400", "Rp450", "Rp500"]', 'Rp450', 2, '900 - 450 = 450. ✅', 'pilihan_ganda'),

-- k3-mtk-06 (Perkalian)
('k3-mtk-06-q1', 'k3-mtk-06', '5 × 4 artinya...', '["5 + 4", "4 + 4 + 4 + 4 + 4", "5 + 5 + 5 + 5"]', '4 + 4 + 4 + 4 + 4', 1, 'Ada 5 kelompok, masing-masing berisi 4. ✅', 'pilihan_ganda'),
('k3-mtk-06-q2', 'k3-mtk-06', 'Berapa hasil dari 6 × 7?', '["42", "48", "36"]', '42', 2, 'Enam dikali tujuh adalah empat puluh dua! ✅', 'pilihan_ganda'),
('k3-mtk-06-q3', 'k3-mtk-06', 'Berapa hasil dari 100 × 0?', '["100", "1", "0"]', '0', 1, 'Apapun dikali nol pasti nol! ✅', 'pilihan_ganda'),
('k3-mtk-06-q4', 'k3-mtk-06', 'Andi beli 3 kotak pensil, tiap kotak isi 8. Total pensil...', '["11", "24", "32"]', '24', 2, '3 × 8 = 24 pensil. ✅', 'pilihan_ganda'),

-- k3-mtk-07 (Pembagian)
('k3-mtk-07-q1', 'k3-mtk-07', '20 ÷ 4 = ...', '["4", "5", "6"]', '5', 1, 'Karena 5 × 4 = 20! ✅', 'pilihan_ganda'),
('k3-mtk-07-q2', 'k3-mtk-07', 'Jika 7 × 8 = 56, maka 56 ÷ 8 = ...', '["7", "8", "56"]', '7', 1, 'Pembagian adalah kebalikan dari perkalian. ✅', 'pilihan_ganda'),
('k3-mtk-07-q3', 'k3-mtk-07', 'Berapa hasil 15 ÷ 1?', '["1", "15", "0"]', '15', 1, 'Bilangan berapapun dibagi 1 adalah bilangan itu sendiri. ✅', 'pilihan_ganda'),
('k3-mtk-07-q4', 'k3-mtk-07', 'Ibu punya 30 permen dibagi ke 5 anak sama rata. Tiap anak dapat...', '["5 permen", "6 permen", "7 permen"]', '6 permen', 2, '30 dibagi 5 adalah 6. ✅', 'pilihan_ganda'),

-- k3-mtk-08 (Kalimat MTK Penjumlahan)
('k3-mtk-08-q1', 'k3-mtk-08', 'Cari nilai kotak rahasia: □ + 10 = 25', '["15", "35", "5"]', '15', 1, 'Caranya: 25 - 10 = 15! ✅', 'pilihan_ganda'),
('k3-mtk-08-q2', 'k3-mtk-08', 'Cari nilai rahasia: 12 + □ = 30', '["18", "42", "16"]', '18', 2, 'Balik caranya menjadi 30 - 12 = 18! ✅', 'pilihan_ganda'),
('k3-mtk-08-q3', 'k3-mtk-08', 'Cari bilangan kembar: □ + □ = 40', '["10", "20", "30"]', '20', 2, '20 + 20 = 40! ✅', 'pilihan_ganda'),
('k3-mtk-08-q4', 'k3-mtk-08', 'Harga buku ditambah 3.000 jadinya 12.000. Harga awal buku?', '["9.000", "15.000", "8.000"]', '9.000', 3, '12.000 dikurangi 3.000 sama dengan 9.000. ✅', 'pilihan_ganda'),

-- k3-mtk-09 (Kalimat MTK Pengurangan)
('k3-mtk-09-q1', 'k3-mtk-09', 'Cari isi kotak rahasia: □ - 15 = 20', '["5", "35", "25"]', '35', 1, 'Kotak di depan, jadi dijumlahkan: 20 + 15 = 35! ✅', 'pilihan_ganda'),
('k3-mtk-09-q2', 'k3-mtk-09', 'Cari isi kotak rahasia: 50 - □ = 10', '["40", "60", "30"]', '40', 2, 'Kotak di belakang, langsung kurangi: 50 - 10 = 40! ✅', 'pilihan_ganda'),
('k3-mtk-09-q3', 'k3-mtk-09', 'Jika □ - 200 = 800, berapakah □?', '["600", "1000", "800"]', '1000', 2, '800 + 200 = 1000! ✅', 'pilihan_ganda'),
('k3-mtk-09-q4', 'k3-mtk-09', 'Galih beli sepeda 100 ribu, uang sisa 50 ribu. Uang Galih awalnya?', '["50 ribu", "150 ribu", "100 ribu"]', '150 ribu', 3, '100 ribu + 50 ribu = 150 ribu! ✅', 'pilihan_ganda')
ON CONFLICT (id) DO UPDATE SET
  soal = EXCLUDED.soal,
  pilihan = EXCLUDED.pilihan,
  jawaban_benar = EXCLUDED.jawaban_benar,
  level = EXCLUDED.level,
  penjelasan = EXCLUDED.penjelasan,
  tipe = EXCLUDED.tipe;