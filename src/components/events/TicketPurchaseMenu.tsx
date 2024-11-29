import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
}

interface TicketPurchaseMenuProps {
  tickets: TicketType[];
  onPurchase: (ticketId: string, quantity: number) => void;
}

const TicketPurchaseMenu: React.FC<TicketPurchaseMenuProps> = ({ tickets, onPurchase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const selectedTicketDetails = tickets.find(t => t.id === selectedTicket);
  const lowestPrice = Math.min(...tickets.map(t => t.price));

  return (
    <div className="fixed inset-x-0 bottom-0 flex items-center justify-center z-50 p-4 bg-gradient-to-t from-black/10 to-transparent">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Tickets</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                    selectedTicket === ticket.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{ticket.name}</h3>
                      <p className="text-sm text-gray-600">{ticket.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${ticket.price}</p>
                      <p className="text-sm text-gray-500">{ticket.available} available</p>
                    </div>
                  </div>
                </div>
              ))}

              {selectedTicket && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="ml-2 block w-24 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => onPurchase(selectedTicket, quantity)}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                  >
                    Purchase Tickets
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-purple-600 text-white py-3 px-6 rounded-full font-medium hover:bg-purple-700 transition-colors shadow-lg flex items-center space-x-2"
          >
            <span>Purchase Tickets</span>
            <span className="text-sm text-purple-200">from ${lowestPrice}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default TicketPurchaseMenu; 