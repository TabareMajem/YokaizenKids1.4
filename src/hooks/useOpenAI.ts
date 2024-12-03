import { useState, useCallback } from 'react';
import { validateEnv } from '../config/env';

export function useOpenAI() {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkConfiguration = useCallback(async () => {
    try {
      validateEnv();
      setIsConfigured(true);
      setError(null);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to configure OpenAI';
      setError(message);
      setIsConfigured(false);
      return false;
    }
  }, []);

  return {
    isConfigured,
    error,
    checkConfiguration
  };
}