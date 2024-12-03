import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingRequest {
  id: number;
  eventName: string;
  eventPlanner: string;
  date: string;
  time: string;
  budget: string;
  status: string;
  message: string;
  requestedOn: string;
  urgency: 'high' | 'medium' | 'low';
  responseRate: string;
}

interface BookingRequestCardProps {
  request: BookingRequest;
}

const BookingRequestCard: React.FC<BookingRequestCardProps> = ({ request }) => {
  const navigate = useNavigate();

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'bg-red-50 border-red-100';
      case 'medium': return 'bg-orange-50 border-orange-100';
      default: return 'bg-green-50 border-green-100';
    }
  };

  const getInitials = (name: string): string => {
    return name.split(' ').map((n: string) => n[0]).join('');
  };

  return (
    <div 
      onClick={() => navigate(`/vendors/dashboard/bookings/${request.id}`)}
      className={`rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border ${getUrgencyColor(request.urgency)} cursor-pointer`}
    >
      {/* Header Section */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">{request.requestedOn}</span>
          {request.urgency === 'high' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-light bg-red-100 text-red-800">
              Urgent
            </span>
          )}
        </div>
        <h4 className="text-base font-light text-gray-900 mb-2">{request.eventName}</h4>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {getInitials(request.eventPlanner)}
          </div>
          <div>
            <p className="text-sm text-gray-500">from {request.eventPlanner}</p>
            <p className="text-xs text-green-600">{request.responseRate} response rate</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white/50 rounded-lg p-3">
        <p className="text-xs text-gray-500 mb-1">Date & Time</p>
        <p className="text-sm font-light text-gray-900">
          {request.date}<br/>{request.time}
        </p>
      </div>

      {/* Estimated Income Section */}
      <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
        <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-lg p-4 border border-green-100 hover:shadow-inner transition-all">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-light mb-1">Estimated Income</p>
            <p className="text-2xl font-semibold text-green-600">{request.budget}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestCard; 