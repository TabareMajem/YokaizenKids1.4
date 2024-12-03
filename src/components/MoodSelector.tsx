import React from 'react';
import { 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  Star,
  type LucideIcon 
} from 'lucide-react';

type Mood = {
  icon: LucideIcon;
  label: string;
  color: string;
};

const moods: Mood[] = [
  { icon: Smile, label: 'Happy', color: 'text-yellow-500 hover:text-yellow-600' },
  { icon: Heart, label: 'Loved', color: 'text-pink-500 hover:text-pink-600' },
  { icon: Star, label: 'Excited', color: 'text-purple-500 hover:text-purple-600' },
  { icon: Meh, label: 'Okay', color: 'text-blue-500 hover:text-blue-600' },
  { icon: Frown, label: 'Sad', color: 'text-indigo-500 hover:text-indigo-600' },
];

type Props = {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
};

export default function MoodSelector({ selectedMood, onMoodSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {moods.map(({ icon: Icon, label, color }) => (
        <button
          key={label}
          onClick={() => onMoodSelect(label)}
          className={`flex flex-col items-center p-3 rounded-lg transition-all transform 
            ${selectedMood === label ? 'scale-110 bg-gray-100' : 'hover:scale-105'}
          `}
        >
          <Icon 
            className={`w-8 h-8 ${color} transition-colors duration-200`} 
          />
          <span className="mt-1 text-sm font-medium text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
}