import React from 'react';
import VenueCard from '../../components/cards/VenueCard';
import { venues } from '../../data/venues';

const VenuesPage: React.FC = () => {
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
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenuesPage; 