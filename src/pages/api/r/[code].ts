import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code || Array.isArray(code)) {
    return res.status(400).json({ error: 'Invalid URL code' });
  }

  try {
    // Find the URL in the database
    const { data, error } = await supabase
      .from('urls')
      .select('original_url, clicks')
      .eq('short_code', code)
      .single();

    if (error || !data) {
      console.error('Error finding URL:', error);
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment the click counter
    await supabase
      .from('urls')
      .update({ clicks: (data.clicks || 0) + 1 })
      .eq('short_code', code);

    // Redirect to the original URL
    return res.redirect(301, data.original_url);
  } catch (error) {
    console.error('Error in redirect:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
