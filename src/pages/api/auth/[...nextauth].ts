// pages/api/auth/[...nextauth].ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db, adminDb } from '@/lib/db';

// Extend the User type to include role
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  interface Session {
    user: User & {
      id: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          if (credentials.role === 'admin') {
            const admin = await adminDb.verifyAdminCredentials(
              credentials.email, 
              credentials.password
            );
            if (!admin) return null;
            return { ...admin, role: 'admin' };
          } else {
            const user = await db.verifyCredentials(
              credentials.email, 
              credentials.password
            );
            if (!user) return null;
            return { ...user, role: 'user' };
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  }
};

export default NextAuth(authOptions);
