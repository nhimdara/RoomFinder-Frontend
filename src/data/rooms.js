/**
 * data/rooms.js — REMOVED STATIC DATA
 *
 * All room data (listings, locations, availability) is fetched live from the
 * Laravel backend API. Use the service layer:
 *   - roomService.getRooms(filters)
 *   - roomService.getFeaturedRooms()
 *   - roomService.getNearbyRooms()
 *   - locationService.getPopularLocations()  ← replaces POPULAR_LOCATIONS
 *
 * UI-level constants (ROOM_TYPES, AMENITIES_LIST) remain in constants/roomConstants.js
 */
import { ROOM_TYPES, AMENITIES_LIST } from '../constants/roomConstants';

export { ROOM_TYPES, AMENITIES_LIST };
export const roomTypes = ROOM_TYPES;
export const amenitiesList = AMENITIES_LIST;

/**
 * @deprecated Use popularLocations from AppContext (fetched from backend API).
 */
export const popularLocations = [];
export const POPULAR_LOCATIONS = [];
