import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import api from '../../api/axios';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError('Por favor ingresa un correo electrónico válido.');
      setSuccess(false);
      return;
    }

    try {
      //await api.post('/auth/forgot-password', { email: normalizedEmail });
      await axios.post("http://localhost:3001/api/auth/forgot-password", {
        email,
      });
      setSuccess(true);
      setError("");
    } catch (err: unknown) {
      setSuccess(false);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('No se pudo enviar el correo. Verifica que el email esté registrado.');
      }
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} textAlign="center">
      <Typography variant="h5" gutterBottom>
        Recuperar Contraseña
      </Typography>
      <Typography variant="body2" mb={2}>
        Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
      </Typography>
      <TextField
        fullWidth
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 1 }}>
        Enviar instrucciones
      </Button>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Revisa tu correo para continuar con el restablecimiento.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ForgotPassword;
