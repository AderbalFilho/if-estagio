import { screenDevice } from '@/shared/device';
import styled from 'styled-components';

export const ActivitiesContainer = styled.div`
  margin-top: var(--space-lg);
`;

export const AddActivity = styled.div`
  column-gap: var(--space-sm);
  display: grid;
  grid-template-columns: 1fr minmax(35px, auto);
  margin-top: var(--space-sm);
`;

export const AddIconContainer = styled.span`
  font-size: 52px;
`;

export const ActivitiesCardsContainer = styled.div`
  display: grid;
  gap: var(--space-sm);
  grid-template-columns: 1fr;
  margin-top: var(--space-lg);

  @media ${screenDevice.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${screenDevice.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${screenDevice.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
