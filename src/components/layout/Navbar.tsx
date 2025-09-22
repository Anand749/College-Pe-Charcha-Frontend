import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleAuth = async () => {
    try {
      if (user) {
        await logout();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const navLinks = [
    // { name: 'College Predictor', path: '/predictor' },
    { name: 'Colleges', path: '/colleges' },
    { name: 'Resources', path: '/resources' },
    { name: 'Events', path: '/events' },
    { name: 'About Us', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const specialLinks = [
    { name: 'Apply Now', path: '/apply-core', isSpecial: true },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50" style={{ minHeight: '72px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-nowrap justify-between items-center" style={{ minHeight: '72px' }}>
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-orange-400 transition-all duration-300">College Pe Charcha</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center overflow-hidden">
            <div className="flex items-center space-x-1 overflow-hidden min-w-0">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              {specialLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (user) {
                      navigate(link.path);
                    } else {
                      setShowSignInModal(true);
                    }
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden group whitespace-nowrap"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Auth Button */}
          <div className="hidden md:block pl-4">
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center bg-gradient-to-r from-orange-50 to-orange-100 rounded-full px-3 py-2 border border-orange-200 shadow-sm whitespace-nowrap max-w-[240px]">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || ''}
                    className="w-9 h-9 rounded-full border-2 border-orange-400 shadow-sm"
                  />
                  <span className="ml-2 text-gray-700 font-semibold truncate max-w-[140px] text-sm">{user.displayName}</span>
                </div>
              )}
              <button
                onClick={handleAuth}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group text-sm ${
                  user
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md'
                }`}
              >
                <span className="relative z-10">{user ? 'Sign Out' : 'Sign in'}</span>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  user ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'
                }`}></div>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign In Required</h2>
            <p className="text-gray-600 mb-6 text-center">You need to sign in to apply for the team.</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  signInWithGoogle();
                  setShowSignInModal(false);
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 shadow-lg"
              >
                Sign In with Google
              </button>
              <button
                onClick={() => setShowSignInModal(false)}
                className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {specialLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setIsOpen(false);
                  if (user) {
                    navigate(link.path);
                  } else {
                    setShowSignInModal(true);
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={handleAuth}
              className={`w-full mt-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                user
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg'
              }`}
            >
              {user ? 'Sign Out' : 'Sign in'}
            </button>
            {user && (
              <div className="flex items-center bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg px-3 py-2 mt-3 border border-orange-200 shadow-sm">
                <img
                  src={user.photoURL || ''}
                  alt={user.displayName || ''}
                  className="w-8 h-8 rounded-full border-2 border-orange-400 shadow-sm"
                />
                <span className="ml-2 text-gray-700 font-semibold text-sm">{user.displayName}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;