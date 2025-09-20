// Phone number formatting for Canadian phone numbers
export function formatPhoneNumber(value: string): string {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');

  // Limit to 10 digits for Canadian phone numbers
  const truncated = numbers.substring(0, 10);

  // Format based on length
  if (truncated.length <= 3) {
    return truncated;
  } else if (truncated.length <= 6) {
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
  } else {
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-${truncated.slice(6)}`;
  }
}

// Currency formatting for Canadian dollars
export function formatCurrency(value: string | number): string {
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;

  if (isNaN(numValue)) return '';

  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numValue);
}

// Currency input formatting (removes currency symbols, keeps numbers)
export function formatCurrencyInput(value: string): string {
  // Remove all non-numeric characters except decimal point
  const numbers = value.replace(/[^0-9.]/g, '');

  // Ensure only one decimal point
  const parts = numbers.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }

  return numbers;
}

// Parse currency string to number
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// Format large numbers with commas (for display)
export function formatNumberWithCommas(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '';

  return numValue.toLocaleString('en-CA');
}

// Postal code formatting for Canadian postal codes
export function formatPostalCode(value: string): string {
  // Remove all non-alphanumeric characters and convert to uppercase
  const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

  // Limit to 6 characters
  const truncated = cleaned.substring(0, 6);

  // Format as X#X #X# if we have enough characters
  if (truncated.length >= 4) {
    return `${truncated.slice(0, 3)} ${truncated.slice(3)}`;
  } else {
    return truncated;
  }
}

// Social Insurance Number formatting (for demo purposes - not collected in this form)
export function formatSIN(value: string): string {
  const numbers = value.replace(/\D/g, '');
  const truncated = numbers.substring(0, 9);

  if (truncated.length <= 3) {
    return truncated;
  } else if (truncated.length <= 6) {
    return `${truncated.slice(0, 3)}-${truncated.slice(3)}`;
  } else {
    return `${truncated.slice(0, 3)}-${truncated.slice(3, 6)}-${truncated.slice(6)}`;
  }
}

// Percentage formatting
export function formatPercentage(value: string | number): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '';

  return `${numValue.toFixed(2)}%`;
}

// Credit score range formatting
export function formatCreditScore(score: number): string {
  if (score >= 800) return 'Excellent (800+)';
  if (score >= 740) return 'Very Good (740-799)';
  if (score >= 670) return 'Good (670-739)';
  if (score >= 580) return 'Fair (580-669)';
  return 'Poor (Under 580)';
}

// Real-time input formatting
export function handleCurrencyInput(
  value: string,
  onChange: (formattedValue: string, numericValue: number) => void
): void {
  const formatted = formatCurrencyInput(value);
  const numeric = parseCurrency(formatted);
  onChange(formatted, numeric);
}

export function handlePhoneInput(
  value: string,
  onChange: (formattedValue: string) => void
): void {
  const formatted = formatPhoneNumber(value);
  onChange(formatted);
}