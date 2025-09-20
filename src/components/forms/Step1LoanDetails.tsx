import React from 'react';
import { FormStepProps } from '../../types';
import { formatNumberWithCommas } from '../../utils/formatting';

export default function Step1LoanDetails({
  formData,
  updateFormData,
  nextStep,
  errors,
  setErrors
}: FormStepProps) {
  const handleNext = () => {
    console.log('Step 1 - Loan Details:', formData.loanDetails);
    nextStep();
  };

  const handleAmountChange = (value: string) => {
    // Remove commas and non-numeric characters except decimal point
    const cleanValue = value.replace(/[^\d]/g, '');
    const numericValue = parseInt(cleanValue) || 0;

    updateFormData({
      loanDetails: { ...formData.loanDetails, amount: numericValue }
    });
  };

  const propertyTypes = [
    { value: 'single-family', label: 'Single Family Home', icon: '🏠' },
    { value: 'condo', label: 'Condominium', icon: '🏢' },
    { value: 'townhouse', label: 'Townhouse', icon: '🏘️' },
    { value: 'multi-family', label: 'Multi-Family', icon: '🏠' }
  ];

  const purposes = [
    { value: 'purchase', label: 'Purchase', description: 'Buying a new home' },
    { value: 'refinance', label: 'Refinance', description: 'Lower your rate or payment' },
    { value: 'cash-out-refinance', label: 'Cash-Out Refinance', description: 'Access your equity' }
  ];

  const timelines = [
    { value: '30-days', label: '30 days or less', urgent: true },
    { value: '60-days', label: '30-60 days', popular: true },
    { value: '90-days', label: '60-90 days' },
    { value: 'no-rush', label: 'More than 90 days' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Let's start with your loan details
        </h2>
        <p className="text-gray-600">
          Tell us about the loan you're looking for
        </p>
      </div>

      {/* Loan Amount */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          How much would you like to borrow?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-500 text-lg">$</span>
          <input
            type="text"
            value={formatNumberWithCommas(formData.loanDetails.amount)}
            onChange={(e) => handleAmountChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.amount ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
            }`}
            placeholder="400,000"
          />
        </div>
        {errors.amount && (
          <p className="mt-2 text-red-600 text-sm">{errors.amount}</p>
        )}
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What type of property is this?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFormData({
                loanDetails: { ...formData.loanDetails, propertyType: type.value as any }
              })}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                formData.loanDetails.propertyType === type.value
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{type.icon}</span>
                <span className="font-medium">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
        {errors.propertyType && (
          <p className="mt-2 text-red-600 text-sm">{errors.propertyType}</p>
        )}
      </div>

      {/* Loan Purpose */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What's the purpose of this loan?
        </label>
        <div className="space-y-3">
          {purposes.map((purpose) => (
            <button
              key={purpose.value}
              onClick={() => updateFormData({
                loanDetails: { ...formData.loanDetails, purpose: purpose.value as any }
              })}
              className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                formData.loanDetails.purpose === purpose.value
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <div className="font-medium mb-1">{purpose.label}</div>
              <div className="text-sm text-gray-600">{purpose.description}</div>
            </button>
          ))}
        </div>
        {errors.purpose && (
          <p className="mt-2 text-red-600 text-sm">{errors.purpose}</p>
        )}
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          When do you need this loan?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {timelines.map((timeline) => (
            <button
              key={timeline.value}
              onClick={() => updateFormData({
                loanDetails: { ...formData.loanDetails, timeline: timeline.value as any }
              })}
              className={`p-4 rounded-lg border-2 text-center transition-colors relative ${
                formData.loanDetails.timeline === timeline.value
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              {timeline.urgent && (
                <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  Urgent
                </span>
              )}
              {timeline.popular && (
                <span className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              <span className="font-medium">{timeline.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={handleNext}
          className="bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-900 transition-colors shadow-lg hover:shadow-xl"
        >
          Continue to Property Details
        </button>
      </div>
    </div>
  );
}