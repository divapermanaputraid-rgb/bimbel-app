const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas2/matematika');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function template(data) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.judul} — Kelas 2</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body data-kelas="2" data-pelajaran="mtk" data-materi="${data.id}">
  <div class="progress-container"><div class="progress-fill"></div></div>
  
  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #667eea; margin:0 0 8px 0; font-size: 28px;">${data.judul}</h1>
        <p style="color: #666;">Matematika — Kelas 2</p>
        <p style="margin-top: 16px;">${data.deskripsi}</p>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Penjelasan & Quiz -->
    ${data.sections.map((sec, i) => `
    <div class="section-card">
      <div class="section-header">📚 Bagian ${i+1}: ${sec.judul} <span>▼</span></div>
      <div class="section-body">
        ${sec.konten}
        <div class="quiz-box" data-answered="false">
          <p style="font-weight: bold;">🤔 Cek Pemahaman:</p>
          <p>${sec.quiz.soal}</p>
          <div class="quiz-options">
            ${sec.quiz.pilihan.map(p => `<button class="quiz-opt" data-correct="${p.benar}">${p.teks}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:8px; font-weight:bold;"></div>
        </div>
      </div>
    </div>
    `).join('')}

    <!-- Ringkasan -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center;">
        <p>Kamu mendapatkan badge:</p>
        <div style="font-size: 64px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #667eea; font-size: 20px;">${data.badgeNama}</p>
        <button class="btn" style="margin-top:24px;" onclick="finishBook()">Selesai & Kumpulkan Tugas! ✅</button>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak Groq)</div>
      <div class="ai-msgs">
        <div class="msg ai">Halo! Aku Tutor AI. Mau tanya soal materi ${data.judul}? 😊</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

const materiListPart2 = [
  {
    id: "k2-mtk-11", emoji: "🎨",
    judul: "Pola Bilangan dan Bentuk",
    deskripsi: "Belajar menebak apa yang akan muncul selanjutnya! 🚂",
    tujuan: ["Melanjutkan pola bilangan", "Melanjutkan pola bentuk", "Membuat pola sendiri"],
    badgeEmoji: "🎨", badgeNama: "Master Pola",
    sections: [
      {
        judul: "Pola Bilangan",
        konten: "<p>Lompat 2 terus: 2, 4, 6, 8... Selanjutnya pasti 10! 🐸</p>",
        quiz: {
          soal: "Kalau pola: 5, 10, 15, 20... Angka selanjutnya?",
          pilihan: [{teks:"21", benar:false}, {teks:"25", benar:true}]
        }
      },
      {
        judul: "Pola Bentuk",
        konten: "<p>Pola warna: 🔴🔵🔴🔵... selanjutnya warna apa hayo? Ya, 🔴! ✨</p>",
        quiz: {
          soal: "Lanjutkan pola ini: 🍎🍏🍎🍏🍎...",
          pilihan: [{teks:"🍏", benar:true}, {teks:"🍎", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-12", emoji: "✂️",
    judul: "Setengah dari Benda Utuh (½)",
    deskripsi: "Membagi benda secara adil sama rata! 🍕",
    tujuan: ["Membagi benda jadi 2 sama besar", "Menulis pecahan ½"],
    badgeEmoji: "✂️", badgeNama: "Juru Potong",
    sections: [
      {
        judul: "Membagi Dua Sama Besar",
        konten: "<p>Satu pizza dibagi 2 potongan sama besar. Setiap potong disebut Setengah! 🍕</p>",
        quiz: {
          soal: "Apakah kalau kue dipotong besar sebelah, bisa disebut setengah?",
          pilihan: [{teks:"Bisa", benar:false}, {teks:"Tidak, harus sama besar", benar:true}]
        }
      },
      {
        judul: "Menulis Setengah (½)",
        konten: "<p>Setengah ditulis dengan angka: 1 di atas, garis di tengah, 2 di bawah (½). Artinya 1 dari 2 bagian. ✍️</p>",
        quiz: {
          soal: "Bagaimana cara menulis setengah?",
          pilihan: [{teks:"1/2", benar:true}, {teks:"2/1", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-13", emoji: "🍭",
    judul: "Setengah dari Kumpulan Benda",
    deskripsi: "Bagaimana kalau membagi kelereng? 🔴🔵",
    tujuan: ["Menentukan ½ dari kumpulan benda", "Menjawab soal cerita"],
    badgeEmoji: "🍭", badgeNama: "Juru Bagi",
    sections: [
      {
        judul: "Membagi Kumpulan",
        konten: "<p>Budi punya 8 kelereng. Setengahnya diberikan pada Anton. Berarti Anton dapat 4 kelereng! 🔴</p>",
        quiz: {
          soal: "Setengah dari 10 adalah?",
          pilihan: [{teks:"5", benar:true}, {teks:"6", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-14", emoji: "🍰",
    judul: "Seperempat dari Benda Utuh (¼)",
    deskripsi: "Membagi kue jadi 4 potong! 🍰",
    tujuan: ["Membagi benda jadi 4 sama besar", "Membandingkan ½ dan ¼"],
    badgeEmoji: "🍰", badgeNama: "Juru Kue",
    sections: [
      {
        judul: "Membagi Empat Sama Besar",
        konten: "<p>Kue dipotong 4 untuk ayah, ibu, Budi, dan adik. Tiap orang dapat Seperempat (¼)! 🎂</p>",
        quiz: {
          soal: "Seperempat ditulis angka berapa?",
          pilihan: [{teks:"1/4", benar:true}, {teks:"4/1", benar:false}]
        }
      },
      {
        judul: "½ Lebih Besar atau Lebih Kecil?",
        konten: "<p>Bayangkan kue, kalau dibagi 2 (½) potongannya lebih besar daripada dibagi 4 (¼)! 😮</p>",
        quiz: {
          soal: "Mana potongan yang lebih besar?",
          pilihan: [{teks:"Setengah (1/2)", benar:true}, {teks:"Seperempat (1/4)", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-15", emoji: "⚖️",
    judul: "Berat Benda",
    deskripsi: "Mana yang lebih berat? Gajah atau Semut? 🐘🐭",
    tujuan: ["Membandingkan berat", "Kenal satuan baku (kg, g, ons)"],
    badgeEmoji: "⚖️", badgeNama: "Juru Timbang",
    sections: [
      {
        judul: "Membandingkan Berat",
        konten: "<p>Buku pelajaran jauh lebih berat daripada sebatang pensil. Setuju? 📚 > ✏️</p>",
        quiz: {
          soal: "Manakah benda yang lebih ringan?",
          pilihan: [{teks:"Sepeda", benar:false}, {teks:"Sepatu", benar:true}]
        }
      },
      {
        judul: "Satuan Berat: Kg dan Ons",
        konten: "<p>Biasanya ibu beli beras 5 Kilo (kg). 1 kg itu sama dengan 10 ons lho! ⚖️</p>",
        quiz: {
          soal: "2 kilogram sama dengan berapa ons?",
          pilihan: [{teks:"20 ons", benar:true}, {teks:"200 ons", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-16", emoji: "⏰",
    judul: "Waktu",
    deskripsi: "Belajar membaca jam dinding! ⏱️",
    tujuan: ["Membaca jam", "Menghitung lama waktu"],
    badgeEmoji: "⏰", badgeNama: "Juru Waktu",
    sections: [
      {
        judul: "Membaca Jam",
        konten: "<p>Jarum pendek tunjuk jam, jarum panjang tunjuk menit. Jarum pendek di 3, panjang di 12 = Jam 3 tepat! 🕐</p>",
        quiz: {
          soal: "Jarum pendek di angka 7, jarum panjang di 12. Jam berapakah ini?",
          pilihan: [{teks:"Jam 12", benar:false}, {teks:"Jam 7", benar:true}]
        }
      },
      {
        judul: "Lama Kegiatan",
        konten: "<p>Anton belajar dari jam 4 sampai jam 5. Berarti Anton belajar selama 1 jam! ⏳</p>",
        quiz: {
          soal: "Ibu memasak dari jam 8 pagi sampai jam 10 pagi. Berapa jam ibu memasak?",
          pilihan: [{teks:"2 jam", benar:true}, {teks:"3 jam", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-17", emoji: "🔢",
    judul: "Bilangan 51–100",
    deskripsi: "Menghitung makin tinggi sampai seratus! 💯",
    tujuan: ["Membaca angka 51-100", "Paham nilai tempat"],
    badgeEmoji: "🔢", badgeNama: "Penjelajah 100",
    sections: [
      {
        judul: "Angka Besar",
        konten: "<p>Yuk hitung: 51, 52, 53... sampai 100! 67 dibaca 'Enam puluh tujuh'. 🚂</p>",
        quiz: {
          soal: "Bagaimana cara membaca bilangan 89?",
          pilihan: [{teks:"Delapan puluh sembilan", benar:true}, {teks:"Delapan sembilan", benar:false}]
        }
      },
      {
        judul: "Nilai Tempat Ratusan",
        konten: "<p>Angka 73 berarti 7 Puluhan dan 3 Satuan. 📦</p>",
        quiz: {
          soal: "Angka 90 punya berapa puluhan?",
          pilihan: [{teks:"9 puluhan", benar:true}, {teks:"0 puluhan", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-18", emoji: "📊",
    judul: "Membandingkan Bilangan sampai 100",
    deskripsi: "Sekarang angkanya besar! Siapa pemenangnya? 🥇",
    tujuan: ["Memakai tanda >, <, =", "Mengurutkan angka besar"],
    badgeEmoji: "📊", badgeNama: "Juru Urut",
    sections: [
      {
        judul: "Bandingkan yang Puluhannya Besar",
        konten: "<p>Angka 81 lebih besar dari 65 (81 > 65), karena 8 puluhan menang lawan 6 puluhan. 🐊</p>",
        quiz: {
          soal: "Mana yang benar: 75 ... 80?",
          pilihan: [{teks:"<", benar:true}, {teks:">", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-19", emoji: "📊",
    judul: "Diagram Turus (Batang)",
    deskripsi: "Cara seru melihat data kotak-kotak! 📈",
    tujuan: ["Membaca diagram batang", "Membuat diagram"],
    badgeEmoji: "📊", badgeNama: "Analis Data Cilik",
    sections: [
      {
        judul: "Membaca Diagram Batang",
        konten: "<p>Kalau batang apel naik sampai angka 5, artinya ada 5 apel! 🍏</p>",
        quiz: {
          soal: "Jika batang buku menunjuk angka 3, berapa buku yang ada?",
          pilihan: [{teks:"3 buah", benar:true}, {teks:"5 buah", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-20", emoji: "🎨",
    judul: "Diagram Gambar (Piktogram)",
    deskripsi: "Data menggunakan gambar, bukan sekedar balok! 🖼️",
    tujuan: ["Membaca diagram gambar", "Membandingkan piktogram"],
    badgeEmoji: "🎨", badgeNama: "Ilustrator Data",
    sections: [
      {
        judul: "Piktogram",
        konten: "<p>Kalau 1 gambar apel = 1 buah, dan ada 3 gambar apel berjajar, berarti totalnya 3! 🍎🍎🍎</p>",
        quiz: {
          soal: "Jika kamu melihat gambar 🐶🐶🐶🐶, berapa ekor anjing yang didata?",
          pilihan: [{teks:"4 ekor", benar:true}, {teks:"5 ekor", benar:false}]
        }
      }
    ]
  }
];

materiListPart2.forEach(m => {
  const html = template(m);
  fs.writeFileSync(path.join(outDir, `${m.id}.html`), html);
  console.log(`Generated: ${m.id}.html`);
});
