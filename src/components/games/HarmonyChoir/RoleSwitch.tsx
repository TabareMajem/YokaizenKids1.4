import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import type { VoicePart } from './types';

type Props = {
  currentRole: VoicePart;
  onSwitch: () => void;
  disabled?: boolean;
};

export default function RoleSwitch({ currentRole, onSwitch, disabled }: Props) {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <button
        onClick={onSwitch}
        disabled={disabled}
        className="px-6 py-3 bg-white/90 backdrop-blur-sm text-purple-600 
          rounded-lg hover:bg-white transition-colors shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2"
      >
        <Users className="w-5 h-5" />
        Switch Voice ({currentRole})
      </button>
    </div>
  );
}