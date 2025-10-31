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


