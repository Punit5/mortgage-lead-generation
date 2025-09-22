import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  const defaultLabels = [
    'Homeowner',
    'Property',
    'Value & Loans',
    'Loan Details',
    'Credit History',
    'Credit Score',
    'Contact'
  ];

  const labels = stepLabels || defaultLabels;

  return (
    <div className="w-full">
      {/* Enhanced Progress Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">{currentStep}</span>
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900">
              Step {currentStep} of {totalSteps}
            </span>
            <p className="text-gray-900 text-sm">
              {labels[currentStep - 1]} • {Math.round(progress)}% Complete
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(progress)}%
          </div>
          <div className="text-xs text-gray-900">
            {totalSteps - currentStep} steps left
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4 mb-3 shadow-inner">
          <div
            className="progress-bar h-4 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse-ring"></div>
          </div>
        </div>
      </div>

      {/* Simplified Step Dots for Mobile */}
      <div className="hidden md:flex justify-between items-center">
        {Array.from({ length: Math.min(totalSteps, 11) }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-3 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-400 text-white shadow-lg scale-110'
                    : isCurrent
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 text-white shadow-xl scale-125 animate-pulse'
                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`mt-1 text-xs font-medium text-center transition-colors ${
                  isCompleted
                    ? 'text-green-400'
                    : isCurrent
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-500'
                }`}
              >
                {labels[index]}
              </span>

              {/* Connection lines */}
              {index < totalSteps - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-600 -z-10">
                  <div
                    className={`h-full transition-all duration-500 ${
                      stepNumber < currentStep ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-600'
                    }`}
                    style={{ width: stepNumber < currentStep ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Progress Dots */}
      <div className="md:hidden flex justify-center space-x-2 mt-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index + 1 < currentStep
                ? 'bg-green-400'
                : index + 1 === currentStep
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Motivational Text */}
      <div className="text-center mt-3">
        <div className="text-gray-800 text-sm">
          {currentStep <= 3 && "🚀 You're off to a great start!"}
          {currentStep > 3 && currentStep <= 6 && "⭐ Great progress, keep going!"}
          {currentStep > 6 && currentStep <= 9 && "🔥 Almost there, you're doing amazing!"}
          {currentStep > 9 && "🎉 Final stretch, just a few more questions!"}
        </div>
      </div>
    </div>
  );
}