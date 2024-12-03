import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAIPipeline } from '../../hooks/useAIPipeline';
import type { PipelineResult } from '../../services/ai/pipeline';

type Props = {
  content: string;
  onProcessed: (result: PipelineResult) => void;
  onError: (error: string) => void;
};

export default function JournalProcessor({ content, onProcessed, onError }: Props) {
  const { processJournal, isProcessing, error } = useAIPipeline();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (content && !isProcessing && isReady) {
      processJournal(content)
        .then(result => {
          if (result) {
            onProcessed(result);
          }
        })
        .catch(err => {
          onError(err instanceof Error ? err.message : 'Processing failed');
        });
    }
  }, [content, isReady]);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
        <span className="ml-2 text-gray-600">Processing your journal...</span>
      </div>
    );
  }

  return null;
}