#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
const TEMPLATE = path.join(BASE_DIR, 'index.html');
const BASE_URL = 'https://dynamicmedia.dk';

const LANGS = {
  da: {
    title: 'WebAssist — Opdater Din Hjemmeside Via WhatsApp | AI-Drevet Hjemmesideassistent',
    desc: 'Send en WhatsApp-besked og din hjemmeside opdateres samme dag. Ingen webudvikler. Ingen tickets. Ingen tekniske færdigheder. Prøv gratis demo i dag.',
    og_locale: 'da_DK',
    og_title: 'WebAssist — Opdater Din Hjemmeside Via WhatsApp',
    og_desc: 'Send en WhatsApp-besked og din hjemmeside opdateres samme dag. Ingen webudvikler. Ingen møder.',
  },
  en: {
    title: 'WebAssist — Update Your Website Via WhatsApp | AI-Powered Website Assistant',
    desc: 'Send a WhatsApp message and your website gets updated the same day. No web developer. No tickets. No technical skills required. Try free demo today.',
    og_locale: 'en_US',
    og_title: 'WebAssist — Update Your Website Via WhatsApp',
    og_desc: 'Send a WhatsApp message and your website gets updated the same day. No web developer needed.',
  },
  de: {
    title: 'WebAssist — Webseite per WhatsApp aktualisieren | KI-Website-Assistent',
    desc: 'Senden Sie eine WhatsApp-Nachricht und Ihre Website wird noch am selben Tag aktualisiert. Kein Webentwickler. Keine Tickets. Keine technischen Kenntnisse erforderlich.',
    og_locale: 'de_DE',
    og_title: 'WebAssist — Webseite per WhatsApp aktualisieren',
    og_desc: 'Senden Sie eine WhatsApp-Nachricht und Ihre Website wird noch am selben Tag aktualisiert.',
  },
  es: {
    title: 'WebAssist — Actualiza tu Web por WhatsApp | Asistente Web con IA',
    desc: 'Envía un mensaje de WhatsApp y tu web se actualiza el mismo día. Sin desarrollador web. Sin tickets. Sin conocimientos técnicos. Prueba demo gratis.',
    og_locale: 'es_ES',
    og_title: 'WebAssist — Actualiza tu Web por WhatsApp',
    og_desc: 'Envía un mensaje de WhatsApp y tu web se actualiza el mismo día. Sin desarrollador web.',
  },
  sv: {
    title: 'WebAssist — Uppdatera din webbplats via WhatsApp | AI-driven webbassistent',
    desc: 'Skicka ett WhatsApp-meddelande och din webbplats uppdateras samma dag. Ingen webbutvecklare. Inga tickets. Inga tekniska kunskaper krävs.',
    og_locale: 'sv_SE',
    og_title: 'WebAssist — Uppdatera din webbplats via WhatsApp',
    og_desc: 'Skicka ett WhatsApp-meddelande och din webbplats uppdateras samma dag.',
  },
  no: {
    title: 'WebAssist — Oppdater nettstedet ditt via WhatsApp | AI-drevet nettstedassistent',
    desc: 'Send en WhatsApp-melding og nettstedet ditt oppdateres samme dag. Ingen webutvikler. Ingen billetter. Ingen tekniske ferdigheter kreves.',
    og_locale: 'nb_NO',
    og_title: 'WebAssist — Oppdater nettstedet ditt via WhatsApp',
    og_desc: 'Send en WhatsApp-melding og nettstedet ditt oppdateres samme dag.',
  },
  nl: {
    title: 'WebAssist — Update je website via WhatsApp | AI-aangedreven website-assistent',
    desc: 'Stuur een WhatsApp-bericht en uw website wordt dezelfde dag bijgewerkt. Geen webontwikkelaar. Geen tickets. Geen technische kennis vereist.',
    og_locale: 'nl_NL',
    og_title: 'WebAssist — Update je website via WhatsApp',
    og_desc: 'Stuur een WhatsApp-bericht en uw website wordt dezelfde dag bijgewerkt.',
  },
  uk: {
    title: 'WebAssist — Оновлюйте сайт через WhatsApp | ШІ-помічник для сайту',
    desc: 'Надішліть повідомлення у WhatsApp і ваш сайт буде оновлено того ж дня. Без веб-розробника. Без заявок. Без технічних навичок.',
    og_locale: 'uk_UA',
    og_title: 'WebAssist — Оновлюйте сайт через WhatsApp',
    og_desc: 'Надішліть повідомлення у WhatsApp і ваш сайт буде оновлено того ж дня.',
  },
  pl: {
    title: 'WebAssist — Aktualizuj stronę przez WhatsApp | Asystent strony internetowej AI',
    desc: 'Wyślij wiadomość WhatsApp, a Twoja strona zostanie zaktualizowana tego samego dnia. Bez programisty. Bez zgłoszeń. Bez wiedzy technicznej.',
    og_locale: 'pl_PL',
    og_title: 'WebAssist — Aktualizuj stronę przez WhatsApp',
    og_desc: 'Wyślij wiadomość WhatsApp, a Twoja strona zostanie zaktualizowana tego samego dnia.',
  },
};

const ALL_LANG_CODES = Object.keys(LANGS);

function buildHreflangBlock(currentLang) {
  const lines = [];
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/">`);
  for (const code of ALL_LANG_CODES) {
    lines.push(`  <link rel="alternate" hreflang="${code}" href="${BASE_URL}/${code}/">`);
  }
  return lines.join('\n');
}

function processTemplate(template, langCode, data) {
  let html = template;

  // 1. <html lang="XX">
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${langCode}"`);

  // 2. <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${data.title}</title>`);

  // 3. <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${data.desc}">`
  );

  // 4. <link rel="canonical">
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${BASE_URL}/${langCode}/">`
  );

  // 5. Replace entire hreflang block
  // Match from first hreflang link to last hreflang link (the whole block)
  html = html.replace(
    /(\s*<!-- HREFLANG[^>]*-->\n)([\s\S]*?)(\n\s*<!-- OPEN GRAPH)/,
    (match, before, block, after) => {
      return `${before}${buildHreflangBlock(langCode)}${after}`;
    }
  );

  // 6. OG tags
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${BASE_URL}/${langCode}/">`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${data.og_title}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${data.og_desc}">`
  );
  html = html.replace(
    /<meta property="og:locale" content="[^"]*">/,
    `<meta property="og:locale" content="${data.og_locale}">`
  );

  // 7. Insert <script>var defaultLang='XX';</script> just before translations.js
  html = html.replace(
    /<script src="\/translations\.js"><\/script>/,
    `<script>var defaultLang='${langCode}';</script>\n<script src="/translations.js"></script>`
  );

  return html;
}

// Main
const template = fs.readFileSync(TEMPLATE, 'utf8');
let created = 0;

for (const [langCode, data] of Object.entries(LANGS)) {
  const outDir = path.join(BASE_DIR, langCode);
  const outFile = path.join(outDir, 'index.html');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const output = processTemplate(template, langCode, data);
  fs.writeFileSync(outFile, output, 'utf8');
  console.log(`✓ ${langCode}/index.html`);
  created++;
}

console.log(`\nFærdig — ${created} sider genereret.`);
