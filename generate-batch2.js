#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const BASE = __dirname;
const BLOG = path.join(BASE, 'blog');
const DATE = '2026-06-13';

let created = 0;

// ─── BLOG GENERATOR (reuse template from existing) ───
const blogTemplate = fs.readFileSync(path.join(BLOG, 'website-tips-for-accountants/index.html'), 'utf8');

function makeBlog(slug, lang, title, desc, keywords, tag, readTime, body) {
  const dir = path.join(BLOG, slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) return;
  const locale = lang === 'da' ? 'da_DK' : 'en_US';
  const home = lang === 'da' ? '/da/' : '/en/';
  const url = `https://dynamicmedia.dk/blog/${slug}/`;
  const navHow = lang === 'da' ? 'Sådan virker det' : 'How it works';
  const navEx = lang === 'da' ? 'Eksempler' : 'Examples';
  const navPr = lang === 'da' ? 'Priser' : 'Pricing';
  const ctaBtn = lang === 'da' ? 'Book gratis demo' : 'Book free demo';
  const ctaTitle = lang === 'da' ? 'Se WebAssist i aktion' : 'See WebAssist in action';
  const ctaText = lang === 'da' ? 'Book en gratis 30-minutters demo.' : 'Book a free 30-minute demo.';
  const backLabel = lang === 'da' ? '&#8592; Tilbage til blog' : '&#8592; Back to blog';
  const readLabel = lang === 'da' ? `&#9203; ${readTime} læsetid` : `&#9203; ${readTime} read`;

  // Minimal but complete blog page
  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${title}</title><meta name="description" content="${desc}"><meta name="keywords" content="${keywords}"><meta name="robots" content="index,follow"><meta name="author" content="Phillip Bjerg"><link rel="canonical" href="${url}"><meta property="og:type" content="article"><meta property="og:url" content="${url}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:image" content="https://dynamicmedia.dk/og-image.png"><meta property="og:locale" content="${locale}"><meta property="article:published_time" content="${DATE}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${desc}"><meta name="theme-color" content="#25D366"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title.replace(/"/g,'\\"')}","description":"${desc.replace(/"/g,'\\"')}","url":"${url}","datePublished":"${DATE}","author":{"@type":"Person","name":"Phillip Bjerg"},"publisher":{"@type":"Organization","name":"WebAssist"},"inLanguage":"${lang}"}</script><style>*{box-sizing:border-box;margin:0;padding:0}:root{--wa:#25D366;--text:#0f172a;--muted:#475569;--subtle:#64748b}body{font-family:Inter,-apple-system,sans-serif;color:var(--text);line-height:1.6}nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.9);backdrop-filter:blur(20px);border-bottom:1px solid #e5e7eb}.nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;height:68px;display:flex;align-items:center;justify-content:space-between}.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}.nav-logo-icon{width:36px;height:36px;background:var(--wa);border-radius:10px;display:flex;align-items:center;justify-content:center}.nav-logo-name{font-size:17px;font-weight:800;color:var(--text)}.nav-links{display:flex;gap:32px}.nav-links a{font-size:14px;font-weight:500;color:var(--muted);text-decoration:none}.btn-cta{font-size:14px;font-weight:700;color:#000;background:var(--wa);border:none;border-radius:50px;padding:9px 20px;cursor:pointer}.hero{background:linear-gradient(135deg,#f0fdf4,#fff);padding:80px 24px 60px;border-bottom:1px solid #e2e8f0}.hero-inner{max-width:740px;margin:0 auto}.tag{background:rgba(37,211,102,.1);color:#16a34a;font-weight:600;padding:4px 12px;border-radius:50px;font-size:12px;display:inline-block;margin-bottom:16px}.hero h1{font-size:clamp(28px,4vw,44px);font-weight:900;line-height:1.15;letter-spacing:-1px;margin-bottom:20px}.hero p{font-size:18px;color:var(--muted);max-width:680px}.back{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#16a34a;text-decoration:none;font-weight:600;margin-bottom:24px}article{max-width:740px;margin:0 auto;padding:60px 24px}article h2{font-size:26px;font-weight:800;margin:48px 0 16px;letter-spacing:-.5px}article h3{font-size:20px;font-weight:700;margin:32px 0 12px}article p{font-size:16px;color:#334155;line-height:1.8;margin-bottom:20px}article ul,article ol{margin:16px 0 24px 24px}article li{font-size:16px;color:#334155;line-height:1.7;margin-bottom:8px}.cta-box{background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid rgba(37,211,102,.25);border-radius:24px;padding:40px;text-align:center;margin:48px 0}.cta-box h3{font-size:22px;font-weight:800;margin-bottom:12px}.cta-box p{color:var(--muted);margin-bottom:24px}.btn-primary{font-size:16px;font-weight:700;color:#000;background:var(--wa);border:none;border-radius:50px;padding:16px 32px;cursor:pointer;text-decoration:none;display:inline-block}footer{background:#f8fafc;border-top:1px solid #e2e8f0;padding:32px 24px;text-align:center;font-size:13px;color:var(--subtle)}@media(max-width:768px){.nav-links{display:none}}</style></head><body><nav><div class="nav-inner"><a href="${home}" class="nav-logo"><div class="nav-logo-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" width="20" height="20"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.38A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg></div><div class="nav-logo-name">WebAssist</div></a><div class="nav-links"><a href="${home}#solution">${navHow}</a><a href="${home}#pricing">${navPr}</a><a href="/blog/">Blog</a></div><button onclick="location.href='${home}'" class="btn-cta">${ctaBtn}</button></div></nav><div class="hero"><div class="hero-inner"><a href="/blog/" class="back">${backLabel}</a><div style="display:flex;gap:16px;margin-bottom:20px;font-size:13px;color:#64748b"><span class="tag">${tag}</span><span>${DATE}</span><span>${readLabel}</span></div><h1>${title}</h1><p>${desc}</p></div></div><article>${body}<div class="cta-box"><h3>${ctaTitle}</h3><p>${ctaText}</p><a href="${home}" class="btn-primary">${ctaBtn}</a></div></article><footer>&copy; 2026 WebAssist — Dynamic Media. All rights reserved.</footer></body></html>`;

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}

// ─── EN blog type 5: best website features ───
const EN_NICHES = ['accountants','architects','bakeries','beauty-salons','builders','cafes','cleaning-companies','clinics','coaches','consultants','dentists','driving-schools','electricians','event-planners','freelancers','gyms','hair-salons','hairdressers','hotels','landscapers','law-firms','local-businesses','music-schools','musicians','painters','personal-trainers','photographers','physiotherapists','plumbers','real-estate','restaurants','sports-clubs','tattoo-studios','travel-agencies','veterinarians','yoga-studios'];
const EN_NAMES = {'accountants':'Accountants','architects':'Architects','bakeries':'Bakeries','beauty-salons':'Beauty Salons','builders':'Builders','cafes':'Cafés','cleaning-companies':'Cleaning Companies','clinics':'Clinics','coaches':'Coaches','consultants':'Consultants','dentists':'Dentists','driving-schools':'Driving Schools','electricians':'Electricians','event-planners':'Event Planners','freelancers':'Freelancers','gyms':'Gyms','hair-salons':'Hair Salons','hairdressers':'Hairdressers','hotels':'Hotels','landscapers':'Landscapers','law-firms':'Law Firms','local-businesses':'Local Businesses','music-schools':'Music Schools','musicians':'Musicians','painters':'Painters','personal-trainers':'Personal Trainers','photographers':'Photographers','physiotherapists':'Physiotherapists','plumbers':'Plumbers','real-estate':'Real Estate Agents','restaurants':'Restaurants','sports-clubs':'Sports Clubs','tattoo-studios':'Tattoo Studios','travel-agencies':'Travel Agencies','veterinarians':'Veterinarians','yoga-studios':'Yoga Studios'};

for (const slug of EN_NICHES) {
  const name = EN_NAMES[slug];
  makeBlog(`best-website-features-${slug}`, 'en',
    `Best Website Features for ${name} in 2026`,
    `The must-have features every ${name.toLowerCase()} website needs in 2026. From online booking to mobile design — what converts visitors into customers.`,
    `${slug} website features, best ${slug} website, ${slug} web design 2026`,
    'Features', '6 min',
    `<h2>What Makes a Great ${name} Website in 2026?</h2><p>Your website isn't just a digital business card anymore. In 2026, it's your 24/7 sales team, your receptionist, and your portfolio all in one. But not all websites are created equal. Here are the features that separate the ${name.toLowerCase()} websites that convert from the ones that collect dust.</p><h2>1. Online Booking Integration</h2><p>If customers can't book directly from your website, you're adding friction. Every extra step — calling, emailing, waiting for a reply — loses potential business. A simple booking button or WhatsApp link removes that barrier instantly.</p><h2>2. Mobile-First Design</h2><p>73% of your visitors are on their phones. If your website doesn't load fast and look great on mobile, you're invisible to most potential customers. Mobile-first isn't optional for ${name.toLowerCase()} — it's the baseline.</p><h2>3. Social Proof Front and Center</h2><p>Reviews, testimonials, and case studies should be impossible to miss. ${name} live and die by reputation. Put your best customer feedback on your homepage, not buried three clicks deep.</p><h2>4. Updated Pricing & Services</h2><p>Nothing kills trust faster than outdated information. If a customer calls about a price they saw on your site and it's wrong, you've already lost them. Keep your services and pricing current — <a href="https://dynamicmedia.dk/en/" style="color:#16a34a;font-weight:600;">WebAssist</a> makes this effortless via WhatsApp.</p><h2>5. Local SEO Optimization</h2><p>Your website needs to tell Google exactly where you are and what you do. Location-specific keywords, embedded Google Maps, and a linked Google Business Profile are non-negotiable for ${name.toLowerCase()} who serve local customers.</p><h2>6. Fast Loading Speed</h2><p>Every second of load time costs you 7% in conversions. A lightweight, optimized website outperforms a fancy but slow one every time. Skip the heavy animations and focus on speed.</p><h2>The Bottom Line</h2><p>The best ${name.toLowerCase()} websites in 2026 aren't the most expensive or flashy ones. They're the ones that load fast, look great on phones, show current information, and make it easy to book. And with WebAssist, keeping all of this updated is as simple as sending a WhatsApp message.</p>`
  );

  makeBlog(`digital-marketing-guide-${slug}`, 'en',
    `Digital Marketing Guide for ${name}: Everything You Need to Know`,
    `Complete digital marketing guide for ${name.toLowerCase()}. From Google to social media — practical strategies that actually work for small businesses.`,
    `${slug} digital marketing, ${slug} online marketing, ${slug} marketing guide`,
    'Marketing', '9 min',
    `<h2>Digital Marketing for ${name}: Where to Start</h2><p>You know ${name.toLowerCase()} inside out. But digital marketing? That's a whole different world. The good news: you don't need to master everything. You just need to do the right things consistently. Here's your complete guide.</p><h2>Google: Your Most Important Channel</h2><p>For ${name.toLowerCase()}, Google is where customers find you. Two things matter most: your Google Business Profile and your website's SEO. Claim your business profile, fill out every field, add photos weekly, and respond to every review. This alone puts you ahead of 80% of competitors.</p><h2>Your Website: The Hub of Everything</h2><p>Social media posts disappear. Ads stop when you stop paying. But your website works 24/7. Make sure it has current information, clear calls to action, and loads fast on mobile. Update it regularly — Google rewards fresh content with better rankings.</p><h2>Social Media: Quality Over Quantity</h2><p>You don't need to be on every platform. Pick one or two where your customers actually are. Post consistently (2-3 times per week), show your work, share customer stories, and engage with comments. Authenticity beats polish every time.</p><h2>Email & WhatsApp Marketing</h2><p>Email and WhatsApp are the highest-converting channels for ${name.toLowerCase()}. Build a list, send value (not just promotions), and stay top of mind. WhatsApp Business is particularly powerful — it has 98% open rates compared to email's 20%.</p><h2>Online Reviews: Your Secret Weapon</h2><p>Reviews are the most underrated marketing tool. Ask every happy customer for a Google review. A business with 50+ reviews ranks dramatically higher than one with 5. Make it easy with a direct review link.</p><h2>Content Marketing</h2><p>Answer the questions your customers ask. Write blog posts, create before/after galleries, share tips. This positions you as the expert AND helps you rank on Google. It's free, it compounds over time, and it builds trust.</p><h2>Keep It Simple</h2><p>The best marketing strategy is the one you actually execute. Start with Google Business Profile + an updated website + consistent reviews. That's 80% of the value with 20% of the effort. <a href="https://dynamicmedia.dk/en/" style="color:#16a34a;font-weight:600;">WebAssist</a> handles the website part — you send a WhatsApp message, we update your site.</p>`
  );
}

// ─── DA blog type 5+6 ───
const DA_NICHES = [
  ['advokater','Advokater'],['arkitekter','Arkitekter'],['bagerier','Bagerier'],['cafer','Caféer'],['coaches','Coaches'],['dyreklinikker','Dyreklinikker'],['ejendomsmaglere','Ejendomsmæglere'],['elektrikere','Elektrikere'],['eventplanlaeggere','Eventplanlæggere'],['fotografer','Fotografer'],['frisorer','Frisører'],['fysioterapeuter','Fysioterapeuter'],['gartneri','Gartnere'],['hotels','Hoteller'],['klinikker','Klinikker'],['konsulenter','Konsulenter'],['korekole','Køreskoler'],['lokale-virksomheder','Lokale virksomheder'],['maler','Malere'],['murer','Murere'],['musikere','Musikere'],['musikskoler','Musikskoler'],['personlige-traenere','Personlige trænere'],['pizzeriaer','Pizzeriaer'],['rengoeringsfirmaer','Rengøringsfirmaer'],['restauranter','Restauranter'],['revisorer','Revisorer'],['sportsklubber','Sportsklubber'],['tandlaeger','Tandlæger'],['tatoverer','Tatovører'],['yogastudie','Yogastudier'],['VVS','VVS-firmaer']
];

for (const [slug, name] of DA_NICHES) {
  makeBlog(`bedste-hjemmeside-funktioner-${slug}`, 'da',
    `Bedste Hjemmesidefunktioner for ${name} i 2026`,
    `De vigtigste funktioner enhver ${name.toLowerCase()}-hjemmeside har brug for i 2026. Fra online booking til mobildesign.`,
    `${slug} hjemmeside funktioner, bedste ${slug} hjemmeside, ${slug} webdesign`,
    'Funktioner', '6 min',
    `<h2>Hvad Kendetegner en God ${name}-Hjemmeside i 2026?</h2><p>Din hjemmeside er ikke bare et digitalt visitkort længere. I 2026 er den din 24/7-sælger, din receptionist og din portefølje i ét. Men ikke alle hjemmesider er skabt lige. Her er de funktioner, der adskiller ${name.toLowerCase()}-hjemmesider der konverterer, fra dem der samler støv.</p><h2>1. Online Booking</h2><p>Hvis kunder ikke kan booke direkte fra din hjemmeside, tilføjer du friktion. Hvert ekstra trin — at ringe, sende email, vente på svar — mister potentiel forretning. En simpel bookingknap eller WhatsApp-link fjerner den barriere øjeblikkeligt.</p><h2>2. Mobil-Først Design</h2><p>73% af dine besøgende er på deres telefon. Hvis din hjemmeside ikke loader hurtigt og ser godt ud på mobil, er du usynlig for de fleste kunder. Mobil-først er ikke valgfrit for ${name.toLowerCase()} — det er baseline.</p><h2>3. Social Proof</h2><p>Anmeldelser og kundeudtalelser skal være umulige at overse. ${name} lever af omdømme. Placer dine bedste kundeudtalelser på forsiden.</p><h2>4. Opdaterede Priser og Ydelser</h2><p>Intet dræber tillid hurtigere end forældet information. Hold dine priser opdaterede — <a href="https://dynamicmedia.dk/da/" style="color:#16a34a;font-weight:600;">WebAssist</a> gør det nemt via WhatsApp.</p><h2>5. Lokal SEO</h2><p>Din hjemmeside skal fortælle Google præcist, hvor du er og hvad du laver. Lokationsspecifikke søgeord, indlejret Google Maps og en linket Google Virksomhedsprofil er nødvendige.</p><h2>Bundlinjen</h2><p>De bedste ${name.toLowerCase()}-hjemmesider i 2026 er ikke de dyreste. De er dem der loader hurtigt, ser godt ud på mobil, viser aktuel information og gør det nemt at booke.</p>`
  );

  makeBlog(`digital-marketing-guide-${slug}`, 'da',
    `Digital Marketing Guide til ${name}: Alt Du Skal Vide`,
    `Komplet digital marketing guide til ${name.toLowerCase()}. Fra Google til sociale medier — strategier der virker for små virksomheder.`,
    `${slug} digital marketing, ${slug} online marketing, ${slug} markedsføring`,
    'Marketing', '9 min',
    `<h2>Digital Marketing for ${name}: Hvor Skal Du Starte?</h2><p>Du kender ${name.toLowerCase()} ud og ind. Men digital marketing? Det er en helt anden verden. Den gode nyhed: du behøver ikke mestre alt. Du skal bare gøre de rigtige ting konsekvent.</p><h2>Google: Din Vigtigste Kanal</h2><p>For ${name.toLowerCase()} er Google der, hvor kunderne finder dig. To ting er vigtigst: din Google Virksomhedsprofil og din hjemmesides SEO. Gør krav på din profil, udfyld alle felter, tilføj billeder ugentligt og svar på alle anmeldelser.</p><h2>Din Hjemmeside: Navet i Alt</h2><p>Sociale medier-opslag forsvinder. Annoncer stopper når du holder op med at betale. Men din hjemmeside arbejder 24/7. Opdater den regelmæssigt — Google belønner friskt indhold med bedre rangeringer.</p><h2>Sociale Medier: Kvalitet Over Kvantitet</h2><p>Du behøver ikke være på alle platforme. Vælg en eller to hvor dine kunder faktisk er. Post konsekvent, vis dit arbejde og engager dig i kommentarer.</p><h2>WhatsApp Marketing</h2><p>WhatsApp har 98% åbningsrate mod emails 20%. Byg en liste og hold kontakten med dine kunder.</p><h2>Hold Det Simpelt</h2><p>Start med Google Virksomhedsprofil + en opdateret hjemmeside + konsekvente anmeldelser. <a href="https://dynamicmedia.dk/da/" style="color:#16a34a;font-weight:600;">WebAssist</a> klarer hjemmesidedelen — du sender en WhatsApp-besked, vi opdaterer dit site.</p>`
  );
}

console.log(`Blog articles created: ${created}`);
const blogBefore = created;

// ─── DE NICHE PAGES ───
const deTemplate = fs.readFileSync(path.join(BASE, 'de/fuer-restaurants/index.html'), 'utf8');

const DE_NEW = [
  ['fuer-architekten','Architekten','Architektur'],
  ['fuer-baeckereien','Bäckereien','Bäckerei'],
  ['fuer-cafes','Cafés','Café'],
  ['fuer-coaches','Coaches','Coaching'],
  ['fuer-elektriker','Elektriker','Elektroinstallation'],
  ['fuer-eventplaner','Eventplaner','Eventplanung'],
  ['fuer-fitnessstudios','Fitnessstudios','Fitness'],
  ['fuer-fotografen','Fotografen','Fotografie'],
  ['fuer-freiberufler','Freiberufler','Freelance'],
  ['fuer-friseure','Friseure','Friseur'],
  ['fuer-maler','Maler','Malerarbeiten'],
  ['fuer-musikschulen','Musikschulen','Musikunterricht'],
  ['fuer-musiker','Musiker','Musik'],
  ['fuer-personal-trainer','Personal Trainer','Personal Training'],
  ['fuer-physiotherapeuten','Physiotherapeuten','Physiotherapie'],
  ['fuer-pizzerien','Pizzerien','Pizza'],
  ['fuer-reinigungsfirmen','Reinigungsfirmen','Reinigung'],
  ['fuer-reisebueros','Reisebüros','Reise'],
  ['fuer-sanitaer','Sanitärbetriebe','Sanitär'],
  ['fuer-schoenheitssalons','Schönheitssalons','Schönheit'],
  ['fuer-sportvereine','Sportvereine','Sport'],
  ['fuer-steuerberater','Steuerberater','Steuerberatung'],
  ['fuer-tattoostudios','Tattoostudios','Tattoo'],
  ['fuer-tierarztpraxen','Tierarztpraxen','Tiermedizin'],
  ['fuer-yogastudios','Yogastudios','Yoga'],
];

for (const [slug, name, field] of DE_NEW) {
  const dir = path.join(BASE, 'de', slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) continue;
  let html = deTemplate;
  html = html.replace(/fuer-restaurants/g, slug);
  html = html.replace(/Restaurants/g, name);
  html = html.replace(/Restaurant/g, name.replace(/e?n$/, ''));
  html = html.replace(/<title>[^<]*<\/title>/, `<title>WebAssist für ${name} — Webseite per WhatsApp aktualisieren</title>`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}
console.log(`DE pages created: ${created - blogBefore}`);
const deBefore = created;

// ─── ES NICHE PAGES ───
const esTemplate = fs.readFileSync(path.join(BASE, 'es/para-restaurantes/index.html'), 'utf8');

const ES_NEW = [
  ['para-arquitectos','Arquitectos'],
  ['para-cafeterias','Cafeterías'],
  ['para-centros-de-belleza','Centros de Belleza'],
  ['para-coaches','Coaches'],
  ['para-dentistas','Dentistas'],
  ['para-electricistas','Electricistas'],
  ['para-escuelas-de-musica','Escuelas de Música'],
  ['para-estudios-de-tatuaje','Estudios de Tatuaje'],
  ['para-fotografos','Fotógrafos'],
  ['para-freelancers','Freelancers'],
  ['para-gimnasios','Gimnasios'],
  ['para-hoteles','Hoteles'],
  ['para-jardineros','Jardineros'],
  ['para-musicos','Músicos'],
  ['para-peluquerias','Peluquerías'],
  ['para-empresas-de-limpieza','Empresas de Limpieza'],
  ['para-fisioterapeutas','Fisioterapeutas'],
  ['para-pintores','Pintores'],
  ['para-fontaneros','Fontaneros'],
  ['para-agencias-de-viajes','Agencias de Viajes'],
  ['para-clubes-deportivos','Clubes Deportivos'],
  ['para-contadores','Contadores'],
  ['para-entrenadores-personales','Entrenadores Personales'],
  ['para-veterinarios','Veterinarios'],
  ['para-estudios-de-yoga','Estudios de Yoga'],
];

for (const [slug, name] of ES_NEW) {
  const dir = path.join(BASE, 'es', slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) continue;
  let html = esTemplate;
  html = html.replace(/para-restaurantes/g, slug);
  html = html.replace(/Restaurantes/g, name);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>WebAssist para ${name} — Actualiza Tu Web por WhatsApp</title>`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}
console.log(`ES pages created: ${created - deBefore}`);
const esBefore = created;

// ─── SV NICHE PAGES ───
const svTemplate = fs.readFileSync(path.join(BASE, 'sv/for-restauranger/index.html'), 'utf8');
const SV_NEW = [
  ['for-arkitekter','Arkitekter'],['for-bagare','Bagerier'],['for-cafeer','Caféer'],
  ['for-coaches','Coaches'],['for-elektriker','Elektriker'],['for-fotografer','Fotografer'],
  ['for-frilansar','Frilansare'],['for-frisorer','Frisörer'],['for-gym','Gym'],
  ['for-hotell','Hotell'],['for-malare','Målare'],['for-tandlakare','Tandläkare'],
];
for (const [slug, name] of SV_NEW) {
  const dir = path.join(BASE, 'sv', slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) continue;
  let html = svTemplate;
  html = html.replace(/for-restauranger/g, slug);
  html = html.replace(/Restauranger/g, name);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>WebAssist för ${name} — Uppdatera Din Hemsida via WhatsApp</title>`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}
console.log(`SV pages created: ${created - esBefore}`);
const svBefore = created;

// ─── NO NICHE PAGES ───
const noTemplate = fs.readFileSync(path.join(BASE, 'no/for-restauranter/index.html'), 'utf8');
const NO_NEW = [
  ['for-arkitekter','Arkitekter'],['for-bakerier','Bakerier'],['for-coacher','Coacher'],
  ['for-elektrikere','Elektrikere'],['for-fotografer','Fotografer'],['for-frilanser','Frilansere'],
  ['for-frisorer','Frisører'],['for-hoteller','Hoteller'],['for-malere','Malere'],
  ['for-tannleger','Tannleger'],['for-trenere','Personlige trenere'],['for-yogastudioer','Yogastudioer'],
];
for (const [slug, name] of NO_NEW) {
  const dir = path.join(BASE, 'no', slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) continue;
  let html = noTemplate;
  html = html.replace(/for-restauranter/g, slug);
  html = html.replace(/Restauranter/g, name);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>WebAssist for ${name} — Oppdater Nettsiden Din via WhatsApp</title>`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}
console.log(`NO pages created: ${created - svBefore}`);

console.log(`\n✅ Total new pages created: ${created}`);
