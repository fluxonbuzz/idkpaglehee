// lib/db.ts
import { get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

// Initialize Edge Config client
export const edgeConfigClient = createClient(process.env.EDGE_CONFIG);

// User related operations
export const db = {
  // Get user by email
  async getUserByEmail(email: string) {
    try {
      const users = await get('users');
      return users?.find((user: any) => user.email === email);
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  // Verify user credentials
  async verifyCredentials(email: string, password: string) {
    try {
      const user = await db.getUserByEmail(email);
      if (!user) return null;
      
      // In a real app, you'd use proper password hashing like bcrypt
      // This is just for demonstration with Edge Config
      return user.password === password ? user : null;
    } catch (error) {
      console.error('Error verifying credentials:', error);
      return null;
    }
  },

  // Add new user (for signup)
  async createUser(userData: { email: string; password: string; name?: string }) {
    try {
      const users = (await get('users')) || [];
      const userExists = users.some((user: any) => user.email === userData.email);
      
      if (userExists) {
        throw new Error('User already exists');
      }

      // In a real app, you should hash the password before storing
      const newUser = {
        ...userData,
        id: Date.now().toString(), // Simple ID generation
        createdAt: new Date().toISOString()
      };

      await edgeConfigClient.update([
        {
          operation: 'upsert',
          key: 'users',
          value: [...users, newUser],
        },
      ]);

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};

// Admin related operations
export const adminDb = {
  // Get admin by email
  async getAdminByEmail(email: string) {
    try {
      const admins = await get('admins');
      return admins?.find((admin: any) => admin.email === email);
    } catch (error) {
      console.error('Error fetching admin:', error);
      return null;
    }
  },

  // Verify admin credentials
  async verifyAdminCredentials(email: string, password: string) {
    try {
      const admin = await adminDb.getAdminByEmail(email);
      if (!admin) return null;
      
      return admin.password === password ? admin : null;
    } catch (error) {
      console.error('Error verifying admin credentials:', error);
      return null;
    }
  }
};
