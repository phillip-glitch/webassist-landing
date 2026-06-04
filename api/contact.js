const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, website, plan, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.FASTMAIL_USER,
      pass: process.env.FASTMAIL_PASS,
    },
  });

  const html = `
    <h2>New Demo Request — WebAssist</h2>
    <table style="font-family:sans-serif;font-size:15px;line-height:1.6">
      <tr><td style="padding:4px 12px 4px 0;color:#888">Name</td><td><strong>${name}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#888">Phone</td><td>${phone || '—'}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#888">Website</td><td>${website || '—'}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#888">Plan</td><td><strong>${plan || '—'}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#888">Message</td><td>${message || '—'}</td></tr>
    </table>
  `;

  try {
    await transporter.sendMail({
      from: `"WebAssist" <${process.env.FASTMAIL_USER}>`,
      to: 'phillip@dynamicmedia.dk',
      replyTo: email,
      subject: `Demo request: ${name} — ${plan || 'No plan selected'}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
