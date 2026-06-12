#!/usr/bin/env node
// IndexNow — submit alle sider til Bing/Yandex efter deploy
// Kør med: node indexnow.js

const key = '7f6881a77ec38193bbcbce11e325d79a';
const host = 'dynamicmedia.dk';
const keyLocation = `https://${host}/${key}.txt`;

const urls = [
  'https://dynamicmedia.dk/',
  'https://dynamicmedia.dk/da/',
  'https://dynamicmedia.dk/en/',
  'https://dynamicmedia.dk/de/',
  'https://dynamicmedia.dk/es/',
  'https://dynamicmedia.dk/sv/',
  'https://dynamicmedia.dk/no/',
  'https://dynamicmedia.dk/nl/',
  'https://dynamicmedia.dk/uk/',
  'https://dynamicmedia.dk/pl/',
  // DA niche
  'https://dynamicmedia.dk/da/for-restauranter/',
  'https://dynamicmedia.dk/da/for-ejendomsmaglere/',
  'https://dynamicmedia.dk/da/for-klinikker/',
  'https://dynamicmedia.dk/da/for-konsulenter/',
  'https://dynamicmedia.dk/da/for-advokater/',
  'https://dynamicmedia.dk/da/for-lokale-virksomheder/',
  'https://dynamicmedia.dk/da/for-tandlaeger/',
  'https://dynamicmedia.dk/da/for-frisorer/',
  'https://dynamicmedia.dk/da/for-hotels/',
  'https://dynamicmedia.dk/da/alternativ-til-webudvikler/',
  'https://dynamicmedia.dk/da/webassist-vs-wordpress/',
  // EN niche
  'https://dynamicmedia.dk/en/for-restaurants/',
  'https://dynamicmedia.dk/en/for-real-estate/',
  'https://dynamicmedia.dk/en/for-clinics/',
  'https://dynamicmedia.dk/en/for-consultants/',
  'https://dynamicmedia.dk/en/for-law-firms/',
  'https://dynamicmedia.dk/en/for-local-businesses/',
  'https://dynamicmedia.dk/en/for-dentists/',
  'https://dynamicmedia.dk/en/for-beauty-salons/',
  'https://dynamicmedia.dk/en/for-hotels/',
  'https://dynamicmedia.dk/en/for-freelancers/',
  'https://dynamicmedia.dk/en/for-gyms/',
  'https://dynamicmedia.dk/en/alternative-to-web-developer/',
  'https://dynamicmedia.dk/en/website-management-for-small-business/',
  'https://dynamicmedia.dk/en/webassist-vs-wordpress/',
  'https://dynamicmedia.dk/en/webassist-vs-wix/',
  'https://dynamicmedia.dk/en/webassist-vs-squarespace/',
  // DE niche
  'https://dynamicmedia.dk/de/fuer-restaurants/',
  'https://dynamicmedia.dk/de/fuer-immobilienmakler/',
  'https://dynamicmedia.dk/de/fuer-kliniken/',
  'https://dynamicmedia.dk/de/fuer-berater/',
  'https://dynamicmedia.dk/de/fuer-kanzleien/',
  'https://dynamicmedia.dk/de/fuer-lokale-unternehmen/',
  'https://dynamicmedia.dk/de/fuer-zahnarztpraxen/',
  'https://dynamicmedia.dk/de/fuer-hotels/',
  // ES niche
  'https://dynamicmedia.dk/es/para-restaurantes/',
  'https://dynamicmedia.dk/es/para-inmobiliarias/',
  'https://dynamicmedia.dk/es/para-clinicas/',
  'https://dynamicmedia.dk/es/para-consultores/',
  'https://dynamicmedia.dk/es/para-abogados/',
  'https://dynamicmedia.dk/es/para-negocios-locales/',
  // SV niche
  'https://dynamicmedia.dk/sv/for-restauranger/',
  'https://dynamicmedia.dk/sv/for-fastighetsmaklare/',
  'https://dynamicmedia.dk/sv/for-kliniker/',
  'https://dynamicmedia.dk/sv/for-konsulter/',
  // NO niche
  'https://dynamicmedia.dk/no/for-restauranter/',
  'https://dynamicmedia.dk/no/for-eiendomsmeglere/',
  'https://dynamicmedia.dk/no/for-klinikker/',
  'https://dynamicmedia.dk/no/for-konsulenter/',
  // NL niche
  'https://dynamicmedia.dk/nl/voor-restaurants/',
  'https://dynamicmedia.dk/nl/voor-makelaars/',
  'https://dynamicmedia.dk/nl/voor-klinieken/',
  // UK niche
  'https://dynamicmedia.dk/uk/dlya-restoraniv/',
  'https://dynamicmedia.dk/uk/dlya-klinik/',
  'https://dynamicmedia.dk/uk/dlya-konsultantiv/',
  'https://dynamicmedia.dk/uk/dlya-neruhomosti/',
  // PL niche
  'https://dynamicmedia.dk/pl/dla-restauracji/',
  'https://dynamicmedia.dk/pl/dla-klinik/',
  'https://dynamicmedia.dk/pl/dla-konsultantow/',
  'https://dynamicmedia.dk/pl/dla-nieruchomosci/',
  'https://dynamicmedia.dk/pl/dla-lokalnych-firm/',
  // Blog
  'https://dynamicmedia.dk/blog/',
  'https://dynamicmedia.dk/blog/opdater-hjemmeside-whatsapp/',
  'https://dynamicmedia.dk/blog/alternativ-til-webudvikler/',
  'https://dynamicmedia.dk/blog/administrer-hjemmeside-mobil/',
  'https://dynamicmedia.dk/blog/ai-hjemmeside-management/',
  'https://dynamicmedia.dk/blog/whatsapp-til-virksomheder/',
  'https://dynamicmedia.dk/blog/update-website-without-developer/',
  'https://dynamicmedia.dk/blog/whatsapp-business-website-management/',
  'https://dynamicmedia.dk/blog/ai-website-assistant-small-business/',
  'https://dynamicmedia.dk/blog/restaurant-website-management/',
  'https://dynamicmedia.dk/blog/webseite-aktualisieren-whatsapp/',
  'https://dynamicmedia.dk/blog/ki-website-assistent/',
  'https://dynamicmedia.dk/blog/actualizar-web-whatsapp/',
  'https://dynamicmedia.dk/blog/gestion-web-whatsapp/',
  'https://dynamicmedia.dk/blog/aktualizacja-strony-whatsapp/',
  'https://dynamicmedia.dk/blog/uppdatera-hemsida-whatsapp/',
  'https://dynamicmedia.dk/blog/oppdater-nettside-whatsapp/',
  'https://dynamicmedia.dk/blog/onovlennya-saitu-whatsapp/',
  'https://dynamicmedia.dk/demo/',
];

async function submitIndexNow() {
  const body = JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: urls,
  });

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });

  if (res.ok || res.status === 202) {
    console.log(`✅ IndexNow accepted ${urls.length} URLs (status: ${res.status})`);
  } else {
    const text = await res.text();
    console.error(`❌ IndexNow error: ${res.status} — ${text}`);
  }
}

submitIndexNow().catch(console.error);
