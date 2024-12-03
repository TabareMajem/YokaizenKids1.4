import React from 'react';
import { motion } from 'framer-motion';
import type { Badge } from './types';

type Props = {
  badges: Badge[];
};

export default function BadgeCollection({ badges }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Earned Badges
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              delay: index * 0.1
            }}
            className="relative group"
          >
            <div className="aspect-square rounded-xl bg-gradient-to-br 
              from-purple-500 to-pink-500 p-4 flex flex-col items-center 
              justify-center gap-2 text-white cursor-help"
            >
              <badge.icon className="w-8 h-8" />
              <span className="text-sm font-medium text-center">
                {badge.name}
              </span>
            </div>

            {/* Tooltip */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
              translate-y-full w-48 bg-gray-900 text-white text-sm rounded-lg 
              py-2 px-3 opacity-0 invisible group-hover:opacity-100 
              group-hover:visible transition-all z-10"
            >
              <div className="text-center">
                <p className="font-medium mb-1">{badge.name}</p>
                <p className="text-gray-300 text-xs">{badge.description}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}