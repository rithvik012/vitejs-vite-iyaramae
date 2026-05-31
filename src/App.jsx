import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import emailjs from '@emailjs/browser'; // NEW: Email Automation Engine

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

// ==========================================
// 2. MONOCHROMATIC THEMES & ANGLES
// ==========================================
const THEMES = {
  core: { c1: "#F2F4F7", c2: "#D9E0E6", angle: 45 },      // Slate Flow
  crew: { c1: "#F5F2EF", c2: "#E6DFD5", angle: -30 },     // Sandstone Flow
  funds: { c1: "#EDF2EC", c2: "#D5E0D4", angle: 60 },      // Sage Flow
  archive: { c1: "#ECF1F5", c2: "#D4DDE6", angle: -45 },   // Steel Flow
  gallery: { c1: "#F4EFF5", c2: "#E1D5E6", angle: 15 },    // Lavender Flow
  news: { c1: "#F5F5F5", c2: "#DFDFDF", angle: 90 },       // Silver Flow
  hq: { c1: "#EDEEED", c2: "#C6C8C6", angle: 0 }           // Charcoal Flow
};

// ==========================================
// 3. FLUID CSS ENGINE
// ==========================================
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

:root {
  --bg-card: rgba(255, 255, 255, 0.65); 
  --text-main: #1A1A1A; 
  --text-muted: #5A5A5A;
  --border-light: rgba(0, 0, 0, 0.08); 
  --accent-primary: #111111;
  --accent-secondary: rgba(0,0,0,0.04); 
  --success: #2A7249;
}

body, html { 
  margin: 0; padding: 0; height: 100dvh; overflow: hidden; 
  color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; 
  -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent;
}

input, textarea, .selectable-text { -webkit-user-select: auto; user-select: auto; }
* { box-sizing: border-box; }
::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
.syne { font-family: 'Syne', sans-serif; } .mono { font-family: 'Space Mono', monospace; }

/* 🌟 LIQUID BACKGROUND 🌟 */
.liquid-bg {
  position: fixed; inset: -50%; z-index: -2; pointer-events: none;
  background-size: 200% 200%;
  animation: liquidBreathe 12s ease-in-out infinite;
  transition: background-image 1.5s ease-in-out;
}
@keyframes liquidBreathe { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

/* 🌟 ROTATING FLOWING LINES 🌟 */
.flowing-lines-layer {
  position: fixed; width: 300vw; height: 300vh; top: -100vh; left: -100vw; z-index: -1; pointer-events: none;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0,0,0,0.025) 15px, rgba(0,0,0,0.025) 17px);
  transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: streamLines 30s linear infinite;
}
@keyframes streamLines { 0% { background-position: 0px 0px; } 100% { background-position: 0px 1000px; } }

/* UI Alignment */
.app-layout { display: flex; height: 100dvh; width: 100vw; padding-top: 70px; position: relative; }
.main-content { flex: 1; overflow-y: auto; padding: 40px; display: flex; flex-direction: column; align-items: center; }
.content-wrapper { width: 100%; max-width: 1150px; margin: 0 auto; }

.top-nav { position: fixed; top: 0; left: 0; right: 0; height: 70px; background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-bottom: 1px solid var(--border-light); z-index: 50; display: flex; align-items: center; padding: 0 40px; justify-content: space-between; }
.rsa-menu-container { position: relative; display: inline-block; }
.rsa-trigger { display: flex; align-items: center; gap: 12px; padding: 8px 16px; border-radius: 8px; transition: all 0.2s; cursor: pointer; }
.rsa-trigger:hover { background: var(--accent-secondary); }
.rsa-dropdown { position: absolute; top: 60px; left: 0; width: 240px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid var(--border-light); border-radius: 16px; padding: 12px; box-shadow: 0 24px 48px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 4px; transform-origin: top left; animation: menuPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; font-weight: 600; color: var(--text-muted); transition: all 0.2s; border: 1px solid transparent; cursor: pointer; }
.menu-item:hover { background: var(--accent-secondary); color: var(--text-main); }
.menu-item.active { background: var(--accent-primary); color: #FFF; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

/* Panels & Cards */
.nasa-panel { position: absolute; right: 0; top: 70px; bottom: 0; width: 420px; border-left: 1px solid var(--border-light); background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); display: flex; flex-direction: column; z-index: 40; box-shadow: -10px 0 40px rgba(0,0,0,0.03); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.nasa-panel.closed { transform: translateX(100%); } .nasa-panel.open { transform: translateX(0); }
.panel-toggle { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.9); border: 1px solid var(--border-light); color: var(--text-main); padding: 8px 16px; border-radius: 8px; font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; transition: all 0.2s; cursor: pointer; }
.panel-toggle:hover { border-color: var(--text-main); }

.arch-card { background: var(--bg-card); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid var(--border-light); border-radius: 16px; padding: 24px; transition: transform 0.3s ease, box-shadow 0.3s ease; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04); }
.arch-card:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08); }
.gallery-card { border-radius: 16px; overflow: hidden; border: 1px solid var(--border-light); background: var(--bg-card); display: flex; flex-direction: column; transition: transform 0.3s ease; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
.gallery-card:hover { transform: translateY(-4px); }
.gallery-img-placeholder { height: 180px; width: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.04); color: var(--text-muted); background-position: center; background-size: cover; border-bottom: 1px solid var(--border-light); }

.badge { display: inline-flex; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-family: 'Space Mono', monospace; }
.badge-dark { background: var(--text-main); color: #FFF; } .badge-light { background: var(--accent-secondary); color: var(--text-main); border: 1px solid var(--border-light); }

.action-btn { background: var(--text-main); color: #FFF; border: none; padding: 12px 24px; border-radius: 8px; font-family: 'Syne', sans-serif; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; justify-content: center; text-decoration: none; cursor: pointer; }
.action-btn:hover { background: #000; transform: scale(1.02); }
.action-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.delete-btn { background: rgba(253, 242, 242, 0.9); color: #C53030; border: 1px solid #FEB2B2; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.delete-btn:hover { background: #C53030; color: #FFF; }

.modal-bg { position: fixed; inset: 0; background: rgba(28, 28, 28, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; animation: fadeIn 0.3s ease; }
.modal-box { background: #FFF; border: 1px solid var(--border-light); border-radius: 16px; padding: 32px; width: 100%; max-width: 500px; box-shadow: 0 32px 64px rgba(0,0,0,0.15); max-height: 90vh; overflow-y: auto; }
.input-field { width: 100%; background: #F8F9FA; border: 1px solid #E9ECEF; padding: 12px 16px; color: var(--text-main); border-radius: 8px; margin-bottom: 16px; font-size: 14px; outline: none; transition: border 0.2s; }
.input-field:focus { border-color: var(--text-main); background: #FFF; }

/* 🌟 FLAWLESS CINEMATIC SPLASH SCREEN 🌟 */
.splash-overlay {
  position: fixed; inset: 0; z-index: 999999; background: #050505;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 1.2s;
}
.splash-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

.splash-progress-line {
  width: 0%; height: 2px; background: #FFFFFF;
  box-shadow: 0 0 15px rgba(255,255,255,0.8);
  animation: loadStrike 1.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}
@keyframes loadStrike {
  0% { width: 0%; opacity: 0; } 
  20% { opacity: 1; } 
  100% { width: 400px; opacity: 0; } 
}

.splash-logo-text {
  position: absolute; color: #FFFFFF; font-size: 60px; font-weight: 800; letter-spacing: 24px; text-indent: 24px;
  opacity: 0; filter: blur(12px); transform: scale(0.95);
  animation: logoCinematic 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 1.2s;
}
@keyframes logoCinematic { to { opacity: 1; filter: blur(0); transform: scale(1); } }

/* Mobile Deep Scroller */
@media (max-width: 768px) {
  .top-nav { padding: 0 16px; height: 60px; } 
  .app-layout { padding-top: 60px; } 
  .main-content { padding: 24px 16px 150px 16px !important; }
  .content-wrapper { padding: 0 4px; }
  .rsa-dropdown { display: none; }
  .nasa-panel { width: 100%; top: 0; bottom: 0; z-index: 100; background: rgba(255, 255, 255, 0.96); }
  .nasa-panel.closed { transform: translateY(100%); } .nasa-panel.open { transform: translateY(0); }
  .mobile-close-feed { display: flex; justify-content: space-between; align-items: center; padding: 24px 24px 16px 24px; border-bottom: 1px solid var(--border-light); background: #FFF; }
  .mobile-bottom-nav { display: flex; position: fixed; bottom: 0; left: 0; width: 100%; height: 84px; background: rgba(255,255,255,0.94); backdrop-filter: blur(20px); border-top: 1px solid var(--border-light); z-index: 60; justify-content: space-around; align-items: center; padding: 0 8px 20px 8px; padding-bottom: env(safe-area-inset-bottom); }
  .mobile-nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--text-muted); padding: 8px 4px; cursor: pointer; flex: 1; transition: color 0.2s; }
  .mobile-nav-item.active { color: var(--text-main); } .mobile-nav-label { font-size: 9px; font-weight: 700; font-family: 'Syne', sans-serif; }
}
@media (min-width: 769px) { .mobile-bottom-nav { display: none; } .mobile-close-feed { display: none; } }
@keyframes menuPop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.fade-in { animation: fadeIn 0.4s ease forwards; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

// ==========================================
// 4. ICONS
// ==========================================
const Icons = {
  Core: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg>,
  Crew: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Funds: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>,
  Archive: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>,
  Gallery: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  News: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path></svg>,
  HQ: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  Lock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Unlock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
};

// ==========================================
// 5. MAIN APPLICATION
// ==========================================
export default function App() {
  const [tab, setTab] = useState("core");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isSendingEmail, setIsSendingEmail] = useState(false); // Tracks email loading state

  // Security Simulation
  const [isLeadership, setIsLeadership] = useState(false);

  // Firebase Cloud States
  const [leadership, setLeadership] = useState({ unitCode: "Z649", udName: "", udEmail: "", officialEmail: "z649@nasaindia.co.in" });
  const [delegates, setDelegates] = useState([]);
  const [finances, setFinances] = useState([]);
  const [vault, setVault] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [unitNews, setUnitNews] = useState([]);

  // Modals
  const [modalType, setModalType] = useState(null); 
  const [modalFormData, setModalFormData] = useState({});

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 3500);

    const unsubHQ = onSnapshot(doc(db, "unit", "hq"), (docSnap) => { if (docSnap.exists()) setLeadership(docSnap.data()); });
    const unsubCrew = onSnapshot(collection(db, "crew"), (snap) => setDelegates(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubFunds = onSnapshot(collection(db, "finances"), (snap) => setFinances(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubVault = onSnapshot(collection(db, "vault"), (snap) => setVault(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubCampaigns = onSnapshot(collection(db, "campaigns"), (snap) => setCampaigns(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubGallery = onSnapshot(collection(db, "gallery"), (snap) => setGallery(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubNews = onSnapshot(collection(db, "news"), (snap) => setUnitNews(snap.docs.map(d => ({id: d.id, ...d.data()}))));

    return () => { unsubHQ(); unsubCrew(); unsubFunds(); unsubVault(); unsubCampaigns(); unsubGallery(); unsubNews(); };
  }, []);

  const toggleAdmin = () => {
    if (isLeadership) setIsLeadership(false);
    else {
      const passcode = prompt("Enter UD/USEC Passcode:");
      if (passcode === "Z649") setIsLeadership(true);
      else if (passcode !== null) alert("Incorrect passcode.");
    }
  };

  const openModal = (type, editingItem = null) => { setModalFormData(editingItem || {}); setModalType(type); setIsMenuOpen(false); };
  const closeModal = () => { setModalType(null); setModalFormData({}); };

  const handleSaveToCloud = async (collectionName) => {
    try {
      if (collectionName === 'hq') await setDoc(doc(db, "unit", "hq"), modalFormData);
      else if (modalFormData.id) {
        const docRef = doc(db, collectionName, modalFormData.id);
        const dataToUpdate = { ...modalFormData };
        delete dataToUpdate.id; 
        await updateDoc(docRef, dataToUpdate);
      } else { await addDoc(collection(db, collectionName), { ...modalFormData, timestamp: Date.now() }); }
      closeModal();
    } catch (e) { alert("Error saving to cloud."); }
  };

  // ✉️ EMAILJS AUTOMATION - MANUAL BROADCAST
  const handleSaveAndEmailNews = async () => {
    setIsSendingEmail(true);
    await handleSaveToCloud('news'); // Save to DB first

    const emailList = delegates.map(d => d.email).filter(e => e && e.includes('@')).join(',');
    if (emailList.length === 0) { 
      alert("Broadcast saved to cloud, but no delegate emails found in Crew to send to."); 
      setIsSendingEmail(false);
      return; 
    }

    const templateParams = {
      subject: `[UNIT ${leadership.unitCode}] ${modalFormData.tag}: ${modalFormData.title}`,
      message: `${modalFormData.content}\n\n--\nSent via RSA Unit Command Center`,
      to_email: leadership.officialEmail || "z649@nasaindia.co.in", 
      email: leadership.officialEmail || "z649@nasaindia.co.in", 
      bcc_list: emailList
    };

    try {
      await emailjs.send('service_2007', 'template_a63y975', templateParams, 'PE32og5tBpVl8pzhT');
      alert("Success! Broadcast synced and silent email blasted to all delegates.");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Saved to cloud, but background email failed to send.");
    }
    setIsSendingEmail(false);
  };

  // ✉️ EMAILJS AUTOMATION - CAMPAIGNS/TROPHIES
  const handleSaveAndEmailCampaign = async () => {
    setIsSendingEmail(true);
    await handleSaveToCloud('campaigns');

    const emailList = delegates.map(d => d.email).filter(e => e && e.includes('@')).join(',');
    if (emailList.length === 0) { 
      alert("Campaign saved, but no delegate emails found in Crew to send to."); 
      setIsSendingEmail(false);
      return; 
    }

    const templateParams = {
      subject: `[UNIT ${leadership.unitCode}] NEW TROPHY LAUNCH: ${modalFormData.title}`,
      message: `A new Campaign/Trophy has been synced to the database.\n\nTrophy: ${modalFormData.title}\nYear: ${modalFormData.year}\nPrize Pool: ${modalFormData.prize}\nAbstracts Closed: ${modalFormData.abstractsClosed === 'true' ? 'Yes' : 'No'}\n\nPlease check the Unit Command Center website for details.\n\n--\nSent via RSA Unit Command Center`,
      to_email: leadership.officialEmail || "z649@nasaindia.co.in",
      email: leadership.officialEmail || "z649@nasaindia.co.in", 
      bcc_list: emailList
    };

    try {
      await emailjs.send('service_2007', 'template_a63y975', templateParams, 'PE32og5tBpVl8pzhT');
      alert("Success! Trophy synced and notification email blasted to all delegates.");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Saved to cloud, but background email failed to send.");
    }
    setIsSendingEmail(false);
  };

  const handleDeleteFromCloud = async (collectionName, id) => {
    if(window.confirm("Permanently delete this entry?")) await deleteDoc(doc(db, collectionName, id));
  };

  const activeTheme = THEMES[tab] || THEMES.core;

  // ==========================================
  // VIEW RENDER MATRIX
  // ==========================================
  const renderCore = () => (
    <div className="fade-in content-wrapper">
      <div style={{ marginBottom: 40 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>UNIT {leadership.unitCode || 'Z649'} COMMAND CENTER</div>
        <h1 className="syne selectable-text" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>CORE DASHBOARD</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 40 }}>
        <div className="arch-card"><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>ACTIVE DELEGATES</div><div className="syne" style={{ fontSize: 42, fontWeight: 700 }}>{delegates.length}</div></div>
        <div className="arch-card"><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>TOTAL EXPENSES</div><div className="mono" style={{ fontSize: 32, fontWeight: 700 }}>₹{finances.filter(f => f.type === 'EXPENSE').reduce((a, b) => a + (Number(b.amount) || 0), 0).toLocaleString()}</div></div>
        <div className="arch-card"><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>ACTIVE PROJECTS</div><div className="syne" style={{ fontSize: 42, fontWeight: 700 }}>{vault.length}</div></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <h2 className="syne selectable-text" style={{ fontSize: 18, margin: 0 }}>CURRENT CAMPAIGNS</h2>
        {isLeadership && <button className="panel-toggle" onClick={() => openModal('campaigns')}>+ Sync Campaign</button>}
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {campaigns.map(camp => (
          <div key={camp.id} className="arch-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
            <div><div style={{ fontSize: 16, fontWeight: 600 }}>{camp.title} <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>({camp.year})</span></div><p className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Prize Pool: {camp.prize}</p></div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {camp.abstractsClosed === 'true' ? <span className="badge badge-dark">Abstracts Closed</span> : <span className="badge badge-light">Open</span>}
              {isLeadership && <button className="delete-btn" style={{ padding: '4px 8px' }} onClick={() => handleDeleteFromCloud('campaigns', camp.id)}>✕</button>}
            </div>
          </div>
        ))}
        {campaigns.length === 0 && <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>No campaigns synced to cloud database.</p>}
      </div>
    </div>
  );

  const renderCrew = () => (
    <div className="fade-in content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div><div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>PERSONNEL DATABASE</div><h1 className="syne selectable-text" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>UNIT CREW</h1></div>
        <button className="action-btn" onClick={() => openModal('crew')}><Icons.Plus /> ADD DELEGATE</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {delegates.map(d => (
          <div key={d.id} className="arch-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}><div className={d.role === 'Unit Designee' ? 'badge badge-dark' : 'badge badge-light'}>{d.role}</div><div style={{ display: 'flex', gap: 8 }}><button className="panel-toggle" style={{ fontSize: 10, padding: '4px 8px' }} onClick={() => openModal('crew', d)}>Edit</button><button className="delete-btn" style={{ padding: '4px 8px' }} onClick={() => handleDeleteFromCloud('crew', d.id)}>✕</button></div></div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{d.name}</div>
            <div className="mono selectable-text" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>{d.email} | {d.phone}</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Proficient Skills:</div>
            <p className="selectable-text" style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{d.skills || "N/A"}</p>
          </div>
        ))}
        {delegates.length === 0 && <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>No crew members synced.</p>}
      </div>
    </div>
  );

  const renderFunds = () => (
    <div className="fade-in content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div><div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>FINANCIAL LEDGER</div><h1 className="syne selectable-text" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>UNIT FUNDS</h1></div>
        {isLeadership && <button className="action-btn" onClick={() => openModal('finances')}><Icons.Plus /> ADD TRANSACTION</button>}
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {finances.map(f => (
          <div key={f.id} className="arch-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className={f.type === 'COLLECTION' ? 'badge badge-dark' : 'badge badge-light'} style={{ marginBottom: 12 }}>{f.type}</span>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{f.desc} <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>({f.campaign})</span></div>
              {f.type === 'COLLECTION' && (
                <div style={{ marginTop: 12, maxWidth: '400px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, marginBottom: 4 }}><span>Progress</span><span>₹{Number(f.current || 0).toLocaleString()} / ₹{Number(f.target || 0).toLocaleString()}</span></div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: `${Math.min(100, (Number(f.current || 0) / Number(f.target || 1)) * 100)}%`, height: '100%', background: 'var(--text-main)' }}></div></div>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="mono" style={{ fontSize: 24, fontWeight: 700 }}>₹{f.type === 'EXPENSE' ? Number(f.amount || 0).toLocaleString() : Number(f.target || 0).toLocaleString()}</div>
              {isLeadership && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><button className="panel-toggle" style={{ fontSize: 10, padding: '4px 8px', justifyContent: 'center' }} onClick={() => openModal('finances', f)}>Edit</button><button className="delete-btn" style={{ padding: '4px 8px' }} onClick={() => handleDeleteFromCloud('finances', f.id)}>✕</button></div>
              )}
            </div>
          </div>
        ))}
        {finances.length === 0 && <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>No financial records synced.</p>}
      </div>
    </div>
  );

  const renderVault = () => (
    <div className="fade-in content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div><div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>KNOWLEDGE VAULT</div><h1 className="syne selectable-text" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>UNIT ARCHIVE</h1></div>
        <button className="action-btn" onClick={() => openModal('vault')}><Icons.Plus /> UPLOAD FILE</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {vault.map(v => (
          <div key={v.id} className="arch-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}><div className={v.type === 'Design' ? 'badge badge-dark' : 'badge badge-light'}>{v.type} | {v.year}</div><div style={{ display: 'flex', gap: 8 }}><button className="panel-toggle" style={{ fontSize: 10, padding: '4px 8px' }} onClick={() => openModal('vault', v)}>Edit</button><button className="delete-btn" style={{ padding: '4px 8px' }} onClick={() => handleDeleteFromCloud('vault', v.id)}>✕</button></div></div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{v.title}</div><p className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>File Size: {v.size}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><a href={v.link || "#"} target="_blank" rel="noreferrer" className="panel-toggle" style={{ fontSize: 11, textDecoration: 'none' }}>Download File ↗</a></div>
          </div>
        ))}
        {vault.length === 0 && <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>No archive files synced.</p>}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="fade-in content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div><div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>PORTFOLIO SHOWCASE</div><h1 className="syne selectable-text" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>BEST WORKS GALLERY</h1></div>
        <button className="action-btn" onClick={() => openModal('gallery')}><Icons.Plus /> ADD DRIVE/PDF LINK</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {gallery.map(g => (
          <div key={g.id} className="gallery-card">
            <div className="gallery-img-placeholder" style={g.fileType === 'Image' ? { backgroundImage: `url(${g.link})` } : {}}>
              {g.fileType !== 'Image' && <><Icons.Gallery /><span className="mono" style={{ fontSize: 12, fontWeight: 600, marginTop: 8 }}>{g.fileType} LINK</span></>}
            </div>
            <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><div className="badge badge-light">{g.category}</div><div style={{ display: 'flex', gap: 8 }}><button className="panel-toggle" style={{ padding: '4px 8px', fontSize: 10 }} onClick={() => openModal('gallery', g)}>Edit</button><button className="delete-btn" style={{ padding: '4px 8px', fontSize: 10 }} onClick={() => handleDeleteFromCloud('gallery', g.id)}>✕</button></div></div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{g.title}</div><div className="selectable-text" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{g.description}</div>
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div className="mono" style={{ fontSize: 10, fontWeight: 700 }}>BY: {g.authorName?.toUpperCase() || 'UNIT MEMBER'}</div>{g.link && <a href={g.link} target="_blank" rel="noreferrer" className="action-btn" style={{ padding: '6px 12px', fontSize: 10 }}>OPEN FILE ↗</a>}</div>
            </div>
          </div>
        ))}
        {gallery.length === 0 && <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>No gallery links added yet.</p>}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="fade-in content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div><div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>UNIT COMMUNICATION</div><h1 className="syne selectable-text" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>MANUAL BROADCASTS</h1></div>
        {isLeadership && <button className="action-btn" onClick={() => openModal('news')}><Icons.Plus /> CREATE BROADCAST</button>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
        {unitNews.length === 0 ? <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>No broadcasts found.</p> : null}
        {unitNews.sort((a,b) => b.timestamp - a.timestamp).map(news => (
          <div key={news.id} className="arch-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}><div className="badge badge-dark">{news.tag}</div>
              {isLeadership && (<div style={{ display: 'flex', gap: 8 }}><button className="panel-toggle" style={{ fontSize: 10, padding: '4px 8px' }} onClick={() => openModal('news', news)}>Edit</button><button className="delete-btn" style={{ padding: '4px 8px' }} onClick={() => handleDeleteFromCloud('news', news.id)}>✕</button></div>)}
            </div>
            <h3 className="syne selectable-text" style={{ fontSize: 20, margin: '0 0 12px 0' }}>{news.title}</h3>
            <p className="selectable-text" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{news.content}</p>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>BROADCAST LOGGED: {new Date(news.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHQ = () => (
    <div className="fade-in content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div><div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>ADMINISTRATION</div><h1 className="syne selectable-text" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>UNIT HQ ({leadership.unitCode || 'Z649'})</h1></div>
        {isLeadership && <button className="action-btn" onClick={() => openModal('hq', leadership)}><Icons.HQ/> EDIT HQ DETAILS</button>}
      </div>
      <div className="arch-card" style={{ marginBottom: 24 }}><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>OFFICIAL INSTITUTION</div><div style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>UNIT {leadership.unitCode || 'Z649'}</div><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>OFFICIAL NASA MAILBOX</div><div className="selectable-text" style={{ fontSize: 16, fontWeight: 600, color: 'var(--success)' }}>{leadership.officialEmail || 'Not configured'}</div></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="arch-card"><div className="badge badge-dark" style={{ marginBottom: 16 }}>UNIT DESIGNEE (UD)</div><div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{leadership.udName || 'Not configured'}</div><div className="mono selectable-text" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Phone: {leadership.udPhone || 'N/A'}</div><div className="mono selectable-text" style={{ fontSize: 12, color: 'var(--text-muted)' }}>Email: {leadership.udEmail || 'N/A'}</div></div>
        <div className="arch-card"><div className="badge badge-light" style={{ marginBottom: 16 }}>UNIT SECRETARY (USEC)</div><div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{leadership.useName || 'Not configured'}</div><div className="mono selectable-text" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Phone: {leadership.usePhone || 'N/A'}</div><div className="mono selectable-text" style={{ fontSize: 12, color: 'var(--text-muted)' }}>Email: {leadership.useEmail || 'N/A'}</div></div>
      </div>
    </div>
  );

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* 🌟 PERFECTED LIQUID & FLOWING LINES 🌟 */}
      <div 
        className="liquid-bg" 
        style={{ backgroundImage: `linear-gradient(135deg, ${activeTheme.c1} 0%, ${activeTheme.c2} 50%, ${activeTheme.c1} 100%)` }}
      />
      <div 
        className="flowing-lines-layer" 
        style={{ transform: `rotate(${activeTheme.angle}deg)` }}
      />

      {/* 🌟 GLITCH-FREE CINEMATIC SPLASH SCREEN 🌟 */}
      <div className={`splash-overlay ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash-progress-line"></div>
        <div className="splash-logo-text">{leadership.unitCode || 'Z649'}</div>
      </div>

      {/* TOP NAVIGATION */}
      <div className="top-nav">
        <div className="rsa-menu-container">
          <div className="rsa-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <h1 className="syne" style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>RSA</h1><Icons.ChevronDown />
          </div>
          {isMenuOpen && (
            <div className="rsa-dropdown fade-in">
              {[ { id: 'core', name: 'Dashboard', icon: <Icons.Core /> }, { id: 'crew', name: 'Unit Crew', icon: <Icons.Crew /> }, { id: 'funds', name: 'Financial Ledger', icon: <Icons.Funds /> }, { id: 'archive', name: 'Unit Archive', icon: <Icons.Archive /> }, { id: 'gallery', name: 'Work Gallery', icon: <Icons.Gallery /> }, { id: 'news', name: 'Unit Broadcasts', icon: <Icons.News /> }, { id: 'hq', name: 'HQ Operations', icon: <Icons.HQ /> } ].map(item => (
                <div key={item.id} className={`menu-item ${tab === item.id ? 'active' : ''}`} onClick={() => { setTab(item.id); setIsMenuOpen(false); }}>{item.icon} {item.name}</div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="panel-toggle" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }} onClick={toggleAdmin}>
            {isLeadership ? <Icons.Unlock /> : <Icons.Lock />}
          </button>
          <button className="panel-toggle" onClick={() => setIsPanelOpen(!isPanelOpen)}>OFFICIAL NASA FEED <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}></div></button>
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <div className="app-layout">
        <div className="main-content" style={{ paddingRight: isPanelOpen && window.innerWidth > 768 ? 420 : 0 }} onClick={() => { isMenuOpen && setIsMenuOpen(false); }}>
          {tab === "core" && renderCore()}
          {tab === "crew" && renderCrew()}
          {tab === "funds" && renderFunds()}
          {tab === "archive" && renderVault()}
          {tab === "gallery" && renderGallery()}
          {tab === "news" && renderNews()}
          {tab === "hq" && renderHQ()}
        </div>

        {/* SIDEBAR FEED */}
        <div className={`nasa-panel ${isPanelOpen ? 'open' : 'closed'}`}>
          <div className="mobile-close-feed"><h2 className="syne" style={{ margin: 0, fontSize: 20 }}>NASA OFFICIAL</h2><button className="panel-toggle" onClick={() => setIsPanelOpen(false)}>✕ Close</button></div>
          <div style={{ padding: '32px 32px 24px', borderBottom: '1px solid var(--border-light)', display: window.innerWidth > 768 ? 'block' : 'none' }}><div><div className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>NASA INDIA OFFICIAL</div><div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>68th YEAR UPDATES</div></div></div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 32, paddingBottom: 140 }}>
             {[ { id: 1, tag: "THEME 2026", title: "CATALYSE", date: "68th Year", desc: "A catalyst doesn't wait for change. It creates movement, breaks inertia, and opens new paths." }, { id: 2, tag: "TROPHY BRIEF", title: "Louis I. Kahn Trophy", date: "Brief Available", desc: "Understanding the interrelations among the five elemental forces and the building envelope." }, { id: 3, tag: "COMPETITION", title: "HUDCO Trophy", date: "Prize: ₹7,00,000", desc: "Designing for the informal sector and giving design alternatives for Sustainable Urban Development." } ].map(news => (
              <div key={news.id} style={{ marginBottom: 32 }}><div className="badge badge-light" style={{ marginBottom: 12 }}>{news.tag}</div><h3 className="syne selectable-text" style={{ fontSize: 16, margin: '0 0 6px 0', lineHeight: 1.3 }}>{news.title}</h3><div className="mono selectable-text" style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 12 }}>{news.date}</div><p className="selectable-text" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{news.desc}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE NAV DOCK */}
      <div className="mobile-bottom-nav">
        {[ { id: 'core', name: 'Dash', icon: <Icons.Core /> }, { id: 'crew', name: 'Crew', icon: <Icons.Crew /> }, { id: 'funds', name: 'Funds', icon: <Icons.Funds /> }, { id: 'news', name: 'News', icon: <Icons.News /> }, { id: 'gallery', name: 'Gallery', icon: <Icons.Gallery /> } ].map(item => (
          <div key={item.id} className={`mobile-nav-item ${tab === item.id ? 'active' : ''}`} onClick={() => { setTab(item.id); setIsPanelOpen(false); }}>{item.icon}<span className="mobile-nav-label mono">{item.name}</span></div>
        ))}
      </div>

      {/* DATA MODALS */}
      {modalType && (
        <div className="modal-bg">
          <div className="modal-box fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, alignItems: 'center' }}>
              <h2 className="syne" style={{ margin: 0, fontSize: 24 }}>{modalFormData.id || modalType === 'hq' ? 'EDIT' : 'ADD NEW'} ENTRY</h2>
              <div style={{ cursor: 'pointer', marginLeft: 'auto' }} onClick={closeModal}><Icons.Close/></div>
            </div>
            
            {modalType === 'crew' && (
              <>
                <input className="input-field" placeholder="Full Delegate Name" value={modalFormData.name || ''} onChange={e => setModalFormData({...modalFormData, name: e.target.value})} />
                <select className="input-field" value={modalFormData.role || 'Delegate'} onChange={e => setModalFormData({...modalFormData, role: e.target.value})}><option value="Delegate">Delegate</option><option value="Unit Designee">Unit Designee</option><option value="Unit Secretary">Unit Secretary</option><option value="Team Lead">Team Lead</option></select>
                <input className="input-field" placeholder="Official Email" value={modalFormData.email || ''} onChange={e => setModalFormData({...modalFormData, email: e.target.value})} />
                <input className="input-field" placeholder="Contact number" value={modalFormData.phone || ''} onChange={e => setModalFormData({...modalFormData, phone: e.target.value})} />
                <textarea className="input-field" placeholder="Skills abstract ( AutoCAD, Rhino, GIS )" rows="3" value={modalFormData.skills || ''} onChange={e => setModalFormData({...modalFormData, skills: e.target.value})} style={{ resize: 'none' }}></textarea>
                <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('crew')}>Save to Cloud Database</button>
              </>
            )}

            {modalType === 'finances' && (
              <>
                <select className="input-field" value={modalFormData.type || 'EXPENSE'} onChange={e => setModalFormData({...modalFormData, type: e.target.value})}><option value="EXPENSE">Expense</option><option value="COLLECTION">Collection Target</option></select>
                <input className="input-field" placeholder="Purpose (Plotting, Event Fee)" value={modalFormData.desc || ''} onChange={e => setModalFormData({...modalFormData, desc: e.target.value})} />
                <input className="input-field" placeholder="Campaign context (Louis Kahn)" value={modalFormData.campaign || ''} onChange={e => setModalFormData({...modalFormData, campaign: e.target.value})} />
                {modalFormData.type === 'COLLECTION' ? (
                  <><input type="number" className="input-field" placeholder="Target Amount (INR)" value={modalFormData.target || ''} onChange={e => setModalFormData({...modalFormData, target: Number(e.target.value)})} /><input type="number" className="input-field" placeholder="Amount Collected So Far (INR)" value={modalFormData.current || ''} onChange={e => setModalFormData({...modalFormData, current: Number(e.target.value)})} /></>
                ) : (<input type="number" className="input-field" placeholder="Value (INR)" value={modalFormData.amount || ''} onChange={e => setModalFormData({...modalFormData, amount: Number(e.target.value)})} />)}
                <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('finances')}>Execute Cloud Transaction</button>
              </>
            )}

            {modalType === 'vault' && (
              <>
                <input className="input-field" placeholder="File Title" value={modalFormData.title || ''} onChange={e => setModalFormData({...modalFormData, title: e.target.value})} />
                <input className="input-field" placeholder="File Size (e.g. 45MB)" value={modalFormData.size || ''} onChange={e => setModalFormData({...modalFormData, size: e.target.value})} />
                <input className="input-field" placeholder="Year context (e.g. 2026)" value={modalFormData.year || ''} onChange={e => setModalFormData({...modalFormData, year: e.target.value})} />
                <input className="input-field" placeholder="Paste URL (Google Drive / Behance)" value={modalFormData.link || ''} onChange={e => setModalFormData({...modalFormData, link: e.target.value})} />
                <select className="input-field" value={modalFormData.type || 'Design'} onChange={e => setModalFormData({...modalFormData, type: e.target.value})}><option value="Design">Design Sheet</option><option value="Finance">Finance Document</option><option value="Admin">Admin Document</option></select>
                <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('vault')}>Commit to Cloud Archive</button>
              </>
            )}

            {modalType === 'campaigns' && (
              <>
                <input className="input-field" placeholder="Trophy / Campaign Name" value={modalFormData.title || ''} onChange={e => setModalFormData({...modalFormData, title: e.target.value})} />
                <input className="input-field" placeholder="Year (2026)" value={modalFormData.year || ''} onChange={e => setModalFormData({...modalFormData, year: e.target.value})} />
                <input className="input-field" placeholder="Prize Pool context" value={modalFormData.prize || ''} onChange={e => setModalFormData({...modalFormData, prize: e.target.value})} />
                <select className="input-field" value={modalFormData.abstractsClosed || 'false'} onChange={e => setModalFormData({...modalFormData, abstractsClosed: e.target.value})}><option value="false">Abstracts Open</option><option value="true">Abstracts Closed</option></select>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('campaigns')}>Just Sync to App</button>
                  <button className="action-btn" disabled={isSendingEmail} style={{ width: '100%', justifyContent: 'center', background: isSendingEmail ? '#888' : 'var(--success)' }} onClick={handleSaveAndEmailCampaign}>
                    {isSendingEmail ? "Sending..." : "Sync & Email Delegates"}
                  </button>
                </div>
              </>
            )}

            {modalType === 'gallery' && (
              <>
                <input className="input-field" placeholder="Project Title" value={modalFormData.title || ''} onChange={e => setModalFormData({...modalFormData, title: e.target.value})} />
                <input className="input-field" placeholder="Author Name" value={modalFormData.authorName || ''} onChange={e => setModalFormData({...modalFormData, authorName: e.target.value})} />
                <input className="input-field" placeholder="Category (e.g. Design, Documentation)" value={modalFormData.category || ''} onChange={e => setModalFormData({...modalFormData, category: e.target.value})} />
                <select className="input-field" value={modalFormData.fileType || 'Drive Link'} onChange={e => setModalFormData({...modalFormData, fileType: e.target.value})}><option value="Drive Link">Google Drive Folder Link</option><option value="PDF">Direct PDF Link</option><option value="Image">Image Address</option></select>
                <input className="input-field" placeholder="Paste Shared URL here..." value={modalFormData.link || ''} onChange={e => setModalFormData({...modalFormData, link: e.target.value})} />
                <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('gallery')}>Sync to Gallery Cloud</button>
              </>
            )}

            {modalType === 'hq' && (
              <>
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>UNIT INFORMATION</div>
                <input className="input-field" placeholder="Unit Code (e.g. Z649)" value={modalFormData.unitCode || ''} onChange={e => setModalFormData({...modalFormData, unitCode: e.target.value})} />
                <input className="input-field" placeholder="Official NASA Email" value={modalFormData.officialEmail || ''} onChange={e => setModalFormData({...modalFormData, officialEmail: e.target.value})} />
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, marginTop: 16 }}>UNIT DESIGNEE (UD)</div>
                <input className="input-field" placeholder="UD Name" value={modalFormData.udName || ''} onChange={e => setModalFormData({...modalFormData, udName: e.target.value})} />
                <input className="input-field" placeholder="UD Phone" value={modalFormData.udPhone || ''} onChange={e => setModalFormData({...modalFormData, udPhone: e.target.value})} />
                <input className="input-field" placeholder="UD Email" value={modalFormData.udEmail || ''} onChange={e => setModalFormData({...modalFormData, udEmail: e.target.value})} />
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, marginTop: 16 }}>UNIT SECRETARY (USEC)</div>
                <input className="input-field" placeholder="USEC Name" value={modalFormData.useName || ''} onChange={e => setModalFormData({...modalFormData, useName: e.target.value})} />
                <input className="input-field" placeholder="USEC Phone" value={modalFormData.usePhone || ''} onChange={e => setModalFormData({...modalFormData, usePhone: e.target.value})} />
                <input className="input-field" placeholder="USEC Email" value={modalFormData.useEmail || ''} onChange={e => setModalFormData({...modalFormData, useEmail: e.target.value})} />
                <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('hq')}>Save HQ to Cloud Database</button>
              </>
            )}

            {modalType === 'news' && (
              <>
                <input className="input-field" placeholder="Tag (e.g. URGENT, TROPHY BRIEF)" value={modalFormData.tag || ''} onChange={e => setModalFormData({...modalFormData, tag: e.target.value})} />
                <input className="input-field" placeholder="Email Subject / Title" value={modalFormData.title || ''} onChange={e => setModalFormData({...modalFormData, title: e.target.value})} />
                <textarea className="input-field" placeholder="Paste broadcast contents here..." rows="5" value={modalFormData.content || ''} onChange={e => setModalFormData({...modalFormData, content: e.target.value})} style={{ resize: 'none' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('news')}>Just Sync to App</button>
                  <button className="action-btn" disabled={isSendingEmail} style={{ width: '100%', justifyContent: 'center', background: isSendingEmail ? '#888' : 'var(--success)' }} onClick={handleSaveAndEmailNews}>
                    {isSendingEmail ? "Sending..." : "Broadcast & Email Unit"}
                  </button>
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </>
  );
}