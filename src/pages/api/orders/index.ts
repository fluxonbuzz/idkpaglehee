import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const getUserFromAuth = async (token?: string) => {
  if (!token) return { error: 'Unauthorized' as const }
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  })
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return { error: 'Unauthorized' as const }
  const role = (data.user.user_metadata as any)?.role ?? 'user'
  return { user: data.user, role }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  const auth = await getUserFromAuth(token)
  if ('error' in auth) return res.status(401).json({ message: 'Unauthorized' })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  if (req.method === 'POST') {
    const { order } = req.body as { order?: any }
    if (!order) return res.status(400).json({ message: 'Missing order' })

    const { error } = await supabase.from('orders').insert({
      user_id: auth.user.id,
      data: order,
      status: order?.status ?? 'pending',
      total: order?.total ?? null,
    })
    if (error) return res.status(400).json({ message: error.message })
    return res.status(200).json({ success: true })
  }

  if (req.method === 'GET') {
    if (auth.role === 'admin') {
      // Use service role to bypass RLS for admin overview
      const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
      const { data, error } = await admin.from('orders').select('*').order('created_at', { ascending: false })
      if (error) return res.status(400).json({ message: error.message })
      return res.status(200).json({ orders: data })
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', auth.user.id)
      .order('created_at', { ascending: false })
    if (error) return res.status(400).json({ message: error.message })
    return res.status(200).json({ orders: data })
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}


