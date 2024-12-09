'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Venue, VenuePackage, AddOn } from '../../types/venue';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export interface VenueBookingFlowProps {
  venue: Venue;
  selectedPackage: VenuePackage | null;
  initialDate: string;
  initialStartTime: string;
  initialEndTime: string;
  additionalItems: AddOn[];
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'details' | 'review';

// Helper functions
const formatTime = (time: string | undefined) => {
  if (!time) return 'Not set';
  
  try {
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'Invalid time';
    
    const hour = parseInt(hours.toString());
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const standardHour = hour % 12 || 12;
    return `${standardHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  } catch (error) {
    return 'Invalid time';
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const calculateHours = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return 0;
  
  try {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHour, startMinute);
    
    const endDate = new Date();
    endDate.setHours(endHour, endMinute);
    
    const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return Math.max(0, hours);
  } catch (error) {
    return 0;
  }
};

interface BookingDetails {
  date: Date | null;
  startTime: string;
  endTime: string;
  duration: number;
  guests: number;
  eventType: string;
  notes: string;
  usePackage: boolean;
}

const VenueBookingFlow = ({
  venue,
  selectedPackage,
  initialDate,
  initialStartTime,
  initialEndTime,
  additionalItems,
  isOpen,
  onClose
}: VenueBookingFlowProps) => {
  // Add console logs to debug incoming props
  console.log('Venue Booking Flow Props:', {
    initialDate,
    initialStartTime,
    initialEndTime,
    selectedPackage
  });

  // Helper functions first
  const parseInitialDate = () => {
    try {
      return initialDate ? new Date(initialDate) : null;
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
  };

  // Then state declarations
  const [currentStep, setCurrentStep] = useState<'details' | 'review'>('details');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: parseInitialDate(),
    startTime: initialStartTime,
    endTime: initialEndTime,
    duration: calculateHours(initialStartTime, initialEndTime),
    guests: 50,
    eventType: '',
    notes: '',
    usePackage: !!selectedPackage
  });

  // Rest of the component remains exactly the same as ServiceBookingFlow
  // Just replace 'service' with 'venue' in the code
  
  const steps = [
    { id: 'details', name: 'Event Details' },
    { id: 'review', name: 'Review' }
  ];

  const calculateTotal = () => {
    let total = 0;
    
    if (bookingDetails.usePackage && selectedPackage) {
      total += selectedPackage.price;
    } else {
      const hours = calculateHours(bookingDetails.startTime, bookingDetails.endTime);
      total += venue.basePrice * hours;
    }
    
    total += additionalItems.reduce((sum, item) => sum + item.price, 0);
    
    return total;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Rest of the JSX remains exactly the same as ServiceBookingFlow */}
        {/* Just replace 'service' with 'venue' in the code */}
      </Dialog>
    </Transition>
  );
};

export default VenueBookingFlow;