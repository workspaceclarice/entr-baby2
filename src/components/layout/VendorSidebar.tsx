import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  InboxIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/vendor/dashboard', icon: HomeIcon },
  { name: 'Bookings', href: '/vendor/bookings', icon: CalendarIcon },
  { name: 'Customers', href: '/vendor/customers', icon: UsersIcon },
  { name: 'Analytics', href: '/vendor/analytics', icon: ChartBarIcon },
  { name: 'Messages', href: '/vendor/messages', icon: InboxIcon },
  { name: 'Settings', href: '/vendor/settings', icon: CogIcon },
];

const VendorSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive
                          ? 'text-purple-600'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar; 