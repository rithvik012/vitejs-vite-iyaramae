import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { 
  Shield, Plus, Trash2, Users, Wallet, Archive, Image as ImageIcon, 
  Radio, Settings, X, ArrowUpRight, Mail, Phone, Globe, Activity, 
  Crown, Brain, Send, ChevronRight, Zap, TrendingUp, TrendingDown, 
  Lock, Unlock, Fingerprint, Calendar
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
// 2. LITHOS DESIGN SYSTEM & ANIMATIONS
// ==========================================
const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');

  :root {
    --accent: #e8702a;
    --accent-hover: #d2611f;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; font-family: 'Inter', sans-serif; }
  .font-playfair { font-family: 'Playfair Display', serif; }
  
  body, html { background-color: #000; color: #fff; overflow: hidden; height: 100dvh; width: 100vw; tracking: -0.02em; }
  input, textarea, select { user-select: auto; color: #fff !important; background-color: rgba(255,255,255,0.05) !important; outline: none; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; transition: all 0.3s; }
  input:focus, textarea:focus, select:focus { border-color: var(--accent); background: rgba(0,0,0,0.6) !important; }
  ::-webkit-scrollbar { width: 0px; }

  /* 🌟 PREMIUM LITHOS ANIMATIONS 🌟 */
  @keyframes heroReveal { 0%{opacity:0;transform:translateY(28px);filter:blur(12px)} 100%{opacity:1;transform:translateY(0);filter:blur(0)} }
  @keyframes heroFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
  @keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }
  @keyframes fadeOverlay { 0%{opacity: 0} 100%{opacity: 1} }

  .hero-anim { opacity:0; animation-fill-mode:forwards; animation-timing-function:cubic-bezier(0.16,1,0.3,1); }
  .hero-reveal { animation-name:heroReveal; animation-duration:1.1s; }
  .hero-fade { animation-name:heroFadeUp; animation-duration:1s; }
  .hero-zoom { animation:heroZoom 2.5s cubic-bezier(0.16,1,0.3,1) forwards; }
  
  @media (prefers-reduced-motion: reduce){ .hero-anim,.hero-zoom{ animation:none; opacity:1; } }

  /* 🌟 KINETIC SCROLL & BENTO CARDS 🌟 */
  .kinetic-scroll-engine { height: 100dvh; width: 100vw; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; position: relative; z-index: 40; }
  .scrolling-section {
    min-height: 100dvh; width: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; padding: 100px 24px 80px 24px;
    opacity: 0; transform: translateY(30px); filter: blur(10px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scrolling-section.view-active { opacity: 1; transform: translateY(0); filter: blur(0px); }

  .bento-container { width: 100%; max-width: 1200px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; scrollbar-width: none; padding: 20px 0; }
  .bento-card { 
    background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px; padding: 32px; position: relative; overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .bento-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.3); }
  .bento-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
  .bento-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }

  /* 🌟 TYPOGRAPHY & ELEMENTS 🌟 */
  .text-title { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500; font-size: 3.5rem; letter-spacing: -0.02em; line-height: 1.1; color: #fff; }
  .text-subtitle { font-weight: 600; font-size: 0.75rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.7); text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .text-metric { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 3.5rem; letter-spacing: -0.04em; color: #fff; }
  
  .btn-primary { background: var(--accent); color: #fff; border: none; padding: 14px 28px; border-radius: 100px; font-weight: 500; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 0 0 rgba(232, 112, 42, 0); }
  .btn-primary:hover { transform: scale(1.03); background: var(--accent-hover); box-shadow: 0 10px 20px rgba(232, 112, 42, 0.3); }
  .btn-secondary { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); box-shadow: none; }
  .btn-secondary:hover { background: rgba(255,255,255,0.2); box-shadow: none; }
  
  .btn-icon { background: transparent; color: rgba(255,255,255,0.7); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s;}
  .btn-icon:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .btn-icon.danger:hover { color: #ff3366; background: rgba(255, 51, 102, 0.15); }
  
  .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); }
  .council-tag { background: rgba(232, 112, 42, 0.15); color: var(--accent); border-color: rgba(232, 112, 42, 0.3); }
  
  /* 🌟 PRO TREASURY TABLE & CHART 🌟 */
  .donut-chart { width: 160px; height: 160px; transform: rotate(-90deg); filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5)); }
  .donut-segment-income { stroke: var(--accent); fill: transparent; stroke-width: 5; stroke-linecap: round; transition: stroke-dasharray 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
  .donut-segment-expense { stroke: #ffffff; fill: transparent; stroke-width: 5; stroke-linecap: round; transition: stroke-dasharray 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
  
  .pro-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; margin-top: 10px; }
  .pro-table th { text-align: left; padding: 12px 16px; color: rgba(255,255,255,0.6); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
  .pro-table td { padding: 16px; background: rgba(255,255,255,0.05); font-size: 0.95rem; transition: background 0.3s; }
  .pro-table tr td:first-child { border-top-left-radius: 12px; border-bottom-left-radius: 12px; }
  .pro-table tr td:last-child { border-top-right-radius: 12px; border-bottom-right-radius: 12px; }

  /* 🌟 AI TERMINAL 🌟 */
  .ai-terminal { background: rgba(0,0,0,0.5); border-radius: 16px; padding: 20px; border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; gap: 16px; height: 100%; min-height: 300px;}
  .ai-chat-box { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
  .ai-msg { padding: 12px 16px; border-radius: 12px; font-size: 0.9rem; max-width: 85%; line-height: 1.5; font-family: 'Inter'; }
  .ai-msg.bot { background: rgba(232, 112, 42, 0.1); border: 1px solid rgba(232, 112, 42, 0.2); color: #fff; align-self: flex-start; border-bottom-left-radius: 4px; }
  .ai-input-wrapper { display: flex; gap: 8px; }
  
  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeOverlay 0.3s ease-out; }
  .modal-window { background: #111; border: 1px solid rgba(255,255,255,0.15); width: 100%; max-width: 550px; border-radius: 24px; padding: 40px; box-shadow: 0 50px 100px rgba(0,0,0,0.9); max-height: 90vh; overflow-y: auto; }

  /* Mobile */
  @media (max-width: 768px) {
    .bento-grid-2, .bento-grid-3 { grid-template-columns: 1fr; }
    .text-title { font-size: 2.8rem; }
    .scrolling-section { padding: 100px 16px 80px 16px; }
    .modal-window { padding: 24px; }
  }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);

  // Core Data
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const [modalMode, setModalMode] = useState(null); 
  const [formPayload, setFormPayload] = useState({});
  
  // Refs for performance
  const scrollEngineRef = useRef(null);
  const revealMaskRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const SPOTLIGHT_R = 260;

  const navItems = [
    { id: 'core', label: 'Command' },
    { id: 'crew', label: 'Roster' },
    { id: 'funds', label: 'Treasury' },
    { id: 'vault', label: 'Vault' },
    { id: 'gallery', label: 'Visuals' },
    { id: 'news', label: 'Comms' },
    { id: 'hq', label: 'Council' },
    { id: 'ai', label: 'RSA Intel' }
  ];

  useEffect(() => {
    // 🌟 HIGH PERFORMANCE GPU SPOTLIGHT ENGINE 🌟
    // Bypasses React State entirely for 144hz butter-smooth tracking
    const handleMouseMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', handleMouseMove);

    const renderLoop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      
      if (revealMaskRef.current) {
        revealMaskRef.current.style.webkitMaskImage = `radial-gradient(circle ${SPOTLIGHT_R}px at ${smooth.current.x}px ${smooth.current.y}px, black 0%, black 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)`;
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };
    rafRef.current = requestAnimationFrame(renderLoop);

    // Database Sync
    const unsubs = [
      onSnapshot(doc(db, "unit", "hq"), d => { d.exists() && setLeadership({ ...leadership, ...d.data() }); }),
      onSnapshot(collection(db, "crew"), s => setCrewData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "finances"), s => setFinancialLog(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "vault"), s => setVaultData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "gallery"), s => setGalleryData(s.docs.map(d => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, "news"), s => setNewsData(s.docs.map(d => ({ id: d.id, ...d.data() }))))
    ];

    return () => { 
      window.removeEventListener('mousemove', handleMouseMove); 
      cancelAnimationFrame(rafRef.current);
      unsubs.forEach(unsub => unsub()); 
    };
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

  const handleSecurityToggle = () => {
    if (isLeadershipMode) { setIsLeadershipMode(false); } 
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

  // ==========================================
  // RENDER BLOCKS (8 MODULES)
  // ==========================================
  
  // 1. HERO / DASHBOARD
  const renderHero = () => (
    <section className="relative w-full h-[100dvh] flex items-center justify-center pointer-events-none">
      <div className="absolute top-[18%] left-0 right-0 flex flex-col items-center text-center px-5">
        <span className="block font-playfair italic font-normal text-6xl sm:text-8xl md:text-9xl tracking-[-0.05em] text-white leading-[0.95] hero-anim hero-reveal" style={{ animationDelay: '0.25s' }}>
          Command holds
        </span>
        <span className="block font-normal text-6xl sm:text-8xl md:text-9xl tracking-[-0.08em] text-white leading-[0.95] -mt-2 hero-anim hero-reveal" style={{ animationDelay: '0.42s' }}>
          tales of design
        </span>
      </div>

      <div className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[280px] hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
        <p className="text-sm text-white/80 leading-relaxed pointer-events-auto">
          Every layer of data records a chapter of our unit's legacy, from architectural roots to evolving systems, structured securely within our databanks.
        </p>
      </div>

      <div className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-5 hero-anim hero-fade pointer-events-auto" style={{ animationDelay: '0.85s' }}>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          The interactive nexus allows you to trace operative movements, treasury matrices, and encrypted vault architecture seamlessly.
        </p>
        <button onClick={() => executeEngineNavigation(1)} className="btn-primary" style={{ padding: '16px 32px' }}>
          Initiate Protocol
        </button>
      </div>
    </section>
  );

  // 2. UNIT CREW
  const renderCrew = () => {
    const allocation = crewData.reduce((acc, u) => { const y = u.year||"Unassigned"; if(!acc[y]) acc[y]=[]; acc[y].push(u); return acc; }, {});
    const order = ['1', '2', '3', '4', '5', 'Alumni', 'Unassigned']; 
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Identity Matrix</span><h1 className="text-title">Operative Roster</h1></div>
          <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Register Profile</button>
        </div>
        {order.map(year => allocation[year] && (
          <div key={year} style={{ marginTop: '24px' }}>
            <span className="text-subtitle" style={{ padding: '0 16px', color: '#fff' }}>{year === 'Alumni' || year === 'Unassigned' ? year : `Generation 0${year}`}</span>
            <div className="bento-grid-2" style={{ marginTop: '16px' }}>
              {allocation[year].map(m => {
                const isCouncil = ['UD', 'USEC', 'Coordinator'].includes(m.role);
                return (
                  <div key={m.id} className="bento-card" style={{ padding: '24px', border: isCouncil ? '1px solid var(--accent)' : '' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span className={`status-pill ${isCouncil ? 'council-tag' : ''}`}>
                        {isCouncil && <Crown size={12}/>}
                        {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}
                      </span>
                      {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-8px'}} onClick={() => deleteDocRecord('crew', m.id)}><Trash2 size={16}/></button>}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>{m.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '6px', display:'flex', alignItems:'center', gap:'6px' }}><Mail size={12}/> {m.email}</div>
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
          <div><span className="text-subtitle">Economic Flow</span><h1 className="text-title">Capital Matrix</h1></div>
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
              <div style={{ marginBottom: '16px' }}><span className="text-subtitle" style={{color:'var(--accent)'}}>Gross Credit</span><div style={{fontSize:'1.8rem', fontWeight:'600'}}>₹{income.toLocaleString()}</div></div>
              <div><span className="text-subtitle" style={{color:'#fff'}}>Gross Debit</span><div style={{fontSize:'1.8rem', fontWeight:'600'}}>₹{expense.toLocaleString()}</div></div>
            </div>
          </div>
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-subtitle" style={{color:'#fff'}}><Zap size={14}/> Liquid Yield</span>
            <div className="text-metric" style={{ color: net >= 0 ? '#fff' : '#ff3366', marginBottom: '20px' }}>₹{net.toLocaleString()}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: 'var(--accent)', transition: 'width 1s ease-out' }}></div>
            </div>
            <span style={{ marginTop: '10px', textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Target Hash: ₹{goal.toLocaleString()}</span>
          </div>
        </div>

        <div className="bento-card" style={{ padding: '0 24px 24px 24px', overflowX: 'auto' }}>
           <table className="pro-table">
             <thead><tr><th>Direction</th><th>Descriptor</th><th>Volume</th>{isLeadershipMode && <th>Auth</th>}</tr></thead>
             <tbody>
               {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'40px', color:'rgba(255,255,255,0.5)'}}>Ledger Empty.</td></tr>}
               {financialLog.map(f => (
                 <tr key={f.id}>
                   <td><span className="status-pill" style={{ color: f.type==='income'?'var(--accent)':'#fff', borderColor: f.type==='income'?'rgba(232, 112, 42, 0.3)':'rgba(255,255,255,0.2)' }}>
                      {f.type==='income'?<TrendingUp size={12}/>:<TrendingDown size={12}/>} {f.type}
                   </span></td>
                   <td style={{ fontWeight: '500' }}>{f.description}</td>
                   <td style={{ fontWeight:'600', color: f.type==='income'?'var(--accent)':'rgba(255,255,255,0.6)' }}>
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
        <div><span className="text-subtitle">Deep Storage</span><h1 className="text-title">Secure Databanks</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ type: 'Design File' }); setModalMode('vault'); }}><Plus size={16}/> Push Payload</button>}
      </div>
      <div className="bento-grid-3">
        {vaultData.map(v => (
          <div key={v.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="status-pill"><Archive size={12}/> {v.type}</span>
              {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-8px'}} onClick={() => deleteDocRecord('vault', v.id)}><Trash2 size={14}/></button>}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '24px' }}>{v.title}</div>
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
        <div><span className="text-subtitle">Visual Subsystem</span><h1 className="text-title">Visual Manifest</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ fileType: 'Image URL' }); setModalMode('gallery'); }}><Plus size={16}/> Upload Media</button>}
      </div>
      <div className="bento-grid-2">
        {galleryData.map(g => (
          <div key={g.id} className="bento-card" style={{ padding: 0 }}>
            <div style={{ height: '250px', background: g.fileType === 'Image URL' ? `url("${g.link}") center/cover` : 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {g.fileType !== 'Image URL' && <ImageIcon size={40} color="rgba(255,255,255,0.3)" />}
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="status-pill">{g.category}</span>
                {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-6px'}} onClick={() => deleteDocRecord('gallery', g.id)}><Trash2 size={16}/></button>}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{g.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6' }}>{g.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 6. NEWS
  const renderNews = () => (
    <div className="bento-container">
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="text-subtitle">Signal Relay</span><h1 className="text-title">Comms Array</h1></div>
        {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}><Radio size={16}/> Transmit Signal</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
        {newsData.length === 0 && <div className="text-sm text-white/50" style={{padding:'0 16px'}}>Silence on the network.</div>}
        {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
          <div key={n.id} className="bento-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span className="status-pill" style={{ color: '#fff' }}><Activity size={12}/> {n.tag}</span>
              {isLeadershipMode && <button className="btn-icon danger" style={{margin:'-6px'}} onClick={() => deleteDocRecord('news', n.id)}><Trash2 size={16}/></button>}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '16px', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{n.title}</div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)' }}>{n.content}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // 7. UNIT COUNCIL
  const renderUnitCouncil = () => {
    return (
      <div className="bento-container">
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="text-subtitle">Executive Layer</span><h1 className="text-title">Council HQ</h1></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && <button className="btn-primary" onClick={() => { setFormPayload({ role: 'Coordinator', year: '4' }); setModalMode('crew'); }}><Plus size={16}/> Induct Executive</button>}
            {isLeadershipMode && <button className="btn-primary btn-secondary" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Core Config</button>}
          </div>
        </div>

        <div className="bento-card" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}>
          <span className="text-subtitle" style={{color: '#fff'}}>Network Hash Identity</span>
          <div style={{ fontSize: '2.8rem', fontWeight: '600', margin: '10px 0' }}>Unit {leadership.unitCode}</div>
          <div className="status-pill" style={{textTransform: 'lowercase'}}><Globe size={12}/> {leadership.officialEmail}</div>
        </div>
      </div>
    );
  };

  // 8. RSA INTEL & AI
  const renderRSAIntel = () => {
    const councilMembers = crewData.filter(m => ['UD', 'USEC', 'Coordinator'].includes(m.role));

    return (
      <div className="bento-container" style={{ maxWidth: '1400px' }}>
        <div style={{ padding: '0 16px' }}><span className="text-subtitle">Command & Intelligence</span><h1 className="text-title">RSA Intel & Core AI</h1></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '16px' }}>
          
          {/* AI ASSISTANT TERMINAL */}
          <div className="bento-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <span className="text-subtitle" style={{color: '#fff'}}><Brain size={14}/> Unit History & Reminders Core</span>
            <div className="ai-terminal" style={{ marginTop: '16px' }}>
              <div className="ai-chat-box">
                <div className="ai-msg bot">Initializing RSA Knowledge Base...<br/>Awaiting queries on unit history, status, or scheduling.</div>
              </div>
              <div className="ai-input-wrapper">
                <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" placeholder="Query RSA AI Model..." disabled />
                <button className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }} disabled><Send size={18}/></button>
              </div>
            </div>
          </div>

          {/* COUNCIL CONTACT & MAIL COMMAND */}
          <div className="bento-card" style={{ border: '1px solid rgba(232, 112, 42, 0.3)' }}>
            <span className="text-subtitle" style={{color: 'var(--accent)'}}><Crown size={14}/> Executive Comms Directory</span>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
              {councilMembers.length === 0 && <div className="text-sm text-white/50">No executives available.</div>}
              {councilMembers.map(m => (
                <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="status-pill council-tag">{m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Coord.` : m.role}</span>
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px' }}>{m.name}</div>
                  
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
          <div className="bento-card" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'rgba(255,255,255,0.05)' }}>
            <div>
              <span className="text-subtitle" style={{color: '#fff'}}><Globe size={14}/> National Association of Students of Architecture</span>
              <div style={{ fontSize: '1.2rem', fontWeight: '500', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Official Portal Link</div>
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
      
      {/* 🌟 HARDWARE ACCELERATED SPOTLIGHT BACKGROUND 🌟 */}
      <div className="fixed inset-0 bg-black z-10 pointer-events-none">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom" style={{ backgroundImage: `url(${BG_IMAGE_1})` }}></div>
        <div ref={revealMaskRef} className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 transition-opacity duration-1000" style={{ backgroundImage: `url(${BG_IMAGE_2})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}></div>
        <div className="absolute inset-0 bg-black/40 z-30"></div>
      </div>

      {/* 🌟 SECURITY HUD (TOP BAR) 🌟 */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-5 md:p-6 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff"><path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z"/></svg>
          <span className="text-white text-2xl font-playfair italic font-medium tracking-tight">Lithos</span>
        </div>

        {/* Floating Nav Pill (Lithos Style) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2 py-2 items-center gap-1 pointer-events-auto shadow-lg shadow-black/20">
          {navItems.map((item, i) => (
             <button key={item.id} onClick={() => executeEngineNavigation(i)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeSectionIdx === i ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                {item.label}
             </button>
          ))}
        </div>
        
        <div className="pointer-events-auto">
          <button onClick={handleSecurityToggle} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-all">
            {isLeadershipMode ? <Unlock size={14} className="text-[#00ff66]"/> : <Lock size={14}/>}
            {isLeadershipMode ? 'UNLOCKED' : 'ADMIN LOGIN'}
          </button>
        </div>
      </nav>

      {/* 🌟 KINETIC ENGINE WIPE CONTAINER 🌟 */}
      <div className="kinetic-scroll-engine" ref={scrollEngineRef} onScroll={handleEngineScroll}>
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`}>{renderHero()}</section>
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
                  <input required placeholder="Full Identity Name" className="input-element w-full mb-4" value={formPayload.name||''} onChange={e=>setFormPayload({...formPayload, name:e.target.value})} />
                  <input type="email" placeholder="Email Address Endpoint" className="input-element w-full mb-4" value={formPayload.email||''} onChange={e=>setFormPayload({...formPayload, email:e.target.value})} />
                  <input type="tel" placeholder="Mobile Array Number" className="input-element w-full mb-4" value={formPayload.phone||''} onChange={e=>setFormPayload({...formPayload, phone:e.target.value})} />
                  
                  <span className="text-subtitle" style={{marginTop:'16px'}}>Hierarchy Designation</span>
                  <select required className="input-element w-full mb-4" value={formPayload.role||''} onChange={e=>setFormPayload({...formPayload, role:e.target.value})}>
                    <option value="" disabled>Select Core Role...</option>
                    <option value="Member">Standard Member</option>
                    {isLeadershipMode && <option value="UD">Unit Designee (UD)</option>}
                    {isLeadershipMode && <option value="USEC">Unit Secretary (USEC)</option>}
                    {isLeadershipMode && <option value="Coordinator">Executive Coordinator</option>}
                  </select>

                  {formPayload.role === 'Coordinator' && (
                    <input required placeholder="Specify Type (e.g., Design, Tech, Events)" className="input-element w-full mb-4" value={formPayload.coordinatorType||''} onChange={e=>setFormPayload({...formPayload, coordinatorType:e.target.value})} />
                  )}

                  <span className="text-subtitle" style={{marginTop:'16px'}}>Academic Generation</span>
                  <select className="input-element w-full mb-4" value={formPayload.year||'1'} onChange={e=>setFormPayload({...formPayload, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <select className="input-element w-full mb-4" value={formPayload.type||'income'} onChange={e=>setFormPayload({...formPayload, type:e.target.value})}>
                    <option value="income">ADD FUNDS / CREDIT (Income Array)</option>
                    <option value="expense">SPEND FUNDS / DEBIT (Expense Array)</option>
                  </select>
                  <input required placeholder="Transaction Matrix Detail" className="input-element w-full mb-4" value={formPayload.description||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value})} />
                  <input required type="number" placeholder="Value Amount (INR)" className="input-element w-full mb-4" value={formPayload.amount||''} onChange={e=>setFormPayload({...formPayload, amount:e.target.value})} />
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <input placeholder="Unit Hash Identifier (e.g. Z649)" className="input-element w-full mb-4" value={formPayload.unitCode||''} onChange={e=>setFormPayload({...formPayload, unitCode:e.target.value})} />
                  <input placeholder="Core Gateway Email" className="input-element w-full mb-4" value={formPayload.officialEmail||''} onChange={e=>setFormPayload({...formPayload, officialEmail:e.target.value})} />
                  <input type="number" placeholder="Annual Financial Goal (INR)" className="input-element w-full mb-4" value={formPayload.financialGoal||''} onChange={e=>setFormPayload({...formPayload, financialGoal:e.target.value})} />
                </>
              )}

              {['vault', 'gallery', 'news'].includes(modalMode) && (
                <>
                  <input required placeholder="Identifier / Title" className="input-element w-full mb-4" value={formPayload.title||''} onChange={e=>setFormPayload({...formPayload, title:e.target.value})} />
                  {modalMode !== 'news' && <input placeholder="Target Cloud URL / Link" className="input-element w-full mb-4" value={formPayload.link||''} onChange={e=>setFormPayload({...formPayload, link:e.target.value})} />}
                  <textarea placeholder="Description Payload..." className="input-element w-full mb-4" rows="3" value={formPayload.description||formPayload.content||''} onChange={e=>setFormPayload({...formPayload, description:e.target.value, content:e.target.value})}></textarea>
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