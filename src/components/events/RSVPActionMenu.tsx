import React from 'react';
import { motion } from 'framer-motion';

interface RSVPActionMenuProps {
  guestCount: {
    going: number;
    maybe: number;
    invited: number;
  };
  onRSVP: (status: 'going' | 'maybe' | 'not-going') => void;
}

const RSVPActionMenu: React.FC<RSVPActionMenuProps> = ({ guestCount, onRSVP }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 flex items-center justify-center z-50 p-4 bg-gradient-to-t from-black/10 to-transparent">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full mx-4"
      >
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRSVP('going')}
            className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
          >
            <span className="text-4xl mb-2">🎉</span>
            <span className="text-sm font-semibold text-green-700 mb-1">Going</span>
            <span className="text-xs text-green-600">{guestCount.going}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRSVP('maybe')}
            className="flex flex-col items-center p-4 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition-colors"
          >
            <span className="text-4xl mb-2">🤔</span>
            <span className="text-sm font-semibold text-yellow-700 mb-1">Maybe</span>
            <span className="text-xs text-yellow-600">{guestCount.maybe}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRSVP('not-going')}
            className="flex flex-col items-center p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors"
          >
            <span className="text-4xl mb-2">😢</span>
            <span className="text-sm font-semibold text-red-700 mb-1">Can't Go</span>
            <span className="text-xs text-red-600">Let them know</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RSVPActionMenu; 