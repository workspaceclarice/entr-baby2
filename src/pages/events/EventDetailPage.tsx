import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FloatingRSVP from '../../components/events/FloatingRSVP';
import FloatingTicketPurchase from '../../components/events/FloatingTicketPurchase';
import RSVPFlow from '../../components/events/RSVPFlow';
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Event } from '../../types/event';
import { Link } from 'react-router-dom';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showRSVPFlow, setShowRSVPFlow] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // You might want to show a toast notification here
    }
  };

  const event: Event = {
    id: 'mock-1',
    title: "Craft Cocktail Experience",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=3270&auto=format&fit=crop",
    description: `Join us for an enchanting evening at the historic Mason & Co. as we celebrate the art of craft cocktails and culinary excellence. This intimate gathering brings together mixology enthusiasts, food lovers, and those seeking a sophisticated night out.

Our expert mixologists have curated a special menu featuring five signature cocktails, each paired with carefully crafted small plates that complement and enhance the flavors of both the drinks and dishes.

What to expect:
• Welcome champagne reception
• 5 unique cocktail and food pairings
• Live jazz ensemble
• Interactive mixology demonstration
• Networking with fellow enthusiasts

The venue's exposed brick walls, warm lighting, and industrial-chic decor provide the perfect backdrop for this elevated social experience. With limited seats available, we ensure an intimate atmosphere where you can engage with our mixologists and fellow guests.

Dress code: Smart casual
Dietary restrictions can be accommodated with advance notice.`,
    hostName: "Sarah Chen",
    hostId: "host_1",
    hostImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Mason & Co. • 789 Valencia St, San Francisco",
    date: "2024-03-15",
    time: "7:00 PM - 10:00 PM",
    attendeeCount: 32,
    price: 125,
    category: "Food & Drink",
    isRSVP: true,
    ticketsAvailable: 50,
    formattedPrice: "$125",
    rsvpDeadline: "2024-03-10",
    guestList: {
      going: 32,
      maybe: 8,
      notGoing: 4
    }
  };

  const handleRSVP = (status: 'going' | 'not-going' | 'maybe') => {
    if (status === 'not-going') {
      handleRSVPSubmit({ status: 'not-going' });
    } else {
      setRsvpStatus(status as 'going' | 'maybe');
      setShowRSVPFlow(true);
    }
  };

  const handleRSVPSubmit = (formData: any) => {
    console.log('RSVP Data:', { status: rsvpStatus, ...formData });
    setShowRSVPFlow(false);
    setRsvpStatus(null);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb with proper spacing */}
        <div className="border-b border-gray-100">
          <div className="px-4 py-2.5">
            <div className="flex items-center space-x-2 text-xs font-light">
              <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              <Link to="/events" className="text-gray-500 hover:text-gray-900">Events</Link>
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900">{event.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[60vh]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 -mt-32 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Event Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-light tracking-tight flex-1">{event.title}</h1>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {isLiked ? (
                      <HeartIconSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ShareIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b">
              <img
                src={event.hostImage}
                alt={event.hostName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="text-sm text-gray-500">Hosted by</div>
                <div className="font-medium">{event.hostName}</div>
              </div>
            </div>

            {/* About */}
            <div className="mb-8">
              <h2 className="text-2xl font-light mb-4">About</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Guest List */}
            <div className="mb-8">
              <h2 className="text-2xl font-light mb-4">Guests</h2>
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                      alt={`Guest ${i + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{event.attendeeCount} people</span> are going
                </div>
              </div>
            </div>

            {/* Discussion */}
            <div>
              <h2 className="text-2xl font-light mb-4">Discussion</h2>
              
              {/* Existing Comments */}
              <div className="space-y-6 mb-8">
                <div className="flex space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60"
                    alt="Alex"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-medium">Alex Thompson</span>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      Quick question - will there be non-alcoholic cocktail options available? The menu sounds amazing!
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <img
                    src={event.hostImage}
                    alt={event.hostName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-medium">{event.hostName}</span>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      Hi Alex! Absolutely - we'll have a full non-alcoholic pairing menu available. Just let us know your preference when you arrive!
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&auto=format&fit=crop&q=60"
                    alt="Emma"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-medium">Emma Chen</span>
                      <span className="text-sm text-gray-500">12 hours ago</span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      I attended the last event at Mason & Co. and it was incredible! The jazz band really sets the perfect atmosphere. Already RSVP'd for this one! 🎷✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment Input */}
              <textarea
                placeholder="Ask a question or leave a comment..."
                className="w-full rounded-xl border-gray-200 focus:ring-purple-500 focus:border-purple-500 min-h-[100px] text-sm"
              />
              <button className="mt-2 bg-black text-white px-6 py-2 rounded-full text-sm">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Components */}
      {event.isRSVP ? (
        <FloatingRSVP
          event={event}
          onRSVP={handleRSVP}
        />
      ) : (
        <FloatingTicketPurchase
          event={event}
          onPurchase={() => setShowRSVPFlow(true)}
        />
      )}

      {/* RSVP Flow Modal */}
      {showRSVPFlow && rsvpStatus && (
        <RSVPFlow
          event={event}
          status={rsvpStatus}
          onClose={() => {
            setShowRSVPFlow(false);
            setRsvpStatus(null);
          }}
          onSubmit={handleRSVPSubmit}
        />
      )}
    </div>
  );
};

export default EventDetailPage; 