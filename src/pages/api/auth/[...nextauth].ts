// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Login attempt with:", credentials); // Debug log
        
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Hardcoded test user (replace with DB/Edge Config later)
        const testUser = {
          id: "1",
          email: "test@example.com",
          password: "test123", // In production, use bcrypt.compare()
        };

        if (
          credentials.email === testUser.email &&
          credentials.password === testUser.password
        ) {
          return testUser; // Success
        }

        return null; // Fail
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug logs
});
