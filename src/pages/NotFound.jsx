<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 — NutriAI | Page Not Found</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />

  <style>
    /* ── RESET & TOKENS ── */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --emerald:        #059669;
      --emerald-mid:    #10b981;
      --emerald-light:  #34d399;
      --mint:           #6ee7b7;
      --white:          #ffffff;
      --glass-bg:       rgba(255, 255, 255, 0.055);
      --glass-border:   rgba(110, 231, 183, 0.2);
      --glass-shadow:   0 8px 40px rgba(0, 0, 0, 0.35),
                        inset 0 1px 0 rgba(255, 255, 255, 0.09);
    }

    html, body { height: 100%; }

    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      /* Radial from upper-right — feels like light through forest canopy */
      background: radial-gradient(ellipse 120% 80% at 80% 10%,
                    #0d3d26 0%,
                    #071c10 42%,
                    #040d07 100%);
      min-height: 100vh;
      color: var(--white);
      overflow-x: hidden;
    }

    /* ── AI PARTICLE CANVAS ── */
    #ai-canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    /* ── AMBIENT GLOW ORBS ── */
    .orb {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }
    .orb-tl {
      width: 640px; height: 640px;
      top: -220px; right: -180px;
      background: radial-gradient(circle,
        rgba(16, 185, 129, 0.16) 0%,
        transparent 68%);
    }
    .orb-bl {
      width: 480px; height: 480px;
      bottom: -180px; left: -140px;
      background: radial-gradient(circle,
        rgba(5, 150, 105, 0.13) 0%,
        transparent 68%);
    }

    /* ── PAGE SHELL ── */
    .page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* ── NAV ── */
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.375rem 3.5rem;
      background: rgba(255, 255, 255, 0.035);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: 'Playfair Display', serif;
      font-size: 1.45rem;
      font-weight: 900;
      color: var(--white);
      text-decoration: none;
      letter-spacing: -0.01em;
    }
    .logo .ai { color: var(--emerald-light); }
    .logo-badge {
      width: 38px; height: 38px;
      border-radius: 11px;
      background: linear-gradient(135deg, var(--emerald), var(--emerald-mid));
      display: flex; align-items: center; justify-content: center;
      font-size: 1.15rem;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.45);
      flex-shrink: 0;
    }

    .nav-links {
      display: flex;
      gap: 2.5rem;
      list-style: none;
    }
    .nav-links a {
      color: rgba(255, 255, 255, 0.55);
      text-decoration: none;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      transition: color 0.22s;
    }
    .nav-links a:hover { color: var(--mint); }

    /* ── MAIN GRID ── */
    main {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 3.5rem;
      padding: 4rem 3.5rem;
      max-width: 1380px;
      width: 100%;
      margin: 0 auto;
    }

    /* ── LEFT: GLASSMORPHISM CARD ── */
    .card {
      background: var(--glass-bg);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid var(--glass-border);
      border-radius: 28px;
      padding: 3.5rem;
      box-shadow: var(--glass-shadow);
      position: relative;
      overflow: hidden;
      max-width: 520px;
    }

    /* Top shimmer accent */
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 18%; right: 18%;
      height: 2px;
      background: linear-gradient(90deg,
        transparent,
        var(--emerald-light),
        var(--mint),
        transparent);
      border-radius: 0 0 4px 4px;
    }

    /* Decorative ghost leaf */
    .card::after {
      content: '🌿';
      position: absolute;
      font-size: 13rem;
      bottom: -2.5rem; right: -2rem;
      opacity: 0.035;
      pointer-events: none;
      line-height: 1;
      transform: rotate(-15deg);
    }

    /* ── STATUS BADGE ── */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.9rem;
      border-radius: 100px;
      background: rgba(110, 231, 183, 0.09);
      border: 1px solid rgba(110, 231, 183, 0.22);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--mint);
      margin-bottom: 1.5rem;
    }
    .badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--emerald-light);
      animation: blink 2.2s ease-in-out infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.25; }
    }

    /* ── 404 NUMERAL ── */
    .num404 {
      font-family: 'Playfair Display', serif;
      font-size: 6.5rem;
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(155deg, var(--emerald-light) 25%, var(--mint) 85%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.875rem;
    }

    /* ── COPY ── */
    .headline {
      font-size: 1.7rem;
      font-weight: 700;
      line-height: 1.32;
      color: var(--white);
      margin-bottom: 0.875rem;
    }
    .headline .hl { color: var(--emerald-light); }

    .body-copy {
      font-size: 0.975rem;
      color: rgba(255, 255, 255, 0.52);
      line-height: 1.76;
      margin-bottom: 2.25rem;
    }

    /* ── BUTTONS ── */
    .btn-row {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.875rem 1.875rem;
      background: linear-gradient(135deg, var(--emerald), var(--emerald-mid));
      color: var(--white);
      text-decoration: none;
      border-radius: 14px;
      font-weight: 600;
      font-size: 0.9rem;
      letter-spacing: 0.02em;
      box-shadow: 0 4px 22px rgba(5, 150, 105, 0.42);
      transition: transform 0.28s ease, box-shadow 0.28s ease;
    }
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 32px rgba(5, 150, 105, 0.54);
    }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.5rem;
      color: rgba(255, 255, 255, 0.55);
      text-decoration: none;
      border-radius: 14px;
      font-weight: 500;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.11);
      transition: color 0.22s, border-color 0.22s;
    }
    .btn-ghost:hover {
      color: var(--mint);
      border-color: var(--glass-border);
    }

    /* ── HINT LINE ── */
    .hint {
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.55rem;
      color: rgba(255, 255, 255, 0.32);
      font-size: 0.82rem;
    }

    /* ── RIGHT: ILLUSTRATION ── */
    .illustration {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      min-height: 500px;
    }

    /* Expanding pulse rings (centered on plate) */
    .pulse {
      position: absolute;
      top: 50%; left: 50%;
      border-radius: 50%;
      border: 1px solid rgba(110, 231, 183, 0.1);
      transform: translate(-50%, -50%);
      animation: pulse 4.5s ease-in-out infinite;
    }
    .pulse:nth-child(1) { width: 320px; height: 320px; animation-delay: 0s; }
    .pulse:nth-child(2) { width: 400px; height: 400px; animation-delay: 1.5s; opacity: 0.6; }
    .pulse:nth-child(3) { width: 480px; height: 480px; animation-delay: 3s;   opacity: 0.3; }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: inherit; }
      50%       { transform: translate(-50%, -50%) scale(1.05); opacity: 0.06; }
    }

    /* ── FLOATING VEGETABLES ── */
    .veg {
      position: absolute;
      font-size: 2.1rem;
      pointer-events: none;
      user-select: none;
      animation: floatVeg var(--d) ease-in-out infinite;
      animation-delay: var(--dl);
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.45));
    }
    @keyframes floatVeg {
      0%, 100% { transform: translateY(0)     rotate(var(--r0)); }
      50%       { transform: translateY(-20px) rotate(var(--r1)); }
    }

    .v1 { top: 4%;    left: 8%;   --d:4.3s; --dl:0s;   --r0:-6deg; --r1: 9deg;  font-size:2.5rem; }
    .v2 { top: 2%;    right: 2%;  --d:3.9s; --dl:.7s;  --r0: 9deg; --r1:-5deg;  font-size:1.9rem; }
    .v3 { top: 42%;   left: -2%;  --d:5.2s; --dl:1.3s; --r0:-9deg; --r1:13deg;  font-size:2rem;   }
    .v4 { bottom: 8%; left: 4%;   --d:4.7s; --dl:.35s; --r0: 6deg; --r1:-11deg; font-size:2.2rem; }
    .v5 { bottom: 3%; right: 3%;  --d:3.7s; --dl:1.9s; --r0:-13deg;--r1: 7deg;  font-size:2rem;   }
    .v6 { top: 36%;   right: -1%; --d:4.9s; --dl:.95s; --r0: 7deg; --r1:-6deg;  font-size:1.85rem;}
    .v7 { bottom:35%; left: -1%;  --d:4.1s; --dl:2.4s; --r0:-4deg; --r1:16deg;  font-size:1.75rem;}

    /* ── 4 [PLATE] 4 GROUP ── */
    .four-group {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .big4 {
      font-family: 'Playfair Display', serif;
      font-size: 185px;
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(165deg, var(--emerald-light) 20%, var(--mint) 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 45px rgba(52, 211, 153, 0.22));
      user-select: none;
    }

    /* ── PLATE (SIGNATURE ELEMENT) ── */
    /*
     * The dinner plate styled as a speech bubble:
     * a glass-morphism circle with a dashed inner rim (like crockery decoration),
     * a 🍽️ + italic "OOPS!" inside, and a curved SVG tail —
     * tying the 404 concept directly to meal planning.
     */
    .plate {
      position: relative;
      width: 262px;
      height: 262px;
      flex-shrink: 0;
    }

    .plate-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.055);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 3px solid var(--emerald-light);
      box-shadow:
        0 0 0 8px rgba(52, 211, 153, 0.06),
        0 0 70px rgba(52, 211, 153, 0.22),
        inset 0 0 40px rgba(16, 185, 129, 0.09);
      animation: glowPulse 3.2s ease-in-out infinite;
    }

    @keyframes glowPulse {
      0%, 100% {
        box-shadow: 0 0 0 8px  rgba(52,211,153,0.06),
                    0 0 70px   rgba(52,211,153,0.22),
                    inset 0 0 40px rgba(16,185,129,0.09);
      }
      50% {
        box-shadow: 0 0 0 14px rgba(52,211,153,0.10),
                    0 0 90px   rgba(52,211,153,0.34),
                    inset 0 0 55px rgba(16,185,129,0.15);
      }
    }

    /* Dashed inner rim — the crockery detail */
    .plate-rim {
      position: absolute;
      inset: 18px;
      border-radius: 50%;
      border: 1.5px dashed rgba(110, 231, 183, 0.32);
    }

    .plate-body {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
    }

    .plate-icon   { font-size: 2.3rem; line-height: 1; }

    .oops-text {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 2.1rem;
      font-weight: 900;
      color: var(--mint);
      text-shadow: 0 0 32px rgba(110, 231, 183, 0.55);
      letter-spacing: -0.01em;
      line-height: 1.1;
    }

    .plate-sub {
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(110, 231, 183, 0.48);
      font-weight: 600;
    }

    /* Speech-bubble tail — SVG arc below-right of plate */
    .plate-tail {
      position: absolute;
      bottom: -38px;
      right: 38px;
      pointer-events: none;
    }

    /* ── FOOTER ── */
    footer {
      background: rgba(255, 255, 255, 0.025);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-top: 1px solid rgba(110, 231, 183, 0.07);
      padding: 1.25rem 3.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    footer a, footer span {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.28);
      text-decoration: none;
      transition: color 0.22s;
    }
    footer a:hover { color: var(--mint); }

    /* ── RESPONSIVE ── */
    @media (max-width: 960px) {
      nav  { padding: 1rem 1.5rem; }
      main {
        grid-template-columns: 1fr;
        padding: 2.5rem 1.5rem;
        gap: 2.5rem;
      }
      .illustration { order: -1; min-height: 380px; }
      .card { max-width: 100%; padding: 2.5rem 2rem; }
      .big4 { font-size: 120px; }
      .plate { width: 200px; height: 200px; }
      .plate-rim { inset: 14px; }
      .oops-text { font-size: 1.6rem; }
      .plate-icon { font-size: 1.8rem; }
      footer { padding: 1rem 1.5rem; }
      .pulse:nth-child(1) { width: 240px; height: 240px; }
      .pulse:nth-child(2) { width: 300px; height: 300px; }
      .pulse:nth-child(3) { width: 360px; height: 360px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .veg, .plate-ring, .pulse, .badge-dot { animation: none !important; }
    }
  </style>
</head>
<body>

<!-- Ambient depth layers -->
<canvas id="ai-canvas"></canvas>
<div class="orb orb-tl"></div>
<div class="orb orb-bl"></div>

<div class="page">

  <!-- ── NAV ── -->
  <nav>
    <a href="#" class="logo">
      <div class="logo-badge">🌿</div>
      Nutri<span class="ai">AI</span>
    </a>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Meal Plans</a></li>
      <li><a href="#">Contact Us</a></li>
    </ul>
  </nav>

  <!-- ── MAIN ── -->
  <main>

    <!-- LEFT: content card -->
    <div class="card">
      <div class="badge">
        <div class="badge-dot"></div>
        Error 404
      </div>

      <h1 class="num404">404</h1>

      <h2 class="headline">
        <span class="hl">Oops!</span> This meal isn't on the menu.
      </h2>

      <p class="body-copy">
        Looks like you've wandered off the recipe. The page you were looking
        for has gone missing — but our AI can still whip up something
        great for you.
      </p>

      <div class="btn-row">
        <a href="#" class="btn-primary">
          <!-- home icon -->
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
               stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Back to Home
        </a>
        <a href="#" class="btn-ghost">
          <!-- search icon -->
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          Explore Recipes
        </a>
      </div>

      <div class="hint">
        <!-- curved arrow -->
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
             stroke-linejoin="round" style="opacity:.5">
          <path d="M9 14 4 9l5-5"/>
          <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
        </svg>
        Don't worry — fresh recipes and meal plans are waiting for you!
      </div>
    </div>

    <!-- RIGHT: illustration -->
    <div class="illustration">

      <!-- Ambient pulse rings (centred on the plate) -->
      <div class="pulse"></div>
      <div class="pulse"></div>
      <div class="pulse"></div>

      <!-- Floating vegetables -->
      <div class="veg v1">🥑</div>
      <div class="veg v2">🥕</div>
      <div class="veg v3">🥦</div>
      <div class="veg v4">🍅</div>
      <div class="veg v5">🌽</div>
      <div class="veg v6">🫑</div>
      <div class="veg v7">🧅</div>

      <!-- 4 [PLATE] 4 -->
      <div class="four-group">

        <span class="big4">4</span>

        <!-- ★ SIGNATURE ELEMENT: dinner plate as speech bubble ★ -->
        <div class="plate">
          <div class="plate-ring"></div>
          <div class="plate-rim"></div>
          <div class="plate-body">
            <div class="plate-icon">🍽️</div>
            <div class="oops-text">OOPS!</div>
            <div class="plate-sub">Page Not Found</div>
          </div>
          <!-- speech-bubble tail -->
          <div class="plate-tail">
            <svg width="58" height="46" viewBox="0 0 58 46" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5 Q22 30 54 42"
                    stroke="#34d399" stroke-width="2.5"
                    stroke-linecap="round" opacity="0.65"/>
              <circle cx="54" cy="42" r="3.5"
                      fill="#34d399" opacity="0.5"/>
            </svg>
          </div>
        </div>

        <span class="big4">4</span>

      </div>
    </div>

  </main>

  <!-- ── FOOTER ── -->
  <footer>
    <a href="#">Privacy Policy</a>
    <span>© 2024 NutriAI — Eat Smart, Live Well</span>
    <a href="#">Terms of Service</a>
  </footer>

</div><!-- /page -->

<script>
  /* ─────────────────────────────────────────
   * AI PARTICLE SYSTEM
   * Dots float upward and connect when close,
   * suggesting an intelligent network — the "AI"
   * in NutriAI made visible.
   * ───────────────────────────────────────── */
  const canvas = document.getElementById('ai-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const TOTAL = 80;
  const LINK_DIST = 95;
  const particles = [];

  class Dot {
    constructor(spreadY) {
      this.reset(spreadY);
    }
    reset(spreadY = false) {
      this.x     = Math.random() * canvas.width;
      this.y     = spreadY ? Math.random() * canvas.height : canvas.height + 8;
      this.r     = Math.random() * 1.8 + 0.3;
      this.vx    = (Math.random() - 0.5) * 0.32;
      this.vy    = -(Math.random() * 0.52 + 0.18);
      this.alpha = Math.random() * 0.55 + 0.08;
      this.fade  = Math.random() * 0.0007 + 0.0003;
      this.mint  = Math.random() > 0.45;   // mint vs emerald
    }
    tick() {
      this.x     += this.vx;
      this.y     += this.vy;
      this.alpha -= this.fade;
      if (this.y < -8 || this.alpha <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.mint ? '#6ee7b7' : '#10b981';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL; i++) particles.push(new Dot(true));

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          ctx.save();
          ctx.globalAlpha = (1 - d / LINK_DIST) * 0.13;
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth   = 0.55;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.tick(); p.draw(); });
    connect();
    requestAnimationFrame(loop);
  }

  // Respect reduced-motion preference
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loop();
  }
</script>

</body>
</html>