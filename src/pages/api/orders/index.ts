import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Verify user from token
const verifyUser = async (token: string) => {
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
      console.log('Auth error:', error)
      return null
    }
    
    return {
      id: data.user.id,
      email: data.user.email,
      role: (data.user.user_metadata as any)?.role || 'user'
    }
  } catch (error) {
    console.log('Auth exception:', error)
    return null
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  console.log('Orders API called:', req.method)

  // Get auth token
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    console.log('No auth header')
    return res.status(401).json({ message: 'Missing authentication token' })
  }

  const token = authHeader.slice(7)
  const user = await verifyUser(token)
  
  if (!user) {
    console.log('User verification failed')
    return res.status(401).json({ message: 'Invalid authentication token' })
  }

  console.log('Authenticated user:', user.email, 'Role:', user.role)

  if (req.method === 'POST') {
    try {
      const { order } = req.body
      
      console.log('Received order data:', order)
      
      if (!order) {
        return res.status(400).json({ message: 'Missing order data' })
      }

      if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
        return res.status(400).json({ message: 'Order must contain items' })
      }

      // Prepare order data
      const orderData = {
        user_id: user.id,
        items: order.items,
        subtotal: order.subtotal || 0,
        total: order.total || 0,
        discount: order.discount || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('Inserting order data:', orderData)

      // Insert order using service role key (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) {
        console.error('Database insert error:', error)
        console.error('Error details:', error.details, 'Hint:', error.hint, 'Code:', error.code)
        return res.status(500).json({ 
          message: 'Failed to create order in database',
          error: error.message,
          details: error.details
        })
      }

      console.log('Order created successfully:', data)
      
      return res.status(201).json({ 
        success: true, 
        order: data 
      })

    } catch (error: any) {
      console.error('Server error in order creation:', error)
      return res.status(500).json({ 
        message: 'Internal server error during order creation',
        error: error.message 
      })
    }
  }

  if (req.method === 'GET') {
    try {
      console.log('Fetching orders for user:', user.id, 'Role:', user.role)

      let query = supabaseAdmin
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      // If not admin, only get user's orders
      if (user.role !== 'admin') {
        query = query.eq('user_id', user.id)
      }

      const { data, error } = await query

      if (error) {
        console.error('Database fetch error:', error)
        return res.status(500).json({ message: 'Failed to fetch orders' })
      }

      console.log('Fetched orders count:', data?.length)
      return res.status(200).json({ orders: data || [] })

    } catch (error: any) {
      console.error('Server error in orders fetch:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
