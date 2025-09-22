import React from 'react';
import { FormStepProps } from '../../types';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Step10Province({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  errors,
  setErrors
}: FormStepProps) {
  const { nextStep: directNextStep } = useApp();
  const { t } = useLanguage();
  const handleSelection = (province: string) => {
    console.log('Step 10 - Province:', province);
    updateFormData({
      loanDetails: { ...formData.loanDetails, province: province as any }
    });
    setErrors({});
    setTimeout(() => {
      setErrors({});
      directNextStep();
    }, 600);
  };

  const provinces = [
    { value: 'alberta', label: 'Alberta', icon: '🏔️', description: 'AB - Wild Rose Country' },
    { value: 'british-columbia', label: 'British Columbia', icon: '🌲', description: 'BC - Beautiful British Columbia' },
    { value: 'manitoba', label: 'Manitoba', icon: '🌾', description: 'MB - Friendly Manitoba' },
    { value: 'new-brunswick', label: 'New Brunswick', icon: '🦞', description: 'NB - Picture Province' },
    { value: 'newfoundland-labrador', label: 'Newfoundland and Labrador', icon: '🏔️', description: 'NL - The Rock' },
    { value: 'northwest-territories', label: 'Northwest Territories', icon: '❄️', description: 'NT - Spectacular' },
    { value: 'nova-scotia', label: 'Nova Scotia', icon: '⚓', description: 'NS - Ocean Playground' },
    { value: 'nunavut', label: 'Nunavut', icon: '🐻‍❄️', description: 'NU - Our Land' },
    { value: 'ontario', label: 'Ontario', icon: '🏢', description: 'ON - Yours to Discover' },
    { value: 'prince-edward-island', label: 'Prince Edward Island', icon: '🦐', description: 'PE - Gentle Island' },
    { value: 'quebec', label: 'Quebec', icon: '🍁', description: 'QC - Je me souviens' },
    { value: 'saskatchewan', label: 'Saskatchewan', icon: '🌾', description: 'SK - Land of Living Skies' },
    { value: 'yukon', label: 'Yukon', icon: '🗻', description: 'YT - Larger Than Life' }
  ];

  return (
    <div className="space-y-2 animate-slideInUp">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-1 flex items-center justify-center shadow-lg relative group">
          <span className="text-xl">🇨🇦</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
{t('step10.tooltip')}
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent">
          {t('step10.title')}
        </h2>
      </div>

      {/* Question */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4 relative group">
          {t('step10.question')}
          <span className="ml-1 text-gray-400 cursor-help">ℹ️</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            {t('step10.questionTooltip')}
          </div>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {provinces.map((province, index) => (
            <button
              key={province.value}
              onClick={() => handleSelection(province.value)}
              className={`group w-full p-4 rounded-xl border-2 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-xl active:scale-95 hover-lift ${
                formData.loanDetails.province === province.value
                  ? 'border-red-400 bg-gradient-to-br from-red-50 to-red-50 text-gray-900 shadow-2xl scale-105 ring-4 ring-red-200'
                  : 'border-gray-300 hover:border-red-400 bg-white hover:bg-red-50 text-gray-800 shadow-lg hover:shadow-red-500/20'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                  formData.loanDetails.province === province.value
                    ? 'bg-red-100 group-hover:bg-red-200'
                    : 'bg-red-100 group-hover:bg-red-200'
                }`}>
                  <span className="text-xl group-hover:scale-110 transition-transform">{province.icon}</span>
                </div>

                <div className="mb-3">
                  <span className="font-bold text-lg block mb-1">{province.label}</span>
                  <span className={`text-xs ${formData.loanDetails.province === province.value ? 'text-gray-700' : 'text-gray-400'}`}>
                    {province.description}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 mx-auto ${
                  formData.loanDetails.province === province.value
                    ? 'border-red-500 bg-red-500 shadow-xl'
                    : 'border-gray-400 group-hover:border-red-400'
                }`}>
                  {formData.loanDetails.province === province.value && (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center animate-bounce">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {errors.province && (
          <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
            <p className="text-red-600 text-lg flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.province}
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
{t('common.back')}
          </span>
        </button>

        {formData.loanDetails.province && (
          <button
            onClick={() => nextStep()}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-1 ml-4 animate-glow"
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
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-medium">{t('common.stepProgress', { current: 9, total: 10 })}</span>
          <div className="text-sm text-gray-900">• {t('step10.progress')}</div>
        </div>
      </div>
    </div>
  );
}