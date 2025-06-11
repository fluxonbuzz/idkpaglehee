// src/services/auth.ts

/**
 * For internal Next.js API routes, we use relative paths
 * For external APIs, use process.env.NEXT_PUBLIC_EXTERNAL_API_URL
 */
const INTERNAL_API_URL = '/api';
const REQUEST_TIMEOUT = 15000; // 15 seconds (increased from 10)

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
  status?: number;
  errors?: Record<string, string>;
}

class APIError extends Error {
  constructor(
    public message: string,
    public code?: string,
    public status?: number,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

const handleRequest = async <T>(url: string, options: RequestInit): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: 'include', // For cookies if using session-based auth
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({})); // Handle empty responses

    if (!response.ok) {
      throw new APIError(
        data.message || 'Request failed',
        data.code,
        response.status,
        data.errors
      );
    }

    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof APIError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError('Request timed out. Please try again.', 'TIMEOUT');
      }
      throw new APIError(error.message || 'Network error', 'NETWORK_ERROR');
    }
    
    throw new APIError('An unknown error occurred', 'UNKNOWN_ERROR');
  }
};

export const AuthService = {
  async signup(user: User): Promise<AuthResponse> {
    return handleRequest<AuthResponse>(`${INTERNAL_API_URL}/auth/signup`, {
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

  async login(credentials: Omit<User, 'name'>): Promise<AuthResponse> {
    return handleRequest<AuthResponse>(`${INTERNAL_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  },

  async getCurrentUser(token: string): Promise<AuthResponse['user']> {
    return handleRequest<AuthResponse['user']>(`${INTERNAL_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    return handleRequest<{ token: string }>(`${INTERNAL_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean }> {
    return handleRequest<{ success: boolean }>(
      `${INTERNAL_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
  },

  async verifyEmail(token: string): Promise<{ success: boolean }> {
    return handleRequest<{ success: boolean }>(
      `${INTERNAL_API_URL}/auth/verify-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      }
    );
  },
};
