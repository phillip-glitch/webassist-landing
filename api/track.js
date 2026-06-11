module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const body = req.body || {};

  // Get real IP from Vercel headers
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || null;

  // Geo lookup via ip-api.com (free, no key needed, 45 req/min)
  let country = null, city = null;
  try {
    if (ip && ip !== '127.0.0.1' && ip !== '::1') {
      const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,status`);
      const geoData = await geo.json();
      if (geoData.status === 'success') {
        country = geoData.country || null;
        city = geoData.city || null;
      }
    }
  } catch (err) {
    // geo lookup optional
  }

  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/webassist_pageviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        page: body.page || '/',
        referrer: body.referrer || null,
        lang: body.lang || null,
        device: body.device || null,
        browser: body.browser || null,
        os: body.os || null,
        screen: body.screen || null,
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        session_id: body.session_id || null,
        country,
        city,
        ip,
      }),
    });
  } catch (err) {
    console.error('Track error:', err);
  }

  return res.status(200).end();
};
