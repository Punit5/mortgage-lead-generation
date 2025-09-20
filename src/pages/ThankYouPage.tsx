import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ThankYouPage() {
  const { state } = useApp();
  const { formData } = state;

  useEffect(() => {
    // Here you would typically send the final form data to your backend/CRM
    console.log('Final Lead Submission:', formData);
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You, {formData.personalInfo.firstName}!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your mortgage application has been submitted successfully.
          </p>

          {/* What's Next Section */}
          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary-900 mb-4">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Rate Quotes</h3>
                <p className="text-sm text-gray-600">
                  You'll receive personalized rate quotes from multiple lenders within 24 hours
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Contact</h3>
                <p className="text-sm text-gray-600">
                  A licensed loan officer will call you to discuss your options and answer questions
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Final Approval</h3>
                <p className="text-sm text-gray-600">
                  Complete your application and get final approval for your mortgage
                </p>
              </div>
            </div>
          </div>

          {/* Application Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Loan Amount:</span>
                  <span className="ml-2">${formData.loanDetails.amount.toLocaleString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Property Type:</span>
                  <span className="ml-2 capitalize">{formData.loanDetails.propertyType.replace('-', ' ')}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Loan Purpose:</span>
                  <span className="ml-2 capitalize">{formData.loanDetails.purpose.replace('-', ' ')}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Timeline:</span>
                  <span className="ml-2 capitalize">{formData.loanDetails.timeline.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="text-left">
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Property Value:</span>
                  <span className="ml-2">${formData.propertyInfo.propertyValue.toLocaleString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Down Payment:</span>
                  <span className="ml-2">${formData.propertyInfo.downPayment.toLocaleString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2">{formData.personalInfo.email}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="ml-2">{formData.personalInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Immediate Assistance?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900">Call Us</div>
                  <div className="text-blue-600">(604) 555-MORT</div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900">Email Us</div>
                  <div className="text-blue-600">support@mortgagepro.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link
              to="/refinance"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-semibold text-gray-900 mb-1">Refinance Calculator</div>
              <div className="text-sm text-gray-600">Calculate potential savings</div>
            </Link>

            <Link
              to="/first-time-buyer"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-gray-900 mb-1">Buyer Resources</div>
              <div className="text-sm text-gray-600">First-time buyer guide</div>
            </Link>

            <Link
              to="/"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">🧮</div>
              <div className="font-semibold text-gray-900 mb-1">Payment Calculator</div>
              <div className="text-sm text-gray-600">Estimate monthly payments</div>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600 mb-4">
              Join thousands of satisfied customers who found their perfect mortgage with MortgagePro
            </p>
            <div className="flex justify-center items-center space-x-8 text-xs text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                BBB A+ Rating
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                5-Star Reviews
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure & Licensed
              </div>
            </div>
          </div>

          {/* Return Home Button */}
          <div className="mt-8">
            <Link
              to="/"
              className="bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-900 transition-colors shadow-md hover:shadow-lg"
            >
              Return to Homepage
            </Link>
          </div>
        </div>

        {/* Email Confirmation Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            📧 A confirmation email has been sent to <strong>{formData.personalInfo.email}</strong>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Didn't receive it? Check your spam folder or contact us at support@mortgagepro.com
          </p>
        </div>
      </div>
    </div>
  );
}