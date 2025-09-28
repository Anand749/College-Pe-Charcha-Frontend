import React, { useState, useEffect } from 'react';
import { X, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '../../hooks/useAuthModal';
import AuthModal from '../AuthModal';

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const { isAuthModalOpen, setIsAuthModalOpen, handleApplyNowClick } = useAuthModal();

  const newsItems = [
    {
      id: 1,
      text: "🎉  Team Recruitment 2025-26: Applications are now open for Executive positions!",
      link: "/apply-core",
      linkText: "Apply Now",
      requiresAuth: true,
    },
    {
      id: 2,
      text: "📚 New Resources Available: Check out our latest college guides and admission tips!",
      link: "/resources",
      linkText: "View Resources",
    },
    {
      id: 3,
      text: "🎓 Expert Sessions: Join our upcoming webinars with industry professionals!",
      link: "/events",
      linkText: "Register Now",
    },
    {
      id: 4,
      text: "🤝 Mentorship Program: Connect with seniors from your dream colleges!",
      link: "/colleges",
      linkText: "Find Mentor",
    },
  ];

  // rotate news every 4s; start immediately on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  if (!isVisible) return null;

  const currentNews = newsItems[currentNewsIndex] || newsItems[0];

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-3 px-4 shadow-xl relative z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-0">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <AlertCircle className="h-5 w-5 animate-pulse text-orange-100" />
            <span className="text-orange-100 font-semibold text-xs hidden sm:block">LATEST:</span>
          </div>

          {/* Ticker + Action button container */}
          <div className="flex items-center flex-1 min-w-0 space-x-4">
            <div className="flex items-center overflow-hidden flex-1 min-w-0">
              <div className="flex items-center space-x-6 whitespace-nowrap animate-marquee-continuous min-w-0">
                <span className="font-semibold text-sm sm:text-base text-white truncate">{currentNews.text}</span>
                <ChevronRight className="h-3 w-3 animate-bounce text-orange-100" />
                <span className="font-semibold text-sm sm:text-base text-white truncate">{currentNews.text}</span>
                <ChevronRight className="h-3 w-3 animate-bounce text-orange-100" />
              </div>
            </div>

            {/* Action button placed at the end of the ticker so it sits after the message */}
            <div className="flex-shrink-0">
              <button
                onClick={() => {
                  if (currentNews.requiresAuth) {
                    handleApplyNowClick(currentNews.link);
                  } else {
                    window.location.href = currentNews.link;
                  }
                }}
                className="animate-float-rotate bg-white/95 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-white hover:scale-110 transition-all duration-300 transform shadow-lg hover:shadow-xl border border-orange-200"
                style={{ zIndex: 2 }}
              >
                {currentNews.linkText}
              </button>
              <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                redirectPath={currentNews.link}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 p-1.5 ml-3 flex-shrink-0 rounded-full hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
        <div
          className="h-full bg-white animate-progress-bar"
          style={{ animationDuration: '4s' }}
        />
      </div>
    </div>
  );
};

export default NotificationBar;
