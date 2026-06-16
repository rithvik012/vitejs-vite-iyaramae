import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import { 
  Shield, ShieldAlert, Plus, Trash2, Users, Wallet, 
  Archive, FileImage, Rss, LayoutDashboard, Settings, 
  X, ArrowUpRight, Component, Radio, Mail, Globe, Target
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

// AUTHORIZED COMMAND CREDENTIAL
const ADMIN_SECURE_KEY = "saturday"; 

// ==========================================
// 2. ULTRA-PREMIUM INTERACTION ENGINE
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  :root {
    color-scheme: dark !important; 
    --bg-base: #020204;
    --bg-surface: rgba(10, 10, 12, 0.45);
    --bg-surface-hover: rgba(22, 22, 26, 0.7);
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --border-subtle: rgba(255, 255, 255, 0.08);
    --accent: #ffffff;
    --danger: #f43f5e;
    --income: #10b981;
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
  body, html { 
    background-color: var(--bg-base); color: var(--text-primary);
    font-family: var(--font-body); overflow: hidden; height: 100dvh;
  }
  input, textarea, select { user-select: auto; color: #fff !important; background-color: rgba(255,255,255,0.03) !important; outline: none; }
  ::-webkit-scrollbar { width: 0px; }

  /* Ambient Blur */
  .ambient-aurora { position: fixed; inset: 0; z-index: -3; pointer-events: none; background: #020204; overflow: hidden; }
  .ambient-aurora::before, .ambient-aurora::after {
    content: ''; position: absolute; width: 700px; height: 700px; border-radius: 50%; filter: blur(140px); opacity: 0.12;
    animation: auroraFloat 25s infinite alternate var(--ease-apple);
  }
  .ambient-aurora::before { background: #2563eb; top: -150px; left: -150px; }
  .ambient-aurora::after { background: #7c3aed; bottom: -150px; right: -150px; animation-delay: -8s; }
  @keyframes auroraFloat { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(80px, 60px) scale(1.15); } }

  /* 🌟 ADVANCED RISING IRIS WIPE TRANSITION 🌟 */
  .kinetic-scroll-engine { height: 100vh; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; padding-right: 320px; }
  .scrolling-section {
    min-height: 100vh; width: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 100px 24px 120px 24px;
    opacity: 0; filter: blur(20px); transform: translateY(30px) scale(0.95);
    clip-path: circle(0% at 50% 100%);
    transition: clip-path 1.2s var(--ease-apple), opacity 0.8s var(--ease-apple), filter 0.8s var(--ease-apple), transform 1s var(--ease-apple);
  }
  .scrolling-section.view-active { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); clip-path: circle(180% at 50% 100%); }

  /* Layout */
  .bento-container { width: 100%; max-width: 1050px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; scrollbar-width: none; }
  .bento-card { background: var(--bg-surface); backdrop-filter: blur(40px); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 32px; transition: all 0.4s var(--ease-apple); position: relative; overflow: hidden; }
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }

  /* 🌟 NASA LIVE FEED SIDEBAR 🌟 */
  .nasa-sidebar {
    position: fixed; right: 0; top: 0; bottom: 0; width: 320px;
    background: rgba(5, 5, 8, 0.7); backdrop-filter: blur(50px);
    border-left: 1px solid var(--border-subtle); z-index: 80;
    padding: 30px 24px; display: flex; flex-direction: column;
    box-shadow: -20px 0 60px rgba(0,0,0,0.6); transition: transform 0.4s var(--ease-apple);
  }
  .nasa-feed-item {
    background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle);
    padding: 16px; border-radius: 12px; margin-bottom: 12px;
    transition: all 0.3s var(--ease-apple); cursor: pointer; position: relative; overflow: hidden;
  }
  .nasa-feed-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: transparent; transition: background 0.3s; }
  .nasa-feed-item:hover { transform: translateX(-5px); border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); }
  .nasa-feed-item:hover::before { background: var(--accent); }

  /* 🌟 LIQUID SPLASH DOCK ICONS 🌟 */
  .floating-dock {
    position: fixed; bottom: 32px; left: calc(50% - 160px); transform: translateX(-50%);
    background: rgba(10, 10, 12, 0.7); backdrop-filter: blur(30px); border: 1px solid var(--border-subtle); border-radius: 100px; display: flex; gap: 8px; padding: 8px; z-index: 100; box-shadow: 0 30px 60px rgba(0,0,0,0.8);
  }
  .dock-item {
    width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary); cursor: pointer; position: relative; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .dock-item::before {
    content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--accent); opacity: 0; transform: scale(0.5); transition: all 0.4s var(--ease-apple); z-index: -1;
  }
  .dock-item.active { color: #000; transform: translateY(-8px); }
  .dock-item.active::before { opacity: 1; transform: scale(1); box-shadow: 0 10px 20px rgba(255,255,255,0.3); }
  
  /* Icon Ripple Click Effect */
  .dock-item:active::after {
    content: ''; position: absolute; inset: -10px; border-radius: 50%; border: 2px solid var(--accent);
    animation: iconRipple 0.5s ease-out forwards;
  }
  @keyframes iconRipple { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }

  .dock-tooltip { position: absolute; top: -46px; background: rgba(5,5,8,0.95); padding: 8px 16px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; border: 1px solid var(--border-subtle); opacity: 0; transition: all 0.2s; white-space: nowrap; text-transform: uppercase; color: var(--text-primary); pointer-events: none; letter-spacing: 0.05em; box-shadow: 0 10px 20px rgba(0,0,0,0.5);}
  .dock-item:hover .dock-tooltip { opacity: 1; top: -52px; }

  /* 🌟 PRO TREASURY TABLE & PIE CHART 🌟 */
  .pro-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .pro-table th { text-align: left; padding: 16px; border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
  .pro-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.95rem; }
  .pro-table tr:hover td { background: rgba(255,255,255,0.02); }
  
  .donut-chart { width: 180px; height: 180px; transform: rotate(-90deg); filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5)); }
  .donut-segment-income { stroke: var(--income); fill: transparent; stroke-width: 4; stroke-linecap: round; transition: stroke-dasharray 1.5s var(--ease-apple); }
  .donut-segment-expense { stroke: var(--danger); fill: transparent; stroke-width: 4; stroke-linecap: round; transition: stroke-dasharray 1.5s var(--ease-apple); }

  /* Typography & Forms */
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
  
  .top-bar { position: fixed; top: 0; left: 0; right: 320px; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; }
  .input-element { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 18px; border-radius: 14px; margin-bottom: 16px; transition: all 0.3s; font-size: 0.95rem; }
  .input-element:focus { border-color: rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); }
  
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(30px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: modalFade 0.4s var(--ease-apple); }
  .modal-window { background: #08080a; border: 1px solid var(--border-subtle); width: 100%; max-width: 540px; border-radius: 24px; padding: 40px; box-shadow: 0 50px 100px rgba(0,0,0,0.9); }
  @keyframes modalFade { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  /* Coordinator Input Slide Animation */
  .slide-in-input { animation: slideDown 0.4s var(--ease-apple) forwards; transform-origin: top; }
  @keyframes slideDown { from { opacity: 0; transform: scaleY(0.8) translateY(-10px); } to { opacity: 1; transform: scaleY(1) translateY(0); } }

  @media (max-width: 1024px) {
    .nasa-sidebar { display: none; }
    .kinetic-scroll-engine { padding-right: 0; }
    .floating-dock { left: 50%; }
    .top-bar { right: 0; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

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

  const dockItems = [
    { id: 'core', icon: <LayoutDashboard size={20} strokeWidth={1.5} />, label: 'Command' },
    { id: 'crew', icon: <Users size={20} strokeWidth={1.5} />, label: 'Personnel' },
    { id: 'funds', icon: <Wallet size={20} strokeWidth={1.5} />, label: 'Treasury' },
    { id: 'vault', icon: <Archive size={20} strokeWidth={1.5} />, label: 'Vault' },
    { id: 'gallery', icon: <FileImage size={20} strokeWidth={1.5} />, label: 'Gallery' },
    { id: 'hq', icon: <Settings size={20} strokeWidth={1.5} />, label: 'HQ Config' }
  ];

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 1500);
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
        <div className="bento-card">
          <span className="text-subtitle">Active Personnel</span>
          <div className="text-metric">{crewData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle">Vault Assets</span>
          <div className="text-metric">{vaultData.length}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle">Broadcasts</span>
          <div className="text-metric">{newsData.length}</div>
        </div>
      </div>
      <div className="bento-card" style={{ marginTop: '10px' }}>
        <span className="text-subtitle">System Status Log</span>
        <div style={{ color: 'var(--income)', fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '16px' }}>&gt; Core Initialization Complete.<br/>&gt; Real-time Database Socket: CONNECTED.<br/>&gt; NASA Comm Relay: STANDBY.</div>
      </div>
    </div>
  );

  const renderCrew = () => {
    const allocation = crewData.reduce((acc, u) => { const r = u.role||"Member"; if(!acc[r]) acc[r]=[]; acc[r].push(u); return acc; }, {});
    const order = ['UD', 'USEC', 'Coordinator', 'Member']; // Hierarchy Sort
    
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="text-subtitle">Database</span><h1 className="text-title">Unit Crew</h1></div>
          {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member' }); setModalMode('crew'); }}><Plus size={16}/> Assign Role</button>}
        </div>
        {order.map(roleKey => allocation[roleKey] && (
          <div key={roleKey} style={{ marginTop: '24px' }}>
            <span className="text-subtitle" style={{ padding: '0 16px' }}>{roleKey === 'UD' ? 'Unit Designee' : roleKey === 'USEC' ? 'Unit Secretary' : roleKey}</span>
            <div className="bento-grid-2" style={{ marginTop: '16px' }}>
              {allocation[roleKey].map(m => (
                <div key={m.id} className="bento-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span className="status-pill" style={{ color: roleKey==='UD'||roleKey==='USEC' ? 'var(--income)' : 'var(--text-primary)' }}>
                      {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                    </span>
                    {isLeadershipMode && <button className="btn-icon danger" onClick={() => deleteDocRecord('crew', m.id)}><Trash2 size={14}/></button>}
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>{m.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{m.email}</div>
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

    // Donut SVG Math
    const incPercent = total === 0 ? 0 : (income / total) * 100;
    const expPercent = total === 0 ? 0 : (expense / total) * 100;

    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><span className="text-subtitle">Economics</span><h1 className="text-title">Treasury Matrix</h1></div>
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

        {/* EXPENSE DATA TABLE */}
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
        <div><span className="text-subtitle">Storage</span><h1 className="text-title">Knowledge Vault</h1></div>
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
        <div><span className="text-subtitle">Showcase</span><h1 className="text-title">Portfolio Hub</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image' }); setModalMode('gallery'); }}><Plus size={16}/> Add Project</button>}
      </div>
      <div className="bento-grid-2">
        {galleryData.map(g => (
          <div key={g.id} className="bento-card" style={{ padding: 0 }}>
            {/* Safely rendering background images without breaking Vite compiler */}
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

  const renderHQ = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
        <div><span className="text-subtitle">Administration</span><h1 className="text-title">HQ Config</h1></div>
        {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Config</button>}
      </div>
      <div className="bento-grid-2">
        <div className="bento-card">
          <span className="text-subtitle">Institution Hash</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', margin: '10px 0' }}>Unit {leadership.unitCode}</div>
          <div className="text-body" style={{fontFamily: 'monospace'}}>{leadership.officialEmail}</div>
        </div>
        <div className="bento-card">
          <span className="text-subtitle">Financial Goal Target</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', margin: '10px 0', color: 'var(--income)' }}>₹{Number(leadership.financialGoal || 0).toLocaleString()}</div>
          <div className="text-body">Annual Operations Target</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="ambient-aurora"></div>

      {/* NASA INDIA LIVE SIDEBAR */}
      <div className="nasa-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
           <Globe size={24} color="var(--accent)" />
           <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0 }}>NASA India</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '30px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>Secure Communications Relay & Operations Portal</p>
        
        <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="nasa-feed-item">
            <span className="text-subtitle" style={{ color: '#3b82f6', marginBottom: '8px' }}>Official Portal</span>
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
           LINK STABLE
        </div>
      </div>

      {/* TOP NAVIGATION */}
      <div className="top-bar">
        <div className="logo-text">RSA CORE</div>
        <button className="btn-icon" onClick={challengeAdmin}>
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
      <div className="kinetic-scroll-engine" ref={scrollEngineRef} onScroll={handleEngineScroll}>
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`}>{renderDashboard()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`}>{renderCrew()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`}>{renderFunds()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 3 ? 'view-active' : ''}`}>{renderVault()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 4 ? 'view-active' : ''}`}>{renderGallery()}</section>
        <section className={`scrolling-section ${activeSectionIdx === 5 ? 'view-active' : ''}`}>{renderHQ()}</section>
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
              
              {/* PERSONNEL FORM (With Conditional Coordinator Logic) */}
              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Full Identity Name" className="input-element" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email Address Endpoint" className="input-element" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  
                  <span className="text-subtitle">Hierarchy Designation</span>
                  <select required className="input-element" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Core Role...</option>
                    <option value="UD">Unit Designee (UD)</option>
                    <option value="USEC">Unit Secretary (USEC)</option>
                    <option value="Coordinator">Coordinator Array</option>
                    <option value="Member">Standard Member</option>
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <div className="slide-in-input">
                      <span className="text-subtitle" style={{color: 'var(--accent)'}}>Specify Coordinator Type</span>
                      <input required placeholder="e.g., Design, Tech, Events..." className="input-element" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} style={{borderColor: 'rgba(255,255,255,0.2)'}} />
                    </div>
                  )}
                </>
              )}

              {/* TREASURY FORM (Credit/Debit Split) */}
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

              {/* VAULT FORM */}
              {modalMode === 'vault' && (
                <>
                  <input required placeholder="Document Asset Title" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <input placeholder="Cloud URI Source Endpoint Link" className="input-element" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                  <select className="input-element" value={formPayload.type||'Design'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="Design">Design Asset</option><option value="Finance">Financial Matrix</option><option value="Admin">Administrative</option>
                  </select>
                </>
              )}

              {/* GALLERY FORM */}
              {modalMode === 'gallery' && (
                <>
                  <input required placeholder="Project Identifier" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <select className="input-element" value={formPayload.fileType||'Image'} onChange={e=>setFormPayload({...formPayload, fileType:e.target.value})}>
                    <option value="Image">Direct Image Target (.jpg/.png)</option><option value="Drive Link">Shared Node Array Folder</option>
                  </select>
                  <input required placeholder="Asset URL Target" className="input-element" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                  <textarea placeholder="Morphological Context Summary" className="input-element" rows="3" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})}></textarea>
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