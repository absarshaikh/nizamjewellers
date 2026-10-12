/**
 * Vercel serverless: sends contact form to inbox via Resend.
 *
 * Set in Vercel → Project → Settings → Environment Variables:
 *   RESEND_API_KEY   — from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL — inbox that receives messages (e.g. shop@gmail.com)
 *   CONTACT_FROM_EMAIL (optional) — verified sender, e.g. "Nizam Jewellers <noreply@yourdomain.com>"
 *     If omitted, uses Resend onboarding address (fine for testing).
 */

const RESEND_URL = 'https://api.resend.com/emails';

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    'Nizam Jewellers <onboarding@resend.dev>';

  if (!apiKey || !to) {
    return json(res, 503, {
      error:
        'Contact form email is not configured yet. Please use phone or WhatsApp.',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return json(res, 400, { error: 'Invalid request body' });
    }
  }

  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const phone = String(body?.phone ?? '').trim();
  const subject = String(body?.subject ?? 'General enquiry').trim();
  const message = String(body?.message ?? '').trim();

  if (!name || !email || !message) {
    return json(res, 400, { error: 'Name, email, and message are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(res, 400, { error: 'Invalid email address.' });
  }

  const text = [
    'New message from Nizam Jewellers website',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `Subject: ${subject}`,
    '',
    message,
  ].join('\n');

  try {
    const sendRes = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Contact] ${subject} — ${name}`,
        text,
      }),
    });

    if (!sendRes.ok) {
      console.error('Resend error', await sendRes.text());
      return json(res, 502, { error: 'Failed to send email. Try again later.' });
    }

    return json(res, 200, { success: true });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: 'Server error while sending email.' });
  }
}
