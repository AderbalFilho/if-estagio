import styled from 'styled-components';
import { Box } from '@mui/material';

import { screenDevice } from '@/shared/device';

export const ActivityFormContainer = styled(Box)`
  display: grid;
  row-gap: var(--space-sm);
`;

export const BeginEndGroup = styled.div`
  row-gap: var(--space-sm);
  display: grid;

  @media ${screenDevice.tablet} {
    column-gap: var(--space-sm);
    grid-template-columns: 1fr 1fr;
    row-gap: 0;
  }
`;
