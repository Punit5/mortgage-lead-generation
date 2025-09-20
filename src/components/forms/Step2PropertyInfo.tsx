import React from 'react';
import { FormStepProps } from '../../types';

export default function Step2PropertyInfo({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors
}: FormStepProps) {
  const handleNext = () => {
    console.log('Step 2 - Property Info:', formData.propertyInfo);
    nextStep();
  };

  const provinces = [
    { code: 'BC', name: 'British Columbia' },
    { code: 'AB', name: 'Alberta' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'ON', name: 'Ontario' },
    { code: 'QC', name: 'Quebec' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'YT', name: 'Yukon' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' }
  ];

  const downPaymentPercent = formData.propertyInfo.propertyValue > 0
    ? (formData.propertyInfo.downPayment / formData.propertyInfo.propertyValue) * 100
    : 0;

  const loanToValue = 100 - downPaymentPercent;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about your property
        </h2>
        <p className="text-gray-600">
          Property details help us calculate accurate payments
        </p>
      </div>

      {/* Property Province */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What province is the property in?
        </label>
        <select
          value={formData.propertyInfo.province}
          onChange={(e) => updateFormData({
            propertyInfo: { ...formData.propertyInfo, province: e.target.value }
          })}
          className={`w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
            errors.province ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
          }`}
        >
          <option value="">Select a province</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name} ({province.code})
            </option>
          ))}
        </select>
        {errors.province && (
          <p className="mt-2 text-red-600 text-sm">{errors.province}</p>
        )}
      </div>

      {/* Property Value */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What's the property value?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-500 text-lg">$</span>
          <input
            type="number"
            value={formData.propertyInfo.propertyValue}
            onChange={(e) => updateFormData({
              propertyInfo: { ...formData.propertyInfo, propertyValue: Number(e.target.value) }
            })}
            className={`w-full pl-10 pr-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.propertyValue ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
            }`}
            placeholder="500,000"
          />
        </div>
        {errors.propertyValue && (
          <p className="mt-2 text-red-600 text-sm">{errors.propertyValue}</p>
        )}
      </div>

      {/* Down Payment */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          How much will you put down?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-500 text-lg">$</span>
          <input
            type="number"
            value={formData.propertyInfo.downPayment}
            onChange={(e) => updateFormData({
              propertyInfo: { ...formData.propertyInfo, downPayment: Number(e.target.value) }
            })}
            className={`w-full pl-10 pr-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.downPayment ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
            }`}
            placeholder="100,000"
          />
          <div className="absolute right-4 top-4 text-lg text-gray-500">
            {downPaymentPercent.toFixed(1)}%
          </div>
        </div>
        {errors.downPayment && (
          <p className="mt-2 text-red-600 text-sm">{errors.downPayment}</p>
        )}

        {/* Down Payment Helper */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <button
            onClick={() => {
              const propertyValue = formData.propertyInfo.propertyValue;
              let downPayment;
              if (propertyValue <= 500000) {
                downPayment = Math.round(propertyValue * 0.05);
              } else {
                downPayment = 25000 + Math.round((propertyValue - 500000) * 0.10);
              }
              updateFormData({
                propertyInfo: { ...formData.propertyInfo, downPayment }
              });
            }}
            className="px-3 py-2 bg-primary-100 text-primary-800 rounded-md hover:bg-primary-200 transition-colors"
          >
            Minimum
          </button>
          <button
            onClick={() => updateFormData({
              propertyInfo: {
                ...formData.propertyInfo,
                downPayment: Math.round(formData.propertyInfo.propertyValue * 0.10)
              }
            })}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            10% Down
          </button>
          <button
            onClick={() => updateFormData({
              propertyInfo: {
                ...formData.propertyInfo,
                downPayment: Math.round(formData.propertyInfo.propertyValue * 0.20)
              }
            })}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            20% Down
          </button>
        </div>
      </div>

      {/* Loan Info Display */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h3 className="font-semibold text-primary-900 mb-2">Loan Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Loan Amount:</span>
            <div className="font-semibold text-primary-800">
              ${(formData.propertyInfo.propertyValue - formData.propertyInfo.downPayment).toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Loan-to-Value:</span>
            <div className="font-semibold text-primary-800">
              {loanToValue.toFixed(1)}%
            </div>
          </div>
        </div>
        {(loanToValue > 80) && (
          <div className="mt-2 text-xs text-orange-600">
            ⚠️ PMI may be required (LTV greater than 80%)
          </div>
        )}
      </div>

      {/* First Time Home Buyer */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Are you a first-time home buyer?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateFormData({
              propertyInfo: { ...formData.propertyInfo, firstTimeHomeBuyer: true }
            })}
            className={`p-4 rounded-lg border-2 text-center transition-colors ${
              formData.propertyInfo.firstTimeHomeBuyer
                ? 'border-primary-500 bg-primary-50 text-primary-900'
                : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            <div className="font-medium">Yes</div>
            <div className="text-sm text-gray-600">Special programs available</div>
          </button>
          <button
            onClick={() => updateFormData({
              propertyInfo: { ...formData.propertyInfo, firstTimeHomeBuyer: false }
            })}
            className={`p-4 rounded-lg border-2 text-center transition-colors ${
              !formData.propertyInfo.firstTimeHomeBuyer
                ? 'border-primary-500 bg-primary-50 text-primary-900'
                : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            <div className="font-medium">No</div>
            <div className="text-sm text-gray-600">Regular programs</div>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={prevStep}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-900 transition-colors shadow-lg hover:shadow-xl"
        >
          Continue to Personal Info
        </button>
      </div>
    </div>
  );
}