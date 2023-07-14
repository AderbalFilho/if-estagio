import {
  IActivity,
  IActivityLocalStorage,
} from '@/interfaces/activities.model';
import { IUser } from '@/interfaces/user.model';
import dayjs from 'dayjs';
import { ReactNode, createContext, useEffect, useState } from 'react';

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

const defaultActivities: IActivity[] = [
  {
    date: dayjs('2023-07-12T00:00'),
    hourBegin1: dayjs('2023-07-12T00:00'),
    hourEnd1: dayjs('2023-07-12T00:00'),
    hourBegin2: dayjs('2023-07-12T00:00'),
    hourEnd2: dayjs('2023-07-12T00:00'),
    description: 'Teste',
  },
  {
    date: dayjs('2023-07-12T02:04'),
    hourBegin1: dayjs('2023-07-12T01:03'),
    hourEnd1: dayjs('2023-07-12T11:07'),
    hourBegin2: dayjs('2023-07-12T23:00'),
    hourEnd2: dayjs('2023-07-12T15:25'),
    description: 'Teste',
  },
];

export const MainContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateUser: (user: IUser) => {},
  user: { ...defaultUser },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateActivities: (activities: IActivity[]) => {},
  activities: [] as IActivity[],
});

export function MainContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({ ...defaultUser });
  const [activities, setActivities] = useState(
    defaultActivities as IActivity[]
  );

  useEffect(() => {
    const internshipInfoString = localStorage.getItem('internshipInfo');

    if (internshipInfoString) {
      const { user, activities } = JSON.parse(internshipInfoString);

      if (user) {
        setUser({
          ...user,
          internshipBegin: dayjs(user.internshipBegin),
          internshipEnd: dayjs(user.internshipEnd),
        });
      }

      if (activities) {
        const newActivities: IActivity[] = activities.map(
          (activity: IActivityLocalStorage): IActivity => {
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
  }, []);

  function updateUser(user: IUser) {
    const internshipInfo = JSON.parse(
      localStorage.getItem('internshipInfo') || '{}'
    );

    localStorage.setItem(
      'internshipInfo',
      JSON.stringify({ user, activities: internshipInfo?.activities || '' })
    );

    setUser(user);
  }

  function updateActivities(activities: IActivity[]) {
    const internshipInfo = JSON.parse(
      localStorage.getItem('internshipInfo') || '{}'
    );

    localStorage.setItem(
      'internshipInfo',
      JSON.stringify({ user: internshipInfo?.user || '', activities })
    );

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
