import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: `Join us for the most anticipated music festival of the summer! Experience an unforgettable day of live performances across three stages, featuring a diverse lineup of artists from electronic to indie rock.

    🎵 What to Expect:
    • 12+ hours of live music
    • 3 uniquely themed stages
    • Local food vendors and craft beverages
    • Interactive art installations
    • Silent disco area
    • VIP lounges with premium viewing areas

    This year's festival brings together both established and emerging artists, creating an electric atmosphere that celebrates music, art, and community. Come be part of this immersive experience!`,
    date: '2024-07-15',
    time: '14:00',
    location: 'Golden Gate Park, San Francisco, CA',
    price: 89,
    formattedPrice: '$89',
    category: 'festivals',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    ticketsAvailable: 500,
    isRSVP: false,
    hostId: 'host1',
    hostName: 'SF Events',
    hostImage: 'https://example.com/host1.jpg',
    attendeeCount: 234,
    highlights: [
      {
        iconType: 'musical-note',
        title: '3 Live Stages',
        description: 'Main Stage, Electronic Grove, and Indie Valley'
      },
      {
        iconType: 'user-group',
        title: 'Food & Art Village',
        description: '20+ local vendors and interactive installations'
      },
      {
        iconType: 'star',
        title: 'VIP Experience',
        description: 'Premium viewing areas and exclusive lounges'
      }
    ],
    speakers: [
      {
        name: 'The Lumineers',
        role: 'Headliner - Main Stage',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7'
      },
      {
        name: 'Rüfüs Du Sol',
        role: 'Electronic Grove Headliner',
        image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1'
      },
      {
        name: 'Tame Impala',
        role: 'Main Stage',
        image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0'
      },
      {
        name: 'Local Natives',
        role: 'Indie Valley Headliner',
        image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34'
      }
    ],
    speakersTitle: 'Featured Artists',
    comments: [
      {
        authorName: 'Sarah Chen',
        authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        content: "Last year's festival was amazing! The silent disco was a highlight. Can't wait to see The Lumineers this year!",
        timeAgo: '2 days ago',
        likes: 24,
        replies: [
          {
            authorName: 'Mike Thompson',
            authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            content: 'The silent disco is back this year? Amazing!',
            timeAgo: '1 day ago',
            likes: 8
          }
        ]
      },
      {
        authorName: 'Alex Rivera',
        authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        content: "Anyone know if they will have vegetarian food options?",
        timeAgo: '1 day ago',
        likes: 5,
        replies: [
          {
            authorName: 'Festival Staff',
            authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            content: "Hi Alex! Yes, we will have plenty of vegetarian and vegan options available at the Food Village.",
            timeAgo: '12 hours ago',
            likes: 12
          }
        ]
      }
    ],
    guestList: {
      going: 156,
      maybe: 48,
      notGoing: 12
    }
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    description: `Join us for the most comprehensive tech conference of the year, where innovation meets opportunity. This two-day event brings together industry leaders, developers, and visionaries to explore the latest trends and technologies shaping our future.

    🚀 Conference Highlights:
    • Keynote speeches from tech industry leaders
    • 40+ specialized workshops and sessions
    • Hands-on coding workshops
    • Startup showcase & pitch competition
    • AI/ML deep-dive tracks
    • Networking events and career fair

    Whether you're a seasoned developer, startup founder, or tech enthusiast, this conference offers invaluable insights and connections to help accelerate your journey in tech.`,
    date: '2024-08-20',
    time: '09:00',
    location: 'Moscone Center, San Francisco, CA',
    price: 299,
    formattedPrice: '$299',
    category: 'conferences',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    ticketsAvailable: 1000,
    isRSVP: false,
    hostId: 'host2',
    hostName: 'Tech Events Co',
    hostImage: 'https://example.com/host2.jpg',
    attendeeCount: 789,
    highlights: [
      {
        iconType: 'beaker',
        title: 'Innovation Lab',
        description: 'Hands-on experience with cutting-edge tech'
      },
      {
        iconType: 'user-group',
        title: 'Networking Hub',
        description: 'AI-powered matchmaking for meaningful connections'
      },
      {
        iconType: 'presentation',
        title: 'Tech Talks',
        description: '40+ sessions across 5 specialized tracks'
      }
    ],
    speakers: [
      {
        name: 'Dr. Lisa Chen',
        role: 'CEO, TechCorp - Keynote Speaker',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
      },
      {
        name: 'Mark Johnson',
        role: 'AI Research Lead, OpenAI',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      {
        name: 'Sarah Park',
        role: 'CTO, Future Labs',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      {
        name: 'Dev Patel',
        role: 'Distinguished Engineer, Google',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
      }
    ],
    comments: [
      {
        authorName: 'David Kim',
        authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        content: 'Looking forward to the AI workshops! Will the sessions be recorded for virtual ticket holders?',
        timeAgo: '3 days ago',
        likes: 15,
        replies: [
          {
            authorName: 'Tech Events Team',
            authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            content: 'Yes, all sessions will be recorded and available for 30 days after the event!',
            timeAgo: '2 days ago',
            likes: 8
          }
        ]
      }
    ],
    guestList: {
      going: 567,
      maybe: 123,
      notGoing: 45
    }
  },
  {
    id: '3',
    title: 'Networking Mixer',
    description: `Join us for an evening of meaningful connections and professional networking! Our monthly mixer brings together ambitious professionals from various industries in a relaxed, welcoming atmosphere.

    🤝 Event Highlights:
    • Speed networking sessions
    • Industry roundtables
    • Professional headshot station
    • Complimentary appetizers & beverages
    • Business card exchange
    • Mentor matching opportunity

    Whether you're looking to expand your professional network, find your next career opportunity, or simply connect with like-minded individuals, this is the perfect platform to achieve your goals.`,
    date: '2024-06-10',
    time: '18:00',
    location: 'The Grand Hotel, San Francisco, CA',
    price: 0,
    formattedPrice: 'Free',
    category: 'networking',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7',
    coverImage: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7',
    ticketsAvailable: 100,
    isRSVP: true,
    hostId: 'host3',
    hostName: 'SF Networking',
    hostImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    attendeeCount: 45,
    highlights: [
      {
        iconType: 'user-group',
        title: 'Professional Networking',
        description: 'Meet and connect with professionals from various industries'
      },
      {
        iconType: 'presentation',
        title: 'Mentor Sessions',
        description: '1-on-1 mentoring opportunities with industry experts'
      },
      {
        iconType: 'presentation',
        title: 'Industry Roundtables',
        description: 'Discuss and learn from industry leaders'
      }
    ],
    speakers: [
      {
        name: 'John Doe',
        role: 'Event Organizer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
      },
      {
        name: 'Jane Smith',
        role: 'Networking Expert',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
      },
      {
        name: 'Bob Johnson',
        role: 'Mentor',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
      },
      {
        name: 'Alice Brown',
        role: 'Mentor',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
      }
    ],
    comments: [
      {
        authorName: 'David Kim',
        authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        content: 'Looking forward to the networking mixer! Will there be opportunities to connect with industry experts?',
        timeAgo: '3 days ago',
        likes: 15,
        replies: [
          {
            authorName: 'Networking Events Team',
            authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            content: 'Yes, there will be opportunities to connect with industry experts during the networking mixer!',
            timeAgo: '2 days ago',
            likes: 8
          }
        ]
      }
    ],
    guestList: {
      going: 80,
      maybe: 20,
      notGoing: 5
    }
  }
];

export {}; 