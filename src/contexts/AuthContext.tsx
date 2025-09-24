import React, { createContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Check if Firebase is initialized
      if (!auth) {
        throw new Error('Firebase authentication is not initialized');
      }

      // Try to sign in with popup
      const result = await signInWithPopup(auth, googleProvider);
      
      // If we have a redirect path stored, navigate there
      const redirectPath = window.sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        window.location.href = redirectPath;
        window.sessionStorage.removeItem('redirectPath');
      }

      return result;
    } catch (error) {
      const firebaseError = error as { code?: string, message: string };
      console.error('Error signing in with Google:', firebaseError.message);
      
      // Handle specific error cases
      switch(firebaseError.code) {
        case 'auth/popup-blocked':
          alert('Please allow popups for this website to sign in with Google');
          break;
        case 'auth/popup-closed-by-user':
          console.log('Sign-in was cancelled');
          break;
        case 'auth/unauthorized-domain':
          alert('This domain is not authorized for Google sign-in. Please contact the administrator.');
          break;
        default:
          alert('An error occurred during sign in. Please try again.');
      }
      if (error.code === 'auth/popup-blocked') {
        alert('Please allow popups for this website to sign in with Google');
      } else if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup was closed by the user');
      } else {
        alert('An error occurred during sign in. Please try again.');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// useAuth hook moved to useAuth.ts file