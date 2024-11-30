import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, TicketIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const {
    id,
    title,
    description,
    date,
    time,
    location,
    price,
    category,
    image,
    ticketsAvailable,
    isRSVP
  } = event;

  return (
    <Link to={`/events/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-w-16 aspect-h-9">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-purple-600/90 rounded-full">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
            {title}
          </h3>

          {/* Date & Time */}
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{new Date(date).toLocaleDateString()}</span>
            <span className="mx-2">·</span>
            <span>{time}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {isRSVP ? (
              <div className="flex items-center text-gray-600">
                <UserGroupIcon className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">RSVP Required</span>
              </div>
            ) : (
              <div className="flex items-baseline">
                <span className="text-lg font-semibold text-gray-900">
                  ${price}
                </span>
                <span className="text-sm text-gray-500 ml-1">per ticket</span>
              </div>
            )}
            
            <div className="flex items-center text-purple-600">
              {isRSVP ? (
                <span className="text-sm font-medium">RSVP Now</span>
              ) : (
                <>
                  <TicketIcon className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Get Tickets</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard; 