import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

export const useAuthModal = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApplyNowClick = (path = '/apply-core') => {
    if (user) {
      navigate(path);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return {
    isAuthModalOpen,
    setIsAuthModalOpen,
    handleApplyNowClick
  };
};