import React from 'react';

interface SecurityBadgeProps {
  type: 'ssl' | 'encryption' | 'privacy' | 'bbb' | 'licensed' | 'insured' | 'verified';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function SecurityBadge({ type, size = 'md', showText = true, className = '' }: SecurityBadgeProps) {
  const getBadgeConfig = () => {
    switch (type) {
      case 'ssl':
        return {
          icon: '🔒',
          title: 'SSL Secured',
          description: '256-bit SSL encryption protects your data',
          color: 'green',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case 'encryption':
        return {
          icon: '🛡️',
          title: 'Bank-Level Security',
          description: 'Military-grade encryption protects your information',
          color: 'blue',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200'
        };
      case 'privacy':
        return {
          icon: '🔐',
          title: 'Privacy Protected',
          description: 'Your personal information is never shared',
          color: 'purple',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          borderColor: 'border-purple-200'
        };
      case 'bbb':
        return {
          icon: '🏆',
          title: 'BBB A+ Rating',
          description: 'Better Business Bureau accredited with A+ rating',
          color: 'yellow',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        };
      case 'licensed':
        return {
          icon: '📜',
          title: 'Licensed in BC',
          description: 'Fully licensed mortgage brokerage in British Columbia',
          color: 'indigo',
          bgColor: 'bg-indigo-100',
          textColor: 'text-indigo-800',
          borderColor: 'border-indigo-200'
        };
      case 'insured':
        return {
          icon: '🛡️',
          title: 'Insured & Bonded',
          description: 'Professional liability and errors & omissions insurance',
          color: 'gray',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
      case 'verified':
        return {
          icon: '✅',
          title: 'Identity Verified',
          description: 'Verified by trusted third-party security providers',
          color: 'green',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      default:
        return {
          icon: '🔒',
          title: 'Secure',
          description: 'Your data is protected',
          color: 'gray',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getBadgeConfig();
  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base'
  };

  return (
    <div className={`
      inline-flex items-center
      ${config.bgColor} ${config.borderColor} ${config.textColor}
      border rounded-lg
      ${sizeClasses[size]}
      ${className}
    `}>
      <span className="text-lg mr-2">{config.icon}</span>
      {showText && (
        <div>
          <div className="font-semibold">{config.title}</div>
          {size !== 'sm' && (
            <div className="text-xs opacity-80 mt-1">{config.description}</div>
          )}
        </div>
      )}
    </div>
  );
}

interface TrustIndicatorBarProps {
  badges?: SecurityBadgeProps['type'][];
  layout?: 'horizontal' | 'grid';
  className?: string;
}

export function TrustIndicatorBar({
  badges = ['ssl', 'encryption', 'licensed', 'bbb'],
  layout = 'horizontal',
  className = ''
}: TrustIndicatorBarProps) {
  const layoutClasses = layout === 'horizontal'
    ? 'flex flex-wrap justify-center items-center gap-4'
    : 'grid grid-cols-2 md:grid-cols-4 gap-4';

  return (
    <div className={`${layoutClasses} ${className}`}>
      {badges.map((badge, index) => (
        <SecurityBadge
          key={index}
          type={badge}
          size="sm"
          showText={layout === 'grid'}
        />
      ))}
    </div>
  );
}

// Trust seals with real branding
export function TrustSeals({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-6 ${className}`}>
      {/* SSL Certificate */}
      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">SSL Secured</div>
          <div className="text-xs text-gray-600">256-bit encryption</div>
        </div>
      </div>

      {/* Privacy Badge */}
      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 118 2.257L8 2l0.257 0.257A6 6 0 0118 8zM11 6a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Privacy Protected</div>
          <div className="text-xs text-gray-600">Never shared</div>
        </div>
      </div>

      {/* Licensed Badge */}
      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Licensed in BC</div>
          <div className="text-xs text-gray-600">Regulated broker</div>
        </div>
      </div>
    </div>
  );
}

// Security features callout
export function SecurityCallout({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Your Security is Our Priority
          </h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              256-bit SSL encryption protects all data transmission
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Licensed and regulated by BC Financial Services Authority
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Professional liability insurance and errors & omissions coverage
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Your personal information is never sold or shared with third parties
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Compliance badges
export function ComplianceBadges({ className = '' }: { className?: string }) {
  const badges = [
    {
      name: 'PIPEDA Compliant',
      description: 'Personal Information Protection and Electronic Documents Act',
      icon: '🇨🇦'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality controls',
      icon: '🛡️'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system',
      icon: '🔒'
    },
    {
      name: 'PCI DSS',
      description: 'Payment card industry data security standard',
      icon: '💳'
    }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">{badge.icon}</span>
          </div>
          <div className="text-sm font-semibold text-gray-900">{badge.name}</div>
          <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
        </div>
      ))}
    </div>
  );
}

// Real-time security status
export function SecurityStatus({ className = '' }: { className?: string }) {
  const [connectionStatus, setConnectionStatus] = React.useState<'secure' | 'checking' | 'insecure'>('secure');

  React.useEffect(() => {
    // Check if connection is secure
    setConnectionStatus(location.protocol === 'https:' ? 'secure' : 'insecure');
  }, []);

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'secure':
        return {
          color: 'green',
          icon: '🔒',
          text: 'Secure Connection',
          description: 'Your connection is encrypted and secure'
        };
      case 'checking':
        return {
          color: 'yellow',
          icon: '⏳',
          text: 'Checking Security',
          description: 'Verifying connection security...'
        };
      case 'insecure':
        return {
          color: 'red',
          icon: '⚠️',
          text: 'Insecure Connection',
          description: 'Your connection may not be secure'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center px-3 py-2 rounded-lg border ${
      config.color === 'green' ? 'bg-green-50 border-green-200 text-green-800' :
      config.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
      'bg-red-50 border-red-200 text-red-800'
    } ${className}`}>
      <span className="mr-2">{config.icon}</span>
      <div>
        <div className="text-sm font-semibold">{config.text}</div>
        <div className="text-xs opacity-80">{config.description}</div>
      </div>
    </div>
  );
}

// Combined security footer
export function SecurityFooter({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-50 border-t border-gray-200 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Trusted & Secure Mortgage Services
          </h3>
          <p className="text-gray-600">
            Your privacy and security are protected by industry-leading safeguards
          </p>
        </div>

        <TrustSeals className="mb-6" />

        <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
          <SecurityStatus />
          <span>•</span>
          <span>Licensed by BCFSA</span>
          <span>•</span>
          <span>Member of MPC</span>
          <span>•</span>
          <span>BBB A+ Rating</span>
          <span>•</span>
          <span>$2M Professional Liability</span>
        </div>
      </div>
    </div>
  );
}