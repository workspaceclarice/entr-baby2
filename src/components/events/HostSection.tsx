import React from 'react';
import { motion } from 'framer-motion';

interface Host {
  name: string;
  image: string;
  role?: string;
}

interface HostSectionProps {
  hosts: Host[];
  isCoHosted?: boolean;
}

const HostSection: React.FC<HostSectionProps> = ({ hosts, isCoHosted = false }) => {
  return (
    <div className="flex flex-col items-center -mt-12 relative z-10">
      <div className="flex items-center justify-center -space-x-4">
        {hosts.map((host, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <img
              src={host.image}
              alt={host.name}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1"
            >
              <span className="block w-2 h-2 bg-white rounded-full" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {isCoHosted ? 'Co-hosted by' : 'Hosted by'}
        </p>
        <p className="font-medium text-gray-900">
          {hosts.map(host => host.name).join(' & ')}
        </p>
      </div>
    </div>
  );
};

export default HostSection; 