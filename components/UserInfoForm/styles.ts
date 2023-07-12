import styled from 'styled-components';
import { AccordionDetails } from '@mui/material';

import { screenDevice } from '@/shared/device';

export const UserAccordion = styled(AccordionDetails)`
  display: grid;
  row-gap: var(--space-sm);
`;

export const UniversityInfo = styled.div`
  display: grid;
  row-gap: var(--space-sm);

  @media ${screenDevice.tablet} {
    column-gap: var(--space-sm);
    grid-template-columns: 2fr repeat(2, 1fr);
    row-gap: 0;
  }
`;

export const InternshipInfo = styled.div`
  display: grid;
  row-gap: var(--space-sm);

  @media ${screenDevice.tablet} {
    column-gap: var(--space-sm);
    grid-template-columns: repeat(3, 1fr);
    row-gap: 0;
  }
`;
