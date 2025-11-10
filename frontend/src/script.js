// MAIN UI script (index page)
// wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  // If current page is index.html, protect route: must have token to see page
  if (location.pathname.endsWith("index.html") || location.pathname === "/" || location.pathname.endsWith("/")) {
    // allow if token present, otherwise go to login
    if (!localStorage.getItem("token")) {
      window.location.href = "login.html";
      return; // stop
    }
  }

  // Quotes arrays
  const motivational = [
    "Push yourself, because no one else will do it for you.",
    "Dream big. Work hard. Stay humble.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Be stronger than your excuses.",
    "Every day is another chance to improve.",
    "Small progress is still progress.",
    "Believe you can and you’re halfway there.",
    "You’ve got this — keep moving!",
    "Focus on progress, not perfection.",
    "Success doesn’t come from comfort zones."
  ];

  const life = [
    "Life is what happens when you’re busy making other plans.",
    "Enjoy the little things, for one day they’ll be the big things.",
    "Every moment is a fresh beginning.",
    "Difficult roads lead to beautiful destinations.",
    "Gratitude turns ordinary moments into blessings.",
    "The purpose of life is to live it fully.",
    "Don’t count the days; make the days count.",
    "Every day is a second chance.",
    "Smile often. It’s free therapy."
  ];

  const selflove = [
    "You are enough, just as you are.",
    "I love the person I am becoming.",
    "I choose peace over perfection.",
    "I deserve love, joy, and kindness.",
    "I release all doubts and embrace self-acceptance.",
    "I am proud of how far I’ve come.",
    "My worth is not defined by others.",
    "I am a beautiful work in progress.",
    "I am grateful for my unique journey."
  ];

  const backgrounds = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    "https://images.unsplash.com/photo-1503264116251-35a269479413",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  ];

  const affirmText = document.getElementById("affirmText");
  const affirmAuthor = document.getElementById("affirmAuthor");
  const nextBtn = document.getElementById("nextBtn");
  const bgOverlay = document.getElementById("bg-overlay");

  const motivationalList = document.getElementById("motivationalList");
  const lifeList = document.getElementById("lifeList");
  const selfloveList = document.getElementById("selfloveList");

  let allQuotes = [...motivational, ...life, ...selflove];
  let i = 0;

  function showAffirmation() {
    if (!affirmText) return;
    affirmText.textContent = `"${allQuotes[i]}"`;
    affirmAuthor.textContent =
      i < motivational.length ? "— Motivational" :
      i < motivational.length + life.length ? "— Life" : "— Self-Love";

    bgOverlay.style.backgroundImage = `url('${backgrounds[i % backgrounds.length]}?auto=format&fit=crop&w=1500&q=80')`;
  }

  if (nextBtn) nextBtn.addEventListener("click", () => {
    i = (i + 1) % allQuotes.length;
    showAffirmation();
  });

  setInterval(() => {
    i = (i + 1) % allQuotes.length;
    showAffirmation();
  }, 10000);

  showAffirmation();

  function displayQuotes(list, container) {
    if (!container) return;
    list.forEach(q => {
      const d = document.createElement("div");
      d.className = "quote";
      d.textContent = q;
      container.appendChild(d);
    });
  }
  displayQuotes(motivational, motivationalList);
  displayQuotes(life, lifeList);
  displayQuotes(selflove, selfloveList);

  // contact demo
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message received (demo). Thank you!");
      contactForm.reset();
    });
  }

  // logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }

  // responsive nav toggle
  const menu = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");
  if (menu && nav) menu.addEventListener("click", () => nav.classList.toggle("active"));
});
