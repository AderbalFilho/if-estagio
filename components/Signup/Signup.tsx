import { useState } from 'react';
import {
  Alert,
  Box,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/navigation';

import signUp from '@/firebase/auth/signup';

import * as S from './styles';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  } as {
    email: string;
    password: string;
    confirmPassword: string;
  });
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<Error>();
  const router = useRouter();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await signUp(signupInfo.email, signupInfo.password);

    if (error) {
      setErr(error as Error);
      setOpen(true);
      return;
    }

    setOpen(true);
    router.push('/login');
  }

  function handleLink(): void {
    router.push('/login');
  }

  function checkAcademicOrRootEmail(): boolean {
    return (
      /^[a-zA-Z0-9._%+-]+@(?:aluno.)?ifce.edu.br$/.test(signupInfo.email) ||
      signupInfo.email === 'aderbalcrato@gmail.com'
    );
  }

  function changeSignup(e: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value } = e.target;

    setSignupInfo({ ...signupInfo, [id]: value } as {
      email: string;
      password: string;
      confirmPassword: string;
    });
  }

  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <S.SignupContainer>
      <Typography
        component="h1"
        variant="h4"
        sx={{ margin: '32px 0 12px', color: '#19882c' }}
      >
        Sistema de Apoio ao Estagiário
      </Typography>
      <Typography
        component="h2"
        variant="h5"
        sx={{ marginBottom: '32px', color: '#19882c' }}
      >
        Módulo de Registro Diário
      </Typography>
      <S.SignupAvatar>
        <LockOutlinedIcon />
      </S.SignupAvatar>
      <Typography component="h3" variant="h5">
        Cadastre-se
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          value={signupInfo.email}
          onChange={changeSignup}
          error={!checkAcademicOrRootEmail() && signupInfo.email !== ''}
          helperText={
            !checkAcademicOrRootEmail() &&
            signupInfo.email !== '' &&
            'Este não é um email acadêmico.'
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          value={signupInfo.password}
          onChange={changeSignup}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirmar senha"
          type="password"
          id="confirmPassword"
          value={signupInfo.confirmPassword}
          onChange={changeSignup}
          error={signupInfo.password !== signupInfo.confirmPassword}
          helperText={
            signupInfo.password !== signupInfo.confirmPassword &&
            'As senhas devem ser idênticas.'
          }
        />
        <S.SubmitButton
          type="submit"
          disabled={
            !signupInfo.password ||
            signupInfo.password !== signupInfo.confirmPassword ||
            !checkAcademicOrRootEmail()
          }
          fullWidth
          variant="contained"
        >
          Cadastrar
        </S.SubmitButton>
        <S.SigninContainer>
          <Link href="#" onClick={handleLink} variant="body2">
            {'Já tem uma conta? Faça login aqui'}
          </Link>
        </S.SigninContainer>
      </Box>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={err ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {err?.toString() || 'Usuário cadastrado! Faça login!'}
        </Alert>
      </Snackbar>
    </S.SignupContainer>
  );
};

export default Signup;
