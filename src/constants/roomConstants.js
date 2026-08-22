/**
 * roomConstants.js
 *
 * All dynamic room data (listings, locations, reviews, bookings) is fetched
 * live from the Laravel backend API via the services layer.
 *
 * Only UI-level static option lists are kept here.
 */

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

/**
 * POPULAR_LOCATIONS is no longer a hardcoded constant.
 * It is fetched live from the backend via locationService.getPopularLocations()
 * and stored in AppContext as `popularLocations`.
 *
 * This empty export is kept for backwards-compatibility only.
 * @deprecated Use `popularLocations` from AppContext instead.
 */
export const POPULAR_LOCATIONS = [];
