import React, { useState, useEffect, useRef } from 'react';

// Skip to main content link
export function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
    >
      Skip to main content
    </a>
  );
}

// Focus management hook
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement | null>(null);

  const setFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
      focusRef.current = element;
    }
  };

  const restoreFocus = () => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  return { setFocus, restoreFocus };
}

// Keyboard navigation helper
export function useKeyboardNavigation(items: string[], onSelect: (index: number) => void) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? items.length - 1 : prev - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(selectedIndex);
        }
        break;
      case 'Escape':
        setSelectedIndex(-1);
        break;
    }
  };

  return { selectedIndex, handleKeyDown, setSelectedIndex };
}

// Screen reader announcements
interface AnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clearAfter?: number;
}

export function ScreenReaderAnnouncement({
  message,
  priority = 'polite',
  clearAfter = 5000
}: AnnouncementProps) {
  const [announcement, setAnnouncement] = useState(message);

  useEffect(() => {
    setAnnouncement(message);

    if (clearAfter > 0) {
      const timer = setTimeout(() => setAnnouncement(''), clearAfter);
      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}

// High contrast mode toggle
export function useHighContrast() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('high-contrast');
    if (saved === 'true') {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('high-contrast', String(newValue));

    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return { highContrast, toggleHighContrast };
}

// Font size controller
export function useFontSize() {
  const [fontSize, setFontSize] = useState('normal');

  useEffect(() => {
    const saved = localStorage.getItem('font-size');
    if (saved) {
      setFontSize(saved);
      document.documentElement.classList.remove('font-small', 'font-normal', 'font-large', 'font-xl');
      document.documentElement.classList.add(`font-${saved}`);
    }
  }, []);

  const changeFontSize = (size: 'small' | 'normal' | 'large' | 'xl') => {
    setFontSize(size);
    localStorage.setItem('font-size', size);
    document.documentElement.classList.remove('font-small', 'font-normal', 'font-large', 'font-xl');
    document.documentElement.classList.add(`font-${size}`);
  };

  return { fontSize, changeFontSize };
}

// Accessibility toolbar
export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { highContrast, toggleHighContrast } = useHighContrast();
  const { fontSize, changeFontSize } = useFontSize();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Accessibility options"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-64">
          <h3 className="font-semibold text-gray-900 mb-4">Accessibility Options</h3>

          {/* High Contrast Toggle */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={toggleHighContrast}
                className="sr-only"
              />
              <div className={`relative inline-flex w-10 h-5 rounded-full transition-colors ${highContrast ? 'bg-primary-600' : 'bg-gray-300'}`}>
                <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="ml-3 text-sm">High Contrast</span>
            </label>
          </div>

          {/* Font Size Controls */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['small', 'normal', 'large', 'xl'].map((size) => (
                <button
                  key={size}
                  onClick={() => changeFontSize(size as any)}
                  className={`px-3 py-2 text-xs rounded border ${
                    fontSize === size
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard shortcuts info */}
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Keyboard Shortcuts:</p>
            <p>Tab: Navigate</p>
            <p>Enter/Space: Activate</p>
            <p>Esc: Close dialogs</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ARIA live region for dynamic content updates
export function LiveRegion({ children, priority = 'polite' }: {
  children: React.ReactNode;
  priority?: 'polite' | 'assertive'
}) {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}

// Focus trap for modals
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}

// Color contrast checker utility
export function checkColorContrast(foreground: string, background: string): {
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
} {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper color contrast library
  const getLuminance = (color: string): number => {
    // This is a simplified version - use a proper color library in production
    const rgb = parseInt(color.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio,
    wcagAA: ratio >= 4.5,
    wcagAAA: ratio >= 7
  };
}

// Error boundary with accessibility features
interface AccessibleErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class AccessibleErrorBoundary extends React.Component<
  AccessibleErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: AccessibleErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Accessibility Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
        >
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 mb-4">
            We're sorry, but there was an error loading this section.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Form field with enhanced accessibility
interface AccessibleFormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  description?: string;
  autocomplete?: string;
}

export function AccessibleFormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  description,
  autocomplete
}: AccessibleFormFieldProps) {
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {description && (
        <p id={descriptionId} className="text-sm text-gray-600 mb-2">
          {description}
        </p>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autocomplete}
        aria-describedby={`${description ? descriptionId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
          error
            ? 'border-red-300 focus:border-red-500'
            : 'border-gray-300 focus:border-primary-500'
        }`}
      />

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}