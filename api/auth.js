import crypto from 'crypto';

const MASTER_PASSWORD = process.env.ADMIN_PASSWORD || 'DubaiLuxury2026!';
const SALT = 'voe_luxury_salt_2026_';

function hashPassword(pwd) {
  return crypto.createHash('sha256').update(SALT + pwd).digest('hex');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const password = (body.password || '').trim();

    if (!password) {
      return res.status(400).json({ success: false, error: 'Please enter the administrative password.' });
    }

    const isValid = (password === MASTER_PASSWORD);

    if (isValid) {
      const token = crypto.randomBytes(32).toString('hex');
      return res.status(200).json({
        success: true,
        token: `voe_sess_${token}`,
        role: 'estate-owner',
        authenticatedAt: Date.now()
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid administrative password. Access denied.' });
  } catch (err) {
    console.error('API /api/auth error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
