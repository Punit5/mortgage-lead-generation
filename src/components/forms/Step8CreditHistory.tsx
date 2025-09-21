import React from 'react';
import { FormStepProps } from '../../types';

export default function Step8CreditHistory({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors
}: FormStepProps) {
  const handleSelection = (history: string) => {
    console.log('Step 8 - Credit History:', history);
    updateFormData({
      loanDetails: { ...formData.loanDetails, creditHistory: history as any }
    });
    setTimeout(nextStep, 600);
  };

  const creditHistoryOptions = [
    {
      value: 'bankruptcy',
      label: 'Bankruptcy',
      icon: '📉',
      description: 'Filed for bankruptcy protection'
    },
    {
      value: 'foreclosure',
      label: 'Foreclosure',
      icon: '🏠',
      description: 'Property foreclosure proceeding'
    },
    {
      value: 'consumer-proposal',
      label: 'Consumer Proposal',
      icon: '📝',
      description: 'Formal debt restructuring agreement'
    },
    {
      value: 'none',
      label: 'None of the Above',
      icon: '✅',
      description: 'Clean credit history'
    }
  ];

  return (
    <div className="space-y-2 animate-slideInUp">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mx-auto mb-2 flex items-center justify-center shadow-lg relative group">
          <span className="text-xl">📋</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Help us understand your financial background
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Credit History
        </h2>
      </div>

      {/* Question */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4 relative group">
          Have you had any of the following in the last 7 years?
          <span className="ml-1 text-gray-400 cursor-help">ℹ️</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Select any that apply to your financial history
          </div>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {creditHistoryOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelection(option.value)}
              className={`group p-8 rounded-2xl border-3 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 hover-lift ${
                formData.loanDetails.creditHistory === option.value
                  ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 text-gray-900 shadow-2xl scale-105 ring-4 ring-orange-200'
                  : 'border-gray-300 hover:border-orange-400 bg-white hover:bg-orange-50 text-gray-800 shadow-lg hover:shadow-orange-500/20'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                formData.loanDetails.creditHistory === option.value
                  ? 'bg-orange-100 group-hover:bg-orange-200'
                  : 'bg-orange-100 group-hover:bg-orange-200'
              }`}>
                <span className="text-4xl group-hover:scale-110 transition-transform">{option.icon}</span>
              </div>

              <div className="mb-4">
                <span className="font-bold text-xl block mb-2">{option.label}</span>
                <span className={`text-sm ${formData.loanDetails.creditHistory === option.value ? 'text-gray-700' : 'text-gray-400'}`}>
                  {option.description}
                </span>
              </div>

              <div className={`w-8 h-8 rounded-full border-4 transition-all duration-300 mx-auto ${
                formData.loanDetails.creditHistory === option.value
                  ? 'border-orange-500 bg-orange-500 shadow-xl'
                  : 'border-gray-400 group-hover:border-orange-400'
              }`}>
                {formData.loanDetails.creditHistory === option.value && (
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {errors.creditHistory && (
          <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
            <p className="text-red-600 text-lg flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.creditHistory}
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

        {formData.loanDetails.creditHistory && (
          <button
            onClick={() => nextStep()}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-1 ml-4 animate-glow"
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
      <div className="text-center mt-12">
        <div className="flex items-center justify-center space-x-3 text-gray-600 text-lg">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Step 8 of 11</span>
          <div className="text-sm text-gray-900">• Almost done!</div>
        </div>
      </div>
    </div>
  );
}