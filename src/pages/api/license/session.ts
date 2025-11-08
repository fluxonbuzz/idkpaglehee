import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminSupabase } from '@/lib/supabase'
import { signSessionCookie } from '@/lib/license'

const SESSION_COOKIE = 'license_session'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const sessionKey = process.env.LICENSE_SESSION_KEY
  if (!sessionKey) {
    return res.status(500).json({ message: 'Server not configured for sessions' })
  }

  try {
    const { licenseKey, deviceId } = req.body as { licenseKey?: string; deviceId?: string }
    const key = (licenseKey ?? '').trim()
    if (!key) return res.status(400).json({ message: 'License key required' })

    const supabase = getAdminSupabase()
    const { data: licenses, error } = await supabase
      .from('licenses')
      .select('id, key, plan, exp, device_id')
      .eq('key', key)
      .limit(1)

    if (error) return res.status(500).json({ message: 'Database error' })
    const lic = licenses?.[0]
    if (!lic) return res.status(401).json({ message: 'Invalid license' })

    const nowMs = Date.now()
    const expMs = new Date(lic.exp as string).getTime()
    if (isNaN(expMs) || expMs <= nowMs) return res.status(401).json({ message: 'Expired license' })

    if (!lic.device_id && deviceId) {
      const { error: updErr } = await supabase.from('licenses').update({ device_id: deviceId }).eq('id', lic.id)
      if (updErr) return res.status(500).json({ message: 'Failed to bind device' })
    }

    const nowSec = Math.floor(nowMs / 1000)
    const licExpSec = Math.floor(expMs / 1000)
    const maxSessionSeconds = 7 * 24 * 60 * 60
    const exp = Math.min(licExpSec, nowSec + maxSessionSeconds)

    const sessionToken = signSessionCookie({ exp, plan: lic.plan ?? undefined, device: (deviceId || lic.device_id) ?? undefined }, sessionKey)
    const isProd = process.env.NODE_ENV === 'production'
    res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${exp - nowSec}; ${isProd ? 'Secure' : ''}`)
    return res.status(200).json({ success: true })
  } catch (e) {
    return res.status(400).json({ message: 'Bad request' })
  }
}
