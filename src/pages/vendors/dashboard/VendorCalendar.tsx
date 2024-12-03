import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import AvailabilitySettingsModal, { WeeklyAvailability } from '../../../components/vendors/calendar/AvailabilitySettingsModal';
import NotificationToast from '../../../components/common/NotificationToast';
import VendorCalendarView from '../../../components/vendors/calendar/VendorCalendarView';
import BookingDetailsModal from '../../../components/vendors/calendar/BookingDetailsModal';
import { useNavigate } from 'react-router-dom';

const VendorCalendar: React.FC = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [availability, setAvailability] = useState<WeeklyAvailability>({
    monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    saturday: { isAvailable: true, startTime: '10:00', endTime: '15:00' },
    sunday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
  });

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      eventType: 'Wedding Photography',
      date: format(new Date(2024, 2, 25), 'yyyy-MM-dd'),
      time: '2:00 PM - 6:00 PM',
      status: 'confirmed',
      location: 'Golden Gate Park, SF',
      notes: 'Outdoor wedding ceremony and reception. Client requested extra focus on candid shots.',
      price: '2,500'
    },
    {
      id: 2,
      clientName: 'Michael Brown',
      eventType: 'Corporate Event',
      date: format(new Date(2024, 2, 28), 'yyyy-MM-dd'),
      time: '10:00 AM - 4:00 PM',
      status: 'confirmed',
      location: 'Marriott Hotel Downtown',
      notes: 'Annual company meeting. Need photos of keynote speakers and networking sessions.',
      price: '1,800'
    },
    {
      id: 3,
      clientName: 'Emily Davis',
      eventType: 'Birthday Party',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '1:00 PM - 3:00 PM',
      status: 'pending',
      location: 'Home Studio',
      notes: 'Sweet 16 birthday photoshoot',
      price: '500'
    },
    {
      id: 4,
      clientName: 'Alex Thompson',
      eventType: 'Engagement Photos',
      date: format(new Date(2024, 2, 22), 'yyyy-MM-dd'),
      time: '4:30 PM - 6:30 PM',
      status: 'confirmed',
      location: 'Baker Beach',
      notes: 'Sunset engagement photoshoot',
      price: '800'
    },
    {
      id: 5,
      clientName: 'Jennifer White',
      eventType: 'Family Portraits',
      date: format(new Date(2024, 2, 23), 'yyyy-MM-dd'),
      time: '11:00 AM - 12:30 PM',
      status: 'confirmed',
      location: 'City Park',
      notes: 'Family of 5, including toddler twins',
      price: '400'
    },
    {
      id: 6,
      clientName: 'David Miller',
      eventType: 'Product Launch',
      date: format(new Date(2024, 2, 26), 'yyyy-MM-dd'),
      time: '9:00 AM - 2:00 PM',
      status: 'pending',
      location: 'Tech Hub Conference Center',
      notes: 'Product launch event for new startup',
      price: '1,200'
    },
    {
      id: 7,
      clientName: 'Rachel Green',
      eventType: 'Fashion Shoot',
      date: format(new Date(2024, 2, 27), 'yyyy-MM-dd'),
      time: '3:00 PM - 7:00 PM',
      status: 'confirmed',
      location: 'Downtown Studio',
      notes: 'Spring collection photoshoot',
      price: '1,500'
    },
    {
      id: 8,
      clientName: 'James Wilson',
      eventType: 'Graduation Photos',
      date: format(new Date(2024, 2, 29), 'yyyy-MM-dd'),
      time: '12:00 PM - 2:00 PM',
      status: 'confirmed',
      location: 'University Campus',
      notes: 'Individual and group shots with classmates',
      price: '300'
    },
    {
      id: 9,
      clientName: 'Maria Garcia',
      eventType: 'Quinceañera',
      date: format(new Date(2024, 2, 30), 'yyyy-MM-dd'),
      time: '2:00 PM - 8:00 PM',
      status: 'pending',
      location: 'Community Center',
      notes: 'Traditional celebration with family photos',
      price: '1,800'
    },
    {
      id: 10,
      clientName: 'Tom Baker',
      eventType: 'Real Estate',
      date: format(new Date(2024, 2, 24), 'yyyy-MM-dd'),
      time: '10:00 AM - 11:30 AM',
      status: 'confirmed',
      location: 'Luxury Property',
      notes: 'Interior and exterior shots of new listing',
      price: '600'
    }
  ];

  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Filter confirmed bookings for the upcoming bookings section
  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');

  const handleSaveAvailability = (newAvailability: WeeklyAvailability) => {
    try {
      setAvailability(newAvailability);
      // Here you would typically save to your backend
      setNotification({
        show: true,
        message: 'Availability settings saved successfully',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to save availability settings',
        type: 'error'
      });
    }
  };

  const handleBookingClick = (booking: any) => {
    navigate(`/vendors/dashboard/bookings/${booking.id}/details`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Calendar</h1>
          <p className="mt-1 text-sm font-light text-gray-500">
            Manage your bookings and availability
          </p>
        </div>
        <button
          onClick={() => setShowAvailabilityModal(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-light text-gray-700 bg-white hover:bg-gray-50"
        >
          <ClockIcon className="h-5 w-5 mr-2" />
          Set Availability
        </button>
      </div>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Calendar Section */}
        <div className="lg:w-2/3">
          <VendorCalendarView
            selectedMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            availability={availability}
            bookings={bookings}
          />
        </div>

        {/* Upcoming Bookings */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-light text-gray-900 mb-6">Upcoming Bookings</h2>
            <div className="space-y-4">
              {confirmedBookings.map((booking) => (
                <div 
                  key={booking.id}
                  onClick={() => handleBookingClick(booking)}
                  className="p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {booking.clientName}
                      </h3>
                      <p className="text-sm text-gray-500">{booking.eventType}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {booking.date} • {booking.time}
                  </div>
                </div>
              ))}
              {confirmedBookings.length === 0 && (
                <p className="text-center text-gray-500 font-light">No confirmed bookings</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <AvailabilitySettingsModal
        isOpen={showAvailabilityModal}
        onClose={() => setShowAvailabilityModal(false)}
        onSave={handleSaveAvailability}
        currentAvailability={availability}
      />

      <NotificationToast
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      <BookingDetailsModal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default VendorCalendar; 