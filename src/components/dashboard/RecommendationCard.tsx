import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
};

export default function RecommendationCard({ title, description, imageUrl, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="h-32 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <button className="mt-3 text-purple-600 text-sm font-medium flex items-center gap-1 group">
          Try this activity
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}