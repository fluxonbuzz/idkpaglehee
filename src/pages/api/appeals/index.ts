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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { username, email, platform, reason, explanation, contact_method } = req.body || {};

    if (!username || !email || !platform || !reason || !explanation || !contact_method) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const payload = {
      username,
      email,
      platform,
      reason,
      explanation,
      contact_method,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('appeals')
      .insert([payload])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: 'Failed to submit appeal', error: error.message, details: error.details, hint: error.hint });
    }

    return res.status(201).json({ appeal: data, message: 'Appeal submitted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
