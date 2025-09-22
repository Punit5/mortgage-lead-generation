import React from 'react';
import { FormStepProps } from '../../types';
import { useApp } from '../../context/AppContext';

export default function Step9CreditScore({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors,
  setErrors
}: FormStepProps) {
  const { nextStep: directNextStep } = useApp();
  const handleSelection = (score: string) => {
    console.log('Step 9 - Credit Score:', score);
    updateFormData({
      loanDetails: { ...formData.loanDetails, creditScore: score as any }
    });
    setErrors({});
    setTimeout(() => {
      setErrors({});
      directNextStep();
    }, 600);
  };

  const creditScoreOptions = [
    { value: 'excellent-780+', label: 'Excellent (780+)', icon: '🎆', description: 'Outstanding credit rating', color: 'emerald' },
    { value: 'very-good-720-779', label: 'Very Good (720-779)', icon: '⭐', description: 'Strong credit history', color: 'blue' },
    { value: 'good-660-719', label: 'Good (660-719)', icon: '👍', description: 'Solid credit standing', color: 'green' },
    { value: 'fair-600-659', label: 'Fair (600-659)', icon: '📊', description: 'Average credit score', color: 'yellow' },
    { value: 'needs-work-599', label: 'Needs Work (<599)', icon: '💹', description: 'Room for improvement', color: 'red' }
  ];

  return (
    <div className="space-y-2 animate-slideInUp">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mx-auto mb-1 flex items-center justify-center shadow-lg relative group">
          <span className="text-xl">📈</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Help us determine your loan options
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Credit Score
        </h2>
      </div>

      {/* Question */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4 relative group">
          What is your estimated credit score?
          <span className="ml-1 text-gray-400 cursor-help">ℹ️</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Select your estimated credit score range
          </div>
        </h3>

        <div className="space-y-4 max-w-3xl mx-auto">
          {creditScoreOptions.map((option, index) => {
            const colorClasses = {
              emerald: 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 ring-emerald-200 shadow-emerald-500/20 border-emerald-500 bg-emerald-500 text-emerald-500',
              blue: 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 ring-blue-200 shadow-blue-500/20 border-blue-500 bg-blue-500 text-blue-500',
              green: 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 ring-green-200 shadow-green-500/20 border-green-500 bg-green-500 text-green-500',
              yellow: 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 ring-yellow-200 shadow-yellow-500/20 border-yellow-500 bg-yellow-500 text-yellow-500',
              red: 'border-red-400 bg-gradient-to-br from-red-50 to-pink-50 ring-red-200 shadow-red-500/20 border-red-500 bg-red-500 text-red-500'
            };
            const colors = colorClasses[option.color as keyof typeof colorClasses].split(' ');

            return (
              <button
                key={option.value}
                onClick={() => handleSelection(option.value)}
                className={`group w-full p-6 rounded-2xl border-3 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 hover-lift ${
                  formData.loanDetails.creditScore === option.value
                    ? `${colors[0]} ${colors[1]} text-gray-900 shadow-2xl scale-105 ring-4 ${colors[2]}`
                    : `border-gray-300 hover:${colors[0]} bg-white hover:bg-gray-50 text-gray-800 shadow-lg hover:${colors[3]}`
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 ${
                    formData.loanDetails.creditScore === option.value
                      ? `bg-${option.color}-100 group-hover:bg-${option.color}-200`
                      : `bg-${option.color}-100 group-hover:bg-${option.color}-200`
                  }`}>
                    <span className="text-2xl group-hover:scale-110 transition-transform">{option.icon}</span>
                  </div>

                  <div className="flex-1">
                    <span className="font-bold text-xl block mb-1">{option.label}</span>
                    <span className={`text-sm ${formData.loanDetails.creditScore === option.value ? 'text-gray-700' : 'text-gray-400'}`}>
                      {option.description}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full border-4 transition-all duration-300 ${
                    formData.loanDetails.creditScore === option.value
                      ? `${colors[4]} ${colors[5]} shadow-xl`
                      : `border-gray-400 group-hover:${colors[4]}`
                  }`}>
                    {formData.loanDetails.creditScore === option.value && (
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                        <svg className={`w-4 h-4 ${colors[6]}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {errors.creditScore && (
          <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
            <p className="text-red-600 text-lg flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.creditScore}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-8">
        <button
          onClick={prevStep}
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </span>
        </button>

        {formData.loanDetails.creditScore && (
          <button
            onClick={() => nextStep()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-1 ml-4 animate-glow"
          >
            <span className="flex items-center justify-center">
              Continue
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div className="text-center mt-6">
        <div className="flex items-center justify-center space-x-3 text-gray-600 text-lg">
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Step 8 of 10</span>
          <div className="text-sm text-gray-900">• Nearly there!</div>
        </div>
      </div>
    </div>
  );
}