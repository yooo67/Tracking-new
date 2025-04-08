
export default async function handler(req, res) {
  const { query, headers } = req;
  const { target } = query;

  if (!target) {
    return res.status(400).json({ error: 'No target URL' });
  }

  const ip = headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ua = headers['user-agent'] || 'unknown';

  const geo = await fetch(`https://ipwho.is/${ip}`).then(r => r.json());

  console.log('Klik terdeteksi:', {
    ip,
    city: geo.city,
    country: geo.country,
    browser: ua,
    time: new Date()
  });

  return res.writeHead(302, { Location: target }).end();
}
