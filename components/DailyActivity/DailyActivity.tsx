import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import { IActivity } from '@/interfaces/activities.model';
import { configDate, configHour } from '@/shared/config-date';

import * as S from './styles';

const DailyActivity = ({
  activity,
  index,
  handleEdit,
}: {
  activity: IActivity;
  index: number;
  handleEdit: ({
    activity,
    index,
  }: {
    activity: IActivity;
    index: number;
  }) => void;
}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Data: {configDate(activity?.date)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {configHour(activity?.hourBegin1)} às {configHour(activity?.hourEnd1)}{' '}
          e de {configHour(activity?.hourBegin2)} às{' '}
          {configHour(activity?.hourEnd2)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Atividade:
          <br />
          {activity?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => handleEdit({ activity: { ...activity }, index })}
        >
          Editar
        </Button>
      </CardActions>
    </Card>
  );
};

export default DailyActivity;
