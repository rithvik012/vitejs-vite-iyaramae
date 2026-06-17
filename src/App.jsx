import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { 
  Shield, Plus, Trash2, UsersRound, CircleDollarSign, 
  Server, Aperture, Settings, X, ArrowUpRight, Mail, Phone,
  Globe, Activity, Crown, BrainCircuit, Send, CalendarClock,
  Hexagon, Fingerprint, Zap, Lock, Unlock, Pencil, Eye, FolderArchive,
  HardDrive, RadioTower, TrendingUp, TrendingDown, BookOpen
} from 'lucide-react';

// ==========================================
// FIREBASE DATABASE
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

// Architectural Quotes Engine
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
// DESIGN SYSTEM STYLES
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');

  :root {
    --bg-base: #030303;
    --glass-bg: rgba(10, 10, 10, 0.7);
    --glass-border: rgba(255, 255, 255, 0.08);
    --text-primary: #ffffff;
    --text-secondary: #8b9bb4;
    --neon-cyan: #00f0ff;
    --neon-purple: #7000ff;
    --neon-gold: #ffbe0b;
    --neon-pink: #ff0055;
    --neon-green: #00ff66;
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-ui: 'Outfit', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
  body, html { background-color: var(--bg-base); color: var(--text-primary); font-family: var(--font-body); overflow: hidden; height: 100dvh; width: 100vw; -webkit-font-smoothing: antialiased; }
  input, textarea, select { user-select: auto; color: #fff !important; background-color: rgba(255,255,255,0.03) !important; outline: none; border: 1px solid var(--glass-border); border-radius: 12px; padding: 16px; transition: all 0.3s; font-family: var(--font-body); width: 100%; }
  input:focus, textarea:focus, select:focus { border-color: var(--neon-cyan); box-shadow: 0 0 20px rgba(0, 240, 255, 0.15); background: rgba(0,0,0,0.8) !important; }
  ::-webkit-scrollbar { width: 0px; }

  /* BACKGROUND */
  .animatronic-bg { position: fixed; inset: 0; z-index: -5; background: var(--bg-base); overflow: hidden; }
  .plasma-orb { position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.25; animation: plasmaDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
  .orb-c { width: 65vw; height: 65vw; background: var(--neon-cyan); top: -20vh; left: -15vw; }
  .orb-p { width: 55vw; height: 55vw; background: var(--neon-purple); bottom: -15vh; right: -15vw; animation-delay: -7s; }
  @keyframes plasmaDrift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(5vw, 5vh) scale(1.05); } }

  /* CIRCLE FLOW SPLASH SCREEN */
  .boot-splash { position: fixed; inset: 0; z-index: 99999; background: #000; display: flex; align-items: center; justify-content: center; transition: opacity 1.2s ease-in-out, visibility 1.2s; }
  .boot-splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .splash-container { position: relative; width: 300px; height: 300px; display: flex; align-items: center; justify-content: center; }
  .circle-flow-1 { position: absolute; inset: 0; border-radius: 50%; border: 2px solid transparent; border-top-color: var(--neon-cyan); border-bottom-color: var(--neon-cyan); animation: flowRotate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  .circle-flow-2 { position: absolute; inset: 25px; border-radius: 50%; border: 2px solid transparent; border-left-color: var(--neon-gold); border-right-color: var(--neon-purple); animation: flowRotate 3s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse; opacity: 0.8; }
  .circle-flow-3 { position: absolute; inset: 50px; border-radius: 50%; border: 2px dotted rgba(255,255,255,0.3); animation: flowRotate 8s linear infinite; }
  .splash-brand { font-family: var(--font-heading); font-size: 3.5rem; font-style: italic; letter-spacing: 0.05em; color: #fff; position: relative; z-index: 10; text-shadow: 0 0 20px rgba(0,240,255,0.4); }
  @keyframes flowRotate { 100% { transform: rotate(360deg); } }

  /* SCROLLING */
  .kinetic-scroll-engine { height: 100dvh; width: 100vw; overflow-y: auto; scroll-snap-type: y mandatory; scroll-behavior: smooth; perspective: 1000px; -webkit-overflow-scrolling: touch; }
  .scrolling-section {
    height: 100dvh; width: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 80px 24px 20px 24px;
    opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(10px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scrolling-section.view-active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }

  .bento-container { width: 100%; max-width: 1100px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; padding: 20px 0; scrollbar-width: none; }
  .bento-card { 
    background: var(--glass-bg); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    border: 1px solid var(--glass-border); border-top: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px; padding: 32px; position: relative; overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .bento-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); box-shadow: 0 30px 60px rgba(0,0,0,0.7); }
  
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }

  /* TOP BAR & ANIMATED TOGGLE */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none;}
  .top-bar > * { pointer-events: auto; }
  
  .security-hud { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 6px 16px 6px 6px; border-radius: 100px; cursor: pointer; transition: all 0.3s; }
  .security-hud:hover { border-color: var(--neon-cyan); }
  .hud-icon-box { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
  .hud-locked .hud-icon-box { background: rgba(255, 255, 255, 0.1); color: #fff; }
  .hud-unlocked .hud-icon-box { background: rgba(0, 240, 255, 0.2); color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); }
  .hud-text { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #fff; }

  /* KINETIC MENU TOGGLE BUTTON */
  .sidebar-menu-btn {
    position: relative; width: 52px; height: 52px; border-radius: 50%;
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 120; backdrop-filter: blur(10px);
  }
  .sidebar-menu-btn:hover { background: rgba(0, 240, 255, 0.1); border-color: var(--neon-cyan); box-shadow: 0 0 20px rgba(0,240,255,0.3); transform: scale(1.1); }
  
  .menu-icon-lines { position: relative; width: 22px; height: 16px; }
  .menu-icon-lines span {
    position: absolute; left: 0; width: 100%; height: 2px; background: #fff;
    border-radius: 2px; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .menu-icon-lines span:nth-child(1) { top: 0; }
  .menu-icon-lines span:nth-child(2) { top: 7px; width: 70%; right: 0; left: auto; }
  .menu-icon-lines span:nth-child(3) { top: 14px; }

  .sidebar-menu-btn.open { transform: rotate(90deg); border-color: var(--neon-pink); background: rgba(255, 0, 85, 0.1); box-shadow: 0 0 20px rgba(255,0,85,0.3); }
  .sidebar-menu-btn.open .menu-icon-lines span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #fff; width: 100%; }
  .sidebar-menu-btn.open .menu-icon-lines span:nth-child(2) { opacity: 0; transform: translateX(20px); }
  .sidebar-menu-btn.open .menu-icon-lines span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #fff; width: 100%; }

  /* SIDEBAR */
  .nasa-sidebar {
    position: fixed; right: -400px; top: 0; bottom: 0; width: 400px;
    background: #050505; border-left: 1px solid var(--glass-border); z-index: 110;
    padding: 32px 24px; display: flex; flex-direction: column;
    box-shadow: -30px 0 80px rgba(0,0,0,0.9); transition: right 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nasa-sidebar.open { right: 0; }
  .sidebar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .sidebar-logo { font-family: var(--font-heading); font-size: 2rem; font-style: italic; font-weight: 700; color: var(--neon-cyan); display: flex; align-items: center; gap: 8px; }
  .sidebar-close { background: transparent; border: none; color: #fff; cursor: pointer; transition: transform 0.3s; }
  .sidebar-close:hover { transform: rotate(90deg) scale(1.1); color: var(--neon-pink); }
  .sidebar-section-title { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 16px; }
  .sidebar-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px; margin-bottom: 16px; transition: all 0.3s; }
  .sidebar-card:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }

  /* 🌟 ANIMATRONIC FLOATING DOCK (MOBILE vs DESKTOP) 🌟 */
  .floating-dock {
    position: fixed; z-index: 100;
    background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(40px); border: 1px solid var(--glass-border); 
    display: flex; box-shadow: 0 30px 60px rgba(0,0,0,0.9);
  }
  .dock-item { border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; position: relative; }
  .dock-tooltip { position: absolute; background: #fff; color: #000; padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; opacity: 0; transition: all 0.2s; white-space: nowrap; text-transform: uppercase; font-family: var(--font-ui); pointer-events: none; letter-spacing: 0.1em; }

  /* Mobile Dock (Bottom, Horizontal) */
  @media (max-width: 768px) {
    .floating-dock {
      bottom: 24px; left: 50%; transform: translateX(-50%); flex-direction: row; gap: 8px; padding: 8px; border-radius: 100px;
      width: 92%; overflow-x: auto; justify-content: flex-start; -webkit-overflow-scrolling: touch;
    }
    .dock-item { min-width: 46px; height: 46px; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .dock-item.active { color: #000; background: #fff; transform: translateY(-6px); box-shadow: 0 10px 20px rgba(255,255,255,0.2); }
    .dock-item:hover:not(.active) { color: #fff; background: rgba(255,255,255,0.1); }
    .dock-tooltip { top: -45px; left: 50%; transform: translateX(-50%) translateY(10px); }
    .dock-item:hover .dock-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  /* Desktop Dock (Left Side, Vertical, Animatronic) */
  @media (min-width: 769px) {
    .floating-dock {
      top: 50%; left: 32px; transform: translateY(-50%); flex-direction: column; gap: 12px; padding: 16px 10px; border-radius: 100px;
      animation: dockFloat 6s ease-in-out infinite;
    }
    @keyframes dockFloat { 0%, 100% { transform: translateY(-50%); } 50% { transform: translateY(calc(-50% - 10px)); } }
    .dock-item { width: 50px; height: 50px; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
    .dock-item.active { color: #000; background: #fff; transform: translateX(12px) scale(1.1); box-shadow: -10px 10px 20px rgba(255,255,255,0.1); }
    .dock-item:hover:not(.active) { color: #fff; background: rgba(255,255,255,0.1); transform: translateX(8px); }
    .dock-tooltip { top: 50%; left: 100%; margin-left: 15px; transform: translateY(-50%) translateX(-10px); }
    .dock-item:hover .dock-tooltip { opacity: 1; transform: translateY(-50%) translateX(0); }
    .scrolling-section { padding-left: 100px; } /* Prevent overlap on desktop */
  }

  /* TYPOGRAPHY & BUTTONS */
  .text-title { font-family: var(--font-heading); font-style: italic; font-weight: 600; font-size: 4.2rem; letter-spacing: -0.02em; line-height: 1.1; color: #fff; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
  .text-subtitle { font-family: var(--font-mono); font-weight: 700; font-size: 0.75rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .text-metric { font-family: var(--font-ui); font-weight: 300; font-size: 3.5rem; letter-spacing: -0.04em; color: #fff; }
  
  .btn-primary { background: #fff; color: #000; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s; font-family: var(--font-ui); letter-spacing: 0.05em; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255,255,255,0.2); }
  .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--glass-border); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); color: #fff; }
  
  .btn-icon { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
  .btn-icon:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .btn-icon.danger:hover { color: var(--neon-pink); background: rgba(255, 0, 85, 0.15); }
  
  .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); font-family: var(--font-ui); }
  
  .filter-tab { background: transparent; border: 1px solid var(--glass-border); color: var(--text-secondary); padding: 8px 16px; border-radius: 100px; cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: all 0.3s; }
  .filter-tab.active { background: #fff; color: #000; border-color: #fff; }
  .filter-tab:hover:not(.active) { color: #fff; border-color: rgba(255,255,255,0.3); }

  .pro-table { width: 100%; border-collapse: collapse; margin-top: 16px; text-align: left; }
  .pro-table th { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }
  .pro-table td { padding: 18px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.95rem; vertical-align: middle; }
  .pro-table tr:hover td { background: rgba(255,255,255,0.02); }

  /* AI CHAT */
  .ai-terminal { background: rgba(0,0,0,0.6); border-radius: 16px; padding: 20px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 16px; height: 500px; }
  .ai-chat-box { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; padding-right: 8px; scrollbar-width: none; }
  .ai-chat-box::-webkit-scrollbar { display: none; }
  .ai-msg { padding: 14px 18px; border-radius: 14px; font-size: 0.95rem; max-width: 85%; line-height: 1.5; font-family: var(--font-body); }
  .ai-msg.bot { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; align-self: flex-start; border-bottom-left-radius: 4px; }
  .ai-msg.user { background: rgba(0,240,255,0.15); border: 1px solid rgba(0,240,255,0.3); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .ai-input-wrapper { display: flex; gap: 8px; margin-top: auto; }
  
  /* Modal Overlay */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal-window { background: #050505; border: 1px solid rgba(255,255,255,0.15); width: 100%; max-width: 600px; border-radius: 24px; padding: 40px; box-shadow: 0 50px 100px rgba(0,0,0,0.9); max-height: 90vh; overflow-y: auto; position: relative; }

  @media (max-width: 768px) {
    .text-title { font-size: 2.8rem; }
    .scrolling-section { padding: 100px 16px 120px 16px; }
    .modal-window { padding: 24px; }
    .top-bar { padding: 16px 20px; }
    .nasa-sidebar { width: 100%; right: -100%; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(ARCH_QUOTES[0]);

  // Core Databases
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // Filters & State
  const [vaultFilter, setVaultFilter] = useState('All');
  const vaultCategories = ['All', 'Trophies', 'Programs', 'Events', 'Meetings', 'Other'];

  // Simulated LIVE NASA Feed
  const liveNasaNews = [
    { id: 'l1', tag: 'OFFICIAL UPDATE', title: '68th ANC Workshop Details Released', date: 'June 16, 2026', link: 'https://nasaindia.co' },
    { id: 'l2', tag: 'DEADLINE', title: 'Louis I. Kahn Trophy Submission Window Closes Soon', date: 'June 20, 2026', link: 'https://nasaindia.co' }
  ];

  // AI State
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'RSA Advanced AI initialized. I have complete access to the NASA India telemetry, Unit archives, and architectural knowledge bases. What would you like to explore or design today?' }
  ]);

  // Modals
  const [modalMode, setModalMode] = useState(null); 
  const [viewingCrew, setViewingCrew] = useState(null);
  const [viewingNews, setViewingNews] = useState(null);
  const [formPayload, setFormPayload] = useState({});
  const scrollEngineRef = useRef(null);

  const dockItems = [
    { id: 'core', icon: <Hexagon size={22} strokeWidth={1.5}/>, label: 'Dashboard' },
    { id: 'crew', icon: <UsersRound size={22} strokeWidth={1.5}/>, label: 'Team' },
    { id: 'funds', icon: <CircleDollarSign size={22} strokeWidth={1.5}/>, label: 'Treasury' },
    { id: 'vault', icon: <HardDrive size={22} strokeWidth={1.5}/>, label: 'Files' },
    { id: 'gallery', icon: <Aperture size={22} strokeWidth={1.5}/>, label: 'Archive Gallery' },
    { id: 'news', icon: <RadioTower size={22} strokeWidth={1.5}/>, label: 'News' },
    { id: 'hq', icon: <Crown size={22} strokeWidth={1.5}/>, label: 'Council' },
    { id: 'ai', icon: <BrainCircuit size={22} strokeWidth={1.5}/>, label: 'AI Chat' }
  ];

  useEffect(() => {
    setDailyQuote(ARCH_QUOTES[Math.floor(Math.random() * ARCH_QUOTES.length)]);
    setTimeout(() => setIsBooting(false), 2200);
    
    const unsubs = [
      onSnapshot(doc(db, "unit", "hq"), d => { d.exists() && setLeadership({ ...leadership, ...d.data() }); }),
      onSnapshot(collection(db, "crew"), s => setCrewData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "finances"), s => setFinancialLog(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "vault"), s => setVaultData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "gallery"), s => setGalleryData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "news"), s => setNewsData(s.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];
    return () => unsubs.forEach(unsub => unsub());
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById('ai-chat-box-container');
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [aiMessages]);

  const handleEngineScroll = () => {
    if (!scrollEngineRef.current) return;
    const idx = Math.round(scrollEngineRef.current.scrollTop / window.innerHeight);
    if (idx !== activeSectionIdx) setActiveSectionIdx(idx);
  };

  const executeEngineNavigation = (idx) => {
    scrollEngineRef.current.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
    setActiveSectionIdx(idx);
  };

  const handleSecurityToggle = () => {
    if (isLeadershipMode) setIsLeadershipMode(false);
    else {
      const pass = prompt("Enter Admin Password to Unlock Editing:");
      if (pass === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else if (pass) alert("Incorrect Password.");
    }
  };

  const handleSaveToCloud = async (collectionName) => {
    try {
      if (collectionName === 'hq') {
        await setDoc(doc(db, "unit", "hq"), formPayload);
      } else if (formPayload.id) {
        const { id, ...data } = formPayload;
        await updateDoc(doc(db, collectionName, id), data);
      } else {
        await addDoc(collection(db, collectionName), { ...formPayload, timestamp: Date.now() });
      }
      setModalMode(null); 
      setFormPayload({});
    } catch (e) { alert("Failed to save data."); }
  };

  const deleteDocRecord = async (col, id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      await deleteDoc(doc(db, col, id));
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

  // ==========================================
  // SUPERCHARGED AI BRAIN
  // ==========================================
  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    const textRaw = aiInput.trim();
    setAiMessages(prev => [...prev, { sender: 'user', text: textRaw }]);
    setAiInput('');

    setTimeout(() => {
      const tokens = textRaw.toLowerCase();
      let botResponse = "";

      if (tokens.includes("troph") || tokens.includes("lik") || tokens.includes("louis")) {
        botResponse = "The Louis I. Kahn (LIK) Trophy focuses on unrecorded heritage architecture. Currently, submissions are open on the NASA portal. I recommend focusing on vernacular spatial configurations and timber joints, similar to the Kanchipuram housing typologies we documented. Do you need details on specific vernacular elements?";
      } else if (tokens.includes("msl") || tokens.includes("landscape") || tokens.includes("shaheer")) {
        botResponse = "For the Mohammad Shaheer Landscape (MSL) Trophy, our focus is the Velachery site in Chennai. Our 'Hydro-Social Connector' concept acts as a biological machine to manage urban flooding. Ensure your bio-swale and topographical grading metrics are properly mapped in AutoCAD.";
      } else if (tokens.includes("news") || tokens.includes("live") || tokens.includes("feed")) {
        botResponse = `Checking live NASA feed... I found ${liveNasaNews.length} recent updates. The latest is: "${liveNasaNews[0].title}". You can view these directly in the News section via the sidebar.`;
      } else if (tokens.includes("nasa") || tokens.includes("convention")) {
        botResponse = "The 68th Annual NASA Convention is in preparation stage. Make sure your unit delegates from Chennai are ready. Workshop selections are crucial—refer to the 'How to Select ANC Workshops' guide in our News section to align with our unit's strategic goals.";
      } else if (tokens.includes("rural") || tokens.includes("varyankaval")) {
        botResponse = "The Varyankaval Village study in Ariyalur is a prime example of rural documentation. The morphological maps and land-use data you produced are excellent references for understanding organic community growth and shared courtyard spaces.";
      } else if (tokens.includes("hello") || tokens.includes("hi") || tokens.includes("hey")) {
        botResponse = "Hello! I am your advanced architectural co-pilot. I am fully synchronized with our unit's legacy, current active phases, and the broader architectural landscape. How can I assist you with your design logic or unit management today?";
      } else if (tokens.includes("money") || tokens.includes("fund") || tokens.includes("balance") || tokens.includes("treasury")) {
        const net = financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0) - financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
        botResponse = `Calculating current financial arrays... Our unit treasury balance stands at exactly ₹${net.toLocaleString()}.`;
      } else if (tokens.includes("design") || tokens.includes("concept") || tokens.includes("philosophy") || tokens.includes("architecture")) {
        botResponse = "When formulating an architectural concept, one must bridge the phenomenological with the structural. Consider how natural light defines the volume, as Louis Kahn suggested. Are you leaning towards a parametric fluid approach or a more strict, rationalist grid configuration for this specific design phase?";
      } else {
        botResponse = "That requires deeper synthesis. From an architectural standpoint, we must evaluate how this variable interacts with user circulation, structural integrity, and environmental passive strategies. Can you define the parameters of your query a bit more clearly?";
      }

      setAiMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  // ==========================================
  // DASHBOARD SECTIONS
  // ==========================================
  
  const renderDashboard = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px' }}><span className="text-subtitle">Overview</span><h1 className="text-title">Dashboard</h1></div>
      
      <div className="bento-grid-2" style={{ marginBottom: '24px' }}>
        <div className="bento-card" style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.05), rgba(0,0,0,0.8))', borderColor: 'rgba(0,240,255,0.2)' }}>
          <span className="text-subtitle" style={{color: 'var(--neon-cyan)'}}><Globe size={14}/> Architectural Philosophy</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '500', fontFamily: 'var(--font-heading)', marginTop: '16px', lineHeight: '1.4', fontStyle: 'italic' }}>
            {dailyQuote}
          </div>
        </div>
        <div className="bento-card" style={{ background: 'linear-gradient(135deg, rgba(255,190,11,0.05), rgba(0,0,0,0.8))', borderColor: 'rgba(255,190,11,0.2)' }}>
          <span className="text-subtitle" style={{color: 'var(--neon-gold)'}}><Activity size={14}/> System Status: Nominal</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '600', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>NASA 68th Convention</div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>Preparation is active. Live feed connected. Ensure all delegates review the workshop registration guidelines.</p>
        </div>
      </div>

      <div className="bento-grid-3">
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><UsersRound size={14}/> Active Members</span>
          <div className="text-metric">{crewData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><HardDrive size={14}/> Saved Files</span>
          <div className="text-metric">{vaultData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><RadioTower size={14}/> News Posts</span>
          <div className="text-metric">{newsData.length}</div>
        </div>
      </div>
    </div>
  );

  const renderCrew = () => {
    const orderedYears = ['1', '2', '3', '4', '5', 'Alumni', 'Unassigned']; 
    const allocation = {};
    orderedYears.forEach(y => allocation[y] = []);

    crewData.forEach(u => {
      const y = u.year || 'Unassigned';
      if (allocation[y]) allocation[y].push(u);
      else allocation['Unassigned'].push(u);
    });
    
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Member List</span><h1 className="text-title">Unit Members</h1></div>
          {/* OPEN ACCESS FOR ALL TO REGISTER */}
          <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Register Profile</button>
        </div>
        
        {orderedYears.map(year => {
          if (allocation[year].length === 0) return null;
          return (
            <div key={year} style={{ marginTop: '24px' }}>
              <span className="text-subtitle" style={{ padding: '0 16px', color: '#fff' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `YEAR ${year}`}</span>
              <div className="bento-grid-2" style={{ marginTop: '16px' }}>
                {allocation[year].map(m => {
                  const isCouncil = ['UD', 'USEC', 'Coordinator', 'EX USEC'].includes(m.role);
                  return (
                    <div key={m.id} className="bento-card" style={{ padding: '24px', cursor: 'pointer', border: isCouncil ? '1px solid var(--neon-gold)' : '' }} onClick={() => setViewingCrew(m)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span className="status-pill">
                          {isCouncil && <Crown size={12} style={{marginRight:4}}/>}
                          {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                        </span>
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
    );
  };

  const renderFunds = () => {
    const income = financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const expense = financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    const total = income + expense;
    const net = income - expense;
    const goal = Number(leadership.financialGoal) || 1; 

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Financial Tracking</span><h1 className="text-title">Treasury</h1></div>
          {isLeadershipMode && (
            <button className="btn-primary" onClick={() => { setFormPayload({ type: 'income' }); setModalMode('finances'); }}><Plus size={16}/> Add Record</button>
          )}
        </div>

        <div className="bento-grid-2">
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'var(--neon-green)'}}>Total Balance</span>
            <div style={{display:'flex', gap:'32px', marginTop:'10px'}}>
              <div><span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>INCOME</span><div style={{fontSize:'1.8rem', fontWeight:'600', color:'var(--neon-green)'}}>₹{income.toLocaleString()}</div></div>
              <div><span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>EXPENSES</span><div style={{fontSize:'1.8rem', fontWeight:'600', color:'var(--neon-pink)'}}>₹{expense.toLocaleString()}</div></div>
            </div>
          </div>
          
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'#fff'}}><Zap size={14}/> Current Funds</span>
            <div className="text-metric">₹{net.toLocaleString()}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginTop: '20px' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: '#fff' }}></div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily:'var(--font-mono)' }}>
              <span>Goal</span><span>₹{goal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bento-card" style={{ padding: '8px 24px 24px 24px', overflowX: 'auto' }}>
           <table className="pro-table">
             <thead>
               <tr><th>Type</th><th>Description</th><th>Amount</th><th>Edit</th></tr>
             </thead>
             <tbody>
               {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'40px', color:'rgba(255,255,255,0.5)'}}>No records found.</td></tr>}
               {financialLog.map(f => (
                 <tr key={f.id}>
                   <td><span className="status-pill" style={{ color: f.type==='income'?'var(--neon-green)':'var(--neon-pink)', borderColor: f.type==='income'?'rgba(0,255,102,0.2)':'rgba(255,0,85,0.2)' }}>{f.type}</span></td>
                   <td style={{ fontWeight: '500' }}>{f.description}</td>
                   <td style={{ fontWeight:'600', color: f.type==='income'?'var(--neon-green)':'#fff' }}>
                      {f.type==='income'?'+ ':'- '}₹{Number(f.amount).toLocaleString()}
                   </td>
                   <td>
                     <div style={{ display: 'flex', gap: '8px' }}>
                       {isLeadershipMode && <button className="btn-icon" onClick={() => { setFormPayload(f); setModalMode('finances'); }} title="Edit"><Pencil size={14}/></button>}
                       {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('finances', f.id)}><Trash2 size={14}/></button>}
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    );
  };

  const renderVault = () => {
    const filteredVault = vaultFilter === 'All' ? vaultData : vaultData.filter(v => v.category === vaultFilter);
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Active Works</span><h1 className="text-title">Secure Vault</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'Document', category: 'Programs' }); setModalMode('vault'); }}><Plus size={16}/> Add File</button>}
        </div>

        {/* VAULT CATEGORY FILTER */}
        <div style={{ display: 'flex', gap: '12px', padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {vaultCategories.map(cat => (
            <button key={cat} className={`filter-tab ${vaultFilter === cat ? 'active' : ''}`} onClick={() => setVaultFilter(cat)}>{cat}</button>
          ))}
        </div>

        <div className="bento-grid-3">
          {filteredVault.map(v => (
            <div key={v.id} className="bento-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill"><HardDrive size={12}/> {v.category || 'File'}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {isLeadershipMode && <button className="btn-icon" title="Archive Work" onClick={() => handleArchiveVaultItem(v)}><FolderArchive size={14}/></button>}
                  {isLeadershipMode && <button className="btn-icon" title="Edit" onClick={() => { setFormPayload(v); setModalMode('vault'); }}><Pencil size={14}/></button>}
                  {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('vault', v.id)}><Trash2 size={14}/></button>}
                </div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '24px', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{v.title}</div>
              <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>Open Link <ArrowUpRight size={14}/></a>
            </div>
          ))}
          {filteredVault.length === 0 && <div style={{ color: 'var(--text-secondary)', padding: '16px' }}>No files found in this category.</div>}
        </div>
      </div>
    );
  };

  const renderGallery = () => {
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Past Works</span><h1 className="text-title">Archive Gallery</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image' }); setModalMode('gallery'); }}><Plus size={16}/> Add Direct Image</button>}
        </div>
        <div className="bento-grid-2">
          {galleryData.map(g => (
            <div key={g.id} className="bento-card" style={{ padding: 0 }}>
              {g.fileType === 'Archive' ? (
                <div style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="status-pill" style={{ borderColor: 'var(--neon-gold)', color: 'var(--neon-gold)' }}><FolderArchive size={12}/> YEAR {g.archivedYear || '2026'}</span>
                    {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('gallery', g.id)}><Trash2 size={14}/></button>}
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>{g.title}</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>{g.description}</div>
                  {g.link && <a href={g.link} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ marginTop: '16px' }}>View Saved Data <ArrowUpRight size={14}/></a>}
                </div>
              ) : (
                <>
                  <div style={{ height: '250px', background: g.fileType === 'Image URL' || g.fileType === 'Image' ? `url("${g.link}") center/cover` : 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {(g.fileType !== 'Image URL' && g.fileType !== 'Image') && <Aperture size={40} color="rgba(255,255,255,0.3)" />}
                  </div>
                  <div style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span className="status-pill">{g.category}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {isLeadershipMode && <button className="btn-icon" onClick={() => { setFormPayload(g); setModalMode('gallery'); }}><Pencil size={14}/></button>}
                        {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('gallery', g.id)}><Trash2 size={14}/></button>}
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
    );
  };

  const renderNews = () => (
    <div className="bento-container" style={{ maxWidth: '1400px' }}>
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Announcements</span><h1 className="text-title">News</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}><Plus size={16}/> Add Unit News</button>}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '16px' }}>
        
        {/* MANUAL UNIT NEWS (Gist View) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span className="text-subtitle" style={{color: '#fff', marginLeft: '8px'}}><Activity size={14}/> Unit Updates</span>
          {newsData.length === 0 && <div className="text-sm text-white/50 px-4">No unit news right now.</div>}
          {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
            <div key={n.id} className="bento-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}>{n.tag || 'UPDATE'}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {isLeadershipMode && <button className="btn-icon" onClick={() => { setFormPayload(n); setModalMode('news'); }}><Pencil size={14}/></button>}
                  {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('news', n.id)}><Trash2 size={14}/></button>}
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '16px', fontFamily: "var(--font-heading)", fontStyle: 'italic' }}>{n.title}</div>
              {/* GIST VIEW: Show only first 120 chars */}
              <div style={{ whiteSpace: 'pre-wrap', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '20px' }}>
                {n.content && n.content.length > 120 ? n.content.substring(0, 120) + '...' : n.content}
              </div>
              <button className="btn-primary btn-secondary" style={{ width: '100%' }} onClick={() => setViewingNews(n)}>
                <BookOpen size={14}/> Read Full Story
              </button>
            </div>
          ))}
        </div>

        {/* LIVE NASA FEED SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span className="text-subtitle" style={{color: 'var(--neon-gold)', marginLeft: '8px'}}><Globe size={14}/> Live NASA India Feed</span>
          <div className="bento-card" style={{ border: '1px solid rgba(255, 190, 11, 0.3)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {liveNasaNews.map(live => (
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
  );

  const renderUnitCouncil = () => {
    const councilMembers = crewData.filter(m => ['UD', 'USEC', 'Coordinator', 'EX USEC'].includes(m.role));

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Administration Layer</span><h1 className="text-title">Executive Core</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Unit Info</button>}
          </div>
        </div>
        <div className="bento-card" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.15)', marginBottom: '24px' }}>
          <span className="text-subtitle" style={{color: '#fff'}}>Unit Information</span>
          <div style={{ fontSize: '3.5rem', fontWeight: '600', margin: '10px 0', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>Unit {leadership.unitCode}</div>
          <div className="status-pill" style={{fontFamily: 'var(--font-mono)', textTransform: 'lowercase'}}><Globe size={12}/> {leadership.officialEmail}</div>
        </div>

        <span className="text-subtitle" style={{ padding: '0 16px', marginTop: '16px', color: 'var(--neon-gold)' }}><Crown size={14}/> High Command Directory</span>
        <div className="bento-grid-2">
          {councilMembers.length === 0 && <div className="text-sm text-white/50 px-4">No executives initialized inside the matrix.</div>}
          {councilMembers.map(m => (
            <div key={m.id} className="sidebar-card" style={{ border: '1px solid rgba(255, 190, 11, 0.3)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="status-pill" style={{ color: 'var(--neon-gold)', borderColor: 'rgba(255, 190, 11, 0.3)' }}>
                  {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                </span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '16px', fontFamily: 'var(--font-heading)', fontStyle:'italic' }}>{m.name}</div>
              <button className="btn-primary btn-secondary" style={{ width: '100%' }} onClick={() => setViewingCrew(m)}>
                <Eye size={14}/> View Dossier
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRSAIntel = () => {
    return (
      <div className="bento-container" style={{ maxWidth: '1400px' }}>
        <div style={{ padding: '0 16px' }}><span className="text-subtitle">AI Assistant</span><h1 className="text-title">RSA AI</h1></div>
        
        <div className="bento-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
          <span className="text-subtitle" style={{color: '#fff'}}><BrainCircuit size={14}/> Chat with RSA AI</span>
          <div className="ai-terminal" style={{ marginTop: '16px' }}>
            <div id="ai-chat-box-container" className="ai-chat-box">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`ai-msg ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleAiSubmit} className="ai-input-wrapper">
              <input 
                className="ai-input" 
                placeholder="Ask complex architecture queries or request live NASA updates..." 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
              />
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
      
      <div className="animatronic-bg">
        <div className="laser-grid"></div>
        <div className="plasma-orb orb-c"></div>
        <div className="plasma-orb orb-p"></div>
      </div>

      {/* 🌟 NEW COMPLEX CIRCLE FLOW SPLASH SCREEN 🌟 */}
      <div className={`boot-splash ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash-container">
          <div className="circle-flow-1"></div>
          <div className="circle-flow-2"></div>
          <div className="circle-flow-3"></div>
          <div className="splash-brand">RSA<span style={{color:'var(--neon-cyan)'}}>.</span></div>
        </div>
      </div>

      <nav className="top-bar">
        <div className="pointer-events-auto">
          <div className={`security-hud ${isLeadershipMode ? 'hud-unlocked' : 'hud-locked'}`} onClick={handleSecurityToggle}>
            <div className="hud-icon-box">
               {isLeadershipMode ? <Unlock size={14} strokeWidth={2.5}/> : <Lock size={14} strokeWidth={2.5}/>}
            </div>
            <div className="hud-text">
               [ ADMIN: {isLeadershipMode ? 'ON' : 'OFF'} ]
            </div>
          </div>
        </div>
        
        {/* 🌟 KINETIC SIDEBAR MENU TOGGLE 🌟 */}
        <div className="pointer-events-auto" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontStyle: 'italic', fontWeight: '700', letterSpacing: '0.02em', color: '#fff', textShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}>
            RSA<span style={{color: 'var(--neon-cyan)'}}>.</span>
          </div>
          <button className={`sidebar-menu-btn ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <div className="menu-icon-lines">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div className={`nasa-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">RSA<span style={{color: '#fff'}}>.</span> <span style={{fontSize:'1rem', color:'#fff', fontStyle:'normal', fontFamily:'var(--font-body)', fontWeight:'400'}}>X</span> NASA</div>
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

      <div className="floating-dock">
        {dockItems.map((item, i) => (
          <div key={item.id} className={`dock-item ${activeSectionIdx === i ? 'active' : ''}`} onClick={() => executeEngineNavigation(i)}>
            {item.icon}
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="kinetic-scroll-engine" ref={scrollEngineRef} onScroll={handleEngineScroll}>
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`}>{renderDashboard()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`}>{renderCrew()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`}>{renderFunds()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 3 ? 'view-active' : ''}`}>{renderVault()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 4 ? 'view-active' : ''}`}>{renderGallery()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 5 ? 'view-active' : ''}`}>{renderNews()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 6 ? 'view-active' : ''}`}>{renderUnitCouncil()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 7 ? 'view-active' : ''}`}>{renderRSAIntel()}</section>
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

      {/* EDIT/ADD MODAL */}
      {modalMode && (
        <div className="modal-overlay pointer-events-auto" onClick={() => setModalMode(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="text-title" style={{ fontSize: '2rem' }}>{formPayload.id ? 'Edit' : 'Add'} Data</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveToCloud(modalMode); }}>
              
              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Name" className="mb-4" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email" className="mb-4" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Phone Number" className="mb-4" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  
                  <span className="text-subtitle" style={{marginTop:'16px'}}>Role (Adds Executive to Council)</span>
                  <select required className="mb-4" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Role...</option>
                    <option value="Member">Student Member</option>
                    {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                    {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                    {isLeadershipMode && <option value="EX USEC">Ex-Unit Secretary (EX USEC)</option>}
                    {isLeadershipMode && <option value="Coordinator">Coordinator</option>}
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <input required placeholder="Coordinator Type (e.g., Design, Events)" className="mb-4" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} />
                  )}

                  <span className="text-subtitle" style={{marginTop:'16px'}}>Year</span>
                  <select className="mb-4" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <span className="text-subtitle">Type</span>
                  <select className="mb-4" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="income">INCOME (+)</option>
                    <option value="expense">EXPENSE (-)</option>
                  </select>
                  <span className="text-subtitle">Description</span>
                  <input required placeholder="What was this for?" className="mb-4" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <span className="text-subtitle">Amount (INR)</span>
                  <input required type="number" placeholder="Amount (INR)" className="mb-4" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <input placeholder="Unit Code (e.g. Z649)" className="mb-4" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Official Email" className="mb-4" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <input type="number" placeholder="Goal Amount (INR)" className="mb-4" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                </>
              )}

              {modalMode === 'vault' && (
                <>
                  <span className="text-subtitle">Category</span>
                  <select className="mb-4" value={formPayload.category||'Programs'} onChange={e=>setFormPayload({...formPayload, category:e.target.value})}>
                    {vaultCategories.filter(c=>c!=='All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input required placeholder="Title" className="mb-4" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <input placeholder="Link / URL" className="mb-4" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                </>
              )}

              {['gallery', 'news'].includes(modalMode) && (
                <>
                  <input required placeholder="Title" className="mb-4" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  {modalMode !== 'news' && <input placeholder="Link / URL" className="mb-4" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />}
                  <textarea placeholder="Description..." className="mb-4" rows="4" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
                </>
              )}

              <button type="submit" className="btn-primary w-full justify-center mt-4" style={{ padding: '18px', fontSize: '1rem', letterSpacing: '0.1em' }}>
                SAVE DATA
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}