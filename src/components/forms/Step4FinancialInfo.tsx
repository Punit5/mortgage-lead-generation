import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormStepProps } from '../../types';

export default function Step4FinancialInfo({
  formData,
  updateFormData,
  prevStep,
  errors
}: FormStepProps) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Final Form Data:', formData);
    updateFormData({ isComplete: true });
    navigate('/thank-you');
  };

  const creditScoreOptions = [
    { value: 'excellent', label: 'Excellent (740+)', description: 'Best rates available', color: 'green' },
    { value: 'good', label: 'Good (670-739)', description: 'Great rates', color: 'blue' },
    { value: 'fair', label: 'Fair (580-669)', description: 'Competitive rates', color: 'yellow' },
    { value: 'poor', label: 'Poor (Below 580)', description: 'Special programs available', color: 'orange' }
  ];

  const employmentOptions = [
    { value: 'employed', label: 'Employed', icon: '💼' },
    { value: 'self-employed', label: 'Self-Employed', icon: '🏢' },
    { value: 'retired', label: 'Retired', icon: '🏖️' },
    { value: 'unemployed', label: 'Unemployed', icon: '🔍' }
  ];

  const monthlyIncome = formData.financialInfo.annualIncome / 12;
  const debtToIncomeRatio = monthlyIncome > 0 ? (formData.financialInfo.monthlyDebts / monthlyIncome) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Final step: Financial information
        </h2>
        <p className="text-gray-600">
          This helps us find the best loan options for your situation
        </p>
      </div>

      {/* Credit Score */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What's your credit score range?
        </label>
        <div className="space-y-3">
          {creditScoreOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                financialInfo: { ...formData.financialInfo, creditScore: option.value as any }
              })}
              className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                formData.financialInfo.creditScore === option.value
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  option.color === 'green' ? 'bg-green-500' :
                  option.color === 'blue' ? 'bg-blue-500' :
                  option.color === 'yellow' ? 'bg-yellow-500' : 'bg-orange-500'
                }`}></div>
              </div>
            </button>
          ))}
        </div>
        {errors.creditScore && (
          <p className="mt-2 text-red-600 text-sm">{errors.creditScore}</p>
        )}
      </div>

      {/* Annual Income */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What's your annual income?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-500 text-lg">$</span>
          <input
            type="number"
            value={formData.financialInfo.annualIncome}
            onChange={(e) => updateFormData({
              financialInfo: { ...formData.financialInfo, annualIncome: Number(e.target.value) }
            })}
            className={`w-full pl-10 pr-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.annualIncome ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
            }`}
            placeholder="75,000"
          />
        </div>
        {errors.annualIncome && (
          <p className="mt-2 text-red-600 text-sm">{errors.annualIncome}</p>
        )}
        <p className="mt-2 text-sm text-gray-600">
          Include all sources of income (salary, bonuses, investments, etc.)
        </p>
      </div>

      {/* Employment Status */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What's your employment status?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {employmentOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                financialInfo: { ...formData.financialInfo, employmentStatus: option.value as any }
              })}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                formData.financialInfo.employmentStatus === option.value
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.label}</div>
            </button>
          ))}
        </div>
        {errors.employmentStatus && (
          <p className="mt-2 text-red-600 text-sm">{errors.employmentStatus}</p>
        )}
      </div>

      {/* Monthly Debts */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What are your monthly debt payments?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-500 text-lg">$</span>
          <input
            type="number"
            value={formData.financialInfo.monthlyDebts}
            onChange={(e) => updateFormData({
              financialInfo: { ...formData.financialInfo, monthlyDebts: Number(e.target.value) }
            })}
            className={`w-full pl-10 pr-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              errors.monthlyDebts ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
            }`}
            placeholder="1,500"
          />
        </div>
        {errors.monthlyDebts && (
          <p className="mt-2 text-red-600 text-sm">{errors.monthlyDebts}</p>
        )}
        <p className="mt-2 text-sm text-gray-600">
          Include credit cards, auto loans, student loans, etc. (Don't include rent/mortgage)
        </p>
      </div>

      {/* Financial Summary */}
      <div className="bg-primary-50 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-4">Financial Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Monthly Income:</span>
            <div className="font-semibold text-primary-800">
              ${monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Monthly Debts:</span>
            <div className="font-semibold text-primary-800">
              ${formData.financialInfo.monthlyDebts.toLocaleString()}
            </div>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Debt-to-Income Ratio:</span>
            <div className={`font-semibold ${
              debtToIncomeRatio <= 36 ? 'text-green-600' :
              debtToIncomeRatio <= 43 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {debtToIncomeRatio.toFixed(1)}%
              {debtToIncomeRatio <= 36 && ' (Excellent)'}
              {debtToIncomeRatio > 36 && debtToIncomeRatio <= 43 && ' (Good)'}
              {debtToIncomeRatio > 43 && ' (May need review)'}
            </div>
          </div>
        </div>
      </div>

      {/* Urgency Indicator */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-orange-800">
              <strong>⚡ Rates change daily!</strong> Complete your application now to lock in today's rates.
            </p>
          </div>
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
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Get My Rate Quotes! 🚀
        </button>
      </div>
    </div>
  );
}