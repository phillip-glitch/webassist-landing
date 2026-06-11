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
    subject: 'Your demo is booked — WebAssist',
    greeting: (name) => `Your demo is booked, ${name}!`,
    body: (plan) => `Thanks for your interest in the <strong style="color:#25D366;">${plan || 'WebAssist'}</strong> plan. We'll reach out to you <strong>within 24 hours</strong> to schedule a time that works for you.`,
    detailsLabel: 'Your booking details',
    planLabel: 'Plan',
    websiteLabel: 'Website',
    phoneLabel: 'Phone',
    messageLabel: 'Message',
    closing: 'We look forward to showing you how WebAssist can transform your customer communication.',
    team: '— The WebAssist Team',
    footer2: 'Reply to this email if you have any questions.',
  },
  da: {
    subject: 'Din demo er booket — WebAssist',
    greeting: (name) => `Din demo er booket, ${name}!`,
    body: (plan) => `Tak for din interesse i <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>-planen. Vi kontakter dig <strong>inden for 24 timer</strong> for at aftale et tidspunkt, der passer dig.`,
    detailsLabel: 'Dine bookingdetaljer',
    planLabel: 'Plan',
    websiteLabel: 'Hjemmeside',
    phoneLabel: 'Telefon',
    messageLabel: 'Besked',
    closing: 'Vi glæder os til at vise dig, hvordan WebAssist kan transformere din kundekommunikation.',
    team: '— WebAssist-teamet',
    footer2: 'Svar på denne e-mail, hvis du har spørgsmål.',
  },
  sv: {
    subject: 'Din demo är bokad — WebAssist',
    greeting: (name) => `Din demo är bokad, ${name}!`,
    body: (plan) => `Tack för ditt intresse för <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>-planen. Vi hör av oss <strong>inom 24 timmar</strong> för att boka en tid som passar dig.`,
    detailsLabel: 'Dina bokningsdetaljer',
    planLabel: 'Plan',
    websiteLabel: 'Webbplats',
    phoneLabel: 'Telefon',
    messageLabel: 'Meddelande',
    closing: 'Vi ser fram emot att visa dig hur WebAssist kan förändra din kundkommunikation.',
    team: '— WebAssist-teamet',
    footer2: 'Svara på detta e-postmeddelande om du har frågor.',
  },
  no: {
    subject: 'Din demo er booket — WebAssist',
    greeting: (name) => `Din demo er booket, ${name}!`,
    body: (plan) => `Takk for din interesse i <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>-planen. Vi tar kontakt <strong>innen 24 timer</strong> for å avtale et tidspunkt som passer deg.`,
    detailsLabel: 'Dine bookingdetaljer',
    planLabel: 'Plan',
    websiteLabel: 'Nettsted',
    phoneLabel: 'Telefon',
    messageLabel: 'Melding',
    closing: 'Vi ser frem til å vise deg hvordan WebAssist kan forvandle kundekommunikasjonen din.',
    team: '— WebAssist-teamet',
    footer2: 'Svar på denne e-posten hvis du har spørsmål.',
  },
  nl: {
    subject: 'Uw demo is geboekt — WebAssist',
    greeting: (name) => `Uw demo is geboekt, ${name}!`,
    body: (plan) => `Bedankt voor uw interesse in het <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>-abonnement. We nemen <strong>binnen 24 uur</strong> contact op om een geschikt moment in te plannen.`,
    detailsLabel: 'Uw boekingsdetails',
    planLabel: 'Plan',
    websiteLabel: 'Website',
    phoneLabel: 'Telefoon',
    messageLabel: 'Bericht',
    closing: 'We kijken ernaar uit u te laten zien hoe WebAssist uw klantcommunicatie kan transformeren.',
    team: '— Het WebAssist-team',
    footer2: 'Beantwoord deze e-mail als u vragen heeft.',
  },
  de: {
    subject: 'Ihre Demo ist gebucht — WebAssist',
    greeting: (name) => `Ihre Demo ist gebucht, ${name}!`,
    body: (plan) => `Vielen Dank für Ihr Interesse am <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>-Plan. Wir melden uns <strong>innerhalb von 24 Stunden</strong>, um einen passenden Termin zu vereinbaren.`,
    detailsLabel: 'Ihre Buchungsdetails',
    planLabel: 'Plan',
    websiteLabel: 'Website',
    phoneLabel: 'Telefon',
    messageLabel: 'Nachricht',
    closing: 'Wir freuen uns darauf, Ihnen zu zeigen, wie WebAssist Ihre Kundenkommunikation verändern kann.',
    team: '— Das WebAssist-Team',
    footer2: 'Antworten Sie auf diese E-Mail, wenn Sie Fragen haben.',
  },
  es: {
    subject: 'Tu demo está reservada — WebAssist',
    greeting: (name) => `¡Tu demo está reservada, ${name}!`,
    body: (plan) => `Gracias por tu interés en el plan <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>. Nos pondremos en contacto contigo <strong>en 24 horas</strong> para concretar el horario.`,
    detailsLabel: 'Detalles de tu reserva',
    planLabel: 'Plan',
    websiteLabel: 'Web',
    phoneLabel: 'Teléfono',
    messageLabel: 'Mensaje',
    closing: 'Esperamos poder mostrarte cómo WebAssist puede transformar tu comunicación con clientes.',
    team: '— El equipo de WebAssist',
    footer2: 'Responde a este email si tienes alguna pregunta.',
  },
  uk: {
    subject: 'Ваше демо заброньовано — WebAssist',
    greeting: (name) => `Ваше демо заброньовано, ${name}!`,
    body: (plan) => `Дякуємо за інтерес до плану <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>. Ми зв'яжемося з вами <strong>протягом 24 годин</strong>, щоб узгодити зручний час.`,
    detailsLabel: 'Деталі вашого бронювання',
    planLabel: 'План',
    websiteLabel: 'Сайт',
    phoneLabel: 'Телефон',
    messageLabel: 'Повідомлення',
    closing: 'Ми з нетерпінням покажемо вам, як WebAssist може змінити вашу комунікацію з клієнтами.',
    team: '— Команда WebAssist',
    footer2: 'Відповідайте на цей лист, якщо у вас є запитання.',
  },
  pl: {
    subject: 'Twoje demo zostało zarezerwowane — WebAssist',
    greeting: (name) => `Twoje demo zostało zarezerwowane, ${name}!`,
    body: (plan) => `Dziękujemy za zainteresowanie planem <strong style="color:#25D366;">${plan || 'WebAssist'}</strong>. Skontaktujemy się z Tobą <strong>w ciągu 24 godzin</strong>, aby umówić wygodny termin.`,
    detailsLabel: 'Szczegóły Twojej rezerwacji',
    planLabel: 'Plan',
    websiteLabel: 'Strona',
    phoneLabel: 'Telefon',
    messageLabel: 'Wiadomość',
    closing: 'Nie możemy się doczekać, aby pokazać Ci, jak WebAssist może odmienić komunikację z klientami.',
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

  const { name, email, phone, website, plan, message, lang } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const langCode = detectLang(lang);
  const s = confirmationStrings[langCode] || confirmationStrings.en;

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
      <tr><td style="padding:4px 12px 4px 0;color:#888">Lang</td><td>${lang || '—'}</td></tr>
    </table>
  `;

  // Save to Supabase
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/webassist_bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, email, phone, website, plan, message }),
    });
  } catch (err) {
    console.error('Supabase save error:', err);
  }

  try {
    await transporter.sendMail({
      from: `"WebAssist" <${process.env.FASTMAIL_USER}>`,
      to: 'phillip@dynamicmedia.dk',
      replyTo: email,
      subject: `Demo request: ${name} — ${plan || 'No plan selected'}`,
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
                    ${s.body(plan)}
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fffe;border:1px solid #e0f5ec;border-radius:8px;margin-bottom:28px;">
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0;color:#25D366;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${s.detailsLabel}</p>
                        <table style="margin-top:12px;font-size:14px;color:#444444;line-height:1.8;" cellpadding="0" cellspacing="0">
                          <tr><td style="color:#888888;padding-right:12px;">${s.planLabel}</td><td><strong>${plan || '—'}</strong></td></tr>
                          ${website ? `<tr><td style="color:#888888;padding-right:12px;">${s.websiteLabel}</td><td>${website}</td></tr>` : ''}
                          ${phone ? `<tr><td style="color:#888888;padding-right:12px;">${s.phoneLabel}</td><td>${phone}</td></tr>` : ''}
                          ${message ? `<tr><td style="color:#888888;padding-right:12px;vertical-align:top;">${s.messageLabel}</td><td>${message}</td></tr>` : ''}
                        </table>
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
