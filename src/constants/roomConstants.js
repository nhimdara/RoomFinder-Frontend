/**
 * Application Constants and Metadata for RoomFinder Web
 * All dynamic data (rooms, users, bookings, reviews) is fetched live from the Laravel API.
 */

export const POPULAR_LOCATIONS = [
  {
    name: 'RUPP Campus & Toul Kork',
    count: '24+ Rooms',
    tag: 'Campus Hub',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Boeung Kak & Daun Penh',
    count: '18+ Rooms',
    tag: 'City Center',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Tuek Laak & Russian Blvd',
    count: '15+ Rooms',
    tag: 'Walk to Class',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Chamkarmon & BKK District',
    count: '20+ Rooms',
    tag: 'Student Friendly',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80'
  }
];

export const ROOM_TYPES = [
  { label: 'All Types', value: 'all' },
  { label: 'Single Room', value: 'single' },
  { label: 'Shared Room', value: 'shared' },
  { label: 'Studio / Apartment', value: 'apartment' },
  { label: 'Dormitory', value: 'dormitory' }
];

export const AMENITIES_LIST = [
  'Wi-Fi',
  'Air Conditioning',
  'Private Bathroom',
  'Fully Furnished',
  'Kitchen',
  'Parking',
  'Washing Machine',
  'Security & CCTV',
  'Electricity Included',
  'Water Included'
];
