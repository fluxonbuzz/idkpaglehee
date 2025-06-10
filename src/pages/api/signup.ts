import { NextApiRequest, NextApiResponse } from 'next';
import { getEdgeConfig } from '@vercel/edge-config';
import { hash } from 'bcryptjs';

// Define a type for your user data
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Get Edge Config
    const edgeConfig = await getEdgeConfig(process.env.EDGE_CONFIG_ID!);
    const users = (await edgeConfig.get('users')) || [];

    // Check if user already exists
    const userExists = users.some((user: User) => user.email === email);
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Update Edge Config
    await edgeConfig.update({
      users: [...users, newUser],
    });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
