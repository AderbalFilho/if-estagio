import { Button, CardActions, CardContent } from '@mui/material';

import { IActivity } from '@/interfaces/activities.model';
import { configDate, configHourFromTo } from '@/shared/config-date';

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
          {configHourFromTo(
            activity?.hourBegin1,
            activity?.hourEnd1,
            activity?.hourBegin2,
            activity?.hourEnd2,
            true
          )}
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
