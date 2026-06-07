import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { 
  Shield, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Users, 
  TrendingUp, 
  FolderGit2, 
  Layers, 
  ChevronDown, 
  GraduationCap, 
  UserPlus, 
  X, 
  CheckCircle2 
} from 'lucide-react';

// ==========================================
// CENTRALIZED CONFIGURATION & FIREBASE SETUP
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

// Secure Master Access Key
const ADMIN_SECURE_KEY = "RSA_Z649_SECURE_2026"; 

// ==========================================
// ADVANCED KINETIC STYLING SYSTEM
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;600;700;800&display=swap');

  :root {
    --bg-main: #0a0a0c;
    --bg-card: rgba(18, 18, 22, 0.75);
    --accent: #ffffff;
    --accent-glow: rgba(255, 255, 255, 0.15);
    --border-light: rgba(255, 255, 255, 0.08);
    --border-glow: rgba(255, 255, 255, 0.2);
    --text-main: #f3f4f6;
    --text-muted: #8e929b;
    --font-syne: 'Syne', sans-serif;
    --font-mono: 'Space Grotesk', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    font-family: var(--font-mono);
    overflow-x: hidden;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.015) 0%, transparent 40%);
  }

  /* Kinetic Smooth Scroll Snap Container */
  .kinetic-scroll-engine {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }
  .kinetic-scroll-engine::-webkit-scrollbar { display: none; }

  /* Kinetic Section Blocks */
  .scrolling-section {
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    position: relative;
    opacity: 0.2;
    transform: scale(0.96) translateY(20px);
    transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .scrolling-section.view-active {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  /* Architectural Layout Elements */
  .glass-panel {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-light);
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 1280px;
    height: 85vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
    scrollbar-width: none;
  }
  .glass-panel::-webkit-scrollbar { display: none; }

  /* Dynamic Flow Indicators */
  .ambient-axis {
    position: fixed;
    top: 0;
    left: 80px;
    width: 1px;
    height: 100vh;
    background: linear-gradient(to bottom, transparent, var(--border-light) 20%, var(--border-light) 80%, transparent);
    z-index: 1;
  }

  .axis-pulse {
    position: absolute;
    width: 3px;
    height: 40px;
    left: -1px;
    background: var(--accent);
    box-shadow: 0 0 12px var(--accent);
    animation: axisFlow 6s infinite linear;
  }

  @keyframes axisFlow {
    0% { top: -40px; }
    100% { top: 100vh; }
  }

  /* Interactive Navigation HUD */
  .hud-navigation {
    position: fixed;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 100;
  }

  .hud-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid transparent;
  }

  .hud-dot.active {
    background: var(--accent);
    transform: scale(1.6);
    box-shadow: 0 0 10px var(--accent);
  }

  .hud-label {
    position: absolute;
    right: 24px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }
  .hud-dot-container:hover .hud-label { opacity: 1; }

  /* System UI Components */
  .section-title {
    font-family: var(--font-syne);
    font-weight: 800;
    font-size: 2.5rem;
    letter-spacing: -1px;
    margin-bottom: 24px;
    text-transform: uppercase;
  }

  .grid-deck {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin-top: 24px;
  }

  .architectural-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 24px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .architectural-card:hover {
    border-color: var(--border-glow);
    background: rgba(255, 255, 255, 0.04);
    transform: translateY(-4px);
  }

  .interactive-action-btn {
    background: var(--accent);
    color: var(--bg-main);
    border: none;
    padding: 12px 24px;
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: 13px;
    border-radius: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }

  .interactive-action-btn:hover {
    box-shadow: 0 0 15px var(--accent-glow);
    transform: translateY(-1px);
  }

  .sec-btn {
    background: transparent;
    color: var(--text-main);
    border: 1px solid var(--border-light);
  }
  .sec-btn:hover { background: rgba(255,255,255,0.05); border-color: var(--accent); }

  /* Categorized Year Badges */
  .year-lane-title {
    font-family: var(--font-syne);
    font-size: 1.1rem;
    color: var(--text-muted);
    letter-spacing: 2px;
    border-left: 2px solid var(--accent);
    padding-left: 12px;
    margin: 32px 0 20px 0;
    text-transform: uppercase;
  }

  /* Form Fields */
  .input-element {
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border-light);
    padding: 14px;
    border-radius: 8px;
    color: var(--text-main);
    font-family: var(--font-mono);
    margin-bottom: 16px;
    transition: border-color 0.3s ease;
  }
  .input-element:focus { outline: none; border-color: var(--accent); }

  /* Modal System */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(5, 5, 7, 0.85);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-window {
    background: #121216;
    border: 1px solid var(--border-light);
    width: 100%;
    max-width: 520px;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  }

  .lockout-badge {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 100;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    padding: 10px 16px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 12px;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }
  .lockout-badge.active { border-color: #22c55e; color: #22c55e; }
`;

export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isLeadershipMode, setIsLeadershipMode] = useState(false);
  const [crewData, setCrewData] = useState([]);
  const [financialLog, setFinancialLog] = useState([]);
  const [modalMode, setModalMode] = useState(null); // 'crew' | 'fund' | null
  const [formPayload, setFormPayload] = useState({});
  
  const scrollEngineRef = useRef(null);

  const structuralSections = [
    { id: 'core', label: 'Command Center' },
    { id: 'crew', label: 'Unit Crew' },
    { id: 'funds', label: 'Treasury Ledger' }
  ];

  // Real-time Database Sync
  useEffect(() => {
    const unsubCrew = onSnapshot(collection(db, "crew"), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrewData(data);
    });

    const unsubFunds = onSnapshot(collection(db, "funds"), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFinancialLog(data);
    });

    return () => { unsubCrew(); unsubFunds(); };
  }, []);

  // Kinetic Scrolling Engine Tracking
  const handleEngineScroll = () => {
    if (!scrollEngineRef.current) return;
    const currentScrollPosition = scrollEngineRef.current.scrollTop;
    const calculateIndex = Math.round(currentScrollPosition / window.innerHeight);
    if (calculateIndex !== activeSectionIdx) {
      setActiveSectionIdx(calculateIndex);
    }
  };

  const executeEngineNavigation = (targetIndex) => {
    if (!scrollEngineRef.current) return;
    scrollEngineRef.current.scrollTo({
      top: targetIndex * window.innerHeight,
      behavior: 'smooth'
    });
    setActiveSectionIdx(targetIndex);
  };

  // Secure Gatekeeper Validation
  const challengeAdminAuthorization = () => {
    if (isLeadershipMode) {
      setIsLeadershipMode(false);
    } else {
      const entryToken = prompt("ENTER AUTHORIZED UD/USEC PASSCODE:");
      if (entryToken === ADMIN_SECURE_KEY) {
        setIsLeadershipMode(true);
      } else if (entryToken !== null) {
        alert("ACCESS DENIED: Invalid Security Token.");
      }
    }
  };

  // Global Batch Promotion Engine
  const executeBatchPromotionSequence = async () => {
    const confirmation = window.confirm(
      "⚠️ AMBIENT PROTOCOL NOTICE:\n\nThis sequence will advance every student block up by one academic tier (e.g., 1st Year → 2nd Year).\n\n5th Year designees will automatically be transitioned to Alumni. Do you authorize this database modification?"
    );
    if (!confirmation) return;

    try {
      const operationBatch = writeBatch(db);
      crewData.forEach((member) => {
        const structuralYear = member.year;
        let advancedYear = structuralYear;

        if (Number(structuralYear) >= 1 && Number(structuralYear) < 5) {
          advancedYear = Number(structuralYear) + 1;
        } else if (Number(structuralYear) === 5 || structuralYear === "5") {
          advancedYear = "Alumni";
        }

        if (advancedYear !== structuralYear) {
          const docReference = doc(db, 'crew', member.id);
          operationBatch.update(docReference, { year: advancedYear });
        }
      });

      await operationBatch.commit();
      
      // Dynamic celebration feedback
      if (window.confetti) {
        window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
      alert("DATABASE UPDATE SUCCESSFUL: All student records migrated to their consecutive academic terms.");
    } catch (err) {
      console.error(err);
      alert("CRITICAL DATA ERROR: Unified write sequence failed to process.");
    }
  };

  // Database Deletions
  const removeDocumentRecord = async (targetCollection, docId) => {
    if (!window.confirm("Verify clear intent to remove this record permanently from cloud infrastructure.")) return;
    try {
      await deleteDoc(doc(db, targetCollection, docId));
    } catch (e) {
      alert("Error clearing record.");
    }
  };

  // Submission Pipeline
  const commitRecordSubmission = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'crew') {
        const fallbackPayload = {
          name: formPayload.name || "Unnamed Personnel",
          role: formPayload.role || "Delegate",
          email: formPayload.email || "",
          phone: formPayload.phone || "",
          skills: formPayload.skills || "",
          year: formPayload.year ? (formPayload.year === 'Alumni' ? 'Alumni' : Number(formPayload.year)) : 1
        };
        await addDoc(collection(db, "crew"), fallbackPayload);
      } else if (modalMode === 'fund') {
        const fallbackFund = {
          description: formPayload.description || "Uncategorized Transaction",
          amount: Number(formPayload.amount) || 0,
          type: formPayload.type || "expense",
          date: formPayload.date || new Date().toISOString().split('T')[0]
        };
        await addDoc(collection(db, "funds"), fallbackFund);
      }
      setModalMode(null);
      setFormPayload({});
    } catch (err) {
      alert("Failed to commit data packet.");
    }
  };

  // ==========================================
  // RENDER BLOCKS
  // ==========================================
  
  // 1. Dashboard View
  const renderDashboardBlock = () => {
    const revenueSum = financialLog.filter(f => f.type === 'income').reduce((acc, c) => acc + (c.amount || 0), 0);
    const expenseSum = financialLog.filter(f => f.type === 'expense').reduce((acc, c) => acc + (c.amount || 0), 0);
    const operatingCapital = revenueSum - expenseSum;

    return (
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>National Association of Students of Architecture</div>
            <h1 className="section-title" style={{ marginTop: '6px' }}>UNIT Z649 HQ</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--text-muted)' }}>ACADEMIC SYSTEM</div>
            <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '4px' }}>OPERATIONAL</div>
          </div>
        </div>

        <div className="grid-deck" style={{ marginTop: '40px' }}>
          <div className="architectural-card" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
              <Users size={18} />
              <div style={{ fontSize: '12px', letterSpacing: '1px' }}>ACTIVE PERSONNEL</div>
            </div>
            <div style={{ fontSize: '48px', fontWeight: '800', marginTop: '16px', fontFamily: 'var(--font-syne)' }}>
              {crewData.length}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Registered Sync Delegates</div>
          </div>

          <div className="architectural-card" style={{ borderLeft: '3px solid #22c55e' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
              <TrendingUp size={18} />
              <div style={{ fontSize: '12px', letterSpacing: '1px' }}>NET ASSET LEDGER</div>
            </div>
            <div style={{ fontSize: '48px', fontWeight: '800', marginTop: '16px', fontFamily: 'var(--font-syne)' }}>
              ₹{operatingCapital.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Liquid Base Balance</div>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontFamily: 'var(--font-syne)', marginBottom: '12px', fontSize: '14px', letterSpacing: '1px' }}>SYSTEM MOTIF</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Welcome to the architecture framework interface for Unit Z649. Use your trackpad or mousewheel to scroll smoothly through distinct data arrays. Authenticate using the environmental lock switch below to manage structural assets.
          </p>
        </div>
      </div>
    );
  };

  // 2. Organized Crew View
  const renderCrewBlock = () => {
    // Structural Category Allocation
    const allocationMap = crewData.reduce((acc, user) => {
      const yearBracket = user.year || "Unassigned";
      if (!acc[yearBracket]) acc[yearBracket] = [];
      acc[yearBracket].push(user);
      return acc;
    }, {});

    const processingOrder = Object.keys(allocationMap).sort((alpha, beta) => {
      if (alpha === "Alumni") return 1;
      if (beta === "Alumni") return -1;
      if (alpha === "Unassigned") return 1;
      if (beta === "Unassigned") return -1;
      return Number(alpha) - Number(beta);
    });

    return (
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--text-muted)' }}>ROSTER INTERFACE</div>
            <h1 className="section-title" style={{ margin: '4px 0 0 0' }}>UNIT CREW</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {isLeadershipMode && (
              <button className="interactive-action-btn sec-btn" onClick={executeBatchPromotionSequence}>
                <TrendingUp size={16} /> ADVANCE ALL BATCHES ⇡
              </button>
            )}
            <button className="interactive-action-btn" onClick={() => { setFormPayload({ year: '1' }); setModalMode('crew'); }}>
              <UserPlus size={16} /> REGISTER MEMBER
            </button>
          </div>
        </div>

        {processingOrder.map((bracket) => (
          <div key={bracket}>
            <div className="year-lane-title">
              {bracket === "Alumni" || bracket === "Unassigned" ? bracket : `${bracket}${getOrdinalSuffix(bracket)} YEAR BATCH`}
            </div>
            <div className="grid-deck">
              {allocationMap[bracket].map((member) => (
                <div key={member.id} className="architectural-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {member.role}
                    </span>
                    {isLeadershipMode && (
                      <button 
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} 
                        onClick={() => removeDocumentRecord('crew', member.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '6px', fontFamily: 'var(--font-syne)' }}>{member.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>{member.email} • {member.phone}</div>
                  {member.skills && (
                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '12px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '1px' }}>CORE PROFICIENCIES</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-main)' }}>{member.skills}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {crewData.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>No localized personnel profiles found.</div>
        )}
      </div>
    );
  };

  // Helper utility for clear ordinal text labels
  const getOrdinalSuffix = (val) => {
    const num = Number(val);
    if (num === 1) return 'st';
    if (num === 2) return 'nd';
    if (num === 3) return 'rd';
    return 'th';
  };

  // 3. Treasury View
  const renderFundsBlock = () => {
    return (
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--text-muted)' }}>FINANCIAL SUB-SYSTEM</div>
            <h1 className="section-title" style={{ margin: '4px 0 0 0' }}>TREASURY LEDGER</h1>
          </div>
          <button className="interactive-action-btn" onClick={() => { setFormPayload({ type: 'expense' }); setModalMode('fund'); }}>
            <Plus size={16} /> LOG TRANSACTION
          </button>
        </div>

        <div className="architectural-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', padding: '16px 24px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-light)', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
            <div>STATEMENT ALLOCATION</div>
            <div>DATETIME</div>
            <div>VALUATION</div>
            {isLeadershipMode && <div style={{ width: '24px' }}></div>}
          </div>
          
          {financialLog.map((tx) => (
            <div key={tx.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', padding: '20px 24px', borderBottom: '1px solid var(--border-light)', alignItems: 'center', fontSize: '14px' }}>
              <div style={{ fontWeight: '500' }}>{tx.description}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{tx.date}</div>
              <div style={{ fontWeight: '600', color: tx.type === 'income' ? '#22c55e' : '#ef4444' }}>
                {tx.type === 'income' ? '+' : '-'} ₹{Number(tx.amount).toLocaleString('en-IN')}
              </div>
              {isLeadershipMode ? (
                <button 
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} 
                  onClick={() => removeDocumentRecord('funds', tx.id)}
                >
                  <X size={16} />
                </button>
              ) : <div style={{ width: '16px' }}></div>}
            </div>
          ))}

          {financialLog.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>No transactional entries logged.</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {/* Kinetic Ambient Layout Thread */}
      <div className="ambient-axis">
        <div className="axis-pulse"></div>
      </div>

      {/* HUD Navigation Vector Layout */}
      <div className="hud-navigation">
        {structuralSections.map((sec, i) => (
          <div 
            key={sec.id} 
            className="hud-dot-container" 
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onClick={() => executeEngineNavigation(i)}
          >
            <div className={`hud-label`}>{sec.label}</div>
            <div className={`hud-dot ${activeSectionIdx === i ? 'active' : ''}`}></div>
          </div>
        ))}
      </div>

      {/* Main Kinetic Scrolling Engine Wrapper */}
      <div 
        className="kinetic-scroll-engine" 
        ref={scrollEngineRef} 
        onScroll={handleEngineScroll}
      >
        <section className={`scrolling-section ${activeSectionIdx === 0 ? 'view-active' : ''}`}>
          {renderDashboardBlock()}
        </section>

        <section className={`scrolling-section ${activeSectionIdx === 1 ? 'view-active' : ''}`}>
          {renderCrewBlock()}
        </section>

        <section className={`scrolling-section ${activeSectionIdx === 2 ? 'view-active' : ''}`}>
          {renderFundsBlock()}
        </section>
      </div>

      {/* Global Interface Authorization Node */}
      <div className={`lockout-badge ${isLeadershipMode ? 'active' : ''}`} onClick={challengeAdminAuthorization}>
        {isLeadershipMode ? <Shield size={14} /> : <ShieldAlert size={14} />}
        <span className="mono">{isLeadershipMode ? "LEADERSHIP VERIFIED" : "LOCK CONFIG"}</span>
      </div>

      {/* Modals Data Entry Windows */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-window">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-syne)', textTransform: 'uppercase' }}>
                {modalMode === 'crew' ? 'New Personnel Entry' : 'Log Fiscal Transaction'}
              </h3>
              <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setModalMode(null)} />
            </div>

            <form onSubmit={commitRecordSubmission}>
              {modalMode === 'crew' ? (
                <>
                  <input required placeholder="Full Name" className="input-element" value={formPayload.name || ''} onChange={e => setFormPayload({...formPayload, name: e.target.value})} />
                  <input placeholder="Assignment Designation (e.g. Delegate)" className="input-element" value={formPayload.role || ''} onChange={e => setFormPayload({...formPayload, role: e.target.value})} />
                  <input type="email" placeholder="Institutional Email" className="input-element" value={formPayload.email || ''} onChange={e => setFormPayload({...formPayload, email: e.target.value})} />
                  <input type="tel" placeholder="Contact Stream Number" className="input-element" value={formPayload.phone || ''} onChange={e => setFormPayload({...formPayload, phone: e.target.value})} />
                  <input placeholder="Software & Domain Skills (Comma separated)" className="input-element" value={formPayload.skills || ''} onChange={e => setFormPayload({...formPayload, skills: e.target.value})} />
                  
                  <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>ACADEMIC TENURE YEAR</label>
                  <select className="input-element" value={formPayload.year || '1'} onChange={e => setFormPayload({...formPayload, year: e.target.value})}>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                </>
              ) : (
                <>
                  <input required placeholder="Transaction Context / Description" className="input-element" value={formPayload.description || ''} onChange={e => setFormPayload({...formPayload, description: e.target.value})} />
                  <input required type="number" placeholder="Valuation Amount (INR)" className="input-element" value={formPayload.amount || ''} onChange={e => setFormPayload({...formPayload, amount: e.target.value})} />
                  <input type="date" className="input-element" value={formPayload.date || ''} onChange={e => setFormPayload({...formPayload, date: e.target.value})} />
                  
                  <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>TRANSACTION SYSTEM PATH</label>
                  <select className="input-element" value={formPayload.type || 'expense'} onChange={e => setFormPayload({...formPayload, type: e.target.value})}>
                    <option value="expense">Debit Allocation (Expense)</option>
                    <option value="income">Credit Allocation (Income)</option>
                  </select>
                </>
              )}
              
              <button type="submit" className="interactive-action-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                Commit Packet to Ledger
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}