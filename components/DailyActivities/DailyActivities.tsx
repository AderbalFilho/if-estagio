import { forwardRef, useContext, useState } from 'react';
import { Dialog, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import DailyActivity from '@/components/DailyActivity';
import DailyActivityForm from '@/components/DailyActivityForm';
import { MainContext } from '@/contexts/MainContext';

import * as S from './styles';
import { IActivity } from '@/interfaces/activities.model';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DailyActivities = () => {
  const { activities } = useContext(MainContext);
  const [editActivity, setEditActivity] = useState<{
    activity: IActivity;
    index: number;
  } | null>(null);
  const [open, setOpen] = useState(false);

  function toggleOpening(_: object, reason: string) {
    if (reason === 'backdropClick') {
      return;
    }

    setOpen(!open);
  }

  function handleCloseDialog(e: object, reason: string) {
    setEditActivity(null);
    toggleOpening(e, reason);
  }

  function handleEdit({
    activity,
    index,
  }: {
    activity: IActivity;
    index: number;
  }) {
    setEditActivity({
      activity,
      index,
    });
    toggleOpening({} as object, 'edit');
  }

  return (
    <>
      <S.ActivitiesContainer>
        <Typography variant="h5" component="h2">
          Atividades diárias
        </Typography>
        <S.AddActivity>
          <Typography variant="body1" component="p">
            Adicione atividades clicando no botão ao lado ou edite atividades
            existentes clicando nas mesmas.
          </Typography>
          <S.AddIconContainer>
            <AddCircleOutlineIcon
              onClick={(e) => toggleOpening(e, 'open')}
              fontSize="inherit"
            />
          </S.AddIconContainer>
        </S.AddActivity>
      </S.ActivitiesContainer>
      <S.ActivitiesCardsContainer>
        {activities?.map((activity, index) => (
          <DailyActivity
            key={`activity-${index}`}
            activity={activity}
            index={index}
            handleEdit={handleEdit}
          />
        ))}
      </S.ActivitiesCardsContainer>

      <Dialog
        fullWidth
        open={open}
        onClose={toggleOpening}
        TransitionComponent={Transition}
      >
        <DailyActivityForm
          activity={editActivity?.activity}
          index={editActivity?.index}
          handleClose={handleCloseDialog}
        />
      </Dialog>
    </>
  );
};

export default DailyActivities;
