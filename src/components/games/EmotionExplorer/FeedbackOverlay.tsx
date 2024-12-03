import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

type Props = {
  isCorrect: boolean;
  message: string;
};

export default function FeedbackOverlay({ isCorrect, message }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center 
        justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-white rounded-xl p-6 max-w-md text-center ${
          isCorrect ? 'border-4 border-green-200' : 'border-4 border-yellow-200'
        }`}
      >
        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center 
          justify-center ${isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          )}
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${
          isCorrect ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {isCorrect ? 'Great job!' : 'Good try!'}
        </h3>
        <p className="text-gray-600">{message}</p>
      </motion.div>
    </motion.div>
  );
}