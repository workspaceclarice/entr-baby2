import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../../contexts/AuthContext';
import {
  Cog6ToothIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const VendorDashboardHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to vendor landing page after logout
      navigate('/vendors', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const dashboardNavigation = [
    { name: 'Dashboard', href: '/vendors/dashboard' },
    { name: 'Bookings', href: '/vendors/dashboard/bookings' },
    { name: 'My Services', href: '/vendors/dashboard/services' },
    { name: 'Earnings', href: '/vendors/dashboard/earnings' },
  ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/vendors/dashboard" className="flex-shrink-0">
              <img className="h-8 w-auto text-blue-600" src="/logo-blue.svg" alt="Entr" />
            </Link>

            {/* Dashboard Navigation */}
            <nav className="hidden md:flex ml-8 space-x-8">
              {dashboardNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - Profile and Settings */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
            </button>

            {/* Settings */}
            <Link
              to="/vendors/dashboard/settings"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </Link>

            {/* Profile Menu */}
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex items-center">
                <img
                  src={userProfile?.profileImage || `https://ui-avatars.com/api/?name=${userProfile?.firstName}+${userProfile?.lastName}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full ring-2 ring-white hover:ring-blue-100 transition-all"
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
                  <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200">
                    <div className="font-medium">{userProfile?.firstName} {userProfile?.lastName}</div>
                    <div className="text-gray-500">{userProfile?.email}</div>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/vendors/dashboard/profile"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Profile Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-red-600`}
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