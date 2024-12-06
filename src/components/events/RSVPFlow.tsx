import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '../../types/event';
import { 
  XMarkIcon, 
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface RSVPFlowProps {
  event: Event;
  status: 'going' | 'maybe';
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const RSVPFlow: React.FC<RSVPFlowProps> = ({ event, status, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guestCount: 1,
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form...'); // Debug log
    setShowConfirmation(true);
    onSubmit(formData);
    
    // Close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  // Check if confirmation is showing
  console.log('showConfirmation:', showConfirmation); // Debug log

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-white/60 text-sm mb-2">Your name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
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
                  className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <motion.button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-white text-black rounded-xl p-4 font-medium flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!formData.name || !formData.email}
            >
              <span>Continue</span>
              <ArrowRightIcon className="w-4 h-4" />
            </motion.button>
          </motion.form>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-white/60 text-sm mb-4">Number of guests</label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <motion.button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, guestCount: num })}
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-medium ${
                        formData.guestCount === num 
                          ? 'bg-white text-black' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Message (optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full h-32 bg-white/10 rounded-xl p-4 text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Any message for the host?"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <motion.button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-white/10 text-white rounded-xl p-4 font-medium flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  setShowConfirmation(true);
                  onSubmit(formData);
                  setTimeout(() => {
                    onClose();
                  }, 3000);
                }}
                className="flex-1 bg-white text-black rounded-xl p-4 font-medium flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Submit RSVP</span>
                <SparklesIcon className="w-4 h-4" />
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
                {status === 'going' ? "You're all set!" : "Thanks for responding!"}
              </div>
              <motion.div 
                className="text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {status === 'going' 
                  ? `Can't wait to see you${formData.guestCount > 1 ? ` + ${formData.guestCount - 1}` : ''} there!` 
                  : "We'll keep you updated on any changes!"}
              </motion.div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-sm text-white/60">Pending host confirmation</span>
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
              Step {step} of 2
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 pt-8 max-w-md mx-auto">
            {/* Event Title */}
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl font-bold tracking-tight">
                {event.title}
              </h1>
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <SparklesIcon className="w-5 h-5" />
                <span>{status === 'going' ? "You're going!" : "Maybe going"}</span>
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

export default RSVPFlow; 