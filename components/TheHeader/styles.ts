import styled from 'styled-components';
import { Button } from '@mui/material';

import { screenDevice } from '@/shared/device';

export const Header = styled.div`
  margin-bottom: var(--space-md);
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--space-lg) 0 var(--space-sm);

  @media ${screenDevice.tablet} {
    flex-direction: row;
    justify-content: space-between;
    margin: var(--space-lg) 0 var(--space-md);
  }
`;

export const ActionButton = styled(Button)`
  margin-bottom: var(--space-sm) !important;
  width: 100%;

  @media ${screenDevice.tablet} {
    margin-bottom: 0;
    width: auto;
  }
`;

export const InputUpload = styled.input`
  display: none;
`;
