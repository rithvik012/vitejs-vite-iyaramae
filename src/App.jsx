import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import { 
  Shield, ShieldAlert, Plus, Trash2, Users, TrendingUp, 
  FolderGit2, Image as ImageIcon, Radio, Settings, X, 
  ChevronRight, ExternalLink, Zap
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
// 2. DEEP CYBER CSS ENGINE
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;600;700;800&display=swap');

  :root {
    color-scheme: dark !important; 
    --bg-base: #030712;
    --bg-surface: rgba(17, 24, 39, 0.6);
    --bg-surface-hover: rgba(31, 41, 55, 0.8);
    
    --neon-cyan: #00f0ff;
    --neon-purple: #8a2be2;
    --neon-orange: #ff3366;
    
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    
    --border-glass: rgba(255, 255, 255, 0.05);
    --border-glow-cyan: rgba(0, 240, 255, 0.3);
    
    --font-syne: 'Syne', sans-serif;
    --font-mono: 'Space Grotesk', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }

  body, html { 
    background-color: var(--bg-base);
    color: var(--text-primary);
    font-family: var(--font-mono);
    overflow: hidden; 
    height: 100dvh;
    -webkit-tap-highlight-color: transparent;
  }

  input, textarea, select { -webkit-user-select: auto; user-select: auto; color: #fff !important; background-color: rgba(0,0,0,0.5) !important; }
  .selectable-text { -webkit-user-select: auto; user-select: auto; }
  ::-webkit-scrollbar { width: 4px; } 
  ::-webkit-scrollbar-track { background: transparent; } 
  ::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.2); border-radius: 10px; }

  /* 🌟 ADVANCED GRID & GLOW BACKGROUND 🌟 */
  .cyber-grid-bg {
    position: fixed; inset: 0; z-index: -3; pointer-events: none;
    background-image: 
      linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
    animation: gridMove 20s linear infinite;
  }
  @keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 0 50px; } }

  .ambient-glows {
    position: fixed; inset: 0; z-index: -2; pointer-events: none;
    background: 
      radial-gradient(circle at 15% 50%, rgba(0, 240, 255, 0.08), transparent 40%),
      radial-gradient(circle at 85% 30%, rgba(138, 43, 226, 0.08), transparent 40%);
    filter: blur(60px);
  }

  /* 🌟 KINETIC SCROLL ENGINE 🌟 */
  .kinetic-scroll-engine {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }

  .scrolling-section {
    min-height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    opacity: 0.3;
    transform: scale(0.95) translateY(40px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scrolling-section.view-active { opacity: 1; transform: scale(1) translateY(0); }

  /* 🌟 PRO-LEVEL GLASSMORPHISM PANELS 🌟 */
  .glass-panel {
    background: var(--bg-surface);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border-glass);
    border-radius: 24px;
    padding: 40px;
    width: 100%;
    max-width: 1300px;
    height: 85vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .glass-panel::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent); opacity: 0.3;
  }

  /* 🌟 HUD NAVIGATION 🌟 */
  .hud-navigation { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 20px; z-index: 100; }
  .hud-dot-container { display: flex; align-items: center; justify-content: flex-end; cursor: pointer; position: relative; }
  .hud-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border-glass); transition: all 0.4s ease; border: 1px solid transparent; }
  .hud-dot.active { background: var(--neon-cyan); transform: scale(2); box-shadow: 0 0 15px var(--neon-cyan); }
  .hud-label { position: absolute; right: 20px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: var(--text-primary); opacity: 0; transition: opacity 0.3s ease; white-space: nowrap; text-shadow: 0 0 10px rgba(0,240,255,0.5); }
  .hud-dot-container:hover .hud-label { opacity: 1; }

  /* 🌟 CYBER CARDS & TYPOGRAPHY 🌟 */
  .section-title { font-family: var(--font-syne); font-weight: 800; font-size: 2.5rem; letter-spacing: -1px; text-transform: uppercase; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .grid-deck { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-top: 32px; }
  
  .architectural-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%);
    border: 1px solid var(--border-glass);
    border-radius: 16px; padding: 24px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative; overflow: hidden; word-wrap: break-word;
  }
  .architectural-card:hover {
    border-color: var(--border-glow-cyan);
    background: var(--bg-surface-hover);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 240, 255, 0.1);
  }
  
  /* Geometric Cut Effect for Gallery Cards */
  .gallery-card { clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%); padding-bottom: 32px; }
  .gallery-img-placeholder { height: 160px; width: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; border-radius: 8px; border: 1px solid var(--border-glass); background-size: cover; background-position: center;}

  /* 🌟 BUTTONS & BADGES 🌟 */
  .interactive-action-btn {
    background: linear-gradient(90deg, rgba(0,240,255,0.1), transparent);
    color: var(--neon-cyan); border: 1px solid var(--neon-cyan);
    padding: 10px 20px; font-family: var(--font-mono); font-weight: 600; font-size: 12px; border-radius: 8px;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;
  }
  .interactive-action-btn:hover { background: var(--neon-cyan); color: var(--bg-base); box-shadow: 0 0 20px rgba(0,240,255,0.4); }
  
  .sec-btn { border-color: var(--neon-purple); color: var(--neon-purple); background: linear-gradient(90deg, rgba(138,43,226,0.1), transparent); }
  .sec-btn:hover { background: var(--neon-purple); color: #fff; box-shadow: 0 0 20px rgba(138,43,226,0.4); }

  .badge { padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border: 1px solid var(--border-glass); }
  .badge-cyan { color: var(--neon-cyan); background: rgba(0,240,255,0.1); border-color: var(--neon-cyan); }
  .badge-purple { color: #e879f9; background: rgba(138,43,226,0.1); border-color: #e879f9; }

  /* Form Elements */
  .input-element { width: 100%; background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-glass); padding: 14px; border-radius: 8px; color: #fff; font-family: var(--font-mono); margin-bottom: 16px; transition: all 0.3s ease; }
  .input-element:focus { outline: none; border-color: var(--neon-cyan); box-shadow: 0 0 10px rgba(0,240,255,0.1); }

  /* 🌟 NASA OVERLAY PANEL 🌟 */
  .nasa-panel {
    position: fixed; right: 0; top: 0; bottom: 0; width: 450px; z-index: 200;
    background: rgba(10, 15, 30, 0.95); backdrop-filter: blur(30px);
    border-left: 1px solid var(--border-glass); box-shadow: -20px 0 50px rgba(0,0,0,0.5);
    display: flex; flex-direction: column; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nasa-panel.closed { transform: translateX(100%); }
  .nasa-panel.open { transform: translateX(0); }

  /* 🌟 TOP NAV & LOCK 🌟 */
  .top-nav { position: fixed; top: 0; left: 0; right: 0; height: 70px; background: transparent; z-index: 90; display: flex; align-items: center; padding: 0 40px; justify-content: space-between; border-bottom: 1px solid var(--border-glass); }
  
  .lockout-badge {
    position: fixed; bottom: 30px; left: 30px; z-index: 100;
    background: rgba(0,0,0,0.6); border: 1px solid var(--border-glass); backdrop-filter: blur(10px);
    padding: 10px 20px; border-radius: 30px; display: flex; align-items: center; gap: 8px; cursor: pointer;
    font-size: 11px; font-weight: 700; letter-spacing: 2px; transition: all 0.3s ease; color: var(--text-secondary);
  }
  .lockout-badge.active { border-color: var(--neon-cyan); color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0,240,255,0.2); }

  /* 🌟 SUPERNOVA SPLASH SCREEN 🌟 */
  .splash-overlay { position: fixed; inset: 0; z-index: 999999; background: var(--bg-base); display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.8s ease-in-out, visibility 0.8s; overflow: hidden; }
  .splash-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .supernova-container { position: relative; display: flex; align-items: center; justify-content: center; }
  .supernova-orb { position: absolute; width: 4px; height: 4px; background: var(--neon-cyan); border-radius: 50%; box-shadow: 0 0 80px 40px var(--neon-cyan); opacity: 0; z-index: 1; animation: explodeOrb 2.6s cubic-bezier(0.8, 0, 0.2, 1) forwards; }
  .splash-logo-text { position: relative; color: #FFF; font-size: 64px; font-family: var(--font-syne); font-weight: 800; letter-spacing: 24px; text-indent: 24px; z-index: 10; animation: textMaterialize 2s ease-in-out forwards; }
  
  @keyframes textMaterialize { 0% { opacity: 0; filter: blur(20px); transform: scale(0.8); } 30% { opacity: 1; filter: blur(0px); transform: scale(1); } 80% { opacity: 1; filter: blur(0px); transform: scale(1); } 100% { opacity: 0; filter: blur(10px); transform: scale(1.2); } }
  @keyframes explodeOrb { 0% { transform: scale(0); opacity: 0; } 45% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(2); opacity: 0.8; } 90% { transform: scale(300); opacity: 1; background: #fff;} 100% { transform: scale(300); opacity: 0; } }

  /* Modals */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
  .modal-window { background: #0b1120; border: 1px solid var(--border-glow-cyan); width: 100%; max-width: 500px; border-radius: 16px; padding: 32px; box-shadow: 0 0 40px rgba(0,240,255,0.1); }

  @media (max-width: 768px) {
    .glass-panel { height: auto; min-height: 85vh; padding: 24px; border-radius: 16px; margin-bottom: 60px;}
    .hud-navigation { display: none; }
    .top-nav { padding: 0 20px; }
    .scrolling-section { padding: 80px 10px 20px 10px; }
    .nasa-panel { width: 100%; border-left: none; }
    .lockout-badge { bottom: 20px; left: 20px; padding: 8px 16px; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [isNasaFeedOpen, setIsNasaFeedOpen] = useState(false);
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

  const structuralSections = [
    { id: 'core', label: 'Command Center' },
    { id: 'crew', label: 'Unit Crew' },
    { id: 'funds', label: 'Treasury Ledger' },
    { id: 'vault', label: 'Knowledge Vault' },
    { id: 'gallery', label: 'Portfolio Gallery' },
    { id: 'news', label: 'Unit Broadcasts' },
    { id: 'hq', label: 'HQ Operations' }
  ];

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 2700);

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
      const entryToken = prompt("ENTER SYSTEM OVERRIDE KEY:");
      if (entryToken === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else if (entryToken) alert("ACCESS DENIED.");
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
    if (window.confirm("Purge record permanently?")) await deleteDoc(doc(db, targetCollection, docId));
  };

  const executeBatchPromotionSequence = async () => {
    if (!window.confirm("⚠️ Advance all academic tiers? (5th Years become Alumni)")) return;
    try {
      const operationBatch = writeBatch(db);
      crewData.forEach((member) => {
        let advancedYear = member.year;
        if (Number(member.year) >= 1 && Number(member.year) < 5) advancedYear = Number(member.year) + 1;
        else if (Number(member.year) === 5 || member.year === "5") advancedYear = "Alumni";
        if (advancedYear !== member.year) operationBatch.update(doc(db, 'crew', member.id), { year: advancedYear });
      });
      await operationBatch.commit();
      alert("ACADEMIC TIERS ADVANCED.");
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
  // RENDER BLOCKS (7 SECTIONS)
  // -------------------------
  const renderDashboard = () => (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--neon-cyan)' }}>UNIT {leadership.unitCode}</div>
          <h1 className="section-title" style={{ marginTop: '8px' }}>COMMAND CENTER</h1>
        </div>
      </div>
      <div className="grid-deck">
        <div className="architectural-card">
          <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)', fontSize: '12px', letterSpacing: '2px' }}><Users size={16} color="var(--neon-cyan)"/> ACTIVE CREW</div>
          <div style={{ fontSize: '48px', fontWeight: '800', marginTop: '16px', fontFamily: 'var(--font-syne)', color: '#fff' }}>{crewData.length}</div>
        </div>
        <div className="architectural-card">
          <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)', fontSize: '12px', letterSpacing: '2px' }}><TrendingUp size={16} color="var(--neon-purple)"/> CAPITAL LEDGER</div>
          <div style={{ fontSize: '36px', fontWeight: '800', marginTop: '24px', fontFamily: 'var(--font-syne)', color: '#fff' }}>
            ₹{financialLog.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0) - financialLog.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0)}
          </div>
        </div>
        <div className="architectural-card">
          <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)', fontSize: '12px', letterSpacing: '2px' }}><FolderGit2 size={16} color="var(--neon-orange)"/> VAULT ASSETS</div>
          <div style={{ fontSize: '48px', fontWeight: '800', marginTop: '16px', fontFamily: 'var(--font-syne)', color: '#fff' }}>{vaultData.length}</div>
        </div>
      </div>
      <h3 style={{ fontFamily: 'var(--font-syne)', marginTop: '48px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>ACTIVE CAMPAIGNS</h3>
      <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
        {campaignData.map(c => (
          <div key={c.id} className="architectural-card" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{c.title} <span style={{fontSize:'12px', color:'var(--text-secondary)'}}>({c.year})</span></div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Prize: {c.prize}</div>
            </div>
            <div className={`badge ${c.abstractsClosed==='true'?'':'badge-cyan'}`}>{c.abstractsClosed==='true'?'Closed':'Open'}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCrew = () => {
    const allocation = crewData.reduce((acc, u) => { const y = u.year||"Unassigned"; if(!acc[y]) acc[y]=[]; acc[y].push(u); return acc; }, {});
    const sortedYears = Object.keys(allocation).sort((a,b) => (a==="Alumni"||a==="Unassigned"?1:b==="Alumni"||b==="Unassigned"?-1:Number(a)-Number(b)));

    return (
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div><div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--neon-cyan)' }}>ROSTER INTERFACE</div><h1 className="section-title">UNIT CREW</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && <button className="interactive-action-btn sec-btn" onClick={executeBatchPromotionSequence}>ADVANCE BATCHES</button>}
            <button className="interactive-action-btn" onClick={() => { setFormPayload({ year: '1' }); setModalMode('crew'); }}><Plus size={16} /> ADD</button>
          </div>
        </div>
        {sortedYears.map(year => (
          <div key={year} style={{ marginTop: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-syne)', color: 'var(--neon-purple)', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid var(--border-glass)', paddingBottom: '8px' }}>
              {year === 'Alumni' || year === 'Unassigned' ? year : `YEAR ${year}`}
            </h3>
            <div className="grid-deck">
              {allocation[year].map(m => (
                <div key={m.id} className="architectural-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div className={`badge ${m.role==='Unit Designee'?'badge-purple':'badge-cyan'}`}>{m.role}</div>
                    {isLeadershipMode && <button className="sec-btn" style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={() => removeDocumentRecord('crew', m.id)}><Trash2 size={14} color="#ef4444"/></button>}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-syne)' }}>{m.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{m.email}</div>
                  <div style={{ fontSize: '12px', color: 'var(--neon-cyan)', marginTop: '16px' }}>SKILLS: <span style={{color:'#fff'}}>{m.skills || 'N/A'}</span></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFunds = () => (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--neon-cyan)' }}>FINANCIAL SYSTEM</div><h1 className="section-title">TREASURY</h1></div>
        {isLeadershipMode && <button className="interactive-action-btn" onClick={() => { setFormPayload({ type: 'expense' }); setModalMode('finances'); }}><Plus size={16} /> LOG</button>}
      </div>
      <div style={{ marginTop: '32px', display: 'grid', gap: '16px' }}>
        {financialLog.map(f => (
          <div key={f.id} className="architectural-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
            <div>
              <div className={`badge ${f.type==='income'?'badge-cyan':''}`} style={{marginBottom:'8px'}}>{f.type}</div>
              <div style={{ fontSize: '16px', color: '#fff', fontWeight: '600' }}>{f.description}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{f.date || 'No Date'}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '24px', fontFamily: 'var(--font-mono)', fontWeight: '700', color: f.type==='income'?'#22c55e':'#ef4444' }}>
                {f.type==='income'?'+':'-'}₹{Number(f.amount).toLocaleString()}
              </div>
              {isLeadershipMode && <button style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={() => removeDocumentRecord('finances', f.id)}><X size={16} color="var(--text-secondary)"/></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVault = () => (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--neon-cyan)' }}>CLOUD STORAGE</div><h1 className="section-title">KNOWLEDGE VAULT</h1></div>
        <button className="interactive-action-btn" onClick={() => { setFormPayload({ type: 'Design' }); setModalMode('vault'); }}><Plus size={16} /> UPLOAD</button>
      </div>
      <div className="grid-deck">
        {vaultData.map(v => (
          <div key={v.id} className="architectural-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="badge badge-purple">{v.type} | {v.year}</div>
              {isLeadershipMode && <button style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={() => removeDocumentRecord('vault', v.id)}><X size={14} color="#ef4444"/></button>}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{v.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '24px' }}>Size: {v.size}</div>
            <a href={v.link||'#'} target="_blank" rel="noreferrer" className="interactive-action-btn sec-btn" style={{width:'100%', justifyContent:'center'}}>DOWNLOAD <ExternalLink size={14}/></a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--neon-cyan)' }}>PORTFOLIO</div><h1 className="section-title">GALLERY</h1></div>
        <button className="interactive-action-btn" onClick={() => { setFormPayload({ fileType: 'Image' }); setModalMode('gallery'); }}><ImageIcon size={16} /> ADD WORK</button>
      </div>
      <div className="grid-deck">
        {galleryData.map(g => (
          <div key={g.id} className="architectural-card gallery-card">
            <div className="gallery-img-placeholder" style={g.fileType === 'Image' ? { backgroundImage: `url(${g.link})` } : {}}>
              {g.fileType !== 'Image' && <span style={{color:'var(--neon-cyan)', fontSize:'12px', letterSpacing:'2px'}}>{g.fileType} LINK</span>}
            </div>
            <div className="badge badge-cyan" style={{marginBottom:'12px'}}>{g.category}</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{g.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '16px' }}>{g.description}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
              <div style={{ fontSize: '10px', color: 'var(--neon-purple)', letterSpacing: '1px' }}>BY: {g.authorName}</div>
              {g.link && <a href={g.link} target="_blank" rel="noreferrer" style={{color:'var(--neon-cyan)', textDecoration:'none', fontSize:'12px', fontWeight:'600'}}>VIEW ↗</a>}
            </div>
            {isLeadershipMode && <button style={{position:'absolute', top:'10px', right:'10px', background:'rgba(0,0,0,0.5)', border:'none', padding:'6px', borderRadius:'50%', cursor:'pointer'}} onClick={() => removeDocumentRecord('gallery', g.id)}><Trash2 size={12} color="#ef4444"/></button>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--neon-cyan)' }}>COMMUNICATIONS</div><h1 className="section-title">BROADCASTS</h1></div>
        {isLeadershipMode && <button className="interactive-action-btn" onClick={() => { setFormPayload({}); setModalMode('news'); }}><Radio size={16} /> BROADCAST</button>}
      </div>
      <div style={{ display: 'grid', gap: '24px', marginTop: '32px' }}>
        {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
          <div key={n.id} className="architectural-card" style={{ borderLeft: '4px solid var(--neon-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="badge badge-purple">{n.tag}</div>
              {isLeadershipMode && <button style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={() => removeDocumentRecord('news', n.id)}><X size={16} color="#ef4444"/></button>}
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-syne)', marginBottom: '12px' }}>{n.title}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{n.content}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '12px', letterSpacing: '1px' }}>
              LOGGED: {new Date(n.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHQ = () => (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--neon-cyan)' }}>ADMINISTRATION</div><h1 className="section-title">UNIT HQ</h1></div>
        {isLeadershipMode && <button className="interactive-action-btn sec-btn" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16} /> CONFIG</button>}
      </div>
      <div className="architectural-card" style={{ marginTop: '32px', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>INSTITUTION IDENTIFIER</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-syne)', margin: '8px 0 16px 0' }}>UNIT {leadership.unitCode}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>OFFICIAL SECURE MAILBOX</div>
        <div style={{ fontSize: '16px', color: 'var(--neon-cyan)', marginTop: '4px' }}>{leadership.officialEmail}</div>
      </div>
      <div className="grid-deck">
        <div className="architectural-card">
          <div className="badge badge-cyan" style={{marginBottom:'16px'}}>UNIT DESIGNEE (UD)</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-syne)' }}>{leadership.udName || 'Pending'}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>TEL: {leadership.udPhone || 'N/A'}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>MAIL: {leadership.udEmail || 'N/A'}</div>
        </div>
        <div className="architectural-card">
          <div className="badge badge-purple" style={{marginBottom:'16px'}}>UNIT SECRETARY (USEC)</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-syne)' }}>{leadership.useName || 'Pending'}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>TEL: {leadership.usePhone || 'N/A'}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>MAIL: {leadership.useEmail || 'N/A'}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* BACKGROUND ELEMENTS */}
      <div className="cyber-grid-bg"></div>
      <div className="ambient-glows"></div>

      {/* SUPERNOVA SPLASH SCREEN */}
      <div className={`splash-overlay ${!isBooting ? 'hidden' : ''}`}>
        <div className="supernova-container">
          <div className="supernova-orb"></div>
          <div className="splash-logo-text">Z649</div>
        </div>
        <div className="splash-sub">ESTABLISHING SECURE UPLINK</div>
      </div>

      {/* TOP NAVIGATION & NASA TOGGLE */}
      <div className="top-nav">
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '2px' }}>RSA</h1>
        <button className="interactive-action-btn" onClick={() => setIsNasaFeedOpen(!isNasaFeedOpen)}>
          NASA OFFICIAL FEED <Zap size={14} />
        </button>
      </div>

      {/* HUD NAVIGATION (Desktop) */}
      <div className="hud-navigation">
        {structuralSections.map((sec, i) => (
          <div key={sec.id} className="hud-dot-container" onClick={() => executeEngineNavigation(i)}>
            <div className="hud-label">{sec.label}</div>
            <div className={`hud-dot ${activeSectionIdx === i ? 'active' : ''}`}></div>
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

      {/* NASA OVERLAY PANEL */}
      <div className={`nasa-panel ${isNasaFeedOpen ? 'open' : 'closed'}`}>
        <div style={{ padding: '30px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--neon-cyan)', letterSpacing: '2px' }}>LIVE SYNC</div>
            <h2 className="syne" style={{ color: '#fff', fontSize: '20px', marginTop: '4px' }}>NASA INDIA</h2>
          </div>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setIsNasaFeedOpen(false)}><X color="#fff"/></button>
        </div>
        <div style={{ padding: '30px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { tag: "THEME 2026", title: "CATALYSE", desc: "A catalyst doesn't wait for change. It creates movement, breaks inertia, and opens new paths." },
            { tag: "TROPHY", title: "Louis I. Kahn Trophy", desc: "Understanding the interrelations among the five elemental forces and the building envelope." },
            { tag: "COMPETITION", title: "HUDCO Trophy", desc: "Designing for the informal sector and giving design alternatives for Sustainable Urban Development." }
          ].map((n, i) => (
            <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '2px solid var(--neon-cyan)' }}>
              <div className="badge badge-cyan" style={{marginBottom:'12px'}}>{n.tag}</div>
              <h3 style={{ color: '#fff', fontFamily: 'var(--font-syne)', fontSize: '16px', marginBottom: '8px' }}>{n.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>{n.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECURITY LOCKOUT BADGE */}
      <div className={`lockout-badge ${isLeadershipMode ? 'active' : ''}`} onClick={challengeAdminAuthorization}>
        {isLeadershipMode ? <Shield size={14} /> : <ShieldAlert size={14} />}
        <span>{isLeadershipMode ? "SYSTEM UNLOCKED" : "SECURE CORE"}</span>
      </div>

      {/* MODALS */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 className="syne" style={{ color: '#fff', fontSize: '20px', textTransform: 'uppercase' }}>{formPayload.id ? 'EDIT' : 'NEW'} ENTRY</h2>
              <X style={{ cursor: 'pointer', color: '#fff' }} onClick={() => setModalMode(null)}/>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); ['news', 'campaigns'].includes(modalMode) ? handleSaveAndEmail(modalMode) : handleSaveToCloud(modalMode); }}>
              
              {modalMode === 'crew' && (
                <>
                  <input required placeholder="Name" className="input-element" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input placeholder="Role" className="input-element" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})} />
                  <input type="email" placeholder="Email" className="input-element" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Phone" className="input-element" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  <input placeholder="Skills" className="input-element" value={formPayload.skills||''} onChange={e=>setFormPayload({...formPayload, skills:e.target.value})} />
                  <select className="input-element" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <input required placeholder="Description" className="input-element" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <input required type="number" placeholder="Amount" className="input-element" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                  <select className="input-element" value={formPayload.type||'expense'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="expense">Expense (-)</option><option value="income">Income (+)</option>
                  </select>
                </>
              )}

              {modalMode === 'vault' && (
                <>
                  <input required placeholder="Title" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <input placeholder="Size (e.g. 45MB)" className="input-element" value={formPayload.size||''} onChange={e=>setFormPayload({...formPayload, size:e.target.value})} />
                  <input placeholder="URL Link" className="input-element" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                  <select className="input-element" value={formPayload.type||'Design'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="Design">Design</option><option value="Finance">Finance</option><option value="Admin">Admin</option>
                  </select>
                </>
              )}

              {modalMode === 'gallery' && (
                <>
                  <input required placeholder="Title" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <input placeholder="Author" className="input-element" value={formPayload.authorName||''} onChange={e=>setFormPayload({...formPayload, authorName:e.target.value})} />
                  <input placeholder="URL Link / Image Link" className="input-element" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />
                  <select className="input-element" value={formPayload.fileType||'Drive Link'} onChange={e=>setFormPayload({...formPayload, fileType:e.target.value})}>
                    <option value="Drive Link">Drive Link</option><option value="Image">Image</option><option value="PDF">PDF</option>
                  </select>
                </>
              )}

              {modalMode === 'news' && (
                <>
                  <input required placeholder="Tag" className="input-element" value={formPayload.tag||''} onChange={e=>setFormPayload({...formPayload, tag:e.target.value})} />
                  <input required placeholder="Subject / Title" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <textarea rows="4" placeholder="Message" className="input-element" value={formPayload.content||''} onChange={e=>setFormPayload({...formPayload, content:e.target.value})}></textarea>
                </>
              )}

              {modalMode === 'campaigns' && (
                <>
                  <input required placeholder="Trophy Name" className="input-element" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  <input placeholder="Year" className="input-element" value={formPayload.year||''} onChange={e=>setFormPayload({...formPayload, year:e.target.value})} />
                  <input placeholder="Prize" className="input-element" value={formPayload.prize||''} onChange={e=>setFormPayload({...formPayload, prize:e.target.value})} />
                  <select className="input-element" value={formPayload.abstractsClosed||'false'} onChange={e=>setFormPayload({...formPayload, abstractsClosed:e.target.value})}>
                    <option value="false">Open</option><option value="true">Closed</option>
                  </select>
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <input placeholder="Unit Code" className="input-element" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Official Email" className="input-element" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <input placeholder="UD Name" className="input-element" value={formPayload.udName||''} onChange={e=>setFormPayload({...formPayload, udName:e.target.value})} />
                  <input placeholder="USEC Name" className="input-element" value={formPayload.useName||''} onChange={e=>setFormPayload({...formPayload, useName:e.target.value})} />
                </>
              )}

              <button type="submit" className="interactive-action-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }} disabled={isSendingEmail}>
                {isSendingEmail ? 'PROCESSING...' : 'COMMIT TO CORE'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}