/* ===== DATA: edit countries, prices (USD), times here ===== */
const D=[
{n:"United Arab Emirates",f:"🇦🇪",r:"Middle East",gov:90,svc:25,t:"2–4 days",k:"e-Visa",s:"30 days",v:"60 days"},
{n:"Saudi Arabia",f:"🇸🇦",r:"Middle East",gov:120,svc:30,t:"3–5 days",k:"e-Visa",s:"90 days",v:"1 year"},
{n:"Qatar",f:"🇶🇦",r:"Middle East",gov:60,svc:25,t:"3–5 days",k:"e-Visa",s:"30 days",v:"30 days"},
{n:"Turkey",f:"🇹🇷",r:"Europe",gov:60,svc:25,t:"1–2 days",k:"e-Visa",s:"30 days",v:"180 days"},
{n:"Schengen (Europe)",f:"🇪🇺",r:"Europe",gov:95,svc:70,t:"15–30 days",k:"Sticker visa",s:"Up to 90 days",v:"180 days"},
{n:"United Kingdom",f:"🇬🇧",r:"Europe",gov:140,svc:80,t:"15–25 days",k:"Sticker visa",s:"6 months",v:"6 months"},
{n:"United States",f:"🇺🇸",r:"Americas",gov:185,svc:90,t:"Interview based",k:"Sticker visa",s:"Set by officer",v:"Up to 10 years"},
{n:"Canada",f:"🇨🇦",r:"Americas",gov:100,svc:75,t:"20–40 days",k:"Sticker visa",s:"Up to 6 months",v:"Up to 10 years"},
{n:"Malaysia",f:"🇲🇾",r:"Asia & Pacific",gov:30,svc:20,t:"2–3 days",k:"e-Visa",s:"30 days",v:"90 days"},
{n:"Thailand",f:"🇹🇭",r:"Asia & Pacific",gov:50,svc:25,t:"3–5 days",k:"e-Visa",s:"60 days",v:"90 days"},
{n:"Singapore",f:"🇸🇬",r:"Asia & Pacific",gov:40,svc:30,t:"3–5 days",k:"e-Visa",s:"30 days",v:"2 years"},
{n:"Australia",f:"🇦🇺",r:"Asia & Pacific",gov:120,svc:70,t:"20–30 days",k:"e-Visa",s:"3 months",v:"12 months"}];
const M={Tourist:1,Business:1.25,Transit:.6,"Family visit":1.1};
const DOCS=["Passport valid for 6+ months with 2 blank pages","Recent passport-size photo, white background","Scan of passport bio page","Return flight booking and hotel reservation","Bank statement of the last 3–6 months","CNIC / national ID copy"];

/* ===== HELPERS ===== */
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],Q=new URLSearchParams(location.search),pg=document.body.dataset.page;
const price=(c,t="Tourist")=>Math.round(c.gov*M[t])+c.svc;
const opts=a=>a.map((x,i)=>`<option value="${i}">${x.n}</option>`).join("");
const CC=["ae","sa","qa","tr","eu","gb","us","ca","my","th","sg","au"],CITY=["Dubai","Riyadh","Doha","Istanbul","Paris","London","New York","Toronto","Kuala Lumpur","Bangkok","Singapore","Sydney"];
D.forEach((c,i)=>{c.cc=CC[i];c.city=CITY[i];c.stay=c.s}); /* keep max-stay before c.s becomes the photo slug */
const flag=c=>`<img class="flag" src="images/flags/${c.cc}.svg" alt="" width="22" height="16">`;
/* photos live in /images (big, 1800px) and /images/sm (cards, 760px) as .webp — run "node get-images.mjs" to download them */
const IMG=s=>`images/${s}.webp`,SM=s=>`images/sm/${s}.webp`;
const WA="920000000000";
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("on"),4200)}

/* ===== ICONS (inline SVG, no external files) ===== */
const ICO={
arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
bolt:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
compass:'<circle cx="12" cy="12" r="9.5"/><path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4z"/>',
chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
tag:'<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
check:'<path d="M20 6 9 17l-5-5"/>',
clock:'<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
passport:'<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/>',
moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
globe:'<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19"/>',
hotel:'<path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6M8 11h.01M16 11h.01"/>',
map:'<path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3z"/><path d="M9 3v15M15 6v15"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
sound:'<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
mute:'<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
x:'<path d="M6 6l12 12M18 6 6 18"/>',
spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[n]||ICO.spark}</svg>`;
const EMO={"🛂":"passport","🗺️":"map","🌍":"globe","🕋":"moon","✈️":"plane","🏨":"hotel","🛡️":"shield","🤝":"users","🔐":"lock","⏱️":"clock","🔍":"search","⚡":"bolt","🔒":"lock","🧭":"compass","💬":"chat","💰":"tag"};
const fillIcons=(r=document)=>{$$("i[data-ic]",r).forEach(i=>{if(!i.firstChild)i.innerHTML=ic(i.dataset.ic)});
 $$(".feat i:not([data-ic]),.team i:not([data-ic])",r).forEach(i=>{const k=EMO[i.textContent.trim()]||(i.closest(".team")?"user":"spark");i.dataset.ic=k;i.innerHTML=ic(k)})};

/* ===== SOUND FX (Web Audio, synthesized — no audio files) ===== */
const SFX=(()=>{let ctx,armed=false,last=0,on=true;try{on=localStorage.getItem("vr-sfx")!=="0"}catch(e){}
 const ac=()=>{if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A()}if(ctx.state==="suspended")ctx.resume();return ctx};
 const tone=(f1,f2,dur,vol,type="sine",delay=0)=>{const c=ac();if(!c)return;const t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+dur);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g).connect(c.destination);o.start(t);o.stop(t+dur+.03)};
 const air=(dur,vol,f1,f2)=>{const c=ac();if(!c)return;const t=c.currentTime,n=c.sampleRate*dur,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
  const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type="bandpass";f.Q.value=1.4;f.frequency.setValueAtTime(f1,t);f.frequency.exponentialRampToValueAtTime(f2,t+dur);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+dur*.35);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f).connect(g).connect(c.destination);s.start(t)};
 return{get on(){return on},set(v){on=v;try{localStorage.setItem("vr-sfx",v?"1":"0")}catch(e){}},arm(){if(!armed){armed=true;if(on)ac()}},
  hover(){if(!on||!armed)return;const n=performance.now();if(n-last<80)return;last=n;tone(2300,1800,.045,.014)},
  click(){if(on&&armed)tone(480,820,.08,.045,"triangle")},
  open(){if(on&&armed){air(.32,.05,350,2600);tone(660,990,.2,.025,"sine",.06)}},
  close(){if(on&&armed)air(.22,.035,2200,420)},
  swap(){if(on&&armed)air(.26,.028,600,2400)},
  msg(){if(on&&armed){tone(880,880,.12,.025);tone(1320,1320,.16,.02,"sine",.07)}},
  success(){if(on&&armed)[659,988,1319].forEach((f,i)=>tone(f,f,.55,.035,"sine",i*.09))}}})();
["pointerdown","keydown"].forEach(e=>addEventListener(e,()=>SFX.arm(),{once:true,passive:true}));
const SND="a.btn,button.btn,.chip,nav a,.rail button,.icon-btn,.cb-q button,.seg label,.cb-btn,.wa,.mosaic a,.dest h3";
document.addEventListener("pointerover",e=>{const t=e.target.closest(SND);if(t&&!t.contains(e.relatedTarget))SFX.hover()});
document.addEventListener("click",e=>{if(e.target.closest("a.btn,button.btn,.chip,nav a,.icon-btn:not(#sfxBtn),.cb-q button,.seg label,.mosaic a"))SFX.click()});

/* ===== LAZY PHOTOS ===== */
const loadImg=el=>{const src=el.dataset.src,i=new Image();i.decoding="async";i.onload=()=>{el.style.setProperty("--bgi",`url("${src}")`);el.classList.add("has")};i.src=src};
const lio="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){lio.unobserve(e.target);loadImg(e.target)}}),{rootMargin:"500px 0px"}):null;
const hyd=()=>$$("[data-src]:not([data-tried])").forEach(el=>{el.dataset.tried=1;lio?lio.observe(el):loadImg(el)});
new MutationObserver(()=>{hyd();fillIcons()}).observe(document.documentElement,{childList:true,subtree:true});

/* ===== CARDS ===== */
const card=(c,i)=>`<article class="dest spot"><div class="img" data-src="${SM(c.s)}" style="--h:${c.h}"><span class="tag">${flag(c)} ${c.k}</span><span class="emo">${c.l}</span></div><div class="body"><h3>${c.n}</h3><div class="meta">${c.t} · ${c.r}</div><div class="price"><div><small>from</small> <b>$${price(c)}</b></div><div><a class="btn sm dark" href="destination.html?c=${i}">Details</a><a class="btn sm" href="apply.html?c=${i}">Apply</a></div></div></div></article>`;

/* ===== EXTRA DATA ===== */
const SL=["uae","saudi","qatar","turkey","schengen","uk","usa","canada","malaysia","thailand","singapore","australia"],LG=["🏙️","🕌","🏜️","🌉","🗼","🎡","🗽","🍁","🌆","🏝️","🦁","🦘"];
D.forEach((c,i)=>{c.s=SL[i];c.l=LG[i];c.h=(i*47+150)%360});
/* Tour price: price:null shows "Get a quote". Put a number (USD) to show "from $X". */
const INC=["Return airport transfers","Hand-picked hotels with breakfast","Guided sightseeing as per itinerary","Local tour manager","Visa assistance"],EXC=["International airfare (we can book it)","Lunch and dinner unless stated","Personal expenses and tips","Travel insurance"];
const TOURS=[
{s:"dubai-escape",n:"Dubai & Abu Dhabi Escape",d:6,c:"Middle East",rt:"Dubai → Abu Dhabi",l:"🏙️",tag:"Bestseller",hi:["Burj Khalifa At the Top","Desert safari with BBQ dinner","Sheikh Zayed Grand Mosque","Dhow cruise at Dubai Marina"],it:["Day 1: Arrival, check-in and Marina dhow cruise","Day 2: Dubai city tour, Burj Khalifa and Dubai Mall","Day 3: Desert safari with dinner","Day 4: Abu Dhabi city tour and Grand Mosque","Day 5: Free day or theme park","Day 6: Breakfast and airport transfer"]},
{s:"turkey-highlights",n:"Turkey Highlights",d:8,c:"Europe",rt:"Istanbul → Cappadocia → Antalya",l:"🎈",tag:"Popular",hi:["Bosphorus cruise","Hot air balloon ride (optional)","Hagia Sophia and Blue Mosque","Pamukkale terraces"],it:["Day 1–3: Istanbul old city, Bosphorus and bazaars","Day 4–5: Cappadocia caves, valleys and balloons","Day 6–7: Pamukkale and Antalya coast","Day 8: Departure"]},
{s:"classic-europe",n:"Classic Europe in 12 Days",d:12,c:"Europe",rt:"Paris → Switzerland → Italy",l:"🗼",hi:["Eiffel Tower and Seine cruise","Swiss Alps and Mount Titlis","Venice gondola ride","Colosseum and Vatican, Rome"],it:["Day 1–3: Paris sightseeing and Versailles","Day 4–6: Switzerland, Lucerne and Interlaken","Day 7–9: Milan, Venice and Florence","Day 10–12: Rome and departure"]},
{s:"maldives-honeymoon",n:"Maldives Honeymoon",d:5,c:"Honeymoon",rt:"Malé → Private resort island",l:"🏝️",tag:"Honeymoon",hi:["Overwater villa stay","Sunset dolphin cruise","Candle-lit beach dinner","Snorkelling with reef fish"],it:["Day 1: Arrival and speedboat to resort","Day 2–4: Beach, spa, snorkelling and dinner","Day 5: Departure"]},
{s:"malaysia-singapore",n:"Malaysia & Singapore Twin City",d:7,c:"Asia",rt:"Kuala Lumpur → Genting → Singapore",l:"🌆",hi:["Petronas Towers","Genting Highlands","Gardens by the Bay","Universal Studios Singapore"],it:["Day 1–3: Kuala Lumpur and Genting","Day 4: Transfer to Singapore","Day 5–6: City tour, Sentosa and Universal","Day 7: Departure"]},
{s:"thailand-escape",n:"Thailand Beaches & Bangkok",d:7,c:"Asia",rt:"Bangkok → Phuket → Phi Phi",l:"🛕",hi:["Grand Palace, Bangkok","Phi Phi island speedboat","Floating market visit","Thai massage evening"],it:["Day 1–3: Bangkok temples and markets","Day 4–6: Phuket beaches and Phi Phi islands","Day 7: Departure"]},
{s:"umrah-package",n:"Umrah & Ziyarat Package",d:14,c:"Pilgrimage",rt:"Makkah → Madinah",l:"🕋",hi:["Hotels near Haram","Guided ziyarat","Group guidance by scholar","Visa and transport arranged"],it:["Day 1–7: Makkah stay and Umrah guidance","Day 8–13: Madinah stay and ziyarat","Day 14: Departure"]},
{s:"world-tour",n:"Around the World in 21 Days",d:21,c:"World Tours",rt:"Dubai → Istanbul → Paris → London → New York",l:"🌍",tag:"World tour",hi:["5 countries, 3 continents","Flights between cities included","Skyline views in Dubai and New York","Private city guides"],it:["Day 1–4: Dubai","Day 5–8: Istanbul","Day 9–12: Paris","Day 13–16: London","Day 17–21: New York and departure"]}];
TOURS.forEach((t,i)=>t.h=(i*53+20)%360);
const ARTS=[
{s:"schengen-mistakes",t:"Schengen visa: 7 mistakes that cause refusal",cat:"Visa tips",l:"🛂",p:["Most refusals come from small gaps, not big problems. Unclear travel purpose, missing bank history and bookings that do not match your itinerary are the usual causes.","Apply early, keep your documents consistent and make sure your passport has enough validity and blank pages. Dates on your insurance, flights and hotel must line up.","A document review before submission catches most of these errors. That is exactly what our team does for every application."]},
{s:"first-trip-dubai",t:"Planning your first trip to Dubai",cat:"Travel guide",l:"🏙️",p:["Dubai works well all year, but November to March has the best weather. Summer is hot, so most activities move indoors.","Book Burj Khalifa and desert safari in advance. Use the metro for the city and taxis for late evenings.","Dress respectfully at mosques and carry a copy of your visa and hotel booking."]},
{s:"best-time-turkey",t:"Best time to visit Turkey",cat:"Travel guide",l:"🎈",p:["Spring and autumn are ideal for Istanbul and Cappadocia, with mild weather and fewer crowds.","Summer suits the Antalya and Aegean coast. Winter is quieter and cheaper, with a chance of snow in Cappadocia.","Hot air balloon flights depend on weather, so keep a spare morning in your plan."]},
{s:"packing-checklist",t:"International travel packing checklist",cat:"Travel tips",l:"🧳",p:["Keep passport, visa, tickets, insurance and some cash in your hand luggage. Take photos of every document and save them online.","Pack layers, a power adapter, any medicines with prescriptions and a small first-aid kit.","Check baggage limits with your airline and leave space for shopping on the way back."]}];
ARTS.forEach((a,i)=>a.h=(i*71+90)%360);

const ACT={dest:"dests",apply:"dests",track:"dests",tour:"tours",article:"blog",how:"services",faq:"contact"};
const pr=t=>t.price?`<small>from</small> <b>$${t.price}</b>`:"<b>Get a quote</b>";
const tcard=(t,i)=>`<article class="dest spot"><div class="img" data-src="${SM(t.s)}" style="--h:${t.h}">${t.tag?`<b class="badge">${t.tag}</b>`:""}<span class="tag"><i data-ic="clock"></i>${t.d} days · ${t.c}</span><span class="emo">${t.l}</span></div><div class="body"><h3>${t.n}</h3><div class="meta">${t.rt}</div><div class="price"><div>${pr(t)}</div><a class="btn sm" href="tour.html?t=${i}">View tour</a></div></div></article>`;
const bcard=(a,i)=>`<article class="dest spot"><div class="img" data-src="${SM(a.s)}" style="--h:${a.h}"><span class="tag">${a.cat}</span><span class="emo">${a.l}</span></div><div class="body"><h3>${a.t}</h3><div class="meta">${a.p[0].slice(0,95)}…</div><a href="article.html?a=${i}" class="btn sm dark" style="align-self:flex-start;margin-top:12px">Read guide</a></div></article>`;

/* ===== SHARED CHROME: backdrop, header, footer, dock ===== */
document.body.insertAdjacentHTML("afterbegin",'<div class="bgfx" aria-hidden="true"><i class="a1"></i><i class="a2"></i><i class="a3"></i><div class="dots"></div><div class="grain"></div></div>');
const NAV=[["index.html","Home","home"],["destinations.html","Visas","dests"],["tours.html","Tours","tours"],["umrah.html","Umrah","umrah"],["services.html","Services","services"],["blog.html","Blog","blog"],["about.html","About","about"],["contact.html","Contact","contact"]];
$("#hdr").innerHTML=`<div class="top"><div class="wrap"><span><a href="tel:+923000000000">+92 300 0000000</a> · <a href="mailto:support@visaroute.com">support@visaroute.com</a></span><span>Mon–Sat, 9am–9pm</span></div></div>
<header id="siteHdr"><div class="nav"><a href="index.html" class="logo" aria-label="VisaRoute home"><i>${ic("plane")}</i><span>Visa<b>Route</b></span></a>
<nav aria-label="Main"><ul id="menu">${NAV.map(n=>`<li><a href="${n[0]}" class="${n[2]===(ACT[pg]||pg)?"on":""}"${n[2]===(ACT[pg]||pg)?' aria-current="page"':""}>${n[1]}</a></li>`).join("")}</ul></nav>
<div class="hdr-r"><button class="icon-btn" id="sfxBtn" type="button" aria-pressed="${SFX.on}" aria-label="Sound effects"><span class="on-ic">${ic("sound")}</span><span class="off-ic">${ic("mute")}</span></button><a href="apply.html" class="btn sm hdr-apply">Apply now</a><button class="icon-btn menu" id="mbtn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="menu">${ic("menu")}</button></div></div></header>`;
$("#ftr").innerHTML=`<footer><div class="wrap">
<div class="f-big"><h2>Your next stamp starts <span class="gold">here.</span></h2><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="apply.html">Apply for a visa</a><a class="btn ghost" href="index.html#plan">Plan a trip</a></div></div>
<div class="fgrid">
<div><div class="logo" style="margin-bottom:14px"><i>${ic("plane")}</i><span>Visa<b>Route</b></span></div><p>Visas and holidays for travellers worldwide. Expert document checks, curated tours and friendly support.</p>
<div class="socials"><a class="icon-btn" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic("chat")}</a><a class="icon-btn" href="mailto:support@visaroute.com" aria-label="Email">${ic("mail")}</a><a class="icon-btn" href="tel:+923000000000" aria-label="Call">${ic("phone")}</a></div></div>
<div><h4>Visas</h4><ul><li><a href="destinations.html">All destinations</a></li><li><a href="apply.html">Apply now</a></li><li><a href="track.html">Track application</a></li><li><a href="how-it-works.html">How it works</a></li></ul></div>
<div><h4>Travel</h4><ul><li><a href="tours.html">Holiday tours</a></li><li><a href="umrah.html">Umrah packages</a></li><li><a href="tour.html?t=7">World tour</a></li><li><a href="services.html">Our services</a></li><li><a href="blog.html">Travel blog</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li><li><a href="mailto:support@visaroute.com">support@visaroute.com</a></li></ul></div></div>
<div class="copy"><span>© 2026 VisaRoute. All rights reserved. · Privacy · Terms · Refund policy</span>
<div class="nexlyr"><img src="images/nexlyr-logo.svg" alt="Nexlyr Solutions" width="21" height="34" loading="lazy"><span class="nexlyr__txt"><small>Designed &amp; built by</small><b>NEXLYR SOLUTIONS</b></span><a class="nx-btn" href="https://nexlyr.solutions" target="_blank" rel="noopener">Connect ${ic("arrow")}</a></div></div></div></footer>
<div class="dock"><a class="wa" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp us">${ic("chat")}</a></div><div id="toast" role="status"></div>`;
/* header page-photo for inner pages */
const PHI={dests:"singapore",tours:"maldives-honeymoon",umrah:"umrah-premium",services:"world-tour",blog:"best-time-turkey",about:"about",contact:"contact",faq:"first-trip-dubai",how:"schengen-mistakes",track:"uk",apply:"uae"};
{const ph=$(".ph");if(ph&&PHI[pg])ph.dataset.src=IMG(PHI[pg])}
/* menu: compact dropdown, closes on outside click / Esc */
const menuSet=o=>{$("#menu").classList.toggle("open",o);$("#mbtn").setAttribute("aria-expanded",o);$("#mbtn").innerHTML=ic(o?"x":"menu")};
$("#mbtn").onclick=e=>{e.stopPropagation();menuSet(!$("#menu").classList.contains("open"))};
document.addEventListener("click",e=>{if($("#menu").classList.contains("open")&&!e.target.closest("#menu"))menuSet(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#menu").classList.contains("open")){menuSet(false);$("#mbtn").focus()}});
$("#sfxBtn").onclick=()=>{SFX.set(!SFX.on);$("#sfxBtn").setAttribute("aria-pressed",SFX.on);SFX.arm();SFX.click()};
/* header glass deepens on scroll + hero parallax */
{const h=$("#siteHdr"),hm=$("#heroMedia");let tk=false;const f=()=>{tk=false;const y=scrollY;h.classList.toggle("scrolled",y>24);if(hm&&!RM&&y<innerHeight*1.2)hm.style.transform=`translate3d(0,${y*.22}px,0)`};
 addEventListener("scroll",()=>{if(!tk){tk=true;requestAnimationFrame(f)}},{passive:true});f()}


/* ===== PAGE LOGIC ===== */
const P={
dests(){chipsFor(D,"r",card)},
dest(){
 const i=+Q.get("c")||0,c=D[i]||D[0];document.title=c.n+" visa – VisaRoute";const ph=$(".ph");ph.dataset.src=IMG(c.s);
 $("#d-title").innerHTML=`${flag(c)} ${c.n} visa`;$("#d-crumb").textContent=c.n;
 $("#d-facts").innerHTML=[["Visa format",c.k],["Processing",c.t],["Max stay",c.stay],["Validity",c.v],["Total from","$"+price(c)]].map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");
 $("#d-docs").innerHTML=DOCS.map(d=>`<li>${d}</li>`).join("");
 $("#d-type").innerHTML=Object.keys(M).map(t=>`<option>${t}</option>`).join("");
 const up=()=>$("#d-price").textContent="$"+price(c,$("#d-type").value);$("#d-type").onchange=up;up();
 $("#d-go").onclick=()=>location.href=`apply.html?c=${i}&t=${$("#d-type").value}`;
 $("#d-more").innerHTML=D.map((x,j)=>[x,j]).filter(([,j])=>j!==i).slice(0,4).map(([x,j])=>card(x,j)).join("");
},
apply(){
 $("#a-dest").innerHTML=opts(D);$("#a-type").innerHTML=Object.keys(M).map(t=>`<option>${t}</option>`).join("");
 $("#a-dest").value=+Q.get("c")||0;if(M[Q.get("t")])$("#a-type").value=Q.get("t");
 const sum=()=>{const c=D[$("#a-dest").value],t=$("#a-type").value,n=+$("#a-trav").value,g=Math.round(c.gov*M[t]);
  $("#sumFlag").innerHTML=flag(c);$("#s-dest").textContent=c.n;$("#s-type").textContent=t;$("#s-time").textContent=c.t;
  $("#s-gov").textContent="$"+g*n;$("#s-svc").textContent="$"+c.svc*n;$("#s-total").textContent="$"+(g+c.svc)*n};
 ["#a-dest","#a-type","#a-trav"].forEach(s=>$(s).onchange=sum);sum();
 $("#appForm").onsubmit=e=>{e.preventDefault();
  const order={destination:D[$("#a-dest").value].n,visaType:$("#a-type").value,travellers:+$("#a-trav").value,name:$("#a-name").value,email:$("#a-email").value,phone:$("#a-phone").value,passport:$("#a-pass").value,travelDate:$("#a-date").value,total:$("#s-total").textContent,paymentMethod:document.querySelector("input[name=pm]:checked").value};
  /* ===== PAYMENT INTEGRATION POINT =====
     Yahan apna payment code lagayein. "order" object mein poora data hai.
     paypal -> PayPal Buttons SDK | card -> Stripe/PayFast/2Checkout
     bank -> bank details dikhayein | wallet -> JazzCash/Easypaisa API
     Payment success hone ke baad neeche wala confirmation dikhayein. */
  console.log("Order:",order);
  const ref="VR-"+Math.random().toString(36).slice(2,8).toUpperCase();
  $("#appForm").innerHTML=`<div class="ok done-card"><div class="tick">${ic("check")}</div><h2>Application received</h2><p>Your reference number is</p><div class="ref">${ref}</div><p>We emailed the details to ${order.email.replace(/[<>&"]/g,"")}. Keep this number to track your visa.</p><p style="margin-top:18px"><a class="btn teal" href="track.html?ref=${ref}">Track application</a></p><p class="note">Demo mode: payment gateway is not connected yet.</p></div>`;
  SFX.success();scrollTo({top:0,behavior:"smooth"})};
},
track(){
 const S=["Application received","Documents under review","Submitted to embassy","Visa issued"];
 const go=ref=>{const n=[...ref].reduce((a,c)=>a+c.charCodeAt(0),0)%4;
  $("#t-out").innerHTML=`<h3>Reference ${ref.replace(/[<>&"]/g,"")}</h3><ul class="tl">${S.map((s,i)=>`<li class="${i<=n?"done":""}">${s}</li>`).join("")}</ul><p class="note">Demo status. Connect your backend to show real progress.</p>`;SFX.msg()};
 $("#t-form").onsubmit=e=>{e.preventDefault();go($("#t-ref").value.trim().toUpperCase())};
 if(Q.get("ref")){$("#t-ref").value=Q.get("ref");go(Q.get("ref"))}
},
contact(){$("#c-form").onsubmit=e=>{e.preventDefault();e.target.reset();SFX.success();toast("Message sent. We will reply within the hour. (Demo: connect your backend.)")}}
};

const chipsFor=(list,key,get)=>{let r="All",q="";const rs=["All",...new Set(list.map(x=>x[key]))];
 const draw=()=>{$("#chips").innerHTML=rs.map(x=>`<button class="chip" aria-pressed="${x===r}" data-r="${x}">${x}</button>`).join("");
  const l=list.map((x,i)=>[x,i]).filter(([x])=>(r==="All"||x[key]===r)&&x.n.toLowerCase().includes(q));
  $("#grid").innerHTML=l.length?l.map(([x,i])=>get(x,i)).join(""):"<p>Nothing found. Message us and we will arrange a custom plan — we cover 100+ countries.</p>";
  $$("#grid>*").forEach((el,k)=>el.animate([{opacity:0,transform:"translateY(14px)"},{opacity:1,transform:"none"}],{duration:500,delay:k*40,easing:"cubic-bezier(.16,1,.3,1)",fill:"backwards"}))};
 $("#chips").onclick=e=>{if(e.target.dataset.r){r=e.target.dataset.r;draw()}};$("#srch").oninput=e=>{q=e.target.value.toLowerCase();draw()};draw()};
const tile=(x,href,big)=>`<a class="img ${big?"big":""}" href="${href}" data-src="${big?IMG(x.s):SM(x.s)}" style="--h:${x.h}"><span class="emo">${x.l}</span><em>${x.n}</em></a>`;

Object.assign(P,{
home(){
 $("#f-dest").innerHTML=opts(D);
 $("#finder").onsubmit=e=>{e.preventDefault();location.href=`apply.html?c=${$("#f-dest").value}&t=${$("#f-type").value}`};
 $("#pop").innerHTML=[0,3,4,5,6,8].map(i=>card(D[i],i)).join("");
 $("#tpop").innerHTML=[0,1,2,3,4,5].map(i=>tcard(TOURS[i],i)).join("");
 $("#blogp").innerHTML=ARTS.slice(0,3).map(bcard).join("");
 $("#mos").innerHTML=tile(TOURS[3],"tour.html?t=3",1)+tile(D[3],"destination.html?c=3")+tile(TOURS[2],"tour.html?t=2")+tile(D[9],"destination.html?c=9")+tile(TOURS[0],"tour.html?t=0");
 $("#nl").onsubmit=e=>{e.preventDefault();e.target.reset();SFX.success();toast("Subscribed. (Demo: connect your email service.)")};
 $("#flagStack").innerHTML=[0,4,5,6,11].map(i=>`<img src="images/flags/${D[i].cc}.svg" alt="" width="34" height="26">`).join("");
 heroPass();explorer();planForm();
}});

/* hero boarding pass — cycles featured visas */
function heroPass(){
 const seq=[0,3,4,5,8,1],set=i=>{const c=D[i];$("#passPhoto").style.backgroundImage=`url("${SM(c.s)}")`;$("#passTag").innerHTML=`${flag(c)} ${c.r}`;
  $("#passWhere").textContent=c.n;$("#passTo").textContent=c.city;$("#passK").textContent=c.k;$("#passT").textContent=c.t;$("#passP").textContent="$"+price(c)};
 let k=0;set(seq[0]);seq.forEach(i=>{const im=new Image();im.src=SM(D[i].s)});
 if(RM)return;setInterval(()=>{if(document.hidden)return;k=(k+1)%seq.length;const p=$("#pass");
  p.animate([{opacity:1,transform:"rotateY(0)"},{opacity:.35,transform:"rotateY(-10deg)"}],{duration:260,easing:"cubic-bezier(.7,0,.84,0)"}).onfinish=()=>{set(seq[k]);p.animate([{opacity:.35,transform:"rotateY(10deg)"},{opacity:1,transform:"rotateY(0)"}],{duration:520,easing:"cubic-bezier(.16,1,.3,1)"})}},4200);
}

/* destination explorer — big photo stage + glass rail */
function explorer(){
 const rail=$("#rail"),st=$("#stage"),A=$(".ph-a",st),B=$(".ph-b",st);let cur=-1,front=A,timer,user=false;
 rail.innerHTML=D.map((c,i)=>`<li><button type="button" role="tab" aria-selected="false" data-i="${i}"><span class="th" data-src="${SM(c.s)}">${flag(c)}</span><span><b>${c.n}</b><small>${c.k} · ${c.t}</small></span><span class="pr">$${price(c)}</span></button></li>`).join("");
 const show=(i,snd)=>{if(i===cur)return;cur=i;const c=D[i];
  $$("button",rail).forEach(b=>b.setAttribute("aria-selected",+b.dataset.i===i));
  const back=front===A?B:A,im=new Image();im.onload=()=>{back.style.backgroundImage=`url("${IMG(c.s)}")`;st.classList.toggle("swap",back===B);front=back};im.src=IMG(c.s);
  $("#stName").textContent=c.n;$("#stRegion").innerHTML=`${flag(c)} ${c.r}`;$("#stValid").textContent="Valid "+c.v;
  $("#stK").textContent=c.k;$("#stT").textContent=c.t;$("#stS").textContent=c.stay;$("#stP").textContent="$"+price(c);
  $("#stApply").href=`apply.html?c=${i}`;$("#stMore").href=`destination.html?c=${i}`;
  $$(".stage-info>*",st).forEach((el,k)=>el.animate([{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"none"}],{duration:520,delay:k*60,easing:"cubic-bezier(.16,1,.3,1)",fill:"backwards"}));
  if(snd)SFX.swap()};
 rail.onclick=e=>{const b=e.target.closest("button");if(b){user=true;show(+b.dataset.i,1)}};
 rail.onkeydown=e=>{if(!/Arrow(Up|Down|Left|Right)/.test(e.key))return;e.preventDefault();const n=(cur+(/Up|Left/.test(e.key)?-1:1)+D.length)%D.length;user=true;show(n,1);$(`button[data-i="${n}"]`,rail).focus()};
 show(0);
 if(!RM)timer=setInterval(()=>{if(!user&&!document.hidden&&!st.matches(":hover")&&!rail.matches(":hover"))show((cur+1)%D.length)},6000);
}

/* plan-my-trip form */
function planForm(){
 const f=$("#planForm"),html=f.innerHTML;
 const bind=()=>{
  $("#p-d").innerHTML=`<optgroup label="Visas">${D.map(c=>`<option>${c.n}</option>`).join("")}</optgroup><optgroup label="Tours">${TOURS.map(t=>`<option>${t.n}</option>`).join("")}</optgroup><option>Not sure yet</option>`;
  const b=$("#p-b"),bo=$("#p-bo"),upd=()=>{bo.textContent="$"+(+b.value).toLocaleString("en-US")+(+b.value>=6000?"+":"");b.style.setProperty("--p",((b.value-b.min)/(b.max-b.min)*100)+"%")};b.oninput=upd;upd();
  $$("[data-step]",f).forEach(x=>x.onclick=()=>{const t=$("#p-t");t.value=Math.min(30,Math.max(1,(+t.value||1)+ +x.dataset.step));SFX.click()});
  $$("input[name=svc]",f).forEach(r=>r.onchange=()=>{if(r.value==="Umrah")$("#p-d").value="Umrah & Ziyarat Package";if(r.value==="Tour"&&D.some(c=>c.n===$("#p-d").value))$("#p-d").value=TOURS[0].n});
  f.onsubmit=e=>{e.preventDefault();const req=[$("#p-n"),$("#p-p")];for(const r of req){if(!r.value.trim()){r.focus();r.reportValidity&&r.setCustomValidity("Please fill this in");r.reportValidity();r.oninput=()=>r.setCustomValidity("");return}}
   const em=$("#p-e");if(em.value&&!em.checkValidity()){em.reportValidity();return}
   const plan={service:$("input[name=svc]:checked",f).value,name:$("#p-n").value.trim(),phone:$("#p-p").value.trim(),email:em.value.trim(),destination:$("#p-d").value,month:$("#p-m").value,travellers:$("#p-t").value,budget:$("#p-bo").textContent,notes:$("#p-x").value.trim()};
   /* ===== TRIP PLAN INTEGRATION POINT: yahan "plan" object apne backend / Supabase / email par bhejein ===== */
   console.log("Trip plan:",plan);
   const btn=$("button[type=submit]",f);btn.classList.add("is-loading");btn.disabled=true;
   setTimeout(()=>{const ref="VR-"+Math.random().toString(36).slice(2,7).toUpperCase(),esc=s=>s.replace(/[<>&"]/g,"");
    const msg=`Assalam o alaikum VisaRoute! Trip plan ${ref}\nService: ${plan.service}\nDestination: ${plan.destination}\nMonth: ${plan.month||"flexible"}\nTravellers: ${plan.travellers}\nBudget: ${plan.budget} pp\nName: ${plan.name}\nPhone: ${plan.phone}${plan.notes?"\nNotes: "+plan.notes:""}`;
    f.innerHTML=`<div class="done-card"><div class="tick">${ic("check")}</div><h3 style="font-size:1.8rem">Trip plan received</h3><p style="margin:10px auto 6px;max-width:42ch">Thanks ${esc(plan.name.split(" ")[0])}. A travel expert will message you on WhatsApp within the hour with options for <b style="color:var(--c-text)">${esc(plan.destination)}</b>.</p><div class="ref">${ref}</div>
     <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px"><a class="btn teal" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Continue on WhatsApp</a><button class="btn ghost" type="button" id="p-again">Plan another trip</button></div></div>`;
    SFX.success();$("#p-again").onclick=()=>{f.innerHTML=html;fillIcons(f);bind()}},750)};
 };bind();
}


Object.assign(P,{
tours(){chipsFor(TOURS,"c",tcard)},
tour(){
 const i=+Q.get("t")||0,t=TOURS[i]||TOURS[0];document.title=t.n+" – VisaRoute";
 const ph=$(".ph");ph.dataset.src=IMG(t.s);
 $("#tr-title").textContent=t.n;$("#tr-crumb").textContent=t.n;
 $("#tr-facts").innerHTML=[["Duration",t.d+" days"],["Route",t.rt],["Category",t.c],["Price",t.price?"from $"+t.price:"Get a quote"]].map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");
 $("#tr-hi").innerHTML=t.hi.map(x=>`<li>${x}</li>`).join("");
 $("#tr-it").innerHTML=t.it.map(x=>`<li class="done">${x}</li>`).join("");
 $("#tr-inc").innerHTML=INC.map(x=>`<li>${x}</li>`).join("");
 $("#tr-exc").innerHTML=EXC.map(x=>`<li>${x}</li>`).join("");
 $("#tr-more").innerHTML=TOURS.map((x,j)=>[x,j]).filter(([,j])=>j!==i).slice(0,3).map(([x,j])=>tcard(x,j)).join("");
 $("#tr-form").onsubmit=e=>{e.preventDefault();
  /* ===== TOUR BOOKING INTEGRATION POINT: yahan form data apne backend/payment par bhejein ===== */
  e.target.reset();SFX.success();toast("Enquiry sent. We will contact you within the hour. (Demo mode)")};
},
blog(){$("#grid").innerHTML=ARTS.map(bcard).join("")},
article(){
 const a=ARTS[+Q.get("a")||0]||ARTS[0];document.title=a.t+" – VisaRoute";const ph=$(".ph");if(ph)ph.dataset.src=IMG(a.s);
 $("#ar-title").textContent=a.t;$("#ar-crumb").textContent=a.cat;$("#ar-body").innerHTML=a.p.map(x=>`<p>${x}</p>`).join("");
 $("#ar-more").innerHTML=ARTS.filter(x=>x!==a).slice(0,3).map(x=>bcard(x,ARTS.indexOf(x))).join("");
}});

const ucard=(u,i)=>`<article class="dest spot"><div class="img" data-src="${SM(u.s)}" style="--h:${u.h}">${u.tag?`<b class="badge">${u.tag}</b>`:""}<span class="tag"><i data-ic="clock"></i>${u.d} days</span><span class="emo">${u.l}</span></div><div class="body"><h3>${u.n}</h3><div class="meta">Makkah &amp; Madinah · ${u.hot}</div><ul class="list" style="margin:12px 0">${u.inc.map(x=>`<li>${x}</li>`).join("")}</ul><div class="price"><div>${u.price?`<small>from</small> <b>$${u.price}</b>`:"<b>Get a quote</b>"}</div><a class="btn sm" href="#u-form" data-pk="${i}">Enquire</a></div></div></article>`;
Object.assign(P,{umrah(){
 $("#um-pk").innerHTML=UM.map(ucard).join("");
 $("#u-pk").innerHTML=UM.map(u=>`<option>${u.n}</option>`).join("");
 $("#um-pk").onclick=e=>{const a=e.target.closest("[data-pk]");if(a)$("#u-pk").selectedIndex=+a.dataset.pk};
 $("#t-form").onsubmit=e=>{e.preventDefault();
  /* ===== UMRAH TICKET INTEGRATION POINT: yahan flight enquiry apne backend/email par bhejein ===== */
  e.target.reset();SFX.success();toast("Ticket enquiry sent. We will send fares within the hour. (Demo mode)")};
 $("#u-form").onsubmit=e=>{e.preventDefault();
  /* ===== UMRAH PACKAGE INTEGRATION POINT ===== */
  e.target.reset();SFX.success();toast("Package enquiry sent. Our Umrah team will call you. (Demo mode)")};
}});

/* ===== UMRAH DATA (edit hotels/inclusions; price:null shows "Get a quote") ===== */
const UM=[
{s:"umrah-economy",n:"Economy Umrah",d:14,tag:"Value",l:"🕋",hot:"Makkah 3★ about 1 km from Haram · Madinah 3★",inc:["Umrah visa processing","Shared hotel rooms","Group transport","Guided ziyarat"]},
{s:"umrah-standard",n:"Standard Umrah",d:15,tag:"Popular",l:"🕌",hot:"Makkah 4★ about 500 m from Haram · Madinah 4★ near Masjid an-Nabawi",inc:["Umrah visa processing","Double or triple rooms","Breakfast included","Guided ziyarat","Airport transfers"]},
{s:"umrah-premium",n:"Premium Umrah",d:21,l:"🌙",hot:"Makkah 5★ with Haram view · Madinah 5★ in front of Nabawi",inc:["Umrah visa processing","Private transport","Breakfast and dinner","Dedicated guide","Flexible dates"]}];
UM.forEach((u,i)=>u.h=(i*40+150)%360);
/* ===== AI CHAT ASSISTANT =====
   Abhi ye built-in rules par chalta hai (koi server nahi chahiye).
   Asli AI (Claude/OpenAI) lagane ke liye apne server ka URL neeche likhein.
   Server ko POST {message, history} milega aur {reply:"text"} wapas dena hai.
   API key kabhi front end mein na rakhein, sirf server par. */
const AI_ENDPOINT="";
const ALI=[[/uae|dubai|emirates|abu dhabi/,0],[/saudi|ksa|riyadh/,1],[/qatar|doha/,2],[/turkey|turkiye|istanbul/,3],[/schengen|europe|france|italy|germany|spain|paris/,4],[/\buk\b|britain|england|london/,5],[/\busa\b|america|united states|new york/,6],[/canada/,7],[/malaysia/,8],[/thailand|bangkok|phuket/,9],[/singapore/,10],[/australia/,11]];
const UR=/kitn|chahiye|chahie|\bhai\b|\bhain\b|kya|mujhe|kaise|karna|krna|krn|bhej|umra|qeemat|kharch|jaana|jana/;
const L=(en,ur,u)=>u?ur:en;
const KB=[
[/^(hi|hello|hey|salam|assalam|aoa|slam)|assalam/,u=>L("Hello! I’m the VisaRoute assistant. I can help with visas, tours, Umrah and tickets. What do you need?","Assalam o alaikum! Main VisaRoute assistant hoon. Visa, tours, Umrah aur tickets mein madad kar sakta hoon. Aap ko kya chahiye?",u)],
[/ticket|flight|fare|airline|jahaz|jahaz/,u=>L("We book flights worldwide, including Jeddah and Madinah for Umrah. Send your route and dates through the <a href='umrah.html#t-form'>ticket form</a> or <a href='contact.html'>contact us</a>.","Hum duniya bhar ki flights book karte hain, Umrah ke liye Jeddah aur Madinah bhi. <a href='umrah.html#t-form'>Ticket form</a> bhar dein ya <a href='contact.html'>rabta karein</a>.",u)],
[/umrah|umra|makkah|mecca|madinah|medina|hajj|haram/,u=>L("We offer Economy, Standard and Premium Umrah packages with visa, hotels, transport and guided ziyarat, plus Umrah flight tickets. <a href='umrah.html'>See Umrah packages and tickets</a>.","Hamare paas Economy, Standard aur Premium Umrah packages hain (visa, hotel, transport, ziyarat) aur Umrah ki flight tickets bhi. <a href='umrah.html'>Umrah page dekhein</a>.",u)],
[/world tour|around the world/,u=>L("Our 21-day world tour covers Dubai, Istanbul, Paris, London and New York. <a href='tour.html?t=7'>View itinerary</a>.","21 din ka world tour: Dubai, Istanbul, Paris, London aur New York. <a href='tour.html?t=7'>Itinerary dekhein</a>.",u)],
[/tour|package|holiday|honeymoon|maldives|trip|vacation/,u=>L("We have tours for Dubai, Turkey, Europe, Maldives, Malaysia, Thailand and more. <a href='tours.html'>Browse all tours</a>, or tell me your budget and dates.","Dubai, Turkey, Europe, Maldives, Malaysia, Thailand aur mazeed tours hain. <a href='tours.html'>Saare tours dekhein</a>.",u)],
[/track|status|reference/,u=>L("You can check progress on the <a href='track.html'>tracking page</a> with your reference number.","<a href='track.html'>Track page</a> par apna reference number daal kar status dekhein.",u)],
[/pay|paypal|card|bank|jazz|easypaisa|visa card|payment/,u=>L("We accept PayPal, credit/debit cards, bank transfer and JazzCash/Easypaisa. You choose at checkout.","PayPal, card, bank transfer aur JazzCash/Easypaisa qabil-e-qabool hain. Checkout par chun lein.",u)],
[/document|paper|requirement|need to apply|kagaz|passport/,u=>L("Usually: passport valid 6+ months, photo, bank statement, bookings and ID copy. Exact needs depend on the country. <a href='destinations.html'>Pick a country</a> to see more.","Aam tor par: 6 mahine se zyada valid passport, photo, bank statement, bookings aur CNIC copy. Mukammal list ke liye <a href='destinations.html'>mulk chunein</a>.",u)],
[/how long|processing|time|days|kitne din|kab tak/,u=>L("Processing ranges from 1–2 days for some e-visas to several weeks for embassy visas. Each <a href='destinations.html'>country page</a> shows the time.","E-visa 1–2 din mein, embassy visa kai hafton mein. Har <a href='destinations.html'>country page</a> par time likha hai.",u)],
[/refund|cancel|reject|refus/,u=>L("Government fees are not refundable once submitted. Our service fee is partly refundable as per the refund policy. Our document review lowers refusal risk.","Government fee submit hone ke baad wapas nahi hoti. Service fee refund policy ke mutabiq. Document review se refusal ka risk kam hota hai.",u)],
[/contact|whatsapp|phone|call|number|human|agent|office|address/,u=>L("Talk to a person on <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a> or visit the <a href='contact.html'>contact page</a>. We reply within the hour (Mon–Sat, 9am–9pm).","<a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a> par baat karein ya <a href='contact.html'>contact page</a> dekhein. Hum ghante ke andar jawab dete hain.",u)],
[/price|fee|cost|rate|charges|kitna|kitne|qeemat/,u=>L("Visa prices depend on the country and visa type. Tell me the country, or open <a href='destinations.html'>destinations</a>. Tour and Umrah prices are quoted per your dates and group.","Visa ki qeemat mulk aur visa type par hai. Mulk ka naam bata dein ya <a href='destinations.html'>destinations</a> dekhein. Tours aur Umrah ki quote dates ke hisaab se milti hai.",u)],
[/thank|shukriya|thanks|jazak/,u=>L("You’re welcome! Anything else I can help with?","Khushi hui! Kuch aur madad chahiye?",u)],
[/visa|apply/,u=>L("I can help you apply. Tell me the country, or <a href='apply.html'>start your application</a>.","Main apply karne mein madad karunga. Mulk ka naam bata dein ya <a href='apply.html'>application shuru karein</a>.",u)]];
function botReply(t){
 const m=t.toLowerCase(),u=UR.test(m);
 if(!/umrah|umra|ticket|flight|tour/.test(m)){for(const[r,i]of ALI)if(r.test(m)){const c=D[i];
  return L(`${flag(c)} <b>${c.n}</b>: ${c.k}, processing ${c.t}, from <b>$${price(c)}</b> (tourist). <a href='destination.html?c=${i}'>See requirements</a> or <a href='apply.html?c=${i}'>apply now</a>.`,`${flag(c)} <b>${c.n}</b>: ${c.k}, processing ${c.t}, tourist visa <b>$${price(c)}</b> se shuru. <a href='destination.html?c=${i}'>Requirements</a> ya <a href='apply.html?c=${i}'>abhi apply karein</a>.`,u)}}
 for(const[r,f]of KB)if(r.test(m))return f(u);
 return L("I’m not sure about that one. You can ask about visas, tours, Umrah, tickets or payments, or chat with our team on <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a>.","Is baare mein mujhe pakka nahi pata. Visa, tours, Umrah, tickets ya payment ke baare mein puchein, ya <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a> par team se baat karein.",u)}
(function(){
 const w=document.createElement("div");
 w.innerHTML=`<section id="cb" aria-label="Chat assistant" aria-hidden="true"><div class="cb-h"><div class="who"><span class="av">${ic("plane")}</span><div><b>VisaRoute Assistant</b><small>Online · instant answers</small></div></div><button id="cb-x" type="button" aria-label="Close chat">${ic("x")}</button></div>
 <div class="cb-m" id="cb-m" aria-live="polite"></div>
 <div class="cb-q" id="cb-q"><button type="button">Visa price</button><button type="button">Umrah packages</button><button type="button">Flight tickets</button><button type="button">Tours</button><button type="button">Talk to a person</button></div>
 <form class="cb-f" id="cb-f"><input id="cb-i" placeholder="Type your question…" aria-label="Message" autocomplete="off"><button class="btn" type="submit" aria-label="Send">${ic("arrow")}</button></form></section>`;
 document.body.appendChild(w);
 $(".dock").insertAdjacentHTML("beforeend",`<button class="cb-btn" id="cb-btn" type="button" aria-expanded="false" aria-controls="cb"><i>${ic("chat")}</i>Ask us</button>`);
 const box=$("#cb"),msgs=$("#cb-m"),hist=[];
 const add=(h,who,raw)=>{const d=document.createElement("div");d.className="m "+who;raw?d.textContent=h:d.innerHTML=h;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d};
 const open=o=>{if(o===box.classList.contains("open"))return;box.classList.toggle("open",o);box.scrollTop=0;box.setAttribute("aria-hidden",!o);$("#cb-btn").setAttribute("aria-expanded",o);
  if(o){SFX.open();if(!msgs.children.length)add("Assalamu alaikum! 👋 I’m the VisaRoute assistant. Ask me about visas, tours, Umrah or tickets. Aap Roman Urdu mein bhi likh sakte hain.","b");setTimeout(()=>$("#cb-i").focus({preventScroll:true}),120)}else SFX.close()};
 $("#cb-btn").onclick=()=>open(!box.classList.contains("open"));$("#cb-x").onclick=()=>{open(false);$("#cb-btn").focus()};
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&box.classList.contains("open")){open(false);$("#cb-btn").focus()}});
 async function ask(t){add(t,"u",1);hist.push({role:"user",content:t});const d=add('<span class="typing"><i></i><i></i><i></i></span>',"b");let r;
  if(AI_ENDPOINT){try{const x=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,history:hist})});r=(await x.json()).reply}catch(e){r=null}}
  if(!r){await new Promise(z=>setTimeout(z,650));r=botReply(t)}
  d.innerHTML=r;hist.push({role:"assistant",content:r});msgs.scrollTop=msgs.scrollHeight;SFX.msg()}
 $("#cb-f").onsubmit=e=>{e.preventDefault();const i=$("#cb-i"),t=i.value.trim();if(t){i.value="";ask(t)}};
 $("#cb-q").onclick=e=>{if(e.target.tagName==="BUTTON")ask(e.target.textContent)};
})();

/* ===== MOTION: spotlight + tilt, scroll reveal ===== */
if(matchMedia("(hover:hover) and (pointer:fine)").matches&&!RM){
 let tgt=null,ev=null,raf=0;
 const run=()=>{raf=0;if(!tgt||!ev)return;const r=tgt.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width,y=(ev.clientY-r.top)/r.height;
  tgt.style.setProperty("--mx",x*100+"%");tgt.style.setProperty("--my",y*100+"%");
  if(tgt.matches(".dest,.pass"))tgt.style.transform=`perspective(900px) rotateX(${(.5-y)*5}deg) rotateY(${(x-.5)*6}deg) translateY(-4px)`};
 document.addEventListener("pointermove",e=>{const s=e.target.closest(".spot");if(s!==tgt){if(tgt&&tgt.matches(".dest,.pass"))tgt.style.transform="";tgt=s}ev=e;if(tgt&&!raf)raf=requestAnimationFrame(run)},{passive:true});
 document.addEventListener("pointerleave",()=>{if(tgt&&tgt.matches(".dest,.pass"))tgt.style.transform="";tgt=null});
}
function reveal(){
 if(RM||!("IntersectionObserver"in window))return;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
 $$("main section h2,main section .sub,main .eyebrow,.grid>*,.feat>*,.steps>*,.quotes>*,.mosaic>*,.box,.facts>div,details,.world,.stage,.rail,.plan-card,.plan-copy,.news,.cta,.types>*,.team>*,.f-big,.stat,.fgrid>*").forEach(el=>{
  if(el.getBoundingClientRect().top<innerHeight*.95)return; /* never hide what is already on screen — no load blink */
  const sib=el.parentElement?[...el.parentElement.children].indexOf(el):0;el.style.setProperty("--d",(sib%4)*.07+"s");el.classList.add("rv");io.observe(el)});
}

P[pg]&&P[pg]();fillIcons();hyd();reveal();
