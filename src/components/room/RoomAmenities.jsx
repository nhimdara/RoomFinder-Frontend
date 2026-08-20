import React from 'react';
import {
  Wifi,
  Wind,
  Bath,
  Armchair,
  Utensils,
  BookOpen,
  Shirt,
  Sun,
  ArrowUpDown,
  Dumbbell,
  Heart,
  Shield,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  'High-Speed Wi-Fi': Wifi,
  'Air Conditioning': Wind,
  'Private Bathroom': Bath,
  'Fully Furnished': Armchair,
  'Kitchenette': Utensils,
  'Kitchenette / Kitchen': Utensils,
  'Study Desk & Chair': BookOpen,
  'Washing Machine': Shirt,
  'Balcony': Sun,
  'Elevator': ArrowUpDown,
  'Gym & Pool': Dumbbell,
  'Pet Friendly': Heart,
  '24/7 Security': Shield,
  '24/7 Smart Lock': Shield
};

export const RoomAmenities = ({ amenities = [], limit = null }) => {
  const displayItems = limit ? amenities.slice(0, limit) : amenities;

  return (
    <div className="room-amenities-grid">
      {displayItems.map((item, idx) => {
        const IconComponent = ICON_MAP[item] || CheckCircle2;
        return (
          <div key={idx} className="details-amenity-item">
            <div className="amenity-icon-wrap">
              <IconComponent size={16} color="#2563EB" />
            </div>
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RoomAmenities;
