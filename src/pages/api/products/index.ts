import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Helper function to handle CORS
const allowCors = (res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
};

// Helper function to handle errors
const handleError = (res: NextApiResponse, status: number, message: string, error?: any) => {
  console.error(`[${status}] ${message}`, error);
  return res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error?.message : undefined
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    allowCors(res);
    return res.status(200).end();
  }

  // Set CORS headers for all responses
  allowCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Add pagination and filtering
      const { page = 1, limit = 20, category } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });
      
      // Apply filters if provided
      if (category) {
        query = query.eq('category', category);
      }
      
      // Add pagination and ordering
      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + Number(limit) - 1);
      
      const { data: products, error, count } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ 
          success: false,
          message: 'Failed to fetch products', 
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
      
      return res.status(200).json({ 
        success: true,
        data: {
          products: products || [],
          pagination: {
            total: count || 0,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil((count || 0) / Number(limit))
          }
        },
        message: 'Products fetched successfully'
      });
    } catch (error: any) {
      console.error('Server error:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Internal server error', 
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  if (req.method === 'POST') {
    // Authentication for POST
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      const product = req.body;
      console.log('Creating product:', product);

      // Validate required fields
      if (!product.name || !product.price || !product.description) {
        return res.status(400).json({ message: 'Name, price, and description are required' });
      }

      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: product.name,
          category: product.category || 'account',
          price: parseFloat(product.price),
          original_price: product.original_price ? parseFloat(product.original_price) : null,
          description: product.description,
          features: product.features || [],
          tags: product.tags || [],
          seller_contact: product.seller_contact,
          mod_options: product.mod_options || [],
          is_pre_order: product.is_pre_order || false,
          pre_order_discount: product.pre_order_discount,
        }])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(400).json({ message: error.message });
      }

      console.log('Product created:', data);
      return res.status(201).json({ 
        product: data,
        message: 'Product created successfully'
      });
    } catch (error: any) {
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
