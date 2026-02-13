import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import logo from "../../assets/logo.jpeg";

import { Box, Button, TextField, Typography, Alert, Link } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Credenciales incorrectas");
      }

      const { token, user } = await response.json();

      // Guardar token y usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir según el rol
      if (user.role === "admin") {
        navigate("/isAdmin");
      } else if (user.role === "user") {
        navigate("/isUser");
      } else {
        // Rol desconocido
        setError("Rol no reconocido.");
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10} p={4} boxShadow={3} borderRadius={2}>
      {/* Logo */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Box component="img" src={logo} alt="Logo" width={130} />
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        Iniciar sesión
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo electrónico"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Ingresar
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿No tienes cuenta?{" "}
        <Link component={RouterLink} to="/register">
          Regístrate aquí
        </Link>
      </Typography>

      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        <Link component={RouterLink} to="/forgot-password">
          ¿Olvidaste tu contraseña?
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
