import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login', // Redirect unauthenticated users here
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
        console.log('Redirect callback triggered. URL:', url, 'Base URL:', baseUrl);
        // Redirect to /admin after successful login or fallback to the base URL
        return url.startsWith(baseUrl) ? url : '/admin';
      },
    async session({ session, token }) {
      // Add token to the session for access in the UI
      console.log('Session callback triggered. Session:', session, 'Token:', token);
      session.user = token.user;
      console.log('Provided credentials:', session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Provided credentials:', credentials);
        console.log('Expected username:', process.env.ADMIN_USERNAME);
        console.log('Expected password:', process.env.ADMIN_PASSWORD);
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: '1', name: 'Admin' }; // Valid user object
        }
        throw new Error('Invalid credentials'); // Trigger error
      },
    }),
  ],
};
