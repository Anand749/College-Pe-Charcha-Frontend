import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useAuthModal } from '../../hooks/useAuthModal';
import AuthModal from '../AuthModal';

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { isAuthModalOpen, setIsAuthModalOpen, handleApplyNowClick } = useAuthModal();

  const recruitmentInfo = {
    id: 1,
    text: "NOW RECRUITING: Executive Team applications for the 2025-26 session are open.",
    link: "/apply-core",
    linkText: "Apply Now",
    requiresAuth: true,
  };

  if (!isVisible) return null;

  return (
    // --- CHANGE 1: Switched to a vibrant orange background theme ---
    // Added a slightly darker orange border for depth.
    <div className="bg-orange-600 text-white py-3 px-4 shadow-xl relative z-40 overflow-hidden border-b-2 border-orange-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* 'LIVE' indicator still pops nicely against orange */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black-900 opacity-90"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <span className="bg-red-600 text-white text-xs font-bold uppercase px-2 py-1 rounded-md">
            Live
          </span>
        </div>

        {/* --- CHANGE 2: Marquee text updated for contrast --- */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center whitespace-nowrap animate-marquee">
            {/* Main text is now bright white for readability */}
            <p className="text-sm sm:text-base font-semibold text-white">{recruitmentInfo.text}</p>
            {/* Separator uses a lighter orange for a subtle, on-brand look */}
            <span className="mx-6 text-orange-200">•</span>
            <p className="text-sm sm:text-base font-semibold text-white">{recruitmentInfo.text}</p>
            <span className="mx-6 text-orange-200">•</span>
          </div>
        </div>

        {/* --- CHANGE 3: Buttons adjusted for the new theme --- */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* This high-contrast button design works perfectly with the orange bg */}
          <button
            onClick={() => {
              if (recruitmentInfo.requiresAuth) {
                handleApplyNowClick(recruitmentInfo.link);
              } else {
                window.location.href = recruitmentInfo.link;
              }
            }}
            className="group bg-white text-orange-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-orange-100 hover:scale-105 transition-all duration-300 transform shadow-lg flex items-center gap-2"
          >
            {recruitmentInfo.linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          {/* Close button colors updated for visibility on orange */}
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
          redirectPath={recruitmentInfo.link}
        />
      </div>
    </div>
  );
};

export default NotificationBar;