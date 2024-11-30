import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, TagIcon, ShareIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import { Service, ServicePackage, AdditionalItem } from '../../types/service';
import { services } from '../../data/services';
import ServiceEstimator from '../../components/services/ServiceEstimator';
import ServiceBookingFlow from '../../components/services/ServiceBookingFlow';
import VendorProfile from '../../components/vendors/VendorProfile';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [selectedAdditionalItems, setSelectedAdditionalItems] = useState<AdditionalItem[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'gallery' | 'faq'>('overview');

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

  const handleBookNow = (items: AdditionalItem[]) => {
    setSelectedAdditionalItems(items);
    setShowBookingFlow(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh]">
        <img
          src={service.profileImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button onClick={() => setIsLiked(!isLiked)} className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <HeartIcon className={`h-6 w-6 ${isLiked ? 'text-red-500' : 'text-white'}`} />
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <ShareIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Service Info */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="max-w-7xl mx-auto text-white">
            <h1 className="text-3xl font-light mb-2">{service.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-1" />
                <span>{service.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['overview', 'packages', 'gallery', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Content */}
          <div className={`${activeTab === 'overview' ? 'lg:w-2/3' : 'w-full'}`}>
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Vendor Profile */}
                <VendorProfile {...mockServiceDetails.vendorProfile} />

                {/* Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockServiceDetails.highlights.map((highlight, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center">
                      <span className="text-2xl">{highlight.icon}</span>
                      <p className="mt-2 text-sm font-medium text-gray-600">{highlight.text}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-light mb-4">About this service</h2>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-light mb-4">What's included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <h3 className="font-medium">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div>
                  <h2 className="text-2xl font-light mb-4">What people are saying</h2>
                  <div className="grid gap-6">
                    {mockServiceDetails.testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-start space-x-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{testimonial.author}</h3>
                              <span className="text-sm text-gray-500">{testimonial.date}</span>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-gray-600">{testimonial.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-xl p-6 shadow-sm ${
                      pkg.isPopular ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-medium mb-2">{pkg.name}</h3>
                    <p className="text-3xl font-light mb-4">${pkg.price}</p>
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setShowBookingFlow(true);
                      }}
                      className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Select Package
                    </button>
                  </div>
                ))}
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
          </div>

          {/* Right Column - Estimator (only shown in overview tab) */}
          {activeTab === 'overview' && (
            <div className="lg:w-1/3">
              <div className="sticky top-4">
                <ServiceEstimator
                  service={service}
                  onBookNow={handleBookNow}
                  selectedPackage={selectedPackage}
                />
              </div>
            </div>
          )}
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
          onClose={() => {
            setShowBookingFlow(false);
            setSelectedPackage(null);
          }}
        />
      )}
    </div>
  );
};

export default ServiceDetailsPage; 