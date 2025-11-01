import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== ORDERS API CALLED ===', req.method);
  
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
    console.log('Verifying token...');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError) {
      console.log('Auth error:', authError);
      return res.status(401).json({ message: 'Invalid or expired token', error: authError.message });
    }
    
    if (!user) {
      console.log('No user found');
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User authenticated:', user.id);

    if (req.method === 'GET') {
      console.log('Fetching orders for user:', user.id);
      
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error fetching orders:', error);
        return res.status(500).json({ 
          message: 'Failed to fetch orders', 
          error: error.message,
          details: error.details,
          hint: error.hint
        });
      }

      console.log('Orders found:', orders?.length || 0);
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

        if (typeof order.total !== 'number' || order.total <= 0) {
          return res.status(400).json({ message: 'Invalid order total' });
        }

        const orderData = {
          user_id: user.id,
          items: order.items,
          subtotal: order.subtotal || order.total,
          total: order.total,
          status: order.status || 'pending',
          discount: order.discount || null,
        };

        console.log('Inserting order data:', orderData);

        const { data, error } = await supabase
          .from('orders')
          .insert([orderData])
          .select()
          .single();

        if (error) {
          console.error('Database error creating order:', error);
          return res.status(500).json({ 
            message: 'Failed to create order', 
            error: error.message,
            details: error.details,
            hint: error.hint
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
    console.error('Unexpected API error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message
    });
  }
}
