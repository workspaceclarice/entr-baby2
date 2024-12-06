import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../../types/event';
import { formatPrice } from '../../../utils/formatters';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const displayPrice = event.formattedPrice || formatPrice(event.price);

  return (
    <Link to={`/events/${event.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] relative overflow-hidden">
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
            {event.isRSVP ? (
              <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                RSVP
              </span>
            ) : (
              <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                {displayPrice}
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-purple-600">
            {event.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </p>
          <p className="text-sm text-gray-500">{event.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard; 