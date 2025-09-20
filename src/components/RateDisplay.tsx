import React from 'react';
import { formatPercentage } from '../utils/calculations';

interface RateDisplayProps {
  rates: {
    fiveYear: number;
    threeYear: number;
    oneYear: number;
  };
  featured?: boolean;
  className?: string;
}

export default function RateDisplay({ rates, featured = false, className = '' }: RateDisplayProps) {
  const rateData = [
    {
      term: '5-Year Fixed',
      rate: rates.fiveYear,
      description: 'Most popular option',
      icon: '🏠'
    },
    {
      term: '3-Year Fixed',
      rate: rates.threeYear,
      description: 'Mid-term stability',
      icon: '⚡'
    },
    {
      term: '1-Year Fixed',
      rate: rates.oneYear,
      description: 'Short-term option',
      icon: '📈'
    }
  ];

  if (featured) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Current BC Mortgage Rates</h3>
          <p className="text-gray-600">Fixed rates updated daily - Get your rate today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rateData.map((item, index) => (
            <div
              key={item.term}
              className={`text-center p-4 rounded-lg border-2 transition-all ${
                index === 0
                  ? 'border-primary-200 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-200 hover:bg-primary-50'
              }`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-gray-600 mb-1">{item.term}</div>
              <div className="text-2xl font-bold text-primary-800 mb-1">
                {formatPercentage(item.rate)}
              </div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Rates shown are for qualified borrowers in BC. Your rate may vary based on credit score,
            mortgage amount, and other factors.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-primary-800 to-primary-900 rounded-lg p-4 text-white ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Today's Rates</h4>
        <div className="flex items-center text-xs">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
          Live
        </div>
      </div>

      <div className="space-y-2">
        {rateData.map((item) => (
          <div key={item.term} className="flex justify-between items-center">
            <span className="text-sm">{item.term}</span>
            <span className="font-semibold">{formatPercentage(item.rate)}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-primary-700">
        <p className="text-xs opacity-90">
          ⚡ Rates change daily
        </p>
      </div>
    </div>
  );
}