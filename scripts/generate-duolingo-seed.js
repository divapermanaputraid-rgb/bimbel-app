const fs = require('fs');

function escapeSql(str) {
  if (!str) return "NULL";
  return "'" + str.replace(/'/g, "''") + "'";
}

function escapeJson(obj) {
  if (!obj) return "NULL";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

const units = [
  // Unit 4: Do You Like Swimming?
  {
    id: "k3-bing-04",
    questions: [
      { id: "q1", tipe: "match", soal: "Match the hobby with the emoji!", soal_id: "Cocokkan hobi dengan emoji!", data: {"🏊": ["reading", "swimming", "singing"], "📚": ["swimming", "reading", "dancing"], "🚴": ["running", "riding a bike", "playing football"]}, jawaban_benar: {"🏊": "swimming", "📚": "reading", "🚴": "riding a bike"}, penjelasan_id: "🏊 = swimming (berenang), 📚 = reading (membaca), 🚴 = riding a bike (bersepeda). Great! 🌟", level: 1, xp: 10 },
      { id: "q2", tipe: "choose_correct", soal: "'Swimming' artinya...", soal_id: "'Swimming' artinya...", pilihan: ["Berenang", "Bernyanyi", "Berlari"], jawaban_benar: "Berenang", penjelasan_id: "Swimming = berenang 🏊, Singing = bernyanyi 🎤, Running = berlari 🏃", level: 1, xp: 10 },
      { id: "q3", tipe: "fill_blank", soal: "Do you like ___? (bermain bola)", soal_id: "Do you like ___? (bermain bola)", kalimat: "Do you like ___?", pilihan: ["playing football", "swimming", "reading"], jawaban_benar: "playing football", penjelasan_id: "Playing football = bermain bola ⚽. Do you like playing football? 🥅", level: 1, xp: 10 },
      { id: "q4", tipe: "arrange", soal: "Arrange into a question!", soal_id: "Susun menjadi pertanyaan!", kata: ["like", "you", "swimming", "Do"], jawaban_benar: "Do you like swimming", penjelasan_id: "Do you like swimming? = Apakah kamu suka berenang? 🏊", level: 1, xp: 15 },
      { id: "q5", tipe: "choose_correct", soal: "Does Made like reading? (jawaban negatif)", soal_id: "Does Made like reading? (jawaban negatif)", pilihan: ["Yes, he does.", "No, he doesn't.", "Yes, I do."], jawaban_benar: "No, he doesn't.", penjelasan_id: "'No, he doesn''t.' = Tidak, dia tidak (suka). Untuk laki-laki (he), pakai 'doesn''t'. 👎", level: 2, xp: 10 },
      { id: "q6", tipe: "true_false", soal: "'Riding a bike' artinya berlari.", soal_id: "'Riding a bike' artinya berlari.", pilihan: ["True", "False"], jawaban_benar: "False", penjelasan_id: "Salah! Riding a bike = bersepeda 🚴, Running = berlari 🏃", level: 1, xp: 10 },
      { id: "q7", tipe: "fill_blank", soal: "Cici likes ___. (menyanyi)", soal_id: "Cici likes ___. (menyanyi)", kalimat: "Cici likes ___.", pilihan: ["singing", "swimming", "dancing"], jawaban_benar: "singing", penjelasan_id: "Cici likes singing = Cici suka menyanyi. 🎤 'Likes' untuk dia (she/he).", level: 2, xp: 10 },
      { id: "q8", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["a", "likes", "bike", "Made", "riding"], jawaban_benar: "Made likes riding a bike", penjelasan_id: "Made likes riding a bike = Made suka bersepeda. 🚴 Nama orang + likes + hobby.", level: 2, xp: 15 }
    ]
  },
  // Unit 5: I Like Riding a Bike on Sunday
  {
    id: "k3-bing-05",
    questions: [
      { id: "q1", tipe: "choose_correct", soal: "'Sunday' artinya...", soal_id: "'Sunday' artinya...", pilihan: ["Minggu", "Senin", "Sabtu"], jawaban_benar: "Minggu", penjelasan_id: "Sunday = Minggu ☀️, Monday = Senin, Saturday = Sabtu", level: 1, xp: 10 },
      { id: "q2", tipe: "match", soal: "Match the day with the correct order!", soal_id: "Cocokkan hari dengan urutan yang benar!", data: {"Monday": ["Hari ke-2", "Hari ke-1", "Hari ke-7"], "Wednesday": ["Hari ke-3", "Hari ke-4", "Hari ke-5"], "Friday": ["Hari ke-5", "Hari ke-6", "Hari ke-4"]}, jawaban_benar: {"Monday": "Hari ke-1", "Wednesday": "Hari ke-3", "Friday": "Hari ke-5"}, penjelasan_id: "Monday = hari ke-1 📅, Wednesday = hari ke-3, Friday = hari ke-5. In Indonesia, Monday is the first day of the week! 🇮🇩", level: 1, xp: 10 },
      { id: "q3", tipe: "fill_blank", soal: "I like swimming on ___.", soal_id: "Saya suka berenang pada hari ___.", kalimat: "I like swimming on ___.", pilihan: ["Saturday", "Sunday", "Monday"], jawaban_benar: "Saturday", penjelasan_id: "I like swimming on Saturday = Saya suka berenang hari Sabtu. 🏊 Bisa juga hari lain!", level: 1, xp: 10 },
      { id: "q4", tipe: "arrange", soal: "Arrange the days in order!", soal_id: "Susun hari sesuai urutan!", kata: ["Wednesday", "Monday", "Tuesday"], jawaban_benar: "Monday Tuesday Wednesday", penjelasan_id: "Monday → Tuesday → Wednesday = Senin → Selasa → Rabu. 📅", level: 1, xp: 15 },
      { id: "q5", tipe: "choose_correct", soal: "What day is today? (jika hari ini Senin)", soal_id: "Hari ini hari apa? (jika hari ini Senin)", pilihan: ["Today is Monday.", "Today is Sunday.", "Today is Friday."], jawaban_benar: "Today is Monday.", penjelasan_id: "Today is Monday = Hari ini Senin. 'Today' = hari ini. 📅", level: 1, xp: 10 },
      { id: "q6", tipe: "true_false", soal: "'Friday' artinya Kamis.", soal_id: "'Friday' artinya Kamis.", pilihan: ["True", "False"], jawaban_benar: "False", penjelasan_id: "Salah! Friday = Jumat 🕌, Thursday = Kamis", level: 1, xp: 10 },
      { id: "q7", tipe: "fill_blank", soal: "I like reading on ___. (hari Sabtu dan Minggu)", soal_id: "Saya suka membaca pada hari ___. (Sabtu dan Minggu)", kalimat: "I like reading on ___.", pilihan: ["weekend", "weekday", "holiday"], jawaban_benar: "weekend", penjelasan_id: "Weekend = akhir pekan (Sabtu & Minggu). Weekday = hari kerja (Senin–Jumat). 📅", level: 2, xp: 10 },
      { id: "q8", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["Sunday", "on", "like", "I", "riding", "a", "bike"], jawaban_benar: "I like riding a bike on Sunday", penjelasan_id: "I like riding a bike on Sunday = Saya suka bersepeda hari Minggu. 🚴☀️", level: 2, xp: 15 }
    ]
  },
  // Unit 6: Is It the Canteen?
  {
    id: "k3-bing-06",
    questions: [
      { id: "q1", tipe: "match", soal: "Match the place with the emoji!", soal_id: "Cocokkan tempat dengan emoji!", data: {"🍽️": ["library", "canteen", "classroom"], "📚": ["canteen", "library", "office"], "🖥️": ["schoolyard", "computer lab", "restroom"]}, jawaban_benar: {"🍽️": "canteen", "📚": "library", "🖥️": "computer lab"}, penjelasan_id: "🍽️ = canteen (kantin), 📚 = library (perpustakaan), 🖥️ = computer lab (lab komputer). 🏫", level: 1, xp: 10 },
      { id: "q2", tipe: "choose_correct", soal: "'Library' artinya...", soal_id: "'Library' artinya...", pilihan: ["Perpustakaan", "Kantin", "Kelas"], jawaban_benar: "Perpustakaan", penjelasan_id: "Library = perpustakaan 📚, Canteen = kantin 🍽️, Classroom = kelas 🏫", level: 1, xp: 10 },
      { id: "q3", tipe: "fill_blank", soal: "Is it the classroom? ___, it is.", soal_id: "Apakah ini kelas? ___, ini kelas.", kalimat: "Is it the classroom? ___, it is.", pilihan: ["Yes", "No", "Maybe"], jawaban_benar: "Yes", penjelasan_id: "'Yes, it is.' = Ya, ini (kelas). Untuk jawab positif dari 'Is it...?' ✅", level: 1, xp: 10 },
      { id: "q4", tipe: "arrange", soal: "Arrange into a question!", soal_id: "Susun menjadi pertanyaan!", kata: ["canteen", "it", "Is", "the"], jawaban_benar: "Is it the canteen", penjelasan_id: "Is it the canteen? = Apakah ini kantin? 🍽️", level: 1, xp: 15 },
      { id: "q5", tipe: "choose_correct", soal: "Is it the library? (jawaban negatif)", soal_id: "Apakah ini perpustakaan? (jawaban negatif)", pilihan: ["Yes, it is.", "No, it isn't.", "No, I don't."], jawaban_benar: "No, it isn't.", penjelasan_id: "'No, it isn''t.' = Tidak, ini bukan. 'Isn''t' = is + not. 👎", level: 2, xp: 10 },
      { id: "q6", tipe: "true_false", soal: "'Prayer room' artinya mushola.", soal_id: "'Prayer room' artinya mushola.", pilihan: ["True", "False"], jawaban_benar: "True", penjelasan_id: "Betul! Prayer room = mushola 🕌. Restroom = toilet 🚻", level: 1, xp: 10 },
      { id: "q7", tipe: "fill_blank", soal: "___ it the office? No, it isn't.", soal_id: "___ ini kantor? Tidak, ini bukan.", kalimat: "___ it the office? No, it isn't.", pilihan: ["Is", "Are", "Do"], jawaban_benar: "Is", penjelasan_id: "'Is it...?' untuk bertanya tentang tempat/benda. 'Is' untuk satu (it). ❓", level: 2, xp: 10 },
      { id: "q8", tipe: "listen_choose", soal: "Listen and choose!", soal_id: "Dengar dan pilih!", audio_text: "classroom", pilihan: ["🏫", "🍽️", "📚"], jawaban_benar: "🏫", penjelasan_id: "Classroom = kelas = 🏫. This is where we study! 📖", level: 1, xp: 10 }
    ]
  },
  // Unit 7: My Class Is Behind the Office
  {
    id: "k3-bing-07",
    questions: [
      { id: "q1", tipe: "choose_correct", soal: "'Behind' artinya...", soal_id: "'Behind' artinya...", pilihan: ["Di belakang", "Di depan", "Di samping"], jawaban_benar: "Di belakang", penjelasan_id: "Behind = di belakang, In front of = di depan, Beside = di samping", level: 1, xp: 10 },
      { id: "q2", tipe: "match", soal: "Match the preposition with the position!", soal_id: "Cocokkan preposisi dengan posisi!", data: {"in": ["Di luar", "Di dalam", "Di atas"], "on": ["Di bawah", "Di atas", "Di samping"], "under": ["Di atas", "Di bawah", "Di antara"]}, jawaban_benar: {"in": "Di dalam", "on": "Di atas", "under": "Di bawah"}, penjelasan_id: "In = di dalam 📦, On = di atas ⬆️, Under = di bawah ⬇️", level: 1, xp: 10 },
      { id: "q3", tipe: "fill_blank", soal: "The book is ___ the table.", soal_id: "Bukunya ada ___ meja.", kalimat: "The book is ___ the table.", pilihan: ["on", "in", "under"], jawaban_benar: "on", penjelasan_id: "The book is ON the table = Bukunya di atas meja. 📚⬆️", level: 1, xp: 10 },
      { id: "q4", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["the", "is", "office", "class", "The", "behind"], jawaban_benar: "The class is behind the office", penjelasan_id: "The class is behind the office = Kelasnya di belakang kantor. 🏫", level: 1, xp: 15 },
      { id: "q5", tipe: "choose_correct", soal: "Where is the canteen? (di samping perpustakaan)", soal_id: "Di mana kantinnya? (di samping perpustakaan)", pilihan: ["The canteen is beside the library.", "The canteen is behind the library.", "The canteen is under the library."], jawaban_benar: "The canteen is beside the library.", penjelasan_id: "Beside = di samping. The canteen is beside the library = Kantinnya di samping perpustakaan. 📚🍽️", level: 2, xp: 10 },
      { id: "q6", tipe: "true_false", soal: "'Between' artinya di depan.", soal_id: "'Between' artinya di depan.", pilihan: ["True", "False"], jawaban_benar: "False", penjelasan_id: "Salah! Between = di antara, In front of = di depan. ↔️", level: 1, xp: 10 },
      { id: "q7", tipe: "fill_blank", soal: "The library is ___ the classroom and the office.", soal_id: "Perpustakaannya ada ___ kelas dan kantor.", kalimat: "The library is ___ the classroom and the office.", pilihan: ["between", "behind", "in front of"], jawaban_benar: "between", penjelasan_id: "Between = di antara dua benda. The library is between the classroom and the office. ↔️", level: 2, xp: 10 },
      { id: "q8", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["under", "The", "is", "the", "chair", "table"], jawaban_benar: "The chair is under the table", penjelasan_id: "The chair is under the table = Kursinya di bawah meja. ⬇️", level: 2, xp: 15 }
    ]
  },
  // Unit 8: I Drink Orange Juice in the Canteen
  {
    id: "k3-bing-08",
    questions: [
      { id: "q1", tipe: "match", soal: "Match the activity with the place!", soal_id: "Cocokkan aktivitas dengan tempat!", data: {"study": ["Canteen", "Classroom", "Schoolyard"], "eat": ["Classroom", "Canteen", "Library"], "play": ["Library", "Schoolyard", "Classroom"]}, jawaban_benar: {"study": "Classroom", "eat": "Canteen", "play": "Schoolyard"}, penjelasan_id: "Study in classroom 📖, Eat in canteen 🍽️, Play in schoolyard ⚽", level: 1, xp: 10 },
      { id: "q2", tipe: "choose_correct", soal: "'Teach' artinya...", soal_id: "'Teach' artinya...", pilihan: ["Mengajar", "Belajar", "Membaca"], jawaban_benar: "Mengajar", penjelasan_id: "Teach = mengajar 👨‍🏫, Study = belajar 📖, Read = membaca 📚", level: 1, xp: 10 },
      { id: "q3", tipe: "fill_blank", soal: "I ___ orange juice in the canteen.", soal_id: "Saya ___ jus jeruk di kantin.", kalimat: "I ___ orange juice in the canteen.", pilihan: ["drink", "eat", "play"], jawaban_benar: "drink", penjelasan_id: "Drink = minum 🥤, Eat = makan 🍽️, Play = bermain ⚽. I drink orange juice = Saya minum jus jeruk.", level: 1, xp: 10 },
      { id: "q4", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["the", "pray", "We", "in", "room", "prayer"], jawaban_benar: "We pray in the prayer room", penjelasan_id: "We pray in the prayer room = Kita berdoa di mushola. 🕌", level: 1, xp: 15 },
      { id: "q5", tipe: "choose_correct", soal: "What do you do in the classroom?", soal_id: "Apa yang kamu lakukan di kelas?", pilihan: ["I study and read.", "I eat and drink.", "I play football."], jawaban_benar: "I study and read.", penjelasan_id: "In the classroom, we study and read! 📖 Di canteen, we eat and drink. 🍽️", level: 1, xp: 10 },
      { id: "q6", tipe: "true_false", soal: "'Write' artinya membaca.", soal_id: "'Write' artinya membaca.", pilihan: ["True", "False"], jawaban_benar: "False", penjelasan_id: "Salah! Write = menulis ✍️, Read = membaca 📖", level: 1, xp: 10 },
      { id: "q7", tipe: "fill_blank", soal: "The teacher ___ in the classroom.", soal_id: "Guru ___ di kelas.", kalimat: "The teacher ___ in the classroom.", pilihan: ["teaches", "studies", "plays"], jawaban_benar: "teaches", penjelasan_id: "The teacher teaches in the classroom = Guru mengajar di kelas. 👨‍🏫 'Teaches' untuk dia (he/she).", level: 2, xp: 10 },
      { id: "q8", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["in", "play", "the", "We", "schoolyard"], jawaban_benar: "We play in the schoolyard", penjelasan_id: "We play in the schoolyard = Kita bermain di halaman sekolah. ⚽", level: 2, xp: 15 }
    ]
  },
  // Unit 9: My Classroom Is Clean
  {
    id: "k3-bing-09",
    questions: [
      { id: "q1", tipe: "match", soal: "Match the adjective with the opposite!", soal_id: "Cocokkan kata sifat dengan lawannya!", data: {"clean": ["dirty", "small", "narrow"], "big": ["small", "dirty", "wide"], "wide": ["narrow", "clean", "big"]}, jawaban_benar: {"clean": "dirty", "big": "small", "wide": "narrow"}, penjelasan_id: "Clean ↔ Dirty (bersih ↔ kotor), Big ↔ Small (besar ↔ kecil), Wide ↔ Narrow (lebar ↔ sempit). ⚖️", level: 1, xp: 10 },
      { id: "q2", tipe: "choose_correct", soal: "'Clean' artinya...", soal_id: "'Clean' artinya...", pilihan: ["Bersih", "Kotor", "Besar"], jawaban_benar: "Bersih", penjelasan_id: "Clean = bersih ✨, Dirty = kotor 🗑️, Big = besar 📏", level: 1, xp: 10 },
      { id: "q3", tipe: "fill_blank", soal: "My classroom is ___.", soal_id: "Kelasku ___ .", kalimat: "My classroom is ___.", pilihan: ["big", "small", "dirty"], jawaban_benar: "big", penjelasan_id: "My classroom is big = Kelasku besar. 🏫 'Big' = besar, 'Large' juga = besar.", level: 1, xp: 10 },
      { id: "q4", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["is", "classroom", "My", "clean"], jawaban_benar: "My classroom is clean", penjelasan_id: "My classroom is clean = Kelasku bersih. ✨ Subject + is + adjective.", level: 1, xp: 15 },
      { id: "q5", tipe: "choose_correct", soal: "The schoolyard is ___. (luas)", soal_id: "Halaman sekolahnya ___ . (luas)", pilihan: ["wide", "narrow", "dirty"], jawaban_benar: "wide", penjelasan_id: "Wide = lebar/luas ↔ Narrow = sempit. The schoolyard is wide = Halaman sekolahnya luas. 🏫", level: 1, xp: 10 },
      { id: "q6", tipe: "true_false", soal: "'Beautiful' artinya indah.", soal_id: "'Beautiful' artinya indah.", pilihan: ["True", "False"], jawaban_benar: "True", penjelasan_id: "Betul! Beautiful = indah ✨. My school is beautiful = Sekolahku indah. 🌸", level: 1, xp: 10 },
      { id: "q7", tipe: "fill_blank", soal: "The restroom is ___. (kotor)", soal_id: "Toiletnya ___ . (kotor)", kalimat: "The restroom is ___.", pilihan: ["dirty", "clean", "beautiful"], jawaban_benar: "dirty", penjelasan_id: "Dirty = kotor. But we should keep it clean! 🧹 Let's make it clean! ✨", level: 2, xp: 10 },
      { id: "q8", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["is", "school", "My", "beautiful"], jawaban_benar: "My school is beautiful", penjelasan_id: "My school is beautiful = Sekolahku indah. 🌸✨", level: 2, xp: 15 }
    ]
  },
  // Unit 10: There Are Twenty Books on the Shelf
  {
    id: "k3-bing-10",
    questions: [
      { id: "q1", tipe: "match", soal: "Match the number with the word!", soal_id: "Cocokkan angka dengan kata!", data: {"25": ["twenty-five", "thirty-five", "forty-five"], "33": ["thirty-three", "twenty-three", "forty-three"], "47": ["forty-seven", "thirty-seven", "fifty-seven"]}, jawaban_benar: {"25": "twenty-five", "33": "thirty-three", "47": "forty-seven"}, penjelasan_id: "25 = twenty-five, 33 = thirty-three, 47 = forty-seven. 🔢", level: 1, xp: 10 },
      { id: "q2", tipe: "choose_correct", soal: "'Thirty' artinya...", soal_id: "'Thirty' artinya...", pilihan: ["30", "40", "50"], jawaban_benar: "30", penjelasan_id: "Thirty = 30, Forty = 40, Fifty = 50. 🔢", level: 1, xp: 10 },
      { id: "q3", tipe: "fill_blank", soal: "There ___ 20 books on the shelf.", soal_id: "Ada ___ 20 buku di rak.", kalimat: "There ___ 20 books on the shelf.", pilihan: ["are", "is", "am"], jawaban_benar: "are", penjelasan_id: "'There ARE' untuk banyak (books = jamak). 'There IS' untuk satu. 📚📚📚", level: 1, xp: 10 },
      { id: "q4", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["are", "There", "chairs", "thirty", "the", "in", "classroom"], jawaban_benar: "There are thirty chairs in the classroom", penjelasan_id: "There are thirty chairs in the classroom = Ada 30 kursi di kelas. 🪑", level: 1, xp: 15 },
      { id: "q5", tipe: "choose_correct", soal: "There is ___ pencil on the table.", soal_id: "Ada ___ pensil di meja.", pilihan: ["a", "two", "three"], jawaban_benar: "a", penjelasan_id: "'There IS a pencil' = Ada satu pensil. 'A' untuk satu. ✏️ 'There ARE' untuk banyak.", level: 2, xp: 10 },
      { id: "q6", tipe: "true_false", soal: "'Forty-two' artinya 42.", soal_id: "'Forty-two' artinya 42.", pilihan: ["True", "False"], jawaban_benar: "True", penjelasan_id: "Betul! Forty-two = 42. Forty = 40, two = 2. 40 + 2 = 42! 🔢", level: 1, xp: 10 },
      { id: "q7", tipe: "fill_blank", soal: "___ there 25 students in the class?", soal_id: "___ ada 25 siswa di kelas?", kalimat: "___ there 25 students in the class?", pilihan: ["Are", "Is", "Do"], jawaban_benar: "Are", penjelasan_id: "'Are there...?' untuk bertanya tentang banyak benda/orang. 'Are' untuk jamak (students). ❓", level: 2, xp: 10 },
      { id: "q8", tipe: "listen_choose", soal: "Listen and choose!", soal_id: "Dengar dan pilih!", audio_text: "thirty-five", pilihan: ["35", "45", "25"], jawaban_benar: "35", penjelasan_id: "Thirty-five = 35. Thirty = 30, five = 5. 30 + 5 = 35! 🔢", level: 1, xp: 10 }
    ]
  }
];

let sql = `-- ==========================================
-- 022_soal_bing_k3_duolingo.sql
-- Seed Duolingo-style questions for B.Inggris K3
-- ==========================================

DELETE FROM public.questions WHERE material_id LIKE 'k3-bing-%';

INSERT INTO public.questions (
  id, material_id, tipe, soal, soal_id, data, audio_text, pilihan, jawaban_benar, penjelasan_id, kalimat, kata, level, xp
) VALUES
`;

const jsonUnit1_3 = require('./user-prompt-units-1-3.json'); // the units 1-3 from user

const allUnits = [...jsonUnit1_3.units, ...units];
const rows = [];

for (const unit of allUnits) {
  const matId = unit.id || unit.unit_id;
  const questions = unit.questions || unit.soal;
  for (const q of questions) {
    const id = q.id;
    const tipe = q.tipe;
    const soal = q.soal;
    const soal_id = q.soal_id;
    const data = q.data;
    const audio_text = q.audio_text;
    const pilihan = q.pilihan;
    const jawaban_benar = q.jawaban_benar;
    const penjelasan_id = q.penjelasan_id;
    const kalimat = q.kalimat;
    const kata = q.kata;
    const level = q.level;
    const xp = q.xp;

    rows.push(`(
  ${escapeSql(id)},
  ${escapeSql(matId)},
  ${escapeSql(tipe)},
  ${escapeSql(soal)},
  ${escapeSql(soal_id)},
  ${escapeJson(data)},
  ${escapeSql(audio_text)},
  ${escapeJson(pilihan)},
  ${escapeJson(jawaban_benar)},
  ${escapeSql(penjelasan_id)},
  ${escapeSql(kalimat)},
  ${escapeJson(kata)},
  ${level},
  ${xp}
)`);
  }
}

sql += rows.join(',\n') + ';\n';
fs.writeFileSync('supabase/migrations/022_soal_bing_k3_duolingo.sql', sql);
console.log('✅ Generated 022_soal_bing_k3_duolingo.sql for 80 questions.');
