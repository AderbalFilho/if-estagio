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

import signIn from '@/firebase/auth/signin';

import * as S from './styles';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' } as {
    email: string;
    password: string;
  });
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<Error>();
  const router = useRouter();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await signIn(loginInfo.email, loginInfo.password);

    if (error) {
      setErr(error as Error);
      setOpen(true);
      return;
    }

    router.push('/');
  }

  function handleLink() {
    router.push('/signup');
  }

  function checkAcademicOrRootEmail(): boolean {
    return (
      /^[a-zA-Z0-9._%+-]+@(?:aluno.)?ifce.edu.br$/.test(loginInfo.email) ||
      loginInfo.email === 'aderbalcrato@gmail.com'
    );
  }

  function changeLogin(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setLoginInfo({ ...loginInfo, [id]: value } as {
      email: string;
      password: string;
    });
  }

  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <S.LoginContainer>
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
      <S.LoginAvatar>
        <LockOutlinedIcon />
      </S.LoginAvatar>
      <Typography component="h1" variant="h5">
        Login
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
          value={loginInfo.email}
          onChange={changeLogin}
          error={!checkAcademicOrRootEmail() && loginInfo.email !== ''}
          helperText={
            !checkAcademicOrRootEmail() &&
            loginInfo.email !== '' &&
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
          autoComplete="current-password"
          value={loginInfo.password}
          onChange={changeLogin}
        />
        <S.SubmitButton
          type="submit"
          disabled={!loginInfo.password || !checkAcademicOrRootEmail()}
          fullWidth
          variant="contained"
        >
          Login
        </S.SubmitButton>
        <S.SignupContainer>
          <Link href="#" onClick={handleLink} variant="body2">
            {'Não tem uma conta? Cadastre-se aqui'}
          </Link>
        </S.SignupContainer>
      </Box>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {err?.toString()}
        </Alert>
      </Snackbar>
    </S.LoginContainer>
  );
};

export default Login;
