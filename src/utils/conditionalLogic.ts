import { FormData } from '../types';

export interface ConditionalField {
  fieldName: string;
  showWhen: (formData: FormData) => boolean;
  requiredWhen?: (formData: FormData) => boolean;
  defaultValue?: any;
  helpText?: string;
}

export interface FormStep {
  stepNumber: number;
  title: string;
  subtitle?: string;
  fields: ConditionalField[];
  showWhen?: (formData: FormData) => boolean;
  estimatedTime?: number; // in minutes
}

// Define conditional logic for different form paths
export const conditionalFields: ConditionalField[] = [
  // Show rental income field only for multi-family properties
  {
    fieldName: 'rentalIncome',
    showWhen: (data) => data.loanDetails.propertyType === 'multi-family',
    requiredWhen: (data) => data.loanDetails.propertyType === 'multi-family',
    defaultValue: 0,
    helpText: 'Monthly rental income from additional units'
  },

  // Show current mortgage fields based on mortgage status
  {
    fieldName: 'currentMortgageBalance',
    showWhen: (data) => data.loanDetails.currentMortgages === 'one-mortgage' || data.loanDetails.currentMortgages === 'two-mortgages',
    requiredWhen: (data) => data.loanDetails.currentMortgages === 'one-mortgage' || data.loanDetails.currentMortgages === 'two-mortgages',
    defaultValue: 0,
    helpText: 'Remaining balance on your current mortgage'
  },

  {
    fieldName: 'currentInterestRate',
    showWhen: (data) => data.loanDetails.currentMortgages === 'one-mortgage' || data.loanDetails.currentMortgages === 'two-mortgages',
    requiredWhen: (data) => data.loanDetails.currentMortgages === 'one-mortgage' || data.loanDetails.currentMortgages === 'two-mortgages',
    defaultValue: 5.5,
    helpText: 'Current mortgage interest rate (%)'
  },

  {
    fieldName: 'secondMortgageBalance',
    showWhen: (data) => data.loanDetails.currentMortgages === 'two-mortgages',
    requiredWhen: (data) => data.loanDetails.currentMortgages === 'two-mortgages',
    defaultValue: 0,
    helpText: 'Balance on your second mortgage'
  },

  // Show employment details based on employment status
  {
    fieldName: 'employerName',
    showWhen: (data) => data.financialInfo.employmentStatus === 'employed',
    requiredWhen: (data) => data.financialInfo.employmentStatus === 'employed',
    helpText: 'Name of your current employer'
  },

  {
    fieldName: 'selfEmploymentYears',
    showWhen: (data) => data.financialInfo.employmentStatus === 'self-employed',
    requiredWhen: (data) => data.financialInfo.employmentStatus === 'self-employed',
    defaultValue: 2,
    helpText: 'How many years have you been self-employed?'
  },

  {
    fieldName: 'businessIncome',
    showWhen: (data) => data.financialInfo.employmentStatus === 'self-employed',
    requiredWhen: (data) => data.financialInfo.employmentStatus === 'self-employed',
    defaultValue: 0,
    helpText: 'Average annual business income (last 2 years)'
  },

  // Show additional info for first-time buyers
  {
    fieldName: 'firstTimeBuyerPrograms',
    showWhen: (data) => data.propertyInfo.firstTimeHomeBuyer === true,
    helpText: 'You may qualify for first-time buyer programs and incentives'
  },

  // Show co-applicant fields for joint applications
  {
    fieldName: 'hasCoApplicant',
    showWhen: (data) => data.loanDetails.loanPurpose === 'home-improvement' || data.loanDetails.loanPurpose === 'investment-purposes',
    helpText: 'Will someone else be on the mortgage application?'
  },

  {
    fieldName: 'coApplicantIncome',
    showWhen: (data) => (data as any).hasCoApplicant === true,
    requiredWhen: (data) => (data as any).hasCoApplicant === true,
    defaultValue: 0,
    helpText: 'Co-applicant annual income'
  },

  // Show asset information for high-value properties
  {
    fieldName: 'liquidAssets',
    showWhen: (data) => data.propertyInfo.propertyValue > 1000000,
    helpText: 'Total liquid assets (savings, investments, etc.)'
  },

  // Show high-priority fields based on loan purpose urgency
  {
    fieldName: 'preApprovalNeeded',
    showWhen: (data) => data.loanDetails.loanPurpose === 'home-improvement' || data.loanDetails.loanPurpose === 'debt-consolidation',
    defaultValue: true,
    helpText: 'Pre-approval recommended for your loan purpose'
  }
];

// Dynamic form steps based on user selections
export function getFormSteps(formData: FormData): FormStep[] {
  const baseSteps: FormStep[] = [
    {
      stepNumber: 1,
      title: 'Loan Details',
      subtitle: 'Tell us about your loan needs',
      fields: [
        { fieldName: 'isHomeowner', showWhen: () => true },
        { fieldName: 'propertyType', showWhen: () => true },
        { fieldName: 'propertyUsage', showWhen: () => true },
        { fieldName: 'propertyValue', showWhen: () => true },
        { fieldName: 'currentMortgages', showWhen: () => true },
        { fieldName: 'loanAmount', showWhen: () => true },
        { fieldName: 'loanPurpose', showWhen: () => true },
        { fieldName: 'creditHistory', showWhen: () => true },
        { fieldName: 'creditScore', showWhen: () => true },
        { fieldName: 'province', showWhen: () => true }
      ],
      estimatedTime: 2
    },
    {
      stepNumber: 2,
      title: 'Property Information',
      subtitle: 'Details about your property',
      fields: [
        { fieldName: 'province', showWhen: () => true },
        { fieldName: 'propertyValue', showWhen: () => true },
        { fieldName: 'downPayment', showWhen: () => true },
        { fieldName: 'firstTimeHomeBuyer', showWhen: () => true }
      ],
      estimatedTime: 3
    },
    {
      stepNumber: 3,
      title: 'Personal Information',
      subtitle: 'Your contact details',
      fields: [
        { fieldName: 'firstName', showWhen: () => true },
        { fieldName: 'lastName', showWhen: () => true },
        { fieldName: 'email', showWhen: () => true },
        { fieldName: 'phone', showWhen: () => true }
      ],
      estimatedTime: 2
    },
    {
      stepNumber: 4,
      title: 'Financial Information',
      subtitle: 'Income and employment details',
      fields: [
        { fieldName: 'creditScore', showWhen: () => true },
        { fieldName: 'annualIncome', showWhen: () => true },
        { fieldName: 'employmentStatus', showWhen: () => true },
        { fieldName: 'monthlyDebts', showWhen: () => true }
      ],
      estimatedTime: 3
    }
  ];

  // Add conditional steps based on form data
  const conditionalSteps: FormStep[] = [];

  // Add mortgage details step for existing mortgages
  if (formData.loanDetails.currentMortgages === 'one-mortgage' || formData.loanDetails.currentMortgages === 'two-mortgages') {
    conditionalSteps.push({
      stepNumber: 2.5,
      title: 'Current Mortgage Details',
      subtitle: 'Information about your existing mortgage(s)',
      fields: [
        { fieldName: 'currentMortgageBalance', showWhen: () => true },
        { fieldName: 'currentInterestRate', showWhen: () => true },
        { fieldName: 'monthlyPayment', showWhen: () => true }
      ],
      estimatedTime: 2
    });
  }

  // Add employment details step for self-employed
  if (formData.financialInfo.employmentStatus === 'self-employed') {
    conditionalSteps.push({
      stepNumber: 4.5,
      title: 'Self-Employment Details',
      subtitle: 'Additional information for self-employed applicants',
      fields: [
        { fieldName: 'businessName', showWhen: () => true },
        { fieldName: 'businessType', showWhen: () => true },
        { fieldName: 'selfEmploymentYears', showWhen: () => true },
        { fieldName: 'businessIncome', showWhen: () => true }
      ],
      estimatedTime: 3
    });
  }

  // Add co-applicant step if needed
  if ((formData as any).hasCoApplicant) {
    conditionalSteps.push({
      stepNumber: 3.5,
      title: 'Co-Applicant Information',
      subtitle: 'Details about your co-applicant',
      fields: [
        { fieldName: 'coApplicantName', showWhen: () => true },
        { fieldName: 'coApplicantIncome', showWhen: () => true },
        { fieldName: 'coApplicantEmployment', showWhen: () => true }
      ],
      estimatedTime: 2
    });
  }

  return [...baseSteps, ...conditionalSteps].sort((a, b) => a.stepNumber - b.stepNumber);
}

// Check if a field should be shown
export function shouldShowField(fieldName: string, formData: FormData): boolean {
  const field = conditionalFields.find(f => f.fieldName === fieldName);
  return field ? field.showWhen(formData) : true;
}

// Check if a field is required
export function isFieldRequired(fieldName: string, formData: FormData): boolean {
  const field = conditionalFields.find(f => f.fieldName === fieldName);
  return field?.requiredWhen ? field.requiredWhen(formData) : false;
}

// Get help text for a field
export function getFieldHelpText(fieldName: string, formData: FormData): string | undefined {
  const field = conditionalFields.find(f => f.fieldName === fieldName);
  return field?.helpText;
}

// Calculate total estimated time for form completion
export function calculateEstimatedTime(formData: FormData): number {
  const steps = getFormSteps(formData);
  return steps.reduce((total, step) => total + (step.estimatedTime || 0), 0);
}

// Get dynamic suggestions based on form data
export function getDynamicSuggestions(formData: FormData) {
  const suggestions: string[] = [];

  // Down payment suggestions
  const downPaymentPercent = (formData.propertyInfo.downPayment / formData.propertyInfo.propertyValue) * 100;
  if (downPaymentPercent < 20) {
    suggestions.push('Consider saving for a 20% down payment to avoid mortgage insurance');
  }

  // Loan purpose suggestions
  if (formData.loanDetails.loanPurpose === 'home-improvement') {
    suggestions.push('Home improvement loans may have different requirements and rates');
  }

  if (formData.loanDetails.loanPurpose === 'debt-consolidation') {
    suggestions.push('Debt consolidation can help simplify your finances and potentially reduce payments');
  }

  // Credit score suggestions
  if (formData.loanDetails.creditScore === 'fair-600-659' || formData.loanDetails.creditScore === 'needs-work-599') {
    suggestions.push('Improving your credit score could help you qualify for better rates');
  }

  // Credit history suggestions
  if (formData.loanDetails.creditHistory && formData.loanDetails.creditHistory !== 'none') {
    suggestions.push('Past credit issues may affect rates - we can help find suitable lenders');
  }

  // Property type suggestions
  if (formData.loanDetails.propertyType === 'multi-family') {
    suggestions.push('Multi-family properties may qualify for rental income consideration');
  }

  // First-time buyer suggestions
  if (formData.propertyInfo.firstTimeHomeBuyer) {
    suggestions.push('You may qualify for first-time buyer programs and incentives in BC');
  }

  return suggestions;
}

// Smart field pre-population based on previous answers
export function getSmartFieldValue(fieldName: string, formData: FormData): any {
  switch (fieldName) {
    case 'monthlyPayment':
      // Calculate estimated monthly payment for existing mortgages
      if (formData.loanDetails.currentMortgages === 'one-mortgage' || formData.loanDetails.currentMortgages === 'two-mortgages') {
        // Estimate based on property value and typical loan amounts
        const estimatedLoanAmount = formData.propertyInfo.propertyValue * 0.7; // Rough estimate
        const rate = 0.0589; // Current 5-year rate
        const monthlyRate = rate / 12;
        const numPayments = 25 * 12;
        return Math.round(estimatedLoanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments)));
      }
      break;

    case 'businessIncome':
      // Suggest business income based on employment status
      if (formData.financialInfo.employmentStatus === 'self-employed') {
        return Math.round(formData.financialInfo.annualIncome * 0.8); // Conservative estimate
      }
      break;

    case 'coApplicantIncome':
      // Suggest co-applicant income based on property value
      const remainingIncome = (formData.propertyInfo.propertyValue * 0.39 / 12) - (formData.financialInfo.annualIncome / 12);
      return Math.max(0, Math.round(remainingIncome * 12));

    default:
      const field = conditionalFields.find(f => f.fieldName === fieldName);
      return field?.defaultValue;
  }
}

// Validation rules that change based on form state
export function getConditionalValidationRules(fieldName: string, formData: FormData) {
  const rules: any = {};

  switch (fieldName) {
    case 'downPayment':
      // Different down payment rules based on property value
      const propertyValue = formData.propertyInfo.propertyValue;
      if (propertyValue <= 500000) {
        rules.min = propertyValue * 0.05; // 5% minimum
      } else if (propertyValue <= 1000000) {
        rules.min = 25000 + (propertyValue - 500000) * 0.10; // 5% + 10%
      } else {
        rules.min = propertyValue * 0.20; // 20% minimum
      }
      rules.max = propertyValue * 0.95; // Max 95%
      break;

    case 'loanAmount':
      // Validate loan amount ranges
      switch (formData.loanDetails.loanAmount) {
        case 'below-25k':
          rules.min = 0;
          rules.max = 25000;
          break;
        case '25k-50k':
          rules.min = 25000;
          rules.max = 50000;
          break;
        case '50k-75k':
          rules.min = 50000;
          rules.max = 75000;
          break;
        case '75k-100k':
          rules.min = 75000;
          rules.max = 100000;
          break;
        case '100k-200k':
          rules.min = 100000;
          rules.max = 200000;
          break;
        case 'above-200k':
          rules.min = 200000;
          break;
      }
      break;

    case 'selfEmploymentYears':
      rules.min = 2; // Minimum 2 years for most lenders
      break;
  }

  return rules;
}