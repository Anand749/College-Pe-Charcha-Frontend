import React from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

const SignInModal: React.FC = () => {
  const { isSignInModalOpen, closeSignInModal, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // The onAuthStateChanged in AuthContext will handle the user state update
      // and the ProtectedRoute will handle the redirect.
      closeSignInModal();
      navigate('/core-application');
    } catch (error) {
      console.error("Sign in failed", error);
      // Optionally, show an error message to the user in the modal
    }
  };

  if (!isSignInModalOpen || user) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
        <p className="mb-6">You need to be logged in to apply.</p>
        <button
          onClick={handleSignIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In with Google
        </button>
        <button
          onClick={closeSignInModal}
          className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignInModal;