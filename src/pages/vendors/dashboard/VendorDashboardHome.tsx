import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';

const VendorDashboardHome: React.FC = () => {
  const bookingRequests = [
    {
      id: 1,
      eventName: 'Corporate Annual Gala',
      eventPlanner: 'Jessica Chen',
      date: '2024-04-15',
      time: '6:00 PM - 11:00 PM',
      budget: '$3,500',
      status: 'Pending',
      message: 'Looking for photography coverage for our annual corporate gala. Need both event coverage and headshots for executives.',
      requestedOn: '2 hours ago',
      urgency: 'high',
      responseRate: '95%'
    },
    {
      id: 2,
      eventName: 'Beach Wedding Ceremony',
      eventPlanner: 'Mark Thompson',
      date: '2024-05-20',
      time: '4:00 PM - 8:00 PM',
      budget: '$2,800',
      status: 'Pending',
      message: 'Need photography package for a 100-guest beach wedding. Includes ceremony and reception coverage.',
      requestedOn: '1 day ago',
      urgency: 'medium',
      responseRate: '85%'
    },
    {
      id: 3,
      eventName: 'Birthday Celebration',
      eventPlanner: 'Rachel Green',
      date: '2024-04-30',
      time: '2:00 PM - 6:00 PM',
      budget: '$1,500',
      status: 'Pending',
      message: 'Looking for a photographer for a 50th birthday celebration. Need candid shots and family portraits.',
      requestedOn: '3 hours ago',
      urgency: 'high',
      responseRate: '90%'
    },
    {
      id: 4,
      eventName: 'Product Launch Event',
      eventPlanner: 'David Miller',
      date: '2024-04-10',
      time: '5:00 PM - 9:00 PM',
      budget: '$4,000',
      status: 'Pending',
      message: 'Tech product launch event requiring professional photography and video coverage.',
      requestedOn: '5 hours ago',
      urgency: 'high',
      responseRate: '88%'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerView = 2;
  const totalSlides = Math.ceil(bookingRequests.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const stats = [
    { name: 'Total Bookings', value: '182' },
    { name: 'This Month', value: '24' },
    { name: 'Revenue', value: '$12,480' },
    { name: 'Avg. Rating', value: '4.9' },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Corporate Meeting',
      date: 'Tomorrow at 10:00 AM',
      client: 'Tech Corp Inc.',
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'Wedding Reception',
      date: 'Mar 30, 2024 at 4:00 PM',
      client: 'Sarah & John',
      status: 'Pending'
    }
  ];

  const getInitials = (name: string): string => {
    return name.split(' ').map((n: string) => n[0]).join('');
  };

  // First, let's create a BookingRequestCard component
  const BookingRequestCard: React.FC<{request: any}> = ({ request }) => {
    const navigate = useNavigate();

    const getUrgencyColor = (urgency: string) => {
      switch(urgency) {
        case 'high': return 'bg-red-50 border-red-100';
        case 'medium': return 'bg-orange-50 border-orange-100';
        default: return 'bg-green-50 border-green-100';
      }
    };

    return (
      <div 
        onClick={() => navigate(`/vendors/dashboard/bookings/${request.id}`)}
        className={`rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border ${getUrgencyColor(request.urgency)} cursor-pointer`}
      >
        {/* Header Section */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">{request.requestedOn}</span>
            {request.urgency === 'high' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-light bg-red-100 text-red-800">
                Urgent
              </span>
            )}
          </div>
          <h4 className="text-base font-light text-gray-900 mb-2">{request.eventName}</h4>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {getInitials(request.eventPlanner)}
            </div>
            <div>
              <p className="text-sm text-gray-500">from {request.eventPlanner}</p>
              <p className="text-xs text-green-600">{request.responseRate} response rate</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white/50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Date & Time</p>
          <p className="text-sm font-light text-gray-900">
            {request.date}<br/>{request.time}
          </p>
        </div>

        {/* Estimated Income Section */}
        <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-lg p-4 border border-green-100 hover:shadow-inner transition-all">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-light mb-1">Estimated Income</p>
              <p className="text-2xl font-semibold text-green-600">{request.budget}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Section */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extralight text-gray-900">Vendor Dashboard</h1>
          <p className="mt-2 text-sm font-light text-gray-600">
            Manage your bookings, listings, and business performance
          </p>
        </div>
      </div>

      {/* Stats Grid - Updated with consistent light blue style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { 
            name: 'Total Bookings', 
            value: '182'
          },
          { 
            name: 'This Month', 
            value: '24'
          },
          { 
            name: 'Revenue', 
            value: '$12,480'
          },
          { 
            name: 'Avg. Rating', 
            value: '4.9'
          },
        ].map((stat) => (
          <div 
            key={stat.name} 
            className="bg-blue-50 rounded-xl p-6 hover:shadow-sm transition-all relative overflow-hidden border border-blue-100"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Content */}
            <div>
              <p className="text-sm font-light text-gray-600 mb-1">{stat.name}</p>
              <p className="text-2xl font-light text-blue-600">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events and Quick Menu Grid */}
      <div className="mb-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-lg font-light text-gray-900">Upcoming Events</h3>
            <Link 
              to="/vendors/dashboard/bookings" 
              className="text-sm font-light text-blue-600 hover:text-blue-700 flex items-center"
            >
              View all
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    event.status === 'Confirmed' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <div>
                    <p className="text-sm font-light text-gray-900">{event.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.client}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-light ${
                  event.status === 'Confirmed' 
                    ? 'text-green-600' 
                    : 'text-yellow-600'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Requests Section - Now with Slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light text-gray-900">New Booking Requests</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
            <Link 
              to="/vendors/dashboard/bookings" 
              className="text-sm font-light text-blue-600 hover:text-blue-700 flex items-center"
            >
              View all requests 
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{
              x: `-${currentSlide * 100}%`
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {bookingRequests.map((request) => (
              <motion.div
                key={request.id}
                className="min-w-[280px] md:min-w-[320px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <BookingRequestCard request={request} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === index ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default VendorDashboardHome; 