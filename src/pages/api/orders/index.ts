import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const getUserFromAuth = async (token?: string) => {
  if (!token) return { error: 'Unauthorized' as const }
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    )
    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) {
      console.error('Auth error:', error)
      return { error: 'Unauthorized' as const }
    }
    const role = (data.user.user_metadata as any)?.role ?? 'user'
    return { user: data.user, role }
  } catch (error) {
    console.error('Auth exception:', error)
    return { error: 'Unauthorized' as const }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  
  console.log('Auth token present:', !!token)
  
  const auth = await getUserFromAuth(token)
  if ('error' in auth) {
    console.log('Auth failed')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  console.log('User authenticated:', auth.user.email, 'Role:', auth.role)

  // Use service role key to bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  if (req.method === 'POST') {
    const { order } = req.body as { order?: any }
    
    if (!order) {
      return res.status(400).json({ message: 'Missing order data' })
    }

    console.log('Creating order for user:', auth.user.id)
    console.log('Order data:', order)

    try {
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

      console.log('Final order data to insert:', orderData)

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) {
        console.error('Database insert error:', error)
        console.error('Error details:', error.details, 'Hint:', error.hint, 'Code:', error.code)
        return res.status(400).json({ 
          message: error.message,
          details: error.details,
          code: error.code
        })
      }

      console.log('Order created successfully:', data.id)
      return res.status(201).json({ 
        success: true, 
        order: data 
      })

    } catch (error: any) {
      console.error('Order creation exception:', error)
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      })
    }
  }

  if (req.method === 'GET') {
    try {
      console.log('Fetching orders for user:', auth.user.id, 'Role:', auth.role)

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

        console.log('Admin fetched orders count:', data?.length)
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

        console.log('User fetched orders count:', data?.length)
        return res.status(200).json({ orders: data || [] })
      }
    } catch (error: any) {
      console.error('Orders fetch exception:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
