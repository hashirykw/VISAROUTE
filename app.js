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
const $=(s,r=document)=>r.querySelector(s),Q=new URLSearchParams(location.search),pg=document.body.dataset.page;
const price=(c,t="Tourist")=>Math.round(c.gov*M[t])+c.svc;
const opts=a=>a.map((x,i)=>`<option value="${i}">${x.f} ${x.n}</option>`).join("");
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),4000)}
const card=(c,i)=>`<article class="dest"><div class="img" data-src="images/${c.s}.jpg" style="--h:${c.h}"><span>${c.l}</span></div><div class="body"><h3>${c.n}</h3><div class="meta">${c.k} · ${c.t}</div><div class="meta">${c.r}</div><div class="price"><div><small>from</small> <b>$${price(c)}</b></div><div><a class="btn sm dark" href="destination.html?c=${i}">Details</a><a class="btn sm" href="apply.html?c=${i}">Apply</a></div></div></div></article>`;


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
const tcard=(t,i)=>`<article class="dest"><div class="img" data-src="images/${t.s}.jpg" style="--h:${t.h}">${t.tag?`<b class="badge">${t.tag}</b>`:""}<span>${t.l}</span></div><div class="body"><h3>${t.n}</h3><div class="meta">${t.d} days · ${t.rt}</div><div class="meta">${t.c}</div><div class="price"><div>${pr(t)}</div><a class="btn sm" href="tour.html?t=${i}">View tour</a></div></div></article>`;
const bcard=(a,i)=>`<article class="dest"><div class="img" data-src="images/${a.s}.jpg" style="--h:${a.h}"><span>${a.l}</span></div><div class="body"><div class="meta">${a.cat}</div><h3>${a.t}</h3><div class="meta">${a.p[0].slice(0,95)}…</div><a href="article.html?a=${i}" class="btn sm dark" style="align-self:flex-start;margin-top:10px">Read guide</a></div></article>`;
/* photos: put files in /images named as the "s" value, e.g. images/uae.jpg, images/hero.jpg. Missing photos show the artwork. */
const hyd=()=>document.querySelectorAll("[data-src]:not([data-tried])").forEach(el=>{el.dataset.tried=1;const i=new Image();i.onload=()=>{el.style.backgroundImage=(el.dataset.ov?"linear-gradient(rgba(6,32,28,.5),rgba(6,32,28,.82)),":"")+`url(${el.dataset.src})`;el.classList.add("has")};i.src=el.dataset.src});
new MutationObserver(hyd).observe(document.documentElement,{childList:true,subtree:true});

/* ---- shared header & footer ---- */
const NAV=[["index.html","Home","home"],["destinations.html","Visas","dests"],["tours.html","Tours","tours"],["umrah.html","Umrah","umrah"],["services.html","Services","services"],["blog.html","Blog","blog"],["about.html","About","about"],["contact.html","Contact","contact"]];
$("#hdr").innerHTML=`<div class="top"><div class="wrap"><span>📞 +92 300 0000000 · ✉ support@visaroute.com</span><span>Mon–Sat, 9am–9pm</span></div></div><header><div class="wrap nav"><a href="index.html" class="logo"><i>✈</i>VisaRoute</a>
<nav aria-label="Main"><ul id="menu">${NAV.map(n=>`<li><a href="${n[0]}" class="${n[2]===(ACT[pg]||pg)?"on":""}">${n[1]}</a></li>`).join("")}</ul></nav>
<div style="display:flex;gap:10px;align-items:center"><a href="apply.html" class="btn dark sm">Apply now</a><button class="menu" id="mbtn" aria-label="Menu" aria-expanded="false">Menu</button></div></div></header>`;
$("#ftr").innerHTML=`<footer><div class="wrap"><div class="fgrid">
<div><div class="logo" style="color:#fff;margin-bottom:12px"><i>✈</i>VisaRoute</div><p>Visas and holidays for travellers worldwide. Expert document checks, curated tours and friendly support.</p></div>
<div><h4>Visas</h4><ul><li><a href="destinations.html">All destinations</a></li><li><a href="apply.html">Apply now</a></li><li><a href="track.html">Track application</a></li><li><a href="how-it-works.html">How it works</a></li></ul></div>
<div><h4>Travel</h4><ul><li><a href="tours.html">Holiday tours</a></li><li><a href="umrah.html">Umrah packages</a></li><li><a href="tour.html?t=7">World tour</a></li><li><a href="services.html">Our services</a></li><li><a href="blog.html">Travel blog</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li><li>support@visaroute.com</li></ul></div></div>
<div class="copy"><span>© 2026 VisaRoute. All rights reserved.</span><span>Privacy · Terms · Refund policy</span></div></div></footer>
<a class="wa" href="https://wa.me/920000000000" target="_blank" rel="noopener">WhatsApp us</a><div id="toast" role="status"></div>`;
$("#mbtn").onclick=()=>{const o=$("#menu").classList.toggle("open");$("#mbtn").setAttribute("aria-expanded",o)};

/* ---- page logic ---- */
const P={
home(){
 $("#f-dest").innerHTML=opts(D);
 $("#finder").onsubmit=e=>{e.preventDefault();location.href=`apply.html?c=${$("#f-dest").value}&t=${$("#f-type").value}`};
 $("#pop").innerHTML=[0,3,4,5,6,8].map(i=>card(D[i],i)).join("");
},
dests(){
 let r="All",s="";const rs=["All",...new Set(D.map(c=>c.r))];
 const draw=()=>{$("#chips").innerHTML=rs.map(x=>`<button class="chip" aria-pressed="${x===r}" data-r="${x}">${x}</button>`).join("");
  const l=D.map((c,i)=>[c,i]).filter(([c])=>(r==="All"||c.r===r)&&c.n.toLowerCase().includes(s));
  $("#grid").innerHTML=l.length?l.map(([c,i])=>card(c,i)).join(""):"<p>No country found. Try another name or contact us, we cover 100+ countries.</p>"};
 $("#chips").onclick=e=>{if(e.target.dataset.r){r=e.target.dataset.r;draw()}};
 $("#srch").oninput=e=>{s=e.target.value.toLowerCase();draw()};draw();
},
dest(){
 const i=+Q.get("c")||0,c=D[i]||D[0];document.title=c.n+" visa – VisaRoute";const ph=$(".ph");ph.dataset.src="images/"+c.s+".jpg";ph.dataset.ov=1;
 $("#d-title").textContent=`${c.f} ${c.n} visa`;$("#d-crumb").textContent=c.n;
 $("#d-facts").innerHTML=[["Visa format",c.k],["Processing",c.t],["Max stay",c.s],["Validity",c.v],["Total from","$"+price(c)]].map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");
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
  $("#sumFlag").textContent=c.f;$("#s-dest").textContent=c.n;$("#s-type").textContent=t;$("#s-time").textContent=c.t;
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
  $("#appForm").innerHTML=`<div class="ok"><h2>Application received</h2><p>Your reference number is</p><div class="ref">${ref}</div><p>We emailed the details to ${order.email}. Keep this number to track your visa.</p><p style="margin-top:18px"><a class="btn teal" href="track.html?ref=${ref}">Track application</a></p><p class="note">Demo mode: payment gateway is not connected yet.</p></div>`;
  scrollTo({top:0,behavior:"smooth"})};
},
track(){
 const S=["Application received","Documents under review","Submitted to embassy","Visa issued"];
 const go=ref=>{const n=[...ref].reduce((a,c)=>a+c.charCodeAt(0),0)%4;
  $("#t-out").innerHTML=`<h3>Reference ${ref}</h3><ul class="tl">${S.map((s,i)=>`<li class="${i<=n?"done":""}">${s}</li>`).join("")}</ul><p class="note">Demo status. Connect your backend to show real progress.</p>`};
 $("#t-form").onsubmit=e=>{e.preventDefault();go($("#t-ref").value.trim().toUpperCase())};
 if(Q.get("ref")){$("#t-ref").value=Q.get("ref");go(Q.get("ref"))}
},
contact(){$("#c-form").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Message sent. We will reply within the hour. (Demo: connect your backend.)")}}
};


const chipsFor=(list,key,get)=>{let r="All",q="";const rs=["All",...new Set(list.map(x=>x[key]))];
 const draw=()=>{$("#chips").innerHTML=rs.map(x=>`<button class="chip" aria-pressed="${x===r}" data-r="${x}">${x}</button>`).join("");
  const l=list.map((x,i)=>[x,i]).filter(([x])=>(r==="All"||x[key]===r)&&x.n.toLowerCase().includes(q));
  $("#grid").innerHTML=l.length?l.map(([x,i])=>get(x,i)).join(""):"<p>Nothing found. Message us and we will arrange a custom plan.</p>"};
 $("#chips").onclick=e=>{if(e.target.dataset.r){r=e.target.dataset.r;draw()}};$("#srch").oninput=e=>{q=e.target.value.toLowerCase();draw()};draw()};
const tile=(x,href,big)=>`<a class="img ${big?"big":""}" href="${href}" data-src="images/${x.s}.jpg" style="--h:${x.h}"><span>${x.l}</span><em>${x.n}</em></a>`;
Object.assign(P,{
home(){
 $("#f-dest").innerHTML=opts(D);
 $("#finder").onsubmit=e=>{e.preventDefault();location.href=`apply.html?c=${$("#f-dest").value}&t=${$("#f-type").value}`};
 $("#pop").innerHTML=[0,3,4,5,6,8].map(i=>card(D[i],i)).join("");
 $("#tpop").innerHTML=[0,1,2,3,4,5].map(i=>tcard(TOURS[i],i)).join("");
 $("#blogp").innerHTML=ARTS.slice(0,3).map(bcard).join("");
 $("#mos").innerHTML=tile(TOURS[3],"tour.html?t=3",1)+tile(D[3],"destination.html?c=3")+tile(TOURS[2],"tour.html?t=2")+tile(D[9],"destination.html?c=9")+tile(TOURS[0],"tour.html?t=0");
 $("#nl").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Subscribed. (Demo: connect your email service.)")};
},
tours(){chipsFor(TOURS,"c",tcard)},
tour(){
 const i=+Q.get("t")||0,t=TOURS[i]||TOURS[0];document.title=t.n+" – VisaRoute";
 const ph=$(".ph");ph.dataset.src="images/"+t.s+".jpg";ph.dataset.ov=1;
 $("#tr-title").textContent=t.l+" "+t.n;$("#tr-crumb").textContent=t.n;
 $("#tr-facts").innerHTML=[["Duration",t.d+" days"],["Route",t.rt],["Category",t.c],["Price",t.price?"from $"+t.price:"Get a quote"]].map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");
 $("#tr-hi").innerHTML=t.hi.map(x=>`<li>${x}</li>`).join("");
 $("#tr-it").innerHTML=t.it.map(x=>`<li class="done">${x}</li>`).join("");
 $("#tr-inc").innerHTML=INC.map(x=>`<li>${x}</li>`).join("");
 $("#tr-exc").innerHTML=EXC.map(x=>`<li>${x}</li>`).join("");
 $("#tr-more").innerHTML=TOURS.map((x,j)=>[x,j]).filter(([,j])=>j!==i).slice(0,3).map(([x,j])=>tcard(x,j)).join("");
 $("#tr-form").onsubmit=e=>{e.preventDefault();
  /* ===== TOUR BOOKING INTEGRATION POINT: yahan form data apne backend/payment par bhejein ===== */
  e.target.reset();toast("Enquiry sent. We will contact you within the hour. (Demo mode)")};
},
blog(){$("#grid").innerHTML=ARTS.map(bcard).join("")},
article(){
 const a=ARTS[+Q.get("a")||0];document.title=a.t+" – VisaRoute";
 $("#ar-title").textContent=a.t;$("#ar-crumb").textContent=a.cat;$("#ar-body").innerHTML=a.p.map(x=>`<p>${x}</p>`).join("");
 $("#ar-more").innerHTML=ARTS.filter(x=>x!==a).slice(0,3).map((x)=>bcard(x,ARTS.indexOf(x))).join("");
}});

/* ===== UMRAH DATA (edit hotels/inclusions; price:null shows "Get a quote") ===== */
const UM=[
{s:"umrah-economy",n:"Economy Umrah",d:14,tag:"Value",l:"🕋",hot:"Makkah 3★ about 1 km from Haram · Madinah 3★",inc:["Umrah visa processing","Shared hotel rooms","Group transport","Guided ziyarat"]},
{s:"umrah-standard",n:"Standard Umrah",d:15,tag:"Popular",l:"🕌",hot:"Makkah 4★ about 500 m from Haram · Madinah 4★ near Masjid an-Nabawi",inc:["Umrah visa processing","Double or triple rooms","Breakfast included","Guided ziyarat","Airport transfers"]},
{s:"umrah-premium",n:"Premium Umrah",d:21,l:"🌙",hot:"Makkah 5★ with Haram view · Madinah 5★ in front of Nabawi",inc:["Umrah visa processing","Private transport","Breakfast and dinner","Dedicated guide","Flexible dates"]}];
UM.forEach((u,i)=>u.h=(i*40+150)%360);
const ucard=(u,i)=>`<article class="dest"><div class="img" data-src="images/${u.s}.jpg" style="--h:${u.h}">${u.tag?`<b class="badge">${u.tag}</b>`:""}<span>${u.l}</span></div><div class="body"><h3>${u.n}</h3><div class="meta">${u.d} days · Makkah &amp; Madinah</div><div class="meta">${u.hot}</div><ul class="list" style="margin:10px 0">${u.inc.map(x=>`<li>${x}</li>`).join("")}</ul><div class="price"><div>${u.price?`<small>from</small> <b>$${u.price}</b>`:"<b>Get a quote</b>"}</div><a class="btn sm" href="#u-form" data-pk="${i}">Enquire</a></div></div></article>`;
Object.assign(P,{umrah(){
 $("#um-pk").innerHTML=UM.map(ucard).join("");
 $("#u-pk").innerHTML=UM.map(u=>`<option>${u.n}</option>`).join("");
 $("#um-pk").onclick=e=>{const a=e.target.closest("[data-pk]");if(a)$("#u-pk").selectedIndex=+a.dataset.pk};
 $("#t-form").onsubmit=e=>{e.preventDefault();
  /* ===== UMRAH TICKET INTEGRATION POINT: yahan flight enquiry apne backend/email par bhejein ===== */
  e.target.reset();toast("Ticket enquiry sent. We will send fares within the hour. (Demo mode)")};
 $("#u-form").onsubmit=e=>{e.preventDefault();
  /* ===== UMRAH PACKAGE INTEGRATION POINT ===== */
  e.target.reset();toast("Package enquiry sent. Our Umrah team will call you. (Demo mode)")};
}});

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
  return L(`${c.f} <b>${c.n}</b>: ${c.k}, processing ${c.t}, from <b>$${price(c)}</b> (tourist). <a href='destination.html?c=${i}'>See requirements</a> or <a href='apply.html?c=${i}'>apply now</a>.`,`${c.f} <b>${c.n}</b>: ${c.k}, processing ${c.t}, tourist visa <b>$${price(c)}</b> se shuru. <a href='destination.html?c=${i}'>Requirements</a> ya <a href='apply.html?c=${i}'>abhi apply karein</a>.`,u)}}
 for(const[r,f]of KB)if(r.test(m))return f(u);
 return L("I’m not sure about that one. You can ask about visas, tours, Umrah, tickets or payments, or chat with our team on <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a>.","Is baare mein mujhe pakka nahi pata. Visa, tours, Umrah, tickets ya payment ke baare mein puchein, ya <a href='https://wa.me/920000000000' target='_blank' rel='noopener'>WhatsApp</a> par team se baat karein.",u)}
(function(){
 const w=document.createElement("div");
 w.innerHTML=`<button class="cb-btn" id="cb-btn" aria-expanded="false" aria-controls="cb">💬 Ask us</button>
 <section id="cb" aria-label="Chat assistant"><div class="cb-h"><div><b>VisaRoute Assistant</b><small>Instant answers, 24/7</small></div><button id="cb-x" aria-label="Close chat">×</button></div>
 <div class="cb-m" id="cb-m" aria-live="polite"></div>
 <div class="cb-q" id="cb-q"><button>Visa price</button><button>Umrah packages</button><button>Flight tickets</button><button>Tours</button><button>Talk to a person</button></div>
 <form class="cb-f" id="cb-f"><input id="cb-i" placeholder="Type your question…" aria-label="Message" autocomplete="off"><button class="btn teal" type="submit">Send</button></form></section>`;
 document.body.appendChild(w);
 const box=$("#cb"),msgs=$("#cb-m"),hist=[];
 const add=(h,who,raw)=>{const d=document.createElement("div");d.className="m "+who;raw?d.textContent=h:d.innerHTML=h;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d};
 const open=o=>{box.classList.toggle("open",o);$("#cb-btn").setAttribute("aria-expanded",o);if(o){if(!msgs.children.length)add("Assalamu alaikum! 👋 I’m the VisaRoute assistant. Ask me about visas, tours, Umrah or tickets. Aap Roman Urdu mein bhi likh sakte hain.","b");$("#cb-i").focus()}};
 $("#cb-btn").onclick=()=>open(!box.classList.contains("open"));$("#cb-x").onclick=()=>open(false);
 async function ask(t){add(t,"u",1);hist.push({role:"user",content:t});const d=add("…","b");let r;
  if(AI_ENDPOINT){try{const x=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,history:hist})});r=(await x.json()).reply}catch(e){r=null}}
  if(!r){await new Promise(z=>setTimeout(z,450));r=botReply(t)}
  d.innerHTML=r;hist.push({role:"assistant",content:r});msgs.scrollTop=msgs.scrollHeight}
 $("#cb-f").onsubmit=e=>{e.preventDefault();const i=$("#cb-i"),t=i.value.trim();if(t){i.value="";ask(t)}};
 $("#cb-q").onclick=e=>{if(e.target.tagName==="BUTTON")ask(e.target.textContent)};
})();
P[pg]&&P[pg]();hyd();
