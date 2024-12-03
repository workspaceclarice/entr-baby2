import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ChevronDownIcon,
  Cog6ToothIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { BaseProfile } from '../../contexts/AuthContext';

const VendorDashboardHeader: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/vendors/dashboard' },
    { name: 'Bookings', href: '/vendors/dashboard/bookings' },
    { name: 'My Services', href: '/vendors/dashboard/services' },
    { name: 'Earnings', href: '/vendors/dashboard/earnings' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/vendors/dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">entr</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-light ${
                  location.pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <button className="text-gray-500 hover:text-gray-700">
              <BellIcon className="w-6 h-6" />
            </button>

            {/* Settings */}
            <button className="text-gray-500 hover:text-gray-700">
              <Cog6ToothIcon className="w-6 h-6" />
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-sm font-light text-gray-700 hover:text-gray-900">
                <span className="mr-2">{userProfile?.displayName || 'Profile'}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/vendors/dashboard/profile"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorDashboardHeader; 