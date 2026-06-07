import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import {
  Shield, ShieldAlert, Plus, Trash2, Users, TrendingUp,
  FolderLock, Image as ImageIcon, Radio, Settings, X,
  ArrowUpRight, LayoutDashboard, Component, Wallet,
  Archive, FileImage, Rss
} from 'lucide-react';

// ==========================================
// 1. FIREBASE CONFIGURATION
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
const ADMIN_SECURE_KEY = "RSA_Z649_SECURE_2026";

// ==========================================
// 2. ULTRA-PREMIUM CSS ENGINE (OBSIDIAN)
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Epilogue:wght@300;400;500;600;700&display=swap');

  :root {
    color-scheme: dark !important;
    --bg-void: #030305;
    --bg-base: #050507;
    --bg-surface-1: rgba(14, 14, 22, 0.65);
    --bg-surface-2: rgba(22, 22, 36, 0.45);
    --bg-elevated: rgba(40, 40, 60, 0.35);

    --text-primary: #f0f0f5;
    --text-secondary: #8b8fa3;
    --text-tertiary: #505468;

    --accent-primary: #7c6aff;
    --accent-secondary: #a78bfa;
    --accent-tertiary: #c084fc;
    --accent-glow: rgba(124, 106, 255, 0.25);
    --accent-primary-dim: rgba(124, 106, 255, 0.12);

    --border-subtle: rgba(255, 255, 255, 0.06);
    --border-medium: rgba(255, 255, 255, 0.10);

    --font-heading: 'Syne', sans-serif;
    --font-body: 'Epilogue', sans-serif;

    --ease-fluid: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

    --radius-card: 24px;
    --radius-pill: 100px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { user-select: none; }

  body, html {
    background: var(--bg-void);
    color: var(--text-primary);
    font-family: var(--font-body);
    overflow: hidden;
    height: 100dvh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }

  input, textarea, select {
    -webkit-user-select: auto; user-select: auto;
    color: var(--text-primary) !important;
    background: rgba(255,255,255,0.04) !important;
    outline: none;
    font-family: var(--font-body);
  }
  .selectable-text { -webkit-user-select: auto; user-select: auto; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 100px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.12); }

  /* 🌌 AMBIENT AURORA — Mesh & Orbs */
  .ambient-aurora {
    position: fixed; inset: 0; z-index: -3; pointer-events: none;
    background: var(--bg-void); overflow: hidden;
  }
  .ambient-aurora::before, .ambient-aurora::after {
    content: ''; position: absolute;
    border-radius: 50%; filter: blur(100px);
    will-change: transform;
  }
  .ambient-aurora::before {
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(124, 106, 255, 0.20) 0%, transparent 70%);
    top: -15%; left: -10%;
    animation: orbFloat1 25s infinite alternate var(--ease-out-expo);
  }
  .ambient-aurora::after {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    bottom: -10%; right: -15%;
    animation: orbFloat2 30s infinite alternate var(--ease-out-expo);
  }
  @keyframes orbFloat1 {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(80px, 60px) scale(1.1); }
    66%  { transform: translate(-40px, 120px) scale(0.95); }
    100% { transform: translate(60px, -40px) scale(1.05); }
  }
  @keyframes orbFloat2 {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(-70px, -50px) scale(1.15); }
    66%  { transform: translate(50px, -90px) scale(0.9); }
    100% { transform: translate(-60px, 30px) scale(1.1); }
  }

  .noise-overlay {
    position: fixed; inset: 0; z-index: -2; pointer-events: none; opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat; mix-blend-mode: overlay;
  }
  
  /* Vignette */
  .noise-overlay::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(3, 3, 5, 0.6) 100%);
  }

  /* 🎢 KINETIC SCROLL ENGINE */
  .kinetic-scroll-engine {
    height: 100vh; overflow-y: scroll;
    scroll-snap-type: y mandatory; scroll-behavior: smooth;
    scrollbar-width: none;
  }
  .kinetic-scroll-engine::-webkit-scrollbar { display: none; }

  .scrolling-section {
    min-height: 100vh; width: 100vw;
    scroll-snap-align: start; scroll-snap-stop: always;
    display: flex; align-items: center; justify-content: center;
    padding: 90px 32px 110px 32px;
    opacity: 0; transform: translateY(24px) scale(0.98);
    transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
  }
  .scrolling-section.view-active {
    opacity: 1; transform: translateY(0) scale(1);
  }

  /* 🧱 BENTO SYSTEM */
  .bento-container {
    width: 100%; max-width: 1200px;
    height: auto; max-height: 85vh; overflow-y: auto;
    scrollbar-width: none;
    display: flex; flex-direction: column; gap: 28px;
    padding-bottom: 24px;
  }
  .bento-container::-webkit-scrollbar { display: none; }

  .bento-card {
    background: var(--bg-surface-1);
    backdrop-filter: blur(24px) saturate(1.2); -webkit-backdrop-filter: blur(24px) saturate(1.2);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-card); padding: 32px;
    transition: all 0.45s var(--ease-out-expo);
    position: relative; overflow: hidden; word-wrap: break-word;
  }
  /* Shimmer gradient border on hover */
  .bento-card::before {
    content: ''; position: absolute; inset: 0;
    border-radius: inherit; padding: 1px;
    background: linear-gradient(135deg, transparent 0%, rgba(124, 106, 255, 0.0) 40%, rgba(124, 106, 255, 0.0) 60%, transparent 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
    transition: all 0.5s var(--ease-out-expo);
  }
  .bento-card:hover {
    background: var(--bg-elevated);
    border-color: var(--border-medium);
    transform: translateY(-2px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(124,106,255,0.08);
  }
  .bento-card:hover::before {
    background: linear-gradient(135deg, transparent 0%, rgba(124, 106, 255, 0.3) 30%, rgba(167, 139, 250, 0.2) 70%, transparent 100%);
  }

  .bento-grid-2 {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;
  }
  .bento-grid-3 {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;
  }

  /* ✍️ TYPOGRAPHY */
  .text-title {
    font-family: var(--font-heading); font-weight: 700;
    font-size: clamp(2rem, 5vw, 3rem);
    letter-spacing: -0.03em; line-height: 1.1;
    color: var(--text-primary);
  }
  .text-subtitle {
    font-family: var(--font-body); font-weight: 600;
    font-size: 0.7rem; letter-spacing: 0.12em;
    color: var(--text-secondary); text-transform: uppercase;
    margin-bottom: 10px; display: block;
  }
  .text-metric {
    font-family: var(--font-heading); font-weight: 700;
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    letter-spacing: -0.04em; line-height: 1;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .text-body {
    font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;
  }

  /* 🔘 BUTTONS */
  .btn-primary {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: #fff; border: none;
    padding: 12px 24px; border-radius: var(--radius-pill);
    font-family: var(--font-body); font-weight: 600; font-size: 0.8rem;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.3s var(--ease-out-expo);
    box-shadow: 0 4px 16px var(--accent-glow);
    letter-spacing: 0.02em;
  }
  .btn-primary:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 6px 24px rgba(124, 106, 255, 0.35);
  }
  .btn-primary:active { transform: translateY(0) scale(0.98); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  .btn-secondary {
    background: var(--bg-surface-2) !important; color: var(--text-primary) !important;
    border: 1px solid var(--border-subtle) !important;
    box-shadow: none !important;
  }
  .btn-secondary:hover {
    background: var(--bg-elevated) !important;
    border-color: var(--border-medium) !important;
    transform: translateY(-1px);
  }

  .btn-icon {
    background: transparent; color: var(--text-secondary); border: none;
    cursor: pointer; padding: 8px; border-radius: 12px;
    transition: all 0.2s var(--ease-out-expo);
    display: flex; align-items: center; justify-content: center;
  }
  .btn-icon:hover { color: var(--text-primary); background: rgba(255,255,255,0.06); }
  .btn-icon.danger:hover { color: #f87171; background: rgba(248, 113, 113, 0.12); }

  .status-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: var(--radius-pill);
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--accent-primary-dim); color: var(--accent-primary);
    border: 1px solid rgba(124, 106, 255, 0.15);
  }

  /* 🚀 FLOATING DOCK */
  .floating-dock {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: rgba(12, 12, 18, 0.7);
    backdrop-filter: blur(40px) saturate(1.5);
    -webkit-backdrop-filter: blur(40px) saturate(1.5);
    border: 1px solid var(--border-subtle); border-radius: var(--radius-pill);
    display: flex; gap: 4px; padding: 8px; z-index: 100;
    box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset;
  }
  .dock-item {
    width: 46px; height: 46px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-tertiary); cursor: pointer;
    transition: all 0.35s var(--ease-out-expo); position: relative;
  }
  .dock-item:hover {
    color: var(--text-primary);
    transform: translateY(-6px) scale(1.15);
  }
  .dock-item.active {
    color: #050507;
    background: var(--accent-primary);
    box-shadow: 0 4px 20px var(--accent-glow);
    transform: translateY(-2px);
  }
  .dock-item.active:hover { transform: translateY(-6px) scale(1.15); }
  .dock-item.active::after {
    content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%; background: var(--accent-primary);
    box-shadow: 0 0 8px var(--accent-primary);
  }

  /* Dock Tooltip */
  .dock-tooltip {
    position: absolute; top: -42px; left: 50%; transform: translateX(-50%) translateY(4px);
    background: rgba(10, 10, 16, 0.9);
    backdrop-filter: blur(12px);
    padding: 6px 14px; border-radius: 8px;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    border: 1px solid var(--border-subtle);
    opacity: 0; pointer-events: none;
    transition: all 0.25s var(--ease-out-expo); white-space: nowrap;
    color: var(--text-primary);
  }
  .dock-item:hover .dock-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* 🔝 TOP BAR */
  .top-bar {
    position: fixed; top: 0; left: 0; right: 0;
    padding: 20px 32px;
    display: flex; justify-content: space-between; align-items: center;
    z-index: 90;
    background: linear-gradient(180deg, rgba(5,5,7,0.8) 0%, transparent 100%);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }
  .logo-text {
    font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700;
    letter-spacing: 0.08em; color: var(--text-primary);
    display: flex; align-items: center; gap: 10px; text-transform: uppercase;
  }
  .logo-text::before {
    content: ''; display: block; width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent-primary); box-shadow: 0 0 12px var(--accent-glow);
    animation: logoPulse 3s infinite ease-in-out;
  }
  @keyframes logoPulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  /* 📝 FORM ELEMENTS */
  .input-element {
    width: 100%; border: 1px solid var(--border-subtle);
    padding: 14px 16px; border-radius: 12px;
    font-family: var(--font-body); font-size: 0.9rem;
    margin-bottom: 16px;
    transition: all 0.3s var(--ease-out-expo);
    color: var(--text-primary);
  }
  .input-element::placeholder { color: var(--text-tertiary); }
  .input-element:focus {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-primary-dim), 0 0 20px rgba(124,106,255,0.08);
    background: rgba(255,255,255,0.04) !important;
  }

  /* 💬 MODALS */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(3, 3, 5, 0.75);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: modalBgIn 0.35s var(--ease-out-expo);
  }
  @keyframes modalBgIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-window {
    background: rgba(10, 10, 16, 0.95);
    backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    border: 1px solid var(--border-subtle);
    width: 100%; max-width: 520px; max-height: 85vh; overflow-y: auto;
    border-radius: 24px; padding: 48px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset;
    animation: modalSlideIn 0.4s var(--ease-out-expo);
    scrollbar-width: none;
  }
  .modal-window::-webkit-scrollbar { display: none; }
  @keyframes modalSlideIn {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* 🎬 CINEMATIC SPLASH */
  .splash-overlay {
    position: fixed; inset: 0; z-index: 999999;
    background: var(--bg-void);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px;
    transition: opacity 1.2s var(--ease-out-expo), visibility 1.2s;
  }
  .splash-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

  .splash-logo {
    color: var(--text-primary); font-family: var(--font-heading);
    font-size: 2.2rem; font-weight: 700; letter-spacing: 0.3em;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    animation: cinematicReveal 3s 0.3s var(--ease-out-expo) forwards;
  }
  .splash-bar {
    width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
    opacity: 0;
    animation: splashLine 3s 0.15s var(--ease-out-expo) forwards;
  }
  .splash-bar-fill { display: none; }
  
  @keyframes cinematicReveal {
    0%   { opacity: 0; transform: translateY(12px); letter-spacing: 0.5em; filter: blur(8px); }
    25%  { opacity: 1; transform: translateY(0); letter-spacing: 0.3em; filter: blur(0); }
    65%  { opacity: 1; }
    100% { opacity: 0; filter: blur(6px); }
  }
  @keyframes splashLine {
    0%   { opacity: 0; width: 0; }
    20%  { opacity: 0.6; width: 60px; }
    65%  { opacity: 0.6; }
    100% { opacity: 0; width: 100px; }
  }

  /* 📱 RESPONSIVE */
  @media (max-width: 768px) {
    .scrolling-section { padding: 76px 16px 100px 16px; align-items: flex-start; }
    .bento-container { max-height: calc(100vh - 160px); gap: 16px; }
    .bento-card { padding: 24px; border-radius: 20px; }
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; gap: 16px; }
    .text-title { font-size: 1.8rem; }
    .text-metric { font-size: 2.5rem; }
    .top-bar { padding: 16px 20px; }
    .floating-dock {
      bottom: 16px; width: calc(100% - 32px); max-width: 420px;
      justify-content: space-between; padding: 6px 12px; border-radius: 20px;
    }
    .dock-item { width: 40px; height: 40px; }
    .dock-tooltip { display: none; }
    .modal-window {
      padding: 24px; border-radius: 20px 20px 0 0; max-width: 100%;
      position: absolute; bottom: 0; left: 0; right: 0; max-height: 90vh;
      animation: modalSlideUpMobile 0.4s var(--ease-out-expo);
    }
    @keyframes modalSlideUpMobile {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
  }
  @media (max-width: 480px) {
    .text-title { font-size: 1.5rem; }
    .text-metric { font-size: 2rem; }
    .bento-card { padding: 20px; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Data States
  const [leadership, setLeadership] = useState({ unitCode: "Z649", udName: "", udEmail: "", officialEmail: "z649@nasaindia.co.in" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [campaignData, setCampaignData] = useState([]);

  // Modal State
  const [modalMode, setModalMode] = useState(null);
  const [formPayload, setFormPayload] = useState({});
  const scrollEngineRef = useRef(null);

  const dockItems = [
    { id: 'core', icon: <LayoutDashboard size={20} strokeWidth={1.5} />, label: 'Dashboard' },
    { id: 'crew', icon: <Users size={20} strokeWidth={1.5} />, label: 'Personnel' },
    { id: 'funds', icon: <Wallet size={20} strokeWidth={1.5} />, label: 'Finances' },
    { id: 'vault', icon: <Archive size={20} strokeWidth={1.5} />, label: 'Vault' },
    { id: 'gallery', icon: <FileImage size={20} strokeWidth={1.5} />, label: 'Gallery' },
    { id: 'news', icon: <Rss size={20} strokeWidth={1.5} />, label: 'Broadcasts' },
    { id: 'hq', icon: <Settings size={20} strokeWidth={1.5} />, label: 'Settings' }
  ];

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 2500);

    const unsubs = [
      onSnapshot(doc(db, "unit", "hq"), d => d.exists() && setLeadership(d.data())),
      onSnapshot(collection(db, "crew"), s => setCrewData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "finances"), s => setFinancialLog(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "vault"), s => setVaultData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "gallery"), s => setGalleryData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "news"), s => setNewsData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "campaigns"), s => setCampaignData(s.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];
    return () => unsubs.forEach(unsub => unsub());
  }, []);

  const handleEngineScroll = () => {
    if (!scrollEngineRef.current) return;
    const calculateIndex = Math.round(scrollEngineRef.current.scrollTop / window.innerHeight);
    if (calculateIndex !== activeSectionIdx) setActiveSectionIdx(calculateIndex);
  };

  const executeEngineNavigation = (targetIndex) => {
    if (!scrollEngineRef.current) return;
    scrollEngineRef.current.scrollTo({ top: targetIndex * window.innerHeight, behavior: 'smooth' });
    setActiveSectionIdx(targetIndex);
  };

  const challengeAdminAuthorization = () => {
    if (isLeadershipMode) setIsLeadershipMode(false);
    else {
      const entryToken = prompt("Enter Administrative Credential:");
      if (entryToken === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else if (entryToken) alert("Authentication Failed.");
    }
  };

  // -------------------------
  // DATABASE OPERATIONS
  // -------------------------
  const handleSaveToCloud = async (collectionName) => {
    try {
      if (collectionName === 'hq') await setDoc(doc(db, "unit", "hq"), formPayload);
      else if (formPayload.id) {
        const { id, ...data } = formPayload;
        await updateDoc(doc(db, collectionName, id), data);
      } else await addDoc(collection(db, collectionName), { ...formPayload, timestamp: Date.now() });
      setModalMode(null); setFormPayload({});
    } catch (e) { alert("Data Sync Failed."); }
  };

  const removeDocumentRecord = async (targetCollection, docId) => {
    if (window.confirm("Permanently delete this record?")) await deleteDoc(doc(db, targetCollection, docId));
  };

  const executeBatchPromotionSequence = async () => {
    if (!window.confirm("Advance all academic tiers? (5th Years transition to Alumni)")) return;
    try {
      const operationBatch = writeBatch(db);
      crewData.forEach((member) => {
        let advancedYear = member.year;
        if (Number(member.year) >= 1 && Number(member.year) < 5) advancedYear = Number(member.year) + 1;
        else if (Number(member.year) === 5 || member.year === "5") advancedYear = "Alumni";
        if (advancedYear !== member.year) operationBatch.update(doc(db, 'crew', member.id), { year: advancedYear });
      });
      await operationBatch.commit();
      alert("Academic Tiers Advanced Successfully.");
    } catch (err) { alert("Batch processing failed."); }
  };

  const handleSaveAndEmail = async (collectionName) => {
    setIsSendingEmail(true);
    await handleSaveToCloud(collectionName);
    const emailList = crewData.map(d => d.email).filter(e => e && e.includes('@')).join(',');
    if (emailList) {
      const templateParams = {
        subject: `[UNIT ${leadership.unitCode}] ${formPayload.title || 'Update'}`,
        message: `${formPayload.content || formPayload.prize}\n\nVia RSA Unit Command`,
        to_email: leadership.officialEmail, email: leadership.officialEmail, bcc_list: emailList
      };
      try { await emailjs.send('service_2007', 'template_a63y975', templateParams, 'PE32og5tBpVl8pzhT'); alert("Broadcast Deployed."); }
      catch (e) { alert("Saved, but email routing failed."); }
    }
    setIsSendingEmail(false);
  };

  // -------------------------
  // PRO RENDER BLOCKS
  // -------------------------
  const renderDashboard = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px' }}>
        <span className="text-subtitle">Overview</span>
        <h1 className="text-title">Command Center</h1>
      </div>

      <div className="bento-grid-3">
        <div className="bento-card">
          <span className="text-subtitle">Active Personnel</span>
          <div className="text-metric">{crewData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle">Net Capital</span>
          <div className="text-metric">₹{financialLog.filter(f => f.type === 'income').reduce((a, b) => a + Number(b.amount), 0) - financialLog.filter(f => f.type === 'expense').reduce((a, b) => a + Number(b.amount), 0)}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle">Vault Assets</span>
          <div className="text-metric">{vaultData.length}</div>
        </div>
      </div>

      <div className="bento-card" style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <span className="text-subtitle" style={{ margin: 0 }}>Active Campaigns</span>
          {isLeadershipMode && <button className="btn-primary btn-secondary" style={{ padding: '8px 16px', fontSize: '0.75rem' }} onClick={() => openModal('campaigns')}><Plus size={14} /> Sync</button>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {campaignData.length === 0 && <div className="text-body">No campaigns actively tracked.</div>}
          {campaignData.map(c => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)' }}>{c.title} <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>({c.year})</span></div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Prize Pool: {c.prize}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="status-pill" style={{ background: c.abstractsClosed === 'true' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)' }}>
                  {c.abstractsClosed === 'true' ? 'Closed' : 'Active'}
                </span>
                {isLeadershipMode && <button className="btn-icon danger" onClick={() => removeDocumentRecord('campaigns', c.id)}><Trash2 size={16} /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCrew = () => {
    const allocation = crewData.reduce((acc, u) => { const y = u.year || "Unassigned"; if (!acc[y]) acc[y] = []; acc[y].push(u); return acc; }, {});
    const sortedYears = Object.keys(allocation).sort((a, b) => (a === "Alumni" || a === "Unassigned" ? 1 : b === "Alumni" || b === "Unassigned" ? -1 : Number(a) - Number(b)));

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Database</span><h1 className="text-title">Unit Crew</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={executeBatchPromotionSequence}>Advance Tiers</button>}
            <button className="btn-primary" onClick={() => { setFormPayload({ year: '1' }); setModalMode('crew'); }}><Plus size={16} /> Add Member</button>
          </div>
        </div>

        {sortedYears.map(year => (
          <div key={year} style={{ marginTop: '24px' }}>
            <span className="text-subtitle" style={{ padding: '0 16px', color: 'var(--text-primary)' }}>
              {year === 'Alumni' || year === 'Unassigned' ? year : `Year ${year}`}
            </span>
            <div className="bento-grid-2" style={{ marginTop: '16px' }}>
              {allocation[year].map(m => (
                <div key={m.id} className="bento-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <span className="status-pill">{m.role}</span>
                    {isLeadershipMode && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-icon" onClick={() => openModal('crew', m)}><Settings size={14} /></button>
                        <button className="btn-icon danger" onClick={() => removeDocumentRecord('crew', m.id)}><Trash2 size={14} /></button>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>{m.name}</div>
                  <div className="text-body" style={{ fontSize: '0.85rem' }}>{m.email}</div>
                  {m.skills && <div className="text-body" style={{ marginTop: '24px', fontSize: '0.85rem', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-primary)' }}>Proficiencies:</span> {m.skills}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFunds = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Financial</span><h1 className="text-title">Treasury</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'expense' }); setModalMode('finances'); }}><Plus size={16} /> Record Entry</button>}
      </div>

      <div className="bento-card" style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {financialLog.length === 0 && <div className="text-body">No financial records found.</div>}
          {financialLog.map(f => (
            <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <span className="status-pill" style={{ marginBottom: '12px' }}>{f.type}</span>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{f.description}</div>
                <div className="text-body" style={{ fontSize: '0.85rem', marginTop: '4px' }}>{f.date || 'Unspecified Date'}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: f.type === 'income' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {f.type === 'income' ? '+' : '-'}₹{Number(f.amount).toLocaleString()}
                </div>
                {isLeadershipMode && <button className="btn-icon danger" onClick={() => removeDocumentRecord('finances', f.id)}><X size={16} /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVault = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Storage</span><h1 className="text-title">Knowledge Vault</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'Design' }); setModalMode('vault'); }}><Plus size={16} /> Upload Asset</button>}
      </div>
      <div className="bento-grid-3" style={{ marginTop: '16px' }}>
        {vaultData.map(v => (
          <div key={v.id} className="bento-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span className="status-pill">{v.type} | {v.year}</span>
              {isLeadershipMode && <button className="btn-icon danger" style={{ margin: '-6px' }} onClick={() => removeDocumentRecord('vault', v.id)}><Trash2 size={14} /></button>}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{v.title}</div>
            <div className="text-body" style={{ fontSize: '0.85rem', marginTop: '4px', marginBottom: '32px' }}>{v.size}</div>
            <a href={v.link || '#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>Access File <ArrowUpRight size={16} /></a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Showcase</span><h1 className="text-title">Portfolio</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image' }); setModalMode('gallery'); }}><ImageIcon size={16} /> Add Project</button>}
      </div>
      <div className="bento-grid-2" style={{ marginTop: '16px' }}>
        {galleryData.map(g => (
          <div key={g.id} className="bento-card" style={{ padding: 0 }}>
            <div style={{ height: '200px', background: g.fileType === 'Image' ? `url(${g.link}) center/cover` : 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {g.fileType !== 'Image' && <Component size={32} color="var(--text-tertiary)" />}
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill">{g.category}</span>
                {isLeadershipMode && <button className="btn-icon danger" style={{ margin: '-6px' }} onClick={() => removeDocumentRecord('gallery', g.id)}><Trash2 size={14} /></button>}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{g.title}</div>
              <div className="text-body" style={{ marginTop: '8px', marginBottom: '24px' }}>{g.description}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                <div className="text-subtitle" style={{ margin: 0 }}>By: {g.authorName}</div>
                {g.link && <a href={g.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>View <ArrowUpRight size={14} /></a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Communications</span><h1 className="text-title">Broadcasts</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}><Radio size={16} /> New Broadcast</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
        {newsData.sort((a, b) => b.timestamp - a.timestamp).map(n => (
          <div key={n.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span className="status-pill">{n.tag}</span>
              {isLeadershipMode && <button className="btn-icon danger" style={{ margin: '-6px' }} onClick={() => removeDocumentRecord('news', n.id)}><Trash2 size={16} /></button>}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>{n.title}</div>
            <div className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{n.content}</div>
            <div className="text-subtitle" style={{ marginTop: '32px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', marginBottom: 0 }}>
              Published: {new Date(n.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHQ = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Administration</span><h1 className="text-title">Unit HQ</h1></div>
        {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16} /> Configure</button>}
      </div>

      <div className="bento-card" style={{ marginTop: '16px' }}>
        <span className="text-subtitle">Official Institution Identifier</span>
        <div style={{ fontSize: '2.5rem', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', margin: '8px 0 24px 0' }}>Unit {leadership.unitCode}</div>
        <span className="text-subtitle">Authorized Comm Channel</span>
        <div className="text-body">{leadership.officialEmail}</div>
      </div>

      <div className="bento-grid-2">
        <div className="bento-card">
          <span className="status-pill" style={{ marginBottom: '24px' }}>Unit Designee (UD)</span>
          <div style={{ fontSize: '1.75rem', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{leadership.udName || 'Pending Assignment'}</div>
          <div className="text-body" style={{ marginTop: '16px' }}>{leadership.udPhone || 'No contact provided'}</div>
          <div className="text-body">{leadership.udEmail || 'No email provided'}</div>
        </div>
        <div className="bento-card">
          <span className="status-pill" style={{ marginBottom: '24px' }}>Unit Secretary (USEC)</span>
          <div style={{ fontSize: '1.75rem', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{leadership.useName || 'Pending Assignment'}</div>
          <div className="text-body" style={{ marginTop: '16px' }}>{leadership.usePhone || 'No contact provided'}</div>
          <div className="text-body">{leadership.useEmail || 'No email provided'}</div>
        </div>
      </div>
    </div>
  );

  const openModal = (mode, data = {}) => {
    setFormPayload(data);
    setModalMode(mode);
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {/* BACKGROUND ELEMENTS */}
      <div className="ambient-aurora"></div>
      <div className="noise-overlay"></div>

      {/* CINEMATIC SPLASH SCREEN */}
      <div className={`splash-overlay ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash-logo">UNIT Z649</div>
        <div className="splash-bar"><div className="splash-bar-fill"></div></div>
      </div>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="logo-text">RSA</div>
        <button className="btn-icon" onClick={challengeAdminAuthorization}>
          {isLeadershipMode ? <Shield size={20} color="var(--text-primary)" /> : <ShieldAlert size={20} color="var(--text-secondary)" />}
        </button>
      </div>

      {/* MAC-STYLE FLOATING DOCK */}
      <div className="floating-dock">
        {dockItems.map((item, i) => (
          <div key={item.id} className={`dock-item ${activeSectionIdx === i ? 'active' : ''}`} onClick={() => executeEngineNavigation(i)}>
            {item.icon}
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}
      </div>

      {/* MAIN KINETIC SCROLL ENGINE */}
      <div className="kinetic-scroll-engine" ref={scrollEngineRef} onScroll={handleEngineScroll}>
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`}>{renderDashboard()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`}>{renderCrew()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`}>{renderFunds()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 3 ? 'view-active' : ''}`}>{renderVault()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 4 ? 'view-active' : ''}`}>{renderGallery()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 5 ? 'view-active' : ''}`}>{renderNews()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 6 ? 'view-active' : ''}`}>{renderHQ()}</section>
      </div>

      {/* MODALS */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="text-title" style={{ fontSize: '1.5rem' }}>{formPayload.id ? 'Edit' : 'New'} Record</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={20} /></button>
            </div>

            <form onSubmit={(e) => { e.preventDefault();['news', 'campaigns'].includes(modalMode) ? handleSaveAndEmail(modalMode) : handleSaveToCloud(modalMode); }}>

              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Full Name" className="input-element" value={formPayload.name || ''} onChange={e => setFormPayload({ ...formPayload, name: e.target.value })} />
                  <input placeholder="Role (e.g., Delegate)" className="input-element" value={formPayload.role || ''} onChange={e => setFormPayload({ ...formPayload, role: e.target.value })} />
                  <input type="email" placeholder="Email Address" className="input-element" value={formPayload.email || ''} onChange={e => setFormPayload({ ...formPayload, email: e.target.value })} />
                  <input type="tel" placeholder="Phone Number" className="input-element" value={formPayload.phone || ''} onChange={e => setFormPayload({ ...formPayload, phone: e.target.value })} />
                  <input placeholder="Proficiencies (Comma separated)" className="input-element" value={formPayload.skills || ''} onChange={e => setFormPayload({ ...formPayload, skills: e.target.value })} />
                  <span className="text-subtitle">Academic Year</span>
                  <select className="input-element" value={formPayload.year || '1'} onChange={e => setFormPayload({ ...formPayload, year: e.target.value })}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <input required placeholder="Transaction Description" className="input-element" value={formPayload.description || ''} onChange={e => setFormPayload({ ...formPayload, description: e.target.value })} />
                  <input required type="number" placeholder="Amount (INR)" className="input-element" value={formPayload.amount || ''} onChange={e => setFormPayload({ ...formPayload, amount: e.target.value })} />
                  <select className="input-element" value={formPayload.type || 'expense'} onChange={e => setFormPayload({ ...formPayload, type: e.target.value })}>
                    <option value="expense">Expense Deduction</option><option value="income">Income Addition</option>
                  </select>
                </>
              )}

              {modalMode === 'vault' && (
                <>
                  <input required placeholder="Document Title" className="input-element" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                  <input placeholder="File Size (e.g. 45MB)" className="input-element" value={formPayload.size || ''} onChange={e => setFormPayload({ ...formPayload, size: e.target.value })} />
                  <input placeholder="Storage URL Link" className="input-element" value={formPayload.link || ''} onChange={e => setFormPayload({ ...formPayload, link: e.target.value })} />
                  <select className="input-element" value={formPayload.type || 'Design'} onChange={e => setFormPayload({ ...formPayload, type: e.target.value })}>
                    <option value="Design">Design Asset</option><option value="Finance">Financial Document</option><option value="Admin">Administrative</option>
                  </select>
                </>
              )}

              {modalMode === 'gallery' && (
                <>
                  <input required placeholder="Project Title" className="input-element" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                  <input placeholder="Author / Creator" className="input-element" value={formPayload.authorName || ''} onChange={e => setFormPayload({ ...formPayload, authorName: e.target.value })} />
                  <input placeholder="Category (e.g. Documentation)" className="input-element" value={formPayload.category || ''} onChange={e => setFormPayload({ ...formPayload, category: e.target.value })} />
                  <select className="input-element" value={formPayload.fileType || 'Drive Link'} onChange={e => setFormPayload({ ...formPayload, fileType: e.target.value })}>
                    <option value="Drive Link">Drive Folder</option><option value="Image">Direct Image URL</option><option value="PDF">PDF Link</option>
                  </select>
                  <input placeholder="Asset URL" className="input-element" value={formPayload.link || ''} onChange={e => setFormPayload({ ...formPayload, link: e.target.value })} />
                  <textarea placeholder="Project Description" className="input-element" rows="3" value={formPayload.description || ''} onChange={e => setFormPayload({ ...formPayload, description: e.target.value })}></textarea>
                </>
              )}

              {modalMode === 'news' && (
                <>
                  <input required placeholder="Category Tag" className="input-element" value={formPayload.tag || ''} onChange={e => setFormPayload({ ...formPayload, tag: e.target.value })} />
                  <input required placeholder="Subject / Headline" className="input-element" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                  <textarea rows="5" placeholder="Broadcast Message Body..." className="input-element" value={formPayload.content || ''} onChange={e => setFormPayload({ ...formPayload, content: e.target.value })}></textarea>
                </>
              )}

              {modalMode === 'campaigns' && (
                <>
                  <input required placeholder="Campaign / Trophy Name" className="input-element" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                  <input placeholder="Year Context" className="input-element" value={formPayload.year || ''} onChange={e => setFormPayload({ ...formPayload, year: e.target.value })} />
                  <input placeholder="Prize Pool" className="input-element" value={formPayload.prize || ''} onChange={e => setFormPayload({ ...formPayload, prize: e.target.value })} />
                  <select className="input-element" value={formPayload.abstractsClosed || 'false'} onChange={e => setFormPayload({ ...formPayload, abstractsClosed: e.target.value })}>
                    <option value="false">Status: Active</option><option value="true">Status: Closed</option>
                  </select>
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <span className="text-subtitle">Unit Profile</span>
                  <input placeholder="Unit Code (Z649)" className="input-element" value={formPayload.unitCode || ''} onChange={e => setFormPayload({ ...formPayload, unitCode: e.target.value })} />
                  <input placeholder="Official Email" className="input-element" value={formPayload.officialEmail || ''} onChange={e => setFormPayload({ ...formPayload, officialEmail: e.target.value })} />
                  <span className="text-subtitle" style={{ marginTop: '16px' }}>Unit Designee</span>
                  <input placeholder="UD Name" className="input-element" value={formPayload.udName || ''} onChange={e => setFormPayload({ ...formPayload, udName: e.target.value })} />
                  <input placeholder="UD Phone" className="input-element" value={formPayload.udPhone || ''} onChange={e => setFormPayload({ ...formPayload, udPhone: e.target.value })} />
                  <input placeholder="UD Email" className="input-element" value={formPayload.udEmail || ''} onChange={e => setFormPayload({ ...formPayload, udEmail: e.target.value })} />
                  <span className="text-subtitle" style={{ marginTop: '16px' }}>Unit Secretary</span>
                  <input placeholder="USEC Name" className="input-element" value={formPayload.useName || ''} onChange={e => setFormPayload({ ...formPayload, useName: e.target.value })} />
                  <input placeholder="USEC Phone" className="input-element" value={formPayload.usePhone || ''} onChange={e => setFormPayload({ ...formPayload, usePhone: e.target.value })} />
                  <input placeholder="USEC Email" className="input-element" value={formPayload.useEmail || ''} onChange={e => setFormPayload({ ...formPayload, useEmail: e.target.value })} />
                </>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '24px', padding: '16px' }} disabled={isSendingEmail}>
                {isSendingEmail ? 'Processing...' : 'Save Configuration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}