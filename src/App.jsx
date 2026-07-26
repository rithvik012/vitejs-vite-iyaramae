<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#07090F" />
<title>NASA India Council — Student Space Council</title>
<meta name="description" content="The NASA India Council: a student-led space research and outreach council. Missions, crew, comms and launch schedule." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@200;400;600;800&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />
<style>
/* ============================================================
   0. TOKENS
   ============================================================ */
:root{
  /* palette */
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

  /* the active room accent — swapped by JS */
  --accent:#5B8CFF;
  --accent-soft:rgba(91,140,255,.14);

  /* fluid type scale */
  --fs-1:clamp(.72rem,.68rem + .2vw,.8rem);
  --fs-2:clamp(.84rem,.8rem + .25vw,.94rem);
  --fs-3:clamp(.98rem,.92rem + .35vw,1.1rem);
  --fs-4:clamp(1.2rem,1.05rem + .8vw,1.6rem);
  --fs-5:clamp(1.6rem,1.25rem + 1.9vw,2.6rem);
  --fs-6:clamp(2.2rem,1.4rem + 3.6vw,4.2rem);
  --fs-7:clamp(2.8rem,1.5rem + 5.6vw,6rem);

  /* rhythm */
  --sp-1:.375rem; --sp-2:.75rem; --sp-3:1.125rem;
  --sp-4:1.75rem; --sp-5:2.5rem;  --sp-6:4rem;
  --r-sm:10px; --r-md:16px; --r-lg:24px; --r-xl:32px;

  /* safe areas */
  --sat:env(safe-area-inset-top,0px);
  --sar:env(safe-area-inset-right,0px);
  --sab:env(safe-area-inset-bottom,0px);
  --sal:env(safe-area-inset-left,0px);

  /* explicit stacking layers — bug #7 */
  --z-house:0;
  --z-content:10;
  --z-hud:40;
  --z-rail:50;
  --z-dock:60;
  --z-modal:80;
  --z-splash:100;

  --ease:cubic-bezier(.22,1,.36,1);
  --ease-io:cubic-bezier(.65,.05,.36,1);
}

*,*::before,*::after{box-sizing:border-box;}
html{-webkit-text-size-adjust:100%;}
html,body{margin:0;padding:0;}
body{
  background:var(--bg);
  color:var(--ink);
  font-family:'Sora',system-ui,-apple-system,'Segoe UI',sans-serif;
  font-size:var(--fs-3);
  line-height:1.62;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
body[data-locked="true"]{overflow:hidden;}
img,svg{display:block;max-width:100%;}
button,input,textarea,select{font:inherit;color:inherit;}

/* focus ring: visible, accent-tinted, never clipped */
:focus-visible{
  outline:2px solid var(--accent);
  outline-offset:3px;
  border-radius:6px;
}
.sr-only{
  position:absolute;width:1px;height:1px;margin:-1px;padding:0;
  overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;
}
.skip{
  position:fixed;top:calc(var(--sat) + 8px);left:50%;
  transform:translate(-50%,-160%);
  z-index:var(--z-splash);
  background:var(--accent);color:#06080E;font-weight:700;
  padding:.7rem 1.2rem;border-radius:999px;text-decoration:none;
  transition:transform .25s var(--ease);
}
.skip:focus{transform:translate(-50%,0);}

/* ============================================================
   1. ARCHITECTURAL HOUSE BACKGROUND (CSS 3D)
   ============================================================ */
.house{
  position:fixed;inset:0;
  z-index:var(--z-house);
  overflow:hidden;
  perspective:1100px;
  perspective-origin:50% 42%;
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,.05), transparent 60%),
    linear-gradient(180deg,var(--bg-2),var(--bg));
  pointer-events:none;
}
.house::after{ /* vignette keeps text contrast AA over any accent */
  content:'';position:absolute;inset:0;
  background:radial-gradient(130% 100% at 50% 50%, transparent 30%, rgba(4,6,11,.82) 100%);
}
.house__scene{
  position:absolute;top:50%;left:50%;
  width:180vmax;height:180vmax;
  margin:calc(-90vmax) 0 0 calc(-90vmax);
  transform-style:preserve-3d;
  transition:transform 1.4s var(--ease);
  will-change:transform;
}
.plane{position:absolute;inset:0;transform-style:preserve-3d;}

/* floor grid */
.floor{
  background-image:
    linear-gradient(var(--accent-soft) 1px, transparent 1px),
    linear-gradient(90deg,var(--accent-soft) 1px, transparent 1px);
  background-size:7vmax 7vmax, 7vmax 7vmax;
  transform:rotateX(90deg) translateZ(-26vmax);
  opacity:.85;
  transition:background-image 1.2s var(--ease);
}
/* three walls forming the room shell */
.wall{border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.03),transparent);}
.wall--back{transform:translateZ(-60vmax);}
.wall--left{transform:rotateY(90deg) translateZ(-60vmax);}
.wall--right{transform:rotateY(-90deg) translateZ(-60vmax);}
/* light shaft that recolours per room */
.shaft{
  position:absolute;left:50%;top:-10%;
  width:34vmax;height:150%;
  margin-left:-17vmax;
  background:linear-gradient(180deg,var(--accent),transparent 72%);
  opacity:.16;
  transform:rotateX(74deg) translateZ(-20vmax);
  transition:background 1.2s var(--ease);
}
/* drifting particulate — pure transform, no filters (bug #4) */
.motes{position:absolute;inset:0;}
.mote{
  position:absolute;width:3px;height:3px;border-radius:50%;
  background:var(--accent);opacity:.5;
  animation:drift linear infinite;
}
@keyframes drift{
  from{transform:translate3d(0,0,0);}
  to{transform:translate3d(0,-70vh,0);}
}

/* ============================================================
   2. HUD — room label + counter
   ============================================================ */
.hud{
  position:fixed;z-index:var(--z-hud);
  top:calc(var(--sat) + var(--sp-3));
  left:calc(var(--sal) + var(--sp-3));
  display:flex;align-items:center;gap:.7rem;
  padding:.6rem .95rem;
  background:rgba(8,11,18,.6);
  border:1px solid var(--line);
  border-radius:999px;
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  max-width:min(70vw,340px);
}
.hud__dot{
  width:9px;height:9px;border-radius:50%;flex:0 0 auto;
  background:var(--accent);
  box-shadow:0 0 0 4px var(--accent-soft);
  animation:pulse 2.6s ease-in-out infinite;
}
@keyframes pulse{50%{transform:scale(1.45);}}
.hud__text{min-width:0;}
.hud__room{
  font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);
  letter-spacing:.16em;text-transform:uppercase;
  color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  margin:0;
}
.hud__sub{
  font-size:var(--fs-1);color:var(--ink-3);margin:0;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}

.counter{
  position:fixed;z-index:var(--z-hud);
  bottom:calc(var(--sab) + 6.5rem);
  right:calc(var(--sar) + var(--sp-3));
  text-align:right;font-family:'IBM Plex Mono',monospace;
}
.counter__n{font-size:var(--fs-4);font-weight:600;color:var(--ink);letter-spacing:.04em;}
.counter__n span{color:var(--ink-3);font-size:var(--fs-2);}
.counter__bar{
  width:78px;height:2px;margin:.45rem 0 0 auto;
  background:var(--line-2);border-radius:2px;overflow:hidden;
}
.counter__fill{
  display:block;height:100%;width:12.5%;
  background:var(--accent);border-radius:2px;
  transition:width .7s var(--ease), background .7s var(--ease);
}
@media (min-width:860px){ .counter{bottom:calc(var(--sab) + var(--sp-4));} }

/* ============================================================
   3. DESKTOP RAIL (section-coloured pills)
   ============================================================ */
.rail{
  position:fixed;z-index:var(--z-rail);
  right:calc(var(--sar) + var(--sp-3));
  top:50%;transform:translateY(-50%);
  display:none;flex-direction:column;gap:.5rem;
  padding:.6rem;
  background:rgba(8,11,18,.5);
  border:1px solid var(--line);border-radius:999px;
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
}
@media (min-width:860px){ .rail{display:flex;} }
.pill{
  --pa:var(--accent);
  position:relative;
  display:flex;align-items:center;gap:.6rem;
  min-height:44px;padding:.4rem .55rem;
  background:transparent;border:0;border-radius:999px;
  cursor:pointer;color:var(--ink-3);
  transition:color .3s var(--ease), background .3s var(--ease);
}
.pill__dot{
  width:10px;height:10px;border-radius:50%;flex:0 0 auto;
  background:var(--pa);opacity:.4;
  transition:opacity .3s var(--ease), transform .3s var(--ease);
}
.pill__label{
  font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);
  letter-spacing:.1em;text-transform:uppercase;
  max-width:0;overflow:hidden;white-space:nowrap;
  transition:max-width .4s var(--ease), margin .4s var(--ease);
  margin-right:0;
}
.pill:hover .pill__label,
.pill:focus-visible .pill__label,
.pill[aria-current="true"] .pill__label{max-width:150px;margin-right:.35rem;}
.pill:hover,.pill:focus-visible{color:var(--ink);background:var(--panel);}
.pill[aria-current="true"]{color:var(--ink);background:var(--panel-2);}
.pill[aria-current="true"] .pill__dot{opacity:1;transform:scale(1.25);box-shadow:0 0 0 4px color-mix(in srgb,var(--pa) 20%,transparent);}

/* ============================================================
   4. MOBILE DOCK — 8 items, no overflow (bug #2)
   ============================================================ */
.dock{
  position:fixed;z-index:var(--z-dock);
  left:0;right:0;bottom:0;
  padding:.5rem calc(var(--sal) + .5rem) calc(var(--sab) + .5rem) calc(var(--sar) + .5rem);
  background:linear-gradient(180deg,rgba(7,9,15,0),rgba(7,9,15,.92) 42%);
}
@media (min-width:860px){ .dock{display:none;} }
.dock__scroller{
  display:flex;gap:.4rem;
  overflow-x:auto;overflow-y:hidden;
  scroll-snap-type:x proximity;
  -webkit-overflow-scrolling:touch;
  scrollbar-width:none;
  padding:.45rem;
  background:rgba(12,16,24,.85);
  border:1px solid var(--line);border-radius:var(--r-lg);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
}
.dock__scroller::-webkit-scrollbar{display:none;}
.dock__btn{
  --pa:var(--accent);
  flex:0 0 auto;scroll-snap-align:center;
  display:grid;justify-items:center;gap:.2rem;
  min-width:62px;min-height:52px;padding:.35rem .5rem;
  background:transparent;border:0;border-radius:var(--r-md);
  color:var(--ink-3);cursor:pointer;
  transition:background .3s var(--ease), color .3s var(--ease);
}
.dock__glyph{
  display:grid;place-items:center;
  width:26px;height:26px;border-radius:8px;
  font-family:'IBM Plex Mono',monospace;font-size:.72rem;font-weight:600;
  background:color-mix(in srgb,var(--pa) 16%,transparent);
  color:var(--pa);
}
.dock__label{
  font-family:'IBM Plex Mono',monospace;
  font-size:.58rem;letter-spacing:.06em;text-transform:uppercase;
  white-space:nowrap;
}
.dock__btn[aria-current="true"]{background:var(--panel-2);color:var(--ink);}
.dock__btn[aria-current="true"] .dock__glyph{background:var(--pa);color:#06080E;}

/* ============================================================
   5. LAYOUT + DIRECTION-AWARE REVEAL
   ============================================================ */
main{position:relative;z-index:var(--z-content);}
.room{
  min-height:100svh;
  display:grid;align-content:center;
  scroll-snap-align:start;
  padding:
    calc(var(--sat) + 5.5rem)
    calc(var(--sar) + var(--sp-3))
    calc(var(--sab) + 6.5rem)
    calc(var(--sal) + var(--sp-3));
}
@media (min-width:860px){
  .room{padding:calc(var(--sat) + var(--sp-6)) calc(var(--sar) + 6rem) calc(var(--sab) + var(--sp-6)) calc(var(--sal) + var(--sp-5));}
}
.wrap{width:100%;max-width:1120px;margin:0 auto;}

/* reveal: opacity + transform only (bug #4) */
.reveal{
  opacity:0;
  transform:translate3d(0,var(--rev,44px),0);
  transition:opacity .8s var(--ease), transform .9s var(--ease);
}
main[data-dir="up"] .reveal{--rev:-44px;}
.reveal.is-in{opacity:1;transform:translate3d(0,0,0);}
.reveal.d1{transition-delay:.07s;}
.reveal.d2{transition-delay:.14s;}
.reveal.d3{transition-delay:.21s;}
.reveal.d4{transition-delay:.28s;}

/* ============================================================
   6. TYPOGRAPHY + PRIMITIVES
   ============================================================ */
.eyebrow{
  display:inline-flex;align-items:center;gap:.55rem;
  font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);
  letter-spacing:.22em;text-transform:uppercase;
  color:var(--accent);
  margin:0 0 var(--sp-3) 0;
}
.eyebrow::before{content:'';width:26px;height:1px;background:var(--accent);}
h1,h2,h3,h4{font-weight:800;letter-spacing:-.02em;line-height:1.06;margin:0;}
h1{font-size:var(--fs-7);}
h2{font-size:var(--fs-6);}
h3{font-size:var(--fs-4);letter-spacing:-.01em;}
h4{font-size:var(--fs-3);letter-spacing:0;}
.display-thin{font-weight:200;}
.lede{font-size:var(--fs-4);font-weight:200;color:var(--ink-2);margin:var(--sp-3) 0 0 0;max-width:46ch;line-height:1.45;}
.body{color:var(--ink-2);margin:var(--sp-2) 0 0 0;}
.mono{font-family:'IBM Plex Mono',monospace;letter-spacing:.06em;}

.card{
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:var(--r-lg);
  padding:var(--sp-4);
  transition:transform .5s var(--ease), border-color .5s var(--ease), background .5s var(--ease);
}
.card:hover{transform:translateY(-4px);border-color:var(--line-2);background:var(--panel-2);}

.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  min-height:48px;padding:.8rem 1.5rem;
  border-radius:999px;border:1px solid transparent;
  font-size:var(--fs-2);font-weight:600;cursor:pointer;
  text-decoration:none;
  transition:transform .3s var(--ease), background .3s var(--ease), border-color .3s var(--ease), color .3s var(--ease);
}
.btn:active{transform:scale(.97);}
.btn--primary{background:var(--accent);color:#06080E;}
.btn--primary:hover{background:#fff;}
.btn--ghost{background:transparent;border-color:var(--line-2);color:var(--ink);}
.btn--ghost:hover{background:var(--panel-2);border-color:var(--accent);}
.btn--danger{background:var(--danger);color:#150404;}
.btn--sm{min-height:40px;padding:.5rem 1rem;font-size:var(--fs-1);}
.btn-row{display:flex;flex-wrap:wrap;gap:var(--sp-2);margin:var(--sp-4) 0 0 0;}

/* ============================================================
   7. BENTO — no max-height (bug #3)
   ============================================================ */
.bento{
  display:grid;
  grid-template-columns:1fr;
  grid-auto-rows:minmax(120px,auto);
  gap:var(--sp-2);
  margin:var(--sp-5) 0 0 0;
}
@media (min-width:640px){ .bento{grid-template-columns:repeat(2,1fr);} }
@media (min-width:900px){
  .bento{grid-template-columns:repeat(4,1fr);gap:var(--sp-3);}
  .bento__cell--wide{grid-column:span 2;}
  .bento__cell--tall{grid-row:span 2;}
}
.bento__cell{
  display:flex;flex-direction:column;justify-content:space-between;
  gap:var(--sp-2);
  background:var(--panel);border:1px solid var(--line);
  border-radius:var(--r-md);padding:var(--sp-3);
  transition:border-color .4s var(--ease), background .4s var(--ease), transform .4s var(--ease);
}
.bento__cell:hover{border-color:var(--accent);background:var(--panel-2);transform:translateY(-3px);}
.bento__k{font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);margin:0;}
.bento__v{font-size:var(--fs-5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}
.bento__d{font-size:var(--fs-2);color:var(--ink-2);margin:0;}

/* stats strip */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(140px,100%),1fr));gap:var(--sp-3);margin:var(--sp-5) 0 0 0;}
.stat{border-left:2px solid var(--accent);padding:0 0 0 var(--sp-3);}
.stat__v{font-size:var(--fs-5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}
.stat__k{font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin:.4rem 0 0 0;}

/* ============================================================
   8. CREW — initials avatars
   ============================================================ */
.crew{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(210px,100%),1fr));gap:var(--sp-3);margin:var(--sp-5) 0 0 0;}
.member{display:grid;justify-items:start;gap:var(--sp-2);}
.avatar{
  --h:210;
  display:grid;place-items:center;
  width:68px;height:68px;border-radius:20px;
  font-family:'IBM Plex Mono',monospace;font-size:1.32rem;font-weight:600;
  letter-spacing:.02em;color:#fff;
  background:linear-gradient(145deg,hsl(var(--h) 78% 58%),hsl(calc(var(--h) + 42) 72% 40%));
  box-shadow:0 10px 30px -12px hsl(var(--h) 78% 50% / .7);
  transition:transform .45s var(--ease);
}
.member:hover .avatar{transform:translateY(-4px) rotate(-3deg);}
.member__name{font-size:var(--fs-3);font-weight:600;margin:0;}
.member__role{font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin:0;}

/* ============================================================
   9. NEWS GRID — min() guard (bug #9)
   ============================================================ */
.news{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr));
  gap:var(--sp-3);
  margin:var(--sp-5) 0 0 0;
}
.news__item{display:flex;flex-direction:column;gap:var(--sp-2);}
.news__meta{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin:0;}
.tag{
  font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);
  letter-spacing:.12em;text-transform:uppercase;
  padding:.22rem .6rem;border-radius:999px;
  background:var(--accent-soft);color:var(--accent);
}
.news__date{font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);color:var(--ink-3);}
.news__body{color:var(--ink-2);font-size:var(--fs-2);margin:0;flex:1 1 auto;}
.news__actions{display:flex;gap:var(--sp-2);margin:var(--sp-2) 0 0 0;}
.empty{
  grid-column:1/-1;text-align:center;padding:var(--sp-5);
  border:1px dashed var(--line-2);border-radius:var(--r-lg);color:var(--ink-3);
}

/* ============================================================
   10. FORMS — margins guaranteed by grid gap (bug #10)
   ============================================================ */
.form{display:grid;gap:var(--sp-3);margin:var(--sp-4) 0 0 0;max-width:560px;}
.form--wide{max-width:none;}
.field{display:grid;gap:.45rem;}
.field > label{font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-2);}
.field input,.field textarea,.field select{
  width:100%;
  margin:0;
  padding:.85rem 1rem;
  background:rgba(255,255,255,.04);
  border:1px solid var(--line);
  border-radius:var(--r-sm);
  font-size:var(--fs-2);
  transition:border-color .3s var(--ease), background .3s var(--ease);
}
.field textarea{min-height:120px;resize:vertical;}
.field input:focus,.field textarea:focus,.field select:focus{
  border-color:var(--accent);background:rgba(255,255,255,.07);outline:none;
}
.field input:focus-visible,.field textarea:focus-visible,.field select:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
.field__hint{font-size:var(--fs-1);color:var(--ink-3);margin:0;}
.field__err{font-size:var(--fs-1);color:var(--danger);margin:0;min-height:1.1em;}
.grid-2{display:grid;gap:var(--sp-3);grid-template-columns:1fr;}
@media (min-width:640px){ .grid-2{grid-template-columns:1fr 1fr;} }

/* ============================================================
   11. AI TERMINAL — explicit height (bug #8)
   ============================================================ */
.term{
  display:flex;flex-direction:column;
  background:rgba(4,7,13,.72);
  border:1px solid var(--line);border-radius:var(--r-lg);
  overflow:hidden;
  margin:var(--sp-5) 0 0 0;
}
.term__bar{
  display:flex;align-items:center;gap:.5rem;
  padding:.7rem 1rem;
  border-bottom:1px solid var(--line);
  background:rgba(255,255,255,.03);
}
.term__led{width:9px;height:9px;border-radius:50%;background:var(--line-2);}
.term__led--on{background:var(--accent);}
.term__title{font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin:0 0 0 .5rem;}
.term__log{
  height:clamp(260px,38svh,420px);
  overflow-y:auto;
  padding:var(--sp-3);
  margin:0;
  font-family:'IBM Plex Mono',monospace;
  font-size:var(--fs-2);line-height:1.75;
  overflow-wrap:anywhere;
}
.term__line{margin:0 0 .35rem 0;}
.term__line--in{color:var(--ink);}
.term__line--in::before{content:'> ';color:var(--accent);}
.term__line--out{color:var(--ink-2);}
.term__line--sys{color:var(--ink-3);font-style:italic;}
.term__form{display:flex;gap:.5rem;padding:var(--sp-2);border-top:1px solid var(--line);background:rgba(255,255,255,.02);}
.term__form input{
  flex:1 1 auto;min-width:0;margin:0;
  padding:.7rem .9rem;
  background:rgba(255,255,255,.05);
  border:1px solid var(--line);border-radius:var(--r-sm);
  font-family:'IBM Plex Mono',monospace;font-size:var(--fs-2);
}
.term__chips{display:flex;flex-wrap:wrap;gap:.5rem;margin:var(--sp-3) 0 0 0;}
.chip{
  min-height:40px;padding:.45rem .9rem;
  background:var(--panel);border:1px solid var(--line);border-radius:999px;
  font-size:var(--fs-1);color:var(--ink-2);cursor:pointer;
  transition:border-color .3s var(--ease), color .3s var(--ease);
}
.chip:hover{border-color:var(--accent);color:var(--ink);}

/* ============================================================
   12. TIMELINE
   ============================================================ */
.timeline{list-style:none;margin:var(--sp-5) 0 0 0;padding:0;display:grid;gap:var(--sp-3);}
.event{
  display:grid;gap:var(--sp-2);
  grid-template-columns:1fr;
  padding:var(--sp-3);
  background:var(--panel);border:1px solid var(--line);
  border-radius:var(--r-md);
  border-left:3px solid var(--accent);
}
@media (min-width:720px){ .event{grid-template-columns:130px 1fr auto;align-items:center;} }
.event__when{font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin:0;}
.event__what{margin:0;}
.event__title{font-size:var(--fs-3);font-weight:600;margin:0;}
.event__where{font-size:var(--fs-2);color:var(--ink-3);margin:.2rem 0 0 0;}

/* ============================================================
   13. MODAL — centered on desktop, bottom sheet on mobile
   ============================================================ */
.modal{
  position:fixed;inset:0;z-index:var(--z-modal);
  display:grid;
  opacity:0;pointer-events:none;
  transition:opacity .3s var(--ease);
}
.modal[data-open="true"]{opacity:1;pointer-events:auto;}
.modal__veil{position:absolute;inset:0;background:rgba(3,5,10,.72);border:0;padding:0;cursor:pointer;}
.modal__panel{
  position:relative;
  width:100%;
  background:#0D111A;
  border:1px solid var(--line);
  padding:var(--sp-4);
  transition:transform .38s var(--ease);
  max-height:88svh;overflow-y:auto;
}
/* mobile: bottom sheet */
.modal{align-items:end;justify-items:stretch;}
.modal__panel{
  border-radius:var(--r-xl) var(--r-xl) 0 0;
  padding-bottom:calc(var(--sp-4) + var(--sab));
  transform:translateY(100%);
}
.modal[data-open="true"] .modal__panel{transform:translateY(0);}
.modal__grip{
  width:44px;height:4px;border-radius:999px;
  background:var(--line-2);
  margin:0 auto var(--sp-3) auto;
}
/* desktop: centered dialog */
@media (min-width:768px){
  .modal{align-items:center;justify-items:center;padding:var(--sp-4);}
  .modal__panel{
    max-width:520px;border-radius:var(--r-lg);
    padding-bottom:var(--sp-4);
    transform:translateY(16px) scale(.97);
  }
  .modal[data-open="true"] .modal__panel{transform:translateY(0) scale(1);}
  .modal__grip{display:none;}
}
.modal__title{font-size:var(--fs-4);margin:0 0 var(--sp-2) 0;}
.modal__body{color:var(--ink-2);font-size:var(--fs-2);margin:0;}
.modal__actions{display:flex;flex-wrap:wrap;gap:var(--sp-2);margin:var(--sp-4) 0 0 0;justify-content:flex-end;}

/* toast */
.toast{
  position:fixed;z-index:var(--z-modal);
  left:50%;bottom:calc(var(--sab) + 7.5rem);
  transform:translate(-50%,140%);
  display:flex;align-items:center;gap:.6rem;
  padding:.75rem 1.15rem;
  background:#0D111A;border:1px solid var(--accent);
  border-radius:999px;font-size:var(--fs-2);
  transition:transform .4s var(--ease);
  max-width:calc(100vw - 2rem);
}
.toast[data-show="true"]{transform:translate(-50%,0);}
@media (min-width:860px){ .toast{bottom:calc(var(--sab) + var(--sp-4));} }

/* ============================================================
   14. SPLASH / ANIMATED INTRO
   ============================================================ */
.splash{
  position:fixed;inset:0;z-index:var(--z-splash);
  display:grid;place-items:center;
  background:var(--bg);
  transition:opacity .8s var(--ease), visibility .8s;
}
.splash[data-done="true"]{opacity:0;visibility:hidden;}
.splash__inner{display:grid;justify-items:center;gap:var(--sp-3);padding:var(--sp-4);text-align:center;}
.splash__mark{width:min(160px,42vw);height:auto;}
.splash__ring{fill:none;stroke:var(--accent);stroke-width:2;opacity:.9;
  stroke-dasharray:302;stroke-dashoffset:302;
  animation:draw 1.5s var(--ease-io) forwards;}
.splash__orbit{fill:none;stroke:#fff;stroke-width:1.4;opacity:.6;
  stroke-dasharray:260;stroke-dashoffset:260;
  animation:draw 1.6s .28s var(--ease-io) forwards;}
.splash__star{fill:#fff;opacity:0;animation:fadein .7s .95s var(--ease) forwards;}
@keyframes draw{to{stroke-dashoffset:0;}}
@keyframes fadein{to{opacity:1;}}
.splash__word{
  font-family:'IBM Plex Mono',monospace;
  font-size:var(--fs-2);letter-spacing:.42em;text-transform:uppercase;
  color:var(--ink-2);margin:0;
  opacity:0;animation:rise .8s 1.05s var(--ease) forwards;
}
.splash__sub{
  font-size:var(--fs-1);color:var(--ink-3);margin:0;letter-spacing:.14em;
  font-family:'IBM Plex Mono',monospace;text-transform:uppercase;
  opacity:0;animation:rise .8s 1.25s var(--ease) forwards;
}
@keyframes rise{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}
.splash__bar{width:min(230px,62vw);height:2px;background:var(--line-2);border-radius:2px;overflow:hidden;margin:var(--sp-2) 0 0 0;}
.splash__bar span{display:block;height:100%;width:0;background:var(--accent);animation:load 1.9s .2s var(--ease-io) forwards;}
@keyframes load{to{width:100%;}}
.splash__skip{
  margin:var(--sp-3) 0 0 0;
  background:transparent;border:1px solid var(--line-2);color:var(--ink-3);
  border-radius:999px;min-height:44px;padding:.5rem 1.2rem;
  font-family:'IBM Plex Mono',monospace;font-size:var(--fs-1);
  letter-spacing:.14em;text-transform:uppercase;cursor:pointer;
  transition:color .3s var(--ease), border-color .3s var(--ease);
}
.splash__skip:hover{color:var(--ink);border-color:var(--accent);}

/* footer */
.foot{
  border-top:1px solid var(--line);
  margin:var(--sp-6) 0 0 0;padding:var(--sp-3) 0 0 0;
  display:flex;flex-wrap:wrap;gap:var(--sp-2);justify-content:space-between;
  font-size:var(--fs-1);color:var(--ink-3);
  font-family:'IBM Plex Mono',monospace;letter-spacing:.08em;
}

/* ============================================================
   15. REDUCED MOTION — full opt-out
   ============================================================ */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{
    animation-duration:.001ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.001ms !important;
    scroll-behavior:auto !important;
  }
  .reveal{opacity:1 !important;transform:none !important;}
  .house__scene{transform:none !important;}
  .motes{display:none;}
  .splash__bar span{width:100%;}
}
</style>
</head>
<body>

<a class="skip" href="#atrium">Skip to main content</a>

<!-- ===== SPLASH ===== -->
<div class="splash" id="splash" role="dialog" aria-modal="true" aria-label="Loading NASA India Council">
  <div class="splash__inner">
    <svg class="splash__mark" viewBox="0 0 120 120" role="img" aria-label="Council emblem">
      <circle class="splash__ring" cx="60" cy="60" r="48" />
      <ellipse class="splash__orbit" cx="60" cy="60" rx="52" ry="20" transform="rotate(-22 60 60)" />
      <circle class="splash__star" cx="60" cy="60" r="5" />
      <circle class="splash__star" cx="92" cy="44" r="2" />
      <circle class="splash__star" cx="30" cy="78" r="2" />
    </svg>
    <p class="splash__word">NASA India Council</p>
    <p class="splash__sub">Initialising systems</p>
    <div class="splash__bar"><span></span></div>
    <button class="splash__skip" id="splashSkip" type="button">Enter now</button>
  </div>
</div>

<!-- ===== HOUSE BACKGROUND ===== -->
<div class="house" aria-hidden="true">
  <div class="house__scene" id="scene">
    <div class="plane floor"></div>
    <div class="plane wall wall--back"></div>
    <div class="plane wall wall--left"></div>
    <div class="plane wall wall--right"></div>
    <div class="shaft"></div>
  </div>
  <div class="motes" id="motes"></div>
</div>

<!-- ===== HUD ===== -->
<div class="hud">
  <span class="hud__dot"></span>
  <div class="hud__text">
    <p class="hud__room" id="hudRoom">Atrium</p>
    <p class="hud__sub" id="hudSub">Welcome</p>
  </div>
</div>
<p class="sr-only" role="status" aria-live="polite" id="announce"></p>

<div class="counter" aria-hidden="true">
  <div class="counter__n"><strong id="cNow">01</strong><span> / 08</span></div>
  <div class="counter__bar"><span class="counter__fill" id="cFill"></span></div>
</div>

<!-- ===== DESKTOP RAIL ===== -->
<nav class="rail" id="rail" aria-label="Room navigation"></nav>

<!-- ===== MAIN ===== -->
<main id="main" data-dir="down">

  <!-- 1. ATRIUM -->
  <section class="room" id="atrium" aria-labelledby="atrium-h">
    <div class="wrap">
      <p class="eyebrow reveal">Student Space Council · Est. 2021</p>
      <h1 class="reveal d1" id="atrium-h">We build <span class="display-thin">things that</span> leave the ground.</h1>
      <p class="lede reveal d2">The NASA India Council is a student-led research and outreach body: CubeSats, rocketry, astrophotography and public science — run entirely by undergraduates.</p>
      <div class="btn-row reveal d3">
        <button class="btn btn--primary" type="button" data-go="missions">Explore missions</button>
        <button class="btn btn--ghost" type="button" data-go="contact">Join the council</button>
      </div>
      <div class="bento reveal d4">
        <div class="bento__cell bento__cell--wide bento__cell--tall">
          <p class="bento__k">Flagship</p>
          <div>
            <p class="bento__v">CubeSat-1</p>
            <p class="bento__d">A 1U technology-demonstrator payload for low-cost atmospheric telemetry. Structures complete, avionics in integration.</p>
          </div>
        </div>
        <div class="bento__cell"><p class="bento__k">Members</p><p class="bento__v">140+</p></div>
        <div class="bento__cell"><p class="bento__k">Chapters</p><p class="bento__v">06</p></div>
        <div class="bento__cell bento__cell--wide"><p class="bento__k">Next launch window</p><p class="bento__v">T‑42<span style="font-size:.4em;">days</span></p></div>
        <div class="bento__cell"><p class="bento__k">Papers</p><p class="bento__v">11</p></div>
        <div class="bento__cell"><p class="bento__k">Outreach</p><p class="bento__v">8.2k</p><p class="bento__d">students reached</p></div>
      </div>
    </div>
  </section>

  <!-- 2. BRIEFING ROOM -->
  <section class="room" id="about" aria-labelledby="about-h">
    <div class="wrap">
      <p class="eyebrow reveal">Briefing</p>
      <h2 class="reveal d1" id="about-h">Curiosity, <span class="display-thin">engineered.</span></h2>
      <p class="lede reveal d2">We exist to give students real hardware, real deadlines and real failure — the three things a lecture hall cannot provide.</p>
      <div class="grid-2 reveal d3" style="margin-top:var(--sp-5);">
        <div class="card">
          <h3>What we do</h3>
          <p class="body">Four active divisions — Avionics, Structures, Payload Science and Outreach — each running its own build cycle with peer design reviews every fortnight.</p>
        </div>
        <div class="card">
          <h3>How to join</h3>
          <p class="body">Open intake twice a year. No prior experience required for first-years; we pair every new member with a second-year mentor for their first build.</p>
        </div>
      </div>
      <div class="stats reveal d4">
        <div class="stat"><p class="stat__v">2021</p><p class="stat__k">Founded</p></div>
        <div class="stat"><p class="stat__v">04</p><p class="stat__k">Divisions</p></div>
        <div class="stat"><p class="stat__v">23</p><p class="stat__k">Builds shipped</p></div>
        <div class="stat"><p class="stat__v">100%</p><p class="stat__k">Student-run</p></div>
      </div>
    </div>
  </section>

  <!-- 3. MISSION BAY -->
  <section class="room" id="missions" aria-labelledby="missions-h">
    <div class="wrap">
      <p class="eyebrow reveal">Mission Bay</p>
      <h2 class="reveal d1" id="missions-h">Active <span class="display-thin">programmes</span></h2>
      <div class="news reveal d2" id="missionGrid"></div>
    </div>
  </section>

  <!-- 4. CREW QUARTERS -->
  <section class="room" id="crew" aria-labelledby="crew-h">
    <div class="wrap">
      <p class="eyebrow reveal">Crew Quarters</p>
      <h2 class="reveal d1" id="crew-h">The <span class="display-thin">council</span></h2>
      <p class="lede reveal d2">Elected annually. Every officer also sits on a build team — no purely administrative roles.</p>
      <div class="crew reveal d3" id="crewGrid"></div>
    </div>
  </section>

  <!-- 5. COMMS DECK -->
  <section class="room" id="news" aria-labelledby="news-h">
    <div class="wrap">
      <p class="eyebrow reveal">Comms Deck</p>
      <h2 class="reveal d1" id="news-h">Latest <span class="display-thin">transmissions</span></h2>
      <div class="news reveal d2" id="newsGrid"></div>

      <details class="card reveal d3" style="margin-top:var(--sp-4);">
        <summary style="cursor:pointer;font-weight:600;">Post an update (council officers)</summary>
        <form class="form form--wide" id="newsForm" novalidate>
          <div class="grid-2">
            <div class="field">
              <label for="nTitle">Headline</label>
              <input id="nTitle" name="title" type="text" required maxlength="90" autocomplete="off" aria-describedby="nTitleErr" />
              <p class="field__err" id="nTitleErr" role="alert"></p>
            </div>
            <div class="field">
              <label for="nTag">Channel</label>
              <select id="nTag" name="tag">
                <option>Mission</option><option>Research</option>
                <option>Outreach</option><option>Announcement</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="nBody">Body</label>
            <textarea id="nBody" name="body" required maxlength="420" aria-describedby="nBodyErr"></textarea>
            <p class="field__err" id="nBodyErr" role="alert"></p>
          </div>
          <div class="btn-row" style="margin:0;">
            <button class="btn btn--primary" type="submit">Publish</button>
            <button class="btn btn--ghost" type="reset">Clear</button>
          </div>
        </form>
      </details>
    </div>
  </section>

  <!-- 6. OPS TERMINAL -->
  <section class="room" id="ops" aria-labelledby="ops-h">
    <div class="wrap">
      <p class="eyebrow reveal">Ops Terminal</p>
      <h2 class="reveal d1" id="ops-h">Ask <span class="display-thin">the council</span></h2>
      <p class="lede reveal d2">A local query console — no network calls. Wire it to your own model endpoint in <code>askCouncil()</code>.</p>
      <div class="term reveal d3">
        <div class="term__bar">
          <span class="term__led term__led--on"></span>
          <span class="term__led"></span>
          <span class="term__led"></span>
          <p class="term__title">council://ops — session active</p>
        </div>
        <div class="term__log" id="termLog" role="log" aria-live="polite" aria-label="Terminal output" tabindex="0"></div>
        <form class="term__form" id="termForm">
          <label class="sr-only" for="termIn">Enter a command</label>
          <input id="termIn" type="text" autocomplete="off" spellcheck="false" placeholder="type help and press enter" />
          <button class="btn btn--primary btn--sm" type="submit">Send</button>
        </form>
      </div>
      <div class="term__chips reveal d4">
        <button class="chip" type="button" data-cmd="help">help</button>
        <button class="chip" type="button" data-cmd="missions">missions</button>
        <button class="chip" type="button" data-cmd="join">how do I join</button>
        <button class="chip" type="button" data-cmd="launch">next launch</button>
        <button class="chip" type="button" data-cmd="clear">clear</button>
      </div>
    </div>
  </section>

  <!-- 7. LAUNCH PAD -->
  <section class="room" id="events" aria-labelledby="events-h">
    <div class="wrap">
      <p class="eyebrow reveal">Launch Pad</p>
      <h2 class="reveal d1" id="events-h">Upcoming <span class="display-thin">schedule</span></h2>
      <ul class="timeline reveal d2" id="eventList"></ul>
    </div>
  </section>

  <!-- 8. AIRLOCK -->
  <section class="room" id="contact" aria-labelledby="contact-h">
    <div class="wrap">
      <p class="eyebrow reveal">Airlock</p>
      <h2 class="reveal d1" id="contact-h">Come <span class="display-thin">aboard</span></h2>
      <p class="lede reveal d2">Tell us what you want to build. We read every application.</p>
      <form class="form reveal d3" id="joinForm" novalidate>
        <div class="grid-2">
          <div class="field">
            <label for="jName">Full name</label>
            <input id="jName" name="name" type="text" required autocomplete="name" aria-describedby="jNameErr" />
            <p class="field__err" id="jNameErr" role="alert"></p>
          </div>
          <div class="field">
            <label for="jMail">Email</label>
            <input id="jMail" name="email" type="email" required autocomplete="email" inputmode="email" aria-describedby="jMailErr" />
            <p class="field__err" id="jMailErr" role="alert"></p>
          </div>
        </div>
        <div class="field">
          <label for="jDiv">Division of interest</label>
          <select id="jDiv" name="division">
            <option>Avionics</option><option>Structures</option>
            <option>Payload Science</option><option>Outreach</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="field">
          <label for="jWhy">What do you want to build?</label>
          <textarea id="jWhy" name="why" required maxlength="600" aria-describedby="jWhyErr"></textarea>
          <p class="field__err" id="jWhyErr" role="alert"></p>
        </div>
        <div class="btn-row" style="margin:0;">
          <button class="btn btn--primary" type="submit">Submit application</button>
        </div>
      </form>
      <div class="foot reveal d4">
        <span>NASA India Council · Student body</span>
        <span>council@yourcollege.edu</span>
      </div>
    </div>
  </section>

</main>

<!-- ===== MOBILE DOCK ===== -->
<nav class="dock" aria-label="Room navigation">
  <div class="dock__scroller" id="dock"></div>
</nav>

<!-- ===== MODAL (sheet on mobile) ===== -->
<div class="modal" id="modal" data-open="false" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalBody">
  <button class="modal__veil" id="modalVeil" type="button" tabindex="-1" aria-label="Close dialog"></button>
  <div class="modal__panel" id="modalPanel">
    <div class="modal__grip" aria-hidden="true"></div>
    <h3 class="modal__title" id="modalTitle">Title</h3>
    <p class="modal__body" id="modalBody">Body</p>
    <div class="modal__actions">
      <button class="btn btn--ghost btn--sm" type="button" id="modalCancel">Cancel</button>
      <button class="btn btn--danger btn--sm" type="button" id="modalConfirm">Confirm</button>
    </div>
  </div>
</div>

<div class="toast" id="toast" data-show="false" role="status" aria-live="polite"></div>

<script>
(function(){
'use strict';

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $  = function(s,r){ return (r||document).querySelector(s); };
var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
function esc(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

/* ============================================================
   ROOMS — camera transform + accent per room
   ============================================================ */
var ROOMS = [
  { id:'atrium',   label:'Atrium',        sub:'Welcome',          glyph:'AT', accent:'#5B8CFF', cam:{rx:52,ry:  0,tz:-120,ty:   0} },
  { id:'about',    label:'Briefing Room', sub:'Who we are',       glyph:'BR', accent:'#00D3A7', cam:{rx:60,ry:-14,tz: -40,ty: -60} },
  { id:'missions', label:'Mission Bay',   sub:'What we build',    glyph:'MB', accent:'#FF7A45', cam:{rx:46,ry: 16,tz:  60,ty:-140} },
  { id:'crew',     label:'Crew Quarters', sub:'The team',         glyph:'CQ', accent:'#B388FF', cam:{rx:64,ry:  8,tz: -20,ty:-220} },
  { id:'news',     label:'Comms Deck',    sub:'Latest updates',   glyph:'CD', accent:'#FFD166', cam:{rx:50,ry:-20,tz: 100,ty:-300} },
  { id:'ops',      label:'Ops Terminal',  sub:'Ask the council',  glyph:'OP', accent:'#4DD0E1', cam:{rx:70,ry:  0,tz:-160,ty:-380} },
  { id:'events',   label:'Launch Pad',    sub:'Upcoming schedule',glyph:'LP', accent:'#FF5D8F', cam:{rx:44,ry: 22,tz:  40,ty:-460} },
  { id:'contact',  label:'Airlock',       sub:'Get in touch',     glyph:'AL', accent:'#8DFF6B', cam:{rx:58,ry:-10,tz: -80,ty:-540} }
];

function hexToRgb(h){
  var n = parseInt(h.slice(1),16);
  return [(n>>16)&255,(n>>8)&255,n&255];
}

/* ============================================================
   STORE — functional updates only (bug #6)
   Every write receives the CURRENT snapshot, so a captured
   stale reference can never overwrite newer data.
   ============================================================ */
var Store = (function(){
  var KEY = 'nic.state.v2';
  var subs = [];
  var seed = {
    news:[
      { id:'n1', title:'CubeSat-1 clears vibration testing', tag:'Mission',      date:'2026-07-18', body:'The 1U structure survived a full random-vibe profile with no fastener loosening. Avionics integration begins next week.' },
      { id:'n2', title:'Paper accepted at NSSS',            tag:'Research',      date:'2026-07-09', body:'Our low-cost telemetry decoder work was accepted for the student track. Two second-years will present.' },
      { id:'n3', title:'640 school students at Sky Night',  tag:'Outreach',      date:'2026-06-28', body:'Largest public observation night yet — eleven telescopes, four campuses, one very clear sky.' },
      { id:'n4', title:'Autumn intake opens 12 August',     tag:'Announcement',  date:'2026-06-15', body:'Applications open to all years. No prior hardware experience needed for first-year applicants.' }
    ],
    missions:[
      { id:'m1', title:'CubeSat-1',   tag:'Avionics',        date:'Integration', body:'1U technology demonstrator carrying an atmospheric telemetry payload and a student-designed decoder chain.' },
      { id:'m2', title:'Project Vayu',tag:'Structures',      date:'Static fire',  body:'Solid-motor sounding rocket targeting 3km apogee with active recovery and onboard flight logging.' },
      { id:'m3', title:'Deep Field',  tag:'Payload Science', date:'Observing',    body:'Long-exposure astrophotography programme producing open-licensed image sets for the department archive.' },
      { id:'m4', title:'Ground Link', tag:'Avionics',        date:'Prototype',    body:'A campus-roof UHF ground station for tracking amateur satellites and receiving our own downlink.' }
    ],
    crew:[
      { id:'c1', name:'Aarav Menon',    role:'Council Chair' },
      { id:'c2', name:'Diya Raghavan',  role:'Avionics Lead' },
      { id:'c3', name:'Kabir Sethi',    role:'Structures Lead' },
      { id:'c4', name:'Meera Iyer',     role:'Payload Science' },
      { id:'c5', name:'Rohan Bhatt',    role:'Outreach Lead' },
      { id:'c6', name:'Ananya Kulkarni',role:'Systems Engineer' },
      { id:'c7', name:'Vikram Nair',    role:'Ground Segment' },
      { id:'c8', name:'Sara Qureshi',   role:'Treasurer' }
    ],
    events:[
      { id:'e1', when:'12 Aug',  title:'Autumn intake opens',       where:'Online form · all years' },
      { id:'e2', when:'24 Aug',  title:'Avionics bootcamp',         where:'Lab 204 · 6 sessions' },
      { id:'e3', when:'07 Sept', title:'Project Vayu static fire',   where:'Test range · ticketed' },
      { id:'e4', when:'19 Sept', title:'Sky Night public observing', where:'North lawn · open to all' },
      { id:'e5', when:'02 Oct',  title:'CubeSat-1 design review',    where:'Auditorium · livestreamed' }
    ]
  };

  function read(){
    try{
      var raw = localStorage.getItem(KEY);
      if(raw){ return JSON.parse(raw); }
    }catch(e){ /* private mode / quota — fall through to seed */ }
    return JSON.parse(JSON.stringify(seed));
  }

  var state = read();

  function persist(){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }
    catch(e){ /* non-fatal: session-only persistence */ }
  }

  return {
    get: function(){ return state; },
    /* updater receives the freshest state — never a closed-over copy */
    update: function(updater){
      var next = updater(state);
      if(next && next !== state){ state = next; }
      persist();
      subs.forEach(function(fn){ fn(state); });
      return state;
    },
    subscribe: function(fn){ subs.push(fn); fn(state); }
  };

  /* ---- FIRESTORE ADAPTER (drop-in) -------------------------
     Keep the same functional shape and staleness stays impossible:

     import { doc, runTransaction } from 'firebase/firestore';

     update: async function(updater){
       await runTransaction(db, async (tx) => {
         const ref  = doc(db, 'sites', 'nic');
         const snap = await tx.get(ref);          // freshest server state
         const next = updater(snap.data());       // pure function
         tx.set(ref, next);
       });
     }

     For live sync, replace read() with onSnapshot() and call
     subs.forEach(...) from inside the snapshot callback.
     Never write with a value captured outside the updater.
  ----------------------------------------------------------- */
})();

/* ============================================================
   TOAST
   ============================================================ */
var toastEl = $('#toast'), toastTimer = null;
function toast(msg){
  toastEl.textContent = msg;
  toastEl.setAttribute('data-show','true');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.setAttribute('data-show','false'); }, 3200);
}

/* ============================================================
   MODAL — focus trap, Esc, restore focus,
   and guaranteed close via finally (bug #5)
   ============================================================ */
var Modal = (function(){
  var root = $('#modal'), panel = $('#modalPanel');
  var elTitle = $('#modalTitle'), elBody = $('#modalBody');
  var btnOk = $('#modalConfirm'), btnNo = $('#modalCancel'), veil = $('#modalVeil');
  var lastFocus = null, onConfirm = null, open = false;

  var SEL = 'button:not([tabindex="-1"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function focusables(){
    return $$(SEL, panel).filter(function(el){ return el.offsetParent !== null; });
  }

  function close(){
    if(!open){ return; }
    open = false;
    root.setAttribute('data-open','false');
    document.body.setAttribute('data-locked','false');
    onConfirm = null;
    if(lastFocus && document.contains(lastFocus)){ lastFocus.focus(); }
    lastFocus = null;
  }

  function show(opts){
    lastFocus = document.activeElement;
    elTitle.textContent = opts.title;
    elBody.textContent  = opts.body;
    btnOk.textContent   = opts.confirmLabel || 'Confirm';
    btnOk.className     = 'btn btn--sm ' + (opts.danger ? 'btn--danger' : 'btn--primary');
    onConfirm = opts.onConfirm || null;
    open = true;
    root.setAttribute('data-open','true');
    document.body.setAttribute('data-locked','true');
    requestAnimationFrame(function(){ btnOk.focus(); });
  }

  btnOk.addEventListener('click', function(){
    var fn = onConfirm;
    try{
      if(fn){ fn(); }
    }catch(err){
      toast('Something went wrong. Nothing was changed.');
    }finally{
      /* closes whether the action succeeded, threw, or was a no-op */
      close();
    }
  });
  btnNo.addEventListener('click', close);
  veil.addEventListener('click', close);

  document.addEventListener('keydown', function(e){
    if(!open){ return; }
    if(e.key === 'Escape'){ e.preventDefault(); close(); return; }
    if(e.key !== 'Tab'){ return; }
    var f = focusables();
    if(!f.length){ return; }
    var first = f[0], last = f[f.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });

  return { show:show, close:close };
})();

/* ============================================================
   NAVIGATION — rail + dock
   ============================================================ */
var rail = $('#rail'), dock = $('#dock');

ROOMS.forEach(function(r,i){
  var p = document.createElement('button');
  p.type = 'button';
  p.className = 'pill';
  p.style.setProperty('--pa', r.accent);
  p.setAttribute('data-go', r.id);
  p.setAttribute('aria-current', i === 0 ? 'true' : 'false');
  p.innerHTML = '<span class="pill__dot" aria-hidden="true"></span><span class="pill__label">' + esc(r.label) + '</span>';
  p.setAttribute('aria-label', 'Go to ' + r.label);
  rail.appendChild(p);

  var d = document.createElement('button');
  d.type = 'button';
  d.className = 'dock__btn';
  d.style.setProperty('--pa', r.accent);
  d.setAttribute('data-go', r.id);
  d.setAttribute('aria-current', i === 0 ? 'true' : 'false');
  d.innerHTML = '<span class="dock__glyph" aria-hidden="true">' + esc(r.glyph) + '</span>' +
                '<span class="dock__label">' + esc(r.label.split(' ')[0]) + '</span>';
  d.setAttribute('aria-label', 'Go to ' + r.label);
  dock.appendChild(d);
});

document.addEventListener('click', function(e){
  var t = e.target.closest ? e.target.closest('[data-go]') : null;
  if(!t){ return; }
  goTo(t.getAttribute('data-go'));
});

function goTo(id){
  var el = document.getElementById(id);
  if(!el){ return; }
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block:'start' });
}

/* ============================================================
   ROOM STATE — camera, accent, HUD, counter, direction
   ============================================================ */
var scene = $('#scene');
var hudRoom = $('#hudRoom'), hudSub = $('#hudSub');
var cNow = $('#cNow'), cFill = $('#cFill');
var announce = $('#announce');
var main = $('#main');
var activeIndex = -1;

function setRoom(i){
  if(i === activeIndex || i < 0 || i >= ROOMS.length){ return; }
  activeIndex = i;
  var r = ROOMS[i];
  var rgb = hexToRgb(r.accent);

  document.documentElement.style.setProperty('--accent', r.accent);
  document.documentElement.style.setProperty('--accent-soft','rgba(' + rgb.join(',') + ',.14)');

  if(!reduce){
    scene.style.transform =
      'rotateX(' + r.cam.rx + 'deg) rotateY(' + r.cam.ry + 'deg) ' +
      'translate3d(0,' + r.cam.ty + 'px,' + r.cam.tz + 'px)';
  }

  hudRoom.textContent = r.label;
  hudSub.textContent  = r.sub;
  cNow.textContent    = String(i+1).padStart(2,'0');
  cFill.style.width   = (((i+1)/ROOMS.length)*100) + '%';
  announce.textContent = 'Room ' + (i+1) + ' of ' + ROOMS.length + ': ' + r.label + '. ' + r.sub + '.';

  $$('[data-go]', rail).forEach(function(el,idx){ el.setAttribute('aria-current', idx === i ? 'true':'false'); });
  $$('[data-go]', dock).forEach(function(el,idx){
    var on = idx === i;
    el.setAttribute('aria-current', on ? 'true':'false');
    if(on && el.scrollIntoView){
      /* keep the active dock item reachable — bug #2 */
      el.scrollIntoView({ behavior: reduce ? 'auto':'smooth', inline:'center', block:'nearest' });
    }
  });
}

/* direction-aware reveal */
var lastY = window.scrollY;
window.addEventListener('scroll', function(){
  var y = window.scrollY;
  if(Math.abs(y - lastY) > 4){
    main.setAttribute('data-dir', y > lastY ? 'down' : 'up');
    lastY = y;
  }
}, { passive:true });

/* room observer */
var roomObs = new IntersectionObserver(function(entries){
  var best = null;
  entries.forEach(function(en){
    if(en.isIntersecting && (!best || en.intersectionRatio > best.intersectionRatio)){ best = en; }
  });
  if(best){
    var idx = ROOMS.findIndex(function(r){ return r.id === best.target.id; });
    setRoom(idx);
  }
}, { threshold:[.25,.5,.75], rootMargin:'-10% 0px -10% 0px' });

ROOMS.forEach(function(r){
  var el = document.getElementById(r.id);
  if(el){ roomObs.observe(el); }
});

/* reveal observer */
var revealObs = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting){
      en.target.classList.add('is-in');
      revealObs.unobserve(en.target);
    }
  });
}, { threshold:.12, rootMargin:'0px 0px -6% 0px' });

function observeReveals(){
  $$('.reveal:not(.is-in)').forEach(function(el){ revealObs.observe(el); });
}

/* keyboard room navigation */
document.addEventListener('keydown', function(e){
  if($('#modal').getAttribute('data-open') === 'true'){ return; }
  var tag = (document.activeElement && document.activeElement.tagName) || '';
  if(/INPUT|TEXTAREA|SELECT/.test(tag)){ return; }
  var i = activeIndex;
  if(e.key === 'ArrowDown' || e.key === 'PageDown'){ e.preventDefault(); goTo(ROOMS[Math.min(i+1,ROOMS.length-1)].id); }
  else if(e.key === 'ArrowUp' || e.key === 'PageUp'){ e.preventDefault(); goTo(ROOMS[Math.max(i-1,0)].id); }
  else if(e.key === 'Home'){ e.preventDefault(); goTo(ROOMS[0].id); }
  else if(e.key === 'End'){ e.preventDefault(); goTo(ROOMS[ROOMS.length-1].id); }
});

/* ============================================================
   MOTES
   ============================================================ */
if(!reduce){
  var motes = $('#motes'), frag = document.createDocumentFragment();
  for(var m=0;m<26;m++){
    var s = document.createElement('span');
    s.className = 'mote';
    s.style.left = (Math.random()*100).toFixed(2) + '%';
    s.style.top  = (60 + Math.random()*50).toFixed(2) + '%';
    s.style.animationDuration = (14 + Math.random()*18).toFixed(1) + 's';
    s.style.animationDelay = (-Math.random()*20).toFixed(1) + 's';
    s.style.opacity = (0.18 + Math.random()*0.4).toFixed(2);
    frag.appendChild(s);
  }
  motes.appendChild(frag);
}

/* ============================================================
   RENDERERS
   ============================================================ */
function initials(name){
  var parts = String(name).trim().split(/\s+/).filter(Boolean);
  if(!parts.length){ return '?'; }
  if(parts.length === 1){ return parts[0].slice(0,2).toUpperCase(); }
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
}
function hueOf(str){
  var h = 0;
  for(var i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) % 360; }
  return h;
}
function fmtDate(iso){
  var d = new Date(iso);
  if(isNaN(d)){ return iso; }
  return d.toLocaleDateString(undefined,{ day:'2-digit', month:'short', year:'numeric' });
}

function renderCards(host, items, opts){
  host.innerHTML = '';
  if(!items.length){
    host.innerHTML = '<p class="empty">Nothing here yet.</p>';
    return;
  }
  items.forEach(function(it){
    var a = document.createElement('article');
    a.className = 'card news__item';
    var html =
      '<p class="news__meta">' +
        '<span class="tag">' + esc(it.tag) + '</span>' +
        '<span class="news__date">' + esc(opts.rawDate ? it.date : fmtDate(it.date)) + '</span>' +
      '</p>' +
      '<h3>' + esc(it.title) + '</h3>' +
      '<p class="news__body">' + esc(it.body) + '</p>';
    if(opts.deletable){
      html += '<div class="news__actions">' +
              '<button class="btn btn--ghost btn--sm" type="button" data-del="' + esc(it.id) + '">Delete</button>' +
              '</div>';
    }
    a.innerHTML = html;
    host.appendChild(a);
  });
}

function renderCrew(host, items){
  host.innerHTML = '';
  items.forEach(function(p){
    var d = document.createElement('div');
    d.className = 'member';
    d.innerHTML =
      '<div class="avatar" style="--h:' + hueOf(p.name) + ';" aria-hidden="true">' + esc(initials(p.name)) + '</div>' +
      '<p class="member__name">' + esc(p.name) + '</p>' +
      '<p class="member__role">' + esc(p.role) + '</p>';
    host.appendChild(d);
  });
}

function renderEvents(host, items){
  host.innerHTML = '';
  items.forEach(function(ev){
    var li = document.createElement('li');
    li.className = 'event';
    li.innerHTML =
      '<p class="event__when">' + esc(ev.when) + '</p>' +
      '<div class="event__what">' +
        '<p class="event__title">' + esc(ev.title) + '</p>' +
        '<p class="event__where">' + esc(ev.where) + '</p>' +
      '</div>' +
      '<button class="btn btn--ghost btn--sm" type="button" data-rsvp="' + esc(ev.title) + '">Remind me</button>';
    host.appendChild(li);
  });
}

Store.subscribe(function(s){
  renderCards($('#newsGrid'),    s.news,     { deletable:true });
  renderCards($('#missionGrid'), s.missions, { rawDate:true });
  renderCrew($('#crewGrid'),     s.crew);
  renderEvents($('#eventList'),  s.events);
  observeReveals();
});

/* delete flow — confirm in modal, close guaranteed */
$('#newsGrid').addEventListener('click', function(e){
  var btn = e.target.closest('[data-del]');
  if(!btn){ return; }
  var id = btn.getAttribute('data-del');
  var item = Store.get().news.filter(function(n){ return n.id === id; })[0];
  Modal.show({
    title:'Delete this update?',
    body:'"' + (item ? item.title : 'This update') + '" will be removed permanently. This cannot be undone.',
    confirmLabel:'Delete',
    danger:true,
    onConfirm:function(){
      Store.update(function(prev){
        return Object.assign({}, prev, {
          news: prev.news.filter(function(n){ return n.id !== id; })
        });
      });
      toast('Update deleted.');
    }
  });
});

$('#eventList').addEventListener('click', function(e){
  var btn = e.target.closest('[data-rsvp]');
  if(!btn){ return; }
  Modal.show({
    title:'Add a reminder',
    body:'We will email you 24 hours before "' + btn.getAttribute('data-rsvp') + '". Confirm to register your interest.',
    confirmLabel:'Remind me',
    onConfirm:function(){ toast('Reminder registered.'); }
  });
});

/* ============================================================
   FORMS — inline validation, no native bubbles
   ============================================================ */
function setErr(input, errEl, msg){
  errEl.textContent = msg || '';
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

$('#newsForm').addEventListener('submit', function(e){
  e.preventDefault();
  var t = $('#nTitle'), b = $('#nBody'), ok = true;
  setErr(t, $('#nTitleErr'), '');
  setErr(b, $('#nBodyErr'), '');
  if(!t.value.trim()){ setErr(t, $('#nTitleErr'), 'A headline is required.'); ok = false; }
  if(b.value.trim().length < 12){ setErr(b, $('#nBodyErr'), 'Write at least 12 characters.'); ok = false; }
  if(!ok){ (t.getAttribute('aria-invalid') === 'true' ? t : b).focus(); return; }

  var payload = {
    id: 'n' + Date.now(),
    title: t.value.trim(),
    tag: $('#nTag').value,
    date: new Date().toISOString().slice(0,10),
    body: b.value.trim()
  };
  /* functional update — always prepends to the freshest list */
  Store.update(function(prev){
    return Object.assign({}, prev, { news: [payload].concat(prev.news) });
  });
  this.reset();
  toast('Update published.');
});

$('#joinForm').addEventListener('submit', function(e){
  e.preventDefault();
  var n = $('#jName'), m = $('#jMail'), w = $('#jWhy'), ok = true;
  setErr(n, $('#jNameErr'), ''); setErr(m, $('#jMailErr'), ''); setErr(w, $('#jWhyErr'), '');
  if(!n.value.trim()){ setErr(n, $('#jNameErr'), 'Please tell us your name.'); ok = false; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.value.trim())){ setErr(m, $('#jMailErr'), 'Enter a valid email address.'); ok = false; }
  if(w.value.trim().length < 20){ setErr(w, $('#jWhyErr'), 'A little more detail, please — at least 20 characters.'); ok = false; }
  if(!ok){
    var bad = $$('[aria-invalid="true"]', this)[0];
    if(bad){ bad.focus(); }
    return;
  }
  Modal.show({
    title:'Application received',
    body:'Thanks, ' + n.value.trim().split(/\s+/)[0] + '. The ' + $('#jDiv').value + ' lead will be in touch within a week.',
    confirmLabel:'Done',
    onConfirm:function(){ toast('Application submitted.'); }
  });
  this.reset();
});

/* ============================================================
   OPS TERMINAL
   ============================================================ */
var termLog = $('#termLog');
function line(text, kind){
  var p = document.createElement('p');
  p.className = 'term__line term__line--' + kind;
  p.textContent = text;
  termLog.appendChild(p);
  termLog.scrollTop = termLog.scrollHeight;
  return p;
}
function typeOut(text){
  if(reduce){ line(text,'out'); return; }
  var p = line('', 'out'), i = 0;
  (function tick(){
    p.textContent = text.slice(0, ++i);
    termLog.scrollTop = termLog.scrollHeight;
    if(i < text.length){ setTimeout(tick, 12); }
  })();
}

/* Replace the body of this function with a fetch() to your model endpoint. */
function askCouncil(q){
  var s = Store.get();
  var k = q.toLowerCase();
  if(!k){ return 'Type something, or try: help'; }
  if(/^help$/.test(k)){
    return 'Commands: missions · crew · news · launch · join · clear. Or ask a question in plain English.';
  }
  if(/^clear$/.test(k)){ termLog.innerHTML = ''; return 'Session cleared.'; }
  if(/mission|project|build/.test(k)){
    return 'Active programmes: ' + s.missions.map(function(m){ return m.title + ' (' + m.date + ')'; }).join(' · ');
  }
  if(/crew|team|who|council|lead/.test(k)){
    return 'Council: ' + s.crew.map(function(c){ return c.name + ' — ' + c.role; }).join(' · ');
  }
  if(/news|update|latest/.test(k)){
    return s.news.length ? 'Latest: ' + s.news[0].title + ' (' + fmtDate(s.news[0].date) + ')' : 'No updates posted yet.';
  }
  if(/launch|event|when|schedule/.test(k)){
    return s.events.length ? 'Next up: ' + s.events[0].title + ' on ' + s.events[0].when + ' — ' + s.events[0].where : 'Nothing scheduled.';
  }
  if(/join|apply|member|intake|recruit/.test(k)){
    return 'Autumn intake opens 12 August, open to all years. Head to the Airlock room and submit the form.';
  }
  if(/cubesat/.test(k)){
    return 'CubeSat-1 is a 1U technology demonstrator. Structure has cleared vibration testing; avionics integration is next.';
  }
  return 'No local match for that. Try: help · missions · crew · news · launch · join';
}

$('#termForm').addEventListener('submit', function(e){
  e.preventDefault();
  var input = $('#termIn');
  var q = input.value.trim();
  if(!q){ return; }
  line(q, 'in');
  input.value = '';
  var res = askCouncil(q);
  setTimeout(function(){ typeOut(res); }, 160);
});

$$('[data-cmd]').forEach(function(c){
  c.addEventListener('click', function(){
    $('#termIn').value = c.getAttribute('data-cmd');
    $('#termForm').dispatchEvent(new Event('submit'));
    $('#termIn').focus();
  });
});

line('council://ops v2.0 — local session, no data leaves this device.', 'sys');
line('Type "help" to see what I can answer.', 'sys');

/* ============================================================
   SPLASH TEARDOWN
   ============================================================ */
var splash = $('#splash');
var splashDone = false;
function endSplash(){
  if(splashDone){ return; }
  splashDone = true;
  splash.setAttribute('data-done','true');
  document.body.setAttribute('data-locked','false');
  setTimeout(function(){
    splash.remove();
    setRoom(0);
    observeReveals();
    var h = $('#atrium h1');
    if(h){ h.setAttribute('tabindex','-1'); h.focus({ preventScroll:true }); }
  }, reduce ? 0 : 820);
}
document.body.setAttribute('data-locked','true');
$('#splashSkip').addEventListener('click', endSplash);
document.addEventListener('keydown', function(e){
  if(!splashDone && (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ')){ endSplash(); }
});
setTimeout(endSplash, reduce ? 350 : 2450);

/* deep-link support */
if(location.hash){
  var target = location.hash.slice(1);
  if(ROOMS.some(function(r){ return r.id === target; })){
    setTimeout(function(){ goTo(target); }, reduce ? 400 : 2700);
  }
}

/* first paint */
setRoom(0);
observeReveals();

})();
</script>
</body>
</html>