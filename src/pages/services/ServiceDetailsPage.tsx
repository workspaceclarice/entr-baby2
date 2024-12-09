import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, TagIcon, ShareIcon, CheckCircleIcon, CameraIcon } from '@heroicons/react/24/outline';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import { Service, ServicePackage, AdditionalItem as ServiceAdditionalItem } from '../../types/service';
import { services } from '../../data/services';
import ServiceEstimator from '../../components/services/ServiceEstimator';
import ServiceBookingFlow from '../../components/services/ServiceBookingFlow';
import VendorProfile from '../../components/vendors/VendorProfile';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Breadcrumb, BreadcrumbItem } from '../../components/common';
import FloatingEstimator from '../../components/common/FloatingEstimator';

interface ServiceReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  eventType: string;
}

const mockReviews: ServiceReview[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    date: '2024-02-15',
    rating: 5,
    comment: 'Exceptional service! The photographer captured every special moment perfectly. Their attention to detail and professional approach made our wedding day even more memorable.',
    eventType: 'Wedding Photography'
  },
  {
    id: '2',
    author: 'Michael Chen',
    date: '2024-01-30',
    rating: 4,
    comment: 'Great corporate event photography. They were unobtrusive yet managed to capture all the key moments. The turnaround time for edited photos was impressive.',
    eventType: 'Corporate Event'
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    date: '2024-01-15',
    rating: 5,
    comment: 'Amazing family portrait session! They were great with the kids and the photos turned out beautiful. The whole experience was enjoyable and stress-free.',
    eventType: 'Family Portrait'
  },
  {
    id: '4',
    author: 'David Thompson',
    date: '2024-01-10',
    rating: 5,
    comment: 'Fantastic product photography for our e-commerce site. The quality of work exceeded our expectations. Very professional and efficient.',
    eventType: 'Commercial Photography'
  }
];

const tabs = [
  { id: 'overview' as const, name: 'Overview' },
  { id: 'packages' as const, name: 'Packages' },
  { id: 'gallery' as const, name: 'Gallery' },
  { id: 'reviews' as const, name: 'Reviews' },
  { id: 'faq' as const, name: 'FAQ' }
];

interface ServiceEstimatorProps {
  service: Service;
  selectedPackage: ServicePackage | null;
  onBookNow: (selectedItems: ServiceAdditionalItem[]) => void;
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [selectedAdditionalItems, setSelectedAdditionalItems] = useState<ServiceAdditionalItem[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'gallery' | 'faq' | 'reviews'>('overview');

  const service = services.find(s => s.id === id);
  if (!service) return <div>Service not found</div>;

  // Mock data for the service details
  const mockServiceDetails = {
    vendorProfile: {
      vendorId: 'v1',
      name: 'Elite Photography Studio',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
      bio: 'Award-winning photography studio specializing in events and portraits. Our team of professional photographers brings creative vision and technical expertise to every shoot.',
      rating: 4.9,
      reviewCount: 128,
      responseTime: '1 hour',
      memberSince: 'Jan 2020',
      isVerified: true
    },
    highlights: [
      { icon: '📸', text: '10+ Years Experience' },
      { icon: '🏆', text: 'Award Winning' },
      { icon: '⚡', text: 'Quick Response' },
      { icon: '✨', text: 'Premium Equipment' }
    ],
    testimonials: [
      {
        id: 't1',
        author: 'Sarah M.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        rating: 5,
        text: 'Absolutely amazing service! The team was professional, creative, and delivered stunning photos.',
        date: '2 weeks ago'
      },
      {
        id: 't2',
        author: 'Michael R.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        rating: 5,
        text: 'Elite Photography exceeded all our expectations. They captured every special moment perfectly.',
        date: '1 month ago'
      }
    ],
    faq: [
      {
        question: 'What is your cancellation policy?',
        answer: 'Free cancellation up to 48 hours before the event. Cancellations within 48 hours may be subject to a fee of 25% of the total booking amount. In case of emergencies, please contact us to discuss options.'
      },
      {
        question: 'Do you provide raw files?',
        answer: 'We provide fully edited high-resolution images in both digital and print formats. Raw files are available for an additional fee and are typically requested by clients who have their own post-processing preferences.'
      },
      {
        question: 'How long does it take to get the photos?',
        answer: "You will receive a curated preview within 48 hours of the event. The full gallery will be delivered within 2 weeks, professionally edited and ready for download."
      },
      {
        question: 'What equipment do you use?',
        answer: 'We use professional-grade Canon and Sony mirrorless cameras, along with a variety of premium lenses suitable for different lighting conditions and styles. Our equipment is regularly maintained and we always carry backup gear.'
      },
      {
        question: 'Do you have backup photographers?',
        answer: 'Yes, we maintain a network of professional photographers who can step in if needed. For large events, we typically recommend having a second shooter regardless, to ensure comprehensive coverage.'
      },
      {
        question: 'What is your payment structure?',
        answer: 'We require a 30% deposit to secure your date, with the remaining balance due one week before the event. We accept all major credit cards, bank transfers, and digital payment methods.'
      },
      {
        question: 'Do you travel for events?',
        answer: 'Yes, we are available for events worldwide. Travel fees may apply for locations outside of our base area. Please contact us for a custom quote including travel arrangements.'
      },
      {
        question: 'What happens if there is bad weather?',
        answer: 'For outdoor shoots, we monitor weather conditions closely and will work with you to either proceed with indoor alternatives or reschedule if necessary, at no additional cost.'
      },
      {
        question: 'How many photos will we receive?',
        answer: 'The number of photos varies depending on the package and event duration, but you can typically expect 50-75 edited photos per hour of coverage. All photos are carefully curated and edited to our professional standards.'
      },
      {
        question: 'Do you offer prints or albums?',
        answer: 'Yes, we offer a variety of high-quality prints, canvas wraps, and custom-designed albums. These can be ordered directly through your online gallery or discussed during our consultation.'
      }
    ]
  };

  const handleBookNow = (selectedItems: ServiceAdditionalItem[]) => {
    setSelectedAdditionalItems(selectedItems);
    setShowBookingFlow(true);
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Services', href: '/services' },
    { label: service.title, href: `/services/${service.id}` }
  ];

  return (
    <div className="min-h-screen bg-white pt-16 pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2">
          <Breadcrumb 
            items={breadcrumbItems} 
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-video md:aspect-[21/9] bg-gray-100">
        <img 
          src={service.profileImage} 
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Title and Stats Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-light text-gray-900">{service.title}</h1>
          </div>

          {/* Stats Bar - Wrapped for mobile */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 text-sm mb-4">
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-5 w-5" />
              <span className="font-light">{service.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <TagIcon className="h-5 w-5" />
              <span className="font-light">${service.basePrice}/hour</span>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon className="h-5 w-5" />
              <span className="font-light">{mockServiceDetails.vendorProfile.rating} ({mockServiceDetails.vendorProfile.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Left column - Content */}
            <div className="lg:col-span-8">
              {/* Vendor Profile Section */}
              <div className="border-t border-b border-gray-100 py-8 mb-0">
                {/* Host Info */}
                <div 
                  onClick={() => navigate(`/vendors/${service.vendorId}`)}
                  className="flex items-center gap-3 cursor-pointer group mb-6"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={service.vendorImage}
                      alt={service.vendorName}
                      className="h-14 w-14 rounded-full object-cover border-2 border-purple-100 group-hover:border-purple-300 transition-colors"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/56?text=V';
                      }}
                    />
                    <div className="text-left">
                      <p className="text-base font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {service.vendorName}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>5 years in business</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Listing Highlights */}
                <h3 className="text-lg font-medium text-gray-900 mb-4">Listing highlights</h3>
                <div className="space-y-4 lg:pb-0">
                  <div className="flex gap-4">
                    <StarIcon className="h-6 w-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-base font-medium text-gray-900">Experienced photographer</p>
                      <p className="text-sm text-gray-500">{service.vendorName} has been capturing moments for over 5 years.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircleIcon className="h-6 w-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-base font-medium text-gray-900">Professional service</p>
                      <p className="text-sm text-gray-500">Recent clients gave the photography service a 5-star rating.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CameraIcon className="h-6 w-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-base font-medium text-gray-900">Premium equipment</p>
                      <p className="text-sm text-gray-500">Uses professional-grade cameras and lighting for exceptional quality.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Tabs */}
              <div className="border-b mt-0">
                <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

              {/* Tab Content */}
              <div className="pt-6 md:pt-8 space-y-8">
                {/* Keep existing tab content but update styling */}
                {activeTab === 'overview' && (
                  <div className="space-y-12">
                    {/* Main Description */}
                    <div className="prose max-w-none space-y-6">
                      <h3 className="text-xl font-light text-gray-900">About Our Photography Services</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Elite Photography Studio brings over a decade of experience capturing life's most precious moments. 
                        Our team of professional photographers combines technical expertise with creative vision to deliver 
                        stunning imagery that tells your unique story. Whether it's a wedding, corporate event, family 
                        portrait session, or commercial photography, we approach each project with dedication and artistry.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Using state-of-the-art equipment and drawing from years of experience, we ensure every detail is 
                        captured perfectly. Our post-processing techniques enhance the natural beauty of each image while 
                        maintaining authenticity.
                      </p>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <img 
                          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
                          alt="Wedding photography"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1519741497674-611481863552"
                          alt="Corporate event photography"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-6">
                        <img 
                          src="https://images.unsplash.com/photo-1472653431158-6364773b2a56"
                          alt="Family portrait"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e"
                          alt="Product photography"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-gray-900">Our Specialties</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                          {
                            title: "Wedding Photography",
                            description: "Capturing the magic of your special day with a perfect blend of candid moments and artistic portraits.",
                            icon: "💑"
                          },
                          {
                            title: "Corporate Events",
                            description: "Professional coverage of business events, conferences, and corporate portraits.",
                            icon: "🏢"
                          },
                          {
                            title: "Family Portraits",
                            description: "Creating lasting memories with natural, relaxed family photography sessions.",
                            icon: "👨‍👩‍👧‍👦"
                          },
                          {
                            title: "Product Photography",
                            description: "High-quality commercial photography for your products and marketing materials.",
                            icon: "📸"
                          },
                          {
                            title: "Special Events",
                            description: "From birthdays to anniversaries, we capture all of life's celebrations.",
                            icon: "🎉"
                          },
                          {
                            title: "Fashion & Portrait",
                            description: "Creative portrait sessions for models, professionals, and individuals.",
                            icon: "👔"
                          }
                        ].map((specialty, index) => (
                          <div key={index} className="bg-purple-50 rounded-lg p-6 space-y-2">
                            <span className="text-2xl">{specialty.icon}</span>
                            <h4 className="text-purple-900 font-medium">{specialty.title}</h4>
                            <p className="text-purple-700 text-sm">{specialty.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Equipment & Process */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-gray-900">Our Equipment & Process</h3>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Professional Equipment</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li>• Full-frame professional DSLR cameras</li>
                              <li>• Wide range of prime and zoom lenses</li>
                              <li>• Professional lighting equipment</li>
                              <li>• Backup equipment for every shoot</li>
                              <li>• Latest editing software and tools</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Our Process</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li>• Initial consultation to understand your vision</li>
                              <li>• Detailed planning and shot list preparation</li>
                              <li>• Professional shooting with attention to detail</li>
                              <li>• Careful selection and professional editing</li>
                              <li>• Quick turnaround and delivery</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'packages' && (
                  <div className="space-y-8">
                    <div className="prose max-w-none mb-8">
                      <p className="text-gray-600">
                        Choose from our carefully curated packages designed to meet your photography needs.
                      </p>
                    </div>
                    
                    <div className="grid gap-6">
                      {service.packages.map((pkg) => (
                        <div 
                          key={pkg.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-purple-200 transition-colors"
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-medium text-gray-900">{pkg.name}</h3>
                                <p className="text-gray-600 mt-1">{pkg.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-medium text-gray-900">${pkg.price}</div>
                                <div className="text-sm text-gray-500">{pkg.duration || 'Per session'}</div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {pkg.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                  <svg 
                                    className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                  >
                                    <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth={2} 
                                      d="M5 13l4 4L19 7" 
                                    />
                                  </svg>
                                  <span className="text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Items Section */}
                    <div className="pt-8 border-t border-gray-100">
                      <h3 className="text-lg font-medium text-gray-900 mb-6">Additional Items</h3>
                      <div className="space-y-4">
                        {service.additionalItems?.map((item) => (
                          <div 
                            key={item.id}
                            className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:border-purple-100 transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-lg font-medium text-gray-900">${item.price}</div>
                              <div className="text-sm text-gray-500">per item</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="rounded-lg w-full h-64 object-cover"
                      />
                    ))}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-light">Frequently Asked Questions</h2>
                        <p className="mt-2 text-gray-600">Everything you need to know about our photography services.</p>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {mockServiceDetails.faq.map((item, index) => (
                          <Disclosure key={index}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
                                  <span className="text-gray-900 font-medium">{item.question}</span>
                                  <ChevronDownIcon
                                    className={`${
                                      open ? 'transform rotate-180' : ''
                                    } w-5 h-5 text-gray-500 transition-transform duration-200`}
                                  />
                                </Disclosure.Button>
                                <Transition
                                  enter="transition duration-100 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-75 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                                >
                                  <Disclosure.Panel className="px-6 py-4 bg-gray-50">
                                    <p className="text-gray-600 leading-relaxed">
                                      {item.answer}
                                    </p>
                                  </Disclosure.Panel>
                                </Transition>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                    </div>

                    {/* Contact Support */}
                    <div className="mt-8 text-center">
                      <p className="text-gray-600">
                        Still have questions?{' '}
                        <button className="text-purple-600 font-medium hover:text-purple-700">
                          Contact our support team
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-light text-gray-900">Client Reviews</h3>
                          <p className="text-sm text-gray-600">Based on {mockReviews.length} reviews</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-6 w-6 text-yellow-400" />
                          <span className="text-2xl font-light">{mockServiceDetails.vendorProfile.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{review.author}</h4>
                              <p className="text-sm text-gray-500">{review.eventType}</p>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Right column - Sticky ServiceEstimator */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ServiceEstimator
                    service={service}
                    onBookingClick={handleBookNow}
                    initialPackage={selectedPackage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Flow */}
      {showBookingFlow && (
        <ServiceBookingFlow
          service={service}
          selectedPackage={selectedPackage}
          initialDate={selectedDate}
          initialStartTime={selectedStartTime}
          initialEndTime={selectedEndTime}
          additionalItems={selectedAdditionalItems}
          isOpen={showBookingFlow}
          onClose={() => setShowBookingFlow(false)}
        />
      )}

      <div className="lg:hidden">
        <FloatingEstimator
          startingPrice={service.basePrice}
          itemId={service.id}
        >
          <ServiceEstimator
            service={service}
            onBookingClick={handleBookNow}
            initialPackage={selectedPackage}
          />
        </FloatingEstimator>
      </div>
    </div>
  );
};

export default ServiceDetailsPage; 