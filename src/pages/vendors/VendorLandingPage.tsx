import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VendorHeader from '../../components/layout/VendorHeader';
import { 
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const VendorLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const marketStats = {
    totalBookings: "50,000+",
    totalRevenue: "$20M+",
    averageIncrease: "200%",
    activeVendors: "5,000+"
  };

  const vendorCategories = [
    { name: "Venues", count: "500+", icon: "🏰" },
    { name: "Photography", count: "450+", icon: "📸" },
    { name: "Catering", count: "300+", icon: "🍽️" },
    { name: "Entertainment", count: "400+", icon: "🎵" },
    { name: "Decor", count: "250+", icon: "✨" },
    { name: "Planning", count: "200+", icon: "📋" }
  ];

  const listingTypes = [
    {
      title: "Popular Event Service Listings",
      subtitle: "List your professional event services on ENTR",
      items: [
        {
          name: "Photography & Videography",
          image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
          description: "Capture special moments",
          popular: ["Wedding Photography", "Event Photography", "Videography"],
          other: ["Photo Booths", "Drone Photography", "Portrait Sessions"]
        },
        {
          name: "Entertainment",
          image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
          description: "Keep the party going",
          popular: ["DJs", "Live Bands", "Musicians"],
          other: ["MCs", "Dancers", "Performers"]
        },
        {
          name: "Catering & Bar",
          image: "https://images.unsplash.com/photo-1555244162-803834f70033",
          description: "Serve amazing food & drinks",
          popular: ["Full-Service Catering", "Bartending", "Food Trucks"],
          other: ["Dessert Bars", "Coffee Carts", "Wine Service"]
        },
        {
          name: "Event Planning",
          image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
          description: "Coordinate flawless events",
          popular: ["Wedding Planning", "Corporate Events", "Party Planning"],
          other: ["Day-of Coordination", "Decor Services", "Vendor Management"]
        }
      ]
    },
    {
      title: "Popular Venue Listings",
      subtitle: "List your unique venue spaces on ENTR",
      items: [
        {
          name: "Elegant Venues",
          image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
          description: "Host grand celebrations",
          popular: ["Ballrooms", "Banquet Halls", "Historic Venues"],
          other: ["Country Clubs", "Hotels", "Mansions"]
        },
        {
          name: "Outdoor Spaces",
          image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
          description: "Create natural experiences",
          popular: ["Gardens", "Rooftops", "Beachfront"],
          other: ["Vineyards", "Farms", "Parks"]
        },
        {
          name: "Urban Venues",
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
          description: "Modern city locations",
          popular: ["Lofts", "Art Galleries", "Warehouses"],
          other: ["Studios", "Co-working Spaces", "Penthouses"]
        },
        {
          name: "Restaurant Venues",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
          description: "Intimate dining spaces",
          popular: ["Private Rooms", "Full Buyouts", "Patios"],
          other: ["Wine Cellars", "Chef's Tables", "Bars"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      {/* Hero Section - Updated with multi-vendor event photo and stats */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"
            alt="Event Service Providers in Action"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-32 md:pb-64">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-200 rounded-full text-sm mb-6 backdrop-blur-sm">
              <span className="mr-2">✨</span>
              For Event Professionals & Venues
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
              Turn inquiries into
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> bookings with event planners</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light mb-12 max-w-2xl leading-relaxed">
              List services or venues to get discovered by event planners. No upfront fees - only pay when you get booked.
            </p>
            <div className="space-x-6">
              <Link
                to="/vendors/list-business"
                className="inline-block px-8 py-4 bg-blue-600 text-white text-base font-light rounded-lg hover:bg-blue-700 transition-colors"
              >
                List Your Business
              </Link>
              <Link
                to="/vendors/signin"
                className="inline-block px-8 py-4 text-white text-base font-light hover:text-blue-200 border border-white/30 rounded-lg hover:border-white/60 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section - Updated with better mobile spacing */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <div className="bg-gradient-to-br from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-sm p-3 md:p-8 rounded-xl text-center transform hover:scale-105 transition-transform shadow-lg hover:shadow-xl border border-white/50">
                <div className="text-xl md:text-3xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {marketStats.totalBookings}
                </div>
                <div className="text-xs md:text-base text-gray-600 font-light mt-1 md:mt-2">Bookings Processed</div>
              </div>
              <div className="bg-gradient-to-br from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-sm p-3 md:p-8 rounded-xl text-center transform hover:scale-105 transition-transform shadow-lg hover:shadow-xl border border-white/50">
                <div className="text-xl md:text-3xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {marketStats.totalRevenue}
                </div>
                <div className="text-xs md:text-base text-gray-600 font-light mt-1 md:mt-2">Revenue Generated</div>
              </div>
              <div className="bg-gradient-to-br from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-sm p-3 md:p-8 rounded-xl text-center transform hover:scale-105 transition-transform shadow-lg hover:shadow-xl border border-white/50">
                <div className="text-xl md:text-3xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {marketStats.averageIncrease}
                </div>
                <div className="text-xs md:text-base text-gray-600 font-light mt-1 md:mt-2">Avg. Revenue Growth</div>
              </div>
              <div className="bg-gradient-to-br from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-sm p-3 md:p-8 rounded-xl text-center transform hover:scale-105 transition-transform shadow-lg hover:shadow-xl border border-white/50">
                <div className="text-xl md:text-3xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {marketStats.activeVendors}
                </div>
                <div className="text-xs md:text-base text-gray-600 font-light mt-1 md:mt-2">Active Vendors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listing Types Showcase - Condensed */}
      <div className="bg-white pt-32 md:pt-44 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-2">List Your Services</h2>
              <p className="text-xl text-gray-600 font-light">Choose from our most popular categories</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Photography",
                  image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
                  examples: ["Wedding", "Events", "Portrait", "Photo Booth"]
                },
                {
                  name: "Entertainment",
                  image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
                  examples: ["DJs", "Live Bands", "Musicians", "MCs"]
                },
                {
                  name: "Catering",
                  image: "https://images.unsplash.com/photo-1555244162-803834f70033",
                  examples: ["Full-Service", "Bartending", "Food Trucks", "Desserts"]
                },
                {
                  name: "Planning",
                  image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
                  examples: ["Wedding", "Corporate", "Party", "Decor"]
                }
              ].map((service) => (
                <div key={service.name} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-medium mb-2">{service.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.examples.map((example) => (
                          <span key={example} className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Venues Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-2">List Your Venue</h2>
              <p className="text-xl text-gray-600 font-light">Perfect for any type of event space</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Elegant",
                  image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
                  examples: ["Ballrooms", "Banquet Halls", "Historic", "Hotels"]
                },
                {
                  name: "Outdoor",
                  image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
                  examples: ["Gardens", "Rooftops", "Beach", "Vineyards"]
                },
                {
                  name: "Urban",
                  image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
                  examples: ["Lofts", "Galleries", "Studios", "Penthouses"]
                },
                {
                  name: "Restaurant",
                  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
                  examples: ["Private Rooms", "Full Buyout", "Patios", "Wine Cellars"]
                }
              ].map((venue) => (
                <div key={venue.name} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-medium mb-2">{venue.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {venue.examples.map((example) => (
                          <span key={example} className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* No Lead Fees Section - Moved after Listing Types */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              No Lead Fees
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Only pay when you get paid - no upfront costs, no monthly fees
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Simple Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">No Monthly Fees</h4>
                  <p className="text-sm text-gray-600 font-light">Start for free</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">No Lead Fees</h4>
                  <p className="text-sm text-gray-600 font-light">Only pay on bookings</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Unlimited Leads</h4>
                  <p className="text-sm text-gray-600 font-light">No restrictions</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Simple Pricing</h4>
                  <p className="text-sm text-gray-600 font-light">20% or less</p>
                </div>
              </div>
            </div>

            {/* Right side - Quick Comparison */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Cost Comparison</h3>
                <Link
                  to="/vendors/pricing"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  View detailed pricing →
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-red-100">
                  <div>
                    <span className="text-red-600 font-medium">Other Platforms</span>
                    <p className="text-sm text-gray-500 mt-1">Pay per lead + monthly fees</p>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-medium">$99-299/mo</div>
                    <div className="text-sm text-gray-500">+ $15-45 per lead</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-green-100">
                  <div>
                    <span className="text-green-600 font-medium">ENTR Platform</span>
                    <p className="text-sm text-gray-500 mt-1">Commission on bookings only</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-medium">$0 upfront</div>
                    <div className="text-sm text-gray-500">20% per booking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How ENTR Works Section - Static Interactive Version */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              How ENTR Works
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Get started in minutes and start receiving bookings
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  step: 1,
                  title: "Create Your Profile",
                  description: "List your services and showcase your work",
                  icon: "📝",
                  color: "from-blue-500/10 to-blue-600/10"
                },
                {
                  step: 2,
                  title: "Receive Bookings",
                  description: "Get booking requests from qualified customers",
                  icon: "📅",
                  color: "from-purple-500/10 to-purple-600/10"
                },
                {
                  step: 3,
                  title: "Deliver Service",
                  description: "Provide your amazing service to customers",
                  icon: "⭐",
                  color: "from-indigo-500/10 to-indigo-600/10"
                },
                {
                  step: 4,
                  title: "Get Paid",
                  description: "Receive secure payments directly to your account",
                  icon: "💰",
                  color: "from-blue-500/10 to-blue-600/10"
                }
              ].map((step) => (
                <motion.div 
                  key={step.step}
                  whileHover={{ scale: 1.02 }}
                  className="w-full"
                >
                  <div className={`bg-gradient-to-br ${step.color} backdrop-blur-sm rounded-xl p-6 h-full border border-white/50 relative`}>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      {step.step}
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <span className="text-4xl mb-4">{step.icon}</span>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 font-light">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-light">Ready to Grow Your Business?</h2>
          <p className="mt-4 text-xl text-blue-100 font-light">
            Join {marketStats.activeVendors} successful venues and service providers on ENTR
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/vendors/list-business"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-light hover:bg-blue-50 transition-colors"
            >
              List Your Business
            </Link>
            <Link
              to="/vendors/pricing"
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-light hover:bg-blue-800 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLandingPage; 