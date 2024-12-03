import { ObjectId } from 'mongodb';
import { getCollections } from '../collections';
import type { Journal } from '../types';

export async function createJournal(journalData: Omit<Journal, '_id' | 'createdAt' | 'updatedAt'>) {
  const { journals } = await getCollections();
  
  const now = new Date();
  const journal: Omit<Journal, '_id'> = {
    ...journalData,
    createdAt: now,
    updatedAt: now
  };

  const result = await journals.insertOne(journal as Journal);
  return result.insertedId;
}

export async function getJournalsByUserId(userId: ObjectId, limit = 10) {
  const { journals } = await getCollections();
  return journals
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getJournalsByDateRange(userId: ObjectId, start: Date, end: Date) {
  const { journals } = await getCollections();
  return journals
    .find({
      userId,
      createdAt: {
        $gte: start,
        $lte: end
      }
    })
    .sort({ createdAt: -1 })
    .toArray();
}