import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { FormData, ValidationErrors } from '../types';

interface AppState {
  formData: FormData;
  errors: ValidationErrors;
  isLoading: boolean;
  currentRates: {
    fiveYear: number;
    threeYear: number;
    oneYear: number;
  };
}

type AppAction =
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<FormData> }
  | { type: 'SET_ERRORS'; payload: ValidationErrors }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_SAVED_DATA'; payload: FormData };

const initialState: AppState = {
  formData: {
    loanDetails: {
      amount: 600000,
      propertyType: 'single-family',
      purpose: 'purchase',
      timeline: '60-days'
    },
    propertyInfo: {
      province: '',
      propertyValue: 750000,
      downPayment: 150000,
      firstTimeHomeBuyer: false
    },
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    financialInfo: {
      creditScore: 'good',
      annualIncome: 75000,
      employmentStatus: 'employed',
      monthlyDebts: 1500
    },
    currentStep: 1,
    isComplete: false
  },
  errors: {},
  isLoading: false,
  currentRates: {
    fiveYear: 5.89,
    threeYear: 6.14,
    oneYear: 7.04
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'NEXT_STEP':
      return {
        ...state,
        formData: {
          ...state.formData,
          currentStep: Math.min(state.formData.currentStep + 1, 4)
        }
      };
    case 'PREV_STEP':
      return {
        ...state,
        formData: {
          ...state.formData,
          currentStep: Math.max(state.formData.currentStep - 1, 1)
        }
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: initialState.formData,
        errors: {}
      };
    case 'LOAD_SAVED_DATA':
      return {
        ...state,
        formData: action.payload
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  updateFormData: (updates: Partial<FormData>) => void;
  setErrors: (errors: ValidationErrors) => void;
  setLoading: (loading: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  saveProgress: () => void;
  loadSavedProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved progress on mount
  useEffect(() => {
    const savedData = localStorage.getItem('mortgageFormProgress');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Auto-save progress whenever form data changes
  useEffect(() => {
    if (state.formData.currentStep > 1 ||
        state.formData.personalInfo.firstName ||
        state.formData.personalInfo.email) {
      localStorage.setItem('mortgageFormProgress', JSON.stringify(state.formData));
    }
  }, [state.formData]);

  const updateFormData = (updates: Partial<FormData>) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: updates });
  };

  const setErrors = (errors: ValidationErrors) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const resetForm = () => {
    localStorage.removeItem('mortgageFormProgress');
    dispatch({ type: 'RESET_FORM' });
  };

  const saveProgress = () => {
    localStorage.setItem('mortgageFormProgress', JSON.stringify(state.formData));
  };

  const loadSavedProgress = () => {
    const savedData = localStorage.getItem('mortgageFormProgress');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  };

  const value: AppContextType = {
    state,
    updateFormData,
    setErrors,
    setLoading,
    nextStep,
    prevStep,
    resetForm,
    saveProgress,
    loadSavedProgress
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}