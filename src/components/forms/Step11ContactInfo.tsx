import React from 'react';
import { FormStepProps } from '../../types';

export default function Step11ContactInfo({
  formData,
  updateFormData,
  prevStep,
  errors
}: FormStepProps) {
  const handleSubmit = () => {
    console.log('Step 11 - Contact Info Submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="space-y-2">
      <div className="text-center">
        <div className="w-10 h-10 bg-white rounded-full mx-auto mb-1 flex items-center justify-center border border-gray-200 relative group">
          <span className="text-sm">🏠</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Complete the form and one of our team members will be in touch within 24 hours. Signing up won't affect your credit score
          </div>
        </div>
        <h2 className="text-sm font-bold text-gray-800">
          Expert Mortgage & Finance Advice 🇨🇦 • Contact info ℹ️
        </h2>
      </div>

      {/* Contact Form */}
      <div className="space-y-2 max-w-2xl mx-auto">
        {/* First Name */}
        <div className="relative group">
          <label className="block text-gray-800 text-lg font-medium mb-3 flex items-center">
            <span className="text-2xl mr-3">👤</span>
            First name
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.personalInfo.firstName}
              onChange={(e) => updateFormData({
                personalInfo: { ...formData.personalInfo, firstName: e.target.value }
              })}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg input-glow"
              placeholder="Enter your first name"
            />
            {formData.personalInfo.firstName && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.firstName && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.firstName}
              </p>
            </div>
          )}
        </div>

        {/* Last Name */}
        <div className="relative group">
          <label className="block text-gray-800 text-lg font-medium mb-3 flex items-center">
            <span className="text-2xl mr-3">👨‍💼</span>
            Last name
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.personalInfo.lastName}
              onChange={(e) => updateFormData({
                personalInfo: { ...formData.personalInfo, lastName: e.target.value }
              })}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg input-glow"
              placeholder="Enter your last name"
            />
            {formData.personalInfo.lastName && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.lastName && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.lastName}
              </p>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="relative group">
          <label className="block text-gray-800 text-lg font-medium mb-3 flex items-center">
            <span className="text-2xl mr-3">📧</span>
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => updateFormData({
                personalInfo: { ...formData.personalInfo, email: e.target.value }
              })}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg input-glow"
              placeholder="your.email@example.com"
            />
            {formData.personalInfo.email && formData.personalInfo.email.includes('@') && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.email && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="relative group">
          <label className="block text-gray-800 text-lg font-medium mb-3 flex items-center">
            <span className="text-2xl mr-3">📱</span>
            Phone number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) => updateFormData({
                personalInfo: { ...formData.personalInfo, phone: e.target.value }
              })}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg input-glow"
              placeholder="(604) 555-1234"
            />
            {formData.personalInfo.phone && formData.personalInfo.phone.length >= 10 && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.phone && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.phone}
              </p>
            </div>
          )}
          <p className="mt-2 text-gray-600 text-sm">
            📞 We'll use this to provide you with your personalized rate quote
          </p>
        </div>
      </div>

      {/* Terms and Privacy Notice */}
      <div className="text-xs text-gray-600 leading-relaxed">
        <p className="mb-2">
          By clicking submit, you agree to send your info to Blue Pearl Mortgage Group Inc.
          who agrees to use it according to their privacy policy. Instagram will also use it
          subject to our Privacy Policy, including to auto-fill forms for ads. Your information
          may be autofilled into this ad from ads you previously submitted responses to, your
          Instagram profile or any linked Facebook profile.{' '}
          <a href="#" className="text-blue-400 underline">View Meta Privacy Policy</a>.{' '}
          <a href="#" className="text-blue-400 underline">Blue Pearl Mortgage Group Inc.'s Privacy Policy</a>.
        </p>
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

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-1 ml-4 animate-glow group"
        >
          <span className="flex items-center justify-center">
            <span className="text-2xl mr-3">🎉</span>
            Get My FREE Rate Quote!
            <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="text-sm font-normal mt-1 opacity-90">
            No credit check • Instant results
          </div>
        </button>
      </div>

      {/* Completion benefits */}
      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center">
          <span className="text-2xl mr-2">✨</span>
          What happens next?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
          <div className="flex items-start">
            <span className="text-lg mr-2">⚡</span>
            <div>
              <div className="font-semibold">Instant Results</div>
              <div>Get your rate quote immediately</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-lg mr-2">📞</span>
            <div>
              <div className="font-semibold">Expert Contact</div>
              <div>Licensed broker calls within 24hrs</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-lg mr-2">💰</span>
            <div>
              <div className="font-semibold">Best Rates</div>
              <div>Compare offers from multiple lenders</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}