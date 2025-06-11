import type { NextApiRequest, NextApiResponse } from 'next';

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse {
  message: string;
  user?: {
    name: string;
    email: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body as SignupRequest;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    return res.status(201).json({ 
      message: 'User created successfully',
      user: {
        name,
        email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
