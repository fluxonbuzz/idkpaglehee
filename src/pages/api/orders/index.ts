import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

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
    if (error || !data.user) return null
    
    return {
      id: data.user.id,
      email: data.user.email,
      role: (data.user.user_metadata as any)?.role || 'user'
    }
  } catch (error) {
    return null
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Order ID is required' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing authentication token' })
  }

  const token = authHeader.slice(7)
  const user = await verifyUser(token)
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid authentication token' })
  }

  if (req.method === 'PATCH') {
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    try {
      const updates = req.body

      const { data, error } = await supabaseAdmin
        .from('orders')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return res.status(400).json({ message: error.message })
      }

      return res.status(200).json({ order: data })

    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
