import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};

        // Validate credentials using environment variables
        if (
          username === process.env.ADMIN_USERNAME &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: '1', name: 'Admin', email: username }; // Add additional user details if needed
        }

        return null; // Return null if validation fails
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login', // Redirect here on unauthenticated access
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
