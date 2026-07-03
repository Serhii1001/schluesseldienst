// Летающие частицы
const particlesBox = document.getElementById("particles");

for (let i = 0; i < 55; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";

  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = 5 + Math.random() * 8 + "s";
  particle.style.animationDelay = Math.random() * 6 + "s";
  particle.style.opacity = 0.25 + Math.random() * 0.7;

  particlesBox.appendChild(particle);
}

// Плавное появление блоков при скролле
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".card, .price-box div, .area-box, .faq button").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// FAQ: открытие ответов
const answers = {
  "Wie schnell sind Sie vor Ort?":
    "In der Regel hängt die Anfahrtszeit von Ihrem Standort und der aktuellen Auslastung ab. In Pfarrkirchen und Umgebung versuchen wir schnellstmöglich vor Ort zu sein.",
  "Was kostet eine Türöffnung?":
    "Der Preis hängt von Uhrzeit, Entfernung und Aufwand ab. Vor Beginn nennen wir Ihnen immer eine transparente Einschätzung.",
  "Öffnen Sie jede Tür?":
    "Wir prüfen die Situation vor Ort. Eine Öffnung erfolgt nur, wenn Sie berechtigt sind und die Öffnung technisch möglich ist.",
  "Kann ich per Karte bezahlen?":
    "Barzahlung ist möglich. Kartenzahlung kann später ergänzt werden."
};

document.querySelectorAll(".faq button").forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.textContent.replace("+", "").trim();

    const existing = button.nextElementSibling;
    if (existing && existing.classList.contains("faq-answer")) {
      existing.remove();
      return;
    }

    document.querySelectorAll(".faq-answer").forEach((el) => el.remove());

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.textContent = answers[text] || "Weitere Informationen erhalten Sie telefonisch.";

    button.insertAdjacentElement("afterend", answer);
  });
});

// Мягкое движение замка от мышки на ПК
const lockScene = document.querySelector(".lock-scene");

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth < 900 || !lockScene) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  lockScene.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

document.addEventListener("mouseleave", () => {
  if (lockScene) lockScene.style.transform = "rotateY(0deg) rotateX(0deg)";
});