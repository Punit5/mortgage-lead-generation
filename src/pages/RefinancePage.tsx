import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateRefinanceSavings, formatCurrency } from '../utils/calculations';

export default function RefinancePage() {
  const [currentBalance, setCurrentBalance] = useState(450000);
  const [currentRate, setCurrentRate] = useState(7.5);
  const [currentTerm, setCurrentTerm] = useState(25);
  const [newRate, setNewRate] = useState(5.89);
  const [newTerm, setNewTerm] = useState(25);
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Lead form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const savings = calculateRefinanceSavings(currentBalance, currentRate, currentTerm, newRate, newTerm);

  const handleCalculate = () => {
    if (savings.monthlySavings > 0) {
      setShowLeadForm(true);
    }
  };

  const handleSubmitLead = () => {
    const leadData = {
      firstName,
      lastName,
      email,
      phone,
      loanType: 'refinance',
      currentBalance,
      currentRate,
      estimatedSavings: savings.monthlySavings,
      timestamp: new Date().toISOString()
    };

    console.log('Refinance Lead Data:', leadData);
    // Here you would typically send this to your backend/CRM
    alert('Thank you! A loan specialist will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refinance Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you could save by refinancing your mortgage.
            Rates are at competitive levels - calculate your potential savings now.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Why Refinance Now?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lower Monthly Payments</h3>
              <p className="text-gray-600">Reduce your monthly payment and free up cash for other goals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Equity Faster</h3>
              <p className="text-gray-600">Switch to a shorter term and pay off your home sooner</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cash-Out Options</h3>
              <p className="text-gray-600">Access your home equity for renovations or investments</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Savings</h2>

            <div className="space-y-6">
              {/* Current Loan Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Loan</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Loan Balance
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        value={currentBalance}
                        onChange={(e) => setCurrentBalance(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="300,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(Number(e.target.value))}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="8.500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years Remaining
                      </label>
                      <select
                        value={currentTerm}
                        onChange={(e) => setCurrentTerm(Number(e.target.value))}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value={15}>15 years</option>
                        <option value={20}>20 years</option>
                        <option value={25}>25 years</option>
                        <option value={30}>30 years</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Loan Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">New Loan</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={newRate}
                      onChange={(e) => setNewRate(Number(e.target.value))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="7.125"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Term
                    </label>
                    <select
                      value={newTerm}
                      onChange={(e) => setNewTerm(Number(e.target.value))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value={15}>15 years</option>
                      <option value={20}>20 years</option>
                      <option value={30}>30 years</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-primary-800 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-900 transition-colors shadow-md hover:shadow-lg"
              >
                Calculate My Savings
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Savings Display */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Savings</h2>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {formatCurrency(Math.abs(savings.monthlySavings))}
                  </div>
                  <div className="text-lg text-gray-700">
                    {savings.monthlySavings > 0 ? 'Monthly Savings' : 'Monthly Increase'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(savings.currentPayment)}
                    </div>
                    <div className="text-sm text-gray-600">Current Payment</div>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-primary-800">
                      {formatCurrency(savings.newPayment)}
                    </div>
                    <div className="text-sm text-gray-600">New Payment</div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {formatCurrency(Math.abs(savings.totalSavings))}
                    </div>
                    <div className="text-sm text-gray-600">
                      {savings.totalSavings > 0 ? 'Total Savings Over Loan Term' : 'Additional Interest Over Term'}
                    </div>
                  </div>
                </div>

                {savings.monthlySavings > 100 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-yellow-800 font-medium">
                        Great savings potential! Get your personalized quote now.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lead Form */}
            {showLeadForm && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Get Your Official Rate Quote
                </h3>
                <p className="text-gray-600 mb-6">
                  Based on your potential savings of {formatCurrency(savings.monthlySavings)}/month,
                  let's get you connected with a refinance specialist.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

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

                  <button
                    onClick={handleSubmitLead}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Get My Refinance Quote 🚀
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    No obligation. Your information is secure and will only be used to provide you with rate quotes.
                  </p>
                </div>
              </div>
            )}

            {/* CTA if no form shown */}
            {!showLeadForm && (
              <div className="bg-primary-800 text-white rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Ready to Start Saving?</h3>
                <p className="mb-6">Get personalized refinance options from multiple lenders.</p>
                <Link
                  to="/pre-approval"
                  className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
                >
                  Start My Application
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Refinancing Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📉</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Rate & Term</h4>
                <p className="text-sm text-gray-600">Lower your interest rate or change your loan term</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cash-Out</h4>
                <p className="text-sm text-gray-600">Access your home equity for major expenses</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Streamline</h4>
                <p className="text-sm text-gray-600">Simplified process for FHA, VA, and USDA loans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}