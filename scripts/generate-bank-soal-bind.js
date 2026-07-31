// generate-bank-soal-bind.js
// Generates bank soal B.Indonesia: K1(24), K2(24), K3(32), K6(30) = 110 total
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ============ K1 B.INDO — 8 unit × 3 soal = 24 ============
const k1Units = [
  { id:'k1-bind-01', title:'Mengenal Perasaan', soal:[
    {tipe:'choose', pertanyaan:'Anton menang lomba. Dia merasa...', pilihan:['senang','sedih','marah'], jawaban:'senang'},
    {tipe:'match', pertanyaan:'Cocokkan perasaan!', pasangan:{'😊':'senang','😢':'sedih','😠':'marah'}, jawaban:{'😊':'senang','😢':'sedih','😠':'marah'}},
    {tipe:'truefalse', pertanyaan:'Kalau jatuh dari sepeda, kita merasa senang.', jawaban:false},
  ]},
  { id:'k1-bind-02', title:'Aku dan Teman Baru', soal:[
    {tipe:'choose', pertanyaan:'Cara berteman yang baik adalah...', pilihan:['berbagi dan ramah','mengejek','tidak mau bermain'], jawaban:'berbagi dan ramah'},
    {tipe:'fill', pertanyaan:'Kita harus ___ dengan teman baru.', pilihan:['bertengkar','bersahabat','mengabaikan'], jawaban:'bersahabat'},
    {tipe:'truefalse', pertanyaan:'Bertengkar adalah cara berteman yang baik.', jawaban:false},
  ]},
  { id:'k1-bind-03', title:'Tubuhku', soal:[
    {tipe:'choose', pertanyaan:'Bagian tubuh yang digunakan untuk melihat...', pilihan:['mata','hidung','telinga'], jawaban:'mata'},
    {tipe:'fill', pertanyaan:'Kita mencium bau dengan ___', pilihan:['hidung','mata','mulut'], jawaban:'hidung'},
    {tipe:'truefalse', pertanyaan:'Telinga digunakan untuk mendengar.', jawaban:true},
  ]},
  { id:'k1-bind-04', title:'Keluargaku', soal:[
    {tipe:'choose', pertanyaan:'Orang tua laki-laki kita disebut...', pilihan:['ayah','ibu','kakak'], jawaban:'ayah'},
    {tipe:'fill', pertanyaan:'Adik perempuan dari ibu kita disebut ___', pilihan:['tante','nenek','kakak'], jawaban:'tante'},
    {tipe:'truefalse', pertanyaan:'Nenek adalah ibu dari ayah atau ibu kita.', jawaban:true},
  ]},
  { id:'k1-bind-05', title:'Hewan Peliharaanku', soal:[
    {tipe:'choose', pertanyaan:'Hewan yang sering dipelihara di rumah...', pilihan:['kucing','harimau','gajah'], jawaban:'kucing'},
    {tipe:'fill', pertanyaan:'Memelihara hewan harus memberi ___ dan minum.', pilihan:['makan','batu','pasir'], jawaban:'makan'},
    {tipe:'truefalse', pertanyaan:'Ikan adalah hewan peliharaan.', jawaban:true},
  ]},
  { id:'k1-bind-06', title:'Lingkungan Rumahku', soal:[
    {tipe:'choose', pertanyaan:'Tetangga yang baik harus saling...', pilihan:['membantu','mengabaikan','bertengkar'], jawaban:'membantu'},
    {tipe:'fill', pertanyaan:'Menjaga kebersihan lingkungan adalah ___ kita bersama.', pilihan:['tanggung jawab','mainan','pekerjaan orang lain'], jawaban:'tanggung jawab'},
    {tipe:'truefalse', pertanyaan:'Membuang sampah sembarangan membuat lingkungan kotor.', jawaban:true},
  ]},
  { id:'k1-bind-07', title:'Bermain dan Berolahraga', soal:[
    {tipe:'choose', pertanyaan:'Olahraga yang baik untuk tubuh kita adalah...', pilihan:['berlari','rebahan saja','makan terus'], jawaban:'berlari'},
    {tipe:'fill', pertanyaan:'Bermain bersama teman membuat kita merasa ___', pilihan:['senang','sedih','marah'], jawaban:'senang'},
    {tipe:'truefalse', pertanyaan:'Olahraga membuat tubuh kita sehat.', jawaban:true},
  ]},
  { id:'k1-bind-08', title:'Ayo ke Sekolah', soal:[
    {tipe:'choose', pertanyaan:'Sikap yang benar saat guru mengajar adalah...', pilihan:['mendengarkan dengan baik','bermain sendiri','berbicara dengan teman'], jawaban:'mendengarkan dengan baik'},
    {tipe:'fill', pertanyaan:'Di sekolah kita belajar bersama ___ dan teman.', pilihan:['guru','pedagang','dokter'], jawaban:'guru'},
    {tipe:'truefalse', pertanyaan:'Kita harus menghormati guru di sekolah.', jawaban:true},
  ]},
];

// ============ K2 B.INDO — 8 unit × 3 soal = 24 ============
const k2Units = [
  { id:'k2-bind-01', title:'Aku Anak yang Jujur', soal:[
    {tipe:'choose', pertanyaan:'Jujur artinya...', pilihan:['berkata benar','berbohong','menipu'], jawaban:'berkata benar'},
    {tipe:'fill', pertanyaan:'Anak yang jujur tidak pernah ___', pilihan:['berbohong','belajar','bermain'], jawaban:'berbohong'},
    {tipe:'truefalse', pertanyaan:'Anak yang jujur dipercaya oleh teman dan orang tua.', jawaban:true},
  ]},
  { id:'k2-bind-02', title:'Menjaga Kesehatan', soal:[
    {tipe:'choose', pertanyaan:'Agar tubuh sehat, kita harus...', pilihan:['makan teratur dan olahraga','tidur terus','makan jajan saja'], jawaban:'makan teratur dan olahraga'},
    {tipe:'fill', pertanyaan:'Mencuci tangan sebelum makan agar tidak ___.', pilihan:['sakit','kuat','besar'], jawaban:'sakit'},
    {tipe:'truefalse', pertanyaan:'Mandi dua kali sehari membuat tubuh bersih dan sehat.', jawaban:true},
  ]},
  { id:'k2-bind-03', title:'Berhati-hati di Jalan', soal:[
    {tipe:'choose', pertanyaan:'Sebelum menyeberang jalan, kita harus...', pilihan:['lihat kiri-kanan','lari cepat','tutup mata'], jawaban:'lihat kiri-kanan'},
    {tipe:'fill', pertanyaan:'Kita tidak boleh menerima permen dari orang ___.', pilihan:['teman','guru','asing'], jawaban:'asing'},
    {tipe:'truefalse', pertanyaan:'Berhati-hati artinya waspada dan teliti.', jawaban:true},
  ]},
  { id:'k2-bind-04', title:'Aku Suka Membaca', soal:[
    {tipe:'choose', pertanyaan:'Manfaat membaca buku adalah...', pilihan:['menambah pengetahuan','membuat mengantuk','membuang waktu'], jawaban:'menambah pengetahuan'},
    {tipe:'fill', pertanyaan:'Membaca harus dengan ___ yang cukup agar mata tidak lelah.', pilihan:['cahaya/penerangan','kegelapan','musik keras'], jawaban:'cahaya/penerangan'},
    {tipe:'truefalse', pertanyaan:'Membaca bisa meningkatkan kemampuan bahasa.', jawaban:true},
  ]},
  { id:'k2-bind-05', title:'Keragaman di Sekitarku', soal:[
    {tipe:'choose', pertanyaan:'Meskipun berbeda suku, kita harus...', pilihan:['saling menghargai','saling mengejek','menghindari'], jawaban:'saling menghargai'},
    {tipe:'fill', pertanyaan:'Indonesia kaya akan keragaman budaya dan ___', pilihan:['suku bangsa','kekacauan','konflik'], jawaban:'suku bangsa'},
    {tipe:'truefalse', pertanyaan:'Perbedaan membuat kita saling melengkapi.', jawaban:true},
  ]},
  { id:'k2-bind-06', title:'Mengenal Uang', soal:[
    {tipe:'choose', pertanyaan:'Menabung adalah kebiasaan...', pilihan:['baik untuk masa depan','membuang uang','boros'], jawaban:'baik untuk masa depan'},
    {tipe:'fill', pertanyaan:'Sebelum membeli sesuatu, kita harus ___ apakah perlu atau tidak.', pilihan:['memikirkan','langsung beli','meminjam'], jawaban:'memikirkan'},
    {tipe:'truefalse', pertanyaan:'Membeli barang yang tidak perlu adalah pemborosan.', jawaban:true},
  ]},
  { id:'k2-bind-07', title:'Lingkungan Sekolahku', soal:[
    {tipe:'choose', pertanyaan:'Cara menjaga kebersihan kelas adalah...', pilihan:['membuang sampah di tempat sampah','mencoret dinding','membuang sampah di lantai'], jawaban:'membuang sampah di tempat sampah'},
    {tipe:'fill', pertanyaan:'Piket kelas dilakukan secara ___ dan bergantian.', pilihan:['bersama','sendiri','terpaksa'], jawaban:'bersama'},
    {tipe:'truefalse', pertanyaan:'Sekolah yang bersih membuat nyaman belajar.', jawaban:true},
  ]},
  { id:'k2-bind-08', title:'Cerita Fabel Sederhana', soal:[
    {tipe:'choose', pertanyaan:'Fabel adalah cerita tentang...', pilihan:['hewan yang berperilaku seperti manusia','manusia biasa','benda mati'], jawaban:'hewan yang berperilaku seperti manusia'},
    {tipe:'fill', pertanyaan:'Dari fabel, kita bisa mengambil ___ atau pelajaran.', pilihan:['pesan moral','kebingungan','masalah'], jawaban:'pesan moral'},
    {tipe:'truefalse', pertanyaan:'Kura-kura dan kelinci adalah contoh cerita fabel.', jawaban:true},
  ]},
];

// ============ K3 B.INDO — 8 unit × 4 soal = 32 ============
const k3Units = [
  { id:'k3-bind-01', title:'Berbagi dengan Sesama', soal:[
    {tipe:'choose', pertanyaan:'Berbagi kepada orang lain menunjukkan sikap...', pilihan:['peduli','egois','pelit'], jawaban:'peduli'},
    {tipe:'fill', pertanyaan:'Tindakan berbagi membuat hati kita merasa ___', pilihan:['senang','sedih','kesal'], jawaban:'senang'},
    {tipe:'choose', pertanyaan:'"Berbagi" berarti...', pilihan:['memberi sebagian kepada orang lain','mengambil milik orang lain','menyimpan semuanya'], jawaban:'memberi sebagian kepada orang lain'},
    {tipe:'truefalse', pertanyaan:'Orang yang suka berbagi memiliki banyak teman.', jawaban:true},
  ]},
  { id:'k3-bind-02', title:'Sahabat Sejati', soal:[
    {tipe:'choose', pertanyaan:'Ciri sahabat sejati adalah...', pilihan:['selalu ada di saat susah','hanya ada saat senang','suka mengambil untung'], jawaban:'selalu ada di saat susah'},
    {tipe:'fill', pertanyaan:'Persahabatan yang baik didasari rasa ___ dan pengertian.', pilihan:['saling percaya','iri hati','persaingan'], jawaban:'saling percaya'},
    {tipe:'choose', pertanyaan:'Alfa dan Galih bekerja bersama untuk menang. Ini menunjukkan...', pilihan:['kerja sama','persaingan','iri hati'], jawaban:'kerja sama'},
    {tipe:'truefalse', pertanyaan:'Meutia dan Andi berbeda suku tapi tetap berteman. Ini toleransi.', jawaban:true},
  ]},
  { id:'k3-bind-03', title:'Tokoh Pahlawan Kita', soal:[
    {tipe:'choose', pertanyaan:'Jenderal Sudirman tetap berjuang meski sakit. Ini menunjukkan...', pilihan:['pantang menyerah','mudah menyerah','malas'], jawaban:'pantang menyerah'},
    {tipe:'fill', pertanyaan:'"Pengobar semangat" artinya orang yang ___.', pilihan:['memberi semangat','melemahkan','menghalangi'], jawaban:'memberi semangat'},
    {tipe:'choose', pertanyaan:'RA Kartini dikenal sebagai pahlawan...', pilihan:['emansipasi wanita','kemerdekaan di laut','teknologi'], jawaban:'emansipasi wanita'},
    {tipe:'truefalse', pertanyaan:'Pahlawan berjuang demi kepentingan bangsa, bukan diri sendiri.', jawaban:true},
  ]},
  { id:'k3-bind-04', title:'Merawat Lingkungan', soal:[
    {tipe:'choose', pertanyaan:'Cara merawat lingkungan agar tetap hijau adalah...', pilihan:['menanam pohon','menebang hutan','membakar sampah'], jawaban:'menanam pohon'},
    {tipe:'fill', pertanyaan:'Lingkungan yang bersih membuat kita ___ dan nyaman.', pilihan:['sehat','sakit','sedih'], jawaban:'sehat'},
    {tipe:'choose', pertanyaan:'Sampah plastik berbahaya karena...', pilihan:['sulit terurai','mudah hilang','tidak berbahaya'], jawaban:'sulit terurai'},
    {tipe:'truefalse', pertanyaan:'Membuang sampah di sungai dapat menyebabkan banjir.', jawaban:true},
  ]},
  { id:'k3-bind-05', title:'Cerita Dongeng', soal:[
    {tipe:'choose', pertanyaan:'Dongeng biasanya mengandung...', pilihan:['pesan moral','fakta ilmiah','berita terkini'], jawaban:'pesan moral'},
    {tipe:'fill', pertanyaan:'Tokoh utama dalam cerita disebut ___.', pilihan:['protagonis','setting','alur'], jawaban:'protagonis'},
    {tipe:'choose', pertanyaan:'Latar cerita (setting) meliputi...', pilihan:['tempat, waktu, suasana','tokoh dan watak','awal dan akhir saja'], jawaban:'tempat, waktu, suasana'},
    {tipe:'truefalse', pertanyaan:'Antagonis adalah tokoh jahat dalam cerita.', jawaban:true},
  ]},
  { id:'k3-bind-06', title:'Kosakata dan Kalimat', soal:[
    {tipe:'choose', pertanyaan:'Kalimat yang benar dimulai dengan...', pilihan:['huruf kapital','huruf kecil','angka'], jawaban:'huruf kapital'},
    {tipe:'fill', pertanyaan:'Kalimat yang menyatakan pertanyaan diakhiri tanda ___.', pilihan:['tanya (?)','titik (.)','seru (!)'], jawaban:'tanya (?)'},
    {tipe:'choose', pertanyaan:'Sinonim dari kata "besar" adalah...', pilihan:['luas','kecil','sempit'], jawaban:'luas'},
    {tipe:'truefalse', pertanyaan:'Antonim adalah lawan kata.', jawaban:true},
  ]},
  { id:'k3-bind-07', title:'Puisi Anak', soal:[
    {tipe:'choose', pertanyaan:'Ciri khas puisi dibandingkan prosa adalah...', pilihan:['menggunakan baris dan bait','paragraf panjang','kalimat biasa'], jawaban:'menggunakan baris dan bait'},
    {tipe:'fill', pertanyaan:'Persajakan atau rima membuat puisi terdengar lebih ___', pilihan:['indah','membosankan','susah'], jawaban:'indah'},
    {tipe:'choose', pertanyaan:'Puisi berisi ungkapan...', pilihan:['perasaan dan pikiran penyair','berita terkini','laporan ilmiah'], jawaban:'perasaan dan pikiran penyair'},
    {tipe:'truefalse', pertanyaan:'Puisi umumnya lebih pendek dari cerpen.', jawaban:true},
  ]},
  { id:'k3-bind-08', title:'Surat dan Pengumuman', soal:[
    {tipe:'choose', pertanyaan:'Bagian surat pribadi yang paling utama adalah...', pilihan:['isi surat','amplop','perangko'], jawaban:'isi surat'},
    {tipe:'fill', pertanyaan:'Pengumuman ditujukan kepada ___ orang banyak.', pilihan:['banyak/umum','satu','dua'], jawaban:'banyak/umum'},
    {tipe:'choose', pertanyaan:'Bagian awal surat biasanya berisi...', pilihan:['salam pembuka','tanda tangan','isi pesan'], jawaban:'salam pembuka'},
    {tipe:'truefalse', pertanyaan:'Surat pribadi lebih formal dibanding surat resmi.', jawaban:false},
  ]},
];

// ============ K6 B.INDO — 6 unit × 5 soal = 30 ============
const k6Units = [
  { id:'k6-bind-01', title:'Rasa Nasionalisme', soal:[
    {tipe:'choose', pertanyaan:'Nasionalisme berarti...', pilihan:['cinta tanah air','mencari untung sendiri','tidak peduli negara','melarikan diri'], jawaban:'cinta tanah air'},
    {tipe:'fill', pertanyaan:'Salah satu cara menunjukkan nasionalisme adalah ___ produk dalam negeri.', pilihan:['mencintai/menggunakan','merusak','mengimpor semua','mengabaikan'], jawaban:'mencintai/menggunakan'},
    {tipe:'choose', pertanyaan:'Lagu Indonesia Raya diciptakan oleh...', pilihan:['WR Supratman','Ibu Soed','AT Mahmud','C Simanjuntak'], jawaban:'WR Supratman'},
    {tipe:'truefalse', pertanyaan:'Mengibarkan bendera Merah Putih pada hari nasional adalah wujud nasionalisme.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan simbol nasional!', pasangan:{'Burung Garuda':'Lambang negara','Merah Putih':'Bendera','Indonesia Raya':'Lagu kebangsaan'}, jawaban:{'Burung Garuda':'Lambang negara','Merah Putih':'Bendera','Indonesia Raya':'Lagu kebangsaan'}},
  ]},
  { id:'k6-bind-02', title:'Tokoh Inspiratif', soal:[
    {tipe:'choose', pertanyaan:'Habibie dikenal sebagai tokoh Indonesia di bidang...', pilihan:['teknologi/penerbangan','seni musik','olahraga','kuliner'], jawaban:'teknologi/penerbangan'},
    {tipe:'fill', pertanyaan:'Seorang tokoh inspiratif memiliki sikap ___ dan tidak mudah menyerah.', pilihan:['gigih/pantang menyerah','pemalas','egois','sombong'], jawaban:'gigih/pantang menyerah'},
    {tipe:'choose', pertanyaan:'Kita bisa meneladani tokoh inspiratif dengan...', pilihan:['mengambil nilai positifnya','meniru semua gayanya','hanya mengagumi','tidak peduli'], jawaban:'mengambil nilai positifnya'},
    {tipe:'truefalse', pertanyaan:'Ibu Soed dikenal sebagai komponis lagu anak Indonesia.', jawaban:true},
    {tipe:'fill', pertanyaan:'Biografi adalah tulisan tentang ___ seseorang.', pilihan:['riwayat hidup','hobi','resep masakan','jadwal kegiatan'], jawaban:'riwayat hidup'},
  ]},
  { id:'k6-bind-03', title:'Cerita Legenda', soal:[
    {tipe:'choose', pertanyaan:'Legenda adalah cerita yang...', pilihan:['dianggap benar-benar terjadi di masa lalu','fiksi murni','berita aktual','dongeng binatang'], jawaban:'dianggap benar-benar terjadi di masa lalu'},
    {tipe:'fill', pertanyaan:'Legenda biasanya berkaitan dengan asal-usul suatu ___ atau tempat.', pilihan:['nama/tempat','matematika','sains','teknologi'], jawaban:'nama/tempat'},
    {tipe:'choose', pertanyaan:'Pesan moral legenda Malin Kundang adalah...', pilihan:['jangan durhaka pada orang tua','jangan berlayar','jangan menjadi kaya','jangan berkelana'], jawaban:'jangan durhaka pada orang tua'},
    {tipe:'truefalse', pertanyaan:'Rawa Pening dan Sangkuriang adalah contoh legenda Indonesia.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan legenda dengan asalnya!', pasangan:{'Sangkuriang':'Jawa Barat','Malin Kundang':'Sumatera Barat','Timun Mas':'Jawa Tengah'}, jawaban:{'Sangkuriang':'Jawa Barat','Malin Kundang':'Sumatera Barat','Timun Mas':'Jawa Tengah'}},
  ]},
  { id:'k6-bind-04', title:'Majas dalam Bahasa Indonesia', soal:[
    {tipe:'choose', pertanyaan:'"Pulau Komodo berdiri gagah" adalah majas...', pilihan:['personifikasi','hiperbola','metafora','simile'], jawaban:'personifikasi'},
    {tipe:'fill', pertanyaan:'Majas yang melebih-lebihkan fakta disebut ___', pilihan:['hiperbola','personifikasi','metafora','simile'], jawaban:'hiperbola'},
    {tipe:'choose', pertanyaan:'Dari legenda Putri Komodo, kita belajar menghargai...', pilihan:['alam dan keberanian','kekayaan','kekuasaan','kemalasan'], jawaban:'alam dan keberanian'},
    {tipe:'truefalse', pertanyaan:'Anggun C. Sasmi adalah musisi Indonesia yang go internasional.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan majas dengan contohnya!', pasangan:{'Personifikasi':'Pohon melambai','Hiperbola':'Rumah sebesar gunung','Metafora':'Dia adalah singa','Simile':'Wajahnya seperti bunga'}, jawaban:{'Personifikasi':'Pohon melambai','Hiperbola':'Rumah sebesar gunung','Metafora':'Dia adalah singa','Simile':'Wajahnya seperti bunga'}},
  ]},
  { id:'k6-bind-05', title:'Laporan dan Teks Eksplanasi', soal:[
    {tipe:'choose', pertanyaan:'Teks eksplanasi menjelaskan tentang...', pilihan:['proses atau fenomena','cerita fiksi','iklan produk','surat pribadi'], jawaban:'proses atau fenomena'},
    {tipe:'fill', pertanyaan:'Struktur teks eksplanasi: pernyataan umum, ___, dan interpretasi.', pilihan:['deretan penjelas','penutup biasa','kata sandang','majas'], jawaban:'deretan penjelas'},
    {tipe:'choose', pertanyaan:'Laporan hasil pengamatan harus berisi data yang...', pilihan:['faktual dan objektif','imajinatif','bersifat opini','tidak terstruktur'], jawaban:'faktual dan objektif'},
    {tipe:'truefalse', pertanyaan:'Kata hubung sebab-akibat antara lain "karena", "sehingga", "akibatnya".', jawaban:true},
    {tipe:'fill', pertanyaan:'Kata baku yang benar: "ijin" atau "___"?', pilihan:['izin','idzin','isin','ezin'], jawaban:'izin'},
  ]},
  { id:'k6-bind-06', title:'Pidato dan Presentasi', soal:[
    {tipe:'choose', pertanyaan:'Bagian pembuka pidato biasanya berisi...', pilihan:['salam dan ucapan terima kasih','penutup','isi utama','kesimpulan'], jawaban:'salam dan ucapan terima kasih'},
    {tipe:'fill', pertanyaan:'Saat berpidato, kita harus berbicara dengan suara yang ___ dan jelas.', pilihan:['lantang/keras','pelan sekali','bergumam','tidak terdengar'], jawaban:'lantang/keras'},
    {tipe:'choose', pertanyaan:'Agar pidato menarik, pembicara harus...', pilihan:['menatap pendengar dan percaya diri','membaca teks terus','menunduk','berbisik'], jawaban:'menatap pendengar dan percaya diri'},
    {tipe:'truefalse', pertanyaan:'Pidato perpisahan sekolah termasuk pidato dalam acara resmi.', jawaban:true},
    {tipe:'match', pertanyaan:'Cocokkan bagian pidato!', pasangan:{'Pembuka':'Salam & perkenalan','Isi':'Pokok pembicaraan','Penutup':'Kesimpulan & harapan'}, jawaban:{'Pembuka':'Salam & perkenalan','Isi':'Pokok pembicaraan','Penutup':'Kesimpulan & harapan'}},
  ]},
];

function makeUnits(units) {
  return units.map(u => ({
    unit_id: u.id,
    unit_title: u.title,
    soal: u.soal.map((s, si) => ({ id: `${u.id}-${String(si+1).padStart(2,'0')}`, ...s })),
  }));
}

const datasets = [
  { kelas:1, units:k1Units, filename:'bank-soal-bind-k1.json' },
  { kelas:2, units:k2Units, filename:'bank-soal-bind-k2.json' },
  { kelas:3, units:k3Units, filename:'bank-soal-bind-k3.json' },
  { kelas:6, units:k6Units, filename:'bank-soal-bind-k6.json' },
];

for (const { kelas, units, filename } of datasets) {
  const processedUnits = makeUnits(units);
  const total = processedUnits.reduce((sum, u) => sum + u.soal.length, 0);
  const out = { kelas, pelajaran: 'bind', total_soal: total, units: processedUnits };
  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(out, null, 2), 'utf8');
  console.log(`Wrote ${filename} — ${total} soal`);
}

console.log('Done: bank soal B.Indonesia K1/K2/K3/K6 generated.');
