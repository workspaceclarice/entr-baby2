import { Service } from '../types';

export const services: Service[] = [
  // DJ Service
  {
    id: '1',
    vendorId: 'vendor1',
    vendorName: 'Elite DJs',
    vendorImage: 'https://picsum.photos/seed/dj-profile/200/200',
    vendorBio: 'Professional DJ service with over 10 years of experience.',
    serviceType: 'DJ Services',
    profileImage: 'https://picsum.photos/seed/dj-hero/1200/800',
    gallery: [
      'https://picsum.photos/seed/dj1/1200/800',
      'https://picsum.photos/seed/dj2/1200/800',
      'https://picsum.photos/seed/dj3/1200/800',
      'https://picsum.photos/seed/dj4/1200/800',
      'https://picsum.photos/seed/dj5/1200/800'
    ],
    priceRange: { min: 200, max: 500 },
    rating: 4.8,
    reviewCount: 156,
    location: 'Los Angeles, CA',
    isAvailable: true,
    description: `Elevate your event with Elite DJs - where music meets unforgettable moments.

    With over a decade of experience, we specialize in creating the perfect soundtrack for your special occasion. Our team of professional DJs combines technical expertise with an innate ability to read the crowd, ensuring your dance floor stays energized throughout the event.

    What sets us apart:
    • Extensive music library spanning all genres
    • State-of-the-art sound and lighting equipment
    • Professional, courteous, and well-dressed DJs
    • Seamless event coordination
    • Backup equipment for peace of mind
    
    We understand that each event is unique, which is why we offer customizable packages to suit your specific needs. From intimate gatherings to grand celebrations, we have the expertise to make your event memorable.`,
    features: [
      {
        title: "Professional Equipment",
        description: "Top-of-the-line sound systems and lighting rigs",
        icon: "🎛️"
      },
      {
        title: "Experienced DJs",
        description: "Skilled professionals with 10+ years of experience",
        icon: "🎧"
      },
      {
        title: "Music Library",
        description: "Extensive collection covering all genres",
        icon: "💿"
      },
      {
        title: "Event Planning",
        description: "Detailed consultation and timeline planning",
        icon: "📋"
      }
    ],
    packages: [
      {
        id: 'basic',
        name: 'Basic Package',
        description: 'Perfect for small gatherings',
        price: 200,
        duration: '4 hours',
        includes: [
          'Professional DJ',
          'Standard sound system',
          'Basic lighting',
          'Setup and breakdown'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Package',
        description: 'Ideal for medium to large events',
        price: 350,
        duration: '5 hours',
        includes: [
          'Professional DJ',
          'Premium sound system',
          'Advanced lighting setup',
          'Wireless microphone',
          'MC services',
          'Setup and breakdown'
        ]
      },
      {
        id: 'ultimate',
        name: 'Ultimate Party Package',
        description: 'The complete entertainment solution',
        price: 500,
        duration: '6 hours',
        includes: [
          'Professional DJ',
          'Top-tier sound system',
          'Full lighting production',
          'Multiple wireless microphones',
          'MC services',
          'Fog machine',
          'Custom playlist consultation',
          'Early setup',
          'Setup and breakdown'
        ]
      }
    ],
    addons: [
      {
        id: 'extra-hour',
        name: 'Additional Hour',
        price: 75,
        description: 'Extend the party'
      },
      {
        id: 'lighting',
        name: 'Extra Lighting',
        price: 100,
        description: 'Additional dance floor lighting'
      },
      {
        id: 'speakers',
        name: 'Extra Speakers',
        price: 150,
        description: 'Additional speakers for larger venues'
      }
    ],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Sarah M.',
        userImage: 'https://picsum.photos/seed/review1/100/100',
        rating: 5,
        date: '2024-02-15',
        content: 'Elite DJs was absolutely amazing! Our DJ read the crowd perfectly and kept everyone dancing all night. The lighting setup was beautiful and really added to the atmosphere.',
        eventType: 'Wedding Reception'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Michael R.',
        userImage: 'https://picsum.photos/seed/review2/100/100',
        rating: 5,
        date: '2024-02-10',
        content: 'Very professional service from start to finish. Great communication during planning, and excellent execution during the event.',
        eventType: 'Corporate Event'
      }
    ],
    faq: [
      {
        question: 'How early do you arrive for setup?',
        answer: 'We typically arrive 2 hours before the event start time to ensure everything is properly set up and tested.'
      },
      {
        question: 'Can we request specific songs?',
        answer: 'Absolutely! We encourage you to provide a playlist of must-play songs and will work with you to ensure the perfect music selection.'
      }
    ]
  },

  // Catering Service
  {
    id: '2',
    vendorId: 'vendor2',
    vendorName: 'Gourmet Delights Catering',
    vendorImage: 'https://picsum.photos/seed/chef-profile/200/200',
    vendorBio: 'Luxury catering service specializing in international cuisine.',
    serviceType: 'Catering',
    profileImage: 'https://picsum.photos/seed/catering-hero/1200/800',
    gallery: [
      'https://picsum.photos/seed/catering1/1200/800',
      'https://picsum.photos/seed/catering2/1200/800',
      'https://picsum.photos/seed/catering3/1200/800',
      'https://picsum.photos/seed/catering4/1200/800',
      'https://picsum.photos/seed/catering5/1200/800'
    ],
    priceRange: { min: 35, max: 150 },
    rating: 4.9,
    reviewCount: 203,
    location: 'Los Angeles, CA',
    isAvailable: true,
    description: `Experience culinary excellence with Gourmet Delights Catering.

    Our passionate team of chefs creates unforgettable dining experiences for any occasion. From intimate gatherings to grand celebrations, we bring creativity and sophistication to every plate.

    What sets us apart:
    • Custom menu planning and design
    • Farm-to-table ingredients
    • International cuisine options
    • Professional service staff
    • Full event coordination
    
    Whether you're planning a wedding, corporate event, or private party, we'll ensure your guests experience exceptional cuisine and impeccable service.`,
    features: [
      {
        title: "Custom Menus",
        description: "Personalized menu planning with our executive chef",
        icon: "📋"
      },
      {
        title: "Professional Staff",
        description: "Trained servers, bartenders, and event coordinators",
        icon: "👨‍🍳"
      },
      {
        title: "Full Service",
        description: "Setup, service, and cleanup included",
        icon: "🍽️"
      },
      {
        title: "Quality Ingredients",
        description: "Fresh, locally-sourced ingredients",
        icon: "🥗"
      }
    ],
    packages: [
      {
        id: 'buffet',
        name: 'Buffet Package',
        description: 'Perfect for large gatherings',
        price: 45,
        duration: 'Per Person',
        includes: [
          'Variety of main courses',
          'Selection of sides',
          'Salads and appetizers',
          'Professional staff',
          'Setup and cleanup',
          'Serving equipment'
        ]
      },
      {
        id: 'plated',
        name: 'Plated Service',
        description: 'Elegant dining experience',
        price: 75,
        duration: 'Per Person',
        includes: [
          'Three-course plated meal',
          'Table service',
          'China and flatware',
          'Professional servers',
          'Setup and cleanup',
          'Coffee and tea service'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Package',
        description: 'Ultimate dining experience',
        price: 95,
        duration: 'Per Person',
        includes: [
          'Four-course plated meal',
          'Premium wine pairing',
          'Passed hors d\'oeuvres',
          'Full bar service',
          'Professional staff',
          'Complete event coordination'
        ]
      }
    ],
    addons: [
      {
        id: 'bar',
        name: 'Bar Service',
        price: 15,
        description: 'Per person, includes bartender'
      },
      {
        id: 'dessert',
        name: 'Dessert Station',
        price: 12,
        description: 'Per person, variety of desserts'
      },
      {
        id: 'appetizers',
        name: 'Passed Appetizers',
        price: 18,
        description: 'Per person, selection of hors d\'oeuvres'
      }
    ],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Emily R.',
        userImage: 'https://picsum.photos/seed/review1/100/100',
        rating: 5,
        date: '2024-02-20',
        content: 'The food was absolutely amazing! Our guests couldn\'t stop raving about it. The staff was professional and attentive.',
        eventType: 'Wedding Reception'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'David M.',
        userImage: 'https://picsum.photos/seed/review2/100/100',
        rating: 5,
        date: '2024-02-15',
        content: 'Exceptional service and outstanding food quality. They made our corporate event a huge success.',
        eventType: 'Corporate Event'
      }
    ],
    faq: [
      {
        question: 'Do you accommodate dietary restrictions?',
        answer: 'Yes, we can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and allergies.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'We require 72 hours notice for cancellations. Deposits are non-refundable within 2 weeks of the event.'
      }
    ]
  },

  // Bartending Service
  {
    id: '3',
    vendorId: 'vendor3',
    vendorName: 'Craft Cocktails Co.',
    vendorImage: 'https://picsum.photos/seed/bartender-profile/200/200',
    vendorBio: 'Premium mobile bartending service for upscale events.',
    serviceType: 'Bartending',
    profileImage: 'https://picsum.photos/seed/bar-hero/1200/800',
    gallery: [
      'https://picsum.photos/seed/bar1/1200/800',
      'https://picsum.photos/seed/bar2/1200/800',
      'https://picsum.photos/seed/bar3/1200/800',
      'https://picsum.photos/seed/bar4/1200/800'
    ],
    priceRange: { min: 250, max: 600 },
    rating: 4.9,
    reviewCount: 167,
    location: 'Los Angeles, CA',
    isAvailable: true,
    description: `Elevate your event with our premium mobile bartending service.

    Our expert mixologists create signature cocktails and provide professional service for any occasion. From intimate gatherings to large-scale events, we bring the bar to you.

    What sets us apart:
    • Certified professional bartenders
    • Custom cocktail menu design
    • Premium spirits and ingredients
    • Full bar setup and equipment
    • TIPS certified staff
    
    Let us handle the drinks while you enjoy your event!`,
    features: [
      {
        title: "Expert Mixologists",
        description: "Experienced bartenders with craft cocktail expertise",
        icon: "🍸"
      },
      {
        title: "Custom Menus",
        description: "Signature cocktails designed for your event",
        icon: "📝"
      },
      {
        title: "Full Service",
        description: "Complete bar setup and breakdown included",
        icon: "🍹"
      },
      {
        title: "Licensed & Insured",
        description: "TIPS certified and fully insured staff",
        icon: "✅"
      }
    ],
    packages: [
      {
        id: 'basic',
        name: 'Essential Bar Package',
        description: 'Perfect for small gatherings',
        price: 250,
        duration: '4 hours',
        includes: [
          'One professional bartender',
          'Basic bar setup',
          'Mixers and garnishes',
          'Ice and glassware',
          'Bar tools and equipment'
        ]
      },
      {
        id: 'premium',
        name: 'Craft Cocktail Package',
        description: 'Elevated cocktail experience',
        price: 400,
        duration: '4 hours',
        includes: [
          'Two professional bartenders',
          'Premium bar setup',
          'Signature cocktail menu',
          'Fresh juices and garnishes',
          'Premium mixers',
          'Glassware and ice',
          'Complete bar tools'
        ]
      },
      {
        id: 'luxury',
        name: 'Luxury Open Bar',
        description: 'Ultimate bar experience',
        price: 600,
        duration: '4 hours',
        includes: [
          'Multiple bartenders',
          'Full premium bar setup',
          'Custom cocktail menu',
          'Top-shelf spirits available',
          'Specialty ice program',
          'Premium glassware',
          'LED bar front',
          'Bar decor package'
        ]
      }
    ],
    addons: [
      {
        id: 'extra-hour',
        name: 'Additional Hour',
        price: 75,
        description: 'Per bartender'
      },
      {
        id: 'champagne',
        name: 'Champagne Toast',
        price: 5,
        description: 'Per person'
      },
      {
        id: 'specialty',
        name: 'Specialty Cocktail',
        price: 150,
        description: 'Custom creation for your event'
      }
    ],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Jennifer L.',
        userImage: 'https://picsum.photos/seed/review1/100/100',
        rating: 5,
        date: '2024-02-18',
        content: 'Amazing service! The bartenders were professional and the signature cocktails were a huge hit.',
        eventType: 'Wedding Reception'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Robert K.',
        userImage: 'https://picsum.photos/seed/review2/100/100',
        rating: 5,
        date: '2024-02-10',
        content: 'Top-notch service and amazing cocktails. They made our corporate event extra special.',
        eventType: 'Corporate Event'
      }
    ],
    faq: [
      {
        question: 'Do you provide the alcohol?',
        answer: 'We can either provide alcohol or work with client-provided alcohol. We will help you determine the right quantities needed.'
      },
      {
        question: 'Are you licensed and insured?',
        answer: 'Yes, all our bartenders are TIPS certified and we carry full liability insurance.'
      }
    ]
  },

  // Would you like me to continue with the Makeup, Bouncy House, and Photography services?
]; 