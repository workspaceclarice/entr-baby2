import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, SearchIcon, LockIcon, CheckCircleIcon } from '../components/icons';

type SearchCategory = 'events' | 'services' | 'venues';

const categoryCards = [
  {
    title: 'Things to Do',
    description: 'Discover local events and activities',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
    link: '/events',
    tags: ['Music Festivals', 'Food Events', 'Art Shows', 'Workshops', 'Sports Events', 'Nightlife']
  },
  {
    title: 'Event Services',
    description: 'Find trusted vendors for your event',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80',
    link: '/services',
    tags: ['DJs & Music', 'Catering', 'Photography', 'Event Planning', 'Decor', 'Bartending']
  },
  {
    title: 'Unique Venues',
    description: 'Book the perfect space',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
    link: '/venues',
    tags: ['Rooftops', 'Gardens', 'Ballrooms', 'Lofts', 'Restaurants', 'Galleries']
  }
];

const featuredEvents = [
  {
    title: 'Summer Music Festival',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80',
    date: 'This Weekend',
    location: 'Los Angeles'
  },
  {
    title: 'Food & Wine Tasting',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80',
    date: 'Next Friday',
    location: 'Downtown LA'
  },
  {
    title: 'Art Gallery Opening',
    image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80',
    date: 'Saturday',
    location: 'Arts District'
  },
  {
    title: 'Rooftop Yoga Session',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
    date: 'Every Sunday',
    location: 'Hollywood Hills'
  }
];

const eventSuggestions = [
  {
    title: "Date Night Ideas",
    description: "Make it memorable",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80",
    items: ['Rooftop Dining', 'Wine Tasting', 'Cooking Classes', 'Live Music']
  },
  {
    title: "Weekend Fun",
    description: "Create lasting memories",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
    items: ['Comedy Shows', 'Food Festivals', 'Art Galleries', 'Live Sports']
  },
  {
    title: "Group Activities",
    description: "Better together",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80",
    items: ['Game Nights', 'Karaoke', 'Paint & Sip', 'Escape Rooms']
  }
];

// Add new image slider data
const showcaseSlides = [
  {
    title: "Upcoming Events 🎉",
    images: [
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        caption: "Music Festival"
      },
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
        caption: "Comedy Night"
      },
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
        caption: "Food Festival"
      }
    ]
  },
  {
    title: "Date Ideas 💝",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e",
        caption: "Cooking Class"
      },
      {
        url: "https://images.unsplash.com/photo-1545150665-c72a8f0cf311",
        caption: "Wine Tasting"
      },
      {
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
        caption: "Paint Night"
      }
    ]
  },
  // Add more categories as needed
];

// Replace the App Preview section with this new Showcase section
const ShowcaseSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Amazing Experiences ✨
          </h2>
          <p className="text-lg text-gray-600">
            Find the perfect activity for any occasion
          </p>
        </div>

        {/* Image Showcase Slider */}
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {showcaseSlides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
                  {slide.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slide.images.map((image, imgIndex) => (
                    <div 
                      key={imgIndex} 
                      className="relative rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-lg font-medium">{image.caption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {showcaseSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🎭</span>
            <p className="mt-2 font-medium">Find Events</p>
          </button>
          <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🎵</span>
            <p className="mt-2 font-medium">Book Artists</p>
          </button>
          <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🏰</span>
            <p className="mt-2 font-medium">Explore Venues</p>
          </button>
          <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">💝</span>
            <p className="mt-2 font-medium">Date Ideas</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [searchCategory, setSearchCategory] = useState<SearchCategory>('events');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getPlaceholder = () => {
    switch (searchCategory) {
      case 'events':
        return 'Search concerts, workshops, food festivals...';
      case 'services':
        return 'Search DJs, photographers, caterers...';
      case 'venues':
        return 'Search ballrooms, gardens, rooftops...';
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${searchCategory}?q=${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section - Made lighter */}
      <div className="relative h-[80vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&q=80"
          alt="People enjoying a concert"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Logo - Made smaller */}
            <div className="mb-6">
              <svg className="h-10 w-10" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 8h16v16H8V8z"
                  fill="url(#gradient-hero)"
                  stroke="url(#gradient-hero)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="gradient-hero" x1="8" y1="8" x2="24" y2="24">
                    <stop stopColor="#40beb4" />
                    <stop offset="1" stopColor="#26726c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">
                Find your next experience
              </h1>
              <p className="text-lg text-gray-200 mb-10">
                Discover amazing events, venues, and services all in one place
              </p>

              {/* Search Section - Made lighter */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-gray-100">
                {/* Category Switcher - More minimal */}
                <div className="flex items-center border-b border-gray-100 mb-5">
                  {[
                    { id: 'events', label: 'Things to do', icon: '🎉' },
                    { id: 'services', label: 'Services', icon: '🎵' },
                    { id: 'venues', label: 'Venues', icon: '🏛️' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSearchCategory(cat.id as SearchCategory)}
                      className={`flex items-center space-x-2 px-5 py-2.5 transition-colors relative ${
                        searchCategory === cat.id
                          ? 'text-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.label}</span>
                      {searchCategory === cat.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary-500" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Search Bar - More minimal */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder={getPlaceholder()}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-400 border border-gray-100"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1.5 rounded-md hover:bg-primary-600 transition-colors text-sm"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards Section - Made lighter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryCards.map((card, index) => (
            <Link 
              key={index}
              to={card.link} 
              className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[2/3] relative overflow-hidden"> {/* Made cards longer */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-200 mb-4">{card.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-md text-sm text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Event Suggestions Section - Made lighter */}
      <div className="py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-gray-200">{suggestion.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestion.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Safety Section - Made lighter */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Your safety matters</h2>
            <p className="text-base text-gray-600">We ensure every experience is safe and memorable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80" 
                alt="Verified vendors"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">Verified Vendors</h3>
              <p className="text-gray-600">Every vendor is thoroughly vetted and verified for your peace of mind</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80" 
                alt="Secure payments"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Your payments are protected with bank-level security</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80" 
                alt="Customer support"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our friendly team is here to help you anytime you need assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* ShowcaseSection - Made lighter */}
      <ShowcaseSection />

      {/* Featured Events Section - Made lighter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Featured Events</h2>
          <Link to="/events" className="text-primary-500 hover:text-primary-600 text-sm">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event, i) => (
            <Link 
              key={i}
              to="/events" 
              className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                  Featured
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{event.date} • {event.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to start planning?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Explore Events
            </Link>
            <Link
              to="/vendors"
              className="inline-block px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors underline decoration-2 underline-offset-4"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 