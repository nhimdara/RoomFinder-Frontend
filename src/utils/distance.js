/**
 * Calculate geographical distance in km between two lat/lng points using Haversine formula
 */
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const formatWalkTime = (distanceKm) => {
  const walkingSpeedKmH = 4.5;
  const minutes = Math.round((distanceKm / walkingSpeedKmH) * 60);
  if (minutes <= 1) return '1 min walk';
  return `${minutes} mins walk`;
};

export default {
  calculateDistanceKm,
  formatWalkTime
};
