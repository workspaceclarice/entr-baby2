import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: number;
    clientName: string;
    eventType: string;
    date: string;
    time: string;
    status: string;
    // Add more booking details as needed
    location?: string;
    notes?: string;
    price?: string;
  } | null;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  isOpen,
  onClose,
  booking
}) => {
  const navigate = useNavigate();

  const handleEditBooking = () => {
    if (booking) {
      navigate(`/vendors/dashboard/bookings/${booking.id}/details`);
    }
  };

  if (!booking) return null;

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="relative bg-white rounded-lg w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-light text-gray-900">
                Booking Details
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">{booking.eventType}</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {booking.status}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-3 text-gray-500">
                <UserIcon className="h-5 w-5" />
                <span className="text-sm">{booking.clientName}</span>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-gray-500">
                  <CalendarIcon className="h-5 w-5" />
                  <span className="text-sm">{booking.date}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <ClockIcon className="h-5 w-5" />
                  <span className="text-sm">{booking.time}</span>
                </div>
              </div>

              {/* Additional Details */}
              {booking.location && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Location</h4>
                  <p className="text-sm text-gray-500">{booking.location}</p>
                </div>
              )}

              {booking.notes && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-500">{booking.notes}</p>
                </div>
              )}

              {booking.price && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Price</h4>
                  <p className="text-sm text-gray-500">${booking.price}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-light"
                >
                  Close
                </button>
                <button
                  onClick={handleEditBooking}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-light"
                >
                  Edit Booking
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingDetailsModal; 