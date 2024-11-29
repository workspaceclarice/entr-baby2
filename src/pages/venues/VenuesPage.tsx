import React from 'react';
import VenueCard from '../../components/cards/VenueCard';

const VenuesPage: React.FC = () => {
  // Mock data - replace with real data from your backend
  const venues = [
    {
      id: '1',
      title: 'Luxury Downtown Loft',
      category: 'Event Space',
      rating: 4.9,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
      price: '$500/hr',
      location: 'Downtown LA',
      capacity: '200 guests'
    },
    {
      id: '2',
      title: 'Rooftop Garden Venue',
      category: 'Rooftop',
      rating: 4.8,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      price: '$400/hr',
      location: 'Hollywood',
      capacity: '150 guests'
    },
    {
      id: '3',
      title: 'Modern Art Gallery',
      category: 'Gallery',
      rating: 4.7,
      reviews: 86,
      image: 'https://images.unsplash.com/photo-1526306063970-d5498ad00f1c',
      price: '$300/hr',
      location: 'Arts District',
      capacity: '100 guests'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Venues</h1>
        
        {/* Filters Section */}
        <div className="mb-8">
          {/* Add filters here */}
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              id={venue.id}
              title={venue.title}
              category={venue.category}
              rating={venue.rating}
              reviews={venue.reviews}
              image={venue.image}
              price={venue.price}
              location={venue.location}
              capacity={venue.capacity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenuesPage; 