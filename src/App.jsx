import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { 
  Shield, ShieldAlert, Plus, Trash2, UsersRound, CircleDollarSign, 
  Server, Aperture, Settings, X, ArrowUpRight, Mail, Phone,
  Globe, Activity, Crown, BrainCircuit, Send, CalendarClock,
  Hexagon, Zap, Lock, Unlock, Pencil, Eye, FolderArchive,
  HardDrive, RadioTower, BookOpen, Check
} from 'lucide-react';

// ==========================================
// 1. FIREBASE SECURE KERNEL
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyAYyPimaOuXEPi6R6wFNgsrhGOaemQE9J4",
  authDomain: "rsa-unit-z649.firebaseapp.com",
  projectId: "rsa-unit-z649",
  storageBucket: "rsa-unit-z649.firebasestorage.app",
  messagingSenderId: "672346485743",
  appId: "1:672346485743:web:55f86c5ccc65b59930bc1a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ADMIN_SECURE_KEY = "saturday"; 

// ==========================================
// 2. ARCHITECTURAL QUOTES ENGINE
// ==========================================
const ARCH_QUOTES = [
  "\"Architecture is the learned game, correct and magnificent, of forms assembled in the light.\" – Le Corbusier",
  "\"Form ever follows function.\" – Louis Sullivan",
  "\"Less is more.\" – Ludwig Mies van der Rohe",
  "\"There are 360 degrees, so why stick to one?\" – Zaha Hadid",
  "\"Architecture should speak of its time and place, but yearn for timelessness.\" – Frank Gehry",
  "\"To create, one must first question everything.\" – Eileen Gray",
  "\"A room is not a room without natural light.\" – Louis Kahn",
  "\"Recognizing the need is the primary condition for design.\" – Charles Eames"
];

// ==========================================
// 3. DESIGN SYSTEM & MOTION LANGUAGE
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..500;1,9..40,300..500&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700&display=swap');

  :root {
    /* Tonal Identity System */
    --color-void: #000000;
    --color-obsidian: #0a0a0a;
    --color-carbon: #111111;
    --color-iron: #1a1a1a;
    --color-steel: #252525;
    --color-chrome: rgba(255,255,255,0.06);
    --color-smoke: rgba(255,255,255,0.12);

    /* Text Hierarchy */
    --text-100: #ffffff;
    --text-200: #d1d5db;
    --text-300: #9ca3af;
    --text-400: #6b7280;
    --text-500: #374151;

    /* Accent System */
    --accent-dash: #60a5fa;
    --accent-crew: #34d399;
    --accent-finance: #fbbf24;
    --accent-vault: #a78bfa;
    --accent-gallery: #f472b6;
    --accent-news: #fb923c;
    --accent-hq: #94a3b8;

    /* Font Families */
    --font-heading: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Easing */
    --ease-spring: cubic-bezier(0.34, 1.56, 1, 1);
    --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
  body, html { 
    background-color: var(--color-void); 
    color: var(--text-100); 
    font-family: var(--font-body); 
    overflow: hidden; 
    height: 100dvh; 
    width: 100vw; 
    -webkit-font-smoothing: antialiased; 
  }
  ::-webkit-scrollbar { display: none; width: 0px; }

  /* 🌟 TYPOGRAPHY SYSTEM 🌟 */
  .type-hero { font-family: var(--font-heading); font-weight: 700; font-size: clamp(3rem, 5vw, 4.5rem); letter-spacing: -0.04em; line-height: 1; }
  .type-h1 { font-family: var(--font-heading); font-weight: 700; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.03em; line-height: 1.1; }
  .type-h2 { font-family: var(--font-heading); font-weight: 400; font-size: 1.75rem; line-height: 1.2; }
  .type-metric { font-family: var(--font-mono); font-weight: 400; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.02em; }
  .type-label { font-family: var(--font-body); font-weight: 500; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; }
  .type-body { font-family: var(--font-body); font-weight: 400; font-size: 0.95rem; line-height: 1.7; color: var(--text-200); }
  .type-caption { font-family: var(--font-body); font-weight: 300; font-size: 0.8rem; color: var(--text-300); }
  .type-mono-sm { font-family: var(--font-mono); font-weight: 400; font-size: 0.75rem; color: var(--text-300); }

  /* 🌟 5-LAYER BACKGROUND SYSTEM 🌟 */
  .bg-system { position: fixed; inset: 0; z-index: -10; overflow: hidden; pointer-events: none; }
  /* Layer A - Starfield generated via React */
  /* Layer B - Aurora Mesh */
  .aurora-mesh { position: absolute; inset: -20%; filter: blur(80px); opacity: 0.22; mix-blend-mode: screen; }
  .blob { position: absolute; border-radius: 50%; }
  .blob-1 { top: 0; left: 0; width: 50vw; height: 50vw; background: #1a1aff; animation: blobFloat 18s infinite alternate ease-in-out; }
  .blob-2 { top: 0; right: 0; width: 45vw; height: 45vw; background: #6600cc; animation: blobFloat 22s infinite alternate-reverse ease-in-out; }
  .blob-3 { bottom: 0; left: 0; width: 60vw; height: 60vw; background: #003366; animation: blobFloat 25s infinite alternate ease-in-out; }
  .blob-4 { bottom: 0; right: 0; width: 55vw; height: 55vw; background: #330066; animation: blobFloat 30s infinite alternate-reverse ease-in-out; }
  /* Layer C - Scan Line */
  .scan-line { position: absolute; width: 100%; height: 1px; background: rgba(255,255,255,0.03); animation: scan 8s linear infinite; z-index: -3; }
  /* Layer D - Noise Grain */
  .noise-grain { position: absolute; inset: 0; opacity: 0.06; z-index: -2; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); animation: noiseShift 0.4s steps(10) infinite; }
  /* Layer E - Vignette */
  .vignette { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at center, transparent 40%, rgba(0,0,0,0.5) 100%); z-index: -1; }

  @keyframes blobFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(10%, 10%) scale(1.1); } }
  @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
  @keyframes noiseShift { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }

  /* 🌟 CINEMATIC SPLASH SCREEN 🌟 */
  .splash-container { position: fixed; inset: 0; z-index: 99999; background: var(--color-void); display: flex; align-items: center; justify-content: center; flex-direction: column; transition: transform 0.8s cubic-bezier(0.8, 0, 0.2, 1); }
  .splash-container.exit { transform: translateY(-100%); }
  /* Layer 1 - Grid Pulse */
  .splash-grid { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px); background-size: 40px 40px; animation: gridPulse 0.4s ease-out forwards; opacity: 0; }
  /* Layer 2 - HR Sweep */
  .splash-hr { position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: #fff; transform-origin: left center; animation: hrSweep 0.3s 0.3s ease-out forwards; transform: scaleX(0); opacity: 0; }
  /* Layer 4 - Logo Reveal */
  .splash-logo-container { display: flex; flex-direction: column; align-items: flex-start; z-index: 10; margin-left: -50vw; animation: slideInLeft 0.1s 0.6s forwards; opacity: 0; }
  .splash-logo { font-family: var(--font-heading); font-size: 5rem; font-weight: 700; color: #fff; letter-spacing: 0.4em; animation: trackIn 0.6s 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  /* Layer 3 - Glitch Frame (Applied to logo via JS class toggle) */
  .glitch-active { text-shadow: 2px 0 0 red, -2px 0 0 blue, 0 2px 0 green; }
  .splash-sub { font-family: var(--font-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--text-200); margin-top: -10px; clip-path: inset(0 100% 0 0); animation: wipeReveal 0.4s 1s ease-out forwards; }
  /* Layer 5 - Status Line */
  .splash-status { position: absolute; bottom: 20%; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-300); }
  .status-auth { color: var(--neon-green); opacity: 0; animation: revealFade 0.1s 1.8s forwards; }

  @keyframes gridPulse { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  @keyframes hrSweep { 0% { transform: scaleX(0); opacity: 1; } 99% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(1); opacity: 0; } }
  @keyframes trackIn { to { letter-spacing: 0.08em; } }
  @keyframes wipeReveal { to { clip-path: inset(0 0% 0 0); } }
  @keyframes slideInLeft { to { margin-left: 0; opacity: 1; } }

  /* 🌟 KINETIC SCROLL ENGINE 🌟 */
  .kinetic-scroll-engine { height: 100dvh; width: 100vw; overflow-y: auto; scroll-snap-type: y mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
  .scrolling-section { min-height: 100dvh; width: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 100px 24px 80px 24px; position: relative; }
  
  /* Staggered Reveal Logic */
  .stagger-item { opacity: 0; transform: translateY(var(--reveal-dir, 40px)); transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth); will-change: transform, opacity; }
  .view-active .stagger-item { opacity: 1; transform: translateY(0); }
  .stagger-1 { transition-delay: 0ms; }
  .stagger-2 { transition-delay: 80ms; }
  .stagger-3 { transition-delay: 160ms; }
  .stagger-4 { transition-delay: 240ms; }

  /* Scroll Progress Indicator (Desktop) */
  .scroll-indicator { position: fixed; right: 24px; top: 50%; transform: translateY(-50%); width: 1px; height: 200px; background: rgba(255,255,255,0.1); z-index: 80; display: none; }
  .scroll-pill { position: absolute; left: -1px; width: 3px; height: 30px; background: #fff; border-radius: 3px; transition: top 0.4s var(--ease-smooth); }
  @media (min-width: 1024px) { .scroll-indicator { display: block; } }

  /* 🌟 BENTO CARD HIERARCHY 🌟 */
  .bento-container { width: 100%; max-width: 1100px; display: flex; flex-direction: column; gap: 24px; margin: 0 auto; }
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 24px; }

  /* Base Card Styles */
  .card-base { border-radius: 16px; position: relative; overflow: hidden; transition: all 0.3s var(--ease-smooth); will-change: transform; }
  .card-header { padding: 24px 24px 16px; border-bottom: 1px solid var(--color-chrome); display: flex; justify-content: space-between; align-items: flex-start; }
  .card-content { padding: 20px 24px; }
  .card-footer { padding: 16px 24px; border-top: 1px solid var(--color-chrome); display: flex; justify-content: space-between; align-items: center; }

  /* Level 1 - Ghost */
  .card-ghost { background: transparent; border: 1px solid var(--color-chrome); }
  .card-ghost:hover { border-color: rgba(255,255,255,0.14); }
  
  /* Level 2 - Surface */
  .card-surface { background: rgba(255,255,255,0.03); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--glass-border); }
  .card-surface:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); box-shadow: 0 8px 32px rgba(0,0,0,0.4); transform: translateY(-2px); }
  
  /* Level 3 - Elevated */
  .card-elevated { background: rgba(255,255,255,0.07); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 4px 24px rgba(0,0,0,0.6); }

  /* Accent Borders on Hover (Applied dynamically via style) */
  .card-accent-hover:hover { border-left-width: 3px; border-left-style: solid; padding-left: calc(var(--base-pl, 0px) - 2px); } /* Compensate for border width */

  /* 🌟 MAGNETIC DOCK 🌟 */
  .floating-dock-wrapper { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 100; padding-bottom: env(safe-area-inset-bottom); }
  .floating-dock { 
    background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--color-chrome); border-radius: 100px; 
    display: flex; gap: 8px; padding: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.8);
    transform-origin: bottom center;
  }
  .dock-item { 
    width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; 
    color: var(--text-300); cursor: pointer; position: relative; 
    transition: transform 0.15s var(--ease-spring), color 0.2s, background 0.2s, box-shadow 0.2s; 
    will-change: transform;
  }
  .dock-item:active { transform: scale(0.95) !important; } /* Tap press state */
  
  /* Active State applied via JS inline styles for specific colors, fallback here */
  .dock-item.active { color: #fff; }
  
  /* Live Indicator */
  .dock-live-dot { position: absolute; top: 8px; right: 8px; width: 4px; height: 4px; border-radius: 50%; animation: pulseDot 2s infinite; }
  @keyframes pulseDot { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(var(--dot-color-rgb), 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(var(--dot-color-rgb), 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(var(--dot-color-rgb), 0); } }

  .dock-tooltip { 
    position: absolute; top: -45px; left: 50%; transform: translateX(-50%) translateY(10px);
    background: var(--color-steel); border: 1px solid var(--color-chrome); color: #fff; 
    padding: 6px 12px; border-radius: 8px; font-family: var(--font-body); font-size: 0.75rem; font-weight: 500; 
    opacity: 0; transition: all 0.2s; white-space: nowrap; pointer-events: none; 
    display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }
  .dock-item:hover .dock-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }
  .tooltip-count { color: var(--text-300); font-family: var(--font-mono); font-size: 0.7rem; }

  @media (max-width: 768px) {
    .floating-dock-wrapper { width: 92%; max-width: 400px; }
    .floating-dock { width: 100%; overflow-x: auto; scroll-snap-type: x mandatory; justify-content: flex-start; border-radius: 20px; padding: 12px; gap: 12px; }
    .dock-item { width: auto; min-width: max-content; height: 40px; border-radius: 12px; padding: 0 16px; gap: 8px; }
    .dock-label-mobile { display: block; font-family: var(--font-body); font-size: 0.8rem; font-weight: 500; }
    .dock-tooltip { display: none; } /* Hide tooltips on mobile */
    .dock-item.active { border-bottom: 2px solid var(--item-accent); background: transparent !important; box-shadow: none !important; border-radius: 0; padding-bottom: 6px; height: 38px; }
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; }
  }
  @media (min-width: 769px) { .dock-label-mobile { display: none; } }

  /* 🌟 ADMIN MODE UX 🌟 */
  .admin-bar { position: fixed; top: 0; left: 0; right: 0; height: 2px; background: rgba(251, 191, 36, 0.4); z-index: 100; transform-origin: center; animation: adminBarIn 0.4s ease-out; }
  @keyframes adminBarIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .admin-action { animation: revealFade 0.4s ease forwards; opacity: 0; }
  .admin-dot { position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--accent-finance); border-radius: 50%; }

  /* 🌟 TOP BAR 🌟 */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none; }
  .top-bar > * { pointer-events: auto; }
  .section-counter { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-400); margin-left: auto; margin-right: 24px; }
  
  .security-hud { display: flex; align-items: center; gap: 8px; cursor: pointer; transition: opacity 0.3s; }
  .security-hud:hover { opacity: 0.8; }
  .hud-icon-wrapper { width: 32px; height: 32px; border-radius: 50%; background: var(--color-iron); border: 1px solid var(--color-chrome); display: flex; align-items: center; justify-content: center; transition: all 0.4s; perspective: 100px; }
  .hud-icon-wrapper.admin-on { background: rgba(251, 191, 36, 0.1); border-color: rgba(251, 191, 36, 0.3); transform: rotateY(180deg); }
  .hud-icon-inner { transition: transform 0.4s; }
  .hud-icon-wrapper.admin-on .hud-icon-inner { transform: rotateY(180deg); color: var(--accent-finance); }

  /* 🌟 MODAL SYSTEM 🌟 */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: revealFade 0.3s ease-out; }
  .modal-window { background: var(--color-obsidian); border: 1px solid var(--color-steel); width: 100%; max-width: 500px; border-radius: 16px; box-shadow: 0 24px 48px rgba(0,0,0,0.8); max-height: 90vh; overflow-y: auto; position: relative; animation: modalSpring 0.5s var(--ease-spring); border-left: 4px solid var(--modal-accent, var(--color-chrome)); }
  @keyframes modalSpring { 0% { transform: scale(0.95) translateY(20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
  .modal-header { padding: 24px; border-bottom: 1px solid var(--color-chrome); display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: var(--color-obsidian); z-index: 10; }
  .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }

  /* Floating Label Inputs */
  .input-group { position: relative; width: 100%; }
  .input-field { width: 100%; background: var(--color-iron) !important; border: 1px solid var(--color-chrome); border-radius: 8px; padding: 20px 16px 8px; color: var(--text-100) !important; font-family: var(--font-body); transition: all 0.2s; }
  .input-label { position: absolute; left: 16px; top: 16px; font-family: var(--font-body); font-size: 0.95rem; color: var(--text-400); transition: all 0.2s ease-out; pointer-events: none; }
  .input-field:focus { border-color: var(--modal-accent, var(--accent-dash)); box-shadow: 0 0 0 4px rgba(255,255,255,0.05); }
  .input-field:focus ~ .input-label, .input-field:not(:placeholder-shown) ~ .input-label { top: 6px; font-size: 0.65rem; color: var(--modal-accent, var(--text-200)); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .input-field.error { border-color: var(--accent-news); animation: shake 0.4s; }
  @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }

  /* UI Elements */
  .btn-primary { background: var(--text-100); color: var(--color-void); border: none; padding: 12px 24px; border-radius: 8px; font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform 0.15s var(--ease-spring), opacity 0.2s; }
  .btn-primary:active { transform: scale(0.96); }
  .btn-primary:hover { opacity: 0.9; }
  .btn-ghost { background: transparent; color: var(--text-200); border: 1px solid var(--color-chrome); }
  .btn-ghost:hover { background: var(--color-chrome); color: var(--text-100); }
  .btn-icon { background: transparent; color: var(--text-400); border: none; padding: 8px; border-radius: 50%; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center; }
  .btn-icon:hover { color: var(--text-100); background: var(--color-chrome); }
  .btn-icon.danger:hover { color: var(--accent-news); background: rgba(251, 146, 60, 0.1); }
  
  .pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 100px; font-family: var(--font-body); font-weight: 500; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: var(--color-chrome); border: 1px solid transparent; }

  /* 🌟 SECTION SPECIFICS 🌟 */
  /* Dashboard */
  .clock-display { font-family: var(--font-mono); font-size: 1.2rem; color: var(--text-200); }
  .sparkline { width: 48px; height: 24px; stroke: var(--text-300); stroke-width: 1.5; fill: none; stroke-linecap: round; stroke-linejoin: round; margin-top: 8px; }
  /* Crew */
  .avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 700; color: #fff; font-size: 1rem; flex-shrink: 0; }
  .crew-list-item { display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--color-chrome); transition: background 0.2s; margin: 0 -24px; padding: 12px 24px; }
  .crew-list-item:hover { background: rgba(255,255,255,0.02); }
  .sticky-year { position: sticky; top: -32px; background: var(--color-obsidian); z-index: 5; padding: 12px 0; border-bottom: 1px solid var(--color-steel); margin-bottom: 8px; }
  /* Treasury */
  .finance-row { display: grid; grid-template-columns: auto 1fr auto auto; gap: 16px; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--color-chrome); }
  .finance-row.income { border-left: 2px solid var(--accent-crew); padding-left: 14px; background: linear-gradient(90deg, rgba(52, 211, 153, 0.03) 0%, transparent 100%); }
  .finance-row.expense { border-left: 2px solid var(--accent-news); padding-left: 14px; background: linear-gradient(90deg, rgba(251, 146, 60, 0.03) 0%, transparent 100%); }
  /* Vault */
  .vault-ghost-icon { position: absolute; right: -10%; bottom: -20%; opacity: 0.04; width: 120px; height: 120px; pointer-events: none; }
  /* Gallery */
  .gallery-card { aspect-ratio: 16/9; background-size: cover; background-position: center; border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; }
  .gallery-card-inner { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; opacity: 0; transition: opacity 0.3s; }
  .gallery-card:hover .gallery-card-inner { opacity: 1; }
  .gallery-card:hover { transform: scale(1.02); }
  /* News */
  .news-latest { position: relative; z-index: 1; }
  .news-latest::after { content: ''; position: absolute; inset: -1px; border-radius: 17px; border: 1px solid var(--accent-news); opacity: 0.5; animation: borderPulse 3s ease infinite; pointer-events: none; }
  @keyframes borderPulse { 0%,100%{opacity:0.2} 50%{opacity:0.8} }
  /* Org Chart HQ */
  .org-node { background: var(--color-iron); border: 1px solid var(--color-chrome); padding: 12px 20px; border-radius: 8px; text-align: center; }
  .org-line { width: 2px; background: var(--color-chrome); margin: 0 auto; }

  /* ANIMATIONS */
  @keyframes countUpAnim { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .animate-count { animation: countUpAnim 0.6s ease-out forwards; }
  
  /* SKELETON SHIMMER */
  .skeleton { background: linear-gradient(90deg, var(--color-iron) 0%, var(--color-steel) 50%, var(--color-iron) 100%); background-size: 200% 100%; animation: shimmer 2s infinite linear; border-color: transparent; }
  .skeleton-text { height: 1rem; border-radius: 4px; margin-bottom: 8px; width: 80%; }
  .skeleton-title { height: 2rem; border-radius: 6px; width: 60%; margin-bottom: 16px; }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

  /* SPINNER */
  .spinner { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  /* 🌟 MOBILE OPTIMIZATIONS 🌟 */
  @media (max-width: 480px) {
    .modal-window {
      border-radius: 20px 20px 0 0; position: fixed; bottom: 0; left: 0; right: 0; max-width: 100%;
      max-height: 85dvh; padding: 20px 20px 32px 20px; border-bottom-left-radius: 0; border-bottom-right-radius: 0;
    }
    .modal-overlay { align-items: flex-end; padding: 0; }
  }
`;

// Helper: Deterministic color for avatars/tags based on string
const getHashColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = str.charCodeAt(i) + ((hash << 5) - hash); }
  const colors = ['#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#fb923c'];
  return colors[Math.abs(hash) % colors.length];
};

// Helper: Animated Counter Component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span className="animate-count">{prefix}{count.toLocaleString()}{suffix}</span>;
};

// SVG Sparkline Component
const Sparkline = ({ data, color }) => {
  if (!data || data.length < 2) return <svg className="sparkline"><path d="M0,12 L48,12" stroke={color}/></svg>;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 48;
    const y = 24 - (((val - min) / range) * 20 + 2); // 2px padding
    return `${x},${y}`;
  }).join(' L');
  return <svg className="sparkline"><path d={`M${points}`} stroke={color}/></svg>;
};

// Main App Component
export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [scrollDir, setScrollDir] = useState('down');
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  
  // Splash & Loading States
  const [splashState, setSplashState] = useState(0); // 0: init, 1: grid/hr, 2: glitch, 3: logo, 4: status, 5: exit
  const [isLoading, setIsLoading] = useState({ hq: true, crew: true, fin: true, vault: true, gal: true, news: true });
  
  // Data States
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // UI States
  const [modalConfig, setModalConfig] = useState(null); // { type: 'crew'|'fin'|..., data: {} }
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Refs
  const scrollEngineRef = useRef(null);
  const lastScrollY = useRef(0);
  const dockRef = useRef(null);

  // Constants
  const SECTIONS = [
    { id: 'dash', label: 'Command', icon: <Hexagon size={20}/>, accent: 'var(--accent-dash)' },
    { id: 'crew', label: 'Personnel', icon: <UsersRound size={20}/>, accent: 'var(--accent-crew)' },
    { id: 'fin', label: 'Treasury', icon: <CircleDollarSign size={20}/>, accent: 'var(--accent-finance)' },
    { id: 'vault', label: 'Vault', icon: <Server size={20}/>, accent: 'var(--accent-vault)' },
    { id: 'gal', label: 'Gallery', icon: <Aperture size={20}/>, accent: 'var(--accent-gallery)' },
    { id: 'news', label: 'Broadcasts', icon: <RadioTower size={20}/>, accent: 'var(--accent-news)' },
    { id: 'hq', label: 'HQ', icon: <Settings size={20}/>, accent: 'var(--accent-hq)' }
  ];

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cinematic Splash Sequence
  useEffect(() => {
    const seq = [
      { time: 100, state: 1 }, // Grid + HR
      { time: 550, state: 2 }, // Glitch start
      { time: 630, state: 3 }, // Logo reveal (glitch end)
      { time: 1000, state: 4 }, // Status text
      { time: 2000, state: 5 }  // Exit
    ];
    const timers = seq.map(step => setTimeout(() => setSplashState(step.state), step.time));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Starfield Generator
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = Array.from({length: 120}).map((_, i) => ({
      id: i,
      cx: Math.random() * 100 + 'vw',
      cy: Math.random() * 100 + 'vh',
      r: Math.random() > 0.8 ? 1.5 : (Math.random() > 0.5 ? 1 : 0.5),
      animDelay: Math.random() * 6 + 's',
      animDuration: (Math.random() * 3 + 2) + 's',
      isPulsing: Math.random() > 0.6
    }));
    setStars(newStars);
  }, []);

  // Firebase Listeners
  useEffect(() => {
    const unsubs = [
      onSnapshot(doc(db, "unit", "hq"), d => { if(d.exists()) setLeadership(prev => ({ ...prev, ...d.data() })); setIsLoading(p => ({...p, hq: false})); }),
      onSnapshot(collection(db, "crew"), s => { setCrewData(s.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({...p, crew: false})); }),
      onSnapshot(collection(db, "finances"), s => { setFinancialLog(s.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({...p, fin: false})); }),
      onSnapshot(collection(db, "vault"), s => { setVaultData(s.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({...p, vault: false})); }),
      onSnapshot(collection(db, "gallery"), s => { setGalleryData(s.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({...p, gal: false})); }),
      onSnapshot(collection(db, "news"), s => { setNewsData(s.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({...p, news: false})); })
    ];
    return () => unsubs.forEach(unsub => unsub());
  }, []);

  // Scroll Logic
  const handleScroll = (e) => {
    const currentY = e.target.scrollTop;
    setScrollDir(currentY > lastScrollY.current ? 'down' : 'up');
    lastScrollY.current = currentY;
    
    const idx = Math.round(currentY / window.innerHeight);
    if (idx !== activeSectionIdx && idx >= 0 && idx < SECTIONS.length) {
      setActiveSectionIdx(idx);
    }
  };

  const navTo = (idx) => {
    scrollEngineRef.current?.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
  };

  // Magnetic Dock Effect (Desktop Only)
  useEffect(() => {
    if (!dockRef.current || window.innerWidth < 768) return; 
    
    const handleMouseMove = (e) => {
      const items = dockRef.current.querySelectorAll('.dock-item');
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenterY = rect.top + rect.height / 2; // Vertical orientation on desktop
        const distance = Math.abs(e.clientY - itemCenterY);
        // Gaussian-ish falloff
        const scale = distance < 80 ? 1 + (0.3 * (1 - distance / 80)) : 1;
        item.style.transform = `scale(${scale})`;
      });
    };
    
    const handleMouseLeave = () => {
      const items = dockRef.current.querySelectorAll('.dock-item');
      items.forEach(item => item.style.transform = ''); 
    };

    const dock = dockRef.current;
    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Admin Toggle
  const toggleAdmin = () => {
    if (isLeadershipMode) setIsLeadershipMode(false);
    else {
      if (prompt("Enter Access Key:") === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
    }
  };

  // Save Logic
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { type, data } = modalConfig;
    const colName = type === 'fin' ? 'finances' : type === 'gal' ? 'gallery' : type;
    
    try {
      if (type === 'hq') {
        await setDoc(doc(db, "unit", "hq"), data);
      } else if (data.id) {
        const { id, ...saveData } = data;
        await updateDoc(doc(db, colName, id), saveData);
      } else {
        await addDoc(collection(db, colName), { ...data, timestamp: Date.now() });
      }
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsSaving(false);
        setModalConfig(null);
      }, 1000);
    } catch (err) {
      alert("Sync failed.");
      setIsSaving(false);
    }
  };

  const handleDelete = async (col, id) => {
    if (window.confirm("Permanently delete record?")) {
      await deleteDoc(doc(db, col, id));
      setModalConfig(null); // Close modal if open
    }
  };

  // Helper to generate dynamic section styles
  const getSectionStyle = (idx) => {
    const isActive = activeSectionIdx === idx;
    return {
      '--reveal-dir': scrollDir === 'down' ? '40px' : '-40px',
      '--section-accent': SECTIONS[idx].accent
    };
  };

  // ==========================================
  // RENDER: DASHBOARD
  // ==========================================
  const renderDashboard = () => {
    const active = activeSectionIdx === 0;
    
    // Sparkline mock data logic
    const memData = crewData.length > 0 ? [0, Math.floor(crewData.length/2), crewData.length-1, crewData.length] : [0,0,0];
    const finInc = financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const finExp = financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    const net = finInc - finExp;
    const finData = [0, finInc*0.4, finInc*0.8 - finExp*0.3, net];
    const vaultD = vaultData.length > 0 ? [0, 1, vaultData.length] : [0,0];

    // Recent Activity
    const allActivity = [
      ...crewData.map(c => ({ msg: `New operative added: ${c.name}`, time: c.timestamp || 0, color: 'var(--accent-crew)' })),
      ...financialLog.map(f => ({ msg: `Transaction logged: ${f.type === 'income'?'+':'-'}₹${f.amount}`, time: f.timestamp || 0, color: 'var(--accent-finance)' })),
      ...newsData.map(n => ({ msg: `Broadcast issued: ${n.title}`, time: n.timestamp || 0, color: 'var(--accent-news)' }))
    ].sort((a,b) => b.time - a.time).slice(0, 3);

    return (
      <div className="bento-container" style={getSectionStyle(0)}>
        <div className={`stagger-item stagger-1 ${active ? 'view-active' : ''}`} style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span className="type-label text-[var(--accent-dash)] mb-2 block">Overview</span>
            <h1 className="type-hero">Command Center</h1>
          </div>
          <div className="clock-display hidden md:block">{currentTime.toLocaleTimeString('en-US', {hour12:false})}</div>
        </div>
        
        <div className="bento-grid-3">
          <div className={`card-base card-surface card-accent-hover stagger-item stagger-2 ${active ? 'view-active' : ''}`} style={{'--base-pl': '24px'}}>
            <div className="card-content">
              <span className="type-label text-[var(--text-200)] mb-4 block">Personnel Strength</span>
              {isLoading.crew ? <div className="skeleton skeleton-title"></div> : <div className="type-metric"><AnimatedCounter value={crewData.length} /></div>}
              {!isLoading.crew && <Sparkline data={memData} color="var(--accent-crew)" />}
            </div>
          </div>
          <div className={`card-base card-surface card-accent-hover stagger-item stagger-3 ${active ? 'view-active' : ''}`} style={{'--base-pl': '24px'}}>
            <div className="card-content">
              <span className="type-label text-[var(--text-200)] mb-4 block">Net Capital (INR)</span>
              {isLoading.fin ? <div className="skeleton skeleton-title"></div> : <div className="type-metric"><AnimatedCounter value={net} /></div>}
              {!isLoading.fin && <Sparkline data={finData} color={net >= 0 ? "var(--accent-finance)" : "var(--accent-news)"} />}
            </div>
          </div>
          <div className={`card-base card-surface card-accent-hover stagger-item stagger-4 ${active ? 'view-active' : ''}`} style={{'--base-pl': '24px'}}>
            <div className="card-content">
              <span className="type-label text-[var(--text-200)] mb-4 block">Vault Assets</span>
              {isLoading.vault ? <div className="skeleton skeleton-title"></div> : <div className="type-metric"><AnimatedCounter value={vaultData.length} /></div>}
              {!isLoading.vault && <Sparkline data={vaultD} color="var(--accent-vault)" />}
            </div>
          </div>
        </div>

        <div className={`card-base card-elevated stagger-item stagger-4 ${active ? 'view-active' : ''}`} style={{ marginTop: '8px' }}>
          <div className="card-header border-none pb-0"><span className="type-label text-[var(--accent-dash)]">Recent System Activity</span></div>
          <div className="card-content">
            {allActivity.length === 0 ? <p className="type-caption">No recent activity on network.</p> : 
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {allActivity.map((act, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: act.color }}></div>
                    <span className="type-body flex-1">{act.msg}</span>
                    <span className="type-mono-sm text-[var(--text-400)]">{act.time ? new Date(act.time).toLocaleDateString() : 'Session'}</span>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDER: CREW
  // ==========================================
  const renderCrew = () => {
    const active = activeSectionIdx === 1;
    const allocation = crewData.reduce((acc, u) => { const y = u.year||"Unassigned"; if(!acc[y]) acc[y]=[]; acc[y].push(u); return acc; }, {});
    const order = ['1', '2', '3', '4', '5', 'Alumni', 'Unassigned']; 
    
    // Skeleton Mock Data
    const skeletonRows = [1,2,3];

    return (
      <div className="bento-container" style={getSectionStyle(1)}>
        <div className={`stagger-item stagger-1 ${active ? 'view-active' : ''}`} style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="type-label text-[var(--accent-crew)] mb-2 block">Directory</span><h1 className="type-h1">Personnel</h1></div>
          {isLeadershipMode && <button className="btn-primary admin-action" onClick={() => setModalConfig({type: 'crew', data: { role: 'Member', year: '1' }})}><Plus size={16}/> Add Record</button>}
        </div>
        
        {isLoading.crew ? (
          <div className="stagger-item stagger-2 view-active" style={{ marginTop: '24px' }}>
            <div className="card-base card-surface" style={{ padding: '0' }}>
              {skeletonRows.map(i => (
                <div key={i} className="crew-list-item">
                  <div className="avatar skeleton"></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '60%', height: '0.6rem' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {crewData.length === 0 && (
              <div className="card-base card-ghost" style={{ padding: '60px', textAlign: 'center', marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <UsersRound size={48} color="var(--accent-crew)" style={{ opacity: 0.3 }}/>
                <p className="type-body text-[var(--text-300)]">Directory empty. Awaiting initialization.</p>
              </div>
            )}

            {order.map((year, yIdx) => {
              if (!allocation[year] || allocation[year].length === 0) return null;
              return (
                <div key={year} className={`stagger-item stagger-${Math.min((yIdx%3)+2, 4)} ${active ? 'view-active' : ''}`} style={{ marginTop: '24px' }}>
                  <div className="sticky-year">
                    <span className="type-label text-[var(--text-100)] px-4">{year === 'Alumni' || year === 'Unassigned' ? year : `Year ${year}`}</span>
                  </div>
                  <div className="card-base card-surface" style={{ padding: '0' }}>
                    {allocation[year].map((m, i) => {
                      const isCouncil = ['UD', 'USEC', 'Coordinator'].includes(m.role);
                      return (
                        <div key={m.id} className="crew-list-item" style={{ borderBottom: i === allocation[year].length-1 ? 'none' : '' }}>
                          <div className="avatar" style={{ background: getHashColor(m.name) }}>{m.name ? m.name.charAt(0).toUpperCase() : '?'}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span className="type-h2" style={{ fontSize: '1.2rem', transform: i%2===0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)', display: 'inline-block' }}>{m.name}</span>
                              {isCouncil && <span className="pill" style={{ color: 'var(--accent-crew)', background: 'rgba(52, 211, 153, 0.1)' }}>{m.role === 'Coordinator' ? m.coordinatorType : m.role}</span>}
                            </div>
                            <div className="type-caption mt-1">{m.email} {m.phone && `• ${m.phone}`}</div>
                          </div>
                          {isLeadershipMode && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="btn-icon admin-action" onClick={() => setModalConfig({type:'crew', data: m})}><Pencil size={14}/></button>
                              <button className="btn-icon danger admin-action" onClick={() => handleDelete('crew', m.id)}><Trash2 size={14}/></button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  };

  // ==========================================
  // RENDER: FINANCES
  // ==========================================
  const renderFunds = () => {
    const active = activeSectionIdx === 2;
    const goal = Number(leadership.financialGoal) || 1;
    const sortedLog = [...financialLog].sort((a,b) => b.timestamp - a.timestamp); // Newest first

    return (
      <div className="bento-container" style={getSectionStyle(2)}>
        <div className={`stagger-item stagger-1 ${active ? 'view-active' : ''}`} style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="type-label text-[var(--accent-finance)] mb-2 block">Ledger</span><h1 className="type-h1">Treasury</h1></div>
          {isLeadershipMode && <button className="btn-primary admin-action" onClick={() => setModalConfig({type: 'fin', data: { type: 'expense' }})}><Plus size={16}/> Add Entry</button>}
        </div>

        {isLoading.fin ? <div className="card-base card-surface skeleton stagger-item stagger-2 view-active" style={{ height: '400px', marginTop: '24px' }}></div> : (
          <div className={`card-base card-elevated stagger-item stagger-2 ${active ? 'view-active' : ''}`} style={{ marginTop: '24px', padding: 0 }}>
            
            {/* Target Progress Bar Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid var(--color-chrome)', background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.05) 0%, transparent 100%)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <span className="type-label text-[var(--accent-finance)]">Goal Progression</span>
                <span className="type-mono-sm">Target: ₹{goal.toLocaleString()}</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'var(--color-chrome)', borderRadius: '2px', overflow: 'hidden' }}>
                {/* Visual hack: assuming net > 0 for progress, simplify to income for demo if net is negative */}
                <div style={{ width: `${Math.min(((financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0))/goal)*100, 100)}%`, height: '100%', background: 'var(--accent-finance)', transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)' }}></div>
              </div>
            </div>

            {/* List */}
            {sortedLog.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <CircleDollarSign size={48} color="var(--accent-finance)" style={{ opacity: 0.3 }}/>
                <p className="type-body text-[var(--text-300)]">No financial activity recorded.</p>
              </div>
            ) : (
              <div>
                {sortedLog.map((f, i) => (
                  <div key={f.id} className={`finance-row ${f.type}`} style={{ borderBottom: i === sortedLog.length-1 ? 'none' : '' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="type-h2" style={{ fontSize: '1.1rem' }}>{f.description}</span>
                      <span className="type-mono-sm text-[var(--text-400)]">{f.timestamp ? new Date(f.timestamp).toLocaleDateString() : 'Date Unknown'}</span>
                    </div>
                    <div className="type-metric" style={{ fontSize: '1.5rem', color: f.type==='income' ? '#22c55e' : '#ef4444', textAlign: 'right' }}>
                      {f.type==='income'?'+':'-'}₹{Number(f.amount).toLocaleString()}
                    </div>
                    {isLeadershipMode && (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button className="btn-icon admin-action" onClick={() => setModalConfig({type:'fin', data: f})}><Pencil size={14}/></button>
                        <button className="btn-icon danger admin-action" onClick={() => handleDelete('finances', f.id)}><Trash2 size={14}/></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // RENDER: VAULT
  // ==========================================
  const renderVault = () => {
    const active = activeSectionIdx === 3;
    return (
      <div className="bento-container" style={getSectionStyle(3)}>
        <div className={`stagger-item stagger-1 ${active ? 'view-active' : ''}`} style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="type-label text-[var(--accent-vault)] mb-2 block">Storage</span><h1 className="type-h1">Secure Vault</h1></div>
          {isLeadershipMode && <button className="btn-primary admin-action" onClick={() => setModalConfig({type: 'vault', data: { type: 'Document' }})}><Plus size={16}/> Upload File</button>}
        </div>

        {isLoading.vault ? <div className="card-base card-surface skeleton stagger-item stagger-2 view-active" style={{ height: '300px', marginTop: '24px' }}></div> : (
          <>
            {vaultData.length === 0 ? (
              <div className="card-base card-ghost stagger-item stagger-2 view-active" style={{ padding: '60px', textAlign: 'center', marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Server size={48} color="var(--accent-vault)" style={{ opacity: 0.3 }}/>
                <p className="type-body text-[var(--text-300)]">Vault empty. No encrypted nodes found.</p>
              </div>
            ) : (
              <div className="bento-grid-3" style={{ marginTop: '24px' }}>
                {vaultData.map((v, i) => (
                  <div key={v.id} className={`card-base card-surface card-accent-hover stagger-item stagger-${Math.min((i%3)+2, 4)} ${active ? 'view-active' : ''}`} style={{'--base-pl': '32px'}}>
                    {/* Background SVG shape based on type */}
                    <svg className="vault-ghost-icon" viewBox="0 0 24 24" fill="currentColor">
                      {v.type === 'Design' ? <polygon points="12,2 22,20 2,20" /> : v.type === 'Finance' ? <rect x="3" y="3" width="18" height="18" /> : <circle cx="12" cy="12" r="10" />}
                    </svg>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
                      <span className="pill" style={{ color: 'var(--accent-vault)', background: 'rgba(167, 139, 250, 0.1)' }}>{v.type}</span>
                      {isLeadershipMode && (
                        <div style={{ display: 'flex', gap: '4px', margin: '-8px' }}>
                          <button className="btn-icon admin-action" onClick={() => setModalConfig({type:'vault', data: v})}><Pencil size={14}/></button>
                          <button className="btn-icon danger admin-action" onClick={() => handleDelete('vault', v.id)}><Trash2 size={14}/></button>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="type-h2" style={{ marginBottom: '8px', position: 'relative', zIndex: 2 }}>{v.title}</h3>
                    <p className="type-caption line-clamp-2 mb-6" style={{ position: 'relative', zIndex: 2 }}>{v.description || 'No payload description.'}</p>
                    
                    <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-ghost" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10px', borderRadius: '8px', textDecoration: 'none', position: 'relative', zIndex: 2 }}>
                      Access File <ArrowUpRight size={14} className="ml-2"/>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // ==========================================
  // RENDER: GALLERY
  // ==========================================
  const renderGallery = () => {
    const active = activeSectionIdx === 4;
    return (
      <div className="bento-container" style={getSectionStyle(4)}>
        <div className={`stagger-item stagger-1 ${active ? 'view-active' : ''}`} style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="type-label text-[var(--accent-gallery)] mb-2 block">Visuals</span><h1 className="type-h1">Portfolio</h1></div>
          {isLeadershipMode && <button className="btn-primary admin-action" onClick={() => setModalConfig({type: 'gal', data: { fileType: 'Image URL' }})}><Plus size={16}/> Add Work</button>}
        </div>

        {isLoading.gal ? <div className="card-base card-surface skeleton stagger-item stagger-2 view-active" style={{ height: '400px', marginTop: '24px' }}></div> : (
          <>
            {galleryData.length === 0 ? (
              <div className="card-base card-ghost stagger-item stagger-2 view-active" style={{ padding: '60px', textAlign: 'center', marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gallery)" strokeWidth="1" opacity="0.3">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="21" x2="21" y2="3"></line>
                </svg>
                <p className="type-body text-[var(--text-300)]">No visual projects showcased yet.</p>
              </div>
            ) : (
              <div className="bento-grid-2" style={{ marginTop: '24px' }}>
                {galleryData.map((g, i) => (
                  <div key={g.id} className={`gallery-card stagger-item stagger-${(i%2)+2} ${active ? 'view-active' : ''}`} style={{ backgroundImage: `url("${g.link}")` }} onClick={() => g.fileType === 'Image URL' && setLightboxImg(g.link)}>
                    {g.fileType !== 'Image URL' && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-iron)' }}><Aperture size={32} color="var(--text-400)"/></div>}
                    
                    <div className="gallery-card-inner">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span className="pill" style={{ color: '#fff', background: 'var(--accent-gallery)', border: 'none' }}>{g.category}</span>
                        {isLeadershipMode && (
                          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', padding: '4px' }} onClick={e => e.stopPropagation()}>
                            <button className="btn-icon admin-action" style={{ padding: '4px' }} onClick={() => setModalConfig({type:'gal', data: g})}><Pencil size={14}/></button>
                            <button className="btn-icon danger admin-action" style={{ padding: '4px' }} onClick={() => handleDelete('gallery', g.id)}><Trash2 size={14}/></button>
                          </div>
                        )}
                      </div>
                      <h3 className="type-h2" style={{ color: '#fff', fontSize: '1.4rem' }}>{g.title}</h3>
                      {g.description && <p className="type-caption line-clamp-2 mt-2" style={{ color: 'rgba(255,255,255,0.8)' }}>{g.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // ==========================================
  // RENDER: NEWS
  // ==========================================
  const renderNews = () => {
    const active = activeSectionIdx === 5;
    const sortedNews = [...newsData].sort((a,b)=>b.timestamp-a.timestamp);

    return (
      <div className="bento-container" style={getSectionStyle(5)}>
        <div className={`stagger-item stagger-1 ${active ? 'view-active' : ''}`} style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="type-label text-[var(--accent-news)] mb-2 block">Announcements</span><h1 className="type-h1">Broadcasts</h1></div>
          {isLeadershipMode && <button className="btn-primary admin-action" onClick={() => setModalConfig({type: 'news', data: {}})}><Plus size={16}/> New Broadcast</button>}
        </div>

        {isLoading.news ? <div className="card-base card-surface skeleton stagger-item stagger-2 view-active" style={{ height: '300px', marginTop: '24px' }}></div> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
            {sortedNews.length === 0 ? (
              <div className="card-base card-ghost stagger-item stagger-2 view-active" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <RadioTower size={48} color="var(--accent-news)" style={{ opacity: 0.3 }}/>
                <p className="type-body text-[var(--text-300)]">Network silent. No recent broadcasts.</p>
              </div>
            ) : (
              sortedNews.map((n, i) => (
                <div key={n.id} className={`card-base ${i===0 ? 'card-elevated news-latest' : 'card-surface'} stagger-item stagger-${Math.min(i+2, 4)} ${active ? 'view-active' : ''}`} style={{ padding: '0' }}>
                  <div className="card-header" style={{ paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="pill" style={{ color: 'var(--accent-news)', background: 'rgba(251, 146, 60, 0.1)', borderColor: 'rgba(251, 146, 60, 0.2)' }}>{n.tag || 'UPDATE'}</span>
                      <span className="type-mono-sm text-[var(--text-400)]">{n.timestamp ? new Date(n.timestamp).toLocaleDateString() : ''}</span>
                    </div>
                    {isLeadershipMode && (
                      <div style={{ display: 'flex', gap: '4px', margin: '-8px' }}>
                        <button className="btn-icon admin-action" onClick={() => setModalConfig({type:'news', data: n})}><Pencil size={14}/></button>
                        <button className="btn-icon danger admin-action" onClick={() => handleDelete('news', n.id)}><Trash2 size={14}/></button>
                      </div>
                    )}
                  </div>
                  <div className="card-content">
                    <h2 className="type-h2" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{n.title}</h2>
                    <p className="type-body" style={{ whiteSpace: 'pre-wrap' }}>{n.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // RENDER: HQ / ORG CHART
  // ==========================================
  const renderHQ = () => {
    const active = activeSectionIdx === 6;
    return (
      <div className="bento-container" style={getSectionStyle(6)}>
        <div className={`stagger-item stagger-1 ${active ? 'view-active' : ''}`} style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="type-label text-[var(--accent-hq)] mb-2 block">Settings</span><h1 className="type-h1">Headquarters</h1></div>
          {isLeadershipMode && <button className="btn-primary btn-secondary admin-action" onClick={() => setModalConfig({type: 'hq', data: leadership})}><Settings size={16}/> Configure Unit</button>}
        </div>

        {isLoading.hq ? <div className="card-base card-surface skeleton stagger-item stagger-2 view-active" style={{ height: '400px', marginTop: '24px' }}></div> : (
          <div className={`card-base card-surface stagger-item stagger-2 ${active ? 'view-active' : ''}`} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px' }}>
            
            {/* Simple Visual Org Chart */}
            <div className="org-node" style={{ borderColor: 'var(--accent-hq)', background: 'rgba(148, 163, 184, 0.05)' }}>
              <span className="type-label block mb-1 text-[var(--accent-hq)]">Unit Designation</span>
              <div className="type-hero" style={{ fontSize: '2.5rem' }}>{leadership.unitCode}</div>
            </div>
            
            <div className="org-line" style={{ height: '40px' }}></div>
            
            <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
              {/* Connector line top horizontal */}
              <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: '2px', background: 'var(--color-chrome)' }}></div>
              <div style={{ position: 'absolute', top: 0, left: '25%', width: '2px', height: '20px', background: 'var(--color-chrome)' }}></div>
              <div style={{ position: 'absolute', top: 0, right: '25%', width: '2px', height: '20px', background: 'var(--color-chrome)' }}></div>
              
              <div className="org-node" style={{ marginTop: '20px', flex: 1, minWidth: '140px' }}>
                <span className="type-label block mb-1">Official Comms</span>
                <div className="type-mono-sm" style={{ color: 'var(--text-100)' }}>{leadership.officialEmail}</div>
              </div>
              <div className="org-node" style={{ marginTop: '20px', flex: 1, minWidth: '140px' }}>
                <span className="type-label block mb-1">Financial Goal</span>
                <div className="type-mono-sm" style={{ color: 'var(--text-100)' }}>₹{Number(leadership.financialGoal).toLocaleString()}</div>
              </div>
            </div>

            <div style={{ marginTop: '60px', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16}/> <span className="type-mono-sm">RSA Core System v2.0 • Secured</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // MAIN RETURN
  // ==========================================
  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* 🌟 FULL 3D ARCHITECTURAL BACKGROUND 🌟 */}
      <div className="arch-environment">
        <div className="plasma-orb orb-c"></div>
        <div className="plasma-orb orb-p"></div>
        <div className="arch-scene" style={{ transform: getCameraTransform() }}>
          <div className="arch-wall wall-floor"></div>
          <div className="arch-wall wall-ceil"></div>
          <div className="arch-wall wall-left"></div>
          <div className="arch-wall wall-right"></div>
          <div className="arch-wall wall-back"></div>
        </div>
      </div>

      {/* SPLASH SCREEN */}
      <div className={`splash-container ${splashState === 5 ? 'exit' : ''}`} style={{ visibility: splashState >= 5 ? 'hidden' : 'visible' }}>
        <div className="splash-grid" style={{ opacity: splashState >= 1 ? 1 : 0, animationPlayState: splashState >= 1 ? 'running' : 'paused' }}></div>
        <div className="splash-hr" style={{ opacity: splashState >= 1 ? 1 : 0, animationPlayState: splashState >= 1 ? 'running' : 'paused' }}></div>
        <div className="splash-logo-container" style={{ opacity: splashState >= 3 ? 1 : 0, animationPlayState: splashState >= 3 ? 'running' : 'paused' }}>
          <div className={`splash-logo ${splashState === 2 ? 'glitch-active' : ''}`}>RSA</div>
          <div className="splash-sub">UNIT {leadership.unitCode}</div>
        </div>
        {splashState >= 4 && (
          <div className="splash-status">
            INITIALIZING COMMAND PROTOCOLS... <span className="status-auth">[AUTHORIZED]</span>
          </div>
        )}
      </div>

      {/* TOP BAR */}
      <nav className="top-bar">
        <div className="pointer-events-auto">
          <div className={`security-hud`} onClick={toggleAdmin}>
            <div className={`hud-icon-wrapper ${isLeadershipMode ? 'admin-on' : ''}`}>
               <div className="hud-icon-inner">
                 {isLeadershipMode ? <Shield size={16} strokeWidth={2.5}/> : <ShieldAlert size={16} strokeWidth={2.5}/>}
               </div>
            </div>
            <div className="hud-text hidden sm:block">
               {isLeadershipMode ? 'ADMIN ACTIVE' : 'LOCKED'}
            </div>
          </div>
        </div>
        <div className="section-counter hidden lg:block">
          {String(activeSectionIdx + 1).padStart(2, '0')} / 07
        </div>
      </nav>

      {/* ADMIN INDICATOR BAR */}
      {isLeadershipMode && <div className="admin-bar"></div>}

      {/* FLOATING DOCK */}
      <div className="floating-dock-wrapper">
        <div className="floating-dock" ref={dockRef}>
          {SECTIONS.map((sec, i) => {
            const active = activeSectionIdx === i;
            // Fake notification dots for demo logic
            const showDot = (i===1 && crewData.length>0) || (i===2 && financialLog.length>0) || (i===5 && newsData.length>0);
            return (
              <div 
                key={sec.id} 
                className={`dock-item ${active ? 'active' : ''}`} 
                onClick={() => navTo(i)}
                style={active ? { '--item-accent': sec.accent, color: sec.accent } : {}}
              >
                {sec.icon}
                <span className="dock-label-mobile" style={{ color: active ? sec.accent : 'inherit' }}>{sec.label}</span>
                {showDot && <div className="dock-live-dot" style={{ background: sec.accent, '--dot-color-rgb': '255,255,255' }}></div>}
                
                <div className="dock-tooltip">
                  <span>{sec.label}</span>
                  {/* Tooltip Count logic */}
                  {i===1 && <span className="tooltip-count">• {crewData.length}</span>}
                  {i===2 && <span className="tooltip-count">• {financialLog.length}</span>}
                  {i===3 && <span className="tooltip-count">• {vaultData.length}</span>}
                  {i===4 && <span className="tooltip-count">• {galleryData.length}</span>}
                  {i===5 && <span className="tooltip-count">• {newsData.length}</span>}
                </div>
              </div>
            );
          })}
        </div>
        {isLeadershipMode && <div className="admin-dot" title="Admin Mode Active"></div>}
      </div>

      {/* SCROLL INDICATOR */}
      <div className="scroll-indicator">
        <div className="scroll-pill" style={{ top: `${(activeSectionIdx / (SECTIONS.length - 1)) * 170}px` }}></div>
      </div>

      {/* SCROLL ENGINE */}
      <div className="kinetic-scroll-engine" ref={scrollEngineRef} onScroll={handleScroll}>
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`}>{renderDashboard()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`}>{renderCrew()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`}>{renderFunds()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 3 ? 'view-active' : ''}`}>{renderVault()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 4 ? 'view-active' : ''}`}>{renderGallery()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 5 ? 'view-active' : ''}`}>{renderNews()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 6 ? 'view-active' : ''}`}>{renderHQ()}</section>
        {/* Spacer for bottom safe area */}
        <div style={{ height: '80px', width: '100%', scrollSnapAlign: 'end' }}></div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div className="modal-overlay" style={{ zIndex: 1100, background: 'rgba(0,0,0,0.95)' }} onClick={() => setLightboxImg(null)}>
          <button className="btn-icon" style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.1)', color: '#fff' }} onClick={() => setLightboxImg(null)}><X size={24}/></button>
          <img src={lightboxImg} alt="Gallery Focus" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px', animation: 'modalSpring 0.4s var(--ease-spring)' }} onClick={e => e.stopPropagation()}/>
        </div>
      )}

      {/* UNIFIED DATA MODAL */}
      {modalConfig && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setModalConfig(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()} style={{ '--modal-accent': SECTIONS.find(s=>s.id === (modalConfig.type==='gal'?'gal':modalConfig.type==='fin'?'fin':modalConfig.type))?.accent || 'var(--color-chrome)' }}>
            
            <div className="modal-header">
              <h2 className="type-h2">{modalConfig.data.id ? 'Edit Record' : 'Initialize Node'}</h2>
              <button className="btn-icon" onClick={() => setModalConfig(null)}><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="modal-body">
              
              {/* CREW FORM */}
              {modalConfig.type === 'crew' && (
                <>
                  <div className="input-group">
                    <input required placeholder="Full Identity Name" className="input-field" value={modalConfig.data.name||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, name:e.target.value}})} />
                    <label className="input-label">Full Identity Name</label>
                  </div>
                  <div className="input-group">
                    <input type="email" placeholder="Email Endpoint" className="input-field" value={modalConfig.data.email||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, email:e.target.value}})} />
                    <label className="input-label">Email Endpoint</label>
                  </div>
                  <div className="input-group">
                    <input type="tel" placeholder="Mobile Number Array" className="input-field" value={modalConfig.data.phone||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, phone:e.target.value}})} />
                    <label className="input-label">Mobile Number Array</label>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span className="type-label block mb-2 text-[var(--text-300)]">Hierarchy</span>
                      <select required className="input-field" value={modalConfig.data.role||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, role:e.target.value}})}>
                        <option value="" disabled>Select Role...</option>
                        <option value="Member">Student Member</option>
                        {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                        {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                        {isLeadershipMode && <option value="Coordinator">Executive Coordinator</option>}
                      </select>
                    </div>
                    <div>
                      <span className="type-label block mb-2 text-[var(--text-300)]">Generation</span>
                      <select className="input-field" value={modalConfig.data.year||'1'} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, year:e.target.value}})}>
                        <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                      </select>
                    </div>
                  </div>

                  {modalConfig.data.role === 'Coordinator' && (
                    <div className="input-group">
                      <input required placeholder="Vector Type (e.g., Design, Events)" className="input-field" value={modalConfig.data.coordinatorType||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, coordinatorType:e.target.value}})} />
                      <label className="input-label">Vector Type</label>
                    </div>
                  )}
                </>
              )}

              {/* FINANCES FORM */}
              {modalConfig.type === 'fin' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span className="type-label block mb-2 text-[var(--text-300)]">Class</span>
                      <select className="input-field" value={modalConfig.data.type||'income'} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, type:e.target.value}})} style={{ borderColor: modalConfig.data.type==='income'?'#22c55e':'#ef4444' }}>
                        <option value="income">CREDIT (+)</option>
                        <option value="expense">DEBIT (-)</option>
                      </select>
                    </div>
                    <div>
                      <span className="type-label block mb-2 text-[var(--text-300)]">Volume (INR)</span>
                      <div className="input-group">
                        <input required type="number" placeholder="0" className="input-field" value={modalConfig.data.amount||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, amount:e.target.value}})} />
                      </div>
                    </div>
                  </div>
                  <div className="input-group">
                    <input required placeholder="Transaction Narrative" className="input-field" value={modalConfig.data.description||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, description:e.target.value}})} />
                    <label className="input-label">Narrative</label>
                  </div>
                </>
              )}

              {/* HQ FORM */}
              {modalConfig.type === 'hq' && (
                <>
                  <div className="input-group">
                    <input placeholder="Unit Ident (e.g. Z649)" className="input-field" value={modalConfig.data.unitCode||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, unitCode:e.target.value}})} />
                    <label className="input-label">Unit Code</label>
                  </div>
                  <div className="input-group">
                    <input placeholder="Gateway Email" className="input-field" value={modalConfig.data.officialEmail||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, officialEmail:e.target.value}})} />
                    <label className="input-label">Official Email</label>
                  </div>
                  <div className="input-group">
                    <input type="number" placeholder="Target Financial Goal (INR)" className="input-field" value={modalConfig.data.financialGoal||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, financialGoal:e.target.value}})} />
                    <label className="input-label">Financial Goal (INR)</label>
                  </div>
                </>
              )}

              {/* VAULT / GALLERY / NEWS FORM */}
              {['vault', 'gal', 'news'].includes(modalConfig.type) && (
                <>
                  {modalConfig.type === 'vault' && (
                    <div>
                      <span className="type-label block mb-2 text-[var(--text-300)]">Category</span>
                      <select className="input-field" value={modalConfig.data.category||'Programs'} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, category:e.target.value}})}>
                        <option value="Trophies">Trophies</option><option value="Programs">Programs</option><option value="Events">Events</option><option value="Meetings">Meetings</option><option value="Other">Other</option>
                      </select>
                    </div>
                  )}
                  {modalConfig.type === 'gal' && (
                    <div>
                      <span className="type-label block mb-2 text-[var(--text-300)]">Category Tag</span>
                      <input className="input-field" placeholder="e.g. MSL Trophy, Site Visit" value={modalConfig.data.category||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, category:e.target.value}})} />
                    </div>
                  )}
                  {modalConfig.type === 'news' && (
                    <div>
                      <span className="type-label block mb-2 text-[var(--text-300)]">Broadcast Tag</span>
                      <input className="input-field" placeholder="e.g. UPDATE, DEADLINE" value={modalConfig.data.tag||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, tag:e.target.value}})} />
                    </div>
                  )}
                  
                  <div className="input-group">
                    <input required placeholder="Title" className="input-field" value={modalConfig.data.title||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, title:e.target.value}})} />
                    <label className="input-label">Title</label>
                  </div>
                  
                  {modalConfig.type !== 'news' && (
                    <div className="input-group">
                      <input placeholder="Target Cloud URL" className="input-field" value={modalConfig.data.link||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, link:e.target.value}})} />
                      <label className="input-label">{modalConfig.type === 'gal' ? 'Image URL' : 'File URL'}</label>
                    </div>
                  )}
                  
                  <div className="input-group">
                    <textarea placeholder="Payload Description..." className="input-field" rows="4" value={modalConfig.data.description||modalConfig.data.content||''} onChange={e=>setModalConfig({...modalConfig, data:{...modalConfig.data, description:e.target.value, content:e.target.value}})}></textarea>
                    <label className="input-label">Content Payload</label>
                  </div>
                </>
              )}

              <button type="submit" className="btn-primary w-full mt-2" disabled={isSaving} style={{ background: saveSuccess ? 'var(--neon-green)' : '' }}>
                {isSaving ? <Loader /> : saveSuccess ? <><Check size={16}/> Saved Successfully</> : "Commit Configuration"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Simple internal spinner component
const Loader = () => (
  <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);