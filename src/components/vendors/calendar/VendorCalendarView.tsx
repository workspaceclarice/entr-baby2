import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { WeeklyAvailability } from './AvailabilitySettingsModal';
import BookingDetailsModal from './BookingDetailsModal';
import DayBookingsModal from './DayBookingsModal';

interface VendorCalendarViewProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  availability: WeeklyAvailability;
  bookings: Array<{
    id: number;
    clientName: string;
    eventType: string;
    date: string;
    time: string;
    status: string;
  }>;
}

const VendorCalendarView: React.FC<VendorCalendarViewProps> = ({
  selectedMonth,
  onMonthChange,
  availability,
  bookings
}) => {
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getBookingsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayBookings = bookings.filter(booking => {
      return booking.date === dateStr;
    });
    return dayBookings;
  };

  const [selectedBooking, setSelectedBooking] = useState<{
    id: number;
    clientName: string;
    eventType: string;
    date: string;
    time: string;
    status: string;
  } | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayBookingsModalOpen, setDayBookingsModalOpen] = useState(false);

  const handleDayClick = (date: Date, bookings: any[]) => {
    if (bookings.length > 1) {
      setSelectedDate(date);
      setDayBookingsModalOpen(true);
    } else if (bookings.length === 1) {
      setSelectedBooking(bookings[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-light text-gray-900">
          {format(selectedMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onMonthChange(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            onClick={() => onMonthChange(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            <span className="hidden sm:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][['S', 'M', 'T', 'W', 'T', 'F', 'S'].indexOf(day)]}</span>
            <span className="sm:hidden">{day}</span>
          </div>
        ))}
        {daysInMonth.map((date) => {
          const dayOfWeek = format(date, 'EEEE').toLowerCase();
          const isAvailable = availability[dayOfWeek].isAvailable;
          const dayBookings = getBookingsForDate(date);
          
          return (
            <div
              key={date.toISOString()}
              onClick={() => handleDayClick(date, dayBookings)}
              className={`
                min-h-[80px] sm:min-h-[100px] p-1 sm:p-2 rounded-lg relative border
                ${isToday(date) ? 'border-2 border-blue-500' : 'border-gray-100'}
                ${!isSameMonth(date, selectedMonth) ? 'bg-gray-50' : 'bg-white'}
                ${isAvailable ? 'hover:bg-green-50' : 'hover:bg-red-50'}
                transition-colors duration-200
                overflow-hidden
                cursor-pointer
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs sm:text-sm font-medium ${
                  !isSameMonth(date, selectedMonth) ? 'text-gray-400' : 'text-gray-900'
                }`}>
                  {format(date, 'd')}
                </span>
                {isAvailable && (
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400" />
                )}
              </div>
              
              {/* Bookings for this day */}
              <div className="space-y-0.5 sm:space-y-1 max-h-[calc(100%-20px)] overflow-y-auto">
                {dayBookings.map(booking => (
                  <div
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className={`
                      text-[10px] sm:text-xs p-0.5 sm:p-1 rounded truncate cursor-pointer
                      ${booking.status === 'confirmed' 
                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                        : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                      }
                    `}
                    title={`${booking.clientName} - ${booking.eventType} - ${booking.time}`}
                  >
                    <span className="hidden sm:inline">{booking.time.split(' - ')[0]} - </span>
                    {booking.clientName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
        <div className="flex items-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-100 rounded-full mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-100 rounded-full mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm text-gray-600">Unavailable</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-100 rounded-full mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm text-gray-600">Booked</span>
        </div>
      </div>

      <BookingDetailsModal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      />

      <DayBookingsModal
        isOpen={dayBookingsModalOpen}
        onClose={() => setDayBookingsModalOpen(false)}
        date={selectedDate || new Date()}
        bookings={selectedDate ? getBookingsForDate(selectedDate) : []}
        onSelectBooking={(booking) => {
          setSelectedBooking(booking);
          setDayBookingsModalOpen(false);
        }}
      />
    </div>
  );
};

export default VendorCalendarView; 