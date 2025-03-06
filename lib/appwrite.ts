import { Client, Account } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67b0397b000fa8add446');

const account = new Account(client);

// Auth helper functions
export const auth = {
  // Sign in existing user (admin only)
  signIn: async (email: string, password: string) => {
    try {
      const session = await account.createSession(email, password);
      return session;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }
};