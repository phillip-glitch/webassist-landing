module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const auth = req.headers['authorization'] || '';
  if (auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const base = `${process.env.SUPABASE_URL}/rest/v1`;
  const headers = {
    'apikey': process.env.SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
  };

  try {
    const [contactsRes, bookingsRes, pageviewsRes] = await Promise.all([
      fetch(`${base}/webassist_contacts?select=*&order=created_at.desc`, { headers }),
      fetch(`${base}/webassist_bookings?select=*&order=created_at.desc`, { headers }),
      fetch(`${base}/webassist_pageviews?select=*&order=created_at.desc&limit=10000`, { headers }),
    ]);

    const contacts = await contactsRes.json();
    const bookings = await bookingsRes.json();
    const pageviews = await pageviewsRes.json();

    return res.status(200).json({ contacts, bookings, pageviews });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
};
