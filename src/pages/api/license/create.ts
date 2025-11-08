import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminSupabase } from '@/lib/supabase'
import crypto from 'crypto'

// POST /api/license/create
// Auth: Authorization: Bearer <SUPABASE_ACCESS_TOKEN> (must have user_metadata.role === 'admin')
// Body: { days: number, plan?: string, deviceId?: string }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Authorize via Supabase access token like store admin flow
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Use an admin server client to introspect token user
    const supabaseAuth = getAdminSupabase()
    const { data, error: userErr } = await supabaseAuth.auth.getUser(token)
    if (userErr || !data?.user) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
    const role = (data.user.user_metadata as any)?.role || 'user'
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }
  } catch {
    return res.status(500).json({ message: 'Auth verification failed' })
  }

  const { days, plan, deviceId } = req.body as { days?: number; plan?: string; deviceId?: string }
  if (!days || days <= 0) {
    return res.status(400).json({ message: 'days must be > 0' })
  }

  try {
    const now = new Date()
    const exp = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    // Generate a random license key (hex)
    const key = crypto.randomBytes(24).toString('hex')

    const supabase = getAdminSupabase()
    const { error } = await supabase
      .from('licenses')
      .insert({ key, plan: plan || null, exp: exp.toISOString(), device_id: deviceId || null })

    if (error) {
      return res.status(500).json({ message: 'Database error inserting license', detail: error.message })
    }

    return res.status(200).json({ key, exp: Math.floor(exp.getTime() / 1000), plan: plan || null })
  } catch (e: any) {
    return res.status(500).json({ message: 'Internal error', detail: e?.message || 'unknown' })
  }
}
