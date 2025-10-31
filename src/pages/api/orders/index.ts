import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // In a real app, you'd get the user from the token
  // const { user, error: userError } = await supabase.auth.api.getUserByCookie(req);
  // if (userError || !user) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'POST') {
    try {
      const { order } = req.body;
      console.log('Creating order:', order);

      if (!order || !order.items || order.items.length === 0) {
        return res.status(400).json({ message: 'Order data is missing or invalid' });
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          // user_id: user.id,
          items: order.items,
          total: order.total,
          status: order.status,
          discount: order.discount,
        }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ order: data });
    } catch (error: any) {
      console.error('Order creation error:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}