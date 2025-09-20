import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { validateRealTimeEmail, validateRealTimePhone } from '../../utils/validation';
import { formatPhoneNumber } from '../../utils/formatting';

export default function Step3PersonalInfo({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors,
  setErrors
}: FormStepProps) {
  const [localErrors, setLocalErrors] = useState<{[key: string]: string}>({});
  const handleNext = () => {
    console.log('Step 3 - Personal Info:', formData.personalInfo);
    nextStep();
  };

  const handleEmailChange = (email: string) => {
    updateFormData({
      personalInfo: { ...formData.personalInfo, email }
    });

    // Real-time validation
    const emailError = validateRealTimeEmail(email);
    setLocalErrors(prev => ({
      ...prev,
      email: emailError || ''
    }));

    // Clear global error if valid
    if (!emailError) {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handlePhoneChange = (phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);

    updateFormData({
      personalInfo: { ...formData.personalInfo, phone: formattedPhone }
    });

    // Real-time validation
    const phoneError = validateRealTimePhone(formattedPhone);
    setLocalErrors(prev => ({
      ...prev,
      phone: phoneError || ''
    }));

    // Clear global error if valid
    if (!phoneError) {
      const newErrors = { ...errors };
      delete newErrors.phone;
      setErrors(newErrors);
    }
  };

  const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
    updateFormData({
      personalInfo: { ...formData.personalInfo, [field]: value }
    });

    // Clear error once user starts typing
    if (value.trim()) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
      setLocalErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    } else {
      setLocalErrors(prev => ({
        ...prev,
        [field]: `${field === 'firstName' ? 'First' : 'Last'} name is required`
      }));
    }
  };

  // Use local errors if they exist, otherwise use global errors
  const getError = (field: string) => {
    return localErrors[field] || errors[field] || '';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Let's get your contact information
        </h2>
        <p className="text-gray-600">
          We'll use this to send you personalized rate quotes
        </p>
      </div>

      {/* Security Badge */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-800">
              🔒 Your information is secure and will only be used to provide you with loan options
            </p>
          </div>
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            First Name
          </label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleNameChange('firstName', e.target.value)}
            className={`w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              getError('firstName') ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
            }`}
            placeholder="John"
          />
          {getError('firstName') && (
            <p className="mt-2 text-red-600 text-sm">{getError('firstName')}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Last Name
          </label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleNameChange('lastName', e.target.value)}
            className={`w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              getError('lastName') ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
            }`}
            placeholder="Smith"
          />
          {getError('lastName') && (
            <p className="mt-2 text-red-600 text-sm">{getError('lastName')}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Email Address
        </label>
        <input
          type="email"
          value={formData.personalInfo.email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className={`w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
            getError('email') ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
          }`}
          placeholder="john.smith@email.com"
        />
        {getError('email') && (
          <p className="mt-2 text-red-600 text-sm">{getError('email')}</p>
        )}
        <p className="mt-2 text-sm text-gray-600">
          We'll send your personalized rate quotes to this email
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.personalInfo.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className={`w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
            getError('phone') ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
          }`}
          placeholder="(555) 123-4567"
        />
        {getError('phone') && (
          <p className="mt-2 text-red-600 text-sm">{getError('phone')}</p>
        )}
        <p className="mt-2 text-sm text-gray-600">
          Our loan experts may call to discuss your options
        </p>
      </div>

      {/* Benefits Section */}
      <div className="bg-primary-50 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-4">What happens next?</h3>
        <ul className="space-y-3 text-sm text-primary-800">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Get personalized rate quotes from multiple lenders
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No impact on your credit score for rate shopping
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Expert guidance throughout the loan process
          </li>
        </ul>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
        <div>
          <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
            🔒
          </div>
          256-bit SSL Encryption
        </div>
        <div>
          <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
            🏆
          </div>
          A+ BBB Rating
        </div>
        <div>
          <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
            ⭐
          </div>
          5-Star Reviews
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
          Continue to Financial Info
        </button>
      </div>
    </div>
  );
}