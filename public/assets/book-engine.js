(function () {
  const body = document.body;
  const materiId = body.dataset.materi || "unknown";
  const pages = Array.from(document.querySelectorAll(".page[data-page]"));
  const totalPages = pages.length;
  const progressKey = "progress_" + materiId;
  const doneKey = "done_" + materiId;
  let correctAnswers = 0;
  let totalQuestions = 0;

  function getPageEl(n) {
    return document.querySelector('.page[data-page="' + n + '"]');
  }

  function updateProgress(current) {
    var fill = document.querySelector(".progress-fill");
    if (!fill || !totalPages) return;
    fill.style.width = Math.round((current / totalPages) * 100) + "%";
  }

  function saveProgress(halaman) {
    try { localStorage.setItem(progressKey, String(halaman)); } catch (e) {}
  }

  function loadProgress() {
    try {
      var n = parseInt(localStorage.getItem(progressKey) || "1", 10);
      if (!isFinite(n) || n < 1 || n > totalPages) return 1;
      return n;
    } catch (e) { return 1; }
  }

  window.goPage = function (n) {
    var target = Number(n);
    if (!getPageEl(target)) return;
    pages.forEach(function (p) { p.classList.remove("active"); });
    getPageEl(target).classList.add("active");
    updateProgress(target);
    saveProgress(target);
    window.scrollTo(0, 0);
  };

  window.selesaiMateri = async function () {
    var btn = document.querySelector(".btn-selesai");
    if (btn) {
      btn.textContent = "⏳ Menyimpan...";
      btn.disabled = true;
    }

    var skor = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;

    try {
      var res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId: materiId,
          status: "completed",
          skor: skor
        })
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      try {
        localStorage.setItem(doneKey, "1");
        saveProgress(totalPages);
      } catch (e) {}

      var data = await res.json();
      var box = document.querySelector(".badge");
      if (box) box.innerHTML = `✅ Selesai! Kamu hebat!<br><span style="font-size: 14px; color: #48bb78;">+${data.xpEarned || 0} XP!</span>`;

      var start = document.querySelector(".selesai-start");
      var actions = document.querySelector(".selesai-actions");
      if (start) start.classList.add("hidden");
      if (actions) actions.classList.remove("hidden");

    } catch (err) {
      alert("Ups, gagal menyimpan progress. Pastikan internetmu aktif ya!");
      if (btn) {
        btn.textContent = "Selesai Belajar 🎉";
        btn.disabled = false;
      }
    }
  };

  window.bacaUlang = function () {
    try { localStorage.setItem(progressKey, "1"); } catch (e) {}
    window.goPage(1);
  };

  window.keDashboard = function () {
    window.location.href = "/dashboard/siswa";
  };

  window.tutupBuku = function () {
    window.close();
    // window.close() gagal kalau tab tidak dibuka via script — fallback
    setTimeout(function () {
      window.location.href = "/dashboard/siswa";
    }, 150);
  };

  function bindQuiz() {
    var items = document.querySelectorAll(".quiz-item");
    totalQuestions = items.length;
    items.forEach(function (item) {
      var correct = item.dataset.correct;
      var feedback = item.querySelector(".feedback");
      item.querySelectorAll(".quiz-option").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (item.dataset.answered === "1") return;
          var ok = this.dataset.jawaban === correct;
          this.classList.add(ok ? "benar" : "salah");
          if (feedback) {
            feedback.textContent = ok ? "✅ Benar!" : "❌ Coba lagi!";
            feedback.classList.remove("hidden");
          }
          if (ok) {
            correctAnswers++;
            item.dataset.answered = "1";
            item.querySelectorAll(".quiz-option").forEach(function (b) {
              b.disabled = true;
              if (b.dataset.jawaban === correct) b.classList.add("benar");
            });
          }
        });
      });
    });
  }

  function initAITutor() {
    const widgetHTML = `
      <div class="ai-widget" id="ai-widget">
        <button class="ai-toggle" id="ai-toggle">🤖</button>
        <div class="ai-panel hidden" id="ai-panel">
          <div class="ai-header">Kak AI Tutor ✨</div>
          <div class="ai-messages" id="ai-messages">
            <div class="ai-bubble ai">Halo! Aku Kak AI. Ada yang bikin bingung di materi ini? Tanya aja yuk! 😊</div>
          </div>
          <div class="ai-input-area">
            <input type="text" id="ai-input" placeholder="Ketik pertanyaanmu..." autocomplete="off">
            <button id="ai-send">🚀</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    const toggleBtn = document.getElementById("ai-toggle");
    const panel = document.getElementById("ai-panel");
    const input = document.getElementById("ai-input");
    const sendBtn = document.getElementById("ai-send");
    const messages = document.getElementById("ai-messages");

    toggleBtn.addEventListener("click", () => {
      panel.classList.toggle("hidden");
      if (!panel.classList.contains("hidden")) {
        input.focus();
      }
    });

    function appendMessage(role, text) {
      const div = document.createElement("div");
      div.className = `ai-bubble ${role}`;
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      appendMessage("user", text);
      input.value = "";

      const loadingBubble = appendMessage("ai", "Sedang berpikir... 🤔");
      loadingBubble.classList.add("ai-loading");

      try {
        const res = await fetch("/api/ai-tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, materiId: materiId })
        });

        loadingBubble.remove();

        const data = await res.json();
        if (res.ok) {
          appendMessage("ai", data.reply);
        } else {
          appendMessage("ai", data.error || "Aduh, koneksi terputus. Coba lagi ya!");
        }
      } catch (err) {
        loadingBubble.remove();
        appendMessage("ai", "Aduh, Kak AI gagal membalas. Cek internetmu ya!");
      }
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindQuiz();
    initAITutor();
    window.goPage(loadProgress());
  });
})();