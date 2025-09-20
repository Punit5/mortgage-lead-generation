import { MortgageCalculation } from '../types';

export function calculateMortgage(
  loanAmount: number,
  interestRate: number,
  termYears: number,
  propertyValue: number,
  downPayment: number
): MortgageCalculation {
  const principal = loanAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = termYears * 12;

  // Calculate monthly principal & interest
  const monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Estimate property taxes (0.8% annually - BC average)
  const monthlyTaxes = (propertyValue * 0.008) / 12;

  // Estimate homeowners insurance (0.4% annually - Canadian average)
  const monthlyInsurance = (propertyValue * 0.004) / 12;

  // Calculate PMI if down payment is less than 20%
  const loanToValue = (loanAmount / propertyValue) * 100;
  const monthlyPMI = loanToValue > 80 ? (loanAmount * 0.005) / 12 : 0;

  const monthlyPayment = monthlyPI + monthlyTaxes + monthlyInsurance + monthlyPMI;
  const totalInterest = (monthlyPI * numberOfPayments) - principal;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    principalAndInterest: Math.round(monthlyPI),
    taxes: Math.round(monthlyTaxes),
    insurance: Math.round(monthlyInsurance),
    pmi: Math.round(monthlyPMI),
    totalInterest: Math.round(totalInterest),
    loanAmount,
    rate: interestRate,
    term: termYears
  };
}

export function calculateRefinanceSavings(
  currentLoanBalance: number,
  currentRate: number,
  currentTerm: number,
  newRate: number,
  newTerm: number
): {
  currentPayment: number;
  newPayment: number;
  monthlySavings: number;
  totalSavings: number;
} {
  const currentPayment = calculateMortgage(currentLoanBalance, currentRate, currentTerm, currentLoanBalance, 0).principalAndInterest;
  const newPayment = calculateMortgage(currentLoanBalance, newRate, newTerm, currentLoanBalance, 0).principalAndInterest;

  const monthlySavings = currentPayment - newPayment;
  const totalSavings = monthlySavings * (newTerm * 12);

  return {
    currentPayment: Math.round(currentPayment),
    newPayment: Math.round(newPayment),
    monthlySavings: Math.round(monthlySavings),
    totalSavings: Math.round(totalSavings)
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${rate.toFixed(3)}%`;
}