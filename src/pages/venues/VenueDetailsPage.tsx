import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  StarIcon, 
  MapPinIcon, 
  UsersIcon, 
  ChevronLeftIcon, 
  Square3Stack3DIcon, 
  QuestionMarkCircleIcon, 
  HomeIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { venues } from '../../data/venues';
import VenueGallery from '../../components/venues/VenueGallery';
import VenueEstimator from '../../components/venues/VenueEstimator';
import VenueBookingFlow from '../../components/venues/VenueBookingFlow';
import { Breadcrumb } from '../../components/common';

export default function VenueDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const venue = venues.find(v => v.id === id);
  
  if (!venue) {
    return <div className="min-h-screen flex items-center justify-center">Venue not found</div>;
  }

  const averageRating = venue.reviews.reduce((acc, review) => acc + review.rating, 0) / venue.reviews.length;

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'gallery', name: 'Photos' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'faq', name: 'FAQ' },
    { id: 'floorplan', name: 'Floor Plan' },
    { id: 'rules', name: 'Policies' },
  ];

  const galleryPhotos = [
    {
      category: 'Venue',
      images: [
        { url: venue.images[0], caption: 'Main Hall' },
        { url: venue.images[1], caption: 'Entrance' },
        { url: venue.images[2], caption: 'Dining Area' },
        { url: venue.images[3], caption: 'Stage Setup' },
      ]
    },
    {
      category: 'Events',
      images: [
        { url: venue.images[4], caption: 'Wedding Reception' },
        { url: venue.images[5], caption: 'Corporate Event' },
        { url: venue.images[6], caption: 'Birthday Party' },
      ]
    }
  ];

  const menuItems = {
    appetizers: [
      { name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes, garlic, and basil', price: 12 },
      { name: 'Caprese Skewers', description: 'Fresh mozzarella, cherry tomatoes, and basil with balsamic glaze', price: 14 },
      { name: 'Shrimp Cocktail', description: 'Chilled jumbo shrimp with cocktail sauce', price: 16 }
    ],
    mainCourses: [
      { name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herb butter sauce', price: 28 },
      { name: 'Filet Mignon', description: '8oz beef tenderloin with red wine reduction', price: 34 },
      { name: 'Chicken Marsala', description: 'Pan-seared chicken breast with mushroom marsala sauce', price: 26 }
    ],
    desserts: [
      { name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers', price: 10 },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', price: 12 },
      { name: 'New York Cheesecake', description: 'Classic cheesecake with berry compote', price: 11 }
    ]
  };

  const venueRules = [
    {
      title: 'Booking & Cancellation',
      description: 'Minimum 48 hours notice required for cancellations. 50% deposit required to secure booking.'
    },
    {
      title: 'Noise & Music',
      description: 'Music must end by 11 PM on weekdays and 12 AM on weekends. Sound levels must comply with local regulations.'
    },
    {
      title: 'Catering & Alcohol',
      description: 'Outside catering allowed with prior approval. Licensed bartenders required for alcohol service.'
    },
    {
      title: 'Decorations',
      description: 'No confetti, glitter, or adhesive materials on walls. All decorations must be removed after event.'
    }
  ];

  const faqItems = [
    {
      question: "What's included in the venue rental?",
      answer: "Our standard venue rental includes tables, chairs, basic lighting, sound system, cleaning services, and on-site venue coordinator. We also provide parking for up to 100 vehicles and security personnel for the duration of your event."
    },
    {
      question: "Can I bring my own catering?",
      answer: "Yes, we allow outside catering with approved vendors. We can provide a list of preferred caterers who are familiar with our facilities, or you can bring your own licensed caterer. There is a small kitchen facility available for catering prep."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We understand plans can change. Cancellations made 60+ days before the event receive a full refund minus the deposit. Cancellations 30-59 days prior receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations less than 30 days before the event."
    },
    {
      question: "Is there a minimum rental time?",
      answer: "Yes, our minimum rental period is 4 hours. This includes setup and cleanup time. We recommend booking additional time if you're planning a large event to ensure adequate setup and breakdown time."
    },
    {
      question: "Do you provide decorations?",
      answer: "While we don't provide decorations, we can recommend local vendors. You're welcome to decorate the space yourself within our venue guidelines. We do have basic uplighting and string lights available for an additional fee."
    },
    {
      question: "What's your alcohol policy?",
      answer: "All alcohol must be served by licensed bartenders. You can either use our bar service or bring in a licensed bar service. Either way, proof of liability insurance is required. Last call is 30 minutes before your event end time."
    }
  ];

  const expandedDescription = {
    main: `${venue.description} Our versatile venue space has been thoughtfully designed to accommodate a wide range of events, from intimate gatherings to grand celebrations. The main hall features soaring ceilings, abundant natural light, and state-of-the-art acoustics, creating an impressive backdrop for any occasion.`,
    
    features: "The space seamlessly blends modern amenities with timeless elegance, offering flexible floor plans to suit your specific needs. Our climate-controlled environment ensures year-round comfort, while the sophisticated lighting system allows you to create the perfect ambiance for your event.",
    
    location: "Conveniently located in the heart of the city, our venue is easily accessible from major highways and offers ample parking for your guests. The surrounding area boasts numerous hotels and restaurants, making it ideal for out-of-town guests.",
    
    experience: "With years of experience hosting everything from corporate conferences to dream weddings, our dedicated team understands that every event is unique. We pride ourselves on our attention to detail and personalized service, ensuring your event runs smoothly from setup to cleanup."
  };

  const floorPlans = [
    {
      id: 'fp1',
      name: 'Main Hall',
      image: '/images/floor-plans/main-hall.jpg',
      squareFeet: 3000,
      dimensions: "50' x 60'",
      capacity: {
        reception: 300,
        theater: 250,
        banquet: 200,
        classroom: 150,
      },
      features: [
        'Stage area',
        'Built-in bar',
        'Dance floor',
        'High ceilings'
      ]
    },
    {
      id: 'fp2',
      name: 'Garden Terrace',
      image: '/images/floor-plans/garden-terrace.jpg',
      squareFeet: 2000,
      dimensions: "40' x 50'",
      capacity: {
        reception: 200,
        theater: 150,
        banquet: 120,
        classroom: 100,
      },
      features: [
        'Outdoor space',
        'Covered pavilion',
        'Garden lighting',
        'Heating elements'
      ]
    },
    {
      id: 'fp3',
      name: 'VIP Lounge',
      image: '/images/floor-plans/vip-lounge.jpg',
      squareFeet: 1000,
      dimensions: "25' x 40'",
      capacity: {
        reception: 100,
        theater: 80,
        banquet: 60,
        classroom: 40,
      },
      features: [
        'Private entrance',
        'Lounge seating',
        'Private bar',
        'AV equipment'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2">
          <Breadcrumb 
            items={[
              { label: 'Venues', href: '/venues' },
              { label: venue.name }
            ]} 
          />
        </div>
      </div>

      <div className="relative w-full aspect-video md:aspect-[21/9] bg-gray-100">
        <img 
          src={venue.images[0]} 
          alt={venue.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className={`${activeTab === 'overview' ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">{venue.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-5 w-5" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="h-5 w-5" />
                  <span>Up to 350 guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square3Stack3DIcon className="h-5 w-5" />
                  <span>{venue.squareFeet?.toLocaleString() || '3,000'} sq ft</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5" />
                  <span>{averageRating.toFixed(1)} ({venue.reviews.length} reviews)</span>
                </div>
              </div>
            </div>

            <div className="border-b mb-6 md:mb-8">
              <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-none px-4 md:px-6 py-3 text-sm font-light transition-colors whitespace-nowrap
                      ${activeTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-500'
                        : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="prose max-w-none space-y-6">
                    <p className="text-gray-600 leading-relaxed">{expandedDescription.main}</p>
                    <p className="text-gray-600 leading-relaxed">{expandedDescription.features}</p>
                    <p className="text-gray-600 leading-relaxed">{expandedDescription.location}</p>
                    <p className="text-gray-600 leading-relaxed">{expandedDescription.experience}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {venue.features.map((feature, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="font-medium text-gray-900">{feature.name}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <h3 className="text-xl font-light text-gray-900 mb-6">Guest Reviews</h3>
                    <div className="space-y-8">
                      {venue.reviews.slice(0, 3).map((review, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                          <div className="text-sm text-gray-500">- {review.author}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-8">
                  {galleryPhotos.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="text-xl font-light text-gray-900">{section.category}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {section.images.map((photo, index) => (
                          <div 
                            key={index}
                            onClick={() => setSelectedImage(photo.url)}
                            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60">
                              <p className="text-sm text-white">{photo.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {venue.amenities.map((amenity, index) => (
                    <div 
                      key={amenity.id || index} 
                      className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg"
                    >
                      {amenity.icon && <span className="text-purple-500">{amenity.icon}</span>}
                      <span className="text-gray-700 font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <div 
                      key={index}
                      className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                    >
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {item.question}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">
                      Have more questions? Contact our events team at{' '}
                      <a href="mailto:events@venue.com" className="text-purple-600 hover:text-purple-700">
                        events@venue.com
                      </a>
                      {' '}or call us at{' '}
                      <a href="tel:+1234567890" className="text-purple-600 hover:text-purple-700">
                        (123) 456-7890
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'floorplan' && (
                <div className="space-y-8">
                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-600">
                      Explore our versatile spaces designed to accommodate events of any size. 
                      Each floor plan can be customized to meet your specific needs.
                    </p>
                  </div>

                  {floorPlans.map((plan) => (
                    <div key={plan.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* Floor Plan Image */}
                        <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={plan.image}
                            alt={`${plan.name} floor plan`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/800x600?text=Floor+Plan';
                            }}
                          />
                        </div>

                        {/* Floor Plan Details */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-light text-gray-900 mb-2">{plan.name}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Square Footage:</span>
                                <p className="text-gray-900 font-medium">{plan.squareFeet.toLocaleString()} sq ft</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Dimensions:</span>
                                <p className="text-gray-900 font-medium">{plan.dimensions}</p>
                              </div>
                            </div>
                          </div>

                          {/* Capacity Section */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Capacity by Setup</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              {Object.entries(plan.capacity).map(([setup, count]) => (
                                <div key={setup} className="flex items-center space-x-2">
                                  <UsersIcon className="h-4 w-4 text-purple-500" />
                                  <span className="text-gray-600 capitalize">{setup}:</span>
                                  <span className="font-medium text-gray-900">{count}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Features Section */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Key Features</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Square3Stack3DIcon className="h-4 w-4 text-purple-500" />
                                  <span className="text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Additional Information */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <QuestionMarkCircleIcon className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-600">
                        <p className="mb-2">
                          Need help planning your space layout? Our event coordinators can help you create the perfect floor plan for your event.
                        </p>
                        <p>
                          Contact us at{' '}
                          <a href="tel:+1234567890" className="text-purple-600 hover:text-purple-700">
                            (123) 456-7890
                          </a>
                          {' '}to schedule a consultation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-4">
                  {venueRules.map((rule, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">{rule.title}</h3>
                      <p className="text-gray-600 text-sm">{rule.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <VenueEstimator 
                  venue={venue}
                  onBookNow={() => setIsBookingOpen(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Venue"
              className="max-h-full max-w-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <VenueBookingFlow
        venue={venue}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}