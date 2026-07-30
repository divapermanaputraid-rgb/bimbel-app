const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas4/ipas');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k4-ipas-01': '#E8F5E9',  // hijau muda - tumbuhan
  'k4-ipas-02': '#E0F7FA',  // biru muda - wujud zat
  'k4-ipas-03': '#FFF3E0',  // oranye muda - gaya
  'k4-ipas-04': '#FFFDE7',  // kuning muda - energi
  'k4-ipas-05': '#E3F2FD',  // biru muda - khas daerah
  'k4-ipas-06': '#FCE4EC',  // pink muda - budaya
  'k4-ipas-07': '#F3E5F5',  // ungu muda - ekonomi
  'k4-ipas-08': '#E8F5E9',  // hijau muda - demokrasi
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
  const jawaban = [
    data.observasi.quiz[0].jawabanIdx,
    data.observasi.quiz[1].jawabanIdx,
    data.eksperimen.quiz[0].jawabanIdx,
    data.eksperimen.quiz[1].jawabanIdx,
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
  <title>${data.judul} — IPAS Kelas 4</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas4-ipas { font-size:17px; line-height:1.8; }
    .kelas4-ipas .section-header { font-size:19px; }
    .kelas4-ipas .section-body { font-size:17px; }
    .kelas4-ipas .quiz-box p { font-size:17px; }
    .kelas4-ipas .feedback { font-size:17px; }
    .kelas4-ipas h1 { font-size:24px; }
    .eksperimen-box { background: #fff8e1; border-radius: 12px; padding: 20px; border-left: 4px solid #ff9800; margin: 16px 0; }
    .eksperimen-box h4 { color: #e65100; margin-top: 0; }
    .observasi-box { background: #e8f5e9; border-radius: 12px; padding: 20px; border-left: 4px solid #4caf50; margin: 16px 0; }
  </style>
</head>
<body class="kelas4-ipas" data-kelas="4" data-pelajaran="ipas" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 72px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #2e7d32; margin:0 0 8px 0; font-size: 24px;">${data.judul}</h1>
        <p style="color: #666; font-size: 17px;">IPAS — Kelas 4</p>
        <p style="margin-top: 16px; font-size: 17px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Ayo Eksplorasi! 🚀</button>
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

    <!-- Observasi 1 -->
    <div class="section-card">
      <div class="section-header">🔍 Observasi 1: ${data.observasi.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <div class="observasi-box">
          ${data.observasi.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 1</p>
        ${renderQuizBox(data.observasi.quiz[0], 0)}
        ${renderQuizBox(data.observasi.quiz[1], 1)}
      </div>
    </div>

    <!-- Eksperimen / Coba di Rumah -->
    <div class="section-card">
      <div class="section-header">🔬 Coba di Rumah: ${data.eksperimen.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <div class="eksperimen-box">
          <h4>🧪 Eksperimen Sederhana</h4>
          ${data.eksperimen.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 2</p>
        ${renderQuizBox(data.eksperimen.quiz[0], 2)}
        ${renderQuizBox(data.eksperimen.quiz[1], 3)}
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
        <p style="margin-top: 16px;">Kamu jadi ilmuwan sejati! Dapat badge istimewa:</p>
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

// ============ 8 MATERI IPAS KELAS 4 ============
const materiList = [
  // ===== k4-ipas-01 =====
  {
    id: 'k4-ipas-01',
    judul: 'Tumbuhan Sumber Kehidupan di Bumi',
    emoji: '🌿',
    deskripsi: 'Ayo pelajari fotosintesis, bagian tumbuhan, peran tumbuhan, dan penyerbukan!',
    tujuan: [
      'Menjelaskan proses fotosintesis 🌿☀️',
      'Menyebutkan bagian tumbuhan dan fungsinya 🌱',
      'Memahami peran tumbuhan bagi makhluk hidup & penyerbukan 🐝🌸',
    ],
    badgeEmoji: '🌿',
    badgeNama: 'Ahli Fotosintesis',
    observasi: {
      judul: 'Fotosintesis: Pabrik Makanan Tumbuhan',
      konten: `<p>Tumbuhan membuat makanan sendiri melalui FOTOSINTESIS 🌿☀️. Butuh: sinar matahari + air + CO₂. Hasil: makanan + oksigen. Tanpa tumbuhan, hewan dan manusia tidak bisa hidup!</p>
<p>Bagian tumbuhan: 🌱 <strong>Akar</strong> — menyerap air & nutrisi dari tanah. 🌿 <strong>Batang</strong> — menopang, mengangkut air & makanan. 🍃 <strong>Daun</strong> — tempat fotosintesis (pabrik makanan). 🌸 <strong>Bunga</strong> — alat reproduksi, jadi buah & biji.</p>
<p>PENYERBUKAN 🐝: serangga (lebah, kupu-kupu) bawa serbuk sari ke putik. Kalau berhasil → buah & biji terbentuk. Ayo jaga tumbuhan, dia jaga kita! 💚</p>`,
      quiz: [
        { soal: 'Tumbuhan membuat makanan sendiri lewat proses...', pilihan: ['Fotosintesis 🌿☀️', 'Respirasi', 'Penyerbukan'], jawabanIdx: 0 },
        { soal: 'Bagian tumbuhan yang menyerap air dari tanah adalah...', pilihan: ['Daun 🍃', 'Akar 🌱', 'Bunga 🌸'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Amati Pertumbuhan Kacang Hijau',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Rendam kacang hijau di 3 tempat: (1) tempat terang + air 💧☀️, (2) tempat gelap + air 💧🌑, (3) tempat terang tapi TANPA air ☀️🚫. Amati selama 3 hari. Mana yang tumbuh? Kenapa?</p>
<ul style="padding-left: 20px;">
  <li>🌱 Tempat 1: Tumbuh subur! (Ada cahaya + air + CO₂ → fotosintesis jalan)</li>
  <li>🌑 Tempat 2: Tumbuh tapi etiolasi (panjang, pucat, lemah — cari cahaya)</li>
  <li>🚫 Tempat 3: Tidak tumbuh, bahkan busuk (tidak ada air → fotosintesis gagal)</li>
</ul>
<p>Tulis pengamatanmu di buku catatan! 🔬📝</p>`,
      quiz: [
        { soal: 'Fotosintesis butuh 3 bahan: sinar matahari, air, dan...', pilihan: ['Oksigen', 'Karbon dioksida (CO₂) 🌬️', 'Nitrogen'], jawabanIdx: 1 },
        { soal: 'Hasil fotosintesis yang dibutuhkan hewan & manusia untuk bernapas adalah...', pilihan: ['Oksigen 💨', 'Karbon dioksida', 'Air'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Daun tumbuhan berfungsi sebagai...', pilihan: ['Tempat menyerap air', 'Tempat fotosintesis 🍃', 'Tempat reproduksi'], jawabanIdx: 1 },
      { soal: 'Penyerbukan dibantu oleh...', pilihan: ['Angin & serangga 🐝💨', 'Air hujan', 'Tanah'], jawabanIdx: 0 },
      { soal: 'Bunga akan menjadi... setelah penyerbukan berhasil', pilihan: ['Daun', 'Buah & biji 🌰', 'Batang'], jawabanIdx: 1 },
      { soal: 'Tanpa tumbuhan, hewan & manusia...', pilihan: ['Tetap bisa hidup', 'Tidak bisa hidup 😢', 'Lebih sehat'], jawabanIdx: 1 },
    ],
  },

  // ===== k4-ipas-02 =====
  {
    id: 'k4-ipas-02',
    judul: 'Wujud Zat dan Perubahannya',
    emoji: '🧊',
    deskripsi: 'Belajar padat, cair, gas, dan perubahan wujud: mencair, membeku, menguap!',
    tujuan: [
      'Membedakan ciri padat, cair, gas 🧊💧💨',
      'Menjelaskan perubahan wujud zat 🔄',
      'Memberi contoh perubahan wujud sehari-hari 🍳',
    ],
    badgeEmoji: '🧊',
    badgeNama: 'Master Zat',
    observasi: {
      judul: 'Tiga Wujud Zat',
      konten: `<p>Air 💧 bisa jadi ES 🧊 (membeku) atau UAP 💨 (menguap). Es batu di meja mencair karena suhu ruangan. Ini PERUBAHAN WUJUD — zatnya tetap air!</p>
<p>Ciri-ciri: <strong>PADAT</strong> 🧱 — punya volume & bentuk tetap (batu, kayu, besi). <strong>CAIR</strong> 💧 — punya volume tetap, bentuk mengikuti wadah (air, minyak, susu). <strong>GAS</strong> 💨 — volume & bentuk mengikuti wadah (udara, uap air, LPG).</p>
<p>Perubahan wujud: PANAS ↑ = partikel gerak cepat → padat→cair (MENCAIR) 🧊➡️💧, cair→gas (MENGUAP) 💧➡️💨. DINGIN ↓ = partikel gerak pelan → gas→cair (MENGEMBUN) 💨➡️💧, cair→padat (MEMBEKU) 💧➡️🧊.</p>`,
      quiz: [
        { soal: 'Zat yang punya volume & bentuk tetap adalah...', pilihan: ['Cair 💧', 'Padat 🧱', 'Gas 💨'], jawabanIdx: 1 },
        { soal: 'Perubahan cair menjadi gas disebut...', pilihan: ['Membeku', 'Menguap 💨', 'Mencair'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Es Batu & Uap Air',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p><strong>Eksperimen 1:</strong> Masukkan es batu ke gelas. Amati 10 menit. Apa yang terjadi? (Padat 🧊 → Cair 💧). Mengapa? Suhu ruangan lebih panas dari es!</p>
<p><strong>Eksperimen 2:</strong> Panaskan air di panci (minta bantuan orang tua 🍳). Amati uapnya. (Cair 💧 → Gas 💨). Tutup panci — uap jadi air lagi di tutup (Gas → Cair = MENGEMBUN).</p>
<p>Catat pengamatanmu: wujud awal → wujud akhir → nama perubahan! 📝🔬</p>`,
      quiz: [
        { soal: 'Es batu mencair karena...', pilihan: ['Suhu ruangan lebih dingin', 'Suhu ruangan lebih panas 🌡️', 'Es batu mau jalan'], jawabanIdx: 1 },
        { soal: 'Uap air menempel di tutup panci lalu jadi tetesan air. Ini namanya...', pilihan: ['Menguap', 'Mengembun 💧', 'Membeku'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Contoh zat padat adalah...', pilihan: ['Air', 'Batu 🪨', 'Udara'], jawabanIdx: 1 },
      { soal: 'Perubahan gas menjadi cair disebut...', pilihan: ['Mengembun 💧', 'Menguap', 'Membeku'], jawabanIdx: 0 },
      { soal: 'Saat air mendidih, wujud air berubah dari...', pilihan: ['Padat ke cair', 'Cair ke gas 💨', 'Gas ke padat'], jawabanIdx: 1 },
      { soal: 'Zat yang bentuknya mengikuti wadah tapi volumenya tetap:...', pilihan: ['Padat', 'Cair 💧', 'Gas'], jawabanIdx: 1 },
    ],
  },

  // ===== k4-ipas-03 =====
  {
    id: 'k4-ipas-03',
    judul: 'Gaya di Sekitar Kita',
    emoji: '🧲',
    deskripsi: 'Belajar gaya gravitasi, gaya gesek, gaya magnet, dan gaya otot!',
    tujuan: [
      'Menyebutkan contoh gaya gravitasi 🌍',
      'Menjelaskan manfaat & kerugian gaya gesek 🛑',
      'Mengenal gaya magnet & gaya otot 🧲💪',
    ],
    badgeEmoji: '🧲',
    badgeNama: 'Ahli Gaya',
    observasi: {
      judul: 'Macam-Macam Gaya',
      konten: `<p>MAGNET 🧲 bisa menarik besi. Gaya GRAVITASI 🌍 menarik kita ke bumi. Gaya GESEK membuat sepeda bisa berhenti. Gaya OTOT 💪 membuat kita bisa berlari!</p>
<p><strong>Gaya Gravitasi:</strong> gaya tarik bumi ke semua benda. Buat benda jatuh ke bawah. Contoh: bola dilempar naik → pasti turun. Buah jatuh dari pohon 🍎.</p>
<p><strong>Gaya Gesek:</strong> gaya yang menentang gerak. Antara 2 benda yg bersentuhan. Manfaat: bisa jalan 🚶, nulis ✍️, rem sepeda 🛑. Kerugian: sepatu aus, mesin cepat rusak (butuh pelumas).</p>
<p><strong>Gaya Magnet:</strong> gaya tarik magnet ke besi/nikel/kobalt. Kutub utara (U) & selatan (S). Sejenis tolak (U-U), berlainan tarik (U-S).</p>
<p><strong>Gaya Otot:</strong> gaya dari kontraksi otot manusia/hewan. Angkat buku 📚, dorong meja, tendang bola ⚽.</p>`,
      quiz: [
        { soal: 'Gaya yang membuat bola dilempar ke atas lalu jatuh ke bawah adalah...', pilihan: ['Gaya magnet', 'Gaya gravitasi 🌍', 'Gaya gesek'], jawabanIdx: 1 },
        { soal: 'Contoh manfaat gaya gesek:...', pilihan: ['Sepatu cepat aus', 'Mesin panas', 'Bisa berjalan & berhenti 🚶🛑'], jawabanIdx: 2 },
      ],
    },
    eksperimen: {
      judul: 'Magnet vs Gesek',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Letakkan magnet di dekat paperclip. Apa yang terjadi? (Tertarik! 🧲)</p>
<p>Coba gesek magnet di pintu kulkas. Bisa nempel? (Bisa! Kulkas terbuat dari besi.)</p>
<p>Sekarang tarik paperclip yg tertarik magnet perlahan. Amati: paperclip ikut gerak tapi ada titik putus. Itu karena gaya gesek meja vs gaya magnet! ⚔️</p>
<p>Catat: benda apa saja yg tertarik magnet di rumahmu! 📝</p>`,
      quiz: [
        { soal: 'Dua kutub magnet yang BERLAINAN (U-S) akan...', pilihan: ['Salinan menarik 🧲', 'Salinan tolak', 'Tidak bereaksi'], jawabanIdx: 0 },
        { soal: 'Gaya otot contohnya...', pilihan: ['Bola jatuh', 'Magnet narik besi', 'Mendorong meja 💪'], jawabanIdx: 2 },
      ],
    },
    latihan: [
      { soal: 'Gaya yang menarik benda ke bumi disebut...', pilihan: ['Gaya gravitasi 🌍', 'Gaya magnet', 'Gaya gesek'], jawabanIdx: 0 },
      { soal: 'Rem sepeda bekerja karena...', pilihan: ['Gaya gravitasi', 'Gaya gesek 🛑', 'Gaya magnet'], jawabanIdx: 1 },
      { soal: 'Benda yang TIDAK ditarik magnet:...', pilihan: ['Paperclip', 'Paku', 'Kertas 📄'], jawabanIdx: 2 },
      { soal: 'Gaya yang keluar dari tubuh kita (otot) adalah...', pilihan: ['Gaya gravitasi', 'Gaya gesek', 'Gaya otot 💪'], jawabanIdx: 2 },
    ],
  },

  // ===== k4-ipas-04 =====
  {
    id: 'k4-ipas-04',
    judul: 'Mengubah Bentuk Energi',
    emoji: '⚡',
    deskripsi: 'Belajar energi kinetik, potensial, perubahan energi: listrik→cahaya, kimia→panas!',
    tujuan: [
      'Membedakan energi kinetik & potensial ⚡',
      'Menjelaskan perubahan energi listrik → cahaya 💡',
      'Memberi contoh perubahan energi kimia → panas 🔥',
    ],
    badgeEmoji: '⚡',
    badgeNama: 'Juru Energi',
    observasi: {
      judul: 'Energi & Perubahannya',
      konten: `<p>Mobil di atas bukit punya ENERGI POTENSIAL ⛰️. Saat jalan, jadi ENERGI KINETIK 🚗. Energi bisa berubah bentuk, tdk hilang!</p>
<p><strong>Energi Potensial:</strong> energi simpan karena posisi/keadaan. Contoh: panah di busur 🏹, air di bendungan 💧, karet ditarik.</p>
<p><strong>Energi Kinetik:</strong> energi gerak. Contoh: bola berguling ⚽, angin bertiup 💨, air mengalir.</p>
<p>Perubahan energi sehari-hari: Senter → baterai (kimia) ➡️ listrik ➡️ cahaya 💡. Kompor → gas (kimia) ➡️ panas 🔥. Radio → listrik ➡️ bunyi 📻. Mobil → bensin (kimia) ➡️ gerak (kinetik) 🚗.</p>
<p>Hemat energi = hemat bumi! Matikan lampu siang hari 💡🚫.</p>`,
      quiz: [
        { soal: 'Bola di atas tangga punya energi...', pilihan: ['Kinetik', 'Potensial ⛰️', 'Listrik'], jawabanIdx: 1 },
        { soal: 'Senter menyala: baterai (kimia) → listrik → ...', pilihan: ['Cahaya 💡', 'Panas', 'Bunyi'], jawabanIdx: 0 },
      ],
    },
    eksperimen: {
      judul: 'Mainan Mobil & Senter',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p><strong>Eksperimen 1:</strong> Naikkan mainan mobil di tangga/roroan. Lepaskan. Kenapa dia jatuh & bergerak cepat? (Gravitasi → Potensial jadi Kinetik! ⛰️➡️🚗)</p>
<p><strong>Eksperimen 2:</strong> Nyalakan senter. Baterai di dalam punya energi kimia. Jadi listrik, lalu cahaya! 🔋➡️⚡➡️💡</p>
<p>Coba juga: gosok tangan cepat-cepat. Terasa panas? Gaya gesek → panas! ✋🔥</p>
<p>Tulis 3 contoh perubahan energi lain di rumahmu! 📝</p>`,
      quiz: [
        { soal: 'Kompor gas: energi kimia (gas) berubah jadi...', pilihan: ['Panas 🔥', 'Cahaya', 'Bunyi'], jawabanIdx: 0 },
        { soal: 'Karet dilambung lalu dilepas → meloncat. Energi potensial (karet) jadi...', pilihan: ['Energi kinetik 🚀', 'Energi listrik', 'Energi kimia'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Air di bendungan punya energi...', pilihan: ['Kinetik', 'Potensial 💧', 'Kimia'], jawabanIdx: 1 },
      { soal: 'Radio mengubah energi listrik menjadi...', pilihan: ['Bunyi 📻', 'Cahaya', 'Gerak'], jawabanIdx: 0 },
      { soal: 'Mobil berjalan thanks to...', pilihan: ['Energi potensial', 'Energi kinetik 🚗', 'Energi magnet'], jawabanIdx: 1 },
      { soal: 'Cara hemat energi di rumah:...', pilihan: ['Nyalakan AC 24 jam', 'Matikan lampu siang hari 💡🚫', 'Buka kulkas terus'], jawabanIdx: 1 },
    ],
  },

  // ===== k4-ipas-05 =====
  {
    id: 'k4-ipas-05',
    judul: 'Ini Khas Daerahku!',
    emoji: '🏠',
    deskripsi: 'Belajar peta provinsi, khas daerah: makanan, pakaian, rumah, tarian!',
    tujuan: [
      'Mengenal peta provinsi Indonesia 🗺️',
      'Menyebutkan khas daerah: makanan 🍽️, pakaian 👗, rumah 🏠, tarian 💃',
      'Menghargai keunikan tiap daerah 🌈',
    ],
    badgeEmoji: '🏠',
    badgeNama: 'Duta Daerah',
    observasi: {
      judul: 'Khas Daerahku',
      konten: `<p>Alfa tinggal di Jawa Barat 🏔️. Makanan khas: karedok 🥗. Pakaian: pangsi 👖. Rumah: joglo panggung 🏠. Tarian: jaipong 💃. Ini KHAS DAERAH-KU!</p>
<p>Indonesia punya 38 provinsi. Tiap provinsi punya KEUNIKAN sendiri. Contoh:</p>
<p>🥗 <strong>Makanan:</strong> Aceh = Mie Aceh, Jabar = Karedok, Jateng = Gudeg, Bali = Babi Guling, NTB = Ayam Taliwang, Papua = Papeda.</p>
<p>👗 <strong>Pakaian Adat:</strong> Jabar = Pangsi, Jateng = Surjan, Bali = Udeng & Kamen, Sumut = Ulos, Sulsel = Baju Bodo.</p>
<p>🏠 <strong>Rumah Adat:</strong> Jabar = Joglo Panggung, Sumbar = Rumah Gadang (buffalo), Aceh = Rumah Krong Bade, Bali = Angkul-angkul.</p>
<p>💃 <strong>Tarian:</strong> Jabar = Jaipong, Jateng = Gambyong, Bali = Legong, Sumut = Tor-tor, Papua = Sajojo.</p>
<p>Bangga dengan daerahmu! 🇮🇩</p>`,
      quiz: [
        { soal: 'Rumah adat Jawa Barat bernama...', pilihan: ['Rumah Gadang', 'Joglo Panggung 🏠', 'Honai'], jawabanIdx: 1 },
        { soal: 'Tarian khas Bali adalah...', pilihan: ['Jaipong', 'Legong 💃', 'Sajojo'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Wawancara Orang Tua: Khas Daerahku',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Tanya orang tua: "Makanan khas daerah kita apa? Pakaian adatnya? Rumah tradisionalnya? Tariannya?"</p>
<p>Gambarkan keempatnya di kertas! 🎨</p>
<ul style="padding-left: 20px;">
  <li>🍽️ Makanan khas: _______________</li>
  <li>👗 Pakaian adat: _______________</li>
  <li>🏠 Rumah tradisional: _______________</li>
  <li>💃 Tariannya: _______________</li>
</ul>
<p>Tempel di dinding kamar & bangga banget! 🏠💖</p>`,
      quiz: [
        { soal: 'Makanan khas Yogyakarta/Jawa Tengah adalah...', pilihan: ['Karedok', 'Gudeg 🍚', 'Rendang'], jawabanIdx: 1 },
        { soal: 'Pakaian adat Sumatera Utara (Batak) adalah...', pilihan: ['Ulos 🧣', 'Pangsi', 'Surjan'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Tarian Jaipong berasal dari provinsi...', pilihan: ['Jawa Barat 🏔️', 'Jawa Tengah', 'Bali'], jawabanIdx: 0 },
      { soal: 'Rumah Gadang adalah rumah adat provinsi...', pilihan: ['Sumatera Barat 🏔️', 'Aceh', 'Riau'], jawabanIdx: 0 },
      { soal: 'Papeda adalah makanan khas...', pilihan: ['Papua 🌊', 'Maluku', 'Sulawesi'], jawabanIdx: 0 },
      { soal: 'Provinsi Indonesia saat ini berjumlah...', pilihan: ['34', '38 🗺️', '42'], jawabanIdx: 1 },
    ],
  },

  // ===== k4-ipas-06 =====
  {
    id: 'k4-ipas-06',
    judul: 'Indonesiaku Kaya Budaya',
    emoji: '🌈',
    deskripsi: 'Belajar keberagaman suku, agama, bahasa, dan saling menghormati!',
    tujuan: [
      'Menyebutkan keberagaman suku, agama, bahasa di Indonesia 🇮🇩',
      'Menjelaskan arti Bhinneka Tunggal Ika 🌈',
      'Memberi contoh saling menghormati perbedaan 🤝',
    ],
    badgeEmoji: '🌈',
    badgeNama: 'Duta Bhinneka',
    observasi: {
      judul: 'Bhinneka Tunggal Ika',
      konten: `<p>Indonesia 🇮🇩 punya 1.300+ suku, 700+ bahasa, 6 agama (Islam, Kristen, Katolik, Hindu, Buddha, Konghucu). Meutia dari Papua 🌺, Galih dari Jawa 🏛️, Andi dari Sulawesi 🐚. Kita berbeda tapi SATU INDONESIA!</p>
<p><strong>Bhinneka Tunggal Ika</strong> = "Berbeda-beda tapi tetap satu jua". Motto negara kita! Artinya: walau beda suku, agama, bahasa, budaya → kita tetap bersatu sebagai bangsa Indonesia. 🤝</p>
<p>Contoh menghormati: teman puasa → kita jangan makan di depannya 🍽️🚫. Teman ibadah Minggu → kita diam/sebis-bis 🙏. Bahasa daerah berbeda → kita belajar & tidak ngejek 🗣️. Adat istiadat → kita ikut hormat 🎭.</p>
<p>Keberagaman itu KEKUATAN, bukan kelemahan! 💪🌈</p>`,
      quiz: [
        { soal: 'Arti Bhinneka Tunggal Ika adalah...', pilihan: ['Berbeda tapi tetap satu 🌈', 'Sama semua', 'Beda lalu pisah'], jawabanIdx: 0 },
        { soal: 'Jumlah agama resmi di Indonesia...', pilihan: ['5', '6 🕌⛪🕉️', '7'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Hitung Keragaman Kelasmu',
      konten: `<p><strong>Ayo coba di rumah/sekolah!</strong></p>
<p>Hitung: di kelasmu ada berapa teman dari suku/berbeda? Apa bahasa daerah mereka? Coba sapa dengan bahasa daerahnya!</p>
<ul style="padding-left: 20px;">
  <li>🗣️ "Sugeng enjang" (Jawa) / "Wilujeng enjing" (Sunda) / "Tabik" (Minang)</li>
  <li>📝 Catat nama teman + suku + bahasa daerah di buku</li>
  <li>🤝 Beri hormat: jangan ngejek logat, ikut rayakan hari besar teman (Natal, Idul Fitri, Waisak, Nyepi, Imlek)</li>
</ul>
<p>Kita INDONESIA yang BERBEDA tapi SATU! 🇮🇩❤️</p>`,
      quiz: [
        { soal: 'Contoh menghormati teman yg puasa:...', pilihan: ['Makan di depannya 🍽️', 'Tidak makan di depannya 🚫🍽️', 'Ngejek puasanya'], jawabanIdx: 1 },
        { soal: 'Bahasa daerah Sunda untuk "Selamat pagi" adalah...', pilihan: ['Sugeng enjang', 'Wilujeng enjing 🌅', 'Tabik'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Motto negara Indonesia adalah...', pilihan: ['Bhinneka Tunggal Ika 🌈', 'Unity in Diversity', 'Satu Nusa Satu Bangsa'], jawabanIdx: 0 },
      { soal: 'Agama yang BUKAN agama resmi di Indonesia:...', pilihan: ['Islam', 'Kristen', 'Sikh'], jawabanIdx: 2 },
      { soal: 'Meutia dari Papua, Galih dari Jawa, Andi dari Sulawesi. Kita...', pilihan: ['Berbeda tapi Satu Indonesia 🇮🇩', 'Harus sama semua', 'Pisah saja'], jawabanIdx: 0 },
      { soal: 'Saling menghormati perbedaan membuat kita...', pilihan: ['Lebih lemah', 'Lebih kuat & bersatu 💪🌈', 'Ribut tiap hari'], jawabanIdx: 1 },
    ],
  },

  // ===== k4-ipas-07 =====
  {
    id: 'k4-ipas-07',
    judul: 'Bagaimana Mendapatkan Semua Keperluan Kita',
    emoji: '🛒',
    deskripsi: 'Belajar produksi, distribusi, konsumsi, dan perdagangan!',
    tujuan: [
      'Menjelaskan rantai: produksi → distribusi → konsumsi 🔗',
      'Membedakan produsen, distributor, konsumen 🏭🚚🛒',
      'Memahami peran pasar & perdagangan 🏪',
    ],
    badgeEmoji: '🛒',
    badgeNama: 'Juru Ekonomi',
    observasi: {
      judul: 'Dari Petani ke Meja Makan',
      konten: `<p>Petani 🌾 → Pabrik 🏭 → Toko 🏪 → Konsumen 🛒. Ini rantai: PRODUKSI → DISTRIBUSI → KONSUMSI. Tanpa petani, tidak ada nasi 🍚!</p>
<p><strong>PRODUKSI:</strong> membuat barang/jasa. Contoh: petani tanam padi 🌾, nelayan tangkap ikan 🎣, pabrik bikin sepatu 👟.</p>
<p><strong>DISTRIBUSI:</strong> mengirim barang dari produsen ke konsumen. Lewat: truk 🚚, kapal 🚢, pesawat ✈️, toko online 📦. Ada grosir (beli banyak), eceran (jual satuan).</p>
<p><strong>KONSUMSI:</strong> memakai barang/jasa. Kita beli beras 🍚, makan nasi, pakai baju 👕, main HP 📱.</p>
<p><strong>PERDAGANGAN:</strong> jual beli. Tradisional: pasar 🏪, warung. Modern: minimarket, mall, e-commerce. Uang = alat tukar. Dulu: barter (barang tukar barang).</p>`,
      quiz: [
        { soal: 'Petani menanam padi termasuk kegiatan...', pilihan: ['Produksi 🌾', 'Distribusi', 'Konsumsi'], jawabanIdx: 0 },
        { soal: 'Truk mengangkut beras dari gudang ke pasar disebut...', pilihan: ['Produksi', 'Distribusi 🚚', 'Konsumsi'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Amati Warung dekat Rumah',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Amati warung/tokoh di dekat rumah. Dari mana barangnya? (Petani 🌾, pabrik 🏭, luar kota 🚚). Bagaimana sampai ke warung? (Distribusi: truk, motor, kurir 📦).</p>
<ul style="padding-left: 20px;">
  <li>📝 Catat 5 barang di warung + asalnya</li>
  <li>🗣️ Tanya pak/bu warung: "Barang ini dari mana?"</li>
  <li>💰 Perhatikan: harga grosir vs eceran beda ya!</li>
</ul>
<p>Gambarkan rantai: Produsen → ... → Warung → Kamu! 🔗</p>`,
      quiz: [
        { soal: 'Kita beli nasi di warung. Kita bertindak sebagai...', pilihan: ['Produsen', 'Distributor', 'Konsumen 🛒'], jawabanIdx: 2 },
        { soal: 'Jual beli di pasar tradisional & online sama-sama disebut...', pilihan: ['Produksi', 'Distribusi', 'Perdagangan 🏪'], jawabanIdx: 2 },
      ],
    },
    latihan: [
      { soal: 'Nelayan menangkap ikan termasuk...', pilihan: ['Produksi 🎣', 'Distribusi', 'Konsumsi'], jawabanIdx: 0 },
      { soal: 'Rantai yang benar:...', pilihan: ['Konsumsi → Produksi → Distribusi', 'Produksi → Distribusi → Konsumsi 🔗', 'Distribusi → Konsumsi → Produksi'], jawabanIdx: 1 },
      { soal: 'Toko online (Tokopedia, Shopee) berperan di tahap...', pilihan: ['Produksi', 'Distribusi 📦', 'Konsumsi'], jawabanIdx: 1 },
      { soal: 'Alat tukar yang dipakai sekarang adalah...', pilihan: ['Barang (barter)', 'Uang 💰', 'Emas'], jawabanIdx: 1 },
    ],
  },

  // ===== k4-ipas-08 =====
  {
    id: 'k4-ipas-08',
    judul: 'Membangun Masyarakat yang Beradab',
    emoji: '🤝',
    deskripsi: 'Belajar norma, hukum, partisipasi warga, demokrasi sederhana!',
    tujuan: [
      'Membedakan norma & hukum ⚖️',
      'Memberi contoh partisipasi warga di RT/RW 🏘️',
      'Mengikuti demokrasi sederhana (musyawarah) 🤝📋',
    ],
    badgeEmoji: '🤝',
    badgeNama: 'Juru Demokrasi',
    observasi: {
      judul: 'Norma, Hukum, & Demokrasi',
      konten: `<p>Di lingkungan Alfa ada RT. Ada ketua RT, ada musyawarah. Semua warga ikut berpendapat. Ini DEMOKRASI sederhana! 🤝📋</p>
<p><strong>NORMA:</strong> aturan tidak tertulis, dari kebiasaan/sopan santun. Contoh: bicara sopan 🗣️, antre 🚶, salam 🤝, tidak berisik malam 🌙. Pelanggar → sanction sosial (diamati, dikritik).</p>
<p><strong>HUKUM:</strong> aturan tertulis, resmi, Berlaku umum. Contoh: UU Lalu Lintas 🚦, UU Perlindungan Anak 👶, Perda Sampah 🗑️. Pelanggar → sanksi hukum (denda, penjara).</p>
<p><strong>PARTAISIPASI WARGA:</strong> ikut gotong royong 🤝, bayar iuran RT 💰, musyawarah RT 📋, pilkada 🗳️, jaga keamanan lingkungan 👮.</p>
<p><strong>DEMOKRASI SEDERHANA:</strong> musyawarah untuk mufakat. Semua boleh bicara, suara paling banyak = keputusan. Contoh: pilih ketua kelas, tentukan hari kerja bakti. Adil & damai! ☮️</p>`,
      quiz: [
        { soal: 'Aturan tidak tertulis dari kebiasaan disebut...', pilihan: ['Hukum', 'Norma 📜', 'Peraturan'], jawabanIdx: 1 },
        { soal: 'Musyawarah untuk mufakat adalah contoh...', pilihan: ['Demokrasi sederhana 🤝📋', 'Diktatur', 'Anarki'], jawabanIdx: 0 },
      ],
    },
    eksperimen: {
      judul: 'Gotong Royong di Lingkunganmu',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Adakah gotong royong di lingkunganmu? Kapan terakhir kali? Foto dan ceritakan!</p>
<ul style="padding-left: 20px;">
  <li>📸 Foto kegiatan gotong royong/kerja bakti</li>
  <li>📝 Cerita: apa yg dikerjakan? Siapa aja ikut? Senang nggak?</li>
  <li>🗣️ Tanya orang tua: "Kalau ada masalah di RT, gimana caranya diselesaikan?" (Musyawarah!)</li>
</ul>
<p>Warga yang aktif = lingkungan nyaman! 🏘️💚</p>`,
      quiz: [
        { soal: 'Contoh hukum (aturan tertulis):...', pilihan: ['Antre di kasir', 'UU Lalu Lintas 🚦', 'Salam saat bertemu'], jawabanIdx: 1 },
        { soal: 'Ikut kerja bakti membersihkan lingkungan = bentuk...', pilihan: ['Partisipasi warga 🤝', 'Pelanggaran hukum', 'Kewajiban sekolah'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Bicara sopan pada orang tua adalah contoh...', pilihan: ['Hukum', 'Norma 🗣️', 'Peraturan sekolah'], jawabanIdx: 1 },
      { soal: 'Pelanggar hukum akan mendapat...', pilihan: ['Sanksi sosial', 'Sanksi hukum (denda/penjara) ⚖️', 'Hadiah'], jawabanIdx: 1 },
      { soal: 'Cara memilih ketua kelas yang adil:...', pilihan: ['Ditunjuk guru', 'Musyawarah / voting 🗳️', 'Undian'], jawabanIdx: 1 },
      { soal: 'Warga yang beradab ciri-cirinya:...', pilihan: ['Egois, ngotot', 'Ikut gotong royong, patuh hukum, musyawarah 🤝⚖️📋', 'Cuma ikut kalau ada hadiah'], jawabanIdx: 1 },
    ],
  },
];

// Shuffle answered indices
function shuffleQuizAnswers(data) {
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function reorder(quiz, salt) {
    const correct = quiz.pilihan[quiz.jawabanIdx];
    const others = quiz.pilihan.filter((_, i) => i !== quiz.jawabanIdx);
    const n = (hash(salt) % others.length);
    const newPilihan = [...others];
    newPilihan.splice(n, 0, correct);
    quiz.pilihan = newPilihan.slice(0, 3);
    quiz.jawabanIdx = quiz.pilihan.indexOf(correct);
  }
  data.observasi.quiz.forEach((q, i) => reorder(q, data.id + '-o-' + i));
  data.eksperimen.quiz.forEach((q, i) => reorder(q, data.id + '-e-' + i));
  data.latihan.forEach((q, i) => reorder(q, data.id + '-l-' + i));
  return data;
}

materiList.forEach((data) => {
  shuffleQuizAnswers(data);
  const html = renderBook(data);
  const filePath = path.join(outDir, `${data.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Wrote', filePath);
});

console.log(`Done: ${materiList.length} books → ${outDir}`);