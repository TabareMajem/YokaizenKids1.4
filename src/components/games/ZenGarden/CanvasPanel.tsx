import React from 'react';
import { motion, Reorder } from 'framer-motion';
import { X } from 'lucide-react';
import type { GardenElement } from './types';

type Props = {
  elements: GardenElement[];
  onElementMove: (id: string, position: { x: number; y: number }) => void;
  onElementRemove: (id: string) => void;
};

export default function CanvasPanel({ elements, onElementMove, onElementRemove }: Props) {
  return (
    <div className="absolute inset-0">
      {/* Sand Background */}
      <div className="absolute inset-0 bg-stone-200" />

      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, #00000005 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Garden Elements */}
      <Reorder.Group axis="y" values={elements} onReorder={() => {}}>
        {elements.map((element) => (
          <Reorder.Item
            key={element.id}
            value={element}
            dragListener={false}
          >
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                onElementMove(element.id, {
                  x: info.point.x,
                  y: info.point.y
                });
              }}
              className="absolute cursor-move"
              style={{
                left: element.position.x,
                top: element.position.y,
                rotate: element.rotation
              }}
            >
              <div className="relative group">
                <img
                  src={getElementImage(element.type)}
                  alt={element.type}
                  className="w-16 h-16 object-contain"
                  draggable={false}
                />
                <button
                  onClick={() => onElementRemove(element.id)}
                  className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full
                    opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

function getElementImage(type: string): string {
  switch (type) {
    case 'rock':
      return 'https://images.unsplash.com/photo-1582237058802-786589447c3c?w=100&h=100';
    case 'plant':
      return 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=100&h=100';
    case 'lantern':
      return 'https://images.unsplash.com/photo-1580507054812-e043bef0456f?w=100&h=100';
    default:
      return '';
  }
}