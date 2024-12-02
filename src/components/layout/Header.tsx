import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', desktopOnly: true },
    { name: 'Events', href: '/events' },
    { name: 'Services', href: '/services' },
    { name: 'Venues', href: '/venues' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-purple-600">
            ENTR
          </Link>

          {/* Center Navigation */}
          <nav className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                !item.desktopOnly || window.innerWidth >= 768 ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-light whitespace-nowrap ${
                      location.pathname === item.href
                        ? 'text-purple-600'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : null
              ))}
            </div>
          </nav>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="text-sm font-light text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-light text-gray-700 hover:text-purple-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-light text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/vendors/landing"
              className="text-sm font-light text-gray-700 hover:text-purple-600 border-b border-gray-300 hover:border-purple-600"
            >
              For Vendors
            </Link>
          </div>

          {/* Mobile menu button - only for auth options */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-purple-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - only for auth options */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white border-t`}
      >
        <div className="px-2 pt-2 pb-3 space-y-3">
          {!currentUser ? (
            <div className="mt-4 px-3 space-y-3">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/vendors/landing"
            className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            For Vendors
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 