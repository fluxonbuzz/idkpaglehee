import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { getAdminSupabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body as { email?: string; password?: string }
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    let { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.session) {
      const message = error?.message || 'Invalid credentials'
      const looksUnconfirmed = message.toLowerCase().includes('confirm') || message.toLowerCase().includes('not confirmed')

      if (looksUnconfirmed) {
        try {
          const admin = getAdminSupabase()
          // Find user by email
          const { data: usersList } = await admin.auth.admin.listUsers({ page: 1, perPage: 1, email }) as any
          const user = usersList?.users?.[0]
          if (user?.id) {
            await admin.auth.admin.updateUserById(user.id, { email_confirm: true })
            // Retry sign in after auto-confirm
            const retry = await supabase.auth.signInWithPassword({ email, password })
            data = retry.data
            error = retry.error as any
          }
        } catch {}
      }

      if (error || !data?.session) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }
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


