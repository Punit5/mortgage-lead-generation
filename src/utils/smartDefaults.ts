import { FormData } from '../types';

interface LocationData {
  city: string;
  province: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface MarketData {
  averageHomePrice: number;
  averageDownPayment: number;
  averageIncome: number;
  popularPropertyTypes: string[];
  recommendedLoanAmount: number;
}

// BC market data by region
const bcMarketData: Record<string, MarketData> = {
  vancouver: {
    averageHomePrice: 1250000,
    averageDownPayment: 250000,
    averageIncome: 85000,
    popularPropertyTypes: ['condo', 'townhouse'],
    recommendedLoanAmount: 1000000
  },
  'west-vancouver': {
    averageHomePrice: 2800000,
    averageDownPayment: 560000,
    averageIncome: 150000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 2240000
  },
  'north-vancouver': {
    averageHomePrice: 1850000,
    averageDownPayment: 370000,
    averageIncome: 120000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 1480000
  },
  burnaby: {
    averageHomePrice: 1100000,
    averageDownPayment: 220000,
    averageIncome: 75000,
    popularPropertyTypes: ['condo', 'townhouse'],
    recommendedLoanAmount: 880000
  },
  richmond: {
    averageHomePrice: 1300000,
    averageDownPayment: 260000,
    averageIncome: 80000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 1040000
  },
  surrey: {
    averageHomePrice: 950000,
    averageDownPayment: 190000,
    averageIncome: 70000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 760000
  },
  coquitlam: {
    averageHomePrice: 1050000,
    averageDownPayment: 210000,
    averageIncome: 75000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 840000
  },
  langley: {
    averageHomePrice: 900000,
    averageDownPayment: 180000,
    averageIncome: 68000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 720000
  },
  'new-westminster': {
    averageHomePrice: 850000,
    averageDownPayment: 170000,
    averageIncome: 65000,
    popularPropertyTypes: ['condo', 'townhouse'],
    recommendedLoanAmount: 680000
  },
  'port-coquitlam': {
    averageHomePrice: 800000,
    averageDownPayment: 160000,
    averageIncome: 65000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 640000
  },
  'delta': {
    averageHomePrice: 950000,
    averageDownPayment: 190000,
    averageIncome: 70000,
    popularPropertyTypes: ['single-family', 'townhouse'],
    recommendedLoanAmount: 760000
  },
  'white-rock': {
    averageHomePrice: 1200000,
    averageDownPayment: 240000,
    averageIncome: 78000,
    popularPropertyTypes: ['single-family', 'condo'],
    recommendedLoanAmount: 960000
  }
};

// Default BC data for unknown locations
const defaultBCData: MarketData = {
  averageHomePrice: 750000,
  averageDownPayment: 150000,
  averageIncome: 65000,
  popularPropertyTypes: ['single-family', 'condo'],
  recommendedLoanAmount: 600000
};

export async function getUserLocation(): Promise<LocationData | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // In a real app, you'd use a geocoding service
          // For demo, we'll simulate based on coordinates
          const { latitude, longitude } = position.coords;

          // Simulate reverse geocoding for BC
          const locationData = simulateReverseGeocode(latitude, longitude);
          resolve(locationData);
        } catch (error) {
          console.error('Error getting location data:', error);
          resolve(null);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        resolve(null);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  });
}

function simulateReverseGeocode(lat: number, lng: number): LocationData {
  // Vancouver area coordinates simulation
  if (lat >= 49.2 && lat <= 49.3 && lng >= -123.3 && lng <= -123.0) {
    return {
      city: 'Vancouver',
      province: 'BC',
      postalCode: 'V6B 1A1',
      coordinates: { lat, lng }
    };
  }

  // Richmond area
  if (lat >= 49.1 && lat <= 49.2 && lng >= -123.3 && lng <= -123.0) {
    return {
      city: 'Richmond',
      province: 'BC',
      postalCode: 'V7A 2B2',
      coordinates: { lat, lng }
    };
  }

  // Burnaby area
  if (lat >= 49.2 && lat <= 49.3 && lng >= -123.0 && lng <= -122.9) {
    return {
      city: 'Burnaby',
      province: 'BC',
      postalCode: 'V5H 3C3',
      coordinates: { lat, lng }
    };
  }

  // Default to Vancouver for other BC coordinates
  return {
    city: 'Vancouver',
    province: 'BC',
    postalCode: 'V6B 1A1',
    coordinates: { lat, lng }
  };
}

export function getMarketData(city: string): MarketData {
  const normalizedCity = city.toLowerCase().replace(/\s+/g, '-');
  return bcMarketData[normalizedCity] || defaultBCData;
}

export function generateSmartDefaults(
  location?: LocationData | null,
  userPreferences?: Partial<FormData>
): Partial<FormData> {
  const marketData = location ? getMarketData(location.city) : defaultBCData;

  const defaults: Partial<FormData> = {
    loanDetails: {
      isHomeowner: false,
      propertyType: marketData.popularPropertyTypes[0].replace('single-family', 'single-family') as any,
      propertyUsage: 'primary-home',
      propertyValue: '600k-900k',
      currentMortgages: 'paid-off',
      loanAmount: '100k-200k',
      loanPurpose: 'home-improvement',
      creditHistory: 'none',
      creditScore: 'good-660-719',
      province: 'british-columbia'
    },
    propertyInfo: {
      province: location?.province || 'BC',
      propertyValue: marketData.averageHomePrice,
      downPayment: marketData.averageDownPayment,
      firstTimeHomeBuyer: false
    },
    financialInfo: {
      creditScore: 'good',
      annualIncome: marketData.averageIncome,
      employmentStatus: 'employed',
      monthlyDebts: Math.round(marketData.averageIncome * 0.25 / 12) // 25% debt-to-income
    }
  };

  // Apply user preferences if provided
  if (userPreferences) {
    // Start with defaults and selectively override with user preferences
    const result: Partial<FormData> = { ...defaults };

    // Only merge defined values from userPreferences
    if (userPreferences.loanDetails && defaults.loanDetails) {
      result.loanDetails = { ...defaults.loanDetails };
      if (userPreferences.loanDetails.isHomeowner !== undefined) {
        result.loanDetails.isHomeowner = userPreferences.loanDetails.isHomeowner;
      }
      if (userPreferences.loanDetails.propertyType) {
        result.loanDetails.propertyType = userPreferences.loanDetails.propertyType;
      }
      if (userPreferences.loanDetails.propertyUsage) {
        result.loanDetails.propertyUsage = userPreferences.loanDetails.propertyUsage;
      }
      if (userPreferences.loanDetails.propertyValue) {
        result.loanDetails.propertyValue = userPreferences.loanDetails.propertyValue;
      }
      if (userPreferences.loanDetails.currentMortgages) {
        result.loanDetails.currentMortgages = userPreferences.loanDetails.currentMortgages;
      }
      if (userPreferences.loanDetails.loanAmount) {
        result.loanDetails.loanAmount = userPreferences.loanDetails.loanAmount;
      }
      if (userPreferences.loanDetails.loanPurpose) {
        result.loanDetails.loanPurpose = userPreferences.loanDetails.loanPurpose;
      }
      if (userPreferences.loanDetails.creditHistory) {
        result.loanDetails.creditHistory = userPreferences.loanDetails.creditHistory;
      }
      if (userPreferences.loanDetails.creditScore) {
        result.loanDetails.creditScore = userPreferences.loanDetails.creditScore;
      }
      if (userPreferences.loanDetails.province) {
        result.loanDetails.province = userPreferences.loanDetails.province;
      }
    }

    if (userPreferences.propertyInfo && defaults.propertyInfo) {
      result.propertyInfo = { ...defaults.propertyInfo };
      if (userPreferences.propertyInfo.province) {
        result.propertyInfo.province = userPreferences.propertyInfo.province;
      }
      if (userPreferences.propertyInfo.propertyValue !== undefined) {
        result.propertyInfo.propertyValue = userPreferences.propertyInfo.propertyValue;
      }
      if (userPreferences.propertyInfo.downPayment !== undefined) {
        result.propertyInfo.downPayment = userPreferences.propertyInfo.downPayment;
      }
      if (userPreferences.propertyInfo.firstTimeHomeBuyer !== undefined) {
        result.propertyInfo.firstTimeHomeBuyer = userPreferences.propertyInfo.firstTimeHomeBuyer;
      }
    }

    if (userPreferences.financialInfo && defaults.financialInfo) {
      result.financialInfo = { ...defaults.financialInfo };
      if (userPreferences.financialInfo.creditScore) {
        result.financialInfo.creditScore = userPreferences.financialInfo.creditScore;
      }
      if (userPreferences.financialInfo.annualIncome !== undefined) {
        result.financialInfo.annualIncome = userPreferences.financialInfo.annualIncome;
      }
      if (userPreferences.financialInfo.employmentStatus) {
        result.financialInfo.employmentStatus = userPreferences.financialInfo.employmentStatus;
      }
      if (userPreferences.financialInfo.monthlyDebts !== undefined) {
        result.financialInfo.monthlyDebts = userPreferences.financialInfo.monthlyDebts;
      }
    }

    // Include other user preferences that might not be in defaults
    if (userPreferences.currentStep !== undefined) {
      result.currentStep = userPreferences.currentStep;
    }
    if (userPreferences.personalInfo) {
      result.personalInfo = userPreferences.personalInfo;
    }

    return result;
  }

  return defaults;
}

export function getLocationBasedRecommendations(location?: LocationData | null) {
  const marketData = location ? getMarketData(location.city) : defaultBCData;
  const city = location?.city || 'BC';

  return {
    message: `Based on ${city} market data:`,
    recommendations: [
      {
        title: 'Recommended Property Value Range',
        value: '$600K - $900K',
        description: `Typical range for ${city} homebuyers`
      },
      {
        title: 'Typical Down Payment',
        value: `$${marketData.averageDownPayment.toLocaleString()}`,
        description: `${Math.round((marketData.averageDownPayment / marketData.averageHomePrice) * 100)}% of home value`
      },
      {
        title: 'Popular Property Types',
        value: marketData.popularPropertyTypes.map(type =>
          type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
        ).join(', '),
        description: `Most common in ${city}`
      },
      {
        title: 'Income Consideration',
        value: `$${marketData.averageIncome.toLocaleString()}+`,
        description: 'Recommended annual income'
      }
    ]
  };
}

export function calculateAffordability(annualIncome: number, monthlyDebts: number = 0) {
  // Canadian mortgage stress test (5.25% minimum or contract rate + 2%)
  const stressTestRate = 0.0525;
  const maxMonthlyPayment = (annualIncome * 0.39) / 12 - monthlyDebts; // 39% GDS ratio

  // Calculate maximum mortgage amount (25-year amortization)
  const monthlyRate = stressTestRate / 12;
  const numPayments = 25 * 12;
  const maxMortgage = maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;

  return {
    maxMonthlyPayment: Math.round(maxMonthlyPayment),
    maxMortgageAmount: Math.round(maxMortgage),
    recommendedDownPayment: Math.round(maxMortgage * 0.2), // 20% down payment
    maxHomePrice: Math.round(maxMortgage * 1.2) // Mortgage + 20% down
  };
}

// Auto-detect user's preferences from browser/device
export function detectUserPreferences() {
  const preferences: any = {};

  // Detect timezone to infer general location
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone.includes('Vancouver') || timezone.includes('Pacific')) {
    preferences.probableLocation = 'BC';
  }

  // Detect language preference
  const language = navigator.language || 'en-CA';
  preferences.language = language;

  // Detect if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  preferences.isMobile = isMobile;

  return preferences;
}