import { NextApiRequest, NextApiResponse } from 'next';
import { hashSync } from 'bcryptjs';

interface User {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).json({ 
      error: 'Method not allowed' 
    });
  }

  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Use sync version to avoid async issues in serverless
    const hashedPassword = hashSync(password, 12);
    
    // In production, you would:
    // 1. Save to your database here
    // 2. Implement proper error handling for duplicates
    // 3. Create session/token
    
    return res.status(201).json({ 
      success: true,
      user: {
        name,
        email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
