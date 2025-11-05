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

  // Authentication
  const authHeader = req.headers.authorization;
  console.log('Auth header present:', !!authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Missing or invalid auth header');
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    console.log('Verifying token for admin access...');
    
    // Get user from token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError) {
      console.log('Auth error:', authError);
      return res.status(401).json({ message: 'Invalid or expired token', error: authError.message });
    }
    
    if (!user) {
      console.log('No user found');
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User authenticated:', user.id, user.email);

    // Check if user has admin role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.log('Error fetching user role:', userError);
      return res.status(500).json({ message: 'Failed to verify user role' });
    }

    console.log('User role:', userData?.role);

    if (userData?.role !== 'admin') {
      console.log('Access denied - user is not admin');
      return res.status(403).json({ 
        message: 'Admin access required',
        yourRole: userData?.role,
        requiredRole: 'admin'
      });
    }

    console.log('Admin access granted, fetching all orders...');

    if (req.method === 'GET') {
      // Fetch ALL orders from ALL users with user information
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          users:user_id (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error fetching all orders:', error);
        return res.status(500).json({ 
          message: 'Failed to fetch orders', 
          error: error.message,
          details: error.details,
          hint: error.hint
        });
      }

      // Transform the data to include user info in the order object
      const ordersWithUserInfo = orders?.map(order => ({
        ...order,
        user_email: order.users?.email,
        user_name: order.users?.full_name
      })) || [];

      console.log('All orders found:', ordersWithUserInfo.length);
      return res.status(200).json({ 
        orders: ordersWithUserInfo,
        message: 'Orders fetched successfully',
        total: ordersWithUserInfo.length
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (error: any) {
    console.error('Unexpected admin API error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message
    });
  }
}
