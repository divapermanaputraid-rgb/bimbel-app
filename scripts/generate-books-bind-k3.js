const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas3/bahasa-indonesia');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k3-bind-01': '#FFFDE7', 'k3-bind-02': '#FCE4EC', 'k3-bind-03': '#E3F2FD',
  'k3-bind-04': '#E8F5E9', 'k3-bind-05': '#F3E5F5', 'k3-bind-06': '#FFF3E0',
  'k3-bind-07': '#FFFDE7', 'k3-bind-08': '#FCE4EC',
};

function renderQuizBox(quiz, idx) {
  return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed #ddd;">
          <p style="font-weight: bold; font-size: 17px;">🤔 ${quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            ${quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:10px; font-weight:bold; font-size: 17px;"></div>
        </div>`;
}

function renderBook(data) {
  const bg = bgColors[data.id];
  // 2 checkpoint bagian1 + 2 checkpoint bagian2 + 4 latihan = 8
  const jawaban = [
    data.bagian1.quiz[0].jawabanIdx,
    data.bagian1.quiz[1].jawabanIdx,
    data.bagian2.quiz[0].jawabanIdx,
    data.bagian2.quiz[1].jawabanIdx,
    data.latihan[0].jawabanIdx,
    data.latihan[1].jawabanIdx,
    data.latihan[2].jawabanIdx,
    data.latihan[3].jawabanIdx,
  ];

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — Kelas 3</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas3 { font-size:17px; line-height:1.8; }
    .kelas3 .section-header { font-size:19px; }
    .kelas3 .section-body { font-size:17px; }
    .kelas3 .quiz-box p { font-size:17px; }
    .kelas3 .feedback { font-size:17px; }
    .kelas3 h1 { font-size:24px; }
  </style>
</head>
<body class="kelas3" data-kelas="3" data-pelajaran="bind" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 72px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #2e7d32; margin:0 0 8px 0; font-size: 24px;">${data.judul}</h1>
        <p style="color: #666; font-size: 17px;">Bahasa Indonesia — Kelas 3</p>
        <p style="margin-top: 16px; font-size: 17px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Yuk Mulai! 🚀</button>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Bagian 1 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 1: ${data.bagian1.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        ${data.bagian1.konten}
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 1</p>
        ${renderQuizBox(data.bagian1.quiz[0], 0)}
        ${renderQuizBox(data.bagian1.quiz[1], 1)}
      </div>
    </div>

    <!-- Bagian 2 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 2: ${data.bagian2.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        ${data.bagian2.konten}
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 2</p>
        ${renderQuizBox(data.bagian2.quiz[0], 2)}
        ${renderQuizBox(data.bagian2.quiz[1], 3)}
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <p style="font-weight:bold; font-size: 19px;">💪 Ayo kerjakan soal-soal di bawah ini!</p>
        <p style="color: #666;">Klik jawaban yang menurutmu benar ya 😊</p>

        ${data.latihan.map((soal, si) => {
          const idx = si + 4;
          return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 17px;">${si + 1}. ${soal.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 17px;"></div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 17px;">
        <p>Kamu sudah belajar tentang <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">Kamu mendapatkan badge istimewa:</p>
        <div style="font-size: 72px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #2e7d32; font-size: 22px;">${data.badgeNama}</p>
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
      <div class="ai-header">Tutor AI (Kakak Kelas 6)</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Halo! Aku kakak kelas. Mau tanya soal ${data.judul}? Aku siap bantu! 📚</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>

  <script>
    window._QUIZ_ANSWERS = [${jawaban.join(', ')}];
    window._TOTAL_SECTIONS = 8;
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

const materiList = [
  // ===== k3-bind-01: Ayo, Main! =====
  {
    id: 'k3-bind-01',
    judul: 'Ayo, Main!',
    emoji: '🏃',
    deskripsi: 'Ayo kenali permainan tradisional dan modern! Belajar aturan bermain dan kerja sama! 🏃⚽',
    tujuan: ['Mengenal permainan tradisional dan modern 🎯', 'Memahami pentingnya aturan bermain 📋', 'Bekerja sama saat bermain 🤝'],
    badgeEmoji: '🏃',
    badgeNama: 'Juru Bermain',
    bagian1: {
      judul: 'Permainan Tradisional!',
      konten: `<p>Halo teman-teman! Perhatikan! Hari ini Alfa dan Galih bermain di lapangan. 🏃‍♂️</p>
<p>"Ayo main gobak sodor!" seru Alfa. 🎉</p>
<p>Gobak sodor adalah permainan tradisional. Ada dua tim. Tim A jaga garis, tim B coba lewat! 🚧</p>
<p>Alfa dan Galih di tim yang sama. Mereka <strong>bekerja sama</strong>! 💪</p>
<p>"Kamu jaga garis depan, aku jaga garis belakang!" kata Galih. 🗣️</p>
<p>Permainan tradisional lain yang seru:</p>
<ul style="padding-left: 20px;">
  <li>🙈 Petak umpet — sembunyi dan cari</li>
  <li>🤸 Lompat tali — lompat bareng teman</li>
  <li>🪁 Layang-layang — terbang di angin</li>
  <li>🏃 Gobak sodor — lewat garis jaga</li>
</ul>
<p>Wah, seru sekali main di luar! Badan sehat, hati senang! 🌟</p>`,
      quiz: [
        { soal: "'Bekerja sama' artinya...", pilihan: ['Sendirian', 'Bersama-sama 🤝', 'Berantem'], jawabanIdx: 1 },
        { soal: 'Gobak sodor adalah permainan...', pilihan: ['Modern 🎮', 'Tradisional 🏃', 'Dalam ruangan'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Aturan Bermain dan Kerja Sama!',
      konten: `<p>Meutia datang. "Boleh ikut?" tanya Meutia. 🙋‍♀️</p>
<p>"Boleh! Tapi kita harus ikuti aturan!" kata Alfa. 📋</p>
<p><strong>Aturan bermain yang baik:</strong></p>
<ul style="padding-left: 20px;">
  <li>✅ Jujur — jangan curang</li>
  <li>🤝 Hormati lawan — jangan mengejek</li>
  <li>😊 Terima kekalahan — jangan marah</li>
  <li>👏 Rayakan kemenangan bersama</li>
</ul>
<p>Andi main video game di rumah. 🎮 Itu permainan modern. Seru juga, tapi main di luar lebih sehat! 🌞</p>
<p>"Ayo, kita bisa!" seru Alfa saat hampir kalah. Mereka semangat terus! 💪</p>
<p>Akhirnya tim Alfa menang. Semua tepuk tangan, termasuk lawan! 👏</p>
<p>Itulah semangat sportif! Hebat! ⭐</p>`,
      quiz: [
        { soal: 'Alfa dan Galih ____ main gobak sodor.', pilihan: ['Bekerja sama 🤝', 'Berkelahi', 'Sendirian'], jawabanIdx: 0 },
        { soal: 'Sikap yang benar saat kalah adalah...', pilihan: ['Marah', 'Mengejek', 'Menerima dengan legowo 😊'], jawabanIdx: 2 },
      ],
    },
    latihan: [
      { soal: 'Permainan tradisional yang pakai tali disebut...', pilihan: ['Gobak sodor', 'Lompat tali 🤸', 'Video game'], jawabanIdx: 1 },
      { soal: 'Aturan bermain penting supaya...', pilihan: ['Main jadi adil 📋', 'Main jadi membosankan', 'Main jadi kacau'], jawabanIdx: 0 },
      { soal: '🤝 = ...', pilihan: ['Berkelahi', 'Tolong-menolong / kerja sama', 'Sendirian'], jawabanIdx: 1 },
      { soal: 'Susun: s-e-m-a-n-g-a-t →', pilihan: ['semnagat', 'semangat ✅', 'smangat'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-bind-02: Kawan Seiring =====
  {
    id: 'k3-bind-02',
    judul: 'Kawan Seiring',
    emoji: '🤝',
    deskripsi: 'Ayo belajar tentang persahabatan sejati! Saling membantu dan memaafkan! 🤝💕',
    tujuan: ['Memahami arti persahabatan sejati 🤝', 'Saling membantu saat teman kesulitan 💪', 'Belajar memaafkan kesalahan teman 🙏'],
    badgeEmoji: '🤝',
    badgeNama: 'Juru Berteman',
    bagian1: {
      judul: 'Apa Itu Sahabat?',
      konten: `<p>Coba perhatikan! Meutia dan Andi adalah sahabat baik. 👫</p>
<p>Setiap hari mereka main bersama. Belajar bersama. Tertawa bersama. 😊</p>
<p>Suatu hari, Meutia jatuh saat lari di lapangan. 😢</p>
<p>Andi langsung datang. "Meutia, kamu baik-baik saja?" tanya Andi. 🗣️</p>
<p>Andi membantunya bangun. "Terima kasih, Andi!" kata Meutia. 🙏</p>
<p>"Sama-sama, Meutia! Ayo, kita istirahat dulu." 🤝</p>
<p><strong>Sahabat sejati</strong> adalah teman yang:</p>
<ul style="padding-left: 20px;">
  <li>🤗 Ada saat kita senang DAN sedih</li>
  <li>💪 Membantu tanpa diminta</li>
  <li>🗣️ Jujur tapi tetap baik</li>
  <li>🙏 Mau memaafkan</li>
</ul>
<p>Wah, Andi hebat sekali jadi sahabat! ⭐</p>`,
      quiz: [
        { soal: 'Saat Meutia jatuh, Andi...', pilihan: ['Pergi menjauh', 'Membantu Meutia bangun 🤝', 'Tertawa'], jawabanIdx: 1 },
        { soal: 'Sahabat sejati ada saat kita...', pilihan: ['Senang saja', 'Sedih saja', 'Senang DAN sedih 🤗'], jawabanIdx: 2 },
      ],
    },
    bagian2: {
      judul: 'Memaafkan dan Saling Menolong!',
      konten: `<p>Keesokan harinya, Andi tidak sengaja merusak pensil Meutia. ✏️💥</p>
<p>"Aduh, maaf Meutia!" kata Andi menyesal. 😔</p>
<p>Meutia diam sebentar. Lalu tersenyum. "Tidak apa-apa, Andi. Aku maafkan!" 😊</p>
<p>Andi senang sekali. "Terima kasih! Nanti aku belikan pensil baru!" 🎁</p>
<p><strong>Memaafkan</strong> artinya melepaskan rasa marah dan memberi kesempatan kedua. 💚</p>
<p>Alfa juga punya sahabat. Namanya Galih. Mereka sering bertengkar kecil. Tapi selalu berdamai! 🤝</p>
<p>"Kalau sahabat berbuat salah, kita maafkan. Kalau kita berbuat salah, kita minta maaf!" kata Bu Guru. 👩‍🏫</p>
<p>Itulah kawan seiring — saling jaga, saling maaf, saling sayang! 🌟</p>`,
      quiz: [
        { soal: 'Memaafkan artinya...', pilihan: ['Marah terus', 'Melepaskan rasa marah 💚', 'Membalas dendam'], jawabanIdx: 1 },
        { soal: 'Kalau kita berbuat salah, kita harus...', pilihan: ['Diam saja', 'Minta maaf 🙏', 'Kabur'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Sahabat sejati adalah teman yang...', pilihan: ['Hanya ada saat senang', 'Ada saat senang dan sedih 🤗', 'Suka mengejek'], jawabanIdx: 1 },
      { soal: 'Andi merusak pensil Meutia. Sikap Meutia yang benar...', pilihan: ['Marah terus', 'Memaafkan 😊', 'Membalas rusak barang Andi'], jawabanIdx: 1 },
      { soal: '🤝 = ...', pilihan: ['Berkelahi', 'Tolong-menolong', 'Sendirian'], jawabanIdx: 1 },
      { soal: "'Saling membantu' artinya...", pilihan: ['Membantu satu sama lain 💪', 'Menunggu dibantu', 'Menolak bantuan'], jawabanIdx: 0 },
    ],
  },

  // ===== k3-bind-03: Pengobar Semangat =====
  {
    id: 'k3-bind-03',
    judul: 'Pengobar Semangat',
    emoji: '🎖️',
    deskripsi: 'Ayo kenali tokoh inspirasi yang pantang menyerah! Semangat belajar seperti mereka! 🎖️💪',
    tujuan: ['Mengenal tokoh inspirasi Indonesia 🎖️', 'Memahami arti pantang menyerah 💪', 'Semangat belajar meski sulit 📚'],
    badgeEmoji: '🎖️',
    badgeNama: 'Juru Semangat',
    bagian1: {
      judul: 'Jenderal Sudirman, Pahlawan Hebat!',
      konten: `<p>Perhatikan! Pak Guru bercerita di kelas. 👩‍🏫</p>
<p>"Anak-anak, hari ini kita belajar tentang Jenderal Sudirman!" 🎖️</p>
<p>Jenderal Sudirman adalah pahlawan Indonesia. Dia memimpin perang gerilya. 🇮🇩</p>
<p>Tapi, dia sakit parah. Tubuhnya lemah. 🤒</p>
<p>Meski sakit, dia tetap berjuang! Digotong di atas tandu oleh prajuritnya. 💪</p>
<p>"Pantang menyerah!" itulah semboyannya. 🔥</p>
<p>Alfa terkesan. "Wah, hebat sekali! Meski sakit, tetap berjuang!" 😮</p>
<p><strong>Pantang menyerah</strong> artinya tidak mudah putus asa. Terus mencoba meski sulit! 🌟</p>
<p>Siapa di sini yang pernah hampir menyerah? Ayo angkat tangan! 🙋</p>`,
      quiz: [
        { soal: 'Siapa yang pantang menyerah meski sakit?', pilihan: ['Jenderal Sudirman 🎖️', 'Budi yang mudah menyerah', 'Andi yang malas'], jawabanIdx: 0 },
        { soal: "'Pantang menyerah' artinya...", pilihan: ['Mudah putus asa', 'Tidak mudah putus asa 💪', 'Malas mencoba'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Semangat Belajar Seperti Pahlawan!',
      konten: `<p>Galih bilang, "Aku susah belajar matematika. Mau nyerah saja." 😔</p>
<p>Alfa bilang, "Jangan! Ingat Jenderal Sudirman! Dia sakit tapi tetap berjuang!" 💪</p>
<p>"Kamu bisa! Latihan tiap hari, pasti bisa!" 🌟</p>
<p>Galih mencoba lagi. Hari pertama susah. Hari kedua lebih baik. Hari ketiga... BERHASIL! 🎉</p>
<p>"Hore! Aku bisa!" seru Galih. 🥳</p>
<p>Bu Guru tersenyum. "Itulah semangat pengobar! Kamu hebat, Galih!" 👩‍🏫</p>
<p><strong>Cara menjaga semangat:</strong></p>
<ul style="padding-left: 20px;">
  <li>🎯 Tetapkan tujuan kecil dulu</li>
  <li>📅 Latihan rutin setiap hari</li>
  <li>🤗 Minta bantuan teman/guru</li>
  <li>🎉 Rayakan setiap kemajuan kecil</li>
</ul>
<p>Bagus sekali! Kamu juga bisa jadi pengobar semangat! ⭐</p>`,
      quiz: [
        { soal: 'Galih berhasil karena...', pilihan: ['Menyerah', 'Latihan terus dan tidak menyerah 💪', 'Curang'], jawabanIdx: 1 },
        { soal: 'Cara menjaga semangat adalah...', pilihan: ['Menyerah cepat', 'Latihan rutin setiap hari 📅', 'Menunda terus'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Jenderal Sudirman berjuang meski...', pilihan: ['Sehat', 'Sakit 🤒', 'Bosan'], jawabanIdx: 1 },
      { soal: 'Siapa yang pantang menyerah? [A] Alfa yang latihan tiap hari', pilihan: ['Alfa yang latihan tiap hari 💪', 'Budi yang mudah menyerah', 'Andi yang malas'], jawabanIdx: 0 },
      { soal: 'Susun: s-e-m-a-n-g-a-t →', pilihan: ['smangat', 'semangat ✅', 'semnagat'], jawabanIdx: 1 },
      { soal: "'Pengobar semangat' artinya orang yang...", pilihan: ['Membuat orang lain bersemangat 🔥', 'Membuat orang sedih', 'Diam saja'], jawabanIdx: 0 },
    ],
  },

  // ===== k3-bind-04: Senyum di Sekitarku =====
  {
    id: 'k3-bind-04',
    judul: 'Senyum di Sekitarku',
    emoji: '😊',
    deskripsi: 'Ayo sebarkan kebaikan kecil! Berbagi dan peduli sesama bikin dunia lebih indah! 😊💕',
    tujuan: ['Mengenal kebaikan kecil sehari-hari 😊', 'Belajar berbagi dengan sesama 🎁', 'Peduli pada orang di sekitar 🤗'],
    badgeEmoji: '😊',
    badgeNama: 'Juru Baik',
    bagian1: {
      judul: 'Kebaikan Kecil, Dampak Besar!',
      konten: `<p>Ayo perhatikan! Galih melihat temannya sedih di pojok kelas. 😢</p>
<p>"Kenapa kamu sedih?" tanya Galih. 🗣️</p>
<p>"Aku lupa bawa bekal," jawab temannya pelan. 😔</p>
<p>Galih membuka kotak bekalnya. Ada kue cokelat! 🧁</p>
<p>"Ini untukmu!" kata Galih sambil tersenyum. 😊</p>
<p>Temannya tersenyum lebar. "Terima kasih, Galih! Kamu baik sekali!" 🤗</p>
<p>Kebaikan kecil bisa membuat orang lain bahagia! 🌟</p>
<p><strong>Contoh kebaikan kecil:</strong></p>
<ul style="padding-left: 20px;">
  <li>😊 Senyum pada teman</li>
  <li>🗣️ Menyapa tetangga</li>
  <li>🎁 Berbagi makanan</li>
  <li>🧹 Membantu membersihkan kelas</li>
  <li>🙏 Mengucapkan terima kasih</li>
</ul>
<p>Mudah kan? Yuk praktikkan hari ini! 💪</p>`,
      quiz: [
        { soal: 'Galih memberi kue kepada temannya yang sedih. Itu contoh...', pilihan: ['Kebaikan 😊', 'Kekejaman', 'Kelalaian'], jawabanIdx: 0 },
        { soal: 'Kebaikan kecil bisa membuat orang lain...', pilihan: ['Marah', 'Bahagia 😊', 'Sedih'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Peduli Sesama di Sekitar Kita!',
      konten: `<p>Meutia melihat nenek tua kesulitan menyeberang jalan. 👵🚦</p>
<p>"Nek, biar saya bantu!" kata Meutia. 🤝</p>
<p>Meutia menuntun nenek menyeberang dengan aman. 🚶‍♂️</p>
<p>"Terima kasih, Nak. Semoga kamu jadi anak yang baik selalu!" doa nenek. 🙏</p>
<p>Alfa juga peduli. Dia membuang sampah teman yang tercecer. 🗑️</p>
<p>"Lingkungan bersih, hati senang!" kata Alfa. 🌿</p>
<p>Bu Guru bilang, "Anak-anak yang peduli adalah anak-anak hebat!" 👩‍🏫⭐</p>
<p><strong>Peduli sesama</strong> artinya memperhatikan dan membantu orang di sekitar kita. 💚</p>
<p>Senyummu bisa menular! Satu senyum hari ini, seribu senyum besok! 😊🌟</p>`,
      quiz: [
        { soal: 'Meutia membantu nenek menyeberang. Sikap Meutia adalah...', pilihan: ['Acuh tak acuh', 'Peduli 🤗', 'Malas'], jawabanIdx: 1 },
        { soal: "'Peduli sesama' artinya...", pilihan: ['Mengabaikan orang lain', 'Memperhatikan dan membantu orang sekitar 💚', 'Hanya peduli pada diri sendiri'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Contoh kebaikan kecil adalah...', pilihan: ['Mengejek teman', 'Berbagi makanan 🎁', 'Membuang sampah sembarangan'], jawabanIdx: 1 },
      { soal: 'Saat melihat teman sedih, kita sebaiknya...', pilihan: ['Menjauhi', 'Bertanya dan membantu 🤗', 'Tertawa'], jawabanIdx: 1 },
      { soal: '😊 = ...', pilihan: ['Marah', 'Senyum / bahagia', 'Sedih'], jawabanIdx: 1 },
      { soal: 'Senyum bisa...', pilihan: ['Menular dan membuat orang lain bahagia 🌟', 'Membuat orang marah', 'Tidak berguna'], jawabanIdx: 0 },
    ],
  },

  // ===== k3-bind-05: Bola-Bola Cokelat =====
  {
    id: 'k3-bind-05',
    judul: 'Bola-Bola Cokelat',
    emoji: '🌈',
    deskripsi: 'Ayo belajar kerja sama dan menghargai perbedaan! Kita semua unik dan hebat! 🌈🤝',
    tujuan: ['Memahami pentingnya kerja sama 🤝', 'Menghargai perbedaan teman 🌈', 'Belajar toleransi dalam kelompok 💚'],
    badgeEmoji: '🌈',
    badgeNama: 'Juru Kerja Sama',
    bagian1: {
      judul: 'Bekerja Sama Membuat Bola Cokelat!',
      konten: `<p>Coba perhatikan! Hari ini kelas Alfa membuat bola-bola cokelat. 🍫</p>
<p>Bu Guru bilang, "Kerjakan dalam kelompok ya!" 👩‍🏫</p>
<p>Kelompok Alfa: Alfa (Jawa), Meutia (Papua 🌺), Galih (Sunda), Andi (Batak).</p>
<p>Mereka berbeda-beda! Tapi justru itu yang seru! 🌈</p>
<p>"Aku aduk adonannya!" kata Alfa. 🥄</p>
<p>"Aku bentuk jadi bulat!" kata Meutia. ⚪</p>
<p>"Aku tabur kelapa!" kata Galih. 🥥</p>
<p>"Aku tata di piring!" kata Andi. 🍽️</p>
<p>Setiap orang punya tugas. Bekerja sama! Hasilnya? Bola cokelat yang enak! 😋</p>
<p>"Kita semua teman!" seru mereka. 🎉</p>`,
      quiz: [
        { soal: 'Alfa, Meutia, Galih, Andi berasal dari...', pilihan: ['Satu daerah saja', 'Berbagai daerah yang berbeda 🌈', 'Luar negeri'], jawabanIdx: 1 },
        { soal: 'Mereka berhasil karena...', pilihan: ['Bekerja sendiri-sendiri', 'Bekerja sama 🤝', 'Bertengkar'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Menghargai Perbedaan!',
      konten: `<p>Meutia bilang, "Di Papua, kami punya makanan khas yang beda!" 🌺</p>
<p>Alfa bilang, "Di Jawa juga! Yuk nanti kita tukar resep!" 🗣️</p>
<p>Mereka saling belajar. Saling menghargai. 💚</p>
<p><strong>Toleransi</strong> artinya menghargai perbedaan tanpa membeda-bedakan. 🌈</p>
<p>Bu Guru bilang, "Indonesia kaya karena berbeda-beda! Bhinneka Tunggal Ika!" 🇮🇩</p>
<p><strong>Cara menghargai perbedaan:</strong></p>
<ul style="padding-left: 20px;">
  <li>🚫 Jangan mengejek teman yang berbeda</li>
  <li>👂 Dengarkan cerita teman dari daerah lain</li>
  <li>🤝 Main bersama siapa saja</li>
  <li>📚 Belajar dari perbedaan</li>
</ul>
<p>Bagus sekali! Perbedaan itu indah seperti pelangi! 🌈⭐</p>`,
      quiz: [
        { soal: "'Toleransi' artinya...", pilihan: ['Membeda-bedakan', 'Menghargai perbedaan 🌈', 'Menolak teman berbeda'], jawabanIdx: 1 },
        { soal: "'Bhinneka Tunggal Ika' artinya...", pilihan: ['Sama semua', 'Berbeda-beda tapi tetap satu 🇮🇩', 'Bertengkar terus'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Kerja sama membuat pekerjaan menjadi...', pilihan: ['Lebih sulit', 'Lebih mudah dan cepat ⚡', 'Lebih lama'], jawabanIdx: 1 },
      { soal: 'Sikap yang benar pada teman berbeda daerah...', pilihan: ['Mengejek', 'Menghargai dan berteman 🤝', 'Menjauhi'], jawabanIdx: 1 },
      { soal: '🌈 = ...', pilihan: ['Kesamaan', 'Keberagaman / perbedaan indah', 'Pertengkaran'], jawabanIdx: 1 },
      { soal: 'Setiap orang dalam kelompok punya...', pilihan: ['Tugas yang sama', 'Tugas masing-masing 📋', 'Tidak ada tugas'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-bind-06: Tersesat =====
  {
    id: 'k3-bind-06',
    judul: 'Tersesat',
    emoji: '🧭',
    deskripsi: 'Ayo belajar tentang keberanian! Saat tersesat, jangan panik — cari jalan pulang! 🧭🏠',
    tujuan: ['Memahami cara menghadapi situasi sulit 🧭', 'Belajar tidak panik saat tersesat 😌', 'Tahu cara minta tolong dengan benar 🗣️'],
    badgeEmoji: '🧭',
    badgeNama: 'Juru Penjelajah',
    bagian1: {
      judul: 'Andi Tersesat di Pasar!',
      konten: `<p>Perhatikan! Andi pergi ke pasar bersama Ibu. 🏪</p>
<p>Pasar ramai sekali! Banyak orang, banyak pedagang. 🛒</p>
<p>Andi tertarik melihat mainan. Dia berjalan mendekat. 👀</p>
<p>Tiba-tiba... Ibu tidak ada di sampingnya! 😱</p>
<p>Andi tersesat! Jantungnya berdegup kencang. 💓</p>
<p>Tapi Andi ingat pesan Ibu: <strong>"Kalau tersesat, jangan panik!"</strong> 🗣️</p>
<p>Andi tarik napas dalam. 😌</p>
<p>"Baiklah, aku harus tenang dulu," gumam Andi. 💭</p>
<p><strong>Langkah saat tersesat:</strong></p>
<ol style="padding-left: 20px;">
  <li>😌 Tenang — jangan panik</li>
  <li>👀 Cari tempat yang aman (toko, satpam)</li>
  <li>🗣️ Minta tolong pada orang dewasa yang dipercaya</li>
  <li>📱 Atau hubungi orang tua jika punya HP</li>
</ol>
<p>Bagus! Andi ingat semua langkahnya! ⭐</p>`,
      quiz: [
        { soal: 'Saat tersesat, hal PERTAMA yang harus dilakukan...', pilihan: ['Berlari panik', 'Tenang dan tidak panik 😌', 'Menangis keras'], jawabanIdx: 1 },
        { soal: 'Andi tersesat di...', pilihan: ['Sekolah', 'Pasar 🏪', 'Rumah'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Mencari Jalan Pulang!',
      konten: `<p>Andi mendekati seorang penjual buah. 🍎</p>
<p>"Pak, saya tersesat. Ibu saya pakai baju merah. Apakah Bapak melihatnya?" tanya Andi sopan. 🗣️</p>
<p>Pak penjual tersenyum. "Tunggu di sini, Nak. Jangan pergi ke mana-mana." 🛑</p>
<p>Pak penjual membantu memanggil petugas pasar. 👮</p>
<p>Beberapa menit kemudian... Ibu datang! 🎉</p>
<p>"Andi! Kamu di mana saja?" Ibu memeluk Andi. 🤗</p>
<p>"Maaf, Bu. Aku tidak panik. Aku minta tolong ke Pak penjual!" kata Andi bangga. 💪</p>
<p>Ibu bangga. "Kamu hebat, Andi! Berani dan cerdas!" ⭐</p>
<p><strong>Keberanian</strong> bukan berarti tidak takut. Tapi berani bertindak meski takut! 🧭</p>
<p>Bagus sekali, Andi! 🌟</p>`,
      quiz: [
        { soal: 'Andi minta tolong kepada...', pilihan: ['Anak kecil', 'Penjual buah (orang dewasa) 🍎', 'Orang asing mencurigakan'], jawabanIdx: 1 },
        { soal: 'Keberanian artinya...', pilihan: ['Tidak pernah takut', 'Berani bertindak meski takut 💪', 'Kabur selalu'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Saat tersesat, kita harus minta tolong pada...', pilihan: ['Orang dewasa yang dipercaya 👮', 'Siapa saja', 'Tidak perlu minta tolong'], jawabanIdx: 0 },
      { soal: 'Andi tidak panik karena...', pilihan: ['Dia lupa', 'Dia ingat pesan Ibu 🗣️', 'Dia tidak peduli'], jawabanIdx: 1 },
      { soal: '🧭 = ...', pilihan: ['Tersesat', 'Petunjuk arah / penjelajah', 'Panik'], jawabanIdx: 1 },
      { soal: 'Langkah ke-1 saat tersesat adalah...', pilihan: ['Berlari', 'Tenang dulu 😌', 'Berteriak'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-bind-07: Aku dan Si Merah =====
  {
    id: 'k3-bind-07',
    judul: 'Aku dan Si Merah',
    emoji: '🐦',
    deskripsi: 'Ayo belajar mencintai alam! Merawat hewan yang terluka dengan penuh kasih sayang! 🐦💕',
    tujuan: ['Memahami pentingnya merawat hewan 🐦', 'Belajar cinta lingkungan dan alam 🌿', 'Bertanggung jawab atas makhluk hidup 💕'],
    badgeEmoji: '🐦',
    badgeNama: 'Juru Sayang Hewan',
    bagian1: {
      judul: 'Menemukan Si Merah!',
      konten: `<p>Ayo perhatikan! Alfa sedang jalan kaki di taman. 🌳</p>
<p>Tiba-tiba dia mendengar suara lemah. "Cuit... cuit..." 🐦</p>
<p>Alfa menoleh. Ada burung berwarna merah di rumput! Sayapnya terluka. 💔</p>
<p>"Kasihan sekali!" gumam Alfa. Dia mendekat pelan-pelan. 🤲</p>
<p>Burung itu tidak bisa terbang. Alfa berhati-hati mengangkatnya. 🐦</p>
<p>"Jangan takut, aku bantu kamu," bisik Alfa lembut. 💕</p>
<p>Alfa membawa burung itu pulang. Dia beri nama: <strong>Si Merah</strong>! ❤️</p>
<p>Ibu Alfa bilang, "Kamu baik, Alfa. Ayo kita rawat bersama." 👩</p>
<p>Bagus! Alfa punya hati yang baik! ⭐</p>`,
      quiz: [
        { soal: 'Alfa menemukan burung yang...', pilihan: ['Sehat dan kuat', 'Terluka di sayapnya 💔', 'Terbang tinggi'], jawabanIdx: 1 },
        { soal: 'Sikap Alfa terhadap burung terluka adalah...', pilihan: ['Meninggalkannya', 'Merawatnya dengan sayang 💕', 'Mengusirnya'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Merawat dan Melepaskan!',
      konten: `<p>Setiap hari Alfa merawat Si Merah. 🐦</p>
<ul style="padding-left: 20px;">
  <li>🌾 Memberi makan biji-bijian</li>
  <li>💧 Memberi air bersih</li>
  <li>🏠 Menjaga di kotak yang aman</li>
  <li>💊 Mengobati sayapnya (dibantu Ibu)</li>
</ul>
<p>Seminggu kemudian... Si Merah sembuh! 🎉</p>
<p>"Cuit cuit!" Si Merah mengepakkan sayap. Siap terbang! 🕊️</p>
<p>Alfa sedih mau berpisah. Tapi dia tahu: burung harus bebas di alam! 🌿</p>
<p>"Sembuh ya, Si Merah! Terbang bebas!" kata Alfa sambil melepasnya. 💕</p>
<p>Si Merah terbang tinggi. Alfa tersenyum bahagia. 😊</p>
<p><strong>Cinta alam</strong> artinya merawat, bukan memiliki. Melepaskan saat saatnya tiba. 🌍</p>
<p>Bagus sekali, Alfa! Kamu juru sayang hewan sejati! ⭐</p>`,
      quiz: [
        { soal: 'Setelah sembuh, Alfa ____ Si Merah.', pilihan: ['Mengurungnya selamanya', 'Melepaskannya ke alam 🕊️', 'Menjualnya'], jawabanIdx: 1 },
        { soal: "'Cinta alam' artinya...", pilihan: ['Merusak alam', 'Merawat dan menjaga alam 🌿', 'Mengabaikan alam'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Cara merawat hewan terluka adalah...', pilihan: ['Meninggalkannya', 'Memberi makan, air, dan obat 💊', 'Mengurung tanpa peduli'], jawabanIdx: 1 },
      { soal: 'Burung yang sudah sembuh sebaiknya...', pilihan: ['Dikurung selamanya', 'Dilepas ke alam bebas 🕊️', 'Dijual'], jawabanIdx: 1 },
      { soal: '🐦 = ...', pilihan: ['Ikan', 'Burung', 'Kucing'], jawabanIdx: 1 },
      { soal: 'Alfa menamai burung itu...', pilihan: ['Si Biru', 'Si Merah ❤️', 'Si Hijau'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-bind-08: Sahabat dari Seberang =====
  {
    id: 'k3-bind-08',
    judul: 'Sahabat dari Seberang',
    emoji: '✉️',
    deskripsi: 'Ayo berteman lintas budaya! Saling mengenal lewat surat dan komunikasi! ✉️🌍',
    tujuan: ['Memahami persahabatan lintas budaya 🌍', 'Belajar berkomunikasi dengan baik ✉️', 'Saling mengenal dan menghargai 🤝'],
    badgeEmoji: '✉️',
    badgeNama: 'Juru Sahabat',
    bagian1: {
      judul: 'Teman Pena dari Malaysia!',
      konten: `<p>Perhatikan! Meutia punya program di sekolah: <strong>teman pena</strong>! ✉️</p>
<p>Teman penanya dari Malaysia 🇲🇾. Namanya Aisyah. 👧</p>
<p>Meutia menulis surat pertama:</p>
<p style="background:#fff8e1; padding:12px; border-radius:8px; margin:12px 0; border-left:4px solid #fbc02d;">
"Halo Aisyah! 👋 Namaku Meutia. Aku dari Papua, Indonesia 🌺. Aku suka menari dan membaca. Bagaimana denganmu?"
</p>
<p>Seminggu kemudian, balasan datang! 📬</p>
<p style="background:#e8f5e9; padding:12px; border-radius:8px; margin:12px 0; border-left:4px solid #4caf50;">
"Halo Meutia! Aku Aisyah dari Kuala Lumpur 🇲🇾. Aku suka menyanyi dan memasak. Senang berteman denganmu! 😊"
</p>
<p>Wah, Meutia dapat sahabat baru dari seberang! 🌟</p>
<p><strong>Teman pena</strong> = sahabat yang berkomunikasi lewat surat/pesan. ✉️</p>`,
      quiz: [
        { soal: 'Teman pena Meutia berasal dari...', pilihan: ['Papua', 'Malaysia 🇲🇾', 'Jawa'], jawabanIdx: 1 },
        { soal: 'Teman pena berkomunikasi lewat...', pilihan: ['Hanya tatap muka', 'Surat atau pesan ✉️', 'Tidak berkomunikasi'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Saling Mengenal dan Belajar!',
      konten: `<p>Meutia dan Aisyah saling kirim surat setiap minggu. ✉️📬</p>
<p>Meutia cerita tentang Papua: burung cenderawasih, tarian tradisional. 🌺💃</p>
<p>Aisyah cerita tentang Malaysia: Petronas Twin Towers, makanan nasi lemak. 🏙️🍛</p>
<p>"Wah, negerimu indah!" tulis Meutia. 😍</p>
<p>"Negerimu juga! Suatu hari kita bertemu ya!" balas Aisyah. 🤝</p>
<p>Alfa bilang, "Aku juga mau punya teman pena!" 🙋</p>
<p>Bu Guru bilang, "Bagus! Berteman lintas budaya membuat kita lebih kaya!" 👩‍🏫🌍</p>
<p><strong>Manfaat sahabat dari seberang:</strong></p>
<ul style="padding-left: 20px;">
  <li>📚 Belajar budaya baru</li>
  <li>🗣️ Latihan berkomunikasi</li>
  <li>🌈 Menghargai perbedaan</li>
  <li>🤗 Punya sahabat di mana-mana</li>
</ul>
<p>Bagus sekali! Dunia jadi lebih dekat karena persahabatan! ⭐🌍</p>`,
      quiz: [
        { soal: 'Manfaat punya sahabat dari negara lain...', pilihan: ['Tidak ada manfaat', 'Belajar budaya baru 📚', 'Hanya buang waktu'], jawabanIdx: 1 },
        { soal: 'Meutia dan Aisyah saling...', pilihan: ['Bertengkar', 'Belajar dan berbagi cerita ✉️', 'Mengabaikan'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Surat Meutia dikirim ke...', pilihan: ['Teman sekelas', 'Aisyah di Malaysia 🇲🇾', 'Bu Guru'], jawabanIdx: 1 },
      { soal: 'Persahabatan lintas budaya membuat kita...', pilihan: ['Lebih sempit', 'Lebih kaya wawasan 🌍', 'Lebih sombong'], jawabanIdx: 1 },
      { soal: '✉️ = ...', pilihan: ['Telepon', 'Surat', 'Buku'], jawabanIdx: 1 },
      { soal: "'Saling mengenal' artinya...", pilihan: ['Tidak peduli', 'Belajar tentang satu sama lain 🤝', 'Bertengkar'], jawabanIdx: 1 },
    ],
  },
];

materiList.forEach(materi => {
  const html = renderBook(materi);
  const filePath = path.join(outDir, `${materi.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath}`);
});
console.log('Done! 8 K3 B.Indonesia books generated successfully!');
