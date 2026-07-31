const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas6/ipas');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k6-ipas-01': '#FFF3E0', // oranye — tubuh/rangka
  'k6-ipas-02': '#E8F5E9', // hijau — sejarah Indonesia
  'k6-ipas-03': '#E0F7FA', // biru muda — dunia
  'k6-ipas-04': '#E8EAF6', // indigo — ASEAN/PBB
  'k6-ipas-05': '#F3E5F5', // ungu — antariksa
  'k6-ipas-06': '#FFFDE7', // kuning — energi
  'k6-ipas-07': '#E0F2F1', // teal — lingkungan
  'k6-ipas-08': '#FCE4EC', // pink — proyek
};

function renderQuizBox(quiz, idx) {
  return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed #ddd;">
          <p style="font-weight: bold; font-size: 16px;">🤔 ${quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            ${quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:10px; font-weight:bold; font-size: 16px;"></div>
        </div>`;
}

function renderBook(data) {
  const bg = bgColors[data.id];
  const jawaban = [
    ...data.observasi.quiz.map((q) => q.jawabanIdx),
    ...data.eksperimen.quiz.map((q) => q.jawabanIdx),
    ...data.latihan.map((q) => q.jawabanIdx),
  ];
  const totalQuiz =
    data.observasi.quiz.length + data.eksperimen.quiz.length + data.latihan.length;
  const obsLen = data.observasi.quiz.length;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — IPAS Kelas 6</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas6-ipas { font-size:16px; line-height:1.6; }
    .kelas6-ipas .section-header { font-size:18px; }
    .kelas6-ipas .section-body { font-size:16px; }
    .kelas6-ipas .quiz-box p { font-size:16px; }
    .kelas6-ipas .feedback { font-size:16px; }
    .kelas6-ipas h1 { font-size:22px; }
    .eksperimen-box { background: #fff8e1; border-radius: 12px; padding: 20px; border-left: 4px solid #ff9800; margin: 16px 0; }
    .eksperimen-box h4 { color: #e65100; margin-top: 0; }
    .observasi-box { background: #e8f5e9; border-radius: 12px; padding: 20px; border-left: 4px solid #4caf50; margin: 16px 0; }
  </style>
</head>
<body class="kelas6-ipas" data-kelas="6" data-pelajaran="ipas" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 72px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #2e7d32; margin:0 0 8px 0; font-size: 22px;">${data.judul}</h1>
        <p style="color: #666; font-size: 16px;">IPAS — Kelas 6</p>
        <p style="margin-top: 16px; font-size: 16px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Ayo Eksplorasi! 🚀</button>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map((t) => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Observasi 1 -->
    <div class="section-card">
      <div class="section-header">🔍 Observasi 1: ${data.observasi.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <div class="observasi-box">
          ${data.observasi.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 1</p>
        ${data.observasi.quiz.map((q, i) => renderQuizBox(q, i)).join('')}
      </div>
    </div>

    <!-- Eksperimen / Coba di Rumah -->
    <div class="section-card">
      <div class="section-header">🔬 Coba di Rumah: ${data.eksperimen.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <div class="eksperimen-box">
          <h4>🧪 Eksperimen Sederhana</h4>
          ${data.eksperimen.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 2</p>
        ${data.eksperimen.quiz.map((q, i) => renderQuizBox(q, i + obsLen)).join('')}
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <p style="font-weight:bold; font-size: 18px;">💪 Ayo kerjakan soal-soal di bawah ini!</p>
        <p style="color: #666;">Klik jawaban yang menurutmu benar. Bagus! Logikamu tepat. 🔬</p>

        ${data.latihan
          .map((soal, si) => {
            const quizCount = data.observasi.quiz.length + data.eksperimen.quiz.length;
            const idx = si + quizCount;
            return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 16px;">${si + 1}. ${soal.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 16px;"></div>
        </div>`;
          })
          .join('')}
      </div>
    </div>

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 16px;">
        <p>Kamu sudah belajar tentang <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">Jadi Ilmuwan! Dapat badge istimewa:</p>
        <div style="font-size: 72px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #2e7d32; font-size: 20px;">${data.badgeNama}</p>
        <p style="color: #666; margin-top: 8px;">⭐⭐⭐⭐⭐ · +XP</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai! 🎉</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Selesaikan semua kuis di atas dulu ya 🧐)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak SMA)</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Halo! Aku kakak SMA. Mau tanya soal ${data.judul}? Aku siap bantu! 📚</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>

  <script>
    window._QUIZ_ANSWERS = [${jawaban.join(', ')}];
    window._TOTAL_SECTIONS = ${totalQuiz};
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

// ============ 8 MATERI IPAS KELAS 6 ============
const materiList = [
  // ===== k6-ipas-01 =====
  {
    id: 'k6-ipas-01',
    judul: 'Bagaimana Tubuh Kita Bergerak?',
    emoji: '🦴',
    deskripsi:
      'Mari kita pelajari sistem rangka, otot, dan persendian. Perhatikan contoh berikut: 206 tulang, otot menarik, sendi menghubungkan!',
    tujuan: [
      'Menjelaskan fungsi sistem rangka, otot, dan persendian 🦴💪',
      'Mengidentifikasi jenis tulang & sendi di tubuh 🤝',
      'Menyebutkan cara menjaga kesehatan tulang & otot 🏃',
    ],
    badgeEmoji: '🦴',
    badgeNama: 'Ahli Anatomi',
    observasi: {
      judul: 'Sistem Rangka, Otot, dan Persendian',
      konten: `<p>Tubuh manusia punya <strong>206 tulang</strong> 🦴 yang membentuk SISTEM RANGKA. Rangka menopang tubuh, melindungi organ (tengkorak lindungi otak, rusuk lindungi jantung-paru), dan jadi tempat otot menempel.</p>
<p>Otot 💪 menarik tulang agar bergerak. Tanpa otot, tulang diam. Tanpa tulang, otot tidak punya "tangan pegangan".</p>
<p>Persendian 🤝 menghubungkan tulang: lutut (engsel), bahu (peluru), leher (putar). Sendi memungkinkan gerakan berbeda-beda.</p>
<p>Perhatikan contoh berikut: Andi menendang bola — otot paha kontraksi, sendi lutut menekuk, tulang kaki bergerak. Kalau tidak olahraga, otot lemah dan tulang rapuh!</p>`,
      quiz: [
        {
          soal: 'Jumlah tulang orang dewasa sekitar...',
          pilihan: ['106', '206 🦴', '306', '406'],
          jawabanIdx: 1,
        },
        {
          soal: 'Yang menarik tulang agar bergerak adalah...',
          pilihan: ['Saraf', 'Darah', 'Otot 💪', 'Kulit'],
          jawabanIdx: 2,
        },
        {
          soal: 'Persendian berfungsi untuk...',
          pilihan: [
            'Menghubungkan tulang 🤝',
            'Memompa darah',
            'Mencerna makanan',
            'Menyaring udara',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    eksperimen: {
      judul: 'Hitung Tulang & Gerakkan Sendi',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Hitung tulang di tanganmu: jari tangan = <strong>27 tulang</strong> (per tangan). Gerakkan pergelangan tangan. Itu <strong>PERSENDIAN</strong>. Tekuk lengan. Itu <strong>OTOT</strong> bekerja!</p>
<p>Coba juga: putar bahu (sendi peluru), tekuk lutut (sendi engsel), putar kepala kiri-kanan (sendi putar). Catat gerakan mana yang paling bebas.</p>
<p>Buktikan! Andi & Rina melakukan ini bareng — Rina hitung, Andi catat. 🔬</p>`,
      quiz: [
        {
          soal: 'Jumlah tulang di SATU tangan (jari+telapak+pergelangan) sekitar...',
          pilihan: ['14', '20', '27 ✋', '50'],
          jawabanIdx: 2,
        },
        {
          soal: 'Sendi lutut termasuk jenis sendi...',
          pilihan: ['Peluru', 'Engsel 🦵', 'Putar', 'Geser'],
          jawabanIdx: 1,
        },
        {
          soal: 'Cara menjaga tulang & otot yang BENAR...',
          pilihan: [
            'Tidur terus',
            'Olahraga + makan kaya kalsium 🥛🏃',
            'Hindari semua gerakan',
            'Hanya main HP',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Fungsi rangka yang BENAR adalah...',
        pilihan: [
          'Hanya menghias tubuh',
          'Menopang, melindungi organ, tempat otot menempel 🦴',
          'Mencerna makanan',
          'Menghasilkan darah saja',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Tengkorak melindungi...',
        pilihan: ['Jantung', 'Paru-paru', 'Otak 🧠', 'Lambung'],
        jawabanIdx: 2,
      },
      {
        soal: 'Sendi bahu memungkinkan gerakan...',
        pilihan: [
          'Hanya lurus',
          'Ke segala arah (peluru) 🔄',
          'Tidak bergerak',
          'Hanya kiri-kanan',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Kalau jarang olahraga, yang terjadi...',
        pilihan: [
          'Otot kuat otomatis',
          'Otot lemah & tulang rapuh 😮',
          'Tulang bertambah 100',
          'Tidak ada pengaruh',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Makanan kaya kalsium untuk tulang contohnya...',
        pilihan: ['Permen', 'Susu & ikan 🥛🐟', 'Keripik', 'Soda'],
        jawabanIdx: 1,
      },
    ],
  },

  // ===== k6-ipas-02 =====
  {
    id: 'k6-ipas-02',
    judul: 'Cerita tentang Indonesia Kita',
    emoji: '🇮🇩',
    deskripsi:
      'Mari kita pelajari sejarah kemerdekaan, tokoh nasional, dan identitas bangsa. Perjuangan panjang sampai 17 Agustus 1945!',
    tujuan: [
      'Menjelaskan peristiwa kemerdekaan Indonesia 17 Agustus 1945 🇮🇩',
      'Mengenal tokoh pejuang nasional (Soekarno, Hatta, Kartini, dll) ✊',
      'Memahami pentingnya menjaga identitas & persatuan bangsa 🤝',
    ],
    badgeEmoji: '🇮🇩',
    badgeNama: 'Sejarawan Muda',
    observasi: {
      judul: 'Kemerdekaan dan Tokoh Nasional',
      konten: `<p>Pada <strong>17 Agustus 1945</strong> 🇮🇩, Soekarno-Hatta memproklamasikan kemerdekaan di Jalan Pegangsaan Timur 56, Jakarta. Teks proklamasi dibacakan Soekarno, ditandatangani Soekarno & Mohammad Hatta.</p>
<p>Perjuangan panjang: masa penjajahan Belanda, Jepang, lalu merdeka. Tokoh seperti <strong>RA Kartini</strong> ✊ (emansipasi), <strong>Cut Nyak Dien</strong> ⚔️ (Aceh), <strong>Pattimura</strong> 🗡️ (Maluku), <strong>Diponegoro</strong>, <strong>Hasanuddin</strong> berjuang untuk Indonesia merdeka.</p>
<p>Identitas bangsa: Pancasila, Bhinneka Tunggal Ika, bahasa Indonesia, bendera Merah Putih, lagu Indonesia Raya. Kita harus menjaganya!</p>
<p>Perhatikan contoh berikut: Rina baca biografi Kartini — belajar bahwa perempuan berhak sekolah. Andi baca sejarah Diponegoro — belajar perlawanan tanpa menyerah.</p>`,
      quiz: [
        {
          soal: 'Proklamasi kemerdekaan dibacakan pada...',
          pilihan: ['1 Juni 1945', '17 Agustus 1945 🇮🇩', '28 Oktober 1928', '10 November 1945'],
          jawabanIdx: 1,
        },
        {
          soal: 'Yang membacakan teks proklamasi adalah...',
          pilihan: ['Hatta', 'Soekarno 📢', 'Sjahrir', 'Kartini'],
          jawabanIdx: 1,
        },
        {
          soal: 'RA Kartini dikenal karena perjuangan di bidang...',
          pilihan: [
            'Perang bersenjata',
            'Emansipasi perempuan & pendidikan ✊',
            'Perdagangan',
            'Olahraga',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    eksperimen: {
      judul: 'Wawancara Sejarah Hidup',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Tanya kakek/nenek (atau orang tua/tetangga senior): bagaimana masa penjajahan atau masa lama dulu? Apa yang mereka rasakan? Catat <strong>3 poin</strong>.</p>
<p>Ini sejarah HIDUP — bukan hanya di buku! Bandingkan dengan yang kamu pelajari di kelas.</p>
<p>Buktikan! Andi & Rina saling tukar catatan wawancara. Sejarah jadi nyata. 🔬</p>`,
      quiz: [
        {
          soal: 'Semboyan bangsa Indonesia adalah...',
          pilihan: [
            'Tut Wuri Handayani',
            'Bhinneka Tunggal Ika 🤝',
            'Ing Ngarso Sung Tulodo',
            'Gotong Royong Saja',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Dasar negara Indonesia adalah...',
          pilihan: ['Kapitalisme', 'Pancasila ⭐', 'Komunisme', 'Monarki'],
          jawabanIdx: 1,
        },
        {
          soal: 'Cut Nyak Dien berjuang di daerah...',
          pilihan: ['Jawa', 'Aceh ⚔️', 'Papua', 'Bali'],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Yang menandatangani naskah proklamasi adalah...',
        pilihan: [
          'Soekarno saja',
          'Soekarno & Hatta ✍️',
          'Hatta saja',
          'Sjahrir & Soekarno',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Bendera negara Indonesia adalah...',
        pilihan: ['Merah-Biru', 'Merah-Putih 🇮🇩', 'Hijau-Kuning', 'Putih-Hitam'],
        jawabanIdx: 1,
      },
      {
        soal: 'Pattimura adalah pahlawan dari...',
        pilihan: ['Sumatera', 'Maluku 🗡️', 'Kalimantan', 'Sulawesi'],
        jawabanIdx: 1,
      },
      {
        soal: 'Lagu kebangsaan Indonesia adalah...',
        pilihan: ['Garuda Pancasila', 'Indonesia Raya 🎵', 'Halo-Halo Bandung', 'Maju Tak Gentar'],
        jawabanIdx: 1,
      },
      {
        soal: 'Cara menjaga kemerdekaan di masa kini...',
        pilihan: [
          'Acuh tak acuh',
          'Belajar, jaga persatuan, cintai tanah air ❤️',
          'Hanya rayakan 17 Agustus',
          'Tinggalkan Indonesia',
        ],
        jawabanIdx: 1,
      },
    ],
  },

  // ===== k6-ipas-03 =====
  {
    id: 'k6-ipas-03',
    judul: 'Pelesir Keliling Dunia',
    emoji: '🌍',
    deskripsi:
      'Mari kita pelajari benua, negara, ibu kota, bendera, dan kebudayaan dunia. Dunia punya 7 benua — Indonesia di Asia Tenggara!',
    tujuan: [
      'Menyebutkan 7 benua di dunia 🌍',
      'Mengenal beberapa negara, ibu kota, dan benderanya 🏳️',
      'Membedakan kebudayaan dunia & menghargai perbedaan 🎭',
    ],
    badgeEmoji: '🌍',
    badgeNama: 'Duta Dunia',
    observasi: {
      judul: 'Benua, Negara, dan Ibu Kota',
      konten: `<p>Dunia 🌍 punya <strong>7 benua</strong>: Asia, Afrika, Eropa, Australia, Amerika Utara, Amerika Selatan, Antartika. Indonesia di <strong>Asia Tenggara</strong>.</p>
<p>Perhatikan contoh berikut: Ibu kota Prancis = <strong>Paris</strong> 🗼, Jepang = <strong>Tokyo</strong> 🗾, Mesir = <strong>Kairo</strong> 🐫, Amerika Serikat = <strong>Washington, D.C.</strong>, Brasil = <strong>Brasilia</strong>.</p>
<p>Setiap negara punya bendera & budaya unik: kimono (Jepang), tartan (Skotlandia), samba (Brasil), piramida (Mesir). Indonesia punya batik, tari tradisional, rumah adat!</p>
<p>Andi & Rina "jalan-jalan" lewat peta — Rina cari Eropa, Andi cari Afrika. Dunia luas, tapi kita satu planet!</p>`,
      quiz: [
        {
          soal: 'Jumlah benua di dunia adalah...',
          pilihan: ['5', '6', '7 🌍', '8'],
          jawabanIdx: 2,
        },
        {
          soal: 'Indonesia terletak di benua...',
          pilihan: ['Afrika', 'Eropa', 'Asia 🌏', 'Australia'],
          jawabanIdx: 2,
        },
        {
          soal: 'Ibu kota Jepang adalah...',
          pilihan: ['Beijing', 'Seoul', 'Tokyo 🗾', 'Bangkok'],
          jawabanIdx: 2,
        },
      ],
    },
    eksperimen: {
      judul: 'Peta Dunia & Bendera ASEAN',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Lihat peta dunia. Cari <strong>5 negara ASEAN</strong>. Apa ibu kotanya? Gambarkan benderanya. Bedakan dengan bendera Indonesia!</p>
<p>Contoh: Thailand (Bangkok), Malaysia (Kuala Lumpur), Singapura (Singapura), Filipina (Manila), Vietnam (Hanoi).</p>
<p>Buktikan! Andi gambar bendera, Rina tulis ibu kota. Tempel di dinding. 🔬</p>`,
      quiz: [
        {
          soal: 'Ibu kota Prancis adalah...',
          pilihan: ['London', 'Berlin', 'Paris 🗼', 'Roma'],
          jawabanIdx: 2,
        },
        {
          soal: 'Benua yang hampir seluruhnya es adalah...',
          pilihan: ['Afrika', 'Antartika 🧊', 'Asia', 'Eropa'],
          jawabanIdx: 1,
        },
        {
          soal: 'Budaya khas Indonesia yang terkenal dunia adalah...',
          pilihan: ['Kimono', 'Batik 🧵', 'Tartan', 'Sombrero'],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Ibu kota Mesir adalah...',
        pilihan: ['Lagos', 'Kairo 🐫', 'Nairobi', 'Rabat'],
        jawabanIdx: 1,
      },
      {
        soal: 'Benua terkecil (selain Antartika sering disebut) dihuni manusia secara luas adalah...',
        pilihan: ['Asia', 'Australia 🦘', 'Afrika', 'Eropa'],
        jawabanIdx: 1,
      },
      {
        soal: 'Ibu kota Amerika Serikat adalah...',
        pilihan: ['New York', 'Washington, D.C. 🇺🇸', 'Los Angeles', 'Chicago'],
        jawabanIdx: 1,
      },
      {
        soal: 'Menghargai budaya negara lain berarti...',
        pilihan: [
          'Menertawakan perbedaan',
          'Belajar & menghormati tanpa merendahkan 🤝',
          'Meniru semuanya',
          'Mengabaikan budaya sendiri',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Negara di Asia Tenggara selain Indonesia contohnya...',
        pilihan: ['Jepang', 'Thailand 🇹🇭', 'China', 'India'],
        jawabanIdx: 1,
      },
    ],
  },

  // ===== k6-ipas-04 =====
  {
    id: 'k6-ipas-04',
    judul: 'Indonesia dan Masyarakat Dunia',
    emoji: '🤝',
    deskripsi:
      'Mari kita pelajari kerja sama internasional: ASEAN, PBB, dan perdagangan global. Indonesia aktif di dunia!',
    tujuan: [
      'Menjelaskan peran ASEAN dan anggota-anggotanya 🌏',
      'Memahami fungsi PBB bagi perdamaian dunia 🌐',
      'Menyebutkan contoh kerja sama & perdagangan global 🚢',
    ],
    badgeEmoji: '🤝',
    badgeNama: 'Diplomat Muda',
    observasi: {
      judul: 'ASEAN, PBB, dan Kerja Sama Global',
      konten: `<p>Indonesia 🇮🇩 anggota <strong>ASEAN</strong> 🌏 (Association of Southeast Asian Nations). Anggota: Brunei, Kamboja, Indonesia, Laos, Malaysia, Myanmar, Filipina, Singapura, Thailand, Vietnam (10 negara). Kerja sama: perdagangan, budaya, pendidikan, keamanan.</p>
<p>Indonesia juga anggota <strong>PBB</strong> 🌐 (Perserikatan Bangsa-Bangsa) sejak 1950. PBB menjaga perdamaian, hak asasi, pembangunan, kerja sama antarnegara.</p>
<p>Perdagangan global: Indonesia ekspor CPO, batu bara, tekstil, kopi; impor mesin, elektronik. Kapal & pesawat menghubungkan negara!</p>
<p>Perhatikan contoh berikut: Andi baca berita KTT ASEAN — pemimpin se-Asia Tenggara rapat. Rina lihat logo PBB — peta dunia dilingkari daun zaitun (damai).</p>`,
      quiz: [
        {
          soal: 'ASEAN adalah organisasi negara-negara di...',
          pilihan: ['Eropa', 'Asia Tenggara 🌏', 'Afrika', 'Amerika'],
          jawabanIdx: 1,
        },
        {
          soal: 'Jumlah anggota ASEAN saat ini adalah...',
          pilihan: ['5', '8', '10 🔟', '15'],
          jawabanIdx: 2,
        },
        {
          soal: 'PBB berperan utama untuk...',
          pilihan: [
            'Hanya olahraga',
            'Perdamaian & kerja sama dunia 🌐',
            'Menjual barang',
            'Membuat film',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    eksperimen: {
      judul: 'Cari Berita Kerja Sama Internasional',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Cari berita di HP/koran tentang ASEAN, PBB, atau perdagangan Indonesia dengan negara lain. Catat: <strong>1 kerja sama</strong> yang melibatkan Indonesia + manfaatnya.</p>
<p>Contoh: ekspor kopi ke Eropa, misi perdamaian PBB, pertemuan ASEAN tentang pendidikan.</p>
<p>Buktikan! Andi & Rina presentasi 1 menit di depan keluarga. 🔬</p>`,
      quiz: [
        {
          soal: 'Indonesia menjadi anggota PBB sejak tahun...',
          pilihan: ['1945', '1950 📅', '1967', '1998'],
          jawabanIdx: 1,
        },
        {
          soal: 'Contoh barang ekspor unggulan Indonesia...',
          pilihan: ['Salju', 'Kopi & CPO ☕', 'Berlian Antartika', 'Es kutub'],
          jawabanIdx: 1,
        },
        {
          soal: 'Manfaat kerja sama internasional bagi Indonesia...',
          pilihan: [
            'Tidak ada',
            'Perdagangan, damai, belajar dari negara lain 🤝',
            'Hanya rugi',
            'Kehilangan budaya',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Singkatan ASEAN yang BENAR...',
        pilihan: [
          'Asian Economic Nation',
          'Association of Southeast Asian Nations 🌏',
          'Africa South East Alliance',
          'All States East Asia Network',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Negara ASEAN yang BUKAN anggota adalah...',
        pilihan: ['Thailand', 'Vietnam', 'Jepang 🇯🇵', 'Malaysia'],
        jawabanIdx: 2,
      },
      {
        soal: 'Lambang damai di logo PBB digambarkan dengan...',
        pilihan: ['Pedang', 'Daun zaitun 🌿', 'Meriam', 'Api'],
        jawabanIdx: 1,
      },
      {
        soal: 'Perdagangan global memungkinkan negara...',
        pilihan: [
          'Isolasi total',
          'Saling tukar barang & jasa 🚢',
          'Berperang saja',
          'Tutup perbatasan selamanya',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Sikap pelajar terhadap kerja sama dunia...',
        pilihan: [
          'Acuh',
          'Belajar bahasa, budaya, dan peduli isu global 📚',
          'Tolak semua asing',
          'Hanya main game',
        ],
        jawabanIdx: 1,
      },
    ],
  },

  // ===== k6-ipas-05 =====
  {
    id: 'k6-ipas-05',
    judul: 'Menjelajahi Bumi dan Antariksa',
    emoji: '🚀',
    deskripsi:
      'Mari kita pelajari tata surya, planet, bumi & bulan, serta eksplorasi antariksa. 8 planet mengorbit matahari!',
    tujuan: [
      'Menyebutkan 8 planet tata surya berurutan 🌌',
      'Menjelaskan hubungan bumi, bulan, dan matahari 🌍🌙☀️',
      'Mengenal eksplorasi antariksa & manfaatnya 🚀',
    ],
    badgeEmoji: '🚀',
    badgeNama: 'Astronot Muda',
    observasi: {
      judul: 'Tata Surya dan Planet',
      konten: `<p>Tata surya 🌌 punya <strong>8 planet</strong>: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus. Matahari di pusat — planet mengorbit karena gravitasi.</p>
<p>Bumi 🌍 punya 1 bulan 🌙. Fase bulan (purnama, sabit, bulan baru) terjadi karena posisi bumi-bulan-matahari. Mars merah karena besi oksida. Jupiter planet terbesar!</p>
<p>Eksplorasi antariksa: satelit, roket, ISS (stasiun luar angkasa), pendaratan di bulan (Apollo 1969). Manfaat: GPS, cuaca, komunikasi, riset sains.</p>
<p>Perhatikan contoh berikut: Andi hafal urutan planet dengan jembatan keledai. Rina amati bulan malam ini — fase apa?</p>`,
      quiz: [
        {
          soal: 'Jumlah planet di tata surya adalah...',
          pilihan: ['7', '8 🌌', '9', '10'],
          jawabanIdx: 1,
        },
        {
          soal: 'Planet terdekat dengan matahari adalah...',
          pilihan: ['Venus', 'Bumi', 'Merkurius 🔥', 'Mars'],
          jawabanIdx: 2,
        },
        {
          soal: 'Planet terbesar di tata surya adalah...',
          pilihan: ['Bumi', 'Saturnus', 'Jupiter 🪐', 'Neptunus'],
          jawabanIdx: 2,
        },
      ],
    },
    eksperimen: {
      judul: 'Amati Bulan & Cari Fakta Mars',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Amati bulan 🌙 malam ini. Fase apa? (Purnama, sabit, bulan baru). Kenapa? (Posisi bumi-bulan-matahari).</p>
<p>Google: planet Mars merah kenapa? (besi oksida / karat di permukaan).</p>
<p>Buktikan! Andi foto bulan (kalau aman), Rina catat fase + alasan. Bandingkan 3 malam berturut-turut. 🔬</p>`,
      quiz: [
        {
          soal: 'Fase bulan terjadi karena...',
          pilihan: [
            'Bulan berubah bentuk fisik',
            'Posisi bumi-bulan-matahari 🌍🌙☀️',
            'Awan menutupi',
            'Bulan jauh-dekat saja',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Mars tampak kemerahan karena...',
          pilihan: ['Api di permukaan', 'Besi oksida 🔴', 'Darah', 'Cat merah'],
          jawabanIdx: 1,
        },
        {
          soal: 'Manfaat satelit buatan bagi manusia...',
          pilihan: [
            'Hanya hiasan langit',
            'GPS, cuaca, komunikasi 📡',
            'Mengurangi gravitasi',
            'Membuat hujan',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Urutan 4 planet terdalam (terdekat matahari) adalah...',
        pilihan: [
          'Bumi, Venus, Merkurius, Mars',
          'Merkurius, Venus, Bumi, Mars 🔥',
          'Mars, Bumi, Venus, Merkurius',
          'Venus, Merkurius, Bumi, Mars',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Bumi mengorbit matahari dalam waktu kira-kira...',
        pilihan: ['1 hari', '1 bulan', '1 tahun 📅', '10 tahun'],
        jawabanIdx: 2,
      },
      {
        soal: 'Saturnus terkenal karena...',
        pilihan: ['Warna merah', 'Cincin es & debu 💍', 'Ukuran terkecil', 'Tanpa bulan'],
        jawabanIdx: 1,
      },
      {
        soal: 'Manusia pertama mendarat di bulan (Apollo) tahun...',
        pilihan: ['1950', '1969 🚀', '1990', '2001'],
        jawabanIdx: 1,
      },
      {
        soal: 'Pusat tata surya adalah...',
        pilihan: ['Bumi', 'Bulan', 'Matahari ☀️', 'Jupiter'],
        jawabanIdx: 2,
      },
    ],
  },

  // ===== k6-ipas-06 =====
  {
    id: 'k6-ipas-06',
    judul: 'Gawat! Benarkah Energi di Bumi akan Habis?',
    emoji: '⚡',
    deskripsi:
      'Mari kita pelajari energi tak terbarukan vs terbarukan, hemat energi, dan energi alternatif. Panel surya = masa depan!',
    tujuan: [
      'Membedakan energi terbarukan & tak terbarukan ☀️⛽',
      'Menjelaskan cara menghemat energi di rumah 💡',
      'Menyebutkan contoh energi alternatif (surya, angin, air) 💨💧',
    ],
    badgeEmoji: '♻️',
    badgeNama: 'Juru Energi',
    observasi: {
      judul: 'Energi Terbarukan dan Tak Terbarukan',
      konten: `<p>Minyak bumi ⛽ dan batu bara 🪨 = energi <strong>TAK TERBARUKAN</strong> (habis jika dipakai terus, butuh jutaan tahun terbentuk). Gas alam juga.</p>
<p>Matahari ☀️, angin 💨, air 💧, panas bumi, biomassa = energi <strong>TERBARUKAN</strong> (tidak habis, bisa diperbarui alam).</p>
<p>Panel surya ☀️→⚡ mengubah sinar matahari jadi listrik! Turbin angin = angin → listrik. PLTA = air → listrik.</p>
<p>Perhatikan contoh berikut: Andi hitung berapa lampu di rumah. Rina matikan yang tidak dipakai. Hemat 1 jam/hari = hemat tagihan + bumi!</p>`,
      quiz: [
        {
          soal: 'Contoh energi TAK TERBARUKAN adalah...',
          pilihan: ['Angin', 'Matahari', 'Minyak bumi ⛽', 'Air sungai'],
          jawabanIdx: 2,
        },
        {
          soal: 'Panel surya mengubah energi...',
          pilihan: [
            'Angin → listrik',
            'Sinar matahari → listrik ☀️⚡',
            'Air → listrik',
            'Batu bara → listrik',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Energi TERBARUKAN artinya...',
          pilihan: [
            'Cepat habis',
            'Bisa diperbarui alam, tidak mudah habis ♻️',
            'Hanya di luar negeri',
            'Mahal selalu',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    eksperimen: {
      judul: 'Audit Listrik Rumah',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Hitung peralatan listrik di rumahmu: lampu, kulkas, TV. Berapa watt masing-masing? (Cek label di alat atau tanya orang tua.)</p>
<p>Kalau hemat 1 jam/hari (matikan yang tidak perlu), berapa kWh hemat per bulan? Rumus kasar: (watt × jam × 30) / 1000 = kWh.</p>
<p>Buktikan! Andi catat daftar alat, Rina hitung. Presentasi ke keluarga: "Kita bisa hemat Rp ... per bulan!" 🔬</p>`,
      quiz: [
        {
          soal: 'Cara hemat energi di rumah yang BENAR...',
          pilihan: [
            'Nyalakan semua lampu 24 jam',
            'Matikan alat tak terpakai, pakai LED 💡',
            'Buka kulkas terus',
            'AC suhu paling dingin selalu',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'PLTA memanfaatkan energi...',
          pilihan: ['Batu bara', 'Angin', 'Air 💧', 'Minyak'],
          jawabanIdx: 2,
        },
        {
          soal: 'Kenapa energi fosil (minyak, batu bara) bermasalah?',
          pilihan: [
            'Tidak berguna',
            'Habis + polusi & gas rumah kaca 🌡️',
            'Terlalu murah',
            'Sulit disimpan',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Contoh energi terbarukan adalah...',
        pilihan: ['Batu bara', 'Minyak bumi', 'Angin 💨', 'Gas alam'],
        jawabanIdx: 2,
      },
      {
        soal: 'Turbin angin mengubah energi angin menjadi...',
        pilihan: ['Panas', 'Listrik ⚡', 'Minyak', 'Es'],
        jawabanIdx: 1,
      },
      {
        soal: 'Batu bara termasuk energi...',
        pilihan: ['Terbarukan', 'Tak terbarukan 🪨', 'Tak terbatas', 'Surya'],
        jawabanIdx: 1,
      },
      {
        soal: 'Manfaat beralih ke energi terbarukan...',
        pilihan: [
          'Lebih polusi',
          'Lebih bersih & berkelanjutan 🌱',
          'Cepat habis',
          'Tidak ada manfaat',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Lampu LED lebih hemat karena...',
        pilihan: [
          'Lebih redup selalu',
          'Konsumsi listrik lebih rendah 💡',
          'Tidak bisa mati',
          'Warna hanya putih',
        ],
        jawabanIdx: 1,
      },
    ],
  },

  // ===== k6-ipas-07 =====
  {
    id: 'k6-ipas-07',
    judul: 'Bumi Kita Terancam Bahaya',
    emoji: '🌡️',
    deskripsi:
      'Mari kita pelajari pemanasan global, polusi, deforestasi, dan upaya pelestarian. Bumi butuh penolong — itu kamu!',
    tujuan: [
      'Menjelaskan penyebab & akibat pemanasan global 🌡️',
      'Mengidentifikasi jenis polusi & deforestasi 🏭🌳',
      'Menyebutkan upaya pelestarian yang bisa dilakukan pelajar 🌱',
    ],
    badgeEmoji: '🌱',
    badgeNama: 'Penyelamat Bumi',
    observasi: {
      judul: 'Pemanasan Global, Polusi, Deforestasi',
      konten: `<p><strong>Pemanasan global</strong> 🌡️: suhu bumi naik karena gas rumah kaca (CO₂, metana) menahan panas di atmosfer. Sumber: kendaraan, pabrik, pembakaran hutan.</p>
<p>Akibat: es kutub mencair 🧊, permukaan laut naik, banjir 🌊, kekeringan, cuaca ekstrem, habitat rusak.</p>
<p><strong>Polusi</strong>: udara (asap), air (limbah), tanah (sampah plastik). <strong>Deforestasi</strong> = penebangan hutan berlebih → hilang O₂, banjir, satwa punah.</p>
<p>Solusi: kurangi plastik 🚫, tanam pohon 🌳, naik sepeda 🚲, hemat energi, daur ulang. Perhatikan contoh: Andi bawa botol minum isi ulang. Rina ikut tanam pohon di sekolah!</p>`,
      quiz: [
        {
          soal: 'Gas utama penyebab pemanasan global adalah...',
          pilihan: ['Oksigen', 'Nitrogen', 'Karbon dioksida (CO₂) 🌡️', 'Helium'],
          jawabanIdx: 2,
        },
        {
          soal: 'Deforestasi berarti...',
          pilihan: [
            'Menanam hutan',
            'Penebangan hutan berlebih 🪓',
            'Membersihkan sungai',
            'Mendaur ulang',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Akibat es kutub mencair...',
          pilihan: [
            'Laut surut',
            'Permukaan laut naik & banjir pesisir 🌊',
            'Suhu turun drastis',
            'Hutan bertambah',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    eksperimen: {
      judul: 'Cek Kualitas Udara & Langit',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Amati langit di kotamu selama seminggu. Berapa hari biru vs berkabut/abu-abu? Cek <strong>AQI</strong> (Air Quality Index) di HP (aplikasi cuaca).</p>
<p>Polusi tinggi atau rendah? Catat + usulkan 1 aksi: jalan kaki/sepeda ke toko dekat, bawa tas belanja kain, pilah sampah.</p>
<p>Buktikan! Andi catat AQI, Rina catat warna langit. Bandingkan. 🔬</p>`,
      quiz: [
        {
          soal: 'AQI (Air Quality Index) mengukur...',
          pilihan: ['Suhu air', 'Kualitas udara 🌫️', 'Kekuatan angin', 'Curah hujan saja'],
          jawabanIdx: 1,
        },
        {
          soal: 'Cara pelajar kurangi polusi plastik...',
          pilihan: [
            'Beli botol sekali pakai tiap hari',
            'Bawa botol isi ulang & tas kain ♻️',
            'Buang sampah ke sungai',
            'Bakar semua plastik di rumah',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Manfaat menanam pohon...',
          pilihan: [
            'Menambah CO₂',
            'Serap CO₂, hasilkan O₂, cegah erosi 🌳',
            'Hanya hiasan',
            'Menambah polusi',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Efek rumah kaca berlebih menyebabkan...',
        pilihan: [
          'Bumi lebih dingin',
          'Pemanasan global 🌡️',
          'Oksigen bertambah',
          'Hutan otomatis tumbuh',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Contoh polusi air adalah...',
        pilihan: [
          'Asap knalpot',
          'Limbah pabrik ke sungai 🏭',
          'Sampah di halaman saja',
          'Debu di meja',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Transportasi ramah lingkungan contohnya...',
        pilihan: ['Mobil sendirian tiap hari', 'Sepeda & transportasi umum 🚲', 'Motor balap', 'Pesawat tiap jam'],
        jawabanIdx: 1,
      },
      {
        soal: '3R dalam pengelolaan sampah adalah...',
        pilihan: [
          'Run, Rest, Race',
          'Reduce, Reuse, Recycle ♻️',
          'Read, Write, Count',
          'Red, Green, Blue',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Sikap penolong bumi yang tepat...',
        pilihan: [
          'Buang sampah sembarangan',
          'Pilah sampah, hemat energi, tanam pohon 🌱',
          'Bakar hutan',
          'Abaikan berita lingkungan',
        ],
        jawabanIdx: 1,
      },
    ],
  },

  // ===== k6-ipas-08 =====
  {
    id: 'k6-ipas-08',
    judul: 'Proyek Akhir IPAS',
    emoji: '🎓',
    deskripsi:
      'Mari rancang proyek sederhana, presentasikan hasil, dan refleksikan pembelajaran IPAS kelas 6. Jadi ilmuwan sejati!',
    tujuan: [
      'Merancang proyek IPAS sederhana (lingkungan/energi/sains) 📋',
      'Mempresentasikan hasil proyek dengan jelas 🎤',
      'Merefleksikan apa yang dipelajari sepanjang IPAS kelas 6 💭',
    ],
    badgeEmoji: '🎓',
    badgeNama: 'Ilmuwan Proyek',
    observasi: {
      judul: 'Merancang dan Menyajikan Proyek',
      konten: `<p>Proyek akhir = menerapkan ilmu IPAS ke dunia nyata. Langkah: (1) pilih topik, (2) rumuskan pertanyaan, (3) kumpulkan data/buat karya, (4) simpulkan, (5) presentasikan.</p>
<p>Contoh proyek: poster hemat energi, model tata surya dari bola, kompos dari sampah organik, wawancara sejarah keluarga, peta ASEAN buatan tangan.</p>
<p>Perhatikan contoh berikut: <strong>Andi</strong> membuat kompos dari daun kering 🍂. 1 bulan kemudian jadi pupuk organik! <strong>Rina</strong> membuat poster "Hemat Energi, Selamatkan Bumi". Bagus! 🎓</p>
<p>Presentasi: suara jelas, urut (latar → cara → hasil → pesan), jawab pertanyaan teman.</p>`,
      quiz: [
        {
          soal: 'Langkah PERTAMA merancang proyek adalah...',
          pilihan: [
            'Langsung presentasi',
            'Pilih topik & rumuskan pertanyaan 📋',
            'Beli alat mahal',
            'Salin punya orang',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Contoh proyek IPAS yang COCOK untuk kelas 6...',
          pilihan: [
            'Bangun jembatan beton nyata',
            'Kompos / poster hemat energi / model tata surya 🍂',
            'Operasi bedah',
            'Peluncuran roket NASA',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Presentasi yang baik mencakup...',
          pilihan: [
            'Hanya baca slide cepat',
            'Latar, cara, hasil, pesan + suara jelas 🎤',
            'Diam saja',
            'Cerita di luar topik terus',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    eksperimen: {
      judul: 'Buat Proyek Sederhana Sendiri',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Buat proyek sederhana: <strong>poster hemat energi</strong>, <strong>model tata surya dari bola</strong>, atau <strong>kompos dari sampah organik</strong>. Foto dan ceritakan!</p>
<p>Minimal: judul, 3 langkah cara, 1 hasil/pengamatan, 1 pesan untuk teman.</p>
<p>Buktikan! Andi pilih kompos, Rina pilih poster — atau kolaborasi. Tunjukkan ke guru/keluarga. 🔬</p>`,
      quiz: [
        {
          soal: 'Kompos dari daun kering menghasilkan...',
          pilihan: ['Plastik', 'Pupuk organik 🌱', 'Minyak bumi', 'Besi'],
          jawabanIdx: 1,
        },
        {
          soal: 'Refleksi pembelajaran artinya...',
          pilihan: [
            'Lupa semua materi',
            'Merenung apa yang dipelajari & manfaatnya 💭',
            'Menyalin jawaban',
            'Tidur di kelas',
          ],
          jawabanIdx: 1,
        },
        {
          soal: 'Sikap ilmuwan sejati saat proyek gagal sebagian...',
          pilihan: [
            'Menyerah total',
            'Catat, evaluasi, coba perbaiki 🔬',
            'Salahkan teman',
            'Sembunyikan hasil',
          ],
          jawabanIdx: 1,
        },
      ],
    },
    latihan: [
      {
        soal: 'Urutan presentasi yang baik...',
        pilihan: [
          'Pesan → hasil → cara (acak)',
          'Latar → cara → hasil → pesan 🎤',
          'Hasil saja',
          'Lelucon terus',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Model tata surya dari bola mengajarkan...',
        pilihan: [
          'Masak saja',
          'Urutan & ukuran relatif planet 🌌',
          'Sejarah Indonesia',
          'Tulang manusia',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Manfaat mengerjakan proyek akhir IPAS...',
        pilihan: [
          'Hanya nilai',
          'Terapkan ilmu, kerja sama, komunikasi 🎓',
          'Buang-buang waktu',
          'Tidak ada',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Sumber data proyek yang BAIK...',
        pilihan: [
          'Desas-desus saja',
          'Observasi, eksperimen, buku/sumber terpercaya 📚',
          'Hoaks viral',
          'Tebakan acak',
        ],
        jawabanIdx: 1,
      },
      {
        soal: 'Setelah 8 bab IPAS, sikap terbaik adalah...',
        pilihan: [
          'Lupa & acuh pada bumi',
          'Terus peduli sains, sejarah, & lingkungan 🌍',
          'Hanya main game',
          'Tolak semua sains',
        ],
        jawabanIdx: 1,
      },
    ],
  },
];

function shuffleQuizAnswers(data) {
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function reorder(quiz, salt) {
    const correct = quiz.pilihan[quiz.jawabanIdx];
    const others = quiz.pilihan.filter((_, i) => i !== quiz.jawabanIdx);
    const n = hash(salt) % (others.length + 1);
    const newPilihan = [...others];
    newPilihan.splice(n, 0, correct);
    quiz.pilihan = newPilihan.slice(0, 4);
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
