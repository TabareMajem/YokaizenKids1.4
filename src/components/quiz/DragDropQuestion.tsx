import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import type { QuizQuestion } from '../../types/quiz';

type Props = {
  question: QuizQuestion;
  onAnswerSelect: (answerId: string[]) => void;
  disabled?: boolean;
};

export default function DragDropQuestion({ question, onAnswerSelect, disabled }: Props) {
  const [items, setItems] = useState(question.answers);

  const handleReorder = (newOrder: typeof items) => {
    setItems(newOrder);
    onAnswerSelect(newOrder.map(item => item.id));
  };

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <div className="text-xl font-semibold text-gray-800">
        {question.text}
      </div>

      {/* Draggable Items */}
      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={handleReorder}
        className="space-y-2"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            dragListener={!disabled}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'}`}
          >
            <div className="p-4 flex items-center gap-4">
              <GripVertical className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-gray-800">{item.text}</p>
                {item.image && (
                  <img
                    src={item.image.url}
                    alt={item.image.alt[question.languages[0]]}
                    className="mt-2 rounded-lg max-h-32 object-cover"
                  />
                )}
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}