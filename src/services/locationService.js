import apiClient from './api';

/**
 * Location & Discovery Service
 * Fetches campus areas and location statistics from the live backend.
 */
export const locationService = {
  /**
   * Fetch popular campus neighborhoods by querying room address distribution.
   * Falls back to well-known Phnom Penh districts if the API returns no grouped data.
   */
  getPopularLocations: async () => {
    try {
      const response = await apiClient.get('rooms', { per_page: 50, sort: 'recommended' });
      const rooms = response?.data || response || [];

      // Derive popular neighborhoods from actual room address data
      const locationMap = {};
      rooms.forEach((room) => {
        const addr = room.address || room.location || '';
        // Extract district keywords from address
        const districts = [
          { key: 'Toul Kork', label: 'RUPP Campus & Toul Kork', tag: 'Campus Hub', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80' },
          { key: 'Daun Penh', label: 'Boeung Kak & Daun Penh', tag: 'City Center', image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=500&q=80' },
          { key: 'Tuek Laak', label: 'Tuek Laak & Russian Blvd', tag: 'Walk to Class', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=500&q=80' },
          { key: 'Chamkarmon', label: 'Chamkarmon & BKK District', tag: 'Student Friendly', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80' },
          { key: 'BKK', label: 'Chamkarmon & BKK District', tag: 'Student Friendly', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80' },
          { key: 'Russian', label: 'Tuek Laak & Russian Blvd', tag: 'Walk to Class', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=500&q=80' },
        ];

        districts.forEach(({ key, label, tag, image }) => {
          if (addr.toLowerCase().includes(key.toLowerCase())) {
            if (!locationMap[label]) {
              locationMap[label] = { name: label, tag, image, count: 0 };
            }
            locationMap[label].count += 1;
          }
        });
      });

      const derived = Object.values(locationMap).map((loc) => ({
        ...loc,
        count: `${loc.count}+ Rooms`,
      }));

      // If we derived real data, return it; otherwise return default neighborhoods
      if (derived.length > 0) {
        return derived;
      }

      return FALLBACK_LOCATIONS;
    } catch {
      return FALLBACK_LOCATIONS;
    }
  },
};

/**
 * Static fallback locations shown when the API is unavailable.
 * These are the known major campus neighborhoods in Phnom Penh.
 */
export const FALLBACK_LOCATIONS = [
  {
    name: 'RUPP Campus & Toul Kork',
    count: 'Rooms Available',
    tag: 'Campus Hub',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Boeung Kak & Daun Penh',
    count: 'Rooms Available',
    tag: 'City Center',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Tuek Laak & Russian Blvd',
    count: 'Rooms Available',
    tag: 'Walk to Class',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Chamkarmon & BKK District',
    count: 'Rooms Available',
    tag: 'Student Friendly',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80',
  },
];

export default locationService;
