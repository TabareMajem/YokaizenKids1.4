import React from 'react';
import { motion } from 'framer-motion';
import SpeechBubble from './SpeechBubble';
import { type PanelData } from './types';

type Props = {
  panel: PanelData;
  isActive: boolean;
  direction: number;
};

export default function Panel({ panel, isActive, direction }: Props) {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate={isActive ? "center" : "exit"}
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="absolute inset-0 w-full h-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = Math.abs(velocity.x) * offset.x;
        if (swipe < -10000) {
          // Handle next panel
        } else if (swipe > 10000) {
          // Handle previous panel
        }
      }}
    >
      <div className="relative w-full h-full">
        <img
          src={panel.imageUrl}
          alt={`Panel ${panel.id}`}
          className="w-full h-full object-contain"
          draggable="false"
        />
        {panel.speechBubbles.map((bubble) => (
          <SpeechBubble
            key={bubble.id}
            bubble={bubble}
          />
        ))}
      </div>
    </motion.div>
  );
}