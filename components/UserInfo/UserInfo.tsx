import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers';

const UserInfo = () => {
  return (
    /* TODO: paste styles to an actual styled components file */
    /* TODO: get info from MainContext */
    <Accordion TransitionProps={{ unmountOnExit: true }} style={{ margin: '12px 0' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="user-info-content"
        id="user-info-header"
      >
        <Typography>Informações do estagiário</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'grid', rowGap: '10px' }}>
        <TextField fullWidth error required id="name" label="Nome" helperText="Essa informação é obrigatória." />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(2, 1fr)', columnGap: '10px' }}>
          <TextField fullWidth error required id="course" label="Curso" helperText="Essa informação é obrigatória." />
          <TextField fullWidth error required id="semester" label="Série/Semestre" helperText="Essa informação é obrigatória." />
          <TextField fullWidth error required id="class" label="Turma" helperText="Essa informação é obrigatória." />
        </div>
        <TextField fullWidth error required id="company" label="Empresa" helperText="Essa informação é obrigatória." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '10px' }}>
          <DatePicker label="Início do estágio" />
          <DatePicker label="Fim do estágio" />
          <TextField
            fullWidth
            error
            required
            id="workload"
            label="Carga horária"
            helperText="Essa informação é obrigatória."
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">horas</InputAdornment>,
            }}
          />
        </div>
        <TextField fullWidth error required id="internshipArea" label="Área de estágio" helperText="Essa informação é obrigatória." />
        <TextField fullWidth error required id="teacherAdvisor" label="Professor orientador" helperText="Essa informação é obrigatória." />
        <TextField fullWidth error required id="internshipSupervisor" label="Supervisor do estágio" helperText="Essa informação é obrigatória." />
      </AccordionDetails>
    </Accordion>
  )
}

export default UserInfo;