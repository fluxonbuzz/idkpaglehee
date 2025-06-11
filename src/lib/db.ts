// lib/db.ts
import { get } from '@vercel/edge-config';
import { createClient } from '@vercel/edge-config';

interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  createdAt: string;
}

interface Admin {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

// Initialize Edge Config client
export const edgeConfigClient = createClient(process.env.EDGE_CONFIG);

// Helper function to safely get and parse users
async function getUsers(): Promise<User[]> {
  const users = await get('users');
  return Array.isArray(users) ? users as User[] : [];
}

// Helper function to safely get and parse admins
async function getAdmins(): Promise<Admin[]> {
  const admins = await get('admins');
  return Array.isArray(admins) ? admins as Admin[] : [];
}

// User related operations
export const db = {
  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const users = await getUsers();
      return users.find(user => user.email === email) || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  // Verify user credentials
  async verifyCredentials(email: string, password: string): Promise<User | null> {
    try {
      const user = await db.getUserByEmail(email);
      if (!user) return null;
      
      // In a real app, you'd use proper password hashing like bcrypt
      return user.password === password ? user : null;
    } catch (error) {
      console.error('Error verifying credentials:', error);
      return null;
    }
  },

  // Add new user (for signup)
  async createUser(userData: { email: string; password: string; name?: string }): Promise<User> {
    try {
      const users = await getUsers();
      const userExists = users.some(user => user.email === userData.email);
      
      if (userExists) {
        throw new Error('User already exists');
      }

      // In a real app, you should hash the password before storing
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
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
  async getAdminByEmail(email: string): Promise<Admin | null> {
    try {
      const admins = await getAdmins();
      return admins.find(admin => admin.email === email) || null;
    } catch (error) {
      console.error('Error fetching admin:', error);
      return null;
    }
  },

  // Verify admin credentials
  async verifyAdminCredentials(email: string, password: string): Promise<Admin | null> {
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
