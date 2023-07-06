import { ReactNode, createContext, useState } from 'react';

const defaultUser: IUser = {
  name: null,
  course: null,
  semester: null,
  class: null,
  company: null,
  internshipBegin: null,
  internshipEnd: null,
  workload: null,
  internshipArea: null,
  teacherAdvisor: null,
  internshipSupervisor: null,
};

export const MainContext = createContext({
  updateUser: (user: IUser) => {},
  user: { ...defaultUser },
  updateActivities: (activities: IActivities[]) => {},
  activities: [] as IActivities[]
});


export function MainContextProvider({children}: { children: ReactNode }) {
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
    <MainContext.Provider value={{
      user,
      updateUser,
      activities,
      updateActivities
    }}>
      {children}
    </MainContext.Provider>
  );
}