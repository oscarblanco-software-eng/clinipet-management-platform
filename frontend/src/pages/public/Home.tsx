import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import heroImage from "../../assets/vet-home.jpg";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Home = () => {
  return (
    
    <Box>
      {/* NAVBAR */}
      <AppBar position="sticky" color="primary" elevation={3}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Clinipet
          </Typography>
          <Button color="inherit" onClick={() => scrollToSection("home")}>
            Inicio
          </Button>
          <Button color="inherit" onClick={() => scrollToSection("services")}>
            Servicios
          </Button>
          <Button color="inherit" onClick={() => scrollToSection("contact")}>
            Contacto
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Registro
          </Button>
        </Toolbar>
      </AppBar>

      {/* INICIO */}
      <Box id="home" sx={{ bgcolor: "#f8f9fa", py: 8 }}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={heroImage}
                alt="Veterinario"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Bienvenidos a Clinipet
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Cuidamos a tus mascotas como parte de nuestra familia. Consulta
                historial, agenda citas y más.
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/login"
                  sx={{ mr: 2 }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/register"
                >
                  Registrarse
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SERVICIOS */}
      <Box id="services" sx={{ py: 8, bgcolor: "#ffffff" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Nuestros Servicios
          </Typography>
          <Typography align="center" color="text.secondary" paragraph>
            Ofrecemos atención médica veterinaria, vacunación, cirugía menor,
            estética canina y más.
          </Typography>
        </Container>
      </Box>

      {/* CONTACTO */}
      <Box id="contact" sx={{ py: 8, bgcolor: "#f1f1f1" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Contáctanos
          </Typography>
          <Typography align="center" color="text.secondary">
            Dirección: Calle Ficticia 123, Ciudad Petlandia
            <br />
            Teléfono: (123) 456-7890
            <br />
            Email: contacto@clinipet.com
          </Typography>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ bgcolor: "#1976d2", color: "white", py: 3, textAlign: "center" }}>
        <Typography variant="body2">© 2025 Clinipet. Todos los derechos reservados.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
