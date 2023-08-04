'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import TheHeader from '@/components/TheHeader';
import UserInfoForm from '@/components/UserInfoForm';
import DailyActivities from '@/components/DailyActivities';
import DatepickerLocalizationProvider from '@/shared/DatepickerLocalizationProvider';
import { MainContextProvider } from '@/contexts/MainContext';
import { useAuthContext } from '@/contexts/AuthContext';

import * as S from './styles';

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <MainContextProvider>
      <DatepickerLocalizationProvider>
        {!!user && (
          <>
            <TheHeader />
            <S.Main>
              <UserInfoForm />
              <DailyActivities />
            </S.Main>
          </>
        )}
      </DatepickerLocalizationProvider>
    </MainContextProvider>
  );
}
