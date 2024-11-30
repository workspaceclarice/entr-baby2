import React from 'react';
import { Event } from '../../types/event';

interface FloatingTicketPurchaseProps {
  event: Event;
  onPurchase: () => void;
}

const FloatingTicketPurchase: React.FC<FloatingTicketPurchaseProps> = ({ event, onPurchase }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <button
        onClick={onPurchase}
        className="px-8 py-3 bg-purple-600 text-white rounded-full font-light hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Get Tickets - ${event.price}
      </button>
    </div>
  );
};

export default FloatingTicketPurchase; 