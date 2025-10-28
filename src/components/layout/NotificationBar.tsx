import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useAuthModal } from '../../hooks/useAuthModal';
import AuthModal from '../AuthModal';

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAuthModalOpen, setIsAuthModalOpen, handleApplyNowClick } = useAuthModal();

  // ✅ Multiple messages here
  const recruitmentInfoList = [
    {
      id: 1,
      text: "Use College Predictor to find your best-fit colleges based on your unique profile!",
      link: "/predictor",
      linkText: "Predict Now",
      requiresAuth: true,
    },
    {
      id: 2,
      text: "Compare colleges and branches with real cutoff visualizations and category-wise insights!",
      link: "/compare",
      linkText: "Compare Now",
      requiresAuth: false,
    }
     
  ];

  const currentInfo = recruitmentInfoList[currentIndex];

  // ⏱️ Auto-rotate messages every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recruitmentInfoList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [recruitmentInfoList.length]);

  if (!isVisible) return null;

  return (
    <div className="bg-orange-600 text-white py-3 px-4 shadow-xl relative z-40 overflow-hidden border-b-2 border-orange-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* LIVE Indicator */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-90"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <span className="bg-red-600 text-white text-xs font-bold uppercase px-2 py-1 rounded-md">
            Live
          </span>
        </div>

        {/* Message Text */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center whitespace-nowrap animate-marquee">
            <p className="text-sm sm:text-base font-semibold text-white">
              {currentInfo.text}
            </p>
            <span className="mx-6 text-orange-200">•</span>
            <p className="text-sm sm:text-base font-semibold text-white">
              {currentInfo.text}
            </p>
            <span className="mx-6 text-orange-200">•</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => {
              if (currentInfo.requiresAuth) {
                handleApplyNowClick(currentInfo.link);
              } else {
                window.location.href = currentInfo.link;
              }
            }}
            className="group bg-white text-orange-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-orange-100 hover:scale-105 transition-all duration-300 transform shadow-lg flex items-center gap-2"
          >
            {currentInfo.linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-orange-100 hover:text-white hover:bg-orange-700 transition-all duration-200 p-1.5 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          redirectPath={currentInfo.link}
        />
      </div>
    </div>
  );
};

export default NotificationBar;
