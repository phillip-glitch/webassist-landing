const nodemailer = require('nodemailer');

// Detect base language from locale string (e.g. "da-DK" → "da")
function detectLang(raw) {
  if (!raw) return 'en';
  const base = raw.toLowerCase().split('-')[0];
  const supported = ['da', 'sv', 'no', 'nl', 'de', 'es', 'uk', 'pl'];
  return supported.includes(base) ? base : 'en';
}

const confirmationStrings = {
  en: {
    subject: 'We received your message — WebAssist',
    greeting: (name) => `Thanks for reaching out, ${name}!`,
    body: `We've received your message and will get back to you <strong>within 24 hours</strong>.`,
    messageLabel: 'Your message',
    noMessage: '(no message)',
    closing: 'In the meantime, feel free to explore what WebAssist can do for your business.',
    team: '— The WebAssist Team',
    footer2: 'Reply to this email if you have any questions.',
  },
  da: {
    subject: 'Vi har modtaget din besked — WebAssist',
    greeting: (name) => `Tak for din henvendelse, ${name}!`,
    body: `Vi har modtaget din besked og vender tilbage <strong>inden for 24 timer</strong>.`,
    messageLabel: 'Din besked',
    noMessage: '(ingen besked)',
    closing: 'I mellemtiden er du velkommen til at udforske, hvad WebAssist kan gøre for din virksomhed.',
    team: '— WebAssist-teamet',
    footer2: 'Svar på denne e-mail, hvis du har spørgsmål.',
  },
  sv: {
    subject: 'Vi har tagit emot ditt meddelande — WebAssist',
    greeting: (name) => `Tack för att du hörde av dig, ${name}!`,
    body: `Vi har tagit emot ditt meddelande och återkommer <strong>inom 24 timmar</strong>.`,
    messageLabel: 'Ditt meddelande',
    noMessage: '(inget meddelande)',
    closing: 'Under tiden är du välkommen att utforska vad WebAssist kan göra för ditt företag.',
    team: '— WebAssist-teamet',
    footer2: 'Svara på detta e-postmeddelande om du har frågor.',
  },
  no: {
    subject: 'Vi har mottatt meldingen din — WebAssist',
    greeting: (name) => `Takk for at du tok kontakt, ${name}!`,
    body: `Vi har mottatt meldingen din og kommer tilbake til deg <strong>innen 24 timer</strong>.`,
    messageLabel: 'Din melding',
    noMessage: '(ingen melding)',
    closing: 'I mellomtiden er du velkommen til å utforske hva WebAssist kan gjøre for virksomheten din.',
    team: '— WebAssist-teamet',
    footer2: 'Svar på denne e-posten hvis du har spørsmål.',
  },
  nl: {
    subject: 'We hebben uw bericht ontvangen — WebAssist',
    greeting: (name) => `Bedankt voor uw bericht, ${name}!`,
    body: `We hebben uw bericht ontvangen en reageren <strong>binnen 24 uur</strong>.`,
    messageLabel: 'Uw bericht',
    noMessage: '(geen bericht)',
    closing: 'In de tussentijd kunt u gerust verkennen wat WebAssist voor uw bedrijf kan doen.',
    team: '— Het WebAssist-team',
    footer2: 'Beantwoord deze e-mail als u vragen heeft.',
  },
  de: {
    subject: 'Ihre Nachricht ist eingegangen — WebAssist',
    greeting: (name) => `Vielen Dank für Ihre Nachricht, ${name}!`,
    body: `Wir haben Ihre Nachricht erhalten und melden uns <strong>innerhalb von 24 Stunden</strong>.`,
    messageLabel: 'Ihre Nachricht',
    noMessage: '(keine Nachricht)',
    closing: 'In der Zwischenzeit erkunden Sie gerne, was WebAssist für Ihr Unternehmen tun kann.',
    team: '— Das WebAssist-Team',
    footer2: 'Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.',
  },
  es: {
    subject: 'Hemos recibido tu mensaje — WebAssist',
    greeting: (name) => `¡Gracias por escribirnos, ${name}!`,
    body: `Hemos recibido tu mensaje y te responderemos <strong>en 24 horas</strong>.`,
    messageLabel: 'Tu mensaje',
    noMessage: '(sin mensaje)',
    closing: 'Mientras tanto, no dudes en explorar lo que WebAssist puede hacer por tu negocio.',
    team: '— El equipo de WebAssist',
    footer2: 'Responde a este email si tienes alguna pregunta.',
  },
  uk: {
    subject: 'Ми отримали ваше повідомлення — WebAssist',
    greeting: (name) => `Дякуємо за звернення, ${name}!`,
    body: `Ми отримали ваше повідомлення і відповімо <strong>протягом 24 годин</strong>.`,
    messageLabel: 'Ваше повідомлення',
    noMessage: '(немає повідомлення)',
    closing: 'Поки що радимо вам ознайомитися з тим, що WebAssist може зробити для вашого бізнесу.',
    team: '— Команда WebAssist',
    footer2: 'Відповідайте на цей лист, якщо у вас є запитання.',
  },
  pl: {
    subject: 'Otrzymaliśmy Twoją wiadomość — WebAssist',
    greeting: (name) => `Dziękujemy za kontakt, ${name}!`,
    body: `Otrzymaliśmy Twoją wiadomość i odpiszemy <strong>w ciągu 24 godzin</strong>.`,
    messageLabel: 'Twoja wiadomość',
    noMessage: '(brak wiadomości)',
    closing: 'W międzyczasie zapraszamy do odkrycia, co WebAssist może zrobić dla Twojej firmy.',
    team: '— Zespół WebAssist',
    footer2: 'Odpowiedz na tego e-maila, jeśli masz pytania.',
  },
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message, lang } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const langCode = detectLang(lang);
  const s = confirmationStrings[langCode] || confirmationStrings.en;

  // Save to Supabase
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/webassist_contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, email, message }),
    });
  } catch (err) {
    console.error('Supabase save error:', err);
  }

  // Send email
  try {
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
      <h2>New Contact Form Submission — WebAssist</h2>
      <table style="font-family:sans-serif;font-size:15px;line-height:1.6">
        <tr><td style="padding:4px 12px 4px 0;color:#888">Name</td><td><strong>${name}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888">Message</td><td>${message || '—'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888">Lang</td><td>${lang || '—'}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"WebAssist" <${process.env.FASTMAIL_USER}>`,
      to: 'phillip@dynamicmedia.dk',
      replyTo: email,
      subject: `Contact: ${name}`,
      html,
    });

    // Confirmation email to customer in their language
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;">
              <!-- Header -->
              <tr>
                <td style="background:#25D366;padding:32px 40px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">WebAssist</h1>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">AI-powered WhatsApp Assistant</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:22px;">${s.greeting(name)}</h2>
                  <p style="margin:0 0 24px;color:#555555;font-size:16px;line-height:1.6;">
                    ${s.body}
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fffe;border:1px solid #e0f5ec;border-radius:8px;margin-bottom:28px;">
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0;color:#25D366;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${s.messageLabel}</p>
                        <p style="margin:8px 0 0;color:#333333;font-size:15px;line-height:1.5;">${message || s.noMessage}</p>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 8px;color:#555555;font-size:15px;line-height:1.6;">${s.closing}</p>
                  <p style="margin:0;color:#555555;font-size:15px;line-height:1.6;">${s.team}</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #eeeeee;">
                  <p style="margin:0;color:#aaaaaa;font-size:12px;">WebAssist · sara@dynamicmedia.dk</p>
                  <p style="margin:4px 0 0;color:#aaaaaa;font-size:12px;">${s.footer2}</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"WebAssist" <${process.env.FASTMAIL_USER}>`,
      to: email,
      replyTo: 'phillip@dynamicmedia.dk',
      subject: s.subject,
      html: confirmationHtml,
    });
  } catch (err) {
    console.error('Email error:', err);
  }

  return res.status(200).json({ ok: true });
};
