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
  grid-template-columns: repeat(3, minmax(275px, auto));
  margin-top: var(--space-lg);
`;
