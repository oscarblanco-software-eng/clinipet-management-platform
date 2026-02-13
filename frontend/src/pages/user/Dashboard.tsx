import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import imagen from "../../assets/image.png";
import { AgendarCita } from "../../pages/user/agendarCita";
import RegistrarMascotas from "../user/RegistrarMascotas";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";

const drawerWidth = 240;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState("inicio");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  const renderContent = () => {
    switch (selectedModule) {
      case "mascotas":
        return <RegistrarMascotas />;
      case "citas":
        return <AgendarCita />;
      case "inicio":
      default:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              ¡Bienvenido al panel de usuario!
            </Typography>
            <Typography variant="body1">
              Selecciona un módulo del menú lateral para comenzar.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2196F3",
            color: "#ffffff",
          },
        }}
      >
        <Box display="flex" alignItems="center" p={2} gap={1}>
          <Box component="img" src={imagen} alt="Logo" width={120} />
          <Typography variant="h6">Panel Usuario</Typography>
        </Box>
        <Divider />
        <List>
          <ListItem
            button
            selected={selectedModule === "mascotas"}
            onClick={() => setSelectedModule("mascotas")}
          >
            <ListItemIcon>
              <PetsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Registrar Mascotas" />
          </ListItem>
          <ListItem
            button
            selected={selectedModule === "citas"}
            onClick={() => setSelectedModule("citas")}
          >
            <ListItemIcon>
              <EventIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Agendar Citas" />
          </ListItem>
        </List>
        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#ffffff",
          p: 3,
          minHeight: "100vh",
          color: "#2196F3",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {selectedModule !== "inicio"
            ? `Módulo: ${
                selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)
              }`
            : "Bienvenido"}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default UserDashboard;
