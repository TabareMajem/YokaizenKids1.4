import { ChatOpenAI } from '@langchain/openai';
import { ConversationChain } from '@langchain/core/chains';
import { BufferMemory } from '@langchain/core/memory';
import { PromptTemplate } from '@langchain/core/prompts';
import { logger } from '../../server/config/logger';

let model: ChatOpenAI | null = null;
let chain: ConversationChain | null = null;

export async function initializeLangChain(apiKey: string, promptTemplate: string) {
  try {
    model = new ChatOpenAI({ 
      openAIApiKey: apiKey,
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.7
    });

    const template = PromptTemplate.fromTemplate(promptTemplate);

    chain = new ConversationChain({
      llm: model,
      prompt: template,
      memory: new BufferMemory()
    });

    logger.info('LangChain initialized successfully');
  } catch (error) {
    logger.error('LangChain initialization error:', error);
    throw new Error('Failed to initialize LangChain');
  }
}

export async function processMessage(message: string): Promise<string> {
  if (!chain) {
    throw new Error('LangChain not initialized');
  }

  try {
    const response = await chain.invoke({ input: message });
    return response.response;
  } catch (error) {
    logger.error('LangChain message processing error:', error);
    throw new Error('Failed to process message');
  }
}

export function clearConversationHistory() {
  if (chain?.memory) {
    chain.memory.clear();
  }
}