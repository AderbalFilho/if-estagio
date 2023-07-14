import styled from 'styled-components';
import { Card, Typography } from '@mui/material';

export const ActivityCard = styled(Card)`
  min-width: 275px;
`;

export const ActivityDate = styled(Typography)`
  font-size: 14px;
`;

export const ActivityHour = styled(Typography)`
  height: 48px;
  margin-bottom: var(--space-md);
`;

export const ActivityDescription = styled(Typography)`
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
