import { Venue } from '../types';

export const venues: Venue[] = [
  {
    id: '1',
    name: 'Crystal Ballroom',
    type: 'Ballrooms & Banquet Halls',
    description: `Experience timeless elegance in our grand Crystal Ballroom. This stunning venue features:
    
    • 20-foot crystal chandeliers
    • Floor-to-ceiling windows with city views
    • State-of-the-art lighting and sound system
    • 5,000 square feet of flexible event space
    • Private bridal suite
    • Professional event staff
    • Full-service catering kitchen
    • Dedicated parking facilities
    
    Perfect for weddings, galas, corporate events, and other elegant occasions. Our experienced event team ensures every detail is executed flawlessly.`,
    images: [
      'https://picsum.photos/seed/ballroom1/1200/800',
      'https://picsum.photos/seed/ballroom2/1200/800',
      'https://picsum.photos/seed/ballroom3/1200/800',
      'https://picsum.photos/seed/ballroom4/1200/800',
      'https://picsum.photos/seed/ballroom5/1200/800'
    ],
    location: 'Los Angeles, CA',
    capacity: { min: 50, max: 500 },
    basePrice: 5000,
    pricePerHour: 750,
    rating: 4.9,
    reviewCount: 128,
    amenities: [
      'Valet Parking',
      'Full-Service Kitchen',
      'AV Equipment',
      'WiFi',
      'Bridal Suite',
      'Outdoor Space',
      'Wheelchair Accessible',
      'Security',
      'Dance Floor',
      'Stage Area',
      'Coat Check',
      'Private Entrance'
    ],
    packages: [
      {
        id: 'basic',
        name: 'Essential Package',
        price: 5000,
        duration: '6 hours',
        includes: [
          'Venue rental',
          'Basic lighting',
          'Tables and chairs',
          'Basic linens',
          'Setup and cleanup',
          'Event coordinator',
          'Security staff'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Package',
        price: 8000,
        duration: '8 hours',
        includes: [
          'Venue rental',
          'Premium lighting',
          'Tables and chairs',
          'Premium linens',
          'Setup and cleanup',
          'Event coordinator',
          'Security staff',
          'Valet parking',
          'Bridal suite access',
          'AV equipment'
        ]
      },
      {
        id: 'luxury',
        name: 'Luxury Package',
        price: 12000,
        duration: '10 hours',
        includes: [
          'Venue rental',
          'Custom lighting design',
          'Premium furniture',
          'Luxury linens',
          'Setup and cleanup',
          'Dedicated event team',
          'Enhanced security',
          'Valet parking',
          'Bridal suite access',
          'Full AV package',
          'Coat check service',
          'Private entrance'
        ]
      }
    ],
    addons: [
      {
        id: 'extra-hour',
        name: 'Additional Hour',
        price: 750,
        description: 'Extend your event time'
      },
      {
        id: 'lighting',
        name: 'Custom Lighting Package',
        price: 1500,
        description: 'Professional lighting design'
      },
      {
        id: 'coordinator',
        name: 'Additional Coordinator',
        price: 400,
        description: 'Extra event coordination support'
      }
    ],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Emily R.',
        userImage: 'https://picsum.photos/seed/review1/100/100',
        rating: 5,
        date: '2024-02-15',
        content: 'Absolutely stunning venue! The chandeliers and architecture created the perfect backdrop for our wedding. The staff was incredibly professional and attentive.',
        eventType: 'Wedding'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Michael S.',
        userImage: 'https://picsum.photos/seed/review2/100/100',
        rating: 5,
        date: '2024-02-01',
        content: 'Hosted our annual gala here and it exceeded all expectations. The space is versatile and the amenities are top-notch.',
        eventType: 'Corporate Event'
      }
    ],
    faq: [
      {
        question: 'What is the rental duration?',
        answer: 'Standard rental is 6 hours, with option to add additional hours. This includes setup and breakdown time.'
      },
      {
        question: 'Do you have preferred vendors?',
        answer: 'We have a list of preferred vendors but welcome outside vendors with proper licensing and insurance.'
      }
    ]
  },
  {
    id: '2',
    name: 'Skyline Rooftop',
    type: 'Rooftop Venue',
    description: `Experience breathtaking events at our modern rooftop venue with panoramic city views. Features include:
    
    • 3,000 square feet of indoor/outdoor space
    • Stunning skyline views
    • Retractable roof for weather protection
    • Modern lounge furniture
    • Built-in bar and prep kitchen
    • State-of-the-art sound system
    • Ambient lighting
    • Private elevator access
    
    Perfect for cocktail parties, corporate events, intimate weddings, and social gatherings. Our space combines urban sophistication with versatile functionality.`,
    images: [
      'https://picsum.photos/seed/rooftop1/1200/800',
      'https://picsum.photos/seed/rooftop2/1200/800',
      'https://picsum.photos/seed/rooftop3/1200/800',
      'https://picsum.photos/seed/rooftop4/1200/800'
    ],
    location: 'Los Angeles, CA',
    capacity: { min: 40, max: 200 },
    basePrice: 3500,
    pricePerHour: 500,
    rating: 4.9,
    reviewCount: 89,
    amenities: [
      'Indoor/Outdoor Space',
      'Retractable Roof',
      'Bar Setup',
      'Prep Kitchen',
      'Lounge Furniture',
      'Sound System',
      'Private Elevator',
      'Climate Control',
      'Restrooms',
      'Security'
    ],
    packages: [
      {
        id: 'basic',
        name: 'Social Package',
        price: 3500,
        duration: '4 hours',
        includes: [
          'Venue rental',
          'Basic furniture setup',
          'Sound system access',
          'Bar setup',
          'Security staff',
          'Event host'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Event Package',
        price: 5500,
        duration: '6 hours',
        includes: [
          'Venue rental',
          'Premium furniture setup',
          'Sound system access',
          'Bar setup with bartender',
          'Security staff',
          'Event coordinator',
          'Basic lighting package',
          'Heaters/Cooling as needed'
        ]
      }
    ],
    addons: [
      {
        id: 'extra-hour',
        name: 'Additional Hour',
        price: 500,
        description: 'Extend your event time'
      },
      {
        id: 'bartender',
        name: 'Additional Bartender',
        price: 200,
        description: 'Per bartender, per hour'
      },
      {
        id: 'furniture',
        name: 'Extra Lounge Setup',
        price: 750,
        description: 'Additional seating arrangements'
      }
    ],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Sarah K.',
        userImage: 'https://picsum.photos/seed/review3/100/100',
        rating: 5,
        date: '2024-02-10',
        content: 'The views are absolutely incredible! Had my birthday party here and it was perfect. The indoor/outdoor space worked great for our needs.',
        eventType: 'Birthday Party'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'David L.',
        userImage: 'https://picsum.photos/seed/review4/100/100',
        rating: 5,
        date: '2024-01-25',
        content: 'Hosted a corporate mixer here and our clients were impressed. The space has a great flow and the staff was very accommodating.',
        eventType: 'Corporate Event'
      }
    ],
    faq: [
      {
        question: 'What happens in case of rain?',
        answer: 'Our retractable roof and indoor space ensure your event continues regardless of weather conditions.'
      },
      {
        question: 'Is parking available?',
        answer: 'We offer valet parking services and there are several parking structures within walking distance.'
      }
    ]
  }
]; 