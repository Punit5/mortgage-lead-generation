import React from 'react';

interface MobileOptimizedProps {
  children: React.ReactNode;
  className?: string;
}

// Mobile-first container component
export function MobileContainer({ children, className = '' }: MobileOptimizedProps) {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Mobile-optimized button component
interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function MobileButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button'
}: MobileButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 active:scale-95';

  const variantClasses = {
    primary: 'bg-primary-800 text-white hover:bg-primary-900 focus:ring-primary-300 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300',
    outline: 'border-2 border-primary-800 text-primary-800 hover:bg-primary-50 focus:ring-primary-300'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const responsiveSizeClasses = {
    sm: 'px-4 py-2 text-sm sm:px-6 sm:py-3',
    md: 'px-6 py-3 text-base sm:px-8 sm:py-4',
    lg: 'px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${responsiveSizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// Mobile-optimized form input
interface MobileInputProps {
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function MobileInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  className = '',
  prefix,
  suffix
}: MobileInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {prefix && (
          <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base sm:text-lg pointer-events-none">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full
            ${prefix ? 'pl-8 sm:pl-10' : 'pl-3 sm:pl-4'}
            ${suffix ? 'pr-8 sm:pr-10' : 'pr-3 sm:pr-4'}
            py-3 sm:py-4
            text-base sm:text-lg
            border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary-500
            transition-colors
            ${error ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'}
            ${className}
          `}
        />

        {suffix && (
          <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base sm:text-lg pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-2 text-red-600 text-sm sm:text-base">{error}</p>
      )}
    </div>
  );
}

// Mobile-optimized card component
interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function MobileCard({ children, className = '', padding = 'md' }: MobileCardProps) {
  const paddingClasses = {
    sm: 'p-4 sm:p-6',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-12'
  };

  return (
    <div className={`
      bg-white rounded-lg sm:rounded-xl
      shadow-md sm:shadow-lg
      border border-gray-200
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
}

// Mobile navigation menu
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </>
  );
}

// Mobile-optimized grid
interface MobileGridProps {
  children: React.ReactNode;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MobileGrid({
  children,
  cols = { default: 1, sm: 2, md: 3 },
  gap = 'md',
  className = ''
}: MobileGridProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  const gridCols = `grid-cols-${cols.default}` +
    (cols.sm ? ` sm:grid-cols-${cols.sm}` : '') +
    (cols.md ? ` md:grid-cols-${cols.md}` : '') +
    (cols.lg ? ` lg:grid-cols-${cols.lg}` : '');

  return (
    <div className={`grid ${gridCols} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

// Mobile sticky bottom bar
interface MobileStickyBarProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileStickyBar({ children, className = '' }: MobileStickyBarProps) {
  return (
    <div className={`
      fixed bottom-0 left-0 right-0
      bg-white border-t border-gray-200
      p-4 sm:p-6
      shadow-lg
      z-30
      sm:relative sm:bottom-auto sm:border-t-0 sm:shadow-none sm:bg-transparent
      ${className}
    `}>
      {children}
    </div>
  );
}