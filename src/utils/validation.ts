import { FormData, ValidationErrors } from '../types';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  // Canadian phone number formats: (604) 555-1234, 604-555-1234, 604.555.1234, 6045551234
  const phoneRegex = /^(\+1[-.\s]?)?(\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})$/;
  return phoneRegex.test(phone.trim());
}

export function validateRealTimeEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validateRealTimePhone(phone: string): string | null {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  if (!validatePhone(phone)) {
    return 'Please enter a valid Canadian phone number';
  }
  return null;
}

export function validateStep1(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.loanDetails.amount || formData.loanDetails.amount < 50000) {
    errors.amount = 'Loan amount must be at least $50,000';
  }

  if (formData.loanDetails.amount > 2000000) {
    errors.amount = 'Loan amount cannot exceed $2,000,000';
  }

  if (!formData.loanDetails.propertyType) {
    errors.propertyType = 'Please select a property type';
  }

  if (!formData.loanDetails.purpose) {
    errors.purpose = 'Please select a loan purpose';
  }

  return errors;
}

export function validateStep2(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.propertyInfo.province) {
    errors.province = 'Please select a province';
  }

  if (!formData.propertyInfo.propertyValue || formData.propertyInfo.propertyValue < 100000) {
    errors.propertyValue = 'Property value must be at least $100,000';
  }

  if (formData.propertyInfo.downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  }

  if (formData.propertyInfo.downPayment >= formData.propertyInfo.propertyValue) {
    errors.downPayment = 'Down payment must be less than property value';
  }

  const propertyValue = formData.propertyInfo.propertyValue;
  const downPayment = formData.propertyInfo.downPayment;
  const downPaymentPercent = (downPayment / propertyValue) * 100;

  // Canadian minimum down payment rules
  if (propertyValue <= 500000) {
    if (downPaymentPercent < 5) {
      errors.downPayment = 'Minimum down payment is 5% for homes $500,000 and under';
    }
  } else if (propertyValue <= 1000000) {
    const minDownPayment = 25000 + (propertyValue - 500000) * 0.10;
    if (downPayment < minDownPayment) {
      errors.downPayment = 'Minimum down payment is 5% on first $500K and 10% on remaining amount';
    }
  } else {
    if (downPaymentPercent < 20) {
      errors.downPayment = 'Minimum down payment is 20% for homes over $1,000,000';
    }
  }

  return errors;
}

export function validateStep3(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.personalInfo.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.personalInfo.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.personalInfo.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.personalInfo.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.personalInfo.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.personalInfo.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
}

export function validateStep4(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.financialInfo.creditScore) {
    errors.creditScore = 'Please select your credit score range';
  }

  if (!formData.financialInfo.annualIncome || formData.financialInfo.annualIncome < 0) {
    errors.annualIncome = 'Please enter a valid annual income';
  }

  if (formData.financialInfo.annualIncome < 25000) {
    errors.annualIncome = 'Minimum annual income is $25,000';
  }

  if (!formData.financialInfo.employmentStatus) {
    errors.employmentStatus = 'Please select your employment status';
  }

  if (formData.financialInfo.monthlyDebts < 0) {
    errors.monthlyDebts = 'Monthly debts cannot be negative';
  }

  return errors;
}

export function validateFormStep(formData: FormData, step: number): ValidationErrors {
  switch (step) {
    case 1:
      return validateStep1(formData);
    case 2:
      return validateStep2(formData);
    case 3:
      return validateStep3(formData);
    case 4:
      return validateStep4(formData);
    default:
      return {};
  }
}