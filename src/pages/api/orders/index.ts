import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return res.status(400).json({ message: error.message })
      }

      return res.status(200).json({ products: data || [] })
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      const product = req.body
      
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) {
        return res.status(400).json({ message: error.message })
      }

      return res.status(201).json({ product: data })
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
