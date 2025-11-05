import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== ADMIN ORDERS API CALLED ===', req.method);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Authentication
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    // Verify the user is an admin
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check if user is admin (from user metadata)
    const role = (user.user_metadata as any)?.role || 'user';
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    console.log('Admin user authenticated, fetching all orders...');

    // Fetch all orders (no join assumptions)
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error fetching all orders:', error);
      return res.status(500).json({ 
        message: 'Failed to fetch orders', 
        error: error.message
      });
    }

    const ordersWithUserInfo = orders || [];

    console.log('All orders found:', ordersWithUserInfo.length);
    
    return res.status(200).json({ 
      orders: ordersWithUserInfo,
      message: 'Orders fetched successfully'
    });

  } catch (error: any) {
    console.error('Unexpected API error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message
    });
  }
}
