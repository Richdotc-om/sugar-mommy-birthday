// ── EmailJS ──────────────────────────────────────────────────────────────────
emailjs.init("L6hVKRHjnigEph6-O");
const SERVICE_ID  = "service_l573n4h";
const TEMPLATE_ID = "template_2zdj4op";

function sendNotification(subject, message) {
  emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    to_email : "ghghostrespect@gmail.com",
    subject  : subject,
    message  : message
  }).catch(err => console.warn("EmailJS error:", err));
}

// ── ON PAGE LOAD ─────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  sendNotification(
    "🎂 Sugar Mommy just opened your Birthday Page!",
    "She opened the birthday page on " + new Date().toLocaleString()
  );
  startSong();
  launchConfetti();
  spawnFloatingEmojis();
  initNoButton();
});

// ── SONG ─────────────────────────────────────────────────────────────────────
function startSong() {
  const audio = document.getElementById('birthday-audio');
  const tryPlay = () => audio.play().catch(() => {});
  tryPlay();
  document.body.addEventListener('click',      tryPlay, { once: true });
  document.body.addEventListener('touchstart', tryPlay, { once: true });
}

// ── CONFETTI ─────────────────────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const pieces = Array.from({ length: 160 }, () => ({
    x     : Math.random() * canvas.width,
    y     : Math.random() * canvas.height - canvas.height,
    w     : Math.random() * 12 + 5,
    h     : Math.random() * 6  + 3,
    color : `hsl(${Math.random() * 360},90%,65%)`,
    rot   : Math.random() * 360,
    vx    : (Math.random() - 0.5) * 2,
    vy    : Math.random() * 3 + 1.5,
    vr    : (Math.random() - 0.5) * 4
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.vr;
      if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ── FLOATING EMOJIS ──────────────────────────────────────────────────────────
function spawnFloatingEmojis() {
  const emojis = ['💖','🌸','🌺','💐','🌹','💕','🥂','✨','🎉','💝','🌷','💗'];
  setInterval(() => {
    const el = document.createElement('div');
    el.className   = 'float-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left  = Math.random() * 95 + 'vw';
    el.style.animationDuration = (Math.random() * 5 + 5) + 's';
    el.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 12000);
  }, 600);
}

// ── NO BUTTON ────────────────────────────────────────────────────────────────
function initNoButton() {
  const noBtn  = document.getElementById('btn-no');
  const yesBtn = document.getElementById('btn-yes');

  // Wait for Yes button to be fully painted then position No beside it
  requestAnimationFrame(() => {
    const r = yesBtn.getBoundingClientRect();
    noBtn.style.position = 'fixed';
    noBtn.style.width    = r.width  + 'px';
    noBtn.style.height   = r.height + 'px';
    noBtn.style.left     = (r.right + 16) + 'px';  // 16px gap to the right of Yes
    noBtn.style.top      = r.top + 'px';
    noBtn.style.zIndex   = '999';
    noBtn.style.transition = 'left 0.15s ease, top 0.15s ease';
    noBtn.style.display  = 'block';
  });

  function jumpRandom() {
    const w = noBtn.offsetWidth;
    const h = noBtn.offsetHeight;
    const nx = Math.random() * (window.innerWidth  - w);
    const ny = Math.random() * (window.innerHeight - h);
    noBtn.style.left = nx + 'px';
    noBtn.style.top  = ny + 'px';
  }

  function flee(clientX, clientY) {
    const r    = noBtn.getBoundingClientRect();
    const cx   = r.left + r.width  / 2;
    const cy   = r.top  + r.height / 2;
    const dist = Math.hypot(clientX
