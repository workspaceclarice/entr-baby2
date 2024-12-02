import React from 'react';
import { useNavigate } from 'react-router-dom';
import VendorHeader from '../../components/layout/VendorHeader';
import {
  ArrowTrendingUpIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const VendorSuccessStories: React.FC = () => {
  const navigate = useNavigate();

  const successStories = [
    {
      name: 'The Grand Ballroom',
      location: 'San Francisco, CA',
      revenue: '$25,000',
      increase: '75%',
      quote: "ENTR has transformed our business. We've seen a dramatic increase in bookings and revenue. The platform's tools have helped us streamline operations and reach new customers we couldn't before.",
      owner: 'Sarah Johnson',
      title: 'Owner & Events Director',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      metrics: {
        monthlyBookings: '45+',
        revenueIncrease: '75%',
        customerSatisfaction: '4.9/5'
      }
    },
    {
      name: 'Urban Loft Space',
      location: 'New York, NY',
      revenue: '$18,000',
      increase: '60%',
      quote: "The platform's ease of use and professional tools have helped us scale efficiently. We've doubled our bookings within the first six months and continue to see growth.",
      owner: 'Michael Chen',
      title: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      metrics: {
        monthlyBookings: '38+',
        revenueIncrease: '60%',
        customerSatisfaction: '4.8/5'
      }
    },
    {
      name: 'Rooftop Gardens',
      location: 'Los Angeles, CA',
      revenue: '$32,000',
      increase: '90%',
      quote: "We've expanded our customer base significantly since joining ENTR. The platform's marketing tools and analytics have helped us make better business decisions.",
      owner: 'Emily Rodriguez',
      title: 'CEO',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      metrics: {
        monthlyBookings: '52+',
        revenueIncrease: '90%',
        customerSatisfaction: '4.9/5'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <VendorHeader />
      
      {/* Hero Section */}
      <div className="bg-blue-50 text-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
              Success Stories
            </h1>
            <p className="mt-6 text-xl font-light text-blue-600 max-w-2xl mx-auto">
              Discover how venue owners are transforming their businesses and increasing revenue with ENTR.
            </p>
          </div>
        </div>
      </div>

      {/* Overall Impact Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <CurrencyDollarIcon className="h-12 w-12 text-blue-600 mx-auto" />
              <div className="mt-4 text-4xl font-light text-blue-900">75%</div>
              <div className="mt-2 text-gray-600 font-light">Average Revenue Increase</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <CalendarIcon className="h-12 w-12 text-blue-600 mx-auto" />
              <div className="mt-4 text-4xl font-light text-blue-900">45+</div>
              <div className="mt-2 text-gray-600 font-light">Monthly Bookings</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <UserGroupIcon className="h-12 w-12 text-blue-600 mx-auto" />
              <div className="mt-4 text-4xl font-light text-blue-900">2,500+</div>
              <div className="mt-2 text-gray-600 font-light">New Customers Reached</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {successStories.map((story, index) => (
              <div 
                key={story.name}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="rounded-xl shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-3xl font-light text-gray-900">{story.name}</h2>
                    <p className="text-gray-500 font-light">{story.location}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-blue-600 font-light text-2xl">
                      {story.revenue}
                    </div>
                    <div className="flex items-center text-green-500 font-light">
                      <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                      {story.increase}
                    </div>
                  </div>

                  <blockquote className="text-xl text-gray-600 italic font-light">
                    "{story.quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-light text-gray-900">{story.owner}</div>
                      <div className="text-gray-500 font-light">{story.title}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                    <div>
                      <div className="text-blue-600 font-light">
                        {story.metrics.monthlyBookings}
                      </div>
                      <div className="text-sm text-gray-500 font-light">Monthly Bookings</div>
                    </div>
                    <div>
                      <div className="text-blue-600 font-light">
                        {story.metrics.revenueIncrease}
                      </div>
                      <div className="text-sm text-gray-500 font-light">Revenue Growth</div>
                    </div>
                    <div>
                      <div className="text-blue-600 font-light">
                        {story.metrics.customerSatisfaction}
                      </div>
                      <div className="text-sm text-gray-500 font-light">Customer Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-light">Ready to Write Your Success Story?</h2>
          <p className="mt-4 text-xl text-blue-100 font-light">
            Join these successful venue owners on ENTR
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate('/vendors/list-business')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-light hover:bg-blue-50 transition-colors"
            >
              Get Started Now
            </button>
            <button
              onClick={() => navigate('/vendors/signin')}
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-light hover:bg-blue-800 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSuccessStories; 