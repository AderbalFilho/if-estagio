import styled from 'styled-components';
import { AccordionDetails } from '@mui/material';

export const UserAccordion = styled(AccordionDetails)`
  display: grid;
  row-gap: var(--space-sm);
`;

export const UniversityInfo = styled.div`
  column-gap: var(--space-sm);
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
`;

export const InternshipInfo = styled.div`
  column-gap: var(--space-sm);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
