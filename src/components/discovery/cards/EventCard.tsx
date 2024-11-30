import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../../types/event';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatPrice = (price: string) => {
    return price === '0' ? 'Free' : `$${price}`;
  };

  const displayPrice = event.formattedPrice || formatPrice(event.price);

  return (
    <Link to={`/events/${event.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
              {event.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="inline-block px-3 py-1 bg-white text-gray-900 text-sm font-medium rounded-full">
              {displayPrice}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-purple-600">
            {event.title}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <UserGroupIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">{event.attendeeCount} attending</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard; 