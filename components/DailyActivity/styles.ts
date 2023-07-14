import styled from 'styled-components';
import { Card, Typography } from '@mui/material';

export const ActivityCard = styled(Card)`
  min-width: 275px;
`;

export const ActivityDate = styled(Typography)`
  font-size: 14px;
`;

export const ActivityHour = styled(Typography)`
  margin-bottom: var(--space-md);
  height: 48px;
`;

export const ActivityDescription = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
