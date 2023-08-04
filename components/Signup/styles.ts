import styled from 'styled-components';
import { Avatar, Box, Button } from '@mui/material';

export const SignupContainer = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 490px;
`;

export const SignupAvatar = styled(Avatar)`
  background-color: #19882c !important;
  margin: var(--space-xs);
`;

export const SubmitButton = styled(Button)`
  margin: var(--space-md) 0 var(--space-sm) !important;
`;

export const SigninContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
