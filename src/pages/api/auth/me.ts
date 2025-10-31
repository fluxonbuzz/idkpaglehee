import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) return res.status(401).json({ message: error?.message || 'Unauthorized' })

    return res.status(200).json({
      id: data.user.id,
      email: data.user.email,
      name: (data.user.user_metadata as any)?.name,
      role: (data.user.user_metadata as any)?.role ?? 'user',
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at,
    })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Internal Server Error' })
  }
}


