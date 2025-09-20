export interface LoanDetails {
  amount: number;
  propertyType: 'single-family' | 'condo' | 'townhouse' | 'multi-family';
  purpose: 'purchase' | 'refinance' | 'cash-out-refinance';
  timeline: '30-days' | '60-days' | '90-days' | 'no-rush';
}

export interface PropertyInfo {
  province: string;
  propertyValue: number;
  downPayment: number;
  firstTimeHomeBuyer: boolean;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FinancialInfo {
  creditScore: 'excellent' | 'good' | 'fair' | 'poor';
  annualIncome: number;
  employmentStatus: 'employed' | 'self-employed' | 'retired' | 'unemployed';
  monthlyDebts: number;
}

export interface FormData {
  loanDetails: LoanDetails;
  propertyInfo: PropertyInfo;
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  currentStep: number;
  isComplete: boolean;
}

export interface MortgageCalculation {
  monthlyPayment: number;
  principalAndInterest: number;
  taxes: number;
  insurance: number;
  pmi: number;
  totalInterest: number;
  loanAmount: number;
  rate: number;
  term: number;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  errors: ValidationErrors;
  setErrors: (errors: ValidationErrors) => void;
}