import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password, name } = req.body as { email?: string; password?: string; name?: string }
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })

  try {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data, error } = await anon.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      const msg = error.message || 'Signup failed'
      if (msg.toLowerCase().includes('not allowed')) {
        return res.status(500).json({ message: 'Server is missing Supabase service role key. Please configure SUPABASE_SERVICE_ROLE_KEY.', code: 'SERVER_MISCONFIGURED' })
      }
      if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('registered') || msg.toLowerCase().includes('exists')) {
        return res.status(409).json({ message: 'Email already in use', code: 'EMAIL_IN_USE' })
      }
      return res.status(400).json({ message: msg })
    }

    // On signUp, Supabase sends a verification email. Do not auto-login.
    return res.status(200).json({ success: true })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Internal Server Error' })
  }
}

