import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body as { email?: string; password?: string }
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.session) {
      const message = error?.message || 'Invalid credentials'
      if (message.toLowerCase().includes('confirm') || message.toLowerCase().includes('not confirmed')) {
        return res.status(403).json({ message: 'Email not confirmed. Please verify your email.', code: 'EMAIL_NOT_CONFIRMED' })
      }
      return res.status(400).json({ message })
    }

    const accessToken = data.session.access_token
    const { data: userData } = await supabase.auth.getUser(accessToken)
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


