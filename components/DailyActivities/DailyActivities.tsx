import { forwardRef, useContext, useState } from 'react';
import { Dialog, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import DailyActivity from '@/components/DailyActivity';
import DailyActivityForm from '@/components/DailyActivityForm';
import { MainContext } from '@/contexts/MainContext';

import * as S from './styles';

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
  const [editActivity, setEditActivity] = useState();
  const [open, setOpen] = useState(false);
  const toggleOpening = () => setOpen(!open);

  function handleCloseDialog() {
    setEditActivity(undefined);
    toggleOpening();
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
          <AddCircleOutlineIcon onClick={toggleOpening} fontSize="large" />
        </S.AddActivity>
      </S.ActivitiesContainer>
      {activities.map((activity, index) => (
        <DailyActivity
          key={`activity-${index}`}
          activity={activity}
          index={index}
          handleEdit={setEditActivity}
        />
      ))}

      <Dialog
        fullWidth
        open={open}
        onClose={toggleOpening}
        TransitionComponent={Transition}
      >
        <DailyActivityForm
          activity={editActivity}
          index={undefined}
          handleClose={handleCloseDialog}
        />
      </Dialog>
    </>
  );
};

export default DailyActivities;
