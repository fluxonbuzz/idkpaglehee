import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminSupabase } from '@/lib/supabase'

// POST /api/license/create
// Headers: x-admin-key: <ADMIN_API_KEY>
// Body: { days: number, plan?: string, deviceId?: string }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = (req.body || {}) as { email?: string }
  const emailLower = (email || '').trim().toLowerCase()
  if (!emailLower) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // Authorize via DB: admin_users table with a unique lowercased email column
  const supabaseAuth = getAdminSupabase()
  const { data: admins, error: adminErr } = await supabaseAuth
    .from('admin_users')
    .select('email')
    .ilike('email', emailLower)
    .limit(1)

  if (adminErr) {
    return res.status(500).json({ message: 'Auth database error' })
  }
  if (!admins || admins.length === 0) {
    // Bootstrap: if no admins exist, add the first caller as admin
    const { count, error: countErr } = await supabaseAuth
      .from('admin_users')
      .select('*', { count: 'exact', head: true })

    if (countErr) {
      return res.status(500).json({ message: 'Auth database error' })
    }

    if ((count || 0) === 0) {
      const { error: insertErr } = await supabaseAuth
        .from('admin_users')
        .insert({ email: emailLower })
      if (insertErr) {
        return res.status(500).json({ message: 'Failed to bootstrap admin' })
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }

  const { days, plan, deviceId } = req.body as { days?: number; plan?: string; deviceId?: string }
  if (!days || days <= 0) {
    return res.status(400).json({ message: 'days must be > 0' })
  }

  try {
    const now = new Date()
    const exp = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    // Generate a random license key (url-safe)
    const key = [...crypto.getRandomValues(new Uint8Array(24))]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    const supabase = getAdminSupabase()
    const { error } = await supabase
      .from('licenses')
      .insert({ key, plan: plan || null, exp: exp.toISOString(), device_id: deviceId || null })

    if (error) {
      return res.status(500).json({ message: 'Database error', detail: error.message })
    }

    return res.status(200).json({ key, exp: Math.floor(exp.getTime() / 1000), plan: plan || null })
  } catch (e: any) {
    return res.status(500).json({ message: 'Internal error', detail: e?.message || 'unknown' })
  }
}
