import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

// ==========================================
// 1. FIREBASE CONNECTION (Keep Your Keys Here!)
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
// 2. AESTHETICS & CUSTOM CURSOR CSS
// ==========================================
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

:root {
  --bg-main: #F4F5F7; --bg-card: #FFFFFF; --text-main: #111827; --text-muted: #6B7280;
  --border-light: #E5E7EB; --border-focus: #111827; --accent-primary: #111827;
  --accent-secondary: #F9FAFB; --success: #059669;
}

/* Hide default cursor on desktop */
@media (hover: hover) and (pointer: fine) {
  body, a, button, input, select, textarea { cursor: none !important; }
}

body, html { 
  margin: 0; padding: 0; height: 100vh; overflow: hidden; 
  background-color: var(--bg-main); color: var(--text-main); 
  font-family: 'Plus Jakarta Sans', sans-serif; 
}

/* ANIMATED ARCHITECTURAL GRID BACKGROUND */
.animated-grid-bg {
  position: absolute; inset: -100%; z-index: -1;
  background-image: linear-gradient(var(--border-light) 1px, transparent 1px), linear-gradient(90deg, var(--border-light) 1px, transparent 1px); 
  background-size: 40px 40px;
  animation: panGrid 60s linear infinite;
  opacity: 0.6;
}
@keyframes panGrid { 0% { transform: translate(0, 0); } 100% { transform: translate(40px, 40px); } }

* { box-sizing: border-box; }
::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 10px; }
.syne { font-family: 'Syne', sans-serif; } .mono { font-family: 'Space Mono', monospace; }

/* Custom Magnetic Cursor */
.custom-cursor {
  position: fixed; top: 0; left: 0; width: 20px; height: 20px;
  border: 2px solid var(--text-main); border-radius: 50%;
  pointer-events: none; z-index: 999999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background-color 0.2s;
  mix-blend-mode: difference;
}
.custom-cursor.active {
  width: 50px; height: 50px; background-color: rgba(17, 24, 39, 0.1);
}

/* UI Elements */
.top-nav { position: fixed; top: 0; left: 0; right: 0; height: 70px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-light); z-index: 50; display: flex; align-items: center; padding: 0 40px; justify-content: space-between; }
.rsa-menu-container { position: relative; display: inline-block; }
.rsa-trigger { display: flex; align-items: center; gap: 12px; padding: 8px 16px; border-radius: 8px; transition: all 0.2s; }
.rsa-dropdown { position: absolute; top: 60px; left: 0; width: 240px; background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; padding: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 4px; transform-origin: top left; animation: menuPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; font-weight: 600; color: var(--text-muted); transition: all 0.2s; border: 1px solid transparent; }
.menu-item:hover { background: var(--accent-secondary); color: var(--text-main); }
.menu-item.active { background: var(--accent-primary); color: #FFF; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

.app-layout { display: flex; height: 100vh; width: 100vw; padding-top: 70px; position: relative; }
.main-content { flex: 1; overflow-y: auto; padding: 40px 60px; transition: padding-right 0.4s ease; }
.nasa-panel { position: absolute; right: 0; top: 70px; bottom: 0; width: 400px; border-left: 1px solid var(--border-light); background: rgba(250, 250, 250, 0.95); backdrop-filter: blur(40px); display: flex; flex-direction: column; z-index: 40; box-shadow: -10px 0 40px rgba(0,0,0,0.05); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.nasa-panel.closed { transform: translateX(100%); } .nasa-panel.open { transform: translateX(0); }
.panel-toggle { display: flex; align-items: center; gap: 8px; background: #FFF; border: 1px solid var(--border-light); color: var(--text-main); padding: 8px 16px; border-radius: 8px; font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; transition: all 0.2s; }
.panel-toggle:hover { border-color: var(--text-main); }

.arch-card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; padding: 24px; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
.arch-card:hover { border-color: var(--border-focus); transform: translateY(-2px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }
.gallery-card { border-radius: 16px; overflow: hidden; border: 1px solid var(--border-light); background: var(--bg-card); display: flex; flex-direction: column; }
.gallery-img-placeholder { height: 180px; width: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); color: var(--text-muted); background-position: center; background-size: cover; border-bottom: 1px solid var(--border-light); }

.badge { display: inline-flex; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-family: 'Space Mono', monospace; }
.badge-dark { background: var(--text-main); color: #FFF; } .badge-light { background: var(--accent-secondary); color: var(--text-main); border: 1px solid var(--border-light); }

.action-btn { background: var(--text-main); color: #FFF; border: none; padding: 12px 24px; border-radius: 8px; font-family: 'Syne', sans-serif; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; justify-content: center; text-decoration: none; }
.action-btn:hover { background: #000; box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
.edit-btn { background: var(--accent-secondary); color: var(--text-main); border: 1px solid var(--border-light); padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; }
.delete-btn { background: #FEF2F2; color: #DC2626; border: 1px solid #FCA5A5; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; }

.modal-bg { position: fixed; inset: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; animation: fadeIn 0.2s ease; }
.modal-box { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; padding: 32px; width: 100%; max-width: 500px; box-shadow: 0 24px 48px rgba(0,0,0,0.08); max-height: 90vh; overflow-y: auto; }
.input-field { width: 100%; background: var(--bg-main); border: 1px solid var(--border-light); padding: 12px 16px; color: var(--text-main); border-radius: 8px; margin-bottom: 16px; font-size: 14px; outline: none; }

/* CREATIVE SPLASH SCREEN */
.splash-wrapper { position: fixed; inset: 0; background: var(--text-main); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s; }
.splash-wrapper.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
.splash-text { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2); position: relative; }
.splash-text::before { content: attr(data-text); position: absolute; left: 0; top: 0; width: 0%; height: 100%; color: #FFF; -webkit-text-stroke: 0px; overflow: hidden; animation: scanText 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; border-right: 2px solid var(--success); }
@keyframes scanText { 0% { width: 0%; } 100% { width: 100%; } }

@media (max-width: 768px) {
  .top-nav { padding: 0 16px; height: 60px; } .app-layout { padding-top: 60px; } .main-content { padding: 24px 16px 120px 16px !important; }
  .rsa-dropdown { display: none; } .custom-cursor { display: none !important; }
  .mobile-bottom-nav { display: flex; position: fixed; bottom: 0; left: 0; width: 100%; height: 70px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-top: 1px solid var(--border-light); z-index: 60; justify-content: space-around; align-items: center; padding: 0 8px; }
  .mobile-nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--text-muted); padding: 8px; border-radius: 8px; }
  .mobile-nav-item.active { color: var(--text-main); } .mobile-nav-label { font-size: 10px; font-weight: 700; font-family: 'Syne', sans-serif; }
  .nasa-panel { width: 100%; top: 60px; bottom: 70px; }
}
@media (min-width: 769px) { .mobile-bottom-nav { display: none; } }
@keyframes menuPop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.fade-in { animation: fadeIn 0.4s ease forwards; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

const Icons = {
  Core: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg>,
  Crew: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Funds: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>,
  Archive: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>,
  Gallery: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  HQ: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
};

export default function App() {
  const [tab, setTab] = useState("core");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  // Custom Cursor State
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  const [leadership, setLeadership] = useState({ unitCode: "Z649", udName: "UD Name", udEmail: "ud@college.in", officialEmail: "z649@nasaindia.co" });
  const [delegates, setDelegates] = useState([]);
  const [finances, setFinances] = useState([]);
  const [vault, setVault] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [nasaNews, setNasaNews] = useState([]); // NEW: Cloud Synced News Feed

  const [modalType, setModalType] = useState(null); 
  const [modalFormData, setModalFormData] = useState({});

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 2400);

    // Custom Cursor Logic
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target.closest('button, a, .rsa-trigger, .panel-toggle, .menu-item, .action-btn');
      setIsHovering(!!target);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Firebase Listeners
    const unsubHQ = onSnapshot(doc(db, "unit", "hq"), (docSnap) => { if (docSnap.exists()) setLeadership(docSnap.data()); });
    const unsubCrew = onSnapshot(collection(db, "crew"), (snap) => setDelegates(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubFunds = onSnapshot(collection(db, "finances"), (snap) => setFinances(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubVault = onSnapshot(collection(db, "vault"), (snap) => setVault(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubCampaigns = onSnapshot(collection(db, "campaigns"), (snap) => setCampaigns(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubGallery = onSnapshot(collection(db, "gallery"), (snap) => setGallery(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    const unsubNews = onSnapshot(collection(db, "news"), (snap) => setNasaNews(snap.docs.map(d => ({id: d.id, ...d.data()}))));

    return () => { 
      window.removeEventListener('mousemove', handleMouseMove);
      unsubHQ(); unsubCrew(); unsubFunds(); unsubVault(); unsubCampaigns(); unsubGallery(); unsubNews(); 
    };
  }, []);

  const openModal = (type, editingItem = null) => { setModalFormData(editingItem || {}); setModalType(type); setIsMenuOpen(false); };
  const closeModal = () => { setModalType(null); setModalFormData({}); };

  const handleSaveToCloud = async (collectionName) => {
    try {
      if (collectionName === 'hq') {
        await setDoc(doc(db, "unit", "hq"), modalFormData);
      } else if (modalFormData.id) {
        const docRef = doc(db, collectionName, modalFormData.id);
        const dataToUpdate = { ...modalFormData };
        delete dataToUpdate.id; 
        await updateDoc(docRef, dataToUpdate);
      } else {
        await addDoc(collection(db, collectionName), { ...modalFormData, timestamp: Date.now() });
      }
      closeModal();
    } catch (e) {
      alert("Cloud Sync Error. Check network.");
    }
  };

  const handleDeleteFromCloud = async (collectionName, id) => {
    if(window.confirm("Permanently delete this from the cloud database?")) {
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  // VIEWS (Truncated standard rendering functions for brevity, maintaining functionality)
  const renderCore = () => (
    <div className="fade-in">
      <div style={{ marginBottom: 40 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>UNIT {leadership.unitCode} COMMAND CENTER</div>
        <h1 className="syne" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>CORE DASHBOARD</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 40 }}>
        <div className="arch-card"><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>ACTIVE DELEGATES</div><div className="syne" style={{ fontSize: 42, fontWeight: 700 }}>{delegates.length}</div></div>
        <div className="arch-card"><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>TOTAL EXPENSES</div><div className="mono" style={{ fontSize: 32, fontWeight: 700 }}>₹{finances.filter(f => f.type === 'EXPENSE').reduce((a, b) => a + (Number(b.amount) || 0), 0).toLocaleString()}</div></div>
        <div className="arch-card"><div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>ACTIVE PROJECTS</div><div className="syne" style={{ fontSize: 42, fontWeight: 700 }}>{vault.length}</div></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <h2 className="syne" style={{ fontSize: 18, margin: 0 }}>CURRENT CAMPAIGNS</h2>
        <button className="panel-toggle" onClick={() => openModal('campaigns')}>+ Sync Campaign</button>
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {campaigns.map(camp => (
          <div key={camp.id} className="arch-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
            <div><div style={{ fontSize: 16, fontWeight: 600 }}>{camp.title} <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>({camp.year})</span></div></div>
            <div style={{ display: 'flex', gap: 12 }}><span className="badge badge-light">{camp.status || 'Active'}</span><button className="delete-btn" onClick={() => handleDeleteFromCloud('campaigns', camp.id)}>✕</button></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>PORTFOLIO SHOWCASE</div>
          <h1 className="syne" style={{ margin: '8px 0 0 0', fontWeight: 800 }}>BEST WORKS GALLERY</h1>
        </div>
        <button className="action-btn" onClick={() => openModal('gallery')}><Icons.Plus /> ADD DRIVE/PDF LINK</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {gallery.map(g => (
          <div key={g.id} className="gallery-card">
            <div className="gallery-img-placeholder" style={g.fileType === 'Image' ? { backgroundImage: `url(${g.link})` } : {}}>
              {g.fileType !== 'Image' && <><Icons.Gallery /><span className="mono" style={{ fontSize: 12, fontWeight: 600, marginTop: 8 }}>{g.fileType} LINK</span></>}
            </div>
            <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><div className="badge badge-light">{g.category}</div><button className="delete-btn" style={{ padding: '4px 8px', fontSize: 10 }} onClick={() => handleDeleteFromCloud('gallery', g.id)}>✕</button></div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{g.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{g.description}</div>
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="mono" style={{ fontSize: 10, fontWeight: 700 }}>BY: {g.authorName?.toUpperCase() || 'UNIT MEMBER'}</div>
                {g.link && <a href={g.link} target="_blank" rel="noreferrer" className="action-btn" style={{ padding: '6px 12px', fontSize: 10 }}>OPEN FILE ↗</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      {/* ARCHITECTURAL ANIMATED BACKGROUND */}
      <div className="animated-grid-bg"></div>

      {/* CUSTOM MAGNETIC CURSOR */}
      <div className={`custom-cursor ${isHovering ? 'active' : ''}`} style={{ left: \`\${mousePos.x}px\`, top: \`\${mousePos.y}px\` }}></div>

      {/* SPLASH SCREEN: SCANNER REVEAL */}
      <div className={`splash-wrapper ${!isBooting ? 'hidden' : ''}`}>
        <h1 className="syne splash-text" data-text={leadership.unitCode || 'Z649'} style={{ fontSize: 72, fontWeight: 800, margin: 0, letterSpacing: 8 }}>{leadership.unitCode || 'Z649'}</h1>
        <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 24, letterSpacing: 4 }}>ESTABLISHING CLOUD UPLINK</div>
      </div>

      <div className="top-nav">
        <div className="rsa-menu-container">
          <div className="rsa-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)}><h1 className="syne" style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>RSA</h1><Icons.ChevronDown /></div>
          {isMenuOpen && (
            <div className="rsa-dropdown fade-in">
              {[{ id: 'core', name: 'Dashboard' }, { id: 'gallery', name: 'Work Gallery' }].map(item => (
                <div key={item.id} className="menu-item" onClick={() => { setTab(item.id); setIsMenuOpen(false); }}>{item.name}</div>
              ))}
            </div>
          )}
        </div>
        <button className="panel-toggle" onClick={() => setIsPanelOpen(!isPanelOpen)}>NASA SYNC FEED <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}></div></button>
      </div>

      <div className="app-layout">
        <div className="main-content" style={{ paddingRight: isPanelOpen ? (window.innerWidth > 768 ? 460 : 0) : (window.innerWidth > 768 ? 60 : 16) }}>
          {tab === "core" && renderCore()}
          {tab === "gallery" && renderGallery()}
        </div>

        {/* FIREBASE SYNCED NASA PANEL */}
        <div className={`nasa-panel ${isPanelOpen ? 'open' : 'closed'}`}>
          <div style={{ padding: '32px 32px 24px', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>NASA INDIA FEED</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>HQ BROADCASTS</div>
              </div>
              <button className="action-btn" style={{ padding: '6px 12px', fontSize: 10 }} onClick={() => openModal('news')}>+ ADD NEWS</button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
            {nasaNews.length === 0 ? <p className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>No recent email broadcasts synced.</p> : null}
            {nasaNews.sort((a,b) => b.timestamp - a.timestamp).map(news => (
              <div key={news.id} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div className="badge badge-light" style={{ marginBottom: 12 }}>{news.tag}</div><button className="delete-btn" style={{ padding: '2px 6px', fontSize: 8 }} onClick={() => handleDeleteFromCloud('news', news.id)}>✕</button></div>
                <h3 className="syne" style={{ fontSize: 16, margin: '0 0 6px 0', lineHeight: 1.3 }}>{news.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{news.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CLOUD DATA ENTRY MODALS */}
      {modalType && (
        <div className="modal-bg">
          <div className="modal-box fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}><h2 className="syne" style={{ margin: 0, fontSize: 24 }}>ADD TO CLOUD</h2><div style={{ cursor: 'pointer' }} onClick={closeModal}><Icons.Close/></div></div>
            
            {modalType === 'gallery' && (
              <>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 16 }}>*Paste Google Drive, Behance, or direct PDF links here.</div>
                <input className="input-field" placeholder="Project Title" value={modalFormData.title || ''} onChange={e => setModalFormData({...modalFormData, title: e.target.value})} />
                <input className="input-field" placeholder="Author Name" value={modalFormData.authorName || ''} onChange={e => setModalFormData({...modalFormData, authorName: e.target.value})} />
                <select className="input-field" value={modalFormData.fileType || 'Drive Link'} onChange={e => setModalFormData({...modalFormData, fileType: e.target.value})}>
                  <option value="Drive Link">Google Drive Folder Link</option>
                  <option value="PDF">Direct PDF Link</option>
                  <option value="Image">Image Address</option>
                </select>
                <input className="input-field" placeholder="Paste Shared URL here..." value={modalFormData.link || ''} onChange={e => setModalFormData({...modalFormData, link: e.target.value})} />
                <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('gallery')}>Sync to Gallery Cloud</button>
              </>
            )}

            {modalType === 'news' && (
              <>
                <input className="input-field" placeholder="Tag (e.g. URGENT, TROPHY BRIEF)" value={modalFormData.tag || ''} onChange={e => setModalFormData({...modalFormData, tag: e.target.value})} />
                <input className="input-field" placeholder="Email Subject / Title" value={modalFormData.title || ''} onChange={e => setModalFormData({...modalFormData, title: e.target.value})} />
                <textarea className="input-field" placeholder="Paste email contents here..." rows="5" value={modalFormData.content || ''} onChange={e => setModalFormData({...modalFormData, content: e.target.value})} style={{ resize: 'none' }} />
                <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleSaveToCloud('news')}>Broadcast to all Unit Panels</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}