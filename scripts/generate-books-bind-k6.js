const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas6/bahasa-indonesia');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k6-bind-01': '#E8F5E9',
  'k6-bind-02': '#E3F2FD',
  'k6-bind-03': '#F1F8E9',
  'k6-bind-04': '#FFF3E0',
  'k6-bind-05': '#E0F7FA',
  'k6-bind-06': '#F3E5F5',
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
  // 2 CP1 + 2 CP2 + 5 latihan = 9 (engine: 1 progress per quiz benar)
  const jawaban = [
    data.bagian1.quiz[0].jawabanIdx,
    data.bagian1.quiz[1].jawabanIdx,
    data.bagian2.quiz[0].jawabanIdx,
    data.bagian2.quiz[1].jawabanIdx,
    ...data.latihan.map((s) => s.jawabanIdx),
  ];

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — Kelas 6</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas6 { font-size:16px; line-height:1.6; }
    .kelas6 .section-header { font-size:18px; }
    .kelas6 .section-body { font-size:16px; }
    .kelas6 .quiz-box p { font-size:16px; }
    .kelas6 .feedback { font-size:16px; }
    .kelas6 h1 { font-size:24px; }
  </style>
</head>
<body class="kelas6" data-kelas="6" data-pelajaran="bind" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 72px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #2e7d32; margin:0 0 8px 0; font-size: 24px;">${data.judul}</h1>
        <p style="color: #666; font-size: 16px;">Bahasa Indonesia — Kelas 6</p>
        <p style="margin-top: 16px; font-size: 16px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Mulai! 🚀</button>
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

    <!-- Bagian 1 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 1: ${data.bagian1.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        ${data.bagian1.konten}
        <p style="font-weight:bold; margin-top:20px; font-size:17px;">🧪 Checkpoint 1</p>
        ${renderQuizBox(data.bagian1.quiz[0], 0)}
        ${renderQuizBox(data.bagian1.quiz[1], 1)}
      </div>
    </div>

    <!-- Bagian 2 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 2: ${data.bagian2.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        ${data.bagian2.konten}
        <p style="font-weight:bold; margin-top:20px; font-size:17px;">🧪 Checkpoint 2</p>
        ${renderQuizBox(data.bagian2.quiz[0], 2)}
        ${renderQuizBox(data.bagian2.quiz[1], 3)}
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <p style="font-weight:bold; font-size: 18px;">💪 Kerjakan soal-soal berikut dengan saksama.</p>
        <p style="color: #666;">Pilih jawaban yang paling tepat. Kamu boleh mencoba lagi jika belum tepat.</p>

        ${data.latihan
          .map((soal, si) => {
            const idx = si + 4;
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
        <p>Kamu sudah menyelesaikan materi <strong>${data.judul}</strong>.</p>
        <p style="margin-top: 16px;">Badge yang kamu raih:</p>
        <div style="font-size: 72px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #2e7d32; font-size: 22px;">${data.badgeNama}</p>
        <p style="color: #666; margin-top: 8px;">⭐⭐⭐⭐⭐ · +XP</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai! 🎉</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Selesaikan semua kuis di atas dulu ya)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Bahasa Indonesia K6)</div>
      <div class="ai-msgs" style="font-size: 15px;">
        <div class="msg ai">Halo! Aku siap bantu soal ${data.judul}. Tanya saja ya. 📚</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik pertanyaan...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>

  <script>
    window._QUIZ_ANSWERS = [${jawaban.join(', ')}];
    window._TOTAL_SECTIONS = 9;
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

const materiList = [
  // ===== k6-bind-01 =====
  {
    id: 'k6-bind-01',
    judul: 'Bangga Menjadi Anak Indonesia',
    emoji: '🇮🇩',
    deskripsi:
      'Mari kita pelajari kebhinekaan, Pancasila, dan identitas nasional. Indonesia satu dalam perbedaan.',
    tujuan: [
      'Menjelaskan makna Bhinneka Tunggal Ika 🌈',
      'Menghubungkan Pancasila dengan kehidupan sehari-hari 📜',
      'Menunjukkan sikap cinta tanah air 🇮🇩',
    ],
    badgeEmoji: '🇮🇩',
    badgeNama: 'Patriot Muda',
    bagian1: {
      judul: 'Kebhinekaan & Bhinneka Tunggal Ika',
      konten: `<p>Mari kita pelajari identitas bangsa. Indonesia 🇮🇩 adalah negara kepulauan dengan lebih dari 17.000 pulau.</p>
<p>Andi dan Rina membahas peta di kelas. "Kita beda suku, agama, dan bahasa," kata Andi. "Tapi tetap satu."</p>
<p><strong>Bhinneka Tunggal Ika</strong> artinya berbeda-beda tetapi tetap satu. Itulah semangat kebhinekaan. 🌈</p>
<p>Perhatikan contoh berikut: di pasar, orang Jawa, Batak, Bugis, dan Papua berdagang berdampingan. Perbedaan menjadi kekuatan, bukan pemisah.</p>
<p>Kebhinekaan bukan sekadar slogan. Ia hidup saat kita saling menghormati dan menolong tanpa memandang asal.</p>`,
      quiz: [
        {
          soal: "'Kebhinekaan' paling tepat artinya...",
          pilihan: [
            'Persatuan dalam perbedaan',
            'Semua orang harus sama',
            'Saling bertengkar antar suku',
            'Hidup sendirian tanpa komunitas',
          ],
          jawabanIdx: 0,
        },
        {
          soal: 'Semboyan "Bhinneka Tunggal Ika" berarti...',
          pilihan: [
            'Berbeda-beda tetapi tetap satu',
            'Hanya satu suku yang diutamakan',
            'Tidak boleh berbeda pendapat',
            'Indonesia hanya punya satu bahasa daerah',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    bagian2: {
      judul: 'Pancasila & Cinta Tanah Air',
      konten: `<p>Perhatikan contoh berikut. Pancasila adalah dasar negara yang harus kita junjung. 📜</p>
<p>Rina menuliskan lima sila di papan. "Sila pertama sampai kelima membimbing cara kita hidup bersama," jelasnya.</p>
<p>Cinta tanah air tampak dari tindakan kecil: menjaga kebersihan lingkungan, menghormati bendera, dan memakai produk dalam negeri bila memungkinkan.</p>
<p>Andi menambahkan, "Identitas nasional bukan hanya upacara. Ia ada di sikap jujur, adil, dan peduli sesama."</p>
<p>Sebagai anak Indonesia, kita bangga tanpa merendahkan bangsa lain. Bangga yang sehat = menghargai diri sendiri sambil terbuka belajar dari dunia.</p>`,
      quiz: [
        {
          soal: 'Pancasila adalah dasar negara yang harus kita _____.',
          pilihan: ['lupakan', 'junjung', 'hina', 'abaikan'],
          jawabanIdx: 1,
        },
        {
          soal: 'Contoh sikap cinta tanah air yang tepat adalah...',
          pilihan: [
            'Menjaga kebersihan dan menghormati lambang negara',
            'Menebang hutan sembarangan',
            'Mengejek budaya daerah lain',
            'Membuang sampah ke sungai',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    latihan: [
      {
        soal: "'Kebhinekaan' artinya...",
        pilihan: [
          'Persatuan dalam perbedaan',
          'Sama semua tanpa beda',
          'Berantem antar kelompok',
          'Hidup sendirian',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Pancasila adalah dasar negara yang harus kita _____.',
        pilihan: ['lupakan', 'junjung', 'hina', 'abaikan'],
        jawabanIdx: 1,
      },
      {
        soal: 'Jumlah pulau Indonesia diperkirakan lebih dari...',
        pilihan: ['1.000', '5.000', '17.000', '100'],
        jawabanIdx: 2,
      },
      {
        soal: 'Sikap yang mencerminkan Bhinneka Tunggal Ika adalah...',
        pilihan: [
          'Menghormati perbedaan suku dan agama',
          'Memaksa semua orang berbudaya sama',
          'Menolak teman dari daerah lain',
          'Hanya berteman dengan satu kelompok',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Identitas nasional yang sehat berarti...',
        pilihan: [
          'Bangga pada bangsa sambil menghargai bangsa lain',
          'Merendahkan negara tetangga',
          'Tidak peduli sejarah bangsa',
          'Menolak kerja sama internasional',
        ],
        jawabanIdx: 0,
      },
    ],
  },

  // ===== k6-bind-02 =====
  {
    id: 'k6-bind-02',
    judul: 'Musisi Indonesia di Pentas Dunia',
    emoji: '🎤',
    deskripsi:
      'Mari kita pelajari biografi musisi Indonesia, nilai tekun, dan cara menggapai mimpi lewat karya.',
    tujuan: [
      'Mengidentifikasi tokoh musisi Indonesia di kancah dunia 🎵',
      'Menjelaskan peran ketekunan dan kreativitas 💪',
      'Menyusun pesan moral dari kisah biografi ✍️',
    ],
    badgeEmoji: '🎵',
    badgeNama: 'Penggemar Musik',
    bagian1: {
      judul: 'Biografi & Jejak Karya',
      konten: `<p>Mari kita pelajari kisah musisi. Anggun C. Sasmi 🎤 adalah salah satu musisi Indonesia yang tampil di pentas internasional.</p>
<p>Andi membaca biografi singkat. "Dia latihan keras dan tidak menyerah meski jauh dari rumah," ujarnya.</p>
<p>Perhatikan contoh berikut: tekun bukan bakat semata. Latihan harian, evaluasi, dan keberanian tampil membentuk kualitas.</p>
<p>Rina menambahkan, "Ada juga musisi lain yang membawa warna Indonesia lewat lagu, orkestra, atau kolaborasi lintas negara."</p>
<p>Biografi mengajarkan alur: mimpi → usaha → hambatan → bangkit → karya yang berdampak.</p>`,
      quiz: [
        {
          soal: 'Siapa musisi Indonesia yang dikenal go internasional (contoh di materi)?',
          pilihan: ['Anggun C. Sasmi', 'Andi', 'Budi', 'Rina'],
          jawabanIdx: 0,
        },
        {
          soal: 'Dalam biografi musisi, "tekun" paling dekat artinya...',
          pilihan: [
            'Rajin berlatih dan tidak mudah menyerah',
            'Cukup berbakat tanpa latihan',
            'Hanya mengandalkan keberuntungan',
            'Meniru tanpa memahami karya',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    bagian2: {
      judul: 'Tekun, Kreatif, Menggapai Mimpi',
      konten: `<p>Perhatikan contoh berikut. "Tekun itu kunci!" 🎵 — bukan slogan kosong.</p>
<p>Andi menyusun jadwal latihan gitar 30 menit setiap sore. Rina menulis lirik tentang kampung halaman.</p>
<p>Kreativitas tumbuh saat kita mengamati, mencoba, dan memperbaiki. Gagal di panggung kecil adalah latihan untuk panggung besar.</p>
<p>Pesan moral biografi: mimpi butuh kerja nyata. Dukungan keluarga, guru, dan komunitas membantu, tetapi langkah pertama ada di tangan sendiri.</p>
<p>Kamu pun bisa mulai dari skala kecil: paduan suara sekolah, band kelas, atau menulis lagu pendek tentang lingkungan.</p>`,
      quiz: [
        {
          soal: 'Sikap yang mendukung menggapai mimpi di bidang musik adalah...',
          pilihan: [
            'Latihan teratur dan berani mencoba',
            'Menunggu bakat datang sendiri',
            'Menyerah setelah satu kali gagal',
            'Menyalin karya orang tanpa izin',
          ],
          jawabanIdx: 0,
        },
        {
          soal: 'Pesan utama dari kisah musisi yang sukses biasanya...',
          pilihan: [
            'Usaha konsisten mengalahkan hambatan',
            'Sukses tanpa kerja keras',
            'Tidak perlu belajar dari kritik',
            'Hanya orang kota yang boleh bermimpi',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    latihan: [
      {
        soal: 'Siapa musisi Indonesia yang go internasional (contoh materi)?',
        pilihan: ['Anggun C. Sasmi', 'Andi', 'Budi', 'Rina'],
        jawabanIdx: 0,
      },
      {
        soal: "'Tekun' dalam konteks latihan musik berarti...",
        pilihan: [
          'Rajin dan tidak mudah menyerah',
          'Malas berlatih',
          'Hanya tampil sekali setahun',
          'Menolak masukan pelatih',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Langkah realistis memulai mimpi musik di sekolah adalah...',
        pilihan: [
          'Ikut paduan suara atau band sekolah',
          'Langsung tur dunia tanpa latihan',
          'Menghindari semua pertunjukan',
          'Menyerah sebelum mencoba',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Kreativitas musisi tumbuh lewat...',
        pilihan: [
          'Mengamati, mencoba, dan memperbaiki karya',
          'Menyalin tanpa berpikir',
          'Tidak pernah latihan',
          'Menolak kolaborasi',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Nilai yang bisa diambil dari biografi musisi sukses adalah...',
        pilihan: [
          'Ketekunan dan keberanian menghadapi hambatan',
          'Sukses hanya karena nasib',
          'Tidak perlu pendidikan',
          'Mengabaikan etika berkarya',
        ],
        jawabanIdx: 0,
      },
    ],
  },

  // ===== k6-bind-03 =====
  {
    id: 'k6-bind-03',
    judul: 'Taman Nasional dan Situs Warisan Dunia',
    emoji: '🌿',
    deskripsi:
      'Mari kita pelajari kekayaan alam & budaya Indonesia serta cara melestarikannya.',
    tujuan: [
      'Menyebutkan contoh taman nasional dan situs warisan 🏆',
      'Menjelaskan pentingnya pelestarian alam & budaya 🦎',
      'Merumuskan sikap peduli lingkungan 🌍',
    ],
    badgeEmoji: '🌿',
    badgeNama: 'Penjaga Alam',
    bagian1: {
      judul: 'Kekayaan Alam Indonesia',
      konten: `<p>Mari kita pelajari warisan alam. Komodo 🦎 hanya ada di Indonesia. Taman Nasional Komodo diakui sebagai Situs Warisan Dunia UNESCO 🏆.</p>
<p>Andi membuka atlas. "Ada juga Taman Nasional Lorentz, Ujung Kulon, dan banyak lagi," katanya.</p>
<p>Perhatikan contoh berikut: keanekaragaman hayati bukan hanya cantik di foto. Ia menjaga keseimbangan ekosistem dan mendukung kehidupan manusia.</p>
<p>Rina menambahkan, "Jarak antarpulau besar, skala keanekaragaman kita luar biasa. Itu tanggung jawab bersama."</p>
<p>Melestarikan berarti melindungi habitat, menolak perburuan liar, dan mendukung wisata yang bertanggung jawab.</p>`,
      quiz: [
        {
          soal: 'Hewan komodo secara alami hanya ditemukan di...',
          pilihan: ['Indonesia', 'Brasil', 'Kanada', 'Mesir'],
          jawabanIdx: 0,
        },
        {
          soal: 'Taman Nasional Komodo terkenal sebagai...',
          pilihan: [
            'Situs Warisan Dunia UNESCO',
            'Pusat industri baja',
            'Bandara internasional terbesar',
            'Ibukota provinsi baru',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    bagian2: {
      judul: 'Budaya & Cara Melestarikan',
      konten: `<p>Perhatikan contoh berikut. Warisan dunia tidak hanya alam: candi, batik, dan tradisi lisan juga bagian identitas.</p>
<p>"Kita harus melestarikannya!" 🌿 — kata Rina saat presentasi kelas.</p>
<p>Langkah konkret: buang sampah pada tempatnya, kurangi plastik sekali pakai, ikut kegiatan bersih pantai, dan hormati aturan di kawasan konservasi.</p>
<p>Andi menghitung jarak ke taman nasional terdekat di peta. "Kalau berkunjung, ikuti jalur resmi dan jangan ganggu satwa," ujarnya.</p>
<p>Pelestarian = pengetahuan + sikap. Tanpa keduanya, kekayaan bisa hilang dalam satu generasi.</p>`,
      quiz: [
        {
          soal: 'Sikap tepat saat berkunjung ke taman nasional adalah...',
          pilihan: [
            'Mengikuti aturan dan tidak mengganggu satwa',
            'Membuang sampah di jalur pendakian',
            'Membawa pulang tumbuhan dilindungi',
            'Berteriak keras di habitat hewan',
          ],
          jawabanIdx: 0,
        },
        {
          soal: 'Melestarikan warisan alam dan budaya penting karena...',
          pilihan: [
            'Menjaga identitas dan keberlanjutan generasi',
            'Tidak ada manfaatnya sama sekali',
            'Hanya untuk turis asing',
            'Menghambat ilmu pengetahuan',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    latihan: [
      {
        soal: 'Komodo secara alami hanya ada di...',
        pilihan: ['Indonesia', 'Australia', 'India', 'Jepang'],
        jawabanIdx: 0,
      },
      {
        soal: 'Taman Nasional Komodo adalah contoh...',
        pilihan: [
          'Situs Warisan Dunia UNESCO',
          'Pabrik tekstil',
          'Stadion sepak bola',
          'Pelabuhan peti kemas',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Cara melestarikan alam yang benar...',
        pilihan: [
          'Menjaga habitat dan menolak perburuan liar',
          'Menebang hutan tanpa izin',
          'Membuang limbah ke sungai',
          'Mengabaikan zona konservasi',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Selain alam, warisan budaya Indonesia mencakup...',
        pilihan: [
          'Candi, batik, dan tradisi lisan',
          'Hanya gedung pencakar langit',
          'Hanya makanan cepat saji',
          'Hanya kendaraan bermotor',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Wisata bertanggung jawab berarti...',
        pilihan: [
          'Menghormati aturan kawasan dan lingkungan setempat',
          'Mengambil suvenir dari satwa liar',
          'Merusak terumbu karang untuk foto',
          'Membuang sampah di jalur wisata',
        ],
        jawabanIdx: 0,
      },
    ],
  },

  // ===== k6-bind-04 =====
  {
    id: 'k6-bind-04',
    judul: 'Legenda: Putri Komodo',
    emoji: '🦎',
    deskripsi:
      'Mari kita pelajari teks legenda, majas personifikasi & hiperbola, serta nilai moral cerita.',
    tujuan: [
      'Mengidentifikasi ciri teks legenda 📖',
      'Membedakan majas personifikasi dan hiperbola ✨',
      'Menyimpulkan nilai moral dari cerita 💚',
    ],
    badgeEmoji: '📖',
    badgeNama: 'Pencinta Legenda',
    bagian1: {
      judul: 'Membaca Teks Legenda',
      konten: `<p>Mari kita pelajari teks legenda. Dahulu kala, ada Putri Komodo 🦎. Cerita rakyat ini menghubungkan manusia, alam, dan pulau yang dilindungi.</p>
<p>Andi membaca dengan suara lantang. "Dia digambarkan melindungi pulau dari ancaman," kata Rina.</p>
<p>Legenda biasanya: latar masa lampau, tokoh luar biasa, dan pesan bagi masyarakat. Fakta sejarah bisa bercampur imajinasi.</p>
<p>Perhatikan kalimat: <em>"Pulau Komodo berdiri gagah."</em> Pulau seolah punya sikap manusia — itu majas personifikasi.</p>
<p>Hiperbola membesarkan kesan, misalnya "suaranya menggetarkan tujuh gunung" — bukan arti harfiah, melainkan penekanan emosional.</p>`,
      quiz: [
        {
          soal: "'Pulau Komodo berdiri gagah' adalah majas...",
          pilihan: ['Personifikasi', 'Hiperbola', 'Metafora', 'Simile'],
          jawabanIdx: 0,
        },
        {
          soal: 'Ciri teks legenda yang tepat adalah...',
          pilihan: [
            'Latar masa lampau dan pesan bagi masyarakat',
            'Laporan percobaan laboratorium',
            'Daftar harga pasar modern',
            'Instruksi perakitan mesin',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    bagian2: {
      judul: 'Majas & Nilai Moral',
      konten: `<p>Perhatikan contoh berikut. Personifikasi = benda/alam seolah manusia. Hiperbola = melebih-lebihkan untuk efek.</p>
<p>Rina menulis: "Ombak menari di pantai" (personifikasi). Andi menulis: "Dia menunggu seribu tahun" (hiperbola).</p>
<p>Dari legenda Putri Komodo, kita belajar menghargai alam dan menjaga pulau. 🌿</p>
<p>Nilai moral bukan hafalan kosong. Ia berubah jadi tindakan: tidak merusak habitat, menghormati cerita lokal, dan bersikap adil.</p>
<p>Saat menulis ulang legenda, pilih majas yang mendukung suasana — jangan berlebihan sampai makna kabur.</p>`,
      quiz: [
        {
          soal: 'Dari legenda Putri Komodo, kita belajar...',
          pilihan: ['Menghargai alam', 'Mencuri', 'Berbohong', 'Malas'],
          jawabanIdx: 0,
        },
        {
          soal: 'Kalimat "Dia menunggu seribu tahun" paling dekat dengan majas...',
          pilihan: ['Hiperbola', 'Personifikasi', 'Simile', 'Ironi semata'],
          jawabanIdx: 0,
        },
      ],
    },
    latihan: [
      {
        soal: "'Pulau Komodo berdiri gagah' adalah majas...",
        pilihan: ['Personifikasi', 'Hiperbola', 'Metafora', 'Simile'],
        jawabanIdx: 0,
      },
      {
        soal: 'Dari legenda Putri Komodo, kita belajar...',
        pilihan: ['Menghargai alam', 'Mencuri', 'Berbohong', 'Malas'],
        jawabanIdx: 0,
      },
      {
        soal: 'Hiperbola berfungsi untuk...',
        pilihan: [
          'Melebih-lebihkan agar kesan lebih kuat',
          'Menyebut data ilmiah persis',
          'Menghapus tokoh cerita',
          'Mengganti latar ke masa depan saja',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Personifikasi membuat benda seolah...',
        pilihan: [
          'Memiliki sifat atau tindakan manusia',
          'Hilang dari cerita',
          'Menjadi angka statistik',
          'Tidak punya makna',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Nilai moral legenda sebaiknya...',
        pilihan: [
          'Diterapkan dalam sikap nyata',
          'Diabaikan setelah ujian',
          'Hanya untuk tokoh fiksi',
          'Digunakan untuk menipu',
        ],
        jawabanIdx: 0,
      },
    ],
  },

  // ===== k6-bind-05 =====
  {
    id: 'k6-bind-05',
    judul: 'Anak-Anak yang Mengubah Dunia',
    emoji: '🌍',
    deskripsi:
      'Mari kita pelajari tokoh muda inspiratif: berani bermimpi dan beraksi untuk perubahan positif.',
    tujuan: [
      'Mengidentifikasi tokoh muda inspiratif 💪',
      'Menjelaskan hubungan mimpi dan aksi nyata 🎯',
      'Merancang aksi kecil yang berdampak di sekolah 🌱',
    ],
    badgeEmoji: '🌍',
    badgeNama: 'Pengubah Dunia',
    bagian1: {
      judul: 'Tokoh Muda Inspiratif',
      konten: `<p>Mari kita pelajari tokoh muda. Greta Thunberg 🌍 mulai aktif menyuarakan isu lingkungan sejak umur 15.</p>
<p>"Anak muda bisa mengubah dunia," kata Rina. Andi mengangguk. "Asal berani bermimpi dan beraksi." 💪</p>
<p>Perhatikan contoh berikut: inspirasi global tidak meniadakan aksi lokal. Membersihkan sungai sekolah sama berharganya di skala kita.</p>
<p>Tokoh muda lain di berbagai negara memperjuangkan pendidikan, kesetaraan, atau kesehatan. Intinya: usia muda bukan alasan diam.</p>
<p>Kita membaca biografi untuk meniru etos kerja, bukan meniru gaya hidup secara membabi buta.</p>`,
      quiz: [
        {
          soal: 'Greta Thunberg dikenal sebagai aktivis di bidang...',
          pilihan: ['Lingkungan', 'Olahraga balap', 'Kuliner cepat saji', 'Desain mode saja'],
          jawabanIdx: 0,
        },
        {
          soal: 'Pesan "Berani bermimpi, berani beraksi" menekankan...',
          pilihan: [
            'Mimpi dilengkapi tindakan nyata',
            'Cukup bermimpi tanpa usaha',
            'Aksi tanpa tujuan',
            'Menunggu orang lain bertindak saja',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    bagian2: {
      judul: 'Dari Mimpi ke Aksi di Sekitarmu',
      konten: `<p>Perhatikan contoh berikut. Andi mengusulkan bank sampah kelas. Rina membuat poster hemat listrik.</p>
<p>Skala aksi bisa kecil: mentor adik kelas, kampanye baca buku, atau penggalangan donasi buku bekas.</p>
<p>Perubahan dunia sering lahir dari langkah pertama yang konsisten. Uang, jarak, dan usia bukan penghalang mutlak — perencanaan yang jelas lebih penting.</p>
<p>Evaluasi aksi: apa tujuannya, siapa terbantu, bagaimana mengukur hasil. Itu melatih berpikir kritis, bukan sekadar viral.</p>
<p>Kamu pengubah dunia versi sekolahmu — mulai hari ini.</p>`,
      quiz: [
        {
          soal: 'Contoh aksi positif di sekolah adalah...',
          pilihan: [
            'Bank sampah atau kampanye hemat energi',
            'Mengejek teman yang berbeda',
            'Merusak fasilitas umum',
            'Menyebarkan hoaks',
          ],
          jawabanIdx: 0,
        },
        {
          soal: 'Aksi yang baik sebaiknya...',
          pilihan: [
            'Punya tujuan jelas dan bisa dievaluasi',
            'Tanpa rencana sama sekali',
            'Hanya untuk pamer',
            'Merugikan orang lain',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    latihan: [
      {
        soal: 'Greta Thunberg mulai aktivis lingkungan sejak usia sekitar...',
        pilihan: ['15 tahun', '5 tahun', '50 tahun', '3 tahun'],
        jawabanIdx: 0,
      },
      {
        soal: '"Berani bermimpi, berani beraksi" berarti...',
        pilihan: [
          'Mimpi diikuti tindakan nyata',
          'Hanya berangan-angan',
          'Menyerah di awal',
          'Menyalakan konflik',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Anak muda dapat berkontribusi dengan...',
        pilihan: [
          'Aksi lokal yang konsisten dan bermanfaat',
          'Diam total tanpa peduli',
          'Merusak lingkungan',
          'Menyebarkan berita bohong',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Sebelum aksi besar, langkah bijak adalah...',
        pilihan: [
          'Merencanakan tujuan dan cara mengukur hasil',
          'Bertindak tanpa pikir panjang',
          'Menyalin ide tanpa konteks',
          'Mengabaikan dampak ke orang lain',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Inspirasi dari tokoh dunia sebaiknya...',
        pilihan: [
          'Disesuaikan menjadi aksi positif di lingkungan sendiri',
          'Dihafal tanpa diamalkan',
          'Digunakan untuk merendahkan teman',
          'Diabaikan karena "masih kecil"',
        ],
        jawabanIdx: 0,
      },
    ],
  },

  // ===== k6-bind-06 =====
  {
    id: 'k6-bind-06',
    judul: 'Liburan Perpisahan Kelas',
    emoji: '🎓',
    deskripsi:
      'Mari kita pelajari cara menulis kenangan sekolah, surat perpisahan, dan harapan masa depan.',
    tujuan: [
      'Menulis kenangan sekolah dengan bahasa runtut ✍️',
      'Menyusun surat perpisahan yang sopan dan tulus ✉️',
      'Merumuskan harapan masa depan secara realistis 🌟',
    ],
    badgeEmoji: '🎓',
    badgeNama: 'Alumni Ceria',
    bagian1: {
      judul: 'Kenangan & Makna Perpisahan',
      konten: `<p>Mari kita pelajari teks perpisahan. Enam tahun di SD meninggalkan jejak: guru, teman, dan pelajaran hidup.</p>
<p>Andi menulis daftar kenangan: lomba 17-an, pramuka, dan belajar kelompok malam sebelum ujian.</p>
<p>Rina berkata, "Perpisahan bukan akhir belajar. Ini gerbang ke jenjang berikutnya." 🎓</p>
<p>Perhatikan contoh berikut: kenangan ditulis kronologis atau tematik (persahabatan, prestasi, tantangan). Pilih sudut yang jelas.</p>
<p>Bahasa kelas 6: terstruktur, tidak bertele-tele, tetap hangat. Emoji boleh, tapi jangan menggantikan kalimat utuh.</p>`,
      quiz: [
        {
          soal: 'Tujuan menulis kenangan sekolah yang baik adalah...',
          pilihan: [
            'Mengabadikan pengalaman dengan bahasa runtut',
            'Menyebar gosip tentang teman',
            'Menghapus semua jejak masa lalu',
            'Menyalin status orang lain tanpa makna',
          ],
          jawabanIdx: 0,
        },
        {
          soal: 'Perpisahan kelas 6 paling tepat dimaknai sebagai...',
          pilihan: [
            'Pintu menuju jenjang belajar berikutnya',
            'Akhir semua persahabatan',
            'Alasan berhenti belajar',
            'Saat untuk merusak barang sekolah',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    bagian2: {
      judul: 'Surat Perpisahan & Harapan',
      konten: `<p>Perhatikan contoh berikut. Andi menulis surat: ✉️</p>
<p><em>"Terima kasih atas 6 tahun yang indah. Sampai jumpa di masa depan!"</em></p>
<p>Struktur surat singkat: salam, ucapan terima kasih, kenangan singkat, harapan, penutup. Sapa guru dan teman dengan sopan.</p>
<p>Rina menambahkan harapan: "Semoga kita tetap jujur, rajin, dan peduli." Harapan sebaiknya spesifik dan bisa diusahakan.</p>
<p>Masa depan tidak harus sempurna di atas kertas. Cukup arah: sekolah lanjutan, minat, dan sikap yang ingin dijaga.</p>
<p>Tutup dengan optimisme yang realistis — bukan janji kosong.</p>`,
      quiz: [
        {
          soal: 'Bagian penting dalam surat perpisahan meliputi...',
          pilihan: [
            'Salam, terima kasih, kenangan, harapan, penutup',
            'Hanya daftar belanja',
            'Ancaman kepada teman',
            'Password akun pribadi',
          ],
          jawabanIdx: 0,
        },
        {
          soal: 'Harapan masa depan yang baik bersifat...',
          pilihan: [
            'Spesifik dan dapat diusahakan',
            'Mustahil dan tanpa usaha',
            'Merugikan orang lain',
            'Samar tanpa arah',
          ],
          jawabanIdx: 0,
        },
      ],
    },
    latihan: [
      {
        soal: 'Andi menulis surat perpisahan untuk...',
        pilihan: [
          'Guru dan teman-teman',
          'Orang yang tidak dikenal di internet saja',
          'Hewan peliharaan tetangga',
          'Mesin fotokopi sekolah',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Kalimat penutup surat yang sopan contohnya...',
        pilihan: [
          'Terima kasih atas 6 tahun yang indah. Sampai jumpa!',
          'Aku tidak mau kenal lagi.',
          'Kalian semua salah.',
          'Tidak usah balas surat ini.',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Kenangan sekolah sebaiknya ditulis...',
        pilihan: [
          'Dengan bahasa runtut dan sudut yang jelas',
          'Acak tanpa ide pokok',
          'Hanya dengan singkatan sulit dibaca',
          'Untuk menjatuhkan nama orang',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Harapan setelah lulus SD yang realistis contohnya...',
        pilihan: [
          'Tetap rajin belajar di jenjang berikutnya',
          'Tidak pernah belajar lagi',
          'Menjadi astronot besok pagi tanpa sekolah',
          'Menghindari semua teman lama dengan marah',
        ],
        jawabanIdx: 0,
      },
      {
        soal: 'Sikap saat perpisahan yang tepat adalah...',
        pilihan: [
          'Bersyukur, sopan, dan menjaga silaturahmi',
          'Merusak fasilitas sekolah',
          'Menghina guru',
          'Membuang kenang-kenangan teman',
        ],
        jawabanIdx: 0,
      },
    ],
  },
];


function shuffleQuizAnswers(data) {
  // Deterministic shuffle based on id so regen is stable
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function reorder(quiz, salt) {
    const correct = quiz.pilihan[quiz.jawabanIdx];
    const others = quiz.pilihan.filter((_, i) => i !== quiz.jawabanIdx);
    const n = (hash(salt) % 4);
    const newPilihan = [...others];
    newPilihan.splice(n % (others.length + 1), 0, correct);
    // ensure length 4
    while (newPilihan.length < 4) newPilihan.push('—');
    quiz.pilihan = newPilihan.slice(0, 4);
    quiz.jawabanIdx = quiz.pilihan.indexOf(correct);
  }
  data.bagian1.quiz.forEach((q, i) => reorder(q, data.id + '-b1-' + i));
  data.bagian2.quiz.forEach((q, i) => reorder(q, data.id + '-b2-' + i));
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
