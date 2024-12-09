import { Venue, Amenity } from '../types/venue';

const createAmenity = (name: string): Amenity => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  icon: '' // You can customize icons as needed
});

const samplePackages = [
  {
    id: 'basic',
    name: 'Basic Package',
    description: '4-hour venue rental with essential amenities',
    price: 1200,
    duration: '4 hours',
    features: [
      'Basic lighting and sound system',
      'Tables and chairs setup',
      'Security personnel',
      'Cleaning service',
      'Dedicated venue coordinator',
      'Free parking'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    description: 'Full-day venue rental with premium services',
    price: 2500,
    duration: '8 hours',
    features: [
      'Professional lighting and sound system',
      'Tables, chairs, and linens setup',
      'Enhanced security team',
      'Pre and post-event cleaning',
      'Dedicated event coordinator',
      'VIP parking',
      'Bridal suite access',
      'Catering kitchen access'
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    description: 'All-inclusive full-day venue experience',
    price: 3500,
    duration: '12 hours',
    features: [
      'Premium lighting and sound system',
      'Complete venue styling and setup',
      'Full security team',
      'Complete cleaning service',
      'Senior event coordinator',
      'VIP valet parking',
      'Bridal and groom suites',
      'Full kitchen access',
      'Basic bar setup',
      'Extended hours option'
    ]
  }
];

export const venues: Venue[] = [
  {
    id: 'v1',
    name: 'Grand Ballroom',
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
    capacity: 150,
    maxCapacity: 200,
    minCapacity: 50,
    squareFeet: 3000,
    minimumHours: 4,
    amenities: [
      createAmenity('Catering Kitchen'),
      createAmenity('Sound System'),
      createAmenity('Stage'),
      createAmenity('Dance Floor'),
      createAmenity('Private Entrance'),
      createAmenity('Bridal Suite'),
      createAmenity('Parking'),
      createAmenity('WiFi'),
      createAmenity('AV Equipment')
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
    availability: {
      monday: { start: '09:00', end: '22:00' },
      tuesday: { start: '09:00', end: '22:00' },
      wednesday: { start: '09:00', end: '22:00' },
      thursday: { start: '09:00', end: '22:00' },
      friday: { start: '09:00', end: '23:00' },
      saturday: { start: '10:00', end: '23:00' },
      sunday: { start: '10:00', end: '22:00' }
    },
    features: [
      { name: 'Grand Staircase', description: 'Perfect for dramatic entrances and photo opportunities' },
      { name: 'Crystal Chandeliers', description: 'Elegant lighting throughout the main hall' },
      { name: 'Garden Space', description: 'Connected outdoor area perfect for ceremonies' }
    ],
    cancellationPolicy: '30 days notice required for full refund, 50% refund up to 14 days before event',
    tags: ['Wedding', 'Corporate', 'Gala', 'Luxury', 'Indoor'],
    vendor: {
      id: 'grand-events-01',
      name: 'Grand Events Co.',
      profileImage: 'https://example.com/profile.jpg'
    },
    vendorId: 'grand-events-01',
    basePrice: 1000,
    packages: [
      {
        id: 'vp1',
        name: 'Basic Package',
        description: '6-hour venue rental with basic amenities',
        price: 2000,
        duration: '6 hours',
        features: [
          'Basic lighting setup',
          'Standard sound system',
          'Tables and chairs for up to 100 guests',
          'Basic cleaning service',
          'On-site coordinator'
        ],
        isPopular: false
      },
      {
        id: 'vp2',
        name: 'Premium Package',
        description: '8-hour venue rental with premium services',
        price: 3500,
        duration: '8 hours',
        features: [
          'Premium lighting package',
          'Professional sound system',
          'Tables and chairs for up to 200 guests',
          'Full setup and cleanup',
          'On-site coordinator',
          'Security staff',
          'Valet parking'
        ],
        isPopular: true
      }
    ],
    addOns: [
      {
        id: 'va1',
        name: 'Dance Floor',
        description: 'Professional dance floor installation',
        price: 500
      },
      {
        id: 'va2',
        name: 'Stage Setup',
        description: 'Professional stage with lighting',
        price: 800
      },
      {
        id: 'va3',
        name: 'Additional Hour',
        description: 'Extend your event time',
        price: 300
      },
      {
        id: 'va4',
        name: 'Security Staff',
        description: 'Additional security personnel',
        price: 200
      }
    ],
    availableTimeSlots: [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]
  }
]; 