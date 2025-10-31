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

  // Use service role key for all database operations to bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  if (req.method === 'POST') {
    const { order } = req.body as { order?: any }
    if (!order) return res.status(400).json({ message: 'Missing order' })

    try {
      // Create order with the correct schema structure
      const orderData = {
        user_id: auth.user.id,
        items: order.items || [],
        subtotal: order.subtotal || 0,
        total: order.total || 0,
        discount: order.discount || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) {
        console.error('Order creation error:', error)
        return res.status(400).json({ message: error.message })
      }

      return res.status(201).json({ 
        success: true, 
        order: data 
      })

    } catch (error: any) {
      console.error('Order creation exception:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (req.method === 'GET') {
    try {
      if (auth.role === 'admin') {
        // Admin can see all orders
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Admin orders fetch error:', error)
          return res.status(400).json({ message: error.message })
        }

        return res.status(200).json({ orders: data || [] })
      } else {
        // Regular users can only see their own orders
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', auth.user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('User orders fetch error:', error)
          return res.status(400).json({ message: error.message })
        }

        return res.status(200).json({ orders: data || [] })
      }
    } catch (error: any) {
      console.error('Orders fetch exception:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
