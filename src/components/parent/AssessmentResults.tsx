import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users } from 'lucide-react';
import EIResultsCard from './EIResultsCard';
import BigFiveResultsCard from './BigFiveResultsCard';
import type { EIScores } from '../../hooks/useQuizResults';
import type { BigFiveScores } from '../../hooks/useBigFiveResults';

type Props = {
  eiScores?: EIScores;
  previousEIScores?: EIScores;
  bigFiveScores?: BigFiveScores;
  previousBigFiveScores?: BigFiveScores;
};

export default function AssessmentResults({ 
  eiScores,
  previousEIScores,
  bigFiveScores,
  previousBigFiveScores
}: Props) {
  return (
    <div className="space-y-6">
      {/* Assessment Selection */}
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Brain className="w-5 h-5" />
          Emotional Intelligence
        </button>
        <button
          className="px-4 py-2 bg-white border border-purple-200 
            text-purple-600 rounded-lg hover:bg-purple-50 
            transition-colors flex items-center gap-2"
        >
          <Users className="w-5 h-5" />
          Big Five Personality
        </button>
      </div>

      {/* Results Cards */}
      <div className="grid gap-6">
        {eiScores && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <EIResultsCard 
              scores={eiScores} 
              previousScores={previousEIScores}
            />
          </motion.div>
        )}

        {bigFiveScores && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BigFiveResultsCard 
              scores={bigFiveScores}
              previousScores={previousBigFiveScores}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}