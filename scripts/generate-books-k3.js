const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas3/matematika');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function escapeHtml(unsafe) {
    if(!unsafe) return "";
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function template(data) {
  // Array jawaban untuk validasi engine
  const answers = data.sections.map(sec =>
    sec.quiz.pilihan.findIndex(p => p.benar)
  );

  let bgTheme = '#E3F2FD'; // default cerah biru
  if (data.id.endsWith('02') || data.id.endsWith('06')) bgTheme = '#E8F5E9'; // hijau
  else if (data.id.endsWith('03') || data.id.endsWith('07')) bgTheme = '#FFF3E0'; // oranye
  else if (data.id.endsWith('04') || data.id.endsWith('08')) bgTheme = '#F3E5F5'; // ungu
  else if (data.id.endsWith('05') || data.id.endsWith('09')) bgTheme = '#FFFDE7'; // kuning

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — Kelas 3</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body class="kelas3" data-kelas="3" data-pelajaran="mtk" data-materi="${data.id}" style="background-color: ${bgTheme}; --bg: ${bgTheme};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #2e7d32; margin:0 0 8px 0; font-size: 26px;">${data.judul}</h1>
        <p style="color: #666; font-size: 17px;">Matematika — Kelas 3</p>
        <p style="margin-top: 16px; font-size: 17px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Ayo Mulai! 🚀</button>
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

    <!-- Penjelasan & Quiz -->
    ${data.sections.map((sec, i) => `
    <div class="section-card">
      <div class="section-header">📚 Bagian ${i+1}: ${escapeHtml(sec.judul)} <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        ${sec.konten}
        <div class="quiz-box" data-idx="${i}" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 17px;">🤔 Coba Jawab:</p>
          <p style="font-size: 17px;">${escapeHtml(sec.quiz.soal)}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${sec.quiz.pilihan.map((p, pIdx) => `<button class="quiz-opt" data-opt="${pIdx}">${escapeHtml(p.teks)}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 17px;"></div>
        </div>
      </div>
    </div>
    `).join('')}

    <!-- Ringkasan -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 17px;">
        <p>Kamu mendapatkan badge:</p>
        <div style="font-size: 80px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #2e7d32; font-size: 20px;">${data.badgeNama}</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai! ✅</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Selesaikan semua kuis di atas dulu ya)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak Kelas 3)</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Halo! Aku siap bantu kamu belajar. Mau tanya soal ${data.judul}? Ayo kita coba! 💪</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>
  <script>
    window._QUIZ_ANSWERS = ${JSON.stringify(answers)};
    window._TOTAL_SECTIONS = ${data.sections.length};
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

// Data Array untuk k3-mtk-01 hingga k3-mtk-09
const materiListK3Part1 = [
  {
    id: "k3-mtk-01", emoji: "🔢",
    judul: "Membaca & Menulis Bilangan sampai 1.000",
    deskripsi: "Ayo belajar bilangan 3 angka bersama Alfa dan Galih!",
    tujuan: ["Membaca bilangan tiga angka", "Menulis lambang bilangan dari kata"],
    badgeEmoji: "🔢", badgeNama: "Juru Baca Ribuan",
    sections: [
      {
        judul: "Bilangan 3 Angka",
        konten: "<p>Alfa melihat nomor di depan rumah barunya: <code>671</code>.</p><p>Cara membacanya dipisah menjadi tiga bagian: ratusan, puluhan, dan satuan.</p><p><code>6</code> ratusan + <code>7</code> puluhan + <code>1</code> satuan = <strong>Enam ratus tujuh puluh satu</strong>. Keren!</p>",
        quiz: {
          soal: "Bagaimana cara membaca angka 345?",
          pilihan: [
            {teks: "Tiga ratus empat lima", benar: false},
            {teks: "Tiga ratus empat puluh lima", benar: true}
          ]
        }
      },
      {
        judul: "Angka Nol di Tengah",
        konten: "<p>Kalau ada angka 0 di tengah, bagian puluhan tidak perlu dibaca.</p><p>Misalnya, <code>405</code> dibaca <strong>Empat ratus lima</strong>. Jangan sebut nol-nya ya!</p>",
        quiz: {
          soal: "Lambang bilangan dari 'Dua ratus tiga' adalah...",
          pilihan: [
            {teks: "230", benar: false},
            {teks: "203", benar: true}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-02", emoji: "🏠",
    judul: "Nilai Tempat: Ratusan, Puluhan, Satuan",
    deskripsi: "Meutia mengajakmu menguraikan bilangan seperti menyusun balok lego!",
    tujuan: ["Memecah bilangan menjadi ratusan, puluhan, satuan", "Menyusun bilangan dari nilai tempat"],
    badgeEmoji: "🏠", badgeNama: "Arsitek Angka",
    sections: [
      {
        judul: "Menguraikan Bilangan 3 Angka",
        konten: "<p>Meutia punya 523 kelereng. Kita pisahkan yuk!</p><p>523 = 5 ratusan + 2 puluhan + 3 satuan.</p><p>Jadi, 523 = <strong>500 + 20 + 3</strong>. Mantap!</p>",
        quiz: {
          soal: "Bentuk urai dari 456 adalah...",
          pilihan: [
            {teks: "400 + 50 + 6", benar: true},
            {teks: "40 + 50 + 6", benar: false}
          ]
        }
      },
      {
        judul: "Permainan Susun Angka",
        konten: "<p>Kalau kamu punya 3 ratusan, 0 puluhan, dan 7 satuan, angka berapa yang terbentuk?</p><p>Betul! Digabungkan jadi <strong>307</strong>.</p>",
        quiz: {
          soal: "8 ratusan dan 9 satuan disusun menjadi...",
          pilihan: [
            {teks: "89", benar: false},
            {teks: "809", benar: true}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-03", emoji: "⚖️",
    judul: "Membandingkan & Mengurutkan Bilangan",
    deskripsi: "Ayo kita lomba tinggi badan sama Galih!",
    tujuan: ["Menggunakan tanda > dan < untuk bilangan", "Mengurutkan bilangan ratusan naik dan turun"],
    badgeEmoji: "⚖️", badgeNama: "Juru Urut Ribuan",
    sections: [
      {
        judul: "Siapa yang Lebih Besar?",
        konten: "<p>Kita selalu lihat dari <strong>ratusan</strong> (angka paling depan) dulu.</p><p>456 dan 354. Karena 4 ratusan lebih besar dari 3 ratusan, maka <strong>456 > 354</strong>.</p><p>Kalau depannya sama, baru lihat puluhannya!</p>",
        quiz: {
          soal: "Tanda yang tepat untuk 289 ... 291 adalah:",
          pilihan: [
            {teks: "289 > 291", benar: false},
            {teks: "289 < 291", benar: true}
          ]
        }
      },
      {
        judul: "Mengurutkan Data",
        konten: "<p>Andi tingginya 135 cm, Meutia 128 cm, dan Galih 142 cm.</p><p>Urutan dari yang paling pendek (naik): <strong>128 cm, 135 cm, 142 cm</strong>.</p>",
        quiz: {
          soal: "Urutkan dari yang terbesar (turun): 315, 305, 350",
          pilihan: [
            {teks: "350, 315, 305", benar: true},
            {teks: "305, 315, 350", benar: false}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-04", emoji: "➕",
    judul: "Penjumlahan sampai 1.000",
    deskripsi: "Galih menemukan kelereng lagi! Mari kita jumlahkan totalnya.",
    tujuan: ["Menjumlahkan bilangan tanpa dan dengan simpan", "Menyelesaikan soal cerita penjumlahan"],
    badgeEmoji: "➕", badgeNama: "Juru Tambah Ribuan",
    sections: [
      {
        judul: "Penjumlahan Tanpa Simpan",
        konten: "<p>Galih punya 234 kelereng merah dan 125 kelereng biru.</p><p>Kita tambahkan per kolom: satuan (4+5=9), puluhan (3+2=5), ratusan (2+1=3).</p><p>Total kelereng Galih = <strong>359</strong>. Mudah sekali!</p>",
        quiz: {
          soal: "Berapa hasil 142 + 215?",
          pilihan: [
            {teks: "357", benar: true},
            {teks: "367", benar: false}
          ]
        }
      },
      {
        judul: "Penjumlahan Dengan Simpan",
        konten: "<p>Coba hitung: 487 + 256.</p><p>Satuan: 7+6=13 (simpan 1 puluhan). Puluhan: 1 (simpan) + 8 + 5 = 14 (simpan 1 ratusan).</p><p>Ratusan: 1 (simpan) + 4 + 2 = 7. Jadi hasilnya <strong>743</strong>!</p>",
        quiz: {
          soal: "Berapa hasil dari 258 + 164?",
          pilihan: [
            {teks: "422", benar: true},
            {teks: "412", benar: false}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-05", emoji: "➖",
    judul: "Pengurangan sampai 1.000",
    deskripsi: "Waduh, kelereng Andi hilang beberapa! Berapa sisanya?",
    tujuan: ["Mengurangkan bilangan tanpa dan dengan meminjam", "Menyelesaikan soal cerita pengurangan"],
    badgeEmoji: "➖", badgeNama: "Juru Kurang Ribuan",
    sections: [
      {
        judul: "Pengurangan Tanpa Meminjam",
        konten: "<p>Andi punya 567 kelereng, lalu dia bagikan 234 ke Galih.</p><p>Kita kurangi per kolom dari kanan (satuan dulu): 7-4=3, 6-3=3, 5-2=3.</p><p>Sisa kelereng Andi = <strong>333</strong> kelereng.</p>",
        quiz: {
          soal: "Berapa hasil dari 459 - 132?",
          pilihan: [
            {teks: "327", benar: true},
            {teks: "227", benar: false}
          ]
        }
      },
      {
        judul: "Pengurangan Dengan Pinjam",
        konten: "<p>Gimana kalau 402 - 175?</p><p>Satuan (2-5) tidak cukup! Pinjam dari tetangga puluhan. Karena puluhan = 0, pinjam ratusannya dulu. Seru kan?</p><p>Langkah demi langkah akhirnya ketemu hasilnya: <strong>227</strong>.</p>",
        quiz: {
          soal: "Berapa hasil dari 500 - 175?",
          pilihan: [
            {teks: "335", benar: false},
            {teks: "325", benar: true}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-06", emoji: "✖️",
    judul: "Perkalian Bilangan Cacah",
    deskripsi: "Ayo belajar kali-kalian! Hitung lipat dengan asyik.",
    tujuan: ["Memahami perkalian sebagai penjumlahan berulang", "Menghafal perkalian dasar"],
    badgeEmoji: "✖️", badgeNama: "Master Kali",
    sections: [
      {
        judul: "Konsep Perkalian Berulang",
        konten: "<p>Perkalian = penjumlahan yang diulang-ulang. Ingat itu!</p><p>3 × 4 artinya ada 3 kelompok, tiap kelompok isinya 4. Jadi 4 + 4 + 4 = <strong>12</strong>.</p>",
        quiz: {
          soal: "Bagaimana bentuk penjumlahan dari 5 × 2?",
          pilihan: [
            {teks: "5 + 5", benar: false},
            {teks: "2 + 2 + 2 + 2 + 2", benar: true}
          ]
        }
      },
      {
        judul: "Perkalian 0 dan 1",
        konten: "<p>Ada aturan sulap dalam perkalian:</p><p>✨ Apapun dikali <strong>0</strong>, hasilnya <strong>0</strong>. (100 × 0 = 0)</p><p>✨ Apapun dikali <strong>1</strong>, hasilnya <strong>angka itu sendiri</strong>! (50 × 1 = 50)</p>",
        quiz: {
          soal: "Berapa hasil dari 99 × 0?",
          pilihan: [
            {teks: "99", benar: false},
            {teks: "0", benar: true}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-07", emoji: "➗",
    judul: "Pembagian Bilangan Cacah",
    deskripsi: "Meutia membagi-bagikan roti! Berapa bagian tiap orang?",
    tujuan: ["Memahami pembagian", "Mengenal sifat terbalik dari perkalian"],
    badgeEmoji: "➗", badgeNama: "Master Bagi",
    sections: [
      {
        judul: "Konsep Membagi Rata",
        konten: "<p>Galih punya 12 kelereng untuk dibagi ke 3 temannya dengan adil.</p><p>Berapa tiap anak dapat? 12 ÷ 3 = <strong>4</strong>. Jadi tiap teman dapat 4 kelereng!</p>",
        quiz: {
          soal: "Ada 15 apel dibagi ke 5 keranjang. Tiap keranjang isi...",
          pilihan: [
            {teks: "3 apel", benar: true},
            {teks: "5 apel", benar: false}
          ]
        }
      },
      {
        judul: "Kebalikan dari Perkalian",
        konten: "<p>Pembagian itu temannya perkalian. Saling berkebalikan!</p><p>Kalau <strong>3 × 4 = 12</strong>, maka <strong>12 ÷ 3 = 4</strong>, dan <strong>12 ÷ 4 = 3</strong>.</p>",
        quiz: {
          soal: "Karena 6 × 5 = 30, maka 30 ÷ 5 = ...",
          pilihan: [
            {teks: "6", benar: true},
            {teks: "5", benar: false}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-08", emoji: "🧩",
    judul: "Kalimat Matematika: Penjumlahan",
    deskripsi: "Jadi detektif matematika! Temukan angka misteri (□).",
    tujuan: ["Mengisi kotak kosong pada penjumlahan", "Mengerjakan soal cerita"],
    badgeEmoji: "🧩", badgeNama: "Detektif Tambah",
    sections: [
      {
        judul: "Menebak Kotak Kosong",
        konten: "<p>Ada kotak rahasia! <strong>□ + 15 = 40</strong>. Berapa angka di dalam kotak?</p><p>Caranya dibalik! Kalau ditambah, cari jawabannya dengan dikurang: <strong>40 - 15 = 25</strong>.</p><p>Jadi isinya adalah 25.</p>",
        quiz: {
          soal: "Berapa isi kotak: □ + 20 = 50",
          pilihan: [
            {teks: "30", benar: true},
            {teks: "70", benar: false}
          ]
        }
      },
      {
        judul: "Dua Kotak yang Sama",
        konten: "<p>Kalau ada dua kotak sama persis (□ + □ = 30), berarti bilangan tersebut dibelah dua.</p><p>Jawabannya 15 + 15 = 30!</p>",
        quiz: {
          soal: "Bilangan kembar untuk □ + □ = 20 adalah...",
          pilihan: [
            {teks: "10", benar: true},
            {teks: "5", benar: false}
          ]
        }
      }
    ]
  },
  {
    id: "k3-mtk-09", emoji: "🕵️",
    judul: "Kalimat Matematika: Pengurangan",
    deskripsi: "Ayo jadi detektif pengurangan misterius!",
    tujuan: ["Mengisi kotak kosong pada pengurangan"],
    badgeEmoji: "🕵️", badgeNama: "Detektif Kurang",
    sections: [
      {
        judul: "Kotak di Depan",
        konten: "<p>Andi punya kelereng, lalu hilang 12, sisanya tinggal 25. <strong>□ - 12 = 25</strong>.</p><p>Karena itu di depan (awal), jumlah awalnya pasti lebih banyak! Pakai cara dibalik: 25 + 12 = <strong>37</strong>.</p>",
        quiz: {
          soal: "Berapa nilai □ - 10 = 30?",
          pilihan: [
            {teks: "40", benar: true},
            {teks: "20", benar: false}
          ]
        }
      },
      {
        judul: "Kotak di Belakang",
        konten: "<p>Beda lagi kalau <strong>50 - □ = 18</strong>. Ini artinya 50 dikurangi berapa agar jadi 18?</p><p>Caranya adalah kurangi saja: 50 - 18 = <strong>32</strong>.</p>",
        quiz: {
          soal: "Nilai kotak dari 40 - □ = 15 adalah...",
          pilihan: [
            {teks: "25", benar: true},
            {teks: "55", benar: false}
          ]
        }
      }
    ]
  }
];

materiListK3Part1.forEach(materi => {
  const html = template(materi);
  fs.writeFileSync(path.join(outDir, `${materi.id}.html`), html);
});
console.log('✅ Generated 9 Kelas 3 books (Part 1)');
