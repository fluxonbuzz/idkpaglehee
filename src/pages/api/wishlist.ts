import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const { data: wishlist, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user_id);

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

  return res.status(405).json({ message: 'Method not allowed' });
}
