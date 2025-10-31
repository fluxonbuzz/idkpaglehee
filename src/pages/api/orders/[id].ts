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

  const { id } = req.query as { id: string }
  if (!id) return res.status(400).json({ message: 'Missing order id' })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  if (req.method === 'PATCH') {
    // Admin-only updates: status, admin_notes, discount info, any data merge
    if (auth.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
    const { status, admin_notes, discount, dataPatch } = req.body as {
      status?: string
      admin_notes?: string
      discount?: { code?: string; amount?: number } | null
      dataPatch?: Record<string, any>
    }

    // Load existing order data to merge
    const { data: existing, error: loadErr } = await supabase.from('orders').select('*').eq('id', id).single()
    if (loadErr || !existing) return res.status(404).json({ message: 'Order not found' })

    const mergedData = { ...(existing.data || {}), ...(dataPatch || {}), ...(discount ? { discount } : {}) }

    const { error: updErr } = await supabase
      .from('orders')
      .update({
        status: status ?? existing.status,
        admin_notes: admin_notes ?? existing.admin_notes ?? null,
        data: mergedData,
      })
      .eq('id', id)

    if (updErr) return res.status(400).json({ message: updErr.message })
    return res.status(200).json({ success: true })
  }

  if (req.method === 'GET') {
    // Admin can read any; users can only read own
    if (auth.role === 'admin') {
      const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
      if (error) return res.status(400).json({ message: error.message })
      return res.status(200).json({ order: data })
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .eq('user_id', (auth as any).user.id)
      .single()
    if (error) return res.status(400).json({ message: error.message })
    return res.status(200).json({ order: data })
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}


