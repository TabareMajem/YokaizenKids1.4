import { useState } from 'react';
import { processJournalEntry } from '../services/journalProcessor';
import type { ProcessedJournal } from '../services/types';

export function useJournalProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processEntry = async (text: string): Promise<ProcessedJournal | null> => {
    if (!text.trim()) {
      setError('Please write something in your journal first');
      return null;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const result = await processJournalEntry(text);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process journal entry';
      setError(message);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processEntry,
    isProcessing,
    error
  };
}