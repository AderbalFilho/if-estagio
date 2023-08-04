import { useContext, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Alert,
  Button,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

import { MainContext } from '@/contexts/MainContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { addUser } from '@/firebase/firestore/addData';

import * as S from './styles';

const UserInfoForm = () => {
  const { user, updateUser } = useContext(MainContext);
  const { user: firebaseUser } = useAuthContext();
  const [userState, setUserState] = useState(user);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<Error>();

  useEffect(() => {
    setUserState(user);
  }, [user]);

  function changeUser(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setUserState({ ...userState, [id]: value });
  }

  function changeUserFromDate(id: string, newValue: Dayjs | null) {
    setUserState({ ...userState, [id]: newValue || null });
  }

  function changeUserFromNumber(e: React.ChangeEvent<HTMLInputElement>) {
    let { value }: { value: string | number } = e.target;
    value = parseInt(value);

    if (isNaN(value) || value < 0) {
      e.target.value = '0';
    }

    changeUser(e);
  }

  async function handleSave() {
    updateUser({ ...userState });

    const { error } = await addUser(
      (firebaseUser as { uid: string })?.uid || '',
      { ...userState }
    );

    if (error) {
      setErr(error as Error);
    }

    setOpen(true);
  }

  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="user-info-content"
        id="user-info-header"
      >
        <Typography>Informações do estagiário</Typography>
      </AccordionSummary>
      <S.UserAccordion>
        <TextField
          fullWidth
          required
          error={!userState?.name?.trim()}
          id="name"
          label="Nome"
          value={userState?.name || ''}
          onChange={changeUser}
          helperText={
            !userState.name?.trim() && 'Essa informação é obrigatória.'
          }
        />
        <S.UniversityInfo>
          <TextField
            fullWidth
            required
            error={!userState?.course?.trim()}
            id="course"
            label="Curso"
            value={userState?.course || ''}
            onChange={changeUser}
            helperText={
              !userState.course?.trim() && 'Essa informação é obrigatória.'
            }
          />
          <TextField
            fullWidth
            required
            error={!userState?.semester?.trim()}
            id="semester"
            label="Série/Semestre"
            value={userState?.semester || ''}
            onChange={changeUser}
            helperText={
              !userState?.semester?.trim() && 'Essa informação é obrigatória.'
            }
          />
          <TextField
            fullWidth
            required
            error={!userState?.class?.trim()}
            id="class"
            label="Turma"
            value={userState?.class || ''}
            onChange={changeUser}
            helperText={
              !userState?.class?.trim() && 'Essa informação é obrigatória.'
            }
          />
        </S.UniversityInfo>
        <TextField
          fullWidth
          required
          error={!userState?.company?.trim()}
          id="company"
          label="Empresa"
          value={userState?.company || ''}
          onChange={changeUser}
          helperText={
            !userState?.company?.trim() && 'Essa informação é obrigatória.'
          }
        />
        <S.InternshipInfo>
          <DatePicker
            value={userState?.internshipBegin}
            onChange={(newValue: Dayjs | null) =>
              changeUserFromDate('internshipBegin', newValue)
            }
            label="Início do estágio"
          />
          {/* TODO: Put error message if end date is lower than begin date */}
          <DatePicker
            value={userState?.internshipEnd}
            minDate={userState?.internshipBegin || undefined}
            onChange={(newValue: Dayjs | null) =>
              changeUserFromDate('internshipEnd', newValue)
            }
            label="Fim do estágio"
          />
          <TextField
            fullWidth
            required
            error={userState?.workload === '0'}
            id="workload"
            type="number"
            label="Carga horária"
            value={userState?.workload || '0'}
            onChange={changeUserFromNumber}
            helperText={
              userState?.workload === '0' && 'Escreva uma quantidade válida.'
            }
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">horas</InputAdornment>
              ),
            }}
          />
        </S.InternshipInfo>
        <TextField
          fullWidth
          error={!userState?.internshipArea?.trim()}
          required
          id="internshipArea"
          label="Área de estágio"
          value={userState?.internshipArea || ''}
          onChange={changeUser}
          helperText={
            !userState?.internshipArea?.trim() &&
            'Essa informação é obrigatória.'
          }
        />
        <TextField
          fullWidth
          error={!userState?.teacherAdvisor?.trim()}
          required
          id="teacherAdvisor"
          label="Professor orientador"
          value={userState?.teacherAdvisor || ''}
          onChange={changeUser}
          helperText={
            !userState?.teacherAdvisor?.trim() &&
            'Essa informação é obrigatória.'
          }
        />
        <TextField
          fullWidth
          error={!userState?.internshipSupervisor?.trim()}
          required
          id="internshipSupervisor"
          label="Supervisor do estágio"
          value={userState?.internshipSupervisor || ''}
          onChange={changeUser}
          helperText={
            !userState?.internshipSupervisor?.trim() &&
            'Essa informação é obrigatória.'
          }
        />
        <Button onClick={handleSave}>Salvar</Button>
      </S.UserAccordion>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={err ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {err?.toString() || 'Dados salvos com sucesso!'}
        </Alert>
      </Snackbar>
    </Accordion>
  );
};

export default UserInfoForm;
