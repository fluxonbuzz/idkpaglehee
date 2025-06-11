// src/services/auth.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const REQUEST_TIMEOUT = 10000; // 10 seconds

interface User {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string>;
}

const handleRequest = async <T>(url: string, options: RequestInit): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      const error = new Error(errorData.message || 'Request failed');
      (error as any).code = errorData.code;
      (error as any).errors = errorData.errors;
      throw error;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};

export const AuthService = {
  async signup(user: User): Promise<AuthResponse> {
    return handleRequest<AuthResponse>(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
      }),
    });
  },

  async login(user: Omit<User, 'name'>): Promise<AuthResponse> {
    return handleRequest<AuthResponse>(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
  },

  async getCurrentUser(token: string): Promise<AuthResponse['user']> {
    return handleRequest<AuthResponse['user']>(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async refreshToken(token: string): Promise<{ token: string }> {
    return handleRequest<{ token: string }>(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean }> {
    return handleRequest<{ success: boolean }>(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  },
};
