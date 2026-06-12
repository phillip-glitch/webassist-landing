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
  // Blog EN (new)
  'https://dynamicmedia.dk/blog/how-much-does-website-management-cost/',
  'https://dynamicmedia.dk/blog/how-often-should-you-update-your-website/',
  'https://dynamicmedia.dk/blog/website-management-for-dental-practices/',
  'https://dynamicmedia.dk/blog/whatsapp-business-api-explained/',
  'https://dynamicmedia.dk/blog/best-cms-for-non-technical-users/',
  'https://dynamicmedia.dk/blog/update-opening-hours-website/',
  'https://dynamicmedia.dk/blog/website-management-tips-small-business/',
  'https://dynamicmedia.dk/blog/ai-tools-for-small-business-2026/',
  'https://dynamicmedia.dk/blog/no-code-website-tools/',
  'https://dynamicmedia.dk/blog/website-seo-without-developer/',
  'https://dynamicmedia.dk/blog/website-management-for-law-firms/',
  'https://dynamicmedia.dk/blog/local-business-website-tips/',
  'https://dynamicmedia.dk/blog/website-management-beauty-salon/',
  'https://dynamicmedia.dk/blog/digital-transformation-small-business/',
  'https://dynamicmedia.dk/blog/website-management-real-estate/',
  'https://dynamicmedia.dk/blog/whatsapp-marketing-for-small-business/',
  'https://dynamicmedia.dk/blog/how-to-manage-multiple-websites/',
  'https://dynamicmedia.dk/blog/website-mistakes-small-business/',
  'https://dynamicmedia.dk/blog/chatbot-vs-whatsapp-assistant/',
  'https://dynamicmedia.dk/blog/website-update-checklist/',
  'https://dynamicmedia.dk/blog/website-management-for-gyms/',
  'https://dynamicmedia.dk/blog/update-website-from-phone/',
  'https://dynamicmedia.dk/blog/website-management-for-consultants/',
  'https://dynamicmedia.dk/blog/website-management-for-hotels/',
  'https://dynamicmedia.dk/blog/seo-content-updates-importance/',
  'https://dynamicmedia.dk/blog/website-management-for-freelancers/',
  'https://dynamicmedia.dk/blog/how-to-change-website-prices/',
  'https://dynamicmedia.dk/blog/website-management-healthcare/',
  'https://dynamicmedia.dk/blog/small-business-website-content-strategy/',
  'https://dynamicmedia.dk/blog/website-management-ecommerce/',
  // Blog DA (new)
  'https://dynamicmedia.dk/blog/hvad-koster-en-webudvikler/',
  'https://dynamicmedia.dk/blog/lokal-seo-guide-for-smavirksomheder/',
  'https://dynamicmedia.dk/blog/google-min-virksomhed-guide/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-restauranter-guide/',
  'https://dynamicmedia.dk/blog/whatsapp-business-guide-dansk/',
  'https://dynamicmedia.dk/blog/bedste-hjemmeside-vaerktoejer-2026/',
  'https://dynamicmedia.dk/blog/hjemmeside-fejl-smavirksomheder/',
  'https://dynamicmedia.dk/blog/opdater-aabent-tid-hjemmeside/',
  'https://dynamicmedia.dk/blog/ai-vaerktoejer-virksomheder-2026/',
  'https://dynamicmedia.dk/blog/digital-markedsforing-smavirksomheder/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-klinikker-guide/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-ejendomsmaglere-guide/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-advokater-guide/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-konsulenter-guide/',
  'https://dynamicmedia.dk/blog/hjemmeside-priser-sammenligning-2026/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-frisorer-guide/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-tandlaeger-guide/',
  'https://dynamicmedia.dk/blog/hvornaar-opdatere-hjemmeside/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-hotels-guide/',
  'https://dynamicmedia.dk/blog/webassist-vs-one-com/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-fitnesscenter/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-freelancere-guide/',
  'https://dynamicmedia.dk/blog/seo-for-smavirksomheder-guide/',
  'https://dynamicmedia.dk/blog/ingen-cms-fordele/',
  'https://dynamicmedia.dk/blog/whatsapp-til-kundeservice/',
  'https://dynamicmedia.dk/blog/opdater-hjemmeside-priser-guide/',
  'https://dynamicmedia.dk/blog/hjemmeside-til-lokale-virksomheder/',
  'https://dynamicmedia.dk/blog/ai-fremtiden-for-hjemmesider/',
  'https://dynamicmedia.dk/blog/hjemmeside-administration-guide/',
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
