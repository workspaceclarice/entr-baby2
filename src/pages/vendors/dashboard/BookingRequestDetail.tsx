import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import AcceptBookingModal from '../../../components/vendors/bookings/AcceptBookingModal';
import CounterOfferModal from '../../../components/vendors/bookings/CounterOfferModal';
import DeclineRequestModal from '../../../components/vendors/bookings/DeclineRequestModal';

const BookingRequestDetail: React.FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  // Add state for modals
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  // Add handlers for actions
  const handleAcceptBooking = () => {
    // Handle accept booking logic
    console.log('Booking accepted');
    setShowAcceptModal(false);
    // You might want to redirect or show a success message
    navigate('/vendors/dashboard/bookings');
  };

  const handleCounterOffer = (counterOffer: any) => {
    // Handle counter offer logic
    console.log('Counter offer sent:', counterOffer);
    setShowCounterModal(false);
    // You might want to redirect or show a success message
    navigate('/vendors/dashboard/bookings');
  };

  const handleDeclineRequest = (reason: string) => {
    // Handle decline request logic
    console.log('Request declined:', reason);
    setShowDeclineModal(false);
    // You might want to redirect or show a success message
    navigate('/vendors/dashboard/bookings');
  };

  // Mock data - In real app, fetch based on requestId
  const requestDetails = {
    id: '123',
    status: 'Pending',
    createdAt: '2024-03-20 14:30',
    event: {
      name: 'Corporate Annual Gala',
      date: '2024-04-15',
      time: '6:00 PM - 11:00 PM',
      location: 'Grand Ballroom, Hilton Hotel',
      expectedGuests: 200,
      type: 'Corporate Event',
      description: 'Annual corporate gathering with awards ceremony and dinner.',
    },
    client: {
      name: 'Jessica Chen',
      company: 'TechCorp Inc.',
      email: 'jessica.chen@techcorp.com',
      phone: '+1 (555) 123-4567',
      previousBookings: 0,
    },
    selectedPackage: {
      name: 'Premium Photography Package',
      basePrice: 2500,
      duration: '5 hours',
      includes: [
        'Two professional photographers',
        'Complete event coverage',
        'Executive headshots',
        'Digital delivery within 48 hours',
        'High-resolution edited photos',
        'Online gallery'
      ]
    },
    addons: [
      {
        name: 'Extra Hour Coverage',
        price: 300,
        quantity: 1
      },
      {
        name: 'Printed Photo Album',
        price: 200,
        quantity: 1
      }
    ],
    requirements: {
      setup: '30 minutes before event',
      specific: [
        'Black-tie dress code required',
        'Need candid shots of networking',
        'Group photos of department teams',
        'Coverage of awards ceremony'
      ]
    },
    pricing: {
      packagePrice: 2500,
      addonsTotal: 500,
      subtotal: 3000,
      serviceFee: 500,
      total: 3500,
      estimatedIncome: 2800 // After platform fees
    },
    bookedItem: {
      type: 'service', // or 'venue'
      title: 'Premium Photography Package',
      category: 'Photography',
      coverImage: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewCount: 124,
      price: {
        startingAt: 2500,
        unit: 'per event'
      },
      features: [
        'Professional photographers',
        'Complete event coverage',
        'High-resolution photos',
        'Digital delivery',
        'Online gallery'
      ],
      location: 'San Francisco, CA'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-48 lg:pb-8">
      {/* Header - Mobile Friendly */}
      <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to requests
          </button>
          <h1 className="text-2xl sm:text-3xl font-extralight text-gray-900">Booking Request</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
          <span className="px-3 py-1 text-sm font-light rounded-full bg-yellow-100 text-yellow-800 mb-2 sm:mb-0">
            {requestDetails.status}
          </span>
          <span className="text-sm text-gray-500">
            Received {requestDetails.createdAt}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Now Mobile Friendly */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booked Service/Venue Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Booked {requestDetails.bookedItem.type}</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-48">
                <img 
                  src={requestDetails.bookedItem.coverImage} 
                  alt={requestDetails.bookedItem.title}
                  className="w-full h-32 sm:h-48 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {requestDetails.bookedItem.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{requestDetails.bookedItem.category}</p>
                <div className="flex items-center mb-4">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 ml-1">
                    {requestDetails.bookedItem.rating}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({requestDetails.bookedItem.reviewCount} reviews)
                  </span>
                </div>
                <div className="space-y-2">
                  {requestDetails.bookedItem.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-semibold text-gray-900">
                      ${requestDetails.bookedItem.price.startingAt}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      {requestDetails.bookedItem.price.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Event Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{requestDetails.event.date}</p>
                    <p className="text-sm text-gray-500">{requestDetails.event.time}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">{requestDetails.event.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">{requestDetails.event.expectedGuests} expected guests</p>
                    <p className="text-sm text-gray-500">{requestDetails.event.type}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Event Description</h3>
                <p className="text-sm text-gray-600">{requestDetails.event.description}</p>
              </div>
            </div>
          </div>

          {/* Selected Package */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Selected Package</h2>
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-medium text-gray-900">{requestDetails.selectedPackage.name}</h3>
                <p className="text-lg font-medium text-gray-900">${requestDetails.selectedPackage.basePrice}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">Duration: {requestDetails.selectedPackage.duration}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Package Includes:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {requestDetails.selectedPackage.includes.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Requirements - New separate section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Event Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Setup Time</h3>
                <p className="text-sm text-gray-600">{requestDetails.requirements.setup}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Specific Requirements</h3>
                <ul className="space-y-2">
                  {requestDetails.requirements.specific.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">•</span>
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Sticky on Desktop */}
        <div className="space-y-6 lg:sticky lg:top-8">
          {/* Client Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Client Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{requestDetails.client.name}</p>
                <p className="text-sm text-gray-500">{requestDetails.client.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{requestDetails.client.email}</p>
                <p className="text-sm text-gray-600">{requestDetails.client.phone}</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {requestDetails.client.previousBookings === 0 
                    ? 'First-time client'
                    : `Previous bookings: ${requestDetails.client.previousBookings}`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-100">
            <h2 className="text-xl font-light text-gray-900 mb-4">Pricing Breakdown</h2>
            <div className="space-y-3">
              {/* Base Package */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Package Price</span>
                <span className="text-gray-900">${requestDetails.pricing.packagePrice}</span>
              </div>

              {/* Add-ons Section */}
              {requestDetails.addons.length > 0 && (
                <div className="py-3 border-t border-blue-100">
                  <p className="text-sm font-medium text-gray-900 mb-2">Add-ons</p>
                  {requestDetails.addons.map((addon, index) => (
                    <div key={index} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        {addon.name} × {addon.quantity}
                      </span>
                      <span className="text-gray-900">${addon.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm mt-2 pt-2 border-t border-blue-100">
                    <span className="text-gray-600">Add-ons Total</span>
                    <span className="text-gray-900">${requestDetails.pricing.addonsTotal}</span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="pt-3 border-t border-blue-200">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-gray-900">${requestDetails.pricing.total}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Platform fees included
                </p>
              </div>
            </div>
          </div>

          {/* Estimated Income Card - Now shows same as total amount */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-sm p-6 border border-green-100">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-900 mb-1">Your Estimated Income</h3>
              <p className="text-3xl font-semibold text-green-600">
                ${requestDetails.pricing.total}
              </p>
              <p className="text-xs text-gray-500 mt-1">All fees included</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 space-y-3 lg:relative lg:bg-transparent lg:border-0 lg:p-0">
            <button 
              className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowAcceptModal(true)}
            >
              Accept Booking
            </button>
            <button 
              className="w-full px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
              onClick={() => setShowCounterModal(true)}
            >
              Send Counter Offer
            </button>
            <button 
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setShowDeclineModal(true)}
            >
              Decline Request
            </button>
          </div>
        </div>
      </div>

      {/* Add Modals */}
      <AcceptBookingModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onConfirm={handleAcceptBooking}
        bookingDetails={requestDetails}
      />

      <CounterOfferModal
        isOpen={showCounterModal}
        onClose={() => setShowCounterModal(false)}
        onSubmit={handleCounterOffer}
        bookingDetails={requestDetails}
      />

      <DeclineRequestModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onConfirm={handleDeclineRequest}
        bookingDetails={requestDetails}
      />
    </div>
  );
};

export default BookingRequestDetail; 