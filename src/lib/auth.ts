// src/services/auth.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw new Error('Login failed');
    }
  },
  
  // You might want to add these later
  register: async (userData: { email: string; password: string; name: string }) => {
    /* ... */
  },
  logout: async () => {
    /* ... */
  }
};
