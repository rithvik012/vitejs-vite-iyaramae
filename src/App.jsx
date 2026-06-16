import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { 
  Shield, Plus, Trash2, UsersRound, CircleDollarSign, 
  Settings, X, ArrowUpRight, Mail, Phone,
  Globe, Activity, Crown, BrainCircuit, Send, CalendarClock,
  LayoutDashboard, Fingerprint, Zap, Lock, Unlock, Menu, Pencil, Eye,
  HardDrive, ImagePlus, RadioTower, TrendingUp, TrendingDown
} from 'lucide-react';

// ==========================================
// FIREBASE CONFIGURATION
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
// CLEAN & SIMPLE STYLES
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');

  :root {
    --bg-base: #030303;
    --glass-bg: rgba(15, 15, 15, 0.7);
    --glass-border: rgba(255, 255, 255, 0.08);
    --text-primary: #ffffff;
    --text-secondary: #8b9bb4;
    --accent: #00f0ff;
    --accent-hover: #00d4e6;
    --danger: #ff0055;
    --success: #00ff66;
    --warning: #ffbe0b;
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; font-family: var(--font-body); user-select: none; }
  body, html { background-color: var(--bg-base); color: var(--text-primary); overflow: hidden; height: 100dvh; width: 100vw; -webkit-font-smoothing: antialiased; }
  
  input, textarea, select { user-select: auto; color: #fff !important; background-color: rgba(255,255,255,0.03) !important; outline: none; border: 1px solid var(--glass-border); border-radius: 12px; padding: 16px; transition: all 0.3s; width: 100%; }
  input:focus, textarea:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 20px rgba(0, 240, 255, 0.15); background: rgba(0,0,0,0.8) !important; }
  ::-webkit-scrollbar { width: 0px; }

  /* Background Effects */
  .bg-effects { position: fixed; inset: 0; z-index: -5; background: var(--bg-base); overflow: hidden; }
  .glow-orb { position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.25; animation: float 30s infinite alternate ease-in-out; }
  .orb-1 { width: 60vw; height: 60vw; background: var(--accent); top: -20vh; left: -10vw; }
  .orb-2 { width: 50vw; height: 50vw; background: #7000ff; bottom: -10vh; right: -10vw; animation-delay: -5s; }
  @keyframes float { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(5vw, 5vh) scale(1.05); } }

  /* Splash Screen */
  .boot-splash { position: fixed; inset: 0; z-index: 99999; background: #000; display: flex; align-items: center; justify-content: center; transition: opacity 0.8s ease; }
  .boot-splash.hidden { opacity: 0; pointer-events: none; }
  .splash-text { font-family: var(--font-heading); font-size: 4rem; font-style: italic; color: #fff; }

  /* Scrolling Layout */
  .scroll-container { height: 100dvh; width: 100vw; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
  .section { min-height: 100dvh; width: 100%; scroll-snap-align: center; display: flex; align-items: center; justify-content: center; padding: 100px 24px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
  .section.active { opacity: 1; transform: translateY(0); }

  /* Cards & Grids */
  .content-wrapper { width: 100%; max-width: 1100px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; padding: 20px 0; scrollbar-width: none; }
  .card { background: var(--glass-bg); backdrop-filter: blur(30px); border: 1px solid var(--glass-border); border-radius: 20px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); transition: transform 0.3s; }
  .card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }

  /* Top Bar & Sidebar */
  .top-bar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 90; pointer-events: none;}
  .top-bar > * { pointer-events: auto; }
  .logo-btn { font-family: var(--font-heading); font-size: 2rem; font-style: italic; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: color 0.3s; }
  .logo-btn:hover { color: var(--accent); }
  .admin-status { display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); padding: 8px 16px; border-radius: 50px; cursor: pointer; font-size: 0.8rem; font-weight: 700; color: #fff; transition: all 0.3s; }
  .admin-status:hover { border-color: var(--accent); }
  .admin-status.unlocked { color: var(--accent); border-color: rgba(0,240,255,0.3); }

  .sidebar { position: fixed; right: -400px; top: 0; bottom: 0; width: 400px; background: #080808; border-left: 1px solid var(--glass-border); z-index: 100; padding: 40px 24px; display: flex; flex-direction: column; transition: right 0.5s ease; box-shadow: -20px 0 50px rgba(0,0,0,0.8); }
  .sidebar.open { right: 0; }
  .sidebar-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; margin-bottom: 12px; }

  /* Bottom Dock */
  .dock { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: rgba(10,10,10,0.9); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: 100px; display: flex; gap: 8px; padding: 8px; z-index: 90; }
  .dock-btn { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; transition: all 0.3s; position: relative; }
  .dock-btn.active { background: #fff; color: #000; transform: translateY(-5px); }
  .dock-btn:hover:not(.active) { background: rgba(255,255,255,0.1); color: #fff; }
  .dock-tooltip { position: absolute; top: -40px; background: #fff; color: #000; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; opacity: 0; pointer-events: none; transition: opacity 0.2s; white-space: nowrap; }
  .dock-btn:hover .dock-tooltip { opacity: 1; }

  /* Typography */
  .title { font-family: var(--font-heading); font-style: italic; font-size: 3.5rem; color: #fff; margin-bottom: 8px; }
  .subtitle { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); text-transform: uppercase; display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .big-number { font-size: 3rem; font-weight: 300; color: #fff; }

  /* Buttons & Tags */
  .btn { background: #fff; color: #000; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(255,255,255,0.2); }
  .btn-outline { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--glass-border); }
  .btn-outline:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .icon-btn { background: transparent; color: var(--text-secondary); border: none; cursor: pointer; padding: 8px; border-radius: 50%; transition: 0.2s; }
  .icon-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .icon-btn.danger:hover { color: var(--danger); background: rgba(255,0,85,0.1); }
  .tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); }
  
  /* Tables */
  table { width: 100%; border-collapse: collapse; margin-top: 16px; text-align: left; }
  th { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-secondary); font-size: 0.8rem; text-transform: uppercase; font-weight: 600; }
  td { padding: 18px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.95rem; }

  /* AI Chat Box */
  .chat-container { background: rgba(0,0,0,0.5); border-radius: 16px; padding: 20px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 16px; height: 500px; }
  .chat-history { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; padding-right: 8px; scroll-behavior: smooth; }
  .message { padding: 16px; border-radius: 12px; font-size: 0.95rem; max-width: 85%; line-height: 1.6; }
  .message.bot { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; align-self: flex-start; border-bottom-left-radius: 4px; }
  .message.user { background: rgba(0,240,255,0.15); border: 1px solid rgba(0,240,255,0.3); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }

  /* Modals */
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); width: 100%; max-width: 600px; border-radius: 20px; padding: 40px; max-height: 90vh; overflow-y: auto; }

  @media (max-width: 768px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .title { font-size: 2.8rem; }
    .dock { width: 92%; overflow-x: auto; justify-content: flex-start; }
    .dock-btn { min-width: 46px; height: 46px; }
    .section { padding: 120px 16px; }
    .modal { padding: 24px; }
    .top-bar { padding: 16px 20px; }
    .sidebar { width: 100%; right: -100%; }
  }
`;

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Database Arrays
  const [leadership, setLeadership] = useState({ unitCode: "Z649", officialEmail: "z649@nasaindia.co.in", financialGoal: "50000" });
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [vaultData, setVaultData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // AI Chat Logic
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your RSA AI Assistant. I can help you with design ideas, NASA trophies, team management, or any architectural questions. How can I assist you today?' }
  ]);
  const chatBoxRef = useRef(null);

  // Forms and Modals
  const [modalMode, setModalMode] = useState(null); 
  const [viewingProfile, setViewingProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const scrollRef = useRef(null);

  const sections = [
    { id: 'dashboard', icon: <LayoutDashboard size={22}/>, label: 'Dashboard' },
    { id: 'team', icon: <UsersRound size={22}/>, label: 'Team' },
    { id: 'funds', icon: <CircleDollarSign size={22}/>, label: 'Finances' },
    { id: 'vault', icon: <HardDrive size={22}/>, label: 'Files' },
    { id: 'gallery', icon: <ImagePlus size={22}/>, label: 'Gallery' },
    { id: 'news', icon: <Activity size={22}/>, label: 'Notice Board' },
    { id: 'council', icon: <Crown size={22}/>, label: 'Unit Council' },
    { id: 'ai', icon: <BrainCircuit size={22}/>, label: 'AI Assistant' }
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

  // Fix for the jumping page bug: Only scroll the chat box inner div!
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [aiMessages]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollTop / window.innerHeight);
    if (idx !== activeSection) setActiveSection(idx);
  };

  const navigateTo = (idx) => {
    scrollRef.current.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
    setActiveSection(idx);
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      const pass = prompt("Enter Admin Password:");
      if (pass === ADMIN_SECURE_KEY) setIsAdmin(true);
      else if (pass) alert("Incorrect Password.");
    }
  };

  const saveToDatabase = async () => {
    try {
      if (modalMode === 'hq') {
        await setDoc(doc(db, "unit", "hq"), formData);
      } else if (formData.id) {
        const { id, ...data } = formData;
        await updateDoc(doc(db, modalMode, id), data);
      } else {
        await addDoc(collection(db, modalMode), { ...formData, timestamp: Date.now() });
      }
      setModalMode(null); 
      setViewingProfile(null);
      setFormData({});
    } catch (e) { 
      alert("Error saving data. Please check your connection."); 
    }
  };

  const deleteRecord = async (col, id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      await deleteDoc(doc(db, col, id));
      setModalMode(null);
      setViewingProfile(null);
    }
  };

  // ==========================================
  // HIGHLY CREATIVE AI LOGIC
  // ==========================================
  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    const text = aiInput.trim();
    setAiMessages(prev => [...prev, { sender: 'user', text: text }]);
    setAiInput('');

    setTimeout(() => {
      const q = text.toLowerCase();
      let response = "";

      if (q.includes("design") || q.includes("concept") || q.includes("idea")) {
        response = "When developing a concept, I always recommend looking at the context first. What is the sun path? Where is the wind coming from? A great design solves a problem before it tries to look beautiful. Try mixing standard geometric forms with materials that are native to your site's location.";
      } else if (q.includes("lik") || q.includes("kahn") || q.includes("heritage")) {
        response = "For the Louis I. Kahn (LIK) Trophy, your primary focus must be accuracy and storytelling. Don't just draw the building; draw how people used it. Highlight the vernacular joints, the thickness of the walls for climate control, and ensure your base maps and line weights are incredibly precise.";
      } else if (q.includes("msl") || q.includes("landscape") || q.includes("shaheer")) {
        response = "For the Mohammad Shaheer Landscape Trophy, treat the land as a living organism. If you are working on urban flooding (like Velachery), think about bioswales, permeable paving, and native planting. Architecture shouldn't fight water; it should guide it.";
      } else if (q.includes("trophies") || q.includes("nasa")) {
        response = "Currently, NASA India has opened submissions for the LIK Trophy and the Reubens Showcase. Make sure your Unit Designee has uploaded all the names to the portal. I recommend setting internal college deadlines 3 days before the actual NASA deadline to avoid server crashes!";
      } else if (q.includes("time") || q.includes("manage") || q.includes("stress")) {
        response = "Architecture school is tough! The best trick is 'Time-Boxing'. Dedicate 2 hours purely to drafting, then take a 30-minute break. Do not try to design and draft at the same time. Sketch your ideas on paper first, solve the problems, and only then move to AutoCAD or Rhino.";
      } else if (q.includes("hello") || q.includes("hi")) {
        response = "Hello there! I'm ready to help. You can ask me for design critiques, trophy information, or how to organize your team better.";
      } else {
        response = "That is an interesting point. As an AI, I suggest looking at it from a different perspective: how does this affect the end user navigating the space? Would you like me to pull up some reference data or help you brainstorm further?";
      }

      setAiMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 1000);
  };

  // ==========================================
  // UI SECTIONS
  // ==========================================
  const renderDashboard = () => (
    <div className="content-wrapper">
      <div><span className="subtitle">Overview</span><h1 className="title">Dashboard</h1></div>
      <div className="grid-3">
        <div className="card">
          <span className="subtitle"><UsersRound size={16}/> Total Team Members</span>
          <div className="big-number">{crewData.length}</div>
        </div>
        <div className="card">
          <span className="subtitle"><HardDrive size={16}/> Saved Files</span>
          <div className="big-number">{vaultData.length}</div>
        </div>
        <div className="card">
          <span className="subtitle"><Activity size={16}/> Notice Board Updates</span>
          <div className="big-number">{newsData.length}</div>
        </div>
      </div>
    </div>
  );

  const renderCrew = () => {
    const grouped = crewData.reduce((acc, u) => { const y = u.year||"Other"; if(!acc[y]) acc[y]=[]; acc[y].push(u); return acc; }, {});
    const order = ['1', '2', '3', '4', '5', 'Alumni', 'Other']; 
    return (
      <div className="content-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="subtitle">People</span><h1 className="title">Team Members</h1></div>
          {isAdmin && <button className="btn" onClick={() => { setFormData({ role: 'Member', year: '1' }); setModalMode('crew'); }}><Plus size={16}/> Add Member</button>}
        </div>
        {order.map(year => grouped[year] && (
          <div key={year} style={{ marginTop: '24px' }}>
            <span className="subtitle" style={{ color: '#fff' }}>{year === 'Alumni' || year === 'Other' ? year : `Year ${year} Students`}</span>
            <div className="grid-2" style={{ marginTop: '16px' }}>
              {grouped[year].map(m => (
                <div key={m.id} className="card" style={{ cursor: 'pointer', border: ['UD', 'USEC', 'Coordinator'].includes(m.role) ? '1px solid var(--warning)' : '' }} onClick={() => setViewingProfile(m)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="tag">
                      {['UD', 'USEC', 'Coordinator'].includes(m.role) && <Crown size={12} style={{marginRight:4}}/>}
                      {m.role === 'Coordinator' && m.coordinatorType ? `${m.coordinatorType} Head` : m.role}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display:'flex', alignItems:'center', gap:'4px' }}><Eye size={14}/> View</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '600', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{m.name}</div>
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
    const net = income - expense;
    const goal = Number(leadership.financialGoal) || 1; 

    return (
      <div className="content-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div><span className="subtitle">Money Flow</span><h1 className="title">Finances</h1></div>
          {isAdmin && <button className="btn" onClick={() => { setFormData({ type: 'income' }); setModalMode('finances'); }}><Plus size={16}/> Add Transaction</button>}
        </div>

        <div className="grid-2">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="subtitle">Total Money Moved</span>
            <div style={{display:'flex', gap:'32px', marginTop:'10px'}}>
              <div><span style={{fontSize:'0.8rem', color:'var(--text-secondary)'}}>INCOME</span><div style={{fontSize:'1.8rem', fontWeight:'700', color:'var(--success)'}}>₹{income.toLocaleString()}</div></div>
              <div><span style={{fontSize:'0.8rem', color:'var(--text-secondary)'}}>EXPENSES</span><div style={{fontSize:'1.8rem', fontWeight:'700', color:'var(--danger)'}}>₹{expense.toLocaleString()}</div></div>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="subtitle" style={{color:'#fff'}}><Zap size={14}/> Current Balance</span>
            <div className="big-number">₹{net.toLocaleString()}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginTop: '16px' }}>
               <div style={{ width: `${Math.min((net/goal)*100, 100)}%`, height: '100%', background: '#fff' }}></div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
              <span>Target Goal</span><span>₹{goal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px 24px', overflowX: 'auto' }}>
           <table>
             <thead>
               <tr><th>Type</th><th>Details</th><th>Amount</th>{isAdmin && <th>Edit</th>}</tr>
             </thead>
             <tbody>
               {financialLog.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'30px', color:'rgba(255,255,255,0.5)'}}>No money records yet.</td></tr>}
               {financialLog.map(f => (
                 <tr key={f.id}>
                   <td><span className="tag" style={{ color: f.type==='income'?'var(--success)':'var(--danger)', borderColor: f.type==='income'?'rgba(0,255,102,0.3)':'rgba(255,0,85,0.3)' }}>{f.type}</span></td>
                   <td style={{ fontWeight: '500' }}>{f.description}</td>
                   <td style={{ fontWeight:'700', color: f.type==='income'?'var(--success)':'#fff' }}>{f.type==='income'?'+ ':'- '}₹{Number(f.amount).toLocaleString()}</td>
                   {isAdmin && (
                     <td>
                       <div style={{ display: 'flex', gap: '8px' }}>
                         <button className="icon-btn" onClick={() => { setFormData(f); setModalMode('finances'); }}><Pencil size={16}/></button>
                         <button className="icon-btn danger" onClick={() => deleteRecord('finances', f.id)}><Trash2 size={16}/></button>
                       </div>
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
    <div className="content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="subtitle">Storage</span><h1 className="title">File Vault</h1></div>
        {isAdmin && <button className="btn" onClick={() => { setFormData({ type: 'Document' }); setModalMode('vault'); }}><Plus size={16}/> Add File</button>}
      </div>
      <div className="grid-3">
        {vaultData.map(v => (
          <div key={v.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="tag"><HardDrive size={12}/> {v.type}</span>
              {isAdmin && (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="icon-btn" onClick={() => { setFormData(v); setModalMode('vault'); }}><Pencil size={14}/></button>
                  <button className="icon-btn danger" onClick={() => deleteRecord('vault', v.id)}><Trash2 size={14}/></button>
                </div>
              )}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '24px', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{v.title}</div>
            <a href={v.link||'#'} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none' }}>Open File <ArrowUpRight size={16}/></a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="subtitle">Images</span><h1 className="title">Photo Gallery</h1></div>
        {isAdmin && <button className="btn" onClick={() => { setFormData({ fileType: 'Image' }); setModalMode('gallery'); }}><Plus size={16}/> Add Photo</button>}
      </div>
      <div className="grid-2">
        {galleryData.map(g => (
          <div key={g.id} className="card" style={{ padding: 0 }}>
            <div style={{ height: '250px', background: `url("${g.link}") center/cover`, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!g.link && <ImagePlus size={40} color="rgba(255,255,255,0.3)" />}
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="tag">{g.category || 'General'}</span>
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="icon-btn" onClick={() => { setFormData(g); setModalMode('gallery'); }}><Pencil size={14}/></button>
                    <button className="icon-btn danger" onClick={() => deleteRecord('gallery', g.id)}><Trash2 size={14}/></button>
                  </div>
                )}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>{g.title}</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem', lineHeight: '1.6' }}>{g.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="subtitle">Updates</span><h1 className="title">Notice Board</h1></div>
        {isAdmin && <button className="btn" onClick={() => { setFormData({}); setModalMode('news'); }}><RadioTower size={16}/> Add Notice</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
        {newsData.length === 0 && <div style={{padding:'20px', color:'rgba(255,255,255,0.5)'}}>No new updates.</div>}
        {newsData.sort((a,b)=>b.timestamp-a.timestamp).map(n => (
          <div key={n.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
              <span className="tag" style={{ color: 'var(--accent)', borderColor: 'rgba(0,240,255,0.3)' }}><Activity size={12}/> {n.tag || 'Update'}</span>
              {isAdmin && (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="icon-btn" onClick={() => { setFormData(n); setModalMode('news'); }}><Pencil size={14}/></button>
                  <button className="icon-btn danger" onClick={() => deleteRecord('news', n.id)}><Trash2 size={14}/></button>
                </div>
              )}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '16px', fontFamily: "var(--font-heading)", fontStyle: 'italic' }}>{n.title}</div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>{n.content}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUnitCouncil = () => (
    <div className="content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div><span className="subtitle">Leadership</span><h1 className="title">Unit Council</h1></div>
        {isAdmin && <button className="btn btn-outline" onClick={() => { setFormData(leadership); setModalMode('hq'); }}><Settings size={16}/> Edit Unit Details</button>}
      </div>
      <div className="card" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <span className="subtitle" style={{color: '#fff'}}>Official Unit Code</span>
        <div style={{ fontSize: '3rem', fontWeight: '700', margin: '10px 0', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>Unit {leadership.unitCode}</div>
        <div className="tag" style={{textTransform: 'lowercase'}}><Globe size={12}/> {leadership.officialEmail}</div>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="content-wrapper" style={{ maxWidth: '900px' }}>
      <div><span className="subtitle">Smart Assistant</span><h1 className="title">AI Co-Pilot</h1></div>
      <div className="chat-container">
        <div className="chat-history" ref={chatBoxRef}>
          {aiMessages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleAiSubmit} style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
          <input placeholder="Ask about design, NASA events, or team management..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} style={{ flex: 1 }}/>
          <button type="submit" className="btn" style={{ padding: '0 24px', borderRadius: '12px' }}><Send size={18}/></button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      
      <div className="bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className={`boot-splash ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash-text">RSA.</div>
      </div>

      <nav className="top-bar">
        <div className="pointer-events-auto">
          <div className={`admin-status ${isAdmin ? 'unlocked' : ''}`} onClick={toggleAdmin}>
            {isAdmin ? <Unlock size={14}/> : <Lock size={14}/>}
            {isAdmin ? 'ADMIN MODE' : 'USER MODE'}
          </div>
        </div>
        
        <div className="logo-btn pointer-events-auto" onClick={() => setSidebarOpen(!sidebarOpen)}>
          RSA<span style={{color: 'var(--accent)'}}>.</span>
          {sidebarOpen ? <X size={28} color="#fff" style={{marginLeft: 8}}/> : <Menu size={28} color="#fff" style={{marginLeft: 8}}/>}
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontStyle: 'italic', color: '#fff', marginBottom: '32px' }}>NASA India</h2>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <span className="subtitle" style={{ marginBottom: '16px' }}><CalendarClock size={16}/> Upcoming Events</span>
          <div className="sidebar-item">
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>68th Annual Convention</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Status: Preparation Phase</div>
          </div>

          <span className="subtitle" style={{ marginTop: '32px', marginBottom: '16px' }}><Shield size={16}/> Active Trophies</span>
          <div className="sidebar-item">
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>Louis I. Kahn Trophy</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Focus: Documentation</div>
          </div>
          <div className="sidebar-item">
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>Landscape Trophy</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Focus: Urban Context</div>
          </div>

          <a href="https://nasaindia.co/" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', marginTop: '32px', textDecoration: 'none' }}>
            Open Official Website <ArrowUpRight size={16}/>
          </a>
        </div>
      </div>

      <div className="dock">
        {sections.map((item, i) => (
          <div key={item.id} className={`dock-btn ${activeSection === i ? 'active' : ''}`} onClick={() => navigateTo(i)}>
            {item.icon}
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="scroll-container" ref={scrollRef} onScroll={handleScroll}>
        <section className={`section ${activeSection === 0 ? 'active' : ''}`}>{renderDashboard()}</section>
        <section className={`section ${activeSection === 1 ? 'active' : ''}`}>{renderCrew()}</section>
        <section className={`section ${activeSection === 2 ? 'active' : ''}`}>{renderFunds()}</section>
        <section className={`section ${activeSection === 3 ? 'active' : ''}`}>{renderVault()}</section>
        <section className={`section ${activeSection === 4 ? 'active' : ''}`}>{renderGallery()}</section>
        <section className={`section ${activeSection === 5 ? 'active' : ''}`}>{renderNews()}</section>
        <section className={`section ${activeSection === 6 ? 'active' : ''}`}>{renderUnitCouncil()}</section>
        <section className={`section ${activeSection === 7 ? 'active' : ''}`}>{renderAI()}</section>
      </div>

      {/* VIEW MEMBER MODAL */}
      {viewingProfile && (
        <div className="overlay pointer-events-auto">
          <div className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 className="title" style={{ fontSize: '2.5rem' }}>Profile</h2>
              <button className="icon-btn" onClick={() => setViewingProfile(null)}><X size={24}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'32px' }}>
              <div><span className="subtitle">Name</span><div style={{fontSize:'1.6rem', fontWeight:'700', color:'#fff'}}>{viewingProfile.name}</div></div>
              <div><span className="subtitle">Role</span><div className="tag">{viewingProfile.role}</div></div>
              {viewingProfile.coordinatorType && <div><span className="subtitle">Department</span><div style={{fontSize:'1.1rem', color:'#fff'}}>{viewingProfile.coordinatorType} Head</div></div>}
              <div><span className="subtitle">Year of Study</span><div style={{fontSize:'1.1rem', color:'#fff'}}>Year {viewingProfile.year}</div></div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <a href={`mailto:${viewingProfile.email}`} className="btn" style={{ flex: 1, textDecoration: 'none' }}><Mail size={16}/> Email</a>
                {viewingProfile.phone && <a href={`tel:${viewingProfile.phone}`} className="btn" style={{ flex: 1, textDecoration: 'none' }}><Phone size={16}/> Call</a>}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {isAdmin ? (
                <>
                  <button className="btn btn-outline" style={{flex: 1}} onClick={() => { setFormData(viewingProfile); setModalMode('crew'); }}><Pencil size={16}/> Edit</button>
                  <button className="btn btn-outline" style={{color:'var(--danger)', borderColor:'rgba(255,0,85,0.3)'}} onClick={() => deleteRecord('crew', viewingProfile.id)}><Trash2 size={16}/> Delete</button>
                </>
              ) : (
                <div style={{fontSize:'0.85rem', color:'var(--text-secondary)'}}><Lock size={14} style={{display:'inline', marginBottom:'-2px'}}/> Admin access required to edit.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT FORM MODAL */}
      {modalMode && (
        <div className="overlay pointer-events-auto">
          <div className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 className="title" style={{ fontSize: '2.5rem' }}>{formData.id ? 'Edit Data' : 'Add New'}</h2>
              <button className="icon-btn" onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); saveToDatabase(); }}>
              
              {modalMode === 'crew' && (
                <>
                  <span className="subtitle">Full Name</span>
                  <input required className="mb-4" value={formData.name||''} onChange={e=>setFormData({...formData, name:e.target.value})} />
                  <span className="subtitle">Email Address</span>
                  <input type="email" className="mb-4" value={formData.email||''} onChange={e=>setFormData({...formData, email:e.target.value})} />
                  <span className="subtitle">Phone Number (Optional)</span>
                  <input type="tel" className="mb-4" value={formData.phone||''} onChange={e=>setFormData({...formData, phone:e.target.value})} />
                  
                  <span className="subtitle">Role</span>
                  <select required className="mb-4" value={formData.role||''} onChange={e=>setFormData({...formData, role:e.target.value})}>
                    <option value="" disabled>Select Role...</option>
                    <option value="Member">Student Member</option>
                    <option value="UD">Unit Designee (UD)</option>
                    <option value="USEC">Unit Secretary (USEC)</option>
                    <option value="Coordinator">Coordinator</option>
                  </select>

                  {formData.role === 'Coordinator' && (
                    <>
                      <span className="subtitle">Department (e.g. Design, Events)</span>
                      <input required className="mb-4" value={formData.coordinatorType||''} onChange={e=>setFormData({...formData, coordinatorType:e.target.value})} />
                    </>
                  )}

                  <span className="subtitle">Year of Study</span>
                  <select className="mb-4" value={formData.year||'1'} onChange={e=>setFormData({...formData, year:e.target.value})}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </>
              )}

              {modalMode === 'finances' && (
                <>
                  <span className="subtitle">Money Type</span>
                  <select className="mb-4" value={formData.type||'income'} onChange={e=>setFormData({...formData, type:e.target.value})}>
                    <option value="income">Income (Money In)</option>
                    <option value="expense">Expense (Money Out)</option>
                  </select>
                  <span className="subtitle">Description</span>
                  <input required className="mb-4" value={formData.description||''} onChange={e=>setFormData({...formData, description:e.target.value})} />
                  <span className="subtitle">Amount (INR)</span>
                  <input required type="number" className="mb-4" value={formData.amount||''} onChange={e=>setFormData({...formData, amount:e.target.value})} />
                </>
              )}

              {modalMode === 'hq' && (
                <>
                  <span className="subtitle">Unit Code</span>
                  <input className="mb-4" value={formData.unitCode||''} onChange={e=>setFormData({...formData, unitCode:e.target.value})} />
                  <span className="subtitle">Official College Email</span>
                  <input className="mb-4" value={formData.officialEmail||''} onChange={e=>setFormData({...formData, officialEmail:e.target.value})} />
                  <span className="subtitle">Financial Goal (INR)</span>
                  <input type="number" className="mb-4" value={formData.financialGoal||''} onChange={e=>setFormData({...formData, financialGoal:e.target.value})} />
                </>
              )}

              {['vault', 'gallery', 'news'].includes(modalMode) && (
                <>
                  <span className="subtitle">Title</span>
                  <input required className="mb-4" value={formData.title||''} onChange={e=>setFormData({...formData, title:e.target.value})} />
                  {modalMode !== 'news' && (
                    <>
                      <span className="subtitle">Link / URL</span>
                      <input className="mb-4" value={formData.link||''} onChange={e=>setFormData({...formData, link:e.target.value})} />
                    </>
                  )}
                  <span className="subtitle">Description</span>
                  <textarea className="mb-4" rows="4" value={formData.description||formData.content||''} onChange={e=>setFormData({...formData, description:e.target.value, content:e.target.value})}></textarea>
                </>
              )}

              <button type="submit" className="btn" style={{ width: '100%', marginTop: '20px', padding: '16px' }}>
                Save Data
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}