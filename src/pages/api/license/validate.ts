import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminSupabase } from '@/lib/supabase';
import { signSessionCookie } from '@/lib/license';

const SESSION_COOKIE = 'license_session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sessionKey = process.env.LICENSE_SESSION_KEY;
  const canIssueCookie = !!sessionKey;

  try {
    const { key: rawKey, deviceId } = req.body as { key?: string; deviceId?: string };
    const key = (rawKey ?? '').trim();
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ message: 'License key required' });
    }

    const supabase = getAdminSupabase();

    // Find license by key
    const { data: licenses, error } = await supabase
      .from('licenses')
      .select('id, key, plan, exp, device_id')
      .eq('key', key)
      .limit(1);

    if (error) {
      return res.status(500).json({ message: 'Database error', detail: error.message });
    }
    const lic = licenses?.[0];
    if (!lic) {
      return res.status(401).json({ message: 'Invalid license' });
    }

    const nowMs = Date.now();
    const expMs = new Date(lic.exp as string).getTime();
    if (isNaN(expMs) || expMs <= nowMs) {
      return res.status(401).json({ message: 'Expired license' });
    }

    // Device binding: if license has no device bound yet and a deviceId is provided, bind it
    if (!lic.device_id && deviceId) {
      const { error: updErr } = await supabase
        .from('licenses')
        .update({ device_id: deviceId })
        .eq('id', lic.id);
      if (updErr) {
        return res.status(500).json({ message: 'Failed to bind device' });
      }
      lic.device_id = deviceId;
    }

    // If a device is already bound, it must match
    if (lic.device_id && deviceId && lic.device_id !== deviceId) {
      return res.status(401).json({ message: 'This license is already bound to a different device' });
    }

    const nowSec = Math.floor(nowMs / 1000);
    const licExpSec = Math.floor(expMs / 1000);
    const maxSessionSeconds = 7 * 24 * 60 * 60;
    const exp = Math.min(licExpSec, nowSec + maxSessionSeconds);

    // Issue session cookie with minimal claims if configured
    if (canIssueCookie && sessionKey) {
      const sessionToken = signSessionCookie({ exp, plan: lic.plan ?? undefined, device: lic.device_id ?? undefined }, sessionKey);
      const isProd = process.env.NODE_ENV === 'production';
      res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${exp - nowSec}; ${isProd ? 'Secure' : ''}`);
    }

    return res.status(200).json({ success: true, plan: lic.plan ?? null, exp, cookieIssued: canIssueCookie });
  } catch (e) {
    return res.status(400).json({ message: 'Bad request' });
  }
}


