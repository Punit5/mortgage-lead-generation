import React, { useState, useEffect } from 'react';

interface UrgencyTimerProps {
  className?: string;
  variant?: 'rate-lock' | 'special-offer' | 'deadline';
}

export default function UrgencyTimer({ className = '', variant = 'rate-lock' }: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set deadline based on variant
    const getDeadline = () => {
      const now = new Date();
      switch (variant) {
        case 'rate-lock':
          // Rate lock expires at end of today
          const endOfDay = new Date(now);
          endOfDay.setHours(23, 59, 59, 999);
          return endOfDay;
        case 'special-offer':
          // Special offer expires in 2 hours
          return new Date(now.getTime() + 2 * 60 * 60 * 1000);
        case 'deadline':
          // Application deadline in 6 hours
          return new Date(now.getTime() + 6 * 60 * 60 * 1000);
        default:
          return new Date(now.getTime() + 2 * 60 * 60 * 1000);
      }
    };

    const deadline = getDeadline();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [variant]);

  const getContent = () => {
    switch (variant) {
      case 'rate-lock':
        return {
          title: '🔒 Rate Lock Expires Today',
          subtitle: 'Lock in today\'s rates before they increase tomorrow',
          bgColor: 'bg-red-600',
          textColor: 'text-white'
        };
      case 'special-offer':
        return {
          title: '⚡ Limited Time Offer',
          subtitle: 'Zero lender fees on qualified applications',
          bgColor: 'bg-orange-600',
          textColor: 'text-white'
        };
      case 'deadline':
        return {
          title: '⏰ Application Deadline',
          subtitle: 'Submit today for this month\'s rate guarantee',
          bgColor: 'bg-yellow-600',
          textColor: 'text-white'
        };
      default:
        return {
          title: '🔒 Rate Lock Expires',
          subtitle: 'Secure your rate now',
          bgColor: 'bg-red-600',
          textColor: 'text-white'
        };
    }
  };

  const content = getContent();

  return (
    <div className={`${content.bgColor} ${content.textColor} rounded-lg p-4 ${className}`}>
      <div className="text-center">
        <h3 className="font-bold text-lg mb-1">{content.title}</h3>
        <p className="text-sm opacity-90 mb-4">{content.subtitle}</p>

        <div className="flex justify-center space-x-2 mb-4">
          <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs opacity-80">HRS</div>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs opacity-80">MIN</div>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs opacity-80">SEC</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>Time remaining to secure this rate</span>
        </div>
      </div>
    </div>
  );
}