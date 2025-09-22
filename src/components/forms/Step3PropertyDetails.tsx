import React, { useState, useRef } from 'react';
import { FormStepProps } from '../../types';
import { useApp } from '../../context/AppContext';

export default function Step3PropertyDetails({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors,
  setErrors
}: FormStepProps) {
  const { nextStep: directNextStep } = useApp();
  const [currentSection, setCurrentSection] = useState<'value' | 'mortgages'>('value');
  const mortgagesSectionRef = useRef<HTMLDivElement>(null);

  const handlePropertyValueSelection = (valueRange: string) => {
    console.log('Step 3 - Property Value:', valueRange);
    updateFormData({
      loanDetails: { ...formData.loanDetails, propertyValue: valueRange as any }
    });
    setErrors({});
    // Move to mortgages section after selecting value
    setTimeout(() => {
      setCurrentSection('mortgages');
      // Scroll to mortgages section after a brief delay to ensure it's rendered
      setTimeout(() => {
        if (mortgagesSectionRef.current) {
          mortgagesSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }, 300);
  };

  const handleMortgageSelection = (mortgageCount: string) => {
    console.log('Step 3 - Current Mortgages:', mortgageCount);
    updateFormData({
      loanDetails: { ...formData.loanDetails, currentMortgages: mortgageCount as any }
    });
    setErrors({});
    // Auto-advance to next step after both selections
    setTimeout(() => {
      setErrors({});
      directNextStep();
    }, 600);
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

  const mortgageOptions = [
    {
      value: 'paid-off',
      label: "It's Paid Off",
      icon: '✅',
      description: 'No existing mortgage payments'
    },
    {
      value: 'one-mortgage',
      label: 'One Mortgage',
      icon: '🏦',
      description: 'Single mortgage payment'
    },
    {
      value: 'two-mortgages',
      label: 'Two Mortgages',
      icon: '🏦🏦',
      description: 'Multiple mortgage payments'
    }
  ];

  const shouldShowMortgagesSection = currentSection === 'mortgages' || formData.loanDetails.propertyValue;
  const canContinue = formData.loanDetails.propertyValue && formData.loanDetails.currentMortgages;

  return (
    <div className="space-y-2 animate-slideInUp">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full mx-auto mb-1 flex items-center justify-center shadow-lg relative group">
          <span className="text-xl">💰</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Help us understand your property details
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Property Details
        </h2>
        <p className="text-sm text-gray-600 -mt-1">🚀 You're off to a great start!</p>
      </div>

      {/* Property Value Section */}
      <div className={`transition-all duration-500 ${shouldShowMortgagesSection && currentSection === 'mortgages' ? 'opacity-60 scale-95' : ''}`}>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 relative group">
            What is the estimated property value?
            <span className="ml-1 text-gray-400 cursor-help">ℹ️</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              Select the range that best matches your property's value
            </div>
          </h3>
          {formData.loanDetails.propertyValue && (
            <div className="flex items-center justify-center text-green-600 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Selected: {propertyValues.find(v => v.value === formData.loanDetails.propertyValue)?.label}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {propertyValues.map((value, index) => (
            <button
              key={value.value}
              onClick={() => handlePropertyValueSelection(value.value)}
              className={`group p-4 rounded-2xl border-3 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 hover-lift ${
                formData.loanDetails.propertyValue === value.value
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-900 shadow-2xl scale-105 ring-4 ring-yellow-200'
                  : 'border-gray-300 hover:border-yellow-400 bg-white hover:bg-yellow-50 text-gray-800 shadow-lg hover:shadow-yellow-500/20'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-3 transition-all duration-300 ${
                  formData.loanDetails.propertyValue === value.value
                    ? 'bg-yellow-100 group-hover:bg-yellow-200'
                    : 'bg-yellow-100 group-hover:bg-yellow-200'
                }`}>
                  <span className="text-lg group-hover:scale-110 transition-transform">{value.icon}</span>
                </div>

                <div className="flex-1">
                  <span className="font-bold text-sm block mb-1">{value.label}</span>
                  <span className={`text-xs ${formData.loanDetails.propertyValue === value.value ? 'text-gray-700' : 'text-gray-500'}`}>
                    {value.description}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 ${
                  formData.loanDetails.propertyValue === value.value
                    ? 'border-yellow-500 bg-yellow-500 shadow-xl'
                    : 'border-gray-400 group-hover:border-yellow-400'
                }`}>
                  {formData.loanDetails.propertyValue === value.value && (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                      <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
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
          <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
            <p className="text-red-600 text-sm flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.propertyValue}
            </p>
          </div>
        )}
      </div>

      {/* Current Mortgages Section */}
      {shouldShowMortgagesSection && (
        <div className={`transition-all duration-500 ${currentSection === 'mortgages' ? 'animate-slideInUp' : ''}`}>
          <div ref={mortgagesSectionRef} className="text-center mb-6 pt-8">
            <h3 className={`text-xl font-bold text-gray-800 mb-2 relative group ${currentSection === 'mortgages' ? 'animate-pulse' : ''}`}>
              How many mortgages do you have on this property?
              <span className="ml-1 text-gray-400 cursor-help">ℹ️</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                This helps us understand your current financial obligations
              </div>
            </h3>
            {currentSection === 'mortgages' && !formData.loanDetails.currentMortgages && (
              <div className="flex items-center justify-center text-indigo-600 text-sm mb-4 animate-bounce">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Please select your current mortgage situation
              </div>
            )}
            {formData.loanDetails.currentMortgages && (
              <div className="flex items-center justify-center text-green-600 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Selected: {mortgageOptions.find(m => m.value === formData.loanDetails.currentMortgages)?.label}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {mortgageOptions.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleMortgageSelection(option.value)}
                className={`group p-6 rounded-2xl border-3 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 hover-lift ${
                  formData.loanDetails.currentMortgages === option.value
                    ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 shadow-2xl scale-105 ring-4 ring-indigo-200'
                    : 'border-gray-300 hover:border-indigo-400 bg-white hover:bg-indigo-50 text-gray-800 shadow-lg hover:shadow-indigo-500/20'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                  formData.loanDetails.currentMortgages === option.value
                    ? 'bg-indigo-100 group-hover:bg-indigo-200'
                    : 'bg-indigo-100 group-hover:bg-indigo-200'
                }`}>
                  <span className="text-2xl group-hover:scale-110 transition-transform">{option.icon}</span>
                </div>

                <div className="mb-3">
                  <span className="font-bold text-lg block mb-1">{option.label}</span>
                  <span className={`text-xs ${formData.loanDetails.currentMortgages === option.value ? 'text-gray-700' : 'text-gray-400'}`}>
                    {option.description}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 mx-auto ${
                  formData.loanDetails.currentMortgages === option.value
                    ? 'border-indigo-500 bg-indigo-500 shadow-xl'
                    : 'border-gray-400 group-hover:border-indigo-400'
                }`}>
                  {formData.loanDetails.currentMortgages === option.value && (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                      <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {errors.currentMortgages && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
              <p className="text-red-600 text-sm flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.currentMortgages}
              </p>
            </div>
          )}
        </div>
      )}

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

        {canContinue && (
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
      <div className="text-center mt-6">
        <div className="flex items-center justify-center space-x-3 text-gray-600 text-lg">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Step 3 of 8</span>
          <div className="text-sm text-gray-900">• Making great progress!</div>
        </div>
      </div>
    </div>
  );
}