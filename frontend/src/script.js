const motivational=[
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

const life=[
  "Life is what happens when you’re busy making other plans.",
  "Enjoy the little things, for one day they’ll be the big things.",
  "Every moment is a fresh beginning.",
  "Difficult roads lead to beautiful destinations.",
  "Peace is not the absence of chaos, but calm in the midst of it.",
  "Gratitude turns ordinary moments into blessings.",
  "The purpose of life is to live it fully.",
  "Don’t count the days; make the days count.",
  "Every day is a second chance.",
  "Smile often. It’s free therapy."
];

const selflove=[
  "You are enough, just as you are.",
  "I love the person I am becoming.",
  "I choose peace over perfection.",
  "I deserve love, joy, and kindness.",
  "I release all doubts and embrace self-acceptance.",
  "I am proud of how far I’ve come.",
  "My worth is not defined by others.",
  "I am a beautiful work in progress.",
  "I am grateful for my unique journey.",
  "I choose to celebrate myself fully."
];

const backgrounds=[
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  "https://images.unsplash.com/photo-1503264116251-35a269479413",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba"
];

const affirmText=document.getElementById("affirmText");
const affirmAuthor=document.getElementById("affirmAuthor");
const nextBtn=document.getElementById("nextBtn");
const bgOverlay=document.getElementById("bg-overlay");

let allQuotes=[...motivational,...life,...selflove];
let i=0;

// Dynamic background + affirmation
function showAffirmation(){
  affirmText.textContent=`"${allQuotes[i]}"`;
  affirmText.style.animation="fadeIn 1s ease";
  affirmAuthor.textContent=
    i<motivational.length?"— Motivational":
    i<motivational.length+life.length?"— Life":"— Self-Love";

  bgOverlay.style.backgroundImage=`url('${backgrounds[i%backgrounds.length]}?auto=format&fit=crop&w=1500&q=80')`;
}

nextBtn.onclick=()=>{i=(i+1)%allQuotes.length;showAffirmation();};
setInterval(()=>{i=(i+1)%allQuotes.length;showAffirmation();},10000);
showAffirmation();

// Populate quotes
function displayQuotes(list,id){
  const container=document.getElementById(id);
  list.forEach(q=>{
    const div=document.createElement("div");
    div.className="quote";
    div.textContent=q;
    container.appendChild(div);
  });
}
displayQuotes(motivational,"motivationalList");
displayQuotes(life,"lifeList");
displayQuotes(selflove,"selfloveList");

// Contact form alert
const form = document.getElementById("contactForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector("input[type='text']").value;
  const email = form.querySelector("input[type='email']").value;
  const message = form.querySelector("textarea").value;

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (data.success) {
      alert("✅ Message sent to backend successfully!");
      form.reset();
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    alert("⚠️ Server not responding. Please try again later.");
  }
});


// Responsive Nav Toggle
const menu=document.getElementById("menu-toggle");
const nav=document.getElementById("nav-links");
menu.addEventListener("click",()=>nav.classList.toggle("active"));

// Scroll To Top Button
const scrollBtn=document.getElementById("scrollTopBtn");
window.addEventListener("scroll",()=>{
  if(document.documentElement.scrollTop>400){scrollBtn.style.display="block";}
  else{scrollBtn.style.display="none";}
});
scrollBtn.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});
