import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify user
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

    if (userError) {
      return res.status(500).json({ message: 'Failed to verify user role' });
    }

    if (userData?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('appeals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(500).json({ message: 'Failed to fetch appeals', error: error.message, details: error.details, hint: error.hint });
      }

      return res.status(200).json({ appeals: data || [], total: data?.length || 0 });
    }

    if (req.method === 'PATCH') {
      const { id, status } = req.body || {};
      if (!id || !status || !['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid payload' });
      }

      const { data, error } = await supabase
        .from('appeals')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ message: 'Failed to update appeal', error: error.message, details: error.details, hint: error.hint });
      }

      return res.status(200).json({ appeal: data, message: 'Appeal updated' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
