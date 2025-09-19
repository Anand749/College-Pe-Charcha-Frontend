import React, { useState, useEffect } from 'react';

const NotificationBar: React.FC = () => {
  const notifications = [
    "🔔 Recruitment for Mentors and College Heads will be opening very soon! Stay tuned for updates.",
    "📢 Want to join our team? Apply for Core Team positions now! Click on 'Join Team' to apply."
  ];

  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotificationIndex((prevIndex) => 
        prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [notifications.length]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-2 z-[100] overflow-hidden shadow-md">
      <div className="relative w-full">
        <div 
          key={currentNotificationIndex} 
          className="whitespace-nowrap absolute w-full text-center"
          style={{
            animation: 'marquee 15s linear infinite',
            transform: 'translateX(100%)'
          }}
        >
          {notifications[currentNotificationIndex]}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;