import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ChevronDownIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

const VendorHeader: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = currentUser ? [
    { name: 'Dashboard', href: '/vendors/dashboard' },
    { name: 'Bookings', href: '/vendors/dashboard/bookings' },
    { name: 'My Services', href: '/vendors/dashboard/services' },
    { name: 'Earnings', href: '/vendors/dashboard/earnings' },
  ] : [
    { name: 'Home', href: '/vendors/landing' },
    { name: 'Features', href: '/vendors/features' },
    { name: 'Pricing', href: '/vendors/pricing' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Back Arrow */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              <ArrowLeftCircleIcon className="h-6 w-6" />
            </Link>
            <Link to="/vendors/landing" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">entr</span>
              <span className="text-sm text-gray-500 ml-2">for Vendors</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-normal ${
                  location.pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/vendors/list-business"
              className="text-sm font-light text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md whitespace-nowrap"
            >
              List business
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="p-2 rounded-md text-gray-500 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                {/* Settings */}
                <button className="text-gray-500 hover:text-gray-700">
                  <Cog6ToothIcon className="w-6 h-6" />
                </button>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  {/* ... keep existing Menu.Button and Transition components ... */}
                </Menu>
              </>
            ) : (
              <>
                <Link
                  to="/vendors/signin"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/vendors/signup"
                  className="text-sm font-normal text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  List your business
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white border-t`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-light ${
                location.pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!currentUser && (
            <div className="mt-4 px-3 space-y-3">
              <Link
                to="/vendors/signin"
                className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/vendors/list-business"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                List Your Business
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default VendorHeader; 