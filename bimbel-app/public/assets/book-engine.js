// bimbel-app/public/assets/book-engine.js
document.addEventListener('DOMContentLoaded', () => {
  let progress = 0;
  const totalSections = window._TOTAL_SECTIONS || 1;
  const answers = window._QUIZ_ANSWERS || [];

  function updateProgress() {
    progress += 1;
    const pct = Math.min(100, Math.floor((progress / totalSections) * 100));
    document.querySelector('.progress-fill').style.width = pct + '%';
    
    // Enable finish button ONLY when all quizzes are correctly answered
    if (progress >= totalSections) {
      const btn = document.getElementById('btn-selesai');
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.classList.remove('disabled');
      }
      const msg = document.getElementById('msg-belum-selesai');
      if (msg) msg.style.display = "none";
    }
  }

  // Toggle Sections
  document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      card.classList.toggle('expanded');
    });
  });

  // Inline Quiz Logic
  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', function() {
      const quizBox = this.closest('.quiz-box');
      if (quizBox.dataset.answered === "true") return;
      
      const qIdx = parseInt(quizBox.dataset.idx);
      const optIdx = parseInt(this.dataset.opt);
      
      // Validasi dari variable JS memori, bukan atribut DOM
      const isCorrect = (optIdx === answers[qIdx]);
      
      this.classList.add(isCorrect ? 'benar' : 'salah');
      
      const feedback = this.parentElement.nextElementSibling;
      if (isCorrect) {
        feedback.innerHTML = "✅ Wah, kamu hebat! Benar sekali! 🎉";
        feedback.style.color = "green";
        quizBox.dataset.answered = "true";
        updateProgress();
      } else {
        feedback.innerHTML = "❌ Ups, kurang tepat. Coba baca lagi perlahan ya 📖";
        feedback.style.color = "red";
      }
    });
  });

  // Finish Book
  window.finishBook = async () => {
    if (progress < totalSections) return; // double check

    const materiId = document.body.dataset.materi;
    alert("Hore! Kamu sudah menyelesaikan materi ini! 🏆");
    if (navigator.onLine) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ materialId: materiId, status: "completed", skor: 100 })
        });
      } catch (err) {
        console.error("Progress save error", err);
      }
    }
  };

  // AI Tutor Toggle
  window.toggleChat = () => {
    const panel = document.querySelector('.ai-panel');
    if (panel) panel.classList.toggle('open');
  };

  window.sendToAI = async () => {
    const input = document.getElementById('ai-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    const msgsContainer = document.querySelector('.ai-msgs');
    msgsContainer.innerHTML += `<div class="msg user">${msg}</div>`;
    input.value = '';
    
    const typingId = "typing-" + Date.now();
    msgsContainer.innerHTML += `<div id="${typingId}" class="msg ai typing">Mengetik...</div>`;
    msgsContainer.scrollTop = msgsContainer.scrollHeight;

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: msg, 
          kelas: document.body.dataset.kelas, 
          materi: document.body.dataset.materi 
        })
      });
      const data = await res.json();
      
      const typingElem = document.getElementById(typingId);
      if (typingElem) typingElem.remove();
      msgsContainer.innerHTML += `<div class="msg ai">${data.reply || "Maaf AI sedang istirahat."}</div>`;
    } catch (e) {
      const typingElem = document.getElementById(typingId);
      if (typingElem) typingElem.remove();
      msgsContainer.innerHTML += `<div class="msg ai">Koneksi terputus. Coba lagi ya!</div>`;
    }
    msgsContainer.scrollTop = msgsContainer.scrollHeight;
  };
});
