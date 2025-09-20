import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MortgageCalculator from '../components/MortgageCalculator';

export default function FirstTimeBuyerPage() {
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeframe, setTimeframe] = useState('');

  const handleQuickSubmit = () => {
    const leadData = {
      email,
      phone,
      timeframe,
      leadSource: 'first-time-buyer-page',
      timestamp: new Date().toISOString()
    };

    console.log('First-Time Buyer Lead Data:', leadData);
    alert('Thank you! We\'ll send you our First-Time Buyer Guide and a specialist will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Your Dream Home
              <span className="text-yellow-300"> Awaits</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 max-w-4xl mx-auto">
              Get personalized guidance, special first-time buyer programs, and competitive rates
              to make homeownership a reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/pre-approval"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Pre-Approval 🏠
              </Link>
              <button
                onClick={() => setShowQuickForm(true)}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Get Free Guide
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-semibold mb-1">Down to 5% Down</div>
                <div className="text-sm text-green-100">First-time buyer programs in BC</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl mb-2">🎓</div>
                <div className="font-semibold mb-1">Expert Guidance</div>
                <div className="text-sm text-green-100">Dedicated first-time buyer specialists</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold mb-1">Proven Success</div>
                <div className="text-sm text-green-100">Thousands of first-time buyers helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              First-Time Buyer Programs
            </h2>
            <p className="text-xl text-gray-600">
              Special loan programs designed to help first-time buyers achieve homeownership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Ratio Mortgages</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 5% down payment minimum</li>
                <li>• CMHC insurance included</li>
                <li>• Competitive rates</li>
                <li>• Up to $1M purchase price</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇨🇦</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">First-Time Home Buyer</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Home Buyers' Plan (RRSP)</li>
                <li>• First-Time Home Buyer Tax Credit</li>
                <li>• BC Home Owner Grant</li>
                <li>• Shared Equity Programs</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">BC Programs</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• BC Home Partnership Program</li>
                <li>• Property Transfer Tax Exemption</li>
                <li>• New Housing Incentives</li>
                <li>• Rural & Northern Programs</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-Employed Options</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Stated income programs</li>
                <li>• Bank statement verification</li>
                <li>• Alternative documentation</li>
                <li>• Flexible qualification</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Path to Homeownership
            </h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to buy your first home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Pre-Approved</h3>
              <p className="text-gray-600">
                Know your budget and show sellers you're serious about buying
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Your Agent</h3>
              <p className="text-gray-600">
                Work with a trusted real estate agent who understands first-time buyers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">House Hunt</h3>
              <p className="text-gray-600">
                Search for homes within your budget and make competitive offers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Close & Move</h3>
              <p className="text-gray-600">
                Complete the final paperwork and get the keys to your new home
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Much House Can You Afford?
            </h2>
            <p className="text-xl text-gray-600">
              Use our calculator to estimate your homebuying budget
            </p>
          </div>

          <MortgageCalculator />
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Avoid These Common First-Time Buyer Mistakes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Not Getting Pre-Approved</h3>
              <p className="text-gray-600">
                Shopping without pre-approval puts you at a disadvantage and wastes time looking at homes outside your budget.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skipping Home Inspection</h3>
              <p className="text-gray-600">
                Always get a professional inspection to avoid costly surprises after closing.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Forgetting About Closing Costs</h3>
              <p className="text-gray-600">
                Budget for 2-5% of the home price in closing costs, inspections, and moving expenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Lead Form */}
      {showQuickForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Get Your Free First-Time Buyer Guide</h3>
              <button
                onClick={() => setShowQuickForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">When are you looking to buy?</option>
                <option value="immediately">Immediately</option>
                <option value="3-months">Within 3 months</option>
                <option value="6-months">Within 6 months</option>
                <option value="1-year">Within 1 year</option>
                <option value="exploring">Just exploring</option>
              </select>

              <button
                onClick={handleQuickSubmit}
                className="w-full bg-primary-800 text-white py-3 rounded-lg font-semibold hover:bg-primary-900 transition-colors"
              >
                Get Free Guide
              </button>

              <p className="text-xs text-gray-500 text-center">
                We'll send you our comprehensive first-time buyer guide and a specialist will contact you to answer any questions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Homebuying Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get pre-approved today and take the first step toward homeownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pre-approval"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Pre-Approval Process
            </Link>
            <button
              onClick={() => setShowQuickForm(true)}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Download Free Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}