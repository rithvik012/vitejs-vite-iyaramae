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

  /* 🌟 3D ARCHITECTURAL WIREFRAME ENVIRONMENT 🌟 */
  .arch-environment { position: fixed; inset: 0; z-index: -5; background: var(--color-void); overflow: hidden; perspective: 1000px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
  .plasma-orb { position: absolute; border-radius: 50%; filter: blur(150px); opacity: 0.15; animation: plasmaDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); will-change: transform; }
  .orb-c { width: 60vw; height: 60vw; background: var(--neon-cyan); top: -20vh; left: -15vw; }
  .orb-p { width: 50vw; height: 50vw; background: var(--neon-purple); bottom: -15vh; right: -15vw; animation-delay: -5s; }
  @keyframes plasmaDrift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(8vw, 8vh) scale(1.1); } }

  .arch-scene { 
    position: absolute; width: 100vw; height: 100vh; transform-style: preserve-3d;
    transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1); 
    will-change: transform;
  }
  .arch-wall {
    position: absolute; border: 1px solid rgba(0, 240, 255, 0.15);
    background-image: linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
    background-size: 80px 80px; backface-visibility: visible;
  }
  .wall-floor { width: 300vw; height: 300vh; left: -100vw; top: -100vh; transform: rotateX(90deg) translateZ(40vh); }
  .wall-ceil { width: 300vw; height: 300vh; left: -100vw; top: -100vh; transform: rotateX(-90deg) translateZ(40vh); }
  .wall-left { width: 300vw; height: 300vh; left: -100vw; top: -100vh; transform: rotateY(90deg) translateZ(40vw); }
  .wall-right { width: 300vw; height: 300vh; left: -100vw; top: -100vh; transform: rotateY(-90deg) translateZ(40vw); }
  .wall-back { width: 300vw; height: 300vh; left: -100vw; top: -100vh; transform: translateZ(-80vw); }

  /* 🌟 CINEMATIC SPLASH SCREEN 🌟 */
  .splash-container { position: fixed; inset: 0; z-index: 99999; background: var(--color-void); display: flex; align-items: center; justify-content: center; flex-direction: column; transition: transform 0.8s cubic-bezier(0.8, 0, 0.2, 1); }
  .splash-container.exit { transform: translateY(-100%); }
  
  .circle-container { position: relative; width: 300px; height: 300px; display: flex; align-items: center; justify-content: center; }
  .circle-flow-1 { position: absolute; inset: 0; border-radius: 50%; border: 2px solid transparent; border-top-color: var(--neon-cyan); border-bottom-color: var(--neon-cyan); animation: flowRotate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; opacity: 0; }
  .circle-flow-2 { position: absolute; inset: 25px; border-radius: 50%; border: 2px solid transparent; border-left-color: var(--neon-gold); border-right-color: var(--neon-purple); animation: flowRotate 3s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse; opacity: 0; }
  .circle-flow-3 { position: absolute; inset: 50px; border-radius: 50%; border: 2px dotted rgba(255,255,255,0.3); animation: flowRotate 8s linear infinite; opacity: 0; }
  .splash-brand { font-family: var(--font-heading); font-size: 5rem; font-weight: 700; color: #fff; letter-spacing: 0.4em; animation: trackIn 0.6s 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; position: relative; z-index: 10; text-shadow: 0 0 20px rgba(0,240,255,0.4); }
  
  /* Sequence Classes */
  .show-circles .circle-flow-1 { opacity: 1; }
  .show-circles .circle-flow-2 { opacity: 0.8; }
  .show-circles .circle-flow-3 { opacity: 1; }
  .glitch-active .splash-brand { text-shadow: 2px 0 0 red, -2px 0 0 blue, 0 2px 0 green; }
  
  .splash-status { position: absolute; bottom: 20%; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-300); }
  .status-auth { color: var(--neon-green); opacity: 0; animation: revealFade 0.1s 1.8s forwards; }

  @keyframes flowRotate { 100% { transform: rotate(360deg); } }
  @keyframes trackIn { from { margin-left: -50vw; opacity: 0; } to { margin-left: 0; letter-spacing: 0.08em; opacity: 1; } }

  /* 🌟 KINETIC SCROLL ENGINE 🌟 */
  .kinetic-scroll-engine { height: 100dvh; width: 100vw; overflow-y: auto; scroll-snap-type: y mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
  .scrolling-section { min-height: 100dvh; width: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 100px 24px 80px 24px; position: relative; }
  
  /* Staggered Reveal Logic */
  .stagger-item { opacity: 0; transform: translateY(40px); transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth); will-change: transform, opacity; }
  .view-active .stagger-item { opacity: 1; transform: translateY(0); }
  .stagger-1 { transition-delay: 0ms; }
  .stagger-2 { transition-delay: 80ms; }
  .stagger-3 { transition-delay: 160ms; }
  .stagger-4 { transition-delay: 240ms; }

  /* 🌟 BENTO CARD HIERARCHY 🌟 */
  .bento-container { width: 100%; max-width: 1100px; display: flex; flex-direction: column; gap: 24px; margin: 0 auto; }
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 24px; }

  .card-base { border-radius: 16px; position: relative; overflow: hidden; transition: all 0.3s var(--ease-smooth); will-change: transform; }
  .card-header { padding: 24px 24px 16px; border-bottom: 1px solid var(--color-chrome); display: flex; justify-content: space-between; align-items: flex-start; }
  .card-content { padding: 20px 24px; }
  
  .card-ghost { background: transparent; border: 1px solid var(--color-chrome); }
  .card-ghost:hover { border-color: rgba(255,255,255,0.14); }
  
  .card-surface { background: rgba(255,255,255,0.03); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--glass-border); }
  .card-surface:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); box-shadow: 0 8px 32px rgba(0,0,0,0.4); transform: translateY(-2px); }
  
  .card-elevated { background: rgba(255,255,255,0.07); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 4px 24px rgba(0,0,0,0.6); }

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
  .dock-item:active { transform: scale(0.95) !important; }
  .dock-item.active { color: #fff; }
  
  .dock-tooltip { 
    position: absolute; top: -45px; left: 50%; transform: translateX(-50%) translateY(10px);
    background: var(--color-steel); border: 1px solid var(--color-chrome); color: #fff; 
    padding: 6px 12px; border-radius: 8px; font-family: var(--font-body); font-size: 0.75rem; font-weight: 500; 
    opacity: 0; transition: all 0.2s; white-space: nowrap; pointer-events: none; 
    display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }
  .dock-item:hover .dock-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }

  @media (max-width: 768px) {
    .floating-dock-wrapper { width: 92%; max-width: 400px; }
    .floating-dock { width: 100%; overflow-x: auto; scroll-snap-type: x mandatory; justify-content: flex-start; border-radius: 20px; padding: 12px; gap: 12px; }
    .dock-item { width: auto; min-width: max-content; height: 40px; border-radius: 12px; padding: 0 16px; gap: 8px; }
    .dock-label-mobile { display: block; font-family: var(--font-body); font-size: 0.8rem; font-weight: 500; }
    .dock-tooltip { display: none; }
    .dock-item.active { border-bottom: 2px solid var(--item-accent); background: transparent !important; box-shadow: none !important; border-radius: 0; padding-bottom: 6px; height: 38px; }
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; }
  }
  @media (min-width: 769px) { 
    .dock-label-mobile { display: none; } 
    .floating-dock-wrapper { top: 50%; left: 32px; transform: translateY(-50%); bottom: auto; }
    .floating-dock { flex-direction: column; gap: 12px; padding: 16px 10px; border-radius: 100px; }
    .dock-item { width: 50px; height: 50px; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s; }
    .dock-item.active { transform: translateX(10px) scale(1.1); }
    .dock-item:hover:not(.active) { transform: translateX(6px); }
    .dock-tooltip { top: 50%; left: 100%; margin-left: 15px; transform: translateY(-50%) translateX(-10px); }
    .dock-item:hover .dock-tooltip { transform: translateY(-50%) translateX(0); }
    .scrolling-section { padding-left: 100px; }
  }

  /* 🌟 TOP BAR 🌟 */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none; }
  .top-bar > * { pointer-events: auto; }
  
  .security-hud { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 6px 16px 6px 6px; border-radius: 100px; cursor: pointer; transition: all 0.3s; }
  .security-hud:hover { border-color: var(--neon-cyan); }
  .hud-icon-box { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
  .hud-locked .hud-icon-box { background: rgba(255, 255, 255, 0.1); color: #fff; }
  .hud-unlocked .hud-icon-box { background: rgba(0, 240, 255, 0.2); color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); }
  .hud-text { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #fff; }

  /* 🌟 COMPLEX ANIMATRONIC SIDEBAR LOGO 🌟 */
  .complex-sidebar-btn { 
    position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; 
    transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); color: #fff; cursor: pointer;
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 12px;
    backdrop-filter: blur(10px);
  }
  .complex-sidebar-btn:hover { border-color: var(--neon-cyan); box-shadow: 0 0 20px rgba(0,240,255,0.2); }
  .complex-sidebar-btn.spin { transform: rotate(90deg) scale(1.1); border-radius: 50%; border-color: var(--neon-pink); box-shadow: 0 0 20px rgba(255,0,85,0.3); color: var(--neon-pink); }
  .complex-sidebar-btn .hex-outer { position: absolute; transition: all 0.8s ease; }
  .complex-sidebar-btn .aperture-inner { position: absolute; transition: all 0.8s ease; }
  .complex-sidebar-btn .close-x { position: absolute; color: var(--neon-pink); opacity: 0; transform: scale(0) rotate(-90deg); transition: all 0.8s ease; }
  
  .complex-sidebar-btn.spin .hex-outer { transform: rotate(180deg) scale(0); opacity: 0; }
  .complex-sidebar-btn.spin .aperture-inner { transform: rotate(-180deg) scale(1.4); opacity: 0; }
  .complex-sidebar-btn.spin .close-x { opacity: 1; transform: scale(1) rotate(0deg); }

  /* SIDEBAR OVERLAY */
  .sidebar-overlay { position: fixed; inset: 0; z-index: 105; background: transparent; pointer-events: none; transition: background 0.3s; }
  .sidebar-overlay.active { pointer-events: auto; background: rgba(0,0,0,0.5); backdrop-filter: blur(3px); }

  /* SIDEBAR */
  .nasa-sidebar {
    position: fixed; right: -400px; top: 0; bottom: 0; width: 400px;
    background: #050505; border-left: 1px solid var(--glass-border); z-index: 110;
    padding: 100px 24px 30px 24px; display: flex; flex-direction: column;
    box-shadow: -30px 0 80px rgba(0,0,0,0.9); transition: right 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nasa-sidebar.open { right: 0; }

  /* 🌟 MODAL SYSTEM 🌟 */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: revealFade 0.3s ease-out; }
  .modal-window { background: var(--color-obsidian); border: 1px solid var(--color-steel); width: 100%; max-width: 500px; border-radius: 16px; box-shadow: 0 24px 48px rgba(0,0,0,0.8); max-height: 90vh; overflow-y: auto; position: relative; animation: modalSpring 0.5s var(--ease-spring); }
  @keyframes modalSpring { 0% { transform: scale(0.95) translateY(20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
  
  /* Inputs & Buttons */
  .input-group { position: relative; width: 100%; }
  .input-field { width: 100%; background: var(--color-iron) !important; border: 1px solid var(--color-chrome); border-radius: 8px; padding: 20px 16px 8px; color: var(--text-100) !important; font-family: var(--font-body); transition: all 0.2s; }
  .input-label { position: absolute; left: 16px; top: 16px; font-family: var(--font-body); font-size: 0.95rem; color: var(--text-400); transition: all 0.2s ease-out; pointer-events: none; }
  .input-field:focus { border-color: var(--accent-dash); box-shadow: 0 0 0 4px rgba(255,255,255,0.05); }
  .input-field:focus ~ .input-label, .input-field:not(:placeholder-shown) ~ .input-label { top: 6px; font-size: 0.65rem; color: var(--text-200); font-weight: 500; text-transform: uppercase; }
  
  .btn-primary { background: #fff; color: #000; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform 0.15s var(--ease-spring), opacity 0.2s; }
  .btn-primary:active { transform: scale(0.96); }
  .btn-primary:hover { opacity: 0.9; }
  .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--glass-border); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .btn-icon { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
  .btn-icon:hover { color: #fff; background: var(--color-chrome); }
  .btn-icon.danger:hover { color: var(--neon-pink); background: rgba(255, 0, 85, 0.15); }

  .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); font-family: var(--font-ui); }

  /* AI CHAT */
  .ai-terminal { background: rgba(0,0,0,0.6); border-radius: 16px; padding: 20px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 16px; height: 500px; }
  .ai-chat-box { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; padding-right: 8px; scroll-behavior: smooth; }
  .ai-chat-box::-webkit-scrollbar { display: none; }
  .ai-msg { padding: 14px 18px; border-radius: 14px; font-size: 0.95rem; max-width: 85%; line-height: 1.5; font-family: var(--font-body); }
  .ai-msg.bot { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; align-self: flex-start; border-bottom-left-radius: 4px; }
  .ai-msg.user { background: rgba(0,240,255,0.15); border: 1px solid rgba(0,240,255,0.3); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .ai-input-wrapper { display: flex; gap: 8px; margin-top: auto; }

  @media (max-width: 768px) {
    .text-title { font-size: 2.8rem; }
    .scrolling-section { padding: 100px 16px 120px 16px; }
    .modal-window { padding: 24px; }
    .top-bar { padding: 16px 20px; }
    .nasa-sidebar { width: 100%; right: -100%; }
    .complex-sidebar-btn { width: 44px; height: 44px; }
  }
`;

// Helper Functions
const getHashColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = str.charCodeAt(i) + ((hash << 5) - hash); }
  const colors = ['#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#fb923c'];
  return colors[Math.abs(hash) % colors.length];
};

const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200; 
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span className="animate-count">{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Main App Component
export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  
  // Splash & Loading States
  const [splashState, setSplashState] = useState(0); 
  const [isBooting, setIsBooting] = useState(true);
  
  // Core Databases
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // UI States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(ARCH_QUOTES[0]);
  const [modalConfig, setModalConfig] = useState(null); 
  const [viewingCrew, setViewingCrew] = useState(null);
  const [viewingNews, setViewingNews] = useState(null);
  const [formPayload, setFormPayload] = useState({});

  // AI State
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'RSA Advanced AI initialized. Connected to Unit Z649 archives and NASA India telemetry. Awaiting directive.' }
  ]);
  const chatEndRef = useRef(null);
  const scrollEngineRef = useRef(null);

  const SECTIONS = [
    { id: 'dash', label: 'Command', icon: <Hexagon size={20}/>, accent: 'var(--accent-dash)' },
    { id: 'crew', label: 'Personnel', icon: <UsersRound size={20}/>, accent: 'var(--accent-crew)' },
    { id: 'fin', label: 'Treasury', icon: <CircleDollarSign size={20}/>, accent: 'var(--accent-finance)' },
    { id: 'vault', label: 'Vault', icon: <Server size={20}/>, accent: 'var(--accent-vault)' },
    { id: 'gal', label: 'Gallery', icon: <Aperture size={20}/>, accent: 'var(--accent-gallery)' },
    { id: 'news', label: 'Broadcasts', icon: <RadioTower size={20}/>, accent: 'var(--accent-news)' },
    { id: 'hq', label: 'Council', icon: <Crown size={20}/>, accent: 'var(--accent-hq)' },
    { id: 'ai', label: 'AI Chat', icon: <BrainCircuit size={20}/>, accent: 'var(--neon-cyan)' }
  ];

  // Boot Sequence
  useEffect(() => {
    setDailyQuote(ARCH_QUOTES[Math.floor(Math.random() * ARCH_QUOTES.length)]);
    const seq = [
      { time: 100, state: 1 }, 
      { time: 550, state: 2 }, 
      { time: 630, state: 3 }, 
      { time: 1000, state: 4 }, 
      { time: 2000, state: 5 }  
    ];
    const timers = seq.map(step => setTimeout(() => setSplashState(step.state), step.time));
    setTimeout(() => setIsBooting(false), 2400);
    return () => timers.forEach(clearTimeout);
  }, []);

  // Firebase Listeners
  useEffect(() => {
    const unsubs = [
      onSnapshot(doc(db, "unit", "hq"), d => { if(d.exists()) setLeadership(prev => ({ ...prev, ...d.data() })); }),
      onSnapshot(collection(db, "crew"), s => setCrewData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "finances"), s => setFinancialLog(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "vault"), s => setVaultData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "gallery"), s => setGalleryData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "news"), s => setNewsData(s.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];
    return () => unsubs.forEach(unsub => unsub());
  }, []);

  // AI Auto-Scroll
  useEffect(() => {
    const chatContainer = document.getElementById('ai-chat-box-container');
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [aiMessages]);

  // 🌟 BULLETPROOF SCROLL INTERSECTION OBSERVER 🌟
  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-index'));
          setActiveSectionIdx(idx);
        }
      });
    }, options);

    const sections = document.querySelectorAll('.scrolling-section');
    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const navTo = (idx) => {
    const sections = document.querySelectorAll('.scrolling-section');
    if (sections[idx]) {
      sections[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleAdmin = () => {
    if (isLeadershipMode) setIsLeadershipMode(false);
    else if (prompt("Enter Access Key:") === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
    else alert("Incorrect Password.");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { type } = modalConfig;
    const colName = type === 'fin' ? 'finances' : type === 'gal' ? 'gallery' : type;
    try {
      if (type === 'hq') await setDoc(doc(db, "unit", "hq"), formPayload);
      else if (formPayload.id) {
        const { id, ...saveData } = formPayload;
        await updateDoc(doc(db, colName, id), saveData);
      } else await addDoc(collection(db, colName), { ...formPayload, timestamp: Date.now() });
      setModalConfig(null); 
      setFormPayload({});
    } catch (err) { alert("Sync failed."); }
  };

  const handleDelete = async (col, id) => {
    if (window.confirm("Permanently delete record?")) {
      await deleteDoc(doc(db, col, id));
      setModalConfig(null);
      setViewingCrew(null);
      setViewingNews(null);
    }
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const textRaw = aiInput.trim();
    setAiMessages(prev => [...prev, { sender: 'user', text: textRaw }]);
    setAiInput('');

    setTimeout(() => {
      const tokens = textRaw.toLowerCase();
      let botResponse = "Processing directive... Unit Z649 systems nominal.";
      if (tokens.includes("troph") || tokens.includes("lik")) botResponse = "Louis I. Kahn (LIK) Trophy focuses on unrecorded heritage architecture. Ensure vernacular spatial configurations are documented.";
      else if (tokens.includes("msl") || tokens.includes("landscape")) botResponse = "MSL Trophy focus is Velachery. The 'Hydro-Social Connector' acts as a biological machine to manage urban flooding.";
      else if (tokens.includes("news") || tokens.includes("live")) botResponse = `Checking live NASA feed... 68th ANC Workshop Details and Louis I. Kahn Trophy deadlines are active.`;
      else if (tokens.includes("hello") || tokens.includes("hi")) botResponse = "Hello! I am your advanced architectural co-pilot. How can I assist your design logic today?";
      else if (tokens.includes("money") || tokens.includes("balance")) {
        const net = financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0) - financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
        botResponse = `Unit treasury balance stands at exactly ₹${net.toLocaleString()}.`;
      }
      setAiMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  // 🌟 3D CAMERA TRANSFORM LOGIC 🌟
  const getCameraTransform = () => {
    const transforms = [
      "rotateX(15deg) rotateY(15deg) translateZ(-150px)",  // 0: Dash
      "rotateX(5deg) rotateY(0deg) translateZ(100px)",     // 1: Crew
      "rotateX(25deg) rotateY(-20deg) translateZ(0px)",    // 2: Treasury
      "rotateX(0deg) rotateY(45deg) translateZ(200px)",    // 3: Vault
      "rotateX(-15deg) rotateY(-10deg) translateZ(100px)", // 4: Gallery
      "rotateX(40deg) rotateY(30deg) translateZ(-300px)",  // 5: News
      "rotateX(0deg) rotateY(0deg) translateZ(300px)",     // 6: HQ
      "rotateX(10deg) rotateY(-35deg) translateZ(150px)"   // 7: AI
    ];
    return transforms[activeSectionIdx] || transforms[0];
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* 🌟 3D ARCHITECTURAL WIREFRAME ENVIRONMENT 🌟 */}
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

      {/* 🌟 CIRCLE FLOW SPLASH SCREEN 🌟 */}
      <div className={`boot-splash ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash-container">
          <div className={`circle-flow-1 ${splashState >= 1 ? 'show-circles' : ''}`}></div>
          <div className={`circle-flow-2 ${splashState >= 1 ? 'show-circles' : ''}`}></div>
          <div className={`circle-flow-3 ${splashState >= 1 ? 'show-circles' : ''}`}></div>
          <div className={`splash-brand ${splashState === 2 ? 'glitch-active' : ''}`}>RSA</div>
        </div>
      </div>

      {/* 🌟 OVERLAY FOR SIDEBAR (Click outside to close) 🌟 */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>

      <nav className="top-bar">
        <div className="pointer-events-auto">
          <div className={`security-hud ${isLeadershipMode ? 'hud-unlocked' : 'hud-locked'}`} onClick={toggleAdmin}>
            <div className="hud-icon-box">
               {isLeadershipMode ? <Unlock size={14} strokeWidth={2.5}/> : <Lock size={14} strokeWidth={2.5}/>}
            </div>
            <div className="hud-text hidden sm:block">
               [ ADMIN: {isLeadershipMode ? 'ON' : 'OFF'} ]
            </div>
          </div>
        </div>
        
        {/* 🌟 COMPLEX ANIMATRONIC SIDEBAR LOGO 🌟 */}
        <div className="pointer-events-auto" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button className={`complex-sidebar-btn ${sidebarOpen ? 'spin' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Hexagon size={28} className="hex-outer" strokeWidth={1.5} />
            <Aperture size={16} className="aperture-inner" strokeWidth={2} />
            <X size={20} className="close-x" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div className={`nasa-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">RSA <span style={{fontSize:'1rem', color:'#fff', fontStyle:'normal', fontFamily:'var(--font-body)', fontWeight:'400'}}>X</span> NASA</div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={28}/></button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          <div className="sidebar-section-title"><Activity size={14}/> Live Information</div>
          <div className="sidebar-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>EVENT</span><CalendarClock size={14}/></div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '8px' }}>68th Annual Convention</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>Status: Preparation</div>
          </div>
          <div className="sidebar-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>TROPHIES</span><Shield size={14}/></div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '8px' }}>Louis I. Kahn Trophy</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>Status: Open</div>
          </div>
          <div className="sidebar-section-title" style={{ marginTop: '30px' }}><Zap size={14}/> Quick Links</div>
          <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>NASA Website</div><ArrowUpRight size={20} color="#fff"/>
            </div>
          </a>
        </div>
      </div>

      {/* DOCK */}
      <div className="floating-dock-wrapper">
        <div className="floating-dock">
          {SECTIONS.map((sec, i) => (
            <div key={sec.id} className={`dock-item ${activeSectionIdx === i ? 'active' : ''}`} onClick={() => navTo(i)} style={activeSectionIdx===i ? { '--item-accent': sec.accent, color: sec.accent } : {}}>
              {sec.icon}
              <div className="dock-tooltip">{sec.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL ENGINE */}
      <div className="kinetic-scroll-engine" ref={scrollEngineRef}>
        
        {/* DASHBOARD */}
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`} data-index="0">
          <div className="bento-container">
            <div style={{ padding: '0 16px' }}><span className="text-subtitle">Overview</span><h1 className="text-title">Dashboard</h1></div>
            <div className="bento-grid-2" style={{ marginBottom: '24px' }}>
              <div className="bento-card" style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.05), rgba(0,0,0,0.8))', borderColor: 'rgba(0,240,255,0.2)' }}>
                <span className="text-subtitle" style={{color: 'var(--neon-cyan)'}}><Globe size={14}/> Architectural Philosophy</span>
                <div style={{ fontSize: '1.4rem', fontWeight: '500', fontFamily: 'var(--font-heading)', marginTop: '16px', lineHeight: '1.4', fontStyle: 'italic' }}>{dailyQuote}</div>
              </div>
              <div className="bento-card" style={{ background: 'linear-gradient(135deg, rgba(255,190,11,0.05), rgba(0,0,0,0.8))', borderColor: 'rgba(255,190,11,0.2)' }}>
                <span className="text-subtitle" style={{color: 'var(--neon-gold)'}}><Activity size={14}/> System Status</span>
                <div style={{ fontSize: '1.6rem', fontWeight: '600', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>NASA 68th Convention</div>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>Preparation is active. Live feed connected.</p>
              </div>
            </div>
            <div className="bento-grid-3">
              <div className="bento-card"><span className="text-subtitle" style={{color: '#fff'}}><UsersRound size={14}/> Members</span><div className="text-metric">{crewData.length}</div></div>
              <div className="bento-card"><span className="text-subtitle" style={{color: '#fff'}}><HardDrive size={14}/> Files</span><div className="text-metric">{vaultData.length}</div></div>
              <div className="bento-card"><span className="text-subtitle" style={{color: '#fff'}}><RadioTower size={14}/> News</span><div className="text-metric">{newsData.length}</div></div>
            </div>
          </div>
        </section>

        {/* CREW */}
        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`} data-index="1">
          <div className="bento-container">
            <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div><span className="text-subtitle">Member List</span><h1 className="text-title">Unit Members</h1></div>
              <button className="btn-primary" onClick={() => setModalConfig({type: 'crew', data: { role: 'Member', year: '1' }})}><Plus size={16}/> Register Profile</button>
            </div>
            {['1', '2', '3', '4', '5', 'Alumni', 'Unassigned'].map(year => {
              const members = crewData.filter(m => (m.year || 'Unassigned') === year);
              if (members.length === 0) return null;
              return (
                <div key={year} style={{ marginTop: '24px' }}>
                  <span className="text-subtitle" style={{ padding: '0 16px', color: '#fff' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `YEAR ${year}`}</span>
                  <div className="bento-grid-2" style={{ marginTop: '16px' }}>
                    {members.map(m => {
                      const isCouncil = ['UD', 'USEC', 'Coordinator', 'EX USEC'].includes(m.role);
                      return (
                        <div key={m.id} className="bento-card" style={{ padding: '24px', cursor: 'pointer', border: isCouncil ? '1px solid var(--neon-gold)' : '' }} onClick={() => setViewingCrew(m)}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span className="status-pill">{isCouncil && <Crown size={12} style={{marginRight:4}}/>}{m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display:'flex', alignItems:'center', gap:'4px' }}><Eye size={12}/> Details</span>
                          </div>
                          <div style={{ fontSize: '1.4rem', fontWeight: '600', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{m.name}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>{m.email}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TREASURY */}
        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`} data-index="2">
          <div className="bento-container">
            <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div><span className="text-subtitle">Financial Tracking</span><h1 className="text-title">Treasury</h1></div>
              {isLeadershipMode && <button className="btn-primary" onClick={() => setModalConfig({type: 'fin', data: { type: 'income' }})}><Plus size={16}/> Add Record</button>}
            </div>
            <div className="bento-grid-2">
              <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="text-subtitle" style={{color:'var(--neon-green)'}}>Gross Financial Position</span>
                <div style={{display:'flex', gap:'32px', marginTop:'10px'}}>
                  <div><span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>INCOME</span><div style={{fontSize:'1.8rem', fontWeight:'600', color:'var(--neon-green)'}}>₹{financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0).toLocaleString()}</div></div>
                  <div><span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>EXPENSES</span><div style={{fontSize:'1.8rem', fontWeight:'600', color:'var(--neon-pink)'}}>₹{financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0).toLocaleString()}</div></div>
                </div>
              </div>
              <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="text-subtitle" style={{color:'#fff'}}><Zap size={14}/> Current Funds</span>
                <div className="text-metric">₹{(financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0) - financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0)).toLocaleString()}</div>
              </div>
            </div>
            <div className="bento-card" style={{ padding: '8px 24px 24px 24px', overflowX: 'auto' }}>
               <table className="pro-table">
                 <thead><tr><th>Type</th><th>Description</th><th>Amount</th><th>Edit</th></tr></thead>
                 <tbody>
                   {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'40px', color:'rgba(255,255,255,0.5)'}}>No records found.</td></tr>}
                   {financialLog.map(f => (
                     <tr key={f.id}>
                       <td><span className="status-pill" style={{ color: f.type==='income'?'var(--neon-green)':'var(--neon-pink)' }}>{f.type}</span></td>
                       <td style={{ fontWeight: '500' }}>{f.description}</td>
                       <td style={{ fontWeight:'600', color: f.type==='income'?'var(--neon-green)':'#fff' }}>{f.type==='income'?'+ ':'- '}₹{Number(f.amount).toLocaleString()}</td>
                       <td>
                         <div style={{ display: 'flex', gap: '8px' }}>
                           {isLeadershipMode && <button className="btn-icon" onClick={() => setModalConfig({type:'fin', data: f})}><Pencil size={14}/></button>}
                           {isLeadershipMode && <button className="btn-icon danger" onClick={() => handleDelete('finances', f.id)}><Trash2 size={14}/></button>}
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        </section>

        {/* VAULT */}
        <section className={`scrolling-section ${activeSectionIdx === 3 ? 'view-active' : ''}`} data-index="3">
          <div className="bento-container">
            <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div><span className="text-subtitle">Active Works</span><h1 className="text-title">Secure Vault</h1></div>
              {isLeadershipMode && <button className="btn-primary" onClick={() => setModalConfig({type: 'vault', data: { category: 'Programs' }})}><Plus size={16}/> Add File</button>}
            </div>
            <div className="bento-grid-3">
              {vaultData.map(v => (
                <div key={v.id} className="bento-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="status-pill"><HardDrive size={12}/> {v.category || 'File'}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {isLeadershipMode && <button className="btn-icon" title="Archive" onClick={() => handleArchiveVaultItem(v)}><FolderArchive size={14}/></button>}
                      {isLeadershipMode && <button className="btn-icon" onClick={() => setModalConfig({type:'vault', data: v})}><Pencil size={14}/></button>}
                      {isLeadershipMode && <button className="btn-icon danger" onClick={() => handleDelete('vault', v.id)}><Trash2 size={14}/></button>}
                    </div>
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '24px', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{v.title}</div>
                  <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ width: '100%', textDecoration: 'none' }}>Open Link <ArrowUpRight size={14}/></a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className={`scrolling-section ${activeSectionIdx === 4 ? 'view-active' : ''}`} data-index="4">
          <div className="bento-container">
            <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div><span className="text-subtitle">Past Works</span><h1 className="text-title">Archive Gallery</h1></div>
              {isLeadershipMode && <button className="btn-primary" onClick={() => setModalConfig({type: 'gal', data: { fileType: 'Image' }})}><Plus size={16}/> Add Direct Image</button>}
            </div>
            <div className="bento-grid-2">
              {galleryData.map(g => (
                <div key={g.id} className="bento-card" style={{ padding: 0 }}>
                  {g.fileType === 'Archive' ? (
                    <div style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span className="status-pill" style={{ borderColor: 'var(--neon-gold)', color: 'var(--neon-gold)' }}><FolderArchive size={12}/> YEAR {g.archivedYear || '2026'}</span>
                        {isLeadershipMode && <button className="btn-icon danger" onClick={() => handleDelete('gallery', g.id)}><Trash2 size={14}/></button>}
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>{g.title}</div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>{g.description}</div>
                      {g.link && <a href={g.link} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ marginTop: '16px' }}>View Saved Data <ArrowUpRight size={14}/></a>}
                    </div>
                  ) : (
                    <>
                      <div style={{ height: '250px', background: `url("${g.link}") center/cover` }}></div>
                      <div style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <span className="status-pill">{g.category}</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {isLeadershipMode && <button className="btn-icon" onClick={() => setModalConfig({type:'gal', data: g})}><Pencil size={14}/></button>}
                            {isLeadershipMode && <button className="btn-icon danger" onClick={() => handleDelete('gallery', g.id)}><Trash2 size={14}/></button>}
                          </div>
                        </div>
                        <div style={{ fontSize: '1.6rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>{g.title}</div>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6' }}>{g.description}</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section className={`scrolling-section ${activeSectionIdx === 5 ? 'view-active' : ''}`} data-index="5">
          <div className="bento-container" style={{ maxWidth: '1400px' }}>
            <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div><span className="text-subtitle">Announcements</span><h1 className="text-title">News</h1></div>
              {isLeadershipMode && <button className="btn-primary" onClick={() => setModalConfig({type: 'news', data: {}})}><Plus size={16}/> Add Unit News</button>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <span className="text-subtitle" style={{color: '#fff', marginLeft: '8px'}}><Activity size={14}/> Unit Updates</span>
                {newsData.length === 0 && <div className="text-sm text-white/50 px-4">No unit news right now.</div>}
                {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
                  <div key={n.id} className="bento-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}>{n.tag || 'UPDATE'}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {isLeadershipMode && <button className="btn-icon" onClick={() => setModalConfig({type:'news', data: n})}><Pencil size={14}/></button>}
                        {isLeadershipMode && <button className="btn-icon danger" onClick={() => handleDelete('news', n.id)}><Trash2 size={14}/></button>}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '16px', fontFamily: "var(--font-heading)", fontStyle: 'italic' }}>{n.title}</div>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '20px' }}>
                      {n.content && n.content.length > 120 ? n.content.substring(0, 120) + '...' : n.content}
                    </div>
                    <button className="btn-primary btn-secondary" style={{ width: '100%' }} onClick={() => setViewingNews(n)}><BookOpen size={14}/> Read Full Story</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <span className="text-subtitle" style={{color: 'var(--neon-gold)', marginLeft: '8px'}}><Globe size={14}/> Live NASA India Feed</span>
                <div className="bento-card" style={{ border: '1px solid rgba(255, 190, 11, 0.3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[{ id: 'l1', tag: 'OFFICIAL UPDATE', title: '68th ANC Workshop Details Released', date: 'June 16, 2026', link: 'https://nasaindia.co' }, { id: 'l2', tag: 'DEADLINE', title: 'Louis I. Kahn Trophy Submission Window Closes Soon', date: 'June 20, 2026', link: 'https://nasaindia.co' }].map(live => (
                      <div key={live.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span className="status-pill" style={{ color: 'var(--neon-gold)', borderColor: 'rgba(255, 190, 11, 0.3)' }}>{live.tag}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{live.date}</span>
                        </div>
                        <div style={{ fontSize: '1.4rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>{live.title}</div>
                        <a href={live.link} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ marginTop: '16px', display: 'flex', width: 'fit-content' }}>Official Portal <ArrowUpRight size={14}/></a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HQ */}
        <section className={`scrolling-section ${activeSectionIdx === 6 ? 'view-active' : ''}`} data-index="6">
          <div className="bento-container">
            <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div><span className="text-subtitle">Administration Layer</span><h1 className="text-title">Executive Core</h1></div>
              {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => setModalConfig({type: 'hq', data: leadership})}><Settings size={16}/> Edit Unit Info</button>}
            </div>
            <div className="bento-card" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.15)', marginBottom: '24px' }}>
              <span className="text-subtitle" style={{color: '#fff'}}>Unit Information</span>
              <div style={{ fontSize: '3.5rem', fontWeight: '600', margin: '10px 0', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>Unit {leadership.unitCode}</div>
              <div className="status-pill" style={{fontFamily: 'var(--font-mono)', textTransform: 'lowercase'}}><Globe size={12}/> {leadership.officialEmail}</div>
            </div>
            <span className="text-subtitle" style={{ padding: '0 16px', marginTop: '16px', color: 'var(--neon-gold)' }}><Crown size={14}/> High Command Directory</span>
            <div className="bento-grid-2">
              {crewData.filter(m => ['UD', 'USEC', 'Coordinator', 'EX USEC'].includes(m.role)).map(m => (
                <div key={m.id} className="bento-card" style={{ border: '1px solid rgba(255, 190, 11, 0.3)', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="status-pill" style={{ color: 'var(--neon-gold)', borderColor: 'rgba(255, 190, 11, 0.3)' }}>{m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}</span>
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '16px', fontFamily: 'var(--font-heading)', fontStyle:'italic' }}>{m.name}</div>
                  <button className="btn-primary btn-secondary" style={{ width: '100%' }} onClick={() => setViewingCrew(m)}><Eye size={14}/> View Dossier</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI */}
        <section className={`scrolling-section ${activeSectionIdx === 7 ? 'view-active' : ''}`} data-index="7">
          <div className="bento-container" style={{ maxWidth: '1400px' }}>
            <div style={{ padding: '0 16px' }}><span className="text-subtitle">AI Assistant</span><h1 className="text-title">RSA AI</h1></div>
            <div className="bento-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
              <span className="text-subtitle" style={{color: '#fff'}}><BrainCircuit size={14}/> Chat with RSA AI</span>
              <div className="ai-terminal" style={{ marginTop: '16px' }}>
                <div id="ai-chat-box-container" className="ai-chat-box">
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`ai-msg ${msg.sender}`}>{msg.text}</div>
                  ))}
                </div>
                <form onSubmit={handleAiSubmit} className="ai-input-wrapper">
                  <input className="ai-input" placeholder="Ask complex architecture queries or request live NASA updates..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} />
                  <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }}><Send size={18}/></button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        <div style={{ height: '80px', width: '100%', scrollSnapAlign: 'end' }}></div>
      </div>

      {/* FULL NEWS READER MODAL */}
      {viewingNews && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setViewingNews(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}>{viewingNews.tag || 'UPDATE'}</span>
              <button className="btn-icon" onClick={() => setViewingNews(null)}><X size={24}/></button>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '24px', fontFamily: "var(--font-heading)", fontStyle: 'italic', lineHeight: '1.2' }}>{viewingNews.title}</div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>{viewingNews.content}</div>
          </div>
        </div>
      )}

      {/* MEMBER DETAILS MODAL */}
      {viewingCrew && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setViewingCrew(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 className="text-title" style={{ fontSize: '2.5rem' }}>Member Details</h2>
              <button className="btn-icon" onClick={() => setViewingCrew(null)}><X size={24}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'32px' }}>
              <div><span className="text-subtitle">Name</span><div style={{fontSize:'1.8rem', fontWeight:'600', fontFamily:'var(--font-heading)', fontStyle:'italic'}}>{viewingCrew.name}</div></div>
              <div><span className="text-subtitle">Role</span><div className="status-pill" style={{color:'var(--neon-cyan)', borderColor:'rgba(0,240,255,0.3)'}}>{viewingCrew.role}</div></div>
              {viewingCrew.coordinatorType && <div><span className="text-subtitle">Department</span><div style={{fontSize:'1.1rem'}}>{viewingCrew.coordinatorType}</div></div>}
              <div><span className="text-subtitle">Year</span><div style={{fontSize:'1.1rem'}}>{viewingCrew.year}</div></div>
              <div><span className="text-subtitle">Email</span><div style={{fontFamily:'var(--font-mono)'}}>{viewingCrew.email}</div></div>
              {viewingCrew.phone && <div><span className="text-subtitle">Phone</span><div style={{fontFamily:'var(--font-mono)'}}>{viewingCrew.phone}</div></div>}
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <a href={`mailto:${viewingCrew.email}`} className="btn-primary" style={{ flex: 1 }}><Mail size={16}/> Email</a>
                {viewingCrew.phone && <a href={`tel:${viewingCrew.phone}`} className="btn-primary" style={{ flex: 1 }}><Phone size={16}/> Call</a>}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {isLeadershipMode ? (
                <>
                  <button className="btn-primary btn-secondary" style={{flex: 1}} onClick={() => { setFormPayload(viewingCrew); setModalMode('crew'); }}><Pencil size={16}/> Edit</button>
                  <button className="btn-primary btn-secondary danger" style={{color:'var(--neon-pink)', borderColor:'rgba(255,0,85,0.3)'}} onClick={() => deleteDocRecord('crew', viewingCrew.id)}><Trash2 size={16}/> Delete</button>
                </>
              ) : (
                <div style={{fontSize:'0.8rem', color:'var(--text-secondary)', fontStyle:'italic'}}><Lock size={12} style={{display:'inline', marginBottom:'-2px'}}/> Only Admins can edit or delete this member.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT/ADD MODAL (Normal users can ONLY add to CREW) */}
      {modalMode && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setModalMode(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="text-title" style={{ fontSize: '2rem' }}>{formPayload.id ? 'Edit' : 'Add'} Data</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSave}>
              
              {modalMode === 'crew' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <input required placeholder="Name" className="input-field" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email" className="input-field" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Phone Number" className="input-field" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  
                  <select required className="input-field" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Role...</option>
                    <option value="Member">Student Member</option>
                    {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                    {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                    {isLeadershipMode && <option value="EX USEC">Ex-Unit Secretary (EX USEC)</option>}
                    {isLeadershipMode && <option value="Coordinator">Coordinator</option>}
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <input required placeholder="Coordinator Type (e.g., Design, Events)" className="input-field" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} />
                  )}

                  <select className="input-field" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </div>
              )}

              {modalMode === 'finances' && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <select className="input-field" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="income">INCOME (+)</option>
                    <option value="expense">EXPENSE (-)</option>
                  </select>
                  <input required placeholder="What was this for?" className="input-field" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <input required type="number" placeholder="Amount (INR)" className="input-field" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                </div>
              )}

              {modalMode === 'hq' && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <input placeholder="Unit Code (e.g. Z649)" className="input-field" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Official Email" className="input-field" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <input type="number" placeholder="Goal Amount (INR)" className="input-field" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                </div>
              )}

              {modalMode === 'vault' && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <select className="input-field" value={formPayload.category||'Programs'} onChange={e=>setFormPayload({...formPayload, category:e.target.value})}>
                    <option value="Trophies">Trophies</option><option value="Programs">Programs</option><option value="Events">Events</option><option value="Meetings">Meetings</option><option value="Other">Other</option>
                  </select>
                  <input required placeholder="Title" className="input-field" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <input placeholder="Link / URL" className="input-field" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                </div>
              )}

              {['gallery', 'news'].includes(modalMode) && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <input required placeholder="Title" className="input-field" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  {modalMode !== 'news' && <input placeholder="Link / URL" className="input-field" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />}
                  <textarea placeholder="Description..." className="input-field" rows="4" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
                </div>
              )}

              <button type="submit" className="btn-primary w-full justify-center mt-6" style={{ padding: '18px', fontSize: '1rem', letterSpacing: '0.1em' }}>
                SAVE DATA
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}