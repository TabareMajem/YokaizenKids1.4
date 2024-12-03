import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import type { Location } from './types';

type Props = {
  currentLocation: Location | null;
  solvedLocations: string[];
  onLocationSelect: (locationId: string) => void;
};

const locations: Location[] = [
  {
    id: 'shrine',
    name: 'Mountain Shrine',
    x: 20,
    y: 30,
    character: 'Old Monk'
  },
  {
    id: 'market',
    name: 'Village Market',
    x: 50,
    y: 60,
    character: 'Wise Merchant'
  },
  {
    id: 'garden',
    name: 'Bamboo Garden',
    x: 80,
    y: 40,
    character: 'Elderly Gardener'
  }
];

export default function VillageMap({ currentLocation, solvedLocations, onLocationSelect }: Props) {
  return (
    <div className="absolute inset-0">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920&h=1080"
        alt="Japanese village"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Location Markers */}
      {locations.map((location) => {
        const isSolved = solvedLocations.includes(location.id);
        const isActive = currentLocation?.id === location.id;

        return (
          <motion.button
            key={location.id}
            onClick={() => onLocationSelect(location.id)}
            className={`absolute p-2 rounded-full transition-colors ${
              isSolved
                ? 'bg-green-100'
                : isActive
                  ? 'bg-amber-100 ring-2 ring-amber-400 ring-offset-2'
                  : 'bg-white hover:bg-amber-50'
            }`}
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSolved ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <MapPin className="w-6 h-6 text-amber-600" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}