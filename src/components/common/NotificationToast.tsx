import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface NotificationToastProps {
  message: string;
  type?: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  message, 
  type = 'success', 
  show, 
  onClose 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`rounded-lg shadow-lg p-4 flex items-center space-x-3 ${
        type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      }`}>
        {type === 'success' ? (
          <CheckCircleIcon className="h-5 w-5 text-green-400" />
        ) : (
          <XCircleIcon className="h-5 w-5 text-red-400" />
        )}
        <p className="text-sm font-light">{message}</p>
      </div>
    </div>
  );
};

export default NotificationToast; 