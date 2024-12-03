import type { EIScores } from '../hooks/useQuizResults';
import type { BigFiveScores } from '../hooks/useBigFiveResults';
import type { BullyingScores } from '../hooks/useBullyingAssessment';

export type AssessmentData = {
  date: string;
  eiScores: EIScores;
  bigFiveScores: BigFiveScores;
  bullyingScores: BullyingScores;
};