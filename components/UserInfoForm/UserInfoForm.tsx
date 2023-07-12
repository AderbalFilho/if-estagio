import { useContext } from 'react';
import {
  Accordion,
  AccordionSummary,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers';

import { MainContext } from '@/contexts/MainContext';

import * as S from './styles';

const UserInfoForm = () => {
  const { user, updateUser } = useContext(MainContext);

  function changeUser(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    updateUser({ ...user, [id]: value });
  }

  function changeUserFromDate(id: string, newValue: Date | null) {
    updateUser({ ...user, [id]: newValue });
  }

  function changeUserFromNumber(e: React.ChangeEvent<HTMLInputElement>) {
    let { value }: { value: string | number } = e.target;
    value = parseInt(value);

    if (isNaN(value) || value < 0) {
      e.target.value = '0';
    }

    changeUser(e);
  }

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
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
          error={!user.name.trim()}
          id="name"
          label="Nome"
          value={user.name}
          onChange={changeUser}
          helperText={!user.name.trim() && 'Essa informação é obrigatória.'}
        />
        <S.UniversityInfo>
          <TextField
            fullWidth
            required
            error={!user.course.trim()}
            id="course"
            label="Curso"
            value={user.course}
            onChange={changeUser}
            helperText={!user.course.trim() && 'Essa informação é obrigatória.'}
          />
          <TextField
            fullWidth
            required
            error={!user.semester.trim()}
            id="semester"
            label="Série/Semestre"
            value={user.semester}
            onChange={changeUser}
            helperText={
              !user.semester.trim() && 'Essa informação é obrigatória.'
            }
          />
          <TextField
            fullWidth
            required
            error={!user.class.trim()}
            id="class"
            label="Turma"
            value={user.class}
            onChange={changeUser}
            helperText={!user.class.trim() && 'Essa informação é obrigatória.'}
          />
        </S.UniversityInfo>
        <TextField
          fullWidth
          required
          error={!user.company.trim()}
          id="company"
          label="Empresa"
          value={user.company}
          onChange={changeUser}
          helperText={!user.company.trim() && 'Essa informação é obrigatória.'}
        />
        <S.InternshipInfo>
          <DatePicker
            value={user.internshipBegin}
            onChange={(newValue: Date | null) =>
              changeUserFromDate('internshipBegin', newValue)
            }
            label="Início do estágio"
          />
          {/* TODO: Put error message if end date is lower than begin date */}
          <DatePicker
            value={user.internshipEnd}
            minDate={user.internshipBegin || undefined}
            onChange={(newValue: Date | null) =>
              changeUserFromDate('internshipEnd', newValue)
            }
            label="Fim do estágio"
          />
          <TextField
            fullWidth
            required
            error={user.workload === '0'}
            id="workload"
            type="number"
            label="Carga horária"
            value={user.workload}
            onChange={changeUserFromNumber}
            helperText={
              user.workload === '0' && 'Escreva uma quantidade válida.'
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
          error={!user.internshipArea.trim()}
          required
          id="internshipArea"
          label="Área de estágio"
          value={user.internshipArea}
          onChange={changeUser}
          helperText={
            !user.internshipArea.trim() && 'Essa informação é obrigatória.'
          }
        />
        <TextField
          fullWidth
          error={!user.teacherAdvisor.trim()}
          required
          id="teacherAdvisor"
          label="Professor orientador"
          value={user.teacherAdvisor}
          onChange={changeUser}
          helperText={
            !user.teacherAdvisor.trim() && 'Essa informação é obrigatória.'
          }
        />
        <TextField
          fullWidth
          error={!user.internshipSupervisor.trim()}
          required
          id="internshipSupervisor"
          label="Supervisor do estágio"
          value={user.internshipSupervisor}
          onChange={changeUser}
          helperText={
            !user.internshipSupervisor.trim() &&
            'Essa informação é obrigatória.'
          }
        />
      </S.UserAccordion>
    </Accordion>
  );
};

export default UserInfoForm;
