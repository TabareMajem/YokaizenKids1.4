import { useState, useCallback } from 'react';
import { getAssistantResponse } from '../services/ai/assistant/assistantService';
import { detectSkill, executeSkill } from '../services/ai/assistant/skillsManager';
import { memoryManager } from '../services/ai/assistant/memoryManager';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

export function useAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // Check for specific skills
      const skill = detectSkill(text);
      let response: string;

      if (skill) {
        response = await executeSkill(skill, text);
      } else {
        response = await getAssistantResponse(text);
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Update memory
      await memoryManager.addMessage('user-1', text, 'user');
      await memoryManager.addMessage('user-1', response, 'assistant');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process message';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error
  };
}