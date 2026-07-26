-- Migration 020_soal_bing_k3.sql
INSERT INTO public.questions (id, material_id, soal, pilihan, jawaban_benar, level, penjelasan, tipe)
VALUES
-- k3-bing-01
('k3-bing-01-q1', 'k3-bing-01', 'Apa bahasa Inggris dari makanan ayam goreng 🍗?', '["fried chicken", "noodle", "bread"]', 'fried chicken', 1, '🍗 = fried chicken = ayam goreng! ✅', 'pilihan_ganda'),
('k3-bing-01-q2', 'k3-bing-01', 'Bahasa Inggris dari minuman teh hangat 🍵 adalah...', '["coffee", "tea", "milk"]', 'tea', 1, '🍵 = tea = teh. ✅', 'pilihan_ganda'),
('k3-bing-01-q3', 'k3-bing-01', 'Susun kata menjadi kalimat yang benar: like / I / rice', '["I like rice", "rice I like", "like I rice"]', 'I like rice', 2, 'Pola yang tepat: I (subjek) + like (suka) + rice (makanan). ✅', 'pilihan_ganda'),
('k3-bing-01-q4', 'k3-bing-01', 'Cici: "I ___ ice cream." (Aku suka es krim)', '["like", "noodle", "tea"]', 'like', 1, 'Like artinya suka. ✅', 'pilihan_ganda'),

-- k3-bing-02
('k3-bing-02-q1', 'k3-bing-02', 'Kalimat yang artinya "Aku tidak suka nasi" adalah...', '["I like rice", "I don''t like rice", "Do you like rice?"]', 'I don''t like rice', 1, 'Don''t like artinya tidak suka. ✅', 'pilihan_ganda'),
('k3-bing-02-q2', 'k3-bing-02', 'Jawaban yang tepat untuk pertanyaan "Do you like fried chicken?" jika kita SANGAT menyukainya adalah...', '["Yes, I do!", "No, I don''t", "Yucky"]', 'Yes, I do!', 1, 'Yes, I do artinya Ya, aku suka! ✅', 'pilihan_ganda'),
('k3-bing-02-q3', 'k3-bing-02', 'Susun kata: you / Do / like / bread?', '["Do you like bread?", "you Do like bread?", "bread Do you like?"]', 'Do you like bread?', 2, 'Untuk bertanya apakah kamu suka: Do you like...? ✅', 'pilihan_ganda'),
('k3-bing-02-q4', 'k3-bing-02', 'Aisyah: "Do you like milk?" Joshua: "Yes, I ___."', '["do", "don''t", "am"]', 'do', 1, 'Pasangan jawaban Yes untuk Do you like adalah I do. ✅', 'pilihan_ganda'),

-- k3-bing-03
('k3-bing-03-q1', 'k3-bing-03', 'Kegiatan makan di pagi hari (sarapan) dalam Bahasa Inggris disebut...', '["breakfast", "lunch", "dinner"]', 'breakfast', 1, 'Breakfast = sarapan pagi. ✅', 'pilihan_ganda'),
('k3-bing-03-q2', 'k3-bing-03', 'Makan malam bersama keluarga dalam Bahasa Inggris disebut...', '["dinner", "lunch", "morning"]', 'dinner', 1, 'Dinner = makan malam. ✅', 'pilihan_ganda'),
('k3-bing-03-q3', 'k3-bing-03', 'Susun kata: have / I / noodles / for / lunch', '["I have noodles for lunch", "for lunch I noodles have", "have I noodles lunch"]', 'I have noodles for lunch', 2, 'I have noodles for lunch = Aku makan mi untuk makan siang. ✅', 'pilihan_ganda'),
('k3-bing-03-q4', 'k3-bing-03', 'Made: "I have bread for ___ in the morning." (sarapan)', '["breakfast", "lunch", "dinner"]', 'breakfast', 1, 'In the morning artinya pagi hari, jadi kita sarapan (breakfast). ✅', 'pilihan_ganda'),

-- k3-bing-04
('k3-bing-04-q1', 'k3-bing-04', 'Apa bahasa Inggris dari kegiatan berenang 🏊?', '["swimming", "reading", "singing"]', 'swimming', 1, '🏊 = swimming = berenang. ✅', 'pilihan_ganda'),
('k3-bing-04-q2', 'k3-bing-04', 'Kegiatan "bermain bola" dalam Bahasa Inggris adalah...', '["playing football", "riding a bike", "running"]', 'playing football', 1, '⚽ = playing football. ✅', 'pilihan_ganda'),
('k3-bing-04-q3', 'k3-bing-04', 'Susun kata: like / you / Do / swimming?', '["Do you like swimming?", "you Do like swimming?", "swimming Do you like?"]', 'Do you like swimming?', 2, 'Do you like swimming? = Apakah kamu suka berenang? ✅', 'pilihan_ganda'),
('k3-bing-04-q4', 'k3-bing-04', 'Made likes ___ (membaca buku cerita di perpustakaan).', '["reading", "drawing", "singing"]', 'reading', 1, 'Reading = membaca. ✅', 'pilihan_ganda'),

-- k3-bing-05
('k3-bing-05-q1', 'k3-bing-05', 'Hari Minggu dalam Bahasa Inggris disebut...', '["Sunday", "Monday", "Friday"]', 'Sunday', 1, 'Sunday = hari Minggu (hari libur!). ✅', 'pilihan_ganda'),
('k3-bing-05-q2', 'k3-bing-05', 'Hari Rabu dalam Bahasa Inggris adalah...', '["Wednesday", "Tuesday", "Thursday"]', 'Wednesday', 1, 'Wednesday = hari Rabu. ✅', 'pilihan_ganda'),
('k3-bing-05-q3', 'k3-bing-05', 'Susun kata: Sunday / on / like / I / swimming', '["I like swimming on Sunday", "Sunday on I like swimming", "like I Sunday swimming"]', 'I like swimming on Sunday', 2, 'I like swimming on Sunday = Aku suka berenang di hari Minggu. ✅', 'pilihan_ganda'),
('k3-bing-05-q4', 'k3-bing-05', 'After Monday is ___ (hari setelah Senin adalah...).', '["Tuesday", "Saturday", "Friday"]', 'Tuesday', 1, 'After Monday (setelah Senin) adalah Tuesday (Selasa). ✅', 'pilihan_ganda'),

-- k3-bing-06
('k3-bing-06-q1', 'k3-bing-06', 'Tempat untuk membaca dan meminjam banyak buku di sekolah 📚 adalah...', '["library", "canteen", "restroom"]', 'library', 1, 'Library = perpustakaan. ✅', 'pilihan_ganda'),
('k3-bing-06-q2', 'k3-bing-06', 'Tempat siswa membeli makanan dan minuman saat jam istirahat 🍱 adalah...', '["canteen", "classroom", "office"]', 'canteen', 1, 'Canteen = kantin sekolah. ✅', 'pilihan_ganda'),
('k3-bing-06-q3', 'k3-bing-06', 'Susun kata: it / Is / canteen / the?', '["Is it the canteen?", "canteen Is it the?", "it Is the canteen?"]', 'Is it the canteen?', 2, 'Is it the canteen? = Apakah ini kantin? ✅', 'pilihan_ganda'),
('k3-bing-06-q4', 'k3-bing-06', 'Aisyah: "Is it the classroom?" Joshua: "Yes, it ___."', '["is", "isn''t", "are"]', 'is', 1, 'Pasangan Yes untuk Is it adalah it is. ✅', 'pilihan_ganda'),

-- k3-bing-07
('k3-bing-07-q1', 'k3-bing-07', 'Kata depan dalam Bahasa Inggris untuk posisi "di samping" adalah...', '["beside", "under", "in"]', 'beside', 1, 'Beside = di samping. ✅', 'pilihan_ganda'),
('k3-bing-07-q2', 'k3-bing-07', 'Jika buku diletakkan "di atas" meja, preposisi yang tepat adalah...', '["on", "under", "behind"]', 'on', 1, 'On = di atas permukaan benda. ✅', 'pilihan_ganda'),
('k3-bing-07-q3', 'k3-bing-07', 'Susun kata: is / class / The / behind / office / the', '["The class is behind the office", "behind the office The class is", "is The class behind office"]', 'The class is behind the office', 2, 'The class is behind the office = Kelas ada di belakang kantor. ✅', 'pilihan_ganda'),
('k3-bing-07-q4', 'k3-bing-07', 'The cat is ___ the table. (kucing ada DI BAWAH meja)', '["under", "on", "between"]', 'under', 1, 'Under = di bawah. ✅', 'pilihan_ganda'),

-- k3-bing-08
('k3-bing-08-q1', 'k3-bing-08', 'Kegiatan yang kita lakukan di perpustakaan adalah "membaca buku". Membaca adalah...', '["read", "play", "drink"]', 'read', 1, 'Read = membaca. ✅', 'pilihan_ganda'),
('k3-bing-08-q2', 'k3-bing-08', 'Apa yang dilakukan Bapak/Ibu Guru (teacher) di ruang kelas?', '["teach (mengajar)", "sleep (tidur)", "run (berlari)"]', 'teach (mengajar)', 1, 'Teach = mengajar. ✅', 'pilihan_ganda'),
('k3-bing-08-q3', 'k3-bing-08', 'Susun kata: juice / drink / I / in / canteen / the', '["I drink juice in the canteen", "drink I juice in the canteen", "in the canteen juice I drink"]', 'I drink juice in the canteen', 2, 'I drink juice in the canteen = Aku minum jus di kantin. ✅', 'pilihan_ganda'),
('k3-bing-08-q4', 'k3-bing-08', 'We ___ (belajar) math in the classroom.', '["study", "eat", "play"]', 'study', 1, 'Study = belajar. ✅', 'pilihan_ganda'),

-- k3-bing-09
('k3-bing-09-q1', 'k3-bing-09', 'Lawan kata dari "dirty" (kotor) adalah...', '["clean (bersih)", "small (kecil)", "narrow (sempit)"]', 'clean (bersih)', 1, 'Clean = bersih, lawan dari dirty. ✅', 'pilihan_ganda'),
('k3-bing-09-q2', 'k3-bing-09', 'Halaman sekolah kita sangat luas. Kata sifat untuk "luas/besar" adalah...', '["large / big", "small", "dirty"]', 'large / big', 1, 'Large atau big artinya besar/luas. ✅', 'pilihan_ganda'),
('k3-bing-09-q3', 'k3-bing-09', 'Susun kata: is / classroom / My / clean', '["My classroom is clean", "clean My classroom is", "classroom My clean is"]', 'My classroom is clean', 2, 'My classroom is clean = Kelasku bersih. ✅', 'pilihan_ganda'),
('k3-bing-09-q4', 'k3-bing-09', 'Our school is very ___ (indah/cantik). We love it!', '["beautiful", "dirty", "narrow"]', 'beautiful', 1, 'Beautiful = indah / cantik. ✅', 'pilihan_ganda'),

-- k3-bing-10
('k3-bing-10-q1', 'k3-bing-10', 'Angka 35 dalam Bahasa Inggris disebut...', '["thirty-five", "twenty-five", "forty-five"]', 'thirty-five', 1, 'Thirty = 30, five = 5, jadi thirty-five = 35. ✅', 'pilihan_ganda'),
('k3-bing-10-q2', 'k3-bing-10', 'Jika di rak ada banyak buku (lebih dari satu), kita menggunakan kata...', '["There are", "There is", "They"]', 'There are', 1, 'There are digunakan untuk benda jamak/banyak (> 1). ✅', 'pilihan_ganda'),
('k3-bing-10-q3', 'k3-bing-10', 'Susun kata: are / There / books / thirty', '["There are thirty books", "books There are thirty", "thirty books There are"]', 'There are thirty books', 2, 'There are thirty books = Ada tiga puluh buku. ✅', 'pilihan_ganda'),
('k3-bing-10-q4', 'k3-bing-10', '___ is one ruler on the table. (Karena penggarisnya cuma SATU/tunggal)', '["There is", "There are", "Those"]', 'There is', 1, 'There is digunakan untuk benda tunggal (cuma 1). ✅', 'pilihan_ganda')
ON CONFLICT (id) DO UPDATE SET
  soal = EXCLUDED.soal,
  pilihan = EXCLUDED.pilihan,
  jawaban_benar = EXCLUDED.jawaban_benar,
  level = EXCLUDED.level,
  penjelasan = EXCLUDED.penjelasan,
  tipe = EXCLUDED.tipe;
