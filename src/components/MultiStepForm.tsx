import React from 'react';
import { useApp } from '../context/AppContext';
import { validateFormStep } from '../utils/validation';
import ProgressBar from './ProgressBar';
import Step1LoanDetails from './forms/Step1LoanDetails';
import Step2PropertyInfo from './forms/Step2PropertyInfo';
import Step3PropertyUsage from './forms/Step3PropertyUsage';
import Step4PropertyValue from './forms/Step4PropertyValue';
import Step5CurrentMortgages from './forms/Step5CurrentMortgages';
import Step6LoanAmount from './forms/Step6LoanAmount';
import Step7LoanPurpose from './forms/Step7LoanPurpose';
import Step8CreditHistory from './forms/Step8CreditHistory';
import Step9CreditScore from './forms/Step9CreditScore';
import Step10Province from './forms/Step10Province';
import Step11ContactInfo from './forms/Step11ContactInfo';

export default function MultiStepForm() {
  const { state, updateFormData, setErrors, nextStep, prevStep, resetForm } = useApp();
  const { formData, errors } = state;

  const scrollToFirstError = () => {
    setTimeout(() => {
      const errorElement = document.querySelector('.border-red-500');
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  const handleNextStep = () => {
    const stepErrors = validateFormStep(formData, formData.currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      scrollToFirstError();
      return;
    }

    setErrors({});
    nextStep();
  };

  const handlePrevStep = () => {
    setErrors({});
    prevStep();
  };

  const handleResetForm = () => {
    if (window.confirm('Are you sure you want to clear all your selections? This action cannot be undone.')) {
      resetForm();
    }
  };

  const stepProps = {
    formData,
    updateFormData,
    nextStep: handleNextStep,
    prevStep: handlePrevStep,
    errors,
    setErrors
  };

  const renderCurrentStep = () => {
    switch (formData.currentStep) {
      case 1:
        return <Step1LoanDetails {...stepProps} />;
      case 2:
        return <Step2PropertyInfo {...stepProps} />;
      case 3:
        return <Step3PropertyUsage {...stepProps} />;
      case 4:
        return <Step4PropertyValue {...stepProps} />;
      case 5:
        return <Step5CurrentMortgages {...stepProps} />;
      case 6:
        return <Step6LoanAmount {...stepProps} />;
      case 7:
        return <Step7LoanPurpose {...stepProps} />;
      case 8:
        return <Step8CreditHistory {...stepProps} />;
      case 9:
        return <Step9CreditScore {...stepProps} />;
      case 10:
        return <Step10Province {...stepProps} />;
      case 11:
        return <Step11ContactInfo {...stepProps} />;
      default:
        return <Step1LoanDetails {...stepProps} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar
          currentStep={formData.currentStep}
          totalSteps={11}
        />
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {renderCurrentStep()}
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 text-center">
        <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure & Encrypted
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No Credit Impact
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Fast & Free
          </div>
        </div>

        {/* Reset Button - Only show if user has made progress */}
        {(formData.currentStep > 1 || Object.keys(formData.loanDetails || {}).length > 0) && (
          <div className="mt-6">
            <button
              onClick={handleResetForm}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear All Selections
            </button>
          </div>
        )}
      </div>
    </div>
  );
}