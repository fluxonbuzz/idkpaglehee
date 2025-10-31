import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Product ID is required' })
  }

  if (req.method === 'PUT') {
    try {
      const updates = req.body
      console.log('Updating product:', id, updates)
      
      const { data, error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          category: updates.category,
          price: updates.price,
          original_price: updates.original_price,
          description: updates.description,
          features: updates.features || [],
          tags: updates.tags || [],
          seller_contact: updates.seller_contact,
          mod_options: updates.mod_options || [],
          is_pre_order: updates.is_pre_order || false,
          pre_order_discount: updates.pre_order_discount,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Database error:', error)
        return res.status(400).json({ message: error.message })
      }

      console.log('Product updated:', data)
      return res.status(200).json({ product: data })
    } catch (error: any) {
      console.error('Server error:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      console.log('Deleting product:', id)
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Database error:', error)
        return res.status(400).json({ message: error.message })
      }

      console.log('Product deleted:', id)
      return res.status(200).json({ success: true })
    } catch (error: any) {
      console.error('Server error:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
