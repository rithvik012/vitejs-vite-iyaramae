import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, onSnapshot, addDoc, updateDoc, 
  deleteDoc, doc, setDoc, getDocs, getDoc 
} from "firebase/firestore";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  onAuthStateChanged, signOut 
} from "firebase/auth";
import { 
  Activity, Aperture, Archive, ArrowUpRight, BookOpen, Crown, 
  Eye, Globe, HardDrive, Hexagon, Lock, Mail, Pencil, Phone, 
  Plus, Send, Settings, Trash2, Unlock, Users, X, Zap, Target, 
  TrendingUp, LogOut, LogIn, UserPlus, ChevronDown, ChevronUp, 
  CheckCircle, AlertCircle, DollarSign, Radio
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

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);
const ADMIN_KEY = "saturday";
const EJS = { svc:'service_2007', tpl:'template_a63y975', key:'PE32og5tBpVl8pzhT' };

// ─── ROOMS ─────────────────────────────────────────────────────────────────────
const ROOMS = [
  { id:'dash',    label:'Atrium',       sub:'Command Overview',      glyph:'AT', accent:'#5B8CFF', cam:'rotateX(52deg) translate3d(0,0,-120px)' },
  { id:'hq',      label:'Briefing Room',sub:'Executive Core',        glyph:'BR', accent:'#00D3A7', cam:'rotateX(60deg) rotateY(-14deg) translate3d(0,-60px,-40px)' },
  { id:'vault',   label:'Mission Bay',  sub:'Active Submissions',    glyph:'MB', accent:'#FF7A45', cam:'rotateX(46deg) rotateY(16deg) translate3d(0,-140px,60px)' },
  { id:'crew',    label:'Crew Quarters',sub:'Unit Directory',        glyph:'CQ', accent:'#B388FF', cam:'rotateX(64deg) rotateY(8deg) translate3d(0,-220px,-20px)' },
  { id:'news',    label:'Comms Deck',   sub:'Broadcasts & News',     glyph:'CD', accent:'#FFD166', cam:'rotateX(50deg) rotateY(-20deg) translate3d(0,-300px,100px)' },
  { id:'ai',      label:'Ops Terminal', sub:'Intelligence Core',     glyph:'OP', accent:'#4DD0E1', cam:'rotateX(70deg) translate3d(0,-380px,-160px)' },
  { id:'fin',     label:'Launch Pad',   sub:'Financial Command',     glyph:'LP', accent:'#FF5D8F', cam:'rotateX(44deg) rotateY(22deg) translate3d(0,-460px,40px)' },
  { id:'register',label:'Airlock',      sub:'Join Unit Z649',        glyph:'AL', accent:'#8DFF6B', cam:'rotateX(58deg) rotateY(-10deg) translate3d(0,-540px,-80px)' }
];

// ─── QUOTES ────────────────────────────────────────────────────────────────────
const QUOTES = [
  '"Architecture is the learned game, correct and magnificent, of forms assembled in the light." – Le Corbusier',
  '"Form ever follows function." – Louis Sullivan',
  '"Less is more." – Ludwig Mies van der Rohe',
  '"There are 360 degrees, so why stick to one?" – Zaha Hadid',
  '"Architecture should speak of its time and place, but yearn for timelessness." – Frank Gehry',
  '"A room is not a room without natural light." – Louis Kahn',
  '"To create, one must first question everything." – Eileen Gray',
  '"Recognizing the need is the primary condition for design." – Charles Eames'
];

// ─── COMPREHENSIVE AI KNOWLEDGE BASE ──────────────────────────────────────────
const AI_KB = [
  { p:[/^help$/,/what can you do/,/commands/], a:'I can answer questions about NASA India, all trophies and competitions, architecture theory, our unit treasury, crew, vault, and more. If I don\'t know it locally, I will search the global databanks. Ask freely — try: "What is the LIK Trophy?", "explain vernacular architecture", "what is ANC?", "treasury balance".' },
  { p:[/nasa india.*what|what.*nasa india|about nasa india|nasa india overview/], a:'NASA India (National Association of Students of Architecture) is the largest and most prestigious student body of architecture students in Asia. Founded in 1956, it represents over 40,000 students from 400+ architecture colleges across India, organized into 6 geographic zones. Each college has a registered Unit (e.g., Unit Z649 from RSA Chennai, Zone 6). NASA India operates under the guidance of the Council of Architecture (COA) and conducts the Annual NASA Convention (ANC) every year, which is the largest student architecture event in Asia.' },
  { p:[/nasa india zone|zone system|zone 6/], a:'NASA India divides India into 6 geographic zones:\n• Zone 1 — North\n• Zone 2 — East\n• Zone 3 — West\n• Zone 4 — Central\n• Zone 5 — South\n• Zone 6 — Tamil Nadu (Tamil Nadu units including RSA Unit Z649)\nEach zone conducts its own zonal convention before the national ANC.' },
  { p:[/unit designee|ud role|what.*ud/], a:'The Unit Designee (UD) is the official representative and head of a NASA India unit. The UD:\n• Represents the unit at all NASA India functions including ANC\n• Signs official documents and correspondence\n• Manages the unit\'s NASA registration and dues\n• Leads the team at workshops, trophies, and competitions\n• Maintains coordination with the zonal secretary and national council\nThe UD must be an enrolled student at the institution. Unit Z649\'s UD heads the RSA Chennai chapter.' },
  { p:[/usec|unit secretary|what.*usec/], a:'The Unit Secretary (USEC) is the second-in-command of a NASA India unit, handling administration and documentation. Responsibilities include:\n• Maintaining official records and correspondence\n• Managing member registrations and databases\n• Coordinating with the UD for event participation\n• Documenting all unit activities for the annual report\n• Handling internal communications\nThe USEC works closely with the UD and coordinators to ensure smooth unit operations.' },
  { p:[/anc|annual nasa convention|nasa convention|68th/], a:'The Annual NASA Convention (ANC) is the flagship event of NASA India, held every year at a different host institution across India. The 68th ANC is currently in preparation phase.\n\nAt ANC, participating units compete in:\n• Architecture trophies (LIK, MSL, Khosla, etc.)\n• Workshop programs on various design themes\n• Cultural and creative events\n• Debates, quizzes, and academic discussions\n\nDelegates (students) are selected from each unit.' },
  { p:[/workshop.*anc|anc.*workshop|workshop selection|how.*select workshop/], a:'Workshops at ANC cover diverse themes in architecture and allied fields. Workshop selection process:\n1. Study all available workshops listed on the NASA India portal (nasaindia.co)\n2. Identify workshops relevant to your design interests and skill set\n3. Prepare your portfolio and abstract as per the workshop requirements\n4. Submit during the online registration window\n5. Workshop allocation is subject to availability and shortlisting\n\nTips:\n• Apply early — popular workshops fill quickly\n• Align your workshop with your unit\'s trophy focus (e.g., if competing in LIK, choose a heritage workshop)\n• Prepare a strong statement of purpose for design workshops\n• Check prerequisites — some workshops require CAD/model skills' },
  { p:[/delegate|who.*delegate|delegate.*selection/], a:'Delegates are student members selected by the UD to represent the unit at ANC. Selection is typically based on:\n• Academic performance and design portfolio\n• Participation in unit activities and trophies\n• Ability to represent RSA and NASA India professionally\n• Financial commitment (delegate fees)\n\nEach unit typically sends 3–10 delegates.' },
  { p:[/lik|louis.*kahn|kahn trophy|heritage.*trophy|unrecorded heritage/], a:'The Louis I. Kahn (LIK) Trophy is NASA India\'s most prestigious competition, focused on documenting UNRECORDED HERITAGE architecture — buildings and spaces that are architecturally, historically, or culturally significant but have never been formally documented.\n\nKey requirements:\n• Site: An unrecorded vernacular or historical structure\n• Documentation: Architectural drawings (plans, sections, elevations), site analysis, historical research\n• Drawings: Must include measured drawings, axonometrics, and details\n• Report: Written documentation of history, significance, structural system\n• Scale: Typically 1:50 to 1:200 depending on structure size\n\nFocus areas for strong LIK entries:\n• Vernacular spatial configurations (courtyards, thinnai, agraharam typologies)\n• Indigenous materials and construction (lime mortar, laterite, timber joinery)\n• Climate-responsive design (cross-ventilation, thermal mass, shading devices)\n• Community significance and current use\n• Risk assessment and conservation recommendations\n\nSubmission format: Physical panels (typically A0 size) + digital files uploaded to the NASA portal.' },
  { p:[/msl|landscape.*trophy|shaheer|mohammad shaheer|velachery/], a:'The Mohammad Shaheer Landscape (MSL) Trophy focuses on landscape architecture and urban open space design. It honors the legacy of Prof. Mohammad Shaheer, a pioneer of landscape architecture in India.\n\nCompetition requirements:\n• Site: An urban public space, park, waterfront, or landscape zone\n• Design: Full landscape design proposal with master plan\n• Drawings: Site plan, sections, planting plan, circulation plan, detail drawings\n• Analysis: Topography, hydrology, ecology, social use patterns\n• Concept: A clear landscape narrative linking ecology with human experience\n\nFor our Unit Z649 submission (Velachery site):\n• Concept: "The Hydro-Social Connector" — treating urban flooding as a resource\n• Bio-swales and rain gardens to manage stormwater\n• Topographical grading for water channeling\n• Social infrastructure: community spaces, food gardens, walking trails\n• Ecological zones: native planting, bird habitats, butterfly gardens\n\nKey landscape design principles:\n• Biophilic design — connecting humans to nature\n• Ecological systems thinking — biodiversity, hydrology, soil health\n• Social equity — accessible design for all user groups\n• Climate resilience — urban heat island mitigation' },
  { p:[/khosla|khosla award|khosla trophy/], a:'The Khosla Award is a NASA India competition focused on housing design — specifically addressing the need for affordable, dignified, and contextually appropriate housing for underserved communities in India.\n\nThe competition typically involves:\n• Designing housing for a specific marginalized community (fishermen, weavers, slum dwellers)\n• Integrating traditional building techniques with modern requirements\n• Achieving cost-efficient design without sacrificing spatial quality\n• Community participation in the design process\n\nKey evaluation criteria:\n• Cultural sensitivity and community context\n• Structural ingenuity and material efficiency\n• Spatial quality per square foot\n• Environmental performance\n• Economic viability for the target income group' },
  { p:[/dorabji|tata award|sir dorabji|tata trophy/], a:'The Sir Dorabji Tata Award is a NASA India competition focusing on urban design and city-scale interventions. It typically involves:\n• Redesigning or reimagining a significant urban fragment\n• Addressing issues of mobility, density, public space, and infrastructure\n• Integration of mixed uses and social programming\n• Context-sensitive urban form and character\n\nThe competition requires strategic master planning skills, urban analysis, and the ability to design at multiple scales simultaneously — from the city to the street to the building.' },
  { p:[/le corbusier|corbusier|five points/], a:'Le Corbusier (1887–1965), born Charles-Édouard Jeanneret, was the father of modern architecture. His Five Points of New Architecture defined Modernism:\n1. Pilotis — columns lifting the building off the ground, freeing the ground plane\n2. Free plan — flexible floor layouts enabled by structural columns\n3. Free façade — non-load-bearing exterior walls, enabling ribbon windows\n4. Horizontal window — maximizing natural light and views\n5. Roof garden — reclaiming nature at roof level\n\nKey works: Villa Savoye, Chandigarh Capitol Complex, Unité d\'Habitation\nKey quotes: "A house is a machine for living in." "Architecture is the masterly, correct, and magnificent play of masses brought together in light."' },
  { p:[/mies van der rohe|mies|less is more/], a:'Ludwig Mies van der Rohe (1886–1969) was the master of minimalist, steel-and-glass architecture. His philosophy:\n• "Less is more" — pure, unornamented architecture expressing structure honestly\n• "God is in the details" — perfection in construction and material joints\n• The universal space — flexible, open floor plans adaptable to any use\n• Materiality — truth to materials: exposed steel, plate glass, travertine marble\n\nKey works: Barcelona Pavilion, Farnsworth House, Seagram Building, Illinois Institute of Technology\nHis legacy: the glass curtain wall became the defining image of 20th-century corporate architecture.' },
  { p:[/zaha hadid|zaha|parametric|deconstructivism/], a:'Zaha Hadid (1950–2016) was the first woman to win the Pritzker Prize (2004). Her work pioneered parametric and deconstructivist architecture:\n• Fluid, non-linear forms inspired by natural processes\n• Parametric design — using computational algorithms to generate complex geometries\n• Rejection of the 90-degree angle — architecture as landscape\n• Material innovation — complex concrete formwork, aluminum cladding, ETFE membranes\n\nKey works: MAXXI Museum Rome, Guangzhou Opera House, Heydar Aliyev Center, BMW Central Building\nQuote: "There are 360 degrees, so why stick to one?"' },
  { p:[/louis kahn|lou kahn|kahn.*architect/], a:'Louis I. Kahn (1901–1974) was an American architect celebrated for his monumental, spiritual approach to light and structure.\n• "Silence and Light" — architecture as the transition between unmeasurable potential and measurable form\n• Served vs. servant spaces — large served rooms flanked by smaller servant spaces (mechanical, structural)\n• Brick, concrete, and travertine as primary materials, expressed honestly\n• Natural light as a primary design element — "A room is not a room without natural light"\n\nKey works: Salk Institute, Kimbell Art Museum, Bangladesh National Assembly\nThe LIK Trophy is named in his honor, celebrating his belief in documenting and learning from existing architecture.' },
  { p:[/frank lloyd wright|wright|organic architecture/], a:'Frank Lloyd Wright (1867–1959) founded organic architecture — buildings in harmony with nature and their inhabitants.\n• Prairie Style — horizontal lines echoing the American landscape, open plans, low overhangs\n• Organic architecture — form emerging from site, material, and purpose\n• "Destroy the box" — breaking down the traditional room into flowing space\n• Integration of building and landscape\n\nKey works: Fallingwater, Guggenheim Museum NYC, Taliesin, Usonian Houses\nQuote: "The longer I live, the more beautiful life becomes."' },
  { p:[/tadao ando|ando|concrete.*architecture|light.*architecture/], a:'Tadao Ando (born 1941) is a self-taught Japanese architect renowned for his minimalist, spiritually charged use of raw concrete.\n• Brutalist aesthetics softened by precise light control\n• "Architecture of silence" — stripping spaces to their essence\n• Slit windows, courtyards, and reflecting pools to introduce natural light\n• The Church of Light — a concrete cube with a cross cut in the east wall, flooding the altar with morning light\n\nKey works: Church of the Light, Pulitzer Arts Foundation, Modern Art Museum Fort Worth, 21_21 Design Sight Tokyo' },
  { p:[/vernacular architecture|vernacular|indigenous building|traditional architecture/], a:'Vernacular architecture refers to buildings designed without professional architects, using local materials, construction techniques, and spatial typologies developed over generations in response to climate, culture, and available resources.\n\nKey characteristics:\n• Climate-responsive passive design (thick walls for thermal mass, courtyard for ventilation)\n• Local materials (laterite, lime, mud brick, bamboo, timber)\n• Community-built knowledge passed through craft guilds and families\n• Cultural symbolism embedded in spatial hierarchy\n• Flexibility and adaptability over time\n\nExamples in India:\n• Tamil Nadu: Agraharam row houses, chettinad mansions with lime plaster and Athangudi tiles\n• Kerala: Nalukettu courtyard houses with sloping tiled roofs\n• Rajasthan: Havelis with jali screens and stepwells (vav)\n• Bengal: Terracotta temples with curvilinear bangla roofs\n\nVernacular documentation is the focus of the LIK Trophy.' },
  { p:[/parametric.*design|computational.*design|grasshopper|rhino/], a:'Parametric design uses computational algorithms to create architecture where form is driven by defined parameters (constraints and variables). Tools:\n• Grasshopper (visual programming plugin for Rhino) — most common parametric design tool\n• Rhino 3D — base modeling platform\n• Dynamo — parametric tool for Revit/BIM\n• Processing, Python scripting — custom algorithms\n\nKey concepts:\n• Generative design — algorithms create thousands of design options\n• Structural optimization — finding the most efficient form for a load condition\n• Environmental simulation — wind, solar, acoustic analysis driving form\n• Digital fabrication — CNC milling, laser cutting, 3D printing from parametric models\n\nLearning path: Start with Rhino → Grasshopper basics → Kangaroo for physics simulation → Karamba for structural analysis' },
  { p:[/biophilic|biophilia|nature.*design|green.*building/], a:'Biophilic design integrates nature into the built environment based on humans\' innate affinity for natural systems.\n\n14 Patterns of Biophilic Design:\n1. Visual connection with nature (views, green walls)\n2. Non-visual connection (birdsong, water sounds, breezes)\n3. Non-rhythmic sensory stimuli (movement of leaves, rippling water)\n4. Thermal & airflow variability\n5. Presence of water\n6. Dynamic & diffuse light\n7. Connection with natural systems (seasons, weather)\n8. Biomorphic forms & patterns (fractal geometry, organic shapes)\n9. Material connection with nature (wood, stone, rammed earth)\n10. Complexity & order (fractal depth, spatial hierarchy)\n11. Prospect (views over landscape)\n12. Refuge (sheltered, enclosed spaces)\n13. Mystery (implied invitation to explore)\n14. Awe (transcendent scale and sublime experience)\n\nApplications: Living walls, sky gardens, material authenticity, natural ventilation, daylight design.' },
  { p:[/documentation.*architecture|how.*document|measured drawing|architectural survey/], a:'Architectural documentation methods for competitions like LIK Trophy:\n\nTools needed:\n• Measuring tape (30m, 5m), laser distance meter\n• Compass (for orientation)\n• Camera (DSLR preferred, or phone with RAW capability)\n• Graph paper, pencils for field sketches\n• AutoCAD or ArchCAD for final drawings\n\nProcess:\n1. Reconnaissance visit — understand overall spatial organization\n2. Site survey — measure all key dimensions, document on field sketches\n3. Photography — systematic documentation from all angles, with scale reference\n4. Historical research — local archives, oral histories, regional architectural literature\n5. Drawing production — plans, sections, elevations at appropriate scales (1:100, 1:50)\n6. Detail drawings — structural joints, ornamental details at 1:10 or 1:5\n7. Report writing — historical context, significance, current condition, conservation recommendations\n\nKey scales:\n• Site plan: 1:500 or 1:1000\n• Floor plans & elevations: 1:100 or 1:50\n• Section details: 1:20 or 1:10\n• Material details: 1:5 or 1:2' },
  { p:[/construction.*system|structure.*building|rcc|steel structure|load bearing/], a:'Major building structural systems:\n\nRCC (Reinforced Cement Concrete):\n• Most common in India — columns, beams, slabs\n• Advantages: moldable to any form, fire-resistant, durable\n• Components: Footing → Column → Beam → Slab (bottom-up sequence)\n\nLoad-Bearing Masonry:\n• Walls carry loads directly — no separate column-beam frame\n• Material: brick, stone, concrete block\n• Limited to low-rise (typically < 4 floors)\n• Better thermal performance than RCC framing\n\nSteel Frame:\n• Advantages: fast construction, long spans, demountable\n• Used for industrial buildings, high-rises, large-span roofs\n• Requires fire protection cladding\n\nPre-stressed Concrete:\n• Steel tendons pre-tensioned or post-tensioned to allow longer spans\n• Used in bridges, parking structures, flat plate floors\n\nTiber Frame / Timber:\n• Traditional and resurgent modern technique\n• Cross-Laminated Timber (CLT) for multi-storey sustainable construction\n• India: heritage timber buildings in Kerala, Himachal, Gujarat' },
  { p:[/urban planning|urban design|master plan|zoning|fsi|far/], a:'Urban Planning & Design key concepts:\n\nFSI/FAR (Floor Space Index / Floor Area Ratio):\n• Ratio of total built-up area to plot area\n• Higher FSI = more density allowed\n• Example: FSI 2.5 on a 1000 sqm plot allows 2500 sqm total floor area\n• Chennai FSI: varies by zone — OMR/IT corridor has higher FSI than residential areas\n\nZoning:\n• Residential, Commercial, Industrial, Institutional, Agricultural, Green/Open Space\n• Setbacks required from plot boundaries and roads\n• Ground coverage limits (% of plot that can be built on)\n\nMaster Plan:\n• Long-term framework (typically 20 years) for city growth\n• Includes transportation, land use, water, green space, heritage zones\n• Chennai Master Plan 2026 governs development in our region\n\nUrban Design Principles:\n• Legibility (Kevin Lynch) — paths, edges, districts, nodes, landmarks\n• Eyes on the street (Jane Jacobs) — active frontages for safety\n• Transit-Oriented Development (TOD) — density around transit nodes\n• Complete streets — designed for pedestrians, cyclists, and vehicles equally' },
  { p:[/passive design|passive cooling|climate.*design|thermal.*comfort/], a:'Passive climate design strategies for Indian context:\n\nFor Hot-Dry Climate (Rajasthan, Gujarat, interior Deccan):\n• Thick masonry walls (thermal mass)\n• Small windows on west and south, larger on north\n• Courtyards with vegetation and water features\n• Evaporative cooling (jali screens, fountains)\n• Jalis (perforated screens) for filtered ventilation\n\nFor Hot-Humid Climate (Chennai, Kerala, coastal India):\n• Elevated structures (pilotis) for ground breeze\n• Large openings on north and south for cross-ventilation\n• Verandahs and deep overhangs for solar shading\n• Light materials (tiles, timber) to minimize thermal mass\n• East-west elongated building form to minimize east/west sun exposure\n\nFor Composite Climate (Delhi, Bangalore):\n• Combination strategies for summer and winter\n• Operable windows for seasonal adjustment\n• Green roofs and cool roofs to reduce heat gain\n\nTools for climate analysis: Climate Consultant software, Weather Tool (Autodesk), Ecotect, Ladybug/Honeybee in Grasshopper' },
  { p:[/heritage conservation|conservation.*architecture|restoration|adaptive reuse/], a:'Heritage Conservation in India:\n\nLegislative Framework:\n• Ancient Monuments and Archaeological Sites and Remains Act, 1958 — ASI jurisdiction\n• State heritage acts (Tamil Nadu has THANMACHI for state-listed heritage)\n• UNESCO World Heritage Conventions — India has 40+ World Heritage Sites\n\nGrades of Heritage (INTACH classification):\n• Grade I: National monuments — no alterations, ASI controls\n• Grade II-A: Heritage precincts — limited alterations with permission\n• Grade II-B: Heritage buildings — alterations possible with sensitivity\n• Grade III: Locally significant — encouraged for preservation\n\nConservation Approaches:\n• Preservation: Maintaining existing fabric without alteration\n• Restoration: Returning a structure to original state using original materials/methods\n• Rehabilitation: Enabling continued use through modification\n• Adaptive Reuse: Converting heritage building to new use (mill to museum, warehouse to gallery)\n• Reconstruction: Rebuilding a lost structure using documented evidence\n\nKey principle: Reversibility — all conservation interventions should be reversible without damaging original fabric.' },
  { p:[/autocad|cad drawing|drafter|drafting/], a:'AutoCAD tips for architecture students:\n\nEssential commands:\n• LINE, PLINE, ARC, CIRCLE, RECTANGLE\n• TRIM, EXTEND, OFFSET, MIRROR, ARRAY\n• HATCH (for section patterns), BHATCH for boundary hatching\n• DIMENSION (DIMLINEAR, DIMALIGNED, DIMANGULAR)\n• BLOCK / INSERT for reusable elements (doors, windows, furniture)\n• XREF (external reference) for large projects split across files\n• LAYER management — separate layers for walls, windows, furniture, dimensions, hatch\n\nDrawing standards:\n• 0 layer for construction lines (white/black)\n• Walls: lineweight 0.5–0.7mm, color 1 (red)\n• Furniture: lineweight 0.25mm\n• Dimensions: separate layer, color 5 (blue)\n• Always draw at 1:1 scale — use PLOT/PRINT to set drawing scale\n\nFor LIK/MSL submissions:\n• Set up a title block with project name, scale bar, north arrow\n• Use LTSCALE to manage line type scales for different plot scales' },
  { p:[/sketchup|3d model|revit|bim/], a:'3D Modeling tools for architecture:\n\nSketchUp:\n• Best for: Quick 3D massing, conceptual design, client presentations\n• Strengths: Intuitive push-pull modeling, large 3D Warehouse library\n• Plugins: V-Ray for photorealistic rendering, Enscape for real-time visualization\n• Learning curve: Low — can be productive in 2–3 days\n\nRevit (BIM):\n• Best for: Detailed design development, construction documentation, coordination\n• Strengths: Parametric families, automatic schedules, clash detection with MEP\n• BIM = Building Information Modeling — every element has data attributes\n• Industry standard for professional practice\n• Learning curve: High — 2–3 months for proficiency\n\nRhino 3D:\n• Best for: Complex curved forms, parametric design with Grasshopper\n• Strengths: NURBS modeling, unlimited geometric freedom\n• Combined with Grasshopper for computational design\n• Standard for Zaha Hadid-style architecture\n\nBlender:\n• Free and open-source\n• Powerful for visualization, animation, organic modeling\n• Increasingly used for architectural visualization' },
  { p:[/balance|treasury.*balance|how much money|net.*balance/], a:null },
  { p:[/crew.*how many|how many.*member|member count/], a:null },
  { p:[/vault.*how many|how many.*file/], a:null },
  { p:[/hello|hi there|hey|good morning|good afternoon|greetings/], a:'Hello! I\'m the RSA AI for Unit Z649 — your architectural co-pilot. I can answer questions about NASA India competitions (LIK, MSL, Khosla), architecture theory, design methodologies, unit management, and more. What would you like to explore?' },
  { p:[/thank you|thanks|cheers/], a:'You\'re welcome! If you have more questions about architecture or the unit, just ask. That\'s what I\'m here for.' },
  { p:[/nasa india website|nasa portal|nasaindia.co/], a:'The official NASA India website is nasaindia.co — it contains:\n• Competition registration and abstract submissions\n• Trophy briefs and judging criteria\n• ANC registration and workshop listings\n• Unit registration and renewal\n• Official circulars and announcements from the national council\n\nBookmark it and check regularly during ANC registration season.' }
];

const findAI = async (q, crew, vault, finances, news) => {
  const query = q.toLowerCase().trim();
  const income  = finances.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
  const expense = finances.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
  
  if (/balance|treasury.*balance|how much money|net.*balance/.test(query))
    return `Treasury status:\n• Total Income: ₹${income.toLocaleString('en-IN')}\n• Total Expenses: ₹${expense.toLocaleString('en-IN')}\n• Net Balance: ₹${(income-expense).toLocaleString('en-IN')}\n\n${income-expense >= 0 ? 'The unit is financially healthy.' : 'Expenses exceed income — review treasury.'}`;
  if (/how many.*member|member.*count|crew.*size/.test(query))
    return `Unit Z649 currently has ${crew.length} registered members. That includes ${crew.filter(c=>['UD','USEC','EX USEC'].includes(c.role)).length} council members and ${crew.filter(c=>c.role==='Coordinator').length} coordinators.`;
  if (/vault.*how many|how many.*file|file.*count/.test(query))
    return `The secure vault holds ${vault.length} active files across categories: ${[...new Set(vault.map(v=>v.category))].join(', ')}.`;
  if (/latest news|recent news|recent.*broadcast|latest.*broadcast/.test(query))
    return news.length ? `Latest broadcast: "${news[0]?.title}" — ${news[0]?.body?.slice(0,150)}${news[0]?.body?.length>150?'…':''}` : 'No unit broadcasts yet.';
  
  for (const kb of AI_KB) {
    if (!kb.a) continue;
    for (const p of kb.p) {
      const match = typeof p === 'string' ? query.includes(p) : p.test(query);
      if (match) return kb.a;
    }
  }

  // Fallback to global databanks (Wikipedia API integration for general knowledge without API keys)
  try {
    const searchTerms = encodeURIComponent(query);
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exsentences=3&exintro=1&explaintext=1&generator=search&gsrsearch=${searchTerms}&gsrlimit=1`);
    const data = await res.json();
    if (data && data.query && data.query.pages) {
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const extract = pages[pageId].extract;
      if (extract) {
        return `From global databanks (${pages[pageId].title}):\n${extract}`;
      }
    }
    return 'I don\'t have that in my local architecture database, and external databanks came up empty. Try asking about: NASA India, LIK Trophy, MSL Trophy, vernacular architecture, Le Corbusier, parametric design, passive cooling, heritage conservation, AutoCAD, Revit, or your unit\'s treasury and crew.';
  } catch (err) {
    return 'I don\'t have that in my local architecture database, and I am currently unable to reach external databanks. Try asking about NASA India, architectural theory, or unit statistics.';
  }
};

// ─── SEED DATA ─────────────────────────────────────────────────────────────────
const SEED = {
  crew: [
    { id:'c1', name:'Rithvik M',    role:'UD',          year:'3', email:'rithvik@rsa.edu',  phone:'9876543210', coordinatorType:'' },
    { id:'c2', name:'Akshaya S',    role:'USEC',        year:'3', email:'akshaya@rsa.edu',  phone:'9876543211', coordinatorType:'' },
    { id:'c3', name:'Mugilan R',    role:'Coordinator', year:'3', email:'mugilan@rsa.edu',  phone:'9876543212', coordinatorType:'Design' },
    { id:'c4', name:'Nithya Sri',   role:'Coordinator', year:'2', email:'nithya@rsa.edu',   phone:'9876543213', coordinatorType:'Documentation' },
    { id:'c5', name:'Vishnav Iyer', role:'Member',      year:'2', email:'vishnav@rsa.edu',  phone:'', coordinatorType:'' },
    { id:'c6', name:'Thilip K',     role:'Member',      year:'1', email:'thilip@rsa.edu',   phone:'', coordinatorType:'' },
    { id:'c7', name:'Rithick V',    role:'Member',      year:'1', email:'rithick@rsa.edu',  phone:'', coordinatorType:'' }
  ],
  vault: [
    { id:'v1', title:'LIK Trophy – Heritage Docs',       category:'Trophies', link:'https://drive.google.com', description:'Vernacular spatial documentation for LIK Trophy.' },
    { id:'v2', title:'MSL Trophy – Velachery Analysis',  category:'Trophies', link:'https://drive.google.com', description:'Hydro-social connector concept and site grading plans.' },
    { id:'v3', title:'68th ANC Workshop Guide',          category:'Events',   link:'https://nasaindia.co',     description:'Official workshop registration guidelines.' }
  ],
  finances: [
    { id:'f1', type:'income',  description:'Initial Unit Funding',           amount:50000 },
    { id:'f2', type:'expense', description:'Printing & Plotting – MSL',      amount:4500  },
    { id:'f3', type:'expense', description:'Site Visit – Kanchipuram',       amount:12000 },
    { id:'f4', type:'income',  description:'Alumni Network Sponsorship',     amount:15000 }
  ],
  news: [
    { id:'n1', title:'68th ANC Workshop Details Released', tag:'Official', date:'2026-06-16', body:'NASA India has released the official workshop itinerary for the 68th ANC. All delegates must review and register before the deadline on the NASA India portal.' },
    { id:'n2', title:'LIK Trophy Submissions Closing Soon', tag:'Deadline', date:'2026-06-20', body:'All heritage documentation files must be uploaded to the secure vault before June 20, 2026. Contact the UD for submission assistance.' }
  ]
};

const NASA_FEED = [
  { id:'l1', title:'Louis I. Kahn Trophy – Open for Submissions',     tag:'Competition', date:'June 20, 2026', link:'https://nasaindia.co/' },
  { id:'l2', title:'68th Annual NASA Convention – Preparation Phase', tag:'Event',        date:'June 16, 2026', link:'https://nasaindia.co/' },
  { id:'l3', title:'MSL Trophy Abstracts: Shortlisting in Progress',  tag:'Update',       date:'June 10, 2026', link:'https://nasaindia.co/' }
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const hueOf = s => { let h=0; for(let i=0;i<(s||'').length;i++) h=(h*31+s.charCodeAt(i))%360; return h; };
const initials = n => { if(!n) return '?'; const p=n.trim().split(/\s+/).filter(Boolean); return p.length===1?p[0].slice(0,2).toUpperCase():(p[0][0]+p[p.length-1][0]).toUpperCase(); };
const fmtDate = iso => { const d=new Date(iso); return isNaN(d.getTime())?iso:d.toLocaleDateString(undefined,{day:'2-digit',month:'short',year:'numeric'}); };
const fmtINR  = n => '₹'+Number(n||0).toLocaleString('en-IN');
const roleClass = r => ({UD:'ud',USEC:'usec','EX USEC':'exusec',Coordinator:'coord'}[r]||'member');
const rolePri   = r => ({UD:0,USEC:1,'EX USEC':2,Coordinator:3}[r]??10);
const hexToRGB  = hex => { const n=parseInt(hex.replace('#',''),16); return `${(n>>16)&255},${(n>>8)&255},${n&255}`; };

// EmailJS REST send
const sendEmail = async (toEmails, subject, message) => {
  if(!toEmails.length) return;
  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ service_id:EJS.svc, template_id:EJS.tpl, user_id:EJS.key,
        template_params:{ to_email:toEmails.slice(0,50).join(','), subject, message,
          email: 'z649@nasaindia.co.in' }
      })
    });
    return true;
  } catch { return false; }
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;400;600;800&family=IBM+Plex+Mono:wght@400;600&display=swap');
:root{
  --bg:#07090F;--bg2:#0C1018;
  --panel:rgba(255,255,255,.04);--panel2:rgba(255,255,255,.08);
  --line:rgba(255,255,255,.09);--line2:rgba(255,255,255,.18);
  --ink:#F2F5FF;--ink2:#A8B2CC;--ink3:#6C7793;
  --danger:#FF5C5C;--success:#00D3A7;
  --accent:#5B8CFF;--soft:rgba(91,140,255,.15);
  --green:#00D3A7;--pink:#FF5D8F;--gold:#FFD166;
  --sat:env(safe-area-inset-top,0px);--sar:env(safe-area-inset-right,0px);
  --sab:env(safe-area-inset-bottom,0px);--sal:env(safe-area-inset-left,0px);
  --ease:cubic-bezier(.22,1,.36,1);--eio:cubic-bezier(.65,.05,.36,1);--esp:cubic-bezier(.34,1.56,.64,1);
  --fs1:clamp(.7rem,.66rem+.2vw,.78rem);--fs2:clamp(.82rem,.78rem+.25vw,.92rem);
  --fs3:clamp(.96rem,.9rem+.35vw,1.08rem);--fs4:clamp(1.18rem,1.02rem+.8vw,1.58rem);
  --fs5:clamp(1.55rem,1.2rem+1.9vw,2.55rem);--fs6:clamp(2.1rem,1.3rem+3.5vw,4.1rem);
  --fs7:clamp(2.7rem,1.4rem+5.5vw,5.9rem);
  --sp1:.375rem;--sp2:.75rem;--sp3:1.125rem;--sp4:1.75rem;--sp5:2.5rem;--sp6:4rem;
  --rsm:8px;--rmd:14px;--rlg:20px;--rxl:28px;
}
*,*::before,*::after{box-sizing:border-box;}
html{-webkit-text-size-adjust:100%;}
html,body{margin:0;padding:0;}
body{background:var(--bg);color:var(--ink);font-family:'Sora',system-ui,sans-serif;font-size:var(--fs3);line-height:1.62;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
button,input,textarea,select{font:inherit;color:inherit;}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px;}

/* ── KEYFRAMES ─────────────────────────────────────────── */
@keyframes pulse     {50%{transform:scale(1.5);}}
@keyframes pulse-sm  {0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.15);opacity:.75;}}
@keyframes glow-bounce{0%,100%{transform:translateY(0) scale(1);filter:drop-shadow(0 0 0 var(--pa));}50%{transform:translateY(-5px) scale(1.12);filter:drop-shadow(0 0 10px var(--pa));}}
@keyframes icon-spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
@keyframes icon-ping {0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--pa) 60%,transparent);}100%{box-shadow:0 0 0 14px transparent;}}
@keyframes shimmer   {0%{background-position:-200% center;}100%{background-position:200% center;}}
@keyframes draw      {to{stroke-dashoffset:0;}}
@keyframes fadein    {to{opacity:1;}}
@keyframes rise      {from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
@keyframes load      {to{width:100%;}}
@keyframes slideUp   {from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:none;}}
@keyframes gradient-drift{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
@keyframes float-ring{0%,100%{transform:rotateX(74deg) translateZ(-20vmax) scale(1);}50%{transform:rotateX(74deg) translateZ(-20vmax) scale(1.06);}}

/* ── BACKGROUND ────────────────────────────────────────── */
.house{position:fixed;inset:0;z-index:0;overflow:hidden;perspective:1100px;perspective-origin:50% 42%;background:radial-gradient(120% 80% at 50% -10%,rgba(255,255,255,.04),transparent 60%),linear-gradient(180deg,var(--bg2),var(--bg));pointer-events:none;contain:strict;}
.house::after{content:'';position:absolute;inset:0;background:radial-gradient(130% 100% at 50% 50%,transparent 30%,rgba(4,6,11,.9) 100%);pointer-events:none;}
.house__scene{position:absolute;top:50%;left:50%;width:180vmax;height:180vmax;margin:calc(-90vmax) 0 0 calc(-90vmax);transform-style:preserve-3d;transition:transform 1.2s var(--ease);will-change:transform;}
.plane{position:absolute;inset:0;transform-style:preserve-3d;}
.floor{background-image:linear-gradient(rgba(91,140,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(91,140,255,.06) 1px,transparent 1px);background-size:7vmax 7vmax;transform:rotateX(90deg) translateZ(-26vmax);opacity:.8;transition:background-image 1.2s var(--ease);}
.wall{border:1px solid rgba(255,255,255,.06);background:linear-gradient(180deg,rgba(255,255,255,.025),transparent);}
.wall--back{transform:translateZ(-60vmax);}
.wall--left{transform:rotateY(90deg) translateZ(-60vmax);}
.wall--right{transform:rotateY(-90deg) translateZ(-60vmax);}
.shaft{position:absolute;left:50%;top:-10%;width:34vmax;height:150%;margin-left:-17vmax;background:linear-gradient(180deg,var(--accent),transparent 72%);opacity:.13;transform:rotateX(74deg) translateZ(-20vmax);animation:float-ring 6s ease-in-out infinite;transition:background 1.2s var(--ease);pointer-events:none;}

/* ── HUD ───────────────────────────────────────────────── */
.hud{position:fixed;z-index:40;top:calc(var(--sat)+1.125rem);left:calc(var(--sal)+1.125rem);display:flex;align-items:center;gap:.7rem;padding:.55rem .9rem;background:rgba(7,9,15,.82);border:1px solid var(--line);border-radius:999px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);max-width:min(62vw,310px);transition:border-color .4s var(--ease);}
.hud__dot{width:8px;height:8px;border-radius:50%;flex:0 0 auto;background:var(--accent);box-shadow:0 0 0 4px var(--soft);animation:pulse 2.6s ease-in-out infinite;}
.hud__room{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.16em;text-transform:uppercase;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;}
.hud__sub{font-size:var(--fs1);color:var(--ink3);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* ── TOP RIGHT CONTROLS ────────────────────────────────── */
.topright{position:fixed;z-index:40;top:calc(var(--sat)+1.125rem);right:calc(var(--sar)+1.125rem);display:flex;align-items:center;gap:.5rem;}
.tr-btn{display:flex;align-items:center;gap:.45rem;padding:.45rem .85rem;background:rgba(7,9,15,.82);border:1px solid var(--line);border-radius:999px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;cursor:pointer;color:var(--ink2);transition:all .3s var(--ease);}
.tr-btn:hover{border-color:var(--accent);color:var(--ink);}
.tr-btn.on{background:rgba(0,211,167,.1);border-color:rgba(0,211,167,.35);color:var(--green);}
.tr-btn.auth{background:rgba(91,140,255,.1);border-color:rgba(91,140,255,.3);color:var(--accent);}

/* ── COUNTER ───────────────────────────────────────────── */
.counter{position:fixed;z-index:40;bottom:calc(var(--sab)+6.5rem);right:calc(var(--sar)+1.125rem);text-align:right;font-family:'IBM Plex Mono',monospace;pointer-events:none;}
@media(min-width:860px){.counter{bottom:calc(var(--sab)+1.75rem);}}
.counter__n{font-size:var(--fs4);font-weight:600;letter-spacing:.04em;}
.counter__n span{color:var(--ink3);font-size:var(--fs2);}
.counter__bar{width:72px;height:2px;margin:.4rem 0 0 auto;background:var(--line2);border-radius:2px;overflow:hidden;}
.counter__fill{display:block;height:100%;background:var(--accent);border-radius:2px;transition:width .7s var(--ease),background .7s var(--ease);}

/* ── RAIL ──────────────────────────────────────────────── */
.rail{position:fixed;z-index:50;right:calc(var(--sar)+1.125rem);top:50%;transform:translateY(-50%);display:none;flex-direction:column;gap:.4rem;padding:.55rem;background:rgba(7,9,15,.6);border:1px solid var(--line);border-radius:999px;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);}
@media(min-width:860px){.rail{display:flex;}}
.pill{position:relative;display:flex;align-items:center;gap:.6rem;min-height:40px;padding:.35rem .5rem;background:transparent;border:0;border-radius:999px;cursor:pointer;color:var(--ink3);transition:color .25s var(--ease),background .25s var(--ease);}
.pill__dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:var(--pa);opacity:.4;transition:opacity .3s var(--ease),transform .3s var(--ease);}
.pill__label{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;max-width:0;overflow:hidden;white-space:nowrap;transition:max-width .4s var(--ease),margin .4s var(--ease);margin-right:0;}
.pill:hover .pill__label,.pill:focus-visible .pill__label,.pill[aria-current=true] .pill__label{max-width:140px;margin-right:.3rem;}
.pill:hover,.pill:focus-visible{color:var(--ink);background:var(--panel);}
.pill[aria-current=true]{color:var(--ink);background:var(--panel2);}
.pill[aria-current=true] .pill__dot{opacity:1;transform:scale(1.3);animation:pulse-sm 1.8s ease-in-out infinite;animation:icon-ping 1.5s ease-in-out infinite;}

/* ── DOCK ──────────────────────────────────────────────── */
.dock{position:fixed;z-index:60;left:0;right:0;bottom:0;padding:.4rem calc(var(--sal)+.4rem) calc(var(--sab)+.4rem) calc(var(--sar)+.4rem);background:linear-gradient(180deg,rgba(7,9,15,0),rgba(7,9,15,.96) 38%);}
@media(min-width:860px){.dock{display:none;}}
.dock__scroller{display:flex;gap:.35rem;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:.4rem;background:rgba(10,13,22,.92);border:1px solid var(--line);border-radius:var(--rlg);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);}
.dock__scroller::-webkit-scrollbar{display:none;}
.dock__btn{flex:0 0 auto;scroll-snap-align:center;display:grid;justify-items:center;gap:.18rem;min-width:58px;min-height:50px;padding:.3rem .45rem;background:transparent;border:0;border-radius:var(--rmd);color:var(--ink3);cursor:pointer;transition:background .25s var(--ease),color .25s var(--ease);}
.dock__glyph{display:grid;place-items:center;width:26px;height:26px;border-radius:7px;font-family:'IBM Plex Mono',monospace;font-size:.7rem;font-weight:600;background:color-mix(in srgb,var(--pa) 16%,transparent);color:var(--pa);transition:background .3s var(--ease),color .3s var(--ease),transform .3s var(--esp),filter .3s var(--ease);}
.dock__label{font-family:'IBM Plex Mono',monospace;font-size:.56rem;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;}
.dock__btn[aria-current=true]{background:var(--panel2);color:var(--ink);}
.dock__btn[aria-current=true] .dock__glyph{background:var(--pa);color:#06080E;animation:glow-bounce 2s ease-in-out infinite;}
.dock__btn:not([aria-current=true]):active .dock__glyph{transform:scale(.88);}

/* ── SCROLL ROOT ───────────────────────────────────────── */
.scroll-root{height:100svh;overflow-y:scroll;scroll-snap-type:y mandatory;-webkit-overflow-scrolling:touch;position:relative;z-index:10;}
.room{height:100svh;display:flex;flex-direction:column;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden;}
.room-content{flex:1;overflow-y:auto;overflow-x:hidden;padding:calc(var(--sat)+5.5rem) calc(var(--sar)+1.125rem) calc(var(--sab)+6.5rem) calc(var(--sal)+1.125rem);-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--line) transparent;}
@media(min-width:860px){.room-content{padding:calc(var(--sat)+4rem) calc(var(--sar)+6rem) calc(var(--sab)+4rem) calc(var(--sal)+2.5rem);}}
.wrap{width:100%;max-width:1100px;margin:0 auto;}

/* ── TYPOGRAPHY ────────────────────────────────────────── */
.eyebrow{display:inline-flex;align-items:center;gap:.55rem;font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin:0 0 1.125rem 0;}
.eyebrow::before{content:'';width:22px;height:1px;background:var(--accent);}
h1,h2,h3,h4{font-weight:800;letter-spacing:-.02em;line-height:1.06;margin:0;}
h1{font-size:var(--fs7);}
h2{font-size:var(--fs6);}
h3{font-size:var(--fs4);letter-spacing:-.01em;}
.thin{font-weight:200;}
.gradient-text{background:linear-gradient(135deg,var(--ink) 0%,var(--accent) 60%,var(--ink) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
.lede{font-size:var(--fs4);font-weight:200;color:var(--ink2);margin:1.125rem 0 0 0;max-width:46ch;line-height:1.45;}

/* ── REVEAL ────────────────────────────────────────────── */
.reveal{opacity:0;transform:translate3d(0,34px,0);transition:opacity .75s var(--ease),transform .8s var(--ease);}
.scroll-root[data-dir=up] .reveal{transform:translate3d(0,-34px,0);}
.reveal.in{opacity:1;transform:translate3d(0,0,0);}
.reveal.d1{transition-delay:.06s;}
.reveal.d2{transition-delay:.12s;}
.reveal.d3{transition-delay:.18s;}
.reveal.d4{transition-delay:.24s;}
.reveal.d5{transition-delay:.3s;}

/* ── CARDS ─────────────────────────────────────────────── */
.card{background:var(--panel);border:1px solid var(--line);border-radius:var(--rlg);padding:1.75rem;transition:border-color .35s var(--ease),background .35s var(--ease);}
.card:hover{border-color:var(--line2);background:var(--panel2);}
.card-accent{background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 8%,transparent),transparent);border-color:color-mix(in srgb,var(--accent) 25%,transparent);}

/* ── SECTION HEADER ────────────────────────────────────── */
.sec-hdr{display:flex;flex-wrap:wrap;gap:1.125rem;align-items:flex-end;justify-content:space-between;margin:0 0 2.5rem 0;}
.sec-hdr .left{min-width:0;}
.sec-hdr .right{display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;flex-shrink:0;}

/* ── BUTTONS ───────────────────────────────────────────── */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:44px;padding:.7rem 1.35rem;border-radius:999px;border:1px solid transparent;font-size:var(--fs2);font-weight:600;cursor:pointer;text-decoration:none;line-height:1;transition:transform .2s var(--ease),background .2s var(--ease),border-color .2s var(--ease),box-shadow .2s var(--ease);}
.btn:active{transform:scale(.97);}
.btn-p{background:var(--accent);color:#06080E;border-color:var(--accent);}
.btn-p:hover{background:#fff;border-color:#fff;box-shadow:0 4px 20px rgba(91,140,255,.4);}
.btn-g{background:transparent;border-color:var(--line2);color:var(--ink);}
.btn-g:hover{background:var(--panel2);border-color:var(--accent);}
.btn-d{background:rgba(255,92,92,.12);border-color:rgba(255,92,92,.35);color:var(--danger);}
.btn-d:hover{background:rgba(255,92,92,.22);}
.btn-s{background:rgba(0,211,167,.12);border-color:rgba(0,211,167,.35);color:var(--green);}
.btn-sm{min-height:36px;padding:.42rem .85rem;font-size:var(--fs1);}
.btn-ico{min-height:34px;min-width:34px;padding:.4rem;border-radius:var(--rsm);background:var(--panel);border:1px solid var(--line);color:var(--ink2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s var(--ease);}
.btn-ico:hover{color:var(--ink);border-color:var(--line2);background:var(--panel2);transform:scale(1.08);}
.btn-ico-d:hover{color:var(--danger);border-color:rgba(255,92,92,.35);background:rgba(255,92,92,.1);}
.btn-row{display:flex;flex-wrap:wrap;gap:.75rem;margin:1.75rem 0 0 0;}

/* ── BENTO ─────────────────────────────────────────────── */
.bento{display:grid;grid-template-columns:1fr;grid-auto-rows:minmax(90px,auto);gap:.75rem;margin:2.5rem 0 0 0;}
@media(min-width:640px){.bento{grid-template-columns:repeat(2,1fr);}}
@media(min-width:900px){.bento{grid-template-columns:repeat(4,1fr);gap:1.125rem;}.bw{grid-column:span 2;}.bt{grid-row:span 2;}}
.bc{display:flex;flex-direction:column;justify-content:space-between;gap:.75rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);padding:1.125rem;transition:border-color .3s var(--ease),background .3s var(--ease),transform .3s var(--esp);}
.bc:hover{border-color:var(--accent);background:var(--panel2);transform:translateY(-3px);}
.bk{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);margin:0;}
.bv{font-size:var(--fs5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}
.bd{font-size:var(--fs2);color:var(--ink2);margin:0;}

.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(130px,100%),1fr));gap:1.125rem;margin:2.5rem 0 0 0;}
.stat{border-left:2px solid var(--accent);padding:0 0 0 1.125rem;}
.stat__v{font-size:var(--fs5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}
.stat__k{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin:.35rem 0 0 0;}

/* ── CREW ──────────────────────────────────────────────── */
.crew-group{margin:2rem 0 0 0;}
.crew-group-label{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3);margin:0 0 1.125rem 0;display:flex;align-items:center;gap:.6rem;}
.crew-group-label::after{content:'';flex:1;height:1px;background:var(--line);}
.crew-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(200px,100%),1fr));gap:1.125rem;}
.mc{display:flex;flex-direction:column;gap:.75rem;padding:1.125rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .3s var(--ease),background .3s var(--ease),transform .3s var(--esp);cursor:pointer;}
.mc:hover{border-color:var(--line2);background:var(--panel2);transform:translateY(-3px);}
.mc.council{border-color:rgba(255,209,102,.22);}
.mc.council:hover{border-color:rgba(255,209,102,.5);background:rgba(255,209,102,.04);}
.mc__top{display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;}
.mc__acts{display:flex;gap:.3rem;flex-shrink:0;}
.avatar{display:grid;place-items:center;width:52px;height:52px;border-radius:14px;font-family:'IBM Plex Mono',monospace;font-size:1.1rem;font-weight:600;color:#fff;flex-shrink:0;background:linear-gradient(145deg,hsl(var(--h) 70% 50%),hsl(calc(var(--h)+42) 65% 35%));transition:transform .35s var(--esp);}
.mc:hover .avatar{transform:scale(1.08) rotate(-4deg);}
.mc__name{font-size:var(--fs3);font-weight:600;margin:0;line-height:1.25;}
.mc__meta{font-size:var(--fs1);color:var(--ink3);margin:0;}
.rbadge{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .55rem;border-radius:999px;font-family:'IBM Plex Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;font-weight:600;border:1px solid;}
.rbadge.ud    {background:rgba(255,209,102,.14);border-color:rgba(255,209,102,.3);color:#FFD166;}
.rbadge.usec  {background:rgba(0,211,167,.12);border-color:rgba(0,211,167,.3);color:#00D3A7;}
.rbadge.exusec{background:rgba(91,140,255,.12);border-color:rgba(91,140,255,.3);color:#5B8CFF;}
.rbadge.coord {background:rgba(179,136,255,.12);border-color:rgba(179,136,255,.3);color:#B388FF;}
.rbadge.member{background:var(--panel);border-color:var(--line);color:var(--ink3);}

/* ── VAULT ─────────────────────────────────────────────── */
.vault-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(260px,100%),1fr));gap:1.125rem;margin:2.5rem 0 0 0;}
.vc{display:flex;flex-direction:column;gap:.75rem;padding:1.125rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .3s var(--ease),background .3s var(--ease),transform .3s var(--esp);}
.vc:hover{border-color:var(--accent);background:var(--panel2);transform:translateY(-3px);}
.vc__hdr{display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;}
.vc__acts{display:flex;gap:.3rem;flex-shrink:0;}
.vc__title{font-size:var(--fs3);font-weight:600;margin:0;flex:1;min-width:0;line-height:1.3;}
.vc__desc{font-size:var(--fs2);color:var(--ink2);margin:0;flex:1;}
.vc__foot{margin-top:auto;padding-top:.75rem;border-top:1px solid var(--line);}
.tag{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;padding:.18rem .55rem;border-radius:999px;background:var(--soft);color:var(--accent);}

/* ── NEWS ──────────────────────────────────────────────── */
.news-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(290px,100%),1fr));gap:1.125rem;margin:1.75rem 0 0 0;}
.ni{display:flex;flex-direction:column;gap:.75rem;padding:1.125rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .3s var(--ease),background .3s var(--ease),transform .3s var(--esp);}
.ni:hover{border-color:var(--line2);background:var(--panel2);transform:translateY(-2px);}
.ni__hdr{display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;}
.ni__acts{display:flex;gap:.3rem;flex-shrink:0;}
.ni__meta{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;}
.ndate{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);color:var(--ink3);}
.ni__body{font-size:var(--fs2);color:var(--ink2);margin:0;line-height:1.6;flex:1;}
.ni__foot{margin-top:auto;padding-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap;}

.live-lbl{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3);margin:2rem 0 1.125rem 0;display:flex;align-items:center;gap:.5rem;}
.live-lbl::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--green);display:block;animation:pulse 2s ease-in-out infinite;flex-shrink:0;}
.live-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(270px,100%),1fr));gap:1.125rem;}
.live-item{display:flex;flex-direction:column;gap:.75rem;padding:1.125rem;background:rgba(0,211,167,.04);border:1px solid rgba(0,211,167,.2);border-radius:var(--rmd);text-decoration:none;color:inherit;transition:border-color .3s var(--ease),background .3s var(--ease),transform .3s var(--esp);}
.live-item:hover{border-color:rgba(0,211,167,.5);background:rgba(0,211,167,.08);transform:translateY(-2px);}
.live-tag{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;color:var(--green);padding:.18rem .55rem;border-radius:999px;background:rgba(0,211,167,.12);display:inline-block;width:fit-content;}
.live-title{font-size:var(--fs3);font-weight:600;margin:0;line-height:1.3;}
.live-date{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);color:var(--ink3);margin:0;}
.live-link{display:flex;align-items:center;gap:.3rem;font-size:var(--fs1);color:var(--green);margin-top:auto;}

/* ── TREASURY ──────────────────────────────────────────── */
.fin-tabs{display:flex;gap:.5rem;margin:0 0 1.75rem 0;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;}
.fin-tabs::-webkit-scrollbar{display:none;}
.ftab{padding:.5rem 1.1rem;border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--ink2);font-size:var(--fs2);cursor:pointer;white-space:nowrap;transition:all .25s var(--ease);}
.ftab.active{background:var(--accent);color:#06080E;border-color:var(--accent);}
.ftab:not(.active):hover{border-color:var(--accent);color:var(--ink);}

.fin-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(150px,100%),1fr));gap:1.125rem;margin:0 0 1.75rem 0;}
.fs-card{padding:1.125rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:transform .3s var(--esp);}
.fs-card:hover{transform:translateY(-2px);}
.fs-lbl{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin:0 0 .35rem 0;}
.fs-val{font-size:var(--fs5);font-weight:800;letter-spacing:-.03em;margin:0;line-height:1;}

.progress-wrap{background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);padding:1.125rem;margin:0 0 1.75rem 0;}
.progress-label{display:flex;justify-content:space-between;align-items:baseline;margin:0 0 .75rem 0;}
.progress-bar{height:10px;background:var(--line);border-radius:999px;overflow:hidden;}
.progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--green));background-size:200% auto;animation:gradient-drift 3s ease infinite;transition:width 1s var(--ease);}

.contrib-list{display:flex;flex-direction:column;gap:.5rem;}
.contrib-row{display:flex;align-items:center;gap:.75rem;padding:.75rem 1.125rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .25s var(--ease);}
.contrib-row:hover{border-color:var(--line2);}
.cr__name{flex:1;font-size:var(--fs2);font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cr__note{font-size:var(--fs1);color:var(--ink3);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:none;}
@media(min-width:640px){.cr__note{display:block;}}
.cr__amt{font-family:'IBM Plex Mono',monospace;font-size:var(--fs3);font-weight:600;color:var(--green);flex-shrink:0;}
.cr__acts{display:flex;gap:.3rem;flex-shrink:0;}

.fin-list{display:flex;flex-direction:column;gap:.5rem;}
.fr{display:flex;align-items:center;gap:.75rem;padding:.75rem 1.125rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);transition:border-color .25s var(--ease);}
.fr:hover{border-color:var(--line2);}
.fr__type{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.1em;text-transform:uppercase;padding:.14rem .5rem;border-radius:999px;flex-shrink:0;min-width:68px;text-align:center;border:1px solid;}
.fr__type.income {background:rgba(0,211,167,.1);border-color:rgba(0,211,167,.25);color:var(--green);}
.fr__type.expense{background:rgba(255,93,143,.1);border-color:rgba(255,93,143,.25);color:var(--pink);}
.fr__desc{flex:1;font-size:var(--fs2);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.fr__amt{font-family:'IBM Plex Mono',monospace;font-size:var(--fs3);font-weight:600;flex-shrink:0;}
.fr__amt.income{color:var(--green);}
.fr__amt.expense{color:var(--pink);}
.fr__acts{display:flex;gap:.3rem;flex-shrink:0;}

.archive-list{display:flex;flex-direction:column;gap:1rem;}
.arch-item{padding:1.125rem;background:var(--panel);border:1px solid var(--line);border-radius:var(--rmd);cursor:pointer;transition:border-color .3s var(--ease),background .3s var(--ease);}
.arch-item:hover{border-color:var(--line2);background:var(--panel2);}
.arch-item__hdr{display:flex;justify-content:space-between;align-items:center;margin:0 0 .75rem 0;}
.arch-item__name{font-size:var(--fs3);font-weight:600;margin:0;}
.arch-item__meta{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);color:var(--ink3);}
.arch-contribs{margin-top:.75rem;padding-top:.75rem;border-top:1px solid var(--line);display:none;flex-direction:column;gap:.35rem;}
.arch-contribs.open{display:flex;}
.arch-cr{display:flex;justify-content:space-between;align-items:center;padding:.35rem 0;font-size:var(--fs2);}

/* ── TERMINAL ──────────────────────────────────────────── */
.term{display:flex;flex-direction:column;background:rgba(4,7,13,.72);border:1px solid var(--line);border-radius:var(--rlg);overflow:hidden;margin:2.5rem 0 0 0;}
.term__bar{display:flex;align-items:center;gap:.45rem;padding:.65rem 1rem;border-bottom:1px solid var(--line);background:rgba(255,255,255,.025);}
.term__led{width:8px;height:8px;border-radius:50%;background:var(--line2);}
.term__led.on{background:var(--accent);animation:pulse-sm 2s ease-in-out infinite;}
.term__lbl{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin:0 0 0 .5rem;}
.term__log{height:clamp(200px,35svh,380px);overflow-y:auto;padding:1.125rem;margin:0;font-family:'IBM Plex Mono',monospace;font-size:var(--fs2);line-height:1.75;overflow-wrap:anywhere;scrollbar-width:thin;scrollbar-color:var(--line) transparent;}
.tl{margin:0 0 .28rem 0;}
.tl.in{color:var(--ink);}
.tl.in::before{content:'> ';color:var(--accent);}
.tl.out{color:var(--ink2);}
.tl.sys{color:var(--ink3);font-style:italic;}
.term__form{display:flex;gap:.45rem;padding:.75rem;border-top:1px solid var(--line);background:rgba(255,255,255,.02);}
.term__form input{flex:1;min-width:0;padding:.65rem .85rem;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:var(--rsm);font-family:'IBM Plex Mono',monospace;font-size:var(--fs2);color:var(--ink);transition:border-color .25s var(--ease);}
.term__form input:focus{border-color:var(--accent);outline:none;}
.chips{display:flex;flex-wrap:wrap;gap:.45rem;margin:1.125rem 0 0 0;}
.chip{padding:.38rem .82rem;background:var(--panel);border:1px solid var(--line);border-radius:999px;font-size:var(--fs1);color:var(--ink2);cursor:pointer;font-family:'IBM Plex Mono',monospace;letter-spacing:.08em;transition:border-color .25s var(--ease),color .25s var(--ease),transform .2s var(--esp);}
.chip:hover{border-color:var(--accent);color:var(--ink);transform:translateY(-2px);}

/* ── FORMS ─────────────────────────────────────────────── */
.form{display:grid;gap:1.125rem;}
.field{display:grid;gap:.4rem;}
.field label{font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.12em;text-transform:uppercase;color:var(--ink2);}
.field input,.field textarea,.field select{width:100%;margin:0;padding:.8rem 1rem;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:var(--rsm);font-size:var(--fs2);color:var(--ink);transition:border-color .25s var(--ease),background .25s var(--ease);-webkit-appearance:none;appearance:none;}
.field textarea{min-height:100px;resize:vertical;}
.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--accent);background:rgba(255,255,255,.07);outline:none;}
.field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(168,178,204,.7)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .9rem center;background-size:12px;padding-right:2.2rem;}
.g2{display:grid;gap:1.125rem;}
@media(min-width:580px){.g2{grid-template-columns:1fr 1fr;}}
.form-err{font-size:var(--fs1);color:var(--danger);margin:0;min-height:1em;}

/* ── MODAL ─────────────────────────────────────────────── */
.modal{position:fixed;inset:0;z-index:80;display:grid;opacity:0;pointer-events:none;transition:opacity .28s var(--ease);}
.modal.open{opacity:1;pointer-events:auto;}
.modal__veil{position:absolute;inset:0;background:rgba(3,5,10,.82);border:0;padding:0;cursor:pointer;width:100%;-webkit-appearance:none;}
.modal__panel{position:relative;width:100%;background:#0C1018;border:1px solid var(--line);padding:1.75rem;transition:transform .38s var(--esp);max-height:90svh;overflow-y:auto;overflow-x:hidden;align-self:end;border-radius:var(--rxl) var(--rxl) 0 0;transform:translateY(100%);scrollbar-width:thin;scrollbar-color:var(--line) transparent;}
.modal.open .modal__panel{transform:translateY(0);}
.modal__grip{width:40px;height:4px;border-radius:999px;background:var(--line2);margin:0 auto 1.125rem auto;}
@media(min-width:720px){
  .modal{align-items:center;justify-items:center;padding:1.75rem;}
  .modal__panel{max-width:540px;border-radius:var(--rxl);transform:translateY(12px) scale(.96);align-self:center;padding-bottom:1.75rem;}
  .modal.open .modal__panel{transform:translateY(0) scale(1);}
  .modal__grip{display:none;}
}
.modal__hdr{display:flex;justify-content:space-between;align-items:center;margin:0 0 1.75rem 0;}
.modal__title{font-size:var(--fs4);margin:0;font-weight:700;}
.modal__body{color:var(--ink2);font-size:var(--fs2);margin:0 0 1.125rem 0;line-height:1.65;}
.modal__acts{display:flex;flex-wrap:wrap;gap:.75rem;margin:1.75rem 0 0 0;justify-content:flex-end;}
.divider{height:1px;background:var(--line);margin:1.125rem 0;}

/* ── AUTH MODAL ────────────────────────────────────────── */
.auth-tabs{display:flex;gap:0;margin:0 0 1.75rem 0;border:1px solid var(--line);border-radius:var(--rmd);overflow:hidden;}
.auth-tab{flex:1;padding:.65rem;background:transparent;border:0;color:var(--ink2);cursor:pointer;font-size:var(--fs2);font-weight:600;transition:background .25s var(--ease),color .25s var(--ease);}
.auth-tab.active{background:var(--accent);color:#06080E;}
.user-badge{display:flex;align-items:center;gap:.5rem;padding:.35rem .7rem;background:rgba(0,211,167,.08);border:1px solid rgba(0,211,167,.25);border-radius:999px;font-size:var(--fs1);color:var(--green);}

/* ── TOAST ─────────────────────────────────────────────── */
.toast{position:fixed;z-index:90;left:50%;bottom:calc(var(--sab)+7rem);transform:translate(-50%,160%);display:flex;align-items:center;gap:.55rem;padding:.65rem 1.1rem;background:#0C1018;border:1px solid var(--accent);border-radius:999px;font-size:var(--fs2);transition:transform .38s var(--esp);max-width:calc(100vw - 2rem);white-space:nowrap;pointer-events:none;}
.toast.show{transform:translate(-50%,0);}
@media(min-width:860px){.toast{bottom:calc(var(--sab)+1.75rem);}}
.toast__dot{width:7px;height:7px;border-radius:50%;background:var(--accent);flex-shrink:0;}

/* ── SPLASH ────────────────────────────────────────────── */
.splash{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:var(--bg);transition:opacity .8s var(--ease),visibility .8s;}
.splash.done{opacity:0;visibility:hidden;pointer-events:none;}
.splash__inner{display:grid;justify-items:center;gap:1.125rem;padding:1.75rem;text-align:center;}
.splash__mark{width:min(150px,40vw);height:auto;}
.splash__ring{fill:none;stroke:var(--accent);stroke-width:2;opacity:.9;stroke-dasharray:302;stroke-dashoffset:302;animation:draw 1.5s var(--eio) forwards;}
.splash__orbit{fill:none;stroke:#fff;stroke-width:1.4;opacity:.55;stroke-dasharray:260;stroke-dashoffset:260;animation:draw 1.6s .26s var(--eio) forwards;}
.splash__star{fill:#fff;opacity:0;animation:fadein .7s .9s var(--ease) forwards;}
.splash__word{font-family:'IBM Plex Mono',monospace;font-size:var(--fs2);letter-spacing:.4em;text-transform:uppercase;color:var(--ink2);margin:0;opacity:0;animation:rise .8s 1s var(--ease) forwards;}
.splash__sub{font-size:var(--fs1);color:var(--ink3);margin:0;letter-spacing:.14em;font-family:'IBM Plex Mono',monospace;text-transform:uppercase;opacity:0;animation:rise .8s 1.2s var(--ease) forwards;}
.splash__bar{width:min(220px,60vw);height:2px;background:var(--line2);border-radius:2px;overflow:hidden;margin:.75rem 0 0 0;}
.splash__bar span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--accent),var(--green));animation:load 2s .2s var(--eio) forwards;}
.splash__skip{margin:1.125rem 0 0 0;background:transparent;border:1px solid var(--line2);color:var(--ink3);border-radius:999px;min-height:44px;padding:.5rem 1.2rem;font-family:'IBM Plex Mono',monospace;font-size:var(--fs1);letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:color .25s var(--ease),border-color .25s var(--ease);}
.splash__skip:hover{color:var(--ink);border-color:var(--accent);}
.empty{text-align:center;padding:2.5rem 1.75rem;border:1px dashed var(--line2);border-radius:var(--rlg);color:var(--ink3);font-size:var(--fs2);}
.foot{border-top:1px solid var(--line);margin:4rem 0 0 0;padding:1.125rem 0 0 0;display:flex;flex-wrap:wrap;gap:.75rem;justify-content:space-between;font-size:var(--fs1);color:var(--ink3);font-family:'IBM Plex Mono',monospace;letter-spacing:.08em;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--line2);border-radius:99px;}
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // ── AUTH ──
  const [user,        setUser]        = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authModal,   setAuthModal]   = useState(false);
  const [authMode,    setAuthMode]    = useState('login');
  const [authForm,    setAuthForm]    = useState({ name:'', email:'', password:'', year:'1' });
  const [authErr,     setAuthErr]     = useState('');
  const [authWorking, setAuthWorking] = useState(false);

  // ── NAV ──
  const [activeIdx, setActiveIdx]   = useState(0);
  const [scrollDir, setScrollDir]   = useState('down');
  const [splashDone, setSplashDone] = useState(false);
  const [isAdmin, setIsAdmin]       = useState(false);

  // ── DATA ──
  const [crew,        setCrew]        = useState(SEED.crew);
  const [vault,       setVault]       = useState(SEED.vault);
  const [finances,    setFinances]    = useState(SEED.finances);
  const [news,        setNews]        = useState(SEED.news);
  const [contribs,    setContribs]    = useState([]);
  const [tConfig,     setTConfig]     = useState({ target:50000, campaignName:'Annual Fund 2026', tenure:'2025-26', description:'Collection for 68th ANC delegates' });
  const [tArchive,    setTArchive]    = useState([]);

  // ── UI ──
  const [modal,  setModal]  = useState({ type:null, data:null, open:false });
  const [form,   setForm]   = useState({});
  const [toast,  setToast]  = useState('');
  const [finTab, setFinTab] = useState('ledger');
  const [archOpen, setArchOpen] = useState(null);

  // ── AI ──
  const [logs,   setLogs]   = useState([
    { k:'sys', t:'RSA AI // z649-secure — connected. Powered by comprehensive NASA India and architecture knowledge.' },
    { k:'sys', t:'Ask me anything: NASA trophies, architecture theory, design methods, or type "help" for topics.' }
  ]);
  const [termIn, setTermIn] = useState('');
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const scrollRef  = useRef(null);
  const termLogRef = useRef(null);
  const lastIdx    = useRef(0);

  const room = ROOMS[activeIdx] || ROOMS[0];

  // ── EFFECTS ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, u => { setUser(u); setAuthLoading(false); });
    const t = setTimeout(() => setSplashDone(true), 2600);

    const unsubs = [
      onSnapshot(collection(db,'crew'),     s => { if(!s.empty) setCrew(s.docs.map(d=>({id:d.id,...d.data()}))); }),
      onSnapshot(collection(db,'vault'),    s => { if(!s.empty) setVault(s.docs.map(d=>({id:d.id,...d.data()}))); }),
      onSnapshot(collection(db,'finances'), s => { if(!s.empty) setFinances(s.docs.map(d=>({id:d.id,...d.data()}))); }),
      onSnapshot(collection(db,'news'),     s => { if(!s.empty) setNews(s.docs.map(d=>({id:d.id,...d.data()}))); }),
      onSnapshot(collection(db,'contributions'), s => setContribs(s.docs.map(d=>({id:d.id,...d.data()})))),
      onSnapshot(collection(db,'treasury_archive'), s => setTArchive(s.docs.map(d=>({id:d.id,...d.data()})))),
    ];

    // Load treasury config
    getDoc(doc(db,'settings','treasury')).then(d => { if(d.exists()) setTConfig(p=>({...p,...d.data()})); }).catch(()=>{});

    return () => { unsubAuth(); clearTimeout(t); unsubs.forEach(u=>u()); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold:0.1 });
    document.querySelectorAll('.reveal:not(.in)').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [crew, vault, finances, news, contribs]);

  useEffect(() => {
    const el = scrollRef.current;
    if(!el) return;
    const fn = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight);
      if(idx !== lastIdx.current) {
        setScrollDir(idx > lastIdx.current ? 'down' : 'up');
        lastIdx.current = idx;
        setActiveIdx(idx);
      }
    };
    el.addEventListener('scroll', fn, { passive:true });
    return () => el.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if(termLogRef.current) termLogRef.current.scrollTop = termLogRef.current.scrollHeight;
  }, [logs]);

  // ── HELPERS ──────────────────────────────────────────────────────────────
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(''), 3500); };
  const navTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' }); };
  const openModal = (type, data=null) => { setForm(data?{...data}:{}); setModal({type,data,open:true}); };
  const closeModal = () => setModal({type:null,data:null,open:false});
  const setF = (k,v) => setForm(p=>({...p,[k]:v}));

  // ── AUTH ──────────────────────────────────────────────────────────────────
  const handleAuth = async e => {
    e.preventDefault(); setAuthErr(''); setAuthWorking(true);
    try {
      if(authMode === 'login') {
        await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
        showToast('Welcome back!');
      } else {
        const cred = await createUserWithEmailAndPassword(auth, authForm.email, authForm.password);
        const uid = cred.user.uid;
        // Add to members collection (for email broadcasts)
        await setDoc(doc(db,'members',uid), { uid, name:authForm.name, email:authForm.email, year:authForm.year, joinedAt:Date.now() });
        // Also add to crew directory automatically
        await addDoc(collection(db,'crew'), { name:authForm.name, email:authForm.email, year:authForm.year, role:'Member', phone:'', coordinatorType:'', timestamp:Date.now() });
        showToast(`Welcome, ${authForm.name}! You've been added to the unit.`);
      }
      setAuthModal(false); setAuthForm({name:'',email:'',password:'',year:'1'});
    } catch(err) {
      const msg = err.code==='auth/email-already-in-use' ? 'Email already registered — try logging in.'
        : err.code==='auth/wrong-password'||err.code==='auth/user-not-found' ? 'Incorrect email or password.'
        : err.code==='auth/weak-password' ? 'Password must be at least 6 characters.'
        : err.message;
      setAuthErr(msg);
    } finally { setAuthWorking(false); }
  };

  const handleLogout = async () => { await signOut(auth); setIsAdmin(false); showToast('Signed out.'); };

  const toggleAdmin = () => {
    if(isAdmin) { setIsAdmin(false); showToast('Admin mode off.'); return; }
    const p = prompt('Enter admin access key:');
    if(p === ADMIN_KEY) { setIsAdmin(true); showToast('Admin mode enabled.'); }
    else if(p !== null) showToast('Incorrect key.');
  };

  // ── FIREBASE CRUD ─────────────────────────────────────────────────────────
  const saveDoc = async (col, data) => {
    try {
      const { id, ...rest } = data;
      if(id && !String(id).startsWith('c') && !String(id).startsWith('v') && !String(id).startsWith('f') && !String(id).startsWith('n'))
        await updateDoc(doc(db,col,id), {...rest, updated:Date.now()});
      else if(id && (await getDoc(doc(db,col,id))).exists())
        await updateDoc(doc(db,col,id), {...rest, updated:Date.now()});
      else await addDoc(collection(db,col), {...rest, timestamp:Date.now()});
      showToast('Saved.'); closeModal();
    } catch { showToast('Save failed — check connection.'); }
  };

  const delDoc = async (col, id, label) => {
    if(!confirm(`Delete "${label}"?`)) return;
    try {
      await deleteDoc(doc(db,col,id));
      const map={crew:setCrew,vault:setVault,finances:setFinances,news:setNews,contributions:setContribs};
      map[col]?.(p=>p.filter(x=>x.id!==id));
      showToast('Deleted.');
    } catch { showToast('Delete failed.'); }
  };

  const openLink = link => {
    if(!link?.trim()) { showToast('No link attached.'); return; }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Post news + auto-email all members
  const postNews = async () => {
    const data = { title:form.title, tag:form.tag||'Official', date:form.date||new Date().toISOString().slice(0,10), body:form.body, timestamp:Date.now() };
    try {
      await addDoc(collection(db,'news'), data);
      closeModal();
      showToast('Broadcast posted. Sending emails…');
      
      // Fetch all member emails
      const snap = await getDocs(collection(db,'members'));
      const emails = snap.docs.map(d=>d.data().email).filter(Boolean);
      
      if(emails.length) {
        const ok = await sendEmail(emails, `[RSA Z649] ${data.title}`, `${data.body}\n\n—\nRSA Unit Z649 | z649@nasaindia.co.in`);
        showToast(ok ? `Broadcast sent to ${emails.length} members!` : 'Posted. Email delivery pending — check EmailJS config.');
      }
    } catch { showToast('Post failed.'); }
  };

  // Save treasury config
  const saveTConfig = async () => {
    await setDoc(doc(db,'settings','treasury'), { ...form, updatedAt:Date.now() });
    setTConfig(p=>({...p,...form}));
    showToast('Treasury settings updated.'); closeModal();
  };

  // Archive current campaign
  const archiveCampaign = async () => {
    if(!confirm('Close this campaign and archive all contributions?')) return;
    const totalCollected = contribs.filter(c=>c.tenure===tConfig.tenure).reduce((a,b)=>a+Number(b.amount),0);
    
    await addDoc(collection(db,'treasury_archive'), {
      campaignName: tConfig.campaignName, tenure:tConfig.tenure, target:tConfig.target,
      totalCollected, contributions:[...contribs.filter(c=>c.tenure===tConfig.tenure)],
      closedAt: Date.now()
    });
    showToast('Campaign archived. Update tenure to start fresh.');
  };

  // ── AI ────────────────────────────────────────────────────────────────────
  const handleTerm = async e => {
    e.preventDefault();
    const q = termIn.trim();
    if(!q) return;
    setLogs(p=>[...p,{k:'in',t:q}]);
    setTermIn('');
    
    // Quick local fetch wrapper
    const getLocalResponse = async () => {
        const ans = await findAI(q, crew, vault, finances, news);
        setLogs(p=>[...p,{k:'out',t:ans}]);
    };
    
    setTimeout(() => { getLocalResponse(); }, 150);
  };

  // ── MODAL CONTENT ─────────────────────────────────────────────────────────
  const renderModal = () => {
    const T = modal.type;

    if(T==='view-news') return <>
      <div className="modal__hdr"><span className="tag">{modal.data?.tag}</span><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <h3 style={{marginBottom:'1rem',lineHeight:1.2}}>{modal.data?.title}</h3>
      <p style={{color:'var(--ink2)',fontSize:'var(--fs3)',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{modal.data?.body}</p>
      <p style={{marginTop:'1rem',fontFamily:'IBM Plex Mono,monospace',fontSize:'var(--fs1)',color:'var(--ink3)'}}>{fmtDate(modal.data?.date)}</p>
    </>;

    if(T==='view-crew') return <>
      <div className="modal__hdr"><h3 className="modal__title">Member Profile</h3><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <div style={{display:'flex',gap:'1rem',alignItems:'flex-start',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        <div className="avatar" style={{'--h':hueOf(modal.data?.name),width:64,height:64,borderRadius:18,fontSize:'1.25rem'}}>{initials(modal.data?.name)}</div>
        <div style={{flex:1}}>
          <h3 style={{marginBottom:'.6rem'}}>{modal.data?.name}</h3>
          <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
            <span className={`rbadge ${roleClass(modal.data?.role)}`}>{modal.data?.role}</span>
            {modal.data?.coordinatorType && <span className="rbadge coord">{modal.data.coordinatorType}</span>}
            {modal.data?.year && <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'var(--fs1)',color:'var(--ink3)'}}>Year {modal.data.year}</span>}
          </div>
        </div>
      </div>
      <div className="divider"/>
      {modal.data?.email&&<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'.75rem 0',borderBottom:'1px solid var(--line)'}}>
        <span style={{color:'var(--ink2)',fontSize:'var(--fs2)'}}>{modal.data.email}</span>
        <a href={`mailto:${modal.data.email}`} className="btn btn-g btn-sm"><Mail size={13}/> Email</a>
      </div>}
      {modal.data?.phone&&<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'.75rem 0',borderBottom:'1px solid var(--line)'}}>
        <span style={{color:'var(--ink2)',fontSize:'var(--fs2)'}}>{modal.data.phone}</span>
        <a href={`tel:${modal.data.phone}`} className="btn btn-g btn-sm"><Phone size={13}/> Call</a>
      </div>}
      {isAdmin&&<div className="modal__acts">
        <button className="btn btn-g btn-sm" onClick={()=>{closeModal();openModal('edit-crew',modal.data);}}><Pencil size={13}/> Edit</button>
        <button className="btn btn-d btn-sm" onClick={()=>{delDoc('crew',modal.data.id,modal.data.name);closeModal();}}><Trash2 size={13}/> Delete</button>
      </div>}
    </>;

    if(T==='add-crew'||T==='edit-crew') return <>
      <div className="modal__hdr"><h3 className="modal__title">{T==='add-crew'?'Register Member':'Edit Member'}</h3><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <form className="form" onSubmit={e=>{e.preventDefault();saveDoc('crew',form);}}>
        <div className="g2">
          <div className="field"><label>Full Name *</label><input required value={form.name||''} onChange={e=>setF('name',e.target.value)} placeholder="Full name"/></div>
          <div className="field"><label>Academic Year</label>
            <select value={form.year||'1'} onChange={e=>setF('year',e.target.value)}>
              {['1','2','3','4','5'].map(y=><option key={y} value={y}>Year {y}</option>)}<option value="Alumni">Alumni</option>
            </select>
          </div>
        </div>
        <div className="g2">
          <div className="field"><label>Role *</label>
            <select required value={form.role||'Member'} onChange={e=>setF('role',e.target.value)}>
              <option value="Member">Student Member</option>
              {isAdmin&&<><option value="UD">Unit Designee (UD)</option><option value="USEC">Unit Secretary (USEC)</option><option value="EX USEC">Ex-Unit Secretary</option><option value="Coordinator">Coordinator</option></>}
            </select>
          </div>
          {form.role==='Coordinator'&&<div className="field"><label>Department *</label><input required value={form.coordinatorType||''} onChange={e=>setF('coordinatorType',e.target.value)} placeholder="e.g. Design, Events"/></div>}
        </div>
        <div className="g2">
          <div className="field"><label>Email</label><input type="email" value={form.email||''} onChange={e=>setF('email',e.target.value)} placeholder="student@college.edu"/></div>
          <div className="field"><label>Phone</label><input type="tel" value={form.phone||''} onChange={e=>setF('phone',e.target.value)} placeholder="+91 XXXXX XXXXX"/></div>
        </div>
        <div className="modal__acts"><button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button><button type="submit" className="btn btn-p btn-sm">Save Member</button></div>
      </form>
    </>;

    if(T==='add-news'||T==='edit-news') return <>
      <div className="modal__hdr"><h3 className="modal__title">{T==='add-news'?'New Broadcast':'Edit Broadcast'}</h3><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <p style={{fontSize:'var(--fs1)',color:'var(--ink3)',margin:'-.5rem 0 1rem 0'}}>All registered members will automatically receive an email notification.</p>
      <form className="form" onSubmit={e=>{e.preventDefault();T==='add-news'?postNews():saveDoc('news',form);}}>
        <div className="field"><label>Headline *</label><input required value={form.title||''} onChange={e=>setF('title',e.target.value)} placeholder="News headline"/></div>
        <div className="g2">
          <div className="field"><label>Category</label>
            <select value={form.tag||'Official'} onChange={e=>setF('tag',e.target.value)}>
              {['Official','Deadline','Meeting','Alert','Event','Achievement'].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field"><label>Date</label><input type="date" value={form.date||new Date().toISOString().slice(0,10)} onChange={e=>setF('date',e.target.value)}/></div>
        </div>
        <div className="field"><label>Body *</label><textarea required rows={4} value={form.body||''} onChange={e=>setF('body',e.target.value)} placeholder="Full content…"/></div>
        <div className="modal__acts"><button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button><button type="submit" className="btn btn-p btn-sm"><Radio size={13}/> Publish & Email</button></div>
      </form>
    </>;

    if(T==='add-vault'||T==='edit-vault') return <>
      <div className="modal__hdr"><h3 className="modal__title">{T==='add-vault'?'Add File':'Edit File'}</h3><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <form className="form" onSubmit={e=>{e.preventDefault();saveDoc('vault',form);}}>
        <div className="field"><label>Title *</label><input required value={form.title||''} onChange={e=>setF('title',e.target.value)} placeholder="File or document name"/></div>
        <div className="g2">
          <div className="field"><label>Category</label>
            <select value={form.category||'Programs'} onChange={e=>setF('category',e.target.value)}>
              {['Trophies','Programs','Events','Meetings','Other'].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field"><label>Link *</label><input required value={form.link||''} onChange={e=>setF('link',e.target.value)} placeholder="https://drive.google.com/…"/></div>
        </div>
        <div className="field"><label>Description</label><textarea rows={2} value={form.description||''} onChange={e=>setF('description',e.target.value)} placeholder="Brief description…"/></div>
        <div className="modal__acts"><button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button><button type="submit" className="btn btn-p btn-sm">Save File</button></div>
      </form>
    </>;

    if(T==='add-finance'||T==='edit-finance') return <>
      <div className="modal__hdr"><h3 className="modal__title">{T==='add-finance'?'Add Transaction':'Edit Transaction'}</h3><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <form className="form" onSubmit={e=>{e.preventDefault();saveDoc('finances',{...form,amount:Number(form.amount)});}}>
        <div className="g2">
          <div className="field"><label>Type</label>
            <select value={form.type||'income'} onChange={e=>setF('type',e.target.value)}>
              <option value="income">Income (+)</option><option value="expense">Expense (−)</option>
            </select>
          </div>
          <div className="field"><label>Amount (₹) *</label><input required type="number" min="1" value={form.amount||''} onChange={e=>setF('amount',e.target.value)} placeholder="0"/></div>
        </div>
        <div className="field"><label>Description *</label><input required value={form.description||''} onChange={e=>setF('description',e.target.value)} placeholder="What was this for?"/></div>
        <div className="modal__acts"><button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button><button type="submit" className="btn btn-p btn-sm">Save</button></div>
      </form>
    </>;

    if(T==='add-contrib') return <>
      <div className="modal__hdr"><h3 className="modal__title">Record Contribution</h3><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <form className="form" onSubmit={async e=>{e.preventDefault();await addDoc(collection(db,'contributions'),{...form,amount:Number(form.amount),tenure:tConfig.tenure,timestamp:Date.now()});showToast('Contribution recorded.');closeModal();}}>
        <div className="g2">
          <div className="field"><label>Member Name *</label><input required value={form.memberName||''} onChange={e=>setF('memberName',e.target.value)} placeholder="Contributor's name"/></div>
          <div className="field"><label>Amount (₹) *</label><input required type="number" min="1" value={form.amount||''} onChange={e=>setF('amount',e.target.value)} placeholder="0"/></div>
        </div>
        <div className="g2">
          <div className="field"><label>Member Email</label><input type="email" value={form.memberEmail||''} onChange={e=>setF('memberEmail',e.target.value)} placeholder="email@college.edu"/></div>
          <div className="field"><label>Note</label><input value={form.note||''} onChange={e=>setF('note',e.target.value)} placeholder="e.g. First installment"/></div>
        </div>
        <div className="modal__acts"><button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button><button type="submit" className="btn btn-p btn-sm">Record</button></div>
      </form>
    </>;

    if(T==='treasury-settings') return <>
      <div className="modal__hdr"><h3 className="modal__title">Campaign Settings</h3><button className="btn-ico" onClick={closeModal}><X size={18}/></button></div>
      <form className="form" onSubmit={e=>{e.preventDefault();saveTConfig();}}>
        <div className="field"><label>Campaign Name *</label><input required value={form.campaignName||''} onChange={e=>setF('campaignName',e.target.value)} placeholder="e.g. Annual Fund 2026"/></div>
        <div className="g2">
          <div className="field"><label>Target Amount (₹) *</label><input required type="number" min="1" value={form.target||''} onChange={e=>setF('target',e.target.value)} placeholder="50000"/></div>
          <div className="field"><label>Tenure</label><input value={form.tenure||''} onChange={e=>setF('tenure',e.target.value)} placeholder="2025-26"/></div>
        </div>
        <div className="field"><label>Description</label><textarea rows={2} value={form.description||''} onChange={e=>setF('description',e.target.value)} placeholder="What is this collection for?"/></div>
        <div className="modal__acts">
          <button type="button" className="btn btn-g btn-sm" onClick={closeModal}>Cancel</button>
          <button type="button" className="btn btn-d btn-sm" onClick={archiveCampaign}>Archive Current</button>
          <button type="submit" className="btn btn-p btn-sm">Save Settings</button>
        </div>
      </form>
    </>;

    return null;
  };

  // ── AUTH MODAL ────────────────────────────────────────────────────────────
  const renderAuthModal = () => (
    <div className={`modal ${authModal?'open':''}`}>
      <button className="modal__veil" onClick={()=>{setAuthModal(false);setAuthErr('');}}/>
      <div className="modal__panel">
        <div className="modal__grip"/>
        <div className="modal__hdr" style={{marginBottom:'1rem'}}>
          <h3 className="modal__title">{authMode==='login'?'Sign In':'Join Unit Z649'}</h3>
          <button className="btn-ico" onClick={()=>{setAuthModal(false);setAuthErr('');}}><X size={18}/></button>
        </div>
        <div className="auth-tabs">
          <button className={`auth-tab ${authMode==='login'?'active':''}`} onClick={()=>{setAuthMode('login');setAuthErr('');}}>Sign In</button>
          <button className={`auth-tab ${authMode==='register'?'active':''}`} onClick={()=>{setAuthMode('register');setAuthErr('');}}>Register</button>
        </div>
        <form className="form" onSubmit={handleAuth}>
          {authMode==='register'&&<div className="field"><label>Full Name *</label><input required value={authForm.name} onChange={e=>setAuthForm(p=>({...p,name:e.target.value}))} placeholder="Your full name"/></div>}
          <div className="field"><label>Email *</label><input required type="email" value={authForm.email} onChange={e=>setAuthForm(p=>({...p,email:e.target.value}))} placeholder="student@college.edu"/></div>
          <div className="field"><label>Password *</label><input required type="password" value={authForm.password} onChange={e=>setAuthForm(p=>({...p,password:e.target.value}))} placeholder="Min. 6 characters"/></div>
          {authMode==='register'&&<div className="field"><label>Year of Study</label>
            <select value={authForm.year} onChange={e=>setAuthForm(p=>({...p,year:e.target.value}))}>
              {['1','2','3','4','5'].map(y=><option key={y} value={y}>Year {y}</option>)}
            </select>
          </div>}
          {authErr&&<p className="form-err">{authErr}</p>}
          <button type="submit" className="btn btn-p" style={{width:'100%',marginTop:'.5rem'}} disabled={authWorking}>
            {authWorking ? 'Processing…' : authMode==='login' ? 'Sign In' : 'Create Account & Join'}
          </button>
        </form>
        {authMode==='login'&&<p style={{textAlign:'center',fontSize:'var(--fs1)',color:'var(--ink3)',marginTop:'1rem'}}>
          No account? <button style={{background:'none',border:'none',color:'var(--accent)',cursor:'pointer',fontSize:'var(--fs1)'}} onClick={()=>{setAuthMode('register');setAuthErr('');}}>Register</button>
        </p>}
      </div>
    </div>
  );

  // ── SECTIONS ──────────────────────────────────────────────────────────────
  const renderDash = () => {
    const income  = finances.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const expense = finances.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    return <div className="wrap">
      <p className="eyebrow reveal">Rajalakshmi School of Architecture · Zone 6</p>
      <h1 className="reveal d1">Unit Z649. <span className="thin gradient-text">Command.</span></h1>
      <p className="lede reveal d2">National Association of Students of Architecture, India. Official operations, submissions, and command portal for Unit Z649.</p>
      
      <div className="btn-row reveal d3">
        <button className="btn btn-p" onClick={()=>navTo('vault')}>Access Vault</button>
        <button className="btn btn-g" onClick={()=>navTo('crew')}>View Directory</button>
        {!user&&<button className="btn btn-g" onClick={()=>setAuthModal(true)}><LogIn size={14}/> Sign In</button>}
      </div>

      <div className="bento reveal d4">
        <div className="bc bw bt"><p className="bk">Philosophy</p><p style={{fontSize:'clamp(1rem,2.2vw,1.4rem)',fontWeight:200,fontStyle:'italic',lineHeight:1.55,color:'var(--ink2)',margin:0}}>{quote}</p></div>
        <div className="bc"><p className="bk">Members</p><p className="bv">{crew.length}</p></div>
        <div className="bc"><p className="bk">Vault</p><p className="bv">{vault.length}</p></div>
        <div className="bc bw"><p className="bk">Net Balance</p><p className="bv" style={{color:income-expense>=0?'var(--green)':'var(--pink)'}}>{fmtINR(income-expense)}</p></div>
        <div className="bc"><p className="bk">Zone</p><p className="bv">06</p></div>
        <div className="bc"><p className="bk">ANC</p><p className="bv">68th</p><p className="bd">Prep Phase</p></div>
      </div>
    </div>;
  };

  const renderHQ = () => {
    const council = crew.filter(c=>['UD','USEC','EX USEC'].includes(c.role)).sort((a,b)=>rolePri(a.role)-rolePri(b.role));
    const coords  = crew.filter(c=>c.role==='Coordinator');
    return <div className="wrap">
      <div className="sec-hdr">
        <div className="left"><p className="eyebrow reveal">Administration</p><h2 className="reveal d1">Executive <span className="thin">Core</span></h2></div>
        {isAdmin&&<div className="right reveal d2"><button className="btn btn-p btn-sm" onClick={()=>openModal('add-crew',{role:'UD'})}><Plus size={14}/> Add Executive</button></div>}
      </div>
      <div className="stats reveal d3">
        <div className="stat"><p className="stat__v">Z649</p><p className="stat__k">Unit Code</p></div>
        <div className="stat"><p className="stat__v">06</p><p className="stat__k">Zone</p></div>
        <div className="stat"><p className="stat__v">RSA</p><p className="stat__k">Institution</p></div>
        <div className="stat"><p className="stat__v">100%</p><p className="stat__k">Student-run</p></div>
      </div>
      {council.length>0&&<div className="crew-group reveal d4"><p className="crew-group-label">Leadership</p><div className="crew-grid">
        {council.map(m=><div key={m.id} className="mc council" onClick={()=>openModal('view-crew',m)}>
          <div className="mc__top"><span className={`rbadge ${roleClass(m.role)}`}>{m.role}</span>
          {isAdmin&&<div className="mc__acts" onClick={e=>e.stopPropagation()}><button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button></div>}</div>
          <div className="avatar" style={{'--h':hueOf(m.name)}}>{initials(m.name)}</div>
          <p className="mc__name">{m.name}</p><p className="mc__meta">Year {m.year} · {m.email}</p>
        </div>)}
      </div></div>}
      {coords.length>0&&<div className="crew-group reveal d4"><p className="crew-group-label">Coordinators</p><div className="crew-grid">
        {coords.map(m=><div key={m.id} className="mc" onClick={()=>openModal('view-crew',m)}>
          <div className="mc__top"><span className="rbadge coord">{m.coordinatorType||'Coord.'}</span>
          {isAdmin&&<div className="mc__acts" onClick={e=>e.stopPropagation()}><button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button></div>}</div>
          <div className="avatar" style={{'--h':hueOf(m.name)}}>{initials(m.name)}</div>
          <p className="mc__name">{m.name}</p><p className="mc__meta">{m.coordinatorType} Coordinator · Year {m.year}</p>
        </div>)}
      </div></div>}
    </div>;
  };

  const renderVault = () => <div className="wrap">
    <div className="sec-hdr">
      <div className="left"><p className="eyebrow reveal">Secure Storage</p><h2 className="reveal d1">Active <span className="thin">Works</span></h2></div>
      {isAdmin&&<div className="right reveal d2"><button className="btn btn-p btn-sm" onClick={()=>openModal('add-vault')}><Plus size={14}/> Add File</button></div>}
    </div>
    <div className="vault-grid reveal d3">
      {vault.length===0&&<div className="empty">No vault files yet.</div>}
      {vault.map(v=><div key={v.id} className="vc">
        <div className="vc__hdr"><span className="tag">{v.category}</span>
        {isAdmin&&<div className="vc__acts"><button className="btn-ico" onClick={()=>openModal('edit-vault',v)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('vault',v.id,v.title)}><Trash2 size={13}/></button></div>}</div>
        <p className="vc__title">{v.title}</p>
        {v.description&&<p className="vc__desc">{v.description}</p>}
        <div className="vc__foot"><button className="btn btn-g btn-sm" style={{width:'100%'}} onClick={()=>openLink(v.link)}><ArrowUpRight size={14}/> Open File</button></div>
      </div>)}
    </div>
  </div>;

  const renderCrew = () => {
    const YEARS = ['1','2','3','4','5','Alumni'];
    return <div className="wrap">
      <div className="sec-hdr">
        <div className="left"><p className="eyebrow reveal">Unit Directory</p><h2 className="reveal d1">The <span className="thin">Personnel</span></h2></div>
        <div className="right reveal d2"><button className="btn btn-p btn-sm" onClick={()=>openModal('add-crew')}><Plus size={14}/> Register</button></div>
      </div>
      {crew.filter(c=>['UD','USEC','EX USEC'].includes(c.role)).length>0&&<div className="crew-group reveal d3"><p className="crew-group-label">Council</p><div className="crew-grid">
        {crew.filter(c=>['UD','USEC','EX USEC'].includes(c.role)).sort((a,b)=>rolePri(a.role)-rolePri(b.role)).map(m=><div key={m.id} className="mc council" onClick={()=>openModal('view-crew',m)}>
          <div className="mc__top"><span className={`rbadge ${roleClass(m.role)}`}>{m.role}</span>{isAdmin&&<div className="mc__acts" onClick={e=>e.stopPropagation()}><button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button></div>}</div>
          <div className="avatar" style={{'--h':hueOf(m.name)}}>{initials(m.name)}</div>
          <p className="mc__name">{m.name}</p><p className="mc__meta">Year {m.year}</p>
        </div>)}
      </div></div>}
      {crew.filter(c=>c.role==='Coordinator').length>0&&<div className="crew-group reveal d3"><p className="crew-group-label">Coordinators</p><div className="crew-grid">
        {crew.filter(c=>c.role==='Coordinator').map(m=><div key={m.id} className="mc" onClick={()=>openModal('view-crew',m)}>
          <div className="mc__top"><span className="rbadge coord">{m.coordinatorType||'Coordinator'}</span>{isAdmin&&<div className="mc__acts" onClick={e=>e.stopPropagation()}><button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button></div>}</div>
          <div className="avatar" style={{'--h':hueOf(m.name)}}>{initials(m.name)}</div>
          <p className="mc__name">{m.name}</p><p className="mc__meta">{m.coordinatorType} Coord. · Year {m.year}</p>
        </div>)}
      </div></div>}
      {YEARS.map(yr=>{const grp=crew.filter(c=>c.role==='Member'&&(c.year||'1')===yr);if(!grp.length) return null;return(
        <div key={yr} className="crew-group reveal d4"><p className="crew-group-label">{yr==='Alumni'?'Alumni':`Year ${yr}`}</p><div className="crew-grid">
          {grp.map(m=><div key={m.id} className="mc" onClick={()=>openModal('view-crew',m)}>
            <div className="mc__top"><span className="rbadge member">Member</span>{isAdmin&&<div className="mc__acts" onClick={e=>e.stopPropagation()}><button className="btn-ico" onClick={()=>openModal('edit-crew',m)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('crew',m.id,m.name)}><Trash2 size={13}/></button></div>}</div>
            <div className="avatar" style={{'--h':hueOf(m.name)}}>{initials(m.name)}</div>
            <p className="mc__name">{m.name}</p><p className="mc__meta">{m.email||'No email'}</p>
          </div>)}
        </div></div>
      );})}
      {crew.length===0&&<div className="empty reveal d3">No crew registered yet.</div>}
    </div>;
  };

  const renderNews = () => <div className="wrap">
    <div className="sec-hdr">
      <div className="left"><p className="eyebrow reveal">Communications</p><h2 className="reveal d1">Unit <span className="thin">Broadcasts</span></h2></div>
      {isAdmin&&<div className="right reveal d2"><button className="btn btn-p btn-sm" onClick={()=>openModal('add-news')}><Plus size={14}/> Broadcast</button></div>}
    </div>
    <div className="news-grid reveal d3">
      {news.length===0&&<div className="empty">No broadcasts yet.</div>}
      {[...news].sort((a,b)=>(b.timestamp||0)-(a.timestamp||0)).map(n=><div key={n.id} className="ni">
        <div className="ni__hdr"><div className="ni__meta"><span className="tag">{n.tag}</span><span className="ndate">{fmtDate(n.date)}</span></div>
        {isAdmin&&<div className="ni__acts"><button className="btn-ico" onClick={()=>openModal('edit-news',n)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('news',n.id,n.title)}><Trash2 size={13}/></button></div>}</div>
        <h3 style={{fontSize:'var(--fs4)',fontWeight:600,margin:0,lineHeight:1.2}}>{n.title}</h3>
        <p className="ni__body">{n.body?.substring(0,120)}{n.body?.length>120?'…':''}</p>
        <div className="ni__foot"><button className="btn btn-g btn-sm" onClick={()=>openModal('view-news',n)}><BookOpen size={13}/> Read Full</button></div>
      </div>)}
    </div>
    <p className="live-lbl reveal d3">Live NASA India Feed</p>
    <div className="live-grid reveal d4">
      {NASA_FEED.map(n=><a key={n.id} className="live-item" href={n.link} target="_blank" rel="noopener noreferrer">
        <span className="live-tag">{n.tag}</span>
        <p className="live-title">{n.title}</p>
        <p className="live-date">{n.date}</p>
        <span className="live-link"><ArrowUpRight size={13}/> Visit NASA Portal</span>
      </a>)}
    </div>
  </div>;

  const renderAI = () => <div className="wrap">
    <p className="eyebrow reveal">Intelligence Core</p>
    <h2 className="reveal d1">Ask <span className="thin gradient-text">the AI</span></h2>
    <p className="lede reveal d2">Comprehensive knowledge on NASA India, all trophies, architecture theory, and unit management. If it's not locally known, I will pull from global databanks.</p>
    <div className="term reveal d3">
      <div className="term__bar"><span className="term__led on"/><span className="term__led"/><span className="term__led"/><p className="term__lbl">rsa-ai://z649-secure</p></div>
      <div className="term__log" ref={termLogRef}>{logs.map((l,i)=><p key={i} className={`tl ${l.k}`}>{l.t}</p>)}</div>
      <form className="term__form" onSubmit={handleTerm}>
        <input value={termIn} onChange={e=>setTermIn(e.target.value)} placeholder="Ask about NASA, trophies, architecture, design…"/>
        <button type="submit" className="btn btn-p btn-sm">Send</button>
      </form>
    </div>
    <div className="chips reveal d4">
      {['help','What is the LIK Trophy?','Who is Le Corbusier?','balance','clear'].map(cmd=><button key={cmd} className="chip" onClick={()=>setTermIn(cmd)}>{cmd}</button>)}
    </div>
  </div>;

  const renderTreasury = () => {
    const income  = finances.filter(f=>f.type==='income').reduce((a,b)=>a+Number(b.amount),0);
    const expense = finances.filter(f=>f.type==='expense').reduce((a,b)=>a+Number(b.amount),0);
    const net = income - expense;
    const curContribs = contribs.filter(c=>c.tenure===tConfig.tenure);
    const totalCollected = curContribs.reduce((a,b)=>a+Number(b.amount),0);
    const pct = Math.min(Math.round((totalCollected/(tConfig.target||1))*100),100);

    return <div className="wrap">
      <div className="sec-hdr">
        <div className="left"><p className="eyebrow reveal">Financial Command</p><h2 className="reveal d1">Unit <span className="thin">Treasury</span></h2></div>
        {isAdmin&&<div className="right reveal d2">
          <button className="btn btn-g btn-sm" onClick={()=>openModal('treasury-settings',tConfig)}><Settings size={13}/> Campaign</button>
          <button className="btn btn-p btn-sm" onClick={()=>openModal('add-finance',{type:'income'})}><Plus size={13}/> Entry</button>
        </div>}
      </div>
      <div className="fin-tabs reveal d2">
        {['ledger','collection','archive'].map(t=><button key={t} className={`ftab ${finTab===t?'active':''}`} onClick={()=>setFinTab(t)}>
          {t==='ledger'?'Ledger':t==='collection'?'Collection Campaign':'Archive'}
        </button>)}
      </div>

      {finTab==='ledger'&&<>
        <div className="fin-summary reveal d3">
          <div className="fs-card"><p className="fs-lbl">Income</p><p className="fs-val" style={{color:'var(--green)'}}>{fmtINR(income)}</p></div>
          <div className="fs-card"><p className="fs-lbl">Expenses</p><p className="fs-val" style={{color:'var(--pink)'}}>{fmtINR(expense)}</p></div>
          <div className="fs-card"><p className="fs-lbl">Net Balance</p><p className="fs-val" style={{color:net>=0?'var(--green)':'var(--pink)'}}>{fmtINR(net)}</p></div>
        </div>
        <div className="fin-list reveal d4">
          {finances.length===0&&<div className="empty">No financial records yet.</div>}
          {finances.map(f=><div key={f.id} className="fr">
            <span className={`fr__type ${f.type}`}>{f.type}</span>
            <span className="fr__desc">{f.description}</span>
            <span className={`fr__amt ${f.type}`}>{f.type==='income'?'+':'−'}{fmtINR(f.amount)}</span>
            {isAdmin&&<div className="fr__acts"><button className="btn-ico" onClick={()=>openModal('edit-finance',f)}><Pencil size={13}/></button><button className="btn-ico btn-ico-d" onClick={()=>delDoc('finances',f.id,f.description)}><Trash2 size={13}/></button></div>}
          </div>)}
        </div>
      </>}

      {finTab==='collection'&&<>
        <div className="progress-wrap reveal d3">
          <div className="progress-label">
            <div><p style={{margin:0,fontWeight:600,fontSize:'var(--fs3)'}}>{tConfig.campaignName}</p><p style={{margin:'.3rem 0 0 0',fontSize:'var(--fs2)',color:'var(--ink3)'}}>{tConfig.description} · Tenure {tConfig.tenure}</p></div>
            <div style={{textAlign:'right'}}>
              <p style={{margin:0,fontSize:'var(--fs4)',fontWeight:800,color:'var(--green)'}}>{pct}%</p>
              <p style={{margin:'.2rem 0 0 0',fontSize:'var(--fs1)',color:'var(--ink3)',fontFamily:'IBM Plex Mono,monospace'}}>{fmtINR(totalCollected)} / {fmtINR(tConfig.target)}</p>
            </div>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`}}/></div>
          <p style={{margin:'.75rem 0 0 0',fontSize:'var(--fs1)',color:'var(--ink3)'}}>{curContribs.length} contributors · {fmtINR(tConfig.target - totalCollected)} remaining</p>
        </div>
        {isAdmin&&<div style={{margin:'0 0 1rem 0'}}><button className="btn btn-s btn-sm" onClick={()=>openModal('add-contrib')}><Plus size={13}/> Record Contribution</button></div>}
        <div className="contrib-list reveal d4">
          {curContribs.length===0&&<div className="empty">No contributions recorded yet.</div>}
          {[...curContribs].sort((a,b)=>b.timestamp-a.timestamp).map(c=><div key={c.id} className="contrib-row">
            <div className="avatar" style={{'--h':hueOf(c.memberName),width:32,height:32,borderRadius:9,fontSize:'.7rem'}}>{initials(c.memberName)}</div>
            <span className="cr__name">{c.memberName}</span>
            <span className="cr__note">{c.note||'—'}</span>
            <span className="cr__amt">{fmtINR(c.amount)}</span>
            {isAdmin&&<div className="cr__acts"><button className="btn-ico btn-ico-d btn-sm" onClick={()=>delDoc('contributions',c.id,c.memberName)}><Trash2 size={12}/></button></div>}
          </div>)}
        </div>
      </>}

      {finTab==='archive'&&<>
        <p className="reveal d2" style={{fontSize:'var(--fs2)',color:'var(--ink3)',margin:'0 0 1rem 0'}}>Historical treasury campaigns. Click to expand contributors.</p>
        <div className="archive-list reveal d3">
          {tArchive.length===0&&<div className="empty">No archived campaigns yet.</div>}
          {[...tArchive].sort((a,b)=>b.closedAt-a.closedAt).map(a=><div key={a.id} className="arch-item" onClick={()=>setArchOpen(archOpen===a.id?null:a.id)}>
            <div className="arch-item__hdr">
              <div><p className="arch-item__name">{a.campaignName}</p><p className="arch-item__meta">Tenure {a.tenure} · Collected {fmtINR(a.totalCollected)} / Target {fmtINR(a.target)}</p></div>
              {archOpen===a.id?<ChevronUp size={18} color="var(--ink3)"/>:<ChevronDown size={18} color="var(--ink3)"/>}
            </div>
            <div style={{height:5,background:'var(--line)',borderRadius:3,overflow:'hidden',marginTop:'.5rem'}}>
              <div style={{height:'100%',width:`${Math.min((a.totalCollected/a.target)*100,100)}%`,background:'linear-gradient(90deg,var(--accent),var(--green))',borderRadius:3}}/>
            </div>
            <div className={`arch-contribs ${archOpen===a.id?'open':''}`}>
              {(a.contributions||[]).map((c,i)=><div key={i} className="arch-cr">
                <span>{c.memberName}</span><span style={{color:'var(--green)',fontFamily:'IBM Plex Mono,monospace'}}>{fmtINR(c.amount)}</span>
              </div>)}
            </div>
          </div>)}
        </div>
      </>}
    </div>;
  };

  const renderRegister = () => <div className="wrap">
    <p className="eyebrow reveal">Airlock</p>
    <h2 className="reveal d1">Join <span className="thin">Unit Z649</span></h2>
    <p className="lede reveal d2">Create your account to join the unit directory and receive broadcast notifications.</p>
    <div className="btn-row reveal d3">
      {user
        ? <div className="user-badge"><CheckCircle size={14}/> Signed in as {user.email}</div>
        : <><button className="btn btn-p" onClick={()=>{setAuthMode('register');setAuthModal(true);}}><UserPlus size={15}/> Create Account & Join</button>
          <button className="btn btn-g" onClick={()=>{setAuthMode('login');setAuthModal(true);}}><LogIn size={15}/> Sign In</button></>}
      <button className={`btn ${isAdmin?'btn-s':'btn-g'}`} onClick={toggleAdmin}>
        {isAdmin?<><Unlock size={14}/> Admin: ON</>:<><Lock size={14}/> Admin Login</>}
      </button>
      {user&&<button className="btn btn-d btn-sm" onClick={handleLogout}><LogOut size={14}/> Sign Out</button>}
    </div>
    <div className="foot reveal d4">
      <span>Rajalakshmi School of Architecture · Unit Z649</span>
      <a href="mailto:z649@nasaindia.co.in" style={{color:'var(--ink3)',textDecoration:'none'}}>z649@nasaindia.co.in</a>
    </div>
  </div>;

  const sections = [renderDash,renderHQ,renderVault,renderCrew,renderNews,renderAI,renderTreasury,renderRegister];

  // ── RENDER ────────────────────────────────────────────────────────────────
  return <>
    <style dangerouslySetInnerHTML={{ __html: CSS }}/>
    <div style={{'--accent':room.accent,'--soft':`rgba(${hexToRGB(room.accent)},.15)`}}>
      
      {/* Background */}
      <div className="house" aria-hidden="true">
        <div className="house__scene" style={{transform:room.cam}}>
          <div className="plane floor"/>
          <div className="plane wall wall--back"/>
          <div className="plane wall wall--left"/>
          <div className="plane wall wall--right"/>
          <div className="shaft" style={{background:`linear-gradient(180deg,${room.accent},transparent 72%)`}}/>
        </div>
      </div>

      {/* Splash */}
      <div className={`splash ${splashDone?'done':''}`} role="dialog" aria-modal="true">
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

      {/* HUD */}
      <div className="hud"><span className="hud__dot"/><div><p className="hud__room">{room.label}</p><p className="hud__sub">{room.sub}</p></div></div>
      
      {/* Top Right */}
      <div className="topright">
        {user
          ? <div className="user-badge" style={{display:'flex',alignItems:'center',gap:'.4rem',padding:'.35rem .7rem',background:'rgba(0,211,167,.08)',border:'1px solid rgba(0,211,167,.25)',borderRadius:999,fontSize:'var(--fs1)',color:'var(--green)'}}>
              <CheckCircle size={12}/> {user.email?.split('@')[0]}
            </div>
          : <button className="tr-btn auth" onClick={()=>setAuthModal(true)}><LogIn size={13}/> Sign In</button>}
        <button className={`tr-btn ${isAdmin?'on':''}`} onClick={toggleAdmin}>
          {isAdmin?<><Unlock size={13}/> Admin</>:<><Lock size={13}/> Admin</>}
        </button>
      </div>

      {/* Counter */}
      <div className="counter" aria-hidden="true">
        <div className="counter__n"><strong>{String(activeIdx+1).padStart(2,'0')}</strong><span> / 08</span></div>
        <div className="counter__bar"><span className="counter__fill" style={{width:`${((activeIdx+1)/ROOMS.length)*100}%`}}/></div>
      </div>

      {/* Rail */}
      <nav className="rail" aria-label="Room navigation">
        {ROOMS.map((r,i)=><button key={r.id} type="button" className="pill" style={{'--pa':r.accent}} aria-current={i===activeIdx} onClick={()=>navTo(r.id)}>
          <span className="pill__dot" aria-hidden="true"/><span className="pill__label">{r.label}</span>
        </button>)}
      </nav>

      {/* Dock */}
      <nav className="dock" aria-label="Section navigation">
        <div className="dock__scroller">
          {ROOMS.map((r,i)=><button key={r.id} type="button" className="dock__btn" style={{'--pa':r.accent}} aria-current={i===activeIdx} onClick={()=>navTo(r.id)}>
            <span className="dock__glyph" aria-hidden="true">{r.glyph}</span>
            <span className="dock__label">{r.label.split(' ')[0]}</span>
          </button>)}
        </div>
      </nav>

      {/* Main */}
      <div className="scroll-root" ref={scrollRef} data-dir={scrollDir} aria-label="Main content">
        {ROOMS.map((r,i)=><section key={r.id} id={r.id} className="room" aria-label={r.label}>
          <div className="room-content">{sections[i]?.()}</div>
        </section>)}
      </div>

      {/* Edit/Add Modal */}
      <div className={`modal ${modal.open?'open':''}`} role="dialog" aria-modal="true">
        <button className="modal__veil" onClick={closeModal} aria-label="Close"/>
        <div className="modal__panel"><div className="modal__grip"/>{renderModal()}</div>
      </div>

      {/* Auth Modal */}
      {renderAuthModal()}

      {/* Toast */}
      <div className={`toast ${toast?'show':''}`} role="status" aria-live="polite">
        <span className="toast__dot"/>{toast}
      </div>

    </div>
  </>;
}