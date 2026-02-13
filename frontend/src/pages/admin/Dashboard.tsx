import {
  Box,
  Button,
  Typography,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Historial } from "../../pages/admin/Historial.tsx";
import Consulta from "../../pages/admin/ConsultaMascota";
import CitasAgendadas from "../admin/Citas Agendadas.tsx";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import logo from "../../assets/image.png";
import api from "../../api/axios.ts";

export const Dashboard = () => {
  const [petRows, setPetRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState("mascotas");
  const [editingPet, setEditingPet] = useState<any | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get("/pets");
        setPetRows(res.data);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!token || !user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const drawerWidth = 240;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/home");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleEdit = (pet: any) => {
    setEditingPet(pet);
    setOpenEdit(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Estás seguro de eliminar esta mascota?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/pets/${id}`);
      setPetRows((prev) => prev.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (!editingPet) return;

    try {
      const response = await api.put(`/pets/${editingPet.id}`, editingPet);
      setPetRows((prev) =>
        prev.map((pet) => (pet.id === editingPet.id ? response.data : pet))
      );
      setOpenEdit(false);
      setEditingPet(null);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const filteredPetRows = petRows.filter((row) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      row.id.toString().includes(searchValue) ||
      row.name.toLowerCase().includes(searchValue) ||
      row.species.toLowerCase().includes(searchValue) ||
      row.breed.toLowerCase().includes(searchValue) ||
      row.sex.toLowerCase().includes(searchValue) ||
      row.age.toString().includes(searchValue) ||
      row.owner.toLowerCase().includes(searchValue) ||
      row.phone.toString().includes(searchValue)
    );
  });

  const renderContent = () => {
    switch (selectedModule) {
      case "mascotas":
        return (
          <Paper>
            <TextField
              label="Buscar mascota"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#2196F3" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>ID</TableCell>
                    <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                    <TableCell sx={{ color: "white" }}>Especie</TableCell>
                    <TableCell sx={{ color: "white" }}>Raza</TableCell>
                    <TableCell sx={{ color: "white" }}>Sexo</TableCell>
                    <TableCell sx={{ color: "white" }}>Edad</TableCell>
                    <TableCell sx={{ color: "white" }}>Propietario</TableCell>
                    <TableCell sx={{ color: "white" }}>Teléfono</TableCell>
                    <TableCell sx={{ color: "white" }}>Editar</TableCell>
                    <TableCell sx={{ color: "white" }}>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPetRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.species}</TableCell>
                        <TableCell>{row.breed}</TableCell>
                        <TableCell>{row.sex}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.owner}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleEdit(row)}
                          >
                            Editar
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(row.id)}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredPetRows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10]}
            />
          </Paper>
        );
      case "citas":
        return <CitasAgendadas />;
      case "historiales":
        return <Historial />;
      case "ConsultaMascota":
        return <Consulta />;
      default:
        return null;
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
          <Box component="img" src={logo} alt="Logo" width={120} />
          <Typography variant="h5" sx={{ fontSize: "25px" }}>
            Panel Admin
          </Typography>
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
            <ListItemText primary="Mascotas" />
          </ListItem>
          <ListItem
            button
            selected={selectedModule === "ConsultaMascota"}
            onClick={() => setSelectedModule("ConsultaMascota")}
          >
            <ListItemIcon>
              <HealthAndSafetyIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Consulta" />
          </ListItem>
          <ListItem
            button
            selected={selectedModule === "citas"}
            onClick={() => setSelectedModule("citas")}
          >
            <ListItemIcon>
              <EventIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Citas" />
          </ListItem>
          <ListItem
            button
            selected={selectedModule === "historiales"}
            onClick={() => setSelectedModule("historiales")}
          >
            <ListItemIcon>
              <HistoryEduIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Historial" />
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
          {selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)}
        </Typography>

        {renderContent()}

        <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Editar Mascota
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Nombre"
                value={editingPet?.name || ""}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Especie"
                value={editingPet?.species || ""}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, species: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Raza"
                value={editingPet?.breed || ""}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, breed: e.target.value })
                }
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select
                  value={editingPet?.sex || ""}
                  onChange={(e) =>
                    setEditingPet({ ...editingPet, sex: e.target.value })
                  }
                  label="Sexo"
                >
                  <MenuItem value="Macho">Macho</MenuItem>
                  <MenuItem value="Hembra">Hembra</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Edad"
                type="number"
                value={editingPet?.age || ""}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, age: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Propietario"
                value={editingPet?.owner || ""}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, owner: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Teléfono"
                value={editingPet?.phone || ""}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, phone: e.target.value })
                }
                fullWidth
              />
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
                <Button variant="contained" onClick={handleSaveChanges}>
                  Guardar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            Mascota actualizada correctamente
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Dashboard;
