import styled from 'styled-components';
import { screenDevice } from '@/shared/device';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100vh;

  @media ${screenDevice.tablet} {
    padding: 2rem 6rem;
  }
`;
