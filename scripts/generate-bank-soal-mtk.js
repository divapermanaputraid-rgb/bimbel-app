// generate-bank-soal-mtk.js
// Generates bank soal MTK: K1 (54), K2 (100), K3 (72), K6 (90) = 316 total
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ============ K1 MTK — 18 unit × 3 soal = 54 ============
const k1Units = [
  { id:'k1-mtk-01', title:'Mengenal Bilangan 1–5', soal:[
    {tipe:'choose', pertanyaan:'Ada berapa 🍎? 🍎🍎🍎', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'fill', pertanyaan:'Lengkapi: 1, 2, ___, 4, 5', pilihan:['2','3','6'], jawaban:'3'},
    {tipe:'truefalse', pertanyaan:'4 lebih besar dari 2.', jawaban:true},
  ]},
  { id:'k1-mtk-02', title:'Mengenal Bilangan 6–10', soal:[
    {tipe:'choose', pertanyaan:'Berapa jumlah 🐟🐟🐟🐟🐟🐟🐟?', pilihan:['6','7','8'], jawaban:'7'},
    {tipe:'fill', pertanyaan:'Lengkapi: 6, 7, ___, 9, 10', pilihan:['7','8','11'], jawaban:'8'},
    {tipe:'truefalse', pertanyaan:'10 lebih besar dari 9.', jawaban:true},
  ]},
  { id:'k1-mtk-03', title:'Pasangan Bilangan', soal:[
    {tipe:'choose', pertanyaan:'Pasangan 3 supaya jadi 5 adalah...', pilihan:['1','2','3'], jawaban:'2'},
    {tipe:'fill', pertanyaan:'4 + ___ = 5', pilihan:['0','1','2'], jawaban:'1'},
    {tipe:'truefalse', pertanyaan:'2 + 3 = 5.', jawaban:true},
  ]},
  { id:'k1-mtk-04', title:'Membandingkan Bilangan', soal:[
    {tipe:'choose', pertanyaan:'Mana yang LEBIH BESAR: 7 atau 3?', pilihan:['7','3','sama'], jawaban:'7'},
    {tipe:'fill', pertanyaan:'5 ___ 8 (isi: < atau >)', pilihan:['<','>','='], jawaban:'<'},
    {tipe:'truefalse', pertanyaan:'6 lebih kecil dari 9.', jawaban:true},
  ]},
  { id:'k1-mtk-05', title:'Cerita Penjumlahan', soal:[
    {tipe:'choose', pertanyaan:'Upe punya 3 apel 🍎. Dapat lagi 2. Total?', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'fill', pertanyaan:'2 + 4 = ___', pilihan:['5','6','7'], jawaban:'6'},
    {tipe:'truefalse', pertanyaan:'3 + 3 = 6.', jawaban:true},
  ]},
  { id:'k1-mtk-06', title:'Cara Menjumlahkan', soal:[
    {tipe:'choose', pertanyaan:'4 + 5 = ?', pilihan:['8','9','10'], jawaban:'9'},
    {tipe:'fill', pertanyaan:'___ + 3 = 7', pilihan:['3','4','5'], jawaban:'4'},
    {tipe:'truefalse', pertanyaan:'5 + 0 = 5.', jawaban:true},
  ]},
  { id:'k1-mtk-07', title:'Cerita Pengurangan', soal:[
    {tipe:'choose', pertanyaan:'Ada 8 🍪, dimakan 3. Sisa?', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'fill', pertanyaan:'9 - 4 = ___', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'truefalse', pertanyaan:'7 - 2 = 5.', jawaban:true},
  ]},
  { id:'k1-mtk-08', title:'Cara Mengurangi', soal:[
    {tipe:'choose', pertanyaan:'10 - 6 = ?', pilihan:['3','4','5'], jawaban:'4'},
    {tipe:'fill', pertanyaan:'8 - ___ = 3', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'truefalse', pertanyaan:'6 - 6 = 0.', jawaban:true},
  ]},
  { id:'k1-mtk-09', title:'Bangun Datar di Sekitar Kita', soal:[
    {tipe:'choose', pertanyaan:'Berapa sudut pada segitiga?', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'fill', pertanyaan:'Persegi punya ___ sisi.', pilihan:['3','4','5'], jawaban:'4'},
    {tipe:'truefalse', pertanyaan:'Lingkaran tidak punya sudut.', jawaban:true},
  ]},
  { id:'k1-mtk-10', title:'Mengelompokkan Benda', soal:[
    {tipe:'choose', pertanyaan:'Bola, kelereng, ember — dikelompokkan berdasarkan...', pilihan:['bentuk bulat','warna','ukuran'], jawaban:'bentuk bulat'},
    {tipe:'fill', pertanyaan:'Mengelompokkan benda = melihat ___ yang sama.', pilihan:['ciri','nama','nomor'], jawaban:'ciri'},
    {tipe:'truefalse', pertanyaan:'Benda bisa dikelompokkan berdasarkan warna.', jawaban:true},
  ]},
  { id:'k1-mtk-11', title:'Bilangan 11–15', soal:[
    {tipe:'choose', pertanyaan:'12 = 1 puluhan + berapa satuan?', pilihan:['1','2','3'], jawaban:'2'},
    {tipe:'fill', pertanyaan:'Setelah 13 adalah ___', pilihan:['12','14','15'], jawaban:'14'},
    {tipe:'truefalse', pertanyaan:'15 lebih besar dari 11.', jawaban:true},
  ]},
  { id:'k1-mtk-12', title:'Bilangan 16–20', soal:[
    {tipe:'choose', pertanyaan:'20 = ___ puluhan + 0 satuan', pilihan:['1','2','3'], jawaban:'2'},
    {tipe:'fill', pertanyaan:'Sebelum 18 adalah ___', pilihan:['16','17','19'], jawaban:'17'},
    {tipe:'truefalse', pertanyaan:'19 < 20.', jawaban:true},
  ]},
  { id:'k1-mtk-13', title:'Penjumlahan sampai 20', soal:[
    {tipe:'choose', pertanyaan:'12 + 5 = ?', pilihan:['16','17','18'], jawaban:'17'},
    {tipe:'fill', pertanyaan:'___ + 6 = 14', pilihan:['7','8','9'], jawaban:'8'},
    {tipe:'truefalse', pertanyaan:'10 + 10 = 20.', jawaban:true},
  ]},
  { id:'k1-mtk-14', title:'Pengurangan sampai 20', soal:[
    {tipe:'choose', pertanyaan:'18 - 5 = ?', pilihan:['12','13','14'], jawaban:'13'},
    {tipe:'fill', pertanyaan:'20 - ___ = 12', pilihan:['7','8','9'], jawaban:'8'},
    {tipe:'truefalse', pertanyaan:'15 - 5 = 10.', jawaban:true},
  ]},
  { id:'k1-mtk-15', title:'Lebih, Kurang, dan Selisih', soal:[
    {tipe:'choose', pertanyaan:'Selisih 14 dan 9 adalah...', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'fill', pertanyaan:'16 - 9 = ___', pilihan:['6','7','8'], jawaban:'7'},
    {tipe:'truefalse', pertanyaan:'Selisih 10 dan 6 adalah 4.', jawaban:true},
  ]},
  { id:'k1-mtk-16', title:'Membandingkan Panjang Benda', soal:[
    {tipe:'choose', pertanyaan:'Pensil lebih panjang dari penghapus. Penghapus lebih...', pilihan:['pendek','panjang','sama'], jawaban:'pendek'},
    {tipe:'fill', pertanyaan:'Buku ___ dari pensil. (gunakan: lebih panjang / lebih pendek)', pilihan:['lebih panjang','lebih pendek','sama dengan'], jawaban:'lebih panjang'},
    {tipe:'truefalse', pertanyaan:'Penggaris 30 cm lebih panjang dari pensil 15 cm.', jawaban:true},
  ]},
  { id:'k1-mtk-17', title:'Mengukur dengan Benda Tidak Baku', soal:[
    {tipe:'choose', pertanyaan:'Meja diukur dengan jengkal = 10 jengkal. Kursi = 6 jengkal. Mana lebih panjang?', pilihan:['meja','kursi','sama'], jawaban:'meja'},
    {tipe:'fill', pertanyaan:'Mengukur dengan jengkal disebut pengukuran ___.', pilihan:['tidak baku','baku','tepat'], jawaban:'tidak baku'},
    {tipe:'truefalse', pertanyaan:'Penggaris adalah alat ukur baku.', jawaban:true},
  ]},
  { id:'k1-mtk-18', title:'Mengelompokkan Data dan Diagram Gambar', soal:[
    {tipe:'choose', pertanyaan:'Dari 10 siswa: 4 suka bola, 6 suka lari. Mana paling banyak?', pilihan:['bola','lari','sama'], jawaban:'lari'},
    {tipe:'fill', pertanyaan:'Diagram gambar menggunakan ___ untuk mewakili data.', pilihan:['gambar/simbol','angka saja','huruf saja'], jawaban:'gambar/simbol'},
    {tipe:'truefalse', pertanyaan:'Tabel data membantu kita membandingkan informasi.', jawaban:true},
  ]},
];

// ============ K2 MTK — 20 unit × 5 soal = 100 ============
const k2Units = [
  { id:'k2-mtk-01', title:'Bermain dengan Bilangan 1–50', soal:[
    {tipe:'choose', pertanyaan:'35 = ___ puluhan + ___ satuan', pilihan:['3 puluhan 5 satuan','5 puluhan 3 satuan','3 puluhan 3 satuan'], jawaban:'3 puluhan 5 satuan'},
    {tipe:'fill', pertanyaan:'Bilangan setelah 49 adalah ___', pilihan:['48','50','51'], jawaban:'50'},
    {tipe:'choose', pertanyaan:'Mana yang TERBESAR: 42, 24, 34?', pilihan:['42','24','34'], jawaban:'42'},
    {tipe:'truefalse', pertanyaan:'28 < 30.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan!', pasangan:{'2 puluhan 3 satuan':'23','3 puluhan 1 satuan':'31','4 puluhan 0 satuan':'40'}, jawaban:{'2 puluhan 3 satuan':'23','3 puluhan 1 satuan':'31','4 puluhan 0 satuan':'40'}},
  ]},
  { id:'k2-mtk-02', title:'Bilangan sampai 100', soal:[
    {tipe:'choose', pertanyaan:'100 = ___ puluhan', pilihan:['8','9','10'], jawaban:'10'},
    {tipe:'fill', pertanyaan:'75 = 7 puluhan + ___ satuan', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'choose', pertanyaan:'Bilangan ganjil di antara 60 dan 65 adalah...', pilihan:['62','61','64'], jawaban:'61'},
    {tipe:'truefalse', pertanyaan:'80 > 79.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan nilai tempat!', pasangan:{'6 pada 62':'puluhan','2 pada 62':'satuan','1 pada 100':'ratusan'}, jawaban:{'6 pada 62':'puluhan','2 pada 62':'satuan','1 pada 100':'ratusan'}},
  ]},
  { id:'k2-mtk-03', title:'Penjumlahan dua angka', soal:[
    {tipe:'choose', pertanyaan:'25 + 13 = ?', pilihan:['37','38','39'], jawaban:'38'},
    {tipe:'fill', pertanyaan:'30 + ___ = 47', pilihan:['15','16','17'], jawaban:'17'},
    {tipe:'choose', pertanyaan:'Anton punya 12 kelereng. Budi kasih 9. Total?', pilihan:['20','21','22'], jawaban:'21'},
    {tipe:'truefalse', pertanyaan:'8 + 5 = 5 + 8 (sifat komutatif).', jawaban:true},
    {tipe:'fill', pertanyaan:'___ + 24 = 50', pilihan:['24','25','26'], jawaban:'26'},
  ]},
  { id:'k2-mtk-04', title:'Pengurangan dua angka', soal:[
    {tipe:'choose', pertanyaan:'45 - 18 = ?', pilihan:['26','27','28'], jawaban:'27'},
    {tipe:'fill', pertanyaan:'60 - ___ = 35', pilihan:['24','25','26'], jawaban:'25'},
    {tipe:'choose', pertanyaan:'Di keranjang ada 30 apel. Diambil 13. Sisa?', pilihan:['16','17','18'], jawaban:'17'},
    {tipe:'truefalse', pertanyaan:'40 - 15 = 25.', jawaban:true},
    {tipe:'fill', pertanyaan:'___ - 22 = 18', pilihan:['38','40','42'], jawaban:'40'},
  ]},
  { id:'k2-mtk-05', title:'Penjumlahan dengan simpan', soal:[
    {tipe:'choose', pertanyaan:'37 + 25 = ?', pilihan:['61','62','63'], jawaban:'62'},
    {tipe:'fill', pertanyaan:'48 + ___ = 73', pilihan:['23','24','25'], jawaban:'25'},
    {tipe:'choose', pertanyaan:'55 + 28 = ?', pilihan:['82','83','84'], jawaban:'83'},
    {tipe:'truefalse', pertanyaan:'39 + 41 = 80.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan hasil penjumlahan!', pasangan:{'17 + 15':'32','28 + 14':'42','35 + 27':'62'}, jawaban:{'17 + 15':'32','28 + 14':'42','35 + 27':'62'}},
  ]},
  { id:'k2-mtk-06', title:'Pengurangan dengan meminjam', soal:[
    {tipe:'choose', pertanyaan:'53 - 27 = ?', pilihan:['25','26','27'], jawaban:'26'},
    {tipe:'fill', pertanyaan:'70 - ___ = 43', pilihan:['26','27','28'], jawaban:'27'},
    {tipe:'choose', pertanyaan:'82 - 46 = ?', pilihan:['35','36','37'], jawaban:'36'},
    {tipe:'truefalse', pertanyaan:'61 - 35 = 26.', jawaban:true},
    {tipe:'fill', pertanyaan:'___ - 38 = 24', pilihan:['60','61','62'], jawaban:'62'},
  ]},
  { id:'k2-mtk-07', title:'Perkalian dasar', soal:[
    {tipe:'choose', pertanyaan:'3 × 4 = ?', pilihan:['10','11','12'], jawaban:'12'},
    {tipe:'fill', pertanyaan:'5 × ___ = 25', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'choose', pertanyaan:'Ada 4 piring, tiap piring 6 kue. Total?', pilihan:['22','24','26'], jawaban:'24'},
    {tipe:'truefalse', pertanyaan:'2 × 9 = 18.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan perkalian!', pasangan:{'3 × 3':'9','4 × 5':'20','6 × 2':'12'}, jawaban:{'3 × 3':'9','4 × 5':'20','6 × 2':'12'}},
  ]},
  { id:'k2-mtk-08', title:'Pembagian dasar', soal:[
    {tipe:'choose', pertanyaan:'12 ÷ 4 = ?', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'fill', pertanyaan:'20 ÷ ___ = 4', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'choose', pertanyaan:'18 kue dibagi 6 anak sama rata. Tiap anak dapat?', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'truefalse', pertanyaan:'15 ÷ 3 = 5.', jawaban:true},
    {tipe:'fill', pertanyaan:'24 ÷ ___ = 8', pilihan:['2','3','4'], jawaban:'3'},
  ]},
  { id:'k2-mtk-09', title:'Bangun Datar', soal:[
    {tipe:'choose', pertanyaan:'Persegi panjang punya berapa sisi?', pilihan:['3','4','5'], jawaban:'4'},
    {tipe:'fill', pertanyaan:'Segitiga punya ___ sudut.', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'choose', pertanyaan:'Bangun datar dengan semua sisi sama panjang dan 4 sudut...', pilihan:['persegi','persegi panjang','segitiga'], jawaban:'persegi'},
    {tipe:'truefalse', pertanyaan:'Lingkaran tidak punya sudut.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan bangun dengan jumlah sisinya!', pasangan:{'Segitiga':'3','Persegi':'4','Segilima':'5'}, jawaban:{'Segitiga':'3','Persegi':'4','Segilima':'5'}},
  ]},
  { id:'k2-mtk-10', title:'Bangun Ruang', soal:[
    {tipe:'choose', pertanyaan:'Bola es krim berbentuk...', pilihan:['kubus','bola','tabung'], jawaban:'bola'},
    {tipe:'fill', pertanyaan:'Kubus punya ___ sisi.', pilihan:['4','6','8'], jawaban:'6'},
    {tipe:'choose', pertanyaan:'Kaleng susu berbentuk...', pilihan:['kubus','bola','tabung'], jawaban:'tabung'},
    {tipe:'truefalse', pertanyaan:'Kotak hadiah berbentuk balok.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan benda dengan bentuknya!', pasangan:{'Dadu':'Kubus','Kelereng':'Bola','Topi ulang tahun':'Kerucut'}, jawaban:{'Dadu':'Kubus','Kelereng':'Bola','Topi ulang tahun':'Kerucut'}},
  ]},
  { id:'k2-mtk-11', title:'Pengukuran Panjang', soal:[
    {tipe:'choose', pertanyaan:'Satuan panjang yang paling umum dipakai...', pilihan:['cm','kg','liter'], jawaban:'cm'},
    {tipe:'fill', pertanyaan:'1 meter = ___ cm', pilihan:['10','100','1000'], jawaban:'100'},
    {tipe:'choose', pertanyaan:'Meja panjangnya 120 cm = ___ meter lebih 20 cm', pilihan:['0','1','2'], jawaban:'1'},
    {tipe:'truefalse', pertanyaan:'Jengkal adalah satuan tidak baku.', jawaban:true},
    {tipe:'fill', pertanyaan:'200 cm = ___ m', pilihan:['1','2','3'], jawaban:'2'},
  ]},
  { id:'k2-mtk-12', title:'Pengukuran Berat', soal:[
    {tipe:'choose', pertanyaan:'Satuan berat yang umum...', pilihan:['cm','kg','liter'], jawaban:'kg'},
    {tipe:'fill', pertanyaan:'1 kg = ___ gram', pilihan:['10','100','1000'], jawaban:'1000'},
    {tipe:'choose', pertanyaan:'Buku 500 gram + pensil 200 gram = ?', pilihan:['600 gram','700 gram','800 gram'], jawaban:'700 gram'},
    {tipe:'truefalse', pertanyaan:'1 kg lebih berat dari 900 gram.', jawaban:true},
    {tipe:'fill', pertanyaan:'2000 gram = ___ kg', pilihan:['1','2','3'], jawaban:'2'},
  ]},
  { id:'k2-mtk-13', title:'Pengukuran Volume', soal:[
    {tipe:'choose', pertanyaan:'Satuan volume cairan...', pilihan:['cm','kg','liter'], jawaban:'liter'},
    {tipe:'fill', pertanyaan:'1 liter = ___ mililiter', pilihan:['10','100','1000'], jawaban:'1000'},
    {tipe:'choose', pertanyaan:'Ember 5 liter + ember 3 liter = ?', pilihan:['6 liter','7 liter','8 liter'], jawaban:'8 liter'},
    {tipe:'truefalse', pertanyaan:'500 mL = 0,5 liter.', jawaban:true},
    {tipe:'fill', pertanyaan:'2 liter = ___ mL', pilihan:['200','2000','20000'], jawaban:'2000'},
  ]},
  { id:'k2-mtk-14', title:'Mengenal Uang', soal:[
    {tipe:'choose', pertanyaan:'Uang kertas Rp5.000 + koin Rp500 = ?', pilihan:['Rp5.000','Rp5.500','Rp6.000'], jawaban:'Rp5.500'},
    {tipe:'fill', pertanyaan:'Beli buku Rp3.000 bayar Rp5.000. Kembalian ___', pilihan:['Rp1.000','Rp2.000','Rp3.000'], jawaban:'Rp2.000'},
    {tipe:'choose', pertanyaan:'Ibu punya Rp10.000. Beli sayur Rp4.500. Sisa?', pilihan:['Rp5.000','Rp5.500','Rp6.000'], jawaban:'Rp5.500'},
    {tipe:'truefalse', pertanyaan:'Rp7.000 lebih dari Rp6.500.', jawaban:true},
    {tipe:'fill', pertanyaan:'2 × Rp2.500 = Rp ___', pilihan:['4000','5000','6000'], jawaban:'5000'},
  ]},
  { id:'k2-mtk-15', title:'Waktu dan Jam', soal:[
    {tipe:'choose', pertanyaan:'1 jam = ___ menit', pilihan:['30','60','120'], jawaban:'60'},
    {tipe:'fill', pertanyaan:'Pukul 08.00 + 2 jam = pukul ___', pilihan:['09.00','10.00','11.00'], jawaban:'10.00'},
    {tipe:'choose', pertanyaan:'Sekolah mulai 07.00 dan selesai 12.00. Berapa jam?', pilihan:['4','5','6'], jawaban:'5'},
    {tipe:'truefalse', pertanyaan:'Setengah jam = 30 menit.', jawaban:true},
    {tipe:'fill', pertanyaan:'1 hari = ___ jam', pilihan:['12','24','48'], jawaban:'24'},
  ]},
  { id:'k2-mtk-16', title:'Data dan Tabel Sederhana', soal:[
    {tipe:'choose', pertanyaan:'Dari tabel: Apel 8, Pisang 5, Jeruk 7. Buah paling sedikit?', pilihan:['Apel','Pisang','Jeruk'], jawaban:'Pisang'},
    {tipe:'fill', pertanyaan:'Jumlah total: Apel 8 + Pisang 5 + Jeruk 7 = ___', pilihan:['18','19','20'], jawaban:'20'},
    {tipe:'choose', pertanyaan:'Berapa lebih banyak Apel dari Pisang?', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'truefalse', pertanyaan:'Tabel membantu membaca data dengan lebih mudah.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan data dengan nilai!', pasangan:{'Apel':'8','Pisang':'5','Jeruk':'7'}, jawaban:{'Apel':'8','Pisang':'5','Jeruk':'7'}},
  ]},
  { id:'k2-mtk-17', title:'Diagram Batang', soal:[
    {tipe:'choose', pertanyaan:'Diagram batang menunjukkan data dengan menggunakan...', pilihan:['batang/balok','titik','garis saja'], jawaban:'batang/balok'},
    {tipe:'fill', pertanyaan:'Sumbu tegak (Y) biasanya menunjukkan ___.', pilihan:['nilai/jumlah','nama','warna'], jawaban:'nilai/jumlah'},
    {tipe:'choose', pertanyaan:'Batang paling tinggi mewakili data...', pilihan:['terkecil','terbesar','sama'], jawaban:'terbesar'},
    {tipe:'truefalse', pertanyaan:'Diagram batang cocok untuk membandingkan beberapa kategori.', jawaban:true},
    {tipe:'fill', pertanyaan:'Sumbu mendatar (X) biasanya menunjukkan ___.', pilihan:['kategori/nama','nilai','warna'], jawaban:'kategori/nama'},
  ]},
  { id:'k2-mtk-18', title:'Sifat-sifat Operasi Hitung', soal:[
    {tipe:'choose', pertanyaan:'Sifat komutatif: 5 + 3 = 3 + ___', pilihan:['5','6','7'], jawaban:'5'},
    {tipe:'fill', pertanyaan:'Sifat asosiatif: (2+3)+4 = 2+(3+___)=9', pilihan:['3','4','5'], jawaban:'4'},
    {tipe:'choose', pertanyaan:'0 + 7 = ?', pilihan:['0','7','1'], jawaban:'7'},
    {tipe:'truefalse', pertanyaan:'a + b = b + a adalah sifat komutatif.', jawaban:true},
    {tipe:'fill', pertanyaan:'Bilangan yang ditambah 0 hasilnya tetap ___', pilihan:['berubah','0','sama'], jawaban:'sama'},
  ]},
  { id:'k2-mtk-19', title:'Pola Bilangan', soal:[
    {tipe:'choose', pertanyaan:'Pola: 2, 4, 6, 8, ___', pilihan:['9','10','11'], jawaban:'10'},
    {tipe:'fill', pertanyaan:'Pola: 1, 4, 7, 10, ___', pilihan:['12','13','14'], jawaban:'13'},
    {tipe:'choose', pertanyaan:'Pola: 20, 17, 14, 11, ___', pilihan:['7','8','9'], jawaban:'8'},
    {tipe:'truefalse', pertanyaan:'5, 10, 15, 20 adalah pola bilangan kelipatan 5.', jawaban:true},
    {tipe:'fill', pertanyaan:'Pola ganjil: 1, 3, 5, 7, ___', pilihan:['8','9','10'], jawaban:'9'},
  ]},
  { id:'k2-mtk-20', title:'Bilangan Ganjil dan Genap', soal:[
    {tipe:'choose', pertanyaan:'Mana yang termasuk bilangan genap?', pilihan:['13','14','15'], jawaban:'14'},
    {tipe:'fill', pertanyaan:'Bilangan ganjil antara 10 dan 14 adalah 11 dan ___', pilihan:['12','13','14'], jawaban:'13'},
    {tipe:'choose', pertanyaan:'34 + 16 = ___ (ganjil/genap?)', pilihan:['ganjil','genap','nol'], jawaban:'genap'},
    {tipe:'truefalse', pertanyaan:'Bilangan genap selalu habis dibagi 2.', jawaban:true},
    {tipe:'match', pertanyaan:'Kelompokkan!', pasangan:{'12':'genap','17':'ganjil','20':'genap'}, jawaban:{'12':'genap','17':'ganjil','20':'genap'}},
  ]},
];

// ============ K3 MTK — 18 unit × 4 soal = 72 ============
const k3Units = [
  { id:'k3-mtk-01', title:'Bilangan sampai 1.000', soal:[
    {tipe:'choose', pertanyaan:'345 = ___ ratusan + 4 puluhan + 5 satuan', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'fill', pertanyaan:'700 + 50 + 8 = ___', pilihan:['758','785','875'], jawaban:'758'},
    {tipe:'choose', pertanyaan:'Mana terbesar: 678, 786, 687?', pilihan:['678','786','687'], jawaban:'786'},
    {tipe:'truefalse', pertanyaan:'1.000 = sepuluh ratusan.', jawaban:true},
  ]},
  { id:'k3-mtk-02', title:'Membandingkan dan Mengurutkan Bilangan', soal:[
    {tipe:'choose', pertanyaan:'Urutkan dari kecil: 534, 345, 453, 543', pilihan:['345, 453, 534, 543','543, 534, 453, 345','453, 345, 534, 543'], jawaban:'345, 453, 534, 543'},
    {tipe:'fill', pertanyaan:'567 ___ 576 (isi < atau >)', pilihan:['<','>','='], jawaban:'<'},
    {tipe:'choose', pertanyaan:'Di antara 400 dan 600, bilangan ratusan yang ada...', pilihan:['400, 500, 600','400, 500','300, 400, 500'], jawaban:'400, 500, 600'},
    {tipe:'truefalse', pertanyaan:'889 < 898.', jawaban:true},
  ]},
  { id:'k3-mtk-03', title:'Penjumlahan sampai 1.000', soal:[
    {tipe:'choose', pertanyaan:'254 + 135 = ?', pilihan:['378','389','389'], jawaban:'389'},
    {tipe:'fill', pertanyaan:'450 + ___ = 700', pilihan:['240','250','260'], jawaban:'250'},
    {tipe:'choose', pertanyaan:'365 + 248 = ?', pilihan:['612','613','614'], jawaban:'613'},
    {tipe:'truefalse', pertanyaan:'500 + 500 = 1.000.', jawaban:true},
  ]},
  { id:'k3-mtk-04', title:'Pengurangan sampai 1.000', soal:[
    {tipe:'choose', pertanyaan:'750 - 235 = ?', pilihan:['514','515','516'], jawaban:'515'},
    {tipe:'fill', pertanyaan:'900 - ___ = 450', pilihan:['440','450','460'], jawaban:'450'},
    {tipe:'choose', pertanyaan:'623 - 178 = ?', pilihan:['444','445','446'], jawaban:'445'},
    {tipe:'truefalse', pertanyaan:'1.000 - 250 = 750.', jawaban:true},
  ]},
  { id:'k3-mtk-05', title:'Perkalian Bilangan Cacah', soal:[
    {tipe:'choose', pertanyaan:'6 × 7 = ?', pilihan:['40','42','44'], jawaban:'42'},
    {tipe:'fill', pertanyaan:'___ × 8 = 56', pilihan:['6','7','8'], jawaban:'7'},
    {tipe:'choose', pertanyaan:'9 × 9 = ?', pilihan:['79','80','81'], jawaban:'81'},
    {tipe:'truefalse', pertanyaan:'4 × 6 = 6 × 4 (sifat komutatif).', jawaban:true},
  ]},
  { id:'k3-mtk-06', title:'Pembagian Bilangan Cacah', soal:[
    {tipe:'choose', pertanyaan:'54 ÷ 6 = ?', pilihan:['7','8','9'], jawaban:'9'},
    {tipe:'fill', pertanyaan:'___ ÷ 8 = 7', pilihan:['54','56','58'], jawaban:'56'},
    {tipe:'choose', pertanyaan:'Pak Guru bagi 24 buku ke 6 meja. Tiap meja?', pilihan:['3','4','6'], jawaban:'4'},
    {tipe:'truefalse', pertanyaan:'6 × 7 = 42 dan 42 ÷ 7 = 6 (hubungan perkalian-pembagian).', jawaban:true},
  ]},
  { id:'k3-mtk-07', title:'Kalimat Matematika Penjumlahan', soal:[
    {tipe:'choose', pertanyaan:'Di taman ada 35 pohon. Ditanam 27 pohon lagi. Kalimat matematika yang tepat?', pilihan:['35 - 27 = n','35 + 27 = n','35 × 27 = n'], jawaban:'35 + 27 = n'},
    {tipe:'fill', pertanyaan:'n + 15 = 40, maka n = ___', pilihan:['23','24','25'], jawaban:'25'},
    {tipe:'choose', pertanyaan:'Budi punya 48 kartu + 36 kartu. Total?', pilihan:['83','84','85'], jawaban:'84'},
    {tipe:'truefalse', pertanyaan:'Kalimat matematika membantu memecahkan soal cerita.', jawaban:true},
  ]},
  { id:'k3-mtk-08', title:'Kalimat Matematika Pengurangan', soal:[
    {tipe:'choose', pertanyaan:'Di kotak ada 56 kue. Dimakan 23. Sisa?', pilihan:['32','33','34'], jawaban:'33'},
    {tipe:'fill', pertanyaan:'80 - n = 45, maka n = ___', pilihan:['34','35','36'], jawaban:'35'},
    {tipe:'choose', pertanyaan:'Ibu punya 120 telur. Dijual 75. Sisa?', pilihan:['44','45','46'], jawaban:'45'},
    {tipe:'truefalse', pertanyaan:'200 - 75 = 125.', jawaban:true},
  ]},
  { id:'k3-mtk-09', title:'Kalimat Matematika Perkalian', soal:[
    {tipe:'choose', pertanyaan:'5 kotak, tiap kotak 8 buku. Total?', pilihan:['38','40','42'], jawaban:'40'},
    {tipe:'fill', pertanyaan:'7 × n = 63, maka n = ___', pilihan:['7','8','9'], jawaban:'9'},
    {tipe:'choose', pertanyaan:'Pak Amir punya 4 kebun. Tiap kebun 25 pohon. Total?', pilihan:['98','99','100'], jawaban:'100'},
    {tipe:'truefalse', pertanyaan:'3 × 12 = 36.', jawaban:true},
  ]},
  { id:'k3-mtk-10', title:'Kalimat Matematika Pembagian', soal:[
    {tipe:'choose', pertanyaan:'72 bola dibagi 8 kelompok. Tiap kelompok?', pilihan:['7','8','9'], jawaban:'9'},
    {tipe:'fill', pertanyaan:'n ÷ 6 = 12, maka n = ___', pilihan:['60','70','72'], jawaban:'72'},
    {tipe:'choose', pertanyaan:'96 siswa dibagi ke 8 kelas sama rata. Tiap kelas?', pilihan:['10','11','12'], jawaban:'12'},
    {tipe:'truefalse', pertanyaan:'45 ÷ 9 = 5.', jawaban:true},
  ]},
  { id:'k3-mtk-11', title:'Kelipatan dan Faktor', soal:[
    {tipe:'choose', pertanyaan:'Kelipatan 4 yang kurang dari 20 adalah...', pilihan:['4, 8, 12, 16','4, 8, 12, 16, 20','2, 4, 8, 12'], jawaban:'4, 8, 12, 16'},
    {tipe:'fill', pertanyaan:'Faktor dari 12 antara lain: 1, 2, 3, 4, ___, 12', pilihan:['5','6','7'], jawaban:'6'},
    {tipe:'choose', pertanyaan:'Kelipatan persekutuan terkecil (KPK) dari 2 dan 3 adalah...', pilihan:['4','5','6'], jawaban:'6'},
    {tipe:'truefalse', pertanyaan:'8 adalah faktor dari 24.', jawaban:true},
  ]},
  { id:'k3-mtk-12', title:'Pecahan Sederhana', soal:[
    {tipe:'choose', pertanyaan:'1/2 = berapa bagian dari 4 bagian sama?', pilihan:['1','2','3'], jawaban:'2'},
    {tipe:'fill', pertanyaan:'3/4 + 1/4 = ___', pilihan:['3/4','4/4','1/4'], jawaban:'4/4'},
    {tipe:'choose', pertanyaan:'Mana yang lebih besar: 2/3 atau 1/3?', pilihan:['2/3','1/3','sama'], jawaban:'2/3'},
    {tipe:'truefalse', pertanyaan:'1/2 = 2/4.', jawaban:true},
  ]},
  { id:'k3-mtk-13', title:'Pengukuran Panjang', soal:[
    {tipe:'choose', pertanyaan:'2,5 m = ___ cm', pilihan:['200','250','255'], jawaban:'250'},
    {tipe:'fill', pertanyaan:'350 cm = ___ m', pilihan:['3','3.5','35'], jawaban:'3.5'},
    {tipe:'choose', pertanyaan:'Pita 4 m dipotong 85 cm. Sisa?', pilihan:['314 cm','315 cm','316 cm'], jawaban:'315 cm'},
    {tipe:'truefalse', pertanyaan:'1 km = 1.000 m.', jawaban:true},
  ]},
  { id:'k3-mtk-14', title:'Keliling Bangun Datar', soal:[
    {tipe:'choose', pertanyaan:'Keliling persegi dengan sisi 7 cm?', pilihan:['24','28','32'], jawaban:'28'},
    {tipe:'fill', pertanyaan:'Keliling persegi panjang 12×5 = ___', pilihan:['30','34','34'], jawaban:'34'},
    {tipe:'choose', pertanyaan:'Keliling segitiga dengan sisi 5, 7, 8 cm?', pilihan:['18','19','20'], jawaban:'20'},
    {tipe:'truefalse', pertanyaan:'Keliling = jumlah semua sisi.', jawaban:true},
  ]},
  { id:'k3-mtk-15', title:'Luas Bangun Datar', soal:[
    {tipe:'choose', pertanyaan:'Luas persegi dengan sisi 6 cm?', pilihan:['24','36','48'], jawaban:'36'},
    {tipe:'fill', pertanyaan:'Luas persegi panjang 8 × 5 = ___ cm²', pilihan:['36','40','44'], jawaban:'40'},
    {tipe:'choose', pertanyaan:'Jika luas persegi 49 cm², maka panjang sisinya?', pilihan:['6 cm','7 cm','8 cm'], jawaban:'7 cm'},
    {tipe:'truefalse', pertanyaan:'Luas persegi = sisi × sisi.', jawaban:true},
  ]},
  { id:'k3-mtk-16', title:'Sisi dan Sudut Bangun Datar', soal:[
    {tipe:'choose', pertanyaan:'Segiempat punya berapa sudut?', pilihan:['2','3','4'], jawaban:'4'},
    {tipe:'fill', pertanyaan:'Segitiga punya ___ sisi.', pilihan:['2','3','4'], jawaban:'3'},
    {tipe:'choose', pertanyaan:'Bangun dengan 5 sisi dan 5 sudut disebut...', pilihan:['segiempat','segilima','segienam'], jawaban:'segilima'},
    {tipe:'truefalse', pertanyaan:'Sudut siku-siku = 90°.', jawaban:true},
  ]},
  { id:'k3-mtk-17', title:'Data dan Tabel', soal:[
    {tipe:'choose', pertanyaan:'Dari tabel: Senin 12, Selasa 8, Rabu 15. Hari paling sedikit?', pilihan:['Senin','Selasa','Rabu'], jawaban:'Selasa'},
    {tipe:'fill', pertanyaan:'Rata-rata dari 6, 8, 10 = ___', pilihan:['7','8','9'], jawaban:'8'},
    {tipe:'choose', pertanyaan:'Selisih data terbesar dan terkecil: 15 dan 8?', pilihan:['6','7','8'], jawaban:'7'},
    {tipe:'truefalse', pertanyaan:'Rata-rata = jumlah data ÷ banyak data.', jawaban:true},
  ]},
  { id:'k3-mtk-18', title:'Diagram Batang dan Gambar', soal:[
    {tipe:'choose', pertanyaan:'Diagram gambar: 1 simbol = 5 siswa. 4 simbol = berapa siswa?', pilihan:['15','20','25'], jawaban:'20'},
    {tipe:'fill', pertanyaan:'Batang paling tinggi dalam diagram batang = data ___', pilihan:['terbesar','terkecil','rata-rata'], jawaban:'terbesar'},
    {tipe:'choose', pertanyaan:'Diagram lingkaran cocok untuk menunjukkan...', pilihan:['perbandingan bagian','urutan waktu','pengukuran panjang'], jawaban:'perbandingan bagian'},
    {tipe:'truefalse', pertanyaan:'Diagram batang menggunakan sumbu X dan Y.', jawaban:true},
  ]},
];

// ============ K6 MTK — 18 unit × 5 soal = 90 ============
const k6Units = [
  { id:'k6-mtk-01', title:'Perkalian Bilangan Asli × Pecahan', soal:[
    {tipe:'choose', pertanyaan:'2/3 × 9 = ?', pilihan:['3','6','9','12'], jawaban:'6'},
    {tipe:'fill', pertanyaan:'3/4 × ___ = 15', pilihan:['18','20','22','24'], jawaban:'20'},
    {tipe:'choose', pertanyaan:'5 × 2/5 = ?', pilihan:['1','2','5','10'], jawaban:'2'},
    {tipe:'truefalse', pertanyaan:'3 × 1/3 = 1.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan!', pasangan:{'2 × 1/2':'1','4 × 3/4':'3','6 × 2/3':'4'}, jawaban:{'2 × 1/2':'1','4 × 3/4':'3','6 × 2/3':'4'}},
  ]},
  { id:'k6-mtk-02', title:'Perkalian Pecahan × Bilangan Asli', soal:[
    {tipe:'choose', pertanyaan:'3/4 × 8 = ?', pilihan:['4','6','8','10'], jawaban:'6'},
    {tipe:'fill', pertanyaan:'2/5 × 25 = ___', pilihan:['8','9','10','11'], jawaban:'10'},
    {tipe:'choose', pertanyaan:'5/6 × 12 = ?', pilihan:['8','9','10','11'], jawaban:'10'},
    {tipe:'truefalse', pertanyaan:'1/2 × 10 = 5.', jawaban:true},
    {tipe:'fill', pertanyaan:'3/8 × 24 = ___', pilihan:['7','8','9','10'], jawaban:'9'},
  ]},
  { id:'k6-mtk-03', title:'Pembagian Pecahan ÷ Bilangan Asli', soal:[
    {tipe:'choose', pertanyaan:'3/4 ÷ 3 = ?', pilihan:['1/4','1/3','1/2','3/4'], jawaban:'1/4'},
    {tipe:'fill', pertanyaan:'2/3 ÷ 2 = ___', pilihan:['1/3','1/2','2/3','1/6'], jawaban:'1/3'},
    {tipe:'choose', pertanyaan:'5/6 ÷ 5 = ?', pilihan:['1/5','1/6','1/3','5/30'], jawaban:'1/6'},
    {tipe:'truefalse', pertanyaan:'4/5 ÷ 4 = 1/5.', jawaban:true},
    {tipe:'fill', pertanyaan:'6/7 ÷ 6 = ___', pilihan:['1/6','1/7','6/42','1/42'], jawaban:'1/7'},
  ]},
  { id:'k6-mtk-04', title:'Pembagian Bilangan Asli ÷ Pecahan', soal:[
    {tipe:'choose', pertanyaan:'6 ÷ 1/2 = ?', pilihan:['3','6','12','24'], jawaban:'12'},
    {tipe:'fill', pertanyaan:'9 ÷ 1/3 = ___', pilihan:['3','9','18','27'], jawaban:'27'},
    {tipe:'choose', pertanyaan:'4 ÷ 2/3 = ?', pilihan:['6','8','12','16'], jawaban:'6'},
    {tipe:'truefalse', pertanyaan:'10 ÷ 1/5 = 50.', jawaban:true},
    {tipe:'fill', pertanyaan:'8 ÷ 1/4 = ___', pilihan:['2','16','32','40'], jawaban:'32'},
  ]},
  { id:'k6-mtk-05', title:'Mengubah Pecahan ke Desimal', soal:[
    {tipe:'choose', pertanyaan:'3/4 = ?', pilihan:['0.25','0.50','0.75','0.80'], jawaban:'0.75'},
    {tipe:'fill', pertanyaan:'1/5 = 0.___', pilihan:['1','2','5','10'], jawaban:'2'},
    {tipe:'choose', pertanyaan:'0.6 = ?', pilihan:['3/5','6/10','3/5 atau 6/10','1/6'], jawaban:'3/5 atau 6/10'},
    {tipe:'truefalse', pertanyaan:'1/2 = 0.5.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan pecahan dan desimal!', pasangan:{'1/2':'0.5','3/4':'0.75','1/4':'0.25','1/5':'0.2'}, jawaban:{'1/2':'0.5','3/4':'0.75','1/4':'0.25','1/5':'0.2'}},
  ]},
  { id:'k6-mtk-06', title:'Data dan Rata-rata', soal:[
    {tipe:'choose', pertanyaan:'Nilai ulangan: 70, 80, 90, 60. Rata-rata?', pilihan:['74','75','76','80'], jawaban:'75'},
    {tipe:'fill', pertanyaan:'5 data: 20, 25, 30, 35, ___. Rata-rata = 28. Missing?', pilihan:['28','29','30','31'], jawaban:'30'},
    {tipe:'choose', pertanyaan:'Median dari 3, 5, 7, 9, 11 adalah?', pilihan:['5','6','7','8'], jawaban:'7'},
    {tipe:'truefalse', pertanyaan:'Modus adalah data yang paling sering muncul.', jawaban:true},
    {tipe:'fill', pertanyaan:'Rata-rata 4, 6, 8 = ___', pilihan:['4','6','8','10'], jawaban:'6'},
  ]},
  { id:'k6-mtk-07', title:'Membandingkan Benda (Rasio)', soal:[
    {tipe:'choose', pertanyaan:'Rasio 6:10 disederhanakan menjadi...', pilihan:['2:5','3:5','6:10','1:2'], jawaban:'3:5'},
    {tipe:'fill', pertanyaan:'Rasio 8:12 = ___:3', pilihan:['1','2','3','4'], jawaban:'2'},
    {tipe:'choose', pertanyaan:'Perbandingan 2:5. Jika jumlah 35, bagian pertama?', pilihan:['10','12','14','15'], jawaban:'10'},
    {tipe:'truefalse', pertanyaan:'Rasio 4:6 = 2:3.', jawaban:true},
    {tipe:'fill', pertanyaan:'Rasio 1:3 = 5:___', pilihan:['12','15','18','21'], jawaban:'15'},
  ]},
  { id:'k6-mtk-08', title:'Pengertian Rasio', soal:[
    {tipe:'choose', pertanyaan:'Di kelas ada 15 perempuan dan 10 laki-laki. Rasio perempuan:laki-laki?', pilihan:['2:3','3:2','1:2','2:1'], jawaban:'3:2'},
    {tipe:'fill', pertanyaan:'Rasio 2:5. Jika bagian kedua = 20, bagian pertama = ___', pilihan:['6','7','8','9'], jawaban:'8'},
    {tipe:'choose', pertanyaan:'Resep kue: tepung:gula = 3:1. Kalau gula 200g, tepung?', pilihan:['400g','500g','600g','700g'], jawaban:'600g'},
    {tipe:'truefalse', pertanyaan:'Rasio ditulis dengan tanda ":".', jawaban:true},
    {tipe:'fill', pertanyaan:'Rasio panjang:lebar = 4:1. Panjang 20, lebar = ___', pilihan:['4','5','6','7'], jawaban:'5'},
  ]},
  { id:'k6-mtk-09', title:'Kesamaan Rasio (Rasio Senilai)', soal:[
    {tipe:'choose', pertanyaan:'1:3 = 4:___', pilihan:['8','10','12','15'], jawaban:'12'},
    {tipe:'fill', pertanyaan:'2:5 = ___:20', pilihan:['6','7','8','9'], jawaban:'8'},
    {tipe:'choose', pertanyaan:'Peta skala 1:100. Jarak peta 5 cm = jarak nyata?', pilihan:['50 cm','500 cm','5 m','50 m'], jawaban:'500 cm'},
    {tipe:'truefalse', pertanyaan:'3:4 = 6:8 adalah rasio senilai.', jawaban:true},
    {tipe:'fill', pertanyaan:'1:4 = 3:___', pilihan:['9','12','15','16'], jawaban:'12'},
  ]},
  { id:'k6-mtk-10', title:'Skala dan Denah', soal:[
    {tipe:'choose', pertanyaan:'Skala 1:200. Gambar 3 cm = ukuran nyata?', pilihan:['200 cm','400 cm','600 cm','800 cm'], jawaban:'600 cm'},
    {tipe:'fill', pertanyaan:'Skala 1:1.000. Jarak nyata 5 km = di peta ___ m', pilihan:['5','50','500','5000'], jawaban:'5'},
    {tipe:'choose', pertanyaan:'Lapangan 50 m × 30 m di gambar skala 1:500 = ?', pilihan:['10×6 cm','8×6 cm','10×8 cm','12×6 cm'], jawaban:'10×6 cm'},
    {tipe:'truefalse', pertanyaan:'Skala 1:100 berarti 1 cm gambar = 100 cm nyata.', jawaban:true},
    {tipe:'fill', pertanyaan:'Skala 1:250. Gambar 4 cm = ___ cm nyata', pilihan:['750','1000','1250','1500'], jawaban:'1000'},
  ]},
  { id:'k6-mtk-11', title:'Volume Bangun Ruang - Kubus', soal:[
    {tipe:'choose', pertanyaan:'Volume kubus dengan rusuk 4 cm?', pilihan:['16','32','64','128'], jawaban:'64'},
    {tipe:'fill', pertanyaan:'Kubus volume 125 cm³. Panjang rusuk = ___ cm', pilihan:['4','5','6','7'], jawaban:'5'},
    {tipe:'choose', pertanyaan:'Rusuk kubus = 6 cm. Volume?', pilihan:['36','72','216','432'], jawaban:'216'},
    {tipe:'truefalse', pertanyaan:'Volume kubus = rusuk × rusuk × rusuk.', jawaban:true},
    {tipe:'fill', pertanyaan:'Kubus rusuk 3 cm, volume = ___ cm³', pilihan:['9','18','27','36'], jawaban:'27'},
  ]},
  { id:'k6-mtk-12', title:'Volume Balok', soal:[
    {tipe:'choose', pertanyaan:'Volume balok 10×5×4 cm?', pilihan:['100','150','200','250'], jawaban:'200'},
    {tipe:'fill', pertanyaan:'Balok 8×6×___ = 144 cm³. Tinggi = ___', pilihan:['2','3','4','5'], jawaban:'3'},
    {tipe:'choose', pertanyaan:'Bak mandi 100×60×50 cm. Volume = ___ liter?', pilihan:['200','250','300','350'], jawaban:'300'},
    {tipe:'truefalse', pertanyaan:'Volume balok = panjang × lebar × tinggi.', jawaban:true},
    {tipe:'fill', pertanyaan:'Balok 5×4×3 = ___ cm³', pilihan:['40','50','60','70'], jawaban:'60'},
  ]},
  { id:'k6-mtk-13', title:'Luas Bangun Datar (K6)', soal:[
    {tipe:'choose', pertanyaan:'Luas lingkaran jari-jari 7 cm (π=22/7)?', pilihan:['144','154','164','174'], jawaban:'154'},
    {tipe:'fill', pertanyaan:'Luas segitiga alas 10 cm, tinggi 8 cm = ___ cm²', pilihan:['35','40','45','50'], jawaban:'40'},
    {tipe:'choose', pertanyaan:'Luas trapesium a=12, b=8, t=5 cm?', pilihan:['40','45','50','55'], jawaban:'50'},
    {tipe:'truefalse', pertanyaan:'Luas segitiga = (alas × tinggi) ÷ 2.', jawaban:true},
    {tipe:'fill', pertanyaan:'Luas persegi panjang 9×7 = ___ cm²', pilihan:['56','63','72','81'], jawaban:'63'},
  ]},
  { id:'k6-mtk-14', title:'Keliling Bangun Datar (K6)', soal:[
    {tipe:'choose', pertanyaan:'Keliling lingkaran jari-jari 14 cm (π=22/7)?', pilihan:['78','84','88','96'], jawaban:'88'},
    {tipe:'fill', pertanyaan:'Keliling belah ketupat sisi 8 cm = ___ cm', pilihan:['24','32','36','40'], jawaban:'32'},
    {tipe:'choose', pertanyaan:'Keliling jajargenjang a=12, b=8 cm?', pilihan:['36','40','44','48'], jawaban:'40'},
    {tipe:'truefalse', pertanyaan:'Keliling lingkaran = 2 × π × r.', jawaban:true},
    {tipe:'fill', pertanyaan:'Keliling persegi sisi 11 cm = ___ cm', pilihan:['40','42','44','48'], jawaban:'44'},
  ]},
  { id:'k6-mtk-15', title:'Bilangan Bulat Positif dan Negatif', soal:[
    {tipe:'choose', pertanyaan:'-5 + 8 = ?', pilihan:['2','3','4','-3'], jawaban:'3'},
    {tipe:'fill', pertanyaan:'-3 - (-7) = ___', pilihan:['2','3','4','5'], jawaban:'4'},
    {tipe:'choose', pertanyaan:'Suhu -4°C naik 9°C menjadi?', pilihan:['3°C','4°C','5°C','6°C'], jawaban:'5°C'},
    {tipe:'truefalse', pertanyaan:'-8 < -3 (negatif lebih besar mendekati nol).', jawaban:true},
    {tipe:'fill', pertanyaan:'6 + (-10) = ___', pilihan:['-3','-4','-5','-6'], jawaban:'-4'},
  ]},
  { id:'k6-mtk-16', title:'Operasi Hitung Campuran', soal:[
    {tipe:'choose', pertanyaan:'(4 + 6) × 3 = ?', pilihan:['28','30','32','34'], jawaban:'30'},
    {tipe:'fill', pertanyaan:'20 ÷ (2 + 3) = ___', pilihan:['2','3','4','5'], jawaban:'4'},
    {tipe:'choose', pertanyaan:'3 × 4 + 5 × 2 = ?', pilihan:['20','22','24','26'], jawaban:'22'},
    {tipe:'truefalse', pertanyaan:'Perkalian dikerjakan sebelum penjumlahan.', jawaban:true},
    {tipe:'fill', pertanyaan:'(8 - 3) × (4 + 2) = ___', pilihan:['25','28','30','32'], jawaban:'30'},
  ]},
  { id:'k6-mtk-17', title:'FPB dan KPK', soal:[
    {tipe:'choose', pertanyaan:'FPB dari 12 dan 18 adalah?', pilihan:['4','5','6','8'], jawaban:'6'},
    {tipe:'fill', pertanyaan:'KPK dari 4 dan 6 = ___', pilihan:['10','12','14','16'], jawaban:'12'},
    {tipe:'choose', pertanyaan:'FPB dari 24 dan 36 = ?', pilihan:['8','10','12','14'], jawaban:'12'},
    {tipe:'truefalse', pertanyaan:'KPK dari 3 dan 5 = 15.', jawaban:true},
    {tipe:'fill', pertanyaan:'KPK dari 6 dan 9 = ___', pilihan:['12','15','18','21'], jawaban:'18'},
  ]},
  { id:'k6-mtk-18', title:'Statistika Sederhana', soal:[
    {tipe:'choose', pertanyaan:'Data: 3, 5, 7, 5, 9, 5. Modusnya?', pilihan:['3','5','7','9'], jawaban:'5'},
    {tipe:'fill', pertanyaan:'Data: 2, 4, 6, 8, 10. Mediannya = ___', pilihan:['4','5','6','7'], jawaban:'6'},
    {tipe:'choose', pertanyaan:'Rata-rata dari 10, 20, 30, 40, 50 = ?', pilihan:['25','28','30','35'], jawaban:'30'},
    {tipe:'truefalse', pertanyaan:'Mean (rata-rata) = total data ÷ jumlah data.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan istilah statistika!', pasangan:{'Rata-rata':'Mean','Nilai tengah':'Median','Nilai sering muncul':'Modus'}, jawaban:{'Rata-rata':'Mean','Nilai tengah':'Median','Nilai sering muncul':'Modus'}},
  ]},
];

// ============ Render + Write ============
function makeUnit(units, kelas, pelajaran) {
  return units.map((u, ui) => ({
    unit_id: u.id,
    unit_title: u.title,
    soal: u.soal.map((s, si) => ({
      id: `${u.id}-${String(si+1).padStart(2,'0')}`,
      ...s,
    })),
  }));
}

const datasets = [
  { kelas:1, units:k1Units, filename:'bank-soal-mtk-k1.json' },
  { kelas:2, units:k2Units, filename:'bank-soal-mtk-k2.json' },
  { kelas:3, units:k3Units, filename:'bank-soal-mtk-k3.json' },
  { kelas:6, units:k6Units, filename:'bank-soal-mtk-k6.json' },
];

for (const { kelas, units, filename } of datasets) {
  const processedUnits = makeUnit(units, kelas, 'mtk');
  const total = processedUnits.reduce((sum, u) => sum + u.soal.length, 0);
  const out = { kelas, pelajaran: 'mtk', total_soal: total, units: processedUnits };
  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(out, null, 2), 'utf8');
  console.log(`Wrote ${filename} — ${total} soal`);
}

console.log('Done: bank soal MTK K1/K2/K3/K6 generated.');
