import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  console.log('=== ADMIN ORDER UPDATE ===', req.method, 'Order ID:', id);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authentication
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    // Verify user and admin role
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check admin role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || userData?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    if (req.method === 'PUT') {
      const { status, discount } = req.body;
      console.log('Updating order:', id, 'with data:', { status, discount });

      if (!status && !discount) {
        return res.status(400).json({ message: 'No update data provided' });
      }

      const updateData: any = {};
      if (status) updateData.status = status;
      if (discount !== undefined) updateData.discount = discount;

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ 
          message: 'Failed to update order', 
          error: error.message 
        });
      }

      return res.status(200).json({ 
        order: data,
        message: 'Order updated successfully'
      });
    }

    if (req.method === 'DELETE') {
      console.log('Deleting order:', id);

      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ 
          message: 'Failed to delete order', 
          error: error.message 
        });
      }

      return res.status(200).json({ 
        message: 'Order deleted successfully'
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (error: any) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message
    });
  }
}
