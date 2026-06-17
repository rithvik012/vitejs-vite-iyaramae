import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

// ALL ICONS VERIFIED AND MATCHED EXACTLY
import { 
  Shield, Plus, Trash2, Server, Aperture, Settings, X, ArrowUpRight, Mail, Phone,
  Globe, Activity, Crown, BrainCircuit, Send, Hexagon, Zap, Lock, Unlock, Pencil, Eye, 
  HardDrive, BookOpen, Calendar, Users, DollarSign, Archive, Radio 
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

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
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
  .text-truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; display: block; }

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

  /* 🌟 ORIGINAL CIRCLE FLOW SPLASH SCREEN 🌟 */
  .boot-splash { position: fixed; inset: 0; z-index: 99999; background: #000; display: flex; align-items: center; justify-content: center; transition: opacity 1.2s ease-in-out, visibility 1.2s; }
  .boot-splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .splash-container { position: relative; width: 300px; height: 300px; display: flex; align-items: center; justify-content: center; }
  .circle-flow-1 { position: absolute; inset: 0; border-radius: 50%; border: 2px solid transparent; border-top-color: var(--neon-cyan); border-bottom-color: var(--neon-cyan); animation: flowRotate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; opacity: 0; transition: opacity 0.5s; }
  .circle-flow-2 { position: absolute; inset: 25px; border-radius: 50%; border: 2px solid transparent; border-left-color: var(--neon-gold); border-right-color: var(--neon-purple); animation: flowRotate 3s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse; opacity: 0; transition: opacity 0.5s; }
  .circle-flow-3 { position: absolute; inset: 50px; border-radius: 50%; border: 2px dotted rgba(255,255,255,0.3); animation: flowRotate 8s linear infinite; opacity: 0; transition: opacity 0.5s; }
  .splash-brand { font-family: var(--font-heading); font-size: 5rem; font-weight: 700; color: #fff; letter-spacing: 0.4em; animation: trackIn 0.6s 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; position: relative; z-index: 10; text-shadow: 0 0 20px rgba(0,240,255,0.4); margin-left: -50vw; transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
  
  .show-circles .circle-flow-1 { opacity: 1; }
  .show-circles .circle-flow-2 { opacity: 0.8; }
  .show-circles .circle-flow-3 { opacity: 1; }
  .show-circles .splash-brand { opacity: 1; margin-left: 0; letter-spacing: 0.08em; }
  .glitch-active .splash-brand { text-shadow: 2px 0 0 red, -2px 0 0 blue, 0 2px 0 green; }
  
  @keyframes flowRotate { 100% { transform: rotate(360deg); } }
  @keyframes trackIn { to { margin-left: 0; letter-spacing: 0.08em; opacity: 1; } }

  /* 🌟 HYBRID SCROLL ENGINE (Intersection Observer Powered) 🌟 */
  .kinetic-scroll-engine { height: 100dvh; width: 100vw; overflow-y: auto; overflow-x: hidden; scroll-behavior: smooth; perspective: 1000px; -webkit-overflow-scrolling: touch; scroll-snap-type: y mandatory; }
  
  /* Desktop Layout */
  @media (min-width: 769px) {
    .scrolling-section { height: 100dvh; width: 100vw; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 100px 40px 80px 100px; position: relative; }
    .bento-container { width: 100%; max-width: 1100px; max-height: 80vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; padding: 10px 10px 40px 10px; margin: 0 auto; scrollbar-width: none; }
    .bento-container::-webkit-scrollbar { display: none; }
  }

  /* Mobile Layout */
  @media (max-width: 768px) {
    .scrolling-section { height: auto; min-height: 100dvh; width: 100vw; scroll-snap-align: start; display: flex; flex-direction: column; padding: 100px 16px 120px 16px; position: relative; }
    .bento-container { width: 100%; max-width: 100%; display: flex; flex-direction: column; gap: 16px; margin: 0; overflow-y: visible; max-height: none; }
  }

  /* Staggered Reveal Logic */
  .stagger-item { opacity: 0; transform: translateY(40px); transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth); will-change: transform, opacity; }
  .view-active .stagger-item { opacity: 1; transform: translateY(0); }
  .stagger-1 { transition-delay: 0ms; }
  .stagger-2 { transition-delay: 80ms; }
  .stagger-3 { transition-delay: 160ms; }
  .stagger-4 { transition-delay: 240ms; }

  /* 🌟 BENTO CARDS 🌟 */
  .bento-card { 
    background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border); border-top: 1px solid rgba(255,255,255,0.12);
    position: relative; overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: all 0.3s var(--ease-smooth);
  }
  
  /* The Card Glow Splash */
  .bento-card::before {
    content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%);
    opacity: 0; transform: scale(0.5); transition: all 0.4s var(--ease-spring); pointer-events: none; z-index: 0;
  }
  .bento-card:hover { border-color: rgba(255,255,255,0.25); box-shadow: 0 20px 40px rgba(0,0,0,0.8); transform: translateY(-4px); }
  .bento-card:hover::before { opacity: 1; transform: scale(1.5); }
  .bento-card > * { position: relative; z-index: 1; }
  
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 24px; }

  @media (min-width: 769px) { .bento-card { padding: 32px; border-radius: 20px; } }
  @media (max-width: 768px) { 
    .bento-card { padding: 20px; border-radius: 16px; } 
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; gap: 16px; }
  }

  /* 🌟 TOP BAR 🌟 */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none;}
  .top-bar > * { pointer-events: auto; }
  
  .security-hud { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 6px 16px 6px 6px; border-radius: 100px; cursor: pointer; transition: all 0.3s; }
  .security-hud:hover { border-color: var(--neon-cyan); transform: scale(1.05); }
  .hud-icon-box { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; background: rgba(255,255,255,0.1); color: #fff; }
  .hud-unlocked .hud-icon-box { background: rgba(0, 240, 255, 0.2); color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); animation: iconPop 0.4s var(--ease-spring); }
  .hud-text { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #fff; }

  /* 🌟 COMPLEX ANIMATRONIC SIDEBAR LOGO 🌟 */
  .complex-sidebar-btn { 
    position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; 
    transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); color: #fff; cursor: pointer;
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 12px;
    backdrop-filter: blur(10px);
  }
  .complex-sidebar-btn:hover { border-color: var(--neon-cyan); box-shadow: 0 0 20px rgba(0,240,255,0.2); transform: scale(1.1); }
  .complex-sidebar-btn.spin { transform: rotate(90deg) scale(1.1); border-radius: 50%; border-color: var(--neon-pink); box-shadow: 0 0 20px rgba(255,0,85,0.3); color: var(--neon-pink); }
  .complex-sidebar-btn .hex-outer { position: absolute; transition: all 0.8s ease; }
  .complex-sidebar-btn .aperture-inner { position: absolute; transition: all 0.8s ease; }
  .complex-sidebar-btn .close-x { position: absolute; color: var(--neon-pink); opacity: 0; transform: scale(0) rotate(-90deg); transition: all 0.8s ease; }
  
  .complex-sidebar-btn.spin .hex-outer { transform: scale(0); opacity: 0; }
  .complex-sidebar-btn.spin .aperture-inner { transform: rotate(-180deg) scale(1.4); opacity: 0; }
  .complex-sidebar-btn.spin .close-x { opacity: 1; transform: scale(1) rotate(0deg); }

  @media (max-width: 768px) {
    .top-bar { padding: 16px 20px; }
    .complex-sidebar-btn { width: 44px; height: 44px; }
  }

  /* SIDEBAR OVERLAY FOR CLICK-TO-CLOSE */
  .sidebar-overlay { position: fixed; inset: 0; z-index: 105; background: transparent; pointer-events: none; transition: background 0.3s; }
  .sidebar-overlay.active { pointer-events: auto; background: rgba(0,0,0,0.5); backdrop-filter: blur(3px); }

  /* SIDEBAR */
  .nasa-sidebar {
    position: fixed; right: -400px; top: 0; bottom: 0; width: 400px; max-width: 100vw;
    background: var(--color-obsidian); border-left: 1px solid var(--glass-border); z-index: 110;
    padding: 100px 24px 30px 24px; display: flex; flex-direction: column;
    box-shadow: -30px 0 80px rgba(0,0,0,0.9); transition: right 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nasa-sidebar.open { right: 0; }
  @media (max-width: 768px) { .nasa-sidebar { width: 100%; right: -100%; padding-top: env(safe-area-inset-top, 60px); } }
  
  .sidebar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .sidebar-logo { font-family: var(--font-heading); font-size: 2rem; font-style: italic; font-weight: 700; color: var(--neon-cyan); display: flex; align-items: center; gap: 8px; }
  .sidebar-close { background: transparent; border: none; color: #fff; cursor: pointer; transition: transform 0.3s; }
  .sidebar-close:hover { transform: rotate(90deg) scale(1.1); color: var(--neon-pink); }
  .sidebar-section-title { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 16px; }
  .sidebar-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px; margin-bottom: 16px; transition: all 0.3s; }

  /* 🌟 OPTIMIZED FLOATING DOCK 🌟 */
  .floating-dock-wrapper { position: fixed; z-index: 100; pointer-events: none; }
  .floating-dock { 
    background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(20px); border: 1px solid var(--color-chrome); 
    display: flex; box-shadow: 0 20px 40px rgba(0,0,0,0.8); pointer-events: auto;
  }
  .dock-item { 
    display: flex; align-items: center; justify-content: center; color: var(--text-300); cursor: pointer; 
    position: relative; transition: all 0.3s var(--ease-spring); overflow: hidden;
  }
  /* Splash Ripple for Dock Items */
  .dock-item::before {
    content: ''; position: absolute; inset: 0; background: currentColor; opacity: 0; border-radius: inherit;
    transform: scale(0.5); transition: transform 0.4s var(--ease-spring), opacity 0.4s; z-index: -1;
  }
  .dock-item:active::before { opacity: 0.2; transform: scale(1.5); transition: 0s; }
  
  /* Desktop Dock (Left Side, Vertical) */
  @media (min-width: 769px) {
    .floating-dock-wrapper { top: 50%; left: 32px; transform: translateY(-50%); }
    .floating-dock { flex-direction: column; padding: 16px 10px; border-radius: 100px; gap: 12px; }
    .dock-item { width: 48px; height: 48px; border-radius: 50%; }
    .dock-item.active { background: #fff; color: #000; transform: translateX(12px) scale(1.1); box-shadow: -8px 8px 20px rgba(255,255,255,0.15); animation: popActive 0.4s var(--ease-spring); }
    .dock-item:hover:not(.active) { background: rgba(255,255,255,0.1); color: #fff; transform: translateX(6px); }
    
    .dock-tooltip { 
      position: absolute; left: 100%; top: 50%; margin-left: 16px; transform: translateY(-50%) translateX(-10px);
      background: var(--color-steel); border: 1px solid var(--color-chrome); color: #fff; 
      padding: 6px 12px; border-radius: 8px; font-family: var(--font-body); font-size: 0.75rem; font-weight: 500; 
      opacity: 0; transition: all 0.2s; white-space: nowrap; pointer-events: none; display: flex; align-items: center; gap: 6px;
    }
    .dock-item:hover .dock-tooltip { opacity: 1; transform: translateY(-50%) translateX(0); }
    .dock-label-mobile { display: none; }
    @keyframes popActive { 0% { transform: translateX(0) scale(1); } 50% { transform: translateX(14px) scale(1.15); } 100% { transform: translateX(12px) scale(1.1); } }
  }

  /* Mobile Dock (Bottom, Horizontal) */
  @media (max-width: 768px) {
    .floating-dock-wrapper { bottom: 20px; left: 50%; transform: translateX(-50%); width: 92%; padding-bottom: env(safe-area-inset-bottom); }
    .floating-dock { width: 100%; flex-direction: row; padding: 8px; border-radius: 24px; gap: 8px; overflow-x: auto; scroll-snap-type: x mandatory; justify-content: flex-start; }
    .floating-dock::-webkit-scrollbar { display: none; }
    .dock-item { min-width: max-content; height: 44px; padding: 0 16px; border-radius: 12px; gap: 8px; scroll-snap-align: center; }
    .dock-item.active { background: #fff; color: #000; transform: translateY(-4px); box-shadow: 0 8px 16px rgba(255,255,255,0.2); }
    .dock-label-mobile { font-family: var(--font-body); font-size: 0.8rem; font-weight: 600; }
    .dock-tooltip { display: none; }
  }

  /* BUTTONS & PILLS */
  @keyframes iconPop { 0% { transform: scale(1); } 50% { transform: scale(1.3) rotate(10deg); } 100% { transform: scale(1) rotate(0); } }

  .btn-primary { 
    background: #fff; color: #000; border: none; padding: 14px 24px; border-radius: 12px; font-family: var(--font-body); font-weight: 700; font-size: 0.9rem; 
    cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; 
    position: relative; overflow: hidden; transition: all 0.3s var(--ease-spring); z-index: 1;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(255,255,255,0.3); letter-spacing: 0.05em; }
  
  /* Primary Button Splash */
  .btn-primary::after {
    content: ''; position: absolute; top: 50%; left: 50%; width: 150%; height: 150%;
    background: rgba(0, 0, 0, 0.1); transform: translate(-50%, -50%) scale(0);
    border-radius: 50%; transition: transform 0.4s var(--ease-spring), opacity 0.4s; opacity: 0; z-index: -1;
  }
  .btn-primary:active::after { transform: translate(-50%, -50%) scale(1); opacity: 1; transition: 0s; }

  .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--glass-border); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .btn-secondary::after { background: rgba(255,255,255,0.2); }

  .btn-icon { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center; }
  .btn-icon:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .btn-icon:hover svg { animation: iconPop 0.4s var(--ease-spring); }
  .btn-icon.danger:hover { color: var(--neon-pink); background: rgba(255, 0, 85, 0.15); }
  
  .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 100px; font-family: var(--font-body); font-weight: 600; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: var(--color-chrome); border: 1px solid transparent; white-space: nowrap; transition: all 0.3s; }
  .status-pill:hover { transform: scale(1.05); background: rgba(255,255,255,0.1); }

  .filter-tab { background: transparent; border: 1px solid var(--glass-border); color: var(--text-secondary); padding: 8px 16px; border-radius: 100px; cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: all 0.3s; white-space: nowrap; }
  .filter-tab.active { background: #fff; color: #000; }

  .finance-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--color-chrome); transition: background 0.2s; }
  .finance-row:hover { background: rgba(255,255,255,0.02); }
  .finance-row.income { border-left: 3px solid var(--accent-crew); background: linear-gradient(90deg, rgba(52, 211, 153, 0.05) 0%, transparent 100%); }
  .finance-row.expense { border-left: 3px solid var(--accent-news); background: linear-gradient(90deg, rgba(251, 146, 60, 0.05) 0%, transparent 100%); }

  /* 🌟 BOTTOM SHEET MODALS 🌟 */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; opacity: 0; animation: fadeIn 0.2s forwards; }
  .modal-window { background: var(--color-obsidian); border: 1px solid var(--color-steel); width: 100%; max-width: 550px; border-radius: 24px; padding: 32px; box-shadow: 0 50px 100px rgba(0,0,0,0.9); max-height: 90vh; overflow-y: auto; position: relative; opacity: 0; transform: scale(0.95); animation: popIn 0.4s 0.1s forwards var(--ease-spring); }
  
  @media (max-width: 768px) {
    .modal-overlay { align-items: flex-end; padding: 0; }
    .modal-window { border-radius: 24px 24px 0 0; padding: 24px 24px 40px 24px; transform: translateY(100%); animation: slideUpMobile 0.4s forwards var(--ease-spring); }
    input, textarea, select { font-size: 16px !important; } /* Prevents iOS Zoom */
  }

  @keyframes fadeIn { to { opacity: 1; } }
  @keyframes popIn { to { opacity: 1; transform: scale(1); } }
  @keyframes slideUpMobile { to { opacity: 1; transform: translateY(0); } }
  
  /* Input Floating Labels */
  .input-group { position: relative; width: 100%; }
  .input-field { width: 100%; background: var(--color-iron) !important; border: 1px solid var(--color-chrome); border-radius: 12px; padding: 24px 16px 8px; color: var(--text-100) !important; transition: all 0.3s var(--ease-spring); }
  .input-label { position: absolute; left: 16px; top: 18px; font-size: 0.95rem; color: var(--text-400); transition: all 0.3s var(--ease-spring); pointer-events: none; }
  .input-field:focus { border-color: var(--neon-cyan); box-shadow: 0 0 0 4px rgba(0,240,255,0.1); transform: scale(1.02); }
  .input-field:focus ~ .input-label, .input-field:not(:placeholder-shown) ~ .input-label { top: 6px; font-size: 0.65rem; color: var(--neon-cyan); font-weight: 600; letter-spacing: 0.05em; }

  .avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 700; color: #fff; font-size: 1rem; flex-shrink: 0; transition: transform 0.3s var(--ease-spring); }
  .bento-card:hover .avatar { transform: scale(1.1) rotate(5deg); }
  
  .animate-count { animation: countUpAnim 0.8s ease-out forwards; }
  @keyframes countUpAnim { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  /* AI CHAT */
  .ai-terminal { background: rgba(0,0,0,0.6); border-radius: 16px; padding: 20px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 16px; height: 500px; }
  .ai-chat-box { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; padding-right: 8px; scroll-behavior: smooth; }
  .ai-msg { padding: 14px 18px; border-radius: 14px; font-size: 0.95rem; max-width: 85%; line-height: 1.5; }
  .ai-msg.bot { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); align-self: flex-start; border-bottom-left-radius: 4px; }
  .ai-msg.user { background: rgba(0,240,255,0.15); border: 1px solid rgba(0,240,255,0.3); align-self: flex-end; border-bottom-right-radius: 4px; }
  @media (max-width: 768px) { .ai-terminal { height: calc(100dvh - 300px); min-height: 350px; } }
`;

// ==========================================
// 4. HELPER COMPONENTS
// ==========================================

const getHashColor = (str) => {
  if (!str) return '#60a5fa'; 
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

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  
  // Splash States
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
  const [modalMode, setModalMode] = useState(null); 
  const [viewingCrew, setViewingCrew] = useState(null);
  const [viewingNews, setViewingNews] = useState(null);
  const [formPayload, setFormPayload] = useState({});
  const [vaultFilter, setVaultFilter] = useState('All');

  // AI State
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'RSA Advanced AI initialized. Connected to Unit Z649 archives and NASA India telemetry. Awaiting directive.' }
  ]);

  // Refs
  const scrollEngineRef = useRef(null);
  const chatEndRef = useRef(null);
  const dockRef = useRef(null); 

  const SECTIONS = [
    { id: 'dash', label: 'Command', icon: <Hexagon size={20}/>, accent: 'var(--accent-dash)' },
    { id: 'crew', label: 'Personnel', icon: <Users size={20}/>, accent: 'var(--accent-crew)' },
    { id: 'fin', label: 'Treasury', icon: <DollarSign size={20}/>, accent: 'var(--accent-finance)' },
    { id: 'vault', label: 'Vault', icon: <Server size={20}/>, accent: 'var(--accent-vault)' },
    { id: 'gal', label: 'Gallery', icon: <Aperture size={20}/>, accent: 'var(--accent-gallery)' },
    { id: 'news', label: 'Broadcasts', icon: <Radio size={20}/>, accent: 'var(--accent-news)' },
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
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages]);

  // 🌟 BULLETPROOF INTERSECTION OBSERVER FOR SCROLL SYNC 🌟
  useEffect(() => {
    const options = { root: scrollEngineRef.current, rootMargin: '-20% 0px -40% 0px', threshold: 0 };
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

  const handleSecurityToggle = () => {
    if (isLeadershipMode) setIsLeadershipMode(false);
    else {
      const pass = prompt("Enter Access Key:");
      if (pass === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else if (pass) alert("Incorrect Password.");
    }
  };

  const handleSaveToCloud = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'hq') {
        await setDoc(doc(db, "unit", "hq"), formPayload);
      } else if (formPayload.id) {
        const { id, ...data } = formPayload;
        await updateDoc(doc(db, modalMode === 'finances' ? 'finances' : modalMode === 'gal' ? 'gallery' : modalMode), data);
      } else {
        await addDoc(collection(db, modalMode === 'finances' ? 'finances' : modalMode === 'gal' ? 'gallery' : modalMode), { ...formPayload, timestamp: Date.now() });
      }
      setModalMode(null); 
      setFormPayload({});
    } catch (err) { alert("Sync failed."); }
  };

  // 🌟 FIXED handleDelete LOGIC 🌟
  const handleDelete = async (col, id) => {
    if (window.confirm("Permanently delete record?")) {
      try {
        await deleteDoc(doc(db, col, id));
        setModalMode(null);
        setViewingCrew(null);
        setViewingNews(null);
      } catch (e) {
        console.error(e);
        alert("Error deleting record.");
      }
    }
  };

  const handleArchiveVaultItem = async (item) => {
    if (!window.confirm("Move this work to the Archive Gallery? It will be permanently removed from the active vault.")) return;
    try {
      const currentYear = new Date().getFullYear(); 
      await addDoc(collection(db, 'gallery'), {
         title: item.title,
         category: item.category || 'Archived Work',
         description: `Archived File (${currentYear}). ${item.description || ''}`,
         link: item.link || '',
         fileType: 'Archive',
         archivedYear: currentYear,
         timestamp: Date.now()
      });
      await deleteDoc(doc(db, 'vault', item.id));
      alert("Successfully moved to Archive.");
    } catch(e) {
      alert("Failed to archive item.");
    }
  };

  // 🌟 3D CAMERA TRANSFORM LOGIC (Matches specific rooms) 🌟
  const getCameraTransform = () => {
    const transforms = [
      "rotateX(15deg) rotateY(15deg) translateZ(-150px)",  // 0: Dash - Exterior
      "rotateX(5deg) rotateY(0deg) translateZ(100px)",     // 1: Crew - Interior Living
      "rotateX(25deg) rotateY(-20deg) translateZ(0px)",    // 2: Treasury - Corner Office
      "rotateX(0deg) rotateY(45deg) translateZ(200px)",    // 3: Vault - Corridor
      "rotateX(-15deg) rotateY(-10deg) translateZ(100px)", // 4: Gallery - Low angle up
      "rotateX(40deg) rotateY(30deg) translateZ(-300px)",  // 5: News - Bird's eye aerial
      "rotateX(0deg) rotateY(0deg) translateZ(300px)",     // 6: HQ - Boardroom
      "rotateX(10deg) rotateY(-35deg) translateZ(150px)"   // 7: AI - Server Room
    ];
    return transforms[activeSectionIdx] || transforms[0];
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const textRaw = aiInput.trim();
    setAiMessages(prev => [...prev, { sender: 'user', text: textRaw }]);
    setAiInput('');

    setTimeout(() => {
      const tokens = textRaw.toLowerCase();
      let botResponse = "Processing directive... Unit systems nominal.";
      if (tokens.includes("troph") || tokens.includes("lik")) botResponse = "The Louis I. Kahn (LIK) Trophy focuses on unrecorded heritage architecture. Ensure vernacular spatial configurations are documented.";
      else if (tokens.includes("msl") || tokens.includes("landscape")) botResponse = "For the MSL Trophy, our focus is Velachery. The 'Hydro-Social Connector' acts as a biological machine to manage urban flooding.";
      else if (tokens.includes("news") || tokens.includes("live")) botResponse = `Checking live NASA feed... 68th ANC Workshop Details and Louis I. Kahn Trophy deadlines are active.`;
      else if (tokens.includes("hello") || tokens.includes("hi")) botResponse = "Hello! I am your advanced architectural co-pilot. How can I assist your design logic today?";
      else if (tokens.includes("money") || tokens.includes("balance")) {
        const net = financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0) - financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
        botResponse = `Unit treasury balance stands at exactly ₹${net.toLocaleString()}.`;
      }
      setAiMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  // ==========================================
  // DASHBOARD SECTIONS
  // ==========================================
  const getSectionStyle = (idx) => {
    return {
      '--reveal-dir': '40px',
      '--section-accent': SECTIONS[idx]?.accent || 'var(--neon-cyan)'
    };
  };

  const renderDashboard = () => (
    <div className="bento-container" style={getSectionStyle(0)}>
      <div style={{ padding: '0 16px' }}><span className="text-subtitle">Overview</span><h1 className="text-title">Dashboard</h1></div>
      <div className="bento-grid-2" style={{ marginBottom: '24px' }}>
        <div className="bento-card stagger-item stagger-2" style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.05), rgba(0,0,0,0.8))', borderColor: 'rgba(0,240,255,0.2)' }}>
          <span className="text-subtitle" style={{color: 'var(--neon-cyan)'}}><Globe size={14}/> Architectural Philosophy</span>
          <div style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: '500', fontFamily: 'var(--font-heading)', marginTop: '16px', lineHeight: '1.4', fontStyle: 'italic' }}>{dailyQuote}</div>
        </div>
        <div className="bento-card stagger-item stagger-3" style={{ background: 'linear-gradient(135deg, rgba(255,190,11,0.05), rgba(0,0,0,0.8))', borderColor: 'rgba(255,190,11,0.2)' }}>
          <span className="text-subtitle" style={{color: 'var(--neon-gold)'}}><Activity size={14}/> System Status</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '600', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>NASA 68th Convention</div>
          <p className="type-body mt-2">Preparation is active. Live feed connected.</p>
        </div>
      </div>
      <div className="bento-grid-3">
        <div className="bento-card stagger-item stagger-4"><span className="text-subtitle text-white"><Users size={14}/> Members</span><div className="text-metric"><AnimatedCounter value={crewData.length} /></div></div>
        <div className="bento-card stagger-item stagger-4"><span className="text-subtitle text-white"><HardDrive size={14}/> Files</span><div className="text-metric"><AnimatedCounter value={vaultData.length} /></div></div>
        <div className="bento-card stagger-item stagger-4"><span className="text-subtitle text-white"><Radio size={14}/> News</span><div className="text-metric"><AnimatedCounter value={newsData.length} /></div></div>
      </div>
    </div>
  );

  const renderCrew = () => {
    const orderedYears = ['1', '2', '3', '4', '5', 'Alumni', 'Unassigned']; 
    const allocation = {};
    orderedYears.forEach(y => allocation[y] = []);
    crewData.forEach(u => { const y = u.year || 'Unassigned'; if (allocation[y]) allocation[y].push(u); else allocation['Unassigned'].push(u); });
    
    return (
      <div className="bento-container" style={getSectionStyle(1)}>
        <div className="stagger-item stagger-1" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Member List</span><h1 className="text-title">Unit Members</h1></div>
          <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Register Profile</button>
        </div>
        {orderedYears.map((year, idx) => {
          if (allocation[year].length === 0) return null;
          return (
            <div key={year} className={`stagger-item stagger-${Math.min((idx%3)+2, 4)}`} style={{ marginTop: '16px' }}>
              <span className="text-subtitle" style={{ padding: '0 16px', color: '#fff' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `YEAR ${year}`}</span>
              <div className="bento-grid-2" style={{ marginTop: '16px' }}>
                {allocation[year].map(m => {
                  const isCouncil = ['UD', 'USEC', 'Coordinator', 'EX USEC'].includes(m.role);
                  return (
                    <div key={m.id} className="bento-card" style={{ cursor: 'pointer', border: isCouncil ? '1px solid var(--neon-gold)' : '' }} onClick={() => setViewingCrew(m)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span className="status-pill">{isCouncil && <Crown size={12} style={{marginRight:4}}/>}{m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display:'flex', alignItems:'center', gap:'4px' }}><Eye size={12}/> Details</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="avatar" style={{ background: `${getHashColor(m.name)}20`, border: `1px solid ${getHashColor(m.name)}50`, color: getHashColor(m.name) }}>{m.name?m.name.charAt(0).toUpperCase():'?'}</div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div className="type-h2 text-truncate">{m.name}</div>
                          <div className="type-caption mt-1 text-truncate">{m.email}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderFunds = () => {
    const income = financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const expense = financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    const net = income - expense;
    const goal = Number(leadership.financialGoal) || 1; 

    return (
      <div className="bento-container" style={getSectionStyle(2)}>
        <div className="stagger-item stagger-1" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Financial Tracking</span><h1 className="text-title">Treasury</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'income' }); setModalMode('finances'); }}><Plus size={16}/> Add Record</button>}
        </div>
        <div className="bento-grid-2">
          <div className="bento-card stagger-item stagger-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'var(--neon-green)'}}>Gross Financial Position</span>
            <div style={{display:'flex', gap:'32px', marginTop:'10px'}}>
              <div><span className="type-mono-sm">INCOME</span><div className="type-metric text-[var(--neon-green)]">₹<AnimatedCounter value={income} /></div></div>
              <div><span className="type-mono-sm">EXPENSES</span><div className="type-metric text-[var(--neon-pink)]">₹<AnimatedCounter value={expense} /></div></div>
            </div>
          </div>
          <div className="bento-card stagger-item stagger-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle text-white"><Zap size={14}/> Current Funds</span>
            <div className="type-metric">₹<AnimatedCounter value={net} /></div>
            <div style={{ width: '100%', height: '4px', background: 'var(--color-chrome)', borderRadius: '2px', overflow: 'hidden', marginTop: '16px' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: '#fff' }}></div>
            </div>
          </div>
        </div>
        <div className="bento-card stagger-item stagger-4" style={{ padding: '0' }}>
          {financialLog.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-300)' }}>No financial records found.</div>
          ) : (
            <div>
              {[...financialLog].sort((a,b)=>b.timestamp-a.timestamp).map((f, i) => (
                <div key={f.id} className={`finance-row ${f.type}`} style={{ borderBottom: i===financialLog.length-1?'none':'' }}>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: '16px' }}>
                    <div className="type-h2 text-truncate" style={{ fontSize: '1.1rem' }}>{f.description}</div>
                    <div className="type-mono-sm mt-1">{f.timestamp ? new Date(f.timestamp).toLocaleDateString() : 'Date Unknown'}</div>
                  </div>
                  <div className="type-metric" style={{ fontSize: '1.2rem', color: f.type==='income' ? 'var(--neon-green)' : 'var(--neon-pink)', whiteSpace: 'nowrap' }}>
                    {f.type==='income'?'+':'-'}₹{Number(f.amount).toLocaleString()}
                  </div>
                  {isLeadershipMode && (
                    <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
                      <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setFormPayload(f); setModalMode('finances'); }}><Pencil size={14}/></button>
                      <button className="btn-icon danger" onClick={(e) => { e.stopPropagation(); handleDelete('finances', f.id); }}><Trash2 size={14}/></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderVault = () => {
    const filteredVault = vaultFilter === 'All' ? vaultData : vaultData.filter(v => v.category === vaultFilter);
    return (
      <div className="bento-container" style={getSectionStyle(3)}>
        <div className="stagger-item stagger-1" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Active Works</span><h1 className="text-title">Secure Vault</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'Document', category: 'Programs' }); setModalMode('vault'); }}><Plus size={16}/> Add File</button>}
        </div>
        <div className="stagger-item stagger-2" style={{ display: 'flex', gap: '8px', padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {['All', 'Trophies', 'Programs', 'Events', 'Meetings', 'Other'].map(cat => (
            <button key={cat} className={`filter-tab ${vaultFilter === cat ? 'active' : ''}`} onClick={() => setVaultFilter(cat)}>{cat}</button>
          ))}
        </div>
        <div className="bento-grid-3">
          {filteredVault.map((v, i) => (
            <div key={v.id} className={`bento-card stagger-item stagger-${Math.min((i%3)+2, 4)}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill"><HardDrive size={12}/> {v.category || 'File'}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {isLeadershipMode && <button className="btn-icon" title="Archive Work" onClick={(e) => { e.stopPropagation(); handleArchiveVaultItem(v); }}><Archive size={14}/></button>}
                  {isLeadershipMode && <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setFormPayload(v); setModalMode('vault'); }}><Pencil size={14}/></button>}
                  {isLeadershipMode && <button className="btn-icon danger" onClick={(e) => { e.stopPropagation(); handleDelete('vault', v.id); }}><Trash2 size={14}/></button>}
                </div>
              </div>
              <div className="type-h2" style={{ marginBottom: '24px' }}>{v.title}</div>
              <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ width: '100%', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>Open Link <ArrowUpRight size={14}/></a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGallery = () => {
    return (
      <div className="bento-container" style={getSectionStyle(4)}>
        <div className="stagger-item stagger-1" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Past Works</span><h1 className="text-title">Archive Gallery</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image' }); setModalMode('gallery'); }}><Plus size={16}/> Add Direct Image</button>}
        </div>
        <div className="bento-grid-2">
          {galleryData.map((g, i) => (
            <div key={g.id} className={`bento-card stagger-item stagger-${Math.min((i%3)+2, 4)}`} style={{ padding: 0 }}>
              {g.fileType === 'Archive' ? (
                <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="status-pill" style={{ borderColor: 'var(--neon-gold)', color: 'var(--neon-gold)' }}><Archive size={12}/> YEAR {g.archivedYear || '2026'}</span>
                    {isLeadershipMode && <button className="btn-icon danger" onClick={(e) => { e.stopPropagation(); handleDelete('gallery', g.id); }}><Trash2 size={14}/></button>}
                  </div>
                  <div className="type-h2">{g.title}</div>
                  <div className="type-caption mt-2" style={{ flex: 1 }}>{g.description}</div>
                  {g.link && <a href={g.link} target="_blank" rel="noreferrer" className="btn-primary btn-secondary mt-4">View Saved Data <ArrowUpRight size={14}/></a>}
                </div>
              ) : (
                <>
                  <div style={{ height: '200px', background: `url("${g.link}") center/cover` }}></div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span className="status-pill">{g.category}</span>
                      {isLeadershipMode && (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setFormPayload(g); setModalMode('gallery'); }}><Pencil size={14}/></button>
                          <button className="btn-icon danger" onClick={(e) => { e.stopPropagation(); handleDelete('gallery', g.id); }}><Trash2 size={14}/></button>
                        </div>
                      )}
                    </div>
                    <div className="type-h2">{g.title}</div>
                    <div className="type-caption mt-2">{g.description}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNews = () => {
    return (
      <div className="bento-container" style={{ maxWidth: '1400px', ...getSectionStyle(5) }}>
        <div className="stagger-item stagger-1" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Announcements</span><h1 className="text-title">News</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}><Plus size={16}/> Add Unit News</button>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="text-subtitle text-white stagger-item stagger-2"><Activity size={14}/> Unit Updates</span>
            {[...newsData].sort((a,b)=>b.timestamp-a.timestamp).map((n, i) => (
              <div key={n.id} className={`bento-card stagger-item stagger-${Math.min((i%3)+2, 4)}`} style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}>{n.tag || 'UPDATE'}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {/* 🌟 BROADCAST EMAIL BUTTON 🌟 */}
                    {isLeadershipMode && (
                      <button 
                        className="btn-icon" 
                        title="Broadcast via Email"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          const emails = crewData.map(c => c.email).filter(Boolean).join(',');
                          if(!emails) return alert('No emails found in directory.');
                          const subject = encodeURIComponent(`[RSA Unit ${leadership.unitCode} UPDATE] ${n.title}`);
                          const body = encodeURIComponent(`${n.content}\n\n--\nSent via RSA Command Center`);
                          window.location.href = `mailto:?bcc=${emails}&subject=${subject}&body=${body}`;
                        }}
                      >
                        <Mail size={14}/>
                      </button>
                    )}
                    {isLeadershipMode && <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setFormPayload(n); setModalMode('news'); }}><Pencil size={14}/></button>}
                    {isLeadershipMode && <button className="btn-icon danger" onClick={(e) => { e.stopPropagation(); handleDelete('news', n.id); }}><Trash2 size={14}/></button>}
                  </div>
                </div>
                <div className="type-h2" style={{ marginBottom: '12px' }}>{n.title}</div>
                <div className="type-body text-truncate" style={{ marginBottom: '20px' }}>{n.content}</div>
                <button className="btn-primary btn-secondary w-full" onClick={() => setViewingNews(n)}><BookOpen size={14}/> Read Full Story</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="text-subtitle text-[var(--neon-gold)] stagger-item stagger-2"><Globe size={14}/> Live NASA India Feed</span>
            <div className="bento-card stagger-item stagger-3" style={{ border: '1px solid rgba(255, 190, 11, 0.3)', padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[{ id: 'l1', tag: 'OFFICIAL UPDATE', title: '68th ANC Workshop Details Released', date: 'June 16, 2026', link: 'https://nasaindia.co' }, { id: 'l2', tag: 'DEADLINE', title: 'Louis I. Kahn Trophy Submission Window Closes Soon', date: 'June 20, 2026', link: 'https://nasaindia.co' }].map(live => (
                  <div key={live.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span className="status-pill" style={{ color: 'var(--neon-gold)', borderColor: 'rgba(255, 190, 11, 0.3)' }}>{live.tag}</span>
                      <span className="type-mono-sm">{live.date}</span>
                    </div>
                    <div className="type-h2" style={{ fontSize: '1.2rem' }}>{live.title}</div>
                    <a href={live.link} target="_blank" rel="noreferrer" className="btn-primary btn-secondary mt-4 w-fit inline-flex">Official Portal <ArrowUpRight size={14}/></a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUnitCouncil = () => {
    const councilMembers = crewData.filter(m => ['UD', 'USEC', 'Coordinator', 'EX USEC'].includes(m.role));
    return (
      <div className="bento-container" style={getSectionStyle(6)}>
        <div className="stagger-item stagger-1" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Administration Layer</span><h1 className="text-title">Executive Core</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Coordinator', year: '4' }); setModalMode('crew'); }}><Plus size={16}/> Add Executive</button>}
            {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Unit Info</button>}
          </div>
        </div>
        <div className="bento-card stagger-item stagger-2" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.15)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span className="type-label block mb-2 text-white">Unit Information</span>
              <div className="type-hero">Unit {leadership.unitCode}</div>
            </div>
            <div className="status-pill" style={{ textTransform: 'lowercase' }}><Globe size={12}/> {leadership.officialEmail}</div>
          </div>
        </div>
        <span className="text-subtitle text-[var(--neon-gold)] px-4 mt-4 stagger-item stagger-3"><Crown size={14}/> High Command Directory</span>
        <div className="bento-grid-2">
          {councilMembers.map((m, i) => (
            <div key={m.id} className={`bento-card stagger-item stagger-${Math.min((i%3)+2, 4)}`} style={{ border: '1px solid rgba(255, 190, 11, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="status-pill" style={{ color: 'var(--neon-gold)' }}>{m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}</span>
              </div>
              <div className="type-h2 mb-4">{m.name}</div>
              <button className="btn-primary btn-secondary w-full" onClick={() => setViewingCrew(m)}><Eye size={14}/> View Dossier</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRSAIntel = () => {
    return (
      <div className="bento-container" style={{ maxWidth: '1400px', ...getSectionStyle(7) }}>
        <div className="stagger-item stagger-1" style={{ padding: '0 16px' }}><span className="text-subtitle">AI Assistant</span><h1 className="text-title">RSA AI</h1></div>
        <div className="bento-card stagger-item stagger-2 mt-4" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <span className="text-subtitle text-white"><Cpu size={14}/> Chat with RSA AI</span>
          <div className="ai-terminal">
            <div id="ai-chat-box-container" className="ai-chat-box">
              {aiMessages.map((msg, idx) => (<div key={idx} className={`ai-msg ${msg.sender}`}>{msg.text}</div>))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleAiSubmit} className="ai-input-wrapper mt-4">
              <input className="input-field" style={{ padding: '12px 16px' }} placeholder="Ask architectural queries or NASA updates..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} />
              <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }}><Send size={18}/></button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* 3D BACKGROUND */}
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
      <div className={`boot-splash ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash-container">
          <div className={`circle-flow-1 ${splashState >= 1 ? 'show-circles' : ''}`}></div>
          <div className={`circle-flow-2 ${splashState >= 1 ? 'show-circles' : ''}`}></div>
          <div className={`circle-flow-3 ${splashState >= 1 ? 'show-circles' : ''}`}></div>
          <div className={`splash-brand ${splashState === 2 ? 'glitch-active' : ''}`}>RSA</div>
        </div>
      </div>

      {/* OVERLAY FOR SIDEBAR (Click outside to close) */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>

      <nav className="top-bar">
        <div className="pointer-events-auto">
          <div className="security-hud" onClick={handleSecurityToggle}>
            <div className={`hud-icon-box ${isLeadershipMode ? 'hud-unlocked' : 'hud-locked'}`}>
               {isLeadershipMode ? <Unlock size={14} strokeWidth={2.5}/> : <Lock size={14} strokeWidth={2.5}/>}
            </div>
            <div className="hud-text hidden sm:block">[ ADMIN: {isLeadershipMode ? 'ON' : 'OFF'} ]</div>
          </div>
        </div>
        
        {/* ANIMATRONIC SIDEBAR LOGO */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span className="type-label">EVENT</span><Calendar size={14}/></div>
            <div className="type-h2 mt-2" style={{ fontSize: '1.2rem' }}>68th Annual Convention</div>
            <div className="type-caption mt-2">Status: Preparation</div>
          </div>
          <div className="sidebar-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span className="type-label">TROPHIES</span><Shield size={14}/></div>
            <div className="type-h2 mt-2" style={{ fontSize: '1.2rem' }}>Louis I. Kahn Trophy</div>
            <div className="type-caption mt-2">Status: Open</div>
          </div>
          <div className="sidebar-section-title mt-8"><Zap size={14}/> Quick Links</div>
          <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: '600' }}>NASA Website</div><ArrowUpRight size={20} color="#fff"/>
            </div>
          </a>
        </div>
      </div>

      {/* DOCK */}
      <div className="floating-dock-wrapper">
        <div className="floating-dock" ref={dockRef}>
          {SECTIONS.map((sec, i) => (
            <div key={sec.id} className={`dock-item ${activeSectionIdx === i ? 'active' : ''}`} onClick={() => navTo(i)} style={activeSectionIdx===i ? { '--item-accent': sec.accent, color: sec.accent } : {}}>
              {sec.icon}
              <div className="dock-tooltip">{sec.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="kinetic-scroll-engine" ref={scrollEngineRef}>
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`} data-index="0">{renderDashboard()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`} data-index="1">{renderCrew()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`} data-index="2">{renderFunds()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 3 ? 'view-active' : ''}`} data-index="3">{renderVault()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 4 ? 'view-active' : ''}`} data-index="4">{renderGallery()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 5 ? 'view-active' : ''}`} data-index="5">{renderNews()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 6 ? 'view-active' : ''}`} data-index="6">{renderUnitCouncil()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 7 ? 'view-active' : ''}`} data-index="7">{renderRSAIntel()}</section>
      </div>

      {/* MODALS */}
      {viewingNews && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setViewingNews(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}>{viewingNews.tag || 'UPDATE'}</span>
              <button className="btn-icon" onClick={() => setViewingNews(null)}><X size={24}/></button>
            </div>
            <div className="type-h1 mb-6">{viewingNews.title}</div>
            <div className="type-body" style={{ whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.85)' }}>{viewingNews.content}</div>
          </div>
        </div>
      )}

      {viewingCrew && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setViewingCrew(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 className="type-h1">Member Details</h2>
              <button className="btn-icon" onClick={() => setViewingCrew(null)}><X size={24}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'32px' }}>
              <div><span className="type-label block mb-1">Name</span><div className="type-h2">{viewingCrew.name}</div></div>
              <div><span className="type-label block mb-1">Role</span><div className="status-pill" style={{color:'var(--neon-cyan)'}}>{viewingCrew.role}</div></div>
              {viewingCrew.coordinatorType && <div><span className="type-label block mb-1">Department</span><div className="type-body text-white">{viewingCrew.coordinatorType}</div></div>}
              <div><span className="type-label block mb-1">Year</span><div className="type-body text-white">{viewingCrew.year}</div></div>
              <div><span className="type-label block mb-1">Email</span><div className="type-mono-sm text-white">{viewingCrew.email}</div></div>
              {viewingCrew.phone && <div><span className="type-label block mb-1">Phone</span><div className="type-mono-sm text-white">{viewingCrew.phone}</div></div>}
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <a href={`mailto:${viewingCrew.email}`} className="btn-primary" style={{ flex: 1 }}><Mail size={16}/> Email</a>
                {viewingCrew.phone && <a href={`tel:${viewingCrew.phone}`} className="btn-primary" style={{ flex: 1 }}><Phone size={16}/> Call</a>}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {isLeadershipMode ? (
                <>
                  <button className="btn-primary btn-secondary" style={{flex: 1}} onClick={(e) => { e.stopPropagation(); setFormPayload(viewingCrew); setModalMode('crew'); }}><Pencil size={16}/> Edit</button>
                  <button className="btn-primary btn-secondary danger" style={{color:'var(--neon-pink)', borderColor:'rgba(255,0,85,0.3)'}} onClick={(e) => { e.stopPropagation(); handleDelete('crew', viewingCrew.id); }}><Trash2 size={16}/> Delete</button>
                </>
              ) : (
                <div className="type-caption"><Lock size={12} style={{display:'inline', marginBottom:'-2px'}}/> Only Admins can edit or delete.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT/ADD MODAL */}
      {modalMode && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setModalMode(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="type-h1">{formPayload.id ? 'Edit' : 'Add'} Data</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSaveToCloud}>
              
              {modalMode === 'crew' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div className="input-group">
                    <input required placeholder="Name" className="input-field" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                    <label className="input-label">Name</label>
                  </div>
                  <div className="input-group">
                    <input type="email" placeholder="Email" className="input-field" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                    <label className="input-label">Email</label>
                  </div>
                  <div className="input-group">
                    <input type="tel" placeholder="Phone Number" className="input-field" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                    <label className="input-label">Phone Number</label>
                  </div>
                  
                  <div>
                    <span className="type-label block mb-2">Role (Adds Executive to Council)</span>
                    <select required className="input-field" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                      <option value="" disabled>Select Role...</option>
                      <option value="Member">Student Member</option>
                      {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                      {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                      {isLeadershipMode && <option value="EX USEC">Ex-Unit Secretary (EX USEC)</option>}
                      {isLeadershipMode && <option value="Coordinator">Coordinator</option>}
                    </select>
                  </div>

                  {formPayload.role === 'Coordinator' && (
                    <div className="input-group">
                      <input required placeholder="Coordinator Type (e.g., Design, Events)" className="input-field" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} />
                      <label className="input-label">Coordinator Type</label>
                    </div>
                  )}

                  <div>
                    <span className="type-label block mb-2">Year</span>
                    <select className="input-field" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                      <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                    </select>
                  </div>
                </div>
              )}

              {modalMode === 'finances' && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div>
                    <span className="type-label block mb-2">Type</span>
                    <select className="input-field" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                      <option value="income">INCOME (+)</option>
                      <option value="expense">EXPENSE (-)</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <input required placeholder="What was this for?" className="input-field" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                    <label className="input-label">Description</label>
                  </div>
                  <div className="input-group">
                    <input required type="number" placeholder="Amount (INR)" className="input-field" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                    <label className="input-label">Amount (INR)</label>
                  </div>
                </div>
              )}

              {modalMode === 'hq' && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div className="input-group">
                    <input placeholder="Unit Code (e.g. Z649)" className="input-field" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                    <label className="input-label">Unit Code</label>
                  </div>
                  <div className="input-group">
                    <input placeholder="Official Email" className="input-field" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                    <label className="input-label">Official Email</label>
                  </div>
                  <div className="input-group">
                    <input type="number" placeholder="Goal Amount (INR)" className="input-field" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                    <label className="input-label">Goal Amount (INR)</label>
                  </div>
                </div>
              )}

              {modalMode === 'vault' && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div>
                    <span className="type-label block mb-2">Category</span>
                    <select className="input-field" value={formPayload.category||'Programs'} onChange={e=>setFormPayload({...formPayload, category:e.target.value})}>
                      <option value="Trophies">Trophies</option><option value="Programs">Programs</option><option value="Events">Events</option><option value="Meetings">Meetings</option><option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <input required placeholder="Title" className="input-field" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                    <label className="input-label">Title</label>
                  </div>
                  <div className="input-group">
                    <input placeholder="Link / URL" className="input-field" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                    <label className="input-label">Link URL</label>
                  </div>
                </div>
              )}

              {['gallery', 'news'].includes(modalMode) && isLeadershipMode && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div className="input-group">
                    <input required placeholder="Title" className="input-field" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                    <label className="input-label">Title</label>
                  </div>
                  {modalMode !== 'news' && (
                    <div className="input-group">
                      <input placeholder="Link / URL" className="input-field" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                      <label className="input-label">Link URL</label>
                    </div>
                  )}
                  <div className="input-group">
                    <textarea placeholder="Description..." className="input-field" rows="4" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
                    <label className="input-label">Description Payload</label>
                  </div>
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