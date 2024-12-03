import { ObjectId } from 'mongodb';
import { getCollections } from '../collections';
import type { Manga } from '../types';

export async function createManga(mangaData: Omit<Manga, '_id' | 'createdAt' | 'updatedAt'>) {
  const { mangas } = await getCollections();
  
  const now = new Date();
  const manga: Omit<Manga, '_id'> = {
    ...mangaData,
    createdAt: now,
    updatedAt: now
  };

  const result = await mangas.insertOne(manga as Manga);
  return result.insertedId;
}

export async function getMangasByUserId(userId: ObjectId, limit = 10) {
  const { mangas } = await getCollections();
  return mangas
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getMangaByJournalId(journalId: ObjectId) {
  const { mangas } = await getCollections();
  return mangas.findOne({ journalId });
}