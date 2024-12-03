import React from 'react';
import { Clock } from 'lucide-react';

type Props = {
  timeLeft: number;
};

export default function Timer({ timeLeft }: Props) {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Clock className="w-5 h-5" />
      <span className="font-medium">{timeLeft}s</span>
    </div>
  );
}