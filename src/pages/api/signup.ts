import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: {
    name: string;
    email: string;
  };
  errors?: {
    field?: string;
    message: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, password } = req.body as SignupRequest;

    // Validate input fields
    const errors = [];
    
    if (!name?.trim()) {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (name.length > 50) {
      errors.push({ field: 'name', message: 'Name cannot exceed 50 characters' });
    }

    if (!email?.trim()) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }

    if (!password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (password.length < 8) {
      errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
    } else if (!/[A-Z]/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter' });
    } else if (!/[a-z]/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one lowercase letter' });
    } else if (!/[0-9]/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one number' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // In a real app, you would check if email exists in your database here
    // const userExists = await prisma.user.findUnique({ where: { email } });
    // if (userExists) {
    //   return res.status(409).json({
    //     success: false,
    //     message: 'Email already in use',
    //     errors: [{ field: 'email', message: 'This email is already registered' }]
    //   });
    // }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // In a real app, you would save to your database here
    // const user = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword
    //   },
    //   select: {
    //     name: true,
    //     email: true
    //   }
    // });

    // Simulate successful user creation
    const user = { name, email };

    return res.status(201).json({ 
      success: true,
      message: 'User created successfully',
      user
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
}
