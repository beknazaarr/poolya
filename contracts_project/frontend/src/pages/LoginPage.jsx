import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(username, password);
      if (user.role === 'superadmin') navigate('/superadmin/organizations');
      else if (user.role === 'admin') navigate('/admin/contracts');
      else navigate('/manager/contracts');
    } catch {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={3} textAlign="center">Вход в систему</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Логин" value={username}
            onChange={e => setUsername(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Пароль" type="password" value={password}
            onChange={e => setPassword(e.target.value)} sx={{ mb: 3 }} />
          <Button fullWidth variant="contained" type="submit" size="large">
            Войти
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;