import { Venue, Amenity } from '../types/venue';

const createAmenity = (name: string): Amenity => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  icon: '' // You can customize icons as needed
});

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
    maxCapacity: 350,
    minCapacity: 50,
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
    tags: ['Wedding', 'Corporate', 'Gala', 'Luxury', 'Indoor']
  },
  {
    id: 'urban-loft',
    name: 'Urban Industrial Loft',
    description: 'Modern industrial space with exposed brick walls, high ceilings, and large windows. Perfect for contemporary events and photo shoots.',
    location: {
      address: '456 Creative Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94110'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b'
    ],
    pricePerHour: 300,
    pricePerGuest: 20,
    maxCapacity: 150,
    minCapacity: 20,
    minimumHours: 4,
    amenities: [
      createAmenity('WiFi'),
      createAmenity('Sound System'),
      createAmenity('Projector'),
      createAmenity('Freight Elevator'),
      createAmenity('Kitchen')
    ],
    rules: [
      'No smoking',
      'No open flames',
      'Load in/out through freight elevator only'
    ],
    reviews: [],
    availability: {
      monday: { start: '08:00', end: '23:00' },
      tuesday: { start: '08:00', end: '23:00' },
      wednesday: { start: '08:00', end: '23:00' },
      thursday: { start: '08:00', end: '23:00' },
      friday: { start: '08:00', end: '00:00' },
      saturday: { start: '10:00', end: '00:00' },
      sunday: { start: '10:00', end: '22:00' }
    },
    features: [
      { name: 'Exposed Brick', description: 'Original exposed brick walls throughout' },
      { name: 'Natural Light', description: 'Floor-to-ceiling windows' }
    ],
    cancellationPolicy: '14 days notice required for full refund',
    tags: ['Industrial', 'Modern', 'Photo Shoots', 'Corporate']
  },
  {
    id: 'rooftop-garden',
    name: 'Skyline Rooftop Garden',
    description: 'Stunning rooftop venue with panoramic city views, featuring both indoor and outdoor spaces with lush landscaping.',
    location: {
      address: '789 Sky Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94108'
    },
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3'
    ],
    pricePerHour: 600,
    pricePerGuest: 35,
    maxCapacity: 200,
    minCapacity: 40,
    minimumHours: 5,
    amenities: [
      createAmenity('Bar'),
      createAmenity('Lounge Furniture'),
      createAmenity('Heat Lamps'),
      createAmenity('Sound System'),
      createAmenity('Private Elevator')
    ],
    rules: [
      'Weather contingency plan required',
      'No amplified music after 10 PM',
      'No confetti or balloons'
    ],
    reviews: [],
    availability: {
      monday: { start: '10:00', end: '22:00' },
      tuesday: { start: '10:00', end: '22:00' },
      wednesday: { start: '10:00', end: '22:00' },
      thursday: { start: '10:00', end: '22:00' },
      friday: { start: '10:00', end: '23:00' },
      saturday: { start: '10:00', end: '23:00' },
      sunday: { start: '11:00', end: '22:00' }
    },
    features: [
      { name: 'City Views', description: '360-degree views of the city skyline' },
      { name: 'Garden', description: 'Landscaped outdoor space with seating' }
    ],
    cancellationPolicy: '30 days notice for full refund, weather-related cancellations handled case-by-case',
    tags: ['Rooftop', 'Outdoor', 'Views', 'Cocktail Party']
  },
  {
    id: 'historic-library',
    name: 'The Historic Library',
    description: 'Elegant historic library with wood-paneled walls, vintage details, and a sophisticated atmosphere.',
    location: {
      address: '101 Heritage Row',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
    },
    images: [
      'https://images.unsplash.com/photo-1568667256549-094345857637',
      'https://images.unsplash.com/photo-1568667256549-094345857637',
      'https://images.unsplash.com/photo-1568667256549-094345857637'
    ],
    pricePerHour: 450,
    pricePerGuest: 30,
    maxCapacity: 120,
    minCapacity: 25,
    minimumHours: 4,
    amenities: [
      createAmenity('WiFi'),
      createAmenity('Antique Furniture'),
      createAmenity('Climate Control'),
      createAmenity('Security System')
    ],
    rules: [
      'No food or drink in library stacks',
      'White glove service required for certain areas',
      'No flash photography'
    ],
    reviews: [],
    availability: {
      monday: { start: '09:00', end: '21:00' },
      tuesday: { start: '09:00', end: '21:00' },
      wednesday: { start: '09:00', end: '21:00' },
      thursday: { start: '09:00', end: '21:00' },
      friday: { start: '09:00', end: '22:00' },
      saturday: { start: '10:00', end: '22:00' },
      sunday: { start: '11:00', end: '20:00' }
    },
    features: [
      { name: 'Historic Architecture', description: 'Original 1920s architectural details' },
      { name: 'Reading Room', description: 'Grand reading room with 20-foot ceilings' }
    ],
    cancellationPolicy: '21 days notice required for full refund',
    tags: ['Historic', 'Elegant', 'Indoor', 'Corporate']
  },
  {
    id: 'beachfront-villa',
    name: 'Oceanside Villa',
    description: 'Luxurious beachfront villa with private beach access, infinity pool, and stunning ocean views.',
    location: {
      address: '1234 Coastal Highway',
      city: 'Half Moon Bay',
      state: 'CA',
      zip: '94019'
    },
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2', // Stunning beachfront villa
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2'
    ],
    pricePerHour: 800,
    pricePerGuest: 45,
    maxCapacity: 150,
    minCapacity: 30,
    minimumHours: 6,
    amenities: [
      createAmenity('Private Beach'),
      createAmenity('Infinity Pool'),
      createAmenity('Outdoor Kitchen'),
      createAmenity('Valet Parking')
    ],
    rules: [
      'No glass on beach area',
      'Quiet hours after 10 PM',
      'No fireworks'
    ],
    reviews: [],
    availability: {
      monday: { start: '10:00', end: '22:00' },
      tuesday: { start: '10:00', end: '22:00' },
      wednesday: { start: '10:00', end: '22:00' },
      thursday: { start: '10:00', end: '22:00' },
      friday: { start: '10:00', end: '23:00' },
      saturday: { start: '09:00', end: '23:00' },
      sunday: { start: '09:00', end: '22:00' }
    },
    features: [
      { name: 'Ocean Views', description: 'Panoramic ocean views from all main spaces' },
      { name: 'Private Beach', description: 'Direct access to private beach' }
    ],
    cancellationPolicy: '60 days notice required for full refund',
    tags: ['Beach', 'Luxury', 'Outdoor', 'Wedding']
  },
  {
    id: 'vineyard-estate',
    name: 'Wine Country Estate',
    description: 'Elegant vineyard estate surrounded by rolling hills and endless rows of vines.',
    location: {
      address: '789 Vine Road',
      city: 'Napa',
      state: 'CA',
      zip: '94558'
    },
    images: [
      'https://images.unsplash.com/photo-1515315230580-4299548a2e45', // Beautiful vineyard estate
      'https://images.unsplash.com/photo-1515315230580-4299548a2e45',
      'https://images.unsplash.com/photo-1515315230580-4299548a2e45'
    ],
    pricePerHour: 700,
    pricePerGuest: 40,
    maxCapacity: 200,
    minCapacity: 50,
    minimumHours: 6,
    amenities: [
      createAmenity('Wine Tasting'),
      createAmenity('Barrel Room'),
      createAmenity('Outdoor Terrace'),
      createAmenity('Bridal Suite')
    ],
    rules: [
      'No outside alcohol',
      'Must use approved vendors',
      'No smoking on property'
    ],
    reviews: [],
    availability: {
      monday: { start: '10:00', end: '22:00' },
      tuesday: { start: '10:00', end: '22:00' },
      wednesday: { start: '10:00', end: '22:00' },
      thursday: { start: '10:00', end: '22:00' },
      friday: { start: '10:00', end: '23:00' },
      saturday: { start: '10:00', end: '23:00' },
      sunday: { start: '10:00', end: '22:00' }
    },
    features: [
      { name: 'Vineyard Views', description: 'Surrounded by 100 acres of vineyards' },
      { name: 'Wine Cave', description: 'Historic wine cave for intimate gatherings' }
    ],
    cancellationPolicy: '90 days notice required for full refund',
    tags: ['Vineyard', 'Wine Country', 'Outdoor', 'Wedding']
  },
  {
    id: 'modern-gallery',
    name: 'Contemporary Art Gallery',
    description: 'Minimalist gallery space with rotating art exhibitions and modern amenities.',
    location: {
      address: '567 Art District',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107'
    },
    images: [
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342', // Modern gallery space
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342'
    ],
    pricePerHour: 400,
    pricePerGuest: 25,
    maxCapacity: 180,
    minCapacity: 20,
    minimumHours: 4,
    amenities: [
      createAmenity('Gallery Lighting'),
      createAmenity('Sound System'),
      createAmenity('Projector'),
      createAmenity('Catering Prep')
    ],
    rules: [
      'No touching artwork',
      'No red wine',
      'Professional art handling required'
    ],
    reviews: [],
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
      { name: 'Gallery Walls', description: 'Professional gallery lighting and hanging system' },
      { name: 'Outdoor Sculpture Garden', description: 'Connected sculpture garden space' }
    ],
    cancellationPolicy: '30 days notice required for full refund',
    tags: ['Art Gallery', 'Modern', 'Corporate', 'Reception']
  },
  {
    id: 'greenhouse-gardens',
    name: 'The Glass House & Gardens',
    description: 'Victorian-style greenhouse and surrounding botanical gardens perfect for nature-inspired events.',
    location: {
      address: '321 Botanical Way',
      city: 'Berkeley',
      state: 'CA',
      zip: '94720'
    },
    images: [
      'https://images.unsplash.com/photo-1516901632977-d566df8e001c', // Beautiful greenhouse
      'https://images.unsplash.com/photo-1516901632977-d566df8e001c',
      'https://images.unsplash.com/photo-1516901632977-d566df8e001c'
    ],
    pricePerHour: 450,
    pricePerGuest: 30,
    maxCapacity: 120,
    minCapacity: 25,
    minimumHours: 4,
    amenities: [
      createAmenity('Climate Control'),
      createAmenity('Garden Paths'),
      createAmenity('String Lights'),
      createAmenity('Rain Contingency')
    ],
    rules: [
      'No picking flowers',
      'Stay on designated paths',
      'No confetti or rice'
    ],
    reviews: [],
    availability: {
      monday: { start: '09:00', end: '21:00' },
      tuesday: { start: '09:00', end: '21:00' },
      wednesday: { start: '09:00', end: '21:00' },
      thursday: { start: '09:00', end: '21:00' },
      friday: { start: '09:00', end: '22:00' },
      saturday: { start: '09:00', end: '22:00' },
      sunday: { start: '10:00', end: '21:00' }
    },
    features: [
      { name: 'Victorian Greenhouse', description: 'Restored Victorian-era glass greenhouse' },
      { name: 'Botanical Gardens', description: 'Access to 5 acres of maintained gardens' }
    ],
    cancellationPolicy: '45 days notice required for full refund',
    tags: ['Garden', 'Greenhouse', 'Outdoor', 'Wedding']
  },
  {
    id: 'tech-hub',
    name: 'Innovation Hub',
    description: 'Ultra-modern tech space with state-of-the-art facilities and flexible configurations.',
    location: {
      address: '888 Tech Avenue',
      city: 'San Jose',
      state: 'CA',
      zip: '95113'
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c', // Modern tech office
      'https://images.unsplash.com/photo-1497366216548-37526070297c',
      'https://images.unsplash.com/photo-1497366216548-37526070297c'
    ],
    pricePerHour: 550,
    pricePerGuest: 35,
    maxCapacity: 250,
    minCapacity: 30,
    minimumHours: 4,
    amenities: [
      createAmenity('High-Speed WiFi'),
      createAmenity('Video Wall'),
      createAmenity('Recording Studio'),
      createAmenity('VR Room')
    ],
    rules: [
      'NDA required',
      'Security check-in required',
      'No photography without permission'
    ],
    reviews: [],
    availability: {
      monday: { start: '08:00', end: '22:00' },
      tuesday: { start: '08:00', end: '22:00' },
      wednesday: { start: '08:00', end: '22:00' },
      thursday: { start: '08:00', end: '22:00' },
      friday: { start: '08:00', end: '22:00' },
      saturday: { start: '09:00', end: '21:00' },
      sunday: { start: '09:00', end: '21:00' }
    },
    features: [
      { name: 'Innovation Lab', description: 'Fully equipped tech demonstration space' },
      { name: 'Digital Wall', description: '40-foot interactive digital wall' }
    ],
    cancellationPolicy: '30 days notice required for full refund',
    tags: ['Tech', 'Modern', 'Corporate', 'Conference']
  },
  {
    id: 'mountain-lodge',
    name: 'Alpine Summit Lodge',
    description: 'Rustic-luxury mountain lodge with panoramic views of the Sierra Nevada mountains.',
    location: {
      address: '456 Summit Ridge',
      city: 'Lake Tahoe',
      state: 'CA',
      zip: '96150'
    },
    images: [
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59', // Stunning mountain lodge
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59',
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59'
    ],
    pricePerHour: 650,
    pricePerGuest: 40,
    maxCapacity: 180,
    minCapacity: 40,
    minimumHours: 6,
    amenities: [
      createAmenity('Stone Fireplace'),
      createAmenity('Outdoor Fire Pit'),
      createAmenity('Ski Storage'),
      createAmenity('Heated Floors')
    ],
    rules: [
      'Snow chains required in winter',
      'No outdoor music after sunset',
      'Proper winter attire required'
    ],
    reviews: [],
    availability: {
      monday: { start: '10:00', end: '22:00' },
      tuesday: { start: '10:00', end: '22:00' },
      wednesday: { start: '10:00', end: '22:00' },
      thursday: { start: '10:00', end: '22:00' },
      friday: { start: '09:00', end: '23:00' },
      saturday: { start: '09:00', end: '23:00' },
      sunday: { start: '10:00', end: '22:00' }
    },
    features: [
      { name: 'Mountain Views', description: 'Panoramic views of Lake Tahoe and mountains' },
      { name: 'Lodge Architecture', description: 'Authentic timber and stone construction' }
    ],
    cancellationPolicy: '60 days notice required for full refund, weather considerations',
    tags: ['Mountain', 'Rustic', 'Winter', 'Wedding']
  },
  {
    id: 'jazz-club',
    name: 'The Blue Note Lounge',
    description: 'Intimate jazz club with vintage decor, premium sound system, and speakeasy atmosphere.',
    location: {
      address: '789 Jazz Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94133'
    },
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', // Moody jazz club interior
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'
    ],
    pricePerHour: 350,
    pricePerGuest: 30,
    maxCapacity: 100,
    minCapacity: 20,
    minimumHours: 4,
    amenities: [
      createAmenity('Professional Sound System'),
      createAmenity('Stage'),
      createAmenity('Green Room'),
      createAmenity('Full Bar')
    ],
    rules: [
      'No outside food or drink',
      'Professional musicians only',
      'Sound check required'
    ],
    reviews: [],
    availability: {
      monday: { start: '16:00', end: '02:00' },
      tuesday: { start: '16:00', end: '02:00' },
      wednesday: { start: '16:00', end: '02:00' },
      thursday: { start: '16:00', end: '02:00' },
      friday: { start: '16:00', end: '03:00' },
      saturday: { start: '16:00', end: '03:00' },
      sunday: { start: '16:00', end: '00:00' }
    },
    features: [
      { name: 'Vintage Stage', description: 'Original 1940s performance stage' },
      { name: 'Premium Acoustics', description: 'Professionally designed acoustic space' }
    ],
    cancellationPolicy: '21 days notice required for full refund',
    tags: ['Music', 'Nightlife', 'Entertainment', 'Intimate']
  },
  {
    id: 'desert-oasis',
    name: 'Desert Bloom Estate',
    description: 'Modern desert retreat with stunning architecture and native desert landscaping.',
    location: {
      address: '123 Desert View Road',
      city: 'Palm Springs',
      state: 'CA',
      zip: '92262'
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', // Modern desert home
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    ],
    pricePerHour: 550,
    pricePerGuest: 35,
    maxCapacity: 150,
    minCapacity: 25,
    minimumHours: 5,
    amenities: [
      createAmenity('Pool'),
      createAmenity('Outdoor Shower'),
      createAmenity('Misting System'),
      createAmenity('Desert Gardens')
    ],
    rules: [
      'No glass near pool',
      'Respect desert wildlife',
      'Noise ordinance after 10 PM'
    ],
    reviews: [],
    availability: {
      monday: { start: '08:00', end: '22:00' },
      tuesday: { start: '08:00', end: '22:00' },
      wednesday: { start: '08:00', end: '22:00' },
      thursday: { start: '08:00', end: '22:00' },
      friday: { start: '08:00', end: '23:00' },
      saturday: { start: '08:00', end: '23:00' },
      sunday: { start: '08:00', end: '22:00' }
    },
    features: [
      { name: 'Desert Views', description: 'Panoramic views of desert landscape' },
      { name: 'Modern Architecture', description: 'Award-winning architectural design' }
    ],
    cancellationPolicy: '45 days notice required for full refund',
    tags: ['Desert', 'Modern', 'Pool', 'Outdoor']
  },
  {
    id: 'film-studio',
    name: 'Cinematic Studios',
    description: 'Professional film studio with multiple sets, green screens, and production facilities.',
    location: {
      address: '456 Production Blvd',
      city: 'Burbank',
      state: 'CA',
      zip: '91505'
    },
    images: [
      'https://images.unsplash.com/photo-1500210557-5db9e134926b', // Professional film studio
      'https://images.unsplash.com/photo-1500210557-5db9e134926b',
      'https://images.unsplash.com/photo-1500210557-5db9e134926b'
    ],
    pricePerHour: 750,
    pricePerGuest: 0,
    maxCapacity: 100,
    minCapacity: 5,
    minimumHours: 8,
    amenities: [
      createAmenity('Green Screen'),
      createAmenity('Lighting Grid'),
      createAmenity('Sound Stage'),
      createAmenity('Makeup Room')
    ],
    rules: [
      'Production insurance required',
      'Qualified crew only',
      'Equipment handling certification needed'
    ],
    reviews: [],
    availability: {
      monday: { start: '06:00', end: '22:00' },
      tuesday: { start: '06:00', end: '22:00' },
      wednesday: { start: '06:00', end: '22:00' },
      thursday: { start: '06:00', end: '22:00' },
      friday: { start: '06:00', end: '22:00' },
      saturday: { start: '08:00', end: '20:00' },
      sunday: { start: '08:00', end: '20:00' }
    },
    features: [
      { name: 'Sound Stage', description: 'Professional sound-isolated stage' },
      { name: 'Control Room', description: 'State-of-the-art production control room' }
    ],
    cancellationPolicy: '14 days notice required for full refund',
    tags: ['Film', 'Production', 'Studio', 'Professional']
  },
  {
    id: 'floating-pavilion',
    name: 'Harbor View Pavilion',
    description: 'Elegant floating venue with 360-degree water views and modern maritime design.',
    location: {
      address: '789 Marina Way',
      city: 'Sausalito',
      state: 'CA',
      zip: '94965'
    },
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', // Waterfront pavilion
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3'
    ],
    pricePerHour: 600,
    pricePerGuest: 40,
    maxCapacity: 160,
    minCapacity: 30,
    minimumHours: 5,
    amenities: [
      createAmenity('Boat Dock'),
      createAmenity('Waterfront Deck'),
      createAmenity('Climate Control'),
      createAmenity('Sunset Lighting')
    ],
    rules: [
      'Life jackets provided',
      'Weather contingency required',
      'No swimming'
    ],
    reviews: [],
    availability: {
      monday: { start: '10:00', end: '22:00' },
      tuesday: { start: '10:00', end: '22:00' },
      wednesday: { start: '10:00', end: '22:00' },
      thursday: { start: '10:00', end: '22:00' },
      friday: { start: '10:00', end: '23:00' },
      saturday: { start: '09:00', end: '23:00' },
      sunday: { start: '09:00', end: '22:00' }
    },
    features: [
      { name: 'Water Views', description: '360-degree bay and marina views' },
      { name: 'Private Dock', description: 'Direct boat access and private dock' }
    ],
    cancellationPolicy: '60 days notice required for full refund',
    tags: ['Waterfront', 'Maritime', 'Unique', 'Wedding']
  }
]; 