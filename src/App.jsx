import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { 
  Shield, ShieldAlert, Plus, Trash2, UsersRound, CircleDollarSign, 
  Server, Aperture, Settings, X, ArrowUpRight, Mail, Phone,
  Globe, Activity, Award, Cpu, Zap, TrendingUp, TrendingDown, 
  Lock, Unlock, Fingerprint, RadioTower, HardDrive, ImagePlus, 
  Crown, BrainCircuit, MessageSquare, Send, CalendarClock
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
// 2. QUANTUM CYBER-AESTHETIC ENGINE
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  :root {
    --bg-base: #020205;
    --glass-bg: rgba(10, 12, 18, 0.55);
    --glass-border: rgba(255, 255, 255, 0.06);
    --glass-glow: rgba(0, 240, 255, 0.15);
    
    --text-primary: #ffffff;
    --text-secondary: #8b9bb4;
    
    --neon-cyan: #00f0ff;
    --neon-purple: #7000ff;
    --neon-green: #00ff66;
    --neon-pink: #ff0055;
    --neon-gold: #ffbe0b;
    
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
  body, html { background-color: var(--bg-base); color: var(--text-primary); font-family: var(--font-body); overflow: hidden; height: 100dvh; width: 100vw; }
  input, textarea, select { user-select: auto; color: #fff !important; background-color: rgba(0,0,0,0.4) !important; outline: none; border: 1px solid var(--glass-border); border-radius: 12px; padding: 16px; transition: all 0.3s; font-family: var(--font-body); }
  input:focus, textarea:focus, select:focus { border-color: var(--neon-cyan); box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); background: rgba(0,0,0,0.8) !important; }
  ::-webkit-scrollbar { width: 0px; }

  /* 🌟 DYNAMIC ANIMATRONICS BACKGROUND 🌟 */
  .animatronic-bg { position: fixed; inset: 0; z-index: -5; background: #020205; overflow: hidden; }
  
  /* Plasma Orbs */
  .plasma-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.4; animation: plasmaDrift 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
  .orb-c { width: 60vw; height: 60vw; background: var(--neon-cyan); top: -20vh; left: -10vw; }
  .orb-p { width: 50vw; height: 50vw; background: var(--neon-purple); bottom: -10vh; right: -10vw; animation-delay: -5s; }
  
  /* Laser Grid */
  .laser-grid {
    position: absolute; width: 200vw; height: 200vh; top: -50vh; left: -50vw;
    background-image: 
      linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    transform: perspective(600px) rotateX(60deg) translateY(-100px) translateZ(-200px);
    animation: gridMotion 15s linear infinite;
  }

  @keyframes plasmaDrift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(5vw, 5vh) scale(1.2); } }
  @keyframes gridMotion { 0% { transform: perspective(600px) rotateX(60deg) translateY(0) translateZ(-200px); } 100% { transform: perspective(600px) rotateX(60deg) translateY(60px) translateZ(-200px); } }

  /* 🌟 CINEMATIC SPLASH SCREEN 🌟 */
  .boot-splash { position: fixed; inset: 0; z-index: 99999; background: #000; display: flex; align-items: center; justify-content: center; transition: opacity 1.2s ease-in-out, visibility 1.2s; }
  .boot-splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .splash-brand { font-family: var(--font-heading); font-size: 5rem; font-weight: 800; letter-spacing: 0.1em; color: #fff; position: relative; overflow: hidden; }
  .splash-brand::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0,240,255,0.8), transparent); animation: sweep 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; animation-delay: 0.5s; }
  @keyframes sweep { 0% { left: -100%; } 100% { left: 200%; } }

  /* 🌟 KINETIC SCROLL & RESPONSIVE BENTO 🌟 */
  .kinetic-scroll-engine { height: 100vh; width: 100vw; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; perspective: 1000px; }
  .scrolling-section {
    min-height: 100vh; width: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 100px 24px 120px 24px;
    opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(15px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scrolling-section.view-active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }

  .bento-container { width: 100%; max-width: 1200px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; scrollbar-width: none; padding: 20px 0; }
  
  /* 🌟 ADVANCED BENTO CARDS WITH ANIMATRONICS 🌟 */
  .bento-card { 
    background: var(--glass-bg); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    border: 1px solid var(--glass-border); border-top: 1px solid rgba(255,255,255,0.15);
    border-radius: 24px; padding: 32px; position: relative; overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .bento-card::before {
    content: ''; position: absolute; inset: 0; background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%); opacity: 0; transition: opacity 0.4s; pointer-events: none;
  }
  .bento-card:hover { transform: translateY(-6px); border-color: rgba(0,240,255,0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 20px rgba(0,240,255,0.1); }
  .bento-card:hover::before { opacity: 1; }
  
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }

  /* 🌟 FLOATING DOCK 🌟 */
  .floating-dock {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: rgba(5, 5, 10, 0.85); backdrop-filter: blur(40px); border: 1px solid var(--glass-border); border-radius: 100px; display: flex; gap: 8px; padding: 8px; z-index: 100; box-shadow: 0 30px 60px rgba(0,0,0,0.9);
  }
  .dock-item { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; position: relative; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .dock-item.active { color: #fff; background: rgba(0,240,255,0.15); border: 1px solid var(--neon-cyan); transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0,240,255,0.2); }
  .dock-item:hover:not(.active) { color: #fff; background: rgba(255,255,255,0.1); }
  
  .dock-tooltip { position: absolute; top: -45px; background: #fff; color: #000; padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; opacity: 0; transition: all 0.2s; white-space: nowrap; text-transform: uppercase; pointer-events: none; letter-spacing: 0.1em; transform: translateY(10px); }
  .dock-item:hover .dock-tooltip { opacity: 1; transform: translateY(0); }

  /* 🌟 TOP BAR & ADMIN HUD 🌟 */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none;}
  .top-bar > * { pointer-events: auto; }
  .logo-text { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px; color: #fff; }
  
  .security-hud { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 6px 16px 6px 6px; border-radius: 100px; cursor: pointer; transition: all 0.3s; }
  .security-hud:hover { border-color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0,240,255,0.2); }
  .hud-icon-box { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
  .hud-locked .hud-icon-box { background: rgba(255, 255, 255, 0.1); color: #fff; }
  .hud-unlocked .hud-icon-box { background: rgba(0, 255, 102, 0.2); color: var(--neon-green); box-shadow: 0 0 15px rgba(0, 255, 102, 0.4); }
  .hud-text { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #fff; }

  /* 🌟 PRO TYPOGRAPHY & ELEMENTS 🌟 */
  .text-title { font-family: var(--font-heading); font-weight: 700; font-size: 3.5rem; letter-spacing: -0.02em; line-height: 1.1; color: var(--text-primary); }
  .text-subtitle { font-family: var(--font-mono); font-weight: 700; font-size: 0.75rem; letter-spacing: 0.15em; color: var(--neon-cyan); text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .text-metric { font-family: var(--font-heading); font-weight: 500; font-size: 3.5rem; letter-spacing: -0.04em; color: #fff; text-shadow: 0 0 20px rgba(255,255,255,0.2); }
  
  .btn-primary { background: #fff; color: #000; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s; font-family: var(--font-body); letter-spacing: 0.05em; }
  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0, 240, 255, 0.3); background: var(--neon-cyan); }
  .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--glass-border); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: #fff; color: #fff; }
  
  .btn-icon { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s;}
  .btn-icon:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .btn-icon.danger:hover { color: var(--neon-pink); background: rgba(255, 0, 85, 0.15); }
  
  .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); }
  .council-tag { background: rgba(255, 190, 11, 0.1); color: var(--neon-gold); border-color: rgba(255, 190, 11, 0.3); box-shadow: 0 0 15px rgba(255, 190, 11, 0.15); }
  
  /* 🌟 PRO TREASURY TABLE & CHART 🌟 */
  .donut-chart { width: 160px; height: 160px; transform: rotate(-90deg); filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.8)); }
  .donut-segment-income { stroke: var(--neon-green); fill: transparent; stroke-width: 5; stroke-linecap: round; transition: stroke-dasharray 1.5s var(--ease-fluid); filter: drop-shadow(0 0 8px var(--neon-green)); }
  .donut-segment-expense { stroke: var(--neon-pink); fill: transparent; stroke-width: 5; stroke-linecap: round; transition: stroke-dasharray 1.5s var(--ease-fluid); filter: drop-shadow(0 0 8px var(--neon-pink)); }
  
  .pro-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; margin-top: 10px; }
  .pro-table th { text-align: left; padding: 12px 16px; color: var(--text-secondary); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; font-family: var(--font-mono); }
  .pro-table td { padding: 16px; background: rgba(255,255,255,0.02); font-size: 0.95rem; transition: background 0.3s; }
  .pro-table tr td:first-child { border-top-left-radius: 12px; border-bottom-left-radius: 12px; }
  .pro-table tr td:last-child { border-top-right-radius: 12px; border-bottom-right-radius: 12px; }
  .pro-table tr:hover td { background: rgba(255,255,255,0.06); }

  /* 🌟 AI TERMINAL INTERFACE 🌟 */
  .ai-terminal { background: #000; border-radius: 16px; padding: 20px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 16px; height: 100%; min-height: 300px;}
  .ai-chat-box { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
  .ai-msg { padding: 12px 16px; border-radius: 12px; font-size: 0.9rem; max-width: 85%; line-height: 1.5; }
  .ai-msg.bot { background: rgba(0,240,255,0.1); border: 1px solid rgba(0,240,255,0.2); color: var(--neon-cyan); align-self: flex-start; border-bottom-left-radius: 4px; }
  .ai-input-wrapper { display: flex; gap: 8px; }
  .ai-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 12px 16px; border-radius: 12px; color: #fff; font-family: var(--font-body); }
  
  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: modalFade 0.3s ease-out; }
  .modal-window { background: var(--bg-base); border: 1px solid rgba(255,255,255,0.15); width: 100%; max-width: 550px; border-radius: 28px; padding: 40px; box-shadow: 0 50px 100px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.05); max-height: 90vh; overflow-y: auto; }
  @keyframes modalFade { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

  /* Mobile */
  @media (max-width: 768px) {
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; }
    .text-title { font-size: 2.5rem; }
    .floating-dock { width: 95%; overflow-x: auto; justify-content: flex-start; padding: 10px; border-radius: 20px; }
    .dock-item { min-width: 44px; height: 44px; }
    .scrolling-section { padding: 100px 16px 120px 16px; }
    .modal-window { padding: 24px; }
    .top-bar { padding: 16px 20px; }
    .logo-text { font-size: 1.4rem; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  // Core Data Tunnels
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const [modalMode, setModalMode] = useState(null); 
  const [formPayload, setFormPayload] = useState({});
  const scrollEngineRef = useRef(null);

  // 🌟 DOCK ICONS (8 Modules including the new RSA Core & AI) 🌟
  const dockItems = [
    { id: 'core', icon: <Cpu size={22} strokeWidth={2}/>, label: 'Command Nexus' },
    { id: 'crew', icon: <UsersRound size={22} strokeWidth={2}/>, label: 'Operative Roster' },
    { id: 'funds', icon: <CircleDollarSign size={22} strokeWidth={2}/>, label: 'Capital Matrix' },
    { id: 'vault', icon: <HardDrive size={22} strokeWidth={2}/>, label: 'Secure Databanks' },
    { id: 'gallery', icon: <Aperture size={22} strokeWidth={2}/>, label: 'Visual Manifest' },
    { id: 'news', icon: <RadioTower size={22} strokeWidth={2}/>, label: 'Comms Array' },
    { id: 'hq', icon: <Settings size={22} strokeWidth={2}/>, label: 'Council HQ' },
    { id: 'ai', icon: <BrainCircuit size={22} strokeWidth={2}/>, label: 'RSA Intel & AI' }
  ];

  useEffect(() => {
    // Cinematic Splash Delay
    setTimeout(() => setIsBooting(false), 2500);

    // Database Sync
    const unsubs = [
      onSnapshot(doc(db, "unit", "hq"), d => { d.exists() && setLeadership({ ...leadership, ...d.data() }); }),
      onSnapshot(collection(db, "crew"), s => setCrewData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "finances"), s => setFinancialLog(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "vault"), s => setVaultData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "gallery"), s => setGalleryData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "news"), s => setNewsData(s.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];

    // Card Glow Mouse Tracking Animatronics
    const handleMouseMove = (e) => {
      document.querySelectorAll('.bento-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => { unsubs.forEach(unsub => unsub()); window.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const handleEngineScroll = () => {
    if (!scrollEngineRef.current) return;
    const idx = Math.round(scrollEngineRef.current.scrollTop / window.innerHeight);
    if (idx !== activeSectionIdx) setActiveSectionIdx(idx);
  };

  const executeEngineNavigation = (idx) => {
    scrollEngineRef.current.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
    setActiveSectionIdx(idx);
  };

  // 🌟 ADMIN LOCK LOGIC (PASSWORD: saturday) 🌟
  const handleSecurityToggle = () => {
    if (isLeadershipMode) {
      setIsLeadershipMode(false);
    } else {
      const pass = prompt("RSA SECURITY: Enter Override Code");
      if (pass === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else if (pass) alert("AUTHORIZATION FAILED.");
    }
  };

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

  const deleteDocRecord = async (col, id) => {
    if (window.confirm("Permanently erase node from databank?")) await deleteDoc(doc(db, col, id));
  };

  // ==========================================
  // RENDER BLOCKS (8 MODULES)
  // ==========================================
  
  // 1. DASHBOARD
  const renderDashboard = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px' }}><span className="text-subtitle"><Activity size={14}/> Global Diagnostics</span><h1 className="text-title">Command Nexus</h1></div>
      <div className="bento-grid-3">
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><UsersRound size={14}/> Active Operatives</span>
          <div className="text-metric">{crewData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><HardDrive size={14}/> Encrypted Nodes</span>
          <div className="text-metric">{vaultData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><RadioTower size={14}/> Comm Transmissions</span>
          <div className="text-metric">{newsData.length}</div>
        </div>
      </div>
    </div>
  );

  // 2. UNIT CREW
  const renderCrew = () => {
    const allocation = crewData.reduce((acc, u) => { const y = u.year||"Unassigned"; if(!acc[y]) acc[y]=[]; acc[y].push(u); return acc; }, {});
    const order = ['1', '2', '3', '4', '5', 'Alumni', 'Unassigned']; 
    
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle"><Fingerprint size={14}/> Identity Matrix</span><h1 className="text-title">Operative Roster</h1></div>
          <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Register Profile</button>
        </div>
        
        {order.map(year => allocation[year] && (
          <div key={year} style={{ marginTop: '24px' }}>
            <span className="text-subtitle" style={{ padding: '0 16px', color: 'var(--neon-cyan)' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `Generation 0${year}`}</span>
            <div className="bento-grid-2" style={{ marginTop: '16px' }}>
              {allocation[year].map(m => {
                const isCouncil = ['UD', 'USEC', 'Coordinator'].includes(m.role);
                return (
                  <div key={m.id} className="bento-card" style={{ padding: '24px', border: isCouncil ? '1px solid var(--neon-gold)' : '' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span className={`status-pill ${isCouncil ? 'council-tag' : ''}`}>
                        {isCouncil && <Crown size={12}/>}
                        {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                      </span>
                      {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-8px'}} onClick={() => deleteDocRecord('crew', m.id)}><Trash2 size={16}/></button>}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{m.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px', display:'flex', alignItems:'center', gap:'6px', fontFamily: 'var(--font-mono)' }}><Mail size={12}/> {m.email}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 3. FUNDS / TREASURY
  const renderFunds = () => {
    const income = financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const expense = financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    const total = income + expense;
    const net = income - expense;
    const goal = Number(leadership.financialGoal) || 1; 
    const incPercent = total === 0 ? 0 : (income / total) * 100;
    const expPercent = total === 0 ? 0 : (expense / total) * 100;

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle"><CircleDollarSign size={14}/> Economic Flow</span><h1 className="text-title">Capital Matrix</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'income' }); setModalMode('finances'); }}><Plus size={16}/> Inject Node</button>}
        </div>

        <div className="bento-grid-2">
          <div className="bento-card" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <svg viewBox="0 0 36 36" className="donut-chart">
               <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
               {total > 0 && <circle className="donut-segment-income" strokeDasharray={`${incPercent} ${100 - incPercent}`} strokeDashoffset="25" cx="18" cy="18" r="15.915" />}
               {total > 0 && <circle className="donut-segment-expense" strokeDasharray={`${expPercent} ${100 - expPercent}`} strokeDashoffset={25 - incPercent} cx="18" cy="18" r="15.915" />}
            </svg>
            <div>
              <div style={{ marginBottom: '16px' }}><span className="text-subtitle" style={{color:'var(--neon-green)'}}>Gross Credit</span><div style={{fontSize:'1.8rem', fontWeight:'700'}}>₹{income.toLocaleString()}</div></div>
              <div><span className="text-subtitle" style={{color:'var(--neon-pink)'}}>Gross Debit</span><div style={{fontSize:'1.8rem', fontWeight:'700'}}>₹{expense.toLocaleString()}</div></div>
            </div>
          </div>
          
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'#fff'}}><Zap size={14}/> Liquid Yield</span>
            <div className="text-metric" style={{ color: net >= 0 ? 'var(--neon-cyan)' : 'var(--neon-pink)', marginBottom: '20px' }}>₹{net.toLocaleString()}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: 'var(--neon-cyan)', transition: 'width 1s ease-out', boxShadow: '0 0 10px var(--neon-cyan)' }}></div>
            </div>
            <span style={{ marginTop: '10px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Target Hash: ₹{goal.toLocaleString()}</span>
          </div>
        </div>

        <div className="bento-card" style={{ padding: '0 24px 24px 24px', overflowX: 'auto' }}>
           <table className="pro-table">
             <thead><tr><th>Direction</th><th>Descriptor</th><th>Volume</th>{isLeadershipMode && <th>Auth</th>}</tr></thead>
             <tbody>
               {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'40px', color:'var(--text-secondary)'}}>Ledger Empty.</td></tr>}
               {financialLog.map(f => (
                 <tr key={f.id}>
                   <td><span className="status-pill" style={{ color: f.type==='income'?'var(--neon-green)':'var(--neon-pink)', borderColor: f.type==='income'?'rgba(0,255,102,0.2)':'rgba(255,0,85,0.2)' }}>
                      {f.type==='income'?<TrendingUp size={12}/>:<TrendingDown size={12}/>} {f.type}
                   </span></td>
                   <td style={{ fontWeight: '500' }}>{f.description}</td>
                   <td style={{ fontWeight:'700', color: f.type==='income'?'var(--neon-green)':'var(--text-secondary)' }}>
                      {f.type==='income'?'+':'-'}₹{Number(f.amount).toLocaleString()}
                   </td>
                   {isLeadershipMode && <td><button className="btn-icon danger" onClick={() => deleteDocRecord('finances', f.id)}><X size={16}/></button></td>}
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    );
  };

  // 4. VAULT
  const renderVault = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle"><Server size={14}/> Deep Storage</span><h1 className="text-title">Secure Databanks</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'Design File' }); setModalMode('vault'); }}><Plus size={16}/> Push Payload</button>}
      </div>
      <div className="bento-grid-3">
        {vaultData.map(v => (
          <div key={v.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="status-pill"><Component size={12}/> {v.type}</span>
              {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-8px'}} onClick={() => deleteDocRecord('vault', v.id)}><Trash2 size={14}/></button>}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '24px' }}>{v.title}</div>
            <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>Extract Link <ArrowUpRight size={14}/></a>
          </div>
        ))}
      </div>
    </div>
  );

  // 5. GALLERY
  const renderGallery = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle"><Aperture size={14}/> Visual Subsystem</span><h1 className="text-title">Visual Manifest</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image URL' }); setModalMode('gallery'); }}><Plus size={16}/> Upload Media</button>}
      </div>
      <div className="bento-grid-2">
        {galleryData.map(g => (
          <div key={g.id} className="bento-card" style={{ padding: 0 }}>
            <div style={{ height: '250px', background: g.fileType === 'Image URL' ? `url("${g.link}") center/cover` : 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {g.fileType !== 'Image URL' && <ImagePlus size={40} color="var(--text-secondary)" opacity={0.5} />}
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill">{g.category}</span>
                {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-6px'}} onClick={() => deleteDocRecord('gallery', g.id)}><Trash2 size={16}/></button>}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{g.title}</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6' }}>{g.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 6. NEWS / BROADCASTS
  const renderNews = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle"><RadioTower size={14}/> Signal Relay</span><h1 className="text-title">Comms Array</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}><RadioTower size={16}/> Transmit Signal</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
        {newsData.length === 0 && <div className="text-body" style={{padding:'0 16px'}}>Silence on the network.</div>}
        {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
          <div key={n.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}><Activity size={12}/> {n.tag}</span>
              {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-6px'}} onClick={() => deleteDocRecord('news', n.id)}><Trash2 size={16}/></button>}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '16px' }}>{n.title}</div>
            <div className="text-body" style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', color: '#e2e8f0' }}>{n.content}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // 7. UNIT COUNCIL / HQ
  const renderUnitCouncil = () => {
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle"><Shield size={14}/> Administration</span><h1 className="text-title">Council HQ</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Added explicitly: Induct Executive button */}
            {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Coordinator', year: '4' }); setModalMode('crew'); }}><Plus size={16}/> Induct Executive</button>}
            {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Core Config</button>}
          </div>
        </div>

        <div className="bento-card" style={{ background: 'linear-gradient(145deg, rgba(15,15,22,0.6), rgba(0,240,255,0.05))', borderColor: 'rgba(0,240,255,0.2)' }}>
          <span className="text-subtitle" style={{color: 'var(--neon-cyan)'}}>Network Hash Identity</span>
          <div style={{ fontSize: '2.8rem', fontWeight: '800', margin: '10px 0' }}>Unit {leadership.unitCode}</div>
          <div className="status-pill" style={{fontFamily: 'var(--font-mono)', textTransform: 'lowercase'}}><Globe size={12}/> {leadership.officialEmail}</div>
        </div>
      </div>
    );
  };

  // 8. 🌟 NEW: RSA INTEL & AI (Council Comms + AI Model Interface) 🌟
  const renderRSAIntel = () => {
    const councilMembers = crewData.filter(m => ['UD', 'USEC', 'Coordinator'].includes(m.role));

    return (
      <div className="bento-container" style={{ maxWidth: '1400px' }}>
        <div style={{ padding: '0 16px' }}><span className="text-subtitle"><BrainCircuit size={14}/> Command & Intelligence</span><h1 className="text-title">RSA Intel & Core AI</h1></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '16px' }}>
          
          {/* AI ASSISTANT TERMINAL */}
          <div className="bento-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <span className="text-subtitle" style={{color: 'var(--neon-purple)'}}><BrainCircuit size={14}/> Unit History & Reminders Core</span>
            <div className="ai-terminal" style={{ marginTop: '16px' }}>
              <div className="ai-chat-box">
                <div className="ai-msg bot">Initializing RSA Knowledge Base...<br/>Awaiting queries on unit history, status, or scheduling.</div>
              </div>
              <div className="ai-input-wrapper">
                <input className="ai-input" placeholder="Query RSA AI Model..." disabled />
                <button className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }} disabled><Send size={18}/></button>
              </div>
            </div>
          </div>

          {/* COUNCIL CONTACT & MAIL COMMAND */}
          <div className="bento-card" style={{ background: 'linear-gradient(145deg, rgba(15,15,22,0.6), rgba(255,190,11,0.05))', borderColor: 'rgba(255,190,11,0.2)' }}>
            <span className="text-subtitle" style={{color: 'var(--neon-gold)'}}><Crown size={14}/> Executive Comms Directory</span>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
              {councilMembers.length === 0 && <div className="text-body">No executives available.</div>}
              {councilMembers.map(m => (
                <div key={m.id} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="status-pill council-tag">{m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}</span>
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>{m.name}</div>
                  
                  {/* Working Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`mailto:${m.email}`} className="btn-primary btn-secondary" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none', padding: '10px' }}>
                      <Mail size={14}/> Mail
                    </a>
                    {m.phone && (
                      <a href={`tel:${m.phone}`} className="btn-primary btn-secondary" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none', padding: '10px' }}>
                        <Phone size={14}/> Call
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OFFICIAL NASA LINKS */}
          <div className="bento-card" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'rgba(0,240,255,0.05)', borderColor: 'rgba(0,240,255,0.2)' }}>
            <div>
              <span className="text-subtitle" style={{color: 'var(--neon-cyan)'}}><Globe size={14}/> National Association of Students of Architecture</span>
              <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>Official Portal Link</div>
            </div>
            <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" className="btn-primary">
               Access Network <ArrowUpRight size={16}/>
            </a>
          </div>

        </div>
      </div>
    );
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* 🌟 DYNAMIC MESH ANIMATRONICS 🌟 */}
      <div className="animatronic-bg">
        <div className="laser-grid"></div>
        <div className="plasma-orb orb-c"></div>
        <div className="plasma-orb orb-p"></div>
        <div className="glass-noise"></div>
      </div>

      {/* 🌟 PRO BOOT SEQUENCE 🌟 */}
      <div className={`boot-splash ${!isBooting ? 'hidden' : ''}`}>
         <div className="splash-brand">RSA_CORE</div>
      </div>

      {/* 🌟 SECURITY HUD (TOP BAR) 🌟 */}
      <div className="top-bar">
        <div className="logo-text">RSA<span style={{color: 'var(--neon-cyan)'}}>.</span>CORE</div>
        
        <div className={`security-hud ${isLeadershipMode ? 'hud-unlocked' : 'hud-locked'}`} onClick={handleSecurityToggle}>
          <div className="hud-icon-box">
             {isLeadershipMode ? <Unlock size={16} strokeWidth={2.5}/> : <Lock size={16} strokeWidth={2.5}/>}
          </div>
          <div className="hud-text">
             [ SYS: {isLeadershipMode ? 'UNLOCKED' : 'LOCKED'} ]
          </div>
        </div>
      </div>

      {/* 🌟 FLOATING DOCK (Now 8 Modules) 🌟 */}
      <div className="floating-dock">
        {dockItems.map((item, i) => (
          <div key={item.id} className={`dock-item ${activeSectionIdx === i ? 'active' : ''}`} onClick={() => executeEngineNavigation(i)}>
            {item.icon}
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}
      </div>

      {/* 🌟 KINETIC ENGINE WIPE CONTAINER 🌟 */}
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

      {/* 🌟 PRO DATA MODAL 🌟 */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="text-title" style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' }}><Fingerprint size={28} color="var(--neon-cyan)"/> Data Node Input</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveToCloud(modalMode); }}>
              
              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Full Identity Name" className="input-element" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email Address Endpoint" className="input-element" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Mobile Array Number" className="input-element" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  
                  <span className="text-subtitle" style={{marginTop:'16px'}}>Hierarchy Designation</span>
                  <select required className="input-element" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Core Role...</option>
                    <option value="Member">Standard Member</option>
                    {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                    {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                    {isLeadershipMode && <option value="Coordinator">Executive Coordinator</option>}
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <input required placeholder="Specify Type (e.g., Design, Tech, Events)" className="input-element" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} style={{borderColor: 'var(--neon-gold)'}} />
                  )}

                  <span className="text-subtitle" style={{marginTop:'16px'}}>Academic Generation</span>
                  <select className="input-element" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <select className="input-element" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="income">ADD FUNDS / CREDIT (Income Array)</option>
                    <option value="expense">SPEND FUNDS / DEBIT (Expense Array)</option>
                  </select>
                  <input required placeholder="Transaction Matrix Detail" className="input-element" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <input required type="number" placeholder="Value Amount (INR)" className="input-element" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <input placeholder="Unit Hash Identifier (e.g. Z649)" className="input-element" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Core Gateway Email" className="input-element" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <input type="number" placeholder="Annual Financial Goal (INR)" className="input-element" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                </>
              )}

              {['vault', 'gallery', 'news'].includes(modalMode) && (
                <>
                  <input required placeholder="Identifier / Title" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  {modalMode !== 'news' && <input placeholder="Target Cloud URL / Link" className="input-element" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />}
                  <textarea placeholder="Description Payload..." className="input-element" rows="3" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
                </>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px', padding: '18px', fontSize: '1rem', letterSpacing: '0.1em' }}>
                <Zap size={18}/> INITIATE SYNC
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}