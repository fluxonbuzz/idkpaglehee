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
  const { id } = req.query
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Order ID is required' })
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  const auth = await getUserFromAuth(token)
  if ('error' in auth) return res.status(401).json({ message: 'Unauthorized' })

  // Use service role key for all operations to bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  if (req.method === 'PATCH') {
    // Only admin can update orders
    if (auth.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' })
    }

    const updates = req.body

    try {
      const { data, error } = await supabase
        .from('orders')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Order update error:', error)
        return res.status(400).json({ message: error.message })
      }

      return res.status(200).json({ order: data })

    } catch (error: any) {
      console.error('Order update exception:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (req.method === 'GET') {
    try {
      if (auth.role === 'admin') {
        // Admin can get any order
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          return res.status(400).json({ message: error.message })
        }

        return res.status(200).json({ order: data })
      } else {
        // Users can only get their own orders
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .eq('user_id', auth.user.id)
          .single()

        if (error) {
          return res.status(404).json({ message: 'Order not found' })
        }

        return res.status(200).json({ order: data })
      }
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
