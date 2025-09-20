import React, { useState, useRef, useEffect } from 'react';

interface AddressAutofillProps {
  onAddressSelect: (address: CanadianAddress) => void;
  placeholder?: string;
  className?: string;
  value?: string;
  error?: string;
}

interface CanadianAddress {
  streetNumber: string;
  streetName: string;
  city: string;
  province: string;
  postalCode: string;
  fullAddress: string;
}

interface AddressSuggestion {
  id: string;
  text: string;
  place_name: string;
  address: CanadianAddress;
}

export default function AddressAutofill({
  onAddressSelect,
  placeholder = "Start typing your address...",
  className = '',
  value = '',
  error
}: AddressAutofillProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock Canadian addresses for demonstration
  const mockCanadianAddresses: AddressSuggestion[] = [
    {
      id: '1',
      text: '123 Main Street, Vancouver, BC V6B 1A1',
      place_name: '123 Main Street, Vancouver, BC V6B 1A1',
      address: {
        streetNumber: '123',
        streetName: 'Main Street',
        city: 'Vancouver',
        province: 'BC',
        postalCode: 'V6B 1A1',
        fullAddress: '123 Main Street, Vancouver, BC V6B 1A1'
      }
    },
    {
      id: '2',
      text: '456 Oak Avenue, Richmond, BC V7A 2B2',
      place_name: '456 Oak Avenue, Richmond, BC V7A 2B2',
      address: {
        streetNumber: '456',
        streetName: 'Oak Avenue',
        city: 'Richmond',
        province: 'BC',
        postalCode: 'V7A 2B2',
        fullAddress: '456 Oak Avenue, Richmond, BC V7A 2B2'
      }
    },
    {
      id: '3',
      text: '789 Pine Road, Burnaby, BC V5H 3C3',
      place_name: '789 Pine Road, Burnaby, BC V5H 3C3',
      address: {
        streetNumber: '789',
        streetName: 'Pine Road',
        city: 'Burnaby',
        province: 'BC',
        postalCode: 'V5H 3C3',
        fullAddress: '789 Pine Road, Burnaby, BC V5H 3C3'
      }
    },
    {
      id: '4',
      text: '321 Elm Street, Surrey, BC V3T 4D4',
      place_name: '321 Elm Street, Surrey, BC V3T 4D4',
      address: {
        streetNumber: '321',
        streetName: 'Elm Street',
        city: 'Surrey',
        province: 'BC',
        postalCode: 'V3T 4D4',
        fullAddress: '321 Elm Street, Surrey, BC V3T 4D4'
      }
    },
    {
      id: '5',
      text: '654 Maple Drive, Coquitlam, BC V3K 5E5',
      place_name: '654 Maple Drive, Coquitlam, BC V3K 5E5',
      address: {
        streetNumber: '654',
        streetName: 'Maple Drive',
        city: 'Coquitlam',
        province: 'BC',
        postalCode: 'V3K 5E5',
        fullAddress: '654 Maple Drive, Coquitlam, BC V3K 5E5'
      }
    }
  ];

  const searchAddresses = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Filter mock addresses
    const filtered = mockCanadianAddresses.filter(addr =>
      addr.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSuggestions(filtered);
    setIsLoading(false);
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedIndex(-1);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce search
    timeoutRef.current = setTimeout(() => {
      searchAddresses(newQuery);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    setSuggestions([]);
    onAddressSelect(suggestion.address);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? suggestions.length - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 sm:py-4 text-base sm:text-lg
            border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary-500
            transition-colors
            ${error ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'}
            ${className}
          `}
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-primary-600 border-t-transparent rounded-full"></div>
          </div>
        )}

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 12.414a1 1 0 010-1.414L17.657 7.243A1 1 0 0119.071 8.657L15.828 12l3.243 3.243a1 1 0 01-1.414 1.414z" />
          </svg>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className={`
                px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0
                ${index === selectedIndex ? 'bg-primary-50 text-primary-900' : 'hover:bg-gray-50'}
              `}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 12.414a1 1 0 010-1.414L17.657 7.243A1 1 0 0119.071 8.657L15.828 12l3.243 3.243a1 1 0 01-1.414 1.414z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">{suggestion.address.streetNumber} {suggestion.address.streetName}</div>
                  <div className="text-sm text-gray-600">{suggestion.address.city}, {suggestion.address.province} {suggestion.address.postalCode}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && suggestions.length === 0 && query.length >= 3 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="px-4 py-3 text-gray-500 text-center">
            No addresses found. Please check your spelling or try a different search.
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-red-600 text-sm">{error}</p>
      )}

      {/* Powered by notice */}
      {showSuggestions && (
        <div className="absolute z-40 w-full mt-1 pt-12">
          <div className="text-xs text-gray-400 text-center bg-white py-2 border-t border-gray-200 rounded-b-lg">
            Address suggestions powered by Canada Post
          </div>
        </div>
      )}
    </div>
  );
}