import React, { useState, useEffect } from 'react';

interface SocialProofProps {
  className?: string;
}

interface RecentApplication {
  id: string;
  firstName: string;
  city: string;
  amount: number;
  timeAgo: string;
}

export default function SocialProof({ className = '' }: SocialProofProps) {
  const [customerCount, setCustomerCount] = useState(12847);
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);

  // Simulate customer count incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock recent applications data
  useEffect(() => {
    const mockApplications: RecentApplication[] = [
      { id: '1', firstName: 'Sarah', city: 'Vancouver', amount: 425000, timeAgo: '2 minutes ago' },
      { id: '2', firstName: 'Michael', city: 'Richmond', amount: 650000, timeAgo: '5 minutes ago' },
      { id: '3', firstName: 'Jennifer', city: 'Burnaby', amount: 380000, timeAgo: '8 minutes ago' },
      { id: '4', firstName: 'David', city: 'Surrey', amount: 725000, timeAgo: '12 minutes ago' },
      { id: '5', firstName: 'Amanda', city: 'Coquitlam', amount: 450000, timeAgo: '15 minutes ago' },
      { id: '6', firstName: 'Jason', city: 'Langley', amount: 580000, timeAgo: '18 minutes ago' },
      { id: '7', firstName: 'Lisa', city: 'North Vancouver', amount: 920000, timeAgo: '22 minutes ago' },
      { id: '8', firstName: 'Mark', city: 'West Vancouver', amount: 1250000, timeAgo: '25 minutes ago' },
    ];
    setRecentApplications(mockApplications);
  }, []);

  // Cycle through recent applications
  useEffect(() => {
    if (recentApplications.length > 0) {
      const interval = setInterval(() => {
        setCurrentApplicationIndex(prev => (prev + 1) % recentApplications.length);
      }, 4000); // Every 4 seconds

      return () => clearInterval(interval);
    }
  }, [recentApplications.length]);

  const currentApplication = recentApplications[currentApplicationIndex];

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}>
      {/* Customer Count */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="ml-3 text-sm text-gray-600">
            +{customerCount.toLocaleString()} others
          </div>
        </div>
        <p className="text-sm text-gray-700 font-medium">
          <span className="text-primary-600 font-semibold">{customerCount.toLocaleString()}</span> Canadians found their perfect mortgage rate
        </p>
      </div>

      {/* Recent Applications Ticker */}
      {currentApplication && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-green-800">
                <span className="font-semibold">{currentApplication.firstName}</span> from{' '}
                <span className="font-medium">{currentApplication.city}</span> just got pre-approved for{' '}
                <span className="font-semibold">${currentApplication.amount.toLocaleString()}</span>
              </p>
              <p className="text-xs text-green-600 mt-1">{currentApplication.timeAgo}</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-primary-600">2.8%</div>
          <div className="text-xs text-gray-600">Average Rate</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">94%</div>
          <div className="text-xs text-gray-600">Approval Rate</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-600">15min</div>
          <div className="text-xs text-gray-600">Avg Response</div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9/5 Rating
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Bank-Level Security
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Licensed in BC
          </div>
        </div>
      </div>
    </div>
  );
}