#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const BASE = __dirname;
const BLOG = path.join(BASE, 'blog');
let created = 0;

function makeBlog(slug, lang, title, desc, keywords, tag, readTime, body) {
  const dir = path.join(BLOG, slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) return;
  const locale = lang === 'da' ? 'da_DK' : 'en_US';
  const home = lang === 'da' ? '/da/' : '/en/';
  const url = `https://dynamicmedia.dk/blog/${slug}/`;
  const ctaBtn = lang === 'da' ? 'Book gratis demo' : 'Book free demo';
  const ctaTitle = lang === 'da' ? 'Se WebAssist i aktion' : 'See WebAssist in action';
  const ctaText = lang === 'da' ? 'Book en gratis 30-minutters demo.' : 'Book a free 30-minute demo.';
  const backLabel = lang === 'da' ? '&#8592; Tilbage til blog' : '&#8592; Back to blog';
  const readLabel = lang === 'da' ? `&#9203; ${readTime} læsetid` : `&#9203; ${readTime} read`;
  const navHow = lang === 'da' ? 'Sådan virker det' : 'How it works';
  const navPr = lang === 'da' ? 'Priser' : 'Pricing';
  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${title}</title><meta name="description" content="${desc}"><meta name="keywords" content="${keywords}"><meta name="robots" content="index,follow"><meta name="author" content="Phillip Bjerg"><link rel="canonical" href="${url}"><meta property="og:type" content="article"><meta property="og:url" content="${url}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:image" content="https://dynamicmedia.dk/og-image.png"><meta property="og:locale" content="${locale}"><meta property="article:published_time" content="2026-06-14"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${desc}"><meta name="theme-color" content="#25D366"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title.replace(/"/g,'\\"')}","description":"${desc.replace(/"/g,'\\"')}","url":"${url}","datePublished":"2026-06-14","author":{"@type":"Person","name":"Phillip Bjerg"},"publisher":{"@type":"Organization","name":"WebAssist"},"inLanguage":"${lang}"}</script><style>*{box-sizing:border-box;margin:0;padding:0}:root{--wa:#25D366;--text:#0f172a;--muted:#475569;--subtle:#64748b}body{font-family:Inter,-apple-system,sans-serif;color:var(--text);line-height:1.6}nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.9);backdrop-filter:blur(20px);border-bottom:1px solid #e5e7eb}.ni{max-width:1200px;margin:0 auto;padding:0 24px;height:68px;display:flex;align-items:center;justify-content:space-between}.nl{display:flex;align-items:center;gap:10px;text-decoration:none}.nli{width:36px;height:36px;background:var(--wa);border-radius:10px;display:flex;align-items:center;justify-content:center}.nln{font-size:17px;font-weight:800;color:var(--text)}.nk{display:flex;gap:32px}.nk a{font-size:14px;font-weight:500;color:var(--muted);text-decoration:none}.bc{font-size:14px;font-weight:700;color:#000;background:var(--wa);border:none;border-radius:50px;padding:9px 20px;cursor:pointer}.hero{background:linear-gradient(135deg,#f0fdf4,#fff);padding:80px 24px 60px;border-bottom:1px solid #e2e8f0}.hi{max-width:740px;margin:0 auto}.tg{background:rgba(37,211,102,.1);color:#16a34a;font-weight:600;padding:4px 12px;border-radius:50px;font-size:12px;display:inline-block;margin-bottom:16px}.hero h1{font-size:clamp(28px,4vw,44px);font-weight:900;line-height:1.15;letter-spacing:-1px;margin-bottom:20px}.hero p{font-size:18px;color:var(--muted);max-width:680px}.bk{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#16a34a;text-decoration:none;font-weight:600;margin-bottom:24px}article{max-width:740px;margin:0 auto;padding:60px 24px}article h2{font-size:26px;font-weight:800;margin:48px 0 16px;letter-spacing:-.5px}article p{font-size:16px;color:#334155;line-height:1.8;margin-bottom:20px}article ul{margin:16px 0 24px 24px}article li{font-size:16px;color:#334155;line-height:1.7;margin-bottom:8px}.cb{background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid rgba(37,211,102,.25);border-radius:24px;padding:40px;text-align:center;margin:48px 0}.cb h3{font-size:22px;font-weight:800;margin-bottom:12px}.cb p{color:var(--muted);margin-bottom:24px}.bp{font-size:16px;font-weight:700;color:#000;background:var(--wa);border:none;border-radius:50px;padding:16px 32px;cursor:pointer;text-decoration:none;display:inline-block}footer{background:#f8fafc;border-top:1px solid #e2e8f0;padding:32px 24px;text-align:center;font-size:13px;color:var(--subtle)}@media(max-width:768px){.nk{display:none}}</style></head><body><nav><div class="ni"><a href="${home}" class="nl"><div class="nli"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" width="20" height="20"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.38A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg></div><div class="nln">WebAssist</div></a><div class="nk"><a href="${home}#solution">${navHow}</a><a href="${home}#pricing">${navPr}</a><a href="/blog/">Blog</a></div><button onclick="location.href='${home}'" class="bc">${ctaBtn}</button></div></nav><div class="hero"><div class="hi"><a href="/blog/" class="bk">${backLabel}</a><div style="display:flex;gap:16px;margin-bottom:20px;font-size:13px;color:#64748b"><span class="tg">${tag}</span><span>2026-06-14</span><span>${readLabel}</span></div><h1>${title}</h1><p>${desc}</p></div></div><article>${body}<div class="cb"><h3>${ctaTitle}</h3><p>${ctaText}</p><a href="${home}" class="bp">${ctaBtn}</a></div></article><footer>&copy; 2026 WebAssist — Dynamic Media. All rights reserved.</footer></body></html>`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}

// ─── Blog type 8: Online Booking Guide ───
const EN_NICHES = ['accountants','architects','bakeries','beauty-salons','builders','cafes','cleaning-companies','clinics','coaches','consultants','dentists','driving-schools','electricians','event-planners','freelancers','gyms','hair-salons','hairdressers','hotels','landscapers','law-firms','local-businesses','music-schools','musicians','painters','personal-trainers','photographers','physiotherapists','plumbers','real-estate','restaurants','sports-clubs','tattoo-studios','travel-agencies','veterinarians','yoga-studios'];
const EN_NAMES = {'accountants':'Accountants','architects':'Architects','bakeries':'Bakeries','beauty-salons':'Beauty Salons','builders':'Builders','cafes':'Cafés','cleaning-companies':'Cleaning Companies','clinics':'Clinics','coaches':'Coaches','consultants':'Consultants','dentists':'Dentists','driving-schools':'Driving Schools','electricians':'Electricians','event-planners':'Event Planners','freelancers':'Freelancers','gyms':'Gyms','hair-salons':'Hair Salons','hairdressers':'Hairdressers','hotels':'Hotels','landscapers':'Landscapers','law-firms':'Law Firms','local-businesses':'Local Businesses','music-schools':'Music Schools','musicians':'Musicians','painters':'Painters','personal-trainers':'Personal Trainers','photographers':'Photographers','physiotherapists':'Physiotherapists','plumbers':'Plumbers','real-estate':'Real Estate Agents','restaurants':'Restaurants','sports-clubs':'Sports Clubs','tattoo-studios':'Tattoo Studios','travel-agencies':'Travel Agencies','veterinarians':'Veterinarians','yoga-studios':'Yoga Studios'};

for (const slug of EN_NICHES) {
  const n = EN_NAMES[slug];
  makeBlog(`online-booking-for-${slug}`, 'en',
    `Online Booking for ${n}: How to Get More Appointments`,
    `Set up online booking for your ${n.toLowerCase()} business. Reduce no-shows, save time on phone calls, and let customers book 24/7.`,
    `online booking ${slug}, ${slug} appointment system, ${slug} booking`,
    'Booking', '6 min',
    `<h2>Why ${n} Need Online Booking in 2026</h2><p>Every phone call to book an appointment takes 3-5 minutes of your time. Multiply that by 20 calls a day, and you're spending hours just scheduling. Online booking eliminates this entirely — customers book when it suits them, even at 2 AM.</p><h2>The No-Show Problem</h2><p>No-shows cost ${n.toLowerCase()} thousands per year. Online booking with automated reminders via WhatsApp or SMS reduces no-shows by up to 40%. When customers book themselves, they're more committed to showing up.</p><h2>What to Look for in a Booking System</h2><ul><li>Mobile-friendly — most bookings happen on phones</li><li>Automated confirmations and reminders</li><li>Calendar sync (Google Calendar, Outlook)</li><li>Easy rescheduling and cancellation</li><li>No login required for customers</li></ul><h2>The Simplest Approach: WhatsApp Booking</h2><p>Before investing in complex booking software, consider this: a WhatsApp link on your website lets customers message you directly to book. It's personal, it's instant, and it requires zero setup. Many successful ${n.toLowerCase()} use this approach.</p><h2>Keep Your Availability Updated</h2><p>Nothing frustrates customers more than booking a slot that turns out to be unavailable. With <a href="https://dynamicmedia.dk/en/" style="color:#16a34a;font-weight:600;">WebAssist</a>, update your availability on your website by sending a quick WhatsApp message. Your site always shows your current schedule.</p>`
  );

  makeBlog(`social-media-for-${slug}`, 'en',
    `Social Media for ${n}: What Actually Works in 2026`,
    `Practical social media guide for ${n.toLowerCase()}. Which platforms to use, what to post, and how to turn followers into paying customers.`,
    `social media ${slug}, ${slug} instagram, ${slug} social marketing`,
    'Social Media', '7 min',
    `<h2>The Truth About Social Media for ${n}</h2><p>You don't need millions of followers. You don't need to dance on TikTok. For ${n.toLowerCase()}, social media success is simple: show your work, be consistent, and make it easy for people to contact you. Here's what actually works.</p><h2>Choose Your Platform Wisely</h2><p>Instagram works for visual businesses like ${n.toLowerCase()}. Facebook is still powerful for local businesses and older demographics. Google Business Profile posts are underrated and directly impact your search ranking. Pick two platforms max and do them well.</p><h2>What to Post</h2><ul><li>Before/after photos and project showcases</li><li>Behind-the-scenes of your daily work</li><li>Customer testimonials and reviews</li><li>Tips and educational content</li><li>Team introductions and milestones</li><li>Special offers and seasonal promotions</li></ul><h2>The 80/20 Rule</h2><p>80% valuable content, 20% promotional. Nobody follows an account that only says "book now." Share tips, show your expertise, tell stories. The sales happen naturally when people trust you.</p><h2>From Followers to Customers</h2><p>Social media drives awareness, but your website converts. Make sure your bio links to your website, and make sure your website is current. <a href="https://dynamicmedia.dk/en/" style="color:#16a34a;font-weight:600;">WebAssist</a> keeps your website updated via WhatsApp — so when social media sends traffic your way, visitors see your latest work, prices, and availability.</p><h2>Consistency Beats Perfection</h2><p>3 decent posts per week beats 1 perfect post per month. Use your phone, keep it authentic, and don't overthink it. Your customers want to see real work, not polished ads.</p>`
  );
}

const DA_NICHES = [['advokater','Advokater'],['arkitekter','Arkitekter'],['bagerier','Bagerier'],['cafer','Caféer'],['coaches','Coaches'],['dyreklinikker','Dyreklinikker'],['ejendomsmaglere','Ejendomsmæglere'],['elektrikere','Elektrikere'],['eventplanlaeggere','Eventplanlæggere'],['fotografer','Fotografer'],['frisorer','Frisører'],['fysioterapeuter','Fysioterapeuter'],['gartneri','Gartnere'],['hotels','Hoteller'],['klinikker','Klinikker'],['konsulenter','Konsulenter'],['korekole','Køreskoler'],['lokale-virksomheder','Lokale virksomheder'],['maler','Malere'],['murer','Murere'],['musikere','Musikere'],['musikskoler','Musikskoler'],['personlige-traenere','Personlige trænere'],['pizzeriaer','Pizzeriaer'],['rengoeringsfirmaer','Rengøringsfirmaer'],['restauranter','Restauranter'],['revisorer','Revisorer'],['sportsklubber','Sportsklubber'],['tandlaeger','Tandlæger'],['tatoverer','Tatovører'],['yogastudie','Yogastudier'],['VVS','VVS-firmaer']];

for (const [slug, name] of DA_NICHES) {
  makeBlog(`online-booking-til-${slug}`, 'da',
    `Online Booking til ${name}: Få Flere Aftaler Automatisk`,
    `Opsæt online booking for din ${name.toLowerCase()}-virksomhed. Reducer udeblivelser, spar tid på telefonopkald og lad kunder booke 24/7.`,
    `online booking ${slug}, ${slug} bookingsystem, ${slug} aftaler`,
    'Booking', '6 min',
    `<h2>Hvorfor ${name} Har Brug for Online Booking i 2026</h2><p>Hvert telefonopkald for at booke en aftale tager 3-5 minutter. Gang det med 20 opkald om dagen, og du bruger timer bare på planlægning. Online booking fjerner dette helt — kunder booker når det passer dem, selv kl. 2 om natten.</p><h2>Udeblivelsesproblemet</h2><p>Udeblivelser koster ${name.toLowerCase()} tusindvis af kroner årligt. Online booking med automatiske påmindelser via WhatsApp reducerer udeblivelser med op til 40%.</p><h2>Den Simpleste Tilgang: WhatsApp Booking</h2><p>Før du investerer i komplekst bookingsoftware: et WhatsApp-link på din hjemmeside lader kunder skrive direkte til dig for at booke. Det er personligt, øjeblikkeligt og kræver nul opsætning.</p><h2>Hold Din Tilgængelighed Opdateret</h2><p>Med <a href="https://dynamicmedia.dk/da/" style="color:#16a34a;font-weight:600;">WebAssist</a> opdaterer du din tilgængelighed ved at sende en WhatsApp-besked. Dit site viser altid din aktuelle kalender.</p>`
  );

  makeBlog(`sociale-medier-for-${slug}`, 'da',
    `Sociale Medier for ${name}: Hvad Der Virker i 2026`,
    `Praktisk guide til sociale medier for ${name.toLowerCase()}. Hvilke platforme, hvad du skal poste, og hvordan du konverterer følgere til kunder.`,
    `sociale medier ${slug}, ${slug} instagram, ${slug} social marketing`,
    'Sociale Medier', '7 min',
    `<h2>Sandheden Om Sociale Medier for ${name}</h2><p>Du behøver ikke millioner af følgere. For ${name.toLowerCase()} er succes på sociale medier simpelt: vis dit arbejde, vær konsekvent, og gør det nemt at kontakte dig.</p><h2>Vælg Din Platform</h2><p>Instagram virker for visuelle virksomheder. Facebook er stadig stærk for lokale virksomheder. Google Virksomhedsprofil-opslag er undervurderede og påvirker din søgerangering direkte. Vælg max to platforme.</p><h2>Hvad Skal Du Poste?</h2><ul><li>Før/efter-billeder og projektvisninger</li><li>Bag-kulisserne fra din hverdag</li><li>Kundeudtalelser og anmeldelser</li><li>Tips og uddannelsesindhold</li><li>Særtilbud og sæsonkampagner</li></ul><h2>Fra Følgere til Kunder</h2><p>Sociale medier skaber opmærksomhed, men din hjemmeside konverterer. Sørg for at din hjemmeside er opdateret. <a href="https://dynamicmedia.dk/da/" style="color:#16a34a;font-weight:600;">WebAssist</a> holder din hjemmeside opdateret via WhatsApp.</p><h2>Konsistens Slår Perfektion</h2><p>3 fine opslag om ugen slår 1 perfekt opslag om måneden. Brug din telefon, hold det autentisk, og overtænk det ikke.</p>`
  );
}
const blogCount = created;
console.log(`Blog articles: ${blogCount}`);

// ─── NL NICHE PAGES ───
const nlTemplate = fs.readFileSync(path.join(BASE, 'nl/voor-restaurants/index.html'), 'utf8');
const NL_NEW = [
  ['voor-architecten','Architecten'],['voor-bakkerijen','Bakkerijen'],['voor-cafes','Cafés'],
  ['voor-coaches','Coaches'],['voor-consultants','Consultants'],['voor-elektriciens','Elektriciens'],
  ['voor-evenementplanners','Evenementplanners'],['voor-fotografen','Fotografen'],
  ['voor-freelancers','Freelancers'],['voor-fysiotherapeuten','Fysiotherapeuten'],
  ['voor-hotels','Hotels'],['voor-hoveniers','Hoveniers'],['voor-kappers','Kappers'],
  ['voor-muziekscholen','Muziekscholen'],['voor-muzikanten','Muzikanten'],
  ['voor-personal-trainers','Personal Trainers'],['voor-schilders','Schilders'],
  ['voor-schoonmaakbedrijven','Schoonmaakbedrijven'],['voor-sportclubs','Sportclubs'],
  ['voor-tandartsen','Tandartsen'],['voor-tattooshops','Tattooshops'],
  ['voor-yogastudios','Yogastudio\'s'],
];
for (const [slug, name] of NL_NEW) {
  const dir = path.join(BASE, 'nl', slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) continue;
  let html = nlTemplate;
  html = html.replace(/voor-restaurants/g, slug);
  html = html.replace(/Restaurants/g, name);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>WebAssist voor ${name} — Update Je Website via WhatsApp</title>`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}
console.log(`NL pages: ${created - blogCount}`);
const nlCount = created;

// ─── UK NICHE PAGES ───
const ukTemplate = fs.readFileSync(path.join(BASE, 'uk/dlya-restoraniv/index.html'), 'utf8');
const UK_NEW = [
  ['dlya-arkhitektoriv','Архітекторів'],['dlya-pekarень','Пекарень'],['dlya-kafe','Кафе'],
  ['dlya-koachiv','Коучів'],['dlya-stomatologiv','Стоматологів'],['dlya-elektrykiv','Електриків'],
  ['dlya-eventiv','Івент-агенцій'],['dlya-fotografiv','Фотографів'],
  ['dlya-frillanseriv','Фрілансерів'],['dlya-fitnes-klubiv','Фітнес-клубів'],
  ['dlya-goteliv','Готелів'],['dlya-perukariv','Перукарів'],
  ['dlya-maliariv','Малярів'],['dlya-muzykantiv','Музикантів'],
  ['dlya-santekhniky','Сантехніків'],['dlya-sportklubiov','Спортклубів'],
  ['dlya-tatustudiy','Тату-студій'],['dlya-treneriov','Тренерів'],
  ['dlya-turagyenciy','Турагенцій'],['dlya-veterynariv','Ветеринарів'],
  ['dlya-yogy','Йога-студій'],
];
for (const [slug, name] of UK_NEW) {
  const dir = path.join(BASE, 'uk', slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) continue;
  let html = ukTemplate;
  html = html.replace(/dlya-restoraniv/g, slug);
  html = html.replace(/Ресторанів/g, name);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>WebAssist для ${name} — Оновлюйте Сайт через WhatsApp</title>`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}
console.log(`UK pages: ${created - nlCount}`);
const ukCount = created;

// ─── PL NICHE PAGES ───
const plTemplate = fs.readFileSync(path.join(BASE, 'pl/dla-restauracji/index.html'), 'utf8');
const PL_NEW = [
  ['dla-architektow','Architektów'],['dla-cukierni','Cukierni'],['dla-dentystow','Dentystów'],
  ['dla-elektrykow','Elektryków'],['dla-event-plannerow','Event Plannerów'],
  ['dla-fizjoterapeutow','Fizjoterapeutów'],['dla-fotografow','Fotografów'],
  ['dla-fryzjerow','Fryzjerów'],['dla-freelancerow','Freelancerów'],
  ['dla-hoteli','Hoteli'],['dla-malarz','Malarzy'],['dla-muzykow','Muzyków'],
  ['dla-ogrodnikow','Ogrodników'],['dla-personal-trenerow','Personal Trenerów'],
  ['dla-salonu-urody','Salonów Urody'],['dla-silowni','Siłowni'],
  ['dla-sportowych-klubow','Klubów Sportowych'],['dla-studia-tatuazu','Studiów Tatuażu'],
  ['dla-studia-jogi','Studiów Jogi'],['dla-weterynarz','Weterynarzy'],
];
for (const [slug, name] of PL_NEW) {
  const dir = path.join(BASE, 'pl', slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) continue;
  let html = plTemplate;
  html = html.replace(/dla-restauracji/g, slug);
  html = html.replace(/Restauracji/g, name);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>WebAssist dla ${name} — Aktualizuj Stronę przez WhatsApp</title>`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  created++;
}
console.log(`PL pages: ${created - ukCount}`);

console.log(`\n✅ Total new pages: ${created}`);
