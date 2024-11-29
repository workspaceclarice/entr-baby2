import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Event } from '../../types';
import RSVPActionMenu from '../../components/events/RSVPActionMenu';

const RSVPEventPage: React.FC = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock birthday event data
  const event: Event = {
    id: '2',
    title: "Sarah's 25th Birthday Celebration",
    hostId: 'host2',
    hostName: 'Sarah Smith',
    hostImage: 'https://picsum.photos/seed/host2/200/200',
    coverImage: 'https://picsum.photos/seed/birthday/1200/600',
    date: '2024-06-20T19:00:00Z',
    location: 'Rooftop Garden Lounge, Los Angeles',
    attendeeCount: 50,
    interestedCount: 75,
    description: `Join us for a magical evening celebrating Sarah's 25th birthday! 🎉

    Get ready for a night filled with:
    • Live DJ and dancing 💃
    • Signature cocktails 🍸
    • Photo booth with props 📸
    • Late night dessert bar 🍰
    • Stunning city views ✨
    
    Dress code: Cocktail attire with a touch of sparkle ✨`,
    images: [
      'https://picsum.photos/seed/birthday1/800/600',
      'https://picsum.photos/seed/birthday2/800/600',
    ],
    isRSVP: true,
    rsvpDeadline: '2024-06-15',
    maxGuests: 100,
    guestList: {
      going: 45,
      maybe: 20,
      invited: 150
    },
    schedule: [
      {
        time: '19:00',
        title: 'Welcome Drinks',
        description: 'Arrival & Welcome Cocktails 🍸'
      },
      {
        time: '20:00',
        title: 'Dinner Service',
        description: 'Gourmet Buffet Opens 🍽️'
      },
      {
        time: '21:00',
        title: 'Birthday Celebration',
        description: 'Cake & Champagne Toast 🎂'
      },
      {
        time: '21:30',
        title: 'Dancing',
        description: 'DJ Starts the Party 🎵'
      }
    ]
  };

  const handleRSVP = (status: 'going' | 'maybe' | 'not-going') => {
    console.log('RSVP Status:', status);
    // TODO: Implement RSVP logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-black">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/80 via-purple-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-500 text-white text-sm font-medium mb-4">
              Birthday Celebration 🎂
            </div>
            <h1 className="text-5xl font-bold mb-4 text-white">
              {event.title}
            </h1>
            <div className="flex items-center space-x-4">
              <img
                src={event.hostImage}
                alt={event.hostName}
                className="w-12 h-12 rounded-full border-2 border-pink-300"
              />
              <div>
                <p className="text-sm text-pink-200">Hosted by</p>
                <p className="font-medium text-white">{event.hostName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-12 flex items-center justify-between border border-pink-100">
          <div className="flex space-x-8">
            <div>
              <p className="text-sm text-gray-500">Going</p>
              <p className="text-2xl font-bold text-pink-600">{event.guestList?.going}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Maybe</p>
              <p className="text-2xl font-bold text-purple-600">{event.guestList?.maybe}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Invited</p>
              <p className="text-2xl font-bold text-pink-600">{event.guestList?.invited}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">RSVP Deadline</p>
            <p className="text-lg font-medium text-pink-600">
              {new Date(event.rsvpDeadline!).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Event Content */}
        <div className="space-y-8">
          {/* About Section */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-3xl font-bold mb-6 text-pink-900">About this Celebration</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
            </div>
          </section>

          {/* Schedule Section */}
          {event.schedule && (
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
              <h2 className="text-3xl font-bold mb-6 text-pink-900">Party Schedule</h2>
              <div className="space-y-6">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg font-medium">
                      {item.time}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-pink-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {event.images && (
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
              <h2 className="text-3xl font-bold mb-6 text-pink-900">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Event ${index + 1}`}
                    className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* RSVP Menu */}
      <RSVPActionMenu
        guestCount={event.guestList!}
        onRSVP={handleRSVP}
      />
    </div>
  );
};

export default RSVPEventPage; 