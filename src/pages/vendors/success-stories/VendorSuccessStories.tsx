import React from 'react';
import { Link } from 'react-router-dom';
import VendorHeader from '../../../components/layout/VendorHeader';

const VendorSuccessStories: React.FC = () => {
  const stories = [
    {
      name: 'Sarah Johnson',
      business: 'Eventful Spaces',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      quote: 'Since joining entr, our venue bookings have increased by 200%. The platform made it easy to showcase our spaces and manage bookings efficiently.',
      metrics: {
        bookings: '200+',
        revenue: '150K+',
        growth: '3x'
      }
    },
    {
      name: 'Michael Chen',
      business: 'MC Photography',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      quote: 'The exposure we got through entr has been incredible. We\'ve connected with amazing clients and our business has grown exponentially.',
      metrics: {
        bookings: '150+',
        revenue: '100K+',
        growth: '2.5x'
      }
    },
    {
      name: 'Lisa Rodriguez',
      business: 'Stellar Events',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      quote: 'entr\'s platform streamlined our entire booking process. We can now focus on what we do best - creating amazing events.',
      metrics: {
        bookings: '300+',
        revenue: '200K+',
        growth: '4x'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            See how businesses like yours are growing with entr
          </p>
        </div>

        {/* Success Stories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stories.map((story, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <blockquote className="text-xl font-light text-gray-600 mb-6">
                    "{story.quote}"
                  </blockquote>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900">{story.name}</h3>
                    <p className="text-gray-600">{story.business}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className="text-2xl font-medium text-blue-600">
                        {story.metrics.bookings}
                      </div>
                      <div className="text-sm text-gray-600">
                        Bookings
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium text-blue-600">
                        ${story.metrics.revenue}
                      </div>
                      <div className="text-sm text-gray-600">
                        Revenue
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium text-blue-600">
                        {story.metrics.growth}
                      </div>
                      <div className="text-sm text-gray-600">
                        Growth
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Ready to write your success story?
          </h2>
          <div className="space-x-4">
            <Link
              to="/vendors/signup"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
            >
              List Your Business
            </Link>
            <Link
              to="/vendors/features"
              className="inline-block px-6 py-3 text-blue-600 text-sm font-light hover:text-blue-700"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSuccessStories; 