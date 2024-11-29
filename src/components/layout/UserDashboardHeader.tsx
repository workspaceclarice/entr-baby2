import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import {
  CalendarIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  TicketIcon,
  Cog6ToothIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const UserDashboardHeader: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const userNavigation = [
    { name: 'My Events', href: '/dashboard/events', icon: CalendarIcon },
    { name: 'Favorites', href: '/dashboard/favorites', icon: HeartIcon },
    { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftIcon },
  ];

  const userMenuItems = [
    { name: 'My Tickets', href: '/tickets', icon: TicketIcon },
    { name: 'My Bookings', href: '/bookings', icon: CalendarIcon },
    { name: 'Go Pro', href: '/subscription', icon: SparklesIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16">
          {/* Right Side - User Navigation */}
          <div className="flex items-center space-x-4">
            {/* Navigation Icons */}
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname.startsWith(item.href)
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-6 w-6" />
              </Link>
            ))}

            {/* Profile Dropdown */}
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex items-center">
                <img
                  src={userProfile?.profileImage || `https://ui-avatars.com/api/?name=${userProfile?.firstName}+${userProfile?.lastName}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full ring-2 ring-white hover:ring-purple-100 transition-all"
                />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userMenuItems.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        to={item.href}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <span className="h-5 w-5 mr-3" />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHeader; 