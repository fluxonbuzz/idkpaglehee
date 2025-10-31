import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyLicenseKey, signSessionCookie } from '@/lib/license';

const SESSION_COOKIE = 'license_session';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const signingKey = process.env.LICENSE_SIGNING_KEY;
  const sessionKey = process.env.LICENSE_SESSION_KEY;
  if (!signingKey || !sessionKey) {
    return res.status(500).json({ message: 'Server not configured' });
  }

  try {
    const { key, deviceId } = req.body as { key?: string; deviceId?: string };
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ message: 'License key required' });
    }

    const result = verifyLicenseKey(key, signingKey, deviceId);
    if (!result.valid || !result.claims) {
      return res.status(401).json({ message: 'Invalid or expired license' });
    }

    // Issue a short-lived session cookie (max 7d or license exp, whichever is sooner)
    const now = Math.floor(Date.now() / 1000);
    const maxSessionSeconds = 7 * 24 * 60 * 60;
    const exp = Math.min(result.claims.exp, now + maxSessionSeconds);
    const sessionToken = signSessionCookie({ ...result.claims, exp }, sessionKey);

    const isProd = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${exp - now}; ${isProd ? 'Secure' : ''}`);

    return res.status(200).json({ success: true, plan: result.claims.plan, exp });
  } catch (e) {
    return res.status(400).json({ message: 'Bad request' });
  }
}


