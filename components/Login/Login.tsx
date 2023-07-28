import { Box, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/navigation';

import * as S from './styles';

const Login = () => {
  const router = useRouter();

  function handleSubmit() {}

  function handleLink() {
    router.push('/signup');
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
        />
        <S.SubmitButton type="submit" fullWidth variant="contained">
          Login
        </S.SubmitButton>
        <S.SignupContainer>
          <Link href="#" onClick={handleLink} variant="body2">
            {'Não tem uma conta? Cadastre-se aqui'}
          </Link>
        </S.SignupContainer>
      </Box>
    </S.LoginContainer>
  );
};

export default Login;
