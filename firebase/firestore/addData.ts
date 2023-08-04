import { getFirestore, doc, setDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

import firebase_app from '@/firebase/config';
import { IUser } from '@/interfaces/user.model';

const db = getFirestore(firebase_app);

async function addData(colllection: string, id: string, data: object | null) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function addUser(userId: string, user: IUser) {
  const newUser = {
    name: user.name || '',
    course: user.course || '',
    semester: user.semester || '',
    class: user.class || '',
    company: user.company || '',
    internshipBegin: user?.internshipBegin
      ? dayjs(user.internshipBegin)?.valueOf()
      : null,
    internshipEnd: user?.internshipEnd
      ? dayjs(user.internshipEnd)?.valueOf()
      : null,
    workload: user.workload || '',
    internshipArea: user.internshipArea || '',
    teacherAdvisor: user.teacherAdvisor || '',
    internshipSupervisor: user.internshipSupervisor || '',
  };

  return addData('users', userId, newUser);
}

export async function addActivities(
  userId: string,
  activities: { activities: string }
) {
  return addData('activities', userId, activities);
}
