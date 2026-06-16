import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { 
  Shield, Plus, Trash2, UsersRound, CircleDollarSign, 
  Server, Aperture, Settings, X, ArrowUpRight, Mail, Phone,
  Globe, Activity, Crown, BrainCircuit, Send, CalendarClock,
  Hexagon, Fingerprint, Zap, Lock, Unlock, Menu, Pencil, Eye,
  HardDrive, ImagePlus, RadioTower, TrendingUp, TrendingDown,
  TerminalSquare, ArrowRight
} from 'lucide-react';

// ==========================================
// FIREBASE SECURE KERNEL
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
// QUANTUM-LITHOS AESTHETIC ENGINE
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

  .animatronic-bg { position: fixed; inset: 0; z-index: -5; background: var(--bg-base); overflow: hidden; }
  .plasma-orb { position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.25; animation: plasmaDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
  .orb-c { width: 65vw; height: 65vw; background: var(--neon-cyan); top: -20vh; left: -15vw; }
  .orb-p { width: 55vw; height: 55vw; background: var(--neon-purple); bottom: -15vh; right: -15vw; animation-delay: -7s; }
  
  @keyframes plasmaDrift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(5vw, 5vh) scale(1.05); } }

  .boot-splash { position: fixed; inset: 0; z-index: 99999; background: #000; display: flex; align-items: center; justify-content: center; transition: opacity 1.2s ease-in-out, visibility 1.2s; }
  .boot-splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .splash-brand { font-family: var(--font-heading); font-size: 4.5rem; font-style: italic; letter-spacing: 0.05em; color: #fff; }

  .kinetic-scroll-engine { height: 100dvh; width: 100vw; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; perspective: 1000px; -webkit-overflow-scrolling: touch; }
  .scrolling-section {
    min-height: 100dvh; width: 100%; scroll-snap-align: center; display: flex; align-items: center; justify-content: center; padding: 120px 24px 100px 24px;
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

  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none;}
  .top-bar > * { pointer-events: auto; }
  
  .logo-toggle { font-family: var(--font-heading); font-size: 2.2rem; font-style: italic; font-weight: 700; letter-spacing: 0.02em; color: #fff; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 12px; }
  .logo-toggle:hover { color: var(--neon-cyan); text-shadow: 0 0 20px rgba(0, 240, 255, 0.4); }
  
  .security-hud { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 6px 16px 6px 6px; border-radius: 100px; cursor: pointer; transition: all 0.3s; }
  .security-hud:hover { border-color: var(--neon-cyan); }
  .hud-icon-box { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
  .hud-locked .hud-icon-box { background: rgba(255, 255, 255, 0.1); color: #fff; }
  .hud-unlocked .hud-icon-box { background: rgba(0, 240, 255, 0.2); color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); }
  .hud-text { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #fff; }

  /* 🌟 SLEEK SIDEBAR REDESIGN 🌟 */
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

  .floating-dock {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(40px); border: 1px solid var(--glass-border); border-radius: 100px; display: flex; gap: 8px; padding: 8px; z-index: 100; box-shadow: 0 30px 60px rgba(0,0,0,0.9);
  }
  .dock-item { min-width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; position: relative; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .dock-item.active { color: #000; background: #fff; transform: translateY(-6px); box-shadow: 0 10px 20px rgba(255,255,255,0.2); }
  .dock-item:hover:not(.active) { color: #fff; background: rgba(255,255,255,0.1); }
  
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
  
  /* AI TERMINAL */
  .ai-terminal { background: rgba(0,0,0,0.6); border-radius: 16px; padding: 20px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 16px; height: 500px; }
  .ai-chat-box { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; padding-right: 8px; scrollbar-width: none; }
  .ai-msg { padding: 14px 18px; border-radius: 14px; font-size: 0.95rem; max-width: 85%; line-height: 1.5; font-family: var(--font-body); }
  .ai-msg.bot { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; align-self: flex-start; border-bottom-left-radius: 4px; }
  .ai-msg.user { background: rgba(0,240,255,0.15); border: 1px solid rgba(0,240,255,0.3); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal-window { background: #050505; border: 1px solid rgba(255,255,255,0.15); width: 100%; max-width: 600px; border-radius: 24px; padding: 40px; box-shadow: 0 50px 100px rgba(0,0,0,0.9); max-height: 90vh; overflow-y: auto; position: relative; }

  @media (max-width: 768px) {
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; }
    .text-title { font-size: 2.8rem; }
    .floating-dock { width: 92%; overflow-x: auto; justify-content: flex-start; padding: 10px; border-radius: 20px; }
    .dock-item { min-width: 46px; height: 46px; }
    .scrolling-section { padding: 100px 16px; scroll-snap-align: start; }
    .modal-window { padding: 24px; }
    .top-bar { padding: 16px 20px; }
    .logo-toggle { font-size: 1.8rem; }
    .nasa-sidebar { width: 100%; right: -100%; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Databases
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // AI Cognitive Engine State & Simulated NASA Live Feed
  const [aiInput, setAiInput] = useState("");
  const [nasaLiveFeed, setNasaLiveFeed] = useState({
    events: ["68th Annual NASA Convention", "Zonal NASA Workshops"],
    trophies: ["Louis I. Kahn (LIK) Trophy - Submission Open", "Reubens Showcase - Evaluation Phase", "Mohammad Shaheer Landscape (MSL) Trophy"],
    status: "Active Telemetry"
  });

  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'RSA Cognitive Engine online. Connected to NASA India Live Telemetry. Awaiting query or directive.' }
  ]);
  const chatEndRef = useRef(null);

  // Modals & Forms
  const [modalMode, setModalMode] = useState(null); 
  const [viewingCrew, setViewingCrew] = useState(null);
  const [formPayload, setFormPayload] = useState({});
  const scrollEngineRef = useRef(null);

  const dockItems = [
    { id: 'core', icon: <Hexagon size={22} strokeWidth={1.5}/>, label: 'Omni-View' },
    { id: 'crew', icon: <UsersRound size={22} strokeWidth={1.5}/>, label: 'Architects Array' },
    { id: 'funds', icon: <CircleDollarSign size={22} strokeWidth={1.5}/>, label: 'Capital Ledger' },
    { id: 'vault', icon: <HardDrive size={22} strokeWidth={1.5}/>, label: 'Deep Archives' },
    { id: 'gallery', icon: <Aperture size={22} strokeWidth={1.5}/>, label: 'Morphological Gallery' },
    { id: 'news', icon: <RadioTower size={22} strokeWidth={1.5}/>, label: 'Frequency Relay' },
    { id: 'hq', icon: <Crown size={22} strokeWidth={1.5}/>, label: 'Executive Core' },
    { id: 'ai', icon: <BrainCircuit size={22} strokeWidth={1.5}/>, label: 'RSA Intel AI' }
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
    if (isLeadershipMode) {
      setIsLeadershipMode(false);
    } else {
      const pass = prompt("RSA COGNITIVE OVERRIDE: Input Secure Credentials");
      if (pass === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else if (pass) alert("SECURITY WARNING: AUTHORIZATION DENIED.");
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
      setViewingCrew(null);
      setFormPayload({});
    } catch (e) { 
      alert("Database Synchronization Interrupted."); 
    }
  };

  const deleteDocRecord = async (col, id) => {
    if (window.confirm("Confirm vector deletion from cloud network?")) {
      await deleteDoc(doc(db, col, id));
      setModalMode(null);
      setViewingCrew(null);
    }
  };

  // ==========================================
  // ADVANCED COGNITIVE AI ENGINE
  // ==========================================
  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    const textRaw = aiInput.trim();
    setAiMessages(prev => [...prev, { sender: 'user', text: textRaw }]);
    setAiInput('');

    // Simulate Processing Delay for Realism
    setTimeout(() => {
      const tokens = textRaw.toLowerCase();
      let botResponse = "";

      // Advanced Knowledge Routing
      if (tokens.includes("troph") || tokens.includes("participate") || tokens.includes("available")) {
        botResponse = `Parsing live telemetry... Current active vectors: \n1. ${nasaLiveFeed.trophies[0]}\n2. ${nasaLiveFeed.trophies[1]}\n3. ${nasaLiveFeed.trophies[2]}`;
      } else if (tokens.includes("event") || tokens.includes("program")) {
        botResponse = `NASA India live tracking indicates upcoming operations: ${nasaLiveFeed.events.join(", ")}. Observer Protocol Cycle 3 is also actively integrating new modules.`;
      } else if (tokens.includes("nasa") || tokens.includes("national association")) {
        botResponse = `Network synced to NASA India. Unit ${leadership.unitCode} connection secure. You can review Official Trophies and Convention metrics directly via the sidebar Uplink.`;
      } else if (tokens.includes("shaheer") || tokens.includes("msl") || tokens.includes("velachery")) {
        botResponse = "Accessing MSL Landscape Trophy data. Project 'The Hydro-Social Connector' parameters loaded. Design focuses on a biological machine to counteract urban flooding near Velachery Railway Station.";
      } else if (tokens.includes("kanchipuram") || tokens.includes("vernacular")) {
        botResponse = "Kanchipuram vernacular documentation matrix accessed. Files include cataloging of timber joint typologies and internal courtyard configurations.";
      } else if (tokens.includes("varyankaval") || tokens.includes("rural") || tokens.includes("ariyalur")) {
        botResponse = "Rural documentation database for Varyankaval Village (Ariyalur, TN) accessed. Base maps and morphological parameters are ready for extraction.";
      } else if (tokens.includes("hello") || tokens.includes("hi")) {
        botResponse = "Greetings. The RSA Cognitive Engine is fully synced. Query trophies, events, or unit data.";
      } else {
        botResponse = `Directive "${textRaw}" recognized. I am cross-referencing this against the NASA framework and Unit Z649 archives. System efficiency optimal.`;
      }

      setAiMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 850);
  };

  // ==========================================
  // VIEW RENDER BLOCKS
  // ==========================================
  
  const renderDashboard = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px' }}><span className="text-subtitle">Mainframe Telemetry</span><h1 className="text-title">Omni-View</h1></div>
      <div className="bento-grid-3">
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><UsersRound size={14}/> Active Architects</span>
          <div className="text-metric">{crewData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle" style={{color: '#fff'}}><HardDrive size={14}/> Node Repositories</span>
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
          {isLeadershipMode && (
            <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Register Profile</button>
          )}
        </div>
        
        {order.map(year => allocation[year] && (
          <div key={year} style={{ marginTop: '24px' }}>
            <span className="text-subtitle" style={{ padding: '0 16px', color: '#fff' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `Generation 0${year}`}</span>
            <div className="bento-grid-2" style={{ marginTop: '16px' }}>
              {allocation[year].map(m => (
                <div key={m.id} className="bento-card" style={{ padding: '24px', cursor: 'pointer', border: ['UD', 'USEC', 'Coordinator'].includes(m.role) ? '1px solid var(--neon-gold)' : '' }} onClick={() => setViewingCrew(m)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="status-pill">
                      {['UD', 'USEC', 'Coordinator'].includes(m.role) && <Crown size={12} style={{marginRight:4}}/>}
                      {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display:'flex', alignItems:'center', gap:'4px' }}><Eye size={12}/> View Dossier</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '600', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{m.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>{m.email}</div>
                </div>
              ))}
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

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Economic Flow</span><h1 className="text-title">Capital Ledger</h1></div>
          {isLeadershipMode && (
            <button className="btn-primary" onClick={() => { setFormPayload({ type: 'income' }); setModalMode('finances'); }}><Plus size={16}/> Inject Transaction</button>
          )}
        </div>

        <div className="bento-grid-2">
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'var(--neon-green)'}}>Gross Financial Position</span>
            <div style={{display:'flex', gap:'32px', marginTop:'10px'}}>
              <div><span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>CREDITS</span><div style={{fontSize:'1.8rem', fontWeight:'600', color:'var(--neon-green)'}}>₹{income.toLocaleString()}</div></div>
              <div><span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>DEBITS</span><div style={{fontSize:'1.8rem', fontWeight:'600', color:'var(--neon-pink)'}}>₹{expense.toLocaleString()}</div></div>
            </div>
          </div>
          
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'#fff'}}><Zap size={14}/> Main Net Pool Account</span>
            <div className="text-metric">₹{net.toLocaleString()}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginTop: '20px' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: '#fff' }}></div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily:'var(--font-mono)' }}>
              <span>Target Metric</span>
              <span>₹{goal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bento-card" style={{ padding: '8px 24px 24px 24px', overflowX: 'auto' }}>
           <table className="pro-table">
             <thead>
               <tr>
                 <th>Classification</th>
                 <th>Transaction Narrative / Description</th>
                 <th>Value Magnitude</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
               {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'40px', color:'rgba(255,255,255,0.5)'}}>Ledger Empty.</td></tr>}
               {financialLog.map(f => (
                 <tr key={f.id}>
                   <td><span className="status-pill" style={{ color: f.type==='income'?'var(--neon-green)':'var(--neon-pink)', borderColor: f.type==='income'?'rgba(0,255,102,0.2)':'rgba(255,0,85,0.2)' }}>{f.type}</span></td>
                   <td style={{ fontWeight: '500' }}>{f.description}</td>
                   <td style={{ fontWeight:'600', color: f.type==='income'?'var(--neon-green)':'#fff' }}>
                      {f.type==='income'?'+ ':'- '}₹{Number(f.amount).toLocaleString()}
                   </td>
                   <td>
                     <div style={{ display: 'flex', gap: '8px' }}>
                       {isLeadershipMode && <button className="btn-icon" onClick={() => { setFormPayload(f); setModalMode('finances'); }} title="Open node configurations"><Pencil size={14}/></button>}
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
              <div style={{ display: 'flex', gap: '4px' }}>
                {isLeadershipMode && <button className="btn-icon" onClick={() => { setFormPayload(v); setModalMode('vault'); }}><Pencil size={14}/></button>}
                {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('vault', v.id)}><Trash2 size={14}/></button>}
              </div>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '24px', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{v.title}</div>
            <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>Extract Link <ArrowUpRight size={14}/></a>
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
                <div style={{ display: 'flex', gap: '6px' }}>
                  {isLeadershipMode && <button className="btn-icon" onClick={() => { setFormPayload(g); setModalMode('gallery'); }}><Pencil size={14}/></button>}
                  {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('gallery', g.id)}><Trash2 size={14}/></button>}
                </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
              <span className="status-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}><Activity size={12}/> {n.tag}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {isLeadershipMode && <button className="btn-icon" onClick={() => { setFormPayload(n); setModalMode('news'); }}><Pencil size={14}/></button>}
                {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('news', n.id)}><Trash2 size={14}/></button>}
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '600', marginBottom: '24px', fontFamily: "var(--font-heading)", fontStyle: 'italic', letterSpacing: '0.02em' }}>{n.title}</div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>{n.content}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUnitCouncil = () => {
    const councilMembers = crewData.filter(m => ['UD', 'USEC', 'Coordinator'].includes(m.role));

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Administration Layer</span><h1 className="text-title">Executive Core</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Configure Core Parameters</button>}
          </div>
        </div>
        <div className="bento-card" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.15)', marginBottom: '24px' }}>
          <span className="text-subtitle" style={{color: '#fff'}}>Network Operational Identity</span>
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
                  placeholder="Query NASA status, trophies, or rural matrices..." 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                />
                <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }}><Send size={18}/></button>
              </form>
            </div>
          </div>

          {/* HIGH COMMAND DIRECTORY (With View Dossier) */}
          <div className="bento-card" style={{ border: '1px solid rgba(255, 190, 11, 0.3)' }}>
            <span className="text-subtitle" style={{color: 'var(--neon-gold)'}}><Crown size={14}/> High Command Directory</span>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '450px', overflowY: 'auto', paddingRight: '10px' }}>
              {councilMembers.length === 0 && <div className="text-sm text-white/50">No executives initialized inside the matrix.</div>}
              {councilMembers.map(m => (
                <div key={m.id} className="sidebar-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="status-pill" style={{ color: 'var(--neon-gold)', borderColor: 'rgba(255, 190, 11, 0.3)' }}>
                      {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '16px', fontFamily: 'var(--font-heading)', fontStyle:'italic' }}>{m.name}</div>
                  <button className="btn-primary btn-secondary" style={{ width: '100%' }} onClick={() => setViewingCrew(m)}>
                    <Eye size={14}/> View Dossier
                  </button>
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

      {/* 🌟 SECURITY HUD & LOGO (TOP BAR) 🌟 */}
      <nav className="top-bar">
        {/* Left: Security HUD */}
        <div className="pointer-events-auto">
          <div className={`security-hud ${isLeadershipMode ? 'hud-unlocked' : 'hud-locked'}`} onClick={handleSecurityToggle}>
            <div className="hud-icon-box">
               {isLeadershipMode ? <Unlock size={14} strokeWidth={2.5}/> : <Lock size={14} strokeWidth={2.5}/>}
            </div>
            <div className="hud-text">
               [ ADMIN PORTAL: {isLeadershipMode ? 'UNLOCKED' : 'LOCKED'} ]
            </div>
          </div>
        </div>
        
        {/* Right: Logo Acting as Sidebar Toggle */}
        <div className="logo-toggle pointer-events-auto" onClick={() => setSidebarOpen(!sidebarOpen)}>
          RSA<span style={{color: 'var(--neon-cyan)'}}>.</span>
        </div>
      </nav>

      {/* 🌟 SLEEK NASA SIDEBAR REDESIGN 🌟 */}
      <div className={`nasa-sidebar ${sidebarOpen ? 'open' : ''}`}>
        
        <div className="sidebar-header">
          <div className="sidebar-logo">RSA<span style={{color: '#fff'}}>.</span> <span style={{fontSize:'1rem', color:'#fff', fontStyle:'normal', fontFamily:'var(--font-body)', fontWeight:'400'}}>X</span> NASA</div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={28}/></button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          <div className="sidebar-section-title"><Activity size={14}/> Live Telemetry</div>
          
          <div className="sidebar-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>EVENT</span><CalendarClock size={14}/></div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '8px' }}>68th Annual Convention</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>Status: Active Preparation</div>
          </div>

          <div className="sidebar-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}><span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>TROPHY SYSTEM</span><Shield size={14}/></div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '8px' }}>Louis I. Kahn Trophy</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>Compilation Open</div>
          </div>

          <div className="sidebar-section-title" style={{ marginTop: '30px' }}><Zap size={14}/> Action Portals</div>
          <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sidebar-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Official Portal Link</div><ArrowUpRight size={20} color="#fff"/>
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

      {/* 🌟 OPERATIVE VIEW/DOSSIER MODAL 🌟 */}
      {viewingCrew && (
        <div className="modal-overlay pointer-events-auto">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 className="text-title" style={{ fontSize: '2.5rem' }}>Operative Dossier</h2>
              <button className="btn-icon" onClick={() => setViewingCrew(null)}><X size={24}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'32px' }}>
              <div><span className="text-subtitle">Identity</span><div style={{fontSize:'1.8rem', fontWeight:'600', fontFamily:'var(--font-heading)', fontStyle:'italic'}}>{viewingCrew.name}</div></div>
              <div><span className="text-subtitle">Role Assignment</span><div className="status-pill" style={{color:'var(--neon-cyan)', borderColor:'rgba(0,240,255,0.3)'}}>{viewingCrew.role}</div></div>
              {viewingCrew.coordinatorType && <div><span className="text-subtitle">Department Matrix</span><div style={{fontSize:'1.1rem'}}>{viewingCrew.coordinatorType} Vector</div></div>}
              <div><span className="text-subtitle">Generation Group</span><div style={{fontSize:'1.1rem'}}>Batch Vector: Year {viewingCrew.year}</div></div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <a href={`mailto:${viewingCrew.email}`} className="btn-primary" style={{ flex: 1 }}><Mail size={16}/> Comms</a>
                {viewingCrew.phone && <a href={`tel:${viewingCrew.phone}`} className="btn-primary" style={{ flex: 1 }}><Phone size={16}/> Mobile</a>}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {isLeadershipMode ? (
                <>
                  <button className="btn-primary btn-secondary" style={{flex: 1}} onClick={() => { setFormPayload(viewingCrew); setModalMode('crew'); }}><Pencil size={16}/> Override Data</button>
                  <button className="btn-primary btn-secondary danger" style={{color:'var(--neon-pink)', borderColor:'rgba(255,0,85,0.3)'}} onClick={() => deleteDocRecord('crew', viewingCrew.id)}><Trash2 size={16}/> Erase Node</button>
                </>
              ) : (
                <div style={{fontSize:'0.8rem', color:'var(--text-secondary)', fontStyle:'italic'}}><Lock size={12} style={{display:'inline', marginBottom:'-2px'}}/> Elevate system status to lock/unlock editing authorizations.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🌟 SYNCHRONIZATION CONFIGURATION MODAL 🌟 */}
      {modalMode && (
        <div className="modal-overlay pointer-events-auto">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="text-title" style={{ fontSize: '2rem' }}>{formPayload.id ? 'Configure' : 'Initialize'} Node</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveToCloud(modalMode); }}>
              
              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Full Identity Name" className="mb-4" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email Endpoint" className="mb-4" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Mobile Number Array" className="mb-4" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  
                  <span className="text-subtitle" style={{marginTop:'16px'}}>Hierarchy Assignment</span>
                  <select required className="mb-4" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Matrix Position...</option>
                    <option value="Member">Standard Member</option>
                    <option value="UD">Unit Designee (UD)</option>
                    <option value="USEC">Unit Secretary (USEC)</option>
                    <option value="Coordinator">Executive Coordinator</option>
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <input required placeholder="Coordinator Vector Type (e.g., Design, Documentation)" className="mb-4" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} />
                  )}

                  <span className="text-subtitle" style={{marginTop:'16px'}}>Generation Matrix</span>
                  <select className="mb-4" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <span className="text-subtitle">Transaction Class</span>
                  <select className="mb-4" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="income">CREDIT (+) Incoming Pool</option>
                    <option value="expense">DEBIT (-) Outgoing Expenditure</option>
                  </select>
                  <span className="text-subtitle">Narrative Descriptor</span>
                  <input required placeholder="Transaction Matrix Description" className="mb-4" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <span className="text-subtitle">Volume Transferred (INR)</span>
                  <input required type="number" placeholder="Value Amount (INR)" className="mb-4" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <input placeholder="Unit Ident Code (e.g. Z649)" className="mb-4" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Core Gateway Email Endpoint" className="mb-4" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <input type="number" placeholder="Target Financial Goal (INR)" className="mb-4" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                </>
              )}

              {['vault', 'gallery', 'news'].includes(modalMode) && (
                <>
                  <input required placeholder="Title" className="mb-4" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  {modalMode !== 'news' && <input placeholder="Data Link / URL Target" className="mb-4" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />}
                  <textarea placeholder="Write content payload description..." className="mb-4" rows="4" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
                </>
              )}

              <button type="submit" className="btn-primary w-full justify-center mt-4" style={{ padding: '18px', fontSize: '1rem', letterSpacing: '0.1em' }}>
                <TerminalSquare size={18}/> COMMIT CONFIGURATION
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}