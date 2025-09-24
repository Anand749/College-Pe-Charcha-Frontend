import React from 'react';
import { useAuth } from '../contexts/useAuth';


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, redirectPath = '/apply-core' }) => {
  const { signInWithGoogle } = useAuth();


  if (!isOpen) return null;

  const handleSignIn = async () => {
    try {
      // Store the redirect path before initiating sign in
      if (redirectPath) {
        window.sessionStorage.setItem('redirectPath', redirectPath);
      }
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign In Required</h2>
        <p className="text-gray-600 mb-6 text-center">You need to sign in to apply for the team.</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleSignIn}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 shadow-lg"
          >
            Sign In with Google
          </button>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;