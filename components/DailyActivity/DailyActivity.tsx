import { Dispatch, SetStateAction } from 'react';
import { IActivity } from '@/interfaces/activities.model';

import * as S from './styles';

const DailyActivity = ({
  activity,
  index,
  handleEdit,
}: {
  activity: IActivity;
  index: number;
  handleEdit: Dispatch<SetStateAction<undefined>>;
}) => {
  return <S.Activity>DailyActivity</S.Activity>;
};

export default DailyActivity;
