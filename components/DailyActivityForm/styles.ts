import styled from 'styled-components';
import { Box } from '@mui/material';

export const ActivityFormContainer = styled(Box)`
  display: grid;
  row-gap: var(--space-sm);
`;

export const BeginEndGroup = styled.div`
  column-gap: var(--space-sm);
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
