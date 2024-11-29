import React from 'react';
import { useParams } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, TicketIcon, ClockIcon } from '@heroicons/react/24/outline';

const EventDetailPage: React.FC = () => {
  const { id } = useParams();

  // Mock data - replace with real data fetch
  const event = {
    id: '1',
    title: 'Summer Music Festival 2024',
    date: 'Aug 15, 2024',
    time: '4:00 PM',
    endTime: '11:00 PM',
    location: 'Grand Park, Los Angeles',
    address: '200 N Grand Ave, Los Angeles, CA 90012',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    price: '$49',
    category: 'Music',
    description: 'Join us for the biggest music festival of the summer featuring top artists and bands. Experience live performances across multiple stages, food vendors, and more.',
    organizer: {
      name: 'LA Events Co',
      image: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a',
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="h-[50vh] relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                {event.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{event.time} - {event.endTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{event.address}</span>
                </div>
              </div>
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About this event</h2>
                <p>{event.description}</p>
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Organizer</h2>
              <div className="flex items-center">
                <img
                  src={event.organizer.image}
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{event.organizer.name}</h3>
                  <p className="text-sm text-gray-500">Event Organizer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-gray-900">{event.price}</span>
                <TicketIcon className="h-6 w-6 text-gray-400" />
              </div>
              <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 