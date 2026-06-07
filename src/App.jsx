<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>rsa-unit-z649</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
    <meta name="theme-color" content="#050507" />
    <meta name="description" content="RSA Unit Z649 — Command Center for Unit Operations, Personnel, Finance, and Broadcasts." />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>RSA Unit Z649 — Command Center</title>
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
/* ============================================================
   RSA UNIT Z649 — PREMIUM DESIGN SYSTEM "OBSIDIAN LUXE"
   ============================================================ */
/* ——— DESIGN TOKENS ——— */
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
  color-scheme: dark;
  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;
  /* Depth-layered backgrounds */
  --bg-void: #030305;
  --bg-base: #050507;
  --bg-surface-1: rgba(14, 14, 22, 0.65);
  --bg-surface-2: rgba(22, 22, 36, 0.45);
  --bg-surface-3: rgba(30, 30, 50, 0.30);
  --bg-elevated: rgba(40, 40, 60, 0.35);
  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  /* Text hierarchy */
  --text-primary: #f0f0f5;
  --text-secondary: #8b8fa3;
  --text-tertiary: #505468;
  --text-inverse: #050507;
  /* Accent palette */
  --accent-primary: #7c6aff;
  --accent-primary-dim: rgba(124, 106, 255, 0.12);
  --accent-secondary: #a78bfa;
  --accent-tertiary: #c084fc;
  --accent-glow: rgba(124, 106, 255, 0.25);
  /* Semantic colors */
  --color-success: #34d399;
  --color-success-dim: rgba(52, 211, 153, 0.12);
  --color-danger: #f87171;
  --color-danger-dim: rgba(248, 113, 113, 0.12);
  --color-warning: #fbbf24;
  --color-info: #60a5fa;
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-medium: rgba(255, 255, 255, 0.10);
  --border-highlight: rgba(124, 106, 255, 0.30);
  --border-glow: rgba(124, 106, 255, 0.50);
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 40px rgba(124, 106, 255, 0.15);
  --shadow-card-hover: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(124, 106, 255, 0.08);
  /* Typography */
  --font-display: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-pill: 100px;
  /* Motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 200ms;
  --duration-normal: 350ms;
  --duration-slow: 600ms;
  --duration-slower: 1000ms;
}
/* ——— RESET ——— */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  background-color: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  text-rendering: optimizeLegibility;
  user-select: none;
}
  @media (max-width: 1024px) {
    font-size: 16px;
  }
#root { height: 100%; }
input, textarea, select {
  user-select: text;
  -webkit-user-select: text;
  font-family: var(--font-body);
  outline: none;
}
@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }
::-webkit-scrollbar { width: 0; height: 0; }
::selection { background: var(--accent-primary); color: #fff; }
  #social .button-icon {
    filter: invert(1) brightness(2);
  }
/* ——— ANIMATED GRADIENT MESH BACKGROUND ——— */
.gradient-mesh {
  position: fixed;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  background: var(--bg-void);
}
body {
  margin: 0;
.gradient-mesh__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform;
}
#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
.gradient-mesh__orb--1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(124, 106, 255, 0.20) 0%, transparent 70%);
  top: -15%;
  left: -10%;
  animation: orbFloat1 25s infinite alternate var(--ease-out-expo);
}
.gradient-mesh__orb--2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  bottom: -10%;
  right: -15%;
  animation: orbFloat2 30s infinite alternate var(--ease-out-expo);
}
.gradient-mesh__orb--3 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(192, 132, 252, 0.10) 0%, transparent 70%);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: orbFloat3 22s infinite alternate var(--ease-out-expo);
}
@keyframes orbFloat1 {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(80px, 60px) scale(1.1); }
  66% { transform: translate(-40px, 120px) scale(0.95); }
  100% { transform: translate(60px, -40px) scale(1.05); }
}
@keyframes orbFloat2 {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-70px, -50px) scale(1.15); }
  66% { transform: translate(50px, -90px) scale(0.9); }
  100% { transform: translate(-60px, 30px) scale(1.1); }
}
@keyframes orbFloat3 {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-30%, -60%) scale(1.2); }
  100% { transform: translate(-70%, -40%) scale(0.9); }
}
/* Grain/noise overlay */
.noise-layer {
  position: fixed;
  inset: 0;
  z-index: -5;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  mix-blend-mode: overlay;
}
/* Vignette overlay */
.vignette-layer {
  position: fixed;
  inset: 0;
  z-index: -4;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(3, 3, 5, 0.6) 100%);
}
/* ——— CINEMATIC SPLASH SCREEN ——— */
.splash {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: opacity 1.2s var(--ease-out-expo), visibility 1.2s;
}
h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
.splash--hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
.splash__shield {
  width: 64px;
  height: 64px;
  color: var(--accent-primary);
  opacity: 0;
  animation: splashShield 3s var(--ease-out-expo) forwards;
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
@keyframes splashShield {
  0% { opacity: 0; transform: scale(0.5); filter: blur(10px); }
  20% { opacity: 1; transform: scale(1); filter: blur(0); }
  60% { opacity: 1; transform: scale(1); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: scale(1.1); filter: blur(8px); }
}
p {
  margin: 0;
.splash__text {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  animation: splashText 3s 0.3s var(--ease-out-expo) forwards;
}
code,
.counter {
  font-family: var(--mono);
@keyframes splashText {
  0% { opacity: 0; transform: translateY(12px); letter-spacing: 0.5em; filter: blur(8px); }
  25% { opacity: 1; transform: translateY(0); letter-spacing: 0.3em; filter: blur(0); }
  65% { opacity: 1; }
  100% { opacity: 0; filter: blur(6px); }
}
.splash__line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  opacity: 0;
  animation: splashLine 3s 0.15s var(--ease-out-expo) forwards;
}
@keyframes splashLine {
  0% { opacity: 0; width: 0; }
  20% { opacity: 0.6; width: 60px; }
  65% { opacity: 0.6; }
  100% { opacity: 0; width: 100px; }
}
/* ——— TOP BAR ——— */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 90;
  background: linear-gradient(180deg, rgba(5, 5, 7, 0.8) 0%, transparent 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.top-bar__logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
}
.top-bar__logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 12px var(--accent-glow);
  animation: logoPulse 3s infinite ease-in-out;
}
@keyframes logoPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}
.top-bar__admin-btn {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.top-bar__admin-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-medium);
  background: var(--bg-surface-2);
}
.top-bar__admin-btn--active {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  background: var(--accent-primary-dim);
  box-shadow: 0 0 20px var(--accent-glow);
}
/* ——— FLOATING DOCK ——— */
.dock {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 4px;
  padding: 8px;
  background: rgba(12, 12, 18, 0.7);
  backdrop-filter: blur(40px) saturate(1.5);
  -webkit-backdrop-filter: blur(40px) saturate(1.5);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset;
}
.dock__item {
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out-expo);
}
.dock__item:hover {
  color: var(--text-primary);
  transform: translateY(-6px) scale(1.15);
}
.dock__item--active {
  color: var(--text-inverse);
  background: var(--accent-primary);
  box-shadow: 0 4px 20px var(--accent-glow);
}
.dock__item--active:hover {
  transform: translateY(-6px) scale(1.15);
}
/* Active dot indicator */
.dock__item--active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 8px var(--accent-primary);
}
.dock__tooltip {
  position: absolute;
  top: -42px;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: rgba(10, 10, 16, 0.9);
  backdrop-filter: blur(12px);
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid var(--border-subtle);
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-out-expo);
}
.dock__item:hover .dock__tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
/* ——— KINETIC SCROLL ENGINE ——— */
.scroll-engine {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.scroll-section {
  min-height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 88px 28px 110px;
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: all var(--duration-slower) var(--ease-out-expo);
}
.scroll-section--active {
  opacity: 1;
  transform: translateY(0) scale(1);
}
/* ——— BENTO LAYOUT ——— */
.bento-wrap {
  width: 100%;
  max-width: 1200px;
  min-height: 0;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-bottom: var(--space-xl);
}
.bento-wrap::-webkit-scrollbar { display: none; }
/* Section header */
.section-header {
  padding: 0 var(--space-sm);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--space-md);
}
.section-header__left { display: flex; flex-direction: column; gap: 6px; }
.section-header__actions {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}
/* ——— BENTO CARD ——— */
.card {
  position: relative;
  background: var(--bg-surface-1);
  backdrop-filter: blur(24px) saturate(1.2);
  -webkit-backdrop-filter: blur(24px) saturate(1.2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-2xl);
  padding: var(--space-xl);
  transition: all var(--duration-normal) var(--ease-out-expo);
  overflow: hidden;
  word-wrap: break-word;
}
/* Animated gradient border on hover */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(124, 106, 255, 0.0) 40%,
    rgba(124, 106, 255, 0.0) 60%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  transition: all var(--duration-slow) var(--ease-out-expo);
}
.card:hover {
  background: var(--bg-elevated);
  border-color: var(--border-medium);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}
.card:hover::before {
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(124, 106, 255, 0.3) 30%,
    rgba(167, 139, 250, 0.2) 70%,
    transparent 100%
  );
}
/* Card stagger entrance */
.card[data-stagger] {
  animation: cardEntrance var(--duration-slow) var(--ease-out-expo) both;
}
@keyframes cardEntrance {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
/* ——— GRIDS ——— */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: var(--space-lg);
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}
/* ——— TYPOGRAPHY ——— */
.t-display {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--text-primary);
}
.t-label {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 6px;
}
.t-label--accent {
  color: var(--accent-primary);
}
.t-metric {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  letter-spacing: -0.04em;
  line-height: 1;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.t-metric--accent {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  background-clip: text;
}
.t-body {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.65;
}
.t-heading {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
.t-subheading {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}
/* ——— BUTTONS ——— */
.btn {
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  border: none;
  transition: all var(--duration-fast) var(--ease-out-expo);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
.btn--primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: #fff;
  box-shadow: 0 4px 16px var(--accent-glow);
}
.btn--primary:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 6px 24px rgba(124, 106, 255, 0.35);
}
.btn--primary:active {
  transform: translateY(0) scale(0.98);
}
.btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
.btn--secondary {
  background: var(--bg-surface-2);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}
.btn--secondary:hover {
  background: var(--bg-elevated);
  border-color: var(--border-medium);
  transform: translateY(-1px);
}
.btn--ghost {
  background: transparent;
  color: var(--text-secondary);
  padding: 8px;
  border-radius: var(--radius-md);
}
.btn--ghost:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}
.btn--ghost-danger:hover {
  color: var(--color-danger);
  background: var(--color-danger-dim);
}
.btn--icon {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-secondary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.btn--icon:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}
.btn--icon-danger:hover {
  color: var(--color-danger);
  background: var(--color-danger-dim);
}
/* ——— STATUS PILLS ——— */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
}
.pill--accent {
  background: var(--accent-primary-dim);
  color: var(--accent-primary);
  border-color: rgba(124, 106, 255, 0.15);
}
.pill--success {
  background: var(--color-success-dim);
  color: var(--color-success);
  border-color: rgba(52, 211, 153, 0.15);
}
.pill--danger {
  background: var(--color-danger-dim);
  color: var(--color-danger);
  border-color: rgba(248, 113, 113, 0.15);
}
/* Dot indicator */
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.dot--pulse {
  animation: dotPulse 2s infinite ease-in-out;
}
@keyframes dotPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.4); }
}
/* ——— FORM ELEMENTS ——— */
.input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-primary) !important;
  background: rgba(255, 255, 255, 0.03) !important;
  transition: all var(--duration-fast) var(--ease-smooth);
  margin-bottom: var(--space-md);
}
.input::placeholder {
  color: var(--text-tertiary);
}
.input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-primary-dim), 0 0 20px rgba(124, 106, 255, 0.08);
  background: rgba(255, 255, 255, 0.04) !important;
}
select.input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238b8fa3' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 16px center !important;
  cursor: pointer;
}
select.input option {
  background: #0a0a0f;
  color: var(--text-primary);
}
textarea.input {
  resize: vertical;
  min-height: 80px;
}
/* ——— MODAL ——— */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(3, 3, 5, 0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: overlayFadeIn var(--duration-normal) var(--ease-out-expo);
}
@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal-window {
  background: rgba(10, 10, 16, 0.95);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid var(--border-subtle);
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  animation: modalSlideUp var(--duration-normal) var(--ease-out-expo);
  scrollbar-width: none;
}
.modal-window::-webkit-scrollbar { display: none; }
@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
}
.modal-header__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.modal-submit {
  width: 100%;
  padding: 16px;
  margin-top: var(--space-lg);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
/* ——— DIVIDER ——— */
.divider {
  border: none;
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-lg) 0;
}
/* ——— LIST ITEMS ——— */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--border-subtle);
  gap: var(--space-md);
  transition: background var(--duration-fast) var(--ease-smooth);
}
.list-item:last-child { border-bottom: none; }
/* ——— GALLERY CARD ——— */
.gallery-card {
  border-radius: var(--radius-2xl);
  overflow: hidden;
}
.gallery-card__preview {
  height: 220px;
  background: var(--bg-surface-2);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.gallery-card__preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery-card__body {
  padding: var(--space-xl);
}
/* ——— METRIC CARD (Dashboard) ——— */
.metric-card {
  position: relative;
}
.metric-card__glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  pointer-events: none;
  border-radius: inherit;
}
.metric-card--personnel .metric-card__glow {
  background: linear-gradient(0deg, rgba(124, 106, 255, 0.05) 0%, transparent 100%);
}
.metric-card--capital .metric-card__glow {
  background: linear-gradient(0deg, rgba(52, 211, 153, 0.05) 0%, transparent 100%);
}
.metric-card--vault .metric-card__glow {
  background: linear-gradient(0deg, rgba(251, 191, 36, 0.04) 0%, transparent 100%);
}
/* ——— COUNTER ANIMATION ——— */
.counter-value {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}
/* ——— MISC UTILS ——— */
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }
/* ——— SELECTABLE TEXT ——— */
.selectable { user-select: text; -webkit-user-select: text; }
/* ——— RESPONSIVE ——— */
@media (max-width: 768px) {
  .scroll-section {
    padding: 76px 16px 100px;
    align-items: flex-start;
  }
  .bento-wrap {
    max-height: calc(100vh - 160px);
    gap: var(--space-md);
  }
  .card {
    padding: var(--space-lg);
    border-radius: var(--radius-xl);
  }
  .grid-2 {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
  .grid-3 {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
  .t-display {
    font-size: 1.8rem;
  }
  .t-metric {
    font-size: 2.5rem;
  }
  .top-bar {
    padding: 16px 20px;
  }
  .dock {
    bottom: 16px;
    width: calc(100% - 32px);
    max-width: 420px;
    justify-content: space-between;
    padding: 6px 12px;
    border-radius: var(--radius-xl);
  }
  .dock__item {
    width: 40px;
    height: 40px;
  }
  .dock__tooltip { display: none; }
  .modal-window {
    padding: var(--space-xl);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    max-width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 90vh;
    animation: modalSlideUpMobile var(--duration-normal) var(--ease-out-expo);
  }
  @keyframes modalSlideUpMobile {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 480px) {
  .t-display { font-size: 1.5rem; }
  .t-metric { font-size: 2rem; }
  .card { padding: 20px; }
}
/* ——— REMOVE VITE DEFAULTS ——— */
.App { padding: 0; }
