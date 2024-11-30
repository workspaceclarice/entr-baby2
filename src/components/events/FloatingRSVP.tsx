import React, { useState } from 'react';
import { Event } from '../../types/event';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingRSVPProps {
  event: Event;
  onRSVP: (status: 'going' | 'not-going' | 'maybe') => void;
}

const FloatingRSVP: React.FC<FloatingRSVPProps> = ({ event, onRSVP }) => {
  const [showOptions, setShowOptions] = useState(true);

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <AnimatePresence>
        <motion.div 
          className="flex space-x-3 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onRSVP('going')}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors flex items-center space-x-2 shadow-md"
          >
            <span className="text-xl">🎉</span>
            <span>I'm In!</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onRSVP('maybe')}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full font-medium hover:bg-yellow-600 transition-colors flex items-center space-x-2 shadow-md"
          >
            <span className="text-xl">🤔</span>
            <span>Maybe</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onRSVP('not-going')}
            className="px-6 py-3 bg-gray-500 text-white rounded-full font-medium hover:bg-gray-600 transition-colors flex items-center space-x-2 shadow-md"
          >
            <span className="text-xl">😢</span>
            <span>Can't Go</span>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FloatingRSVP; 