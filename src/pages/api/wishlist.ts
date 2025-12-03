import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@supabase/ssr';
import { jwtVerify } from 'jose';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper to extract user ID from JWT
export async function getUserIdFromToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload.sub; // Returns the user ID
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }
  const token = authHeader.split(' ')[1];
  
  // Get user ID from token
  const userId = await getUserIdFromToken(token);
  if (!userId) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  if (req.method === 'GET') {
    try {
      const { data: wishlist, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      return res.status(200).json({ 
        wishlist: wishlist || [],
        message: 'Wishlist fetched successfully'
      });
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
      return res.status(500).json({ 
        message: 'Failed to fetch wishlist', 
        error: error.message 
      });
    }
  }

  // Handle POST request to add item to wishlist
  if (req.method === 'POST') {
    try {
      const { product_id } = req.body;
      
      if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      const { data, error } = await supabase
        .from('wishlist')
        .insert([
          { 
            user_id: userId, 
            product_id: product_id,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      
      return res.status(201).json({ 
        message: 'Added to wishlist',
        data: data[0]
      });
    } catch (error: any) {
      // Handle duplicate entry (item already in wishlist)
      if (error.code === '23505') {
        return res.status(200).json({ 
          message: 'Item already in wishlist',
          is_duplicate: true
        });
      }
      
      console.error('Error adding to wishlist:', error);
      return res.status(500).json({ 
        message: 'Failed to add to wishlist', 
        error: error.message 
      });
    }
  }

  // Handle DELETE request to remove item from wishlist
  if (req.method === 'DELETE' && req.query.id) {
    try {
      const productId = req.query.id as string;
      
      const { data, error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      
      return res.status(200).json({ 
        message: 'Removed from wishlist',
        data: { product_id: productId }
      });
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      return res.status(500).json({ 
        message: 'Failed to remove from wishlist', 
        error: error.message 
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
