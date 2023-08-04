'use client';

import Login from '@/components/Login';
import { MainContextProvider } from '@/contexts/MainContext';

import * as S from './styles';

export default function Home() {
  return (
    <S.Main>
      <MainContextProvider>
        <Login />
      </MainContextProvider>
    </S.Main>
  );
}
