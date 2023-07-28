'use client';

import Signup from '@/components/Signup';
import { MainContextProvider } from '@/contexts/MainContext';

import * as S from './styles';

export default function Home() {
  return (
    <S.Main>
      <MainContextProvider>
        <Signup />
      </MainContextProvider>
    </S.Main>
  );
}
