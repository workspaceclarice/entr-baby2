import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '../../types/event';
import { 
  CalendarIcon, 
  SparklesIcon,
  FireIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface FloatingRSVPProps {
  event: Event;
  onRSVP: (response: 'going' | 'maybe' | 'not-going') => void;
  status?: 'going' | 'maybe' | 'not-going' | null;
  onSubmit?: () => void;
}

const FloatingRSVP: React.FC<FloatingRSVPProps> = ({ event, onRSVP, status, onSubmit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCantMakeIt = () => {
    onRSVP('not-going');
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <>
      <div className="h-[200px] w-full" />
      
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-white/80 backdrop-blur-sm"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
            <AnimatePresence>
              {showConfirmation ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-8 text-center bg-gradient-to-r from-purple-50 to-pink-50"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20 
                    }}
                    className="flex flex-col items-center space-y-3"
                  >
                    <div className="flex space-x-2 text-3xl">
                      <motion.span
                        animate={{ rotate: [0, -30, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        👋
                      </motion.span>
                      <motion.span
                        animate={{ rotate: [0, 30, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                      >
                        💫
                      </motion.span>
                    </div>
                    <div className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                      Response saved!
                    </div>
                    <motion.div 
                      className="text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      We'll miss you, but there's always next time! ✨
                    </motion.div>
                    <motion.div
                      className="text-sm text-gray-500 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      You can always update your response later
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">
                        {event.guestList?.going || 0} going
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm font-medium text-gray-600">
                        {event.guestList?.maybe || 0} maybe
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <motion.button
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      onClick={() => onRSVP('going')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-6 py-3 font-medium relative overflow-hidden group"
                    >
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                          />
                        )}
                      </AnimatePresence>
                      <span className="relative flex items-center justify-center">
                        <FireIcon className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Count me in!
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onRSVP('maybe')}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl px-6 py-3 font-medium"
                    >
                      Maybe
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCantMakeIt}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl px-6 py-3 font-medium"
                    >
                      Can't make it
                    </motion.button>
                  </div>

                  {event.rsvpDeadline && (
                    <div className="mt-4 flex items-center justify-center">
                      <SparklesIcon className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        RSVP by {new Date(event.rsvpDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingRSVP; 