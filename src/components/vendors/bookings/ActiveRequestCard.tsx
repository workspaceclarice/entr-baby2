import React from 'react';
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface ActiveRequestProps {
  request: {
    id: number;
    eventName: string;
    client: string;
    date: string;
    time: string;
    package: string;
    amount: string;
    requestedOn: string;
  };
  onClick: (id: number) => void;
}

const ActiveRequestCard: React.FC<ActiveRequestProps> = ({ request, onClick }) => (
  <div 
    className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-100 hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => onClick(request.id)}
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{request.eventName}</h3>
        <p className="text-sm text-gray-600">{request.client}</p>
      </div>
      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
        {request.requestedOn}
      </span>
    </div>
    <div className="space-y-3">
      <div className="flex items-center text-sm text-gray-600">
        <CalendarIcon className="h-4 w-4 mr-2" />
        {request.date} • {request.time}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <CurrencyDollarIcon className="h-4 w-4 mr-2" />
        {request.package} - {request.amount}
      </div>
    </div>
    <div className="mt-4 flex justify-end space-x-2">
      <button 
        className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        onClick={(e) => {
          e.stopPropagation();
          onClick(request.id);
        }}
      >
        Review Request
      </button>
    </div>
  </div>
);

export default ActiveRequestCard; 