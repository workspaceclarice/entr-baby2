import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { events } from '../../data/events';
import { CalendarIcon, MapPinIcon, TicketIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const EventsPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link 
              key={event.id} 
              to={`/events/${event.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                {/* Event Image */}
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-light mb-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      {event.isRSVP ? (
                        <UserGroupIcon className="w-4 h-4 mr-2" />
                      ) : (
                        <TicketIcon className="w-4 h-4 mr-2" />
                      )}
                      {event.isRSVP ? 'RSVP Event' : event.formattedPrice}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage; 