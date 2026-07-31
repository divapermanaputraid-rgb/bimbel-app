// generate-bank-soal-ipas.js
// Generates bank soal IPAS: K3 (32), K4 (32), K5 (25), K6 (40) = 129 total
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ============ K3 IPAS — 8 unit × 4 soal = 32 ============
const k3Units = [
  {
    unit_id: 'k3-ipas-01', unit_title: 'Hewan di Sekitar Kita',
    soal: [
      { id: 'k3-ipas-01-01', tipe: 'choose', pertanyaan: 'Kucing adalah hewan...', pilihan: ['karnivora', 'herbivora', 'omnivora'], jawaban: 'karnivora' },
      { id: 'k3-ipas-01-02', tipe: 'match', pertanyaan: 'Cocokkan hewan dengan makanannya!', pasangan: { '🐱': 'daging', '🐰': 'sayur', '🐔': 'biji-bijian' }, jawaban: { '🐱': 'daging', '🐰': 'sayur', '🐔': 'biji-bijian' } },
      { id: 'k3-ipas-01-03', tipe: 'truefalse', pertanyaan: 'Ayam bertelur dan berkaki dua.', jawaban: true },
      { id: 'k3-ipas-01-04', tipe: 'fill', pertanyaan: 'Kupu-kupu mengalami: telur → ulat → _____ → kupu-kupu.', pilihan: ['kepompong', 'telur', 'ikan'], jawaban: 'kepompong' },
    ]
  },
  {
    unit_id: 'k3-ipas-02', unit_title: 'Siklus Hidup Hewan',
    soal: [
      { id: 'k3-ipas-02-01', tipe: 'choose', pertanyaan: 'Katak mengalami metamorfosis. Urutan yang benar...', pilihan: ['telur → berudu → katak', 'telur → katak → berudu', 'katak → berudu → telur'], jawaban: 'telur → berudu → katak' },
      { id: 'k3-ipas-02-02', tipe: 'truefalse', pertanyaan: 'Belalang mengalami metamorfosis sempurna.', jawaban: false },
      { id: 'k3-ipas-02-03', tipe: 'fill', pertanyaan: 'Nyamuk mengalami: telur → jentik → _____ → nyamuk.', pilihan: ['kepompong', 'ulat', 'cacing'], jawaban: 'kepompong' },
      { id: 'k3-ipas-02-04', tipe: 'choose', pertanyaan: 'Hewan yang langsung menjadi dewasa tanpa fase larva adalah...', pilihan: ['kucing', 'kupu-kupu', 'katak'], jawaban: 'kucing' },
    ]
  },
  {
    unit_id: 'k3-ipas-03', unit_title: 'Tumbuhan di Sekitar Kita',
    soal: [
      { id: 'k3-ipas-03-01', tipe: 'choose', pertanyaan: 'Tumbuhan membuat makanan sendiri lewat proses...', pilihan: ['fotosintesis', 'respirasi', 'transpirasi'], jawaban: 'fotosintesis' },
      { id: 'k3-ipas-03-02', tipe: 'fill', pertanyaan: 'Fotosintesis menghasilkan _____ yang kita hirup.', pilihan: ['oksigen', 'karbondioksida', 'nitrogen'], jawaban: 'oksigen' },
      { id: 'k3-ipas-03-03', tipe: 'truefalse', pertanyaan: 'Akar tumbuhan menyerap air dari tanah.', jawaban: true },
      { id: 'k3-ipas-03-04', tipe: 'match', pertanyaan: 'Cocokkan bagian tumbuhan dengan fungsinya!', pasangan: { 'Akar': 'Menyerap air', 'Daun': 'Fotosintesis', 'Bunga': 'Reproduksi' }, jawaban: { 'Akar': 'Menyerap air', 'Daun': 'Fotosintesis', 'Bunga': 'Reproduksi' } },
    ]
  },
  {
    unit_id: 'k3-ipas-04', unit_title: 'Wujud Benda',
    soal: [
      { id: 'k3-ipas-04-01', tipe: 'choose', pertanyaan: 'Es batu yang dipanaskan mengalami perubahan...', pilihan: ['mencair', 'membeku', 'menguap'], jawaban: 'mencair' },
      { id: 'k3-ipas-04-02', tipe: 'fill', pertanyaan: 'Air dipanaskan berubah menjadi _____.', pilihan: ['uap', 'es', 'batu'], jawaban: 'uap' },
      { id: 'k3-ipas-04-03', tipe: 'truefalse', pertanyaan: 'Benda gas tidak memiliki bentuk tetap.', jawaban: true },
      { id: 'k3-ipas-04-04', tipe: 'choose', pertanyaan: 'Kapur barus yang habis sendiri menunjukkan perubahan wujud...', pilihan: ['menyublim', 'mencair', 'membeku'], jawaban: 'menyublim' },
    ]
  },
  {
    unit_id: 'k3-ipas-05', unit_title: 'Cuaca dan Iklim',
    soal: [
      { id: 'k3-ipas-05-01', tipe: 'choose', pertanyaan: 'Alat ukur suhu udara disebut...', pilihan: ['termometer', 'barometer', 'higrometer'], jawaban: 'termometer' },
      { id: 'k3-ipas-05-02', tipe: 'truefalse', pertanyaan: 'Indonesia beriklim tropis karena dekat khatulistiwa.', jawaban: true },
      { id: 'k3-ipas-05-03', tipe: 'fill', pertanyaan: 'Angin terjadi karena perbedaan _____ udara.', pilihan: ['tekanan', 'warna', 'rasa'], jawaban: 'tekanan' },
      { id: 'k3-ipas-05-04', tipe: 'match', pertanyaan: 'Cocokkan cuaca dengan tanda-tandanya!', pasangan: { 'Hujan': 'Awan gelap', 'Cerah': 'Matahari bersinar', 'Berangin': 'Pohon bergoyang' }, jawaban: { 'Hujan': 'Awan gelap', 'Cerah': 'Matahari bersinar', 'Berangin': 'Pohon bergoyang' } },
    ]
  },
  {
    unit_id: 'k3-ipas-06', unit_title: 'Energi Sehari-hari',
    soal: [
      { id: 'k3-ipas-06-01', tipe: 'choose', pertanyaan: 'Sumber energi utama di Bumi adalah...', pilihan: ['Matahari', 'Bulan', 'Bintang'], jawaban: 'Matahari' },
      { id: 'k3-ipas-06-02', tipe: 'fill', pertanyaan: 'Kincir angin mengubah energi _____ menjadi energi gerak.', pilihan: ['angin', 'air', 'panas'], jawaban: 'angin' },
      { id: 'k3-ipas-06-03', tipe: 'truefalse', pertanyaan: 'Baterai menghasilkan energi listrik.', jawaban: true },
      { id: 'k3-ipas-06-04', tipe: 'choose', pertanyaan: 'Energi yang dihasilkan saat kita membakar kayu adalah...', pilihan: ['panas dan cahaya', 'listrik', 'magnet'], jawaban: 'panas dan cahaya' },
    ]
  },
  {
    unit_id: 'k3-ipas-07', unit_title: 'Sumber Daya Alam',
    soal: [
      { id: 'k3-ipas-07-01', tipe: 'choose', pertanyaan: 'Air, tanah, dan hutan adalah contoh sumber daya alam...', pilihan: ['hayati', 'mineral', 'buatan'], jawaban: 'hayati' },
      { id: 'k3-ipas-07-02', tipe: 'truefalse', pertanyaan: 'Minyak bumi bisa diperbaharui dalam waktu singkat.', jawaban: false },
      { id: 'k3-ipas-07-03', tipe: 'fill', pertanyaan: 'Hemat air termasuk usaha _____ sumber daya alam.', pilihan: ['melestarikan', 'merusak', 'menghabiskan'], jawaban: 'melestarikan' },
      { id: 'k3-ipas-07-04', tipe: 'match', pertanyaan: 'Cocokkan sumber daya dengan kegunaannya!', pasangan: { 'Air': 'Minum & mandi', 'Tanah': 'Bercocok tanam', 'Hutan': 'Paru-paru dunia' }, jawaban: { 'Air': 'Minum & mandi', 'Tanah': 'Bercocok tanam', 'Hutan': 'Paru-paru dunia' } },
    ]
  },
  {
    unit_id: 'k3-ipas-08', unit_title: 'Lingkungan Sehat',
    soal: [
      { id: 'k3-ipas-08-01', tipe: 'choose', pertanyaan: 'Membuang sampah sembarangan dapat menyebabkan...', pilihan: ['banjir', 'hujan', 'angin'], jawaban: 'banjir' },
      { id: 'k3-ipas-08-02', tipe: 'truefalse', pertanyaan: 'Menanam pohon membantu menjaga lingkungan tetap bersih.', jawaban: true },
      { id: 'k3-ipas-08-03', tipe: 'fill', pertanyaan: 'Sampah organik seperti daun dapat dijadikan _____.', pilihan: ['kompos', 'plastik', 'besi'], jawaban: 'kompos' },
      { id: 'k3-ipas-08-04', tipe: 'choose', pertanyaan: 'Yang termasuk polusi udara adalah...', pilihan: ['asap kendaraan', 'air bersih', 'tanah subur'], jawaban: 'asap kendaraan' },
    ]
  },
];

// ============ K4 IPAS — 8 unit × 4 soal = 32 ============
const k4Units = [
  {
    unit_id: 'k4-ipas-01', unit_title: 'Tumbuhan dan Kehidupan',
    soal: [
      { id: 'k4-ipas-01-01', tipe: 'choose', pertanyaan: 'Penyerbukan pada bunga dibantu oleh...', pilihan: ['serangga dan angin', 'hujan saja', 'manusia saja'], jawaban: 'serangga dan angin' },
      { id: 'k4-ipas-01-02', tipe: 'fill', pertanyaan: 'Tumbuhan paku berkembang biak dengan _____.', pilihan: ['spora', 'biji', 'umbi'], jawaban: 'spora' },
      { id: 'k4-ipas-01-03', tipe: 'truefalse', pertanyaan: 'Bambu termasuk tumbuhan berbiji.', jawaban: false },
      { id: 'k4-ipas-01-04', tipe: 'match', pertanyaan: 'Cocokkan cara berkembang biak tumbuhan!', pasangan: { 'Mangga': 'Biji', 'Pisang': 'Tunas', 'Singkong': 'Stek batang' }, jawaban: { 'Mangga': 'Biji', 'Pisang': 'Tunas', 'Singkong': 'Stek batang' } },
    ]
  },
  {
    unit_id: 'k4-ipas-02', unit_title: 'Perubahan Wujud Benda',
    soal: [
      { id: 'k4-ipas-02-01', tipe: 'choose', pertanyaan: 'Es batu di meja lama-lama menjadi air. Perubahan dari...', pilihan: ['padat ke cair', 'cair ke gas', 'gas ke padat'], jawaban: 'padat ke cair' },
      { id: 'k4-ipas-02-02', tipe: 'fill', pertanyaan: 'Air dipanaskan menjadi _____.', pilihan: ['uap', 'es', 'batu'], jawaban: 'uap' },
      { id: 'k4-ipas-02-03', tipe: 'truefalse', pertanyaan: 'Magnet bisa menarik semua benda.', jawaban: false },
      { id: 'k4-ipas-02-04', tipe: 'match', pertanyaan: 'Cocokkan gaya dengan contohnya!', pasangan: { 'Gaya gravitasi': 'Benda jatuh ke bawah', 'Gaya gesek': 'Sepeda berhenti', 'Gaya magnet': 'Kulkas menempel' }, jawaban: { 'Gaya gravitasi': 'Benda jatuh ke bawah', 'Gaya gesek': 'Sepeda berhenti', 'Gaya magnet': 'Kulkas menempel' } },
    ]
  },
  {
    unit_id: 'k4-ipas-03', unit_title: 'Gaya dan Gerak',
    soal: [
      { id: 'k4-ipas-03-01', tipe: 'choose', pertanyaan: 'Gaya yang menarik benda ke pusat bumi adalah...', pilihan: ['gravitasi', 'magnet', 'gesek'], jawaban: 'gravitasi' },
      { id: 'k4-ipas-03-02', tipe: 'truefalse', pertanyaan: 'Gaya gesek selalu merugikan.', jawaban: false },
      { id: 'k4-ipas-03-03', tipe: 'fill', pertanyaan: 'Rem sepeda menggunakan gaya _____ untuk berhenti.', pilihan: ['gesek', 'gravitasi', 'magnet'], jawaban: 'gesek' },
      { id: 'k4-ipas-03-04', tipe: 'choose', pertanyaan: 'Balon yang ditiup lalu dilepas bergerak karena...', pilihan: ['gaya udara', 'gaya magnet', 'gaya gravitasi'], jawaban: 'gaya udara' },
    ]
  },
  {
    unit_id: 'k4-ipas-04', unit_title: 'Energi dan Perubahannya',
    soal: [
      { id: 'k4-ipas-04-01', tipe: 'choose', pertanyaan: 'Televisi mengubah energi listrik menjadi...', pilihan: ['cahaya dan bunyi', 'panas saja', 'gerak saja'], jawaban: 'cahaya dan bunyi' },
      { id: 'k4-ipas-04-02', tipe: 'fill', pertanyaan: 'Panel surya mengubah energi _____ menjadi listrik.', pilihan: ['matahari', 'angin', 'air'], jawaban: 'matahari' },
      { id: 'k4-ipas-04-03', tipe: 'truefalse', pertanyaan: 'PLTA menggunakan energi air untuk menghasilkan listrik.', jawaban: true },
      { id: 'k4-ipas-04-04', tipe: 'match', pertanyaan: 'Cocokkan sumber energi!', pasangan: { 'Matahari': 'Terbarukan', 'Minyak bumi': 'Tak terbarukan', 'Angin': 'Terbarukan' }, jawaban: { 'Matahari': 'Terbarukan', 'Minyak bumi': 'Tak terbarukan', 'Angin': 'Terbarukan' } },
    ]
  },
  {
    unit_id: 'k4-ipas-05', unit_title: 'Bunyi dan Cahaya',
    soal: [
      { id: 'k4-ipas-05-01', tipe: 'choose', pertanyaan: 'Cahaya merambat secara...', pilihan: ['lurus', 'berbelok', 'melingkar'], jawaban: 'lurus' },
      { id: 'k4-ipas-05-02', tipe: 'truefalse', pertanyaan: 'Bunyi dapat merambat di ruang hampa.', jawaban: false },
      { id: 'k4-ipas-05-03', tipe: 'fill', pertanyaan: 'Pelangi terjadi karena cahaya _____ oleh tetesan air.', pilihan: ['dibiaskan', 'diserap', 'dipantulkan balik'], jawaban: 'dibiaskan' },
      { id: 'k4-ipas-05-04', tipe: 'choose', pertanyaan: 'Benda yang dapat menghasilkan cahaya sendiri disebut...', pilihan: ['sumber cahaya', 'cermin', 'prisma'], jawaban: 'sumber cahaya' },
    ]
  },
  {
    unit_id: 'k4-ipas-06', unit_title: 'Bumi dan Lingkungannya',
    soal: [
      { id: 'k4-ipas-06-01', tipe: 'choose', pertanyaan: 'Gempa bumi terjadi karena...', pilihan: ['pergeseran lempeng bumi', 'hujan deras', 'angin kencang'], jawaban: 'pergeseran lempeng bumi' },
      { id: 'k4-ipas-06-02', tipe: 'fill', pertanyaan: 'Gunung berapi mengeluarkan _____ dari dalam bumi.', pilihan: ['magma/lava', 'air', 'pasir biasa'], jawaban: 'magma/lava' },
      { id: 'k4-ipas-06-03', tipe: 'truefalse', pertanyaan: 'Indonesia berada di Cincin Api Pasifik.', jawaban: true },
      { id: 'k4-ipas-06-04', tipe: 'match', pertanyaan: 'Cocokkan lapisan bumi!', pasangan: { 'Kerak': 'Terluar', 'Mantel': 'Tengah', 'Inti': 'Terdalam' }, jawaban: { 'Kerak': 'Terluar', 'Mantel': 'Tengah', 'Inti': 'Terdalam' } },
    ]
  },
  {
    unit_id: 'k4-ipas-07', unit_title: 'Keragaman Budaya',
    soal: [
      { id: 'k4-ipas-07-01', tipe: 'choose', pertanyaan: 'Pakaian adat Jawa adalah...', pilihan: ['kebaya', 'ulos', 'baju kurung'], jawaban: 'kebaya' },
      { id: 'k4-ipas-07-02', tipe: 'truefalse', pertanyaan: 'Indonesia memiliki lebih dari 300 suku bangsa.', jawaban: true },
      { id: 'k4-ipas-07-03', tipe: 'fill', pertanyaan: 'Semboyan "Bhinneka Tunggal Ika" berarti berbeda-beda tetapi tetap _____.', pilihan: ['satu', 'dua', 'tiga'], jawaban: 'satu' },
      { id: 'k4-ipas-07-04', tipe: 'match', pertanyaan: 'Cocokkan rumah adat!', pasangan: { 'Jawa': 'Joglo', 'Minangkabau': 'Gadang', 'Toraja': 'Tongkonan' }, jawaban: { 'Jawa': 'Joglo', 'Minangkabau': 'Gadang', 'Toraja': 'Tongkonan' } },
    ]
  },
  {
    unit_id: 'k4-ipas-08', unit_title: 'Manusia dan Lingkungan',
    soal: [
      { id: 'k4-ipas-08-01', tipe: 'choose', pertanyaan: 'Deforestasi adalah...', pilihan: ['penebangan hutan berlebihan', 'menanam pohon', 'irigasi sawah'], jawaban: 'penebangan hutan berlebihan' },
      { id: 'k4-ipas-08-02', tipe: 'truefalse', pertanyaan: 'Membuang limbah ke sungai baik untuk lingkungan.', jawaban: false },
      { id: 'k4-ipas-08-03', tipe: 'fill', pertanyaan: 'Program 3R: Reduce, Reuse, dan _____.', pilihan: ['Recycle', 'Remove', 'Repeat'], jawaban: 'Recycle' },
      { id: 'k4-ipas-08-04', tipe: 'choose', pertanyaan: 'Yang termasuk dampak pemanasan global adalah...', pilihan: ['es kutub mencair', 'hutan makin lebat', 'air laut surut'], jawaban: 'es kutub mencair' },
    ]
  },
];

// ============ K5 IPAS — 5 unit × 5 soal = 25 ============
const k5Units = [
  {
    unit_id: 'k5-ipas-01', unit_title: 'Melihat karena Cahaya, Mendengar karena Bunyi',
    soal: [
      { id: 'k5-ipas-01-01', tipe: 'choose', pertanyaan: 'Cahaya merambat secara...', pilihan: ['lurus', 'berbelok', 'melingkar'], jawaban: 'lurus' },
      { id: 'k5-ipas-01-02', tipe: 'fill', pertanyaan: 'Pemantulan cahaya di cermin menghasilkan _____.', pilihan: ['bayangan', 'suara', 'panas'], jawaban: 'bayangan' },
      { id: 'k5-ipas-01-03', tipe: 'truefalse', pertanyaan: 'Bunyi dapat merambat di ruang hampa udara.', jawaban: false },
      { id: 'k5-ipas-01-04', tipe: 'choose', pertanyaan: 'Gema terjadi karena bunyi...', pilihan: ['dipantulkan', 'diserap', 'diperkuat'], jawaban: 'dipantulkan' },
      { id: 'k5-ipas-01-05', tipe: 'match', pertanyaan: 'Cocokkan sifat cahaya!', pasangan: { 'Cermin': 'Memantulkan', 'Kaca bening': 'Meneruskan', 'Tembok': 'Menyerap' }, jawaban: { 'Cermin': 'Memantulkan', 'Kaca bening': 'Meneruskan', 'Tembok': 'Menyerap' } },
    ]
  },
  {
    unit_id: 'k5-ipas-02', unit_title: 'Harmoni dalam Ekosistem',
    soal: [
      { id: 'k5-ipas-02-01', tipe: 'choose', pertanyaan: 'Produsen dalam rantai makanan adalah...', pilihan: ['tumbuhan', 'harimau', 'rusa'], jawaban: 'tumbuhan' },
      { id: 'k5-ipas-02-02', tipe: 'fill', pertanyaan: 'Simbiosis mutualisme menguntungkan _____ pihak.', pilihan: ['kedua', 'satu', 'tidak ada'], jawaban: 'kedua' },
      { id: 'k5-ipas-02-03', tipe: 'truefalse', pertanyaan: 'Lebah dan bunga menjalin simbiosis mutualisme.', jawaban: true },
      { id: 'k5-ipas-02-04', tipe: 'choose', pertanyaan: 'Jika kelinci punah, populasi rumput akan...', pilihan: ['bertambah', 'berkurang', 'tetap'], jawaban: 'bertambah' },
      { id: 'k5-ipas-02-05', tipe: 'match', pertanyaan: 'Cocokkan jenis simbiosis!', pasangan: { 'Kutu di rambut': 'Parasitisme', 'Lebah & bunga': 'Mutualisme', 'Ikan remora & hiu': 'Komensalisme' }, jawaban: { 'Kutu di rambut': 'Parasitisme', 'Lebah & bunga': 'Mutualisme', 'Ikan remora & hiu': 'Komensalisme' } },
    ]
  },
  {
    unit_id: 'k5-ipas-03', unit_title: 'Magnet, Listrik, dan Teknologi',
    soal: [
      { id: 'k5-ipas-03-01', tipe: 'choose', pertanyaan: 'Magnet hanya menarik benda yang mengandung...', pilihan: ['besi/logam feromagnetik', 'plastik', 'kayu'], jawaban: 'besi/logam feromagnetik' },
      { id: 'k5-ipas-03-02', tipe: 'fill', pertanyaan: 'Rangkaian listrik sederhana butuh baterai, kabel, dan _____.', pilihan: ['lampu', 'kertas', 'kayu'], jawaban: 'lampu' },
      { id: 'k5-ipas-03-03', tipe: 'choose', pertanyaan: 'Kutub senama magnet akan...', pilihan: ['tolak-menolak', 'tarik-menarik', 'diam'], jawaban: 'tolak-menolak' },
      { id: 'k5-ipas-03-04', tipe: 'truefalse', pertanyaan: 'Matahari adalah sumber energi terbesar di bumi.', jawaban: true },
      { id: 'k5-ipas-03-05', tipe: 'match', pertanyaan: 'Cocokkan lapisan bumi!', pasangan: { 'Kerak': 'Lapisan paling luar', 'Mantel': 'Lapisan tengah', 'Inti': 'Lapisan paling dalam' }, jawaban: { 'Kerak': 'Lapisan paling luar', 'Mantel': 'Lapisan tengah', 'Inti': 'Lapisan paling dalam' } },
    ]
  },
  {
    unit_id: 'k5-ipas-04', unit_title: 'Ayo Berkenalan dengan Bumi Kita',
    soal: [
      { id: 'k5-ipas-04-01', tipe: 'choose', pertanyaan: 'Bumi terdiri dari berapa lapisan utama?', pilihan: ['3', '4', '5'], jawaban: '3' },
      { id: 'k5-ipas-04-02', tipe: 'truefalse', pertanyaan: 'Tsunami dapat terjadi akibat gempa di dasar laut.', jawaban: true },
      { id: 'k5-ipas-04-03', tipe: 'fill', pertanyaan: 'Indonesia banyak gunung berapi karena berada di _____ Pasifik.', pilihan: ['Cincin Api', 'Laut Tengah', 'Palung Dalam'], jawaban: 'Cincin Api' },
      { id: 'k5-ipas-04-04', tipe: 'choose', pertanyaan: 'Lempeng tektonik yang bergerak dapat menyebabkan...', pilihan: ['gempa dan gunung berapi', 'hujan', 'angin topan'], jawaban: 'gempa dan gunung berapi' },
      { id: 'k5-ipas-04-05', tipe: 'match', pertanyaan: 'Cocokkan lapisan bumi dengan isinya!', pasangan: { 'Kerak': 'Batuan keras', 'Mantel': 'Batuan cair (magma)', 'Inti': 'Besi & nikel' }, jawaban: { 'Kerak': 'Batuan keras', 'Mantel': 'Batuan cair (magma)', 'Inti': 'Besi & nikel' } },
    ]
  },
  {
    unit_id: 'k5-ipas-05', unit_title: 'Bagaimana Kita Hidup dan Bertumbuh',
    soal: [
      { id: 'k5-ipas-05-01', tipe: 'choose', pertanyaan: 'Organ yang memompa darah ke seluruh tubuh adalah...', pilihan: ['jantung', 'paru-paru', 'hati'], jawaban: 'jantung' },
      { id: 'k5-ipas-05-02', tipe: 'fill', pertanyaan: 'Proses pernapasan menggunakan organ _____.', pilihan: ['paru-paru', 'jantung', 'lambung'], jawaban: 'paru-paru' },
      { id: 'k5-ipas-05-03', tipe: 'truefalse', pertanyaan: 'Sistem pencernaan dimulai dari mulut.', jawaban: true },
      { id: 'k5-ipas-05-04', tipe: 'choose', pertanyaan: 'Vitamin C banyak terdapat pada...', pilihan: ['jeruk dan sayuran', 'nasi', 'daging sapi'], jawaban: 'jeruk dan sayuran' },
      { id: 'k5-ipas-05-05', tipe: 'match', pertanyaan: 'Cocokkan organ dengan fungsinya!', pasangan: { 'Jantung': 'Memompa darah', 'Paru-paru': 'Pernapasan', 'Lambung': 'Mencerna makanan' }, jawaban: { 'Jantung': 'Memompa darah', 'Paru-paru': 'Pernapasan', 'Lambung': 'Mencerna makanan' } },
    ]
  },
];

// ============ K6 IPAS — 8 unit × 5 soal = 40 ============
const k6Units = [
  {
    unit_id: 'k6-ipas-01', unit_title: 'Bagaimana Tubuh Kita Bergerak?',
    soal: [
      { id: 'k6-ipas-01-01', tipe: 'choose', pertanyaan: 'Jumlah tulang pada tubuh orang dewasa sekitar...', pilihan: ['206', '106', '306', '406'], jawaban: '206' },
      { id: 'k6-ipas-01-02', tipe: 'fill', pertanyaan: 'Otot bekerja dengan cara _____ dan relaksasi.', pilihan: ['kontraksi', 'pertumbuhan', 'pembelahan', 'fotosintesis'], jawaban: 'kontraksi' },
      { id: 'k6-ipas-01-03', tipe: 'truefalse', pertanyaan: 'Persendian menghubungkan antara dua tulang.', jawaban: true },
      { id: 'k6-ipas-01-04', tipe: 'choose', pertanyaan: 'Tulang rusuk berfungsi melindungi...', pilihan: ['jantung dan paru-paru', 'otak', 'lambung dan usus', 'ginjal'], jawaban: 'jantung dan paru-paru' },
      { id: 'k6-ipas-01-05', tipe: 'match', pertanyaan: 'Cocokkan jenis sendi!', pasangan: { 'Sendi engsel': 'Siku & lutut', 'Sendi peluru': 'Bahu & pinggul', 'Sendi putar': 'Leher' }, jawaban: { 'Sendi engsel': 'Siku & lutut', 'Sendi peluru': 'Bahu & pinggul', 'Sendi putar': 'Leher' } },
    ]
  },
  {
    unit_id: 'k6-ipas-02', unit_title: 'Cerita tentang Indonesia Kita',
    soal: [
      { id: 'k6-ipas-02-01', tipe: 'choose', pertanyaan: 'Proklamasi kemerdekaan Indonesia dibacakan oleh...', pilihan: ['Soekarno-Hatta', 'Sudirman', 'Diponegoro', 'Kartini'], jawaban: 'Soekarno-Hatta' },
      { id: 'k6-ipas-02-02', tipe: 'fill', pertanyaan: 'Kemerdekaan Indonesia diproklamasikan pada _____ Agustus 1945.', pilihan: ['17', '16', '18', '19'], jawaban: '17' },
      { id: 'k6-ipas-02-03', tipe: 'truefalse', pertanyaan: 'RA Kartini berjuang untuk pendidikan perempuan Indonesia.', jawaban: true },
      { id: 'k6-ipas-02-04', tipe: 'choose', pertanyaan: 'Dasar negara Indonesia adalah...', pilihan: ['Pancasila', 'UUD 1945', 'Bhinneka Tunggal Ika', 'GBHN'], jawaban: 'Pancasila' },
      { id: 'k6-ipas-02-05', tipe: 'match', pertanyaan: 'Cocokkan pahlawan dengan daerahnya!', pasangan: { 'Cut Nyak Dien': 'Aceh', 'Pattimura': 'Maluku', 'Diponegoro': 'Jawa' }, jawaban: { 'Cut Nyak Dien': 'Aceh', 'Pattimura': 'Maluku', 'Diponegoro': 'Jawa' } },
    ]
  },
  {
    unit_id: 'k6-ipas-03', unit_title: 'Pelesir Keliling Dunia',
    soal: [
      { id: 'k6-ipas-03-01', tipe: 'choose', pertanyaan: 'Jumlah benua di dunia adalah...', pilihan: ['7', '5', '6', '8'], jawaban: '7' },
      { id: 'k6-ipas-03-02', tipe: 'fill', pertanyaan: 'Ibu kota Jepang adalah _____.', pilihan: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'], jawaban: 'Tokyo' },
      { id: 'k6-ipas-03-03', tipe: 'truefalse', pertanyaan: 'Indonesia berada di Benua Asia.', jawaban: true },
      { id: 'k6-ipas-03-04', tipe: 'choose', pertanyaan: 'Benua terluas di dunia adalah...', pilihan: ['Asia', 'Afrika', 'Eropa', 'Amerika'], jawaban: 'Asia' },
      { id: 'k6-ipas-03-05', tipe: 'match', pertanyaan: 'Cocokkan negara dengan ibu kotanya!', pasangan: { 'Prancis': 'Paris', 'Mesir': 'Kairo', 'Brasil': 'Brasilia' }, jawaban: { 'Prancis': 'Paris', 'Mesir': 'Kairo', 'Brasil': 'Brasilia' } },
    ]
  },
  {
    unit_id: 'k6-ipas-04', unit_title: 'Indonesia dan Masyarakat Dunia',
    soal: [
      { id: 'k6-ipas-04-01', tipe: 'choose', pertanyaan: 'ASEAN adalah organisasi negara-negara di...', pilihan: ['Asia Tenggara', 'Asia Timur', 'Eropa', 'Afrika'], jawaban: 'Asia Tenggara' },
      { id: 'k6-ipas-04-02', tipe: 'fill', pertanyaan: 'PBB singkatan dari Perserikatan _____ Bangsa.', pilihan: ['Bangsa-', 'Bangsa', 'Negara-', 'Rakyat'], jawaban: 'Bangsa-' },
      { id: 'k6-ipas-04-03', tipe: 'truefalse', pertanyaan: 'Indonesia adalah anggota ASEAN dan PBB.', jawaban: true },
      { id: 'k6-ipas-04-04', tipe: 'choose', pertanyaan: 'Jumlah negara anggota ASEAN saat ini...', pilihan: ['10', '8', '12', '15'], jawaban: '10' },
      { id: 'k6-ipas-04-05', tipe: 'match', pertanyaan: 'Cocokkan organisasi dengan tujuannya!', pasangan: { 'ASEAN': 'Kerja sama Asia Tenggara', 'PBB': 'Perdamaian dunia', 'WHO': 'Kesehatan dunia' }, jawaban: { 'ASEAN': 'Kerja sama Asia Tenggara', 'PBB': 'Perdamaian dunia', 'WHO': 'Kesehatan dunia' } },
    ]
  },
  {
    unit_id: 'k6-ipas-05', unit_title: 'Menjelajahi Bumi dan Antariksa',
    soal: [
      { id: 'k6-ipas-05-01', tipe: 'choose', pertanyaan: 'Planet terbesar di tata surya adalah...', pilihan: ['Jupiter', 'Mars', 'Bumi', 'Venus'], jawaban: 'Jupiter' },
      { id: 'k6-ipas-05-02', tipe: 'fill', pertanyaan: 'Bumi memiliki _____ satelit alami.', pilihan: ['1', '2', '3', '0'], jawaban: '1' },
      { id: 'k6-ipas-05-03', tipe: 'choose', pertanyaan: 'Planet yang paling dekat dengan Matahari adalah...', pilihan: ['Merkurius', 'Venus', 'Bumi', 'Mars'], jawaban: 'Merkurius' },
      { id: 'k6-ipas-05-04', tipe: 'match', pertanyaan: 'Cocokkan bencana dengan penyebabnya!', pasangan: { 'Gempa bumi': 'Lempeng bertabrakan', 'Gunung berapi': 'Tekanan magma', 'Banjir': 'Hujan deras & deforestasi' }, jawaban: { 'Gempa bumi': 'Lempeng bertabrakan', 'Gunung berapi': 'Tekanan magma', 'Banjir': 'Hujan deras & deforestasi' } },
      { id: 'k6-ipas-05-05', tipe: 'truefalse', pertanyaan: 'Tata surya kita memiliki 8 planet.', jawaban: true },
    ]
  },
  {
    unit_id: 'k6-ipas-06', unit_title: 'Energi di Bumi akan Habis?',
    soal: [
      { id: 'k6-ipas-06-01', tipe: 'choose', pertanyaan: 'Energi terbarukan yang tidak akan habis adalah...', pilihan: ['matahari', 'minyak bumi', 'batu bara', 'gas alam'], jawaban: 'matahari' },
      { id: 'k6-ipas-06-02', tipe: 'fill', pertanyaan: 'Panel surya mengubah energi matahari menjadi energi _____.', pilihan: ['listrik', 'panas', 'gerak', 'kimia'], jawaban: 'listrik' },
      { id: 'k6-ipas-06-03', tipe: 'truefalse', pertanyaan: 'Batu bara termasuk energi tidak terbarukan.', jawaban: true },
      { id: 'k6-ipas-06-04', tipe: 'choose', pertanyaan: 'PLTA menghasilkan listrik dari energi...', pilihan: ['air', 'angin', 'matahari', 'panas bumi'], jawaban: 'air' },
      { id: 'k6-ipas-06-05', tipe: 'match', pertanyaan: 'Cocokkan energi dengan jenisnya!', pasangan: { 'Matahari': 'Terbarukan', 'Minyak bumi': 'Tak terbarukan', 'Angin': 'Terbarukan', 'Batu bara': 'Tak terbarukan' }, jawaban: { 'Matahari': 'Terbarukan', 'Minyak bumi': 'Tak terbarukan', 'Angin': 'Terbarukan', 'Batu bara': 'Tak terbarukan' } },
    ]
  },
  {
    unit_id: 'k6-ipas-07', unit_title: 'Bumi Kita Terancam Bahaya',
    soal: [
      { id: 'k6-ipas-07-01', tipe: 'choose', pertanyaan: 'Gas utama penyebab pemanasan global adalah...', pilihan: ['CO₂ (karbon dioksida)', 'O₂ (oksigen)', 'N₂ (nitrogen)', 'H₂ (hidrogen)'], jawaban: 'CO₂ (karbon dioksida)' },
      { id: 'k6-ipas-07-02', tipe: 'fill', pertanyaan: 'Penebangan hutan berlebihan disebut _____.', pilihan: ['deforestasi', 'irigasi', 'urbanisasi', 'industrialisasi'], jawaban: 'deforestasi' },
      { id: 'k6-ipas-07-03', tipe: 'truefalse', pertanyaan: 'Pemanasan global menyebabkan es kutub mencair.', jawaban: true },
      { id: 'k6-ipas-07-04', tipe: 'choose', pertanyaan: 'Cara terbaik mengurangi polusi udara di kota adalah...', pilihan: ['naik transportasi umum', 'bakar sampah', 'tambah pabrik', 'kurangi pohon'], jawaban: 'naik transportasi umum' },
      { id: 'k6-ipas-07-05', tipe: 'match', pertanyaan: 'Cocokkan masalah lingkungan dengan dampaknya!', pasangan: { 'Polusi udara': 'Penyakit pernapasan', 'Deforestasi': 'Banjir & erosi', 'Pemanasan global': 'Es kutub mencair' }, jawaban: { 'Polusi udara': 'Penyakit pernapasan', 'Deforestasi': 'Banjir & erosi', 'Pemanasan global': 'Es kutub mencair' } },
    ]
  },
  {
    unit_id: 'k6-ipas-08', unit_title: 'Proyek Akhir IPAS',
    soal: [
      { id: 'k6-ipas-08-01', tipe: 'choose', pertanyaan: 'Langkah pertama dalam metode ilmiah adalah...', pilihan: ['observasi/pengamatan', 'percobaan', 'kesimpulan', 'hipotesis'], jawaban: 'observasi/pengamatan' },
      { id: 'k6-ipas-08-02', tipe: 'fill', pertanyaan: 'Hipotesis adalah dugaan _____ sebelum percobaan.', pilihan: ['sementara', 'akhir', 'pasti', 'random'], jawaban: 'sementara' },
      { id: 'k6-ipas-08-03', tipe: 'truefalse', pertanyaan: 'Data percobaan harus dicatat apa adanya, tidak direkayasa.', jawaban: true },
      { id: 'k6-ipas-08-04', tipe: 'choose', pertanyaan: 'Kompos organik dibuat dari...', pilihan: ['sampah daun/sisa makanan', 'plastik', 'logam', 'kaca'], jawaban: 'sampah daun/sisa makanan' },
      { id: 'k6-ipas-08-05', tipe: 'match', pertanyaan: 'Cocokkan tahap metode ilmiah!', pasangan: { '1. Observasi': 'Amati masalah', '2. Hipotesis': 'Dugaan sementara', '3. Percobaan': 'Uji hipotesis' }, jawaban: { '1. Observasi': 'Amati masalah', '2. Hipotesis': 'Dugaan sementara', '3. Percobaan': 'Uji hipotesis' } },
    ]
  },
];

// Write files
const datasets = [
  { kelas: 3, units: k3Units, filename: 'bank-soal-ipas-k3.json' },
  { kelas: 4, units: k4Units, filename: 'bank-soal-ipas-k4.json' },
  { kelas: 5, units: k5Units, filename: 'bank-soal-ipas-k5.json' },
  { kelas: 6, units: k6Units, filename: 'bank-soal-ipas-k6.json' },
];

for (const { kelas, units, filename } of datasets) {
  const total = units.reduce((sum, u) => sum + u.soal.length, 0);
  const out = { kelas, pelajaran: 'ipas', total_soal: total, units };
  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(out, null, 2), 'utf8');
  console.log(`Wrote ${filename} — ${total} soal`);
}

console.log('Done: bank soal IPAS K3/K4/K5/K6 generated.');
