import { Button, CardActions, CardContent } from '@mui/material';

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
    <S.ActivityCard>
      <CardContent>
        <S.ActivityDate color="text.secondary" gutterBottom>
          Data: {configDate(activity?.date)}
        </S.ActivityDate>
        <S.ActivityHour color="text.secondary">
          {configHour(activity?.hourBegin1)} às {configHour(activity?.hourEnd1)}{' '}
          e de {configHour(activity?.hourBegin2)} às{' '}
          {configHour(activity?.hourEnd2)}
        </S.ActivityHour>
        <S.ActivityDescription variant="body2">
          Atividade:
          <br />
          {activity?.description}
        </S.ActivityDescription>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => handleEdit({ activity: { ...activity }, index })}
        >
          Editar
        </Button>
      </CardActions>
    </S.ActivityCard>
  );
};

export default DailyActivity;
