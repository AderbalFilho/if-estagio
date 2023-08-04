import { getFirestore, doc, getDoc } from 'firebase/firestore';

import firebase_app from '@/firebase/config';

const db = getFirestore(firebase_app);

async function getDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getUser(userId: string) {
  return getDocument('users', userId);
}

export async function getActivities(userId: string) {
  return getDocument('activities', userId);
}
