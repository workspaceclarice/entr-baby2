import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TicketIcon,
  UserIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { Event } from '../../types/event';
import { TicketType } from '../../types/ticket';

interface BuyTicketFlowProps {
  event: Event;
  ticketTypes: TicketType[];
  onClose: () => void;
  onSubmit?: () => void;
}

const BuyTicketFlow: React.FC<BuyTicketFlowProps> = ({
  event,
  ticketTypes,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'guest' | 'account' | null>(null);
  const [formData, setFormData] = useState({
    selectedTickets: {} as Record<string, number>,
    name: '',
    email: '',
    password: '', // for account creation
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  });

  const calculateTotal = () => {
    return Object.entries(formData.selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = ticketTypes.find(t => t.id === ticketId);
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const renderStep = () => {
    switch(step) {
      case 1: // Ticket Selection
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Select Your Tickets</h2>
              <p className="text-white/60">Choose from available ticket options below</p>
            </div>

            {ticketTypes.map((ticket) => (
              <div 
                key={ticket.id}
                className="bg-white/10 rounded-xl p-6 space-y-4 hover:bg-white/15 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-white">{ticket.name}</h3>
                    <p className="text-white/60 text-sm mt-1">{ticket.description}</p>
                    <div className="mt-2 inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                      <TicketIcon className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-white/80">{ticket.available} available</span>
                    </div>
                  </div>
                  <div className="text-white text-lg font-medium">
                    ${ticket.price}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      const currentQty = formData.selectedTickets[ticket.id] || 0;
                      setFormData(prev => ({
                        ...prev,
                        selectedTickets: {
                          ...prev.selectedTickets,
                          [ticket.id]: Math.max(0, currentQty - 1)
                        }
                      }));
                    }}
                    className="bg-white/10 rounded-xl w-10 h-10 flex items-center justify-center text-white hover:bg-white/20"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-white">
                    {formData.selectedTickets[ticket.id] || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const currentQty = formData.selectedTickets[ticket.id] || 0;
                      if (currentQty < ticket.available) {
                        setFormData(prev => ({
                          ...prev,
                          selectedTickets: {
                            ...prev.selectedTickets,
                            [ticket.id]: currentQty + 1
                          }
                        }));
                      }
                    }}
                    className="bg-white/10 rounded-xl w-10 h-10 flex items-center justify-center text-white hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white/10 rounded-xl p-6 space-y-3">
              <h3 className="text-white font-medium">Order Summary</h3>
              {Object.entries(formData.selectedTickets).map(([ticketId, quantity]) => {
                const ticket = ticketTypes.find(t => t.id === ticketId);
                if (ticket && quantity > 0) {
                  return (
                    <div key={ticketId} className="flex justify-between text-white/60">
                      <span>{ticket.name} (x{quantity})</span>
                      <span>${(ticket.price * quantity).toFixed(2)}</span>
                    </div>
                  );
                }
                return null;
              })}
              <div className="border-t border-white/10 pt-3 flex justify-between text-white">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-white text-black rounded-xl p-4 font-medium flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!Object.values(formData.selectedTickets).some(qty => qty > 0)}
            >
              <span>Continue to Checkout</span>
              <ArrowRightIcon className="w-4 h-4" />
            </motion.button>
          </motion.div>
        );

      case 2: // Account Selection & Personal Details
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">How would you like to checkout?</h2>
              <p className="text-white/60">Choose your preferred checkout method</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.button
                onClick={() => setCheckoutType('guest')}
                className={`p-6 rounded-xl flex flex-col items-center space-y-3 ${
                  checkoutType === 'guest' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserIcon className="w-8 h-8" />
                <span className="font-medium">Checkout as Guest</span>
              </motion.button>

              <motion.button
                onClick={() => setCheckoutType('account')}
                className={`p-6 rounded-xl flex flex-col items-center space-y-3 ${
                  checkoutType === 'account' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlusIcon className="w-8 h-8" />
                <span className="font-medium">Create Account</span>
              </motion.button>
            </div>

            {checkoutType && (
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {checkoutType === 'account' && (
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-4">
              <motion.button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-white/10 text-white rounded-xl p-4 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-white text-black rounded-xl p-4 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!checkoutType || !formData.name || !formData.email || (checkoutType === 'account' && !formData.password)}
              >
                Continue to Payment
              </motion.button>
            </div>
          </motion.div>
        );

      case 3: // Payment
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
              <p className="text-white/60">Complete your purchase securely</p>
            </div>

            {/* Payment Method Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <motion.button
                type="button"
                className="bg-white text-black rounded-xl p-4 flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <span className="font-medium">Credit Card</span>
              </motion.button>
              
              <motion.button
                type="button"
                className="bg-white/10 text-white rounded-xl p-4 flex items-center justify-center space-x-3 opacity-50 cursor-not-allowed"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                </svg>
                <span className="font-medium">Other Methods (Coming Soon)</span>
              </motion.button>
            </div>

            {/* Card Details Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    // Only allow numbers and format with spaces
                    const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                    if (value.length <= 19) { // 16 digits + 3 spaces
                      setFormData({ ...formData, cardNumber: value });
                    }
                  }}
                  className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => {
                      // Format as MM/YY
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        const formatted = value.replace(/(\d{2})(\d{2})/, '$1/$2');
                        setFormData({ ...formData, expiryDate: formatted });
                      }
                    }}
                    className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 3) {
                        setFormData({ ...formData, cvv: value });
                      }
                    }}
                    className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Billing Address</label>
                <input
                  type="text"
                  value={formData.billingAddress}
                  onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                  className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40"
                  placeholder="Enter your billing address"
                  required
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/10 rounded-xl p-6 space-y-3 mt-8">
              <h3 className="text-white font-medium">Final Order Summary</h3>
              {Object.entries(formData.selectedTickets).map(([ticketId, quantity]) => {
                const ticket = ticketTypes.find(t => t.id === ticketId);
                if (ticket && quantity > 0) {
                  return (
                    <div key={ticketId} className="flex justify-between text-white/60">
                      <span>{ticket.name} (x{quantity})</span>
                      <span>${(ticket.price * quantity).toFixed(2)}</span>
                    </div>
                  );
                }
                return null;
              })}
              <div className="border-t border-white/10 pt-3 flex justify-between text-white">
                <span>Total</span>
                <span className="font-medium">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
              <motion.button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-1/2 bg-white/10 text-white rounded-xl p-4 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                onClick={() => {
                  setShowConfirmation(true);
                  if (onSubmit) onSubmit();
                }}
                className="w-full sm:w-1/2 bg-white text-black rounded-xl p-4 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.billingAddress}
              >
                Complete Purchase
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-y-auto"
    >
      {showConfirmation ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="min-h-screen flex items-center justify-center p-8"
        >
          <div className="p-8 text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl max-w-md w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="flex space-x-2 text-3xl">
                <motion.span
                  animate={{ rotate: [0, -30, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ✨
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, 30, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                >
                  🎉
                </motion.span>
              </div>
              <div className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Tickets Secured!
              </div>
              <motion.div 
                className="text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {`Your ${Object.values(formData.selectedTickets).reduce((a, b) => a + b, 0)} ticket${Object.values(formData.selectedTickets).reduce((a, b) => a + b, 0) > 1 ? 's' : ''} will be emailed to you shortly.`}
              </motion.div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-sm text-white/60">Processing payment</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="min-h-screen pb-20">
          {/* Header */}
          <div className="sticky top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-black">
            <motion.button
              onClick={onClose}
              className="text-white/60 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XMarkIcon className="w-8 h-8" />
            </motion.button>
            <div className="text-sm text-white/60">
              Step {step} of 3
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 pt-8 max-w-md mx-auto">
            {/* Event Title */}
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                {event.title}
              </h1>
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <TicketIcon className="w-5 h-5" />
                <span>${event.price} per ticket</span>
              </div>
            </div>

            {/* Form Steps */}
            {renderStep()}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BuyTicketFlow; 