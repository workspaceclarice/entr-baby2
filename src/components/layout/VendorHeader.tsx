import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const VendorHeader: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const location = useLocation();

  const navigation = currentUser ? [
    { name: 'Dashboard', href: '/vendors/dashboard' },
    { name: 'Bookings', href: '/vendors/dashboard/bookings' },
    { name: 'My Services', href: '/vendors/dashboard/services' },
    { name: 'Earnings', href: '/vendors/dashboard/earnings' },
  ] : [
    { name: 'Home', href: '/vendors/landing' },
    { name: 'Features', href: '/vendors/features' },
    { name: 'Success Stories', href: '/vendors/success-stories' },
    { name: 'Pricing', href: '/vendors/pricing' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/vendors/landing" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">entr</span>
            <span className="text-sm text-gray-500 ml-2">for Vendors</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-normal ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side - Auth or Profile */}
          <div className="flex items-center space-x-6">
            {currentUser ? (
              <>
                {/* Settings */}
                <button className="text-gray-500 hover:text-gray-700">
                  <Cog6ToothIcon className="w-6 h-6" />
                </button>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <img
                      src={userProfile?.profileImage || `https://ui-avatars.com/api/?name=${userProfile?.firstName}+${userProfile?.lastName}&background=random`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex items-center">
                      <span className="text-sm font-normal text-gray-700">
                        {userProfile?.firstName} {userProfile?.lastName}
                      </span>
                      <ChevronDownIcon className="w-4 h-4 ml-2 text-gray-500" />
                    </div>
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/vendors/dashboard/profile"
                              className={`${
                                active ? 'bg-gray-50' : ''
                              } flex items-center px-4 py-2 text-sm text-gray-700 rounded-md`}
                            >
                              Profile Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/vendors/dashboard/business"
                              className={`${
                                active ? 'bg-gray-50' : ''
                              } flex items-center px-4 py-2 text-sm text-gray-700 rounded-md`}
                            >
                              Business Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`${
                                active ? 'bg-gray-50' : ''
                              } flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-md`}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
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
    </header>
  );
};

export default VendorHeader; 