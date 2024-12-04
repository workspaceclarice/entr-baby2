import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../../contexts/AuthContext';
import {
  Cog6ToothIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  Bars3Icon,
  UserCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const VendorDashboardHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/vendors/dashboard', exact: true },
    { name: 'Bookings', href: '/vendors/dashboard/bookings', exact: false },
    { name: 'My Listings', href: '/vendors/dashboard/listings', exact: false },
    { name: 'Earnings', href: '/vendors/dashboard/earnings', exact: false },
  ];

  const isActive = (path: string) => {
    if (path === '/vendors/dashboard') {
      return location.pathname === '/vendors/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/vendors/dashboard" className="text-2xl font-bold text-blue-600">
                entr
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-light ${
                    item.exact 
                      ? location.pathname === item.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      : isActive(item.href)
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link 
              to="/vendors/dashboard/calendar"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <CalendarIcon className="h-6 w-6" />
            </Link>
            <Link 
              to="/vendors/dashboard/messenger"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
            </Link>
            <Link 
              to="/vendors/dashboard/notifications"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <BellIcon className="h-6 w-6" />
            </Link>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {userProfile?.profileImage ? (
                  <img
                    src={userProfile.profileImage}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                )}
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/vendors/dashboard/profile"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/vendors/dashboard/settings"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Settings
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

          {/* Mobile Right Section */}
          <div className="flex items-center sm:hidden space-x-2">
            <Link 
              to="/vendors/dashboard/calendar"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <CalendarIcon className="h-6 w-6" />
            </Link>
            <Link 
              to="/vendors/dashboard/messenger"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
            </Link>
            <Link 
              to="/vendors/dashboard/notifications"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <BellIcon className="h-6 w-6" />
            </Link>

            {/* Mobile Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <Bars3Icon className="h-6 w-6" />
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {navigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          to={item.href}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/vendors/dashboard/profile"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/vendors/dashboard/settings"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Settings
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