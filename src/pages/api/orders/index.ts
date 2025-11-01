import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper to set CO
const setCorsHeaders = (res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  // Set CORS headers for all responses
  setCorsHeaders(res);

  // Authentication middleware
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    // Verify the token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (req.method === 'GET') {
      // Get user's orders
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
      }
      
      return res.status(200).json({ 
        orders: orders || [],
        message: 'Orders fetched successfully'
      });
    }

    if (req.method === 'POST') {
      try {
        const { order } = req.body;
        console.log('Creating order for user:', user.id, order);

        if (!order || !order.items || order.items.length === 0) {
          return res.status(400).json({ message: 'Order data is missing or invalid' });
        }

        // Validate required fields
        if (typeof order.total !== 'number' || order.total <= 0) {
          return res.status(400).json({ message: 'Invalid order total' });
        }

        const { data, error } = await supabase
          .from('orders')
          .insert([{
            user_id: user.id,
            items: order.items,
            subtotal: order.subtotal || order.total,
            total: order.total,
            status: order.status || 'pending',
            discount: order.discount || null,
          }])
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ 
            message: 'Failed to create order', 
            error: error.message 
          });
        }

        console.log('Order created successfully:', data);
        return res.status(201).json({ 
          order: data,
          message: 'Order created successfully'
        });
      } catch (error: any) {
        console.error('Order creation error:', error);
        return res.status(500).json({ 
          message: 'Internal server error', 
          error: error.message 
        });
      }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}
