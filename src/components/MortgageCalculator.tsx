import React, { useState, useEffect } from 'react';
import { calculateMortgage, formatCurrency, formatPercentage } from '../utils/calculations';
import { MortgageCalculation } from '../types';

interface MortgageCalculatorProps {
  onCalculate?: (calculation: MortgageCalculation) => void;
  initialValues?: {
    loanAmount?: number;
    interestRate?: number;
    termYears?: number;
    propertyValue?: number;
    downPayment?: number;
  };
  compact?: boolean;
}

export default function MortgageCalculator({
  onCalculate,
  initialValues,
  compact = false
}: MortgageCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(initialValues?.loanAmount || 600000);
  const [interestRate, setInterestRate] = useState(initialValues?.interestRate || 5.89);
  const [termYears, setTermYears] = useState(initialValues?.termYears || 25);
  const [propertyValue, setPropertyValue] = useState(initialValues?.propertyValue || 750000);
  const [downPayment, setDownPayment] = useState(initialValues?.downPayment || 150000);
  const [calculation, setCalculation] = useState<MortgageCalculation | null>(null);

  useEffect(() => {
    const newCalculation = calculateMortgage(
      loanAmount,
      interestRate,
      termYears,
      propertyValue,
      downPayment
    );
    setCalculation(newCalculation);
    onCalculate?.(newCalculation);
  }, [loanAmount, interestRate, termYears, propertyValue, downPayment, onCalculate]);

  const downPaymentPercent = propertyValue > 0 ? (downPayment / propertyValue) * 100 : 0;

  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Calculator</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="400,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.001"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="7.125"
            />
          </div>
        </div>

        {calculation && (
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-800">
                {formatCurrency(calculation.monthlyPayment)}
              </div>
              <div className="text-sm text-gray-600">Monthly Payment</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Mortgage Calculator</h3>
        <p className="text-gray-600">Calculate your estimated monthly payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Value
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="500,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="100,000"
              />
              <div className="absolute right-3 top-3 text-sm text-gray-500">
                {downPaymentPercent.toFixed(1)}%
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="400,000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.001"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="7.125"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term
              </label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
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

        {/* Results Section */}
        {calculation && (
          <div className="space-y-6">
            <div className="bg-primary-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary-800 mb-2">
                {formatCurrency(calculation.monthlyPayment)}
              </div>
              <div className="text-lg text-gray-700">Total Monthly Payment</div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Payment Breakdown</h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Principal & Interest</span>
                  <span className="font-medium">{formatCurrency(calculation.principalAndInterest)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Property Taxes</span>
                  <span className="font-medium">{formatCurrency(calculation.taxes)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Homeowners Insurance</span>
                  <span className="font-medium">{formatCurrency(calculation.insurance)}</span>
                </div>

                {calculation.pmi > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">PMI</span>
                    <span className="font-medium">{formatCurrency(calculation.pmi)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 space-y-1">
                <div>Total Interest: {formatCurrency(calculation.totalInterest)}</div>
                <div>Effective Rate: {formatPercentage(calculation.rate)}</div>
                {calculation.pmi > 0 && (
                  <div className="text-orange-600">
                    ⚠️ PMI required (down payment &lt; 20%)
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}