import { Venue } from '../types/venue';

export const venues: Venue[] = [
  {
    id: 'grand-ballroom',
    name: 'The Grand Ballroom',
    description: 'An elegant and spacious venue perfect for weddings, galas, and corporate events. Features high ceilings, crystal chandeliers, and a grand staircase.',
    location: {
      address: '123 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105'
    },
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740',
      'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740'
    ],
    pricePerHour: 500,
    pricePerGuest: 25,
    capacity: 200,
    maxCapacity: 350,
    minimumHours: 4,
    amenities: [
      { id: 'kitchen', name: 'Catering Kitchen', icon: '🍽️' },
      { id: 'sound', name: 'Sound System', icon: '🎵' },
      { id: 'stage', name: 'Stage', icon: '🎭' },
      { id: 'dance-floor', name: 'Dance Floor', icon: '💃' },
      { id: 'entrance', name: 'Private Entrance', icon: '🚪' },
      { id: 'bridal-suite', name: 'Bridal Suite', icon: '👰' },
      { id: 'parking', name: 'Parking', icon: '🅿️' },
      { id: 'wifi', name: 'WiFi', icon: '📶' },
      { id: 'av', name: 'AV Equipment', icon: '🎥' }
    ],
    rules: [
      'No smoking inside the venue',
      'Music must end by 11 PM',
      'No confetti or glitter',
      'Outside catering must be approved',
      'Security deposit required'
    ],
    reviews: [
      {
        id: '1',
        author: 'Sarah Johnson',
        rating: 5,
        date: '2023-12-15',
        comment: 'Absolutely stunning venue! Perfect for our wedding. The staff was incredibly helpful throughout the entire process.'
      },
      {
        id: '2',
        author: 'Michael Chen',
        rating: 4,
        date: '2023-11-30',
        comment: 'Great space for our corporate gala. The AV equipment was top-notch.'
      },
      {
        id: '3',
        author: 'Emily Davis',
        rating: 5,
        date: '2023-11-15',
        comment: 'The bridal suite was amazing and the grand staircase made for beautiful photos!'
      }
    ],
    features: [
      {
        id: 'staircase',
        name: 'Grand Staircase',
        description: 'Perfect for dramatic entrances and photo opportunities'
      },
      {
        id: 'chandeliers',
        name: 'Crystal Chandeliers',
        description: 'Elegant lighting throughout the main hall'
      },
      {
        id: 'garden',
        name: 'Garden Space',
        description: 'Connected outdoor area perfect for ceremonies'
      }
    ],
    availability: {
      monday: ['09:00-17:00'],
      tuesday: ['09:00-17:00'],
      wednesday: ['09:00-17:00'],
      thursday: ['09:00-17:00'],
      friday: ['09:00-23:00'],
      saturday: ['09:00-23:00'],
      sunday: ['09:00-23:00']
    },
    packages: [
      {
        id: 'basic',
        name: 'Basic Package',
        description: 'Perfect for simple events and meetings',
        price: 1500,
        features: [
          'Basic setup and cleanup',
          'Standard lighting',
          'Tables and chairs',
          'Basic sound system'
        ],
        minimumHours: 4,
        maxGuests: 100
      },
      {
        id: 'premium',
        name: 'Premium Package',
        description: 'Ideal for weddings and corporate events',
        price: 3000,
        features: [
          'Full setup and cleanup',
          'Premium lighting',
          'Tables, chairs, and linens',
          'Professional sound system',
          'Event coordinator',
          'Security staff'
        ],
        minimumHours: 6,
        maxGuests: 200
      }
    ],
    addOns: [
      {
        id: 'catering',
        name: 'In-house Catering',
        description: 'Professional catering service with customizable menu options',
        price: 45,
        priceType: 'per_guest'
      },
      {
        id: 'bar',
        name: 'Bar Service',
        description: 'Professional bartenders and bar setup',
        price: 75,
        priceType: 'per_hour'
      },
      {
        id: 'decor',
        name: 'Custom Decor Package',
        description: 'Professional decoration services',
        price: 500,
        priceType: 'flat'
      }
    ],
    faq: [
      {
        question: "What is your cancellation policy?",
        answer: "We offer full refunds for cancellations made 30 days or more before the event date. Cancellations made 14-29 days before receive a 50% refund. No refunds are available for cancellations made less than 14 days before the event."
      },
      {
        question: "Can we bring our own catering?",
        answer: "Outside catering is allowed with prior approval and must be from a licensed and insured caterer. There may be additional fees for kitchen use."
      },
      {
        question: "What is included in the venue rental?",
        answer: "Basic venue rental includes tables, chairs, basic sound system, and cleaning. Additional amenities are available through our packages or as add-ons."
      },
      {
        question: "Is parking available?",
        answer: "Yes, we offer complimentary parking for up to 150 vehicles. Valet service is available as an add-on."
      }
    ]
  },
  // Add more venues with the same structure...
]; 