import { ReactNode, createContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { IActivity, IActivityStringify } from '@/interfaces/activities.model';
import { IUser } from '@/interfaces/user.model';
import { getActivities, getUser } from '@/firebase/firestore/getData';
import { useAuthContext } from '@/contexts/AuthContext';

const defaultUser: IUser = {
  name: '',
  course: '',
  semester: '',
  class: '',
  company: '',
  internshipBegin: null,
  internshipEnd: null,
  workload: '0',
  internshipArea: '',
  teacherAdvisor: '',
  internshipSupervisor: '',
};

export const MainContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateUser: (user: IUser) => {},
  user: { ...defaultUser },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateActivities: (activities: IActivity[]) => {},
  activities: [] as IActivity[],
});

export function MainContextProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser } = useAuthContext();
  const [user, setUser] = useState({ ...defaultUser });
  const [activities, setActivities] = useState([] as IActivity[]);

  useEffect(() => {
    async function userInfo() {
      const { result, error } = await getUser(
        (firebaseUser as { uid: string })?.uid || ''
      );

      if (error) {
        console.log(error);
        return;
      }

      const newUser = result?.data();

      setUser({
        ...newUser,
        internshipBegin: newUser?.internshipBegin
          ? dayjs(newUser.internshipBegin)
          : null,
        internshipEnd: newUser?.internshipEnd
          ? dayjs(newUser.internshipEnd)
          : null,
      } as IUser);
    }

    async function activitiesInfo() {
      const { result, error } = await getActivities(
        (firebaseUser as { uid: string })?.uid || ''
      );

      if (error) {
        console.log(error);
        return;
      }

      const activities = JSON.parse(result?.data()?.activities || '[]');

      if (activities) {
        const newActivities: IActivity[] = activities.map(
          (activity: IActivityStringify): IActivity => {
            return {
              date: activity.date ? dayjs(activity.date) : null,
              hourBegin1: activity.hourBegin1
                ? dayjs(activity.hourBegin1)
                : null,
              hourEnd1: activity.hourEnd1 ? dayjs(activity.hourEnd1) : null,
              hourBegin2: activity.hourBegin2
                ? dayjs(activity.hourBegin2)
                : null,
              hourEnd2: activity.hourEnd2 ? dayjs(activity.hourEnd2) : null,
              description: activity.description,
            };
          }
        );

        setActivities(newActivities);
      }
    }

    userInfo();
    activitiesInfo();
  }, [firebaseUser]);

  function updateUser(user: IUser) {
    setUser(user);
  }

  function updateActivities(activities: IActivity[]) {
    setActivities(activities);
  }

  return (
    <MainContext.Provider
      value={{
        user,
        updateUser,
        activities,
        updateActivities,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
