import React from 'react';
import { StarIcon, ChartBarIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface VendorStory {
  id: string;
  vendorName: string;
  businessType: string;
  image: string;
  story: string;
  rating: number;
  revenue: string;
  bookings: number;
  location: string;
}

const vendorStories: VendorStory[] = [
  {
    id: '1',
    vendorName: 'Elegant Events Co.',
    businessType: 'Event Planning & Design',
    image: 'https://images.unsplash.com/photo-1511795409834-432f7b1dd2d9',
    story: "Our business has transformed since joining. The platform's tools have helped us manage events more efficiently and reach a wider audience.",
    rating: 4.9,
    revenue: '$250K+',
    bookings: 150,
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    vendorName: 'Sound & Stage Pro',
    businessType: 'Audio Visual Services',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    story: "The automated booking system and professional platform have helped us scale our business beyond expectations.",
    rating: 4.8,
    revenue: '$180K+',
    bookings: 120,
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    vendorName: 'Bloom & Bouquet',
    businessType: 'Floral & Decor',
    image: 'https://images.unsplash.com/photo-1558732455-669d361cb4b6',
    story: "Being part of this platform has opened doors to high-end events and clients we couldn't reach before.",
    rating: 4.9,
    revenue: '$120K+',
    bookings: 200,
    location: 'New York, NY'
  }
];

const VendorSuccessStories: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Vendor Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful vendors who have transformed their business with our platform
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">$10M+</h3>
            <p className="text-gray-600">Revenue Generated</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <CalendarIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">50,000+</h3>
            <p className="text-gray-600">Events Booked</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <CurrencyDollarIcon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">85%</h3>
            <p className="text-gray-600">Average Revenue Growth</p>
          </div>
        </div>

        {/* Success Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {vendorStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={story.image}
                  alt={story.vendorName}
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {story.vendorName}
                    </h3>
                    <p className="text-sm text-gray-500">{story.businessType}</p>
                    <p className="text-sm text-gray-500">{story.location}</p>
                  </div>
                  <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                    <StarIcon className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-medium text-purple-600">
                      {story.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  "{story.story}"
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Annual Revenue</p>
                    <p className="text-lg font-semibold text-purple-600">
                      {story.revenue}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Bookings</p>
                    <p className="text-lg font-semibold text-purple-600">
                      {story.bookings}+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-purple-600 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our platform and connect with thousands of potential clients looking for services like yours.
          </p>
          <a
            href="/vendors/signup"
            className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors"
          >
            List Your Business
          </a>
        </div>
      </div>
    </section>
  );
};

export default VendorSuccessStories; 