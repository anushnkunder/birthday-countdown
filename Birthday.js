const canvas = document.getElementById("constellationCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
let connections = [];
let currentConnectionIndex = 0;

// Generate fixed stars
const starCount = window.innerWidth < 600 ? 25 : 50;

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  });
}

// Create connections but don’t draw yet
for (let i = 0; i < stars.length; i++) {
  for (let j = i + 1; j < stars.length; j++) {
    const dx = stars[i].x - stars[j].x;
    const dy = stars[i].y - stars[j].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const connectDistance = window.innerWidth < 600 ? 60 : 100;

    if (dist < connectDistance) {
      connections.push([i, j]);
    }
  }
}

// Always draw the stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";

  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

drawStars(); // draw stars immediately on load

// 🎁 Trigger constellation animation after button click
document.getElementById("presentButton").addEventListener("click", () => {
  currentConnectionIndex = 0;
  drawConstellationsAnimated();
});

function drawConstellationsAnimated() {
  drawStars();

  ctx.strokeStyle = "#ae7be3";
  ctx.lineWidth = 0.6;

  for (let k = 0; k < currentConnectionIndex; k++) {
    const [i, j] = connections[k];
    ctx.beginPath();
    ctx.moveTo(stars[i].x, stars[i].y);
    ctx.lineTo(stars[j].x, stars[j].y);
    ctx.stroke();
  }

  if (currentConnectionIndex < connections.length) {
    currentConnectionIndex++;
    setTimeout(drawConstellationsAnimated, 30); // animation speed
  }
}