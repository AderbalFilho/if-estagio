import { IActivities } from '@/interfaces/activities.model';
import { IUser } from '@/interfaces/user.model';
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

export const MainContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateUser: (user: IUser) => {},
  user: { ...defaultUser },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateActivities: (activities: IActivities[]) => {},
  activities: [] as IActivities[],
});

export function MainContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({ ...defaultUser });
  const [activities, setActivities] = useState([] as IActivities[]);

  function updateUser(user: IUser) {
    // TODO: Save on localStorage { user, activities }
    setUser(user);
  }

  function updateActivities(activities: IActivities[]) {
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
