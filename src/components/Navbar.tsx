import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">MortgagePro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-primary-800 text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
              >
                {t('navbar.home')}
              </Link>
              <Link
                to="/pre-approval"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/pre-approval')
                    ? 'bg-primary-800 text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
              >
                {t('navbar.getPreApproved')}
              </Link>
              <Link
                to="/refinance"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/refinance')
                    ? 'bg-primary-800 text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
              >
                {t('navbar.refinance')}
              </Link>
              <Link
                to="/first-time-buyer"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/first-time-buyer')
                    ? 'bg-primary-800 text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
              >
                {t('navbar.firstTimeBuyers')}
              </Link>
            </div>
          </div>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link
              to="/pre-approval"
              className="bg-primary-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-900 transition-colors shadow-md hover:shadow-lg"
            >
              {t('navbar.checkYourRate')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-800 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'bg-primary-800 text-white'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/pre-approval"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/pre-approval')
                  ? 'bg-primary-800 text-white'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.getPreApproved')}
            </Link>
            <Link
              to="/refinance"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/refinance')
                  ? 'bg-primary-800 text-white'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.refinance')}
            </Link>
            <Link
              to="/first-time-buyer"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/first-time-buyer')
                  ? 'bg-primary-800 text-white'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.firstTimeBuyers')}
            </Link>
            <div className="px-3 py-2 space-y-3">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <Link
                to="/pre-approval"
                className="block w-full text-center bg-primary-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navbar.checkYourRate')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}