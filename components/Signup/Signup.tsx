import { Box, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/navigation';

import * as S from './styles';

const Signup = () => {
  const router = useRouter();

  function handleSubmit() {}

  function handleLink() {
    router.push('/login');
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
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirmar senha"
          type="password"
          id="confirm-password"
        />
        <S.SubmitButton type="submit" fullWidth variant="contained">
          Cadastrar
        </S.SubmitButton>
        <S.SigninContainer>
          <Link href="#" onClick={handleLink} variant="body2">
            {'Já tem uma conta? Faça login aqui'}
          </Link>
        </S.SigninContainer>
      </Box>
    </S.SignupContainer>
  );
};

export default Signup;
