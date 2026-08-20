// Mock data for RoomFinder platform
export const INITIAL_ROOMS = [
  {
    id: 'room-1',
    title: 'Modern Cozy Studio near Science Campus',
    roomType: 'Studio',
    price: 320,
    deposit: 320,
    utilitiesIncluded: true,
    address: '142 University Avenue, District 1',
    city: 'City Center',
    district: 'University Hub',
    lat: 10.7769,
    lng: 106.7009,
    mapX: 42, // % coordinate on interactive map
    mapY: 38,
    distanceToCampus: '3 mins walk to Main Tech Campus',
    size: '28 m²',
    floor: '4th Floor (Elevator)',
    availableFrom: 'Immediately',
    minLease: '3 Months',
    rating: 4.9,
    reviewCount: 28,
    verified: true,
    featured: true,
    status: 'active', // 'active' | 'occupied' | 'draft'
    ownerId: 'owner-1',
    landlord: {
      name: 'Sarah Jenkins',
      role: 'Superhost Landlord',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (555) 234-8901',
      email: 'sarah.j@roomfinder.com',
      verifiedHost: true,
      responseRate: '99%',
      responseTime: 'Within 10 minutes',
      totalListings: 4
    },
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Private Bathroom',
      'Fully Furnished',
      'Kitchenette',
      'Study Desk & Chair',
      'Washing Machine',
      'Balcony',
      'Elevator',
      '24/7 Smart Lock'
    ],
    description: 'Bright and newly renovated private studio apartment tailored for students and young professionals. Features high ceilings, ergonomic study zone, ultra-fast 500Mbps fiber internet, brand new inverter AC, and a scenic balcony with morning sunlight.',
    houseRules: [
      'Quiet hours after 10:30 PM',
      'No smoking indoors',
      'Small clean pets allowed upon request',
      'Guest staying over maximum 2 nights with notice'
    ],
    nearbyPlaces: [
      { name: 'University Science Campus', distance: '250m (3 mins walk)' },
      { name: 'Metro Line Station #2', distance: '400m (5 mins walk)' },
      { name: '24/7 Supermarket & Pharmacy', distance: '120m (1 min walk)' },
      { name: 'Central Student Library', distance: '500m (6 mins walk)' }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Alex Nguyen',
        role: 'Computer Science Sophomore',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Best student room I have stayed at! Sarah is super responsive, the internet never dropped during exam week, and it literally takes 3 mins to walk to class.'
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        role: 'Exchange Student',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Super clean, quiet neighborhood, and love the balcony. The kitchen has everything needed for light cooking.'
      }
    ]
  },
  {
    id: 'room-2',
    title: 'Sunny Master Bedroom in Modern Shared Flat',
    roomType: 'Master',
    price: 260,
    deposit: 260,
    utilitiesIncluded: true,
    address: '88 Franklin Street, Academic Quarter',
    city: 'East Campus',
    district: 'Academic Quarter',
    lat: 10.7812,
    lng: 106.7051,
    mapX: 68,
    mapY: 28,
    distanceToCampus: '5 mins bike to Medical & Arts College',
    size: '22 m²',
    floor: '2nd Floor',
    availableFrom: 'Next Week',
    minLease: '6 Months',
    rating: 4.8,
    reviewCount: 19,
    verified: true,
    featured: true,
    status: 'active',
    ownerId: 'owner-1',
    landlord: {
      name: 'Sarah Jenkins',
      role: 'Superhost Landlord',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (555) 234-8901',
      email: 'sarah.j@roomfinder.com',
      verifiedHost: true,
      responseRate: '99%',
      responseTime: 'Within 10 minutes',
      totalListings: 4
    },
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Private Bathroom',
      'Fully Furnished',
      'Shared Chef Kitchen',
      'Study Desk & Chair',
      'Washing Machine',
      'Garden Patio'
    ],
    description: 'Spacious master bedroom with ensuite private glass-enclosed bathroom. Located in a charming 3-bedroom student house. Share common living room and fully equipped kitchen with two quiet engineering students.',
    houseRules: [
      'Keep shared kitchen clean after use',
      'No loud music after 11 PM',
      'No indoor smoking'
    ],
    nearbyPlaces: [
      { name: 'Medical School Campus', distance: '600m (7 mins walk)' },
      { name: 'City Bus Terminal', distance: '150m (2 mins walk)' },
      { name: 'Green Park & Jogging Track', distance: '300m (4 mins walk)' }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Marcus Vance',
        role: 'Biomedical Senior',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Great roommates and very comfortable master room with private bath.'
      }
    ]
  },
  {
    id: 'room-3',
    title: 'Minimalist Single Room w/ Study Desk & High Speed Net',
    roomType: 'Single',
    price: 190,
    deposit: 190,
    utilitiesIncluded: false,
    address: '15 College Lane, Green District',
    city: 'West Suburbs',
    district: 'Green District',
    lat: 10.7725,
    lng: 106.6923,
    mapX: 25,
    mapY: 62,
    distanceToCampus: '8 mins bus to University Central',
    size: '16 m²',
    floor: '3rd Floor',
    availableFrom: 'Immediately',
    minLease: '1 Month',
    rating: 4.7,
    reviewCount: 14,
    verified: true,
    featured: false,
    status: 'active',
    ownerId: 'owner-2',
    landlord: {
      name: 'Michael Chen',
      role: 'Verified Landlord',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (555) 789-0123',
      email: 'm.chen@roomfinder.com',
      verifiedHost: true,
      responseRate: '95%',
      responseTime: 'Within 1 hour',
      totalListings: 2
    },
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Fully Furnished',
      'Study Desk & Chair',
      'Shared Bathroom',
      'Washing Machine',
      'Motorbike Parking'
    ],
    description: 'Budget-friendly, ultra-clean single room designed specifically for focus and studying. Comes with a wide wooden desk, ergonomic chair, wardrobe, and natural window lighting.',
    houseRules: [
      'Strictly non-smoking',
      'Respect roommate quiet hours',
      'No pets'
    ],
    nearbyPlaces: [
      { name: 'Bus Route 08 Stop', distance: '50m (1 min walk)' },
      { name: 'University West Gate', distance: '1.2km (8 mins bus)' },
      { name: 'Food Court & Street Food Market', distance: '200m (3 mins walk)' }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Daniel Kim',
        role: 'Freshman Student',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        rating: 4.8,
        date: '2 months ago',
        comment: 'Very cost-effective and the internet speed is fantastic for remote lectures.'
      }
    ]
  },
  {
    id: 'room-4',
    title: 'Luxury 1-Bedroom Loft near Business School',
    roomType: 'Apartment',
    price: 450,
    deposit: 450,
    utilitiesIncluded: true,
    address: '502 Marina Boulevard, Riverside',
    city: 'City Center',
    district: 'Financial & Arts',
    lat: 10.7850,
    lng: 106.7110,
    mapX: 82,
    mapY: 48,
    distanceToCampus: '4 mins walk to Business & Law School',
    size: '45 m²',
    floor: '12th Floor (Penthouse View)',
    availableFrom: 'Sept 1st',
    minLease: '6 Months',
    rating: 5.0,
    reviewCount: 32,
    verified: true,
    featured: true,
    status: 'active',
    ownerId: 'owner-1',
    landlord: {
      name: 'Sarah Jenkins',
      role: 'Superhost Landlord',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (555) 234-8901',
      email: 'sarah.j@roomfinder.com',
      verifiedHost: true,
      responseRate: '99%',
      responseTime: 'Within 10 minutes',
      totalListings: 4
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Central AC',
      'Private Bathroom',
      'Fully Furnished',
      'Modern Island Kitchen',
      'Smart TV',
      'Gym & Swimming Pool',
      'Washing Machine & Dryer',
      'Underground Car Parking',
      '24/7 Security Concierge'
    ],
    description: 'High-end designer loft with floor-to-ceiling windows and panoramic skyline views. Includes free access to the building infinity pool and rooftop gym. Perfect for graduate students or partners.',
    houseRules: [
      'No parties or loud gatherings',
      'Pets allowed with deposit',
      'Non-smoking inside unit'
    ],
    nearbyPlaces: [
      { name: 'Business & Law Faculty', distance: '300m (4 mins walk)' },
      { name: 'Riverside Walk & Cafes', distance: '100m (1 min walk)' },
      { name: 'Shopping Mall & Cinema', distance: '600m (8 mins walk)' }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Sophie Martin',
        role: 'MBA Candidate',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Exceptional place! Safe building, luxury amenities, and peaceful environment to write my thesis.'
      }
    ]
  },
  {
    id: 'room-5',
    title: 'Shared Double Bed in Student Dorm Suite',
    roomType: 'Shared',
    price: 140,
    deposit: 100,
    utilitiesIncluded: true,
    address: '22 Harmony Way, North Campus',
    city: 'North Quarter',
    district: 'Student Village',
    lat: 10.7690,
    lng: 106.6980,
    mapX: 36,
    mapY: 74,
    distanceToCampus: 'Direct campus shuttle every 15 mins',
    size: '20 m²',
    floor: '1st Floor',
    availableFrom: 'Immediately',
    minLease: '1 Semester',
    rating: 4.6,
    reviewCount: 11,
    verified: true,
    featured: false,
    status: 'active',
    ownerId: 'owner-3',
    landlord: {
      name: 'David Wilson',
      role: 'Dorm Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (555) 456-7890',
      email: 'david.w@roomfinder.com',
      verifiedHost: true,
      responseRate: '90%',
      responseTime: 'Within 2 hours',
      totalListings: 8
    },
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Study Desks',
      'Community Lounge',
      'Shared Kitchen',
      'Coin Laundry',
      'Bicycle Storage',
      'CCTV Security'
    ],
    description: 'Shared twin room with separate study desks and lockers. All utility bills, WiFi, and cleaning of common areas are covered in the rent. Vibrant community of international and local students.',
    houseRules: [
      'Quiet study hours after 10 PM',
      'Clean up kitchen immediately after cooking',
      'No overnight guests without dorm supervisor approval'
    ],
    nearbyPlaces: [
      { name: 'Campus Shuttle Stop', distance: '30m (30 sec walk)' },
      { name: 'Student Cafeteria', distance: '80m (1 min walk)' },
      { name: 'Sports Complex & Gym', distance: '250m (3 mins walk)' }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Lucas Garcia',
        role: 'Exchange Student',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 4.6,
        date: '3 weeks ago',
        comment: 'Great social vibe, met lots of good friends here. Super affordable!'
      }
    ]
  },
  {
    id: 'room-6',
    title: 'Modern Japanese Style Studio w/ Wooden Tatami Floor',
    roomType: 'Studio',
    price: 340,
    deposit: 340,
    utilitiesIncluded: false,
    address: '9 Sakura Lane, Tech Valley',
    city: 'East Campus',
    district: 'Tech Corridor',
    lat: 10.7790,
    lng: 106.7080,
    mapX: 58,
    mapY: 52,
    distanceToCampus: '6 mins walk to Engineering Labs',
    size: '30 m²',
    floor: '5th Floor',
    availableFrom: 'Aug 25th',
    minLease: '3 Months',
    rating: 4.9,
    reviewCount: 22,
    verified: true,
    featured: true,
    status: 'active',
    ownerId: 'owner-1',
    landlord: {
      name: 'Sarah Jenkins',
      role: 'Superhost Landlord',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (555) 234-8901',
      email: 'sarah.j@roomfinder.com',
      verifiedHost: true,
      responseRate: '99%',
      responseTime: 'Within 10 minutes',
      totalListings: 4
    },
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Inverter Air Conditioning',
      'Private Bathroom',
      'Solid Wood Furniture',
      'Smart Android TV',
      'Washing Machine',
      'Balcony Garden',
      'Smart Door Lock'
    ],
    description: 'Designed with calming Japanese minimalism and warm wood accents. Enjoy quiet meditation or study on the tatami nook, with fast internet and a sunlit balcony with green plants.',
    houseRules: [
      'No shoes inside apartment',
      'No smoking',
      'Small quiet pets allowed'
    ],
    nearbyPlaces: [
      { name: 'Engineering Faculty', distance: '450m (6 mins walk)' },
      { name: 'Japanese Bakery & Coffee', distance: '90m (1 min walk)' },
      { name: 'Convenience Store (7-Eleven)', distance: '150m (2 mins walk)' }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Kenji Takahashi',
        role: 'Software Researcher',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Peaceful design, extremely comfortable bed and quiet atmosphere for deep work.'
      }
    ]
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'inq-101',
    roomId: 'room-1',
    roomTitle: 'Modern Cozy Studio near Science Campus',
    roomImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80',
    applicantName: 'Emily Clark',
    applicantEmail: 'emily.clark@university.edu',
    applicantPhone: '+1 (555) 345-6789',
    applicantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    university: 'MIT Science Dept (3rd Year)',
    moveInDate: '2026-09-01',
    duration: '12 Months',
    message: 'Hello! I am starting my 3rd year at the science faculty and would love to schedule a tour this Friday if possible. I am clean, quiet, and have references.',
    status: 'pending', // 'pending' | 'approved' | 'declined'
    createdAt: 'Today at 09:30 AM'
  },
  {
    id: 'inq-102',
    roomId: 'room-2',
    roomTitle: 'Sunny Master Bedroom in Modern Shared Flat',
    roomImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80',
    applicantName: 'Liam Harrison',
    applicantEmail: 'liam.h@college.edu',
    applicantPhone: '+1 (555) 987-6543',
    applicantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    university: 'Medical College (1st Year Resident)',
    moveInDate: '2026-08-28',
    duration: '6 Months',
    message: 'Hi Sarah, the location is ideal for my shifts at the hospital. Can we do an online video tour or in-person walk-through tomorrow?',
    status: 'approved',
    createdAt: 'Yesterday at 04:15 PM'
  },
  {
    id: 'inq-103',
    roomId: 'room-4',
    roomTitle: 'Luxury 1-Bedroom Loft near Business School',
    roomImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
    applicantName: 'Zack Miller',
    applicantEmail: 'zack.m@law.edu',
    applicantPhone: '+1 (555) 765-4321',
    applicantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    university: 'Law School Graduate',
    moveInDate: '2026-09-15',
    duration: '12 Months',
    message: 'Hi, is parking space included in the rent or is there an extra fee?',
    status: 'pending',
    createdAt: '2 days ago'
  }
];

export const POPULAR_LOCATIONS = [
  { name: 'University Science Campus', count: '48 Rooms', tag: 'Near Tech', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80' },
  { name: 'Downtown & Arts District', count: '62 Rooms', tag: 'City Hub', image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=500&q=80' },
  { name: 'Medical & Dental Campus', count: '35 Rooms', tag: 'Hospital Vicinity', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=500&q=80' },
  { name: 'Business & Law Quarter', count: '29 Rooms', tag: 'Riverside', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80' }
];

export const ROOM_TYPES = [
  { label: 'All Types', value: 'all' },
  { label: 'Studio Apartment', value: 'Studio' },
  { label: 'Single Bedroom', value: 'Single' },
  { label: 'Master Bedroom', value: 'Master' },
  { label: 'Shared Twin Room', value: 'Shared' },
  { label: 'Full Apartment', value: 'Apartment' }
];

export const AMENITIES_LIST = [
  'High-Speed Wi-Fi',
  'Air Conditioning',
  'Private Bathroom',
  'Fully Furnished',
  'Kitchenette / Kitchen',
  'Study Desk & Chair',
  'Washing Machine',
  'Balcony',
  'Elevator',
  'Gym & Pool',
  'Pet Friendly',
  '24/7 Security'
];

export const INITIAL_OWNERS = [
  {
    id: 'owner-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@roomfinder.com',
    phone: '+1 (555) 234-8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'verified', // 'verified' | 'pending' | 'suspended'
    totalProperties: 4,
    activeRooms: 3,
    occupiedRooms: 1,
    joinedDate: 'Jan 15, 2026',
    identityDoc: 'Passport #P8942*** (Verified)',
    rating: 4.9,
    commissionDue: '$96.00'
  },
  {
    id: 'owner-2',
    name: 'Michael Chen',
    email: 'm.chen@roomfinder.com',
    phone: '+1 (555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'verified',
    totalProperties: 2,
    activeRooms: 2,
    occupiedRooms: 0,
    joinedDate: 'Feb 02, 2026',
    identityDoc: 'National ID #ID992*** (Verified)',
    rating: 4.7,
    commissionDue: '$38.00'
  },
  {
    id: 'owner-3',
    name: 'David Wilson',
    email: 'david.w@roomfinder.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'pending', // Pending Admin Verification
    totalProperties: 1,
    activeRooms: 1,
    occupiedRooms: 0,
    joinedDate: 'Aug 18, 2026',
    identityDoc: 'Property Deed #PD440*** (Needs Review)',
    rating: 4.6,
    commissionDue: '$0.00'
  },
  {
    id: 'owner-4',
    name: 'Robert Vance',
    email: 'robert.vance@vancerealty.com',
    phone: '+1 (555) 888-9999',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'pending',
    totalProperties: 3,
    activeRooms: 0,
    occupiedRooms: 0,
    joinedDate: 'Aug 20, 2026',
    identityDoc: 'Business License #BL-7789 (Needs Review)',
    rating: 5.0,
    commissionDue: '$0.00'
  }
];

export const INITIAL_ADMIN_LOGS = [
  {
    id: 'log-1',
    action: 'Room Verification Approved',
    target: 'Modern Cozy Studio near Science Campus',
    actor: 'Super Admin (System)',
    timestamp: 'Today at 08:30 AM',
    badge: 'success'
  },
  {
    id: 'log-2',
    action: 'Email Broadcast Dispatched',
    target: 'All Registered Landlords (4 recipients)',
    actor: 'Super Admin',
    timestamp: 'Yesterday at 05:00 PM',
    badge: 'info'
  },
  {
    id: 'log-3',
    action: 'Owner Verification Request',
    target: 'Robert Vance (Business License #BL-7789)',
    actor: 'Robert Vance',
    timestamp: 'Yesterday at 02:15 PM',
    badge: 'warning'
  }
];

export const INITIAL_BROADCAST_EMAILS = [
  {
    id: 'mail-1',
    subject: 'RoomFinder Semester Move-In Policy & Safety Standards',
    recipients: 'All Landlords (4)',
    type: 'Policy Update',
    body: 'Dear Landlord, as the new semester approaches, please ensure your fire alarms and internet speed test certificates are uploaded to your dashboard.',
    sentAt: 'Yesterday at 05:00 PM',
    status: 'Delivered'
  },
  {
    id: 'mail-2',
    subject: 'Welcome to RoomFinder Landlord Network',
    recipients: 'Sarah Jenkins (sarah.j@roomfinder.com)',
    type: 'Onboarding',
    body: 'Congratulations! Your superhost property listings are now live and visible to over 15,000 students near Science Campus.',
    sentAt: 'Aug 15, 2026',
    status: 'Delivered'
  }
];

