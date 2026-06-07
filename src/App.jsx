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
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  :root {
    color-scheme: dark !important; 
    --bg-base: #000000;
    --bg-surface: rgba(20, 20, 20, 0.4);
    --bg-surface-hover: rgba(35, 35, 35, 0.6);
    
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --text-tertiary: #52525b;
    
    --border-subtle: rgba(255, 255, 255, 0.08);
    --border-highlight: rgba(255, 255, 255, 0.2);
    
    --accent: #ffffff;
    --danger: #ef4444;
    --success: #10b981;
    
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;

    /* Custom easing for "Apple-like" fluid motion */
    --ease-fluid: cubic-bezier(0.22, 1, 0.36, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }

  body, html { 
    background-color: var(--bg-base);
    color: var(--text-primary);
    font-family: var(--font-body);
    overflow: hidden; 
    height: 100dvh;
    -webkit-tap-highlight-color: transparent;
  }

  input, textarea, select { -webkit-user-select: auto; user-select: auto; color: #fff !important; background-color: rgba(255,255,255,0.05) !important; }
  .selectable-text { -webkit-user-select: auto; user-select: auto; }
  ::-webkit-scrollbar { width: 0px; } /* Invisible scrollbar for cleaner look */

  /* 🌟 AMBIENT AURORA BACKGROUND (Pro Designer Aesthetic) 🌟 */
  .ambient-aurora {
    position: fixed; inset: 0; z-index: -3; pointer-events: none;
    background: #000000;
    overflow: hidden;
  }
  .ambient-aurora::before, .ambient-aurora::after {
    content: ''; position: absolute; width: 800px; height: 800px;
    border-radius: 50%; filter: blur(120px); opacity: 0.15;
    animation: auroraFloat 20s infinite alternate var(--ease-fluid);
  }
  .ambient-aurora::before { background: #3b82f6; top: -200px; left: -200px; }
  .ambient-aurora::after { background: #8b5cf6; bottom: -200px; right: -200px; animation-delay: -10s; }
  
  @keyframes auroraFloat {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(100px, 100px) scale(1.2); }
  }

  .noise-overlay {
    position: fixed; inset: 0; z-index: -2; pointer-events: none; opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  /* 🌟 PREMIUM KINETIC SCROLL 🌟 */
  .kinetic-scroll-engine {
    height: 100vh; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth;
  }

  .scrolling-section {
    min-height: 100vh; width: 100vw; scroll-snap-align: start; scroll-snap-stop: always;
    display: flex; align-items: center; justify-content: center;
    padding: 100px 24px 120px 24px; /* Padding bottom for the new dock */
    opacity: 0; transform: translateY(30px);
    transition: all 1.2s var(--ease-fluid);
  }
  .scrolling-section.view-active { opacity: 1; transform: translateY(0); }

  /* 🌟 BENTO BOX PANELS 🌟 */
  .bento-container {
    width: 100%; max-width: 1200px; height: auto; max-height: 85vh; overflow-y: auto;
    scrollbar-width: none; display: flex; flex-direction: column; gap: 32px;
  }

  .bento-card {
    background: var(--bg-surface);
    backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px);
    border: 1px solid var(--border-subtle);
    border-radius: 24px; padding: 32px;
    transition: all 0.4s var(--ease-fluid);
    position: relative; overflow: hidden; word-wrap: break-word;
  }
  .bento-card:hover {
    background: var(--bg-surface-hover);
    border-color: var(--border-highlight);
  }

  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }

  /* 🌟 TYPOGRAPHY 🌟 */
  .text-title { font-family: var(--font-heading); font-weight: 500; font-size: 3rem; letter-spacing: -0.03em; line-height: 1.1; color: var(--text-primary); }
  .text-subtitle { font-family: var(--font-body); font-weight: 500; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px; display: block;}
  .text-metric { font-family: var(--font-heading); font-weight: 400; font-size: 3.5rem; letter-spacing: -0.04em; color: var(--text-primary); }
  .text-body { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; }

  /* 🌟 MINIMALIST BUTTONS 🌟 */
  .btn-primary {
    background: var(--accent); color: #000; border: none;
    padding: 12px 24px; border-radius: 100px;
    font-family: var(--font-body); font-weight: 500; font-size: 0.85rem;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.3s var(--ease-fluid);
  }
  .btn-primary:hover { transform: scale(1.02); opacity: 0.9; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  
  .btn-secondary { background: rgba(255,255,255,0.05); color: var(--text-primary); border: 1px solid var(--border-subtle); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: var(--border-highlight); }

  .btn-icon { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 6px; border-radius: 50%; transition: all 0.2s; display: flex; align-items: center; justify-content: center;}
  .btn-icon:hover { color: var(--text-primary); background: rgba(255,255,255,0.1); }
  .btn-icon.danger:hover { color: var(--danger); background: rgba(239, 68, 68, 0.1); }

  .status-pill { display: inline-flex; padding: 4px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; background: rgba(255,255,255,0.1); color: var(--text-primary); }

  /* 🌟 MAC-STYLE FLOATING DOCK 🌟 */
  .floating-dock {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: rgba(15, 15, 15, 0.6); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    border: 1px solid var(--border-subtle); border-radius: 100px;
    display: flex; gap: 4px; padding: 6px; z-index: 100;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }
  .dock-item {
    width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary); cursor: pointer; transition: all 0.3s var(--ease-fluid); position: relative;
  }
  .dock-item:hover { color: var(--text-primary); background: rgba(255,255,255,0.08); transform: translateY(-4px); }
  .dock-item.active { color: #000; background: var(--accent); }
  
  /* Tooltip for Dock */
  .dock-tooltip {
    position: absolute; top: -40px; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
    padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.05em;
    border: 1px solid var(--border-subtle); opacity: 0; pointer-events: none; transition: all 0.2s; white-space: nowrap;
  }
  .dock-item:hover .dock-tooltip { opacity: 1; top: -45px; }

  /* 🌟 TOP NAVIGATION 🌟 */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; }
  .logo-text { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; }

  /* 🌟 FORM ELEMENTS 🌟 */
  .input-element { width: 100%; border: 1px solid var(--border-subtle); padding: 16px; border-radius: 12px; font-family: var(--font-body); font-size: 0.95rem; margin-bottom: 16px; transition: all 0.3s ease; }
  .input-element:focus { border-color: var(--border-highlight); box-shadow: 0 0 0 4px rgba(255,255,255,0.05); }

  /* 🌟 MODALS 🌟 */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: modalFadeIn 0.4s var(--ease-fluid); }
  .modal-window { background: #0a0a0a; border: 1px solid var(--border-subtle); width: 100%; max-width: 500px; border-radius: 24px; padding: 40px; box-shadow: 0 40px 80px rgba(0,0,0,0.8); }
  @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  /* 🌟 CINEMATIC SPLASH SCREEN 🌟 */
  .splash-overlay { position: fixed; inset: 0; z-index: 999999; background: #000; display: flex; align-items: center; justify-content: center; transition: opacity 1.5s var(--ease-fluid), visibility 1.5s; }
  .splash-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
  .splash-logo { color: #fff; font-family: var(--font-heading); font-size: 2.5rem; font-weight: 400; letter-spacing: 0.2em; opacity: 0; animation: cinematicReveal 2.5s var(--ease-fluid) forwards; }
  @keyframes cinematicReveal { 0% { opacity: 0; filter: blur(20px); transform: scale(0.95); } 40% { opacity: 1; filter: blur(0px); transform: scale(1); } 80% { opacity: 1; filter: blur(0px); transform: scale(1); } 100% { opacity: 0; filter: blur(10px); transform: scale(1.05); } }

  /* Mobile Adjustments */
  @media (max-width: 768px) {
    .scrolling-section { padding: 80px 16px 100px 16px; }
    .bento-card { padding: 24px; }
    .text-title { font-size: 2.2rem; }
    .top-bar { padding: 20px; }
    .floating-dock { bottom: 20px; width: 90%; justify-content: space-between; padding: 8px 16px; }
    .dock-item { width: 40px; height: 40px; }
    .dock-tooltip { display: none; }
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