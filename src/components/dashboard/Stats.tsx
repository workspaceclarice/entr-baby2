import React from 'react';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  TicketIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Upcoming Events', value: '12', icon: CalendarIcon, change: '+2.5%', changeType: 'positive' },
  { name: 'Total Bookings', value: '24', icon: TicketIcon, change: '+3.7%', changeType: 'positive' },
  { name: 'Network', value: '86', icon: UserGroupIcon, change: '+5.2%', changeType: 'positive' },
  { name: 'Saved Events', value: '18', icon: HeartIcon, change: '+2.3%', changeType: 'positive' },
];

export const Stats = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-purple-500 p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}; 