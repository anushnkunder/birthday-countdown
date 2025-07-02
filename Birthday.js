// 🌌 Constellation Canvas Logic
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

function generateStars() {
  const starCount = window.innerWidth < 600 ? 30 : 100; // Fewer stars on mobile
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    });
  }
}

generateStars();

toggleBtn.style.display = "inline-block";

toggleBtn.onclick = () => {
  constellationActive = !constellationActive;
  if (constellationActive) {
    generateStars();
    drawConstellations();
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
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

  const connectDistance = window.innerWidth < 600 ? 60 : 100;

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectDistance) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawConstellations);
}