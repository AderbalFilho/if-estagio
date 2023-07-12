'use client';

import TheHeader from '@/components/TheHeader';
import UserInfoForm from '@/components/UserInfoForm';
import DailyActivities from '@/components/DailyActivities';
import DatepickerLocalizationProvider from '@/shared/DatepickerLocalizationProvider';
import { MainContextProvider } from '@/contexts/MainContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as S from './styles';

export default function Home() {
  return (
    <S.Main>
      <MainContextProvider>
        <DatepickerLocalizationProvider>
          <TheHeader />
          <UserInfoForm />
          <DailyActivities />
        </DatepickerLocalizationProvider>
      </MainContextProvider>
    </S.Main>
  );
}
