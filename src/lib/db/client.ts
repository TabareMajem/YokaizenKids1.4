import { logger } from '../../server/config/logger';

// Mock data store for client-side
const mockStore: { [key: string]: any[] } = {
  users: [],
  content: [],
  settings: [],
  promptTemplates: []
};

// Mock MongoDB-like interface for client
class MockCollection {
  constructor(private collectionName: string) {}

  async find(query = {}) {
    return mockStore[this.collectionName] || [];
  }

  async findOne(query = {}) {
    const items = mockStore[this.collectionName] || [];
    return items[0] || null;
  }

  async findOneAndUpdate(query: any, update: any, options = {}) {
    const collection = mockStore[this.collectionName] || [];
    const index = collection.findIndex(item => item._id === query._id);
    if (index !== -1) {
      collection[index] = { 
        ...collection[index], 
        ...update.$set,
        _id: query._id 
      };
      return collection[index];
    }
    return null;
  }

  async insertOne(doc: any) {
    const collection = mockStore[this.collectionName] || [];
    const newDoc = { 
      ...doc, 
      _id: Math.random().toString(36).substr(2, 9) 
    };
    collection.push(newDoc);
    mockStore[this.collectionName] = collection;
    return { insertedId: newDoc._id };
  }

  async updateOne(query: any, update: any, options = {}) {
    const collection = mockStore[this.collectionName] || [];
    const index = collection.findIndex(item => item._id === query._id);
    if (index !== -1) {
      collection[index] = { ...collection[index], ...update.$set };
    }
    return { modifiedCount: index !== -1 ? 1 : 0 };
  }

  async deleteOne(query: any) {
    const collection = mockStore[this.collectionName] || [];
    const index = collection.findIndex(item => item._id === query._id);
    if (index !== -1) {
      collection.splice(index, 1);
    }
    return { deletedCount: index !== -1 ? 1 : 0 };
  }
}

class MockDb {
  collection(name: string) {
    return new MockCollection(name);
  }
}

// Export a function that returns either real MongoDB client or mock client
export async function getDb() {
  // In development/client-side, return mock DB
  if (import.meta.env.DEV) {
    return new MockDb();
  }

  // In production/server-side, this would return real MongoDB client
  // For now, return mock DB
  return new MockDb();
}

// Initialize with some mock data
mockStore.settings = [{
  _id: 'default',
  general: {
    siteName: 'Kokoro Quest',
    supportEmail: 'support@kokoroquest.com',
    defaultLanguage: 'en',
    maintenanceMode: false
  },
  security: {
    passwordMinLength: 8,
    mfaEnabled: false,
    sessionTimeout: 60,
    loginAttempts: 5
  }
}];

logger.info('Database client initialized');