import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Service } from '../../types';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

interface BookingDetails {
  eventType: string;
  guestCount: string;
  specialRequests: string;
  name: string;
  email: string;
  phone: string;
}

// Initialize Stripe
const stripePromise = loadStripe('your_publishable_key');

const ServiceBookingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    eventType: '',
    guestCount: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: ''
  });
  const [service, setService] = useState<Service>({
    id: '1',
    vendorId: 'vendor1',
    vendorName: 'Elite DJs',
    vendorImage: 'https://picsum.photos/seed/vendor1/200/200',
    vendorBio: 'Professional DJ service with over 10 years of experience.',
    serviceType: 'DJ Services',
    profileImage: 'https://picsum.photos/seed/service1/800/600',
    priceRange: { min: 200, max: 500 },
    rating: 4.8,
    reviewCount: 156,
    location: 'Los Angeles, CA',
    isAvailable: true,
    description: 'Professional DJ services for all types of events.',
    packages: [
      {
        id: 'basic',
        name: 'Basic Package',
        description: 'Perfect for small gatherings',
        price: 200,
        duration: '4 hours',
        includes: ['Professional DJ', 'Standard sound system']
      }
    ],
    addons: [
      {
        id: 'lighting',
        name: 'Professional Lighting',
        price: 150,
        description: 'Additional dance floor lighting'
      }
    ]
  });

  // Get the selected package and add-ons from URL state
  useEffect(() => {
    console.log('Location state:', location.state);
    const state = location.state as { 
      service: Service;
      selectedPackage: string;
      selectedPackageDetails: any;
      selectedAddons: string[];
      selectedAddonDetails: any[];
      date: string;
      startTime: string;
      endTime: string;
      totalAmount: number;
    } | null;
    
    if (state) {
      // Update service data using setState
      setService(state.service);
      
      // Set all the state variables
      setSelectedPackage(state.selectedPackage);
      setSelectedAddons(state.selectedAddons || []);
      setSelectedDate(state.date);
      setStartTime(state.startTime);
      setEndTime(state.endTime);
      
      // Go directly to review step
      setStep(3);
    }
  }, [location]);

  const calculateTotal = () => {
    if (!selectedPackage || !service.packages) return 0;
    const package_ = service.packages.find(p => p.id === selectedPackage);
    if (!package_) return 0;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = service.addons?.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    return package_.price + addonsTotal;
  };

  // Icons
  const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  // Add XIcon component definition
  const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  // Mock available time slots - in real app, this would come from API
  const timeSlots = [
    { start: '9:00 AM', end: '1:00 PM', available: true },
    { start: '10:00 AM', end: '2:00 PM', available: true },
    { start: '11:00 AM', end: '3:00 PM', available: false },
    { start: '12:00 PM', end: '4:00 PM', available: true },
    { start: '1:00 PM', end: '5:00 PM', available: true },
    { start: '2:00 PM', end: '6:00 PM', available: false },
    { start: '3:00 PM', end: '7:00 PM', available: true },
    { start: '4:00 PM', end: '8:00 PM', available: true },
    { start: '5:00 PM', end: '9:00 PM', available: true },
    { start: '6:00 PM', end: '10:00 PM', available: true },
    { start: '7:00 PM', end: '11:00 PM', available: false },
    { start: '8:00 PM', end: '12:00 AM', available: true },
  ];

  const steps = [
    { id: 1, name: 'Time Selection' },
    { id: 2, name: 'Event Details' },
    { id: 3, name: 'Review & Book' }
  ];

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1); // Go back to service details page
    }
  };

  const handleContinue = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const renderTimeSelection = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Time</h2>
      
      {/* Date Selection */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Date
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            min={new Date().toISOString().split('T')[0]}
          />
          <button
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Reset to today
          </button>
        </div>
      </div>

      {/* Time Slots Grid */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Available Time Slots for {new Date(selectedDate).toLocaleDateString()}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={`${slot.start}-${slot.end}`}
              onClick={() => slot.available && setSelectedTimeSlot(`${slot.start}-${slot.end}`)}
              disabled={!slot.available}
              className={`
                p-4 rounded-lg text-left transition-all
                ${!slot.available 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : selectedTimeSlot === `${slot.start}-${slot.end}`
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-700'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-200'
                }
              `}
            >
              <div className="space-y-1">
                <p className="font-medium">{slot.start} - {slot.end}</p>
                <p className={`text-sm ${!slot.available ? 'text-red-400' : 'text-green-500'}`}>
                  {slot.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEventDetails = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Event Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            value={bookingDetails.eventType}
            onChange={(e) => setBookingDetails({...bookingDetails, eventType: e.target.value})}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Event</option>
            <option value="birthday">Birthday Party</option>
            <option value="graduation">Graduation</option>
            <option value="holiday">Holiday Party</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Guest Count
          </label>
          <input
            type="number"
            value={bookingDetails.guestCount}
            onChange={(e) => setBookingDetails({...bookingDetails, guestCount: e.target.value})}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter number of guests"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue Type
          </label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select venue type</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="both">Both Indoor & Outdoor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Style
          </label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select style</option>
            <option value="formal">Formal</option>
            <option value="semiformal">Semi-formal</option>
            <option value="casual">Casual</option>
            <option value="themed">Themed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Music Preferences
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Top 40, Hip Hop, Electronic, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests or Additional Information
          </label>
          <textarea
            value={bookingDetails.specialRequests}
            onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Any special requirements or additional details about your event..."
          />
        </div>
      </div>
    </div>
  );

  const renderReviewAndBook = () => {
    console.log('Rendering review with:', {
      selectedPackage,
      selectedAddons,
      date: selectedDate,
      startTime,
      endTime
    });
    
    // Get full package details
    const selectedPackageDetails = service.packages?.find(p => p.id === selectedPackage);
    
    // Get full add-on details
    const selectedAddonDetails = selectedAddons.map(addonId => 
      service.addons?.find(a => a.id === addonId)
    ).filter(addon => addon !== undefined);

    // Calculate totals
    const subtotal = calculateTotal();
    const serviceFee = Math.round(subtotal * 0.1);
    const total = subtotal + serviceFee;

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Review & Book</h2>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          {/* Selected Package Display */}
          <div className="space-y-4 border-b pb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Selected Package</h4>
                {selectedPackageDetails && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-semibold text-gray-900">{selectedPackageDetails.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{selectedPackageDetails.description}</p>
                        <p className="text-sm text-gray-600 mt-1">Duration: {selectedPackageDetails.duration}</p>
                      </div>
                      <span className="font-semibold text-gray-900">${selectedPackageDetails.price}</span>
                    </div>
                    <div className="mt-4">
                      <h6 className="text-sm font-medium text-gray-700 mb-2">Package Includes:</h6>
                      <ul className="grid grid-cols-2 gap-2">
                        {selectedPackageDetails.includes.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selected Add-ons Display */}
          {selectedAddonDetails.length > 0 && (
            <div className="space-y-4 border-b pb-4">
              <h4 className="font-medium text-gray-900">Additional Services</h4>
              <div className="space-y-3">
                {selectedAddonDetails.map(addon => addon && (
                  <div key={addon.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-900">{addon.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                      </div>
                      <span className="font-medium text-gray-900">+${addon.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="space-y-4 border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">Event Date & Time</h4>
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Start Time:</span>
                      <span className="font-medium">{startTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">End Time:</span>
                      <span className="font-medium">{endTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Price Breakdown</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {/* Base Package */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-600">{selectedPackageDetails?.name}</span>
                  <p className="text-sm text-gray-500">{selectedPackageDetails?.duration}</p>
                </div>
                <span className="font-medium">${selectedPackageDetails?.price}</span>
              </div>

              {/* Selected Add-ons */}
              {selectedAddonDetails.map(addon => addon && (
                <div key={addon.id} className="flex justify-between items-start border-t border-gray-200 pt-3">
                  <div>
                    <span className="text-gray-600">{addon.name}</span>
                    <p className="text-sm text-gray-500">{addon.description}</p>
                  </div>
                  <span className="font-medium">+${addon.price}</span>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>

              {/* Service Fee */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-600">Service Fee</span>
                  <InfoIcon 
                    className="inline-block w-4 h-4 ml-1 text-gray-400" 
                    title="10% platform service fee"
                  />
                </div>
                <span className="font-medium">${serviceFee}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-blue-600">${total}</span>
                  <p className="text-sm text-gray-500">Due today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t">
            <button
              onClick={handleBack}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Book Now - ${total}
          </button>
        </div>
      </div>
    );
  };

  // Success Modal Component
  const SuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Booking Request Sent!</h3>
          <p className="text-gray-600 mb-6">
            A hold has been placed on your card. {service.vendorName} will confirm your booking within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            View Booking Details
          </button>
        </div>
      </div>
    </div>
  );

  // Add payment success handler
  const handlePaymentSuccess = () => {
    setShowSuccessModal(true);
  };

  // Payment Modal
  const PaymentModal = () => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const total = calculateTotal();
    const serviceFee = Math.round(total * 0.1);
    const finalTotal = total + serviceFee;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Payment</h3>
            <button
              onClick={() => setShowPayment(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <button
              onClick={() => setSelectedMethod('card')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center text-sm ${
                selectedMethod === 'card' 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <CreditCardIcon className="h-6 w-6 mb-1" />
              Card
            </button>
            <button
              onClick={() => setSelectedMethod('paypal')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center text-sm ${
                selectedMethod === 'paypal' 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <img src="/paypal-logo.png" alt="PayPal" className="h-6 mb-1" />
              PayPal
            </button>
            <button
              onClick={() => setSelectedMethod('apple')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center text-sm ${
                selectedMethod === 'apple' 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <AppleIcon className="h-6 w-6 mb-1" />
              Apple
            </button>
            <button
              onClick={() => setSelectedMethod('crypto')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center text-sm ${
                selectedMethod === 'crypto' 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <BitcoinIcon className="h-6 w-6 mb-1" />
              Crypto
            </button>
          </div>

          {/* Payment Form Based on Selected Method */}
          <div className="mb-6">
            {selectedMethod === 'card' && (
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  amount={finalTotal}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            )}
            {selectedMethod === 'paypal' && (
              <button className="w-full bg-[#0070BA] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#005ea6] transition-colors">
                Continue with PayPal
              </button>
            )}
            {selectedMethod === 'apple' && (
              <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                Pay with Apple Pay
              </button>
            )}
            {selectedMethod === 'crypto' && (
              <div className="space-y-2">
                <button className="w-full bg-[#F7931A] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#F7931A]/90 transition-colors">
                  Pay with Bitcoin
                </button>
                <button className="w-full bg-[#627EEA] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#627EEA]/90 transition-colors">
                  Pay with Ethereum
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">Service Fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${finalTotal}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProgressSteps = () => (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-blue-600 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="flex flex-col items-center w-32">
              {/* Make entire step clickable */}
              <button
                onClick={() => {
                  // Only allow going back to previous steps
                  if (stepItem.id <= step) {
                    setStep(stepItem.id);
                  }
                }}
                disabled={stepItem.id > step}
                className={`w-full flex flex-col items-center ${
                  stepItem.id > step ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                {/* Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 
                    ${step >= stepItem.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border-2 border-gray-300 text-gray-500'
                    }
                    ${step === stepItem.id && 'ring-4 ring-blue-100'}
                  `}
                >
                  {step > stepItem.id ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-semibold">{stepItem.id}</span>
                  )}
                </div>

                {/* Title */}
                <div className="text-center mt-3">
                  <p className={`text-sm font-medium ${
                    step >= stepItem.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stepItem.name}
                  </p>
                  {step === stepItem.id && (
                    <p className="text-xs text-gray-500 mt-1">
                      {index === 0 && 'Select your preferred date and time'}
                      {index === 1 && 'Tell us about your event'}
                      {index === 2 && 'Review details and confirm'}
                    </p>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStepNavigation = () => {
    // Don't show navigation buttons on Review & Book step (step 3)
    if (step === 3) return null;

    return (
      <div className="mt-8 flex justify-between items-center pt-6 border-t">
        <button
          onClick={handleBack}
          className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={
            (step === 1 && !selectedTimeSlot) ||
            (step === 2 && !bookingDetails.eventType)
          }
          className={`px-6 py-2 rounded-lg font-medium
            ${
              ((step === 1 && !selectedTimeSlot) ||
              (step === 2 && !bookingDetails.eventType))
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          Continue
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                Services
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                <Link 
                  to={`/services/${id}`} 
                  className="ml-4 text-gray-400 hover:text-gray-500"
                >
                  Elite DJs
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                <span className="ml-4 text-gray-500">Booking</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Progress Steps */}
      {renderProgressSteps()}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {step === 1 && renderTimeSelection()}
          {step === 2 && renderEventDetails()}
          {step === 3 && renderReviewAndBook()}

          {/* Navigation Buttons - Only show for steps 1 and 2 */}
          {renderStepNavigation()}
        </div>
      </div>

      {/* Add Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={() => {
          setShowSuccessModal(false);
          navigate('/bookings'); // Navigate to bookings page after success
        }} />
      )}

      {/* Payment Modal */}
      {showPayment && <PaymentModal />}
    </div>
  );
};

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Payment Form Component
const PaymentForm: React.FC<{ amount: number; onSuccess: () => void }> = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      const { clientSecret } = await response.json();

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err) {
      setError('An error occurred while processing your payment');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white
          ${isProcessing 
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {isProcessing ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

// Add new icon components
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InfoIcon: React.FC<{ className?: string, title?: string }> = ({ className, title }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {title && (
      <title>{title}</title>
    )}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AppleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.111.975 1.454 2.2 3.057 3.77 3.004 1.506-.061 2.09-.974 3.912-.974 1.82 0 2.354.974 3.96.974 1.632-.027 2.656-1.485 3.649-2.94 1.242-1.739 1.75-3.418 1.779-3.505-.036-.012-3.417-1.313-3.417-5.223 0-3.308 2.708-4.893 2.828-4.986-1.54-2.293-3.924-2.542-4.752-2.611-2.161-.168-3.982 1.183-4.915 1.183zm3.274-2.857c.828-1.003 1.378-2.393 1.226-3.774-1.183.048-2.615.793-3.465 1.796-.762.88-1.422 2.27-1.24 3.614 1.315.104 2.657-.684 3.479-1.636z" />
  </svg>
);

const BitcoinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.974.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.18-.24.45-.614.35.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
  </svg>
);

const EthereumIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
  </svg>
);

// Add CreditCardIcon component
const CreditCardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M19 15h.01M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
  </svg>
);

export default ServiceBookingPage; 