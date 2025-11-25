import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Generate a random short code
    const shortCode = Math.random().toString(36).substring(2, 8);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/r/${shortCode}`;

    // Save to Supabase
    const { data, error } = await supabase
      .from('urls')
      .insert([
        { 
          original_url: url, 
          short_code: shortCode, 
          short_url: shortUrl,
          clicks: 0
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      // If it's a duplicate key error, try again with a new code
      if (error.code === '23505') {
        return handler(req, res);
      }
      return res.status(500).json({ error: 'Failed to create short URL' });
    }

    return res.status(200).json({
      originalUrl: url,
      shortUrl,
      shortCode,
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
