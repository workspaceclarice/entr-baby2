import React from 'react';
import { Event } from '../../types/event';
import { TicketType } from '../../types/ticket';

interface FloatingTicketPurchaseProps {
  event: Event;
  onPurchase: (ticketTypes: TicketType[]) => void;
}

const FloatingTicketPurchase: React.FC<FloatingTicketPurchaseProps> = ({ event, onPurchase }) => {
  const ticketTypes: TicketType[] = [
    {
      id: 'general',
      name: 'General Admission',
      price: event.price,
      description: 'Access to all main event areas',
      available: event.ticketsAvailable
    },
    {
      id: 'vip',
      name: 'VIP Access',
      price: event.price * 2,
      description: 'Priority seating, exclusive lounge access, and complimentary drinks',
      available: Math.floor(event.ticketsAvailable * 0.2)
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: event.price * 0.8,
      description: 'Limited time offer - 20% off general admission',
      available: Math.floor(event.ticketsAvailable * 0.1)
    }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      {!event.isRSVP && (
        <button
          onClick={() => onPurchase(ticketTypes)}
          className="px-8 py-3 bg-purple-600 text-white rounded-full font-light hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <span>Get Tickets</span>
          <span className="text-sm opacity-80">Starting at ${Math.min(...ticketTypes.map(t => t.price))}</span>
        </button>
      )}
    </div>
  );
};

export default FloatingTicketPurchase; 