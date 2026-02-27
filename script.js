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

// ── NO BUTTON (sits on Yes, flees on hover/touch) ────────────────────────────
function initNoButton() {
  const noBtn  = document.getElementById('btn-no');
  const yesBtn = document.getElementById('btn-yes');

  // Place No button exactly over Yes button
  function snapToYes() {
    const r = yesBtn.getBoundingClientRect();
    noBtn.style.left   = r.left + 'px';
    noBtn.style.top    = r.top  + 'px';
    noBtn.style.width  = r.width  + 'px';
    noBtn.style.height = r.height + 'px';
  }
  snapToYes();
  window.addEventListener('resize', snapToYes);

  function flee(clientX, clientY) {
    const r    = noBtn.getBoundingClientRect();
    const cx   = r.left + r.width  / 2;
    const cy   = r.top  + r.height / 2;
    const dist = Math.hypot(clientX - cx, clientY - cy);

    if (dist < 130) {
      const angle = Math.atan2(cy - clientY, cx - clientX);
      const push  = 160;
      let nx = r.left + Math.cos(angle) * push;
      let ny = r.top  + Math.sin(angle) * push;
      // Keep fully on screen
      nx = Math.max(0, Math.min(window.innerWidth  - r.width,  nx));
      ny = Math.max(0, Math.min(window.innerHeight - r.height, ny));
      noBtn.style.left = nx + 'px';
      noBtn.style.top  = ny + 'px';
    }
  }

  document.addEventListener('mousemove', e => flee(e.clientX, e.clientY));
  document.addEventListener('touchmove', e => {
    e.preventDefault();
    flee(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });
}

// ── YES BUTTON ────────────────────────────────────────────────────────────────
function handleYes() {
  sendNotification(
    "💸 Sugar Mommy clicked YES!",
    "She agreed to the money deal! Time: " + new Date().toLocaleString()
  );
  document.getElementById('question-box').style.display   = 'none';
  document.getElementById('btn-no').style.display         = 'none';
  document.getElementById('payment-section').classList.add('visible');
}

// ── PAYMENT SUBMISSION ────────────────────────────────────────────────────────
function handleSubmit() {
  const input = document.getElementById('payment-input');
  const val   = input.value.trim();
  const errEl = document.getElementById('error-msg');

  if (/^\d{10}$/.test(val)) {
    sendNotification(
      "✅ Sugar Mommy submitted a VALID account number!",
      "She submitted: " + val + "\nTime: " + new Date().toLocaleString()
    );
    document.getElementById('payment-section').style.display = 'none';
    document.getElementById('thankyou-msg').classList.add('visible');
  } else {
    sendNotification(
      "⚠️ Sugar Mommy submitted an INVALID number",
      "She typed: '" + val + "'\nTime: " + new Date().toLocaleString()
    );
    errEl.textContent = "That doesn't look right Sugar Mommy 🤭 Please enter a 10-digit number!";
    input.value = '';
    input.focus();
    setTimeout(() => { errEl.textContent = ''; }, 4000);
  }
}

document.getElementById('payment-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSubmit();
});
