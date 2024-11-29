import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Event } from '../../types';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import TicketPurchaseMenu from '../../components/events/TicketPurchaseMenu';

const TicketedEventPage: React.FC = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const mapStyles = {
    height: '400px',
    width: '100%',
    borderRadius: '0.5rem'
  };

  const handlePurchase = (ticketId: string, quantity: number) => {
    console.log('Purchase:', { ticketId, quantity });
    // TODO: Implement purchase logic
  };

  // Mock festival event data
  const event: Event = {
    id: '1',
    title: 'Summer Music Festival 2024',
    hostId: 'host1',
    hostName: 'Live Nation Events',
    hostImage: 'https://picsum.photos/seed/host1/200/200',
    coverImage: 'https://picsum.photos/seed/concert/1200/600',
    date: '2024-07-15T16:00:00Z',
    location: 'Miami Beach Arena, FL',
    price: 75,
    attendeeCount: 1200,
    interestedCount: 3500,
    description: `Get ready for the biggest music festival of the summer! 🎸

    Featuring an incredible lineup of artists across multiple stages:
    • Main Stage: Top international headliners
    • Beach Stage: Electronic dance music
    • Sunset Stage: Indie and alternative acts
    
    Experience includes:
    • Multiple food and beverage vendors
    • VIP lounges with premium views
    • Interactive art installations
    • Exclusive merchandise
    • Free water stations
    
    Don't miss out on this incredible music experience!`,
    images: [
      'https://picsum.photos/seed/concert1/800/600',
      'https://picsum.photos/seed/concert2/800/600',
      'https://picsum.photos/seed/concert3/800/600',
    ],
    isRSVP: false,
    ticketTypes: [
      {
        id: 'general',
        name: 'General Admission',
        description: 'Access to main festival grounds and all stages',
        price: 75,
        available: 1000
      },
      {
        id: 'vip',
        name: 'VIP Experience',
        description: 'Premium viewing areas, exclusive lounge access, complimentary drinks, and festival merch pack',
        price: 199,
        available: 200
      },
      {
        id: 'early',
        name: 'Early Bird Special',
        description: 'Limited time offer - 20% off General Admission. Early entry to festival grounds.',
        price: 60,
        available: 100
      }
    ],
    speakers: [
      {
        name: 'DJ Pulse',
        role: 'Headlining Artist',
        image: 'https://picsum.photos/seed/artist1/200/200',
        bio: 'International DJ with chart-topping hits'
      },
      {
        name: 'The Soundwaves',
        role: 'Featured Band',
        image: 'https://picsum.photos/seed/artist2/200/200',
        bio: 'Award-winning indie rock band'
      }
    ],
    schedule: [
      {
        time: '16:00',
        title: 'Gates Open',
        description: 'Early entry for VIP ticket holders'
      },
      {
        time: '17:00',
        title: 'Opening Acts',
        description: 'Rising stars take the stage'
      },
      {
        time: '19:00',
        title: 'Main Performances',
        description: 'Headlining artists begin'
      }
    ],
    venue: {
      name: 'Miami Beach Arena',
      address: '123 Ocean Drive, Miami Beach, FL',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-indigo-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-black">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-purple-500 text-white text-sm font-medium mb-4">
              Music Festival
            </div>
            <h1 className="text-5xl font-bold mb-4">
              {event.title}
            </h1>
            <div className="flex items-center space-x-4">
              <img
                src={event.hostImage}
                alt={event.hostName}
                className="w-12 h-12 rounded-full border-2 border-purple-300"
              />
              <div>
                <p className="text-sm text-purple-200">Presented by</p>
                <p className="font-medium text-white">{event.hostName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Artists Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {event.speakers?.map((artist, index) => (
              <div key={index} className="flex space-x-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-xl">{artist.name}</h3>
                  <p className="text-purple-600">{artist.role}</p>
                  <p className="text-gray-600 mt-2">{artist.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Event Info Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Event Information</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Event Schedule</h2>
          <div className="space-y-6">
            {event.schedule?.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium">
                  {item.time}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Venue</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <LocationIcon className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{event.venue?.name}</p>
                <p className="text-gray-600">{event.venue?.address}</p>
              </div>
            </div>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={event.venue?.coordinates || { lat: 0, lng: 0 }}
              >
                {event.venue?.coordinates && (
                  <Marker position={event.venue.coordinates} />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {event.images?.map((image, index) => (
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
      </div>

      {/* Ticket Purchase Menu */}
      <TicketPurchaseMenu
        tickets={event.ticketTypes || []}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default TicketedEventPage; 