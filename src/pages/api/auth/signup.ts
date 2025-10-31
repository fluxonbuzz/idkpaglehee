import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { getAdminSupabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password, name } = req.body as { email?: string; password?: string; name?: string }
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })

  try {
    const admin = getAdminSupabase()

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    })

    if (createError) {
      const msg = createError.message || 'Signup failed'
      if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('exists')) {
        return res.status(409).json({ message: 'Email already in use', code: 'EMAIL_IN_USE' })
      }
      return res.status(400).json({ message: msg })
    }

    // Upsert profile (no plaintext password)
    if (created.user) {
      await admin.from('users').upsert({ id: created.user.id, email, name, role: 'user' }).select().single().catch(() => null)
    }

    // Sign in to return a token for immediate session
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data: signInData, error: signInError } = await anon.auth.signInWithPassword({ email, password })
    if (signInError || !signInData.session) {
      return res.status(200).json({ success: true })
    }

    const accessToken = signInData.session.access_token
    const { data: userData } = await anon.auth.getUser(accessToken)

    return res.status(200).json({
      token: accessToken,
      user: {
        id: userData.user?.id,
        email: userData.user?.email,
        name: (userData.user?.user_metadata as any)?.name,
        createdAt: userData.user?.created_at,
        updatedAt: userData.user?.updated_at,
      },
    })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Internal Server Error' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { getAdminSupabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password, name } = req.body as { email?: string; password?: string; name?: string }
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

  try {
    const admin = getAdminSupabase()
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name: name ?? null, role: 'user' },
    })
    if (createErr) return res.status(400).json({ message: createErr.message })

    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data: signInData, error: signInErr } = await anon.auth.signInWithPassword({ email, password })
    if (signInErr || !signInData.session) return res.status(400).json({ message: signInErr?.message || 'Failed to sign in' })

    const accessToken = signInData.session.access_token
    const { data: userData } = await anon.auth.getUser(accessToken)

    return res.status(200).json({
      token: accessToken,
      user: {
        id: userData.user?.id,
        email: userData.user?.email,
        name: (userData.user?.user_metadata as any)?.name,
        role: (userData.user?.user_metadata as any)?.role ?? 'user',
        createdAt: userData.user?.created_at,
        updatedAt: userData.user?.updated_at,
      },
    })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Internal Server Error' })
  }
}


