-- Migration 017_soal_k3_mtk_10_18.sql
INSERT INTO public.questions (id, material_id, soal, pilihan, jawaban_benar, level, penjelasan, tipe)
VALUES
-- k3-mtk-10
('k3-mtk-10-q1', 'k3-mtk-10', 'Alfa mengukur meja belajarnya. Panjangnya 120 cm. Berapa meter dan sentimeter panjang meja tersebut?', '["1 m 20 cm", "12 m 0 cm", "1 m 2 cm"]', '1 m 20 cm', 1, '120 cm = 100 cm + 20 cm = 1 meter 20 cm. ✅', 'pilihan_ganda'),
('k3-mtk-10-q2', 'k3-mtk-10', 'Alat ukur yang tepat untuk mengukur panjang buku tulis adalah...', '["Penggaris", "Meteran gulung besar", "Timbangan"]', 'Penggaris', 1, 'Buku tulis cukup diukur menggunakan penggaris sentimeter. ✅', 'pilihan_ganda'),
('k3-mtk-10-q3', 'k3-mtk-10', 'Saat mengukur panjang pensil dengan penggaris, ujung pensil harus tepat di angka...', '["Angka 0", "Angka 1", "Angka 10"]', 'Angka 0', 1, 'Pengukuran selalu dimulai dari angka 0 pada penggaris. ✅', 'pilihan_ganda'),
('k3-mtk-10-q4', 'k3-mtk-10', 'Meja Galih panjangnya 1 m. Berapa sentimeter panjang meja itu?', '["10 cm", "100 cm", "1000 cm"]', '100 cm', 2, '1 meter sama dengan 100 sentimeter. ✅', 'pilihan_ganda'),

-- k3-mtk-11
('k3-mtk-11-q1', 'k3-mtk-11', 'Galih berlari 2 putaran lapangan. Satu putaran panjangnya 150 m. Total jarak yang ditempuh adalah...', '["300 m", "200 m", "400 m"]', '300 m', 2, '2 × 150 m = 300 meter. ✅', 'pilihan_ganda'),
('k3-mtk-11-q2', 'k3-mtk-11', 'Panjang pita Meutia 250 cm. Panjang pita Meutia sama dengan...', '["2,5 meter", "25 meter", "250 meter"]', '2,5 meter', 2, '250 cm ÷ 100 = 2,5 meter (atau 2 meter 50 cm). ✅', 'pilihan_ganda'),
('k3-mtk-11-q3', 'k3-mtk-11', '1 sentimeter (cm) sama dengan berapa milimeter (mm)?', '["10 mm", "100 mm", "1 mm"]', '10 mm', 1, 'Turun 1 tangga dari cm ke mm, jadi dikali 10: 1 cm = 10 mm. ✅', 'pilihan_ganda'),
('k3-mtk-11-q4', 'k3-mtk-11', 'Jarak rumah Andi ke sekolah 1 km. Itu sama artinya dengan berapa meter?', '["1.000 meter", "100 meter", "10 meter"]', '1.000 meter', 2, '1 kilometer = 1.000 meter. ✅', 'pilihan_ganda'),

-- k3-mtk-12
('k3-mtk-12-q1', 'k3-mtk-12', 'Satuan berat baku untuk mengukur berat badan adalah...', '["kilogram (kg)", "gram (g)", "miligram (mg)"]', 'kilogram (kg)', 1, 'Berat badan manusia diukur menggunakan kilogram (kg). ✅', 'pilihan_ganda'),
('k3-mtk-12-q2', 'k3-mtk-12', 'Meutia menimbang tepung terigu seberat 500 gram. 500 gram sama dengan...', '["Setengah kilogram (1/2 kg)", "5 kilogram", "50 kilogram"]', 'Setengah kilogram (1/2 kg)', 2, 'Karena 1 kg = 1000 gram, maka 500 gram adalah setengah kilogram. ✅', 'pilihan_ganda'),
('k3-mtk-12-q3', 'k3-mtk-12', 'Jarum timbangan buah menunjuk tepat di angka 3. Artinya berat buah tersebut adalah...', '["3 kg", "30 kg", "300 kg"]', '3 kg', 1, 'Jarum menunjuk angka 3 pada timbangan kilogram berarti 3 kg. ✅', 'pilihan_ganda'),
('k3-mtk-12-q4', 'k3-mtk-12', 'Alat yang tepat untuk menimbang berat emas atau bumbu dapur yang sedikit adalah...', '["Timbangan digital / timbangan kue", "Timbangan badan", "Timbangan truk"]', 'Timbangan digital / timbangan kue', 1, 'Timbangan kue/digital sangat teliti untuk satuan gram. ✅', 'pilihan_ganda'),

-- k3-mtk-13
('k3-mtk-13-q1', 'k3-mtk-13', 'Ibu membeli beras 2 kg. Berapa gram berat beras yang dibeli ibu?', '["2.000 gram", "200 gram", "20 gram"]', '2.000 gram', 1, '1 kg = 1.000 gram, jadi 2 kg = 2 × 1.000 = 2.000 gram. ✅', 'pilihan_ganda'),
('k3-mtk-13-q2', 'k3-mtk-13', '1 kilogram sama beratnya dengan berapa ons?', '["10 ons", "100 ons", "1 ons"]', '10 ons', 1, '1 kilogram = 10 ons (hektogram). ✅', 'pilihan_ganda'),
('k3-mtk-13-q3', 'k3-mtk-13', 'Alfa membeli cabai 3 ons dan bawang 2 ons. Total berat belanjaan Alfa dalam gram adalah...', '["500 gram", "50 gram", "5.000 gram"]', '500 gram', 2, 'Total = 3 + 2 = 5 ons. Karena 1 ons = 100 gram, maka 5 ons = 500 gram. ✅', 'pilihan_ganda'),
('k3-mtk-13-q4', 'k3-mtk-13', 'Berat sekeranjang apel adalah 3.000 gram. Berapa kilogram berat apel tersebut?', '["3 kg", "30 kg", "300 kg"]', '3 kg', 1, '3.000 gram ÷ 1.000 = 3 kilogram. ✅', 'pilihan_ganda'),

-- k3-mtk-14
('k3-mtk-14-q1', 'k3-mtk-14', 'Persegi adalah bangun datar yang memiliki ... sisi yang sama panjang.', '["4", "3", "5"]', '4', 1, 'Persegi memiliki 4 sisi yang panjangnya sama. ✅', 'pilihan_ganda'),
('k3-mtk-14-q2', 'k3-mtk-14', 'Galih punya tali origami 24 cm yang dibentuk menjadi sebuah persegi. Berapa panjang setiap sisi persegi itu?', '["6 cm", "8 cm", "4 cm"]', '6 cm', 2, '24 cm ÷ 4 sisi = 6 cm setiap sisinya. ✅', 'pilihan_ganda'),
('k3-mtk-14-q3', 'k3-mtk-14', 'Persegi panjang memiliki sisi panjang 8 cm dan sisi pendek 5 cm. Keliling persegi panjang tersebut adalah...', '["26 cm", "13 cm", "40 cm"]', '26 cm', 2, 'Keliling = 8 + 5 + 8 + 5 = 26 cm. ✅', 'pilihan_ganda'),
('k3-mtk-14-q4', 'k3-mtk-14', 'Bangun datar yang hanya memiliki 3 buah sisi adalah...', '["Segitiga", "Persegi", "Persegi panjang"]', 'Segitiga', 1, 'Segitiga dibatasi oleh tepat 3 sisi lurus. ✅', 'pilihan_ganda'),

-- k3-mtk-15
('k3-mtk-15-q1', 'k3-mtk-15', 'Sudut yang besarnya tepat 90° seperti pojokan meja belajar disebut sudut...', '["Siku-siku", "Lancip", "Tumpul"]', 'Siku-siku', 1, 'Sudut tegak lurus 90° dinamakan sudut siku-siku. ✅', 'pilihan_ganda'),
('k3-mtk-15-q2', 'k3-mtk-15', 'Sudut yang lebih kecil atau lebih tajam daripada sudut siku-siku disebut sudut...', '["Lancip", "Tumpul", "Siku-siku"]', 'Lancip', 1, 'Sudut lancip bentuknya tajam karena kurang dari 90°. ✅', 'pilihan_ganda'),
('k3-mtk-15-q3', 'k3-mtk-15', 'Sebuah persegi memiliki berapa banyak sudut siku-siku?', '["4 sudut", "2 sudut", "3 sudut"]', '4 sudut', 1, 'Keempat pojok persegi adalah sudut siku-siku. ✅', 'pilihan_ganda'),
('k3-mtk-15-q4', 'k3-mtk-15', 'Sudut yang terbuka lebih lebar daripada sudut siku-siku disebut sudut...', '["Tumpul", "Lancip", "Lurus"]', 'Tumpul', 1, 'Sudut tumpul besarnya lebih dari 90°. ✅', 'pilihan_ganda'),

-- k3-mtk-16
('k3-mtk-16-q1', 'k3-mtk-16', 'Rel kereta api yang searah dan tidak akan pernah berpotongan adalah contoh garis...', '["Sejajar", "Tegak lurus", "Berpotongan"]', 'Sejajar', 1, 'Garis sejajar posisinya searah dan tidak pernah bertemu. ✅', 'pilihan_ganda'),
('k3-mtk-16-q2', 'k3-mtk-16', 'Dua garis yang saling bertemu dan membentuk sudut siku-siku (90°) disebut garis...', '["Tegak lurus", "Sejajar", "Melengkung"]', 'Tegak lurus', 1, 'Garis yang berpotongan siku-siku disebut tegak lurus. ✅', 'pilihan_ganda'),
('k3-mtk-16-q3', 'k3-mtk-16', 'Pada sebuah persegi panjang, sisi atas dan sisi bawah posisinya saling...', '["Sejajar", "Tegak lurus", "Bersilangan"]', 'Sejajar', 2, 'Sisi atas dan bawah sejajar, jaraknya selalu sama. ✅', 'pilihan_ganda'),
('k3-mtk-16-q4', 'k3-mtk-16', 'Berapa pasang sisi yang sejajar pada sebuah persegi panjang?', '["2 pasang", "1 pasang", "4 pasang"]', '2 pasang', 2, 'Pasangan atas-bawah dan pasangan kiri-kanan (total 2 pasang). ✅', 'pilihan_ganda'),

-- k3-mtk-17
('k3-mtk-17-q1', 'k3-mtk-17', 'Tinggi badan 4 siswa: 135 cm, 128 cm, 142 cm, 130 cm. Urutan tinggi badan dari yang terpendek adalah...', '["128, 130, 135, 142", "142, 135, 130, 128", "128, 135, 130, 142"]', '128, 130, 135, 142', 1, 'Mulai dari angka terkecil (128) hingga terbesar (142). ✅', 'pilihan_ganda'),
('k3-mtk-17-q2', 'k3-mtk-17', 'Dari data tinggi badan di atas, siapakah siswa yang paling tinggi?', '["Siswa dengan tinggi 142 cm", "Siswa dengan tinggi 135 cm", "Siswa dengan tinggi 128 cm"]', 'Siswa dengan tinggi 142 cm', 1, '142 cm adalah angka terbesar. ✅', 'pilihan_ganda'),
('k3-mtk-17-q3', 'k3-mtk-17', 'Galih tinggi badannya 142 cm, sedangkan Andi 128 cm. Berapa sentimeter selisih tinggi mereka?', '["14 cm", "20 cm", "12 cm"]', '14 cm', 2, 'Selisih = 142 cm - 128 cm = 14 cm. ✅', 'pilihan_ganda'),
('k3-mtk-17-q4', 'k3-mtk-17', 'Data buah favorit siswa: Apel (8 siswa), Jeruk (5 siswa), Pisang (10 siswa). Buah apa yang paling banyak disukai?', '["Pisang", "Apel", "Jeruk"]', 'Pisang', 1, 'Pisang dipilih oleh 10 siswa (jumlah terbanyak). ✅', 'pilihan_ganda'),

-- k3-mtk-18
('k3-mtk-18-q1', 'k3-mtk-18', 'Bagian dalam tabel yang tersusun mendatar dari kiri ke kanan disebut...', '["Baris", "Kolom", "Judul"]', 'Baris', 1, 'Baris mendatar ke samping, sedangkan kolom menurun ke bawah. ✅', 'pilihan_ganda'),
('k3-mtk-18-q2', 'k3-mtk-18', 'Bagian dalam tabel yang tersusun menurun dari atas ke bawah disebut...', '["Kolom", "Baris", "Garis"]', 'Kolom', 1, 'Kolom tersusun tegak ke bawah. ✅', 'pilihan_ganda'),
('k3-mtk-18-q3', 'k3-mtk-18', 'Jika pada tabel baris pelajaran "Matematika" sejajar dengan kolom jumlah "12 siswa", itu artinya...', '["Ada 12 siswa yang menyukai Matematika", "Ada 12 pelajaran di sekolah", "Matematika pelajaran ke-12"]', 'Ada 12 siswa yang menyukai Matematika', 2, 'Baris dan kolom bertemu menunjukkan informasi jumlah untuk kategori tersebut. ✅', 'pilihan_ganda'),
('k3-mtk-18-q4', 'k3-mtk-18', 'Apa keuntungan utama kita menyajikan data yang acak ke dalam bentuk tabel?', '["Data menjadi lebih rapi dan mudah dibaca informasinya", "Tabel membuat buku menjadi berat", "Tabel mengubah nilai angka"]', 'Data menjadi lebih rapi dan mudah dibaca informasinya', 1, 'Tabel menyusun data secara terstruktur agar gampang dianalisis. ✅', 'pilihan_ganda')
ON CONFLICT (id) DO UPDATE SET
  soal = EXCLUDED.soal,
  pilihan = EXCLUDED.pilihan,
  jawaban_benar = EXCLUDED.jawaban_benar,
  level = EXCLUDED.level,
  penjelasan = EXCLUDED.penjelasan,
  tipe = EXCLUDED.tipe;
