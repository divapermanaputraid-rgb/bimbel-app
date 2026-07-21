(function () {
  const body = document.body;
  const materiId = body.dataset.materi || "unknown";
  const pages = Array.from(document.querySelectorAll(".page[data-page]"));
  const totalPages = pages.length;
  const progressKey = "progress_" + materiId;
  const doneKey = "done_" + materiId;

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

  window.selesaiMateri = function () {
    try {
      localStorage.setItem(doneKey, "1");
      saveProgress(totalPages);
    } catch (e) {}
    var box = document.querySelector(".badge");
    if (box) box.textContent = "✅ Selesai! Kamu hebat!";
    var start = document.querySelector(".selesai-start");
    var actions = document.querySelector(".selesai-actions");
    if (start) start.classList.add("hidden");
    if (actions) actions.classList.remove("hidden");
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
    document.querySelectorAll(".quiz-item").forEach(function (item) {
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

  document.addEventListener("DOMContentLoaded", function () {
    bindQuiz();
    window.goPage(loadProgress());
  });
})();