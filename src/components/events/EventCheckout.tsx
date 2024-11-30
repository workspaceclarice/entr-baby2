import React, { useState } from 'react';
import { Event } from '../../types/event';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface EventCheckoutProps {
  event: Event;
  onClose: () => void;
}

const EventCheckout: React.FC<EventCheckoutProps> = ({ event, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Add your checkout logic here
      console.log('Processing checkout for:', { event, quantity });
      // Redirect to success page or show confirmation
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {event.isRSVP ? 'RSVP' : 'Get Tickets'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-medium mb-2">{event.title}</h3>
            <div className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </div>
          </div>

          {!event.isRSVP && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Tickets
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border-gray-300 rounded-md shadow-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'ticket' : 'tickets'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Summary */}
          {!event.isRSVP && (
            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Tickets x {quantity}</span>
                <span>${Number(event.price) * quantity}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${Number(event.price) * quantity}</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-purple-300"
          >
            {loading ? 'Processing...' : event.isRSVP ? 'Confirm RSVP' : 'Purchase Tickets'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCheckout; 