import { ObjectId } from 'mongodb';
import { getCollections } from '../collections';
import type { User, UserRole } from '../types';

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
  const { users } = await getCollections();
  
  const now = new Date();
  const user: Omit<User, '_id'> = {
    ...userData,
    createdAt: now,
    updatedAt: now
  };

  const result = await users.insertOne(user as User);
  return result.insertedId;
}

export async function getUserById(id: ObjectId) {
  const { users } = await getCollections();
  return users.findOne({ _id: id });
}

export async function getUsersByRole(role: UserRole) {
  const { users } = await getCollections();
  return users.find({ role }).toArray();
}

export async function updateUser(id: ObjectId, update: Partial<User>) {
  const { users } = await getCollections();
  
  const result = await users.updateOne(
    { _id: id },
    { 
      $set: {
        ...update,
        updatedAt: new Date()
      }
    }
  );

  return result.modifiedCount > 0;
}