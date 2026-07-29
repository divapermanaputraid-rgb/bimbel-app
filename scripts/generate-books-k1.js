const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas1/matematika');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k1-mtk-01': '#FFFDE7', 'k1-mtk-02': '#FCE4EC', 'k1-mtk-03': '#E3F2FD',
  'k1-mtk-04': '#E8F5E9', 'k1-mtk-05': '#F3E5F5', 'k1-mtk-06': '#FFF3E0',
  'k1-mtk-07': '#FFFDE7', 'k1-mtk-08': '#FCE4EC', 'k1-mtk-09': '#E3F2FD',
  'k1-mtk-10': '#FFFDE7', 'k1-mtk-11': '#FCE4EC', 'k1-mtk-12': '#E3F2FD',
  'k1-mtk-13': '#E8F5E9', 'k1-mtk-14': '#F3E5F5', 'k1-mtk-15': '#FFF3E0',
  'k1-mtk-16': '#FFFDE7', 'k1-mtk-17': '#FCE4EC', 'k1-mtk-18': '#E3F2FD',
};

function renderBook(data) {
  const bg = bgColors[data.id];
  // Flatten all quiz answers: bagian1 (idx0), bagian2 (idx1), latihan (idx2,3,4)
  const jawaban = [
    data.bagian1.quiz.jawabanIdx,
    data.bagian2.quiz.jawabanIdx,
    data.latihan[0].jawabanIdx,
    data.latihan[1].jawabanIdx,
    data.latihan[2].jawabanIdx,
  ];

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — Kelas 1</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body class="kelas1" data-kelas="1" data-pelajaran="mtk" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #c2185b; margin:0 0 8px 0; font-size: 28px;">${data.judul}</h1>
        <p style="color: #666; font-size: 20px;">Matematika — Kelas 1</p>
        <p style="margin-top: 16px; font-size: 20px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Yuk Mulai! 🚀</button>
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

    <!-- Bagian 1 -->
    <div class="section-card">
      <div class="section-header">📚 Bagian 1: ${data.bagian1.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        ${data.bagian1.konten}
        <div class="quiz-box" data-idx="0" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 20px;">🤔 Coba tebak:</p>
          <p style="font-size: 20px;">${data.bagian1.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian1.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>
      </div>
    </div>

    <!-- Bagian 2 -->
    <div class="section-card">
      <div class="section-header">📚 Bagian 2: ${data.bagian2.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        ${data.bagian2.konten}
        <div class="quiz-box" data-idx="1" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 20px;">🤔 Coba tebak:</p>
          <p style="font-size: 20px;">${data.bagian2.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian2.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">📝 Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <p style="font-weight:bold; font-size: 22px;">💪 Ayo kerjakan soal-soal di bawah ini!</p>
        <p style="color: #666;">Klik jawaban yang menurutmu benar ya 😊</p>

        ${data.latihan.map((soal, si) => {
          const idx = si + 2;
          return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 20px;">${si + 1}. ${soal.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 20px;">
        <p>Kamu sudah belajar tentang <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">Kamu mendapatkan badge istimewa:</p>
        <div style="font-size: 80px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #c2185b; font-size: 24px;">${data.badgeNama}</p>
        <p style="color: #666; margin-top: 8px;">⭐⭐⭐⭐⭐</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai! 🎉</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Selesaikan semua kuis di atas dulu ya 🧐)</p>
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
    window._QUIZ_ANSWERS = [${jawaban.join(', ')}];
    window._TOTAL_SECTIONS = 5;
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

const materiList = [
  // ===== k1-mtk-01: Mengenal Bilangan 1–5 =====
  {
    id: 'k1-mtk-01',
    judul: 'Mengenal Bilangan 1–5',
    emoji: '🍎',
    deskripsi: 'Yuk, kita belajar menghitung 1 sampai 5 bareng Upe dan Kira! 🍎🧸',
    tujuan: ['Menghitung benda 1 sampai 5 🍎', 'Menulis angka 1, 2, 3, 4, 5 ✏️', 'Mengurutkan bilangan dari 1 sampai 5 🔢'],
    badgeEmoji: '🍎',
    badgeNama: 'Penghitung Cilik',
    bagian1: {
      judul: 'Ayo Menghitung 1 sampai 5!',
      konten: `<p>Upe dan Kira sedang di kebun apel. 🌳</p>
<p>Wah, ada buah yang jatuh dari pohon! Ayo bantu Upe menghitung apel di keranjangnya! 🧺</p>
<p class="emoji-large">🍎 🍎 🍎</p>
<p>Mari hitung satu per satu: <strong>satu... dua... tiga!</strong> Ada <strong>3</strong> apel! 🎉</p>
<p>Upe punya 3 apel manis. Nyam nyam! 😋</p>
<p>Sekarang coba lihat jari tanganmu. Buka 1 jari 🖐️, terus 2 jari, 3 jari, 4 jari, 5 jari! Kita punya 5 jari di satu tangan! Hebat! ⭐</p>`,
      quiz: {
        soal: 'Kira punya kupu-kupu lucu di tangannya. Coba hitung: 🦋 🦋 🦋 🦋 🦋. Ada berapa kupu-kupu?',
        pilihan: ['3 kupu-kupu', '4 kupu-kupu', '5 kupu-kupu'],
        jawabanIdx: 2,
      },
    },
    bagian2: {
      judul: 'Ayo Menulis dan Mengurutkan Angka!',
      konten: `<p>Sekarang, ayo kita tulis angkanya! ✏️</p>
<p>Trik mengingat bentuk angka:</p>
<ul style="padding-left: 20px;">
  <li><strong>1</strong> = seperti tiang lurus 🗼</li>
  <li><strong>2</strong> = seperti bebek berenang 🦆</li>
  <li><strong>3</strong> = seperti burung terbang 🐦</li>
  <li><strong>4</strong> = seperti kursi terbalik 🪑</li>
  <li><strong>5</strong> = seperti badut punya perut gendut 🤡</li>
</ul>
<p>Yuk, coba gambar angkanya di udara pakai jarimu! Syuuut! ✨</p>
<p>Urutan bilangan: <strong>1 — 2 — 3 — 4 — 5</strong>. Semakin ke kanan, semakin besar! 🚀</p>`,
      quiz: {
        soal: 'Angka mana yang mirip dengan bebek berenang di air? 🦆',
        pilihan: ['Angka 1', 'Angka 2', 'Angka 3'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Berapakah jumlah apel ini? 🍎 🍎 🍎 🍎', pilihan: ['3 apel', '4 apel', '5 apel'], jawabanIdx: 1 },
      { soal: 'Lambang bilangan dari "tiga" adalah...', pilihan: ['1', '2', '3'], jawabanIdx: 2 },
      { soal: 'Urutan yang benar dari yang terkecil adalah...', pilihan: ['3, 2, 1', '1, 2, 3', '2, 1, 3'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-02: Mengenal Bilangan 6–10 =====
  {
    id: 'k1-mtk-02',
    judul: 'Mengenal Bilangan 6–10',
    emoji: '🐛',
    deskripsi: 'Kita lanjut belajar bilangan 6 sampai 10 bersama Upe dan Kira! 🐛🎈',
    tujuan: ['Menghitung benda 6 sampai 10 🐛', 'Menulis angka 6, 7, 8, 9, 10 ✏️', 'Berhitung pakai 10 jari tangan 🖐️'],
    badgeEmoji: '🐛',
    badgeNama: 'Penghitung Ulat',
    bagian1: {
      judul: 'Ayo Menghitung 6 sampai 10!',
      konten: `<p>Kira sedang melihat ulat kecil di daun. 🍃</p>
<p>Ulatnya lucu-lucu sekali! Ayo hitung bersama Kira! 🐛</p>
<p class="emoji-large">🐛 🐛 🐛 🐛 🐛 🐛 🐛</p>
<p>Mari hitung: satu, dua, tiga, empat, lima... <strong>enam, tujuh!</strong> Ada <strong>7</strong> ekor ulat! 🎉</p>
<p>Wah, banyak sekali teman-teman ulat Kira! Mereka sedang makan daun bersama. Nyam nyam! 🍃😋</p>`,
      quiz: {
        soal: 'Tika punya balon warna-warni! Coba hitung: 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈. Ada berapa balon?',
        pilihan: ['8 balon', '9 balon', '10 balon'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Menulis dan Berhitung dengan 10 Jari!',
      konten: `<p>Sekarang ayo kita belajar menulis angka 6 sampai 10! ✏️</p>
<p>Trik mengingat:</p>
<ul style="padding-left: 20px;">
  <li><strong>6</strong> = seperti selang air melingkar 💧</li>
  <li><strong>7</strong> = seperti tongkat petruk 🪄</li>
  <li><strong>8</strong> = seperti boneka salju berdua ☃️</li>
  <li><strong>9</strong> = seperti balon terbang ke atas 🎈</li>
  <li><strong>10</strong> = seperti 1 dan 0 main petak umpet 🕳️</li>
</ul>
<p>Coba buka 10 jari tanganmu! 🖐️🖐️ Ada 5 jari kanan dan 5 jari kiri. Kalau digabung jadi 10! Hebat! 🌟</p>`,
      quiz: {
        soal: 'Buka satu tangan penuh (5 jari). Tambah 1 jari dari tangan lain. Ada berapa jari terbuka?',
        pilihan: ['5 jari', '6 jari', '7 jari'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Berapakah jumlah bintang ini? ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐', pilihan: ['7 bintang', '8 bintang', '9 bintang'], jawabanIdx: 1 },
      { soal: 'Lambang bilangan "sembilan" adalah...', pilihan: ['6', '8', '9'], jawabanIdx: 2 },
      { soal: 'Sepuluh jari tangan adalah...', pilihan: ['5 jari', '10 jari', '15 jari'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-03: Pasangan Bilangan =====
  {
    id: 'k1-mtk-03',
    judul: 'Pasangan Bilangan',
    emoji: '🎈',
    deskripsi: 'Belajar memisahkan dan menggabungkan bilangan! Seru banget! 🎈🧸',
    tujuan: ['Memahami pasangan bilangan sampai 5 🎈', 'Memisahkan benda jadi 2 kelompok 🧸', 'Menemukan berbagai pasangan bilangan 🔢'],
    badgeEmoji: '🎈',
    badgeNama: 'Master Pasangan',
    bagian1: {
      judul: 'Ayo Cari Pasangan Bilangan!',
      konten: `<p>Upe punya 5 balon warna-warni! 🎈🎈🎈🎈🎈</p>
<p>Kira datang dan membantu Upe memegang balon-balon itu.</p>
<p>5 balon bisa dibagi jadi 2 kelompok. Coba lihat:</p>
<ul style="padding-left: 20px;">
  <li>Kira pegang 2 balon 🎈🎈, Upe pegang 3 balon 🎈🎈🎈. Berarti <strong>2 + 3 = 5</strong>! 🎉</li>
  <li>Atau Kira pegang 1 balon 🎈, Upe pegang 4 balon 🎈🎈🎈🎈. Berarti <strong>1 + 4 = 5</strong>!</li>
  <li>Atau semuanya dipegang Upe: 5 + 0 = 5! 🤗</li>
</ul>
<p>Wah, satu angka bisa punya banyak pasangan! Hebat! ⭐</p>`,
      quiz: {
        soal: 'Upe punya 5 permen. Kira pegang 2 permen. Berapa permen yang dipegang Upe? 🍬',
        pilihan: ['2 permen', '3 permen', '4 permen'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Pisahkan Kelereng ke Dua Kelompok!',
      konten: `<p>Sekarang coba pisahkan 8 kelereng jadi 2 kelompok! 🔮</p>
<p>Malosi punya 8 kelereng warna-warni. Dia ingin memasukkannya ke 2 kotak. 🔮🔮🔮🔮🔮🔮🔮🔮</p>
<p>Berapa kelereng di setiap kotak? Banyak kemungkinan:</p>
<ul style="padding-left: 20px;">
  <li>Kotak merah: 3 kelereng, Kotak biru: 5 kelereng → <strong>3 + 5 = 8</strong> ✅</li>
  <li>Kotak merah: 4 kelereng, Kotak biru: 4 kelereng → <strong>4 + 4 = 8</strong> ✅</li>
  <li>Kotak merah: 7 kelereng, Kotak biru: 1 kelereng → <strong>7 + 1 = 8</strong> ✅</li>
</ul>
<p>Banyak sekali cara memisahkan 8! Coba cari cara lainnya! 🤔</p>`,
      quiz: {
        soal: 'Mana yang BUKAN pasangan dari 6?',
        pilihan: ['2 + 4 = 6', '3 + 3 = 6', '4 + 3 = 6'],
        jawabanIdx: 2,
      },
    },
    latihan: [
      { soal: '5 = 1 + ...', pilihan: ['3', '4', '5'], jawabanIdx: 1 },
      { soal: 'Mana pasangan yang benar untuk 7?', pilihan: ['2 + 4 = 7', '3 + 4 = 7', '5 + 3 = 7'], jawabanIdx: 1 },
      { soal: 'Upe punya 4 apel 🍎🍎🍎🍎. Kira punya 1 apel 🍎. Berapa jumlah semuanya?', pilihan: ['4 apel', '5 apel', '6 apel'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-04: Membandingkan Bilangan =====
  {
    id: 'k1-mtk-04',
    judul: 'Membandingkan Bilangan',
    emoji: '🦕',
    deskripsi: 'Ayo belajar mana yang lebih banyak, lebih sedikit, atau sama! 🦕🎈',
    tujuan: ['Menentukan lebih banyak dan lebih sedikit 🦕', 'Menentukan sama banyak 🎈', 'Membandingkan dua kelompok benda ⚖️'],
    badgeEmoji: '🦕',
    badgeNama: 'Pembanding Hebat',
    bagian1: {
      judul: 'Lebih Banyak dan Lebih Sedikit!',
      konten: `<p>Upe punya 5 apel merah segar. 🍎🍎🍎🍎🍎</p>
<p>Tika punya 3 apel hijau. 🍎🍎🍎</p>
<p>Wah, siapa yang punya apel paling banyak? <strong>Upe!</strong> 🙋‍♂️</p>
<p>Apel Upe <strong>lebih banyak</strong> dari apel Tika. Apel Tika <strong>lebih sedikit</strong> dari apel Upe. 🎯</p>
<p>Gampang kan? Tinggal lihat siapa yang punya benda paling banyak! 👀</p>`,
      quiz: {
        soal: 'Malosi punya 7 kelereng 🔮🔮🔮🔮🔮🔮🔮. Kira punya 4 kelereng 🔮🔮🔮🔮. Siapa yang lebih sedikit?',
        pilihan: ['Malosi', 'Kira', 'Sama banyak'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Sama Banyak!',
      konten: `<p>Sekarang Upe punya 4 permen. 🍬🍬🍬🍬</p>
<p>Kira juga punya 4 permen. 🍬🍬🍬🍬</p>
<p>Jumlah permen mereka sama! Tidak ada yang kurang, tidak ada yang lebih. Semuanya pas! 😊</p>
<p>Artinya, permen Upe dan Kira adalah <strong>sama banyak</strong>! 🤝</p>
<p>Coba ingat: sama banyak artinya jumlahnya sama persis! ⭐</p>`,
      quiz: {
        soal: 'Di piring ada 3 donat 🍩🍩🍩. Di meja juga ada 3 donat 🍩🍩🍩. Donat di piring dan meja adalah...',
        pilihan: ['Lebih banyak', 'Lebih sedikit', 'Sama banyak'],
        jawabanIdx: 2,
      },
    },
    latihan: [
      { soal: 'Mana yang LEBIH BANYAK? 🐱🐱🐱🐱 atau 🐶🐶🐶', pilihan: ['🐱🐱🐱🐱', '🐶🐶🐶', 'Sama banyak'], jawabanIdx: 0 },
      { soal: 'Kelas A punya 8 siswa. Kelas B punya 8 siswa. Berarti...', pilihan: ['Kelas A lebih banyak', 'Kelas B lebih banyak', 'Sama banyak'], jawabanIdx: 2 },
      { soal: 'Bilangan yang LEBIH KECIL dari 7 adalah...', pilihan: ['4', '8', '9'], jawabanIdx: 0 },
    ],
  },

  // ===== k1-mtk-05: Cerita Penjumlahan =====
  {
    id: 'k1-mtk-05',
    judul: 'Cerita Penjumlahan',
    emoji: '🍬',
    deskripsi: 'Belajar menjumlah lewat cerita seru Upe dan teman-teman! 🍬🧸',
    tujuan: ['Menjumlahkan benda dari cerita sehari-hari 🍎', 'Memahami arti tanda + dan = ➕', 'Menyelesaikan soal cerita penjumlahan 📖'],
    badgeEmoji: '🍬',
    badgeNama: 'Kapten Tambah',
    bagian1: {
      judul: 'Upe dan Apel-Apel Manis!',
      konten: `<p>Upe punya 3 apel merah. 🍎🍎🍎</p>
<p>Kira datang dan kasih 2 apel lagi kepada Upe. 🍎🍎</p>
<p>"Nih Upe, buat kamu!" kata Kira. 😊</p>
<p>Sekarang Upe punya berapa apel? Ayo hitung bareng:</p>
<p><strong>3 apel + 2 apel = ...</strong></p>
<p>Hitung: 1, 2, 3 (apel Upe), 4, 5 (apel Kira). Sekarang ada <strong>5 apel!</strong> 🎉</p>
<p>Jadi <strong>3 + 2 = 5</strong>! Gampang sekali! 🌟</p>`,
      quiz: {
        soal: 'Malosi punya 4 mobil-mobilan 🚗🚗🚗🚗. Tika kasih 1 mobil lagi 🚗. Berapa mobil Malosi sekarang?',
        pilihan: ['4 mobil', '5 mobil', '6 mobil'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Simbol Penjumlahan!',
      konten: `<p>Di matematika, ada simbol rahasia untuk penjumlahan! 🤫</p>
<ul style="padding-left: 20px;">
  <li><strong>+</strong> dibaca <strong>"tambah"</strong> ➕ artinya menggabungkan benda</li>
  <li><strong>=</strong> dibaca <strong>"sama dengan"</strong> artinya hasilnya</li>
</ul>
<p>Contoh cerita tadi ditulis: <strong>3 + 2 = 5</strong></p>
<p>Dibaca: "Tiga tambah dua sama dengan lima" 🗣️</p>
<p>Coba yang lain: Upe punya 1 kue 🧁, Kira kasih 3 kue 🧁🧁🧁. Maka <strong>1 + 3 = 4</strong>! Yummy! 😋</p>`,
      quiz: {
        soal: 'Mana penulisan yang benar untuk: "Empat kelereng ditambah satu kelereng"?',
        pilihan: ['4 - 1 = 3', '4 + 1 = 5', '4 = 1 + 5'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Tika punya 2 bunga 🌸🌸. Upe kasih 2 bunga lagi 🌸🌸. Berapa bunga Tika sekarang?', pilihan: ['2 bunga', '3 bunga', '4 bunga'], jawabanIdx: 2 },
      { soal: '3 + 2 = ...', pilihan: ['4', '5', '6'], jawabanIdx: 1 },
      { soal: 'Ada 5 bebek 🐤🐤🐤🐤🐤 di kolam. Datang 3 bebek lagi 🐤🐤🐤. Berapa bebek sekarang?', pilihan: ['7 bebek', '8 bebek', '9 bebek'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-06: Cara Menjumlahkan =====
  {
    id: 'k1-mtk-06',
    judul: 'Cara Menjumlahkan',
    emoji: '✋',
    deskripsi: 'Belajar trik menjumlah pakai jari dan garis bilangan! ✋📏',
    tujuan: ['Menjumlah pakai jari tangan 🖐️', 'Menjumlah pakai garis bilangan 📏', 'Sifat komutatif: 2+3 sama dengan 3+2 🔄'],
    badgeEmoji: '✋',
    badgeNama: 'Jari Ajaib',
    bagian1: {
      judul: 'Menjumlah pakai Jari Tangan!',
      konten: `<p>Tangan kita punya 10 jari yang hebat! Yuk kita gunakan untuk berhitung! 🖐️</p>
<p>Misalnya <strong>2 + 3</strong>:</p>
<ol style="padding-left: 20px;">
  <li>Buka 2 jari dari tangan kanan ✌️</li>
  <li>Buka 3 jari dari tangan kiri 🤟</li>
  <li>Gabung dan hitung semua: <strong>1, 2, 3, 4, 5!</strong></li>
</ol>
<p>Hasilnya <strong>5</strong>! Jari kita memang ajaib! ⭐</p>
<p>Sekarang coba 3 + 4. Buka 3 jari, tambah 4 jari. Hitung semua: 7! Hebat! 🎉</p>`,
      quiz: {
        soal: 'Coba buka 2 jari + 3 jari. Ada berapa jari terbuka semua? ✌️🤟',
        pilihan: ['4 jari', '5 jari', '6 jari'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Garis Bilangan dan Sifat Komutatif!',
      konten: `<p>Garis bilangan adalah garis ajaib yang membantu kita berhitung! 📏</p>
<p>Untuk <strong>2 + 3</strong>: mulai dari angka 2, lalu lompat maju 3 langkah: 3... 4... 5! Sampai di angka 5! 🐸</p>
<p style="background:#fff8e1; padding:12px; border-radius:8px; margin:12px 0; border-left:4px solid #fbc02d; text-align:center; font-size:24px;">
0 — 1 — 2 — <strong>3</strong> → <strong>4</strong> → <strong>5</strong> 🐸
</p>
<p>Tahukah kamu? <strong>2 + 3 = 5</strong> dan <strong>3 + 2 = 5</strong>. Hasilnya SAMA! Ini namanya <strong>sifat komutatif</strong>! 🔄</p>
<p>Jadi berapapun urutannya, hasil penjumlahan tetap sama! Ajaib! 🌟</p>`,
      quiz: {
        soal: 'Mana yang memiliki hasil SAMA dengan 2 + 5?',
        pilihan: ['5 + 2', '5 - 2', '2 - 5'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: 'Berapakah 3 + 4 jika dihitung pakai jari?', pilihan: ['6', '7', '8'], jawabanIdx: 1 },
      { soal: 'Mulai dari 4, lompat maju 3 langkah. Sampai angka berapa? 🐸', pilihan: ['6', '7', '8'], jawabanIdx: 1 },
      { soal: '4 + 1 sama dengan ...', pilihan: ['1 + 4', '4 - 1', '5 - 4'], jawabanIdx: 0 },
    ],
  },

  // ===== k1-mtk-07: Cerita Pengurangan =====
  {
    id: 'k1-mtk-07',
    judul: 'Cerita Pengurangan',
    emoji: '🍭',
    deskripsi: 'Cerita seru tentang permen yang dimakan dan balon yang meletus! 🍭🎈',
    tujuan: ['Memahami konsep berkurang lewat cerita 🍭', 'Mengenal simbol − (kurang) ➖', 'Menyelesaikan soal cerita pengurangan 📖'],
    badgeEmoji: '🍭',
    badgeNama: 'Pengurang Jago',
    bagian1: {
      judul: 'Permen Upe yang Dimakan!',
      konten: `<p>Upe punya 5 permen lolipop yang manis! 🍭🍭🍭🍭🍭</p>
<p>"Nyam nyam, enak sekali!" Upe memakan 2 permen. 😋</p>
<p>Sisa berapa permen Upe sekarang? Ayo hitung!</p>
<p><strong>5 permen − 2 permen = ...</strong></p>
<p>Hitung mundur: 5, ambil 1 sisa 4, ambil 1 lagi sisa <strong>3</strong>! 🎉</p>
<p>Sisa permen Upe adalah <strong>3</strong>! Berkurang artinya diambil atau dimakan! 🍭</p>`,
      quiz: {
        soal: 'Kira punya 6 balon 🎈🎈🎈🎈🎈🎈. Meletus 2 balon 💥💥. Berapa sisa balon Kira?',
        pilihan: ['3 balon', '4 balon', '5 balon'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Simbol Pengurangan!',
      konten: `<p>Di matematika, kita pakai simbol <strong>−</strong> untuk berkurang. Dibaca <strong>"kurang"</strong> ➖</p>
<p>Kalau bendanya diambil, dimakan, pecah, atau hilang — kita pakai simbol ini!</p>
<p>Cerita tadi ditulis: <strong>5 − 2 = 3</strong></p>
<p>Dibaca: "Lima kurang dua sama dengan tiga" 🗣️</p>
<p>Contoh lain: Ada 4 bebek 🐤🐤🐤🐤. Pergi 1 bebek 🐤. Maka <strong>4 − 1 = 3</strong>! 🎯</p>`,
      quiz: {
        soal: 'Mana penulisan yang benar untuk: "Tujuh balon dikurangi tiga balon"?',
        pilihan: ['7 + 3 = 10', '7 - 3 = 4', '7 = 3 - 4'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Malosi punya 8 kue 🧁🧁🧁🧁🧁🧁🧁🧁. Dimakan 3 kue 😋. Sisa berapa?', pilihan: ['4 kue', '5 kue', '6 kue'], jawabanIdx: 1 },
      { soal: '10 − 4 = ...', pilihan: ['5', '6', '7'], jawabanIdx: 1 },
      { soal: 'Ada 7 burung 🐦🐦🐦🐦🐦🐦🐦 di pohon. Terbang 2 burung. Sisa berapa?', pilihan: ['4 burung', '5 burung', '6 burung'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-08: Cara Mengurangi =====
  {
    id: 'k1-mtk-08',
    judul: 'Cara Mengurangi',
    emoji: '📏',
    deskripsi: 'Belajar trik mengurangi pakai jari dan garis bilangan! 📏✋',
    tujuan: ['Mengurangi dengan menghitung sisa 🖐️', 'Mengurangi dengan mundur di garis bilangan 📏', 'Memahami pasangan bilangan untuk pengurangan 🔄'],
    badgeEmoji: '📏',
    badgeNama: 'Garis Juara',
    bagian1: {
      judul: 'Hitung Sisa dengan Jari!',
      konten: `<p>Mari belajar cara mengurangi pakai jari tangan! 🖐️</p>
<p>Misalnya <strong>5 − 3</strong>:</p>
<ol style="padding-left: 20px;">
  <li>Buka 5 jari tanganmu 🖐️</li>
  <li>Tutup 3 jari (yang diambil) ✊</li>
  <li>Hitung jari yang masih terbuka: <strong>1, 2!</strong></li>
</ol>
<p>Hasilnya <strong>2</strong>! Sisa jari yang terbuka adalah jawabannya! ⭐</p>
<p>Sekarang coba 7 − 4. Buka 7 jari, tutup 4. Sisa berapa? 3! Hebat! 🎉</p>`,
      quiz: {
        soal: 'Coba buka 6 jari, tutup 2 jari. Berapa jari yang masih terbuka? 🖐️',
        pilihan: ['3 jari', '4 jari', '5 jari'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Mundur di Garis Bilangan!',
      konten: `<p>Kita juga bisa mengurangi dengan mundur di garis bilangan! 📏</p>
<p>Untuk <strong>6 − 2</strong>: mulai dari 6, lalu mundur 2 langkah: 5... 4! Sampai di angka 4! 🐸</p>
<p style="background:#fff8e1; padding:12px; border-radius:8px; margin:12px 0; border-left:4px solid #fbc02d; text-align:center; font-size:24px;">
0 — 1 — 2 — 3 — <strong>4</strong> 🐸 ← 5 ← <strong>6</strong>
</p>
<p>Pasangan bilangan juga membantu! Kalau 3 + 2 = 5, maka 5 − 3 = 2. Pasangan tak terpisahkan! 🔄</p>`,
      quiz: {
        soal: 'Mulai dari 9, mundur 4 langkah. Sampai di angka berapa? 🐸',
        pilihan: ['4', '5', '6'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: '8 − 3 = ... (pakai jari atau hitung mundur)', pilihan: ['4', '5', '6'], jawabanIdx: 1 },
      { soal: 'Mulai dari 7, mundur 2 langkah. Sampai angka? 🐸', pilihan: ['4', '5', '6'], jawabanIdx: 1 },
      { soal: 'Kalau 4 + 3 = 7, maka 7 − 4 = ...', pilihan: ['2', '3', '4'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-09: Bangun Datar di Sekitar Kita =====
  {
    id: 'k1-mtk-09',
    judul: 'Bangun Datar di Sekitar Kita',
    emoji: '⬛',
    deskripsi: 'Yuk kenali persegi, segitiga, dan lingkaran di rumah kita! ⬛🔺⭕',
    tujuan: ['Mengenal persegi, persegi panjang, segitiga, lingkaran 🔵', 'Menemukan bangun datar di benda sekitar 🏠', 'Membedakan bentuk-bentuk dasar 👀'],
    badgeEmoji: '⬛',
    badgeNama: 'Detektif Bentuk',
    bagian1: {
      judul: 'Empat Bentuk Ajaib!',
      konten: `<p>Di sekitar kita ada banyak bentuk! Ayo kenali 4 bentuk ajaib ini! ✨</p>
<ul style="padding-left: 20px; font-size: 22px;">
  <li><strong>Persegi ⬛</strong> — 4 sisi SAMA panjang. Seperti dadu! 🎲</li>
  <li><strong>Persegi Panjang ▬</strong> — 4 sisi, 2 panjang dan 2 pendek. Seperti pintu! 🚪</li>
  <li><strong>Segitiga 🔺</strong> — 3 sisi. Seperti penggaris segitiga! 📐</li>
  <li><strong>Lingkaran ⭕</strong> — bulat, tanpa sudut. Seperti uang koin! 🪙</li>
</ul>
<p>Wah, banyak sekali bentuk di sekitar kita! Coba lihat ke sekelilingmu! 👀</p>`,
      quiz: {
        soal: 'Bentuk apakah yang memiliki 3 sisi? 🔺',
        pilihan: ['Persegi', 'Segitiga', 'Lingkaran'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Bentuk di Rumah Kita!',
      konten: `<p>Ayo jadi detektif bentuk! Cari benda-benda ini di rumahmu! 🕵️‍♂️</p>
<ul style="padding-left: 20px;">
  <li>Papan tulis di kelas → <strong>persegi panjang</strong> ⬭</li>
  <li>Jam dinding → <strong>lingkaran</strong> ⭕</li>
  <li>Sandal jepit → <strong>segitiga</strong> △ (bagian depannya!)</li>
  <li>Ubin lantai → <strong>persegi</strong> ⬛</li>
</ul>
<p>Semua benda punya bentuk dasar! Seru kan jadi detektif bentuk! 🕵️‍♂️⭐</p>`,
      quiz: {
        soal: 'Jam dinding biasanya berbentuk apa? ⏰',
        pilihan: ['Persegi', 'Segitiga', 'Lingkaran'],
        jawabanIdx: 2,
      },
    },
    latihan: [
      { soal: 'Bentuk yang memiliki 4 sisi sama panjang adalah...', pilihan: ['Persegi ⬛', 'Persegi panjang ▬', 'Segitiga 🔺'], jawabanIdx: 0 },
      { soal: 'Bola sepak memiliki bentuk dasar... ⚽', pilihan: ['Persegi', 'Segitiga', 'Lingkaran'], jawabanIdx: 2 },
      { soal: 'Berapa jumlah sisi segitiga? 🔺', pilihan: ['2 sisi', '3 sisi', '4 sisi'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-10: Mengelompokkan Benda =====
  {
    id: 'k1-mtk-10',
    judul: 'Mengelompokkan Benda',
    emoji: '🧹',
    deskripsi: 'Belajar mengelompokkan benda berdasarkan warna, bentuk, dan ukuran! 🧹📦',
    tujuan: ['Mengelompokkan benda berdasarkan warna 🎨', 'Mengelompokkan benda berdasarkan bentuk 🔵', 'Mengelompokkan benda berdasarkan ukuran 📏'],
    badgeEmoji: '🧹',
    badgeNama: 'Master Rapikan',
    bagian1: {
      judul: 'Kelompokkan Berdasarkan Warna!',
      konten: `<p>Upe punya crayon warna-warni! 🖍️🖍️🖍️</p>
<p>Wah, berantakan sekali! Ayo bantu Upe merapikannya! 🧹</p>
<p>Upe punya 3 crayon merah 🔴🔴🔴 dan 2 crayon biru 🔵🔵.</p>
<p>Kita kelompokkan: crayon merah dimasukkan ke kotak merah, crayon biru ke kotak biru. 📦</p>
<p>Sekarang rapi sekali! Mengelompokkan artinya menyatukan benda yang sama! ✨</p>
<p>Coba lihat sekelilingmu. Ada benda warna merah dan biru? Kelompokkan! 🎯</p>`,
      quiz: {
        soal: 'Upe punya 🖍️🖍️🖍️ (merah) dan 🖍️🖍️ (biru). Berapa jumlah crayon merah? 🔴',
        pilihan: ['2 crayon', '3 crayon', '5 crayon'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Kelompokkan Berdasarkan Bentuk dan Ukuran!',
      konten: `<p>Sekarang Kira punya mainan dengan berbagai bentuk! 🧸</p>
<ul style="padding-left: 20px;">
  <li>Bola bundar: ⚽⚽⚽ (3 bola)</li>
  <li>Kubus kotak: 🧊🧊 (2 kubus)</li>
</ul>
<p>Kita kelompokkan berdasarkan bentuk: semua bola masuk keranjang bundar, semua kubus masuk kotak! 📦</p>
<p>Bisa juga berdasarkan ukuran: besar di rak atas, kecil di rak bawah! 📏</p>
<p>Wah, kamar jadi rapi dan indah! Keren! 🌟</p>`,
      quiz: {
        soal: 'Mana yang termasuk kelompok BENDA BUNDAR? ⭕',
        pilihan: ['Bola ⚽', 'Kubus 🧊', 'Buku 📖'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: '🍎🍎🍎 (apel) dan 🍌🍌 (pisang). Kelompok apel ada...', pilihan: ['2 apel', '3 apel', '5 apel'], jawabanIdx: 1 },
      { soal: 'Mana yang TIDAK termasuk kelompok warna merah? 🔴', pilihan: ['🍎 apel merah', '🌻 bunga matahari', '🛑 rambu berhenti'], jawabanIdx: 1 },
      { soal: 'Kelompok BESAR dan KECIL. 🐘 gajah masuk ke kelompok...', pilihan: ['Kelompok besar', 'Kelompok kecil', 'Dua-duanya'], jawabanIdx: 0 },
    ],
  },

  // ===== k1-mtk-11: Bilangan 11–15 =====
  {
    id: 'k1-mtk-11',
    judul: 'Bilangan 11–15',
    emoji: '🌸',
    deskripsi: 'Yuk, kita belajar menghitung 11 sampai 15 bareng Upe dan Kira! 🌸🔢',
    tujuan: ['Menghitung benda 11 sampai 15 🌸', 'Menulis angka 11 sampai 15 ✏️', 'Mengurutkan bilangan 11–15 🔢'],
    badgeEmoji: '🌸',
    badgeNama: 'Penghitung Belasan',
    bagian1: {
      judul: 'Ayo Menghitung 11 sampai 15!',
      konten: `<p>Upe sedang memetik bunga cantik di taman. 🏡</p>
<p>Bunganya banyak sekali! Ayo bantu Upe menghitung! 🌸</p>
<p class="emoji-large">🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸</p>
<p>Mari hitung: 1, 2, 3... 10, <strong>11, 12, 13!</strong> Ada <strong>13</strong> bunga! 🎉</p>
<p>Cara membaca angka belasan:</p>
<ul style="padding-left: 20px;">
  <li><strong>11</strong> dibaca sebelas</li>
  <li><strong>12</strong> dibaca dua belas</li>
  <li><strong>13</strong> dibaca tiga belas</li>
  <li><strong>14</strong> dibaca empat belas</li>
  <li><strong>15</strong> dibaca lima belas</li>
</ul>
<p>Semua angka belasan pakai "belas" di belakangnya! Gampang! ⭐</p>`,
      quiz: {
        soal: 'Kira punya kelereng: 🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮🔮. Ada berapa?',
        pilihan: ['11 kelereng', '12 kelereng', '13 kelereng'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Menulis dan Mengurutkan 11–15!',
      konten: `<p>Menulis angka belasan itu mudah! Angka 1 selalu di depan. ✏️</p>
<ul style="padding-left: 20px;">
  <li><strong>11</strong> = angka 1 dan 1 (seperti dua tiang) 🗼🗼</li>
  <li><strong>12</strong> = angka 1 dan 2 🦆</li>
  <li><strong>13</strong> = angka 1 dan 3 🐦</li>
  <li><strong>14</strong> = angka 1 dan 4 🪑</li>
  <li><strong>15</strong> = angka 1 dan 5 🤡</li>
</ul>
<p>Urutan dari terkecil: <strong>11 — 12 — 13 — 14 — 15</strong> 🚀</p>
<p>Coba tebak, angka berapa yang ada di antara 12 dan 14? Hayo! 🤔</p>`,
      quiz: {
        soal: 'Lambang bilangan "lima belas" adalah...',
        pilihan: ['51', '15', '105'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Berapakah 10 + 3? (digambar pakai jari)', pilihan: ['12', '13', '14'], jawabanIdx: 1 },
      { soal: 'Angka sebelum 14 adalah...', pilihan: ['12', '13', '15'], jawabanIdx: 1 },
      { soal: 'Urutan yang benar dari yang terkecil: 14, 11, 13', pilihan: ['11, 13, 14', '14, 13, 11', '13, 11, 14'], jawabanIdx: 0 },
    ],
  },

  // ===== k1-mtk-12: Bilangan 16–20 =====
  {
    id: 'k1-mtk-12',
    judul: 'Bilangan 16–20',
    emoji: '🔢',
    deskripsi: 'Ayo kita berhitung 16 sampai 20 dengan jari tangan dan kaki! 🔢🖐️',
    tujuan: ['Menghitung benda 16 sampai 20 🔢', 'Menulis angka 16 sampai 20 ✏️', 'Pasangan bilangan 11–20 🔄'],
    badgeEmoji: '🔢',
    badgeNama: 'Master Dua Puluh',
    bagian1: {
      judul: 'Ayo Menghitung 16 sampai 20!',
      konten: `<p>Kira punya stiker bintang yang berkilau! ⭐</p>
<p>Yuk kita hitung bersama! 🎉</p>
<p class="emoji-large">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</p>
<p>Ayo berhitung: sepuluh, sebelas... <strong>16, 17, 18!</strong> Ada <strong>18</strong> bintang! 🌟</p>
<p>Cara membaca:</p>
<ul style="padding-left: 20px;">
  <li><strong>16</strong> = enam belas</li>
  <li><strong>17</strong> = tujuh belas</li>
  <li><strong>18</strong> = delapan belas</li>
  <li><strong>19</strong> = sembilan belas</li>
  <li><strong>20</strong> = dua puluh</li>
</ul>
<p>Kalau sudah sampai 20, namanya berubah jadi "dua puluh"! ✨</p>`,
      quiz: {
        soal: 'Tika punya permen: 🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬. Ada berapa?',
        pilihan: ['16 permen', '17 permen', '18 permen'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Jari Tangan dan Jari Kaki!',
      konten: `<p>Ayo hitung semua jari di tubuh kita! 🖐️🦶</p>
<p>10 jari tangan + 10 jari kaki = <strong>20 jari</strong>! Hebat! 😎</p>
<p>Pasangan bilangan 11–20:</p>
<ul style="padding-left: 20px;">
  <li><strong>15</strong> = 10 + 5</li>
  <li><strong>18</strong> = 10 + 8</li>
  <li><strong>20</strong> = 10 + 10</li>
</ul>
<p>Semua bilangan 11–19 adalah 10 ditambah sesuatu! Coba 14 = 10 + ...? 🤔</p>`,
      quiz: {
        soal: 'Lambang bilangan "dua puluh" adalah...',
        pilihan: ['12', '20', '210'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: '10 jari tangan + 8 jari kaki (dibayangkan) = ... jari', pilihan: ['16', '18', '20'], jawabanIdx: 1 },
      { soal: 'Angka 19 dibaca...', pilihan: ['Sembilan belas', 'Satu sembilan', 'Dua puluh'], jawabanIdx: 0 },
      { soal: '15 = 10 + ...', pilihan: ['4', '5', '6'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-13: Penjumlahan sampai 20 =====
  {
    id: 'k1-mtk-13',
    judul: 'Penjumlahan sampai 20',
    emoji: '➕',
    deskripsi: 'Belajar menjumlahkan bilangan besar sampai 20! Seru banget! ➕🧮',
    tujuan: ['Menjumlahkan dua bilangan hasil sampai 20 ➕', 'Menggunakan trik 10 untuk penjumlahan 🧮', 'Sifat komutatif penjumlahan 🔄'],
    badgeEmoji: '➕',
    badgeNama: 'Juru Tambah Belasan',
    bagian1: {
      judul: 'Menjumlah dengan Trik 10!',
      konten: `<p>Kira punya 12 permen manis! 🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬</p>
<p>Upe kasih 7 permen lagi! 🍬🍬🍬🍬🍬🍬🍬</p>
<p>Sekarang Kira punya berapa? Ayo hitung! 12 + 7 = ... 🤔</p>
<p>Gampang! 12 + 7 = 10 + 2 + 7 = 10 + 9 = <strong>19</strong>! 🎉</p>
<p>Ingat: pisah dulu angka 10-nya, baru jumlahkan sisanya! 🧮</p>
<p>Contoh lain: 8 + 5 = 8 + 2 + 3 = 10 + 3 = <strong>13</strong>! Hebat! ⭐</p>`,
      quiz: {
        soal: 'Berapakah 8 + 5? (trik: 8 + 2 + 3 = ...)',
        pilihan: ['12', '13', '14'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Sifat Komutatif Penjumlahan!',
      konten: `<p>Tahukah kamu? <strong>5 + 3 = 8</strong> dan <strong>3 + 5 = 8</strong>! Hasilnya SAMA! 🔄</p>
<p>Ini namanya <strong>sifat komutatif</strong> — angka boleh ditukar, hasilnya tetap! ✨</p>
<p>Coba yang lebih besar:</p>
<ul style="padding-left: 20px;">
  <li>12 + 7 = 19 ✅</li>
  <li>7 + 12 = 19 ✅ (SAMA!)</li>
</ul>
<p>Jadi kalau lupa 12+7, ingat aja 7+12! Gampang kan! 🌟</p>
<p>Upe punya 13 kue 🧁, Kira kasih 6 kue 🧁. 13 + 6 = 19! Atau 6 + 13 = 19! 🎉</p>`,
      quiz: {
        soal: 'Mana yang SAMA dengan 9 + 7?',
        pilihan: ['7 + 9', '9 - 7', '7 - 9'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: 'Berapakah 12 + 5?', pilihan: ['15', '16', '17'], jawabanIdx: 2 },
      { soal: 'Kira punya 15 🍬. Upe kasih 3 🍬. Berapa sekarang?', pilihan: ['17 🍬', '18 🍬', '19 🍬'], jawabanIdx: 1 },
      { soal: 'Mana yang hasilnya PALING BESAR?', pilihan: ['8 + 5', '9 + 4', '7 + 7'], jawabanIdx: 2 },
    ],
  },

  // ===== k1-mtk-14: Pengurangan sampai 20 =====
  {
    id: 'k1-mtk-14',
    judul: 'Pengurangan sampai 20',
    emoji: '➖',
    deskripsi: 'Belajar mengurangi bilangan besar lewat cerita seru! ➖🍪',
    tujuan: ['Mengurangi bilangan sampai 20 ➖', 'Menghitung sisa dengan trik 10 🧮', 'Pasangan bilangan untuk pengurangan 🔄'],
    badgeEmoji: '➖',
    badgeNama: 'Juru Kurang Belasan',
    bagian1: {
      judul: 'Kue yang Dimakan!',
      konten: `<p>Malosi punya 15 kue cokelat! 🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁</p>
<p>"Nyam nyam!" Malosi makan 6 kue. 😋</p>
<p>Sisa berapa? 15 − 6 = ... 🤔</p>
<p>Trik pecah 10: 15 = 10 + 5. 10 − 6 = 4. 4 + 5 = <strong>9</strong>! 🎉</p>
<p>Sisa kue Malosi adalah <strong>9</strong> kue! Yummy! 🧁</p>`,
      quiz: {
        soal: 'Kira punya 20 balon 🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈. Meletus 8. Sisa berapa?',
        pilihan: ['10 balon', '12 balon', '14 balon'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Pasangan Bilangan untuk Pengurangan!',
      konten: `<p>Ingat pasangan bilangan? Kalau <strong>13 + 6 = 19</strong>, maka <strong>19 − 6 = 13</strong>! 🔄</p>
<p>Pasangan tak terpisahkan! 🤝</p>
<p>Contoh:</p>
<ul style="padding-left: 20px;">
  <li>12 + 7 = 19 → 19 − 7 = 12 ✅</li>
  <li>8 + 5 = 13 → 13 − 5 = 8 ✅</li>
  <li>15 + 4 = 19 → 19 − 4 = 15 ✅</li>
</ul>
<p>Kalau hafal pasangan, pengurangan jadi super gampang! ⭐</p>`,
      quiz: {
        soal: 'Kalau 14 + 5 = 19, maka 19 − 5 = ...',
        pilihan: ['13', '14', '15'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: '18 − 7 = ...', pilihan: ['9', '10', '11'], jawabanIdx: 2 },
      { soal: 'Upe punya 16 🍭, dikasih ke Tika 4 🍭. Sisa Upe...', pilihan: ['10 🍭', '11 🍭', '12 🍭'], jawabanIdx: 2 },
      { soal: 'Kalau 9 + 6 = 15, maka 15 − 9 = ...', pilihan: ['5', '6', '7'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-15: Lebih, Kurang, dan Selisih =====
  {
    id: 'k1-mtk-15',
    judul: 'Lebih, Kurang, dan Selisih',
    emoji: '⚖️',
    deskripsi: 'Belajar membandingkan bilangan dan mencari selisihnya! ⚖️🔢',
    tujuan: ['Membandingkan dua bilangan lebih/kurang ⚖️', 'Menghitung selisih dua bilangan ➖', 'Menyelesaikan soal cerita selisih 📖'],
    badgeEmoji: '⚖️',
    badgeNama: 'Juru Banding Lanjut',
    bagian1: {
      judul: 'Lebih Banyak dan Lebih Sedikit!',
      konten: `<p>Upe punya 15 apel merah segar. 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎</p>
<p>Kira punya 9 apel hijau. 🍎🍎🍎🍎🍎🍎🍎🍎🍎</p>
<p>Siapa yang LEBIH BANYAK? <strong>UPE!</strong> 🙋‍♂️</p>
<p>15 lebih banyak dari 9. 9 lebih sedikit dari 15. Gampang! 👀</p>
<p>Selisihnya berapa? 15 − 9 = <strong>6</strong>! Upe punya 6 apel lebih banyak! 🎯</p>`,
      quiz: {
        soal: 'Malosi punya 17 kelereng 🔮. Tika punya 12 kelereng 🔮. Siapa yang lebih sedikit?',
        pilihan: ['Malosi', 'Tika', 'Sama banyak'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Mencari Selisih!',
      konten: `<p>Selisih artinya beda atau jarak antara dua bilangan. 📏</p>
<p>Cara cari selisih: <strong>bilangan besar − bilangan kecil = selisih</strong> ➖</p>
<p>Contoh:</p>
<ul style="padding-left: 20px;">
  <li>Upe 15 apel, Kira 9 apel. Selisih = 15 − 9 = <strong>6</strong> 🍎</li>
  <li>Kira 12 bintang, Tika 7 bintang. Selisih = 12 − 7 = <strong>5</strong> ⭐</li>
  <li>Malosi 20 permen, Upe 14 permen. Selisih = 20 − 14 = <strong>6</strong> 🍬</li>
</ul>
<p>Gampang kan? Tinggal kurangi angka besar dengan angka kecil! 🎉</p>`,
      quiz: {
        soal: 'Tika punya 13 bunga 🌸. Malosi punya 8 bunga 🌸. Berapa selisihnya?',
        pilihan: ['4', '5', '6'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Mana yang LEBIH BESAR: 18 atau 14?', pilihan: ['18', '14', 'Sama besar'], jawabanIdx: 0 },
      { soal: 'Selisih antara 20 dan 15 adalah...', pilihan: ['3', '4', '5'], jawabanIdx: 2 },
      { soal: 'Upe punya 19 🍭, Kira punya 11 🍭. Selisihnya...', pilihan: ['6 🍭', '7 🍭', '8 🍭'], jawabanIdx: 2 },
    ],
  },

  // ===== k1-mtk-16: Membandingkan Panjang Benda =====
  {
    id: 'k1-mtk-16',
    judul: 'Membandingkan Panjang Benda',
    emoji: '📏',
    deskripsi: 'Belajar mana yang lebih panjang, lebih pendek, atau sama panjang! 📏✏️',
    tujuan: ['Menentukan lebih panjang dan lebih pendek 📏', 'Menentukan sama panjang 📐', 'Mengurutkan benda dari terpendek ke terpanjang 📊'],
    badgeEmoji: '📏',
    badgeNama: 'Juru Ukur Cilik',
    bagian1: {
      judul: 'Lebih Panjang dan Lebih Pendek!',
      konten: `<p>Upe punya pensil panjang. ✏️ Kira punya penghapus pendek. ●</p>
<p>Kalau ditaruh bersebelahan, pensil Upe lebih panjang! 📏</p>
<p>Coba lihat benda di sekitarmu:</p>
<ul style="padding-left: 20px;">
  <li>Penggaris lebih <strong>panjang</strong> dari penghapus 📏 > ●</li>
  <li>Spidol lebih <strong>panjang</strong> dari klip kertas 🖊️ > 📎</li>
  <li>Meja lebih <strong>panjang</strong> dari buku 📐 > 📖</li>
</ul>
<p>Bandingkan: mana yang lebih panjang, pensil atau penggarismu? 🤔</p>`,
      quiz: {
        soal: 'Mana yang LEBIH PENDEK? 👀',
        pilihan: ['Pensil ✏️', 'Penghapus ●', 'Penggaris 📏'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Sama Panjang dan Urutan Panjang!',
      konten: `<p>Kadang dua benda punya panjang yang SAMA! 😊</p>
<p>Dua pensil baru dari kotak biasanya sama panjang! ✏️ = ✏️</p>
<p>Sekarang urutkan dari yang TERPENDEK ke TERPANJANG:</p>
<ol style="padding-left: 20px;">
  <li>Penghapus ● (paling pendek)</li>
  <li>Pensil ✏️ (sedang)</li>
  <li>Penggaris 📏 (paling panjang)</li>
</ol>
<p>Coba urutkan pensil, buku, dan lemari di rumahmu! 🏠</p>`,
      quiz: {
        soal: 'Urutan dari TERPENDEK: klip 📎, pensil ✏️, penggaris 📏',
        pilihan: ['📏, ✏️, 📎', '📎, ✏️, 📏', '✏️, 📎, 📏'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Mana yang LEBIH PANJANG? 🐍 ular atau 🐛 ulat?', pilihan: ['🐍 ular', '🐛 ulat', 'Sama panjang'], jawabanIdx: 0 },
      { soal: 'Paling PANJANG di antara: pensil, meja, penghapus', pilihan: ['Pensil ✏️', 'Meja 📐', 'Penghapus ●'], jawabanIdx: 1 },
      { soal: 'Dua spidol baru biasanya...', pilihan: ['Sama panjang', 'Berbeda panjang', 'Pendek semua'], jawabanIdx: 0 },
    ],
  },

  // ===== k1-mtk-17: Mengukur dengan Benda Tidak Baku =====
  {
    id: 'k1-mtk-17',
    judul: 'Mengukur dengan Benda Tidak Baku',
    emoji: '🦶',
    deskripsi: 'Mengukur panjang pakai jengkal, langkah, dan pensil! 🦶📏',
    tujuan: ['Mengukur pakai jengkal tangan 🖐️', 'Mengukur pakai langkah kaki 🚶', 'Memahami hasil ukur bisa berbeda 📏'],
    badgeEmoji: '🦶',
    badgeNama: 'Juru Jengkal',
    bagian1: {
      judul: 'Ukur Pakai Jengkal dan Langkah!',
      konten: `<p>Kita bisa mengukur tanpa penggaris! Pakai anggota tubuh! 🖐️</p>
<ul style="padding-left: 20px;">
  <li><strong>Jengkal</strong> = rentang jempol ke kelingking 🖐️</li>
  <li><strong>Depa</strong> = rentangan kedua tangan 🤲</li>
  <li><strong>Langkah</strong> = jarak satu langkah kaki 🚶</li>
</ul>
<p>Meja Upe = 5 jengkal. Meja Kira = 4 jengkal. </p>
<p>Berarti meja Upe <strong>lebih panjang</strong> dari meja Kira! 🎯</p>
<p>Coba ukur buku tulismu pakai jengkal! Ada berapa jengkal? 🤔</p>`,
      quiz: {
        soal: 'Kira mengukur meja dengan langkah kaki. Dari pintu ke jendela = 8 langkah. Alat ukurnya adalah...',
        pilihan: ['Jengkal', 'Langkah kaki', 'Pensil'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Mengapa Hasilnya Bisa Beda?',
      konten: `<p>Tangan Upe kecil, tangan Ayah besar. 🖐️👨</p>
<p>Saat mengukur meja yang SAMA:</p>
<ul style="padding-left: 20px;">
  <li>Meja = 6 jengkal Upe (karena tangan kecil)</li>
  <li>Meja = 4 jengkal Ayah (karena tangan besar)</li>
</ul>
<p>Wah! Beda orang, beda hasil ukurnya! Karena ukuran tubuh tiap orang tidak sama! 🌟</p>
<p>Itulah kenapa kita pakai penggaris untuk ukur yang pasti! 📏</p>`,
      quiz: {
        soal: 'Siapa yang butuh jengkal LEBIH BANYAK untuk mengukur meja yang sama?',
        pilihan: ['Adik bayi (tangan kecil)', 'Kakak kelas 6 (tangan besar)', 'Sama saja'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: 'Alat ukur TIDAK BAKU adalah...', pilihan: ['Penggaris 📏', 'Jengkal tangan 🖐️', 'Meteran 📐'], jawabanIdx: 1 },
      { soal: 'Untuk mengukur panjang kelas, paling cocok pakai...', pilihan: ['Jengkal', 'Langkah kaki', 'Pensil'], jawabanIdx: 1 },
      { soal: 'Mengapa hasil jengkal Upe dan Ayah berbeda?', pilihan: ['Mejanya beda', 'Ukuran tangan beda', 'Salah hitung'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-mtk-18: Mengelompokkan Data dan Diagram Gambar =====
  {
    id: 'k1-mtk-18',
    judul: 'Mengelompokkan Data dan Diagram Gambar',
    emoji: '🎨',
    deskripsi: 'Belajar membuat tabel dan diagram gambar yang seru! 🎨📊',
    tujuan: ['Membaca data dalam tabel sederhana 📋', 'Membaca diagram gambar (piktogram) 🎨', 'Membuat diagram gambar dari data 🖍️'],
    badgeEmoji: '🎨',
    badgeNama: 'Ilustrator Data Cilik',
    bagian1: {
      judul: 'Membaca Tabel Sederhana!',
      konten: `<p>Upe mencatat hewan peliharaan teman-temannya! 📋</p>
<table style="width:100%; border:2px solid #ccc; text-align:center; font-size:18px; margin:12px 0;">
  <tr style="background:#e3f2fd;"><th>Hewan</th><th>Jumlah</th></tr>
  <tr><td>Kucing 🐱</td><td>3</td></tr>
  <tr><td>Anjing 🐶</td><td>2</td></tr>
  <tr><td>Ikan 🐟</td><td>5</td></tr>
</table>
<p>Dari tabel kita tahu: kucing ada 3, anjing ada 2, ikan ada 5! 📊</p>
<p>Hewan apa yang PALING BANYAK? Ikan! 🐟🎉</p>`,
      quiz: {
        soal: 'Dari tabel di atas, hewan yang PALING SEDIKIT adalah...',
        pilihan: ['Kucing 🐱', 'Anjing 🐶', 'Ikan 🐟'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Diagram Gambar (Piktogram)!',
      konten: `<p>Diagram gambar memakai emoji untuk menunjukkan jumlah! 🎨</p>
<p>Data hewan Upe dalam diagram gambar:</p>
<ul style="padding-left: 20px; font-size: 22px;">
  <li>🐱🐱🐱 (3 kucing)</li>
  <li>🐶🐶 (2 anjing)</li>
  <li>🐟🐟🐟🐟🐟 (5 ikan)</li>
</ul>
<p>Dengan diagram gambar, kita langsung bisa lihat mana yang paling banyak dan paling sedikit! 👀</p>
<p>Coba buat diagram gambar untuk: 4 apel 🍎 dan 3 pisang 🍌!</p>`,
      quiz: {
        soal: 'Kalau ada data: 🍎🍎🍎🍎 (4) dan 🍌🍌 (2). Buah apa yang PALING BANYAK?',
        pilihan: ['🍎 Apel', '🍌 Pisang', 'Sama banyak'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: 'Tabel: 🚗=4, 🚲=2, ✈️=3. Kendaraan paling banyak adalah...', pilihan: ['🚗 Mobil', '🚲 Sepeda', '✈️ Pesawat'], jawabanIdx: 0 },
      { soal: 'Diagram: 🐱🐱🐱🐱🐱 (5), 🐶🐶🐶 (3). Selisih kucing dan anjing...', pilihan: ['1', '2', '3'], jawabanIdx: 1 },
      { soal: 'Kalau 🐟🐟🐟🐟 berarti ada... ikan', pilihan: ['3 ikan', '4 ikan', '5 ikan'], jawabanIdx: 1 },
    ],
  },
];

materiList.forEach(materi => {
  const html = renderBook(materi);
  const filePath = path.join(outDir, `${materi.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath}`);
});
console.log('Done! 9 K1 MTK books generated successfully!');
