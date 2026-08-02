import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";
import {
  Activity, Aperture, Archive, ArrowUpRight, BookOpen,
  Crown, Eye, Globe, HardDrive, Hexagon, Lock, Mail,
  Pencil, Phone, Plus, Send, Settings, Shield,
  Trash2, Unlock, Users, X, Zap
} from 'lucide-react';

// ─── FIREBASE ─────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAYyPimaOuXEPi6R6wFNgsrhGOaemQE9J4",
  authDomain: "rsa-unit-z649.firebaseapp.com",
  projectId: "rsa-unit-z649",
  storageBucket: "rsa-unit-z649.firebasestorage.app",
  messagingSenderId: "672346485743",
  appId: "1:672346485743:web:55f86c5ccc65b59930bc1a"
};
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);
const ADMIN_KEY = "saturday";

// ─── ROOMS ────────────────────────────────────────────────────────────────────
const ROOMS = [
  { id:'dash',     label:'Command',    sub:'Unit Z649 Overview',   glyph:'CM', accent:'#5B8CFF', cam:'rotateX(52deg) translate3d(0,0px,-120px)'           },
  { id:'hq',       label:'Council',    sub:'Executive Core',       glyph:'HQ', accent:'#00D3A7', cam:'rotateX(60deg) rotateY(-14deg) translate3d(0,-60px,-40px)'  },
  { id:'vault',    label:'Vault',      sub:'Active Submissions',   glyph:'SV', accent:'#FF7A45', cam:'rotateX(46deg) rotateY(16deg)  translate3d(0,-140px,60px)'   },
  { id:'crew',     label:'Personnel',  sub:'Unit Directory',       glyph:'PR', accent:'#B388FF', cam:'rotateX(64deg) rotateY(8deg)   translate3d(0,-220px,-20px)'  },
  { id:'news',     label:'Broadcasts', sub:'NASA India Feed',      glyph:'BR', accent:'#FFD166', cam:'rotateX(50deg) rotateY(-20deg) translate3d(0,-300px,100px)'  },
  { id:'ai',       label:'RSA AI',     sub:'Intelligence Core',    glyph:'AI', accent:'#4DD0E1', cam:'rotateX(70deg) translate3d(0,-380px,-160px)'          },
  { id:'fin',      label:'Treasury',   sub:'Financial Ledger',     glyph:'TR', accent:'#FF5D8F', cam:'rotateX(44deg) rotateY(22deg)  translate3d(0,-460px,40px)'   },
  { id:'register', label:'Register',   sub:'Join Unit Z649',       glyph:'RG', accent:'#8DFF6B', cam:'rotateX(58deg) rotateY(-10deg) translate3d(0,-540px,-80px)'  }
];

// ─── QUOTES ───────────────────────────────────────────────────────────────────
const QUOTES = [
  '"Architecture is the learned game, correct and magnificent, of forms assembled in the light." – Le Corbusier',
  '"Form ever follows function." – Louis Sullivan',
  '"Less is more." – Ludwig Mies van der Rohe',
  '"There are 360 degrees, so why stick to one?" – Zaha Hadid',
  '"Architecture should speak of its time and place, but yearn for timelessness." – Frank Gehry',
  '"To create, one must first question everything." – Eileen Gray',
  '"A room is not a room without natural light." – Louis Kahn',
  '"Recognizing the need is the primary condition for design." – Charles Eames'
];

// ─── SEED DATA (used only when Firebase collections are empty) ────────────────
const SEED = {
  crew: [
    { id:'c1', name:'Rithvik M',    role:'UD',          year:'3', email:'rithvik@rsa.edu',   phone:'9876543210', coordinatorType:'' },
    { id:'c2', name:'Akshaya S',    role:'USEC',        year:'3', email:'akshaya@rsa.edu',   phone:'9876543211', coordinatorType:'' },
    { id:'c3', name:'Mugilan R',    role:'Coordinator', year:'3', email:'mugilan@rsa.edu',   phone:'9876543212', coordinatorType:'Design' },
    { id:'c4', name:'Nithya Sri',   role:'Coordinator', year:'2', email:'nithya@rsa.edu',    phone:'9876543213', coordinatorType:'Documentation' },
    { id:'c5', name:'Vishnav Iyer', role:'Member',      year:'2', email:'vishnav@rsa.edu',   phone:'', coordinatorType:'' },
    { id:'c6', name:'Thilip K',     role:'Member',      year:'1', email:'thilip@rsa.edu',    phone:'', coordinatorType:'' },
    { id:'c7', name:'Rithick V',    role:'Member',      year:'1', email:'rithick@rsa.edu',   phone:'', coordinatorType:'' }
  ],
  vault: [
    { id:'v1', title:'LIK Trophy – Heritage Docs',       category:'Trophies', link:'https://drive.google.com/drive/folders/', description:'Vernacular spatial documentation for LIK Trophy submission.' },
    { id:'v2', title:'MSL Trophy – Velachery Analysis',  category:'Trophies', link:'https://drive.google.com/drive/folders/', description:'Hydro-social connector concept sheets and site grading plans.' },
    { id:'v3', title:'68th ANC Workshop Guide',          category:'Events',   link:'https://nasaindia.co',                    description:'Official workshop registration and selection guidelines.' }
  ],
  finances: [
    { id:'f1', type:'income',  description:'Initial Unit Funding Allocation',      amount:50000 },
    { id:'f2', type:'expense', description:'Printing & Plotting – MSL Trophy',     amount:4500  },
    { id:'f3', type:'expense', description:'Site Visit Travel – Kanchipuram',      amount:12000 },
    { id:'f4', type:'income',  description:'Sponsorship – Alumni Network',         amount:15000 }
  ],
  news: [
    { id:'n1', title:'68th ANC Workshop Details Released',              tag:'Official', date:'2026-06-16', body:'NASA India has released the official workshop itinerary for the 68th Annual NASA Convention. All delegates must review and pre-register for their chosen workshops before the deadline.' },
    { id:'n2', title:'Louis I. Kahn Trophy Submissions Closing Soon',   tag:'Deadline', date:'2026-06-20', body:'All vernacular spatial configurations and architectural documentations must be uploaded to the secure vault before the submission window closes on June 20, 2026.' }
  ]
};

// ─── LIVE NASA FEED (static, always shown) ────────────────────────────────────
const NASA_FEED = [
  { id:'l1', title:'Louis I. Kahn Trophy – Open for Submissions',     tag:'Competition', date:'June 20, 2026',  link:'https://nasaindia.co/' },
  { id:'l2', title:'68th Annual NASA Convention – Preparation Phase', tag:'Event',       date:'June 16, 2026',  link:'https://nasaindia.co/' }
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const hueOf = s => { let h=0; for(let i=0;i<(s||'').length;i++) h=(h*31+s.charCodeAt(i))%360; return h; };
const initials = n => {
  if(!n) return '?';
  const p = n.trim().split(/\s+/).filter(Boolean);
  return p.length===1 ? p[0].slice(0,2).toUpperCase() : (p[0][0]+p[p.length-1][0]).toUpperCase();
};
const fmtDate = iso => { const d=new Date(iso); return isNaN(d.getTime())?iso:d.toLocaleDateString(undefined,{day:'2-digit',month:'short',year:'numeric'}); };
const fmtINR  = n => '₹' + Number(n||0).toLocaleString('en-IN');

// role → badge CSS class
const roleClass = r => ({ UD:'ud', USEC:'usec', 'EX USEC':'exusec', Coordinator:'coord' }[r] || 'member');
const rolePriority = r => ({ UD:0, USEC:1, 'EX USEC':2, Coordinator:3 }[r] ?? 10);

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;400;600;800&family=IBM+Plex+Mono:wght@400;600&display=swap');
:root{
  --bg:#07090F; --bg2:#0C1018;
  --panel:rgba(255,255,255,.04); --panel2:rgba(255,255,255,.07);
  --line:rgba(255,255,255,.09);  --line2:rgba(255,255,255,.17);
  --ink:#F2F5FF; --ink2:#A8B2CC; --ink3:#6C7793;
  --danger:#FF5C5C; --success:#00D3A7;
  --accent:#5B8CFF; --soft:rgba(91,140,255,.14);
  --green:#00D3A7;  --pink:#FF5D8F;
  --fs1:clamp(.7rem,.66rem + .2vw,.78rem);
  --fs2:clamp(.82rem,.78rem + .25vw,.92rem);
  --fs3:clamp(.96rem,.9rem + .35vw,1.08rem);
  --fs4:clamp(1.18rem,1.02rem + .8vw,1.58rem);
  --fs5:clamp(1.55rem,1.2rem + 1.9vw,2.55rem);
  --fs6:clamp(2.1rem,1.3rem + 3.5vw,4.1rem);
  --fs7:clamp(2.7rem,1.4rem + 5.5vw,5.9rem);
  --sp1:.375rem;--sp2:.75rem;--sp3:1.125rem;--sp4:1.75rem;--sp5:2.5rem;--sp6:4rem;
  --rsm:8px;--rmd:14px;--rlg:20px;--rxl:28px;
  --sat:env(safe-area-inset-top,0px); --sar:env(safe-area-inset-right,0px);
  --sab:env(safe-area-inset-bottom,0px); --sal:env(safe-area-inset-left,0px);
  --z0:0;--z10:10;--z40:40;--z50:50;--z60:60;--z80:80;--z100:100;
  --ease:cubic-bezier(.22,1,.36,1); --eio:cubic-bezier(.65,.05,.36,1);
}
*,*::before,*::after{box-sizing:border-box;}
html{-webkit-text-size-adjust:100%;}
html,body{margin:0;padding:0;}
body{background:var(--bg);color:var(--ink);font-family:'Sora',system-ui,sans-serif;font-size:var(--fs3);line-height:1.62;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
button,input,textarea,select{font:inherit;color:inherit;}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px;}

/* ── BACKGROUND ──────────────────────────────────────── */
.house{position:fixed;inset:0;z-index:var(--z0);overflow:hidden;perspective:1100px;perspective-origin:50% 42%;background:radial-gradient(120% 80% at 50% -10%,rgba(255,255,255,.04),transparent 60%),linear-gradient(180deg,var(--bg2),var(--bg));pointer-events:none;contain:strict;}
.house::after{content:'';position:absolute;inset:0;background:radial-gradient(130% 100% at 50% 50%,transparent 30%,rgba(4,6,11,.88) 100%);pointer-events:none;}
.house__scene{position:absolute;top:50%;left:50%;width:180vmax;height:180vmax;margin:calc(-90vmax) 0 0 calc(-90vmax);transform-style:preserve-3d;transition:transform 1.2s var(--ease);will-change:transform;}
.plane{position:absolute;inset:0;transform-style:preserve-3d;}
.floor{background-image:linear-gradient(rgba(91,140,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(91,140,255,.055) 1px,transparent 1px);background-size:7vmax 7vmax;transform:rotateX(90deg) translateZ(-26vmax);opacity:.8;transition:background-image 1.2s var(--ease);}
.wall{border:1px solid rgba(255,255,255,.06);background:linear-gradient(180deg,rgba(255,255,255,.025),transparent);}
.wall--back{transform:translateZ(-60vmax);}
.wall--left{transform:rotateY(90deg) translateZ(-60vmax);}
.wall--right{transform:rotateY(-90deg) translateZ(-60vmax);}
.shaft{position:absolute;left:50%;top:-10%;width:34vmax;height:150%;margin-left:-17vmax;background:linear-gradient(180deg,var(--accent),transparent 72%);opacity:.13;transform:rotateX(74deg) translateZ(-20vmax);transition:background 1.2s var(--ease);pointer-events:none;}

/* ── HUD ──────────────────────────────────────────────── */
.hud{position:fixed;z-index:var(--z40);top:calc(var(--sat) + var(--sp3));left:calc(var(--sal) + var(--sp3));display:flex;align-items:center;gap:.7rem;padding:.55rem .9rem;background:rgba(7,9,15,.8);border:1px solid var(--line);border-radius:999px;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);max-width:min(62vw,310px);}
.hud__dot{width:8px;height:8px;border-radius:50%;flex:0 0 auto;background:var(--accent);box-shadow:0 0 0 4px var(--soft);animation:pulse 2.6s ease-in-out infinite;}
@keyframes pulse{50%{transform:scale(1.5);}}
.hud__room{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.16em;text-transform:uppercase;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;}
.hud__sub{font-size:var(--fs1);color:var(--ink3);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* ── ADMIN BADGE ─────────────────────────────────────── */
.admin-toggle{position:fixed;z-index:var(--z40);top:calc(var(--sat) + var(--sp3));right:calc(var(--sar) + var(--sp3));display:flex;align-items:center;gap:.5rem;padding:.5rem .9rem;background:rgba(7,9,15,.8);border:1px solid var(--line);border-radius:999px;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .3s var(--ease);}
.admin-toggle:hover{border-color:var(--accent);}
.admin-toggle.on{background:rgba(0,211,167,.1);border-color:rgba(0,211,167,.35);color:var(--green);}

/* ── COUNTER ─────────────────────────────────────────── */
.counter{position:fixed;z-index:var(--z40);bottom:calc(var(--sab) + 6.5rem);right:calc(var(--sar) + var(--sp3));text-align:right;font-family:'IBM Plex Mono',monospace;pointer-events:none;}
@media(min-width:860px){.counter{bottom:calc(var(--sab) + var(--sp4));}}
.counter__n{font-size:var(--fs4);font-weight:600;letter-spacing:.04em;}
.counter__n span{color:var(--ink3);font-size:var(--fs2);}
.counter__bar{width:72px;height:2px;margin:.4rem 0 0 auto;background:var(--line2);border-radius:2px;overflow:hidden;}
.counter__fill{display:block;height:100%;background:var(--accent);border-radius:2px;transition:width .7s var(--ease),background .7s var(--ease);}

/* ── RAIL (desktop) ──────────────────────────────────── */
.rail{position:fixed;z-index:var(--z50);right:calc(var(--sar) + var(--sp3));top:50%;transform:translateY(-50%);display:none;flex-direction:column;gap:.4rem;padding:.55rem;background:rgba(7,9,15,.6);border:1px solid var(--line);border-radius:999px;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);}
@media(min-width:860px){.rail{display:flex;}}
.pill{position:relative;display:flex;align-items:center;gap:.6rem;min-height:40px;padding:.35rem .5rem;background:transparent;border:0;border-radius:999px;cursor:pointer;color:var(--ink3);transition:color .25s var(--ease),background .25s var(--ease);}
.pill__dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:var(--pa);opacity:.4;transition:opacity .3s var(--ease),transform .3s var(--ease);}
.pill__label{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;max-width:0;overflow:hidden;white-space:nowrap;transition:max-width .4s var(--ease),margin .4s var(--ease);margin-right:0;}
.pill:hover .pill__label,.pill:focus-visible .pill__label,.pill[aria-current=true] .pill__label{max-width:140px;margin-right:.3rem;}
.pill:hover,.pill:focus-visible{color:var(--ink);background:var(--panel);}
.pill[aria-current=true]{color:var(--ink);background:var(--panel2);}
.pill[aria-current=true] .pill__dot{opacity:1;transform:scale(1.25);}

/* ── DOCK (mobile) ───────────────────────────────────── */
.dock{position:fixed;z-index:var(--z60);left:0;right:0;bottom:0;padding:.4rem calc(var(--sal)+.4rem) calc(var(--sab)+.4rem) calc(var(--sar)+.4rem);background:linear-gradient(180deg,rgba(7,9,15,0),rgba(7,9,15,.95) 38%);}
@media(min-width:860px){.dock{display:none;}}
.dock__scroller{display:flex;gap:.35rem;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:.4rem;background:rgba(10,13,22,.9);border:1px solid var(--line);border-radius:var(--rlg);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);}
.dock__scroller::-webkit-scrollbar{display:none;}
.dock__btn{flex:0 0 auto;scroll-snap-align:center;display:grid;justify-items:center;gap:.18rem;min-width:58px;min-height:50px;padding:.3rem .45rem;background:transparent;border:0;border-radius:var(--rmd);color:var(--ink3);cursor:pointer;transition:background .25s var(--ease),color .25s var(--ease);}
.dock__glyph{display:grid;place-items:center;width:26px;height:26px;border-radius:7px;font-family:'IBM Plex Mono',monospace;font-size:.7rem;font-weight:600;background:color-mix(in srgb,var(--pa) 16%,transparent);color:var(--pa);transition:background .25s var(--ease),color .25s var(--ease);}
.dock__label{font-family:'IBM Plex Mono',monospace;font-size:.56rem;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;}
.dock__btn[aria-current=true]{background:var(--panel2);color:var(--ink);}
.dock__btn[aria-current=true] .dock__glyph{background:var(--pa);color:#06080E;}

/* ── LAYOUT ──────────────────────────────────────────── */
.scroll-root{height:100svh;overflow-y:scroll;scroll-snap-type:y mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;position:relative;z-index:var(--z10);}
.room{min-height:100svh;display:grid;align-content:start;scroll-snap-align:start;scroll-snap-stop:always;padding:calc(var(--sat)+5.5rem) calc(var(--sar)+var(--sp3)) calc(var(--sab)+6.5rem) calc(var(--sal)+var(--sp3));contain:layout style;}
@media(min-width:860px){.room{align-content:center;padding:calc(var(--sat)+var(--sp6)) calc(var(--sar)+6rem) calc(var(--sab)+var(--sp6)) calc(var(--sal)+var(--sp5));}}
.wrap{width:100%;max-width:1100px;margin:0 auto;}

/* ── TYPOGRAPHY ──────────────────────────────────────── */
.eyebrow{display:inline-flex;align-items:center;gap:.55rem;font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin:0 0 var(--sp3) 0;}
.eyebrow::before{content:'';width:22px;height:1px;background:var(--accent);}
h1,h2,h3,h4{font-weight:800;letter-spacing:-.02em;line-height:1.06;margin:0;}
h1{font-size:var(--fs7);}h2{font-size:var(--fs6);}h3{font-size:var(--fs4);letter-spacing:-.01em;}
.thin{font-weight:200;}
.lede{font-size:var(--fs4);font-weight:200;color:var(--ink2);margin:var(--sp3) 0 0 0;max-width:46ch;line-height:1.45;}
.body{color:var(--ink2);font-size:var(--fs2);line-height:1.7;margin:0;}

/* ── REVEAL ──────────────────────────────────────────── */
.reveal{opacity:0;transform:translate3d(0,34px,0);transition:opacity .75s var(--ease),transform .8s var(--ease);}
.scroll-root[data-dir=up] .reveal{transform:translate3d(0,-34px,0);}
.reveal.in{opacity:1;transform:translate3d(0,0,0);}
.reveal.d1{transition-delay:.06s;}.reveal.d2{transition-delay:.12s;}
.reveal.d3{transition-delay:.18s;}.reveal.d4{transition-delay:.24s;}

/* ── CARDS ────────────────────────────────────────────── */
.card{background:var(--panel);border:1px solid var(--line);border-radius:var(--rlg);padding:var(--sp4);transition:border-color .35s var(--ease),background .35s var(--ease);}
.card:hover{border-color:var(--line2);background:var(--panel2);}

/* ── SECTION HEADER ──────────────────────────────────── */
.sec-hdr{display:flex;flex-wrap:wrap;gap:var(--sp3);align-items:flex-end;justify-content:space-between;margin:0 0 var(--sp5) 0;}
.sec-hdr .left{min-width:0;}
.sec-hdr .right{display:flex;gap:var(--sp2);flex-wrap:wrap;align-items:center;flex-shrink:0;}

/* ── BUTTONS ──────────────────────────────────────────── */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:44px;padding:.7rem 1.35rem;border-radius:999px;border:1px solid transparent;font-size:var(--fs2);font-weight:600;cursor:pointer;text-decoration:none;line-height:1;transition:transform .2s var(--ease),background .2s var(--ease),border-color .2s var(--ease);}
.btn:active{transform:scale(.97);}
.btn-p{background:var(--accent);color:#06080E;border-color:var(--accent);}
.btn-p:hover{background:#fff;border-color:#fff;}
.btn-g{background:transparent;border-color:var(--line2);color:var(--ink);}
.btn-g:hover{background:var(--panel2);border-color:var(--accent);}
.btn-d{background:rgba(255,92,92,.12);border-color:rgba(255,92,92,.35);color:var(--danger);}
.btn-d:hover{background:rgba(255,92,92,.22);}
.btn-s{background:rgba(0,211,167,.12);border-color:rgba(0,211,167,.35);color:var(--green);}
.btn-sm{min-height:36px;padding:.42rem .85rem;font-size:var(--fs1);}
.btn-ico{min-height:34px;min-width:34px;padding:.4rem;border-radius:var(--rsm);background:var(--panel);border:1px solid var(--line);color:var(--ink2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s var(--ease);}
.btn-ico:hover{color:var(--ink);border-color:var(--line2);background:var(--panel2);}
.btn-ico-d:hover{color:var(--danger);border-color:rgba(255,92,92,.35);background:rgba(255,92,92,.1);}
.btn-row{display:flex;flex-wrap:wrap;gap:var(--sp2);margin:var(--sp4) 0 0 0;}

/* ── BENTO ───────────────────────────────────────────── */
.bento{display:grid;grid-template-columns:1fr;grid-auto-rows:minmax(90px,auto);gap:var(--sp2);margin:var(--sp5) 0 0 0;}
@media(min-width:640px){.bento{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.bento{grid-template-columns:repeat(4,1fr);gap:var(--sp3);}.bw{grid-column:span 2;}.bt{grid-row:span 2;}}
.bc{display:flex;flex-direction:column;justify-content:space-between;gap:var(--sp2);background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);padding:var(--sp3);transition:border-color .3s var(--ease),background .3s var(--ease);}
.bc:hover{border-color:var(--accent);background:var(--panel2);}
.bk{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);margin:0;}
.bv{font-size:var(--fs5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}
.bd{font-size:var(--fs2);color:var(--ink2);margin:0;}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(130px,100%),1fr));gap:var(--sp3);margin:var(--sp5) 0 0 0;}
.stat{border-left:2px solid var(--accent);padding:0 0 0 var(--sp3);}
.stat__v{font-size:var(--fs5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}
.stat__k{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin:.35rem 0 0 0;}

/* ── CREW ────────────────────────────────────────────── */
.crew-group{margin:var(--sp4) 0 0 0;}
.crew-group-label{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3);margin:0 0 var(--sp3) 0;display:flex;align-items:center;gap:.6rem;}
.crew-group-label::after{content:'';flex:1;height:1px;background:var(--line);}
.crew-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(200px,100%),1fr));gap:var(--sp3);}
.mc{display:flex;flex-direction:column;gap:var(--sp2);padding:var(--sp3);background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .3s var(--ease),background .3s var(--ease);}
.mc:hover{border-color:var(--line2);background:var(--panel2);}
.mc.council{border-color:rgba(255,209,102,.22);}
.mc.council:hover{border-color:rgba(255,209,102,.45);background:rgba(255,209,102,.04);}
.mc__top{display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;}
.mc__acts{display:flex;gap:.3rem;flex-shrink:0;}
.avatar{display:grid;place-items:center;width:52px;height:52px;border-radius:14px;font-family:'IBM Plex Mono',monospace;font-size:1.1rem;font-weight:600;color:#fff;flex-shrink:0;background:linear-gradient(145deg,hsl(var(--h) 70% 50%),hsl(calc(var(--h) + 42) 65% 35%));}
.mc__name{font-size:var(--fs3);font-weight:600;margin:0;line-height:1.25;}
.mc__meta{font-size:var(--fs1);color:var(--ink3);margin:0;}
.rbadge{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .55rem;border-radius:999px;font-family:'IBM Plex Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;font-weight:600;border:1px solid;}
.rbadge.ud    {background:rgba(255,209,102,.14);border-color:rgba(255,209,102,.3);color:#FFD166;}
.rbadge.usec  {background:rgba(0,211,167,.12);border-color:rgba(0,211,167,.3);color:#00D3A7;}
.rbadge.exusec{background:rgba(91,140,255,.12);border-color:rgba(91,140,255,.3);color:#5B8CFF;}
.rbadge.coord {background:rgba(179,136,255,.12);border-color:rgba(179,136,255,.3);color:#B388FF;}
.rbadge.member{background:var(--panel);border-color:var(--line);color:var(--ink3);}

/* ── VAULT ───────────────────────────────────────────── */
.vault-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(260px,100%),1fr));gap:var(--sp3);margin:var(--sp5) 0 0 0;}
.vc{display:flex;flex-direction:column;gap:var(--sp2);padding:var(--sp3);background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .3s var(--ease),background .3s var(--ease);}
.vc:hover{border-color:var(--accent);background:var(--panel2);}
.vc__hdr{display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;}
.vc__acts{display:flex;gap:.3rem;flex-shrink:0;}
.vc__title{font-size:var(--fs3);font-weight:600;margin:0;flex:1;min-width:0;line-height:1.3;}
.vc__desc{font-size:var(--fs2);color:var(--ink2);margin:0;flex:1;}
.vc__foot{margin-top:auto;padding-top:var(--sp2);border-top:1px solid var(--line);}

/* ── NEWS ────────────────────────────────────────────── */
.news-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(290px,100%),1fr));gap:var(--sp3);margin:var(--sp4) 0 0 0;}
.ni{display:flex;flex-direction:column;gap:var(--sp2);padding:var(--sp3);background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .3s var(--ease),background .3s var(--ease);}
.ni:hover{border-color:var(--line2);background:var(--panel2);}
.ni__hdr{display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;}
.ni__acts{display:flex;gap:.3rem;flex-shrink:0;}
.ni__meta{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;}
.tag{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;padding:.18rem .55rem;border-radius:999px;background:var(--soft);color:var(--accent);}
.ndate{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);color:var(--ink3);}
.ni__body{font-size:var(--fs2);color:var(--ink2);margin:0;line-height:1.6;flex:1;}
.ni__foot{margin-top:auto;padding-top:var(--sp2);display:flex;gap:.5rem;flex-wrap:wrap;}
.live-lbl{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3);margin:var(--sp4) 0 var(--sp3) 0;display:flex;align-items:center;gap:.5rem;}
.live-lbl::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--green);display:block;animation:pulse 2s ease-in-out infinite;flex-shrink:0;}
.live-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(270px,100%),1fr));gap:var(--sp3);}
.live-item{display:flex;flex-direction:column;gap:var(--sp2);padding:var(--sp3);background:rgba(0,211,167,.04);border:1px solid rgba(0,211,167,.2);border-radius:var(--rmd);text-decoration:none;color:inherit;transition:border-color .3s var(--ease),background .3s var(--ease);}
.live-item:hover{border-color:rgba(0,211,167,.45);background:rgba(0,211,167,.08);}
.live-tag{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;color:var(--green);padding:.18rem .55rem;border-radius:999px;background:rgba(0,211,167,.12);display:inline-block;width:fit-content;}
.live-title{font-size:var(--fs3);font-weight:600;margin:0;line-height:1.3;}
.live-date{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);color:var(--ink3);margin:0;}
.live-link{display:flex;align-items:center;gap:.3rem;font-size:var(--fs1);color:var(--green);margin-top:auto;}

/* ── TREASURY ────────────────────────────────────────── */
.fin-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(155px,100%),1fr));gap:var(--sp3);margin:var(--sp5) 0 0 0;}
.fs-card{padding:var(--sp3);background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);}
.fs-lbl{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin:0 0 .35rem 0;}
.fs-val{font-size:var(--fs5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}
.fin-list{margin:var(--sp4) 0 0 0;display:flex;flex-direction:column;gap:var(--sp2);}
.fr{display:flex;align-items:center;gap:var(--sp2);padding:var(--sp2) var(--sp3);background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .25s var(--ease);}
.fr:hover{border-color:var(--line2);}
.fr__type{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;padding:.14rem .5rem;border-radius:999px;flex-shrink:0;min-width:68px;text-align:center;border:1px solid;}
.fr__type.income {background:rgba(0,211,167,.1);border-color:rgba(0,211,167,.25);color:var(--green);}
.fr__type.expense{background:rgba(255,93,143,.1);border-color:rgba(255,93,143,.25);color:var(--pink);}
.fr__desc{flex:1;font-size:var(--fs2);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.fr__amt{font-family:'IBM Plex Mono',monospace;font-size:var(--fs3);font-weight:600;flex-shrink:0;}
.fr__amt.income {color:var(--green);}
.fr__amt.expense{color:var(--pink);}
.fr__acts{display:flex;gap:.3rem;flex-shrink:0;}

/* ── TERMINAL ────────────────────────────────────────── */
.term{display:flex;flex-direction:column;background:rgba(4,7,13,.72);border:1px solid var(--line);border-radius:var(--rlg);overflow:hidden;margin:var(--sp5) 0 0 0;}
.term__bar{display:flex;align-items:center;gap:.45rem;padding:.65rem 1rem;border-bottom:1px solid var(--line);background:rgba(255,255,255,.025);}
.term__led{width:8px;height:8px;border-radius:50%;background:var(--line2);}
.term__led.on{background:var(--accent);}
.term__lbl{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin:0 0 0 .5rem;}
.term__log{height:clamp(200px,35svh,390px);overflow-y:auto;padding:var(--sp3);margin:0;font-family:'IBM Plex Mono',monospace;font-size:var(--fs2);line-height:1.75;overflow-wrap:anywhere;scrollbar-width:thin;scrollbar-color:var(--line) transparent;}
.tl{margin:0 0 .28rem 0;}
.tl.in{color:var(--ink);}.tl.in::before{content:'> ';color:var(--accent);}
.tl.out{color:var(--ink2);}
.tl.sys{color:var(--ink3);font-style:italic;}
.term__form{display:flex;gap:.45rem;padding:var(--sp2);border-top:1px solid var(--line);background:rgba(255,255,255,.02);}
.term__form input{flex:1;min-width:0;padding:.65rem .85rem;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:var(--rsm);font-family:'IBM Plex Mono',monospace;font-size:var(--fs2);color:var(--ink);transition:border-color .25s var(--ease);}
.term__form input:focus{border-color:var(--accent);outline:none;}
.chips{display:flex;flex-wrap:wrap;gap:.45rem;margin:var(--sp3) 0 0 0;}
.chip{padding:.38rem .82rem;background:var(--panel);border:1px solid var(--line);border-radius:999px;font-size:var(--fs1);color:var(--ink2);cursor:pointer;font-family:'IBM Plex Mono',monospace;letter-spacing:.08em;transition:border-color .25s var(--ease),color .25s var(--ease);}
.chip:hover{border-color:var(--accent);color:var(--ink);}

/* ── FORMS ───────────────────────────────────────────── */
.form{display:grid;gap:var(--sp3);}
.field{display:grid;gap:.4rem;}
.field label{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.12em;text-transform:uppercase;color:var(--ink2);}
.field input,.field textarea,.field select{width:100%;margin:0;padding:.8rem 1rem;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:var(--rsm);font-size:var(--fs2);color:var(--ink);transition:border-color .25s var(--ease),background .25s var(--ease);-webkit-appearance:none;appearance:none;}
.field textarea{min-height:100px;resize:vertical;}
.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--accent);background:rgba(255,255,255,.07);outline:none;}
.field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(168,178,204,.7)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .9rem center;background-size:12px;padding-right:2.2rem;}
.g2{display:grid;gap:var(--sp3);}@media(min-width:580px){.g2{grid-template-columns:1fr 1fr;}}

/* ── MODAL ───────────────────────────────────────────── */
.modal{position:fixed;inset:0;z-index:var(--z80);display:grid;opacity:0;pointer-events:none;transition:opacity .28s var(--ease);}
.modal.open{opacity:1;pointer-events:auto;}
.modal__veil{position:absolute;inset:0;background:rgba(3,5,10,.8);border:0;padding:0;cursor:pointer;width:100%;-webkit-appearance:none;}
.modal__panel{position:relative;width:100%;background:#0C1018;border:1px solid var(--line);padding:var(--sp4);transition:transform .35s var(--ease);max-height:90svh;overflow-y:auto;overflow-x:hidden;align-self:end;border-radius:var(--rxl) var(--rxl) 0 0;transform:translateY(100%);scrollbar-width:thin;scrollbar-color:var(--line) transparent;}
.modal.open .modal__panel{transform:translateY(0);}
.modal__grip{width:40px;height:4px;border-radius:999px;background:var(--line2);margin:0 auto var(--sp3) auto;}
@media(min-width:720px){
  .modal{align-items:center;justify-items:center;padding:var(--sp4);}
  .modal__panel{max-width:540px;border-radius:var(--rxl);transform:translateY(12px) scale(.97);align-self:center;padding-bottom:var(--sp4);}
  .modal.open .modal__panel{transform:translateY(0) scale(1);}
  .modal__grip{display:none;}
}
.modal__hdr{display:flex;justify-content:space-between;align-items:center;margin:0 0 var(--sp4) 0;}
.modal__title{font-size:var(--fs4);margin:0;font-weight:700;}
.modal__body{color:var(--ink2);font-size:var(--fs2);margin:0 0 var(--sp3) 0;line-height:1.65;}
.modal__acts{display:flex;flex-wrap:wrap;gap:var(--sp2);margin:var(--sp4) 0 0 0;justify-content:flex-end;}
.divider{height:1px;background:var(--line);margin:var(--sp3) 0;}

/* ── TOAST ───────────────────────────────────────────── */
.toast{position:fixed;z-index:calc(var(--z80)+5);left:50%;bottom:calc(var(--sab)+7rem);transform:translate(-50%,160%);display:flex;align-items:center;gap:.55rem;padding:.65rem 1.1rem;background:#0C1018;border:1px solid var(--accent);border-radius:999px;font-size:var(--fs2);transition:transform .35s var(--ease);max-width:calc(100vw - 2rem);white-space:nowrap;pointer-events:none;}
.toast.show{transform:translate(-50%,0);}
@media(min-width:860px){.toast{bottom:calc(var(--sab)+var(--sp4));}}
.toast__dot{width:7px;height:7px;border-radius:50%;background:var(--accent);flex-shrink:0;}

/* ── SPLASH ──────────────────────────────────────────── */
.splash{position:fixed;inset:0;z-index:var(--z100);display:grid;place-items:center;background:var(--bg);transition:opacity .8s var(--ease),visibility .8s;}
.splash.done{opacity:0;visibility:hidden;pointer-events:none;}
.splash__inner{display:grid;justify-items:center;gap:var(--sp3);padding:var(--sp4);text-align:center;}
.splash__mark{width:min(150px,40vw);height:auto;}
.splash__ring{fill:none;stroke:var(--accent);stroke-width:2;opacity:.9;stroke-dasharray:302;stroke-dashoffset:302;animation:draw 1.5s var(--eio) forwards;}
.splash__orbit{fill:none;stroke:#fff;stroke-width:1.4;opacity:.55;stroke-dasharray:260;stroke-dashoffset:260;animation:draw 1.6s .26s var(--eio) forwards;}
.splash__star{fill:#fff;opacity:0;animation:fadein .7s .9s var(--ease) forwards;}
@keyframes draw{to{stroke-dashoffset:0;}}@keyframes fadein{to{opacity:1;}}
.splash__word{font-family:'IBM Plex Mono',monospace;font-size:var(--fs2);letter-spacing:.4em;text-transform:uppercase;color:var(--ink2);margin:0;opacity:0;animation:rise .8s 1s var(--ease) forwards;}
.splash__sub{font-size:var(--fs1);color:var(--ink3);margin:0;letter-spacing:.14em;font-family:'IBM Plex Mono',monospace;text-transform:uppercase;opacity:0;animation:rise .8s 1.2s var(--ease) forwards;}
@keyframes rise{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
.splash__bar{width:min(220px,60vw);height:2px;background:var(--line2);border-radius:2px;overflow:hidden;margin:var(--sp2) 0 0 0;}
.splash__bar span{display:block;height:100%;width:0;background:var(--accent);animation:load 2s .2s var(--eio) forwards;}
@keyframes load{to{width:100%;}}
.splash__skip{margin:var(--sp3) 0 0 0;background:transparent;border:1px solid var(--line2);color:var(--ink3);border-radius:999px;min-height:44px;padding:.5rem 1.2rem;font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:color .25s var(--ease),border-color .25s var(--ease);}
.splash__skip:hover{color:var(--ink);border-color:var(--accent);}
.empty{text-align:center;padding:var(--sp5) var(--sp4);border:1px dashed var(--line2);border-radius:var(--rlg);color:var(--ink3);font-size:var(--fs2);}
.foot{border-top:1px solid var(--line);margin:var(--sp6) 0 0 0;padding:var(--sp3) 0 0 0;display:flex;flex-wrap:wrap;gap:var(--sp2);justify-content:space-between;font-size:var(--fs1);color:var(--ink3);font-family:'IBM Plex Mono',monospace;letter-spacing:.08em;}
::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:var(--line2);border-radius:99px;}
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {

  // ── NAV / UI ──────────────────────────────────────────────────────────────
  const [activeIdx, setActiveIdx]   = useState(0);
  const [scrollDir, setScrollDir]   = useState('down');
  const [splashDone, setSplashDone] = useState(false);
  const [isAdmin, setIsAdmin]       = useState(false);
  const [toast, setToast]           = useState('');
  const [modal, setModal]           = useState({ type: null, data: null, open: false });
  const [form, setForm]             = useState({});

  // ── DATA ──────────────────────────────────────────────────────────────────
  const [crew,     setCrew]     = useState(SEED.crew);
  const [vault,    setVault]    = useState(SEED.vault);
  const [finances, setFinances] = useState(SEED.finances);
  const [news,     setNews]     = useState(SEED.news);
  const [quote]                 = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  // ── TERMINAL ──────────────────────────────────────────────────────────────
  const [logs,    setLogs]    = useState([
    { k:'sys', t:'rsa-ai://z649-secure — connected to NASA India telemetry.' },
    { k:'sys', t:'Type "help" for available commands.' }
  ]);
  const [termIn, setTermIn] = useState('');

  // ── REFS ──────────────────────────────────────────────────────────────────
  const scrollRef  = useRef(null);
  const termLogRef = useRef(null);
  const lastIdx    = useRef(0);

  const room = ROOMS[activeIdx] || ROOMS[0];

  // ── EFFECTS ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const unsubs = [
      onSnapshot(collection(db,'crew'),     s => { if(!s.empty) setCrew(s.docs.map(d=>({id:d.id,...d.data()}))); }),
      onSnapshot(collection(db,'vault'),    s => { if(!s.empty) setVault(s.docs.map(d=>({id:d.id,...d.data()}))); }),
      onSnapshot(collection(db,'finances'), s => { if(!s.empty) setFinances(s.docs.map(d=>({id:d.id,...d.data()}))); }),
      onSnapshot(collection(db,'news'),     s => { if(!s.empty) setNews(s.docs.map(d=>({id:d.id,...d.data()}))); })
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  // Reveal observer — runs once and resets when data loads
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    const els = document.querySelectorAll('.reveal:not(.in)');
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [crew, vault, finances, news]);

  // Scroll tracking
  useEffect(() => {
    const el = scrollRef.current;
    if(!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight);
      if(idx !== lastIdx.current) {
        setScrollDir(idx > lastIdx.current ? 'down' : 'up');
        lastIdx.current = idx;
        setActiveIdx(idx);
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if(termLogRef.current) termLogRef.current.scrollTop = termLogRef.current.scrollHeight;
  }, [logs]);

  // ── HELPERS ───────────────────────────────────────────────────────────────
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const navTo = id => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };

  const toggleAdmin = () => {
    if(isAdmin) { setIsAdmin(false); showToast('Admin mode off.'); return; }
    const p = prompt('Enter access key:');
    if(p === ADMIN_KEY) { setIsAdmin(true); showToast('Admin mode on.'); }
    else if(p !== null) alert('Incorrect password.');
  };

  const openModal = (type, data = null) => {
    setForm(data ? { ...data } : {});
    setModal({ type, data, open: true });
  };

  const closeModal = () => setModal({ type: null, data: null, open: false });

  const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // ── FIREBASE CRUD ─────────────────────────────────────────────────────────
  const saveDoc = async (col, data) => {
    try {
      const { id, ...rest } = data;
      if(id && !id.startsWith('_seed')) {
        await updateDoc(doc(db, col, id), { ...rest, updated: Date.now() });
      } else {
        await addDoc(collection(db, col), { ...rest, timestamp: Date.now() });
      }
      showToast('Saved successfully.');
      closeModal();
    } catch(e) { showToast('Save failed — check connection.'); }
  };

  const delDoc = async (col, id, label) => {
    if(!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      if(!id.startsWith('_seed')) await deleteDoc(doc(db, col, id));
      // Also remove from local state for instant UI feedback
      const map = { crew:setCrew, vault:setVault, finances:setFinances, news:setNews };
      map[col]?.(p => p.filter(x => x.id !== id));
      showToast('Deleted.');
    } catch(e) { showToast('Delete failed.'); }
  };

  const openLink = link => {
    if(!link?.trim()) { showToast('No link attached.'); return; }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // ── TERMINAL ──────────────────────────────────────────────────────────────
  const handleTerm = e => {
    e.preventDefault();
    const q = termIn.trim();
    if(!q) return;
    setLogs(p => [...p, { k:'in', t: q }]);
    setTermIn('');

    setTimeout(() => {
      const k = q.toLowerCase();
      const income  = finances.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
      const expense = finances.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
      let r = 'No match. Try: help · trophies · msl · balance · crew · news · clear';

      if(/^help$/.test(k))           r = 'Commands: trophies · msl · crew · news · balance · clear. Ask anything in English.';
      else if(/^clear$/.test(k))     { setLogs([]); return; }
      else if(/trophy|kahn|lik/.test(k)) r = 'LIK Trophy: heritage documentation competition. Focus on unrecorded vernacular buildings—spatial configuration, structural logic, cultural significance.';
      else if(/msl|landscape|velach/.test(k)) r = 'MSL Trophy: Velachery site. Concept: Hydro-Social Connector as a biological machine managing urban flooding. Ensure bio-swale metrics are graded in CAD.';
      else if(/crew|team|who|member/.test(k)) r = `Unit crew (${crew.length}): ${crew.map(c=>c.name).join(' · ')}`;
      else if(/news|update/.test(k)) r = news.length ? `Latest: "${news[0].title}" — ${fmtDate(news[0].date)}` : 'No unit news posted yet.';
      else if(/balance|money|fund|treasury/.test(k)) r = `Treasury: Income ${fmtINR(income)} | Expenses ${fmtINR(expense)} | Net ${fmtINR(income-expense)}`;
      else if(/nasa|convention|anc/.test(k)) r = '68th Annual NASA Convention: active preparation phase. Delegates should review workshop guides in News section.';
      else if(/join|apply/.test(k))  r = 'Go to the Register section to submit your application to Unit Z649.';

      setLogs(p => [...p, { k:'out', t: r }]);
    }, 180);
  };

  // ── MODAL CONTENT ─────────────────────────────────────────────────────────
  const renderModalContent = () => {
    const T = modal.type;

    // ── VIEW NEWS ──
    if(T === 'view-news') return (
      <>
        <div className="modal__hdr">
          <span className="tag">{modal.data?.tag}</span>
          <button className="btn-ico" onClick={closeModal} aria-label="Close"><X size={18}/></button>
        </div>
        <h3 style={{ marginBottom:'var(--sp3)', lineHeight:1.2 }}>{modal.data?.title}</h3>
        <p style={{ color:'var(--ink2)', fontSize:'var(--fs3)', lineHeight:1.7 }}>{modal.data?.body}</p>
        <p style={{ marginTop:'var(--sp3)', fontFamily:'IBM Plex Mono,monospace', fontSize:'var(--fs1)', color:'var(--ink3)' }}>{fmtDate(modal.data?.date)}</p>
      </>
    );

    // ── VIEW CREW ──
    if(T === 'view-crew') return (
      <>
        <div className="modal__hdr">
          <h3 className="modal__title">Member Profile</h3>
          <button className="btn-ico" onClick={closeModal} aria-label="Close"><X size={18}/></button>
        </div>
        <div style={{ display:'flex', gap:'var(--sp3)', alignItems:'flex-start', marginBottom:'var(--sp4)', flexWrap:'wrap' }}>
          <div className="avatar" style={{ '--h': hueOf(modal.data?.name), width:64, height:64, borderRadius:18, fontSize:'1.25rem' }}>
            {initials(modal.data?.name)}
          </div>
          <div style={{ flex:1 }}>
            <h3 style={{ marginBottom:'var(--sp2)' }}>{modal.data?.name}</h3>
            <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap' }}>
              <span className={`rbadge ${roleClass(modal.data?.role)}`}>{modal.data?.role}</span>
              {modal.data?.coordinatorType && <span className="rbadge coord">{modal.data.coordinatorType}</span>}
              {modal.data?.year && <span style={{ fontFamily:'IBM Plex Mono,monospace', fontSize:'var(--fs1)', color:'var(--ink3)' }}>Year {modal.data.year}</span>}
            </div>
          </div>
        </div>
        <div className="divider"/>
        {modal.data?.email && (
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'var(--sp2) 0', borderBottom:'1px solid var(--line)' }}>
            <span style={{ color:'var(--ink2)', fontSize:'var(--fs2)' }}>{modal.data.email}</span>
            <a href={`mailto:${modal.data.email}`} className="btn btn-g btn-sm"><Mail size={13}/> Email</a>
          </div>
        )}
        {modal.data?.phone && (
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'var(--sp2) 0', borderBottom:'1px solid var(--line)' }}>
            <span style={{ color:'var(--ink2)', fontSize:'var(--fs2)' }}>{modal.data.phone}</span>
            <a href={`tel:${modal.data.phone}`} className="btn btn-g btn-sm"><Phone size={13}/> Call</a>
          </div>
        )}
        {isAdmin && (
          <div className="modal__acts">
            <button className="btn btn-g btn-sm" onClick={() => { closeModal(); openModal('edit-crew', modal.data); }}><Pencil size={13}/> Edit</button>
            <button className="btn btn-d btn-sm" onClick={() => { delDoc('crew', modal.data.id, modal.data.name); closeModal(); }}><Trash2 size={13}/> Delete</button>
          </div>
        )}
      </>
    );

    // ── ADD / EDIT CREW ──
    if(T === 'add-crew' || T === 'edit-crew') return (
      <>
        <div className="modal__hdr">
          <h3 className="modal__title">{T==='add-crew' ? 'Register Member' : 'Edit Member'}</h3>
          <button className="btn-ico" onClick={closeModal} aria-label="Close"><X size={18}/></button>
        </div>
        <form className="form" onSubmit={e => { e.preventDefault(); saveDoc('crew', form); }}>
          <div className="g2">
            <div className="field"><label>Full Name *</label><input required value={form.name||''} onChange={e=>setF('name',e.target.value)} placeholder="e.g. Rithvik M"/></div>
            <div className="field">
              <label>Academic Year</label>
              <select value={form.year||'1'} onChange={e=>setF('year',e.target.value)}>
                {['1','2','3','4','5'].map(y=><option key={y} value={y}>Year {y}</option>)}
                <option value="Alumni">Alumni</option>
              </select>
            </div>
          </div>
          <div className="g2">
            <div className="field">
              <label>Role *</label>
              <select required value={form.role||'Member'} onChange={e=>setF('role',e.target.value)}>
                <option value="Member">Student Member</option>
                {isAdmin && <>
                  <option value="UD">Unit Designee (UD)</option>
                  <option value="USEC">Unit Secretary (USEC)</option>
                  <option value="EX USEC">Ex-Unit Secretary</option>
                  <option value="Coordinator">Coordinator</option>
                </>}
              </select>
            </div>
            {form.role === 'Coordinator' && (
              <div className="field"><label>Department / Type *</label><input required value={form.coordinatorType||''} onChange={e=>setF('coordinatorType',e.target.value)} placeholder="e.g. Design, Events, Media"/></div>
            )}
          </div>
          <div className="field"><label>Email</label><input type="email" value={form.email||''} onChange={e=>setF('email',e.target.value)} placeholder="student@college.edu"/></div>
          <div className="field"><label>Phone</label><input type="tel" value={form.phone||''} onChange={e=>setF('phone',e.target.value)} placeholder="+91 XXXXX XXXXX"/></div>
          <div className="modal__acts">
            <button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-p btn-sm">Save Member</button>
          </div>
        </form>
      </>
    );

    // ── ADD / EDIT NEWS ──
    if(T === 'add-news' || T === 'edit-news') return (
      <>
        <div className="modal__hdr">
          <h3 className="modal__title">{T==='add-news' ? 'New Broadcast' : 'Edit Broadcast'}</h3>
          <button className="btn-ico" onClick={closeModal} aria-label="Close"><X size={18}/></button>
        </div>
        <form className="form" onSubmit={e => { e.preventDefault(); saveDoc('news', form); }}>
          <div className="field"><label>Headline *</label><input required value={form.title||''} onChange={e=>setF('title',e.target.value)} placeholder="News headline"/></div>
          <div className="g2">
            <div className="field">
              <label>Category Tag</label>
              <select value={form.tag||'Official'} onChange={e=>setF('tag',e.target.value)}>
                <option>Official</option><option>Deadline</option><option>Meeting</option><option>Alert</option><option>Event</option>
              </select>
            </div>
            <div className="field"><label>Date</label><input type="date" value={form.date||new Date().toISOString().slice(0,10)} onChange={e=>setF('date',e.target.value)}/></div>
          </div>
          <div className="field"><label>Body *</label><textarea required value={form.body||''} onChange={e=>setF('body',e.target.value)} placeholder="Full news content..."/></div>
          <div className="modal__acts">
            <button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-p btn-sm">Publish</button>
          </div>
        </form>
      </>
    );

    // ── ADD / EDIT VAULT ──
    if(T === 'add-vault' || T === 'edit-vault') return (
      <>
        <div className="modal__hdr">
          <h3 className="modal__title">{T==='add-vault' ? 'Add File' : 'Edit File'}</h3>
          <button className="btn-ico" onClick={closeModal} aria-label="Close"><X size={18}/></button>
        </div>
        <form className="form" onSubmit={e => { e.preventDefault(); saveDoc('vault', form); }}>
          <div className="field"><label>Title *</label><input required value={form.title||''} onChange={e=>setF('title',e.target.value)} placeholder="Document or file name"/></div>
          <div className="field">
            <label>Category</label>
            <select value={form.category||'Programs'} onChange={e=>setF('category',e.target.value)}>
              {['Trophies','Programs','Events','Meetings','Other'].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field"><label>Link / URL *</label><input required type="url" value={form.link||''} onChange={e=>setF('link',e.target.value)} placeholder="https://drive.google.com/..."/></div>
          <div className="field"><label>Description</label><textarea value={form.description||''} onChange={e=>setF('description',e.target.value)} placeholder="Brief description of the file content..."/></div>
          <div className="modal__acts">
            <button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-p btn-sm">Save File</button>
          </div>
        </form>
      </>
    );

    // ── ADD / EDIT FINANCE ──
    if(T === 'add-finance' || T === 'edit-finance') return (
      <>
        <div className="modal__hdr">
          <h3 className="modal__title">{T==='add-finance' ? 'Add Transaction' : 'Edit Transaction'}</h3>
          <button className="btn-ico" onClick={closeModal} aria-label="Close"><X size={18}/></button>
        </div>
        <form className="form" onSubmit={e => { e.preventDefault(); saveDoc('finances', { ...form, amount: Number(form.amount) }); }}>
          <div className="field">
            <label>Type</label>
            <select value={form.type||'income'} onChange={e=>setF('type',e.target.value)}>
              <option value="income">Income (+)</option>
              <option value="expense">Expense (−)</option>
            </select>
          </div>
          <div className="field"><label>Description *</label><input required value={form.description||''} onChange={e=>setF('description',e.target.value)} placeholder="What was this for?"/></div>
          <div className="field"><label>Amount (₹) *</label><input required type="number" min="1" value={form.amount||''} onChange={e=>setF('amount',e.target.value)} placeholder="0"/></div>
          <div className="modal__acts">
            <button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-p btn-sm">Save</button>
          </div>
        </form>
      </>
    );

    return null;
  };

  // ── SECTION: DASHBOARD ────────────────────────────────────────────────────
  const renderDash = () => {
    const income  = finances.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const expense = finances.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    return (
      <div className="wrap">
        <p className="eyebrow reveal">Rajalakshmi School of Architecture · Zone 6</p>
        <h1 className="reveal d1">Unit Z649. <span className="thin">Command.</span></h1>
        <p className="lede reveal d2">National Association of Students of Architecture, India. Official operations, submissions, and command portal for Unit Z649.</p>
        <div className="btn-row reveal d3">
          <button className="btn btn-p" onClick={()=>navTo('vault')}>Access Vault</button>
          <button className="btn btn-g" onClick={()=>navTo('crew')}>View Directory</button>
        </div>
        <div className="bento reveal d4">
          <div className="bc bw bt">
            <p className="bk">Philosophy</p>
            <p style={{ fontSize:'clamp(1.1rem,2.5vw,1.5rem)', fontWeight:200, fontStyle:'italic', lineHeight:1.5, color:'var(--ink2)', margin:0 }}>{quote}</p>
          </div>
          <div className="bc"><p className="bk">Members</p><p className="bv">{crew.length}</p></div>
          <div className="bc"><p className="bk">Vault Files</p><p className="bv">{vault.length}</p></div>
          <div className="bc bw"><p className="bk">Net Balance</p><p className="bv" style={{ color: income-expense >= 0 ? 'var(--green)' : 'var(--pink)' }}>{fmtINR(income-expense)}</p></div>
          <div className="bc"><p className="bk">Zone</p><p className="bv">06</p></div>
          <div className="bc"><p className="bk">ANC</p><p className="bv">68th</p><p className="bd">Prep Phase</p></div>
        </div>
      </div>
    );
  };

  // ── SECTION: EXECUTIVE COUNCIL ────────────────────────────────────────────
  const renderHQ = () => (
    <div className="wrap">
      <div className="sec-hdr">
        <div className="left">
          <p className="eyebrow reveal">Administration</p>
          <h2 className="reveal d1">Executive <span className="thin">Core</span></h2>
        </div>
        {isAdmin && (
          <div className="right reveal d2">
            <button className="btn btn-p btn-sm" onClick={()=>openModal('add-crew', {role:'UD'})}><Plus size={14}/> Add Executive</button>
          </div>
        )}
      </div>
      <div className="stats reveal d3">
        <div className="stat"><p className="stat__v">Z649</p><p className="stat__k">Unit Code</p></div>
        <div className="stat"><p className="stat__v">06</p><p className="stat__k">Zone</p></div>
        <div className="stat"><p className="stat__v">RSA</p><p className="stat__k">Institution</p></div>
        <div className="stat"><p className="stat__v">100%</p><p className="stat__k">Student-run</p></div>
      </div>
      <div className="crew-group reveal d4">
        <p className="crew-group-label">Leadership</p>
        <div className="crew-grid">
          {crew.filter(c=>['UD','USEC','EX USEC'].includes(c.role)).sort((a,b)=>rolePriority(a.role)-rolePriority(b.role)).map(m=>(
            <div key={m.id} className="mc council" style={{ cursor:'pointer' }} onClick={()=>openModal('view-crew', m)}>
              <div className="mc__top">
                <span className={`rbadge ${roleClass(m.role)}`}>{m.role}</span>
                {isAdmin && <div className="mc__acts" onClick={e=>e.stopPropagation()}>
                  <button className="btn-ico" onClick={()=>openModal('edit-crew',m)} title="Edit"><Pencil size={13}/></button>
                  <button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)} title="Delete"><Trash2 size={13}/></button>
                </div>}
              </div>
              <div className="avatar" style={{ '--h': hueOf(m.name) }}>{initials(m.name)}</div>
              <p className="mc__name">{m.name}</p>
              <p className="mc__meta">Year {m.year} · <span style={{ color:'var(--ink3)' }}>{m.email}</span></p>
            </div>
          ))}
        </div>
      </div>
      <div className="crew-group reveal d4">
        <p className="crew-group-label">Coordinators</p>
        <div className="crew-grid">
          {crew.filter(c=>c.role==='Coordinator').map(m=>(
            <div key={m.id} className="mc" style={{ cursor:'pointer' }} onClick={()=>openModal('view-crew', m)}>
              <div className="mc__top">
                <span className="rbadge coord">{m.coordinatorType || 'Coord.'}</span>
                {isAdmin && <div className="mc__acts" onClick={e=>e.stopPropagation()}>
                  <button className="btn-ico" onClick={()=>openModal('edit-crew',m)} title="Edit"><Pencil size={13}/></button>
                  <button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)} title="Delete"><Trash2 size={13}/></button>
                </div>}
              </div>
              <div className="avatar" style={{ '--h': hueOf(m.name) }}>{initials(m.name)}</div>
              <p className="mc__name">{m.name}</p>
              <p className="mc__meta">{m.coordinatorType} Coordinator · Year {m.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── SECTION: VAULT ────────────────────────────────────────────────────────
  const renderVault = () => (
    <div className="wrap">
      <div className="sec-hdr">
        <div className="left">
          <p className="eyebrow reveal">Secure Storage</p>
          <h2 className="reveal d1">Active <span className="thin">Works</span></h2>
        </div>
        {isAdmin && (
          <div className="right reveal d2">
            <button className="btn btn-p btn-sm" onClick={()=>openModal('add-vault')}><Plus size={14}/> Add File</button>
          </div>
        )}
      </div>
      <div className="vault-grid reveal d3">
        {vault.length === 0 && <div className="empty">No vault files yet. Add your first file above.</div>}
        {vault.map(v => (
          <div key={v.id} className="vc">
            <div className="vc__hdr">
              <span className="tag" style={{ flexShrink:0 }}>{v.category}</span>
              {isAdmin && (
                <div className="vc__acts">
                  <button className="btn-ico" onClick={()=>openModal('edit-vault', v)} title="Edit"><Pencil size={13}/></button>
                  <button className="btn-ico btn-ico-d" onClick={()=>delDoc('vault', v.id, v.title)} title="Delete"><Trash2 size={13}/></button>
                </div>
              )}
            </div>
            <p className="vc__title">{v.title}</p>
            {v.description && <p className="vc__desc">{v.description}</p>}
            <div className="vc__foot">
              <button
                className="btn btn-g btn-sm"
                style={{ width:'100%' }}
                onClick={() => openLink(v.link)}
              >
                <ArrowUpRight size={14}/> Open File
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── SECTION: CREW / PERSONNEL ─────────────────────────────────────────────
  const renderCrew = () => {
    const YEARS = ['1','2','3','4','5','Alumni'];
    return (
      <div className="wrap">
        <div className="sec-hdr">
          <div className="left">
            <p className="eyebrow reveal">Unit Directory</p>
            <h2 className="reveal d1">The <span className="thin">Personnel</span></h2>
          </div>
          <div className="right reveal d2">
            <button className="btn btn-p btn-sm" onClick={()=>openModal('add-crew')}><Plus size={14}/> Register</button>
          </div>
        </div>

        {/* Council members */}
        {crew.filter(c=>['UD','USEC','EX USEC'].includes(c.role)).length > 0 && (
          <div className="crew-group reveal d3">
            <p className="crew-group-label">Council</p>
            <div className="crew-grid">
              {crew.filter(c=>['UD','USEC','EX USEC'].includes(c.role)).sort((a,b)=>rolePriority(a.role)-rolePriority(b.role)).map(m=>(
                <div key={m.id} className="mc council" style={{ cursor:'pointer' }} onClick={()=>openModal('view-crew',m)}>
                  <div className="mc__top">
                    <span className={`rbadge ${roleClass(m.role)}`}>{m.role}</span>
                    {isAdmin && <div className="mc__acts" onClick={e=>e.stopPropagation()}>
                      <button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button>
                      <button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button>
                    </div>}
                  </div>
                  <div className="avatar" style={{ '--h': hueOf(m.name) }}>{initials(m.name)}</div>
                  <p className="mc__name">{m.name}</p>
                  <p className="mc__meta">Year {m.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coordinators */}
        {crew.filter(c=>c.role==='Coordinator').length > 0 && (
          <div className="crew-group reveal d3">
            <p className="crew-group-label">Coordinators</p>
            <div className="crew-grid">
              {crew.filter(c=>c.role==='Coordinator').map(m=>(
                <div key={m.id} className="mc" style={{ cursor:'pointer' }} onClick={()=>openModal('view-crew',m)}>
                  <div className="mc__top">
                    <span className="rbadge coord">{m.coordinatorType || 'Coordinator'}</span>
                    {isAdmin && <div className="mc__acts" onClick={e=>e.stopPropagation()}>
                      <button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button>
                      <button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button>
                    </div>}
                  </div>
                  <div className="avatar" style={{ '--h': hueOf(m.name) }}>{initials(m.name)}</div>
                  <p className="mc__name">{m.name}</p>
                  <p className="mc__meta">{m.coordinatorType} Coord. · Year {m.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members by year */}
        {YEARS.map(yr => {
          const grp = crew.filter(c=>c.role==='Member' && (c.year||'1')===yr);
          if(!grp.length) return null;
          return (
            <div key={yr} className="crew-group reveal d4">
              <p className="crew-group-label">{yr==='Alumni'?'Alumni':`Year ${yr}`}</p>
              <div className="crew-grid">
                {grp.map(m=>(
                  <div key={m.id} className="mc" style={{ cursor:'pointer' }} onClick={()=>openModal('view-crew',m)}>
                    <div className="mc__top">
                      <span className="rbadge member">Member</span>
                      {isAdmin && <div className="mc__acts" onClick={e=>e.stopPropagation()}>
                        <button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button>
                        <button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button>
                      </div>}
                    </div>
                    <div className="avatar" style={{ '--h': hueOf(m.name) }}>{initials(m.name)}</div>
                    <p className="mc__name">{m.name}</p>
                    <p className="mc__meta">{m.email || 'No email'}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {crew.length === 0 && <div className="empty reveal d3">No crew registered yet. Add your first member above.</div>}
      </div>
    );
  };

  // ── SECTION: NEWS ─────────────────────────────────────────────────────────
  const renderNews = () => (
    <div className="wrap">
      <div className="sec-hdr">
        <div className="left">
          <p className="eyebrow reveal">Communications</p>
          <h2 className="reveal d1">Unit <span className="thin">Broadcasts</span></h2>
        </div>
        {isAdmin && (
          <div className="right reveal d2">
            <button className="btn btn-p btn-sm" onClick={()=>openModal('add-news')}><Plus size={14}/> New Broadcast</button>
          </div>
        )}
      </div>

      {/* Unit news */}
      <div className="news-grid reveal d3">
        {news.length===0 && <div className="empty">No unit broadcasts yet.</div>}
        {[...news].sort((a,b)=>(b.timestamp||0)-(a.timestamp||0)).map(n=>(
          <div key={n.id} className="ni">
            <div className="ni__hdr">
              <div className="ni__meta"><span className="tag">{n.tag}</span><span className="ndate">{fmtDate(n.date)}</span></div>
              {isAdmin && <div className="ni__acts">
                <button className="btn-ico" onClick={()=>openModal('edit-news',n)} title="Edit"><Pencil size={13}/></button>
                <button className="btn-ico btn-ico-d" onClick={()=>delDoc('news',n.id,n.title)} title="Delete"><Trash2 size={13}/></button>
              </div>}
            </div>
            <h3 style={{ fontSize:'var(--fs4)', fontWeight:600, margin:0, lineHeight:1.2 }}>{n.title}</h3>
            <p className="ni__body">{n.body?.substring(0,120)}{n.body?.length>120?'…':''}</p>
            <div className="ni__foot">
              <button className="btn btn-g btn-sm" onClick={()=>openModal('view-news',n)}><BookOpen size={13}/> Read Full</button>
            </div>
          </div>
        ))}
      </div>

      {/* Live NASA Feed */}
      <p className="live-lbl reveal d3">Live NASA India Feed</p>
      <div className="live-grid reveal d4">
        {NASA_FEED.map(n=>(
          <a key={n.id} className="live-item" href={n.link} target="_blank" rel="noopener noreferrer">
            <span className="live-tag">{n.tag}</span>
            <p className="live-title">{n.title}</p>
            <p className="live-date">{n.date}</p>
            <span className="live-link"><ArrowUpRight size={13}/> Visit NASA Portal</span>
          </a>
        ))}
      </div>
    </div>
  );

  // ── SECTION: RSA AI ───────────────────────────────────────────────────────
  const renderAI = () => (
    <div className="wrap">
      <p className="eyebrow reveal">Intelligence Core</p>
      <h2 className="reveal d1">Ask <span className="thin">the AI</span></h2>
      <p className="lede reveal d2">Advanced architectural co-pilot connected to Unit Z649 archives and NASA India telemetry.</p>
      <div className="term reveal d3">
        <div className="term__bar">
          <span className="term__led on"/><span className="term__led"/><span className="term__led"/>
          <p className="term__lbl">rsa-ai://z649-secure</p>
        </div>
        <div className="term__log" ref={termLogRef}>
          {logs.map((l,i)=><p key={i} className={`tl ${l.k}`}>{l.t}</p>)}
        </div>
        <form className="term__form" onSubmit={handleTerm}>
          <input value={termIn} onChange={e=>setTermIn(e.target.value)} placeholder="Query architecture data or ask anything…"/>
          <button type="submit" className="btn btn-p btn-sm">Send</button>
        </form>
      </div>
      <div className="chips reveal d4">
        {['help','trophies','msl landscape','balance','crew','news','clear'].map(cmd=>(
          <button key={cmd} className="chip" onClick={()=>setTermIn(cmd)}>{cmd}</button>
        ))}
      </div>
    </div>
  );

  // ── SECTION: TREASURY ─────────────────────────────────────────────────────
  const renderTreasury = () => {
    const income  = finances.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const expense = finances.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    const net = income - expense;
    return (
      <div className="wrap">
        <div className="sec-hdr">
          <div className="left">
            <p className="eyebrow reveal">Financial Tracking</p>
            <h2 className="reveal d1">Unit <span className="thin">Treasury</span></h2>
          </div>
          {isAdmin && (
            <div className="right reveal d2">
              <button className="btn btn-p btn-sm" onClick={()=>openModal('add-finance', {type:'income'})}><Plus size={14}/> Add Entry</button>
            </div>
          )}
        </div>
        <div className="fin-summary reveal d3">
          <div className="fs-card"><p className="fs-lbl">Income</p><p className="fs-val" style={{ color:'var(--green)' }}>{fmtINR(income)}</p></div>
          <div className="fs-card"><p className="fs-lbl">Expenses</p><p className="fs-val" style={{ color:'var(--pink)' }}>{fmtINR(expense)}</p></div>
          <div className="fs-card"><p className="fs-lbl">Net Balance</p><p className="fs-val" style={{ color: net>=0?'var(--green)':'var(--pink)' }}>{fmtINR(net)}</p></div>
        </div>
        <div className="fin-list reveal d4">
          {finances.length === 0 && <div className="empty">No financial records yet.</div>}
          {finances.map(f=>(
            <div key={f.id} className="fr">
              <span className={`fr__type ${f.type}`}>{f.type}</span>
              <span className="fr__desc">{f.description}</span>
              <span className={`fr__amt ${f.type}`}>{f.type==='income'?'+':'−'}{fmtINR(f.amount)}</span>
              {isAdmin && (
                <div className="fr__acts">
                  <button className="btn-ico" onClick={()=>openModal('edit-finance',f)} title="Edit"><Pencil size={13}/></button>
                  <button className="btn-ico btn-ico-d" onClick={()=>delDoc('finances',f.id,f.description)} title="Delete"><Trash2 size={13}/></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── SECTION: REGISTER ─────────────────────────────────────────────────────
  const renderRegister = () => (
    <div className="wrap">
      <p className="eyebrow reveal">Open Registration</p>
      <h2 className="reveal d1">Join <span className="thin">Unit Z649</span></h2>
      <p className="lede reveal d2">Register your profile to access unit directories, submission vaults, and active project tracking.</p>
      <form
        className="form reg-form reveal d3"
        onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.target);
          openModal('add-crew', {
            name: fd.get('name'),
            email: fd.get('email'),
            phone: fd.get('phone'),
            year: fd.get('year'),
            role: 'Member'
          });
          e.target.reset();
        }}
      >
        <div className="g2">
          <div className="field"><label htmlFor="rName">Full Name *</label><input id="rName" name="name" required placeholder="Your full name"/></div>
          <div className="field"><label htmlFor="rEmail">Email *</label><input id="rEmail" name="email" type="email" required placeholder="student@college.edu"/></div>
        </div>
        <div className="g2">
          <div className="field"><label htmlFor="rPhone">Phone</label><input id="rPhone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX"/></div>
          <div className="field">
            <label htmlFor="rYear">Year of Study</label>
            <select id="rYear" name="year">
              <option value="1">1st Year</option><option value="2">2nd Year</option>
              <option value="3">3rd Year</option><option value="4">4th Year</option><option value="5">5th Year</option>
            </select>
          </div>
        </div>
        <div className="btn-row" style={{ margin:0, marginTop:'var(--sp4)' }}>
          <button type="submit" className="btn btn-p">Submit Registration</button>
          <button type="button" className="btn btn-g" onClick={toggleAdmin}>
            {isAdmin ? <><Unlock size={15}/> Admin: ON</> : <><Lock size={15}/> Admin Login</>}
          </button>
        </div>
      </form>
      <div className="foot reveal d4">
        <span>Rajalakshmi School of Architecture · Unit Z649</span>
        <span>z649@nasaindia.co.in</span>
      </div>
    </div>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  const sections = [renderDash, renderHQ, renderVault, renderCrew, renderNews, renderAI, renderTreasury, renderRegister];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ '--accent': room.accent, '--soft': `rgba(${room.accent.slice(1).match(/../g).map(h=>parseInt(h,16)).join(',')}, .14)` }}>

        {/* ── BACKGROUND ── */}
        <div className="house" aria-hidden="true">
          <div className="house__scene" style={{ transform: room.cam }}>
            <div className="plane floor"/>
            <div className="plane wall wall--back"/>
            <div className="plane wall wall--left"/>
            <div className="plane wall wall--right"/>
            <div className="shaft" style={{ background:`linear-gradient(180deg,${room.accent},transparent 72%)` }}/>
          </div>
        </div>

        {/* ── SPLASH ── */}
        <div className={`splash ${splashDone ? 'done' : ''}`} role="dialog" aria-modal="true" aria-label="Loading RSA Unit Z649">
          <div className="splash__inner">
            <svg className="splash__mark" viewBox="0 0 120 120" aria-hidden="true">
              <circle className="splash__ring"  cx="60" cy="60" r="48"/>
              <ellipse className="splash__orbit" cx="60" cy="60" rx="52" ry="20" transform="rotate(-22 60 60)"/>
              <circle className="splash__star" cx="60" cy="60" r="5"/>
              <circle className="splash__star" cx="92" cy="44" r="2"/>
              <circle className="splash__star" cx="30" cy="78" r="2"/>
            </svg>
            <p className="splash__word">RSA Unit Z649</p>
            <p className="splash__sub">Initialising systems</p>
            <div className="splash__bar"><span/></div>
            <button className="splash__skip" type="button" onClick={()=>setSplashDone(true)}>Enter now</button>
          </div>
        </div>

        {/* ── HUD ── */}
        <div className="hud" role="status" aria-live="polite">
          <span className="hud__dot"/>
          <div><p className="hud__room">{room.label}</p><p className="hud__sub">{room.sub}</p></div>
        </div>

        {/* ── ADMIN TOGGLE ── */}
        <button
          className={`admin-toggle ${isAdmin?'on':''}`}
          onClick={toggleAdmin}
          aria-label={isAdmin ? 'Admin mode active — click to disable' : 'Enable admin mode'}
        >
          {isAdmin ? <><Unlock size={13}/> Admin: ON</> : <><Lock size={13}/> Admin</>}
        </button>

        {/* ── COUNTER ── */}
        <div className="counter" aria-hidden="true">
          <div className="counter__n"><strong>{String(activeIdx+1).padStart(2,'0')}</strong><span> / 08</span></div>
          <div className="counter__bar"><span className="counter__fill" style={{ width:`${((activeIdx+1)/ROOMS.length)*100}%` }}/></div>
        </div>

        {/* ── DESKTOP RAIL ── */}
        <nav className="rail" aria-label="Room navigation">
          {ROOMS.map((r,i)=>(
            <button key={r.id} type="button" className="pill" style={{ '--pa': r.accent }} aria-current={i===activeIdx} onClick={()=>navTo(r.id)}>
              <span className="pill__dot" aria-hidden="true"/>
              <span className="pill__label">{r.label}</span>
            </button>
          ))}
        </nav>

        {/* ── MOBILE DOCK ── */}
        <nav className="dock" aria-label="Section navigation">
          <div className="dock__scroller">
            {ROOMS.map((r,i)=>(
              <button key={r.id} type="button" className="dock__btn" style={{ '--pa': r.accent }} aria-current={i===activeIdx} onClick={()=>navTo(r.id)}>
                <span className="dock__glyph" aria-hidden="true">{r.glyph}</span>
                <span className="dock__label">{r.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* ── MAIN CONTENT ── */}
        <div
          className="scroll-root"
          ref={scrollRef}
          data-dir={scrollDir}
          role="main"
          aria-label="Unit Z649 Command Center"
        >
          {ROOMS.map((r,i)=>(
            <section key={r.id} id={r.id} className="room scrolling-section" aria-label={r.label}>
              {sections[i]?.()}
            </section>
          ))}
        </div>

        {/* ── MODAL ── */}
        <div
          className={`modal ${modal.open ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={modal.type ? modal.type.replace(/-/g,' ') : 'Dialog'}
        >
          <button className="modal__veil" onClick={closeModal} aria-label="Close dialog"/>
          <div className="modal__panel">
            <div className="modal__grip"/>
            {renderModalContent()}
          </div>
        </div>

        {/* ── TOAST ── */}
        <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
          <span className="toast__dot"/>
          {toast}
        </div>

      </div>
    </>
  );
}