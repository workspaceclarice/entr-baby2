import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  CalendarIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  TicketIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const UnifiedDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  const upcomingEvents = [
    {
      id: 1,
      title: "Taylor Swift Concert",
      date: "Dec 15",
      time: "8:00 PM",
      location: "Levi's Stadium",
      image: "/path-to-event-image.jpg"
    },
    // Add more events as needed
  ];

  const savedEvents = [
    {
      id: 1,
      title: "Wine Tasting Experience",
      date: "Dec 20",
      price: "$75",
      image: "/path-to-saved-event.jpg"
    },
    // Add more saved events
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {userProfile?.firstName || 'User'}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your events and activities
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/dashboard/events"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">My Events</h3>
                <p className="text-sm text-gray-500">View your upcoming events</p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/favorites"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <HeartIcon className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Saved</h3>
                <p className="text-sm text-gray-500">Check your saved items</p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/messages"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <ChatBubbleLeftIcon className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                <p className="text-sm text-gray-500">View your conversations</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
            <Link 
              to="/dashboard/events" 
              className="text-purple-600 hover:text-purple-700 flex items-center"
            >
              View all
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Events Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Saved Events</h2>
            <Link 
              to="/dashboard/favorites" 
              className="text-purple-600 hover:text-purple-700 flex items-center"
            >
              View all
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEvents.map(event => (
              <div key={event.id} className="flex space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <TicketIcon className="h-4 w-4 mr-1" />
                    {event.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedDashboard; 