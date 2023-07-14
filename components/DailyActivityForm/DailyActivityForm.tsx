import { useContext, useEffect, useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

import { IActivity } from '@/interfaces/activities.model';
import { MainContext } from '@/contexts/MainContext';

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

  useEffect(() => {
    if (activity) {
      setIsEditing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDelete(e: object) {
    /* TODO: Confirm deletion */
    if (index || index === 0) {
      updateActivities([
        ...activities.slice(0, index),
        ...activities.slice(index + 1, activities.length),
      ]);
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
      handleClose(e, 'add');
    }
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
              setNewActivity({ ...newActivity, date: newValue })
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
                  hourBegin1: newValue,
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
                  hourEnd1: newValue,
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
                  hourBegin2: newValue,
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
                  hourEnd2: newValue,
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
    </>
  );
};

export default DailyActivityForm;
