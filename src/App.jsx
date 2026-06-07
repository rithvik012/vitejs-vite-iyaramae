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
  return (
    <div style={{ color: 'white', padding: '50px' }}>
      <h1>System Initialized</h1>
      <p>The React application is running. You have successfully replaced the HTML template with the React component engine.</p>
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