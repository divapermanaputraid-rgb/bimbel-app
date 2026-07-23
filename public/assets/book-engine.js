// bimbel-app/public/assets/book-engine.js
document.addEventListener('DOMContentLoaded', () => {
  let progress = 0;
  const sections = document.querySelectorAll('.section-card');
  const totalSections = sections.length;

  function updateProgress() {
    progress += 1;
    const pct = Math.min(100, Math.floor((progress / totalSections) * 100));
    document.querySelector('.progress-fill').style.width = pct + '%';
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
      
      const isCorrect = this.dataset.correct === "true";
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
    const materiId = document.body.dataset.materi;
    alert("Hore! Kamu sudah menyelesaikan materi ini! 🏆");
    if (navigator.onLine) {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materialId: materiId, status: "completed", skor: 100 })
      });
    }
  };

  // AI Tutor Toggle
  window.toggleChat = () => {
    document.querySelector('.ai-panel').classList.toggle('open');
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
      
      document.getElementById(typingId).remove();
      msgsContainer.innerHTML += `<div class="msg ai">${data.reply || "Maaf AI sedang istirahat."}</div>`;
    } catch (e) {
      document.getElementById(typingId).remove();
      msgsContainer.innerHTML += `<div class="msg ai">Koneksi terputus. Coba lagi ya!</div>`;
    }
    msgsContainer.scrollTop = msgsContainer.scrollHeight;
  };
});
