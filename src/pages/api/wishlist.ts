import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authentication
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false,
      message: 'Missing or invalid authorization header' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }

    const userId = user.id;

    // Handle GET request
    if (req.method === 'GET') {
      const { data: wishlist, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      return res.status(200).json({ 
        success: true,
        wishlist: wishlist || [],
        message: 'Wishlist fetched successfully'
      });
    }

    // Handle POST request
    if (req.method === 'POST') {
      const { product_id } = req.body;
      
      if (!product_id) {
        return res.status(400).json({ 
          success: false,
          message: 'Product ID is required' 
        });
      }

      const { data, error } = await supabase
        .from('wishlist')
        .insert([{ 
          user_id: userId, 
          product_id,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error?.code === '23505') {
        return res.status(200).json({ 
          success: true,
          is_duplicate: true,
          message: 'Item already in wishlist'
        });
      }

      if (error) throw error;
      
      return res.status(201).json({ 
        success: true,
        data: data?.[0],
        message: 'Added to wishlist'
      });
    }

    // Handle DELETE request
    if (req.method === 'DELETE') {
      const productId = req.query.id;
      if (!productId) {
        return res.status(400).json({ 
          success: false,
          message: 'Product ID is required' 
        });
      }

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      
      return res.status(200).json({ 
        success: true,
        message: 'Removed from wishlist'
      });
    }

    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });

  } catch (error: any) {
    console.error('Wishlist API Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
