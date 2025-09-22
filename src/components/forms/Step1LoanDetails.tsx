import React from 'react';
import { FormStepProps } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../context/AppContext';

export default function Step1LoanDetails({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors,
  setErrors
}: FormStepProps) {
  const { t } = useLanguage();
  const { nextStep: directNextStep } = useApp();

  const handleSelection = (isHomeowner: boolean) => {
    console.log('Step 1 - Is Homeowner:', isHomeowner);
    updateFormData({
      loanDetails: { ...formData.loanDetails, isHomeowner }
    });
    // Clear any existing validation errors immediately
    setErrors({});
    // Use direct nextStep to bypass validation
    setTimeout(() => {
      setErrors({});
      directNextStep(); // This skips the validation in MultiStepForm
    }, 600);
  };

  return (
    <div className="space-y-2 animate-fadeIn">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-1 flex items-center justify-center shadow-lg relative group">
            <span className="text-xl">🏠</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              {t('step1.tooltip')}
            </div>
          </div>
          <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('step1.title')}
          </h2>
        </div>

        {/* Question */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4 relative group">
            {t('step1.question')}
            <span className="ml-1 text-gray-400 cursor-help">ℹ️</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              {t('step1.questionTooltip')}
            </div>
          </h3>

          <div className="space-y-6 max-w-2xl mx-auto">
            <button
              onClick={() => handleSelection(true)}
              className={`group w-full p-8 rounded-2xl border-3 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 ${
                formData.loanDetails.isHomeowner === true
                  ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 text-gray-900 shadow-2xl scale-105 ring-4 ring-green-200'
                  : 'border-gray-300 hover:border-green-400 bg-white hover:bg-green-50 text-gray-800 shadow-lg hover:shadow-green-500/20'
              }`}
            >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mr-6 transition-all duration-300 ${
                  formData.loanDetails.isHomeowner === true
                    ? 'bg-green-100 group-hover:bg-green-200'
                    : 'bg-green-100 group-hover:bg-green-200'
                }`}>
                  <span className="text-4xl group-hover:scale-110 transition-transform">✅</span>
                </div>
                <div>
                  <span className="font-bold text-3xl block mb-2">{t('step1.yes.title')}</span>
                  <span className={`text-lg ${formData.loanDetails.isHomeowner === true ? 'text-gray-700' : 'text-gray-400'}`}>
                    {t('step1.yes.description')}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full border-4 transition-all duration-300 ${
                formData.loanDetails.isHomeowner === true
                  ? 'border-green-500 bg-green-500 shadow-xl'
                  : 'border-gray-400 group-hover:border-green-400'
              }`}>
                {formData.loanDetails.isHomeowner === true && (
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </button>

            <button
              onClick={() => handleSelection(false)}
              className={`group w-full p-8 rounded-2xl border-3 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95 ${
                formData.loanDetails.isHomeowner === false
                  ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 shadow-2xl scale-105 ring-4 ring-blue-200'
                  : 'border-gray-300 hover:border-blue-400 bg-white hover:bg-blue-50 text-gray-800 shadow-lg hover:shadow-blue-500/20'
              }`}
            >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mr-6 transition-all duration-300 ${
                  formData.loanDetails.isHomeowner === false
                    ? 'bg-blue-100 group-hover:bg-blue-200'
                    : 'bg-blue-100 group-hover:bg-blue-200'
                }`}>
                  <span className="text-4xl group-hover:scale-110 transition-transform">🏡</span>
                </div>
                <div>
                  <span className="font-bold text-3xl block mb-2">{t('step1.no.title')}</span>
                  <span className={`text-lg ${formData.loanDetails.isHomeowner === false ? 'text-gray-700' : 'text-gray-400'}`}>
                    {t('step1.no.description')}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full border-4 transition-all duration-300 ${
                formData.loanDetails.isHomeowner === false
                  ? 'border-blue-500 bg-blue-500 shadow-xl'
                  : 'border-gray-400 group-hover:border-blue-400'
              }`}>
                {formData.loanDetails.isHomeowner === false && (
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

          {errors.isHomeowner && (
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
              <p className="text-red-600 text-lg flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.isHomeowner}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <div></div>
          {formData.loanDetails.isHomeowner !== undefined && (
            <button
              onClick={() => nextStep()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-1 max-w-md animate-glow"
            >
              <span className="flex items-center justify-center">
{t('common.continue')}
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
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-medium">{t('common.stepProgress', { current: 1, total: 11 })}</span>
            <div className="text-sm text-gray-900">• {t('step1.timeEstimate')}</div>
          </div>
        </div>
    </div>
  );
}