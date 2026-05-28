import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// ==========================================
// 1. LIGHT-MODE AESTHETICS & LAYOUT
// ==========================================
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

:root {
  --bg-main: #F4F5F7;
  --bg-card: #FFFFFF;
  --text-main: #111827;
  --text-muted: #6B7280;
  --border-light: #E5E7EB;
  --border-focus: #111827;
  --accent-primary: #111827;
  --accent-secondary: #F9FAFB;
  --success: #059669;
}

body, html {
  margin: 0; padding: 0; height: 100vh; overflow: hidden;
  background-color: var(--bg-main); color: var(--text-main);
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-image: linear-gradient(var(--border-light) 1px, transparent 1px), linear-gradient(90deg, var(--border-light) 1px, transparent 1px);
  background-size: 40px 40px;
}

* { box-sizing: border-box; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 10px; }

.syne { font-family: 'Syne', sans-serif; }
.mono { font-family: 'Space Mono', monospace; }

/* Top Navigation */
.top-nav {
  position: fixed; top: 0; left: 0; right: 0; height: 70px;
  background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-light); z-index: 50;
  display: flex; align-items: center; padding: 0 40px; justify-content: space-between;
}

.rsa-menu-container { position: relative; display: inline-block; }
.rsa-trigger {
  display: flex; align-items: center; gap: 12px; cursor: pointer;
  padding: 8px 16px; border-radius: 8px; transition: all 0.2s;
}
.rsa-trigger:hover { background: var(--accent-secondary); }
.rsa-dropdown {
  position: absolute; top: 60px; left: 0; width: 240px;
  background: var(--bg-card); border: 1px solid var(--border-light);
  border-radius: 16px; padding: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex; flex-direction: column; gap: 4px;
  transform-origin: top left; animation: menuPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.menu-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 16px;
  border-radius: 10px; cursor: pointer; font-weight: 600; color: var(--text-muted);
  transition: all 0.2s; border: 1px solid transparent;
}
.menu-item:hover { background: var(--accent-secondary); color: var(--text-main); }
.menu-item.active { background: var(--accent-primary); color: #FFF; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

/* Main Area & Panels */
.app-layout { display: flex; height: 100vh; width: 100vw; padding-top: 70px; position: relative; }
.main-content { flex: 1; overflow-y: auto; padding: 40px 60px; transition: padding-right 0.4s ease; }

.nasa-panel { 
  position: absolute; right: 0; top: 70px; bottom: 0; width: 400px;
  border-left: 1px solid var(--border-light); background: rgba(250, 250, 250, 0.9); 
  backdrop-filter: blur(40px); display: flex; flex-direction: column; z-index: 40;
  box-shadow: -10px 0 40px rgba(0,0,0,0.05); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.nasa-panel.closed { transform: translateX(100%); }
.nasa-panel.open { transform: translateX(0); }

.panel-toggle {
  display: flex; align-items: center; gap: 8px; background: #FFF; border: 1px solid var(--border-light);
  color: var(--text-main); padding: 8px 16px; border-radius: 8px; cursor: pointer;
  font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; transition: all 0.2s;
}
.panel-toggle:hover { border-color: var(--text-main); }

/* Architectural Cards */
.arch-card {
  background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; 
  padding: 24px; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
.arch-card:hover { border-color: var(--border-focus); transform: translateY(-2px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }

/* Gallery Showcase Styles */
.gallery-card {
  border-radius: 16px; overflow: hidden; border: 1px solid var(--border-light);
  background: var(--bg-card); transition: all 0.3s ease; display: flex; flex-direction: column;
}
.gallery-card:hover { border-color: var(--border-focus); transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.08); }
.gallery-img-placeholder {
  height: 180px; width: 100%; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); color: var(--text-muted);
  background-position: center; background-size: cover; border-bottom: 1px solid var(--border-light);
}

/* Universal Elements */
.badge { display: inline-flex; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-family: 'Space Mono', monospace; }
.badge-dark { background: var(--text-main); color: #FFF; }
.badge-light { background: var(--accent-secondary); color: var(--text-main); border: 1px solid var(--border-light); }

.action-btn {
  background: var(--text-main); color: #FFF; border: none; padding: 12px 24px; border-radius: 8px;
  font-family: 'Syne', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 8px; text-decoration: none; justify-content: center;
}
.action-btn:hover { background: #000; box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
.edit-btn { background: var(--accent-secondary); color: var(--text-main); border: 1px solid var(--border-light); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; text-decoration: none; }
.edit-btn:hover { background: var(--border-light); }

/* Modals */
.modal-bg { position: fixed; inset: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 100; animation: fadeIn 0.2s ease; }
.modal-box { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; padding: 32px; width: 100%; max-width: 500px; box-shadow: 0 24px 48px rgba(0,0,0,0.08); max-height: 90vh; overflow-y: auto; }
.input-field { width: 100%; background: var(--bg-main); border: 1px solid var(--border-light); padding: 12px 16px; color: var(--text-main); border-radius: 8px; margin-bottom: 16px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; outline: none; transition: all 0.2s; }
.input-field:focus { border-color: var(--text-main); background: #FFF; }

.progress-track { width: 100%; height: 8px; background: var(--border-light); border-radius: 4px; overflow: hidden; margin-top: 8px; }
.progress-fill { height: 100%; background: var(--text-main); border-radius: 4px; transition: width 0.5s ease; }

/* Enhanced Splash Screen */
.splash-wrapper {
  position: fixed; inset: 0; background: var(--bg-main); z-index: 99999;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s;
}
.splash-wrapper.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
.splash-loader-track { width: 240px; height: 2px; background: var(--border-light); margin-top: 24px; position: relative; overflow: hidden; }
.splash-loader-bar { position: absolute; left: 0; top: 0; height: 100%; background: var(--text-main); width: 0%; animation: fillLoader 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

@keyframes fillLoader { 0% { width: 0%; } 40% { width: 40%; } 70% { width: 75%; } 100% { width: 100%; } }
@keyframes menuPop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.fade-in { animation: fadeIn 0.4s ease forwards; }
`;

// ==========================================
// 2. VECTOR ICONS
// ==========================================
const Icons = {
  Core: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="9" rx="1"></rect>
      <rect x="14" y="3" width="7" height="5" rx="1"></rect>
      <rect x="14" y="12" width="7" height="9" rx="1"></rect>
      <rect x="3" y="16" width="7" height="5" rx="1"></rect>
    </svg>
  ),
  Crew: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Funds: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
      <line x1="2" y1="10" x2="22" y2="10"></line>
    </svg>
  ),
  Archive: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Gallery: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  ),
  HQ: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  Plus: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Close: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  ChevronDown: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
};

// ==========================================
// 3. MASTER APP COMPONENT
// ==========================================
export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [tab, setTab] = useState('core');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // --- DATABASES ---
  const [leadership, setLeadership] = useState({
    unitCode: 'Z649',
    officialEmail: 'z649@nasaindia.co',
    ud: {
      name: 'Rithvik Manivel',
      phone: '+91 9876543210',
      email: 'rithvik.april5@gmail.com',
    },
    usec: { name: 'Pending Appointment', phone: 'N/A', email: 'N/A' },
  });

  const [delegates, setDelegates] = useState([
    {
      id: 'D1',
      name: 'Rithvik Manivel',
      role: 'Unit Designee',
      skills: 'AutoCAD, Revit, Rhino',
      email: 'rithvik.april5@gmail.com',
      phone: '+91 9876543210',
      dob: '2007-04-05',
    },
    {
      id: 'D2',
      name: 'Rithick K.',
      role: 'Delegate',
      skills: 'Blender, D5 Render',
      email: 'rithick.k@gmail.com',
      phone: '+91 9999988888',
      dob: '2006-08-12',
    },
  ]);

  const [finances, setFinances] = useState([
    {
      id: 'F1',
      type: 'Collection',
      purpose: 'ZNC 2026 Registration',
      targetAmt: 42000,
      collectedAmt: 12000,
      peopleCount: 15,
      date: '2026-05-10',
    },
    {
      id: 'F2',
      type: 'Expense',
      purpose: 'Plotting A1 Sheets',
      amount: 4500,
      peopleCount: 3,
      date: '2026-05-20',
    },
  ]);

  const [vault, setVault] = useState([
    {
      id: 'V1',
      type: 'NASA Trophy',
      title: 'Louis I. Kahn Trophy',
      status: 'In Progress',
      assigned: ['D1', 'D2'],
    },
    {
      id: 'V2',
      type: 'Custom Event',
      title: 'Nexus College Fest',
      status: 'Planning',
      assigned: ['D1'],
    },
  ]);

  const [gallery, setGallery] = useState([
    {
      id: 'G1',
      title: 'Rural Documentation',
      author: 'D1',
      category: 'Academics',
      description: 'Varyankaval village morphology.',
      fileType: 'PDF',
      link: 'https://nasaindia.co',
    },
  ]);

  const [activeCampaigns, setActiveCampaigns] = useState([
    { id: 'c1', title: 'Louis I. Kahn Trophy', year: '2026', status: 'Active' },
  ]);

  // --- MODAL LOGIC ---
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    editingId: null,
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // 2.5 Second Splash Screen Timer
    const timer = setTimeout(() => setIsBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (type, editingItem = null) => {
    setModal({ isOpen: true, type, editingId: editingItem?.id || null });
    setFormData(editingItem || {});
    setIsMenuOpen(false);
  };
  const closeModal = () => {
    setModal({ isOpen: false, type: null, editingId: null });
    setFormData({});
  };

  const handleSave = (state, setState, prefix) => {
    if (modal.editingId) {
      setState(
        state.map((item) =>
          item.id === modal.editingId ? { ...formData, id: item.id } : item
        )
      );
    } else {
      setState([...state, { ...formData, id: `${prefix}${Date.now()}` }]);
    }
    closeModal();
  };

  const handleSaveCampaign = () => {
    setActiveCampaigns([
      ...activeCampaigns,
      {
        id: Date.now(),
        title: formData.title || 'HUDCO Trophy',
        year: '2026-27',
        status: 'Active',
      },
    ]);
    closeModal();
  };

  // ==========================================
  // VIEW RENDERERS
  // ==========================================
  const renderCore = () => (
    <div className="fade-in">
      <div style={{ marginBottom: 40 }}>
        <div
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}
        >
          UNIT {leadership.unitCode}
        </div>
        <h1
          className="syne"
          style={{ fontSize: 36, margin: '8px 0 0 0', fontWeight: 800 }}
        >
          CORE DASHBOARD
        </h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
          marginBottom: 40,
        }}
      >
        <div className="arch-card">
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 16,
            }}
          >
            ACTIVE DELEGATES
          </div>
          <div className="syne" style={{ fontSize: 42, fontWeight: 700 }}>
            {delegates.length}
          </div>
        </div>
        <div className="arch-card">
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 16,
            }}
          >
            TOTAL EXPENSES
          </div>
          <div className="mono" style={{ fontSize: 32, fontWeight: 700 }}>
            ₹
            {finances
              .filter((f) => f.type === 'Expense')
              .reduce((a, b) => a + Number(b.amount || 0), 0)
              .toLocaleString()}
          </div>
        </div>
        <div className="arch-card">
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 16,
            }}
          >
            ACTIVE PROJECTS
          </div>
          <div className="syne" style={{ fontSize: 42, fontWeight: 700 }}>
            {vault.length}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 20,
        }}
      >
        <h2 className="syne" style={{ fontSize: 18, margin: 0 }}>
          CURRENT CAMPAIGNS
        </h2>
        <button
          className="action-btn"
          style={{ padding: '8px 16px', fontSize: 12 }}
          onClick={() => openModal('campaign')}
        >
          + SYNC NASA CAMPAIGN
        </button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {activeCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="arch-card"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                {camp.title}
              </div>
              <div
                className="mono"
                style={{ fontSize: 10, color: 'var(--text-muted)' }}
              >
                NASA INDIA {camp.year}
              </div>
            </div>
            <span className="badge badge-light">{camp.status}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCrew = () => (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 40,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: 2,
            }}
          >
            PERSONNEL DATABASE
          </div>
          <h1
            className="syne"
            style={{ fontSize: 36, margin: '8px 0 0 0', fontWeight: 800 }}
          >
            UNIT CREW
          </h1>
        </div>
        <button className="action-btn" onClick={() => openModal('delegate')}>
          <Icons.Plus /> ADD DELEGATE
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}
      >
        {delegates.map((d) => (
          <div key={d.id} className="arch-card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 16,
              }}
            >
              <div
                className={
                  d.role === 'Unit Designee'
                    ? 'badge badge-dark'
                    : 'badge badge-light'
                }
              >
                {d.role}
              </div>
              <button
                className="edit-btn"
                onClick={() => openModal('delegate', d)}
              >
                Edit
              </button>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
              {d.name}
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                marginBottom: 16,
              }}
            >
              {d.email} • {d.phone}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
              Proficient Skills:
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(d.skills || '').split(',').map(
                (s, i) =>
                  s.trim() && (
                    <span
                      key={i}
                      className="mono"
                      style={{
                        fontSize: 10,
                        padding: '4px 8px',
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 4,
                      }}
                    >
                      {s.trim()}
                    </span>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFunds = () => (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 40,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: 2,
            }}
          >
            FINANCIAL MATRIX
          </div>
          <h1
            className="syne"
            style={{ fontSize: 36, margin: '8px 0 0 0', fontWeight: 800 }}
          >
            FUNDS LEDGER
          </h1>
        </div>
        <button className="action-btn" onClick={() => openModal('finance')}>
          <Icons.Plus /> LOG EXPENDITURE
        </button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {finances.map((f) => (
          <div
            key={f.id}
            className="arch-card"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <span
                  className={
                    f.type === 'Collection'
                      ? 'badge badge-dark'
                      : 'badge badge-light'
                  }
                >
                  {f.type}
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'var(--text-muted)' }}
                >
                  {f.date}
                </span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                {f.purpose}
              </div>
              <div
                className="mono"
                style={{ fontSize: 12, color: 'var(--text-muted)' }}
              >
                Involved Personnel: {f.peopleCount || 'N/A'}
              </div>

              {f.type === 'Collection' && (
                <div style={{ marginTop: 16, maxWidth: '400px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    <span>Progress</span>
                    <span>
                      ₹{Number(f.collectedAmt || 0).toLocaleString()} / ₹
                      {Number(f.targetAmt || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(
                          (f.collectedAmt / f.targetAmt) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                textAlign: 'right',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 16,
              }}
            >
              {f.type === 'Expense' ? (
                <div className="mono" style={{ fontSize: 24, fontWeight: 700 }}>
                  ₹{Number(f.amount || 0).toLocaleString()}
                </div>
              ) : (
                <div
                  className="mono"
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: 'var(--success)',
                  }}
                >
                  ₹{Number(f.targetAmt || 0).toLocaleString()} Goal
                </div>
              )}
              <button
                className="edit-btn"
                onClick={() => openModal('finance', f)}
              >
                Edit Record
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderArchive = () => (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 40,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: 2,
            }}
          >
            OPERATIONS DATABASE
          </div>
          <h1
            className="syne"
            style={{ fontSize: 36, margin: '8px 0 0 0', fontWeight: 800 }}
          >
            UNIT ARCHIVE
          </h1>
        </div>
        <button className="action-btn" onClick={() => openModal('vault')}>
          <Icons.Plus /> ADD PROJECT
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: 24,
        }}
      >
        {vault.map((v) => (
          <div key={v.id} className="arch-card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 16,
              }}
            >
              <div className="badge badge-dark">{v.type}</div>
              <button
                className="edit-btn"
                onClick={() => openModal('vault', v)}
              >
                Edit
              </button>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
              {v.title}
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                marginBottom: 24,
              }}
            >
              Status: {v.status}
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
              Assigned Crew:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(v.assigned || []).map((delegateId) => {
                const del = delegates.find((d) => d.id === delegateId);
                return del ? (
                  <div
                    key={del.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      background: 'var(--bg-main)',
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        background: 'var(--text-main)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {del.name.charAt(0)}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>
                      {del.name}
                    </div>
                  </div>
                ) : null;
              })}
              {(v.assigned || []).length === 0 && (
                <div
                  className="mono"
                  style={{ fontSize: 11, color: 'var(--text-muted)' }}
                >
                  No crew assigned.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 40,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: 2,
            }}
          >
            PORTFOLIO SHOWCASE
          </div>
          <h1
            className="syne"
            style={{ fontSize: 36, margin: '8px 0 0 0', fontWeight: 800 }}
          >
            BEST WORKS GALLERY
          </h1>
        </div>
        <button className="action-btn" onClick={() => openModal('gallery')}>
          <Icons.Plus /> UPLOAD WORK
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {gallery.map((g) => {
          const author = delegates.find((d) => d.id === g.author);
          const isImage = g.fileType === 'Image' && g.link;
          return (
            <div key={g.id} className="gallery-card">
              <div
                className="gallery-img-placeholder"
                style={isImage ? { backgroundImage: `url(${g.link})` } : {}}
              >
                {!isImage && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Icons.Gallery />
                    <span
                      className="mono"
                      style={{ fontSize: 12, fontWeight: 600 }}
                    >
                      {g.fileType} FILE
                    </span>
                  </div>
                )}
              </div>
              <div
                style={{
                  padding: 20,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <div className="badge badge-light">{g.category}</div>
                  <button
                    className="edit-btn"
                    style={{ padding: '4px 8px', fontSize: 10 }}
                    onClick={() => openModal('gallery', g)}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                  {g.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    marginBottom: 16,
                  }}
                >
                  {g.description}
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 16,
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--text-main)',
                      fontWeight: 700,
                    }}
                  >
                    BY: {author ? author.name.toUpperCase() : 'UNKNOWN'}
                  </div>
                  {g.link && (
                    <a
                      href={g.link}
                      target="_blank"
                      rel="noreferrer"
                      className="action-btn"
                      style={{ padding: '6px 12px', fontSize: 10 }}
                    >
                      VIEW ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderHQ = () => (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 40,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: 2,
            }}
          >
            ADMINISTRATION
          </div>
          <h1
            className="syne"
            style={{ fontSize: 36, margin: '8px 0 0 0', fontWeight: 800 }}
          >
            UNIT HQ
          </h1>
        </div>
        <button
          className="action-btn"
          onClick={() => openModal('leadership', leadership)}
        >
          EDIT DETAILS
        </button>
      </div>

      <div className="arch-card" style={{ marginBottom: 24 }}>
        <div
          className="mono"
          style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}
        >
          OFFICIAL INSTITUTION
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          UNIT {leadership.unitCode}
        </div>
        <div
          className="mono"
          style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}
        >
          OFFICIAL NASA MAILBOX
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--success)' }}>
          {leadership.officialEmail}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        <div className="arch-card">
          <div className="badge badge-dark" style={{ marginBottom: 16 }}>
            UNIT DESIGNEE (UD)
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            {leadership.ud.name}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              marginBottom: 4,
            }}
          >
            Phone: {leadership.ud.phone}
          </div>
          <div
            className="mono"
            style={{ fontSize: 12, color: 'var(--text-muted)' }}
          >
            Email: {leadership.ud.email}
          </div>
        </div>
        <div className="arch-card">
          <div className="badge badge-light" style={{ marginBottom: 16 }}>
            UNIT SECRETARY (USEC)
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            {leadership.usec.name}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              marginBottom: 4,
            }}
          >
            Phone: {leadership.usec.phone}
          </div>
          <div
            className="mono"
            style={{ fontSize: 12, color: 'var(--text-muted)' }}
          >
            Email: {leadership.usec.email}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {/* --- SPLASH SCREEN --- */}
      <div className={`splash-wrapper ${!isBooting ? 'hidden' : ''}`}>
        <h1
          className="syne"
          style={{ fontSize: 56, fontWeight: 800, margin: 0, letterSpacing: 4 }}
        >
          Z649
        </h1>
        <div
          className="mono"
          style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            marginTop: 12,
            letterSpacing: 2,
          }}
        >
          INITIALIZING COMMAND CENTER
        </div>
        <div className="splash-loader-track">
          <div className="splash-loader-bar"></div>
        </div>
      </div>

      {/* --- TOP NAVIGATION BAR --- */}
      <div className="top-nav">
        <div className="rsa-menu-container">
          <div
            className="rsa-trigger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <h1
              className="syne"
              style={{ margin: 0, fontSize: 24, fontWeight: 800 }}
            >
              RSA
            </h1>
            <Icons.ChevronDown />
          </div>

          {isMenuOpen && (
            <div className="rsa-dropdown">
              {[
                { id: 'core', name: 'Core', icon: <Icons.Core /> },
                { id: 'crew', name: 'Crew', icon: <Icons.Crew /> },
                { id: 'funds', name: 'Funds', icon: <Icons.Funds /> },
                { id: 'archive', name: 'Archive', icon: <Icons.Archive /> },
                { id: 'gallery', name: 'Gallery', icon: <Icons.Gallery /> },
                { id: 'hq', name: 'HQ', icon: <Icons.HQ /> },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`menu-item ${tab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setTab(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sync Panel Toggle Button */}
        <button
          className="panel-toggle"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          NASA SYNC{' '}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--success)',
            }}
          ></div>
        </button>
      </div>

      <div className="app-layout">
        <div
          className="main-content"
          style={{ paddingRight: isPanelOpen ? 460 : 60 }}
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          {tab === 'core' && renderCore()}
          {tab === 'crew' && renderCrew()}
          {tab === 'funds' && renderFunds()}
          {tab === 'archive' && renderArchive()}
          {tab === 'gallery' && renderGallery()}
          {tab === 'hq' && renderHQ()}
        </div>

        {/* --- PERSISTENT RIGHT PANEL --- */}
        <div className={`nasa-panel ${isPanelOpen ? 'open' : 'closed'}`}>
          <div
            style={{
              padding: '32px 32px 24px',
              borderBottom: '1px solid var(--border-light)',
              background: 'var(--bg-card)',
            }}
          >
            <div
              className="syne"
              style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}
            >
              NASA INDIA OFFICIAL
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              2026-27 UPDATES FEED
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
            {[
              {
                id: 1,
                tag: 'THEME 2026',
                title: 'CATALYSE',
                date: '68th Year of NASA India',
                desc: "A catalyst doesn't wait for change. It creates movement, breaks inertia, and opens new paths.",
              },
              {
                id: 2,
                tag: 'TROPHY BRIEF',
                title: 'Louis I. Kahn Trophy',
                date: 'Brief Available',
                desc: 'Understanding the interrelations among the five elemental forces and the building envelope.',
              },
              {
                id: 3,
                tag: 'COMPETITION',
                title: 'HUDCO Trophy',
                date: 'Prize: ₹7,00,000',
                desc: 'Designing for the informal sector and giving design alternatives for Sustainable Urban Development.',
              },
            ].map((news) => (
              <div key={news.id} style={{ marginBottom: 32 }}>
                <div className="badge badge-light" style={{ marginBottom: 12 }}>
                  {news.tag}
                </div>
                <h3
                  className="syne"
                  style={{ fontSize: 16, margin: '0 0 6px 0', lineHeight: 1.3 }}
                >
                  {news.title}
                </h3>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    marginBottom: 12,
                  }}
                >
                  {news.date}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {news.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- UNIVERSAL MODALS --- */}
      {modal.isOpen && (
        <div className="modal-bg">
          <div className="modal-box">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 24,
              }}
            >
              <h2 className="syne" style={{ margin: 0, fontSize: 24 }}>
                {modal.editingId ? 'EDIT' : 'ADD'} {modal.type.toUpperCase()}
              </h2>
              <div style={{ cursor: 'pointer' }} onClick={closeModal}>
                <Icons.Close />
              </div>
            </div>

            {/* Delegate Modal */}
            {modal.type === 'delegate' && (
              <>
                <input
                  className="input-field"
                  placeholder="Full Name"
                  value={formData.name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <select
                  className="input-field"
                  value={formData.role || 'Delegate'}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="Delegate">Delegate</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Unit Designee">Unit Designee</option>
                </select>
                <input
                  className="input-field"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  className="input-field"
                  placeholder="Phone Number"
                  value={formData.phone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    marginBottom: 4,
                  }}
                >
                  Date of Birth
                </div>
                <input
                  type="date"
                  className="input-field"
                  value={formData.dob || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
                <input
                  className="input-field"
                  placeholder="Skills (e.g. AutoCAD, Rhino)"
                  value={formData.skills || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                />
                <button
                  className="action-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSave(delegates, setDelegates, 'D')}
                >
                  SAVE DELEGATE
                </button>
              </>
            )}

            {/* Finance Modal */}
            {modal.type === 'finance' && (
              <>
                <select
                  className="input-field"
                  value={formData.type || 'Expense'}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Expense">Log an Expense (Money Spent)</option>
                  <option value="Collection">
                    Set a Collection Goal (Money to Collect)
                  </option>
                </select>
                <input
                  className="input-field"
                  placeholder="Purpose (e.g. ZNC Registration)"
                  value={formData.purpose || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="input-field"
                  placeholder="Total People Involved (Optional)"
                  value={formData.peopleCount || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, peopleCount: e.target.value })
                  }
                />
                {formData.type === 'Collection' ? (
                  <>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Target Amount Needed (₹)"
                      value={formData.targetAmt || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, targetAmt: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Amount Collected So Far (₹)"
                      value={formData.collectedAmt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          collectedAmt: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <input
                    type="number"
                    className="input-field"
                    placeholder="Total Amount Spent (₹)"
                    value={formData.amount || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                )}
                <button
                  className="action-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSave(finances, setFinances, 'F')}
                >
                  SAVE RECORD
                </button>
              </>
            )}

            {/* Vault Modal */}
            {modal.type === 'vault' && (
              <>
                <select
                  className="input-field"
                  value={formData.type || 'NASA Trophy'}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="NASA Trophy">Official NASA Trophy</option>
                  <option value="NASA Program">NASA Program/Event</option>
                  <option value="Custom Event">
                    College Custom Event (e.g. Nexus)
                  </option>
                </select>
                <input
                  className="input-field"
                  placeholder="Project / Event Title"
                  value={formData.title || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <select
                  className="input-field"
                  value={formData.status || 'Planning'}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <div style={{ marginBottom: 16 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      marginBottom: 8,
                    }}
                  >
                    ASSIGN CREW:
                  </div>
                  <div
                    style={{
                      maxHeight: 150,
                      overflowY: 'auto',
                      border: '1px solid var(--border-light)',
                      borderRadius: 8,
                      padding: 8,
                    }}
                  >
                    {delegates.map((d) => (
                      <label
                        key={d.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '6px 8px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={(formData.assigned || []).includes(d.id)}
                          onChange={(e) => {
                            const curr = formData.assigned || [];
                            if (e.target.checked)
                              setFormData({
                                ...formData,
                                assigned: [...curr, d.id],
                              });
                            else
                              setFormData({
                                ...formData,
                                assigned: curr.filter((id) => id !== d.id),
                              });
                          }}
                        />
                        <span style={{ fontSize: 14 }}>
                          {d.name}{' '}
                          <span
                            className="mono"
                            style={{ fontSize: 10, color: 'var(--text-muted)' }}
                          >
                            ({d.role})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  className="action-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSave(vault, setVault, 'V')}
                >
                  SAVE PROJECT
                </button>
              </>
            )}

            {/* Gallery Modal */}
            {modal.type === 'gallery' && (
              <>
                <input
                  className="input-field"
                  placeholder="Project Title"
                  value={formData.title || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <select
                  className="input-field"
                  value={formData.author || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                >
                  <option value="">Select Author / Student...</option>
                  {delegates.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <input
                  className="input-field"
                  placeholder="Category (e.g. Design, Documentation)"
                  value={formData.category || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <textarea
                  className="input-field"
                  placeholder="Brief Description"
                  rows="3"
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  style={{ resize: 'none' }}
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: 12,
                  }}
                >
                  <select
                    className="input-field"
                    value={formData.fileType || 'Link'}
                    onChange={(e) =>
                      setFormData({ ...formData, fileType: e.target.value })
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <option value="Image">Image</option>
                    <option value="PDF">PDF Document</option>
                    <option value="PPT">Presentation</option>
                    <option value="Word">Word Doc</option>
                    <option value="Link">External Link</option>
                  </select>
                  <input
                    className="input-field"
                    placeholder="Paste File URL / Link"
                    value={formData.link || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    style={{ marginBottom: 0 }}
                  />
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 9,
                    color: 'var(--text-muted)',
                    marginBottom: 16,
                    marginTop: 4,
                  }}
                >
                  *Paste a direct link to Google Drive, Behance, or image
                  address.
                </div>

                <button
                  className="action-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSave(gallery, setGallery, 'G')}
                >
                  ADD TO GALLERY
                </button>
              </>
            )}

            {/* Campaign Sync Modal */}
            {modal.type === 'campaign' && (
              <>
                <p
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    marginBottom: 20,
                  }}
                >
                  Select an official NASA India brief to track for Unit Z649.
                </p>
                <select
                  className="input-field"
                  value={formData.title || 'Louis I. Kahn Trophy'}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                >
                  <option value="Louis I. Kahn Trophy">
                    Louis I. Kahn Trophy
                  </option>
                  <option value="HUDCO Trophy">HUDCO Trophy</option>
                  <option value="ANDC Pavilion">ANDC Pavilion</option>
                  <option value="NIRC Conference">NIRC Conference</option>
                </select>
                <button
                  className="action-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleSaveCampaign}
                >
                  INITIALIZE TRACKING
                </button>
              </>
            )}

            {/* Leadership Modal */}
            {modal.type === 'leadership' && (
              <>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                  }}
                >
                  UNIT INFORMATION
                </div>
                <input
                  className="input-field"
                  placeholder="Unit Code (e.g. Z649)"
                  value={formData.unitCode || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, unitCode: e.target.value })
                  }
                />
                <input
                  className="input-field"
                  placeholder="Official NASA Email"
                  value={formData.officialEmail || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, officialEmail: e.target.value })
                  }
                />

                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                    marginTop: 16,
                  }}
                >
                  UNIT DESIGNEE (UD)
                </div>
                <input
                  className="input-field"
                  placeholder="UD Name"
                  value={formData.ud?.name || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ud: { ...formData.ud, name: e.target.value },
                    })
                  }
                />
                <input
                  className="input-field"
                  placeholder="UD Phone"
                  value={formData.ud?.phone || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ud: { ...formData.ud, phone: e.target.value },
                    })
                  }
                />
                <input
                  className="input-field"
                  placeholder="UD Email"
                  value={formData.ud?.email || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ud: { ...formData.ud, email: e.target.value },
                    })
                  }
                />

                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                    marginTop: 16,
                  }}
                >
                  UNIT SECRETARY (USEC)
                </div>
                <input
                  className="input-field"
                  placeholder="USEC Name"
                  value={formData.usec?.name || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      usec: { ...formData.usec, name: e.target.value },
                    })
                  }
                />
                <input
                  className="input-field"
                  placeholder="USEC Phone"
                  value={formData.usec?.phone || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      usec: { ...formData.usec, phone: e.target.value },
                    })
                  }
                />
                <input
                  className="input-field"
                  placeholder="USEC Email"
                  value={formData.usec?.email || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      usec: { ...formData.usec, email: e.target.value },
                    })
                  }
                />

                <button
                  className="action-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setLeadership(formData);
                    closeModal();
                  }}
                >
                  SAVE LEADERSHIP DATA
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
