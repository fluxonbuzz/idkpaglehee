// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Enhanced NextAuth configuration
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate input
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          // In production, you would typically:
          // 1. Fetch user from your database
          // 2. Compare hashed password using bcrypt
          // 3. Return user object if valid

          // Temporary test user (remove in production)
          const testUser = {
            id: "1",
            email: "test@example.com",
            password: "test123", // Never store plain text passwords in production
            name: "Test User", // Optional but recommended
          };

          if (
            credentials.email === testUser.email &&
            credentials.password === testUser.password
          ) {
            return {
              id: testUser.id,
              email: testUser.email,
              name: testUser.name,
            };
          }

          return null; // Authentication failed
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  // Required for production
  secret: process.env.NEXTAUTH_SECRET,
  
  // Session configuration
  session: {
    strategy: "jwt", // Recommended for CredentialsProvider
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  
  // Callbacks for customizing JWT and session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  
  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
  
  // Custom pages (optional)
  pages: {
    signIn: "/login", // Custom login page
    error: "/login", // Error page for auth errors
  },
});
