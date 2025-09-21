import React from 'react';
import { FormStepProps } from '../../types';

export default function Step4PropertyValue({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors
}: FormStepProps) {
  const handleSelection = (valueRange: string) => {
    console.log('Step 4 - Property Value:', valueRange);
    updateFormData({
      loanDetails: { ...formData.loanDetails, propertyValue: valueRange as any }
    });
    setTimeout(nextStep, 600);
  };

  const propertyValues = [
    { value: 'below-300k', label: 'Below $300,000', icon: '🏘️', description: 'Starter homes & condos' },
    { value: '300k-600k', label: '$300,001 - $600,000', icon: '🏡', description: 'Most popular range' },
    { value: '600k-900k', label: '$600,001 - $900,000', icon: '🏠', description: 'Family homes' },
    { value: '900k-1200k', label: '$900,001 - $1,200,000', icon: '🏘️', description: 'Premium properties' },
    { value: '1200k-1500k', label: '$1,200,001 - $1,500,000', icon: '🏛️', description: 'Luxury homes' },
    { value: '1500k-2000k', label: '$1,500,001 - $2,000,000', icon: '🏰', description: 'High-end properties' },
    { value: 'above-2000k', label: 'More than $2,000,000', icon: '✨', description: 'Ultra-luxury estates' }
  ];

  return (
    <div className="space-y-2 animate-slideInUp">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full mx-auto mb-2 flex items-center justify-center shadow-lg relative group">
            <span className="text-xl">💰</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              Help us estimate your property's current market value
            </div>
          </div>
          <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Property Value
          </h2>
        </div>

        {/* Question */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4 relative group">
            What is the estimated property value?
            <span className="ml-1 text-gray-400 cursor-help">ℹ️</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              Select the range that best matches your property's value
            </div>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {propertyValues.map((value, index) => (
              <button
                key={value.value}
                onClick={() => handleSelection(value.value)}
                className={`group p-6 rounded-2xl border-3 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 hover-lift ${
                  formData.loanDetails.propertyValue === value.value
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-900 shadow-2xl scale-105 ring-4 ring-yellow-200'
                    : 'border-gray-300 hover:border-yellow-400 bg-white hover:bg-yellow-50 text-gray-800 shadow-lg hover:shadow-yellow-500/20'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 ${
                    formData.loanDetails.propertyValue === value.value
                      ? 'bg-yellow-100 group-hover:bg-yellow-200'
                      : 'bg-yellow-100 group-hover:bg-yellow-200'
                  }`}>
                    <span className="text-2xl group-hover:scale-110 transition-transform">{value.icon}</span>
                  </div>

                  <div className="flex-1">
                    <span className="font-bold text-lg block mb-1">{value.label}</span>
                    <span className={`text-sm ${formData.loanDetails.propertyValue === value.value ? 'text-gray-700' : 'text-gray-500'}`}>
                      {value.description}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full border-4 transition-all duration-300 ${
                    formData.loanDetails.propertyValue === value.value
                      ? 'border-yellow-500 bg-yellow-500 shadow-xl'
                      : 'border-gray-400 group-hover:border-yellow-400'
                  }`}>
                    {formData.loanDetails.propertyValue === value.value && (
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {errors.propertyValue && (
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
              <p className="text-red-600 text-lg flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.propertyValue}
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

          {formData.loanDetails.propertyValue && (
            <button
              onClick={() => nextStep()}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-1 ml-4 animate-glow"
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
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Step 4 of 11</span>
            <div className="text-sm text-gray-900">• Making great progress!</div>
          </div>
        </div>
      </div>
  );
}