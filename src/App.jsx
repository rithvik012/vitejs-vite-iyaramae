import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import {
  Shield, ShieldAlert, Plus, Trash2, Users, TrendingUp,
  FolderLock, Image as ImageIcon, Radio, Settings, X,
  ArrowUpRight, LayoutDashboard, Component, Wallet,
  Archive, FileImage, Rss, ChevronRight, Menu
} from 'lucide-react';
import './index.css';

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
// 2. ANIMATED COUNTER HOOK
// ==========================================
function useAnimatedCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    const start = prevTarget.current;
    const end = Number(target) || 0;
    if (start === end) { setCount(end); return; }

    const startTime = performance.now();
    let raf;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    prevTarget.current = end;
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return count;
}

// ==========================================
// 3. STAGGERED CARD WRAPPER
// ==========================================
function StaggeredCard({ children, index = 0, className = '', style = {} }) {
  return (
    <div
      className={`card card-enter ${className}`}
      style={{ animationDelay: `${index * 60}ms`, ...style }}
    >
      {children}
    </div>
  );
}

// ==========================================
// 4. PAGE SECTIONS CONFIG
// ==========================================
const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'core' },
  { id: 'crew',      label: 'Personnel', icon: Users,           group: 'core' },
  { id: 'funds',     label: 'Treasury',  icon: Wallet,          group: 'core' },
  { id: 'vault',     label: 'Vault',     icon: Archive,         group: 'data' },
  { id: 'gallery',   label: 'Portfolio',  icon: FileImage,       group: 'data' },
  { id: 'news',      label: 'Broadcasts', icon: Rss,             group: 'data' },
  { id: 'hq',        label: 'Settings',  icon: Settings,        group: 'system' },
];

// ==========================================
// 5. MAIN APPLICATION
// ==========================================
export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
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

  // Page transition key
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 2800);

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

  const navigateTo = useCallback((sectionId) => {
    if (sectionId !== activeSection) {
      setActiveSection(sectionId);
      setPageKey(k => k + 1);
    }
  }, [activeSection]);

  const challengeAdminAuthorization = () => {
    if (isLeadershipMode) setIsLeadershipMode(false);
    else {
      const entryToken = prompt("Enter Administrative Credential:");
      if (entryToken === ADMIN_SECURE_KEY) setIsLeadershipMode(true);
      else if (entryToken) alert("Authentication Failed.");
    }
  };

  // ── DATABASE OPERATIONS ──
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

  const openModal = (mode, data = {}) => {
    setFormPayload(data);
    setModalMode(mode);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  // ── SECTION META ──
  const currentSection = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
  const sectionMeta = {
    dashboard: { subtitle: 'Overview',        title: 'Command Center' },
    crew:      { subtitle: 'Database',         title: 'Unit Personnel' },
    funds:     { subtitle: 'Financial',        title: 'Treasury' },
    vault:     { subtitle: 'Storage',          title: 'Knowledge Vault' },
    gallery:   { subtitle: 'Showcase',         title: 'Portfolio' },
    news:      { subtitle: 'Communications',   title: 'Broadcasts' },
    hq:        { subtitle: 'Administration',   title: 'Unit HQ' },
  };
  const meta = sectionMeta[activeSection];

  // ══════════════════════════════════════════
  //  RENDER: DASHBOARD
  // ══════════════════════════════════════════
  const totalIncome = financialLog.filter(f => f.type === 'income').reduce((a, b) => a + Number(b.amount), 0);
  const totalExpense = financialLog.filter(f => f.type === 'expense').reduce((a, b) => a + Number(b.amount), 0);
  const netCapital = totalIncome - totalExpense;

  const animPersonnel = useAnimatedCounter(crewData.length);
  const animCapital = useAnimatedCounter(netCapital);
  const animVault = useAnimatedCounter(vaultData.length);

  const renderDashboard = () => (
    <div className="page-wrapper" key={pageKey}>
      <div className="section-header">
        <div className="section-header__title-group">
          <span className="text-label">{meta.subtitle}</span>
          <h1 className="text-display">{meta.title}</h1>
        </div>
      </div>

      <div className="grid-stats">
        <StaggeredCard index={0}>
          <span className="text-label mb-sm" style={{ display: 'block' }}>Active Personnel</span>
          <div className="metric-value">{animPersonnel}</div>
        </StaggeredCard>
        <StaggeredCard index={1}>
          <span className="text-label mb-sm" style={{ display: 'block' }}>Net Capital</span>
          <div className="metric-value">₹{animCapital.toLocaleString()}</div>
        </StaggeredCard>
        <StaggeredCard index={2}>
          <span className="text-label mb-sm" style={{ display: 'block' }}>Vault Assets</span>
          <div className="metric-value">{animVault}</div>
        </StaggeredCard>
      </div>

      <StaggeredCard index={3} className="mt-lg" style={{ animationDelay: '180ms' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span className="text-label">Active Campaigns</span>
          {isLeadershipMode && (
            <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: '0.75rem' }} onClick={() => openModal('campaigns')}>
              <Plus size={14} /> Sync
            </button>
          )}
        </div>

        {campaignData.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon"><Archive size={28} /></div>
            No campaigns actively tracked.
          </div>
        )}

        {campaignData.map(c => (
          <div key={c.id} className="campaign-item">
            <div className="campaign-item__info">
              <div>
                <span className="campaign-item__title">{c.title}</span>
                <span className="campaign-item__year">({c.year})</span>
              </div>
              <div className="campaign-item__prize">Prize Pool: {c.prize}</div>
            </div>
            <div className="campaign-item__actions">
              <span className={`pill ${c.abstractsClosed === 'true' ? 'pill--closed' : 'pill--active'}`}>
                {c.abstractsClosed === 'true' ? '' : <span className="pulse-dot"></span>}
                {c.abstractsClosed === 'true' ? 'Closed' : 'Active'}
              </span>
              {isLeadershipMode && (
                <button className="btn-icon btn-icon--danger" onClick={() => removeDocumentRecord('campaigns', c.id)}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </StaggeredCard>
    </div>
  );

  // ══════════════════════════════════════════
  //  RENDER: CREW / PERSONNEL
  // ══════════════════════════════════════════
  const renderCrew = () => {
    const allocation = crewData.reduce((acc, u) => {
      const y = u.year || "Unassigned";
      if (!acc[y]) acc[y] = [];
      acc[y].push(u);
      return acc;
    }, {});
    const sortedYears = Object.keys(allocation).sort((a, b) =>
      (a === "Alumni" || a === "Unassigned" ? 1 : b === "Alumni" || b === "Unassigned" ? -1 : Number(a) - Number(b))
    );

    let globalIndex = 0;

    return (
      <div className="page-wrapper" key={pageKey}>
        <div className="section-header">
          <div className="section-header__title-group">
            <span className="text-label">{meta.subtitle}</span>
            <h1 className="text-display">{meta.title}</h1>
          </div>
          <div className="section-header__actions">
            {isLeadershipMode && (
              <button className="btn btn-ghost" onClick={executeBatchPromotionSequence}>
                <TrendingUp size={15} /> Advance Tiers
              </button>
            )}
            <button className="btn btn-primary" onClick={() => { setFormPayload({ year: '1' }); setModalMode('crew'); }}>
              <Plus size={15} /> Add Member
            </button>
          </div>
        </div>

        {sortedYears.map(year => (
          <div key={year} className="mt-lg">
            <span className="text-label" style={{ display: 'block', marginBottom: '16px', color: 'var(--text-primary)' }}>
              {year === 'Alumni' || year === 'Unassigned' ? year : `Year ${year}`}
            </span>
            <div className="grid-2">
              {allocation[year].map(m => {
                const idx = globalIndex++;
                return (
                  <StaggeredCard key={m.id} index={idx} className="crew-card">
                    <div className="crew-card__header">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="crew-card__avatar">{getInitials(m.name)}</div>
                        <div className="crew-card__info">
                          <div className="crew-card__name">{m.name}</div>
                          <div className="crew-card__email">{m.email}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="pill pill--accent">{m.role}</span>
                        {isLeadershipMode && (
                          <div className="crew-card__actions">
                            <button className="btn-icon" onClick={() => openModal('crew', m)}><Settings size={14} /></button>
                            <button className="btn-icon btn-icon--danger" onClick={() => removeDocumentRecord('crew', m.id)}><Trash2 size={14} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                    {m.skills && (
                      <div className="crew-card__skills">
                        <strong>Proficiencies: </strong>{m.skills}
                      </div>
                    )}
                  </StaggeredCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ══════════════════════════════════════════
  //  RENDER: TREASURY / FINANCES
  // ══════════════════════════════════════════
  const renderFunds = () => (
    <div className="page-wrapper" key={pageKey}>
      <div className="section-header">
        <div className="section-header__title-group">
          <span className="text-label">{meta.subtitle}</span>
          <h1 className="text-display">{meta.title}</h1>
        </div>
        <div className="section-header__actions">
          {isLeadershipMode && (
            <button className="btn btn-primary" onClick={() => { setFormPayload({ type: 'expense' }); setModalMode('finances'); }}>
              <Plus size={15} /> Record Entry
            </button>
          )}
        </div>
      </div>

      <StaggeredCard index={0}>
        {financialLog.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon"><Wallet size={28} /></div>
            No financial records found.
          </div>
        )}
        {financialLog.map(f => (
          <div key={f.id} className="list-row">
            <div className="list-row__left">
              <span className="pill" style={{ alignSelf: 'flex-start', marginBottom: '4px' }}>{f.type}</span>
              <div className="list-row__title">{f.description}</div>
              <div className="list-row__meta">{f.date || 'Unspecified Date'}</div>
            </div>
            <div className="list-row__right">
              <div className={`list-row__amount ${f.type === 'income' ? 'list-row__amount--income' : 'list-row__amount--expense'}`}>
                {f.type === 'income' ? '+' : '-'}₹{Number(f.amount).toLocaleString()}
              </div>
              {isLeadershipMode && (
                <button className="btn-icon btn-icon--danger" onClick={() => removeDocumentRecord('finances', f.id)}>
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </StaggeredCard>
    </div>
  );

  // ══════════════════════════════════════════
  //  RENDER: VAULT
  // ══════════════════════════════════════════
  const renderVault = () => (
    <div className="page-wrapper" key={pageKey}>
      <div className="section-header">
        <div className="section-header__title-group">
          <span className="text-label">{meta.subtitle}</span>
          <h1 className="text-display">{meta.title}</h1>
        </div>
        <div className="section-header__actions">
          {isLeadershipMode && (
            <button className="btn btn-primary" onClick={() => { setFormPayload({ type: 'Design' }); setModalMode('vault'); }}>
              <Plus size={15} /> Upload Asset
            </button>
          )}
        </div>
      </div>

      <div className="grid-3">
        {vaultData.map((v, i) => (
          <StaggeredCard key={v.id} index={i} className="flex-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span className="pill">{v.type} · {v.year}</span>
              {isLeadershipMode && (
                <button className="btn-icon btn-icon--danger" onClick={() => removeDocumentRecord('vault', v.id)}>
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <div className="text-subheading" style={{ marginBottom: '4px' }}>{v.title}</div>
            <div className="text-caption" style={{ marginBottom: '24px' }}>{v.size}</div>
            <div className="vault-card__footer">
              <a href={v.link || '#'} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ width: '100%' }}>
                Access File <ArrowUpRight size={15} />
              </a>
            </div>
          </StaggeredCard>
        ))}
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  //  RENDER: GALLERY / PORTFOLIO
  // ══════════════════════════════════════════
  const renderGallery = () => (
    <div className="page-wrapper" key={pageKey}>
      <div className="section-header">
        <div className="section-header__title-group">
          <span className="text-label">{meta.subtitle}</span>
          <h1 className="text-display">{meta.title}</h1>
        </div>
        <div className="section-header__actions">
          {isLeadershipMode && (
            <button className="btn btn-primary" onClick={() => { setFormPayload({ fileType: 'Image' }); setModalMode('gallery'); }}>
              <ImageIcon size={15} /> Add Project
            </button>
          )}
        </div>
      </div>

      <div className="grid-2">
        {galleryData.map((g, i) => (
          <StaggeredCard key={g.id} index={i} className="gallery-card">
            <div
              className="gallery-card__image"
              style={g.fileType === 'Image' ? { backgroundImage: `url(${g.link})` } : {}}
            >
              {g.fileType !== 'Image' && <Component size={32} color="var(--text-tertiary)" />}
            </div>
            <div className="gallery-card__body">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="pill">{g.category}</span>
                {isLeadershipMode && (
                  <button className="btn-icon btn-icon--danger" onClick={() => removeDocumentRecord('gallery', g.id)}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="gallery-card__title">{g.title}</div>
              <div className="gallery-card__desc">{g.description}</div>
              <div className="gallery-card__footer">
                <span className="text-caption">By: {g.authorName}</span>
                {g.link && (
                  <a href={g.link} target="_blank" rel="noreferrer" style={{
                    color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.82rem',
                    fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                    View <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          </StaggeredCard>
        ))}
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  //  RENDER: NEWS / BROADCASTS
  // ══════════════════════════════════════════
  const renderNews = () => (
    <div className="page-wrapper" key={pageKey}>
      <div className="section-header">
        <div className="section-header__title-group">
          <span className="text-label">{meta.subtitle}</span>
          <h1 className="text-display">{meta.title}</h1>
        </div>
        <div className="section-header__actions">
          {isLeadershipMode && (
            <button className="btn btn-primary" onClick={() => { setFormPayload({}); setModalMode('news'); }}>
              <Radio size={15} /> New Broadcast
            </button>
          )}
        </div>
      </div>

      <div className="flex-col gap-md">
        {newsData.sort((a, b) => b.timestamp - a.timestamp).map((n, i) => (
          <StaggeredCard key={n.id} index={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="pill">{n.tag}</span>
              {isLeadershipMode && (
                <button className="btn-icon btn-icon--danger" onClick={() => removeDocumentRecord('news', n.id)}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>
            <div className="broadcast-card__title">{n.title}</div>
            <div className="broadcast-card__content">{n.content}</div>
            <div className="broadcast-card__time">
              Published: {new Date(n.timestamp).toLocaleString()}
            </div>
          </StaggeredCard>
        ))}
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  //  RENDER: HQ / SETTINGS
  // ══════════════════════════════════════════
  const renderHQ = () => (
    <div className="page-wrapper" key={pageKey}>
      <div className="section-header">
        <div className="section-header__title-group">
          <span className="text-label">{meta.subtitle}</span>
          <h1 className="text-display">{meta.title}</h1>
        </div>
        <div className="section-header__actions">
          {isLeadershipMode && (
            <button className="btn btn-ghost" onClick={() => { setFormPayload(leadership); setModalMode('hq'); }}>
              <Settings size={15} /> Configure
            </button>
          )}
        </div>
      </div>

      <StaggeredCard index={0}>
        <span className="text-label" style={{ display: 'block' }}>Official Institution Identifier</span>
        <div className="hq-title">Unit {leadership.unitCode}</div>
        <span className="text-label" style={{ display: 'block' }}>Authorized Comm Channel</span>
        <div className="text-body">{leadership.officialEmail}</div>
      </StaggeredCard>

      <div className="grid-2 mt-lg">
        <StaggeredCard index={1}>
          <span className="pill pill--accent" style={{ marginBottom: '20px' }}>Unit Designee (UD)</span>
          <div className="hq-leader-name">{leadership.udName || 'Pending Assignment'}</div>
          <div className="text-body mt-sm">{leadership.udPhone || 'No contact provided'}</div>
          <div className="text-body">{leadership.udEmail || 'No email provided'}</div>
        </StaggeredCard>
        <StaggeredCard index={2}>
          <span className="pill pill--accent" style={{ marginBottom: '20px' }}>Unit Secretary (USEC)</span>
          <div className="hq-leader-name">{leadership.useName || 'Pending Assignment'}</div>
          <div className="text-body mt-sm">{leadership.usePhone || 'No contact provided'}</div>
          <div className="text-body">{leadership.useEmail || 'No email provided'}</div>
        </StaggeredCard>
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  //  RENDER: ACTIVE SECTION
  // ══════════════════════════════════════════
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'crew':      return renderCrew();
      case 'funds':     return renderFunds();
      case 'vault':     return renderVault();
      case 'gallery':   return renderGallery();
      case 'news':      return renderNews();
      case 'hq':        return renderHQ();
      default:          return renderDashboard();
    }
  };

  // ══════════════════════════════════════════
  //  RENDER: MODAL FORMS
  // ══════════════════════════════════════════
  const renderModal = () => {
    if (!modalMode) return null;

    const modalTitles = {
      crew: 'Crew Member',
      finances: 'Financial Entry',
      vault: 'Vault Asset',
      gallery: 'Gallery Project',
      news: 'Broadcast',
      campaigns: 'Campaign',
      hq: 'HQ Configuration',
    };

    return (
      <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModalMode(null); }}>
        <div className="modal-window">
          <div className="modal__header">
            <h2 className="modal__title">
              {formPayload.id ? 'Edit' : 'New'} {modalTitles[modalMode] || 'Record'}
            </h2>
            <button className="btn-icon" onClick={() => setModalMode(null)}><X size={18} /></button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            ['news', 'campaigns'].includes(modalMode) ? handleSaveAndEmail(modalMode) : handleSaveToCloud(modalMode);
          }}>

            {modalMode === 'crew' && (
              <>
                <div className="form-group">
                  <input required placeholder="Full Name" className="form-input" value={formPayload.name || ''} onChange={e => setFormPayload({ ...formPayload, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Role (e.g., Delegate)" className="form-input" value={formPayload.role || ''} onChange={e => setFormPayload({ ...formPayload, role: e.target.value })} />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" className="form-input" value={formPayload.email || ''} onChange={e => setFormPayload({ ...formPayload, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" className="form-input" value={formPayload.phone || ''} onChange={e => setFormPayload({ ...formPayload, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Proficiencies (Comma separated)" className="form-input" value={formPayload.skills || ''} onChange={e => setFormPayload({ ...formPayload, skills: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Academic Year</label>
                  <select className="form-select" value={formPayload.year || '1'} onChange={e => setFormPayload({ ...formPayload, year: e.target.value })}>
                    <option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option><option value="Alumni">Alumni</option>
                  </select>
                </div>
              </>
            )}

            {modalMode === 'finances' && (
              <>
                <div className="form-group">
                  <input required placeholder="Transaction Description" className="form-input" value={formPayload.description || ''} onChange={e => setFormPayload({ ...formPayload, description: e.target.value })} />
                </div>
                <div className="form-group">
                  <input required type="number" placeholder="Amount (INR)" className="form-input" value={formPayload.amount || ''} onChange={e => setFormPayload({ ...formPayload, amount: e.target.value })} />
                </div>
                <div className="form-group">
                  <select className="form-select" value={formPayload.type || 'expense'} onChange={e => setFormPayload({ ...formPayload, type: e.target.value })}>
                    <option value="expense">Expense Deduction</option><option value="income">Income Addition</option>
                  </select>
                </div>
              </>
            )}

            {modalMode === 'vault' && (
              <>
                <div className="form-group">
                  <input required placeholder="Document Title" className="form-input" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="File Size (e.g. 45MB)" className="form-input" value={formPayload.size || ''} onChange={e => setFormPayload({ ...formPayload, size: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Storage URL Link" className="form-input" value={formPayload.link || ''} onChange={e => setFormPayload({ ...formPayload, link: e.target.value })} />
                </div>
                <div className="form-group">
                  <select className="form-select" value={formPayload.type || 'Design'} onChange={e => setFormPayload({ ...formPayload, type: e.target.value })}>
                    <option value="Design">Design Asset</option><option value="Finance">Financial Document</option><option value="Admin">Administrative</option>
                  </select>
                </div>
              </>
            )}

            {modalMode === 'gallery' && (
              <>
                <div className="form-group">
                  <input required placeholder="Project Title" className="form-input" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Author / Creator" className="form-input" value={formPayload.authorName || ''} onChange={e => setFormPayload({ ...formPayload, authorName: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Category (e.g. Documentation)" className="form-input" value={formPayload.category || ''} onChange={e => setFormPayload({ ...formPayload, category: e.target.value })} />
                </div>
                <div className="form-group">
                  <select className="form-select" value={formPayload.fileType || 'Drive Link'} onChange={e => setFormPayload({ ...formPayload, fileType: e.target.value })}>
                    <option value="Drive Link">Drive Folder</option><option value="Image">Direct Image URL</option><option value="PDF">PDF Link</option>
                  </select>
                </div>
                <div className="form-group">
                  <input placeholder="Asset URL" className="form-input" value={formPayload.link || ''} onChange={e => setFormPayload({ ...formPayload, link: e.target.value })} />
                </div>
                <div className="form-group">
                  <textarea placeholder="Project Description" className="form-input form-textarea" rows="3" value={formPayload.description || ''} onChange={e => setFormPayload({ ...formPayload, description: e.target.value })}></textarea>
                </div>
              </>
            )}

            {modalMode === 'news' && (
              <>
                <div className="form-group">
                  <input required placeholder="Category Tag" className="form-input" value={formPayload.tag || ''} onChange={e => setFormPayload({ ...formPayload, tag: e.target.value })} />
                </div>
                <div className="form-group">
                  <input required placeholder="Subject / Headline" className="form-input" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <textarea rows="5" placeholder="Broadcast Message Body..." className="form-input form-textarea" value={formPayload.content || ''} onChange={e => setFormPayload({ ...formPayload, content: e.target.value })}></textarea>
                </div>
              </>
            )}

            {modalMode === 'campaigns' && (
              <>
                <div className="form-group">
                  <input required placeholder="Campaign / Trophy Name" className="form-input" value={formPayload.title || ''} onChange={e => setFormPayload({ ...formPayload, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Year Context" className="form-input" value={formPayload.year || ''} onChange={e => setFormPayload({ ...formPayload, year: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Prize Pool" className="form-input" value={formPayload.prize || ''} onChange={e => setFormPayload({ ...formPayload, prize: e.target.value })} />
                </div>
                <div className="form-group">
                  <select className="form-select" value={formPayload.abstractsClosed || 'false'} onChange={e => setFormPayload({ ...formPayload, abstractsClosed: e.target.value })}>
                    <option value="false">Status: Active</option><option value="true">Status: Closed</option>
                  </select>
                </div>
              </>
            )}

            {modalMode === 'hq' && (
              <>
                <label className="form-label">Unit Profile</label>
                <div className="form-group">
                  <input placeholder="Unit Code (Z649)" className="form-input" value={formPayload.unitCode || ''} onChange={e => setFormPayload({ ...formPayload, unitCode: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="Official Email" className="form-input" value={formPayload.officialEmail || ''} onChange={e => setFormPayload({ ...formPayload, officialEmail: e.target.value })} />
                </div>
                <div className="modal__divider"></div>
                <label className="form-label">Unit Designee</label>
                <div className="form-group">
                  <input placeholder="UD Name" className="form-input" value={formPayload.udName || ''} onChange={e => setFormPayload({ ...formPayload, udName: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="UD Phone" className="form-input" value={formPayload.udPhone || ''} onChange={e => setFormPayload({ ...formPayload, udPhone: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="UD Email" className="form-input" value={formPayload.udEmail || ''} onChange={e => setFormPayload({ ...formPayload, udEmail: e.target.value })} />
                </div>
                <div className="modal__divider"></div>
                <label className="form-label">Unit Secretary</label>
                <div className="form-group">
                  <input placeholder="USEC Name" className="form-input" value={formPayload.useName || ''} onChange={e => setFormPayload({ ...formPayload, useName: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="USEC Phone" className="form-input" value={formPayload.usePhone || ''} onChange={e => setFormPayload({ ...formPayload, usePhone: e.target.value })} />
                </div>
                <div className="form-group">
                  <input placeholder="USEC Email" className="form-input" value={formPayload.useEmail || ''} onChange={e => setFormPayload({ ...formPayload, useEmail: e.target.value })} />
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', marginTop: '8px' }}
              disabled={isSendingEmail}
            >
              {isSendingEmail ? 'Processing...' : 'Save Configuration'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════
  //  MAIN RENDER
  // ══════════════════════════════════════════
  return (
    <>
      {/* AMBIENT BACKGROUND */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb--primary"></div>
        <div className="ambient-orb ambient-orb--secondary"></div>
        <div className="ambient-orb ambient-orb--tertiary"></div>
      </div>
      <div className="noise-texture"></div>

      {/* CINEMATIC SPLASH */}
      <div className={`splash ${!isBooting ? 'hidden' : ''}`}>
        <div className="splash__logo">UNIT Z649</div>
        <div className="splash__bar">
          <div className="splash__bar-fill"></div>
        </div>
      </div>

      {/* APP SHELL */}
      <div className="app-shell">

        {/* ── SIDEBAR (Desktop) ── */}
        <aside className="sidebar">
          <div className="sidebar__header">
            <div className="sidebar__brand-icon">
              <Shield size={18} />
            </div>
            <div className="sidebar__brand">
              <span className="sidebar__brand-name">RSA</span>
              <span className="sidebar__brand-unit">Unit {leadership.unitCode}</span>
            </div>
          </div>

          <nav className="sidebar__nav">
            <div className="sidebar__label">Command</div>
            {SECTIONS.filter(s => s.group === 'core').map(s => (
              <button
                key={s.id}
                className={`nav-item ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => navigateTo(s.id)}
              >
                <span className="nav-item__icon"><s.icon size={18} strokeWidth={1.5} /></span>
                <span className="nav-item__label">{s.label}</span>
              </button>
            ))}

            <div className="sidebar__label">Data</div>
            {SECTIONS.filter(s => s.group === 'data').map(s => (
              <button
                key={s.id}
                className={`nav-item ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => navigateTo(s.id)}
              >
                <span className="nav-item__icon"><s.icon size={18} strokeWidth={1.5} /></span>
                <span className="nav-item__label">{s.label}</span>
              </button>
            ))}

            <div className="sidebar__label">System</div>
            {SECTIONS.filter(s => s.group === 'system').map(s => (
              <button
                key={s.id}
                className={`nav-item ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => navigateTo(s.id)}
              >
                <span className="nav-item__icon"><s.icon size={18} strokeWidth={1.5} /></span>
                <span className="nav-item__label">{s.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar__footer">
            <button
              className={`admin-toggle ${isLeadershipMode ? 'admin-active' : ''}`}
              onClick={challengeAdminAuthorization}
            >
              <span className="admin-dot"></span>
              {isLeadershipMode ? 'Admin Active' : 'Admin Access'}
            </button>
          </div>
        </aside>

        {/* ── MAIN PANEL ── */}
        <main className="main-panel">
          <header className="main-panel__topbar">
            <div className="topbar__title">
              <span className="topbar__label">{meta.subtitle}</span>
              <span className="topbar__heading">{meta.title}</span>
            </div>
            <div className="topbar__actions">
              <button
                className={`btn-icon ${isLeadershipMode ? '' : ''}`}
                onClick={challengeAdminAuthorization}
                title={isLeadershipMode ? 'Admin Mode Active' : 'Enable Admin Mode'}
                style={isLeadershipMode ? { color: 'var(--accent-primary)' } : {}}
              >
                {isLeadershipMode ? <Shield size={18} /> : <ShieldAlert size={18} />}
              </button>
            </div>
          </header>

          <div className="main-panel__content">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      <nav className="mobile-tabbar">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`tab-item ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => navigateTo(s.id)}
          >
            <span className="tab-item__icon"><s.icon size={18} strokeWidth={1.5} /></span>
            <span className="tab-item__label">{s.label}</span>
          </button>
        ))}
      </nav>

      {/* MODALS */}
      {renderModal()}
    </>
  );
}