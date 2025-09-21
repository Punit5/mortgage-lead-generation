export interface LoanDetails {
  isHomeowner?: boolean;
  propertyType?: 'single-family' | 'townhome' | 'condominium' | 'multi-family';
  propertyUsage?: 'primary-home' | 'secondary-home' | 'rental';
  propertyValue?: 'below-300k' | '300k-600k' | '600k-900k' | '900k-1200k' | '1200k-1500k' | '1500k-2000k' | 'above-2000k';
  currentMortgages?: 'paid-off' | 'one-mortgage' | 'two-mortgages';
  loanAmount?: 'below-25k' | '25k-50k' | '50k-75k' | '75k-100k' | '100k-200k' | 'above-200k';
  loanPurpose?: 'home-improvement' | 'retirement-income' | 'debt-consolidation' | 'investment-purposes';
  creditHistory?: 'bankruptcy' | 'foreclosure' | 'consumer-proposal' | 'none';
  creditScore?: 'excellent-780+' | 'very-good-720-779' | 'good-660-719' | 'fair-600-659' | 'needs-work-599';
  province?: 'alberta' | 'british-columbia' | 'manitoba' | 'ontario' | 'saskatchewan';
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