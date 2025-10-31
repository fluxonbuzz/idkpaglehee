import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Product ID is required' })
  }

  if (req.method === 'PUT') {
    try {
      const updates = req.body
      
      const { data, error } = await supabase
        .from('products')
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

      return res.status(200).json({ product: data })
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        return res.status(400).json({ message: error.message })
      }

      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
