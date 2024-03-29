import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

import { IActivity } from '@/interfaces/activities.model';
import { addActivities } from '@/firebase/firestore/addData';
import { MainContext } from '@/contexts/MainContext';
import { useAuthContext } from '@/contexts/AuthContext';

import * as S from './styles';

const defaultDate = dayjs('2023-07-12T00:00');

const defaultActivity: IActivity = {
  date: null,
  hourBegin1: null,
  hourEnd1: null,
  hourBegin2: null,
  hourEnd2: null,
  description: '',
};

const DailyActivityForm = ({
  handleClose,
  activity,
  index,
}: {
  handleClose: (e: object, reason: string) => void;
  activity?: IActivity;
  index?: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newActivity, setNewActivity] = useState(
    { ...activity } || { ...defaultActivity }
  );
  const { activities, updateActivities } = useContext(MainContext);
  const { user: firebaseUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<Error>();

  useEffect(() => {
    if (activity) {
      setIsEditing(true);
    }
  }, [activity]);

  function handleDelete(e: object) {
    /* TODO: Confirm deletion */
    if (index || index === 0) {
      const activitiesArray = [
        ...activities.slice(0, index),
        ...activities.slice(index + 1, activities.length),
      ];

      updateActivities(activitiesArray);
      saveOnFirebase(activitiesArray);
      handleClose(e, 'delete');
    }
  }

  function handleSave(e: object) {
    /* TODO: Validate the data */
    if (index || index === 0) {
      const activitiesArray = [
        ...activities.slice(0, index),
        ...activities.slice(index + 1, activities.length),
        newActivity as IActivity,
      ];

      activitiesArray.sort((a, b) =>
        a.date
          ? a.date.isAfter(dayjs(b.date ? b.date : '3023-07-12T00:00'))
            ? -1
            : 1
          : 1
      );

      updateActivities(activitiesArray);
      saveOnFirebase(activitiesArray);
      handleClose(e, 'edit');
    } else {
      const activitiesArray = [...activities, newActivity as IActivity];

      activitiesArray.sort((a, b) =>
        a.date
          ? a.date.isAfter(dayjs(b.date ? b.date : '3023-07-12T00:00'))
            ? -1
            : 1
          : 1
      );

      updateActivities(activitiesArray);
      saveOnFirebase(activitiesArray);
      handleClose(e, 'add');
    }
  }

  async function saveOnFirebase(activities: IActivity[]) {
    setErr(undefined);
    const { error } = await addActivities(
      (firebaseUser as { uid: string })?.uid || '',
      { activities: JSON.stringify(activities) || '[]' }
    );

    if (error) {
      setErr(error as Error);
    }

    setOpen(true);
  }

  function handleCloseAlert(
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <>
      {/* TODO: Put validations on inputs */}
      <DialogTitle>
        {isEditing ? 'Edite' : 'Adicione'} sua atividade
      </DialogTitle>
      <DialogContent>
        <S.ActivityFormContainer component="form">
          <DatePicker
            value={newActivity.date || null}
            onChange={(newValue: Dayjs | null) =>
              setNewActivity({ ...newActivity, date: newValue || null })
            }
            label="Data da atividade"
          />
          {/* TODO: Add validations based on internship laws */}
          <S.BeginEndGroup>
            <TimePicker
              label="Hora de início 1"
              views={['hours', 'minutes']}
              value={newActivity.hourBegin1 || defaultDate}
              onChange={(newValue: Dayjs | null) =>
                setNewActivity({
                  ...newActivity,
                  hourBegin1: newValue || null,
                })
              }
            />
            <TimePicker
              label="Hora de fim 1"
              views={['hours', 'minutes']}
              value={newActivity.hourEnd1 || defaultDate}
              onChange={(newValue: Dayjs | null) =>
                setNewActivity({
                  ...newActivity,
                  hourEnd1: newValue || null,
                })
              }
            />
          </S.BeginEndGroup>
          <S.BeginEndGroup>
            <TimePicker
              label="Hora de início 2"
              views={['hours', 'minutes']}
              value={newActivity.hourBegin2 || defaultDate}
              onChange={(newValue: Dayjs | null) =>
                setNewActivity({
                  ...newActivity,
                  hourBegin2: newValue || null,
                })
              }
            />
            <TimePicker
              label="Hora de fim 2"
              views={['hours', 'minutes']}
              value={newActivity.hourEnd2 || defaultDate}
              onChange={(newValue: Dayjs | null) =>
                setNewActivity({
                  ...newActivity,
                  hourEnd2: newValue || null,
                })
              }
            />
          </S.BeginEndGroup>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            error={!newActivity.description?.trim()}
            id="activityDescription"
            label="Descrição da atividade"
            value={newActivity.description}
            onChange={(e) =>
              setNewActivity({
                ...newActivity,
                description: e.target.value,
              })
            }
            helperText={
              !newActivity.description?.trim() &&
              'Essa informação é obrigatória.'
            }
          />
        </S.ActivityFormContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose(e, 'cancel')}>Cancelar</Button>
        {activity && <Button onClick={handleDelete}>Apagar</Button>}
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity={err ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {err?.toString() || 'Dados salvos com sucesso!'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DailyActivityForm;
