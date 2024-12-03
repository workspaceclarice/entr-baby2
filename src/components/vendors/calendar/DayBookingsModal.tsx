import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface DayBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  bookings: Array<{
    id: number;
    clientName: string;
    eventType: string;
    time: string;
    status: string;
  }>;
  onSelectBooking: (booking: any) => void;
}

const DayBookingsModal: React.FC<DayBookingsModalProps> = ({
  isOpen,
  onClose,
  date,
  bookings,
  onSelectBooking
}) => {
  const navigate = useNavigate();

  const handleBookingClick = (booking: any) => {
    navigate(`/vendors/dashboard/bookings/${booking.id}/details`);
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto sm:hidden">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20">
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
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
            className="relative bg-white rounded-t-xl w-full max-w-md p-6 mt-auto"
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <Dialog.Title className="text-lg font-light text-gray-900 mb-4">
              {format(date, 'MMMM d, yyyy')}
            </Dialog.Title>

            <div className="space-y-3">
              {bookings.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => handleBookingClick(booking)}
                  className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {booking.clientName}
                      </h3>
                      <p className="text-sm text-gray-500">{booking.eventType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {booking.time}
                  </div>
                </button>
              ))}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DayBookingsModal; 