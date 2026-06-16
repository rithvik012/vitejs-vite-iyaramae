import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { 
  Shield, Plus, Trash2, UsersRound, CircleDollarSign, 
  Server, Aperture, Settings, X, ArrowUpRight, Mail, Phone,
  Globe, Activity, Crown, BrainCircuit, Send, CalendarClock,
  Hexagon, Fingerprint, Zap, Lock, Unlock, Menu, Pencil,
  HardDrive, ImagePlus, RadioTower, TrendingUp, TrendingDown
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
// 2. QUANTUM-LITHOS AESTHETIC ENGINE
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');

  :root {
    --bg-base: #010103;
    --glass-bg: rgba(8, 10, 15, 0.65);
    --glass-border: rgba(255, 255, 255, 0.08);
    
    --text-primary: #ffffff;
    --text-secondary: #8b9bb4;
    
    --neon-cyan: #00f0ff;
    --neon-purple: #7000ff;
    --neon-gold: #ffbe0b;
    --neon-pink: #ff0055;
    
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-ui: 'Outfit', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
  body, html { background-color: var(--bg-base); color: var(--text-primary); font-family: var(--font-body); overflow: hidden; height: 100dvh; width: 100vw; -webkit-font-smoothing: antialiased; }
  input, textarea, select { user-select: auto; color: #fff !important; background-color: rgba(0,0,0,0.4) !important; outline: none; border: 1px solid var(--glass-border); border-radius: 12px; padding: 16px; transition: all 0.3s; font-family: var(--font-body); }
  input:focus, textarea:focus, select:focus { border-color: var(--neon-cyan); box-shadow: 0 0 20px rgba(0, 240, 255, 0.15); background: rgba(0,0,0,0.8) !important; }
  ::-webkit-scrollbar { width: 0px; }

  /* 🌟 DYNAMIC ANIMATRONICS BACKGROUND 🌟 */
  .animatronic-bg { position: fixed; inset: 0; z-index: -5; background: var(--bg-base); overflow: hidden; }
  .plasma-orb { position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.35; animation: plasmaDrift 25s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
  .orb-c { width: 65vw; height: 65vw; background: var(--neon-cyan); top: -20vh; left: -15vw; }
  .orb-p { width: 55vw; height: 55vw; background: var(--neon-purple); bottom: -15vh; right: -15vw; animation-delay: -7s; }
  
  .laser-grid {
    position: absolute; width: 200vw; height: 200vh; top: -50vh; left: -50vw;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 50px 50px; transform: perspective(800px) rotateX(60deg) translateY(-100px) translateZ(-200px);
    animation: gridMotion 20s linear infinite;
  }

  @keyframes plasmaDrift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(8vw, 8vh) scale(1.1); } }
  @keyframes gridMotion { 0% { transform: perspective(800px) rotateX(60deg) translateY(0) translateZ(-200px); } 100% { transform: perspective(800px) rotateX(60deg) translateY(50px) translateZ(-200px); } }

  /* 🌟 BOOT SPLASH 🌟 */
  .boot-splash { position: fixed; inset: 0; z-index: 99999; background: #000; display: flex; align-items: center; justify-content: center; transition: opacity 1.2s ease-in-out, visibility 1.2s; }
  .boot-splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .splash-brand { font-family: var(--font-heading); font-size: 4.5rem; font-style: italic; letter-spacing: 0.05em; color: #fff; position: relative; overflow: hidden; }

  /* 🌟 HAPTIC SCROLL ENGINE 🌟 */
  .kinetic-scroll-engine { height: 100dvh; width: 100vw; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; perspective: 1000px; -webkit-overflow-scrolling: touch; }
  .scrolling-section {
    min-height: 100dvh; width: 100%; scroll-snap-align: center; display: flex; align-items: center; justify-content: center; padding: 120px 24px 100px 24px;
    opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(10px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scrolling-section.view-active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }

  .bento-container { width: 100%; max-width: 1200px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; scrollbar-width: none; padding: 20px 0; }
  
  .bento-card { 
    background: var(--glass-bg); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    border: 1px solid var(--glass-border); border-top: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px; padding: 32px; position: relative; overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .bento-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.2); box-shadow: 0 30px 60px rgba(0,0,0,0.7); }
  
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }

  /* 🌟 TOP NAVIGATION & HUD (RIGHT ALIGNED TO PREVENT OVERLAP) 🌟 */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: flex-end; align-items: center; gap: 24px; z-index: 90; pointer-events: none;}
  .top-bar > * { pointer-events: auto; }
  
  .logo-toggle { font-family: var(--font-heading); font-size: 2.2rem; font-style: italic; font-weight: 600; letter-spacing: 0.02em; color: #fff; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 12px; }
  .logo-toggle:hover { color: var(--neon-cyan); text-shadow: 0 0 20px rgba(0, 240, 255, 0.4); }
  
  .security-hud { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 6px 16px 6px 6px; border-radius: 100px; cursor: pointer; transition: all 0.3s; }
  .security-hud:hover { border-color: var(--neon-cyan); }
  .hud-icon-box { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
  .hud-locked .hud-icon-box { background: rgba(255, 255, 255, 0.1); color: #fff; }
  .hud-unlocked .hud-icon-box { background: rgba(0, 240, 255, 0.2); color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); }
  .hud-text { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #fff; }

  /* 🌟 COLLAPSIBLE SIDEBAR 🌟 */
  .nasa-sidebar {
    position: fixed; right: -380px; top: 0; bottom: 0; width: 380px;
    background: rgba(5, 5, 8, 0.85); backdrop-filter: blur(50px);
    border-left: 1px solid var(--glass-border); z-index: 85;
    padding: 100px 24px 30px 24px; display: flex; flex-direction: column;
    box-shadow: -20px 0 60px rgba(0,0,0,0.8); transition: right 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nasa-sidebar.open { right: 0; }
  .nasa-feed-item { background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 16px; border-radius: 12px; margin-bottom: 12px; transition: all 0.3s; cursor: pointer; display: flex; flex-direction: column; gap: 8px; }
  .nasa-feed-item:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.06); transform: translateX(-4px); }

  /* 🌟 RESPONSIVE DOCK 🌟 */
  .floating-dock {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: rgba(10, 12, 18, 0.85); backdrop-filter: blur(40px); border: 1px solid var(--glass-border); border-radius: 100px; display: flex; gap: 8px; padding: 8px; z-index: 100; box-shadow: 0 30px 60px rgba(0,0,0,0.9);
  }
  .dock-item { min-width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; position: relative; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .dock-item.active { color: #000; background: #fff; transform: translateY(-6px); box-shadow: 0 10px 20px rgba(255,255,255,0.2); }
  .dock-item:hover:not(.active) { color: #fff; background: rgba(255,255,255,0.1); }
  .dock-tooltip { position: absolute; top: -45px; background: #fff; color: #000; padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; opacity: 0; transition: all 0.2s; white-space: nowrap; text-transform: uppercase; font-family: var(--font-ui); pointer-events: none; letter-spacing: 0.1em; transform: translateY(10px); }
  .dock-item:hover .dock-tooltip { opacity: 1; transform: translateY(0); }

  /* 🌟 TYPOGRAPHY & BUTTONS 🌟 */
  .text-title { font-family: var(--font-heading); font-style: italic; font-weight: 600; font-size: 3.8rem; letter-spacing: -0.02em; line-height: 1.1; color: #fff; }
  .text-subtitle { font-family: var(--font-mono); font-weight: 700; font-size: 0.75rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .text-metric { font-family: var(--font-ui); font-weight: 300; font-size: 3.5rem; letter-spacing: -0.04em; color: #fff; }
  
  .btn-primary { background: #fff; color: #000; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s; font-family: var(--font-ui); letter-spacing: 0.05em; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255,255,255,0.2); }
  .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--glass-border); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); color: #fff; }
  
  .btn-icon { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s;}
  .btn-icon:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .btn-icon.danger:hover { color: var(--neon-pink); background: rgba(255, 0, 85, 0.15); }
  
  .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); font-family: var(--font-ui); }
  .council-tag { background: rgba(255, 190, 11, 0.1); color: var(--neon-gold); border-color: rgba(255, 190, 11, 0.3); box-shadow: 0 0 15px rgba(255, 190, 11, 0.15); }
  
  /* 🌟 AI TERMINAL 🌟 */
  .ai-terminal { background: rgba(0,0,0,0.6); border-radius: 16px; padding: 20px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 16px; height: 100%; min-height: 350px;}
  .ai-chat-box { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; padding-right: 8px; scrollbar-width: none; }
  .ai-msg { padding: 14px 18px; border-radius: 14px; font-size: 0.95rem; max-width: 85%; line-height: 1.5; font-family: var(--font-body); }
  .ai-msg.bot { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; align-self: flex-start; border-bottom-left-radius: 4px; }
  .ai-msg.user { background: rgba(0,240,255,0.15); border: 1px solid rgba(0,240,255,0.3); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .ai-input-wrapper { display: flex; gap: 8px; margin-top: auto; }
  .ai-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 14px 16px; border-radius: 12px; color: #fff; font-family: var(--font-body); }
  
  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: modalFade 0.3s ease-out; }
  .modal-window { background: var(--bg-base); border: 1px solid rgba(255,255,255,0.15); width: 100%; max-width: 550px; border-radius: 24px; padding: 40px; box-shadow: 0 50px 100px rgba(0,0,0,0.9); max-height: 90vh; overflow-y: auto; }
  @keyframes modalFade { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

  /* 🌟 MOBILE OPTIMIZATIONS 🌟 */
  @media (max-width: 768px) {
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; }
    .text-title { font-size: 2.8rem; }
    .floating-dock { width: 92%; overflow-x: auto; justify-content: flex-start; padding: 10px; border-radius: 20px; -webkit-overflow-scrolling: touch; }
    .dock-item { min-width: 46px; height: 46px; }
    .scrolling-section { padding: 120px 16px 120px 16px; scroll-snap-align: start; }
    .modal-window { padding: 24px; }
    .top-bar { padding: 16px 20px; justify-content: space-between; }
    .logo-toggle { font-size: 1.8rem; }
    .nasa-sidebar { width: 100%; right: -100%; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Data
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // AI Cognitive Engine State
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'RSA Cognitive Engine online. Accessing architectural archives and unit scheduling patterns. Awaiting directive.' }
  ]);
  const chatEndRef = useRef(null);

  const [modalMode, setModalMode] = useState(null); 
  const [formPayload, setFormPayload] = useState({});
  const scrollEngineRef = useRef(null);

  // 🌟 DESIGNER DOCK ICONS 🌟
  const dockItems = [
    { id: 'core', icon: <Hexagon size={22} strokeWidth={1.5}/>, label: 'Omni-View' },
    { id: 'crew', icon: <UsersRound size={22} strokeWidth={1.5}/>, label: 'Architects Array' },
    { id: 'funds', icon: <CircleDollarSign size={22} strokeWidth={1.5}/>, label: 'Capital Ledger' },
    { id: 'vault', icon: <HardDrive size={22} strokeWidth={1.5}/>, label: 'Deep Archives' },
    { id: 'gallery', icon: <Aperture size={22} strokeWidth={1.5}/>, label: 'Morphological Gallery' },
    { id: 'news', icon: <Activity size={22} strokeWidth={1.5}/>, label: 'Frequency Relay' },
    { id: 'hq', icon: <Crown size={22} strokeWidth={1.5}/>, label: 'Executive Core' },
    { id: 'ai', icon: <BrainCircuit size={22} strokeWidth={1.5}/>, label: 'RSA Core AI' }
  ];

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 2000);
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
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  // 🌟 AI INTERACTION HANDLER 🌟
  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    const currentInput = aiInput.trim();
    setAiMessages(prev => [...prev, { sender: 'user', text: currentInput }]);
    setAiInput('');

    setTimeout(() => {
      const inputLower = currentInput.toLowerCase();
      let botResponse = "";

      if (inputLower.includes("troph") || inputLower.includes("participate")) {
        botResponse = "Currently active vectors: Louis I. Kahn Trophy (Submission Open) and Reubens Showcase (Evaluation Phase). Check the NASA Uplink for live status.";
      } else if (inputLower.includes("remind") || inputLower.includes("schedule")) {
        botResponse = "Temporal anchor set. The network will retain this schedule parameter.";
      } else if (inputLower.includes("history") || inputLower.includes("past")) {
        botResponse = "Querying deep storage... Unit Z649 archive spans multiple generations. Specify a morphological parameter to extract.";
      } else if (inputLower.includes("hello") || inputLower.includes("hi")) {
        botResponse = "Awaiting command sequence. How shall we proceed?";
      } else {
        botResponse = `Directive "${currentInput}" logged. Processing via backend matrices... Pending manual oversight.`;
      }

      setAiMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  // ==========================================
  // RENDER BLOCKS
  // ==========================================
  
  const renderDashboard = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px' }}><span className="text-subtitle">Global Diagnostics</span><h1 className="text-title">Omni-View</h1></div>
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
          <span className="text-subtitle" style={{color: '#fff'}}><Activity size={14}/> Network Comms</span>
          <div className="text-metric">{newsData.length}</div>
        </div>
      </div>
    </div>
  );

  const renderCrew = () => {
    const allocation = crewData.reduce((acc, u) => { const y = u.year||"Unassigned"; if(!acc[y]) acc[y]=[]; acc[y].push(u); return acc; }, {});
    const order = ['1', '2', '3', '4', '5', 'Alumni', 'Unassigned']; 
    
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Identity Matrix</span><h1 className="text-title">Architects Array</h1></div>
          <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Register Profile</button>
        </div>
        {order.map(year => allocation[year] && (
          <div key={year} style={{ marginTop: '24px' }}>
            <span className="text-subtitle" style={{ padding: '0 16px', color: '#fff' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `Generation 0${year}`}</span>
            <div className="bento-grid-2" style={{ marginTop: '16px' }}>
              {allocation[year].map(m => {
                const isCouncil = ['UD', 'USEC', 'Coordinator'].includes(m.role);
                return (
                  <div key={m.id} className="bento-card" style={{ padding: '24px', border: isCouncil ? '1px solid var(--neon-gold)' : '' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span className="status-pill">
                        {isCouncil && <Crown size={12}/>}
                        {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                      </span>
                      {isLeadershipMode && (
                        <div style={{ display: 'flex', gap: '8px', margin: '-8px' }}>
                          <button className="btn-icon" onClick={() => { setFormPayload(m); setModalMode('crew'); }}><Pencil size={14}/></button>
                          <button className="btn-icon danger" onClick={() => deleteDocRecord('crew', m.id)}><Trash2 size={14}/></button>
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '600', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{m.name}</div>
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
          <div><span className="text-subtitle">Economic Flow</span><h1 className="text-title">Capital Ledger</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'income' }); setModalMode('finances'); }}><Plus size={16}/> Inject Node</button>}
        </div>

        <div className="bento-grid-2">
          <div className="bento-card" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <svg viewBox="0 0 36 36" className="donut-chart" style={{width: '120px', height: '120px'}}>
               <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
               {total > 0 && <circle className="donut-segment-income" strokeDasharray={`${incPercent} ${100 - incPercent}`} strokeDashoffset="25" cx="18" cy="18" r="15.915" />}
               {total > 0 && <circle className="donut-segment-expense" strokeDasharray={`${expPercent} ${100 - expPercent}`} strokeDashoffset={25 - incPercent} cx="18" cy="18" r="15.915" />}
            </svg>
            <div>
              <div style={{ marginBottom: '16px' }}><span className="text-subtitle" style={{color:'var(--neon-green)'}}>Gross Credit</span><div style={{fontSize:'1.8rem', fontWeight:'600'}}>₹{income.toLocaleString()}</div></div>
              <div><span className="text-subtitle" style={{color:'var(--neon-pink)'}}>Gross Debit</span><div style={{fontSize:'1.8rem', fontWeight:'600'}}>₹{expense.toLocaleString()}</div></div>
            </div>
          </div>
          
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'#fff'}}><Zap size={14}/> Liquid Yield</span>
            <div className="text-metric">₹{net.toLocaleString()}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginTop: '20px' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: '#fff', transition: 'width 1s ease-out' }}></div>
            </div>
            <span style={{ marginTop: '10px', textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily:'var(--font-mono)' }}>Target: ₹{goal.toLocaleString()}</span>
          </div>
        </div>

        <div className="bento-card" style={{ padding: '0 24px 24px 24px', overflowX: 'auto' }}>
           <table className="pro-table">
             <thead><tr><th>Direction</th><th>Descriptor</th><th>Volume</th>{isLeadershipMode && <th>Auth</th>}</tr></thead>
             <tbody>
               {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'40px', color:'rgba(255,255,255,0.5)'}}>Ledger Empty.</td></tr>}
               {financialLog.map(f => (
                 <tr key={f.id}>
                   <td><span className="status-pill" style={{ color: f.type==='income'?'var(--neon-green)':'var(--neon-pink)', borderColor: f.type==='income'?'rgba(0,255,102,0.2)':'rgba(255,0,85,0.2)' }}>{f.type}</span></td>
                   <td style={{ fontWeight: '500' }}>{f.description}</td>
                   <td style={{ fontWeight:'600', color: f.type==='income'?'var(--neon-green)':'var(--text-secondary)' }}>
                      {f.type==='income'?'+':'-'}₹{Number(f.amount).toLocaleString()}
                   </td>
                   {isLeadershipMode && (
                     <td style={{ display: 'flex', gap: '8px' }}>
                       <button className="btn-icon" onClick={() => { setFormPayload(f); setModalMode('finances'); }}><Pencil size={16}/></button>
                       <button className="btn-icon danger" onClick={() => deleteDocRecord('finances', f.id)}><Trash2 size={16}/></button>
                     </td>
                   )}
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    );
  };

  const renderVault = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Deep Storage</span><h1 className="text-title">Encrypted Archives</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'Design File' }); setModalMode('vault'); }}><Plus size={16}/> Push Payload</button>}
      </div>
      <div className="bento-grid-3">
        {vaultData.map(v => (
          <div key={v.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="status-pill"><HardDrive size={12}/> {v.type}</span>
              {isLeadershipMode && (
                <div style={{ display: 'flex', gap: '8px', margin: '-8px' }}>
                  <button className="btn-icon" onClick={() => { setFormPayload(v); setModalMode('vault'); }}><Pencil size={14}/></button>
                  <button className="btn-icon danger" onClick={() => deleteDocRecord('vault', v.id)}><Trash2 size={14}/></button>
                </div>
              )}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '24px', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{v.title}</div>
            <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ width: '100%' }}>Extract Link <ArrowUpRight size={14}/></a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Visual Subsystem</span><h1 className="text-title">Morphological Gallery</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image URL' }); setModalMode('gallery'); }}><Plus size={16}/> Upload Media</button>}
      </div>
      <div className="bento-grid-2">
        {galleryData.map(g => (
          <div key={g.id} className="bento-card" style={{ padding: 0 }}>
            <div style={{ height: '250px', background: g.fileType === 'Image URL' ? `url("${g.link}") center/cover` : 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {g.fileType !== 'Image URL' && <Aperture size={40} color="rgba(255,255,255,0.3)" />}
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill">{g.category}</span>
                {isLeadershipMode && (
                  <div style={{ display: 'flex', gap: '8px', margin: '-6px' }}>
                    <button className="btn-icon" onClick={() => { setFormPayload(g); setModalMode('gallery'); }}><Pencil size={16}/></button>
                    <button className="btn-icon danger" onClick={() => deleteDocRecord('gallery', g.id)}><Trash2 size={16}/></button>
                  </div>
                )}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>{g.title}</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6' }}>{g.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Signal Relay</span><h1 className="text-title">Network Comms</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}><RadioTower size={16}/> Transmit Signal</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
        {newsData.length === 0 && <div className="text-sm text-white/50" style={{padding:'0 16px'}}>Silence on the network.</div>}
        {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
          <div key={n.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}><Activity size={12}/> {n.tag}</span>
              {isLeadershipMode && (
                <div style={{ display: 'flex', gap: '8px', margin: '-6px' }}>
                  <button className="btn-icon" onClick={() => { setFormPayload(n); setModalMode('news'); }}><Pencil size={16}/></button>
                  <button className="btn-icon danger" onClick={() => deleteDocRecord('news', n.id)}><Trash2 size={16}/></button>
                </div>
              )}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '16px', fontFamily: "var(--font-heading)", fontStyle: 'italic' }}>{n.title}</div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>{n.content}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUnitCouncil = () => {
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Administration Layer</span><h1 className="text-title">Executive Core</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Core Config</button>}
          </div>
        </div>

        <div className="bento-card" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.15)' }}>
          <span className="text-subtitle" style={{color: '#fff'}}>Network Hash Identity</span>
          <div style={{ fontSize: '3.5rem', fontWeight: '600', margin: '10px 0', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>Unit {leadership.unitCode}</div>
          <div className="status-pill" style={{fontFamily: 'var(--font-mono)', textTransform: 'lowercase'}}><Globe size={12}/> {leadership.officialEmail}</div>
        </div>
      </div>
    );
  };

  const renderRSAIntel = () => {
    const councilMembers = crewData.filter(m => ['UD', 'USEC', 'Coordinator'].includes(m.role));

    return (
      <div className="bento-container" style={{ maxWidth: '1400px' }}>
        <div style={{ padding: '0 16px' }}><span className="text-subtitle">Command Intelligence</span><h1 className="text-title">Cognitive Engine</h1></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginTop: '16px' }}>
          
          {/* AI ASSISTANT TERMINAL */}
          <div className="bento-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <span className="text-subtitle" style={{color: '#fff'}}><BrainCircuit size={14}/> RSA Neural Interface</span>
            <div className="ai-terminal" style={{ marginTop: '16px' }}>
              <div className="ai-chat-box">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`ai-msg ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleAiSubmit} className="ai-input-wrapper">
                <input 
                  className="ai-input" 
                  placeholder="Enter directive..." 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                />
                <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }}><Send size={18}/></button>
              </form>
            </div>
          </div>

          {/* COUNCIL CONTACT DIRECTORY */}
          <div className="bento-card" style={{ border: '1px solid rgba(255, 190, 11, 0.3)' }}>
            <span className="text-subtitle" style={{color: 'var(--neon-gold)'}}><Crown size={14}/> High Command Directory</span>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '450px', overflowY: 'auto', paddingRight: '10px' }}>
              {councilMembers.length === 0 && <div className="text-sm text-white/50">No executives available.</div>}
              {councilMembers.map(m => (
                <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="status-pill" style={{ color: 'var(--neon-gold)', borderColor: 'rgba(255, 190, 11, 0.3)' }}>
                      {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '16px', fontFamily: 'var(--font-heading)', fontStyle:'italic' }}>{m.name}</div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`mailto:${m.email}`} className="btn-primary btn-secondary" style={{ flex: 1 }}>
                      <Mail size={14}/> Mail
                    </a>
                    {m.phone && (
                      <a href={`tel:${m.phone}`} className="btn-primary btn-secondary" style={{ flex: 1 }}>
                        <Phone size={14}/> Call
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* 🌟 HARDWARE ACCELERATED ANIMATRONICS 🌟 */}
      <div className="animatronic-bg">
        <div className="laser-grid"></div>
        <div className="plasma-orb orb-c"></div>
        <div className="plasma-orb orb-p"></div>
      </div>

      {/* 🌟 CINEMATIC BOOT SPLASH 🌟 */}
      <div className={`boot-splash ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash-brand">RSA_CORE</div>
      </div>

      {/* 🌟 LOGO TOGGLE & SECURITY HUD (TOP BAR) 🌟 */}
      <nav className="top-bar">
        {/* Left Side: Security Lock (cleared out to not block titles) */}
        <div className="pointer-events-auto">
          <div className={`security-hud ${isLeadershipMode ? 'hud-unlocked' : 'hud-locked'}`} onClick={handleSecurityToggle}>
            <div className="hud-icon-box">
               {isLeadershipMode ? <Unlock size={14} strokeWidth={2.5}/> : <Lock size={14} strokeWidth={2.5}/>}
            </div>
            <div className="hud-text">
               [ SYS: {isLeadershipMode ? 'UNLOCKED' : 'LOCKED'} ]
            </div>
          </div>
        </div>
        
        {/* Right Side: Logo Acting as Sidebar Toggle */}
        <div className="logo-toggle pointer-events-auto" onClick={() => setSidebarOpen(!sidebarOpen)}>
          RSA<span style={{color: 'var(--neon-cyan)'}}>.</span>
          {sidebarOpen ? <X size={28} color="#fff"/> : <Menu size={28} color="#fff"/>}
        </div>
      </nav>

      {/* 🌟 COLLAPSIBLE NASA SIDEBAR 🌟 */}
      <div className={`nasa-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', marginTop: '40px' }}>
           <Globe size={28} color="#fff" />
           <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: 0, fontStyle: 'italic', fontWeight: '600' }}>NASA India</h2>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          <span className="text-subtitle" style={{ color: 'var(--text-secondary)' }}><Activity size={12}/> Live Telemetry</span>
          
          <div className="nasa-feed-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>EVENT</span><CalendarClock size={14}/></div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '4px' }}>68th Annual Convention</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Upcoming: 2026</div>
          </div>

          <div className="nasa-feed-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>TROPHY</span><Shield size={14}/></div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '4px' }}>Louis I. Kahn Trophy</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Submission Open</div>
          </div>

          <span className="text-subtitle" style={{ color: 'var(--text-secondary)', marginTop: '30px' }}><Zap size={12}/> Action Nodes</span>
          <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="nasa-feed-item" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: '600' }}>Official Portal</div><ArrowUpRight size={18} color="#fff"/>
            </div>
          </a>
        </div>
      </div>

      {/* 🌟 RESPONSIVE DOCK 🌟 */}
      <div className="floating-dock">
        {dockItems.map((item, i) => (
          <div key={item.id} className={`dock-item ${activeSectionIdx === i ? 'active' : ''}`} onClick={() => executeEngineNavigation(i)}>
            {item.icon}
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}
      </div>

      {/* 🌟 HAPTIC SCROLL ENGINE 🌟 */}
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
        <div className="modal-overlay pointer-events-auto">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="text-title" style={{ fontSize: '2rem' }}>{formPayload.id ? 'Modify' : 'Initialize'} Node</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveToCloud(modalMode); }}>
              
              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Full Identity Name" className="w-full mb-4" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email Address Endpoint" className="w-full mb-4" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Mobile Array Number" className="w-full mb-4" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  
                  <span className="text-subtitle" style={{marginTop:'16px'}}>Hierarchy Designation</span>
                  <select required className="w-full mb-4" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Core Role...</option>
                    <option value="Member">Standard Member</option>
                    {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                    {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                    {isLeadershipMode && <option value="Coordinator">Executive Coordinator</option>}
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <input required placeholder="Specify Type (e.g., Design, Tech, Events)" className="w-full mb-4" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} />
                  )}

                  <span className="text-subtitle" style={{marginTop:'16px'}}>Academic Generation</span>
                  <select className="w-full mb-4" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <select className="w-full mb-4" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="income">ADD FUNDS / CREDIT (Income Array)</option>
                    <option value="expense">SPEND FUNDS / DEBIT (Expense Array)</option>
                  </select>
                  <input required placeholder="Transaction Matrix Detail" className="w-full mb-4" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <input required type="number" placeholder="Value Amount (INR)" className="w-full mb-4" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <input placeholder="Unit Hash Identifier (e.g. Z649)" className="w-full mb-4" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Core Gateway Email" className="w-full mb-4" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <input type="number" placeholder="Annual Financial Goal (INR)" className="w-full mb-4" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                </>
              )}

              {['vault', 'gallery', 'news'].includes(modalMode) && (
                <>
                  <input required placeholder="Identifier / Title" className="w-full mb-4" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  {modalMode !== 'news' && <input placeholder="Target Cloud URL / Link" className="w-full mb-4" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />}
                  <textarea placeholder="Description Payload..." className="w-full mb-4" rows="3" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
                </>
              )}

              <button type="submit" className="btn-primary w-full justify-center mt-4" style={{ padding: '18px', fontSize: '1rem', letterSpacing: '0.1em' }}>
                INITIATE SYNC
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}