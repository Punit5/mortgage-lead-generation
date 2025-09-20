import React from 'react';

interface ProgressIndicatorsProps {
  currentStep: number;
  totalSteps: number;
  estimatedTimeRemaining?: number;
  completionPercentage?: number;
  className?: string;
}

export default function ProgressIndicators({
  currentStep,
  totalSteps,
  estimatedTimeRemaining = 0,
  completionPercentage = 0,
  className = ''
}: ProgressIndicatorsProps) {
  const progressPercent = (currentStep / totalSteps) * 100;

  const formatTime = (minutes: number): string => {
    if (minutes < 1) return 'Less than 1 minute';
    if (minutes === 1) return '1 minute';
    if (minutes < 60) return `${Math.round(minutes)} minutes`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);

    if (remainingMinutes === 0) {
      return hours === 1 ? '1 hour' : `${hours} hours`;
    }

    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Main Progress Bar */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progressPercent)}% Complete
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Animated progress shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Time Estimate */}
      {estimatedTimeRemaining > 0 && (
        <div className="mt-3 flex items-center justify-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>About {formatTime(estimatedTimeRemaining)} remaining</span>
        </div>
      )}

      {/* Step Indicators */}
      <div className="mt-4 flex justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : isCurrent
                    ? 'bg-primary-500 border-primary-500 text-white animate-pulse'
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              {/* Step Labels */}
              <div className="mt-2 text-xs text-center">
                <div className={`font-medium ${isCurrent ? 'text-primary-700' : 'text-gray-500'}`}>
                  {getStepLabel(stepNumber)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Percentage Circle (for mobile) */}
      <div className="sm:hidden mt-4 flex justify-center">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray={`${progressPercent}, 100`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-700">
              {Math.round(progressPercent)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStepLabel(stepNumber: number): string {
  const labels = {
    1: 'Loan Info',
    2: 'Property',
    3: 'Personal',
    4: 'Financial',
    5: 'Review'
  };
  return labels[stepNumber as keyof typeof labels] || `Step ${stepNumber}`;
}

// Milestone Progress Component
interface MilestoneProgressProps {
  milestones: {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    isCurrent: boolean;
    estimatedTime?: number;
  }[];
  className?: string;
}

export function MilestoneProgress({ milestones, className = '' }: MilestoneProgressProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex items-start">
          {/* Milestone Indicator */}
          <div className="flex flex-col items-center mr-4">
            <div
              className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center
                ${milestone.isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : milestone.isCurrent
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
                }
              `}
            >
              {milestone.isCompleted ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>

            {/* Connecting Line */}
            {index < milestones.length - 1 && (
              <div className={`w-0.5 h-8 mt-2 ${milestone.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
          </div>

          {/* Milestone Content */}
          <div className="flex-1 pb-4">
            <h3 className={`font-semibold ${milestone.isCurrent ? 'text-primary-700' : milestone.isCompleted ? 'text-green-700' : 'text-gray-500'}`}>
              {milestone.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>

            {milestone.isCurrent && milestone.estimatedTime && (
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ~{milestone.estimatedTime} min
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Completion Celebration Component
interface CompletionCelebrationProps {
  onContinue: () => void;
}

export function CompletionCelebration({ onContinue }: CompletionCelebrationProps) {
  return (
    <div className="text-center py-8">
      <div className="animate-bounce mb-4">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Done!</h2>
      <p className="text-gray-600 mb-6">You've completed all the required information.</p>

      <button
        onClick={onContinue}
        className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        Submit Application
      </button>
    </div>
  );
}