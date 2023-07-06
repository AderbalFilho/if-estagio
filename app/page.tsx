'use client'

import TheHeader from '@/components/TheHeader';
import UserInfo from '@/components/UserInfo';
import DatepickerLocalizationProvider from '@/shared/DatepickerLocalizationProvider';
import { MainContextProvider } from '@/contexts/MainContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <MainContextProvider>
        <DatepickerLocalizationProvider>
          <TheHeader />
          <UserInfo />
        </DatepickerLocalizationProvider>
      </MainContextProvider>
    </main>
  )
}