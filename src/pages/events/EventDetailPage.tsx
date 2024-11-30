import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, CalendarIcon, ClockIcon, UserGroupIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Event } from '../../types/event';
import { events } from '../../data/events';
import EventCheckout from '../../components/events/EventCheckout';
import FloatingTicketPurchase from '../../components/events/FloatingTicketPurchase';
import HostSection from '../../components/events/HostSection';
import EventLocationMap from '../../components/events/EventLocationMap';
import { mockEventData } from '../../data/mockEventData';
import FloatingRSVP from '../../components/events/FloatingRSVP';
import RSVPFlow from '../../components/events/RSVPFlow';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'not-going' | 'maybe' | null>(null);

  const event = events.find(e => e.id === id);
  if (!event) return <div>Event not found</div>;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const standardHour = hour % 12 || 12;
    return `${standardHour}:${minutes} ${ampm}`;
  };

  const handleRSVP = (status: 'going' | 'not-going' | 'maybe') => {
    setRsvpStatus(status);
    setShowCheckout(true);
  };

  const handleRSVPSubmit = (formData: any) => {
    console.log('RSVP Data:', { status: rsvpStatus, ...formData });
    setShowCheckout(false);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Image */}
      <div className="relative h-[45vh]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button onClick={() => setIsLiked(!isLiked)} className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <HeartIcon className={`h-5 w-5 ${isLiked ? 'text-red-500' : 'text-white'}`} />
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <ShareIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Host Section - Now Left Aligned */}
        <div className="py-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            {mockEventData.hosts.map((host, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img
                  src={host.image}
                  alt={host.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{host.name}</p>
                  <p className="text-xs text-gray-500">{host.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="py-6">
          <h1 className="text-3xl font-light text-gray-900 mb-4">{event.title}</h1>
          <div className="space-y-2 text-gray-600 mb-8">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-3" />
              <span className="font-light text-sm">
                {new Date(event.date).toLocaleDateString()} at {formatTime(event.time)}
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-3" />
              <span className="font-light text-sm">{event.location}</span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="h-4 w-4 mr-3" />
              <span className="font-light text-sm">{event.attendeeCount} attending</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">About this Event</h2>
            <p className="text-gray-600 leading-relaxed font-light text-sm">
              Join us for an unforgettable evening of music, art, and community. This unique event brings together local talents and established artists for a night of creative expression and celebration. Featuring live performances, interactive art installations, and gourmet refreshments, this event promises to be a highlight of the season.
              <br /><br />
              {event.description}
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Event Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {mockEventData.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Event preview ${index + 1}`}
                  className="rounded-lg w-full h-48 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Location Map */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Location</h2>
            <EventLocationMap 
              location={{ lat: 37.7749, lng: -122.4194 }} 
              name={event.title}
            />
            <a
              href={`https://maps.google.com/?q=${event.location}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-purple-600 hover:text-purple-700 text-sm font-light"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      {event.isRSVP ? (
        <FloatingRSVP
          event={event}
          onRSVP={handleRSVP}
        />
      ) : (
        <FloatingTicketPurchase
          event={event}
          onPurchase={() => setShowCheckout(true)}
        />
      )}

      {/* RSVP Flow Modal */}
      {showCheckout && event.isRSVP && rsvpStatus && (
        <RSVPFlow
          event={event}
          status={rsvpStatus}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleRSVPSubmit}
        />
      )}

      {/* Regular Checkout Modal */}
      {showCheckout && !event.isRSVP && (
        <EventCheckout
          event={event}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
};

export default EventDetailPage; 