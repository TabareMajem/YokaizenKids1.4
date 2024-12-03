import { getDb } from '../../lib/db/client';
import { logger } from '../../server/config/logger';

// Use a string type instead of ObjectId
type ID = string;

export async function getPromptTemplate(name: string) {
  try {
    const db = await getDb();
    return await db.collection('promptTemplates').findOne({ 
      name,
      isActive: true 
    });
  } catch (error) {
    logger.error('Prompt template retrieval error:', error);
    throw new Error('Failed to retrieve prompt template');
  }
}

export async function updatePromptTemplate(
  id: ID,
  update: {
    name?: string;
    description?: string;
    template?: string;
    variables?: string[];
    isActive?: boolean;
  }
) {
  try {
    const db = await getDb();
    
    const result = await db.collection('promptTemplates').findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...update,
          lastModified: new Date(),
          version: { $inc: 1 }
        }
      },
      { returnDocument: 'after' }
    );

    return result;
  } catch (error) {
    logger.error('Prompt template update error:', error);
    throw new Error('Failed to update prompt template');
  }
}

export async function createPromptTemplate(
  data: {
    name: string;
    description: string;
    template: string;
    variables: string[];
    createdBy: string;
  }
) {
  try {
    const db = await getDb();
    
    const result = await db.collection('promptTemplates').insertOne({
      ...data,
      version: 1,
      isActive: true,
      lastModified: new Date(),
      createdAt: new Date()
    });

    return result;
  } catch (error) {
    logger.error('Prompt template creation error:', error);
    throw new Error('Failed to create prompt template');
  }
}