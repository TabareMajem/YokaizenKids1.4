import { getDb } from './client';
import type { User, Journal, Manga, Analytics } from './types';

export async function getCollections() {
  const db = await getDb();
  
  return {
    users: db.collection('users'),
    journals: db.collection('journals'),
    mangas: db.collection('mangas'),
    analytics: db.collection('analytics'),
    settings: db.collection('settings'),
    promptTemplates: db.collection('promptTemplates')
  };
}