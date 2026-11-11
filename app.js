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
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches,FINE=matchMedia("(hover:hover) and (pointer:fine)").matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],Q=new URLSearchParams(location.search),pg=document.body.dataset.page;
const price=(c,t="Tourist")=>Math.round(c.gov*M[t])+c.svc;
const opts=a=>a.map((x,i)=>`<option value="${i}">${x.n}</option>`).join("");
const CC=["ae","sa","qa","tr","eu","gb","us","ca","my","th","sg","au"],CITY=["Dubai","Riyadh","Doha","Istanbul","Paris","London","New York","Toronto","Kuala Lumpur","Bangkok","Singapore","Sydney"];
const IATA=["DXB","RUH","DOH","IST","CDG","LHR","JFK","YYZ","KUL","BKK","SIN","SYD"];
D.forEach((c,i)=>{c.cc=CC[i];c.city=CITY[i];c.iata=IATA[i];c.stay=c.s}); /* keep max-stay before c.s becomes the photo slug */
const flag=c=>`<img class="flag" src="images/flags/${c.cc}.svg" alt="" width="22" height="16">`;
/* photos: /images (large) and /images/sm (cards) */
const IMG=s=>`images/${s}.webp`,SM=s=>`images/sm/${s}.webp`;
const WA="920000000000";
const pad=n=>String(n).padStart(2,"0");
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("on"),4200)}

/* ===== ICONS (inline SVG) ===== */
const ICO={
arrow:'<path d="M4 12h15M13 6l6 6-6 6"/>',
plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
bolt:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
lock:'<rect x="4" y="11" width="16" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
compass:'<circle cx="12" cy="12" r="9.5"/><path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4z"/>',
chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
tag:'<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
check:'<path d="M20 6 9 17l-5-5"/>',
clock:'<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
doc:'<path d="M14 2H6v20h12V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
passport:'<rect x="4" y="2" width="16" height="20"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/>',
moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
globe:'<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19"/>',
hotel:'<path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6M8 11h.01M16 11h.01"/>',
map:'<path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3z"/><path d="M9 3v15M15 6v15"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
mail:'<rect x="2" y="4" width="20" height="16"/><path d="m22 7-10 6L2 7"/>',
menu:'<path d="M3 8h18M3 16h12"/>',
x:'<path d="M6 6l12 12M18 6 6 18"/>',
chev:'<path d="m6 9 6 6 6-6"/>',
send:'<path d="M4 12h15M13 6l6 6-6 6"/>',
spark:'<path d="M12 3v18M3 12h18"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">${ICO[n]||ICO.spark}</svg>`;
const EMO={"🛂":"passport","🗺️":"map","🌍":"globe","🕋":"moon","✈️":"plane","🏨":"hotel","🛡️":"shield","🤝":"users","🔐":"lock","⏱️":"clock","🔍":"search","⚡":"bolt","🔒":"lock","🧭":"compass","💬":"chat","💰":"tag"};
const fillIcons=(r=document)=>{$$("i[data-ic]",r).forEach(i=>{if(!i.firstChild)i.innerHTML=ic(i.dataset.ic)});
 $$(".feat i:not([data-ic]),.team i:not([data-ic])",r).forEach(i=>{const k=EMO[i.textContent.trim()]||(i.closest(".team")?"user":"spark");i.dataset.ic=k;i.innerHTML=ic(k)})};
/* rolling-label buttons: wrap each text node once */
const wrapBtns=(r=document)=>$$(".btn:not([data-w])",r).forEach(b=>{b.dataset.w=1;[...b.childNodes].forEach(n=>{if(n.nodeType===3&&n.textContent.trim()){const t=n.textContent.trim(),s=document.createElement("span");s.className="b-t";s.innerHTML=`<span data-t="${t.replace(/"/g,"&quot;")}">${t}</span>`;b.replaceChild(s,n)}})});

/* ===== SOUND (Web Audio, soft & short; off until first tap) ===== */
const SFX=(()=>{let ctx,out,armed=false,last=0,on=true;try{on=localStorage.getItem("vr-sfx")!=="0"}catch(e){}
 const ac=()=>{if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A();
   const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=5200;const cp=ctx.createDynamicsCompressor();cp.threshold.value=-24;out=ctx.createGain();out.gain.value=.9;out.connect(lp).connect(cp).connect(ctx.destination)}
  if(ctx.state==="suspended")ctx.resume();return ctx};
 const note=(f,dur,vol,{type="sine",delay=0,to=f,att=.004}={})=>{const c=ac();if(!c)return;const t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(f,t);if(to!==f)o.frequency.exponentialRampToValueAtTime(to,t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+att);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(out);o.start(t);o.stop(t+dur+.05)};
 const bell=(f,dur,vol,delay=0)=>{note(f,dur,vol,{delay});note(f*2.01,dur*.5,vol*.25,{delay});note(f*3.02,dur*.25,vol*.08,{delay})};
 const noise=(dur,vol,f1,f2,q=.9,delay=0)=>{const c=ac();if(!c)return;const t=c.currentTime+delay,n=Math.ceil(c.sampleRate*dur),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
  const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type="bandpass";f.Q.value=q;f.frequency.setValueAtTime(f1,t);f.frequency.exponentialRampToValueAtTime(f2,t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+dur*.3);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f).connect(g).connect(out);s.start(t)};
 const ok=()=>on&&armed;
 return{get on(){return on},set(v){on=v;try{localStorage.setItem("vr-sfx",v?"1":"0")}catch(e){}},arm(){if(!armed){armed=true;if(on)ac()}},
  hover(){if(!ok())return;const n=performance.now();if(n-last<90)return;last=n;note(2400,.035,.006,{to:2100})},
  click(){if(!ok())return;note(320,.07,.05,{type:"triangle",to:190});noise(.025,.012,2600,1800,2)},
  open(){if(!ok())return;bell(659,.7,.022);bell(988,.9,.018,.09);noise(.35,.01,400,1800)},
  close(){if(!ok())return;bell(988,.35,.014);bell(659,.5,.012,.07)},
  swap(){if(ok())noise(.2,.016,900,2600,.7)},
  tick(){if(ok())note(1800,.03,.008,{type:"triangle"})},
  msg(){if(ok()){bell(1175,.45,.016);bell(1568,.5,.012,.08)}},
  success(){if(ok())[523,659,784,1047].forEach((f,i)=>bell(f,.8,.016,i*.08))}}})();
["pointerdown","keydown"].forEach(e=>addEventListener(e,()=>SFX.arm(),{once:true,passive:true}));
const SND="a.btn,button.btn,.chip,.menu>li>a,.menu>li>button,.dd a,.rail-nav button,.icon-btn,.cb-q button,.seg label,.cb-btn,.wa,.tabs button,.tcard,.vcard,.gcard,.pkg-list a";
document.addEventListener("pointerover",e=>{const t=e.target.closest(SND);if(t&&!t.contains(e.relatedTarget))SFX.hover()});
document.addEventListener("click",e=>{if(e.target.closest("a.btn,button.btn,.chip,.icon-btn:not(#sfxBtn),.cb-q button,.seg label,.rail-nav button,.dd a,.menu>li>button"))SFX.click()});

/* ===== LAZY PHOTOS ===== */
const loadImg=el=>{const src=el.dataset.src,i=new Image();i.decoding="async";i.onload=()=>{el.style.setProperty("--bgi",`url("${src}")`);el.classList.add("has")};i.src=src};
const lio="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){lio.unobserve(e.target);loadImg(e.target)}}),{rootMargin:"600px 600px"}):null;
const hyd=()=>$$("[data-src]:not([data-tried])").forEach(el=>{el.dataset.tried=1;lio?lio.observe(el):loadImg(el)});
new MutationObserver(()=>{hyd();fillIcons();wrapBtns()}).observe(document.documentElement,{childList:true,subtree:true});



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

/* ===== CARDS ===== */
const card=(c,i,t="Tourist")=>`<article class="vcard"><a class="cover" href="/destination?c=${i}" aria-label="${c.n} visa details"></a><div class="ph-img" data-src="${SM(c.s)}"><div></div><span class="code">${flag(c)} ${c.iata} · ${c.k}</span></div><div class="body"><h3>${c.n}</h3><div class="meta">${c.t} · stay ${c.stay}</div><div class="foot"><div class="pr"><small>${t} · from</small><b>$${price(c,t)}</b></div><span class="go">${ic("arrow")}</span></div></div></article>`;
const ACT={dest:"dests",apply:"dests",track:"dests",tour:"tours",article:"blog",how:"services",faq:"contact",umrah:"tours"};
const pr=t=>t.price?`from $${t.price}`:"Get a quote";
const tcard=(t,i)=>`<a class="tcard" href="/tour?t=${i}"><div class="bg" data-src="${IMG(t.s)}"></div><div class="top"><span>${t.d} days · ${t.c}</span>${t.tag?`<b>${t.tag}</b>`:""}</div><div class="bot"><span class="num">${pad(i+1)} / ${pad(TOURS.length)}</span><h3>${t.n}</h3><div class="rt">${t.rt}</div><div class="more"><span>${pr(t)}</span>${ic("arrow")}</div></div></a>`;
const bcard=(a,i)=>`<article class="gcard"><a class="cover" href="/article?a=${i}" aria-label="${a.t}"></a><div class="ph-img" data-src="${SM(a.s)}"><div></div></div><span class="cat">${a.cat} · ${pad(i+1)}</span><h3>${a.t}</h3><p>${a.p[0].slice(0,110)}…</p><span class="link">Read guide ${ic("arrow")}</span></article>`;

/* ===== CHROME: header, mobile menu, footer, dock ===== */
const LOGO=`<img src="images/logo/lockup.svg" alt="VisaRoute" width="160" height="34">`;
const VISA_DD=`<div class="dd mega"><div class="dd-list">${D.map((c,i)=>`<a href="/destination?c=${i}">${flag(c)}<span>${c.n.replace(" (Europe)","")}</span><small>$${price(c)}</small></a>`).join("")}</div>
<div class="dd-side"><h4>Visa desk</h4><a href="/destinations">All destinations</a><a href="/how-it-works">How it works</a><a href="/track">Track application</a><a href="/faq">Visa FAQ</a><a class="btn sm" href="/apply" style="margin-top:16px">Apply now</a></div></div>`;
const TRAVEL=[["/tours","Holiday tours","Dubai, Turkey, Europe, Asia"],["/tour?t=7","World tour","21 days · 5 countries"],["/umrah","Umrah packages","Economy to Premium"],["/umrah#tickets","Air tickets","Jeddah, Madinah & worldwide"],["/services","All services","Hotels, insurance & more"]];
const TRAVEL_DD=`<div class="dd dd-plain">${TRAVEL.map(t=>`<a href="${t[0]}"><span>${t[1]}<em>${t[2]}</em></span></a>`).join("")}</div>`;
const NAV=[["/","Home","home"],[0,"Visas","dests",VISA_DD],[0,"Travel","tours",TRAVEL_DD],["/blog","Guides","blog"],["/about","About","about"],["/contact","Contact","contact"]];
const act=ACT[pg]||pg;
$("#hdr").outerHTML=`<header id="siteHdr"><div class="nav"><a href="/" class="logo" aria-label="VisaRoute home">${LOGO}</a>
<nav aria-label="Main"><ul class="menu" id="menu">${NAV.map(n=>n[0]?`<li><a href="${n[0]}" class="${n[2]===act?"on":""}"${n[2]===act?' aria-current="page"':""}>${n[1]}</a></li>`
 :`<li class="has-dd"><button type="button" aria-expanded="false" class="${n[2]===act?"on":""}">${n[1]}<span class="chev">${ic("chev")}</span></button>${n[3]}</li>`).join("")}</ul></nav>
<div class="hdr-r"><a class="hdr-tel" href="tel:+923000000000">+92 300 0000000</a><button class="icon-btn" id="sfxBtn" type="button" aria-pressed="${SFX.on}" aria-label="Sound effects"><span class="bars"><i></i><i></i><i></i><i></i></span></button><a href="/apply" class="btn sm hdr-apply">Apply now</a><button class="icon-btn" id="mbtn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mnav">${ic("menu")}</button></div></div></header>
<div class="mnav" id="mnav" data-lenis-prevent><ol>
<li><a href="/">Home</a></li>
<li><button type="button">Visas</button><div class="sub-l"><div>${D.map((c,i)=>`<a href="/destination?c=${i}">${flag(c)}${c.n.replace(" (Europe)","")}</a>`).join("")}<a href="/destinations">All destinations →</a><a href="/track">Track application</a></div></div></li>
<li><button type="button">Travel</button><div class="sub-l"><div>${TRAVEL.map(t=>`<a href="${t[0]}">${t[1]}</a>`).join("")}</div></div></li>
<li><a href="/blog">Guides</a></li><li><a href="/about">About</a></li><li><a href="/faq">FAQ</a></li><li><a href="/contact">Contact</a></li></ol>
<div class="mnav-foot"><a class="btn" href="/apply">Apply for a visa ${ic("arrow")}</a><a class="mono" href="tel:+923000000000">+92 300 0000000</a><a class="mono" href="mailto:support@visaroute.com">support@visaroute.com</a></div></div>
<div class="scroll-meter" aria-hidden="true"><i></i></div>`;
$("#ftr").outerHTML=`<footer><div class="wrap">
<div class="f-main">
<div class="f-brand"><img src="images/logo/lockup.svg" alt="VisaRoute" width="150" height="32" loading="lazy"><p>Visas, tours and Umrah for travellers worldwide. Expert document checks and people who reply.</p>
<div class="socials"><a class="icon-btn" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic("chat")}</a><a class="icon-btn" href="mailto:support@visaroute.com" aria-label="Email">${ic("mail")}</a><a class="icon-btn" href="tel:+923000000000" aria-label="Call">${ic("phone")}</a></div></div>
<nav class="f-links" aria-label="Footer"><div><h4>Visas</h4><a href="/destinations">Destinations</a><a href="/apply">Apply now</a><a href="/track">Track</a><a href="/how-it-works">How it works</a></div><div><h4>Travel</h4><a href="/tours">Tours</a><a href="/umrah">Umrah</a><a href="/tour?t=7">World tour</a><a href="/blog">Guides</a></div><div><h4>Company</h4><a href="/about">About</a><a href="/services">Services</a><a href="/faq">FAQ</a><a href="/contact">Contact</a></div></nav>
<div class="f-news"><h4>Travel deals, monthly</h4><form id="nl"><input type="email" placeholder="Your email" aria-label="Email" required><button class="btn sm" type="submit">Subscribe</button></form><p class="mono">+92 300 0000000 · Mon–Sat 9–9</p></div>
</div>
<div class="nxb"> <a class="nxb__id" href="https://nexlyr.solutions/" target="_blank" rel="noopener" aria-label="Nexlyr Solutions — the studio that designed and built this site"> <span class="nxb__mk" aria-hidden="true"><svg viewBox="0 0 631 1011" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="Nexlyr Solutions logo"><defs><linearGradient id="nxbLogoG" gradientUnits="userSpaceOnUse" x1="277.4" y1="43.9" x2="724.3" y2="114.7"><stop offset="0" stop-color="#01C2F4"/><stop offset="1" stop-color="#0169B3"/></linearGradient></defs><g fill="url(#nxbLogoG)"><rect x="2.5" y="1" width="27.2" height="6.8"/><rect x="70.5" y="1" width="27.2" height="6.8"/><rect x="124.9" y="1" width="88.4" height="6.8"/><rect x="233.7" y="1" width="27.2" height="6.8"/><rect x="294.9" y="1" width="27.2" height="6.8"/><rect x="342.5" y="1" width="27.2" height="6.8"/><rect x="430.9" y="1" width="27.2" height="6.8"/><rect x="492.1" y="1" width="27.2" height="6.8"/><rect x="539.7" y="1" width="74.8" height="6.8"/><rect x="2.5" y="7.8" width="34" height="6.8"/><rect x="70.5" y="7.8" width="27.2" height="6.8"/><rect x="124.9" y="7.8" width="88.4" height="6.8"/><rect x="233.7" y="7.8" width="27.2" height="6.8"/><rect x="294.9" y="7.8" width="27.2" height="6.8"/><rect x="342.5" y="7.8" width="27.2" height="6.8"/><rect x="430.9" y="7.8" width="27.2" height="6.8"/><rect x="492.1" y="7.8" width="27.2" height="6.8"/><rect x="539.7" y="7.8" width="81.6" height="6.8"/><rect x="2.5" y="14.6" width="34" height="6.8"/><rect x="70.5" y="14.6" width="27.2" height="6.8"/><rect x="124.9" y="14.6" width="27.2" height="6.8"/><rect x="233.7" y="14.6" width="34" height="6.8"/><rect x="288.1" y="14.6" width="34" height="6.8"/><rect x="342.5" y="14.6" width="27.2" height="6.8"/><rect x="430.9" y="14.6" width="27.2" height="6.8"/><rect x="492.1" y="14.6" width="27.2" height="6.8"/><rect x="539.7" y="14.6" width="27.2" height="6.8"/><rect x="600.9" y="14.6" width="27.2" height="6.8"/><rect x="2.5" y="21.4" width="40.8" height="6.8"/><rect x="70.5" y="21.4" width="27.2" height="6.8"/><rect x="124.9" y="21.4" width="27.2" height="6.8"/><rect x="240.5" y="21.4" width="34" height="6.8"/><rect x="281.3" y="21.4" width="34" height="6.8"/><rect x="342.5" y="21.4" width="27.2" height="6.8"/><rect x="430.9" y="21.4" width="27.2" height="6.8"/><rect x="492.1" y="21.4" width="27.2" height="6.8"/><rect x="539.7" y="21.4" width="27.2" height="6.8"/><rect x="600.9" y="21.4" width="27.2" height="6.8"/><rect x="2.5" y="28.2" width="47.6" height="6.8"/><rect x="70.5" y="28.2" width="27.2" height="6.8"/><rect x="124.9" y="28.2" width="27.2" height="6.8"/><rect x="247.3" y="28.2" width="61.2" height="6.8"/><rect x="342.5" y="28.2" width="27.2" height="6.8"/><rect x="437.7" y="28.2" width="27.2" height="6.8"/><rect x="485.3" y="28.2" width="27.2" height="6.8"/><rect x="539.7" y="28.2" width="27.2" height="6.8"/><rect x="600.9" y="28.2" width="27.2" height="6.8"/><rect x="2.5" y="35" width="54.4" height="6.8"/><rect x="70.5" y="35" width="27.2" height="6.8"/><rect x="124.9" y="35" width="27.2" height="6.8"/><rect x="254.1" y="35" width="47.6" height="6.8"/><rect x="342.5" y="35" width="27.2" height="6.8"/><rect x="444.5" y="35" width="27.2" height="6.8"/><rect x="478.5" y="35" width="27.2" height="6.8"/><rect x="539.7" y="35" width="27.2" height="6.8"/><rect x="600.9" y="35" width="27.2" height="6.8"/><rect x="2.5" y="41.8" width="27.2" height="6.8"/><rect x="36.5" y="41.8" width="27.2" height="6.8"/><rect x="70.5" y="41.8" width="27.2" height="6.8"/><rect x="124.9" y="41.8" width="81.6" height="6.8"/><rect x="260.9" y="41.8" width="34" height="6.8"/><rect x="342.5" y="41.8" width="27.2" height="6.8"/><rect x="451.3" y="41.8" width="47.6" height="6.8"/><rect x="539.7" y="41.8" width="27.2" height="6.8"/><rect x="600.9" y="41.8" width="27.2" height="6.8"/><rect x="2.5" y="48.6" width="27.2" height="6.8"/><rect x="36.5" y="48.6" width="27.2" height="6.8"/><rect x="70.5" y="48.6" width="27.2" height="6.8"/><rect x="124.9" y="48.6" width="81.6" height="6.8"/><rect x="260.9" y="48.6" width="34" height="6.8"/><rect x="342.5" y="48.6" width="27.2" height="6.8"/><rect x="458.1" y="48.6" width="34" height="6.8"/><rect x="539.7" y="48.6" width="27.2" height="6.8"/><rect x="600.9" y="48.6" width="27.2" height="6.8"/><rect x="2.5" y="55.4" width="27.2" height="6.8"/><rect x="43.3" y="55.4" width="54.4" height="6.8"/><rect x="124.9" y="55.4" width="27.2" height="6.8"/><rect x="254.1" y="55.4" width="47.6" height="6.8"/><rect x="342.5" y="55.4" width="27.2" height="6.8"/><rect x="464.9" y="55.4" width="27.2" height="6.8"/><rect x="539.7" y="55.4" width="81.6" height="6.8"/><rect x="2.5" y="62.2" width="27.2" height="6.8"/><rect x="43.3" y="62.2" width="54.4" height="6.8"/><rect x="124.9" y="62.2" width="27.2" height="6.8"/><rect x="247.3" y="62.2" width="61.2" height="6.8"/><rect x="342.5" y="62.2" width="27.2" height="6.8"/><rect x="464.9" y="62.2" width="27.2" height="6.8"/><rect x="539.7" y="62.2" width="74.8" height="6.8"/><rect x="2.5" y="69" width="27.2" height="6.8"/><rect x="50.1" y="69" width="47.6" height="6.8"/><rect x="124.9" y="69" width="27.2" height="6.8"/><rect x="240.5" y="69" width="34" height="6.8"/><rect x="281.3" y="69" width="34" height="6.8"/><rect x="342.5" y="69" width="27.2" height="6.8"/><rect x="464.9" y="69" width="27.2" height="6.8"/><rect x="539.7" y="69" width="27.2" height="6.8"/><rect x="580.5" y="69" width="34" height="6.8"/><rect x="2.5" y="75.8" width="27.2" height="6.8"/><rect x="56.9" y="75.8" width="40.8" height="6.8"/><rect x="124.9" y="75.8" width="27.2" height="6.8"/><rect x="233.7" y="75.8" width="34" height="6.8"/><rect x="288.1" y="75.8" width="34" height="6.8"/><rect x="342.5" y="75.8" width="27.2" height="6.8"/><rect x="464.9" y="75.8" width="27.2" height="6.8"/><rect x="539.7" y="75.8" width="27.2" height="6.8"/><rect x="587.3" y="75.8" width="34" height="6.8"/><rect x="2.5" y="82.6" width="27.2" height="6.8"/><rect x="63.7" y="82.6" width="34" height="6.8"/><rect x="124.9" y="82.6" width="88.4" height="6.8"/><rect x="233.7" y="82.6" width="27.2" height="6.8"/><rect x="294.9" y="82.6" width="27.2" height="6.8"/><rect x="342.5" y="82.6" width="88.4" height="6.8"/><rect x="464.9" y="82.6" width="27.2" height="6.8"/><rect x="539.7" y="82.6" width="27.2" height="6.8"/><rect x="594.1" y="82.6" width="34" height="6.8"/><rect x="2.5" y="89.4" width="27.2" height="6.8"/><rect x="70.5" y="89.4" width="27.2" height="6.8"/><rect x="124.9" y="89.4" width="88.4" height="6.8"/><rect x="233.7" y="89.4" width="27.2" height="6.8"/><rect x="294.9" y="89.4" width="27.2" height="6.8"/><rect x="342.5" y="89.4" width="88.4" height="6.8"/><rect x="464.9" y="89.4" width="27.2" height="6.8"/><rect x="539.7" y="89.4" width="27.2" height="6.8"/><rect x="600.9" y="89.4" width="27.2" height="6.8"/><rect x="0" y="128" width="98.5" height="883"/><rect x="133.25" y="128" width="98.5" height="883"/><rect x="266.5" y="128" width="98.5" height="883"/><rect x="399.75" y="128" width="98.5" height="630"/><rect x="533" y="128" width="98.5" height="630"/></g></svg></span> <span class="nxb__tx"><span class="nxb__kk">Designed &amp; built by</span><span class="nxb__nm">Nexlyr Solutions</span></span> </a> <a class="nxb__go" target="_blank" rel="noopener" href="https://wa.me/923053687680?text=Hi%20Nexlyr%21%20I%20saw%20VisaRoute%27s%20website%20and%20I%27d%20like%20a%20site%20like%20it." aria-label="Connect with Nexlyr Solutions on WhatsApp"> <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.75.46 3.45 1.32 4.95L2.05 22l5.28-1.38a9.86 9.86 0 0 0 4.71 1.2c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.95-4.37-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.58-.36.77-.36l.55.01c.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.09.2-.14.32-.28.49l-.42.49c-.14.14-.28.29-.12.57.16.29.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.15.44.12.6-.07.17-.2.7-.81.88-1.09.19-.29.37-.24.63-.14.25.09 1.62.76 1.9.9.28.15.46.22.53.34.07.12.07.68-.17 1.34z"/></svg> Connect </a> </div>
<div class="copy"><span>© 2026 VisaRoute</span><span>Privacy · Terms · Refund policy</span></div></div></footer>
<div class="dock"><a class="wa" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp us">${ic("chat")}</a></div><div id="toast" role="status"></div>`;
const PHI={dests:"singapore",tours:"maldives-honeymoon",umrah:"umrah-premium",services:"world-tour",blog:"best-time-turkey",about:"about",contact:"contact",faq:"first-trip-dubai",how:"schengen-mistakes",track:"uk",apply:"uae"};
{const ph=$(".ph");if(ph&&PHI[pg])ph.dataset.src=IMG(PHI[pg])}

/* dropdowns: hover on desktop, click anywhere, Esc closes */
{const items=$$(".has-dd");let ht;
 const set=(li,o)=>{items.forEach(x=>{const on=x===li&&o;x.classList.toggle("open",on);$("button",x).setAttribute("aria-expanded",on)});if(o)SFX.swap()};
 items.forEach(li=>{const b=$("button",li);
  b.onclick=e=>{e.stopPropagation();set(li,!li.classList.contains("open"))};
  if(FINE){li.onmouseenter=()=>{clearTimeout(ht);if(!li.classList.contains("open"))set(li,true)};li.onmouseleave=()=>{ht=setTimeout(()=>set(li,false),180)}}});
 document.addEventListener("click",e=>{if(!e.target.closest(".has-dd"))items.forEach(x=>x.classList.contains("open")&&set(x,false))});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")items.forEach(x=>{if(x.classList.contains("open")){set(x,false);$("button",x).focus()}})})}
/* mobile menu */
const mnav=$("#mnav"),mbtn=$("#mbtn");
const menuSet=o=>{mnav.classList.toggle("open",o);mbtn.setAttribute("aria-expanded",o);mbtn.innerHTML=ic(o?"x":"menu");document.documentElement.style.overflow=o?"hidden":"";window.lenis&&(o?lenis.stop():lenis.start());o?SFX.open():SFX.close()};
mbtn.onclick=()=>menuSet(!mnav.classList.contains("open"));
$$("li>button",mnav).forEach(b=>b.onclick=()=>{b.parentElement.classList.toggle("open");SFX.swap()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&mnav.classList.contains("open")){menuSet(false);mbtn.focus()}});
$("#sfxBtn").onclick=()=>{SFX.set(!SFX.on);$("#sfxBtn").setAttribute("aria-pressed",SFX.on);SFX.arm();SFX.click()};
$("#nl").onsubmit=e=>{e.preventDefault();e.target.reset();SFX.success();toast("Subscribed. (Demo: connect your email service.)")};

/* ===== SMOOTH SCROLL (Lenis) ===== */
if(window.Lenis&&!RM){window.lenis=new Lenis({lerp:.075,wheelMultiplier:.9,smoothWheel:true,syncTouch:false});const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf)}
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"],a[href^="/#"]');if(!a)return;const id=a.getAttribute("href").split("#")[1];const t=id&&document.getElementById(id);
 if(t&&(pg==="home"||a.getAttribute("href").startsWith("#"))){e.preventDefault();window.lenis?lenis.scrollTo(t,{offset:-60,duration:1.4}):t.scrollIntoView({behavior:"smooth"})}});

/* ===== RAILS: drag, arrows, progress ===== */
function rail(wrap){
 const r=$(".rail",wrap)||$(".hs-track",wrap),[pv,nx]=$$(".rail-nav button",wrap),bar=$(".rail-bar i",wrap);if(!r)return;
 const step=()=>{const c=r.children[0];return c?c.getBoundingClientRect().width+parseFloat(getComputedStyle(r).columnGap||18):300};
 const upd=()=>{const max=r.scrollWidth-r.clientWidth;if(pv){pv.disabled=r.scrollLeft<4;nx.disabled=r.scrollLeft>max-4}
  if(bar){const w=r.clientWidth/r.scrollWidth;bar.style.setProperty("--w",w*100+"%");bar.style.setProperty("--x",(max?r.scrollLeft/max:0)*(1-w)/w*100+"%")}};
 pv&&(pv.onclick=()=>{r.scrollBy({left:-step(),behavior:"smooth"});SFX.swap()});nx&&(nx.onclick=()=>{r.scrollBy({left:step(),behavior:"smooth"});SFX.swap()});
 r.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();setTimeout(upd,400);
 /* mouse drag (touch scrolls natively) */
 let x0=0,s0=0,down=false,moved=false;
 r.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse"||e.button)return;down=true;moved=false;x0=e.clientX;s0=r.scrollLeft});
 addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-x0;if(Math.abs(dx)>5&&!moved){moved=true;r.classList.add("drag")}if(moved)r.scrollLeft=s0-dx});
 addEventListener("pointerup",()=>{if(!down)return;down=false;if(moved){const st=step(),i=Math.round(r.scrollLeft/st);r.classList.remove("drag");r.scrollTo({left:i*st,behavior:"smooth"});SFX.tick()}});
 r.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
 return upd;
}


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
 $("#d-go").onclick=()=>location.href=`/apply?c=${i}&t=${$("#d-type").value}`;
 $("#d-more").innerHTML=D.map((x,j)=>[x,j]).filter(([,j])=>j!==i).slice(0,4).map(([x,j])=>card(x,j)).join("");
},
apply(){
 $("#a-dest").innerHTML=opts(D);$("#a-type").innerHTML=Object.keys(M).map(t=>`<option>${t}</option>`).join("");
 $("#a-dest").value=+Q.get("c")||0;if(M[Q.get("t")])$("#a-type").value=Q.get("t");
 const sum=()=>{const c=D[$("#a-dest").value],t=$("#a-type").value,n=+$("#a-trav").value,g=Math.round(c.gov*M[t]);
  $("#sumFlag").innerHTML=flag(c).replace('width="22" height="16"','width="44" height="32"');$("#s-dest").textContent=c.n;$("#s-type").textContent=t;$("#s-time").textContent=c.t;
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
  $("#appForm").innerHTML=`<div class="done-card"><div class="tick">${ic("check")}</div><h2>Application received</h2><p>Your reference number is</p><div class="ref">${ref}</div><p>We emailed the details to ${order.email.replace(/[<>&"]/g,"")}. Keep this number to track your visa.</p><p style="margin-top:18px"><a class="btn" href="/track?ref=${ref}">Track application</a></p><p class="note">Demo mode: payment gateway is not connected yet.</p></div>`;
  SFX.success();window.lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:"smooth"})};
},
track(){
 const S=["Application received","Documents under review","Submitted to embassy","Visa issued"];
 const go=ref=>{const n=[...ref].reduce((a,c)=>a+c.charCodeAt(0),0)%4;
  $("#t-out").innerHTML=`<h3>Reference ${ref.replace(/[<>&"]/g,"")}</h3><ul class="tl" style="margin-top:18px">${S.map((s,i)=>`<li class="${i<=n?"done":""}">${s}</li>`).join("")}</ul><p class="note">Demo status. Connect your backend to show real progress.</p>`;SFX.msg()};
 $("#t-form").onsubmit=e=>{e.preventDefault();go($("#t-ref").value.trim().toUpperCase())};
 if(Q.get("ref")){$("#t-ref").value=Q.get("ref");go(Q.get("ref"))}
},
contact(){$("#c-form").onsubmit=e=>{e.preventDefault();e.target.reset();SFX.success();toast("Message sent. We will reply within the hour. (Demo: connect your backend.)")}}
};

const chipsFor=(list,key,get)=>{let r="All",q="";const rs=["All",...new Set(list.map(x=>x[key]))];
 const draw=()=>{$("#chips").innerHTML=rs.map(x=>`<button class="chip" aria-pressed="${x===r}" data-r="${x}">${x}</button>`).join("");
  const l=list.map((x,i)=>[x,i]).filter(([x])=>(r==="All"||x[key]===r)&&x.n.toLowerCase().includes(q));
  $("#grid").innerHTML=l.length?l.map(([x,i])=>get(x,i)).join(""):"<p>Nothing found. Message us and we will arrange a custom plan — we cover 100+ countries.</p>";
  $$("#grid>*").forEach((el,k)=>el.animate([{opacity:0,transform:"translateY(18px)"},{opacity:1,transform:"none"}],{duration:700,delay:k*45,easing:"cubic-bezier(.19,1,.22,1)",fill:"backwards"}))};
 $("#chips").onclick=e=>{if(e.target.dataset.r){r=e.target.dataset.r;draw();SFX.swap()}};$("#srch").oninput=e=>{q=e.target.value.toLowerCase();draw()};draw()};

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

const ucard=(u,i)=>`<article class="vcard"><div class="ph-img" data-src="${SM(u.s)}"><div></div><span class="code">${u.d} days${u.tag?" · "+u.tag:""}</span></div><div class="body"><h3>${u.n}</h3><div class="meta">${u.hot}</div><ul class="list" style="margin:12px 0">${u.inc.map(x=>`<li>${x}</li>`).join("")}</ul><div class="foot"><div class="pr"><small>Package</small><b>${u.price?"$"+u.price:"Quote"}</b></div><a class="btn sm" href="#u-form" data-pk="${i}">Enquire</a></div></div></article>`;
Object.assign(P,{umrah(){
 $("#um-pk").innerHTML=UM.map(ucard).join("");
 $("#u-pk").innerHTML=UM.map(u=>`<option>${u.n}</option>`).join("");
 const tl=$(".ftabs"),tb=$$("button[role=tab]",tl),ind=$(".ind",tl),pn=[$("#u-form"),$("#t-form")];
 const mv=b=>{ind.style.width=b.offsetWidth+"px";ind.style.transform=`translateX(${b.offsetLeft}px)`};
 const sel=(k,snd)=>{tb.forEach((b,j)=>{b.setAttribute("aria-selected",j===k);b.tabIndex=j===k?0:-1});pn.forEach((f,j)=>{f.hidden=j!==k;if(j===k)f.animate([{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"none"}],{duration:600,easing:"cubic-bezier(.19,1,.22,1)"})});mv(tb[k]);if(snd)SFX.swap()};
 tl.onclick=e=>{const b=e.target.closest("button[role=tab]");if(b)sel(tb.indexOf(b),1)};
 tl.onkeydown=e=>{if(/Arrow(Left|Right)/.test(e.key)){e.preventDefault();const k=tb.indexOf(document.activeElement)===0?1:0;sel(k,1);tb[k].focus()}};
 sel(location.hash==="#tickets"?1:0);addEventListener("resize",()=>mv(tb.find(b=>b.getAttribute("aria-selected")==="true")));document.fonts&&document.fonts.ready.then(()=>mv(tb.find(b=>b.getAttribute("aria-selected")==="true")));
 $("#um-pk").onclick=e=>{const a=e.target.closest("[data-pk]");if(a){sel(0);$("#u-pk").selectedIndex=+a.dataset.pk}};
 $("#t-form").onsubmit=e=>{e.preventDefault();
  /* ===== UMRAH TICKET INTEGRATION POINT: yahan flight enquiry apne backend/email par bhejein ===== */
  e.target.reset();SFX.success();toast("Ticket enquiry sent. We will send fares within the hour. (Demo mode)")};
 $("#u-form").onsubmit=e=>{e.preventDefault();
  /* ===== UMRAH PACKAGE INTEGRATION POINT ===== */
  e.target.reset();SFX.success();toast("Package enquiry sent. Our Umrah team will call you. (Demo mode)")};
}});

/* ===== HOME ===== */
const VT=[
 {t:"Tourist",s:"Holidays & family visits",d:"For sightseeing, holidays and short visits. Most e-visas are ready in a few days; embassy visas need an appointment we book for you.",f:[["Typical processing","1–30 days"],["Starts from","$"+Math.min(...D.map(c=>price(c)))]],l:["Passport valid 6+ months","Bank statement, 3–6 months","Hotel and return flight booking","Photo on white background"]},
 {t:"Business",s:"Meetings & trade fairs",d:"For meetings, conferences and trade visits. We prepare the cover letter and check the invitation from your host company.",f:[["Typical processing","3–30 days"],["Extra needed","Invitation letter"]],l:["Invitation from the host company","Company cover letter and NTN","Bank statement, 6 months","Previous travel history"]},
 {t:"Transit",s:"Stopovers & connections",d:"For layovers through airports that need a visa to change terminals or leave the airport. Often the fastest and cheapest option.",f:[["Typical processing","1–7 days"],["Max stay","24–96 hours"]],l:["Confirmed onward ticket","Visa for final destination","Passport valid 6+ months","Photo on white background"]},
 {t:"Family visit",s:"Sponsor invitations",d:"For visiting relatives abroad. We review sponsor documents carefully, as these files are checked closely by embassies.",f:[["Typical processing","5–40 days"],["Extra needed","Sponsor papers"]],l:["Sponsor invitation and ID or residence","Proof of relationship","Sponsor income or tenancy proof","Your bank statement"]}];
function visaTabs(){
 const tl=$("#vtabs"),pw=$("#vpanels");if(!tl)return;
 tl.innerHTML=VT.map((v,i)=>`<button type="button" role="tab" id="vt${i}" aria-controls="vp${i}" aria-selected="${!i}" tabindex="${i?-1:0}"><small>${pad(i+1)} · ${v.s}</small><b>${v.t}</b></button>`).join("")+'<span class="ind"></span>';
 pw.innerHTML=VT.map((v,i)=>`<div class="panel" role="tabpanel" id="vp${i}" aria-labelledby="vt${i}" ${i?"hidden":""}>
  <div class="panel-info"><h3>${v.t} visa</h3><p>${v.d}</p><div class="facts-row">${v.f.map(f=>`<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join("")}</div><ul>${v.l.map(x=>`<li>${x}</li>`).join("")}</ul><a class="btn" href="/apply?t=${encodeURIComponent(v.t)}">Apply · ${v.t} ${ic("arrow")}</a></div>
  <div class="rail-wrap" data-rail><div class="rail-top"><span class="count"><b>${D.length}</b> countries · prices for ${v.t.toLowerCase()} visas</span><div class="rail-nav"><button type="button" aria-label="Previous">${ic("arrow")}</button><button type="button" aria-label="Next">${ic("arrow")}</button></div></div>
  <div class="rail">${D.map((c,j)=>card(c,j,v.t)).join("")}</div><div class="rail-bar"><i></i></div></div></div>`).join("");
 const ups=$$(".rail-wrap",pw).map(rail),btns=$$("button[role=tab]",tl),ind=$(".ind",tl);
 const mv=b=>{ind.style.width=b.offsetWidth+"px";ind.style.transform=`translateX(${b.offsetLeft}px)`};
 const sel=(i,f)=>{btns.forEach((b,k)=>{b.setAttribute("aria-selected",k===i);b.tabIndex=k===i?0:-1});$$(".panel",pw).forEach((p,k)=>{p.hidden=k!==i;p.classList.toggle("panel-enter",k===i)});mv(btns[i]);ups[i]&&ups[i]();hyd();if(f)btns[i].focus();SFX.swap()};
 tl.onclick=e=>{const b=e.target.closest("button[role=tab]");if(b)sel(btns.indexOf(b))};
 tl.onkeydown=e=>{const k=btns.indexOf(document.activeElement);if(k<0)return;if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();sel((k+(e.key==="ArrowRight"?1:-1)+btns.length)%btns.length,1)}};
 mv(btns[0]);addEventListener("resize",()=>mv(btns.find(b=>b.getAttribute("aria-selected")==="true")));document.fonts&&document.fonts.ready.then(()=>mv(btns.find(b=>b.getAttribute("aria-selected")==="true")));
}
Object.assign(P,{
home(){
 $("#f-dest").innerHTML=opts(D);
 $("#finder").onsubmit=e=>{e.preventDefault();location.href=`/apply?c=${$("#f-dest").value}&t=${$("#f-type").value}`};
 $("#hsTrack").innerHTML=TOURS.map(tcard).join("")+`<div class="tcard end"><div><span class="kicker" style="color:var(--gold-ink)">Custom trip</span><h3>Don’t see your trip?</h3></div><div><p style="margin-bottom:20px">Tell us the cities, dates and budget. We will build it from scratch.</p><a class="btn" href="#plan">Plan my trip ${ic("arrow")}</a></div></div>`;
 $("#hsAll").textContent=pad(TOURS.length);
 $("#blogp").innerHTML=ARTS.map(bcard).join("");
 $("#pkgList").innerHTML=UM.map(u=>`<li><a href="/umrah#u-form"><div><b>${u.n}</b><br><span>${u.d} days · ${u.hot.split("·")[0].trim()}</span></div><span>${u.tag||"Flexible"}</span>${ic("arrow")}</a></li>`).join("");
 visaTabs();rail($("#guides [data-rail]"));toursRail();quotes();planForm();
}});

function toursRail(){const w=$("#tours [data-rail]");if(!w)return;rail(w);const r=$(".rail",w),now=$("#hsNow");
 r.addEventListener("scroll",()=>{const c=r.children[0];if(!c)return;const k=Math.min(TOURS.length,Math.round(r.scrollLeft/(c.offsetWidth+16))+1);if(now.textContent!==pad(k))now.textContent=pad(k)},{passive:true})}
/* reviews carousel (glass card) */
function quotes(){const b=$("#qbox");if(!b)return;const qs=$$(".q",b),ds=$$(".q-dots button",b);let i=0,t;
 const go=(n,snd)=>{const o=i;i=(n+qs.length)%qs.length;if(o===i)return;qs[o].classList.remove("on");qs[o].classList.add("out");setTimeout(()=>qs[o].classList.remove("out"),900);qs[i].classList.add("on");
  ds.forEach((d,k)=>{d.classList.remove("on");if(k===i){void d.offsetWidth;d.classList.add("on")}});if(snd)SFX.swap();arm()};
 const arm=()=>{clearTimeout(t);if(!RM)t=setTimeout(()=>{if(!b.matches(":hover")&&!document.hidden)go(i+1);else arm()},6000)};
 $$("[data-q]",b).forEach(x=>x.onclick=()=>go(i+ +x.dataset.q,1));ds.forEach((d,k)=>d.onclick=()=>go(k,1));
 b.onmouseenter=()=>b.classList.add("paused");b.onmouseleave=()=>b.classList.remove("paused");
 let x0=null;b.addEventListener("touchstart",e=>x0=e.touches[0].clientX,{passive:true});b.addEventListener("touchend",e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1),1);x0=null});arm()}
/* plan-my-trip form */
function planForm(){
 const f=$("#planForm"),html=f.innerHTML;
 const bind=()=>{
  $("#p-d").innerHTML=`<optgroup label="Visas">${D.map(c=>`<option>${c.n}</option>`).join("")}</optgroup><optgroup label="Tours">${TOURS.map(t=>`<option>${t.n}</option>`).join("")}</optgroup><option>Not sure yet</option>`;
  const b=$("#p-b"),bo=$("#p-bo"),upd=()=>{bo.textContent="$"+(+b.value).toLocaleString("en-US")+(+b.value>=6000?"+":"");b.style.setProperty("--p",((b.value-b.min)/(b.max-b.min)*100)+"%")};b.oninput=()=>{upd();SFX.tick()};upd();
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
    f.innerHTML=`<div class="done-card"><div class="tick">${ic("check")}</div><h3 style="font-size:1.9rem">Trip plan received</h3><p style="margin:10px auto 6px;max-width:42ch">Thanks ${esc(plan.name.split(" ")[0])}. A travel expert will message you on WhatsApp within the hour with options for <b>${esc(plan.destination)}</b>.</p><div class="ref">${ref}</div>
     <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px"><a class="btn wa-btn" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Continue on WhatsApp</a><button class="btn ghost" type="button" id="p-again">Plan another trip</button></div></div>`;
    SFX.success();$("#p-again").onclick=()=>{f.innerHTML=html;$$(".btn",f).forEach(b=>delete b.dataset.w);fillIcons(f);wrapBtns(f);bind()}},750)};
 };bind();
}

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
[/^(hi|hello|hey|salam|assalam|aoa|slam)|assalam/,u=>L("Hello! I’m Safar, the VisaRoute concierge. I can help with visas, tours, Umrah and tickets. What do you need?","Assalam o alaikum! Main Safar hoon, VisaRoute ka concierge. Visa, tours, Umrah aur tickets mein madad kar sakta hoon. Aap ko kya chahiye?",u)],
[/ticket|flight|fare|airline|jahaz|jahaz/,u=>L("We book flights worldwide, including Jeddah and Madinah for Umrah. Send your route and dates through the <a href='/umrah#t-form'>ticket form</a> or <a href='/contact'>contact us</a>.","Hum duniya bhar ki flights book karte hain, Umrah ke liye Jeddah aur Madinah bhi. <a href='/umrah#t-form'>Ticket form</a> bhar dein ya <a href='/contact'>rabta karein</a>.",u)],
[/umrah|umra|makkah|mecca|madinah|medina|hajj|haram/,u=>L("We offer Economy, Standard and Premium Umrah packages with visa, hotels, transport and guided ziyarat, plus Umrah flight tickets. <a href='/umrah'>See Umrah packages and tickets</a>.","Hamare paas Economy, Standard aur Premium Umrah packages hain (visa, hotel, transport, ziyarat) aur Umrah ki flight tickets bhi. <a href='/umrah'>Umrah page dekhein</a>.",u)],
[/world tour|around the world/,u=>L("Our 21-day world tour covers Dubai, Istanbul, Paris, London and New York. <a href='/tour?t=7'>View itinerary</a>.","21 din ka world tour: Dubai, Istanbul, Paris, London aur New York. <a href='/tour?t=7'>Itinerary dekhein</a>.",u)],
[/tour|package|holiday|honeymoon|maldives|trip|vacation/,u=>L("We have tours for Dubai, Turkey, Europe, Maldives, Malaysia, Thailand and more. <a href='/tours'>Browse all tours</a>, or tell me your budget and dates.","Dubai, Turkey, Europe, Maldives, Malaysia, Thailand aur mazeed tours hain. <a href='/tours'>Saare tours dekhein</a>.",u)],
[/track|status|reference/,u=>L("You can check progress on the <a href='/track'>tracking page</a> with your reference number.","<a href='/track'>Track page</a> par apna reference number daal kar status dekhein.",u)],
[/pay|paypal|card|bank|jazz|easypaisa|visa card|payment/,u=>L("We accept PayPal, credit/debit cards, bank transfer and JazzCash/Easypaisa. You choose at checkout.","PayPal, card, bank transfer aur JazzCash/Easypaisa qabil-e-qabool hain. Checkout par chun lein.",u)],
[/document|paper|requirement|need to apply|kagaz|passport/,u=>L("Usually: passport valid 6+ months, photo, bank statement, bookings and ID copy. Exact needs depend on the country. <a href='/destinations'>Pick a country</a> to see more.","Aam tor par: 6 mahine se zyada valid passport, photo, bank statement, bookings aur CNIC copy. Mukammal list ke liye <a href='/destinations'>mulk chunein</a>.",u)],
[/how long|processing|time|days|kitne din|kab tak/,u=>L("Processing ranges from 1–2 days for some e-visas to several weeks for embassy visas. Each <a href='/destinations'>country page</a> shows the time.","E-visa 1–2 din mein, embassy visa kai hafton mein. Har <a href='/destinations'>country page</a> par time likha hai.",u)],
[/refund|cancel|reject|refus/,u=>L("Government fees are not refundable once submitted. Our service fee is partly refundable as per the refund policy. Our document review lowers refusal risk.","Government fee submit hone ke baad wapas nahi hoti. Service fee refund policy ke mutabiq. Document review se refusal ka risk kam hota hai.",u)],
[/contact|whatsapp|phone|call|number|human|agent|office|address/,u=>L("Talk to a person on <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a> or visit the <a href='/contact'>contact page</a>. We reply within the hour (Mon–Sat, 9am–9pm).","<a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a> par baat karein ya <a href='/contact'>contact page</a> dekhein. Hum ghante ke andar jawab dete hain.",u)],
[/price|fee|cost|rate|charges|kitna|kitne|qeemat/,u=>L("Visa prices depend on the country and visa type. Tell me the country, or open <a href='/destinations'>destinations</a>. Tour and Umrah prices are quoted per your dates and group.","Visa ki qeemat mulk aur visa type par hai. Mulk ka naam bata dein ya <a href='/destinations'>destinations</a> dekhein. Tours aur Umrah ki quote dates ke hisaab se milti hai.",u)],
[/thank|shukriya|thanks|jazak/,u=>L("You’re welcome! Anything else I can help with?","Khushi hui! Kuch aur madad chahiye?",u)],
[/visa|apply/,u=>L("I can help you apply. Tell me the country, or <a href='/apply'>start your application</a>.","Main apply karne mein madad karunga. Mulk ka naam bata dein ya <a href='/apply'>application shuru karein</a>.",u)]];
function botReply(t){
 const m=t.toLowerCase(),u=UR.test(m);
 if(!/umrah|umra|ticket|flight|tour/.test(m)){for(const[r,i]of ALI)if(r.test(m)){const c=D[i];
  return L(`${flag(c)} <b>${c.n}</b>: ${c.k}, processing ${c.t}, from <b>$${price(c)}</b> (tourist). <a href='/destination?c=${i}'>See requirements</a> or <a href='/apply?c=${i}'>apply now</a>.`,`${flag(c)} <b>${c.n}</b>: ${c.k}, processing ${c.t}, tourist visa <b>$${price(c)}</b> se shuru. <a href='/destination?c=${i}'>Requirements</a> ya <a href='/apply?c=${i}'>abhi apply karein</a>.`,u)}}
 for(const[r,f]of KB)if(r.test(m))return f(u);
 return L("I’m not sure about that one. You can ask about visas, tours, Umrah, tickets or payments, or chat with our team on <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a>.","Is baare mein mujhe pakka nahi pata. Visa, tours, Umrah, tickets ya payment ke baare mein puchein, ya <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a> par team se baat karein.",u)}

/* ===== SAFAR — VisaRoute concierge chat ===== */
const AV=`<span class="av"><svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="#0A1015"/>
<circle cx="32" cy="32" r="17" fill="none" stroke="#F2C158" stroke-width="1.4"/><ellipse cx="32" cy="32" rx="7.5" ry="17" fill="none" stroke="#F2C158" stroke-width=".9" opacity=".7"/>
<path d="M15 32h34M17.5 23h29M17.5 41h29" stroke="#F2C158" stroke-width=".8" opacity=".55"/>
<g class="spin"><ellipse cx="32" cy="32" rx="26" ry="9" fill="none" stroke="#F1ECE2" stroke-width=".8" stroke-dasharray="2 3" transform="rotate(-24 32 32)"/>
<path d="M54.6 20.6l2.6 1.1-1.1 2.6-.9-.9-2.3 1 .6-2.4-1-.9z" fill="#F1ECE2"/></g></svg><i class="online"></i></span>`;
(function(){
 const now=()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
 const w=document.createElement("div");
 w.innerHTML=`<section id="cb" aria-label="Safar, VisaRoute concierge" aria-hidden="true"><div class="cb-h">${AV}<div><b>Safar</b><small><i></i>VisaRoute concierge · online</small></div><button id="cb-x" type="button" aria-label="Close chat">${ic("x")}</button></div>
 <div class="cb-m" id="cb-m" aria-live="polite" data-lenis-prevent></div>
 <div class="cb-q" id="cb-q"><button type="button">Visa price</button><button type="button">Umrah packages</button><button type="button">Flight tickets</button><button type="button">Tours</button><button type="button">Talk to a person</button></div>
 <form class="cb-f" id="cb-f"><input id="cb-i" placeholder="Ask Safar anything…" aria-label="Message" autocomplete="off"><button type="submit" aria-label="Send">${ic("send")}</button></form></section>`;
 document.body.appendChild(w);
 $(".dock").insertAdjacentHTML("beforeend",`<button class="cb-btn" id="cb-btn" type="button" aria-expanded="false" aria-controls="cb">${AV}<span><b>Ask Safar</b><small>Replies instantly</small></span></button>`);
 const box=$("#cb"),msgs=$("#cb-m"),hist=[];
 const add=(h,who,raw)=>{const d=document.createElement("div");d.className="m "+who;raw?d.textContent=h:d.innerHTML=h;d.insertAdjacentHTML("beforeend",`<time>${who==="u"?"You":"Safar"} · ${now()}</time>`);msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d};
 const open=o=>{if(o===box.classList.contains("open"))return;box.classList.toggle("open",o);box.setAttribute("aria-hidden",!o);$("#cb-btn").setAttribute("aria-expanded",o);
  if(o){SFX.open();if(!msgs.children.length)add("Assalamu alaikum, I’m <b>Safar</b>, VisaRoute’s concierge. Ask me about visas, tours, Umrah or tickets. Aap Roman Urdu mein bhi likh sakte hain.","b");setTimeout(()=>$("#cb-i").focus({preventScroll:true}),150)}else SFX.close()};
 $("#cb-btn").onclick=()=>open(!box.classList.contains("open"));$("#cb-x").onclick=()=>{open(false);$("#cb-btn").focus()};
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&box.classList.contains("open")){open(false);$("#cb-btn").focus()}});
 async function ask(t){add(t,"u",1);hist.push({role:"user",content:t});const d=document.createElement("div");d.className="m b";d.innerHTML='<span class="typing"><i></i><i></i><i></i></span>';msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;let r;
  if(AI_ENDPOINT){try{const x=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,history:hist})});r=(await x.json()).reply}catch(e){r=null}}
  if(!r){await new Promise(z=>setTimeout(z,700));r=botReply(t)}
  d.innerHTML=r+`<time>Safar · ${now()}</time>`;hist.push({role:"assistant",content:r});msgs.scrollTop=msgs.scrollHeight;SFX.msg()}
 $("#cb-f").onsubmit=e=>{e.preventDefault();const i=$("#cb-i"),t=i.value.trim();if(t){i.value="";ask(t)}};
 $("#cb-q").onclick=e=>{if(e.target.tagName==="BUTTON"){SFX.click();ask(e.target.textContent)}};
})();

/* ===== MOTION ===== */
/* split headings into words */
function split(el){const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.append(" ");return}const w=document.createElement("span");w.className="w";w.innerHTML=`<span>${p}</span>`;f.append(w)});n.replaceChild(f,c)}else if(c.nodeType===1&&c.tagName!=="BR")walk(c)})};walk(el);$$(".w>span",el).forEach((s,i)=>s.style.setProperty("--i",i))}
function reveal(){
 if(RM||!("IntersectionObserver"in window)){$$(".split").forEach(e=>e.classList.add("in"));return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);if(e.target.dataset.count)count(e.target)}}),{rootMargin:"0px 0px -10% 0px"});
 $$(".split").forEach(el=>{split(el);io.observe(el)});
 $$("main section .sub,main section .kicker,.promise li,.route .rs,.quotes .q,.pkg-list li,.plan-card,.plan-copy ul,.panel-info,.grid>*,.feat>*,.steps>*,.types>*,.box,.facts,details,.cta,.team>*,.f-top>*,.fgrid>*,.stat,.art").forEach(el=>{
  if(el.getBoundingClientRect().top<innerHeight*.92)return;
  const sib=el.parentElement?[...el.parentElement.children].indexOf(el):0;el.style.setProperty("--d",(sib%4)*.08+"s");el.classList.add("rv");io.observe(el)});
 $$("[data-count]").forEach(el=>io.observe(el));
 const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io2.unobserve(e.target)}}),{rootMargin:"0px -2% -6% 0px"});
 const imgs=()=>$$(".rail>*:not(.rv-img),.grid .ph-img:not(.rv-img),.grid .tcard:not(.rv-img)").forEach((el,k)=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.9&&r.left<innerWidth&&r.right>0)return;el.style.setProperty("--d",(([...el.parentElement.children].indexOf(el))%4)*.07+"s");el.classList.add("rv-img");io2.observe(el)});
 imgs();new MutationObserver(imgs).observe(document.body,{childList:true,subtree:true});
}
function count(el){if(el._c)return;el._c=1;const n=+el.dataset.count,s=el.dataset.suf||"",t0=performance.now(),D_=1600;
 const f=t=>{const p=Math.min(1,(t-t0)/D_),v=Math.round(n*(1-Math.pow(1-p,4)));el.textContent=v.toLocaleString("en-US")+s;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}

P[pg]&&P[pg]();
/* one scroll loop: header, meter, hero layers, pinned tours, landmarks */
(function(){
 const h=$("#siteHdr"),meter=$(".scroll-meter"),scene=$("#scene"),layers=scene?$$("[data-depth]",scene):[],hs=$(".hs"),track=$("#hsTrack"),hsProg=$("#hsProg"),hsNow=$("#hsNow");
 const par=$$("[data-speed]");let lastY=0,hsW=0,hsOn=false;
 const sizeHs=()=>{if(!hs)return;hsOn=innerWidth>760&&!RM;if(!hsOn){hs.style.height="";track.style.transform="";return}hsW=track.scrollWidth-innerWidth;hs.style.height=(hsW+innerHeight)+"px"};
 const f=()=>{const y=scrollY,vh=innerHeight;
  h.classList.toggle("scrolled",y>30);h.classList.toggle("hide",y>vh*.9&&y>lastY+2&&!$(".has-dd.open"));if(y<lastY-2)h.classList.remove("hide");lastY=y;
  meter.style.setProperty("--sp",Math.min(1,y/Math.max(1,document.documentElement.scrollHeight-vh)));
  if(scene&&!RM&&y<vh*1.2){const p=y/vh;layers.forEach(l=>{const d=+l.dataset.depth;l.style.transform=(l.classList.contains("emb")?"translate(-50%,-50%) ":"")+`translate3d(0,${y*d}px,0)`+(l.classList.contains("emb")?` scale(${1+p*.18})`:"")})}
  if(hsOn){const r=hs.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(hs.offsetHeight-vh)));track.style.transform=`translate3d(${-p*hsW}px,0,0)`;hsProg.style.setProperty("--p",p);
   const k=Math.min(TOURS.length,Math.floor(p*(TOURS.length+.6))+1);if(hsNow.textContent!==pad(k)){hsNow.textContent=pad(k);if(p>0&&p<1)SFX.tick()}}
  if(!RM)par.forEach(el=>{const host=el.parentElement.getBoundingClientRect();if(host.bottom<-200||host.top>vh+200)return;let o=(host.top+host.height/2-vh/2)*+el.dataset.speed;if(el.classList.contains("lm")||el.classList.contains("ct"))o=Math.max(0,o);else if(el.classList.contains("float"))o=Math.max(0,Math.min(260,o));else o=Math.max(-140,Math.min(140,o));el.style.transform=`translate3d(0,${o}px,0)`});
 };
 let tk=false;addEventListener("scroll",()=>{if(!tk){tk=true;requestAnimationFrame(()=>{tk=false;f()})}},{passive:true});
 addEventListener("resize",()=>{sizeHs();f()});addEventListener("load",()=>{sizeHs();f()});
 if(track){hyd();sizeHs()}f();
})();

fillIcons();wrapBtns();hyd();reveal();
document.fonts&&document.fonts.ready.then(()=>dispatchEvent(new Event("resize")));
/* hide floating dock while the footer is on screen (small screens), so the credit bar stays clear */
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>document.documentElement.classList.toggle("ftr-in",e.isIntersecting)),{threshold:.15});const ft=$("footer");ft&&io.observe(ft)}
/* ===== THEMED PAGE SCROLLBAR (draggable, follows smooth scroll) ===== */
(function(){const de=document.documentElement;if(FINE)de.classList.add("fine");
 const sb=document.createElement("div");sb.className="vsb";sb.setAttribute("aria-hidden","true");sb.innerHTML="<i></i>";document.body.appendChild(sb);const th=sb.firstChild;let idle,drag=null;
 const max=()=>Math.max(1,de.scrollHeight-innerHeight);
 const draw=()=>{const h=innerHeight-16,th_h=Math.max(40,h*innerHeight/de.scrollHeight);th.style.height=th_h+"px";th.style.transform=`translateY(${8+(h-th_h)*Math.min(1,scrollY/max())}px)`;sb.style.display=de.scrollHeight<=innerHeight+2?"none":""};
 const go=y=>{y=Math.max(0,Math.min(max(),y));window.lenis?lenis.scrollTo(y,{immediate:true}):scrollTo(0,y)};
 addEventListener("scroll",()=>{draw();sb.classList.add("on");clearTimeout(idle);idle=setTimeout(()=>sb.classList.remove("on"),900)},{passive:true});
 addEventListener("resize",draw);new ResizeObserver(draw).observe(document.body);draw();
 th.addEventListener("pointerdown",e=>{e.preventDefault();drag={y:e.clientY,s:scrollY};sb.classList.add("drag");de.classList.add("drag-sb");th.setPointerCapture(e.pointerId)});
 th.addEventListener("pointermove",e=>{if(!drag)return;const h=innerHeight-16,th_h=th.offsetHeight;go(drag.s+(e.clientY-drag.y)*max()/(h-th_h))});
 th.addEventListener("pointerup",()=>{drag=null;sb.classList.remove("drag");de.classList.remove("drag-sb")});
 sb.addEventListener("pointerdown",e=>{if(e.target!==sb)return;const y=(e.clientY-8)/(innerHeight-16)*max()-innerHeight/2;window.lenis?lenis.scrollTo(Math.max(0,y),{duration:1.1}):scrollTo({top:y,behavior:"smooth"});SFX.tick()});
})();
/* ===== PAGE TRANSITIONS (ink curtain with the emblem) ===== */
(function(){if(RM)return;const pt=document.createElement("div");pt.className="pt";pt.setAttribute("aria-hidden","true");pt.innerHTML='<img src="images/logo/emblem.svg" alt="">';document.body.appendChild(pt);
 requestAnimationFrame(()=>requestAnimationFrame(()=>pt.classList.add("gone")));
 addEventListener("pageshow",e=>{if(e.persisted){pt.className="pt gone"}});
 document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;
  const u=new URL(a.href,location.href);if(u.origin!==location.origin||/\.(?!html$)[a-z0-9]+$/i.test(u.pathname))return;if(u.pathname===location.pathname&&u.hash)return;
  e.preventDefault();pt.className="pt come";void pt.offsetWidth;pt.classList.add("go");SFX.swap();setTimeout(()=>location.href=u.href,560)});
})();
