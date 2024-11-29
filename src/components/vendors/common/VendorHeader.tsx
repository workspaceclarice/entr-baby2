import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../../contexts/AuthContext';
import { isVendor } from '../../../types/vendor';

const VendorHeader: React.FC = () => {
  const location = useLocation();
  const { userProfile, logout } = useAuth();

  // List of paths that should use this header
  const vendorPaths = [
    '/vendors',
    '/vendors/login',
    '/vendors/list-your-business',
    '/vendors/signup',
    '/vendors/pricing',
    '/vendors/faq',
    '/vendors/help'
  ];

  // Check if current path should use this header
  const shouldShowHeader = vendorPaths.some(path => 
    location.pathname.startsWith(path)
  );

  if (!shouldShowHeader) {
    return null;
  }

  const navigation = [
    { name: 'Solutions', href: '/vendors/solutions' },
    { name: 'Pricing', href: '/vendors/pricing' },
    { name: 'FAQ', href: '/vendors/faq' },
    { name: 'Help Center', href: '/vendors/help' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {userProfile && isVendor(userProfile) ? (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex items-center">
                  <img
                    src={userProfile?.profileImage || `https://ui-avatars.com/api/?name=${userProfile?.firstName}+${userProfile?.lastName}`}
                    alt="Profile"
                    className="w-9 h-9 rounded-full ring-2 ring-white hover:ring-purple-100 transition-all"
                  />
                </Menu.Button>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/vendors/dashboard"
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700 rounded-md`}
                        >
                          Dashboard
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
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <Link
                  to="/vendors/login"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/vendors/list-your-business"
                  className="text-sm font-normal text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
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