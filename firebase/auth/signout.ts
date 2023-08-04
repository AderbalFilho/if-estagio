import { signOut as firebaseSignOut, getAuth } from 'firebase/auth';

import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

export default async function signOut() {
  let result = null;
  let error = null;

  try {
    result = await firebaseSignOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
