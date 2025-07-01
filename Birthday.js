// Starfield
for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.className = "stars";
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";
  star.style.animationDuration = (1 + Math.random() * 2) + "s";
  document.body.appendChild(star);
}

// Shooting stars
for (let i = 0; i < 3; i++) {
  const shoot = document.createElement("div");
  shoot.className = "shooting-star";
  shoot.style.top = Math.random() * 50 + "%";
  shoot.style.left = Math.random() * 50 + "%";
  shoot.style.animationDelay = `${Math.random() * 10}s`;
  document.body.appendChild(shoot);
}

const countdown = document.getElementById("countdown");
const birthdayMessage = document.getElementById("birthdayMessage");
const presentButton = document.getElementById("presentButton");

const targetDate = new Date("August 20, 2025 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdown.style.display = "none";
    birthdayMessage.style.display = "block";
    presentButton.style.display = "inline-block";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Confetti animation
presentButton.onclick = () => {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });
  // Later you can trigger other things here too
};

// 🌌 Constellation Mode
const toggleBtn = document.getElementById("toggleConstellation");
const canvas = document.getElementById("constellationCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let constellationActive = false;
let stars = [];

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  });
}

toggleBtn.style.display = "inline-block";

toggleBtn.onclick = () => {
  constellationActive = !constellationActive;
  if (constellationActive) drawConstellations();
  else ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function drawConstellations() {
  if (!constellationActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ae7be3";
  ctx.lineWidth = 0.5;

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawConstellations);
}
