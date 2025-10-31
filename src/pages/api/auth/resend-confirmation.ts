import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email } = req.body as { email?: string }
  if (!email) return res.status(400).json({ message: 'Email is required' })

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { error } = await supabase.auth.resend({ type: 'signup', email })
    if (error) return res.status(400).json({ message: error.message })
    return res.status(200).json({ success: true })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Internal Server Error' })
  }
}


