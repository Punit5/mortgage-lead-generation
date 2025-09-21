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

  if (formData.loanDetails.isHomeowner === undefined) {
    errors.isHomeowner = 'Please select if you are a homeowner';
  }

  return errors;
}

export function validateStep2(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.loanDetails.propertyType) {
    errors.propertyType = 'Please select a property type';
  }

  return errors;
}

export function validateStep3(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.loanDetails.propertyUsage) {
    errors.propertyUsage = 'Please select property usage';
  }

  return errors;
}

export function validateStep4(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.loanDetails.propertyValue) {
    errors.propertyValue = 'Please select property value range';
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
    case 5:
      return validateStep5(formData);
    case 6:
      return validateStep6(formData);
    case 7:
      return validateStep7(formData);
    case 8:
      return validateStep8(formData);
    case 9:
      return validateStep9(formData);
    case 10:
      return validateStep10(formData);
    case 11:
      return validateStep11(formData);
    default:
      return {};
  }
}

export function validateStep5(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!formData.loanDetails.currentMortgages) {
    errors.currentMortgages = 'Please select current mortgages status';
  }
  return errors;
}

export function validateStep6(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!formData.loanDetails.loanAmount) {
    errors.loanAmount = 'Please select loan amount range';
  }
  return errors;
}

export function validateStep7(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!formData.loanDetails.loanPurpose) {
    errors.loanPurpose = 'Please select loan purpose';
  }
  return errors;
}

export function validateStep8(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!formData.loanDetails.creditHistory) {
    errors.creditHistory = 'Please select credit history option';
  }
  return errors;
}

export function validateStep9(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!formData.loanDetails.creditScore) {
    errors.creditScore = 'Please select credit score range';
  }
  return errors;
}

export function validateStep10(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!formData.loanDetails.province) {
    errors.province = 'Please select a province';
  }
  return errors;
}

export function validateStep11(formData: FormData): ValidationErrors {
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