import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

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

// ==========================================
// 2. ROOM CONFIGURATION ENGINE
// ==========================================
const ROOMS = [
  { id:'atrium',   label:'Atrium',        sub:'Welcome',          glyph:'AT', accent:'#5B8CFF', cam:{rx:52,ry:  0,tz:-120,ty:   0} },
  { id:'about',    label:'Briefing Room', sub:'Who we are',       glyph:'BR', accent:'#00D3A7', cam:{rx:60,ry:-14,tz: -40,ty: -60} },
  { id:'missions', label:'Mission Bay',   sub:'What we build',    glyph:'MB', accent:'#FF7A45', cam:{rx:46,ry: 16,tz:  60,ty:-140} },
  { id:'crew',     label:'Crew Quarters', sub:'The team',         glyph:'CQ', accent:'#B388FF', cam:{rx:64,ry:  8,tz: -20,ty:-220} },
  { id:'news',     label:'Comms Deck',    sub:'Latest updates',   glyph:'CD', accent:'#FFD166', cam:{rx:50,ry:-20,tz: 100,ty:-300} },
  { id:'ops',      label:'Ops Terminal',  sub:'Ask the council',  glyph:'OP', accent:'#4DD0E1', cam:{rx:70,ry:  0,tz:-160,ty:-380} },
  { id:'events',   label:'Launch Pad',    sub:'Upcoming schedule',glyph:'LP', accent:'#FF5D8F', cam:{rx:44,ry: 22,tz:  40,ty:-460} },
  { id:'contact',  label:'Airlock',       sub:'Get in touch',     glyph:'AL', accent:'#8DFF6B', cam:{rx:58,ry:-10,tz: -80,ty:-540} }
];

// ==========================================
// 3. SEED DATA (MOCK DATA FOR PREVIEW)
// ==========================================
const MOCK_DATA = {
  news: [
    { id:'n1', title:'CubeSat-1 clears vibration testing', tag:'Mission',      date:'2026-07-18', body:'The 1U structure survived a full random-vibe profile with no fastener loosening. Avionics integration begins next week.' },
    { id:'n2', title:'Paper accepted at NSSS',             tag:'Research',     date:'2026-07-09', body:'Our low-cost telemetry decoder work was accepted for the student track. Two second-years will present.' }
  ],
  missions: [
    { id:'m1', title:'CubeSat-1',  tag:'Avionics',        date:'Integration', body:'1U technology demonstrator carrying an atmospheric telemetry payload and a student-designed decoder chain.' },
    { id:'m2', title:'Project Vayu',tag:'Structures',     date:'Static fire', body:'Solid-motor sounding rocket targeting 3km apogee with active recovery and onboard flight logging.' }
  ],
  crew: [
    { id:'c1', name:'Aarav Menon',    role:'Council Chair' },
    { id:'c2', name:'Diya Raghavan',  role:'Avionics Lead' },
    { id:'c3', name:'Kabir Sethi',    role:'Structures Lead' },
    { id:'c4', name:'Meera Iyer',     role:'Payload Science' }
  ],
  events: [
    { id:'e1', when:'12 Aug',  title:'Autumn intake opens',        where:'Online form · all years' },
    { id:'e2', when:'24 Aug',  title:'Avionics bootcamp',          where:'Lab 204 · 6 sessions' }
  ]
};

// ==========================================
// 4. CSS ARCHITECTURE
// ==========================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;400;600;800&family=IBM+Plex+Mono:wght@400;600&display=swap');

  :root {
    --bg:#07090F;
    --bg-2:#0C1018;
    --panel:rgba(255,255,255,.045);
    --panel-2:rgba(255,255,255,.075);
    --line:rgba(255,255,255,.11);
    --line-2:rgba(255,255,255,.2);
    --ink:#F2F5FF;
    --ink-2:#A8B2CC;
    --ink-3:#6C7793;
    --danger:#FF5C5C;
    --accent:#5B8CFF;
    --accent-soft:rgba(91,140,255,.14);

    --fs-1:clamp(.72rem,.68rem + .2vw,.8rem);
    --fs-2:clamp(.84rem,.8rem + .25vw,.94rem);
    --fs-3:clamp(.98rem,.92rem + .35vw,1.1rem);
    --fs-4:clamp(1.2rem,1.05rem + .8vw,1.6rem);
    --fs-5:clamp(1.6rem,1.25rem + 1.9vw,2.6rem);
    --fs-6:clamp(2.2rem,1.4rem + 3.6vw,4.2rem);
    --fs-7:clamp(2.8rem,1.5rem + 5.6vw,6rem);

    --sp-1:.375rem; --sp-2:.75rem; --sp-3:1.125rem;
    --sp-4:1.75rem; --sp-5:2.5rem;  --sp-6:4rem;
    --r-sm:10px; --r-md:16px; --r-lg:24px; --r-xl:32px;

    --sat:env(safe-area-inset-top,0px);
    --sar:env(safe-area-inset-right,0px);
    --sab:env(safe-area-inset-bottom,0px);
    --sal:env(safe-area-inset-left,0px);

    --z-house:0; --z-content:10; --z-hud:40; --z-rail:50;
    --z-dock:60; --z-modal:80; --z-splash:100;

    --ease:cubic-bezier(.22,1,.36,1);
    --ease-io:cubic-bezier(.65,.05,.36,1);
  }

  *,*::before,*::after { box-sizing:border-box; }
  html { -webkit-text-size-adjust:100%; }
  html, body { margin:0; padding:0; }
  body { background:var(--bg); color:var(--ink); font-family:'Sora',system-ui,-apple-system,'Segoe UI',sans-serif; font-size:var(--fs-3); line-height:1.62; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
  body[data-locked="true"] { overflow:hidden; }
  img, svg { display:block; max-width:100%; }
  button, input, textarea, select { font:inherit; color:inherit; }
  :focus-visible { outline:2px solid var(--accent); outline-offset:3px; border-radius:6px; }

  /* House Background */
  .house { position:fixed; inset:0; z-index:var(--z-house); overflow:hidden; perspective:1100px; perspective-origin:50% 42%; background: radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,.05), transparent 60%), linear-gradient(180deg,var(--bg-2),var(--bg)); pointer-events:none; }
  .house::after { content:''; position:absolute; inset:0; background:radial-gradient(130% 100% at 50% 50%, transparent 30%, rgba(4,6,11,.82) 100%); }
  .house__scene { position:absolute; top:50%; left:50%; width:180vmax; height:180vmax; margin:calc(-90vmax) 0 0 calc(-90vmax); transform-style:preserve-3d; transition:transform 1.4s var(--ease); will-change:transform; }
  .plane { position:absolute; inset:0; transform-style:preserve-3d; }
  .floor { background-image: linear-gradient(var(--accent-soft) 1px, transparent 1px), linear-gradient(90deg,var(--accent-soft) 1px, transparent 1px); background-size:7vmax 7vmax, 7vmax 7vmax; transform:rotateX(90deg) translateZ(-26vmax); opacity:.85; transition:background-image 1.2s var(--ease); }
  .wall { border:1px solid var(--line); background:linear-gradient(180deg,rgba(255,255,255,.03),transparent); }
  .wall--back { transform:translateZ(-60vmax); }
  .wall--left { transform:rotateY(90deg) translateZ(-60vmax); }
  .wall--right { transform:rotateY(-90deg) translateZ(-60vmax); }
  .shaft { position:absolute; left:50%; top:-10%; width:34vmax; height:150%; margin-left:-17vmax; background:linear-gradient(180deg,var(--accent),transparent 72%); opacity:.16; transform:rotateX(74deg) translateZ(-20vmax); transition:background 1.2s var(--ease); }

  /* HUD */
  .hud { position:fixed; z-index:var(--z-hud); top:calc(var(--sat) + var(--sp-3)); left:calc(var(--sal) + var(--sp-3)); display:flex; align-items:center; gap:.7rem; padding:.6rem .95rem; background:rgba(8,11,18,.6); border:1px solid var(--line); border-radius:999px; backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); max-width:min(70vw,340px); }
  .hud__dot { width:9px; height:9px; border-radius:50%; flex:0 0 auto; background:var(--accent); box-shadow:0 0 0 4px var(--accent-soft); animation:pulse 2.6s ease-in-out infinite; }
  @keyframes pulse { 50% { transform:scale(1.45); } }
  .hud__text { min-width:0; }
  .hud__room { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.16em; text-transform:uppercase; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0; }
  .hud__sub { font-size:var(--fs-1); color:var(--ink-3); margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

  /* Counter */
  .counter { position:fixed; z-index:var(--z-hud); bottom:calc(var(--sab) + 6.5rem); right:calc(var(--sar) + var(--sp-3)); text-align:right; font-family:'IBM Plex Mono',monospace; }
  .counter__n { font-size:var(--fs-4); font-weight:600; color:var(--ink); letter-spacing:.04em; }
  .counter__n span { color:var(--ink-3); font-size:var(--fs-2); }
  .counter__bar { width:78px; height:2px; margin:.45rem 0 0 auto; background:var(--line-2); border-radius:2px; overflow:hidden; }
  .counter__fill { display:block; height:100%; background:var(--accent); border-radius:2px; transition:width .7s var(--ease), background .7s var(--ease); }
  @media (min-width:860px) { .counter { bottom:calc(var(--sab) + var(--sp-4)); } }

  /* Rail Desktop */
  .rail { position:fixed; z-index:var(--z-rail); right:calc(var(--sar) + var(--sp-3)); top:50%; transform:translateY(-50%); display:none; flex-direction:column; gap:.5rem; padding:.6rem; background:rgba(8,11,18,.5); border:1px solid var(--line); border-radius:999px; backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); }
  @media (min-width:860px) { .rail { display:flex; } }
  .pill { position:relative; display:flex; align-items:center; gap:.6rem; min-height:44px; padding:.4rem .55rem; background:transparent; border:0; border-radius:999px; cursor:pointer; color:var(--ink-3); transition:color .3s var(--ease), background .3s var(--ease); }
  .pill__dot { width:10px; height:10px; border-radius:50%; flex:0 0 auto; background:var(--pa); opacity:.4; transition:opacity .3s var(--ease), transform .3s var(--ease); }
  .pill__label { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.1em; text-transform:uppercase; max-width:0; overflow:hidden; white-space:nowrap; transition:max-width .4s var(--ease), margin .4s var(--ease); margin-right:0; }
  .pill:hover .pill__label, .pill:focus-visible .pill__label, .pill[aria-current="true"] .pill__label { max-width:150px; margin-right:.35rem; }
  .pill:hover, .pill:focus-visible { color:var(--ink); background:var(--panel); }
  .pill[aria-current="true"] { color:var(--ink); background:var(--panel-2); }
  .pill[aria-current="true"] .pill__dot { opacity:1; transform:scale(1.25); box-shadow:0 0 0 4px color-mix(in srgb,var(--pa) 20%,transparent); }

  /* Dock Mobile */
  .dock { position:fixed; z-index:var(--z-dock); left:0; right:0; bottom:0; padding:.5rem calc(var(--sal) + .5rem) calc(var(--sab) + .5rem) calc(var(--sar) + .5rem); background:linear-gradient(180deg,rgba(7,9,15,0),rgba(7,9,15,.92) 42%); }
  @media (min-width:860px) { .dock { display:none; } }
  .dock__scroller { display:flex; gap:.4rem; overflow-x:auto; overflow-y:hidden; scroll-snap-type:x proximity; -webkit-overflow-scrolling:touch; scrollbar-width:none; padding:.45rem; background:rgba(12,16,24,.85); border:1px solid var(--line); border-radius:var(--r-lg); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); }
  .dock__scroller::-webkit-scrollbar { display:none; }
  .dock__btn { flex:0 0 auto; scroll-snap-align:center; display:grid; justify-items:center; gap:.2rem; min-width:62px; min-height:52px; padding:.35rem .5rem; background:transparent; border:0; border-radius:var(--r-md); color:var(--ink-3); cursor:pointer; transition:background .3s var(--ease), color .3s var(--ease); }
  .dock__glyph { display:grid; place-items:center; width:26px; height:26px; border-radius:8px; font-family:'IBM Plex Mono',monospace; font-size:.72rem; font-weight:600; background:color-mix(in srgb,var(--pa) 16%,transparent); color:var(--pa); }
  .dock__label { font-family:'IBM Plex Mono',monospace; font-size:.58rem; letter-spacing:.06em; text-transform:uppercase; white-space:nowrap; }
  .dock__btn[aria-current="true"] { background:var(--panel-2); color:var(--ink); }
  .dock__btn[aria-current="true"] .dock__glyph { background:var(--pa); color:#06080E; }

  /* Layout */
  main { position:relative; z-index:var(--z-content); }
  .room { min-height:100svh; display:grid; align-content:center; scroll-snap-align:start; padding:calc(var(--sat) + 5.5rem) calc(var(--sar) + var(--sp-3)) calc(var(--sab) + 6.5rem) calc(var(--sal) + var(--sp-3)); }
  @media (min-width:860px) { .room { padding:calc(var(--sat) + var(--sp-6)) calc(var(--sar) + 6rem) calc(var(--sab) + var(--sp-6)) calc(var(--sal) + var(--sp-5)); } }
  .wrap { width:100%; max-width:1120px; margin:0 auto; }

  /* Typography */
  .eyebrow { display:inline-flex; align-items:center; gap:.55rem; font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.22em; text-transform:uppercase; color:var(--accent); margin:0 0 var(--sp-3) 0; }
  .eyebrow::before { content:''; width:26px; height:1px; background:var(--accent); }
  h1,h2,h3,h4 { font-weight:800; letter-spacing:-.02em; line-height:1.06; margin:0; }
  h1 { font-size:var(--fs-7); } h2 { font-size:var(--fs-6); } h3 { font-size:var(--fs-4); letter-spacing:-.01em; }
  .display-thin { font-weight:200; }
  .lede { font-size:var(--fs-4); font-weight:200; color:var(--ink-2); margin:var(--sp-3) 0 0 0; max-width:46ch; line-height:1.45; }
  
  /* Components */
  .card { background:var(--panel); border:1px solid var(--line); border-radius:var(--r-lg); padding:var(--sp-4); transition:transform .5s var(--ease), border-color .5s var(--ease), background .5s var(--ease); }
  .card:hover { transform:translateY(-4px); border-color:var(--line-2); background:var(--panel-2); }
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:.55rem; min-height:48px; padding:.8rem 1.5rem; border-radius:999px; border:1px solid transparent; font-size:var(--fs-2); font-weight:600; cursor:pointer; text-decoration:none; transition:transform .3s var(--ease), background .3s var(--ease), border-color .3s var(--ease), color .3s var(--ease); }
  .btn:active { transform:scale(.97); }
  .btn--primary { background:var(--accent); color:#06080E; }
  .btn--primary:hover { background:#fff; }
  .btn--ghost { background:transparent; border-color:var(--line-2); color:var(--ink); }
  .btn--ghost:hover { background:var(--panel-2); border-color:var(--accent); }
  .btn--danger { background:var(--danger); color:#150404; }
  .btn--sm { min-height:40px; padding:.5rem 1rem; font-size:var(--fs-1); }
  .btn-row { display:flex; flex-wrap:wrap; gap:var(--sp-2); margin:var(--sp-4) 0 0 0; }

  /* Bento Grid */
  .bento { display:grid; grid-template-columns:1fr; grid-auto-rows:minmax(120px,auto); gap:var(--sp-2); margin:var(--sp-5) 0 0 0; }
  @media (min-width:640px) { .bento { grid-template-columns:repeat(2,1fr); } }
  @media (min-width:900px) { .bento { grid-template-columns:repeat(4,1fr); gap:var(--sp-3); } .bento__cell--wide { grid-column:span 2; } .bento__cell--tall { grid-row:span 2; } }
  .bento__cell { display:flex; flex-direction:column; justify-content:space-between; gap:var(--sp-2); background:var(--panel); border:1px solid var(--line); border-radius:var(--r-md); padding:var(--sp-3); transition:border-color .4s var(--ease), background .4s var(--ease), transform .4s var(--ease); }
  .bento__cell:hover { border-color:var(--accent); background:var(--panel-2); transform:translateY(-3px); }
  .bento__k { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.16em; text-transform:uppercase; color:var(--ink-3); margin:0; }
  .bento__v { font-size:var(--fs-5); font-weight:800; letter-spacing:-.03em; margin:0; line-height:1; }
  .bento__d { font-size:var(--fs-2); color:var(--ink-2); margin:0; }

  .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(140px,100%),1fr)); gap:var(--sp-3); margin:var(--sp-5) 0 0 0; }
  .stat { border-left:2px solid var(--accent); padding:0 0 0 var(--sp-3); }
  .stat__v { font-size:var(--fs-5); font-weight:800; letter-spacing:-.03em; margin:0; line-height:1; }
  .stat__k { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.14em; text-transform:uppercase; color:var(--ink-3); margin:.4rem 0 0 0; }

  /* Crew */
  .crew { display:grid; grid-template-columns:repeat(auto-fill,minmax(min(210px,100%),1fr)); gap:var(--sp-3); margin:var(--sp-5) 0 0 0; }
  .member { display:grid; justify-items:start; gap:var(--sp-2); }
  .avatar { display:grid; place-items:center; width:68px; height:68px; border-radius:20px; font-family:'IBM Plex Mono',monospace; font-size:1.32rem; font-weight:600; letter-spacing:.02em; color:#fff; background:linear-gradient(145deg,hsl(var(--h) 78% 58%),hsl(calc(var(--h) + 42) 72% 40%)); box-shadow:0 10px 30px -12px hsl(var(--h) 78% 50% / .7); transition:transform .45s var(--ease); }
  .member:hover .avatar { transform:translateY(-4px) rotate(-3deg); }
  .member__name { font-size:var(--fs-3); font-weight:600; margin:0; }
  .member__role { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.1em; text-transform:uppercase; color:var(--accent); margin:0; }

  /* News */
  .news { display:grid; grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr)); gap:var(--sp-3); margin:var(--sp-5) 0 0 0; }
  .news__item { display:flex; flex-direction:column; gap:var(--sp-2); }
  .news__meta { display:flex; flex-wrap:wrap; align-items:center; gap:.5rem; margin:0; }
  .tag { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.12em; text-transform:uppercase; padding:.22rem .6rem; border-radius:999px; background:var(--accent-soft); color:var(--accent); }
  .news__date { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); color:var(--ink-3); }
  .news__body { color:var(--ink-2); font-size:var(--fs-2); margin:0; flex:1 1 auto; }
  .news__actions { display:flex; gap:var(--sp-2); margin:var(--sp-2) 0 0 0; }
  .empty { grid-column:1/-1; text-align:center; padding:var(--sp-5); border:1px dashed var(--line-2); border-radius:var(--r-lg); color:var(--ink-3); }

  /* Forms */
  .form { display:grid; gap:var(--sp-3); margin:var(--sp-4) 0 0 0; max-width:560px; }
  .form--wide { max-width:none; }
  .field { display:grid; gap:.45rem; }
  .field > label { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.12em; text-transform:uppercase; color:var(--ink-2); }
  .field input, .field textarea, .field select { width:100%; margin:0; padding:.85rem 1rem; background:rgba(255,255,255,.04); border:1px solid var(--line); border-radius:var(--r-sm); font-size:var(--fs-2); transition:border-color .3s var(--ease), background .3s var(--ease); }
  .field textarea { min-height:120px; resize:vertical; }
  .field input:focus, .field textarea:focus, .field select:focus { border-color:var(--accent); background:rgba(255,255,255,.07); outline:none; }
  .field__err { font-size:var(--fs-1); color:var(--danger); margin:0; min-height:1.1em; }
  .grid-2 { display:grid; gap:var(--sp-3); grid-template-columns:1fr; }
  @media (min-width:640px) { .grid-2 { grid-template-columns:1fr 1fr; } }

  /* Terminal */
  .term { display:flex; flex-direction:column; background:rgba(4,7,13,.72); border:1px solid var(--line); border-radius:var(--r-lg); overflow:hidden; margin:var(--sp-5) 0 0 0; }
  .term__bar { display:flex; align-items:center; gap:.5rem; padding:.7rem 1rem; border-bottom:1px solid var(--line); background:rgba(255,255,255,.03); }
  .term__led { width:9px; height:9px; border-radius:50%; background:var(--line-2); }
  .term__led--on { background:var(--accent); }
  .term__title { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.14em; text-transform:uppercase; color:var(--ink-3); margin:0 0 0 .5rem; }
  .term__log { height:clamp(260px,38svh,420px); overflow-y:auto; padding:var(--sp-3); margin:0; font-family:'IBM Plex Mono',monospace; font-size:var(--fs-2); line-height:1.75; overflow-wrap:anywhere; }
  .term__line { margin:0 0 .35rem 0; }
  .term__line--in { color:var(--ink); }
  .term__line--in::before { content:'> '; color:var(--accent); }
  .term__line--out { color:var(--ink-2); }
  .term__line--sys { color:var(--ink-3); font-style:italic; }
  .term__form { display:flex; gap:.5rem; padding:var(--sp-2); border-top:1px solid var(--line); background:rgba(255,255,255,.02); }
  .term__form input { flex:1 1 auto; min-width:0; margin:0; padding:.7rem .9rem; background:rgba(255,255,255,.05); border:1px solid var(--line); border-radius:var(--r-sm); font-family:'IBM Plex Mono',monospace; font-size:var(--fs-2); }
  .term__chips { display:flex; flex-wrap:wrap; gap:.5rem; margin:var(--sp-3) 0 0 0; }
  .chip { min-height:40px; padding:.45rem .9rem; background:var(--panel); border:1px solid var(--line); border-radius:999px; font-size:var(--fs-1); color:var(--ink-2); cursor:pointer; transition:border-color .3s var(--ease), color .3s var(--ease); }
  .chip:hover { border-color:var(--accent); color:var(--ink); }

  /* Timeline */
  .timeline { list-style:none; margin:var(--sp-5) 0 0 0; padding:0; display:grid; gap:var(--sp-3); }
  .event { display:grid; gap:var(--sp-2); grid-template-columns:1fr; padding:var(--sp-3); background:var(--panel); border:1px solid var(--line); border-radius:var(--r-md); border-left:3px solid var(--accent); }
  @media (min-width:720px) { .event { grid-template-columns:130px 1fr auto; align-items:center; } }
  .event__when { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.1em; text-transform:uppercase; color:var(--accent); margin:0; }
  .event__what { margin:0; }
  .event__title { font-size:var(--fs-3); font-weight:600; margin:0; }
  .event__where { font-size:var(--fs-2); color:var(--ink-3); margin:.2rem 0 0 0; }

  /* Modal */
  .modal { position:fixed; inset:0; z-index:var(--z-modal); display:grid; opacity:0; pointer-events:none; transition:opacity .3s var(--ease); }
  .modal[data-open="true"] { opacity:1; pointer-events:auto; }
  .modal__veil { position:absolute; inset:0; background:rgba(3,5,10,.72); border:0; padding:0; cursor:pointer; width:100%; }
  .modal__panel { position:relative; width:100%; background:#0D111A; border:1px solid var(--line); padding:var(--sp-4); transition:transform .38s var(--ease); max-height:88svh; overflow-y:auto; align-self:end; border-radius:var(--r-xl) var(--r-xl) 0 0; transform:translateY(100%); }
  .modal[data-open="true"] .modal__panel { transform:translateY(0); }
  .modal__grip { width:44px; height:4px; border-radius:999px; background:var(--line-2); margin:0 auto var(--sp-3) auto; }
  @media (min-width:768px) {
    .modal { align-items:center; justify-items:center; padding:var(--sp-4); }
    .modal__panel { max-width:520px; border-radius:var(--r-lg); padding-bottom:var(--sp-4); transform:translateY(16px) scale(.97); align-self:center; }
    .modal[data-open="true"] .modal__panel { transform:translateY(0) scale(1); }
    .modal__grip { display:none; }
  }
  .modal__title { font-size:var(--fs-4); margin:0 0 var(--sp-2) 0; }
  .modal__body { color:var(--ink-2); font-size:var(--fs-2); margin:0; }
  .modal__actions { display:flex; flex-wrap:wrap; gap:var(--sp-2); margin:var(--sp-4) 0 0 0; justify-content:flex-end; }

  /* Toast */
  .toast { position:fixed; z-index:var(--z-modal); left:50%; bottom:calc(var(--sab) + 7.5rem); transform:translate(-50%,140%); display:flex; align-items:center; gap:.6rem; padding:.75rem 1.15rem; background:#0D111A; border:1px solid var(--accent); border-radius:999px; font-size:var(--fs-2); transition:transform .4s var(--ease); max-width:calc(100vw - 2rem); }
  .toast[data-show="true"] { transform:translate(-50%,0); }
  @media (min-width:860px) { .toast { bottom:calc(var(--sab) + var(--sp-4)); } }

  /* Splash */
  .splash { position:fixed; inset:0; z-index:var(--z-splash); display:grid; place-items:center; background:var(--bg); transition:opacity .8s var(--ease), visibility .8s; }
  .splash[data-done="true"] { opacity:0; visibility:hidden; }
  .splash__inner { display:grid; justify-items:center; gap:var(--sp-3); padding:var(--sp-4); text-align:center; }
  .splash__mark { width:min(160px,42vw); height:auto; }
  .splash__ring { fill:none; stroke:var(--accent); stroke-width:2; opacity:.9; stroke-dasharray:302; stroke-dashoffset:302; animation:draw 1.5s var(--ease-io) forwards; }
  .splash__orbit { fill:none; stroke:#fff; stroke-width:1.4; opacity:.6; stroke-dasharray:260; stroke-dashoffset:260; animation:draw 1.6s .28s var(--ease-io) forwards; }
  .splash__star { fill:#fff; opacity:0; animation:fadein .7s .95s var(--ease) forwards; }
  @keyframes draw { to { stroke-dashoffset:0; } }
  @keyframes fadein { to { opacity:1; } }
  .splash__word { font-family:'IBM Plex Mono',monospace; font-size:var(--fs-2); letter-spacing:.42em; text-transform:uppercase; color:var(--ink-2); margin:0; opacity:0; animation:rise .8s 1.05s var(--ease) forwards; }
  .splash__sub { font-size:var(--fs-1); color:var(--ink-3); margin:0; letter-spacing:.14em; font-family:'IBM Plex Mono',monospace; text-transform:uppercase; opacity:0; animation:rise .8s 1.25s var(--ease) forwards; }
  @keyframes rise { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
  .splash__bar { width:min(230px,62vw); height:2px; background:var(--line-2); border-radius:2px; overflow:hidden; margin:var(--sp-2) 0 0 0; }
  .splash__bar span { display:block; height:100%; width:0; background:var(--accent); animation:load 1.9s .2s var(--ease-io) forwards; }
  @keyframes load { to { width:100%; } }
  .splash__skip { margin:var(--sp-3) 0 0 0; background:transparent; border:1px solid var(--line-2); color:var(--ink-3); border-radius:999px; min-height:44px; padding:.5rem 1.2rem; font-family:'IBM Plex Mono',monospace; font-size:var(--fs-1); letter-spacing:.14em; text-transform:uppercase; cursor:pointer; transition:color .3s var(--ease), border-color .3s var(--ease); }
  .splash__skip:hover { color:var(--ink); border-color:var(--accent); }

  .foot { border-top:1px solid var(--line); margin:var(--sp-6) 0 0 0; padding:var(--sp-3) 0 0 0; display:flex; flex-wrap:wrap; gap:var(--sp-2); justify-content:space-between; font-size:var(--fs-1); color:var(--ink-3); font-family:'IBM Plex Mono',monospace; letter-spacing:.08em; }
`;

// ==========================================
// 5. HELPERS
// ==========================================
const hueOf = (str) => {
  if(!str) return 0;
  let h = 0;
  for(let i=0; i<str.length; i++) { h = (h*31 + str.charCodeAt(i)) % 360; }
  return h;
};

const initials = (name) => {
  if(!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if(!parts.length) return '?';
  if(parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
};

const fmtDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleDateString(undefined, { day:'2-digit', month:'short', year:'numeric' });
};

// ==========================================
// 6. MAIN REACT APP
// ==========================================
export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [splashDone, setSplashDone] = useState(false);
  const [scrollDir, setScrollDir] = useState('down');
  
  // Real Data States (Falls back to MOCK_DATA if Firebase is empty/loading)
  const [news, setNews] = useState(MOCK_DATA.news);
  const [missions, setMissions] = useState(MOCK_DATA.missions);
  const [crew, setCrew] = useState(MOCK_DATA.crew);
  const [events, setEvents] = useState(MOCK_DATA.events);

  // UI States
  const [modal, setModal] = useState({ open: false, title: '', body: '', confirmLabel: '', danger: false, onConfirm: null });
  const [toastMsg, setToastMsg] = useState('');
  
  // Terminal State
  const [termLogs, setTermLogs] = useState([
    { kind: 'sys', text: 'council://ops v2.0 — local session, no data leaves this device.' },
    { kind: 'sys', text: 'Type "help" to see what I can answer.' }
  ]);
  const [termIn, setTermIn] = useState('');

  // Refs
  const scrollEngineRef = useRef(null);
  const termLogRef = useRef(null);
  const activeRoom = ROOMS[activeIndex];

  // 1. Boot Sequence
  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 2450);
    return () => clearTimeout(t);
  }, []);

  // 2. Firebase Listener
  useEffect(() => {
    const unsubs = [
      onSnapshot(collection(db, "news"), s => { if(!s.empty) setNews(s.docs.map(d => ({ id: d.id, ...d.data() }))) }),
      onSnapshot(collection(db, "crew"), s => { if(!s.empty) setCrew(s.docs.map(d => ({ id: d.id, ...d.data() }))) }),
      onSnapshot(collection(db, "vault"), s => { if(!s.empty) setMissions(s.docs.map(d => ({ id: d.id, ...d.data() }))) }),
      onSnapshot(collection(db, "events"), s => { if(!s.empty) setEvents(s.docs.map(d => ({ id: d.id, ...d.data() }))) })
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  // 3. Intersection Observer (Scroll Tracking)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let best = null;
      entries.forEach(en => {
        if (en.isIntersecting && (!best || en.intersectionRatio > best.intersectionRatio)) { best = en; }
      });
      if (best) {
        const idx = ROOMS.findIndex(r => r.id === best.target.id);
        if (idx !== -1) {
          setActiveIndex(prev => {
            setScrollDir(idx > prev ? 'down' : 'up');
            return idx;
          });
        }
      }
    }, { threshold: [0.25, 0.5, 0.75], rootMargin: '-10% 0px -10% 0px' });

    ROOMS.forEach(r => {
      const el = document.getElementById(r.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // 4. Auto-Scroll Terminal
  useEffect(() => {
    if (termLogRef.current) termLogRef.current.scrollTop = termLogRef.current.scrollHeight;
  }, [termLogs]);

  // Actions
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const navTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDeleteNews = (id) => {
    setModal({
      open: true,
      title: 'Delete this update?',
      body: 'This update will be removed permanently. This cannot be undone.',
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: () => {
        setNews(prev => prev.filter(n => n.id !== id));
        showToast('Update deleted.');
        setModal(prev => ({ ...prev, open: false }));
      }
    });
  };

  const handleRsvp = (title) => {
    setModal({
      open: true,
      title: 'Add a reminder',
      body: `We will email you 24 hours before "${title}". Confirm to register your interest.`,
      confirmLabel: 'Remind me',
      danger: false,
      onConfirm: () => {
        showToast('Reminder registered.');
        setModal(prev => ({ ...prev, open: false }));
      }
    });
  };

  const handleJoin = (e) => {
    e.preventDefault();
    setModal({
      open: true,
      title: 'Application received',
      body: 'Thanks for applying. The lead will be in touch within a week.',
      confirmLabel: 'Done',
      danger: false,
      onConfirm: () => {
        showToast('Application submitted.');
        setModal(prev => ({ ...prev, open: false }));
        e.target.reset();
      }
    });
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      id: 'n' + Date.now(),
      title: fd.get('title'),
      tag: fd.get('tag'),
      date: new Date().toISOString().slice(0,10),
      body: fd.get('body')
    };
    setNews([payload, ...news]);
    e.target.reset();
    showToast('Update published.');
  };

  const handleTerm = (e) => {
    e.preventDefault();
    if (!termIn.trim()) return;
    const q = termIn.trim();
    setTermLogs(p => [...p, { kind: 'in', text: q }]);
    setTermIn('');
    
    setTimeout(() => {
      const k = q.toLowerCase();
      let ans = 'No local match for that. Try: help · missions · crew · news · launch · join';
      if (/^help$/.test(k)) ans = 'Commands: missions · crew · news · launch · join · clear. Or ask a question in plain English.';
      else if (/^clear$/.test(k)) { setTermLogs([]); return; }
      else if (/mission|project|build/.test(k)) ans = 'Active programmes: ' + missions.map(m => m.title).join(' · ');
      else if (/crew|team|who|council|lead/.test(k)) ans = 'Council: ' + crew.map(c => c.name).join(' · ');
      else if (/news|update|latest/.test(k)) ans = news.length ? 'Latest: ' + news[0].title : 'No updates posted yet.';
      else if (/launch|event|when|schedule/.test(k)) ans = events.length ? 'Next up: ' + events[0].title : 'Nothing scheduled.';
      else if (/join|apply|member|intake/.test(k)) ans = 'Head to the Airlock room and submit the form.';
      
      setTermLogs(p => [...p, { kind: 'out', text: ans }]);
    }, 200);
  };

  // Rendering
  const rgbAccent = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return `${(n>>16)&255},${(n>>8)&255},${n&255}`;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <div style={{ 
        '--accent': activeRoom.accent, 
        '--accent-soft': `rgba(${rgbAccent(activeRoom.accent)}, .14)` 
      }}>

        {/* SPLASH */}
        <div className="splash" data-done={splashDone} role="dialog" aria-modal="true" aria-label="Loading NASA India Council">
          <div className="splash__inner">
            <svg className="splash__mark" viewBox="0 0 120 120" role="img" aria-label="Council emblem">
              <circle className="splash__ring" cx="60" cy="60" r="48" />
              <ellipse className="splash__orbit" cx="60" cy="60" rx="52" ry="20" transform="rotate(-22 60 60)" />
              <circle className="splash__star" cx="60" cy="60" r="5" />
              <circle className="splash__star" cx="92" cy="44" r="2" />
              <circle className="splash__star" cx="30" cy="78" r="2" />
            </svg>
            <p className="splash__word">NASA India Council</p>
            <p className="splash__sub">Initialising systems</p>
            <div className="splash__bar"><span></span></div>
            <button className="splash__skip" type="button" onClick={() => setSplashDone(true)}>Enter now</button>
          </div>
        </div>

        {/* 3D BACKGROUND */}
        <div className="house" aria-hidden="true">
          <div className="house__scene" style={{ 
            transform: `rotateX(${activeRoom.cam.rx}deg) rotateY(${activeRoom.cam.ry}deg) translate3d(0,${activeRoom.cam.ty}px,${activeRoom.cam.tz}px)`
          }}>
            <div className="plane floor"></div>
            <div className="plane wall wall--back"></div>
            <div className="plane wall wall--left"></div>
            <div className="plane wall wall--right"></div>
            <div className="shaft"></div>
          </div>
        </div>

        {/* HUD */}
        <div className="hud">
          <span className="hud__dot"></span>
          <div className="hud__text">
            <p className="hud__room">{activeRoom.label}</p>
            <p className="hud__sub">{activeRoom.sub}</p>
          </div>
        </div>

        <div className="counter" aria-hidden="true">
          <div className="counter__n"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span> / 08</span></div>
          <div className="counter__bar"><span className="counter__fill" style={{ width: `${((activeIndex+1)/ROOMS.length)*100}%` }}></span></div>
        </div>

        {/* DESKTOP RAIL */}
        <nav className="rail" aria-label="Room navigation">
          {ROOMS.map((r, i) => (
            <button key={r.id} type="button" className="pill" style={{ '--pa': r.accent }} aria-current={i === activeIndex} onClick={() => navTo(r.id)}>
              <span className="pill__dot" aria-hidden="true"></span>
              <span className="pill__label">{r.label}</span>
            </button>
          ))}
        </nav>

        {/* MOBILE DOCK */}
        <nav className="dock" aria-label="Room navigation">
          <div className="dock__scroller">
            {ROOMS.map((r, i) => (
              <button key={r.id} type="button" className="dock__btn" style={{ '--pa': r.accent }} aria-current={i === activeIndex} onClick={() => navTo(r.id)}>
                <span className="dock__glyph" aria-hidden="true">{r.glyph}</span>
                <span className="dock__label">{r.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* CONTENT */}
        <main data-dir={scrollDir} className="kinetic-scroll-engine" ref={scrollEngineRef}>
          
          <section className="room scrolling-section" id="atrium" data-index="0">
            <div className="wrap">
              <p className="eyebrow reveal">Student Space Council · Est. 2021</p>
              <h1 className="reveal d1">We build <span className="display-thin">things that</span> leave the ground.</h1>
              <p className="lede reveal d2">The NASA India Council is a student-led research and outreach body: CubeSats, rocketry, astrophotography and public science.</p>
              <div className="btn-row reveal d3">
                <button className="btn btn--primary" type="button" onClick={() => navTo('missions')}>Explore missions</button>
                <button className="btn btn--ghost" type="button" onClick={() => navTo('contact')}>Join the council</button>
              </div>
              <div className="bento reveal d4">
                <div className="bento__cell bento__cell--wide bento__cell--tall">
                  <p className="bento__k">Flagship</p>
                  <div>
                    <p className="bento__v">CubeSat-1</p>
                    <p className="bento__d">A 1U technology-demonstrator payload for low-cost atmospheric telemetry.</p>
                  </div>
                </div>
                <div className="bento__cell"><p className="bento__k">Members</p><p className="bento__v">140+</p></div>
                <div className="bento__cell"><p className="bento__k">Chapters</p><p className="bento__v">06</p></div>
                <div className="bento__cell bento__cell--wide"><p className="bento__k">Next launch window</p><p className="bento__v">T‑42<span style={{fontSize:'.4em'}}>days</span></p></div>
                <div className="bento__cell"><p className="bento__k">Papers</p><p className="bento__v">11</p></div>
              </div>
            </div>
          </section>

          <section className="room scrolling-section" id="about" data-index="1">
            <div className="wrap">
              <p className="eyebrow reveal">Briefing</p>
              <h2 className="reveal d1">Curiosity, <span className="display-thin">engineered.</span></h2>
              <p className="lede reveal d2">We exist to give students real hardware, real deadlines and real failure.</p>
              <div className="grid-2 reveal d3" style={{ marginTop: 'var(--sp-5)' }}>
                <div className="card">
                  <h3>What we do</h3>
                  <p className="body">Four active divisions — Avionics, Structures, Payload Science and Outreach.</p>
                </div>
                <div className="card">
                  <h3>How to join</h3>
                  <p className="body">Open intake twice a year. No prior experience required for first-years.</p>
                </div>
              </div>
              <div className="stats reveal d4">
                <div className="stat"><p className="stat__v">2021</p><p className="stat__k">Founded</p></div>
                <div className="stat"><p className="stat__v">04</p><p className="stat__k">Divisions</p></div>
                <div className="stat"><p className="stat__v">23</p><p className="stat__k">Builds shipped</p></div>
                <div className="stat"><p className="stat__v">100%</p><p className="stat__k">Student-run</p></div>
              </div>
            </div>
          </section>

          <section className="room scrolling-section" id="missions" data-index="2">
            <div className="wrap">
              <p className="eyebrow reveal">Mission Bay</p>
              <h2 className="reveal d1">Active <span className="display-thin">programmes</span></h2>
              <div className="news reveal d2">
                {missions.map(m => (
                  <article key={m.id} className="card news__item">
                    <p className="news__meta"><span className="tag">{m.tag}</span><span className="news__date">{m.date}</span></p>
                    <h3>{m.title}</h3>
                    <p className="news__body">{m.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="room scrolling-section" id="crew" data-index="3">
            <div className="wrap">
              <p className="eyebrow reveal">Crew Quarters</p>
              <h2 className="reveal d1">The <span className="display-thin">council</span></h2>
              <p className="lede reveal d2">Elected annually. Every officer also sits on a build team.</p>
              <div className="crew reveal d3">
                {crew.map(c => (
                  <div key={c.id} className="member">
                    <div className="avatar" style={{ '--h': hueOf(c.name) }} aria-hidden="true">{initials(c.name)}</div>
                    <p className="member__name">{c.name}</p>
                    <p className="member__role">{c.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="room scrolling-section" id="news" data-index="4">
            <div className="wrap">
              <p className="eyebrow reveal">Comms Deck</p>
              <h2 className="reveal d1">Latest <span className="display-thin">transmissions</span></h2>
              <div className="news reveal d2">
                {news.map(n => (
                  <article key={n.id} className="card news__item">
                    <p className="news__meta"><span className="tag">{n.tag}</span><span className="news__date">{fmtDate(n.date)}</span></p>
                    <h3>{n.title}</h3>
                    <p className="news__body">{n.body}</p>
                    <div className="news__actions">
                      <button className="btn btn--ghost btn--sm" onClick={() => handleDeleteNews(n.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
              <details className="card reveal d3" style={{ marginTop: 'var(--sp-4)' }}>
                <summary style={{ cursor:'pointer', fontWeight:600 }}>Post an update (council officers)</summary>
                <form className="form form--wide" onSubmit={handleNewsSubmit}>
                  <div className="grid-2">
                    <div className="field">
                      <label htmlFor="nTitle">Headline</label>
                      <input id="nTitle" name="title" type="text" required />
                    </div>
                    <div className="field">
                      <label htmlFor="nTag">Channel</label>
                      <select id="nTag" name="tag">
                        <option>Mission</option><option>Research</option>
                        <option>Outreach</option><option>Announcement</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="nBody">Body</label>
                    <textarea id="nBody" name="body" required></textarea>
                  </div>
                  <div className="btn-row" style={{ margin:0 }}>
                    <button className="btn btn--primary" type="submit">Publish</button>
                    <button className="btn btn--ghost" type="reset">Clear</button>
                  </div>
                </form>
              </details>
            </div>
          </section>

          <section className="room scrolling-section" id="ops" data-index="5">
            <div className="wrap">
              <p className="eyebrow reveal">Ops Terminal</p>
              <h2 className="reveal d1">Ask <span className="display-thin">the council</span></h2>
              <p className="lede reveal d2">A local query console — no network calls.</p>
              <div className="term reveal d3">
                <div className="term__bar">
                  <span className="term__led term__led--on"></span><span className="term__led"></span><span className="term__led"></span>
                  <p className="term__title">council://ops — session active</p>
                </div>
                <div className="term__log" ref={termLogRef}>
                  {termLogs.map((log, i) => (
                    <p key={i} className={`term__line term__line--${log.kind}`}>{log.text}</p>
                  ))}
                </div>
                <form className="term__form" onSubmit={handleTerm}>
                  <input type="text" value={termIn} onChange={e=>setTermIn(e.target.value)} placeholder="type help and press enter" />
                  <button className="btn btn--primary btn--sm" type="submit">Send</button>
                </form>
              </div>
              <div className="term__chips reveal d4">
                {['help', 'missions', 'how do I join', 'next launch', 'clear'].map(cmd => (
                  <button key={cmd} className="chip" onClick={() => setTermIn(cmd)}>{cmd}</button>
                ))}
              </div>
            </div>
          </section>

          <section className="room scrolling-section" id="events" data-index="6">
            <div className="wrap">
              <p className="eyebrow reveal">Launch Pad</p>
              <h2 className="reveal d1">Upcoming <span className="display-thin">schedule</span></h2>
              <ul className="timeline reveal d2">
                {events.map(ev => (
                  <li key={ev.id} className="event">
                    <p className="event__when">{ev.when}</p>
                    <div className="event__what">
                      <p className="event__title">{ev.title}</p>
                      <p className="event__where">{ev.where}</p>
                    </div>
                    <button className="btn btn--ghost btn--sm" onClick={() => handleRsvp(ev.title)}>Remind me</button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="room scrolling-section" id="contact" data-index="7">
            <div className="wrap">
              <p className="eyebrow reveal">Airlock</p>
              <h2 className="reveal d1">Come <span className="display-thin">aboard</span></h2>
              <p className="lede reveal d2">Tell us what you want to build. We read every application.</p>
              <form className="form reveal d3" onSubmit={handleJoin}>
                <div className="grid-2">
                  <div className="field"><label htmlFor="jName">Full name</label><input id="jName" required /></div>
                  <div className="field"><label htmlFor="jMail">Email</label><input id="jMail" type="email" required /></div>
                </div>
                <div className="field">
                  <label htmlFor="jDiv">Division of interest</label>
                  <select id="jDiv"><option>Avionics</option><option>Structures</option><option>Payload Science</option><option>Outreach</option><option>Not sure yet</option></select>
                </div>
                <div className="field"><label htmlFor="jWhy">What do you want to build?</label><textarea id="jWhy" required></textarea></div>
                <div className="btn-row" style={{ margin:0 }}><button className="btn btn--primary" type="submit">Submit application</button></div>
              </form>
              <div className="foot reveal d4">
                <span>NASA India Council · Student body</span>
                <span>council@yourcollege.edu</span>
              </div>
            </div>
          </section>

        </main>

        {/* MODAL */}
        <div className="modal" data-open={modal.open} role="dialog" aria-modal="true">
          <button className="modal__veil" onClick={() => setModal(p => ({ ...p, open:false }))}></button>
          <div className="modal__panel">
            <div className="modal__grip"></div>
            <h3 className="modal__title">{modal.title}</h3>
            <p className="modal__body">{modal.body}</p>
            <div className="modal__actions">
              <button className="btn btn--ghost btn--sm" onClick={() => setModal(p => ({ ...p, open:false }))}>Cancel</button>
              <button className={`btn btn--sm ${modal.danger ? 'btn--danger' : 'btn--primary'}`} onClick={modal.onConfirm}>{modal.confirmLabel}</button>
            </div>
          </div>
        </div>

        {/* TOAST */}
        <div className="toast" data-show={!!toastMsg}>{toastMsg}</div>
        
      </div>
    </>
  );
}