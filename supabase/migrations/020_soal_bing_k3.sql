DELETE FROM public.questions WHERE material_id LIKE 'k3-bing-%';

INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
-- k3-bing-01
('k3-bing-01', 'Apa bahasa Inggris dari makanan ayam goreng 🍗?', '{"a":"fried chicken","b":"noodle","c":"bread"}', 'a', 1, '🍗 = fried chicken = ayam goreng! ✅'),
('k3-bing-01', 'Bahasa Inggris dari minuman teh hangat 🍵 adalah...', '{"a":"coffee","b":"tea","c":"milk"}', 'b', 1, '🍵 = tea = teh. ✅'),
('k3-bing-01', 'Susun kata menjadi kalimat yang benar: like / I / rice', '{"a":"I like rice","b":"rice I like","c":"like I rice"}', 'a', 2, 'Pola yang tepat: I (subjek) + like (suka) + rice (makanan). ✅'),
('k3-bing-01', 'Cici: "I ___ ice cream." (Aku suka es krim)', '{"a":"like","b":"noodle","c":"tea"}', 'a', 1, 'Like artinya suka. ✅'),

-- k3-bing-02
('k3-bing-02', 'Kalimat yang artinya "Aku tidak suka nasi" adalah...', '{"a":"I like rice","b":"I don''t like rice","c":"Do you like rice?"}', 'b', 1, 'Don''t like artinya tidak suka. ✅'),
('k3-bing-02', 'Jawaban yang tepat untuk pertanyaan "Do you like fried chicken?" jika kita SANGAT menyukainya adalah...', '{"a":"Yes, I do!","b":"No, I don''t","c":"Yucky"}', 'a', 1, 'Yes, I do artinya Ya, aku suka! ✅'),
('k3-bing-02', 'Susun kata: you / Do / like / bread?', '{"a":"Do you like bread?","b":"you Do like bread?","c":"bread Do you like?"}', 'a', 2, 'Untuk bertanya apakah kamu suka: Do you like...? ✅'),
('k3-bing-02', 'Aisyah: "Do you like milk?" Joshua: "Yes, I ___."', '{"a":"do","b":"don''t","c":"am"}', 'a', 1, 'Pasangan jawaban Yes untuk Do you like adalah I do. ✅'),

-- k3-bing-03
('k3-bing-03', 'Kegiatan makan di pagi hari (sarapan) dalam Bahasa Inggris disebut...', '{"a":"breakfast","b":"lunch","c":"dinner"}', 'a', 1, 'Breakfast = sarapan pagi. ✅'),
('k3-bing-03', 'Makan malam bersama keluarga dalam Bahasa Inggris disebut...', '{"a":"dinner","b":"lunch","c":"morning"}', 'a', 1, 'Dinner = makan malam. ✅'),
('k3-bing-03', 'Susun kata: have / I / noodles / for / lunch', '{"a":"I have noodles for lunch","b":"for lunch I noodles have","c":"have I noodles lunch"}', 'a', 2, 'I have noodles for lunch = Aku makan mi untuk makan siang. ✅'),
('k3-bing-03', 'Made: "I have bread for ___ in the morning." (sarapan)', '{"a":"breakfast","b":"lunch","c":"dinner"}', 'a', 1, 'In the morning artinya pagi hari, jadi kita sarapan (breakfast). ✅'),

-- k3-bing-04
('k3-bing-04', 'Apa bahasa Inggris dari kegiatan berenang 🏊?', '{"a":"swimming","b":"reading","c":"singing"}', 'a', 1, '🏊 = swimming = berenang. ✅'),
('k3-bing-04', 'Kegiatan "bermain bola" dalam Bahasa Inggris adalah...', '{"a":"playing football","b":"riding a bike","c":"running"}', 'a', 1, '⚽ = playing football. ✅'),
('k3-bing-04', 'Susun kata: like / you / Do / swimming?', '{"a":"Do you like swimming?","b":"you Do like swimming?","c":"swimming Do you like?"}', 'a', 2, 'Do you like swimming? = Apakah kamu suka berenang? ✅'),
('k3-bing-04', 'Made likes ___ (membaca buku cerita di perpustakaan).', '{"a":"reading","b":"drawing","c":"singing"}', 'a', 1, 'Reading = membaca. ✅'),

-- k3-bing-05
('k3-bing-05', 'Hari Minggu dalam Bahasa Inggris disebut...', '{"a":"Sunday","b":"Monday","c":"Friday"}', 'a', 1, 'Sunday = hari Minggu (hari libur!). ✅'),
('k3-bing-05', 'Hari Rabu dalam Bahasa Inggris adalah...', '{"a":"Wednesday","b":"Tuesday","c":"Thursday"}', 'a', 1, 'Wednesday = hari Rabu. ✅'),
('k3-bing-05', 'Susun kata: Sunday / on / like / I / swimming', '{"a":"I like swimming on Sunday","b":"Sunday on I like swimming","c":"like I Sunday swimming"}', 'a', 2, 'I like swimming on Sunday = Aku suka berenang di hari Minggu. ✅'),
('k3-bing-05', 'After Monday is ___ (hari setelah Senin adalah...).', '{"a":"Tuesday","b":"Saturday","c":"Friday"}', 'a', 1, 'After Monday (setelah Senin) adalah Tuesday (Selasa). ✅'),

-- k3-bing-06
('k3-bing-06', 'Tempat untuk membaca dan meminjam banyak buku di sekolah 📚 adalah...', '{"a":"library","b":"canteen","c":"restroom"}', 'a', 1, 'Library = perpustakaan. ✅'),
('k3-bing-06', 'Tempat siswa membeli makanan dan minuman saat jam istirahat 🍱 adalah...', '{"a":"canteen","b":"classroom","c":"office"}', 'a', 1, 'Canteen = kantin sekolah. ✅'),
('k3-bing-06', 'Susun kata: it / Is / canteen / the?', '{"a":"Is it the canteen?","b":"canteen Is it the?","c":"it Is the canteen?"}', 'a', 2, 'Is it the canteen? = Apakah ini kantin? ✅'),
('k3-bing-06', 'Aisyah: "Is it the classroom?" Joshua: "Yes, it ___."', '{"a":"is","b":"isn''t","c":"are"}', 'a', 1, 'Pasangan Yes untuk Is it adalah it is. ✅'),

-- k3-bing-07
('k3-bing-07', 'Kata depan dalam Bahasa Inggris untuk posisi "di samping" adalah...', '{"a":"beside","b":"under","c":"in"}', 'a', 1, 'Beside = di samping. ✅'),
('k3-bing-07', 'Jika buku diletakkan "di atas" meja, preposisi yang tepat adalah...', '{"a":"on","b":"under","c":"behind"}', 'a', 1, 'On = di atas permukaan benda. ✅'),
('k3-bing-07', 'Susun kata: is / class / The / behind / office / the', '{"a":"The class is behind the office","b":"behind the office The class is","c":"is The class behind office"}', 'a', 2, 'The class is behind the office = Kelas ada di belakang kantor. ✅'),
('k3-bing-07', 'The cat is ___ the table. (kucing ada DI BAWAH meja)', '{"a":"under","b":"on","c":"between"}', 'a', 1, 'Under = di bawah. ✅'),

-- k3-bing-08
('k3-bing-08', 'Kegiatan yang kita lakukan di perpustakaan adalah "membaca buku". Membaca adalah...', '{"a":"read","b":"play","c":"drink"}', 'a', 1, 'Read = membaca. ✅'),
('k3-bing-08', 'Apa yang dilakukan Bapak/Ibu Guru (teacher) di ruang kelas?', '{"a":"teach (mengajar)","b":"sleep (tidur)","c":"run (berlari)"}', 'a', 1, 'Teach = mengajar. ✅'),
('k3-bing-08', 'Susun kata: juice / drink / I / in / canteen / the', '{"a":"I drink juice in the canteen","b":"drink I juice in the canteen","c":"in the canteen juice I drink"}', 'a', 2, 'I drink juice in the canteen = Aku minum jus di kantin. ✅'),
('k3-bing-08', 'We ___ (belajar) math in the classroom.', '{"a":"study","b":"eat","c":"play"}', 'a', 1, 'Study = belajar. ✅'),

-- k3-bing-09
('k3-bing-09', 'Lawan kata dari "dirty" (kotor) adalah...', '{"a":"clean (bersih)","b":"small (kecil)","c":"narrow (sempit)"}', 'a', 1, 'Clean = bersih, lawan dari dirty. ✅'),
('k3-bing-09', 'Halaman sekolah kita sangat luas. Kata sifat untuk "luas/besar" adalah...', '{"a":"large / big","b":"small","c":"dirty"}', 'a', 1, 'Large atau big artinya besar/luas. ✅'),
('k3-bing-09', 'Susun kata: is / classroom / My / clean', '{"a":"My classroom is clean","b":"clean My classroom is","c":"classroom My clean is"}', 'a', 2, 'My classroom is clean = Kelasku bersih. ✅'),
('k3-bing-09', 'Our school is very ___ (indah/cantik). We love it!', '{"a":"beautiful","b":"dirty","c":"narrow"}', 'a', 1, 'Beautiful = indah / cantik. ✅'),

-- k3-bing-10
('k3-bing-10', 'Angka 35 dalam Bahasa Inggris disebut...', '{"a":"thirty-five","b":"twenty-five","c":"forty-five"}', 'a', 1, 'Thirty = 30, five = 5, jadi thirty-five = 35. ✅'),
('k3-bing-10', 'Jika di rak ada banyak buku (lebih dari satu), kita menggunakan kata...', '{"a":"There are","b":"There is","c":"They"}', 'a', 1, 'There are digunakan untuk benda jamak/banyak (> 1). ✅'),
('k3-bing-10', 'Susun kata: are / There / books / thirty', '{"a":"There are thirty books","b":"books There are thirty","c":"thirty books There are"}', 'a', 2, 'There are thirty books = Ada tiga puluh buku. ✅'),
('k3-bing-10', '___ is one ruler on the table. (Karena penggarisnya cuma SATU/tunggal)', '{"a":"There is","b":"There are","c":"Those"}', 'a', 1, 'There is digunakan untuk benda tunggal (cuma 1). ✅');
