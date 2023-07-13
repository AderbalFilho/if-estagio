import { IActivity } from '@/interfaces/activities.model';
import { IUser } from '@/interfaces/user.model';
import dayjs from 'dayjs';
import { ReactNode, createContext, useState } from 'react';

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

  function updateUser(user: IUser) {
    // TODO: Save on localStorage { user, activities }
    setUser(user);
  }

  function updateActivities(activities: IActivity[]) {
    // TODO: Save on localStorage { user, activities }
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
