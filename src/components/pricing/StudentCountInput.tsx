import React from 'react';
import { motion } from 'framer-motion';
import { Users, Minus, Plus } from 'lucide-react';

type Props = {
  studentCount: number;
  onCountChange: (count: number) => void;
  minStudents?: number;
  maxStudents?: number;
};

export default function StudentCountInput({ 
  studentCount, 
  onCountChange,
  minStudents = 1,
  maxStudents = 1000
}: Props) {
  const handleIncrement = () => {
    if (studentCount < maxStudents) {
      onCountChange(studentCount + 1);
    }
  };

  const handleDecrement = () => {
    if (studentCount > minStudents) {
      onCountChange(studentCount - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minStudents && value <= maxStudents) {
      onCountChange(value);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Number of Students
      </label>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={studentCount <= minStudents}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </button>

        <div className="relative flex-1">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={studentCount}
            onChange={handleInputChange}
            min={minStudents}
            max={maxStudents}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400
              text-center"
          />
        </div>

        <button
          onClick={handleIncrement}
          disabled={studentCount >= maxStudents}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        {maxStudents === 1000 ? 'Contact us for larger organizations' : ''}
      </p>
    </div>
  );
}