const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas1/matematika');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function template(data) {
  // Rotate background colors for K1 book themes to make them pastel and colorful
  let bgTheme = '#FFFDE7'; // yellow lemon
  if (data.id.endsWith('02') || data.id.endsWith('10') || data.id.endsWith('14')) {
    bgTheme = '#FCE4EC'; // pink baby
  } else if (data.id.endsWith('03') || data.id.endsWith('11') || data.id.endsWith('15')) {
    bgTheme = '#E3F2FD'; // blue baby
  } else if (data.id.endsWith('04') || data.id.endsWith('12') || data.id.endsWith('16')) {
    bgTheme = '#E8F5E9'; // green mint
  } else if (data.id.endsWith('05') || data.id.endsWith('13') || data.id.endsWith('17')) {
    bgTheme = '#F3E5F5'; // purple pastel
  } else if (data.id.endsWith('06') || data.id.endsWith('18')) {
    bgTheme = '#FFF3E0'; // orange pastel
  }

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — Kelas 1</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body class="kelas1" data-kelas="1" data-pelajaran="mtk" data-materi="${data.id}" style="background-color: ${bgTheme}; --bg: ${bgTheme};">
  <div class="progress-container"><div class="progress-fill"></div></div>
  
  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #c2185b; margin:0 0 8px 0; font-size: 28px;">${data.judul}</h1>
        <p style="color: #666; font-size: 20px;">Matematika — Kelas 1</p>
        <p style="margin-top: 16px; font-size: 20px;">${data.deskripsi} 🎀🧸</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Mulai! 🚀</button>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Penjelasan & Quiz -->
    ${data.sections.map((sec, i) => `
    <div class="section-card">
      <div class="section-header">📚 Bagian ${i+1}: ${sec.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        ${sec.konten}
        <div class="quiz-box" data-idx="${i}" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 20px;">🤔 Coba tebak:</p>
          <p style="font-size: 20px;">${sec.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${sec.quiz.pilihan.map((p, pIdx) => `<button class="quiz-opt" data-opt="${pIdx}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>
      </div>
    </div>
    `).join('')}

    <!-- Ringkasan -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 20px;">
        <p>Kamu mendapatkan badge:</p>
        <div style="font-size: 80px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #c2185b; font-size: 24px;">${data.badgeNama}</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai & Kirim! ✅</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Selesaikan semua kuis di atas dulu ya)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak Kelas 2)</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Halo! Aku kakak kelasmu. Mau tanya soal ${data.judul}? Yuk, kita hitung bareng-bareng! 🧸🎉</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>
  <script>
    window._QUIZ_ANSWERS = [${data.sections.map(s => s.quiz.jawabanIdx).join(', ')}];
    window._TOTAL_SECTIONS = ${data.sections.length};
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

const materiList = [
  {
    id: 'k1-mtk-01',
    judul: 'Mengenal Bilangan 1–5',
    emoji: '🍎',
    deskripsi: 'Yuk, kita belajar menghitung 1 sampai 5 bareng Upe dan Kira!',
    tujuan: ['Menghitung benda 1 sampai 5 🍎', 'Menulis angka 1, 2, 3, 4, 5 ✏️'],
    badgeEmoji: '🍎',
    badgeNama: 'Penghitung Cilik',
    sections: [
      {
        judul: 'Ayo Menghitung 1 sampai 5!',
        konten: `<p>Upe dan Kira sedang di kebun apel. 🌳</p>
<p>Wah, ada buah yang jatuh dari pohon! Ayo bantu Upe menghitung apel di keranjangnya! 🧺</p>
<p class="emoji-large">🍎 🍎 🍎</p>
<p>Mari hitung satu per satu: satu... dua... tiga! Ada <strong>3</strong> apel!</p>
<p>Upe punya 3 apel manis. Nyam! 😋</p>`,
        quiz: {
          soal: 'Kira punya kupu-kupu lucu di tangannya. Coba hitung: 🦋 🦋 🦋 🦋 🦋. Ada berapa kupu-kupu?',
          pilihan: ['3 kupu-kupu', '4 kupu-kupu', '5 kupu-kupu'],
          jawabanIdx: 2
        }
      },
      {
        judul: 'Ayo Menulis Angka!',
        konten: `<p>Sekarang, ayo kita tulis angkanya! ✏️</p>
<p>Trik mengingat bentuk angka:</p>
<ul style="padding-left: 20px;">
  <li><strong>1</strong> = seperti tiang lurus 🗼</li>
  <li><strong>2</strong> = seperti bebek berenang di air 🦆</li>
  <li><strong>3</strong> = seperti burung terbang di langit 🐦</li>
  <li><strong>4</strong> = seperti kursi terbalik 🪑</li>
  <li><strong>5</strong> = seperti badut punya perut gendut 🤡</li>
</ul>
<p>Yuk, coba gambar angkanya di udara pakai jarimu! Syuuut! ✨</p>`,
        quiz: {
          soal: 'Angka mana yang mirip dengan bebek berenang di air?',
          pilihan: ['Angka 1', 'Angka 2', 'Angka 3'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-02',
    judul: 'Mengenal Bilangan 6–10',
    emoji: '🔢',
    deskripsi: 'Ayo kita berhitung 6 sampai 10 memakai jari tangan!',
    tujuan: ['Menghitung benda 6 sampai 10 🚗', 'Berhitung memakai sepuluh jari tangan 🖐️'],
    badgeEmoji: '🔢',
    badgeNama: 'Master Sepuluh',
    sections: [
      {
        judul: 'Ayo Menghitung 6 sampai 10!',
        konten: `<p>Kira punya mainan mobil-mobilan baru di kotak. 📦</p>
<p>Banyak sekali! Mari kita hitung mobil-mobilan Kira bersama-sama! 🚗</p>
<p class="emoji-large">🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗</p>
<p>Ayo berhitung: satu, dua, tiga, empat, lima, enam, tujuh, delapan! Ada <strong>8</strong> mobil-mobilan!</p>
<p>Wah, Kira bisa membuat balapan mobil yang seru! 🏁</p>`,
        quiz: {
          soal: 'Tika memetik bunga cantik di taman. Coba hitung bunganya: 🌸 🌸 🌸 🌸 🌸 🌸. Ada berapa?',
          pilihan: ['6 bunga', '7 bunga', '8 bunga'],
          jawabanIdx: 0
        }
      },
      {
        judul: 'Berhitung dengan Jari Tangan',
        konten: `<p>Tangan kita punya sepuluh jari yang hebat! 🖐️</p>
<p>Coba buka semua jari tangan kananmu. Ada 5 jari! 🖐️</p>
<p>Sekarang buka jari tangan kirimu satu per satu: enam... tujuh... delapan... sembilan... sepuluh! 🖐️🖐️</p>
<p>Yeeey! Kita punya 10 jari yang siap membantu berhitung kapan saja! 🌟</p>`,
        quiz: {
          soal: 'Buka satu tangan penuh (5) dan tambah satu jari dari tangan lain. Ada berapa jari terbuka?',
          pilihan: ['5 jari', '6 jari', '7 jari'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-03',
    judul: 'Membandingkan Banyak Benda',
    emoji: '⚖️',
    deskripsi: 'Belajar menentukan mana yang lebih banyak, sedikit, atau sama!',
    tujuan: ['Menentukan benda yang lebih banyak atau sedikit 🍭', 'Mengenal benda yang sama banyak 🌸'],
    badgeEmoji: '⚖️',
    badgeNama: 'Juru Banding Cilik',
    sections: [
      {
        judul: 'Lebih Banyak dan Lebih Sedikit',
        konten: `<p>Upe punya 5 permen lolipop manis. 🍭🍭🍭🍭🍭</p>
<p>Kira punya 3 permen lolipop manis. 🍭🍭🍭</p>
<p>Siapa yang punya permen paling banyak? Upe! 🙋‍♀️</p>
<p>Permen Upe <strong>lebih banyak</strong> dari permen Kira. Permen Kira <strong>lebih sedikit</strong> dari permen Upe. 👍</p>`,
        quiz: {
          soal: 'Malosi punya 4 balon 🎈🎈🎈🎈. Tika punya 2 balon 🎈🎈. Balon Tika adalah...',
          pilihan: ['Lebih banyak dari Malosi', 'Lebih sedikit dari Malosi', 'Sama banyak dengan Malosi'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Sama Banyak!',
        konten: `<p>Sekarang Upe punya 4 bunga pink. 🌸🌸🌸🌸</p>
<p>Kira juga punya 4 bunga pink. 🌸🌸🌸🌸</p>
<p>Jumlah bunga mereka tidak ada yang kurang dan tidak ada yang lebih. Semuanya pas!</p>
<p>Artinya, bunga Upe dan Kira adalah <strong>sama banyak</strong>! 💖</p>`,
        quiz: {
          soal: 'Di piring ada 3 donat 🍩🍩🍩. Di meja ada 3 donat 🍩🍩🍩. Donat di piring and di meja adalah...',
          pilihan: ['Lebih banyak', 'Lebih sedikit', 'Sama banyak'],
          jawabanIdx: 2
        }
      }
    ]
  },
  {
    id: 'k1-mtk-04',
    judul: 'Cerita Penjumlahan',
    emoji: '➕',
    deskripsi: 'Menggabungkan mainan dan makanan seru. Penjumlahan itu gampang!',
    tujuan: ['Menggabungkan dua kelompok benda 🧸', 'Mengenal simbol tambah (+) dan sama dengan (=) ➕'],
    badgeEmoji: '➕',
    badgeNama: 'Juru Tambah Cilik',
    sections: [
      {
        judul: 'Cerita Menggabungkan Benda',
        konten: `<p>Malosi sedang bermain dengan 2 boneka beruang lucunya. 🧸🧸</p>
<p>Lalu Tika datang membawa 3 boneka beruang lagi untuk bermain bersama. 🧸🧸🧸</p>
<p>Jika semua boneka digabungkan di tengah karpet, ayo hitung totalnya: satu, dua, tiga, empat, lima!</p>
<p>Sekarang ada <strong>5</strong> boneka beruang! Digabung artinya jumlahnya bertambah! 🐻</p>`,
        quiz: {
          soal: 'Ada 3 burung bernyanyi 🐦🐦🐦. Datang 2 burung lagi ikut bernyanyi 🐦🐦. Berapa burung semuanya?',
          pilihan: ['4 burung', '5 burung', '6 burung'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Mengenal Simbol (+) dan (=)',
        konten: `<p>Di matematika, kita menulis cerita gabung benda dengan simbol rahasia! 🤫</p>
<p>Tanda <strong>+</strong> dibaca <strong>TAMBAH</strong>. Tanda ini dipakai untuk menggabungkan.</p>
<p>Tanda <strong>=</strong> dibaca <strong>SAMA DENGAN</strong>. Tanda ini dipakai untuk hasil akhirnya.</p>
<p>Contoh cerita Malosi ditulis: <code>2 + 3 = 5</code> (Dua tambah tiga sama dengan lima!).</p>`,
        quiz: {
          soal: 'Bagaimana cara menulis matematika untuk: "Satu donat ditambah dua donat sama dengan tiga donat"?',
          pilihan: ['1 - 2 = 3', '1 + 2 = 3', '1 = 2 + 3'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-05',
    judul: 'Cara Menjumlahkan',
    emoji: '🖐️',
    deskripsi: 'Trik menghitung maju dan jarimatika yang asyik!',
    tujuan: ['Menjumlahkan dengan strategi menghitung maju 🧗‍♂️', 'Menjumlahkan dengan jari tangan (jarimatika) 🖐️'],
    badgeEmoji: '🖐️',
    badgeNama: 'Master Jarimatika',
    sections: [
      {
        judul: 'Strategi Menghitung Maju',
        konten: `<p>Ayo kita belajar trik menghitung maju untuk penjumlahan! 🧗‍♂️</p>
<p>Misalnya kita mau menghitung <code>4 + 2</code>:</p>
<ol style="padding-left: 20px;">
  <li>Ingat angka pertama di kepalamu: <strong>4</strong>!</li>
  <li>Buka 2 jarimu untuk menghitung maju.</li>
  <li>Hitung maju 2 langkah dari 4: <strong>lima... enam!</strong></li>
</ol>
<p>Hore! Hasilnya adalah <strong>6</strong>! Mudah sekali kan? 🎉</p>`,
        quiz: {
          soal: 'Berapakah hasil dari 5 + 3 dengan menghitung maju dari 5?',
          pilihan: ['7', '8', '9'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Trik Jarimatika',
        konten: `<p>Ayo kita hitung pakai sepuluh jari tangan kita! 🖐️</p>
<p>Misalnya kita mau menghitung <code>3 + 2</code>:</p>
<ol style="padding-left: 20px;">
  <li>Buka 3 jari di tangan kananmu. (satu, dua, tiga) 🖐️</li>
  <li>Buka 2 jari di tangan kirimu. (satu, dua) 🖐️</li>
  <li>Gabung dan hitung semua jari yang terbuka: <strong>1, 2, 3, 4, 5!</strong></li>
</ol>
<p>Hasilnya adalah <strong>5</strong>! Jari kita sungguh ajaib! ⭐</p>`,
        quiz: {
          soal: 'Coba buka 4 jari di tangan kanan, dan 4 jari di tangan kiri. Hitung semua jari yang terbuka!',
          pilihan: ['7 jari', '8 jari', '9 jari'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-06',
    judul: 'Cerita Pengurangan',
    emoji: '➖',
    deskripsi: 'Mengambil biskuit dan mainan. Pengurangan itu seru!',
    tujuan: ['Memahami konsep mengambil atau memakan benda 🍪', 'Mengenal simbol kurang (−) dan artinya ➖'],
    badgeEmoji: '➖',
    badgeNama: 'Juru Kurang Cilik',
    sections: [
      {
        judul: 'Cerita Biskuit yang Hilang',
        konten: `<p>Wei membawa piring berisi 7 biskuit cokelat yang wangi. 🍪🍪🍪🍪🍪🍪🍪</p>
<p>Nyam! Wei memakan 2 biskuit sampai habis karena lapar. 😋</p>
<p>Jika dimakan, biskuit di piring berkurang. Ayo hitung biskuit yang tersisa: satu, dua, tiga, empat, lima!</p>
<p>Sekarang biskuit sisa <strong>5</strong> buah! Berkurang artinya diambil! 🍪</p>`,
        quiz: {
          soal: 'Ada 5 balon terbang di langit. Meletus 1 balon. Berapa balon yang tersisa?',
          pilihan: ['3 balon', '4 balon', '5 balon'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Mengenal Simbol Kurang (−)',
        konten: `<p>Untuk menulis cerita dikurangi, kita pakai simbol <strong>−</strong> yang dibaca <strong>KURANG</strong>. ➖</p>
<p>Tanda ini artinya bendanya diambil, dimakan, pecah, atau hilang.</p>
<p>Contoh cerita biskuit Wei ditulis: <code>7 - 2 = 5</code> (Tujuh kurang dua sama dengan lima!).</p>`,
        quiz: {
          soal: 'Bagaimana cara menulis matematika untuk: "Enam balon dikurangi dua balon sama dengan empat balon"?',
          pilihan: ['6 + 2 = 4', '6 - 2 = 4', '6 = 2 - 4'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-07',
    judul: 'Cara Mengurangi',
    emoji: '🔄',
    deskripsi: 'Trik menghitung mundur dan pasangan bilangan!',
    tujuan: ['Mengurangi dengan strategi menghitung mundur 🚶‍♂️', 'Memakai pasangan bilangan untuk pengurangan 🔄'],
    badgeEmoji: '🔄',
    badgeNama: 'Master Mundur',
    sections: [
      {
        judul: 'Strategi Menghitung Mundur',
        konten: `<p>Ayo kita belajar trik menghitung mundur untuk pengurangan! 🚶‍♂️</p>
<p>Misalnya kita mau menghitung <code>6 − 2</code>:</p>
<ol style="padding-left: 20px;">
  <li>Ingat angka pertama di kepalamu: <strong>6</strong>!</li>
  <li>Buka 2 jarimu untuk menghitung mundur.</li>
  <li>Hitung mundur 2 langkah dari 6: <strong>lima... empat!</strong></li>
</ol>
<p>Yeeey! Hasilnya adalah <strong>4</strong>! Sungguh gampang! 🎯</p>`,
        quiz: {
          soal: 'Berapakah hasil dari 8 − 3 dengan menghitung mundur dari 8?',
          pilihan: ['5', '6', '7'],
          jawabanIdx: 0
        }
      },
      {
        judul: 'Memakai Pasangan Bilangan',
        konten: `<p>Ingat pasangan bilangan? Kalau <code>3 + 2 = 5</code>, maka <code>5</code> punya pasangan <code>3</code> dan <code>2</code>.</p>
<p>Artinya, kalau angka 5 dibuang 2, sisanya pasti temannya yaitu <strong>3</strong>! 🔄</p>
<p>Contoh: <code>5 - 2 = 3</code>. Jika kamu tahu pasangan bilangan, kamu bisa langsung menebak hasilnya tanpa menghitung!</p>`,
        quiz: {
          soal: 'Kita tahu pasangan 10 adalah 8 dan 2. Maka hasil dari 10 − 8 adalah...',
          pilihan: ['2', '8', '10'],
          jawabanIdx: 0
        }
      }
    ]
  },
  {
    id: 'k1-mtk-08',
    judul: 'Bentuk di Sekitar Kita',
    emoji: '📦',
    deskripsi: 'Mengenal bentuk kotak, segitiga, dan lingkaran di rumah!',
    tujuan: ['Mengenal bentuk segi empat, segitiga, dan lingkaran ⭕', 'Menemukan bentuk datar pada benda-benda sekitar 🏠'],
    badgeEmoji: '🔷',
    badgeNama: 'Penjelajah Bentuk Cilik',
    sections: [
      {
        judul: 'Segi Empat, Segitiga, dan Lingkaran',
        konten: `<p>Ayo kita amati bentuk benda-benda indah di sekitar kita! 📦🔺⭕</p>
<ul style="padding-left: 20px;">
  <li><strong>Segi Empat (Kotak)</strong> = punya 4 sisi garis lurus. Seperti kardus mainan! 📦</li>
  <li><strong>Segitiga</strong> = punya 3 sisi garis lurus. Seperti potongan semangka! 🔺</li>
  <li><strong>Lingkaran</strong> = bulat melengkung tanpa sudut. Seperti ban sepeda! ⭕</li>
</ul>`,
        quiz: {
          soal: 'Buku tulismu yang kotak memiliki bentuk dasar...',
          pilihan: ['Segitiga', 'Segi empat', 'Lingkaran'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Cari Bentuk di Rumah!',
        konten: `<p>Ayo kita jadi detektif bentuk di dalam rumah! 🕵️‍♂️</p>
<ul style="padding-left: 20px;">
  <li>Upe melihat meja makan: bentuknya <strong>segi empat</strong>! 🪑</li>
  <li>Kira melihat jam dinding: bentuknya <strong>lingkaran</strong>! ⏰</li>
  <li>Halim melihat penggaris atap: bentuknya <strong>segitiga</strong>! 📐</li>
</ul>
<p>Wah, semua benda ternyata punya bentuk dasar yang lucu!</p>`,
        quiz: {
          soal: 'Uang koin logam bulat yang biasa dipakai jajan memiliki bentuk...',
          pilihan: ['Segitiga', 'Segi empat', 'Lingkaran'],
          jawabanIdx: 2
        }
      }
    ]
  },
  {
    id: 'k1-mtk-09',
    judul: 'Mengelompokkan Benda',
    emoji: '🧹',
    deskripsi: 'Merapikan mainan berdasarkan warna dan bentuknya!',
    tujuan: ['Mengelompokkan benda berdasarkan bentuk 📦', 'Mengelompokkan benda berdasarkan warna 🔴'],
    badgeEmoji: '🧹',
    badgeNama: 'Master Rapikan',
    sections: [
      {
        judul: 'Kelompokkan Berdasarkan Bentuk',
        konten: `<p>Upe dan Kira selesai bermain. Kamar jadi berantakan! 🧸</p>
<p>Ayo kita rapikan mainan berdasarkan bentuknya!</p>
<ul style="padding-left: 20px;">
  <li>Semua mainan berbentuk bulat (lingkaran) dimasukkan ke keranjang merah. ⭕</li>
  <li>Semua mainan berbentuk kotak (segi empat) dimasukkan ke kotak kuning. 📦</li>
</ul>
<p>Kamar jadi rapi dan bersih sekali! Hore! 🧹</p>`,
        quiz: {
          soal: 'Kira mau memisahkan kelereng bulat dan dadu kotak. Kelereng bulat dimasukkan ke kelompok...',
          pilihan: ['Kelompok Segi Empat', 'Kelompok Lingkaran', 'Kelompok Segitiga'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Kelompokkan Berdasarkan Warna',
        konten: `<p>Selain bentuk, kita juga bisa memisahkan benda berdasarkan warnanya lho! 🎨</p>
<p>Misalnya, Anton punya kancing baju beraneka warna.</p>
<p>Kita kumpulkan kancing yang berwarna 🔴 <strong>Merah</strong> di mangkok kiri, dan kancing berwarna 🔵 <strong>Biru</strong> di mangkok kanan.</p>
<p>Memilah warna membuat benda terlihat sangat indah! 🌈</p>`,
        quiz: {
          soal: 'Upe punya tomat merah 🍅 dan daun hijau 🍃. Upe memisahkan mereka. Kelompok tomat adalah kelompok...',
          pilihan: ['Kelompok warna merah', 'Kelompok warna hijau', 'Kelompok bentuk segitiga'],
          jawabanIdx: 0
        }
      }
    ]
  },
  {
    id: 'k1-mtk-10',
    judul: 'Bilangan 11–15',
    emoji: '🌸',
    deskripsi: 'Yuk, kita belajar menghitung 11 sampai 15 bareng Upe dan Kira!',
    tujuan: ['Menghitung benda 11 sampai 15 🌸', 'Menulis angka belasan dengan mudah ✏️'],
    badgeEmoji: '🌸',
    badgeNama: 'Penghitung Belasan',
    sections: [
      {
        judul: 'Ayo Menghitung 11 sampai 15!',
        konten: `<p>Upe sedang memetik bunga cantik di halaman. 🏡</p>
<p>Bunganya banyak sekali! Ayo bantu Upe menghitung semuanya! 🌸</p>
<p class="emoji-large">🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸</p>
<p>Mari hitung: satu, dua... sepuluh, sebelas, dua belas, tiga belas! Ada <strong>13</strong> bunga!</p>
<p>Cara membaca angka belasan:</p>
<ul style="padding-left: 20px;">
  <li><code>11</code> dibaca sebelas</li>
  <li><code>12</code> dibaca dua belas</li>
  <li><code>13</code> dibaca tiga belas</li>
  <li><code>14</code> dibaca empat belas</li>
  <li><code>15</code> dibaca lima belas</li>
</ul>`,
        quiz: {
          soal: 'Kira menata mainan kelereng: 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮. Ada berapa kelereng?',
          pilihan: ['11 kelereng', '12 kelereng', '13 kelereng'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Menulis Angka 11 sampai 15',
        konten: `<p>Menulis belasan itu seru! Angka 1 selalu berdiri di depan. ✏️</p>
<p>Trik menulisnya:</p>
<ul style="padding-left: 20px;">
  <li><strong>sebelas</strong> = angka 1 dan 1 (seperti dua tiang listrik) 🗼🗼</li>
  <li><strong>dua belas</strong> = angka 1 di depan dan 2 di belakang 🦆</li>
  <li><strong>tiga belas</strong> = angka 1 di depan dan 3 di belakang 🐦</li>
  <li><strong>empat belas</strong> = angka 1 di depan dan 4 di belakang 🪑</li>
  <li><strong>lima belas</strong> = angka 1 di depan dan 5 di belakang 🤡</li>
</ul>`,
        quiz: {
          soal: 'Bagaimana cara menulis angka "lima belas"?',
          pilihan: ['51', '15', '105'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-11',
    judul: 'Bilangan 16–20',
    emoji: '🔢',
    deskripsi: 'Ayo kita berhitung 16 sampai 20 dengan jari tangan dan kaki!',
    tujuan: ['Menghitung benda 16 sampai 20 🚗', 'Berhitung memakai jari tangan dan jari kaki 🖐️'],
    badgeEmoji: '🔢',
    badgeNama: 'Master Dua Puluh',
    sections: [
      {
        judul: 'Ayo Menghitung 16 sampai 20!',
        konten: `<p>Kira punya banyak stiker binatang yang lucu. 🐱</p>
<p>Mari kita hitung stiker Kira bersama-sama! 🦁</p>
<p class="emoji-large">🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁 🦁</p>
<p>Ayo berhitung: sepuluh... lima belas, enam belas, tujuh belas, delapan belas! Ada <strong>18</strong> stiker!</p>
<p>Cara membaca angka belasan besar:</p>
<ul style="padding-left: 20px;">
  <li><code>16</code> dibaca enam belas</li>
  <li><code>17</code> dibaca tujuh belas</li>
  <li><code>18</code> dibaca delapan belas</li>
  <li><code>19</code> dibaca sembilan belas</li>
  <li><code>20</code> dibaca dua puluh</li>
</ul>`,
        quiz: {
          soal: 'Tika punya permen karet: 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬. Ada berapa permen karet?',
          pilihan: ['17 permen', '18 permen', '19 permen'],
          jawabanIdx: 0
        }
      },
      {
        judul: 'Jari Tangan dan Jari Kaki!',
        konten: `<p>Ayo kita hitung total jari tubuh kita! 🖐️🦶</p>
<p>Sepuluh jari tangan digabung dengan sepuluh jari kaki.</p>
<p>Mari hitung: 10 jari tangan ditambah 10 jari kaki menjadi <strong>20</strong> jari semuanya! 🖐️🦶</p>
<p>Wow! Kita punya 20 alat hitung alami di tubuh kita! Keren sekali! 😎</p>`,
        quiz: {
          soal: 'Bagaimana cara menulis angka "dua puluh"?',
          pilihan: ['12', '20', '210'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-12',
    judul: 'Penjumlahan sampai 20',
    emoji: '➕',
    deskripsi: 'Menggabungkan mainan dan makanan seru. Penjumlahan itu gampang!',
    tujuan: ['Menjumlahkan angka belasan tanpa menyimpan 🧸', 'Menggunakan trik teman 10 untuk penjumlahan ➕'],
    badgeEmoji: '➕',
    badgeNama: 'Juru Tambah Belasan',
    sections: [
      {
        judul: 'Tambah Belasan Tanpa Menyimpan',
        konten: `<p>Upe membawa 12 biskuit cokelat manis di piring. 🍪</p>
<p>Kira datang dan memberikan 3 biskuit lagi. 🍪🍪🍪</p>
<p>Ayo hitung totalnya: 12 di kepala, hitung maju 3 langkah: <strong>13, 14, 15!</strong></p>
<p>Jadi, <code>12 + 3 = 15</code>. Ingat angka besar di kepala, hitung maju angka kecilnya! 🧗‍♂️</p>`,
        quiz: {
          soal: 'Berapakah hasil dari 14 + 4 dengan menghitung maju dari 14?',
          pilihan: ['17', '18', '19'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Trik Cari Teman 10',
        konten: `<p>Ayo kita belajar cara menjumlahkan angka lewat 10! ➕</p>
<p>Misalnya kita mau menghitung <code>8 + 7</code>:</p>
<ol style="padding-left: 20px;">
  <li>Angka 8 butuh berapa biar jadi 10? Butuh <strong>2</strong>! 🤝</li>
  <li>Pinjam 2 dari angka 7. Maka 7 sisa <strong>5</strong>.</li>
  <li>Jadinya: 8 + 2 = 10, lalu 10 + 5 = <strong>15</strong>!</li>
</ol>
<p>Wah, penjumlahan besar jadi gampang sekali kalau dibuat jadi 10 dulu! 🌟</p>`,
        quiz: {
          soal: 'Hitunglah 9 + 6 dengan meminjam 1 dari 6 untuk menjadikan 9 jadi 10!',
          pilihan: ['14', '15', '16'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-13',
    judul: 'Pengurangan sampai 20',
    emoji: '➖',
    deskripsi: 'Mengambil biskuit dan mainan. Pengurangan itu seru!',
    tujuan: ['Mengurangi angka belasan tanpa meminjam 🍪', 'Menggunakan trik pecah 10 untuk pengurangan ➖'],
    badgeEmoji: '➖',
    badgeNama: 'Juru Kurang Belasan',
    sections: [
      {
        judul: 'Kurang Belasan Tanpa Meminjam',
        konten: `<p>Malosi membawa 18 lolipop warna-warni. 🍭</p>
<p>Lalu ia bagikan 5 lolipop kepada Tika. 🍭🍭🍭🍭🍭</p>
<p>Berapa sisa lolipop Malosi? Ingat 18 di kepala, hitung mundur 5 langkah: <strong>17, 16, 15, 14, 13!</strong></p>
<p>Jadi, <code>18 - 5 = 13</code>. Gampang sekali kan! 🎯</p>`,
        quiz: {
          soal: 'Berapakah hasil dari 16 − 4 dengan menghitung mundur dari 16?',
          pilihan: ['12', '13', '14'],
          jawabanIdx: 0
        }
      },
      {
        judul: 'Trik Pecah 10',
        konten: `<p>Ayo belajar trik memecah angka 10 untuk pengurangan besar! ➖</p>
<p>Misalnya kita mau menghitung <code>15 − 8</code>:</p>
<ol style="padding-left: 20px;">
  <li>Pecah 15 menjadi <strong>10 dan 5</strong>. 📦</li>
  <li>Kurangi angka 10 dulu: 10 − 8 = <strong>2</strong>.</li>
  <li>Tambahkan sisa 2 dengan 5 tadi: 2 + 5 = <strong>7</strong>!</li>
</ol>
<p>Jadi, <code>15 - 8 = 7</code>. Memecah 10 bikin hitung mundur jadi cepat! 🔄</p>`,
        quiz: {
          soal: 'Hitunglah 13 − 7 dengan memecah 13 menjadi 10 dan 3, lalu 10 − 7 = 3, lalu 3 + 3 = ...',
          pilihan: ['5', '6', '7'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-14',
    judul: 'Lebih dari, Kurang dari, Selisih',
    emoji: '⚖️',
    deskripsi: 'Membandingkan hasil operasi dan mencari bedanya!',
    tujuan: ['Membandingkan hasil dua penjumlahan/pengurangan ⚖️', 'Menghitung beda (selisih) jumlah benda 🌸'],
    badgeEmoji: '⚖️',
    badgeNama: 'Juru Banding Lanjut',
    sections: [
      {
        judul: 'Bandingkan Hasil Hitung!',
        konten: `<p>Ayo bandingkan dua kotak hasil hitungan! ⚖️</p>
<ul style="padding-left: 20px;">
  <li>Kotak A: <code>12 + 5 = 17</code> 🔴</li>
  <li>Kotak B: <code>8 + 6 = 14</code> 🔵</li>
</ul>
<p>Karena 17 lebih besar dari 14, maka hasil Kotak A adalah <strong>lebih dari</strong> Kotak B! 👑</p>`,
        quiz: {
          soal: 'Kotak X berisi 15 - 3 = 12. Kotak Y berisi 10 + 5 = 15. Kotak X adalah...',
          pilihan: ['Lebih dari Kotak Y', 'Kurang dari Kotak Y', 'Sama dengan Kotak Y'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Mencari Bedanya (Selisih)',
        konten: `<p>Upe menggambar 15 bintang kuning. 🌟</p>
<p>Kira menggambar 9 bintang kuning. 🌟</p>
<p>Berapa banyak bedanya bintang Upe dan Kira? Coba kurangi angka besar dengan yang kecil:</p>
<p><code>15 - 9 = 6</code>.</p>
<p>Bintang Upe punya <strong>beda 6</strong> buah lebih banyak dari bintang Kira! 🌸</p>`,
        quiz: {
          soal: 'Tika punya 12 permen. Malosi punya 8 permen. Berapa beda jumlah permen mereka?',
          pilihan: ['3 permen', '4 permen', '5 permen'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-15',
    judul: 'Membandingkan Panjang',
    emoji: '📏',
    deskripsi: 'Lebih panjang, lebih pendek, sama panjang, paling panjang, paling pendek!',
    tujuan: ['Menentukan benda yang lebih panjang atau pendek 🖍️', 'Menemukan benda yang paling panjang atau paling pendek 📏'],
    badgeEmoji: '📏',
    badgeNama: 'Juru Ukur Cilik',
    sections: [
      {
        judul: 'Lebih Panjang dan Lebih Pendek',
        konten: `<p>Upe membawa sebuah pensil kayu baru yang belum diruncing. 🖍️</p>
<p>Kira membawa sebuah krayon warna biru yang sudah sering dipakai. 🖍️</p>
<p>Jika diletakkan sejajar, pensil Upe terlihat lebih maju ujungnya.</p>
<p>Artinya, pensil Upe <strong>lebih panjang</strong> dari krayon Kira. Krayon Kira <strong>lebih pendek</strong> dari pensil Upe! 📏</p>`,
        quiz: {
          soal: 'Penggaris panjang 30 cm dibandingkan dengan penghapus karet kecil. Penghapus karet adalah...',
          pilihan: ['Lebih panjang', 'Lebih pendek', 'Sama panjang'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Paling Panjang dan Paling Pendek',
        konten: `<p>Ayo jejerkan 3 buah benda di mejamu! 📏</p>
<ul style="padding-left: 20px;">
  <li>Penggaris besi (sangat molor ke kanan) 📏</li>
  <li>Spidol warna 🖊️</li>
  <li>Klip kertas kecil 📎</li>
</ul>
<p>Penggaris besi adalah yang <strong>paling panjang</strong>. Klip kertas adalah yang <strong>paling pendek</strong>! 🥇</p>`,
        quiz: {
          soal: 'Di antara: (A) Kereta api, (B) Mobil, (C) Sepeda. Kendaraan mana yang PALING PANJANG?',
          pilihan: ['Kereta api', 'Mobil', 'Sepeda'],
          jawabanIdx: 0
        }
      }
    ]
  },
  {
    id: 'k1-mtk-16',
    judul: 'Mengukur dengan Benda Tidak Baku',
    emoji: '🦶',
    deskripsi: 'Mengukur panjang menggunakan jengkal, kaki, pensil!',
    tujuan: ['Mengukur panjang memakai jengkal tangan dan langkah kaki 🦶', 'Memahami bahwa hasil ukur orang bisa berbeda-beda 📏'],
    badgeEmoji: '🦶',
    badgeNama: 'Juru Jengkal',
    sections: [
      {
        judul: 'Ukur Pakai Jengkal dan Langkah',
        konten: `<p>Kita bisa mengukur panjang benda tanpa penggaris besi lho! 😮</p>
<p>Caranya pakai anggota tubuh kita:</p>
<ul style="padding-left: 20px;">
  <li><strong>Jengkal</strong> = rentangan jari jempol sampai jari kelingkingmu. 🖐️</li>
  <li><strong>Langkah</strong> = jarak satu langkah kakimu saat berjalan biasa. 🚶‍♂️</li>
</ul>
<p>Misalnya, lebar meja belajarmu adalah 4 jengkal tanganmu! 📏</p>`,
        quiz: {
          soal: 'Kira berjalan dari pintu kamar ke kasur. Jaraknya dihitung dengan...',
          pilihan: ['Jengkal tangan', 'Langkah kaki', 'Pensil'],
          jawabanIdx: 1
        }
      },
      {
        judul: 'Mengapa Hasilnya Beda?',
        konten: `<p>Tangan Upe kecil, tangan Ayah besar. 🖐️👨</p>
<p>Saat mengukur meja yang sama:</p>
<ul style="padding-left: 20px;">
  <li>Meja = 6 jengkal Upe (karena tangannya kecil).</li>
  <li>Meja = 4 jengkal Ayah (karena tangannya lebar).</li>
</ul>
<p>Wah! Mengukur pakai tubuh hasilnya bisa <strong>berbeda-beda</strong> karena ukuran tubuh setiap orang tidak sama! 🌟</p>`,
        quiz: {
          soal: 'Siapa yang butuh jengkal LEBIH BANYAK untuk mengukur buku yang sama?',
          pilihan: ['Adik bayi (tangan kecil)', 'Kakak kelas 6 (tangan besar)', 'Sama saja'],
          jawabanIdx: 0
        }
      }
    ]
  },
  {
    id: 'k1-mtk-17',
    judul: 'Mengelompokkan Data',
    emoji: '📋',
    deskripsi: 'Membuat daftar dan tabel sederhana dari mainan kesukaan!',
    tujuan: ['Membuat daftar data sederhana 📋', 'Membaca tabel baris dan kolom 📊'],
    badgeEmoji: '📋',
    badgeNama: 'Juru Daftar',
    sections: [
      {
        judul: 'Membuat Daftar Sederhana',
        konten: `<p>Upe bertanya ke 6 temannya tentang warna baju kesukaan mereka. 📋</p>
<p>Upe mencatatnya dalam daftar:</p>
<ul style="padding-left: 20px;">
  <li>Merah: 3 anak 🔴🔴🔴</li>
  <li>Biru: 2 anak 🔵🔵</li>
  <li>Kuning: 1 anak 🟡</li>
</ul>
<p>Daftar membantu kita melihat informasi dengan sangat jelas! 🌟</p>`,
        quiz: {
          soal: 'Dari daftar baju di atas, warna baju apa yang paling banyak disukai teman Upe?',
          pilihan: ['Merah', 'Biru', 'Kuning'],
          jawabanIdx: 0
        }
      },
      {
        judul: 'Membaca Tabel Sederhana',
        konten: `<p>Tabel adalah daftar yang memiliki baris mendatar dan kolom tegak. 📊</p>
<p>Contoh tabel buah di kulkas Upe:</p>
<table style="width: 100%; border: 2px solid #ccc; text-align: center; font-size: 18px;">
  <tr style="background:#e3f2fd;"><th>Buah</th><th>Jumlah</th></tr>
  <tr><td>Apel 🍎</td><td>5</td></tr>
  <tr><td>Pisang 🍌</td><td>3</td></tr>
</table>
<p>Dari tabel, kita tahu ada 5 apel dan 3 pisang! Sangat rapi! 🍎🍌</p>`,
        quiz: {
          soal: 'Berapa jumlah buah pisang yang ada di kulkas Upe berdasarkan tabel di atas?',
          pilihan: ['5 buah', '3 buah', '8 buah'],
          jawabanIdx: 1
        }
      }
    ]
  },
  {
    id: 'k1-mtk-18',
    judul: 'Diagram Gambar Sederhana',
    emoji: '🎨',
    deskripsi: 'Piktogram dengan gambar/emoji yang seru!',
    tujuan: ['Membaca diagram gambar sederhana 🐱', 'Membuat diagram gambar dari data mainan 🎨'],
    badgeEmoji: '🎨',
    badgeNama: 'Ilustrator Data Cilik',
    sections: [
      {
        judul: 'Membaca Diagram Gambar',
        konten: `<p>Diagram gambar (piktogram) memakai simbol lucu untuk menunjukkan jumlah! 🐱🐶</p>
<p>Contoh diagram hewan peliharaan di rumah Kira:</p>
<ul style="padding-left: 20px;">
  <li>Kucing: 🐱 🐱 🐱 (artinya ada 3 kucing)</li>
  <li>Anjing: 🐶 🐶 (artinya ada 2 anjing)</li>
</ul>
<p>Kita bisa langsung melihat bahwa kucing <strong>lebih banyak</strong> dari anjing! 🐱</p>`,
        quiz: {
          soal: 'Berapa jumlah anjing peliharaan Kira berdasarkan gambar di atas?',
          pilihan: ['2 anjing', '3 anjing', '5 anjing'],
          jawabanIdx: 0
        }
      },
      {
        judul: 'Ayo Membuat Diagram Gambar!',
        konten: `<p>Kira punya 4 robot mainan 🤖 dan 3 mobil mainan 🚗.</p>
<p>Mari kita buat diagram gambarnya agar indah:</p>
<ul style="padding-left: 20px;">
  <li>Robot: 🤖 🤖 🤖 🤖</li>
  <li>Mobil: 🚗 🚗 🚗</li>
</ul>
<p>Keren kan! Gambar membuat matematika jadi sangat menyenangkan! 🎨</p>`,
        quiz: {
          soal: 'Jika kita ingin menambahkan data "2 boneka beruang" ke diagram di atas, gambar apa yang harus ditaruh?',
          pilihan: ['🤖 🤖', '🚗 🚗', '🧸 🧸'],
          jawabanIdx: 2
        }
      }
    ]
  }
];

materiList.forEach(materi => {
  const html = template(materi);
  const filePath = path.join(outDir, `${materi.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath}`);
});
console.log('Script completed!');
