import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Balloon from './Balloon';
import type { GameBalloon } from './types';

type Props = {
  balloons: GameBalloon[];
  onBalloonPop: (id: string, emotion: string) => void;
  disabled?: boolean;
};

export default function GameCanvas({ balloons, onBalloonPop, disabled }: Props) {
  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        {balloons.map(balloon => (
          <Balloon
            key={balloon.id}
            balloon={balloon}
            onPop={() => onBalloonPop(balloon.id, balloon.emotion)}
            disabled={disabled}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}