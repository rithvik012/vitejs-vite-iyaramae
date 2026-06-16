import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import { 
  Shield, ShieldAlert, Plus, Trash2, Users, Wallet, 
  Archive, FileImage, Rss, LayoutDashboard, Settings, 
  X, ArrowUpRight, Component, Radio, Mail, Globe, 
  Menu, ChevronRight, Activity, Calendar, Award
} from 'lucide-react';

// ==========================================
// 1. FIREBASE SECURE CONFIGURATION
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
// 2. ULTRA-PREMIUM INTERACTION ENGINE
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  :root {
    color-scheme: dark !important; 
    --bg-base: #020204;
    --bg-surface: rgba(12, 12, 16, 0.5);
    --bg-surface-hover: rgba(22, 22, 28, 0.8);
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --border-subtle: rgba(255, 255, 255, 0.08);
    --accent: #ffffff;
    --danger: #f43f5e;
    --income: #10b981;
    --council: #eab308;
    --nasa: #3b82f6;
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
  body, html { background-color: var(--bg-base); color: var(--text-primary); font-family: var(--font-body); overflow: hidden; height: 100dvh; }
  input, textarea, select { user-select: auto; color: #fff !important; background-color: rgba(255,255,255,0.03) !important; outline: none; }
  ::-webkit-scrollbar { width: 0px; }

  /* 🌟 BACKGROUND ANIMATRONICS (CYBER-GRID) 🌟 */
  .animatronic-bg { position: fixed; inset: 0; z-index: -4; background: linear-gradient(to bottom, #020204, #050508); overflow: hidden; }
  .cyber-grid {
    position: absolute; width: 200vw; height: 200vh; top: -50vh; left: -50vw;
    background-image: 
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
    animation: gridMove 20s linear infinite;
  }
  @keyframes gridMove { 0% { transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px); } 100% { transform: perspective(500px) rotateX(60deg) translateY(50px) translateZ(-200px); } }
  
  .ambient-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; animation: orbFloat 20s infinite alternate var(--ease-apple); }
  .orb-1 { width: 600px; height: 600px; background: #2563eb; top: -100px; left: -100px; }
  .orb-2 { width: 500px; height: 500px; background: #7c3aed; bottom: -100px; right: -100px; animation-delay: -5s; }
  @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(100px, 50px) scale(1.2); } }

  /* 🌟 GLOBAL BOOT SPLASH SCREEN 🌟 */
  .global-splash { position: fixed; inset: 0; background: #000; z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 1.5s ease-in-out, visibility 1.5s; }
  .global-splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .boot-logo { font-family: var(--font-heading); font-size: 3rem; letter-spacing: 0.3em; margin-bottom: 30px; animation: pulse 2s infinite; }
  .progress-container { width: 300px; height: 2px; background: rgba(255,255,255,0.1); position: relative; overflow: hidden; }
  .progress-bar { height: 100%; background: var(--accent); width: 0%; animation: loadBar 3s cubic-bezier(0.8, 0, 0.2, 1) forwards; }
  @keyframes loadBar { 0% { width: 0%; } 40% { width: 30%; } 70% { width: 80%; } 100% { width: 100%; } }
  @keyframes pulse { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(255,255,255,0.5)); } 50% { opacity: 0.5; filter: drop-shadow(0 0 0px transparent); } }

  /* 🌟 RISING IRIS WIPE TRANSITION 🌟 */
  .kinetic-scroll-engine { height: 100vh; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; transition: padding 0.5s var(--ease-apple); }
  .scrolling-section {
    min-height: 100vh; width: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 100px 24px 120px 24px;
    opacity: 0; filter: blur(20px); transform: translateY(30px) scale(0.95); clip-path: circle(0% at 50% 100%);
    transition: clip-path 1.2s var(--ease-apple), opacity 0.8s var(--ease-apple), filter 0.8s var(--ease-apple), transform 1s var(--ease-apple);
  }
  .scrolling-section.view-active { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); clip-path: circle(180% at 50% 100%); }

  /* Layout */
  .bento-container { width: 100%; max-width: 1100px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; scrollbar-width: none; }
  .bento-card { background: var(--bg-surface); backdrop-filter: blur(40px); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 32px; transition: all 0.4s var(--ease-apple); position: relative; overflow: hidden; }
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }

  /* 🌟 COLLAPSIBLE NASA SIDEBAR 🌟 */
  .nasa-sidebar {
    position: fixed; right: -360px; top: 0; bottom: 0; width: 360px;
    background: rgba(8, 8, 12, 0.85); backdrop-filter: blur(60px);
    border-left: 1px solid var(--border-subtle); z-index: 95;
    padding: 30px 24px; display: flex; flex-direction: column;
    box-shadow: -20px 0 60px rgba(0,0,0,0.8); transition: right 0.6s var(--ease-apple);
  }
  .nasa-sidebar.open { right: 0; }
  .sidebar-toggle {
    position: fixed; right: 24px; top: 24px; z-index: 96;
    background: var(--bg-surface); border: 1px solid var(--border-subtle); backdrop-filter: blur(20px);
    border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.3s;
  }
  .sidebar-toggle:hover { background: rgba(255,255,255,0.1); transform: scale(1.1); }
  .nasa-feed-item { background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 12px; margin-bottom: 12px; transition: all 0.3s var(--ease-apple); cursor: pointer; position: relative; overflow: hidden; }
  .nasa-feed-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: transparent; transition: background 0.3s; }
  .nasa-feed-item:hover { transform: translateX(-5px); border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); }
  .nasa-feed-item:hover::before { background: var(--nasa); }

  /* 🌟 DOCK ICONS 🌟 */
  .floating-dock {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: rgba(10, 10, 12, 0.8); backdrop-filter: blur(40px); border: 1px solid var(--border-subtle); border-radius: 100px; display: flex; gap: 8px; padding: 8px; z-index: 100; box-shadow: 0 30px 60px rgba(0,0,0,0.8);
  }
  .dock-item { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; position: relative; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .dock-item::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--accent); opacity: 0; transform: scale(0.5); transition: all 0.4s var(--ease-apple); z-index: -1; }
  .dock-item.active { color: #000; transform: translateY(-8px); }
  .dock-item.active::before { opacity: 1; transform: scale(1); box-shadow: 0 10px 20px rgba(255,255,255,0.3); }

  /* Typography & Utilities */
  .text-title { font-family: var(--font-heading); font-weight: 500; font-size: 3.2rem; letter-spacing: -0.03em; line-height: 1.1; color: var(--text-primary); }
  .text-subtitle { font-family: var(--font-body); font-weight: 600; font-size: 0.8rem; letter-spacing: 0.12em; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px; display: block;}
  .text-metric { font-family: var(--font-heading); font-weight: 300; font-size: 3.2rem; letter-spacing: -0.04em; color: var(--text-primary); }
  
  .btn-primary { background: var(--accent); color: #000; border: none; padding: 14px 28px; border-radius: 100px; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255,255,255,0.15); }
  .btn-secondary { background: rgba(255,255,255,0.04); color: var(--text-primary); border: 1px solid var(--border-subtle); }
  .btn-icon { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s;}
  .btn-icon:hover { color: var(--text-primary); background: rgba(255,255,255,0.08); }
  .btn-icon.danger:hover { color: var(--danger); background: rgba(244, 63, 94, 0.12); }
  
  .status-pill { display: inline-flex; padding: 6px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); }
  .council-tag { background: rgba(234, 179, 8, 0.15); color: var(--council); border-color: rgba(234, 179, 8, 0.3); box-shadow: 0 0 15px rgba(234, 179, 8, 0.2); }
  
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none;}
  .top-bar > * { pointer-events: auto; }
  .logo-text { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; letter-spacing: -0.02em; }
  
  .input-element { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 18px; border-radius: 14px; margin-bottom: 16px; transition: all 0.3s; font-size: 0.95rem; }
  .input-element:focus { border-color: rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); }
  
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(30px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: modalFade 0.4s var(--ease-apple); }
  .modal-window { background: #08080a; border: 1px solid var(--border-subtle); width: 100%; max-width: 540px; border-radius: 24px; padding: 40px; box-shadow: 0 50px 100px rgba(0,0,0,0.9); max-height: 90vh; overflow-y: auto; }
  @keyframes modalFade { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  /* Donut Chart */
  .donut-chart { width: 180px; height: 180px; transform: rotate(-90deg); filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5)); }
  .donut-segment-income { stroke: var(--income); fill: transparent; stroke-width: 4; stroke-linecap: round; transition: stroke-dasharray 1.5s var(--ease-apple); }
  .donut-segment-expense { stroke: var(--danger); fill: transparent; stroke-width: 4; stroke-linecap: round; transition: stroke-dasharray 1.5s var(--ease-apple); }
  .pro-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .pro-table th { text-align: left; padding: 16px; border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
  .pro-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.95rem; }

  /* Live Telemetry Feed */
  .telemetry-feed { display: flex; flex-direction: column; gap: 12px; height: 100%; overflow-y: auto; padding-right: 10px; }
  .telemetry-card { background: rgba(59, 130, 246, 0.05); border-left: 3px solid var(--nasa); padding: 16px; border-radius: 0 12px 12px 0; }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [liveNasaIndex, setLiveNasaIndex] = useState(0);

  // Data States
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const [modalMode, setModalMode] = useState(null); 
  const [formPayload, setFormPayload] = useState({});
  const scrollEngineRef = useRef(null);

  // Simulated Live NASA API Data
  const nasaLiveTelemetry = [
    { type: 'EVENT', title: '68th Annual NASA Convention', date: 'Upcoming: 2026', desc: 'National Association of Students of Architecture main convention.' },
    { type: 'TROPHY', title: 'Louis I. Kahn Trophy', date: 'Submission Open', desc: 'Documentation of architectural heritage and built environment.' },
    { type: 'PROGRAM', title: 'Observer Program Cycle 3', date: 'Active Now', desc: 'Integration protocol for newly instituted architecture colleges.' },
    { type: 'TROPHY', title: 'Reubens Trophy', date: 'Evaluation Phase', desc: 'Academic excellence and portfolio showcase evaluation.' }
  ];

  const dockItems = [
    { id: 'core', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'crew', icon: <Users size={20} />, label: 'Unit Crew' },
    { id: 'funds', icon: <Wallet size={20} />, label: 'Treasury' },
    { id: 'vault', icon: <Archive size={20} />, label: 'Vault' },
    { id: 'gallery', icon: <FileImage size={20} />, label: 'Gallery' },
    { id: 'news', icon: <Rss size={20} />, label: 'Live News' },
    { id: 'hq', icon: <Settings size={20} />, label: 'Unit Council' }
  ];

  useEffect(() => {
    // Cinematic Boot Sequence
    setTimeout(() => setIsBooting(false), 3500);

    // Live NASA Feed Rotator
    const feedInterval = setInterval(() => {
      setLiveNasaIndex(prev => (prev + 1) % nasaLiveTelemetry.length);
    }, 6000);

    const unsubs = [
      onSnapshot(doc(db, "unit", "hq"), d => { d.exists() && setLeadership({ ...leadership, ...d.data() }); }),
      onSnapshot(collection(db, "crew"), s => setCrewData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "finances"), s => setFinancialLog(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "vault"), s => setVaultData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "gallery"), s => setGalleryData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "news"), s => setNewsData(s.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];
    return () => { unsubs.forEach(unsub => unsub()); clearInterval(feedInterval); };
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

  const challengeAdmin = () => {
    if (isLeadershipMode) setIsLeadershipMode(false);
    else {
      if (prompt("Enter Authorization Key:") === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else alert("Authentication Denied.");
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
    if (window.confirm("Permanently delete this record?")) await deleteDoc(doc(db, col, id));
  };

  // ==========================================
  // RENDER BLOCKS
  // ==========================================
  const renderDashboard = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px' }}><span className="text-subtitle">System Overview</span><h1 className="text-title">Command Center</h1></div>
      <div className="bento-grid-3">
        <div className="bento-card"><span className="text-subtitle">Active Personnel</span><div className="text-metric">{crewData.length}</div></div>
        <div className="bento-card"><span className="text-subtitle">Vault Assets</span><div className="text-metric">{vaultData.length}</div></div>
        <div className="bento-card"><span className="text-subtitle">Broadcasts</span><div className="text-metric">{newsData.length}</div></div>
      </div>
    </div>
  );

  const renderCrew = () => {
    // Sort logic: 1st Year to 5th Year, then Alumni.
    const sortedCrew = [...crewData].sort((a, b) => {
      const order = { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "Alumni": 6 };
      return (order[a.year] || 99) - (order[b.year] || 99);
    });

    // Group by Year for display
    const allocation = sortedCrew.reduce((acc, u) => { const y = u.year||"Unassigned"; if(!acc[y]) acc[y]=[]; acc[y].push(u); return acc; }, {});

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="text-subtitle">Public Roster</span><h1 className="text-title">Unit Crew</h1></div>
          {/* PUBLIC BUTTON: Anyone can add themselves */}
          <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Add Your Profile</button>
        </div>
        
        {Object.keys(allocation).map(year => (
          <div key={year} style={{ marginTop: '24px' }}>
            <span className="text-subtitle" style={{ padding: '0 16px' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `Year ${year}`}</span>
            <div className="bento-grid-2" style={{ marginTop: '16px' }}>
              {allocation[year].map(m => {
                const isCouncil = ['UD', 'USEC', 'Coordinator'].includes(m.role);
                return (
                  <div key={m.id} className="bento-card" style={{ padding: '24px', border: isCouncil ? '1px solid rgba(234, 179, 8, 0.3)' : '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <span className={`status-pill ${isCouncil ? 'council-tag' : ''}`}>
                        {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                      </span>
                      {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('crew', m.id)}><Trash2 size={14}/></button>}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>{m.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{m.email}</div>
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
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="text-subtitle">Economics</span><h1 className="text-title">Treasury</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'income' }); setModalMode('finances'); }}><Plus size={16}/> Log Entry</button>}
        </div>

        <div className="bento-grid-2">
          {/* PIE DISTRIBUTION CHART */}
          <div className="bento-card" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <svg viewBox="0 0 36 36" className="donut-chart">
               <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
               {total > 0 && <circle className="donut-segment-income" strokeDasharray={`${incPercent} ${100 - incPercent}`} strokeDashoffset="25" cx="18" cy="18" r="15.915" />}
               {total > 0 && <circle className="donut-segment-expense" strokeDasharray={`${expPercent} ${100 - expPercent}`} strokeDashoffset={25 - incPercent} cx="18" cy="18" r="15.915" />}
            </svg>
            <div>
              <div style={{ marginBottom: '16px' }}><span className="text-subtitle" style={{color:'var(--income)'}}>Total Credit</span><div style={{fontSize:'1.8rem', fontWeight:'600'}}>₹{income.toLocaleString()}</div></div>
              <div><span className="text-subtitle" style={{color:'var(--danger)'}}>Total Debit</span><div style={{fontSize:'1.8rem', fontWeight:'600'}}>₹{expense.toLocaleString()}</div></div>
            </div>
          </div>
          
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle">Available Net Capital</span>
            <div className="text-metric" style={{ color: net >= 0 ? 'var(--text-primary)' : 'var(--danger)', marginBottom: '20px' }}>
              ₹{net.toLocaleString()}
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: 'var(--accent)', transition: 'width 1s ease-out' }}></div>
            </div>
            <span className="text-subtitle" style={{ marginTop: '10px', textAlign: 'right' }}>Goal: ₹{goal.toLocaleString()}</span>
          </div>
        </div>

        <div className="bento-card" style={{ padding: '0', overflowX: 'auto' }}>
           <table className="pro-table">
             <thead><tr><th>Transaction Matrix</th><th>Description Detail</th><th>Value Flow</th>{isLeadershipMode && <th>Action</th>}</tr></thead>
             <tbody>
               {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'40px', color:'var(--text-secondary)'}}>No ledger data found.</td></tr>}
               {financialLog.map(f => (
                 <tr key={f.id}>
                   <td><span className="status-pill" style={{ color: f.type==='income'?'var(--income)':'var(--danger)' }}>{f.type==='income' ? 'CREDIT' : 'DEBIT'}</span></td>
                   <td style={{ fontWeight: '500' }}>{f.description}</td>
                   <td style={{ fontWeight:'600', color: f.type==='income'?'var(--text-primary)':'var(--text-secondary)' }}>
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

  const renderVault = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
        <div><span className="text-subtitle">Storage</span><h1 className="text-title">Vault</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'Design' }); setModalMode('vault'); }}><Plus size={16}/> Upload</button>}
      </div>
      <div className="bento-grid-3">
        {vaultData.map(v => (
          <div key={v.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="status-pill">{v.type}</span>
              {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-8px'}} onClick={() => deleteDocRecord('vault', v.id)}><Trash2 size={14}/></button>}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '24px' }}>{v.title}</div>
            <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn-primary btn-secondary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>Access Data Node <ArrowUpRight size={14}/></a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
        <div><span className="text-subtitle">Showcase</span><h1 className="text-title">Gallery Hub</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image' }); setModalMode('gallery'); }}><Plus size={16}/> Add Project</button>}
      </div>
      <div className="bento-grid-2">
        {galleryData.map(g => (
          <div key={g.id} className="bento-card" style={{ padding: 0 }}>
            <div style={{ height: '220px', background: g.fileType === 'Image' ? 'url("' + g.link + '") center/cover' : 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {g.fileType !== 'Image' && <Component size={32} color="var(--text-tertiary)" />}
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill">{g.category}</span>
                {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-6px'}} onClick={() => deleteDocRecord('gallery', g.id)}><Trash2 size={14}/></button>}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>{g.title}</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px', fontSize: '0.9rem', lineHeight: '1.6' }}>{g.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="bento-container" style={{ maxWidth: '1200px' }}>
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Communications</span><h1 className="text-title">Live News Feed</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}><Radio size={16}/> New Broadcast</button>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '16px' }}>
        {/* Left Side: Unit Broadcasts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span className="text-subtitle">Unit Local Broadcasts</span>
          {newsData.length === 0 && <div className="text-body">No active broadcasts on the network.</div>}
          {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
            <div key={n.id} className="bento-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span className="status-pill">{n.tag}</span>
                {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-6px'}} onClick={() => deleteDocRecord('news', n.id)}><Trash2 size={16}/></button>}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '500', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>{n.title}</div>
              <div className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{n.content}</div>
              <div className="text-subtitle" style={{ marginTop: '32px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', marginBottom: 0 }}>
                Published: {new Date(n.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: NASA Auto-Uplink */}
        <div className="bento-card" style={{ background: 'rgba(5,5,8,0.6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
             <Activity size={20} color="var(--nasa)" />
             <span className="text-subtitle" style={{ margin: 0, color: 'var(--nasa)' }}>NASA Official Uplink</span>
          </div>
          <div className="telemetry-feed">
             {nasaLiveTelemetry.map((item, i) => (
                <div key={i} className="telemetry-card" style={{ opacity: i === liveNasaIndex ? 1 : 0.5, transform: i === liveNasaIndex ? 'scale(1.02)' : 'scale(1)', transition: 'all 0.5s' }}>
                  <span className="status-pill" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--nasa)', border: 'none', marginBottom: '8px' }}>{item.type}</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12}/> {item.date}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.desc}</div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUnitCouncil = () => {
    // Dynamically fetch UD, USEC, and Coordinators for the HQ Page
    const councilMembers = crewData.filter(m => ['UD', 'USEC', 'Coordinator'].includes(m.role));
    
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
          <div><span className="text-subtitle">Executive Board</span><h1 className="text-title">Unit Council</h1></div>
          {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Config</button>}
        </div>

        <div className="bento-card">
          <span className="text-subtitle">Institution Routing</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', margin: '10px 0' }}>Unit {leadership.unitCode}</div>
          <div className="text-body" style={{fontFamily: 'monospace'}}>{leadership.officialEmail}</div>
        </div>

        <span className="text-subtitle" style={{ padding: '0 16px', marginTop: '20px' }}>Active Council Members</span>
        <div className="bento-grid-2">
          {councilMembers.length === 0 && <div className="text-body" style={{padding:'0 16px'}}>No council members assigned yet. Use the Crew tab to assign roles.</div>}
          {councilMembers.map(m => (
            <div key={m.id} className="bento-card" style={{ border: '1px solid rgba(234, 179, 8, 0.3)', background: 'linear-gradient(145deg, rgba(10,10,12,0.8), rgba(234,179,8,0.05))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill council-tag">
                  {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                </span>
                <Award size={20} color="var(--council)" opacity={0.5} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: '600' }}>{m.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{m.email}</div>
              {m.phone && <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{m.phone}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* 🌟 BACKGROUND ANIMATRONICS 🌟 */}
      <div className="animatronic-bg">
        <div className="cyber-grid"></div>
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
      </div>

      {/* 🌟 FULL SCREEN BOOT SPLASH 🌟 */}
      <div className={`global-splash ${!isBooting ? 'hidden' : ''}`}>
         <div className="boot-logo">RSA CORE</div>
         <div className="text-subtitle" style={{ marginBottom: '20px', color: 'var(--nasa)' }}>INITIALIZING TELEMETRY...</div>
         <div className="progress-container"><div className="progress-bar"></div></div>
      </div>

      {/* 🌟 SIDEBAR TOGGLE BUTTON 🌟 */}
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <ChevronRight size={24} color="var(--text-primary)" /> : <Menu size={24} color="var(--text-primary)" />}
      </div>

      {/* 🌟 COLLAPSIBLE NASA SIDEBAR 🌟 */}
      <div className={`nasa-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
           <Globe size={24} color="var(--nasa)" />
           <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0 }}>NASA India</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '30px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>Secure Communications Relay & Operations Portal</p>
        
        <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="nasa-feed-item">
            <span className="text-subtitle" style={{ color: 'var(--nasa)', marginBottom: '8px' }}>Official Portal</span>
            <div style={{ fontSize: '0.95rem', fontWeight: '500', display:'flex', alignItems:'center', justifyContent: 'space-between' }}>Access Network <ArrowUpRight size={16}/></div>
          </div>
        </a>

        <a href={`mailto:${leadership.officialEmail}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="nasa-feed-item">
            <span className="text-subtitle" style={{ color: 'var(--income)', marginBottom: '8px' }}>Direct Link</span>
            <div style={{ fontSize: '0.95rem', fontWeight: '500', display:'flex', alignItems:'center', gap:'8px' }}><Mail size={16}/> Mail Command Unit</div>
          </div>
        </a>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
           <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--income)' }}></div>
           LINK STABLE | PORT 443
        </div>
      </div>

      {/* TOP NAVIGATION */}
      <div className="top-bar">
        <div className="logo-text">RSA CORE</div>
        <button className="btn-icon" onClick={challengeAdmin} style={{ pointerEvents: 'auto' }}>
          {isLeadershipMode ? <Shield size={22} color="var(--income)"/> : <ShieldAlert size={22} color="var(--text-secondary)"/>}
        </button>
      </div>

      {/* FLOATING SONAR DOCK */}
      <div className="floating-dock">
        {dockItems.map((item, i) => (
          <div key={item.id} className={`dock-item ${activeSectionIdx === i ? 'active' : ''}`} onClick={() => executeEngineNavigation(i)}>
            {item.icon}
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}
      </div>

      {/* KINETIC ENGINE WIPE CONTAINER */}
      <div className="kinetic-scroll-engine" ref={scrollEngineRef} onScroll={handleEngineScroll} style={{ paddingRight: sidebarOpen ? '360px' : '0px' }}>
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`}>{renderDashboard()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`}>{renderCrew()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`}>{renderFunds()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 3 ? 'view-active' : ''}`}>{renderVault()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 4 ? 'view-active' : ''}`}>{renderGallery()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 5 ? 'view-active' : ''}`}>{renderNews()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 6 ? 'view-active' : ''}`}>{renderUnitCouncil()}</section>
      </div>

      {/* PRO DATA MODAL */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="text-title" style={{ fontSize: '1.6rem' }}>{formPayload.id ? 'Modify' : 'Initialize'} Data Node</h2>
              <button className="btn-icon" onClick={() => setModalMode(null)}><X size={20}/></button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveToCloud(modalMode); }}>
              
              {/* PERSONNEL FORM (With Conditional Coordinator Logic & Public Access) */}
              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Full Identity Name" className="input-element" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email Address Endpoint" className="input-element" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Phone Link (Optional)" className="input-element" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  
                  <span className="text-subtitle">Hierarchy Designation</span>
                  <select required className="input-element" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Core Role...</option>
                    <option value="Member">Standard Member</option>
                    {/* Admin only can assign high roles */}
                    {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                    {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                    {isLeadershipMode && <option value="Coordinator">Coordinator Array</option>}
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <div className="slide-in-input">
                      <span className="text-subtitle" style={{color: 'var(--accent)'}}>Specify Coordinator Type</span>
                      <input required placeholder="e.g., Design, Tech, Events..." className="input-element" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} style={{borderColor: 'rgba(255,255,255,0.2)'}} />
                    </div>
                  )}

                  <span className="text-subtitle">Academic Year</span>
                  <select className="input-element" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {/* TREASURY FORM */}
              {modalMode === 'finances' && (
                <>
                  <span className="text-subtitle">Transaction Flow Protocol</span>
                  <select className="input-element" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="income">ADD FUNDS / CREDIT (Income Array)</option>
                    <option value="expense">SPEND FUNDS / DEBIT (Expense Array)</option>
                  </select>
                  <input required placeholder="Transaction Matrix Detail" className="input-element" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <input required type="number" placeholder="Value Amount (INR)" className="input-element" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                </>
              )}

              {/* HQ CONFIG FORM */}
              {modalMode === 'hq' && (
                <>
                  <span className="text-subtitle">Institution Settings</span>
                  <input placeholder="Unit Hash Identifier" className="input-element" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Core Gateway Email" className="input-element" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <span className="text-subtitle" style={{marginTop:'10px'}}>Treasury Logic</span>
                  <input type="number" placeholder="Annual Financial Goal (INR)" className="input-element" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                </>
              )}

              {/* OTHER FORMS (Vault, Gallery, News) */}
              {['vault', 'gallery', 'news'].includes(modalMode) && (
                <>
                  <input required placeholder="Title / Identifier" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <textarea placeholder="Description Payload..." className="input-element" rows="3" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
                </>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px', padding: '18px' }}>
                INITIALIZE SYNC PROTOCOL
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}