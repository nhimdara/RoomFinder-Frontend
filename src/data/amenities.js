export const AMENITIES_CATALOG = [
  { id: 'wifi', name: 'High-Speed Wi-Fi', icon: 'Wifi', category: 'Connectivity' },
  { id: 'ac', name: 'Air Conditioning', icon: 'Wind', category: 'Comfort' },
  { id: 'bathroom', name: 'Private Bathroom', icon: 'Bath', category: 'Sanitary' },
  { id: 'furnished', name: 'Fully Furnished', icon: 'Armchair', category: 'Furniture' },
  { id: 'kitchen', name: 'Kitchenette / Kitchen', icon: 'Utensils', category: 'Cooking' },
  { id: 'desk', name: 'Study Desk & Chair', icon: 'BookOpen', category: 'Study' },
  { id: 'washer', name: 'Washing Machine', icon: 'Shirt', category: 'Laundry' },
  { id: 'balcony', name: 'Balcony', icon: 'Sun', category: 'Outdoor' },
  { id: 'elevator', name: 'Elevator', icon: 'ArrowUpDown', category: 'Building' },
  { id: 'gym', name: 'Gym & Pool', icon: 'Dumbbell', category: 'Facilities' },
  { id: 'pets', name: 'Pet Friendly', icon: 'Heart', category: 'Policy' },
  { id: 'security', name: '24/7 Security & CCTV', icon: 'Shield', category: 'Safety' }
];

export const AMENITIES_LIST = AMENITIES_CATALOG.map((a) => a.name);

export default AMENITIES_CATALOG;
