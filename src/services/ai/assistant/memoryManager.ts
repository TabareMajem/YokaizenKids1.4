import { logger } from '../../../server/config/logger';

export type ConversationContext = {
  userId: string;
  role: 'teacher' | 'parent';
  recentTopics: string[];
  lastInteraction: Date;
};

class MemoryManager {
  private conversations: Map<string, string[]>;
  private context: Map<string, ConversationContext>;

  constructor() {
    this.conversations = new Map();
    this.context = new Map();
  }

  async addMessage(userId: string, message: string, role: 'user' | 'assistant'): Promise<void> {
    try {
      // Store message in conversation history
      const history = this.conversations.get(userId) || [];
      history.push(`${role}: ${message}`);
      this.conversations.set(userId, history.slice(-10)); // Keep last 10 messages

      // Update context
      const userContext = this.context.get(userId) || {
        userId,
        role: 'parent',
        recentTopics: [],
        lastInteraction: new Date()
      };

      userContext.lastInteraction = new Date();
      userContext.recentTopics = this.extractTopics(message);

      this.context.set(userId, userContext);
    } catch (error) {
      logger.error('Memory addition error:', error);
      throw new Error('Failed to add message to memory');
    }
  }

  async getConversationHistory(userId: string): Promise<string> {
    try {
      const history = this.conversations.get(userId) || [];
      return history.join('\n');
    } catch (error) {
      logger.error('History retrieval error:', error);
      throw new Error('Failed to retrieve conversation history');
    }
  }

  getContext(userId: string): ConversationContext | undefined {
    return this.context.get(userId);
  }

  private extractTopics(message: string): string[] {
    const keywords = [
      'progress', 'activities', 'emotions', 'behavior',
      'learning', 'social', 'assessment', 'development'
    ];

    return keywords.filter(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }
}

export const memoryManager = new MemoryManager();